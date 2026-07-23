"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { Send, Phone, Mail, MapPin, MessageSquare, CheckCircle2, AlertCircle, Loader2, Rss, Smartphone, Monitor, Laptop } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { Container } from "@/components/layout/container";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { siteConfig } from "@/lib/site-config";
import { useLanguage } from "@/components/providers/language-provider";
import { subscribeWhatsApp } from "@/actions/whatsapp";
import { OrganizationJsonLd } from "@/components/seo/json-ld";
import {
  YoutubeIcon,
  XIcon,
  InstagramIcon,
  FacebookIcon,
  WhatsappIcon,
} from "@/components/layout/brand-icons";

export function SiteFooter() {
  const { locale } = useLanguage();
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  const getHref = (href: string) => {
    if (locale === "en") {
      return href === "/" ? "/en" : `/en${href}`;
    }
    return href;
  };

  async function handleWhatsAppSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!phone) return;
    setStatus("loading");
    startTransition(async () => {
      const res = await subscribeWhatsApp({
        phone,
        locale,
        source: "footer_strip",
      });
      if (res.success) {
        setStatus("success");
        setMessage(res.message ?? "Subscribed successfully!");
        setPhone("");
      } else {
        setStatus("error");
        setMessage(res.message ?? "Something went wrong.");
      }
    });
  }

  const socialLinks = [
    { href: siteConfig.links.youtube, label: "YouTube", icon: YoutubeIcon },
    { href: siteConfig.links.telegram, label: "Telegram", icon: Send },
    { href: siteConfig.links.twitter, label: "Twitter", icon: XIcon },
    { href: siteConfig.links.instagram, label: "Instagram", icon: InstagramIcon },
    { href: siteConfig.links.facebook, label: "Facebook", icon: FacebookIcon },
    { href: siteConfig.links.whatsapp, label: "WhatsApp", icon: WhatsappIcon },
  ].filter((s) => s.href);

  // 5-Column Navigation Data
  const columns = [
    {
      title: locale === "hi" ? "करेंट अफेयर्स" : "Current Affairs",
      items: [
        { title: locale === "hi" ? "डेली करेंट अफेयर्स" : "Daily Current Affairs", href: "/current-affairs" },
        { title: locale === "hi" ? "वीकली करेंट अफेयर्स" : "Weekly Current Affairs", href: "/weekly" },
        { title: locale === "hi" ? "मंथली करेंट अफेयर्स" : "Monthly Current Affairs", href: "/monthly" },
        { title: locale === "hi" ? "मंथली पीडीएफ" : "Monthly PDF Library", href: "/monthly-pdf" },
        { title: locale === "hi" ? "संपादकीय विश्लेषण" : "Editorial Analysis", href: "/editorial" },
      ],
    },
    {
      title: locale === "hi" ? "परीक्षाएं (Exams)" : "Exams & Syllabus",
      items: [
        { title: locale === "hi" ? "यूपीएससी सिविल सेवा" : "UPSC Civil Services", href: "/upsc" },
        { title: locale === "hi" ? "एमपीपीएससी राज्य सेवा" : "MPPSC State Services", href: "/mppsc" },
        { title: locale === "hi" ? "टेस्ट सीरीज" : "Test Series", href: "/test-series" },
        { title: locale === "hi" ? "नवीनतम सूचनाएं" : "Latest Notifications", href: "/notifications" },
        { title: locale === "hi" ? "परीक्षा कैलेंडर" : "Exam Calendar", href: "/calendar" },
      ],
    },
    {
      title: locale === "hi" ? "मुफ्त संसाधन" : "Free Resources",
      items: [
        { title: locale === "hi" ? "एमपीपीएससी नोट्स" : "MPPSC Notes PDF", href: "/mppsc-notes" },
        { title: locale === "hi" ? "फ्री पीडीएफ लाइब्रेरी" : "Free PDF Library", href: "/free-pdf" },
        { title: locale === "hi" ? "पीवाईक्यू बैंक (PYQs)" : "PYQ Answer Bank", href: "/pyq" },
        { title: locale === "hi" ? "पाठ्यक्रम पीडीएफ" : "Syllabus PDFs", href: "/monthly-pdf" },
        { title: locale === "hi" ? "डेली क्विज़" : "Daily CA Quizzes", href: "/daily-quiz" },
        { title: locale === "hi" ? "माइंड मैप्स" : "Concept Mind Maps", href: "/free-pdf" },
      ],
    },
    {
      title: locale === "hi" ? "कंपनी" : "Company & Info",
      items: [
        { title: locale === "hi" ? "हमारे बारे में" : "About Aakar IAS", href: "/about" },
        { title: locale === "hi" ? "संपर्क करें" : "Contact & Support", href: "/contact" },
        { title: locale === "hi" ? "ब्लॉग व लेख" : "Blog & Articles", href: "/blog" },
        { title: locale === "hi" ? "ऐप डाउनलोड करें" : "Download App", href: "/download" },
        { title: locale === "hi" ? "स्टिच सेटअप (Stitch MCP)" : "Stitch MCP Setup", href: "/stitch" },
      ],
    },
  ];

  return (
    <footer className="border-t border-border/80 bg-muted/20">
      <OrganizationJsonLd />
      
      {/* 1. Full-Width WhatsApp / Telegram Strip */}
      <div className="w-full border-b border-border/50 bg-gradient-to-r from-emerald-500/[0.04] via-background to-sky-500/[0.04] py-8 lg:py-10">
        <Container size="wide" className="grid gap-6 lg:grid-cols-12 items-center">
          <div className="lg:col-span-5 space-y-2">
            <h3 className="text-base sm:text-lg lg:text-xl font-extrabold text-foreground tracking-tight leading-snug flex items-start gap-2.5">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0 mt-1.5" />
              <span>
                {locale === "hi"
                  ? "रोज का Current Affairs PDF — सीधे WhatsApp पर। Free."
                  : "Daily Current Affairs PDF — Directly on WhatsApp. Free."}
              </span>
            </h3>
            <p className="text-xs lg:text-sm text-muted-foreground leading-relaxed pl-5 sm:pl-0">
              {locale === "hi"
                ? "मुफ्त दैनिक पीडीएफ प्राप्त करने के लिए अपना मोबाइल नंबर दर्ज करें या सीधे हमारे आधिकारिक चैनल्स से जुड़ें।"
                : "Enter your mobile number to receive daily updates, or join our official channels directly."}
            </p>
          </div>

          <div className="lg:col-span-4">
            <form onSubmit={handleWhatsAppSubscribe} className="flex gap-2">
              <div className="relative flex-1">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
                <Input
                  type="tel"
                  placeholder={locale === "hi" ? "मोबाइल नंबर (10 अंक)" : "Mobile Number (10 digits)"}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  aria-label="WhatsApp Phone Number"
                  className="h-10 pl-9 rounded-xl bg-background border-border/60 focus-visible:ring-emerald-500/20 text-xs sm:text-sm"
                />
              </div>
              <Button
                type="submit"
                disabled={isPending}
                className="shrink-0 h-10 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 sm:px-5 text-xs sm:text-sm shadow-soft"
              >
                {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : (locale === "hi" ? "सब्सक्राइब" : "Subscribe")}
              </Button>
            </form>
            {status !== "idle" && (
              <p
                className={`mt-2 flex items-center gap-1.5 text-xs font-semibold ${
                  status === "success" ? "text-emerald-600 dark:text-emerald-400" : "text-destructive"
                }`}
              >
                {status === "success" ? (
                  <CheckCircle2 className="h-3.5 w-3.5" />
                ) : (
                  <AlertCircle className="h-3.5 w-3.5" />
                )}
                {message}
              </p>
            )}
          </div>

          <div className="lg:col-span-3 flex flex-row gap-2 lg:justify-end">
            <Button variant="outline" size="sm" className="flex-1 sm:flex-initial rounded-xl border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 font-bold text-xs gap-1.5 justify-center" asChild>
              <a href={siteConfig.links.whatsapp} target="_blank" rel="noopener noreferrer">
                <WhatsappIcon className="h-3.5 w-3.5" />
                {locale === "hi" ? "व्हाट्सएप चैनल" : "WhatsApp Channel"}
              </a>
            </Button>
            <Button variant="outline" size="sm" className="flex-1 sm:flex-initial rounded-xl border-sky-500/20 bg-sky-500/5 hover:bg-sky-500/10 text-sky-600 dark:text-sky-400 hover:text-sky-700 font-bold text-xs gap-1.5 justify-center" asChild>
              <a href={siteConfig.links.telegram} target="_blank" rel="noopener noreferrer">
                <Send className="h-3.5 w-3.5" />
                {locale === "hi" ? "टेलीग्राम चैनल" : "Telegram Channel"}
              </a>
            </Button>
          </div>
        </Container>
      </div>

      {/* 2. 5-Column Navigation Grid */}
      <Container size="wide" className="pt-12 pb-8">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-4 space-y-5">
            <Logo />
            <p className="text-sm text-muted-foreground leading-relaxed">
              {locale === "hi"
                ? "आकार IAS — सिविल सेवा परीक्षा (UPSC व MPPSC) के लिए देश का सबसे विश्वसनीय और सुव्यवस्थित हिंदी व अंग्रेजी माध्यम का डिजिटल अध्ययन मंच।"
                : "Aakar IAS — India's trusted bilingual platform preparing civil services aspirants for UPSC and State PSC exams with high-quality daily current affairs."}
            </p>
            
            {/* App Download Badges */}
            <div className="space-y-2.5">
              <span className="block text-xs font-bold text-muted-foreground tracking-wider uppercase">
                {locale === "hi" ? "ऐप डाउनलोड करें" : "Download App"}
              </span>
              <div className="grid grid-cols-2 gap-2.5 max-w-[340px]">
                <Link
                  href={getHref("/download")}
                  className="inline-flex items-center gap-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white px-3 py-2 hover:bg-zinc-800 transition-all shadow-soft group"
                >
                  <Smartphone className="h-4 w-4 text-primary shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="block text-left min-w-0">
                    <span className="text-[8px] text-zinc-400 font-semibold block leading-tight tracking-wider uppercase">
                      GET IT ON
                    </span>
                    <span className="text-[11px] font-extrabold text-white block leading-tight truncate">
                      Google Play
                    </span>
                  </span>
                </Link>

                <Link
                  href={getHref("/download")}
                  className="inline-flex items-center gap-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white px-3 py-2 hover:bg-zinc-800 transition-all shadow-soft group"
                >
                  <Smartphone className="h-4 w-4 text-primary shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="block text-left min-w-0">
                    <span className="text-[8px] text-zinc-400 font-semibold block leading-tight tracking-wider uppercase">
                      DOWNLOAD ON
                    </span>
                    <span className="text-[11px] font-extrabold text-white block leading-tight truncate">
                      App Store
                    </span>
                  </span>
                </Link>

                <Link
                  href={getHref("/download")}
                  className="inline-flex items-center gap-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white px-3 py-2 hover:bg-zinc-800 transition-all shadow-soft group"
                >
                  <Monitor className="h-4 w-4 text-primary shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="block text-left min-w-0">
                    <span className="text-[8px] text-zinc-400 font-semibold block leading-tight tracking-wider uppercase">
                      DOWNLOAD FOR
                    </span>
                    <span className="text-[11px] font-extrabold text-white block leading-tight truncate">
                      Windows
                    </span>
                  </span>
                </Link>

                <Link
                  href={getHref("/download")}
                  className="inline-flex items-center gap-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white px-3 py-2 hover:bg-zinc-800 transition-all shadow-soft group"
                >
                  <Laptop className="h-4 w-4 text-primary shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="block text-left min-w-0">
                    <span className="text-[8px] text-zinc-400 font-semibold block leading-tight tracking-wider uppercase">
                      DOWNLOAD FOR
                    </span>
                    <span className="text-[11px] font-extrabold text-white block leading-tight truncate">
                      macOS
                    </span>
                  </span>
                </Link>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-2">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border/80 text-muted-foreground bg-background/50 hover:bg-background transition-all hover:border-primary hover:text-primary shadow-sm"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
              <Link
                href="/rss.xml"
                aria-label="RSS feed"
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border/80 text-muted-foreground bg-background/50 hover:bg-background transition-all hover:border-primary hover:text-primary shadow-sm"
              >
                <Rss className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Columns 2-5: Dynamic Links */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            {columns.map((col) => (
              <div key={col.title} className="space-y-3.5">
                <h4 className="text-sm font-bold text-foreground tracking-wide">{col.title}</h4>
                <ul className="space-y-2">
                  {col.items.map((item, idx) => (
                    <li key={`${item.title}-${item.href}-${idx}`}>
                      <Link
                        href={getHref(item.href)}
                        className="text-xs text-muted-foreground hover:text-primary transition-colors font-medium hover:underline block"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Contact & Location Embed Section */}
        <div className="mt-12 pt-8 border-t border-border/40">
          <h4 className="text-sm font-bold text-foreground tracking-wide mb-6">
            {locale === "hi" ? "हमारा केंद्र (Indore Center)" : "Our Indore Center"}
          </h4>
          <div className="grid gap-8 md:grid-cols-12 items-start">
            <div className="md:col-span-7 grid gap-6 sm:grid-cols-2">
              <div className="flex gap-3">
                <div className="h-9 w-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-foreground">
                    {locale === "hi" ? "इंदौर शाखा का पता" : "Indore Branch Address"}
                  </h5>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {locale === "hi" ? siteConfig.contact.addressHi : siteConfig.contact.address}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="h-9 w-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-foreground">
                    {locale === "hi" ? "संपर्क नंबर" : "Phone & Support"}
                  </h5>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    <a href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`} className="hover:text-primary transition-colors">
                      {siteConfig.contact.phone}
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="h-9 w-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-foreground">
                    {locale === "hi" ? "ईमेल समर्थन" : "Email Support"}
                  </h5>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-primary transition-colors">
                      {siteConfig.contact.email}
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="h-9 w-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <MessageSquare className="h-4 w-4" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-foreground">
                    {locale === "hi" ? "व्हाट्सएप चैट" : "WhatsApp Chat"}
                  </h5>
                  <p className="text-xs text-muted-foreground mt-1">
                    <a href={siteConfig.links.whatsapp} className="text-primary hover:underline font-semibold flex items-center gap-1 mt-0.5">
                      Chat Now &rarr;
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Google Map Embed */}
            <div className="md:col-span-5 w-full rounded-2xl overflow-hidden border border-border/80 shadow-soft">
              <iframe
                src={siteConfig.contact.mapEmbedUrl}
                width="100%"
                height="140"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Aakar IAS Indore Map Location"
              />
            </div>
          </div>
        </div>

        <Separator className="my-8 border-border/50" />

        {/* 4. Bottom Legal Copyright Bar */}
        <div className="flex flex-col items-center justify-between gap-4 text-xs text-muted-foreground md:flex-row">
          <div className="flex flex-col gap-1 text-center md:text-left">
            <p className="font-semibold text-foreground/80">
              © {new Date().getFullYear()} Aakar IAS ·{" "}
              <a
                href="https://www.socialbano.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors hover:underline"
              >
                Social Bano Technologies Pvt. Ltd.
              </a>{" "}
              All rights reserved.
            </p>
            <p className="text-[10px] text-muted-foreground/75">
              Developed & Managed by{" "}
              <a
                href="https://www.socialbano.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors hover:underline"
              >
                Social Bano Technologies Pvt. Ltd. Indore
              </a>
              .
            </p>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <Link href={getHref("/privacy")} className="hover:text-primary transition-colors hover:underline">
              {locale === "hi" ? "गोपनीयता नीति" : "Privacy Policy"}
            </Link>
            <span className="text-border/40">|</span>
            <Link href={getHref("/terms")} className="hover:text-primary transition-colors hover:underline">
              {locale === "hi" ? "नियम व शर्तें" : "Terms & Conditions"}
            </Link>
            <span className="text-border/40">|</span>
            <Link href={getHref("/refund")} className="hover:text-primary transition-colors hover:underline">
              {locale === "hi" ? "वापसी नीति" : "Refund Policy"}
            </Link>
            <span className="text-border/40">|</span>
            <Link href={getHref("/disclaimer")} className="hover:text-primary transition-colors hover:underline">
              {locale === "hi" ? "अस्वीकरण" : "Disclaimer"}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
