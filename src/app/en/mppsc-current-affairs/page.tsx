import Link from "next/link";
import { ArrowRight, Download, FileText, HelpCircle, BookOpen, Brain, Trophy, CheckCircle, Flame, Star, Sparkles } from "lucide-react";
import { getContentRepository } from "@/lib/content/content-repository";
import { buildMetadata } from "@/lib/seo/metadata";
import { getAllArticleQuizzesAction } from "@/actions/current-affairs";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ArticleCard } from "@/components/content/article-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { AnimatedSection } from "@/components/ui/animated-section";

export const revalidate = 900; // 15 mins ISR

export const metadata = buildMetadata({
  title: "MPPSC Current Affairs 2026 | MP Current Affairs PDF, Magazine & Quiz | Aakar IAS",
  description: "MPPSC Current Affairs 2026: Daily News Analysis, MPPSC Monthly Current Affairs Magazine, PDF Download, Daily Quiz & MP Police Current Affairs Notes.",
  path: "/en/mppsc-current-affairs",
  keywords: [
    "mppsc current affairs",
    "mppsc current affairs 2026",
    "mppsc current affairs magazine",
    "mppsc current affairs 2025",
    "mppsc current affairs pdf",
    "mppsc current affairs book",
    "mppsc current affairs english",
    "mppsc current affairs monthly magazine",
    "mppsc current affairs source",
    "mppsc current affairs 2026 pdf",
    "mp current affairs",
    "mp current affairs 2026",
    "mp current affairs book",
    "mp current affairs 2025",
    "mp gk current affairs",
    "mp current affairs 2026 pdf",
    "mp current affairs 2026 english",
    "mp current affairs 2026 book",
    "mp police current affairs",
    "mp current affairs 2026 monthly",
    "mp current affairs 2026 mcq",
    "mp current affairs 2026 pdf download",
    "mp current affairs 2026 mppsc",
    "MPPSC Daily Current Affairs",
    "MPPSC Monthly Current Affairs PDF",
    "MPPSC Current Affairs Notes",
    "MPPSC Current Affairs Quiz",
    "MPPSC Exam Current Affairs"
  ]
});

export default async function EnglishMppscCurrentAffairsPage() {
  const repo = await getContentRepository();
  const [
    mppscArticles,
    mpCurrentAffairs,
    featured,
    monthlyPdfs,
    quizzes,
    latestDateResult
  ] = await Promise.all([
    repo.listArticles({ locale: "en", tag: "mppsc", page: 1, pageSize: 9 }),
    repo.listArticles({ locale: "en", tag: "mp-current-affairs", page: 1, pageSize: 6 }),
    repo.getFeatured("en", undefined, 1),
    repo.listMonthlyPdfs("en", undefined, 6),
    getAllArticleQuizzesAction("en"),
    repo.getLatestDateWithContent()
  ]);

  const latestDate = latestDateResult || new Date().toISOString().split("T")[0];

  // Fallback to Hindi articles if English list is empty for tag
  const displayMppscArticles = mppscArticles.items.length > 0
    ? mppscArticles.items
    : (await repo.listArticles({ locale: "hi", tag: "mppsc", page: 1, pageSize: 9 })).items;

  const displayMpCurrentAffairs = mpCurrentAffairs.items.length > 0
    ? mpCurrentAffairs.items
    : (await repo.listArticles({ locale: "hi", tag: "mp-current-affairs", page: 1, pageSize: 6 })).items;

  // Structured JSON-LD Schema for Google Rich Results
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Which is the best magazine and source for MPPSC Current Affairs 2026?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Aakar IAS MPPSC Monthly Current Affairs Magazine and Daily Current Affairs Notes are the most authentic source for MPPSC Prelims & Mains examination, covering MP State GK and National Current Affairs with exam-focused analysis."
        }
      },
      {
        "@type": "Question",
        "name": "How to download MPPSC Current Affairs 2026 PDF?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can download monthly MPPSC Current Affairs 2026 PDF in Hindi and English medium for free from the MPPSC Monthly PDF Library on Aakar IAS portal."
        }
      },
      {
        "@type": "Question",
        "name": "Where to prepare MP GK Current Affairs for MP Police & ESB exams?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Aakar IAS MP Current Affairs Portal provides dedicated MP State Special GK One-Liners, MCQs, and Current Affairs Notes for MP Police, MPSI, and ESB (Vyapam) exams."
        }
      },
      {
        "@type": "Question",
        "name": "How many Current Affairs questions are asked in MPPSC Prelims Paper 1 GS?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In MPPSC Prelims GS Paper 1, approximately 12 to 18 direct questions are asked from Sports, MP State Current Affairs, and National/International events."
        }
      }
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://aakarias.com/en"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "MPPSC Current Affairs 2026",
        "item": "https://aakarias.com/en/mppsc-current-affairs"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ─── Hero Section ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/95 via-secondary to-slate-900 text-white py-16 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_var(--primary)_0%,_transparent_50%)] opacity-30" />
        <Container size="wide" className="relative">
          <AnimatedSection variant="scale-in" duration={0.8} className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-amber-300 backdrop-blur-md border border-white/10 mb-6">
              <Sparkles className="h-4 w-4" /> MPPSC 2026 #1 Official Current Affairs Portal
            </div>
            <h1 className="text-balance text-4xl font-black tracking-tight text-white sm:text-6xl leading-tight">
              MPPSC Current Affairs 2026
            </h1>
            <p className="mt-5 text-pretty text-lg text-slate-200 sm:text-2xl max-w-3xl mx-auto font-medium">
              Daily News Analysis, MP Current Affairs PDF, Monthly Magazine, & Practice Quizzes for MPPSC Prelims & Mains, MP Police, and ESB Exams.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button size="lg" asChild className="rounded-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-8 shadow-lg shadow-amber-500/20">
                <Link href={`/en/current-affairs/${latestDate}`}>
                  Daily News Analysis <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="rounded-full border-white/30 text-white bg-white/10 hover:bg-white/20 backdrop-blur-md">
                <Link href="/en/monthly-pdf">
                  Monthly Magazine PDF <Download className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="rounded-full border-white/30 text-white bg-white/10 hover:bg-white/20 backdrop-blur-md">
                <Link href="/en/current-affairs/quiz">
                  MPPSC Current Affairs Quizzes <Brain className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </AnimatedSection>
        </Container>
      </section>

      {/* ─── Highlights Stats Banner ───────────────────────────────────── */}
      <section className="bg-slate-900 border-b border-white/10 py-6">
        <Container size="wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 rounded-xl bg-white/5 border border-white/5">
              <div className="text-2xl sm:text-3xl font-black text-amber-400">100% MPPSC Syllabus</div>
              <div className="text-xs sm:text-sm text-slate-300 mt-1">Updated Prelims & Mains Notes</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/5">
              <div className="text-2xl sm:text-3xl font-black text-amber-400">Daily & Monthly PDFs</div>
              <div className="text-xs sm:text-sm text-slate-300 mt-1">Hindi & English Medium</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/5">
              <div className="text-2xl sm:text-3xl font-black text-amber-400">MP GK Special</div>
              <div className="text-xs sm:text-sm text-slate-300 mt-1">Madhya Pradesh State Coverage</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/5">
              <div className="text-2xl sm:text-3xl font-black text-amber-400">Exam Practice MCQs</div>
              <div className="text-xs sm:text-sm text-slate-300 mt-1">Detailed Explanations</div>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── Latest MPPSC Current Affairs Articles ─────────────────────── */}
      <Section className="bg-background">
        <Container size="wide">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-sm font-bold text-amber-600 dark:text-amber-400 mb-2">
                <Flame className="h-4 w-4" /> MPPSC 2026 Special Notes
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                Latest MPPSC Current Affairs Articles & Analysis
              </h2>
            </div>
            <Button variant="outline" asChild className="rounded-full">
              <Link href="/en/current-affairs">
                View All Articles <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayMppscArticles.map((article) => (
              <ArticleCard key={article.id} article={article} locale="en" />
            ))}
          </div>
        </Container>
      </Section>

      {/* ─── MP State Specific GK & Current Affairs ───────────────────── */}
      {displayMpCurrentAffairs.length > 0 && (
        <Section className="bg-muted/40 border-y border-border">
          <Container size="wide">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 text-sm font-bold text-primary mb-2">
                  <Trophy className="h-4 w-4" /> MP GK Current Affairs 2026
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                  Madhya Pradesh Special Current Affairs (MP Current Affairs 2026)
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {displayMpCurrentAffairs.map((article) => (
                <ArticleCard key={article.id} article={article} locale="en" />
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* ─── MPPSC Monthly Current Affairs Magazine & PDF Hub ───────────── */}
      <Section className="bg-background">
        <Container size="wide">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-sm font-bold text-primary mb-3">
              <Download className="h-4 w-4" /> Free PDF Downloads
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">
              MPPSC Monthly Current Affairs Magazine & PDF 2026
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">
              Download free monthly current affairs PDF compilations for MPPSC Prelims (Paper 1 GS) and Mains examination.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {monthlyPdfs.slice(0, 6).map((pdf) => (
              <Card key={pdf.id} className="p-6 flex flex-col justify-between hover:shadow-lg transition-all border border-border">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 mb-3">
                    <FileText className="h-3.5 w-3.5" /> MPPSC Magazine PDF
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {pdf.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {pdf.description || "Complete monthly current affairs compilation for MPPSC 2026 exam."}
                  </p>
                </div>
                <Button asChild className="w-full rounded-full">
                  <a href={pdf.downloadUrl} target="_blank" rel="noopener noreferrer">
                    Download PDF <Download className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* ─── Frequently Asked Questions (SEO FAQs) ────────────────────── */}
      <Section className="bg-muted/30 border-t border-border">
        <Container size="wide" className="max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-foreground">
              MPPSC Current Affairs FAQs
            </h2>
            <p className="text-muted-foreground mt-2">
              Frequently asked questions about MPPSC and MP State Current Affairs Preparation
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqSchema.mainEntity.map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`}>
                <AccordionTrigger className="text-left text-lg font-bold">
                  {faq.name}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                  {faq.acceptedAnswer.text}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Container>
      </Section>
    </>
  );
}
