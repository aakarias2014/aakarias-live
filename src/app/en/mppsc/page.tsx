import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { getContentRepository } from "@/lib/content/content-repository";
import { buildMetadata } from "@/lib/seo/metadata";
import { ArticleCard } from "@/components/content/article-card";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Newsletter } from "@/components/content/newsletter";
import { Breadcrumb } from "@/components/content/breadcrumb";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, collectionPageJsonLd, jsonLdGraph } from "@/lib/seo/jsonld";
import { siteConfig } from "@/lib/site-config";

export const revalidate = 600;

export const metadata: Metadata = buildMetadata({
  title: "MPPSC Preparation Hub (English)",
  description: "MPPSC current affairs, strategy guides, syllabus, previous year papers (PYQs), and notes in English.",
  path: "/en/mppsc",
  keywords: ["MPPSC Preparation Hub", "MPPSC current affairs English", "MP PSC study material"],
});

export default async function EnglishMppscPage() {
  const repo = await getContentRepository();
  const [latest, popular] = await Promise.all([
    repo.listArticles({ locale: "en", tag: "mppsc", page: 1, pageSize: 6 }),
    repo.getPopular("en", 3, "mppsc"),
  ]);

  const quickLinks = [
    { href: "/mppsc/syllabus-2026", title: "MPPSC Syllabus 2026", desc: "Complete exam plan & syllabus" },
    { href: "/en/current-affairs", title: "Daily Current Affairs", desc: "Daily news relevant to MPPSC" },
    { href: "/en/editorial", title: "Editorials", desc: "Analysis for Mains preparation" },
    { href: "/en/monthly-pdf", title: "Monthly PDFs", desc: "Consolidated monthly revisions" },
    { href: "/en/free-pdf", title: "Free Study Material", desc: "MPPSC syllabus & PYQs" },
  ];

  const pageUrl = `${siteConfig.url}/en/mppsc`;
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: `${siteConfig.url}/en` },
    { name: "MPPSC", url: pageUrl },
  ]);

  const collectionPage = collectionPageJsonLd({
    name: "MPPSC Preparation Hub (English)",
    description: "MPPSC current affairs, strategy guides, syllabus, previous year papers (PYQs), and notes in English.",
    url: pageUrl,
    inLanguage: "en-IN",
    items: latest.items.map((a) => ({
      name: a.title,
      url: `${siteConfig.url}${a.href}`,
    })),
  });

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-secondary text-secondary-foreground">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--primary)_0%,_transparent_50%)] opacity-20" />
        <Container size="wide" className="relative py-16 sm:py-20">
          <div className="max-w-3xl">
            <span className="inline-block rounded-full bg-primary/15 px-4 py-1 text-sm font-semibold text-primary">
              MPPSC
            </span>
            <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              MPPSC Preparation Hub
            </h1>
            <p className="mt-4 text-pretty text-lg text-white/75">
              Dedicated preparation resources for Madhya Pradesh Public Service Commission — syllabus breakdowns, revision guides, current affairs, and mock test papers in English.
            </p>
          </div>
        </Container>
      </section>

      <Section>
        <Container size="wide">
          <Breadcrumb items={[{ name: "MPPSC", href: "/en/mppsc" }]} />
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {quickLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-2xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-soft-lg"
              >
                <h3 className="text-lg font-bold text-foreground group-hover:text-primary">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Explore <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {latest.items.length > 0 && (
        <Section title="Latest for MPPSC" description="Fresh content tagged for MPPSC aspirants.">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latest.items.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button variant="outline" asChild>
              <Link href="/en/tag/mppsc">View all MPPSC articles <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
        </Section>
      )}

      {popular.length > 0 && (
        <Section title="Popular Reads" description="Trending articles among aspirants." className="bg-muted/20">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {popular.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        </Section>
      )}

      <Section className="py-12">
        <Container size="narrow">
          <Newsletter variant="section" />
        </Container>
      </Section>
      <JsonLd data={jsonLdGraph([breadcrumb, collectionPage])} />
    </>
  );
}
