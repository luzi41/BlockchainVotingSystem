// V0.22.15
import { useState, useEffect } from "react";
const { Wallet } = require('ethers');

function SettingsForm({ onClose }) {
  const [language, setLanguage] = useState("de");
  const [privateKey, setPrivateKey] = useState("");
  const [electionDistrict, setElectionDistrict] = useState(0);
  const [rpcURL, setRpcURL] = useState("");

  useEffect(() => {
    if (!window.electronAPI || !window.electronAPI.settings) {
      console.error("electronAPI nicht verfügbar!");
      return;
    }

    window.electronAPI.settings.get('language').then((val) => {
      if (val !== undefined && val !== null) setLanguage(val);
    });

    window.electronAPI.settings.get('privateKey').then((val) => {
      if (val !== undefined && val !== null) setPrivateKey(val);
    });

    window.electronAPI.settings.get('electionDistrict').then((val) => {
      if (val !== undefined && val !== null) setElectionDistrict(val);
    });

    window.electronAPI.settings.get('rpcURL').then((val) => {
      if (val !== undefined && val !== null) {
        setRpcURL(val);
      } else {
        setRpcURL(process.env.REACT_APP_RPC_URL);
      }
    });
  }, []);

  function handleSave(language, privateKey, electionDistrict, rpcURL) {
    if (!window.electronAPI || !window.electronAPI.settings) return;

    window.electronAPI.settings.set("language", language);
    window.electronAPI.settings.set("privateKey", privateKey);
    window.electronAPI.settings.set("electionDistrict", electionDistrict);
    window.electronAPI.settings.set("rpcURL", rpcURL);

    if (onClose) onClose(); // optional: Schließen nach Speichern
  }

  function createNewKey() {
    const wallet = Wallet.createRandom();
    setPrivateKey(wallet.privateKey);
  }

  return (
    <div className="settings">
      <h2>Einstellungen</h2>
      <div>
        <label>Sprache:</label><br />
        <select 
          value={language} 
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="de">Deutsch</option>
          <option value="en">Englisch</option>
        </select>
      </div>

      <div>
        <label>Privater Schlüssel:</label><br />
        <textarea
          value={privateKey}
          onChange={(e) => setPrivateKey(e.target.value)}
          placeholder="0x..."
          rows={4}
        /><br />
        <button onClick={createNewKey}>Neuen Schlüssel generieren</button>
      </div>

      <div>
        <label>Wahlkreis:</label><br />
        <input
          type="number"
          value={electionDistrict}
          onChange={(e) => setElectionDistrict(e.target.value)}
        />
      </div>

      <div>
        <label>RPC-Server:</label><br />
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
}

export default SettingsForm;
