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
import { breadcrumbJsonLd, faqJsonLd, localBusinessJsonLd, courseJsonLd, jsonLdGraph } from "@/lib/seo/jsonld";
import { siteConfig } from "@/lib/site-config";
import { 
  CheckCircle2, 
  HelpCircle, 
  Phone, 
  ArrowRight,
  Monitor,
  Download,
  PlayCircle,
  FileText,
  Smartphone,
  Star
} from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "MPPSC Online Coaching | लाइव क्लासेस, कोर्स & नोट्स | Aakar IAS App",
  description: "MPPSC Online Coaching — आकार IAS ऐप पर MPPSC प्रीलिम्स व मेन्स की लाइव स्टूडियो कक्षाएं, HD रिकॉर्डेड लेक्चर, ऑनलाइन टेस्ट सीरीज एवं PDF नोट्स। बेस्ट MPPSC ऑनलाइन कोर्स।",
  path: "/mppsc-online-coaching",
  keywords: [
    "MPPSC Online Coaching",
    "MPPSC Course Online",
    "MPPSC Online Course",
    "MPPSC Online Classes",
    "MPPSC Live Classes",
    "Best MPPSC Online Coaching",
    "Best Online Coaching for MPPSC in Indore",
    "MPPSC Online Course Fees",
    "Aakar IAS App Download",
    "MPPSC Online Mains Course",
  ],
});

const faqs = [
  {
    q: "MPPSC ऑनलाइन कोचिंग के लिए कौन सा ऐप बेस्ट है? (Best App for MPPSC Online Coaching)",
    a: "आकार IAS (Aakar IAS) मोबाइल ऐप MPPSC ऑनलाइन तैयारी के लिए सबसे लोकप्रिय ऐप में से एक है। इसमें आपको लाइव स्टूडियो क्लासेस, अनलिमिटेड रिकॉर्डेड बैकअप, क्लास वाइज PDF नोट्स और ऑनलाइन क्विज़ एवं टेस्ट सीरीज मिलती है।",
  },
  {
    q: "क्या लाइव क्लास छूट जाने पर रिकॉर्डेड वीडियो देख सकते हैं?",
    a: "जी हां, लाइव क्लास समाप्त होते ही उसका HD रिकॉर्डेड वीडियो ऐप में सेव हो जाता है, जिसे आप कोर्स की अवधि तक कितनी भी बार देख सकते हैं।",
  },
  {
    q: "ऑनलाइन कोर्स के साथ नोट्स कैसे मिलेंगे?",
    a: "सभी ऑनलाइन कोर्स के साथ हर विषय के टॉपिक-वाइज E-Notes (PDF) ऐप पर दिए जाते हैं, जिन्हें आप डाउनलोड करके पढ़ सकते हैं। इसके अलावा हार्ड कॉपी नोट्स घर मंगवाने का विकल्प भी उपलब्ध है।",
  },
  {
    q: "MPPSC Online Course कैसे खरीदें?",
    a: "आप Google Play Store से Aakar IAS ऐप डाउनलोड करके या हमारी वेबसाइट पर साइन-अप करके 1-क्लिक में कोर्स खरीद सकते हैं।",
  },
];

export default function MppscOnlineCoachingPage() {
  const pageUrl = `${siteConfig.url}/mppsc-online-coaching`;

  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    { name: "MPPSC", url: `${siteConfig.url}/mppsc` },
    { name: "MPPSC Online Coaching", url: pageUrl },
  ]);

  const faqSchema = faqJsonLd(faqs);
  const courseSchema = courseJsonLd({
    name: "MPPSC Online Coaching Program (Live & Recorded)",
    description: "Complete MPPSC Prelims & Mains Preparation through Aakar IAS Mobile App with Live Classes, E-Notes, Test Series and Mentorship.",
    url: pageUrl,
    price: "4999",
    currency: "INR",
    courseMode: "online",
  });

  return (
    <>
      <JsonLd data={jsonLdGraph([breadcrumbs, faqSchema, courseSchema])} />

      {/* Hero Section */}
      <Section className="bg-gradient-to-b from-primary/5 via-background to-background pt-10 pb-12">
        <Container>
          <Breadcrumb
            items={[
              { name: "MPPSC", href: "/mppsc" },
              { name: "MPPSC Online Coaching", href: "/mppsc-online-coaching" },
            ]}
          />

          <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
                <Monitor className="h-4 w-4" /> MPPSC ऑनलाइन तैयारी — घर बैठे पढ़ाई
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl font-devanagari leading-tight">
                MPPSC Online Coaching — <span className="text-primary">आकार IAS ऐप</span>
              </h1>

              <p className="text-lg text-muted-foreground font-devanagari leading-relaxed">
                इंदौर के सर्वश्रेष्ठ शिक्षकों से अपने मोबाइल व कंप्यूटर पर लाइव एवं रिकॉर्डेड कक्षाएं लें। 100% सिलेबस कवरेज, डेली क्विज़, PDF नोट्स और ऑनलाइन टेस्ट सीरीज़।
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <Button size="lg" asChild className="gap-2 text-base font-semibold">
                  <Link href="/download">
                    <Smartphone className="h-5 w-5" /> आकार IAS ऐप डाउनलोड करें
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="gap-2 text-base">
                  <Link href="/online-courses">
                    ऑनलाइन कोर्सेज देखें <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* App Features Card */}
            <div className="lg:col-span-5">
              <Card className="p-6 shadow-xl border-primary/20 bg-card space-y-4">
                <div className="flex items-center justify-between border-b pb-3">
                  <h2 className="text-lg font-bold font-devanagari">Aakar IAS Mobile App Features</h2>
                  <span className="text-xs bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-semibold px-2.5 py-0.5 rounded-full">
                    4.8★ Rated
                  </span>
                </div>
                <ul className="space-y-3 text-sm font-devanagari">
                  <li className="flex items-start gap-3">
                    <PlayCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block">HD 4K Live Studio Classes</span>
                      <span className="text-xs text-muted-foreground">इंटरएक्टिव लाइव क्लासेस में डाउट पूछें</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block">Printable PDF E-Notes</span>
                      <span className="text-xs text-muted-foreground">नवीनतम 2026 सिलेबस आधारित हस्तलिखित नोट्स</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Monitor className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block">Unlimited Recorded Backup</span>
                      <span className="text-xs text-muted-foreground">कक्षाएं जितनी बार चाहें उतनी बार देखें</span>
                    </div>
                  </li>
                </ul>
                <Button className="w-full" asChild>
                  <Link href="/download">फ्री डेमो क्लास देखें</Link>
                </Button>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ Section */}
      <Section className="py-12">
        <Container size="narrow">
          <div className="text-center space-y-4 mb-8">
            <h2 className="text-3xl font-bold font-devanagari flex items-center justify-center gap-2">
              <HelpCircle className="h-8 w-8 text-primary" /> MPPSC ऑनलाइन कोचिंग से जुड़े सवाल
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
