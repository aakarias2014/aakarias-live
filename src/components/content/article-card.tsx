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
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn("h-full", className)}
    >
      <Card
        className={cn(
          "group relative flex h-full flex-col overflow-hidden rounded-2xl border-border/60 bg-card p-0 transition-all duration-300 hover:shadow-soft-lg"
        )}
      >
        <Link href={article.href} className="absolute inset-0 z-10" aria-label={article.title} />
        {article.featuredImage ? (
          <div className="relative aspect-[16/10] overflow-hidden bg-muted">
            <Image
              src={article.featuredImage.url}
              alt={article.featuredImage.alt || article.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="aspect-[16/10] w-full bg-gradient-to-br from-primary/10 via-muted to-accent/10" />
        )}
        <div className="flex flex-1 flex-col gap-3 p-5">
          <div className="flex flex-wrap items-center gap-2">
            <CategoryBadge category={article.category} locale={article.locale} />
            {article.syllabus && article.syllabus.length > 0 && (
              article.syllabus.map((syl) => (
                <span
                  key={syl}
                  className="rounded-full bg-accent/15 px-2.5 py-0.5 text-[10px] font-bold text-accent-foreground uppercase tracking-wide border border-accent/10"
                >
                  {syl}
                </span>
              ))
            )}
          </div>
          <h3 className="text-balance text-lg font-bold leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary">
            {article.title}
          </h3>
          <p className="line-clamp-2 text-sm text-muted-foreground">{article.excerpt}</p>
          <div className="mt-auto flex items-center gap-4 pt-2 text-xs text-muted-foreground">
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
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
