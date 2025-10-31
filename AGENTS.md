# Repository Guidelines

## Project Structure & Module Organization
The app pairs a Vite React SPA with an Express API. Key directories:
- `client/`: frontend entry. `client/src/pages` defines route-level screens, `client/src/components` reusable UI, and `client/src/lib` shared utilities including analytics and react-query setup.
- `server/`: Express bootstrap (`index.ts`), route wiring, Drizzle storage, and Vite middleware controls. Production builds emit to `dist/`.
- `shared/`: Drizzle schema and types consumed on both sides; update here before running migrations.
- `attached_assets/`: downloadable files linked from the marketing site—treat filenames as stable contracts.

## Build, Test, and Development Commands
- `npm install`: install deps.
- `npm run dev`: start the Express server with Vite middleware and hot reload on port 5000.
- `npm run build`: produce the client bundle and server output in `dist/`.
- `npm start`: run the bundled app in production mode for smoke tests.
- `npm run check`: strict TypeScript checking using the shared tsconfig.
- `npm run db:push`: push schema changes to the Neon database referenced by `DATABASE_URL`.

## Coding Style & Naming Conventions
Stick to TypeScript with strict typing; prefer Zod validation over manual guards. Components and routes use PascalCase files; hooks live in `hooks/` with a `use` prefix. Follow the prevailing two-space indentation and double-quoted strings. Reach for Tailwind utility classes before authoring new CSS, and leverage path aliases (`@/` and `@shared/`) instead of relative traversals.

## Testing Guidelines
Automated tests are not configured yet. Until a test runner is added, validate changes with targeted browser checks, API exercises via `/api/contacts`, and type-checking. When introducing tests, favor Vitest plus React Testing Library for client code and Supertest for endpoints, co-locating specs as `*.test.ts(x)` near the subject.

## Commit & Pull Request Guidelines
Recent commits use concise, sentence-style summaries (“Add social media links and content to the homepage”). Keep changes cohesive, ensure `npm run check` and `npm run build` pass, and avoid mixing formatting-only edits with features. Pull requests should outline scope, note impacted routes or data flows, link tracking issues, and attach UI screenshots or response samples when relevant.

## Security & Configuration Tips
Configure `DATABASE_URL`, analytics keys, and other secrets via environment variables only. Mirror new env keys in `client/env.d.ts` and deployment docs. Review any third-party scripts or fonts before adding them to `client/index.html`.
