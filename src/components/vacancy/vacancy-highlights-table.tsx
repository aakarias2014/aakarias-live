import { Calendar, Users, Award, BookOpen, Clock } from "lucide-react";
import type { ExamNotification } from "@/lib/content/types";

export function VacancyHighlightsTable({ notification, locale = "hi" }: { notification: ExamNotification; locale?: string }) {
  const isHi = locale === "hi";

  const formatDateSafe = (dateStr?: string, fallback: string = "-") => {
    if (!dateStr) return fallback;
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString(isHi ? "hi-IN" : "en-US", { year: "numeric", month: "long", day: "numeric" });
    } catch {
      return dateStr;
    }
  };

  const startDateText = notification.startDate
    ? formatDateSafe(notification.startDate)
    : (notification.date ? formatDateSafe(notification.date) : "-");

  const endDateText = notification.endDate
    ? formatDateSafe(notification.endDate)
    : (isHi ? "जल्द सूचित की जाएगी" : "To be notified soon");

  const items = [
    {
      icon: Users,
      label: isHi ? "कुल पदसंख्या (Total Posts)" : "Total Vacancies",
      value: notification.totalPosts || (isHi ? "आधिकारिक अधिसूचना देखें" : "See Official Notification"),
    },
    {
      icon: Award,
      label: isHi ? "आयु सीमा (Age Limit)" : "Age Limit",
      value: notification.ageLimit || (isHi ? "21 से 40 वर्ष (नियमानुसार छूट)" : "21 to 40 Years (As per rules)"),
    },
    {
      icon: BookOpen,
      label: isHi ? "शैक्षणिक योग्यता (Qualification)" : "Educational Qualification",
      value: notification.qualification || (isHi ? "मान्यता प्राप्त विश्वविद्यालय से स्नातक" : "Bachelor's Degree in any discipline"),
    },
    {
      icon: Calendar,
      label: isHi ? "आवेदन प्रारंभ तिथि (Start Date)" : "Apply Start Date",
      value: startDateText,
    },
    {
      icon: Clock,
      label: isHi ? "आवेदन की अंतिम तिथि (End Date)" : "Apply Last Date",
      value: endDateText,
    },
    {
      icon: Calendar,
      label: isHi ? "अनुमानित परीक्षा तिथि (Exam Date)" : "Expected Exam Date",
      value: notification.examDate || (isHi ? "आधिकारिक कैलेंडर देखें" : "Check Official Calendar"),
    },
  ];

  return (
    <div className="rounded-3xl border border-border/80 bg-card p-4 sm:p-6 shadow-soft space-y-4 my-6 w-full min-w-0 max-w-full overflow-hidden">
      <h3 className="text-base sm:text-lg font-bold text-foreground border-b border-border pb-3">
        {isHi ? "📋 भर्ती त्वरित अवलोकन (Quick Job Highlights)" : "📋 Quick Job Highlights"}
      </h3>

      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it, idx) => {
          const Icon = it.icon;
          return (
            <div key={idx} className="flex items-start gap-3 rounded-2xl bg-muted/40 p-3.5 sm:p-4 border border-border/40 min-w-0">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0 mt-0.5">
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] sm:text-xs font-semibold text-muted-foreground">{it.label}</p>
                <p className="text-xs sm:text-sm font-bold text-foreground mt-0.5 leading-snug break-words">{it.value}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
