import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { getContentRepository } from "@/lib/content/content-repository";
import { FacultyClient } from "@/components/content/faculty-client";

export const metadata: Metadata = buildMetadata({
  title: "हमारे शिक्षक व फैकल्टी सदस्य | Aakar IAS",
  description: "आकार आईएएस के अनुभवी शिक्षकों और वरिष्ठ मेंटर्स की टीम से मिलें। उत्कृष्ट मार्गदर्शन और व्यापक अनुभव।",
  path: "/faculty",
});

export default async function FacultyPage() {
  const repo = await getContentRepository();
  const faculties = await repo.listFaculties("hi");

  return <FacultyClient faculties={faculties || []} locale="hi" />;
}
