import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import type { ArticleListItem } from "@/lib/content/types";
import { CategoryBadge } from "@/components/content/category-badge";
import { formatDate } from "@/lib/seo/metadata";
import { cn } from "@/lib/utils";

/**
 * Large hero-style card for featured articles. Image-led with overlay gradient.
 */
export function FeaturedArticleCard({
  article,
  className,
}: {
  article: ArticleListItem;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group relative isolate flex min-h-[16rem] sm:min-h-[22rem] flex-col justify-end overflow-hidden rounded-2xl sm:rounded-3xl bg-secondary text-secondary-foreground shadow-soft-lg",
        className,
      )}
    >
      <Link href={article.href} className="absolute inset-0 z-10" aria-label={article.title} />
      {article.featuredImage ? (
        <Image
          src={article.featuredImage.url}
          alt={article.featuredImage.alt || article.title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 66vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent" />

      <div className="relative z-[5] flex flex-col gap-2 p-3.5 sm:p-8">
        <CategoryBadge
          category={article.category}
          locale={article.locale}
          className="text-accent hover:text-accent/80 text-[10px] sm:text-xs"
        />
        <h2 className="max-w-2xl text-balance text-sm sm:text-2xl font-extrabold leading-snug tracking-tight text-white line-clamp-2 sm:line-clamp-3">
          {article.title}
        </h2>
        {article.excerpt ? (
          <p className="hidden sm:line-clamp-2 max-w-xl text-xs sm:text-sm text-white/80">{article.excerpt}</p>
        ) : null}
        <div className="mt-1 flex flex-wrap items-center gap-3 text-[10px] sm:text-xs text-white/75">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary" />
            {formatDate(article.date, article.locale)}
          </span>
          {article.readingTime ? (
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              {article.readingTime} min read
            </span>
          ) : null}
          <span className="ml-auto inline-flex items-center gap-1 font-extrabold text-white transition-transform group-hover:translate-x-1">
            {article.locale === "en" ? "Read" : "पढ़ें"} <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
          </span>
        </div>
      </div>
    </article>
  );
}
