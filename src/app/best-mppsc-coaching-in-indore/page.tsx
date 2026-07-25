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
  GraduationCap, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  Star, 
  Trophy, 
  Users,
  ArrowRight,
  Download,
  HelpCircle
} from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "Best MPPSC Coaching in Indore | आकार IAS — शीर्ष MPPSC कोचिंग संस्थान",
  description: "इंदौर में MPPSC की तैयारी के लिए आकार IAS (Aakar IAS) मध्य भारत का #1 कोचिंग संस्थान है। भंवरकुआं (राजीव गांधी सर्कल) कैंपस में सर्वश्रेष्ठ फैकल्टी, टेस्ट सीरीज, आंसर राइटिंग व प्रिंटेड नोट्स।",
  path: "/best-mppsc-coaching-in-indore",
  keywords: [
    "Best MPPSC Coaching in Indore",
    "MPPSC Coaching in Indore",
    "Top 10 MPPSC Coaching in Indore",
    "Best Coaching for MPPSC in Indore",
    "PSC Coaching in Indore",
    "Indore MPPSC Coaching Center",
    "Best MPPSC Mains Coaching Indore",
    "Bhawarkua MPPSC Coaching",
    "Aakar IAS Indore Bhawarkua",
    "Best MPPSC Test Series Indore",
  ],
});

const faqs = [
  {
    q: "इंदौर में MPPSC की तैयारी के लिए सबसे अच्छी कोचिंग कौन सी है? (Which is the Best MPPSC Coaching in Indore?)",
    a: "आकार IAS (Aakar IAS) इंदौर में MPPSC राज्य सेवा परीक्षा की तैयारी हेतु मध्य भारत का सबसे प्रतिष्ठित एवं सफल कोचिंग संस्थान माना जाता है। भंवरकुआं (राजीव गांधी सर्कल) कैंपस में स्थित आकार IAS उच्च स्तरीय अध्ययन सामग्री, हिंदी व अंग्रेजी माध्यम क्लासरूम बैच, 48 घंटे के भीतर उत्तर पुस्तिका मूल्यांकन और विजयसिद्धि टेस्ट सीरीज प्रदान करता है।",
  },
  {
    q: "आकार IAS इंदौर में MPPSC कोचिंग की फीस क्या है?",
    a: "आकार IAS में फीस कोर्सेज (प्रीलिम्स, मेन्स, फाउंडेशन बैच या टेस्ट सीरीज) के अनुसार भिन्न होती है। हम छात्रों की सुविधा के लिए आसान किस्तों (Installment) और स्कॉलरशिप छूट की सुविधा भी प्रदान करते हैं। सटीक फीस विवरण के लिए संस्थान से +91 9713300123 पर संपर्क करें।",
  },
  {
    q: "क्या आकार IAS हिंदी और अंग्रेजी दोनों माध्यमों में कक्षाएं प्रदान करता है?",
    a: "जी हां, आकार IAS इंदौर में पृथक (Dedicated) हिंदी और अंग्रेजी माध्यम के क्लासरूम बैच और प्रिंटेड स्टडी नोट्स उपलब्ध कराए जाते हैं।",
  },
  {
    q: "आकार IAS का पता (Address) और निकटतम लैंडमार्क क्या है?",
    a: "आकार IAS का मुख्य परिसर 178/2/4 - ए बी रोड, राजीव गांधी सर्कल के पास, पिपलिया राव, भंवरकुआं रोड, इंदौर (म.प्र.) 452001 पर स्थित है।",
  },
  {
    q: "MPPSC Mains Answer Writing की तैयारी के लिए आकार IAS क्यों खास है?",
    a: "आकार IAS की 'Answer Improvement Lab' में पूर्व चयनित अधिकारियों एवं विषय विशेषज्ञों द्वारा 48 घंटे में व्यक्तिगत फीडबैक, मॉडल आंसर और पॉइंट-टू-पॉइंट मूल्यांकन दिया जाता है, जिससे अभ्यर्थी मुख्य परीक्षा में अधिकतम अंक प्राप्त कर सकें।",
  },
];

export default function BestMppscCoachingIndorePage() {
  const pageUrl = `${siteConfig.url}/best-mppsc-coaching-in-indore`;

  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    { name: "Best MPPSC Coaching in Indore", url: pageUrl },
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
              { name: "Best MPPSC Coaching in Indore", href: "/best-mppsc-coaching-in-indore" },
            ]}
          />

          <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
                <Trophy className="h-4 w-4" /> MPPSC परीक्षा हेतु मध्य भारत का #1 संस्थान
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl font-devanagari leading-tight">
                Best MPPSC Coaching in Indore — <span className="text-primary">आकार IAS</span>
              </h1>

              <p className="text-lg text-muted-foreground font-devanagari leading-relaxed">
                इंदौर के भंवरकुआं क्षेत्र में MPPSC प्रारंभिक एवं मुख्य परीक्षा की तैयारी के लिए सबसे भरोसेमंद संस्थान। 5,000+ सफल अभ्यर्थियों का विश्वास, 15+ वर्षों का गौरवशाली इतिहास एवं सर्वश्रेष्ठ मार्गदर्शन।
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                <div className="rounded-xl border bg-card p-3 text-center shadow-xs">
                  <div className="text-2xl font-bold text-primary">5,000+</div>
                  <div className="text-xs text-muted-foreground">चयनित विद्यार्थी</div>
                </div>
                <div className="rounded-xl border bg-card p-3 text-center shadow-xs">
                  <div className="text-2xl font-bold text-primary">15+</div>
                  <div className="text-xs text-muted-foreground">वर्षों का अनुभव</div>
                </div>
                <div className="rounded-xl border bg-card p-3 text-center shadow-xs">
                  <div className="text-2xl font-bold text-primary">4.8★</div>
                  <div className="text-xs text-muted-foreground">गूगल रेटिंग</div>
                </div>
                <div className="rounded-xl border bg-card p-3 text-center shadow-xs">
                  <div className="text-2xl font-bold text-primary">100%</div>
                  <div className="text-xs text-muted-foreground">सिलेबस कवरेज</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <Button size="lg" asChild className="gap-2 text-base font-semibold">
                  <Link href="/contact">
                    <Phone className="h-5 w-5" /> मुफ्त परामर्श हेतु कॉल करें
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="gap-2 text-base">
                  <Link href="/offline-courses">
                    ऑफलाइन बैच देखें <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Quick Inquiry Card */}
            <div className="lg:col-span-5">
              <Card className="p-6 shadow-xl border-primary/20 bg-card">
                <h2 className="text-xl font-bold font-devanagari text-foreground mb-4 flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-primary" /> नया बैच एडमिशन इन्क्वायरी
                </h2>
                <form className="space-y-4" action="https://wa.me/919713300123" target="_blank">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground block mb-1">आपका नाम</label>
                    <input
                      type="text"
                      placeholder="उदा. राहुल शर्मा"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-hidden focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground block mb-1">मोबाइल नंबर</label>
                    <input
                      type="tel"
                      placeholder="10 अंकों का नंबर"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-hidden focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground block mb-1">माध्यम (Medium)</label>
                    <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-hidden focus:ring-2 focus:ring-primary">
                      <option>हिंदी माध्यम (Hindi Medium)</option>
                      <option>अंग्रेजी माध्यम (English Medium)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground block mb-1">लक्ष्य परीक्षा (Target Exam)</label>
                    <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-hidden focus:ring-2 focus:ring-primary">
                      <option>MPPSC 2026 Foundation (Pre + Mains)</option>
                      <option>MPPSC Mains Answer Writing</option>
                      <option>MPPSC Test Series Only</option>
                    </select>
                  </div>
                  <Button type="submit" className="w-full size-lg text-base font-semibold">
                    व्हाट्सएप पर जानकारी प्राप्त करें
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* Why Aakar IAS is Best in Indore */}
      <Section className="py-12">
        <Container>
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <h2 className="text-3xl font-bold font-devanagari text-foreground">
              इंदौर में आकार IAS ही सर्वश्रेष्ठ MPPSC कोचिंग क्यों है?
            </h2>
            <p className="text-muted-foreground font-devanagari">
              MPPSC परीक्षा के नवीनतम पाठ्यक्रम 2026 के अनुसार तैयार की गई शिक्षण प्रणाली जो प्रत्येक अभ्यर्थी को सफलता के निकट पहुंचाती है।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 space-y-4 border hover:border-primary/50 transition-all">
              <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-xl">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold font-devanagari">विशेषज्ञ एवं अनुभवी फैकल्टी</h3>
              <p className="text-sm text-muted-foreground font-devanagari leading-relaxed">
                विषय विशेषज्ञों और पूर्व सिविल सेवकों का मार्गदर्शन, जो परीक्षा के पैटर्न और मुख्य परीक्षा उत्तर लेखन की बारीकियों से भली-भांति परिचित हैं।
              </p>
            </Card>

            <Card className="p-6 space-y-4 border hover:border-primary/50 transition-all">
              <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-xl">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold font-devanagari">अद्यतन अध्ययन सामग्री (Updated Notes)</h3>
              <p className="text-sm text-muted-foreground font-devanagari leading-relaxed">
                नवीनतम MPPSC सिलेबस 2026 के प्रत्येक टॉपिक का पॉइंट-वाइज कवरेज। हिंदी व अंग्रेजी माध्यम में प्रिंटेड पुस्तकें एवं हस्तलिखित नोट्स।
              </p>
            </Card>

            <Card className="p-6 space-y-4 border hover:border-primary/50 transition-all">
              <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-xl">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold font-devanagari">48 घंटे में आंसर राइटिंग मूल्यांकन</h3>
              <p className="text-sm text-muted-foreground font-devanagari leading-relaxed">
                'Answer Improvement Lab' द्वारा आपकी उत्तर पुस्तिकाओं का विस्तृत मूल्यांकन, मॉडल उत्तर एवं अंक सुधार हेतु व्यक्तिगत सुझाव।
              </p>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Comparison Section */}
      <Section className="bg-muted/30 py-12">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-3xl font-bold font-devanagari">अन्य संस्थानों की तुलना में आकार IAS का अंतर</h2>
          </div>

          <div className="overflow-x-auto rounded-xl border bg-card shadow-xs">
            <table className="w-full text-left text-sm font-devanagari">
              <thead className="bg-primary/10 text-foreground font-semibold">
                <tr>
                  <th className="p-4">विशेषता (Feature)</th>
                  <th className="p-4 text-primary font-bold">आकार IAS इंदौर</th>
                  <th className="p-4 text-muted-foreground">सामान्य कोचिंग संस्थान</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="p-4 font-semibold">उत्तर पुस्तिका मूल्यांकन</td>
                  <td className="p-4 text-emerald-600 font-bold">✓ 48 घंटे में व्यक्तिगत फीडबैक व मॉडल आंसर</td>
                  <td className="p-4 text-muted-foreground">✗ केवल सामान्य अंक या देर से मूल्यांकन</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold">नवीनतम पाठ्यक्रम (2026) नोट्स</td>
                  <td className="p-4 text-emerald-600 font-bold">✓ 100% अपडेटेड प्रिंटेड बुकलेट्स व PDFs</td>
                  <td className="p-4 text-muted-foreground">✗ पुराना सिलेबस स्टडी मटेरियल</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold">माध्यम की सुविधा</td>
                  <td className="p-4 text-emerald-600 font-bold">✓ पृथक हिंदी व अंग्रेजी माध्यम बैच</td>
                  <td className="p-4 text-muted-foreground">✗ मिक्स माध्यम की कक्षाएं</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold">डिजिटल ऐप बैकअप</td>
                  <td className="p-4 text-emerald-600 font-bold">✓ लाइव क्लास छूटने पर HD रिकॉर्डेड बैकअप</td>
                  <td className="p-4 text-muted-foreground">✗ बैकअप की सीमित सुविधा</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold">मेंटरशिप सपोर्ट</td>
                  <td className="p-4 text-emerald-600 font-bold">✓ 1-ऑन-1 पर्सनल मेंटर गाइडेंस</td>
                  <td className="p-4 text-muted-foreground">✗ केवल सामान्य डाउट क्लास</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      {/* FAQ Section */}
      <Section className="py-12">
        <Container size="narrow">
          <div className="text-center space-y-4 mb-8">
            <h2 className="text-3xl font-bold font-devanagari flex items-center justify-center gap-2">
              <HelpCircle className="h-8 w-8 text-primary" /> अक्सर पूछे जाने वाले प्रश्न (FAQs)
            </h2>
            <p className="text-muted-foreground font-devanagari">
              इंदौर में MPPSC कोचिंग चयन एवं आकार IAS से संबंधित महत्वपूर्ण प्रश्नोत्तर
            </p>
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
