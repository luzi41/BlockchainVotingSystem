// components/utils/settings.ts

// Muss den Rust-Struct-Namen/Feldnamen 1:1 spiegeln
export interface AppSettings {
  election_district: string;
  rpc_url: string;
  contract_address: string;
  language: string;
  private_key: string;
}

// Sichere Tauri API Imports
let invoke: ((cmd: string, args?: any) => Promise<any>) | null = null;
try {
  const tauriCore = require("@tauri-apps/api/core");
  invoke = tauriCore.invoke;
} catch {
  // kein Tauri verfügbar
}

export const checkIsTauri = (): boolean => {
  if (typeof window === "undefined") return false;
  if (!invoke) return false;

  if ("__TAURI__" in window) return true;

  try {
    // @ts-ignore
    if (window.__TAURI_INTERNALS__) return true;
  } catch {}

  if (navigator.userAgent.includes("Tauri")) return true;

  return false;
};

export const testTauriConnection = async (): Promise<boolean> => {
  try {
    if (!invoke) return false;
    await invoke("get_all_settings");
    return true;
  } catch {
    return false;
  }
};

export const loadAppSettings = async (
  electionDistrict: string,
  localLanguage = "de"
): Promise<{ settings: AppSettings; isTauri: boolean }> => {
  let tauriDetected = checkIsTauri();

  if (!tauriDetected && invoke) {
    tauriDetected = await testTauriConnection();
  }

  let settings: AppSettings;

  if (tauriDetected && invoke) {
    settings = (await invoke("get_all_settings")) as AppSettings;
  } else {
    settings = {
        language: localLanguage || process.env.NEXT_PUBLIC_LANG || "de",
        election_district:
        electionDistrict ||
        process.env.NEXT_PUBLIC_ELECTION_DISTRICT ||
        "1",
        rpc_url: process.env.NEXT_PUBLIC_RPC_URL || 
            "http://127.0.0.1:8545",
        contract_address:
        process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ||
        "0x0000000000000000000000000000000000000000",
        private_key: process.env.NEXT_PUBLIC_PRIVATE_KEY || 
            "0x00000000000000000000000000000000",
    };
  }

  return { settings, isTauri: tauriDetected };
};
