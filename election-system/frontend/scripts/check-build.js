const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const publicDir = path.resolve(__dirname, "../public");
const buildDir = path.resolve(__dirname, "../build");
const distDir = path.resolve(__dirname, "../dist");
const asarPath = path.join(distDir, "linux-unpacked/resources/app.asar");

// Hilfsfunktion: rekursiv alle Dateien sammeln
function collectFiles(dir, baseDir = dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;

  for (const file of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, file);
    if (fs.lstatSync(fullPath).isDirectory()) {
      results = results.concat(collectFiles(fullPath, baseDir));
    } else {
      // relativer Pfad relativ zu public/
      results.push(path.relative(publicDir, fullPath));
    }
  }
  return results;
}

// ✅ Schritt 1: Alle Soll-Dateien aus public sammeln
console.log("🔍 Collecting files from public/ ...");
const mustHaveFiles = [
  ...collectFiles(path.join(publicDir, "texts")),
  ...collectFiles(path.join(publicDir, "contracts"))
];
if (mustHaveFiles.length === 0) {
  console.error("❌ No files found in public/texts or public/contracts");
  process.exit(1);
}
console.log(`✔ Found ${mustHaveFiles.length} files to check`);

// ✅ Schritt 2: Existenzcheck im build/
console.log("\n🔍 Checking build directory...");
mustHaveFiles.forEach(relPath => {
  const filePath = path.join(buildDir, relPath);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Missing in build/: ${relPath}`);
    process.exit(1);
  } else {
    console.log(`✔ Found in build/: ${relPath}`);
  }
});

// ✅ Schritt 3: JSON-Validierung
console.log("\n🔍 Validating JSON...");
mustHaveFiles
  .filter(f => f.endsWith(".json"))
  .forEach(relPath => {
    const filePath = path.join(buildDir, relPath);
    try {
      JSON.parse(fs.readFileSync(filePath, "utf-8"));
      console.log(`✔ Valid JSON: ${relPath}`);
    } catch (err) {
      console.error(`❌ Invalid JSON in ${relPath}: ${err.message}`);
      process.exit(1);
    }
  });

// ✅ Schritt 4: Check in app.asar (nur wenn gebaut)
console.log("\n🔍 Checking app.asar...");
if (fs.existsSync(asarPath)) {
  mustHaveFiles.forEach(relPath => {
    const output = execSync(`npx asar list "${asarPath}" | grep "${relPath}" || true`).toString().trim();
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
