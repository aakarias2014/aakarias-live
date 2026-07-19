import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getContentRepository } from "@/lib/content/content-repository";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumb } from "@/components/content/breadcrumb";
import { BookDetailsClient } from "@/components/content/book-details-client";
import { Publication } from "@/lib/content/types";
import { JsonLd } from "@/components/seo/json-ld";
import { bookJsonLd, breadcrumbJsonLd, jsonLdGraph } from "@/lib/seo/jsonld";
import { siteConfig } from "@/lib/site-config";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function DynamicBookDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const repo = await getContentRepository();
  const book = await repo.getPublication(slug, "hi");

  if (!book) {
    notFound();
  }

  const allPublications = await repo.listPublications("hi");
  const relatedBooks = allPublications.filter((p: Publication) => p.slug !== slug).slice(0, 4);

  return (
    <>
      {/* ─── Structured Data ─────────────────────────────────────────── */}
      <JsonLd data={jsonLdGraph([
        bookJsonLd({
          name: book.title,
          description: book.description || `${book.title} — Aakar IAS Publication`,
          url: `${siteConfig.url}/publications/${book.slug}`,
          image: book.coverImage,
          authorName: book.authorDetails,
          price: book.price,
          inLanguage: "hi-IN",
        }),
        breadcrumbJsonLd([
          { name: "Home", url: siteConfig.url },
          { name: "प्रकाशन", url: `${siteConfig.url}/publications` },
          { name: book.title, url: `${siteConfig.url}/publications/${book.slug}` },
        ]),
      ])} />
      <Section className="pb-0 pt-6">
        <Container size="wide">
          <Breadcrumb
            items={[
              { name: "प्रकाशन", href: "/publications" },
              { name: book.title },
            ]}
          />
          <Link href="/publications" className="inline-flex items-center gap-2 text-primary font-bold mt-4 hover:underline text-sm">
            <ArrowLeft className="h-4 w-4" /> वापस प्रकाशन पर जाएं
          </Link>
        </Container>
      </Section>

      <BookDetailsClient book={book} relatedBooks={relatedBooks} locale="hi" />
    </>
  );
}
