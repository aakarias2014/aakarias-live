"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n/locales";

interface MiniCalendarProps {
  selectedDate: string; // YYYY-MM-DD
  datesWithContent: string[]; // YYYY-MM-DD
  locale: Locale;
  onSelectDate: (date: string) => void;
  onMonthChange?: (year: number, month: number) => void;
  className?: string;
}

const MONTHS_HI = [
  "जनवरी", "फरवरी", "मार्च", "अप्रैल", "मई", "जून",
  "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर"
];
const MONTHS_EN = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const WEEKDAYS_HI = ["रवि", "सोम", "मंगल", "बुध", "गुरु", "शुक्र", "शनि"];
const WEEKDAYS_EN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function MiniCalendar({
  selectedDate,
  datesWithContent,
  locale,
  onSelectDate,
  onMonthChange,
  className
}: MiniCalendarProps) {
  const months = locale === "hi" ? MONTHS_HI : MONTHS_EN;
  const weekdays = locale === "hi" ? WEEKDAYS_HI : WEEKDAYS_EN;

  // Initialize view from selectedDate
  const [year, month, day] = selectedDate.split("-").map(Number);
  const [viewYear, setViewYear] = useState(year || new Date().getFullYear());
  const [viewMonth, setViewMonth] = useState((month !== undefined ? month - 1 : new Date().getMonth()));

  // Keep view in sync when selectedDate changes externally
  useEffect(() => {
    const [y, m] = selectedDate.split("-").map(Number);
    if (y && m) {
      setViewYear(y);
      setViewMonth(m - 1);
    }
  }, [selectedDate]);

  // Notify parent on month change so it can fetch highlighted dates
  useEffect(() => {
    onMonthChange?.(viewYear, viewMonth + 1);
  }, [viewYear, viewMonth, onMonthChange]);

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const handleMonthSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setViewMonth(parseInt(e.target.value, 10));
  };

  const handleYearSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setViewYear(parseInt(e.target.value, 10));
  };

  // Generate calendar days grid
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayIndex = new Date(viewYear, viewMonth, 1).getDay();

  const calendarCells: { dateStr: string | null; dayNum: number | null }[] = [];

  // Pad before the first day of the month
  for (let i = 0; i < firstDayIndex; i++) {
    calendarCells.push({ dateStr: null, dayNum: null });
  }

  // Populate days of the month
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    calendarCells.push({ dateStr, dayNum: d });
  }

  // Pad the end to complete the grid (multiples of 7)
  const remainingCells = 7 - (calendarCells.length % 7);
  if (remainingCells < 7) {
    for (let i = 0; i < remainingCells; i++) {
      calendarCells.push({ dateStr: null, dayNum: null });
    }
  }

  // Keyboard navigation ref mapping
  const cellRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, dateStr: string, index: number) => {
    let targetIndex = -1;

    switch (e.key) {
      case "ArrowRight":
        targetIndex = index + 1;
        break;
      case "ArrowLeft":
        targetIndex = index - 1;
        break;
      case "ArrowDown":
        targetIndex = index + 7;
        break;
      case "ArrowUp":
        targetIndex = index - 7;
        break;
      default:
        return;
    }

    e.preventDefault();

    // Find the next cell in that direction that is valid
    if (targetIndex >= 0 && targetIndex < calendarCells.length) {
      const targetCell = calendarCells[targetIndex];
      if (targetCell?.dateStr) {
        cellRefs.current[targetCell.dateStr]?.focus();
      }
    }
  };

  // Dropdown options
  const years = Array.from({ length: 11 }, (_, i) => new Date().getFullYear() - 5 + i);

  return (
    <div className={cn("rounded-2xl border border-border/60 bg-card p-4 shadow-soft", className)}>
      {/* Calendar Header with dropdowns */}
      <div className="flex items-center justify-between gap-2 pb-4 border-b border-border/40">
        <button
          onClick={handlePrevMonth}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/60 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          aria-label={locale === "hi" ? "पिछला महीना" : "Previous month"}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-1">
          <select
            value={viewMonth}
            onChange={handleMonthSelect}
            className="bg-transparent text-sm font-bold text-foreground focus:outline-none cursor-pointer hover:text-primary pr-1 py-0.5 rounded border-0"
            aria-label={locale === "hi" ? "महीना चुनें" : "Select month"}
          >
            {months.map((m, idx) => (
              <option key={m} value={idx} className="bg-background text-foreground text-xs">
                {m}
              </option>
            ))}
          </select>

          <select
            value={viewYear}
            onChange={handleYearSelect}
            className="bg-transparent text-sm font-bold text-foreground focus:outline-none cursor-pointer hover:text-primary py-0.5 rounded border-0"
            aria-label={locale === "hi" ? "वर्ष चुनें" : "Select year"}
          >
            {years.map((y) => (
              <option key={y} value={y} className="bg-background text-foreground text-xs">
                {y}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleNextMonth}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/60 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          aria-label={locale === "hi" ? "अगला महीना" : "Next month"}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Calendar Grid */}
      <div role="grid" className="mt-4 grid grid-cols-7 gap-1 text-center text-xs">
        {/* Week Days */}
        {weekdays.map((day) => (
          <div key={day} className="h-8 flex items-center justify-center font-bold text-muted-foreground/70 uppercase text-[10px] tracking-wider">
            {day}
          </div>
        ))}

        {/* Days Cells */}
        {calendarCells.map((cell, index) => {
          if (!cell.dayNum || !cell.dateStr) {
            return <div key={`empty-${index}`} className="h-9 w-9" />;
          }

          const hasContent = datesWithContent.includes(cell.dateStr);
          const isSelected = cell.dateStr === selectedDate;
          const isToday = cell.dateStr === new Date().toISOString().split("T")[0];

          return (
            <button
              key={cell.dateStr}
              ref={(el) => { cellRefs.current[cell.dateStr!] = el; }}
              onClick={() => hasContent && onSelectDate(cell.dateStr!)}
              onKeyDown={(e) => handleKeyDown(e, cell.dateStr!, index)}
              disabled={!hasContent}
              tabIndex={isSelected ? 0 : -1}
              aria-selected={isSelected ? "true" : undefined}
              aria-disabled={!hasContent ? "true" : undefined}
              aria-label={`${cell.dayNum} ${months[viewMonth]} ${viewYear} ${hasContent ? "" : "(कोई करेंट अफेयर्स नहीं)"}`}
              className={cn(
                "relative h-9 w-9 flex items-center justify-center rounded-xl text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-primary/80 focus:ring-offset-2 focus:ring-offset-card",
                isSelected
                  ? "bg-primary text-primary-foreground shadow-soft-sm transform scale-105"
                  : hasContent
                    ? "text-foreground font-bold hover:bg-primary/10 hover:text-primary cursor-pointer border border-primary/20 bg-primary/[0.03]"
                    : "text-muted-foreground/30 font-normal cursor-not-allowed line-through",
                isToday && !isSelected && "ring-1 ring-border ring-offset-1 border-muted-foreground/45"
              )}
            >
              <span>{cell.dayNum}</span>
              {/* Highlight dot if date has content and is not selected */}
              {hasContent && !isSelected && (
                <span className="absolute bottom-1.5 h-1 w-1 rounded-full bg-primary" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
