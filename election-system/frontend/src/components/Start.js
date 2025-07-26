// V 0.22.11
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import { JsonRpcProvider, Contract} from "ethers";

const isElectron = navigator.userAgent.toLowerCase().includes('electron');

function Start() {
  const [contractABI, setContractABI] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [parties, setParties] = useState([]);
  let { ed } = useParams();
  const [electionDistrictNo, setElectionDistrictNo] = useState(() => {  
    if (isNaN(ed)) // muss sein: "nicht in Wahlkreisen vorhanden"
      {
        return process.env.REACT_APP_ELECTION_DISTRICT
      }
      return ed;
    });

  if(isElectron) {
    const ipcRenderer = window.ipcRenderer;
    ipcRenderer.invoke('settings:get', 'electionDistrict').then((val) => {
      if (val !== undefined && val !== null) {
       setElectionDistrictNo(val);
      }
    });   
  }

  console.log("Wahlkreis: ", electionDistrictNo);

  useEffect(() => {
    async function loadABI() {
      try {
        const module = await import(`${process.env.REACT_APP_ELECTION}`);
        setContractABI(module.default);
      } catch (err) {
        console.error("Fehler beim Laden des ABI:", err);
      }
    }
    loadABI();

  }, [contractABI]);

    async function fetchData() {
      try {
        // Wallet
        const provider = new JsonRpcProvider(process.env.REACT_APP_RPC_URL);
        const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

        // SmartContract
        const contract = new Contract(contractAddress, contractABI, provider);         
        const candidatesList = await contract.getCandidates(electionDistrictNo);
        setCandidates(candidatesList);

        const partiesList = await contract.getParties();
        setParties(partiesList);
      }
      catch (error) {
          console.error("Fehler beim Abrufen der Daten: ", error);
      }        
    }
    fetchData();

  return (
    <div id="content">
      <h3>Registrieren für die Online-Wahl</h3>
      <div>
        Sie können auf der Rückseite Ihrer Wahlbenachrichtigung ankreuzen, dass Sie an der Online-Wahl teilnehmen möchten und diese dann kostenfrei zurück schicken - genauso wie bei der Briefwahl. <br />
        Dann werden Sie aus dem Präsenzwahllisten entfernt und können nur noch an der Online-Wahl teilnehmen.<br />
        Anschließend bekommen Sie die Unterlagen für die Online-Wahl.
      </div>
      <h3>Was wird gewählt</h3>
      <div>
        Bei dieser Wahl werden die Mitglieder des Deutschen Bundestages gewählt. Mit der ersten Stimme wählen Sie den Direktkanidaten Ihres Wahlbezirkes und mit der zweiten Stimme eine Partei.
      </div>
      <h3>Wer steht zur Wahl - KandidatInnen in Ihrem Wahlkreis</h3>
        <ul>
        {candidates.map((candidate, index ) => (
        <li key={index}>
          <a href={candidate.url} target="_blank" rel="noreferrer">{candidate.name}</a>,&nbsp; {candidate.partei}
        </li>
        ))}
        </ul>
      <h3>Andere Wahlkreise</h3>
      <h3>Die Partien und ihre Wahlprogramme</h3>
        <ul>
        {parties.map((party, index ) => (
        <li key={index}>
          <a href={party.url} target="_blank" rel="noreferrer">{party.name}</a>&nbsp;-&nbsp;{party.shortname}
        </li>
        ))}
        </ul>
      <h3>Das neue Wahlgesetz</h3>
      Sie finden hier ausführliche Informationen zum <a href="https://www.gesetze-im-internet.de/bwahlg/" target="blank">Wahlgesetz</a>.
      &nbsp;  <br />
      &nbsp;  <br />
      &nbsp;  <br />
      &nbsp;  <br />
    </div> 
  );
}

export default Start;