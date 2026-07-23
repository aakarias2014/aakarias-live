"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, ChevronDown, Send, X } from "lucide-react";

import { Logo } from "@/components/layout/logo";
import { SearchTrigger } from "@/components/layout/search-trigger";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Container } from "@/components/layout/container";
import { navigationConfig, siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/providers/language-provider";

export function SiteHeader() {
  const pathname = usePathname() ?? "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const { locale } = useLanguage();

  const getHref = (href: string) => {
    if (locale === "en") {
      return href === "/" ? "/en" : `/en${href}`;
    }
    return href;
  };

  // Skip header chrome on the embedded Studio route.
  if (pathname.startsWith("/studio")) return null;

  const isActive = (href: string) => {
    const target = getHref(href);
    return target === "/" || target === "/en"
      ? pathname === target
      : pathname === target || pathname.startsWith(`${target}/`);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80">
        {/* 1. Top Utility Bar (thin strip - desktop only) */}
        <div className="w-full border-b border-border/30 bg-muted/40 text-[11px] py-1.5 hidden lg:block select-none">
          <Container size="wide" className="flex justify-between items-center h-5">
            {/* Left Links */}
            <div className="flex items-center gap-3.5 text-muted-foreground font-semibold">
              <Link href={getHref("/notifications")} className="hover:text-primary transition-colors flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                Aakar IAS Update
              </Link>
              <span className="text-border/60">|</span>
              <Link href={getHref("/calendar")} className="hover:text-primary transition-colors">
                Exams Notification
              </Link>
              <span className="text-border/60">|</span>
              <a href="https://cdn.sanity.io/files/pnc4agic/production321/7aa3563b35ae74b8e9b52c3e28f6ba0c999d0c63.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                {locale === "hi" ? "ब्रोशर और सिलेबस डाउनलोड" : "Download Brochure & Syllabus"}
              </a>
            </div>

            {/* Right Links */}
            <div className="flex items-center gap-3.5 text-muted-foreground font-semibold">
              <SearchTrigger className="h-5 bg-transparent hover:bg-transparent border-none p-0 text-muted-foreground hover:text-primary font-semibold text-[11px] transition-colors" />
              <span className="text-border/60">|</span>
              <LanguageSwitcher />
              <Link href={getHref("/login")} className="hover:text-primary transition-colors">
                {locale === "hi" ? "छात्र पोर्टल" : "Student Portal"}
              </Link>
              <span className="text-border/60">|</span>
              <Link href={getHref("/download")} className="hover:text-primary transition-colors flex items-center gap-1">
                <span className="px-1 py-0.5 rounded bg-primary/10 text-primary text-[9px] font-bold">APP</span>
                {locale === "hi" ? "ऐप डाउनलोड करें" : "Download App"}
              </Link>
            </div>
          </Container>
        </div>

        {/* 2. Main Navbar */}
        <Container size="wide" className="px-2.5 sm:px-4 lg:px-8 flex h-16 items-center gap-1.5 sm:gap-3">
          {/* Mobile hamburger menu panel */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 sm:h-9 sm:w-9 p-0 lg:hidden shrink-0"
                aria-label="Open navigation menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 max-w-[85vw] overflow-y-auto">
              <SheetHeader>
                <SheetTitle asChild>
                  <div className="pb-2">
                    <Logo />
                  </div>
                </SheetTitle>
              </SheetHeader>
              
              {/* Mobile Accordion Menu */}
              <MobileAccordionNav getHref={getHref} locale={locale} setOpen={setMobileOpen} />
              
              <div className="mt-6 flex flex-col gap-4 border-t border-border pt-6">
                <Button className="rounded-full w-full bg-primary hover:bg-primary/95 text-primary-foreground font-bold shadow-soft" onClick={() => { setMobileOpen(false); setJoinModalOpen(true); }}>
                  {locale === "hi" ? "अभी जुड़ें (Join Now)" : "Join Now"}
                </Button>
                <div className="flex items-center justify-between border-t border-border/50 pt-4">
                  <span className="text-xs text-muted-foreground font-semibold">Language / भाषा:</span>
                  <LanguageSwitcher />
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <Logo />

          {/* Desktop primary nav with mega-menus & dropdowns */}
          <nav className="ml-6 hidden flex-1 items-center gap-1.5 lg:flex h-full" aria-label="Primary">
            {navigationConfig.map((item, idx) => {
              const itemTitle = locale === "hi" ? item.title : item.titleEn;
              const hasDropdown = !!item.dropdown;
              const isMegaMenu = item.isMega && hasDropdown;

              return (
                <div key={idx} className="relative group flex items-center h-full">
                  <Link
                    href={getHref(item.href)}
                    className={cn(
                      "rounded-md px-3 py-2 text-sm font-semibold transition-colors flex items-center gap-1 cursor-pointer",
                      isActive(item.href)
                        ? "text-primary"
                        : "text-foreground/75 hover:bg-muted hover:text-foreground",
                    )}
                  >
                    {itemTitle}
                    {hasDropdown && <ChevronDown className="h-3 w-3 text-muted-foreground/80 group-hover:rotate-180 transition-transform duration-200" />}
                  </Link>

                  {/* Dropdowns / Mega-menus rendering */}
                  {hasDropdown && (
                    isMegaMenu ? (
                      /* 2-Column Mega Menu for UPSC / MPPSC */
                      <div className="absolute left-1/2 -translate-x-1/2 top-full z-50 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 w-[550px] rounded-2xl border border-border/80 bg-popover p-5 shadow-soft-2xl grid grid-cols-12 gap-5 mt-[-2px] animate-in fade-in slide-in-from-top-1 duration-150">
                        {/* Left Column (Grid of sub-links) */}
                        <div className="col-span-7 grid grid-cols-1 gap-0.5 text-sm border-r border-border/40 pr-4">
                          {item.dropdown?.map((sub, sIdx) => (
                            <Link
                              key={sIdx}
                              href={getHref(sub.href)}
                              className="block rounded-lg px-3 py-2 text-foreground/80 hover:bg-primary/5 hover:text-primary transition-all font-medium"
                            >
                              {locale === "hi" ? sub.title : sub.titleEn}
                            </Link>
                          ))}
                        </div>

                        {/* Right Column (Highlighted featured card) */}
                        <div className="col-span-5 flex flex-col justify-between rounded-xl bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4 border border-primary/10">
                          <div>
                            <span className="inline-block rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-bold text-primary uppercase tracking-wider mb-2">
                              {item.titleEn === "MPPSC" ? "State Special" : "Hot PDF"}
                            </span>
                            <h4 className="font-extrabold text-foreground text-xs leading-snug line-clamp-2">
                              {item.titleEn === "MPPSC" ? "Today's MP Current Affairs (एमपी डेली सीए)" : "Latest Solved UPSC PYQ Bank"}
                            </h4>
                            <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed line-clamp-3">
                              {item.titleEn === "MPPSC"
                                ? "डेली मध्य प्रदेश करेंट अफेयर्स और राज्य विशेष जीके अध्ययन सामग्री का नवीनतम संकलन।"
                                : "Get immediate access to solved CSE prelims and mains question papers indexed by year."}
                            </p>
                          </div>
                          <Link
                            href={item.titleEn === "MPPSC" ? getHref("/mppsc") : getHref("/upsc")}
                            className="mt-4 inline-flex items-center text-xs font-bold text-primary hover:underline"
                          >
                            {locale === "hi" ? "अभी पढ़ें" : "Read Now"} &rarr;
                          </Link>
                        </div>
                      </div>
                    ) : (
                      /* Standard Dropdown Menu */
                      <div className="absolute left-0 top-full z-50 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 w-56 rounded-xl border border-border bg-popover p-1.5 shadow-soft-lg mt-[-2px] animate-in fade-in slide-in-from-top-1 duration-150">
                        {item.dropdown?.map((sub, sIdx) => (
                          <Link
                            key={sIdx}
                            href={getHref(sub.href)}
                            className="block rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-muted hover:text-foreground transition-all"
                          >
                            {locale === "hi" ? sub.title : sub.titleEn}
                          </Link>
                        ))}
                      </div>
                    )
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right cluster */}
          <div className="ml-auto flex items-center gap-1 sm:gap-2 shrink-0">
            {/* Search trigger (hidden on desktop, handled by Top Bar) */}
            <div className="lg:hidden">
              <SearchTrigger iconOnly className="h-8 w-8 sm:h-9 sm:w-9 px-0 shrink-0" />
            </div>

            <ThemeToggle />

            {/* CTA Join Now Button */}
            <Button
              onClick={() => setJoinModalOpen(true)}
              className="rounded-full bg-primary hover:bg-primary/95 text-primary-foreground font-bold shadow-soft text-[11px] sm:text-xs px-2.5 sm:px-4 h-8 sm:h-9 shrink-0 whitespace-nowrap"
            >
              {locale === "hi" ? "अभी जुड़ें" : "Join Now"}
            </Button>
          </div>
        </Container>
      </header>

      {/* 3. Join WhatsApp & Telegram Channels Modal */}
      {joinModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-soft-2xl md:p-8 animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setJoinModalOpen(false)}
              className="absolute right-4 top-4 rounded-full p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
              aria-label="Close modal"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-extrabold tracking-tight text-foreground">
                  {locale === "hi" ? "आकार IAS कम्युनिटी से जुड़ें" : "Join Aakar IAS Community"}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {locale === "hi"
                    ? "हमारे ऑफिशियल सोशल मीडिया चैनल्स पर मुफ्त दैनिक पीडीएफ, नोट्स, क्विज और परीक्षा अलर्ट सीधे प्राप्त करें।"
                    : "Access free study materials, daily PDFs, notes, and exam alerts directly inside your channels."}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* WhatsApp Card */}
                <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/5 p-5 flex flex-col justify-between hover:border-emerald-500/40 hover:shadow-soft transition-all duration-200">
                  <div>
                    <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-3">
                      <span className="font-bold text-lg leading-none">WA</span>
                    </div>
                    <h3 className="font-bold text-foreground text-base">WhatsApp Channel</h3>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      {locale === "hi"
                        ? "दैनिक करेंट अफेयर्स पीडीएफ और महत्वपूर्ण नोट्स सीधे चैट पर प्राप्त करें।"
                        : "Get daily current affairs PDFs and notes inside your chat inbox."}
                    </p>
                  </div>
                  <Button className="mt-6 w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-xs font-bold shadow-soft" asChild>
                    <a href={siteConfig.links.whatsapp} target="_blank" rel="noopener noreferrer">
                      {locale === "hi" ? "चैनल से जुड़ें" : "Join Channel"}
                    </a>
                  </Button>
                </div>

                {/* Telegram Card */}
                <div className="rounded-2xl border border-sky-500/25 bg-sky-500/5 p-5 flex flex-col justify-between hover:border-sky-500/40 hover:shadow-soft transition-all duration-200">
                  <div>
                    <div className="h-10 w-10 rounded-xl bg-sky-500/10 text-sky-600 flex items-center justify-center mb-3">
                      <Send className="h-5 w-5" />
                    </div>
                    <h3 className="font-bold text-foreground text-base">Telegram Channel</h3>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      {locale === "hi"
                        ? "सभी क्लास नोट्स, साप्ताहिक क्विज और तैयारी सामग्री की विस्तृत फाइलें।"
                        : "Class notes, weekly quizzes, and extensive files for Civil Services Exam."}
                    </p>
                  </div>
                  <Button className="mt-6 w-full bg-sky-600 hover:bg-sky-700 text-white rounded-full text-xs font-bold shadow-soft" asChild>
                    <a href={siteConfig.links.telegram} target="_blank" rel="noopener noreferrer">
                      {locale === "hi" ? "ग्रुप से जुड़ें" : "Join Telegram"}
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ─── Internal: Mobile Accordion Panel Helper ───────────────────────── */

function MobileAccordionNav({
  getHref,
  locale,
  setOpen,
}: {
  getHref: (href: string) => string;
  locale: "hi" | "en";
  setOpen: (open: boolean) => void;
}) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <nav className="mt-4 flex flex-col gap-1.5" aria-label="Mobile Navigation">
      {navigationConfig.map((item, idx) => {
        const title = locale === "hi" ? item.title : item.titleEn;

        if (!item.dropdown) {
          return (
            <Link
              key={item.href}
              href={getHref(item.href)}
              onClick={() => setOpen(false)}
              className="rounded-lg px-4 py-2.5 text-base font-medium text-foreground hover:bg-muted transition-colors block"
            >
              {title}
            </Link>
          );
        }

        const isExpanded = expandedIndex === idx;

        return (
          <div key={idx} className="space-y-1">
            <button
              onClick={() => handleToggle(idx)}
              className={cn(
                "flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-base font-medium text-foreground hover:bg-muted transition-colors text-left",
                isExpanded && "bg-muted"
              )}
            >
              <span>{title}</span>
              <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", isExpanded && "rotate-180")} />
            </button>

            {isExpanded && (
              <div className="pl-4 pr-2 py-1 space-y-1 border-l-2 border-primary/20 ml-4 animate-in slide-in-from-top-1 duration-100">
                {item.dropdown.map((sub, sIdx) => {
                  const subTitle = locale === "hi" ? sub.title : sub.titleEn;
                  return (
                    <Link
                      key={sIdx}
                      href={getHref(sub.href)}
                      onClick={() => setOpen(false)}
                      className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                    >
                      {subTitle}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
