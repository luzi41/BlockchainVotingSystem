const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  settings: {
    get: async (key) => ipcRenderer.invoke("settings-get", key),
    set: async (key, value) => ipcRenderer.invoke("settings-set", key, value),
    onChanged: (callback) => ipcRenderer.on("settings-changed", (event, data) => callback(data)),
  },
  loadJson: async (relativePath) => ipcRenderer.invoke("load-json", relativePath),
});
