import type { Metadata } from "next";
import Link from "next/link";
import { getContentRepository } from "@/lib/content/content-repository";
import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumb } from "@/components/content/breadcrumb";
import { Button } from "@/components/ui/button";
import { BookOpen, Download, ArrowRight, HelpCircle } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, faqJsonLd, jsonLdGraph } from "@/lib/seo/jsonld";
import { siteConfig } from "@/lib/site-config";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: "Books for MPPSC Mains & Prelims + NCERT Books for MPPSC PDF | Aakar IAS",
  description: "Complete booklist for MPPSC Mains and Prelims preparation in English & Hindi. Subject-wise recommended standard reference books, NCERT Class 6-12 list, and free PDF download.",
  path: "/en/mppsc/books-and-ncert-list",
  locale: "en",
  keywords: [
    "books for mppsc mains",
    "ncert books for mppsc",
    "mppsc mains booklist english",
    "best books for mppsc preparation",
    "ncert for mppsc",
  ],
});

export default async function EnglishMppscBooksAndNcertPage() {
  const pageUrl = `${siteConfig.url}/en/mppsc/books-and-ncert-list`;

  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    { name: "MPPSC", url: `${siteConfig.url}/en/mppsc` },
    { name: "Books & NCERT List", url: pageUrl },
  ]);

  const faqs = [
    {
      q: "Which NCERT books are mandatory for MPPSC preparation?",
      a: "NCERT Class 6 to 12 for History and Geography, and Class 9 to 12 for Polity and Economics are essential for building core concepts for MPPSC Prelims & Mains.",
    },
    {
      q: "What are the best standard books for MPPSC Mains?",
      a: "Key books include M. Laxmikanth for Polity, Spectrum / Bipin Chandra for History, Majid Husain for Geography, and Aakar IAS printed notes for MP Special GK and Ethics.",
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
              MPPSC Booklist & NCERT Guide
            </span>
            <h1 className="text-balance text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              Books for MPPSC Mains & Prelims + NCERT Books List
            </h1>
            <p className="text-pretty text-base sm:text-lg text-white/80 leading-relaxed max-w-3xl">
              Comprehensive subject-wise booklist and Class 6-12 NCERT study guide for MPPSC state services exam.
            </p>
          </div>
        </Container>
      </section>

      <Section className="pb-0 pt-8">
        <Container size="wide">
          <Breadcrumb items={[{ name: "MPPSC", href: "/en/mppsc" }, { name: "Books & NCERT List" }]} />
        </Container>
      </Section>

      <Section className="py-12">
        <Container size="narrow">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-extrabold text-foreground">
                Frequently Asked Questions (FAQs)
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
