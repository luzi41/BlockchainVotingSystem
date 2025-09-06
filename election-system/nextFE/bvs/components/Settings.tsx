// components/Settings.tsx
"use client";

import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { Wallet } from "ethers";
import { loadTexts } from "./utils/loadTexts";
import { SettingsFormTexts } from "./types/SettingsFormTexts";

interface SettingsProps {
  electionDistrict: string;
  availableDistricts?: string[];
}

// Muss den Rust-Struct-Namen/Feldnamen 1:1 spiegeln
export interface AppSettings {
  election_district: string;
  rpc_url: string;
  contract_address: string;
}

const isTauri =
  typeof window !== "undefined" && "__TAURI__" in window; // sicherer Check fürs FE

export default function SettingsForm({
  electionDistrict,
  availableDistricts = [],
}: SettingsProps) {
  const [texts, setTexts] = useState<SettingsFormTexts | null>(null);

  // FE-lokale (nicht persistente) Felder
  const [language, setLanguage] = useState("de");
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

  // -------- Initiales Laden
  useEffect(() => {
    let cancelled = false;

    async function init() {
      try {
        const t = await loadTexts("settingsForm-texts");
        if (!cancelled) setTexts(t);

        if (isTauri) {
            console.log("Tauri! (56)");
          // Echte Settings aus Tauri
          const s = await invoke<AppSettings>("get_all_settings");
          if (!cancelled) setSettings(s);
        } else {
            console.log("Kein Tauri! (61)");
          // Web-Fallback (read-only)
          const fallback: AppSettings = {
            election_district:
              electionDistrict ||
              process.env.NEXT_PUBLIC_ELECTION_DISTRICT ||
              "1",
            rpc_url:
              process.env.NEXT_PUBLIC_RPC_URL || "http://127.0.0.1:8545",
            contract_address:
              process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ||
              "0x0000000000000000000000000000000000000000",
          };
          if (!cancelled) setSettings(fallback);
        }

        // FE-only Defaults
        if (!cancelled) {
          setLanguage(process.env.NEXT_PUBLIC_LANGUAGE || "de");
          setPrivateKey(process.env.NEXT_PUBLIC_PRIVATE_KEY || "");
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

    if (!isTauri) {
        console.log("Kein Tauri! (100)", settings);
        setStatus("🌐 Web-Modus: Speichern ist nur in der Desktop-App möglich.");
        return;
    }

    try {
      setStatus("Speichern …");

      // ✅ Variante A: Rust erwartet ein komplettes Objekt (new_settings: AppSettings)
      try {
        await invoke("update_all_settings", { newSettings: settings });
      } catch (eA) {
        // ✅ Variante B: Rust erwartet 3 einzelne Strings (new_district, new_rpc_url, new_contract_address)
        await invoke("update_all_settings", {
          newDistrict: settings.election_district,
          newRpcUrl: settings.rpc_url,
          newContractAddress: settings.contract_address,
        });
      }

      setStatus("✅ Einstellungen gespeichert.");
    } catch (err) {
      console.error("❌ Fehler beim Speichern:", err);
      setStatus("❌ Fehler beim Speichern.");
    }
  };

  if (loading || !texts || !settings) {
    return <p className="p-4">Lade Einstellungen …</p>;
  }

  return (
    <div className="settings max-w-3xl">
      <h3 className="text-xl font-semibold mb-4">{texts.settings}</h3>

      {/* Sprache (nur FE) */}
      <div className="mb-4">
        <label className="block mb-1">{texts.language} (nur lokal)</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="border p-2 w-full"
        >
          <option value="de">Deutsch</option>
          <option value="en">English</option>
        </select>
      </div>

      {/* Privater Schlüssel (nur FE) */}
      <div className="mb-4">
        <label className="block mb-1">{texts.privateKey} (nur lokal)</label>
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
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Speichern
        </button>
        {status && <span className="text-sm opacity-80">{status}</span>}
      </div>

      {!isTauri && (
        <p className="mt-3 text-sm opacity-75">
          Hinweis: Im Browser werden Einstellungen nicht gespeichert (read-only
          Fallback über <code>NEXT_PUBLIC_…</code>).
        </p>
      )}
    </div>
  );
}
