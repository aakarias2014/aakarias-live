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
import { ShareWidget } from "@/components/article/share-widget";
import { AnimatedSection } from "@/components/ui/animated-section";
import { siteConfig } from "@/lib/site-config";
import Link from "next/link";

import { DateBrowserLayout } from "@/components/content/date-browser-layout";

export const revalidate = 3600; // 1h

interface Props {
  params: Promise<{ slug: string }>;
}

const MONTHS_HI = [
  "जनवरी", "फरवरी", "मार्च", "अप्रैल", "मई", "जून",
  "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर"
];

export async function generateStaticParams() {
  const repo = await getContentRepository();
  const [slugs, dates] = await Promise.all([
    repo.getAllSlugs("hi"),
    repo.getAllDatesWithContent()
  ]);
  return [
    ...slugs.map((s) => ({ slug: s.slug })),
    ...dates.map((d) => ({ slug: d }))
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const repo = await getContentRepository();

  if (/^\d{4}-\d{2}-\d{2}$/.test(slug)) {
    const [year, month, day] = slug.split("-").map(Number);
    const monthName = MONTHS_HI[month - 1] || "";
    const formatted = `${day} ${monthName} ${year}`;
    
    return buildMetadata({
      title: `करेंट अफेयर्स ${formatted} — UPSC & MPPSC | Aakar IAS`,
      description: `Aakar IAS द्वारा तैयार ${formatted} के दैनिक करेंट अफेयर्स पढ़ें। UPSC, MPPSC और राज्य PSC परीक्षाओं का व्यापक विश्लेषण।`,
      path: `/current-affairs/${slug}`,
      type: "website",
    });
  }

  const article = await repo.getArticle(slug, "hi");
  if (!article) return {};

  const baseMeta = buildMetadata({
    title: article.title,
    description: article.excerpt,
    path: article.href,
    image: article.featuredImage?.url,
    type: "article",
    publishedTime: article.date,
    keywords: article.keywords,
  });

  if (slug === "jagannath-rath-yatra-2026-complete-notes" || article.keywords?.includes("Rath Yatra") || article.keywords?.includes("Puri")) {
    baseMeta.other = {
      ...baseMeta.other,
      "geo.region": "IN-OR",
      "geo.placename": "Puri, Odisha, India",
      "geo.position": "19.8133;85.8312",
      "ICBM": "19.8133, 85.8312",
    };
  }

  return baseMeta;
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const repo = await getContentRepository();

  if (/^\d{4}-\d{2}-\d{2}$/.test(slug)) {
    const [year, month] = slug.split("-").map(Number);
    const [articlesRes, monthDates, allDates, latestDate, adjacent] = await Promise.all([
      repo.listArticles({ locale: "hi", date: slug, contentType: "currentAffairs", pageSize: 48 }),
      repo.getDatesWithContent(year, month),
      repo.getAllDatesWithContent(),
      repo.getLatestDateWithContent(),
      repo.getAdjacentDates(slug)
    ]);

    return (
      <DateBrowserLayout
        initialDate={slug}
        initialArticles={articlesRes.items}
        initialDatesWithContent={monthDates}
        allDatesWithContent={allDates}
        initialLatestDate={latestDate}
        initialAdjacentDates={adjacent}
        locale="hi"
        initialRange="day"
      />
    );
  }

  const [article, recentArticlesRes, ads] = await Promise.all([
    repo.getArticle(slug, "hi"),
    repo.listArticles({ locale: "hi", contentType: "currentAffairs", pageSize: 5 }),
    repo.listAds("hi")
  ]);
  if (!article) notFound();

  const recentArticles = recentArticlesRes.items
    .filter((item) => item.slug !== slug)
    .slice(0, 3);

  const articleUrl = `${siteConfig.url}${article.href}`;
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    { name: "Current Affairs", url: `${siteConfig.url}/current-affairs` },
    { name: article.title, url: articleUrl },
  ]);

  const schemas: any[] = [
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

  if (slug === "jagannath-rath-yatra-2026-complete-notes" || article.keywords?.includes("Rath Yatra")) {
    schemas.push({
      "@type": "Event",
      "name": "जगन्नाथ रथ यात्रा 2026 (Jagannath Rath Yatra 2026)",
      "description": article.excerpt,
      "startDate": "2026-07-16",
      "endDate": "2026-07-24",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "eventStatus": "https://schema.org/EventScheduled",
      "location": {
        "@type": "Place",
        "name": "श्री जगन्नाथ मंदिर, पुरी, ओडिशा (Shree Jagannath Temple, Puri)",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Jagannath Temple Road",
          "addressLocality": "Puri",
          "addressRegion": "Odisha",
          "postalCode": "752001",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "19.8133",
          "longitude": "85.8312"
        }
      }
    });
  }

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
          {/* Article body */}
          <article className="min-w-0 max-w-3xl flex-1">
            <ArticleBody article={article} ads={ads} />
            <div className="mt-8 border-t border-border/40 pt-6">
              <ShareWidget
                title={article.title}
                url={`${siteConfig.url}${article.href}`}
                locale="hi"
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
          <ArticleSidebar related={article.related} recent={recentArticles} locale="hi" ads={ads} />
        </Container>
      </AnimatedSection>

      <AnimatedSection variant="fade-up" duration={0.6}>
        <RelatedArticles articles={article.related} />
      </AnimatedSection>

      <AnimatedSection variant="fade-up" duration={0.6}>
        <Container size="narrow" className="pb-24 lg:pb-16">
          <Newsletter variant="section" />
        </Container>
      </AnimatedSection>

      {/* Mobile bottom navigation bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center bg-background/95 backdrop-blur-lg border-t border-border px-4 pb-6 pt-2 lg:hidden">
        <Link href="/" className="flex flex-col items-center gap-0.5 text-muted-foreground hover:text-foreground transition-colors">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 9.75L12 3l9 6.75V21a.75.75 0 01-.75.75H3.75A.75.75 0 013 21V9.75z" /></svg>
          <span className="text-[10px] font-medium">मुख्य</span>
        </Link>
        <Link href="/current-affairs" className="flex flex-col items-center gap-0.5 text-muted-foreground hover:text-foreground transition-colors">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" /></svg>
          <span className="text-[10px] font-medium">खोजें</span>
        </Link>
        <Link href="/monthly-pdf" className="flex flex-col items-center gap-0.5 rounded-full bg-primary/10 px-4 py-1 text-primary">
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm1 1.5L18.5 7H15V3.5zM6 4h7v5h5v11H6V4z" /></svg>
          <span className="text-[10px] font-medium">नोट्स</span>
        </Link>
        <Link href="/dashboard" className="flex flex-col items-center gap-0.5 text-muted-foreground hover:text-foreground transition-colors">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 0115 0" /></svg>
          <span className="text-[10px] font-medium">प्रोफ़ाइल</span>
        </Link>
      </nav>

      {/* Structured data */}
      <JsonLd data={jsonLdGraph(schemas)} />
    </>
  );
}
