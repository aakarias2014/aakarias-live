"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import {
  Play,
  Timer,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Award,
  TrendingUp,
  HelpCircle,
  Calendar,
  RotateCcw,
  BookOpen,
  Trophy
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { quizzes, Quiz, Question } from "./quiz-data";
import { cn } from "@/lib/utils";

interface DailyQuizFlowProps {
  locale: "hi" | "en";
  initialQuizzes?: Quiz[];
  initialSubjectQuizzes?: Quiz[];
}

export function DailyQuizFlow({ locale, initialQuizzes = [], initialSubjectQuizzes = [] }: DailyQuizFlowProps) {
  const allQuizzes = useMemo(() => {
    if (initialQuizzes && initialQuizzes.length > 0) {
      // Filter out static quizzes if their IDs match the dynamic ones to avoid duplicates
      const staticFiltered = quizzes.filter(sq => !initialQuizzes.some(iq => iq.id === sq.id));
      return [...initialQuizzes, ...staticFiltered];
    }
    return quizzes;
  }, [initialQuizzes]);

  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<"daily" | "subject">("daily");
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>("all");

  const filteredQuizList = useMemo(() => {
    if (selectedCategoryFilter === "daily") {
      return allQuizzes;
    } else {
      if (selectedSubjectFilter === "all") {
        return initialSubjectQuizzes;
      }
      return initialSubjectQuizzes.filter(q => q.subject === selectedSubjectFilter);
    }
  }, [selectedCategoryFilter, selectedSubjectFilter, allQuizzes, initialSubjectQuizzes]);

  // Navigation State
  // "hub" | "practice" | "analysis"
  const [view, setView] = useState<"hub" | "practice" | "analysis">("hub");
  const [prevQuizzes, setPrevQuizzes] = useState(allQuizzes);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz>(allQuizzes[0]);

  if (allQuizzes !== prevQuizzes) {
    setPrevQuizzes(allQuizzes);
    setSelectedQuiz(allQuizzes[0]);
  }

  // Quiz Attempt State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, "A" | "B" | "C" | "D">>({});
  const [markedForReview, setMarkedForReview] = useState<Record<string, boolean>>({});
  const [visitedQuestions, setVisitedQuestions] = useState<Record<string, boolean>>({
    [allQuizzes[0]?.questions[0]?.id || "default"]: true
  });
  
  // Timer State
  const [secondsRemaining, setSecondsRemaining] = useState<number>(0);
  const [timerActive, setTimerActive] = useState<boolean>(false);

  // Stats / Results State
  const [resultStats, setResultStats] = useState({
    correct: 0,
    wrong: 0,
    skipped: 0,
    scorePercent: 0,
    timeSpent: ""
  });

  const handleStartQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setMarkedForReview({});
    setVisitedQuestions({ [quiz.questions[0].id]: true });
    setSecondsRemaining(quiz.durationMins * 60);
    setTimerActive(true);
    setView("practice");
  };

  const handleOptionSelect = (questionId: string, optionKey: "A" | "B" | "C" | "D") => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionKey }));
  };

  const handleToggleReview = (questionId: string) => {
    setMarkedForReview((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < selectedQuiz.questions.length - 1) {
      const nextIdx = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIdx);
      const nextQId = selectedQuiz.questions[nextIdx].id;
      setVisitedQuestions((prev) => ({ ...prev, [nextQId]: true }));
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      const prevIdx = currentQuestionIndex - 1;
      setCurrentQuestionIndex(prevIdx);
      const prevQId = selectedQuiz.questions[prevIdx].id;
      setVisitedQuestions((prev) => ({ ...prev, [prevQId]: true }));
    }
  };

  const handleSubmitQuiz = useCallback(() => {
    setTimerActive(false);
    
    let correct = 0;
    let wrong = 0;
    let skipped = 0;

    selectedQuiz.questions.forEach((q) => {
      const userAns = answers[q.id];
      if (!userAns) {
        skipped++;
      } else if (userAns === q.correctAnswer) {
        correct++;
      } else {
        wrong++;
      }
    });

    const totalQuestions = selectedQuiz.questions.length;
    const scorePercent = Math.round((correct / totalQuestions) * 100);
    
    const timeUsedSeconds = (selectedQuiz.durationMins * 60) - secondsRemaining;
    const minUsed = Math.floor(timeUsedSeconds / 60);
    const secUsed = timeUsedSeconds % 60;
    const timeSpent = `${minUsed}m ${secUsed}s`;

    setResultStats({
      correct,
      wrong,
      skipped,
      scorePercent,
      timeSpent
    });

    setView("analysis");
  }, [answers, secondsRemaining, selectedQuiz]);

  // Timer logic - placed after handleSubmitQuiz declaration
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerActive && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => prev - 1);
      }, 1000);
    } else if (timerActive && secondsRemaining === 0) {
      // Defer state updates using setTimeout to avoid warning in render loop
      const timer = setTimeout(() => {
        setTimerActive(false);
        handleSubmitQuiz();
      }, 0);
      return () => clearTimeout(timer);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive, secondsRemaining, handleSubmitQuiz]);

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Translations object
  const t = {
    dailyQuizTitle: locale === "hi" ? "डेली क्विज़ और एमसीक्यू अभ्यास" : "Daily Quiz & MCQ Practice",
    dailyQuizSub: locale === "hi" ? "प्रतिदिन नए प्रश्नों के साथ अपनी तैयारी को मजबूत बनाइए।" : "Strengthen your preparation with new questions daily.",
    startQuiz: locale === "hi" ? "आज का क्विज़ शुरू करें" : "Start Today's Quiz",
    practiceMcqs: locale === "hi" ? "एमसीक्यू का अभ्यास करें" : "Practice MCQs",
    todaysLive: locale === "hi" ? "आज का लाइव क्विज़" : "Today's Live Quiz",
    todaysLiveSub: locale === "hi" ? "दैनिक समसामयिकी के महत्वपूर्ण प्रश्नों का अभ्यास करें।" : "Practice important questions of daily current affairs.",
    questions: locale === "hi" ? "प्रश्न" : "Questions",
    mins: locale === "hi" ? "मिनट" : "Mins",
    takeQuiz: locale === "hi" ? "क्विज़ शुरू करें" : "Take Quiz",
    browseCategory: locale === "hi" ? "श्रेणी के अनुसार ब्राउज़ करें" : "Browse by Category",
    weeklyWrap: locale === "hi" ? "साप्ताहिक रैप" : "Weekly Wrap",
    monthlyRecap: locale === "hi" ? "मासिक रिकैप" : "Monthly Recap",
    previousYear: locale === "hi" ? "पिछले वर्ष के प्रश्न" : "Previous Year",
    topicWise: locale === "hi" ? "विषयवार अभ्यास" : "Topic-wise",
    mockTests: locale === "hi" ? "मॉक टेस्ट" : "Mock Tests",
    recentMcq: locale === "hi" ? "हाल के एमसीक्यू अभ्यास" : "Recent MCQ Practice",
    viewAll: locale === "hi" ? "सभी देखें" : "View All",
    attemptNow: locale === "hi" ? "अभी प्रयास करें" : "Attempt Now",
    dailyInsight: locale === "hi" ? "दैनिक इनसाइट" : "Daily Insight",
    leaderboard: locale === "hi" ? "साप्ताहिक लीडरबोर्ड" : "Weekly Leaderboard",
    pts: locale === "hi" ? "अंक" : "pts",
    unlockPremium: locale === "hi" ? "प्रीमियम एक्सेस अनलॉक करें" : "Unlock Premium Access",
    question: locale === "hi" ? "प्रश्न" : "Question",
    markForReview: locale === "hi" ? "रिव्यू के लिए चिह्नित करें" : "Mark for Review",
    saveAndNext: locale === "hi" ? "सहेजें और अगला" : "Save & Next",
    submitQuiz: locale === "hi" ? "क्विज़ सबमिट करें" : "Submit Quiz",
    previous: locale === "hi" ? "पिछला" : "Previous",
    palette: locale === "hi" ? "प्रश्न पैलेट" : "Question Palette",
    answered: locale === "hi" ? "उत्तर दिया" : "Answered",
    notVisited: locale === "hi" ? "नहीं देखा" : "Not Visited",
    notAnswered: locale === "hi" ? "उत्तर नहीं दिया" : "Not Answered",
    forReview: locale === "hi" ? "समीक्षा के लिए" : "For Review",
    completed: locale === "hi" ? "क्विज़ पूर्ण" : "Quiz Completed",
    excellent: locale === "hi" ? "अति उत्कृष्ट, अभ्यर्थी!" : "Excellent, Aspirant!",
    accuracy: locale === "hi" ? "सटीकता" : "Accuracy",
    level: locale === "hi" ? "हासिल किया गया स्तर" : "Level Achieved",
    pro: locale === "hi" ? "अभ्यर्थी प्रो" : "Aspirant Pro",
    correct: locale === "hi" ? "सही" : "Correct",
    wrong: locale === "hi" ? "गलत" : "Wrong",
    skipped: locale === "hi" ? "छोड़ा गया" : "Skipped",
    timeSpent: locale === "hi" ? "समय बिताया" : "Time Spent",
    explanation: locale === "hi" ? "स्पष्टीकरण" : "Explanation",
    yourAnswer: locale === "hi" ? "आपका उत्तर" : "Your Answer",
    correctAnswer: locale === "hi" ? "सही उत्तर" : "Correct Answer",
    backToHub: locale === "hi" ? "मुख्य हब पर वापस जाएं" : "Back to Quiz Hub",
    sharePerf: locale === "hi" ? "प्रदर्शन साझा करें" : "Share Performance",
    cert: locale === "hi" ? "प्रमाण पत्र" : "Certificate"
  };

  // Render Hub Screen
  if (view === "hub") {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12 space-y-12">
        {/* Hero Section */}
        <section className="grid lg:grid-cols-2 gap-8 items-center bg-card rounded-[32px] p-6 lg:p-12 border border-border/50 relative overflow-hidden shadow-sm">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--primary)_0%,_transparent_50%)] opacity-[0.03] dark:opacity-[0.07]" />
          <div className="space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full border border-primary/20 dark:bg-primary/20 dark:text-primary">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider">NEW QUESTIONS LIVE</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
              {t.dailyQuizTitle}
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {t.dailyQuizSub}
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button
                onClick={() => handleStartQuiz(allQuizzes[0])}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-6 rounded-2xl shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95 text-base"
              >
                {t.startQuiz}
              </Button>
              <Button
                variant="outline"
                onClick={() => handleStartQuiz(allQuizzes[1 % allQuizzes.length])}
                className="border-border hover:bg-muted font-bold px-8 py-6 rounded-2xl transition-all active:scale-95 text-base"
              >
                {t.practiceMcqs}
              </Button>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-[28px] border border-border/60 shadow-xl hidden lg:block">
            <div className="h-72 overflow-hidden relative">
              <Image
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                alt="UPSC Study Desk Mockup"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7NdE5ZECuDD5dUBZzj4WW9i5El3tQdNfZVCJsgkmemLIOGZhPqx8QIBUfGtlI33jHuzMrGSKC4psXZCii2SKGQWdnLJxFBeZ34GtFuv2CaGiQANomUwHjYHHvbQSYQ1i2fmae3eloszxSU2r5NPi4brlPUB3tnOOsvhthHg6EBuSeV-XJmqsWCk4kRymCOseEGT1tJt1GNvWb7M4ntY7qEKuG24KPqQM_MIrFuyg0mk21VGRyyfqOnA6yn9GSGLbr4L03W_vkC5o"
                width={600}
                height={300}
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-6">
                <span className="bg-primary text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                  FEATURED
                </span>
              </div>
            </div>
            <div className="p-6 bg-card flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg text-foreground">Economics Special</h3>
                <p className="text-muted-foreground text-sm">Advanced Module: Fiscal Policy</p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1.5 text-primary font-extrabold text-sm justify-end">
                  <Timer className="h-4 w-4" /> 15 {t.mins}
                </div>
                <span className="text-muted-foreground text-xs font-semibold">25 {t.questions}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Bar */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 flex items-center gap-4 bg-muted/30 border-border/50 hover:bg-muted/50 transition-all">
            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary dark:bg-primary/20">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div>
              <p className="text-muted-foreground text-xs uppercase tracking-wider font-bold">Today&apos;s Attempts</p>
              <h4 className="text-2xl font-extrabold text-foreground mt-0.5">1,429</h4>
            </div>
          </Card>
          <Card className="p-6 flex items-center gap-4 bg-muted/30 border-border/50 hover:bg-muted/50 transition-all">
            <div className="h-12 w-12 rounded-2xl bg-yellow-500/10 flex items-center justify-center text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <p className="text-muted-foreground text-xs uppercase tracking-wider font-bold">Highest Score</p>
              <h4 className="text-2xl font-extrabold text-foreground mt-0.5">98%</h4>
            </div>
          </Card>
          <Card className="p-6 flex items-center gap-4 bg-muted/30 border-border/50 hover:bg-muted/50 transition-all">
            <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div>
              <p className="text-muted-foreground text-xs uppercase tracking-wider font-bold">Questions Solved</p>
              <h4 className="text-2xl font-extrabold text-foreground mt-0.5">45.2k+</h4>
            </div>
          </Card>
        </section>

        {/* Categories & Daily list & Sidebar Grid */}
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            {/* Today's Quiz Card (Featured) */}
            <Card className="p-6 lg:p-8 rounded-[28px] bg-gradient-to-br from-card to-muted/20 border-border/60 relative overflow-hidden shadow-sm">
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-6 mb-6">
                <div>
                  <h2 className="text-xl lg:text-2xl font-bold text-foreground">{t.todaysLive}</h2>
                  <p className="text-muted-foreground text-sm mt-1">{t.todaysLiveSub}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <span className="bg-muted px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 text-muted-foreground">
                    <BookOpen className="h-3 w-3" /> 5 {t.questions}
                  </span>
                  <span className="bg-muted px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 text-muted-foreground">
                    <Timer className="h-3 w-3" /> 5 {t.mins}
                  </span>
                  <span className="bg-primary/10 text-primary dark:bg-primary/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    MEDIUM
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center pt-2">
                <div className="flex -space-x-2.5 overflow-hidden">
                  <Image
                    alt="Aspirant Avatar"
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-card"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDYvfKbBhAWGr_03JBfMkhVo4sL_jSkLyy2bFRQj20JlmHouYYCFzit0WO5Cx8CoUOaQBA3iTSgkk4bHf8L1nxk5QXcwrx6dsh0C5b8qIZYpliuadZ-vh-uBrrpffLU5C6iX8ux_66Yel807mkZRDCXJim2u_u0TZIIBqvvsGUqcv_-SUila3_VCh_pc7hd8mvqw0ruJM9qduuH-6kdS506AK2jx37Ok0k31ALgOJga11cNNoqKP0onpzXhL_UH5RERmI98dMm_hs"
                    width={32}
                    height={32}
                  />
                  <Image
                    alt="Aspirant Avatar"
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-card"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhihKvWHm2DX2UYeVWPCOQZxFTyad_w5HQ5RoWYJU8S80Bi07ZzNvvO47vdHY4UHO1UPY3uiETguphEXIfL_V7kWfDODIAzgm4CAMrBPPXiU4OFn6uxsMQ8tQX_TEfRKM3dG7LO4yTDCKrSoc9aihQMK9fZrNAcvG1VxoWnyRTXzkZVxTsNOsbDo8bmnBeuuKCBDcTJkCUsRFCtt8r6eqECXHtOO4jmtnAsU-H669NsXXjSQbyhD_lGcembHQ4cCU15SBjye4qWCg"
                    width={32}
                    height={32}
                  />
                  <Image
                    alt="Aspirant Avatar"
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-card"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbN0lL49Fr3D_hNO2h-iZZcmKTa625QEnFtwdFuvBQjITyh7Sd0gTKaJdy7ycS-1_9pjHOXv1-0pGaBUuLLWmHrLGm1IySkIxkMEYLKpsN18QHpWQCeVQ-dcrveLY0gcQRI04nko96RZAUib5HNrUyUX49dDJ38fmUHq8G-07AaqDZ352IQ5E45aPGUqk3nEoPmWXFntVDGGJ7aT2OpHJjNrOpWtnquGNPlTL2J6XEdF9NpMlEN4l483l1E2Kqtm-Z1dhdY5Jae9Y"
                    width={32}
                    height={32}
                  />
                  <div className="inline-block h-8 w-8 rounded-full bg-border text-[9px] font-bold ring-2 ring-card flex items-center justify-center text-muted-foreground">
                    +142
                  </div>
                </div>
                <Button
                  onClick={() => handleStartQuiz(allQuizzes[0])}
                  className="bg-primary hover:bg-primary/95 text-white rounded-full font-bold px-6 gap-1 shadow-md hover:scale-[1.02] active:scale-95 transition-all text-sm h-11"
                >
                  {t.takeQuiz} <Play className="h-4 w-4 fill-white" />
                </Button>
              </div>
            </Card>

            {/* Category Grid */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-foreground">{t.browseCategory}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <Card
                  onClick={() => { setSelectedCategoryFilter("daily"); setSelectedSubjectFilter("all"); }}
                  className={cn(
                    "p-5 flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:scale-[1.01] bg-card hover:bg-muted/10 group border rounded-2xl",
                    selectedCategoryFilter === "daily" ? "border-primary ring-1 ring-primary/20 bg-primary/[0.02]" : "border-border/50"
                  )}
                >
                  <div className="w-10 h-10 rounded-2xl bg-primary/5 text-primary flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-semibold text-foreground">{locale === "hi" ? "दैनिक क्विज़" : "Daily Quiz"}</span>
                </Card>

                <Card
                  onClick={() => handleStartQuiz(allQuizzes[1 % allQuizzes.length])}
                  className="p-5 flex flex-col items-center justify-center text-center cursor-pointer border-border/50 hover:border-primary/50 transition-all hover:scale-[1.01] bg-card hover:bg-muted/10 group rounded-2xl"
                >
                  <div className="w-10 h-10 rounded-2xl bg-primary/5 text-primary flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <RotateCcw className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-semibold text-foreground">{t.weeklyWrap}</span>
                </Card>

                <Card
                  onClick={() => handleStartQuiz(allQuizzes[2 % allQuizzes.length])}
                  className="p-5 flex flex-col items-center justify-center text-center cursor-pointer border-border/50 hover:border-primary/50 transition-all hover:scale-[1.01] bg-card hover:bg-muted/10 group rounded-2xl"
                >
                  <div className="w-10 h-10 rounded-2xl bg-primary/5 text-primary flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <Award className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-semibold text-foreground">{t.monthlyRecap}</span>
                </Card>

                <Card
                  onClick={() => handleStartQuiz(allQuizzes[2 % allQuizzes.length])}
                  className="p-5 flex flex-col items-center justify-center text-center cursor-pointer border-border/50 hover:border-primary/50 transition-all hover:scale-[1.01] bg-card hover:bg-muted/10 group rounded-2xl"
                >
                  <div className="w-10 h-10 rounded-2xl bg-primary/5 text-primary flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-semibold text-foreground">{t.previousYear}</span>
                </Card>

                <Card
                  onClick={() => { setSelectedCategoryFilter("subject"); setSelectedSubjectFilter("all"); }}
                  className={cn(
                    "p-5 flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:scale-[1.01] bg-card hover:bg-muted/10 group border rounded-2xl",
                    selectedCategoryFilter === "subject" ? "border-primary ring-1 ring-primary/20 bg-primary/[0.02]" : "border-border/50"
                  )}
                >
                  <div className="w-10 h-10 rounded-2xl bg-primary/5 text-primary flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-semibold text-foreground">{t.topicWise}</span>
                </Card>

                <Card
                  onClick={() => handleStartQuiz(allQuizzes[0])}
                  className="p-5 flex flex-col items-center justify-center text-center cursor-pointer border-border/50 hover:border-primary/50 transition-all hover:scale-[1.01] bg-card hover:bg-muted/10 group rounded-2xl"
                >
                  <div className="w-10 h-10 rounded-2xl bg-primary/5 text-primary flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <Trophy className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-semibold text-foreground">{t.mockTests}</span>
                </Card>
              </div>
            </div>

            {/* Dynamic Quizzes List */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/40 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-foreground">
                    {selectedCategoryFilter === "daily"
                      ? (locale === "hi" ? "दैनिक करेंट अफेयर्स क्विज़" : "Daily Current Affairs Quizzes")
                      : (locale === "hi" ? "विषय-वार अभ्यास क्विज़" : "Subject-wise Practice Quizzes")}
                  </h3>
                  <p className="text-muted-foreground text-xs mt-0.5">
                    {selectedCategoryFilter === "daily"
                      ? (locale === "hi" ? "दैनिक समसामयिकी के महत्वपूर्ण प्रश्नों का अभ्यास करें।" : "Practice daily current affairs questions.")
                      : (locale === "hi" ? "विषय-वार प्रश्नों के साथ विशिष्ट विषयों की तैयारी मजबूत करें।" : "Strengthen specific subjects with subject-focused quizzes.")}
                  </p>
                </div>
                
                {selectedCategoryFilter === "subject" && (
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { code: "all", hi: "सभी", en: "All" },
                      { code: "MPGK", hi: "MPGK", en: "MPGK" },
                      { code: "Science", hi: "विज्ञान", en: "Science" },
                      { code: "Geography", hi: "भूगोल", en: "Geography" },
                      { code: "History", hi: "इतिहास", en: "History" },
                      { code: "Polity", hi: "राजव्यवस्था", en: "Polity" },
                      { code: "Economy", hi: "अर्थव्यवस्था", en: "Economy" },
                      { code: "Environment", hi: "पर्यावरण", en: "Environment" }
                    ].map((subj) => (
                      <button
                        key={subj.code}
                        onClick={() => setSelectedSubjectFilter(subj.code)}
                        className={cn(
                          "px-3 py-1 rounded-full text-2xs font-bold transition-all uppercase tracking-wider",
                          selectedSubjectFilter === subj.code
                            ? "bg-primary text-primary-foreground shadow"
                            : "bg-muted hover:bg-muted/80 text-muted-foreground"
                        )}
                      >
                        {locale === "hi" ? subj.hi : subj.en}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-4">
                {filteredQuizList.length > 0 ? (
                  filteredQuizList.map((quiz) => (
                    <Card key={quiz.id} className="p-6 border-border/50 shadow-sm flex flex-col gap-4 hover:border-primary/20 transition-all rounded-3xl">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-muted-foreground font-mono uppercase tracking-wider font-bold">
                          {locale === "hi" ? quiz.categoryHi : quiz.categoryEn} - {quiz.difficulty}
                        </span>
                        <span className="bg-primary/5 text-primary dark:bg-primary/20 px-2.5 py-0.5 rounded-full font-bold">
                          {quiz.questionsCount} {locale === "hi" ? "प्रश्न" : "Questions"}
                        </span>
                      </div>
                      <h4 className="text-base font-semibold text-foreground leading-relaxed">
                        {locale === "hi" ? quiz.titleHi : quiz.titleEn}
                      </h4>
                      <p className="text-muted-foreground text-xs line-clamp-2">
                        {locale === "hi" ? quiz.descriptionHi : quiz.descriptionEn}
                      </p>
                      <div className="flex justify-between items-center border-t border-border/30 pt-4">
                        <div className="flex items-center gap-4 text-muted-foreground text-xs font-semibold">
                          <span className="flex items-center gap-1">
                            <Timer className="h-3.5 w-3.5" /> {quiz.durationMins} Mins
                          </span>
                        </div>
                        <Button
                          onClick={() => handleStartQuiz(quiz)}
                          className="bg-primary hover:bg-primary/95 text-white font-bold rounded-full text-xs h-9 px-5 shadow-sm"
                        >
                          {locale === "hi" ? "शुरू करें" : "Attempt Now"}
                        </Button>
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-12 text-muted-foreground border border-dashed border-border rounded-3xl">
                    {locale === "hi" ? "इस विषय में कोई क्विज़ उपलब्ध नहीं है।" : "No quizzes available for this subject."}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar (Right Column) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Daily Insight Widget */}
            <Card className="p-6 bg-primary text-primary-foreground border-none overflow-hidden relative shadow-md group rounded-3xl">
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000" />
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
                <BookOpen className="h-5 w-5" /> {t.dailyInsight}
              </h3>
              <div className="space-y-3 relative z-10 text-white">
                <div className="bg-white/10 hover:bg-white/15 p-4 rounded-2xl transition-all cursor-pointer border border-white/5">
                  <h4 className="font-bold text-xs mb-1">Today&apos;s Current Affairs</h4>
                  <p className="text-[10px] opacity-75">Full notes & daily current affairs PDF</p>
                </div>
                <div className="bg-white/10 hover:bg-white/15 p-4 rounded-2xl transition-all cursor-pointer border border-white/5">
                  <h4 className="font-bold text-xs mb-1">Latest Editorial</h4>
                  <p className="text-[10px] opacity-75">Analyzing clean air policies & outcomes</p>
                </div>
                <div className="bg-white/10 hover:bg-white/15 p-4 rounded-2xl transition-all cursor-pointer border border-white/5">
                  <h4 className="font-bold text-xs mb-1">Monthly PDF</h4>
                  <p className="text-[10px] opacity-75">Download June 2026 Prelims Special</p>
                </div>
              </div>
              <Button className="w-full mt-5 bg-white hover:bg-white/95 text-primary font-bold rounded-2xl py-5 h-11 text-xs">
                {t.unlockPremium}
              </Button>
            </Card>

            {/* Leaderboard Widget */}
            <Card className="p-6 border-border/50 shadow-sm rounded-3xl">
              <h3 className="font-bold text-foreground mb-4">{t.leaderboard}</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-muted/50 transition-all">
                  <span className="font-bold text-primary w-4 text-center">1</span>
                  <Image
                    alt="Aspirant Avatar"
                    className="w-8 h-8 rounded-full border border-border"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlXfzDiDR0XqqN5KQio9QivCF5g9f-qkMn9RbtgVC8oMYvFZN06xOgfm6fpIDrHFzQ1TVXOReuUzk--uzH-b49gzO5YYGtqhLpM0_E15f7NdNNMcJGQxAvsw71Ojq9yJ3hmLkBKJx3F3BV3A1jZp1CVf4qT_5i7_d6S6Rwa0-YAJg4GV1jMVD5hkC4GVusjIstkdAfRDz41Pt3amyKGHDWnQqOPZGLTqcp-lnbDR-cHMAlLjAofN8poBZ3EO9_4_0pNxpAP9fWraI"
                    width={32}
                    height={32}
                  />
                  <div className="flex-1">
                    <p className="text-xs font-bold text-foreground">Abhishek S.</p>
                    <div className="h-1 bg-muted rounded-full w-full mt-1 overflow-hidden">
                      <div className="h-full bg-primary w-[98%]" />
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-muted-foreground">980 {t.pts}</span>
                </div>

                <div className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-muted/50 transition-all">
                  <span className="font-bold text-muted-foreground w-4 text-center">2</span>
                  <Image
                    alt="Aspirant Avatar"
                    className="w-8 h-8 rounded-full border border-border"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkn7GWnrnkJ6S6GagBOy_aqk7rVAN5oSmPoLyUZ2wLE8GBDZkwpU9fYg6Sjkw2DWulAX1Agalm7hZv9-nH_tVkmSSMwStOTeYBtl6Q5hYspr9QXXQfIqEjFbVTF6i_fpVO87msNT1D_gnxvnX2mHjHDBhi0dW2RC0pN_KVui2CbXkwqSnRxe7_jumwx4pFI0Zl27swDVYEUrWABXs2uWhuEeThIglOUmAnrBmY-KeY53fwfWJnwZOCsVNQxXo16sCuRYwmBw-i_Ug"
                    width={32}
                    height={32}
                  />
                  <div className="flex-1">
                    <p className="text-xs font-bold text-foreground">Meera Reddy</p>
                    <div className="h-1 bg-muted rounded-full w-full mt-1 overflow-hidden">
                      <div className="h-full bg-primary w-[95%]" />
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-muted-foreground">950 {t.pts}</span>
                </div>

                <div className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-muted/50 transition-all">
                  <span className="font-bold text-muted-foreground w-4 text-center">3</span>
                  <Image
                    alt="Aspirant Avatar"
                    className="w-8 h-8 rounded-full border border-border"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCTpeJIpdAEa64yLfdQMWHDoHTTxhGGo6YAHv99Xy-0omFryEfqp86lRQz3FHrneWbl93mVDKVznGBRRnlyb0GWbuPDTrR2x80_jqNldK90vmlqz2veRrVSgMur6nw33AOPNcxknAeuFmRBTpu_wvwrddR8GKwnL9FmoeNsT_5nXrIl5wFbrlukHSm0uQ46Gfud_9eO_acFR2n5yA3xljrweLGmI5AiGiyCKjOeRfZaOlvUKHT288V0WgbdXKZ2ZjgLrXYQ4ePGpcM"
                    width={32}
                    height={32}
                  />
                  <div className="flex-1">
                    <p className="text-xs font-bold text-foreground">Vikram Singh</p>
                    <div className="h-1 bg-muted rounded-full w-full mt-1 overflow-hidden">
                      <div className="h-full bg-primary w-[92%]" />
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-muted-foreground">920 {t.pts}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Render Practice Screen (Live Quiz Attempt)
  if (view === "practice") {
    const currentQuestion: Question = selectedQuiz.questions[currentQuestionIndex];
    const userSelectedAnswer = answers[currentQuestion.id];

    return (
      <div className="min-h-[calc(100vh-4rem)] bg-muted/10 w-full pb-12 pt-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-6">
          {/* Main Question Area */}
          <div className="flex-1 space-y-6">
            {/* Top Stat Bar */}
            <Card className="p-4 flex items-center justify-between border-border/50 shadow-sm bg-card">
              <div className="flex-1 max-w-md pr-4">
                <div className="flex justify-between items-center text-xs mb-1 font-bold text-muted-foreground">
                  <span className="text-primary tracking-wider uppercase">
                    {locale === "hi" ? selectedQuiz.titleHi : selectedQuiz.titleEn}
                  </span>
                  <span>
                    {t.question} {currentQuestionIndex + 1} of {selectedQuiz.questions.length}
                  </span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-300"
                    style={{
                      width: `${((currentQuestionIndex + 1) / selectedQuiz.questions.length) * 100}%`
                    }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-muted rounded-xl text-primary font-bold tabular-nums text-sm">
                  <Timer className="h-4 w-4 animate-pulse" />
                  {formatTimer(secondsRemaining)}
                </div>
                <Button
                  onClick={handleSubmitQuiz}
                  className="bg-primary text-white font-bold h-9 px-4 text-xs rounded-xl"
                >
                  {t.submitQuiz}
                </Button>
              </div>
            </Card>

            {/* Question Details */}
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-primary text-xs font-bold font-mono tracking-widest uppercase">
                  {t.question} {currentQuestionIndex + 1}
                </span>
                <h2 className="text-xl font-bold text-foreground mt-0.5">
                  {locale === "hi" ? currentQuestion.subjectHi : currentQuestion.subjectEn}
                </h2>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleToggleReview(currentQuestion.id)}
                className={cn(
                  "h-10 w-10 rounded-full transition-all active:scale-90",
                  markedForReview[currentQuestion.id]
                    ? "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20"
                    : "text-muted-foreground hover:bg-muted"
                )}
              >
                <Bookmark className="h-5 w-5" fill={markedForReview[currentQuestion.id] ? "currentColor" : "none"} />
              </Button>
            </div>

            {/* Question Card (Bilingual Side-by-Side or Stacked) */}
            <Card className="p-6 lg:p-8 border-border/50 shadow-sm space-y-6">
              <div className="space-y-6 divide-y divide-border/40">
                {/* English Content */}
                <div className="space-y-3">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/5 px-2.5 py-0.5 rounded-full dark:bg-primary/20">English</span>
                  <p className="text-base lg:text-lg font-medium text-foreground leading-relaxed whitespace-pre-line">
                    {currentQuestion.textEn}
                  </p>
                </div>
                
                {/* Hindi Content */}
                <div className="space-y-3 pt-6">
                  <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest bg-amber-500/5 px-2.5 py-0.5 rounded-full dark:bg-amber-500/20 dark:text-amber-400">हिंदी</span>
                  <p className="text-base lg:text-lg font-medium text-foreground leading-relaxed leading-loose whitespace-pre-line font-hindi-body">
                    {currentQuestion.textHi}
                  </p>
                </div>
              </div>
            </Card>

            {/* Options Selector */}
            <div className="grid gap-3">
              {currentQuestion.options.map((option) => {
                const isSelected = userSelectedAnswer === option.key;

                return (
                  <button
                    key={option.key}
                    onClick={() => handleOptionSelect(currentQuestion.id, option.key)}
                    className={cn(
                      "w-full text-left p-4 rounded-2xl border flex items-center gap-4 transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 active:translate-y-[1px]",
                      isSelected
                        ? "bg-primary-fixed border-primary shadow-sm"
                        : "bg-card hover:bg-muted/10 hover:border-primary/30 border-border/60"
                    )}
                  >
                    <div
                      className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shrink-0",
                        isSelected
                          ? "bg-primary text-white"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {option.key}
                    </div>
                    <div className="flex-1 flex flex-col text-sm text-foreground">
                      <span className="font-semibold">{option.textEn}</span>
                      <span className="text-muted-foreground text-xs mt-0.5 font-hindi-body">{option.textHi}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Controls */}
            <div className="flex justify-between items-center pt-4">
              <Button
                variant="outline"
                disabled={currentQuestionIndex === 0}
                onClick={handlePrevious}
                className="gap-1 border-border font-bold rounded-xl active:scale-95 h-11"
              >
                <ChevronLeft className="h-4 w-4" /> {t.previous}
              </Button>

              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  onClick={() => handleToggleReview(currentQuestion.id)}
                  className={cn(
                    "font-bold rounded-xl active:scale-95 h-11",
                    markedForReview[currentQuestion.id]
                      ? "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20"
                      : ""
                  )}
                >
                  {markedForReview[currentQuestion.id] ? "Marked!" : t.markForReview}
                </Button>
                
                {currentQuestionIndex < selectedQuiz.questions.length - 1 ? (
                  <Button
                    onClick={handleNext}
                    className="bg-primary text-white hover:bg-primary/90 font-bold rounded-xl active:scale-95 h-11 gap-1"
                  >
                    {t.saveAndNext} <ChevronRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmitQuiz}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl active:scale-95 h-11"
                  >
                    {t.submitQuiz}
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar Question Palette */}
          <aside className="w-full lg:w-72 space-y-6">
            <Card className="p-4 border-border/50 shadow-sm bg-card rounded-3xl">
              <div className="flex items-center justify-between mb-4 border-b border-border/30 pb-3">
                <h3 className="font-bold text-xs uppercase tracking-wider text-muted-foreground">
                  {t.palette}
                </h3>
                <span className="text-xs bg-muted px-2 py-0.5 rounded-full font-bold text-primary">
                  {Object.keys(answers).length}/{selectedQuiz.questions.length} Solved
                </span>
              </div>

              {/* Grid of question buttons */}
              <div className="grid grid-cols-5 gap-2.5 mb-6">
                {selectedQuiz.questions.map((q, idx) => {
                  const isCurrent = idx === currentQuestionIndex;
                  const isAnswered = !!answers[q.id];
                  const isReview = !!markedForReview[q.id];
                  const isVisited = !!visitedQuestions[q.id];

                  let btnBg = "bg-muted text-muted-foreground border-transparent";
                  if (isCurrent) {
                    btnBg = "bg-primary text-white border-primary ring-2 ring-primary/20";
                  } else if (isReview) {
                    btnBg = "bg-amber-500 text-white border-amber-500";
                  } else if (isAnswered) {
                    btnBg = "bg-emerald-600 text-white border-emerald-600";
                  } else if (isVisited) {
                    btnBg = "bg-card border-primary text-primary border-2";
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => {
                        setCurrentQuestionIndex(idx);
                        setVisitedQuestions((prev) => ({ ...prev, [q.id]: true }));
                      }}
                      className={cn(
                        "w-10 h-10 rounded-xl font-bold text-xs flex items-center justify-center border transition-all active:scale-90",
                        btnBg
                      )}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="space-y-2.5 text-xs border-t border-border/30 pt-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <div className="w-3.5 h-3.5 rounded-md bg-emerald-600" />
                  <span>{t.answered}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <div className="w-3.5 h-3.5 rounded-md bg-amber-500" />
                  <span>{t.forReview}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <div className="w-3.5 h-3.5 rounded-md border border-primary bg-card" />
                  <span>{t.notAnswered}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <div className="w-3.5 h-3.5 rounded-md bg-muted" />
                  <span>{t.notVisited}</span>
                </div>
              </div>
            </Card>
          </aside>
        </div>
      </div>
    );
  }

  // Render Analysis / Results Screen
  if (view === "analysis") {
    // Generate radial metrics
    const strokeDasharray = 351.85; // 2 * pi * r (r=56)
    const strokeDashoffset = strokeDasharray - (strokeDasharray * resultStats.scorePercent) / 100;

    return (
      <div className="max-w-4xl mx-auto px-4 py-8 lg:py-12 space-y-8">
        {/* Results Banner */}
        <section className="bg-card border border-border/60 rounded-[32px] p-6 lg:p-8 flex flex-col md:flex-row gap-8 relative overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 p-8 opacity-5 text-primary">
            <Award className="h-[120px] w-[120px]" />
          </div>
          
          <div className="flex-1 flex flex-col justify-center gap-4 relative z-10">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-4 py-1.5 rounded-full w-fit border border-emerald-500/20 text-xs font-bold uppercase tracking-wider">
              <CheckCircle2 className="h-4 w-4" />
              {t.completed}
            </div>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-primary">
              {t.excellent}
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
              {locale === "hi"
                ? "मौलिक अधिकारों और सामान्य ज्ञान पर आपकी पकड़ बहुत मजबूत हो रही है। अपनी तैयारी इसी तरह जारी रखें!"
                : "Your grip on constitutional and current updates is becoming solid. Keep this momentum going!"}
            </p>
            <div className="mt-2 flex flex-wrap gap-3">
              <Button
                onClick={() => handleStartQuiz(selectedQuiz)}
                className="bg-primary hover:bg-primary/95 text-white font-bold rounded-xl px-6 gap-2"
              >
                <RotateCcw className="h-4 w-4" /> Retake Quiz
              </Button>
              <Button
                variant="outline"
                onClick={() => setView("hub")}
                className="border-border hover:bg-muted font-bold rounded-xl px-6 text-foreground gap-1"
              >
                {t.backToHub}
              </Button>
            </div>
          </div>

          <div className="w-full md:w-72 bg-muted/40 rounded-3xl p-6 flex flex-col items-center justify-center text-center gap-3 border border-border/40">
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  className="text-muted/30"
                  cx="64"
                  cy="64"
                  fill="transparent"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                />
                <circle
                  className="text-primary"
                  cx="64"
                  cy="64"
                  fill="transparent"
                  r="56"
                  stroke="currentColor"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  strokeWidth="8"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black text-foreground">{resultStats.scorePercent}%</span>
                <span className="text-[9px] uppercase font-bold text-muted-foreground tracking-wider">{t.accuracy}</span>
              </div>
            </div>
            <div className="mt-2">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{t.level}</span>
              <h3 className="text-xl font-bold text-foreground">{t.pro}</h3>
            </div>
          </div>
        </section>

        {/* Quick Stats Bento */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-5 rounded-2xl border-border/50 flex flex-col gap-1.5 bg-card">
            <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            <span className="text-2xl font-black">{resultStats.correct}</span>
            <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider">{t.correct}</span>
          </Card>
          
          <Card className="p-5 rounded-2xl border-border/50 flex flex-col gap-1.5 bg-card">
            <XCircle className="h-5 w-5 text-destructive" />
            <span className="text-2xl font-black">{resultStats.wrong}</span>
            <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider">{t.wrong}</span>
          </Card>

          <Card className="p-5 rounded-2xl border-border/50 flex flex-col gap-1.5 bg-card">
            <HelpCircle className="h-5 w-5 text-muted-foreground" />
            <span className="text-2xl font-black">{resultStats.skipped}</span>
            <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider">{t.skipped}</span>
          </Card>

          <Card className="p-5 rounded-2xl border-border/50 flex flex-col gap-1.5 bg-card">
            <Timer className="h-5 w-5 text-primary" />
            <span className="text-2xl font-black">{resultStats.timeSpent}</span>
            <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider">{t.timeSpent}</span>
          </Card>
        </div>

        {/* Review Questions Breakdown */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">
            {locale === "hi" ? "उत्तर समीक्षा एवं स्पष्टीकरण" : "Question Review & Explanations"}
          </h2>

          <div className="space-y-6">
            {selectedQuiz.questions.map((q, idx) => {
              const userAns = answers[q.id];
              const isCorrect = userAns === q.correctAnswer;
              
              return (
                <Card key={q.id} className="p-6 border-border/60 shadow-sm space-y-6">
                  {/* Status header */}
                  <div className="flex justify-between items-center border-b border-border/30 pb-3">
                    <span className="font-bold text-xs text-primary font-mono tracking-widest uppercase">
                      {t.question} {idx + 1}
                    </span>
                    <div className="flex items-center gap-2">
                      {userAns ? (
                        isCorrect ? (
                          <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-xs font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                            <CheckCircle2 className="h-3.5 w-3.5" /> Correct
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-destructive text-xs font-bold bg-destructive/10 px-3 py-1 rounded-full border border-destructive/20">
                            <XCircle className="h-3.5 w-3.5" /> Incorrect
                          </span>
                        )
                      ) : (
                        <span className="flex items-center gap-1 text-muted-foreground text-xs font-bold bg-muted px-3 py-1 rounded-full">
                          <HelpCircle className="h-3.5 w-3.5" /> Skipped
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Question content */}
                  <div className="space-y-4">
                    <p className="text-base font-semibold leading-relaxed text-foreground">
                      {q.textEn}
                    </p>
                    <p className="text-base font-semibold leading-relaxed text-muted-foreground font-hindi-body">
                      {q.textHi}
                    </p>
                  </div>

                  {/* Options review */}
                  <div className="grid gap-2 text-sm pt-2">
                    {q.options.map((option) => {
                      const optionIsUser = userAns === option.key;
                      const optionIsCorrect = q.correctAnswer === option.key;

                      let optStyle = "border-border/60 hover:bg-muted/10";
                      if (optionIsCorrect) {
                        optStyle = "bg-emerald-500/10 border-emerald-500 text-emerald-900 dark:text-emerald-400 font-semibold";
                      } else if (optionIsUser) {
                        optStyle = "bg-destructive/10 border-destructive text-destructive font-semibold";
                      }

                      return (
                        <div
                          key={option.key}
                          className={cn(
                            "p-3.5 rounded-xl border flex items-center gap-3 transition-colors",
                            optStyle
                          )}
                        >
                          <div
                            className={cn(
                              "w-6.5 h-6.5 rounded-md flex items-center justify-center font-bold text-xs",
                              optionIsCorrect
                                ? "bg-emerald-600 text-white"
                                : optionIsUser
                                ? "bg-destructive text-white"
                                : "bg-muted text-muted-foreground"
                            )}
                          >
                            {option.key}
                          </div>
                          <div className="flex-1 flex flex-wrap gap-x-2 text-xs">
                            <span className="font-semibold text-foreground">{option.textEn}</span>
                            <span className="text-muted-foreground font-hindi-body">{option.textHi}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation box */}
                  <div className="bg-muted/30 rounded-2xl p-5 border border-border/40 space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1">
                      <BookOpen className="h-4 w-4" /> {t.explanation}
                    </h4>
                    <p className="text-xs leading-relaxed text-foreground/90 whitespace-pre-line">
                      {q.explanationEn}
                    </p>
                    <p className="text-xs leading-relaxed text-muted-foreground font-hindi-body whitespace-pre-line pt-2 border-t border-border/20">
                      {q.explanationHi}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
