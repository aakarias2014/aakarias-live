import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumb } from "@/components/content/breadcrumb";
import { OfflineCoursesClient } from "./offline-courses-client";
import { getContentRepository } from "@/lib/content/content-repository";
import { JsonLd } from "@/components/seo/json-ld";
import { faqJsonLd } from "@/lib/seo/jsonld";

const offlineFaqs = [
  {
    q: "What is the fees of Aakar IAS MPPSC coaching?",
    a: "Aakar IAS offers flexible fee structures for MPPSC offline classroom coaching. Fees vary by course type — Prelims, Mains, Pre+Mains Combined, Foundation Batch, and Test Series. Installment and EMI options are available. Visit our Indore center or call our counselors for the latest fee details."
  },
  {
    q: "Which is the best online coaching for MPPSC in Indore?",
    a: "Aakar IAS is widely regarded as one of the best MPPSC coaching institutes in Indore, offering both offline classroom and online programs. With 5,000+ enrolled students, our team of experienced faculty, comprehensive study material, regular test series, and a hybrid learning model, Aakar IAS provides a complete preparation ecosystem."
  },
  {
    q: "Does Aakar IAS provide study materials?",
    a: "Yes, all offline classroom students receive comprehensive study materials including printed notes, current affairs magazines, previous year question papers, subject-wise booklets, and practice workbooks. Digital PDFs are also available through the Aakar IAS mobile app."
  },
];

export const metadata: Metadata = buildMetadata({
  title: "Offline Courses & Classroom Program",
  description: "Explore Aakar IAS offline classroom courses, upcoming batches, study materials, and one-on-one mentorship programs at our Indore and Prayagraj centers.",
  path: "/en/offline-courses",
});

export default async function EnglishOfflineCoursesPage() {
  const repo = await getContentRepository();
  const [faculties, offlineBatches, brochureUrl] = await Promise.all([
    repo.listFaculties("en"),
    repo.listOfflineBatches("en"),
    repo.getOfflineBrochureUrl(),
  ]);

  return (
    <>
      {/* Main Interactive Offline Courses Content */}
      <OfflineCoursesClient faculties={faculties} offlineBatches={offlineBatches} brochureUrl={brochureUrl || undefined} />

      {/* ─── FAQ Section (Google PAA) ──────────────────────────────── */}
      <Section className="bg-muted/20">
        <Container size="narrow">
          <h2 className="text-2xl font-extrabold text-foreground border-l-4 border-primary pl-4 mb-6">
            Frequently Asked Questions — Offline Courses
          </h2>
          <div className="space-y-4">
            {offlineFaqs.map((faq, i) => (
              <details
                key={i}
                className="group bg-card border border-border rounded-xl p-5 [&_summary::-webkit-details-marker]:hidden cursor-pointer"
              >
                <summary className="flex justify-between items-center list-none select-none font-bold text-foreground text-base">
                  <span className="group-hover:text-primary transition-colors pr-4">{faq.q}</span>
                  <span className="text-primary font-light text-2xl transition-transform duration-200 group-open:rotate-45">+</span>
                </summary>
                <div className="text-muted-foreground text-sm leading-relaxed mt-3 pt-3 border-t border-border/60 animate-in fade-in slide-in-from-top-2">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </Container>
      </Section>

      {/* FAQ JSON-LD for SEO */}
      <JsonLd data={faqJsonLd(offlineFaqs.map(f => ({ question: f.q, answer: f.a })))} />
    </>
  );
}
