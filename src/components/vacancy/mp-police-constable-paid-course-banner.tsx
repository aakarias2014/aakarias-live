import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2, Award } from "lucide-react";
import Link from "next/link";

interface MpPoliceConstablePaidCourseBannerProps {
  variant?: "full" | "sidebar";
  locale?: string;
}

export function MpPoliceConstablePaidCourseBanner({
  variant = "full",
  locale = "hi",
}: MpPoliceConstablePaidCourseBannerProps) {
  const isHi = locale === "hi";

  if (variant === "sidebar") {
    return (
      <div className="rounded-3xl border border-sky-400/40 bg-gradient-to-br from-sky-500/10 via-primary/10 to-indigo-500/10 p-6 shadow-soft space-y-4 relative overflow-hidden">
        <div className="flex items-center gap-2">
          <Badge className="bg-primary text-white font-extrabold text-[10px] uppercase px-2.5 py-0.5">
            {isHi ? "MP Police Constable 2026 स्पेशल बैच" : "Constable Special Target Batch"}
          </Badge>
        </div>

        <h4 className="font-extrabold text-foreground text-lg leading-tight">
          {isHi ? "MP Police Constable 2026 ऑनलाइन टारगेट बैच" : "MP Police Constable 2026 Online Target Batch"}
        </h4>

        <p className="text-xs text-muted-foreground leading-relaxed">
          {isHi
            ? "7,500 पदों पर सफलता हेतु आकार IAS द्वारा विशेष रूप से तैयार 100% सिलेबस ओरिएंटेड लाइव बैच, मॉक टेस्ट व नोट्स।"
            : "Complete coverage for 7,500 posts with daily live classes, test series & expert study notes."}
        </p>

        <div className="space-y-2 pt-1 text-xs font-semibold text-foreground">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
            <span>{isHi ? "100 अंक संपूर्ण लिखित परीक्षा तैयारी" : "100 Marks Complete Exam Coverage"}</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
            <span>{isHi ? "MP GK + गणित + रीजनिंग + विज्ञान" : "MP GK + Maths + Reasoning + Science"}</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
            <span>{isHi ? "फ्री टेस्ट सीरीज व फिजिकल गाइडेंस" : "Free Test Series & Physical Guidance"}</span>
          </div>
        </div>

        <Button className="w-full rounded-full bg-primary hover:bg-primary/90 text-white font-extrabold text-xs shadow-md gap-1.5 py-5 mt-2" asChild>
          <a href="https://aakaronedayexams.akamai.net.in/new-courses/7-mp-police-constable" target="_blank" rel="noopener noreferrer">
            {isHi ? "बैच में प्रवेश लें (Join Batch)" : "Enroll Now"} <ArrowRight className="h-4 w-4" />
          </a>
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-sky-400/30 bg-gradient-to-r from-sky-600/10 via-primary/10 to-indigo-600/10 p-6 sm:p-8 shadow-soft my-8 space-y-6 relative overflow-hidden">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 border border-primary/30 text-primary font-bold text-xs">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{isHi ? "MP Police Constable 7,500 पद लक्ष्य बैच 2026" : "MP Police Constable 7,500 Vacancies Batch 2026"}</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-foreground tracking-tight leading-snug">
            {isHi ? "MP Police Constable 2026 Online Target Batch" : "MP Police Constable 2026 Online Target Batch"}
          </h3>

          <p className="text-sm text-muted-foreground leading-relaxed">
            {isHi
              ? "आकार IAS के अनुभवी संकाय सदस्यों द्वारा मध्य प्रदेश पुलिस आरक्षक भर्ती हेतु लाइव क्लासेस, टॉपिक-वाइज टेस्ट सीरीज, MP GK स्पेशल नोट्स तथा 100 प्रश्नों के मॉडल पेपर उपलब्ध हैं।"
              : "Comprehensive preparation package including Live Classes, Topic Tests, MP GK Notes & Full Length Test Series designed by Aakar IAS experts."}
          </p>
        </div>

        <div className="w-full md:w-auto shrink-0 flex flex-col sm:flex-row md:flex-col gap-3">
          <Button className="w-full rounded-full bg-primary hover:bg-primary/95 text-white font-extrabold text-sm gap-2 px-6 py-6 shadow-md text-center" asChild>
            <a href="https://aakaronedayexams.akamai.net.in/new-courses/7-mp-police-constable" target="_blank" rel="noopener noreferrer">
              {isHi ? "बैच में प्रवेश लें (Join Batch)" : "Explore Course & Join"} <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}

function Badge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center rounded-full text-xs font-semibold ${className}`}>
      {children}
    </span>
  );
}
