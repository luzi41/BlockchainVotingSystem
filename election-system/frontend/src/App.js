// v0.23.6
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
const isElectron = navigator.userAgent.toLowerCase().includes('electron');

function App() {
  const [status, setStatus] = useState(process.env.REACT_APP_CONTRACT_ADDRESS);
  const [title, setTitle] = useState("Wahl 2026");
  const [html, setHtml] = useState("");

  useEffect(() =>  {
     
    async function fetchStatus() {
      try {
        let _rpcURL = process.env.REACT_APP_RPC_URL;
        if (isElectron) {
          const ipc = window.electronAPI;
          _rpcURL = await ipc.settings.get('rpcURL');
          if (!_rpcURL) {
            throw new Error("Fehlende Einstellungen (_rpcURL) im Electron Store");
          }          
        }        
        // Wallet
        const provider = new JsonRpcProvider(_rpcURL);
        const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;         
        // SmartContract
        const contract = new Contract(contractAddress, Election.abi, provider);
        if (!contract) {
          throw new Error("Fehler 36");
        }
        const electionTitle = await contract.getElectionTitle();
        if (electionTitle !== "") setTitle(electionTitle); 
      }
      catch (error) {
        console.error("Fehler beim Abrufen des Wahlstatus:", error);
        setStatus("Fehler beim Abrufen des Wahlstatus!");
        return;
      }        
    }

    fetchStatus();
    setHtml(
      <>
        <Router>
          <nav className="main" id="nav">
            <ul>
              <li><Link to="/start">Informationen zur Wahl</Link></li>
              <li><Link to="/vote">Abstimmen</Link></li>
              <li><Link to="/results">Ergebnisse</Link></li>
              <li><Link to="/extras">Extras</Link></li>
              <li className="title"><Link to="https://github.com/luzi41/BlockchainVotingSystem" target="_blank">Blockchain Voting System 0.23</Link></li>
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
  }, [status , title]);
  return html;
}

export default App;
