import Image from "next/image";
import Link from "next/link";
import { Smartphone, Star, Download, Zap, Monitor, Laptop } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { AnimatedSection } from "@/components/ui/animated-section";

interface DownloadAppSectionProps {
  locale?: "hi" | "en";
}

const content = {
  hi: {
    badge: "ऑफिशियल मोबाइल ऐप",
    title: "Aakar IAS App डाउनलोड करें",
    subtitle:
      "कभी भी, कहीं भी पढ़ाई करें। डेली करेंट अफेयर्स, फ्री PDF, वीडियो लेक्चर और टेस्ट — सब कुछ एक ऐप में।",
    features: [
      "डेली करेंट अफेयर्स",
      "ऑफलाइन वीडियो",
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
    badge: "Official Mobile App",
    title: "Download Aakar IAS App",
    subtitle:
      "Study anytime, anywhere. Daily current affairs, free PDFs, video lectures, and tests — all in one app.",
    features: [
      "Daily current affairs",
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
    <Section className="py-2 sm:py-6">
      <Container size="wide">
        <AnimatedSection variant="fade-up">
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#0c1c2a] via-[#153448] to-[#0c1c2a] border border-[#20698f]/40 text-white shadow-xl">
            {/* Background decorative glowing patterns */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(106,199,242,0.18)_0%,_transparent_60%)] pointer-events-none" />
            <div className="absolute -right-16 -bottom-16 h-64 w-64 rounded-full bg-[#6ac7f2]/10 blur-3xl pointer-events-none" />

            <div className="relative z-10 grid items-center gap-6 p-4 sm:p-8 lg:grid-cols-12 lg:gap-10 lg:p-10">
              {/* Left Column: App Info & Store CTAs */}
              <div className="lg:col-span-7 space-y-3.5 sm:space-y-5">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#6ac7f2]/20 border border-[#6ac7f2]/30 px-2.5 py-1 text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-[#6ac7f2] backdrop-blur-xs">
                    <Smartphone className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    {t.badge}
                  </span>
                  {/* Rating & Downloads for Mobile */}
                  <div className="flex items-center gap-3 text-[10px] sm:text-xs font-bold text-slate-300">
                    <span className="inline-flex items-center gap-1">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      {t.rating}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Download className="h-3 w-3 text-[#6ac7f2]" />
                      {t.downloads}
                    </span>
                  </div>
                </div>

                <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight font-devanagari text-white">
                  {t.title}
                </h2>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-devanagari max-w-lg">
                  {t.subtitle}
                </p>

                {/* Compact Features Grid */}
                <div className="grid grid-cols-2 gap-2 pt-0.5">
                  {t.features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-slate-200 font-devanagari"
                    >
                      <div className="shrink-0 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-[#6ac7f2]/20 text-[#6ac7f2]">
                        <Zap className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                      </div>
                      <span className="truncate">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Primary Mobile App Store Badges (2-column on Mobile) */}
                <div className="pt-2">
                  <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">
                    Mobile App
                  </p>
                  <div className="grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:gap-3">
                    {/* Google Play */}
                    <Link
                      href={t.downloadLink}
                      className="flex items-center justify-center gap-2 rounded-xl bg-black/80 hover:bg-black border border-white/20 px-3 py-2.5 sm:px-4 sm:py-3 text-white transition-all shadow-md active:scale-95 group"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="h-5 w-5 sm:h-6 sm:w-6 fill-current shrink-0 text-[#6ac7f2]"
                        aria-hidden="true"
                      >
                        <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302-2.302 2.302-2.625-2.302 2.625-2.302zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
                      </svg>
                      <span className="text-left leading-tight">
                        <span className="block text-[8px] text-zinc-400 font-bold uppercase tracking-wider">
                          {t.googlePlaySub}
                        </span>
                        <span className="block text-xs sm:text-sm font-extrabold">
                          {t.googlePlay}
                        </span>
                      </span>
                    </Link>

                    {/* App Store */}
                    <Link
                      href={t.downloadLink}
                      className="flex items-center justify-center gap-2 rounded-xl bg-black/80 hover:bg-black border border-white/20 px-3 py-2.5 sm:px-4 sm:py-3 text-white transition-all shadow-md active:scale-95 group"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="h-5 w-5 sm:h-6 sm:w-6 fill-current shrink-0 text-white"
                        aria-hidden="true"
                      >
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                      </svg>
                      <span className="text-left leading-tight">
                        <span className="block text-[8px] text-zinc-400 font-bold uppercase tracking-wider">
                          {t.appStoreSub}
                        </span>
                        <span className="block text-xs sm:text-sm font-extrabold">
                          {t.appStore}
                        </span>
                      </span>
                    </Link>
                  </div>
                </div>

                {/* Secondary Desktop App Downloads (Windows & macOS in a compact row) */}
                <div className="pt-1.5 border-t border-white/10">
                  <p className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                    Desktop App (Windows / Mac)
                  </p>
                  <div className="flex items-center gap-2">
                    <Link
                      href={t.downloadLink}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 px-3 py-1.5 text-slate-200 text-[10px] font-bold transition-all"
                    >
                      <Monitor className="h-3.5 w-3.5 text-[#6ac7f2]" />
                      <span>{t.windows}</span>
                    </Link>

                    <Link
                      href={t.downloadLink}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 px-3 py-1.5 text-slate-200 text-[10px] font-bold transition-all"
                    >
                      <Laptop className="h-3.5 w-3.5 text-[#6ac7f2]" />
                      <span>{t.macOS}</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Right Column: Phone Mockup */}
              <div className="lg:col-span-5 flex justify-center py-2 lg:py-0">
                <div className="relative">
                  {/* Phone frame */}
                  <div className="relative h-[220px] w-[110px] sm:h-[300px] sm:w-[150px] lg:h-[340px] lg:w-[170px] rounded-[22px] sm:rounded-[28px] bg-zinc-950 border-[3px] border-zinc-700/80 shadow-2xl overflow-hidden">
                    {/* Screen content */}
                    <div className="absolute inset-[2px] sm:inset-[3px] rounded-[18px] sm:rounded-[24px] overflow-hidden bg-black">
                      <div className="relative w-full h-full">
                        <Image
                          src="/images/app-screen-1.webp"
                          alt="Aakar IAS App Preview"
                          fill
                          className="object-cover object-top"
                          sizes="(max-width: 640px) 110px, (max-width: 1024px) 150px, 170px"
                        />
                      </div>
                    </div>
                    {/* Phone Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 h-3.5 sm:h-5 w-10 sm:w-16 rounded-b-xl sm:rounded-b-2xl bg-zinc-950" />
                  </div>
                  {/* Cyan Glow behind phone */}
                  <div className="absolute -inset-6 rounded-full bg-[#6ac7f2]/15 blur-2xl -z-10" />
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </Container>
    </Section>
  );
}
