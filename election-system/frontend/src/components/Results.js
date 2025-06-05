import React, { useState, useEffect } from "react";
import { BrowserProvider, Contract } from "ethers";
import Election from "../artifacts/contracts/Election.sol/Election.json";
import contractAddress from "../deployment-address.txt"
const ethers = require("ethers");
// const contractAddress = "0x38Fef9ccf..."; // Adresse des deployten Contracts

function Results() {
  const [winner, setWinner] = useState("");
  const [votes, setVotes] = useState(0);
  const [totalVotes, setTotalVotes] = useState(0); // Contract muss erneut kompiliert werden.

  useEffect(() => {
    async function fetchResults() {
      if (window.ethereum) {
        const provider = new BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, Election.abi, provider);
        try {
          const [winnerName, winnerVoteCount] = await contract.getWinner();
          setWinner(winnerName);
          setVotes(winnerVoteCount.toNumber());
          //setTotalVotes(totalVoteCount.toNumber()); // Contract muss erneut kompiliert werden.
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
      <p>Total: {totalVotes}</p>
    </div>
  );
}

export default Results;
