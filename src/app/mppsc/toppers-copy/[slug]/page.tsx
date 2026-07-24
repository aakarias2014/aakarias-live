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
  const copies = await getAllTopperCopies("hi");
  const slugs = new Set<string>();
  for (const c of copies) {
    if (c.slug) slugs.add(c.slug);
    if (c.id) slugs.add(c.id);
    if (c.sanityId) slugs.add(c.sanityId);
  }
  return Array.from(slugs).map((s) => ({ slug: s }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const copy = await getTopperCopyBySlug(slug, "hi");
  if (!copy) return {};

  const title = `${copy.name} (${copy.rank}) - MPPSC Topper Answer Copy | Aakar IAS`;
  const description = `${copy.name} (${copy.rank}) की वास्तविक MPPSC मुख्य परीक्षा उत्तर पुस्तिका (${copy.paper})। उत्तर संरचना, अंकन शैली देखें व मुफ़्त PDF डाउनलोड करें।`;
  const pagePath = `/mppsc/toppers-copy/${copy.slug}`;

  return buildMetadata({
    title,
    description,
    path: pagePath,
    image: copy.image,
    type: "article",
    publishedTime: copy.year ? `${copy.year}-01-01` : undefined,
  });
}

export default async function TopperCopyDetailPage({ params }: Props) {
  const { slug } = await params;
  const copy = await getTopperCopyBySlug(slug, "hi");
  if (!copy) notFound();

  const allCopies = await getAllTopperCopies("hi");
  const relatedCopies = allCopies.filter((c) => c.slug !== copy.slug).slice(0, 3);
  const pageUrl = `${siteConfig.url}/mppsc/toppers-copy/${copy.slug}`;

  const breadcrumb = breadcrumbJsonLd([
    { name: "गृह पृष्ठ", url: siteConfig.url },
    { name: "MPPSC", url: `${siteConfig.url}/mppsc` },
    { name: "टॉपर कॉपियां", url: `${siteConfig.url}/mppsc/toppers-copy` },
    { name: `${copy.name} (${copy.rank})`, url: pageUrl },
  ]);

  const articleSchema = articleJsonLd({
    title: `${copy.name} (${copy.rank}) MPPSC Topper Answer Copy`,
    description: copy.description || `${copy.name} की MPPSC उत्तर पुस्तिका`,
    url: pageUrl,
    image: copy.image,
    datePublished: copy.year ? `${copy.year}-01-01` : new Date().toISOString(),
    authorName: copy.name,
    inLanguage: "hi-IN",
  });

  return (
    <>
      <JsonLd data={[breadcrumb, articleSchema]} />

      <Section className="py-8 sm:py-12 bg-muted/20 border-b border-border/50">
        <Container>
          <div className="mb-6">
            <Link
              href="/mppsc/toppers-copy"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline transition-all"
            >
              <ArrowLeft className="h-4 w-4" />
              सभी उत्तर पुस्तिकाएं देखें
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <Badge className="bg-primary text-primary-foreground font-bold px-3 py-1 rounded-lg">
                  {copy.exam} {copy.year}
                </Badge>
                <Badge variant="outline" className="font-bold border-primary/30 text-primary">
                  {copy.rank}
                </Badge>
                <Badge variant="secondary" className="font-semibold">
                  अंक: {copy.marks}
                </Badge>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
                {copy.name} – MPPSC मुख्य परीक्षा उत्तर पुस्तिका
              </h1>

              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {copy.description}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                {copy.pdfUrl ? (
                  <Button asChild size="lg" className="rounded-xl font-bold gap-2">
                    <a href={copy.pdfUrl} target="_blank" rel="noopener noreferrer">
                      <Download className="h-5 w-5" />
                      निशुल्क PDF डाउनलोड करें
                    </a>
                  </Button>
                ) : (
                  <Button size="lg" className="rounded-xl font-bold gap-2" disabled>
                    <FileText className="h-5 w-5" />
                    शीघ्र उपलब्ध
                  </Button>
                )}

                <ShareDropdown
                  title={`आकार IAS MPPSC टॉपर उत्तर पुस्तिका - ${copy.name} (${copy.rank})`}
                  url={pageUrl}
                  locale="hi"
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
                    alt={`${copy.name} - MPPSC Topper ${copy.rank}`}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 400px"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-xl font-extrabold">{copy.name}</h3>
                    <p className="text-xs text-white/80 font-medium">{copy.rank} • {copy.year}</p>
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
                    <h3 className="font-bold text-lg text-foreground">{copy.paper}</h3>
                    <p className="text-xs text-muted-foreground">वास्तविक परीक्षा उत्तर पुस्तिका अवलोकन</p>
                  </div>
                </div>

                {copy.pdfUrl && (
                  <Button asChild variant="outline" size="sm" className="rounded-xl gap-1.5 font-bold">
                    <a href={copy.pdfUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                      नई टैब में खोलें
                    </a>
                  </Button>
                )}
              </div>

              {copy.pdfUrl ? (
                <div className="aspect-[4/5] sm:aspect-[16/10] w-full rounded-xl overflow-hidden border border-border bg-muted/40">
                  <iframe
                    src={`https://docs.google.com/viewer?url=${encodeURIComponent(copy.pdfUrl)}&embedded=true`}
                    className="w-full h-full border-0"
                    title={`${copy.name} Topper Copy PDF`}
                  />
                </div>
              ) : (
                <div className="py-16 text-center space-y-3 bg-muted/20 rounded-xl border border-dashed border-border">
                  <FileText className="h-12 w-12 text-muted-foreground/60 mx-auto" />
                  <p className="font-bold text-foreground">उत्तर पुस्तिका डिजिटल प्रोसेसिंग में है</p>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto">
                    {copy.name} की यह उत्तर पुस्तिका शीघ्र ही पूर्ण रूप से देखने हेतु उपलब्ध कराई जाएगी।
                  </p>
                </div>
              )}
            </div>

            {/* Answer Writing Strategy Highlights */}
            <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-6">
              <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                इस उत्तर पुस्तिका से क्या सीखें? (Key Takeaways)
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-muted/30 border border-border/50 flex gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-foreground">संरचनात्मक उत्तर ढांचा</h4>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      भूमिका, मुख्य भाग और निष्कर्ष का संतुलित विभाजन जिससे मूल्यांकनकर्ता को समझने में आसानी होती है।
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-muted/30 border border-border/50 flex gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-foreground">मानचित्र व आरेख प्रस्तुति</h4>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      जहाँ आवश्यक हो वहाँ रेखाचित्र और मध्य प्रदेश / भारत के मानचित्रों का स्पष्ट प्रयोग।
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-muted/30 border border-border/50 flex gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-foreground">समय और शब्द सीमा प्रबंधन</h4>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      निर्धारित शब्द सीमा के भीतर तथ्यात्मक व विश्लेषणात्मक सामग्री की सटीक प्रस्तुति।
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-muted/30 border border-border/50 flex gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-foreground">बिंदुवार निरूपण (Bullet Points)</h4>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      महत्वपूर्ण तथ्यों व अनुच्छेदों को हाइलाइट करके स्पष्ट अंक अर्जित करने की शैली।
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Toppers Copies */}
            {relatedCopies.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-foreground">अन्य MPPSC टॉपर्स की उत्तर पुस्तिकाएं</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedCopies.map((rel) => (
                    <Card key={rel.slug} className="overflow-hidden border-border bg-card hover:border-primary/50 transition-all group">
                      <div className="h-36 relative">
                        <Image
                          src={rel.image}
                          alt={rel.name}
                          fill
                          className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <CardContent className="p-4 space-y-3">
                        <div>
                          <h4 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                            {rel.name}
                          </h4>
                          <p className="text-xs text-muted-foreground mt-0.5">{rel.rank} • {rel.year}</p>
                        </div>
                        <Button asChild variant="outline" size="sm" className="w-full rounded-lg text-xs font-bold">
                          <Link href={`/mppsc/toppers-copy/${rel.slug}`}>उत्तर पुस्तिका देखें</Link>
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
