"use client";

import { useState, useTransition } from "react";
import { toggleBookmark } from "@/actions/user";
import { Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface BookmarkButtonProps {
  articleId: string;
  title: string;
  slug: string;
  type: string;
  locale: string;
  initialIsBookmarked: boolean;
  isSignedIn: boolean;
}

export function BookmarkButton({
  articleId,
  title,
  slug,
  type,
  locale,
  initialIsBookmarked,
  isSignedIn,
}: BookmarkButtonProps) {
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleToggle = () => {
    if (!isSignedIn) {
      // Redirect to login page
      router.push(locale === "hi" ? "/login" : "/en/login");
      return;
    }

    // Pessimistic/Optimistic state update
    setIsBookmarked(!isBookmarked);

    startTransition(async () => {
      const res = await toggleBookmark(articleId, title, slug, type, locale);
      if (!res.success) {
        // Rollback state if failed
        setIsBookmarked(isBookmarked);
      }
    });
  };

  return (
    <motion.div whileTap={{ scale: 0.9 }}>
      <Button
        variant="outline"
        size="sm"
        disabled={isPending}
        onClick={handleToggle}
        className={`rounded-full flex items-center gap-1.5 h-9 px-3.5 border-border/60 transition-all ${
          isBookmarked
            ? "bg-primary/10 text-primary border-primary/20"
            : "hover:bg-muted hover:text-foreground text-muted-foreground"
        }`}
      >
        <Bookmark
          className={`h-4 w-4 transition-all ${
            isBookmarked ? "fill-primary text-primary" : ""
          }`}
        />
        <span className="font-semibold text-xs">
          {locale === "hi"
            ? isBookmarked
              ? "सहेजा गया"
              : "सहेजें"
            : isBookmarked
              ? "Saved"
              : "Save"}
        </span>
      </Button>
    </motion.div>
  );
}
