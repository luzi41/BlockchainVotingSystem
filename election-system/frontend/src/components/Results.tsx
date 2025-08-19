// Results.tsx V 0.23.38
import { useState, useEffect } from "react";
// import Election from "../artifacts/contracts/Proposals.sol/Proposals.json";
import { JsonRpcProvider, Contract } from "ethers";
import { Link } from "react-router-dom";
// ✅ Web: statisch importierte ABIs (Registry)
//import ProposalsABI from "../artifacts/contracts/Proposals.sol/Proposals.json";
// Wenn du weitere Modi hast, hier ergänzen:
// import OtherABI from "../artifacts/contracts/Other.sol/Other.json";
import BundestagswahlABI from "../artifacts/contracts/Bundestagswahl.sol/Bundestagswahl.json";

const ABI_REGISTRY = {
	//Proposals: ProposalsABI,
 	Bundestagswahl: BundestagswahlABI,
	// Other: OtherABI,
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
let Stimmen = 0;

function aggregateObjects(_object: any[]): Record<string, number> {
  const summe: Record<string, number> = {};
  let total = 0;

  for (const eintrag of _object) {
    for (const partei in eintrag) {
      summe[partei] = (summe[partei] || 0) + eintrag[partei];
      total += eintrag[partei];
    }
  }
  Stimmen = total;
  return summe;
}

function Results() {
  const [modus, setModus] = useState<number>(0);
  const [status, setStatus] = useState("");
  const [texts, setTexts] = useState<Record<string, string>>({});
  const [html, setHtml] = useState<React.ReactNode>("");
  const [parties, setParties] = useState<any[]>([]);
  const [display1, setDisplay1] = useState<string>("none");
  const [display2, setDisplay2] = useState<string>("block");
  const [results_1, setResults_1] = useState<any[]>([]);
  const [results_2, setResults_2] = useState<any[]>([]);
  const [electionDistricts, setElectionDistricts] = useState<any[]>([]);
  const [resultsParties, setResultsParties] = useState<Record<string, number>>({});
  const [proposalList, setProposalList] = useState<any[]>([]);
  const [result, setResult] = useState<any[]>([]);
  const [voteNumber, setVoteNumber] = useState(0);
  const [error, setError] = useState(0);

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

      // 🔧 Provider
      let rpcUrl = process.env.REACT_APP_RPC_URL;
      if (window.electronAPI?.settings?.get) {
        const fromStore = await window.electronAPI.settings.get("rpcURL");
        if (fromStore) rpcUrl = fromStore;
      }
      const provider = new JsonRpcProvider(rpcUrl);

      // 🧠 ABI laden
      const name = process.env.REACT_APP_ELECTION_MODE_NAME || "Proposals";
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
      const address = process.env.REACT_APP_CONTRACT_ADDRESS;
      if (!address) {
        throw new Error("Contract address is not defined in environment variables.");
      }
      const contract = new Contract(address, abiJson.abi, provider);

      if (!contract) return;

      const _status = await contract.getElectionStatus();
      setStatus(_status);   

      const m = await contract.getModus();
      setModus(Number(m));
      console.log("Modus: ", Number(m))

      if (status !== "Die Wahl ist geschlossen.") {
        setError(1);
        throw new Error("Die Wahl ist noch nicht geschlossen.");
      }

      if (Number(m) === 1) {
        const _electionDistricts = await contract.getElectionDistricts();
        setElectionDistricts(_electionDistricts);

        const _parties = await contract.getParties();
        setParties(_parties);

        const results_1: Record<string, number>[] = [];
        const results_2: Record<string, number>[] = [];

        for (let i = 0; i < _electionDistricts.length; i++) {
          const districtIndex = i + 1;
          const newResult1 = await contract.getElectionResultsDistrict1(districtIndex);
          const newResult2 = await contract.getElectionResultsDistrict2(districtIndex);
          results_1[i] = JSON.parse(newResult1.tally);
          results_2[i] = JSON.parse(newResult2.tally);
        }
        setResults_1(results_1);
        setResults_2(results_2);

        const _resultsParties = aggregateObjects(results_2);
        setResultsParties(_resultsParties);

      } else if (Number(m) === 2) {
        const proposalList = await contract.getProposals();
        if (!proposalList || proposalList.length === 0) throw new Error(texts.errorProposals);
        setProposalList(proposalList);

        const rawResult = await contract.getVotingResult();
        const _result = JSON.parse(rawResult.tally); 
        setResult(_result);
        const _voteNumber = await contract.getNumberOfVotes();
        setVoteNumber(_voteNumber);
      }
    } catch (err: any) {
      console.error("❌ " + texts.errorLoadModule + " :", err.message);
    }
  }

  fetchResults();
}, 
  [

  ]);

  function getPartyBgColor(_party: string) {
    const found = parties.find(p => p.shortname === _party);
    return found ? found.bgcolor : "#fff";
  }

  function getPartyColor(_party: string) {
    const found = parties.find(p => p.shortname === _party);
    return found ? found.color : "#000";
  }

  const htmlBundestagswahl = (
    <div>
      <h1>{texts.headline}</h1>
      <p>
        <select
          onChange={e => {
            if (e.target.value === "1") { // bestimmt, ob Elemente ausgeblendet werden
              setDisplay1("block");
              setDisplay2("none");
            } else {
              setDisplay2("block");
              setDisplay1("none");
            }
          }}
        >
          <option value="0">{texts.selectView}</option>
          <option value="1">{texts.viewDistricts}</option>
          <option value="2">{texts.viewTotal}</option>
        </select>
      </p>

      {/* Einzelne Wahlkreise */}
      <div id="ed" style={{ display: display1 }}>
        <table border={1} cellPadding="5" cellSpacing="0">
          <tbody>
            {electionDistricts.map((district: any, i: number) => (
              <tr key={i}>
                <td>
                  <h2>{district.name} {district.nummer}</h2>
                  <b>{texts.firstVotes}</b>
                  <span className="right">
                    <Link to={`./signature/${district.nummer}/1`}>Signatur</Link>
                  </span>
                  <table border={0} cellPadding="5" cellSpacing="0">
                    <thead>
                      <tr>
                        <th style={{ width: "50%" }}>Name</th>
                        <th style={{ width: "50%" }}>{texts.votes}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(results_1[i]).map(([name, value]) => (
                        <tr key={name}>
                          <td>{name}</td>
                          <td>{String(value)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <b>{texts.secondVotes}</b>
                  <span className="right">
                    <Link to={`./signature/${district.nummer}/2`}>Signatur</Link>
                  </span>
                  <table border={0} cellPadding="5" cellSpacing="0">
                    <thead>
                      <tr>
                        <th style={{ width: "50%" }}>{texts.party}</th>
                        <th style={{ width: "50%" }}>{texts.votes}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(results_2[i]).map(([name, value]) => (
                        <tr key={name}>
                          <td>{name}</td>
                          <td>{String(value)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Gesamtergebnisse */}
      <div id="total" style={{ display: display2 }}>
        <h2>{texts.totalParties}</h2>
        <table border={1} cellPadding="5" cellSpacing="0">
          <tbody>
            {Object.entries(resultsParties).map(([name, value]) => (
              <tr key={name}>
                <td>{name}</td>
                <td>
                  <div
                    style={{
                      color: getPartyColor(name),
                      backgroundColor: getPartyBgColor(name),
                      width: (100 * Number(value) / Stimmen).toString() + '%'
                    }}
                  >
                    {fmt3.format(100 * Number(value) / Stimmen)}&nbsp;%
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>{texts.votes}: {Stimmen}</div>
      </div>
    </div>
  );

  const htmlProposal = (
    <div>
      <h1>317 {texts.headline}</h1>
      {proposalList.map((item: any, index: number) => (
        <div className="row" key={index}>
          <div>{item.text} {item.answer1}/{item.answer2}</div>
          <div>
            <table>
              <thead>
                <tr>
                  <th style={{ width: "60%" }}>{texts.answer}</th>
                  <th style={{ width: "40%" }}>{texts.votes}</th>
                </tr>
              </thead>                      
              <tbody>
              {Object.entries(result).map(([name, value]) => (
                <tr key={name}>
                  <td>{name}</td>
                  <td>
                    <div
                      style={{ color: "ffcc00", backgroundColor: "#ccc", width: (100 * Number(value) / Number(voteNumber)).toString() + '%' }}>
                      {fmt3.format(100 * Number(value) / Number(voteNumber))} %
                    </div>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );

  /*
  if (error === 1) {
    setStatus("Error");
    return (
      <div className="border">
        <h2>{texts.headline || "Wahlergebnisse"}</h2>
        <p>{status}</p>
      </div>
    );    
  }
  */
  return modus === 1 ? htmlBundestagswahl : htmlProposal;
  //return <div>{html}</div>;
}
 
export default Results;
