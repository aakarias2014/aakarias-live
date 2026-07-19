import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumb } from "@/components/content/breadcrumb";
import { OnlineCoursesClient } from "./online-courses-client";
import { DownloadAppSection } from "@/components/sections/download-app-section";

import { getContentRepository } from "@/lib/content/content-repository";

export const metadata: Metadata = buildMetadata({
  title: "Online Courses & Live Classes",
  description: "Explore Aakar IAS online courses, live interactive classes, precise study materials, and customized mentorship programs.",
  path: "/en/online-courses",
});

export default async function EnglishOnlineCoursesPage() {
  const repo = await getContentRepository();
  const [faculties, onlineCourses, brochureUrl, ads] = await Promise.all([
    repo.listFaculties("en"),
    repo.listOnlineCourses("en"),
    repo.getOfflineBrochureUrl(),
    repo.listAds("en"),
  ]);

  return (
    <>
      {/* Page Header with Breadcrumb */}
      <Section className="pb-0 pt-8">
        <Container size="wide">
          <Breadcrumb items={[{ name: "Online Courses", href: "/en/online-courses" }]} />
          <div className="mt-6">
            <h1 className="text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Online Classroom Program
            </h1>
            <p className="mt-2 max-w-3xl text-lg text-muted-foreground">
              Live and recorded courses led by top civil services educators.
            </p>
          </div>
        </Container>
      </Section>

      {/* Main Interactive Online Courses Content */}
      <OnlineCoursesClient faculties={faculties} onlineCourses={onlineCourses} brochureUrl={brochureUrl || undefined} ads={ads} />

      {/* Download App CTA */}
      <DownloadAppSection locale="en" />
    </>
  );
}
