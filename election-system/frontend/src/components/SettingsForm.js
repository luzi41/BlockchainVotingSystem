// V0.26.13
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { loadTexts } from "../utils/loadTexts";

const { Wallet } = require('ethers');

function SettingsForm({ onClose }) {

  const [language, setLanguage] = useState("de");
  const [texts, setTexts] = useState(null);
  const [privateKey, setPrivateKey] = useState("");
  const [electionDistrict, setElectionDistrict] = useState(0);
  const [rpcURL, setRpcURL] = useState("");
  const { ed } = useParams();
  const [electionDistrictNo] = useState(() => {
      return isNaN(ed) ? process.env.REACT_APP_ELECTION_DISTRICT : ed;
  });  

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

  useEffect(() => {
    if (!window.electronAPI || !window.electronAPI.settings) return;

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

  useEffect(() => {
    async function fetchData() {
      try {
        // 🗣 Texte laden
        const _texts = await loadTexts("settingsForm-texts");
        setTexts(_texts);
      } catch (error) {
        console.error("❌ Fehler beim Laden der Texte:", error);
      }
    }
    fetchData();
  }, []);
  
  if (!texts) return <p>Load data ...</p>;
  const settingsElectron = (
    <div className="settings">
      <h2>{texts.settings}</h2>
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
          value={electionDistrict}
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
      <h2>{texts.settings}</h2>
      <table>
        <tbody>
          <tr>
            <td>{texts.privateKey}:</td>
            <td>{process.env.REACT_APP_PRIVATE_KEY}</td>
          </tr>
          <tr>
            <td>{texts.electionDistrict}:</td>
            <td>{electionDistrictNo}</td>
          </tr>
          <tr>
            <td>{texts.rpcServer}:</td>
            <td>{process.env.REACT_APP_RPC_URL}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
  
  return window.electronAPI?.invoke ? settingsElectron : webVersion;
}

export default SettingsForm;
