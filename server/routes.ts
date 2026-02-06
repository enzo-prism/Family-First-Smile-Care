import fs from "node:fs";
import path from "node:path";
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
      return res.status(503).json({
        ok: false,
        error: "missing_changelog",
        message: "Changelog not generated. Run `npm run build`.",
      });
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
    const propertyId = process.env.GA4_PROPERTY_ID;
    if (!propertyId) {
      return res.status(503).json(buildMissingConfigPayload(["GA4_PROPERTY_ID"]));
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
      const [seriesReport, totalsReport, topPagesReport] = await Promise.all([
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
        analyticsdata.properties.runReport({
          property,
          requestBody: {
            dateRanges: [{ startDate: range.startDate, endDate: range.endDate }],
            dimensions: [{ name: "pagePath" }],
            metrics: [{ name: "screenPageViews" }],
            orderBys: [
              {
                metric: { metricName: "screenPageViews" },
                desc: true,
              },
            ],
            limit: "10",
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

      const topPages = (topPagesReport.data.rows ?? []).map((row) => {
        const pagePath = row.dimensionValues?.[0]?.value ?? "";
        const screenPageViews = Number.parseInt(row.metricValues?.[0]?.value ?? "0", 10);
        return { pagePath, screenPageViews };
      });

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
      return res.status(500).json({
        ok: false,
        error: "server_error",
        message: "Failed to fetch GA4 data.",
      });
    }
  });

  app.get("/api/admin/gsc/overview", async (req, res) => {
    const siteUrl = process.env.GSC_SITE_URL;
    if (!siteUrl) {
      return res.status(503).json(buildMissingConfigPayload(["GSC_SITE_URL"]));
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

      const [seriesRes, queriesRes, pagesRes] = await Promise.all([
        searchconsole.searchanalytics.query({
          siteUrl,
          requestBody: { ...requestBase, dimensions: ["date"], rowLimit: 1000 },
        }),
        searchconsole.searchanalytics.query({
          siteUrl,
          requestBody: { ...requestBase, dimensions: ["query"], rowLimit: 10 },
        }),
        searchconsole.searchanalytics.query({
          siteUrl,
          requestBody: { ...requestBase, dimensions: ["page"], rowLimit: 10 },
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

      const topQueries = (queriesRes.data.rows ?? []).map((row) => ({
        query: row.keys?.[0] ?? "",
        clicks: row.clicks ?? 0,
        impressions: row.impressions ?? 0,
        ctr: row.ctr ?? 0,
        position: row.position ?? 0,
      }));

      const topPages = (pagesRes.data.rows ?? []).map((row) => ({
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
      return res.status(500).json({
        ok: false,
        error: "server_error",
        message: "Failed to fetch Search Console data.",
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
