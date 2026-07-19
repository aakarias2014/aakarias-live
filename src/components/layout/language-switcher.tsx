"use client";

import Link from "next/link";
import { Languages } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { localeConfig, locales, defaultLocale } from "@/lib/i18n/locales";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

/**
 * Bilingual toggle. Links to the same logical path in the other locale.
 * Hindi (default) and English are the only content locales.
 * Redesigned to use Framer Motion for smooth sliding layout animation.
 */
export function LanguageSwitcher({ variant = "compact" }: { variant?: "compact" | "full" }) {
  const { locale, hrefForLocale } = useLanguage();

  if (variant === "compact") {
    const other = locale === defaultLocale ? "en" : "hi";
    return (
      <Link
        href={hrefForLocale(other)}
        scroll={false}
        aria-label={`Switch to ${localeConfig[other].label}`}
        className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border/60 bg-muted/30 px-3 text-xs font-semibold text-muted-foreground transition-all hover:bg-muted hover:text-foreground cursor-pointer"
      >
        <Languages className="h-3.5 w-3.5" />
        <span className="font-bold text-foreground">{localeConfig[other].shortLabel}</span>
      </Link>
    );
  }

  return (
    <div
      role="group"
      aria-label="Language switcher"
      className="inline-flex items-center rounded-full border border-border/80 bg-muted/50 p-1 text-xs"
    >
      {locales.map((l) => {
        const active = l === locale;
        return (
          <Link
            key={l}
            href={hrefForLocale(l)}
            scroll={false}
            aria-current={active ? "true" : undefined}
            className={cn(
              "relative rounded-full px-3 py-1 font-bold transition-colors cursor-pointer select-none",
              active ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {active && (
              <motion.div
                layoutId="activeLang"
                className="absolute inset-0 -z-10 rounded-full bg-primary shadow-soft"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            {localeConfig[l].label}
          </Link>
        );
      })}
    </div>
  );
}
