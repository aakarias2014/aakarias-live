"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { HeroSlide } from "@/lib/content/types";

interface HeroSliderProps {
  slides?: HeroSlide[];
  locale?: string;
  autoPlayInterval?: number;
}

export function HeroSlider({
  slides,
  locale = "hi",
  autoPlayInterval = 6000,
}: HeroSliderProps) {
  const isHi = locale === "hi";

  // Fallback dummy slides if none provided or empty
  const defaultSlides: HeroSlide[] = [
    {
      title: isHi
        ? "आकार IAS — सिविल सेवा परीक्षा में सर्वश्रेष्ठ मार्गदर्शन"
        : "Aakar IAS — Shape Your Civil Services Success",
      subtitle: isHi
        ? "UPSC & MPPSC 2025-26 के लिए नए फाउंडेशन बैच प्रारंभ।"
        : "Admissions open for UPSC & MPPSC 2025-26 foundation batches.",
      desktopImageUrl:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1600&auto=format&fit=crop&q=80",
      mobileImageUrl:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop&q=80",
      link: isHi ? "/contact" : "/en/contact",
    },
    {
      title: isHi
        ? "उत्कृष्ट टेस्ट सीरीज़ प्रोग्राम"
        : "Premium Test Series Program",
      subtitle: isHi
        ? "विस्तृत मूल्यांकन और व्यक्तिगत फीडबैक के साथ मुख्य परीक्षा मॉक टेस्ट।"
        : "Mains mock tests with comprehensive evaluation and personal mentoring.",
      desktopImageUrl:
        "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1600&auto=format&fit=crop&q=80",
      mobileImageUrl:
        "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600&auto=format&fit=crop&q=80",
      link: isHi ? "/test-series" : "/en/test-series",
    },
  ];

  const finalSlides = slides && slides.length > 0 ? slides : defaultSlides;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % finalSlides.length);
  }, [finalSlides.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + finalSlides.length) % finalSlides.length);
  }, [finalSlides.length]);

  useEffect(() => {
    const timer = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(timer);
  }, [nextSlide, autoPlayInterval]);

  const slideVariants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? 300 : -300,
    }),
    center: {
      zIndex: 1,
      opacity: 1,
      x: 0,
    },
    exit: (dir: number) => ({
      zIndex: 0,
      opacity: 0,
      x: dir > 0 ? -300 : 300,
    }),
  };

  const activeSlide = finalSlides[currentIndex];

  // Helper to render the slide content
  const renderSlideContent = (slide: HeroSlide) => {
    const hasText = slide.title || slide.subtitle;
    return (
      <div className="relative w-full h-full">
        {/* Desktop Image */}
        <div className="hidden md:block relative w-full h-full">
          {slide.desktopImageUrl ? (
            <Image
              src={slide.desktopImageUrl}
              alt={slide.title || "Hero Banner Desktop"}
              fill
              priority={currentIndex === 0}
              sizes="100vw"
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-secondary to-primary/20" />
          )}
        </div>

        {/* Mobile Image */}
        <div className="block md:hidden relative w-full h-full">
          {slide.mobileImageUrl ? (
            <Image
              src={slide.mobileImageUrl}
              alt={slide.title || "Hero Banner Mobile"}
              fill
              priority={currentIndex === 0}
              sizes="100vw"
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-secondary to-primary/20" />
          )}
        </div>

        {/* Dark overlay for readability (only active if title/subtitle exists to avoid covering text built into image) */}
        {hasText && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        )}

        {/* Floating text content */}
        {hasText && (
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 lg:p-24 text-white">
            <div className="max-w-3xl space-y-4">
              {slide.title && (
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight drop-shadow-md"
                >
                  {slide.title}
                </motion.h2>
              )}
              {slide.subtitle && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-sm sm:text-lg md:text-xl text-white/90 leading-relaxed font-medium max-w-2xl drop-shadow-sm"
                >
                  {slide.subtitle}
                </motion.p>
              )}
              {slide.link && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="pt-2"
                >
                  <span className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-white shadow-lg hover:brightness-110 active:scale-95 transition-all">
                    {isHi ? "अभी देखें" : "Explore Now"}
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </motion.div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="relative w-full overflow-hidden bg-black h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] xl:h-[550px] group">
      {/* Slides Container */}
      <div className="w-full h-full relative">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.4 },
            }}
            className="absolute inset-0 w-full h-full"
          >
            {activeSlide.link ? (
              <Link href={activeSlide.link} className="block w-full h-full">
                {renderSlideContent(activeSlide)}
              </Link>
            ) : (
              renderSlideContent(activeSlide)
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      {finalSlides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/50 active:scale-95"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/50 active:scale-95"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      {/* Dot Indicators */}
      {finalSlides.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 z-10 flex justify-center gap-2">
          {finalSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              aria-label={`Go to slide ${index + 1}`}
              className={`rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "w-8 h-2 bg-primary shadow-sm"
                  : "w-2 h-2 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
