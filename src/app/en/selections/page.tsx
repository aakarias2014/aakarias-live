import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { SelectionsClient } from "@/components/content/selections-client";

import { getContentRepository } from "@/lib/content/content-repository";

export const metadata: Metadata = buildMetadata({
  title: "Our MPPSC Toppers & Selections list — Aakar IAS Success Legacy",
  description: "Browse the list of successful selections and toppers from Aakar IAS. Learn how our classroom students achieved top ranks in UPSC & MPPSC.",
  path: "/en/selections",
  locale: "en",
  keywords: ["Aakar IAS Toppers", "MPPSC Selection List", "UPSC Selected Candidates", "Aakar IAS Success Stories"],
});

export default async function EnglishSelectionsPage() {
  const repo = await getContentRepository();
  const selections = await repo.listToppers("en");
  return <SelectionsClient locale="en" initialSelections={selections} />;
}
