#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const canonicalRegex = /<link\s+[^>]*rel=["']canonical["'][^>]*>/i;
const metaDescriptionRegex = /<meta\s+[^>]*name=["']description["'][^>]*>/i;
const titleRegex = /<title>.*?<\/title>/i;

const issues = [];

const checkFile = (label, filePath) => {
  if (!fs.existsSync(filePath)) {
    return;
  }
  const contents = fs.readFileSync(filePath, "utf-8");
  if (canonicalRegex.test(contents)) {
    issues.push(`${label} contains a canonical tag: ${filePath}`);
  }
  if (metaDescriptionRegex.test(contents)) {
    issues.push(`${label} contains a meta description tag: ${filePath}`);
  }
  if (titleRegex.test(contents)) {
    issues.push(`${label} contains a title tag: ${filePath}`);
  }
};

const collectFiles = (dir) => {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectFiles(fullPath));
    } else {
      files.push(fullPath);
    }
  }
  return files;
};

checkFile("client/index.html", path.join(projectRoot, "client", "index.html"));
checkFile(
  "dist/public/index.html",
  path.join(projectRoot, "dist", "public", "index.html"),
);

const pageFiles = collectFiles(path.join(projectRoot, "client", "src", "pages"))
  .filter((file) => file.endsWith(".tsx") || file.endsWith(".ts"));

for (const file of pageFiles) {
  const contents = fs.readFileSync(file, "utf-8");
  if (canonicalRegex.test(contents)) {
    issues.push(`Canonical tag found in page file: ${file}`);
  }
  if (metaDescriptionRegex.test(contents)) {
    issues.push(`Meta description tag found in page file: ${file}`);
  }
  if (titleRegex.test(contents)) {
    issues.push(`Title tag found in page file: ${file}`);
  }
}

if (issues.length) {
  console.error("Canonical check failed:");
  for (const issue of issues) {
    console.error(`- ${issue}`);
  }
  process.exit(1);
}

console.log("Canonical check passed.");
