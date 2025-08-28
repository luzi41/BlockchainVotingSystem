"use client";

import { useState, useEffect } from "react";
import { fetchStatus } from "../utils/fetchStatus";

export function useElectionStatus() {
  const [title, setTitle] = useState("Blockchain Voting System");
  const [status, setStatus] = useState("");
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);
  const [provider, setProvider] = useState<any>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [electionId, setElectionId] = useState<number | null>(null);

  useEffect(() => {
    async function loadStatus() {
      setLoading(true);
      const result = await fetchStatus();
      setTitle(result.title);
      setStatus(result.status);
      setError(result.error);
      setProvider(result.provider || null);
      setAddress(result.contractAddress || null);
      setElectionId(result.electionId || null);
      setLoading(false);
    }

    loadStatus();
  }, []);

  return { title, status, error, loading, provider, address, electionId };
}
