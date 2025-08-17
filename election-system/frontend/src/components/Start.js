// V0.23.27
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { JsonRpcProvider, Contract } from "ethers";

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

  // Hilfsfunktion: JSON laden (je nach Umgebung)
  async function loadJson(relativePath) {
    if (isElectron && window.electronAPI?.loadJson) {
      return await window.electronAPI.loadJson(relativePath);
    } else {
      const res = await fetch(`/${relativePath}`);
      if (!res.ok) throw new Error(`Datei ${relativePath} nicht gefunden`);
      return await res.json();
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        // 📄 Texte laden
        const lang = process.env.REACT_APP_LANG || "de";
        const textsJson = await loadJson(`texts/start-texts.${lang}.json`);
        setTexts(textsJson);

        // RPC-URL ermitteln
        let _rpcURL = process.env.REACT_APP_RPC_URL;
        if (isElectron && window.electronAPI?.settings?.get) {
          _rpcURL = await window.electronAPI.settings.get('rpcURL');
          if (!_rpcURL) throw new Error("RPC-URL fehlt");
        }

        // 📦 ABI laden
        const electionModeName =
          process.env.REACT_APP_ELECTION_MODE_NAME || "Proposals";
        const Election = await loadJson(`contracts/${electionModeName}.json`);

        // Contract verbinden
        const provider = new JsonRpcProvider(_rpcURL);
        const ctr = new Contract(process.env.REACT_APP_CONTRACT_ADDRESS, Election.abi, provider);
        setContract(ctr);

        const m = await ctr.getModus();
        setModus(Number(m));

        if (Number(m) === 1) {
          const candidatesList = await ctr.getCandidates(electionDistrictNo);
          const partiesList = await ctr.getParties();
          setCandidates(candidatesList);
          setParties(partiesList);
        } else if (Number(m) === 2) {
          const proposalList = await ctr.getProposals();
          setProposals(proposalList);
        }
      } catch (err) {
        console.error("❌ Fehler beim Laden der Contract-Daten:", err);
      }
    }

    fetchData();
  }, [electionDistrictNo]);

  if (!contract || !texts) return <p>Load data ...</p>;

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
