import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { BrowserProvider, Contract } from "ethers";
import { CONTRACT_ADDRESSES } from "./config";
import Election from "./artifacts/contracts/Election.sol/Election.json";
import Start from "./components/Start"
import VoteForm from "./components/VoteForm";
import Results from "./components/Results";

function App() {

  const [status, setStatus] = useState(CONTRACT_ADDRESSES.registry);
  const [title, setTitle] = useState("Wahl 2029");

  useEffect(() =>  {
    async function fetchStatus() {
        
        try {
          if (window.ethereum) {
            
            // Wallet
            const provider = new BrowserProvider(window.ethereum);

            // SmartContract
            const contract = new Contract(CONTRACT_ADDRESSES.registry, Election.abi, provider);
            
            // Election
            const status = await contract.getElectionStatus();
            setStatus(CONTRACT_ADDRESSES.registry + ": " + status);
            
            const electionTitle = await contract.getElectionTitle();
            setTitle(electionTitle);
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
          <li><Link to="http://localhost:25000" target="_blank">Explorer</Link></li>
          <li class="title"><Link to="https://github.com/luzi41/BlockchainVotingSystem" target="_blank">Blockchain Voting System 0.15</Link></li>
        </ul>
      </nav>

      <div id="app">
        <h1>{title}</h1>
        <span id="ContractAddress">{status}</span>
      </div>

      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/vote" element={<VoteForm />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  );
}

export default App;
