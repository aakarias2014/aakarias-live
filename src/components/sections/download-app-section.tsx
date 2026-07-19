import Image from "next/image";
import Link from "next/link";
import { Smartphone, Star, Download, Shield, Zap, Monitor, Laptop } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/ui/animated-section";

interface DownloadAppSectionProps {
  locale?: "hi" | "en";
}

const content = {
  hi: {
    badge: "मोबाइल ऐप",
    title: "Aakar IAS App डाउनलोड करें",
    subtitle:
      "कभी भी, कहीं भी पढ़ाई करें। डेली करेंट अफेयर्स, फ्री PDF, वीडियो लेक्चर और टेस्ट — सब कुछ एक ऐप में।",
    features: [
      "डेली करेंट अफेयर्स नोटिफिकेशन",
      "ऑफलाइन वीडियो डाउनलोड",
      "फ्री PDF और नोट्स",
      "लाइव क्लास रिमाइंडर",
    ],
    rating: "4.8 ★ Rating",
    downloads: "1L+ Downloads",
    googlePlay: "Google Play",
    googlePlaySub: "GET IT ON",
    appStore: "App Store",
    appStoreSub: "Download on the",
    windows: "Windows",
    windowsSub: "Download for",
    macOS: "macOS",
    macOSSub: "Download for",
    downloadLink: "/download",
  },
  en: {
    badge: "Mobile App",
    title: "Download Aakar IAS App",
    subtitle:
      "Study anytime, anywhere. Daily current affairs, free PDFs, video lectures, and tests — all in one app.",
    features: [
      "Daily current affairs notifications",
      "Offline video downloads",
      "Free PDFs & notes",
      "Live class reminders",
    ],
    rating: "4.8 ★ Rating",
    downloads: "1L+ Downloads",
    googlePlay: "Google Play",
    googlePlaySub: "GET IT ON",
    appStore: "App Store",
    appStoreSub: "Download on the",
    windows: "Windows",
    windowsSub: "Download for",
    macOS: "macOS",
    macOSSub: "Download for",
    downloadLink: "/en/download",
  },
};

export function DownloadAppSection({ locale = "hi" }: DownloadAppSectionProps) {
  const t = content[locale];

  return (
    <Section className="py-0">
      <Container size="wide">
        <AnimatedSection variant="fade-up">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary/95 to-secondary text-white shadow-soft-lg">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(255,255,255,0.1)_0%,_transparent_50%)]" />
            <div className="absolute -right-16 -bottom-16 h-64 w-64 rounded-full bg-white/5" />
            <div className="absolute -left-8 -top-8 h-40 w-40 rounded-full bg-white/5" />

            <div className="relative z-10 grid items-center gap-8 p-8 sm:p-10 lg:grid-cols-12 lg:gap-12 lg:p-12">
              {/* Left content */}
              <div className="lg:col-span-7 space-y-5">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider backdrop-blur-sm">
                  <Smartphone className="h-3.5 w-3.5" />
                  {t.badge}
                </span>

                <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl font-devanagari">
                  {t.title}
                </h2>

                <p className="max-w-xl text-sm text-white/75 leading-relaxed sm:text-base font-devanagari">
                  {t.subtitle}
                </p>

                {/* Features grid */}
                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  {t.features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-xs font-medium text-white/90 sm:text-sm font-devanagari"
                    >
                      <div className="shrink-0 flex h-5 w-5 items-center justify-center rounded-full bg-white/15">
                        <Zap className="h-3 w-3" />
                      </div>
                      {feature}
                    </div>
                  ))}
                </div>

                 {/* Store buttons */}
                 <div className="flex flex-wrap items-center gap-3 pt-2">
                   <Link
                     href={t.downloadLink}
                     className="inline-flex items-center gap-2.5 rounded-xl bg-black/80 border border-white/10 px-5 py-3 text-white hover:bg-black transition-colors shadow-lg group"
                   >
                     <svg
                       viewBox="0 0 24 24"
                       className="h-6 w-6 fill-current"
                       aria-hidden="true"
                     >
                       <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302-2.302 2.302-2.625-2.302 2.625-2.302zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
                     </svg>
                     <span className="text-left leading-none">
                       <span className="block text-[9px] text-zinc-400 font-medium uppercase">
                         {t.googlePlaySub}
                       </span>
                       <span className="block text-sm font-bold mt-0.5">
                         {t.googlePlay}
                       </span>
                     </span>
                   </Link>
 
                   <Link
                     href={t.downloadLink}
                     className="inline-flex items-center gap-2.5 rounded-xl bg-black/80 border border-white/10 px-5 py-3 text-white hover:bg-black transition-colors shadow-lg group"
                   >
                     <svg
                       viewBox="0 0 24 24"
                       className="h-6 w-6 fill-current"
                       aria-hidden="true"
                     >
                       <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                     </svg>
                     <span className="text-left leading-none">
                       <span className="block text-[9px] text-zinc-400 font-medium uppercase">
                         {t.appStoreSub}
                       </span>
                       <span className="block text-sm font-bold mt-0.5">
                         {t.appStore}
                       </span>
                     </span>
                   </Link>

                   <Link
                     href={t.downloadLink}
                     className="inline-flex items-center gap-2.5 rounded-xl bg-black/80 border border-white/10 px-5 py-3 text-white hover:bg-black transition-colors shadow-lg group"
                   >
                     <Monitor className="h-6 w-6 text-zinc-400 group-hover:text-white transition-colors" />
                     <span className="text-left leading-none">
                       <span className="block text-[9px] text-zinc-400 font-medium uppercase">
                         {t.windowsSub}
                       </span>
                       <span className="block text-sm font-bold mt-0.5">
                         {t.windows}
                       </span>
                     </span>
                   </Link>

                   <Link
                     href={t.downloadLink}
                     className="inline-flex items-center gap-2.5 rounded-xl bg-black/80 border border-white/10 px-5 py-3 text-white hover:bg-black transition-colors shadow-lg group"
                   >
                     <Laptop className="h-6 w-6 text-zinc-400 group-hover:text-white transition-colors" />
                     <span className="text-left leading-none">
                       <span className="block text-[9px] text-zinc-400 font-medium uppercase">
                         {t.macOSSub}
                       </span>
                       <span className="block text-sm font-bold mt-0.5">
                         {t.macOS}
                       </span>
                     </span>
                   </Link>
                 </div>

                {/* Stats badges */}
                <div className="flex items-center gap-4 pt-1">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-white/80">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    {t.rating}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-white/80">
                    <Download className="h-3.5 w-3.5" />
                    {t.downloads}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-white/80">
                    <Shield className="h-3.5 w-3.5" />
                    Free
                  </span>
                </div>
              </div>

              {/* Right: Phone mockup */}
              <div className="hidden lg:flex lg:col-span-5 justify-center">
                <div className="relative">
                  {/* Phone frame */}
                  <div className="relative h-[340px] w-[170px] rounded-[28px] bg-zinc-900 border-[3px] border-zinc-700 shadow-2xl overflow-hidden">
                    {/* Screen content */}
                    <div className="absolute inset-[3px] rounded-[24px] overflow-hidden bg-black">
                      <div className="relative w-full h-full">
                        <Image
                          src="/images/app-screen-1.webp"
                          alt="Aakar IAS App Preview"
                          fill
                          className="object-cover object-top"
                          sizes="170px"
                        />
                      </div>
                    </div>
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 h-5 w-16 rounded-b-2xl bg-zinc-900" />
                  </div>
                  {/* Glow effect behind phone */}
                  <div className="absolute -inset-8 rounded-full bg-white/5 blur-3xl -z-10" />
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </Container>
    </Section>
  );
}
