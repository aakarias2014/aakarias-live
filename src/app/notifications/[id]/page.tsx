import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContentRepository } from "@/lib/content/content-repository";
import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumb } from "@/components/content/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, ArrowLeft, ExternalLink, Download, Share2, HelpCircle } from "lucide-react";
import { formatDate } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, faqJsonLd, quizJsonLd, jsonLdGraph } from "@/lib/seo/jsonld";
import { siteConfig } from "@/lib/site-config";
import { VacancyHighlightsTable } from "@/components/vacancy/vacancy-highlights-table";
import { CourseRecommendationCard } from "@/components/vacancy/course-recommendation-card";
import { VacancyRulebookOverview } from "@/components/vacancy/vacancy-rulebook-overview";
import { MpsiRulebookOverview } from "@/components/vacancy/mpsi-rulebook-overview";
import { MpsiPaidCourseBanner } from "@/components/vacancy/mpsi-paid-course-banner";
import { VacancyVideoEmbed } from "@/components/vacancy/vacancy-video-embed";
import { ArticleBody } from "@/components/article/article-body";
import { ArticleAdRotator } from "@/components/article/article-ad-rotator";
import { ShareWidget } from "@/components/article/share-widget";
import { ShareDropdown } from "@/components/article/share-dropdown";
import Link from "next/link";
import Image from "next/image";
export const dynamic = "force-dynamic";
export const revalidate = 0;

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const repo = await getContentRepository();
  const n = await repo.getNotification(id, "hi");
  if (!n) return {};

  const isMpsi = id.includes("mpsi") || n.slug?.includes("mpsi");

  const title = isMpsi
    ? "MPSI Vacancy 2026 Notification Out (507 Posts): MP Police Sub Inspector Syllabus, Age Limit & Apply Online"
    : `${n.title} Notification 2026: Total Posts, Age Limit & Apply Online`;

  const description = isMpsi
    ? "MP Police MPSI भर्ती 2026: 507 पद (उप निरीक्षक व सूबेदार) हेतु MPESB आधिकारिक अधिसूचना जारी। देखें MP SI Syllabus in Hindi PDF download, आयु सीमा, परीक्षा तिथि 28 Oct 2026, चयन प्रक्रिया व सैलरी।"
    : n.description?.slice(0, 160) || `${n.title} की आधिकारिक भर्ती अधिसूचना, कुल पदसंख्या, आयु सीमा, शैक्षणिक योग्यता व अंतिम तिथि की संपूर्ण जानकारी।`;

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
    "mp si syllabus in hindi pdf",
    "mp si syllabus 2026 in hindi",
    "mp si syllabus in english",
    "mpsi grade pay",
    "mpsi exam date 2026",
    "mp si cut off 2026",
    "mpesb subedar recruitment 2026",
    "mp police si age limit",
    n.title,
    `${n.exam} Vacancy 2026`,
  ];

  return buildMetadata({
    title,
    description,
    path: `/notifications/${id}`,
    image: ogImageUrl,
    keywords,
  });
}

export default async function NotificationDetailPage({ params }: PageProps) {
  const { id } = await params;
  const repo = await getContentRepository();
  const n = await repo.getNotification(id, "hi");

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

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "out":
        return "आवेदन जारी (Apply Now)";
      case "upcoming":
        return "आगामी भर्ती (Upcoming)";
      case "closing-soon":
        return "अंतिम तिथि निकट (Closing Soon)";
      case "closed":
        return "समाप्त (Closed)";
      default:
        return status;
    }
  };

  const pageUrl = `${siteConfig.url}/notifications/${n.slug || n.id}`;
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    { name: "Exam Notifications", url: `${siteConfig.url}/notifications` },
    { name: n.title, url: pageUrl },
  ]);

  // Google JobPosting JSON-LD Schema for rich snippet ranking
  const jobPostingSchema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: n.title,
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

  // Mandatory Author Article JSON-LD Schema for AI Models (ChatGPT, Gemini, Perplexity, Claude)
  const newsArticleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: n.title,
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
          question: f.question,
          answer: f.answer,
        }))
      )
    );
  }

  return (
    <>
      <Section className="pb-0 pt-8 bg-muted/20 border-b border-border/50">
        <Container size="wide">
          <Breadcrumb
            items={[
              { name: "Exam Notifications", href: "/notifications" },
              { name: n.title },
            ]}
          />
          <div className="mt-4 flex items-center gap-2">
            <Button variant="ghost" size="sm" className="rounded-full gap-1 p-0 px-3 hover:bg-muted text-xs font-bold" asChild>
              <Link href="/notifications">
                <ArrowLeft className="h-3.5 w-3.5" /> सभी वेकेंसी सूची पर वापस जाएं
              </Link>
            </Button>
          </div>

          <div className="mt-6 pb-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 font-bold px-3 py-1 text-xs">
                {n.exam}
              </Badge>
              <Badge variant="outline" className={`${getStatusColor(n.status)} font-semibold px-3 py-1 text-xs`}>
                {getStatusLabel(n.status)}
              </Badge>
              {n.totalPosts && (
                <span className="rounded-full bg-accent/15 px-3 py-0.5 text-xs font-extrabold text-accent-foreground border border-accent/20">
                  {n.totalPosts}
                </span>
              )}
              <ShareDropdown title={n.title} url={pageUrl} locale="hi" />
            </div>

            <h1 className="text-balance text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground leading-snug">
              {n.title}
            </h1>

            {n.description && (
              <p className="max-w-3xl text-base text-muted-foreground leading-relaxed">
                {n.description}
              </p>
            )}

            {/* Direct Action Buttons */}
            <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full max-w-3xl">
              {n.officialPdfUrl && (
                <Button className="w-full sm:w-auto rounded-full bg-primary hover:bg-primary/95 text-white font-bold gap-2 px-5 py-3.5 h-auto text-xs sm:text-sm shadow-md text-center whitespace-normal leading-normal" asChild>
                  <a href={n.officialPdfUrl} target="_blank" rel="noopener noreferrer">
                    <Download className="h-4 w-4 shrink-0" /> Download Official Notification PDF
                  </a>
                </Button>
              )}

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

              <ShareDropdown title={n.title} url={pageUrl} locale="hi" className="w-full sm:w-auto" />
            </div>
          </div>
        </Container>
      </Section>

      <Section className="py-12">
        <Container size="wide">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            {/* Left Content Column */}
            <main className="lg:col-span-8 space-y-8 min-w-0">
              {/* Official Article Thumbnail Banner with ALT Tag */}
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
                    {n.featuredImage?.caption || "मध्य प्रदेश समूह-02 उपसमूह-04 एवं पटवारी भर्ती परीक्षा 2026 - 2306 पद आधिकारिक रूलबुक व भर्ती बैनर"}
                  </figcaption>
                </figure>
              )}

              {/* Quick Job Highlights Table */}
              <VacancyHighlightsTable notification={n} locale="hi" />

              {/* YouTube Video Analysis & Masterclass */}
              {(n.youtubeUrl || n.slug?.includes("patwari") || n.id?.includes("patwari")) && (
                <VacancyVideoEmbed
                  videoUrl={n.youtubeUrl || "https://youtu.be/CWBcJ86R2kc"}
                  title={n.title}
                  locale="hi"
                />
              )}

              {/* Rich Visual Rulebook Overview for Patwari, MPSI or Dynamic Article Body */}
              {n.slug?.includes("patwari") ? (
                <VacancyRulebookOverview locale="hi" />
              ) : (n.slug?.includes("mpsi") || n.id?.includes("mpsi")) ? (
                <div className="space-y-8">
                  <MpsiRulebookOverview locale="hi" />
                  {(n.faqs && n.faqs.length > 0) && (
                    <div className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-soft">
                      <ArticleBody
                        article={{
                          id: n.id,
                          slug: n.slug || n.id,
                          title: n.title,
                          excerpt: n.description || "",
                          date: n.date,
                          readingTime: 5,
                          locale: "hi",
                          href: `/notifications/${n.slug || n.id}`,
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
                        title: n.title,
                        excerpt: n.description || "",
                        date: n.date,
                        readingTime: 5,
                        locale: "hi",
                        href: `/notifications/${n.slug || n.id}`,
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

              {/* Ending Action Box - PDF & Online Application Links */}
              <div className="rounded-3xl border border-primary/30 bg-primary/5 p-6 sm:p-8 space-y-4 shadow-soft">
                <h4 className="font-extrabold text-foreground text-lg border-b border-border/60 pb-3">
                  {n.title} महत्वपूर्ण डायरेक्ट लिंक्स (Official Links)
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  आधिकारिक नियमपुस्तिका (Rulebook PDF) डाउनलोड करें अथवा MP Online कियोस्क/पोर्टल के माध्यम से सीधे फॉर्म भरें:
                </p>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1 w-full">
                  {n.officialPdfUrl && (
                    <Button className="w-full sm:w-auto rounded-full bg-primary hover:bg-primary/95 text-white font-bold gap-2 px-5 py-3.5 h-auto text-xs sm:text-sm shadow-md text-center whitespace-normal leading-normal" asChild>
                      <a href={n.officialPdfUrl} target="_blank" rel="noopener noreferrer">
                        <Download className="h-4 w-4 shrink-0" /> Download Official Notification PDF
                      </a>
                    </Button>
                  )}
                  {n.applyOnlineUrl && (
                    <Button variant="outline" className="w-full sm:w-auto rounded-full font-bold gap-2 px-5 py-3.5 h-auto text-xs sm:text-sm border-primary/40 text-primary hover:bg-primary/10 text-center whitespace-normal leading-normal" asChild>
                      <a href={n.applyOnlineUrl} target="_blank" rel="noopener noreferrer">
                        Online Application Portal <ExternalLink className="h-4 w-4 shrink-0" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>

              {/* Course Cross Promotion Card */}
              {(n.slug?.includes("mpsi") || n.id?.includes("mpsi")) ? (
                <MpsiPaidCourseBanner variant="full" locale="hi" />
              ) : (
                <CourseRecommendationCard
                  course={n.suggestedCourse}
                  examCategory={n.exam}
                  locale="hi"
                />
              )}

              <ShareWidget title={n.title} url={pageUrl} />
            </main>

            {/* Right Sidebar */}
            <aside className="lg:col-span-4 space-y-6">
              {/* Right Sidebar MPSI Paid Course Card */}
              {(n.slug?.includes("mpsi") || n.id?.includes("mpsi")) && (
                <MpsiPaidCourseBanner variant="sidebar" locale="hi" />
              )}
              {/* WhatsApp Alert Card */}
              <div className="rounded-3xl border border-emerald-500/30 bg-emerald-500/10 p-6 shadow-soft space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-white font-bold text-lg shadow-sm">
                    WA
                  </div>
                  <div>
                    <h4 className="font-extrabold text-foreground text-base">WhatsApp Job Alert</h4>
                    <p className="text-xs text-muted-foreground">फ्री परीक्षा अपडेट्स व नोट्स</p>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  इस भर्ती से जुड़ी अगली तिथियां, उत्तर कुंजी (Answer Key) व रिज़ल्ट अलर्ट तुरंत व्हाट्सएप पर प्राप्त करें।
                </p>

                <Button className="w-full rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs gap-1.5 shadow-md py-5" asChild>
                  <a href={siteConfig.links.whatsapp} target="_blank" rel="noopener noreferrer">
                    व्हाट्सएप चैनल से जुड़ें
                  </a>
                </Button>
              </div>

              {/* Preparation Material Box */}
              <div className="rounded-3xl border border-border bg-card p-6 shadow-soft space-y-4">
                <h4 className="font-extrabold text-foreground text-base border-b border-border pb-3">
                  🎓 आकार IAS कोचिंग बैचेस
                </h4>
                <div className="space-y-3">
                  <Link href="/online-courses" className="block rounded-2xl p-4 bg-muted/40 border border-border/40 hover:border-primary/40 transition-all">
                    <h5 className="font-bold text-foreground text-sm">MPPSC Mains Live Target Batch</h5>
                    <p className="text-xs text-muted-foreground mt-1">संपूर्ण 6 पेपर्स की लाइव क्लासेस व मॉडल आंसर नोट्स।</p>
                  </Link>
                  <Link href="/test-series" className="block rounded-2xl p-4 bg-muted/40 border border-border/40 hover:border-primary/40 transition-all">
                    <h5 className="font-bold text-foreground text-sm">MPPSC & UPSC Test Series 2026</h5>
                    <p className="text-xs text-muted-foreground mt-1">अनुभवी फैकल्टी द्वारा तैयार मूल्यांकन उत्तर पुस्तिकाएं।</p>
                  </Link>
                </div>
              </div>

              {/* Sponsored Ad Rotator Card at the bottom of Right Sidebar */}
              <ArticleAdRotator locale="hi" />
            </aside>
          </div>
        </Container>
      </Section>
      <JsonLd data={jsonLdGraph(schemas)} />
    </>
  );
}
