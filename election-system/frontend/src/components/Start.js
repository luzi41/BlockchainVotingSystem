// V 0.21.5
import { useState, useEffect } from "react";
import { JsonRpcProvider, Contract} from "ethers";
import Election from "../artifacts/contracts/Bundestagswahl.sol/Bundestagswahl.json";

function Start() {
  const [candidates, setCandidates] = useState([]);
  const [parties, setParties] = useState([]);
  const [wahlbezirk] = useState(process.env.REACT_APP_ELECTION_DISTRICT);
  
  useEffect(() => {
    async function fetchData() {
      try {
        // Wallet
        const provider = new JsonRpcProvider(process.env.REACT_APP_RPC_URL);
        const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

        // SmartContract
        const contract = new Contract(contractAddress, Election.abi, provider);         
        const candidatesList = await contract.getCandidates(wahlbezirk);
        setCandidates(candidatesList);

        const partiesList = await contract.getParties();
        setParties(partiesList);
      }
      catch (error) {
          console.error("Fehler beim Abrufen der Daten: ", error);
      }        
    }
    fetchData();

  }, [wahlbezirk]);

  return (
    <div>
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
          <a href={candidate.url} target="_blank" rel="noreferrer">{candidate.name}</a>,&nbsp; {candidate.partei}
        </li>
        ))}
        </ul>
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
    </div>
  );
}

export default Start;