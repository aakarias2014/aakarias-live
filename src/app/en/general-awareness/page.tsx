import type { Metadata } from "next";
import Link from "next/link";
import { getContentRepository } from "@/lib/content/content-repository";
import { buildMetadata } from "@/lib/seo/metadata";
import { Breadcrumb } from "@/components/content/breadcrumb";
import { ArticleCard } from "@/components/content/article-card";
import { Pagination } from "@/components/content/pagination";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { siteConfig } from "@/lib/site-config";
import {
  Grid,
  History,
  Globe,
  Landmark,
  TrendingUp,
  FlaskConical,
  Cpu,
  MapPin,
  Layers,
  BookOpen
} from "lucide-react";

export const revalidate = 600;

export const metadata: Metadata = buildMetadata({
  title: "General Studies | Aakar IAS",
  description: "Comprehensive study material and articles on Indian History, Geography, Polity, Economics, General Science, Sci & Tech, and General Studies for UPSC & State PSC exams.",
  path: "/en/general-awareness",
  keywords: ["General Studies", "General Awareness", "General Knowledge", "UPSC GS", "MPPSC GS", "Indian History", "Geography"],
});

interface Props {
  searchParams: Promise<{ page?: string; subject?: string }>;
}

const SUBJECTS = [
  { slug: "all", title: "All Subjects", titleEn: "All Subjects", Icon: Grid },
  { slug: "history", title: "Indian History", titleEn: "Indian History", Icon: History },
  { slug: "geography", title: "Geography", titleEn: "Geography", Icon: Globe },
  { slug: "polity", title: "Polity", titleEn: "Polity", Icon: Landmark },
  { slug: "economy", title: "Economics", titleEn: "Economics", Icon: TrendingUp },
  { slug: "general-science", title: "General Science", titleEn: "General Science", Icon: FlaskConical },
  { slug: "science-technology", title: "Science & Technology", titleEn: "Sci & Tech", Icon: Cpu },
  { slug: "mpgk", title: "MP GK", titleEn: "MP GK", Icon: MapPin },
  { slug: "misc", title: "Miscellaneous", titleEn: "Miscellaneous", Icon: Layers },
];

export default async function GeneralAwarenessPage({ searchParams }: Props) {
  const params = await searchParams;
  const repo = await getContentRepository();
  const page = Math.max(1, Number(params.page) || 1);
  const activeSubject = params.subject || "all";

  // Fetch articles. If activeSubject is "all", don't pass category filter.
  const categoryFilter = activeSubject === "all" ? undefined : activeSubject;

  const result = await repo.listArticles({
    locale: "en",
    contentType: "staticGk",
    category: categoryFilter,
    page,
    pageSize: 12,
  });

  return (
    <>
      {/* ─── Hero Header ────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-secondary text-secondary-foreground py-12 sm:py-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--primary)_0%,_transparent_50%)] opacity-20" />
        <Container size="wide" className="relative">
          <Breadcrumb items={[{ name: "General Studies" }]} variant="light" />
          <div className="mt-6 max-w-3xl">
            <h1 className="text-balance text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              General Studies
            </h1>
            <p className="mt-4 text-pretty text-lg text-white/75 sm:text-xl font-devanagari">
              Structured subject-wise study material and reference content for UPSC, MPPSC, and other competitive examinations, integrated with contemporary updates.
            </p>
          </div>
        </Container>
      </section>

      {/* ─── Subject Tabs / Filters ──────────────────────────────── */}
      <Section className="py-8 bg-muted/30 border-b border-border/40">
        <Container size="wide">
          <div className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Filter by Subject
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {SUBJECTS.map((sub) => {
                const isActive = activeSubject === sub.slug;
                const linkHref = sub.slug === "all" ? "/en/general-awareness" : `/en/general-awareness?subject=${sub.slug}`;
                const { Icon } = sub;

                return (
                  <Link
                    key={sub.slug}
                    href={linkHref}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? "bg-primary border-primary text-primary-foreground shadow-md scale-[1.02]"
                        : "bg-background border-border hover:bg-muted/70 text-foreground"
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span>{sub.title}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── Articles List ───────────────────────────────────────── */}
      <Section className="pt-8 pb-16">
        <Container size="wide">
          {result.items.length > 0 ? (
            <>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {result.items.map((a) => (
                  <ArticleCard key={a.id} article={a} />
                ))}
              </div>
              <Pagination
                currentPage={page}
                totalPages={result.totalPages}
                basePath="/en/general-awareness"
                searchParams={params}
              />
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center rounded-2xl border border-dashed border-border/60 bg-muted/10">
              <BookOpen className="h-12 w-12 text-muted-foreground/60 stroke-[1.5]" />
              <p className="mt-4 text-lg font-semibold text-foreground">No articles in this subject yet</p>
              <p className="mt-2 text-sm text-muted-foreground max-w-sm">
                High-quality reference study materials will be added under this subject category shortly.
              </p>
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
