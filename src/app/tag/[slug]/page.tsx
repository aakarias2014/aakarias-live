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
  const tag = await repo.getTag(slug, "hi");
  if (!tag) return {};

  return buildMetadata({
    title: `${tag.name} - महत्वपूर्ण टॉपिक हब | Aakar IAS`,
    description: `सिविल सेवा परीक्षा (UPSC & State PSC) की तैयारी के लिए '${tag.name}' टॉपिक से जुड़े सभी महत्वपूर्ण करेंट अफेयर्स और एडिटोरियल लेख।`,
    path: `/tag/${slug}`,
  });
}

export default async function HindiTagPage({ params }: Props) {
  const { slug } = await params;
  const repo = await getContentRepository();

  const tag = await repo.getTag(slug, "hi");
  if (!tag) notFound();

  // Fetch up to 100 articles under this tag to power responsive client-side filtering
  const result = await repo.listArticles({
    locale: "hi",
    tag: slug,
    page: 1,
    pageSize: 100,
  });

  const breadcrumb = breadcrumbJsonLd([
    { name: "मुख्यपृष्ठ (Home)", url: siteConfig.url },
    { name: "करेंट अफेयर्स", url: `${siteConfig.url}/current-affairs` },
    { name: tag.name, url: `${siteConfig.url}/tag/${slug}` },
  ]);

  return (
    <>
      <Section className="pb-0 pt-8">
        <Container size="wide">
          <Breadcrumb
            items={[
              { name: "करेंट अफेयर्स", href: "/current-affairs" },
              { name: tag.name },
            ]}
          />
        </Container>
      </Section>

      <Section className="pt-6">
        <Container size="wide">
          <TagPillarWorkspace tag={tag} articles={result.items} locale="hi" />
        </Container>
      </Section>

      <JsonLd data={breadcrumb} />
    </>
  );
}
