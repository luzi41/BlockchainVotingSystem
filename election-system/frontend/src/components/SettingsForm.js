// V0.21.8
import { useState, useEffect } from "react";
const ipcRenderer = window.ipcRenderer;
const { Wallet } = require('ethers');

function SettingsForm({ onClose }) {
  const [language, setLanguage] = useState("de");
  const [privateKey, setPrivateKey] = useState("");
  const [electionDistrict, setElectionDistrict] = useState(0);

  useEffect(() => {
    // Nur beim ersten Laden aufrufen
    ipcRenderer.invoke('settings:get', 'language').then((val) => {
      console.log('GELADEN language:', val);
      if (val !== undefined && val !== null) {
        setLanguage(val);
      }
    });
    ipcRenderer.invoke('settings:get', 'privateKey').then((val) => {
      if (val !== undefined && val !== null) {
        setPrivateKey(val);
      }
    });
    
    ipcRenderer.invoke('settings:get', 'electionDistrict').then((val) => {
      if (val !== undefined && val !== null) {
        setElectionDistrict(val);
      }
    });
      
  }, []); // ✅ Wichtig: nur einmal ausführen

  function handleSave(language, privateKey, electionDistrict) {
    ipcRenderer.invoke("settings:set", "language", language);
    ipcRenderer.invoke("settings:set", "privateKey", privateKey);
    ipcRenderer.invoke("settings:set", "electionDistrict", electionDistrict);
  }

  function createNewKey() {
    const wallet = Wallet.createRandom();
    setPrivateKey(wallet.privateKey)
  }

  return (
    <div className="settings">
      <h2>Einstellungen</h2>
      <div>
        <label>Sprache:</label><br />
        <select 
          value={language} 
          onChange={(e) => setLanguage(e.target.value)} 
          name="language">
          <option value="de">Deutsch</option>
          <option value="en">Englisch</option>
        </select>
      </div>
      <div>
        <label>Privater Schlüssel:</label><br />
        <textarea
          name="privateKey"
          value={privateKey}
          onChange={(e) => setPrivateKey(e.target.value)}
          placeholder="0x..."
          rows={4}
        /><br />
        <button onClick={() => createNewKey()}>Neuen Schlüssel generieren</button>
      </div>
      <div>
        <label>Wahlkreis</label><br />
        <input 
          type="number" 
          value={electionDistrict} 
          name="electionDistrict" 
          onChange={(e) => setElectionDistrict(e.target.value)} />
      </div>
      <div>
        <button onClick={() => handleSave(language, privateKey, electionDistrict)}>Speichern</button>
      </div>
    </div>
  );
}

export default SettingsForm;
