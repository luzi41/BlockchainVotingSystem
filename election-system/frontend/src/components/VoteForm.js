// V 0.22.11
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import forge from "node-forge";
import { JsonRpcProvider, Wallet, Contract } from "ethers";
import scanner from "../assets/scan-59.png";

const isElectron = navigator.userAgent.toLowerCase().includes('electron');
const provider = new JsonRpcProvider(process.env.REACT_APP_RPC_URL);

async function encryptVote(_toVoted, _publicKey) {
  const pubKey = forge.pki.publicKeyFromPem(_publicKey);
  const encrypted = pubKey.encrypt(_toVoted.toString(), "RSA-OAEP");
  return forge.util.encode64(encrypted);
}

function VoteForm() {
  let { ed } = useParams();

  const [contractABI, setContractABI] = useState(null);
  const [contract, setContract] = useState(null);
  const [modus, setModus] = useState(0);
  const [error, setError] = useState("");
  const [tokenInput, setTokenInput] = useState("");

  const [privateKey, setPrivateKey] = useState(() => {
    if (!process.env.REACT_APP_PRIVATE_KEY?.trim()) {
      return Wallet.createRandom().privateKey;
    }
    return process.env.REACT_APP_PRIVATE_KEY.trim();
  });

  const [electionDistrictNo, setElectionDistrictNo] = useState(() => {
    if (isNaN(ed)) return process.env.REACT_APP_ELECTION_DISTRICT;
    return ed;
  });

  const [candidates, setCandidates] = useState([]);
  const [parties, setParties] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [selectedParty, setSelectedParty] = useState("");

  const [proposals, setProposals] = useState([]);

  const signer = new Wallet(privateKey, provider);

  // Dynamischen ABI-Import aus .env
  useEffect(() => {
    async function loadABI() {
      try {
        const module = await import(`${process.env.REACT_APP_ELECTION}`);
        setContractABI(module.default);
      } catch (err) {
        console.error("Fehler beim Laden des ABI:", err);
      }
    }
    loadABI();
  }, []);

  // Wenn ABI geladen: Contract initialisieren
  useEffect(() => {
    if (!contractABI) return;
    const ctr = new Contract(process.env.REACT_APP_CONTRACT_ADDRESS, contractABI.abi, provider);
    setContract(ctr);
  }, [contractABI]);

  // Electron Settings laden
  useEffect(() => {
    if (!isElectron) return;
    const ipcRenderer = window.ipcRenderer;

    ipcRenderer.invoke('settings:get', 'electionDistrict').then((val) => {
      if (val) setElectionDistrictNo(val);
    });

    ipcRenderer.invoke('settings:get', 'privateKey').then((val) => {
      if (val) setPrivateKey(val);
    });
  }, []);

  // Daten abrufen
  useEffect(() => {
    if (!contract) return;

    async function fetchData() {
      try {
        const m = await contract.getModus();
        setModus(Number(m));

        if (Number(m) === 1) {
          const cand = await contract.getCandidates(electionDistrictNo);
          setCandidates(cand);
          const part = await contract.getParties();
          setParties(part);
        } else if (Number(m) === 2) {
          const prop = await contract.getProposals();
          setProposals(prop);
        }
      } catch (error) {
        console.error("Fehler beim Abrufen:", error);
      }
    }

    fetchData();
  }, [contract, electionDistrictNo]);

  const vote = async () => {
    try {
      const ctr = new Contract(process.env.REACT_APP_CONTRACT_ADDRESS, contractABI.abi, signer);

      if (modus === 1) {
        const ed = await ctr.getElectionDistrictByNumber(electionDistrictNo);
        const encrypted1 = await encryptVote(selectedCandidate, ed.publicKey);
        const encrypted2 = await encryptVote(selectedParty, ed.publicKey);
        const tx = await ctr.castEncryptedVote(encrypted1, encrypted2, tokenInput, electionDistrictNo);
        await tx.wait();
        setError("✅ Erfolgreich! Transaction: " + tx.hash);
      } else if (modus === 2) {
        const publicKey = await ctr.getPublicKey();
        const encrypted = await encryptVote(selectedCandidate, publicKey);
        const tx = await ctr.castEncryptedVote(encrypted, tokenInput);
        await tx.wait();
        setError("✅ Erfolgreich! Transaction: " + tx.hash);
      }
    } catch (err) {
      setError("❌ Fehler: " + err.message);
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
      <h2>Petition</h2>
      <p>Das $Parlament möge beschließen, dass</p>
      {proposals.map((p, i) => (
        <div className="row" key={i}>
          <div className="col-95">{p.text}</div>
          <div className="col-5">{p.answer1}</div>
        </div>
      ))}
    </div>
  );

  return modus === 1 ? htmlBundestagswahl : htmlProposal;
}

export default VoteForm;
