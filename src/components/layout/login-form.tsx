"use client";

import { useState, useTransition } from "react";
import { signIn, signUp } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { LogIn, UserPlus, AlertCircle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface LoginFormProps {
  locale: "hi" | "en";
}

export function LoginForm({ locale }: LoginFormProps) {
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const labels = {
    hi: {
      signInTab: "लॉगिन",
      signUpTab: "नया अकाउंट",
      emailLabel: "ईमेल पता (Email Address)",
      passwordLabel: "पासवर्ड (Password)",
      nameLabel: "आपका नाम (Full Name)",
      signInBtn: "लॉगिन करें",
      signUpBtn: "अकाउंट बनाएं",
      successSignUp: "अकाउंट सफलतापूर्वक बन गया! अब आप लॉगिन कर सकते हैं।",
      successSignIn: "लॉगिन सफल रहा! रीडायरेक्ट कर रहे हैं...",
    },
    en: {
      signInTab: "Sign In",
      signUpTab: "Register",
      emailLabel: "Email Address",
      passwordLabel: "Password",
      nameLabel: "Full Name",
      signInBtn: "Sign In",
      signUpBtn: "Create Account",
      successSignUp: "Account created successfully! You can now sign in.",
      successSignIn: "Login successful! Redirecting...",
    },
  }[locale];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      let res;
      if (activeTab === "signin") {
        res = await signIn(formData);
      } else {
        res = await signUp(formData);
      }

      if (!res.success) {
        setError(res.error || "Something went wrong");
      } else {
        if (activeTab === "signup") {
          setActiveTab("signin");
          setError(labels.successSignUp);
        } else {
          if (res.isAdmin) {
            router.push(locale === "hi" ? "/admin" : "/en/admin");
          } else {
            router.push(locale === "hi" ? "/dashboard" : "/en/dashboard");
          }
          router.refresh();
        }
      }
    });
  };

  return (
    <Card className="w-full max-w-md overflow-hidden rounded-3xl border-border bg-card p-6 shadow-soft sm:p-8">
      {/* Sliding tabs */}
      <div className="relative mb-8 flex rounded-full bg-muted p-1">
        <button
          type="button"
          onClick={() => {
            setActiveTab("signin");
            setError(null);
          }}
          className={`relative z-10 flex flex-1 items-center justify-center gap-2 py-2 text-sm font-semibold transition-colors rounded-full ${
            activeTab === "signin" ? "text-primary-foreground" : "text-muted-foreground"
          }`}
        >
          <LogIn className="h-4 w-4" />
          {labels.signInTab}
          {activeTab === "signin" && (
            <motion.div
              layoutId="authTab"
              className="absolute inset-0 -z-10 rounded-full bg-primary"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveTab("signup");
            setError(null);
          }}
          className={`relative z-10 flex flex-1 items-center justify-center gap-2 py-2 text-sm font-semibold transition-colors rounded-full ${
            activeTab === "signup" ? "text-primary-foreground" : "text-muted-foreground"
          }`}
        >
          <UserPlus className="h-4 w-4" />
          {labels.signUpTab}
          {activeTab === "signup" && (
            <motion.div
              layoutId="authTab"
              className="absolute inset-0 -z-10 rounded-full bg-primary"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.form
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {error && (
            <div
              className={`flex items-start gap-2.5 rounded-2xl p-4 text-sm ${
                error.includes("सफलतापूर्वक") || error.includes("success")
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                  : "bg-destructive/10 text-destructive border border-destructive/20"
              }`}
            >
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {activeTab === "signup" && (
            <div className="space-y-1.5">
              <label htmlFor="fullName" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {labels.nameLabel}
              </label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                required
                placeholder="Aakar Student"
                disabled={isPending}
                className="rounded-full border-border/60"
              />
            </div>
          )}

          <div className="space-y-1.5">
            <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {labels.emailLabel}
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="student@aakarias.com"
              disabled={isPending}
              className="rounded-full border-border/60"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {labels.passwordLabel}
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              placeholder="••••••••"
              disabled={isPending}
              className="rounded-full border-border/60"
            />
          </div>

          <Button type="submit" disabled={isPending} className="w-full rounded-full h-11 font-semibold mt-6">
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : activeTab === "signin" ? (
              <LogIn className="h-4 w-4 mr-2" />
            ) : (
              <UserPlus className="h-4 w-4 mr-2" />
            )}
            {activeTab === "signin" ? labels.signInBtn : labels.signUpBtn}
          </Button>
        </motion.form>
      </AnimatePresence>
    </Card>
  );
}
