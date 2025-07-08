const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    send: (channel, data) => ipcRenderer.send(channel, data),
    once: (channel, func) => ipcRenderer.once(channel, (event, ...args) => func(event, ...args))
  }
});