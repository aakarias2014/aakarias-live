import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContentRepository } from "@/lib/content/content-repository";
import { buildMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, articleJsonLd, faqJsonLd, quizJsonLd, jsonLdGraph } from "@/lib/seo/jsonld";
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

export const revalidate = 3600;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const repo = await getContentRepository();
  const slugs = await repo.getAllSlugs("en", "staticGk");
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const repo = await getContentRepository();
  const article = await repo.getArticle(slug, "en");
  if (!article) return {};

  return buildMetadata({
    title: article.title,
    description: article.excerpt,
    path: article.href,
    image: article.featuredImage?.url,
    type: "article",
    publishedTime: article.date,
    keywords: article.keywords,
  });
}

export default async function GeneralAwarenessArticlePage({ params }: Props) {
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

  const articleUrl = `${siteConfig.url}${article.href}`;
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    { name: "General Awareness", url: `${siteConfig.url}/en/general-awareness` },
    { name: article.title, url: articleUrl },
  ]);

  const schemas = [
    articleJsonLd({
      title: article.title,
      description: article.excerpt,
      url: articleUrl,
      image: article.featuredImage?.url ?? `${siteConfig.url}/opengraph-image.png`,
      datePublished: article.date,
      authorName: article.author?.name ?? siteConfig.name,
      keywords: article.keywords,
      inLanguage: "en-US",
    }),
    breadcrumb,
  ];

  if (article.faqs && article.faqs.length > 0) {
    schemas.push(faqJsonLd(article.faqs));
  } else {
    const autoFaqs = [
      {
        question: `Why is ${article.title} in the news recently?`,
        answer: article.excerpt || `Detailed analysis and key highlights regarding ${article.title} are covered in this article.`,
      },
      {
        question: `How is ${article.title} relevant to General Studies (GS) syllabus?`,
        answer: `${article.title} is primarily relevant to the civil services exam under the topics of ${article.syllabus?.join(", ") || "important syllabus subjects"}.`,
      },
    ];
    schemas.push(faqJsonLd(autoFaqs));
  }

  if (article.mcqs && article.mcqs.length > 0) {
    schemas.push(
      quizJsonLd({
        name: `${article.title} Practice MCQs`,
        description: `Practice multiple-choice questions (MCQs) and detailed answers related to this topic.`,
        url: articleUrl,
        questions: article.mcqs,
      })
    );
  }



  return (
    <>
      <ReadingProgress />
      <AnimatedSection variant="fade-in" duration={0.8}>
        <ArticleHero article={article} />
      </AnimatedSection>
      <AnimatedSection variant="fade-up" duration={0.6} delay={0.15}>
        <Container size="wide" className="mt-12 flex flex-col gap-12 pb-16 lg:flex-row">
          {/* Article body */}
          <article className="min-w-0 max-w-3xl flex-1">
            <ArticleBody article={article} ads={ads} />
            <div className="mt-8 border-t border-border/40 pt-6">
              <ShareWidget
                title={article.title}
                url={articleUrl}
                locale="en"
              />
            </div>
          </article>

          {/* Desktop left sidebar: TOC */}
          {article.tableOfContents.length > 0 && (
            <aside className="hidden w-64 shrink-0 xl:block order-first">
              <TableOfContents items={article.tableOfContents} />
            </aside>
          )}

          {/* Desktop right sidebar: PDF download + related */}
          <ArticleSidebar related={article.related} recent={recentArticles} locale="en" ads={ads} />
        </Container>
      </AnimatedSection>

      {/* Related articles */}
      {article.related && article.related.length > 0 && (
        <Section className="border-t border-border/40 bg-muted/10 py-16">
          <Container size="wide">
            <RelatedArticles articles={article.related} />
          </Container>
        </Section>
      )}

      {/* Newsletter */}
      <Section className="border-t border-border/40 py-16">
        <Container>
          <Newsletter variant="section" />
        </Container>
      </Section>

      <JsonLd data={jsonLdGraph(schemas)} />
    </>
  );
}
