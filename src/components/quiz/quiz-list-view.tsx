"use client";

import React, { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { QuizModalButton } from "./quiz-modal-button";
import { CalendarDays, BookOpen, BrainCircuit } from "lucide-react";
import { formatDate } from "@/lib/seo/metadata";

interface QuizItem {
  id: string;
  _type: string;
  slug: string;
  title: string;
  excerpt: string;
  ca_date: string;
  publishedAt: string;
  category?: {
    id: string;
    slug: string;
    name: string;
  };
  mcqs: any[];
}

interface QuizListViewProps {
  quizzes: QuizItem[];
  locale: "hi" | "en";
}

export function QuizListView({ quizzes, locale }: QuizListViewProps) {
  const isHi = locale === "hi";

  // Group quizzes by date
  const groupedQuizzes = useMemo(() => {
    const groups: Record<string, QuizItem[]> = {};
    quizzes.forEach((quiz) => {
      const date = quiz.ca_date || quiz.publishedAt.split("T")[0];
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(quiz);
    });

    // Sort dates in descending order
    return Object.keys(groups)
      .sort((a, b) => b.localeCompare(a))
      .map((date) => ({
        date,
        items: groups[date],
      }));
  }, [quizzes]);

  return (
    <div className="space-y-12">
      {groupedQuizzes.length > 0 ? (
        <div className="relative border-l border-border/80 ml-4 md:ml-8 pl-6 md:pl-10 space-y-12">
          {groupedQuizzes.map((group) => (
            <div key={group.date} className="relative group">
              {/* Timeline marker node */}
              <div className="absolute -left-[31px] md:-left-[47px] top-1 flex h-6 w-6 md:h-8 md:w-8 items-center justify-center rounded-full border border-primary/20 bg-background text-primary shadow-soft transition-all duration-300 group-hover:scale-110 group-hover:border-primary group-hover:bg-primary/5">
                <CalendarDays className="h-3.5 w-3.5 md:h-4.5 md:w-4.5" />
              </div>

              {/* Group Date Header */}
              <div className="mb-4">
                <h3 className="text-base md:text-lg font-bold text-foreground inline-flex items-center gap-2 bg-muted/40 px-3.5 py-1.5 rounded-full border border-border/40">
                  {formatDate(group.date, locale)}
                </h3>
              </div>

              {/* Quiz Cards for this date */}
              <div className="grid gap-6 md:grid-cols-2">
                {group.items.map((quiz) => (
                  <Card
                    key={quiz.id}
                    className="group/card flex flex-col justify-between overflow-hidden rounded-2xl border border-border/50 bg-card p-5 shadow-soft hover:shadow-soft-lg hover:border-primary/20 transition-all duration-300 hover:translate-y-[-2px]"
                  >
                    <div>
                      {/* Badge & Info Row */}
                      <div className="flex items-center justify-between gap-4 mb-3 flex-wrap">
                        {quiz.category && (
                          <Badge className="bg-primary/10 hover:bg-primary/15 text-primary border-primary/10 text-xs font-semibold rounded-lg px-2.5 py-0.5">
                            {quiz.category.name}
                          </Badge>
                        )}
                        <span className="flex items-center gap-1 text-xs font-semibold text-muted-foreground bg-muted/30 px-2 py-0.5 rounded-md border border-border/20">
                          <BookOpen className="h-3.5 w-3.5 shrink-0" />
                          <span>{quiz.mcqs.length} {isHi ? "प्रश्न" : "Questions"}</span>
                        </span>
                      </div>

                      {/* Quiz Title */}
                      <h4 className="text-base font-extrabold text-foreground leading-snug group-hover/card:text-primary transition-colors line-clamp-2 mb-2 font-devanagari">
                        {quiz.title}
                      </h4>

                      {/* Excerpt */}
                      {quiz.excerpt && (
                        <p className="text-xs text-muted-foreground/90 line-clamp-2 leading-relaxed mb-5 font-devanagari">
                          {quiz.excerpt}
                        </p>
                      )}
                    </div>

                    {/* Start Quiz Action */}
                    <div className="pt-2 border-t border-border/40 mt-auto flex justify-end">
                      <QuizModalButton
                        title={quiz.title}
                        mcqs={quiz.mcqs}
                        articleSlug={quiz.slug}
                        locale={locale}
                      />
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center rounded-3xl border border-dashed border-border bg-muted/10 p-6">
          <BrainCircuit className="h-14 w-14 text-muted-foreground/60 animate-pulse stroke-[1.5]" />
          <h3 className="mt-5 text-xl font-bold text-foreground">
            {isHi ? "कोई क्विज़ उपलब्ध नहीं है" : "No Quizzes Available"}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground max-w-sm">
            {isHi
              ? "कृपया बाद में जाँच करें, जल्द ही नए करेंट अफेयर्स क्विज़ यहाँ जोड़े जाएँगे।"
              : "Please check back later. Daily quizzes will be available here soon."}
          </p>
        </div>
      )}
    </div>
  );
}
