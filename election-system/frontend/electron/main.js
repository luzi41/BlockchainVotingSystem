const { app, BrowserWindow, Menu, ipcMain} = require('electron');
const path = require('path');
const dotenv = require('dotenv');

const Store = require('electron-store');
const store = new Store();

dotenv.config({ path: path.resolve(__dirname, '../.env') });
require('dotenv').config();
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false, // wichtig!      
    },
  });

  win.loadFile(path.join(__dirname, '../build/index.html'));
}

app.whenReady().then(() => {
  createWindow();
});

ipcMain.handle('settings:get', (event, key) => {
  const value = store.get(key);
  //console.log('GET:', key, value);
  return value;
});

ipcMain.handle('settings:set', (event, key, value) => {
  //console.log('Einstellung speichern:', key, value); 
  //console.log('Store path:', store.path);
  if (value === undefined || value === null) {
    store.delete(key); // ✅ explizit löschen
  } else {
    store.set(key, value); // ✅ speichern
  }
  return true;
});