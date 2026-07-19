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
        "group relative isolate flex min-h-[22rem] flex-col justify-end overflow-hidden rounded-3xl bg-secondary text-secondary-foreground shadow-soft-lg",
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
      <div className="absolute inset-0 bg-gradient-to-t from-secondary/95 via-secondary/60 to-transparent" />

      <div className="relative z-[5] flex flex-col gap-3 p-6 sm:p-8">
        <CategoryBadge
          category={article.category}
          locale={article.locale}
          className="text-accent hover:text-accent/80"
        />
        <h2 className="max-w-2xl text-balance text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-3xl">
          {article.title}
        </h2>
        <p className="line-clamp-2 max-w-xl text-sm text-white/80 sm:text-base">{article.excerpt}</p>
        <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-white/70">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5" />
            {formatDate(article.date, article.locale)}
          </span>
          {article.readingTime ? (
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {article.readingTime} min read
            </span>
          ) : null}
          <span className="ml-auto inline-flex items-center gap-1 font-semibold text-white transition-transform group-hover:translate-x-1">
            Read article <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </article>
  );
}
