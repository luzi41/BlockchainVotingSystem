// V 0.21.3
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Election from "../artifacts/contracts/Bundestagswahl.sol/Bundestagswahl.json";
//import { CONTRACT_ADDRESSES } from "../config";
import { JsonRpcProvider, Contract} from "ethers";

function Signature() {
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

    const provider = new JsonRpcProvider(process.env.REACT_APP_RPC_URL);
    const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS; 
    const contract = new Contract(contractAddress, Election.abi, provider);

    useEffect(() => {
        async function fetchResults() {
            try {
                
                let newResult = {};
                
                if (id === "1") {
                    newResult = await contract.getElectionResultsDistrict1(ed);
                }
                else if (id === "2"){
                    newResult = await contract.getElectionResultsDistrict2(ed);
                }
                else {
                    throw "Ungültige Anfrage!";
                }
                
                const htmlEl = (
                    <div>
                        <h2>Signature</h2>
                        <form>
                            <div>Daten Wahlkreis {ed} - Stimme {id}<br />
                                <textarea
                                    readOnly="1"
                                    rows={4}
                                    cols={60}
                                    value={newResult.tally}
                                />
                            </div>                       
                            <div>
                                <label for="Signature">Signature</label><br />
                                <textarea
                                    id="Signature"
                                    readOnly="1"
                                    rows={10}
                                    cols={60}
                                    value={newResult.signature} 
                                />
                            </div>
                            <div>
                                <label for="PublicKey">Public Key</label><br />
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
                setHtml(error);
            }

        }
        fetchResults();
    },[ed, id]);

    return (<div>{html}</div>);
}

export default Signature;