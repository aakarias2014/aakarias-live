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
    <div className="bg-primary/5 border-b border-border/40 py-2.5 md:py-3.5 overflow-hidden">
      <Container size="wide" className="flex flex-col items-center md:flex-row md:items-center md:justify-start gap-2 md:gap-3">
        <span className="md:shrink-0 rounded-full bg-primary/10 border border-primary/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
          {label}
        </span>
        <div className="flex-1 min-w-0 overflow-hidden relative flex items-center justify-center md:justify-start w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -15, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-full py-0.5"
            >
              {link ? (
                <Link
                  href={link}
                  className="text-sm font-semibold text-foreground hover:text-primary transition-colors flex items-center justify-center md:justify-start py-0.5 w-full gap-1"
                >
                  <span className="whitespace-normal md:truncate leading-normal md:leading-relaxed text-center md:text-left">
                    {text}
                  </span>
                  <ChevronRight className="inline-block h-4 w-4 shrink-0" />
                </Link>
              ) : (
                <p className="text-sm font-semibold text-foreground whitespace-normal md:truncate leading-normal md:leading-relaxed py-0.5 w-full text-center md:text-left">
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
