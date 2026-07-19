"use client";

import { useState, useEffect, useCallback } from "react";
import { ArticleAdCard } from "@/components/article/article-ad-card";
import { ADS } from "@/data/ads";
import type { AdConfig } from "@/data/ads";

interface ArticleAdRotatorProps {
  locale?: string;
  className?: string;
  /** Auto-advance interval in ms (default: 8000) */
  interval?: number;
  ads?: AdConfig[];
}

export function ArticleAdRotator({
  locale = "hi",
  className = "",
  interval = 8000,
  ads,
}: ArticleAdRotatorProps) {
  const finalAds = ads && ads.length > 0 ? ads : ADS;

  // Start at -1 to avoid SSR/hydration mismatch; picks random index after mount
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isVisible, setIsVisible] = useState(true);

  // Pick a random starting ad on client mount
  useEffect(() => {
    const len = finalAds.length;
    if (len > 0) {
      requestAnimationFrame(() => {
        setActiveIndex(Math.floor(Math.random() * len));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goTo = useCallback(
    (index: number) => {
      setIsVisible(false);
      setTimeout(() => {
        setActiveIndex(index);
        setIsVisible(true);
      }, 300); // matches CSS transition duration
    },
    []
  );

  const goNext = useCallback(() => {
    goTo((activeIndex + 1) % finalAds.length);
  }, [activeIndex, goTo, finalAds]);

  // Auto-advance
  useEffect(() => {
    if (activeIndex === -1) return;
    const timer = setInterval(goNext, interval);
    return () => clearInterval(timer);
  }, [activeIndex, goNext, interval]);

  // Don't render anything before hydration to avoid layout shift
  if (activeIndex === -1) {
    return (
      <div className={`rounded-2xl bg-muted animate-pulse aspect-[3/4] ${className}`} />
    );
  }

  const ad = finalAds[activeIndex];

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {/* Ad card with fade transition */}
      <div
        className="transition-opacity duration-300"
        style={{ opacity: isVisible ? 1 : 0 }}
      >
        {ad && <ArticleAdCard ad={ad} locale={locale} />}
      </div>

      {/* Dot navigation */}
      <div className="flex items-center justify-center gap-2">
        {finalAds.map((a, i) => (
          <button
            key={a.id}
            onClick={() => goTo(i)}
            aria-label={`Ad ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === activeIndex
                ? "w-5 h-2 bg-primary"
                : "w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
