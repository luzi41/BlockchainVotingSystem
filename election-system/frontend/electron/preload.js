// preload.js
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  loadJson: (relativePath) => ipcRenderer.invoke("load-json", relativePath),
  settings: {
    get: (key) => ipcRenderer.invoke("settings:get", key),
    set: (key, value) => ipcRenderer.invoke("settings:set", key, value),
  },
  invoke: (channel, ...args) => ipcRenderer.invoke(channel, ...args),

  // Sichere Version: fragt den Pfad beim Main-Prozess ab
  // getPublicFile: (relativePath) => ipcRenderer.invoke("get-public-file", relativePath),
});
