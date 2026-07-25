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
  CheckCircle2, 
  HelpCircle, 
  Phone, 
  ShieldCheck, 
  ArrowRight,
  CreditCard,
  Percent,
  Sparkles,
  BookOpen
} from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "MPPSC Coaching Fees in Indore | आकार IAS कोचिंग फीस संरचना & EMI विवरण",
  description: "इंदौर में MPPSC कोचिंग की फीस कितनी है? आकार IAS (Aakar IAS) इंदौर में MPPSC प्रीलिम्स, मेन्स, फाउंडेशन बैच, टेस्ट सीरीज और ऑनलाइन कोर्सेज की पूरी फीस संरचना व किस्तों की जानकारी।",
  path: "/mppsc-coaching-fees-in-indore",
  keywords: [
    "MPPSC Coaching Fees in Indore",
    "MPPSC Coaching in Indore with Fees",
    "Aakar IAS Fees",
    "Aakar IAS MPPSC Online Course Fees",
    "MPPSC Mains Coaching Fees Indore",
    "MPPSC Coaching Charges Indore",
    "MPPSC Offline Coaching Fees",
    "Aakar IAS Indore Coaching Fees",
  ],
});

const faqs = [
  {
    q: "इंदौर में MPPSC कोचिंग की औसतन फीस कितनी है? (What is average MPPSC Coaching Fees in Indore?)",
    a: "इंदौर में MPPSC फाउंडेशन बैच (Prelims + Mains) की फीस औसतन ₹50,000 से ₹85,000 तक होती है। आकार IAS पारदर्शी और सस्ती फीस संरचना के साथ आसान किस्तों (Installments) और छात्रवृत्ति छूट की सुविधा भी प्रदान करता है।",
  },
  {
    q: "क्या आकार IAS में आसान किस्तों (EMI / Installments) में फीस देने की सुविधा है?",
    a: "जी हां, आकार IAS में छात्र अपनी सुविधानुसार 2 से 4 आसान किस्तों में फीस जमा कर सकते हैं। बिना किसी अतिरिक्त शुल्क के किस्त विकल्प उपलब्ध हैं।",
  },
  {
    q: "क्या आकार IAS की फीस में प्रिंटेड स्टडी नोट्स और टेस्ट सीरीज शामिल हैं?",
    a: "जी हां, क्लासरूम फाउंडेशन बैच में शामिल होने वाले सभी विद्यार्थियों को नवीनतम MPPSC सिलेबस 2026 के प्रिंटेड नोट्स, टेस्ट सीरीज और मोबाइल ऐप का एक्सेस फीस में ही शामिल करके दिया जाता है।",
  },
  {
    q: "क्या आकार IAS में स्कॉलरशिप टेस्ट (छात्रवृत्ति छूट) होती है?",
    a: "जी हां, आकार IAS वर्ष भर मेधावी एवं आर्थिक रूप से कमजोर छात्रों के लिए स्कॉलरशिप टेस्ट आयोजित करता है जिसमें 10% से 50% तक फीस छूट प्रदान की जाती है।",
  },
];

export default function MppscCoachingFeesIndorePage() {
  const pageUrl = `${siteConfig.url}/mppsc-coaching-fees-in-indore`;

  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    { name: "MPPSC", url: `${siteConfig.url}/mppsc` },
    { name: "MPPSC Coaching Fees in Indore", url: pageUrl },
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
              { name: "MPPSC Coaching Fees in Indore", href: "/mppsc-coaching-fees-in-indore" },
            ]}
          />

          <div className="mt-8 max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
              <CreditCard className="h-4 w-4" /> 100% सुलभ व पारदर्शी फीस संरचना
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl font-devanagari leading-tight">
              MPPSC Coaching Fees in Indore — <span className="text-primary">आकार IAS</span>
            </h1>

            <p className="text-lg text-muted-foreground font-devanagari leading-relaxed">
              इंदौर में किफायती एवं गुणवत्तापूर्ण MPPSC कोचिंग का सर्वोत्तम विकल्प। जानें प्रीलिम्स, मेन्स, फाउंडेशन बैच, टेस्ट सीरीज़ एवं ऑनलाइन कोर्सेज का विस्तृत फीस संरचना।
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Button size="lg" asChild className="gap-2 text-base font-semibold">
                <Link href="/contact">
                  <Phone className="h-5 w-5" /> फीस डिस्कॉउन्ट हेतु संपर्क करें
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="gap-2 text-base">
                <Link href="https://wa.me/919713300123" target="_blank">
                  व्हाट्सएप पर ब्रौशर प्राप्त करें <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Fees Table Section */}
      <Section className="py-12">
        <Container>
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <h2 className="text-3xl font-bold font-devanagari">आकार IAS MPPSC पाठ्यक्रम एवं फीस तालिका</h2>
            <p className="text-muted-foreground font-devanagari">
              गुणवत्ता के साथ कोई समझौता नहीं — सबसे सुलभ फीस एवं आसान किस्त सुविधाएं
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 border-2 border-border hover:border-primary/50 transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  1 Year Program
                </div>
                <h3 className="text-2xl font-bold font-devanagari">MPPSC Foundation (Pre + Mains)</h3>
                <p className="text-xs text-muted-foreground font-devanagari">
                  प्रारंभिक + मुख्य परीक्षा + आंसर राइटिंग + इंटरव्यू + प्रिंटेड नोट्स + टेस्ट सीरीज़
                </p>
                <div className="py-4 border-y border-border">
                  <div className="text-sm text-muted-foreground">प्रारंभिक फीस:</div>
                  <div className="text-3xl font-extrabold text-primary font-sans">किफायती EMI उपलब्ध</div>
                  <div className="text-xs text-emerald-600 font-semibold mt-1">✓ आसान 3-4 किस्तों में भुगतान योग्य</div>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground font-devanagari">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> संपूर्ण 100% सिलेबस कवरेज</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> क्लासरूम + मोबाइल ऐप का एक्सेस</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> सभी प्रिंटेड बुक्स व नोट्स शामिल</li>
                </ul>
              </div>
              <Button className="w-full mt-6" asChild>
                <Link href="/contact">एडमिशन इन्क्वायरी</Link>
              </Button>
            </Card>

            <Card className="p-6 border-2 border-primary shadow-lg bg-card flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">
                Most Popular
              </div>
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  Specialized Batch
                </div>
                <h3 className="text-2xl font-bold font-devanagari">Mains Special & Answer Writing</h3>
                <p className="text-xs text-muted-foreground font-devanagari">
                  मुख्य परीक्षा गहन तैयारी + Answer Improvement Lab + 48 घंटे में पर्सनल फीडबैक
                </p>
                <div className="py-4 border-y border-border">
                  <div className="text-sm text-muted-foreground">विशेष फीस:</div>
                  <div className="text-3xl font-extrabold text-primary font-sans">सुलभ शुल्क</div>
                  <div className="text-xs text-emerald-600 font-semibold mt-1">✓ 2 किस्तों की सुविधा</div>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground font-devanagari">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> डेली आंसर राइटिंग कॉपी चेक</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> टॉपर मॉडल आंसर शीट्स</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> विषयवार मेन्स नोट्स बुकलेट्स</li>
                </ul>
              </div>
              <Button className="w-full mt-6" asChild>
                <Link href="/contact">सीट बुक करें</Link>
              </Button>
            </Card>

            <Card className="p-6 border-2 border-border hover:border-primary/50 transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  Online Learning
                </div>
                <h3 className="text-2xl font-bold font-devanagari">MPPSC Online Live & Recorded Batch</h3>
                <p className="text-xs text-muted-foreground font-devanagari">
                  घर बैठे तैयारी — लाइव स्टूडियो क्लासेस + HD रिकॉर्डेड बैकअप + E-Notes PDF
                </p>
                <div className="py-4 border-y border-border">
                  <div className="text-sm text-muted-foreground">ऑनलाइन फीस:</div>
                  <div className="text-3xl font-extrabold text-primary font-sans">न्यूनतम शुल्क</div>
                  <div className="text-xs text-emerald-600 font-semibold mt-1">✓ ऐप पर 1-क्लिक डिस्काउंट</div>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground font-devanagari">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> 1 Year Unlimted App Access</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> PDF स्टडी मटेरियल डाउनलोड</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> ऑनलाइन टेस्ट सीरीज शामिल</li>
                </ul>
              </div>
              <Button className="w-full mt-6" variant="outline" asChild>
                <Link href="/online-courses">ऑनलाइन कोर्स देखें</Link>
              </Button>
            </Card>
          </div>
        </Container>
      </Section>

      {/* FAQ Section */}
      <Section className="bg-muted/30 py-12">
        <Container size="narrow">
          <div className="text-center space-y-4 mb-8">
            <h2 className="text-3xl font-bold font-devanagari flex items-center justify-center gap-2">
              <HelpCircle className="h-8 w-8 text-primary" /> MPPSC कोचिंग फीस संबंधी अक्सर पूछे जाने वाले प्रश्न
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
