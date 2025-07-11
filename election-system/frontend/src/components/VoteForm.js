// V 0.21.4
import { useParams } from 'react-router-dom'
import { useState, useEffect } from "react";
import forge from "node-forge";
import Election from "../artifacts/contracts/Bundestagswahl.sol/Bundestagswahl.json";
import { JsonRpcProvider, Wallet, Contract} from "ethers";
import scanner from "../assets/scan-59.png";

async function encryptVote(_toVoted, _publicKey) {
  const pubKey = forge.pki.publicKeyFromPem(_publicKey);
  const encrypted = pubKey.encrypt(_toVoted.toString(), "RSA-OAEP");
  return forge.util.encode64(encrypted);
};

function VoteForm() {
  const [wahlbezirk] = useState(process.env.REACT_APP_ELECTION_DISTRICT);
  const [candidates, setCandidates] = useState([]);
  const [parties, setParties] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [selectedParty, setSelectedParty] = useState("");
  const [error, setError] = useState("");
  const [tokenInput, setTokenInput] = useState(""); 

  const provider = new JsonRpcProvider(process.env.REACT_APP_RPC_URL);
  const contract = new Contract(process.env.REACT_APP_CONTRACT_ADDRESS, Election.abi, provider);
  const PRIVATE_KEY = process.env.REACT_APP_PRIVATE_KEY?.trim();
  const signer = new Wallet(PRIVATE_KEY, provider);  

  useEffect(() => {
    async function fetchData() {
      try {
        const candidatesList = await contract.getCandidates(wahlbezirk);
        setCandidates(candidatesList);
        const partiesList = await contract.getParties();
        setParties(partiesList);

      }
      catch (error) {
          console.error("Fehler beim Abrufen der Kandidaten:", error);
      }        
    }
    fetchData();
  }, [wahlbezirk, selectedCandidate, selectedParty]); // Abhängigkeit hinzufügen, damit die Kandidaten bei Änderung des Wahlbezirks neu geladen werden

  /*
   * function vote
   * Aktion 33: Verschlüsselt Stimmen aus Formular und sendet 
   * diese an den RPC-Knoten der Blockchain.
   * @return string (tx hash or error)
   */
  const vote = async () => {
      
    try {
      const contract = new Contract(process.env.REACT_APP_CONTRACT_ADDRESS, Election.abi, signer);
      const electionDistrict = await contract.getElectionDistrictByNumber(wahlbezirk);
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
