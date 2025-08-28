import { useState, useEffect } from "react";
import { ethers } from "ethers";

export function useElectionStatus() {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [address, setAddress] = useState<string>("");
  const [electionId, setElectionId] = useState<string>("1"); // Default ID

  useEffect(() => {
    if (typeof window === "undefined") return;

    async function initProvider() {
      const eth = window.ethereum;
      if (!eth) return;

      const prov = new ethers.BrowserProvider(eth);
      setProvider(prov);

      const signer = await prov.getSigner();
      try {
        const addr = await signer.getAddress();
        setAddress(addr);
      } catch {
        setAddress("");
      }
    }

    initProvider();
  }, []);

  return { provider, address, electionId };
}
