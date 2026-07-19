import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { ToppersLibrary } from "@/components/toppers/toppers-library";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, jsonLdGraph } from "@/lib/seo/jsonld";
import { siteConfig } from "@/lib/site-config";
import { getContentRepository } from "@/lib/content/content-repository";

export const metadata: Metadata = buildMetadata({
  title: "MPPSC Toppers Answer Copies – Mains Answer Writing Library",
  description:
    "Free download of actual answer scripts/copies of MPPSC toppers. Analyze their structure, presentation, maps, diagrams and strategy for General Studies papers.",
  path: "/en/mppsc/toppers-copy",
  locale: "en",
  keywords: [
    "MPPSC Toppers Copy",
    "MPPSC Toppers Answer Sheets",
    "Topper Answer Script",
    "MPPSC Mains Answer Writing",
    "Aakar IAS Topper Copies",
  ],
});

export default async function EnMppscToppersCopyPage() {
  const pageUrl = `${siteConfig.url}/en/mppsc/toppers-copy`;

  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: `${siteConfig.url}/en` },
    { name: "MPPSC", url: `${siteConfig.url}/en/mppsc` },
    { name: "Toppers Copy", url: pageUrl },
  ]);

  const repository = await getContentRepository();
  const sanityCopies = await repository.listTopperCopies("en").catch(() => []);

  return (
    <>
      <ToppersLibrary locale="en" sanityCopies={sanityCopies} />
      <JsonLd data={jsonLdGraph([breadcrumb])} />
    </>
  );
}
