// V 0.26.13
import React, { useEffect, useState } from "react";
import { Contract} from "ethers";
import { useParams } from 'react-router-dom';
import { useElectionStatus } from "../hooks/useElectionStatus"; 
import { loadAbi } from "../utils/loadAbi";
import { loadTexts } from "../utils/loadTexts";

function Start() {
  const { provider, address, electionId } = useElectionStatus();  // 👈 Hook nutzen
	const [texts, setTexts] = useState(null);
	const [error, setError] = useState("");
	const [candidates, setCandidates] = useState([]);
	const [parties, setParties] = useState([]);
	const [proposals, setProposals] = useState([]);
	const [modus, setModus] = useState(1);
	const { ed } = useParams();
  
	const [electionDistrictNo, setElectionDistrictNo] = useState(() => {
    	return isNaN(ed) ? process.env.REACT_APP_ELECTION_DISTRICT : ed;
  });
 
  useEffect(() => {
    if (!provider || !address || !electionId) return;
    async function fetchData() {
      try {
        setError("");

        // Aktuellen Wahlkreis laden (nur für Electron, sonst gesetzt)
        if (window.electronAPI?.invoke) {
          window.electronAPI.settings.get('electionDistrict').then((val) => {
            if (val !== undefined && val !== null) setElectionDistrictNo(val);
          });
        }
        // 🗣 Texte laden
        const _texts = await loadTexts("start-texts");
        setTexts(_texts);

        // 🧠 ABI laden
        const abiJson = await loadAbi();

        // 📜 Contract
        const ctr = new Contract(address, abiJson.abi, provider);
        if (!ctr) {
          throw new Error("126 Konnte SmartContract nicht laden!");
        }

        const m = await ctr.getModus();
        if (m) {
          setModus(Number(m));
        }        

        if (Number(modus) === 1) {
          const candidatesList = await ctr.getCandidates(electionId, electionDistrictNo);
          const partiesList = await ctr.getParties(electionId);

          setCandidates(candidatesList);
          setParties(partiesList);
        } else if (Number(modus) === 2) {
          const proposalList = await ctr.getProposals(electionId);
          setProposals(proposalList);
        }
      } catch (err) {
        setError(String(err?.message || err));
        console.error("❌ Fehler beim Laden der Contract-Daten:", error);
      }
    }
    fetchData();
  }, [electionDistrictNo, error, provider, address, electionId]);

	//if (loading) return <p>⏳ Lade Status…</p>;
  if (!texts) return <p>Load data ...</p>;

	const htmlBundestagswahl = (
	<div id="content">
		<h3 id="titleRegistration">{texts.titleRegistration}</h3>
		<div id="textRegistration">{texts.textRegistration}</div>
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