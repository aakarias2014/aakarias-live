import Link from "next/link";
import Image from "next/image";
import { JsonLd } from "@/components/seo/json-ld";
import { homepageJsonLd, jsonLdGraph } from "@/lib/seo/jsonld";
import { ArrowRight, Download, FileText, Monitor, Users, Award, BookOpen, Brain, Trophy, ChevronRight, HelpCircle, CheckCircle2, Play, Tv, ExternalLink, Eye, Calendar, MessageSquare, Bell, CalendarDays, GraduationCap } from "lucide-react";
import { getContentRepository } from "@/lib/content/content-repository";
import { buildMetadata, formatDate } from "@/lib/seo/metadata";
import { getAllArticleQuizzesAction } from "@/actions/current-affairs";
import { QuizListView } from "@/components/quiz/quiz-list-view";
import type { ExamCalendar } from "@/lib/content/types";
import { siteConfig } from "@/lib/site-config";
import { getChannelStats, getLatestVideos, getPopularVideos } from "@/lib/services/youtube";

import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { ArticleCard } from "@/components/content/article-card";
import { PdfCard } from "@/components/content/pdf-card";
import { BookCard } from "@/components/content/book-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { AnimatedSection } from "@/components/ui/animated-section";
import { HeroSlider } from "@/components/sections/hero-slider";
import { BatchesShowcase } from "@/components/sections/batches-showcase";
import { DownloadAppSection } from "@/components/sections/download-app-section";
import { Countdown } from "@/components/content/countdown";
import { NoticeTicker } from "@/components/layout/notice-ticker";

export const revalidate = 900; // 15 min ISR

export const metadata = buildMetadata({
  title: "Aakar IAS — Best MPPSC, MPSI & UPSC Coaching Institute in Indore, India",
  description: "Aakar IAS Indore — India's top coaching institute for MPPSC, MPSI & UPSC CSE. Online/offline courses, mock test series, daily current affairs, free PDF notes & 5000+ selections.",
  path: "/en",
  keywords: [
    "Aakar IAS",
    "MPPSC coaching",
    "MPPSC coaching Indore",
    "MPSI coaching",
    "MPSI coaching Indore",
    "UPSC coaching",
    "UPSC coaching Indore",
    "best IAS coaching Indore",
    "best MPPSC coaching institute",
    "MPSI preparation online",
    "IAS coaching institute",
    "civil services coaching",
    "UPSC preparation online",
    "MPPSC preparation",
    "current affairs UPSC MPPSC MPSI",
    "UPSC online coaching",
    "MPPSC online classes",
    "UPSC test series",
    "MPPSC test series",
    "MPSI test series",
    "free UPSC PDF notes",
    "UPSC notes Hindi English",
    "civil services exam coaching",
  ],
});

export default async function EnglishHomePage() {
  const repo = await getContentRepository();
  const homeConfig = await repo.getHomeConfig("en");
  const mainYoutubeChannelId = homeConfig?.mainYoutubeChannelId;

  const [
    onlineCourses,
    offlineBatches,
    toppers,
    latestArticles,
    latestStaticGk,
    faqs,
    pdfs,
    youtubeStats,
    youtubeVideos,
    youtubePopularVideos,
    testSeries,
    publications,
    notifications,
    faculties,
    examsData,
    quizzes,
  ] = await Promise.all([
    repo.listOnlineCourses("en"),
    repo.listOfflineBatches("en"),
    repo.listToppers("en"),
    repo.listArticles({ locale: "en", page: 1, pageSize: 3 }),
    repo.listArticles({ locale: "en", contentType: "staticGk", page: 1, pageSize: 3 }),
    repo.listGlobalFaqs("en"),
    repo.listMonthlyPdfs("en", undefined, 4),
    getChannelStats(mainYoutubeChannelId),
    getLatestVideos(3, mainYoutubeChannelId),
    getPopularVideos(3, mainYoutubeChannelId),
    repo.listTestSeries("en"),
    repo.listPublications("en"),
    repo.listNotifications("en"),
    repo.listFaculties("en"),
    repo.listExamCalendar("en"),
    getAllArticleQuizzesAction("en"),
  ]);

  const fallbackExams: ExamCalendar[] = [
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
      dateText: "June 20, 2027",
      status: "upcoming",
      isPrimaryCountdown: false,
      description: "Madhya Pradesh PSC is expected to conduct its state services preliminary exam in late June."
    },
    {
      id: "mppsc-mains-2026",
      name: "MPPSC State Service Mains Exam 2026",
      examDate: "2026-09-07T10:00:00Z",
      dateText: "September 7 - 12, 2026",
      status: "upcoming",
      isPrimaryCountdown: true,
      description: "Madhya Pradesh Public Service Commission (MPPSC) will conduct the State Service Mains Examination 2026 from September 7 to September 12, 2026."
    }
  ];

  const exams = examsData && examsData.length > 0 ? examsData : fallbackExams;

  // Find primary countdown target
  const primaryExam = exams.find((e) => e.isPrimaryCountdown) || exams.find((e) => e.status === "upcoming") || exams[0];
  const countdownDate = primaryExam?.examDate || "2027-05-23T09:30:00Z";
  const countdownTitle = primaryExam?.name || "UPSC Civil Services Prelims 2027";

  const previewExams = exams.filter((e) => e.status !== "completed").slice(0, 2);
  const displayPreviewExams = previewExams.length > 0 ? previewExams : exams.slice(0, 2);

  let notices = await repo.getHomeNotices("en");
  if (notices.length === 0 && homeConfig?.noticeTicker) {
    notices = [
      {
        id: "fallback",
        noticeTextHi: homeConfig.noticeTicker,
        noticeTextEn: homeConfig.noticeTicker,
        noticeText: homeConfig.noticeTicker,
        noticeLink: homeConfig.noticeLink,
        isActive: true,
        orderIndex: 0,
      },
    ];
  }

  const stats = [
    { title: "Total Channels", val: "5", icon: <Tv className="h-5 w-5 text-primary" /> },
    { title: "Total Videos", val: youtubeStats.videoCount, icon: <Play className="h-5 w-5 text-primary" /> },
    { title: "Subscribers", val: youtubeStats.subscriberCount, icon: <ExternalLink className="h-5 w-5 text-primary" /> },
    { title: "Total Views", val: youtubeStats.viewCount, icon: <Eye className="h-5 w-5 text-primary" /> },
  ];

  const staticChannels = [
    {
      name: "Aakar IAS",
      subscribers: "136k subscribers",
      url: "https://www.youtube.com/@AakarIAS",
      avatar: youtubeStats.avatarUrl || null,
    },
    {
      name: "Aakar IAS English",
      subscribers: "1.68k subscribers",
      url: "https://www.youtube.com/@AakarIASEnglish",
      avatar: youtubeStats.avatarUrl || null,
    },
    {
      name: "Ateet Gatha – Atharv Tiwari",
      subscribers: "4.17k subscribers",
      url: "https://www.youtube.com/@AteetGathabyAtharvTiwari",
      avatar: "/images/directors/atharv.png",
    },
    {
      name: "Aakar Education",
      subscribers: "1.61k subscribers",
      url: "https://www.youtube.com/@AakarEducation-q3c",
      avatar: youtubeStats.avatarUrl || null,
    },
    {
      name: "Aakar- UGC NET & AP",
      subscribers: "30 subscribers",
      url: "https://www.youtube.com/@AakarUGCNETAP",
      avatar: youtubeStats.avatarUrl || null,
    },
  ];

  const channels = homeConfig?.youtubeChannels && homeConfig.youtubeChannels.length > 0
    ? homeConfig.youtubeChannels.map(ch => ({
        name: ch.title,
        subscribers: ch.subscribers,
        url: ch.url,
        avatar: ch.avatarUrl || youtubeStats.avatarUrl || null,
      }))
    : staticChannels;

  // ─── Build homepage JSON-LD ────────────────────────────────────────
  const courseItems = [
    ...(onlineCourses || []).slice(0, 4).map((c) => ({
      name: c.titleEn || c.titleHi,
      url: `${siteConfig.url}/en/online-courses`,
      description: c.descriptionEn || c.descriptionHi || undefined,
    })),
    ...(offlineBatches || []).slice(0, 2).map((b) => ({
      name: b.titleEn || b.titleHi,
      url: `${siteConfig.url}/en/offline-courses`,
      description: b.descriptionEn || b.descriptionHi || undefined,
    })),
    ...(testSeries || []).slice(0, 2).map((ts) => ({
      name: ts.titleEn || ts.titleHi,
      url: `${siteConfig.url}/en/test-series`,
      description: ts.descriptionEn || ts.descriptionHi || undefined,
    })),
  ];

  const faqItems = (faqs || []).slice(0, 6).map((f) => ({
    question: f.question,
    answer: f.answer,
  }));

  const hpSchemas = homepageJsonLd({
    faqs: faqItems,
    courses: courseItems,
    locale: "en",
  });

  return (
    <>
      {/* ─── Homepage Structured Data ──────────────────────────────────── */}
      <JsonLd data={jsonLdGraph(hpSchemas)} />

      {/* ─── SEO: Visually-hidden H1 for heading hierarchy ────────────── */}
      <h1 className="sr-only">Aakar IAS — Best MPPSC, MPSI &amp; UPSC Coaching Institute in Indore, India</h1>

      {/* ─── Hero Slider ────────────────────────────────────────────────── */}
      <HeroSlider slides={homeConfig?.heroSlides} locale="en" />

      {/* ─── Notice Ticker Bar ────────────────────────────────────────── */}
      <NoticeTicker notices={notices} label="LATEST NOTICE" />

      {/* ─── Quick Nav Icons Grid ──────────────────────────────────────── */}
      <Section className="py-12 md:py-16">
        <Container size="wide">
          <AnimatedSection variant="stagger-container" className="grid gap-5 grid-cols-2 md:grid-cols-5">
            {/* Quick Link 1 */}
            <AnimatedSection variant="stagger-item">
              <Link href="/en/online-courses" className="group block rounded-3xl border border-border bg-card p-6 text-center hover:border-primary/30 hover:shadow-soft transition-all duration-300">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                  <Monitor className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-sm font-extrabold text-foreground">Online Courses</h3>
                <p className="mt-1 text-[11px] text-muted-foreground line-clamp-1">Live & Recorded Batches</p>
              </Link>
            </AnimatedSection>
            {/* Quick Link 2 */}
            <AnimatedSection variant="stagger-item">
              <Link href="/en/offline-courses" className="group block rounded-3xl border border-border bg-card p-6 text-center hover:border-primary/30 hover:shadow-soft transition-all duration-300">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                  <Users className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-sm font-extrabold text-foreground">Offline Classes</h3>
                <p className="mt-1 text-[11px] text-muted-foreground line-clamp-1">Indore Head Office Center</p>
              </Link>
            </AnimatedSection>
            {/* Quick Link 3 */}
            <AnimatedSection variant="stagger-item">
              <Link href="/en/test-series" className="group block rounded-3xl border border-border bg-card p-6 text-center hover:border-primary/30 hover:shadow-soft transition-all duration-300">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                  <FileText className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-sm font-extrabold text-foreground">Test Series</h3>
                <p className="mt-1 text-[11px] text-muted-foreground line-clamp-1">Mock Exam Programs</p>
              </Link>
            </AnimatedSection>
            {/* Quick Link 4 */}
            <AnimatedSection variant="stagger-item">
              <Link href="/en/daily-quiz" className="group block rounded-3xl border border-border bg-card p-6 text-center hover:border-primary/30 hover:shadow-soft transition-all duration-300">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                  <Brain className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-sm font-extrabold text-foreground">Daily Practice Quizzes</h3>
                <p className="mt-1 text-[11px] text-muted-foreground line-clamp-1">Self Assessment Tests</p>
              </Link>
            </AnimatedSection>
            {/* Quick Link 5 */}
            <AnimatedSection variant="stagger-item">
              <Link href="/en/monthly-pdf" className="group block rounded-3xl border border-border bg-card p-6 text-center hover:border-primary/30 hover:shadow-soft transition-all duration-300">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                  <Download className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-sm font-extrabold text-foreground">Free Downloads</h3>
                <p className="mt-1 text-[11px] text-muted-foreground line-clamp-1">Monthly Magazines & PDFs</p>
              </Link>
            </AnimatedSection>
          </AnimatedSection>
        </Container>
      </Section>

      {/* ─── Exam Notifications & Calendar Section ────────────────────── */}
      <Section className="bg-muted/10 border-t border-b border-border/40 py-12 md:py-16">
        <Container size="wide">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
            {/* Left: Exam Notifications */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center justify-between border-b border-border/60 pb-4">
                <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                  Aakar IAS Update
                </h3>
                <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 font-bold p-0 gap-1 hover:bg-transparent" asChild>
                  <Link href="/en/notifications">All Exam Notifications <ArrowRight className="h-4 w-4" /></Link>
                </Button>
              </div>

              {notifications && notifications.length > 0 ? (
                <div className="space-y-4">
                  {notifications.slice(0, 3).map((n) => (
                    <Card key={n.id} className="p-5 border border-border/70 hover:shadow-soft-lg transition-all duration-300">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between gap-2">
                          <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-extrabold uppercase border ${
                            n.status === "out"
                              ? "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20"
                              : n.status === "upcoming"
                                ? "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20"
                                : "bg-destructive/10 text-destructive border-destructive/20"
                          }`}>
                            {n.status === "out" ? "Active" : n.status === "upcoming" ? "Upcoming" : "Closed"}
                          </span>
                          {n.date && (
                            <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5 text-primary" />
                              {formatDate(n.date, "en")}
                            </span>
                          )}
                        </div>
                        <h4 className="text-sm font-bold text-foreground line-clamp-2 leading-relaxed">
                          <Link href={`/en/notifications/${n.id}`} className="hover:text-primary transition-colors">
                            {n.title}
                          </Link>
                        </h4>
                        <div className="pt-2">
                          <Button size="sm" variant="outline" className="rounded-full h-8 text-[11px] font-bold border-border/80 hover:border-primary/30 hover:bg-primary/5 text-muted-foreground hover:text-primary gap-1" asChild>
                            <Link href={`/en/notifications/${n.id}`}>
                              View Details <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No recent notifications available.</p>
              )}
            </div>

            {/* Right: Exam Calendar */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center justify-between border-b border-border/60 pb-4">
                <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                  Exams Notification
                </h3>
                <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 font-bold p-0 gap-1 hover:bg-transparent" asChild>
                  <Link href="/en/calendar">Full Calendar <ArrowRight className="h-4 w-4" /></Link>
                </Button>
              </div>

              <div className="space-y-4">
                {/* Countdown Card */}
                {primaryExam && (
                  <Countdown
                    targetDate={countdownDate}
                    title={countdownTitle}
                    locale="en"
                  />
                )}

                {/* Exam Dates Grid */}
                <div className="grid gap-3 sm:grid-cols-2">
                  {displayPreviewExams.map((exam) => {
                    const statusLabels = {
                      upcoming: "Upcoming Exam",
                      ongoing: "Ongoing Exam",
                      completed: "Completed Exam"
                    };
                    const statusColors = {
                      upcoming: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
                      ongoing: "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20",
                      completed: "bg-muted text-muted-foreground border-border"
                    };
                    return (
                      <Card key={exam.id} className="p-4 border border-border/70 flex flex-col justify-between hover:shadow-soft transition-all duration-300">
                        <div>
                          <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded border ${statusColors[exam.status] || statusColors.upcoming}`}>
                            {statusLabels[exam.status] || "Exam"}
                          </span>
                          <h4 className="text-xs font-bold text-foreground mt-2.5 leading-snug">{exam.name}</h4>
                        </div>
                        <p className="text-sm font-extrabold text-primary mt-3 flex items-center gap-1.5">
                          <CalendarDays className="h-4 w-4" /> {exam.dateText}
                        </p>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── Batches Showcase (Online & Offline Tabs) ───────────────────── */}
      <BatchesShowcase onlineCourses={onlineCourses} offlineBatches={offlineBatches} testSeries={testSeries} locale="en" />

      {/* ─── About Us Legacy Showcase ─────────────────────────────────── */}
      <Section className="bg-gradient-to-b from-card to-background py-16 md:py-24 border-t border-border/40">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left Text Column */}
            <AnimatedSection variant="slide-in" className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                <Award className="h-3.5 w-3.5" />
                About Aakar IAS
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
                Madhya Pradesh's Most Trusted Institute for Civil Services Exams
              </h2>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                For over 15+ years, Aakar IAS has stood as a beacon of academic excellence for UPSC and MPPSC aspirants in Madhya Pradesh. Under the supervision of expert educators, we aim not only to finish the syllabus but to nurture administrative intelligence, ethical behavior, and exceptional answer-writing skills.
              </p>
              <div className="grid gap-4 sm:grid-cols-2 pt-2">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-foreground">Expert Faculty Team</h4>
                    <p className="text-xs text-muted-foreground">Premier mentors with decades of combined teaching experience.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-foreground">High-Quality Bilingual Material</h4>
                    <p className="text-xs text-muted-foreground">Comprehensive, exam-aligned study notes in English and Hindi.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-foreground">Daily Answer Writing sessions</h4>
                    <p className="text-xs text-muted-foreground">Daily mock evaluation and personalized feedback for Mains.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-foreground">Legacy of Success</h4>
                    <p className="text-xs text-muted-foreground">Hundreds of selections in prestigious Deputy Collector & DSP ranks.</p>
                  </div>
                </div>
              </div>
              <div className="pt-4">
                <Button className="rounded-full px-6 font-bold" asChild>
                  <Link href="/en/about">Learn More About Us →</Link>
                </Button>
              </div>
            </AnimatedSection>
            {/* Right Stats Showcase */}
            <AnimatedSection variant="scale-in" className="lg:col-span-5">
              <div className="grid grid-cols-2 gap-4 bg-muted/20 p-6 sm:p-8 rounded-3xl border border-border/40">
                <div className="bg-card border border-border/30 p-5 rounded-2xl text-center shadow-soft">
                  <span className="text-3xl sm:text-4xl font-extrabold text-primary">15+</span>
                  <p className="text-[11px] text-muted-foreground font-bold uppercase tracking-wider mt-2">Years of Legacy</p>
                </div>
                <div className="bg-card border border-border/30 p-5 rounded-2xl text-center shadow-soft">
                  <span className="text-3xl sm:text-4xl font-extrabold text-primary">5000+</span>
                  <p className="text-[11px] text-muted-foreground font-bold uppercase tracking-wider mt-2">Selected Aspirants</p>
                </div>
                <div className="bg-card border border-border/30 p-5 rounded-2xl text-center shadow-soft">
                  <span className="text-3xl sm:text-4xl font-extrabold text-primary">20+</span>
                  <p className="text-[11px] text-muted-foreground font-bold uppercase tracking-wider mt-2">Expert Mentors</p>
                </div>
                <div className="bg-card border border-border/30 p-5 rounded-2xl text-center shadow-soft">
                  <span className="text-3xl sm:text-4xl font-extrabold text-primary">100%</span>
                  <p className="text-[11px] text-muted-foreground font-bold uppercase tracking-wider mt-2">Bilingual Classes</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </Container>
      </Section>

      {/* ─── Current Affairs Snippet Section ───────────────────────────── */}
      <Section
        title="Current Affairs Highlights"
        description="Exam-aligned daily current affairs analysis and news roundups."
        action={
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="outline" className="rounded-full" asChild>
              <Link href="/en/current-affairs/quiz">
                Current Affairs Quiz <Brain className="ml-1.5 h-4 w-4 text-primary" />
              </Link>
            </Button>
            <Button variant="outline" className="rounded-full" asChild>
              <Link href="/en/current-affairs">
                Go to Portal <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
          </div>
        }
      >
        <AnimatedSection variant="stagger-container" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latestArticles.items.map((article, i) => (
            <AnimatedSection key={article.id || `latest-${i}`} variant="stagger-item">
              <ArticleCard article={article} />
            </AnimatedSection>
          ))}
        </AnimatedSection>
      </Section>

      {/* ─── Current Affairs Quiz Section ──────────────────────────────── */}
      {quizzes && quizzes.length > 0 && (
        <Section
          title="Current Affairs Quiz"
          description="Practice daily current affairs questions to evaluate your preparation."
          className="bg-muted/10 border-t border-border/40"
          action={
            <Button variant="outline" className="rounded-full" asChild>
              <Link href="/en/current-affairs/quiz">
                View All Quizzes <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
          }
        >
          <div className="max-w-5xl mx-auto">
            <QuizListView quizzes={quizzes.slice(0, 3)} locale="en" />
          </div>
        </Section>
      )}

      {/* ─── General Studies Snippet Section ───────────────────────────── */}
      {latestStaticGk.items.length > 0 && (
        <Section
          title="General Studies"
          description="Important reference topics in History, Geography, Polity, Science, and General Studies."
          className="bg-muted/10 border-t border-border/40"
          action={
            <Button variant="outline" className="rounded-full" asChild>
              <Link href="/en/general-awareness">
                Go to General Studies Portal <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
          }
        >
          <AnimatedSection variant="stagger-container" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestStaticGk.items.map((article, i) => (
              <AnimatedSection key={article.id || `static-gk-${i}`} variant="stagger-item">
                <ArticleCard article={article} />
              </AnimatedSection>
            ))}
          </AnimatedSection>
        </Section>
      )}

      {/* ─── Free PDF Library Preview ─────────────────────────────────── */}
      {pdfs.length > 0 && (
        <Section
          title="Free PDF Library & Material"
          description="Syllabus guides, essential study notes, and previous year question papers."
          className="bg-background border-t border-border/40"
          action={
            <Button variant="ghost" asChild>
              <Link href="/en/free-pdf">
                Free UPSC MPPSC Study PDFs <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          }
        >
          <AnimatedSection variant="stagger-container" className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {pdfs.map((pdf) => (
              <AnimatedSection key={pdf.id} variant="stagger-item">
                <PdfCard pdf={pdf} locale="en" />
              </AnimatedSection>
            ))}
          </AnimatedSection>
        </Section>
      )}

      {/* ─── Publications Showcase Section ──────────────────────────────── */}
      {publications.length > 0 && (
        <Section
          title="Our Publications"
          description="Specially curated books by Aakar IAS for Civil Services preparation."
          className="bg-muted/10 border-t border-border/40"
          action={
            <Button variant="ghost" asChild>
              <Link href="/en/publications">
                View All Books <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          }
        >
          <AnimatedSection variant="stagger-container" className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {publications.slice(0, 4).map((pub) => (
              <AnimatedSection
                key={pub.id}
                variant="stagger-item"
              >
                <BookCard pub={pub} locale="en" />
              </AnimatedSection>
            ))}
          </AnimatedSection>
        </Section>
      )}

      {toppers.length > 0 && (
        <Section
          title="Selections & Wall of Fame"
          description="Selected aspirants in UPSC Civil Services & MPPSC State Services from Aakar IAS."
          className="bg-muted/10 border-t border-border/40"
        >
          <Container size="wide">
            <AnimatedSection variant="stagger-container" className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
              {toppers.slice(0, 4).map((topper) => (
                <AnimatedSection
                  key={topper.id}
                  variant="stagger-item"
                  className="group rounded-3xl border border-border bg-card p-5 text-center shadow-soft hover:shadow-soft-lg transition-all duration-300"
                >
                  <div className="relative mx-auto h-32 w-32 sm:h-36 sm:w-36 overflow-hidden rounded-full border-4 border-primary/20 bg-muted">
                    {topper.avatar ? (
                      <Image
                        src={topper.avatar}
                        alt={`Aakar IAS Selected Candidate ${topper.nameEn || topper.name} - ${topper.exam} Rank ${topper.rank}`}
                        fill
                        sizes="144px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-primary-foreground bg-primary/20">
                        <Trophy className="h-10 w-10 text-primary" />
                      </div>
                    )}
                  </div>
                  <h3 className="mt-4 text-base font-extrabold text-foreground">{topper.nameEn || topper.name}</h3>
                  <p className="text-xs font-bold text-primary tracking-wide uppercase mt-1">
                    Rank {topper.rank}
                  </p>
                  {topper.postEn && (
                    <p className="text-[11px] font-semibold text-muted-foreground mt-0.5">
                      {topper.postEn}
                    </p>
                  )}
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    {topper.exam} ({topper.year})
                  </p>
                </AnimatedSection>
              ))}
            </AnimatedSection>
            <div className="text-center mt-10">
              <Button variant="outline" className="rounded-full" asChild>
                <Link href="/en/selections">
                  UPSC MPPSC Selected Candidates <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </Container>
        </Section>
      )}

      {/* ─── Faculty Showcase Section ─────────────────────────────────── */}
      {faculties && faculties.length > 0 && (
        <Section
          title="Our Expert Mentors"
          description="Meet our senior mentors and highly experienced faculty members at Aakar IAS."
          className="bg-background border-t border-border/40"
        >
          <Container size="wide">
            <AnimatedSection variant="stagger-container" className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {faculties.slice(0, 4).map((faculty) => {
                const name = faculty.nameEn || faculty.nameHi;
                const title = faculty.titleEn || faculty.titleHi;
                const desc = faculty.descEn || faculty.descHi;
                const nameEn = faculty.nameEn || "";
                const isDirector = nameEn.toLowerCase().includes("ashwini") || 
                                   nameEn.toLowerCase().includes("atharv") || 
                                   nameEn.toLowerCase().includes("gaurav");
                return (
                  <AnimatedSection
                    key={faculty.id}
                    variant="stagger-item"
                    className="relative group border border-border/60 rounded-3xl bg-card p-5 text-center shadow-soft hover:shadow-soft-lg hover:border-primary/20 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      {isDirector && (
                        <span className="absolute top-4 right-4 bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase text-primary tracking-wider z-10">
                          Director
                        </span>
                      )}
                      <div className="relative mx-auto h-32 w-32 sm:h-36 sm:w-36 overflow-hidden rounded-full border-4 border-primary/20 bg-muted">
                        {faculty.image ? (
                          <Image
                            src={faculty.image}
                            alt={`Aakar IAS Faculty ${name} - ${title}`}
                            fill
                            sizes="144px"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-primary-foreground bg-primary/20">
                            <GraduationCap className="h-10 w-10 text-primary" />
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="text-base font-extrabold text-foreground group-hover:text-primary transition-colors">{name}</h3>
                        <p className="text-xs font-bold text-primary tracking-wide uppercase mt-1">
                          {title}
                        </p>
                        {desc && (
                          <p className="text-[11px] text-muted-foreground mt-2 line-clamp-3 leading-relaxed">
                            {desc}
                          </p>
                        )}
                      </div>
                    </div>
                  </AnimatedSection>
                );
              })}
            </AnimatedSection>
            <div className="text-center mt-10">
              <Button variant="outline" className="rounded-full" asChild>
                <Link href="/en/faculty">
                  UPSC MPPSC Expert Faculty <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </Container>
        </Section>
      )}

      {/* ─── Free Video Classes & YouTube Stats (Media Center) ─────────── */}
      <Section
        title="Free Video Classes & Lectures"
        description="Key strategies, strategy sessions, and lecture classes for UPSC & MPPSC preparation."
        className="border-t border-border/40 bg-muted/5"
        action={
          <Button variant="ghost" asChild>
            <Link href="/en/media-center">
              Go to Media Center <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        }
      >
        <Container size="wide" className="space-y-10 p-0">
          {/* YouTube Stats Grid */}
          <AnimatedSection variant="fade-up" className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {stats.map((s, i) => (
              <div key={i} className="flex flex-col sm:flex-row items-center gap-4 bg-card border border-border/60 p-5 rounded-2xl shadow-soft">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  {s.icon}
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-[10px] sm:text-xs font-bold text-muted-foreground tracking-wide">{s.title}</p>
                  <p className="text-xl sm:text-2xl font-extrabold text-foreground mt-0.5">{s.val}</p>
                </div>
              </div>
            ))}
          </AnimatedSection>

          {/* YouTube Videos List */}
          {youtubeVideos.length > 0 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-extrabold text-foreground border-l-4 border-primary pl-4">
                  Latest Video Lectures on YouTube
                </h3>
                <p className="text-xs text-muted-foreground mt-1">Most recent video lectures for subject-wise preparation</p>
              </div>

              <AnimatedSection variant="stagger-container" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {youtubeVideos.map((video) => (
                  <AnimatedSection key={video.id} variant="stagger-item">
                    <Link href={`/en/media-center?tab=home&v=${video.id}`} className="group block cursor-pointer">
                      <div className="flex flex-col h-full justify-between bg-card border border-border/60 p-3.5 rounded-2xl shadow-soft hover:shadow-soft-lg transition-all duration-300">
                        <div className="space-y-3.5">
                          <div className="relative aspect-video rounded-xl overflow-hidden bg-muted border border-border/40">
                            {video.thumbnail ? (
                              <Image
                                src={video.thumbnail}
                                alt={video.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 380px"
                                className="object-cover transition-transform duration-500 group-hover:scale-103"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center bg-primary/5 text-primary/40">
                                <Play className="h-12 w-12" />
                              </div>
                            )}
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                                <Play className="h-6 w-6 fill-current ml-0.5" />
                              </div>
                            </div>
                          </div>
                          <h4 className="font-extrabold text-foreground text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                            {video.title}
                          </h4>
                        </div>
                        <div className="pt-3 border-t border-border/40 mt-4 flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                          <Calendar className="h-3.5 w-3.5 text-primary/60" />
                          {new Date(video.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                        </div>
                      </div>
                    </Link>
                  </AnimatedSection>
                ))}
              </AnimatedSection>
            </div>
          )}

          {/* YouTube Popular Videos List */}
          {youtubePopularVideos && youtubePopularVideos.length > 0 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-extrabold text-foreground border-l-4 border-primary pl-4">
                  Popular Video Lectures on YouTube
                </h3>
                <p className="text-xs text-muted-foreground mt-1">Most viewed and highly recommended video lectures</p>
              </div>

              <AnimatedSection variant="stagger-container" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {youtubePopularVideos.map((video) => (
                  <AnimatedSection key={video.id} variant="stagger-item">
                    <Link href={`/en/media-center?tab=home&v=${video.id}`} className="group block cursor-pointer">
                      <div className="flex flex-col h-full justify-between bg-card border border-border/60 p-3.5 rounded-2xl shadow-soft hover:shadow-soft-lg transition-all duration-300">
                        <div className="space-y-3.5">
                          <div className="relative aspect-video rounded-xl overflow-hidden bg-muted border border-border/40">
                            {video.thumbnail ? (
                              <Image
                                src={video.thumbnail}
                                alt={video.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 380px"
                                className="object-cover transition-transform duration-500 group-hover:scale-103"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center bg-primary/5 text-primary/40">
                                <Play className="h-12 w-12" />
                              </div>
                            )}
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                                <Play className="h-6 w-6 fill-current ml-0.5" />
                              </div>
                            </div>
                          </div>
                          <h4 className="font-extrabold text-foreground text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                            {video.title}
                          </h4>
                        </div>
                        <div className="pt-3 border-t border-border/40 mt-4 flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                          <Calendar className="h-3.5 w-3.5 text-primary/60" />
                          {new Date(video.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                        </div>
                      </div>
                    </Link>
                  </AnimatedSection>
                ))}
              </AnimatedSection>
            </div>
          )}

          {/* ─── Our Channels Grid ────────────────────────────────────────── */}
          <div className="pt-10 border-t border-border/40 mt-10">
            <div className="text-center md:text-left mb-8">
              <h3 className="text-lg font-extrabold text-foreground border-l-4 border-primary pl-4">
                Our YouTube Channels
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                Connect with our dedicated YouTube channels for targeted exam and subject preparation.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 justify-center">
              {channels.map((ch, idx) => (
                <div key={idx} className="flex flex-col items-center text-center p-5 rounded-2xl bg-card border border-border/65 hover:border-primary/20 hover:shadow-soft transition-all duration-300">
                  {/* Circular Avatar */}
                  <div className="relative h-20 w-20 sm:h-24 sm:w-24 overflow-hidden rounded-full border border-border bg-muted flex items-center justify-center">
                    {ch.avatar ? (
                      <Image
                        src={ch.avatar}
                        alt={ch.name}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/15 text-primary">
                        <span className="text-xl sm:text-2xl font-black">आ</span>
                      </div>
                    )}
                  </div>
                  {/* Title */}
                  <h4 className="mt-4 text-xs sm:text-sm font-extrabold text-foreground leading-snug line-clamp-2 h-10 flex items-center justify-center">
                    {ch.name}
                  </h4>
                  {/* Subscriber count */}
                  <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">
                    {ch.subscribers}
                  </p>
                  {/* Subscribe Button */}
                  <Button size="xs" variant="outline" className="mt-4 rounded-full text-[10px] font-bold uppercase tracking-wider px-4" asChild>
                    <a href={ch.url} target="_blank" rel="noopener noreferrer">
                      Subscribe
                    </a>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── FAQs ────────────────────────────────────────────────────── */}
      {faqs.length > 0 && (
        <Section title="Frequently Asked Questions (FAQ)" description="Common queries regarding our online courses and admission parameters.">
          <Container size="narrow">
            <AnimatedSection variant="fade-up">
              <Accordion type="single" collapsible className="w-full border border-border rounded-3xl bg-card p-6 shadow-soft">
                {faqs.slice(0, 6).map((faq, i) => (
                  <AccordionItem key={faq.id || `faq-${i}`} value={faq.id || `faq-${i}`} className="border-b border-border/40 py-1 last:border-0">
                    <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary hover:no-underline py-4">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pb-4 pt-1">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </AnimatedSection>
          </Container>
        </Section>
      )}

      {/* ─── Download Mobile App Section ──────────────────────────────── */}
      <DownloadAppSection locale="en" />
    </>
  );
}
