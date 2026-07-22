import crypto from "node:crypto";
import type { NextFunction, Request, Response } from "express";

const AUTH_REALM = "Admin";

// Read once at startup. If unset/blank, the admin dashboard is disabled entirely
// rather than falling back to an insecure shared default password.
const adminPassword = (process.env.ADMIN_PASSWORD ?? "").trim();

if (!adminPassword) {
  console.warn(
    "[admin] ADMIN_PASSWORD is not set — the admin dashboard is disabled. " +
      "Set the ADMIN_PASSWORD environment variable to enable /admin.",
  );
}

const sendUnauthorized = (res: Response) => {
  res.setHeader("WWW-Authenticate", `Basic realm="${AUTH_REALM}"`);
  res.status(401).json({
    ok: false,
    error: "unauthorized",
    message: "Unauthorized",
  });
};

const sendAdminDisabled = (res: Response) => {
  res.status(503).json({
    ok: false,
    error: "admin_disabled",
    message: "Admin access is not configured on this server.",
  });
};

const safeTimingEqual = (a: string, b: string) => {
  const aBuf = Buffer.from(a, "utf8");
  const bBuf = Buffer.from(b, "utf8");
  if (aBuf.length !== bBuf.length) return false;
  return crypto.timingSafeEqual(aBuf, bBuf);
};

export function requireAdminAuth(req: Request, res: Response, next: NextFunction) {
  // Prevent browser/proxy caching of admin responses.
  res.setHeader("Cache-Control", "no-store");

  // Secure by default: with no configured password, deny rather than fall back
  // to a guessable default.
  if (!adminPassword) {
    return sendAdminDisabled(res);
  }

  const header = req.headers.authorization;
  if (!header || !header.startsWith("Basic ")) {
    return sendUnauthorized(res);
  }

  let decoded = "";
  try {
    decoded = Buffer.from(header.slice("Basic ".length), "base64").toString("utf8");
  } catch {
    return sendUnauthorized(res);
  }

  const separatorIndex = decoded.indexOf(":");
  if (separatorIndex < 0) {
    return sendUnauthorized(res);
  }

  // Username is ignored; we only validate the password for simplicity.
  const password = decoded.slice(separatorIndex + 1);

  if (!safeTimingEqual(password, adminPassword)) {
    return sendUnauthorized(res);
  }

  next();
}
