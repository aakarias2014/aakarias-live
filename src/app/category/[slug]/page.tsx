import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContentRepository } from "@/lib/content/content-repository";
import { buildMetadata } from "@/lib/seo/metadata";
import { Breadcrumb } from "@/components/content/breadcrumb";
import { ArticleCard } from "@/components/content/article-card";
import { Pagination } from "@/components/content/pagination";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

export const revalidate = 600;

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const repo = await getContentRepository();
  const category = await repo.getCategory(slug, "hi");
  if (!category) return {};

  return buildMetadata({
    title: `${category.title} Current Affairs`,
    description: category.description ?? `Latest ${category.title} current affairs for UPSC & MPPSC.`,
    path: `/category/${slug}`,
  });
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const sp = await searchParams;
  const repo = await getContentRepository();
  const page = Math.max(1, Number(sp.page) || 1);

  const [category, result] = await Promise.all([
    repo.getCategory(slug, "hi"),
    repo.listArticles({ locale: "hi", category: slug, page, pageSize: 12 }),
  ]);

  if (!category) notFound();

  return (
    <>
      <Section className="pb-0 pt-8">
        <Container size="wide">
          <Breadcrumb
            items={[
              { name: "Categories", href: "/current-affairs" },
              { name: category.title },
            ]}
          />
          <div className="mt-6">
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              {category.title} Current Affairs
            </h1>
            {category.description && (
              <p className="mt-2 max-w-2xl text-muted-foreground">{category.description}</p>
            )}
            <p className="mt-1 text-sm text-muted-foreground">{result.total} articles</p>
          </div>
        </Container>
      </Section>

      <Section className="pt-6">
        <Container size="wide">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {result.items.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
          <Pagination currentPage={page} totalPages={result.totalPages} basePath={`/category/${slug}`} searchParams={sp} />
        </Container>
      </Section>
    </>
  );
}
