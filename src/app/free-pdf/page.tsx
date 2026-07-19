import type { Metadata } from "next";
import Link from "next/link";
import { getContentRepository } from "@/lib/content/content-repository";
import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumb } from "@/components/content/breadcrumb";
import { PdfCard } from "@/components/content/pdf-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, collectionPageJsonLd, jsonLdGraph } from "@/lib/seo/jsonld";
import { siteConfig } from "@/lib/site-config";

export const revalidate = 600;

export const metadata: Metadata = buildMetadata({
  title: "फ्री पीडीएफ लाइब्रेरी (Free PDF Library)",
  description: "यूपीएससी, एमपीपीएससी परीक्षा पाठ्यक्रम, पिछले वर्षों के प्रश्न पत्र (PYQs) और मासिक पत्रिकाओं की मुफ्त पीडीएफ फाइलें खोजें और डाउनलोड करें।",
  path: "/free-pdf",
  keywords: ["Free PDFs", "UPSC Syllabus PDF", "MPPSC PYQ PDF", "IAS notes PDF"],
});

interface Props {
  searchParams: Promise<{ type?: string; q?: string }>;
}

export default async function FreePdfPage({ searchParams }: Props) {
  const params = await searchParams;
  const activeType = params.type || "all";
  const searchQuery = params.q || "";

  const repo = await getContentRepository();
  const pdfTypeFilter = activeType !== "all" ? (activeType as any) : undefined;
  
  let pdfs = await repo.listMonthlyPdfs("hi", pdfTypeFilter);

  // Apply search query filter if present
  if (searchQuery) {
    const qLower = searchQuery.toLowerCase();
    pdfs = pdfs.filter(
      (pdf) =>
        pdf.title.toLowerCase().includes(qLower) ||
        (pdf.description && pdf.description.toLowerCase().includes(qLower))
    );
  }

  const tabs = [
    { value: "all", label: "सभी सामग्रियां (All)" },
    { value: "monthly", label: "मासिक पत्रिका (Monthly)" },
    { value: "half-yearly", label: "अर्द्धवार्षिक (Half Yearly)" },
    { value: "yearly", label: "वार्षिक (Yearly)" },
    { value: "custom", label: "अन्य (Custom)" },
    { value: "pyq", label: "पिछले वर्षों के प्रश्न (PYQs)" },
    { value: "syllabus", label: "पाठ्यक्रम (Syllabus)" },
  ];

  const pageUrl = `${siteConfig.url}/free-pdf`;
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    { name: "Free PDF Library", url: pageUrl },
  ]);

  const collectionPage = collectionPageJsonLd({
    name: "फ्री पीडीएफ लाइब्रेरी (Free PDF Library)",
    description: "यूपीएससी, एमपीपीएससी परीक्षा पाठ्यक्रम, पिछले वर्षों के प्रश्न पत्र (PYQs) और मासिक पत्रिकाओं की मुफ्त पीडीएफ फाइलें खोजें और डाउनलोड करें।",
    url: pageUrl,
    inLanguage: "hi-IN",
    items: pdfs.map((pdf) => ({
      name: pdf.title,
      url: pdf.fileUrl ?? "",
    })),
  });

  return (
    <>
      <Section className="pb-0 pt-8">
        <Container size="wide">
          <Breadcrumb items={[{ name: "Free PDF Library" }]} />
          <div className="mt-6">
            <h1 className="text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              फ्री पीडीएफ लाइब्रेरी
            </h1>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              सिलेबस, प्रीवियस ईयर पेपर्स (PYQ), टॉपर्स नोट्स और हमारी मासिक पत्रिकाओं का विशाल डिजिटल पुस्तकालय।
            </p>
          </div>
        </Container>
      </Section>

      {/* Filters & Search */}
      <Section className="pb-4 pt-8">
        <Container size="wide" className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Tab Filters */}
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => (
                <Button
                  key={tab.value}
                  variant={activeType === tab.value ? "default" : "outline"}
                  size="sm"
                  asChild
                  className="rounded-full"
                >
                  <Link
                    href={`/free-pdf?type=${tab.value}${
                      searchQuery ? `&q=${encodeURIComponent(searchQuery)}` : ""
                    }`}
                  >
                    {tab.label}
                  </Link>
                </Button>
              ))}
            </div>

            {/* Search Input */}
            <form method="GET" action="/free-pdf" className="relative w-full max-w-sm shrink-0">
              <input type="hidden" name="type" value={activeType} />
              <Input
                name="q"
                type="search"
                defaultValue={searchQuery}
                placeholder="खोजें (जैसे. UPSC Syllabus)..."
                className="pl-9 pr-4 rounded-full border-border/60"
              />
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </form>
          </div>
        </Container>
      </Section>

      {/* Grid of Results */}
      <Section className="pt-2">
        <Container size="wide">
          {pdfs.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {pdfs.map((pdf) => (
                <PdfCard key={pdf.id} pdf={pdf} locale="hi" />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center rounded-2xl border border-dashed border-border p-8">
              <p className="text-lg font-semibold text-foreground">कोई पीडीएफ नहीं मिला</p>
              <p className="mt-2 text-sm text-muted-foreground">
                आपके खोज मानदंड से मेल खाने वाली कोई अध्ययन सामग्री नहीं मिली।
              </p>
              <Button asChild size="sm" variant="outline" className="mt-4 rounded-full">
                <Link href="/free-pdf">फ़िल्टर साफ़ करें</Link>
              </Button>
            </div>
          )}
        </Container>
      </Section>
      <JsonLd data={jsonLdGraph([breadcrumb, collectionPage])} />
    </>
  );
}
