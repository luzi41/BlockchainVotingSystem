import React, { useState, useEffect } from "react";

function Results() {
  const [status, setStatus] = useState("Ergebnisse folgen nach Entschlüsselung durch Wahlleiter.");
  const [html, setHtml] = useState("");

  useEffect(() => {
      async function fetchResults() {
      try {
        const results = await import('../results/aggregated.json');
        const htmlContent = (
          <div>
            <h2>Wahlergebnisse</h2>
            <ul>
              {Object.entries(results.default).map(([name, count]) => (
                <li key={name}>
                  {name}: {count} Stimmen
                </li>
              ))}
            </ul>
          </div>
        );
        setHtml(htmlContent);
      } catch (err) {
        setStatus("❌ Fehler: " , err);
        console.error('Fehler beim Laden des Moduls:', err);
        setHtml (
          <div>
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
