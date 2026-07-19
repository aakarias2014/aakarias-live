/**
 * JSON-LD structured data builders. Each returns a plain object to be injected
 * via the <JsonLd> component. Compose multiple on a page; Google accepts an
 * array or graph.
 */

import { siteConfig } from "@/lib/site-config";

type JsonLd = Record<string, unknown>;

const base = (type: string, data: Record<string, unknown>): JsonLd => ({
  "@context": "https://schema.org",
  "@type": type,
  ...data,
});

export function organizationJsonLd(): JsonLd {
  return base("Organization", {
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    description: siteConfig.description,
    sameAs: Object.values(siteConfig.links),
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: siteConfig.contact.email,
        telephone: siteConfig.contact.phone,
        contactType: "customer support",
        areaServed: "IN",
        availableLanguage: ["Hindi", "English"],
      },
    ],
  });
}

export function websiteJsonLd(): JsonLd {
  return base("WebSite", {
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    publisher: { "@id": `${siteConfig.url}/#organization` },
    inLanguage: "hi-IN",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  });
}

export interface ArticleJsonLdInput {
  title: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  publisherName?: string;
  keywords?: string[];
  inLanguage?: string;
  alternates?: { hi?: string; en?: string };
}

export function articleJsonLd(input: ArticleJsonLdInput): JsonLd {
  return base("Article", {
    "@id": `${input.url}#article`,
    headline: input.title,
    description: input.description,
    image: input.image,
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    inLanguage: input.inLanguage ?? "hi-IN",
    keywords: input.keywords?.join(", "),
    author: { "@type": "Person", name: input.authorName },
    publisher: {
      "@type": "Organization",
      name: input.publisherName ?? siteConfig.name,
      logo: { "@type": "ImageObject", url: `${siteConfig.url}/logo.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": input.url },
  });
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]): JsonLd {
  return base("BreadcrumbList", {
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  });
}

export function faqJsonLd(faqs: { question: string; answer: string }[]): JsonLd {
  return base("FAQPage", {
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  });
}

export interface QuizJsonLdInput {
  name: string;
  description: string;
  url: string;
  questions: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation?: string;
  }[];
}

export function quizJsonLd(input: QuizJsonLdInput): JsonLd {
  return base("Quiz", {
    "@id": `${input.url}#quiz`,
    name: input.name,
    description: input.description,
    url: input.url,
    mainEntity: input.questions.map((q) => {
      const correctOption = q.options[q.correctIndex] || "";
      const suggestedAnswers = q.options.map((opt) => ({
        "@type": "Answer",
        text: opt,
      }));

      return {
        "@type": "Question",
        name: q.question,
        suggestedAnswer: suggestedAnswers,
        acceptedAnswer: {
          "@type": "Answer",
          text: correctOption,
          ...(q.explanation ? { comment: { "@type": "Comment", text: q.explanation } } : {}),
        },
      };
    }),
  });
}

export interface CollectionPageJsonLdInput {
  name: string;
  description: string;
  url: string;
  inLanguage?: string;
  items?: { name: string; url: string }[];
}

export function collectionPageJsonLd(input: CollectionPageJsonLdInput): JsonLd {
  const data: Record<string, unknown> = {
    "@id": `${input.url}#collectionpage`,
    name: input.name,
    description: input.description,
    url: input.url,
    inLanguage: input.inLanguage ?? "hi-IN",
    publisher: { "@id": `${siteConfig.url}/#organization` },
  };

  if (input.items && input.items.length > 0) {
    data.mainEntity = {
      "@type": "ItemList",
      itemListElement: input.items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        url: item.url,
      })),
    };
  }

  return base("CollectionPage", data);
}

/* ─── Course Schema ─────────────────────────────────────────────── */

export interface CourseJsonLdInput {
  name: string;
  description: string;
  url: string;
  image?: string;
  providerName?: string;
  price?: number | string;
  currency?: string;
  courseMode?: string; // "online", "onsite", "blended"
  educationalLevel?: string;
  inLanguage?: string;
  duration?: string; // ISO 8601 duration e.g. "P6M"
}

export function courseJsonLd(input: CourseJsonLdInput): JsonLd {
  return base("Course", {
    "@id": `${input.url}#course`,
    name: input.name,
    description: input.description,
    url: input.url,
    image: input.image,
    inLanguage: input.inLanguage ?? "hi-IN",
    provider: {
      "@type": "Organization",
      name: input.providerName ?? siteConfig.name,
      sameAs: siteConfig.url,
    },
    ...(input.educationalLevel ? { educationalLevel: input.educationalLevel } : {}),
    ...(input.courseMode ? { courseMode: input.courseMode } : {}),
    ...(input.duration ? { timeRequired: input.duration } : {}),
    ...(input.price !== undefined
      ? {
          offers: {
            "@type": "Offer",
            price: input.price,
            priceCurrency: input.currency ?? "INR",
            availability: "https://schema.org/InStock",
            url: input.url,
          },
        }
      : {}),
  });
}

/* ─── Book / Publication Schema ─────────────────────────────────── */

export interface BookJsonLdInput {
  name: string;
  description: string;
  url: string;
  image?: string;
  authorName?: string;
  isbn?: string;
  price?: number | string;
  currency?: string;
  inLanguage?: string;
}

export function bookJsonLd(input: BookJsonLdInput): JsonLd {
  return base("Book", {
    "@id": `${input.url}#book`,
    name: input.name,
    description: input.description,
    url: input.url,
    image: input.image,
    inLanguage: input.inLanguage ?? "hi-IN",
    author: {
      "@type": input.authorName ? "Person" : "Organization",
      name: input.authorName ?? siteConfig.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    ...(input.isbn ? { isbn: input.isbn } : {}),
    ...(input.price !== undefined
      ? {
          offers: {
            "@type": "Offer",
            price: input.price,
            priceCurrency: input.currency ?? "INR",
            availability: "https://schema.org/InStock",
            url: input.url,
          },
        }
      : {}),
  });
}

/** Merge several schemas into one JSON-LD graph (recommended for pages). */
export function jsonLdGraph(schemas: JsonLd[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@graph": schemas,
  };
}
