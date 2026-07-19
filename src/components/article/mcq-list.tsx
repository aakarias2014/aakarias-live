"use client";

import { useState, useEffect, useTransition } from "react";
import { CheckCircle2, XCircle, ChevronDown, Trophy, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { MCQ } from "@/lib/content/types";
import { saveQuizResult } from "@/actions/user";
import { getCurrentUser } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function McqList({
  mcqs,
  articleSlug,
  locale = "hi",
}: {
  mcqs: MCQ[];
  articleSlug?: string;
  locale?: string;
}) {
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isPending, startTransition] = useTransition();

  const isHi = locale === "hi";

  useEffect(() => {
    getCurrentUser().then((session) => {
      setIsSignedIn(!!session);
    });
  }, []);

  const handleAnswer = (questionIndex: number, isCorrect: boolean) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: isCorrect,
    }));
  };

  const answeredCount = Object.keys(answers).length;
  const isFinished = answeredCount === mcqs.length;
  const correctCount = Object.values(answers).filter(Boolean).length;

  const handleSaveResult = () => {
    if (!articleSlug) return;
    startTransition(async () => {
      const res = await saveQuizResult(articleSlug, correctCount, mcqs.length);
      if (res.success) {
        setSubmitted(true);
      }
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="flex items-center gap-2 text-xl font-bold text-foreground">
        <HelpCircle className="h-5 w-5 text-primary" />
        {isHi ? "अभ्यास प्रश्न (Practice Questions)" : "Practice Questions"}
      </h2>
      {mcqs.map((mcq, i) => (
        <McqCard
          key={i}
          mcq={mcq}
          index={i + 1}
          onAnswer={(correct) => handleAnswer(i, correct)}
          locale={locale}
        />
      ))}

      {isFinished && (
        <div className="rounded-3xl border border-border bg-card p-6 shadow-soft text-center space-y-4 max-w-xl mx-auto mt-8">
          <Trophy className="h-12 w-12 text-amber-500 mx-auto" />
          <h3 className="text-xl font-bold text-foreground">
            {isHi ? "क्विज़ समाप्त! (Quiz Complete)" : "Quiz Complete!"}
          </h3>
          <p className="text-sm text-muted-foreground">
            {isHi ? (
              <>
                आपका स्कोर: <strong className="text-lg text-primary">{correctCount} / {mcqs.length}</strong> (सटीकता: {Math.round((correctCount / mcqs.length) * 100)}%)
              </>
            ) : (
              <>
                Your Score: <strong className="text-lg text-primary">{correctCount} / {mcqs.length}</strong> (Accuracy: {Math.round((correctCount / mcqs.length) * 100)}%)
              </>
            )}
          </p>
          {isSignedIn ? (
            <Button
              disabled={isPending || submitted}
              onClick={handleSaveResult}
              className="rounded-full w-full max-w-[240px]"
            >
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin mr-1.5" />
              ) : submitted ? (
                isHi ? "स्कोर सहेजा गया!" : "Score Saved!"
              ) : (
                isHi ? "स्कोर डैशबोर्ड में सहेजें" : "Save Score to Dashboard"
              )}
            </Button>
          ) : (
            <p className="text-xs text-muted-foreground italic">
              {isHi ? (
                <>
                  स्कोर को अपने डैशबोर्ड में सहेजने के लिए कृपया <Link href="/login" className="text-primary underline">लॉगिन</Link> करें।
                </>
              ) : (
                <>
                  Please <Link href="/login" className="text-primary underline">Login</Link> to save your score to the dashboard.
                </>
              )}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function McqCard({
  mcq,
  index,
  onAnswer,
  locale = "hi",
}: {
  mcq: MCQ;
  index: number;
  onAnswer: (isCorrect: boolean) => void;
  locale?: string;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const isHi = locale === "hi";

  const handleSelect = (i: number) => {
    if (selected === null) {
      setSelected(i);
      onAnswer(i === mcq.correctIndex);
    }
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
      <p className="font-semibold text-foreground">
        <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
          {index}
        </span>
        {mcq.question}
      </p>

      <div className="mt-4 space-y-2">
        {mcq.options.map((opt, i) => {
          const isCorrect = i === mcq.correctIndex;
          const isSelected = i === selected;

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              className={cn(
                "flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all",
                selected === null
                  ? "border-border bg-background hover:border-primary/30 hover:bg-primary/5 cursor-pointer"
                  : isCorrect
                    ? "border-green-500/50 bg-green-500/10"
                    : isSelected
                      ? "border-red-500/50 bg-red-500/10"
                      : "border-border bg-background opacity-50",
              )}
            >
              <span
                className={cn(
                  "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-bold",
                  selected !== null && isCorrect
                    ? "border-green-500 bg-green-500 text-white"
                    : selected !== null && isSelected && !isCorrect
                      ? "border-red-500 bg-red-500 text-white"
                      : "border-border text-muted-foreground",
                )}
              >
                {String.fromCharCode(65 + i)}
              </span>
              <span className="flex-1">{opt}</span>
              {selected !== null && isCorrect && <CheckCircle2 className="h-5 w-5 shrink-0 text-green-500" />}
              {selected !== null && isSelected && !isCorrect && <XCircle className="h-5 w-5 shrink-0 text-red-500" />}
            </button>
          );
        })}
      </div>

      {selected !== null && mcq.explanation && (
        <div className="mt-4">
          <button
            onClick={() => setShowExplanation(!showExplanation)}
            className="flex items-center gap-1 text-sm font-medium text-primary hover:underline cursor-pointer"
          >
            <ChevronDown className={cn("h-4 w-4 transition-transform", showExplanation && "rotate-180")} />
            {isHi 
              ? (showExplanation ? "व्याख्या छिपाएं" : "व्याख्या देखें") 
              : (showExplanation ? "Hide explanation" : "Show explanation")}
          </button>
          {showExplanation && (
            <p className="mt-2 rounded-xl bg-muted/50 p-4 text-sm text-muted-foreground">
              {mcq.explanation}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function HelpCircle({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}
