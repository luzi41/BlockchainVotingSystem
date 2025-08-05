const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  settings: {
    get: (key) => ipcRenderer.invoke('settings:get', key),
    set: (key, value) => ipcRenderer.invoke('settings:set', key, value),
  },
  invoke: (channel, ...args) => ipcRenderer.invoke(channel, ...args),
  /*
  readJson: (relativePath) => {
    try {
      // __dirname = electron/ Ordner, von da aus zur build/texts/... navigieren
      const filePath = path.join(__dirname, '../build', relativePath);
      const content = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(content);
    } catch (err) {
      console.error('Fehler beim Lesen der JSON-Datei:', err);
      return null;
    }
  }
  */ 
});