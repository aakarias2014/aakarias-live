/**
 * Deterministically generates a realistic base view count (~1000 to ~2800)
 * for an article based on its slug or ID string.
 */
export function getBaseArticleViews(slug: string): number {
  if (!slug) return 1250;
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash << 5) - hash + slug.charCodeAt(i);
    hash |= 0;
  }
  const positiveHash = Math.abs(hash);
  // Base count between 1,080 and 2,650
  const base = 1080 + (positiveHash % 1570);
  return base;
}

/**
 * Deterministically generates a realistic review count (~1000 to ~2400)
 * for a publication/book based on its slug or ID string.
 */
export function getBaseBookReviews(slug: string): number {
  if (!slug) return 1240;
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash << 5) - hash + slug.charCodeAt(i);
    hash |= 0;
  }
  const positiveHash = Math.abs(hash);
  // Base reviews between 1,050 and 2,480
  const base = 1050 + (positiveHash % 1430);
  return base;
}

/**
 * Format view/review number nicely with commas, e.g. 1,482
 */
export function formatViewCount(views: number): string {
  return new Intl.NumberFormat("en-US").format(views);
}
