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

/*
async function loadPublicKey() {
  const res = await fetch("../keys/public.pem");
  const pem = await res.text();
  return pem;
}
*/
async function encryptVote(candidateId) {
  //const pem = await loadPublicKey();
  const pubKey = forge.pki.publicKeyFromPem(PUBLIC_KEY_PEM);
  const encrypted = pubKey.encrypt(candidateId.toString(), "RSA-OAEP");
  return forge.util.encode64(encrypted);
};


function VoteForm() {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [error, setError] = useState("");
  const [tokenInput, setTokenInput] = useState("");


  useEffect(() => {
    async function fetchCandidates() {
        
        try {
          if (window.ethereum) {
            const provider = new BrowserProvider(window.ethereum);
            const contract = new Contract(CONTRACT_ADDRESSES.registry, Election.abi, provider);
            const candidatesList = await contract.getCandidates();
            setCandidates(candidatesList);
          }
       }
        catch (error) {
            console.error("Fehler beim Abrufen der Kandidaten:", error);
        }        
    }
    fetchCandidates();
  }, []);

  const vote = async () => {
      
    if (!window.ethereum) return alert("MetaMask erforderlich!");

    try {
      const provider = new BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const contract = new Contract(CONTRACT_ADDRESSES.registry, Election.abi, signer);
      const encrypted = encryptVote(selectedCandidate);
      // const tx = await contract.vote(selectedCandidate, tokenInput);
      const tx = await contract.castEncryptedVote(encrypted, tokenInput);
   
      await tx.wait();
      console.log(tx.data);
      
      setError("✅ Erfolgreich! Transaction: " + tx.hash); 

    } catch (err) {
        setError("❌ Fehler: " + err.message);
    }
  } ;

  return (
  <div>
    <div class="border">
      <p>Ihr Token</p>
      <p>
        <input type="text" placeholder="Token" name="token" value={tokenInput} onChange={(e) => setTokenInput(e.target.value)} />
        <button class=".btn"><img src={scanner} alt="Scan icon" width="13" height="13" /></button></p>
    </div>

    <div class="">
      <div id="ballot">
        <h2>Stimmzettel</h2>
          {candidates.map((candidate, index ) => (
          <div class="row">
            <div class="col-95">{candidate.name}</div>
            <div class="col-5"><input type="radio" key={index} value={candidate.name} name="candidate" onChange={(e) => setSelectedCandidate(e.target.value)} /></div>
          </div>
          ))}
        <button onClick={vote} disabled={!selectedCandidate || !tokenInput}>Abstimmen</button>
        <p>{error}</p>
      </div>
    </div>
  </div>
  );
}

export default VoteForm;
