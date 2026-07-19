"use client";

import { useEffect, useState } from "react";

interface CountdownProps {
  targetDate: string; // ISO format
  title: string;
  locale?: "hi" | "en";
}

export function Countdown({ targetDate, title, locale = "hi" }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isOver: boolean;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0, isOver: false });

  useEffect(() => {
    const calculateTime = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isOver: false,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (timeLeft.isOver) {
    return (
      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 text-center shadow-soft">
        <h3 className="font-bold text-foreground">{title}</h3>
        <p className="text-sm text-primary font-semibold mt-2">
          {locale === "hi" ? "परीक्षा शुरू हो चुकी है या समाप्त हो चुकी है!" : "The exam has started or concluded!"}
        </p>
      </div>
    );
  }

  const items = [
    { value: timeLeft.days, label: locale === "hi" ? "दिन" : "Days" },
    { value: timeLeft.hours, label: locale === "hi" ? "घंटे" : "Hours" },
    { value: timeLeft.minutes, label: locale === "hi" ? "मिनट" : "Mins" },
    { value: timeLeft.seconds, label: locale === "hi" ? "सेकंड" : "Secs" },
  ];

  return (
    <div className="rounded-3xl border border-border/60 bg-secondary text-secondary-foreground p-6 sm:p-8 shadow-soft-lg relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--primary)_0%,_transparent_50%)] opacity-25" />
      
      <div className="relative z-10 flex flex-col items-center text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-accent">
          {locale === "hi" ? "उलटी गिनती (Countdown)" : "Countdown Alert"}
        </span>
        <h2 className="text-xl font-bold text-white tracking-tight sm:text-2xl">
          {title}
        </h2>

        <div className="flex gap-3 sm:gap-4 justify-center items-center pt-2">
          {items.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 shadow-soft">
                <span className="text-2xl sm:text-3xl font-extrabold text-white">
                  {String(item.value).padStart(2, "0")}
                </span>
              </div>
              <span className="mt-2 text-xs font-medium text-white/70">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
