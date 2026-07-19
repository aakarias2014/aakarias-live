"use server";

import { getContentRepository } from "@/lib/content/content-repository";
import type { SearchHit } from "@/lib/search/algolia";
import type { Locale } from "@/lib/i18n/locales";
import { coursesData } from "@/data/courses";

/**
 * Executes a search query securely on the server to prevent CORS issues
 * and avoid exposing Sanity credentials to the browser.
 */
export async function searchArticles(
  query: string,
  locale: Locale,
  limit = 6,
): Promise<SearchHit[]> {
  try {
    // 1. Search Sanity content (which now includes onlineCourse)
    const repo = await getContentRepository();
    const sanityHits = await repo.search(query, locale, limit);

    // 2. Search static courses fallback
    const qLower = query.toLowerCase().trim();
    const staticHits: SearchHit[] = [];

    if (qLower) {
      const isHi = locale === "hi";

      for (const course of coursesData) {
        const c = course as any;
        const title = (isHi ? (c.titleHi || c.title) : (c.titleEn || c.title)) || "";
        const desc = (isHi ? (c.description || c.descriptionEn) : (c.descriptionEn || c.description)) || "";
        
        const matchTitle = title.toLowerCase().includes(qLower);
        const matchDesc = desc.toLowerCase().includes(qLower);
        const matchSlug = course.slug.toLowerCase().includes(qLower);

        if (matchTitle || matchDesc || matchSlug) {
          const prefix = isHi ? "" : "/en";
          staticHits.push({
            id: course.id,
            title,
            excerpt: desc.length > 120 ? desc.substring(0, 120) + "..." : desc,
            category: course.category,
            image: course.image,
            href: `${prefix}/online-courses/${course.slug}`,
          });
        }
      }
    }

    // 3. Merge and deduplicate by href, prioritizing Sanity results
    const seenHrefs = new Set<string>();
    const mergedHits: SearchHit[] = [];

    for (const hit of sanityHits) {
      if (!seenHrefs.has(hit.href)) {
        seenHrefs.add(hit.href);
        mergedHits.push(hit);
      }
    }

    for (const hit of staticHits) {
      if (!seenHrefs.has(hit.href)) {
        seenHrefs.add(hit.href);
        mergedHits.push(hit);
      }
    }

    return mergedHits.slice(0, limit);
  } catch (err) {
    console.error("Server search failed:", err);
    return [];
  }
}
