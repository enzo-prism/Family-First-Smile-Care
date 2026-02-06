import crypto from "node:crypto";
import type { NextFunction, Request, Response } from "express";

const DEFAULT_ADMIN_PASSWORD = "tim";
const AUTH_REALM = "Admin";

const sendUnauthorized = (res: Response) => {
  res.setHeader("WWW-Authenticate", `Basic realm="${AUTH_REALM}"`);
  res.status(401).json({
    ok: false,
    error: "unauthorized",
    message: "Unauthorized",
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
  const expectedPassword = process.env.ADMIN_PASSWORD ?? DEFAULT_ADMIN_PASSWORD;

  if (!safeTimingEqual(password, expectedPassword)) {
    return sendUnauthorized(res);
  }

  next();
}
