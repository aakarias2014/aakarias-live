import type { Metadata } from "next";
import Link from "next/link";
import { getContentRepository } from "@/lib/content/content-repository";
import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumb } from "@/components/content/breadcrumb";
import { Button } from "@/components/ui/button";
import { BookOpen, Download, GraduationCap, ChevronDown, CheckCircle2 } from "lucide-react";
import { TrackedDownloadLink } from "@/components/content/tracked-download-link";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, collectionPageJsonLd, jsonLdGraph } from "@/lib/seo/jsonld";
import { siteConfig } from "@/lib/site-config";

export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: "NCERT ई-बुक्स (कक्षा 6-12) | Aakar IAS",
  description: "UPSC और MPPSC की तैयारी के लिए NCERT की कक्षा 6 से 12 तक की सभी पुस्तकें हिंदी में मुफ्त पीडीएफ डाउनलोड करें।",
  path: "/ncert-books",
});

export default async function NcertBooksPage() {
  const repo = await getContentRepository();
  const books = await repo.listNcertBooks();

  // Group by class number (desc)
  const groupedByClass: Record<number, typeof books> = {};
  books.forEach((book) => {
    if (!groupedByClass[book.classNumber]) {
      groupedByClass[book.classNumber] = [];
    }
    groupedByClass[book.classNumber].push(book);
  });
  const sortedClasses = Object.keys(groupedByClass)
    .map(Number)
    .sort((a, b) => b - a);

  const pageUrl = `${siteConfig.url}/ncert-books`;
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    { name: "NCERT E-Books", url: pageUrl },
  ]);

  const collectionPage = collectionPageJsonLd({
    name: "NCERT ई-बुक्स (कक्षा 6-12) | Aakar IAS",
    description: "UPSC और MPPSC की तैयारी के लिए NCERT की कक्षा 6 से 12 तक की सभी पुस्तकें हिंदी में मुफ्त पीडीएफ डाउनलोड करें।",
    url: pageUrl,
    inLanguage: "hi-IN",
    items: books.map((b) => ({
      name: b.title,
      url: b.fileUrl ?? "",
    })),
  });

  return (
    <>
      <Section className="pb-0 pt-8">
        <Container size="wide">
          <Breadcrumb items={[{ name: "NCERT E-Books", href: "/ncert-books" }]} />

          <div className="mt-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                <BookOpen className="h-3.5 w-3.5" /> NCERT Library
              </span>
              <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                NCERT ई-बुक्स <span className="text-primary">(कक्षा 6–12)</span>
              </h1>
              <p className="mt-2 text-muted-foreground max-w-2xl">
                UPSC, MPPSC और सभी प्रतियोगी परीक्षाओं की तैयारी के लिए NCERT की कक्षा 6 से 12 तक की सभी पुस्तकें — विषयवार, हिंदी में, मुफ्त PDF डाउनलोड।
              </p>
            </div>
            <Button variant="outline" size="sm" asChild className="rounded-full shrink-0">
              <Link href="/free-pdf">फ्री पीडीएफ लाइब्रेरी <BookOpen className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>

          {/* Quick jump class pills */}
          {sortedClasses.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {sortedClasses.map((cls) => (
                <a
                  key={cls}
                  href={`#class-${cls}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold text-muted-foreground hover:text-primary hover:border-primary/60 hover:bg-primary/5 shadow-sm transition-all duration-200"
                >
                  <GraduationCap className="h-3.5 w-3.5 text-muted-foreground/80 group-hover:text-primary" /> कक्षा {cls}
                </a>
              ))}
            </div>
          )}

          {/* NCERT Guide Guide Accordion */}
          <div className="mt-8">
            <details className="group border border-border/70 bg-card rounded-2xl p-5 md:p-6 transition-all duration-300 [&_summary::-webkit-details-marker]:hidden shadow-soft">
              <summary className="flex items-center justify-between cursor-pointer focus:outline-none list-none">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="font-extrabold text-foreground text-base sm:text-lg leading-snug group-hover:text-primary transition-colors">
                      प्रतियोगी परीक्षाओं की तैयारी में NCERT पुस्तकें क्यों पढ़ें?
                    </h2>
                    <p className="text-xs text-muted-foreground mt-0.5">NCERT का महत्व एवं विशेषताएं जानने के लिए क्लिक करें</p>
                  </div>
                </div>
                <span className="h-8 w-8 flex items-center justify-center rounded-full bg-muted text-muted-foreground group-open:bg-primary/10 group-open:text-primary group-hover:text-primary transition-all">
                  <ChevronDown className="h-5 w-5 group-open:rotate-180 transition-transform duration-300" />
                </span>
              </summary>

              <div className="mt-6 border-t border-border/60 pt-5 text-sm leading-relaxed text-muted-foreground space-y-6">
                <p>
                  प्रतियोगी परीक्षाओं की तैयारी की शुरुआत सही अध्ययन सामग्री के चयन से होती है। बाज़ार में उपलब्ध अनेक पुस्तकों के बीच NCERT पुस्तकें एक ऐसी विश्वसनीय आधारशिला हैं, जिनसे प्रत्येक गंभीर अभ्यर्थी को अपनी तैयारी शुरू करनी चाहिए। चाहे आप <strong>MPPSC, UPSC</strong>, राज्य लोक सेवा आयोग (PSC/PCS), SSC या अन्य प्रतियोगी परीक्षाओं की तैयारी कर रहे हों, NCERT की पुस्तकें विषयों की मजबूत समझ विकसित करने में महत्वपूर्ण भूमिका निभाती हैं।
                </p>

                <div>
                  <h3 className="font-extrabold text-foreground text-base mb-2">NCERT पुस्तकें क्यों महत्वपूर्ण हैं?</h3>
                  <p>
                    NCERT पुस्तकों की सबसे बड़ी विशेषता यह है कि इनमें विषयों को सरल, क्रमबद्ध और तथ्यात्मक रूप से प्रस्तुत किया गया है। इन पुस्तकों के माध्यम से अभ्यर्थी किसी भी विषय की मूलभूत अवधारणाओं (Basics) को आसानी से समझ सकते हैं, जो आगे की उन्नत (Advanced) तैयारी के लिए मजबूत आधार तैयार करती हैं।
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="bg-muted/30 p-4 rounded-xl border border-border/40">
                    <h4 className="font-bold text-foreground mb-3">NCERT पुस्तकों की प्रमुख विशेषताएँ</h4>
                    <ul className="space-y-2">
                      {[
                        "सरल, सहज एवं स्पष्ट भाषा।",
                        "विषयों की अवधारणाओं का क्रमबद्ध प्रस्तुतीकरण।",
                        "प्रमाणिक एवं विश्वसनीय तथ्य और जानकारी।",
                        "चित्र, मानचित्र एवं उदाहरणों के माध्यम से आसान समझ।",
                        "तकनीकी शब्दों का सरल व्याख्यान।",
                        "अभ्यास प्रश्नों के माध्यम से विषय की बेहतर समझ।",
                        "परीक्षा की दृष्टि से आवश्यक मूलभूत ज्ञान का समावेश。"
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs">
                          <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-muted/30 p-4 rounded-xl border border-border/40">
                    <h4 className="font-bold text-foreground mb-3">MPPSC, UPSC एवं अन्य PSC परीक्षाओं में महत्व</h4>
                    <ul className="space-y-2">
                      {[
                        "प्रारंभिक (Prelims) एवं मुख्य परीक्षा (Mains) दोनों के लिए उपयोगी।",
                        "इतिहास, भूगोल, अर्थव्यवस्था, विज्ञान, पर्यावरण एवं राजनीति की मजबूत नींव।",
                        "कई प्रश्न सीधे या अप्रत्यक्ष रूप से NCERT की अवधारणाओं पर आधारित होते हैं।",
                        "उत्तर लेखन (Answer Writing) के लिए स्पष्ट एवं संतुलित दृष्टिकोण।",
                        "शॉर्ट नोट्स एवं त्वरित पुनरावृत्ति (Revision) तैयार करना आसान।",
                        "मानक संदर्भ पुस्तकों को समझने में सहायता करती हैं।",
                        "सीमित समय में प्रभावी एवं व्यवस्थित तैयारी करने में मदद।"
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs">
                          <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-primary/5 p-4 rounded-xl border border-primary/10">
                  <h3 className="font-bold text-foreground text-sm mb-2">किन अभ्यर्थियों को NCERT अवश्य पढ़नी चाहिए?</h3>
                  <div className="flex flex-wrap gap-2">
                    {["MPPSC", "UPSC Civil Services", "सभी राज्य लोक सेवा आयोग (PSC/PCS)", "SSC एवं अन्य सरकारी प्रतियोगी परीक्षाएँ", "शिक्षक पात्रता परीक्षाएँ (TET)", "प्रतियोगी परीक्षाओं की प्रारंभिक तैयारी करने वाले विद्यार्थी"].map((tag, idx) => (
                      <span key={idx} className="inline-flex items-center rounded-full bg-background px-3 py-1 text-xs font-semibold text-foreground border border-border shadow-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="font-medium text-foreground">
                  यदि आप प्रतियोगी परीक्षा में सफलता प्राप्त करना चाहते हैं, तो NCERT पुस्तकों से शुरुआत करना सबसे सही निर्णयों में से एक है। मजबूत अवधारणाएँ, प्रमाणिक जानकारी और सरल भाषा आपकी तैयारी को सही दिशा देती हैं तथा आगे की उन्नत पुस्तकों को समझना भी आसान बनाती हैं।
                </p>
                
                <p className="text-xs text-muted-foreground border-l-2 border-primary pl-3 italic">
                  नीचे उपलब्ध NCERT पुस्तकों को निःशुल्क डाउनलोड करें और MPPSC, UPSC एवं अन्य प्रतियोगी परीक्षाओं की अपनी तैयारी को एक मजबूत आधार प्रदान करें।
                </p>
              </div>
            </details>
          </div>
        </Container>
      </Section>

      {/* Books by Class */}
      <Section className="pt-8">
        <Container size="wide">
          {sortedClasses.length > 0 ? (
            <div className="space-y-12">
              {sortedClasses.map((cls) => (
                <div key={cls} id={`class-${cls}`} className="scroll-mt-24">
                  {/* Class Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary font-extrabold text-sm shadow-sm border border-primary/20">
                      {cls}
                    </div>
                    <div>
                      <h2 className="text-xl font-extrabold text-foreground sm:text-2xl">
                        कक्षा {cls} — NCERT पुस्तकें
                      </h2>
                      <p className="text-xs text-muted-foreground">{groupedByClass[cls].length} पुस्तकें उपलब्ध</p>
                    </div>
                  </div>

                  {/* Book Grid */}
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {groupedByClass[cls].map((book) => (
                      <div
                        key={book.id}
                        className="group relative flex flex-col justify-between rounded-2xl border border-border/60 hover:border-primary/30 bg-card p-5 shadow-soft hover:shadow-md transition-all duration-300"
                      >
                        <div>
                          <div className="flex items-start gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary text-xs font-bold shadow-sm group-hover:scale-105 transition-transform duration-300">
                              <BookOpen className="h-4.5 w-4.5" />
                            </div>
                            <div className="min-w-0">
                              <h3 className="font-bold text-foreground text-sm leading-snug group-hover:text-primary transition-colors duration-300 line-clamp-3">
                                {book.title}
                              </h3>
                              <div className="mt-1.5 flex flex-wrap gap-1.5">
                                <span className="inline-flex items-center rounded-full bg-secondary/10 px-2 py-0.5 text-[10px] font-semibold text-secondary dark:text-white">
                                  {book.subject}
                                </span>
                                {book.part && (
                                  <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                                    {book.part}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4">
                          {book.fileUrl ? (
                            <Button variant="outline" size="sm" className="w-full rounded-full text-xs hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 group/btn" asChild>
                              <TrackedDownloadLink
                                input={{
                                  slug: book.id,
                                  title: book.title,
                                  kind: "ncert",
                                  url: book.fileUrl,
                                  locale: "hi",
                                }}
                              >
                                <Download className="h-3.5 w-3.5 mr-1.5 group-hover/btn:translate-y-0.5 transition-transform" /> PDF डाउनलोड करें
                              </TrackedDownloadLink>
                            </Button>
                          ) : (
                            <span className="block text-center text-[10px] text-muted-foreground italic">जल्द उपलब्ध होगी</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center rounded-3xl border border-dashed border-border p-8 bg-card shadow-soft">
              <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg font-semibold text-foreground">अभी कोई NCERT पुस्तक उपलब्ध नहीं है</p>
              <p className="mt-2 text-sm text-muted-foreground">
                जल्द ही सभी कक्षाओं की पुस्तकें जोड़ी जाएंगी।
              </p>
            </div>
          )}
        </Container>
      </Section>
      <JsonLd data={jsonLdGraph([breadcrumb, collectionPage])} />
    </>
  );
}
