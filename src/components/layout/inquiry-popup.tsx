"use client";

import { useState, useEffect, FormEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  X, Check, Phone, ArrowRight, Download, GraduationCap, MapPin, 
  Mail, User, Star, Loader2, MessageSquare, Sparkles, Laptop, ShieldCheck 
} from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { cn } from "@/lib/utils";
import { submitInquiry } from "@/actions/contact";

export function InquiryPopup() {
  const { locale } = useLanguage();
  const pathname = usePathname() ?? "/";

  // State
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [exam, setExam] = useState("MPPSC");
  const [batch, setBatch] = useState("Prelims");
  const [customBatch, setCustomBatch] = useState("");
  const [mode, setMode] = useState("Online");
  const [medium, setMedium] = useState("Hindi");
  const [interests, setInterests] = useState<string[]>(["Mentorship"]);
  const [consent, setConsent] = useState(true);
  
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [refId, setRefId] = useState("");
  const [errors, setErrors] = useState<{ name?: string; mobile?: string; consent?: string; customBatch?: string }>({});

  // Hide on Sanity Studio route
  if (pathname.startsWith("/studio")) return null;

  // Auto-open logic (only once per session, after 5 seconds)
  useEffect(() => {
    const hasShown = sessionStorage.getItem("aakar_inquiry_shown");
    if (!hasShown) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem("aakar_inquiry_shown", "true");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleInterestToggle = (interest: string) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter((i) => i !== interest));
    } else {
      setInterests([...interests, interest]);
    }
  };

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!name.trim()) {
      newErrors.name = "Name is required";
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    const mobileRegex = /^[0-9]{10}$/;
    if (!mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!mobileRegex.test(mobile.trim())) {
      newErrors.mobile = "Please enter a valid 10-digit mobile number";
    }

    if (batch === "Other (Custom Text)" && !customBatch.trim()) {
      newErrors.customBatch = "Custom program name is required";
    }

    if (!consent) {
      newErrors.consent = "You must agree to continue";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent | React.MouseEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await submitInquiry({
        name,
        mobile,
        city: city || undefined,
        email: email || undefined,
        exam,
        batch: batch === "Other (Custom Text)" ? customBatch.trim() : batch,
        mode,
        medium,
        interests,
        locale: locale as "hi" | "en",
      });

      if (res.success) {
        const randomId = "AK" + Math.floor(1000 + Math.random() * 9000);
        setRefId(randomId);
        setSubmitted(true);
      } else {
        alert(res.message || "Failed to submit. Please try again.");
      }
    } catch (err) {
      console.error(err);
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
        setCity("");
        setEmail("");
        setExam("MPPSC");
        setBatch("Prelims");
        setCustomBatch("");
        setMode("Online");
        setMedium("Hindi");
        setInterests(["Mentorship"]);
        setConsent(true);
      }
    }, 400);
  };

  // English-only Translations
  const t = {
    badge: "Admission Open 2026-27",
    title: "Start Your Preparation Today",
    subtitle: "Get a personalized roadmap from our expert IAS counselors.",
    
    labelName: "Student Name *",
    phName: "Enter your full name",
    
    labelMobile: "Mobile *",
    phMobile: "10-digit mobile number",
    
    labelCity: "City",
    phCity: "e.g. Indore",
    
    labelEmail: "Email Address",
    phEmail: "example@email.com",
    
    labelExam: "Exam",
    labelBatch: "Batch",
    labelMode: "Mode",
    labelMedium: "Medium",
    
    labelInterests: "Interested In",
    liveClasses: "Live Classes",
    mentorship: "Mentorship",
    testSeries: "Test Series",
    
    consentText: "I agree to receive academic updates and counselling calls from Aakar IAS Academy.",
      
    btnSubmit: "Request Free Counselling",
    ratingText: "4.9/5 Rating (Trusted by Thousands)",
    successTitle: "Thank You!",
    successMsg: "Our counsellor will contact you shortly to guide you on your administrative journey.",
    exploreCourses: "Explore Courses",
    downloadApp: "Download App",
    securePortal: "Secure Portal",
    refIdLabel: "Ref ID",
    whatsappBtn: "WhatsApp",
    callBtn: "Call Now",
    fabText: "Enquire Now"
  };

  return (
    <>
      {/* ─── FLOATING ACTION BUTTON (Trigger) ────────────────────────── */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className={cn(
            "fixed z-40 bg-primary text-primary-foreground font-semibold shadow-2xl hover:scale-105 hover:bg-primary/95 transition-all duration-300 flex items-center justify-center gap-2",
            // Desktop
            "lg:bottom-6 lg:right-6 lg:px-6 lg:py-4 lg:rounded-2xl",
            // Mobile (floating above bottom navigation bar)
            "bottom-20 right-4 px-4 py-3 rounded-full text-xs"
          )}
          aria-label="Open Inquiry Form"
        >
          {/* Pulsing ring */}
          <span className="absolute inset-0 rounded-full lg:rounded-2xl border-2 border-primary animate-ping opacity-35" />
          <MessageSquare className="h-4 w-4 shrink-0" />
          <span className="font-heading tracking-wide uppercase text-xs">{t.fabText}</span>
        </button>
      )}

      {/* ─── BOTTOM SHEET (Mobile) & POPUP DIALOG (Desktop) ─────────── */}
      {isOpen && (
        <>
          {/* Backdrop (Darkens screen when open) */}
          <div 
            onClick={handleClose}
            className="fixed inset-0 bg-black/40 dark:bg-black/60 z-50 backdrop-blur-xs transition-opacity duration-300 lg:bg-black/10" 
          />

          {/* Modal Container */}
          <div
            className={cn(
              "fixed z-50 transition-all duration-500 ease-out flex flex-col bg-card border border-border shadow-2xl overflow-hidden",
              // Mobile Bottom Sheet
              "inset-x-0 bottom-0 max-h-[88dvh] rounded-t-[24px] translate-y-0 lg:translate-y-0",
              // Desktop Floating Card (bottom-right)
              "lg:inset-auto lg:bottom-6 lg:right-6 lg:w-[420px] lg:max-h-[90vh] lg:rounded-[24px] lg:border-border/60 animate-in fade-in slide-in-from-bottom-8 duration-300"
            )}
            id="inquiry-popup-container"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground hover:bg-muted/60 p-1.5 rounded-full transition-colors z-20"
              aria-label="Close Inquiry Form"
            >
              <X className="h-4.5 w-4.5" />
            </button>

            {/* Content Switcher: Form vs Success State */}
            {!submitted ? (
              <>
                {/* Header */}
                <div className="p-6 pb-2 space-y-2">
                  <span className="inline-flex items-center px-3 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase bg-primary/10 text-primary border border-primary/20">
                    {t.badge}
                  </span>
                  <div>
                    <h2 className="text-xl font-bold text-foreground leading-tight tracking-tight flex items-center gap-1.5 font-sans">
                      <Sparkles className="h-5 w-5 text-primary shrink-0 animate-pulse" />
                      {t.title}
                    </h2>
                    <p className="text-xs text-muted-foreground mt-1 font-sans">
                      {t.subtitle}
                    </p>
                  </div>
                </div>

                {/* Scrollable Body */}
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5 max-h-[50vh] lg:max-h-[55vh] scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider px-0.5 font-sans">
                        {t.labelName}
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/75" />
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className={cn(
                            "w-full h-12 bg-muted/30 border border-border rounded-xl pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none font-sans",
                            errors.name && "border-destructive focus:ring-destructive/20 focus:border-destructive"
                          )}
                          placeholder={t.phName}
                        />
                      </div>
                      {errors.name && <p className="text-[11px] text-destructive font-medium px-0.5 font-sans">{errors.name}</p>}
                    </div>

                    {/* Mobile & City */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Mobile */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider px-0.5 font-sans">
                          {t.labelMobile}
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/75" />
                          <input
                            type="tel"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            className={cn(
                              "w-full h-12 bg-muted/30 border border-border rounded-xl pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none font-sans",
                              errors.mobile && "border-destructive focus:ring-destructive/20 focus:border-destructive"
                            )}
                            placeholder={t.phMobile}
                          />
                        </div>
                        {errors.mobile && <p className="text-[11px] text-destructive font-medium px-0.5 font-sans">{errors.mobile}</p>}
                      </div>

                      {/* City */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider px-0.5 font-sans">
                          {t.labelCity}
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/75" />
                          <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full h-12 bg-muted/30 border border-border rounded-xl pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none font-sans"
                            placeholder={t.phCity}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider px-0.5 font-sans">
                        {t.labelEmail}
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/75" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full h-12 bg-muted/30 border border-border rounded-xl pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none font-sans"
                          placeholder={t.phEmail}
                        />
                      </div>
                    </div>

                    {/* Exam / Batch / Mode / Medium Selects */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider px-0.5 font-sans">
                          {t.labelExam}
                        </label>
                        <select
                          value={exam}
                          onChange={(e) => setExam(e.target.value)}
                          className="w-full h-11 bg-muted/40 border border-border rounded-xl px-2.5 text-xs font-semibold focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none cursor-pointer font-sans"
                        >
                          <option value="MPPSC">MPPSC</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider px-0.5 font-sans">
                          {t.labelBatch}
                        </label>
                        <select
                          value={batch}
                          onChange={(e) => setBatch(e.target.value)}
                          className="w-full h-11 bg-muted/40 border border-border rounded-xl px-2.5 text-xs font-semibold focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none cursor-pointer font-sans"
                        >
                          <option value="Prelims">Prelims</option>
                          <option value="Mains">Mains</option>
                          <option value="Pre+Mains">Pre+Mains</option>
                          <option value="UG Foundation batch">UG Foundation batch</option>
                          <option value="Test Series">Test Series</option>
                          <option value="Books">Books</option>
                          <option value="Other (Custom Text)">Other (Custom Text)</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider px-0.5 font-sans">
                          {t.labelMode}
                        </label>
                        <select
                          value={mode}
                          onChange={(e) => setMode(e.target.value)}
                          className="w-full h-11 bg-muted/40 border border-border rounded-xl px-2.5 text-xs font-semibold focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none cursor-pointer font-sans"
                        >
                          <option value="Online">Online</option>
                          <option value="Offline">Offline</option>
                          <option value="Hybrid">Hybrid</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider px-0.5 font-sans">
                          {t.labelMedium}
                        </label>
                        <select
                          value={medium}
                          onChange={(e) => setMedium(e.target.value)}
                          className="w-full h-11 bg-muted/40 border border-border rounded-xl px-2.5 text-xs font-semibold focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none cursor-pointer font-sans"
                        >
                          <option value="Hindi">Hindi</option>
                          <option value="English">English</option>
                        </select>
                      </div>
                    </div>

                    {/* Custom Batch Name Input */}
                    {batch === "Other (Custom Text)" && (
                      <div className="space-y-1 mt-2.5 animate-in fade-in slide-in-from-top-2 duration-200">
                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider px-0.5 font-sans">
                          Custom Batch / Program Name *
                        </label>
                        <input
                          type="text"
                          value={customBatch}
                          onChange={(e) => setCustomBatch(e.target.value)}
                          placeholder="e.g. History Optional, Test Series 2026"
                          className={cn(
                            "w-full h-11 bg-muted/40 border rounded-xl px-3 text-xs font-semibold focus:ring-2 focus:ring-primary/20 transition-all outline-none font-sans",
                            errors.customBatch ? "border-destructive focus:ring-destructive/20" : "border-border focus:border-primary"
                          )}
                        />
                        {errors.customBatch && (
                          <p className="text-[10px] font-semibold text-destructive px-1.5 pt-0.5">
                            {errors.customBatch}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Interests Checklist */}
                    <div className="space-y-2">
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider px-0.5 font-sans">
                        {t.labelInterests}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { key: "Live Classes", label: t.liveClasses, icon: Laptop },
                          { key: "Mentorship", label: t.mentorship, icon: GraduationCap },
                          { key: "Test Series", label: t.testSeries, icon: Check }
                        ].map((item) => {
                          const Icon = item.icon;
                          const selected = interests.includes(item.key);
                          return (
                            <button
                              key={item.key}
                              type="button"
                              onClick={() => handleInterestToggle(item.key)}
                              className={cn(
                                "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 cursor-pointer select-none font-sans",
                                selected
                                  ? "bg-primary/10 text-primary border-primary/30 shadow-xs"
                                  : "bg-muted/40 text-muted-foreground border-border hover:bg-muted/60"
                              )}
                            >
                              <Icon className="h-3.5 w-3.5 shrink-0" />
                              {item.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Consent Text */}
                    <div className="flex items-start gap-2.5 p-3 bg-muted/30 border border-border/40 rounded-xl">
                      <input
                        type="checkbox"
                        id="consent-checkbox"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        className="mt-0.5 h-4 w-4 text-primary focus:ring-primary/30 border-border rounded cursor-pointer"
                      />
                      <label 
                        htmlFor="consent-checkbox" 
                        className={cn(
                          "text-[11px] leading-normal text-muted-foreground cursor-pointer select-none font-sans",
                          errors.consent && "text-destructive font-medium"
                        )}
                      >
                        {t.consentText}
                      </label>
                    </div>
                  </form>
                </div>

                {/* Footer Meta & Actions */}
                <div className="p-6 pt-3 space-y-4 border-t border-border/40 bg-muted/10">
                  {/* Rating Info */}
                  <div className="flex items-center justify-between text-[11px] text-muted-foreground pb-2 border-b border-border/40">
                    <div className="flex items-center gap-1 font-sans">
                      <div className="flex text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-current shrink-0" />
                        ))}
                      </div>
                      <span className="font-bold text-foreground">4.9/5</span>
                      <span>({locale === "hi" ? "5,000+ चयनित छात्र" : "5,000+ Success Stories"})</span>
                    </div>
                    <span className="font-extrabold text-primary uppercase text-[9px] tracking-wider font-sans">{locale === "hi" ? "सर्वश्रेष्ठ परिणाम" : "Trusted Brand"}</span>
                  </div>

                  {/* Primary Submit Button */}
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full h-12 bg-primary text-primary-foreground font-bold rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-primary/95 transition-all cursor-pointer shadow-md shadow-primary/10 active:translate-y-[1px] font-sans"
                  >
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        {t.btnSubmit}
                        <ArrowRight className="h-4 w-4 shrink-0" />
                      </>
                    )}
                  </button>

                  {/* WhatsApp & Call Actions */}
                  <div className="grid grid-cols-2 gap-3">
                    <a
                      href="https://wa.me/910000000000"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 hover:bg-emerald-500/10 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all font-sans"
                    >
                      <MessageSquare className="h-3.5 w-3.5 fill-current shrink-0" />
                      {t.whatsappBtn}
                    </a>
                    <a
                      href="tel:+910000000000"
                      className="h-10 border border-border text-foreground hover:bg-muted/40 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all font-sans"
                    >
                      <Phone className="h-3.5 w-3.5 shrink-0" />
                      {t.callBtn}
                    </a>
                  </div>
                </div>
              </>
            ) : (
              /* Success State */
              <div className="p-8 text-center flex flex-col items-center justify-center space-y-6">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center relative">
                  <span className="absolute inset-0 bg-primary/5 rounded-full animate-ping opacity-40" />
                  <Check className="h-10 w-10 text-primary shrink-0 stroke-[3]" />
                </div>

                <div className="space-y-1">
                  <h2 className="text-2xl font-bold text-primary tracking-tight font-sans">
                    {t.successTitle}
                  </h2>
                  <p className="text-xs text-muted-foreground bg-muted/60 py-1 px-4 rounded-full inline-block font-semibold border border-border/40 font-sans">
                    Success!
                  </p>
                </div>

                <p className="text-sm text-foreground/80 leading-relaxed max-w-[280px] font-sans">
                  {t.successMsg}
                </p>

                <div className="w-full flex flex-col gap-2.5">
                  <button
                    onClick={handleClose}
                    className="w-full h-12 bg-primary text-primary-foreground font-bold rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-primary/95 transition-all cursor-pointer shadow-md shadow-primary/10 font-sans"
                  >
                    {t.exploreCourses}
                    <ArrowRight className="h-4 w-4 shrink-0" />
                  </button>
                  <Link
                    href="/download"
                    onClick={handleClose}
                    className="w-full h-12 border border-border text-foreground hover:bg-muted/40 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all font-sans"
                  >
                    <Download className="h-4 w-4 shrink-0" />
                    {t.downloadApp}
                  </Link>
                </div>

                {/* Footer Security Meta */}
                <div className="pt-4 border-t border-border/40 w-full flex justify-between items-center text-[10px] text-muted-foreground/70 font-semibold font-sans">
                  <div className="flex items-center gap-1">
                    <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                    <span>{t.securePortal}</span>
                  </div>
                  <div>
                    {t.refIdLabel}: <span className="font-bold text-foreground">{refId}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
