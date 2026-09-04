"use client";

import Link from "next/link";
import Image from "next/image";
import { BookOpen, ShoppingBag } from "lucide-react";
import type { Publication } from "@/lib/content/types";
import { getBaseBookReviews, formatViewCount } from "@/lib/views";

interface BookCardProps {
  pub: Publication;
  locale: "hi" | "en";
}

export function BookCard({ pub, locale }: BookCardProps) {
  const isHi = locale === "hi";

  // Calculate discount percentage if original price is available
  const hasDiscount = !!(pub.originalPrice && pub.price && pub.originalPrice > pub.price);
  const discountPercent = hasDiscount
    ? Math.round(((pub.originalPrice! - pub.price!) / pub.originalPrice!) * 100)
    : 0;

  // WhatsApp purchase link as fallback if buyLink is not provided
  const whatsappMessage = isHi
    ? `नमस्ते आकार IAS, मैं यह पुस्तक ऑर्डर करना चाहता हूँ: ${pub.title} (मूल्य: ₹${pub.price || "संपर्क करें"})`
    : `Hello Aakar IAS, I want to order this book: ${pub.title} (Price: ₹${pub.price || "Contact Us"})`;
  const defaultBuyUrl = `https://wa.me/919713300123?text=${encodeURIComponent(whatsappMessage)}`;
  const orderUrl = pub.buyLink || defaultBuyUrl;

  const detailLink = isHi ? `/publications/${pub.slug}` : `/en/publications/${pub.slug}`;

  // Reviews count (~1000+ randomized base)
  const reviewsCount = pub.reviewsCount || getBaseBookReviews(pub.slug || pub.id);
  const ratingValue = pub.rating || 4.8;

  return (
    <div className="group border border-border/80 bg-card rounded-2xl p-3 sm:p-4 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between h-full">
      {/* Top Main Section: Left Cover Image + Right Details */}
      <div className="flex gap-3.5 sm:gap-4 items-start">
        {/* Left: Book Cover Image (Fixed width 100px - 135px container) */}
        <Link
          href={detailLink}
          className="relative shrink-0 w-[100px] xs:w-[115px] sm:w-[135px] aspect-[3/4] rounded-xl overflow-hidden bg-muted/30 border border-border/60 shadow-sm block group-hover:shadow transition-shadow"
        >
          {pub.coverImage ? (
            <Image
              src={pub.coverImage}
              alt={pub.title}
              fill
              sizes="135px"
              className="object-contain p-1 group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-primary/10 text-primary">
              <BookOpen className="h-8 w-8" />
            </div>
          )}

          {pub.soldOut && (
            <div className="absolute inset-0 bg-background/80 backdrop-blur-xs flex items-center justify-center p-1 text-center">
              <span className="text-[9px] font-black text-destructive uppercase tracking-wider bg-destructive/10 px-1.5 py-0.5 rounded border border-destructive/20">
                {isHi ? "आउट ऑफ़ स्टॉक" : "SOLD OUT"}
              </span>
            </div>
          )}
        </Link>

        {/* Right: Book Meta & Info */}
        <div className="flex-1 min-w-0 space-y-1.5">
          {/* Edition / Tag / Badge */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] text-muted-foreground font-medium">
              {pub.medium || (isHi ? "हिंदी / English" : "Hindi / English")}
            </span>
            <span className="text-muted-foreground/40 text-[10px]">•</span>
            <span className="text-[10px] text-muted-foreground font-semibold">
              {pub.edition || "Latest Edition"}
            </span>
          </div>

          {/* Title */}
          <Link href={detailLink} className="block group-hover:text-primary transition-colors">
            <h3 className="font-extrabold text-foreground text-xs sm:text-sm leading-snug line-clamp-2">
              {pub.title}
            </h3>
          </Link>

          {/* Description / Subtitle */}
          {pub.description && (
            <p className="text-[11px] text-muted-foreground line-clamp-2 leading-tight">
              {pub.description}
            </p>
          )}

          {/* Rating & 1000+ Reviews Count */}
          <div className="flex items-center gap-1 text-[11px] font-bold text-foreground">
            <span className="text-amber-500 font-bold">★</span>
            <span>{ratingValue}</span>
            <span className="text-muted-foreground font-semibold text-[10px]">
              ({formatViewCount(reviewsCount)}+ reviews)
            </span>
          </div>

          {/* Pricing Row */}
          <div className="pt-1 flex flex-wrap items-baseline gap-1.5">
            <span className="text-sm sm:text-base font-black text-foreground">
              ₹{pub.price ? pub.price.toLocaleString() : "349"}
            </span>
            {hasDiscount && (
              <>
                <span className="text-[11px] text-muted-foreground line-through">
                  ₹{pub.originalPrice?.toLocaleString()}
                </span>
                <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400">
                  ({discountPercent}% off)
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Button (Brand Red Primary Action Button) */}
      <div className="mt-3 pt-2.5 border-t border-border/50">
        {!pub.soldOut ? (
          <a
            href={orderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-9.5 bg-primary hover:bg-primary/95 text-primary-foreground font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-primary/20 active:scale-[0.985] cursor-pointer"
          >
            <ShoppingBag className="h-3.5 w-3.5 shrink-0" />
            <span>{isHi ? "अभी ऑर्डर करें (Order Now)" : "Order Now"}</span>
          </a>
        ) : (
          <button
            disabled
            className="w-full h-9.5 bg-muted text-muted-foreground font-bold rounded-xl text-xs flex items-center justify-center cursor-not-allowed"
          >
            {isHi ? "आउट ऑफ़ स्टॉक" : "Out of Stock"}
          </button>
        )}
      </div>
    </div>
  );
}
