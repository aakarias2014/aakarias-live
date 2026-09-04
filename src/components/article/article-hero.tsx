import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock, User } from "lucide-react";
import type { Article } from "@/lib/content/types";
import { CategoryBadge } from "@/components/content/category-badge";
import { Breadcrumb } from "@/components/content/breadcrumb";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { formatDate } from "@/lib/seo/metadata";
import { getCurrentUser } from "@/actions/auth";
import { checkIsBookmarked } from "@/actions/user";
import { BookmarkButton } from "./bookmark-button";
import { ShareDropdown } from "./share-dropdown";
import { siteConfig } from "@/lib/site-config";

/**
 * Article hero: featured image + title + meta row + breadcrumb + language switcher.
 * Full-bleed image with gradient overlay, Apple-inspired large typography.
 */
export async function ArticleHero({ article }: { article: Article }) {
  const session = await getCurrentUser();
  const isSignedIn = !!session;
  const isBookmarked = await checkIsBookmarked(article.id);

  return (
    <header className="relative pt-3 sm:pt-6">
      <div className="mx-auto max-w-[var(--content-max)] px-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Breadcrumb
            items={[
              { name: "Current Affairs", href: `/current-affairs` },
              { name: article.category?.title ?? "Article" },
            ]}
          />
          <div className="ml-auto flex items-center gap-3">
            <BookmarkButton
              articleId={article.id}
              title={article.title}
              slug={article.slug}
              type={article.type || "currentAffairs"}
              locale={article.locale}
              initialIsBookmarked={isBookmarked}
              isSignedIn={isSignedIn}
            />
            <LanguageSwitcher />
          </div>
        </div>

        {article.featuredImage && (
          <div className="mt-4 sm:mt-6 relative h-[200px] sm:h-[360px] md:h-[450px] w-full overflow-hidden rounded-xl sm:rounded-2xl border border-border/50 shadow-sm sm:shadow-md bg-secondary">
            <Image
              src={article.featuredImage.url}
              alt={article.featuredImage.alt || article.title}
              fill
              priority
              fetchPriority="high"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1200px"
              className="object-cover object-center"
            />
          </div>
        )}

        <div className="mt-5 sm:mt-8 max-w-4xl">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <CategoryBadge category={article.category} locale={article.locale} size="md" />
              {article.syllabus && article.syllabus.length > 0 && (
                article.syllabus.map((syl) => (
                  <span
                    key={syl}
                    className="rounded-full bg-accent/15 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[11px] sm:text-xs font-bold text-accent-foreground uppercase tracking-wide border border-accent/10"
                  >
                    {syl}
                  </span>
                ))
              )}
            </div>

            <h1 className="mt-2.5 sm:mt-4 text-[17px] sm:text-2xl md:text-3xl lg:text-4xl font-extrabold leading-[1.35] sm:leading-tight tracking-tight text-foreground w-full break-words">
              {article.title}
            </h1>

            <p className="mt-2 sm:mt-3 max-w-2xl text-pretty text-[13px] sm:text-base md:text-lg text-muted-foreground leading-normal">
              {article.excerpt}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
              {article.author && (
                <span className="inline-flex items-center gap-2 font-medium text-foreground">
                  {article.author.avatar ? (
                    <div className="relative h-8 w-8 overflow-hidden rounded-full border border-border bg-muted shrink-0 shadow-sm">
                      <Image
                        src={article.author.avatar}
                        alt={article.author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <User className="h-5 w-5 shrink-0" />
                  )}
                  {article.author.name}
                </span>
              )}
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4" />
                {formatDate(article.date, article.locale)}
              </span>
              {article.readingTime && (
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {article.readingTime} min read
                </span>
              )}
              <ShareDropdown
                title={article.title}
                url={`${siteConfig.url}${article.href}`}
                locale={article.locale}
                showBullet={true}
              />
            </div>

            {article.tags && article.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {article.tags.map((tag) => {
                  const tagHref = article.locale === "hi" ? `/tag/${tag.slug}` : `/en/tag/${tag.slug}`;
                  return (
                    <Link
                      key={tag.id}
                      href={tagHref}
                      className="rounded-full border border-border/85 px-3 py-1 text-xs font-medium text-muted-foreground hover:bg-primary/5 hover:text-primary hover:border-primary/30 transition-all duration-200"
                    >
                      {tag.name}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
    </header>
  );
}
