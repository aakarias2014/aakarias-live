"use client";

import Link from "next/link";
import Image from "next/image";
import { BookOpen, MessageSquare, Star } from "lucide-react";
import type { Publication } from "@/lib/content/types";

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

  // WhatsApp chat message link
  const whatsappMessage = isHi
    ? `नमस्ते आकार IAS, मैं यह पुस्तक खरीदना चाहता हूँ: ${pub.title} (मूल्य: ₹${pub.price || "संपर्क करें"})`
    : `Hello Aakar IAS, I want to purchase this book: ${pub.title} (Price: ₹${pub.price || "Contact Us"})`;
  const whatsappUrl = `https://wa.me/919713300123?text=${encodeURIComponent(whatsappMessage)}`;

  const detailLink = isHi ? `/publications/${pub.slug}` : `/en/publications/${pub.slug}`;

  // Check badge type for color theme
  const badgeText = pub.badge;
  const isBestselling = badgeText?.toLowerCase() === "bestselling";
  const isTrending = badgeText?.toLowerCase() === "trending";

  return (
    <div className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card shadow-soft hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300 relative min-h-[380px]">
      
      {/* 1. Ribbon Status Badge */}
      {badgeText && (
        <div 
          className={`absolute top-3 left-3 z-10 text-[9px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider text-white shadow-sm ${
            isBestselling 
              ? "bg-purple-600" 
              : isTrending 
                ? "bg-emerald-600" 
                : "bg-primary"
          }`}
        >
          {badgeText}
        </div>
      )}

      {/* 2. Cover Image Container */}
      <div className="relative aspect-[3/4] rounded-t-3xl overflow-hidden bg-muted/20 flex items-center justify-center p-6 border-b border-border/40">
        <Link href={detailLink} className={`relative w-[70%] sm:w-[75%] aspect-[3/4] shadow-2xl rounded-sm overflow-hidden transform group-hover:scale-[1.03] group-hover:-rotate-1 transition-transform duration-500 block ${pub.soldOut ? "opacity-50 grayscale-[30%]" : ""}`}>
          {pub.coverImage ? (
            <Image
              src={pub.coverImage}
              alt={pub.title}
              fill
              sizes="(max-width: 640px) 150px, 200px"
              className="object-contain p-1"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-primary/10 text-primary">
              <BookOpen className="h-10 w-10" />
            </div>
          )}
        </Link>

        {/* Floating WhatsApp ADD Button / SOLD OUT indicator */}
        {!pub.soldOut ? (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-3 right-3 z-10 bg-white border border-[#7c3aed]/20 text-[#7c3aed] hover:bg-[#7c3aed]/5 rounded-xl px-4 py-2 text-xs font-black shadow-md hover:shadow-lg transition-all flex items-center gap-1"
          >
            ADD
          </a>
        ) : (
          <div className="absolute bottom-3 right-3 z-10 bg-red-600 text-white rounded-xl px-3 py-1.5 text-[9px] font-black shadow-md uppercase tracking-wider">
            {isHi ? "आउट ऑफ़ स्टॉक" : "SOLD OUT"}
          </div>
        )}
      </div>

      {/* 3. Product Info Section */}
      <div className="p-5 flex flex-col gap-2.5 flex-grow justify-between">
        
        {/* Edition & Title */}
        <div className="space-y-2">
          {/* Edition Tag */}
          <span className="inline-block bg-blue-50 text-blue-600 border border-blue-100 rounded-lg px-2 py-0.5 text-[9px] font-black uppercase tracking-wide">
            {pub.edition || "2026 Edition"}
          </span>
          
          <Link href={detailLink} className="hover:text-primary transition-colors block">
            <h3 className="font-extrabold text-foreground text-sm line-clamp-2 min-h-[2.5rem] leading-snug">
              {pub.title}
            </h3>
          </Link>
          
          {pub.description && (
            <p className="text-xs text-muted-foreground line-clamp-2 min-h-[2rem]">
              {pub.description}
            </p>
          )}
        </div>

        {/* Price & Rating Row */}
        <div className="pt-2 border-t border-border/50 flex items-end justify-between">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-base font-black text-foreground">
                {pub.price ? `₹${pub.price.toLocaleString()}` : "Free"}
              </span>
              {hasDiscount && (
                <span className="text-[10px] font-black text-emerald-600">
                  ({discountPercent}% OFF)
                </span>
              )}
            </div>
            {hasDiscount && (
              <span className="text-xs text-muted-foreground line-through block leading-none">
                ₹{pub.originalPrice?.toLocaleString()}
              </span>
            )}
          </div>

          {/* Green Star Rating Badge */}
          <div className="flex items-center gap-0.5 bg-emerald-600 text-white px-2 py-0.5 rounded text-[10px] font-black shadow-sm shrink-0">
            ★ {pub.rating || 4.4}
          </div>
        </div>

      </div>

    </div>
  );
}
