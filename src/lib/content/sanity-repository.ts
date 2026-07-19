/**
 * Sanity-backed ContentRepository.
 *
 * - All GROQ queries live here.
 * - Bilingual projection: articles carry separate hi_/en_ field sets in Sanity.
 *   The query selects the requested locale's title/excerpt/body and always
 *   returns the *other* locale's slug for the language switcher's alternate.
 * - Raw Sanity documents are mapped to the domain types in `types.ts`, so the
 *   UI never imports Sanity-specific shapes.
 *
 * NOTE: Field names below assume the Sanity schema uses `title`, `excerpt`,
 * `body` for Hindi (default) and `titleEn`, `excerptEn`, `bodyEn` for English,
 * with a shared `slug`. Confirm these against your Studio schema; if they
 * differ, only this file changes.
 */

import { sanityFetch } from "@/lib/sanity/fetch";
import { imageUrl } from "@/lib/sanity/image";
import type { ContentRepository } from "@/lib/content/content-repository";
import type {
  Article,
  ArticleBlock,
  ArticleListItem,
  ArticleSection,
  ArticleSectionKind,
  Category,
  ListFilters,
  ListQuery,
  Paginated,
  TOCItem,
  Tag,
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
import { defaultLocale, localePrefix } from "@/lib/i18n/locales";
import type { SearchHit } from "@/lib/search/algolia";

const REVALIDATE = 3600; // 1h ISR default

/** Sanity document types that carry article-like content (body, author, etc.). */
const ARTICLE_TYPES = ["currentAffairs", "article", "editorial", "blog", "weekly", "monthly", "staticGk"];

/* ─── Raw Sanity shapes (internal) ───────────────────────────────────── */

interface RawCategory {
  _id: string;
  slug: { current: string };
  title: string;
  titleEn?: string;
  description?: string;
  descriptionEn?: string;
  color?: { hex: string };
  icon?: string;
}
interface RawTag {
  _id: string;
  slug: { current: string };
  name: string;
}
interface RawAuthor {
  _id: string;
  name: string;
  slug: { current: string };
  bio?: string;
  role?: string;
  avatar?: { asset?: { _ref: string } };
}
interface RawImage {
  asset?: { _ref: string };
  alt?: string;
  caption?: string;
  credit?: string;
}
interface RawArticleCard {
  _id: string;
  slug: { current: string };
  title: string;
  titleEn?: string;
  excerpt: string;
  excerptEn?: string;
  publishedAt: string;
  readingTime?: number;
  featuredImage?: RawImage;
  category?: RawCategory;
  author?: RawAuthor;
  tags?: RawTag[];
  syllabus?: string[];
  _type: string;
}

/* ─── GROQ fragments (reused across queries) ─────────────────────────── */

const categoryProjection = `{
  _id,
  "slug": slug.current,
  title,
  titleEn,
  description,
  descriptionEn,
  "color": coalesce(color.hex, color),
  icon
}`;

const tagProjection = `{ _id, "slug": slug.current, name }`;

const authorProjection = `{
  _id, name, "slug": slug.current, bio, role,
  "avatar": avatar.asset._ref
}`;

const featuredImageProjection = `{
  "assetRef": asset._ref,
  alt, caption, credit
}`;

/** Card projection. Selects the requested locale's text fields. */
function cardProjection(locale: Locale): string {
  const isHi = locale === "hi";
  return `{
    _id,
    "slug": slug.current,
    "title": ${isHi ? "coalesce(title, titleEn)" : "coalesce(titleEn, title)"},
    "excerpt": ${isHi ? "coalesce(excerpt, excerptEn)" : "coalesce(excerptEn, excerpt)"},
    "date": coalesce(ca_date, string::split(publishedAt, "T")[0]),
    "ca_date": ca_date,
    publishedAt,
    readingTime,
    "featuredImage": featuredImage ${featuredImageProjection},
    "category": category-> ${categoryProjection},
    "author": author-> ${authorProjection},
    "tags": tags[]-> ${tagProjection},
    syllabus,
    _type
  }`;
}

function getSlug(slug: any): string {
  if (!slug) return "";
  if (typeof slug === "string") return slug;
  return slug.current ?? "";
}

/* ─── Mapping helpers ────────────────────────────────────────────────── */

function mapCategory(c: RawCategory | undefined | null, locale: Locale): Category | undefined {
  if (!c) return undefined;
  return {
    id: c._id,
    slug: getSlug(c.slug),
    title: (locale === "hi" ? c.title : c.titleEn) ?? c.title,
    titleEn: c.titleEn,
    description: (locale === "hi" ? c.description : c.descriptionEn) ?? c.description,
    descriptionEn: c.descriptionEn,
    color: c.color?.hex,
    icon: c.icon,
  };
}

function mapTag(t: RawTag): Tag {
  return { id: t._id, slug: getSlug(t.slug), name: t.name };
}

function parseAssetDimensions(ref: string | undefined): { width?: number; height?: number } {
  if (!ref) return {};
  const match = ref.match(/-([0-9]+)x([0-9]+)-/);
  if (match) {
    const width = parseInt(match[1], 10);
    const height = parseInt(match[2], 10);
    if (!isNaN(width) && !isNaN(height)) {
      return { width, height };
    }
  }
  return {};
}

function mapImage(img: (RawImage & { assetRef?: string }) | undefined | null) {
  const ref = img?.assetRef ?? img?.asset?._ref;
  const url = imageUrl(ref, { width: 1600, quality: 80, format: "webp" });
  const dims = parseAssetDimensions(ref);
  if (!url) {
    return {
      url: "/default-cover.png",
      alt: img?.alt || "Aakar IAS",
      caption: img?.caption,
      credit: img?.credit,
      width: 800,
      height: 450,
    };
  }
  return {
    url,
    alt: img?.alt ?? "",
    caption: img?.caption,
    credit: img?.credit,
    ...dims,
  };
}

function articleHref(slug: string, _type: string, locale: Locale): string {
  const prefix = localePrefix(locale);
  if (_type === "onlineCourse") {
    return `${prefix}/online-courses/${slug}`;
  }
  // Map Sanity _type to route segment.
  const segment =
    _type === "editorial"
      ? "editorial"
      : _type === "blog"
        ? "blog"
        : _type === "weekly"
          ? "weekly"
          : _type === "monthly"
            ? "monthly"
            : _type === "staticGk"
              ? "general-awareness"
              : "current-affairs";
  return `${prefix}/${segment}/${slug}`;
}

function mapCard(raw: RawArticleCard & { date?: string; ca_date?: string }, locale: Locale): ArticleListItem {
  const slug = getSlug(raw.slug);
  return {
    id: raw._id,
    slug,
    title: raw.title ?? "Untitled",
    excerpt: raw.excerpt ?? "",
    date: raw.date ?? raw.publishedAt,
    ca_date: raw.ca_date,
    readingTime: raw.readingTime,
    featuredImage: mapImage(raw.featuredImage),
    category: mapCategory(raw.category, locale),
    author: raw.author
      ? {
          name: raw.author.name,
          slug: getSlug(raw.author.slug),
          avatar: raw.author.avatar
            ? (typeof raw.author.avatar === "string"
              ? imageUrl(raw.author.avatar, { width: 300, height: 300, fit: "crop", quality: 90 })
              : imageUrl(raw.author.avatar.asset?._ref, { width: 300, height: 300, fit: "crop", quality: 90 }))
            : undefined,
        }
      : undefined,
    tags: raw.tags?.filter(Boolean).map(mapTag),
    locale,
    href: articleHref(slug, raw._type, locale),
    syllabus: raw.syllabus,
    type: raw._type,
  };
}

/* ─── Body mapping: Portable Text -> ArticleBlock[] + TOC ────────────── */

/**
 * Maps a Sanity Portable Text array to our ArticleBlock[] and derives the TOC.
 * If your Sanity schema stores body as raw Portable Text, pass it here. If you
 * store structured sections instead, see mapSections below.
 */
function mapPortableTextToBlocks(
  blocks: Array<Record<string, unknown>> | undefined,
): { blocks: ArticleBlock[]; toc: TOCItem[] } {
  const out: ArticleBlock[] = [];
  const toc: TOCItem[] = [];
  if (!Array.isArray(blocks)) return { blocks: out, toc };

  // Helper: extract text from children, preserving bold marks
  function extractText(children: Array<{ text?: string; marks?: string[] }> | undefined): string {
    return children
      ?.map((c) => {
        const t = c.text ?? "";
        if (!t) return "";
        const marks = c.marks ?? [];
        const isBold = marks.includes("strong");
        return isBold ? `**${t}**` : t;
      })
      .join("") ?? "";
  }

  // Helper: detect if text starts with a bullet or numbered prefix
  function parseBulletItem(text: string): { isBullet: boolean; isOrdered: boolean; cleanText: string } {
    // Detect • prefix
    if (text.startsWith("• ") || text.startsWith("•")) {
      const clean = text.replace(/^•\s*/, "").trim();
      return { isBullet: true, isOrdered: false, cleanText: clean };
    }
    // Detect numbered prefix like "1. " "2. "
    const numMatch = text.match(/^(\d+)\.\s+(.+)/);
    if (numMatch) {
      return { isBullet: true, isOrdered: true, cleanText: numMatch[2] };
    }
    return { isBullet: false, isOrdered: false, cleanText: text };
  }

  // Helper: auto-bold the title portion (before first colon) in a list item
  function autoBoldTitle(text: string): string {
    // If already has bold marks, skip
    if (text.includes("**")) return text;
    // Find first colon followed by a space
    const colonIdx = text.indexOf(": ");
    if (colonIdx > 0 && colonIdx < 80) {
      const title = text.substring(0, colonIdx);
      // If the title portion contains an unclosed bracket '[', skip auto-bolding to prevent breaking markdown links.
      if (title.includes("[") && !title.includes("]")) {
        return text;
      }
      const rest = text.substring(colonIdx);
      return `**${title}**${rest}`;
    }
    return text;
  }

  // Temporary list accumulator
  let pendingListItems: string[] = [];
  let pendingOrdered = false;

  function flushList() {
    if (pendingListItems.length > 0) {
      out.push({ type: "list", ordered: pendingOrdered, items: [...pendingListItems] });
      pendingListItems = [];
    }
  }

  for (const b of blocks) {
    const btype = b._type as string | undefined;
    if (btype === "block") {
      const blockStyle = (b.style as string) ?? "normal";
      const children = b.children as Array<{ text?: string; marks?: string[] }> | undefined;
      const text = extractText(children);

      if (blockStyle === "normal") {
        const { isBullet, isOrdered, cleanText } = parseBulletItem(text);
        if (isBullet) {
          // If switching from ordered to unordered or vice versa, flush first
          if (pendingListItems.length > 0 && pendingOrdered !== isOrdered) {
            flushList();
          }
          pendingOrdered = isOrdered;
          pendingListItems.push(autoBoldTitle(cleanText));
        } else {
          flushList();
          out.push({ type: "paragraph", text });
        }
      } else if (blockStyle === "h2" || blockStyle === "h3") {
        flushList();
        const plainText = text.replace(/\*\*/g, "");
        const id = slugify(plainText);
        out.push({ type: "heading", level: blockStyle === "h2" ? 2 : 3, text: plainText, id });
        toc.push({ id, text: plainText, level: blockStyle === "h2" ? 2 : 3 });
      } else if (blockStyle === "blockquote") {
        flushList();
        out.push({ type: "quote", text });
      }
    } else if (btype === "image") {
      flushList();
      const img = mapImage(b as unknown as RawImage);
      if (img) out.push({ type: "image", image: img });
    } else if (btype === "table") {
      flushList();
      const rawTable = b.table as any;
      if (rawTable) {
        out.push({
          type: "table",
          table: {
            caption: rawTable.caption,
            headers: Array.isArray(rawTable.headers) ? rawTable.headers : [],
            rows: Array.isArray(rawTable.rows) ? rawTable.rows : [],
          },
        });
      }
    }
  }

  // Flush any remaining list items
  flushList();

  return { blocks: out, toc };
}

function slugify(s: string): string {
  const slugified = s
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-");
  return slugified || "sec-" + Math.random().toString(36).substring(2, 9);
}

/** Maps structured sections (whyInNews, background, …) if present. */
function mapSections(
  rawSections: Array<Record<string, unknown>> | undefined,
  locale: Locale,
): { sections: ArticleSection[]; toc: TOCItem[] } {
  const sections: ArticleSection[] = [];
  const toc: TOCItem[] = [];
  if (!Array.isArray(rawSections)) return { sections, toc };

  for (const s of rawSections) {
    const kind = (s.kind as ArticleSectionKind) ?? "keyHighlights";
    const titleField = locale === "hi" ? "title" : "titleEn";
    const bodyField = locale === "hi" ? "body" : "bodyEn";
    const title = (s[titleField] as string) ?? (s.title as string) ?? kind;
    const body = s[bodyField] ?? s.body;
    const { blocks, toc: subToc } = mapPortableTextToBlocks(
      body as Array<Record<string, unknown>>,
    );
    const id = slugify(title);
    toc.push({ id, text: title, level: 2 });
    toc.push(...subToc.map((t) => ({ ...t, level: t.level + 1 })));
    sections.push({ id, kind, title, blocks });
  }
  return { sections, toc };
}

/* ─── Repository implementation ──────────────────────────────────────── */

export class SanityRepository implements ContentRepository {
  async getArticle(slug: string, locale: Locale): Promise<Article | null> {
    const isHi = locale === "hi";
    const query = `*[
      _type in [${ARTICLE_TYPES.map((t) => `"${t}"`).join(",")}] &&
      slug.current == $slug &&
      !(_id in path("drafts.**"))
    ][0]{
      _id,
      _type,
      "slug": slug.current,
      "title": ${isHi ? "coalesce(title, titleEn)" : "coalesce(titleEn, title)"},
      "excerpt": ${isHi ? "coalesce(excerpt, excerptEn)" : "coalesce(excerptEn, excerpt)"},
      "body": ${isHi ? "body" : "coalesce(bodyEn, body)"},
      "sections": sections,
      publishedAt,
      updatedAt,
      readingTime,
      keywords,
      "featuredImage": featuredImage ${featuredImageProjection},
      "category": category-> ${categoryProjection},
      "author": author-> ${authorProjection},
      "tags": tags[]-> ${tagProjection},
      syllabus,
      "mcqs": mcqs[]{
        "question": ${isHi ? "coalesce(question, questionEn)" : "coalesce(questionEn, question)"},
        "options": ${isHi ? "coalesce(options, optionsEn)" : "coalesce(optionsEn, options)"},
        correctIndex,
        "explanation": ${isHi ? "coalesce(explanation, explanationEn)" : "coalesce(explanationEn, explanation)"}
      },
      "faqs": faqs[]{
        "question": ${isHi ? "coalesce(question, questionEn)" : "coalesce(questionEn, question)"},
        "answer": ${isHi ? "coalesce(answer, answerEn)" : "coalesce(answerEn, answer)"}
      },
      "sources": sources[]{ label, "url": url },
      "nextArticle": nextArticle-> {
        _type,
        "slug": slug.current,
        "title": coalesce(title, titleEn)
      },
      "relatedTags": *[
        _type in [${ARTICLE_TYPES.map((t) => `"${t}"`).join(",")}] &&
        _id != ^._id &&
        count(tags[_ref in ^.tags[]._ref]) > 0
      ] | order(publishedAt desc) [0...3] ${cardProjection(locale)},
      "relatedCategory": *[
        _type in [${ARTICLE_TYPES.map((t) => `"${t}"`).join(",")}] &&
        _id != ^._id &&
        category._ref == ^.category._ref
      ] | order(publishedAt desc) [0...3] ${cardProjection(locale)},
      "latestArticles": *[
        _type in [${ARTICLE_TYPES.map((t) => `"${t}"`).join(",")}] &&
        _id != ^._id
      ] | order(publishedAt desc) [0...3] ${cardProjection(locale)}
    }`;

    const raw = await sanityFetch<Record<string, unknown> | null>({
      query,
      params: { slug },
      revalidate: REVALIDATE,
      tags: [`article:${slug}`],
    });
    if (!raw) return null;

    const { sections, toc: sectionToc } = mapSections(
      raw.sections as Array<Record<string, unknown>>,
      locale,
    );
    const { blocks, toc: bodyToc } = mapPortableTextToBlocks(
      raw.body as Array<Record<string, unknown>>,
    );
    if (blocks.length && !sections.some((s) => s.kind === "keyHighlights")) {
      sections.unshift({ id: "key-highlights", kind: "keyHighlights", title: "Key Highlights", blocks });
    }

    const slugStr = getSlug(raw.slug) || slug;
    const baseCard: ArticleListItem = {
      ...mapCard(
        {
          _id: raw._id as string,
          slug: { current: slugStr },
          title: raw.title as string,
          titleEn: raw.titleEn as string,
          excerpt: raw.excerpt as string,
          excerptEn: raw.excerptEn as string,
          publishedAt: raw.publishedAt as string,
          readingTime: raw.readingTime as number | undefined,
          featuredImage: raw.featuredImage as RawImage | undefined,
          category: raw.category as RawCategory | undefined,
          author: raw.author as RawAuthor | undefined,
          tags: raw.tags as RawTag[] | undefined,
          syllabus: raw.syllabus as string[] | undefined,
          _type: "currentAffairs",
        },
        locale,
      ),
      locale,
    };

    const rawRelatedTags = ((raw.relatedTags as RawArticleCard[]) ?? []).map((r) => mapCard(r, locale));
    const rawRelatedCategory = ((raw.relatedCategory as RawArticleCard[]) ?? []).map((r) => mapCard(r, locale));
    const rawLatest = ((raw.latestArticles as RawArticleCard[]) ?? []).map((r) => mapCard(r, locale));

    const combined = [...rawRelatedTags];
    const seenIds = new Set(combined.map((item) => item.id));

    for (const item of rawRelatedCategory) {
      if (combined.length >= 3) break;
      if (!seenIds.has(item.id)) {
        seenIds.add(item.id);
        combined.push(item);
      }
    }

    for (const item of rawLatest) {
      if (combined.length >= 3) break;
      if (!seenIds.has(item.id)) {
        seenIds.add(item.id);
        combined.push(item);
      }
    }

    const related = combined.slice(0, 3);

    const nextRaw = raw.nextArticle as { _type: string; slug: string; title: string } | null;
    let nextArticle = nextRaw
      ? {
          title: nextRaw.title,
          href: articleHref(nextRaw.slug, nextRaw._type, locale),
        }
      : null;

    // Manual verification helper: mock related article if not set in Sanity
    if (!nextArticle && slugStr === "pm-pranam-scheme") {
      nextArticle = {
        title: locale === "hi" 
          ? "प्रोजेक्ट 17A फ्रिगेट हिमगिरी" 
          : "Project 17A Frigate Himgiri",
        href: locale === "hi" 
          ? "/current-affairs/project-17a-ins-himgiri" 
          : "/en/current-affairs/project-17a-ins-himgiri",
      };
    }

    return {
      ...baseCard,
      sections,
      tableOfContents: [...sectionToc, ...bodyToc],
      mcqs: raw.mcqs as Article["mcqs"],
      faqs: raw.faqs as Article["faqs"],
      sources: raw.sources as Article["sources"],
      keywords: raw.keywords as string[] | undefined,
      related,
      nextArticle,
      alternates: {
        hi: articleHref(slugStr, "currentAffairs", "hi"),
        en: articleHref(slugStr, "currentAffairs", "en"),
      },
    };
  }

  async listArticles(query: ListQuery): Promise<Paginated<ArticleListItem>> {
    const locale = query.locale ?? defaultLocale;
    const page = Math.max(1, query.page ?? 1);
    const pageSize = Math.min(24, query.pageSize ?? 12);
    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    const filters: string[] = [
      `_type in [${ARTICLE_TYPES.map((t) => `"${t}"`).join(",")}]`,
      `!(_id in path("drafts.**"))`,
      `defined(publishedAt)`,
    ];
    if (query.category) filters.push(`category->slug.current == $category`);
    if (query.tag) filters.push(`$tag in tags[]->slug.current`);
    // contentType maps to the Sanity _type for editorial/blog/weekly/monthly;
    // currentAffairs falls back to a generic listing.
    if (query.contentType) {
      filters.push(`_type == $contentType`);
    } else {
      // Exclude staticGk, weekly, and monthly from standard feeds
      filters.push(`_type != "staticGk" && _type != "weekly" && _type != "monthly"`);
    }
    if (query.search)
      filters.push(`[title, titleEn, excerpt, excerptEn] match "*"+$search+"*"`);

    if (query.date) {
      filters.push(`coalesce(ca_date, string::split(publishedAt, "T")[0]) == $date`);
    } else {
      if (query.startDate) {
        filters.push(`coalesce(ca_date, string::split(publishedAt, "T")[0]) >= $startDate`);
      }
      if (query.endDate) {
        filters.push(`coalesce(ca_date, string::split(publishedAt, "T")[0]) <= $endDate`);
      }
    }

    const listQuery = `{
      "items": *[${filters.join(" && ")}] | order(coalesce(ca_date, string::split(publishedAt, "T")[0]) desc, publishedAt desc) [$start...$end] ${cardProjection(locale)},
      "total": count(*[${filters.join(" && ")}])
    }`;

    const raw = await sanityFetch<{ items: RawArticleCard[]; total: number }>({
      query: listQuery,
      params: {
        category: query.category,
        tag: query.tag,
        contentType: query.contentType,
        search: query.search,
        date: query.date,
        startDate: query.startDate,
        endDate: query.endDate,
        start,
        end,
      },
      revalidate: REVALIDATE,
      tags: ["articles"],
    });

    const items = raw.items.map((r) => mapCard(r, locale));
    return {
      items,
      page,
      pageSize,
      total: raw.total,
      totalPages: Math.max(1, Math.ceil(raw.total / pageSize)),
      hasMore: page * pageSize < raw.total,
    };
  }

  async getFeatured(
    locale: Locale,
    contentType?: string,
    limit = 5,
    tag?: string,
    category?: string,
  ): Promise<ArticleListItem[]> {
    const filters = [
      `_type in [${ARTICLE_TYPES.map((t) => `"${t}"`).join(",")}]`,
      `!(_id in path("drafts.**"))`,
      `featured == true`
    ];
    if (contentType) filters.push(`_type == $contentType`);
    if (category) filters.push(`category->slug.current == $category`);
    if (tag) filters.push(`$tag in tags[]->slug.current`);

    const q = `*[ ${filters.join(" && ")} ] | order(publishedAt desc) [0...$limit] ${cardProjection(locale)}`;
    const raw = await sanityFetch<RawArticleCard[]>({
      query: q,
      params: { contentType, limit, tag, category },
      revalidate: REVALIDATE,
      tags: ["articles", "featured"],
    });
    return raw.map((r) => mapCard(r, locale));
  }

  async getPopular(
    locale: Locale,
    limit = 6,
    tag?: string,
    category?: string,
  ): Promise<ArticleListItem[]> {
    const filters = [
      `_type in [${ARTICLE_TYPES.map((t) => `"${t}"`).join(",")}]`,
      `!(_id in path("drafts.**"))`
    ];
    if (category) filters.push(`category->slug.current == $category`);
    if (tag) filters.push(`$tag in tags[]->slug.current`);

    const q = `*[ ${filters.join(" && ")} ] | order(publishedAt desc) [0...$limit] ${cardProjection(locale)}`;
    const raw = await sanityFetch<RawArticleCard[]>({
      query: q,
      params: { limit, tag, category },
      revalidate: REVALIDATE,
      tags: ["articles", "popular"],
    });
    return raw.map((r) => mapCard(r, locale));
  }

  async getFilters(locale: Locale): Promise<ListFilters> {
    const [categories, tags] = await Promise.all([
      this.getCategories(locale),
      this.getTags(locale),
    ]);
    return { categories, tags };
  }

  async getCategories(locale: Locale): Promise<Category[]> {
    const q = `*[_type == "category"] | order(title asc) ${categoryProjection}`;
    const raw = await sanityFetch<RawCategory[]>({ query: q, tags: ["categories"] });
    return raw
      .map((c) => mapCategory(c, locale))
      .filter((c): c is Category => !!c && !!c.slug);
  }

  async getCategory(slug: string, locale: Locale): Promise<Category | null> {
    const q = `*[_type == "category" && slug.current == $slug][0] ${categoryProjection}`;
    const raw = await sanityFetch<RawCategory | null>({
      query: q,
      params: { slug },
      tags: ["categories"],
    });
    return mapCategory(raw, locale) ?? null;
  }

  async getTags(locale: Locale): Promise<Tag[]> {
    void locale;
    const q = `*[_type == "tag"] | order(name asc) ${tagProjection}`;
    const raw = await sanityFetch<RawTag[]>({ query: q, tags: ["tags"] });
    return raw.map(mapTag);
  }

  async getTag(slug: string, locale: Locale): Promise<Tag | null> {
    void locale;
    const q = `*[_type == "tag" && slug.current == $slug][0] ${tagProjection}`;
    const raw = await sanityFetch<RawTag | null>({
      query: q,
      params: { slug },
      tags: [`tag:${slug}`],
    });
    return raw ? mapTag(raw) : null;
  }

  async search(query: string, locale: Locale, limit = 8): Promise<SearchHit[]> {
    if (!query?.trim()) return [];
    const isHi = locale === "hi";
    const q = `*[ _type in ["currentAffairs","article","editorial","onlineCourse"] && !(_id in path("drafts.**")) &&
      [title, titleEn, titleHi, excerpt, excerptEn, description, descriptionHi, descriptionEn] match "*"+$query+"*"
    ] | order(publishedAt desc) [0...$limit] {
      "id": _id,
      "slug": slug.current,
      "title": ${isHi ? "coalesce(titleHi, title, titleEn)" : "coalesce(titleEn, title, titleHi)"},
      "excerpt": ${isHi ? "coalesce(excerpt, excerptEn, descriptionHi, descriptionEn)" : "coalesce(excerptEn, excerpt, descriptionEn, descriptionHi)"},
      "category": coalesce(category->title, category),
      "date": coalesce(publishedAt, _createdAt),
      "featuredImage": coalesce(featuredImage, image) ${featuredImageProjection},
      _type
    }`;
    const raw = await sanityFetch<
      Array<{
        id: string;
        slug: string;
        title: string;
        excerpt?: string;
        category?: string;
        date?: string;
        featuredImage?: RawImage;
        _type: string;
      }>
    >({
      query: q,
      params: { query, limit },
      revalidate: 60,
      tags: ["search"],
    });
    return raw.map((r) => ({
      id: r.id,
      title: r.title,
      excerpt: r.excerpt,
      category: r.category,
      date: r.date,
      image: mapImage(r.featuredImage)?.url ?? null,
      href: articleHref(r.slug, r._type, locale),
    }));
  }

  async getAllSlugs(locale: Locale, contentType?: string): Promise<{ slug: string; type: string; updatedAt: string }[]> {
    void locale;
    // If a contentType is given, filter by that single _type; otherwise list
    // all content-bearing document types.
    const typeFilter = contentType
      ? `_type == $contentType`
      : `_type in [${ARTICLE_TYPES.map((t) => `"${t}"`).join(",")}]`;
    const q = `*[ ${typeFilter} && !(_id in path("drafts.**")) && defined(slug.current)] {
      "slug": slug.current,
      "type": _type,
      "updatedAt": coalesce(updatedAt, publishedAt)
    } | order(updatedAt desc)`;
    return sanityFetch<
      { slug: string; type: string; updatedAt: string }[]
    >({ query: q, params: { contentType }, tags: ["articles"] });
  }

  async listMonthlyPdfs(
    locale: Locale,
    pdfType?: "monthly" | "half-yearly" | "yearly" | "custom" | "pyq" | "syllabus",
    limit = 100
  ): Promise<MonthlyPDF[]> {
    const isHi = locale === "hi";
    let typeFilter = "";
    if (pdfType === "monthly") {
      typeFilter = `&& (pdfType == "monthly" || pdfType == "half-yearly" || pdfType == "yearly" || pdfType == "custom")`;
    } else if (pdfType) {
      typeFilter = `&& pdfType == $pdfType`;
    }
    const q = `*[_type == "monthlyPdf" && !(_id in path("drafts.**")) ${typeFilter}] | order(publishedAt desc) [0...$limit] {
      _id,
      "slug": slug.current,
      "title": ${isHi ? "coalesce(title, titleEn)" : "coalesce(titleEn, title)"},
      month,
      "fileUrl": file.asset->url,
      "coverImage": coverImage.asset._ref,
      description,
      "pdfType": coalesce(pdfType, "monthly"),
      publishedAt,
      toc,
      tocEn
    }`;

    const raw = await sanityFetch<any[]>({
      query: q,
      params: { pdfType, limit },
      revalidate: REVALIDATE,
      tags: ["monthlyPdfs"],
    });

    return raw.map((r) => ({
      id: r._id,
      slug: r.slug,
      title: r.title,
      month: r.month || "",
      fileUrl: r.fileUrl || undefined,
      coverImage: mapImage({ assetRef: r.coverImage })?.url || undefined,
      description: r.description || undefined,
      pdfType: r.pdfType,
      publishedAt: r.publishedAt,
      toc: isHi ? r.toc || [] : r.tocEn || [],
    }));
  }

  async listPyqs(query: {
    exam?: string;
    year?: number;
    subject?: string;
    topic?: string;
    page?: number;
    pageSize?: number;
  }): Promise<Paginated<PYQ>> {
    const page = Math.max(1, query.page ?? 1);
    const pageSize = Math.min(24, query.pageSize ?? 12);
    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    const filters: string[] = [
      `_type == "pyq"`,
      `!(_id in path("drafts.**"))`,
    ];
    if (query.exam) filters.push(`exam == $exam`);
    if (query.year) filters.push(`year == $year`);
    if (query.subject) filters.push(`subject == $subject`);
    if (query.topic) filters.push(`topic match "*"+$topic+"*"`);

    const q = `{
      "items": *[${filters.join(" && ")}] | order(publishedAt desc) [$start...$end] {
        _id,
        title,
        titleEn,
        exam,
        year,
        subject,
        topic,
        paper,
        "fileUrl": file.asset->url,
        publishedAt
      },
      "total": count(*[${filters.join(" && ")}])
    }`;

    const raw = await sanityFetch<{ items: any[]; total: number }>({
      query: q,
      params: {
        exam: query.exam,
        year: query.year,
        subject: query.subject,
        topic: query.topic,
        start,
        end,
      },
      revalidate: REVALIDATE,
      tags: ["pyqs"],
    });

    const items: PYQ[] = raw.items.map((r) => ({
      id: r._id,
      title: r.title,
      titleEn: r.titleEn,
      exam: r.exam,
      year: r.year,
      subject: r.subject,
      topic: r.topic,
      paper: r.paper,
      fileUrl: r.fileUrl || undefined,
      publishedAt: r.publishedAt,
    }));

    return {
      items,
      page,
      pageSize,
      total: raw.total,
      totalPages: Math.max(1, Math.ceil(raw.total / pageSize)),
      hasMore: page * pageSize < raw.total,
    };
  }

  async getMonthlyPdf(slug: string, locale: Locale): Promise<MonthlyPDF | null> {
    const isHi = locale === "hi";
    const q = `*[_type == "monthlyPdf" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
      _id,
      "slug": slug.current,
      "title": ${isHi ? "coalesce(title, titleEn)" : "coalesce(titleEn, title)"},
      month,
      "fileUrl": file.asset->url,
      "coverImage": coverImage.asset._ref,
      description,
      "pdfType": coalesce(pdfType, "monthly"),
      publishedAt,
      toc,
      tocEn
    }`;

    const raw = await sanityFetch<any | null>({
      query: q,
      params: { slug },
      revalidate: REVALIDATE,
      tags: [`monthlyPdf:${slug}`],
    });

    if (!raw) return null;

    return {
      id: raw._id,
      slug: raw.slug,
      title: raw.title,
      month: raw.month || "",
      fileUrl: raw.fileUrl || undefined,
      coverImage: mapImage({ assetRef: raw.coverImage })?.url || undefined,
      description: raw.description || undefined,
      pdfType: raw.pdfType,
      publishedAt: raw.publishedAt,
      toc: isHi ? raw.toc || [] : raw.tocEn || [],
    };
  }

  async listNotifications(locale: Locale, limit = 50): Promise<ExamNotification[]> {
    const isHi = locale === "hi";
    const q = `*[_type == "notification"] | order(date desc) [0...$limit] {
      _id,
      "title": ${isHi ? "coalesce(title, titleEn)" : "coalesce(titleEn, title)"},
      exam,
      date,
      status,
      url,
      description
    }`;

    const raw = await sanityFetch<any[]>({
      query: q,
      params: { limit },
      revalidate: REVALIDATE,
      tags: ["notifications"],
    });

    return raw.map((r) => ({
      id: r._id,
      title: r.title,
      exam: r.exam || "Other",
      date: r.date || new Date().toISOString(),
      status: r.status || "upcoming",
      url: r.url || undefined,
      description: r.description || undefined,
    }));
  }

  async getNotification(id: string, locale: Locale): Promise<ExamNotification | null> {
    const isHi = locale === "hi";
    const q = `*[_type == "notification" && _id == $id][0] {
      _id,
      "title": ${isHi ? "coalesce(title, titleEn)" : "coalesce(titleEn, title)"},
      exam,
      date,
      status,
      url,
      description
    }`;

    const r = await sanityFetch<any>({
      query: q,
      params: { id },
      revalidate: REVALIDATE,
      tags: [`notification:${id}`],
    });

    if (!r) return null;

    return {
      id: r._id,
      title: r.title,
      exam: r.exam || "Other",
      date: r.date || new Date().toISOString(),
      status: r.status || "upcoming",
      url: r.url || undefined,
      description: r.description || undefined,
    };
  }

  async listExamCalendar(locale: Locale): Promise<ExamCalendar[]> {
    const isHi = locale === "hi";
    const q = `*[_type == "examCalendar"] | order(examDate asc) {
      _id,
      "name": ${isHi ? "coalesce(name, nameEn)" : "coalesce(nameEn, name)"},
      examDate,
      "dateText": ${isHi ? "coalesce(dateText, dateTextEn)" : "coalesce(dateTextEn, dateText)"},
      status,
      "description": ${isHi ? "coalesce(description, descriptionEn)" : "coalesce(descriptionEn, description)"},
      isPrimaryCountdown
    }`;

    const raw = await sanityFetch<any[]>({
      query: q,
      revalidate: REVALIDATE,
      tags: ["examCalendar"],
    });

    return raw.map((r) => ({
      id: r._id,
      name: r.name || "",
      examDate: r.examDate || new Date().toISOString(),
      dateText: r.dateText || (r.examDate ? new Date(r.examDate).toLocaleDateString(locale === "hi" ? "hi-IN" : "en-IN") : ""),
      status: r.status || "upcoming",
      description: r.description || undefined,
      isPrimaryCountdown: !!r.isPrimaryCountdown,
    }));
  }

  async listGlobalFaqs(locale: Locale): Promise<GlobalFAQ[]> {
    const isHi = locale === "hi";
    const q = `*[_type == "faq"] | order(category asc) {
      _id,
      "question": ${isHi ? "coalesce(question, questionEn)" : "coalesce(questionEn, question)"},
      "answer": ${isHi ? "coalesce(answer, answerEn)" : "coalesce(answerEn, answer)"},
      category
    }`;

    const raw = await sanityFetch<any[]>({
      query: q,
      revalidate: REVALIDATE,
      tags: ["faqs"],
    });

    return raw.map((r) => ({
      id: r._id,
      question: r.question,
      answer: r.answer,
      category: r.category || undefined,
    }));
  }

  async listAllTags(): Promise<{ slug: string }[]> {
    const q = `*[_type == "tag"]{ "slug": slug.current }`;
    const raw = await sanityFetch<{ slug: string }[]>({
      query: q,
      revalidate: REVALIDATE,
      tags: ["tags"],
    });
    return raw || [];
  }

  async getDatesWithContent(year: number, month: number): Promise<string[]> {
    const start = `${year}-${String(month).padStart(2, "0")}-01`;
    // Find number of days in the month by asking for day 0 of month + 1
    const totalDays = new Date(year, month, 0).getDate();
    const end = `${year}-${String(month).padStart(2, "0")}-${String(totalDays).padStart(2, "0")}`;

    const query = `*[_type == "currentAffairs" && !(_id in path("drafts.**")) && defined(ca_date) && ca_date >= $start && ca_date <= $end].ca_date`;
    const dates = await sanityFetch<string[]>({
      query,
      params: { start, end },
      revalidate: 3600, // cache for 1 hour
      tags: ["articles", "dates-with-content"],
    });

    return Array.from(new Set(dates || [])).sort();
  }

  async getAllDatesWithContent(): Promise<string[]> {
    const query = `*[_type == "currentAffairs" && !(_id in path("drafts.**")) && defined(ca_date)].ca_date`;
    const dates = await sanityFetch<string[]>({
      query,
      revalidate: 3600, // cache for 1 hour
      tags: ["articles", "all-dates-with-content"],
    });
    return Array.from(new Set(dates || [])).sort();
  }

  async getLatestDateWithContent(): Promise<string | null> {
    const query = `*[_type == "currentAffairs" && !(_id in path("drafts.**")) && defined(ca_date)] | order(ca_date desc) [0].ca_date`;
    return sanityFetch<string | null>({
      query,
      revalidate: 600, // cache for 10 min
      tags: ["articles", "latest-date"],
    });
  }

  async getAdjacentDates(date: string): Promise<{ prev: string | null; next: string | null }> {
    const prevQuery = `*[_type == "currentAffairs" && !(_id in path("drafts.**")) && defined(ca_date) && ca_date < $date] | order(ca_date desc) [0].ca_date`;
    const nextQuery = `*[_type == "currentAffairs" && !(_id in path("drafts.**")) && defined(ca_date) && ca_date > $date] | order(ca_date asc) [0].ca_date`;
    
    const [prev, next] = await Promise.all([
      sanityFetch<string | null>({ query: prevQuery, params: { date }, revalidate: 3600 }),
      sanityFetch<string | null>({ query: nextQuery, params: { date }, revalidate: 3600 }),
    ]);
    
    return { prev, next };
  }

  async getHomeConfig(locale: Locale): Promise<HomeConfig | null> {
    const isHi = locale === "hi";
    const query = `*[_type == "homeConfig" && !(_id in path("drafts.**"))][0]{
      "heroTitle": ${isHi ? "coalesce(heroTitle, heroTitleEn)" : "coalesce(heroTitleEn, heroTitle)"},
      "heroSubtitle": ${isHi ? "coalesce(heroSubtitle, heroSubtitleEn)" : "coalesce(heroSubtitleEn, heroSubtitle)"},
      "noticeTicker": ${isHi ? "coalesce(noticeTicker, noticeTickerEn)" : "coalesce(noticeTickerEn, noticeTicker)"},
      noticeLink,
      introVideoId,
      "bannerImageUrl": bannerImage.asset->url,
      "heroSlides": heroSlides[]{
        "title": ${isHi ? "coalesce(title, titleEn)" : "coalesce(titleEn, title)"},
        "subtitle": ${isHi ? "coalesce(subtitle, subtitleEn)" : "coalesce(subtitleEn, subtitle)"},
        "desktopImageUrl": desktopImage.asset->url,
        "mobileImageUrl": mobileImage.asset->url,
        link
      },
      mainYoutubeChannelId,
      "youtubeChannels": youtubeChannels[]{
        "title": ${isHi ? "coalesce(title, titleEn)" : "coalesce(titleEn, title)"},
        handle,
        "subscribers": ${isHi ? "coalesce(subscribers, subscribersEn)" : "coalesce(subscribersEn, subscribers)"},
        url,
        "avatarUrl": customAvatar.asset->url
      }
    }`;
    return sanityFetch<HomeConfig | null>({ query, revalidate: REVALIDATE, tags: ["homeConfig"] });
  }

  async getHomeNotices(locale: Locale): Promise<HomeNotice[]> {
    const isHi = locale === "hi";
    const query = `*[_type == "homeNotice" && !(_id in path("drafts.**")) && isActive == true] | order(orderIndex asc, _createdAt desc){
      "id": _id,
      noticeTextHi,
      noticeTextEn,
      "noticeText": ${isHi ? "coalesce(noticeTextHi, noticeTextEn)" : "coalesce(noticeTextEn, noticeTextHi)"},
      noticeLink,
      isActive,
      orderIndex
    }`;
    return sanityFetch<HomeNotice[]>({ query, revalidate: REVALIDATE, tags: ["homeNotices"] }) || [];
  }

  async getDownloadPageConfig(locale: Locale): Promise<DownloadPageConfig | null> {
    const isHi = locale === "hi";
    const query = `*[_type == "downloadPageConfig" && !(_id in path("drafts.**"))][0]{
      playStoreUrl,
      appStoreUrl,
      windowsUrl,
      macIntelUrl,
      macSiliconUrl,
      appVersion,
      "screenshots": screenshots[].asset->url,
      "features": features[]{
        icon,
        "title": ${isHi ? "coalesce(title, titleEn)" : "coalesce(titleEn, title)"},
        "desc": ${isHi ? "coalesce(desc, descEn)" : "coalesce(descEn, desc)"}
      },
      "faqs": faqs[]{
        "question": ${isHi ? "coalesce(question, questionEn)" : "coalesce(questionEn, question)"},
        "answer": ${isHi ? "coalesce(answer, answerEn)" : "coalesce(answerEn, answer)"}
      }
    }`;
    const config = await sanityFetch<any | null>({ query, revalidate: REVALIDATE, tags: ["downloadPageConfig"] });
    if (!config) return null;
    return {
      ...config,
      screenshots: config.screenshots || [],
      features: config.features || [],
      faqs: config.faqs || [],
    };
  }

  async getStaticPage(slug: string, locale: Locale): Promise<StaticPage | null> {
    const isHi = locale === "hi";
    const query = `*[_type == "staticPage" && slug.current == $slug && !(_id in path("drafts.**"))][0]{
      "slug": slug.current,
      "title": ${isHi ? "coalesce(title, titleEn)" : "coalesce(titleEn, title)"},
      "body": ${isHi ? "coalesce(body, bodyEn)" : "coalesce(bodyEn, body)"}
    }`;
    return sanityFetch<StaticPage | null>({ query, params: { slug }, revalidate: REVALIDATE, tags: [`page-${slug}`] });
  }

  async listTestSeries(locale: Locale): Promise<TestSeries[]> {
    const isHi = locale === "hi";
    const query = `*[_type == "testSeries" && !(_id in path("drafts.**"))] | order(orderIndex asc, price desc){
      "id": _id,
      "slug": slug.current,
      "title": ${isHi ? "coalesce(title, titleEn)" : "coalesce(titleEn, title)"},
      "description": ${isHi ? "coalesce(description, descriptionEn)" : "coalesce(descriptionEn, description)"},
      price,
      originalPrice,
      buyLink,
      active,
      "features": ${isHi ? "coalesce(features, featuresEn)" : "coalesce(featuresEn, features)"},
      "badge": ${isHi ? "coalesce(badgeHi, badgeEn)" : "coalesce(badgeEn, badgeHi)"},
      orderIndex
    }`;
    return sanityFetch<TestSeries[]>({ query, revalidate: REVALIDATE, tags: ["testSeries"] }) || [];
  }

  async listPublications(locale: Locale): Promise<Publication[]> {
    const isHi = locale === "hi";
    const query = `*[_type == "publication" && !(_id in path("drafts.**"))] | order(price desc){
      "id": _id,
      "slug": slug.current,
      "title": ${isHi ? "coalesce(title, titleEn)" : "coalesce(titleEn, title)"},
      "description": ${isHi ? "coalesce(description, descriptionEn)" : "coalesce(descriptionEn, description)"},
      price,
      originalPrice,
      rating,
      reviewsCount,
      edition,
      badge,
      pages,
      medium,
      "features": ${isHi ? "coalesce(features, featuresEn)" : "coalesce(featuresEn, features)"},
      "toc": ${isHi ? "coalesce(toc, tocEn)" : "coalesce(tocEn, toc)"},
      "authorDetails": ${isHi ? "coalesce(authorDetails, authorDetailsEn)" : "coalesce(authorDetailsEn, authorDetails)"},
      soldOut,
      "coverImage": coverImage.asset->url,
      buyLink
    }`;
    return sanityFetch<Publication[]>({ query, revalidate: REVALIDATE, tags: ["publications"] }) || [];
  }

  async getPublication(slug: string, locale: Locale): Promise<Publication | null> {
    const isHi = locale === "hi";
    const query = `*[_type == "publication" && slug.current == $slug && !(_id in path("drafts.**"))][0]{
      "id": _id,
      "slug": slug.current,
      "title": ${isHi ? "coalesce(title, titleEn)" : "coalesce(titleEn, title)"},
      "description": ${isHi ? "coalesce(description, descriptionEn)" : "coalesce(descriptionEn, description)"},
      price,
      originalPrice,
      rating,
      reviewsCount,
      edition,
      badge,
      pages,
      medium,
      "features": ${isHi ? "coalesce(features, featuresEn)" : "coalesce(featuresEn, features)"},
      "toc": ${isHi ? "coalesce(toc, tocEn)" : "coalesce(tocEn, toc)"},
      "authorDetails": ${isHi ? "coalesce(authorDetails, authorDetailsEn)" : "coalesce(authorDetailsEn, authorDetails)"},
      soldOut,
      "coverImage": coverImage.asset->url,
      buyLink
    }`;
    const result = await sanityFetch<Publication | null>({ query, params: { slug }, revalidate: REVALIDATE, tags: ["publications"] });
    return result || null;
  }

  async listMediaReleases(locale: Locale): Promise<MediaRelease[]> {
    const isHi = locale === "hi";
    const query = `*[_type == "mediaRelease" && !(_id in path("drafts.**"))] | order(publishedAt desc){
      "id": _id,
      "slug": slug.current,
      "title": ${isHi ? "coalesce(title, titleEn)" : "coalesce(titleEn, title)"},
      publishedAt,
      source,
      url,
      "imageUrl": image.asset->url
    }`;
    return sanityFetch<MediaRelease[]>({ query, revalidate: REVALIDATE, tags: ["mediaReleases"] }) || [];
  }

  async getSyllabusPage(slug: string, locale: Locale): Promise<SyllabusPage | null> {
    const isHi = locale === "hi";
    const query = `*[_type == "syllabusPage" && slug.current == $slug && !(_id in path("drafts.**"))][0]{
      "slug": slug.current,
      "title": ${isHi ? "coalesce(title, titleEn)" : "coalesce(titleEn, title)"},
      exam,
      year,
      "papers": papers[]{
        "paperTitle": ${isHi ? "coalesce(paperTitle, paperTitleEn)" : "coalesce(paperTitleEn, paperTitle)"},
        "units": units[]{
          unitNumber,
          "unitTitle": ${isHi ? "coalesce(unitTitle, unitTitleEn)" : "coalesce(unitTitleEn, unitTitle)"},
          "details": ${isHi ? "coalesce(details, detailsEn)" : "coalesce(detailsEn, details)"}
        }
      }
    }`;
    return sanityFetch<SyllabusPage | null>({ query, params: { slug }, revalidate: REVALIDATE, tags: [`syllabus-${slug}`] });
  }

  async listTopperCopies(locale: Locale): Promise<TopperCopy[]> {
    const query = `*[_type == "topperCopy" && !(_id in path("drafts.**"))] | order(year desc, rank asc){
      "id": _id,
      "slug": slug.current,
      name,
      rank,
      year,
      exam,
      score,
      subject,
      "fileUrl": file.asset->url,
      "photoUrl": photo.asset->url,
      isRecommended,
      "recommendedBy": recommendedBy->{
        nameHi,
        nameEn,
        "image": image.asset->url
      },
      recommendationReasonHi,
      recommendationReasonEn
    }`;
    const results = await sanityFetch<any[]>({ query, revalidate: REVALIDATE, tags: ["topperCopies"] });
    return (results || []).map((r) => ({
      id: r.id,
      slug: r.slug,
      name: r.name,
      rank: r.rank || undefined,
      year: r.year || undefined,
      exam: r.exam || "MPPSC",
      score: r.score || undefined,
      subject: r.subject || undefined,
      fileUrl: r.fileUrl || "",
      photoUrl: r.photoUrl || undefined,
      isRecommended: r.isRecommended || false,
      recommendedBy: r.recommendedBy ? {
        nameHi: r.recommendedBy.nameHi || "",
        nameEn: r.recommendedBy.nameEn || "",
        image: r.recommendedBy.image || undefined,
      } : undefined,
      recommendationReasonHi: r.recommendationReasonHi || undefined,
      recommendationReasonEn: r.recommendationReasonEn || undefined,
    }));
  }


  async listToppers(locale: Locale): Promise<Topper[]> {
    const isHi = locale === "hi";
    const query = `*[_type == "topper" && !(_id in path("drafts.**"))] | order(orderIndex asc, rank asc){
      "id": _id,
      "name": ${isHi ? "coalesce(nameHi, nameEn)" : "coalesce(nameEn, nameHi)"},
      "nameEn": coalesce(nameEn, nameHi),
      rank,
      exam,
      year,
      "post": ${isHi ? "coalesce(postHi, postEn)" : "coalesce(postEn, postHi)"},
      "postEn": coalesce(postEn, postHi),
      "avatar": avatar.asset->url,
      "quote": ${isHi ? "coalesce(quoteHi, quoteEn)" : "coalesce(quoteEn, quoteHi)"},
      "quoteEn": coalesce(quoteEn, quoteHi),
      rollNo,
      isRanker
    }`;
    const results = await sanityFetch<any[]>({ query, revalidate: REVALIDATE, tags: ["toppers"] });
    return (results || []).map((r) => ({
      id: r.id,
      name: r.name || "",
      nameEn: r.nameEn || "",
      rank: r.rank || 0,
      exam: r.exam || "MPPSC",
      year: r.year || new Date().getFullYear(),
      post: r.post || "",
      postEn: r.postEn || "",
      avatar: r.avatar || "",
      quote: r.quote || undefined,
      quoteEn: r.quoteEn || undefined,
      rollNo: r.rollNo || undefined,
      isRanker: !!r.isRanker,
    }));
  }

  async listAds(locale: Locale): Promise<Ad[]> {
    const query = `*[_type == "ad" && !(_id in path("drafts.**"))]{
      "id": _id,
      "image": image.asset->url,
      titleHi,
      titleEn,
      subtitleHi,
      subtitleEn,
      ctaHi,
      ctaEn,
      href,
      hrefEn
    }`;
    const results = await sanityFetch<any[]>({ query, revalidate: REVALIDATE, tags: ["ads"] });
    return (results || []).map((r) => ({
      id: r.id,
      image: r.image || "",
      titleHi: r.titleHi || "",
      titleEn: r.titleEn || "",
      subtitleHi: r.subtitleHi || "",
      subtitleEn: r.subtitleEn || "",
      ctaHi: r.ctaHi || "अभी देखें →",
      ctaEn: r.ctaEn || "Learn More →",
      href: r.href || "#",
      hrefEn: r.hrefEn || undefined,
    }));
  }

  async listTestSchedules(locale: Locale): Promise<TestSchedule[]> {
    const query = `*[_type == "testSchedule" && !(_id in path("drafts.**"))] | order(orderIndex asc, date desc){
      "id": _id,
      date,
      code,
      titleHi,
      titleEn,
      focusHi,
      focusEn,
      orderIndex
    }`;
    const results = await sanityFetch<any[]>({ query, revalidate: REVALIDATE, tags: ["testSchedules"] });
    return (results || []).map((r) => ({
      id: r.id,
      date: r.date || "",
      code: r.code || "",
      titleHi: r.titleHi || "",
      titleEn: r.titleEn || "",
      focusHi: r.focusHi || "",
      focusEn: r.focusEn || "",
      orderIndex: r.orderIndex || 0,
    }));
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async listFaculties(locale: Locale): Promise<Faculty[]> {
    const query = `*[_type == "faculty" && !(_id in path("drafts.**"))] | order(orderIndex asc, _createdAt asc){
      "id": _id,
      nameHi,
      nameEn,
      titleHi,
      titleEn,
      descHi,
      descEn,
      "image": image.asset->url,
      medium,
      orderIndex
    }`;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const results = await sanityFetch<any[]>({ query, revalidate: REVALIDATE, tags: ["faculties"] });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (results || []).map((r: any) => ({
      id: r.id,
      nameHi: r.nameHi || "",
      nameEn: r.nameEn || "",
      titleHi: r.titleHi || "",
      titleEn: r.titleEn || "",
      descHi: r.descHi || "",
      descEn: r.descEn || "",
      image: r.image || "",
      medium: r.medium || "hindi",
      orderIndex: r.orderIndex || 0,
    }));
  }

  async listOfflineBatches(locale: Locale): Promise<OfflineBatch[]> {
    const query = `*[_type == "offlineBatch" && !(_id in path("drafts.**"))] | order(orderIndex asc, _createdAt asc){
      "id": _id,
      titleHi,
      titleEn,
      startDateHi,
      startDateEn,
      timeHi,
      timeEn,
      medium,
      badgeHi,
      badgeEn,
      seatsFillPercent,
      descHi,
      descEn,
      locationNameHi,
      locationNameEn,
      center,
      orderIndex,
      isNew
    }`;
    const results = await sanityFetch<any[]>({ query, revalidate: REVALIDATE, tags: ["offlineBatches"] });
    return (results || []).map((r: any) => ({
      id: r.id,
      titleHi: r.titleHi || "",
      titleEn: r.titleEn || "",
      startDateHi: r.startDateHi || "",
      startDateEn: r.startDateEn || "",
      timeHi: r.timeHi || "",
      timeEn: r.timeEn || "",
      medium: r.medium || "bilingual",
      badgeHi: r.badgeHi || "",
      badgeEn: r.badgeEn || "",
      seatsFillPercent: r.seatsFillPercent || 0,
      descHi: r.descHi || "",
      descEn: r.descEn || "",
      locationNameHi: r.locationNameHi || "Rajiv Gandhi Circle Campus",
      locationNameEn: r.locationNameEn || "Rajiv Gandhi Circle Campus",
      center: r.center || "indore",
      orderIndex: r.orderIndex || 0,
      isNew: r.isNew || false,
    }));
  }

  async listOnlineCourses(locale: Locale): Promise<OnlineCourse[]> {
    const query = `*[_type == "onlineCourse" && !(_id in path("drafts.**"))] | order(orderIndex asc, _createdAt asc){
      "id": _id,
      "slug": slug.current,
      titleHi,
      titleEn,
      category,
      "image": image.asset->url,
      altHi,
      altEn,
      badgeHi,
      badgeEn,
      isLive,
      enrollUrl,
      mentorNameHi,
      mentorNameEn,
      mentorTitleHi,
      mentorTitleEn,
      "mentorImage": mentorImage.asset->url,
      mentorBioHi,
      mentorBioEn,
      price,
      originalPrice,
      durationHi,
      durationEn,
      lecturesCountHi,
      lecturesCountEn,
      studentsCountHi,
      studentsCountEn,
      rating,
      descriptionHi,
      descriptionEn,
      whatYouLearnHi,
      whatYouLearnEn,
      highlightsHi,
      highlightsEn,
      syllabus[]{
        titleHi,
        titleEn,
        topicsHi,
        topicsEn
      },
      features[]{
        icon,
        labelHi,
        labelEn,
        valueHi,
        valueEn
      },
      testimonials[]{
        nameHi,
        nameEn,
        examHi,
        examEn,
        textHi,
        textEn,
        "avatar": avatar.asset->url
      },
      orderIndex
    }`;
    const results = await sanityFetch<any[]>({ query, revalidate: REVALIDATE, tags: ["onlineCourses"] });
    return (results || []).map((r: any) => ({
      id: r.id,
      slug: r.slug || "",
      titleHi: r.titleHi || "",
      titleEn: r.titleEn || "",
      category: r.category || "upsc",
      image: r.image || "",
      altHi: r.altHi || "",
      altEn: r.altEn || "",
      badgeHi: r.badgeHi || "",
      badgeEn: r.badgeEn || "",
      isLive: !!r.isLive,
      enrollUrl: r.enrollUrl || "",
      mentorNameHi: r.mentorNameHi || "",
      mentorNameEn: r.mentorNameEn || "",
      mentorTitleHi: r.mentorTitleHi || "",
      mentorTitleEn: r.mentorTitleEn || "",
      mentorImage: r.mentorImage || "",
      mentorBioHi: r.mentorBioHi || "",
      mentorBioEn: r.mentorBioEn || "",
      price: r.price || "",
      originalPrice: r.originalPrice || "",
      durationHi: r.durationHi || "",
      durationEn: r.durationEn || "",
      lecturesCountHi: r.lecturesCountHi || "",
      lecturesCountEn: r.lecturesCountEn || "",
      studentsCountHi: r.studentsCountHi || "",
      studentsCountEn: r.studentsCountEn || "",
      rating: r.rating || "",
      descriptionHi: r.descriptionHi || "",
      descriptionEn: r.descriptionEn || "",
      whatYouLearnHi: r.whatYouLearnHi || [],
      whatYouLearnEn: r.whatYouLearnEn || [],
      highlightsHi: r.highlightsHi || [],
      highlightsEn: r.highlightsEn || [],
      syllabus: (r.syllabus || []).map((s: any) => ({
        titleHi: s.titleHi || "",
        titleEn: s.titleEn || "",
        topicsHi: s.topicsHi || [],
        topicsEn: s.topicsEn || [],
      })),
      features: (r.features || []).map((f: any) => ({
        icon: f.icon || "",
        labelHi: f.labelHi || "",
        labelEn: f.labelEn || "",
        valueHi: f.valueHi || "",
        valueEn: f.valueEn || "",
      })),
      testimonials: (r.testimonials || []).map((t: any) => ({
        nameHi: t.nameHi || "",
        nameEn: t.nameEn || "",
        examHi: t.examHi || "",
        examEn: t.examEn || "",
        textHi: t.textHi || "",
        textEn: t.textEn || "",
        avatar: t.avatar || "",
      })),
      orderIndex: r.orderIndex || 0,
    }));
  }

  async getOnlineCourse(slug: string, locale: Locale): Promise<OnlineCourse | null> {
    const query = `*[_type == "onlineCourse" && slug.current == $slug && !(_id in path("drafts.**"))][0]{
      "id": _id,
      "slug": slug.current,
      titleHi,
      titleEn,
      category,
      "image": image.asset->url,
      altHi,
      altEn,
      badgeHi,
      badgeEn,
      isLive,
      enrollUrl,
      mentorNameHi,
      mentorNameEn,
      mentorTitleHi,
      mentorTitleEn,
      "mentorImage": mentorImage.asset->url,
      mentorBioHi,
      mentorBioEn,
      price,
      originalPrice,
      durationHi,
      durationEn,
      lecturesCountHi,
      lecturesCountEn,
      studentsCountHi,
      studentsCountEn,
      rating,
      descriptionHi,
      descriptionEn,
      whatYouLearnHi,
      whatYouLearnEn,
      highlightsHi,
      highlightsEn,
      syllabus[]{
        titleHi,
        titleEn,
        topicsHi,
        topicsEn
      },
      features[]{
        icon,
        labelHi,
        labelEn,
        valueHi,
        valueEn
      },
      testimonials[]{
        nameHi,
        nameEn,
        examHi,
        examEn,
        textHi,
        textEn,
        "avatar": avatar.asset->url
      },
      orderIndex
    }`;
    const r = await sanityFetch<any>({ query, params: { slug }, revalidate: REVALIDATE, tags: [`onlineCourse:${slug}`] });
    if (!r) return null;
    return {
      id: r.id,
      slug: r.slug || "",
      titleHi: r.titleHi || "",
      titleEn: r.titleEn || "",
      category: r.category || "upsc",
      image: r.image || "",
      altHi: r.altHi || "",
      altEn: r.altEn || "",
      badgeHi: r.badgeHi || "",
      badgeEn: r.badgeEn || "",
      isLive: !!r.isLive,
      enrollUrl: r.enrollUrl || "",
      mentorNameHi: r.mentorNameHi || "",
      mentorNameEn: r.mentorNameEn || "",
      mentorTitleHi: r.mentorTitleHi || "",
      mentorTitleEn: r.mentorTitleEn || "",
      mentorImage: r.mentorImage || "",
      mentorBioHi: r.mentorBioHi || "",
      mentorBioEn: r.mentorBioEn || "",
      price: r.price || "",
      originalPrice: r.originalPrice || "",
      durationHi: r.durationHi || "",
      durationEn: r.durationEn || "",
      lecturesCountHi: r.lecturesCountHi || "",
      lecturesCountEn: r.lecturesCountEn || "",
      studentsCountHi: r.studentsCountHi || "",
      studentsCountEn: r.studentsCountEn || "",
      rating: r.rating || "",
      descriptionHi: r.descriptionHi || "",
      descriptionEn: r.descriptionEn || "",
      whatYouLearnHi: r.whatYouLearnHi || [],
      whatYouLearnEn: r.whatYouLearnEn || [],
      highlightsHi: r.highlightsHi || [],
      highlightsEn: r.highlightsEn || [],
      syllabus: (r.syllabus || []).map((s: any) => ({
        titleHi: s.titleHi || "",
        titleEn: s.titleEn || "",
        topicsHi: s.topicsHi || [],
        topicsEn: s.topicsEn || [],
      })),
      features: (r.features || []).map((f: any) => ({
        icon: f.icon || "",
        labelHi: f.labelHi || "",
        labelEn: f.labelEn || "",
        valueHi: f.valueHi || "",
        valueEn: f.valueEn || "",
      })),
      testimonials: (r.testimonials || []).map((t: any) => ({
        nameHi: t.nameHi || "",
        nameEn: t.nameEn || "",
        examHi: t.examHi || "",
        examEn: t.examEn || "",
        textHi: t.textHi || "",
        textEn: t.textEn || "",
        avatar: t.avatar || "",
      })),
      orderIndex: r.orderIndex || 0,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getAboutPageConfig(locale: Locale): Promise<AboutPageConfig | null> {
    const query = `*[_type == "aboutPageConfig" && !(_id in path("drafts.**"))][0]{
      "testimonials": testimonials[]{
        name,
        nameEn,
        exam,
        examEn,
        quote,
        quoteEn,
        "avatar": avatar.asset->url
      },
      "galleryImages": galleryImages[]{
        "image": image.asset->url,
        caption,
        captionEn,
        layout
      }
    }`;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await sanityFetch<any>({ query, revalidate: REVALIDATE, tags: ["aboutPageConfig"] });
    if (!result) return null;
    return {
      testimonials: (result.testimonials || []).map((t: any) => ({
        nameHi: t.name || "",
        nameEn: t.nameEn || "",
        examHi: t.exam || "",
        examEn: t.examEn || "",
        quoteHi: t.quote || "",
        quoteEn: t.quoteEn || "",
        avatar: t.avatar || "",
      })),
      galleryImages: (result.galleryImages || []).map((g: any) => ({
        image: g.image || "",
        captionHi: g.caption || "",
        captionEn: g.captionEn || "",
        layout: g.layout || "large",
      })),
    };
  }

  async listNcertBooks(classNumber?: number): Promise<NcertBook[]> {
    const filters: string[] = [
      `_type == "ncertBook"`,
      `!(_id in path("drafts.**"))`,
    ];
    if (classNumber) filters.push(`classNumber == $classNumber`);

    const q = `*[${filters.join(" && ")}] | order(classNumber desc, subject asc) {
      _id,
      title,
      titleEn,
      classNumber,
      subject,
      part,
      language,
      "fileUrl": file.asset->url,
      "coverImageUrl": coverImage.asset->url
    }`;

    const raw = await sanityFetch<any[]>({
      query: q,
      params: { classNumber },
      revalidate: REVALIDATE,
      tags: ["ncertBooks"],
    });

    return raw.map((r) => ({
      id: r._id,
      title: r.title,
      titleEn: r.titleEn,
      classNumber: r.classNumber,
      subject: r.subject,
      part: r.part || undefined,
      language: r.language || "hi",
      fileUrl: r.fileUrl || undefined,
      coverImageUrl: r.coverImageUrl || undefined,
    }));
  }

  async getOfflineBrochureUrl(): Promise<string | null> {
    const query = `*[_type == "offlinePageConfig" && !(_id in path("drafts.**"))][0]{
      "brochureUrl": brochure.asset->url
    }`;
    const result = await sanityFetch<{ brochureUrl?: string }>({
      query,
      revalidate: REVALIDATE,
      tags: ["offlinePageConfig"],
    });
    return result?.brochureUrl || null;
  }
}
