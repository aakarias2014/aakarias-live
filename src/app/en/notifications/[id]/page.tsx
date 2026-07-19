import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContentRepository } from "@/lib/content/content-repository";
import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumb } from "@/components/content/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, ArrowLeft, ExternalLink } from "lucide-react";
import { formatDate } from "@/lib/seo/metadata";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const repo = await getContentRepository();
  const n = await repo.getNotification(id, "en");
  if (!n) return {};

  return buildMetadata({
    title: `${n.title} — Aakar IAS Update`,
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
        return "Active (Out)";
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
      <Section className="pb-0 pt-8">
        <Container size="narrow">
          <Breadcrumb
            items={[
              { name: "Exam Notifications", href: "/en/notifications" },
              { name: "Detail" },
            ]}
          />
          <div className="mt-6 flex items-center gap-2">
            <Button variant="ghost" size="sm" className="rounded-full gap-1 p-0 px-3 hover:bg-muted" asChild>
              <Link href="/en/notifications">
                <ArrowLeft className="h-4 w-4" /> Go Back
              </Link>
            </Button>
          </div>
        </Container>
      </Section>

      <Section className="pt-6 pb-20">
        <Container size="narrow">
          <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-soft-lg space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
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

            <div className="space-y-4">
              <h1 className="text-xl md:text-2xl font-extrabold text-foreground tracking-tight leading-snug">
                {n.title}
              </h1>
              {n.description && (
                <div className="space-y-3 font-sans">
                  {n.description.split("\n").map((line, idx) => {
                    const trimmed = line.trim();
                    if (!trimmed) return <div key={idx} className="h-2" />;

                    // Emoji list pattern match
                    const match = trimmed.match(/^([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])\s*(.*)$/);
                    if (match) {
                      const emoji = match[1];
                      const content = match[2];
                      
                      const isWinnerTitle = emoji === "🏆";
                      const isWinnerNames = emoji === "🥇" || emoji === "🥈" || emoji === "🥉";
                      const isCheck = emoji === "✅";
                      
                      if (isWinnerTitle) {
                        return (
                          <div key={idx} className="flex items-center gap-2.5 bg-amber-500/10 border-l-4 border-amber-500 rounded-r-lg my-3 p-3">
                            <span className="text-xl shrink-0 select-none">{emoji}</span>
                            <span className="text-sm md:text-base font-extrabold text-amber-900 dark:text-amber-300">
                              {content}
                            </span>
                          </div>
                        );
                      }

                      if (isWinnerNames) {
                        return (
                          <div key={idx} className="flex items-center gap-3 pl-4 py-1.5 border-l border-border hover:border-primary/50 transition-colors">
                            <span className="text-lg shrink-0 select-none">{emoji}</span>
                            <span className="text-sm md:text-base font-bold text-foreground">
                              {content}
                            </span>
                          </div>
                        );
                      }

                      return (
                        <div key={idx} className="flex items-start gap-3 pl-2 py-1">
                          <span className="text-lg shrink-0 select-none text-primary">{emoji}</span>
                          <span className="text-sm md:text-base text-muted-foreground leading-relaxed">
                            {content}
                          </span>
                        </div>
                      );
                    }

                    return (
                      <p key={idx} className="text-sm md:text-base text-muted-foreground leading-relaxed">
                        {line}
                      </p>
                    );
                  })}
                </div>
              )}
            </div>

            {n.url && (
              <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-center gap-3">
                {n.url.includes("wa.me") || n.url.includes("whatsapp.com") ? (
                  <Button className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20ba5a] text-white border-0 font-bold rounded-full gap-1.5 shadow-md px-6 py-5 text-sm" asChild>
                    <a href={n.url} target="_blank" rel="noopener noreferrer">
                      <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.458L0 24zm6.59-4.846c1.6.95 3.498 1.452 5.418 1.453 5.441 0 9.866-4.42 9.869-9.866.002-2.637-1.023-5.116-2.887-6.98-1.864-1.865-4.343-2.891-6.983-2.893-5.452 0-9.882 4.419-9.886 9.868-.002 1.832.48 3.626 1.396 5.204l-.993 3.629 3.719-.975zm11.167-7.25c-.29-.145-1.716-.848-1.983-.946-.266-.097-.459-.145-.653.146-.193.29-.749.946-.918 1.14-.169.193-.338.217-.628.072-.29-.145-1.226-.452-2.336-1.442-.864-.77-1.447-1.72-1.616-2.011-.169-.29-.018-.447.127-.591.13-.13.29-.339.435-.509.145-.17.193-.29.29-.484.097-.193.048-.363-.024-.509-.072-.145-.653-1.573-.894-2.154-.236-.569-.475-.492-.653-.501-.17-.008-.363-.01-.556-.01-.193 0-.507.072-.773.363-.266.29-1.014.992-1.014 2.42 0 1.428 1.039 2.808 1.184 3.002.145.193 2.044 3.12 4.953 4.375.692.298 1.233.477 1.655.61.696.22 1.328.19 1.829.115.557-.084 1.717-.701 1.958-1.378.24-.677.24-1.258.17-1.378-.072-.12-.266-.193-.556-.339z"/>
                      </svg>
                      Chat on WhatsApp
                    </a>
                  </Button>
                ) : (
                  <Button className="w-full sm:w-auto rounded-full gap-1.5 px-6 py-5 text-sm" asChild>
                    <a href={n.url} target="_blank" rel="noopener noreferrer">
                      Visit Official Link <ExternalLink className="ml-1.5 h-4 w-4" />
                    </a>
                  </Button>
                )}
              </div>
            )}
          </div>
        </Container>
      </Section>
    </>
  );
}
