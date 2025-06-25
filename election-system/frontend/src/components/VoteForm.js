import { useState, useEffect } from "react";
import forge from "node-forge";
import Election from "../artifacts/contracts/Election.sol/Election.json";
import { BrowserProvider, Contract} from "ethers";
import { CONTRACT_ADDRESSES } from "../config";
import scanner from "../assets/scan-59.png";

const PUBLIC_KEY_PEM = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzySURgrOWXJv9H2bCvE2
AgP0A9C5YqI4bATqaae6UxDsu0JajSx40m0Trg8zoJnYszvUSG/Z6/4sFvTvXuxb
4F+kIjTQSHmkgjW1gYK/k55MddG0kjF/ZH8T0pXNCozTRmyp315vuPrB+0TDD+RP
uK+HllSkZ+iPI3ddR6cGDNgKLMCUfJKvF91nrx/9ZBl3ZbW6Kla/5qO1BLURo1JS
hIq3K40khk+wwIkyPAeP0LLaPCw9RHyQzeFTevYN9zTYPvFuP2WDnlPXCefzzqA0
XTxWcBGvMDH4qcXq86cPAPeuyiCrvrJWClHxgHlASLM50dLKxkI2XIvx8/Cd+gls
iQIDAQAB
-----END PUBLIC KEY-----`;

async function encryptVote(candidateId) {
  const pubKey = forge.pki.publicKeyFromPem(PUBLIC_KEY_PEM);
  const encrypted = pubKey.encrypt(candidateId.toString(), "RSA-OAEP");
  return forge.util.encode64(encrypted);
};

function VoteForm() {
  const [candidates, setCandidates] = useState([]);
  const [parties, setParties] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [selectedParty, setSelectedParty] = useState("");
  const [error, setError] = useState("");
  const [tokenInput, setTokenInput] = useState("");
  const [wahlbezirk, setWahlbezirk] = useState(1);  
  const provider = new BrowserProvider(window.ethereum);
  const contract = new Contract(CONTRACT_ADDRESSES.registry, Election.abi, provider);
      

  useEffect(() => {
    async function fetchCandidates() {
        try {
          if (window.ethereum) {
            const candidatesList = await contract.getCandidates(wahlbezirk);
            setCandidates(candidatesList);
          }
       }
        catch (error) {
          console.error("Fehler beim Abrufen der Kandidaten:", error);
        }        
    }

    async function fetchParties() {
      try {
        const partiesList = await contract.getParties();
        setParties(partiesList);
      } catch (error) {
        console.error("Fehler beim Abrufen der Parteien:", error);
      }
    }

    fetchCandidates();
    fetchParties();
  }, [wahlbezirk]); // Abhängigkeit hinzufügen, damit die Kandidaten bei Änderung des Wahlbezirks neu geladen werden

  const vote = async () => {
      
    if (!window.ethereum) return alert("MetaMask erforderlich!");

    try {
      const provider = new BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const contract = new Contract(CONTRACT_ADDRESSES.registry, Election.abi, signer);
      const encrypted1 = encryptVote(selectedCandidate);
      const encrypted2 = encryptVote(selectedParty);
      const tx = await contract.castEncryptedVote(encrypted1, encrypted2, tokenInput, wahlbezirk);
   
      await tx.wait();
      console.log(tx.data);
      
      setError("✅ Erfolgreich! Transaction: " + tx.hash); 

    } catch (err) {
        setError("❌ Fehler: " + err.message);
    }
  } ;

  return (
  <div>
    <div class="row">   
      <div class="col-50">
        <p>Ihr Token</p>
        <p>
          <input type="text" placeholder="Token" name="token" value={tokenInput} onChange={(e) => setTokenInput(e.target.value)} />
          <button class=".btn"><img src={scanner} alt="Scan icon" width="13" height="13" /></button>
        </p>
      </div>
      <div class="col-50">
        <p>Ihr Wahlbezirk</p>
        <p>
          <input type="number" placeholder="Wahlbezirk" name="wahlbezirk" value={wahlbezirk} onChange={(e) => setWahlbezirk(e.target.value)} />
      </p>      
      </div>
    </div>
    <div id="ballot">
      <div  id="erststimme">    
        <h2>Erststimme</h2>
        {candidates.map((candidate, index ) => (
        <div class="row" key={index}>
          <div class="col-95">
            <span class="left">{candidate.name} &nbsp; {candidate.partei}</span>
          </div>
          <div class="col-5"><input type="radio" key={index} value={candidate.name} name="candidate" onChange={(e) => setSelectedCandidate(e.target.value)} /></div>
        </div>
        ))}    
      </div>
      <div id="zweitstimme">
          <h2>Zeitstimme</h2>
          {party.map((party, index ) => (
            <div class="row" key={index}>
              <div class="col-95">
                <span class="left">{party.name} &nbsp; {party.shortname}</span>
                <div class="col-5">
                  <input type="radio" key={index} value={party.short} name="party" onChange={(e) => setSelectedParty(e.target.value)} />
                </div>
              </div>    
            </div>
          ))}
      </div>
    </div>
      <div class="center"><button onClick={vote} disabled={!selectedCandidate || !tokenInput}>Absenden</button>
        <p>{error}</p>
      </div>
  </div>
  );
}

export default VoteForm;
