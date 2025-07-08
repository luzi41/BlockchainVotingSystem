const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '../.env') });
require('dotenv').config();

const { JsonRpcProvider, Wallet } = require('ethers');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  win.loadFile(path.join(__dirname, '../build/index.html'));
}

app.whenReady().then(() => {
  createWindow();
});

// Wallet-Setup
//console.log("PRIVATE_KEY:", process.env.REACT_APP_PRIVATE_KEY);
const PRIVATE_KEY = process.env.REACT_APP_PRIVATE_KEY?.trim();

if (!PRIVATE_KEY || !PRIVATE_KEY.startsWith("0x") || PRIVATE_KEY.length !== 66) {
  throw new Error("Ungültiger Private Key in .env-Datei.");
}

const provider = new JsonRpcProvider(process.env.REACT_APP_RPC_URL);
const wallet = new Wallet(PRIVATE_KEY, provider);

// IPC-Handler für Transaktionen
ipcMain.on('send-eth', async (event, data) => {
  try {
    const tx = await wallet.sendTransaction({
      to: data.to,
      value: ethers.utils.parseEther(data.value)
    });

    console.log("Tx gesendet:", tx.hash);
    event.reply('tx-response', tx.hash);
  } catch (err) {
    console.error(err);
    event.reply('tx-response', "Fehler: " + err.message);
  }
});
