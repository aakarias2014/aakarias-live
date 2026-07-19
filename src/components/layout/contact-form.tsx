"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { submitContact } from "@/actions/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, AlertCircle, Send } from "lucide-react";

export function ContactForm({ locale = "hi" }: { locale?: "hi" | "en" }) {
  const [status, setStatus] = useState<{ success?: boolean; message?: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string || undefined,
      subject: formData.get("subject") as string || undefined,
      message: formData.get("message") as string,
      locale: locale,
    };

    try {
      const res = await submitContact(data);
      setStatus(res);
      if (res.success) {
        (e.target as HTMLFormElement).reset();
      }
    } catch (err: any) {
      setStatus({ success: false, message: err?.message || "Something went wrong." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
      <div>
        <h3 className="text-lg font-bold text-foreground">
          {locale === "hi" ? "हमें संदेश भेजें" : "Send us a Message"}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          {locale === "hi"
            ? "नीचे दिया गया फ़ॉर्म भरें और हमारी टीम आपसे जल्द ही संपर्क करेगी।"
            : "Fill out the form below and our team will get back to you shortly."}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-semibold text-foreground">
            {locale === "hi" ? "नाम *" : "Name *"}
          </label>
          <Input id="name" name="name" required placeholder={locale === "hi" ? "आपका नाम" : "Your Name"} />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-semibold text-foreground">
            {locale === "hi" ? "ईमेल *" : "Email *"}
          </label>
          <Input id="email" name="email" type="email" required placeholder="yourname@example.com" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-semibold text-foreground">
            {locale === "hi" ? "फोन नंबर (वैकल्पिक)" : "Phone Number (Optional)"}
          </label>
          <Input id="phone" name="phone" placeholder={locale === "hi" ? "10 अंकों का नंबर" : "10-digit number"} />
        </div>
        <div className="space-y-2">
          <label htmlFor="subject" className="text-sm font-semibold text-foreground">
            {locale === "hi" ? "विषय (वैकल्पिक)" : "Subject (Optional)"}
          </label>
          <Input id="subject" name="subject" placeholder={locale === "hi" ? "पूछताछ का विषय" : "Topic of inquiry"} />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-semibold text-foreground">
          {locale === "hi" ? "आपका संदेश *" : "Your Message *"}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder={locale === "hi" ? "आपका संदेश यहां लिखें..." : "Type your message here..."}
        />
      </div>

      {status && (
        <div
          className={`flex items-start gap-3 rounded-lg p-4 text-sm ${
            status.success
              ? "bg-green-500/10 text-green-600 dark:text-green-400"
              : "bg-destructive/10 text-destructive"
          }`}
        >
          {status.success ? (
            <CheckCircle2 className="h-5 w-5 shrink-0" />
          ) : (
            <AlertCircle className="h-5 w-5 shrink-0" />
          )}
          <span>{status.message}</span>
        </div>
      )}

      <Button type="submit" disabled={loading} className="w-full sm:w-auto rounded-full">
        {loading ? (
          locale === "hi" ? "भेज रहा है..." : "Sending..."
        ) : (
          <>
            {locale === "hi" ? "संदेश भेजें" : "Send Message"}
            <Send className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );
}
