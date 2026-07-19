import { getContentRepository } from "@/lib/content/content-repository";
import { PortableText } from "next-sanity";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumb } from "@/components/content/breadcrumb";

export const metadata: Metadata = buildMetadata({
  title: "Refund Policy",
  description: "Refund Policy of Aakar IAS. Learn about our refund rules and cancellations for free and paid services.",
  path: "/en/refund",
});

export default async function EnglishRefundPage() {
  const repo = await getContentRepository();
  const page = await repo.getStaticPage("refund", "en");

  if (page && page.body) {
    return (
      <>
        <Section className="pb-0 pt-8">
          <Container size="wide">
            <Breadcrumb items={[{ name: "Refund Policy" }]} />
            <div className="mt-6">
              <h1 className="text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                {page.title}
              </h1>
            </div>
          </Container>
        </Section>

        <Section>
          <Container size="narrow">
            <div className="prose prose-aakar dark:prose-invert max-w-none">
              <PortableText value={page.body} />
            </div>
          </Container>
        </Section>
      </>
    );
  }

  return (
    <>
      <Section className="pb-0 pt-8">
        <Container size="wide">
          <Breadcrumb items={[{ name: "Refund Policy", href: "/en/refund" }]} />
          <div className="mt-6">
            <h1 className="text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Refund Policy
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">Last updated: June 2026</p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container size="narrow">
          <div className="prose prose-aakar dark:prose-invert max-w-none">
            <p>
              Your trust is our utmost priority at Aakar IAS. Currently, the majority of resources offered on our platform (including daily current affairs, articles, and monthly PDFs) are entirely free to access and download.
            </p>

            <h2>1. Free Resources</h2>
            <p>
              All free downloads, PDFs, syllabus files, and articles do not require payment. Consequently, no refund policies apply to these resources.
            </p>

            <h2>2. Paid Services (Phase 2 & Beyond)</h2>
            <p>
              In future phases, should Aakar IAS introduce paid features, such as premium test series, online/offline courses, or publications, the refund guidelines for such transactions will be governed as follows:
            </p>
            <ul>
              <li><strong>Online Courses & Test Series:</strong> Once course access is granted, payments are non-refundable.</li>
              <li><strong>Books & Publications:</strong> In the event that a printed book is delivered in damaged condition, replacement requests must be made within 7 days of delivery.</li>
            </ul>

            <h2>3. Cancellation requests</h2>
            <p>
              Cancellations for prospective paid services will only be evaluated if requested within 24 hours of purchase and before the service is provisioned or active.
            </p>

            <h2>Contact Us</h2>
            <p>
              For any queries or refund-related support, please reach out to us at <a href="mailto:help@aakarias.com">help@aakarias.com</a>.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
