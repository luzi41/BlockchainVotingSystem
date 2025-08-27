// v0.27.1
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Start from "./components/Start";
import VoteForm from "./components/VoteForm";
import Results from "./components/Results.tsx";
import Extras from "./components/Extras";
import Signature from "./components/Signature";
import SettingsForm from "./components/SettingsForm";
import { useElectionStatus } from "./hooks/useElectionStatus"; 

function AppContent() {
  // Extrahiere ed direkt aus dem aktuellen Pfad
  const pathParts = window.location.pathname.split('/');
  const currentEd = pathParts.find((part, i) =>
    // Suche nach einer Zahl, die nicht das erste Segment ist
    i > 0 && !isNaN(part) && part !== ""
  );

  const edParam = currentEd || "";

  const navLinks = {
    start: edParam ? `/start/${edParam}` : '/start',
    vote: edParam ? `/vote/${edParam}` : '/vote',
    results: edParam ? `/results/${edParam}` : '/results',
    extras: edParam ? `/extras/${edParam}` : '/extras'
  };

  const { title, status, error } = useElectionStatus();  // 👈 Hook nutzen
  const rpcError = !!error;  
  
  return (
    <>
      <nav className="main" id="nav">
        <ul>
          <li><Link to={navLinks.start}>Informationen zur Wahl</Link></li>
          <li><Link to={navLinks.vote}>Abstimmen</Link></li>
          <li><Link to={navLinks.results}>Ergebnisse</Link></li>
          <li><Link to={navLinks.extras}>Extras</Link></li>
          <li className="title">
            <Link to="https://github.com/luzi41/BlockchainVotingSystem" target="_blank">
              Blockchain Voting System 0.27
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
        <Route path="/" element={<Start ed={edParam} />} />
        <Route path="/start" element={<Start ed={edParam} />} />
        <Route path="/start/:ed" element={<Start />} />
        <Route path="/vote" element={<VoteForm ed={edParam} />} />
        <Route path="/vote/:ed" element={<VoteForm />} />
        <Route path="/vote/:ed/:token" element={<VoteForm />} />
        <Route path="/results" element={<Results ed={edParam} />} />
        <Route path="/results/:ed" element={<Results ed={edParam} />} />        
        <Route path="/extras" element={<Extras ed={edParam} />} />
        <Route path="/extras/:ed" element={<Extras ed={edParam} />} />
        <Route path="/extras/settings" element={<SettingsForm ed={edParam} />} />
        <Route path="/results/signature/:ed/:id" element={<Signature />} />
      </Routes>
   
    </>
  );
}

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/*" element={<AppContent />} />
      </Routes>
    </Router>
  );
}

export default App;
