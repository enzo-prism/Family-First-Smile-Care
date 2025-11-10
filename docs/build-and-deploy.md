# Build & Deployment Guide

This guide documents the exact steps we use to produce shipping artifacts for Family First Smile Care. Follow it whenever you cut a release, reproduce a production bug, or set up CI.

## Prerequisites
- **Node.js 20.x / npm 10.x** – matches the TypeScript and Vite toolchain in `package.json`.
- **Environment variables** – `DATABASE_URL` (required for real persistence) and `VITE_GA_MEASUREMENT_ID` (optional). Set them in your shell or `.env` before running `npm start`/`npm run dev`.
- **Neon/PostgreSQL access** – needed when running `npm run db:push`.

## One-Time Setup
```bash
npm install                # installs both client and server deps
npx update-browserslist-db@latest --no-update-notifier --no-fund  # silences the caniuse-lite warning
```

## Clean Build Pipeline
1. **Reset build output (recommended)**
   ```bash
   rm -rf dist
   ```
2. **Type check (optional for now)** – run `npm run check`. The command currently surfaces known nullability warnings in `client/src/pages/contact.tsx`, but catching other regressions early is still useful.
3. **Build client + server bundles**
   ```bash
   npm run build
   # Runs: vite build (client) && esbuild server/index.ts (server)
   ```
   The command emits `dist/public` for the SPA and `dist/index.js` for the Express entry point.
4. **Copy static marketing files** – the helper copies `client/robots.txt` and `client/sitemap.xml` into the production payload.
   ```bash
   node scripts/post-build.js
   ```
5. **Smoke test the production build**
   ```bash
   DATABASE_URL="postgres://..." npm start   # uses dist/index.js
   # or PORT=5001 npm start if 5000 is busy
   ```

## Deployment Checklist
- Upload **`dist/index.js`**, **`dist/public/`**, and **`attached_assets/`** to your hosting environment. `attached_assets/` holds marketing downloads that are not part of the Vite bundle.
- Provide the same environment variables used locally (`DATABASE_URL`, `VITE_GA_MEASUREMENT_ID`, analytics keys, etc.).
- Run `npm run db:push` against Neon whenever the schema in `shared/schema.ts` changes.

## Troubleshooting
- **Browserslist warning during build** – run `npx update-browserslist-db@latest --no-update-notifier --no-fund` to refresh `caniuse-lite`.
- **Missing `DATABASE_URL`** – the API falls back to in-memory storage. Set the var to test persistence or to avoid confusing logs.
- **Large bundle warning** – Vite reports chunks >500 kB. This is informational only; consider lazy loading future sections if the warning becomes problematic.

## CI / Automation Template
```bash
set -euo pipefail
npm ci
npm run build
node scripts/post-build.js
DATABASE_URL="$DATABASE_URL" npm start -- --smoke-test # replace with your own smoke test hook
```

Add screenshots or sample API responses to your release PR so reviewers can see what was built from the generated assets.
