import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { ToppersLibrary } from "@/components/toppers/toppers-library";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, jsonLdGraph } from "@/lib/seo/jsonld";
import { siteConfig } from "@/lib/site-config";
import { getContentRepository } from "@/lib/content/content-repository";

export const metadata: Metadata = buildMetadata({
  title: "MPPSC Mains Paper with Answer (Solved Papers & Toppers Copies) | Aakar IAS",
  description:
    "MPPSC मुख्य परीक्षा के हल किए गए प्रश्न पत्र (Mains Solved Papers with Model Answers) और MPPSC टॉपर्स की उत्तर पुस्तिकाएं (Answer Copies) मुफ़्त PDF डाउनलोड करें।",
  path: "/mppsc/toppers-copy",
  keywords: [
    "mppsc mains paper with answer",
    "MPPSC Mains Solved Papers",
    "MPPSC Toppers Copy",
    "MPPSC Toppers Answer Sheets",
    "MPPSC मुख्य परीक्षा उत्तर लेखन",
    "MPPSC Mains Answer Writing",
  ],
});

export default async function MppscToppersCopyPage() {
  const pageUrl = `${siteConfig.url}/mppsc/toppers-copy`;

  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    { name: "MPPSC", url: `${siteConfig.url}/mppsc` },
    { name: "Toppers Copy", url: pageUrl },
  ]);

  const repository = await getContentRepository();
  const sanityCopies = await repository.listTopperCopies("hi").catch(() => []);

  return (
    <>
      <ToppersLibrary locale="hi" sanityCopies={sanityCopies} />
      <JsonLd data={jsonLdGraph([breadcrumb])} />
    </>
  );
}
