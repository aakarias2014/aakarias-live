import type { Metadata } from "next";
import Link from "next/link";
import { getContentRepository } from "@/lib/content/content-repository";
import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumb } from "@/components/content/breadcrumb";
import { Button } from "@/components/ui/button";
import { FileText, Download, ArrowRight, HelpCircle } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, faqJsonLd, jsonLdGraph } from "@/lib/seo/jsonld";
import { siteConfig } from "@/lib/site-config";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: "MPPSC 2016 Question Paper PDF Download with Answer Key | Prelims & Mains | Aakar IAS",
  description: "Download free MPPSC 2016 Prelims (GS & CSAT) and Mains previous year question papers PDF with verified answer keys and cut-off marks.",
  path: "/en/mppsc/question-paper-2016",
  locale: "en",
  keywords: [
    "mppsc question paper 2016",
    "mppsc 2016 question paper",
    "mppsc prelims 2016 paper pdf",
    "mppsc 2016 answer key",
  ],
});

export default async function EnglishMppscQuestionPaper2016Page() {
  const pageUrl = `${siteConfig.url}/en/mppsc/question-paper-2016`;

  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    { name: "MPPSC", url: `${siteConfig.url}/en/mppsc` },
    { name: "Previous Year Papers", url: `${siteConfig.url}/en/mppsc/previous-year-papers` },
    { name: "MPPSC 2016 Question Paper", url: pageUrl },
  ]);

  const faqs = [
    {
      q: "Where can I download MPPSC Prelims 2016 GS Paper 1 with Answer Key?",
      a: "You can download the MPPSC Prelims 2016 GS Paper 1 and CSAT Paper 2 question papers with verified official answer keys on this portal.",
    },
    {
      q: "What was the MPPSC 2016 Prelims cut off for Unreserved category?",
      a: "The MPPSC 2016 Prelims official cut off for Unreserved Male was 162 marks (81 questions) out of 200.",
    },
  ];

  const faqSchema = faqJsonLd(faqs);

  return (
    <>
      <JsonLd data={jsonLdGraph([breadcrumb, faqSchema])} />

      <section className="relative overflow-hidden bg-secondary text-secondary-foreground">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--primary)_0%,_transparent_50%)] opacity-20" />
        <Container size="wide" className="relative py-16 sm:py-20">
          <div className="max-w-4xl space-y-4">
            <span className="inline-block rounded-full bg-primary/15 px-4 py-1 text-xs font-extrabold uppercase tracking-wider text-primary">
              MPPSC 2016 Solved Paper & Answer Key
            </span>
            <h1 className="text-balance text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              MPPSC Question Paper 2016 PDF Download with Answer Key
            </h1>
            <p className="text-pretty text-base sm:text-lg text-white/80 leading-relaxed max-w-3xl">
              Free PDF download of MPPSC 2016 Prelims (GS Paper 1 & CSAT) and Mains previous year question papers with answer keys and cut-off marks.
            </p>
          </div>
        </Container>
      </section>

      <Section className="pb-0 pt-8">
        <Container size="wide">
          <Breadcrumb items={[{ name: "MPPSC", href: "/en/mppsc" }, { name: "Previous Year Papers", href: "/en/mppsc/previous-year-papers" }, { name: "MPPSC 2016 Paper" }]} />
        </Container>
      </Section>

      <Section className="py-12">
        <Container size="narrow">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-extrabold text-foreground">
                MPPSC 2016 Paper (FAQs)
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
