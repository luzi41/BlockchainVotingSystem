import React, { useState, useEffect } from "react";
import Election from "../artifacts/contracts/Election.sol/Election.json";

const ethers = require("ethers");
const contractAddress = "0x..."; // Adresse des deployten Contracts

function VoteForm() {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    async function fetchCandidates() {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, Election.abi, provider);
        const candidatesList = await contract.getCandidates();
        setCandidates(candidatesList);
      }
    }
    fetchCandidates();
  }, []);

  const vote = async () => {
    if (!window.ethereum) return alert("MetaMask erforderlich!");

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, Election.abi, signer);

    try {
      const tx = await contract.vote(selectedCandidate);
      await tx.wait();
      setStatus("✅ Stimme erfolgreich abgegeben!");
    } catch (err) {
      setStatus("❌ Fehler: " + err.message);
    }
  };

  return (
    <div>
      <h2>Stimme abgeben</h2>
      <select onChange={(e) => setSelectedCandidate(e.target.value)}>
        <option value="">Wähle einen Kandidaten</option>
        {candidates.map((candidate, index) => (
          <option key={index} value={index}>
            {candidate.name}
          </option>
        ))}
      </select>
      <button onClick={vote}>Abstimmen</button>
      <p>{status}</p>
    </div>
  );
}

export default VoteForm;
