import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumb } from "@/components/content/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd, faqJsonLd, localBusinessJsonLd, jsonLdGraph } from "@/lib/seo/jsonld";
import { siteConfig } from "@/lib/site-config";
import { 
  BookOpen, 
  CheckCircle2, 
  HelpCircle, 
  Globe, 
  Phone, 
  ArrowRight,
  Download,
  FileText
} from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "MPPSC English Medium Coaching in Indore | Notes PDF in English | Aakar IAS",
  description: "Best MPPSC English Medium Coaching in Indore — Aakar IAS offers dedicated English medium batches for MPPSC Prelims & Mains, printed English notes, test series & answer writing guidance.",
  path: "/mppsc-english-medium-coaching",
  keywords: [
    "MPPSC English Medium Coaching in Indore",
    "Aakar IAS MPPSC Notes PDF in English",
    "MPPSC Mains Notes in English PDF",
    "Best MPPSC English Medium Classes Indore",
    "MPPSC English Medium Test Series",
    "MPPSC English Medium Study Material",
    "MPPSC English Medium Batch Bhawarkua Indore",
  ],
});

const faqs = [
  {
    q: "Which is the best MPPSC English Medium Coaching in Indore?",
    a: "Aakar IAS is widely recognized as the leading MPPSC English Medium coaching institute in Indore. We provide separate, dedicated English medium classroom batches, updated English study material according to the 2026 syllabus, and English medium test series.",
  },
  {
    q: "Are MPPSC Mains study notes available in English medium?",
    a: "Yes! Aakar IAS provides comprehensive, unit-wise printed and PDF study booklets strictly in English for all 6 Mains papers.",
  },
  {
    q: "Is there a dedicated faculty for English Medium batches?",
    a: "Yes, Aakar IAS has a specialized team of expert faculty members who deliver lectures exclusively in English and evaluate English medium answer writing copies.",
  },
];

export default function MppscEnglishMediumCoachingPage() {
  const pageUrl = `${siteConfig.url}/mppsc-english-medium-coaching`;

  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    { name: "MPPSC", url: `${siteConfig.url}/mppsc` },
    { name: "MPPSC English Medium Coaching", url: pageUrl },
  ]);

  const faqSchema = faqJsonLd(faqs);
  const localBusiness = localBusinessJsonLd();

  return (
    <>
      <JsonLd data={jsonLdGraph([breadcrumbs, faqSchema, localBusiness])} />

      {/* Hero Section */}
      <Section className="bg-gradient-to-b from-primary/5 via-background to-background pt-10 pb-12">
        <Container>
          <Breadcrumb
            items={[
              { name: "MPPSC", href: "/mppsc" },
              { name: "MPPSC English Medium Coaching", href: "/mppsc-english-medium-coaching" },
            ]}
          />

          <div className="mt-8 max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
              <Globe className="h-4 w-4" /> 100% Dedicated English Medium Program
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl leading-tight">
              Best MPPSC English Medium Coaching in Indore — <span className="text-primary">Aakar IAS</span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Tailored preparation ecosystem for English medium MPPSC aspirants in Indore. Separate English classroom batches, comprehensive English study booklets, Mains answer evaluation & English test series.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Button size="lg" asChild className="gap-2 text-base font-semibold">
                <Link href="/contact">
                  <Phone className="h-5 w-5" /> Enquire for English Batch
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="gap-2 text-base">
                <Link href="/mppsc-notes">
                  <Download className="h-4 w-4" /> Download English Notes Sample
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Highlights */}
      <Section className="py-12">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 space-y-4">
              <BookOpen className="h-8 w-8 text-primary" />
              <h3 className="text-xl font-bold">100% English Study Material</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Complete syllabus covered in pristine English language. Point-wise notes, flowchart representation, and syllabus-aligned booklets.
              </p>
            </Card>

            <Card className="p-6 space-y-4">
              <FileText className="h-8 w-8 text-primary" />
              <h3 className="text-xl font-bold">Mains Answer Writing in English</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Get your English Mains answers evaluated by subject experts with line-by-line feedback and English model answer keys.
              </p>
            </Card>

            <Card className="p-6 space-y-4">
              <Globe className="h-8 w-8 text-primary" />
              <h3 className="text-xl font-bold">Separate English Medium Batches</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                No mixed-language lectures. Dedicated English faculty delivering lectures in English to build clear conceptual clarity.
              </p>
            </Card>
          </div>
        </Container>
      </Section>

      {/* FAQ Section */}
      <Section className="bg-muted/30 py-12">
        <Container size="narrow">
          <div className="text-center space-y-4 mb-8">
            <h2 className="text-3xl font-bold flex items-center justify-center gap-2">
              <HelpCircle className="h-8 w-8 text-primary" /> Frequently Asked Questions
            </h2>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`}>
                <AccordionTrigger className="text-left font-semibold text-lg">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-base">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Container>
      </Section>
    </>
  );
}
