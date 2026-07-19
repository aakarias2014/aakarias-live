import type { MetadataRoute } from "next";
import { getContentRepository } from "@/lib/content/content-repository";
import { siteConfig } from "@/lib/site-config";

/**
 * Dynamic sitemap. Includes static pages + all articles per locale.
 * Hindi (default) keeps clean URLs; English mirrors under /en/.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const repo = await getContentRepository();

  const [hiSlugs, enSlugs, tags, uniqueDates] = await Promise.all([
    repo.getAllSlugs("hi"),
    repo.getAllSlugs("en"),
    repo.listAllTags(),
    repo.getAllDatesWithContent(),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    // ─── Core pages ─────────────────────────────────────────────────
    { url: `${siteConfig.url}`, changeFrequency: "daily", priority: 1 },
    { url: `${siteConfig.url}/current-affairs`, changeFrequency: "daily", priority: 0.9 },
    { url: `${siteConfig.url}/general-awareness`, changeFrequency: "daily", priority: 0.9 },
    { url: `${siteConfig.url}/weekly`, changeFrequency: "weekly", priority: 0.85 },
    { url: `${siteConfig.url}/monthly`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${siteConfig.url}/monthly-pdf`, changeFrequency: "monthly", priority: 0.75 },
    { url: `${siteConfig.url}/editorial`, changeFrequency: "daily", priority: 0.8 },
    { url: `${siteConfig.url}/upsc`, changeFrequency: "weekly", priority: 0.75 },
    { url: `${siteConfig.url}/mppsc`, changeFrequency: "weekly", priority: 0.75 },
    { url: `${siteConfig.url}/mppsc/syllabus-2026`, changeFrequency: "yearly", priority: 0.7 },
    { url: `${siteConfig.url}/mppsc/toppers-copy`, changeFrequency: "weekly", priority: 0.75 },
    { url: `${siteConfig.url}/publications`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteConfig.url}/publications/bharat-ka-itihas`, changeFrequency: "monthly", priority: 0.75 },
    { url: `${siteConfig.url}/test-series`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteConfig.url}/media-center`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteConfig.url}/free-pdf`, changeFrequency: "weekly", priority: 0.65 },
    { url: `${siteConfig.url}/blog`, changeFrequency: "weekly", priority: 0.65 },
    { url: `${siteConfig.url}/notifications`, changeFrequency: "daily", priority: 0.8 },
    { url: `${siteConfig.url}/calendar`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${siteConfig.url}/current-affairs/quiz`, changeFrequency: "daily", priority: 0.85 },
    { url: `${siteConfig.url}/current-affairs/daily`, changeFrequency: "daily", priority: 0.85 },
    { url: `${siteConfig.url}/faculty`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteConfig.url}/selections`, changeFrequency: "monthly", priority: 0.65 },
    { url: `${siteConfig.url}/online-courses`, changeFrequency: "weekly", priority: 0.85 },
    { url: `${siteConfig.url}/offline-courses`, changeFrequency: "weekly", priority: 0.85 },
    // ─── One Day Exam Pages (Hindi) ──────────────────────────────────
    { url: `${siteConfig.url}/one-day-exam/mpsi`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteConfig.url}/one-day-exam/mp-constable`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteConfig.url}/one-day-exam/mptet`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteConfig.url}/one-day-exam/ssc`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteConfig.url}/one-day-exam/railway`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteConfig.url}/one-day-exam/banking`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteConfig.url}/one-day-exam/esb-exams`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteConfig.url}/one-day-exam/other-govt-exams`, changeFrequency: "monthly", priority: 0.7 },

    // ─── Company pages ───────────────────────────────────────────────
    { url: `${siteConfig.url}/about`, changeFrequency: "yearly", priority: 0.45 },
    { url: `${siteConfig.url}/contact`, changeFrequency: "yearly", priority: 0.45 },
    { url: `${siteConfig.url}/download`, changeFrequency: "monthly", priority: 0.6 },
    // ─── Legal pages ─────────────────────────────────────────────────
    { url: `${siteConfig.url}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteConfig.url}/terms`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteConfig.url}/refund`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteConfig.url}/disclaimer`, changeFrequency: "yearly", priority: 0.3 },
    // ─── English mirrors ─────────────────────────────────────────────
    { url: `${siteConfig.url}/en`, changeFrequency: "daily", priority: 0.85 },
    { url: `${siteConfig.url}/en/current-affairs`, changeFrequency: "daily", priority: 0.75 },
    { url: `${siteConfig.url}/en/current-affairs/quiz`, changeFrequency: "daily", priority: 0.75 },
    { url: `${siteConfig.url}/en/current-affairs/daily`, changeFrequency: "daily", priority: 0.75 },
    { url: `${siteConfig.url}/en/general-awareness`, changeFrequency: "daily", priority: 0.75 },
    { url: `${siteConfig.url}/en/weekly`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${siteConfig.url}/en/monthly`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteConfig.url}/en/monthly-pdf`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteConfig.url}/en/editorial`, changeFrequency: "daily", priority: 0.65 },
    { url: `${siteConfig.url}/en/upsc`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${siteConfig.url}/en/mppsc`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${siteConfig.url}/en/mppsc/syllabus-2026`, changeFrequency: "yearly", priority: 0.55 },
    { url: `${siteConfig.url}/en/mppsc/toppers-copy`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${siteConfig.url}/en/publications`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${siteConfig.url}/en/publications/bharat-ka-itihas`, changeFrequency: "monthly", priority: 0.65 },
    { url: `${siteConfig.url}/en/test-series`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${siteConfig.url}/en/media-center`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${siteConfig.url}/en/free-pdf`, changeFrequency: "weekly", priority: 0.5 },
    { url: `${siteConfig.url}/en/blog`, changeFrequency: "weekly", priority: 0.5 },
    { url: `${siteConfig.url}/en/notifications`, changeFrequency: "daily", priority: 0.65 },
    { url: `${siteConfig.url}/en/calendar`, changeFrequency: "weekly", priority: 0.55 },
    { url: `${siteConfig.url}/en/faculty`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteConfig.url}/en/selections`, changeFrequency: "monthly", priority: 0.55 },
    { url: `${siteConfig.url}/en/online-courses`, changeFrequency: "weekly", priority: 0.75 },
    { url: `${siteConfig.url}/en/offline-courses`, changeFrequency: "weekly", priority: 0.75 },
    // ─── One Day Exam Pages (English) ────────────────────────────────
    { url: `${siteConfig.url}/en/one-day-exam/mpsi`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteConfig.url}/en/one-day-exam/mp-constable`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteConfig.url}/en/one-day-exam/mptet`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteConfig.url}/en/one-day-exam/ssc`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteConfig.url}/en/one-day-exam/railway`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteConfig.url}/en/one-day-exam/banking`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteConfig.url}/en/one-day-exam/esb-exams`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteConfig.url}/en/one-day-exam/other-govt-exams`, changeFrequency: "monthly", priority: 0.6 },

    { url: `${siteConfig.url}/en/about`, changeFrequency: "yearly", priority: 0.35 },
    { url: `${siteConfig.url}/en/contact`, changeFrequency: "yearly", priority: 0.35 },
    { url: `${siteConfig.url}/en/download`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteConfig.url}/en/privacy`, changeFrequency: "yearly", priority: 0.25 },
    { url: `${siteConfig.url}/en/terms`, changeFrequency: "yearly", priority: 0.25 },
    { url: `${siteConfig.url}/en/refund`, changeFrequency: "yearly", priority: 0.25 },
    { url: `${siteConfig.url}/en/disclaimer`, changeFrequency: "yearly", priority: 0.25 },
  ];

  const getPathSegment = (type: string) => {
    switch (type) {
      case "editorial":
        return "editorial";
      case "blog":
        return "blog";
      case "weekly":
        return "weekly";
      case "monthly":
        return "monthly";
      case "staticGk":
        return "general-awareness";
      default:
        return "current-affairs";
    }
  };

  const articlePages: MetadataRoute.Sitemap = [
    ...hiSlugs.map((s) => ({
      url: `${siteConfig.url}/${getPathSegment(s.type)}/${s.slug}`,
      lastModified: new Date(s.updatedAt),
      changeFrequency: "weekly" as const,
      priority: s.type === "editorial" ? 0.85 : 0.8,
    })),
    ...enSlugs.map((s) => ({
      url: `${siteConfig.url}/en/${getPathSegment(s.type)}/${s.slug}`,
      lastModified: new Date(s.updatedAt),
      changeFrequency: "weekly" as const,
      priority: s.type === "editorial" ? 0.75 : 0.7,
    })),
  ];

  const tagPages: MetadataRoute.Sitemap = tags.flatMap((t) => [
    {
      url: `${siteConfig.url}/tag/${t.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.65,
    },
    {
      url: `${siteConfig.url}/en/tag/${t.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.55,
    },
  ]);

  const datePages: MetadataRoute.Sitemap = uniqueDates.flatMap((date) => [
    {
      url: `${siteConfig.url}/current-affairs/${date}`,
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/en/current-affairs/${date}`,
      changeFrequency: "daily" as const,
      priority: 0.7,
    },
  ]);

  return [...staticPages, ...articlePages, ...tagPages, ...datePages];
}

