const fs = require('fs');
const path = require('path');

const filesToCopy = ['main.js', 'preload.js'];
const sourceDir = path.resolve(__dirname, '../electron');
const destDir = path.resolve(__dirname, '../build');

filesToCopy.forEach(file => {
  const src = path.join(sourceDir, file);
  const dest = path.join(destDir, file);
  fs.copyFileSync(src, dest);
  console.log(`✔️  Copied ${file} to build/`);
});