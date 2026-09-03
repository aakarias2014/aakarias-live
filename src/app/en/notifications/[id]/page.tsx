import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContentRepository } from "@/lib/content/content-repository";
import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumb } from "@/components/content/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, ArrowLeft, ExternalLink, Download, FileText } from "lucide-react";
import { formatDate } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, faqJsonLd, quizJsonLd, jsonLdGraph } from "@/lib/seo/jsonld";
import { VacancyHighlightsTable } from "@/components/vacancy/vacancy-highlights-table";
import { CourseRecommendationCard } from "@/components/vacancy/course-recommendation-card";
import { VacancyRulebookOverview } from "@/components/vacancy/vacancy-rulebook-overview";
import { MpsiRulebookOverview } from "@/components/vacancy/mpsi-rulebook-overview";
import { MpsiPaidCourseBanner } from "@/components/vacancy/mpsi-paid-course-banner";
import { VacancyVideoEmbed } from "@/components/vacancy/vacancy-video-embed";
import { ArticleBody } from "@/components/article/article-body";
import { ArticleAdRotator } from "@/components/article/article-ad-rotator";
import { ShareDropdown } from "@/components/article/share-dropdown";
import { siteConfig } from "@/lib/site-config";
import Link from "next/link";
import Image from "next/image";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const repo = await getContentRepository();
  const n = await repo.getNotification(id, "en");
  if (!n) return {};

  const isMpsi = id.includes("mpsi") || n.slug?.includes("mpsi");

  const title = isMpsi
    ? "MPSI Vacancy 2026 Out (507 Posts): MP Police Sub Inspector Notification, Syllabus PDF, Age Limit & Online Form"
    : `${n.titleEn || n.title} Notification 2026: Total Posts, Age Limit & Apply Online`;

  const description = isMpsi
    ? "MP Police MPSI Recruitment 2026: Notification out for 507 posts (Sub-Inspector & Subedar). Check MP SI syllabus in Hindi/English PDF, age limit, selection process, salary Level 9 & apply online link."
    : n.description?.slice(0, 160) || `Official notification details, total vacancies, age limit, eligibility, and direct apply link for ${n.titleEn || n.title}.`;

  const ogImageUrl = isMpsi
    ? `${siteConfig.url}/images/notifications/mpsi-recruitment-2026-thumbnail.png`
    : (n.slug?.includes("patwari") || id.includes("patwari"))
    ? `${siteConfig.url}/images/notifications/mp-patwari-group-2-subgroup-4-bharti-2026-thumbnail.jpg`
    : n.featuredImage?.url;

  const keywords = [
    "mpsi vacancy 2026",
    "mpsi 2026 vacancy",
    "mpsi notification 2026",
    "mp si syllabus 2026",
    "mp si syllabus 2026 pdf download",
    "mp si syllabus in english",
    "mp si syllabus 2026 in english",
    "mpsi grade pay",
    "mpsi exam date 2026",
    "mp si cut off 2026",
    "mpesb subedar recruitment 2026",
    "mp police si age limit",
    n.titleEn || n.title,
    `${n.exam} Vacancy 2026`,
  ];

  return buildMetadata({
    title,
    description,
    path: `/en/notifications/${id}`,
    image: ogImageUrl,
    keywords,
    locale: "en",
  });
}

export default async function EnNotificationDetailPage({ params }: PageProps) {
  const { id } = await params;
  const repo = await getContentRepository();
  const n = await repo.getNotification(id, "en");

  if (!n) {
    notFound();
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "out":
        return "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20";
      case "upcoming":
        return "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20";
      case "closing-soon":
        return "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20";
      case "closed":
        return "bg-muted text-muted-foreground border-border";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const pageUrl = `${siteConfig.url}/en/notifications/${n.slug || n.id}`;
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    { name: "Exam Notifications", url: `${siteConfig.url}/en/notifications` },
    { name: n.titleEn || n.title, url: pageUrl },
  ]);

  const jobPostingSchema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: n.titleEn || n.title,
    description: n.description || n.title,
    datePosted: n.date || "2026-09-01",
    validThrough: n.endDate
      ? (n.endDate.includes("T") ? n.endDate : `${n.endDate}T23:59:59Z`)
      : "2026-09-23T23:59:59Z",
    employmentType: "FULL_TIME",
    hiringOrganization: {
      "@type": "Organization",
      name: "Madhya Pradesh Employees Selection Board (MPESB) / MP Police HQ Bhopal",
      sameAs: "https://esb.mp.gov.in",
      logo: `${siteConfig.url}/logo.png`
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bhopal",
        addressRegion: "Madhya Pradesh",
        addressCountry: "IN"
      }
    },
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: "INR",
      value: {
        "@type": "QuantitativeValue",
        minValue: 36200,
        maxValue: 114800,
        unitText: "MONTH"
      }
    }
  };

  const newsArticleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: n.titleEn || n.title,
    description: n.description || n.title,
    image: [n.featuredImage?.url || `${siteConfig.url}/images/notifications/mpsi-recruitment-2026-thumbnail.png`],
    datePublished: n.date || "2026-09-01T00:00:00Z",
    dateModified: "2026-09-02T00:00:00Z",
    author: {
      "@type": "Person",
      name: "Deepraj Sikarwar (Editorial Team)",
      jobTitle: "Chief Editor & MPPSC/MPSI Exam Expert",
      worksFor: {
        "@type": "Organization",
        name: "Aakar IAS",
        url: siteConfig.url
      }
    },
    publisher: {
      "@type": "Organization",
      name: "Aakar IAS",
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/logo.png`
      }
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl
    }
  };

  const schemas: any[] = [breadcrumb, jobPostingSchema, newsArticleSchema];

  if (n.faqs && n.faqs.length > 0) {
    schemas.push(
      faqJsonLd(
        n.faqs.map((f) => ({
          question: f.questionEn || f.question,
          answer: f.answerEn || f.answer,
        }))
      )
    );
  }

  return (
    <>
      <JsonLd data={jsonLdGraph(schemas)} />
      <Section className="pb-0 pt-8 bg-muted/20 border-b border-border/50">
        <Container size="wide">
          <Breadcrumb
            items={[
              { name: "Exam Notifications", href: "/en/notifications" },
              { name: n.titleEn || n.title },
            ]}
          />
          <div className="mt-4 flex items-center gap-2">
            <Button variant="ghost" size="sm" className="rounded-full gap-1 p-0 px-3 hover:bg-muted text-xs font-bold" asChild>
              <Link href="/en/notifications">
                <ArrowLeft className="h-3.5 w-3.5" /> Back to All Vacancies
              </Link>
            </Button>
          </div>

          <div className="mt-6 pb-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 font-bold px-3 py-1 text-xs">
                {n.exam}
              </Badge>
              <Badge variant="outline" className={`${getStatusColor(n.status)} font-semibold px-3 py-1 text-xs uppercase`}>
                {n.status}
              </Badge>
              {n.totalPosts && (
                <span className="rounded-full bg-accent/15 px-3 py-0.5 text-xs font-extrabold text-accent-foreground border border-accent/20">
                  {n.totalPosts}
                </span>
              )}
              <ShareDropdown title={n.titleEn || n.title} url={pageUrl} locale="en" />
            </div>

            <h1 className="text-balance text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground leading-snug">
              {n.titleEn || n.title}
            </h1>

            {n.description && (
              <p className="max-w-3xl text-base text-muted-foreground leading-relaxed">
                {n.description}
              </p>
            )}

            {/* Direct Action Buttons */}
            <div className="pt-3 flex flex-wrap items-center gap-3 w-full max-w-4xl">
              {n.officialPdfUrl && (
                <Button className="w-full sm:w-auto rounded-full bg-primary hover:bg-primary/95 text-white font-bold gap-2 px-5 py-3.5 h-auto text-xs sm:text-sm shadow-md text-center whitespace-normal leading-normal" asChild>
                  <a href={n.officialPdfUrl} target="_blank" rel="noopener noreferrer">
                    <Download className="h-4 w-4 shrink-0" /> Download Official Notification PDF
                  </a>
                </Button>
              )}

              <Button className="w-full sm:w-auto rounded-full bg-amber-600 hover:bg-amber-700 text-white font-bold gap-2 px-5 py-3.5 h-auto text-xs sm:text-sm shadow-md text-center whitespace-normal leading-normal" asChild>
                <a href="https://drive.google.com/file/d/1Db_HqaZzTvqSN5NQa-BEthIh1dv4un6J/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                  <FileText className="h-4 w-4 shrink-0" /> Download Syllabus PDF
                </a>
              </Button>

              {n.applyOnlineUrl && (
                <Button variant="outline" className="w-full sm:w-auto rounded-full font-bold gap-2 px-5 py-3.5 h-auto text-xs sm:text-sm border-primary/40 text-primary hover:bg-primary/10 text-center whitespace-normal leading-normal" asChild>
                  <a href={n.applyOnlineUrl} target="_blank" rel="noopener noreferrer">
                    Online Application Portal <ExternalLink className="h-4 w-4 shrink-0" />
                  </a>
                </Button>
              )}

              <Button variant="outline" className="w-full sm:w-auto rounded-full font-bold border-emerald-500/40 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 gap-1.5 px-5 py-3.5 h-auto text-xs sm:text-sm text-center whitespace-normal leading-normal" asChild>
                <a href={siteConfig.links.whatsapp} target="_blank" rel="noopener noreferrer">
                  WhatsApp Alert Join
                </a>
              </Button>

              <ShareDropdown title={n.titleEn || n.title} url={pageUrl} locale="en" className="w-full sm:w-auto" />
            </div>
          </div>
        </Container>
      </Section>

      <Section className="py-12">
        <Container size="wide">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <main className="lg:col-span-8 space-y-8 min-w-0">
              {(n.featuredImage || n.slug?.includes("patwari") || n.id?.includes("patwari")) && (
                <figure className="overflow-hidden rounded-3xl border border-sky-300 dark:border-sky-800 bg-card shadow-soft-lg">
                  <Image
                    src={n.featuredImage?.url || "/images/notifications/mp-patwari-group-2-subgroup-4-bharti-2026-thumbnail.jpg"}
                    alt={n.featuredImage?.alt || "MP Group 2 Sub Group 4, MP Patwari 2026 Vacancy Out 2306 Posts Official Notification Rulebook"}
                    width={1200}
                    height={675}
                    className="w-full h-auto object-cover"
                    priority
                  />
                  <figcaption className="p-3 text-center text-xs text-muted-foreground bg-muted/30 border-t border-border/40 font-semibold">
                    {n.featuredImage?.caption || "MP Group 2 Sub Group 4 & MP Patwari Recruitment 2026 - 2306 Posts Official Rulebook Banner"}
                  </figcaption>
                </figure>
              )}

              <VacancyHighlightsTable notification={n} locale="en" />

              {(n.youtubeUrl || n.slug?.includes("patwari") || n.id?.includes("patwari")) && (
                <VacancyVideoEmbed
                  videoUrl={n.youtubeUrl || "https://youtu.be/CWBcJ86R2kc"}
                  title={n.titleEn || n.title}
                  locale="en"
                />
              )}

              {n.slug?.includes("patwari") ? (
                <VacancyRulebookOverview locale="en" />
              ) : (n.slug?.includes("mpsi") || n.id?.includes("mpsi")) ? (
                <div className="space-y-8">
                  <MpsiRulebookOverview locale="en" />
                  {(n.faqs && n.faqs.length > 0) && (
                    <div className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-soft">
                      <ArticleBody
                        article={{
                          id: n.id,
                          slug: n.slug || n.id,
                          title: n.titleEn || n.title,
                          excerpt: n.description || "",
                          date: n.date,
                          readingTime: 5,
                          locale: "en",
                          href: `/en/notifications/${n.slug || n.id}`,
                          type: "article",
                          sections: [],
                          body: [],
                          mcqs: [],
                          faqs: n.faqs || [],
                        } as any}
                      />
                    </div>
                  )}
                </div>
              ) : (
                n.body && n.body.length > 0 && (
                  <div className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-soft">
                    <ArticleBody
                      article={{
                        id: n.id,
                        slug: n.slug || n.id,
                        title: n.titleEn || n.title,
                        excerpt: n.description || "",
                        date: n.date,
                        readingTime: 5,
                        locale: "en",
                        href: `/en/notifications/${n.slug || n.id}`,
                        type: "article",
                        sections: n.sections || [],
                        body: n.body || [],
                        mcqs: [],
                        faqs: n.faqs || [],
                      } as any}
                    />
                  </div>
                )
              )}

              <div className="rounded-3xl border border-primary/30 bg-primary/5 p-6 sm:p-8 space-y-4 shadow-soft">
                <h4 className="font-extrabold text-foreground text-lg border-b border-border/60 pb-3">
                  {n.titleEn || n.title} Official Links
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Download official Rulebook PDF and detailed Exam Syllabus PDF or apply directly via MP Online Application Portal:
                </p>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1 w-full flex-wrap">
                  {n.officialPdfUrl && (
                    <Button className="w-full sm:w-auto rounded-full bg-primary hover:bg-primary/95 text-white font-bold gap-2 px-5 py-3.5 h-auto text-xs sm:text-sm shadow-md text-center whitespace-normal leading-normal" asChild>
                      <a href={n.officialPdfUrl} target="_blank" rel="noopener noreferrer">
                        <Download className="h-4 w-4 shrink-0" /> Download Official Notification PDF
                      </a>
                    </Button>
                  )}
                  <Button className="w-full sm:w-auto rounded-full bg-amber-600 hover:bg-amber-700 text-white font-bold gap-2 px-5 py-3.5 h-auto text-xs sm:text-sm shadow-md text-center whitespace-normal leading-normal" asChild>
                    <a href="https://drive.google.com/file/d/1Db_HqaZzTvqSN5NQa-BEthIh1dv4un6J/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                      <FileText className="h-4 w-4 shrink-0" /> Download MPSI Syllabus PDF
                    </a>
                  </Button>
                  {n.applyOnlineUrl && (
                    <Button variant="outline" className="w-full sm:w-auto rounded-full font-bold gap-2 px-5 py-3.5 h-auto text-xs sm:text-sm border-primary/40 text-primary hover:bg-primary/10 text-center whitespace-normal leading-normal" asChild>
                      <a href={n.applyOnlineUrl} target="_blank" rel="noopener noreferrer">
                        Online Application Portal <ExternalLink className="h-4 w-4 shrink-0" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>

              {(n.slug?.includes("mpsi") || n.id?.includes("mpsi")) ? (
                <MpsiPaidCourseBanner variant="full" locale="en" />
              ) : (
                <CourseRecommendationCard course={n.suggestedCourse} examCategory={n.exam} locale="en" />
              )}
            </main>

            <aside className="lg:col-span-4 space-y-6">
              {(n.slug?.includes("mpsi") || n.id?.includes("mpsi")) && (
                <MpsiPaidCourseBanner variant="sidebar" locale="en" />
              )}
              <div className="rounded-3xl border border-emerald-500/30 bg-emerald-500/10 p-6 shadow-soft space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-white font-bold text-lg shadow-sm">
                    WA
                  </div>
                  <div>
                    <h4 className="font-extrabold text-foreground text-base">WhatsApp Job Alerts</h4>
                    <p className="text-xs text-muted-foreground">Get updates directly on WhatsApp</p>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  Join Aakar IAS WhatsApp channel for free exam updates, admit card alerts, and test schedules.
                </p>

                <Button className="w-full rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs gap-1.5 shadow-md py-5" asChild>
                  <a href={siteConfig.links.whatsapp} target="_blank" rel="noopener noreferrer">
                    Join WhatsApp Channel
                  </a>
                </Button>
              </div>

              {/* Sponsored Ad Rotator Card at the bottom of Right Sidebar */}
              <ArticleAdRotator locale="en" />
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
