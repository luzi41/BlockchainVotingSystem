// V 0.9
import React, { useState, useEffect } from "react";

function Results() {
  const [status, setStatus] = useState("Ergebnisse folgen nach Entschlüsselung durch Wahlleiter.");
  const [html, setHtml] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [tx, setTx] = useState("");
  const [signature, setSignature] = useState("");

  useEffect(() => {
      async function fetchResults() {
      try {
        const results = await import('../results/aggregated.json');
        setTx = "";
        setSignature = "";

        const htmlContent = (
          <div class="border">
            <h2>Wahlergebnisse</h2>
            <ul>
              {Object.entries(results.default).map(([name, count]) => (
                <li key={name}>
                  {name}: {count} Stimmen
                </li>
              ))}
            </ul>
            <div>Zeitstempel:{timestamp} <br />Transaction: {tx}<br />Signature: {signature}</div>
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