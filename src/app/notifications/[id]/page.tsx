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
import { ArticleBody } from "@/components/article/article-body";
import { ShareWidget } from "@/components/article/share-widget";
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

  const title = `${n.title} Notification 2026: Total Posts, Age Limit & Apply Online`;
  const description = n.description?.slice(0, 160) || `${n.title} की आधिकारिक भर्ती अधिसूचना, कुल पदसंख्या, आयु सीमा, शैक्षणिक योग्यता व अंतिम तिथि की संपूर्ण जानकारी।`;

  return buildMetadata({
    title,
    description,
    path: `/notifications/${id}`,
    keywords: [
      n.title,
      `${n.exam} Vacancy 2026`,
      "Job Notification PDF",
      "Sarkari Result Notification",
      "Apply Online Link"
    ],
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
    datePosted: n.date,
    validThrough: n.endDate
      ? (n.endDate.includes("T") ? n.endDate : `${n.endDate}T23:59:59Z`)
      : undefined,
    employmentType: "FULL_TIME",
    hiringOrganization: {
      "@type": "Organization",
      name: n.exam || "Government Service Commission",
      sameAs: siteConfig.url,
      logo: `${siteConfig.url}/logo.png`
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Indore",
        addressRegion: "Madhya Pradesh",
        addressCountry: "IN"
      }
    }
  };

  const schemas: any[] = [breadcrumb, jobPostingSchema];

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
            <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full max-w-2xl">
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
              {(n.slug?.includes("patwari") || n.id?.includes("patwari")) && (
                <figure className="overflow-hidden rounded-3xl border border-sky-300 dark:border-sky-800 bg-card shadow-soft-lg">
                  <Image
                    src="/images/notifications/mp-patwari-group-2-subgroup-4-bharti-2026-thumbnail.jpg"
                    alt="MP Group 2 Sub Group 4, MP Patwari 2026 Vacancy Out 2306 Posts Official Notification Rulebook"
                    width={1200}
                    height={675}
                    className="w-full h-auto object-cover"
                    priority
                  />
                  <figcaption className="p-3 text-center text-xs text-muted-foreground bg-muted/30 border-t border-border/40 font-semibold">
                    मध्य प्रदेश समूह-02 उपसमूह-04 एवं पटवारी भर्ती परीक्षा 2026 - 2306 पद आधिकारिक रूलबुक व भर्ती बैनर
                  </figcaption>
                </figure>
              )}

              {/* Quick Job Highlights Table */}
              <VacancyHighlightsTable notification={n} locale="hi" />

              {/* Rich Visual Rulebook Overview for Patwari / ESB / Major Vacancies */}
              {(n.slug?.includes("patwari") || n.exam?.includes("ESB") || n.exam?.includes("VYAPAM") || n.exam?.includes("MPPSC")) ? (
                <VacancyRulebookOverview locale="hi" />
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
                        readingTime: 3,
                        locale: "hi",
                        href: `/notifications/${n.slug || n.id}`,
                        type: "article",
                        sections: n.sections || [],
                        body: n.body || [],
                        mcqs: n.mcqs || [],
                        faqs: n.faqs || [],
                      } as any}
                    />
                  </div>
                )
              )}

              {/* Ending Action Box - PDF & Online Application Links */}
              <div className="rounded-3xl border border-primary/30 bg-primary/5 p-6 sm:p-8 space-y-4 shadow-soft">
                <h4 className="font-extrabold text-foreground text-lg border-b border-border/60 pb-3">
                  MPESB पटवारी भर्ती 2026 महत्वपूर्ण डायरेक्ट लिंक्स (Official Links)
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
              <CourseRecommendationCard
                course={n.suggestedCourse}
                examCategory={n.exam}
                locale="hi"
              />

              <ShareWidget title={n.title} url={pageUrl} />
            </main>

            {/* Right Sidebar */}
            <aside className="lg:col-span-4 space-y-6">
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
            </aside>
          </div>
        </Container>
      </Section>
      <JsonLd data={jsonLdGraph(schemas)} />
    </>
  );
}
