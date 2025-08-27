// V0.27.2
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import forge from "node-forge";
import { Wallet, Contract } from "ethers";
import { useElectionStatus } from "../hooks/useElectionStatus"; 
import { loadAbi } from "../utils/loadAbi";
import { loadTexts } from "../utils/loadTexts";
import scanner from "../assets/scan-59.png";

const isElectron = navigator.userAgent.toLowerCase().includes('electron');

async function encryptVote(_toVoted, _publicKey) {
  const pubKey = forge.pki.publicKeyFromPem(_publicKey);
  const encrypted = pubKey.encrypt(_toVoted.toString(), "RSA-OAEP");
  return forge.util.encode64(encrypted);
}

function VoteForm({ ed }) {
  const { provider, address, electionId } = useElectionStatus();  // 👈 Hook nutzen
  const [modus, setModus] = useState(1);
  const [error, setError] = useState("");
  const [tokenInput, setTokenInput] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [parties, setParties] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [selectedParty, setSelectedParty] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [proposals, setProposals] = useState([]);
  const [texts, setTexts] = useState(null);
  const params = useParams();
  const edNo = params.ed || ed || '';
  
  const [electionDistrictNo, setElectionDistrictNo] = useState(() => {
      return isNaN(edNo) ? process.env.REACT_APP_ELECTION_DISTRICT : edNo;
  });

  useEffect(() => {
    if (!isElectron) return;

    const ipc = window.electronAPI;
    // Handler-Funktion für Settings-Änderungen
    const handleSettingsChange = async (event, newSettings) => {
      if (newSettings.electionDistrict) {
        setElectionDistrictNo(newSettings.electionDistrict);
      }
      if (newSettings.privateKey) {
        setPrivateKey(newSettings.privateKey);
      }
    };

    // Event-Listener registrieren
    ipc.on('settings-changed', handleSettingsChange);

    // Cleanup: Listener entfernen
    return () => {
      ipc.removeListener('settings-changed', handleSettingsChange);
    };
  }, []);  

  // Synchronisiere electionDistrictNo immer mit edNo
  useEffect(() => {
    if (!isNaN(edNo) && edNo !== electionDistrictNo) {
      setElectionDistrictNo(edNo);
    }
  }, [edNo]);

  // Dynamischen ABI + Settings laden
  useEffect(() => {

    async function fetchContractAndSettings() {
      try {
        setError("");
        const _texts = await loadTexts("voteForm-texts");
        setTexts(_texts);
        let _privateKey, _electionDistrict;
        
        if (isElectron) {
          const ipc = window.electronAPI;
          _privateKey = await ipc.settings.get('privateKey');
          if (!_privateKey) {
            throw new Error("Fehlende Einstellungen (_privateKey) im Electron Store");
          }          

          _electionDistrict = await ipc.settings.get('electionDistrict');
          setElectionDistrictNo(_electionDistrict);
        } else { // Web-Version
          _privateKey = process.env.REACT_APP_PRIVATE_KEY || Wallet.createRandom().privateKey;
          //_rpcURL = process.env.REACT_APP_RPC_URL;
          _electionDistrict = process.env.REACT_APP_ELECTION_DISTRICT;

          // Nur setzen, wenn kein edNo vorhanden ist!
          if (!edNo) {
            setElectionDistrictNo(_electionDistrict);
          }         

          if (!_privateKey) {
            throw new Error("Fehlende Einstellungen in .env");
          }

        }
        setPrivateKey(_privateKey);

      } catch (err) {
        console.error("Fehler beim Laden des Vertrags und der Einstellungen:", err);
        //setError("❌ Fehler beim Laden der Konfiguration");
      }
    }

    fetchContractAndSettings();
  }, [provider, address, electionId, edNo, modus]);

  // Vertragsdaten laden
  useEffect(() => {
    if (!provider || !address || !electionId) return;
    if (!electionDistrictNo) return; // <--- NEU: erst laden, wenn Wert da ist!
    async function fetchData() {
      try {
        const abiJson = await loadAbi();
        const ctr = new Contract(address, abiJson.abi, provider);        
        const m = await ctr.getModus();
        setModus(Number(m));
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
        console.error("Fehler beim Abrufen der Daten:", error);
      }
    }

    fetchData();
  }, [electionDistrictNo, address, electionId, provider]);

  const vote = async () => {
    try {
      const abiJson = await loadAbi();
      const signer = new Wallet(privateKey, provider);
      const ctr = new Contract(address, abiJson.abi, signer);

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

  if (!texts) return <p>Load texts ...</p>;

  // Bundestagswahl-Formular
  const htmlBundestagswahl = (
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