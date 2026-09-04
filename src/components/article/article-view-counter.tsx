"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { getBaseArticleViews, formatViewCount } from "@/lib/views";

interface ArticleViewCounterProps {
  slug: string;
  locale?: "hi" | "en";
  className?: string;
}

export function ArticleViewCounter({ slug, locale = "hi", className = "" }: ArticleViewCounterProps) {
  const initialBase = getBaseArticleViews(slug);
  const [views, setViews] = useState<number>(initialBase);
  const [hasIncremented, setHasIncremented] = useState<boolean>(false);

  useEffect(() => {
    if (!slug || hasIncremented) return;

    const sessionKey = `aakar_viewed_${slug}`;
    const alreadyViewedInSession = typeof window !== "undefined" && sessionStorage.getItem(sessionKey);
    const endpoint = "/api/views";

    if (!alreadyViewedInSession) {
      fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data && typeof data.views === "number") {
            setViews(data.views);
            try {
              sessionStorage.setItem(sessionKey, "1");
            } catch (e) {}
            setHasIncremented(true);
          }
        })
        .catch(() => {
          setViews(initialBase + 1);
        });
    } else {
      fetch(`${endpoint}?slug=${encodeURIComponent(slug)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data && typeof data.views === "number") {
            setViews(data.views);
          }
        })
        .catch(() => {});
    }
  }, [slug, hasIncremented, initialBase]);

  const viewText = locale === "hi" ? "बार देखा गया" : "views";

  return (
    <span className={`inline-flex items-center gap-1.5 font-medium text-muted-foreground ${className}`}>
      <Eye className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
      <span>
        {formatViewCount(views)} {viewText}
      </span>
    </span>
  );
}
