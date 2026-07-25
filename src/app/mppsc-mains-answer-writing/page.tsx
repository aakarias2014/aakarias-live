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
  Award, 
  BookOpen, 
  CheckCircle2, 
  Clock,
  HelpCircle, 
  Phone, 
  ArrowRight,
  FileText,
  PenTool,
  Trophy,
  Download
} from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "MPPSC Mains Answer Writing Copy & Program | उत्तर लेखन प्रोग्राम | Aakar IAS",
  description: "MPPSC Mains Answer Writing Program — आकार IAS की 'Answer Improvement Lab' में दैनिक उत्तर लेखन, 48 घंटे में कॉपी चेकिंग, टॉपर आंसर कॉपी PDF व मॉडल उत्तर।",
  path: "/mppsc-mains-answer-writing",
  keywords: [
    "MPPSC Mains Answer Writing Copy",
    "MPPSC Mains Answer Writing",
    "MPPSC Answer Writing Practice",
    "MPPSC Topper Answer Sheet PDF",
    "MPPSC Mains Copy Evaluation",
    "Best MPPSC Mains Answer Writing Program Indore",
    "MPPSC Daily Answer Writing",
  ],
});

const faqs = [
  {
    q: "MPPSC Mains Answer Writing Copy का मूल्यांकन कितने समय में होता है?",
    a: "आकार IAS में छात्र द्वारा सबमिट की गई उत्तर पुस्तिका (Copy) का विस्तृत मूल्यांकन 48 घंटे के भीतर विषय विशेषज्ञों एवं पूर्व चयनित अधिकारियों द्वारा कर दिया जाता है।",
  },
  {
    q: "क्या MPPSC Mains Topers की Answer Sheet डाउनलोड कर सकते हैं?",
    a: "जी हां, आकार IAS पोर्टल पर MPPSC में सर्वोच्च अंक प्राप्त टॉपर्स की मूल्यांकित Answer Sheets मुफ्त डाउनलोड के लिए उपलब्ध हैं।",
  },
  {
    q: "क्या आंसर राइटिंग प्रोग्राम में मॉडल आंसर (Model Answer) दिए जाते हैं?",
    a: "जी हां, प्रत्येक दैनिक अभ्यास प्रश्न एवं टेस्ट के साथ 100% सिलेबस-अलाइन्ड बिंदुवार मॉडल उत्तर दिए जाते हैं।",
  },
];

export default function MppscMainsAnswerWritingPage() {
  const pageUrl = `${siteConfig.url}/mppsc-mains-answer-writing`;

  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    { name: "MPPSC", url: `${siteConfig.url}/mppsc` },
    { name: "MPPSC Mains Answer Writing", url: pageUrl },
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
              { name: "Mains Answer Writing", href: "/mppsc-mains-answer-writing" },
            ]}
          />

          <div className="mt-8 max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
              <PenTool className="h-4 w-4" /> MPPSC मुख्य परीक्षा अंक सुधार कार्यक्रम
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl font-devanagari leading-tight">
              MPPSC Mains Answer Writing Program — <span className="text-primary">आकार IAS</span>
            </h1>

            <p className="text-lg text-muted-foreground font-devanagari leading-relaxed">
              मुख्य परीक्षा में टॉप स्कोर करने का एकमात्र मूलमंत्र — सटीक उत्तर लेखन। आकार IAS की 'Answer Improvement Lab' में पाएँ 48 घंटे में बिंदुवार मूल्यांकन, मॉडल उत्तर एवं टॉपर्स की आंसर कॉपियाँ।
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Button size="lg" asChild className="gap-2 text-base font-semibold">
                <Link href="/mppsc/toppers-copy">
                  <FileText className="h-5 w-5" /> टॉपर्स आंसर कॉपी देखें
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="gap-2 text-base">
                <Link href="/contact">
                  उत्तर लेखन प्रोग्राम में जुड़ें <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Program Features */}
      <Section className="py-12">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 space-y-4">
              <Clock className="h-8 w-8 text-primary" />
              <h3 className="text-xl font-bold font-devanagari">48 घंटे में बिंदुवार फीडबैक</h3>
              <p className="text-sm text-muted-foreground font-devanagari leading-relaxed">
                आपकी प्रत्येक कॉपी का 48 घंटे के भीतर मूल्यांकन। कंटेंट, प्रेजेंटेशन, डायग्राम और वर्ड-लिमिट पर विस्तृत रिमार्क्स।
              </p>
            </Card>

            <Card className="p-6 space-y-4">
              <Trophy className="h-8 w-8 text-primary" />
              <h3 className="text-xl font-bold font-devanagari">टॉपर्स मॉडल आंसर PDFs</h3>
              <p className="text-sm text-muted-foreground font-devanagari leading-relaxed">
                प्रत्येक प्रश्न का 2 अंक, 7 अंक एवं 10 अंक प्रारूप में आदर्श उत्तर ताकि आप सही उत्तर संरचना सीख सकें।
              </p>
            </Card>

            <Card className="p-6 space-y-4">
              <Award className="h-8 w-8 text-primary" />
              <h3 className="text-xl font-bold font-devanagari">1-ऑन-1 पर्सनल मेंटरशिप</h3>
              <p className="text-sm text-muted-foreground font-devanagari leading-relaxed">
                मूल्यांकन के बाद मेंटर्स के साथ व्यक्तिगत सत्र, जिससे आपकी कमियों को दूर कर अंक 20-30% बढ़ाए जा सकें।
              </p>
            </Card>
          </div>
        </Container>
      </Section>

      {/* FAQ Section */}
      <Section className="bg-muted/30 py-12">
        <Container size="narrow">
          <div className="text-center space-y-4 mb-8">
            <h2 className="text-3xl font-bold font-devanagari flex items-center justify-center gap-2">
              <HelpCircle className="h-8 w-8 text-primary" /> उत्तर लेखन संबंधी अक्सर पूछे जाने वाले प्रश्न
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
