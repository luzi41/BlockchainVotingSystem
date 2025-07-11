import { useState, useEffect } from "react";
const ipcRenderer = window.ipcRenderer;

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
        />
      </div>
      <div>
        <label>Wahlkreis:</label><br />
        <input 
          type="number" 
          size={3} 
          value={electionDistrict}
          onChange={(e) => setElectionDistrict(e.target.value)}
          name="electionDistrict" 
        />
      </div>
      
      <div>
        <button onClick={() => handleSave(language, privateKey, electionDistrict)}>Speichern</button>
      </div>
    </div>
  );
}

export default SettingsForm;
