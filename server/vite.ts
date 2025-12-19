import express, { type Express, type Request } from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer, createLogger } from "vite";
import { type Server } from "http";
import viteConfig from "../vite.config";
import { nanoid } from "nanoid";
import { resolveCanonicalPath, resolvePageMeta } from "@shared/seo";

const viteLogger = createLogger();
const canonicalHost = (process.env.CANONICAL_HOST || "https://famfirstsmile.com").replace(/\/$/, "");
const canonicalTagRegex = /<link\s+[^>]*rel=["']canonical["'][^>]*>\s*/gi;
const metaDescriptionRegex = /<meta\s+[^>]*name=["']description["'][^>]*>\s*/gi;
const titleTagRegex = /<title>.*?<\/title>\s*/is;

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

const getCanonicalHost = (req: Request) => {
  if (process.env.CANONICAL_HOST) return canonicalHost;
  if (process.env.NODE_ENV === "development") {
    const host = req.get("host");
    if (host) return `${req.protocol}://${host}`;
  }
  return canonicalHost;
};

const buildCanonicalUrl = (req: Request) => {
  const path = resolveCanonicalPath(req.originalUrl);
  const host = getCanonicalHost(req);
  return `${host}${path === "/" ? "/" : path}`;
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const injectSeo = (html: string, canonicalUrl: string, meta: { title: string; description: string }) => {
  const cleaned = html
    .replace(canonicalTagRegex, "")
    .replace(metaDescriptionRegex, "")
    .replace(titleTagRegex, "");
  const tags = [
    `<title data-react-helmet="true">${escapeHtml(meta.title)}</title>`,
    `<meta name="description" content="${escapeHtml(meta.description)}" data-react-helmet="true" />`,
    `<link rel="canonical" href="${canonicalUrl}" data-react-helmet="true" />`,
  ];
  return cleaned.includes("</head>")
    ? cleaned.replace("</head>", `  ${tags.join("\n  ")}\n  </head>`)
    : `${tags.join("\n")}\n${cleaned}`;
};

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      },
    },
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html",
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`,
      );
      const page = await vite.transformIndexHtml(url, template);
      const html = injectSeo(page, buildCanonicalUrl(req), resolvePageMeta(url));
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath = path.resolve(import.meta.dirname, "public");
  const indexPath = path.resolve(distPath, "index.html");

  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  if (!fs.existsSync(indexPath)) {
    throw new Error(
      `Could not find index.html in the build directory: ${indexPath}`,
    );
  }

  const indexTemplate = fs.readFileSync(indexPath, "utf-8");

  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist
  app.use("*", (req, res) => {
    const html = injectSeo(indexTemplate, buildCanonicalUrl(req), resolvePageMeta(req.originalUrl));
    res.status(200).set({ "Content-Type": "text/html" }).end(html);
  });
}
