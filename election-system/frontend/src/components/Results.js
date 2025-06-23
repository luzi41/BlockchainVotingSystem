// V 0.15.4
import React, { useState, useEffect } from "react";
import Election from "../artifacts/contracts/Election.sol/Election.json";
import { BrowserProvider, Contract} from "ethers";
import { CONTRACT_ADDRESSES } from "../config";

function Results() {
  const [status, setStatus] = useState("Die Ergebnisse folgen nach Entschlüsselung und Freigabe durch den Wahlleiter.");
  const [html, setHtml] = useState("");
  //const [electionDistricts, setElectionDistricts] = useState("");
  
  useEffect(() => {
      async function fetchResults() {
      try {
        if (!window.ethereum) {
          setStatus("MetaMask ist nicht installiert.");
          return;
        }
        const provider = new BrowserProvider(window.ethereum);
        const contract = new Contract(CONTRACT_ADDRESSES.registry, Election.abi, provider);
        //const htmlContent = "";

        // Wahlbezirke abrufen und Folgendes für jeden wahlbezirk 
        // (Election.sol -> Array Wahlbezirke, Funktion Wahlbezirk hinzufügen)
        // (API -> Wahlbezirk hinzufügen)
        // Wiederholung Anfang

        const _electionDistricts = await contract.getElectionDistricts();
        const results = [];
        for (var i = 0; i < 3; i++) {
          let j = i + 1;
          const newResult = await contract.getElectionResultsDistrict(j);
          results[i] = JSON.parse(newResult.tally);          
        }
        const tblResults = (
          <>
            {results.map((results) =>
              Object.entries(results).map(([name, stimmen]) => (
                <tr key={name}><td>{name}</td><td>{stimmen}</td></tr>
              ))
            )}
          </>
        );     
        const htmlED = (
          <div>
            <h2>Wahlkreise</h2>
            <table border="1" cellPadding="5" cellSpacing="0">
              <thead>

              </thead>
              <tbody>
                {Object.entries(_electionDistricts).map(([ID, value]) => (
                  <>
                    <tr key={ID}> 
                      <td><a href="#" onclick="javascript:window.open('Hallo')">{value.name} {value.nummer}</a></td>
                    </tr>
                    <tr>
                      <td>
                        <table border="0" cellPadding="5" cellSpacing="0">
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Stimmen</th>
                            </tr>
                          </thead>
                          <tbody>
                            {tblResults}
                          </tbody>
                        </table>                           
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table> 
            {status}
          </div>           
        );
        
        //setElectionDistricts(htmlED);
        
        setHtml(htmlED); // Wiederholung anfügen
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