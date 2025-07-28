const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
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

  win.loadFile(path.join(__dirname, '../build/index.html'));
}

app.whenReady().then(createWindow);

ipcMain.handle('settings:get', (event, key) => store.get(key));
ipcMain.handle('settings:set', (event, key, value) => {
  if (value === undefined || value === null) store.delete(key);
  else store.set(key, value);
  return true;
});

