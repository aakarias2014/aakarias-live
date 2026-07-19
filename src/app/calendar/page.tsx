import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumb } from "@/components/content/breadcrumb";
import { Countdown } from "@/components/content/countdown";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CalendarDays, Clock, MapPin, Bell } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, collectionPageJsonLd, jsonLdGraph } from "@/lib/seo/jsonld";
import { siteConfig } from "@/lib/site-config";
import { getContentRepository } from "@/lib/content/content-repository";
import type { ExamCalendar } from "@/lib/content/types";

export const revalidate = 600; // 10 min ISR

export const metadata: Metadata = buildMetadata({
  title: "परीक्षा कैलेंडर (Exam Calendar)",
  description: "यूपीएससी सिविल सेवा और एमपीपीएससी परीक्षाओं का पूर्ण कैलेंडर, समय-सारणी, परीक्षा तिथियां और उलटी गिनती (Countdown)।",
  path: "/calendar",
  keywords: ["UPSC Calendar 2027", "MPPSC Calendar 2027", "Exam dates", "परीक्षा तिथियां"],
});

export default async function CalendarPage() {
  const repo = await getContentRepository();
  const examsData = await repo.listExamCalendar("hi");

  const fallbackExams: ExamCalendar[] = [
    {
      id: "mppsc-mains-2026",
      name: "MPPSC State Service Mains Exam 2026",
      examDate: "2026-09-07T10:00:00Z",
      dateText: "07 सितंबर 2026 - 12 सितंबर 2026",
      status: "upcoming",
      isPrimaryCountdown: true,
      description: "मध्य प्रदेश लोक सेवा आयोग (MPPSC) द्वारा राज्य सेवा मुख्य परीक्षा 2026 का आयोजन 07 सितंबर से 12 सितंबर 2026 तक किया जाएगा।"
    },
    {
      id: "upsc-prelims-2027",
      name: "UPSC Civil Services Prelims 2027",
      examDate: "2027-05-23T09:30:00Z",
      dateText: "23 मई 2027",
      status: "upcoming",
      isPrimaryCountdown: false,
      description: "संघ लोक सेवा आयोग द्वारा सिविल सेवा परीक्षा (प्रारंभिक) 2027 का आयोजन इस दिन किया जाएगा।"
    },
    {
      id: "mppsc-prelims-2027",
      name: "MPPSC State Service Prelims 2027",
      examDate: "2027-06-20T09:30:00Z",
      dateText: "20 जून 2027 (संभावित)",
      status: "upcoming",
      isPrimaryCountdown: false,
      description: "मध्य प्रदेश लोक सेवा आयोग द्वारा राज्य सेवा परीक्षा (प्रारंभिक) 2027 का आयोजन किया जाना संभावित है।"
    },
    {
      id: "upsc-mains-2027",
      name: "UPSC Civil Services Mains 2027",
      examDate: "2027-09-17T09:30:00Z",
      dateText: "17 सितंबर 2027 से",
      status: "upcoming",
      isPrimaryCountdown: false,
      description: "मुख्य परीक्षा 5 दिनों की अवधि में आयोजित की जाएगी।"
    }
  ];

  const exams = examsData.length > 0 ? examsData : fallbackExams;

  // Find the primary countdown target (explicitly marked or the first upcoming exam)
  const primaryExam = exams.find((e) => e.isPrimaryCountdown) || exams.find((e) => e.status === "upcoming") || exams[0];
  const countdownDate = primaryExam?.examDate || "2027-05-23T09:30:00Z";
  const countdownTitle = primaryExam?.name || "UPSC सिविल सेवा प्रारंभिक परीक्षा 2027";

  const statusConfig = {
    upcoming: {
      label: "आगामी",
      color: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20"
    },
    ongoing: {
      label: "सक्रिय / जारी",
      color: "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20"
    },
    completed: {
      label: "संपन्न",
      color: "bg-muted text-muted-foreground border-border"
    }
  };

  const pageUrl = `${siteConfig.url}/calendar`;
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    { name: "Exam Calendar", url: pageUrl },
  ]);

  const collectionPage = collectionPageJsonLd({
    name: "परीक्षा कैलेंडर (Exam Calendar)",
    description: "यूपीएससी सिविल सेवा और एमपीपीएससी परीक्षाओं का पूर्ण कैलेंडर, समय-सारणी, परीक्षा तिथियां और उलटी गिनती (Countdown)।",
    url: pageUrl,
    inLanguage: "hi-IN",
    items: exams.map((exam) => ({
      name: exam.name,
      url: pageUrl,
    })),
  });

  return (
    <>
      <Section className="pb-0 pt-8">
        <Container size="wide">
          <Breadcrumb items={[{ name: "Exam Calendar" }]} />
          <div className="mt-6">
            <h1 className="text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              सिविल सेवा परीक्षा कैलेंडर
            </h1>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              यूपीएससी और एमपीपीएससी परीक्षाओं के लिए परीक्षा तिथियां, महत्वपूर्ण समय-सीमाएं और लाइव काउंटडाउन अलर्ट।
            </p>
          </div>
        </Container>
      </Section>

      {/* Countdown Section */}
      {primaryExam && (
        <Section>
          <Container size="narrow">
            <Countdown
              targetDate={countdownDate}
              title={countdownTitle}
              locale="hi"
            />
          </Container>
        </Section>
      )}

      {/* Timeline Section */}
      <Section className="pt-2">
        <Container size="narrow">
          <h2 className="text-xl font-bold text-foreground mb-6">महत्वपूर्ण परीक्षा तिथियां (Important Dates)</h2>
          <div className="relative border-l border-border pl-6 space-y-8 ml-3">
            {exams.map((exam) => {
              const config = statusConfig[exam.status] || statusConfig.upcoming;
              return (
                <div key={exam.id} className="relative">
                  <span className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-background border-2 border-primary">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  </span>

                  <Card className="p-5 shadow-soft border-border/60 hover:-translate-y-0.5 transition-transform duration-300">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h3 className="text-base font-bold text-foreground">{exam.name}</h3>
                      <Badge variant="outline" className={config.color}>
                        {config.label}
                      </Badge>
                    </div>
                    
                    <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                      <CalendarDays className="h-4 w-4 text-primary" />
                      <span className="font-semibold text-foreground">{exam.dateText}</span>
                    </div>

                    {exam.description && (
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                        {exam.description}
                      </p>
                    )}
                  </Card>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>
      <JsonLd data={jsonLdGraph([breadcrumb, collectionPage])} />
    </>
  );
}
