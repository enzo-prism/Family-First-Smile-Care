import { useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

type DaysOption = 7 | 30 | 90;

type AdminErrorPayload = {
  ok: false;
  error: string;
  message: string;
  missing?: string[];
};

type AdminChangelogEntry = {
  hash: string;
  shortHash: string;
  date: string;
  subject: string;
  url: string | null;
};

type AdminChangelogResponse = {
  generatedAt: string;
  entries: AdminChangelogEntry[];
};

type GA4OverviewResponse = {
  range: { days: DaysOption; startDate: string; endDate: string };
  totals: { activeUsers: number; sessions: number; screenPageViews: number };
  series: Array<{
    date: string;
    activeUsers: number;
    sessions: number;
    screenPageViews: number;
  }>;
  topPages: Array<{ pagePath: string; screenPageViews: number }>;
};

type GSCOverviewResponse = {
  range: { days: DaysOption; startDate: string; endDate: string };
  totals: { clicks: number; impressions: number; ctr: number; position: number };
  series: Array<{
    date: string;
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
  }>;
  topQueries: Array<{
    query: string;
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
  }>;
  topPages: Array<{
    page: string;
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
  }>;
};

type FetchJsonError = Error & {
  status?: number;
  payload?: unknown;
};

const isAdminErrorPayload = (value: unknown): value is AdminErrorPayload => {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return v.ok === false && typeof v.message === "string";
};

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    credentials: "include",
    headers: { Accept: "application/json" },
  });

  const text = await res.text();
  const payload = text ? (JSON.parse(text) as unknown) : null;

  if (!res.ok) {
    const message =
      isAdminErrorPayload(payload) && payload.message
        ? payload.message
        : text || res.statusText;

    const error: FetchJsonError = new Error(message);
    error.status = res.status;
    error.payload = payload;
    throw error;
  }

  return payload as T;
}

const formatInt = (value: number) => value.toLocaleString();
const formatPercent = (value: number) => `${(value * 100).toFixed(1)}%`;
const formatPosition = (value: number) => value.toFixed(1);

function QueryErrorCard({ error }: { error: unknown }) {
  const err = error as FetchJsonError;
  const payload = err?.payload;

  if (isAdminErrorPayload(payload)) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Configuration Needed</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">{payload.message}</p>
          {payload.missing?.length ? (
            <div className="rounded-md bg-muted p-3 text-sm">
              <div className="font-semibold mb-1">Missing:</div>
              <ul className="list-disc pl-5 space-y-1">
                {payload.missing.map((item) => (
                  <li key={item} className="font-mono text-xs">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </CardContent>
      </Card>
    );
  }

  if (err?.status === 401) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Unauthorized</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Refresh the page and enter the admin password again.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Something Went Wrong</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        {err?.message || "Failed to load admin data."}
      </CardContent>
    </Card>
  );
}

export default function Admin() {
  const queryClient = useQueryClient();
  const [tab, setTab] = useState<"changelog" | "ga4" | "gsc">("changelog");
  const [days, setDays] = useState<DaysOption>(30);

  const changelogQuery = useQuery({
    queryKey: ["/api/admin/changelog"],
    queryFn: () => fetchJson<AdminChangelogResponse>("/api/admin/changelog"),
  });

  const gaQueryKey = useMemo(
    () => `/api/admin/ga4/overview?days=${days}`,
    [days],
  );
  const ga4Query = useQuery({
    queryKey: [gaQueryKey],
    queryFn: () => fetchJson<GA4OverviewResponse>(gaQueryKey),
    enabled: tab === "ga4",
  });

  const gscQueryKey = useMemo(
    () => `/api/admin/gsc/overview?days=${days}`,
    [days],
  );
  const gscQuery = useQuery({
    queryKey: [gscQueryKey],
    queryFn: () => fetchJson<GSCOverviewResponse>(gscQueryKey),
    enabled: tab === "gsc",
  });

  const isRefreshing = changelogQuery.isFetching || ga4Query.isFetching || gscQuery.isFetching;

  const refresh = async () => {
    await queryClient.invalidateQueries({ queryKey: ["/api/admin/changelog"] });
    await queryClient.invalidateQueries({ queryKey: [gaQueryKey] });
    await queryClient.invalidateQueries({ queryKey: [gscQueryKey] });
  };

  return (
    <div className="pt-16 pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-gray-900">Admin</h1>
            <p className="text-sm text-gray-600">
              Changelog, Google Analytics (GA4), and Search Console.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-end">
            <div className="flex items-center gap-3">
              <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Range
              </div>
              <ToggleGroup
                type="single"
                value={String(days)}
                onValueChange={(value) => {
                  if (!value) return;
                  const next = Number.parseInt(value, 10) as DaysOption;
                  setDays(next);
                }}
                className="justify-start"
              >
                <ToggleGroupItem value="7" aria-label="Last 7 days">
                  7d
                </ToggleGroupItem>
                <ToggleGroupItem value="30" aria-label="Last 30 days">
                  30d
                </ToggleGroupItem>
                <ToggleGroupItem value="90" aria-label="Last 90 days">
                  90d
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            <Button variant="outline" onClick={refresh} disabled={isRefreshing}>
              {isRefreshing ? "Refreshing..." : "Refresh"}
            </Button>
          </div>
        </div>

        <Tabs value={tab} onValueChange={(value) => setTab(value as typeof tab)} className="mt-10">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="changelog">Changelog</TabsTrigger>
            <TabsTrigger value="ga4">Google Analytics</TabsTrigger>
            <TabsTrigger value="gsc">Search Console</TabsTrigger>
          </TabsList>

          <TabsContent value="changelog" className="mt-6">
            {changelogQuery.isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
              </div>
            ) : changelogQuery.isError ? (
              <QueryErrorCard error={changelogQuery.error} />
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Recent Updates</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-xs text-muted-foreground">
                    Generated at:{" "}
                    <span className="font-mono">
                      {changelogQuery.data?.generatedAt}
                    </span>
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[140px]">Date</TableHead>
                        <TableHead>Change</TableHead>
                        <TableHead className="w-[120px]">Commit</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {changelogQuery.data?.entries?.length ? (
                        changelogQuery.data.entries.map((entry) => (
                          <TableRow key={entry.hash}>
                            <TableCell className="font-mono text-xs">
                              {entry.date}
                            </TableCell>
                            <TableCell className="text-sm">
                              {entry.subject}
                            </TableCell>
                            <TableCell className="font-mono text-xs">
                              {entry.url ? (
                                <a
                                  href={entry.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary hover:underline"
                                >
                                  {entry.shortHash}
                                </a>
                              ) : (
                                entry.shortHash
                              )}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={3} className="text-sm text-muted-foreground">
                            No changelog entries found.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="ga4" className="mt-6 space-y-6">
            {ga4Query.isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-40 w-full" />
                <Skeleton className="h-72 w-full" />
              </div>
            ) : ga4Query.isError ? (
              <QueryErrorCard error={ga4Query.error} />
            ) : (
              <>
                <div className="grid gap-4 md:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm text-muted-foreground">Active Users</CardTitle>
                    </CardHeader>
                    <CardContent className="text-3xl font-bold">
                      {formatInt(ga4Query.data?.totals.activeUsers ?? 0)}
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm text-muted-foreground">Sessions</CardTitle>
                    </CardHeader>
                    <CardContent className="text-3xl font-bold">
                      {formatInt(ga4Query.data?.totals.sessions ?? 0)}
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm text-muted-foreground">Page Views</CardTitle>
                    </CardHeader>
                    <CardContent className="text-3xl font-bold">
                      {formatInt(ga4Query.data?.totals.screenPageViews ?? 0)}
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Active Users Trend</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[320px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={ga4Query.data?.series ?? []}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="date"
                          tickFormatter={(value: string) => value.slice(5)}
                        />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="activeUsers"
                          stroke="var(--primary)"
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Top Pages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Path</TableHead>
                          <TableHead className="w-[160px] text-right">Views</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {ga4Query.data?.topPages?.length ? (
                          ga4Query.data.topPages.map((row) => (
                            <TableRow key={row.pagePath}>
                              <TableCell className="font-mono text-xs">
                                {row.pagePath || "(not set)"}
                              </TableCell>
                              <TableCell className="text-right font-mono text-xs">
                                {formatInt(row.screenPageViews)}
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={2} className="text-sm text-muted-foreground">
                              No page data found.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </>
            )}
          </TabsContent>

          <TabsContent value="gsc" className="mt-6 space-y-6">
            {gscQuery.isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-40 w-full" />
                <Skeleton className="h-72 w-full" />
              </div>
            ) : gscQuery.isError ? (
              <QueryErrorCard error={gscQuery.error} />
            ) : (
              <>
                <div className="grid gap-4 md:grid-cols-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm text-muted-foreground">Clicks</CardTitle>
                    </CardHeader>
                    <CardContent className="text-3xl font-bold">
                      {formatInt(gscQuery.data?.totals.clicks ?? 0)}
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm text-muted-foreground">Impressions</CardTitle>
                    </CardHeader>
                    <CardContent className="text-3xl font-bold">
                      {formatInt(gscQuery.data?.totals.impressions ?? 0)}
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm text-muted-foreground">CTR</CardTitle>
                    </CardHeader>
                    <CardContent className="text-3xl font-bold">
                      {formatPercent(gscQuery.data?.totals.ctr ?? 0)}
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm text-muted-foreground">Avg Position</CardTitle>
                    </CardHeader>
                    <CardContent className="text-3xl font-bold">
                      {formatPosition(gscQuery.data?.totals.position ?? 0)}
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Clicks Trend</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[320px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={gscQuery.data?.series ?? []}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="date"
                          tickFormatter={(value: string) => value.slice(5)}
                        />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="clicks"
                          stroke="var(--secondary)"
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <div className="grid gap-6 lg:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Top Queries</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Query</TableHead>
                            <TableHead className="w-[120px] text-right">Clicks</TableHead>
                            <TableHead className="w-[140px] text-right">Impressions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {gscQuery.data?.topQueries?.length ? (
                            gscQuery.data.topQueries.map((row) => (
                              <TableRow key={row.query}>
                                <TableCell className="text-sm">{row.query || "(not set)"}</TableCell>
                                <TableCell className="text-right font-mono text-xs">
                                  {formatInt(row.clicks)}
                                </TableCell>
                                <TableCell className="text-right font-mono text-xs">
                                  {formatInt(row.impressions)}
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={3} className="text-sm text-muted-foreground">
                                No query data found.
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Top Pages</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Page</TableHead>
                            <TableHead className="w-[120px] text-right">Clicks</TableHead>
                            <TableHead className="w-[140px] text-right">Impressions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {gscQuery.data?.topPages?.length ? (
                            gscQuery.data.topPages.map((row) => (
                              <TableRow key={row.page}>
                                <TableCell className="font-mono text-xs">
                                  {row.page || "(not set)"}
                                </TableCell>
                                <TableCell className="text-right font-mono text-xs">
                                  {formatInt(row.clicks)}
                                </TableCell>
                                <TableCell className="text-right font-mono text-xs">
                                  {formatInt(row.impressions)}
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={3} className="text-sm text-muted-foreground">
                                No page data found.
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

