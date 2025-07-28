// V0.22.15

import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { JsonRpcProvider, Contract } from "ethers";
import Election from "../artifacts/contracts/Proposals.sol/Proposals.json";

function Start() {

  const [contract, setContract] = useState(null);
  const [modus, setModus] = useState(0);
  const [candidates, setCandidates] = useState([]);
  const [parties, setParties] = useState([]);
  const [proposals, setProposals] = useState([]);
  const { ed } = useParams();
  const [rpcURL, setRpcURL] = useState("");

  const [electionDistrictNo, setElectionDistrictNo] = useState(() => {
    return isNaN(ed) ? process.env.REACT_APP_ELECTION_DISTRICT : ed;
  });

  // fetchSettings: rpc und electionDistrictNo

  useEffect(() => {
    async function fetchData() {
      try {
        const provider = new JsonRpcProvider(process.env.REACT_APP_RPC_URL); // flex???
        const ctr = new Contract(process.env.REACT_APP_CONTRACT_ADDRESS, Election.abi, provider);
        setContract(ctr);

        const m = await ctr.getModus();
        setModus(Number(m));

        if (Number(m) === 1) {
          const candidatesList = await ctr.getCandidates(electionDistrictNo);
          setCandidates(candidatesList);
          const partiesList = await ctr.getParties();
          setParties(partiesList);
        } else if (Number(m) === 2) {
          const proposalList = await ctr.getProposals();
          setProposals(proposalList);
        }
      } catch (err) {
        console.error("Fehler beim Abrufen der Daten: ", err);
      }
    }

    fetchData();
  }, [electionDistrictNo]);

  if (!contract) return <p>Lade Vertrag...</p>;

  const htmlBundestagswahl = (
    <div id="content">
      <h3>Registrieren für die Online-Wahl</h3>
      <div>
        Sie können auf der Rückseite Ihrer Wahlbenachrichtigung ankreuzen, dass Sie an der Online-Wahl teilnehmen möchten...
      </div>
      <h3>Wer steht zur Wahl - KandidatInnen in Ihrem Wahlkreis</h3>
      <ul>
        {candidates.map((candidate, index) => (
          <li key={index}>
            <a href={candidate.url} target="_blank" rel="noreferrer">{candidate.name}</a>, {candidate.partei}
          </li>
        ))}
      </ul>
      <h3>Die Partien und ihre Wahlprogramme</h3>
      <ul>
        {parties.map((party, index) => (
          <li key={index}>
            <a href={party.url} target="_blank" rel="noreferrer">{party.name}</a> – {party.shortname}
          </li>
        ))}
      </ul>
    </div>
  );

  const htmlProposal = (
    <div>Proposal</div>
  );

  return modus === 1 ? htmlBundestagswahl : htmlProposal;
}

export default Start;
