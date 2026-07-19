import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Download, Calendar, FileText, ChevronRight, File } from "lucide-react";
import { getContentRepository } from "@/lib/content/content-repository";
import { buildMetadata, formatPdfDate } from "@/lib/seo/metadata";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumb } from "@/components/content/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { DownloadButton } from "@/components/content/download-button";

export const revalidate = 3600; // 1h

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const repo = await getContentRepository();
  const pdfs = await repo.listMonthlyPdfs("hi", "monthly");
  return pdfs.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const repo = await getContentRepository();
  const pdf = await repo.getMonthlyPdf(slug, "hi");
  if (!pdf) return {};

  return buildMetadata({
    title: pdf.title,
    description: pdf.description || `Download ${pdf.title} magazine PDF for UPSC & MPPSC preparation.`,
    path: `/monthly-pdf/${pdf.slug}`,
    image: pdf.coverImage,
  });
}

export default async function MonthlyPdfDetailPage({ params }: Props) {
  const { slug } = await params;
  const repo = await getContentRepository();
  const pdf = await repo.getMonthlyPdf(slug, "hi");

  if (!pdf) notFound();

  // Fetch previous editions
  const allPdfs = await repo.listMonthlyPdfs("hi", "monthly");
  const previousEditions = allPdfs.filter((p) => p.slug !== slug).slice(0, 3);

  const faqs = [
    {
      q: "क्या यह मासिक पत्रिका पूरी तरह से निःशुल्क है?",
      a: "हां, आकार आईएएस की सभी मासिक करेंट अफेयर्स पत्रिकाएं छात्रों के लिए पूरी तरह से निःशुल्क हैं। आप इन्हें पीडीएफ फॉर्मेट में डाउनलोड कर सकते हैं।"
    },
    {
      q: "यह पत्रिका किन परीक्षाओं के लिए उपयोगी है?",
      a: "यह पत्रिका यूपीएससी सिविल सेवा परीक्षा (UPSC CSE), एमपीपीएससी (MPPSC) और अन्य राज्य लोक सेवा आयोगों की प्रारंभिक और मुख्य परीक्षा दोनों के लिए अत्यंत उपयोगी है।"
    },
    {
      q: "पत्रिका हर महीने कब जारी की जाती है?",
      a: "सामान्यतः, प्रत्येक महीने की करेंट अफेयर्स पत्रिका अगले महीने के प्रथम सप्ताह (5 से 7 तारीख तक) में वेबसाइट पर जारी कर दी जाती है।"
    }
  ];

  // Map Sanity pdfType to Zod trackDownload kind schema
  const trackKind = 
    pdf.pdfType === "monthly" || pdf.pdfType === "half-yearly" ? "monthly_pdf" : 
    pdf.pdfType === "pyq" ? "pyq" : 
    pdf.pdfType === "syllabus" ? "syllabus" : 
    "free_pdf";

  return (
    <>
      <Section className="pb-0 pt-8">
        <Container size="wide">
          <Breadcrumb
            items={[
              { name: "Monthly PDF", href: "/monthly-pdf" },
              { name: pdf.title }
            ]}
          />
        </Container>
      </Section>

      <Section>
        <Container size="wide">
          <div className="grid gap-10 lg:grid-cols-12">
            {/* Left Column: Cover & Info */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-start space-y-6">
              <div className="relative aspect-[3/4] w-full max-w-[280px] overflow-hidden rounded-2xl border border-border bg-muted shadow-soft-lg group">
                {pdf.coverImage ? (
                  <Image
                    src={pdf.coverImage}
                    alt={pdf.title}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/15 to-accent/10 flex flex-col items-center justify-center p-6 text-center">
                    <FileText className="h-16 w-16 text-primary/40 mb-3" />
                    <span className="font-bold text-foreground text-sm leading-snug">{pdf.title}</span>
                  </div>
                )}
              </div>

              <div className="w-full max-w-[280px] space-y-3">
                <DownloadButton pdf={pdf} locale="hi" variant="detail" />
              </div>
            </div>

            {/* Right Column: Title, Description, TOC, FAQ */}
            <div className="lg:col-span-8 space-y-8">
              <div className="space-y-4">
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                  <Calendar className="h-3.5 w-3.5 text-primary" />
                  {formatPdfDate(pdf, "hi")}
                </span>
                <h1 className="text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                  {pdf.title}
                </h1>
                <div className="h-1 w-20 bg-primary rounded" />
              </div>

              {pdf.description && (
                <div className="space-y-3">
                  <h2 className="text-lg font-bold text-foreground">विवरण (Description)</h2>
                  <p className="text-muted-foreground leading-relaxed text-sm sm:text-base whitespace-pre-line">
                    {pdf.description}
                  </p>
                </div>
              )}

              {/* Table of Contents */}
              <div className="space-y-3">
                <h2 className="text-lg font-bold text-foreground">विषय सूची (Table of Contents)</h2>
                <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                  <ul className="grid gap-3 sm:grid-cols-2 text-sm text-foreground/80">
                    {pdf.toc && pdf.toc.length > 0 ? (
                      pdf.toc.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <ChevronRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))
                    ) : (
                      <>
                        <li className="flex items-center gap-2">
                          <ChevronRight className="h-4 w-4 text-primary shrink-0" />
                          <span>राष्ट्रीय घटनाक्रम (National Events)</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <ChevronRight className="h-4 w-4 text-primary shrink-0" />
                          <span>अंतर्राष्ट्रीय संबंध (International Relations)</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <ChevronRight className="h-4 w-4 text-primary shrink-0" />
                          <span>आर्थिक परिदृश्य (Economic Landscape)</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <ChevronRight className="h-4 w-4 text-primary shrink-0" />
                          <span>विज्ञान एवं प्रौद्योगिकी (Science & Tech)</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <ChevronRight className="h-4 w-4 text-primary shrink-0" />
                          <span>पर्यावरण और जैव विविधता (Environment)</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <ChevronRight className="h-4 w-4 text-primary shrink-0" />
                          <span>मध्य प्रदेश विशेष (MP Special)</span>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="space-y-3">
                <h2 className="text-lg font-bold text-foreground">बार-बार पूछे जाने वाले प्रश्न (FAQs)</h2>
                <Accordion type="single" collapsible className="w-full border border-border rounded-2xl bg-card p-4 shadow-soft">
                  {faqs.map((faq, idx) => (
                    <AccordionItem key={idx} value={`faq-${idx}`} className="border-b border-border/40 py-1 last:border-0">
                      <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary hover:no-underline py-3">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed pb-4 pt-1">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Previous Editions */}
      {previousEditions.length > 0 && (
        <Section className="bg-muted/20 border-t border-border/40">
          <Container size="wide">
            <h2 className="text-xl font-bold text-foreground mb-6">पिछले संस्करण (Previous Editions)</h2>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {previousEditions.map((p) => (
                <Card key={p.id} className="group relative flex gap-4 p-4 items-center overflow-hidden rounded-2xl border-border bg-card transition-all duration-300 hover:shadow-soft">
                  <Link href={`/monthly-pdf/${p.slug}`} className="absolute inset-0 z-10" />
                  <div className="relative aspect-[3/4] w-14 overflow-hidden rounded bg-muted shrink-0 shadow-sm">
                    {p.coverImage ? (
                      <Image src={p.coverImage} alt={p.title} fill className="object-cover" />
                    ) : (
                      <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                        <File className="h-6 w-6 text-primary/40" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatPdfDate(p, "hi")}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}
