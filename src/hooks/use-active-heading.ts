"use client";

import { useEffect, useState } from "react";

/**
 * Returns the id of the currently-visible heading element (used by
 * the sticky TOC to highlight the active section).
 *
 * Scans for all `[id]` headings inside the `.prose-aakar` container
 * and picks the one whose top is closest above the viewport midpoint.
 */
export function useActiveHeading(): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    function onScroll() {
      const headings = Array.from(
        document.querySelectorAll<HTMLElement>(
          ".prose-aakar h2[id], .prose-aakar h3[id], .article-section[id]",
        ),
      );
      if (!headings.length) return;

      const mid = window.innerHeight / 3;
      let current: string | null = null;

      for (const el of headings) {
        if (el.getBoundingClientRect().top <= mid) {
          current = el.id;
        } else {
          break;
        }
      }
      setActiveId(current ?? headings[0]?.id ?? null);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return activeId;
}
