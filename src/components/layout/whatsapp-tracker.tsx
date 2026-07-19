"use client";

import { useEffect, useState } from "react";
import { logWhatsAppClick, submitWhatsAppLead } from "@/actions/contact";
import { X, Loader2, MessageSquare } from "lucide-react";

// Helper function to append a context-aware default message if the WhatsApp link doesn't already have one
function appendDefaultMessageIfNeeded(urlStr: string, locale: "hi" | "en"): string {
  try {
    // If it already has a non-empty text parameter, don't modify it
    if (urlStr.includes("text=") && !urlStr.endsWith("text=") && !urlStr.includes("text=&")) {
      return urlStr;
    }
    
    // Extract base URL and clean query string
    let cleanUrl = urlStr;
    if (urlStr.includes("text")) {
      // Remove empty or incomplete text params to clean it up
      cleanUrl = urlStr.replace(/[?&]text(?:=[^&]*)?/g, "");
    }

    const path = window.location.pathname;
    const documentTitle = document.title.split("|")[0].trim();
    
    let message = "";
    if (locale === "hi") {
      if (path.includes("/online-courses/") || path.includes("/offline-courses/")) {
        message = `नमस्ते आकार IAS, मैं इस कोर्स के बारे में जानकारी चाहता हूँ: ${documentTitle}`;
      } else if (path.includes("/test-series")) {
        message = `नमस्ते आकार IAS, मैं टेस्ट सीरीज़ के बारे में जानकारी चाहता हूँ: ${documentTitle}`;
      } else if (path.includes("/books")) {
        message = `नमस्ते आकार IAS, मैं पुस्तक के बारे में जानकारी चाहता हूँ: ${documentTitle}`;
      } else {
        message = "नमस्ते आकार IAS, मुझे आपके सिविल सेवा परीक्षा मार्गदर्शन के बारे में जानकारी चाहिए।";
      }
    } else {
      if (path.includes("/online-courses/") || path.includes("/offline-courses/")) {
        message = `Hello Aakar IAS, I want to inquire about the course: ${documentTitle}`;
      } else if (path.includes("/test-series")) {
        message = `Hello Aakar IAS, I want to inquire about the Test Series: ${documentTitle}`;
      } else if (path.includes("/books")) {
        message = `Hello Aakar IAS, I want to inquire about the book: ${documentTitle}`;
      } else {
        message = "Hello Aakar IAS, I want to inquire about your civil services preparation programs.";
      }
    }
    
    const separator = cleanUrl.includes("?") ? "&" : "?";
    return `${cleanUrl}${separator}text=${encodeURIComponent(message)}`;
  } catch (e) {
    return urlStr;
  }
}

export function WhatsAppTracker() {
  const [isOpen, setIsOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const [targetUrl, setTargetUrl] = useState("");
  const [locale, setLocale] = useState<"hi" | "en">("hi");

  useEffect(() => {
    console.log("🟢 [whatsapp-tracker] Global tracker component mounted.");

    // Determine language from page URL on mount
    const isEn = window.location.pathname.startsWith("/en");
    setLocale(isEn ? "en" : "hi");

    // 1. Intercept all normal <a> clicks
    const handleGlobalClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      if (!target) return;

      const anchor = target.closest?.("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href") || "";
      if (href.includes("wa.me") || href.includes("whatsapp.com")) {
        console.log("ℹ [whatsapp-tracker] Intercepted click on WhatsApp link:", href);

        const pageUrl = window.location.href;
        const pageLocale = pageUrl.includes("/en") ? "en" : "hi";
        setLocale(pageLocale);

        // Intercept navigation, save target URL and open modal
        event.preventDefault();
        event.stopPropagation();
        
        // Auto-heal empty text parameter with context-aware message
        const healedHref = appendDefaultMessageIfNeeded(href, pageLocale);
        console.log("ℹ [whatsapp-tracker] Healed WhatsApp URL with message:", healedHref);
        setTargetUrl(healedHref);
        
        // Retrieve and pre-fill phone number if available
        let savedPhone = "";
        try {
          savedPhone = localStorage.getItem("aakar_whatsapp_phone") || "";
          if (savedPhone === "undefined" || savedPhone === "null") {
            savedPhone = "";
          }
        } catch (err) {
          console.error("⚠ [whatsapp-tracker] Failed to read localStorage:", err);
        }

        console.log("ℹ [whatsapp-tracker] Pre-filling phone number:", savedPhone);
        setPhone(savedPhone);
        setError("");
        setIsOpen(true);
      }
    };

    document.addEventListener("click", handleGlobalClick, { capture: true });

    // 2. Intercept programmatic window.open calls
    const originalOpen = window.open;
    window.open = function (
      url?: string | URL,
      target?: string,
      features?: string
    ) {
      if (
        url &&
        (url.toString().includes("wa.me") ||
          url.toString().includes("whatsapp.com"))
      ) {
        console.log("ℹ [whatsapp-tracker] Intercepted window.open call for WhatsApp:", url.toString());

        const pageUrl = window.location.href;
        const pageLocale = pageUrl.includes("/en") ? "en" : "hi";
        setLocale(pageLocale);

        // Auto-heal empty text parameter with context-aware message
        const healedUrl = appendDefaultMessageIfNeeded(url.toString(), pageLocale);
        console.log("ℹ [whatsapp-tracker] Healed WhatsApp URL with message:", healedUrl);
        setTargetUrl(healedUrl);
        
        let savedPhone = "";
        try {
          savedPhone = localStorage.getItem("aakar_whatsapp_phone") || "";
          if (savedPhone === "undefined" || savedPhone === "null") {
            savedPhone = "";
          }
        } catch (err) {
          console.error("⚠ [whatsapp-tracker] Failed to read localStorage:", err);
        }

        console.log("ℹ [whatsapp-tracker] Pre-filling phone number:", savedPhone);
        setPhone(savedPhone);
        setError("");
        setIsOpen(true);
        return null;
      }
      return originalOpen.apply(this, arguments as any);
    };

    return () => {
      console.log("🔴 [whatsapp-tracker] Cleaning up event listeners and restoring window.open.");
      document.removeEventListener("click", handleGlobalClick, { capture: true });
      window.open = originalOpen;
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const cleanPhone = phone.trim();
    const mobileRegex = /^[0-9]{10}$/;
    if (!cleanPhone || !mobileRegex.test(cleanPhone)) {
      setError(
        locale === "hi"
          ? "कृपया 10-अंकों का मान्य मोबाइल नंबर दर्ज करें।"
          : "Please enter a valid 10-digit mobile number."
      );
      return;
    }

    setLoading("submitting");
    const pageUrl = window.location.href;
    console.log("📤 [whatsapp-tracker] Saving lead in background & redirecting synchronously.");

    // 1. Save to local storage
    try {
      localStorage.setItem("aakar_whatsapp_phone", cleanPhone);
    } catch (err) {
      console.error("⚠ [whatsapp-tracker] Failed to write to localStorage:", err);
    }

    // 2. Fire the server action in the background (no await to bypass popup blocker)
    submitWhatsAppLead({
      phone: cleanPhone,
      pageUrl,
      targetUrl,
      locale,
    }).catch((err) => {
      console.error("❌ [whatsapp-tracker] Background lead submission failed:", err);
    });

    // 3. Close the modal
    setIsOpen(false);
    setLoading("");

    // 4. Redirect immediately (synchronous context, avoids browser popup blockers)
    console.log("🚀 [whatsapp-tracker] Redirecting user to WhatsApp URL:", targetUrl);
    try {
      const w = window.open(targetUrl, "_blank");
      if (!w) {
        console.warn("⚠ [whatsapp-tracker] window.open was blocked. Falling back to same-tab redirect.");
        window.location.href = targetUrl;
      } else {
        w.focus();
      }
    } catch (err) {
      console.error("❌ [whatsapp-tracker] window.open exception. Falling back to same-tab redirect:", err);
      window.location.href = targetUrl;
    }
  };

  const handleCancel = () => {
    console.log("ℹ [whatsapp-tracker] User cancelled lead capture modal.");
    setIsOpen(false);
    setPhone("");
    setError("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative bg-card border border-border/80 text-card-foreground shadow-2xl p-6 rounded-2xl w-full max-w-md animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleCancel}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
          aria-label="Close dialog"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-6">
          <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <MessageSquare className="h-6 w-6 fill-current" />
          </div>
          <div>
            <h3 className="text-lg font-bold font-sans">
              {locale === "hi" ? "व्हाट्सएप चैट शुरू करें" : "Start WhatsApp Chat"}
            </h3>
            <p className="text-xs text-muted-foreground mt-1 max-w-[280px]">
              {locale === "hi"
                ? "कृपया अपना व्हाट्सएप नंबर दर्ज करें ताकि हम आपके साथ महत्वपूर्ण अपडेट और सामग्री साझा कर सकें।"
                : "Please enter your WhatsApp number so we can share important study resources and updates."}
            </p>
          </div>
        </div>

        {/* Lead Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[11px] uppercase tracking-wider font-bold text-muted-foreground font-sans">
              {locale === "hi" ? "व्हाट्सएप मोबाइल नंबर" : "WhatsApp Mobile Number"}
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-muted-foreground">
                +91
              </span>
              <input
                type="tel"
                maxLength={10}
                placeholder="9876543210"
                value={phone}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^0-9]/g, "");
                  setPhone(val);
                  setError("");
                }}
                disabled={!!loading}
                className="w-full pl-12 pr-4 py-2.5 bg-muted/40 border border-border/80 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 rounded-xl text-sm font-medium font-sans outline-none transition-all disabled:opacity-50"
                autoFocus
              />
            </div>
            {error && (
              <p className="text-red-500 text-xs font-medium mt-1 font-sans">{error}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={!!loading}
            className="w-full h-11 bg-emerald-600 text-white font-semibold rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-emerald-700 active:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-50 transition-all font-sans cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {locale === "hi" ? "प्रोसेस हो रहा है..." : "Connecting..."}
              </>
            ) : (
              <>
                {locale === "hi" ? "चैट शुरू करें" : "Start Chat"}
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
