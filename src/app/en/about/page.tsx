import { getContentRepository } from "@/lib/content/content-repository";
import { PortableText } from "next-sanity";
import type { Metadata } from "next";
import { buildMetadata, formatDate } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/seo/json-ld";
import { faqJsonLd } from "@/lib/seo/jsonld";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumb } from "@/components/content/breadcrumb";
import { 
  Award, 
  Compass, 
  Eye, 
  Users, 
  Flag, 
  Brain, 
  BookOpen, 
  Globe, 
  ArrowRight, 
  ExternalLink,
  MessageSquare,
  Sparkles,
  ChevronRight,
  Briefcase,
  GraduationCap,
  UserCheck,
  Calendar,
  Rocket,
  Shield,
  Laptop,
  Trophy
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArticleAdRotator } from "@/components/article/article-ad-rotator";

export const metadata: Metadata = buildMetadata({
  title: "About Us",
  description: "Learn more about the story, mission, vision, and key achievements of Aakar IAS platform.",
  path: "/en/about",
});

export default async function EnglishAboutPage() {
  const repo = await getContentRepository();
  const [page, faculties, aboutConfig, latestArticles, ads] = await Promise.all([
    repo.getStaticPage("about", "en").catch(() => null),
    repo.listFaculties("en").catch(() => []),
    repo.getAboutPageConfig("en").catch(() => null),
    repo.listArticles({ locale: "en", contentType: "currentAffairs", page: 1, pageSize: 3 }).catch(() => null),
    repo.listAds("en").catch(() => []),
  ]);

  // Find director photos from faculty data
  const directorNames = ["Ashwini Kumar Mudgil", "Atharv Tiwari", "Gaurav Tiwari"];
  const directorImages: Record<string, string> = {};
  for (const faculty of faculties || []) {
    for (const name of directorNames) {
      if (faculty.nameEn.toLowerCase().includes(name.toLowerCase()) && faculty.image) {
        directorImages[name] = faculty.image;
      }
    }
  }

  return (
    <>
      {/* Page Header & Hero Section */}
      <Section className="relative overflow-hidden pb-12 pt-8 bg-gradient-to-b from-primary/5 via-transparent to-transparent">
        <Container size="wide">
          <Breadcrumb items={[{ name: "About Us", href: "/en/about" }]} />
          
          <div className="relative z-10 mt-12 max-w-4xl mx-auto text-center space-y-6">
            <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-primary bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20">
              <Sparkles className="h-3 w-3" /> ESTD. 2014
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl text-balance leading-tight">
              We don't just teach,<br />
              <span className="bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
                we shape dreams
              </span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground leading-relaxed">
              Aakar IAS is dedicated to transforming raw potential into elite civil servants through rigorous preparation, scientific analysis, and personalized mentorship.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <Link 
                href="/en/offline-courses" 
                className="inline-flex items-center gap-2 bg-primary text-on-primary px-8 py-3.5 rounded-xl font-semibold shadow-lg shadow-primary/20 hover:bg-primary/95 active:scale-[0.98] transition-all group"
              >
                Offline Courses
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link 
                href="/en/online-courses" 
                className="inline-flex items-center gap-2 border-2 border-primary text-primary px-8 py-3.5 rounded-xl font-semibold hover:bg-primary/5 active:scale-[0.98] transition-all group"
              >
                Online Courses
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* Main Layout Grid */}
      <Section className="pt-0">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative">
            
            {/* Sticky Sidebar Navigation */}
            <aside className="hidden lg:block lg:col-span-3">
              <div className="sticky top-28 space-y-6">
                <nav className="flex flex-col gap-1 p-5 bg-card border border-border/60 rounded-2xl shadow-soft">
                  <h4 className="font-mono text-xs font-bold text-primary tracking-wider uppercase mb-3 px-2">NAVIGATION</h4>
                  {[
                    { name: "Our Journey", href: "#story" },
                    { name: "Mission & Vision", href: "#mission" },
                    { name: "Why Aakar?", href: "#why-aakar" },
                    { name: "By The Numbers", href: "#stats" },
                    { name: "Our Directors", href: "#faculty" },
                    { name: "Success Stories", href: "#success" },
                    { name: "Campus Highlights", href: "#gallery" }
                  ].map((item) => (
                    <a 
                      key={item.href} 
                      href={item.href}
                      className="flex items-center justify-between px-3 py-2 text-sm font-medium text-muted-foreground rounded-lg hover:bg-muted hover:text-foreground transition-all group"
                    >
                      <span>{item.name}</span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                    </a>
                  ))}
                </nav>

                {latestArticles?.items && latestArticles.items.length > 0 && (
                  <div className="p-6 bg-gradient-to-br from-primary/10 to-accent/5 rounded-2xl border border-primary/10 shadow-soft">
                    <h4 className="font-mono text-xs font-bold text-primary tracking-wider uppercase mb-3">LATEST CURRENT AFFAIRS</h4>
                    <ul className="space-y-4">
                      {latestArticles.items.map((item) => (
                        <li key={item.id} className="group">
                          <span className="block font-mono text-[10px] text-muted-foreground">
                            {formatDate(item.date, "en")}
                          </span>
                          <Link href={item.href} className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {ads && ads.length > 0 && (
                  <ArticleAdRotator ads={ads} locale="en" />
                )}
              </div>
            </aside>

            {/* Main Content Content */}
            <div className="col-span-12 lg:col-span-9 space-y-20 pb-20">
              
              {/* Our Story / Our Journey (Timeline) */}
              <section id="story" className="scroll-mt-28 space-y-8">
                <div className="space-y-3 border-b border-border/60 pb-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-xs font-black font-mono text-red-600 dark:text-red-400 uppercase tracking-widest">
                    <Sparkles className="h-3.5 w-3.5" /> OUR JOURNEY
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                    Our Journey
                  </h2>
                  <p className="text-base sm:text-lg text-muted-foreground max-w-3xl leading-relaxed">
                    Starting from a humble effort, our journey has evolved into a story of trust and success for thousands of civil services aspirants.
                  </p>
                </div>

                {page && page.body && (
                  <div className="prose prose-aakar dark:prose-invert max-w-none pb-4 text-muted-foreground leading-relaxed">
                    <PortableText value={page.body} />
                  </div>
                )}

                {/* Timeline Container */}
                <div className="relative pl-6 sm:pl-10 md:pl-12 pt-2 pb-4 space-y-16 md:space-y-20">
                  {/* Timeline Continuous Gradient Line */}
                  <div 
                    className="absolute left-2.5 sm:left-4 md:left-5 top-3 bottom-3 w-0.5 bg-gradient-to-b from-red-500 via-primary to-red-500/20 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.3)]"
                    aria-hidden="true"
                  />

                  {/* Timeline Item 2014 */}
                  <div className="relative group transition-all duration-500">
                    {/* Node Dot */}
                    <div className="absolute -left-[23px] sm:-left-[31px] md:-left-[35px] top-2.5 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white dark:bg-zinc-900 border-2 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)] flex items-center justify-center transition-all duration-300 group-hover:scale-125 group-hover:border-red-600 group-hover:shadow-[0_0_20px_rgba(239,68,68,0.5)]">
                      <Rocket className="h-4 w-4 text-red-600 dark:text-red-400" />
                    </div>

                    {/* Card Content */}
                    <div className="bg-white dark:bg-card border border-border/80 rounded-2xl p-6 sm:p-8 shadow-soft hover:shadow-xl hover:border-red-500/40 transition-all duration-300 hover:-translate-y-1">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs sm:text-sm font-bold bg-[#FEE2E2] text-red-700 dark:bg-red-950/80 dark:text-red-300 border border-red-200/80 dark:border-red-800/40 shadow-xs mb-3">
                        2014
                      </span>
                      
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white leading-tight flex items-center gap-2.5 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                        <span>A Small Step, A Grand Beginning</span>
                      </h3>

                      <p className="text-base sm:text-[17px] leading-[1.9] text-gray-600 dark:text-zinc-300 mt-3.5">
                        Aakar IAS was <strong className="font-bold text-red-600 dark:text-red-400 hover:underline underline-offset-4 decoration-red-500/40 transition-all cursor-pointer">established in Indore</strong> with the vision to make Civil Services and State PSC preparation simple, structured, and high-quality. Started with humble resources but big dreams, this journey has grown into a <strong className="font-bold text-red-600 dark:text-red-400 hover:underline underline-offset-4 decoration-red-500/40 transition-all cursor-pointer">symbol of trust for thousands of aspirants</strong>.
                      </p>
                    </div>
                  </div>

                  {/* Timeline Item 2016 */}
                  <div className="relative group transition-all duration-500">
                    {/* Node Dot */}
                    <div className="absolute -left-[23px] sm:-left-[31px] md:-left-[35px] top-2.5 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white dark:bg-zinc-900 border-2 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)] flex items-center justify-center transition-all duration-300 group-hover:scale-125 group-hover:border-red-600 group-hover:shadow-[0_0_20px_rgba(239,68,68,0.5)]">
                      <Shield className="h-4 w-4 text-red-600 dark:text-red-400" />
                    </div>

                    {/* Card Content */}
                    <div className="bg-white dark:bg-card border border-border/80 rounded-2xl p-6 sm:p-8 shadow-soft hover:shadow-xl hover:border-red-500/40 transition-all duration-300 hover:-translate-y-1">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs sm:text-sm font-bold bg-[#FEE2E2] text-red-700 dark:bg-red-950/80 dark:text-red-300 border border-red-200/80 dark:border-red-800/40 shadow-xs mb-3">
                        2016
                      </span>
                      
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white leading-tight flex items-center gap-2.5 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                        <span>Strong Foundation of Trust</span>
                      </h3>

                      <p className="text-base sm:text-[17px] leading-[1.9] text-gray-600 dark:text-zinc-300 mt-3.5">
                        With exceptional teaching methodology, <strong className="font-bold text-red-600 dark:text-red-400 hover:underline underline-offset-4 decoration-red-500/40 transition-all cursor-pointer">experienced faculty</strong>, and exam-focused preparation, Aakar IAS carved a distinct identity among competitive exam aspirants in MP. <strong className="font-bold text-red-600 dark:text-red-400 hover:underline underline-offset-4 decoration-red-500/40 transition-all cursor-pointer">Regular tests, answer writing practice, and 1-on-1 mentorship</strong> began writing new success stories.
                      </p>
                    </div>
                  </div>

                  {/* Timeline Item 2020 */}
                  <div className="relative group transition-all duration-500">
                    {/* Node Dot */}
                    <div className="absolute -left-[23px] sm:-left-[31px] md:-left-[35px] top-2.5 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white dark:bg-zinc-900 border-2 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)] flex items-center justify-center transition-all duration-300 group-hover:scale-125 group-hover:border-red-600 group-hover:shadow-[0_0_20px_rgba(239,68,68,0.5)]">
                      <Laptop className="h-4 w-4 text-red-600 dark:text-red-400" />
                    </div>

                    {/* Card Content */}
                    <div className="bg-white dark:bg-card border border-border/80 rounded-2xl p-6 sm:p-8 shadow-soft hover:shadow-xl hover:border-red-500/40 transition-all duration-300 hover:-translate-y-1">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs sm:text-sm font-bold bg-[#FEE2E2] text-red-700 dark:bg-red-950/80 dark:text-red-300 border border-red-200/80 dark:border-red-800/40 shadow-xs mb-3">
                        2020
                      </span>
                      
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white leading-tight flex items-center gap-2.5 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                        <span>Digital Expansion in Education</span>
                      </h3>

                      <p className="text-base sm:text-[17px] leading-[1.9] text-gray-600 dark:text-zinc-300 mt-3.5">
                        Recognizing the need of the hour, Aakar IAS took a major leap into online education. High-quality education reached students nationwide through <strong className="font-bold text-red-600 dark:text-red-400 hover:underline underline-offset-4 decoration-red-500/40 transition-all cursor-pointer">Live Classes, Recorded Lectures, Digital Study Material</strong>, and <strong className="font-bold text-red-600 dark:text-red-400 hover:underline underline-offset-4 decoration-red-500/40 transition-all cursor-pointer">Online Test Series</strong>.
                      </p>
                    </div>
                  </div>

                  {/* Timeline Item 2024 */}
                  <div className="relative group transition-all duration-500">
                    {/* Node Dot */}
                    <div className="absolute -left-[23px] sm:-left-[31px] md:-left-[35px] top-2.5 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white dark:bg-zinc-900 border-2 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)] flex items-center justify-center transition-all duration-300 group-hover:scale-125 group-hover:border-red-600 group-hover:shadow-[0_0_20px_rgba(239,68,68,0.5)]">
                      <Sparkles className="h-4 w-4 text-red-600 dark:text-red-400" />
                    </div>

                    {/* Card Content */}
                    <div className="bg-white dark:bg-card border border-border/80 rounded-2xl p-6 sm:p-8 shadow-soft hover:shadow-xl hover:border-red-500/40 transition-all duration-300 hover:-translate-y-1">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs sm:text-sm font-bold bg-[#FEE2E2] text-red-700 dark:bg-red-950/80 dark:text-red-300 border border-red-200/80 dark:border-red-800/40 shadow-xs mb-3">
                        2024
                      </span>
                      
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white leading-tight flex items-center gap-2.5 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                        <span>New Heights with Innovation</span>
                      </h3>

                      <p className="text-base sm:text-[17px] leading-[1.9] text-gray-600 dark:text-zinc-300 mt-3.5">
                        Empowering thousands of aspirants through modern digital technology, <strong className="font-bold text-red-600 dark:text-red-400 hover:underline underline-offset-4 decoration-red-500/40 transition-all cursor-pointer">AI-driven learning tools</strong>, updated Current Affairs, top-grade study material, and a seamless <strong className="font-bold text-red-600 dark:text-red-400 hover:underline underline-offset-4 decoration-red-500/40 transition-all cursor-pointer">Hybrid Learning Model</strong>.
                      </p>
                    </div>
                  </div>

                  {/* Timeline Item 2026 */}
                  <div className="relative group transition-all duration-500">
                    {/* Node Dot */}
                    <div className="absolute -left-[23px] sm:-left-[31px] md:-left-[35px] top-2.5 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white dark:bg-zinc-900 border-2 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)] flex items-center justify-center transition-all duration-300 group-hover:scale-125 group-hover:border-red-600 group-hover:shadow-[0_0_20px_rgba(239,68,68,0.5)]">
                      <Trophy className="h-4 w-4 text-red-600 dark:text-red-400" />
                    </div>

                    {/* Card Content */}
                    <div className="bg-white dark:bg-card border border-border/80 rounded-2xl p-6 sm:p-8 shadow-soft hover:shadow-xl hover:border-red-500/40 transition-all duration-300 hover:-translate-y-1">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs sm:text-sm font-bold bg-[#FEE2E2] text-red-700 dark:bg-red-950/80 dark:text-red-300 border border-red-200/80 dark:border-red-800/40 shadow-xs mb-3">
                        2026
                      </span>
                      
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white leading-tight flex items-center gap-2.5 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                        <span>Steadfastly Moving Towards Success</span>
                      </h3>

                      <p className="text-base sm:text-[17px] leading-[1.9] text-gray-600 dark:text-zinc-300 mt-3.5">
                        Today, Aakar IAS stands as a <strong className="font-bold text-red-600 dark:text-red-400 hover:underline underline-offset-4 decoration-red-500/40 transition-all cursor-pointer">trusted institution for MPPSC, UPSC</strong>, MPSI, ESB, and other competitive exams. Our mission goes beyond clearing exams—we aim to unlock every student's <strong className="font-bold text-red-600 dark:text-red-400 hover:underline underline-offset-4 decoration-red-500/40 transition-all cursor-pointer">full potential and 1-on-1 guidance</strong>.
                      </p>
                    </div>
                  </div>

                </div>
              </section>

              {/* Mission & Vision Bento Cards */}
              <section id="mission" className="scroll-mt-28 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-8 md:p-10 bg-primary text-on-primary rounded-3xl shadow-lg shadow-primary/10 flex flex-col justify-between hover:-translate-y-1 transition-all duration-300">
                  <div className="space-y-6">
                    <div className="inline-flex p-3 rounded-2xl bg-white/10 text-white">
                      <Flag className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-bold">Our Mission</h3>
                    <p className="text-white/95 leading-relaxed text-sm md:text-base">
                      To democratize civil services preparation by providing world-class coaching, accurate study resources, and excellent mentorship to every dedicated aspirant, regardless of their background or economic status.
                    </p>
                  </div>
                </div>

                <div className="p-8 md:p-10 bg-card border border-border/80 rounded-3xl shadow-soft flex flex-col justify-between hover:-translate-y-1 transition-all duration-300">
                  <div className="space-y-6">
                    <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary">
                      <Eye className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">Our Vision</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                      To foster an administrative ecosystem built on ethical leadership and academic excellence, empowering administrative officers who can contribute positively to nation building.
                    </p>
                  </div>
                </div>
              </section>

              {/* Why Aakar */}
              <section id="why-aakar" className="scroll-mt-28 space-y-6">
                <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl border-b border-border/60 pb-3">
                  Why Aakar?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  <div className="p-6 bg-card rounded-2xl border border-border/60 shadow-soft hover:border-primary/40 hover:shadow-md transition-all">
                    <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary mb-4">
                      <Brain className="h-6 w-6" />
                    </div>
                    <h4 className="text-lg font-bold text-foreground mb-2">Personal Mentorship</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      One-on-one counseling and evaluation sessions with subject matter experts and former bureaucrats to sharpen your analytical writing.
                    </p>
                  </div>

                  <div className="p-6 bg-card rounded-2xl border border-border/60 shadow-soft hover:border-primary/40 hover:shadow-md transition-all">
                    <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary mb-4">
                      <BookOpen className="h-6 w-6" />
                    </div>
                    <h4 className="text-lg font-bold text-foreground mb-2">Structured Content</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Scientific analysis of previous 12 years' papers to create high-yield study material and target the changing exam pattern.
                    </p>
                  </div>

                  <div className="p-6 bg-card rounded-2xl border border-border/60 shadow-soft hover:border-primary/40 hover:shadow-md transition-all">
                    <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary mb-4">
                      <Globe className="h-6 w-6" />
                    </div>
                    <h4 className="text-lg font-bold text-foreground mb-2">Bilingual Excellence</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Top-tier study resources, mock tests, and classrooms available in both Hindi and English simultaneously.
                    </p>
                  </div>

                </div>
              </section>

              {/* Stats Section */}
              <section id="stats" className="scroll-mt-28 grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Selections", count: "2000+" },
                  { label: "Years Experience", count: "12+" },
                  { label: "Test Series Enrolled", count: "50k+" },
                  { label: "Expert Faculty", count: "50+" }
                ].map((stat, i) => (
                  <div key={i} className="p-6 bg-card border border-border/60 rounded-2xl shadow-soft text-center space-y-1">
                    <div className="text-3xl md:text-4xl font-extrabold text-primary">{stat.count}</div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{stat.label}</div>
                  </div>
                ))}
              </section>

              {/* Our Directors Section */}
              <section id="faculty" className="scroll-mt-28 space-y-8">
                <div className="border-b border-border/60 pb-3">
                  <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    Our Directors
                  </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column: Letter to Students */}
                  <div className="lg:col-span-7 bg-card border-2 border-primary/20 rounded-2xl p-6 sm:p-8 relative shadow-soft overflow-hidden">
                    {/* Quotation Icon Decorator */}
                    <div className="absolute top-6 right-6 text-primary/10 select-none pointer-events-none">
                      <span className="font-serif text-8xl leading-none">“</span>
                    </div>

                    <div className="space-y-6 relative z-10">
                      {/* Quote header */}
                      <div className="flex items-center gap-3">
                        <div className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-sm">
                          “
                        </div>
                        <h3 className="text-xl font-extrabold text-foreground">Dear Students,</h3>
                      </div>

                      {/* Letter Body */}
                      <div className="space-y-4 text-sm text-muted-foreground leading-relaxed text-justify">
                        <p>
                          Every young mind, just like yours, is a dreamer. They have dreams, wanting to be a successful person in life and achieve milestones. To fulfill these dreams, they choose a specific field. One such field is the <span className="font-extrabold text-foreground">field of Civil Services</span>.
                        </p>
                        <p>
                          For decades, this field has been the core of career and future building for aspirants. For civil services, competitive exams are organized by Union and State Public Service Commissions. Every year, lakhs of aspirants appear in these competitive exams, but the biggest obstacle before them is the lack of <span className="font-extrabold text-foreground">reliable guidance, quality study material, and technical understanding</span>.
                        </p>
                        <p>
                          Keeping in mind these problems faced by aspirants preparing for Union and State services exams, <span className="font-extrabold text-primary font-devanagari">'Aakar IAS'</span> has a team of the finest and experienced teachers, who provide complete and comprehensive preparation for the exams in a fixed timeframe through regular and intensive class programs.
                        </p>
                        <p>
                          For the past few years, the example of credibility, dedication, and dutifulness that <span className="font-extrabold text-primary font-devanagari">'Aakar IAS'</span> has presented among students preparing for state service exams, the institute is fully resolved and committed to maintaining it in the future as well.
                        </p>
                      </div>

                      {/* Signature */}
                      <div className="pt-4 border-t border-border/60 flex flex-col items-end text-right">
                        <span className="font-extrabold text-foreground text-base tracking-tight font-devanagari">'Aakar IAS'</span>
                        <span className="text-xs text-muted-foreground">Indore (M.P.)</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Directorate Team Card */}
                  <div className="lg:col-span-5 bg-card border border-border/60 rounded-2xl p-6 sm:p-8 shadow-soft text-center space-y-6 flex flex-col justify-between">
                    <div className="space-y-1">
                      <h3 className="text-xl font-extrabold text-foreground tracking-tight">Directorate Team</h3>
                      <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Leadership of Experienced Educators</p>
                    </div>

                    {/* Directors Grid inside Card */}
                    <div className="space-y-6">
                      {/* Top 2 directors */}
                      <div className="grid grid-cols-2 gap-4">
                        {/* Ashwini Kumar Mudgil */}
                        <div className="flex flex-col items-center space-y-2">
                          <div className="w-24 h-24 rounded-full border border-muted overflow-hidden shadow relative bg-gradient-to-br from-primary/10 to-accent/5 flex items-center justify-center">
                            {directorImages["Ashwini Kumar Mudgil"] ? (
                              <Image src={directorImages["Ashwini Kumar Mudgil"]} alt="Ashwini Kumar Mudgil" fill className="object-cover animate-fade-in" sizes="96px" />
                            ) : (
                              <GraduationCap className="h-10 w-10 text-primary/60" />
                            )}
                          </div>
                          <div>
                            <h4 className="text-sm font-extrabold text-foreground leading-tight">Ashwini Kumar Mudgil</h4>
                            <p className="text-[10px] text-muted-foreground font-semibold uppercase mt-0.5">Managing Director</p>
                          </div>
                        </div>

                        {/* Atharv Tiwari */}
                        <div className="flex flex-col items-center space-y-2">
                          <div className="w-24 h-24 rounded-full border border-muted overflow-hidden shadow relative bg-gradient-to-br from-primary/10 to-accent/5 flex items-center justify-center">
                            {directorImages["Atharv Tiwari"] ? (
                              <Image src={directorImages["Atharv Tiwari"]} alt="Atharv Tiwari" fill className="object-cover animate-fade-in" sizes="96px" />
                            ) : (
                              <GraduationCap className="h-10 w-10 text-primary/60" />
                            )}
                          </div>
                          <div>
                            <h4 className="text-sm font-extrabold text-foreground leading-tight">Atharv Tiwari</h4>
                            <p className="text-[10px] text-muted-foreground font-semibold uppercase mt-0.5">Director</p>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Center director */}
                      <div className="flex flex-col items-center space-y-2">
                        <div className="w-24 h-24 rounded-full border border-muted overflow-hidden shadow relative bg-gradient-to-br from-primary/10 to-accent/5 flex items-center justify-center">
                          {directorImages["Gaurav Tiwari"] ? (
                            <Image src={directorImages["Gaurav Tiwari"]} alt="Gaurav Tiwari" fill className="object-cover animate-fade-in" sizes="96px" />
                          ) : (
                            <GraduationCap className="h-10 w-10 text-primary/60" />
                          )}
                        </div>
                        <div>
                          <h4 className="text-sm font-extrabold text-foreground leading-tight">Gaurav Tiwari</h4>
                          <p className="text-[10px] text-muted-foreground font-semibold uppercase mt-0.5">Director</p>
                        </div>
                      </div>
                    </div>

                    {/* Book Appointment CTA */}
                    <div className="pt-4 border-t border-border/60 space-y-3">
                      <p className="text-xs text-muted-foreground">Connect directly with the directors</p>
                      <Button asChild className="w-full rounded-xl bg-primary text-primary-foreground hover:bg-primary/95 font-bold shadow-md gap-2 py-3 text-xs">
                        <Link href={`https://wa.me/919713300123?text=${encodeURIComponent("Hello Aakar IAS, I want to book an appointment with the directors.")}`} target="_blank" rel="noopener noreferrer">
                          <Calendar className="h-4 w-4" /> Book Appointment
                        </Link>
                      </Button>
                    </div>
                  </div>

                </div>
              </section>

              {/* Success Stories */}
              <section id="success" className="scroll-mt-28 space-y-6">
                <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl border-b border-border/60 pb-3">
                  Success Stories
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {(aboutConfig?.testimonials && aboutConfig.testimonials.length > 0
                    ? aboutConfig.testimonials
                    : [
                        { nameHi: "राहुल शर्मा (Rahul Sharma)", nameEn: "Rahul Sharma", examHi: "AIR 42, UPSC CSE 2022", examEn: "AIR 42, UPSC CSE 2022", quoteHi: "आकार आईएएस की व्यक्तिगत मेंटरशिप कार्यक्रम मेरी तैयारी का सबसे महत्वपूर्ण मोड़ साबित हुआ। विशेष रूप से हिंदी माध्यम के उम्मीदवारों के लिए इनका उत्कृष्ट कंटेंट और सटीक मार्गदर्शन लाज़वाब है।", quoteEn: "Aakar's personalized mentorship program was the turning point in my preparation. The focus on high-yield content and exact structure of writing answers is unparalleled.", avatar: "" },
                        { nameHi: "प्रिया गुप्ता (Priya Gupta)", nameEn: "Priya Gupta", examHi: "AIR 115, UPSC CSE 2023", examEn: "AIR 115, UPSC CSE 2023", quoteHi: "आकार की मुख्य परीक्षा टेस्ट सीरीज वास्तविक एग्जाम हॉल के वातावरण और प्रेशर को हूबहू दर्शाती है। विस्तृत इवैल्यूएशन और कॉपियों के फीडबैक ने मुख्य परीक्षा में मेरे स्कोर को बेहतर बनाने में बहुत मदद की।", quoteEn: "The mains test series at Aakar Academy mimics the real exam pressure perfectly. The detailed evaluations and copywriting feedback built my confidence for the big day.", avatar: "" },
                      ]
                  ).map((t, i) => {
                    const initials = (t.nameEn || t.nameHi).split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
                    return (
                      <div key={i} className="p-6 md:p-8 bg-muted/30 border border-border/60 rounded-2xl italic relative space-y-4">
                        <MessageSquare className="absolute right-6 top-6 h-10 w-10 text-primary/10" />
                        <p className="text-foreground/90 text-sm md:text-base leading-relaxed">
                          &quot;{t.quoteEn || t.quoteHi}&quot;
                        </p>
                        <div className="flex items-center gap-3 pt-2">
                          {t.avatar ? (
                            <div className="w-10 h-10 rounded-full overflow-hidden relative">
                              <Image src={t.avatar} alt={t.nameEn || t.nameHi} fill className="object-cover" sizes="40px" />
                            </div>
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary text-sm">
                              {initials}
                            </div>
                          )}
                          <div>
                            <div className="font-bold text-foreground text-sm">{t.nameEn || t.nameHi}</div>
                            <div className="text-xs text-muted-foreground">{t.examEn || t.examHi}</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Campus Gallery */}
              <section id="gallery" className="scroll-mt-28 space-y-6">
                <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl border-b border-border/60 pb-3">
                  Campus Highlights
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  {(aboutConfig?.galleryImages && aboutConfig.galleryImages.length > 0
                    ? aboutConfig.galleryImages
                    : [
                        { image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCWkbljz_U_Yg3A-qVn9o4nd-9SBgE1gtiHrauDragpsMgpGOLE9KNrpQGdooyg-uAfq3xoXnVVlu061irDS77Tj51kLzobRGSl-xF2pykLWDRnjtHypDvIlNfJ5XjK4gdtEfYTEA17bLwWtxqxGC50XJBlvPVvhFlxTFObDseqY3hlhFMtCll7Ko-syOJ8RP3h6vM22d2REj6iD45dpBK03wusgUdRXA_DiZPTiAj3GSqWkiII3futNm-Tb74Fuqc35OcWoKTKrbA", captionHi: "डिजिटल क्लासरूम और इंटरैक्टिव शिक्षा व्यवस्था", captionEn: "Digital classrooms and interactive learning environment", layout: "large" as const },
                        { image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDGYMVCka8tCXwt0cmgtnTp5f6EEJL5aCF4a8jgHSxFbgsiarFBiFCVXj2vVkmXTu26irKBRgrZ2q4JMRKF413-wSt9PvhXgilsucnPmkQUt0J-lL11kPvgCuwl6r7Dc92nbxrqDloOsZMK5-yT2rMtSe0-cHjF3PRmuquR9tX2Sg0DeA9ewENaAxWAP8QOTN-Xy_t5KC59vanFrSkq5XVmpHSZ2ppZ4XB2qXMs3mYVBgrS7O555CUyORW06Q8mGsUtBR4nOk-rUvg", captionHi: "सुव्यवस्थित शांत अध्ययन पुस्तकालय", captionEn: "Quiet study spaces and academic reference books", layout: "small" as const },
                        { image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCIe6yL4aiZXGkDkrj-e4gRwmBS3Bik42Raw3tyMRPyHLsPpgGcT4tFTnF3kYoCzew6XSbyhyiXnyfe8BvyOIyW25UOzHNMPmdMP349pbAnwq4pfWI865BLFlqidaUAVxNw8IT-aS0NHpH1ITQiOm1ke-eiaMqiPf0r8kKLfA-1Wa7OZ-Cxxfd43M4zwoUoN318AeFfZOYl3oKVwu-DuCu_HvNqnCXRNhFlG1K3y52Vx_a1beMHZ6bVHvQ9nE4H10oZ6pknLXMzU-Q", captionHi: "व्यक्तिगत मेंटरशिप और डाउट क्लीयरिंग सेशन", captionEn: "Personal guidance and interactive counseling sessions", layout: "full" as const },
                      ]
                  ).map((g, i) => {
                    const colSpan = g.layout === "full" ? "md:col-span-12" : g.layout === "small" ? "md:col-span-4" : "md:col-span-8";
                    const aspectClass = g.layout === "full" ? "aspect-[21/9] hidden md:block" : g.layout === "small" ? "aspect-square md:aspect-auto" : "aspect-[16/10]";
                    return (
                      <div key={i} className={`${colSpan} rounded-2xl overflow-hidden bg-muted border border-border/60 ${aspectClass} relative group`}>
                        <Image 
                          src={g.image} 
                          alt={g.captionEn || g.captionHi} 
                          fill
                          className="object-cover group-hover:scale-105 transition-all duration-700" 
                          sizes={g.layout === "full" ? "100vw" : g.layout === "small" ? "(max-width: 768px) 100vw, 33vw" : "(max-width: 768px) 100vw, 66vw"}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                          <p className="text-white font-medium text-sm">{g.captionEn || g.captionHi}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Large CTA Section */}
              <section className="p-8 md:p-12 bg-foreground text-background rounded-3xl relative overflow-hidden shadow-xl">
                <div className="relative z-10 max-w-2xl space-y-6">
                  <h2 className="text-3xl font-extrabold tracking-tight leading-tight sm:text-4xl text-background">
                    Ready to shape your success?
                  </h2>
                  <p className="text-muted opacity-90 leading-relaxed text-sm md:text-base">
                    Join the next batch of future civil servants. Secure your personalized counseling session today and accelerate your preparation.
                  </p>
                  <div className="flex flex-wrap gap-4 pt-2">
                    <Link 
                      href="/en/contact" 
                      className="bg-primary text-on-primary px-8 py-3.5 rounded-xl font-semibold shadow-lg hover:bg-primary/95 transition-all text-sm"
                    >
                      Book Counseling
                    </Link>
                    <Link 
                      href="/en/download" 
                      className="border border-border/40 text-background px-8 py-3.5 rounded-xl font-semibold hover:bg-background/10 transition-all text-sm"
                    >
                      Download Brochure
                    </Link>
                  </div>
                </div>
              </section>

            </div>

          </div>
        </Container>
      </Section>

      {/* ─── FAQ Section (Google PAA) ──────────────────────────────── */}
      <Section className="bg-muted/20">
        <Container size="narrow">
          <h2 className="text-2xl font-extrabold text-foreground border-l-4 border-primary pl-4 mb-6">
            Frequently Asked Questions about Aakar IAS
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "Who is the owner of Aakar IAS?",
                a: "Aakar IAS is led and managed by its Board of Directors: Mr. Ashwini Kumar Mudgal (Managing Director), Mr. Atharv Tiwari (Director), and Mr. Gaurav Tiwari (Director). Under their vision and experienced leadership, the academy has become one of the most trusted MPPSC and UPSC coaching centers in Indore, Madhya Pradesh."
              },
              {
                q: "Does Aakar IAS provide study materials?",
                a: "Yes, Aakar IAS provides comprehensive study materials including printed notes, digital PDFs, current affairs magazines, previous year question papers, and subject-wise booklets. All materials are designed specifically for MPPSC and UPSC syllabi and are regularly updated by our expert faculty."
              },
              {
                q: "What is the Aakar IAS app?",
                a: "The Aakar IAS app is our official mobile application available on Android and iOS. It provides access to live and recorded video lectures, daily current affairs, test series, study PDFs, and performance analytics — enabling students to prepare for MPPSC and UPSC from anywhere."
              },
              {
                q: "Which is the best online coaching for MPPSC in Indore?",
                a: "Aakar IAS is widely regarded as one of the best MPPSC coaching institutes in Indore. With 5,000+ enrolled students, our team of expert faculty, comprehensive study material, regular test series, and both online and offline modes, Aakar IAS offers a complete preparation ecosystem for MPPSC aspirants."
              },
            ].map((faq, i) => (
              <details
                key={i}
                className="group bg-card border border-border rounded-xl p-5 [&_summary::-webkit-details-marker]:hidden cursor-pointer"
              >
                <summary className="flex justify-between items-center list-none select-none font-bold text-foreground text-base">
                  <span className="group-hover:text-primary transition-colors pr-4">{faq.q}</span>
                  <span className="text-primary font-light text-2xl transition-transform duration-200 group-open:rotate-45">+</span>
                </summary>
                <div className="text-muted-foreground text-sm leading-relaxed mt-3 pt-3 border-t border-border/60 animate-in fade-in slide-in-from-top-2">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </Container>
      </Section>

      {/* FAQ JSON-LD for SEO */}
      <JsonLd data={faqJsonLd([
        { question: "Who is the owner of Aakar IAS?", answer: "Aakar IAS is led and managed by its Board of Directors: Mr. Ashwini Kumar Mudgal (Managing Director), Mr. Atharv Tiwari (Director), and Mr. Gaurav Tiwari (Director). Under their vision and experienced leadership, the academy has become one of the most trusted MPPSC and UPSC coaching centers in Indore, Madhya Pradesh." },
        { question: "Does Aakar IAS provide study materials?", answer: "Yes, Aakar IAS provides comprehensive study materials including printed notes, digital PDFs, current affairs magazines, previous year question papers, and subject-wise booklets. All materials are designed specifically for MPPSC and UPSC syllabi and are regularly updated by our expert faculty." },
        { question: "What is the Aakar IAS app?", answer: "The Aakar IAS app is our official mobile application available on Android and iOS. It provides access to live and recorded video lectures, daily current affairs, test series, study PDFs, and performance analytics — enabling students to prepare for MPPSC and UPSC from anywhere." },
        { question: "Which is the best online coaching for MPPSC in Indore?", answer: "Aakar IAS is widely regarded as one of the best MPPSC coaching institutes in Indore. With 5,000+ enrolled students, our team of expert faculty, comprehensive study material, regular test series, and both online and offline modes, Aakar IAS offers a complete preparation ecosystem for MPPSC aspirants." },
      ])} />
    </>
  );
}
