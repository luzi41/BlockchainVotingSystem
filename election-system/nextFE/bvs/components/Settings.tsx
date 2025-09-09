"use client";

import { useEffect, useState } from "react";
import { Wallet } from "ethers";
import { loadTexts } from "./utils/loadTexts";
import { SettingsFormTexts } from "./types/SettingsFormTexts";
import { useAppSettings, saveAppSettings, AppSettings } from "./hooks/useAppSettings";
import { useLanguage } from "./contexts/LanguageContext"; // 👈 wichtig!

interface SettingsProps {
  electionDistrict: string;
  availableDistricts?: string[];
}

export default function SettingsForm({
  electionDistrict,
  availableDistricts = [],
}: SettingsProps) {
  const { language, setLanguage } = useLanguage();
  const { settings, setSettings, isTauri, loading, error } = useAppSettings(
    electionDistrict,
    "de"
  );
  const [texts, setTexts] = useState<SettingsFormTexts | null>(null);
  const [status, setStatus] = useState<string>("");

  // -------- Helpers
  const createNewKey = () => {
    if (!settings) return;
    const wallet = Wallet.createRandom();
    setSettings({ ...settings, private_key: wallet.privateKey });
  };

  const handleSave = async () => {
    if (!settings) return;
    const result = await saveAppSettings(settings);
    setStatus(result.message);

    if (result.success) {
      const updatedTexts = await loadTexts("settingsForm-texts", settings.language);
      setTexts(updatedTexts);
    }
  };

  // -------- Initiales Laden
  useEffect(() => {
    if (settings) {
      loadTexts("settingsForm-texts", language).then(setTexts);
    }
  }, [language, settings]);

  if (loading || !texts || !settings) {
    return <p className="p-4">Lade Einstellungen …</p>;
  }

  return (
    <div className="settings max-w-3xl">
      <h3 className="text-xl font-semibold mb-4">{texts.settings}</h3>

      <div className="mb-4 p-2 bg-gray-100 rounded text-sm">
        <strong>Modus:</strong>{" "}
        {isTauri ? "🖥️ Tauri Desktop-App" : `🌐 Web-Browser (${texts.onlyLocalSave})`}
      </div>

      {/* Sprache */}
      <div className="mb-4">
        <label className="block mb-1">{texts.language}</label>
        <select
        value={language}
        onChange={async (e) => {
            const newLang = e.target.value as AppSettings["language"];

            // 1️⃣ Context sofort updaten → UI reagiert direkt
            setLanguage(newLang as "de" | "en");            
            
            // 1️⃣ State sofort updaten → UI reagiert direkt
            setSettings({ ...settings, language: newLang });

            // 2️⃣ Texte direkt laden, damit UI sofort die neue Sprache zeigt
            const updatedTexts = await loadTexts("settingsForm-texts", newLang);
            setTexts(updatedTexts);

            // 3️⃣ Speichern asynchron (optional)
            saveAppSettings({ ...settings, language: newLang }).then((result) => {
            setStatus(result.message);
            });
        }}
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
        {isTauri && (
          <button
            type="button"
            onClick={createNewKey}
            className="mt-2 border px-3 py-1 rounded"
          >
            Neuen Schlüssel generieren
          </button>
        )}
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
            type="text"
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
          onChange={(e) => setSettings({ ...settings, rpc_url: e.target.value })}
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
            isTauri
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={!isTauri}
        >
          Speichern
        </button>
        {status && <span className="text-sm opacity-80">{status}</span>}
      </div>
    </div>
  );
}
