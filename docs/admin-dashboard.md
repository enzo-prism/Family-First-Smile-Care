# Admin Dashboard (/admin)

The app ships a private `/admin` dashboard (HTTP Basic Auth) that includes:
- **Changelog** (recent git commits)
- **Contacts** (contact form submissions from the `contacts` table)
- **Google Analytics (GA4)** overview charts + top pages
- **Google Search Console (GSC)** overview charts + top queries/pages

## Access & Security

`/admin` and `/api/admin/*` are protected via HTTP Basic Auth.

- Username is ignored (you can use anything).
- Password comes from `ADMIN_PASSWORD` (defaults to `"tim"` if unset; override it in production).

Example:
```bash
curl -u "any:$ADMIN_PASSWORD" https://YOUR_DOMAIN/api/admin/changelog
```

## Environment Variables

Required to access the dashboard:
- `ADMIN_PASSWORD`

Required for the **Contacts** tab (persistence):
- `DATABASE_URL` (and run `npm run db:push` at least once)

Required for the **GA4** tab:
- `GA4_PROPERTY_ID` (Family First Smile Care: `518867337`)

Required for the **GSC** tab:
- `GSC_SITE_URL`
  - Domain property: `sc-domain:famfirstsmile.com` (recommended)
  - URL-prefix property: `https://famfirstsmile.com/`

Required for Google API authentication (choose ONE):
- `GOOGLE_SERVICE_ACCOUNT_JSON_BASE64` (recommended for deployments)
- `GOOGLE_SERVICE_ACCOUNT_JSON` (raw JSON string)
- `GOOGLE_APPLICATION_CREDENTIALS` (path to a JSON key file)

## Google Credentials: Service Account vs OAuth Client

The admin dashboard uses a **service account key**, not an OAuth client secret.

- ✅ Works: JSON with `"type": "service_account"`, `client_email`, and `private_key`.
- ❌ Does not work: OAuth client JSON shaped like `{ "web": { "client_id": ..., "client_secret": ... } }`.

Quick checks:
```bash
node -e "const j=require('./service-account.json'); console.log('type=', j.type); console.log('client_email=', j.client_email)"
```

## Base64 Encoding (for GOOGLE_SERVICE_ACCOUNT_JSON_BASE64)

macOS (copies to clipboard):
```bash
base64 -i /path/to/service-account.json | tr -d '\n' | pbcopy
```

Linux:
```bash
base64 -w0 /path/to/service-account.json
```

Validate the secret at runtime:
```bash
node -e "const j=JSON.parse(Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT_JSON_BASE64,'base64').toString('utf8')); console.log('type=', j.type); console.log('client_email=', j.client_email)"
```

## Replit Deployment Notes (Autoscale)

Replit deployments have their own environment.

1. Set the variables above in your **deployment** environment.
2. **Republish** (or restart) the deployment so the new env vars are applied.

## Smoke Tests (Live)

```bash
curl -u "any:$ADMIN_PASSWORD" "https://YOUR_DOMAIN/api/admin/changelog" | head -c 200; echo
curl -u "any:$ADMIN_PASSWORD" "https://YOUR_DOMAIN/api/admin/contacts?limit=5&offset=0" | head -c 200; echo
curl -u "any:$ADMIN_PASSWORD" "https://YOUR_DOMAIN/api/admin/ga4/overview?days=7" | head -c 200; echo
curl -u "any:$ADMIN_PASSWORD" "https://YOUR_DOMAIN/api/admin/gsc/overview?days=7" | head -c 200; echo
```

## Troubleshooting

- `401 Unauthorized`
  - Wrong `ADMIN_PASSWORD` (or you didn’t republish/restart after changing it).
- `503 missing_config`
  - One of the required env vars is missing in the running environment.
- `500 ... GA4 API error: ...`
  - Usually a bad `GA4_PROPERTY_ID`, missing GA4 access for the service account, or a GA4 API quota issue.
- `500 ... Search Console API error: ...`
  - Usually a bad `GSC_SITE_URL`, missing GSC access for the service account, or a GSC API quota issue.

