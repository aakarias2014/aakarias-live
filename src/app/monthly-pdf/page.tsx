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
  title: "मासिक करेंट अफेयर्स पत्रिका (Monthly PDF Magazines)",
  description: "यूपीएससी और एमपीपीएससी परीक्षाओं के लिए आकार आईएएस की निःशुल्क मासिक करेंट अफेयर्स पत्रिका डाउनलोड करें।",
  path: "/monthly-pdf",
  keywords: ["Monthly Current Affairs PDF", "मासिक करेंट अफेयर्स", "UPSC magazine", "MPPSC magazine"],
});

export default async function MonthlyPdfPage() {
  const repo = await getContentRepository();
  const pdfs = await repo.listMonthlyPdfs("hi", "monthly");

  return (
    <>
      <Section className="pb-0 pt-8">
        <Container size="wide">
          <Breadcrumb items={[{ name: "Monthly PDF" }]} />
          <div className="mt-6">
            <h1 className="text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              मासिक करेंट अफेयर्स पत्रिका
            </h1>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              यूपीएससी, एमपीपीएससी और अन्य राज्य पीसीएस परीक्षाओं के लिए समसामयिकी का संपूर्ण मासिक विश्लेषण संकलन।
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{pdfs.length} पत्रिकाएं उपलब्ध</p>
          </div>
        </Container>
      </Section>

      <Section className="pt-6">
        <Container size="wide">
          {pdfs.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {pdfs.map((pdf) => (
                <PdfCard key={pdf.id} pdf={pdf} locale="hi" />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-lg font-semibold text-foreground">कोई पत्रिका उपलब्ध नहीं है</p>
              <p className="mt-2 text-sm text-muted-foreground">
                मासिक पत्रिकाएं शीघ्र ही यहां उपलब्ध कराई जाएंगी। कृपया बाद में जांचें।
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
