"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Clock, Monitor, Users, Star, Award, GraduationCap, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { OnlineCourse, OfflineBatch, TestSeries } from "@/lib/content/types";
import { Button } from "@/components/ui/button";

interface BatchesShowcaseProps {
  onlineCourses: OnlineCourse[];
  offlineBatches: OfflineBatch[];
  testSeries?: TestSeries[];
  locale?: string;
}

export function BatchesShowcase({
  onlineCourses,
  offlineBatches,
  testSeries,
  locale = "hi",
}: BatchesShowcaseProps) {
  const [activeTab, setActiveTab] = useState<"online" | "offline" | "test-series">("online");
  const isHi = locale === "hi";

  return (
    <section id="courses" className="py-16 md:py-24 bg-muted/10 border-y border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
            <GraduationCap className="h-3.5 w-3.5" />
            {isHi ? "प्रवेश प्रारंभ" : "Admissions Open"}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground font-devanagari">
            {isHi ? "हमारे प्रमुख क्लासरूम प्रोग्राम" : "Our Premier Classroom Programs"}
          </h2>
          <p className="text-sm md:text-base text-muted-foreground font-devanagari">
            {isHi 
              ? "UPSC, MPPSC और अन्य राज्य सेवा परीक्षाओं में सफलता के लिए विशेषज्ञ मार्गदर्शन।" 
              : "Expert guidance for success in UPSC, MPPSC and other state services exams."}
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex justify-center mb-8 sm:mb-10 px-1">
          <div className="grid grid-cols-3 w-full max-w-xl p-1.5 bg-background rounded-2xl border border-border shadow-soft">
            <button
              onClick={() => setActiveTab("online")}
              className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-2 sm:px-5 py-2.5 rounded-xl text-[11px] sm:text-sm font-extrabold transition-all select-none ${
                activeTab === "online"
                  ? "bg-primary text-white shadow-md shadow-primary/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
              }`}
            >
              <Monitor className="h-4 w-4 shrink-0" />
              <span className="whitespace-nowrap">{isHi ? "ऑनलाइन क्लासेस" : "Online Courses"}</span>
            </button>
            <button
              onClick={() => setActiveTab("offline")}
              className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-2 sm:px-5 py-2.5 rounded-xl text-[11px] sm:text-sm font-extrabold transition-all select-none ${
                activeTab === "offline"
                  ? "bg-primary text-white shadow-md shadow-primary/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
              }`}
            >
              <Users className="h-4 w-4 shrink-0" />
              <span className="whitespace-nowrap">{isHi ? "ऑफलाइन केंद्र" : "Offline Classes"}</span>
            </button>
            <button
              onClick={() => setActiveTab("test-series")}
              className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-2 sm:px-5 py-2.5 rounded-xl text-[11px] sm:text-sm font-extrabold transition-all select-none ${
                activeTab === "test-series"
                  ? "bg-primary text-white shadow-md shadow-primary/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
              }`}
            >
              <FileText className="h-4 w-4 shrink-0" />
              <span className="whitespace-nowrap">{isHi ? "टेस्ट सीरीज" : "Test Series"}</span>
            </button>
          </div>
        </div>

        {/* Dynamic Content Grid */}
        <div className="min-h-[300px]">
          <AnimatePresence mode="wait">
            {activeTab === "online" ? (
              <motion.div
                key="online-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {onlineCourses.slice(0, 3).map((course) => {
                  const title = isHi ? course.titleHi : course.titleEn;
                  const duration = isHi ? course.durationHi : course.durationEn;
                  const badge = isHi ? course.badgeHi : course.badgeEn;
                  const mentor = isHi ? course.mentorNameHi : course.mentorNameEn;
                  
                  return (
                    <div
                      key={course.id}
                      className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft hover:shadow-soft-lg transition-all duration-300"
                    >
                      {/* Image */}
                      <div className="relative aspect-video w-full overflow-hidden bg-muted">
                        {course.image ? (
                          <Image
                            src={course.image}
                            alt={title}
                            fill
                            sizes="(max-width: 768px) 100vw, 380px"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/15 text-primary">
                            <Monitor className="h-12 w-12 opacity-40" />
                          </div>
                        )}
                        {badge && (
                          <span className="absolute top-4 left-4 inline-block rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-bold text-accent-foreground uppercase tracking-wider shadow-sm">
                            {badge}
                          </span>
                        )}
                        {course.isLive && (
                          <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-red-600 px-2.5 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider shadow-sm animate-pulse">
                            <span className="h-1.5 w-1.5 rounded-full bg-white" />
                            Live
                          </span>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex flex-col flex-1 p-6 gap-4">
                        <div className="space-y-2 flex-1">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                            {course.category}
                          </span>
                          <h3 className="text-lg font-extrabold leading-snug text-foreground group-hover:text-primary transition-colors line-clamp-2">
                            {title}
                          </h3>
                          {mentor && (
                            <p className="text-xs text-muted-foreground">
                              {isHi ? "मेंटर:" : "Mentor:"} <span className="font-semibold text-foreground">{mentor}</span>
                            </p>
                          )}
                        </div>

                        {/* Details */}
                        <div className="flex items-center justify-between text-xs text-muted-foreground border-y border-border/40 py-3">
                          {duration && (
                            <span className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5 text-primary" />
                              {duration}
                            </span>
                          )}
                          {course.rating && (
                            <span className="flex items-center gap-1 text-amber-500 font-bold">
                              <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                              {course.rating}
                            </span>
                          )}
                        </div>

                        {/* Price & CTA */}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground line-through">
                              ₹{course.originalPrice}
                            </span>
                            <span className="text-lg font-extrabold text-foreground">
                              ₹{course.price}
                            </span>
                          </div>
                          <Button size="sm" className="rounded-xl font-bold bg-primary text-white hover:bg-primary/95" asChild>
                            <Link href={isHi ? `/online-courses/${course.slug}` : `/en/online-courses/${course.slug}`}>
                              {isHi ? "कोर्स देखें" : "View Course"}
                              <ArrowRight className="ml-1 h-3.5 w-3.5" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            ) : activeTab === "offline" ? (
              <motion.div
                key="offline-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {offlineBatches.slice(0, 3).map((batch) => {
                  const title = isHi ? batch.titleHi : batch.titleEn;
                  const date = isHi ? batch.startDateHi : batch.startDateEn;
                  const time = isHi ? batch.timeHi : batch.timeEn;
                  const badge = isHi ? batch.badgeHi : batch.badgeEn;
                  
                  return (
                    <div
                      key={batch.id}
                      className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-soft hover:shadow-soft-lg transition-all duration-300 min-h-[280px]"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-wider">
                            <Award className="h-3 w-3" />
                            {batch.medium} Medium
                          </span>
                          {badge && (
                            <span className="inline-block rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-bold text-accent-foreground uppercase tracking-wider">
                              {badge}
                            </span>
                          )}
                        </div>

                        <h3 className="text-lg font-extrabold leading-snug text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {title}
                        </h3>

                        {/* Batch Details */}
                        <div className="grid grid-cols-2 gap-3 text-xs text-muted-foreground bg-muted/20 rounded-2xl p-4">
                          <div className="space-y-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80">
                              {isHi ? "प्रारंभ तिथि" : "Start Date"}
                            </span>
                            <p className="font-bold text-foreground flex items-center gap-1.5">
                              <Calendar className="h-3.5 w-3.5 text-primary shrink-0" />
                              {date}
                            </p>
                          </div>
                          <div className="space-y-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80">
                              {isHi ? "समय (सत्र)" : "Timing"}
                            </span>
                            <p className="font-bold text-foreground flex items-center gap-1.5">
                              <Clock className="h-3.5 w-3.5 text-primary shrink-0" />
                              {time}
                            </p>
                          </div>
                        </div>

                        {/* Progress Bar (seats occupancy) */}
                        {batch.seatsFillPercent && (
                          <div className="space-y-1.5">
                            <div className="flex justify-between text-[10px] font-bold text-muted-foreground">
                              <span>{isHi ? "प्रवेश सीमा" : "Seat Occupancy"}</span>
                              <span className="text-primary">{batch.seatsFillPercent}% {isHi ? "पूर्ण" : "Filled"}</span>
                            </div>
                            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary transition-all duration-500 rounded-full"
                                style={{ width: `${batch.seatsFillPercent}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="mt-6 pt-4 border-t border-border/40">
                        <Button className="w-full rounded-xl font-bold bg-primary text-white hover:bg-primary/95" asChild>
                          <Link href={isHi ? "/offline-courses" : "/en/offline-courses"}>
                            {isHi ? "सीट सुरक्षित करें / पूछताछ" : "Reserve Seat / Inquire"}
                            <ArrowRight className="ml-1.5 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div
                key="test-series-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {(testSeries || []).slice(0, 3).map((item) => {
                  const badge = isHi ? item.badgeHi || item.badge : item.badgeEn || item.badge;
                  return (
                    <div
                      key={item.id}
                      className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-soft hover:shadow-soft-lg transition-all duration-300 min-h-[280px]"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-wider">
                            <Award className="h-3 w-3" />
                            {isHi ? "टेस्ट सीरीज" : "Test Series"}
                          </span>
                          {badge && (
                            <span className="inline-block rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-bold text-accent-foreground uppercase tracking-wider">
                              {badge}
                            </span>
                          )}
                        </div>

                        <h3 className="text-lg font-extrabold leading-snug text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {item.title}
                        </h3>

                        {item.description && (
                          <p className="text-xs text-muted-foreground line-clamp-3">
                            {item.description}
                          </p>
                        )}

                        {item.features && item.features.length > 0 && (
                          <ul className="space-y-1.5 text-xs text-muted-foreground mt-2">
                            {item.features.slice(0, 2).map((feat, fIdx) => {
                              const cleanFeat = feat.replace(/\*\*/g, "");
                              return (
                                <li key={fIdx} className="flex items-center gap-1.5 font-devanagari">
                                  <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                                  {cleanFeat}
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </div>

                      <div className="mt-6 pt-4 border-t border-border/40 flex items-center justify-between">
                        <div>
                          {item.originalPrice && (
                            <span className="text-[10px] text-muted-foreground line-through block">₹{item.originalPrice.toLocaleString()}</span>
                          )}
                          <span className="text-base font-extrabold text-foreground">
                            {item.price ? `₹${item.price.toLocaleString()}` : "Free"}
                          </span>
                        </div>
                        <Button size="sm" className="rounded-xl font-bold bg-primary text-white hover:bg-primary/95" asChild>
                          <Link href={isHi ? "/test-series" : "/en/test-series"}>
                            {isHi ? "टेस्ट देखें" : "View Test"}
                            <ArrowRight className="ml-1 h-3.5 w-3.5" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="rounded-full font-bold px-8" asChild>
            <Link
              href={
                activeTab === "online"
                  ? (isHi ? "/online-courses" : "/en/online-courses")
                  : activeTab === "offline"
                    ? (isHi ? "/offline-courses" : "/en/offline-courses")
                    : (isHi ? "/test-series" : "/en/test-series")
              }
            >
              {activeTab === "online"
                ? (isHi ? "सभी कोर्सेज देखें" : "View All Courses")
                : activeTab === "offline"
                  ? (isHi ? "सभी बैचेस देखें" : "View All Batches")
                  : (isHi ? "सभी टेस्ट सीरीज देखें" : "View All Test Series")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

      </div>
    </section>
  );
}
