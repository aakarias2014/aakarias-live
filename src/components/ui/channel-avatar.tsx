"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface ChannelAvatarProps {
  src?: string | null;
  alt: string;
}

export function ChannelAvatar({ src, alt }: ChannelAvatarProps) {
  const defaultLogo = "/images/aakar-ias-logo.png";
  const [imgSrc, setImgSrc] = useState<string>(src || defaultLogo);

  useEffect(() => {
    if (src) {
      setImgSrc(src);
    }
  }, [src]);

  const altLower = (alt || "").toLowerCase();
  const srcLower = (imgSrc || "").toLowerCase();

  // Check if this is a person portrait (Atharv Tiwari / Ateet Gatha)
  const isPortrait =
    altLower.includes("atharv") ||
    altLower.includes("tiwari") ||
    altLower.includes("ateet") ||
    srcLower.includes("atharv") ||
    srcLower.includes("director");

  // Check if this is a full-bleed circular logo (Aakar Govt Exam)
  const isFullBleedLogo =
    altLower.includes("govt exam") ||
    srcLower.includes("govt-exam");

  return (
    <div className="relative h-16 w-16 sm:h-20 sm:w-20 overflow-hidden rounded-full border-2 border-red-500/20 bg-white p-0.5 shadow-sm flex items-center justify-center shrink-0">
      <Image
        src={imgSrc}
        alt={alt}
        fill
        sizes="80px"
        onError={() => setImgSrc(defaultLogo)}
        className={
          isPortrait
            ? "object-cover rounded-full p-0 scale-105"
            : isFullBleedLogo
            ? "object-cover rounded-full p-0"
            : "object-contain p-1 rounded-full"
        }
      />
    </div>
  );
}
