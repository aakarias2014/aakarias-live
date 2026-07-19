"use client";

import React, { useState, useEffect, useTransition, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, CalendarDays, BookOpen, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n/locales";
import { localePrefix } from "@/lib/i18n/locales";
import type { ArticleListItem } from "@/lib/content/types";
import { ArticleCard } from "@/components/content/article-card";
import { Breadcrumb } from "@/components/content/breadcrumb";
import { MiniCalendar } from "@/components/content/mini-calendar";
import { MobileDateStrip } from "@/components/content/mobile-date-strip";
import { Skeleton } from "@/components/ui/skeleton";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, collectionPageJsonLd, jsonLdGraph } from "@/lib/seo/jsonld";
import { siteConfig } from "@/lib/site-config";
import {
  getArticlesByDateAction,
  getArticlesByRangeAction,
  getDatesWithContentAction,
  getAdjacentDatesAction,
} from "@/actions/current-affairs";

interface DateBrowserLayoutProps {
  initialDate: string; // YYYY-MM-DD
  initialArticles: ArticleListItem[];
  initialDatesWithContent: string[]; // for the visible month
  allDatesWithContent: string[]; // all dates for mobile strip
  initialLatestDate: string | null;
  initialAdjacentDates: { prev: string | null; next: string | null };
  locale: Locale;
  initialRange?: "day" | "week" | "month";
}

const MONTHS_HI = [
  "जनवरी", "फरवरी", "मार्च", "अप्रैल", "मई", "जून",
  "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर"
];
const MONTHS_EN = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export function DateBrowserLayout({
  initialDate,
  initialArticles,
  initialDatesWithContent,
  allDatesWithContent,
  initialLatestDate,
  initialAdjacentDates,
  locale,
  initialRange = "month"
}: DateBrowserLayoutProps) {
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [range, setRange] = useState<"day" | "week" | "month">(initialRange);
  const [articles, setArticles] = useState<ArticleListItem[]>(initialArticles);
  const [monthDates, setMonthDates] = useState<string[]>(initialDatesWithContent);
  const [adjacentDates, setAdjacentDates] = useState(initialAdjacentDates);
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(false);

  // Helper: Format date for display
  const formatDisplayDate = (dateStr: string, formatLocale: Locale) => {
    const [year, month, day] = dateStr.split("-").map(Number);
    const months = formatLocale === "hi" ? MONTHS_HI : MONTHS_EN;
    if (formatLocale === "hi") {
      return `${day} ${months[month - 1]} ${year}`;
    }
    return `${day} ${months[month - 1]} ${year}`;
  };

  // Helper: Get local YYYY-MM-DD string
  const getLocalDateString = (offsetDays = 0) => {
    const date = new Date();
    if (offsetDays !== 0) {
      date.setDate(date.getDate() + offsetDays);
    }
    return date.toLocaleDateString("en-CA"); // YYYY-MM-DD format
  };

  const todayStr = getLocalDateString(0);
  const yesterdayStr = getLocalDateString(-1);

  // Sync state with browser back/forward buttons (popstate)
  useEffect(() => {
    const handlePopState = async () => {
      const path = window.location.pathname;
      const search = window.location.search;
      
      const localeNeutralPath = path.replace(/^\/en(?=\/|$)/, "") || "/";
      const match = localeNeutralPath.match(/^\/current-affairs\/(\d{4}-\d{2}-\d{2})\/?$/);
      
      if (match) {
        const date = match[1];
        setLoading(true);
        setSelectedDate(date);
        setRange("day");
        
        const [newArticles, adj] = await Promise.all([
          getArticlesByDateAction(date, locale),
          getAdjacentDatesAction(date)
        ]);
        
        setArticles(newArticles);
        setAdjacentDates(adj);
        setLoading(false);
      } else if (localeNeutralPath === "/current-affairs") {
        const params = new URLSearchParams(search);
        const rangeParam = params.get("range");
        if (rangeParam === "week" || rangeParam === "month" || rangeParam === "day") {
          const rangeVal = rangeParam as "week" | "month" | "day";
          if (rangeVal === "day") {
            setLoading(true);
            setSelectedDate(todayStr);
            setRange("day");
            const [newArticles, adj] = await Promise.all([
              getArticlesByDateAction(todayStr, locale),
              getAdjacentDatesAction(todayStr)
            ]);
            setArticles(newArticles);
            setAdjacentDates(adj);
            setLoading(false);
          } else {
            setRange(rangeVal);
            setLoading(true);
            await loadRange(selectedDate, rangeVal);
            setLoading(false);
          }
        } else {
          // Default to month view if no range is specified
          setRange("month");
          setLoading(true);
          await loadRange(selectedDate, "month");
          setLoading(false);
        }
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [locale, selectedDate, todayStr]);

  // Load articles for a selected date
  const selectDate = async (date: string) => {
    setLoading(true);
    setSelectedDate(date);
    setRange("day");

    // Update URL via pushState
    const prefix = localePrefix(locale);
    const newUrl = `${prefix}/current-affairs/${date}`;
    window.history.pushState(null, "", newUrl);

    // Update Document Title
    const formatted = formatDisplayDate(date, locale);
    const title = locale === "hi"
      ? `करेंट अफेयर्स ${formatted} — UPSC & MPPSC | Aakar IAS`
      : `Current Affairs ${formatted} — UPSC & MPPSC | Aakar IAS`;
    document.title = title;

    try {
      const [newArticles, adj] = await Promise.all([
        getArticlesByDateAction(date, locale),
        getAdjacentDatesAction(date)
      ]);
      setArticles(newArticles);
      setAdjacentDates(adj);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Load range (week or month)
  const loadRange = async (baseDate: string, rangeType: "week" | "month") => {
    const date = new Date(baseDate);
    let startDate = "";
    let endDate = "";

    if (rangeType === "week") {
      const day = date.getDay();
      const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Monday start
      const monday = new Date(date.setDate(diff));
      const sunday = new Date(monday);
      sunday.setDate(monday.getDate() + 6);
      startDate = monday.toLocaleDateString("en-CA");
      endDate = sunday.toLocaleDateString("en-CA");
    } else {
      const [y, m] = baseDate.split("-").map(Number);
      startDate = `${y}-${String(m).padStart(2, "0")}-01`;
      const lastDay = new Date(y, m, 0).getDate();
      endDate = `${y}-${String(m).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}`;
    }

    try {
      const res = await getArticlesByRangeAction(startDate, endDate, locale);
      setArticles(res);
      setAdjacentDates({ prev: null, next: null }); // Disable prev/next arrows during range view
    } catch (err) {
      console.error(err);
    }
  };

  const selectRange = async (newRange: "week" | "month") => {
    setLoading(true);
    setRange(newRange);

    const prefix = localePrefix(locale);
    const newUrl = `${prefix}/current-affairs?range=${newRange}`;
    window.history.pushState(null, "", newUrl);

    // Update Title
    const formatted = formatDisplayDate(selectedDate, locale);
    const [, monthNum] = selectedDate.split("-").map(Number);
    const monthName = locale === "hi" ? MONTHS_HI[monthNum - 1] : MONTHS_EN[monthNum - 1];
    const yearStr = selectedDate.split("-")[0];

    const title = locale === "hi"
      ? newRange === "week"
        ? "करेंट अफेयर्स — इस सप्ताह | Aakar IAS"
        : `${monthName} ${yearStr} के करेंट अफेयर्स | Aakar IAS`
      : newRange === "week"
        ? "Current Affairs — This Week | Aakar IAS"
        : `Current Affairs — ${monthName} ${yearStr} | Aakar IAS`;
    document.title = title;

    await loadRange(selectedDate, newRange);
    setLoading(false);
  };

  // Handle month/year changes in calendar to fetch new clickable dates
  const handleMonthChange = useCallback((year: number, month: number) => {
    startTransition(async () => {
      const dates = await getDatesWithContentAction(year, month);
      setMonthDates(dates);
    });
  }, []);

  // Localized Heading
  const getHeadingText = () => {
    if (range === "day") {
      const dateText = formatDisplayDate(selectedDate, locale);
      return locale === "hi" ? `करेंट अफेयर्स — ${dateText}` : `Current Affairs — ${dateText}`;
    } else if (range === "week") {
      return locale === "hi" ? "करेंट अफेयर्स — इस सप्ताह" : "Current Affairs — This Week";
    } else {
      const [y, m] = selectedDate.split("-").map(Number);
      const months = locale === "hi" ? MONTHS_HI : MONTHS_EN;
      return locale === "hi"
        ? `करेंट अफेयर्स — ${months[m - 1]} ${y}`
        : `Current Affairs — ${months[m - 1]} ${y}`;
    }
  };

  // SEO schemas
  const pageUrl = `${siteConfig.url}${localePrefix(locale)}/current-affairs${range === "day" ? `/${selectedDate}` : `?range=${range}`}`;
  
  const breadcrumbItems = [
    { name: locale === "hi" ? "करेंट अफेयर्स" : "Current Affairs", url: `${siteConfig.url}${localePrefix(locale)}/current-affairs` }
  ];
  if (range === "day") {
    breadcrumbItems.push({
      name: formatDisplayDate(selectedDate, locale),
      url: pageUrl
    });
  } else {
    breadcrumbItems.push({
      name: range === "week" ? (locale === "hi" ? "इस सप्ताह" : "This Week") : (locale === "hi" ? "इस महीने" : "This Month"),
      url: pageUrl
    });
  }

  const breadcrumbSchema = breadcrumbJsonLd(breadcrumbItems);
  const collectionSchema = collectionPageJsonLd({
    name: getHeadingText(),
    description: locale === "hi"
      ? `${formatDisplayDate(selectedDate, locale)} के लिए दैनिक करेंट अफेयर्स।`
      : `Daily current affairs for ${formatDisplayDate(selectedDate, locale)}.`,
    url: pageUrl,
    inLanguage: locale === "hi" ? "hi-IN" : "en-IN",
    items: articles.map((a) => ({
      name: a.title,
      url: `${siteConfig.url}${a.href}`,
    })),
  });

  return (
    <>
      {/* Dynamic SEO Canonical and Alternates */}
      <link rel="canonical" href={pageUrl} />
      <JsonLd data={jsonLdGraph([breadcrumbSchema, collectionSchema])} />

      {/* Main Container */}
      <div className="min-h-screen py-6 lg:py-10">
        {/* Mobile Header / Quick select */}
        <div className="block lg:hidden mb-6 px-4">
          <Breadcrumb items={[{ name: locale === "hi" ? "करेंट अफेयर्स" : "Current Affairs", href: `${localePrefix(locale)}/current-affairs` }, { name: range === "day" ? formatDisplayDate(selectedDate, locale) : range }]} />
          
          <div className="mt-4 flex flex-col gap-3">
            <MobileDateStrip
              selectedDate={selectedDate}
              allDatesWithContent={allDatesWithContent}
              monthDatesWithContent={monthDates}
              locale={locale}
              onSelectDate={selectDate}
              onMonthChange={handleMonthChange}
            />

            {/* Quick Links on Mobile */}
            <div className="flex gap-1.5 overflow-x-auto py-1 no-scrollbar text-xs font-bold">
              <button
                onClick={() => selectDate(todayStr)}
                className={cn(
                  "px-3 py-1.5 rounded-full border transition-colors cursor-pointer flex-shrink-0",
                  selectedDate === todayStr && range === "day"
                    ? "bg-primary border-primary text-primary-foreground"
                    : "bg-card border-border/50 text-muted-foreground hover:bg-muted"
                )}
              >
                {locale === "hi" ? "आज" : "Today"}
              </button>
              <button
                onClick={() => selectDate(yesterdayStr)}
                className={cn(
                  "px-3 py-1.5 rounded-full border transition-colors cursor-pointer flex-shrink-0",
                  selectedDate === yesterdayStr && range === "day"
                    ? "bg-primary border-primary text-primary-foreground"
                    : "bg-card border-border/50 text-muted-foreground hover:bg-muted"
                )}
              >
                {locale === "hi" ? "कल" : "Yesterday"}
              </button>
              <button
                onClick={() => selectRange("week")}
                className={cn(
                  "px-3 py-1.5 rounded-full border transition-colors cursor-pointer flex-shrink-0",
                  range === "week"
                    ? "bg-primary border-primary text-primary-foreground"
                    : "bg-card border-border/50 text-muted-foreground hover:bg-muted"
                )}
              >
                {locale === "hi" ? "इस सप्ताह" : "This Week"}
              </button>
              <button
                onClick={() => selectRange("month")}
                className={cn(
                  "px-3 py-1.5 rounded-full border transition-colors cursor-pointer flex-shrink-0",
                  range === "month"
                    ? "bg-primary border-primary text-primary-foreground"
                    : "bg-card border-border/50 text-muted-foreground hover:bg-muted"
                )}
              >
                {locale === "hi" ? "इस महीने" : "This Month"}
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Layout split: Articles Grid left, Calendar right */}
        <div className="flex flex-col gap-8 lg:flex-row max-w-7xl mx-auto px-4 sm:px-6">
          
          {/* LEFT: Articles List / Grid */}
          <div className="flex-1 min-w-0">
            {/* Desktop breadcrumb */}
            <div className="hidden lg:block mb-4">
              <Breadcrumb items={[{ name: locale === "hi" ? "करेंट अफेयर्स" : "Current Affairs", href: `${localePrefix(locale)}/current-affairs` }, { name: range === "day" ? formatDisplayDate(selectedDate, locale) : range }]} />
            </div>

            {/* Title / Header Row with Day arrows */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-border/40 pb-4 mb-8 gap-4">
              <h1 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                {getHeadingText()}
              </h1>

              {/* Prev / Next day arrows (only in daily view) */}
              {range === "day" && (adjacentDates.prev || adjacentDates.next) && (
                <div className="flex items-center gap-2">
                  {adjacentDates.prev && (
                    <button
                      onClick={() => selectDate(adjacentDates.prev!)}
                      className="flex h-9 items-center gap-1 px-3 rounded-lg border border-border/60 text-xs font-semibold hover:bg-muted text-muted-foreground hover:text-foreground transition-all cursor-pointer"
                      title={locale === "hi" ? "पिछला दिन" : "Previous day"}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      <span>{locale === "hi" ? "पिछला" : "Prev"}</span>
                    </button>
                  )}
                  {adjacentDates.next && (
                    <button
                      onClick={() => selectDate(adjacentDates.next!)}
                      className="flex h-9 items-center gap-1 px-3 rounded-lg border border-border/60 text-xs font-semibold hover:bg-muted text-muted-foreground hover:text-foreground transition-all cursor-pointer"
                      title={locale === "hi" ? "अगला दिन" : "Next day"}
                    >
                      <span>{locale === "hi" ? "अगला" : "Next"}</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Articles Rendering Area */}
            {loading ? (
              // Loading Skeleton - No layout shift (CLS)
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <div key={idx} className="flex flex-col gap-3 rounded-2xl border p-4 bg-card">
                    <Skeleton className="aspect-[16/10] w-full rounded-xl bg-muted" />
                    <Skeleton className="h-4 w-1/4 rounded bg-muted" />
                    <Skeleton className="h-6 w-3/4 rounded bg-muted" />
                    <Skeleton className="h-10 w-full rounded bg-muted" />
                  </div>
                ))}
              </div>
            ) : articles.length > 0 ? (
              // Grid of articles
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {articles.map((a) => (
                  <ArticleCard key={a.id} article={a} />
                ))}
              </div>
            ) : (
              // Empty State
              <div className="flex flex-col items-center justify-center py-20 text-center bg-card/45 rounded-3xl border border-dashed border-border/80 px-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <AlertCircle className="h-6 w-6" />
                </div>
                <p className="text-lg font-bold text-foreground">
                  {locale === "hi" ? "इस तारीख पर कोई करेंट अफेयर्स उपलब्ध नहीं है" : "No Current Affairs available for this date"}
                </p>
                <p className="mt-2 text-sm text-muted-foreground max-w-sm">
                  {locale === "hi"
                    ? "कृपया कैलेंडर से दूसरी तारीख चुनें या उपलब्ध नवीनतम करेंट अफेयर्स देखें।"
                    : "Please pick another date from the calendar or view the latest available current affairs."}
                </p>
                {initialLatestDate && (
                  <button
                    onClick={() => selectDate(initialLatestDate)}
                    className="mt-6 inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-primary-foreground shadow-soft hover:bg-primary/95 transition-all cursor-pointer"
                  >
                    <BookOpen className="h-4 w-4" />
                    <span>
                      {locale === "hi"
                        ? `नवीनतम तिथि देखें (${formatDisplayDate(initialLatestDate, locale)})`
                        : `View Latest Date (${formatDisplayDate(initialLatestDate, locale)})`}
                    </span>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* RIGHT: Calendar Sidebar (Desktop only) */}
          <div className="hidden lg:block w-72 shrink-0 self-start sticky top-24">
            {/* Quick Filter Links */}
            <div className="flex flex-wrap gap-1.5 text-xs font-bold mb-4 bg-muted/30 border border-border/40 p-1.5 rounded-xl">
              <button
                onClick={() => selectDate(todayStr)}
                className={cn(
                  "px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex-1 text-center",
                  selectedDate === todayStr && range === "day"
                    ? "bg-primary text-primary-foreground shadow-soft-sm font-bold"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {locale === "hi" ? "आज" : "Today"}
              </button>
              <button
                onClick={() => selectDate(yesterdayStr)}
                className={cn(
                  "px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex-1 text-center",
                  selectedDate === yesterdayStr && range === "day"
                    ? "bg-primary text-primary-foreground shadow-soft-sm font-bold"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {locale === "hi" ? "कल" : "Yesterday"}
              </button>
              <button
                onClick={() => selectRange("week")}
                className={cn(
                  "px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex-1 text-center",
                  range === "week"
                    ? "bg-primary text-primary-foreground shadow-soft-sm font-bold"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {locale === "hi" ? "सप्ताह" : "Week"}
              </button>
              <button
                onClick={() => selectRange("month")}
                className={cn(
                  "px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex-1 text-center",
                  range === "month"
                    ? "bg-primary text-primary-foreground shadow-soft-sm font-bold"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {locale === "hi" ? "महीना" : "Month"}
              </button>
            </div>

            {/* Desktop calendar */}
            <MiniCalendar
              selectedDate={selectedDate}
              datesWithContent={monthDates}
              locale={locale}
              onSelectDate={selectDate}
              onMonthChange={handleMonthChange}
            />

            {/* Quick details */}
            <div className="mt-4 rounded-2xl border border-border/40 p-4 bg-muted/10 text-xs text-muted-foreground flex items-start gap-2.5">
              <CalendarDays className="h-4.5 w-4.5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-foreground mb-0.5">
                  {locale === "hi" ? "दिनांक-वार ब्राउज़र" : "Date-Wise Navigation"}
                </p>
                <p className="leading-normal">
                  {locale === "hi"
                    ? "दिनांकों पर क्लिक करके उस दिन के करेंट अफेयर्स पढ़ें। जिन दिनांकों पर सामग्री उपलब्ध है, उन्हें रेखांकित किया गया है।"
                    : "Click highlighted dates to browse articles. Underlined dates indicate days with published current affairs."}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
