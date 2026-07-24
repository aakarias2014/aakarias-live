import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { buildMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, articleJsonLd } from "@/lib/seo/jsonld";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShareDropdown } from "@/components/article/share-dropdown";
import { siteConfig } from "@/lib/site-config";
import { getTopperCopyBySlug, getAllTopperCopies } from "@/lib/toppers-data";
import { Download, FileText, ArrowLeft, ExternalLink, Award, CheckCircle2, BookOpen } from "lucide-react";

export const revalidate = 3600;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const copies = await getAllTopperCopies("en");
  return copies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const copy = await getTopperCopyBySlug(slug, "en");
  if (!copy) return {};

  const title = `${copy.nameEn} (${copy.rankEn}) - MPPSC Topper Answer Copy | Aakar IAS`;
  const description = `Read and download actual MPPSC Mains Answer Copy of ${copy.nameEn} (${copy.rankEn}) for ${copy.paperEn}. Learn answer structure and presentation strategies.`;
  const pagePath = `/en/mppsc/toppers-copy/${copy.slug}`;

  return buildMetadata({
    title,
    description,
    path: pagePath,
    image: copy.image,
    type: "article",
    publishedTime: copy.year ? `${copy.year}-01-01` : undefined,
  });
}

export default async function EnglishTopperCopyDetailPage({ params }: Props) {
  const { slug } = await params;
  const copy = await getTopperCopyBySlug(slug, "en");
  if (!copy) notFound();

  const allCopies = await getAllTopperCopies("en");
  const relatedCopies = allCopies.filter((c) => c.slug !== copy.slug).slice(0, 3);
  const pageUrl = `${siteConfig.url}/en/mppsc/toppers-copy/${copy.slug}`;

  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: `${siteConfig.url}/en` },
    { name: "MPPSC", url: `${siteConfig.url}/en/mppsc` },
    { name: "Toppers Copies", url: `${siteConfig.url}/en/mppsc/toppers-copy` },
    { name: `${copy.nameEn} (${copy.rankEn})`, url: pageUrl },
  ]);

  const articleSchema = articleJsonLd({
    title: `${copy.nameEn} (${copy.rankEn}) MPPSC Topper Answer Copy`,
    description: copy.descriptionEn || `${copy.nameEn}'s MPPSC Answer Copy`,
    url: pageUrl,
    image: copy.image,
    datePublished: copy.year ? `${copy.year}-01-01` : new Date().toISOString(),
    authorName: copy.nameEn,
    inLanguage: "en-US",
  });

  return (
    <>
      <JsonLd data={[breadcrumb, articleSchema]} />

      <Section className="py-8 sm:py-12 bg-muted/20 border-b border-border/50">
        <Container>
          <div className="mb-6">
            <Link
              href="/en/mppsc/toppers-copy"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline transition-all"
            >
              <ArrowLeft className="h-4 w-4" />
              View All Answer Copies
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <Badge className="bg-primary text-primary-foreground font-bold px-3 py-1 rounded-lg">
                  {copy.exam} {copy.year}
                </Badge>
                <Badge variant="outline" className="font-bold border-primary/30 text-primary">
                  {copy.rankEn}
                </Badge>
                <Badge variant="secondary" className="font-semibold">
                  Marks: {copy.marks}
                </Badge>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
                {copy.nameEn} – MPPSC Mains Answer Copy
              </h1>

              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {copy.descriptionEn || copy.description}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                {copy.pdfUrl ? (
                  <Button asChild size="lg" className="rounded-xl font-bold gap-2">
                    <a href={copy.pdfUrl} target="_blank" rel="noopener noreferrer">
                      <Download className="h-5 w-5" />
                      Download PDF Free
                    </a>
                  </Button>
                ) : (
                  <Button size="lg" className="rounded-xl font-bold gap-2" disabled>
                    <FileText className="h-5 w-5" />
                    Available Soon
                  </Button>
                )}

                <ShareDropdown
                  title={`Aakar IAS MPPSC Topper Copy - ${copy.nameEn} (${copy.rankEn})`}
                  url={pageUrl}
                  locale="en"
                  showBullet={false}
                />
              </div>
            </div>

            {/* Candidate Photo Card */}
            <div className="flex justify-center">
              <div className="relative group w-full max-w-sm rounded-2xl overflow-hidden border border-border bg-card shadow-soft-lg">
                <div className="h-64 sm:h-72 relative">
                  <Image
                    src={copy.image}
                    alt={`${copy.nameEn} - MPPSC Topper ${copy.rankEn}`}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 400px"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-xl font-extrabold">{copy.nameEn}</h3>
                    <p className="text-xs text-white/80 font-medium">{copy.rankEn} • {copy.year}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* PDF View & Analysis Section */}
      <Section className="py-12">
        <Container>
          <div className="max-w-4xl mx-auto space-y-10">
            {/* Answer Copy Viewer */}
            <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-6 shadow-soft-sm">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-foreground">{copy.paperEn}</h3>
                    <p className="text-xs text-muted-foreground">Actual Examination Answer Booklet Preview</p>
                  </div>
                </div>

                {copy.pdfUrl && (
                  <Button asChild variant="outline" size="sm" className="rounded-xl gap-1.5 font-bold">
                    <a href={copy.pdfUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                      Open in New Tab
                    </a>
                  </Button>
                )}
              </div>

              {copy.pdfUrl ? (
                <div className="aspect-[4/5] sm:aspect-[16/10] w-full rounded-xl overflow-hidden border border-border bg-muted/40">
                  <iframe
                    src={`https://docs.google.com/viewer?url=${encodeURIComponent(copy.pdfUrl)}&embedded=true`}
                    className="w-full h-full border-0"
                    title={`${copy.nameEn} Topper Copy PDF`}
                  />
                </div>
              ) : (
                <div className="py-16 text-center space-y-3 bg-muted/20 rounded-xl border border-dashed border-border">
                  <FileText className="h-12 w-12 text-muted-foreground/60 mx-auto" />
                  <p className="font-bold text-foreground">Answer Copy is Under Processing</p>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto">
                    This answer copy for {copy.nameEn} will be made available for viewing shortly.
                  </p>
                </div>
              )}
            </div>

            {/* Answer Writing Strategy Highlights */}
            <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-6">
              <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Key Takeaways from this Answer Copy
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-muted/30 border border-border/50 flex gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-foreground">Structured Answer Framework</h4>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      Balanced division of introduction, body paragraphs, and conclusion for optimal evaluator readability.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-muted/30 border border-border/50 flex gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-foreground">Map & Diagram Integration</h4>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      Clear inclusion of India and MP regional maps and flowcharts wherever applicable.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-muted/30 border border-border/50 flex gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-foreground">Time & Word Count Management</h4>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      Precise analytical writing staying well within the prescribed word limit.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-muted/30 border border-border/50 flex gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-foreground">Pointwise Presentation</h4>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      Effective highlighting of key articles, facts, and judicial precedents for maximum marks.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Toppers Copies */}
            {relatedCopies.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-foreground">Other MPPSC Toppers' Answer Copies</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedCopies.map((rel) => (
                    <Card key={rel.slug} className="overflow-hidden border-border bg-card hover:border-primary/50 transition-all group">
                      <div className="h-36 relative">
                        <Image
                          src={rel.image}
                          alt={rel.nameEn}
                          fill
                          className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <CardContent className="p-4 space-y-3">
                        <div>
                          <h4 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                            {rel.nameEn}
                          </h4>
                          <p className="text-xs text-muted-foreground mt-0.5">{rel.rankEn} • {rel.year}</p>
                        </div>
                        <Button asChild variant="outline" size="sm" className="w-full rounded-lg text-xs font-bold">
                          <Link href={`/en/mppsc/toppers-copy/${rel.slug}`}>View Answer Copy</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Container>
      </Section>
    </>
  );
}
