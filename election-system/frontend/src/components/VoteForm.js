// Token-Eingabe fehlt noch (auch SmartContract)

import React, { useState, useEffect } from "react";
import Election from "../artifacts/contracts/Election.sol/Election.json";
import { BrowserProvider, Contract } from "ethers";
import { CONTRACT_ADDRESSES, PROVIDER_URL } from "../config";

const ethers = require("ethers");

function VoteForm() {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [status, setStatus] = useState("");
  const [tokenInput, setTokenInput] = useState("");
  const [hash, setHash] = useState("");

  useEffect(() => {
    async function fetchCandidates() {
        
        try {
          if (window.ethereum) {
            const provider = new BrowserProvider(window.ethereum);
            const contract = new ethers.Contract(CONTRACT_ADDRESSES.registry, Election.abi, provider);
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
      const tx = await contract.vote(selectedCandidate, ethers.keccak256(ethers.toUtf8Bytes(tokenInput)));
      await tx.wait();
      setStatus("✅ Stimme erfolgreich abgegeben!");
    } catch (err) {
      setStatus("❌ Fehler: " + err.message + " Hash: ");
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
      <input type="text" placeholder="Token" name="token" value={tokenInput} onChange={(e) => setTokenInput(e.target.value)}></input>
      <button onClick={vote} disabled={!selectedCandidate || !tokenInput}>Abstimmen</button>
      <p>{status}</p>
    </div>
  );
}

export default VoteForm;
