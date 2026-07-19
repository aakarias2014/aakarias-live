"use client";

import { useReadingProgress } from "@/hooks/use-reading-progress";

/**
 * Thin progress bar fixed to the top of the viewport, reflecting how far the
 * reader has scrolled through the article. Invisible until the user scrolls.
 * Used on every single-article page.
 */
export function ReadingProgress() {
  const progress = useReadingProgress();

  if (progress <= 0) return null;

  return (
    <div
      role="progressbar"
      aria-label="Article reading progress"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      className="fixed inset-x-0 top-0 z-[60] h-1 bg-transparent"
    >
      <div
        className="h-full bg-primary transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
