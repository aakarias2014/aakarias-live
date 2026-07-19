import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumb } from "@/components/content/breadcrumb";
import { OnlineCoursesClient } from "./online-courses-client";
import { DownloadAppSection } from "@/components/sections/download-app-section";

import { getContentRepository } from "@/lib/content/content-repository";

export const metadata: Metadata = buildMetadata({
  title: "ऑनलाइन कोर्सेज & लाइव क्लासेस",
  description: "आकार आईएएस (Aakar IAS) के ऑनलाइन कोर्सेज, लाइव और रिकॉर्डेड कक्षाएं, दैनिक करेंट अफेयर्स और व्यक्तिगत मेंटरशिप प्रोग्राम।",
  path: "/online-courses",
});

export default async function OnlineCoursesPage() {
  const repo = await getContentRepository();
  const [faculties, onlineCourses, brochureUrl, ads] = await Promise.all([
    repo.listFaculties("hi"),
    repo.listOnlineCourses("hi"),
    repo.getOfflineBrochureUrl(),
    repo.listAds("hi"),
  ]);

  return (
    <>
      {/* Page Header with Breadcrumb */}
      <Section className="pb-0 pt-8">
        <Container size="wide">
          <Breadcrumb items={[{ name: "Online Courses", href: "/online-courses" }]} />
          <div className="mt-6">
            <h1 className="text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl font-devanagari">
              ऑनलाइन कक्षाएं (Online Classroom Program)
            </h1>
            <p className="mt-2 max-w-3xl text-lg text-muted-foreground font-devanagari">
              भारत के सर्वश्रेष्ठ शिक्षकों द्वारा लाइव और रिकॉर्डेड कोर्सेज और अध्ययन सामग्री।
            </p>
          </div>
        </Container>
      </Section>

      {/* Main Interactive Online Courses Content */}
      <OnlineCoursesClient faculties={faculties} onlineCourses={onlineCourses} brochureUrl={brochureUrl || undefined} ads={ads} />

      {/* Download App CTA */}
      <DownloadAppSection locale="hi" />
    </>
  );
}
