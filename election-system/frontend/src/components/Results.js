// V 0.13.4
import React, { useState, useEffect } from "react";
import Election from "../artifacts/contracts/Election.sol/Election.json";
import { BrowserProvider, Contract} from "ethers";
import { CONTRACT_ADDRESSES } from "../config";

function Results() {
  const [status, setStatus] = useState("Die Ergebnisse folgen nach Entschlüsselung und Freigabe durch den Wahlleiter.");
  const [html, setHtml] = useState("");

  useEffect(() => {
      async function fetchResults() {
      try {
        if (!window.ethereum) {
          setStatus("MetaMask ist nicht installiert.");
          return;
        }
        const provider = new BrowserProvider(window.ethereum);
        const contract = new Contract(CONTRACT_ADDRESSES.registry, Election.abi, provider);
        const htmlContent = "";

        // Wahlbezirke abrufen und Folgendes für jeden wahlbezirk 
        // (Election.sol -> Array Wahlbezirke, Funktion Wahlbezirk hinzufügen)
        // (API -> Wahlbezirk hinzufügen)
        // Wiederholung Anfang
        const newResults = await contract.getElectionResults();
        
        setStatus("Die Ergebnisse wurden erfolgreich abgerufen: " + newResults + " Stimmen");

        const results = JSON.parse(newResults.tally);
        //const ergebnis = JSON.stringify(results);
        const wbHtmlContent = (
          <div class="border">
            <h2>Wahlergebnisse</h2>
            <p>{newResults.tally}</p>
            <p>{status}</p>
              <table border="1" cellPadding="5" cellSpacing="0">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Stimmen</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(results).map(([name, value]) => (
                    <tr key={name}>
                      <td>{name}</td>
                      <td>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>            
            
          </div>
        );
        setHtml(htmlContent + wbHtmlContent); // Wiederholung anfügen
        // Wiederholung Ende

        
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