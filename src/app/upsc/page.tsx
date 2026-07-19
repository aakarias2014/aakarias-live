import Link from "next/link";
import { ArrowLeft, Clock, Sparkles, BookOpen, Calendar, HelpCircle } from "lucide-react";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = buildMetadata({
  title: "यूपीएससी सिविल सेवा परीक्षा (UPSC CSE) - शीघ्र आ रहा है | आकार आईएएस",
  description: "आकार आईएएस यूपीएससी सिविल सेवा परीक्षा (UPSC CSE) के लिए उच्च गुणवत्ता वाले अध्ययन संसाधन, दैनिक करेंट अफेयर्स, नोट्स और टेस्ट सीरीज लेकर आ रहा है।",
  path: "/upsc",
});

export default function UpscComingSoonPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-muted/10 relative overflow-hidden py-16 sm:py-24">
      {/* Background blobs for premium glassmorphic feel */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

      <Container size="narrow" className="relative z-10 text-center space-y-8 px-4">
        {/* Animated Badge */}
        <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 text-primary px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider animate-pulse">
          <Sparkles className="h-4 w-4" />
          शीघ्र आ रहा है | Coming Soon
        </div>

        {/* Hero Title */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tight leading-none">
            UPSC <span className="text-primary">सिविल सेवा</span>
          </h1>
          <p className="text-lg sm:text-xl font-bold text-muted-foreground">
            संघ लोक सेवा आयोग (UPSC CSE) तैयारी केंद्र
          </p>
        </div>

        {/* Glassmorphic card */}
        <div className="bg-card/70 border border-border/80 rounded-3xl p-6 sm:p-10 shadow-soft-lg backdrop-blur-md space-y-6">
          <p className="text-base text-muted-foreground leading-relaxed">
            हम आपके लिए यूपीएससी सिविल सेवा परीक्षा की सर्वोत्कृष्ट तैयारी के लिए प्रीमियम अध्ययन सामग्री, उच्च स्तरीय विश्लेषण (Editorials), दैनिक समाचार विश्लेषण (Current Affairs) और टेस्ट सीरीज तैयार कर रहे हैं।
          </p>

          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
            <div className="flex items-center gap-2 p-3 bg-muted/30 border border-border/40 rounded-xl">
              <BookOpen className="h-5 w-5 text-primary" />
              <span className="text-xs font-bold text-foreground">प्रीमियम नोट्स</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-muted/30 border border-border/40 rounded-xl">
              <Calendar className="h-5 w-5 text-primary" />
              <span className="text-xs font-bold text-foreground">दैनिक विश्लेषण</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-muted/30 border border-border/40 rounded-xl">
              <HelpCircle className="h-5 w-5 text-primary" />
              <span className="text-xs font-bold text-foreground">PYQ बैंक</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-muted/30 border border-border/40 rounded-xl">
              <Clock className="h-5 w-5 text-primary" />
              <span className="text-xs font-bold text-foreground">टेस्ट सीरीज</span>
            </div>
          </div>
        </div>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" className="rounded-xl w-full sm:w-auto shadow-lg shadow-primary/20" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-5 w-5" />
              मुख्य पृष्ठ पर जाएं
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="rounded-xl w-full sm:w-auto" asChild>
            <Link href="/mppsc/syllabus-2026">
              एमपीपीएससी सिलेबस देखें
            </Link>
          </Button>
        </div>
      </Container>
    </div>
  );
}
