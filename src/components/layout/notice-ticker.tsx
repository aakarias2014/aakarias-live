"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { motion, AnimatePresence } from "framer-motion";
import { HomeNotice } from "@/lib/content/types";

interface NoticeTickerProps {
  notices: HomeNotice[];
  label: string;
}

export function NoticeTicker({ notices, label }: NoticeTickerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (notices.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % notices.length);
    }, 6000); // Cycle notices every 6 seconds for comfortable reading
    return () => clearInterval(timer);
  }, [notices.length]);

  if (!notices || notices.length === 0) return null;

  const currentNotice = notices[currentIndex];
  const text = currentNotice.noticeText;
  const link = currentNotice.noticeLink;

  return (
    <div className="bg-primary/5 border-b border-border/40 py-2 sm:py-2.5 overflow-hidden">
      <Container size="wide" className="flex items-center gap-2 md:gap-3">
        <span className="shrink-0 rounded-full bg-primary/10 border border-primary/20 px-2 py-0.5 text-[9.5px] sm:text-[10px] font-extrabold uppercase tracking-wider text-primary">
          {label}
        </span>
        <div className="flex-1 min-w-0 overflow-hidden relative flex items-center w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="w-full py-0.5"
            >
              {link ? (
                <Link
                  href={link}
                  className="text-xs sm:text-sm font-bold text-foreground hover:text-primary transition-colors flex items-center py-0.5 w-full gap-1"
                >
                  <span className="truncate leading-tight text-left">
                    {text}
                  </span>
                  <ChevronRight className="inline-block h-3.5 w-3.5 shrink-0 text-primary" />
                </Link>
              ) : (
                <p className="text-xs sm:text-sm font-bold text-foreground truncate leading-tight py-0.5 w-full text-left">
                  {text}
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </div>
  );
}
