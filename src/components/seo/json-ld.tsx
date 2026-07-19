import type { ReactNode } from "react";
import {
  organizationJsonLd,
  websiteJsonLd,
  jsonLdGraph,
} from "@/lib/seo/jsonld";

/**
 * Injects JSON-LD structured data via a script tag. Accepts either a single
 * object or an array.
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Global Organization + WebSite schema, mounted in the root layout.
 * Powers brand entity recognition + sitelinks search box in Google.
 */
export function OrganizationJsonLd(): ReactNode {
  return <JsonLd data={jsonLdGraph([organizationJsonLd(), websiteJsonLd()])} />;
}
