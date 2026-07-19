import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Download, FileText, HelpCircle, BookOpen, Brain } from "lucide-react";
import { getContentRepository } from "@/lib/content/content-repository";
import { buildMetadata } from "@/lib/seo/metadata";
import { getAllArticleQuizzesAction } from "@/actions/current-affairs";
import { QuizListView } from "@/components/quiz/quiz-list-view";
import { siteConfig } from "@/lib/site-config";

import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { FeaturedArticleCard } from "@/components/content/featured-article-card";
import { ArticleCard } from "@/components/content/article-card";
import { PdfCard } from "@/components/content/pdf-card";
import { Newsletter } from "@/components/content/newsletter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { AnimatedSection } from "@/components/ui/animated-section";
import { HeroSlider } from "@/components/sections/hero-slider";

export const revalidate = 900; // 15 min ISR

export const metadata = buildMetadata({
  title: "समसामयिकी (Current Affairs) पोर्टल | Aakar IAS",
  description: "UPSC, MPPSC और राज्य सिविल सेवा परीक्षाओं के लिए दैनिक, साप्ताहिक और मासिक करेंट अफेयर्स विश्लेषण।",
  path: "/current-affairs",
});

export default async function CurrentAffairsPortalPage() {
  const repo = await getContentRepository();
  const [
    featured,
    popular,
    latest,
    weekly,
    monthly,
    editorials,
    mppsc,
    upsc,
    pdfs,
    faqs,
    mpCurrentAffairs,
    homeConfig,
    latestDateResult,
    quizzes,
  ] = await Promise.all([
    repo.getFeatured("hi", undefined, 1),
    repo.getPopular("hi", 6),
    repo.listArticles({ locale: "hi", page: 1, pageSize: 6 }),
    repo.listArticles({ locale: "hi", contentType: "weekly", page: 1, pageSize: 3 }),
    repo.listArticles({ locale: "hi", contentType: "monthly", page: 1, pageSize: 3 }),
    repo.listArticles({ locale: "hi", contentType: "editorial", page: 1, pageSize: 3 }),
    repo.listArticles({ locale: "hi", tag: "mppsc", page: 1, pageSize: 3 }),
    repo.listArticles({ locale: "hi", tag: "upsc", page: 1, pageSize: 3 }),
    repo.listMonthlyPdfs("hi", undefined, 4),
    repo.listGlobalFaqs("hi"),
    repo.listArticles({ locale: "hi", tag: "mp-current-affairs", page: 1, pageSize: 3 }),
    repo.getHomeConfig("hi"),
    repo.getLatestDateWithContent(),
    getAllArticleQuizzesAction("hi"),
  ]);

  const latestMonthlyPdf = pdfs.find((p) => p.pdfType === "monthly") || pdfs[0];
  const latestDate = latestDateResult || new Date().toISOString().split("T")[0];

  return (
    <>
      {/* ─── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-secondary text-secondary-foreground py-16 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--primary)_0%,_transparent_50%)] opacity-20" />
        <Container size="wide" className="relative">
          <AnimatedSection variant="scale-in" duration={0.8} className="mx-auto max-w-3xl text-center">
            <h1 className="text-balance text-4xl font-extrabold tracking-tight text-white sm:text-5xl font-devanagari">
              समसामयिकी (Current Affairs) पोर्टल
            </h1>
            <p className="mt-5 text-pretty text-lg text-white/75 sm:text-xl font-devanagari">
              UPSC, MPPSC और अन्य राज्य लोक सेवा आयोग परीक्षाओं के लिए दैनिक, साप्ताहिक और मासिक करेंट अफेयर्स विश्लेषण।
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button size="lg" asChild className="rounded-full">
                <Link href={`/current-affairs/${latestDate}`}>
                  पढ़ना शुरू करें <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="rounded-full border-white/20 text-white bg-transparent hover:bg-white/10 hover:text-white">
                <Link href="/current-affairs/quiz">
                  करेंट अफेयर्स क्विज़ <Brain className="ml-1.5 h-4 w-4 text-white" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="rounded-full border-white/20 text-white bg-transparent hover:bg-white/10 hover:text-white">
                <Link href="/monthly-pdf">मासिक पत्रिका (PDFs)</Link>
              </Button>
            </div>
          </AnimatedSection>
        </Container>
      </section>

      {/* ─── Featured Article ────────────────────────────────────────── */}
      {featured.length > 0 && (
        <Section className="-mt-8 pt-0">
          <AnimatedSection variant="fade-up" duration={0.6}>
            <div className="grid gap-6 lg:grid-cols-2">
              <FeaturedArticleCard article={featured[0]} className="lg:col-span-2" />
            </div>
          </AnimatedSection>
        </Section>
      )}

      {/* ─── Daily Current Affairs ────────────────────────────────────── */}
      <Section
        title="दैनिक करेंट अफेयर्स"
        description="नवीनतम समाचारों और देश-विदेश के घटनाक्रमों की विस्तृत कवरेज।"
        action={
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="outline" className="rounded-full" asChild>
              <Link href="/current-affairs/quiz">
                करेंट अफेयर्स क्विज़ <Brain className="ml-1.5 h-4 w-4 text-primary" />
              </Link>
            </Button>
            <Button variant="outline" className="rounded-full" asChild>
              <Link href={`/current-affairs/${latestDate}`}>
                कैलेंडर अनुसार देखें <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
          </div>
        }
      >
        <AnimatedSection variant="stagger-container" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latest.items.map((a, i) => (
            <AnimatedSection key={a.id || `latest-${i}`} variant="stagger-item">
              <ArticleCard article={a} />
            </AnimatedSection>
          ))}
        </AnimatedSection>
      </Section>

      {/* ─── Current Affairs Quiz Section ──────────────────────────────── */}
      {quizzes && quizzes.length > 0 && (
        <Section
          title="करेंट अफेयर्स क्विज़ (Current Affairs Quiz)"
          description="दैनिक समसामयिकी के महत्वपूर्ण प्रश्नों पर आधारित अभ्यास क्विज़ हल करें।"
          className="bg-muted/10 border-t border-b border-border/40"
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

      {/* ─── Weekly Current Affairs ────────────────────────────────────── */}
      {weekly.items.length > 0 && (
        <Section
          title="साप्ताहिक करेंट अफेयर्स"
          description="आसान दोहराव और त्वरित रिवीजन के लिए साप्ताहिक संकलन।"
          className="bg-muted/20"
          action={
            <Button variant="ghost" asChild>
              <Link href="/weekly">
                सभी देखें <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          }
        >
          <AnimatedSection variant="stagger-container" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {weekly.items.map((a, i) => (
              <AnimatedSection key={a.id || `weekly-${i}`} variant="stagger-item">
                <ArticleCard article={a} />
              </AnimatedSection>
            ))}
          </AnimatedSection>
        </Section>
      )}

      {/* ─── Monthly Current Affairs ────────────────────────────────────── */}
      {monthly.items.length > 0 && (
        <Section
          title="मासिक करेंट अफेयर्स"
          description="मुख्य राष्ट्रीय और अंतर्राष्ट्रीय घटनाओं का मासिक विस्तृत विश्लेषण।"
          action={
            <Button variant="ghost" asChild>
              <Link href="/monthly">
                सभी देखें <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          }
        >
          <AnimatedSection variant="stagger-container" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {monthly.items.map((a, i) => (
              <AnimatedSection key={a.id || `monthly-${i}`} variant="stagger-item">
                <ArticleCard article={a} />
              </AnimatedSection>
            ))}
          </AnimatedSection>
        </Section>
      )}

      {/* ─── MP Current Affairs ─────────────────────────────────────────── */}
      {mpCurrentAffairs.items.length > 0 && (
        <Section
          title="एमपी करेंट अफेयर्स"
          description="मध्यप्रदेश राज्य से संबंधित महत्वपूर्ण समाचार और घटनाक्रम।"
          action={
            <Button variant="ghost" asChild>
              <Link href="/tag/mp-current-affairs">
                सभी देखें <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          }
        >
          <AnimatedSection variant="stagger-container" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {mpCurrentAffairs.items.map((a, i) => (
              <AnimatedSection key={a.id || `mp-ca-${i}`} variant="stagger-item">
                <ArticleCard article={a} />
              </AnimatedSection>
            ))}
          </AnimatedSection>
        </Section>
      )}

      {/* ─── Latest Monthly PDF Magazine ─────────────────────────────── */}
      {latestMonthlyPdf && (
        <Section className="bg-secondary text-secondary-foreground py-16">
          <Container size="wide">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              <AnimatedSection variant="slide-in" className="lg:col-span-7 space-y-6">
                <span className="inline-block rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold text-accent">
                  मासिक PDF पत्रिका
                </span>
                <h2 className="text-balance text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                  {latestMonthlyPdf.title}
                </h2>
                <p className="text-pretty text-white/70 max-w-xl">
                  {latestMonthlyPdf.description || "यूपीएससी और एमपीपीएससी परीक्षाओं के लिए समसामयिकी का संपूर्ण मासिक विश्लेषण संकलन।"}
                </p>
                <div className="flex flex-wrap gap-3">
                  {latestMonthlyPdf.fileUrl && (
                    <Button asChild size="lg" className="rounded-full bg-primary text-primary-foreground hover:bg-primary/95">
                      <a href={latestMonthlyPdf.fileUrl} download target="_blank" rel="noopener noreferrer">
                        <Download className="mr-2 h-4 w-4" /> पत्रिका डाउनलोड करें
                      </a>
                    </Button>
                  )}
                  <Button variant="outline" size="lg" asChild className="rounded-full border-white/20 text-white bg-transparent hover:bg-white/10 hover:text-white">
                    <Link href={`/monthly-pdf/${latestMonthlyPdf.slug}`}>विवरण देखें</Link>
                  </Button>
                </div>
              </AnimatedSection>
              <AnimatedSection variant="scale-in" className="lg:col-span-5 flex justify-center">
                {latestMonthlyPdf.coverImage ? (
                  <div className="relative aspect-[3/4] w-64 overflow-hidden rounded-2xl border border-white/10 shadow-soft-lg">
                    <Image
                      src={latestMonthlyPdf.coverImage}
                      alt={latestMonthlyPdf.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <Card className="aspect-[3/4] w-64 bg-white/5 border-white/10 flex flex-col items-center justify-center p-6 text-center shadow-soft-lg">
                    <FileText className="h-16 w-16 text-white/40 mb-3" />
                    <span className="font-bold text-white text-sm tracking-tight">{latestMonthlyPdf.title}</span>
                  </Card>
                )}
              </AnimatedSection>
            </div>
          </Container>
        </Section>
      )}

      {/* ─── Popular Articles ─────────────────────────────────────────── */}
      <Section
        title="लोकप्रिय लेख"
        description="सिविल सेवा अभ्यर्थियों द्वारा सर्वाधिक पढ़े जाने वाले महत्वपूर्ण लेख।"
        action={
          <Button variant="ghost" asChild>
            <Link href={`/current-affairs/${latestDate}`}>
              और देखें <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        }
      >
        <AnimatedSection variant="stagger-container" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {popular.map((a, i) => (
            <AnimatedSection key={a.id || `popular-${i}`} variant="stagger-item">
              <ArticleCard article={a} />
            </AnimatedSection>
          ))}
        </AnimatedSection>
      </Section>

      {/* ─── Editorials ───────────────────────────────────────────────── */}
      {editorials.items.length > 0 && (
        <Section
          title="संपादकीय और विश्लेषण"
          description="संवैधानिक, आर्थिक और प्रमुख राष्ट्रीय व अंतरराष्ट्रीय मुद्दों पर विशेषज्ञों का विश्लेषण।"
          className="bg-muted/20"
          action={
            <Button variant="ghost" asChild>
              <Link href="/editorial">
                सभी देखें <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          }
        >
          <AnimatedSection variant="stagger-container" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {editorials.items.map((a, i) => (
              <AnimatedSection key={a.id || `editorial-${i}`} variant="stagger-item">
                <ArticleCard article={a} />
              </AnimatedSection>
            ))}
          </AnimatedSection>
        </Section>
      )}

      {/* ─── UPSC & MPPSC Hubs ─────────────────────────────────────────── */}
      <Section title="UPSC और MPPSC तैयारी हब">
        <div className="grid gap-8 md:grid-cols-2">
          {/* UPSC Hub Section */}
          <AnimatedSection variant="slide-in" className="h-full">
            <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-soft flex flex-col gap-6 h-full">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary">UPSC CSE</span>
                <h3 className="text-2xl font-extrabold text-foreground mt-2">UPSC तैयारी पोर्टल</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  दैनिक समाचार विश्लेषण, मुख्य संपादकीय लेख, मासिक पत्रिका संग्रह, और सिविल सेवा परीक्षा के लिए विशेष अध्ययन गाइड।
                </p>
              </div>
              {upsc.items.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">UPSC के लिए नवीनतम</h4>
                  <div className="space-y-2">
                    {upsc.items.map((a, i) => (
                      <Link key={a.id || `upsc-${i}`} href={a.href} className="block text-sm font-semibold hover:text-primary transition-colors line-clamp-1">
                        • {a.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              <Button className="mt-auto rounded-full w-fit" asChild>
                <Link href="/upsc">
                  UPSC हब पर जाएं <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </AnimatedSection>

          {/* MPPSC Hub Section */}
          <AnimatedSection variant="slide-in" delay={0.15} className="h-full">
            <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-soft flex flex-col gap-6 h-full">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-accent-foreground">MPPSC</span>
                <h3 className="text-2xl font-extrabold text-foreground mt-2">MPPSC तैयारी पोर्टल</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  मध्यप्रदेश लोक सेवा आयोग (MPPSC) का विस्तृत पाठ्यक्रम, पिछले वर्षों के हल प्रश्न पत्र, और राज्य विशेष करेंट अफेयर्स।
                </p>
              </div>
              {mppsc.items.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">MPPSC के लिए नवीनतम</h4>
                  <div className="space-y-2">
                    {mppsc.items.map((a, i) => (
                      <Link key={a.id || `mppsc-${i}`} href={a.href} className="block text-sm font-semibold hover:text-primary transition-colors line-clamp-1">
                        • {a.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              <Button className="mt-auto rounded-full w-fit" variant="outline" asChild>
                <Link href="/mppsc">
                  MPPSC हब पर जाएं <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </Section>

      {/* ─── Free PDF Library Preview ─────────────────────────────────── */}
      {pdfs.length > 0 && (
        <Section
          title="निशुल्क पीडीएफ लाइब्रेरी"
          description="परीक्षा पाठ्यक्रम, महत्वपूर्ण नोट्स और पिछले वर्षों के परीक्षा प्रश्न पत्र।"
          className="bg-muted/10"
          action={
            <Button variant="ghost" asChild>
              <Link href="/free-pdf">
                सभी देखें <ArrowRight className="ml-1 h-4 w-4" />
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

      {/* ─── FAQs ────────────────────────────────────────────────────── */}
      {faqs.length > 0 && (
        <Section title="अक्सर पूछे जाने वाले प्रश्न (FAQ)" description="आकार IAS अध्ययन सामग्री और समसामयिकी अपडेट से जुड़े सामान्य प्रश्न।">
          <Container size="narrow">
            <AnimatedSection variant="fade-up">
              <Accordion type="single" collapsible className="w-full border border-border rounded-3xl bg-card p-6 shadow-soft">
                {faqs.slice(0, 5).map((faq, i) => (
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

      {/* ─── Newsletter ──────────────────────────────────────────────── */}
      <Section>
        <AnimatedSection variant="fade-up">
          <Newsletter variant="section" />
        </AnimatedSection>
      </Section>
    </>
  );
}
