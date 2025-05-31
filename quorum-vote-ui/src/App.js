import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESSES, PROVIDER_URL } from "./config";
import ElectionRegistry from "./contracts/ElectionRegistry.json";
import VoteLedger from "./contracts/VoteLedger.json";
import Tally from "./contracts/Tally.json";

const App = () => {
  const [provider, setProvider] = useState();
  const [signer, setSigner] = useState();
  const [registry, setRegistry] = useState();
  const [ledger, setLedger] = useState();
  const [tally, setTally] = useState();

  const [tokenInput, setTokenInput] = useState("");
  const [voteInput, setVoteInput] = useState("");
  const [results, setResults] = useState("");

  useEffect(() => {
    const init = async () => {
      const provider = new ethers.JsonRpcProvider(PROVIDER_URL);
      const signer = await provider.getSigner(0); // Für Test: erstes Konto
      setProvider(provider);
      setSigner(signer);

      const registry = new ethers.Contract(CONTRACT_ADDRESSES.registry, ElectionRegistry.abi, signer);
      const ledger = new ethers.Contract(CONTRACT_ADDRESSES.ledger, VoteLedger.abi, signer);
      const tally = new ethers.Contract(CONTRACT_ADDRESSES.tally, Tally.abi, signer);

      setRegistry(registry);
      setLedger(ledger);
      setTally(tally);
    };
    init();
  }, []);

  const registerToken = async () => {
    const hash = ethers.keccak256(ethers.toUtf8Bytes(tokenInput));
    const tx = await registry.registerToken(hash);
    await tx.wait();
    alert("Token registriert: " + hash);
  };

  const submitVote = async () => {
    const hash = ethers.keccak256(ethers.toUtf8Bytes(tokenInput));
    const tx = await ledger.submitVote(hash, voteInput);
    await tx.wait();
    alert("Stimme abgegeben");
  };

  const loadResults = async () => {
    const [resultText] = await tally.getResults();
    setResults(resultText);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h2>Online-Wahl UI (Quorum)</h2>

      <h4>🔐 Token registrieren (Admin)</h4>
      <input value={tokenInput} onChange={e => setTokenInput(e.target.value)} placeholder="Token" />
      <button onClick={registerToken}>Registrieren</button>

      <h4>🗳️ Stimme abgeben</h4>
      <textarea value={voteInput} onChange={e => setVoteInput(e.target.value)} placeholder="Verschlüsselte Stimme" />
      <button onClick={submitVote}>Abgeben</button>

      <h4>📊 Wahlergebnisse laden</h4>
      <button onClick={loadResults}>Ergebnisse abrufen</button>
      <pre>{results}</pre>
    </div>
  );
};

export default App;

