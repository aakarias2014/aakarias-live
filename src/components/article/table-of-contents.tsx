"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { TOCItem } from "@/lib/content/types";

/**
 * Sticky table of contents with scrollspy highlighting.
 * Appears on desktop (lg+); hidden on mobile to save space.
 * Uses IntersectionObserver-free scroll position math for reliability.
 */
export function TableOfContents({ items }: { items: TOCItem[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    function onScroll() {
      const headingEls = Array.from(
        document.querySelectorAll<HTMLElement>(
          ".prose-aakar h2[id], .prose-aakar h3[id], .article-section[id]",
        ),
      );
      if (!headingEls.length) return;

      const threshold = window.innerHeight / 3;
      let current: string | null = null;

      for (const el of headingEls) {
        if (el.getBoundingClientRect().top <= threshold) {
          current = el.id;
        } else break;
      }
      setActiveId(current ?? headingEls[0]?.id ?? null);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="sticky top-20 hidden max-h-[calc(100vh-6rem)] overflow-y-auto scrollbar-thin lg:block"
    >
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        On this page
      </p>
      <ul className="space-y-1 border-l border-border">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                "block border-l-2 py-1.5 text-[13px] leading-relaxed transition-colors",
                item.level === 3 ? "pl-8" : "pl-4",
                activeId === item.id
                  ? "border-primary font-semibold text-primary"
                  : "border-transparent text-muted-foreground hover:border-primary/40 hover:text-foreground",
              )}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(item.id);
                el?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
