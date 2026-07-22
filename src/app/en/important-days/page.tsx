import type { Metadata } from "next";
import Link from "next/link";
import { getContentRepository } from "@/lib/content/content-repository";
import { buildMetadata } from "@/lib/seo/metadata";
import { Breadcrumb } from "@/components/content/breadcrumb";
import { ArticleCard } from "@/components/content/article-card";
import { Pagination } from "@/components/content/pagination";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { siteConfig } from "@/lib/site-config";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, collectionPageJsonLd, jsonLdGraph } from "@/lib/seo/jsonld";
import { Calendar, CalendarDays, CalendarCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const revalidate = 600;

export const metadata: Metadata = buildMetadata({
  title: "Important Days & Events | Aakar IAS",
  description: "Comprehensive coverage of national and international important days, historical background, themes, and exam-oriented notes for UPSC CSE & State PSC exams.",
  path: "/en/important-days",
  keywords: ["Important Days", "National Days India", "International Days UPSC", "MPPSC Important Days", "Current Affairs Events"],
});

interface Props {
  searchParams: Promise<{ page?: string; month?: string; year?: string }>;
}

const MONTHS = [
  { value: "all", label: "All Months" },
  { value: "01", label: "January" },
  { value: "02", label: "February" },
  { value: "03", label: "March" },
  { value: "04", label: "April" },
  { value: "05", label: "May" },
  { value: "06", label: "June" },
  { value: "07", label: "July" },
  { value: "08", label: "August" },
  { value: "09", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

export default async function EnglishImportantDaysPage({ searchParams }: Props) {
  const params = await searchParams;
  const repo = await getContentRepository();
  const page = Math.max(1, Number(params.page) || 1);
  const activeMonth = params.month || "all";
  const activeYear = params.year || "2026";

  // Fetch articles with tag 'important-days'
  const result = await repo.listArticles({
    locale: "en",
    tag: "important-days",
    page,
    pageSize: 12,
  });

  let filteredItems = result.items;
  if (activeMonth !== "all") {
    filteredItems = result.items.filter((item) => {
      if (!item.date) return false;
      const monthPart = item.date.split("-")[1];
      return monthPart === activeMonth;
    });
  }

  const pageUrl = `${siteConfig.url}/en/important-days`;
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    { name: "Current Affairs", url: `${siteConfig.url}/en/current-affairs` },
    { name: "Important Days", url: pageUrl },
  ]);

  const collectionSchema = collectionPageJsonLd({
    name: "Important Days & Events",
    description: "National and international important days, themes, and exam-focused notes for UPSC and State PSCs.",
    url: pageUrl,
    inLanguage: "en-US",
    items: filteredItems.map((item) => ({
      name: item.title,
      url: `${siteConfig.url}/en/important-days/${item.slug}`,
    })),
  });

  return (
    <>
      <JsonLd data={jsonLdGraph([breadcrumb, collectionSchema])} />

      {/* ─── Hero Header ────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-secondary text-secondary-foreground py-12 sm:py-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--primary)_0%,_transparent_50%)] opacity-20" />
        <Container size="wide" className="relative">
          <Breadcrumb
            items={[
              { name: "Current Affairs", href: "/en/current-affairs" },
              { name: "Important Days" }
            ]}
            className="text-white/60 hover:text-white"
          />
          <div className="mt-6 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-xs font-bold text-primary mb-3">
              <CalendarDays className="h-3.5 w-3.5" />
              <span>Exam Oriented Important Days Series</span>
            </div>
            <h1 className="text-balance text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Important Days & Events
            </h1>
            <p className="mt-4 text-pretty text-lg text-white/75 sm:text-xl font-devanagari">
              In-depth coverage of national and international days, themes, historical significance, and key exam takeaways for Civil Services.
            </p>
          </div>
        </Container>
      </section>

      {/* ─── Month & Year Filter ─────────────────────────────────── */}
      <Section className="py-6 bg-muted/30 border-b border-border/40">
        <Container size="wide">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <span>Filter by Month & Year</span>
              </h2>
              <div className="flex items-center gap-2">
                <Button
                  variant={activeYear === "2026" ? "default" : "outline"}
                  size="sm"
                  className="rounded-full font-bold text-xs"
                  asChild
                >
                  <Link href="/en/important-days?year=2026">2026</Link>
                </Button>
                <Button
                  variant={activeYear === "2025" ? "default" : "outline"}
                  size="sm"
                  className="rounded-full font-bold text-xs"
                  asChild
                >
                  <Link href="/en/important-days?year=2025">2025</Link>
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {MONTHS.map((m) => {
                const isActive = activeMonth === m.value;
                const linkHref = m.value === "all" ? "/en/important-days" : `/en/important-days?month=${m.value}`;
                return (
                  <Link
                    key={m.value}
                    href={linkHref}
                    className={`px-3.5 py-1.5 rounded-lg border text-xs font-semibold transition-all duration-200 ${
                      isActive
                        ? "bg-primary border-primary text-primary-foreground shadow-sm font-bold"
                        : "bg-background border-border hover:bg-muted/70 text-foreground"
                    }`}
                  >
                    {m.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── Articles Grid ───────────────────────────────────────── */}
      <Section className="pt-8 pb-16">
        <Container size="wide">
          {filteredItems.length > 0 ? (
            <>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredItems.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
              <Pagination
                currentPage={page}
                totalPages={result.totalPages}
                basePath="/en/important-days"
                searchParams={params}
              />
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center rounded-2xl border border-dashed border-border/60 bg-muted/10">
              <CalendarCheck className="h-12 w-12 text-muted-foreground/60 stroke-[1.5]" />
              <p className="mt-4 text-lg font-semibold text-foreground">No articles available for this period</p>
              <p className="mt-2 text-sm text-muted-foreground max-w-sm">
                Detailed notes and themes for upcoming important days will be published here shortly.
              </p>
              <Button className="mt-6 rounded-full" asChild>
                <Link href="/en/important-days">View All Important Days <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
              </Button>
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
