import { useState, useEffect } from "react";
const ipcRenderer = window.ipcRenderer;

function SettingsForm({ onClose }) {
  const [language, setLanguage] = useState("de");
  const [privateKey, setPrivateKey] = useState("");

  useEffect(() => {
    // Nur beim ersten Laden aufrufen
    ipcRenderer.invoke('settings:get', 'language').then((val) => {
      console.log('GELADEN language:', val);
      if (val !== undefined && val !== null) {
        setLanguage(val);
      }
    });
    ipcRenderer.invoke('settings:get', 'privateKey').then((val) => {
      console.log('GELADEN privateKey:', val);
      if (val !== undefined && val !== null) {
        setPrivateKey(val);
      }
    });
  }, []); // ✅ Wichtig: nur einmal ausführen

  function handleSave(language, privateKey) {
    console.log("Speichern:", language, privateKey);
    ipcRenderer.invoke("settings:set", "language", language);
    ipcRenderer.invoke("settings:set", "privateKey", privateKey);
  }

  return (
    <div className="settings">
      <h2>Einstellungen</h2>
      <div>
        <label>Sprache:</label>
      </div>
      <div>
        <select 
          value={language} 
          onChange={(e) => setLanguage(e.target.value)} 
          name="language">
          <option value="de">Deutsch</option>
          <option value="en">Englisch</option>
        </select>
      </div>
      <div>
        <label>Privater Schlüssel:</label>
      </div>
      <div>
        <textarea
          name="privateKey"
          value={privateKey}
          onChange={(e) => setPrivateKey(e.target.value)}
          placeholder="0x..."
          rows={4}
        />
      </div>
      <div>
        <button onClick={() => handleSave(language, privateKey)}>Speichern</button>
      </div>
    </div>
  );
}

export default SettingsForm;
