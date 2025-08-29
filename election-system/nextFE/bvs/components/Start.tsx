"use client";
import { useState, useEffect } from "react";
import { useElectionStatus } from "./hooks/useElectionStatus";
import { loadTexts } from "./utils/loadTexts";
import { Contract } from "ethers";
import { StartTexts, Candidate, Party } from "./types/StartTypes";

const isElectron =
  typeof navigator !== "undefined" &&
  navigator.userAgent.toLowerCase().includes("electron");

interface ElectronSettings {
  electionDistrict?: number;
  privateKey?: string;
  invoke?:any;
}

interface VoteFormProps {
  electionDistrict: string;
  availableDistricts?: string[];
}

export default function Start({ electionDistrict, availableDistricts = [] }: VoteFormProps) {
    const { provider, address, electionId } = useElectionStatus();  // 👈 Hook nutzen
    const [abi, setAbi] = useState([]);
    const [texts, setTexts] = useState<StartTexts | null>(null);
    const [error, setError] = useState("");
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [parties, setParties] = useState<Party[]>([]);
    const [proposals, setProposals] = useState<Candidate[]>([]);
    const [modus, setModus] = useState(1);
  
    const [electionDistrictNo, setElectionDistrictNo] = useState<string>(electionDistrict);
    
    useEffect(() => {
        if (!provider || !address || !electionId) return;
        if (!electionDistrictNo) return; // <--- NEU: erst laden, wenn Wert da ist!

        async function fetchData() {
            try {
                setError("");

                // Aktuellen Wahlkreis laden (nur für Electron, sonst gesetzt)
                if (window.electronAPI) {
                window.electronAPI.settings.get('electionDistrict').then((val) => {
                    if (val !== undefined && val !== null) setElectionDistrictNo(String(val));
                });
                }
                // 🗣 Texte laden
                const _texts = await loadTexts("start-texts");
                setTexts(_texts);        

                // 🧠 ABI laden
                const res = await fetch("/api/abi");
                const abiJson = await res.json();
                const contractAbi = abiJson.abi.abi;
                setAbi(contractAbi);
                console.log("ABI JSON geladen:", abiJson);
                console.log("ABI Array:", abiJson.abi);

                // 📜 Contract
                const ctr = new Contract(String(address), contractAbi, provider);
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
                setError(String(err));
                console.error("❌ Fehler beim Laden der Contract-Daten:", err);
            }
        }
        fetchData();
    }, [electionDistrictNo, address, electionId, provider]);

    //if (loading) return <p>⏳ Lade Status…</p>;
  if (!texts) return <p>Load data ...</p>;

    const htmlBundestagswahl = (
    <div id="content">
        <h3 id="titleRegistration">{texts.titleRegistration}</h3>
        <div id="textRegistration">{texts.textRegistration}</div>
        <h3 id="titleCandidates">{texts.titleCandidates}</h3>
        <ul className="lists-default">
        {candidates.map((candidate, index) => (
            <li key={index}>
            <a href={candidate.url} target="_blank" rel="noreferrer">{candidate.name}</a>, {candidate.partei}
            </li>
        ))}
        </ul>
        <h3 id="titleParties">{texts.titleParties}</h3>
        <ul className="lists-default">
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
