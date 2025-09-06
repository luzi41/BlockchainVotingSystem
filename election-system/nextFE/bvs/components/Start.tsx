"use client";
import { useState, useEffect, ReactElement } from "react";
import { useElectionStatus } from "./hooks/useElectionStatus";
import { invoke } from "@tauri-apps/api/core";
import { Contract } from "ethers";
import { loadTexts } from "./utils/loadTexts";
import { StartTexts, Candidate, Party } from "./types/StartTypes";

// Dynamic import für Tauri API um SSR Probleme zu vermeiden
const loadTauriAPI = async () => {
    try {
        const { invoke } = await import('@tauri-apps/api/core');
        return { invoke };
    } catch (err) {
        console.warn('Tauri API nicht verfügbar:', err);
        return null;
    }
};

// Muss den Rust-Struct-Namen/Feldnamen 1:1 spiegeln
export interface AppSettings {
  election_district: string;
  rpc_url: string;
  //contract_address: string;
}

const isTauri =
  typeof window !== "undefined" && "__TAURI__" in window; // sicherer Check fürs FE

export default function Start() {
    interface TextContent {
        titleRegistration: string;
        textRegistration: string;
        titleCandidates: string;
        titleParties: string;
        details: string;
    }    
    const { provider, address, electionId } = useElectionStatus();  // 👈 Hook nutzen
    const { title, status, loading, error } = useElectionStatus();
    const [settings, setSettings] = useState<AppSettings | null>(null);
    const [parties, setParties] = useState<Party[]>([]);
    const [contract, setContract] = useState<Contract | null>(null);
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [proposals, setProposals] = useState<Candidate[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    //const [error, setError] = useState<string | null>(null);
    const [texts, setTexts] = useState<TextContent | null>(null);
    const [modus, setModus] = useState(0);
    const [electionDistrictNo, setElectionDistrictNo] = useState<string>("");
    const [htmlContent, setHtmlContent] = useState<ReactElement | null>(null);
    //const [loading, setLoading] = useState(true);
    //const [status, setStatus] = useState<string>("");
    const [language, setLanguage] = useState("de");
    const [privateKey, setPrivateKey] = useState("");

    // Tauri Settings laden - FIX mit Dynamic Import
    useEffect(() => {
        let cancelled = false;
        const loadSettings = async () => {
            try {
                setIsLoading(true)
                if (isTauri) {
                    console.log("Tauri-Modus!");
                    // Echte Settings aus Tauri
                    const s = await invoke<AppSettings>("get_all_settings");
                    if (!cancelled) setSettings(s);
                        setElectionDistrictNo(s.election_district);
                        console.log("Kein Fallback:", electionDistrictNo);
                    } else {
                        console.log("Fallback:", cancelled);
                        // Web-Fallback (read-only)
                        const fallback: AppSettings = {
                            election_district:
                            electionDistrictNo ||
                            process.env.NEXT_PUBLIC_ELECTION_DISTRICT ||
                            "1",
                            rpc_url:
                            process.env.NEXT_PUBLIC_RPC_URL || "http://127.0.0.1:8545",
                            
                            /*
                            contract_address:
                            process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ||
                            "0x0000000000000000000000000000000000000000",
                            */
                        };
                        setElectionDistrictNo(fallback.election_district);
                        if (!cancelled) setSettings(fallback);
                        console.log("Kein Tauri!");
                        
                    }


                // FE-only Defaults
                if (!cancelled) {
                    setLanguage(process.env.NEXT_PUBLIC_LANGUAGE || "de");
                    setPrivateKey(process.env.NEXT_PUBLIC_PRIVATE_KEY || "");
                }
            } catch (err) {
                console.error("❌ Fehler beim Initialisieren der Settings:", err);
                //if (!cancelled) setStatus("Fehler beim Laden der Einstellungen.");
            } finally {
                if (!cancelled) setIsLoading(false);
            }

        };

        loadSettings();
    }, []);

    useEffect(() => {

        async function fetchTexts() {
            try {
                //setError("");

                // 🗣 Texte laden
                const _texts = await loadTexts("start-texts");
                setTexts(_texts);        
 
            } catch (err) {
                //setError(String(err));
                console.error("❌ Fehler beim Laden der Texte:", err);
            }
        }
        fetchTexts();
      
    }, [language]); 

    // Smart Contract Setup
    useEffect(() => {
        const initializeContract = async () => {
            
            if (!provider || !address || !electionId) {
                //console.log("Settings oder Provider oder address oder electionId nicht geladen.")
                return;
            };

            try {
                console.log("Provider, address und electionId geladen.")
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
                //if (contractInstance) console.log("contractInstance geladen!");
                setContract(contractInstance);
                if (contract) console.log("Contract geladen!");

                
            } catch (err) {
                console.error('Contract initialization error:', err);
                //setError(`Fehler beim Initialisieren des Smart Contracts: ${err instanceof Error ? err.message : 'Unbekannter Fehler'}`);
            } finally {
                
                setIsLoading(false);
            }
        };

        initializeContract();
    }, [settings, provider]);

    // Contract Daten laden - KORRIGIERT
    useEffect(() => {
        async function fetchData() {
            
            if (!contract) {
                //console.log("Contract nicht geladen!");
                return
            };
            if (!electionId) {
                console.log("electionId nicht geladen!");
                return
            };
            if (!electionDistrictNo) {
                console.log("electionDistrictNo nicht geladen!");
                return
            };            
            
            try {
                //setError("");
                console.log("Contract geladen!");
                console.log("electionId geladen! ", electionId);
                console.log("electionDistrictNo geladen! ", electionDistrictNo);
                const m = await contract.getModus();
                if (m) {
                    const modusNumber = Number(m);
                    setModus(modusNumber);
                    
                    if (modusNumber === 1) {
                        const candidatesList = await contract.getCandidates(electionId, electionDistrictNo);
                        const partiesList = await contract.getParties(electionId);

                        setCandidates(candidatesList);
                        setParties(partiesList);
                    } else if (modusNumber === 2) {
                        const proposalList = await contract.getProposals(electionId);
                        setProposals(proposalList);
                    }     
                } else {
                    throw new Error("Modus nicht bekannt!");    
                }
                
            } catch (error) {
                console.error("Fehler beim Laden der Contract-Daten:", error);
                //setError(`Fehler: ${error}`);
            }
        }
        
        fetchData();
    }, [contract]);
            /*

            */
    // HTML Content generieren - KORRIGIERT (nicht in render cycle)
    
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
        console.log("Modus: ", modus)
        setHtmlContent(htmlBundestagswahl);
    }, [texts, candidates, parties, proposals]);

    // Navigation Functions - FIX mit Dynamic Import
    const goToVote = async () => {
        try {
            const tauriAPI = await loadTauriAPI();
            if (tauriAPI) {
                await tauriAPI.invoke('navigate_to', { path: '/vote' });
            } else {
                // Fallback für Browser
                window.location.hash = '/vote';
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
                window.location.hash = '/results';
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
                window.location.hash = '/extras/settings';
            }
        } catch (err) {
            console.error('Navigation error:', err);
        }
    };

    // Loading State
    if (isLoading) {
        return (
            <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p>Lade Wahlsystem...</p>
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
    
    //if (htmlContent) return <p>Load texts ...</p>; 

    // Main UI
    const mainUI = (
        <div className="flex flex-col items-center gap-6">

            
            {settings && (
                <div className="text-center text-gray-600">
                    <p>Wahlbezirk: {settings.election_district}</p>
                    <p>Verbunden mit Blockchain? Settings sind da.</p>
                </div>
            )}

            <div className="flex flex-col gap-4 w-full max-w-md">
                <button
                    onClick={goToVote}
                    className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    disabled={!contract}
                >
                    🗳️ Wählen
                </button>

                <button
                    onClick={goToResults}
                    className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    disabled={!contract}
                >
                    📊 Ergebnisse anzeigen
                </button>

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

    return (
        <div>
            <h1 className="text-3xl font-bold text-center">
                Blockchain Voting System
            </h1>
            {htmlContent}
            {mainUI}
        </div>
    );
}