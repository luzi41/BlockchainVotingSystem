// hooks/useAppSettings.ts
"use client";

import { useEffect, useState } from "react";


export interface AppSettings {
  election_district: string;
  rpc_url: string;
  contract_address: string;
  language: string;
  private_key: string;
}

export function useAppSettings(
  electionDistrict: string,
  fallbackLanguage: string
) {
  const [settings, setSettings] = useState<AppSettings | null>(null);
  const [isTauri, setIsTauri] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      try {
        // Desktop oder Web?
        const tauriDetected = "__TAURI__" in window;
        setIsTauri(tauriDetected);

        let s: AppSettings;
        if (tauriDetected) {
          const { invoke } = await import("@tauri-apps/api/core");
          s = (await invoke("get_all_settings")) as AppSettings;
        } else {
          s = {
            election_district:
                process.env.NEXT_PUBLIC_ELECTION_DISTRICT || 
                electionDistrict ||
                "1",
            rpc_url: 
                process.env.NEXT_PUBLIC_RPC_URL || 
                "http://127.0.0.1:8545",
            contract_address:
              process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ||
              "0x0000000000000000000000000000000000000000",
            language:
              process.env.NEXT_PUBLIC_LANG ||
              fallbackLanguage ||
              "de",
            private_key: process.env.NEXT_PUBLIC_PRIVATE_KEY || "0x00000000000000000000000000000000",
          };
        }

        if (!cancelled) setSettings(s);
      } catch (err: any) {
        console.error("❌ Fehler in useAppSettings:", err);
        if (!cancelled) setError(err.message || String(err));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    init();
    return () => {
      cancelled = true;
    };
  }, [electionDistrict, fallbackLanguage]);

  return { settings, setSettings, isTauri, loading, error };
}
