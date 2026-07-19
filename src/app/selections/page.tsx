import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { SelectionsClient } from "@/components/content/selections-client";

import { getContentRepository } from "@/lib/content/content-repository";

export const metadata: Metadata = buildMetadata({
  title: "हमारे MPPSC टॉपर्स और सफल चयन सूची — आकार IAS",
  description: "आकार IAS के सफल अभ्यर्थियों एवं टॉपर्स की सूची। जानें कैसे हमारे मार्गदर्शन में छात्रों ने परीक्षा पास कर उत्कृष्ट रैंक हासिल की।",
  path: "/selections",
  keywords: ["Aakar IAS Toppers", "MPPSC Selection List", "UPSC Selected Candidates", "Aakar IAS Success Stories"],
});

export default async function SelectionsPage() {
  const repo = await getContentRepository();
  const selections = await repo.listToppers("hi");
  return <SelectionsClient locale="hi" initialSelections={selections} />;
}
