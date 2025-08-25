// v0.26.4
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Start from "./components/Start";
import VoteForm from "./components/VoteForm";
import Results from "./components/Results.tsx";
import Extras from "./components/Extras";
import Signature from "./components/Signature";
import SettingsForm from "./components/SettingsForm";
import { useElectionStatus } from "./hooks/useElectionStatus"; 
//const isElectron = navigator.userAgent.toLowerCase().includes("electron");

function App() {
  const { title, status, error } = useElectionStatus();  // 👈 Hook nutzen
  const rpcError = !!error;
  /*
  const [status, setStatus] = useState("");
  const [title, setTitle] = useState("Blockchain Voting System");
  const [rpcError, setRpcError] = useState(false);
  */
  useEffect(() => {
    /*
    async function loadStatus() {
      const result = await fetchStatus();
      setTitle(result.title);
      setStatus(result.status);
      setRpcError(!!result.error);
    }
    loadStatus();    
    */
    /*
    async function fetchStatus() {
      try {
        let _rpcURL = process.env.REACT_APP_RPC_URL;
        if (isElectron) {
          const ipc = window.electronAPI;
          _rpcURL = await ipc.settings.get("rpcURL");
          if (!_rpcURL) {
            throw new Error("Fehlende Einstellungen (_rpcURL) im Electron Store");
          }
        }
        const provider = new JsonRpcProvider(_rpcURL);
        const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
        const contract = new Contract(contractAddress, Election.abi, provider);
        const _electionId = await contract.getElectionIdByContract(contractAddress);
        if (!_electionId) {
          throw new Error("41 No electionId!");
        }
        const electionTitle = await contract.getElectionTitle(_electionId);
        const electionStatus = await contract.getElectionStatus(_electionId);

        setTitle(electionTitle);
        setStatus(`${contractAddress}: ${electionStatus}`);
        setRpcError(false); // Falls Fehler vorher auftrat
      } catch (error) {
        console.error("Fehler beim Abrufen des Wahlstatus:", error);
        setStatus("⚠️ Verbindung zum RPC-Server fehlgeschlagen!");
        setRpcError(true); // Warnung aktivieren
      }
    }
    */
    //fetchStatus();
  }, []);

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
