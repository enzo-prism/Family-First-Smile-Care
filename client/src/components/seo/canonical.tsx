import { Helmet } from "react-helmet-async";
import { useLocation } from "wouter";
import { resolveCanonicalPath } from "@shared/seo";

const getCanonicalHost = () => {
  const envHost = import.meta.env.VITE_CANONICAL_HOST;
  if (envHost) return envHost.replace(/\/$/, "");
  if (typeof window !== "undefined") return window.location.origin;
  return "https://famfirstsmile.com";
};

export default function Canonical() {
  const [location] = useLocation();
  const host = getCanonicalHost();
  const path = resolveCanonicalPath(location);
  const canonicalUrl = `${host}${path === "/" ? "/" : path}`;

  return (
    <Helmet>
      <link rel="canonical" href={canonicalUrl} />
    </Helmet>
  );
}
