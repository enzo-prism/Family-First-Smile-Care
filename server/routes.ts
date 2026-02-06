import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { requireAdminAuth } from "./admin/auth";
import { getAdminDateRange } from "./admin/dates";
import { buildMissingConfigPayload, getGoogleAuth } from "./admin/google";
import { google } from "googleapis";

export async function registerRoutes(app: Express): Promise<Server> {
  // Protect /admin and /api/admin/* via Basic Auth (password defaults to "tim").
  app.use("/admin", requireAdminAuth);
  app.use("/api/admin", requireAdminAuth);
  // Prevent accidental exposure of the build-time changelog via static hosting.
  app.all("/admin-changelog.json", (_req, res) => res.status(404).end());

  // Contact form submission
  app.post("/api/contacts", async (req, res) => {
    try {
      const { insertContactSchema } = await import("@shared/schema");
      const { z } = await import("zod");
      
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.status(201).json({ success: true, contact });
    } catch (error: any) {
      if (error.name === 'ZodError') {
        res.status(400).json({ 
          success: false, 
          message: "Invalid form data",
          errors: error.errors 
        });
      } else {
        console.error("Contact form error:", error);
        res.status(500).json({ 
          success: false, 
          message: "Failed to submit contact form" 
        });
      }
    }
  });

  const resolveDistPublicDir = () => {
    const candidates = [
      path.resolve(process.cwd(), "dist", "public"),
      path.resolve(process.cwd(), "public"),
      path.resolve(import.meta.dirname, "public"),
    ];

    for (const candidate of candidates) {
      try {
        if (fs.existsSync(candidate)) return candidate;
      } catch {
        // ignore
      }
    }

    // Best-effort fallback.
    return candidates[0];
  };

  const changelogCache: {
    expiresAt: number;
    payload: unknown | null;
  } = {
    expiresAt: 0,
    payload: null,
  };

  app.get("/api/admin/changelog", (_req, res) => {
    const now = Date.now();
    if (changelogCache.payload && changelogCache.expiresAt > now) {
      return res.json(changelogCache.payload);
    }

    const publicDir = resolveDistPublicDir();
    const changelogPath = path.join(publicDir, "admin-changelog.json");

    if (!fs.existsSync(changelogPath)) {
      // Fallback: generate on the fly if git is available. This makes the admin
      // dashboard usable in dev environments without requiring a build.
      try {
        const logOutput = execFileSync(
          "git",
          [
            "log",
            "-n",
            "50",
            "--no-merges",
            "--date=short",
            "--pretty=format:%H\t%ad\t%s",
          ],
          {
            cwd: process.cwd(),
            encoding: "utf8",
            stdio: ["ignore", "pipe", "ignore"],
          },
        );

        let repoUrl: string | null = null;
        try {
          const remote = execFileSync(
            "git",
            ["config", "--get", "remote.origin.url"],
            {
              cwd: process.cwd(),
              encoding: "utf8",
              stdio: ["ignore", "pipe", "ignore"],
            },
          ).trim();

          const trimmed = remote.trim().replace(/\.git$/, "");
          const httpsMatch = trimmed.match(
            /^https?:\/\/github\.com\/([^/]+)\/([^/]+)$/i,
          );
          if (httpsMatch) {
            const [, owner, repo] = httpsMatch;
            repoUrl = `https://github.com/${owner}/${repo}`;
          } else {
            const sshMatch =
              trimmed.match(/^git@github\.com:([^/]+)\/([^/]+)$/i) ||
              trimmed.match(/^ssh:\/\/git@github\.com\/([^/]+)\/([^/]+)$/i);
            if (sshMatch) {
              const [, owner, repo] = sshMatch;
              repoUrl = `https://github.com/${owner}/${repo}`;
            }
          }
        } catch {
          // ignore
        }

        const entries = logOutput
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean)
          .map((line) => {
            const [hash, date, ...subjectParts] = line.split("\t");
            const subject = subjectParts.join("\t").trim();
            return {
              hash,
              shortHash: hash.slice(0, 7),
              date,
              subject,
              url: repoUrl ? `${repoUrl}/commit/${hash}` : null,
            };
          });

        const payload = {
          generatedAt: new Date().toISOString(),
          entries,
        };

        changelogCache.payload = payload;
        changelogCache.expiresAt = now + 60_000;
        return res.json(payload);
      } catch {
        return res.status(503).json({
          ok: false,
          error: "missing_changelog",
          message: "Changelog not generated. Run `npm run build`.",
        });
      }
    }

    try {
      const text = fs.readFileSync(changelogPath, "utf8");
      const payload = JSON.parse(text) as unknown;
      changelogCache.payload = payload;
      changelogCache.expiresAt = now + 60_000;
      return res.json(payload);
    } catch (error) {
      console.error("Failed to read admin changelog:", error);
      return res.status(500).json({
        ok: false,
        error: "server_error",
        message: "Failed to load changelog.",
      });
    }
  });

  app.get("/api/admin/contacts", async (req, res) => {
    const parseIntQuery = (value: unknown, fallback: number) => {
      if (typeof value !== "string") return fallback;
      const parsed = Number.parseInt(value, 10);
      return Number.isFinite(parsed) ? parsed : fallback;
    };

    const limitRaw = parseIntQuery(req.query.limit, 50);
    const offsetRaw = parseIntQuery(req.query.offset, 0);
    const limit = Math.min(Math.max(limitRaw, 1), 200);
    const offset = Math.max(offsetRaw, 0);
    const q = typeof req.query.q === "string" ? req.query.q.trim().slice(0, 200) : undefined;

    try {
      const payload = await storage.listContacts({ limit, offset, q });
      return res.json(payload);
    } catch (error: any) {
      console.error("Admin contacts error:", error);
      const message =
        typeof error?.message === "string" && error.message
          ? `Contacts API error: ${error.message}`
          : "Failed to load contacts.";
      return res.status(500).json({
        ok: false,
        error: "server_error",
        message,
      });
    }
  });

  const adminCache = new Map<
    string,
    {
      expiresAt: number;
      payload: unknown;
    }
  >();

  const getFromCache = (key: string) => {
    const cached = adminCache.get(key);
    if (!cached) return null;
    if (cached.expiresAt < Date.now()) {
      adminCache.delete(key);
      return null;
    }
    return cached.payload;
  };

  const setCache = (key: string, payload: unknown, ttlMs: number) => {
    adminCache.set(key, {
      expiresAt: Date.now() + ttlMs,
      payload,
    });
  };

  app.get("/api/admin/ga4/overview", async (req, res) => {
    const propertyIdRaw =
      process.env.GA4_PROPERTY_ID ?? process.env.GA_PROPERTY_ID ?? process.env.GA_PROPERTY;
    const propertyId = propertyIdRaw?.trim().replace(/^properties\//i, "");
    if (!propertyId) {
      return res
        .status(503)
        .json(
          buildMissingConfigPayload(
            ["GA4_PROPERTY_ID"],
            "Set GA4_PROPERTY_ID to your GA4 Property ID (for this site: 518867337).",
          ),
        );
    }

    const authResult = getGoogleAuth();
    if ("error" in authResult) {
      return res.status(503).json(authResult.error);
    }

    const range = getAdminDateRange(req);
    const cacheKey = `ga4:${range.days}`;
    const cached = getFromCache(cacheKey);
    if (cached) return res.json(cached);

    try {
      const analyticsdata = google.analyticsdata({
        version: "v1beta",
        auth: authResult.auth,
      });

      const property = `properties/${propertyId}`;
      const [seriesReport, totalsReport] = await Promise.all([
        analyticsdata.properties.runReport({
          property,
          requestBody: {
            dateRanges: [{ startDate: range.startDate, endDate: range.endDate }],
            dimensions: [{ name: "date" }],
            metrics: [
              { name: "activeUsers" },
              { name: "sessions" },
              { name: "screenPageViews" },
            ],
            orderBys: [{ dimension: { dimensionName: "date" } }],
          },
        }),
        analyticsdata.properties.runReport({
          property,
          requestBody: {
            dateRanges: [{ startDate: range.startDate, endDate: range.endDate }],
            metrics: [
              { name: "activeUsers" },
              { name: "sessions" },
              { name: "screenPageViews" },
            ],
          },
        }),
      ]);

      const toIsoDate = (gaDate: string) => {
        if (!gaDate || gaDate.length !== 8) return gaDate;
        return `${gaDate.slice(0, 4)}-${gaDate.slice(4, 6)}-${gaDate.slice(6, 8)}`;
      };

      const series = (seriesReport.data.rows ?? []).map((row) => {
        const date = toIsoDate(row.dimensionValues?.[0]?.value ?? "");
        const activeUsers = Number.parseInt(row.metricValues?.[0]?.value ?? "0", 10);
        const sessions = Number.parseInt(row.metricValues?.[1]?.value ?? "0", 10);
        const screenPageViews = Number.parseInt(row.metricValues?.[2]?.value ?? "0", 10);
        return { date, activeUsers, sessions, screenPageViews };
      });

      const totalsRow = totalsReport.data.rows?.[0];
      const totals = totalsRow
        ? {
            activeUsers: Number.parseInt(totalsRow.metricValues?.[0]?.value ?? "0", 10),
            sessions: Number.parseInt(totalsRow.metricValues?.[1]?.value ?? "0", 10),
            screenPageViews: Number.parseInt(totalsRow.metricValues?.[2]?.value ?? "0", 10),
          }
        : series.reduce(
            (acc, point) => ({
              activeUsers: acc.activeUsers + point.activeUsers,
              sessions: acc.sessions + point.sessions,
              screenPageViews: acc.screenPageViews + point.screenPageViews,
            }),
            { activeUsers: 0, sessions: 0, screenPageViews: 0 },
          );

      const fetchTopPages = async () => {
        const dimensionCandidates = [
          // Best effort: works for both web + app properties.
          "unifiedPagePathScreen",
          // Web-only fallback.
          "pagePathPlusQueryString",
          // Legacy fallback.
          "pagePath",
        ];

        let lastError: unknown = null;

        for (const dimensionName of dimensionCandidates) {
          try {
            const report = await analyticsdata.properties.runReport({
              property,
              requestBody: {
                dateRanges: [{ startDate: range.startDate, endDate: range.endDate }],
                dimensions: [{ name: dimensionName }],
                metrics: [{ name: "screenPageViews" }],
                orderBys: [
                  {
                    metric: { metricName: "screenPageViews" },
                    desc: true,
                  },
                ],
                limit: "10",
              },
            });

            return (report.data.rows ?? []).map((row) => {
              const pagePath = row.dimensionValues?.[0]?.value ?? "";
              const screenPageViews = Number.parseInt(
                row.metricValues?.[0]?.value ?? "0",
                10,
              );
              return { pagePath, screenPageViews };
            });
          } catch (error: any) {
            // Try the next dimension name if this one is unsupported.
            lastError = error;
            const message = String(error?.message || "");
            const isInvalidDimension =
              message.includes("Unknown dimension") ||
              message.includes("unknown dimension") ||
              message.includes("dimensions") ||
              message.includes("dimension");
            if (!isInvalidDimension) break;
          }
        }

        if (lastError) {
          console.warn("GA4 top pages query failed; continuing without it.");
        }
        return [] as Array<{ pagePath: string; screenPageViews: number }>;
      };

      const topPages = await fetchTopPages();

      const payload = {
        range,
        totals,
        series,
        topPages,
      };

      setCache(cacheKey, payload, 10 * 60_000);
      return res.json(payload);
    } catch (error: any) {
      console.error("GA4 overview error:", error);
      const message =
        typeof error?.message === "string" && error.message
          ? `GA4 API error: ${error.message}`
          : "Failed to fetch GA4 data.";
      return res.status(500).json({
        ok: false,
        error: "server_error",
        message,
      });
    }
  });

  app.get("/api/admin/gsc/overview", async (req, res) => {
    const rawSiteUrl = process.env.GSC_SITE_URL?.trim();
    const normalizeGscSiteUrl = (value: string) => {
      if (!value) return value;
      if (value.startsWith("sc-domain:")) return value;
      if (value.startsWith("http://") || value.startsWith("https://")) {
        return value.endsWith("/") ? value : `${value}/`;
      }
      // If it's a bare domain like "famfirstsmile.com", treat it as a domain property.
      return `sc-domain:${value.replace(/\/+$/, "")}`;
    };

    const siteUrl = rawSiteUrl ? normalizeGscSiteUrl(rawSiteUrl) : "";
    if (!siteUrl) {
      return res
        .status(503)
        .json(
          buildMissingConfigPayload(
            ["GSC_SITE_URL"],
            "Set GSC_SITE_URL to sc-domain:famfirstsmile.com (domain property) or https://famfirstsmile.com/ (URL-prefix property).",
          ),
        );
    }

    const authResult = getGoogleAuth();
    if ("error" in authResult) {
      return res.status(503).json(authResult.error);
    }

    const range = getAdminDateRange(req);
    const cacheKey = `gsc:${range.days}`;
    const cached = getFromCache(cacheKey);
    if (cached) return res.json(cached);

    try {
      const searchconsole = google.searchconsole({
        version: "v1",
        auth: authResult.auth,
      });

      const requestBase = {
        startDate: range.startDate,
        endDate: range.endDate,
        searchType: "web",
      } as const;

      const seriesRes = await searchconsole.searchanalytics.query({
        siteUrl,
        requestBody: { ...requestBase, dimensions: ["date"], rowLimit: 1000 },
      });

      const [queriesRes, pagesRes] = await Promise.all([
        searchconsole.searchanalytics
          .query({
            siteUrl,
            requestBody: { ...requestBase, dimensions: ["query"], rowLimit: 10 },
          })
          .catch((error: any) => {
            console.warn("GSC top queries query failed; continuing without it.", error?.message);
            return null;
          }),
        searchconsole.searchanalytics
          .query({
            siteUrl,
            requestBody: { ...requestBase, dimensions: ["page"], rowLimit: 10 },
          })
          .catch((error: any) => {
            console.warn("GSC top pages query failed; continuing without it.", error?.message);
            return null;
          }),
      ]);

      const series = (seriesRes.data.rows ?? []).map((row) => {
        const date = row.keys?.[0] ?? "";
        const clicks = row.clicks ?? 0;
        const impressions = row.impressions ?? 0;
        const ctr = row.ctr ?? 0;
        const position = row.position ?? 0;
        return { date, clicks, impressions, ctr, position };
      });

      const totalsRaw = series.reduce(
        (acc, point) => ({
          clicks: acc.clicks + point.clicks,
          impressions: acc.impressions + point.impressions,
          weightedPosition: acc.weightedPosition + point.position * point.impressions,
        }),
        { clicks: 0, impressions: 0, weightedPosition: 0 },
      );

      const totals = {
        clicks: totalsRaw.clicks,
        impressions: totalsRaw.impressions,
        ctr: totalsRaw.impressions > 0 ? totalsRaw.clicks / totalsRaw.impressions : 0,
        position:
          totalsRaw.impressions > 0
            ? totalsRaw.weightedPosition / totalsRaw.impressions
            : 0,
      };

      const topQueries = (queriesRes?.data?.rows ?? []).map((row) => ({
        query: row.keys?.[0] ?? "",
        clicks: row.clicks ?? 0,
        impressions: row.impressions ?? 0,
        ctr: row.ctr ?? 0,
        position: row.position ?? 0,
      }));

      const topPages = (pagesRes?.data?.rows ?? []).map((row) => ({
        page: row.keys?.[0] ?? "",
        clicks: row.clicks ?? 0,
        impressions: row.impressions ?? 0,
        ctr: row.ctr ?? 0,
        position: row.position ?? 0,
      }));

      const payload = {
        range,
        totals,
        series,
        topQueries,
        topPages,
      };

      setCache(cacheKey, payload, 10 * 60_000);
      return res.json(payload);
    } catch (error: any) {
      console.error("GSC overview error:", error);
      const message =
        typeof error?.message === "string" && error.message
          ? `Search Console API error: ${error.message}`
          : "Failed to fetch Search Console data.";
      return res.status(500).json({
        ok: false,
        error: "server_error",
        message,
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
