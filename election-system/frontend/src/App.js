// v0.21
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { JsonRpcProvider, Contract } from "ethers";
//import { CONTRACT_ADDRESSES} from "./config";
import Election from "./artifacts/contracts/Bundestagswahl.sol/Bundestagswahl.json";
import Start from "./components/Start"
import VoteForm from "./components/VoteForm";
import Results from "./components/Results.tsx";
import Extras from "./components/Extras";
import Log from "./components/Log";
import Signature from "./components/Signature";

function App() {
  const [status, setStatus] = useState(process.env.REACT_APP_CONTRACT_ADDRESS);
  const [title, setTitle] = useState("Wahl 2026");
  const [candidates, setCandidates] = useState([]);
  const [wahlbezirk, setWahlbezirk] = useState(1);
  const [parties, setParties] = useState([]);

  // Wallet
  //console.log("PRIVATE_KEY:", process.env.REACT_APP_PRIVATE_KEY);
  const provider = new JsonRpcProvider(process.env.REACT_APP_RPC_URL);
  //console.log("Contract address: ", process.env.REACT_APP_CONTRACT_ADDRESS); 
  const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

  // SmartContract
  const contract = new Contract(process.env.REACT_APP_CONTRACT_ADDRESS, Election.abi, provider);  
  
  useEffect(() =>  {
    async function fetchStatus() {
        try {
            const status = await contract.getElectionStatus();
            setStatus(process.env.REACT_APP_CONTRACT_ADDRESS + ": " + status);
            
            const electionTitle = await contract.getElectionTitle();
            if (electionTitle !== "") setTitle(electionTitle);

            const candidatesList = await contract.getCandidates(wahlbezirk);
            setCandidates(candidatesList);

            const partiesList = await contract.getParties();
            setParties(partiesList);
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
            <li><Link to="/vote">Abstimmen</Link></li>
            <li><Link to="/results">Ergebnisse</Link></li>
            <li><Link to="/extras">Extras</Link></li>
            <li className="title"><Link to="https://github.com/luzi41/BlockchainVotingSystem" target="_blank">Blockchain Voting System 0.21</Link></li>
          </ul>
        </nav>

        <div id="app">
          <h1>{title}</h1>
          <span id="ContractAddress">{status}</span>
          <h3>Registrieren für die Online-Wahl</h3>
          <div>
            Sie können auf der Rückseite Ihrer Wahlbenachrichtigung ankreuzen, dass Sie an der Online-Wahl teilnehmen möchten und diese dann kostenfrei zurück schicken - genauso wie bei der Briefwahl. <br />
            Dann werden SIe aus dem Präsenzwahllisten entfernt und können nur noch an der Online-Wahl teilnehmen.<br />
            Anschließend bekommen SIe die Unterlagen für die Online-Wahl.
          </div>
          <h3>Was wird gewählt</h3>
          <div>
            Bei dieser Wahl werden die Mitglieder des Deutschen Bundestages gewählt. Mit der ersten Stimme wählen SIe den Direktkanidaten Ihres Wahlbezirkes und mit der zweiten Stimme eine Partei.
          </div>
          <h3>Wer steht zur Wahl - KandidatInnen in Ihrem Wahlbezirk</h3>
            <ul>
            {candidates.map((candidate, index ) => (
            <li key={index}>
              <a href={candidate.url} target="_blank">{candidate.name}</a>,&nbsp; {candidate.partei}
            </li>
            ))}
            </ul>
          <h3>Die Partien und ihre Wahlprogramme</h3>
            <ul>
            {parties.map((party, index ) => (
            <li key={index}>
              <a href={party.url} target="_blank">{party.name}</a>&nbsp;-&nbsp;{party.shortname}
            </li>
            ))}
            </ul>
          <h3>Das neue Wahlgesetz</h3>
          Sie finden hier ausführliche Informationen zum <a href="https://www.gesetze-im-internet.de/bwahlg/" target="blank">Wahlgesetz</a>.
        </div>
      
        <Routes>
          <Route path="/:ed" element={<Start />} />
          <Route path="/vote" element={<VoteForm />} />
          <Route path="/vote/:ed" element={<VoteForm />} />
          <Route path="/vote/:ed/:token" element={<VoteForm />} />
          <Route path="/results" element={<Results />} />
          <Route path="/extras" element={<Extras />} />
          <Route path="/extras/log" element={<Log />} />
          <Route path="/results/signature/:ed/:id" element={<Signature />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
