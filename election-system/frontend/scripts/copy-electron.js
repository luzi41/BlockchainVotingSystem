// scripts/copy-electron.js
const fs = require('fs');
const path = require('path');

// === 1. Electron-Dateien ins Build kopieren ===
const filesToCopy = ['main.js', 'preload.js'];
const sourceDir = path.resolve(__dirname, '../electron');
const destDir = path.resolve(__dirname, '../build');

filesToCopy.forEach(file => {
  const src = path.join(sourceDir, file);
  const dest = path.join(destDir, file);
  fs.copyFileSync(src, dest);
  console.log(`✔ Copied ${file} to build/`);
});

// === 2. Hilfsfunktion: rekursiv kopieren ===
function copyRecursiveSync(src, dest) {
  if (!fs.existsSync(src)) return;
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

  for (const file of fs.readdirSync(src)) {
    const srcFile = path.join(src, file);
    const destFile = path.join(dest, file);
    if (fs.lstatSync(srcFile).isDirectory()) {
      copyRecursiveSync(srcFile, destFile);
    } else {
      fs.copyFileSync(srcFile, destFile);
      console.log(`✔ copied: ${srcFile} → ${destFile}`);
    }
  }
}

// === 3. Texte normal kopieren ===
const publicDir = path.resolve(__dirname, "../public");
const buildDir = path.resolve(__dirname, "../build");

copyRecursiveSync(path.join(publicDir, "texts"), path.join(buildDir, "texts"));

// === 4. Contracts speziell behandeln ===
const contractsDir = path.join(publicDir, "contracts");
const contractsBuildDir = path.join(buildDir, "contracts");

if (fs.existsSync(contractsDir)) {
  for (const file of fs.readdirSync(contractsDir)) {
    if (file.endsWith(".json")) {
      const name = path.basename(file, ".json"); // z.B. Proposals
      const subDir = path.join(contractsBuildDir, `${name}.sol`);
      if (!fs.existsSync(subDir)) fs.mkdirSync(subDir, { recursive: true });

      const srcFile = path.join(contractsDir, file);
      const destFile = path.join(subDir, file);
      fs.copyFileSync(srcFile, destFile);
      console.log(`✔ contracts copied: ${srcFile} → ${destFile}`);
    }
  }
}
