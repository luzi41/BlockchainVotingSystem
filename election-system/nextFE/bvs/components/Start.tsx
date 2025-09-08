"use client";
import { useState, useEffect, ReactElement } from "react";
import { useElectionStatus } from "./hooks/useElectionStatus";
import { Contract } from "ethers";
import { loadTexts } from "./utils/loadTexts";
import { StartTexts, Candidate, Party } from "./types/StartTypes";
import { useAppSettings } from "./hooks/useAppSettings";
import { useRouter } from "next/navigation";


// Dynamic import für Tauri API um SSR Probleme zu vermeiden
const loadTauriAPI = async () => {
  if (typeof window !== "undefined" && "__TAURI__" in window) {
    const { invoke } = await import("@tauri-apps/api/core");
    return { invoke };
  }
  return null;
};

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
  const { settings, setSettings, isTauri, loading, error } = useAppSettings(
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
    const { provider, address, electionId, status } = useElectionStatus();  // 👈 Hook nutzen
    const [parties, setParties] = useState<Party[]>([]);
    const [contract, setContract] = useState<Contract | null>(null);
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [proposals, setProposals] = useState<Candidate[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [texts, setTexts] = useState<TextContent | null>(null);
    const [modus, setModus] = useState(0);
    const [htmlContent, setHtmlContent] = useState<ReactElement | null>(null);   

    // -------- Initiales Laden
    useEffect(() => {
        if (settings) {
            loadTexts("start-texts", settings.language).then(setTexts);
        }
    }, [settings]);

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
                        <div>{candidate.text}</div>
                    </div>
                ))}
            </div>
        );
        //console.log("Modus: ", modus)
        setHtmlContent(htmlBundestagswahl);
    }, [texts, candidates, parties, proposals]);

    //const navigate = useNavigate(); 

    /*
    // Navigation Functions - FIX mit Dynamic Import
    const goToVote = async () => {
        try {
            const tauriAPI = await loadTauriAPI();
            if (tauriAPI) {
                await tauriAPI.invoke('navigate_to', { path: '/vote' });
            } else {
                // Fallback für Browser
                navigate("/vote");
            }
        } catch (err) {
            console.error('Navigation error:', err);
        }
    };

    const goToResults = async () => {
        try {
            const tauriAPI = await loadTauriAPI();
            if (tauriAPI) {
                await tauriAPI.invoke('navigate_to', { path: '/results' });
            } else {
                // Fallback für Browser
                navigate("/results");
            }
        } catch (err) {
            console.error('Navigation error:', err);
        }
    };

    const goToSettings = async () => {
        try {
            const tauriAPI = await loadTauriAPI();
            if (tauriAPI) {
                await tauriAPI.invoke('navigate_to', { path: '/extras/settings' });
            } else {
                // Fallback für Browser
                navigate("/extras/settings");
            }
        } catch (err) {
            console.error('Navigation error:', err);
        }
    };
    */
   
    // Loading State
    if (isLoading) {
        return (
            <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p>Lade Wahlsystem...</p>
                <p>{status}</p>
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

    // Main UI
    /*
    const mainUI = (
        <div className="flex flex-col items-center gap-6">
            {settings && (
                <div className="text-center text-gray-600">
                    <p>Wahlbezirk: {settings.election_district}</p>
                    <p>{status}</p>
                </div>
            )}

            <div className="flex flex-col gap-4 w-full max-w-md">
                {status !== "Die Wahl ist geschlossen."  ? (
                    <button
                        onClick={goToVote}
                        className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        disabled={!contract}
                    >
                    🗳️ Wählen
                </button>) : ("")}

                {status === "Die Wahl ist geschlossen."  ? (
                    <button
                        onClick={goToResults}
                        className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        disabled={!contract}
                    >
                        📊 Ergebnisse anzeigen
                    </button>
                    ) : ("")
                }
                
                <button
                    onClick={goToSettings}
                    className="w-full px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                    ⚙️ Einstellungen
                </button>
                
                
            </div>

            {contract && (
                <div className="text-sm text-green-600 mt-4">
                    ✅ Smart Contract ist vorhanden.
                </div>
            )}
        </div>
        
    );
    */
    return (
        <div>
            <h1 className="text-3xl font-bold text-center">
                Blockchain Voting System
            </h1>
            {htmlContent}
           
        </div>
    );
}