// server.js
// Express API – Multi‑Election + Batch für Quorum (ethers v6)
// Kompatibel mit den Multi‑Election Contracts (Registry + Bundestagswahl)
// Enthält: Batch-Endpunkte, electionId-Parametrisierung, parallele Transaktionen
// V 1.0.0

const express = require("express");
const fs = require("fs");
const path = require("path");
const forge = require("node-forge");
const prompt = require("prompt");
const { ethers } = require("ethers");

// ====== Konfiguration ======
const PORT = process.env.PORT || 3001;
const RPC_URL = process.env.RPC_URL || "http://localhost:8545";
const QUORUM_PATH_ENV = process.env.PATH_TO_QUORUM; // optionaler Override

// Schlüssel für Ergebnis-Signatur / Entschlüsselung (wie in deinem bisherigen Code)
const privateKeyPem = fs.readFileSync(path.join(__dirname, "../keys/private.pem"), "utf8");
const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);

// Contract-Artefakte
const CONTRACT_ADDRESS = fs.readFileSync(path.join(__dirname, "deployment-address.txt"), "utf8").trim();
const ABI = require(path.join(__dirname, "./Bundestagswahl.json")).abi;

// ====== Express Setup ======
const app = express();
app.use(express.json({ limit: "10mb" }));

// ====== Ethers Setup (lazy singleton) ======
let _signer = null;
let _contract = null;

async function initSignerAndContract(quorumPath) {
  if (_contract && _signer) return _contract;

  const provider = new ethers.JsonRpcProvider(RPC_URL);

  // Quorum/Geth Keystore lesen
  const keystorePath = path.join(quorumPath, "/config/nodes/member1/accountKeystore");
  const passwordPath = path.join(quorumPath, "/config/nodes/member1/accountPassword");

  const keystore = fs.readFileSync(keystorePath, "utf8");
  const password = fs.readFileSync(passwordPath, "utf8").trim();

  const wallet = await ethers.Wallet.fromEncryptedJson(keystore, password);
  _signer = wallet.connect(provider);
  _contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, _signer);

  return _contract;
}

// ====== Kryptografie-Helfer (wie gehabt) ======
function decryptBytes(_bytesB64) {
  const encryptedBytes = Buffer.from(_bytesB64, "base64");
  const decrypted = privateKey.decrypt(encryptedBytes.toString("binary"), "RSA-OAEP");
  return decrypted; // string (binary)
}

function decryptStringVote(_voteB64) {
  const decrypted = decryptBytes(_voteB64);
  return decrypted;
}

function tally(_decryptedVotes) {
  const t = {};
  for (const name of _decryptedVotes) {
    t[name] = (t[name] || 0) + 1;
  }
  return JSON.stringify(t);
}

function signature(_tally) {
  const md1 = forge.md.sha1.create();
  md1.update(_tally, "utf8");
  const sig = forge.util.encode64(privateKey.sign(md1));
  return sig;
}

// ====== Utility: Transaktion senden ======
async function sendTx(contract, method, args = []) {
  const tx = await contract[method](...args);
  const receipt = await tx.wait();
  return { hash: tx.hash, receipt };
}

// ====== Middleware: electionId aus Param oder Body ======
function getElectionId(req) {
  if (req.params && req.params.electionId) return Number(req.params.electionId);
  if (req.body && req.body.electionId) return Number(req.body.electionId);
  throw new Error("electionId fehlt");
}

// ====== Routen ======

// 0) Health
app.get("/health", (req, res) => {
  res.json({ ok: true, contract: CONTRACT_ADDRESS });
});

// 1) Init (Prompt nur, wenn keine ENV gesetzt ist)
prompt.start();

prompt.get([
  {
    name: "PathToQuorum",
    description: "Pfad zum Quorum-Verzeichnis (config/nodes/member1/...)",
    required: true,
    default: QUORUM_PATH_ENV || "../quorum",
  },
], function onPrompt(err, result) {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  const QUORUM_PATH = result.PathToQuorum;

  // Vertragsinitialisierung
  initSignerAndContract(QUORUM_PATH)
    .then(() => {
      console.log("✅ Signer & Contract initialisiert:", CONTRACT_ADDRESS);

      // === Admin: neue Wahl anlegen ===
      app.post("/createElection", async (req, res) => {
        try {
          const { title } = req.body;
          if (!title) throw new Error("title fehlt");
          const c = await initSignerAndContract(QUORUM_PATH);
          const { hash } = await sendTx(c, "createElection", [title]);
          res.json({ status: "success", tx: hash });
        } catch (e) {
          res.status(500).json({ error: e.message });
        }
      });

      // === Wahlstatus steuern ===
      app.post("/:electionId/startVoting", async (req, res) => {
        try {
          const electionId = getElectionId(req);
          const c = await initSignerAndContract(QUORUM_PATH);
          const { hash } = await sendTx(c, "startVoting", [electionId]);
          res.json({ status: "success", tx: hash });
        } catch (e) {
          res.status(500).json({ error: e.message });
        }
      });

      app.post("/:electionId/endVoting", async (req, res) => {
        try {
          const electionId = getElectionId(req);
          const c = await initSignerAndContract(QUORUM_PATH);
          const { hash } = await sendTx(c, "endVoting", [electionId]);
          res.json({ status: "success", tx: hash });
        } catch (e) {
          res.status(500).json({ error: e.message });
        }
      });

      // === Registry: Tokens (Single & Batch) ===
      app.post("/:electionId/registerToken", async (req, res) => {
        try {
          const electionId = getElectionId(req);
          const { token, electionDistrict } = req.body;
          const c = await initSignerAndContract(QUORUM_PATH);
          const { hash } = await sendTx(c, "registerToken", [electionId, token, electionDistrict]);
          res.json({ status: "success", tx: hash });
        } catch (e) {
          res.status(500).json({ error: e.message });
        }
      });

      // Optional: Falls du auch eine Batch-Variante in Registry.sol ergänzt hast (registerTokens)
      app.post("/:electionId/registerTokensBatch", async (req, res) => {
        try {
          const electionId = getElectionId(req);
          const { tokens, electionDistricts } = req.body; // Arrays gleicher Länge
          if (!Array.isArray(tokens) || !Array.isArray(electionDistricts)) {
            throw new Error("tokens und electionDistricts müssen Arrays sein");
          }
          const c = await initSignerAndContract(QUORUM_PATH);
          const { hash } = await sendTx(c, "registerTokens", [electionId, tokens, electionDistricts]);
          res.json({ status: "success", tx: hash });
        } catch (e) {
          res.status(500).json({ error: e.message });
        }
      });

      // === Wahlbezirke (Single & Batch) ===
      app.post("/:electionId/registerElectionDistrict", async (req, res) => {
        try {
          const electionId = getElectionId(req);
          const { name, nummer, publicKey } = req.body;
          const c = await initSignerAndContract(QUORUM_PATH);
          const { hash } = await sendTx(c, "registerElectionDistrict", [electionId, name, nummer, publicKey]);
          res.json({ status: "success", tx: hash });
        } catch (e) {
          res.status(500).json({ error: e.message });
        }
      });

      app.post("/:electionId/registerElectionDistrictsBatch", async (req, res) => {
        try {
          const electionId = getElectionId(req);
          const { names, nummern, publicKeys } = req.body; // Arrays
          const c = await initSignerAndContract(QUORUM_PATH);
          const { hash } = await sendTx(c, "registerElectionDistricts", [electionId, names, nummern, publicKeys]);
          res.json({ status: "success", tx: hash });
        } catch (e) {
          res.status(500).json({ error: e.message });
        }
      });

      // === Parteien (Single & Batch) ===
      app.post("/:electionId/registerParty", async (req, res) => {
        try {
          const electionId = getElectionId(req);
          const { name, shortname, color, bgcolor, url } = req.body;
          const c = await initSignerAndContract(QUORUM_PATH);
          const { hash } = await sendTx(c, "registerParty", [electionId, name, shortname, color, bgcolor, url]);
          res.json({ status: "success", tx: hash });
        } catch (e) {
          res.status(500).json({ error: e.message });
        }
      });

      app.post("/:electionId/registerPartiesBatch", async (req, res) => {
        try {
          const electionId = getElectionId(req);
          const { names, shortnames, colors, bgcolors, urls } = req.body; // Arrays
          const c = await initSignerAndContract(QUORUM_PATH);
          const { hash } = await sendTx(c, "registerParties", [electionId, names, shortnames, colors, bgcolors, urls]);
          res.json({ status: "success", tx: hash });
        } catch (e) {
          res.status(500).json({ error: e.message });
        }
      });

      // === Kandidaten (Single & Batch) ===
      app.post("/:electionId/registerCandidate", async (req, res) => {
        try {
          const electionId = getElectionId(req);
          const { name, wahlbezirk, partei, url } = req.body;
          const c = await initSignerAndContract(QUORUM_PATH);
          const { hash } = await sendTx(c, "registerCandidate", [electionId, name, wahlbezirk, partei, url]);
          res.json({ status: "success", tx: hash });
        } catch (e) {
          res.status(500).json({ error: e.message });
        }
      });

      app.post("/:electionId/registerCandidatesBatch", async (req, res) => {
        try {
          const electionId = getElectionId(req);
          const { names, wahlbezirke, parteien, urls } = req.body; // Arrays
          const c = await initSignerAndContract(QUORUM_PATH);
          const { hash } = await sendTx(c, "registerCandidates", [electionId, names, wahlbezirke, parteien, urls]);
          res.json({ status: "success", tx: hash });
        } catch (e) {
          res.status(500).json({ error: e.message });
        }
      });

      // === Voting ===
      app.post("/:electionId/castEncryptedVote", async (req, res) => {
        try {
          const electionId = getElectionId(req);
          const { encryptedVote1, encryptedVote2, token, wahlbezirk } = req.body;
          const c = await initSignerAndContract(QUORUM_PATH);
          const { hash } = await sendTx(c, "castEncryptedVote", [electionId, encryptedVote1, encryptedVote2, token, wahlbezirk]);
          res.json({ status: "success", tx: hash });
        } catch (e) {
          res.status(500).json({ error: e.message });
        }
      });

      // === Ergebnisse speichern (holt vorher verschlüsselte Stimmen, entschlüsselt off-chain) ===
      app.post("/:electionId/storeElectionResult", async (req, res) => {
        try {
          const electionId = getElectionId(req);
          const { wahlbezirk } = req.body;
          const c = await initSignerAndContract(QUORUM_PATH);

          // 1) Votes holen
          const encrypted = await c.getEncryptedVotes(electionId, wahlbezirk);
          const decryptedVotes1 = [];
          const decryptedVotes2 = [];

          for (let i = 0; i < encrypted.length; i++) {
            decryptedVotes1[i] = decryptStringVote(encrypted[i].vote1);
            decryptedVotes2[i] = decryptStringVote(encrypted[i].vote2);
          }

          // 2) Erststimmen
          const tally1 = tally(decryptedVotes1);
          const sig1 = signature(tally1);
          const tx1 = await c.storeElectionResult1(electionId, tally1, sig1, wahlbezirk);
          await tx1.wait();

          // 3) Zweitstimmen
          const tally2 = tally(decryptedVotes2);
          const sig2 = signature(tally2);
          const tx2 = await c.storeElectionResult2(electionId, tally2, sig2, wahlbezirk);
          await tx2.wait();

          res.json({ status: "success", tx1: tx1.hash, tx2: tx2.hash });
        } catch (e) {
          res.status(500).json({ error: e.message });
        }
      });

      // === Ergebnisse abrufen ===
      app.get("/:electionId/results1/:wahlbezirk", async (req, res) => {
        try {
          const electionId = getElectionId(req);
          const wahlbezirk = Number(req.params.wahlbezirk);
          const c = await initSignerAndContract(QUORUM_PATH);
          const result = await c.getElectionResultsDistrict1(electionId, wahlbezirk);
          // result: [tally, wahlbezirk, signature, timestamp]
          res.json({ tally: result[0], wahlbezirk: Number(result[1]), signature: result[2], timestamp: Number(result[3]) });
        } catch (e) {
          res.status(500).json({ error: e.message });
        }
      });

      app.get("/:electionId/results2/:wahlbezirk", async (req, res) => {
        try {
          const electionId = getElectionId(req);
          const wahlbezirk = Number(req.params.wahlbezirk);
          const c = await initSignerAndContract(QUORUM_PATH);
          const result = await c.getElectionResultsDistrict2(electionId, wahlbezirk);
          res.json({ tally: result[0], wahlbezirk: Number(result[1]), signature: result[2], timestamp: Number(result[3]) });
        } catch (e) {
          res.status(500).json({ error: e.message });
        }
      });

      // === Server Start ===
      app.listen(PORT, () => console.log(`API läuft auf Port ${PORT}!`));
    })
    .catch((e) => {
      console.error("Fehler bei Initialisierung:", e);
      process.exit(1);
    });
});

/*
=======================
Curl-Beispiele (Batch)
=======================

# 1) Neue Wahl anlegen
curl -X POST http://localhost:3001/createElection \
  -H "Content-Type: application/json" \
  -d '{"title":"Bundestagswahl 2025"}'

# Angenommen electionId=1

# 2) Wahlbezirke (Batch)
curl -X POST http://localhost:3001/1/registerElectionDistrictsBatch \
  -H "Content-Type: application/json" \
  -d '{
    "names":["Wahlkreis 1","Wahlkreis 2","Wahlkreis 3"],
    "nummern":[1,2,3],
    "publicKeys":["-----BEGIN PUBLIC KEY-----...END PUBLIC KEY-----","-----BEGIN PUBLIC KEY-----...END PUBLIC KEY-----","-----BEGIN PUBLIC KEY-----...END PUBLIC KEY-----"]
  }'

# 3) Parteien (Batch)
curl -X POST http://localhost:3001/1/registerPartiesBatch \
  -H "Content-Type: application/json" \
  -d '{
    "names":["CDU","SPD","FDP","Grüne","Linke"],
    "shortnames":["CDU","SPD","FDP","GRUENE","LINKE"],
    "colors":["#fff","#fff","#8e44ad","#fff","#fff"],
    "bgcolors":["#000","#FF0000","#f1c40f","#27ae60","#c01c28"],
    "urls":["https://www.cdu.de","https://www.spd.de","https://www.fdp.de","https://www.gruene.de","https://www.linke.de"]
  }'

# 4) Kandidaten (Batch)
curl -X POST http://localhost:3001/1/registerCandidatesBatch \
  -H "Content-Type: application/json" \
  -d '{
    "names":["Alice","Bob","Charly","Denise","Emily"],
    "wahlbezirke":[1,1,1,1,1],
    "parteien":["CDU","SPD","FDP","Grüne","Linke"],
    "urls":["https://.../alice","https://.../bob","https://.../charly","https://.../denise","https://.../emily"]
  }'

# 5) Tokens (Batch) – nur falls Registry.registerTokens(electionId, tokens[], electionDistricts[]) existiert
curl -X POST http://localhost:3001/1/registerTokensBatch \
  -H "Content-Type: application/json" \
  -d '{
    "tokens":["SecretToken1","SecretToken2","SecretToken3","SecretToken4"],
    "electionDistricts":[1,1,1,1]
  }'

# 6) Wahl starten
curl -X POST http://localhost:3001/1/startVoting -H "Content-Type: application/json" -d '{}'

# 7) Stimme abgeben
curl -X POST http://localhost:3001/1/castEncryptedVote \
  -H "Content-Type: application/json" \
  -d '{"encryptedVote1":"BASE64...","encryptedVote2":"BASE64...","token":"SecretToken1","wahlbezirk":1}'

# 8) Wahl beenden
curl -X POST http://localhost:3001/1/endVoting -H "Content-Type: application/json" -d '{}'

# 9) Ergebnisse speichern (off-chain tally + sign, on-chain persist)
curl -X POST http://localhost:3001/1/storeElectionResult \
  -H "Content-Type: application/json" \
  -d '{"wahlbezirk":1}'

# 10) Ergebnisse abrufen
curl -X GET http://localhost:3001/1/results1/1
curl -X GET http://localhost:3001/1/results2/1
*/
