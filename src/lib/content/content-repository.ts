/**
 * Content repository interface — the swappable seam between the UI and the data
 * source. Phase 1 ships a Sanity-backed implementation. Future CMS/search
 * backends implement this same interface, so UI code never changes.
 *
 * Implementations:
 *   - SanityRepository (Phase 1, active)
 *   - (future) AlgoliaSearchRepository (Phase 5 — wraps search only)
 */

import type {
  Article,
  ArticleListItem,
  Category,
  Tag,
  ListFilters,
  ListQuery,
  Paginated,
  MonthlyPDF,
  ExamNotification,
  ExamCalendar,
  GlobalFAQ,
  PYQ,
  HomeConfig,
  DownloadPageConfig,
  StaticPage,
  TestSeries,
  Publication,
  MediaRelease,
  SyllabusPage,
  Topper,
  TopperCopy,
  Ad,
  Faculty,
  OfflineBatch,
  OnlineCourse,
  TestSchedule,
  AboutPageConfig,
  NcertBook,
  HomeNotice,
} from "@/lib/content/types";
import type { Locale } from "@/lib/i18n/locales";
import type { SearchHit } from "@/lib/search/algolia";

export interface ContentRepository {
  /** Fetch active homepage notices. */
  getHomeNotices(locale: Locale): Promise<HomeNotice[]>;
  getArticle(slug: string, locale: Locale): Promise<Article | null>;

  /** Card-style list (listings, related, homepage). */
  listArticles(query: ListQuery): Promise<Paginated<ArticleListItem>>;

  /** Featured / pinned articles for a section. */
  getFeatured(
    locale: Locale,
    contentType?: string,
    limit?: number,
    tag?: string,
    category?: string
  ): Promise<ArticleListItem[]>;

  /** Popular articles (by views or a curated field). */
  getPopular(
    locale: Locale,
    limit?: number,
    tag?: string,
    category?: string
  ): Promise<ArticleListItem[]>;

  /** All categories + tags, for listing filters. */
  getFilters(locale: Locale): Promise<ListFilters>;

  /** Categories only. */
  getCategories(locale: Locale): Promise<Category[]>;

  /** Get a single category by slug. */
  getCategory(slug: string, locale: Locale): Promise<Category | null>;

  /** Get a single tag by slug. */
  getTag(slug: string, locale: Locale): Promise<Tag | null>;

  /** Full-text search. In Phase 5 this delegates to Algolia. */
  search(query: string, locale: Locale, limit?: number): Promise<SearchHit[]>;

  /** All article slugs per locale — used by sitemap + generateStaticParams.
   *  Pass contentType to restrict to a single _type (e.g. "editorial"). */
  getAllSlugs(locale: Locale, contentType?: string): Promise<{ slug: string; type: string; updatedAt: string }[]>;

  /** List monthly and free PDFs. Filter by pdfType if provided. */
  listMonthlyPdfs(locale: Locale, pdfType?: "monthly" | "half-yearly" | "yearly" | "custom" | "pyq" | "syllabus", limit?: number): Promise<MonthlyPDF[]>;

  /** Get monthly PDF by slug. */
  getMonthlyPdf(slug: string, locale: Locale): Promise<MonthlyPDF | null>;

  /** List exam notifications. */
  listNotifications(locale: Locale, limit?: number): Promise<ExamNotification[]>;

  /** Get a single notification by id. */
  getNotification(id: string, locale: Locale): Promise<ExamNotification | null>;

  /** List exam calendar entries. */
  listExamCalendar(locale: Locale): Promise<ExamCalendar[]>;

  /** List global FAQs. */
  listGlobalFaqs(locale: Locale): Promise<GlobalFAQ[]>;

  /** List previous year questions (PYQs) with custom filters. */
  listPyqs(query: {
    exam?: string;
    year?: number;
    subject?: string;
    topic?: string;
    page?: number;
    pageSize?: number;
  }): Promise<Paginated<PYQ>>;

  /** List all tags for sitemap generation. */
  listAllTags(): Promise<{ slug: string }[]>;

  /** List NCERT E-Books, optionally filtered by class number. */
  listNcertBooks(classNumber?: number): Promise<NcertBook[]>;

  /** Get all distinct ca_date values for currentAffairs in a given month. */
  getDatesWithContent(year: number, month: number): Promise<string[]>;

  /** Get all distinct ca_date values for XML sitemap generation. */
  getAllDatesWithContent(): Promise<string[]>;

  /** Get the latest ca_date with content. */
  getLatestDateWithContent(): Promise<string | null>;

  /** Get adjacent dates with content (prev and next). */
  getAdjacentDates(date: string): Promise<{ prev: string | null; next: string | null }>;

  /** Fetch home page hero notice and ticker config. */
  getHomeConfig(locale: Locale): Promise<HomeConfig | null>;

  /** Fetch app download page options. */
  getDownloadPageConfig(locale: Locale): Promise<DownloadPageConfig | null>;

  /** Fetch about us static content. */
  getStaticPage(slug: string, locale: Locale): Promise<StaticPage | null>;

  /** List dynamic test series. */
  listTestSeries(locale: Locale): Promise<TestSeries[]>;

  /** List books/publications. */
  listPublications(locale: Locale): Promise<Publication[]>;

  /** Get book/publication details by slug. */
  getPublication(slug: string, locale: Locale): Promise<Publication | null>;

  /** List media center news mentions. */
  listMediaReleases(locale: Locale): Promise<MediaRelease[]>;

  /** Fetch syllabus breakdown details. */
  getSyllabusPage(slug: string, locale: Locale): Promise<SyllabusPage | null>;

  /** List dynamic answer sheet PDF uploads. */
  listTopperCopies(locale: Locale): Promise<TopperCopy[]>;

  /** List toppers/selected candidates from Sanity. */
  listToppers(locale: Locale): Promise<Topper[]>;

  /** List dynamic advertisements / banners. */
  listAds(locale: Locale): Promise<Ad[]>;

  /** List dynamic test schedules. */
  listTestSchedules(locale: Locale): Promise<TestSchedule[]>;

  /** List dynamic faculty members / senior mentors. */
  listFaculties(locale: Locale): Promise<Faculty[]>;

  /** List dynamic offline classroom batches. */
  listOfflineBatches(locale: Locale): Promise<OfflineBatch[]>;

  /** List dynamic online courses. */
  listOnlineCourses(locale: Locale): Promise<OnlineCourse[]>;

  /** Get dynamic online course by slug. */
  getOnlineCourse(slug: string, locale: Locale): Promise<OnlineCourse | null>;

  /** Fetch about page configuration (testimonials, gallery). */
  getAboutPageConfig(locale: Locale): Promise<AboutPageConfig | null>;

  /** Fetch offline brochure PDF URL. */
  getOfflineBrochureUrl(): Promise<string | null>;
}

/**
 * Factory: returns the active repository based on CONTENT_SOURCE.
 * Today only "sanity" is supported.
 */
export async function getContentRepository(): Promise<ContentRepository> {
  const { env } = await import("@/lib/env");
  const source = env().CONTENT_SOURCE;

  switch (source) {
    case "sanity": {
      const { SanityRepository } = await import("@/lib/content/sanity-repository");
      return new SanityRepository();
    }
    default:
      throw new Error(`Unknown CONTENT_SOURCE: "${source}". Supported: "sanity".`);
  }
}
