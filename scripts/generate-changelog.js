#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");

const outDir = path.join(projectRoot, "dist", "public");
fs.mkdirSync(outDir, { recursive: true });

const outPath = path.join(outDir, "admin-changelog.json");

function toGitHubHttpsRepoUrl(remoteUrl) {
  if (!remoteUrl) return null;

  const trimmed = remoteUrl.trim().replace(/\.git$/, "");

  // https://github.com/org/repo or https://github.com/org/repo.git
  const httpsMatch = trimmed.match(/^https?:\/\/github\.com\/([^/]+)\/([^/]+)$/i);
  if (httpsMatch) {
    const [, owner, repo] = httpsMatch;
    return `https://github.com/${owner}/${repo}`;
  }

  // git@github.com:org/repo or ssh://git@github.com/org/repo
  const sshMatch =
    trimmed.match(/^git@github\.com:([^/]+)\/([^/]+)$/i) ||
    trimmed.match(/^ssh:\/\/git@github\.com\/([^/]+)\/([^/]+)$/i);
  if (sshMatch) {
    const [, owner, repo] = sshMatch;
    return `https://github.com/${owner}/${repo}`;
  }

  return null;
}

function safeExecGit(args) {
  return execFileSync("git", args, {
    cwd: projectRoot,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  });
}

const payload = {
  generatedAt: new Date().toISOString(),
  entries: [],
};

try {
  const logOutput = safeExecGit([
    "log",
    "-n",
    "50",
    "--no-merges",
    "--date=short",
    "--pretty=format:%H\t%ad\t%s",
  ]);

  let repoUrl = null;
  try {
    const remote = safeExecGit(["config", "--get", "remote.origin.url"]).trim();
    repoUrl = toGitHubHttpsRepoUrl(remote);
  } catch {
    // Ignore: remote URL missing or git config unavailable.
  }

  const entries = logOutput
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [hash, date, ...subjectParts] = line.split("\t");
      const subject = subjectParts.join("\t").trim();
      return {
        hash,
        shortHash: hash.slice(0, 7),
        date,
        subject,
        url: repoUrl ? `${repoUrl}/commit/${hash}` : null,
      };
    });

  payload.entries = entries;
} catch {
  // Git is unavailable (or repo has no commits). Ship an empty changelog payload.
}

fs.writeFileSync(outPath, JSON.stringify(payload, null, 2) + "\n", "utf8");
