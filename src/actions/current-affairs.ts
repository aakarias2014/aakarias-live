"use server";

import { getContentRepository } from "@/lib/content/content-repository";
import type { Locale } from "@/lib/i18n/locales";
import type { ArticleListItem } from "@/lib/content/types";

/**
 * Fetch articles for a specific date (AJAX).
 */
export async function getArticlesByDateAction(
  date: string,
  locale: Locale
): Promise<ArticleListItem[]> {
  try {
    const repo = await getContentRepository();
    const result = await repo.listArticles({
      locale,
      date,
      contentType: "currentAffairs",
      pageSize: 48, // Fetch up to 48 articles for a single date
    });
    return result.items;
  } catch (err) {
    console.error(`getArticlesByDateAction failed for ${date}:`, err);
    return [];
  }
}

/**
 * Fetch articles for a date range (AJAX).
 */
export async function getArticlesByRangeAction(
  startDate: string,
  endDate: string,
  locale: Locale
): Promise<ArticleListItem[]> {
  try {
    const repo = await getContentRepository();
    const result = await repo.listArticles({
      locale,
      startDate,
      endDate,
      contentType: "currentAffairs",
      pageSize: 100, // Fetch up to 100 articles for range
    });
    return result.items;
  } catch (err) {
    console.error(`getArticlesByRangeAction failed:`, err);
    return [];
  }
}

/**
 * Get distinct dates with current affairs in a visible month (AJAX).
 */
export async function getDatesWithContentAction(
  year: number,
  month: number
): Promise<string[]> {
  try {
    const repo = await getContentRepository();
    return await repo.getDatesWithContent(year, month);
  } catch (err) {
    console.error(`getDatesWithContentAction failed for ${year}-${month}:`, err);
    return [];
  }
}

/**
 * Get adjacent dates (prev/next) that have content (AJAX).
 */
export async function getAdjacentDatesAction(
  date: string
): Promise<{ prev: string | null; next: string | null }> {
  try {
    const repo = await getContentRepository();
    return await repo.getAdjacentDates(date);
  } catch (err) {
    console.error(`getAdjacentDatesAction failed for ${date}:`, err);
    return { prev: null, next: null };
  }
}

/**
 * Get the latest date with current affairs content (AJAX).
 */
export async function getLatestDateWithContentAction(): Promise<string | null> {
  try {
    const repo = await getContentRepository();
    return await repo.getLatestDateWithContent();
  } catch (err) {
    console.error(`getLatestDateWithContentAction failed:`, err);
    return null;
  }
}

/**
 * Fetch daily quizzes from Sanity (for both admin panel and student hub).
 */
export async function getDailyQuizzesAction(locale: Locale): Promise<any[]> {
  const { sanityClient } = await import("@/lib/sanity/client");
  
  const query = `*[_type == "currentAffairs" && defined(mcqs) && count(mcqs) > 0] | order(coalesce(ca_date, string::split(publishedAt, "T")[0]) desc, publishedAt desc) [0...20] {
    "id": _id,
    "slug": slug.current,
    "titleHi": title,
    "titleEn": titleEn,
    "descriptionHi": excerpt,
    "descriptionEn": excerptEn,
    "ca_date": coalesce(ca_date, string::split(publishedAt, "T")[0]),
    "publishedAt": publishedAt,
    "readingTime": readingTime,
    "mcqs": mcqs[]{
      "question": question,
      "questionEn": questionEn,
      "options": options,
      "optionsEn": optionsEn,
      "correctIndex": correctIndex,
      "explanation": explanation,
      "explanationEn": explanationEn
    }
  }`;

  try {
    const results = await sanityClient.fetch(query);
    return results || [];
  } catch (error) {
    console.error("Error fetching daily quizzes from Sanity:", error);
    return [];
  }
}

/**
 * Fetch standalone subject-wise quizzes from Sanity.
 */
export async function getSubjectQuizzesAction(locale: Locale): Promise<any[]> {
  const { sanityClient } = await import("@/lib/sanity/client");
  
  const query = `*[_type == "subjectQuiz" && defined(mcqs) && count(mcqs) > 0] | order(_createdAt desc) [0...50] {
    "id": _id,
    "slug": slug.current,
    "titleHi": titleHi,
    "titleEn": titleEn,
    "descriptionHi": descriptionHi,
    "descriptionEn": descriptionEn,
    "subject": subject,
    "difficulty": difficulty,
    "durationMins": durationMins,
    "mcqs": mcqs[]{
      "question": question,
      "questionEn": questionEn,
      "options": options,
      "optionsEn": optionsEn,
      "correctIndex": correctIndex,
      "explanation": explanation,
      "explanationEn": explanationEn
    }
  }`;

  try {
    const results = await sanityClient.fetch(query);
    return results || [];
  } catch (error) {
    console.error("Error fetching subject quizzes from Sanity:", error);
    return [];
  }
}

/**
 * Fetch all quizzes from any articles (currentAffairs, staticGk) containing MCQs.
 */
export async function getAllArticleQuizzesAction(locale: Locale): Promise<any[]> {
  const { sanityClient } = await import("@/lib/sanity/client");
  const isHi = locale === "hi";

  const query = `*[_type == "currentAffairs" && defined(mcqs) && count(mcqs) > 0] | order(coalesce(ca_date, string::split(publishedAt, "T")[0]) desc, publishedAt desc) {
    "id": _id,
    "_type": _type,
    "slug": slug.current,
    "title": ${isHi ? "coalesce(title, titleEn)" : "coalesce(titleEn, title)"},
    "excerpt": ${isHi ? "coalesce(excerpt, excerptEn)" : "coalesce(excerptEn, excerpt)"},
    "ca_date": coalesce(ca_date, string::split(publishedAt, "T")[0]),
    "publishedAt": publishedAt,
    "category": category-> {
      "id": _id,
      "slug": slug.current,
      "name": ${isHi ? "coalesce(name, nameEn)" : "coalesce(nameEn, name)"}
    },
    "mcqs": mcqs[]{
      "question": ${isHi ? "coalesce(question, questionEn)" : "coalesce(questionEn, question)"},
      "questionEn": questionEn,
      "options": ${isHi ? "coalesce(options, optionsEn)" : "coalesce(optionsEn, options)"},
      "optionsEn": optionsEn,
      "correctIndex": correctIndex,
      "explanation": ${isHi ? "coalesce(explanation, explanationEn)" : "coalesce(explanationEn, explanation)"},
      "explanationEn": explanationEn
    }
  }`;

  try {
    const results = await sanityClient.fetch(query);
    return results || [];
  } catch (error) {
    console.error("Error fetching all article quizzes from Sanity:", error);
    return [];
  }
}

