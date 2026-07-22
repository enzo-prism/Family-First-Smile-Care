import { Fragment } from "react";
import { Link } from "wouter";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import JsonLd from "@/components/seo/json-ld";

type BreadcrumbItemModel = {
  label: string;
  href?: string;
};

const getCanonicalHost = () => {
  const envHost = import.meta.env.VITE_CANONICAL_HOST;
  if (envHost) return envHost.replace(/\/$/, "");
  if (typeof window !== "undefined") return window.location.origin;
  return "https://famfirstsmile.com";
};

export default function PageBreadcrumbs({ items }: { items: BreadcrumbItemModel[] }) {
  if (!items.length) return null;

  const host = getCanonicalHost();
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${host}${item.href}` } : {}),
    })),
  };

  return (
    <div className="mb-8">
      <JsonLd data={breadcrumbSchema} />
      <Breadcrumb>
        <BreadcrumbList>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <Fragment key={`${item.label}-${index}`}>
                <BreadcrumbItem>
                  {item.href && !isLast ? (
                    <BreadcrumbLink asChild>
                      <Link href={item.href}>{item.label}</Link>
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
                {!isLast ? <BreadcrumbSeparator /> : null}
              </Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
