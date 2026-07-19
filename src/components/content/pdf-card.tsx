import Image from "next/image";
import Link from "next/link";
import { Download, Calendar, FileText } from "lucide-react";
import type { MonthlyPDF } from "@/lib/content/types";
import { formatPdfDate } from "@/lib/seo/metadata";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DownloadButton } from "@/components/content/download-button";

export function PdfCard({ pdf, locale = "hi" }: { pdf: MonthlyPDF; locale?: "hi" | "en" }) {
  const detailHref = locale === "en" ? `/en/monthly-pdf/${pdf.slug}` : `/monthly-pdf/${pdf.slug}`;

  // Map Sanity pdfType to Zod trackDownload kind schema
  const trackKind = 
    pdf.pdfType === "monthly" || pdf.pdfType === "half-yearly" ? "monthly_pdf" : 
    pdf.pdfType === "pyq" ? "pyq" : 
    pdf.pdfType === "syllabus" ? "syllabus" : 
    "free_pdf";

  return (
    <Card className="group relative flex flex-col overflow-hidden rounded-2xl border-border/60 bg-card p-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg">
      <Link href={detailHref} className="absolute inset-0 z-10" aria-label={pdf.title} />

      {pdf.coverImage ? (
        <div className="relative aspect-[3/4] overflow-hidden bg-muted w-full">
          <Image
            src={pdf.coverImage}
            alt={pdf.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-103"
          />
        </div>
      ) : (
        <div className="aspect-[3/4] w-full bg-gradient-to-br from-primary/10 via-secondary/15 to-accent/10 flex flex-col items-center justify-center p-6 text-center border-b border-border/40">
          <FileText className="h-12 w-12 text-primary/40 mb-3" />
          <span className="font-bold text-foreground text-sm tracking-tight line-clamp-3">{pdf.title}</span>
        </div>
      )}

      <div className="flex flex-1 flex-col gap-3 p-5 relative">
        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <Calendar className="h-3.5 w-3.5 text-primary/60" />
          {formatPdfDate(pdf, locale)}
        </span>

        <h3 className="text-balance text-base font-bold leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary line-clamp-2">
          {pdf.title}
        </h3>

        {pdf.description && (
          <p className="line-clamp-2 text-xs text-muted-foreground">{pdf.description}</p>
        )}

        <div className="mt-auto pt-4 flex gap-2 relative z-20">
          <Button size="sm" variant="outline" asChild className="rounded-full flex-1">
            <Link href={detailHref}>{locale === "hi" ? "विवरण देखें" : "View Details"}</Link>
          </Button>

          <DownloadButton pdf={pdf} locale={locale} variant="card" />
        </div>
      </div>
    </Card>
  );
}
