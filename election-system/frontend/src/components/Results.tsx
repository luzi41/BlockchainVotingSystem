// Results.tsx V 0.25.3 (Colors fix)
import { useState, useEffect } from "react";
import { JsonRpcProvider, Contract } from "ethers";
import { Link } from "react-router-dom";
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

async function loadJson(relativePath: string) {
  if (window.electronAPI?.invoke) {
    return await window.electronAPI.invoke("load-json", relativePath);
  } else {
    const base = (process.env.PUBLIC_URL || "").replace(/\/$/, "");
    const url = `${base}/${relativePath.replace(/^\//, "")}`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new Error(`fetch ${url} -> ${res.status} ${res.statusText}; body starts: ${body.slice(0, 120)}`);
    }
    return res.json();
  }
}

/** Render-Komponenten */
function DistrictResults({ texts, districts, results1, results2, display1, display2 }: any) {
  return (
    <>
      <div id="ed" style={{ display: display1 }}>
        <table border={1} cellPadding="5" cellSpacing="0">
          <tbody>
            {districts.map((district: any, i: number) => (
              <tr key={i}>
                <td>
                  <h2>
                    {district.name} {district.nummer}
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
        <TotalResults texts={texts} parties={Results.cache.parties} />
      </div>
    </>
  );
}

function ResultTable({ data, texts, isParty }: any) {
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

function TotalResults({ texts, parties }: any) {
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
        const lang = process.env.REACT_APP_LANG || "de";
        const loadedTexts = await loadJson(`texts/results-texts.${lang}.json`);
        setTexts(loadedTexts);

        let rpcUrl = process.env.REACT_APP_RPC_URL;
        if (window.electronAPI?.settings?.get) {
          const fromStore = await window.electronAPI.settings.get("rpcURL");
          if (fromStore) rpcUrl = fromStore;
        }
        const provider = new JsonRpcProvider(rpcUrl);

        const name = process.env.REACT_APP_ELECTION_MODE_NAME || "Proposals";
        const abiJson = window.electronAPI?.invoke
          ? await window.electronAPI.invoke("load-json", `contracts/${name}.json`).catch(() =>
              window.electronAPI?.invoke
                ? window.electronAPI.invoke("load-json", `contracts/${name}.sol/${name}.json`)
                : undefined
            )
          : ABI_REGISTRY[name];
        if (!abiJson) throw new Error(`ABI "${name}" nicht registriert.`);

        const address = process.env.REACT_APP_CONTRACT_ADDRESS;
        if (!address) throw new Error("Contract address not defined.");
        const contract = new Contract(address, abiJson.abi, provider);
        /*
        const m = await contract.getModus();
        setModus(Number(m));
        */
        if (Number(modus) === 1) {
          const _districts = await contract.getElectionDistricts(electionId);
          const _parties = await contract.getParties(electionId);
          setParties(_parties);

          const results1: any[] = [];
          const results2: any[] = [];
          for (let i = 0; i < _districts.length; i++) {
            results1[i] = JSON.parse((await contract.getElectionResultsDistrict1(electionId, i + 1)).tally);
            results2[i] = JSON.parse((await contract.getElectionResultsDistrict2(electionId, i + 1)).tally);
          }
          Results.cache.resultsParties = aggregateObjects(results2);
          Results.cache.parties = _parties;

          setHtml(
            <div>
              <h1>{loadedTexts.headline}</h1>
              <p>
                <select
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
          const proposalList = await contract.getProposals(electionId);
          if (!proposalList || proposalList.length === 0) throw new Error(loadedTexts.errorProposals);

          const rawResult = await contract.getVotingResult(electionId);
          const result = JSON.parse(rawResult.tally);
          const voteNumber = await contract.getNumberOfVotes(electionId);

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
        setStatus("");
      } catch (err: any) {
        console.error("❌ Fehler beim Laden der Ergebnisse:", err.message);
        setHtml(
          <div className="border">
            <h2>{texts.headline || "Wahlergebnisse"}</h2>
            <p>{status}</p>
          </div>
        );
      }
    }
    fetchResults();
  }, [display1, display2]);

  return <div>{html}</div>;
}
Results.cache = {
  parties: [] as any[],
  resultsParties: {} as Record<string, number>,
};

export default Results;
