// V 0.19.2
import { useState, useEffect } from "react";
import Election from "../artifacts/contracts/Bundestagswahl.sol/Bundestagswahl.json";
import { BrowserProvider, Contract} from "ethers";
import { CONTRACT_ADDRESSES } from "../config";

// Add this declaration to inform TypeScript about window.ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}

const fmt3 = new Intl.NumberFormat("de-DE", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
let Stimmen = 0;


function aggregateObjects(_object) {
  const summe = {};
  let total = 0;
  
  for (const eintrag of _object) {
    for (const partei in eintrag) {
      if (!summe[partei]) {
        summe[partei] = 0;
      }
      summe[partei] += eintrag[partei];
      total += eintrag[partei];
    }
  }
  Stimmen = total;
  return summe;
}

function Results() {
  const [status, setStatus] = useState("Die Ergebnisse folgen nach Entschlüsselung und Freigabe durch den Wahlleiter.");
  const [html, setHtml] = useState<React.ReactNode>("");
  const [parties, setParties] = useState<any[]>([]);
  const [display1, setDisplay1] = useState<string>("none");
  const [display2, setDisplay2] = useState<string>("block");
    
  useEffect(() => {
      async function fetchResults() {
      try {
        if (!window.ethereum) {
          setStatus("MetaMask ist nicht installiert.");
          return;
        }
        const provider = new BrowserProvider(window.ethereum);
        const contract = new Contract(CONTRACT_ADDRESSES.registry, Election.abi, provider);
        const _electionDistricts = await contract.getElectionDistricts();
        const _parties = await contract.getParties();
        setParties(_parties);
        //console.log(parties[0].name);
        const results_1: Record<string, any>[] = [];
        const results_2: Record<string, any>[] = [];

        for (var i = 0; i < _electionDistricts.length; i++) {
          let j = i + 1;          
          const newResult_1 = await contract.getElectionResultsDistrict1(j);
          results_1[i] = JSON.parse(newResult_1.tally);
          //console.log(results_1[i]);

          const newResult_2 = await contract.getElectionResultsDistrict2(j);
          results_2[i] = JSON.parse(newResult_2.tally);
          //console.log(results_2[i]);
        }
        const resultsParties = aggregateObjects(results_2);
             
        const htmlED = (
          <div>
            <h1>Wahlergebnisse</h1>
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
                <option value="0">Ansicht wählen</option>
                <option value="1">Wahlkreise</option>
                <option value="2">Gesamt</option>
              </select>
            </p>
            <div id="ed" style={{ display: display1 }}>
              <table border={1} cellPadding="5" cellSpacing="0">
                <thead></thead>
                <tbody>
                  {Object.entries(_electionDistricts).map(([ID, value]) => (
                    <>
                      <tr key={ID}> 
                        <td><h2>{(value as { name: string; nummer: string }).name} {(value as { name: string; nummer: string }).nummer}</h2></td>
                      </tr>
                      <tr>
                        <td>
                          <b>Erststimmen</b>
                          <table border={0} cellPadding="5" cellSpacing="0">
                            <thead>
                              <tr>
                                <th style={{ width: "50%" }}>Name</th>
                                <th style={{ width: "50%" }}>Stimmen</th>
                              </tr>
                            </thead>
                            <tbody>
                              {Object.entries(results_1[ID]).map(([name, value]) => (
                                <tr key={name}>
                                  <td>{name}</td>
                                  <td>{String(value)}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          <b>Zweitstimmen</b>
                          <table border={0} cellPadding="5" cellSpacing="0">
                            <thead>
                              <tr>
                                <th style={{ width: "50%" }}>Partei</th>
                                <th style={{ width: "50%" }}>Stimmen</th>
                              </tr>
                            </thead>
                            <tbody>
                              {Object.entries(results_2[ID]).map(([name, value]) => (
                                <tr key={name}>
                                  <td>{name}</td>
                                  <td>{String(value)}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>                                         
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            <div id="total" style={{ display: display2 }}>
              <h2>Parteien insgesamt</h2>
              <table border={1} cellPadding="5" cellSpacing="0">
                <thead></thead>
                <tbody>
                  {Object.entries(resultsParties).map(([name, value]) => {
                    return (
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
                            {fmt3.format(100 * Number(value) / Stimmen)}
                            </div>
                        </td>
                      </tr>
                    );
                  })}         
                </tbody>
              </table>
              <div>Stimmen: {Stimmen}</div>
            </div>
          </div>
          
        );
             
        setHtml(htmlED); // Wiederholung anfügen
        setStatus("")
      } catch (err) {
        
        console.error('Fehler beim Laden des Moduls:', err);
        setHtml (
          <div className="border">
            <h2>Wahlergebnisse</h2>
            <p>{status}</p>
          </div>
        );
      }
    };

  function getPartyBgColor(_party: string) {
    for (let i = 0; i < parties.length; i++) {
      if (parties[i].shortname === _party) {
        return parties[i].bgcolor;
      }
    }
    return "#fff"; // fallback color if not found
  }

  function getPartyColor(_party: string) {
    for (let i = 0; i < parties.length; i++) {
      if (parties[i].shortname === _party) {
        return parties[i].color;
      }
    }
    return "#000"; // fallback color if not found
  }

  fetchResults();
  }, [status, display1, display2, parties]);
  return (<div>{html}</div>);
}

export default Results;