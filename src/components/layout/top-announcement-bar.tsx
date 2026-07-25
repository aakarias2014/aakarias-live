"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, X, Clock, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

type TopAnnouncementBarProps = {
  offerBadge?: string;
  offerDateText?: string;
  endDate?: string;
  phoneContact?: string;
  whatsappContact?: string;
  targetLink?: string;
  isActive?: boolean;
};

export function TopAnnouncementBar({
  offerBadge = "🌧️ मानसून मेगा ऑफर!",
  offerDateText = "24 से 28 जुलाई तक",
  endDate,
  phoneContact = "+91 9713300123",
  whatsappContact = "919713300123",
  targetLink = "/#courses",
  isActive = true,
}: TopAnnouncementBarProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);

  // Check session storage so user can dismiss it if wanted
  useEffect(() => {
    const dismissed = sessionStorage.getItem("aakar_announcement_bar_dismissed");
    if (dismissed === "true") {
      setIsVisible(false);
    }
  }, []);

  // Live countdown timer calculation
  useEffect(() => {
    if (!endDate) return;
    const target = new Date(endDate).getTime();
    if (isNaN(target)) return;

    const updateTimer = () => {
      const now = new Date().getTime();
      const diff = target - now;
      if (diff <= 0) {
        setTimeLeft(null);
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [endDate]);

  if (!isActive || !isVisible) return null;

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem("aakar_announcement_bar_dismissed", "true");
  };

  return (
    <div className="relative w-full bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white text-xs font-semibold py-2 px-3 sm:px-6 shadow-md border-b border-amber-400/20 z-[60] select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Main Text / Ribbon Content */}
        <div className="flex items-center gap-2 flex-1 overflow-hidden min-w-0">
          <span className="hidden sm:inline-flex items-center gap-1 bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider shrink-0">
            <Flame className="h-3.5 w-3.5 text-yellow-300 fill-yellow-300 animate-bounce" />
            {offerBadge}
          </span>

          <div className="flex items-center gap-2 truncate text-[11px] sm:text-xs">
            <span className="font-extrabold tracking-tight font-devanagari">
              {offerBadge} MPPSC Mains 2027 (₹21,999/-) एवं Pre+Mains Hybrid Batch (₹40,000/-) पर स्पेशल डिस्काउंट!
            </span>
            <span className="hidden md:inline-block text-white/70">•</span>
            <span className="hidden md:inline-block text-yellow-200 font-bold font-devanagari">
              {offerDateText}
            </span>
          </div>

          {/* Live Countdown Badge */}
          {timeLeft && (
            <div className="hidden lg:inline-flex items-center gap-1 bg-black/20 px-2 py-0.5 rounded-md text-[11px] font-mono font-bold text-yellow-200 border border-white/10 shrink-0">
              <Clock className="h-3 w-3 text-yellow-300 animate-pulse" />
              <span>
                {timeLeft.days > 0 ? `${timeLeft.days}d ` : ""}
                {String(timeLeft.hours).padStart(2, "0")}h {String(timeLeft.minutes).padStart(2, "0")}m {String(timeLeft.seconds).padStart(2, "0")}s
              </span>
            </div>
          )}
        </div>

        {/* Action Button & Close */}
        <div className="flex items-center gap-2 shrink-0">
          <Link
            href={targetLink}
            className="inline-flex items-center gap-1 bg-white text-orange-700 hover:bg-yellow-100 font-extrabold text-[11px] px-3 py-1 rounded-full shadow transition-all hover:scale-105 font-sans"
          >
            <span>ऑफर क्लेम करें</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>

          <button
            onClick={handleDismiss}
            className="p-1 hover:bg-white/20 rounded-full transition-colors text-white/80 hover:text-white"
            aria-label="Close Announcement Bar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
