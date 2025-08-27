// V 0.26.14
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { loadAbi } from "../utils/loadAbi";
import { useElectionStatus } from "../hooks/useElectionStatus"; 
import { Contract} from "ethers";

function Signature() {
    const { provider, address, electionId } = useElectionStatus();  // 👈 Hook nutzen
    const [html, setHtml] = useState("");

    let { ed } = useParams();
    if (isNaN(ed)) // muss sein: "nicht in Wahlkreisen vorhanden"
    {
    ed = 1;
    }

    let { id } = useParams();
    if (isNaN(id)) // muss sein: "nicht in Stimmen vorhanden"
    {
    id = 1;
    }

    useEffect(() => {
        if (!provider || !address || !electionId) return;        
        async function fetchResults() {
            try {
                // 🧠 ABI laden
                const abiJson = await loadAbi();                
 
                const contract = new Contract(address, abiJson.abi, provider);

                let newResult = {};
                
                if (id === "1") {
                    newResult = await contract.getElectionResultsDistrict1(electionId, ed);
                }
                else if (id === "2"){
                    newResult = await contract.getElectionResultsDistrict2(electionId, ed);
                }
                else {
                    throw new Error("Ungültige Anfrage!");
                }
            
                if (!newResult[0] === "") return ("Load data...");

                const htmlEl = (
                    <div>
                        <h2>Signature</h2>
                        <form>
                            <div>Daten Wahlkreis {ed} - Stimme {id}<br />
                                <textarea
                                    readOnly="1"
                                    rows={4}
                                    cols={60}
                                    value={newResult[0]}
                                />
                            </div>                       
                            <div>
                                <label htmlFor="Signature">Signature</label><br />
                                <textarea
                                    id="Signature"
                                    readOnly="1"
                                    rows={10}
                                    cols={60}
                                    value={newResult[2]} 
                                />
                            </div>
                            <div>
                                <label htmlFor="PublicKey">Public Key</label><br />
                                <textarea
                                    id="PublicKey"
                                    readOnly="1"
                                    rows={10}
                                    cols={60}
                                    value="
`-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzySURgrOWXJv9H2bCvE2
AgP0A9C5YqI4bATqaae6UxDsu0JajSx40m0Trg8zoJnYszvUSG/Z6/4sFvTvXuxb
4F+kIjTQSHmkgjW1gYK/k55MddG0kjF/ZH8T0pXNCozTRmyp315vuPrB+0TDD+RP
uK+HllSkZ+iPI3ddR6cGDNgKLMCUfJKvF91nrx/9ZBl3ZbW6Kla/5qO1BLURo1JS
hIq3K40khk+wwIkyPAeP0LLaPCw9RHyQzeFTevYN9zTYPvFuP2WDnlPXCefzzqA0
XTxWcBGvMDH4qcXq86cPAPeuyiCrvrJWClHxgHlASLM50dLKxkI2XIvx8/Cd+gls
iQIDAQAB
-----END PUBLIC KEY-----`                                    
                                    "       
                                />
                            </div>
                        </form>
                    </div>
                );
                setHtml(htmlEl);
            } catch (error) {
                console.error(error);
                setHtml(error);
            }

        }
        fetchResults();
    },[provider, address, electionId]);

    return (<div>{html}</div>);
}

export default Signature;