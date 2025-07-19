#!/bin/bash

echo "🛠️  Bauen der React App..."
npm run build

echo "📦  Kopiere Electron-Dateien ins build-Verzeichnis..."
cp electron/main.js build/electron.js
cp electron/preload.js build/preload.js

echo "✅ Vorbereitung abgeschlossen. Du kannst jetzt 'npm run dist' ausführen."
