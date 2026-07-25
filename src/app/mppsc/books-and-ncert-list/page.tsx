import type { Metadata } from "next";
import Link from "next/link";
import { getContentRepository } from "@/lib/content/content-repository";
import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumb } from "@/components/content/breadcrumb";
import { Button } from "@/components/ui/button";
import { BookOpen, Download, CheckCircle2, Sparkles, HelpCircle, ArrowRight, Star, FileText, Check } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, faqJsonLd, jsonLdGraph } from "@/lib/seo/jsonld";
import { siteConfig } from "@/lib/site-config";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: "Books for MPPSC Mains & Prelims + NCERT Books for MPPSC PDF | Aakar IAS Booklist",
  description: "MPPSC Books List & NCERT Books for MPPSC PDF (Hindi & English Medium). MPPSC Mains books, topper book list, solved paper books & complete subject-wise study material list.",
  path: "/mppsc/books-and-ncert-list",
  keywords: [
    "ncert books for mppsc",
    "books for mppsc mains",
    "mppsc mains books",
    "mppsc book list for english medium",
    "mppsc book list for hindi medium",
    "mppsc mains book list",
    "mppsc book list",
    "mppsc books",
    "mppsc mains solved paper book",
    "mppsc topper book list",
    "book list for mppsc",
    "best book for mppsc",
    "chanchal jain hindi book for mppsc pdf",
    "mp book for mppsc",
    "mppsc books pdf",
    "history book for mppsc",
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
      q: "MPPSC मुख्य परीक्षा (Mains) के लिए सबसे अच्छी पुस्तकें कौन सी हैं? (Books for MPPSC Mains)",
      a: "MPPSC Mains के लिए आकार IAS क्लासरूम प्रिंटेड नोट्स, एम. लक्ष्मीकांत (भारतीय राजव्यवस्था), माजिद हुसैन (भूगोल), स्पेक्ट्रम (आधुनिक इतिहास), और डॉ. वासुदेवानंद प्रसाद (सामान्य हिंदी) सबसे प्रामाणिक स्रोत माने जाते हैं।",
    },
    {
      q: "क्या MPPSC की तैयारी के लिए NCERT की पुस्तकें पढ़ना अनिवार्य है? (NCERT Books for MPPSC)",
      a: "हाँ, MPPSC प्रारंभिक व मुख्य परीक्षा के बेसिक कॉन्सेप्ट्स के लिए कक्षा 6 से 12 तक की NCERT इतिहास, भूगोल, राजनीति (Polity), और सामान्य विज्ञान (General Science) की पुस्तकें पढ़ना अत्यंत आवश्यक है।",
    },
    {
      q: "MPPSC Book List for English Medium क्या है?",
      a: "English Medium अभ्यर्थियों के लिए: Indian Polity by M. Laxmikanth, Geography of India by Majid Husain, Modern History by Spectrum, MP GK by Aakar IAS English Notes, and General Science NCERT Class 6-10.",
    },
    {
      q: "MPPSC Topper Book List क्या है?",
      a: "MPPSC टॉपर्स मुख्य रूप से सीमित प्रामाणिक पुस्तकें और आकार IAS की 'Answer Improvement Lab' नोट्स व सॉल्वेड पेपर्स बुक्स (MPPSC Mains Solved Paper Book) को बार-बार रिविजन करने की सलाह देते हैं।",
    },
  ];

  const faqSchema = faqJsonLd(faqs);

  const mainsBooklistHindi = [
    { paper: "Paper 1: GS-1", subject: "इतिहास एवं भूगोल (History & Geography)", standardBooks: "आकार IAS नोट्स, स्पेक्ट्रम (आधुनिक इतिहास), माजिद हुसैन (भूगोल), NCERT Class 6-12", importance: "अनिवार्य" },
    { paper: "Paper 2: GS-2", subject: "राजनीति, अर्थशास्त्र व समाजशास्त्र (Polity & Economics)", standardBooks: "एम. लक्ष्मीकांत (राजव्यवस्था), आकार IAS अर्थशास्त्र नोट्स, NCERT Class 11-12 Economics", importance: "अनिवार्य" },
    { paper: "Paper 3: GS-3", subject: "विज्ञान एवं प्रौद्योगिकी (Science & Technology)", standardBooks: "आकार IAS साइंस स्पेशल नोट्स, NCERT Class 6-10 Science, Lucent General Science", importance: "उच्च स्कोरिंग" },
    { paper: "Paper 4: GS-4", subject: "दर्शनशास्त्र, मनोविज्ञान व नीतिशास्त्र (Ethics)", standardBooks: "आकार IAS नीतिशास्त्र क्लासरूम नोट्स, सुब्बा राव (Ethics), विचारक जीवनियाँ", importance: "उच्च स्कोरिंग" },
    { paper: "Paper 5", subject: "सामान्य हिंदी एवं व्याकरण (General Hindi)", standardBooks: "डॉ. वासुदेवानंद प्रसाद (आधुनिक हिंदी व्याकरण), चंचल जैन हिंदी बुक / आकार IAS अभ्यास पुस्तिका", importance: "अति-महत्वपूर्ण" },
    { paper: "Paper 6", subject: "हिंदी निबंध एवं प्रारूप लेखन (Hindi Essay & Draft)", standardBooks: "आकार IAS समसामयिक निबंध संग्रह, प्रारूप लेखन विशेष संकलन", importance: "अति-महत्वपूर्ण" },
  ];

  const mainsBooklistEnglish = [
    { paper: "Paper 1: GS-1", subject: "History & Geography", standardBooks: "Spectrum Modern India, Majid Husain Geography, Aakar IAS Printed Notes", importance: "Must Read" },
    { paper: "Paper 2: GS-2", subject: "Polity, Economics & Sociology", standardBooks: "M. Laxmikanth (Indian Polity), NCERT Class 11-12 Economics, Aakar IAS Notes", importance: "Must Read" },
    { paper: "Paper 3: GS-3", subject: "Science & Technology", standardBooks: "NCERT Science Class 6-10, Aakar IAS Science Special Notes, Environment by Shankar IAS", importance: "High Scoring" },
    { paper: "Paper 4: GS-4", subject: "Ethics, Integrity & Aptitude", standardBooks: "Ethics by Subba Rao, Aakar IAS English Classroom Notes", importance: "High Scoring" },
    { paper: "Paper 5 & 6", subject: "General Hindi & Essay", standardBooks: "Vasudevanand Prasad Hindi Vyakaran & Aakar IAS Model Draft Booklets", importance: "Crucial" },
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
              MPPSC Standard Booklist & NCERT Guide 2026
            </span>
            <h1 className="text-balance text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight font-devanagari">
              Books for MPPSC Mains & Prelims + NCERT Books for MPPSC PDF
            </h1>
            <p className="text-pretty text-base sm:text-lg text-white/80 leading-relaxed max-w-3xl font-devanagari">
              MPPSC प्रारंभिक व मुख्य परीक्षा (Prelims & Mains) की तैयारी के लिए सर्वश्रेष्ठ किताबों की सूची (Best Books for MPPSC), NCERT Class 6-12 Booklist (Hindi & English Medium) और सॉल्वेड पेपर्स बुक्स।
            </p>
            <div className="flex flex-wrap gap-4 pt-2 font-devanagari">
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

      {/* Hindi Medium Booklist Table */}
      <Section id="mains-booklist" className="py-12">
        <Container size="wide">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground font-devanagari">
                MPPSC Book List for Hindi Medium (हिंदी माध्यम मुख्य परीक्षा पुस्तकें)
              </h2>
              <p className="text-sm text-muted-foreground mt-1 font-devanagari">
                MPPSC मुख्य परीक्षा 2026 के लिए टॉपर्स एवं विषय विशेषज्ञों द्वारा अनुशंसित सर्वश्रेष्ठ प्रामाणिक पुस्तकें
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-xs">
              <table className="w-full text-left text-sm font-devanagari">
                <thead className="bg-muted text-muted-foreground uppercase text-xs">
                  <tr>
                    <th className="p-4 font-bold">प्रश्न पत्र (Paper)</th>
                    <th className="p-4 font-bold">विषय (Subject)</th>
                    <th className="p-4 font-bold">सर्वश्रेष्ठ पुस्तकें व नोट्स (Standard Books)</th>
                    <th className="p-4 font-bold">महत्व</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {mainsBooklistHindi.map((b, i) => (
                    <tr key={i} className="hover:bg-muted/50 transition-colors">
                      <td className="p-4 font-extrabold text-primary">{b.paper}</td>
                      <td className="p-4 font-medium">{b.subject}</td>
                      <td className="p-4 text-muted-foreground leading-relaxed">{b.standardBooks}</td>
                      <td className="p-4"><span className="inline-block rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-xs font-bold px-2.5 py-0.5">{b.importance}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Container>
      </Section>

      {/* English Medium Booklist Table */}
      <Section className="py-12 bg-muted/30">
        <Container size="wide">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                MPPSC Book List for English Medium (Books for MPPSC Mains & Prelims)
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Standard reference books and Aakar IAS English study material for English medium MPPSC candidates
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-xs">
              <table className="w-full text-left text-sm">
                <thead className="bg-muted text-muted-foreground uppercase text-xs">
                  <tr>
                    <th className="p-4 font-bold">Paper</th>
                    <th className="p-4 font-bold">Subject</th>
                    <th className="p-4 font-bold">Recommended Standard Books</th>
                    <th className="p-4 font-bold">Priority</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {mainsBooklistEnglish.map((b, i) => (
                    <tr key={i} className="hover:bg-muted/50 transition-colors">
                      <td className="p-4 font-extrabold text-primary">{b.paper}</td>
                      <td className="p-4 font-medium">{b.subject}</td>
                      <td className="p-4 text-muted-foreground leading-relaxed">{b.standardBooks}</td>
                      <td className="p-4"><span className="inline-block rounded-full bg-primary/10 text-primary text-xs font-bold px-2.5 py-0.5">{b.importance}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Container>
      </Section>

      {/* NCERT Books Section */}
      <Section className="py-12">
        <Container size="wide">
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground font-devanagari">
                  NCERT Books for MPPSC PDF (Class 6 to 12 Must-Read List)
                </h2>
                <p className="text-sm text-muted-foreground mt-1 font-devanagari">
                  MPPSC प्रारंभिक व मुख्य परीक्षा के लिए आवश्यक NCERT पुस्तकों की विषय-वार सूची
                </p>
              </div>
              <Button asChild size="lg" className="rounded-xl shrink-0 font-devanagari font-bold">
                <Link href="/ncert-books"><Download className="mr-2 h-5 w-5" /> All NCERT PDFs Download</Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 space-y-3 border-2 border-border">
                <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full">History / इतिहास</span>
                <h3 className="text-lg font-bold font-devanagari">NCERT History Books</h3>
                <ul className="text-sm text-muted-foreground space-y-1 font-devanagari">
                  <li>• Class 6: हमारे अतीत - I</li>
                  <li>• Class 7: हमारे अतीत - II</li>
                  <li>• Class 8: हमारे अतीत - III</li>
                  <li>• Class 11: प्राचीन व मध्यकालीन भारत</li>
                  <li>• Class 12: भारतीय इतिहास के कुछ विषय</li>
                </ul>
              </Card>

              <Card className="p-6 space-y-3 border-2 border-border">
                <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full">Geography / भूगोल</span>
                <h3 className="text-lg font-bold font-devanagari">NCERT Geography Books</h3>
                <ul className="text-sm text-muted-foreground space-y-1 font-devanagari">
                  <li>• Class 6: पृथ्वी: हमारा आवास</li>
                  <li>• Class 7: हमारा पर्यावरण</li>
                  <li>• Class 8: संसाधन एवं विकास</li>
                  <li>• Class 11: भौतिक भूगोल के मूल सिद्धांत</li>
                  <li>• Class 12: भारत: लोग और अर्थव्यवस्था</li>
                </ul>
              </Card>

              <Card className="p-6 space-y-3 border-2 border-border">
                <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full">Polity & Science</span>
                <h3 className="text-lg font-bold font-devanagari">Polity & Science NCERT</h3>
                <ul className="text-sm text-muted-foreground space-y-1 font-devanagari">
                  <li>• Class 9-10: लोकतांत्रिक राजनीति</li>
                  <li>• Class 11: भारतीय संविधान: सिद्धांत व व्यवहार</li>
                  <li>• Class 6-10: सामान्य विज्ञान (General Science)</li>
                  <li>• Class 11: भारतीय अर्थव्यवस्था का विकास</li>
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
              <HelpCircle className="h-8 w-8 text-primary" /> MPPSC Books & Study Material FAQs
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
