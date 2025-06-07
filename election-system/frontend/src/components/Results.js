import React, { useState, useEffect } from "react";
import { BrowserProvider, Contract } from "ethers";

import Election from "../artifacts/contracts/Election.sol/Election.json";
import { CONTRACT_ADDRESSES, PROVIDER_URL } from "../config";

const ethers = require("ethers");

//const contractAddress = "0x00fFD3548725459255f1e78A61A07f1539Db0271"; // Adresse des deployten Contracts

function Results() {
  const [candidates, setCandidates] = useState([]);
  const [winner, setWinner] = useState("");
  const [votes, setVotes] = useState(0);
  const [status, setStatus] = useState("");
  const [totalVotes, setTotalVotes] = useState(0);

  useEffect(() => {
    async function fetchResults() {
      if (window.ethereum) {
        const provider = new BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(CONTRACT_ADDRESSES.registry, Election.abi, provider);
        
        try {
          const [winnerName, winnerVoteCount] = await contract.getWinner();
          const candidatesList = await contract.getCandidates();
          setCandidates(candidatesList);
          setWinner(winnerName);
          setVotes(winnerVoteCount);    
          const total = await contract.getTotalVotes();
          setTotalVotes(total);
          
        } catch (err) {
          setStatus("❌ Fehler: " , err);
          console.error("Fehler beim Abrufen der Ergebnisse: ", err);
        }
      }
    }
    fetchResults();
  }, []);

  return (
    <div>
      <h2>Wahlergebnisse</h2>
      <table>
        <thead><tr><th>Kandidat</th><th>Stimmen</th></tr></thead>
        {candidates.map((candidate, index) => (
          <tbody>
          <tr>
              <td class="key">{candidate.name}</td><td class="value">{candidate.voteCount}</td>
          </tr>
          </tbody>
        ))}
      </table>
      <p>Sieger: {winner}</p>
      <p>Stimmen: {votes} von {totalVotes}</p>
      
      <p>{status}</p>
    </div>
  );
}

export default Results;
