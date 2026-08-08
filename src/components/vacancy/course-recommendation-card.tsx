import Link from "next/link";
import { GraduationCap, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CourseRecommendationCardProps {
  course?: {
    id: string;
    slug: string;
    title: string;
    description?: string;
    price?: number;
    originalPrice?: number;
    badgeHi?: string;
    badgeEn?: string;
  };
  examCategory?: string;
  locale?: string;
}

export function CourseRecommendationCard({ course, examCategory = "MPPSC", locale = "hi" }: CourseRecommendationCardProps) {
  const isHi = locale === "hi";

  // Fallback defaults if no specific course reference is linked in Sanity
  const title = course?.title || (
    examCategory === "UPSC"
      ? (isHi ? "UPSC CSE 2026-27 प्री + मेन्स फाउंडेशन बैच" : "UPSC CSE 2026-27 Pre + Mains Foundation Batch")
      : (isHi ? "MPPSC Mains 2026 स्पेशल टारगेट एवं टेस्ट सीरीज बैच" : "MPPSC Mains 2026 Special Target & Test Series Batch")
  );

  const courseHref = course?.slug
    ? (isHi ? `/online-courses/${course.slug}` : `/en/online-courses/${course.slug}`)
    : (isHi ? "/online-courses" : "/en/online-courses");

  const badge = course?.badgeHi || (isHi ? "प्रवेश प्रारंभ (Admissions Open)" : "Admissions Open");

  return (
    <div className="my-8 rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 via-background to-accent/10 p-5 sm:p-8 shadow-soft-xl relative w-full min-w-0 max-w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-xl min-w-0">
          <div className="flex items-center justify-between gap-2 flex-wrap pb-1">
            <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-widest">
              <GraduationCap className="h-4 w-4 shrink-0" />
              {isHi ? "अनुशंसित ऑनलाइन/ऑफलाइन बैच" : "Recommended Course / Batch"}
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-[11px] font-extrabold text-primary-foreground shadow-xs uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5 shrink-0" /> {badge}
            </span>
          </div>

          <h3 className="text-lg sm:text-2xl font-extrabold text-foreground leading-tight tracking-tight">
            {title}
          </h3>

          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {course?.description || (
              isHi
                ? "नवीनतम पाठ्यक्रम के अनुसार अनुभवी संकाय (Faculty) द्वारा लाइव क्लासेस, हस्तलिखित नोट्स व मॉडल उत्तर पुस्तिकाएं।"
                : "Live interactive classes, handwritten study notes & model answer copies by expert faculty."
            )}
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-2.5 sm:gap-4 text-xs font-semibold text-foreground/80 pt-1">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
              {isHi ? "लाइव + रिकॉर्डेड लेक्चर्स" : "Live + Recorded Lectures"}
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
              {isHi ? "हस्तलिखित नोट्स व मॉडल आंसर" : "Handwritten Notes & Model Answers"}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-stretch sm:items-start md:items-end justify-center shrink-0 border-t md:border-t-0 md:border-l border-border/60 pt-4 md:pt-0 md:pl-6 space-y-3 w-full md:w-auto">
          {course?.price ? (
            <div>
              <span className="text-xl sm:text-3xl font-extrabold text-primary">₹{course.price.toLocaleString()}</span>
              {course.originalPrice && (
                <span className="ml-2 text-xs sm:text-sm text-muted-foreground line-through">₹{course.originalPrice.toLocaleString()}</span>
              )}
            </div>
          ) : (
            <div className="text-xs font-bold text-muted-foreground">
              {isHi ? "सीमित सीटें उपलब्ध" : "Limited Seats Available"}
            </div>
          )}

          <Button className="w-full sm:w-auto rounded-full bg-primary hover:bg-primary/95 text-white font-bold gap-2 px-6 py-4 text-xs sm:text-sm shadow-md transition-all hover:scale-105" asChild>
            <Link href={courseHref}>
              {isHi ? "कोर्स विवरण देखें" : "View Course Details"} <ArrowRight className="h-4 w-4 shrink-0" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
