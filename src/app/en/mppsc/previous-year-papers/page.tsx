import type { Metadata } from "next";
import Link from "next/link";
import { getContentRepository } from "@/lib/content/content-repository";
import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumb } from "@/components/content/breadcrumb";
import { Button } from "@/components/ui/button";
import { FileText, Download, CheckCircle2, Sparkles, BookOpen, HelpCircle, ArrowRight, Trophy, Calendar } from "lucide-react";
import { TrackedDownloadLink } from "@/components/content/tracked-download-link";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, faqJsonLd, jsonLdGraph } from "@/lib/seo/jsonld";
import { siteConfig } from "@/lib/site-config";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export const revalidate = 600;

export const metadata: Metadata = buildMetadata({
  title: "MPPSC Previous Year Question Papers PDF with Answer Key (2014-2025) | Aakar IAS",
  description: "Download free MPPSC Prelims & Mains Previous Year Question Papers PDF (2014-2025) with official answer keys in English & Hindi medium.",
  path: "/en/mppsc/previous-year-papers",
  locale: "en",
  keywords: [
    "MPPSC Previous Year Papers",
    "MPPSC Previous Year Question Paper PDF",
    "MPPSC Prelims Question Paper with Answer Key",
    "MPPSC Mains Previous Year Papers PDF",
    "MPPSC Old Question Paper PDF Download",
    "MPPSC Solved Papers 2014 to 2025",
  ],
});

export default async function EnglishMppscPreviousYearPapersPage() {
  const repo = await getContentRepository();
  const pyqData = await repo.listPyqs({
    exam: "MPPSC",
    pageSize: 50,
  });

  const pageUrl = `${siteConfig.url}/en/mppsc/previous-year-papers`;

  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    { name: "MPPSC", url: `${siteConfig.url}/en/mppsc` },
    { name: "Previous Year Papers", url: pageUrl },
  ]);

  const faqs = [
    {
      q: "Where can I download MPPSC Prelims Previous Year Question Papers in English medium?",
      a: "You can download MPPSC Prelims GS Paper 1 and CSAT Paper 2 question papers with official answer keys (2014-2025) for free on this official Aakar IAS portal.",
    },
    {
      q: "Are official revised answer keys included in the MPPSC PYQ PDFs?",
      a: "Yes, all MPPSC Prelims previous year paper PDFs provided by Aakar IAS include verified official revised answer keys.",
    },
    {
      q: "How many years of MPPSC Previous Year Papers should I solve?",
      a: "We recommend solving at least 10 years (2014-2025) of MPPSC Prelims and Mains previous year papers to understand repeating question trends and exam difficulty.",
    },
  ];

  const faqSchema = faqJsonLd(faqs);

  const prelimsYears = [
    { year: 2025, gsTitle: "MPPSC Prelims 2025 GS Paper-1", csatTitle: "MPPSC Prelims 2025 CSAT Paper-2" },
    { year: 2024, gsTitle: "MPPSC Prelims 2024 GS Paper-1", csatTitle: "MPPSC Prelims 2024 CSAT Paper-2" },
    { year: 2023, gsTitle: "MPPSC Prelims 2023 GS Paper-1", csatTitle: "MPPSC Prelims 2023 CSAT Paper-2" },
    { year: 2022, gsTitle: "MPPSC Prelims 2022 GS Paper-1", csatTitle: "MPPSC Prelims 2022 CSAT Paper-2" },
    { year: 2021, gsTitle: "MPPSC Prelims 2021 GS Paper-1", csatTitle: "MPPSC Prelims 2021 CSAT Paper-2" },
    { year: 2020, gsTitle: "MPPSC Prelims 2020 GS Paper-1", csatTitle: "MPPSC Prelims 2020 CSAT Paper-2" },
    { year: 2019, gsTitle: "MPPSC Prelims 2019 GS Paper-1", csatTitle: "MPPSC Prelims 2019 CSAT Paper-2" },
    { year: 2018, gsTitle: "MPPSC Prelims 2018 GS Paper-1", csatTitle: "MPPSC Prelims 2018 CSAT Paper-2" },
  ];

  return (
    <>
      <JsonLd data={jsonLdGraph([breadcrumb, faqSchema])} />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-secondary text-secondary-foreground">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--primary)_0%,_transparent_50%)] opacity-20" />
        <Container size="wide" className="relative py-16 sm:py-20">
          <div className="max-w-4xl space-y-4">
            <span className="inline-block rounded-full bg-primary/15 px-4 py-1 text-xs font-extrabold uppercase tracking-wider text-primary">
              MPPSC Previous Year Papers (2014-2025)
            </span>
            <h1 className="text-balance text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              MPPSC Previous Year Question Papers PDF Download
            </h1>
            <p className="text-pretty text-base sm:text-lg text-white/80 leading-relaxed max-w-3xl">
              Download 10+ years of solved MPPSC Prelims & Mains previous year papers with official answer keys in English & Hindi medium for free.
            </p>
          </div>
        </Container>
      </section>

      <Section className="pb-0 pt-8">
        <Container size="wide">
          <Breadcrumb items={[{ name: "MPPSC", href: "/en/mppsc" }, { name: "Previous Year Papers" }]} />
        </Container>
      </Section>

      {/* Prelims Papers Table Section */}
      <Section className="py-12">
        <Container size="wide">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                MPPSC Prelims Question Papers with Answer Key (2014-2025)
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Download General Studies Paper 1 and CSAT Paper 2 PDFs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {prelimsYears.map((item) => (
                <div key={item.year} className="bg-card border border-border/80 rounded-2xl p-5 shadow-soft hover:shadow-soft-md transition-all flex flex-col justify-between space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-black text-sm">
                        {item.year}
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground text-base">MPPSC Prelims {item.year}</h3>
                        <p className="text-xs text-muted-foreground">General Studies & CSAT Papers</p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                      Solved + Key
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border/60">
                    <Button size="sm" variant="outline" className="w-full text-xs font-bold gap-1 rounded-xl" asChild>
                      <Link href="/en/free-pdf">
                        <Download className="h-3.5 w-3.5" /> GS Paper 1
                      </Link>
                    </Button>
                    <Button size="sm" variant="outline" className="w-full text-xs font-bold gap-1 rounded-xl" asChild>
                      <Link href="/en/free-pdf">
                        <Download className="h-3.5 w-3.5" /> CSAT Paper 2
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQs Section */}
      <Section className="py-12 bg-muted/20">
        <Container size="narrow">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-extrabold text-foreground">
                MPPSC Previous Year Papers (FAQs)
              </h2>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border border-border/80 rounded-2xl px-5 py-1 bg-card shadow-soft-sm">
                  <AccordionTrigger className="text-left font-bold text-foreground hover:text-primary transition-colors text-sm sm:text-base">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Container>
      </Section>
    </>
  );
}
