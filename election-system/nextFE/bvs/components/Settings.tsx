// V0.29.6
"use client";
import { useState, useEffect } from "react";
import { loadTexts } from "./utils/loadTexts";
import { Contract, Wallet } from "ethers";
import { useElectionStatus } from "./hooks/useElectionStatus";
import { SettingsFormTexts } from "./types/SettingsFormTexts";
import forge from "node-forge";

interface VoteFormProps {
  electionDistrict: string;
  availableDistricts?: string[];
}

const isElectron =
  typeof navigator !== "undefined" &&
  navigator.userAgent.toLowerCase().includes("electron");

export default function SettingsForm({ electionDistrict, availableDistricts = [] }: VoteFormProps) {
    const { Wallet } = require('ethers');
    const [language, setLanguage] = useState("de");
    const [texts, setTexts] = useState<SettingsFormTexts | null>(null);
    const [privateKey, setPrivateKey] = useState("");
    const [rpcURL, setRpcURL] = useState("");
    const [electionDistrictNo, setElectionDistrictNo] = useState<string>(electionDistrict); 

    function handleSave(language: string, privateKey: string, electionDistrict: string, rpcURL: string) {
        if (!window.electronAPI || !window.electronAPI.settings) return;

        window.electronAPI.settings.set("language", language);
        window.electronAPI.settings.set("privateKey", privateKey);
        window.electronAPI.settings.set("electionDistrict", electionDistrict);
        window.electronAPI.settings.set("rpcURL", rpcURL);

        //if (onClose) onClose(); // optional: Schließen nach Speichern
    }

    function createNewKey() {
        const wallet = Wallet.createRandom();
        setPrivateKey(wallet.privateKey);
    }

    useEffect(() => {
        if (!window.electronAPI || !window.electronAPI.settings) return;

        window.electronAPI.settings.get('language').then((val) => {
            if (val !== undefined && val !== null) setLanguage(String(val));
        });

        window.electronAPI.settings.get('privateKey').then((val) => {
            if (val !== undefined && val !== null) setPrivateKey(String(val));
        });

        window.electronAPI.settings.get('electionDistrict').then((val) => {
            if (val !== undefined && val !== null) setElectionDistrictNo(String(val));
        });

        window.electronAPI.settings.get('rpcURL').then((val) => {
            if (val !== undefined && val !== null) {
                setRpcURL(String(val));
            } else {
                setRpcURL(String(process.env.NEXT_PUBLIC_RPC_URL));
            }
        });


    }, []);

    useEffect(() => {
        async function fetchData() {
            try {
                // 🗣 Texte laden
                const _texts = await loadTexts("settingsForm-texts");
                setTexts(_texts);

                let _electionDistrict: string = electionDistrict;

                if (isElectron) {
                    const ipc = window.electronAPI;
                    if (!ipc) return;
                    const ed = await ipc.settings.get("electionDistrict");
                    _electionDistrict = ed ? String(ed) : electionDistrict;
                } else {
                    _electionDistrict = electionDistrict || process.env.NEXT_PUBLIC_ELECTION_DISTRICT || "";
                    setElectionDistrictNo(_electionDistrict);
                }              
            } catch (error) {
                console.error("❌ Fehler beim Laden der Texte:", error);
            }
        }
        fetchData();
    }, [electionDistrict]);
    

    if (!texts) return <p>Load texts ...</p>;

    const settingsElectron = (
        <div className="settings">
            <h3>{texts.settings}</h3>
            <div>
            <label>{texts.language}:</label><br />
            <select 
                value={language} 
                onChange={(e) => setLanguage(e.target.value)}
            >
                <option value="de">Deutsch</option>
                <option value="en">English</option>
            </select>
            </div>

            <div>
            <label>{texts.privateKey}:</label><br />
            <textarea
                value={privateKey}
                onChange={(e) => setPrivateKey(e.target.value)}
                placeholder="0x..."
                rows={4}
            /><br />
            <button onClick={createNewKey}>Neuen Schlüssel generieren</button>
            </div>

            <div>
            <label>{texts.electionDistrict}:</label><br />
            <input
                type="number"
                value={electionDistrictNo}
                onChange={(e) => setElectionDistrict(e.target.value)}
            />
            </div>

            <div>
            <label>{texts.rpcServer}:</label><br />
            <input
                type="text"
                value={rpcURL}
                placeholder="http://localhost:8545"
                onChange={(e) => setRpcURL(e.target.value)}
            />
            </div>

            <div>
            <button onClick={() => handleSave(language, privateKey, electionDistrict, rpcURL)}>
                Speichern
            </button>
            </div>
        </div>
    );

    const webVersion = (
    <div>
        <h3>{texts.settings}</h3>
        <p>(read only)</p>
        <table>
        <tbody>
            <tr>
            <td>{texts.privateKey}:</td>
            <td>{process.env.NEXT_PUBLIC_PRIVATE_KEY}</td>
            </tr>
            <tr>
            <td>{texts.electionDistrict}:</td>
            <td>{electionDistrictNo}</td>
            </tr>
            <tr>
            <td>{texts.rpcServer}:</td>
            <td>{process.env.NEXT_PUBLIC_RPC_URL}</td>
            </tr>
        </tbody>
        </table>
    </div>
    );

    return window.electronAPI?.invoke ? settingsElectron : webVersion;

}