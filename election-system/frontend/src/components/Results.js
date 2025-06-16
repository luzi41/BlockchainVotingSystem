// V 0.13.4
import React, { useState, useEffect } from "react";
import Election from "../artifacts/contracts/Election.sol/Election.json";
import { BrowserProvider, Contract} from "ethers";
import { CONTRACT_ADDRESSES } from "../config";

function Results() {
  const [status, setStatus] = useState("Die Ergebnisse folgen nach Entschlüsselung und Freigabe durch den Wahlleiter.");
  const [html, setHtml] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [tally, setTally] = useState("");
  const [signature, setSignature] = useState("");

  useEffect(() => {
      async function fetchResults() {
      try {
        if (!window.ethereum) {
          setStatus("MetaMask ist nicht installiert.");
          return;
        }
        const provider = new BrowserProvider(window.ethereum);
        const contract = new Contract(CONTRACT_ADDRESSES.registry, Election.abi, provider);
        const results = await contract.getElectionResult();
        setStatus("Die Ergebnisse wurden erfolgreich abgerufen.");
        setTimestamp(results.timestamp);
        setTally(results.tally);
        setSignature(results.signature);
        //const results = await import('../results/aggregated.json');
        const htmlContent = (
          <div class="border">
            <h2>Wahlergebnisse</h2>
            <ul>
              {Object.entries(results.tally).map(([name, count]) => (
                <li key={name}>
                  {name}: {count} Stimmen
                </li>
              ))}
            </ul>
            <div>Zeitstempel:{timestamp} <br />Signature: {signature}</div>
          </div>
        );
        setHtml(htmlContent);
      } catch (err) {
        
        console.error('Fehler beim Laden des Moduls:', err);
        setHtml (
          <div class="border">
            <h2>Wahlergebnisse</h2>
            <p>{status}</p>
          </div>
        );
      }
    };
    fetchResults();
  }, [status]);
  return (<div>{html}</div>);
}

export default Results;