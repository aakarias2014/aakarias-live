"use client";

import { useState } from "react";
import { Search, BookOpen, Tag as TagIcon, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { ArticleListItem, Tag } from "@/lib/content/types";
import { ArticleCard } from "@/components/content/article-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TagPillarWorkspaceProps {
  tag: Tag;
  articles: ArticleListItem[];
  locale: "hi" | "en";
}

export function TagPillarWorkspace({ tag, articles, locale }: TagPillarWorkspaceProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const labels = {
    hi: {
      searchPlaceholder: "इस टॉपिक के अंतर्गत लेख खोजें...",
      totalArticles: "कुल लेख",
      noResults: "कोई लेख नहीं मिला",
      noResultsDesc: "कृपया कोई दूसरा कीवर्ड लिखकर खोजें या सर्च रीसेट करें।",
      resetSearch: "सर्च रीसेट करें",
      metaPillar: "विषय पिलर पेज",
      examHub: "तैयारी हब",
    },
    en: {
      searchPlaceholder: "Search articles within this topic...",
      totalArticles: "Total Articles",
      noResults: "No articles found",
      noResultsDesc: "Try adjusting your search terms or clear the search query.",
      resetSearch: "Reset Search",
      metaPillar: "Topic Pillar Page",
      examHub: "Preparation Hub",
    },
  }[locale];

  // Filter articles based on matching title or excerpt
  const filteredArticles = articles.filter((article) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      article.title.toLowerCase().includes(query) ||
      (article.excerpt && article.excerpt.toLowerCase().includes(query))
    );
  });

  return (
    <div className="space-y-8">
      {/* Premium Glassmorphic Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-primary/5 via-background to-accent/5 p-8 md:p-12 shadow-soft">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
              <TagIcon className="h-3 w-3" />
              {labels.metaPillar}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-secondary/10 px-3 py-1 text-xs font-bold text-secondary dark:text-white">
              {labels.examHub}
            </span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl bg-gradient-to-r from-foreground via-foreground/90 to-primary/80 bg-clip-text text-transparent">
            {tag.name}
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed">
            {locale === "hi"
              ? `सिविल सेवा परीक्षा (UPSC / MPPSC) के लिए '${tag.name}' विषय से संबंधित सभी महत्वपूर्ण लेखों, विश्लेषणों और अध्ययन सामग्री का एक स्थान पर संकलन।`
              : `A comprehensive collection of study materials, current affairs, and editorial analysis related to '${tag.name}' for Civil Services (UPSC & MPPSC) preparations.`}
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-border/40">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{articles.length}</div>
                <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">{labels.totalArticles}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Instant Search Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-md w-full">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={labels.searchPlaceholder}
            className="pl-10 pr-10 rounded-full border-border/60 shadow-soft focus-visible:ring-primary/20"
          />
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-muted-foreground" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1 rounded-full hover:bg-muted"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Articles Grid with Framer Motion transitions */}
      <AnimatePresence mode="popLayout">
        {filteredArticles.length > 0 ? (
          <motion.div
            layout
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredArticles.map((article) => (
              <motion.div
                key={article.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <ArticleCard article={article} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-border rounded-3xl p-8 bg-card shadow-soft"
          >
            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
              <Search className="h-6 w-6 text-muted-foreground opacity-60" />
            </div>
            <h3 className="text-lg font-bold text-foreground">{labels.noResults}</h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-sm">
              {labels.noResultsDesc}
            </p>
            {searchQuery && (
              <Button onClick={() => setSearchQuery("")} variant="outline" className="mt-4 rounded-full" size="sm">
                {labels.resetSearch}
              </Button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
