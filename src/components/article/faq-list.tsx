"use client";

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import type { FAQ } from "@/lib/content/types";

export function FaqList({ faqs, locale = "hi" }: { faqs: FAQ[]; locale?: string }) {
  const isHi = locale === "hi";
  return (
    <div>
      <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-foreground font-devanagari">
        {isHi ? "अक्सर पूछे जाने वाले प्रश्न" : "Frequently Asked Questions"}
      </h2>
      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((faq, i) => (
          <AccordionItem
            key={i}
            value={`faq-${i}`}
            className="rounded-xl border border-border bg-card px-4 shadow-soft"
          >
            <AccordionTrigger className="text-left text-sm font-semibold text-foreground hover:no-underline">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
