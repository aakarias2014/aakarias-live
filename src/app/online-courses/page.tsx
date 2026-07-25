import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumb } from "@/components/content/breadcrumb";
import { OnlineCoursesClient } from "./online-courses-client";
import { DownloadAppSection } from "@/components/sections/download-app-section";

import { getContentRepository } from "@/lib/content/content-repository";

export const metadata: Metadata = buildMetadata({
  title: "MPPSC Online Coaching | ऑनलाइन कोर्स & लाइव क्लासेज | Best MPPSC Course Online | Aakar IAS Indore",
  description: "Aakar IAS — Best MPPSC Online Coaching. MPPSC ऑनलाइन कोर्स, लाइव क्लासेज, रिकॉर्डेड बैच, मेन्स आंसर राइटिंग, टेस्ट सीरीज़ और स्टडी मटेरियल। 5000+ छात्रों का भरोसा।",
  path: "/online-courses",
  keywords: [
    "MPPSC Online Coaching",
    "MPPSC Course Online",
    "MPPSC Online Course",
    "MPPSC Online Classes",
    "MPPSC Live Classes",
    "Best MPPSC Coaching",
    "Best MPPSC Coaching in MP",
    "MPPSC Coaching Online",
    "MPPSC Mains Online Course",
    "MPPSC Classes Online",
    "Best Online Coaching for MPPSC in Indore",
    "Aakar IAS Online Course",
    "Aakar IAS MPPSC Online Course Fees",
    "MPPSC Prelims Online Course",
    "MPPSC Mains Online Batch",
  ],
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
