"use client";

import { useState } from "react";
import { Download, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TrackedDownloadLink } from "@/components/content/tracked-download-link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface DownloadButtonProps {
  pdf: {
    slug: string;
    title: string;
    fileUrl?: string;
    pdfType: string;
  };
  locale?: "hi" | "en";
  variant?: "detail" | "card";
}

export function DownloadButton({ pdf, locale = "hi", variant = "detail" }: DownloadButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const trackKind =
    pdf.pdfType === "monthly" || pdf.pdfType === "half-yearly" || pdf.pdfType === "yearly" || pdf.pdfType === "custom"
      ? "monthly_pdf"
      : pdf.pdfType === "pyq"
      ? "pyq"
      : pdf.pdfType === "syllabus"
      ? "syllabus"
      : "free_pdf";

  const handleComingSoonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(true);
  };

  const isDetail = variant === "detail";

  // Localized messages
  const comingSoonTitle = locale === "hi" ? "जल्द उपलब्ध होगा!" : "Coming Soon!";
  const comingSoonDesc =
    locale === "hi"
      ? "यह पीडीएफ वर्तमान में तैयार की जा रही है और जल्द ही डाउनलोड के लिए उपलब्ध होगी। हमारे साथ बने रहें!"
      : "This PDF is currently being prepared and will be available for download very soon. Stay tuned!";

  const buttonText = locale === "hi" ? "पीडीएफ डाउनलोड करें" : "Download PDF";

  if (pdf.fileUrl) {
    if (isDetail) {
      return (
        <Button asChild className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/95 shadow-soft">
          <TrackedDownloadLink
            input={{
              slug: pdf.slug,
              title: pdf.title,
              kind: trackKind as any,
              url: pdf.fileUrl,
              locale: locale,
            }}
            className="inline-flex items-center justify-center cursor-pointer"
          >
            <Download className="mr-2 h-4 w-4" /> {buttonText}
          </TrackedDownloadLink>
        </Button>
      );
    } else {
      return (
        <Button size="sm" asChild className="rounded-full bg-primary text-primary-foreground hover:bg-primary/95 shrink-0 px-3 cursor-pointer">
          <TrackedDownloadLink
            input={{
              slug: pdf.slug,
              title: pdf.title,
              kind: trackKind as any,
              url: pdf.fileUrl,
              locale: locale,
            }}
            aria-label={buttonText}
          >
            <Download className="h-4 w-4" />
          </TrackedDownloadLink>
        </Button>
      );
    }
  }

  // When pdf.fileUrl is missing, show active button but trigger Coming Soon modal
  return (
    <>
      {isDetail ? (
        <Button
          onClick={handleComingSoonClick}
          className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/95 shadow-soft"
        >
          <Download className="mr-2 h-4 w-4" /> {buttonText}
        </Button>
      ) : (
        <Button
          size="sm"
          onClick={handleComingSoonClick}
          className="rounded-full bg-primary text-primary-foreground hover:bg-primary/95 shrink-0 px-3"
          aria-label={buttonText}
        >
          <Download className="h-4 w-4" />
        </Button>
      )}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[420px] rounded-2xl p-6 bg-card border border-border shadow-soft-lg">
          <DialogHeader className="flex flex-col items-center text-center space-y-3">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Info className="h-6 w-6" />
            </div>
            <DialogTitle className="text-xl font-bold text-foreground">
              {comingSoonTitle}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm leading-relaxed">
              {comingSoonDesc}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 flex justify-center">
            <Button
              onClick={() => setIsOpen(false)}
              className="rounded-full px-6 py-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
            >
              {locale === "hi" ? "ठीक है" : "Close"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
