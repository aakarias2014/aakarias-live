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
  { id: "all", label: "All Courses" },
  { id: "live", label: "Live Classes" },
  { id: "upsc", label: "UPSC CSE" },
  { id: "mppsc", label: "MPPSC Special" },
  { id: "mpsi", label: "MPSI Special" },
];

const mentors = [
  {
    name: "Dr. Vikas Singh",
    title: "Polity Expert",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD6a2DZgmjJ8x3fULvFtV8dwd6zoTgynm_iN7-GVWJ-Om4vZmilNrlWW3ei1Iq2b94dxD3auTixsXZdYn0Bf4bzdilI9VVJPSu6A7bD5SgKThGvIedTu9X5MNE_wbGBYB77kFE0GJzWRzrAAW0G1FossIu3kkh8S8hTfTXcAmldKzfI6CI6WvWwP-euJkwRTHMMMuaoLJbJuGGpuwkJ97prEDjyoiibx6LFoC46hnXOaZw-3TGhxtoCfRFwZuMIztXTxyFhKmnqX3U",
    desc: "",
  },
  {
    name: "Anjali Sharma",
    title: "History Expert",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDLP6cpcghr5QsVBNYiRKF-1zEdRjnJoJcMmLHFpUCeE3nv7qTyyJoDQ8iyi-Q-ck1VJuet53EhHBqM0l_lyG3lCSPA-Lr-XNUlwA-aS45YZ-WbQu0hkv0kyTkSsH8PoWdHypxE8dAFG0a18OTKOUSyhDQvE7xYXMOxYoihEYdbT6RirowtguKqYyw_xOItJUrPllUz2HWA39egauU_84cDPPqfErbKxqk2bFrpl3Fh8NpfXUP3PLo5dXrJ_Coeb7LzhxoXWcQww2Y",
    desc: "",
  },
  {
    name: "R. K. Mishra",
    title: "Economics Expert",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3gOnNPMFf68FoHrzRENHu6l4Cuqoy_nn9xWgNCVCWlR3f3u2sBRK6_TzBtVlieujXh8AXmpWRHvzviXYmcfQp7ZK-VA7TQCEVkNIlgxyjAGYF0ZcCYuHFW8CpMOQv7Lss5-NzS2Cv2141WSDDSPW72Cp3HNsWyjpCQBtuBj5nM_YS6nuozrvTNz3Jar16OOy1Uu6dqw1PrCFULOyd13DpRJl3tLhXEVpU2Ku3lVHdRroBcoEPJMX_oxrMBlO8euekVSCuvabl-7o",
    desc: "",
  },
  {
    name: "Sandeep Patwa",
    title: "Geography Expert",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZVH9_YVZpm1cYFPrTgGgLSeYVWJPggL-9ubWFZanFtHoyLVPjC8prsSKYwYn0pmK7A_Kz3lZEUMXxlrnFAl4vGSvGpIIUyvWvVIxZNJ5hbJm4KvPb8VXSdkjNspdT3y-qomeCn1HiwEHzdPdvXUrsq-k8D0QjMkbZ7wKDlXZTcLJfLg-r5sq_2ql8yTDEd1SrhmAD8xzm01ACpw_-52RA4Agpkj27P3Gun8t4zJslsEqqIp__wRbdFQyVl7NVxYgdDbC5y9cRfzw",
    desc: "",
  },
];

const faqs = [
  {
    q: "Can I watch videos offline?",
    a: "Yes, you can download videos in our mobile app to watch them without an active internet connection.",
  },
  {
    q: "What is the validity of the course?",
    a: "Most foundation courses are valid for 18 months, and validity may vary depending on the course selected.",
  },
  {
    q: "In which language will notes be provided?",
    a: "For online courses, study materials and class notes are provided in both Hindi and English separately or in bilingual format depending on the batch.",
  },
  {
    q: "What is the fees of Aakar MPPSC online classes?",
    a: "Aakar IAS offers competitive pricing for MPPSC online classes. Fees vary by course type — Prelims, Mains, Pre+Mains Foundation, and Test Series each have different fee structures. Flexible EMI and installment options are also available. Contact our counselors for the latest pricing.",
  },
  {
    q: "Does Aakar IAS provide study materials?",
    a: "Yes, all online course students receive comprehensive study materials including digital PDFs, current affairs compilations, previous year question banks, and subject-wise notes — all accessible through the Aakar IAS mobile app and student portal.",
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
        name: f.nameEn || f.nameHi,
        title: f.titleEn || f.titleHi,
        desc: f.descEn || f.descHi,
        image: f.image
      }))
    : mentors;

  const displayEnglishMentors = faculties && faculties.filter(f => f.medium === "english").length > 0
    ? faculties.filter(f => f.medium === "english").map(f => ({
        name: f.nameEn || f.nameHi,
        title: f.titleEn || f.titleHi,
        desc: f.descEn || f.descHi,
        image: f.image
      }))
    : mentors;

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCat, setSelectedCat] = useState("all");

  const parsedCourses = onlineCourses && onlineCourses.length > 0
    ? onlineCourses.map((c) => ({
        id: c.id,
        slug: c.slug,
        title: c.titleEn || c.titleHi,
        category: c.category,
        image: c.image || "/images/placeholder.jpg",
        alt: c.altEn || c.titleEn || c.titleHi,
        badge: c.badgeEn || "",
        isLive: !!c.isLive,
        mentorName: c.mentorNameEn || c.mentorNameHi || "",
        mentorTitle: c.mentorTitleEn || c.mentorTitleHi || "",
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
            <h1 className="text-balance text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Digital Classes &amp; Online Courses
            </h1>
            <p className="mt-6 text-pretty text-lg text-white/75 sm:text-xl max-w-2xl mx-auto">
              Live and recorded sessions taught by top mentors from Indore and across India. Complete syllabus coverage, daily doubt-clearing sessions, and dedicated mentorship.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" asChild className="rounded-full bg-primary hover:bg-primary/95 text-white font-semibold">
                <a href="#courses">Browse Courses</a>
              </Button>
              {brochureUrl && (
                <TrackedDownloadLink
                  input={{
                    slug: "online-courses-general-brochure-en",
                    title: "Online Courses General Brochure (English)",
                    kind: "brochure",
                    url: brochureUrl,
                  }}
                >
                  <Button variant="outline" size="lg" className="rounded-full border-white/20 text-white bg-transparent hover:bg-white/10 hover:text-white font-semibold gap-2">
                    <Download className="h-4 w-4" /> Download Brochure
                  </Button>
                </TrackedDownloadLink>
              )}
              <Button variant="outline" size="lg" asChild className="rounded-full border-[#25D366]/40 text-white bg-transparent hover:bg-[#25D366]/10 hover:text-white font-semibold gap-2">
                <a href="https://wa.me/919713300123" target="_blank" rel="noopener noreferrer">
                  <span className="text-[#25D366] font-bold">WA</span> WhatsApp Helpline
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
                  placeholder="Search course or mentor name..."
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
                    <p className="text-muted-foreground font-medium">No courses found. Try adjusting your search.</p>
                  </div>
                ) : (
                  <div className="grid gap-6 sm:grid-cols-2">
                    {filteredCourses.map((course) => (
                      <Link key={course.id} href={`/en/online-courses/${course.slug}`} className="block">
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
                              <h3 className="text-lg font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
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
                              View Details <ArrowRight className="h-3.5 w-3.5" />
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
                  <h4 className="font-bold text-foreground flex items-center gap-2 border-b border-border/60 pb-3">
                    <FileText className="h-5 w-5 text-primary" /> Key Resources
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
                    <h4 className="text-xl font-bold">Join Telegram Community</h4>
                    <p className="text-xs text-white/80 leading-relaxed">
                      Become a part of our 50k+ students family for daily quizzes, notes and quick updates.
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
                      <p className="text-3xl font-extrabold text-primary">500+</p>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Selections</p>
                    </div>
                    <div className="space-y-1 border-l border-border/60">
                      <p className="text-3xl font-extrabold text-primary">10k+</p>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Lectures</p>
                    </div>
                  </div>
                </Card>

                {ads && ads.length > 0 && (
                  <ArticleAdRotator ads={ads} locale="en" />
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
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Our Senior Mentors (Hindi Medium)
            </h2>
            <p className="mt-3 text-muted-foreground">
              A team of expert civil services educators dedicated to turning your dreams into reality.
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
                    <h4 className="text-lg font-bold text-foreground leading-tight">
                      {fac.name}
                    </h4>
                    <span className="inline-block text-xs font-bold text-primary uppercase tracking-wider">
                      {fac.title}
                    </span>
                    {fac.desc && (
                      <p className="text-xs text-muted-foreground leading-relaxed pt-2">
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
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Our Senior Mentors (English Medium)
            </h2>
            <p className="mt-3 text-muted-foreground">
              A team of expert civil services educators dedicated to turning your dreams into reality.
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
                    <h4 className="text-lg font-bold text-foreground leading-tight">
                      {fac.name}
                    </h4>
                    <span className="inline-block text-xs font-bold text-primary uppercase tracking-wider">
                      {fac.title}
                    </span>
                    {fac.desc && (
                      <p className="text-xs text-muted-foreground leading-relaxed pt-2">
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
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Download Aakar IAS App
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Premium civil services exam preparation experience now on your mobile and desktop. Study anywhere, anytime at your own pace. With live classes, PDF notes, mock test series, and offline video download support.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Button asChild size="lg" className="rounded-xl bg-primary hover:bg-primary/95 text-white gap-2 font-bold shadow-soft">
                  <a href="/en/download">
                    <Download className="h-5 w-5" /> Android App
                  </a>
                </Button>
                <Button variant="outline" asChild size="lg" className="rounded-xl border-border hover:bg-muted text-foreground gap-2 font-bold shadow-sm">
                  <a href="/en/download">
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
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">
              Find answers to commonly asked questions about our online courses and system access.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group border border-border/60 rounded-xl overflow-hidden bg-card transition-all"
              >
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none select-none font-bold text-foreground text-sm hover:text-primary">
                  <span>{faq.q}</span>
                  <Plus className="h-5 w-5 text-primary shrink-0 transition-transform duration-300 group-open:rotate-45" />
                </summary>
                <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border/30 pt-4">
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
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                Prepare for Civil Services from Home!
              </h2>
              <p className="text-white/80 text-base md:text-lg">
                Join our premium online batch today and take your preparation to the next level.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <Button asChild size="lg" className="rounded-full bg-white text-primary hover:bg-white/95 font-bold shadow-lg gap-2">
                  <a href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}>
                    <Phone className="h-4 w-4" /> Call Us Now
                  </a>
                </Button>
                <Button asChild size="lg" className="rounded-full bg-[#25D366] text-white hover:bg-[#25D366]/95 font-bold shadow-lg gap-2 border-none">
                  <a href={siteConfig.links.whatsapp} target="_blank" rel="noopener noreferrer">
                    <MessageSquare className="h-4 w-4 fill-white" /> WhatsApp Help
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
