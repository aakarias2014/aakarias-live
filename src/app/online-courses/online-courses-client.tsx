"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  BookOpen,
  Video,
  FileText,
  Download,
  Send,
  Plus,
  MessageSquare,
  Phone,
  GraduationCap,
  Calendar,
  Clock,
  Star,
  Users,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AnimatedSection } from "@/components/ui/animated-section";
import { siteConfig } from "@/lib/site-config";
import { coursesData } from "@/data/courses";
import { TrackedDownloadLink } from "@/components/content/tracked-download-link";
import { ArticleAdRotator } from "@/components/article/article-ad-rotator";



const categories = [
  { id: "all", label: "सभी कोर्सेज" },
  { id: "live", label: "लाइव क्लासेस" },
  { id: "upsc", label: "UPSC CSE" },
  { id: "mppsc", label: "MPPSC Special" },
  { id: "mpsi", label: "MPSI Special" },
];

const mentors = [
  {
    name: "डॉ. विकास सिंह",
    title: "Polity Expert",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD6a2DZgmjJ8x3fULvFtV8dwd6zoTgynm_iN7-GVWJ-Om4vZmilNrlWW3ei1Iq2b94dxD3auTixsXZdYn0Bf4bzdilI9VVJPSu6A7bD5SgKThGvIedTu9X5MNE_wbGBYB77kFE0GJzWRzrAAW0G1FossIu3kkh8S8hTfTXcAmldKzfI6CI6WvWwP-euJkwRTHMMMuaoLJbJuGGpuwkJ97prEDjyoiibx6LFoC46hnXOaZw-3TGhxtoCfRFwZuMIztXTxyFhKmnqX3U",
    desc: "",
  },
  {
    name: "अंजली शर्मा",
    title: "History Expert",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDLP6cpcghr5QsVBNYiRKF-1zEdRjnJoJcMmLHFpUCeE3nv7qTyyJoDQ8iyi-Q-ck1VJuet53EhHBqM0l_lyG3lCSPA-Lr-XNUlwA-aS45YZ-WbQu0hkv0kyTkSsH8PoWdHypxE8dAFG0a18OTKOUSyhDQvE7xYXMOxYoihEYdbT6RirowtguKqYyw_xOItJUrPllUz2HWA39egauU_84cDPPqfErbKxqk2bFrpl3Fh8NpfXUP3PLo5dXrJ_Coeb7LzhxoXWcQww2Y",
    desc: "",
  },
  {
    name: "आर. के. मिश्रा",
    title: "Economics Expert",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3gOnNPMFf68FoHrzRENHu6l4Cuqoy_nn9xWgNCVCWlR3f3u2sBRK6_TzBtVlieujXh8AXmpWRHvzviXYmcfQp7ZK-VA7TQCEVkNIlgxyjAGYF0ZcCYuHFW8CpMOQv7Lss5-NzS2Cv2141WSDDSPW72Cp3HNsWyjpCQBtuBj5nM_YS6nuozrvTNz3Jar16OOy1Uu6dqw1PrCFULOyd13DpRJl3tLhXEVpU2Ku3lVHdRroBcoEPJMX_oxrMBlO8euekVSCuvabl-7o",
    desc: "",
  },
  {
    name: "संदीप पटवा",
    title: "Geography Expert",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZVH9_YVZpm1cYFPrTgGgLSeYVWJPggL-9ubWFZanFtHoyLVPjC8prsSKYwYn0pmK7A_Kz3lZEUMXxlrnFAl4vGSvGpIIUyvWvVIxZNJ5hbJm4KvPb8VXSdkjNspdT3y-qomeCn1HiwEHzdPdvXUrsq-k8D0QjMkbZ7wKDlXZTcLJfLg-r5sq_2ql8yTDEd1SrhmAD8xzm01ACpw_-52RA4Agpkj27P3Gun8t4zJslsEqqIp__wRbdFQyVl7NVxYgdDbC5y9cRfzw",
    desc: "",
  },
];

const faqs = [
  {
    q: "क्या मैं वीडियो ऑफलाइन देख सकता हूँ?",
    a: "जी हाँ, आप हमारे मोबाइल ऐप पर वीडियो डाउनलोड करके उन्हें बिना इंटरनेट के भी देख सकते हैं।",
  },
  {
    q: "कोर्स की वैधता (Validity) कितनी है?",
    a: "अधिकतर फाउंडेशन कोर्सेस की वैधता 18 महीने तक होती है और अन्य कोर्सेस के अनुसार भिन्न हो सकती है।",
  },
  {
    q: "नोट्स किस भाषा में मिलेंगे?",
    a: "ऑनलाइन कोर्सेस में अध्ययन सामग्री और क्लास नोट्स मुख्य रूप से हिंदी और अंग्रेजी दोनों माध्यमों में अलग-अलग अथवा द्विभाषी (Bilingual) प्रदान की जाती है।",
  },
  {
    q: "आकार MPPSC ऑनलाइन क्लासेस की फीस क्या है?",
    a: "आकार आईएएस MPPSC ऑनलाइन कक्षाओं के लिए प्रतिस्पर्धी मूल्य प्रदान करता है। फीस कोर्स प्रकार के अनुसार अलग-अलग है — प्रीलिम्स, मेन्स, प्री+मेन्स फाउंडेशन, और टेस्ट सीरीज़। लचीली EMI और किस्त विकल्प भी उपलब्ध हैं। नवीनतम मूल्य के लिए हमारे काउंसलर से संपर्क करें।",
  },
  {
    q: "क्या आकर आईएएस अध्ययन सामग्री प्रदान करता है?",
    a: "हाँ, सभी ऑनलाइन कोर्स के छात्रों को व्यापक अध्ययन सामग्री मिलती है जिसमें डिजिटल PDF, करेंट अफेयर्स संकलन, पिछले वर्ष के प्रश्न बैंक और विषयवार नोट्स शामिल हैं — सभी Aakar IAS मोबाइल ऐप और स्टूडेंट पोर्टल के माध्यम से उपलब्ध हैं।",
  },
];

interface OnlineCoursesClientProps {
  faculties?: import("@/lib/content/types").Faculty[];
  onlineCourses?: import("@/lib/content/types").OnlineCourse[];
  brochureUrl?: string;
  ads?: any[];
}

export function OnlineCoursesClient({ faculties, onlineCourses, brochureUrl, ads }: OnlineCoursesClientProps) {
  const displayHindiMentors = faculties && faculties.filter(f => f.medium === "hindi").length > 0
    ? faculties.filter(f => f.medium === "hindi").map(f => ({
        name: f.nameHi || f.nameEn,
        title: f.titleHi || f.titleEn,
        desc: f.descHi || f.descEn,
        image: f.image
      }))
    : mentors;

  const displayEnglishMentors = faculties && faculties.filter(f => f.medium === "english").length > 0
    ? faculties.filter(f => f.medium === "english").map(f => ({
        name: f.nameHi || f.nameEn,
        title: f.titleHi || f.titleEn,
        desc: f.descHi || f.descEn,
        image: f.image
      }))
    : mentors;

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCat, setSelectedCat] = useState("all");

  const parsedCourses = onlineCourses && onlineCourses.length > 0
    ? onlineCourses.map((c) => ({
        id: c.id,
        slug: c.slug,
        title: c.titleHi || c.titleEn,
        category: c.category,
        image: c.image || "/images/placeholder.jpg",
        alt: c.altHi || c.titleHi || c.titleEn,
        badge: c.badgeHi || "",
        isLive: !!c.isLive,
        mentorName: c.mentorNameHi || c.mentorNameEn || "",
        mentorTitle: c.mentorTitleHi || c.mentorTitleEn || "",
        mentorImage: c.mentorImage || "/images/placeholder.jpg",
        price: c.price,
        originalPrice: c.originalPrice,
      }))
    : coursesData;

  const filteredCourses = parsedCourses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.mentorName.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (selectedCat === "all") return true;
    if (selectedCat === "live") return course.isLive;
    return course.category === selectedCat;
  });

  return (
    <div className="space-y-16 pb-24">
      {/* ─── Hero Section ────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-secondary text-secondary-foreground">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--primary)_0%,_transparent_50%)] opacity-20" />
        <Container size="wide" className="relative py-16 sm:py-24 lg:py-32">
          <AnimatedSection variant="scale-in" duration={0.8} className="mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/20 px-3 py-1.5 text-xs font-semibold text-white mb-6 uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5" /> Premium Online Learning
            </span>
            <h1 className="text-balance text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl font-devanagari">
              डिजिटल कक्षाएं &amp; ऑनलाइन कोर्सेज
            </h1>
            <p className="mt-6 text-pretty text-lg text-white/75 sm:text-xl max-w-2xl mx-auto font-devanagari">
              इंदौर और भारत के सर्वश्रेष्ठ शिक्षकों द्वारा लाइव और रिकॉर्डेड कक्षाएं। संपूर्ण पाठ्यक्रम कवरेज, दैनिक लाइव डाउट सेशन और व्यक्तिगत मार्गदर्शन।
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" asChild className="rounded-full bg-primary hover:bg-primary/95 text-white font-semibold">
                <a href="#courses">कोर्सेज देखें (Browse Courses)</a>
              </Button>
              {brochureUrl && (
                <TrackedDownloadLink
                  input={{
                    slug: "online-courses-general-brochure",
                    title: "Online Courses General Brochure",
                    kind: "brochure",
                    url: brochureUrl,
                  }}
                >
                  <Button variant="outline" size="lg" className="rounded-full border-white/20 text-white bg-transparent hover:bg-white/10 hover:text-white font-semibold gap-2">
                    <Download className="h-4 w-4" /> विवरणिका डाउनलोड करें
                  </Button>
                </TrackedDownloadLink>
              )}
              <Button variant="outline" size="lg" asChild className="rounded-full border-[#25D366]/40 text-white bg-transparent hover:bg-[#25D366]/10 hover:text-white font-semibold gap-2">
                <a href="https://wa.me/919713300123" target="_blank" rel="noopener noreferrer">
                  <span className="text-[#25D366] font-bold">WA</span> व्हाट्सएप हेल्पलाइन
                </a>
              </Button>
            </div>
          </AnimatedSection>
        </Container>
      </section>

      {/* ─── Search & Filters ────────────────────────────────────── */}
      <section id="courses" className="scroll-mt-24">
        <Container size="wide">
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
              <div className="relative max-w-2xl flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <input
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-muted/40 border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm placeholder:text-muted-foreground"
                  placeholder="कोर्स या शिक्षक का नाम खोजें..."
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Horizontal Filter Chips */}
              <div className="flex flex-wrap gap-2 overflow-x-auto pb-2 scrollbar-none">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCat(cat.id)}
                    className={`px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                      selectedCat === cat.id
                        ? "bg-primary text-white shadow-soft"
                        : "bg-muted/60 text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Content Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Courses Feed */}
              <div className="lg:col-span-8 space-y-8">
                {filteredCourses.length === 0 ? (
                  <div className="text-center py-16 border border-dashed border-border rounded-2xl">
                    <p className="text-muted-foreground font-medium">कोई कोर्स नहीं मिला। कृपया अपनी खोज बदलें।</p>
                  </div>
                ) : (
                  <div className="grid gap-6 sm:grid-cols-2">
                    {filteredCourses.map((course) => (
                      <Link key={course.id} href={`/online-courses/${course.slug}`} className="block">
                        <Card
                          className="overflow-hidden border border-border/60 hover:shadow-soft-lg transition-all duration-300 flex flex-col justify-between group h-full"
                        >
                          <div>
                            <div className="relative aspect-video w-full overflow-hidden bg-muted">
                              <Image
                                src={course.image}
                                alt={course.alt}
                                fill
                                className="object-cover group-hover:scale-102 transition-transform duration-500"
                                unoptimized
                              />
                              {course.badge && (
                                <span className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow-sm">
                                  {course.badge}
                                </span>
                              )}
                              {course.isLive && (
                                <span className="absolute top-4 right-4 bg-red-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow-sm animate-pulse flex items-center gap-1.5">
                                  <span className="h-1.5 w-1.5 bg-white rounded-full"></span> LIVE
                                </span>
                              )}
                            </div>

                            <div className="p-6 space-y-4">
                              <div className="flex items-center gap-2">
                                <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
                                  {course.category.toUpperCase()} Program
                                </span>
                              </div>
                              <h3 className="text-lg font-bold text-foreground leading-snug group-hover:text-primary transition-colors font-devanagari">
                                {course.title}
                              </h3>

                              {/* Mentor details */}
                              <div className="flex items-center gap-3 border-t border-border/40 pt-4">
                                <div className="relative h-9 w-9 rounded-full overflow-hidden shrink-0">
                                  <Image
                                    src={course.mentorImage}
                                    alt={course.mentorName}
                                    fill
                                    className="object-cover"
                                    unoptimized
                                  />
                                </div>
                                <div>
                                  <p className="text-xs font-bold text-foreground leading-none">{course.mentorName}</p>
                                  <p className="text-[10px] text-muted-foreground mt-1">{course.mentorTitle}</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="p-6 bg-muted/10 border-t border-border/30 flex items-center justify-between">
                            <div>
                              <span className="text-lg font-extrabold text-primary">{course.price}</span>
                              <span className="text-xs text-muted-foreground line-through ml-2">
                                {course.originalPrice}
                              </span>
                            </div>
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-primary">
                              विवरण देखें <ArrowRight className="h-3.5 w-3.5" />
                            </span>
                          </div>
                        </Card>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column: Sticky Sidebar */}
              <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
                {/* Important Resources */}
                <Card className="p-6 border border-border/60 shadow-sm space-y-4">
                  <h4 className="font-bold text-foreground flex items-center gap-2 border-b border-border/60 pb-3 font-devanagari">
                    <FileText className="h-5 w-5 text-primary" /> महत्वपूर्ण संसाधन
                  </h4>
                  <div className="space-y-2">
                    <a
                      className="flex items-center justify-between p-3 rounded-xl bg-muted/40 hover:bg-primary/5 hover:text-primary transition-colors text-sm"
                      href="#"
                    >
                      <span className="font-medium text-muted-foreground">Daily Current Affairs PDF</span>
                      <Download className="h-4 w-4" />
                    </a>
                    <a
                      className="flex items-center justify-between p-3 rounded-xl bg-muted/40 hover:bg-primary/5 hover:text-primary transition-colors text-sm"
                      href="#"
                    >
                      <span className="font-medium text-muted-foreground">UPSC Syllabus 2025</span>
                      <Download className="h-4 w-4" />
                    </a>
                    <a
                      className="flex items-center justify-between p-3 rounded-xl bg-muted/40 hover:bg-primary/5 hover:text-primary transition-colors text-sm"
                      href="#"
                    >
                      <span className="font-medium text-muted-foreground">MPPSC Previous Year Papers</span>
                      <Download className="h-4 w-4" />
                    </a>
                  </div>
                </Card>

                {/* Telegram CTA */}
                <div className="bg-primary text-white rounded-2xl p-6 shadow-md relative overflow-hidden space-y-4">
                  <div className="relative z-10 space-y-2">
                    <h4 className="text-xl font-bold font-devanagari">Telegram समुदाय से जुड़ें</h4>
                    <p className="text-xs text-white/80 leading-relaxed font-devanagari">
                      दैनिक क्विज़, नोट्स और अपडेट के लिए हमारे 50k+ छात्रों के परिवार का हिस्सा बनें।
                    </p>
                  </div>
                  <Button asChild className="w-full bg-white text-primary hover:bg-white/95 font-bold gap-2">
                    <a href={siteConfig.links.telegram} target="_blank" rel="noopener noreferrer">
                      Join Now <Send className="h-4 w-4" />
                    </a>
                  </Button>
                  {/* Decorative background shape */}
                  <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
                </div>

                {/* Stats Card */}
                <Card className="p-6 border border-border/60 shadow-sm text-center">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-3xl font-extrabold text-primary font-devanagari">500+</p>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Selections</p>
                    </div>
                    <div className="space-y-1 border-l border-border/60">
                      <p className="text-3xl font-extrabold text-primary font-devanagari">10k+</p>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Lectures</p>
                    </div>
                  </div>
                </Card>

                {ads && ads.length > 0 && (
                  <ArticleAdRotator ads={ads} locale="hi" />
                )}
              </aside>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── Faculty Members (Hindi Medium) ─────────────────────────── */}
      <section className="bg-muted/10 py-16">
        <Container size="wide">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-devanagari">
              हमारे वरिष्ठ मार्गदर्शक (Hindi Medium)
            </h2>
            <p className="mt-3 text-muted-foreground font-devanagari">
              सिविल सेवा परीक्षा के विशेषज्ञ शिक्षकों की टीम, जो आपके सपनों को हकीकत में बदलने में सक्षम है।
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {displayHindiMentors.map((fac, index) => (
              <Card key={index} className="overflow-hidden border border-border/80 bg-card hover:shadow-soft-lg transition-all duration-300 flex flex-col">
                <div className="relative aspect-square w-full bg-muted">
                  <Image
                    src={fac.image}
                    alt={fac.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h4 className="text-lg font-bold text-foreground leading-tight font-devanagari">
                      {fac.name}
                    </h4>
                    <span className="inline-block text-xs font-bold text-primary uppercase tracking-wider">
                      {fac.title}
                    </span>
                    {fac.desc && (
                      <p className="text-xs text-muted-foreground leading-relaxed pt-2 font-devanagari">
                        {fac.desc}
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── Faculty Members (English Medium) ───────────────────────── */}
      <section className="py-16 border-t border-b border-border/40">
        <Container size="wide">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-devanagari">
              हमारे वरिष्ठ मार्गदर्शक (English Medium)
            </h2>
            <p className="mt-3 text-muted-foreground font-devanagari">
              सिविल सेवा परीक्षा के विशेषज्ञ शिक्षकों की टीम, जो आपके सपनों को हकीकत में बदलने में सक्षम है।
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {displayEnglishMentors.map((fac, index) => (
              <Card key={index} className="overflow-hidden border border-border/80 bg-card hover:shadow-soft-lg transition-all duration-300 flex flex-col">
                <div className="relative aspect-square w-full bg-muted">
                  <Image
                    src={fac.image}
                    alt={fac.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h4 className="text-lg font-bold text-foreground leading-tight font-devanagari">
                      {fac.name}
                    </h4>
                    <span className="inline-block text-xs font-bold text-primary uppercase tracking-wider">
                      {fac.title}
                    </span>
                    {fac.desc && (
                      <p className="text-xs text-muted-foreground leading-relaxed pt-2 font-devanagari">
                        {fac.desc}
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── Download App Section ─────────────────────────────────── */}
      <section className="bg-primary/5 py-16">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            {/* Left: Text & Buttons */}
            <div className="space-y-6">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary uppercase tracking-wider">
                <Sparkles className="h-3.5 w-3.5 text-primary" /> Mobile &amp; Desktop App
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-devanagari">
                आकार आईएएस (Aakar IAS) ऐप डाउनलोड करें
              </h2>
              <p className="text-muted-foreground leading-relaxed font-devanagari">
                प्रीमियम सिविल सेवा परीक्षा तैयारी अनुभव अब आपके मोबाइल और डेस्कटॉप पर। कहीं भी, कभी भी अपनी गति से सीखें। लाइव क्लासेज, पीडीएफ नोट्स, टेस्ट सीरीज और ऑफलाइन वीडियो डाउनलोड सपोर्ट के साथ।
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Button asChild size="lg" className="rounded-xl bg-primary hover:bg-primary/95 text-white gap-2 font-bold shadow-soft">
                  <a href="/download">
                    <Download className="h-5 w-5" /> Android App
                  </a>
                </Button>
                <Button variant="outline" asChild size="lg" className="rounded-xl border-border hover:bg-muted text-foreground gap-2 font-bold shadow-sm">
                  <a href="/download">
                    <Download className="h-5 w-5" /> Windows / macOS
                  </a>
                </Button>
              </div>
            </div>

            {/* Right: Mockup Image */}
            <div className="relative aspect-video lg:aspect-square w-full max-w-md mx-auto overflow-hidden rounded-2xl border border-border/80 shadow-soft-lg group bg-muted">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6X5hPTQE7TIRcf3L11KB7y56qXbFaeomKG8c4nHDYIsVGs3QKMm2_aAscNtSFv20CgpY9XpYATXIYfmmuSHCUMl56kBnzGxfHrRfmwI8dLkPXdRDmr4BDuyGmXcDwzrkU42w99KBL7k0sOTaY1NMIa3YuPg3jlBLfPGdn7Co1X5V5L_jVc0sPKFeO7xtRjnrMzyKHm1c2I50VCQhlbJHBTntb01YcdU28zh4EJRzNeCXbVZ7urir1652x58N7Kh4XOsZwu5DzNx8"
                alt="Aakar IAS App Dashboard Mockup"
                fill
                className="object-cover group-hover:scale-102 transition-transform duration-500"
                unoptimized
              />
            </div>
          </div>
        </Container>
      </section>

      {/* ─── FAQ Section ─────────────────────────────────────────── */}
      <section>
        <Container size="wide">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-devanagari">
              सामान्य प्रश्न (FAQ)
            </h2>
            <p className="text-muted-foreground font-devanagari">
              ऑनलाइन कोर्सेज और डिजिटल कक्षाओं से संबंधित कुछ आम प्रश्न।
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group border border-border/60 rounded-xl overflow-hidden bg-card transition-all"
              >
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none select-none font-bold text-foreground text-sm hover:text-primary">
                  <span className="font-devanagari">{faq.q}</span>
                  <Plus className="h-5 w-5 text-primary shrink-0 transition-transform duration-300 group-open:rotate-45" />
                </summary>
                <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border/30 pt-4 font-devanagari">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── Bottom CTA ──────────────────────────────────────────── */}
      <section>
        <Container size="wide">
          <div className="relative rounded-3xl overflow-hidden bg-primary text-white p-8 md:p-16 text-center shadow-soft-lg">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-brand-accent)_0%,_transparent_60%)] opacity-10" />
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight font-devanagari">
                घर बैठे सिविल सेवा की तैयारी करें!
              </h2>
              <p className="text-white/80 text-base md:text-lg font-devanagari">
                हमारे ऑनलाइन फाउंडेशन बैच में प्रवेश लें और डिजिटल रूप से उत्कृष्टता प्राप्त करें।
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <Button asChild size="lg" className="rounded-full bg-white text-primary hover:bg-white/95 font-bold shadow-lg gap-2">
                  <a href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}>
                    <Phone className="h-4 w-4" /> अभी कॉल करें
                  </a>
                </Button>
                <Button asChild size="lg" className="rounded-full bg-[#25D366] text-white hover:bg-[#25D366]/95 font-bold shadow-lg gap-2 border-none">
                  <a href={siteConfig.links.whatsapp} target="_blank" rel="noopener noreferrer">
                    <MessageSquare className="h-4 w-4 fill-white" /> व्हाट्सएप हेल्प
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
