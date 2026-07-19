import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContentRepository } from "@/lib/content/content-repository";
import { buildMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, articleJsonLd, faqJsonLd, quizJsonLd, jsonLdGraph } from "@/lib/seo/jsonld";
import { ArticleHero } from "@/components/article/article-hero";
import { ArticleBody } from "@/components/article/article-body";
import { ReadingProgress } from "@/components/article/reading-progress";
import { RelatedArticles } from "@/components/article/related-articles";
import { Newsletter } from "@/components/content/newsletter";
import { Container } from "@/components/layout/container";
import { ShareWidget } from "@/components/article/share-widget";
import { AnimatedSection } from "@/components/ui/animated-section";
import { siteConfig } from "@/lib/site-config";

export const revalidate = 3600;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const repo = await getContentRepository();
  const slugs = await repo.getAllSlugs("en", "blog");
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
    path: `/en/blog/${slug}`,
    image: article.featuredImage?.url,
    type: "article",
    publishedTime: article.date,
    keywords: article.keywords,
  });
}

export default async function EnglishBlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const repo = await getContentRepository();
  const article = await repo.getArticle(slug, "en");

  if (!article) notFound();

  const articleUrl = `${siteConfig.url}${article.href}`;
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: `${siteConfig.url}/en` },
    { name: "Blog", url: `${siteConfig.url}/en/blog` },
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
      inLanguage: "en-IN",
    }),
    breadcrumb,
  ];

  if (article.faqs && article.faqs.length > 0) {
    schemas.push(faqJsonLd(article.faqs));
  } else {
    const autoFaqs = [
      {
        question: `Why is ${article.title} in the news recently?`,
        answer: article.excerpt || `This article provides complete detail and background analysis of the key highlights regarding ${article.title}.`,
      },
      {
        question: `What is the significance of ${article.title} for UPSC and MPPSC CSE?`,
        answer: `${article.title} is relevant for Civil Services examinations under ${article.syllabus?.join(", ") || "General Studies (GS)"} syllabus divisions.`,
      },
    ];
    schemas.push(faqJsonLd(autoFaqs));
  }

  if (article.mcqs && article.mcqs.length > 0) {
    schemas.push(
      quizJsonLd({
        name: `${article.title} Practice MCQs`,
        description: `Practice MCQs and test your knowledge about ${article.title}.`,
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
        <Container size="wide" className="mt-12 flex flex-col gap-12 pb-16 lg:flex-row justify-center">
          <article className="min-w-0 max-w-3xl flex-1">
            <ArticleBody article={article} />
            <div className="mt-8 border-t border-border/40 pt-6">
              <ShareWidget
                title={article.title}
                url={`${siteConfig.url}${article.href}`}
                locale="en"
              />
            </div>
          </article>
        </Container>
      </AnimatedSection>
      <AnimatedSection variant="fade-up" duration={0.6}>
        <RelatedArticles articles={article.related} />
      </AnimatedSection>
      <AnimatedSection variant="fade-up" duration={0.6}>
        <Container size="narrow" className="pb-16">
          <Newsletter variant="section" />
        </Container>
      </AnimatedSection>
      <JsonLd data={jsonLdGraph(schemas)} />
    </>
  );
}
