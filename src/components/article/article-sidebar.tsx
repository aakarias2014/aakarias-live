import Image from "next/image";
import Link from "next/link";
import { Download, BookOpen, Clock, BrainCircuit } from "lucide-react";
import type { ArticleListItem } from "@/lib/content/types";
import { ArticleAdRotator } from "@/components/article/article-ad-rotator";
import type { AdConfig } from "@/data/ads";
import { getAllArticleQuizzesAction } from "@/actions/current-affairs";

interface ArticleSidebarProps {
  related: ArticleListItem[];
  recent?: ArticleListItem[];
  locale: string;
  monthlyPdfHref?: string;
  ads?: AdConfig[];
}

export async function ArticleSidebar({ related, recent, locale, monthlyPdfHref, ads }: ArticleSidebarProps) {
  const isHi = locale === "hi";
  const pdfHref = monthlyPdfHref ?? (isHi ? "/monthly-pdf" : "/en/monthly-pdf");

  // Fetch latest quizzes (articles that contain MCQs)
  let recentQuizzes: any[] = [];
  try {
    const allQuizzes = await getAllArticleQuizzesAction(locale as any);
    recentQuizzes = allQuizzes.slice(0, 3);
  } catch (error) {
    console.error("Error fetching quizzes for sidebar:", error);
  }

  return (
    <aside className="flex w-full lg:w-80 shrink-0 flex-col gap-6">
      {/* PDF Download Card — dark, prominent */}
      <div className="rounded-2xl bg-foreground text-background p-6 shadow-soft-lg">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shrink-0">
            <Download className="h-5 w-5 text-white" />
          </div>
          <h4 className="font-bold text-base leading-tight">
            {isHi ? "संसाधन डाउनलोड" : "Resource Download"}
          </h4>
        </div>
        <p className="text-sm opacity-70 mb-5 leading-relaxed">
          {isHi
            ? "मासिक करेंट अफेयर्स PDF और विस्तृत नोट्स डाउनलोड करें।"
            : "Download monthly current affairs PDF and detailed study notes."}
        </p>
        <Link
          href={pdfHref}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-2.5 text-sm font-semibold text-white transition-all hover:brightness-110 active:scale-95"
        >
          <Download className="h-4 w-4" />
          {isHi ? "PDF डाउनलोड करें" : "Download PDF"}
        </Link>
      </div>

      {/* Related Articles */}
      {related.length > 0 && (
        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <div className="flex items-center gap-2 mb-5">
            <BookOpen className="h-4 w-4 text-primary shrink-0" />
            <h4 className="font-bold text-sm text-foreground">
              {isHi ? "संबंधित लेख" : "Related Articles"}
            </h4>
          </div>
          <div className="space-y-4">
            {related.slice(0, 3).map((article) => (
              <Link
                key={article.id}
                href={article.href}
                className="group flex gap-3 items-start"
              >
                {article.featuredImage && (
                  <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg bg-muted">
                    <Image
                      src={article.featuredImage.url}
                      alt={article.featuredImage.alt || article.title}
                      fill
                      sizes="80px"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="flex min-w-0 flex-col justify-center gap-1">
                  {article.category && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                      {article.category.title}
                    </span>
                  )}
                  <p className="line-clamp-2 text-xs font-semibold leading-snug text-foreground group-hover:text-primary transition-colors">
                    {article.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Current Affairs Quizzes */}
      <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
        <div className="flex items-center gap-2 mb-5">
          <BrainCircuit className="h-4 w-4 text-primary shrink-0" />
          <h4 className="font-bold text-sm text-foreground">
            {isHi ? "करेंट अफेयर्स क्विज़" : "Current Affairs Quizzes"}
          </h4>
        </div>
        
        {recentQuizzes.length > 0 ? (
          <div className="space-y-4">
            {recentQuizzes.map((quiz) => (
              <Link
                key={quiz.id}
                href={isHi ? "/current-affairs/quiz" : "/en/current-affairs/quiz"}
                className="group flex flex-col gap-1 border-b border-border/40 pb-3 last:border-0 last:pb-0"
              >
                <div className="flex items-center justify-between gap-2">
                  {quiz.category && (
                    <span className="text-[10px] font-semibold text-primary">
                      {quiz.category.name}
                    </span>
                  )}
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <BookOpen className="h-3.5 w-3.5 shrink-0" />
                    {quiz.mcqs.length} {isHi ? "प्रश्न" : "Questions"}
                  </span>
                </div>
                <p className="line-clamp-2 text-xs font-semibold leading-snug text-foreground group-hover:text-primary transition-colors">
                  {quiz.title}
                </p>
              </Link>
            ))}
            <Link
              href={isHi ? "/current-affairs/quiz" : "/en/current-affairs/quiz"}
              className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-xl border border-primary/20 bg-primary/5 py-2 text-xs font-bold text-primary hover:bg-primary hover:text-white transition-all duration-200"
            >
              {isHi ? "सभी क्विज़ देखें" : "View All Quizzes"}
            </Link>
          </div>
        ) : (
          <div className="text-center py-2">
            <p className="text-xs text-muted-foreground mb-4">
              {isHi
                ? "नवीनतम क्विज़ हल करें और परीक्षा में अपनी तैयारी को मजबूत करें।"
                : "Solve latest quizzes to boost your exam preparation."}
            </p>
            <Link
              href={isHi ? "/current-affairs/quiz" : "/en/current-affairs/quiz"}
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-primary/20 bg-primary/5 py-2 text-xs font-bold text-primary hover:bg-primary hover:text-white transition-all duration-200"
            >
              {isHi ? "क्विज़ हल करें" : "Solve Quizzes"}
            </Link>
          </div>
        )}
      </div>

      {/* Recent Articles */}
      {recent && recent.length > 0 && (
        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <div className="flex items-center gap-2 mb-5">
            <Clock className="h-4 w-4 text-primary shrink-0" />
            <h4 className="font-bold text-sm text-foreground">
              {isHi ? "हालिया लेख" : "Recent Articles"}
            </h4>
          </div>
          <div className="space-y-4">
            {recent.slice(0, 3).map((article) => (
              <Link
                key={article.id}
                href={article.href}
                className="group flex gap-3 items-start"
              >
                {article.featuredImage && (
                  <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg bg-muted">
                    <Image
                      src={article.featuredImage.url}
                      alt={article.featuredImage.alt || article.title}
                      fill
                      sizes="80px"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="flex min-w-0 flex-col justify-center gap-1">
                  {article.category && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                      {article.category.title}
                    </span>
                  )}
                  <p className="line-clamp-2 text-xs font-semibold leading-snug text-foreground group-hover:text-primary transition-colors">
                    {article.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Promotional ad card */}
      <ArticleAdRotator locale={locale} ads={ads} />
    </aside>
  );
}
