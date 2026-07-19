/**
 * Locale configuration for Aakar IAS.
 *
 * - UI language is always English (fixed).
 * - Content language: Hindi (default) + English.
 * - Routing: default locale (hi) keeps clean URLs; English mirrors under /en/.
 *   e.g. /current-affairs/slug  (Hindi)
 *        /en/current-affairs/slug  (English)
 */

export const locales = ["hi", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "hi";

export const localeConfig: Record<
  Locale,
  { label: string; shortLabel: string; htmlLang: string; hreflang: string; ogLocale: string }
> = {
  hi: {
    label: "हिन्दी",
    shortLabel: "HI",
    htmlLang: "hi",
    hreflang: "hi-IN",
    ogLocale: "hi_IN",
  },
  en: {
    label: "English",
    shortLabel: "EN",
    htmlLang: "en",
    hreflang: "en-IN",
    ogLocale: "en_IN",
  },
};

/** Prefix for non-default locale routes ("/en" or "" for default). */
export function localePrefix(locale: Locale): string {
  return locale === defaultLocale ? "" : `/${locale}`;
}

/** True if the pathname is an English-locale route. */
export function isEnglishPath(pathname: string): boolean {
  return pathname === "/en" || pathname.startsWith("/en/");
}

/** Strip the /en prefix to get the locale-neutral path. */
export function stripLocale(pathname: string): string {
  if (pathname === "/en") return "/";
  return pathname.replace(/^\/en(?=\/|$)/, "") || "/";
}

/** Derive the locale from a pathname. */
export function localeFromPath(pathname: string): Locale {
  return isEnglishPath(pathname) ? "en" : defaultLocale;
}

/**
 * Build the href for the same logical path in the other locale.
 * Used by the language switcher.
 */
export function localizedHref(pathname: string, targetLocale: Locale): string {
  const base = stripLocale(pathname);
  return targetLocale === defaultLocale ? base : `${localePrefix(targetLocale)}${base}`;
}

/**
 * Build alternates (hreflang) for a given locale-neutral path.
 * Returns entries suitable for Next.js Metadata `alternates.languages`.
 */
export function buildAlternates(localeNeutralPath: string): Record<string, string> {
  const path = localeNeutralPath === "/" ? "" : localeNeutralPath;
  return {
    "hi-IN": path || "/",
    "en-IN": `/en${path}` || "/en",
    "x-default": path || "/",
  };
}
