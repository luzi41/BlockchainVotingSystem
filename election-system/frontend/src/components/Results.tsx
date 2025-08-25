// Results.tsx V 0.26.3
import { useState, useEffect } from "react";
import { JsonRpcProvider, Contract } from "ethers";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Results.css";
import ProposalsABI from "../artifacts/contracts/Proposals.sol/Proposals.json";
import BundestagswahlABI from "../artifacts/contracts/Bundestagswahl.sol/Bundestagswahl.json";

const ABI_REGISTRY: Record<string, any> = {
  Proposals: ProposalsABI,
  Bundestagswahl: BundestagswahlABI,
};

declare global {
  interface Window {
    ethereum?: any;
    electronAPI?: {
      invoke?: (channel: string, ...args: any[]) => Promise<any>;
      settings?: {
        get?: (key: string) => Promise<any>;
      };
    };
  }
}

const fmt3 = new Intl.NumberFormat("de-DE", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

/** Hilfsfunktionen */
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

/** Tally sicher extrahieren (obj.tally | string | tuple[0]) */
function extractTallyString(raw: any): string | null {
  if (raw == null) return null;
  // Direkt-String
  if (typeof raw === "string") return raw;
  // Objekt mit .tally
  if (typeof raw === "object" && typeof raw.tally === "string") return raw.tally;
  // Tuple/Array (z. B. [tally, ...])
  if (Array.isArray(raw) && typeof raw[0] === "string") return raw[0];
  return null;
}

/** Tally → Objekt (sicher, ohne Exceptions) */
function safeParseTally(raw: any): Record<string, number> {
  const s = extractTallyString(raw);
  if (!s || s === "undefined" || s.trim() === "") return {};
  try {
    const parsed = JSON.parse(s);
    // abgesichert: nur Zahlenwerte übernehmen
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

/** Render-Komponenten */
function DistrictResults({ texts, districts, results1, results2, display1, display2, aggregated }: any) {
  return (
    <>
      <div id="ed" style={{ display: display1 }}>
        <table border={1} cellPadding="5" cellSpacing="0">
          <tbody>
            {districts.map((district: any, i: number) => (
              <tr key={i}>
                <td>
                  <h2>
                    {district.name} 
                  </h2>
                  <b>{texts.firstVotes}</b>
                  <span className="right">
                    <Link to={`./signature/${district.nummer}/1`}>Signatur</Link>
                  </span>
                  <ResultTable data={results1[i]} texts={texts} isParty={false} />

                  <b>{texts.secondVotes}</b>
                  <span className="right">
                    <Link to={`./signature/${district.nummer}/2`}>Signatur</Link>
                  </span>
                  <ResultTable data={results2[i]} texts={texts} isParty />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div id="total" style={{ display: display2 }}>
        <h2>{texts.totalParties}</h2>
        <TotalResults 
          resultsParties={aggregated}
          texts={texts} 
          parties={Results.cache.parties} 
        />
      </div>
    </>
  );
}

function ResultTable({ data, texts, isParty}: any) {

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

function TotalResults({ texts, parties}: any) {
  const resultsParties = Results.cache.resultsParties;
  const Stimmen = aggregateObjects.total;

  return (
    <>
      <table border={1} cellPadding="5" cellSpacing="0" className="results-table">
        <tbody>
          {Object.entries(resultsParties).map(([name, value]) => {
            const p = parties.find(p => p.shortname === name);
            const fg = p?.color || "#000";
            const bg = p?.bgcolor || "#ddd";
            const percent = (100 * Number(value)) / Stimmen;
            return (
              <tr key={name}>
                <td className="results-label">{name}</td>
                <td>
                  <div className="results-bar-fill"
                    style={{
                      color: fg,
                      backgroundColor: bg,
                      width: (100 * Number(value) / Stimmen).toString() + "%",
                    }}
                  >
                    {fmt3.format((100 * Number(value)) / Stimmen)} %
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
    </>
  );
}
TotalResults.displayName = "TotalResults";

/** Hauptkomponente */
function Results() {
  const [electionId, setElectionId] = useState(1);
  const [modus, setModus] = useState<number>(1);
  const [status, setStatus] = useState("");
  const [texts, setTexts] = useState<Record<string, string>>({});
  const [html, setHtml] = useState<React.ReactNode>("");

  const [parties, setParties] = useState<any[]>([]);
  const [display1, setDisplay1] = useState("none");
  const [display2, setDisplay2] = useState("block");

  useEffect(() => {
    async function fetchResults() {
      try {
        // 🗣 Texte laden
        const lang = process.env.REACT_APP_LANG || "de";
		    let loadedTexts;
        if (window.electronAPI?.invoke) {
			    loadedTexts = await loadJson(`texts/results-texts.${lang}.json`);			
        } else {  
          // Aus public/texts laden
          const textsRes = await fetch(`/texts/results-texts.${lang}.json`);
          if (!textsRes.ok) throw new Error("Textdatei nicht gefunden");
          loadedTexts = await textsRes.json();
        }
        setTexts(loadedTexts);

        let rpcUrl = process.env.REACT_APP_RPC_URL;
        if (window.electronAPI?.settings?.get) {
          const fromStore = await window.electronAPI.settings.get("rpcURL");
          if (fromStore) rpcUrl = fromStore;
        }
        const provider = new JsonRpcProvider(rpcUrl);

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
        //console.log("ABI", abiJson);
        const address = process.env.REACT_APP_CONTRACT_ADDRESS;
        if (!address) throw new Error("Contract address not defined.");
        const contract = new Contract(address, abiJson.abi, provider);
        // ElectionId aus contract
        const _electionId = await contract.getElectionIdByContract(address);
        if (!_electionId) {
          throw new Error("267 No electionId!");
        }        
        const electionStatus = await contract.getElectionStatus(_electionId);
        setStatus(electionStatus);
        setHtml(
          <div className="border">
            <h2>{texts.headline || "Wahlergebnisse"}</h2>
            <p>{status}</p>
          </div>
        );            

        if (status === "Die Wahl ist geschlossen.")
        {
          const m = await contract.getModus();
          setModus(Number(m));
          
          if (Number(modus) === 1) {
            const _districts = await contract.getElectionDistricts(_electionId);
            const _parties = await contract.getParties(_electionId);
            setParties(_parties);

            const results1: any[] = [];
            const results2: any[] = [];

            for (let i = 0; i < _districts.length; i++) {
              const raw1 = await contract.getElectionResultsDistrict1(_electionId, i + 1);
              const raw2 = await contract.getElectionResultsDistrict2(_electionId, i + 1);

              const obj1 = safeParseTally(raw1);
              const obj2 = safeParseTally(raw2);

              results1[i] = obj1;
              results2[i] = obj2;
            }
            // const aggregated = aggregateObjects(results2);
            // Wenn leer → Hinweis
            const hasAny =
              results1.some(r => Object.keys(r).length) ||
              results2.some(r => Object.keys(r).length);
            if (!hasAny) {
              setStatus("292 Keine Ergebnisse oder Ergebnisse noch nicht freigegeben!");
              throw new Error(status);
              //return;
            }

            Results.cache.resultsParties = aggregateObjects(results2);
            Results.cache.parties = _parties;

            setHtml(
              <div>
                <h1>{loadedTexts.headline}</h1>
                <p>
                  <select
                    name="display"
                    onChange={e => {
                      if (e.target.value === "1") {
                        setDisplay1("block");
                        setDisplay2("none");
                      } else {
                        setDisplay2("block");
                        setDisplay1("none");
                      }
                    }}
                  >
                    <option value="0">{loadedTexts.selectView}</option>
                    <option value="1">{loadedTexts.viewDistricts}</option>
                    <option value="2">{loadedTexts.viewTotal}</option>
                  </select>
                </p>
                <DistrictResults
                  texts={loadedTexts}
                  districts={_districts}
                  results1={results1}
                  results2={results2}
                  display1={display1}
                  display2={display2}
                />
              </div>
            );
          } else if (Number(modus) === 2) {
            // Proposal-Modus unverändert
            const proposalList = await contract.getProposals(_electionId);
            if (!proposalList || proposalList.length === 0) throw new Error(loadedTexts.errorProposals);

            const rawResult = await contract.getVotingResult(_electionId);
            const result = JSON.parse(rawResult.tally);
            const voteNumber = await contract.getNumberOfVotes(_electionId);

            setHtml(
              <div>
                <h1>{loadedTexts.headline}</h1>
                {proposalList.map((item: any, idx: number) => (
                  <div className="row" key={idx}>
                    <div>
                      {item.text} {item.answer1}/{item.answer2}
                    </div>
                    <table>
                      <thead>
                        <tr>
                          <th style={{ width: "60%" }}>{loadedTexts.answer}</th>
                          <th style={{ width: "40%" }}>{loadedTexts.votes}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(result).map(([name, value]) => (
                          <tr key={name}>
                            <td>{name}</td>
                            <td>
                              <div
                                style={{
                                  color: "#000",
                                  backgroundColor: "#ccc",
                                  width: (100 * Number(value) / Number(voteNumber)).toString() + "%",
                                }}
                              >
                                {fmt3.format((100 * Number(value)) / Number(voteNumber))} %
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            );
          }
          setStatus("Die Wahl ist geschlossen.");
        } else {
      
        }
      } catch (err: any) {
        setStatus(err.message);
        console.error("❌ Fehler beim Laden der Ergebnisse:", err.message);
      }
    }
    fetchResults();
  }, [display1, display2, modus, status, texts.headline]);

  return <div>{html}</div>;
}
Results.cache = {
  parties: [] as any[],
  resultsParties: {} as Record<string, number>,
};

export default Results;
