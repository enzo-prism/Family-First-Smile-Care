import express, { type Request, Response, NextFunction } from "express";
import compression from "compression";
import fs from "node:fs";
import path from "path";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();

// Enable gzip compression for all responses
app.use(compression({
  filter: (req, res) => {
    // Compress all text-based responses
    if (req.headers['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
  },
  level: 6, // Compression level (0-9, 6 is default balance of speed/compression)
  threshold: 1024, // Only compress files larger than 1KB
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Redirect www to non-www
app.use((req, res, next) => {
  const host = req.get('host');
  if (host && host.startsWith('www.')) {
    const nonWwwHost = host.replace('www.', '');
    const redirectUrl = `${req.protocol}://${nonWwwHost}${req.originalUrl}`;
    return res.redirect(301, redirectUrl);
  }
  next();
});

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // Serve attached assets statically
  app.use('/attached_assets', express.static(path.resolve(process.cwd(), 'attached_assets')));

  // Serve robots.txt and sitemap.xml with proper fallbacks for production
  app.get('/robots.txt', (_req, res) => {
    // Try production location first, then development location
    const productionPath = path.resolve(process.cwd(), 'dist', 'public', 'robots.txt');
    const developmentPath = path.resolve(process.cwd(), 'client', 'robots.txt');
    
    const robotsPath = fs.existsSync(productionPath) ? productionPath : developmentPath;
    
    res.type('text/plain');
    res.sendFile(robotsPath, (err) => {
      if (err) {
        // If file not found, send a default robots.txt
        res.status(200).send(`# Robots.txt for Family First Smile Care
# https://famfirstsmile.com

User-agent: *
Allow: /
Disallow: /api/
Disallow: /attached_assets/

Sitemap: https://famfirstsmile.com/sitemap.xml`);
      }
    });
  });

  app.get('/sitemap.xml', (_req, res) => {
    // Try production location first, then development location
    const productionPath = path.resolve(process.cwd(), 'dist', 'public', 'sitemap.xml');
    const developmentPath = path.resolve(process.cwd(), 'client', 'sitemap.xml');
    
    const sitemapPath = fs.existsSync(productionPath) ? productionPath : developmentPath;
    
    res.type('text/xml');
    res.sendFile(sitemapPath, (err) => {
      if (err) {
        // If file not found, send a minimal sitemap
        res.status(200).send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://famfirstsmile.com/</loc>
    <lastmod>2025-02-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`);
      }
    });
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    // In production, serve static assets with compression before the catch-all route
    const distPath = path.resolve(process.cwd(), 'dist/public');
    
    // Serve static assets
    app.use('/assets', express.static(path.join(distPath, 'assets'), {
      maxAge: '1y', // Cache assets for 1 year
      etag: true,
      lastModified: true,
      setHeaders: (res, filePath) => {
        // Ensure proper content types
        if (filePath.endsWith('.js')) {
          res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
        } else if (filePath.endsWith('.css')) {
          res.setHeader('Content-Type', 'text/css; charset=utf-8');
        }
      }
    }));
    
    // Serve static files and the React app
    serveStatic(app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || "5000", 10);
  const listenOptions = {
    port,
    host: "0.0.0.0",
    ...(process.platform === "linux" ? { reusePort: true } : {}),
  };

  server.listen(listenOptions, () => {
    log(`serving on port ${port}`);
  });
})();
