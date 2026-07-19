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
  title: "NCERT E-Books (Class 6-12) | Aakar IAS",
  description: "Download free NCERT textbooks PDF for Class 6 to 12 in Hindi for UPSC and MPPSC exam preparation.",
  path: "/en/ncert-books",
});

export default async function EnglishNcertBooksPage() {
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

  const pageUrl = `${siteConfig.url}/en/ncert-books`;
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: `${siteConfig.url}/en` },
    { name: "NCERT E-Books", url: pageUrl },
  ]);

  const collectionPage = collectionPageJsonLd({
    name: "NCERT E-Books (Class 6-12) | Aakar IAS",
    description: "Download free NCERT textbooks PDF for Class 6 to 12 in Hindi for UPSC and MPPSC exam preparation.",
    url: pageUrl,
    inLanguage: "en-IN",
    items: books.map((b) => ({
      name: b.titleEn,
      url: b.fileUrl ?? "",
    })),
  });

  return (
    <>
      <Section className="pb-0 pt-8">
        <Container size="wide">
          <Breadcrumb items={[{ name: "NCERT E-Books", href: "/en/ncert-books" }]} />

          <div className="mt-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                <BookOpen className="h-3.5 w-3.5" /> NCERT Library
              </span>
              <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                NCERT E-Books <span className="text-primary">(Class 6–12)</span>
              </h1>
              <p className="mt-2 text-muted-foreground max-w-2xl">
                Free PDF downloads of all NCERT textbooks from Class 6 to 12, organized by class and subject — essential for UPSC, MPPSC and all competitive exam preparation.
              </p>
            </div>
            <Button variant="outline" size="sm" asChild className="rounded-full shrink-0">
              <Link href="/en/free-pdf">Free PDF Library <BookOpen className="ml-2 h-4 w-4" /></Link>
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
                  <GraduationCap className="h-3.5 w-3.5 text-muted-foreground/80 group-hover:text-primary" /> Class {cls}
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
                      Why Read NCERT Books for Competitive Exam Preparation?
                    </h2>
                    <p className="text-xs text-muted-foreground mt-0.5">Click to read significance and key features of NCERT</p>
                  </div>
                </div>
                <span className="h-8 w-8 flex items-center justify-center rounded-full bg-muted text-muted-foreground group-open:bg-primary/10 group-open:text-primary group-hover:text-primary transition-all">
                  <ChevronDown className="h-5 w-5 group-open:rotate-180 transition-transform duration-300" />
                </span>
              </summary>

              <div className="mt-6 border-t border-border/60 pt-5 text-sm leading-relaxed text-muted-foreground space-y-6">
                <p>
                  The preparation for competitive exams starts with choosing the right study material. Amidst various books available in the market, NCERT books are a reliable foundation from which every serious aspirant should begin their preparation. Whether you are preparing for <strong>MPPSC, UPSC</strong>, State Public Service Commissions (PSC/PCS), SSC, or other competitive exams, NCERT textbooks play a vital role in building a strong conceptual understanding of subjects.
                </p>

                <div>
                  <h3 className="font-extrabold text-foreground text-base mb-2">Why are NCERT Books Important?</h3>
                  <p>
                    The greatest feature of NCERT books is that subjects are presented in a simple, systematic, and factual manner. Through these books, aspirants can easily grasp the fundamental concepts (Basics) of any subject, which builds a solid foundation for advanced preparation.
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="bg-muted/30 p-4 rounded-xl border border-border/40">
                    <h4 className="font-bold text-foreground mb-3">Key Features of NCERT Books</h4>
                    <ul className="space-y-2">
                      {[
                        "Simple, natural, and clear language.",
                        "Systematic presentation of subject concepts.",
                        "Authentic and reliable facts and information.",
                        "Easy understanding through illustrations, maps, and examples.",
                        "Simple explanation of technical terminology.",
                        "Better conceptual clarity through practice questions.",
                        "Inclusion of foundational knowledge essential for exams."
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs">
                          <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-muted/30 p-4 rounded-xl border border-border/40">
                    <h4 className="font-bold text-foreground mb-3">Significance in MPPSC, UPSC & State PSC</h4>
                    <ul className="space-y-2">
                      {[
                        "Extremely useful for both Prelims and Mains exams.",
                        "Builds a strong foundation in History, Geography, Economy, Science, Environment, and Polity.",
                        "Many questions are asked directly or indirectly based on NCERT concepts.",
                        "Develops a clear, objective, and balanced perspective for Answer Writing.",
                        "Makes preparing short notes and quick revision easy.",
                        "Helps in understanding advanced standard reference books.",
                        "Helps in effective and structured preparation in limited time."
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
                  <h3 className="font-bold text-foreground text-sm mb-2">Who Should Read NCERT Books?</h3>
                  <div className="flex flex-wrap gap-2">
                    {["MPPSC", "UPSC Civil Services", "All State PSC/PCS", "SSC & Government Exams", "Teacher Eligibility Tests (TET)", "Foundational Preparation Beginners"].map((tag, idx) => (
                      <span key={idx} className="inline-flex items-center rounded-full bg-background px-3 py-1 text-xs font-semibold text-foreground border border-border shadow-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="font-medium text-foreground">
                  If you want to achieve success in competitive exams, starting with NCERT books is one of the best decisions. Strong concepts, authentic information, and simple language guide your preparation in the right direction and make understanding advanced books easier.
                </p>
                
                <p className="text-xs text-muted-foreground border-l-2 border-primary pl-3 italic">
                  Download the NCERT books available below for free to give a solid foundation to your MPPSC, UPSC, and other competitive exam preparation.
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
                        Class {cls} — NCERT Books
                      </h2>
                      <p className="text-xs text-muted-foreground">{groupedByClass[cls].length} books available</p>
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
                                {book.titleEn}
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
                                  title: book.titleEn,
                                  kind: "ncert",
                                  url: book.fileUrl,
                                  locale: "en",
                                }}
                              >
                                <Download className="h-3.5 w-3.5 mr-1.5 group-hover/btn:translate-y-0.5 transition-transform" /> Download PDF
                              </TrackedDownloadLink>
                            </Button>
                          ) : (
                            <span className="block text-center text-[10px] text-muted-foreground italic">Coming soon</span>
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
              <p className="text-lg font-semibold text-foreground">No NCERT books available yet</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Books from all classes will be added soon.
              </p>
            </div>
          )}
        </Container>
      </Section>
      <JsonLd data={jsonLdGraph([breadcrumb, collectionPage])} />
    </>
  );
}
