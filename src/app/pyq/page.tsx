import type { Metadata } from "next";
import Link from "next/link";
import { getContentRepository } from "@/lib/content/content-repository";
import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumb } from "@/components/content/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Download, Search, FilterX, Calendar } from "lucide-react";
import { TrackedDownloadLink } from "@/components/content/tracked-download-link";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, collectionPageJsonLd, jsonLdGraph } from "@/lib/seo/jsonld";
import { siteConfig } from "@/lib/site-config";

export const revalidate = 600;

export const metadata: Metadata = buildMetadata({
  title: "पिछले वर्षों के प्रश्न पत्र (PYQs) | Aakar IAS",
  description: "UPSC CSE और MPPSC परीक्षाओं के पिछले वर्षों के हल किए गए प्रश्न पत्र (PYQs) पीडीएफ डाउनलोड करें।",
  path: "/pyq",
});

interface Props {
  searchParams: Promise<{
    exam?: string;
    year?: string;
    subject?: string;
    q?: string;
    page?: string;
  }>;
}

export default async function PyqPage({ searchParams }: Props) {
  const params = await searchParams;
  const exam = params.exam || "";
  const year = params.year ? parseInt(params.year, 10) : undefined;
  const subject = params.subject || "";
  const q = params.q || "";
  const page = params.page ? parseInt(params.page, 10) : 1;

  const repo = await getContentRepository();
  const paginated = await repo.listPyqs({
    exam,
    year,
    subject,
    topic: q,
    page,
    pageSize: 48, // Fetch a larger page size to group effectively
  });

  const subjects = [
    { value: "", label: "सभी विषय (All Subjects)" },
    { value: "Polity", label: "राजव्यवस्था (Polity)" },
    { value: "Economy", label: "अर्थव्यवस्था (Economy)" },
    { value: "History", label: "इतिहास (History)" },
    { value: "Geography", label: "भूगोल (Geography)" },
    { value: "Science & Tech", label: "विज्ञान एवं तकनीक (Science & Tech)" },
    { value: "Environment", label: "पर्यावरण (Environment)" },
    { value: "Ethics", label: "नीतिशास्त्र (Ethics)" },
    { value: "CSAT", label: "CSAT" },
  ];

  const exams = [
    { value: "", label: "सभी परीक्षाएं (All Exams)" },
    { value: "UPSC", label: "UPSC CSE" },
    { value: "MPPSC", label: "MPPSC" },
  ];

  const years = [
    { value: "", label: "सभी वर्ष (All Years)" },
    ...Array.from({ length: 12 }, (_, i) => {
      const y = 2026 - i;
      return { value: String(y), label: String(y) };
    }),
  ];

  const pageUrl = `${siteConfig.url}/pyq`;
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    { name: "PYQs", url: pageUrl },
  ]);

  const collectionPage = collectionPageJsonLd({
    name: "पिछले वर्षों के प्रश्न पत्र (PYQs) | Aakar IAS",
    description: "UPSC CSE और MPPSC परीक्षाओं के पिछले वर्षों के हल किए गए प्रश्न पत्र (PYQs) पीडीएफ डाउनलोड करें।",
    url: pageUrl,
    inLanguage: "hi-IN",
    items: paginated.items.map((pyqItem) => ({
      name: pyqItem.title,
      url: pyqItem.fileUrl ?? "",
    })),
  });

  // Group by year
  const groupedByYear: Record<number, typeof paginated.items> = {};
  paginated.items.forEach((item) => {
    if (!groupedByYear[item.year]) {
      groupedByYear[item.year] = [];
    }
    groupedByYear[item.year].push(item);
  });
  const sortedYears = Object.keys(groupedByYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <>
      <Section className="pb-0 pt-8">
        <Container size="wide">
          <Breadcrumb items={[{ name: "PYQs", href: "/pyq" }]} />
          
          <div className="mt-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                PYQ Database
              </span>
              <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                {exam === "MPPSC" ? "MPPSC पिछले वर्षों के प्रश्न पत्र" : exam === "UPSC" ? "UPSC पिछले वर्षों के प्रश्न पत्र" : "पिछले वर्षों के प्रश्न पत्र (PYQs)"}
              </h1>
              <p className="mt-2 text-muted-foreground max-w-2xl">
                यूपीएससी और एमपीपीएससी परीक्षाओं के विषय-वार और वर्ष-वार पिछले वर्षों के प्रश्न पत्रों का हल सहित संकलन।
              </p>
            </div>
            <Button variant="outline" size="sm" asChild className="rounded-full shrink-0">
              <Link href="/free-pdf">फ्री पीडीएफ लाइब्रेरी <FileText className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>

          {/* Sub-navigation Tabs */}
          {exam && (
            <div className="mt-8 border-b border-border/60">
              <div className="flex flex-wrap gap-2 sm:gap-6 -mb-px">
                <Link
                  href={exam === "MPPSC" ? "/mppsc" : "/upsc"}
                  className="pb-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative"
                >
                  कोर्सेज (Courses)
                </Link>
                <Link
                  href="/free-pdf"
                  className="pb-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative"
                >
                  अध्ययन सामग्री (Study Material)
                </Link>
                <Link
                  href={exam === "MPPSC" ? "/mppsc/syllabus-2026" : "/upsc/syllabus"}
                  className="pb-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative"
                >
                  पाठ्यक्रम (Syllabus)
                </Link>
                <Link
                  href={`/pyq?exam=${exam}`}
                  className="pb-3 text-sm font-bold text-primary border-b-2 border-primary relative"
                >
                  पिछले वर्षों के प्रश्न (Previous Year Papers)
                </Link>
              </div>
            </div>
          )}
        </Container>
      </Section>

      <Section className="pb-8 pt-8">
        <Container size="wide">
          {/* Interactive Native Filter Panel */}
          <form method="GET" action="/pyq" className="grid gap-4 rounded-3xl border border-border bg-card p-6 shadow-soft sm:grid-cols-2 lg:grid-cols-5">
            {/* Search query */}
            <div className="space-y-1.5 lg:col-span-2">
              <label htmlFor="q" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">खोजें (Search Topic)</label>
              <div className="relative">
                <Input
                  id="q"
                  name="q"
                  defaultValue={q}
                  placeholder="टॉपिक या कीवर्ड लिखें..."
                  className="pl-9 rounded-full border-border/60"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            {/* Exam Filter */}
            <div className="space-y-1.5">
              <label htmlFor="exam" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">परीक्षा (Exam)</label>
              <select
                id="exam"
                name="exam"
                defaultValue={exam}
                className="flex h-10 w-full rounded-full border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {exams.map((e) => (
                  <option key={e.value} value={e.value}>{e.label}</option>
                ))}
              </select>
            </div>

            {/* Subject Filter */}
            <div className="space-y-1.5">
              <label htmlFor="subject" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">विषय (Subject)</label>
              <select
                id="subject"
                name="subject"
                defaultValue={subject}
                className="flex h-10 w-full rounded-full border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {subjects.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>

            {/* Year Filter */}
            <div className="space-y-1.5">
              <label htmlFor="year" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">वर्ष (Year)</label>
              <select
                id="year"
                name="year"
                defaultValue={params.year || ""}
                className="flex h-10 w-full rounded-full border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {years.map((y) => (
                  <option key={y.value} value={y.value}>{y.label}</option>
                ))}
              </select>
            </div>

            {/* Actions */}
            <div className="flex items-end gap-2 sm:col-span-2 lg:col-span-5 lg:justify-end">
              {(exam || params.year || subject || q) && (
                <Button variant="ghost" asChild className="rounded-full">
                  <Link href="/pyq"><FilterX className="mr-2 h-4 w-4" /> रीसेट करें (Reset)</Link>
                </Button>
              )}
              <Button type="submit" className="rounded-full min-w-[120px] ml-auto lg:ml-0">फ़िल्टर लागू करें</Button>
            </div>
          </form>
        </Container>
      </Section>

      {/* Results */}
      <Section className="pt-0">
        <Container size="wide">
          {sortedYears.length > 0 ? (
            <div>
              {sortedYears.map((y) => (
                <div key={y} className="mb-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-8 w-1.5 rounded-full bg-primary" />
                    <h2 className="text-2xl font-extrabold text-foreground flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" /> वर्ष - {y}
                    </h2>
                  </div>
                  <div className="grid gap-4">
                    {groupedByYear[y].map((pyqItem) => (
                      <div
                        key={pyqItem.id}
                        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-card hover:bg-muted/10 border border-border/60 hover:border-border p-5 rounded-2xl shadow-soft hover:shadow-md transition-all duration-300 group"
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                            <FileText className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-bold text-foreground text-base group-hover:text-primary transition-colors duration-300">
                              {pyqItem.title}
                            </h3>
                            <div className="mt-1.5 flex flex-wrap gap-2 text-xs">
                              <span className="inline-flex items-center rounded-full bg-secondary/10 px-2.5 py-0.5 font-semibold text-secondary dark:text-white">
                                {pyqItem.exam}
                              </span>
                              <span className="text-muted-foreground font-medium">• {pyqItem.subject}</span>
                              <span className="text-muted-foreground font-medium">• {pyqItem.paper}</span>
                              {pyqItem.topic && (
                                <span className="text-muted-foreground italic">• विषय: {pyqItem.topic}</span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        {pyqItem.fileUrl ? (
                          <Button className="rounded-full shrink-0 group/btn bg-primary hover:bg-primary/95 text-white" asChild>
                            <TrackedDownloadLink
                              input={{
                                slug: pyqItem.id,
                                title: pyqItem.title,
                                kind: "pyq",
                                url: pyqItem.fileUrl,
                                locale: "hi",
                              }}
                            >
                              <Download className="h-4 w-4 mr-2 group-hover/btn:translate-y-0.5 transition-transform" /> PDF डाउनलोड करें
                            </TrackedDownloadLink>
                          </Button>
                        ) : (
                          <span className="text-xs text-muted-foreground italic sm:mr-4">उपलब्ध नहीं</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Pagination */}
              {paginated.totalPages > 1 && (
                <div className="flex items-center justify-between border-t border-border p-4 bg-muted/10 mt-8 rounded-3xl">
                  <span className="text-xs text-muted-foreground">
                    पेज <strong>{paginated.page}</strong> का <strong>{paginated.totalPages}</strong> (कुल {paginated.total} रिकॉर्ड)
                  </span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={paginated.page <= 1}
                      asChild={paginated.page > 1}
                      className="rounded-full"
                    >
                      {paginated.page > 1 ? (
                        <Link
                          href={`/pyq?page=${paginated.page - 1}${exam ? `&exam=${exam}` : ""}${
                            params.year ? `&year=${params.year}` : ""
                          }${subject ? `&subject=${subject}` : ""}${q ? `&q=${encodeURIComponent(q)}` : ""}`}
                        >
                          पिछला
                        </Link>
                      ) : (
                        <span>पिछला</span>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={!paginated.hasMore}
                      asChild={paginated.hasMore}
                      className="rounded-full"
                    >
                      {paginated.hasMore ? (
                        <Link
                          href={`/pyq?page=${paginated.page + 1}${exam ? `&exam=${exam}` : ""}${
                            params.year ? `&year=${params.year}` : ""
                          }${subject ? `&subject=${subject}` : ""}${q ? `&q=${encodeURIComponent(q)}` : ""}`}
                        >
                          अगला
                        </Link>
                      ) : (
                        <span>अगला</span>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center rounded-3xl border border-dashed border-border p-8 bg-card shadow-soft">
              <p className="text-lg font-semibold text-foreground">कोई प्रश्न पत्र नहीं मिला</p>
              <p className="mt-2 text-sm text-muted-foreground">
                आपके खोज और फ़िल्टर मानदंडों से मेल खाने वाले कोई PYQs नहीं मिले।
              </p>
              <Button asChild size="sm" variant="outline" className="mt-4 rounded-full">
                <Link href="/pyq">फ़िल्टर साफ़ करें</Link>
              </Button>
            </div>
          )}
        </Container>
      </Section>
      <JsonLd data={jsonLdGraph([breadcrumb, collectionPage])} />
    </>
  );
}
