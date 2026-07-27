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
    "MPPSC Mains Syllabus 2026 PDF Download in Hindi | Paper 1-6 पूरा पाठ्यक्रम | Aakar IAS",
  description:
    "MPPSC Mains Syllabus 2026 in Hindi PDF Download: मुख्य परीक्षा Paper 1 (इतिहास-भूगोल), Paper 2 (राजनीति-समाजशास्त्र), Paper 3 (अर्थशास्त्र-विज्ञान), Paper 4 (दर्शनशास्त्र-प्रबंधन), हिंदी व निबंध। आधिकारिक PDF मुफ़्त डाउनलोड करें।",
  path: "/mppsc/mains-syllabus",
  keywords: [
    "mppsc mains syllabus pdf download",
    "mppsc mains syllabus pdf download in hindi",
    "mppsc mains syllabus 2026 pdf download",
    "mppsc mains syllabus",
    "mppsc mains syllabus 2026",
    "mppsc mains syllabus in hindi",
    "mppsc mains syllabus pdf",
    "MPPSC मुख्य परीक्षा पाठ्यक्रम PDF",
    "MPPSC Mains Paper 1 2 3 4 5 6 Syllabus PDF",
  ],
  type: "article",
  publishedTime: "2026-01-10",
  modifiedTime: new Date().toISOString().split("T")[0],
  category: "MPPSC",
});

/* ─── FAQ Data ─────────────────────────────────────────────────────────────── */
const faqs = [
  {
    question: "MPPSC Mains में कुल कितने पेपर होते हैं?",
    answer:
      "MPPSC मुख्य परीक्षा (Mains) में कुल 6 वर्णनात्मक (Descriptive) प्रश्नपत्र होते हैं — सामान्य अध्ययन I (इतिहास + भूगोल), सामान्य अध्ययन II (राजनीति + समाजशास्त्र), सामान्य अध्ययन III (अर्थशास्त्र + विज्ञान), सामान्य अध्ययन IV (दर्शनशास्त्र + प्रबंधन), सामान्य हिंदी एवं व्याकरण, और हिंदी निबंध एवं प्रारूप लेखन। कुल 1500 अंकों की लिखित परीक्षा होती है।",
  },
  {
    question: "MPPSC Mains Syllabus 2026 में क्या बदलाव हुआ है?",
    answer:
      "MPPSC ने 05 जनवरी 2026 को नवीनतम परीक्षा योजना जारी की है। प्रमुख बदलावों में सामान्य अध्ययन चतुर्थ प्रश्नपत्र में केस स्टडी (18 अंक) का समावेश, AYUSH एवं आयुर्वेद संबंधी नए टॉपिक, AI और साइबर सिक्यूरिटी संबंधी प्रश्न, तथा NEP 2020 से जुड़े नए विषय शामिल हैं।",
  },
  {
    question: "MPPSC Mains की तैयारी कैसे करें?",
    answer:
      "MPPSC Mains की तैयारी के लिए: (1) सर्वप्रथम पूर्ण पाठ्यक्रम को ध्यानपूर्वक पढ़ें, (2) प्रत्येक Paper के लिए NCERT (कक्षा 6-12) पूरी करें, (3) मध्यप्रदेश विशिष्ट कंटेंट (MP GK, MP भूगोल, MP राजव्यवस्था) पर विशेष ध्यान दें, (4) नियमित उत्तर लेखन अभ्यास करें (प्रतिदिन 2-3 उत्तर), (5) Previous Year Papers (2014-2025) हल करें, (6) Aakar IAS Mains Test Series से मूल्यांकन कराएं।",
  },
  {
    question: "MPPSC Mains में कौन-कौन से विषय होते हैं?",
    answer:
      "MPPSC Mains में 6 विषय/प्रश्नपत्र होते हैं: (1) इतिहास एवं भूगोल — 300 अंक, (2) राजनीति विज्ञान एवं समाजशास्त्र — 300 अंक, (3) अर्थशास्त्र एवं विज्ञान-तकनीकी — 300 अंक, (4) दर्शनशास्त्र, मनोविज्ञान, लोक प्रशासन एवं उद्यमिता — 300 अंक, (5) सामान्य हिंदी एवं व्याकरण — 200 अंक, (6) हिंदी निबंध एवं प्रारूप लेखन — 100 अंक। कुल = 1500 अंक।",
  },
  {
    question: "MPPSC Mains का कुल अंक (Total Marks) कितना है?",
    answer:
      "MPPSC Mains लिखित परीक्षा कुल 1500 अंकों की होती है। इसके बाद 185 अंकों का साक्षात्कार (Interview) होता है। इस प्रकार अंतिम चयन सूची कुल 1685 अंकों (Mains 1500 + Interview 185) के आधार पर बनती है।",
  },
  {
    question: "MPPSC Mains में Negative Marking होती है क्या?",
    answer:
      "नहीं, MPPSC Mains परीक्षा में कोई Negative Marking नहीं होती। Mains के सभी 6 प्रश्नपत्र वर्णनात्मक (Descriptive) प्रकार के होते हैं जिनमें लिखित उत्तर देने होते हैं। Negative Marking केवल Prelims (प्रारंभिक) परीक्षा में लागू होती है जहाँ प्रत्येक गलत उत्तर पर 1 अंक काटा जाता है।",
  },
  {
    question: "MPPSC Mains में प्रत्येक Paper का समय कितना होता है?",
    answer:
      "सामान्य अध्ययन Paper I, II, III और IV (प्रत्येक) — 03 घंटे। सामान्य हिंदी (Paper V) — 02 घंटे। हिंदी निबंध एवं प्रारूप लेखन (Paper VI) — 02 घंटे 30 मिनट।",
  },
  {
    question: "Is MPPSC Mains tougher than UPSC Mains?",
    answer:
      "MPPSC Mains और UPSC Mains दोनों अपने-अपने स्तर पर चुनौतीपूर्ण हैं। MPPSC Mains में 6 Paper (1500 अंक) होते हैं जबकि UPSC Mains में 9 Paper होते हैं। MPPSC Mains में मध्यप्रदेश-विशिष्ट प्रश्न (MP History, Geography, Polity, Economy) अधिक आते हैं। UPSC की तुलना में MPPSC Mains का सिलेबस कम विस्तृत है लेकिन MP-specific content की गहरी तैयारी आवश्यक है।",
  },
  {
    question: "MPPSC Mains के लिए कौन सी किताबें पढ़ें?",
    answer:
      "MPPSC Mains के लिए अनुशंसित पुस्तकें: Paper I — NCERT इतिहास (6-12), राजेश मिश्रा MP GK, महेश कुमार बरनवाल भारत का भूगोल; Paper II — लक्ष्मीकांत भारतीय राजव्यवस्था, सामान्य समाजशास्त्र; Paper III — रमेश सिंह भारतीय अर्थव्यवस्था, Aakar IAS विज्ञान नोट्स; Paper IV — दर्शनशास्त्र ARC रिपोर्ट, नैतिकता नोट्स; Paper V-VI — वासुदेवनंदन प्रसाद हिंदी व्याकरण।",
  },
  {
    question: "MPPSC Mains Syllabus PDF कहाँ से डाउनलोड करें?",
    answer:
      "MPPSC Mains Syllabus 2026 का आधिकारिक PDF आप MPPSC की आधिकारिक वेबसाइट https://mppsc.mp.gov.in से डाउनलोड कर सकते हैं। इसके अलावा Aakar IAS (aakarias.com) पर भी संपूर्ण पाठ्यक्रम हिंदी और अंग्रेजी दोनों भाषाओं में विस्तृत रूप से उपलब्ध है।",
  },
];

/* ─── Page Component ───────────────────────────────────────────────────────── */
export default function MppscMainsSyllabusPage() {
  const pageUrl = `${siteConfig.url}/mppsc/mains-syllabus`;

  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    { name: "MPPSC", url: `${siteConfig.url}/mppsc` },
    { name: "Mains Syllabus", url: pageUrl },
  ]);

  const article = articleJsonLd({
    title:
      "MPPSC Mains Syllabus 2026 – Paper 1-6 Complete Unit-wise Syllabus in Hindi",
    description:
      "MPPSC मुख्य परीक्षा 2026 का पूर्ण इकाई-वार पाठ्यक्रम — सामान्य अध्ययन I, II, III, IV, हिंदी एवं निबंध।",
    url: pageUrl,
    image: `${siteConfig.url}/api/og?title=MPPSC+Mains+Syllabus+2026&category=MPPSC&lang=hi&type=article`,
    datePublished: "2026-01-10",
    authorName: "आकार आईएएस",
    keywords: [
      "MPPSC Mains Syllabus",
      "MPPSC Mains Syllabus 2026",
      "MPPSC Mains Syllabus Hindi",
      "MPPSC Paper 1 2 3 4 5 6 Syllabus",
    ],
    inLanguage: "hi-IN",
    alternates: {
      hi: pageUrl,
      en: `${siteConfig.url}/en/mppsc/mains-syllabus`,
    },
  });

  const faqSchema = faqJsonLd(
    faqs.map((f) => ({ question: f.question, answer: f.answer }))
  );

  return (
    <>
      {/* ─── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-secondary text-secondary-foreground">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--primary)_0%,_transparent_50%)] opacity-20" />
        <Container size="wide" className="relative py-16 sm:py-20">
          <div className="max-w-3xl">
            <span className="inline-block rounded-full bg-primary/15 px-4 py-1 text-sm font-semibold text-primary">
              MPPSC मुख्य परीक्षा 2026 PDF Download
            </span>
            <h1 className="mt-4 text-balance text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              MPPSC Mains Syllabus 2026 PDF Download in Hindi (Paper 1-6)
            </h1>
            <p className="mt-4 text-pretty text-lg text-white/75">
              मध्यप्रदेश लोक सेवा आयोग (MPPSC) मुख्य परीक्षा 2026 का{" "}
              <strong>पूर्ण पाठ्यक्रम हिंदी में</strong> — 6 प्रश्नपत्र, 1500 अंक,
              सामान्य अध्ययन I-IV, हिंदी एवं निबंध। आधिकारिक परीक्षा योजना
              (05.01.2026) पर आधारित।
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href="/pdf/mppsc-mains-syllabus-in-hindi.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-md transition hover:bg-primary/90"
              >
                📄 MPPSC Mains Syllabus PDF (Hindi) देखें / View
              </a>
              <a
                href="/pdf/mppsc-mains-syllabus-in-english.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-5 py-3 text-sm font-bold text-white border border-white/20 transition hover:bg-white/20"
              >
                📄 MPPSC Mains Syllabus PDF (English) देखें / View
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── Breadcrumb ─────────────────────────────────────────────── */}
      <Section className="pb-0 pt-8">
        <Container size="wide">
          <Breadcrumb
            items={[
              { name: "MPPSC", href: "/mppsc" },
              { name: "Syllabus 2026", href: "/mppsc/syllabus-2026" },
              { name: "Mains Syllabus" },
            ]}
          />
        </Container>
      </Section>

      {/* ─── Table of Contents ──────────────────────────────────────── */}
      <Section className="pt-8 pb-0">
        <Container size="narrow">
          <nav
            aria-label="विषय-सूची"
            className="rounded-xl border border-border/50 bg-card p-6"
          >
            <h2 className="mb-4 text-lg font-bold text-primary">
              📑 विषय-सूची (Table of Contents)
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>
                <a href="#overview" className="text-primary hover:underline">
                  मुख्य परीक्षा — परीक्षा पैटर्न अवलोकन
                </a>
              </li>
              <li>
                <a href="#paper-1" className="text-primary hover:underline">
                  प्रथम प्रश्नपत्र — इतिहास + भूगोल (300 अंक)
                </a>
              </li>
              <li>
                <a href="#paper-2" className="text-primary hover:underline">
                  द्वितीय प्रश्नपत्र — राजनीति + समाजशास्त्र (300 अंक)
                </a>
              </li>
              <li>
                <a href="#paper-3" className="text-primary hover:underline">
                  तृतीय प्रश्नपत्र — अर्थशास्त्र + विज्ञान (300 अंक)
                </a>
              </li>
              <li>
                <a href="#paper-4" className="text-primary hover:underline">
                  चतुर्थ प्रश्नपत्र — दर्शनशास्त्र + प्रबंधन (300 अंक)
                </a>
              </li>
              <li>
                <a href="#paper-5" className="text-primary hover:underline">
                  पंचम प्रश्नपत्र — सामान्य हिंदी (200 अंक)
                </a>
              </li>
              <li>
                <a href="#paper-6" className="text-primary hover:underline">
                  षष्ठ प्रश्नपत्र — निबंध एवं प्रारूप लेखन (100 अंक)
                </a>
              </li>
              <li>
                <a href="#tips" className="text-primary hover:underline">
                  MPPSC Mains तैयारी रणनीति एवं महत्वपूर्ण Tips
                </a>
              </li>
              <li>
                <a href="#resources" className="text-primary hover:underline">
                  महत्वपूर्ण लिंक एवं संसाधन
                </a>
              </li>
              <li>
                <a href="#faq" className="text-primary hover:underline">
                  अक्सर पूछे जाने वाले प्रश्न (FAQs)
                </a>
              </li>
            </ol>
          </nav>
        </Container>
      </Section>

      {/* ─── Content ─────────────────────────────────────────────────── */}
      <Section>
        <Container size="narrow">
          <div className="prose prose-aakar dark:prose-invert max-w-none">
            {/* ═══ Overview ════════════════════════════════════════════ */}
            <h2 id="overview">
              मुख्य परीक्षा (Mains) — परीक्षा पैटर्न अवलोकन
            </h2>
            <p>
              MPPSC मुख्य परीक्षा में कुल{" "}
              <strong>06 वर्णनात्मक (Descriptive) प्रश्नपत्र</strong> होते हैं।{" "}
              <strong>सभी प्रश्नपत्र अनिवार्य हैं।</strong> अभ्यर्थी सामान्य
              अध्ययन Paper I, II एवं III में <strong>हिन्दी अथवा अंग्रेजी</strong>{" "}
              माध्यम में उत्तर लिख सकते हैं। Paper V एवं VI केवल हिन्दी माध्यम
              में हैं।
            </p>

            <div className="overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    <th>प्रश्नपत्र</th>
                    <th>खंड</th>
                    <th>विषय</th>
                    <th>अंक</th>
                    <th>अवधि</th>
                    <th>माध्यम</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td rowSpan={2}>GS-I</td>
                    <td>(अ)</td>
                    <td>इतिहास</td>
                    <td>150</td>
                    <td rowSpan={2}>03 घंटे</td>
                    <td rowSpan={2}>हिन्दी / अंग्रेजी</td>
                  </tr>
                  <tr>
                    <td>(ब)</td>
                    <td>भूगोल</td>
                    <td>150</td>
                  </tr>
                  <tr>
                    <td rowSpan={2}>GS-II</td>
                    <td>(अ)</td>
                    <td>राजनीति विज्ञान</td>
                    <td>150</td>
                    <td rowSpan={2}>03 घंटे</td>
                    <td rowSpan={2}>हिन्दी / अंग्रेजी</td>
                  </tr>
                  <tr>
                    <td>(ब)</td>
                    <td>समाजशास्त्र</td>
                    <td>150</td>
                  </tr>
                  <tr>
                    <td rowSpan={2}>GS-III</td>
                    <td>(अ)</td>
                    <td>अर्थशास्त्र</td>
                    <td>150</td>
                    <td rowSpan={2}>03 घंटे</td>
                    <td rowSpan={2}>हिन्दी / अंग्रेजी</td>
                  </tr>
                  <tr>
                    <td>(ब)</td>
                    <td>विज्ञान, तकनीकी एवं जन स्वास्थ्य</td>
                    <td>150</td>
                  </tr>
                  <tr>
                    <td rowSpan={2}>GS-IV</td>
                    <td>(अ)</td>
                    <td>दर्शनशास्त्र, मनोविज्ञान, लोक प्रशासन एवं केस स्टडी</td>
                    <td>150</td>
                    <td rowSpan={2}>03 घंटे</td>
                    <td rowSpan={2}>हिन्दी / अंग्रेजी</td>
                  </tr>
                  <tr>
                    <td>(ब)</td>
                    <td>उद्यमिता, प्रबंधन, व्यक्तित्व विकास एवं केस स्टडी</td>
                    <td>150</td>
                  </tr>
                  <tr>
                    <td>Paper V</td>
                    <td>—</td>
                    <td>सामान्य हिन्दी एवं व्याकरण</td>
                    <td>200</td>
                    <td>02 घंटे</td>
                    <td>हिन्दी</td>
                  </tr>
                  <tr>
                    <td>Paper VI</td>
                    <td>—</td>
                    <td>हिन्दी निबंध एवं प्रारूप लेखन</td>
                    <td>100</td>
                    <td>02:30 घंटे</td>
                    <td>हिन्दी</td>
                  </tr>
                  <tr>
                    <td colSpan={3}>
                      <strong>कुल अंक (Written)</strong>
                    </td>
                    <td>
                      <strong>1500</strong>
                    </td>
                    <td colSpan={2} />
                  </tr>
                  <tr>
                    <td colSpan={3}>
                      <strong>साक्षात्कार (Interview)</strong>
                    </td>
                    <td>
                      <strong>185</strong>
                    </td>
                    <td colSpan={2} />
                  </tr>
                  <tr>
                    <td colSpan={3}>
                      <strong>कुल योग</strong>
                    </td>
                    <td>
                      <strong>1685</strong>
                    </td>
                    <td colSpan={2} />
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>प्रश्नों का स्वरूप — GS Paper I, II एवं III (प्रत्येक खंड)</h3>
            <div className="overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    <th>प्रकार</th>
                    <th>प्रश्न</th>
                    <th>अंक/प्रश्न</th>
                    <th>शब्द-सीमा</th>
                    <th>योग</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>अति लघुत्तरीय</td>
                    <td>15</td>
                    <td>02</td>
                    <td>20 शब्द</td>
                    <td>30</td>
                  </tr>
                  <tr>
                    <td>लघुत्तरीय</td>
                    <td>10</td>
                    <td>07</td>
                    <td>60 शब्द</td>
                    <td>70</td>
                  </tr>
                  <tr>
                    <td>दीर्घ उत्तरीय</td>
                    <td>05</td>
                    <td>10</td>
                    <td>200 शब्द</td>
                    <td>50</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>कुल</strong>
                    </td>
                    <td>
                      <strong>30</strong>
                    </td>
                    <td />
                    <td />
                    <td>
                      <strong>150</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <hr />

            {/* ═══ PAPER I ═════════════════════════════════════════════ */}
            <h2 id="paper-1">
              प्रथम प्रश्नपत्र — सामान्य अध्ययन-I: इतिहास एवं भूगोल (300 अंक)
            </h2>

            <h3>खंड (अ) — इतिहास (150 अंक)</h3>

            <h4>इकाई-1 भारतीय इतिहास एवं संस्कृति</h4>
            <ul>
              <li>
                <strong>संकल्पना एवं विचार</strong> — वेद, उपनिषद्, आरण्यक, ब्राह्मण
                ग्रंथ, षड्दर्शन, स्मृतियाँ, ऋत, सभा-समिति, गणतंत्र, पंचमहायज्ञ, कर्म
                का सिद्धांत, बोधिसत्व, तीर्थंकर।
              </li>
              <li>
                प्राचीन, मध्यकालीन एवं आधुनिक भारत के इतिहास की प्रमुख विशेषताएँ,
                घटनाएँ एवं उनकी प्रशासनिक, सामाजिक तथा आर्थिक व्यवस्थाएँ।
              </li>
              <li>भारत की सांस्कृतिक विरासत, कला प्रारूप, वास्तुकला एवं साहित्य।</li>
              <li>
                <strong>ब्रिटिश साम्राज्य का प्रभाव</strong> — भूमि सुधार, भू-राजस्व
                व्यवस्थाएँ, सामाजिक-धार्मिक सुधार आंदोलन।
              </li>
              <li>
                राष्ट्रीय आंदोलन — विभिन्न चरण, धाराएँ, क्रांतिकारी, महात्मा गांधी की
                भूमिका।
              </li>
              <li>स्वतंत्रता के पश्चात भारत का एकीकरण और पुनर्गठन।</li>
            </ul>

            <h4>इकाई-2 मध्यप्रदेश का इतिहास एवं संस्कृति</h4>
            <ul>
              <li>
                मध्यप्रदेश के प्रमुख राजवंश — परमार, चंदेल, कल्चुरि, होल्कर, सिंधिया।
              </li>
              <li>स्वतंत्रता आंदोलन में मध्यप्रदेश का योगदान।</li>
              <li>
                मध्यप्रदेश की कला, स्थापत्य एवं सांस्कृतिक विरासत — साँची, भीमबेटका,
                खजुराहो।
              </li>
              <li>
                मध्यप्रदेश की प्रमुख जनजातियाँ, बोलियाँ, लोक संगीत, लोक कलाएँ।
              </li>
              <li>
                मध्यप्रदेश के प्रमुख साहित्यकार — भवभूति, केशवदास, सुभद्राकुमारी
                चौहान, माखनलाल चतुर्वेदी।
              </li>
              <li>
                विश्व धरोहर स्थल — भीमबेटका, साँची, खजुराहो और ओरछा (Tentative)।
              </li>
            </ul>

            <h4>इकाई-3 विश्व इतिहास</h4>
            <ul>
              <li>
                फ्रांसीसी क्रांति (1789), औद्योगिक क्रांति, साम्राज्यवाद एवं
                उपनिवेशवाद।
              </li>
              <li>प्रथम एवं द्वितीय विश्व युद्ध — कारण, परिणाम।</li>
              <li>
                संयुक्त राष्ट्र संघ (UNO) — संरचना, कार्य, शांति स्थापना।
              </li>
              <li>
                शीत युद्ध, गुटनिरपेक्ष आंदोलन (NAM), वैश्वीकरण के सामाजिक-राजनीतिक
                प्रभाव।
              </li>
            </ul>

            <h4>इकाई-4 भारत एवं मध्यप्रदेश का भूगोल — भौतिक विशेषताएँ</h4>
            <ul>
              <li>
                भारत — भू-आकृतिक विभाग, नदियाँ, झीलें, जलवायु, मानसून प्रणाली।
              </li>
              <li>प्राकृतिक वनस्पति एवं मिट्टियों के प्रकार।</li>
              <li>
                मध्यप्रदेश — मालवा पठार, विंध्याचल, सतपुड़ा, नर्मदा-सोन घाटी।
              </li>
              <li>प्रमुख नदियाँ, जलवायु, ऋतुएँ, मिट्टियाँ।</li>
            </ul>

            <h4>इकाई-5 संसाधन, जनसंख्या एवं उद्योग</h4>
            <ul>
              <li>प्रमुख फसलें, खनिज, ऊर्जा संसाधन, जल संसाधन।</li>
              <li>
                भारत एवं मध्यप्रदेश के प्रमुख उद्योग, MSME एवं कुटीर उद्योग।
              </li>
              <li>
                जनसंख्या वृद्धि, वितरण, नगरीकरण, ग्रामीण-शहरी प्रवास।
              </li>
              <li>
                प्राकृतिक आपदाएँ, प्रदूषण, रिमोट सेंसिंग, GIS एवं GPS के अनुप्रयोग।
              </li>
            </ul>

            <hr />

            {/* ═══ PAPER II ════════════════════════════════════════════ */}
            <h2 id="paper-2">
              द्वितीय प्रश्नपत्र — सामान्य अध्ययन-II: राजनीति विज्ञान एवं
              समाजशास्त्र (300 अंक)
            </h2>

            <h3>खंड (अ) — राजनीति विज्ञान (150 अंक)</h3>

            <h4>इकाई-1 संविधान एवं संघीय संरचना</h4>
            <ul>
              <li>
                भारतीय संविधान — निर्माण, विशेषताएँ, मूल ढाँचा, प्रमुख संशोधन।
              </li>
              <li>
                उद्देशिका, मूल अधिकार, मूल कर्तव्य, नीति-निदेशक तत्व।
              </li>
              <li>
                केंद्र-राज्य संबंध, सर्वोच्च न्यायालय, उच्च न्यायालय, न्यायिक
                पुनरावलोकन, लोक अदालत, जनहित याचिका।
              </li>
            </ul>

            <h4>इकाई-2 संवैधानिक निकाय एवं भारतीय राजनीति</h4>
            <ul>
              <li>
                निर्वाचन आयोग, CAG, UPSC, MPPSC, नीति आयोग।
              </li>
              <li>
                जाति, धर्म, भाषा, लिंग की राजनीति में भूमिका, राजनीतिक दल,
                राष्ट्रीय अखंडता।
              </li>
            </ul>

            <h4>इकाई-3 लोकतंत्र एवं राजनीतिक विचारक</h4>
            <ul>
              <li>
                समुदाय आधारित संगठन (CBO), NGO, SHG, मीडिया की भूमिका।
              </li>
              <li>
                <strong>भारतीय राजनीतिक विचारक</strong> — कौटिल्य, देवी अहिल्याबाई
                होल्कर, महात्मा गांधी, नेहरु, सरदार पटेल, लोहिया, अंबेडकर, दीनदयाल
                उपाध्याय, जयप्रकाश नारायण।
              </li>
            </ul>

            <h4>इकाई-4 मध्यप्रदेश की शासन व्यवस्था</h4>
            <ul>
              <li>
                राज्यपाल, मुख्यमंत्री, मंत्रिपरिषद, विधानसभा, उच्च न्यायालय।
              </li>
              <li>
                विभिन्न आयोग — SC/ST/OBC/CVC/मानव अधिकार/सूचना/उपभोक्ता/बाल/महिला।
              </li>
            </ul>

            <h4>इकाई-5 स्थानीय स्वशासन एवं समसामयिक मुद्दे</h4>
            <ul>
              <li>
                मध्यप्रदेश में पंचायतीराज एवं नगरीय प्रशासन, जिला प्रशासन।
              </li>
              <li>
                जनजातीय, पिछड़े वर्ग का उत्थान, नक्सली समस्या, महिलाओं का योगदान।
              </li>
            </ul>

            <h3>खंड (ब) — समाजशास्त्र (150 अंक)</h3>

            <h4>इकाई-1 समाजशास्त्र की मूल अवधारणाएँ</h4>
            <ul>
              <li>
                भारतीय समाज — कुटुंब, परिवार, नातेदारी, गोत्र, वर्णाश्रम, संस्कार।
              </li>
              <li>
                सामाजिक समरसता, सभ्यता-संस्कृति, धर्म-संप्रदाय का प्रभाव।
              </li>
            </ul>

            <h4>इकाई-2 विविधता, चुनौतियाँ एवं राष्ट्र निर्माण</h4>
            <ul>
              <li>
                क्षेत्रीय, भाषायी, धार्मिक, जनजातीय विविधता।
              </li>
              <li>
                अपराध — साइबर, नशा, घरेलू हिंसा; परंपरा बनाम आधुनिकता; धर्मनिरपेक्षता।
              </li>
            </ul>

            <h4>इकाई-3 ग्रामीण एवं नगरीय समाजशास्त्र</h4>
            <ul>
              <li>
                ग्रामीण-शहरी अंतर, पंचायती राज, किसान अध्ययन, नगरीकरण।
              </li>
            </ul>

            <h4>इकाई-4 वैश्वीकरण, जनसंख्या एवं सामाजिक परिवर्तन</h4>
            <ul>
              <li>
                औद्योगीकरण का सामाजिक प्रभाव, वैश्वीकरण की चुनौतियाँ, जनसंख्या वृद्धि।
              </li>
            </ul>

            <h4>इकाई-5 मानव संसाधन विकास एवं कल्याण योजनाएँ</h4>
            <ul>
              <li>
                NEP 2020, सामाजिक कल्याण कार्यक्रम, मध्यप्रदेश की जनजातियों की
                सामाजिक संरचना, लोक संस्कृति।
              </li>
            </ul>

            <hr />

            {/* ═══ PAPER III ═══════════════════════════════════════════ */}
            <h2 id="paper-3">
              तृतीय प्रश्नपत्र — सामान्य अध्ययन-III: अर्थशास्त्र एवं विज्ञान,
              तकनीकी व जन स्वास्थ्य (300 अंक)
            </h2>

            <h3>खंड (अ) — अर्थशास्त्र (150 अंक)</h3>

            <h4>इकाई-1 भारतीय अर्थव्यवस्था</h4>
            <ul>
              <li>
                प्रमुख विशेषताएँ, विकसित भारत @2047, कृषि-उद्योग-सेवा क्षेत्र।
              </li>
              <li>
                राष्ट्रीय आय, प्रमुख फसलें, किसान संकट, सरकारी योजनाएँ (PM-KISAN, NMSA)।
              </li>
              <li>
                औद्योगिक नीतियां, Make in India, कृषि स्टार्ट-अप, मानकीकरण।
              </li>
            </ul>

            <h4>इकाई-2 कराधान एवं वित्तीय नीतियाँ</h4>
            <ul>
              <li>
                राजकोषीय-मौद्रिक नीति, वित्तीय समावेशन, खाद्य सुरक्षा, PDS।
              </li>
              <li>
                गरीबी, बेरोजगारी, विदेश व्यापार, IMF, World Bank, WTO।
              </li>
            </ul>

            <h4>इकाई-3 मध्यप्रदेश की अर्थव्यवस्था</h4>
            <ul>
              <li>
                GSDP, ODOP, प्रमुख फसलें, उद्यानिकी, पशुधन, मत्स्य पालन।
              </li>
              <li>
                MSME, जनजातीय अर्थव्यवस्था, पर्यटन, निवेश प्रोत्साहन।
              </li>
            </ul>

            <h4>इकाई-4 सामाजिक-आर्थिक विकास एवं सांख्यिकी</h4>
            <ul>
              <li>
                स्वास्थ्य, शिक्षा, कौशल विकास, IPR, राजस्व एवं वित्तीय अनुशासन।
              </li>
              <li>
                सांख्यिकी — माध्य, माध्यिका, बहुलक, प्रतिदर्शन, प्रायिकता।
              </li>
            </ul>

            <h3>खंड (ब) — विज्ञान, तकनीकी एवं जन स्वास्थ्य (150 अंक)</h3>

            <h4>इकाई-1 सामान्य विज्ञान एवं जैव प्रौद्योगिकी</h4>
            <ul>
              <li>
                सूक्ष्मजीव, कोशिका, पोषण, मानव शरीर, जैव प्रौद्योगिकी, नृविज्ञान।
              </li>
              <li>
                प्राचीन खगोल विज्ञान — आर्यभट्ट, वराहमिहिर, भास्कर; TRIPS/TRIMS।
              </li>
            </ul>

            <h4>इकाई-2 कंप्यूटर, गणित एवं AI</h4>
            <ul>
              <li>
                कंप्यूटर के प्रकार, मेमोरी, OS, C/C++/Java, इंटरनेट, सोशल मीडिया।
              </li>
              <li>
                AI, क्लाउड कंप्यूटिंग, ई-गवर्नेंस, संख्याएँ, ज्यामिति।
              </li>
            </ul>

            <h4>इकाई-3 AYUSH एवं आयुर्वेद</h4>
            <ul>
              <li>
                आयुर्वेद, योग, प्राकृतिक चिकित्सा, यूनानी, सिद्ध, होम्योपैथी।
              </li>
              <li>
                त्रिदोष, पंचमहाभूत, पंचकर्म, अष्टांग योग, षोडश संस्कार।
              </li>
            </ul>

            <h4>इकाई-4 राष्ट्रीय स्वास्थ्य कार्यक्रम</h4>
            <ul>
              <li>
                NLEP, NACP, NPCB, TB उन्मूलन, ICDS, NHM, आयुष्मान भारत, स्वच्छ
                भारत मिशन।
              </li>
              <li>
                प्राथमिक स्वास्थ्य देखभाल — PHC, CHC, उप-केंद्र।
              </li>
            </ul>

            <h4>इकाई-5 पर्यावरण एवं आपदा प्रबंधन</h4>
            <ul>
              <li>
                पर्यावरण नैतिकता, जैव विविधता, प्रदूषण, जलवायु परिवर्तन एवं आपदा प्रबंधन।
              </li>
              <li>
                मध्यप्रदेश की जनजातियों की पर्यावरण संरक्षण में भूमिका, स्वच्छता
                सर्वेक्षण, जल सुरक्षा एवं आपदा शमन।
              </li>
            </ul>

            {/* Disaster Management Article Interlinking Box */}
            <div className="my-6 rounded-xl border border-primary/20 bg-primary/5 p-5 shadow-sm">
              <h5 className="m-0 text-base font-bold text-primary flex items-center gap-2">
                📚 MPPSC Mains Paper 3 & 4: आपदा प्रबंधन विशेष अध्ययन सामग्री
              </h5>
              <p className="mt-2 text-sm text-foreground/90 leading-relaxed">
                मुख्य परीक्षा हेतु आपदा प्रबंधन (Disaster Management) के लिए तैयार किए गए हमारे अद्यतन नोट्स एवं 2025 अधिनियम की विस्तृत समीक्षा पढ़ें:
              </p>
              <ul className="mt-2 space-y-1.5 text-sm font-semibold">
                <li>
                  👉 <Link href="/general-awareness/what-is-disaster-management-ncert-types-mppsc-notes" className="text-primary hover:underline">
                    आपदा प्रबंधन क्या है? अर्थ, प्रकार, 6 चरण, आवश्यकता व मुख्य सिद्धांत (MPPSC Notes)
                  </Link>
                </li>
                <li>
                  👉 <Link href="/current-affairs/disaster-management-amendment-act-2025-mppsc-upsc-notes" className="text-primary hover:underline">
                    आपदा प्रबंधन (संशोधन) अधिनियम, 2025: मुख्य विशेषताएँ, UDMA धारा 41A व महत्व
                  </Link>
                </li>
              </ul>
            </div>

            <hr />

            {/* ═══ PAPER IV ════════════════════════════════════════════ */}
            <h2 id="paper-4">
              चतुर्थ प्रश्नपत्र — सामान्य अध्ययन-IV: दर्शनशास्त्र, मनोविज्ञान, लोक
              प्रशासन, उद्यमिता एवं केस स्टडी (300 अंक)
            </h2>

            <h3>खंड (अ) — दर्शनशास्त्र, मनोविज्ञान एवं लोक प्रशासन (150 अंक)</h3>

            <h4>इकाई-1 भारतीय दर्शन एवं विचारक</h4>
            <ul>
              <li>
                षड्दर्शन, सुकरात, प्लेटो, अरस्तू, महावीर, बुद्ध, शंकराचार्य।
              </li>
              <li>
                कबीर, तुलसीदास, गुरु नानक, विवेकानंद, अंबेडकर, दीनदयाल उपाध्याय।
              </li>
            </ul>

            <h4>इकाई-2 राष्ट्र निर्माण एवं नैतिकता</h4>
            <ul>
              <li>
                राष्ट्रीय सुरक्षा, सशस्त्र बल, नैतिकता की मूल अवधारणाएँ, भगवद्गीता।
              </li>
            </ul>

            <h4>इकाई-3 मनोविज्ञान एवं अभिरुचि</h4>
            <ul>
              <li>
                मनोवृत्ति, सिविल सेवा अभिरुचि, संवेगात्मक बुद्धि, मानसिक विकार।
              </li>
            </ul>

            <h4>इकाई-4 लोक प्रशासन में नैतिकता</h4>
            <ul>
              <li>
                सुशासन, ई-गवर्नेंस, भ्रष्टाचार, RTI, सिटीजन चार्टर, सामाजिक पूंजी।
              </li>
            </ul>

            <h4>इकाई-5 केस स्टडी (18 अंक)</h4>
            <ul>
              <li>
                खंड (अ) के संपूर्ण पाठ्यक्रम पर आधारित — परिस्थितिजन्य केस स्टडी
                प्रश्न।
              </li>
            </ul>

            <h3>
              खंड (ब) — उद्यमिता, प्रबंधन, व्यक्तित्व विकास एवं केस स्टडी (150 अंक)
            </h3>

            <h4>इकाई-1 उद्यमिता</h4>
            <ul>
              <li>
                उद्यमिता की अवधारणा, नवाचार, व्यवसाय योजना, स्टार्टअप इंडिया, Make in
                India।
              </li>
            </ul>

            <h4>इकाई-2 प्रबंधन</h4>
            <ul>
              <li>
                प्रबंधन प्रक्रिया, संसाधन प्रबंधन, ब्रांडिंग, मार्केटिंग, समय
                प्रबंधन।
              </li>
            </ul>

            <h4>इकाई-3 प्रशासन एवं प्रबंधन</h4>
            <ul>
              <li>
                HRM, वित्तीय प्रबंधन, तनाव-संघर्ष प्रबंधन, आपदा प्रबंधन।
              </li>
            </ul>

            <h4>इकाई-4 व्यक्तित्व विकास</h4>
            <ul>
              <li>
                सफलता की अवधारणा, बाधाएँ, नागरिक भावना, मूल्य-आधारित जीवन।
              </li>
            </ul>

            <h4>इकाई-5 केस स्टडी (18 अंक)</h4>
            <ul>
              <li>खंड (ब) के पाठ्यक्रम पर आधारित केस स्टडी।</li>
            </ul>

            <hr />

            {/* ═══ PAPER V ═════════════════════════════════════════════ */}
            <h2 id="paper-5">
              पंचम प्रश्नपत्र — सामान्य हिंदी एवं व्याकरण (200 अंक, 2 घंटे)
            </h2>
            <p>
              इस प्रश्नपत्र का स्तर{" "}
              <strong>स्नातक परीक्षा उत्तीर्ण छात्रों के समकक्ष</strong> होगा। उद्देश्य
              — पढ़ने की समझ, भाषाई योग्यता, लेखन कौशल और सही विचार अभिव्यक्ति का
              मूल्यांकन।
            </p>
            <div className="overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    <th>भाग</th>
                    <th>विषय</th>
                    <th>अंक</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>(क)</td>
                    <td>अति लघुत्तरीय — संपूर्ण पाठ्यक्रम से</td>
                    <td>75</td>
                  </tr>
                  <tr>
                    <td>(ख)</td>
                    <td>रस एवं छंद (दोहा, सोरठा, चौपाई)</td>
                    <td>10</td>
                  </tr>
                  <tr>
                    <td>(ग)</td>
                    <td>अनुवाद (Hindi↔English) + प्रशासनिक शब्दावली</td>
                    <td>40</td>
                  </tr>
                  <tr>
                    <td>(घ)</td>
                    <td>संधि, समास, मुहावरे, कहावतें</td>
                    <td>20</td>
                  </tr>
                  <tr>
                    <td>(ङ)</td>
                    <td>
                      व्याकरण — विराम चिह्न, विलोम, तत्सम-तद्भव, पर्यायवाची, वर्तनी
                    </td>
                    <td>20</td>
                  </tr>
                  <tr>
                    <td>(च)</td>
                    <td>पल्लवन</td>
                    <td>05</td>
                  </tr>
                  <tr>
                    <td>(छ)</td>
                    <td>
                      MP की बोलियाँ — मालवी, निमाड़ी, बघेली, बुंदेली
                    </td>
                    <td>12</td>
                  </tr>
                  <tr>
                    <td>(ज)</td>
                    <td>अपठित गद्यांश</td>
                    <td>18</td>
                  </tr>
                  <tr>
                    <td />
                    <td>
                      <strong>कुल</strong>
                    </td>
                    <td>
                      <strong>200</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <hr />

            {/* ═══ PAPER VI ════════════════════════════════════════════ */}
            <h2 id="paper-6">
              षष्ठ प्रश्नपत्र — हिंदी निबंध एवं प्रारूप लेखन (100 अंक, 2:30 घंटे)
            </h2>
            <div className="overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    <th>प्रश्न</th>
                    <th>शब्द-सीमा</th>
                    <th>अंक</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>प्रथम निबंध</td>
                    <td>≈1000</td>
                    <td>50</td>
                  </tr>
                  <tr>
                    <td>द्वितीय निबंध</td>
                    <td>≈500</td>
                    <td>20</td>
                  </tr>
                  <tr>
                    <td>प्रारूप लेखन</td>
                    <td>≈250</td>
                    <td>15</td>
                  </tr>
                  <tr>
                    <td>प्रतिवेदन लेखन</td>
                    <td>≈250</td>
                    <td>15</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>कुल</strong>
                    </td>
                    <td />
                    <td>
                      <strong>100</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              <strong>प्रथम निबंध के संभावित विषय:</strong> विकसित भारत @2047,
              आत्मनिर्भर भारत, गौरवशाली मध्यप्रदेश, अंतरिक्ष में भारत, NEP 2020, AI,
              सांस्कृतिक विरासत, योग एवं स्वास्थ्य, सुशासन, जनजातीय विकास, राष्ट्रीय
              एकता, सतत् विकास, वसुधैव कुटुम्बकम आदि।
            </p>

            <hr />

            {/* ═══ Preparation Tips ════════════════════════════════════ */}
            <h2 id="tips">
              MPPSC Mains तैयारी रणनीति एवं महत्वपूर्ण Tips
            </h2>

            <h3>📌 Paper-wise Strategy</h3>
            <ul>
              <li>
                <strong>Paper I (इतिहास + भूगोल):</strong> NCERT कक्षा 6-12 +
                MP-विशिष्ट फैक्ट्स (जनजातियाँ, विश्व धरोहर, लोक कलाएँ)। नक्शे का
                अभ्यास करें।
              </li>
              <li>
                <strong>Paper II (राजनीति + समाजशास्त्र):</strong> लक्ष्मीकांत +
                MP राजव्यवस्था। समाजशास्त्र में भारतीय अवधारणाओं को MPPSC दृष्टिकोण
                से पढ़ें।
              </li>
              <li>
                <strong>Paper III (अर्थशास्त्र + विज्ञान):</strong> MP आर्थिक
                सर्वेक्षण ज़रूर पढ़ें। AYUSH/आयुर्वेद नया जोड़ा गया विषय है — अच्छे से
                तैयार करें।
              </li>
              <li>
                <strong>Paper IV (Ethics + Management):</strong> केस स्टडी (18 अंक)
                सबसे scoring — रोज़ 1 केस स्टडी का अभ्यास करें।
              </li>
              <li>
                <strong>Paper V (हिंदी):</strong> MP की चारों बोलियाँ (12 अंक)
                ज़रूरी। अनुवाद प्रैक्टिस करें।
              </li>
              <li>
                <strong>Paper VI (निबंध):</strong> 3 भागों में निबंध लिखें —
                भूमिका, विस्तार, निष्कर्ष। प्रारूप लेखन का फॉर्मेट याद रखें।
              </li>
            </ul>

            <h3>🏆 Top 5 General Tips</h3>
            <ol>
              <li>
                <strong>उत्तर लेखन अभ्यास:</strong> प्रतिदिन कम-से-कम 3 उत्तर
                लिखें। शब्द-सीमा का पालन करें।
              </li>
              <li>
                <strong>MP विशिष्ट कंटेंट:</strong> MPPSC Mains में 40-50% प्रश्न
                MP-specific होते हैं। MP Year Book/आर्थिक सर्वेक्षण ज़रूर पढ़ें।
              </li>
              <li>
                <strong>Previous Year Papers:</strong> 2014 से 2025 तक सभी प्रश्नपत्र
                हल करें —{" "}
                <Link href="/mppsc/previous-year-papers" className="text-primary">
                  PYQ डाउनलोड करें
                </Link>
                ।
              </li>
              <li>
                <strong>Mains Test Series:</strong> Aakar IAS{" "}
                <Link href="/test-series" className="text-primary">
                  विजयसिद्धि Mains Test Series
                </Link>{" "}
                से 48 घंटे में कॉपी मूल्यांकन कराएं।
              </li>
              <li>
                <strong>Toppers की कॉपी देखें:</strong>{" "}
                <Link href="/mppsc/toppers-copy" className="text-primary">
                  MPPSC Toppers Answer Copies
                </Link>{" "}
                का अध्ययन करें।
              </li>
            </ol>

            <hr />

            {/* ═══ Resources ══════════════════════════════════════════ */}
            <h2 id="resources">📚 महत्वपूर्ण लिंक एवं संसाधन</h2>
            <div className="overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    <th>संसाधन</th>
                    <th>लिंक</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>MPPSC Full Syllabus (Prelims + Mains + Interview)</td>
                    <td>
                      <Link href="/mppsc/syllabus-2026" className="text-primary">
                        पूरा सिलेबस देखें →
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td>MPPSC Prelims Syllabus 2026</td>
                    <td>
                      <Link href="/mppsc/prelims-syllabus" className="text-primary">
                        प्रारंभिक परीक्षा पाठ्यक्रम →
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td>MPPSC Mains Booklist</td>
                    <td>
                      <Link href="/mppsc-mains-books" className="text-primary">
                        अनुशंसित पुस्तकें →
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td>MPPSC Previous Year Papers (2014-2025)</td>
                    <td>
                      <Link href="/mppsc/previous-year-papers" className="text-primary">
                        PYQ डाउनलोड →
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td>MPPSC Toppers Answer Copies</td>
                    <td>
                      <Link href="/mppsc/toppers-copy" className="text-primary">
                        Toppers कॉपी देखें →
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td>Mains Answer Writing Program</td>
                    <td>
                      <Link
                        href="/mppsc-mains-answer-writing"
                        className="text-primary"
                      >
                        उत्तर लेखन कार्यक्रम →
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td>MPPSC Official Website</td>
                    <td>
                      <a
                        href="https://mppsc.mp.gov.in"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary"
                      >
                        mppsc.mp.gov.in →
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <blockquote>
              <p>
                <strong>अस्वीकरण (Disclaimer):</strong> यह पृष्ठ MPPSC राज्य सेवा
                परीक्षा 2026 की आधिकारिक परीक्षा योजना (दि. 05.01.2026) पर आधारित है।
                किसी भी स्पष्टीकरण हेतु{" "}
                <a
                  href="https://mppsc.mp.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  mppsc.mp.gov.in
                </a>{" "}
                देखें।
              </p>
            </blockquote>
          </div>
        </Container>
      </Section>

      {/* ─── FAQs ─────────────────────────────────────────────────── */}
      <Section>
        <Container size="narrow">
          <h2
            id="faq"
            className="mb-8 text-2xl font-bold text-foreground"
          >
            ❓ अक्सर पूछे जाने वाले प्रश्न (FAQs) — MPPSC Mains Syllabus
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

      {/* ─── JSON-LD Schema ────────────────────────────────────────── */}
      <JsonLd data={jsonLdGraph([breadcrumb, article, faqSchema])} />
    </>
  );
}
