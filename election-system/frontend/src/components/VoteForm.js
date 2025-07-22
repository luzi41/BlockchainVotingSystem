// V 0.22.3
import { useParams } from 'react-router-dom'
import { useState, useEffect } from "react";
import forge from "node-forge";
import Election from "../artifacts/contracts/Bundestagswahl.sol/Bundestagswahl.json";
import { JsonRpcProvider, Wallet, Contract} from "ethers";
import scanner from "../assets/scan-59.png";

const isElectron = navigator.userAgent.toLowerCase().includes('electron');
const provider = new JsonRpcProvider(process.env.REACT_APP_RPC_URL);
const contract = new Contract(process.env.REACT_APP_CONTRACT_ADDRESS, Election.abi, provider);
let modus = 0;

async function encryptVote(_toVoted, _publicKey) {
  const pubKey = forge.pki.publicKeyFromPem(_publicKey);
  const encrypted = pubKey.encrypt(_toVoted.toString(), "RSA-OAEP");
  return forge.util.encode64(encrypted);
};

function VoteForm() {
  let { ed } = useParams();
  const [electionDistrictNo, setElectionDistrictNo] = useState(() => {  
    if (isNaN(ed)) // muss sein: "nicht in Wahlkreisen vorhanden"
      {
        return process.env.REACT_APP_ELECTION_DISTRICT
      }
      return ed;
    });
  const [candidates, setCandidates] = useState([]);
  const [parties, setParties] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [selectedParty, setSelectedParty] = useState("");
  const [error, setError] = useState("");
  const [tokenInput, setTokenInput] = useState(""); 
  
  const [privateKey, setPrivateKey] = useState(() => {
    if (!process.env.REACT_APP_PRIVATE_KEY?.trim() || process.env.REACT_APP_PRIVATE_KEY === null) {
      const wallet = Wallet.createRandom();
      return wallet.privateKey;
    }
    return process.env.REACT_APP_PRIVATE_KEY?.trim();
  });
  
  const [proposals, setProposals] = useState([]);

  if(isElectron) {
    const ipcRenderer = window.ipcRenderer;
    ipcRenderer.invoke('settings:get', 'electionDistrict').then((val) => {
      if (val !== undefined && val !== null) {
       setElectionDistrictNo(val);
      }
    });
    
    ipcRenderer.invoke('settings:get', 'privateKey').then((val) => {
      if (val !== undefined && val !== null) {
        setPrivateKey(val);
      }
    });
    
  }
  const signer = new Wallet(privateKey, provider);  

  useEffect(() => {
    /*
     * fetchData
     */
    async function fetchData() {
      try {
        modus = await contract.getModus();
        console.log("Modus: ", modus.toString());
        if (modus.toString() === "1") {
          const candidatesList = await contract.getCandidates(electionDistrictNo);
          setCandidates(candidatesList);
          const partiesList = await contract.getParties();
          setParties(partiesList);
        } else if (modus.toString() === 2) {
          const proposalList = await contract.getProposals();
          setProposals(proposalList);
        }
      }
      catch (error) {
        console.error("Fehler:", error);
      }        
    }
    fetchData();
  }, [electionDistrictNo, selectedCandidate, selectedParty, proposals]); // Abhängigkeit hinzufügen, damit die Werte neu geladen werden

  //if (modus.toString === "1") {
    /*
    * const vote Bundestagswahl
    * Aktion 33: Verschlüsselt Stimmen aus Formular und sendet 
    * diese an den RPC-Knoten der Blockchain.
    * @return string (tx hash or error)
    */
  const vote = async () => {
    try {
      const contract = new Contract(process.env.REACT_APP_CONTRACT_ADDRESS, Election.abi, signer);
      if (modus.toString() === "1") {      
        const electionDistrict = await contract.getElectionDistrictByNumber(electionDistrictNo);
        const encrypted1 = encryptVote(selectedCandidate, electionDistrict.publicKey);
        const encrypted2 = encryptVote(selectedParty, electionDistrict.publicKey);
        const tx = await contract.castEncryptedVote(encrypted1, encrypted2, tokenInput, electionDistrictNo);
        await tx.wait();
        setError("✅ Erfolgreich! Transaction: " + tx.hash); 
      } else if (modus.toString() === "1") {
        const publicKey = await contract.getPublicKey();
        const encrypted = encryptVote(selectedCandidate, publicKey);
        const tx = await contract.castEncryptedVote(encrypted, tokenInput);
        await tx.wait();
        setError("✅ Erfolgreich! Transaction: " + tx.hash); 
      }

    } catch (err) {
        setError("❌ Fehler: " + err.message);
    }
  };

  const htmlBundestagswahl = (
  // Form für Bundestagswahl
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
            {electionDistrictNo}
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
            <div class="col-5"><input type="radio" disabled={!electionDistrictNo} class="vote" key={index} value={candidate.name} name="candidate" onChange={(e) => setSelectedCandidate(e.target.value)} /></div>
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
                        <input type="radio" disabled={!electionDistrictNo} class="radio" key={index} value={party.shortname} name="party" onChange={(e) => setSelectedParty(e.target.value)} />
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

return htmlBundestagswahl;
  
}

export default VoteForm;
