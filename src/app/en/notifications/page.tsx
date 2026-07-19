import type { Metadata } from "next";
import { getContentRepository } from "@/lib/content/content-repository";
import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumb } from "@/components/content/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, Bell, ArrowRight, ExternalLink } from "lucide-react";
import { formatDate } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, collectionPageJsonLd, jsonLdGraph } from "@/lib/seo/jsonld";
import { siteConfig } from "@/lib/site-config";
import Link from "next/link";

export const revalidate = 300; // 5 min

export const metadata: Metadata = buildMetadata({
  title: "Exam Notifications",
  description: "Get latest exam notification timelines, details, dates, and official links for UPSC CSE and state PSCs.",
  path: "/en/notifications",
  keywords: ["Exam Notifications", "UPSC Notification", "MPPSC Notification", "Government exams 2026"],
});

export default async function EnglishNotificationsPage() {
  const repo = await getContentRepository();
  const notifications = await repo.listNotifications("en");

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
        return "Active (Out)";
      case "upcoming":
        return "Upcoming";
      case "closed":
        return "Closed";
      default:
        return status;
    }
  };

  const pageUrl = `${siteConfig.url}/en/notifications`;
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: `${siteConfig.url}/en` },
    { name: "Exam Notifications", url: pageUrl },
  ]);

  const collectionPage = collectionPageJsonLd({
    name: "Exam Notifications",
    description: "Get latest exam notification timelines, details, dates, and official links for UPSC CSE and state PSCs.",
    url: pageUrl,
    inLanguage: "en-IN",
    items: notifications.map((n) => ({
      name: n.title,
      url: n.url ?? "",
    })),
  });

  return (
    <>
      <Section className="pb-0 pt-8">
        <Container size="wide">
          <Breadcrumb items={[{ name: "Exam Notifications", href: "/en/notifications" }]} />
          <div className="mt-6">
            <h1 className="text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Latest Exam Notifications
            </h1>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              Instant alerts and consolidated guidelines on eligibility details, registrations, and exam timelines for UPSC and State PSC exams.
            </p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container size="narrow">
          {notifications.length > 0 ? (
            <div className="relative border-l border-border pl-6 space-y-8 ml-3">
              {notifications.map((n) => (
                <div key={n.id} className="relative">
                  {/* Timeline dot */}
                  <span className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-background border-2 border-primary">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  </span>

                  <div className="rounded-2xl border border-border bg-card p-6 shadow-soft space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                          {n.exam}
                        </Badge>
                        <Badge variant="outline" className={getStatusColor(n.status)}>
                          {getStatusLabel(n.status)}
                        </Badge>
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                        <CalendarDays className="h-3.5 w-3.5" />
                        {formatDate(n.date, "en")}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-foreground tracking-tight">
                        <Link href={`/en/notifications/${n.id}`} className="hover:text-primary transition-colors">
                          {n.title}
                        </Link>
                      </h3>
                    </div>

                    <div className="pt-2 flex flex-wrap gap-3">
                      {n.description ? (
                        <Button size="sm" className="rounded-full gap-1 px-4" asChild>
                          <Link href={`/en/notifications/${n.id}`}>
                            View Details <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </Button>
                      ) : n.url ? (
                        <Button size="sm" variant="outline" asChild className="rounded-full">
                          <a href={n.url} target="_blank" rel="noopener noreferrer">
                            Visit Official Link <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                          </a>
                        </Button>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center rounded-2xl border border-dashed border-border p-8">
              <Bell className="h-12 w-12 text-muted-foreground/45 mb-4" />
              <p className="text-lg font-semibold text-foreground">No notifications found</p>
              <p className="mt-2 text-sm text-muted-foreground">
                There are no active exam notifications at this moment. Check back later.
              </p>
            </div>
          )}
        </Container>
      </Section>
      <JsonLd data={jsonLdGraph([breadcrumb, collectionPage])} />
    </>
  );
}
