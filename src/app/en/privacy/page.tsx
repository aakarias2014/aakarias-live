import { getContentRepository } from "@/lib/content/content-repository";
import { PortableText } from "next-sanity";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumb } from "@/components/content/breadcrumb";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: "Privacy Policy of Aakar IAS. Learn how we protect your personal information and maintain data privacy.",
  path: "/en/privacy",
});

export default async function EnglishPrivacyPage() {
  const repo = await getContentRepository();
  const page = await repo.getStaticPage("privacy", "en");

  if (page && page.body) {
    return (
      <>
        <Section className="pb-0 pt-8">
          <Container size="wide">
            <Breadcrumb items={[{ name: "Privacy Policy" }]} />
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
          <Breadcrumb items={[{ name: "Privacy Policy", href: "/en/privacy" }]} />
          <div className="mt-6">
            <h1 className="text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Privacy Policy
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">Last updated: June 2026</p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container size="narrow">
          <div className="prose prose-aakar dark:prose-invert max-w-none">
            <p>
              At Aakar IAS, we value and respect your privacy. This Privacy Policy details how we collect, use, store, and protect the information you share with us while navigating our website.
            </p>

            <h2>1. Information We Collect</h2>
            <p>
              We collect information you provide voluntarily when subscribing to our newsletter, contacting us through forms, or downloading resources. This may include:
            </p>
            <ul>
              <li>Name and contact details (email address and phone number)</li>
              <li>Contents of any messages or inquiries you send</li>
              <li>Usage data (IP address, browser type, and visited pages)</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>We use the collected information for purposes including:</p>
            <ul>
              <li>Providing daily current affairs, notes, and study material</li>
              <li>Responding to your inquiries and support requests</li>
              <li>Improving website performance and user experience</li>
              <li>Sending periodic updates and educational newsletters (if subscribed)</li>
            </ul>

            <h2>3. Security Measures</h2>
            <p>
              We implement industry-standard technical and organizational security measures to protect your personal details from unauthorized access. However, no method of transmission over the internet is completely secure.
            </p>

            <h2>4. Third-Party Links</h2>
            <p>
              Our website may contain links to outside websites. We are not responsible for the privacy practices or the content of external third-party sites.
            </p>

            <h2>5. Changes to This Policy</h2>
            <p>
              We reserve the right to modify this Privacy Policy. Any updates will be published on this page, with the "Last updated" date adjusted accordingly.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions regarding this policy, feel free to contact us at <a href="mailto:help@aakarias.com">help@aakarias.com</a>.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
