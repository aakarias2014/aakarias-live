import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Smartphone,
  Monitor,
  Laptop,
  Video,
  PlayCircle,
  FileDown,
  FileText,
  MessageSquare,
  WifiOff,
  TrendingUp,
  Calendar,
  Download,
  ArrowRight,
  Send,
  BookOpen,
  LucideIcon
} from "lucide-react";

import { getContentRepository } from "@/lib/content/content-repository";
import { buildMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/site-config";
import { AppFeature, FAQ } from "@/lib/content/types";
import { Section } from "@/components/layout/section";
import { Breadcrumb } from "@/components/content/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Newsletter } from "@/components/content/newsletter";

import * as Icons from "lucide-react";

export const revalidate = 900; // 15 min ISR

export const metadata: Metadata = buildMetadata({
  title: "Download App",
  description: "Download Aakar IAS premium mobile and desktop apps. Available for Android, Windows, and macOS.",
  path: "/en/download",
});

export default async function EnglishDownloadPage() {
  const repo = await getContentRepository();
  const [latestCa, pdfs, dbConfig] = await Promise.all([
    repo.listArticles({ locale: "en", page: 1, pageSize: 3 }),
    repo.listMonthlyPdfs("en", undefined, 1),
    repo.getDownloadPageConfig("en"),
  ]);

  const latestPdf = pdfs[0];

  // Dynamically resolve play store and app store URLs from Sanity CMS configuration
  const playStoreUrl = dbConfig?.playStoreUrl || siteConfig.links.whatsapp;
  const appStoreUrl = dbConfig?.appStoreUrl || siteConfig.links.whatsapp;
  const windowsUrl = dbConfig?.windowsUrl || siteConfig.links.whatsapp;
  const macIntelUrl = dbConfig?.macIntelUrl || siteConfig.links.whatsapp;
  const macSiliconUrl = dbConfig?.macSiliconUrl || siteConfig.links.whatsapp;
  const appVersion = dbConfig?.appVersion || "2.4";

  const defaultFeatures = [
    { icon: Video, title: "Live Classes", desc: "Daily interactive live sessions by experts" },
    { icon: PlayCircle, title: "Recorded Lectures", desc: "Saved sessions for unlimited revisions" },
    { icon: FileDown, title: "Premium PDFs", desc: "Detailed study notes & monthly current affairs magazines" },
    { icon: FileText, title: "Test Series", desc: "Mock test papers for Prelims and Mains" },
    { icon: MessageSquare, title: "Doubt Clearing", desc: "One-to-one doubt clearing sessions with faculty" },
    { icon: WifiOff, title: "Offline Access", desc: "Watch videos and download material for offline study" },
    { icon: TrendingUp, title: "Performance Stats", desc: "AI-driven detailed progress reports" },
    { icon: Calendar, title: "Class Schedules", desc: "Real-time timetable updates & alerts" },
  ];

  const features = dbConfig?.features?.length
    ? dbConfig.features.map((f: AppFeature) => {
        const IconComponent = (Icons as unknown as Record<string, LucideIcon>)[f.icon] || Icons.Smartphone;
        return {
          icon: IconComponent,
          title: f.title,
          desc: f.desc,
        };
      })
    : defaultFeatures;

  const installationSteps = [
    {
      step: "1",
      title: "Download File",
      desc: "Download the installation file matching your operating system from the options above.",
    },
    {
      step: "2",
      title: "Install App",
      desc: "Install the downloaded file on your device (run the installer package).",
    },
    {
      step: "3",
      title: "Login",
      desc: "Log in using your registered mobile number or email address.",
    },
    {
      step: "4",
      title: "Access Dashboard",
      desc: "Get immediate access to your customized study material, live classes, and courses.",
    },
  ];

  const defaultFaqs = [
    {
      q: "Is the app completely free?",
      a: "Yes, downloading the app is completely free. We provide a selection of free foundation courses, daily current affairs, and notes. Premium structured test series and batches require a separate enrollment fee."
    },
    {
      q: "Can I watch videos offline?",
      a: "Yes, our app supports offline downloads. You can save class lectures and PDF notes within the app storage to watch or read later without an active internet connection."
    },
    {
      q: "Does it support iPad or Tablets?",
      a: "Yes, the Aakar IAS application is fully optimized for iPads, Android tablets, and Chromebooks, offering a comfortable, large-screen study interface."
    }
  ];

  const faqs = dbConfig?.faqs?.length
    ? dbConfig.faqs.map((f: FAQ) => ({ q: f.question, a: f.answer }))
    : defaultFaqs;

  const defaultScreenshots = [
    {
      alt: "Dashboard UI Preview",
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuC6X5hPTQE7TIRcf3L11KB7y56qXbFaeomKG8c4nHDYIsVGs3QKMm2_aAscNtSFv20CgpY9XpYATXIYfmmuSHCUMl56kBnzGxfHrRfmwI8dLkPXdRDmr4BDuyGmXcDwzrkU42w99KBL7k0sOTaY1NMIa3YuPg3jlBLfPGdn7Co1X5V5L_jVc0sPKFeO7xtRjnrMzyKHm1c2I50VCQhlbJHBTntb01YcdU28zh4EJRzNeCXbVZ7urir1652x58N7Kh4XOsZwu5DzNx8"
    },
    {
      alt: "Dark Mode Lecture Player",
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDHFdF8W2838h0Td00OKxa9Bz9bddpiDBSD6Z98kF8vE7Yb8P4Ygmzy5SoG4cvhslBNbLOPrJ2K8hk25RTcfoXM_EREkSZa5EMI6VJnWcF9mYOYERJ6wFP7tdXwxxAbjE3xqtjOyO9uELnF8kUPgJ8Dnq8SENB0LOj2Dk602RFDVoKFzxPeiR_i8NOiMQR0z9k2KC_4cZcZEOA4eyf72Ky0kocE748l-1lClQueI22JTVVEX8LoTLAvXtU0AeJEJeyLEoobkV7NRtA"
    },
    {
      alt: "PDF Reader View",
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuC79Y7TaZhuihmzQX3_bBWAYqgiYby5YP7GbBLOMzsC9D2aBRNJaVJ4y_qoPvCVLvooH6YC40w_2SfUUz955GIvaE3k7gyHrTzELZhpe1x9AGQ8Y7zfgnU7Rnx3YnQdLMySUReGU3flovXc-vhrXJxEiqGlItgUGgHDCYoXGPDU3y8y8WbOioVMFJBWkNFpR-u6Xz-g_EvCHJl7dtiGhvZ05n3LBifEfcKDkWrYlBE-gwvatm4g9jiOkjgX7m90B5oHiDfunlWqop8"
    }
  ];

  const screenshots = dbConfig?.screenshots?.length
    ? dbConfig.screenshots.map((url: string, idx: number) => ({ alt: `App Preview ${idx + 1}`, url }))
    : defaultScreenshots;

  return (
    <div className="w-full overflow-x-hidden">
      {/* ─── Page Header ────────────────────────────────────────── */}
      <Section className="pb-0 pt-8" containerSize="wide">
        <Breadcrumb items={[{ name: "App Download" }]} />
        <div className="mt-6">
          <h1 className="text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Download Aakar IAS App
          </h1>
          <p className="mt-2 max-w-3xl text-lg text-muted-foreground">
            Premium Civil Services preparation resources now available on mobile and desktop.
          </p>
        </div>
      </Section>

      {/* ─── Responsive Content Area ────────────────────────────── */}
      <Section className="pb-16 pt-8" containerSize="wide">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Left Column (Main download area) */}
          <div className="lg:col-span-2 space-y-12 overflow-x-hidden">
            
            {/* MOBILE ONLY LAYOUT (Stitch Design) */}
            <div className="block lg:hidden space-y-10">
              {/* Mobile Hero */}
              <div className="text-center relative py-8 px-4 overflow-hidden rounded-3xl bg-primary/5 border border-primary/10">
                <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-50" />
                <div className="absolute top-48 -right-24 w-80 h-80 bg-accent/10 rounded-full blur-3xl opacity-50" />
                <div className="relative z-10">
                  <span className="inline-block py-1 px-3 mb-4 bg-primary/15 text-primary rounded-full text-xs font-mono font-bold uppercase tracking-wider">
                    Version {appVersion} Available
                  </span>
                  <h2 className="text-3xl font-black mb-3 text-foreground leading-tight">
                    Shape Your <span className="text-primary">Preparation</span>
                  </h2>
                  <p className="text-sm text-muted-foreground max-w-xs mx-auto mb-6">
                    Download Aakar IAS app now for the best preparation of UPSC and State PSC exams.
                  </p>
                  <div className="flex flex-col gap-2 items-center">
                    <Button className="w-full max-w-xs bg-primary hover:bg-primary/95 text-primary-foreground py-6 rounded-full text-base font-bold shadow-lg shadow-primary/20 flex items-center justify-center gap-2" asChild>
                      <a href={playStoreUrl} target="_blank" rel="noopener noreferrer">
                        <Download className="h-5 w-5" /> Download Now
                      </a>
                    </Button>
                    <p className="text-[10px] text-muted-foreground font-mono">Available for Android & iOS</p>
                  </div>
                </div>
              </div>

              {/* Mobile Download Cards Stack */}
              <div className="space-y-4">
                <a href={playStoreUrl} target="_blank" rel="noopener noreferrer" className="bg-card p-5 rounded-2xl flex items-center justify-between border border-border/80 shadow-soft hover:shadow-soft-lg hover:border-primary/20 transition-all cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                      <Smartphone className="h-6 w-6" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-bold text-base text-foreground">Google Play</h3>
                      <p className="text-xs text-muted-foreground">Android 8.0+</p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-primary group-hover:translate-x-1 transition-transform" />
                </a>

                <a href={appStoreUrl} target="_blank" rel="noopener noreferrer" className="bg-card p-5 rounded-2xl flex items-center justify-between border border-border/80 shadow-soft hover:shadow-soft-lg hover:border-primary/20 transition-all cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-secondary/10 text-secondary dark:bg-muted/40 dark:text-foreground rounded-full flex items-center justify-center">
                      <Smartphone className="h-6 w-6" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-bold text-base text-foreground">App Store</h3>
                      <p className="text-xs text-muted-foreground">iOS 14.0+</p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-primary group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Mobile Features Grid */}
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-foreground text-center">Key Features</h2>
                <div className="grid grid-cols-2 gap-4">
                  {features.map((f, idx) => (
                    <div key={idx} className="bg-muted/30 p-4 rounded-2xl flex flex-col gap-3">
                      <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                        <f.icon className="h-5 w-5" />
                      </div>
                      <h4 className="font-bold text-sm">{f.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* DESKTOP ONLY HERO & DOWNLOAD CARDS */}
            <div className="hidden lg:block space-y-12">
              {/* Desktop Hero Banner */}
              <AnimatedSection variant="fade-up" className="relative overflow-hidden rounded-3xl bg-secondary text-secondary-foreground p-8 md:p-12 shadow-soft">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--primary)_0%,_transparent_60%)] opacity-20" />
                <div className="relative z-10 space-y-4 max-w-2xl">
                  <h2 className="text-balance text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                    Read Anywhere, Anytime
                  </h2>
                  <p className="text-pretty text-white/80 leading-relaxed text-base">
                    Elevate your preparation with Aakar IAS. Our premium learning application is now available for Android and Desktop (Windows/macOS). Stay ahead with high-quality study materials and live classes.
                  </p>
                </div>
              </AnimatedSection>

              {/* Desktop Platform Grid */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-foreground">Choose Platform</h3>
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
                  {/* Android Card */}
                  <Card className="p-6 flex flex-col items-center justify-between text-center border-primary/25 border-2 bg-primary/5 shadow-soft hover:shadow-soft-lg hover:border-primary/45 hover:-translate-y-1 transition-all duration-300 group">
                    <div className="w-14 h-14 bg-primary/15 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-primary">
                      <Smartphone className="h-7 w-7" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-foreground text-base">Android</h4>
                      <p className="text-xs text-muted-foreground mt-1">Install from Google Play</p>
                    </div>
                    <Button className="mt-6 w-full rounded-full bg-primary hover:bg-primary/95 text-primary-foreground font-bold shadow-soft" asChild>
                      <a href={playStoreUrl} target="_blank" rel="noopener noreferrer">
                        <Download className="mr-1.5 h-3.5 w-3.5" /> Google Play
                      </a>
                    </Button>
                  </Card>

                  {/* Windows Card */}
                  <Card className="p-6 flex flex-col items-center justify-between text-center border-border/80 shadow-soft hover:shadow-soft-lg hover:border-primary/20 hover:-translate-y-1 transition-all duration-300 group">
                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-primary">
                      <Monitor className="h-7 w-7" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-foreground text-base">Windows</h4>
                      <p className="text-xs text-muted-foreground mt-1">Direct .exe download</p>
                    </div>
                    <Button className="mt-6 w-full rounded-full bg-secondary hover:bg-secondary/95 text-white font-bold shadow-soft" asChild>
                      <a href={windowsUrl} target="_blank" rel="noopener noreferrer">
                        <Download className="mr-1.5 h-3.5 w-3.5" /> Windows
                      </a>
                    </Button>
                  </Card>

                  {/* Mac Intel Card */}
                  <Card className="p-6 flex flex-col items-center justify-between text-center border-border/80 shadow-soft hover:shadow-soft-lg hover:border-primary/20 hover:-translate-y-1 transition-all duration-300 group">
                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-primary">
                      <Laptop className="h-7 w-7" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-foreground text-base">Mac Intel</h4>
                      <p className="text-xs text-muted-foreground mt-1">macOS DMG (Intel CPU)</p>
                    </div>
                    <Button className="mt-6 w-full rounded-full bg-muted border border-border text-foreground hover:bg-muted/80 font-bold shadow-sm" asChild>
                      <a href={macIntelUrl} target="_blank" rel="noopener noreferrer">
                        <Download className="mr-1.5 h-3.5 w-3.5" /> Intel dmg
                      </a>
                    </Button>
                  </Card>

                  {/* Apple Silicon Card */}
                  <Card className="p-6 flex flex-col items-center justify-between text-center border-border/80 shadow-soft hover:shadow-soft-lg hover:border-primary/20 hover:-translate-y-1 transition-all duration-300 group">
                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-primary">
                      <Laptop className="h-7 w-7" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-foreground text-base">Apple Silicon</h4>
                      <p className="text-xs text-muted-foreground mt-1">Optimized for M1/M2/M3</p>
                    </div>
                    <Button className="mt-6 w-full rounded-full bg-muted border border-border text-foreground hover:bg-muted/80 font-bold shadow-sm" asChild>
                      <a href={macSiliconUrl} target="_blank" rel="noopener noreferrer">
                        <Download className="mr-1.5 h-3.5 w-3.5" /> M-Series dmg
                      </a>
                    </Button>
                  </Card>
                </div>
              </div>

              {/* Desktop Features Grid */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-foreground">Features &amp; Benefits</h3>
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
                  {features.map((f, i) => (
                    <Card key={i} className="p-5 flex flex-col items-center text-center border-border/60 shadow-soft hover:shadow-soft-md transition-all">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3">
                        <f.icon className="h-6 w-6" />
                      </div>
                      <h4 className="font-bold text-foreground text-sm leading-tight">{f.title}</h4>
                      <p className="text-[11px] text-muted-foreground mt-1 leading-snug">{f.desc}</p>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Screenshots Slider Showcase (Premium Touch) */}
            <div className="space-y-6 overflow-hidden">
              <h3 className="text-2xl font-bold text-foreground">App Screenshots</h3>
              
              <style dangerouslySetInnerHTML={{__html: `
                @keyframes marquee-rtl {
                  0% { transform: translateX(0); }
                  100% { transform: translateX(-50%); }
                }
                .animate-marquee-rtl {
                  display: flex;
                  width: max-content;
                  animation: marquee-rtl 25s linear infinite;
                }
                .animate-marquee-rtl:hover {
                  animation-play-state: paused;
                }
              `}} />

              <div className="w-full overflow-hidden py-2">
                <div className="animate-marquee-rtl gap-6 flex">
                  {[...screenshots, ...screenshots].map((s, i) => (
                    <div 
                      key={i} 
                      className="relative w-[210px] sm:w-[240px] aspect-[9/19] shrink-0 rounded-3xl overflow-hidden border border-border/80 shadow-lg bg-black"
                    >
                      <Image
                        src={s.url}
                        alt={s.alt}
                        fill
                        sizes="(max-width: 640px) 210px, 240px"
                        className="object-contain"
                        priority={i === 0 || i === screenshots.length}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Installation Roadmap */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-foreground lg:text-left text-center">Easy Installation Steps</h3>
              
              {/* Desktop timeline view */}
              <div className="hidden md:grid grid-cols-4 gap-6 relative py-4">
                <div className="absolute top-9 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-primary via-primary/50 to-primary/10 z-0" />
                {installationSteps.map((step, idx) => (
                  <div key={idx} className="relative flex flex-col items-center text-center z-10 space-y-3">
                    <div className="w-10 h-10 rounded-full bg-primary border-4 border-background flex items-center justify-center shadow-md">
                      <span className="text-xs text-white font-black">{step.step}</span>
                    </div>
                    <div>
                      <h4 className="font-extrabold text-foreground text-sm">{step.title}</h4>
                      <p className="text-[11px] text-muted-foreground mt-1 leading-snug">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile timeline view (Stitch Roadmap style) */}
              <div className="md:hidden relative max-w-xs mx-auto py-4">
                <div className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-0.5 bg-border border-dashed border-l" />
                <div className="space-y-10 relative">
                  {installationSteps.map((step, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center z-10 shadow-md ring-4 ring-background">
                        <span className="text-xs font-black">{step.step}</span>
                      </div>
                      <div className="mt-3 text-center px-4 py-1 bg-white dark:bg-[#0B1120] relative z-10">
                        <h4 className="font-bold text-sm">{step.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1 max-w-[200px] mx-auto text-center">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-foreground">App Downloads FAQ</h3>
              <Accordion type="single" collapsible className="w-full border border-border rounded-3xl bg-card p-6 shadow-soft">
                {faqs.map((f, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="border-b border-border/40 py-1 last:border-0">
                    <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary hover:no-underline py-4">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pb-4 pt-1">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>

          {/* Right Column (Sidebar resources / app download info card) */}
          <div className="space-y-8">
            {/* Quick App Config Card */}
            <Card className="p-6 border-border/80 shadow-soft space-y-6">
              <div className="text-center pb-4 border-b border-border/60">
                <span className="text-xs font-bold text-primary uppercase tracking-wider">Aakar IAS Android App</span>
                <h4 className="text-xl font-extrabold mt-1 text-foreground">Quick Config</h4>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Version:</span>
                  <span className="font-semibold text-foreground">{appVersion}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Requirements:</span>
                  <span className="font-semibold text-foreground">Android 8.0+ / iOS 14.0+</span>
                </div>
              </div>
            </Card>

            {/* Latest CA Preview */}
            <Card className="p-6 border-border/80 shadow-soft space-y-6">
              <div className="pb-4 border-b border-border/60">
                <h4 className="text-lg font-bold text-foreground">Latest Updates</h4>
              </div>
              <div className="space-y-4">
                {latestCa.items.slice(0, 2).map((a, i) => (
                  <div key={i} className="space-y-1">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider">
                      {new Date(a.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </span>
                    <Link href={a.href} className="block font-bold text-sm text-foreground hover:text-primary transition-colors leading-snug line-clamp-2">
                      {a.title}
                    </Link>
                  </div>
                ))}
              </div>
            </Card>

            {/* Telegram/WhatsApp Community Card */}
            <Card className="p-6 bg-gradient-to-br from-primary/5 to-secondary/10 border-primary/20 shadow-soft text-center space-y-4">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto">
                <Send className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-foreground text-base">Aspirants Community</h4>
                <p className="text-xs text-muted-foreground leading-relaxed mt-2">
                  Join our official WhatsApp and Telegram channels with over 100K+ aspirants to receive free daily PDF summaries, study materials and notifications.
                </p>
              </div>
              <div className="flex flex-col gap-2 pt-2">
                <Button className="w-full rounded-full bg-primary hover:bg-primary/95 text-primary-foreground font-bold shadow-soft" asChild>
                  <a href={siteConfig.links.whatsapp} target="_blank" rel="noopener noreferrer">
                    Join WhatsApp
                  </a>
                </Button>
                <Button variant="outline" className="w-full rounded-full border-border bg-transparent hover:bg-muted font-bold text-foreground" asChild>
                  <a href={siteConfig.links.telegram} target="_blank" rel="noopener noreferrer">
                    Join Telegram
                  </a>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </Section>

      {/* ─── Newsletter Section ────────────────────────────────────────── */}
      <Newsletter />
    </div>
  );
}
