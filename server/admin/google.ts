import { google } from "googleapis";

const GOOGLE_SCOPES = [
  "https://www.googleapis.com/auth/analytics.readonly",
  "https://www.googleapis.com/auth/webmasters.readonly",
];

type CredentialsJson = Record<string, unknown> & {
  client_email?: string;
  private_key?: string;
};

export type MissingConfigPayload = {
  ok: false;
  error: "missing_config";
  message: string;
  missing: string[];
};

export const buildMissingConfigPayload = (missing: string[], message?: string): MissingConfigPayload => ({
  ok: false,
  error: "missing_config",
  message: message || "Missing required configuration for Google APIs.",
  missing,
});

const parseServiceAccountCredentials = (): { credentials: CredentialsJson } | { error: MissingConfigPayload } => {
  const rawJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  const rawBase64 = process.env.GOOGLE_SERVICE_ACCOUNT_JSON_BASE64;

  if (!rawJson && !rawBase64) {
    return {
      error: buildMissingConfigPayload([
        "GOOGLE_SERVICE_ACCOUNT_JSON or GOOGLE_SERVICE_ACCOUNT_JSON_BASE64",
      ]),
    };
  }

  let text = rawJson;
  if (!text && rawBase64) {
    try {
      text = Buffer.from(rawBase64, "base64").toString("utf8");
    } catch {
      return {
        error: buildMissingConfigPayload(
          ["GOOGLE_SERVICE_ACCOUNT_JSON_BASE64"],
          "Invalid base64 for GOOGLE_SERVICE_ACCOUNT_JSON_BASE64.",
        ),
      };
    }
  }

  if (!text) {
    return {
      error: buildMissingConfigPayload([
        "GOOGLE_SERVICE_ACCOUNT_JSON or GOOGLE_SERVICE_ACCOUNT_JSON_BASE64",
      ]),
    };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    return {
      error: buildMissingConfigPayload(
        ["GOOGLE_SERVICE_ACCOUNT_JSON"],
        "Invalid JSON for GOOGLE_SERVICE_ACCOUNT_JSON.",
      ),
    };
  }

  if (!parsed || typeof parsed !== "object") {
    return {
      error: buildMissingConfigPayload(
        ["GOOGLE_SERVICE_ACCOUNT_JSON"],
        "Service account JSON must be an object.",
      ),
    };
  }

  const credentials = parsed as CredentialsJson;
  if (!credentials.client_email || !credentials.private_key) {
    return {
      error: buildMissingConfigPayload(
        ["client_email", "private_key"],
        "Service account JSON is missing client_email/private_key.",
      ),
    };
  }

  return { credentials };
};

export const getGoogleAuth = (): { auth: InstanceType<typeof google.auth.GoogleAuth> } | { error: MissingConfigPayload } => {
  const parsed = parseServiceAccountCredentials();
  if ("error" in parsed) return parsed;

  const auth = new google.auth.GoogleAuth({
    credentials: parsed.credentials,
    scopes: GOOGLE_SCOPES,
  });

  return { auth };
};
