"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, X, Clock, Flame, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type TopAnnouncementBarProps = {
  offerBadge?: string;
  offerDateText?: string;
  endDate?: string;
  step1Text?: string;
  step2Text?: string;
  buttonText?: string;
  phoneContact?: string;
  whatsappContact?: string;
  targetLink?: string;
  isActive?: boolean;
};

export function TopAnnouncementBar({
  offerBadge = "🌧️ मानसून मेगा ऑफर!",
  offerDateText = "24 से 28 जुलाई तक",
  endDate = "2026-07-28T23:59:59.000Z",
  step1Text = "🌧️ MPPSC Mains 2027 Batch — ₹21,999/- (विशेष छूट)",
  step2Text = "⚡ Pre + Mains Hybrid Batch — ₹40,000/- (विशेष छूट)",
  buttonText = "ऑफर देखें",
  phoneContact = "+91 9713300123",
  whatsappContact = "919713300123",
  targetLink = "/#courses",
  isActive = true,
}: TopAnnouncementBarProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);

  // Check session storage so user can dismiss it if wanted
  useEffect(() => {
    const dismissed = sessionStorage.getItem("aakar_announcement_bar_dismissed");
    if (dismissed === "true") {
      setIsVisible(false);
    }
  }, []);

  // Live countdown timer calculation & AUTO-HIDE ON OFFER EXPIRY
  useEffect(() => {
    if (!endDate) return;
    const target = new Date(endDate).getTime();
    if (isNaN(target)) return;

    const updateTimer = () => {
      const now = new Date().getTime();
      const diff = target - now;
      if (diff <= 0) {
        setTimeLeft(null);
        setIsVisible(false); // AUTO HIDE ANNOUNCEMENT BAR WHEN OFFER ENDS!
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

  // Step Rotator: Step 0 (Course 1) -> Step 1 (Course 2) -> Step 2 (Countdown)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % 3);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  if (!isActive || !isVisible) return null;

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem("aakar_announcement_bar_dismissed", "true");
  };

  const nextStep = () => setCurrentStep((prev) => (prev + 1) % 3);
  const prevStep = () => setCurrentStep((prev) => (prev - 1 + 3) % 3);

  // Restore compact countdown format: 3d 12h 45m 03s
  const formattedCountdown = timeLeft
    ? `${timeLeft.days > 0 ? `${timeLeft.days}d ` : ""}${String(timeLeft.hours).padStart(2, "0")}h ${String(timeLeft.minutes).padStart(2, "0")}m ${String(timeLeft.seconds).padStart(2, "0")}s`
    : "Offer Ended";

  return (
    <div className="relative w-full bg-gradient-to-r from-[#B91C1C] via-[#DC2626] to-[#991B1B] text-white text-xs font-semibold py-2 px-2 sm:px-6 shadow-md border-b border-red-400/30 z-[60] select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-1.5 sm:gap-4">
        
        {/* Left Arrow Nav (Desktop/Tablet) */}
        <button
          onClick={prevStep}
          className="hidden sm:flex p-1 hover:bg-white/20 rounded-full transition-colors text-white/70 hover:text-white shrink-0"
          title="पिछला ऑफर देखें"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {/* Step Content Container (Animated Step-by-Step) */}
        <div className="flex-1 min-w-0 flex items-center justify-center overflow-hidden py-0.5">
          <AnimatePresence mode="wait">
            {currentStep === 0 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-2 text-center"
              >
                <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-extrabold uppercase shrink-0">
                  <Flame className="h-3 w-3 text-yellow-300 fill-yellow-300 animate-bounce" />
                  ऑफर #1
                </span>
                <span className="font-extrabold tracking-tight text-[11px] sm:text-xs font-devanagari text-white">
                  {step1Text}
                </span>
              </motion.div>
            )}

            {currentStep === 1 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-2 text-center"
              >
                <span className="inline-flex items-center gap-1 bg-yellow-400/25 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-extrabold uppercase shrink-0 border border-yellow-300/30">
                  <Sparkles className="h-3 w-3 text-yellow-300 animate-spin" />
                  ऑफर #2
                </span>
                <span className="font-extrabold tracking-tight text-[11px] sm:text-xs font-devanagari text-white">
                  {step2Text}
                </span>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-2 text-center"
              >
                <span className="inline-flex items-center gap-1 bg-black/30 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-extrabold uppercase shrink-0 border border-yellow-300/40 text-yellow-300">
                  <Clock className="h-3 w-3 text-yellow-300 animate-pulse" />
                  ऑफर समाप्त समय
                </span>
                <span className="font-extrabold tracking-tight text-[11px] sm:text-xs font-mono text-yellow-200 bg-black/30 px-2 py-0.5 rounded border border-white/10">
                  ⏱️ {formattedCountdown}
                </span>
                <span className="hidden sm:inline text-white/80 text-[11px] font-devanagari">
                  ({offerDateText})
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Arrow Nav (Desktop/Tablet) */}
        <button
          onClick={nextStep}
          className="hidden sm:flex p-1 hover:bg-white/20 rounded-full transition-colors text-white/70 hover:text-white shrink-0"
          title="अगला ऑफर देखें"
        >
          <ChevronRight className="h-4 w-4" />
        </button>

        {/* Action Button & Close */}
        <div className="flex items-center gap-1.5 shrink-0">
          <Link
            href={targetLink}
            className="inline-flex items-center gap-1 bg-white text-red-700 hover:bg-red-50 font-extrabold text-[10px] sm:text-[11px] px-2.5 sm:px-3 py-1 rounded-full shadow transition-all hover:scale-105 font-sans"
          >
            <span className="whitespace-nowrap">{buttonText}</span>
            <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-red-700" />
          </Link>

          <button
            onClick={handleDismiss}
            className="p-1 hover:bg-white/20 rounded-full transition-colors text-white/80 hover:text-white"
            aria-label="Close Announcement Bar"
          >
            <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
