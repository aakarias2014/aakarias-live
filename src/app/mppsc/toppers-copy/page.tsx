import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { ToppersLibrary } from "@/components/toppers/toppers-library";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, jsonLdGraph } from "@/lib/seo/jsonld";
import { siteConfig } from "@/lib/site-config";
import { getContentRepository } from "@/lib/content/content-repository";

export const metadata: Metadata = buildMetadata({
  title: "MPPSC टॉपर्स आंसर कॉपियां – मुख्य परीक्षा उत्तर लेखन पुस्तकालय",
  description:
    "MPPSC राज्य सेवा परीक्षा के सफल अभ्यर्थियों (टॉपर्स) की वास्तविक उत्तर पुस्तिकाएं (Answer Copies) मुफ्त डाउनलोड करें। उत्तर संरचना, चित्र और केस स्टडी प्रस्तुति रणनीतियाँ सीखें।",
  path: "/mppsc/toppers-copy",
  keywords: [
    "MPPSC Toppers Copy",
    "MPPSC Toppers Answer Sheets",
    "टॉपर उत्तर पुस्तिकाएं",
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
