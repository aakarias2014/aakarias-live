import type { Metadata } from "next";
import Link from "next/link";
import { getContentRepository } from "@/lib/content/content-repository";
import { buildMetadata } from "@/lib/seo/metadata";
import { Breadcrumb } from "@/components/content/breadcrumb";
import { ArticleCard } from "@/components/content/article-card";
import { Pagination } from "@/components/content/pagination";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { AWARD_CATEGORIES, AwardCategory } from "@/data/awards-categories";
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
  CheckCircle2,
  BookMarked
} from "lucide-react";

export const revalidate = 600;

export const metadata: Metadata = buildMetadata({
  title: "महत्वपूर्ण पुरस्कार एवं सम्मान (Awards & Honors) | MPPSC & UPSC Notes | Aakar IAS",
  description: "MPPSC, UPSC व अन्य प्रतियोगी परीक्षाओं हेतु भारत के नागरिक सम्मान (भारत रत्न, पद्म पुरस्कार), खेल पुरस्कार, वीरता पुरस्कार, साहित्य सम्मान, नोबेल पुरस्कार एवं मध्य प्रदेश के प्रमुख राज्य सम्मानों की श्रेणीबद्ध जानकारी।",
  path: "/awards-and-honors",
  keywords: [
    "महत्वपूर्ण पुरस्कार एवं सम्मान",
    "Awards and Honors MPPSC Notes",
    "Bharat Ratna List",
    "Padma Awards 2026",
    "National Sports Awards MPPSC",
    "MP State Awards Tansen Kalidas Samman",
    "Nobel Prizes Notes",
    "UPSC Awards Notes",
    "Aakar IAS Awards"
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

export default async function AwardsAndHonorsPage({ searchParams }: Props) {
  const params = await searchParams;
  const repo = await getContentRepository();
  const page = Math.max(1, Number(params.page) || 1);
  const activeCategory = params.category || "all";

  // Fetch articles tag-filtered or category-filtered for awards
  const result = await repo.listArticles({
    locale: "hi",
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
              { name: "सामान्य अध्ययन", href: "/general-awareness" },
              { name: "महत्वपूर्ण पुरस्कार एवं सम्मान" }
            ]}
            variant="light"
          />
          <div className="mt-6 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-4">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              MPPSC (प्री + मुख्य परीक्षा) & UPSC स्पेशल संकलन
            </div>
            <h1 className="text-balance text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl font-devanagari">
              महत्वपूर्ण पुरस्कार एवं सम्मान
            </h1>
            <p className="mt-4 text-pretty text-lg text-slate-200/90 sm:text-xl font-devanagari max-w-3xl leading-relaxed">
              भारत के नागरिक सम्मान (भारत रत्न, पद्म पुरस्कार), खेल पुरस्कार, सैन्य वीरता सम्मान, साहित्य पुरस्कार, मध्य प्रदेश राज्य पुरस्कार एवं अंतर्राष्ट्रीय नोबेल पुरस्कारों का श्रेणीबद्ध परीक्षा-उपयोगी अध्ययन केंद्र।
            </p>

            {/* Quick Stats Grid */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/10 pt-6">
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-extrabold text-amber-400">09+</span>
                <span className="text-xs sm:text-sm text-slate-300">प्रमुख पुरस्कार श्रेणियां</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400">MPPSC</span>
                <span className="text-xs sm:text-sm text-slate-300">राज्य सम्मान (तानसेन/कालिदास)</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-extrabold text-sky-400">2026/25</span>
                <span className="text-xs sm:text-sm text-slate-300">नवीनतम प्राप्तकर्ता सूची</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-extrabold text-rose-400">MCQs</span>
                <span className="text-xs sm:text-sm text-slate-300">अभ्यास प्रश्न व व्याख्या</span>
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
                पुरस्कार श्रेणी चुनें (Filter by Category)
              </h2>
              {activeCategory !== "all" && (
                <Link href="/awards-and-honors" className="text-xs font-semibold text-primary hover:underline">
                  सभी श्रेणियां देखें (Reset Filter)
                </Link>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                href="/awards-and-honors"
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  activeCategory === "all"
                    ? "bg-primary border-primary text-primary-foreground shadow-md scale-[1.02]"
                    : "bg-background border border-border hover:bg-muted/70 text-foreground"
                }`}
              >
                <Grid className="h-4 w-4 shrink-0" />
                <span>सभी पुरस्कार (All Awards)</span>
              </Link>

              {AWARD_CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.slug;
                const IconComponent = ICON_MAP[cat.iconName] || Award;

                return (
                  <Link
                    key={cat.slug}
                    href={`/awards-and-honors?category=${cat.slug}`}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? "bg-primary border-primary text-primary-foreground shadow-md scale-[1.02]"
                        : "bg-background border border-border hover:bg-muted/70 text-foreground"
                    }`}
                  >
                    <IconComponent className="h-4 w-4 shrink-0" />
                    <span>{cat.title}</span>
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
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl font-devanagari">
                पुरस्कार एवं सम्मान की प्रमुख श्रेणियां
              </h2>
              <p className="mt-2 text-muted-foreground text-sm sm:text-base font-devanagari">
                नीचे दी गई किसी भी श्रेणी पर क्लिक करके उसकी विस्तृत सूची, पात्रता नियम व अद्यतन नोट्स देखें:
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {AWARD_CATEGORIES.map((cat) => {
                const IconComponent = ICON_MAP[cat.iconName] || Award;
                return (
                  <Link
                    key={cat.slug}
                    href={`/awards-and-honors?category=${cat.slug}`}
                    className="group relative flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          <IconComponent className="h-6 w-6" />
                        </div>
                        {cat.badge && (
                          <span className="rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-bold text-amber-600 dark:text-amber-400 border border-amber-500/20">
                            {cat.badge}
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors font-devanagari">
                        {cat.title}
                      </h3>
                      <p className="mt-1 text-xs font-semibold text-muted-foreground">
                        {cat.subtitle}
                      </p>

                      <p className="mt-3 text-xs leading-relaxed text-muted-foreground line-clamp-3 font-devanagari">
                        {cat.description}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-1.5 border-t border-border/40 pt-3">
                        {cat.examples.map((ex, i) => (
                          <span key={i} className="inline-flex items-center text-[11px] font-medium text-slate-600 dark:text-slate-400 bg-muted/60 px-2 py-0.5 rounded">
                            • {ex}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between text-xs font-bold text-primary pt-2">
                      <span>श्रेणी के नोट्स व लेख देखें</span>
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
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl font-devanagari">
                {selectedCategoryObj ? selectedCategoryObj.title : "नवीनतम पुरस्कार एवं सम्मान लेख व नोट्स"}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground font-devanagari">
                {selectedCategoryObj ? selectedCategoryObj.description : "MPPSC, UPSC एवं प्रतियोगी परीक्षाओं के लिए अद्यतन पुरस्कार नोट्स व प्रश्नोत्तरी।"}
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
                basePath="/awards-and-honors"
                searchParams={params}
              />
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center rounded-2xl border border-dashed border-border/60 bg-card p-8">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500 mb-4">
                <Medal className="h-8 w-8 stroke-[1.5]" />
              </div>
              <h3 className="text-xl font-bold text-foreground font-devanagari">
                {selectedCategoryObj ? ` श्रेणी '${selectedCategoryObj.title}' शीघ्र ही अपडेट की जा रही है` : "शीघ्र ही इस श्रेणी में नवीनतम पुरस्कार एवं सम्मान नोट्स जोड़े जाएंगे"}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground max-w-md font-devanagari">
                आकार IAS विषय-विशेषज्ञ टीम द्वारा इस श्रेणी के अंतर्गत वर्ष 2026/2025 के अद्यतन प्राप्तकर्ता नोट्स, तथ्य तालिका व अभ्यास MCQs तैयार किए जा रहे हैं।
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link
                  href="/current-affairs"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground shadow hover:bg-primary/90 transition-colors"
                >
                  <BookMarked className="h-4 w-4" />
                  डेली करेंट अफेयर्स पढ़ें
                </Link>
                <Link
                  href="/general-awareness"
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-xs font-semibold text-foreground hover:bg-muted transition-colors"
                >
                  सामान्य अध्ययन मुख्य पृष्ठ
                </Link>
              </div>
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
