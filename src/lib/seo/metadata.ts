import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { buildAlternates, stripLocale } from "@/lib/i18n/locales";

export interface BuildMetadataInput {
  title?: string;
  description?: string;
  /** Locale-neutral path (no /en prefix). Defaults to "/". */
  path?: string;
  image?: string;
  keywords?: string[];
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  noIndex?: boolean;
  /** Category name — used for dynamic OG image badge. */
  category?: string;
  /** Locale for the OG image. */
  locale?: "hi" | "en";
  /** Article type for OG image. */
  articleType?: "article" | "pdf" | "editorial";
}

/**
 * Build consistent Next.js Metadata for any page: canonical, OG, Twitter,
 * hreflang alternates. Article pages pass type: "article" + dates.
 *
 * Phase 2: dynamic OG images via /api/og route.
 */
export function buildMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  image,
  keywords,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  noIndex,
  category,
  locale = "hi",
  articleType = "article",
}: BuildMetadataInput = {}): Metadata {
  const url = `${siteConfig.url}${path === "/" ? "" : path}`;
  
  // Format title without duplicating brand name if already present
  const fullTitle = title 
    ? (title.includes(siteConfig.name) ? title : `${title} | ${siteConfig.name}`)
    : siteConfig.name;

  // Dynamic OG image: use /api/og with query params when title exists
  let ogImage: string;
  if (image) {
    ogImage = image;
  } else if (title) {
    const ogParams = new URLSearchParams({ title: title.replace(/\s*\|\s*Aakar IAS/gi, "") });
    if (category) ogParams.set("category", category);
    if (publishedTime) {
      ogParams.set("date", formatDate(publishedTime, locale));
    }
    ogParams.set("lang", locale);
    ogParams.set("type", articleType);
    ogImage = `${siteConfig.url}/api/og?${ogParams.toString()}`;
  } else {
    ogImage = `${siteConfig.url}/opengraph-image.png`;
  }

  return {
    title: { absolute: fullTitle },
    description,
    keywords: keywords ?? siteConfig.keywords,
    alternates: {
      canonical: url,
      languages: buildAlternates(stripLocale(path)),
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title ?? siteConfig.name }],
      locale: locale === "en" ? "en_IN" : "hi_IN",
      alternateLocale: locale === "en" ? ["hi_IN"] : ["en_IN"],
      type,
      ...(type === "article" && publishedTime
        ? { publishedTime, modifiedTime: modifiedTime ?? publishedTime, authors }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
    robots: noIndex 
      ? { index: false, follow: false } 
      : { 
          index: true, 
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          }
        },
  };
}

/** Format Article SEO Title ensuring primary keyword comes first, secondary keywords follow, and ends with exam & brand */
export function formatArticleSeoTitle(
  rawTitle: string,
  englishTitle?: string,
  locale: "hi" | "en" = "hi"
): string {
  let title = rawTitle.trim();
  
  // Clean up any trailing brand suffixes if repeated
  title = title.replace(/\s*\|\s*Aakar IAS/gi, "").trim();

  // If title already has full formatted structure (main part | exam part), retain main part
  if (title.includes("|")) {
    const parts = title.split("|").map((p) => p.trim());
    const mainPart = parts[0];
    const examPart = parts.slice(1).join(", ");
    const hasExam = examPart.includes("MPPSC") || examPart.includes("UPSC");
    const examSuffix = hasExam ? examPart : "MPPSC, UPSC";
    return `${mainPart} | ${examSuffix} | ${siteConfig.name}`;
  }

  // If title does not contain English in brackets but englishTitle is provided, append it
  if (englishTitle && !title.includes("(") && !title.toLowerCase().includes(englishTitle.toLowerCase())) {
    title = `${title} (${englishTitle})`;
  }

  // Ensure exam keywords are present if missing
  if (!title.includes("MPPSC") && !title.includes("UPSC")) {
    title = `${title} | MPPSC, UPSC`;
  }
  
  return `${title} | ${siteConfig.name}`;
}

/** Format Article SEO Description (140-160 characters) with Primary Keyword + Facts + Exam Keywords + CTA */
export function formatArticleSeoDescription(
  rawExcerpt?: string, 
  title?: string, 
  locale: "hi" | "en" = "hi"
): string {
  let desc = rawExcerpt?.trim() || "";
  const cleanTitle = title?.replace(/\s*\|.*/g, "").trim() || "";
  
  if (!desc || desc.length < 50) {
    desc = locale === "en"
      ? `${cleanTitle} - Date, history, significance, key facts, MCQs and complete study material for MPPSC and UPSC exams.`
      : `${cleanTitle} की तिथि, इतिहास, प्रमुख तथ्य, महत्व, MCQs एवं MPPSC, UPSC परीक्षा की दृष्टि से सम्पूर्ण जानकारी पढ़ें।`;
  }

  // Ensure exam keywords and CTA are present in description
  if (locale === "hi" && !desc.includes("MPPSC") && !desc.includes("UPSC")) {
    desc = `${desc} MPPSC एवं UPSC परीक्षा हेतु महत्वपूर्ण संपूर्ण जानकारी पढ़ें।`;
  } else if (locale === "en" && !desc.includes("MPPSC") && !desc.includes("UPSC")) {
    desc = `${desc} Key current affairs study material for MPPSC and UPSC exams.`;
  }

  // Optimize length strictly to 140-160 chars
  if (desc.length > 160) {
    desc = desc.slice(0, 157).trim() + "...";
  } else if (desc.length < 130 && locale === "hi") {
    desc = `${desc} MPPSC, UPSC परीक्षा की दृष्टि से सम्पूर्ण नोट्स।`.slice(0, 160);
  }

  return desc;
}


/** Format an ISO date for human display. */
export function formatDate(iso: string, locale: "hi" | "en" = "hi"): string {
  try {
    return new Intl.DateTimeFormat(locale === "hi" ? "hi-IN" : "en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

/** Format MonthlyPDF date based on its frequency/type. */
export function formatPdfDate(
  pdf: { pdfType: string; month?: string; publishedAt: string },
  locale: "hi" | "en" = "hi"
): string {
  if (pdf.pdfType === "half-yearly") {
    const year = pdf.month ? pdf.month.split("-")[0] : new Date(pdf.publishedAt).getFullYear();
    return locale === "hi" ? `अर्द्धवार्षिक (जनवरी–जून ${year})` : `Half-Yearly (Jan–June ${year})`;
  }
  if (pdf.pdfType === "yearly") {
    const year = pdf.month ? pdf.month.split("-")[0] : new Date(pdf.publishedAt).getFullYear();
    return locale === "hi" ? `वार्षिक ${year}` : `Yearly ${year}`;
  }
  if (pdf.pdfType === "custom") {
    const year = pdf.month ? pdf.month.split("-")[0] : new Date(pdf.publishedAt).getFullYear();
    return locale === "hi" ? `विशेष संस्करण ${year}` : `Special Edition ${year}`;
  }
  if (pdf.month) {
    try {
      const date = new Date(`${pdf.month}-01T00:00:00Z`);
      return new Intl.DateTimeFormat(locale === "hi" ? "hi-IN" : "en-IN", {
        month: "long",
        year: "numeric",
      }).format(date);
    } catch {
      return pdf.month;
    }
  }
  return formatDate(pdf.publishedAt, locale);
}
