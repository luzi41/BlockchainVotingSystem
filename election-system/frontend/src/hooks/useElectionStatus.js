// src/hooks/useElectionStatus.js
import { useState, useEffect } from "react";
import { fetchStatus } from "../utils/fetchStatus";

export function useElectionStatus() {
  const [title, setTitle] = useState("Blockchain Voting System");
  const [status, setStatus] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [provider, setProvider] = useState(null);
  const [address, setAddress] = useState(null);
  const [electionId, setElectionId] = useState(null);

  useEffect(() => {
    async function loadStatus() {
        setLoading(true);
        const result = await fetchStatus();
        setTitle(result.title);
        setStatus(result.status);
        setError(result.error);
        setLoading(false);
        setProvider(result.provider || null);
        setAddress(result.contractAddress || null);
        setElectionId(result.electionId || null);
    }
    loadStatus();
  }, []);

  return { title, status, error, loading, provider, address, electionId };
}
