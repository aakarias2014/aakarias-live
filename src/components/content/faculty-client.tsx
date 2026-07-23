"use client";

import React, { useState } from "react";
import Image from "next/image";
import { GraduationCap, Sparkles, Search, Users, ChevronDown, ChevronUp } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Faculty } from "@/lib/content/types";

interface FacultyClientProps {
  faculties: Faculty[];
  locale: "hi" | "en";
}

export function FacultyClient({ faculties, locale }: FacultyClientProps) {
  const [activeFilter, setActiveFilter] = useState<"all" | "hindi" | "english">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredFaculties = faculties.filter((faculty) => {
    // Media filter
    if (activeFilter !== "all" && faculty.medium !== activeFilter) {
      return false;
    }
    // Search query filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const name = (locale === "hi" ? faculty.nameHi : faculty.nameEn).toLowerCase();
      const title = (locale === "hi" ? faculty.titleHi : faculty.titleEn).toLowerCase();
      const desc = (locale === "hi" ? faculty.descHi : faculty.descEn).toLowerCase();
      return name.includes(query) || title.includes(query) || desc.includes(query);
    }
    return true;
  });

  return (
    <>
      {/* Hero Header */}
      <Section className="relative overflow-hidden pb-12 pt-16 bg-gradient-to-b from-primary/5 via-transparent to-transparent border-b border-border/40">
        <Container size="wide" className="text-center space-y-6">
          <span className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-primary bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20">
            <Sparkles className="h-3 w-3" /> {locale === "hi" ? "आकार आईएएस कोर टीम" : "Aakar IAS Core Team"}
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl text-balance leading-tight">
            {locale === "hi" ? (
              <>हमारे <span className="bg-gradient-to-r from-primary to-amber-500 bg-clip-text text-transparent">वरिष्ठ मेंटर्स व फैकल्टी</span></>
            ) : (
              <>Our <span className="bg-gradient-to-r from-primary to-amber-500 bg-clip-text text-transparent">Senior Mentors & Faculty</span></>
            )}
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground leading-relaxed">
            {locale === "hi" 
              ? "भारत के सर्वश्रेष्ठ शिक्षकों से सीखें जिन्होंने स्वयं यूपीएससी व एमपीपीएससी परीक्षाओं में सफलता हासिल की है और हजारों छात्रों का मार्गदर्शन किया है।"
              : "Learn from India's finest educators who have themselves excelled in UPSC & MPPSC exams and mentored thousands of successful candidates."}
          </p>
        </Container>
      </Section>

      {/* Filters and List Section */}
      <Section className="bg-background/50">
        <Container size="wide" className="space-y-8">
          
          {/* Controls Bar */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-border/60 pb-6">
            
            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant={activeFilter === "all" ? "default" : "outline"}
                onClick={() => setActiveFilter("all")}
                className="rounded-xl px-5 text-sm font-semibold transition-all duration-200"
              >
                {locale === "hi" ? "सभी फैकल्टी" : "All Mentors"}
              </Button>
              <Button
                variant={activeFilter === "hindi" ? "default" : "outline"}
                onClick={() => setActiveFilter("hindi")}
                className="rounded-xl px-5 text-sm font-semibold transition-all duration-200"
              >
                {locale === "hi" ? "हिंदी माध्यम" : "Hindi Medium"}
              </Button>
              <Button
                variant={activeFilter === "english" ? "default" : "outline"}
                onClick={() => setActiveFilter("english")}
                className="rounded-xl px-5 text-sm font-semibold transition-all duration-200"
              >
                {locale === "hi" ? "अंग्रेजी माध्यम" : "English Medium"}
              </Button>
            </div>

            {/* Search Field */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder={locale === "hi" ? "फैकल्टी खोजें..." : "Search faculty..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-foreground"
              />
            </div>
          </div>

          {/* Grid Layout */}
          {filteredFaculties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-start">
              {filteredFaculties.map((faculty) => {
                const name = locale === "hi" ? faculty.nameHi : faculty.nameEn;
                const title = locale === "hi" ? faculty.titleHi : faculty.titleEn;
                const desc = locale === "hi" ? faculty.descHi : faculty.descEn;
                const isExpanded = !!expandedIds[faculty.id];
                return (
                  <Card key={faculty.id} className="group border border-border/60 rounded-2xl shadow-soft hover:shadow-soft-lg hover:border-primary/20 transition-all duration-300 overflow-hidden flex flex-col justify-between h-full">
                    <div>
                      {/* Faculty Image Banner */}
                      <div className="relative aspect-[4/5] w-full bg-muted overflow-hidden">
                        {faculty.image ? (
                          <Image
                            src={faculty.image}
                            alt={name}
                            fill
                            className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/5 flex items-center justify-center">
                            <GraduationCap className="h-16 w-16 text-primary/40 group-hover:scale-110 transition-transform duration-500" />
                          </div>
                        )}
                        <div className="absolute top-3 right-3 z-10">
                          <Badge className={faculty.medium === "hindi" ? "bg-primary/90 text-white font-bold" : "bg-neutral-800/90 text-white font-bold"}>
                            {faculty.medium === "hindi" 
                              ? (locale === "hi" ? "हिंदी माध्यम" : "Hindi Medium")
                              : (locale === "hi" ? "अंग्रेजी माध्यम" : "English Medium")}
                          </Badge>
                        </div>
                      </div>

                      {/* Bio Details */}
                      <div className="p-5 space-y-2">
                        <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1 font-devanagari">
                          {name}
                        </h3>
                        <p className="text-xs font-bold text-primary tracking-wide uppercase line-clamp-1">
                          {title}
                        </p>
                        <p className={`text-xs text-muted-foreground leading-relaxed font-devanagari transition-all duration-300 ${
                          isExpanded ? "line-clamp-none" : "line-clamp-3"
                        }`}>
                          {desc}
                        </p>
                        {desc && desc.length > 70 && (
                          <button
                            type="button"
                            onClick={() => toggleExpand(faculty.id)}
                            className="pt-1 inline-flex items-center gap-1 text-xs font-bold text-primary hover:text-primary/80 transition-colors"
                          >
                            {isExpanded ? (
                              <>
                                {locale === "hi" ? "कम दिखाएं" : "Show Less"}
                                <ChevronUp className="h-3.5 w-3.5" />
                              </>
                            ) : (
                              <>
                                {locale === "hi" ? "और देखें..." : "See More..."}
                                <ChevronDown className="h-3.5 w-3.5" />
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 border border-dashed border-border/80 rounded-2xl bg-card">
              <Users className="h-12 w-12 text-muted-foreground/60 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-foreground">
                {locale === "hi" ? "कोई शिक्षक नहीं मिले" : "No Mentors Found"}
              </h3>
              <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">
                {locale === "hi"
                  ? "आपके खोज मानदंडों से मेल खाने वाला कोई फैकल्टी सदस्य नहीं मिला। कृपया पुनः प्रयास करें।"
                  : "We couldn't find any faculty members matching your search query. Please try again."}
              </p>
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
