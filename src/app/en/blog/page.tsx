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
  title: "Blog & Preparation Strategy",
  description: "UPSC & MPPSC prep blogs, study tips, answer writing hacks, and strategies from toppers and faculty in English.",
  path: "/en/blog",
  keywords: ["Civil Services Blog", "exam preparation strategy", "IAS toppers blog English"],
});

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export default async function EnglishBlogPage({ searchParams }: Props) {
  const params = await searchParams;
  const repo = await getContentRepository();
  const page = Math.max(1, Number(params.page) || 1);

  const result = await repo.listArticles({
    locale: "en",
    contentType: "blog",
    page,
    pageSize: 12,
  });

  const pageUrl = `${siteConfig.url}/en/blog`;
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: `${siteConfig.url}/en` },
    { name: "Blog", url: pageUrl },
  ]);

  const collectionPage = collectionPageJsonLd({
    name: "Blog & Preparation Strategy",
    description: "UPSC & MPPSC prep blogs, study tips, answer writing hacks, and strategies from toppers and faculty in English.",
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
          <Breadcrumb items={[{ name: "Blog", href: "/en/blog" }]} />
          <div className="mt-6">
            <h1 className="text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Preparation Blog &amp; Insights
            </h1>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              Actionable advice, topper strategies, writing tips, and prep methodologies from our senior selectors and academic experts.
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
                basePath="/en/blog"
                searchParams={params}
              />
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-lg font-semibold text-foreground">No blog posts found</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Blog updates will be uploaded soon. Stay tuned.
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
