"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, Link, Check, Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { XIcon } from "@/components/layout/brand-icons";

interface ShareWidgetProps {
  title: string;
  url: string;
  className?: string;
  locale?: "hi" | "en";
}

export function ShareWidget({ title, url, className, locale = "hi" }: ShareWidgetProps) {
  const [copied, setCopied] = useState(false);

  const shareData = {
    title,
    text: title,
    url,
  };

  const isHindi = locale === "hi";

  const labels = {
    share: isHindi ? "साझा करें" : "Share",
    copied: isHindi ? "लिंक कॉपी हो गया!" : "Link Copied!",
    copy: isHindi ? "लिंक कॉपी करें" : "Copy Link",
    whatsapp: "WhatsApp",
    twitter: "Twitter / X",
    telegram: "Telegram",
  };

  const handleNativeShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        handleCopy();
      }
    } catch (err) {
      console.warn("Share failed", err);
    }
  };

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
  };

  return (
    <div className={cn("space-y-3", className)}>
      <h3 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
        {labels.share}
      </h3>
      <div className="flex flex-wrap gap-2">
        {/* Native share on mobile */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleNativeShare}
          className="md:hidden rounded-full border-border bg-card/50 hover:bg-card text-foreground"
        >
          <Share2 className="h-4 w-4 mr-2 text-primary animate-pulse" />
          {labels.share}
        </Button>

        {/* Copy Link Button */}
        <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className={cn(
              "rounded-full border-border bg-card/50 hover:bg-card text-foreground transition-colors duration-300",
              copied && "border-green-500 bg-green-500/10 text-green-500 hover:bg-green-500/10 hover:text-green-500"
            )}
          >
            {copied ? (
              <Check className="h-4 w-4 mr-2" />
            ) : (
              <Link className="h-4 w-4 mr-2 text-primary" />
            )}
            {copied ? labels.copied : labels.copy}
          </Button>
        </motion.div>

        {/* WhatsApp Button */}
        <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="outline"
            size="sm"
            asChild
            className="rounded-full border-border bg-card/50 hover:bg-card text-foreground hover:text-green-500"
          >
            <a href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-4 w-4 mr-2 text-[#25D366]" />
              {labels.whatsapp}
            </a>
          </Button>
        </motion.div>

        {/* Twitter / X Button */}
        <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="outline"
            size="sm"
            asChild
            className="rounded-full border-border bg-card/50 hover:bg-card text-foreground hover:text-sky-400"
          >
            <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer">
              <XIcon className="h-4 w-4 mr-2 text-[#1DA1F2]" />
              {labels.twitter}
            </a>
          </Button>
        </motion.div>

        {/* Telegram Button */}
        <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="outline"
            size="sm"
            asChild
            className="rounded-full border-border bg-card/50 hover:bg-card text-foreground hover:text-sky-500"
          >
            <a href={shareLinks.telegram} target="_blank" rel="noopener noreferrer">
              <Send className="h-4 w-4 mr-2 text-[#0088cc]" />
              {labels.telegram}
            </a>
          </Button>
        </motion.div>
      </div>

      {/* Floating success feedback inside the widget */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-xs text-green-500 flex items-center gap-1.5"
          >
            <Check className="h-3 w-3" />
            {labels.copied}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
