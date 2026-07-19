/**
 * Domain types for Aakar IAS content.
 *
 * These are the canonical, transport-agnostic shapes used across the UI. They
 * are intentionally NOT the raw Sanity document shapes — the Sanity repository
 * (sanity-repository.ts) projects Sanity documents into these types so the UI
 * never couples to a specific CMS. Swapping CMS means writing a new adapter
 * that emits these same types.
 */

import type { Locale } from "@/lib/i18n/locales";

export type ContentTypeId =
  | "currentAffairs"
  | "editorial"
  | "weekly"
  | "monthly"
  | "monthlyPdf"
  | "blog"
  | "staticGk";

/** A category (e.g. "Economy", "Polity", "Environment"). */
export interface Category {
  id: string;
  slug: string;
  title: string;
  titleEn?: string;
  description?: string;
  descriptionEn?: string;
  color?: string;
  icon?: string;
}

export interface Tag {
  id: string;
  slug: string;
  name: string;
}

export interface Author {
  id: string;
  name: string;
  slug: string;
  bio?: string;
  avatar?: string | null;
  role?: string;
}

export interface FeaturedImage {
  url: string;
  alt: string;
  width?: number;
  height?: number;
  blurDataURL?: string;
  caption?: string;
  credit?: string;
}

/* ─── Article body: portable, structured blocks ──────────────────────── */

export type ArticleBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3; text: string; id: string }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "quote"; text: string; cite?: string }
  | { type: "image"; image: FeaturedImage }
  | { type: "table"; table: ArticleTable }
  | { type: "timeline"; items: TimelineItem[] }
  | { type: "facts"; items: FactItem[] };

export interface ArticleTable {
  caption?: string;
  headers: string[];
  rows: string[][];
}

export interface TimelineItem {
  date: string;
  title: string;
  description?: string;
}

export interface FactItem {
  label: string;
  value: string;
}

/**
 * A named, semantic section of an article. These map directly to the PRD's
 * mandated article structure (Why In News, Background, Key Highlights, …).
 */
export type ArticleSectionKind =
  | "whyInNews"
  | "background"
  | "keyHighlights"
  | "keyAspects"
  | "quickFacts"
  | "importance"
  | "governmentInitiatives"
  | "internationalPerspective"
  | "prelimsPoint"
  | "mainsPoint"
  | "factsAtAGlance"
  | "timeline"
  | "practiceQuestions";

export interface ArticleSection {
  id: string;
  kind: ArticleSectionKind;
  title: string;
  blocks: ArticleBlock[];
}

export interface MCQ {
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface GlobalFAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface MonthlyPDF {
  id: string;
  slug: string;
  title: string;
  month: string; // YYYY-MM
  fileUrl?: string; // resolved file URL
  coverImage?: string; // resolved cover image URL
  description?: string;
  pdfType: "monthly" | "half-yearly" | "yearly" | "custom" | "pyq" | "syllabus";
  publishedAt: string;
  toc?: string[];
}

export interface ExamNotification {
  id: string;
  title: string;
  exam: "UPSC" | "MPPSC" | "Other";
  date: string; // ISO
  status: "upcoming" | "out" | "closed";
  url?: string;
  description?: string;
}

export interface ExamCalendar {
  id: string;
  name: string;
  examDate: string; // ISO Datetime string
  dateText: string;
  status: "upcoming" | "ongoing" | "completed";
  description?: string;
  isPrimaryCountdown: boolean;
}

export interface PYQ {
  id: string;
  title: string;
  titleEn?: string;
  exam: "UPSC" | "MPPSC";
  year: number;
  subject: string;
  topic?: string;
  paper: string;
  fileUrl?: string;
  publishedAt?: string;
}

export interface NcertBook {
  id: string;
  title: string;
  titleEn: string;
  classNumber: number;
  subject: string;
  part?: string;
  language: "hi" | "en";
  fileUrl?: string;
  coverImageUrl?: string;
}

export interface SourceRef {
  label: string;
  url?: string;
}

/** Item in the table of contents (derived from sections/headings). */
export interface TOCItem {
  id: string;
  text: string;
  level: number;
}

/** A single related-articles entry (lightweight, for cards). */
export interface ArticleListItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO
  ca_date?: string; // Current Affairs Date (YYYY-MM-DD)
  readingTime?: number;
  featuredImage?: FeaturedImage | null;
  category?: Category;
  author?: Pick<Author, "name" | "slug" | "avatar">;
  tags?: Tag[];
  locale: Locale;
  href: string;
  syllabus?: string[];
  type?: string;
}

/** Full article — used on the single-article page. */
export interface Article extends ArticleListItem {
  bodyHtml?: string; // optional pre-rendered HTML (if block rendering is external)
  sections: ArticleSection[];
  mcqs?: MCQ[];
  faqs?: FAQ[];
  sources?: SourceRef[];
  tableOfContents: TOCItem[];
  related: ArticleListItem[];
  alternates: { hi: string; en: string };
  keywords?: string[];
  nextArticle?: {
    title: string;
    href: string;
  } | null;
}

/* ─── Query / pagination shapes ──────────────────────────────────────── */

export interface ListQuery {
  locale?: Locale;
  category?: string; // slug
  tag?: string; // slug
  contentType?: ContentTypeId;
  cursor?: string; // ISO date for cursor pagination
  page?: number;
  pageSize?: number;
  search?: string;
  /** "YYYY-MM" for weekly/monthly grouping. */
  period?: string;
  date?: string; // "YYYY-MM-DD"
  startDate?: string; // "YYYY-MM-DD"
  endDate?: string; // "YYYY-MM-DD"
}

export interface Paginated<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
}

export interface ListFilters {
  categories: Category[];
  tags: Tag[];
}

/* ─── New Content Types (Admin connected pages) ──────────────────────── */

export interface HeroSlide {
  title?: string;
  subtitle?: string;
  desktopImageUrl: string;
  mobileImageUrl: string;
  link?: string;
}

export interface HomeYoutubeChannel {
  title: string;
  handle: string;
  subscribers: string;
  url: string;
  avatarUrl?: string;
}

export interface HomeConfig {
  heroTitle: string;
  heroSubtitle?: string;
  noticeTicker?: string;
  noticeLink?: string;
  introVideoId?: string;
  bannerImageUrl?: string;
  heroSlides?: HeroSlide[];
  mainYoutubeChannelId?: string;
  youtubeChannels?: HomeYoutubeChannel[];
}

export interface HomeNotice {
  id: string;
  noticeTextHi: string;
  noticeTextEn: string;
  noticeText?: string; // Resolved based on locale
  noticeLink?: string;
  isActive: boolean;
  orderIndex: number;
}

export interface AppFeature {
  icon: string;
  title: string;
  desc: string;
}

export interface DownloadPageConfig {
  playStoreUrl?: string;
  appStoreUrl?: string;
  windowsUrl?: string;
  macIntelUrl?: string;
  macSiliconUrl?: string;
  appVersion?: string;
  screenshots: string[]; // URLs
  features: AppFeature[];
  faqs: FAQ[];
}

export interface StaticPage {
  slug: string;
  title: string;
  body: any[]; // Portable text
}

export interface TestSeries {
  id: string;
  slug: string;
  title: string;
  description?: string;
  price?: number;
  originalPrice?: number;
  buyLink?: string;
  active: boolean;
  features?: string[];
  featuresEn?: string[];
  badgeHi?: string;
  badgeEn?: string;
  badge?: string;
  orderIndex?: number;
}

export interface Publication {
  id: string;
  slug: string;
  title: string;
  titleEn?: string;
  description?: string;
  descriptionEn?: string;
  price?: number;
  originalPrice?: number;
  rating?: number;
  reviewsCount?: number;
  edition?: string;
  badge?: string;
  pages?: string;
  medium?: string;
  features?: string[];
  toc?: string[];
  authorDetails?: string;
  soldOut?: boolean;
  coverImage?: string;
  buyLink?: string;
}

export interface MediaRelease {
  id: string;
  slug: string;
  title: string;
  publishedAt?: string; // YYYY-MM-DD
  source?: string;
  url?: string;
  imageUrl?: string;
}

export interface SyllabusUnit {
  unitNumber: string;
  unitTitle: string;
  details?: string;
}

export interface SyllabusPaper {
  paperTitle: string;
  units: SyllabusUnit[];
}

export interface SyllabusPage {
  slug: string;
  title: string;
  exam: "UPSC" | "MPPSC";
  year: number;
  papers: SyllabusPaper[];
}

export interface Topper {
  id: string;
  name: string;
  nameEn: string;
  rank: number;
  exam: "UPSC" | "MPPSC";
  year: number;
  post: string;
  postEn: string;
  avatar: string;
  quote?: string;
  quoteEn?: string;
  rollNo?: string;
  isRanker?: boolean;
}

export interface TopperCopy {
  id: string;
  slug: string;
  name: string;
  rank?: number;
  year?: number;
  exam: "UPSC" | "MPPSC";
  score?: number;
  subject?: string;
  fileUrl: string;
  photoUrl?: string;
  isRecommended?: boolean;
  recommendedBy?: {
    nameHi: string;
    nameEn: string;
    image?: string;
  };
  recommendationReasonHi?: string;
  recommendationReasonEn?: string;
}


export interface Ad {
  id: string;
  image: string; // URL
  titleHi: string;
  titleEn: string;
  subtitleHi: string;
  subtitleEn: string;
  ctaHi: string;
  ctaEn: string;
  href: string;
  hrefEn?: string;
}

export interface Faculty {
  id: string;
  nameHi: string;
  nameEn: string;
  titleHi: string;
  titleEn: string;
  descHi: string;
  descEn: string;
  image: string; // URL
  medium: "hindi" | "english";
  orderIndex: number;
}

export interface OfflineBatch {
  id: string;
  titleHi: string;
  titleEn: string;
  startDateHi: string;
  startDateEn: string;
  timeHi: string;
  timeEn: string;
  medium: "hindi" | "english" | "bilingual";
  badgeHi?: string;
  badgeEn?: string;
  seatsFillPercent?: number;
  descHi?: string;
  descEn?: string;
  locationNameHi?: string;
  locationNameEn?: string;
  center: string;
  orderIndex: number;
  isNew?: boolean;
}

export interface OnlineCourse {
  id: string;
  slug: string;
  titleHi: string;
  titleEn: string;
  category: "live" | "upsc" | "mppsc" | "mpsi" | "literature";
  image: string; // URL
  altHi?: string;
  altEn?: string;
  badgeHi?: string;
  badgeEn?: string;
  isLive?: boolean;
  enrollUrl?: string;
  mentorNameHi?: string;
  mentorNameEn?: string;
  mentorTitleHi?: string;
  mentorTitleEn?: string;
  mentorImage?: string; // URL
  mentorBioHi?: string;
  mentorBioEn?: string;
  price: string;
  originalPrice: string;
  durationHi?: string;
  durationEn?: string;
  lecturesCountHi?: string;
  lecturesCountEn?: string;
  studentsCountHi?: string;
  studentsCountEn?: string;
  rating?: string;
  descriptionHi?: string;
  descriptionEn?: string;
  whatYouLearnHi?: string[];
  whatYouLearnEn?: string[];
  highlightsHi?: string[];
  highlightsEn?: string[];
  syllabus?: Array<{
    titleHi?: string;
    titleEn?: string;
    topicsHi?: string[];
    topicsEn?: string[];
  }>;
  features?: Array<{
    icon: string;
    labelHi?: string;
    labelEn?: string;
    valueHi?: string;
    valueEn?: string;
  }>;
  testimonials?: Array<{
    nameHi?: string;
    nameEn?: string;
    examHi?: string;
    examEn?: string;
    textHi?: string;
    textEn?: string;
    avatar?: string; // URL
  }>;
  orderIndex: number;
}

export interface TestSchedule {
  id: string;
  date: string;
  code: string;
  titleHi: string;
  titleEn: string;
  focusHi?: string;
  focusEn?: string;
  orderIndex: number;
}

export interface AboutTestimonial {
  nameHi: string;
  nameEn: string;
  examHi: string;
  examEn: string;
  quoteHi: string;
  quoteEn: string;
  avatar: string; // URL
}

export interface AboutGalleryImage {
  image: string; // URL
  captionHi: string;
  captionEn: string;
  layout: "large" | "small" | "full";
}

export interface AboutPageConfig {
  testimonials: AboutTestimonial[];
  galleryImages: AboutGalleryImage[];
}

export interface OfflinePageConfig {
  brochureUrl: string | null;
}

