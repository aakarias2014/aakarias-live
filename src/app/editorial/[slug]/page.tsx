import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContentRepository } from "@/lib/content/content-repository";
import { buildMetadata, formatArticleSeoTitle, formatArticleSeoDescription } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, articleJsonLd, faqJsonLd, quizJsonLd, jsonLdGraph } from "@/lib/seo/jsonld";
import { ArticleHero } from "@/components/article/article-hero";
import { ArticleBody } from "@/components/article/article-body";
import { TableOfContents } from "@/components/article/table-of-contents";
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
  const slugs = await repo.getAllSlugs("hi", "editorial");
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const repo = await getContentRepository();
  const article = await repo.getArticle(slug, "hi");
  if (!article) return {};

  const seoTitle = formatArticleSeoTitle(article.title, "hi");
  const seoDesc = formatArticleSeoDescription(article.excerpt, article.title, "hi");

  return buildMetadata({
    title: seoTitle,
    description: seoDesc,
    path: article.href,
    image: article.featuredImage?.url,
    type: "article",
    publishedTime: article.date,
    keywords: article.keywords,
  });
}

export default async function EditorialArticlePage({ params }: Props) {
  const { slug } = await params;
  const repo = await getContentRepository();
  const article = await repo.getArticle(slug, "hi");

  if (!article) notFound();

  const articleUrl = `${siteConfig.url}${article.href}`;
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    { name: "Editorials", url: `${siteConfig.url}/editorial` },
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
      inLanguage: "hi-IN",
    }),
    breadcrumb,
  ];

  if (article.faqs && article.faqs.length > 0) {
    schemas.push(faqJsonLd(article.faqs));
  } else {
    const autoFaqs = [
      {
        question: `हाल ही में ${article.title} चर्चा में क्यों है?`,
        answer: article.excerpt || `${article.title} के बारे में विस्तृत विश्लेषण और प्रमुख तथ्य इस लेख में शामिल किए गए हैं।`,
      },
      {
        question: `${article.title} का सामान्य अध्ययन (GS) पाठ्यक्रम से क्या संबंध है?`,
        answer: `${article.title} मुख्य रूप से सिविल सेवा परीक्षा के ${article.syllabus?.join(", ") || "महत्वपूर्ण विषयों"} से संबंधित है।`,
      },
    ];
    schemas.push(faqJsonLd(autoFaqs));
  }

  if (article.mcqs && article.mcqs.length > 0) {
    schemas.push(
      quizJsonLd({
        name: `${article.title} अभ्यास प्रश्न (Practice MCQs)`,
        description: `लेख से संबंधित अभ्यास बहुविकल्पीय प्रश्न (MCQs) और उनके विस्तृत उत्तर।`,
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
          <article className="min-w-0 max-w-3xl flex-1">
            <ArticleBody article={article} />
            <div className="mt-8 border-t border-border/40 pt-6">
              <ShareWidget
                title={article.title}
                url={`${siteConfig.url}${article.href}`}
                locale="hi"
              />
            </div>
          </article>
          {article.tableOfContents.length > 0 && (
            <aside className="hidden w-64 shrink-0 lg:block">
              <TableOfContents items={article.tableOfContents} />
            </aside>
          )}
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
