"use client";

import { useEffect, useState } from "react";
import { Wallet } from "ethers";
import { loadTexts } from "./utils/loadTexts";
import { SettingsFormTexts } from "./types/SettingsFormTexts";
import { useAppSettings } from "./hooks/useAppSettings";

// Sichere Tauri API Imports
let invoke: ((cmd: string, args?: any) => Promise<any>) | null = null;
try {
  const tauriCore = require("@tauri-apps/api/core");
  invoke = tauriCore.invoke;
} catch {
  console.log("Tauri APIs nicht verfügbar (Web-Modus)");
}

interface SettingsProps {
  electionDistrict: string;
  availableDistricts?: string[];
}

export default function SettingsForm({
  electionDistrict,
  availableDistricts = [],
}: SettingsProps) {
  const { settings, setSettings, isTauri, loading, error } = useAppSettings(
    electionDistrict,
    "de"
  );
  const [texts, setTexts] = useState<SettingsFormTexts | null>(null);

  // Statusmeldungen (UI)
  const [status, setStatus] = useState<string>("");

  // -------- Helpers
const createNewKey = () => {
  if (!settings) return; // Safety
  const wallet = Wallet.createRandom();
  setSettings({
    ...settings,
    private_key: wallet.privateKey,
  });
};


  // -------- Initiales Laden
  useEffect(() => {
    if (settings) {
      loadTexts("settingsForm-texts", settings.language).then(setTexts);
    }
  }, [settings]);

  // -------- Speichern
  const handleSave = async () => {
    if (!settings) return;

    if (!isTauri || !invoke) {
      setStatus("🌐 Web-Modus: Speichern ist nur in der Desktop-App möglich.");
      return;
    }

    try {
      setStatus("Speichern …");

      try {
        // Variante A: Ganzes Objekt übergeben
        await invoke("update_all_settings", { newSettings: settings });
        setStatus("✅ Einstellungen gespeichert (Variante A).");
      } catch (eA) {
        console.log("Variante A fehlgeschlagen, versuche Variante B:", eA);
        // Variante B: Einzelfelder
        await invoke("update_all_settings", {
          newDistrict: settings.election_district,
          newRpcUrl: settings.rpc_url,
          newContractAddress: settings.contract_address,
          newLanguage: settings.language,
          newPrivateKey: settings.private_key,
        });
        setStatus("✅ Einstellungen gespeichert (Variante B).");
      }

      // Texte nach Speichern aktualisieren
      const updatedTexts = await loadTexts(
        "settingsForm-texts",
        settings.language
      );
      setTexts(updatedTexts);
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

      <div className="mb-4 p-2 bg-gray-100 rounded text-sm">
        <strong>Modus:</strong>{" "}
        {isTauri ? "🖥️ Tauri Desktop-App" : "🌐 Web-Browser (Speichern nicht möglich!)"}
      </div>

      {/* Sprache */}
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

      {/* Privater Schlüssel */}
      <div className="mb-4">
        <label className="block mb-1">{texts.privateKey}</label>
        <textarea
          value={settings.private_key}
          onChange={(e) =>
            setSettings({ ...settings, private_key: e.target.value })
          }
          placeholder="0x..."
          rows={4}
          className="border p-2 w-full"
        />
        {isTauri ?         
          <button
          type="button"
          onClick={createNewKey}
          className="mt-2 border px-3 py-1 rounded"
        >
          Neuen Schlüssel generieren
        </button> : ""}

      </div>

      {/* Wahlbezirk */}
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
            type="text" // 👈 als String behandeln
            value={settings.election_district}
            onChange={(e) =>
              setSettings({ ...settings, election_district: e.target.value })
            }
            className="border p-2 w-full"
          />
        )}
      </div>

      {/* RPC URL */}
      <div className="mb-4">
        <label className="block mb-1">{texts.rpcServer}</label>
        <input
          type="text"
          value={settings.rpc_url}
          onChange={(e) =>
            setSettings({ ...settings, rpc_url: e.target.value })
          }
          className="border p-2 w-full"
        />
      </div>

      {/* Contract Address */}
      <div className="mb-6">
        <label className="block mb-1">
          {texts.contractAddress ?? "Contract Address"}
        </label>
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
    </div>
  );
}
