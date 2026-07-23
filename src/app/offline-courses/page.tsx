import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumb } from "@/components/content/breadcrumb";
import { OfflineCoursesClient } from "./offline-courses-client";
import { getContentRepository } from "@/lib/content/content-repository";
import { JsonLd } from "@/components/seo/json-ld";
import { faqJsonLd } from "@/lib/seo/jsonld";

const offlineFaqs = [
  {
    q: "आकार आईएएस MPPSC कोचिंग की फीस क्या है?",
    a: "आकार आईएएस MPPSC ऑफलाइन क्लासरूम कोचिंग के लिए लचीली फीस संरचना प्रदान करता है। फीस कोर्स प्रकार के अनुसार भिन्न होती है — प्रीलिम्स, मेन्स, प्री+मेन्स कम्बाइंड, फाउंडेशन बैच और टेस्ट सीरीज़। किस्त और EMI विकल्प उपलब्ध हैं। नवीनतम फीस विवरण के लिए हमारे इंदौर सेंटर पर आएं या काउंसलर को कॉल करें।"
  },
  {
    q: "इंदौर में MPPSC के लिए सबसे अच्छी कोचिंग कौन सी है?",
    a: "आकार आईएएस इंदौर के सबसे प्रतिष्ठित MPPSC कोचिंग संस्थानों में से एक है, जो ऑफलाइन क्लासरूम और ऑनलाइन दोनों प्रोग्राम प्रदान करता है। 5,000+ छात्रों, हमारी अनुभवी फैकल्टी टीम, व्यापक अध्ययन सामग्री, नियमित टेस्ट सीरीज़ और हाइब्रिड लर्निंग मॉडल के साथ, आकार आईएएस एक सम्पूर्ण तैयारी इकोसिस्टम प्रदान करता है।"
  },
  {
    q: "क्या आकर आईएएस अध्ययन सामग्री प्रदान करता है?",
    a: "हाँ, सभी ऑफलाइन क्लासरूम छात्रों को व्यापक अध्ययन सामग्री मिलती है जिसमें प्रिंटेड नोट्स, करेंट अफेयर्स मैगजीन, पिछले वर्षों के प्रश्न पत्र, विषयवार पुस्तिकाएँ और प्रैक्टिस वर्कबुक शामिल हैं। डिजिटल PDF भी Aakar IAS मोबाइल ऐप के माध्यम से उपलब्ध हैं।"
  },
];

export const metadata: Metadata = buildMetadata({
  title: "ऑफलाइन कक्षाएँ & क्लासरूम प्रोग्राम",
  description: "इंदौर में अनुभवी शिक्षकों, आधुनिक क्लासरूम, अद्यतन अध्ययन सामग्री, नियमित टेस्ट एवं व्यक्तिगत मार्गदर्शन के साथ MPPSC, UPSC एवं अन्य प्रतियोगी परीक्षाओं की उत्कृष्ट तैयारी।",
  path: "/offline-courses",
});

export default async function OfflineCoursesPage() {
  const repo = await getContentRepository();
  const [faculties, offlineBatches, brochureUrl] = await Promise.all([
    repo.listFaculties("hi"),
    repo.listOfflineBatches("hi"),
    repo.getOfflineBrochureUrl(),
  ]);

  return (
    <>
      {/* Main Interactive Offline Courses Content */}
      <OfflineCoursesClient faculties={faculties} offlineBatches={offlineBatches} brochureUrl={brochureUrl || undefined} />

      {/* ─── FAQ Section (Google PAA) ──────────────────────────────── */}
      <Section className="bg-muted/20">
        <Container size="narrow">
          <h2 className="text-2xl font-extrabold text-foreground border-l-4 border-primary pl-4 mb-6 font-devanagari">
            अक्सर पूछे जाने वाले प्रश्न — ऑफलाइन कोर्सेज
          </h2>
          <div className="space-y-4">
            {offlineFaqs.map((faq, i) => (
              <details
                key={i}
                className="group bg-card border border-border rounded-xl p-5 [&_summary::-webkit-details-marker]:hidden cursor-pointer"
              >
                <summary className="flex justify-between items-center list-none select-none font-bold text-foreground text-base font-devanagari">
                  <span className="group-hover:text-primary transition-colors pr-4">{faq.q}</span>
                  <span className="text-primary font-light text-2xl transition-transform duration-200 group-open:rotate-45">+</span>
                </summary>
                <div className="text-muted-foreground text-sm leading-relaxed mt-3 pt-3 border-t border-border/60 animate-in fade-in slide-in-from-top-2 font-devanagari">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </Container>
      </Section>

      {/* FAQ JSON-LD for SEO */}
      <JsonLd data={faqJsonLd(offlineFaqs.map(f => ({ question: f.q, answer: f.a })))} />
    </>
  );
}
