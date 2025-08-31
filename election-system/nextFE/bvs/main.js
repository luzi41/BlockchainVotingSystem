const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { spawn } = require("child_process");
const isDev = process.env.NODE_ENV !== "production";
const fs = require("node:fs/promises");
const dotenv = require("dotenv");
dotenv.config({ path: path.resolve(__dirname, "../frontend/.env") });

const Store = require("electron-store").default;
const store = new Store({
  defaults: {
    rpcURL: process.env.REACT_APP_RPC_URL || "",
    electionDistrict: process.env.REACT_APP_ELECTION_DISTRICT || "0",
    privateKey: process.env.REACT_APP_PRIVATE_KEY || "0",
  },
});

let mainWindow;
let nextProcess;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  const port = isDev ? 3040: 3035;
  /*
  const nextCommand = isDev ? ["next", "dev", "-p", port] : ["next", "start", "-p", port];

  nextProcess = spawn("npx", nextCommand, {
    cwd: __dirname,
    shell: true,
    stdio: "inherit",
  });
  */
  // Lade URL, warte kurz auf Serverstart
  const url = `http://localhost:${port}`;
  setTimeout(() => {
    mainWindow.loadURL(url).catch((err) => {
      console.error("Fehler beim Laden der URL:", err);
    });
  }, 3000);

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

// --- IPC Handler ---
ipcMain.handle("settings-get", (event, key) => store.get(key));
ipcMain.handle("settings-set", (event, key, value) => {
  if (value === undefined || value === null) store.delete(key);
  else store.set(key, value);

  // Broadcast an alle Fenster
  BrowserWindow.getAllWindows().forEach((win) => {
    win.webContents.send("settings-changed", { [key]: value });
  });

  return true;
});

ipcMain.handle("load-json", async (event, relativePath) => {
  let basePath;
  if (isDev) {
    basePath = path.join(__dirname, "../public");
  } else {
    basePath = path.join(process.resourcesPath, "app.asar", "build");
  }

  const filePath = path.join(basePath, relativePath);
  const content = await fs.readFile(filePath, "utf-8");
  return JSON.parse(content);
});

// --- App Events ---
app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (nextProcess) nextProcess.kill();
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (!mainWindow) createWindow();
});