// v0.26.5
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Start from "./components/Start";
import VoteForm from "./components/VoteForm";
import Results from "./components/Results.tsx";
import Extras from "./components/Extras";
import Signature from "./components/Signature";
import SettingsForm from "./components/SettingsForm";
import { useElectionStatus } from "./hooks/useElectionStatus"; 

function App() {
  const { title, status, error } = useElectionStatus();  // 👈 Hook nutzen
  const rpcError = !!error;

  return (
    <Router>
      <nav className="main" id="nav">
        <ul>
          <li><Link to="/start">Informationen zur Wahl</Link></li>
          <li><Link to="/vote">Abstimmen</Link></li>
          <li><Link to="/results">Ergebnisse</Link></li>
          <li><Link to="/extras">Extras</Link></li>
          <li className="title">
            <Link to="https://github.com/luzi41/BlockchainVotingSystem" target="_blank">
              Blockchain Voting System 0.26
            </Link>
          </li>
        </ul>
      </nav>

      {rpcError && (
        <div style={{ backgroundColor: "#ffdddd", color: "#900", padding: "10px", textAlign: "center" }}>
          ❌ Keine Verbindung zum RPC-Server.
          <br />
          <Link to="/extras/settings" style={{ color: "#900", textDecoration: "underline" }}>
            Jetzt RPC-URL in den Einstellungen korrigieren
          </Link>
        </div>
      )}

      <div id="app">
        <div id="title">
          <h1>{title}</h1>
        </div>
      </div>

      <div id="footer">
        <span id="ContractAddress">{status}</span>
      </div>

      <Routes>
        <Route path="/" element={<Start />} />
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
  );
}

export default App;
