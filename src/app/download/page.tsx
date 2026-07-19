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

export const revalidate = 900; // 15 min ISR

export const metadata: Metadata = buildMetadata({
  title: "ऐप डाउनलोड करें (Download App)",
  description: "Aakar IAS का प्रीमियम मोबाइल और डेस्कटॉप ऐप डऻeउनलोड कर्ां।",
});

import * as Icons from "lucide-react";

export default async function DownloadPage() {
  const repo = await getContentRepository();
  const [latestCa, pdfs, dbConfig] = await Promise.all([
    repo.listArticles({ locale: "hi", page: 1, pageSize: 3 }),
    repo.listMonthlyPdfs("hi", undefined, 1),
    repo.getDownloadPageConfig("hi"),
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
    { icon: Video, title: "लाइव क्लासेस", desc: "विशेषज्ञों द्वारा दैनिक इंटरैक्टिव लाइव सत्र" },
    { icon: PlayCircle, title: "रिकॉर्डेड लेक्चर्स", desc: "असीमित पुनरावृत्ति के लिए सहेजे गए सत्र" },
    { icon: FileDown, title: "प्रीमियम पीडीएफ", desc: "विस्तृत नोट्स और मासिक करेंट अफेयर्स पत्रिका" },
    { icon: FileText, title: "टेस्ट सीरीज", desc: "प्रीलिम्स और मेन्स के लिए मॉक टेस्ट" },
    { icon: MessageSquare, title: "संदेह निवारण", desc: "शिक्षकों के साथ वन-टू-वन डाउट क्लीयरिंग" },
    { icon: WifiOff, title: "ऑफ़लाइन एक्सेस", desc: "वीडियो और सामग्री को ऑफलाइन मोड में देखें" },
    { icon: TrendingUp, title: "प्रगति विश्लेषण", desc: "आपके प्रदर्शन की एआई-संचालित रिपोर्ट" },
    { icon: Calendar, title: "कक्षा अनुसूची", desc: "अपडेटेड समय सारिणी और सूचनाएं" },
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
      title: "फाइल डाउनलोड करें",
      desc: "अपने डिवाइस के अनुसार ऊपर दिए गए लिंक से फाइल डाउनलोड करें।",
    },
    {
      step: "2",
      title: "ऐप इंस्टॉल करें",
      desc: "डाउनलोड की गई फाइल पर डबल-क्लिक करके ऐप को अपने डिवाइस पर इंस्टॉल करें।",
    },
    {
      step: "3",
      title: "लॉगिन करें",
      desc: "अपने पंजीकृत मोबाइल नंबर या ईमेल आईडी के साथ लॉगिन करें।",
    },
    {
      step: "4",
      title: "तैयारी शुरू करें",
      desc: "अब आप अपने डैशबोर्ड से सभी कोर्सेज, लाइव क्लासेस और पीडीएफ सामग्री एक्सेस कर सकते हैं।",
    },
  ];

  const defaultFaqs = [
    {
      q: "क्या ऐप पूरी तरह से फ्री है?",
      a: "जी हां, ऐप डाउनलोड करना बिल्कुल फ्री है। कुछ बुनियादी कोर्सेज और रिसोर्सेज मुफ्त उपलब्ध हैं, जबकि प्रीमियम कोर्सेज के लिए शुल्क देय है।"
    },
    {
      q: "क्या ऑफलाइन देख सकते हैं?",
      a: "हां, आप वीडियो और PDF नोट्स को डाउनलोड करके ऑफलाइन भी देख सकते हैं, जिससे बिना इंटरनेट के भी पढ़ाई जारी रहे।"
    },
    {
      q: "क्या Apple iPad पर चलेगा?",
      a: "जी हां, हमारा ऐप सभी आधुनिक iPads और Android टैब्लेट्स के लिए पूरी तरह से ऑप्टिमाइज्ड है।"
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
            Aakar IAS ऐप डाउनलोड करें
          </h1>
          <p className="mt-2 max-w-3xl text-lg text-muted-foreground">
            प्रीमियम सिविल सेवा परीक्षा तैयारी अनुभव अब आपके मोबाइल और डेस्कटॉप पर।
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
                    वर्जन 2.4 उपलब्ध (Version 2.4)
                  </span>
                  <h2 className="text-3xl font-black mb-3 text-foreground leading-tight">
                    तैयारी को दें नया <span className="text-primary">आकार</span>
                  </h2>
                  <p className="text-sm text-muted-foreground max-w-xs mx-auto mb-6">
                    UPSC और राज्य लोक सेवा आयोग की सर्वश्रेष्ठ तैयारी के लिए अब आकार IAS ऐप डाउनलोड करें।
                  </p>
                  <div className="flex flex-col gap-2 items-center">
                    <Button className="w-full max-w-xs bg-primary hover:bg-primary/95 text-primary-foreground py-6 rounded-full text-base font-bold shadow-lg shadow-primary/20 flex items-center justify-center gap-2" asChild>
                      <a href={playStoreUrl} target="_blank" rel="noopener noreferrer">
                        <Download className="h-5 w-5" /> अभी डाउनलोड करें
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
                      <p className="text-xs text-muted-foreground">Android 8.0+ (v{appVersion})</p>
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
                      <p className="text-xs text-muted-foreground">iOS 14.0+ (v{appVersion})</p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-primary group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Mobile Features Grid */}
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-foreground text-center">प्रमुख विशेषताएं</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/30 p-4 rounded-2xl flex flex-col gap-3">
                    <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                      <Video className="h-5 w-5" />
                    </div>
                    <h4 className="font-bold text-sm">लाइव कक्षाएं</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">विशेषज्ञों द्वारा प्रतिदिन लाइव सत्र।</p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-2xl flex flex-col gap-3">
                    <div className="w-10 h-10 bg-accent/15 text-accent-foreground rounded-full flex items-center justify-center">
                      <FileDown className="h-5 w-5" />
                    </div>
                    <h4 className="font-bold text-sm">PDF रिसोर्सेज</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">क्लास नोट्स और मासिक पत्रिकाएं।</p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-2xl flex flex-col gap-3">
                    <div className="w-10 h-10 bg-secondary/10 dark:bg-muted/50 text-foreground rounded-full flex items-center justify-center">
                      <FileText className="h-5 w-5" />
                    </div>
                    <h4 className="font-bold text-sm">मॉक टेस्ट</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">अखिल भारतीय स्तर की टेस्ट सीरीज।</p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-2xl flex flex-col gap-3">
                    <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                      <MessageSquare className="h-5 w-5" />
                    </div>
                    <h4 className="font-bold text-sm">डाउट समाधान</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">विशेषज्ञों से सीधे संवाद करें।</p>
                  </div>
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
                    कहीं भी, कभी भी पढ़ें
                  </h2>
                  <p className="text-pretty text-white/80 leading-relaxed text-base">
                    Aakar IAS के साथ अपनी तैयारी को नई ऊंचाइयों पर ले जाएं। हमारा प्रीमियम लर्निंग ऐप अब Android और Desktop (Windows/macOS) पर उपलब्ध है। उत्कृष्ट अध्ययन सामग्री और लाइव कक्षाओं के साथ सफलता की ओर बढ़ें।
                  </p>
                </div>
              </AnimatedSection>

              {/* Desktop Platform Grid */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-foreground">प्लेटफ़ॉर्म चुनें</h3>
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
                  {/* Android Card */}
                  <Card className="p-6 flex flex-col items-center justify-between text-center border-primary/25 border-2 bg-primary/5 shadow-soft hover:shadow-soft-lg hover:border-primary/45 hover:-translate-y-1 transition-all duration-300 group">
                    <div className="w-14 h-14 bg-primary/15 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-primary">
                      <Smartphone className="h-7 w-7" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-foreground text-base">Android</h4>
                      <p className="text-xs text-muted-foreground mt-1">Play Store से इंस्टॉल करें (v{appVersion})</p>
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
                      <p className="text-xs text-muted-foreground mt-1">प्रत्यक्ष .exe डाउनलोड</p>
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
                      <p className="text-xs text-muted-foreground mt-1">M1/M2/M3 के लिए अनुकूलित</p>
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
                <h3 className="text-2xl font-bold text-foreground">विशेषताएं और लाभ</h3>
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

            {/* SHARED SECTIONS (Mobile & Desktop) */}
            
            {/* Screenshot Showcase */}
            <div className="space-y-6 overflow-hidden">
              <h3 className="text-2xl font-bold text-foreground lg:text-left text-center">एक झलक</h3>
              
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
                  {[...screenshots, ...screenshots].map((s, idx) => (
                    <div 
                      key={idx} 
                      className="w-[210px] sm:w-[240px] aspect-[9/19] rounded-3xl shadow-lg overflow-hidden border border-border/80 flex-shrink-0 relative bg-black"
                    >
                      <Image
                        src={s.url}
                        alt={s.alt}
                        fill
                        sizes="(max-width: 640px) 210px, 240px"
                        className="object-contain"
                        priority={idx === 0 || idx === screenshots.length}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Installation Roadmap */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-foreground lg:text-left text-center">इंस्टॉलेशन प्रक्रिया</h3>
              
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

            {/* FAQs */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-foreground lg:text-left text-center">अक्सर पूछे जाने वाले प्रश्न</h3>
              <Accordion type="single" collapsible className="w-full border border-border/80 rounded-2xl bg-card p-4 shadow-soft">
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="border-b border-border/40 py-1 last:border-0">
                    <AccordionTrigger className="text-left font-bold text-foreground hover:text-primary hover:no-underline py-3">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pb-3 pt-1 text-sm">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

          </div>

          {/* Right Column (Sidebar - Desktop only) */}
          <div className="space-y-8 lg:block hidden">
            {/* Dynamic Latest Current Affairs Card */}
            <Card className="p-6 border-border/80 shadow-soft space-y-4">
              <div className="flex items-center gap-2 border-b border-border/40 pb-3">
                <BookOpen className="h-5 w-5 text-primary" />
                <h3 className="font-extrabold text-foreground text-base">नवीनतम करेंट अफेयर्स</h3>
              </div>
              <div className="space-y-3">
                {latestCa.items.map((ca) => (
                  <Link
                    key={ca.id}
                    href={ca.href}
                    className="block p-2.5 rounded-xl hover:bg-muted border-l-4 border-primary bg-muted/30 text-xs font-semibold leading-snug text-foreground/80 hover:text-primary transition-all duration-200"
                  >
                    {ca.title}
                  </Link>
                ))}
              </div>
            </Card>

            {/* Monthly PDF Card */}
            {latestPdf && (
              <Card className="p-6 bg-secondary text-secondary-foreground shadow-soft flex flex-col justify-between border-none relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--primary)_0%,_transparent_50%)] opacity-35" />
                <div className="relative z-10 space-y-3">
                  <span className="inline-block rounded-full bg-primary/20 px-2.5 py-0.5 text-[9px] font-bold text-accent uppercase tracking-wider">
                    मासिक पत्रिका (Magazine)
                  </span>
                  <h3 className="font-extrabold text-white text-base leading-snug line-clamp-2">
                    {latestPdf.title}
                  </h3>
                  <p className="text-[11px] text-white/70 leading-relaxed line-clamp-3">
                    {latestPdf.description || "सिविल सेवा परीक्षाओं के लिए विस्तृत मासिक करेंट अफेयर्स संकलन पत्रिका।"}
                  </p>
                  <Button className="w-full mt-4 rounded-xl bg-primary hover:bg-primary/95 text-primary-foreground font-bold shadow-soft text-xs" asChild>
                    <Link href={`/monthly-pdf/${latestPdf.slug}`}>
                      <Download className="mr-1.5 h-3.5 w-3.5" /> अभी डाउनलोड करें
                    </Link>
                  </Button>
                </div>
              </Card>
            )}

            {/* Telegram/WhatsApp Community Card */}
            <Card className="p-6 border-border/80 shadow-soft space-y-4">
              <div className="flex items-center gap-2 border-b border-border/40 pb-3">
                <Send className="h-5 w-5 text-primary" />
                <h3 className="font-extrabold text-foreground text-base">समुदाय से जुड़ें (Community)</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                1 लाख से अधिक छात्रों के हमारे टेलीग्राम और व्हाट्सएप परिवार का हिस्सा बनें और सभी परीक्षा अपडेट सीधे प्राप्त करें।
              </p>
              <div className="grid gap-2">
                <Button className="rounded-xl w-full bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs" asChild>
                  <a href={siteConfig.links.telegram} target="_blank" rel="noopener noreferrer">
                    Telegram से जुड़ें
                  </a>
                </Button>
                <Button className="rounded-xl w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs" asChild>
                  <a href={siteConfig.links.whatsapp} target="_blank" rel="noopener noreferrer">
                    WhatsApp से जुड़ें
                  </a>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </Section>

      {/* ─── Newsletter Section ─────────────────────────────────── */}
      <Section className="pt-0" containerSize="wide">
        <Newsletter variant="section" />
      </Section>
    </div>
  );
}
