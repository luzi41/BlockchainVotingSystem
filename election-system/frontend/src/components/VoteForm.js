import React, { useState, useEffect } from "react";
import Election from "../artifacts/contracts/Election.sol/Election.json";
import { BrowserProvider, Contract } from "ethers";

const ethers = require("ethers");
const contractAddress = "0x2FB52Ef60fb8f38c6e3B9c1160868969773C8223"; // Adresse des deployten Contracts

function VoteForm() {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    async function fetchCandidates() {
        try {
          if (window.ethereum) {
         // const provider = new ethers.providers.Web3Provider(window.ethereum);
            const provider = new BrowserProvider(window.ethereum);
            const contract = new ethers.Contract(contractAddress, Election.abi, provider);
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

    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    const provider = new BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, Election.abi, signer);

    try {
      const tx = await contract.vote(selectedCandidate);
      await tx.wait();
      setStatus("✅ Stimme erfolgreich abgegeben!");
    } catch (err) {
      setStatus("❌ Fehler: " + err.message );
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
