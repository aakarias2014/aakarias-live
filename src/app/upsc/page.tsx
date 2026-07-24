import Link from "next/link";
import { ArrowRight, BookOpen, Brain, Award, HelpCircle, CheckCircle2, FileText, Users, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumb } from "@/components/content/breadcrumb";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, faqJsonLd, jsonLdGraph } from "@/lib/seo/jsonld";
import { siteConfig } from "@/lib/site-config";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export const metadata: Metadata = buildMetadata({
  title: "Best UPSC Coaching in Indore | Aakar IAS Civil Services Academy",
  description: "Aakar IAS — Premier UPSC Coaching in Indore. IAS Civil Services Prelims, Mains & Interview guidance, GS Foundation batches, current affairs, and test series.",
  path: "/upsc",
  keywords: [
    "Best UPSC Coaching in Indore",
    "UPSC Coaching Indore",
    "IAS Coaching Indore",
    "UPSC Civil Services Indore",
    "Aakar IAS UPSC Indore",
    "UPSC Test Series Indore"
  ],
});

export default function UpscPage() {
  const pageUrl = `${siteConfig.url}/upsc`;

  const faqs = [
    {
      q: "इंदौर में UPSC सिविल सेवा परीक्षा हेतु सर्वश्रेष्ठ कोचिंग कौन सी है? (Best UPSC Coaching in Indore)",
      a: "आकार IAS (Aakar IAS) इंदौर में UPSC IAS सिविल सेवा परीक्षा की तैयारी हेतु एक अग्रणी संस्थान है। आकार IAS में अनुभवी संकाय सदस्यों द्वारा यूपीएससी प्रीलिम्स, मेन्स (GS 1-4, निबंध) व साक्षात्कार (Interview) का सम्पूर्ण फाउंडेशन बैच संचालित किया जाता है।",
    },
    {
      q: "क्या आकार IAS में हिंदी और अंग्रेजी दोनों माध्यमों में UPSC कोचिंग उपलब्ध है?",
      a: "हाँ, आकार IAS इंदौर में यूपीएससी सिविल सेवा परीक्षा हेतु पृथक हिंदी माध्यम एवं अंग्रेजी माध्यम बैच उपलब्ध हैं। इसके साथ ही अध्ययन सामग्री व टेस्ट सीरीज़ दोनों भाषाओं में प्रदान की जाती है।",
    },
    {
      q: "UPSC Mains Answer Writing और टेस्ट सीरीज़ में आकार IAS कैसे सहायता करता है?",
      a: "आकार IAS द्वारा यूपीएससी मेन्स उत्तर लेखन हेतु 48 घंटे के भीतर व्यक्तिगत कॉपी मूल्यांकन, मॉडल उत्तर, उत्तर संरचना सुधार वर्कशॉप और विषय-वार टेस्ट सीरीज़ प्रदान की जाती है।",
    },
  ];

  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    { name: "UPSC", url: pageUrl },
  ]);

  const faqSchema = faqJsonLd(faqs);

  return (
    <>
      <JsonLd data={jsonLdGraph([breadcrumb, faqSchema])} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-secondary text-secondary-foreground">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--primary)_0%,_transparent_50%)] opacity-20" />
        <Container size="wide" className="relative py-16 sm:py-20">
          <div className="max-w-3xl space-y-4">
            <span className="inline-block rounded-full bg-primary/15 px-4 py-1 text-xs font-extrabold uppercase tracking-wider text-primary">
              Best UPSC Coaching in Indore
            </span>
            <h1 className="text-balance text-4xl font-extrabold tracking-tight text-white sm:text-5xl leading-tight">
              UPSC Civil Services Coaching in Indore – आकार IAS
            </h1>
            <p className="text-pretty text-base sm:text-lg text-white/80 leading-relaxed">
              संघ लोक सेवा आयोग (UPSC CSE) प्रीलिम्स, मेन्स और इंटरव्यू की समग्र एवं रणनीतिक तैयारी हेतु इंदौर का प्रतिष्ठित सिविल सर्विसेज संस्थान।
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button asChild size="lg" className="rounded-xl font-bold">
                <Link href="/offline-courses">क्लासरूम बैच देखें <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-xl border-white/20 text-white bg-transparent hover:bg-white/10 hover:text-white font-bold">
                <Link href="/contact">परामर्श हेतु संपर्क करें</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <Section className="pb-0 pt-8">
        <Container size="wide">
          <Breadcrumb items={[{ name: "UPSC" }]} />
        </Container>
      </Section>

      {/* Key Offerings */}
      <Section className="py-12">
        <Container size="wide">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-3">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                UPSC CSE हेतु आकार IAS इंदौर की मुख्य विशेषताएं
              </h2>
              <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                नवीनतम संघ लोक सेवा आयोग पैटर्न के अनुरूप गहन विश्लेषण और व्यक्तिगत मार्गदर्शन।
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card border border-border rounded-2xl p-6 space-y-3 shadow-soft">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Brain className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-foreground text-lg">GS Foundation Batch</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  प्रीलिम्स + मेन्स हेतु 12-18 महीने का व्यापक क्लासरूम कोर्स विद बेसिक NCERT कवरेज।
                </p>
              </div>

              <div className="bg-card border border-border rounded-2xl p-6 space-y-3 shadow-soft">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <FileText className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-foreground text-lg">Mains Answer Writing</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  दैनिक संपादकीय (Editorial Analysis) आधारित उत्तर लेखन व विषय विशेषज्ञों द्वारा व्यक्तिगत इवैल्यूएशन।
                </p>
              </div>

              <div className="bg-card border border-border rounded-2xl p-6 space-y-3 shadow-soft">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Award className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-foreground text-lg">Test Series & Current Affairs</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  राष्ट्रीय व अंतरराष्ट्रीय समसामयिकी (The Hindu & PIB) का हिंदी/अंग्रेजी संकलन व मॉडल टेस्ट पेपर्स।
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* UPSC FAQs Accordion */}
      <Section className="py-12 bg-muted/20">
        <Container size="narrow">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-extrabold text-foreground">
                UPSC कोचिंग इंदौर (FAQs)
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
