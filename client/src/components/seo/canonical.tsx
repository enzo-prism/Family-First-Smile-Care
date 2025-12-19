import { Helmet } from "react-helmet-async";
import { useLocation } from "wouter";
import { resolveCanonicalPath, resolvePageMeta } from "@shared/seo";

const getCanonicalHost = () => {
  const envHost = import.meta.env.VITE_CANONICAL_HOST;
  if (envHost) return envHost.replace(/\/$/, "");
  if (typeof window !== "undefined") return window.location.origin;
  return "https://famfirstsmile.com";
};

export default function SeoMeta() {
  const [location] = useLocation();
  const host = getCanonicalHost();
  const path = resolveCanonicalPath(location);
  const meta = resolvePageMeta(location);
  const canonicalUrl = `${host}${path === "/" ? "/" : path}`;

  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <link rel="canonical" href={canonicalUrl} />
    </Helmet>
  );
}
