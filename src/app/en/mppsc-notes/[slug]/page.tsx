import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContentRepository } from "@/lib/content/content-repository";
import { buildMetadata, formatArticleSeoTitle, formatArticleSeoDescription } from "@/lib/seo/metadata";
import { ArticleHero } from "@/components/article/article-hero";
import { ArticleBody } from "@/components/article/article-body";
import { ArticleSidebar } from "@/components/article/article-sidebar";
import { TableOfContents } from "@/components/article/table-of-contents";
import { ReadingProgress } from "@/components/article/reading-progress";
import { RelatedArticles } from "@/components/article/related-articles";
import { Newsletter } from "@/components/content/newsletter";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ShareWidget } from "@/components/article/share-widget";
import { AnimatedSection } from "@/components/ui/animated-section";
import { siteConfig } from "@/lib/site-config";
import { breadcrumbJsonLd, articleJsonLd, faqJsonLd, quizJsonLd, jsonLdGraph } from "@/lib/seo/jsonld";
import { JsonLd } from "@/components/seo/json-ld";

export const revalidate = 3600;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const repo = await getContentRepository();
  const slugs = await repo.getAllSlugs("en", "staticGk");
  return slugs
    .filter((s) => s.slug === "bharat-ka-bhautik-bhugol-mppsc-mains-unit-1-notes")
    .map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const repo = await getContentRepository();
  const article = await repo.getArticle(slug, "en");
  if (!article) return {};

  const seoTitle = formatArticleSeoTitle(article.titleEn || article.title, "en");
  const seoDesc = formatArticleSeoDescription(article.excerptEn || article.excerpt, article.titleEn || article.title, "en");

  return buildMetadata({
    title: seoTitle,
    description: seoDesc,
    path: `/en/mppsc-notes/${slug}`,
    image: article.featuredImage?.url,
    type: "article",
    publishedTime: article.date,
    keywords: article.keywords,
  });
}

export default async function EnglishMppscNotesArticlePage({ params }: Props) {
  const { slug } = await params;
  const repo = await getContentRepository();

  const [article, recentArticlesRes, ads] = await Promise.all([
    repo.getArticle(slug, "en"),
    repo.listArticles({ locale: "en", contentType: "currentAffairs", pageSize: 5 }),
    repo.listAds("en"),
  ]);

  if (!article) notFound();

  const recentArticles = recentArticlesRes.items
    .filter((item) => item.slug !== slug)
    .slice(0, 3);

  const articleUrl = `${siteConfig.url}/en/mppsc-notes/${slug}`;
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: `${siteConfig.url}/en` },
    { name: "MPPSC Notes", url: `${siteConfig.url}/en/mppsc-notes` },
    { name: article.titleEn || article.title, url: articleUrl },
  ]);

  const schemas = [
    articleJsonLd({
      title: article.titleEn || article.title,
      description: article.excerptEn || article.excerpt,
      url: articleUrl,
      image: article.featuredImage?.url ?? `${siteConfig.url}/opengraph-image.png`,
      datePublished: article.date,
      authorName: article.author?.name ?? "Deepraj Sikarwar (Editorial Team)",
    }),
    breadcrumb,
  ];

  if (article.faqs && article.faqs.length > 0) {
    schemas.push(
      faqJsonLd(
        article.faqs.map((f) => ({
          question: f.question,
          answer: f.answer,
        }))
      )
    );
  }

  if (article.mcqs && article.mcqs.length > 0) {
    schemas.push(
      quizJsonLd({
        name: article.titleEn || article.title,
        description: article.excerptEn || article.excerpt,
        url: articleUrl,
        questions: article.mcqs.map((m) => ({
          question: m.question,
          options: m.options || [],
          correctIndex: m.correctIndex,
          explanation: m.explanation,
        })),
      })
    );
  }

  return (
    <>
      <JsonLd data={jsonLdGraph(schemas)} />
      <ReadingProgress />

      <article className="min-h-screen pb-16">
        <ArticleHero article={article} locale="en" />

        <Section className="py-8">
          <Container>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
              <aside className="hidden lg:block lg:col-span-3">
                <div className="sticky top-24 space-y-6">
                  <TableOfContents sections={article.sections ?? []} />
                  <ShareWidget title={article.titleEn || article.title} url={articleUrl} />
                </div>
              </aside>

              <main className="lg:col-span-6 space-y-8">
                <ArticleBody article={article} locale="en" />
                <div className="lg:hidden">
                  <ShareWidget title={article.titleEn || article.title} url={articleUrl} />
                </div>
              </main>

              <aside className="lg:col-span-3 space-y-8">
                <div className="sticky top-24">
                  <ArticleSidebar related={recentArticles} locale="en" ads={ads} />
                </div>
              </aside>
            </div>
          </Container>
        </Section>

        {recentArticles.length > 0 && (
          <Section className="bg-muted/30 border-t border-border py-12">
            <Container>
              <AnimatedSection>
                <RelatedArticles articles={recentArticles} locale="en" />
              </AnimatedSection>
            </Container>
          </Section>
        )}

        <Section className="py-12">
          <Container size="narrow">
            <Newsletter />
          </Container>
        </Section>
      </article>
    </>
  );
}
