const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const buildDir = path.resolve(__dirname, "../build");
const distDir = path.resolve(__dirname, "../dist");

// Dateien, die auf jeden Fall da sein müssen
const mustHaveFiles = [
  "texts/start-texts.de.json",
  "contracts/Proposals.sol/Proposals.json"
];

// ✅ Schritt 1: Existenzcheck im Build-Ordner
console.log("🔍 Checking build directory...");
mustHaveFiles.forEach(relPath => {
  const filePath = path.join(buildDir, relPath);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Missing in build/: ${relPath}`);
    process.exit(1);
  } else {
    console.log(`✔ Found: ${relPath}`);
  }
});

// ✅ Schritt 2: JSON-Validierung
console.log("\n🔍 Validating JSON...");
mustHaveFiles.forEach(relPath => {
  const filePath = path.join(buildDir, relPath);
  try {
    JSON.parse(fs.readFileSync(filePath, "utf-8"));
    console.log(`✔ Valid JSON: ${relPath}`);
  } catch (err) {
    console.error(`❌ Invalid JSON in ${relPath}:`, err.message);
    process.exit(1);
  }
});

// ✅ Schritt 3: Check in app.asar (nur wenn gebaut)
console.log("\n🔍 Checking app.asar...");
const asarPath = path.join(distDir, "linux-unpacked/resources/app.asar");

if (fs.existsSync(asarPath)) {
  mustHaveFiles.forEach(relPath => {
    const output = execSync(`npx asar list "${asarPath}" | grep "${relPath}"`).toString().trim();
    if (!output) {
      console.error(`❌ Not found in app.asar: ${relPath}`);
      process.exit(1);
    } else {
      console.log(`✔ Found in asar: ${relPath}`);
    }
  });
} else {
  console.log("⚠ No app.asar found yet (did you run electron-builder?). Skipping asar check.");
}

console.log("\n✅ All checks passed!");
