// V0.23.8

import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { JsonRpcProvider, Contract } from "ethers";
import Election from "../artifacts/contracts/Proposals.sol/Proposals.json";
const isElectron = navigator.userAgent.toLowerCase().includes('electron');

function Start() {
  const [contract, setContract] = useState(null);
  const [modus, setModus] = useState(0);
  const [candidates, setCandidates] = useState([]);
  const [parties, setParties] = useState([]);
  const [proposals, setProposals] = useState([]);
  const [texts, setTexts] = useState(null);
  const { ed } = useParams();
  const [electionDistrictNo] = useState(() => {
    return isNaN(ed) ? process.env.REACT_APP_ELECTION_DISTRICT : ed;
  });  

  // Texte laden
  useEffect(() => {
    fetch("/texts/results-texts.de.json")
      .then(res => res.json())
      .then(data => {
        setTexts(data);
      })
      .catch(err => {
        console.error("❌ ", err);
      });
  }, []);  

  // fetchData: rpc und electionDistrictNo
  useEffect(() => {
    async function fetchData() {
      try {
        let _rpcURL = process.env.REACT_APP_RPC_URL;
        if (isElectron) {
          const ipc = window.electronAPI;
          _rpcURL = await ipc.settings.get('rpcURL');
          if (!_rpcURL) {
            throw new Error("❌ Error RPC-URL");
          }          
        }        
        const provider = new JsonRpcProvider(_rpcURL);
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
        console.error("❌ ", err);
      }
    }
    fetchData();
  }, [electionDistrictNo]);

  if (!contract || !texts) return <p>Load data ...</p>;

  const htmlBundestagswahl = (
    <div id="content">
      <h3 id="titleRegistration">{texts.titleRegistration}</h3>
      <div id="textRegistration">
        {texts.textRegistration}
      </div>
      <h3 id="titleCandidates">{texts.titleCandidates}</h3>
      <ul>
        {candidates.map((candidate, index) => (
          <li key={index}>
            <a href={candidate.url} target="_blank" rel="noreferrer">{candidate.name}</a>, {candidate.partei}
          </li>
        ))}
      </ul>
      <h3 id="titleParties">{texts.titleParties}</h3>
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
    <div>
        {proposals.map((candidate, index) => (
          <div key={index}>
            <p>{candidate.name} - <a href={candidate.url} target="_blank" rel="noreferrer">{texts.details}</a> {candidate.partei}</p>
            {candidate.text}
          </div>
        ))}
    </div>
  );
  return modus === 1 ? htmlBundestagswahl : htmlProposal;
}

export default Start;
