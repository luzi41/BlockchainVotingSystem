import React, { useState, useEffect } from "react";
import Election from "../artifacts/contracts/Election.sol/Election.json";
const ethers = require("ethers");

const contractAddress = "0x..."; // Adresse des deployten Contracts

function Results() {
  const [winner, setWinner] = useState("");
  const [votes, setVotes] = useState(0);

  useEffect(() => {
    async function fetchResults() {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, Election.abi, provider);
        try {
          const [winnerName, winnerVoteCount] = await contract.getWinner();
          setWinner(winnerName);
          setVotes(winnerVoteCount.toNumber());
        } catch (err) {
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
    </div>
  );
}

export default Results;
