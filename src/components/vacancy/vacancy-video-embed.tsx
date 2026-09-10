"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, ExternalLink, Sparkles, ListVideo } from "lucide-react";
import { YoutubeIcon } from "@/components/layout/brand-icons";
import { Button } from "@/components/ui/button";

interface VacancyVideoEmbedProps {
  videoUrl?: string;
  playlistUrl?: string;
  playlistThumbnail?: string;
  title?: string;
  locale?: "hi" | "en";
}

export function VacancyVideoEmbed({
  videoUrl = "https://youtube.com/live/PaP_uUtYGMU?feature=share",
  playlistUrl = "https://www.youtube.com/playlist?list=PLLSNJVlS0UIg",
  playlistThumbnail = "/images/notifications/aakar-maha-marathon-daily-free-playlist-thumbnail.png",
  title,
  locale = "hi",
}: VacancyVideoEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  // Extract YouTube ID (supporting live streams as well)
  const extractYoutubeId = (url: string): string => {
    if (!url) return "PaP_uUtYGMU";
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|live\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : "PaP_uUtYGMU";
  };

  const videoId = extractYoutubeId(videoUrl);
  const [imgSrc, setImgSrc] = useState(
    `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
  );
  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;

  const isHi = locale === "hi";

  const videoTitle =
    title ||
    (isHi
      ? "MP Police Constable भर्ती 2026 संपूर्ण नियमपुस्तिका विश्लेषण व कट-ऑफ रणनीति"
      : "MP Police Constable Vacancy 2026 Detailed Rulebook Analysis & Strategy");

  return (
    <section className="overflow-hidden rounded-3xl border border-red-500/30 bg-gradient-to-br from-card via-card to-red-950/10 shadow-soft-xl transition-all duration-300 space-y-0">
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
              src={imgSrc}
              alt={videoTitle}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority
              unoptimized
              onError={() => {
                setImgSrc(`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`);
              }}
            />
            {/* Light hover overlay */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300" />

            {/* Central Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-red-600 text-white shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-red-500">
                <span className="absolute -inset-2 animate-ping rounded-full bg-red-600/40 opacity-75" />
                <Play className="h-7 w-7 sm:h-9 sm:w-9 fill-current ml-1" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Daily Free Preparation Playlist Banner */}
      <div className="border-t border-red-500/20 bg-gradient-to-r from-red-600/10 via-amber-500/10 to-red-950/20 p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Custom Playlist Poster Image Card */}
            <a
              href={playlistUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative h-24 w-44 sm:h-28 sm:w-48 shrink-0 overflow-hidden rounded-2xl border-2 border-red-500/50 bg-black shadow-lg transition-all hover:scale-105"
            >
              <Image
                src={playlistThumbnail}
                alt="MP Police Constable 2026 Aakar Maha Marathon Daily Free YouTube Live Playlist Poster"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between text-[10px] font-black text-white">
                <span className="flex items-center gap-1 bg-black/60 px-1.5 py-0.5 rounded backdrop-blur-sm">
                  <ListVideo className="h-3 w-3 text-red-500" /> PLAYLIST
                </span>
                <span className="bg-red-600 px-1.5 py-0.5 rounded text-[9px] font-extrabold shadow-sm animate-pulse">LIVE</span>
              </div>
            </a>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
                </span>
                <span className="text-xs font-extrabold uppercase text-red-600 dark:text-red-400 tracking-wider">
                  {isHi ? "डेली फ्री लाइव क्लासेस (रोजाना सुबह 9:00 AM से शाम 6:00 PM)" : "Daily Free Live Classes (9:00 AM to 6:00 PM)"}
                </span>
              </div>
              <h4 className="font-extrabold text-foreground text-base sm:text-lg">
                {isHi ? "MP Police Constable 2026 संपूर्ण फ्री तैयारी यूट्यूब प्लेलिस्ट" : "MP Police Constable 2026 Complete Free Prep Playlist"}
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {isHi
                  ? "आकार IAS के आधिकारिक YouTube चैनल पर रोजाना सुबह 9:00 AM से शाम 6:00 PM तक MP Police Constable परीक्षा हेतु सभी विषयों की निःशुल्क लाइव क्लासेस व प्रैक्टिस सेशंस प्रसारित किए जाते हैं।"
                  : "Free daily live streaming classes for MP Police Constable exam covering full syllabus from 9:00 AM to 6:00 PM daily."}
              </p>
            </div>
          </div>

          <div className="shrink-0 w-full md:w-auto">
            <Button className="w-full sm:w-auto rounded-full bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs shadow-md gap-2 px-6 py-5" asChild>
              <a href={playlistUrl} target="_blank" rel="noopener noreferrer">
                <YoutubeIcon className="h-4 w-4" />
                <span>{isHi ? "फ्री लाइव प्लेलिस्ट देखें" : "Watch Free Playlist"}</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </Button>
          </div>
        </div>
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
