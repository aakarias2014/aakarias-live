"use client";

import { useState, useTransition } from "react";
import { signOut } from "@/actions/auth";
import { toggleBookmark, updateTargetExam } from "@/actions/user";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, Bookmark, BookOpen, GraduationCap, Trophy, Calendar, ExternalLink, Trash2, CheckCircle2, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { formatDate } from "@/lib/seo/metadata";

interface BookmarkItem {
  id: string;
  article_id: string;
  title: string;
  slug: string;
  type: string;
  locale: "hi" | "en";
  created_at: string;
}

interface QuizLogItem {
  id: string;
  article_slug: string;
  score: number;
  total: number;
  created_at: string;
}

interface DashboardContainerProps {
  user: { email?: string; id: string };
  profile: { full_name?: string | null; target_exam?: "UPSC" | "MPPSC" | "Both" } | null;
  bookmarks: BookmarkItem[];
  quizzes: QuizLogItem[];
  locale: "hi" | "en";
}

export function DashboardContainer({ user, profile, bookmarks: initialBookmarks, quizzes, locale }: DashboardContainerProps) {
  const [activeTab, setActiveTab] = useState<"bookmarks" | "quizzes">("bookmarks");
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>(initialBookmarks);
  const [examState, setExamState] = useState<"UPSC" | "MPPSC" | "Both">(profile?.target_exam || "Both");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const labels = {
    hi: {
      logout: "लॉगआउट",
      welcome: "नमस्ते,",
      targetLabel: "आपका लक्ष्य (Target Exam):",
      tabBookmarks: "बुकमार्क लेख",
      tabQuizzes: "क्विज़ इतिहास",
      noBookmarks: "कोई बुकमार्क लेख नहीं मिला।",
      noQuizzes: "आपने अभी तक कोई क्विज़ नहीं दिया है।",
      readBtn: "पढ़ें",
      deleteBtn: "हटाएं",
      score: "अंक",
      accuracy: "सटीकता",
      attempted: "दिनांक",
      article: "लेख (Article)",
    },
    en: {
      logout: "Sign Out",
      welcome: "Welcome,",
      targetLabel: "Target Exam:",
      tabBookmarks: "Bookmarked Articles",
      tabQuizzes: "Quiz History",
      noBookmarks: "No bookmarked articles found.",
      noQuizzes: "You have not attempted any quizzes yet.",
      readBtn: "Read",
      deleteBtn: "Remove",
      score: "Score",
      accuracy: "Accuracy",
      attempted: "Date Attempted",
      article: "Article",
    },
  }[locale];

  const handleSignOut = async () => {
    await signOut();
    router.push(locale === "hi" ? "/login" : "/en/login");
    router.refresh();
  };

  const handleExamChange = (val: "UPSC" | "MPPSC" | "Both") => {
    setExamState(val);
    startTransition(async () => {
      await updateTargetExam(val);
    });
  };

  const handleDeleteBookmark = async (articleId: string) => {
    setBookmarks(bookmarks.filter((b) => b.article_id !== articleId));
    await toggleBookmark(articleId, "", "", "", "");
  };

  return (
    <div className="space-y-8">
      {/* Top Welcome Panel */}
      <div className="rounded-3xl border border-border bg-card p-6 shadow-soft md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold text-xl">
            {profile?.full_name?.charAt(0).toUpperCase() || "S"}
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground flex items-center gap-1.5">
              {labels.welcome} {profile?.full_name || "Student"}
            </h2>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold text-muted-foreground">{labels.targetLabel}</span>
            <select
              value={examState}
              disabled={isPending}
              onChange={(e) => handleExamChange(e.target.value as any)}
              className="h-9 rounded-full border border-input bg-background px-3 py-1 text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="Both">Both UPSC & MPPSC</option>
              <option value="UPSC">UPSC CSE Only</option>
              <option value="MPPSC">MPPSC Only</option>
            </select>
          </div>

          <Button variant="ghost" size="sm" onClick={handleSignOut} className="rounded-full hover:bg-destructive/10 hover:text-destructive ml-auto md:ml-0">
            <LogOut className="h-4 w-4 mr-1.5" />
            {labels.logout}
          </Button>
        </div>
      </div>

      {/* Main Tab Workspace */}
      <div className="space-y-6">
        <div className="border-b border-border flex gap-4">
          <button
            onClick={() => setActiveTab("bookmarks")}
            className={`flex items-center gap-2 pb-3 font-semibold text-sm transition-all border-b-2 relative ${
              activeTab === "bookmarks" ? "text-primary border-primary" : "text-muted-foreground border-transparent"
            }`}
          >
            <Bookmark className="h-4 w-4" />
            {labels.tabBookmarks}
            <span className="inline-flex h-5 items-center justify-center rounded-full bg-primary/10 px-2 text-xs font-bold text-primary">
              {bookmarks.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab("quizzes")}
            className={`flex items-center gap-2 pb-3 font-semibold text-sm transition-all border-b-2 relative ${
              activeTab === "quizzes" ? "text-primary border-primary" : "text-muted-foreground border-transparent"
            }`}
          >
            <Trophy className="h-4 w-4" />
            {labels.tabQuizzes}
            <span className="inline-flex h-5 items-center justify-center rounded-full bg-primary/10 px-2 text-xs font-bold text-primary">
              {quizzes.length}
            </span>
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "bookmarks" ? (
            <motion.div
              key="bookmarks"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {bookmarks.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  {bookmarks.map((bookmark) => {
                    const articleHref = bookmark.locale === "hi"
                      ? `/${bookmark.type === "editorial" ? "editorial" : "current-affairs"}/${bookmark.slug}`
                      : `/en/${bookmark.type === "editorial" ? "editorial" : "current-affairs"}/${bookmark.slug}`;

                    return (
                      <div
                        key={bookmark.id}
                        className="rounded-2xl border border-border bg-card p-5 shadow-soft flex flex-col justify-between hover:shadow-soft-lg transition-all"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                              {bookmark.type === "editorial" ? "Editorial" : "Current Affairs"}
                            </span>
                            <span className="text-[10px] font-semibold text-muted-foreground uppercase">
                              {bookmark.locale}
                            </span>
                          </div>
                          <h3 className="font-bold text-foreground leading-snug line-clamp-2">
                            {bookmark.title}
                          </h3>
                        </div>

                        <div className="mt-4 flex items-center justify-between border-t border-border/40 pt-3">
                          <Button size="sm" variant="ghost" className="rounded-full hover:bg-destructive/10 hover:text-destructive" onClick={() => handleDeleteBookmark(bookmark.article_id)}>
                            <Trash2 className="h-3.5 w-3.5 mr-1" />
                            {labels.deleteBtn}
                          </Button>

                          <Button size="sm" asChild className="rounded-full">
                            <Link href={articleHref}>
                              {labels.readBtn} <ChevronRight className="h-3.5 w-3.5 ml-1" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-border rounded-3xl p-8 bg-card shadow-soft">
                  <Bookmark className="h-10 w-10 text-muted-foreground mb-3 opacity-60" />
                  <p className="font-semibold text-foreground">{labels.noBookmarks}</p>
                  <p className="text-sm text-muted-foreground mt-1 max-w-sm">
                    {locale === "hi"
                      ? "जब आप लेख पढ़ते हैं, तो उन्हें यहाँ सहेजने के लिए बुकमार्क बटन पर क्लिक करें।"
                      : "When reading articles, click the bookmark button to save them here for revision."}
                  </p>
                  <Button asChild className="mt-4 rounded-full" size="sm">
                    <Link href={locale === "hi" ? "/current-affairs" : "/en/current-affairs"}>Browse Current Affairs</Link>
                  </Button>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="quizzes"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {quizzes.length > 0 ? (
                <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-border bg-muted/40">
                          <th className="p-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">{labels.article}</th>
                          <th className="p-4 text-xs font-bold uppercase tracking-wider text-muted-foreground text-center">{labels.score}</th>
                          <th className="p-4 text-xs font-bold uppercase tracking-wider text-muted-foreground text-center">{labels.accuracy}</th>
                          <th className="p-4 text-xs font-bold uppercase tracking-wider text-muted-foreground text-right">{labels.attempted}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/40 text-sm">
                        {quizzes.map((quiz) => {
                          const percentage = Math.round((quiz.score / quiz.total) * 100);
                          const formattedSlug = quiz.article_slug
                            .split("-")
                            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                            .join(" ");

                          return (
                            <tr key={quiz.id} className="hover:bg-muted/10 transition-colors">
                              <td className="p-4 font-semibold text-foreground">
                                <Link href={locale === "hi" ? `/current-affairs/${quiz.article_slug}` : `/en/current-affairs/${quiz.article_slug}`} className="hover:text-primary flex items-center gap-1.5">
                                  {formattedSlug}
                                  <ExternalLink className="h-3 w-3" />
                                </Link>
                              </td>
                              <td className="p-4 text-center font-bold text-foreground">
                                {quiz.score} / {quiz.total}
                              </td>
                              <td className="p-4 text-center">
                                <span
                                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                                    percentage >= 80
                                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                      : percentage >= 50
                                        ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                                        : "bg-destructive/10 text-destructive"
                                  }`}
                                >
                                  {percentage >= 80 && <CheckCircle2 className="h-3 w-3" />}
                                  {percentage}%
                                </span>
                              </td>
                              <td className="p-4 text-right text-muted-foreground">
                                <span className="inline-flex items-center gap-1.5">
                                  <Calendar className="h-3.5 w-3.5" />
                                  {formatDate(quiz.created_at, locale)}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-border rounded-3xl p-8 bg-card shadow-soft">
                  <Trophy className="h-10 w-10 text-muted-foreground mb-3 opacity-60" />
                  <p className="font-semibold text-foreground">{labels.noQuizzes}</p>
                  <p className="text-sm text-muted-foreground mt-1 max-w-sm">
                    {locale === "hi"
                      ? "करेंट अफेयर्स लेखों के अंत में दिए गए अभ्यास बहुविकल्पीय प्रश्नों (MCQs) का उत्तर दें और अपना रिकॉर्ड यहाँ देखें।"
                      : "Attempt practice MCQs at the end of current affairs articles to log your score here."}
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
