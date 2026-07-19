"use client";

import { useState, useEffect, FormEvent } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  X, Phone, User, Loader2, ArrowRight, Check, Sparkles, 
  BookOpen, ShieldCheck, Star, Download 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { submitInquiry } from "@/actions/contact";
import Link from "next/link";

type ScrollInquiryModalProps = {
  posterUrl?: string;
  posterAlt?: string;
};

export function ScrollInquiryModal({
  posterUrl = "/images/ads/inquiry-poster.png",
  posterAlt = "Aakar IAS Academy — Admission Open 2026-27",
}: ScrollInquiryModalProps) {
  const pathname = usePathname() ?? "/";

  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [course, setCourse] = useState("MPPSC Prelims");
  const [customText, setCustomText] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; mobile?: string }>({});

  // Hide on studio/admin routes
  const isExcluded = pathname.startsWith("/studio") || pathname.startsWith("/admin");

  // Scroll-triggered auto-open at ~40% scroll (once per session)
  useEffect(() => {
    if (isExcluded) return;
    const key = "aakar_scroll_modal_shown";
    if (sessionStorage.getItem(key)) return;

    const handleScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const percent = window.scrollY / scrollable;
      if (percent >= 0.35) {
        setIsOpen(true);
        sessionStorage.setItem(key, "true");
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isExcluded]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // All hooks called — safe to return early now
  if (isExcluded) return null;

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!name.trim() || name.trim().length < 2) {
      newErrors.name = "Please enter your name";
    }
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!mobileRegex.test(mobile.trim())) {
      newErrors.mobile = "Enter a valid 10-digit number";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent | React.MouseEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    try {
      // Build a structured message so admin can parse it
      const messageParts = [
        `Course: ${course}`,
        customText ? `Custom Note: ${customText}` : "",
        `Source: Scroll Enquiry Modal`,
      ].filter(Boolean).join("\n");

      const res = await submitInquiry({
        name,
        mobile,
        exam: course.includes("MPPSC") ? "MPPSC" : "Other",
        batch: course,
        mode: "Online",
        medium: "Hindi",
        interests: customText ? [customText] : [],
        locale: "hi",
      });

      if (res.success) {
        setSubmitted(true);
      } else {
        alert(res.message || "Failed to submit. Please try again.");
      }
    } catch {
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      if (submitted) {
        setSubmitted(false);
        setName("");
        setMobile("");
        setCourse("MPPSC Prelims");
        setCustomText("");
      }
    }, 400);
  };

  if (!isOpen) return null;

  const courseOptions = [
    "MPPSC Prelims",
    "MPPSC Mains",
    "MPPSC Pre+Mains",
    "UG Foundation Batch",
    "Test Series",
    "Books",
    "Other",
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-black/60 dark:bg-black/75 z-[60] backdrop-blur-sm transition-opacity duration-300"
      />

      {/* Centered Modal */}
      <div
        className={cn(
          "fixed z-[60] overflow-hidden",
          // Mobile: bottom sheet
          "inset-x-3 bottom-3 top-auto rounded-2xl",
          // Desktop: centered
          "lg:inset-auto lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2",
          "lg:w-[880px] lg:max-w-[92vw] lg:rounded-2xl",
          "bg-card border border-border/60 shadow-2xl",
          "animate-in fade-in zoom-in-95 slide-in-from-bottom-6 duration-300"
        )}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 lg:top-4 lg:right-4 z-20 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border/40 text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Two-Column Layout */}
        <div className="flex flex-col lg:flex-row">

          {/* ─── LEFT: Ad Poster (Desktop only) ─────────────────── */}
          <div className="hidden lg:flex lg:w-[380px] lg:shrink-0 relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-l-2xl overflow-hidden">
            <Image
              src={posterUrl}
              alt={posterAlt}
              width={380}
              height={500}
              className="w-full h-full object-cover object-center"
              priority
            />
          </div>

          {/* ─── RIGHT: Form Content ────────────────────────────── */}
          <div className="flex-1 flex flex-col min-w-0">
            {!submitted ? (
              <>
                {/* Mobile-only: poster banner */}
                <div className="lg:hidden w-full h-24 relative overflow-hidden rounded-t-2xl">
                  <Image
                    src={posterUrl}
                    alt={posterAlt}
                    width={600}
                    height={96}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                </div>

                {/* Header */}
                <div className="px-5 pt-4 pb-2 lg:px-6 lg:pt-6 lg:pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Sparkles className="h-4.5 w-4.5 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-foreground leading-tight tracking-tight font-sans">
                        Quick Enquiry
                      </h2>
                      <p className="text-[11px] text-muted-foreground font-sans">
                        Get free counselling from our MPPSC experts
                      </p>
                    </div>
                  </div>
                </div>

                {/* Form Fields — compact, no extra scroll needed */}
                <div className="px-5 py-3 lg:px-6 space-y-3">
                  {/* Name */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider px-0.5 font-sans">
                      Your Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/75" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={cn(
                          "w-full h-11 bg-muted/30 border border-border rounded-xl pl-9 pr-4 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none font-sans",
                          errors.name && "border-destructive focus:ring-destructive/20"
                        )}
                        placeholder="Enter your full name"
                      />
                    </div>
                    {errors.name && <p className="text-[11px] text-destructive font-medium px-0.5 font-sans">{errors.name}</p>}
                  </div>

                  {/* Mobile */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider px-0.5 font-sans">
                      Mobile Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/75" />
                      <input
                        type="tel"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        className={cn(
                          "w-full h-11 bg-muted/30 border border-border rounded-xl pl-9 pr-4 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none font-sans",
                          errors.mobile && "border-destructive focus:ring-destructive/20"
                        )}
                        placeholder="10-digit mobile number"
                      />
                    </div>
                    {errors.mobile && <p className="text-[11px] text-destructive font-medium px-0.5 font-sans">{errors.mobile}</p>}
                  </div>

                  {/* Interested In Course */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider px-0.5 font-sans">
                      <BookOpen className="h-3 w-3 inline mr-1 -mt-0.5" />
                      Interested In Course
                    </label>
                    <select
                      value={course}
                      onChange={(e) => setCourse(e.target.value)}
                      className="w-full h-11 bg-muted/40 border border-border rounded-xl px-3 text-sm font-semibold focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none cursor-pointer font-sans"
                    >
                      {courseOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  {/* Write Custom Text */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider px-0.5 font-sans">
                      Write Custom Text (Optional)
                    </label>
                    <textarea
                      value={customText}
                      onChange={(e) => setCustomText(e.target.value)}
                      rows={2}
                      className="w-full bg-muted/30 border border-border rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none resize-none font-sans"
                      placeholder="e.g. I want to know about MPPSC Mains batch timings..."
                    />
                  </div>
                </div>

                {/* Footer — Rating + Submit Button (ALWAYS VISIBLE) */}
                <div className="px-5 pb-5 pt-3 lg:px-6 lg:pb-6 space-y-3 border-t border-border/30 bg-muted/5">
                  {/* Rating strip */}
                  <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground font-sans">
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-current shrink-0" />
                      ))}
                    </div>
                    <span className="font-bold text-foreground">4.9/5</span>
                    <span className="text-muted-foreground/70">•</span>
                    <span>5,000+ Students Trust Us</span>
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full h-12 bg-primary text-primary-foreground font-bold rounded-xl text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-primary/95 transition-all cursor-pointer shadow-lg shadow-primary/15 active:translate-y-[1px] font-sans disabled:opacity-60"
                  >
                    {loading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <>
                        Submit Enquiry
                        <ArrowRight className="h-4.5 w-4.5 shrink-0" />
                      </>
                    )}
                  </button>

                  {/* Brochure & Syllabus Download Link */}
                  <a
                    href="https://cdn.sanity.io/files/pnc4agic/production321/7aa3563b35ae74b8e9b52c3e28f6ba0c999d0c63.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-10 border border-border rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 text-muted-foreground hover:text-primary hover:border-primary/40 transition-all font-sans"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Download Brochure & Syllabus
                  </a>
                </div>
              </>
            ) : (
              /* ─── SUCCESS STATE ──────────────────────────────── */
              <div className="p-8 text-center flex flex-col items-center justify-center space-y-5">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center relative">
                  <span className="absolute inset-0 bg-primary/5 rounded-full animate-ping opacity-40" />
                  <Check className="h-8 w-8 text-primary shrink-0 stroke-[3]" />
                </div>

                <div className="space-y-1">
                  <h2 className="text-xl font-bold text-primary tracking-tight font-sans">
                    Thank You!
                  </h2>
                  <p className="text-xs text-muted-foreground bg-muted/60 py-1 px-4 rounded-full inline-block font-semibold border border-border/40 font-sans">
                    Enquiry Submitted Successfully!
                  </p>
                </div>

                <p className="text-sm text-foreground/80 leading-relaxed max-w-[280px] font-sans">
                  Our counsellor will contact you shortly to guide your preparation journey.
                </p>

                <button
                  onClick={handleClose}
                  className="h-11 px-8 bg-primary text-primary-foreground font-bold rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-primary/95 transition-all cursor-pointer shadow-md shadow-primary/10 font-sans"
                >
                  Continue Browsing
                  <ArrowRight className="h-4 w-4 shrink-0" />
                </button>

                <div className="flex items-center gap-1 text-[10px] text-muted-foreground/60 font-semibold font-sans">
                  <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                  <span>Your data is secure with us</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
