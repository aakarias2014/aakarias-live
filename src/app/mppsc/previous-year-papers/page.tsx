import type { Metadata } from "next";
import Link from "next/link";
import { getContentRepository } from "@/lib/content/content-repository";
import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumb } from "@/components/content/breadcrumb";
import { Button } from "@/components/ui/button";
import { FileText, Download, CheckCircle2, Sparkles, BookOpen, HelpCircle, ArrowRight, Trophy, Calendar, FilterX } from "lucide-react";
import { TrackedDownloadLink } from "@/components/content/tracked-download-link";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, faqJsonLd, jsonLdGraph } from "@/lib/seo/jsonld";
import { siteConfig } from "@/lib/site-config";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export const revalidate = 600;

export const metadata: Metadata = buildMetadata({
  title: "MPPSC Previous Year Papers PDF Download (2014-2025) | MPPSC Prelims & Mains Solved Papers | Aakar IAS",
  description: "MPPSC प्रारंभिक एवं मुख्य परीक्षा (2014-2025) के पिछले वर्षों के हल किए गए प्रश्न पत्र (Previous Year Question Papers) हिंदी व अंग्रेजी में उत्तर कुंजी (Answer Key) के साथ मुफ़्त PDF डाउनलोड करें।",
  path: "/mppsc/previous-year-papers",
  keywords: [
    "MPPSC Previous Year Papers",
    "MPPSC Previous Year Question Paper PDF",
    "MPPSC Prelims Question Paper with Answer Key",
    "MPPSC Mains Previous Year Papers Hindi PDF",
    "MPPSC Old Question Paper PDF Download",
    "MPPSC Solved Papers 2014 to 2025",
    "MPPSC PYQ PDF",
  ],
});

export default async function MppscPreviousYearPapersPage() {
  const repo = await getContentRepository();
  const pyqData = await repo.listPyqs({
    exam: "MPPSC",
    pageSize: 50,
  });

  const pageUrl = `${siteConfig.url}/mppsc/previous-year-papers`;

  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    { name: "MPPSC", url: `${siteConfig.url}/mppsc` },
    { name: "Previous Year Papers", url: pageUrl },
  ]);

  const faqs = [
    {
      q: "MPPSC प्रारंभिक परीक्षा (Prelims) के पिछले 10 वर्षों के प्रश्न पत्र कहां से डाउनलोड करें?",
      a: "आप आकार IAS (Aakar IAS) की इस आधिकारिक वेबसाइट से 2014 से 2025 तक के MPPSC Prelims GS Paper 1 और CSAT Paper 2 के प्रश्न पत्र उत्तर कुंजी (Official Answer Key) के साथ 1-क्लिक मुफ़्त PDF डाउनलोड कर सकते हैं।",
    },
    {
      q: "क्या MPPSC Mains के विषय-वार प्रश्न पत्र (GS 1 to GS 6) हिंदी माध्यम में उपलब्ध हैं?",
      a: "हाँ, आकार IAS पर MPPSC मुख्य परीक्षा के सभी 6 प्रश्न पत्रों (GS-1 इतिहास/भूगोल, GS-2 राजनीति/अर्थशास्त्र, GS-3 विज्ञान/तकनीक, GS-4 नीतिशास्त्र, Paper-5 सामान्य हिंदी, और Paper-6 हिंदी निबंध) की मूल PDF हिंदी एवं अंग्रेजी माध्यम में उपलब्ध है।",
    },
    {
      q: "MPPSC परीक्षा की तैयारी में Previous Year Question Papers (PYQs) का क्या महत्व है?",
      a: "MPPSC परीक्षा में लगभग 30% से 40% अवधारणाएं और प्रश्न सीधे पिछले वर्षों के पैटर्न पर आधारित होते हैं। PYQs हल करने से परीक्षा के पैटर्न, समय प्रबंधन, और महत्वपूर्ण टॉपिक्स का सटीक ज्ञान प्राप्त होता है।",
    },
    {
      q: "क्या MPPSC PYQ PDF में उत्तर कुंजी (Answer Key) शामिल है?",
      a: "जी हाँ, आकार IAS द्वारा प्रदान किए गए सभी MPPSC प्रारम्भिक परीक्षा प्रश्न पत्रों के साथ अद्यतन एवं संशोधित आधिकारिक मॉडल उत्तर कुंजी (Answer Key) संलग्न है।",
    },
  ];

  const faqSchema = faqJsonLd(faqs);

  // Pre-structured static list of 10-year papers for complete SEO rendering
  const prelimsYears = [
    { year: 2025, gsTitle: "MPPSC Prelims 2025 GS Paper-1", csatTitle: "MPPSC Prelims 2025 CSAT Paper-2", date: "2025" },
    { year: 2024, gsTitle: "MPPSC Prelims 2024 GS Paper-1", csatTitle: "MPPSC Prelims 2024 CSAT Paper-2", date: "2024" },
    { year: 2023, gsTitle: "MPPSC Prelims 2023 GS Paper-1", csatTitle: "MPPSC Prelims 2023 CSAT Paper-2", date: "2023" },
    { year: 2022, gsTitle: "MPPSC Prelims 2022 GS Paper-1", csatTitle: "MPPSC Prelims 2022 CSAT Paper-2", date: "2022" },
    { year: 2021, gsTitle: "MPPSC Prelims 2021 GS Paper-1", csatTitle: "MPPSC Prelims 2021 CSAT Paper-2", date: "2021" },
    { year: 2020, gsTitle: "MPPSC Prelims 2020 GS Paper-1", csatTitle: "MPPSC Prelims 2020 CSAT Paper-2", date: "2020" },
    { year: 2019, gsTitle: "MPPSC Prelims 2019 GS Paper-1", csatTitle: "MPPSC Prelims 2019 CSAT Paper-2", date: "2019" },
    { year: 2018, gsTitle: "MPPSC Prelims 2018 GS Paper-1", csatTitle: "MPPSC Prelims 2018 CSAT Paper-2", date: "2018" },
    { year: 2017, gsTitle: "MPPSC Prelims 2017 GS Paper-1", csatTitle: "MPPSC Prelims 2017 CSAT Paper-2", date: "2017" },
    { year: 2016, gsTitle: "MPPSC Prelims 2016 GS Paper-1", csatTitle: "MPPSC Prelims 2016 CSAT Paper-2", date: "2016" },
  ];

  const mainsPapers = [
    { code: "GS-1", title: "General Studies 1", topics: "इतिहास, संस्कृति एवं भूगोल (History & Geography)", icon: "🏛️" },
    { code: "GS-2", title: "General Studies 2", topics: "राजनीति, अर्थशास्त्र एवं समाजशास्त्र (Polity & Economics)", icon: "⚖️" },
    { code: "GS-3", title: "General Studies 3", topics: "विज्ञान, प्रौद्योगिकी व गणित (Science & Technology)", icon: "🔬" },
    { code: "GS-4", title: "General Studies 4", topics: "दर्शनशास्त्र, मनोविज्ञान एवं नीतिशास्त्र (Ethics & Philosophy)", icon: "💡" },
    { code: "Paper-5", title: "Paper 5", topics: "सामान्य हिंदी एवं व्याकरण (General Hindi & Grammar)", icon: "📝" },
    { code: "Paper-6", title: "Paper 6", topics: "हिंदी निबंध एवं प्रारूप लेखन (Hindi Essay & Draft Writing)", icon: "✒️" },
  ];

  const subjectWeightage = [
    { subject: "मध्य प्रदेश सामान्य ज्ञान (MP GK)", avgQs: "30 - 35 प्रश्न", importance: "सर्वोच्च (Highest)" },
    { subject: "भारत का इतिहास व संस्कृति", avgQs: "12 - 15 प्रश्न", importance: "उच्च (High)" },
    { subject: "भारत व विश्व का भूगोल", avgQs: "10 - 12 प्रश्न", importance: "उच्च (High)" },
    { subject: "भारतीय राजव्यवस्था व संविधान", avgQs: "10 - 12 प्रश्न", importance: "उच्च (High)" },
    { subject: "भारतीय अर्थव्यवस्था व सामाजिक विकास", avgQs: "6 - 8 प्रश्न", importance: "मध्यम (Medium)" },
    { subject: "विज्ञान, पर्यावरण व आईटी", avgQs: "10 - 12 प्रश्न", importance: "उच्च (High)" },
    { subject: "राष्ट्रीय व अंतरराष्ट्रीय समसामयिकी (Current Affairs)", avgQs: "12 - 15 प्रश्न", importance: "सर्वोच्च (Highest)" },
  ];

  return (
    <>
      <JsonLd data={jsonLdGraph([breadcrumb, faqSchema])} />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-secondary text-secondary-foreground">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--primary)_0%,_transparent_50%)] opacity-20" />
        <Container size="wide" className="relative py-16 sm:py-20">
          <div className="max-w-4xl space-y-4">
            <span className="inline-block rounded-full bg-primary/15 px-4 py-1 text-xs font-extrabold uppercase tracking-wider text-primary">
              MPPSC Previous Year Papers (2014-2025)
            </span>
            <h1 className="text-balance text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              MPPSC Previous Year Papers PDF Download (2014 - 2025)
            </h1>
            <p className="text-pretty text-base sm:text-lg text-white/80 leading-relaxed max-w-3xl">
              मध्य प्रदेश लोक सेवा आयोग (MPPSC Prelims & Mains) के पिछले 10 से अधिक वर्षों के हल प्रश्न पत्र (Solved Papers) एवं आधिकारिक उत्तर कुंजी (Answer Key) मुफ़्त PDF में डाउनलोड करें।
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button asChild size="lg" className="rounded-xl font-bold">
                <a href="#prelims-section">प्रारंभिक परीक्षा पेपर देखें <ArrowRight className="ml-2 h-4 w-4" /></a>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-xl border-white/20 text-white bg-transparent hover:bg-white/10 hover:text-white font-bold">
                <a href="#mains-section">मुख्य परीक्षा (Mains) पेपर्स</a>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <Section className="pb-0 pt-8">
        <Container size="wide">
          <Breadcrumb items={[{ name: "MPPSC", href: "/mppsc" }, { name: "Previous Year Papers" }]} />
        </Container>
      </Section>

      {/* Overview Highlights */}
      <Section className="py-12">
        <Container size="wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-card border border-border/80 rounded-2xl p-5 text-center shadow-soft">
              <span className="text-2xl font-black text-primary">10+ Years</span>
              <p className="text-xs text-muted-foreground mt-1 font-medium">2014 से 2025 प्रश्न पत्र</p>
            </div>
            <div className="bg-card border border-border/80 rounded-2xl p-5 text-center shadow-soft">
              <span className="text-2xl font-black text-primary">100% Free</span>
              <p className="text-xs text-muted-foreground mt-1 font-medium">1-Click PDF डाउनलोड</p>
            </div>
            <div className="bg-card border border-border/80 rounded-2xl p-5 text-center shadow-soft">
              <span className="text-2xl font-black text-primary">Official Keys</span>
              <p className="text-xs text-muted-foreground mt-1 font-medium">संशोधित उत्तर कुंजी</p>
            </div>
            <div className="bg-card border border-border/80 rounded-2xl p-5 text-center shadow-soft">
              <span className="text-2xl font-black text-primary">Hindi & English</span>
              <p className="text-xs text-muted-foreground mt-1 font-medium">द्विभाषी अध्ययन सामग्री</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Prelims Papers Table Section */}
      <Section id="prelims-section" className="py-12 bg-muted/20">
        <Container size="wide">
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                  MPPSC Prelims Previous Year Papers (2014 - 2025)
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  सामान्य अध्ययन (GS Paper 1) एवं CSAT (Paper 2) उत्तर कुंजी सहित PDF डाउनलोड
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {prelimsYears.map((item) => {
                // Check if we have matching uploaded PYQ in pyqData
                const matchedGs = pyqData.items.find(p => p.year === item.year && p.paper?.includes("GS") || p.title?.includes(String(item.year)));
                return (
                  <div key={item.year} className="bg-card border border-border/80 rounded-2xl p-5 shadow-soft hover:shadow-soft-md transition-all flex flex-col justify-between space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-black text-sm">
                          {item.year}
                        </div>
                        <div>
                          <h3 className="font-bold text-foreground text-base">MPPSC Prelims {item.year}</h3>
                          <p className="text-xs text-muted-foreground">General Studies & CSAT Papers</p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                        Solved + Key
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border/60">
                      {matchedGs?.fileUrl ? (
                        <TrackedDownloadLink
                          input={{
                            slug: matchedGs.id,
                            title: `MPPSC Prelims ${item.year} GS Paper 1`,
                            kind: "pyq",
                            url: matchedGs.fileUrl,
                          }}
                          className="w-full"
                        >
                          <Button size="sm" variant="outline" className="w-full text-xs font-bold gap-1 rounded-xl">
                            <Download className="h-3.5 w-3.5" /> GS Paper 1 PDF
                          </Button>
                        </TrackedDownloadLink>
                      ) : (
                        <Button size="sm" variant="outline" className="w-full text-xs font-bold gap-1 rounded-xl" asChild>
                          <Link href="/free-pdf">
                            <Download className="h-3.5 w-3.5" /> GS Paper 1
                          </Link>
                        </Button>
                      )}

                      <Button size="sm" variant="outline" className="w-full text-xs font-bold gap-1 rounded-xl" asChild>
                        <Link href="/free-pdf">
                          <Download className="h-3.5 w-3.5" /> CSAT Paper 2
                        </Link>
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </Section>

      {/* Mains Papers Section */}
      <Section id="mains-section" className="py-12">
        <Container size="wide">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                MPPSC Mains Previous Year Papers (GS Paper 1 to 6)
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                मुख्य परीक्षा के सभी 6 प्रश्न पत्रों की मूल PDF व मॉडल उत्तर विश्लेषण
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mainsPapers.map((mains) => (
                <div key={mains.code} className="bg-card border border-border/80 rounded-2xl p-6 shadow-soft space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{mains.icon}</span>
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-primary/10 text-primary">
                        {mains.code}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-foreground">{mains.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {mains.topics}
                    </p>
                  </div>

                  <Button variant="outline" size="sm" className="w-full rounded-xl font-bold text-xs" asChild>
                    <Link href="/pyq?exam=MPPSC">
                      <Download className="mr-1.5 h-3.5 w-3.5" /> डाउनलोड Mains {mains.code} PDF
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Subject Weightage & Exam Trend Section */}
      <Section className="py-12 bg-muted/20">
        <Container size="wide">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                MPPSC Prelims परीक्षा ट्रेंड व विषय-वार वेटेज (Trend Analysis)
              </h2>
              <p className="text-sm text-muted-foreground">
                पिछले 5 वर्षों के प्रश्न पत्रों का विश्लेषण — जानें किस विषय से पूछे जाते हैं सर्वाधिक प्रश्न
              </p>
            </div>

            <div className="bg-card border border-border/80 rounded-2xl p-6 shadow-soft overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border/80 text-muted-foreground text-xs uppercase tracking-wider">
                    <th className="py-3 px-4">विषय (Subject)</th>
                    <th className="py-3 px-4">औसत प्रश्न (Avg. Questions)</th>
                    <th className="py-3 px-4">महत्व (Priority)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {subjectWeightage.map((row, i) => (
                    <tr key={i} className="hover:bg-muted/40 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-foreground">{row.subject}</td>
                      <td className="py-3.5 px-4 font-semibold text-primary">{row.avgQs}</td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-extrabold ${row.importance.includes("Highest") ? "bg-red-500/10 text-red-600 border border-red-500/20" : "bg-primary/10 text-primary"}`}>
                          {row.importance}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Container>
      </Section>

      {/* Uploaded PYQs Feed from Database */}
      {pyqData.items.length > 0 && (
        <Section title="अद्यतन MPPSC प्रश्न पत्र (Uploaded PYQ Compilations)" description="हाल ही में जोड़े गए MPPSC हल प्रश्न पत्र व टेस्ट।">
          <Container size="wide">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {pyqData.items.map((item) => (
                <div key={item.id} className="bg-card border border-border/80 rounded-2xl p-5 shadow-soft flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
                      {item.exam} {item.year ? `(${item.year})` : ""}
                    </span>
                    <h3 className="font-bold text-foreground text-base mt-2">{item.title}</h3>
                    {item.subject && <p className="text-xs text-muted-foreground mt-1">विषय: {item.subject}</p>}
                  </div>
                  {item.fileUrl && (
                    <TrackedDownloadLink
                      input={{
                        slug: item.id,
                        title: item.title,
                        kind: "pyq",
                        url: item.fileUrl,
                      }}
                      className="w-full"
                    >
                      <Button size="sm" variant="outline" className="w-full text-xs font-bold gap-1 rounded-xl">
                        <Download className="h-3.5 w-3.5" /> PDF डाउनलोड करें
                      </Button>
                    </TrackedDownloadLink>
                  )}
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* FAQs Section */}
      <Section className="py-12">
        <Container size="narrow">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-extrabold text-foreground">
                MPPSC Previous Year Papers (FAQs)
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
