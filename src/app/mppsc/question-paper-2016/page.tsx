import type { Metadata } from "next";
import Link from "next/link";
import { getContentRepository } from "@/lib/content/content-repository";
import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumb } from "@/components/content/breadcrumb";
import { Button } from "@/components/ui/button";
import { FileText, Download, CheckCircle2, Sparkles, BookOpen, HelpCircle, ArrowRight, Trophy, Calendar, Award } from "lucide-react";
import { TrackedDownloadLink } from "@/components/content/tracked-download-link";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, faqJsonLd, jsonLdGraph } from "@/lib/seo/jsonld";
import { siteConfig } from "@/lib/site-config";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: "MPPSC Question Paper 2016 PDF Download with Answer Key (Prelims & Mains Solved Paper) | Aakar IAS",
  description: "MPPSC प्रारंभिक परीक्षा 2016 (GS Paper 1 & CSAT) एवं मुख्य परीक्षा (Mains GS 1-6) का प्रश्न पत्र उत्तर कुंजी (Answer Key) और कट ऑफ अंक विश्लेषण सहित मुफ़्त PDF डाउनलोड करें।",
  path: "/mppsc/question-paper-2016",
  keywords: [
    "mppsc question paper 2016",
    "mppsc 2016 question paper",
    "mppsc prelims 2016 paper with answer key pdf",
    "mppsc mains 2016 question paper solved pdf",
    "mppsc 2016 paper download in hindi",
    "mppsc 2016 cut off marks",
  ],
});

export default async function MppscQuestionPaper2016Page() {
  const repo = await getContentRepository();
  const pyqData = await repo.listPyqs({
    exam: "MPPSC",
    year: 2016,
    pageSize: 20,
  });

  const pageUrl = `${siteConfig.url}/mppsc/question-paper-2016`;

  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    { name: "MPPSC", url: `${siteConfig.url}/mppsc` },
    { name: "Previous Year Papers", url: `${siteConfig.url}/mppsc/previous-year-papers` },
    { name: "MPPSC Question Paper 2016", url: pageUrl },
  ]);

  const faqs = [
    {
      q: "MPPSC 2016 प्रारंभिक परीक्षा (Prelims) का प्रश्न पत्र उत्तर कुंजी (Answer Key) के साथ कैसे डाउनलोड करें?",
      a: "आप आकार IAS (Aakar IAS) की इस वेबसाइट से MPPSC Prelims 2016 GS Paper 1 और CSAT Paper 2 के प्रश्न पत्र आधिकारिक उत्तर कुंजी (Official Answer Key) के साथ मुफ़्त PDF में डाउनलोड कर सकते हैं।",
    },
    {
      q: "MPPSC 2016 प्रारंभिक परीक्षा की आधिकारिक कट-ऑफ (Cut-off Marks) क्या थी?",
      a: "MPPSC 2016 प्रारम्भिक परीक्षा में अनारक्षित (General Male) श्रेणी का कट-ऑफ 162 अंक (81 प्रश्न) और अनारक्षित महिला (General Female) श्रेणी का कट-ऑफ 156 अंक (78 प्रश्न) रहा था।",
    },
    {
      q: "क्या MPPSC Mains 2016 के सभी 6 प्रश्न पत्र (GS 1 to GS 6) हिंदी में उपलब्ध हैं?",
      a: "जी हाँ, आकार IAS पर MPPSC मुख्य परीक्षा 2016 के सभी 6 प्रश्न पत्रों (GS-1 इतिहास/भूगोल, GS-2 राजनीति/अर्थशास्त्र, GS-3 विज्ञान, GS-4 नीतिशास्त्र, Paper-5 सामान्य हिंदी और Paper-6 निबंध) की मूल PDF उपलब्ध है।",
    },
  ];

  const faqSchema = faqJsonLd(faqs);

  const cutOff2016 = [
    { category: "अनारक्षित (General / UR)", male: "162 अंक (81 प्रश्न)", female: "156 अंक (78 प्रश्न)" },
    { category: "अन्य पिछड़ा वर्ग (OBC)", male: "158 अंक (79 प्रश्न)", female: "152 अंक (76 प्रश्न)" },
    { category: "अनुसूचित जाति (SC)", male: "148 अंक (74 प्रश्न)", female: "142 अंक (71 प्रश्न)" },
    { category: "अनुसूचित जनजाति (ST)", male: "136 अंक (68 प्रश्न)", female: "132 अंक (66 प्रश्न)" },
  ];

  const mains2016Papers = [
    { code: "GS-1", title: "General Studies 1", topics: "इतिहास, भारतीय संस्कृति एवं भूगोल (History & Geography)", icon: "🏛️" },
    { code: "GS-2", title: "General Studies 2", topics: "संविधान, राजनीति, अर्थशास्त्र व समाजशास्त्र (Polity & Economics)", icon: "⚖️" },
    { code: "GS-3", title: "General Studies 3", topics: "विज्ञान, प्रौद्योगिकी, पर्यावरण व गणित (Science & Tech)", icon: "🔬" },
    { code: "GS-4", title: "General Studies 4", topics: "दर्शनशास्त्र, मनोविज्ञान एवं नीतिशास्त्र (Ethics & Philosophy)", icon: "💡" },
    { code: "Paper-5", title: "Paper 5", topics: "सामान्य हिंदी एवं व्याकरण (General Hindi & Grammar)", icon: "📝" },
    { code: "Paper-6", title: "Paper 6", topics: "हिंदी निबंध लेखन एवं प्रारूप लेखन (Essay & Draft Writing)", icon: "✒️" },
  ];

  // Match uploaded 2016 files from pyqData
  const matchedGs2016 = pyqData.items.find(p => p.year === 2016 && (p.paper?.includes("GS") || p.title?.includes("2016")));

  return (
    <>
      <JsonLd data={jsonLdGraph([breadcrumb, faqSchema])} />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-secondary text-secondary-foreground">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--primary)_0%,_transparent_50%)] opacity-20" />
        <Container size="wide" className="relative py-16 sm:py-20">
          <div className="max-w-4xl space-y-4">
            <span className="inline-block rounded-full bg-primary/15 px-4 py-1 text-xs font-extrabold uppercase tracking-wider text-primary">
              MPPSC 2016 Solved Paper & Answer Key
            </span>
            <h1 className="text-balance text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              MPPSC Question Paper 2016 PDF Download with Answer Key
            </h1>
            <p className="text-pretty text-base sm:text-lg text-white/80 leading-relaxed max-w-3xl">
              MPPSC राज्य सेवा परीक्षा 2016 प्रारंभिक (GS Paper 1 & CSAT Paper 2) एवं मुख्य परीक्षा (Mains GS 1-6) के हल किए गए प्रश्न पत्र और आधिकारिक उत्तर कुंजी मुफ़्त PDF डाउनलोड करें।
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button asChild size="lg" className="rounded-xl font-bold">
                <a href="#prelims-2016">2016 प्रारंभिक पेपर डाउनलोड करें <ArrowRight className="ml-2 h-4 w-4" /></a>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-xl border-white/20 text-white bg-transparent hover:bg-white/10 hover:text-white font-bold">
                <a href="#mains-2016">2016 मुख्य परीक्षा (Mains) पेपर्स</a>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <Section className="pb-0 pt-8">
        <Container size="wide">
          <Breadcrumb items={[{ name: "MPPSC", href: "/mppsc" }, { name: "Previous Year Papers", href: "/mppsc/previous-year-papers" }, { name: "MPPSC 2016 Paper" }]} />
        </Container>
      </Section>

      {/* Prelims 2016 Download Section */}
      <Section id="prelims-2016" className="py-12">
        <Container size="wide">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                  MPPSC Prelims 2016 Question Papers & Answer Key
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  सामान्य अध्ययन (GS Paper 1) और CSAT (Paper 2) की मूल PDF व आधिकारिक उत्तर कुंजी
                </p>
              </div>
              <span className="hidden sm:inline-block text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                Verified Official Key
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* GS Paper 1 */}
              <div className="bg-card border border-border/80 rounded-2xl p-6 shadow-soft space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-primary/10 text-primary">
                      Prelims 2016 - GS 1
                    </span>
                    <span className="text-xs font-semibold text-emerald-600">100 Questions (200 Marks)</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground">MPPSC Prelims 2016 GS Paper 1</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    मध्य प्रदेश सामान्य ज्ञान, इतिहास, भूगोल, राजव्यवस्था, विज्ञान व समसामयिकी के 100 बहुविकल्पीय प्रश्न।
                  </p>
                </div>

                {matchedGs2016?.fileUrl ? (
                  <TrackedDownloadLink
                    input={{
                      slug: matchedGs2016.id,
                      title: "MPPSC Prelims 2016 GS Paper 1 PDF",
                      kind: "pyq",
                      url: matchedGs2016.fileUrl,
                    }}
                    className="w-full"
                  >
                    <Button size="lg" className="w-full rounded-xl font-bold text-sm">
                      <Download className="mr-2 h-4 w-4" /> GS Paper 1 PDF + Answer Key डाउनलोड करें
                    </Button>
                  </TrackedDownloadLink>
                ) : (
                  <Button size="lg" className="w-full rounded-xl font-bold text-sm" asChild>
                    <Link href="/free-pdf">
                      <Download className="mr-2 h-4 w-4" /> GS Paper 1 PDF + Answer Key
                    </Link>
                  </Button>
                )}
              </div>

              {/* CSAT Paper 2 */}
              <div className="bg-card border border-border/80 rounded-2xl p-6 shadow-soft space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-primary/10 text-primary">
                      Prelims 2016 - CSAT 2
                    </span>
                    <span className="text-xs font-semibold text-emerald-600">100 Questions (200 Marks)</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground">MPPSC Prelims 2016 CSAT Paper 2</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    मैथ्स, रीजनिंग, एप्टीट्यूड, बोधगम्यता (Comprehension) और डिसीजन मेकिंग।
                  </p>
                </div>

                <Button size="lg" className="w-full rounded-xl font-bold text-sm" asChild>
                  <Link href="/free-pdf">
                    <Download className="mr-2 h-4 w-4" /> CSAT Paper 2 PDF + Answer Key
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* MPPSC 2016 Mains Solved Papers */}
      <Section id="mains-2016" className="py-12 bg-muted/20">
        <Container size="wide">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                MPPSC Mains 2016 Question Papers (GS 1 to 6)
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                मुख्य परीक्षा 2016 के सभी 6 प्रश्न पत्रों के मूल पेपर व मॉडल उत्तर हल
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mains2016Papers.map((paper) => (
                <div key={paper.code} className="bg-card border border-border/80 rounded-2xl p-6 shadow-soft space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{paper.icon}</span>
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-primary/10 text-primary">
                        {paper.code}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-foreground">MPPSC 2016 {paper.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{paper.topics}</p>
                  </div>

                  <Button variant="outline" size="sm" className="w-full rounded-xl font-bold text-xs" asChild>
                    <Link href="/pyq?exam=MPPSC&year=2016">
                      <Download className="mr-1.5 h-3.5 w-3.5" /> डाउनलोड {paper.code} 2016 PDF
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* MPPSC 2016 Cut-Off Marks Analysis */}
      <Section className="py-12">
        <Container size="wide">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                MPPSC 2016 Prelims Official Cut-Off Marks (कट-ऑफ अंक तालिका)
              </h2>
              <p className="text-sm text-muted-foreground">
                200 अंकों में से श्रेणी-वार न्यूनतम अर्हकारी (Category-Wise Cut-Off Marks) अंक
              </p>
            </div>

            <div className="bg-card border border-border/80 rounded-2xl p-6 shadow-soft overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border/80 text-muted-foreground text-xs uppercase tracking-wider">
                    <th className="py-3 px-4">श्रेणी (Category)</th>
                    <th className="py-3 px-4">पुरुष कट-ऑफ (Male Cut-Off)</th>
                    <th className="py-3 px-4">महिला कट-ऑफ (Female Cut-Off)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {cutOff2016.map((row, i) => (
                    <tr key={i} className="hover:bg-muted/40 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-foreground">{row.category}</td>
                      <td className="py-3.5 px-4 font-semibold text-primary">{row.male}</td>
                      <td className="py-3.5 px-4 font-semibold text-emerald-600">{row.female}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQs Section */}
      <Section className="py-12 bg-muted/20">
        <Container size="narrow">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-extrabold text-foreground">
                MPPSC 2016 Question Paper (FAQs)
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
