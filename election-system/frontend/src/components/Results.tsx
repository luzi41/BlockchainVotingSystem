// Results.tsx V 0.23.6
import { useState, useEffect } from "react";
import Election from "../artifacts/contracts/Proposals.sol/Proposals.json";
import { JsonRpcProvider, Contract } from "ethers";
import { Link } from "react-router-dom";

declare global {
  interface Window {
    ethereum?: any;
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

  const provider = new JsonRpcProvider(process.env.REACT_APP_RPC_URL);
  if (!provider) {        
    throw new Error("Netzwerkfehler!");
  } else {  
    const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
    if (!contractAddress) {
      throw new Error("REACT_APP_CONTRACT_ADDRESS is not defined");
    }
    const contract = new Contract(contractAddress, Election.abi, provider);

    // Texte laden
    useEffect(() => {
      fetch("/texts/results-texts.de.json")
        .then(res => res.json())
        .then(data => {
          setTexts(data);
          setStatus(data.intro || "Ergebnisse werden geladen …");
        })
        .catch(err => {
          console.error("❌ Fehler beim Laden der Texte:", err);
          setStatus("Ergebnisse werden geladen …");
        });
    }, []);

    useEffect(() => {
      async function fetchResults() {
        try {
          if (!contract) return;
          const m = await contract.getModus();
          setModus(Number(m));

          if (Number(m) === 1) {
            const _electionDistricts = await contract.getElectionDistricts();
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

            const resultsParties = aggregateObjects(results_2);

            const htmlED = (
              <div>
                <h1>{texts.headline}</h1>
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
                    <option value="0">{texts.selectView}</option>
                    <option value="1">{texts.viewDistricts}</option>
                    <option value="2">{texts.viewTotal}</option>
                  </select>
                </p>

                {/* Einzelne Wahlkreise */}
                <div id="ed" style={{ display: display1 }}>
                  <table border={1} cellPadding="5" cellSpacing="0">
                    <tbody>
                      {_electionDistricts.map((district: any, i: number) => (
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
                                  <th style={{ width: "50%" }}>Partei</th>
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

            setHtml(htmlED);
            setStatus("");

          } else if (Number(m) === 2) {
            const proposalList = await contract.getProposals();
            if (!proposalList || proposalList.length === 0) throw new Error("Proposals nicht geladen!");

            const rawResult = await contract.getVotingResult();
            const result = JSON.parse(rawResult.tally); 
            const voteNumber = await contract.getNumberOfVotes();

            const htmlProposals = (
              <div>
                <h1>{texts.headline}</h1>
                {proposalList.map((item: any, index: number) => (
                  <div className="row" key={index}>
                    <div>{item.text} {item.answer1}/{item.answer2}</div>
                    <div>
                      <table>
                        <thead>
                          <tr>
                            <th style={{ width: "60%" }}>Antwort</th>
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

            setHtml(htmlProposals);
            setStatus("");
          }
        } catch (err: any) {
          console.error("❌ Fehler beim Laden des Moduls:", err.message);
          setHtml(
            <div className="border">
              <h2>{texts.headline || "Wahlergebnisse"}</h2>
              <p>{status}</p>
            </div>
          );
        }
      }

      fetchResults();
    }, [display1, display2, texts]);

    function getPartyBgColor(_party: string) {
      const found = parties.find(p => p.shortname === _party);
      return found ? found.bgcolor : "#fff";
    }

    function getPartyColor(_party: string) {
      const found = parties.find(p => p.shortname === _party);
      return found ? found.color : "#000";
    }

    return <div>{html}</div>;
  }
}  

export default Results;
