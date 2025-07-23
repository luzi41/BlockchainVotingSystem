// v0.21.8
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { JsonRpcProvider, Contract } from "ethers";
import Election from "./artifacts/contracts/Bundestagswahl.sol/Bundestagswahl.json";
import Start from "./components/Start"
import VoteForm from "./components/VoteForm";
import Results from "./components/Results.tsx";
import Extras from "./components/Extras";
import Signature from "./components/Signature";
import SettingsForm from "./components/SettingsForm";

function App() {
  const [status, setStatus] = useState(process.env.REACT_APP_CONTRACT_ADDRESS);
  const [title, setTitle] = useState("Wahl 2026");
  
  useEffect(() =>  {
    async function fetchStatus() {
      try {
        // Wallet
        const provider = new JsonRpcProvider(process.env.REACT_APP_RPC_URL);
        const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;         
        // SmartContract
        const contract = new Contract(contractAddress, Election.abi, provider); 
        const status = await contract.getElectionStatus();
        setStatus(process.env.REACT_APP_CONTRACT_ADDRESS + ": " + status);
            
        const electionTitle = await contract.getElectionTitle();
        if (electionTitle !== "") setTitle(electionTitle);

      }
      catch (error) {
        console.error("Fehler beim Abrufen des Wahlstatus:", error);
      }        
    }
    fetchStatus();
  }, [status , title]);

  
  return (
    <>
      <Router>
        <nav className="main" id="nav">
          <ul>
            <li><Link to="/start">Informationen zur Wahl</Link></li>
            <li><Link to="/vote">Abstimmen</Link></li>
            <li><Link to="/results">Ergebnisse</Link></li>
            <li><Link to="/extras">Extras</Link></li>
            <li className="title"><Link to="https://github.com/luzi41/BlockchainVotingSystem" target="_blank">Blockchain Voting System 0.22</Link></li>
          </ul>
        </nav>

        <div id="app">
          <div id="title">
          <h1>{title}</h1>
          </div>
        </div>  
        <div id="footer"><span id="ContractAddress">{status}</span></div>
      
        <Routes>
          <Route path="/start" element={<Start />} />
          <Route path="/start/:ed" element={<Start />} />
          <Route path="/vote" element={<VoteForm />} />
          <Route path="/vote/:ed" element={<VoteForm />} />
          <Route path="/vote/:ed/:token" element={<VoteForm />} />
          <Route path="/results" element={<Results />} />
          <Route path="/extras" element={<Extras />} />
          <Route path="/extras/settings" element={<SettingsForm />} />
          <Route path="/results/signature/:ed/:id" element={<Signature />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
