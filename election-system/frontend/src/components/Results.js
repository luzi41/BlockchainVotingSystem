import React, { useState, useEffect } from "react";
import { BrowserProvider, Contract } from "ethers";
import Election from "../artifacts/contracts/Election.sol/Election.json";

const ethers = require("ethers");

const contractAddress = "0x00..."; // Adresse des deployten Contracts

function Results() {
  const [winner, setWinner] = useState("");
  const [votes, setVotes] = useState(0);
  const [status, setStatus] = useState("");
  const [totalVotes, setTotalVotes] = useState(0);

  useEffect(() => {
    async function fetchResults() {
      if (window.ethereum) {
        const provider = new BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, Election.abi, provider);

        try {
          const [winnerName, winnerVoteCount] = await contract.getWinner();
          //const total = await contract.getTotalVotes();
          setWinner(winnerName);
          setVotes(winnerVoteCount);
          
        } catch (err) {
          setStatus("❌ Fehler: " , err);
          console.error("Fehler beim Abrufen der Ergebnisse:", err);
        }
      }
    }
    fetchResults();
  }, []);

  return (
    <div>
      <h2>Wahlergebnisse</h2>
      <p>Sieger: {winner}</p>
      <p>Stimmen: {votes}</p>
      
      <p>{status}</p>
    </div>
  );
}

export default Results;
