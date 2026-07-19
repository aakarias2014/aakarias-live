import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, GraduationCap, Sparkles, BookOpen } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo/metadata";

export const revalidate = 86400; // Cache for 24h since it's static placeholder

const ONE_DAY_EXAMS: Record<string, { title: string; desc: string }> = {
  mpsi: {
    title: "MPSI (MP Sub Inspector)",
    desc: "Complete study resources, mock tests, and live courses for the MP Sub Inspector (MPSI) exam.",
  },
  "mp-constable": {
    title: "MP Police Constable (MP Constable)",
    desc: "Syllabus guides, model question papers, and essential study materials for MP Police Constable recruitment.",
  },
  mptet: {
    title: "MPTET (Teacher Eligibility Test)",
    desc: "Targeted video lectures, syllabus details, and Mock Tests for MP Teacher Eligibility Test (Grades 1, 2, 3).",
  },
  ssc: {
    title: "SSC Preparation (CGL, CHSL, MTS)",
    desc: "High-quality practice papers, previous year questions, and courses aligned with the latest SSC patterns.",
  },
  railway: {
    title: "Railway Recruitment Exams (RRB)",
    desc: "Detailed study guides, GS prep material, and dynamic mock tests for RRB NTPC, Group D, and ALP.",
  },
  banking: {
    title: "Banking Exams (PO, Clerk, Specialist)",
    desc: "Quantitative aptitude, reasoning tricks, and English classes tailored for SBI, IBPS, and RBI exams.",
  },
  "esb-exams": {
    title: "ESB / MP Vyapam Exams",
    desc: "Focused subject guides, quizzes, and previous year exam notes for Madhya Pradesh ESB exams.",
  },
  "other-govt-exams": {
    title: "Other Competitive Government Exams",
    desc: "General syllabus coverage, preparation strategies, and guidance for various State and Central exams.",
  },
};

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(ONE_DAY_EXAMS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const exam = ONE_DAY_EXAMS[slug];
  if (!exam) return buildMetadata();

  return buildMetadata({
    title: `${exam.title} Exam Prep | Aakar IAS`,
    description: `${exam.desc} This page is currently being compiled and will be live shortly.`,
    path: `/en/one-day-exam/${slug}`,
    locale: "en",
  });
}

export default async function EnglishOneDayExamPage({ params }: Props) {
  const { slug } = await params;
  const exam = ONE_DAY_EXAMS[slug];

  if (!exam) {
    notFound();
  }

  return (
    <Section className="min-h-[80vh] flex items-center justify-center relative overflow-hidden bg-background">
      {/* Dynamic Ambient Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-primary/10 to-accent/5 rounded-full blur-3xl opacity-60 pointer-events-none" />

      <Container size="narrow" className="relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-xs mb-6 uppercase tracking-wider animate-pulse">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Coming Soon</span>
        </div>

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/5 border border-border/80 shadow-soft mb-8">
          <GraduationCap className="h-10 w-10 text-primary" />
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl leading-tight">
          {exam.title}
        </h1>

        <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          {exam.desc}
        </p>

        {/* Coming Soon Premium Info Block */}
        <div className="mt-10 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-md p-6 max-w-md mx-auto text-left flex gap-4 shadow-soft">
          <div className="h-10 w-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
            <Clock className="h-5 w-5 animate-spin-slow" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-foreground">Content Under Development</h3>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
              Our subject matter experts are currently compiling premium online courses, mock test series, and comprehensive study notes for this exam.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button size="lg" className="rounded-full shadow-soft" asChild>
            <Link href="/en">
              <ArrowLeft className="mr-2 h-4 w-4" /> Go to Homepage
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="rounded-full" asChild>
            <Link href="/en/online-courses">
              <BookOpen className="mr-2 h-4 w-4 text-primary" /> Explore Courses
            </Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
