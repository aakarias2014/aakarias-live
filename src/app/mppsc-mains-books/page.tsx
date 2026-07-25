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
  title: "Books for MPPSC Mains | MPPSC Mains Book List (Hindi & English Medium)",
  description: "Books for MPPSC Mains & MPPSC Mains Book List — Paper 1 to 6 complete recommended books list, topper book list, solved paper books & Aakar IAS Mains study material.",
  path: "/mppsc-mains-books",
  keywords: [
    "books for mppsc mains",
    "mppsc mains books",
    "mppsc mains book list",
    "mppsc book list for english medium",
    "mppsc book list for hindi medium",
    "mppsc mains solved paper book",
    "mppsc topper book list",
    "best books for mppsc mains paper 1 to 6",
    "mppsc mains general studies books",
    "Aakar IAS Mains Study Material",
  ],
});

const faqs = [
  {
    q: "MPPSC मुख्य परीक्षा (Mains) के लिए सबसे अच्छी पुस्तकें कौन सी हैं? (Books for MPPSC Mains)",
    a: "MPPSC Mains के लिए: Paper 1 (इतिहास/भूगोल) के लिए स्पेक्ट्रम व माजिद हुसैन, Paper 2 (राजव्यवस्था/अर्थशास्त्र) के लिए एम. लक्ष्मीकांत, Paper 3 (विज्ञान/तकनीक) के लिए NCERT व आकार IAS विशेष नोट्स, Paper 4 (नीतिशास्त्र) के लिए सुब्बा राव व आकार IAS नोट्स, और Paper 5 व 6 (हिंदी व निबंध) के लिए वासुदेवानंद प्रसाद।",
  },
  {
    q: "MPPSC Mains Book List for English Medium क्या है?",
    a: "English Medium: Paper 1 - Spectrum & Majid Husain; Paper 2 - M. Laxmikanth & NCERT Economics; Paper 3 - NCERT Science 6-10 & Aakar IAS Notes; Paper 4 - Subba Rao Ethics & Aakar IAS Notes.",
  },
  {
    q: "MPPSC Mains Solved Paper Book कौन सी पढ़नी चाहिए?",
    a: "MPPSC Mains के पिछले 10 वर्षों के प्रश्नों के बिंदुवार हल के लिए आकार IAS की 'MPPSC Mains Solved Paper Book' तथा 'Topper Evaluated Copies' सबसे प्रामाणिक स्रोत मानी जाती हैं।",
  },
];

export default async function MppscMainsBooksPage() {
  const pageUrl = `${siteConfig.url}/mppsc-mains-books`;

  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    { name: "MPPSC", url: `${siteConfig.url}/mppsc` },
    { name: "MPPSC Mains Books", url: pageUrl },
  ]);

  const faqSchema = faqJsonLd(faqs);

  const paperDetails = [
    { paper: "Paper 1 (GS-1)", title: "इतिहास, संस्कृति एवं भूगोल", books: "आकार IAS हस्तलिखित नोट्स, स्पेक्ट्रम (आधुनिक भारत), माजिद हुसैन (भारत व विश्व भूगोल), NCERT Class 11-12।" },
    { paper: "Paper 2 (GS-2)", title: "राजव्यवस्था, अर्थशास्त्र एवं समाजशास्त्र", books: "एम. लक्ष्मीकांत (भारतीय राजव्यवस्था), आकार IAS अर्थशास्त्र नोट्स, NCERT Class 11 भारतीय अर्थव्यवस्था।" },
    { paper: "Paper 3 (GS-3)", title: "विज्ञान एवं प्रौद्योगिकी (Science & Tech)", books: "आकार IAS साइंस स्पेशल बुकलेट, NCERT Class 6-10 Science, Lucent General Science & Computer।" },
    { paper: "Paper 4 (GS-4)", title: "दर्शनशास्त्र, मनोविज्ञान एवं नीतिशास्त्र (Ethics)", books: "आकार IAS नीतिशास्त्र क्लासरूम नोट्स, सुब्बा राव (Ethics), विचारक एवं जीवनी संग्रह।" },
    { paper: "Paper 5", title: "सामान्य हिंदी एवं व्याकरण", books: "डॉ. वासुदेवानंद प्रसाद (आधुनिक हिंदी व्याकरण), चंचल जैन हिंदी बुक / आकार IAS अभ्यास पुस्तिका।" },
    { paper: "Paper 6", title: "हिंदी निबंध एवं प्रारूप लेखन", books: "आकार IAS समसामयिक निबंध संग्रह, योजना/कुरुक्षेत्र पत्रिकाएँ, मॉडल ड्राफ्ट हैंडआउट्स।" },
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
              26,900+ Monthly Search Traffic #1 Target
            </span>
            <h1 className="text-balance text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight font-devanagari">
              Books for MPPSC Mains — Paper 1 to 6 Complete Book List
            </h1>
            <p className="text-pretty text-base sm:text-lg text-white/80 leading-relaxed max-w-3xl font-devanagari">
              MPPSC मुख्य परीक्षा 2026 के सभी 6 प्रश्न पत्रों की मानक पुस्तकों की प्रामाणिक सूची, हिंदी व अंग्रेजी माध्यम बुकलिस्ट, टॉपर्स बुकलिस्ट एवं सॉल्वेड पेपर्स बुक्स।
            </p>
            <div className="flex flex-wrap gap-4 pt-2 font-devanagari">
              <Button asChild size="lg" className="rounded-xl font-bold">
                <a href="#mains-list">पेपर-वार बुकलिस्ट देखें <ArrowRight className="ml-2 h-4 w-4" /></a>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-xl border-white/20 text-white bg-transparent hover:bg-white/10 hover:text-white font-bold">
                <Link href="/mppsc-notes"><Download className="mr-2 h-4 w-4" /> Mains Notes PDF डाउनलोड करें</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <Section className="pb-0 pt-8">
        <Container size="wide">
          <Breadcrumb items={[{ name: "MPPSC", href: "/mppsc" }, { name: "MPPSC Mains Books" }]} />
        </Container>
      </Section>

      {/* Paper-wise Details */}
      <Section id="mains-list" className="py-12">
        <Container size="wide">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground font-devanagari">
                Books for MPPSC Mains (Paper 1 to 6 Detailed Book List)
              </h2>
              <p className="text-sm text-muted-foreground mt-1 font-devanagari">
                मुख्य परीक्षा के प्रत्येक पेपर के लिए सर्वश्रेष्ठ मानक पुस्तकें और आकार IAS स्टडी मटेरियल
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paperDetails.map((p, index) => (
                <Card key={index} className="p-6 space-y-3 border-2 border-border hover:border-primary/50 transition-all flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full">{p.paper}</span>
                    <h3 className="text-xl font-bold font-devanagari">{p.title}</h3>
                    <p className="text-sm text-muted-foreground font-devanagari leading-relaxed">
                      {p.books}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" asChild className="w-full mt-4 font-devanagari">
                    <Link href="/mppsc-notes">नोट्स व बुकलेट ऑर्डर करें</Link>
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ Section */}
      <Section className="bg-muted/30 py-12">
        <Container size="narrow">
          <div className="text-center space-y-4 mb-8">
            <h2 className="text-3xl font-bold font-devanagari flex items-center justify-center gap-2">
              <HelpCircle className="h-8 w-8 text-primary" /> MPPSC Mains Books FAQs
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
