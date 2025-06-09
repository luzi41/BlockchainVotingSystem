import { useState, useEffect } from "react";
import Election from "../artifacts/contracts/Election.sol/Election.json";
import { BrowserProvider, Contract } from "ethers";
import { CONTRACT_ADDRESSES } from "../config";

const ethers = require("ethers");

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
      const contract = new ethers.Contract(CONTRACT_ADDRESSES.registry, Election.abi, signer);
      const tx = await contract.vote(selectedCandidate, tokenInput);
      await tx.wait();
      setError("✅ Erfolgreich! Transaction: " + tx.hash); 

    } catch (err) {
        setError("❌ Fehler: " + err.message);
    }
  } ;

  return (
    <div>
      <h2>Stimme abgeben</h2>
      <select onChange={(e) => setSelectedCandidate(e.target.value)}>
        <option value="">Wähle einen Kandidaten</option>
        {candidates.map((candidate, index) => (
          <option key={index} value={index} name="candidate">
            {candidate.name}
          </option>
        ))}
      </select>
      <input type="text" placeholder="Token" name="token" value={tokenInput} onChange={(e) => setTokenInput(e.target.value)}></input>
      <button onClick={vote} disabled={!selectedCandidate || !tokenInput}>Abstimmen</button>
      <p>{error}</p>
    </div>
  );
}

export default VoteForm;
