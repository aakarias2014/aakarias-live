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
  title: "Blog",
  description: "Articles, tips, and strategy guides for UPSC, MPPSC & State PSC aspirants. Study plans, motivation, and preparation insights.",
  path: "/blog",
  keywords: ["IAS blog", "UPSC blog", "MPPSC blog", "preparation tips", "study strategy"],
});

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export default async function BlogPage({ searchParams }: Props) {
  const params = await searchParams;
  const repo = await getContentRepository();
  const page = Math.max(1, Number(params.page) || 1);

  const result = await repo.listArticles({
    locale: "hi",
    contentType: "blog",
    page,
    pageSize: 12,
  });

  const pageUrl = `${siteConfig.url}/blog`;
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    { name: "Blog", url: pageUrl },
  ]);

  const collectionPage = collectionPageJsonLd({
    name: "Blog",
    description: "Articles, tips, and strategy guides for UPSC, MPPSC & State PSC aspirants. Study plans, motivation, and preparation insights.",
    url: pageUrl,
    inLanguage: "hi-IN",
    items: result.items.map((a) => ({
      name: a.title,
      url: `${siteConfig.url}${a.href}`,
    })),
  });

  return (
    <>
      <Section className="pb-0 pt-8">
        <Container size="wide">
          <Breadcrumb items={[{ name: "Blog" }]} />
          <div className="mt-6">
            <h1 className="text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Blog
            </h1>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              Strategy guides, preparation tips, motivation, and insights to help you crack your exam.
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{result.total} posts</p>
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
                basePath="/blog"
                searchParams={params}
              />
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-lg font-semibold text-foreground">No blog posts yet</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Articles and guides will appear here. Check back soon.
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
