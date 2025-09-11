"use client";
import Link from "next/link";
import { useState, useEffect, ReactElement } from "react";
import { useElectionStatus } from "./hooks/useElectionStatus";
import { Contract } from "ethers";
import { loadTexts } from "./utils/loadTexts";
import { StartTexts, Candidate, Party } from "./types/StartTypes";
import { useAppSettings } from "./hooks/useAppSettings";
import { useRouter } from "next/navigation";
import { useLanguage } from "./contexts/LanguageContext"; // 👈 wichtig!

interface SettingsProps {
  electionDistrict: string;
  availableDistricts?: string[];
}

const isTauri =
  typeof window !== "undefined" && "__TAURI__" in window; // sicherer Check fürs FE

export function useNavigate() {
  const router = useRouter();

  return async (path: string) => {
    if (isTauri) {
      const { invoke } = await import("@tauri-apps/api/core");
      await invoke("navigate_to", { path });
    } else {
      router.push(path); // ✅ funktioniert in Next.js normal
    }
  };
}

export default function Start({
  electionDistrict,
  availableDistricts = [],
}: SettingsProps) {
    const { language, setLanguage } = useLanguage();
    const { settings, setSettings, isTauri, loading } = useAppSettings(
        electionDistrict,
        "de"
    );

    interface TextContent {
        titleRegistration: string;
        textRegistration: string;
        titleCandidates: string;
        titleParties: string;
        details: string;
    }    
    const { provider, address, electionId, status, error } = useElectionStatus();  // 👈 Hook nutzen
    const [parties, setParties] = useState<Party[]>([]);
    const [contract, setContract] = useState<Contract | null>(null);
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [proposals, setProposals] = useState<Candidate[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [texts, setTexts] = useState<TextContent | null>(null);
    const [modus, setModus] = useState(0);
    const [htmlContent, setHtmlContent] = useState<ReactElement | null>(null); 
    const [title, setTitle] = useState("");

    // -------- Initiales Laden
    useEffect(() => {
        if (settings) {
            loadTexts("start-texts", language).then(setTexts);
        }
    }, [language, settings]);

    // Smart Contract Setup
    useEffect(() => {
        const initializeContract = async () => {
            
            if (!provider || !address || !electionId) {
                //console.error("Settings oder Provider oder address oder electionId nicht geladen.", error)
                return;
            };

            try {
                //console.log("Provider, address und electionId geladen.")
                setIsLoading(true);
                
                // ABI von statischer Datei laden (statt API Route)
                const abiResponse = await fetch('/contracts/Bundestagswahl.sol/Bundestagswahl.json');
                if (!abiResponse.ok) {
                    throw new Error(`ABI laden fehlgeschlagen: ${abiResponse.status}`);
                }
                
                const abiData = await abiResponse.json();
                const abi = abiData.abi || abiData; // Fallback falls die Struktur variiert

                // Contract mit provider aus Hook initialisieren
                const contractInstance = new Contract(address, abi, provider);
                setContract(contractInstance);
                if (contractInstance) {
                    //console.log("Contract geladen!", contractInstance);
                } else {
                    console.log("Contract nicht geladen!");
                }
                const m = await contractInstance.getModus();
                if (m) {
                    const modusNumber = Number(m);
                    setModus(modusNumber);
                    const _title = await contractInstance.getElectionTitle(electionId);
                    setTitle(_title);
                    
                    if (modusNumber === 1) {
                        const candidatesList = await contractInstance.getCandidates(electionId, settings?.election_district);
                        const partiesList = await contractInstance.getParties(electionId);

                        setCandidates(candidatesList);
                        setParties(partiesList);
                    } else if (modusNumber === 2) {
                        const proposalList = await contractInstance.getProposals(electionId);
                        setProposals(proposalList);
                    }     
                } else {
                    throw new Error("Modus nicht bekannt!");    
                }
                
            } catch (err) {
                console.error('Contract initialization error:', err);
            } finally {
                setIsLoading(false);
            }
        };

        initializeContract();
    }, [settings, provider]);
    
    useEffect(() => {
        if (!texts) {
            //console.log("Texte nicht geladen.");
            return;
        }          
        
        let htmlBundestagswahl =   (
            <div id="content">
                <h3>Allgemeine Informationen zu dieser Wahl</h3>
                <ul>
                    <li className="lists-texts"><a href="https://www.bundestag.de/parlament/bundestagswahl">Offizielle Website</a></li>
                </ul>
                <h3>FAQ: Wie funktioniert die Online-Wahl</h3>
                <h3 id="titleRegistration">{texts.titleRegistration}</h3>
                <div id="textRegistration">{texts.textRegistration}</div>
                <h3 id="titleCandidates">{texts.titleCandidates} {settings?.election_district}</h3>
                <ul className="lists-default">
                {candidates.map((candidate, index) => (
                    <li key={index}>
                        <Link href={candidate.url} rel="noreferrer">{candidate.name}</Link>, {candidate.partei}
                    </li>
                ))}
                </ul>
                <h3 id="titleParties">{texts.titleParties}</h3>
                <ul className="lists-default">
                {parties.map((party, index) => (
                    <li key={index}>
                        <Link href={party.url} rel="noreferrer">{party.name}</Link> – {party.shortname}
                    </li>
                ))}
                </ul>
            </div>
        );
        
        const htmlProposal = (
            <div>
                {proposals.map((candidate, index) => (
                    <div key={index}>
                        <p>{candidate.name} - <Link href={candidate.url} rel="noreferrer">{texts.details}</Link> {candidate.partei}</p>
                        <div>{candidate.text}</div>
                    </div>
                ))}
            </div>
        );
        //console.log("Modus: ", modus)
        setHtmlContent(htmlBundestagswahl);
    }, [texts, candidates, parties, proposals]);

    // Loading State
    if (isLoading) {
        return (
            <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p>Lade Wahlsystem...</p>
                 <p>{status}</p>
                
                {!provider && (
                <div>
                    <p><Link href= "/extras/settings/">Check Settings</Link></p>
                    <p><Link href= "/help">Help</Link></p>
                </div>
                )}
            </div>
        );
    }

    // Error State
    if (error) {
        return (
            <div className="flex flex-col items-center gap-4 text-red-600">
                <h2 className="text-xl font-bold">Fehler</h2>
                <p>Fehler</p>
                <button 
                    onClick={() => window.location.reload()} 
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Neu laden
                </button>
            </div>
        );
    } 

    return (
        <div>
            <h1 className="text-3xl font-bold text-center">
                {title}
            </h1>
            {htmlContent}
           
        </div>
    );
}