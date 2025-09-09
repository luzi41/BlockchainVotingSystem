"use client";

import { useEffect, useState } from "react";
import tauriapi from '@tauri-apps/api';

// -------------------------
// Settings-Typ
// -------------------------
export interface AppSettings {
  election_district: string;
  rpc_url: string;
  contract_address: string;
  language: string;
  private_key: string;
}

// -------------------------
// Hook zum Laden
// -------------------------
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
        const tauriDetected = typeof window !== "undefined" && "__TAURI__" in window;
        setIsTauri(tauriDetected);

        let s: AppSettings;

        if (tauriDetected) {
          const { invoke } = await import("@tauri-apps/api/core");
                             
          s = (await invoke("get_all_settings")) as AppSettings;
        } else {
          // Web-Modus: aus localStorage oder fallback
          const stored = localStorage.getItem("app_settings");
          if (stored) {
            s = JSON.parse(stored) as AppSettings;
          } else {
            s = {
              election_district:
                process.env.NEXT_PUBLIC_ELECTION_DISTRICT || electionDistrict || "1",
              rpc_url: process.env.NEXT_PUBLIC_RPC_URL || "http://127.0.0.1:8545",
              contract_address:
                process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ||
                "0x0000000000000000000000000000000000000000",
              language: process.env.NEXT_PUBLIC_LANG || fallbackLanguage || "de",
              private_key:
                process.env.NEXT_PUBLIC_PRIVATE_KEY || "0x00000000000000000000000000000000",
            };
          }
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

// -------------------------
// Rückgabe-Typ für saveAppSettings
// -------------------------
export interface SaveSettingsResult {
  success: boolean;
  message: string;
}

// -------------------------
// Settings speichern (Tauri + Web)
// -------------------------
export async function saveAppSettings(
  settings: AppSettings
): Promise<SaveSettingsResult> {
  // Prüfen, ob wir in Tauri sind
  const isTauri =
    typeof window !== "undefined" &&
    ("__TAURI__" in window || (window as any).__TAURI_INTERNALS__);

  if (isTauri) {
    try {
      // Lazy-Import von Tauri invoke
      const { invoke } = await import("@tauri-apps/api/core");

      try {
        // Variante A: Ganzes Objekt
        await invoke("update_all_settings", { newSettings: settings });
        return { success: true, message: "✅ Einstellungen gespeichert (Variante A)" };
      } catch (eA) {
        console.warn("Variante A fehlgeschlagen, versuche Variante B:", eA);
        // Variante B: Einzelwerte
        await invoke("update_all_settings", {
          newDistrict: settings.election_district,
          newRpcUrl: settings.rpc_url,
          newContractAddress: settings.contract_address,
          newLanguage: settings.language,
          newPrivateKey: settings.private_key,
        });
        return { success: true, message: "✅ Einstellungen gespeichert (Variante B)" };
      }
    } catch (err) {
      console.error("❌ Fehler beim Speichern in Tauri:", err);
      return { success: false, message: "❌ Fehler beim Speichern in Tauri" };
    }
  } else {
    // Web-Modus: lokal speichern
    try {
      localStorage.setItem("app_settings", JSON.stringify(settings));
      return { success: true, message: "🌐 Einstellungen im Web-Modus gespeichert" };
    } catch (err) {
      console.error("❌ Fehler beim Speichern im Web-Modus:", err);
      return { success: false, message: "❌ Fehler beim Speichern im Web-Modus" };
    }
  }
}

