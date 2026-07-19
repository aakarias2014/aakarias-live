import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumb } from "@/components/content/breadcrumb";
import { Countdown } from "@/components/content/countdown";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, collectionPageJsonLd, jsonLdGraph } from "@/lib/seo/jsonld";
import { siteConfig } from "@/lib/site-config";
import { getContentRepository } from "@/lib/content/content-repository";
import type { ExamCalendar } from "@/lib/content/types";

export const revalidate = 600; // 10 min ISR

export const metadata: Metadata = buildMetadata({
  title: "Exam Calendar",
  description: "UPSC CSE and State PSC examinations calendar, scheduler, deadlines, exam dates and live countdowns.",
  path: "/en/calendar",
  keywords: ["UPSC Calendar 2027", "MPPSC Calendar 2027", "IAS exam dates"],
});

export default async function EnglishCalendarPage() {
  const repo = await getContentRepository();
  const examsData = await repo.listExamCalendar("en");

  const fallbackExams: ExamCalendar[] = [
    {
      id: "mppsc-mains-2026",
      name: "MPPSC State Service Mains Exam 2026",
      examDate: "2026-09-07T10:00:00Z",
      dateText: "September 7 - 12, 2026",
      status: "upcoming",
      isPrimaryCountdown: true,
      description: "Madhya Pradesh Public Service Commission (MPPSC) will conduct the State Service Mains Examination 2026 from September 7 to September 12, 2026."
    },
    {
      id: "upsc-prelims-2027",
      name: "UPSC Civil Services Prelims 2027",
      examDate: "2027-05-23T09:30:00Z",
      dateText: "May 23, 2027",
      status: "upcoming",
      isPrimaryCountdown: false,
      description: "UPSC will conduct the Civil Services (Preliminary) Examination 2027 on this date."
    },
    {
      id: "mppsc-prelims-2027",
      name: "MPPSC State Service Prelims 2027",
      examDate: "2027-06-20T09:30:00Z",
      dateText: "June 20, 2027 (Expected)",
      status: "upcoming",
      isPrimaryCountdown: false,
      description: "Madhya Pradesh PSC is expected to conduct its state services preliminary exam in late June."
    },
    {
      id: "upsc-mains-2027",
      name: "UPSC Civil Services Mains 2027",
      examDate: "2027-09-17T09:30:00Z",
      dateText: "From September 17, 2027",
      status: "upcoming",
      isPrimaryCountdown: false,
      description: "The Mains examination will be conducted over a period of 5 days."
    }
  ];

  const exams = examsData.length > 0 ? examsData : fallbackExams;

  // Find the primary countdown target (explicitly marked or the first upcoming exam)
  const primaryExam = exams.find((e) => e.isPrimaryCountdown) || exams.find((e) => e.status === "upcoming") || exams[0];
  const countdownDate = primaryExam?.examDate || "2027-05-23T09:30:00Z";
  const countdownTitle = primaryExam?.name || "UPSC Civil Services Prelims 2027";

  const statusConfig = {
    upcoming: {
      label: "Upcoming",
      color: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20"
    },
    ongoing: {
      label: "Ongoing / Active",
      color: "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20"
    },
    completed: {
      label: "Completed",
      color: "bg-muted text-muted-foreground border-border"
    }
  };

  const pageUrl = `${siteConfig.url}/en/calendar`;
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: `${siteConfig.url}/en` },
    { name: "Exam Calendar", url: pageUrl },
  ]);

  const collectionPage = collectionPageJsonLd({
    name: "Exam Calendar",
    description: "UPSC CSE and State PSC examinations calendar, scheduler, deadlines, exam dates and live countdowns.",
    url: pageUrl,
    inLanguage: "en-IN",
    items: exams.map((exam) => ({
      name: exam.name,
      url: pageUrl,
    })),
  });

  return (
    <>
      <Section className="pb-0 pt-8">
        <Container size="wide">
          <Breadcrumb items={[{ name: "Exam Calendar", href: "/en/calendar" }]} />
          <div className="mt-6">
            <h1 className="text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Civil Services Exam Calendar
            </h1>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              Keep track of official examination schedules, form registration deadlines, and live countdown timers for Civil Services exams.
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
              locale="en"
            />
          </Container>
        </Section>
      )}

      {/* Timeline Section */}
      <Section className="pt-2">
        <Container size="narrow">
          <h2 className="text-xl font-bold text-foreground mb-6">Upcoming Exam Dates</h2>
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
