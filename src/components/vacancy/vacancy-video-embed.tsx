"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, ExternalLink, Sparkles } from "lucide-react";
import { YoutubeIcon } from "@/components/layout/brand-icons";
import { Button } from "@/components/ui/button";

interface VacancyVideoEmbedProps {
  videoUrl?: string;
  title?: string;
  locale?: "hi" | "en";
}

export function VacancyVideoEmbed({
  videoUrl = "https://youtu.be/CWBcJ86R2kc",
  title,
  locale = "hi",
}: VacancyVideoEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  // Extract YouTube ID (supporting live streams as well)
  const extractYoutubeId = (url: string): string => {
    if (!url) return "CWBcJ86R2kc";
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|live\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : "CWBcJ86R2kc";
  };

  const videoId = extractYoutubeId(videoUrl);
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;

  const isHi = locale === "hi";

  const videoTitle =
    title ||
    (isHi
      ? "MP Patwari & Group 2 Subgroup 4 भर्ती 2026 संपूर्ण नियमपुस्तिका विश्लेषण व कट-ऑफ रणनीति"
      : "MP Patwari & Group 2 Subgroup 4 Vacancy 2026 Detailed Rulebook Analysis & Strategy");

  return (
    <section className="overflow-hidden rounded-3xl border border-red-500/30 bg-gradient-to-br from-card via-card to-red-950/10 shadow-soft-xl transition-all duration-300">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-red-500/20 bg-gradient-to-r from-red-500/10 via-amber-500/5 to-transparent px-5 py-3.5 sm:px-6">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-600 text-white shadow-soft">
            <YoutubeIcon className="h-4 w-4 text-white" />
          </span>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-red-600 dark:text-red-400">
                {isHi ? "आधिकारिक वीडियो विश्लेषण" : "Official Video Masterclass"}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-red-500/10 px-2 py-0.5 text-[10px] font-bold text-red-700 dark:text-red-300">
                <Sparkles className="h-2.5 w-2.5" />
                Aakar IAS Official
              </span>
            </div>
            <h3 className="text-sm font-bold text-foreground sm:text-base leading-tight">
              {isHi ? "विशेषज्ञ फैकल्टी द्वारा भर्ती चर्चा एवं परीक्षा रणनीति" : "Vacancy Rulebook Discussion & Preparation Strategy"}
            </h3>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="h-8 rounded-full border-red-500/30 font-bold text-red-600 dark:text-red-400 hover:bg-red-500/10 gap-1.5 text-xs"
          asChild
        >
          <a href={videoUrl} target="_blank" rel="noopener noreferrer">
            <span>{isHi ? "YouTube पर देखें" : "Watch on YouTube"}</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </Button>
      </div>

      {/* Video Container */}
      <div className="relative aspect-video w-full bg-black/90">
        {isPlaying ? (
          <iframe
            src={embedUrl}
            title={videoTitle}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full border-0"
          />
        ) : (
          <div className="group relative h-full w-full cursor-pointer overflow-hidden" onClick={() => setIsPlaying(true)}>
            <Image
              src={thumbnailUrl}
              alt={videoTitle}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority
              unoptimized
            />
            {/* Dark Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20 group-hover:bg-black/40 transition-all duration-300" />

            {/* Central Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-red-600 text-white shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-red-500">
                <span className="absolute -inset-2 animate-ping rounded-full bg-red-600/40 opacity-75" />
                <Play className="h-7 w-7 sm:h-9 sm:w-9 fill-current ml-1" />
              </div>
            </div>

            {/* Video Bottom Overlay Info */}
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
              <span className="inline-block rounded-full bg-red-600/90 backdrop-blur-md px-2.5 py-0.5 text-[11px] font-extrabold text-white uppercase mb-1.5 shadow">
                {isHi ? "रूलबुक एवं परीक्षा रणनीति" : "Rulebook & Strategy Video"}
              </span>
              <h4 className="text-sm sm:text-lg font-bold text-white leading-snug line-clamp-2 drop-shadow-sm">
                {videoTitle}
              </h4>
              <p className="mt-1 text-xs text-white/80 line-clamp-1 font-medium">
                {isHi
                  ? "▶️ वीडियो चालू करने के लिए प्ले बटन दबाएं • आकार आईएएस इंदौर"
                  : "▶️ Click play button to start video • Aakar IAS Indore"}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer Info / Channel Badge */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-muted/40 px-5 py-3 text-xs text-muted-foreground border-t border-border/40 font-medium">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
          <span>{isHi ? "आकार आईएएस आधिकारिक यूट्यूब क्लास" : "Aakar IAS Official YouTube Masterclass"}</span>
        </div>
        <div className="text-[11px] font-bold text-red-600 dark:text-red-400">
          {isHi ? "MPPSC & ESB स्पेशल लाइव मार्गदर्शन" : "MPPSC & ESB Exam Guidance"}
        </div>
      </div>
    </section>
  );
}
