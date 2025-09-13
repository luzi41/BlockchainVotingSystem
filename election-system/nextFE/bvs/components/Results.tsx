// Results.tsx (refactored)
import React, { useState, useEffect } from "react";
import { Contract } from "ethers";
import Link from "next/link";
import { useElectionStatus } from "./hooks/useElectionStatus";
import { useAppSettings } from "./hooks/useAppSettings";
import { ResultsTexts } from "./types/ResultsTypes";
import { loadTexts } from "./utils/loadTexts";
import { useLanguage } from "./contexts/LanguageContext"; // 👈 wichtig!

interface ResultsProps {
  electionDistrict: string;
  availableDistricts?: string[];
}

type ResultsComponent = React.FC<ResultsProps> & {
  cache: {
    parties: any[];
    resultsParties: Record<string, number>;
  };
};

// Muss den Rust-Struct-Namen/Feldnamen 1:1 spiegeln
export interface AppSettings {
  election_district: string;
  rpc_url: string;
  contract_address: string;
  language: string;
}

// Sichere Tauri API Imports mit korrekten Types
let invoke: ((cmd: string, args?: any) => Promise<any>) | null = null;
try {
  // Dynamischer Import für Tauri APIs
  const tauriCore = require("@tauri-apps/api/core");
  invoke = tauriCore.invoke;
} catch (error) {
  console.log("Tauri APIs nicht verfügbar (Web-Modus)");
}

// Verbesserte Tauri-Erkennung für V2
const checkIsTauri = (): boolean => {
  if (typeof window === "undefined") return false;
  
  // Wichtig: Erst prüfen ob invoke überhaupt verfügbar ist
  if (!invoke) return false;
  
  // Methode 1: __TAURI__ global check
  if ("__TAURI__" in window) return true;
  
  // Methode 2: Tauri-spezifische APIs prüfen
  try {
    // @ts-ignore - Tauri globals
    if (window.__TAURI_INTERNALS__) return true;
  } catch {}
  
  // Methode 3: User Agent prüfen - NUR wenn invoke verfügbar ist
  if (navigator.userAgent.includes('Tauri')) return true;
  
  return false;
};


const fmt3 = new Intl.NumberFormat("de-DE", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

/* ---------- Helfer (wie vorher) ---------- */
function aggregateObjects(_object: any[]): Record<string, number> {
  const summe: Record<string, number> = {};
  let total = 0;
  for (const eintrag of _object) {
    for (const partei in eintrag) {
      summe[partei] = (summe[partei] || 0) + eintrag[partei];
      total += eintrag[partei];
    }
  }
  aggregateObjects.total = total;
  return summe;
}
aggregateObjects.total = 0;

function extractTallyString(raw: any): string | null {
  if (raw == null) return null;
  if (typeof raw === "string") return raw;
  if (typeof raw === "object" && typeof raw.tally === "string") return raw.tally;
  if (Array.isArray(raw) && typeof raw[0] === "string") return raw[0];
  return null;
}

function safeParseTally(raw: any): Record<string, number> {
  const s = extractTallyString(raw);
  if (!s || s === "undefined" || s.trim() === "") return {};
  try {
    const parsed = JSON.parse(s);
    const out: Record<string, number> = {};
    for (const [k, v] of Object.entries(parsed || {})) {
      const num = Number(v as any);
      if (!Number.isNaN(num)) out[k] = num;
    }
    return out;
  } catch {
    return {};
  }
}

/* ---------- Kleine Rendering-Komponenten ---------- */

function ResultTable({ data, texts, isParty }: { data: Record<string, number>; texts: ResultsTexts; isParty?: boolean }) {
  return (
    <table border={0} cellPadding="5" cellSpacing="0">
      <thead>
        <tr>
          <th style={{ width: "50%" }}>{isParty ? texts.party : "Name"}</th>
          <th style={{ width: "50%" }}>{texts.votes}</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(data).map(([name, value]) => (
          <tr key={name}>
            <td>{name}</td>
            <td>{String(value)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function DistrictResults({
  texts,
  districts,
  results1,
  results2,
}: {
  texts: ResultsTexts;
  districts: any[];
  results1: Record<string, number>[];
  results2: Record<string, number>[];
}) {
  return (
    <div id="ed">
      <table border={1} cellPadding="5" cellSpacing="0">
        <tbody>
          {districts.map((district: any, i: number) => (
            <tr key={i}>
              <td>
                <h2>{district.name}</h2>

                <b>{texts.firstVotes}</b>
                <span className="right">
                  <Link href={`./signature/${district.nummer}/1`}>Signatur</Link>
                </span>
                <ResultTable data={results1[i] ?? {}} texts={texts} isParty={false} />

                <b>{texts.secondVotes}</b>
                <span className="right">
                  <Link href={`./signature/${district.nummer}/2`}>Signatur</Link>
                </span>
                <ResultTable data={results2[i] ?? {}} texts={texts} isParty />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TotalResults({ texts, parties, aggregated }: { texts: ResultsTexts; parties: any[]; aggregated: Record<string, number> }) {
  const Stimmen = aggregateObjects.total;
  return (
    <div id="total">
      <h2>{texts.totalParties}</h2>
      <table border={1} cellPadding="5" cellSpacing="0" className="results-table">
        <tbody>
          {Object.entries(aggregated).map(([name, value]) => {
            const p = parties.find((p) => p.shortname === name);
            const fg = p?.color || "#000";
            const bg = p?.bgcolor || "#ddd";

            return (
              <tr key={name}>
                <td className="results-label">{name}</td>
                <td>
                  <div
                    className="results-bar-fill"
                    style={{
                      color: fg,
                      backgroundColor: bg,
                      width: (100 * Number(value) / (Stimmen || 1)).toString() + "%",
                    }}
                  >
                    {fmt3.format((100 * Number(value)) / (Stimmen || 1))} %
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        {texts.votes}: {Stimmen}
      </div>
    </div>
  );
}

/* ---------- Hauptkomponente (ohne setHtml) ---------- */

export default function Results() {
  const { language, setLanguage } = useLanguage();
  const { settings, error } = useAppSettings(
    "1",
    "de"
  );     
  const { provider, address, electionId, status } = useElectionStatus();
  const [modus, setModus] = useState<number>(1);
  const [displayMode, setDisplayMode] = useState<"districts" | "total" | "none">("total");
  const [results1, setResults1] = useState<Record<string, number>[]>([]);
  const [results2, setResults2] = useState<Record<string, number>[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [parties, setParties] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [texts, setTexts] = useState<ResultsTexts | null>(null);
  const [loadingTexts, setLoadingTexts] = useState<boolean>(true);
  const [loadingResults, setLoadingResults] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // -------- Initiales Laden
  useEffect(() => {
  if (settings) {
      
      //setElectionDistrictNo(settings.election_district);
      loadTexts("results-texts", language).then(setTexts);
      setLoadingTexts(false);
  }
  }, [language, settings]);

  useEffect(() => {
    if (!provider || !address || !electionId) return;

    let mounted = true;
    //setError(null);

    const loadAll = async () => {

      // Now fetch blockchain results
      setLoadingResults(true);
      try {
        // ABI von statischer Datei laden (statt API Route)
        const abiResponse = await fetch('/contracts/Bundestagswahl.sol/Bundestagswahl.json');
        if (!abiResponse.ok) {
            throw new Error(`ABI laden fehlgeschlagen: ${abiResponse.status}`);
        }
        
        const abiData = await abiResponse.json();
        const abi = abiData.abi || abiData; // Fallback falls die Struktur variiert
        
        if (!address) throw new Error("Contract address is null or undefined.");
        const contract = new Contract(String(address), abi, provider);
        const electionStatus = await contract.getElectionStatus(electionId);
        if (!mounted) return;
        //setStatus(electionStatus);
        const _title = await contract.getElectionTitle(electionId);
        setTitle(_title);      
        if (electionStatus === "Die Wahl ist geschlossen.") {
          const m = await contract.getModus();
          if (!mounted) return;

          setModus(Number(m));

          if (Number(m) === 1) {
            const _districts = await contract.getElectionDistricts(electionId);
            const _parties = await contract.getParties(electionId);

            const _results1: Record<string, number>[] = [];
            const _results2: Record<string, number>[] = [];

            for (let i = 0; i < _districts.length; i++) {
              const raw1 = await contract.getElectionResultsDistrict1(electionId, i + 1);
              const raw2 = await contract.getElectionResultsDistrict2(electionId, i + 1);
              _results1[i] = safeParseTally(raw1);
              _results2[i] = safeParseTally(raw2);
            }

            const hasAny =
              _results1.some((r) => Object.keys(r).length > 0) ||
              _results2.some((r) => Object.keys(r).length > 0);

            if (!hasAny) {
              const msg = "278 Keine Ergebnisse oder Ergebnisse noch nicht freigegeben!";
              if (mounted) {
                //setStatus(msg);
              }
              throw new Error(msg);
            }

            const aggregated = aggregateObjects(_results2);
            Results.cache.resultsParties = aggregated;
            Results.cache.parties = _parties;

            if (mounted) {
              setDistricts(_districts);
              setParties(_parties);
              setResults1(_results1);
              setResults2(_results2);
              setDisplayMode("total");
            } else {
              // Proposal mode
              const proposalList = await contract.getProposals(electionId);
              if (!proposalList || proposalList.length === 0) {
                const msg = texts?.errorProposals ?? "Keine Vorschläge";
                //if (mounted) setError(msg);
                throw new Error(msg);
              }
              const rawResult = await contract.getVotingResult(electionId);
              const result = JSON.parse(rawResult.tally ?? "{}");
              const voteNumber = await contract.getNumberOfVotes(electionId);

              // store proposal results in Results.cache or local state as needed
              Results.cache.resultsParties = result;
              Results.cache.parties = proposalList;

              if (mounted) {
                setDisplayMode("total");
                setParties(proposalList);
              }
            }
          }
        }
      } catch (err: any) {
        console.error("Fehler beim Laden der Ergebnisse:", err);
        //if (mounted) setError(err?.message ?? String(err));
      } finally {
        if (mounted) setLoadingResults(false);
        setIsLoading(false);
      }
    };

    loadAll();

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider, address, electionId]);

  // Rendering
    if (!texts) return <p>Error loading texts.</p>;

      // Loading State
    //if (!loadingTexts && !loadingResults) setIsLoading(false);
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
  /*
  if (!provider || !address || !electionId) return <p>Bitte Wallet/Contract verbinden …</p>;
  if (loadingTexts || loadingResults) return <p>⏳ Lade Ergebnisse …</p>;
  if (error) return <div className="error">Fehler: {error}</div>;
  
  */
  
  // If the election is not yet closed
  if (status !== "Die Wahl ist geschlossen.") {
    return (
      <div className="border">
        <h2>{texts.headline}</h2>
        <p>{status}</p>
      </div>
    );
  }

  // Main view when election is closed
  return (
    <div>
      <h1 className="text-3xl font-bold text-center">
        {title}
      </h1>      
      <h2>{texts.headline}</h2>

      <p>
        <select
          name="display"
          onChange={(e) => {
            if (e.target.value === "1") {
              setDisplayMode("districts");
            } else {
              setDisplayMode("total");
            }
          }}
          defaultValue={displayMode === "total" ? "2" : "1"}
        >
          <option value="0">{texts.selectView}</option>
          <option value="1">{texts.viewDistricts}</option>
          <option value="2">{texts.viewTotal}</option>
        </select>
      </p>

      {displayMode === "districts" ? (
        <DistrictResults texts={texts} districts={districts} results1={results1} results2={results2} />
      ) : (
        <TotalResults texts={texts} parties={parties} aggregated={Results.cache.resultsParties} />
      )}
    </div>
  );
};

/* static cache */
Results.cache = {
  parties: [],
  resultsParties: {},
};


