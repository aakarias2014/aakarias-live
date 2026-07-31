import type { Metadata } from "next";
import Link from "next/link";
import { getContentRepository } from "@/lib/content/content-repository";
import { buildMetadata } from "@/lib/seo/metadata";
import { Breadcrumb } from "@/components/content/breadcrumb";
import { ArticleCard } from "@/components/content/article-card";
import { Pagination } from "@/components/content/pagination";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { AWARD_CATEGORIES } from "@/data/awards-categories";
import {
  Award,
  Sparkles,
  Trophy,
  Shield,
  BookOpen,
  Landmark,
  Globe,
  Palette,
  FlaskConical,
  Grid,
  ChevronRight,
  Medal,
  Star,
  BookMarked
} from "lucide-react";

export const revalidate = 600;

export const metadata: Metadata = buildMetadata({
  title: "Important Awards & Honors (महत्वपूर्ण पुरस्कार एवं सम्मान) | MPPSC & UPSC Notes | Aakar IAS",
  description: "Comprehensive repository of Highest Civilian Awards (Bharat Ratna, Padma Awards), National Sports Awards, Gallantry Awards, Literary Honors, Nobel Prizes & MP State Awards for MPPSC & UPSC exams.",
  path: "/en/awards-and-honors",
  keywords: [
    "Important Awards and Honors",
    "Bharat Ratna List PDF",
    "Padma Awards 2026 Recipients",
    "National Sports Awards MPPSC",
    "MP State Samman Tansen Kalidas",
    "Nobel Prizes Exam Notes",
    "UPSC Awards Notes"
  ],
});

interface Props {
  searchParams: Promise<{ page?: string; category?: string }>;
}

const ICON_MAP: Record<string, any> = {
  Award,
  Sparkles,
  Trophy,
  Shield,
  BookOpen,
  Landmark,
  Globe,
  Palette,
  FlaskConical,
};

export default async function EnglishAwardsAndHonorsPage({ searchParams }: Props) {
  const params = await searchParams;
  const repo = await getContentRepository();
  const page = Math.max(1, Number(params.page) || 1);
  const activeCategory = params.category || "all";

  const result = await repo.listArticles({
    locale: "en",
    contentType: "staticGk",
    tag: "awards",
    category: activeCategory === "all" ? undefined : activeCategory,
    page,
    pageSize: 12,
  });

  const selectedCategoryObj = AWARD_CATEGORIES.find((c) => c.slug === activeCategory);

  return (
    <>
      {/* ─── Hero Header ────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white py-14 sm:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--primary)_0%,_transparent_60%)] opacity-30" />
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl" />
        
        <Container size="wide" className="relative">
          <Breadcrumb
            items={[
              { name: "General Studies", href: "/en/general-awareness" },
              { name: "Awards & Honors" }
            ]}
            variant="light"
          />
          <div className="mt-6 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-4">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              MPPSC (Prelims & Mains) & UPSC Special Focus
            </div>
            <h1 className="text-balance text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Important Awards & Honors
            </h1>
            <p className="mt-4 text-pretty text-lg text-slate-200/90 sm:text-xl max-w-3xl leading-relaxed">
              Categorized exam study portal covering Civilian Honors (Bharat Ratna, Padma Awards), Sports Awards, Gallantry Honors, Literary Prizes, MP State Honors, and Nobel Prizes.
            </p>

            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/10 pt-6">
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-extrabold text-amber-400">09+</span>
                <span className="text-xs sm:text-sm text-slate-300">Core Award Categories</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400">MPPSC</span>
                <span className="text-xs sm:text-sm text-slate-300">MP State Honors (Tansen/Kalidas)</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-extrabold text-sky-400">2026/25</span>
                <span className="text-xs sm:text-sm text-slate-300">Updated Recipient Lists</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-extrabold text-rose-400">MCQs</span>
                <span className="text-xs sm:text-sm text-slate-300">Practice Quizzes & Solved Questions</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── Category Filter Pills ──────────────────────────────── */}
      <Section className="py-6 bg-muted/40 border-b border-border/40 sticky top-16 z-20 backdrop-blur-md">
        <Container size="wide">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Select Category (Filter by Category)
              </h2>
              {activeCategory !== "all" && (
                <Link href="/en/awards-and-honors" className="text-xs font-semibold text-primary hover:underline">
                  View All Categories (Reset Filter)
                </Link>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                href="/en/awards-and-honors"
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  activeCategory === "all"
                    ? "bg-primary border-primary text-primary-foreground shadow-md scale-[1.02]"
                    : "bg-background border border-border hover:bg-muted/70 text-foreground"
                }`}
              >
                <Grid className="h-4 w-4 shrink-0" />
                <span>All Awards</span>
              </Link>

              {AWARD_CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.slug;
                const IconComponent = ICON_MAP[cat.iconName] || Award;

                return (
                  <Link
                    key={cat.slug}
                    href={`/en/awards-and-honors?category=${cat.slug}`}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? "bg-primary border-primary text-primary-foreground shadow-md scale-[1.02]"
                        : "bg-background border border-border hover:bg-muted/70 text-foreground"
                    }`}
                  >
                    <IconComponent className="h-4 w-4 shrink-0" />
                    <span>{cat.titleEn}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── Category Overview Grid (If 'all' selected) ──────────── */}
      {activeCategory === "all" && (
        <Section className="py-12 bg-background border-b border-border/40">
          <Container size="wide">
            <div className="mb-8">
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Core Award Categories
              </h2>
              <p className="mt-2 text-muted-foreground text-sm sm:text-base">
                Click on any category to view full recipient lists, rules, and exam revision notes:
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {AWARD_CATEGORIES.map((cat) => {
                const IconComponent = ICON_MAP[cat.iconName] || Award;
                return (
                  <Link
                    key={cat.slug}
                    href={`/en/awards-and-honors?category=${cat.slug}`}
                    className="group relative flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          <IconComponent className="h-6 w-6" />
                        </div>
                        {cat.badgeEn && (
                          <span className="rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-bold text-amber-600 dark:text-amber-400 border border-amber-500/20">
                            {cat.badgeEn}
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                        {cat.titleEn}
                      </h3>
                      <p className="mt-1 text-xs font-semibold text-muted-foreground">
                        {cat.subtitleEn}
                      </p>

                      <p className="mt-3 text-xs leading-relaxed text-muted-foreground line-clamp-3">
                        {cat.descriptionEn}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-1.5 border-t border-border/40 pt-3">
                        {cat.examplesEn.map((ex, i) => (
                          <span key={i} className="inline-flex items-center text-[11px] font-medium text-slate-600 dark:text-slate-400 bg-muted/60 px-2 py-0.5 rounded">
                            • {ex}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between text-xs font-bold text-primary pt-2">
                      <span>Explore Category Notes</span>
                      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </Container>
        </Section>
      )}

      {/* ─── Articles & Notes Section ───────────────────────────── */}
      <Section className="py-12">
        <Container size="wide">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {selectedCategoryObj ? selectedCategoryObj.titleEn : "Latest Awards & Honors Notes"}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {selectedCategoryObj ? selectedCategoryObj.descriptionEn : "Updated exam notes, recipient lists, and practice quizzes for MPPSC & UPSC."}
              </p>
            </div>
          </div>

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
                basePath="/en/awards-and-honors"
                searchParams={params}
              />
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center rounded-2xl border border-dashed border-border/60 bg-card p-8">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500 mb-4">
                <Medal className="h-8 w-8 stroke-[1.5]" />
              </div>
              <h3 className="text-xl font-bold text-foreground">
                {selectedCategoryObj ? `Category '${selectedCategoryObj.titleEn}' is being updated` : "Articles for Awards & Honors will be added soon"}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground max-w-md">
                Our Aakar IAS expert team is preparing updated 2026/2025 recipient notes, key facts tables, and practice MCQs for this category.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link
                  href="/en/current-affairs"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground shadow hover:bg-primary/90 transition-colors"
                >
                  <BookMarked className="h-4 w-4" />
                  Read Daily Current Affairs
                </Link>
                <Link
                  href="/en/general-awareness"
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-xs font-semibold text-foreground hover:bg-muted transition-colors"
                >
                  General Studies Hub
                </Link>
              </div>
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
