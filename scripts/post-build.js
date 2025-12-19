#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

// Copy robots.txt, sitemap.xml, and llms.txt to build directory
const filesToCopy = ['robots.txt', 'sitemap.xml', 'llms.txt'];

filesToCopy.forEach(file => {
  const sourcePath = path.join(projectRoot, 'client', file);
  const destPath = path.join(projectRoot, 'dist', 'public', file);
  
  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, destPath);
    console.log(`✓ Copied ${file} to dist/public/`);
  } else {
    console.warn(`⚠ ${file} not found in client/ directory`);
  }
});

console.log('✓ Post-build tasks completed');
