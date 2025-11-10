# Family First Smile Care Web App

Full-stack marketing site and patient intake portal for Family First Smile Care. The project pairs a Vite-powered React single-page application with an Express + Drizzle API that persists contact submissions to Neon/PostgreSQL.

## Tech Stack
- **Frontend:** React 18, TypeScript, Tailwind CSS, Wouter, TanStack Query, React Helmet
- **Backend:** Express 4, TypeScript, Drizzle ORM, Neon serverless PostgreSQL
- **Build Tooling:** Vite 5, esbuild, tsx
- **Analytics & Tracking:** Google Analytics/Ads (`VITE_GA_MEASUREMENT_ID`), Hotjar

## Repository Layout
```
client/          # Vite SPA (pages, components, hooks, data, lib utilities)
server/          # Express entry point, routes, storage abstraction, Vite bridge
shared/          # Drizzle schema & shared TypeScript types
attached_assets/ # Referenced static assets kept outside the Vite pipeline
scripts/         # Build helpers (e.g., sitemap/robots copier)
```

Key files of note:
- `server/index.ts` handles middleware, legacy redirects, sitemap/robots delivery, and serving built assets.
- `server/storage.ts` switches between Neon-backed storage and an in-memory fallback when `DATABASE_URL` is absent.
- `client/index.html` now ships meaningful pre-rendered HTML to aid non-JS crawlers and link unfurling.
- `client/src/pages/home.tsx`, `patient-info.tsx`, and `service-detail.tsx` embed JSON-LD structured data for organization info, FAQs, and service pages.
- `client/sitemap.xml` advertises canonical marketing routes—keep slugs aligned with `client/src/data/services.ts`.

## Getting Started
1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Provide environment variables**
   - `DATABASE_URL` – Neon/PostgreSQL connection string (required for real persistence).
   - `VITE_GA_MEASUREMENT_ID` – Google Analytics ID (optional but recommended).

   During development you can export them in your shell:
   ```bash
   export DATABASE_URL="postgres://..."
   export VITE_GA_MEASUREMENT_ID="G-XXXXXXX"
   ```
   If `DATABASE_URL` is omitted the API will fall back to in-memory storage (changes are not persisted).

3. **Run the app**
   ```bash
   npm run dev
   ```
   The server listens on `PORT` (defaults to 5000). If port 5000 is in use:
   ```bash
   PORT=5001 npm run dev
   ```

## Build & Deploy
- `npm run build` – Produces the static client bundle and the bundled Express server (outputs to `dist/`).
- `node scripts/post-build.js` – Copies `client/robots.txt` and `client/sitemap.xml` into `dist/public/` so they ship with the release.
- `npm start` – Runs the bundled server in production mode; ensure `DATABASE_URL` is set.
- `npm run check` – TypeScript project check. (Currently surfaces known form-typing errors in `client/src/pages/contact.tsx`; address before enforcing in CI.)
- `npm run db:push` – Applies Drizzle schema changes to the configured database.
- See `docs/build-and-deploy.md` for a step-by-step cookbook covering prerequisites, smoke tests, and automation tips.

Deployment checklist:
1. Run `npm run build`.
2. Run `node scripts/post-build.js` to copy sitemap/robots into the `dist/public/` payload.
3. Ensure `client/sitemap.xml` and `client/robots.txt` include any new routes or assets.
4. Deploy both `dist/index.js` and `dist/public` along with `attached_assets`.

## Authoring Content & SEO
- **Services:** Update `client/src/data/services.ts` for new offerings. Keep `id` slugs in sync with sitemap entries and any legacy redirects defined in `server/index.ts`.
- **Structured Data:** Organization info lives in `client/src/pages/home.tsx` JSON-LD; FAQs pull from the `faqs` array in `patient-info.tsx`; service schema is generated per route in `service-detail.tsx`.
- **Sitemap:** Manual XML at `client/sitemap.xml`. Update `<lastmod>` when content changes to avoid conveying stale dates.
- **Pre-rendered HTML:** `client/index.html` contains crawler-friendly fallback content—refresh it if branding, address, or top-tier services change.
- **Analytics:** `client/src/lib/analytics.ts` bootstraps Google Analytics/Ads and Hotjar. Mirror any new tracking IDs in environment configuration and documentation.

## Database Notes
- Schema definitions live in `shared/schema.ts`. Update there before running migrations.
- In development without a database, the API stores contacts in-memory—useful for UI work but do not rely on it for persistence.
- Production builds expect a reachable Neon/PostgreSQL instance; missing credentials will log a warning but disable persistence.

## Troubleshooting
- **Port conflicts:** If `EADDRINUSE` appears on startup, stop the process occupying the port (`lsof -i :5000`) or set `PORT` to an open value.
- **TypeScript errors:** `npm run check` currently flags `client/src/pages/contact.tsx` for nullable form values. Resolve or cast before turning the check into a blocking gate.
- **Legacy URLs returning 404:** Add mappings to the `legacyRedirects` map in `server/index.ts` so old WordPress slugs continue to redirect with 301 status codes.

## Further Reading
- `AGENTS.md` – Project conventions and team workflows.
- `replit.md` – Environment-specific notes targeting Replit deployments.
