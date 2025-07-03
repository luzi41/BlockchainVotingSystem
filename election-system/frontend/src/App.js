// v0.19.8
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { BrowserProvider, Contract } from "ethers";
import { CONTRACT_ADDRESSES} from "./config";
import Election from "./artifacts/contracts/Bundestagswahl.sol/Bundestagswahl.json";
import Start from "./components/Start"
import VoteForm from "./components/VoteForm";
import Results from "./components/Results.tsx";
import Extras from "./components/Extras";
import Log from "./components/Log";

function App() {
  const [status, setStatus] = useState(CONTRACT_ADDRESSES.registry);
  const [title, setTitle] = useState("Wahl 2026");
  
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
            if (electionTitle !== "") setTitle(electionTitle);
          }
        }
        catch (error) {
            console.error("Fehler beim Abrufen des Wahlstatus:", error);
        }        
    }

    fetchStatus();  

  }, []);

  
  return (
    <>
      <Router>
        <nav className="main">
          <ul>
            <li><Link to="/">Start</Link></li>
            <li><Link to="/vote">Abstimmen</Link></li>
            <li><Link to="/results">Ergebnisse</Link></li>
            <li><Link to="/extras">Extras</Link></li>
            <li className="title"><Link to="https://github.com/luzi41/BlockchainVotingSystem" target="_blank">Blockchain Voting System 0.18</Link></li>
          </ul>
        </nav>

        <div id="app">
          <h1>{title}</h1>
          <span id="ContractAddress">{status}</span>
        </div>
      
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/:ed" element={<Start />} />
          <Route path="/vote" element={<VoteForm />} />
          <Route path="/vote/:ed" element={<VoteForm />} />
          <Route path="/vote/:ed/:token" element={<VoteForm />} />
          <Route path="/results" element={<Results />} />
          <Route path="/extras" element={<Extras />} />
          <Route path="/extras/log" element={<Log />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
