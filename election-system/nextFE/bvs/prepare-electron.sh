#!/bin/bash

echo "🛠️  Bauen der React App..."
npm run build

echo "📦  Kopiere Electron-Dateien ins build-Verzeichnis..."
cp electron/main.js main.js
cp electron/preload.js preload.js

echo "✅ Vorbereitung abgeschlossen. Du kannst jetzt 'npm run dist' ausführen."
