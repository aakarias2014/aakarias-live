import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, GraduationCap, Sparkles, BookOpen, AlertCircle } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo/metadata";

export const revalidate = 86400; // Cache for 24h since it's static placeholder

const ONE_DAY_EXAMS: Record<string, { title: string; desc: string }> = {
  mpsi: {
    title: "MPSI (MP Sub Inspector)",
    desc: "मध्य प्रदेश सब-इंस्पेक्टर परीक्षा की सर्वोत्तम तैयारी के लिए अध्ययन सामग्री, लाइव कोर्सेज और मॉक टेस्ट।",
  },
  "mp-constable": {
    title: "MP पुलिस कांस्टेबल (MP Constable)",
    desc: "मध्य प्रदेश पुलिस आरक्षक भर्ती परीक्षा हेतु विस्तृत सिलेबस, वीडियो लेक्चर्स और महत्वपूर्ण परीक्षा गाइड।",
  },
  mptet: {
    title: "MPTET (शिक्षक पात्रता परीक्षा)",
    desc: "मध्य प्रदेश शिक्षक पात्रता परीक्षा (वर्ग 1, 2 और 3) के लिए व्यवस्थित कोर्सेज और विषय-वार मॉक टेस्ट।",
  },
  ssc: {
    title: "SSC (CGL, CHSL, MTS, GD)",
    desc: "कर्मचारी चयन आयोग (SSC) की विभिन्न परीक्षाओं के लिए नवीनतम पैटर्न पर आधारित ऑनलाइन टेस्ट और क्लासेस।",
  },
  railway: {
    title: "रेलवे भर्ती परीक्षा (Railway Exams)",
    desc: "RRB NTPC, Group D, ALP और अन्य रेलवे भर्ती परीक्षाओं के लिए संपूर्ण अध्ययन नोट्स एवं पीवाईक्यू।",
  },
  banking: {
    title: "बैंकिंग परीक्षा (Banking Exams)",
    desc: "IBPS, SBI, RBI PO और क्लर्क परीक्षाओं के लिए मैथ, रीजनिंग, इंग्लिश और बैंकिंग अवेयरनेस स्पेशल।",
  },
  "esb-exams": {
    title: "ESB एग्जाम्स (MP Vyapam)",
    desc: "कर्मचारी चयन मंडल (ESB/व्यापम) द्वारा आयोजित विभिन्न प्रतियोगी परीक्षाओं की सटीक एवं केंद्रित अध्ययन सामग्री।",
  },
  "other-govt-exams": {
    title: "अन्य सरकारी परीक्षाएं (Other Govt. Exams)",
    desc: "विभिन्न राज्य एवं केंद्रीय स्तर की सरकारी परीक्षाओं के लिए विस्तृत रणनीति और परीक्षा-केंद्रित कोर्सेज।",
  },
};

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(ONE_DAY_EXAMS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const exam = ONE_DAY_EXAMS[slug];
  if (!exam) return buildMetadata();

  return buildMetadata({
    title: `${exam.title} परीक्षा तैयारी | Aakar IAS`,
    description: `${exam.desc} यह कोर्स/पेज वर्तमान में तैयार किया जा रहा है और जल्द ही लाइव होगा।`,
    path: `/one-day-exam/${slug}`,
    locale: "hi",
  });
}

export default async function OneDayExamPage({ params }: Props) {
  const { slug } = await params;
  const exam = ONE_DAY_EXAMS[slug];

  if (!exam) {
    notFound();
  }

  return (
    <Section className="min-h-[80vh] flex items-center justify-center relative overflow-hidden bg-background">
      {/* Dynamic Ambient Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-primary/10 to-accent/5 rounded-full blur-3xl opacity-60 pointer-events-none" />

      <Container size="narrow" className="relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-xs mb-6 uppercase tracking-wider animate-pulse">
          <Sparkles className="h-3.5 w-3.5" />
          <span>जल्द आ रहा है (Coming Soon)</span>
        </div>

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/5 border border-border/80 shadow-soft mb-8">
          <GraduationCap className="h-10 w-10 text-primary" />
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl font-devanagari leading-tight">
          {exam.title}
        </h1>

        <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto font-devanagari">
          {exam.desc}
        </p>

        {/* Coming Soon Premium Info Block */}
        <div className="mt-10 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-md p-6 max-w-md mx-auto text-left flex gap-4 shadow-soft">
          <div className="h-10 w-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
            <Clock className="h-5 w-5 animate-spin-slow" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-foreground">कार्य प्रगति पर है</h3>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
              इस परीक्षा से संबंधित उच्च गुणवत्तापूर्ण लाइव क्लासेज, नोट्स, टेस्ट सीरीज और अध्ययन सामग्री वर्तमान में हमारे विशेषज्ञों द्वारा तैयार की जा रही है।
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button size="lg" className="rounded-full shadow-soft" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" /> मुख्य पृष्ठ पर जाएं
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="rounded-full" asChild>
            <Link href="/online-courses">
              <BookOpen className="mr-2 h-4 w-4 text-primary" /> हमारे उपलब्ध कोर्सेज
            </Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
