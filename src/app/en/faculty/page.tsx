import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { getContentRepository } from "@/lib/content/content-repository";
import { FacultyClient } from "@/components/content/faculty-client";

export const metadata: Metadata = buildMetadata({
  title: "Our Mentors & Faculty Members | Aakar IAS",
  description: "Meet our highly experienced senior mentors and expert faculty members at Aakar IAS. Personal guidance for UPSC & MPPSC.",
  path: "/en/faculty",
  locale: "en",
});

export default async function EnglishFacultyPage() {
  const repo = await getContentRepository();
  const faculties = await repo.listFaculties("en");

  return <FacultyClient faculties={faculties || []} locale="en" />;
}
