import react, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { BrowserProvider } from "ethers";
import { CONTRACT_ADDRESSES } from "./config";
import Election from "./artifacts/contracts/Election.sol/Election.json";
import Start from "./components/Start"
import VoteForm from "./components/VoteForm";
import Results from "./components/Results";

function App() {

  const ethers = require("ethers");

  const [status, setStatus] = useState("Status unbekannt.");

  useEffect(() => {
    async function fetchStatus() {
        
        try {
          if (window.ethereum) {
            const provider = new BrowserProvider(window.ethereum);
            const contract = new ethers.Contract(CONTRACT_ADDRESSES.registry, Election.abi, provider);
            const status = await contract.getElectionStatus();
            setStatus(status);
          }
       }
        catch (error) {
            console.error("Fehler beim Abrufen des Wahlstatus:", error);
        }        
    }
    fetchStatus();  
    }, []);

  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Start</Link></li>
          <li><Link to="/vote">Abstimmen</Link></li>
          <li><Link to="/results">Ergebnisse</Link></li>
          <li class="title"><Link to="https://github.com/luzi41/BlockchainVotingSystem/tree/v0.6" target="_blank">Blockchain Voting System 0.6</Link></li>
        </ul>
      </nav>

      <h1>Wahl 2xxx</h1>
      <div>{status}</div>

      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/vote" element={<VoteForm />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  );
}

export default App;
