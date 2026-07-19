import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { AdConfig } from "@/data/ads";

interface ArticleAdCardProps {
  ad: AdConfig;
  locale?: string;
  className?: string;
}

export function ArticleAdCard({ ad, locale = "hi", className = "" }: ArticleAdCardProps) {
  const isHi = locale === "hi";
  const href = isHi ? ad.href : (ad.hrefEn ?? ad.href);
  const rawCta = isHi ? ad.ctaHi : ad.ctaEn;
  const cleanCta = rawCta.replace(/[→➔\s]+$/, "").replace(/->\s*$/, "").trim();

  return (
    <div className={`group flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-4 sm:p-5 shadow-soft-lg ${className}`}>
      {/* Image container at the top (1:1 ratio) */}
      <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-xl bg-muted">
        <Image
          src={ad.image}
          alt={isHi ? ad.titleHi : ad.titleEn}
          fill
          sizes="(max-width: 768px) 100vw, 320px"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* Content area below the image */}
      <div className="flex flex-col flex-1 pt-4 justify-between min-h-0">
        <div className="space-y-2 min-h-0 flex-1 flex flex-col">
          {/* Sponsored chip */}
          <div>
            <span className="inline-block rounded-full border border-foreground/10 bg-foreground/5 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              {isHi ? "प्रायोजित" : "Sponsored"}
            </span>
          </div>

          <h5 className="text-base font-extrabold leading-tight text-foreground line-clamp-2">
            {isHi ? ad.titleHi : ad.titleEn}
          </h5>
          
          <p className="text-xs leading-relaxed text-muted-foreground line-clamp-3 overflow-y-auto pr-1">
            {isHi ? ad.subtitleHi : ad.subtitleEn}
          </p>
        </div>

        <div className="mt-4 shrink-0">
          <Link
            href={href}
            className="flex items-center justify-center gap-1.5 w-full rounded-xl bg-[#0a3072] py-3 text-center text-sm font-bold text-white transition-all duration-300 hover:bg-[#072459] active:scale-98 shadow-md"
          >
            <span>{cleanCta}</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}


