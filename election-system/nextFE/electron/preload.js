const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  settings: {
    get: (key) => ipcRenderer.invoke("settings-get", key),
    set: (key, value) => ipcRenderer.invoke("settings-set", key, value),
  },
  onSettingsChanged: (callback) => ipcRenderer.on("settings-changed", callback),
});
