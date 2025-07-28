// V0.22.15
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import forge from "node-forge";
import { JsonRpcProvider, Wallet, Contract } from "ethers";
import scanner from "../assets/scan-59.png";
import Election from "../artifacts/contracts/Proposals.sol/Proposals.json";

const isElectron = navigator.userAgent.toLowerCase().includes('electron');

async function encryptVote(_toVoted, _publicKey) {
  const pubKey = forge.pki.publicKeyFromPem(_publicKey);
  const encrypted = pubKey.encrypt(_toVoted.toString(), "RSA-OAEP");
  return forge.util.encode64(encrypted);
}

function VoteForm() {
  let { ed } = useParams();
  if (isNaN(ed)) // muss sein: "nicht in Wahlkreisen vorhanden"
  {
    ed = 1;
  }

  const [contractAddress, setContractAddress] = useState(""); // mit .env vorbelegen?
  const [contract, setContract] = useState(null);
  const [modus, setModus] = useState(0);
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

  // Dynamischen ABI + Settings laden
  useEffect(() => {
    async function fetchContractAndSettings() {
      try {

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
        setElectionDistrictNo(Number(_electionDistrict));

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

        const provider = new JsonRpcProvider(rpcURL);
        const ctr = new Contract(contractAddress, Election.abi, provider);
        setContract(ctr);
        
        const m = await ctr.getModus();
        setModus(Number(m));

        if (Number(m) === 1) {
          const cand = await ctr.getCandidates(electionDistrictNo);
          setCandidates(cand);
          const part = await ctr.getParties();
          setParties(part);
        } else if (Number(m) === 2) {
          const prop = await ctr.getProposals();
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
      const provider = new JsonRpcProvider(rpcURL);
      const signer = new Wallet(privateKey, provider);
      const ctr = new Contract(contractAddress, Election.abi, signer);

      if (modus === 1) {
        const ed = await ctr.getElectionDistrictByNumber(electionDistrictNo);
        const encrypted1 = await encryptVote(selectedCandidate, ed.publicKey);
        const encrypted2 = await encryptVote(selectedParty, ed.publicKey);
        const tx = await ctr.castEncryptedVote(encrypted1, encrypted2, tokenInput, electionDistrictNo);
        await tx.wait();
        setError("✅ Erfolgreich! Transaction: " + tx.hash);
      } else if (modus === 2) {
        const publicKey = await ctr.getPublicKey();
        const encrypted = await encryptVote(selectedAnswer, publicKey);
        const tx = await ctr.castEncryptedVote(encrypted, tokenInput);
        await tx.wait();
        setError("✅ Erfolgreich! Transaction: " + tx.hash);
      }
    } catch (err) {
      setError("❌ Fehler beim Absenden: " + err.message);
    }
  };

  if (!contract) return <p>Lade Vertrag...</p>;

  // Bundestagswahl-Formular
  const htmlBundestagswahl = (
    <div>
      <div className="row">
        <div className="col-50">
          <p>Ihr Token</p>
          <p>
            <input type="text" placeholder="Token" value={tokenInput} onChange={(e) => setTokenInput(e.target.value)} />
            <button className=".btn"><img src={scanner} alt="Scan icon" width="13" height="13" /></button>
          </p>
        </div>
        <div className="col-50">
          <p>Ihr Wahlkreis</p>
          <p>{electionDistrictNo}</p>
        </div>
      </div>

      <div id="ballot">
        <div id="erststimme">
          <h2>Erststimme</h2>
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
          <h2>Zweitstimme</h2>
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
        <button type="submit" onClick={vote} disabled={!tokenInput}>Absenden</button>
        <p>{error}</p>
      </div>
    </div>
  );

  // Petitions-Formular
  const htmlProposal = (
    <div>
      <div className="row">
        <div className="col-50">
          <p>Ihr Token</p>
          <p>
            <input type="text" placeholder="Token" value={tokenInput} onChange={(e) => setTokenInput(e.target.value)} />
            <button className=".btn"><img src={scanner} alt="Scan icon" width="13" height="13" /></button>
          </p>
        </div>
        <div className="col-50">
        </div>
      </div>
      <h2>Petition</h2>
      <p>Das $Parlament möge beschließen, dass</p>
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
            <button type="submit" onClick={vote} disabled={!tokenInput}>Absenden</button>
            <p>{error}</p>
          </div>          
        </div>
      ))}
    </div>
  );

  return modus === 1 ? htmlBundestagswahl : htmlProposal;
}

export default VoteForm;