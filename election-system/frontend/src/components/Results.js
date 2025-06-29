// V 0.19.2
import { useState, useEffect } from "react";
import Election from "../artifacts/contracts/Bundestagswahl.sol/Bundestagswahl.json";
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
        const _electionDistricts = await contract.getElectionDistricts();
        const results_1 = [];
        const results_2 = [];

        for (var i = 0; i < _electionDistricts.length; i++) {
          let j = i + 1;          
          const newResult_1 = await contract.getElectionResultsDistrict1(j);
          results_1[i] = JSON.parse(newResult_1.tally);
          console.log(results_1[i]);

          const newResult_2 = await contract.getElectionResultsDistrict2(j);
          results_2[i] = JSON.parse(newResult_2.tally);
          console.log(results_2[i]);          
        }
             
        const htmlED = (
          <div>
            <h1>Wahlergebnisse</h1>
            <p>
              <select>
                <option value="1">Wahlkreise</option>
                <option value="2">Gesamt</option>
              </select>
            </p>
            <table border="1" cellPadding="5" cellSpacing="0">
              <thead></thead>
              <tbody>
                {Object.entries(_electionDistricts).map(([ID, value]) => (
                  <>
                    <tr key={ID}> 
                      <td><h2>{value.name} {value.nummer}</h2></td>
                    </tr>
                    <tr>
                      <td>
                        <b>Erststimmen</b>
                        <table border="0" cellPadding="5" cellSpacing="0">
                          <thead>
                            <tr>
                              <th width="50%">Name</th>
                              <th width="50%">Stimmen</th>
                            </tr>
                          </thead>
                          <tbody>
                            {Object.entries(results_1[ID]).map(([name, value]) => (
                              <tr key={name}>
                                <td>{name}</td>
                                <td>{value}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <b>Zweitstimmen</b>
                        <table border="0" cellPadding="5" cellSpacing="0">
                          <thead>
                            <tr>
                              <th width="50%">Partei</th>
                              <th width="50%">Stimmen</th>
                            </tr>
                          </thead>
                          <tbody>
                            {Object.entries(results_2[ID]).map(([name, value]) => (
                              <tr key={name}>
                                <td>{name}</td>
                                <td>{value}</td>
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
        );
             
        setHtml(htmlED); // Wiederholung anfügen
        setStatus("")
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