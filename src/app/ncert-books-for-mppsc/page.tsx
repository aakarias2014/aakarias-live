import type { Metadata } from "next";
import Link from "next/link";
import { getContentRepository } from "@/lib/content/content-repository";
import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumb } from "@/components/content/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, faqJsonLd, jsonLdGraph } from "@/lib/seo/jsonld";
import { siteConfig } from "@/lib/site-config";
import { BookOpen, Download, CheckCircle2, Sparkles, HelpCircle, ArrowRight, Star, FileText } from "lucide-react";

export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: "NCERT Books for MPPSC PDF | Class 6 to 12 Must-Read List (Hindi & English)",
  description: "NCERT Books for MPPSC PDF — कक्षा 6 से 12 तक MPPSC प्रारंभिक व मुख्य परीक्षा के लिए अनिवार्य NCERT पुस्तकों की सूची, विषयवार प्राथमिकता एवं मुफ़्त PDF डाउनलोड।",
  path: "/ncert-books-for-mppsc",
  keywords: [
    "ncert books for mppsc",
    "ncert books for mppsc pdf",
    "ncert class 6 to 12 for mppsc",
    "mppsc ncert list in hindi",
    "mppsc ncert list in english",
    "best ncert books for mppsc prelims and mains",
    "how to read ncert for mppsc",
    "Aakar IAS NCERT Guide",
  ],
});

const faqs = [
  {
    q: "MPPSC की तैयारी के लिए कौन सी NCERT की पुस्तकें पढ़ना अनिवार्य है? (NCERT Books for MPPSC)",
    a: "MPPSC परीक्षा के लिए कक्षा 6 से 12 की इतिहास (Our Pasts, Themes in Indian History), भूगोल (Physical Geography), राजनीति (Democratic Politics & Indian Constitution), अर्थशास्त्र (Class 9-12), और सामान्य विज्ञान (Class 6-10) की NCERT पुस्तकें पढ़ना अत्यंत अनिवार्य है।",
  },
  {
    q: "क्या MPPSC Prelims और Mains दोनों के लिए NCERT पढ़ना जरूरी है?",
    a: "जी हां, NCERT पुस्तकें बेसिक कॉन्सेप्ट्स और फैक्ट्स को मजबूत करती हैं, जिससे Prelims के डायरेक्ट प्रश्नों और Mains के 2-अंक व 7-अंक वाले प्रश्नों के उत्तर लिखने में बहुत मदद मिलती है।",
  },
  {
    q: "NCERT Books for MPPSC PDF हिंदी और अंग्रेजी में कहाँ से डाउनलोड करें?",
    a: "आप आकार IAS वेबसाइट के 'NCERT Books Section' से कक्षा 6 से 12 तक की सभी हिंदी और अंग्रेजी माध्यम NCERT पुस्तकें एक क्लिक में मुफ़्त डाउनलोड कर सकते हैं।",
  },
];

export default async function NcertBooksForMppscPage() {
  const repo = await getContentRepository();
  const ncertBooks = await repo.listNcertBooks();

  const pageUrl = `${siteConfig.url}/ncert-books-for-mppsc`;

  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    { name: "MPPSC", url: `${siteConfig.url}/mppsc` },
    { name: "NCERT Books for MPPSC", url: pageUrl },
  ]);

  const faqSchema = faqJsonLd(faqs);

  return (
    <>
      <JsonLd data={jsonLdGraph([breadcrumb, faqSchema])} />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-secondary text-secondary-foreground">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--primary)_0%,_transparent_50%)] opacity-20" />
        <Container size="wide" className="relative py-16 sm:py-20">
          <div className="max-w-4xl space-y-4">
            <span className="inline-block rounded-full bg-primary/15 px-4 py-1 text-xs font-extrabold uppercase tracking-wider text-primary">
              22,200+ Aspirants' #1 Choice Guide
            </span>
            <h1 className="text-balance text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight font-devanagari">
              NCERT Books for MPPSC PDF — Class 6 to 12 Complete Guide
            </h1>
            <p className="text-pretty text-base sm:text-lg text-white/80 leading-relaxed max-w-3xl font-devanagari">
              MPPSC राज्य सेवा परीक्षा (Prelims & Mains) में सफलता हेतु कक्षा 6 से 12 तक की सभी अनिवार्य NCERT पुस्तकों की विषय-वार सूची, प्राथमिकता मैट्रिक्स एवं मुफ़्त PDF डाउनलोड।
            </p>
            <div className="flex flex-wrap gap-4 pt-2 font-devanagari">
              <Button asChild size="lg" className="rounded-xl font-bold">
                <a href="#ncert-list">NCERT बुकलिस्ट देखें <ArrowRight className="ml-2 h-4 w-4" /></a>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-xl border-white/20 text-white bg-transparent hover:bg-white/10 hover:text-white font-bold">
                <Link href="/ncert-books"><Download className="mr-2 h-4 w-4" /> PDF फ्री डाउनलोड करें</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <Section className="pb-0 pt-8">
        <Container size="wide">
          <Breadcrumb items={[{ name: "MPPSC", href: "/mppsc" }, { name: "NCERT Books for MPPSC" }]} />
        </Container>
      </Section>

      {/* Class-wise NCERT Table */}
      <Section id="ncert-list" className="py-12">
        <Container size="wide">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground font-devanagari">
                MPPSC हेतु अनिवार्य NCERT पुस्तकों की कक्षा-वार सूची (Class 6-12)
              </h2>
              <p className="text-sm text-muted-foreground mt-1 font-devanagari">
                विषय-वार NCERT पुस्तकें जो MPPSC प्रारंभिक एवं मुख्य परीक्षा पाठ्यक्रम 2026 के लिए सबसे महत्वपूर्ण हैं
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6 space-y-3 border-2 border-border hover:border-primary/50 transition-all">
                <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full">इतिहास (History)</span>
                <h3 className="text-lg font-bold font-devanagari">History NCERT Books</h3>
                <ul className="text-sm text-muted-foreground space-y-1.5 font-devanagari">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" /> Class 6: हमारे अतीत - I</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" /> Class 7: हमारे अतीत - II</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" /> Class 8: हमारे अतीत - III</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" /> Class 11: प्राचीन व मध्यकालीन भारत</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" /> Class 12: भारतीय इतिहास के कुछ विषय</li>
                </ul>
              </Card>

              <Card className="p-6 space-y-3 border-2 border-border hover:border-primary/50 transition-all">
                <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full">भूगोल (Geography)</span>
                <h3 className="text-lg font-bold font-devanagari">Geography NCERT Books</h3>
                <ul className="text-sm text-muted-foreground space-y-1.5 font-devanagari">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" /> Class 6: पृथ्वी: हमारा आवास</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" /> Class 7: हमारा पर्यावरण</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" /> Class 8: संसाधन एवं विकास</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" /> Class 11: भौतिक भूगोल के सिद्धांत</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" /> Class 12: भारत: लोग व अर्थव्यवस्था</li>
                </ul>
              </Card>

              <Card className="p-6 space-y-3 border-2 border-border hover:border-primary/50 transition-all">
                <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full">राजव्यवस्था (Polity)</span>
                <h3 className="text-lg font-bold font-devanagari">Polity NCERT Books</h3>
                <ul className="text-sm text-muted-foreground space-y-1.5 font-devanagari">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" /> Class 9: लोकतांत्रिक राजनीति - I</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" /> Class 10: लोकतांत्रिक राजनीति - II</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" /> Class 11: भारतीय संविधान सिद्धांत</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" /> Class 11: राजनीतिक सिद्धांत</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" /> Class 12: स्वतंत्र भारत में राजनीति</li>
                </ul>
              </Card>

              <Card className="p-6 space-y-3 border-2 border-border hover:border-primary/50 transition-all">
                <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full">विज्ञान (Science)</span>
                <h3 className="text-lg font-bold font-devanagari">Science NCERT Books</h3>
                <ul className="text-sm text-muted-foreground space-y-1.5 font-devanagari">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" /> Class 6 से 10: सामान्य विज्ञान</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" /> Class 11-12: जीव विज्ञान (Biology)</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" /> Class 9-10: पर्यावरण व तकनीक</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" /> Class 11: भारतीय अर्थशास्त्र</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" /> Class 12: समष्टि अर्थशास्त्र</li>
                </ul>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ Section */}
      <Section className="bg-muted/30 py-12">
        <Container size="narrow">
          <div className="text-center space-y-4 mb-8">
            <h2 className="text-3xl font-bold font-devanagari flex items-center justify-center gap-2">
              <HelpCircle className="h-8 w-8 text-primary" /> NCERT Books for MPPSC FAQs
            </h2>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`}>
                <AccordionTrigger className="text-left font-semibold text-lg font-devanagari">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground font-devanagari leading-relaxed text-base">
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
