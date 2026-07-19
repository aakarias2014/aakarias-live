"use client";

import React, { useState } from "react";
import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { MiniCalendar } from "@/components/content/mini-calendar";
import type { Locale } from "@/lib/i18n/locales";

interface MobileDateStripProps {
  selectedDate: string; // YYYY-MM-DD
  allDatesWithContent: string[]; // YYYY-MM-DD (sorted asc)
  monthDatesWithContent: string[]; // YYYY-MM-DD (for the month calendar)
  locale: Locale;
  onSelectDate: (date: string) => void;
  onMonthChange?: (year: number, month: number) => void;
}

export function MobileDateStrip({
  selectedDate,
  allDatesWithContent,
  monthDatesWithContent,
  locale,
  onSelectDate,
  onMonthChange
}: MobileDateStripProps) {
  const [open, setOpen] = useState(false);

  // Take the 6 most recent dates with content
  const recentDates = allDatesWithContent.slice(-6);

  // Ensure selectedDate is in the display list
  let displayDates = [...recentDates];
  if (selectedDate && allDatesWithContent.includes(selectedDate) && !displayDates.includes(selectedDate)) {
    displayDates.push(selectedDate);
  }
  displayDates.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  // Format helper for date cell inside the strip
  const formatStripDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    const dayOfWeek = date.getDay();

    const dayNamesHi = ["रवि", "सोम", "मंगल", "बुध", "गुरु", "शुक्र", "शनि"];
    const dayNamesEn = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const monthsHi = ["जन", "फर", "मार्च", "अप्रै", "मई", "जून", "जुला", "अग", "सित", "अक्टू", "नवं", "दिसं"];
    const monthsEn = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    return {
      dayName: locale === "hi" ? dayNamesHi[dayOfWeek] : dayNamesEn[dayOfWeek],
      dayNum: day,
      monthName: locale === "hi" ? monthsHi[month - 1] : monthsEn[month - 1]
    };
  };

  const handleSelectFromCalendar = (date: string) => {
    onSelectDate(date);
    setOpen(false); // Close dialog on select
  };

  return (
    <div className="flex items-center gap-2 bg-card/65 backdrop-blur-md p-2.5 rounded-2xl border border-border/50 shadow-soft-sm lg:hidden w-full overflow-hidden">
      {/* Date cells horizontal list */}
      <div className="flex flex-1 gap-1.5 overflow-x-auto no-scrollbar scroll-smooth snap-x">
        {displayDates.map((dateStr) => {
          const isSelected = dateStr === selectedDate;
          const { dayName, dayNum, monthName } = formatStripDate(dateStr);

          return (
            <button
              key={dateStr}
              onClick={() => onSelectDate(dateStr)}
              className={cn(
                "flex-shrink-0 snap-align-start flex flex-col items-center justify-center w-12 h-14 rounded-xl border transition-all cursor-pointer",
                isSelected
                  ? "bg-primary border-primary text-primary-foreground font-bold shadow-soft-sm scale-105"
                  : "bg-muted/30 border-border/40 text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <span className="text-[9px] uppercase font-bold tracking-wider opacity-80">{dayName}</span>
              <span className="text-base font-extrabold leading-tight">{dayNum}</span>
              <span className="text-[8px] font-semibold opacity-90">{monthName}</span>
            </button>
          );
        })}
      </div>

      {/* Vertical separator */}
      <div className="h-10 w-[1px] bg-border/60 self-center" />

      {/* Pick a Date Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button
            className="flex-shrink-0 flex flex-col items-center justify-center w-12 h-14 rounded-xl border border-primary/25 bg-primary/[0.04] text-primary hover:bg-primary/10 transition-all cursor-pointer font-semibold"
            aria-label={locale === "hi" ? "तारीख चुनें" : "Pick a date"}
          >
            <Calendar className="h-4.5 w-4.5" />
            <span className="text-[8px] mt-1 font-bold">
              {locale === "hi" ? "कैलेंडर" : "Pick Date"}
            </span>
          </button>
        </DialogTrigger>
        <DialogContent className="max-w-[340px] p-0 overflow-hidden border-border/40 rounded-3xl">
          <div className="p-4 bg-muted/20 border-b border-border/40">
            <DialogTitle className="text-sm font-bold">
              {locale === "hi" ? "करेंट अफेयर्स कैलेंडर" : "Current Affairs Calendar"}
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground mt-0.5">
              {locale === "hi" ? "वह तारीख चुनें जिसके करेंट अफेयर्स आप पढ़ना चाहते हैं" : "Select a date to read current affairs"}
            </DialogDescription>
          </div>
          <div className="p-3">
            <MiniCalendar
              selectedDate={selectedDate}
              datesWithContent={monthDatesWithContent}
              locale={locale}
              onSelectDate={handleSelectFromCalendar}
              onMonthChange={onMonthChange}
              className="border-0 shadow-none p-0"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
