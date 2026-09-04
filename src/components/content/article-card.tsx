"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock } from "lucide-react";
import { motion } from "framer-motion";
import type { ArticleListItem } from "@/lib/content/types";
import { CategoryBadge } from "@/components/content/category-badge";
import { formatDate } from "@/lib/seo/metadata";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function ArticleCard({ article, className }: { article: ArticleListItem; className?: string }) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn("h-full", className)}
    >
      <Card
        className={cn(
          "app-card group relative flex h-full flex-col overflow-hidden rounded-2xl border-border/70 bg-card p-0 transition-all duration-300 active:scale-[0.985] hover:shadow-soft-lg"
        )}
      >
        <Link href={article.href} className="absolute inset-0 z-10" aria-label={article.title} />
        {article.featuredImage ? (
          <div className="relative aspect-[16/10] overflow-hidden bg-muted">
            <Image
              src={article.featuredImage.url}
              alt={article.featuredImage.alt || article.title}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="aspect-[16/10] w-full bg-gradient-to-br from-primary/10 via-muted to-accent/10" />
        )}
        <div className="flex flex-1 flex-col gap-1.5 sm:gap-3 p-2.5 sm:p-5">
          <div className="flex flex-wrap items-center gap-1 sm:gap-2">
            <CategoryBadge category={article.category} locale={article.locale} />
            {article.syllabus && article.syllabus.length > 0 && (
              article.syllabus.slice(0, 2).map((syl) => (
                <span
                  key={syl}
                  className="rounded-full bg-accent/15 px-2 py-0.5 text-[9px] sm:text-[10px] font-bold text-accent-foreground uppercase tracking-wide border border-accent/10"
                >
                  {syl}
                </span>
              ))
            )}
          </div>
          <h3 className="text-xs sm:text-base font-extrabold leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary line-clamp-2">
            {article.title}
          </h3>
          <p className="line-clamp-2 text-[10px] sm:text-sm text-muted-foreground leading-relaxed">{article.excerpt}</p>
          <div className="mt-auto flex flex-wrap items-center gap-1.5 sm:gap-4 pt-1 sm:pt-2 text-[9.5px] sm:text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <CalendarDays className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              {formatDate(article.date, article.locale)}
            </span>
            {article.readingTime ? (
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                {article.readingTime}m
              </span>
            ) : null}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
