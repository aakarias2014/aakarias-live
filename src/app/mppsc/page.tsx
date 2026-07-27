import Link from "next/link";
import { ArrowRight, CheckCircle2, Award, BookOpen, Brain, HelpCircle, FileText } from "lucide-react";
import type { Metadata } from "next";
import { getContentRepository } from "@/lib/content/content-repository";
import { buildMetadata } from "@/lib/seo/metadata";
import { ArticleCard } from "@/components/content/article-card";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Newsletter } from "@/components/content/newsletter";
import { Breadcrumb } from "@/components/content/breadcrumb";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, collectionPageJsonLd, faqJsonLd, jsonLdGraph } from "@/lib/seo/jsonld";
import { siteConfig } from "@/lib/site-config";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export const revalidate = 600;

export const metadata: Metadata = buildMetadata({
  title: "Best MPPSC Coaching in Indore | Aakar IAS MPPSC Notes & Mains Test Series",
  description: "Aakar IAS — Best MPPSC Coaching in Indore. Comprehensive MPPSC Prelims & Mains preparation, syllabus breakdown, daily notes, mains answer writing evaluation, and test series.",
  path: "/mppsc",
  keywords: [
    "Best MPPSC Coaching in Indore",
    "MPPSC Coaching Indore",
    "Best MPPSC Test Series",
    "MPPSC Mains Answer Writing",
    "Aakar IAS Indore",
    "MPPSC Notes Hindi",
    "MPPSC Syllabus 2026"
  ],
});

export default async function MppscPage() {
  const repo = await getContentRepository();
  const [latest, popular] = await Promise.all([
    repo.listArticles({ locale: "hi", tag: "mppsc", page: 1, pageSize: 6 }),
    repo.getPopular("hi", 3, "mppsc"),
  ]);

  const quickLinks = [
    { href: "/mppsc/mains-syllabus", title: "MPPSC Mains Syllabus", desc: "Paper 1-6 complete breakdown" },
    { href: "/mppsc/prelims-syllabus", title: "MPPSC Prelims Syllabus", desc: "10 Units GS Paper 1 & CSAT" },
    { href: "/mppsc/syllabus-2026", title: "MPPSC Full Syllabus 2026", desc: "Complete exam plan & syllabus" },
    { href: "/mppsc/previous-year-papers", title: "Previous Year Papers", desc: "2014-2025 Solved PYQs PDF" },
    { href: "/mppsc/toppers-copy", title: "Toppers Answer Copies", desc: "Real answer sheets & analysis" },
    { href: "/test-series", title: "Best MPPSC Test Series", desc: "FLT & Mains answer writing" },
  ];

  const faqs = [
    {
      q: "इंदौर में MPPSC की तैयारी के लिए सबसे अच्छी कोचिंग कौन सी है? (Best MPPSC Coaching in Indore)",
      a: "आकार IAS (Aakar IAS) इंदौर में MPPSC राज्य सेवा परीक्षा की तैयारी हेतु सर्वश्रेष्ठ कोचिंग संस्थान है। भंवरकुआं (राजीव गांधी सर्किल) कैंपस में स्थित आकार IAS उच्च स्तरीय अध्ययन सामग्री, हिंदी व अंग्रेजी माध्यम क्लासरूम बैच, 48 घंटे के भीतर उत्तर पुस्तिका मूल्यांकन और विजयसिद्धि टेस्ट सीरीज प्रदान करता है।",
    },
    {
      q: "MPPSC Mains Answer Writing (उत्तर लेखन) के लिए कौन सी कोचिंग बेस्ट है?",
      a: "आकार IAS की 'Answer Improvement Lab' और उत्तर लेखन कार्यक्रम MPPSC मुख्य परीक्षा हेतु मध्य भारत में सर्वश्रेष्ठ माने जाते हैं। यहाँ पूर्व चयनित अधिकारियों व विशेषज्ञों द्वारा बिंदुवार प्रतिक्रिया और मॉडल उत्तर दिए जाते हैं।",
    },
    {
      q: "MPPSC की सबसे अच्छी टेस्ट सीरीज़ कौन सी है? (Best MPPSC Test Series)",
      a: "आकार IAS की 'विजयसिद्धि टेस्ट सीरीज़' MPPSC प्रारंभिक एवं मुख्य परीक्षा हेतु सबसे प्रामाणिक टेस्ट सीरीज़ है। इसमें 6 फुल लेंथ टेस्ट (FLTs), विषय-वार टेस्ट, ऑल-एमपी रैंकिंग और विस्तृत समाधान प्रदान किए जाते हैं।",
    },
    {
      q: "आकार IAS इंदौर का पता और संपर्क सूत्र क्या है?",
      a: "आकार IAS का मुख्य परिसर 178/2/4 - ए बी रोड, राजीव गांधी सर्किल के पास, पिपलिया राव, भंवरकुआं, इंदौर में स्थित है। संपर्क नंबर: +91 9713300123 / +91 9691136119।",
    },
  ];

  const pageUrl = `${siteConfig.url}/mppsc`;
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    { name: "MPPSC", url: pageUrl },
  ]);

  const collectionPage = collectionPageJsonLd({
    name: "Best MPPSC Coaching in Indore - Aakar IAS",
    description: "Best MPPSC Coaching in Indore. Comprehensive MPPSC Prelims & Mains preparation, daily notes, mains answer writing, and test series.",
    url: pageUrl,
    inLanguage: "hi-IN",
    items: latest.items.map((a) => ({
      name: a.title,
      url: `${siteConfig.url}${a.href}`,
    })),
  });

  const faqSchema = faqJsonLd(faqs);

  return (
    <>
      <JsonLd data={jsonLdGraph([breadcrumb, collectionPage, faqSchema])} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-secondary text-secondary-foreground">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--primary)_0%,_transparent_50%)] opacity-20" />
        <Container size="wide" className="relative py-16 sm:py-20">
          <div className="max-w-3xl space-y-4">
            <span className="inline-block rounded-full bg-primary/15 px-4 py-1 text-xs font-extrabold uppercase tracking-wider text-primary">
              Best MPPSC Coaching in Indore
            </span>
            <h1 className="text-balance text-4xl font-extrabold tracking-tight text-white sm:text-5xl leading-tight">
              MPPSC कोचिंग इंदौर: आकार IAS सिविल सर्विसेज एकादमी
            </h1>
            <p className="text-pretty text-base sm:text-lg text-white/80 leading-relaxed">
              मध्य प्रदेश राज्य सेवा परीक्षा (MPPSC Prelims & Mains) की तैयारी हेतु इंदौर का नंबर-1 संस्थान। एक्सपर्ट फैकल्टी, रिसर्च-बेस्ड नोट्स, उत्तर लेखन लैब और विजयसिद्धि टेस्ट सीरीज़।
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button asChild size="lg" className="rounded-xl font-bold">
                <Link href="/offline-courses">ऑफलाइन बैच देखें <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-xl border-white/20 text-white bg-transparent hover:bg-white/10 hover:text-white font-bold">
                <Link href="/test-series">MPPSC टेस्ट सीरीज देखें</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <Section>
        <Container size="wide">
          <Breadcrumb items={[{ name: "MPPSC" }]} />
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {quickLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-2xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-soft-lg"
              >
                <h3 className="text-lg font-bold text-foreground group-hover:text-primary">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Explore <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* Why Aakar IAS is Best MPPSC Coaching in Indore */}
      <Section className="bg-muted/20 py-12">
        <Container size="wide">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-3">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                क्यों आकार IAS है इंदौर में MPPSC की सर्वश्रेष्ठ कोचिंग?
              </h2>
              <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                MPPSC परीक्षा पैटर्न और नवीन पाठ्यक्रम 2026 के अनुरूप विशेष रूप से डिज़ाइन किया गया तैयारी ढांचा।
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card border border-border rounded-2xl p-6 space-y-3 shadow-soft">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Brain className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-foreground text-lg">Mains Answer Writing Lab</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  48 घंटे के भीतर विषय विशेषज्ञों द्वारा उत्तर पुस्तिका का व्यक्तिगत मूल्यांकन व बिंदुवार सुधार सुझाव।
                </p>
              </div>

              <div className="bg-card border border-border rounded-2xl p-6 space-y-3 shadow-soft">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Award className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-foreground text-lg">Top Rankers Guidance</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  MPPSC में प्रथम रैंक व शीर्ष पदों पर चयनित अभ्यर्थियों की उत्तर पुस्तिकाओं का अध्ययन व मार्गदर्शन।
                </p>
              </div>

              <div className="bg-card border border-border rounded-2xl p-6 space-y-3 shadow-soft">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <BookOpen className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-foreground text-lg">MP Special GK & Notes</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  मध्य प्रदेश सामान्य ज्ञान, इतिहास, भूगोल व राज्य व्यवस्था पर अद्यतन एवं प्रमाणित अध्ययन सामग्री।
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {latest.items.length > 0 && (
        <Section title="Latest for MPPSC" description="Fresh content tagged for MPPSC aspirants.">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latest.items.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button variant="outline" asChild>
              <Link href="/tag/mppsc">View all MPPSC articles <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
        </Section>
      )}

      {popular.length > 0 && (
        <Section title="Popular Reads" description="Trending articles among aspirants." className="bg-muted/20">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {popular.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        </Section>
      )}

      {/* MPPSC FAQs Accordion Section */}
      <Section className="py-12">
        <Container size="narrow">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-extrabold text-foreground">
                MPPSC कोचिंग व तैयारी संबंधी अक्सर पूछे जाने वाले प्रश्न (FAQs)
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

      <Section className="py-12 bg-muted/20">
        <Container size="narrow">
          <Newsletter variant="section" />
        </Container>
      </Section>
    </>
  );
}
