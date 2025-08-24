// V0.25.8
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import forge from "node-forge";
import { JsonRpcProvider, Wallet, Contract } from "ethers";
import scanner from "../assets/scan-59.png";

// ✅ Web: statisch importierte ABIs (Registry)
import ProposalsABI from "../artifacts/contracts/Proposals.sol/Proposals.json";
import BundestagswahlABI from "../artifacts/contracts/Bundestagswahl.sol/Bundestagswahl.json";

// Wenn du weitere Modi hast, hier ergänzen:
// import OtherABI from "../artifacts/contracts/Other.sol/Other.json";
const ABI_REGISTRY = {
	Proposals: ProposalsABI,
	Bundestagswahl: BundestagswahlABI,
};

const isElectron = navigator.userAgent.toLowerCase().includes('electron');

async function encryptVote(_toVoted, _publicKey) {
  const pubKey = forge.pki.publicKeyFromPem(_publicKey);
  const encrypted = pubKey.encrypt(_toVoted.toString(), "RSA-OAEP");
  return forge.util.encode64(encrypted);
}

function VoteForm() {
  // JSON-Lader: Electron via IPC, Web via fetch
  async function loadJson(relativePath) {
    // relativePath OHNE führenden Slash übergeben, z.B. "texts/start-texts.de.json"
    if (window.electronAPI?.invoke) {
      return await window.electronAPI.invoke("load-json", relativePath);
    } else {
      const base = (process.env.PUBLIC_URL || "").replace(/\/$/, "");
      const url = `${base}/${relativePath.replace(/^\//, "")}`;
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) {
        const body = await res.text().catch(() => "");
        throw new Error(
          `fetch ${url} -> ${res.status} ${res.statusText}; body starts: ${body.slice(0, 120)}`
        );
      }
      const text = await res.text();
      try {
        return JSON.parse(text);
      } catch {
        throw new Error(`Invalid JSON at ${url}; body starts: ${text.slice(0, 120)}`);
      }
    }
  }

  let { ed } = useParams();
  if (isNaN(ed)) // muss sein: "nicht in Wahlkreisen vorhanden"
  {
    ed = 1;
  }
  const [electionId, setElectionId] = useState(1);
  const [contractAddress, setContractAddress] = useState(""); // mit .env vorbelegen?
  const [contract, setContract] = useState(null);
  const [modus, setModus] = useState(1);
  const [error, setError] = useState("");
  const [tokenInput, setTokenInput] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [electionDistrictNo, setElectionDistrictNo] = useState(ed);
  const [rpcURL, setRpcURL] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [parties, setParties] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [selectedParty, setSelectedParty] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [proposals, setProposals] = useState([]);
  const [texts, setTexts] = useState(null);

  // Dynamischen ABI + Settings laden
  useEffect(() => {
    async function fetchContractAndSettings() {
      try {
        setError("");

        // 🗣 Texte laden
        const lang = process.env.REACT_APP_LANG || "de";
		    let loadedTexts;
        if (window.electronAPI?.invoke) {
			    loadedTexts = await loadJson(`texts/voteForm-texts.${lang}.json`);			
        } else {  
          // Aus public/texts laden
          const textsRes = await fetch(`/texts/voteForm-texts.${lang}.json`);
          if (!textsRes.ok) throw new Error("Textdatei nicht gefunden");
          loadedTexts = await textsRes.json();
        }
        setTexts(loadedTexts);

        let _privateKey, _rpcURL, _electionDistrict;
        
        if (isElectron) {
          const ipc = window.electronAPI;

          _privateKey = await ipc.settings.get('privateKey');
          if (!_privateKey) {
            throw new Error("Fehlende Einstellungen (_privateKey) im Electron Store");
          }          
          _rpcURL = await ipc.settings.get('rpcURL');
          if (!_rpcURL) {
            throw new Error("Fehlende Einstellungen (_rpcURL) im Electron Store");
          }

          _electionDistrict = await ipc.settings.get('electionDistrict');
          setElectionDistrictNo(_electionDistrict);

        } else {
          _privateKey = process.env.REACT_APP_PRIVATE_KEY || Wallet.createRandom().privateKey;
          _rpcURL = process.env.REACT_APP_RPC_URL;
          _electionDistrict = process.env.REACT_APP_ELECTION_DISTRICT || 0;
          

          if (!_privateKey || !_rpcURL) {
            throw new Error("Fehlende Einstellungen in .env");
          }

        }
        setPrivateKey(_privateKey);
        setRpcURL(_rpcURL);
        setContractAddress(process.env.REACT_APP_CONTRACT_ADDRESS);
        //setElectionDistrictNo(Number(_electionDistrict));

      } catch (err) {
        console.error("Fehler beim Laden des Vertrags und der Einstellungen:", err);
        setError("❌ Fehler beim Laden der Konfiguration");
      }
    }

    fetchContractAndSettings();
  }, []);

  // Vertragsdaten laden
  useEffect(() => {
    async function fetchData() {
      try {
        if (!rpcURL || !contractAddress) return;

        // 🧠 ABI laden
        const name = process.env.REACT_APP_ELECTION_MODE_NAME || "Proposals";
        let abiJson;

        if (window.electronAPI?.invoke) {
          // Electron: aus build/resources laden (IPC)
          try {
            abiJson = await window.electronAPI.invoke(`load-json`, `contracts/${name}.json`);
          } catch {
            abiJson = await window.electronAPI.invoke(
              `load-json`,
              `contracts/${name}.sol/${name}.json`
            );
          }
        } else {
          // Web: direkt aus Import (kein fetch → keine HTML-404s)
          abiJson = ABI_REGISTRY[name];
          if (!abiJson) {
            throw new Error(
              `ABI "${name}" nicht in ABI_REGISTRY registriert. Bitte importieren und eintragen.`
            );
          }
        }

        const provider = new JsonRpcProvider(rpcURL);
        const ctr = new Contract(contractAddress, abiJson.abi, provider);
        setContract(ctr);
        /*
        const m = await ctr.getModus();
        setModus(Number(m));
        */
        if (Number(modus) === 1) {
          const cand = await ctr.getCandidates(electionId, electionDistrictNo);
          setCandidates(cand);
          const part = await ctr.getParties(electionId);
          setParties(part);
        } else if (Number(modus) === 2) {
          const prop = await ctr.getProposals(electionId);
          setProposals(prop);
        }

      } catch (error) {
        console.error("Fehler beim Abrufen:", error);
        setError("❌ Fehler beim Abrufen des Vertrags");
      }
    }

    fetchData();
  }, [rpcURL, contractAddress, electionDistrictNo]);

  const vote = async () => {
    try {
      // 🧠 ABI laden
//      const name = process.env.REACT_APP_ELECTION_MODE_NAME || "Proposals";
      const name = process.env.REACT_APP_ELECTION_MODE_NAME || "Bundestagswahl";
      let abiJson;

      if (window.electronAPI?.invoke) {
        // Electron: aus build/resources laden (IPC)
        try {
          abiJson = await window.electronAPI.invoke(`load-json`, `contracts/${name}.json`);
        } catch {
          abiJson = await window.electronAPI.invoke(
            `load-json`,
            `contracts/${name}.sol/${name}.json`
          );
        }
      } else {
        // Web: direkt aus Import (kein fetch → keine HTML-404s)
        abiJson = ABI_REGISTRY[name];
        if (!abiJson) {
          throw new Error(
            `ABI "${name}" nicht in ABI_REGISTRY registriert. Bitte importieren und eintragen.`
          );
        }
      }

      const provider = new JsonRpcProvider(rpcURL);
      const signer = new Wallet(privateKey, provider);
      const ctr = new Contract(contractAddress, abiJson.abi, signer);

      if (modus === 1) {
        const _electionDistrict = await ctr.getElectionDistrictByNumber(electionId, electionDistrictNo);
        const encrypted1 = await encryptVote(selectedCandidate, _electionDistrict.publicKey);
        const encrypted2 = await encryptVote(selectedParty, _electionDistrict.publicKey);
        const tx = await ctr.castEncryptedVote(electionId, encrypted1, encrypted2, tokenInput, electionDistrictNo);
        await tx.wait();
        setError("✅ Erfolgreich! Transaction: " + tx.hash);
      } else if (modus === 2) {
        const publicKey = await ctr.getPublicKey();
        const encrypted = await encryptVote(selectedAnswer, publicKey);
        const tx = await ctr.castEncryptedVote(electionId, encrypted, tokenInput);
        await tx.wait();
        setError("✅ Erfolgreich! Transaction: " + tx.hash);
      }
    } catch (err) {
      setError("❌ Fehler beim Absenden: " + err.message);
    }
  };

  if (!contract || !texts) return <p>Load data ...</p>;

  // Bundestagswahl-Formular
  const htmlBundestagswahl = (
    <div>
      <div className="row">
        <div className="col-50">
          <p>{texts.yourToken}</p>
          <p>
            <input type="text" placeholder={texts.token} value={tokenInput} onChange={(e) => setTokenInput(e.target.value)} />
            <button name="scanToken" className=".btn"><img src={scanner} alt="Scan icon" width="13" height="13" /></button>
          </p>
        </div>
        <div className="col-50">
          <p>{texts.yourElectionDistrict}</p>
          <p>{electionDistrictNo}</p>
        </div>
      </div>

      <div id="ballot">
        <div id="erststimme">
          <h2>{texts.firstVote}</h2>
          {candidates.map((c, i) => (
            <div className="row" key={i}>
              <div className="col-95">
                <span className="left">{c.name}</span><span className="right">{c.partei}</span>
              </div>
              <div className="col-5">
                <input type="radio" className="vote" value={c.name} name="candidate" onChange={(e) => setSelectedCandidate(e.target.value)} />
              </div>
            </div>
          ))}
        </div>

        <div id="zweitstimme">
          <h2>{texts.secondVote}</h2>
          {parties.map((p, i) => (
            <div className="row" key={i}>
              <div className="col-95">
                <span className="left">{p.name} &nbsp; {p.shortname}</span>
              </div>
              <div className="col-5">
                <input type="radio" className="radio" value={p.shortname} name="party" onChange={(e) => setSelectedParty(e.target.value)} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="center">
        <button name="send" type="submit" onClick={vote} disabled={!tokenInput}>{texts.btnSend}</button>
        <p>{error}</p>
      </div>
    </div>
  );

  // Petitions-Formular
  const htmlProposal = (
    <div>
      <div className="row">
        <div className="col-50">
          <p>{texts.yourToken}</p>
          <p>
            <input name="token" type="text" placeholder={texts.token} value={tokenInput} onChange={(e) => setTokenInput(e.target.value)} />
            <button name="scanToken" className=".btn"><img src={scanner} alt="Scan icon" width="13" height="13" /></button>
          </p>
        </div>
        <div className="col-50">
        </div>
      </div>
      <h2>{texts.survey}</h2>
      {proposals.map((p, i) => (
        <div className="row" key={i}>
          <div className="col-80">{p.text}</div>
          <div className="col-10">{p.answer1}                
            <input type="radio" 
              className="radio" 
              value={p.answer1} 
              name="accepted" 
              onChange={(e) => setSelectedAnswer(e.target.value)} />
          </div>
          <div className="col-10">{p.answer2}
            <input type="radio" 
              className="radio" 
              value={p.answer2} 
              name="accepted" 
              onChange={(e) => setSelectedAnswer(e.target.value)} />
          </div>
          <div>&nbsp;</div>
          <div className="center">
            <button name="send" type="submit" onClick={vote} disabled={!tokenInput}>{texts.btnSend}</button>
            <p>{error}</p>
          </div>          
        </div>
      ))}
    </div>
  );

  return modus === 1 ? htmlBundestagswahl : htmlProposal;
}

export default VoteForm;