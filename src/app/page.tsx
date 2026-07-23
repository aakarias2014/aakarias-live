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
import { BookCard } from "@/components/content/book-card";
import { PdfCard } from "@/components/content/pdf-card";
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
  title: "Aakar IAS | MPPSC, UPSC Current Affairs, Daily News, Monthly PDF & Study Material",
  description: "Aakar IAS provides Daily Current Affairs, Weekly & Monthly Current Affairs, Editorials, Free PDFs, NCERT Notes and complete preparation resources for MPPSC, UPSC and other Government Exams.",
  path: "/",
  keywords: [
    "Aakar IAS",
    "Current Affairs",
    "करेंट अफेयर्स",
    "UPSC Current Affairs",
    "MPPSC Current Affairs",
    "Daily Current Affairs",
    "MPPSC coaching Indore",
    "UPSC coaching Indore",
    "IAS coaching institute",
    "civil services coaching",
    "Monthly Current Affairs PDF",
    "Free PDF UPSC",
    "NCERT Notes",
  ],
});

export default async function HomePage() {
  const repo = await getContentRepository();
  const homeConfig = await repo.getHomeConfig("hi");
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
    repo.listOnlineCourses("hi"),
    repo.listOfflineBatches("hi"),
    repo.listToppers("hi"),
    repo.listArticles({ locale: "hi", page: 1, pageSize: 3 }),
    repo.listArticles({ locale: "hi", contentType: "staticGk", page: 1, pageSize: 3 }),
    repo.listGlobalFaqs("hi"),
    repo.listMonthlyPdfs("hi", undefined, 4),
    getChannelStats(mainYoutubeChannelId),
    getLatestVideos(3, mainYoutubeChannelId),
    getPopularVideos(3, mainYoutubeChannelId),
    repo.listTestSeries("hi"),
    repo.listPublications("hi"),
    repo.listNotifications("hi"),
    repo.listFaculties("hi"),
    repo.listExamCalendar("hi"),
    getAllArticleQuizzesAction("hi"),
  ]);

  const fallbackExams: ExamCalendar[] = [
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
      dateText: "20 जून 2027",
      status: "upcoming",
      isPrimaryCountdown: false,
      description: "मध्य प्रदेश लोक सेवा आयोग द्वारा राज्य सेवा परीक्षा (प्रारंभिक) 2027 का आयोजन किया जाना संभावित है।"
    },
    {
      id: "mppsc-mains-2026",
      name: "MPPSC State Service Mains Exam 2026",
      examDate: "2026-09-07T10:00:00Z",
      dateText: "07 सितंबर 2026 - 12 सितंबर 2026",
      status: "upcoming",
      isPrimaryCountdown: true,
      description: "मध्य प्रदेश लोक सेवा आयोग (MPPSC) द्वारा राज्य सेवा मुख्य परीक्षा 2026 का आयोजन 07 सितंबर से 12 सितंबर 2026 तक किया जाएगा।"
    }
  ];

  const exams = examsData && examsData.length > 0 ? examsData : fallbackExams;

  // Find primary countdown target
  const primaryExam = exams.find((e) => e.isPrimaryCountdown) || exams.find((e) => e.status === "upcoming") || exams[0];
  const countdownDate = primaryExam?.examDate || "2027-05-23T09:30:00Z";
  const countdownTitle = primaryExam?.name || "UPSC सिविल सेवा प्रारंभिक परीक्षा 2027";

  const previewExams = exams.filter((e) => e.status !== "completed").slice(0, 2);
  const displayPreviewExams = previewExams.length > 0 ? previewExams : exams.slice(0, 2);

  let notices = await repo.getHomeNotices("hi");
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
    { title: "कुल चैनल्स (Total Channels)", val: "5", icon: <Tv className="h-5 w-5 text-primary" /> },
    { title: "कुल वीडियोस (Total Videos)", val: youtubeStats.videoCount, icon: <Play className="h-5 w-5 text-primary" /> },
    { title: "सब्सक्राइबर्स (Subscribers)", val: youtubeStats.subscriberCount, icon: <ExternalLink className="h-5 w-5 text-primary" /> },
    { title: "कुल व्यूज (Total Views)", val: youtubeStats.viewCount, icon: <Eye className="h-5 w-5 text-primary" /> },
  ];

  const staticChannels = [
    {
      nameHi: "Aakar IAS",
      subscribersHi: "136k सब्सक्राइबर्स",
      url: "https://www.youtube.com/@AakarIAS",
      avatar: youtubeStats.avatarUrl || null,
    },
    {
      nameHi: "Aakar IAS English",
      subscribersHi: "1.68k सब्सक्राइबर्स",
      url: "https://www.youtube.com/@AakarIASEnglish",
      avatar: youtubeStats.avatarUrl || null,
    },
    {
      nameHi: "अतीत गाथा – Atharv Tiwari",
      subscribersHi: "4.17k सब्सक्राइबर्स",
      url: "https://www.youtube.com/@AteetGathabyAtharvTiwari",
      avatar: "/images/directors/atharv.png",
    },
    {
      nameHi: "Aakar Education",
      subscribersHi: "1.61k सब्सक्राइबर्स",
      url: "https://www.youtube.com/@AakarEducation-q3c",
      avatar: youtubeStats.avatarUrl || null,
    },
    {
      nameHi: "Aakar- UGC NET & AP",
      subscribersHi: "30 सब्सक्राइबर्स",
      url: "https://www.youtube.com/@AakarUGCNETAP",
      avatar: youtubeStats.avatarUrl || null,
    },
  ];

  const channels = homeConfig?.youtubeChannels && homeConfig.youtubeChannels.length > 0
    ? homeConfig.youtubeChannels.map(ch => ({
        nameHi: ch.title,
        subscribersHi: ch.subscribers,
        url: ch.url,
        avatar: ch.avatarUrl || youtubeStats.avatarUrl || null,
      }))
    : staticChannels;

  // ─── Build homepage JSON-LD ────────────────────────────────────────
  const courseItems = [
    ...(onlineCourses || []).slice(0, 4).map((c) => ({
      name: c.titleHi || c.titleEn,
      url: `${siteConfig.url}/online-courses`,
      description: c.descriptionHi || c.descriptionEn || undefined,
    })),
    ...(offlineBatches || []).slice(0, 2).map((b) => ({
      name: b.titleHi || b.titleEn,
      url: `${siteConfig.url}/offline-courses`,
      description: b.descriptionHi || b.descriptionEn || undefined,
    })),
    ...(testSeries || []).slice(0, 2).map((ts) => ({
      name: ts.titleHi || ts.titleEn,
      url: `${siteConfig.url}/test-series`,
      description: ts.descriptionHi || ts.descriptionEn || undefined,
    })),
  ];

  const faqItems = (faqs || []).slice(0, 6).map((f) => ({
    question: f.question,
    answer: f.answer,
  }));

  const hpSchemas = homepageJsonLd({
    faqs: faqItems,
    courses: courseItems,
    locale: "hi",
  });

  return (
    <>
      {/* ─── Homepage Structured Data ──────────────────────────────────── */}
      <JsonLd data={jsonLdGraph(hpSchemas)} />

      {/* ─── SEO: Visually-hidden H1 for heading hierarchy ────────────── */}
      <h1 className="sr-only">आकार IAS — MPPSC, MPSI और UPSC के लिए भारत का सर्वश्रेष्ठ कोचिंग संस्थान, इंदौर</h1>

      {/* ─── Hero Slider ────────────────────────────────────────────────── */}
      <HeroSlider slides={homeConfig?.heroSlides} locale="hi" />

      {/* ─── Notice Ticker Bar ────────────────────────────────────────── */}
      <NoticeTicker notices={notices} label="नवीनतम सूचना (Notice)" />

      {/* ─── Quick Nav Icons Grid ──────────────────────────────────────── */}
      <Section className="py-12 md:py-16">
        <Container size="wide">
          <AnimatedSection variant="stagger-container" className="grid gap-5 grid-cols-2 md:grid-cols-5">
            {/* Quick Link 1 */}
            <AnimatedSection variant="stagger-item">
              <Link href="/online-courses" className="group block rounded-3xl border border-border bg-card p-6 text-center hover:border-primary/30 hover:shadow-soft transition-all duration-300">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                  <Monitor className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-sm font-extrabold text-foreground font-devanagari">ऑनलाइन कोर्सेज</h3>
                <p className="mt-1 text-[11px] text-muted-foreground line-clamp-1 font-devanagari">लाइव और रिकॉर्डेड कक्षाएं</p>
              </Link>
            </AnimatedSection>
            {/* Quick Link 2 */}
            <AnimatedSection variant="stagger-item">
              <Link href="/offline-courses" className="group block rounded-3xl border border-border bg-card p-6 text-center hover:border-primary/30 hover:shadow-soft transition-all duration-300">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                  <Users className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-sm font-extrabold text-foreground font-devanagari">ऑफलाइन कक्षाएं</h3>
                <p className="mt-1 text-[11px] text-muted-foreground line-clamp-1 font-devanagari">इंदौर हेड ऑफिस सेंटर</p>
              </Link>
            </AnimatedSection>
            {/* Quick Link 3 */}
            <AnimatedSection variant="stagger-item">
              <Link href="/test-series" className="group block rounded-3xl border border-border bg-card p-6 text-center hover:border-primary/30 hover:shadow-soft transition-all duration-300">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                  <FileText className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-sm font-extrabold text-foreground font-devanagari">मॉक टेस्ट सीरीज</h3>
                <p className="mt-1 text-[11px] text-muted-foreground line-clamp-1 font-devanagari">परीक्षा पैटर्न मॉक टेस्ट</p>
              </Link>
            </AnimatedSection>
            {/* Quick Link 4 */}
            <AnimatedSection variant="stagger-item">
              <Link href="/daily-quiz" className="group block rounded-3xl border border-border bg-card p-6 text-center hover:border-primary/30 hover:shadow-soft transition-all duration-300">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                  <Brain className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-sm font-extrabold text-foreground font-devanagari">डेली अभ्यास क्विज़</h3>
                <p className="mt-1 text-[11px] text-muted-foreground line-clamp-1 font-devanagari">स्व-मूल्यांकन हेतु क्विज़</p>
              </Link>
            </AnimatedSection>
            {/* Quick Link 5 */}
            <AnimatedSection variant="stagger-item" className="col-span-2 md:col-span-1">
              <Link href="/monthly-pdf" className="group block rounded-3xl border border-border bg-card p-6 text-center hover:border-primary/30 hover:shadow-soft transition-all duration-300">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                  <Download className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-sm font-extrabold text-foreground font-devanagari">फ्री पीडीएफ डाउनलोड</h3>
                <p className="mt-1 text-[11px] text-muted-foreground line-clamp-1 font-devanagari">मासिक पत्रिका और नोट्स</p>
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
                  <Link href="/notifications">सभी परीक्षा सूचनाएं देखें <ArrowRight className="h-4 w-4" /></Link>
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
                            {n.status === "out" ? "आवेदन जारी" : n.status === "upcoming" ? "आगामी" : "समाप्त"}
                          </span>
                          {n.date && (
                            <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5 text-primary" />
                              {formatDate(n.date, "hi")}
                            </span>
                          )}
                        </div>
                        <h4 className="text-sm font-bold text-foreground line-clamp-2 leading-relaxed">
                          <Link href={`/notifications/${n.id}`} className="hover:text-primary transition-colors">
                            {n.title}
                          </Link>
                        </h4>
                        <div className="pt-2">
                          <Button size="sm" variant="outline" className="rounded-full h-8 text-[11px] font-bold border-border/80 hover:border-primary/30 hover:bg-primary/5 text-muted-foreground hover:text-primary gap-1" asChild>
                            <Link href={`/notifications/${n.id}`}>
                              विवरण देखें <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">कोई नवीनतम सूचना उपलब्ध नहीं है।</p>
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
                  <Link href="/calendar">पूर्ण कैलेंडर <ArrowRight className="h-4 w-4" /></Link>
                </Button>
              </div>

              <div className="space-y-4">
                {/* Countdown Card */}
                {primaryExam && (
                  <Countdown
                    targetDate={countdownDate}
                    title={countdownTitle}
                    locale="hi"
                  />
                )}

                {/* Exam Dates Grid */}
                <div className="grid gap-3 sm:grid-cols-2">
                  {displayPreviewExams.map((exam) => {
                    const statusLabels = {
                      upcoming: "आगामी परीक्षा",
                      ongoing: "सक्रिय परीक्षा",
                      completed: "संपन्न परीक्षा"
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
                            {statusLabels[exam.status] || "परीक्षा"}
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
      <BatchesShowcase onlineCourses={onlineCourses} offlineBatches={offlineBatches} testSeries={testSeries} locale="hi" />

      {/* ─── About Us Legacy Showcase ─────────────────────────────────── */}
      <Section className="bg-gradient-to-b from-card to-background py-16 md:py-24 border-t border-border/40">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left Text Column */}
            <AnimatedSection variant="slide-in" className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                <Award className="h-3.5 w-3.5" />
                आकार IAS — एक परिचय
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground font-devanagari leading-tight">
                सिविल सेवा परीक्षाओं के लिए मध्य प्रदेश का सबसे विश्वसनीय संस्थान
              </h2>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-devanagari">
                विगत 15+ वर्षों से आकार IAS (Aakar IAS) मध्य प्रदेश में UPSC और MPPSC की तैयारी कर रहे अभ्यर्थियों के लिए सफलता का पर्याय रहा है। वरिष्ठ शिक्षकों के कुशल मार्गदर्शन में, हमारा उद्देश्य केवल पाठ्यक्रम पूरा कराना नहीं बल्कि प्रशासनिक दृष्टिकोण और उत्कृष्ट उत्तर लेखन कौशल विकसित करना है।
              </p>
              <div className="grid gap-4 sm:grid-cols-2 pt-2">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-foreground font-devanagari">अनुभवी शिक्षक टीम</h4>
                    <p className="text-xs text-muted-foreground font-devanagari">UPSC और MPPSC स्तर के सर्वश्रेष्ठ मेंटर्स।</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-foreground font-devanagari">द्विभाषी उत्कृष्ट नोट्स</h4>
                    <p className="text-xs text-muted-foreground font-devanagari">सरल और परीक्षा-उन्मुख हिंदी व अंग्रेजी अध्ययन सामग्री।</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-foreground font-devanagari">दैनिक उत्तर लेखन अभ्यास</h4>
                    <p className="text-xs text-muted-foreground font-devanagari">मुख्य परीक्षा के लिए दैनिक मूल्यांकन और फीडबैक।</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-foreground font-devanagari">सफल छात्रों की परंपरा</h4>
                    <p className="text-xs text-muted-foreground font-devanagari">सैकड़ों अभ्यर्थियों ने डिप्टी कलेक्टर और DSP पद प्राप्त किया।</p>
                  </div>
                </div>
              </div>
              <div className="pt-4">
                <Button className="rounded-full px-6 font-bold" asChild>
                  <Link href="/about">हमारे बारे में और जानें →</Link>
                </Button>
              </div>
            </AnimatedSection>
            {/* Right Stats Showcase */}
            <AnimatedSection variant="scale-in" className="lg:col-span-5">
              <div className="grid grid-cols-2 gap-4 bg-muted/20 p-6 sm:p-8 rounded-3xl border border-border/40">
                <div className="bg-card border border-border/30 p-5 rounded-2xl text-center shadow-soft">
                  <span className="text-3xl sm:text-4xl font-extrabold text-primary">15+</span>
                  <p className="text-[11px] text-muted-foreground font-bold uppercase tracking-wider mt-2 font-devanagari">वर्षों का अनुभव</p>
                </div>
                <div className="bg-card border border-border/30 p-5 rounded-2xl text-center shadow-soft">
                  <span className="text-3xl sm:text-4xl font-extrabold text-primary">5000+</span>
                  <p className="text-[11px] text-muted-foreground font-bold uppercase tracking-wider mt-2 font-devanagari">चयनित अभ्यर्थी</p>
                </div>
                <div className="bg-card border border-border/30 p-5 rounded-2xl text-center shadow-soft">
                  <span className="text-3xl sm:text-4xl font-extrabold text-primary">20+</span>
                  <p className="text-[11px] text-muted-foreground font-bold uppercase tracking-wider mt-2 font-devanagari">विषय विशेषज्ञ</p>
                </div>
                <div className="bg-card border border-border/30 p-5 rounded-2xl text-center shadow-soft">
                  <span className="text-3xl sm:text-4xl font-extrabold text-primary">100%</span>
                  <p className="text-[11px] text-muted-foreground font-bold uppercase tracking-wider mt-2 font-devanagari">द्विभाषी शिक्षण</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </Container>
      </Section>

      {/* ─── Current Affairs Snippet Section ───────────────────────────── */}
      <Section
        title="करेंट अफेयर्स हाइलाइट्स (Current Affairs)"
        description="सिविल सेवा परीक्षा के अनुकूल दैनिक करेंट अफेयर्स और विश्लेषण।"
        action={
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="outline" className="rounded-full" asChild>
              <Link href="/current-affairs/quiz">
                करेंट अफेयर्स क्विज़ <Brain className="ml-1.5 h-4 w-4 text-primary" />
              </Link>
            </Button>
            <Button variant="outline" className="rounded-full" asChild>
              <Link href="/current-affairs">
                करेंट अफेयर्स पोर्टल पर जाएं <ArrowRight className="ml-1.5 h-4 w-4" />
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
          title="करेंट अफेयर्स क्विज़ (Current Affairs Quiz)"
          description="दैनिक समसामयिकी के महत्वपूर्ण प्रश्नों पर आधारित अभ्यास क्विज़ हल करें।"
          className="bg-muted/10 border-t border-border/40"
          action={
            <Button variant="outline" className="rounded-full" asChild>
              <Link href="/current-affairs/quiz">
                सभी क्विज़ देखें <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
          }
        >
          <div className="max-w-5xl mx-auto">
            <QuizListView quizzes={quizzes.slice(0, 3)} locale="hi" />
          </div>
        </Section>
      )}

      {/* ─── General Studies Snippet Section ───────────────────────────── */}
      {latestStaticGk.items.length > 0 && (
        <Section
          title="सामान्य अध्ययन (General Studies)"
          description="इतिहास, भूगोल, राजव्यवस्था और विज्ञान जैसे विषयों के महत्वपूर्ण अध्ययन तथ्य।"
          className="bg-muted/10 border-t border-border/40"
          action={
            <Button variant="outline" className="rounded-full" asChild>
              <Link href="/general-awareness">
                सामान्य अध्ययन पोर्टल पर जाएं <ArrowRight className="ml-1.5 h-4 w-4" />
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
          title="निशुल्क पीडीएफ लाइब्रेरी (Free Study Material)"
          description="परीक्षा का विस्तृत पाठ्यक्रम, महत्वपूर्ण क्लास नोट्स और पिछले वर्षों के हल प्रश्न पत्र।"
          className="bg-background border-t border-border/40"
          action={
            <Button variant="ghost" asChild>
              <Link href="/free-pdf">
                फ्री पीडीएफ लाइब्रेरी देखें <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          }
        >
          <AnimatedSection variant="stagger-container" className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {pdfs.map((pdf) => (
              <AnimatedSection key={pdf.id} variant="stagger-item">
                <PdfCard pdf={pdf} locale="hi" />
              </AnimatedSection>
            ))}
          </AnimatedSection>
        </Section>
      )}

      {/* ─── Publications Showcase Section ──────────────────────────────── */}
      {publications.length > 0 && (
        <Section
          title="हमारे प्रमुख प्रकाशन (Our Publications)"
          description="सिविल सेवा परीक्षाओं के उत्कृष्ट अध्ययन हेतु आकार IAS द्वारा विशेष रूप से तैयार की गई पुस्तकें।"
          className="bg-muted/10 border-t border-border/40"
          action={
            <Button variant="ghost" asChild>
              <Link href="/publications">
                सभी पुस्तकें देखें <ArrowRight className="ml-1 h-4 w-4" />
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
                <BookCard pub={pub} locale="hi" />
              </AnimatedSection>
            ))}
          </AnimatedSection>
        </Section>
      )}

      {/* ─── Toppers Wall of Fame ──────────────────────────────────────── */}
      {toppers.length > 0 && (
        <Section
          title="हमारे गौरव (Aakar IAS Selections)"
          description="विगत वर्षों में यूपीएससी (UPSC) और एमपीपीएससी (MPPSC) में चयनित हमारे शीर्ष होनहार छात्र।"
          className="bg-muted/10 border-t border-border/40"
        >
          <Container size="wide">
            <AnimatedSection variant="stagger-container" className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
              {toppers.slice(0, 4).map((topper) => (
                <AnimatedSection
                  key={topper.id}
                  variant="stagger-item"
                  className="group rounded-3xl border border-border bg-card p-3.5 sm:p-5 text-center shadow-soft hover:shadow-soft-lg transition-all duration-300 flex flex-col items-center justify-between"
                >
                  <div className="relative mx-auto h-20 w-20 xs:h-24 xs:w-24 sm:h-32 sm:w-32 lg:h-36 lg:w-36 shrink-0 overflow-hidden rounded-full border-2 sm:border-4 border-primary/20 bg-muted">
                    {topper.avatar ? (
                      <Image
                        src={topper.avatar}
                        alt={`Aakar IAS सफल अभ्यर्थी ${topper.name} - ${topper.exam} Rank ${topper.rank}`}
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
                  <h3 className="mt-4 text-base font-extrabold text-foreground">{topper.name}</h3>
                  <p className="text-xs font-bold text-primary tracking-wide uppercase mt-1">
                    Rank {topper.rank}
                  </p>
                  {topper.post && (
                    <p className="text-[11px] font-semibold text-muted-foreground mt-0.5">
                      {topper.post}
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
                <Link href="/selections">
                  UPSC MPPSC सफल अभ्यर्थी देखें <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </Container>
        </Section>
      )}

      {/* ─── Faculty Showcase Section ─────────────────────────────────── */}
      {faculties && faculties.length > 0 && (
        <Section
          title="हमारे मार्गदर्शक शिक्षक (Our Expert Mentors)"
          description="यूपीएससी (UPSC) और एमपीपीएससी (MPPSC) के लिए देश के सर्वश्रेष्ठ शिक्षकों और मेंटर्स की टीम।"
          className="bg-background border-t border-border/40"
        >
          <Container size="wide">
            <AnimatedSection variant="stagger-container" className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {faculties.slice(0, 4).map((faculty) => {
                const name = faculty.nameHi || faculty.nameEn;
                const title = faculty.titleHi || faculty.titleEn;
                const desc = faculty.descHi || faculty.descEn;
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
                          निदेशक
                        </span>
                      )}
                      <div className="relative mx-auto h-20 w-20 xs:h-24 xs:w-24 sm:h-32 sm:w-32 lg:h-36 lg:w-36 shrink-0 overflow-hidden rounded-full border-2 sm:border-4 border-primary/20 bg-muted">
                        {faculty.image ? (
                          <Image
                            src={faculty.image}
                            alt={`Aakar IAS शिक्षक ${name} - ${title}`}
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
                <Link href="/faculty">
                  UPSC MPPSC विशेषज्ञ शिक्षक देखें <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </Container>
        </Section>
      )}

      {/* ─── Free Video Classes & YouTube Stats (Media Center) ─────────── */}
      <Section
        title="निशुल्क वीडियो क्लासेज (Free Classes)"
        description="UPSC & MPPSC की तैयारी के लिए महत्वपूर्ण रणनीति वीडियो और लेक्चर क्लासेस।"
        className="border-t border-border/40 bg-muted/5"
        action={
          <Button variant="ghost" asChild>
            <Link href="/media-center">
              मीडिया सेंटर पर जाएं <ArrowRight className="ml-1 h-4 w-4" />
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
                  <p className="text-[10px] sm:text-xs font-bold text-muted-foreground tracking-wide font-devanagari">{s.title}</p>
                  <p className="text-xl sm:text-2xl font-extrabold text-foreground mt-0.5">{s.val}</p>
                </div>
              </div>
            ))}
          </AnimatedSection>

          {/* YouTube Videos List */}
          {youtubeVideos.length > 0 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-extrabold text-foreground border-l-4 border-primary pl-4 font-devanagari">
                  YouTube पर नवीनतम वीडियो लेक्चर्स
                </h3>
                <p className="text-xs text-muted-foreground mt-1 font-devanagari">विषयवार तैयारी के लिए सबसे हालिया वीडियो कक्षाएं</p>
              </div>

              <AnimatedSection variant="stagger-container" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {youtubeVideos.map((video) => (
                  <AnimatedSection key={video.id} variant="stagger-item">
                    <Link href={`/media-center?tab=home&v=${video.id}`} className="group block cursor-pointer">
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
                          {new Date(video.publishedAt).toLocaleDateString("hi-IN")}
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
                <h3 className="text-lg font-extrabold text-foreground border-l-4 border-primary pl-4 font-devanagari">
                  YouTube पर लोकप्रिय वीडियो लेक्चर्स
                </h3>
                <p className="text-xs text-muted-foreground mt-1 font-devanagari">छात्रों द्वारा सबसे अधिक पसंद की जाने वाली वीडियो कक्षाएं</p>
              </div>

              <AnimatedSection variant="stagger-container" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {youtubePopularVideos.map((video) => (
                  <AnimatedSection key={video.id} variant="stagger-item">
                    <Link href={`/media-center?tab=home&v=${video.id}`} className="group block cursor-pointer">
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
                          {new Date(video.publishedAt).toLocaleDateString("hi-IN")}
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
              <h3 className="text-lg font-extrabold text-foreground border-l-4 border-primary pl-4 font-devanagari">
                हमारे यूट्यूब चैनल्स (Our Channels)
              </h3>
              <p className="text-xs text-muted-foreground mt-1 font-devanagari">
                विभिन्न परीक्षाओं और विषयों की विशेष तैयारी के लिए हमारे समर्पित यूट्यूब चैनल्स से जुड़ें।
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
                        alt={ch.nameHi}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/15 text-primary">
                        <span className="text-xl sm:text-2xl font-black" style={{ fontFamily: "var(--font-devanagari)" }}>आ</span>
                      </div>
                    )}
                  </div>
                  {/* Title */}
                  <h4 className="mt-4 text-xs sm:text-sm font-extrabold text-foreground leading-snug line-clamp-2 h-10 flex items-center justify-center font-devanagari">
                    {ch.nameHi}
                  </h4>
                  {/* Subscriber count */}
                  <p className="text-[10px] sm:text-xs text-muted-foreground mt-1 font-devanagari">
                    {ch.subscribersHi}
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
        <Section title="अक्सर पूछे जाने वाले प्रश्न (FAQ)" description="आकार IAS कोर्सेज और एडमिशन प्रक्रिया से जुड़े सामान्य सवाल।">
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
      <DownloadAppSection locale="hi" />
    </>
  );
}
