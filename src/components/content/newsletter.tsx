"use client";

import { useState, useTransition } from "react";
import { Phone, CheckCircle2, AlertCircle, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { subscribeWhatsApp } from "@/actions/whatsapp";
import { useLanguage } from "@/components/providers/language-provider";
import { siteConfig } from "@/lib/site-config";
import { WhatsappIcon } from "@/components/layout/brand-icons";

export function Newsletter({
  variant = "section",
  className,
}: {
  variant?: "section" | "footer" | "compact";
  className?: string;
}) {
  const { locale } = useLanguage();
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!phone) return;
    setStatus("loading");
    startTransition(async () => {
      const res = await subscribeWhatsApp({
        phone,
        locale,
        source: `newsletter_component_${variant}`,
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

  // Section / compact variant — full-width banner or card
  return (
    <section className={cn("w-full", className)}>
      <div className="relative overflow-hidden rounded-3xl bg-secondary px-6 py-10 text-secondary-foreground shadow-soft sm:px-12 sm:py-14">
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-accent/10 blur-3xl" />
        
        <div className="relative mx-auto max-w-2xl text-center space-y-6">
          <div className="space-y-2">
            <h2 className="text-balance text-2xl font-extrabold tracking-tight sm:text-3xl">
              {locale === "hi" ? "आकार IAS कम्युनिटी से जुड़ें" : "Join Aakar IAS Community"}
            </h2>
            <p className="max-w-md mx-auto text-sm text-secondary-foreground/80 leading-relaxed">
              {locale === "hi"
                ? "रोज़ का दैनिक करेंट अफेयर्स पीडीएफ सीधे अपने व्हाट्सएप पर प्राप्त करें, या सीधे हमारे टेलीग्राम/व्हाट्सएप चैनल से जुड़ें।"
                : "Get daily Current Affairs PDFs directly on your WhatsApp, or join our official Telegram & WhatsApp channels."}
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={onSubmit}
            className="mx-auto flex max-w-md flex-col gap-2 sm:flex-row items-stretch"
          >
            <div className="relative flex-1">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary-foreground/60" />
              <Input
                type="tel"
                placeholder={locale === "hi" ? "मोबाइल नंबर (10 अंक)" : "Mobile Number (10 digits)"}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                aria-label="WhatsApp Phone Number"
                className="h-11 pl-10 border-white/10 bg-white/10 text-white placeholder:text-white/50 focus-visible:ring-emerald-500/20"
              />
            </div>
            <Button 
              type="submit" 
              disabled={isPending} 
              className="shrink-0 h-11 bg-primary text-primary-foreground font-bold hover:bg-primary/95"
            >
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <span className="inline-flex items-center gap-1.5">
                  {locale === "hi" ? "सब्सक्राइब" : "Subscribe"}
                </span>
              )}
            </Button>
          </form>

          {status !== "idle" && (
            <p
              className={cn(
                "text-sm font-semibold flex items-center justify-center gap-1.5",
                status === "success" ? "text-emerald-400" : "text-red-400",
              )}
            >
              {status === "success" ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <AlertCircle className="h-4 w-4" />
              )}
              {message}
            </p>
          )}

          {/* Channels Row */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button
              variant="outline"
              size="sm"
              className="rounded-xl border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold gap-1.5"
              asChild
            >
              <a href={siteConfig.links.whatsapp} target="_blank" rel="noopener noreferrer">
                <WhatsappIcon className="h-4 w-4 text-emerald-400" />
                {locale === "hi" ? "व्हाट्सएप चैनल" : "WhatsApp Channel"}
              </a>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="rounded-xl border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold gap-1.5"
              asChild
            >
              <a href={siteConfig.links.telegram} target="_blank" rel="noopener noreferrer">
                <Send className="h-4 w-4 text-sky-400" />
                {locale === "hi" ? "टेलीग्राम चैनल" : "Telegram Channel"}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
