import { useState, useEffect } from "react";
import forge from "node-forge";
import Election from "../artifacts/contracts/Election.sol/Election.json";
import { BrowserProvider, Contract} from "ethers";
import { CONTRACT_ADDRESSES } from "../config";

const ethers = require("ethers");

const PUBLIC_KEY_PEM = 
`-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAwWobK2Oyv07u06MZ21yh
zO+9FmxZVprO9g18scB8BVPffPm/cnvgR7q77mPvWXFrw5Ot93vifQ5RtWQrB7wX
8Xx4sAeDvlaelv1cQs8fg/ZjrJXZCWU7vb8t0FHM0brottRcbHo6ssC81R2PDjd4
fT0X1wksU7kxrpu2yXWJFiZGiQNPQrpTao3AIYzMmpy+jSBYjj0CksGo+F7zsuhE
8JXTrV2LDqWtbFw/Bjp58Qwni7ZCS/Ou6zhjS4BPUsYUksbwQAnc8P9xnWFQvz35
ZlmojpG07UUU4HIWH3O/dwUqrIan6sctCS/3gVfGkppiUazaLKQIt4EQwOxSOsHs
20yL5Bbii8aIcnsHdfXR8ltdtndq3ulx2RmVmDygnsBv7q0b8NkMUx+mdrS8tztH
FxScoAG/CuhcrS4w/lMQ5SRjYDIgIifsqO0Ycqa9gL7TRsNht5ya7K92iaxJdEqW
gY8AlsNEGP2tjLCRTNBUWDsbvB5Tf/T26hvm3ATnCnf2kVWMYxJruLU03/dkGW9U
/1dsFKPVKqxdMoXZsN7XaApKOfwlGgMp5ddf6XamtruiNtSDG5blrmsMeg46VUN3
X7BguShEOf91qazxL7nSJzu0ugkT2e9ipDnpu+gb3wFkUCEmlbNdqpudi28tyukk
gFGttiixxpZRLwZyT3Vlg00CAwEAAQ==
-----END PUBLIC KEY-----`;

const encryptVote = (candidateId) => {
  const pubKey = forge.pki.publicKeyFromPem(PUBLIC_KEY_PEM);
  const encrypted = pubKey.encrypt(candidateId.toString(), "RSA-OAEP");
  return forge.util.encode64(encrypted);
};


function VoteForm() {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [error, setError] = useState("");
  const [tokenInput, setTokenInput] = useState("");


  useEffect(() => {
    async function fetchCandidates() {
        
        try {
          if (window.ethereum) {
            const provider = new BrowserProvider(window.ethereum);
            const contract = new Contract(CONTRACT_ADDRESSES.registry, Election.abi, provider);
            const candidatesList = await contract.getCandidates();
            setCandidates(candidatesList);
          }
       }
        catch (error) {
            console.error("Fehler beim Abrufen der Kandidaten:", error);
        }        
    }
    fetchCandidates();
  }, []);

  /*
   * Stimmabgabe über API!!!
   *
  const vote = async (candidateId) => {
    const encrypted = encryptVote(candidateId);
    await fetch("http://localhost:3001/vote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ encryptedVote: encrypted }),
    });
    alert("Stimme abgegeben!");
  };
  */

  const vote = async () => {
      
    if (!window.ethereum) return alert("MetaMask erforderlich!");

    try {
      const provider = new BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESSES.registry, Election.abi, signer);
      const encrypted = encryptVote(selectedCandidate);
      const tx = await contract.castEncryptedVote(selectedCandidate, tokenInput);
      await tx.wait();
      console.log(tx.data);
      
      setError("✅ Erfolgreich! Transaction: " + tx.hash); 

    } catch (err) {
        setError("❌ Fehler: " + err.message);
    }
  } ;

  return (
    <div>
      <h2>Stimme abgeben</h2>
      <select onChange={(e) => setSelectedCandidate(e.target.value)}>
        <option value="">Wähle einen Kandidaten</option>
        {candidates.map((candidate, index) => (
          <option key={index} value={index} name="candidate">
            {candidate.name}
          </option>
        ))}
      </select>
      <input type="text" placeholder="Token" name="token" value={tokenInput} onChange={(e) => setTokenInput(e.target.value)}></input>
      <button onClick={vote} disabled={!selectedCandidate || !tokenInput}>Abstimmen</button>
      <p>{error}</p>
    </div>
  );
}

export default VoteForm;
