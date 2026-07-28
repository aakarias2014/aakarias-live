import Link from "next/link";
import { ArrowRight, Download, FileText, HelpCircle, BookOpen, Brain, Trophy, CheckCircle, Flame, Star, Sparkles } from "lucide-react";
import { getContentRepository } from "@/lib/content/content-repository";
import { buildMetadata } from "@/lib/seo/metadata";
import { getAllArticleQuizzesAction } from "@/actions/current-affairs";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { FeaturedArticleCard } from "@/components/content/featured-article-card";
import { ArticleCard } from "@/components/content/article-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { AnimatedSection } from "@/components/ui/animated-section";

export const revalidate = 900; // 15 mins ISR

export const metadata = buildMetadata({
  title: "MPPSC Current Affairs 2026 in Hindi | MP Current Affairs PDF, Magazine & Quiz | Aakar IAS",
  description: "MPPSC Current Affairs 2026 (MPPSC & MP GK करेंट अफेयर्स 2026): दैनिक समाचार विश्लेषण, MPPSC Monthly Current Affairs Magazine, PDF Download, Daily Quiz & MP Police Current Affairs Notes.",
  path: "/mppsc-current-affairs",
  keywords: [
    "mppsc current affairs",
    "mppsc current affairs hindi",
    "mppsc current affairs 2026",
    "mppsc current affairs magazine",
    "mppsc current affairs 2025",
    "mppsc current affairs pdf",
    "mppsc current affairs book",
    "mppsc current affairs 2026 in hindi",
    "mppsc current affairs monthly magazine",
    "mppsc current affairs source",
    "mppsc current affairs 2026 pdf",
    "mp current affairs",
    "mp current affairs 2026",
    "mp current affairs 2025 in hindi",
    "mp current affairs book",
    "mp current affairs 2025",
    "mp gk current affairs 2025",
    "mp current affairs 2026 pdf",
    "mp current affairs 2026 in hindi",
    "mp gk current affairs",
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

export default async function MppscCurrentAffairsPage() {
  const repo = await getContentRepository();
  const [
    mppscArticles,
    mpCurrentAffairs,
    featured,
    monthlyPdfs,
    quizzes,
    latestDateResult
  ] = await Promise.all([
    repo.listArticles({ locale: "hi", tag: "mppsc", page: 1, pageSize: 9 }),
    repo.listArticles({ locale: "hi", tag: "mp-current-affairs", page: 1, pageSize: 6 }),
    repo.getFeatured("hi", undefined, 1),
    repo.listMonthlyPdfs("hi", undefined, 6),
    getAllArticleQuizzesAction("hi"),
    repo.getLatestDateWithContent()
  ]);

  const latestDate = latestDateResult || new Date().toISOString().split("T")[0];

  // Structured JSON-LD Schema for Google Rich Results
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "MPPSC Current Affairs 2026 के लिए सबसे अच्छी मैगजीन और सोर्स कौन सा है?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "MPPSC प्रारम्भिक एवं मुख्य परीक्षा हेतु Aakar IAS की MPPSC Monthly Current Affairs Magazine और Daily Current Affairs Notes सबसे प्रामाणिक एवं सर्वश्रेष्ठ स्रोत हैं, जिनमें मध्य प्रदेश राज्य विशेष GK एवं राष्ट्रीय समसामयिकी का सटीक विश्लेषण दिया जाता है।"
        }
      },
      {
        "@type": "Question",
        "name": "MPPSC Current Affairs 2026 PDF कैसे डाउनलोड करें?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Aakar IAS पोर्टल के MPPSC Monthly Current Affairs PDF अनुभाग से आप प्रतिमाह की हिंदी और अंग्रेजी माध्यम में MP Current Affairs 2026 PDF निशुल्क डाउनलोड कर सकते हैं।"
        }
      },
      {
        "@type": "Question",
        "name": "MP Police और ESB परीक्षाओं के लिए MP GK Current Affairs कहाँ से पढ़ें?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Aakar IAS के MP Current Affairs Portal पर MP Police, MPSI, एवं ESB (Vyapam) परीक्षाओं के लिए विशेष MP GK Current Affairs One-Liners एवं MCQs उपलब्ध हैं।"
        }
      },
      {
        "@type": "Question",
        "name": "MPPSC Prelims Paper 1 GS में करेंट अफेयर्स से कितने प्रश्न आते हैं?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "MPPSC Prelims GS Paper 1 में खेलकूद, मध्य प्रदेश समसामयिकी एवं राष्ट्रीय/अंतरराष्ट्रीय घटनाओं से सीधे 12 से 18 प्रश्न पूछे जाते हैं।"
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
        "item": "https://aakarias.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "MPPSC Current Affairs 2026",
        "item": "https://aakarias.com/mppsc-current-affairs"
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
            <h1 className="text-balance text-4xl font-black tracking-tight text-white sm:text-6xl font-devanagari leading-tight">
              MPPSC Current Affairs 2026 in Hindi
            </h1>
            <p className="mt-5 text-pretty text-lg text-slate-200 sm:text-2xl font-devanagari max-w-3xl mx-auto font-medium">
              MPPSC राज्य सेवा प्रारम्भिक व मुख्य परीक्षा, MP Police एवं MP ESB हेतु दैनिक समाचार विश्लेषण, MP Current Affairs PDF, मासिक मैगजीन एवं अभ्यास क्विज़।
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button size="lg" asChild className="rounded-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-8 shadow-lg shadow-amber-500/20">
                <Link href={`/current-affairs/${latestDate}`}>
                  दैनिक MPPSC समाचार विश्लेषण <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="rounded-full border-white/30 text-white bg-white/10 hover:bg-white/20 backdrop-blur-md">
                <Link href="/monthly-pdf">
                  MPPSC Monthly Magazine PDF <Download className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="rounded-full border-white/30 text-white bg-white/10 hover:bg-white/20 backdrop-blur-md">
                <Link href="/current-affairs/quiz">
                  MPPSC Current Affairs MCQ Quiz <Brain className="ml-2 h-4 w-4" />
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
              <div className="text-2xl sm:text-3xl font-black text-amber-400 font-devanagari">100% MPPSC Focused</div>
              <div className="text-xs sm:text-sm text-slate-300 font-devanagari mt-1">नवीनतम पाठ्यक्रम आधारित</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/5">
              <div className="text-2xl sm:text-3xl font-black text-amber-400 font-devanagari">दैनिक & मासिक PDF</div>
              <div className="text-xs sm:text-sm text-slate-300 font-devanagari mt-1">हिंदी एवं अंग्रेजी माध्यम</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/5">
              <div className="text-2xl sm:text-3xl font-black text-amber-400 font-devanagari">MP GK Special</div>
              <div className="text-xs sm:text-sm text-slate-300 font-devanagari mt-1">मध्य प्रदेश विशेष कवरेज</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/5">
              <div className="text-2xl sm:text-3xl font-black text-amber-400 font-devanagari">Exam Practice Quiz</div>
              <div className="text-xs sm:text-sm text-slate-300 font-devanagari mt-1">व्याख्या सहित MCQs</div>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── Latest MPPSC Current Affairs Articles ─────────────────────── */}
      <Section className="bg-background">
        <Container size="wide">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-sm font-bold text-amber-600 dark:text-amber-400 mb-2 font-devanagari">
                <Flame className="h-4 w-4" /> MPPSC 2026 Special Notes
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-devanagari">
                नवीनतम MPPSC Current Affairs लेख व विश्लेषण
              </h2>
            </div>
            <Button variant="outline" asChild className="rounded-full">
              <Link href="/current-affairs">
                सभी समसामयिकी लेख देखें <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mppscArticles.items.map((article) => (
              <ArticleCard key={article.id} article={article} locale="hi" />
            ))}
          </div>
        </Container>
      </Section>

      {/* ─── MP State Specific GK & Current Affairs ───────────────────── */}
      {mpCurrentAffairs.items.length > 0 && (
        <Section className="bg-muted/40 border-y border-border">
          <Container size="wide">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 text-sm font-bold text-primary mb-2 font-devanagari">
                  <Trophy className="h-4 w-4" /> MP GK Current Affairs 2026
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-devanagari">
                  मध्य प्रदेश विशेष समसामयिकी (MP Current Affairs 2026 in Hindi)
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mpCurrentAffairs.items.map((article) => (
                <ArticleCard key={article.id} article={article} locale="hi" />
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* ─── MPPSC Monthly Current Affairs Magazine & PDF Hub ───────────── */}
      <Section className="bg-background">
        <Container size="wide">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-sm font-bold text-primary mb-3 font-devanagari">
              <Download className="h-4 w-4" /> Free PDF Downloads
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground font-devanagari">
              MPPSC Current Affairs Monthly Magazine & PDF 2026
            </h2>
            <p className="mt-3 text-lg text-muted-foreground font-devanagari">
              MPPSC प्रारम्भिक परीक्षा (Paper 1 GS) एवं मुख्य परीक्षा हेतु प्रतिमाह की विषयवार समसामयिकी पीडीएफ निशुल्क डाउनलोड करें।
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {monthlyPdfs.slice(0, 6).map((pdf) => (
              <Card key={pdf.id} className="p-6 flex flex-col justify-between hover:shadow-lg transition-all border border-border">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 mb-3">
                    <FileText className="h-3.5 w-3.5" /> MPPSC Magazine PDF
                  </div>
                  <h3 className="text-xl font-bold text-foreground font-devanagari mb-2">
                    {pdf.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-devanagari mb-4">
                    {pdf.description || "MPPSC 2026 परीक्षा उपयोगी संपूर्ण मासिक करेंट अफेयर्स का सार संग्रह।"}
                  </p>
                </div>
                <Button asChild className="w-full rounded-full">
                  <a href={pdf.downloadUrl} target="_blank" rel="noopener noreferrer">
                    PDF डाउनलोड करें <Download className="ml-2 h-4 w-4" />
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
            <h2 className="text-3xl font-extrabold text-foreground font-devanagari">
              MPPSC Current Affairs FAQs (अक्सर पूछे जाने वाले प्रश्न)
            </h2>
            <p className="text-muted-foreground mt-2 font-devanagari">
              MPPSC व MP राज्य परीक्षाओं के करेंट अफेयर्स से संबंधित महत्वपूर्ण प्रश्न एवं उत्तर
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqSchema.mainEntity.map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`}>
                <AccordionTrigger className="text-left text-lg font-bold font-devanagari">
                  {faq.name}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground font-devanagari leading-relaxed">
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
