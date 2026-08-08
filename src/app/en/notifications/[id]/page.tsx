import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContentRepository } from "@/lib/content/content-repository";
import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumb } from "@/components/content/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, ArrowLeft, ExternalLink, Download } from "lucide-react";
import { formatDate } from "@/lib/seo/metadata";
import { VacancyHighlightsTable } from "@/components/vacancy/vacancy-highlights-table";
import { CourseRecommendationCard } from "@/components/vacancy/course-recommendation-card";
import { VacancyRulebookOverview } from "@/components/vacancy/vacancy-rulebook-overview";
import { VacancyVideoEmbed } from "@/components/vacancy/vacancy-video-embed";
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

  return buildMetadata({
    title: `${n.title} — Official Notification & Rulebook Details`,
    description: n.description?.slice(0, 160) || n.title,
    path: `/en/notifications/${id}`,
  });
}

export default async function EnglishNotificationDetailPage({ params }: PageProps) {
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
      case "closed":
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "out":
        return "Active (Apply Now)";
      case "upcoming":
        return "Upcoming";
      case "closed":
        return "Closed";
      default:
        return status;
    }
  };

  return (
    <>
      <Section className="pb-0 pt-8 bg-muted/20 border-b border-border/50">
        <Container size="wide">
          <Breadcrumb
            items={[
              { name: "Exam Notifications", href: "/en/notifications" },
              { name: n.title },
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
              <Badge variant="outline" className={`${getStatusColor(n.status)} font-semibold px-3 py-1 text-xs`}>
                {getStatusLabel(n.status)}
              </Badge>
              {n.totalPosts && (
                <span className="rounded-full bg-accent/15 px-3 py-0.5 text-xs font-extrabold text-accent-foreground border border-accent/20">
                  {n.totalPosts}
                </span>
              )}
              <ShareDropdown title={n.titleEn || n.title} url={pageUrl} locale="en" />
            </div>

            <h1 className="text-balance text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground leading-snug">
              {n.title}
            </h1>

            {n.description && (
              <p className="max-w-3xl text-base text-muted-foreground leading-relaxed">
                {n.description}
              </p>
            )}

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

              <ShareDropdown title={n.titleEn || n.title} url={pageUrl} locale="en" className="w-full sm:w-auto" />
            </div>
          </div>
        </Container>
      </Section>

      <Section className="py-12">
        <Container size="wide">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
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
                    MP Group 2 Sub Group 4 & MP Patwari Recruitment 2026 - 2306 Posts Official Rulebook Banner
                  </figcaption>
                </figure>
              )}

              <VacancyHighlightsTable notification={n} locale="en" />

              {/* YouTube Video Analysis & Masterclass */}
              {(n.youtubeUrl || n.slug?.includes("patwari") || n.id?.includes("patwari")) && (
                <VacancyVideoEmbed
                  videoUrl={n.youtubeUrl || "https://youtu.be/CWBcJ86R2kc"}
                  title={n.titleEn || n.title}
                  locale="en"
                />
              )}

              <VacancyRulebookOverview locale="en" />

              {/* Ending Action Box - PDF & Online Application Links */}
              <div className="rounded-3xl border border-primary/30 bg-primary/5 p-6 sm:p-8 space-y-4 shadow-soft">
                <h4 className="font-extrabold text-foreground text-lg border-b border-border/60 pb-3">
                  MPESB Patwari Recruitment 2026 Official Links
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Download official Rulebook PDF or apply directly via MP Online Application Portal:
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

              <CourseRecommendationCard course={n.suggestedCourse} examCategory={n.exam} locale="en" />
            </main>

            <aside className="lg:col-span-4 space-y-6">
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
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
