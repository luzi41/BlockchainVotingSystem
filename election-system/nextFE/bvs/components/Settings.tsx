// components/Settings.tsx
"use client";

import { useEffect, useState } from "react";
import { Wallet } from "ethers";
import { loadTexts } from "./utils/loadTexts";
import { SettingsFormTexts } from "./types/SettingsFormTexts";

// Sichere Tauri API Imports mit korrekten Types
let invoke: ((cmd: string, args?: any) => Promise<any>) | null = null;
try {
  // Dynamischer Import für Tauri APIs
  const tauriCore = require("@tauri-apps/api/core");
  invoke = tauriCore.invoke;
} catch (error) {
  console.log("Tauri APIs nicht verfügbar (Web-Modus)");
}

interface SettingsProps {
  electionDistrict: string;
  availableDistricts?: string[];
}

// Muss den Rust-Struct-Namen/Feldnamen 1:1 spiegeln
export interface AppSettings {
  election_district: string;
  rpc_url: string;
  contract_address: string;
  language: string;
}

// Verbesserte Tauri-Erkennung für V2
const checkIsTauri = (): boolean => {
  if (typeof window === "undefined") return false;
  
  // Wichtig: Erst prüfen ob invoke überhaupt verfügbar ist
  if (!invoke) return false;
  
  // Methode 1: __TAURI__ global check
  if ("__TAURI__" in window) return true;
  
  // Methode 2: Tauri-spezifische APIs prüfen
  try {
    // @ts-ignore - Tauri globals
    if (window.__TAURI_INTERNALS__) return true;
  } catch {}
  
  // Methode 3: User Agent prüfen - NUR wenn invoke verfügbar ist
  if (navigator.userAgent.includes('Tauri')) return true;
  
  return false;
};

export default function SettingsForm({
  electionDistrict,
  availableDistricts = [],
}: SettingsProps) {
  const [texts, setTexts] = useState<SettingsFormTexts | null>(null);
  const [isTauri, setIsTauri] = useState<boolean | null>(null); // null = noch nicht ermittelt

  // FE-lokale (nicht persistente) Felder
  const [localLanguage, setLocalLanguage] = useState<string>("en");
  const [privateKey, setPrivateKey] = useState("");

  // Persistente (Rust) Settings
  const [settings, setSettings] = useState<AppSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<string>("");

  // -------- Helpers
  const createNewKey = () => {
    const wallet = Wallet.createRandom();
    setPrivateKey(wallet.privateKey);
  };

  // Async Tauri-Test durch invoke-Aufruf
  const testTauriConnection = async (): Promise<boolean> => {
    try {
      // Prüfe erst, ob invoke überhaupt verfügbar ist
      if (!invoke || typeof invoke !== 'function') {
        return false;
      }
      
      // Teste mit einem einfachen invoke-Aufruf
      await invoke("get_all_settings");
      return true;
    } catch (error) {
      console.log("Tauri invoke test failed:", error);
      return false;
    }
  };

  // -------- Initiales Laden
  useEffect(() => {
    let cancelled = false;

  async function init() {
    try {
      let tauriDetected = checkIsTauri();

      // Falls der erste Check negativ war, aber invoke verfügbar ist -> async testen
      if (!tauriDetected && invoke) {
        try {
          tauriDetected = await testTauriConnection();
        } catch (error) {
          console.log("Async Tauri test failed:", error);
          tauriDetected = false;
        }
      }

      let s: AppSettings;

      if (tauriDetected && invoke) {
        setIsTauri(true);
        console.log("Tauri-Modus: Lade Settings aus Rust");

        s = await invoke("get_all_settings") as AppSettings;
      } else {
        console.log("Web-Modus: Verwende Fallback-Settings");

        s = {
          language: localLanguage || process.env.NEXT_PUBLIC_LANG || "de",
          election_district:
            electionDistrict ||
            process.env.NEXT_PUBLIC_ELECTION_DISTRICT ||
            "1",
          rpc_url: process.env.NEXT_PUBLIC_RPC_URL || "http://127.0.0.1:8545",
          contract_address:
            process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ||
            "0x0000000000000000000000000000000000000000",
        };
      }

      // FE-only Defaults
      if (!cancelled) {
        setLocalLanguage(process.env.NEXT_PUBLIC_LANGUAGE || "de");
        setPrivateKey(process.env.NEXT_PUBLIC_PRIVATE_KEY || "");

        // State-Update für Settings und Texte in EINEM Schritt
        setSettings(s);
        console.log("Settings:", s);
        const t = await loadTexts("settingsForm-texts", s.language);
        setTexts(t);
      }
    } catch (err) {
      console.error("❌ Fehler beim Initialisieren der Settings:", err);
      if (!cancelled) setStatus("Fehler beim Laden der Einstellungen.");
    } finally {
      if (!cancelled) setLoading(false);
    }
  }

    init();
    
    return () => {
      cancelled = true;
    };
  }, [electionDistrict]);

  // -------- Speichern
  const handleSave = async () => {
    if (!settings) return;

    if (!isTauri || !invoke) {
      console.log("Web-Modus: Speichern nicht möglich", settings);
      setStatus("🌐 Web-Modus: Speichern ist nur in der Desktop-App möglich.");
      return;
    }

    try {
      setStatus("Speichern …");

      // ✅ Variante A: Rust erwartet ein komplettes Objekt (new_settings: AppSettings)
      try {
        await invoke("update_all_settings", { newSettings: settings });
        setStatus("✅ Einstellungen gespeichert (Variante A).");
      } catch (eA) {
        console.log("Variante A fehlgeschlagen, versuche Variante B:", eA);
        // ✅ Variante B: Rust erwartet 4 einzelne Strings
        await invoke("update_all_settings", {
          newDistrict: settings.election_district,
          newRpcUrl: settings.rpc_url,
          newContractAddress: settings.contract_address,
          newLanguage: settings.language,
        });
        setStatus("✅ Einstellungen gespeichert (Variante B).");
      }

      // 🔄 Texte nach dem Speichern mit der neuen Sprache laden
      const updatedTexts = await loadTexts("settingsForm-texts", settings.language);
      setTexts(updatedTexts);

    } catch (err) {
      console.error("❌ Fehler beim Speichern:", err);
      setStatus("❌ Fehler beim Speichern.");
    }
  };
  if (loading || !texts || !settings ) {
    return <p className="p-4">Lade Einstellungen …</p>;
  }

  return (
    <div className="settings max-w-3xl">
      <h3 className="text-xl font-semibold mb-4">{texts.settings}</h3>

      {/* Debug Info */}
      <div className="mb-4 p-2 bg-gray-100 rounded text-sm">
        <strong>Modus:</strong> {isTauri ? "🖥️ Tauri Desktop-App" : "🌐 Web-Browser"}
      </div>

      {/* Sprache (nur FE) */}
      <div className="mb-4">
        <label className="block mb-1">{texts.language}</label>
        <select
          value={settings.language}
            onChange={(e) =>
              setSettings({ ...settings, language: e.target.value })
            }
          className="border p-2 w-full"
        >
          <option value="de">Deutsch</option>
          <option value="en">English</option>
        </select>
      </div>

      {/* Privater Schlüssel (nur FE) */}
      <div className="mb-4">
        <label className="block mb-1">{texts.privateKey}</label>
        <textarea
          value={privateKey}
          onChange={(e) => setPrivateKey(e.target.value)}
          placeholder="0x..."
          rows={4}
          className="border p-2 w-full"
        />
        <button
          type="button"
          onClick={createNewKey}
          className="mt-2 border px-3 py-1 rounded"
        >
          Neuen Schlüssel generieren
        </button>
      </div>

      {/* Wahlbezirk (persistiert) */}
      <div className="mb-4">
        <label className="block mb-1">{texts.electionDistrict}</label>
        {availableDistricts.length > 0 ? (
          <select
            value={settings.election_district}
            onChange={(e) =>
              setSettings({ ...settings, election_district: e.target.value })
            }
            className="border p-2 w-full"
          >
            {availableDistricts.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        ) : (
          <input
            type="number"
            value={settings.election_district}
            onChange={(e) =>
              setSettings({ ...settings, election_district: e.target.value })
            }
            className="border p-2 w-full"
          />
        )}
      </div>

      {/* RPC URL (persistiert) */}
      <div className="mb-4">
        <label className="block mb-1">{texts.rpcServer}</label>
        <input
          type="text"
          value={settings.rpc_url}
          placeholder="http://localhost:8545"
          onChange={(e) =>
            setSettings({ ...settings, rpc_url: e.target.value })
          }
          className="border p-2 w-full"
        />
      </div>

      {/* Contract Address (persistiert) */}
      <div className="mb-6">
        <label className="block mb-1">{texts.contractAddress ?? "Contract Address"}</label>
        <input
          type="text"
          value={settings.contract_address}
          onChange={(e) =>
            setSettings({ ...settings, contract_address: e.target.value })
          }
          className="border p-2 w-full"
        />
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleSave}
          className={`px-4 py-2 rounded text-white ${
            isTauri && invoke
              ? "bg-blue-600 hover:bg-blue-700" 
              : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={!isTauri || !invoke}
        >
          Speichern
        </button>
        {status && <span className="text-sm opacity-80">{status}</span>}
      </div>

      {(!isTauri || !invoke) && (
        <p className="mt-3 text-sm opacity-75">
          Hinweis: Im Browser werden Einstellungen nicht gespeichert (read-only
          Fallback über <code>NEXT_PUBLIC_…</code>).
        </p>
      )}
    </div>
  );
}