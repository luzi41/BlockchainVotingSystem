const fs = require("fs");
const path = require("path");
const { Wallet, JsonRpcProvider, Contract } = require("ethers");
const forge = require("node-forge");

// Config laden
const PRIVATE_KEY_PATH = path.join(__dirname, "../keys/private.pem");
const contractAddress = fs.readFileSync("../api/deployment-address.txt", "utf8").trim();
const abi = require("../api/Election.json").abi;
const RESULT_OUTPUT_PATH = path.join(__dirname, "../frontend/src/results/aggregated.json");


// 1. Private Key laden
const privateKeyPem = fs.readFileSync(PRIVATE_KEY_PATH, "utf8");
const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);


// 2. Contract verbinden
const provider = new JsonRpcProvider("http://localhost:8545");
const contract = new Contract(contractAddress, abi, provider);


// 3. Stimmen abrufen und entschlüsseln
async function decryptVotes() {
  const decryptedVotes = [];
  const encryptedVotes = await contract.getEncryptedVotes();

  for (let i = 0; i < encryptedVotes.length; i++) {
    const encryptedVote = encryptedVotes[i];
    const encryptedBytes = Buffer.from(encryptedVote, "base64");

    try {
      const decrypted = privateKey.decrypt(encryptedBytes.toString("binary"), "RSA-OAEP");
      decryptedVotes.push(decrypted);
    } catch (err) {
      console.error(`Fehler beim Entschlüsseln der Stimme ${i}:`, err.message);
    }
  }

  return decryptedVotes;
}

// 4a Ergebnisse aggregieren und speichern (alt)
async function aggregateAndWrite() {
  const votes = await decryptVotes();
  const tally = {};  

  for (const name of votes) {
    tally[name] = (tally[name] || 0) + 1;
  }

  fs.writeFileSync(RESULT_OUTPUT_PATH, JSON.stringify(tally, null, 2));
  console.log("✅ Ergebnisse gespeichert unter:", RESULT_OUTPUT_PATH);
}

// 4b
async function aggregateAndStore(params) {
  const votes = await decryptVotes();
  const tally = {};

  for (const name of votes) {
    tally[name] = (tally[name] || 0) + 1;
  }

  const timestamp = new Date().toISOString();
  const signature = privateKey.sign(forge.md.sha256.create().update(JSON.stringify(tally)).digest().getBytes());

  const tx = await contract.storeResults(tally, timestamp, signature);
  console.log("✅ Ergebnisse gespeichert und Transaktion gesendet:", tx.hash);
  await tx.wait();
  console.log("✅ Transaktion bestätigt:", tx.hash);
}

  

// alt: 
aggregateAndWrite().catch(console.error);
