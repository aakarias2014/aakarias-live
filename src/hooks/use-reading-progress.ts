"use client";

import { useEffect, useState } from "react";

/**
 * Returns a 0–100 value representing how far the user has scrolled through
 * the document. Resets on every new page (the scroll listener is bound on mount).
 */
export function useReadingProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const el = document.documentElement;
          const scrollTop = el.scrollTop || document.body.scrollTop;
          const scrollHeight = el.scrollHeight - el.clientHeight;
          setProgress(scrollHeight > 0 ? Math.min((scrollTop / scrollHeight) * 100, 100) : 0);
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return progress;
}
