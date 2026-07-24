import type { Metadata } from "next";
import Link from "next/link";
import { getContentRepository } from "@/lib/content/content-repository";
import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumb } from "@/components/content/breadcrumb";
import { Button } from "@/components/ui/button";
import { BookOpen, Download, CheckCircle2, Sparkles, HelpCircle, ArrowRight, Star, FileText } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, faqJsonLd, jsonLdGraph } from "@/lib/seo/jsonld";
import { siteConfig } from "@/lib/site-config";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: "Books for MPPSC Mains & Prelims + NCERT Books for MPPSC PDF | Aakar IAS Booklist",
  description: "MPPSC प्रारंभिक एवं मुख्य परीक्षा (Prelims & Mains) हेतु सर्वश्रेष्ठ किताबों की सूची (Best Standard Books & NCERT Class 6-12 List for MPPSC) हिंदी व अंग्रेजी में। मुफ़्त PDF डाउनलोड।",
  path: "/mppsc/books-and-ncert-list",
  keywords: [
    "books for mppsc mains",
    "ncert books for mppsc",
    "mppsc mains booklist hindi",
    "mppsc best books for prelims and mains",
    "ncert class 6 to 12 for mppsc",
    "Aakar IAS MPPSC Notes",
  ],
});

export default async function MppscBooksAndNcertPage() {
  const repo = await getContentRepository();
  const ncertBooks = await repo.listNcertBooks();

  const pageUrl = `${siteConfig.url}/mppsc/books-and-ncert-list`;

  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    { name: "MPPSC", url: `${siteConfig.url}/mppsc` },
    { name: "MPPSC Books & NCERT List", url: pageUrl },
  ]);

  const faqs = [
    {
      q: "MPPSC मुख्य परीक्षा (Mains) के लिए कौन सी किताबें सबसे अच्छी हैं? (Best Books for MPPSC Mains)",
      a: "MPPSC Mains के लिए आकार IAS के प्रिंटेड क्लासरूम नोट्स, एम. लक्ष्मीकांत (राजव्यवस्था), माजिद हुसैन (भूगोल), विपिन चंद्रा/स्पेक्ट्रम (इतिहास), और वासुदेवानंद प्रसाद (सामान्य हिंदी) सबसे प्रामाणिक स्रोत माने जाते हैं।",
    },
    {
      q: "क्या MPPSC की तैयारी के लिए NCERT की किताबें पढ़ना अनिवार्य है? (NCERT Books for MPPSC)",
      a: "हाँ, MPPSC प्रारंभिक व मुख्य परीक्षा के मूलभूत सिद्धांतों (Basic Concepts) को समझने के लिए कक्षा 6 से 12 तक की NCERT इतिहास, भूगोल, राजनीति, और विज्ञान की पुस्तकें पढ़ना अत्यंत आवश्यक है।",
    },
    {
      q: "आकार IAS के MPPSC प्रिंटेड नोट्स कहाँ से प्राप्त करें?",
      a: "आप आकार IAS के भंवरकुआं (इंदौर) परिसर से या इस वेबसाइट के 'Publications & Study Material' सेक्शन से MPPSC नवीनतम पाठ्यक्रम 2026 पर आधारित प्रिंटेड नोट्स ऑर्डर कर सकते हैं।",
    },
  ];

  const faqSchema = faqJsonLd(faqs);

  const mainsBooklist = [
    {
      paper: "GS Paper 1",
      subject: "इतिहास, संस्कृति व भूगोल (History & Geography)",
      standardBooks: "आकार IAS हस्तलिखित नोट्स, प्राचीन व मध्यकालीन भारत (NCERT), स्पेक्ट्रम आधुनिक भारत, माजिद हुसैन भारत व विश्व भूगोल, म.प्र. सामान्य ज्ञान (आकार IAS विशेष)।",
      importance: "अनिवार्य (Must Read)",
    },
    {
      paper: "GS Paper 2",
      subject: "राजनीति, अर्थशास्त्र व समाजशास्त्र (Polity, Economics & Sociology)",
      standardBooks: "एम. लक्ष्मीकांत (भारतीय राजव्यवस्था), आकार IAS अर्थशास्त्र नोट्स, कक्षा 11 NCERT भारतीय अर्थव्यवस्था, समाजशास्त्र आकार विशेष नोट्स।",
      importance: "अनिवार्य (Must Read)",
    },
    {
      paper: "GS Paper 3",
      subject: "विज्ञान, प्रौद्योगिकी व गणित (Science & Technology)",
      standardBooks: "आकार IAS विज्ञान व तकनीक स्पेशल नोट्स, कक्षा 6 से 10 NCERT विज्ञान, कंप्यूटर व पर्यावरण विशेष संकलन।",
      importance: "उच्च (High Priority)",
    },
    {
      paper: "GS Paper 4",
      subject: "दर्शनशास्त्र, मनोविज्ञान व नीतिशास्त्र (Ethics & Philosophy)",
      standardBooks: "आकार IAS नीतिशास्त्र क्लासरूम नोट्स, सुब्बा राव (Ethics), महापुरुषों व विचारकों के जीवनी संग्रह।",
      importance: "उच्च (High Priority)",
    },
    {
      paper: "Paper 5",
      subject: "सामान्य हिंदी एवं व्याकरण (General Hindi)",
      standardBooks: "डॉ. वासुदेवानंद प्रसाद (आधुनिक हिंदी व्याकरण), आकार IAS हिंदी अभ्यास पुस्तिका व अलंकार/मुहावरे संकलन।",
      importance: "स्कोरिंग (High Scoring)",
    },
    {
      paper: "Paper 6",
      subject: "हिंदी निबंध एवं प्रारूप लेखन (Hindi Essay & Draft Writing)",
      standardBooks: "आकार IAS समसामयिक निबंध संग्रह, योजना व कुरुक्षेत्र पत्रिकाएं, प्रारूप लेखन विशेष हैंडआउट्स।",
      importance: "स्कोरिंग (High Scoring)",
    },
  ];

  const ncertClassMapping = [
    { class: "कक्षा 6 - 8", subjects: "इतिहास, भूगोल, सामाजिक विज्ञान, सामान्य विज्ञान", desc: "बुनियादी अवधारणाओं (Basic Foundations) के लिए अनिवार्य।" },
    { class: "कक्षा 9 - 10", subjects: "लोकतांत्रिक राजनीति, समकालीन भारत (भूगोल), अर्थशास्त्र, विज्ञान", desc: "प्रारंभिक परीक्षा (Prelims) अवधारणा निर्माण।" },
    { class: "कक्षा 11 - 12", subjects: "भारतीय संविधान व कार्यप्रणाली, भौतिक भूगोल, भारतीय अर्थव्यवस्था, आधुनिक भारत", desc: "मुख्य परीक्षा (Mains) हेतु अति-महत्वपूर्ण।" },
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
              MPPSC Standard Booklist & NCERT Guide
            </span>
            <h1 className="text-balance text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              Books for MPPSC Mains & Prelims + NCERT Books List PDF
            </h1>
            <p className="text-pretty text-base sm:text-lg text-white/80 leading-relaxed max-w-3xl">
              मध्य प्रदेश लोक सेवा आयोग (MPPSC) प्रारंभिक एवं मुख्य परीक्षा की सर्वोत्कृष्ट तैयारी हेतु विषय-वार प्रामाणिक पुस्तकों (Standard Reference Books) और कक्षा 6 से 12 तक की अनिवार्य NCERT की संपूर्ण सूची।
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button asChild size="lg" className="rounded-xl font-bold">
                <a href="#mains-booklist">MPPSC Mains बुकलिस्ट देखें <ArrowRight className="ml-2 h-4 w-4" /></a>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-xl border-white/20 text-white bg-transparent hover:bg-white/10 hover:text-white font-bold">
                <Link href="/ncert-books">NCERT Books PDF डाउनलोड करें</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <Section className="pb-0 pt-8">
        <Container size="wide">
          <Breadcrumb items={[{ name: "MPPSC", href: "/mppsc" }, { name: "Books & NCERT List" }]} />
        </Container>
      </Section>

      {/* Mains Subject-Wise Booklist */}
      <Section id="mains-booklist" className="py-12">
        <Container size="wide">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                MPPSC Mains Books List (विषय-वार मानक पुस्तकें व नोट्स)
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                MPPSC मुख्य परीक्षा के प्रश्न पत्र 1 से 6 हेतु आकार IAS एक्सपर्ट्स द्वारा अनुशंसित प्रामाणिक पुस्तकें
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mainsBooklist.map((item, i) => (
                <div key={i} className="bg-card border border-border/80 rounded-2xl p-6 shadow-soft space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-primary/10 text-primary">
                        {item.paper}
                      </span>
                      <span className="text-xs font-semibold text-emerald-600 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                        {item.importance}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-foreground">{item.subject}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed pt-1">
                      <strong className="text-foreground font-semibold">अनुशंसित पुस्तकें:</strong> {item.standardBooks}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* NCERT Books for MPPSC Section */}
      <Section className="py-12 bg-muted/20">
        <Container size="wide">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                NCERT Books for MPPSC (कक्षा 6 से 12 तक अनिवार्य सूची)
              </h2>
              <p className="text-sm text-muted-foreground">
                MPPSC परीक्षा के बुनियादी आधार (Basics) मजबूत करने हेतु NCERT पठन योजना
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {ncertClassMapping.map((ncert, i) => (
                <div key={i} className="bg-card border border-border/80 rounded-2xl p-6 shadow-soft space-y-3">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-black text-sm">
                    {ncert.class}
                  </div>
                  <h3 className="font-bold text-foreground text-base">{ncert.subjects}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{ncert.desc}</p>
                </div>
              ))}
            </div>

            <div className="text-center pt-4">
              <Button size="lg" className="rounded-xl font-bold" asChild>
                <Link href="/ncert-books">
                  <Download className="mr-2 h-4 w-4" /> सभी NCERT पुस्तकें हिंदी PDF डाउनलोड करें
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQs Section */}
      <Section className="py-12">
        <Container size="narrow">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-extrabold text-foreground">
                MPPSC बुकलिस्ट व NCERT (FAQs)
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
