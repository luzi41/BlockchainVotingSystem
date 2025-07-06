// V 0.20.1
import { useParams } from 'react-router-dom'
import { useState, useEffect } from "react";
import forge from "node-forge";
import Election from "../artifacts/contracts/Bundestagswahl.sol/Bundestagswahl.json";
import { BrowserProvider, Contract} from "ethers";
import { CONTRACT_ADDRESSES } from "../config";
import scanner from "../assets/scan-59.png";

//const PUBLIC_KEY_PEM = `-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzySURgrOWXJv9H2bCvE2AgP0A9C5YqI4bATqaae6UxDsu0JajSx40m0Trg8zoJnYszvUSG/Z6/4sFvTvXuxb4F+kIjTQSHmkgjW1gYK/k55MddG0kjF/ZH8T0pXNCozTRmyp315vuPrB+0TDD+RPuK+HllSkZ+iPI3ddR6cGDNgKLMCUfJKvF91nrx/9ZBl3ZbW6Kla/5qO1BLURo1JShIq3K40khk+wwIkyPAeP0LLaPCw9RHyQzeFTevYN9zTYPvFuP2WDnlPXCefzzqA0XTxWcBGvMDH4qcXq86cPAPeuyiCrvrJWClHxgHlASLM50dLKxkI2XIvx8/Cd+glsiQIDAQAB-----END PUBLIC KEY-----`;

async function encryptVote(_toVoted, _publicKey) {
  //console.log("PubKey: " + _publicKey);
  const pubKey = forge.pki.publicKeyFromPem(_publicKey);
  const encrypted = pubKey.encrypt(_toVoted.toString(), "RSA-OAEP");
  return forge.util.encode64(encrypted);
};

function VoteForm() {
 
  let { ed } = useParams();
  if (isNaN(ed)) // muss sein: "nicht in Wahlkreisen vorhanden"
  {
    ed = 1;
  }
  const [wahlbezirk, setWahlbezirk] = useState(ed);
  const [candidates, setCandidates] = useState([]);
  const [parties, setParties] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [selectedParty, setSelectedParty] = useState("");
  const [error, setError] = useState("");
  const [tokenInput, setTokenInput] = useState(""); 

  useEffect(() => {
    async function fetchCandidates() {
      try {
        if (window.ethereum) {
          const provider = new BrowserProvider(window.ethereum);
          const contract = new Contract(CONTRACT_ADDRESSES.registry, Election.abi, provider);
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
         
        if (window.ethereum) {
          const provider = new BrowserProvider(window.ethereum);
          const contract = new Contract(CONTRACT_ADDRESSES.registry, Election.abi, provider);           
          const partiesList = await contract.getParties();
          setParties(partiesList);
        }
      } catch (error) {
        console.error("Fehler beim Abrufen der Parteien:", error);
      }
    }

    fetchCandidates();
    fetchParties();
  }, [wahlbezirk, selectedCandidate, selectedParty]); // Abhängigkeit hinzufügen, damit die Kandidaten bei Änderung des Wahlbezirks neu geladen werden
  //console.log("WB: " + wahlbezirk + " SC: " + selectedCandidate);
  /*
   * function vote
   * Aktion 33: Verschlüsselt Stimmen aus Formular und sendet 
   * diese an den RPC-Knoten der Blockchain.
   * @return string (tx hash or error)
   */
  const vote = async () => {
      
    if (!window.ethereum) return alert("MetaMask erforderlich!");

    try {
      const provider = new BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const contract = new Contract(CONTRACT_ADDRESSES.registry, Election.abi, signer);
      const electionDistrict = await contract.getElectionDistrictByNumber(wahlbezirk);
      //console.log("ed: " + electionDistrict.name + ", " + electionDistrict.publicKey);
      const encrypted1 = encryptVote(selectedCandidate, electionDistrict.publicKey);
      const encrypted2 = encryptVote(selectedParty, electionDistrict.publicKey);
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
        <p>Ihr Wahlkreis</p>
        <p>
          {wahlbezirk}
      </p>      
      </div>
    </div>
    <div id="ballot">
      <div  id="erststimme">    
        <h2>Erststimme</h2>
        {candidates.map((candidate, index ) => (
        <div class="row" key={index}>
          <div class="col-95">
            <span class="left">{candidate.name}</span><span class="right">{candidate.partei}</span>
          </div>
          <div class="col-5"><input type="radio" disabled={!wahlbezirk} class="vote" key={index} value={candidate.name} name="candidate" onChange={(e) => setSelectedCandidate(e.target.value)} /></div>
        </div>
        ))}    
      </div>
      <div id="zweitstimme">
          <h2>Zweitstimme</h2>
          {parties.map((party, index ) => (
            <div class="row" key={index}>
              <div class="col-95">
                <span class="left">{party.name} &nbsp; {party.shortname}</span>
              </div> 
                <div class="col-5">
                      <input type="radio" disabled={!wahlbezirk} class="radio" key={index} value={party.shortname} name="party" onChange={(e) => setSelectedParty(e.target.value)} />
                </div>
            </div>
          ))}
      </div>
    </div>
      <div class="center"><button type="submit" onClick={vote} disabled={!tokenInput}>Absenden</button>
        <p>{error}</p>
      </div>
      
  </div>
  );
}

export default VoteForm;
