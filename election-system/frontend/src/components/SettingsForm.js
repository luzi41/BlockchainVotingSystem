// V0.22.2
import { useState, useEffect } from "react";
const ipcRenderer = window.ipcRenderer;
const { Wallet } = require('ethers');

function SettingsForm({ onClose }) {
  const [language, setLanguage] = useState("de");
  const [privateKey, setPrivateKey] = useState("");
  const [electionDistrict, setElectionDistrict] = useState(0);
  const [rdpServer, setRdpServer] = useState("");

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
    ipcRenderer.invoke('settings:get', 'rdpServer').then((val) => {
      if (val !== undefined && val !== null) {
        setRdpServer(val);
      }
      else {
        setRdpServer(process.env.REACT_APP_RPC_URL);
      }
    });      
  }, []); // ✅ Wichtig: nur einmal ausführen

  function handleSave(language, privateKey, electionDistrict, rdpServer) {
    ipcRenderer.invoke("settings:set", "language", language);
    ipcRenderer.invoke("settings:set", "privateKey", privateKey);
    ipcRenderer.invoke("settings:set", "electionDistrict", electionDistrict);
    ipcRenderer.invoke("settings:set", "rdpServer", rdpServer);
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
        <label>RDP-Server</label><br />
        <input
          type="text"
          value={rdpServer}
          name="rdpServer"
          onChange={(e) => setRdpServer(e.target.value)} />
      </div>
      <div>
        <button onClick={() => handleSave(language, privateKey, electionDistrict, rdpServer)}>Speichern</button>
      </div>
    </div>
  );
}

export default SettingsForm;
