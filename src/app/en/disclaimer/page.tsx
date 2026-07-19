import { getContentRepository } from "@/lib/content/content-repository";
import { PortableText } from "next-sanity";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumb } from "@/components/content/breadcrumb";

export const metadata: Metadata = buildMetadata({
  title: "Disclaimer",
  description: "Disclaimer of Aakar IAS. Please read this disclaimer regarding our educational resources and exam preparation materials.",
  path: "/en/disclaimer",
});

export default async function EnglishDisclaimerPage() {
  const repo = await getContentRepository();
  const page = await repo.getStaticPage("disclaimer", "en");

  if (page && page.body) {
    return (
      <>
        <Section className="pb-0 pt-8">
          <Container size="wide">
            <Breadcrumb items={[{ name: "Disclaimer" }]} />
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
          <Breadcrumb items={[{ name: "Disclaimer", href: "/en/disclaimer" }]} />
          <div className="mt-6">
            <h1 className="text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Disclaimer
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">Last updated: June 2026</p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container size="narrow">
          <div className="prose prose-aakar dark:prose-invert max-w-none">
            <p>
              The information provided by Aakar IAS on our website is for general educational and informational purposes only. Please read the following disclaimer carefully before using our platform.
            </p>

            <h2>1. Educational Purposes Only</h2>
            <p>
              All study notes, weekly digests, articles, and exam patterns shared here are intended to assist candidates preparing for UPSC, MPPSC, and State PSC examinations. We do not guarantee selection or success in any public services examination.
            </p>

            <h2>2. Information Accuracy</h2>
            <p>
              While we curate details from reliable sources (including PIB, The Hindu, and official reports), Aakar IAS does not guarantee the absolute accuracy or timeliness of such content. Government rules, exam structures, and syllabus specifications are subject to revision, and users should verify them independently.
            </p>

            <h2>3. External Links</h2>
            <p>
              Our website may contain links to external sites that are not operated or controlled by us. We assume no responsibility for the policies or content of any linked third-party website.
            </p>

            <h2>4. No Professional Advice</h2>
            <p>
              Accessing our free study notes or reading daily analysis does not constitute a formal counseling, advisory, or student-mentor contract with Aakar IAS.
            </p>

            <h2>Contact Us</h2>
            <p>
              For further clarification regarding this disclaimer, please contact us at <a href="mailto:help@aakarias.com">help@aakarias.com</a>.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
