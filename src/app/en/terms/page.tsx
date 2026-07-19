import { getContentRepository } from "@/lib/content/content-repository";
import { PortableText } from "next-sanity";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumb } from "@/components/content/breadcrumb";

export const metadata: Metadata = buildMetadata({
  title: "Terms & Conditions",
  description: "Terms and Conditions of Aakar IAS. Please read these terms carefully before using our website.",
  path: "/en/terms",
});

export default async function EnglishTermsPage() {
  const repo = await getContentRepository();
  const page = await repo.getStaticPage("terms", "en");

  if (page && page.body) {
    return (
      <>
        <Section className="pb-0 pt-8">
          <Container size="wide">
            <Breadcrumb items={[{ name: "Terms & Conditions" }]} />
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
          <Breadcrumb items={[{ name: "Terms & Conditions", href: "/en/terms" }]} />
          <div className="mt-6">
            <h1 className="text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Terms & Conditions
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">Last updated: June 2026</p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container size="narrow">
          <div className="prose prose-aakar dark:prose-invert max-w-none">
            <p>
              Welcome to the Aakar IAS website. By using our website, you agree to comply with and be bound by the following Terms and Conditions. If you do not agree to these terms, please do not use our website.
            </p>

            <h2>1. Intellectual Property</h2>
            <p>
              All materials available on this website, including current affairs articles, blog posts, editorials, graphics, PDFs, logos, and layouts, are the intellectual property of Aakar IAS. You may use this content solely for personal, non-commercial educational study. Redistribution, reproduction, or commercial exploitation of any material without our explicit written permission is strictly prohibited.
            </p>

            <h2>2. Terms of Use</h2>
            <p>You agree to use this website only for lawful purposes and in a manner that does not infringe on or inhibit the use and enjoyment of this site by others.</p>

            <h2>3. Accuracy & Disclaimer</h2>
            <p>
              While we strive to compile accurate, reliable, and up-to-date information, we do not guarantee the completeness, accuracy, or reliability of any contents. This material is designed purely for general educational and informational purposes.
            </p>

            <h2>4. Limitation of Liability</h2>
            <p>
              Aakar IAS shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use this website or its resources.
            </p>

            <h2>5. Modifications</h2>
            <p>
              We reserve the right to amend these Terms and Conditions at any time without notice. Continued use of the website following changes will indicate your acceptance of the revised terms.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions regarding these terms, please email us at <a href="mailto:help@aakarias.com">help@aakarias.com</a>.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
