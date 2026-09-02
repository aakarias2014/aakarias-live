import Image from "next/image";
import { GraduationCap, CheckCircle2, Sparkles, ExternalLink, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MpsiPaidCourseBannerProps {
  variant?: "full" | "sidebar";
  locale?: string;
}

export function MpsiPaidCourseBanner({ variant = "full", locale = "hi" }: MpsiPaidCourseBannerProps) {
  const isHi = locale === "hi";

  const courseUrl = "https://aakaronedayexams.akamai.net.in/new-courses/11-mpsi-pre-cum-mains-online-live-batch-";
  const thumbnailUrl = "https://appx-content-v2.classx.co.in/paid_course3/2026-09-01-0_37453317742714365.png";

  if (variant === "sidebar") {
    return (
      <div className="rounded-3xl border border-primary/30 bg-card p-5 shadow-soft space-y-4 text-left">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-wider">
            <GraduationCap className="h-4 w-4 shrink-0" />
            {isHi ? "लाइव ऑनलाइन बैच" : "Live Online Batch"}
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-extrabold text-white uppercase shadow-xs">
            <Zap className="h-3 w-3 fill-current" /> Live
          </span>
        </div>

        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-sky-300 dark:border-sky-800 shadow-sm">
          <Image
            src={thumbnailUrl}
            alt="MPSI Pre Cum Mains 2026 Online Live Batch - Aakar IAS"
            fill
            className="object-cover"
            unoptimized
          />
        </div>

        <div className="space-y-2">
          <h4 className="font-extrabold text-foreground text-sm leading-snug">
            {isHi ? "MPSI Pre 2026 Target ऑनलाइन लाइव बैच" : "MPSI Pre 2026 Target Online Live Batch"}
          </h4>

          <div className="space-y-1 text-xs font-medium text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
              <span>{isHi ? "लाइव + रिकॉर्डेड लेक्चर्स" : "Live + Recorded Lectures"}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
              <span>{isHi ? "हस्तलिखित ई-नोट्स व टेस्ट सीरीज" : "Handwritten E-Notes & Tests"}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
              <span>{isHi ? "वैधता: परीक्षा तक (Until Exam)" : "Validity: Until Exam"}</span>
            </div>
          </div>
        </div>

        <div className="pt-1">
          <Button className="w-full rounded-full bg-primary hover:bg-primary/95 text-white font-extrabold gap-2 py-4 text-xs shadow-md" asChild>
            <a href={courseUrl} target="_blank" rel="noopener noreferrer">
              {isHi ? "अभी प्रवेश लें (Join Live Batch)" : "Enroll Now (Join Live Batch)"} <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="my-8 rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 via-card to-accent/10 p-5 sm:p-7 shadow-soft-xl relative w-full overflow-hidden text-left">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Banner Thumbnail Image */}
        <div className="lg:col-span-5 relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-sky-300 dark:border-sky-800 shadow-md">
          <Image
            src={thumbnailUrl}
            alt="MPSI Pre Cum Mains 2026 Online Live Batch Banner - Aakar IAS"
            fill
            className="object-cover"
            unoptimized
          />
          <span className="absolute top-2 left-2 inline-flex items-center gap-1 rounded-full bg-red-600 px-2.5 py-0.5 text-[10px] font-extrabold text-white uppercase shadow-md">
            <Sparkles className="h-3 w-3 fill-current" /> {isHi ? "स्पेशल ऑफर ₹299/-" : "Special Offer ₹299/-"}
          </span>
        </div>

        {/* Course Info & CTA */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-widest">
            <GraduationCap className="h-4 w-4 shrink-0" />
            {isHi ? "आकार आईएएस आधिकारिक MPSI ऑनलाइन लाइव बैच" : "Aakar IAS Official MPSI Live Batch"}
          </div>

          <h3 className="text-lg sm:text-xl font-extrabold text-foreground leading-snug">
            {isHi ? "MPSI Pre 2026 Target ऑनलाइन लाइव बैच (507 पद)" : "MPSI Pre 2026 Target Online Live Batch (507 Posts)"}
          </h3>

          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {isHi
              ? "मध्य प्रदेश उप निरीक्षक एवं सूबेदार भर्ती (507 पद) हेतु 100% नवीन पाठ्यक्रम पर आधारित सम्पूर्ण ऑनलाइन तैयारी कोर्स।"
              : "Complete online preparation course for MP Police Sub-Inspector & Subedar (507 posts) based on latest syllabus."}
          </p>

          <div className="flex flex-wrap gap-2 text-xs font-semibold text-foreground/80 pt-1">
            <span className="flex items-center gap-1 bg-background/90 px-2.5 py-1 rounded-lg border border-border/60">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
              {isHi ? "लाइव + HD रिकॉर्डेड लेक्चर्स" : "Live + HD Recorded Classes"}
            </span>
            <span className="flex items-center gap-1 bg-background/90 px-2.5 py-1 rounded-lg border border-border/60">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
              {isHi ? "हस्तलिखित नोट्स व स्पेशल टेस्ट सीरीज" : "Handwritten Notes & Special Tests"}
            </span>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Button className="w-full sm:w-auto rounded-full bg-primary hover:bg-primary/95 text-white font-extrabold gap-2 px-6 py-4 text-xs sm:text-sm shadow-md" asChild>
              <a href={courseUrl} target="_blank" rel="noopener noreferrer">
                {isHi ? "बैच में प्रवेश लें (Join Online Batch)" : "Join Online Live Batch"} <ExternalLink className="h-4 w-4 shrink-0" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
