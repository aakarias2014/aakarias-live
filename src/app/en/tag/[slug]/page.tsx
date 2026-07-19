import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContentRepository } from "@/lib/content/content-repository";
import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumb } from "@/components/content/breadcrumb";
import { TagPillarWorkspace } from "@/components/content/tag-pillar-workspace";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";
import { siteConfig } from "@/lib/site-config";

export const revalidate = 600; // ISR: 10 minutes

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const repo = await getContentRepository();
  const tag = await repo.getTag(slug, "en");
  if (!tag) return {};

  return buildMetadata({
    title: `${tag.name} - Topic Pillar Page | Aakar IAS`,
    description: `Access important current affairs, editorial updates, and notes for Civil Services Exam (UPSC CSE & MPPSC) on topic '${tag.name}'.`,
    path: `/en/tag/${slug}`,
  });
}

export default async function EnglishTagPage({ params }: Props) {
  const { slug } = await params;
  const repo = await getContentRepository();

  const tag = await repo.getTag(slug, "en");
  if (!tag) notFound();

  // Fetch up to 100 articles under this tag to power responsive client-side filtering
  const result = await repo.listArticles({
    locale: "en",
    tag: slug,
    page: 1,
    pageSize: 100,
  });

  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    { name: "Current Affairs", url: `${siteConfig.url}/en/current-affairs` },
    { name: tag.name, url: `${siteConfig.url}/en/tag/${slug}` },
  ]);

  return (
    <>
      <Section className="pb-0 pt-8">
        <Container size="wide">
          <Breadcrumb
            items={[
              { name: "Current Affairs", href: "/en/current-affairs" },
              { name: tag.name },
            ]}
          />
        </Container>
      </Section>

      <Section className="pt-6">
        <Container size="wide">
          <TagPillarWorkspace tag={tag} articles={result.items} locale="en" />
        </Container>
      </Section>

      <JsonLd data={breadcrumb} />
    </>
  );
}
