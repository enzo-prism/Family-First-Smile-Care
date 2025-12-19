const canonicalOverrides: Record<string, string> = {
  "/services/tmj": "/tmj",
};

export const normalizePath = (path: string) => {
  const trimmed = path.split(/[?#]/)[0] || "/";
  if (trimmed === "/") return "/";
  return trimmed.endsWith("/") ? trimmed.slice(0, -1) : trimmed;
};

export const resolveCanonicalPath = (path: string) => {
  const normalized = normalizePath(path);
  return canonicalOverrides[normalized] ?? normalized;
};
