import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumb } from "@/components/content/breadcrumb";
import { JsonLd } from "@/components/seo/json-ld";
import {
  breadcrumbJsonLd,
  articleJsonLd,
  faqJsonLd,
  jsonLdGraph,
} from "@/lib/seo/jsonld";
import { siteConfig } from "@/lib/site-config";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

/* ─── SEO Metadata ────────────────────────────────────────────────────────── */
export const metadata: Metadata = buildMetadata({
  title:
    "MPPSC Prelims Syllabus 2026 PDF Download | Paper 1 GS & Paper 2 CSAT | Aakar IAS",
  description:
    "MPPSC Prelims Syllabus 2026 हिंदी में: प्रथम प्रश्नपत्र (सामान्य अध्ययन - 10 इकाइयाँ) एवं द्वितीय प्रश्नपत्र (CSAT - सामान्य अभिरुचि)। परीक्षा पैटर्न, नेगेटिव मार्किंग व PDF डाउनलोड।",
  path: "/mppsc/prelims-syllabus",
  keywords: [
    "mppsc prelims syllabus",
    "mppsc prelims syllabus 2026",
    "mppsc pre syllabus in hindi",
    "mppsc prelims syllabus pdf",
    "mppsc csat syllabus",
    "MPPSC प्रारंभिक परीक्षा पाठ्यक्रम",
    "MPPSC Prelims Paper 1 Syllabus",
    "MPPSC Prelims Paper 2 Syllabus",
  ],
  type: "article",
  publishedTime: "2026-01-10",
  modifiedTime: new Date().toISOString().split("T")[0],
  category: "MPPSC",
});

/* ─── FAQ Data ─────────────────────────────────────────────────────────────── */
const faqs = [
  {
    question: "MPPSC Prelims में कितने पेपर होते हैं?",
    answer:
      "MPPSC राज्य सेवा प्रारंभिक परीक्षा में वस्तुनिष्ठ (MCQ) प्रकार के 2 प्रश्नपत्र होते हैं: प्रथम प्रश्नपत्र — सामान्य अध्ययन (General Studies - 200 अंक) और द्वितीय प्रश्नपत्र — सामान्य अभिरुचि परीक्षण (CSAT - 200 अंक)। प्रत्येक प्रश्नपत्र 2 घंटे का होता है।",
  },
  {
    question: "MPPSC Prelims में Negative Marking होती है क्या?",
    answer:
      "हाँ, नवीनतम MPPSC नियम के अनुसार प्रारंभिक परीक्षा में (3R - W) पद्धति से मूल्यांकन होता है, जहाँ सही उत्तर पर 3 अंक मिलते हैं और प्रत्येक गलत उत्तर पर 1 अंक काटा जाता है।",
  },
  {
    question: "MPPSC CSAT (Paper 2) Qualifying होता है या Merit में जुड़ता है?",
    answer:
      "राज्य सेवा (Administrative Services) के लिए द्वितीय प्रश्नपत्र (CSAT) केवल अर्हकारी (Qualifying - 40% अनारक्षित, 30% आरक्षित) होता है। हालांकि, यदि आप राज्य वन सेवा (Forest Service) के लिए भी उपस्थित हो रहे हैं, तो दोनों प्रश्नपत्रों (Paper 1 + Paper 2) के अंक जोड़कर मेरिट बनती है।",
  },
  {
    question: "MPPSC Prelims Syllabus 2026 में 10वीं इकाई (Unit 10) में क्या है?",
    answer:
      "MPPSC Prelims Paper 1 की Unit 10 'मध्यप्रदेश की जनजातियाँ — विरासत, लोक संस्कृति एवं लोक साहित्य' पर केंद्रित है। इसमें MP में जनजातियों का विस्तार, PVTG, स्वतंत्रता संग्राम में योगदान और जनजातीय व्यक्तित्वों पर विस्तृत प्रश्न आते हैं।",
  },
];

export default function MppscPrelimsSyllabusPage() {
  const pageUrl = `${siteConfig.url}/mppsc/prelims-syllabus`;

  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    { name: "MPPSC", url: `${siteConfig.url}/mppsc` },
    { name: "Prelims Syllabus", url: pageUrl },
  ]);

  const article = articleJsonLd({
    title: "MPPSC Prelims Syllabus 2026 – Complete Pattern & 10 Units Breakdown in Hindi",
    description: "MPPSC प्रारंभिक परीक्षा 2026 का संपूर्ण 10 इकाइयों में विस्तृत पाठ्यक्रम।",
    url: pageUrl,
    image: `${siteConfig.url}/api/og?title=MPPSC+Prelims+Syllabus+2026&category=MPPSC&lang=hi&type=article`,
    datePublished: "2026-01-10",
    authorName: "आकार आईएएस",
    keywords: ["MPPSC Prelims Syllabus", "MPPSC Pre Syllabus 2026", "MPPSC CSAT Syllabus"],
    inLanguage: "hi-IN",
    alternates: {
      hi: pageUrl,
      en: `${siteConfig.url}/en/mppsc/prelims-syllabus`,
    },
  });

  const faqSchema = faqJsonLd(faqs.map((f) => ({ question: f.question, answer: f.answer })));

  return (
    <>
      <section className="relative overflow-hidden bg-secondary text-secondary-foreground">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--primary)_0%,_transparent_50%)] opacity-20" />
        <Container size="wide" className="relative py-16 sm:py-20">
          <div className="max-w-3xl">
            <span className="inline-block rounded-full bg-primary/15 px-4 py-1 text-sm font-semibold text-primary">
              MPPSC प्रारंभिक परीक्षा 2026
            </span>
            <h1 className="mt-4 text-balance text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              MPPSC Prelims Syllabus 2026 — प्रारंभिक परीक्षा का संपूर्ण पाठ्यक्रम
            </h1>
            <p className="mt-4 text-pretty text-lg text-white/75">
              मध्यप्रदेश राज्य सेवा प्रारंभिक परीक्षा (Prelims 2026) का <strong>10 इकाइयों में सम्पूर्ण पाठ्यक्रम</strong> — Paper 1 (General Studies) एवं Paper 2 (CSAT)।
            </p>
          </div>
        </Container>
      </section>

      <Section className="pb-0 pt-8">
        <Container size="wide">
          <Breadcrumb
            items={[
              { name: "MPPSC", href: "/mppsc" },
              { name: "Syllabus 2026", href: "/mppsc/syllabus-2026" },
              { name: "Prelims Syllabus" },
            ]}
          />
        </Container>
      </Section>

      <Section>
        <Container size="narrow">
          <div className="prose prose-aakar dark:prose-invert max-w-none">
            <h2>1. प्रारंभिक परीक्षा — पैटर्न एवं अंक योजना</h2>
            <div className="overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    <th>प्रश्नपत्र</th>
                    <th>विषय</th>
                    <th>प्रश्नों की संख्या</th>
                    <th>पूर्णांक</th>
                    <th>अवधि</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>प्रथम प्रश्नपत्र</td>
                    <td>सामान्य अध्ययन (General Studies)</td>
                    <td>100 MCQs</td>
                    <td>300</td>
                    <td>2 घंटे</td>
                  </tr>
                  <tr>
                    <td>द्वितीय प्रश्नपत्र</td>
                    <td>सामान्य अभिरुचि परीक्षण (CSAT)</td>
                    <td>100 MCQs</td>
                    <td>300</td>
                    <td>2 घंटे</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <hr />

            <h2>2. प्रथम प्रश्नपत्र — सामान्य अध्ययन (10 इकाइयाँ)</h2>

            <h3>इकाई 1: भारत का इतिहास</h3>
            <p>प्राचीन एवं मध्यकालीन भारत का इतिहास, संकल्पना एवं विचार (वेद, उपनिषद, स्मृतियाँ, पुरुषार्थ), सांस्कृतिक विरासत, 19वीं-20वीं सदी के सामाजिक-धार्मिक आंदोलन, स्वतंत्रता संग्राम एवं एकीकरण।</p>

            <h3>इकाई 2: मध्यप्रदेश का इतिहास, संस्कृति एवं साहित्य</h3>
            <p>मध्यप्रदेश के राजवंश, स्वतंत्रता आंदोलन में योगदान, कला एवं स्थापत्य, जनजातियाँ एवं बोलियाँ, लोक संगीत व साहित्य, प्रमुख साहित्यकार एवं विश्व धरोहर स्थल।</p>

            <h3>इकाई 3: भारत का भूगोल</h3>
            <p>भौतिक विभाग, नदियाँ, पर्वत, अल-नीनो/ला-नीना, प्राकृतिक संसाधन, प्रमुख फसलें, हरित क्रांति, ऊर्जा स्रोत, आपदा प्रबंधन एवं जनसांख्यिकी।</p>

            <h3>इकाई 4: मध्यप्रदेश का भूगोल</h3>
            <p>भौतिक विभाग (मालवा, बुंदेलखंड, नर्मदा घाटी), नदियाँ, जलवायु, मिट्टियाँ, वन, खनिज, सिंचाई परियोजनाएँ, उद्योग एवं जनसंख्या।</p>

            <h3>इकाई 5: भारत एवं मध्यप्रदेश की संवैधानिक व्यवस्था</h3>
            <p>संविधान सभा, राष्ट्रपति, संसद, सर्वोच्च न्यायालय, संवैधानिक संशोधन, मौलिक अधिकार व कर्तव्य, MP की संवैधानिक व्यवस्था (राज्यपाल, सीएम, विधानसभा), पंचायतीराज एवं सुशासन।</p>

            <h3>इकाई 6: भारत एवं मध्यप्रदेश की अर्थव्यवस्था</h3>
            <p>भारतीय अर्थव्यवस्था में MP की स्थिति, विकसित भारत @2047, SDGS, ODOP, IPR, RBI, SEBI, G-20, SAARC एवं वैश्वीकरण।</p>

            <h3>इकाई 7: विज्ञान, पर्यावरण एवं स्वास्थ्य</h3>
            <p>सामान्य विज्ञान, ISRO/अंतरिक्ष प्रौद्योगिकी, मानव शरीर, पोषण व कुपोषण, सिकल सेल एनीमिया, पर्यावरण संतुलन, जैव-विविधता व आपदा प्रबंधन।</p>

            <h3>इकाई 8: अंतर्राष्ट्रीय, राष्ट्रीय एवं MP की समसामयिक घटनाएँ</h3>
            <p>अंतर्राष्ट्रीय, राष्ट्रीय तथा मध्यप्रदेश की महत्वपूर्ण समसामयिक घटनाएँ, खेलकूद एवं व्यक्तित्व।</p>

            <h3>इकाई 9: सूचना एवं संचार प्रौद्योगिकी (ICT)</h3>
            <p>कंप्यूटर का आधारभूत ज्ञान, इलेक्ट्रॉनिकी, AI, रोबोटिक्स, साइबर सिक्यूरिटी, ई-गवर्नेंस, इंटरनेट व सोशल मीडिया।</p>

            <h3>इकाई 10: मध्यप्रदेश की जनजातियाँ — विरासत, लोक संस्कृति एवं साहित्य</h3>
            <p>जनजातियों का भौगोलिक विस्तार, संवैधानिक प्रावधान, PVTG, कल्याणकारी योजनाएँ, जनजातीय कलाएँ, स्वतंत्रता संग्राम में योगदान व प्रमुख जनजातीय नायक।</p>

            <hr />

            <h2>3. द्वितीय प्रश्नपत्र — सामान्य अभिरुचि परीक्षण (CSAT)</h2>
            <ol>
              <li>बोधगम्यता (Comprehension)</li>
              <li>संचार कौशल एवं अंतर-वैयक्तिक क्षमता</li>
              <li>तार्किक कौशल एवं विश्लेषणात्मक क्षमता</li>
              <li>निर्णय लेना एवं समस्या समाधान</li>
              <li>सामान्य मानसिक योग्यता (Reasoning)</li>
              <li>आधारभूत संख्यायन (Class 10th Level Maths & Data Interpretation)</li>
              <li>हिन्दी भाषा में बोधगम्यता कौशल (Class 10th Level Hindi Comprehension)</li>
            </ol>

            <hr />

            <h2>संबंधित संसाधन</h2>
            <ul>
              <li><Link href="/mppsc/mains-syllabus" className="text-primary">MPPSC Mains Syllabus 2026 (Paper 1-6)</Link></li>
              <li><Link href="/mppsc/syllabus-2026" className="text-primary">MPPSC Master Syllabus (Prelims + Mains)</Link></li>
              <li><Link href="/mppsc/previous-year-papers" className="text-primary">MPPSC Prelims Solved PYQ Download</Link></li>
            </ul>
          </div>
        </Container>
      </Section>

      <Section>
        <Container size="narrow">
          <h2 id="faq" className="mb-8 text-2xl font-bold text-foreground">
            ❓ FAQs — MPPSC Prelims Syllabus
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left text-base font-medium">
                  {f.question}
                </AccordionTrigger>
                <AccordionContent className="text-foreground/75 leading-relaxed">
                  {f.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Container>
      </Section>

      <JsonLd data={jsonLdGraph([breadcrumb, article, faqSchema])} />
    </>
  );
}
