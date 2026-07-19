import type { Metadata } from "next";
import { getContentRepository } from "@/lib/content/content-repository";
import { buildMetadata } from "@/lib/seo/metadata";
import { Breadcrumb } from "@/components/content/breadcrumb";
import { ArticleCard } from "@/components/content/article-card";
import { Pagination } from "@/components/content/pagination";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Newsletter } from "@/components/content/newsletter";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, collectionPageJsonLd, jsonLdGraph } from "@/lib/seo/jsonld";
import { siteConfig } from "@/lib/site-config";

export const revalidate = 600;

export const metadata: Metadata = buildMetadata({
  title: "Weekly Current Affairs",
  description: "Weekly current affairs compilations for UPSC, MPPSC & State PSC aspirants in English. Consolidated news of the week.",
  path: "/en/weekly",
  keywords: ["Weekly Current Affairs", "UPSC weekly", "MPPSC weekly English"],
});

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export default async function EnglishWeeklyPage({ searchParams }: Props) {
  const params = await searchParams;
  const repo = await getContentRepository();
  const page = Math.max(1, Number(params.page) || 1);

  const result = await repo.listArticles({
    locale: "en",
    contentType: "weekly",
    page,
    pageSize: 12,
  });

  const pageUrl = `${siteConfig.url}/en/weekly`;
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: `${siteConfig.url}/en` },
    { name: "Weekly Current Affairs", url: pageUrl },
  ]);

  const collectionPage = collectionPageJsonLd({
    name: "Weekly Current Affairs",
    description: "Weekly current affairs compilations for UPSC, MPPSC & State PSC aspirants in English. Consolidated news of the week.",
    url: pageUrl,
    inLanguage: "en-IN",
    items: result.items.map((a) => ({
      name: a.title,
      url: `${siteConfig.url}${a.href}`,
    })),
  });

  return (
    <>
      <Section className="pb-0 pt-8">
        <Container size="wide">
          <Breadcrumb items={[{ name: "Weekly Current Affairs", href: "/en/weekly" }]} />
          <div className="mt-6">
            <h1 className="text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Weekly Current Affairs
            </h1>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              Every week&apos;s important news, consolidated and exam-ready. Perfect for quick revision.
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{result.total} articles</p>
          </div>
        </Container>
      </Section>

      <Section className="pt-6">
        <Container size="wide">
          {result.items.length > 0 ? (
            <>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {result.items.map((a) => (
                  <ArticleCard key={a.id} article={a} />
                ))}
              </div>
              <Pagination
                currentPage={page}
                totalPages={result.totalPages}
                basePath="/en/weekly"
                searchParams={params}
              />
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-lg font-semibold text-foreground">No weekly digests yet</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Weekly compilations will appear here. Check back soon.
              </p>
            </div>
          )}
        </Container>
      </Section>

      <Section className="py-12">
        <Container size="narrow">
          <Newsletter variant="section" />
        </Container>
      </Section>
      <JsonLd data={jsonLdGraph([breadcrumb, collectionPage])} />
    </>
  );
}
