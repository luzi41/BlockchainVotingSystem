// scripts/copy-artifacts.js
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const HARDHAT_ARTIFACTS = path.resolve(ROOT, "../../artifacts/contracts"); // passe an falls anders
const OUT_DIR = path.resolve(ROOT, "public", "contracts");

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) copyRecursive(srcPath, destPath);
    else if (entry.isFile() && entry.name.endsWith(".json")) {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log("Copying artifacts from", HARDHAT_ARTIFACTS, "to", OUT_DIR);
copyRecursive(HARDHAT_ARTIFACTS, OUT_DIR);
console.log("Copy complete.");
