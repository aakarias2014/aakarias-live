import type { Metadata } from "next";
import { getContentRepository } from "@/lib/content/content-repository";
import { buildMetadata } from "@/lib/seo/metadata";
import { Breadcrumb } from "@/components/content/breadcrumb";
import { PdfCard } from "@/components/content/pdf-card";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Newsletter } from "@/components/content/newsletter";

export const revalidate = 600;

export const metadata: Metadata = buildMetadata({
  title: "Monthly Current Affairs Magazine (PDF)",
  description: "Download free monthly current affairs compilations and magazines for UPSC, MPPSC & State PSC exams in English.",
  path: "/en/monthly-pdf",
  keywords: ["Monthly Current Affairs PDF", "monthly IAS magazine", "UPSC current affairs English"],
});

export default async function EnglishMonthlyPdfPage() {
  const repo = await getContentRepository();
  const pdfs = await repo.listMonthlyPdfs("en", "monthly");

  return (
    <>
      <Section className="pb-0 pt-8">
        <Container size="wide">
          <Breadcrumb items={[{ name: "Monthly PDF", href: "/en/monthly-pdf" }]} />
          <div className="mt-6">
            <h1 className="text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Monthly Current Affairs Magazine
            </h1>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              Comprehensive month-wise revision magazines tailored specifically for UPSC Civil Services and state administrative examinations.
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{pdfs.length} magazines available</p>
          </div>
        </Container>
      </Section>

      <Section className="pt-6">
        <Container size="wide">
          {pdfs.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {pdfs.map((pdf) => (
                <PdfCard key={pdf.id} pdf={pdf} locale="en" />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-lg font-semibold text-foreground">No magazines found</p>
              <p className="mt-2 text-sm text-muted-foreground">
                We are preparing our monthly editions. Check back soon.
              </p>
            </div>
          )}
        </Container>
      </Section>

      <Section className="py-12">
        <Container size="narrow">
          <Newsletter variant="section" />
        </Container>
      </Section>
    </>
  );
}
