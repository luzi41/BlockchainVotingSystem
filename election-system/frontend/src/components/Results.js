// V 0.18.7
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
            <h2>Wahlkreise</h2>
            <table border="1" cellPadding="5" cellSpacing="0">
              <thead></thead>
              <tbody>
                {Object.entries(_electionDistricts).map(([ID, value]) => (
                  <>
                    <tr key={ID}> 
                      <td>{value.name} {value.nummer}</td>
                    </tr>
                    <tr>
                      <td>
                        <tr><td><b>Erststimmen</b></td></tr>
                        <table border="0" cellPadding="5" cellSpacing="0">
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Stimmen</th>
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
                        <tr><td><b>Zweitstimmen</b></td></tr>
                        <table border="0" cellPadding="5" cellSpacing="0">
                          <thead>
                            <tr>
                              <th>Partei</th>
                              <th>Stimmen</th>
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