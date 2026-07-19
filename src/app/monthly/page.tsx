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
  title: "Monthly Current Affairs",
  description: "Monthly current affairs compilations for UPSC, MPPSC & State PSC exams. Comprehensive month-wise coverage in Hindi & English.",
  path: "/monthly",
  keywords: ["Monthly Current Affairs", "मासिक करेंट अफेयर्स", "UPSC monthly", "MPPSC monthly"],
});

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export default async function MonthlyPage({ searchParams }: Props) {
  const params = await searchParams;
  const repo = await getContentRepository();
  const page = Math.max(1, Number(params.page) || 1);

  const result = await repo.listArticles({
    locale: "hi",
    contentType: "monthly",
    page,
    pageSize: 12,
  });

  const pageUrl = `${siteConfig.url}/monthly`;
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    { name: "Monthly Current Affairs", url: pageUrl },
  ]);

  const collectionPage = collectionPageJsonLd({
    name: "Monthly Current Affairs",
    description: "Monthly current affairs compilations for UPSC, MPPSC & State PSC exams. Comprehensive month-wise coverage in Hindi & English.",
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
          <Breadcrumb items={[{ name: "Monthly Current Affairs" }]} />
          <div className="mt-6">
            <h1 className="text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Monthly Current Affairs
            </h1>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              Complete month-wise coverage of all important events. Ideal for deep revision before exams.
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
                basePath="/monthly"
                searchParams={params}
              />
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-lg font-semibold text-foreground">No monthly digests yet</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Monthly compilations will appear here. Check back soon.
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
