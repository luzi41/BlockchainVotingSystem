const fs = require("fs");
const path = require("path");

const artifactsDir = path.join(__dirname, "../src/artifacts/contracts");
const publicContractsDir = path.join(__dirname, "../public/contracts");
const textsDir = path.join(__dirname, "../src/assets/texts");
const publicTextsDir = path.join(__dirname, "../public/texts");

// Zielordner anlegen
if (!fs.existsSync(publicContractsDir)) {
  fs.mkdirSync(publicContractsDir, { recursive: true });
}

if (!fs.existsSync(publicTextsDir)) {
  fs.mkdirSync(publicTextsDir, { recursive: true });
}

// Alle JSON-Dateien in public/contracts kopieren
function copyAbiFiles(dir) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach(entry => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      copyAbiFiles(fullPath);
    } else if (entry.isFile() && entry.name.endsWith(".json")) {
      fs.copyFileSync(fullPath, path.join(publicContractsDir, entry.name));
      console.log(`✅ Kopiert: ${entry.name}`);
    }
  });
}

// Alle JSON-Dateien in public/texts kopieren
function copyTextFiles(dir) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach(entry => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      copyAbiFiles(fullPath);
    } else if (entry.isFile() && entry.name.endsWith(".json")) {
      fs.copyFileSync(fullPath, path.join(publicTextsDir, entry.name));
      console.log(`✅ Kopiert: ${entry.name}`);
    }
  });
}

copyAbiFiles(artifactsDir);
copyTextFiles(textsDir);