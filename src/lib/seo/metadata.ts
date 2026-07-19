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
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;

  // Dynamic OG image: use /api/og with query params when title exists
  let ogImage: string;
  if (image) {
    ogImage = image;
  } else if (title) {
    const ogParams = new URLSearchParams({ title });
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
    title: title ?? undefined,
    description,
    keywords: keywords ?? siteConfig.keywords,
    alternates: {
      canonical: path,
      languages: buildAlternates(stripLocale(path)),
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title ?? siteConfig.name }],
      locale: "hi_IN",
      alternateLocale: ["en_IN"],
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
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
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
