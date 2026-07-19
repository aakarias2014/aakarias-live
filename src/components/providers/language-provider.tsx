"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { defaultLocale, localeFromPath, localizedHref, type Locale } from "@/lib/i18n/locales";

interface LanguageContextValue {
  locale: Locale;
  /** Toggle to the other locale's equivalent URL (used by the switcher). */
  toggle: () => string;
  /** Get the URL for a specific target locale from the current path. */
  hrefForLocale: (target: Locale) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "/";
  const [pathnameState, setPathnameState] = useState(pathname);

  // Keep in sync with navigation
  if (pathname !== pathnameState) setPathnameState(pathname);

  const locale = localeFromPath(pathnameState);

  const hrefForLocale = useCallback(
    (target: Locale) => localizedHref(pathnameState, target),
    [pathnameState],
  );

  const toggle = useCallback(
    () => localizedHref(pathnameState, locale === defaultLocale ? "en" : "hi"),
    [pathnameState, locale],
  );

  const value = useMemo(
    () => ({ locale, toggle, hrefForLocale }),
    [locale, toggle, hrefForLocale],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within <LanguageProvider>");
  return ctx;
}
