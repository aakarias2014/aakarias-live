"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Home, BookOpen, Award, Search, User } from "lucide-react";
import { SearchDialog } from "@/components/search/search-dialog";
import { useLanguage } from "@/components/providers/language-provider";
import { cn } from "@/lib/utils";

export function MobileBottomBar() {
  const pathname = usePathname() ?? "/";
  const { locale } = useLanguage();
  const [searchOpen, setSearchOpen] = useState(false);

  // Skip bottom bar on embedded Studio route
  if (pathname.startsWith("/studio")) return null;

  const getHref = (href: string) => {
    if (locale === "en") {
      return href === "/" ? "/en" : `/en${href}`;
    }
    return href;
  };

  const isHomeActive = pathname === "/" || pathname === "/en";
  const isCaActive = pathname.startsWith("/current-affairs") || pathname.startsWith("/en/current-affairs") || pathname.startsWith("/weekly") || pathname.startsWith("/en/weekly") || pathname.startsWith("/monthly") || pathname.startsWith("/en/monthly");
  const isDashboardActive = pathname.startsWith("/dashboard") || pathname.startsWith("/en/dashboard") || pathname.startsWith("/login") || pathname.startsWith("/en/login");

  const navItems = [
    {
      label: locale === "hi" ? "होम" : "Home",
      href: getHref("/"),
      icon: Home,
      active: isHomeActive,
    },
    {
      label: locale === "hi" ? "करेंट अफेयर्स" : "Current Affairs",
      href: getHref("/current-affairs"),
      icon: BookOpen,
      active: isCaActive,
    },
    {
      label: locale === "hi" ? "क्विज़" : "Quiz",
      href: getHref("/current-affairs"),
      icon: Award,
      active: false,
    },
    {
      label: locale === "hi" ? "खोजें" : "Search",
      onClick: () => setSearchOpen(true),
      icon: Search,
      active: searchOpen,
    },
    {
      label: locale === "hi" ? "प्रोफ़ाइल" : "Account",
      href: getHref("/dashboard"),
      icon: User,
      active: isDashboardActive,
    },
  ];

  return (
    <>
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 h-16 bg-background/95 backdrop-blur-xl border-t border-border/60 pb-safe shadow-[0_-4px_12px_rgba(0,0,0,0.03)] dark:shadow-[0_-4px_12px_rgba(0,0,0,0.2)]">
        <nav className="grid h-full grid-cols-5" aria-label="Mobile bottom navigation">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const content = (
              <span className="flex flex-col items-center justify-center h-full gap-0.5 text-center transition-all duration-150">
                <Icon className={cn("h-[20px] w-[20px] transition-transform duration-200", item.active ? "text-primary scale-110" : "text-muted-foreground")} />
                <span className={cn("text-[9px] font-semibold tracking-wide truncate max-w-full", item.active ? "text-primary font-bold" : "text-muted-foreground")}>
                  {item.label}
                </span>
              </span>
            );

            if (item.onClick) {
              return (
                <button
                  key={index}
                  onClick={item.onClick}
                  className="flex flex-col items-center justify-center w-full h-full hover:bg-muted/10 active:bg-muted/20 transition-colors"
                >
                  {content}
                </button>
              );
            }

            return (
              <Link
                key={index}
                href={item.href || "#"}
                className="flex flex-col items-center justify-center w-full h-full hover:bg-muted/10 active:bg-muted/20 transition-colors"
              >
                {content}
              </Link>
            );
          })}
        </nav>
      </div>
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
