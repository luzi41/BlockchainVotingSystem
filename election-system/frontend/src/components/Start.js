// V 0.24.8
import React, { useEffect, useState } from "react";
import { Contract, JsonRpcProvider } from "ethers";
import { useParams } from 'react-router-dom';

// ✅ Web: statisch importierte ABIs (Registry)
import ProposalsABI from "../artifacts/contracts/Proposals.sol/Proposals.json";
// Wenn du weitere Modi hast, hier ergänzen:
import BundestagswahlABI from "../artifacts/contracts/Bundestagswahl.sol/Bundestagswahl.json";
// import OtherABI from "../artifacts/contracts/Other.sol/Other.json";
const ABI_REGISTRY = {
	Proposals: ProposalsABI,
	Bundestagswahl: BundestagswahlABI,
  // Other: OtherABI,
};

function Start() {
	const [texts, setTexts] = useState(null);
	const [contract, setContract] = useState(null);
	const [error, setError] = useState("");
	const [candidates, setCandidates] = useState([]);
	const [parties, setParties] = useState([]);
	const [proposals, setProposals] = useState([]);
	const [modus, setModus] = useState(0);
	const { ed } = useParams();
  
	const [electionDistrictNo, setElectionDistrictNo] = useState(() => {
    	return isNaN(ed) ? process.env.REACT_APP_ELECTION_DISTRICT : ed;
  });

  // JSON-Lader: Electron via IPC, Web via fetch
  async function loadJson(relativePath) {
    // relativePath OHNE führenden Slash übergeben, z.B. "texts/start-texts.de.json"
    if (window.electronAPI?.invoke) {
      return await window.electronAPI.invoke("load-json", relativePath);
    } else {
      const base = (process.env.PUBLIC_URL || "").replace(/\/$/, "");
      const url = `${base}/${relativePath.replace(/^\//, "")}`;
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) {
        const body = await res.text().catch(() => "");
        throw new Error(
          `fetch ${url} -> ${res.status} ${res.statusText}; body starts: ${body.slice(0, 120)}`
        );
      }
      const text = await res.text();
      try {
        return JSON.parse(text);
      } catch {
        throw new Error(`Invalid JSON at ${url}; body starts: ${text.slice(0, 120)}`);
      }
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        setError("");

        // Aktuellen Wahlkreis laden
        if (window.electronAPI?.invoke) {
          window.electronAPI.settings.get('electionDistrict').then((val) => {
            if (val !== undefined && val !== null) setElectionDistrictNo(val);
          });
        }
        // 🗣 Texte laden
        const lang = process.env.REACT_APP_LANG || "de";
		    let loadedTexts;
        if (window.electronAPI?.invoke) {
			    loadedTexts = await loadJson(`texts/start-texts.${lang}.json`);			
        } else {
          
          // Aus public/texts laden
          const textsRes = await fetch(`/texts/start-texts.${lang}.json`);
          if (!textsRes.ok) throw new Error("Textdatei nicht gefunden");
          loadedTexts = await textsRes.json();
        }
        setTexts(loadedTexts);

        // 🔧 Provider
        let rpcUrl = process.env.REACT_APP_RPC_URL;
        if (window.electronAPI?.settings?.get) {
          const fromStore = await window.electronAPI.settings.get("rpcURL");
          if (fromStore) rpcUrl = fromStore;
        }
        const provider = new JsonRpcProvider(rpcUrl);

        // 🧠 ABI laden
        //const name = process.env.REACT_APP_ELECTION_MODE_NAME || "Proposals";
        const name = process.env.REACT_APP_ELECTION_MODE_NAME || "Bundestagswahl";
        let abiJson;

        if (window.electronAPI?.invoke) {
          // Electron: aus build/resources laden (IPC)
          try {
            abiJson = await window.electronAPI.invoke(`load-json`, `contracts/${name}.json`);
          } catch {
            abiJson = await window.electronAPI.invoke(
              `load-json`,
              `contracts/${name}.sol/${name}.json`
            );
          }
        } else {
          // Web: direkt aus Import (kein fetch → keine HTML-404s)
          abiJson = ABI_REGISTRY[name];
          if (!abiJson) {
            throw new Error(
              `ABI "${name}" nicht in ABI_REGISTRY registriert. Bitte importieren und eintragen.`
            );
          }
        }

        // 📜 Contract
        const address = process.env.REACT_APP_CONTRACT_ADDRESS;
        const ctr = new Contract(address, abiJson.abi, provider);
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
        setError(String(err?.message || err));
        console.error("❌ Fehler beim Laden der Contract-Daten:", error);
        
      }
    }

    fetchData();
  }, [electionDistrictNo, error]);

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
