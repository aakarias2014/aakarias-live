"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { TOCItem, ArticleSection } from "@/lib/content/types";

export interface TableOfContentsProps {
  items?: TOCItem[];
  sections?: ArticleSection[];
  locale?: string;
  className?: string;
}

const cleanText = (str: string) =>
  (str || "").replace(/[\u200B-\u200D\u200E\u200F\u202A-\u202E\u2060-\u206F\uFEFF\u00AD\u2000-\u200A]/g, "").trim();

/**
 * Sticky table of contents with scrollspy highlighting.
 * Appears on desktop (lg+); hidden on mobile to save space.
 * Uses IntersectionObserver-free scroll position math for reliability.
 */
export function TableOfContents({
  items,
  sections,
  locale = "hi",
  className,
}: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const rawItems: TOCItem[] =
    Array.isArray(items) && items.length > 0
      ? items
      : Array.isArray(sections) && sections.length > 0
        ? sections.map((sec) => ({
            id: sec.id,
            text: sec.title,
            level: 2,
          }))
        : [];

  const resolvedItems = rawItems.map((item) => ({
    ...item,
    id: cleanText(item.id),
    text: cleanText(item.text),
  }));

  useEffect(() => {
    let ticking = false;

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const headingEls = Array.from(
            document.querySelectorAll<HTMLElement>(
              ".prose-aakar h2[id], .prose-aakar h3[id], .article-section[id]",
            ),
          );
          if (headingEls.length) {
            const threshold = window.innerHeight / 3;
            let current: string | null = null;

            for (const el of headingEls) {
              if (el.getBoundingClientRect().top <= threshold) {
                current = el.id;
              } else break;
            }
            setActiveId(current ?? headingEls[0]?.id ?? null);
          }
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!Array.isArray(resolvedItems) || resolvedItems.length === 0) return null;

  const isHi = locale === "hi";

  return (
    <nav
      aria-label="Table of contents"
      className={cn(
        "sticky top-20 hidden max-h-[calc(100vh-6rem)] overflow-y-auto scrollbar-thin lg:block",
        className,
      )}
    >
      <div className="mb-3.5 flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-primary" />
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground m-0">
          {isHi ? "इस पृष्ठ पर (On This Page)" : "On This Page"}
        </p>
      </div>
      <ul className="space-y-1 border-l border-border/80">
        {resolvedItems.map((item) => (
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

export function MobileTableOfContents({
  items,
  sections,
  locale = "hi",
}: {
  items?: TOCItem[];
  sections?: ArticleSection[];
  locale?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const rawItems: TOCItem[] =
    Array.isArray(items) && items.length > 0
      ? items
      : Array.isArray(sections) && sections.length > 0
        ? sections.map((sec) => ({
            id: sec.id,
            text: sec.title,
            level: 2,
          }))
        : [];

  const resolvedItems = rawItems.map((item) => ({
    ...item,
    id: cleanText(item.id),
    text: cleanText(item.text),
  }));

  if (!Array.isArray(resolvedItems) || resolvedItems.length === 0) return null;

  const isHi = locale === "hi";
  return (
    <div className="mb-8 rounded-xl border border-border/80 bg-primary/5 p-4 lg:hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between font-bold text-foreground text-sm"
      >
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-primary" />
          {isHi ? "इस पृष्ठ पर (On This Page)" : "On This Page"}
        </span>
        <span className="text-xs text-primary font-semibold">
          {isOpen ? (isHi ? "छिपाएं ▲" : "Hide ▲") : (isHi ? "देखें ▼" : "View ▼")}
        </span>
      </button>

      {isOpen && (
        <ul className="mt-3 space-y-1.5 pt-3 border-t border-border/60">
          {resolvedItems.map((item) => (
            <li key={`mob-${item.id}`}>
              <a
                href={`#${item.id}`}
                className={cn(
                  "block py-1 text-xs text-muted-foreground hover:text-primary transition-colors",
                  item.level === 3 ? "pl-4" : "pl-1 font-medium text-foreground",
                )}
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen(false);
                  const el = document.getElementById(item.id);
                  el?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                • {item.text}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
