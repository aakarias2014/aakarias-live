"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, Link, Check, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { XIcon, FacebookIcon, WhatsappIcon } from "@/components/layout/brand-icons";

interface ShareDropdownProps {
  title: string;
  url: string;
  locale?: "hi" | "en";
  className?: string;
}

export function ShareDropdown({ title, url, locale = "hi", className }: ShareDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const isHindi = locale === "hi";

  const labels = {
    share: isHindi ? "साझा करें" : "Share",
    copied: isHindi ? "लिंक कॉपी हो गया!" : "Link Copied!",
    copy: isHindi ? "लिंक कॉपी करें" : "Copy Link",
    whatsapp: "WhatsApp",
    twitter: "Twitter / X",
    telegram: "Telegram",
    facebook: "Facebook",
    linkedin: "LinkedIn",
  };

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link", err);
    }
  };

  const shareLinks = {
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(title + " - " + url)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  };

  return (
    <div className={cn("relative inline-flex items-center gap-2", className)} ref={containerRef}>
      {/* Separator Bullet */}
      <span className="text-muted-foreground/40 text-xs select-none font-normal">•</span>

      {/* Trigger Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="h-7 px-3 text-xs font-bold rounded-full bg-primary/5 hover:bg-primary/15 text-primary hover:text-primary border border-primary/20 hover:border-primary/30 transition-all duration-200 flex items-center gap-1.5 shadow-sm active:scale-95 shrink-0"
      >
        <Share2 className="h-3.5 w-3.5 shrink-0" />
        <span>{labels.share}</span>
      </Button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute left-0 sm:left-auto sm:right-0 z-50 mt-2 top-full w-56 rounded-xl border border-border bg-background/90 backdrop-blur-md p-1.5 shadow-lg shadow-black/5"
          >
            {/* Copy Link */}
            <button
              onClick={handleCopy}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-xs font-semibold text-foreground/90 transition-colors hover:bg-muted/60",
                copied && "text-green-500 hover:text-green-600 hover:bg-green-500/5"
              )}
            >
              {copied ? (
                <Check className="h-4 w-4 shrink-0 text-green-500" />
              ) : (
                <Link className="h-4 w-4 shrink-0 text-primary" />
              )}
              <span>{copied ? labels.copied : labels.copy}</span>
            </button>

            <div className="my-1 border-t border-border/50" />

            {/* WhatsApp */}
            <a
              href={shareLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-xs font-semibold text-foreground/90 transition-colors hover:bg-muted/60 hover:text-green-500"
            >
              <WhatsappIcon className="h-4 w-4 shrink-0 text-[#25D366]" />
              <span>{labels.whatsapp}</span>
            </a>

            {/* Twitter / X */}
            <a
              href={shareLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-xs font-semibold text-foreground/90 transition-colors hover:bg-muted/60 hover:text-sky-400"
            >
              <XIcon className="h-4 w-4 shrink-0 text-[#1DA1F2] dark:text-white" />
              <span>{labels.twitter}</span>
            </a>

            {/* Telegram */}
            <a
              href={shareLinks.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-xs font-semibold text-foreground/90 transition-colors hover:bg-muted/60 hover:text-sky-500"
            >
              <Send className="h-4 w-4 shrink-0 text-[#0088cc]" />
              <span>{labels.telegram}</span>
            </a>

            {/* Facebook */}
            <a
              href={shareLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-xs font-semibold text-foreground/90 transition-colors hover:bg-muted/60 hover:text-blue-600"
            >
              <FacebookIcon className="h-4 w-4 shrink-0 text-[#1877F2]" />
              <span>{labels.facebook}</span>
            </a>

            {/* LinkedIn */}
            <a
              href={shareLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-xs font-semibold text-foreground/90 transition-colors hover:bg-muted/60 hover:text-blue-500"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 shrink-0 text-[#0A66C2]">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span>{labels.linkedin}</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
