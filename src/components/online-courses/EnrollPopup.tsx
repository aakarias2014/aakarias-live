"use client";

import React, { useState } from "react";
import { GraduationCap, Loader2, X, CheckCircle2 } from "lucide-react";
import { submitOnlineEnrollmentLead } from "@/actions/contact";

/* ─── EnrollPopup: Modal for lead capture ─────────────────────── */

interface EnrollPopupProps {
  isOpen: boolean;
  onClose: () => void;
  courseTitle: string;
  enrollUrl: string;
  locale: "hi" | "en";
}

const labels = {
  hi: {
    heading: "ऑनलाइन कोर्स में प्रवेश लें",
    courseLabel: "चयनित कोर्स / Selected Course",
    nameLabel: "पूरा नाम / Full Name",
    namePlaceholder: "जैसे: राहुल शर्मा",
    phoneLabel: "मोबाइल नंबर / Mobile Number",
    phonePlaceholder: "10 अंकों का नंबर",
    submitBtn: "प्रवेश करें / Enroll Now",
    submitting: "भेजा जा रहा है...",
    successTitle: "जानकारी दर्ज हो गई!",
    successMsg: "कोर्स पेज नई टैब में खुल रहा है...",
  },
  en: {
    heading: "Enroll in Online Course",
    courseLabel: "Selected Course",
    nameLabel: "Full Name",
    namePlaceholder: "e.g. Rahul Sharma",
    phoneLabel: "Mobile Number",
    phonePlaceholder: "10-digit number",
    submitBtn: "Enroll Now",
    submitting: "Submitting...",
    successTitle: "Details Submitted!",
    successMsg: "Opening course page in a new tab...",
  },
};

export function EnrollPopup({ isOpen, onClose, courseTitle, enrollUrl, locale }: EnrollPopupProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const t = labels[locale] || labels.hi;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");
    setErrorMsg("");

    try {
      const res = await submitOnlineEnrollmentLead({
        name,
        phone,
        courseTitle,
        locale,
      });

      if (res.success) {
        setStatus("success");
        setName("");
        setPhone("");

        // After brief success message, open enroll URL and close modal
        setTimeout(() => {
          if (enrollUrl) {
            window.open(enrollUrl, "_blank", "noopener,noreferrer");
          }
          onClose();
          // Reset state after closing
          setTimeout(() => setStatus("idle"), 300);
        }, 1500);
      } else {
        setStatus("error");
        setErrorMsg(res.message || "Failed to submit.");
      }
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
      // Reset state
      setTimeout(() => {
        setName("");
        setPhone("");
        setStatus("idle");
        setErrorMsg("");
      }, 300);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-border bg-background shadow-2xl transition-all duration-300">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/80 px-6 py-4 bg-muted/20">
          <h3 className="text-lg font-bold text-foreground font-devanagari flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            {t.heading}
          </h3>
          <button
            onClick={handleClose}
            className="rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6">
          {status === "success" ? (
            <div className="flex flex-col items-center justify-center py-6 text-center space-y-3 animate-in zoom-in-95 duration-200">
              <div className="h-12 w-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center animate-pulse">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h4 className="text-base font-bold text-foreground font-devanagari">
                {t.successTitle}
              </h4>
              <p className="text-sm text-muted-foreground font-devanagari">
                {t.successMsg}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {status === "error" && (
                <div className="p-3.5 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-xs font-semibold font-sans">
                  {errorMsg}
                </div>
              )}

              {/* Pre-filled Course */}
              <div>
                <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 font-sans">
                  {t.courseLabel}
                </label>
                <input
                  type="text"
                  value={courseTitle}
                  disabled
                  className="w-full h-10 px-3 bg-muted border border-border/80 rounded-lg text-xs font-semibold text-foreground/80 cursor-not-allowed font-sans select-none"
                />
              </div>

              {/* Name Input */}
              <div>
                <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 font-sans">
                  {t.nameLabel} <span className="text-primary font-bold">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.namePlaceholder}
                  className="w-full h-10 px-3 bg-background border border-border hover:border-border/80 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition font-sans"
                />
              </div>

              {/* Mobile Input */}
              <div>
                <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 font-sans">
                  {t.phoneLabel} <span className="text-primary font-bold">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-sm font-semibold text-muted-foreground select-none">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                    placeholder={t.phonePlaceholder}
                    className="w-full h-10 pl-11 pr-3 bg-background border border-border hover:border-border/80 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition font-sans font-semibold tracking-wider"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-10 bg-primary hover:bg-primary/95 text-white font-bold rounded-lg transition-all duration-200 mt-2 flex items-center justify-center gap-2 text-sm disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {t.submitting}
                  </>
                ) : (
                  <>
                    <GraduationCap className="h-4 w-4" />
                    {t.submitBtn}
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── EnrollButton: Wrapper for Server Component pages ────────── */

interface EnrollButtonProps {
  courseTitle: string;
  enrollUrl: string;
  locale: "hi" | "en";
  className?: string;
}

export function EnrollButton({ courseTitle, enrollUrl, locale, className }: EnrollButtonProps) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsPopupOpen(true)}
        className={className || "w-full rounded-xl bg-primary hover:bg-primary/95 text-white font-bold text-base gap-2 h-10 lg:h-11 flex items-center justify-center cursor-pointer transition-all duration-200"}
      >
        <GraduationCap className="h-5 w-5" />
        {locale === "hi" ? "अभी प्रवेश लें (Enroll Now)" : "Enroll Now"}
      </button>

      <EnrollPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        courseTitle={courseTitle}
        enrollUrl={enrollUrl}
        locale={locale}
      />
    </>
  );
}
