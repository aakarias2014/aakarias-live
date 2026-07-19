"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { McqList } from "@/components/article/mcq-list";
import { Play } from "lucide-react";
import type { MCQ } from "@/lib/content/types";

interface QuizModalButtonProps {
  title: string;
  mcqs: MCQ[];
  articleSlug: string;
  locale: "hi" | "en";
}

export function QuizModalButton({ title, mcqs, articleSlug, locale }: QuizModalButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isHi = locale === "hi";

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="w-full sm:w-auto bg-primary hover:bg-primary/95 text-white font-bold rounded-xl gap-2 transition-all animate-fade-in"
        >
          <Play className="h-4 w-4 fill-current shrink-0" />
          <span>{isHi ? "क्विज़ शुरू करें" : "Start Quiz"}</span>
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto p-6 rounded-2xl bg-background border border-border shadow-2xl">
        <DialogHeader className="border-b border-border/40 pb-4 mb-4">
          <DialogTitle className="text-lg lg:text-xl font-extrabold text-foreground leading-snug pr-8">
            {isHi ? `क्विज़: ${title}` : `Quiz: ${title}`}
          </DialogTitle>
        </DialogHeader>
        
        <div className="pt-2">
          {isOpen && (
            <McqList
              mcqs={mcqs}
              articleSlug={articleSlug}
              locale={locale}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
