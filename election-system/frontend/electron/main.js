// V0.23.32
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require("node:path");
const fs = require("node:fs/promises");
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const Store = require('electron-store');
const store = new Store({
  defaults: {
    rpcURL: process.env.REACT_APP_RPC_URL || '',
    electionDistrict: process.env.REACT_APP_ELECTION_DISTRICT || '0',
    privateKey: process.env.REACT_APP_PRIVATE_KEY || '0'
  }
});

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });
  // Entfernt das Standardmenü
  // win.removeMenu()  

  if (process.env.ELECTRON_DEV) {
    // Electron Dev: React läuft auf localhost:3000
    win.loadURL('http://localhost:3002');
  } else {
    // Prod: React aus build laden (file://)
    win.loadFile(path.join(__dirname, '../build/index.html'));
  }
}

ipcMain.handle("load-json", async (event, relativePath) => {
  let basePath;
  if (process.env.ELECTRON_DEV) {
    // während der Entwicklung -> React public/
    basePath = path.join(__dirname, "../public");
  } else {
    // im Build -> resources/app/build
    basePath = path.join(process.resourcesPath, "app.asar", "build");
  }

  const filePath = path.join(basePath, relativePath);
  const content = await fs.readFile(filePath, "utf-8");
  return JSON.parse(content);
});

ipcMain.handle('settings:get', (event, key) => store.get(key));
ipcMain.handle('settings:set', (event, key, value) => {
    if (value === undefined || value === null) store.delete(key);
    else store.set(key, value);
    // Sende Event an alle Fenster nach Änderung
    BrowserWindow.getAllWindows().forEach(win => {
        win.webContents.send('settings-changed', {
            [key]: value
        });
    });    
    return true;
});

app.whenReady().then(createWindow);