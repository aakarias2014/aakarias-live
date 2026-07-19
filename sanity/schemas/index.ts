import { defineField, defineType } from "sanity";
import type { SchemaTypeDefinition } from "sanity";

/**
 * Sanity Studio schema definitions for Aakar IAS.
 *
 * These mirror the GROQ projections in src/lib/content/sanity-repository.ts.
 * Field naming convention:
 *   - Hindi (default): title, excerpt, body
 *   - English mirror:  titleEn, excerptEn, bodyEn
 *
 * Adjust field names here AND in sanity-repository.ts if you change them.
 */

const localeStringField = (name: string, title: string, enTitle: string) => [
  defineField({
    name,
    title,
    type: "string",
    description: "Hindi (default locale)",
  }),
  defineField({
    name: `${name}En`,
    title: enTitle,
    type: "string",
    description: "English translation",
  }),
];

const localeTextField = (name: string, title: string, enTitle: string) => [
  defineField({
    name,
    title,
    type: "text",
    rows: 3,
    description: "Hindi (default locale)",
  }),
  defineField({
    name: `${name}En`,
    title: enTitle,
    type: "text",
    rows: 3,
    description: "English translation",
  }),
];

const localePortableTextField = (name: string, title: string, enTitle: string) => [
  defineField({
    name,
    title,
    type: "array",
    of: [{ type: "block" }, { type: "image" }],
    description: "Hindi (default locale)",
  }),
  defineField({
    name: `${name}En`,
    title: enTitle,
    type: "array",
    of: [{ type: "block" }, { type: "image" }],
    description: "English translation",
  }),
];

export const article: SchemaTypeDefinition = defineType({
  name: "currentAffairs",
  title: "Current Affairs",
  type: "document",
  fields: [
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    ...localeStringField("title", "Title (HI)", "Title (EN)"),
    ...localeTextField("excerpt", "Excerpt (HI)", "Excerpt (EN)"),
    ...localePortableTextField("body", "Body (HI)", "Body (EN)"),
    defineField({
      name: "sections",
      title: "Structured Sections",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "kind",
              type: "string",
              options: {
                list: [
                  "whyInNews",
                  "background",
                  "keyHighlights",
                  "importance",
                  "governmentInitiatives",
                  "internationalPerspective",
                  "prelimsPoint",
                  "mainsPoint",
                  "factsAtAGlance",
                  "timeline",
                  "practiceQuestions",
                ],
              },
            },
            { name: "title", type: "string" },
            { name: "titleEn", type: "string" },
            { name: "body", type: "array", of: [{ type: "block" }] },
            { name: "bodyEn", type: "array", of: [{ type: "block" }] },
          ],
        },
      ],
    }),
    defineField({
      name: "featuredImage",
      title: "Featured Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt Text (for SEO)",
          description: "गूगल सर्च और स्क्रीन रीडर्स के लिए फोटो का संक्षिप्त विवरण।",
        },
        {
          name: "caption",
          type: "string",
          title: "Caption (Visible on Page)",
          description: "आर्टिकल में फोटो के नीचे दिखाई देने वाली लाइन।",
        },
      ],
    }),
    defineField({ name: "category", title: "Category", type: "reference", to: [{ type: "category" }] }),
    defineField({ name: "author", title: "Author", type: "reference", to: [{ type: "author" }] }),
    defineField({ name: "tags", title: "Tags", type: "array", of: [{ type: "reference", to: [{ type: "tag" }] }] }),
    defineField({
      name: "syllabus",
      title: "Syllabus Mapping",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "GS-1: History & Geography", value: "GS-1" },
          { title: "GS-2: Polity & Governance", value: "GS-2" },
          { title: "GS-3: Economy & Environment", value: "GS-3" },
          { title: "GS-4: Ethics", value: "GS-4" },
          { title: "Prelims GS", value: "Prelims-GS" },
          { title: "CSAT", value: "CSAT" },
        ],
      },
    }),
    defineField({
      name: "ca_date",
      title: "Current Affairs Date",
      type: "date",
      description: "The actual date for these current affairs (separate from publish date)",
      initialValue: () => new Date().toISOString().split("T")[0],
      validation: (r) => r.required(),
    }),
    defineField({ name: "publishedAt", title: "Published At", type: "datetime", initialValue: () => new Date().toISOString() }),
    defineField({ name: "featured", title: "Featured", type: "boolean", initialValue: () => false }),
    defineField({ name: "readingTime", title: "Reading Time (min)", type: "number" }),
    defineField({ name: "keywords", title: "SEO Keywords", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "mcqs",
      title: "MCQs",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "question", type: "string", title: "Question (HI)" },
            { name: "questionEn", type: "string", title: "Question (EN)" },
            { name: "options", type: "array", of: [{ type: "string" }], title: "Options (HI)" },
            { name: "optionsEn", type: "array", of: [{ type: "string" }], title: "Options (EN)" },
            { name: "correctIndex", type: "number", title: "Correct Index" },
            { name: "explanation", type: "text", title: "Explanation (HI)" },
            { name: "explanationEn", type: "text", title: "Explanation (EN)" },
          ],
        },
      ],
    }),
    defineField({
      name: "faqs",
      title: "FAQs",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "question", type: "string", title: "Question (HI)" },
            { name: "questionEn", type: "string", title: "Question (EN)" },
            { name: "answer", type: "text", title: "Answer (HI)" },
            { name: "answerEn", type: "text", title: "Answer (EN)" },
          ],
        },
      ],
    }),
    defineField({
      name: "sources",
      title: "Sources",
      type: "array",
      of: [{ type: "object", fields: [{ name: "label", type: "string" }, { name: "url", type: "url" }] }],
    }),
    defineField({
      name: "nextArticle",
      title: "Next Related Article (और पढ़ें)",
      type: "reference",
      to: [
        { type: "currentAffairs" },
        { type: "editorial" },
        { type: "weekly" },
        { type: "monthly" },
        { type: "blog" },
        { type: "staticGk" },
      ],
      description: "Select another article to link as 'Read More / और पढ़ें' inline.",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "publishedAt", media: "featuredImage" },
  },
});

export const staticGk: SchemaTypeDefinition = defineType({
  name: "staticGk",
  title: "Static GK / General Awareness",
  type: "document",
  fields: [
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    ...localeStringField("title", "Title (HI)", "Title (EN)"),
    ...localeTextField("excerpt", "Excerpt (HI)", "Excerpt (EN)"),
    ...localePortableTextField("body", "Body (HI)", "Body (EN)"),
    defineField({
      name: "sections",
      title: "Structured Sections",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "kind",
              type: "string",
              options: {
                list: [
                  "whyInNews",
                  "background",
                  "keyHighlights",
                  "keyAspects",
                  "quickFacts",
                  "importance",
                  "governmentInitiatives",
                  "internationalPerspective",
                  "prelimsPoint",
                  "mainsPoint",
                  "factsAtAGlance",
                  "timeline",
                  "practiceQuestions",
                ],
              },
            },
            { name: "title", type: "string" },
            { name: "titleEn", type: "string" },
            { name: "body", type: "array", of: [{ type: "block" }] },
            { name: "bodyEn", type: "array", of: [{ type: "block" }] },
          ],
        },
      ],
    }),
    defineField({
      name: "featuredImage",
      title: "Featured Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt Text (for SEO)",
          description: "गूगल सर्च और स्क्रीन रीडर्स के लिए फोटो का संक्षिप्त विवरण।",
        },
        {
          name: "caption",
          type: "string",
          title: "Caption (Visible on Page)",
          description: "आर्टिकल में फोटो के नीचे दिखाई देने वाली लाइन।",
        },
      ],
    }),
    defineField({ name: "category", title: "Category", type: "reference", to: [{ type: "category" }] }),
    defineField({ name: "author", title: "Author", type: "reference", to: [{ type: "author" }] }),
    defineField({ name: "tags", title: "Tags", type: "array", of: [{ type: "reference", to: [{ type: "tag" }] }] }),
    defineField({
      name: "syllabus",
      title: "Syllabus Mapping",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "GS-1: History & Geography", value: "GS-1" },
          { title: "GS-2: Polity & Governance", value: "GS-2" },
          { title: "GS-3: Economy & Environment", value: "GS-3" },
          { title: "GS-4: Ethics", value: "GS-4" },
          { title: "Prelims GS", value: "Prelims-GS" },
          { title: "CSAT", value: "CSAT" },
        ],
      },
    }),
    defineField({
      name: "ca_date",
      title: "Current Affairs Date",
      type: "date",
      description: "The actual date for these current affairs (separate from publish date)",
      initialValue: () => new Date().toISOString().split("T")[0],
      validation: (r) => r.required(),
    }),
    defineField({ name: "publishedAt", title: "Published At", type: "datetime", initialValue: () => new Date().toISOString() }),
    defineField({ name: "featured", title: "Featured", type: "boolean", initialValue: () => false }),
    defineField({ name: "readingTime", title: "Reading Time (min)", type: "number" }),
    defineField({ name: "keywords", title: "SEO Keywords", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "mcqs",
      title: "MCQs",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "question", type: "string", title: "Question (HI)" },
            { name: "questionEn", type: "string", title: "Question (EN)" },
            { name: "options", type: "array", of: [{ type: "string" }], title: "Options (HI)" },
            { name: "optionsEn", type: "array", of: [{ type: "string" }], title: "Options (EN)" },
            { name: "correctIndex", type: "number", title: "Correct Index" },
            { name: "explanation", type: "text", title: "Explanation (HI)" },
            { name: "explanationEn", type: "text", title: "Explanation (EN)" },
          ],
        },
      ],
    }),
    defineField({
      name: "faqs",
      title: "FAQs",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "question", type: "string", title: "Question (HI)" },
            { name: "questionEn", type: "string", title: "Question (EN)" },
            { name: "answer", type: "text", title: "Answer (HI)" },
            { name: "answerEn", type: "text", title: "Answer (EN)" },
          ],
        },
      ],
    }),
    defineField({
      name: "sources",
      title: "Sources",
      type: "array",
      of: [{ type: "object", fields: [{ name: "label", type: "string" }, { name: "url", type: "url" }] }],
    }),
    defineField({
      name: "nextArticle",
      title: "Next Related Article (और पढ़ें)",
      type: "reference",
      to: [
        { type: "currentAffairs" },
        { type: "editorial" },
        { type: "weekly" },
        { type: "monthly" },
        { type: "blog" },
        { type: "staticGk" },
      ],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "publishedAt", media: "featuredImage" },
  },
});

export const editorial: SchemaTypeDefinition = defineType({
  name: "editorial",
  title: "Editorial",
  type: "document",
  fields: [
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    ...localeStringField("title", "Title (HI)", "Title (EN)"),
    ...localeTextField("excerpt", "Excerpt (HI)", "Excerpt (EN)"),
    ...localePortableTextField("body", "Body (HI)", "Body (EN)"),
    defineField({ name: "featuredImage", type: "image", options: { hotspot: true } }),
    defineField({ name: "author", type: "reference", to: [{ type: "author" }] }),
    defineField({ name: "category", type: "reference", to: [{ type: "category" }] }),
    defineField({ name: "tags", type: "array", of: [{ type: "reference", to: [{ type: "tag" }] }] }),
    defineField({
      name: "syllabus",
      title: "Syllabus Mapping",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "GS-1: History & Geography", value: "GS-1" },
          { title: "GS-2: Polity & Governance", value: "GS-2" },
          { title: "GS-3: Economy & Environment", value: "GS-3" },
          { title: "GS-4: Ethics", value: "GS-4" },
          { title: "Prelims GS", value: "Prelims-GS" },
          { title: "CSAT", value: "CSAT" },
        ],
      },
    }),
    defineField({ name: "publishedAt", type: "datetime", initialValue: () => new Date().toISOString() }),
    defineField({ name: "readingTime", type: "number" }),
    defineField({
      name: "nextArticle",
      title: "Next Related Article (और पढ़ें)",
      type: "reference",
      to: [
        { type: "currentAffairs" },
        { type: "editorial" },
        { type: "weekly" },
        { type: "monthly" },
        { type: "blog" },
        { type: "staticGk" },
      ],
      description: "Select another article to link as 'Read More / /और पढ़ें' inline.",
    }),
  ],
  preview: { select: { title: "title", subtitle: "publishedAt", media: "featuredImage" } },
});

export const blog: SchemaTypeDefinition = defineType({
  name: "blog",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    ...localeStringField("title", "Title (HI)", "Title (EN)"),
    ...localeTextField("excerpt", "Excerpt (HI)", "Excerpt (EN)"),
    ...localePortableTextField("body", "Body (HI)", "Body (EN)"),
    defineField({ name: "featuredImage", type: "image", options: { hotspot: true } }),
    defineField({ name: "author", type: "reference", to: [{ type: "author" }] }),
    defineField({ name: "tags", type: "array", of: [{ type: "reference", to: [{ type: "tag" }] }] }),
    defineField({ name: "publishedAt", type: "datetime", initialValue: () => new Date().toISOString() }),
    defineField({
      name: "nextArticle",
      title: "Next Related Article (और पढ़ें)",
      type: "reference",
      to: [
        { type: "currentAffairs" },
        { type: "editorial" },
        { type: "weekly" },
        { type: "monthly" },
        { type: "blog" },
      ],
      description: "Select another article to link as 'Read More / और पढ़ें' inline.",
    }),
  ],
  preview: { select: { title: "title", subtitle: "publishedAt", media: "featuredImage" } },
});

export const weekly: SchemaTypeDefinition = defineType({
  name: "weekly",
  title: "Weekly Digest",
  type: "document",
  fields: [
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    ...localeStringField("title", "Title (HI)", "Title (EN)"),
    ...localeTextField("excerpt", "Excerpt (HI)", "Excerpt (EN)"),
    ...localePortableTextField("body", "Body (HI)", "Body (EN)"),
    defineField({ name: "featuredImage", type: "image", options: { hotspot: true } }),
    defineField({ name: "author", type: "reference", to: [{ type: "author" }] }),
    defineField({ name: "category", type: "reference", to: [{ type: "category" }] }),
    defineField({ name: "tags", type: "array", of: [{ type: "reference", to: [{ type: "tag" }] }] }),
    defineField({ name: "publishedAt", type: "datetime", initialValue: () => new Date().toISOString() }),
    defineField({ name: "readingTime", type: "number" }),
    defineField({
      name: "nextArticle",
      title: "Next Related Article (और पढ़ें)",
      type: "reference",
      to: [
        { type: "currentAffairs" },
        { type: "editorial" },
        { type: "weekly" },
        { type: "monthly" },
        { type: "blog" },
      ],
      description: "Select another article to link as 'Read More / और पढ़ें' inline.",
    }),
  ],
  preview: { select: { title: "title", subtitle: "publishedAt", media: "featuredImage" } },
});

export const monthly: SchemaTypeDefinition = defineType({
  name: "monthly",
  title: "Monthly Digest",
  type: "document",
  fields: [
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    ...localeStringField("title", "Title (HI)", "Title (EN)"),
    ...localeTextField("excerpt", "Excerpt (HI)", "Excerpt (EN)"),
    ...localePortableTextField("body", "Body (HI)", "Body (EN)"),
    defineField({ name: "featuredImage", type: "image", options: { hotspot: true } }),
    defineField({ name: "author", type: "reference", to: [{ type: "author" }] }),
    defineField({ name: "category", type: "reference", to: [{ type: "category" }] }),
    defineField({ name: "tags", type: "array", of: [{ type: "reference", to: [{ type: "tag" }] }] }),
    defineField({ name: "publishedAt", type: "datetime", initialValue: () => new Date().toISOString() }),
    defineField({ name: "readingTime", type: "number" }),
    defineField({
      name: "nextArticle",
      title: "Next Related Article (और पढ़ें)",
      type: "reference",
      to: [
        { type: "currentAffairs" },
        { type: "editorial" },
        { type: "weekly" },
        { type: "monthly" },
        { type: "blog" },
      ],
      description: "Select another article to link as 'Read More / और पढ़ें' inline.",
    }),
  ],
  preview: { select: { title: "title", subtitle: "publishedAt", media: "featuredImage" } },
});

export const category: SchemaTypeDefinition = defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "title", title: "Title (HI)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "titleEn", title: "Title (EN)", type: "string" }),
    defineField({ name: "description", title: "Description (HI)", type: "text" }),
    defineField({ name: "descriptionEn", title: "Description (EN)", type: "text" }),
    defineField({ name: "color", title: "Color", type: "string" }),
    defineField({ name: "icon", title: "Icon (lucide name)", type: "string" }),
  ],
  preview: { select: { title: "title" } },
});

export const tag: SchemaTypeDefinition = defineType({
  name: "tag",
  title: "Tag",
  type: "document",
  fields: [
    defineField({ name: "slug", type: "slug", options: { source: "name" }, validation: (r) => r.required() }),
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
  ],
  preview: { select: { title: "name" } },
});

export const author: SchemaTypeDefinition = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({ name: "slug", type: "slug", options: { source: "name" }, validation: (r) => r.required() }),
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", type: "string" }),
    defineField({ name: "bio", type: "text" }),
    defineField({ name: "avatar", type: "image", options: { hotspot: true } }),
  ],
  preview: { select: { title: "name", media: "avatar" } },
});

export const monthlyPdf: SchemaTypeDefinition = defineType({
  name: "monthlyPdf",
  title: "Monthly PDF",
  type: "document",
  fields: [
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "title", title: "Title (HI)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "titleEn", title: "Title (EN)", type: "string" }),
    defineField({ name: "month", title: "Month (YYYY-MM)", type: "string" }),
    defineField({ name: "file", title: "PDF File", type: "file" }),
    defineField({ name: "coverImage", type: "image", options: { hotspot: true } }),
    defineField({ name: "description", type: "text" }),
    defineField({
      name: "pdfType",
      title: "PDF Type",
      type: "string",
      options: {
        list: [
          { title: "Monthly Magazine", value: "monthly" },
          { title: "Half Yearly Magazine", value: "half-yearly" },
          { title: "Yearly Magazine", value: "yearly" },
          { title: "Custom PDF", value: "custom" },
          { title: "PYQ (Previous Year Question)", value: "pyq" },
          { title: "Syllabus", value: "syllabus" },
        ],
      },
      initialValue: "monthly",
    }),
    defineField({ name: "toc", title: "Table of Contents (HI)", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "tocEn", title: "Table of Contents (EN)", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "publishedAt", type: "datetime", initialValue: () => new Date().toISOString() }),
  ],
  preview: { select: { title: "title", subtitle: "month", media: "coverImage" } },
});

export const notification: SchemaTypeDefinition = defineType({
  name: "notification",
  title: "Exam Notification",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "titleEn", type: "string" }),
    defineField({ name: "exam", type: "string", options: { list: ["UPSC", "MPPSC", "Other"] } }),
    defineField({ name: "date", type: "datetime" }),
    defineField({ name: "status", type: "string", options: { list: ["upcoming", "out", "closed"] } }),
    defineField({ name: "url", type: "url" }),
    defineField({ name: "description", type: "text" }),
  ],
  preview: { select: { title: "title", subtitle: "exam" } },
});

export const faq: SchemaTypeDefinition = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({ name: "question", type: "string", validation: (r) => r.required() }),
    defineField({ name: "questionEn", type: "string" }),
    defineField({ name: "answer", type: "text", validation: (r) => r.required() }),
    defineField({ name: "answerEn", type: "text" }),
    defineField({ name: "category", type: "string" }),
  ],
  preview: { select: { title: "question" } },
});

export const pyq: SchemaTypeDefinition = defineType({
  name: "pyq",
  title: "Previous Year Question (PYQ)",
  type: "document",
  fields: [
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "title", title: "Title (HI)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "titleEn", title: "Title (EN)", type: "string" }),
    defineField({
      name: "exam",
      title: "Exam",
      type: "string",
      options: {
        list: [
          { title: "UPSC CSE", value: "UPSC" },
          { title: "MPPSC", value: "MPPSC" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "number",
      validation: (r) => r.required().min(2010).max(new Date().getFullYear() + 1),
    }),
    defineField({
      name: "subject",
      title: "Subject",
      type: "string",
      options: {
        list: [
          { title: "Polity", value: "Polity" },
          { title: "Economy", value: "Economy" },
          { title: "History", value: "History" },
          { title: "Geography", value: "Geography" },
          { title: "Science & Tech", value: "Science & Tech" },
          { title: "Environment", value: "Environment" },
          { title: "Ethics", value: "Ethics" },
          { title: "CSAT", value: "CSAT" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "topic", title: "Topic", type: "string" }),
    defineField({
      name: "paper",
      title: "Paper / GS Number",
      type: "string",
      options: {
        list: [
          { title: "Prelims Paper 1", value: "Prelims Paper 1" },
          { title: "Prelims Paper 2", value: "Prelims Paper 2" },
          { title: "Mains GS 1", value: "Mains GS 1" },
          { title: "Mains GS 2", value: "Mains GS 2" },
          { title: "Mains GS 3", value: "Mains GS 3" },
          { title: "Mains GS 4", value: "Mains GS 4" },
          { title: "Optional", value: "Optional" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "file", title: "PDF File", type: "file", validation: (r) => r.required() }),
    defineField({ name: "publishedAt", title: "Published At", type: "datetime", initialValue: () => new Date().toISOString() }),
  ],
  preview: {
    select: { title: "title", subtitle: "exam", year: "year" },
    prepare(selection) {
      const { title, subtitle, year } = selection;
      return {
        title: title || "Untitled",
        subtitle: `${subtitle || ""} — ${year || ""}`,
      };
    },
  },
});

export const homeConfig: SchemaTypeDefinition = defineType({
  name: "homeConfig",
  title: "Home Configuration",
  type: "document",
  fields: [
    ...localeStringField("heroTitle", "Hero Title (HI)", "Hero Title (EN)"),
    ...localeTextField("heroSubtitle", "Hero Subtitle (HI)", "Hero Subtitle (EN)"),
    ...localeStringField("noticeTicker", "Notice Ticker Text (HI)", "Notice Ticker Text (EN)"),
    defineField({ name: "noticeLink", title: "Notice Link", type: "string" }),
    defineField({ name: "introVideoId", title: "YouTube Intro Video ID", type: "string", description: "e.g. dQw4w9WgXcQ" }),
    defineField({ name: "bannerImage", title: "Hero Banner Image", type: "image", options: { hotspot: true } }),
    defineField({
      name: "heroSlides",
      title: "Hero Slider Images (स्लाइडर इमेजेस)",
      type: "array",
      of: [
        {
          type: "object",
          name: "heroSlide",
          title: "Hero Slide",
          fields: [
            ...localeStringField("title", "Title (HI) - Optional", "Title (EN) - Optional"),
            ...localeStringField("subtitle", "Subtitle (HI) - Optional", "Subtitle (EN) - Optional"),
            defineField({ name: "desktopImage", type: "image", title: "Desktop Image (डेस्कटॉप इमेज)", options: { hotspot: true } }),
            defineField({ name: "mobileImage", type: "image", title: "Mobile Image (मोबाइल इमेज)", options: { hotspot: true } }),
            defineField({ name: "link", type: "string", title: "Redirect Link - Optional" }),
          ],
        },
      ],
    }),
    defineField({
      name: "mainYoutubeChannelId",
      title: "Main YouTube Channel ID",
      type: "string",
      description: "Main channel ID used to query dynamic YouTube stats and videos. e.g. UCY8IWCZZeJ_6aizut-Y4oCg",
      initialValue: "UCY8IWCZZeJ_6aizut-Y4oCg",
    }),
    defineField({
      name: "youtubeChannels",
      title: "Our YouTube Channels List (हमारा यूट्यूब चैनल्स सूची)",
      type: "array",
      of: [
        {
          type: "object",
          name: "youtubeChannel",
          title: "YouTube Channel",
          fields: [
            ...localeStringField("title", "Channel Name (HI)", "Channel Name (EN)"),
            defineField({ name: "handle", type: "string", title: "Channel Handle (e.g. @AakarIAS)" }),
            ...localeStringField("subscribers", "Subscribers Count (HI, e.g. 136k)", "Subscribers Count (EN, e.g. 136k)"),
            defineField({ name: "url", type: "url", title: "Channel Link / URL" }),
            defineField({ name: "customAvatar", type: "image", title: "Channel Avatar (Optional)", options: { hotspot: true } }),
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Home Page Configuration" };
    },
  },
});

export const downloadPageConfig: SchemaTypeDefinition = defineType({
  name: "downloadPageConfig",
  title: "App Download Page Config",
  type: "document",
  fields: [
    defineField({ name: "playStoreUrl", title: "Google Play Store URL", type: "url" }),
    defineField({ name: "appStoreUrl", title: "Apple App Store URL", type: "url" }),
    defineField({ name: "windowsUrl", title: "Windows Download URL (.exe)", type: "url" }),
    defineField({ name: "macIntelUrl", title: "Mac Intel Download URL (Intel dmg)", type: "url" }),
    defineField({ name: "macSiliconUrl", title: "Mac Apple Silicon Download URL (M-Series dmg)", type: "url" }),
    defineField({ name: "appVersion", title: "Active App Version", type: "string" }),
    defineField({ name: "screenshots", title: "App Screenshots", type: "array", of: [{ type: "image" }] }),
    defineField({
      name: "features",
      title: "App Features",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "icon", type: "string", title: "Icon (Lucide name)" },
            { name: "title", type: "string", title: "Title (HI)" },
            { name: "titleEn", type: "string", title: "Title (EN)" },
            { name: "desc", type: "text", title: "Description (HI)" },
            { name: "descEn", type: "text", title: "Description (EN)" },
          ],
        },
      ],
    }),
    defineField({
      name: "faqs",
      title: "App FAQs",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "question", type: "string", title: "Question (HI)" },
            { name: "questionEn", type: "string", title: "Question (EN)" },
            { name: "answer", type: "text", title: "Answer (HI)" },
            { name: "answerEn", type: "text", title: "Answer (EN)" },
          ],
        },
      ],
    }),
  ],
  initialValue: {
    appVersion: "2.4",
    features: [
      { icon: "Video", title: "लाइव क्लासेस", titleEn: "Live Classes", desc: "विशेषज्ञों द्वारा दैनिक इंटरैक्टिव लाइव सत्र", descEn: "Daily interactive live sessions by experts" },
      { icon: "PlayCircle", title: "रिकॉर्डेड लेक्चर्स", titleEn: "Recorded Lectures", desc: "असीमित पुनरावृत्ति के लिए सहेजे गए सत्र", descEn: "Saved sessions for unlimited revisions" },
      { icon: "FileDown", title: "प्रीमियम पीडीएफ", titleEn: "Premium PDFs", desc: "विस्तृत नोट्स और मासिक करेंट अफेयर्स पत्रिका", descEn: "Detailed study notes & monthly current affairs magazines" },
      { icon: "FileText", title: "टेस्ट सीरीज", titleEn: "Test Series", desc: "प्रीलिम्स और मेन्स के लिए मॉक टेस्ट", descEn: "Mock test papers for Prelims and Mains" },
      { icon: "MessageSquare", title: "संदेह निवारण", titleEn: "Doubt Clearing", desc: "शिक्षकों के साथ वन-टू-वन डाउट क्लीयरिंग", descEn: "One-to-one doubt clearing sessions with faculty" },
      { icon: "WifiOff", title: "ऑफ़लाइन एक्सेस", titleEn: "Offline Access", desc: "वीडियो और सामग्री को ऑफलाइन मोड में देखें", descEn: "Watch videos and download material for offline study" },
      { icon: "TrendingUp", title: "प्रगति विश्लेषण", titleEn: "Performance Stats", desc: "आपके प्रदर्शन की एआई-संचालित रिपोर्ट", descEn: "AI-driven detailed progress reports" },
      { icon: "Calendar", title: "कक्षा अनुसूची", titleEn: "Class Schedules", desc: "अपडेटेड समय सारिणी और सूचनाएं", descEn: "Real-time timetable updates & alerts" }
    ],
    faqs: [
      {
        question: "क्या ऐप पूरी तरह से फ्री है?",
        questionEn: "Is the app completely free?",
        answer: "जी हां, ऐप डाउनलोड करना बिल्कुल फ्री है। कुछ बुनियादी कोर्सेज और रिसोर्सेज मुफ्त उपलब्ध हैं, जबकि प्रीमियम कोर्सेज के लिए शुल्क देय है।",
        answerEn: "Yes, downloading the app is completely free. We provide a selection of free foundation courses, daily current affairs, and notes. Premium structured test series and batches require a separate enrollment fee."
      },
      {
        question: "क्या ऑफलाइन देख सकते हैं?",
        questionEn: "Can I watch videos offline?",
        answer: "हां, आप वीडियो और PDF नोट्स को डाउनलोड करके ऑफलाइन भी देख सकते हैं, जिससे बिना इंटरनेट के भी पढ़ाई जारी रहे।",
        answerEn: "Yes, our app supports offline downloads. You can save class lectures and PDF notes within the app storage to watch or read later without an active internet connection."
      },
      {
        question: "क्या Apple iPad पर चलेगा?",
        questionEn: "Does it support iPad or Tablets?",
        answer: "जी हां, हमारा ऐप सभी आधुनिक iPads और Android टैब्लेट्स के लिए पूरी तरह से ऑप्टिमाइज्ड है।",
        answerEn: "Yes, the Aakar IAS application is fully optimized for iPads, Android tablets, and Chromebooks, offering a comfortable, large-screen study interface."
      }
    ]
  },
  preview: {
    prepare() {
      return { title: "App Download Page Configuration" };
    },
  },
});

export const staticPage: SchemaTypeDefinition = defineType({
  name: "staticPage",
  title: "Static Page Content",
  type: "document",
  fields: [
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    ...localeStringField("title", "Title (HI)", "Title (EN)"),
    ...localePortableTextField("body", "Body (HI)", "Body (EN)"),
  ],
  preview: {
    select: { title: "title", subtitle: "slug.current" },
  },
});

export const testSeries: SchemaTypeDefinition = defineType({
  name: "testSeries",
  title: "Test Series",
  type: "document",
  fields: [
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    ...localeStringField("title", "Title (HI)", "Title (EN)"),
    ...localeTextField("description", "Description (HI)", "Description (EN)"),
    defineField({ name: "price", title: "Price (INR)", type: "number" }),
    defineField({ name: "originalPrice", title: "Original Price (INR)", type: "number" }),
    defineField({ name: "buyLink", title: "Buy Link", type: "url" }),
    defineField({ name: "active", title: "Active / Enrollment Open", type: "boolean", initialValue: () => true }),
    defineField({ name: "features", title: "Features List (HI)", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "featuresEn", title: "Features List (EN)", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "badgeHi", title: "Badge Text (HI)", type: "string" }),
    defineField({ name: "badgeEn", title: "Badge Text (EN)", type: "string" }),
    defineField({ name: "orderIndex", title: "Order Index", type: "number", initialValue: () => 0 }),
  ],
  preview: {
    select: { title: "title", subtitle: "price" },
  },
});

export const publication: SchemaTypeDefinition = defineType({
  name: "publication",
  title: "Publications (Books)",
  type: "document",
  fields: [
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    ...localeStringField("title", "Title (HI)", "Title (EN)"),
    ...localeTextField("description", "Description (HI)", "Description (EN)"),
    defineField({ name: "price", title: "Price (INR)", type: "number" }),
    defineField({ name: "originalPrice", title: "Original Price (INR)", type: "number" }),
    defineField({ name: "rating", title: "Rating (e.g. 4.5)", type: "number", initialValue: 4.5 }),
    defineField({ name: "reviewsCount", title: "Reviews Count", type: "number", initialValue: 120 }),
    defineField({ name: "edition", title: "Edition Tag (e.g. 2026 Edition)", type: "string", initialValue: "2026 Edition" }),
    defineField({ name: "badge", title: "Ribbon Badge (e.g. Bestselling, Trending)", type: "string" }),
    defineField({ name: "pages", title: "Pages (e.g. 320+)", type: "string", initialValue: "320+" }),
    defineField({
      name: "medium",
      title: "Medium",
      type: "string",
      options: {
        list: [
          { title: "Hindi", value: "Hindi" },
          { title: "English", value: "English" },
          { title: "Bilingual", value: "Bilingual" }
        ]
      },
      initialValue: "English"
    }),
    defineField({ name: "features", title: "Features List (HI)", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "featuresEn", title: "Features List (EN)", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "toc", title: "Table of Contents (HI)", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "tocEn", title: "Table of Contents (EN)", type: "array", of: [{ type: "string" }] }),
    ...localeTextField("authorDetails", "Author Details (HI)", "Author Details (EN)"),
    defineField({ name: "soldOut", title: "Is Sold Out / Out of Stock?", type: "boolean", initialValue: false }),
    defineField({ name: "coverImage", title: "Book Cover Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "buyLink", title: "Buy Link (Amazon/Flipkart)", type: "url" }),
  ],
  preview: {
    select: { title: "title", media: "coverImage" },
  },
});

export const mediaRelease: SchemaTypeDefinition = defineType({
  name: "mediaRelease",
  title: "Media Release",
  type: "document",
  fields: [
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    ...localeStringField("title", "Title (HI)", "Title (EN)"),
    defineField({ name: "publishedAt", type: "date" }),
    defineField({ name: "source", title: "Source (Newspaper name)", type: "string" }),
    defineField({ name: "url", title: "External Link", type: "url" }),
    defineField({ name: "image", title: "Media Photo", type: "image", options: { hotspot: true } }),
  ],
  preview: {
    select: { title: "title", subtitle: "source", media: "image" },
  },
});

export const syllabusPage: SchemaTypeDefinition = defineType({
  name: "syllabusPage",
  title: "Syllabus Page Map",
  type: "document",
  fields: [
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    ...localeStringField("title", "Title (HI)", "Title (EN)"),
    defineField({ name: "exam", title: "Exam Type", type: "string", options: { list: ["UPSC", "MPPSC"] } }),
    defineField({ name: "year", title: "Syllabus Year", type: "number", initialValue: 2026 }),
    defineField({
      name: "papers",
      title: "Exam Papers",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "paperTitle", type: "string", title: "Paper Title (HI)" },
            { name: "paperTitleEn", type: "string", title: "Paper Title (EN)" },
            {
              name: "units",
              title: "Units",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    { name: "unitNumber", type: "string", title: "Unit Number (e.g. Unit 1)" },
                    { name: "unitTitle", type: "string", title: "Unit Title (HI)" },
                    { name: "unitTitleEn", type: "string", title: "Unit Title (EN)" },
                    { name: "details", type: "text", title: "Details (HI)" },
                    { name: "detailsEn", type: "text", title: "Details (EN)" },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "exam" },
  },
});

export const topperCopy: SchemaTypeDefinition = defineType({
  name: "topperCopy",
  title: "Topper Answer Copy",
  type: "document",
  fields: [
    defineField({ name: "slug", type: "slug", options: { source: "name" }, validation: (r) => r.required() }),
    defineField({ name: "name", title: "Topper Name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "photo",
      title: "Topper Photo",
      type: "image",
      options: { hotspot: true },
      description: "टॉपर की फोटो अपलोड करें (Topper's portrait photo)",
    }),
    defineField({ name: "rank", title: "Rank", type: "number" }),
    defineField({ name: "year", title: "Year", type: "number" }),
    defineField({ name: "exam", title: "Exam", type: "string", options: { list: ["UPSC", "MPPSC"] } }),
    defineField({ name: "score", title: "Marks Scored", type: "number" }),
    defineField({
      name: "subject",
      title: "Subject / GS Paper",
      type: "string",
      options: {
        list: [
          { title: "इतिहास (History)", value: "history" },
          { title: "भूगोल (Geography)", value: "geography" },
          { title: "राजव्यवस्था (Polity)", value: "polity" },
          { title: "नीतिशास्त्र (Ethics)", value: "ethics" },
          { title: "सामान्य हिंदी (Hindi)", value: "hindi" },
          { title: "अर्थव्यवस्था (Economy)", value: "economy" },
          { title: "सामान्य अध्ययन – सभी (GS All)", value: "all" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "file", title: "PDF Answer sheet", type: "file", validation: (r) => r.required() }),
    defineField({
      name: "isRecommended",
      title: "Faculty Recommended Copy?",
      type: "boolean",
      initialValue: false,
      description: "क्या यह उत्तर पुस्तिका संकाय (Faculty) द्वारा अनुशंसित है?",
    }),
    defineField({
      name: "recommendedBy",
      title: "Recommended By Faculty",
      type: "reference",
      to: [{ type: "faculty" }],
      description: "किस संकाय सदस्य ने इसकी अनुशंसा की है?",
      hidden: ({ document }) => !document?.isRecommended,
    }),
    defineField({
      name: "recommendationReasonHi",
      title: "Reason for Recommendation (Hindi)",
      type: "string",
      description: "अनुशंसा का कारण (जैसे: 'मानचित्र और आरेख प्रस्तुति हेतु अनुशंसित')",
      hidden: ({ document }) => !document?.isRecommended,
    }),
    defineField({
      name: "recommendationReasonEn",
      title: "Reason for Recommendation (English)",
      type: "string",
      description: "Reason for recommendation (e.g. 'Recommended for Diagrams & Maps')",
      hidden: ({ document }) => !document?.isRecommended,
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "subject", media: "photo" },
  },
});

export const ad: SchemaTypeDefinition = defineType({
  name: "ad",
  title: "Advertisement / Banner",
  type: "document",
  fields: [
    defineField({ name: "titleHi", title: "Title (Hindi)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "titleEn", title: "Title (English)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "subtitleHi", title: "Subtitle / Description (Hindi)", type: "text", rows: 2 }),
    defineField({ name: "subtitleEn", title: "Subtitle / Description (English)", type: "text", rows: 2 }),
    defineField({ name: "image", title: "Banner Image", type: "image", options: { hotspot: true }, validation: (r) => r.required() }),
    defineField({ name: "ctaHi", title: "CTA Button Text (Hindi)", type: "string", initialValue: "अभी देखें →" }),
    defineField({ name: "ctaEn", title: "CTA Button Text (English)", type: "string", initialValue: "Learn More →" }),
    defineField({ name: "href", title: "Target URL / Link", type: "string", validation: (r) => r.required() }),
    defineField({ name: "hrefEn", title: "Target URL / Link (English)", type: "string" }),
  ],
  preview: {
    select: { title: "titleEn", subtitle: "href" },
  },
});

export const faculty: SchemaTypeDefinition = defineType({
  name: "faculty",
  title: "Faculty / Senior Mentor",
  type: "document",
  fields: [
    defineField({ name: "nameHi", title: "Name (Hindi)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "nameEn", title: "Name (English)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "titleHi", title: "Title / Role (Hindi)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "titleEn", title: "Title / Role (English)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "descHi", title: "Description / Highlights (Hindi)", type: "text", rows: 3 }),
    defineField({ name: "descEn", title: "Description / Highlights (English)", type: "text", rows: 3 }),
    defineField({ name: "image", title: "Faculty Photo", type: "image", options: { hotspot: true } }),
    defineField({
      name: "medium",
      title: "Medium",
      type: "string",
      options: {
        list: [
          { title: "Hindi Medium", value: "hindi" },
          { title: "English Medium", value: "english" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
      initialValue: "hindi",
    }),
    defineField({ name: "orderIndex", title: "Order Index (for sorting)", type: "number", initialValue: 0 }),
  ],
  preview: {
    select: { title: "nameEn", subtitle: "titleEn", media: "image" },
  },
});

export const offlineBatch: SchemaTypeDefinition = defineType({
  name: "offlineBatch",
  title: "Offline Classroom Batch",
  type: "document",
  fields: [
    defineField({ name: "titleHi", title: "Batch Title (Hindi)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "titleEn", title: "Batch Title (English)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "startDateHi", title: "Start Date (Hindi)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "startDateEn", title: "Start Date (English)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "timeHi", title: "Timing (Hindi)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "timeEn", title: "Timing (English)", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "medium",
      title: "Medium",
      type: "string",
      options: {
        list: [
          { title: "Hindi Medium", value: "hindi" },
          { title: "English Medium", value: "english" },
          { title: "Bilingual (Hindi/English)", value: "bilingual" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
      initialValue: "bilingual",
    }),
    defineField({ name: "badgeHi", title: "Status Badge (Hindi)", type: "string" }),
    defineField({ name: "badgeEn", title: "Status Badge (English)", type: "string" }),
    defineField({ name: "seatsFillPercent", title: "Seats Filled Percentage", type: "number", initialValue: 0 }),
    defineField({ name: "descHi", title: "Description (Hindi)", type: "text", rows: 3 }),
    defineField({ name: "descEn", title: "Description (English)", type: "text", rows: 3 }),
    defineField({ name: "locationNameHi", title: "Location Name (Hindi)", type: "string", initialValue: "Rajiv Gandhi Circle Campus" }),
    defineField({ name: "locationNameEn", title: "Location Name (English)", type: "string", initialValue: "Rajiv Gandhi Circle Campus" }),
    defineField({
      name: "center",
      title: "Center Location",
      type: "string",
      options: {
        list: [
          { title: "Indore", value: "indore" },
        ],
      },
      validation: (r) => r.required(),
      initialValue: "indore",
    }),
    defineField({ name: "orderIndex", title: "Order Index (for sorting)", type: "number", initialValue: 0 }),
    defineField({ name: "isNew", title: "Is New Batch? (Tick to highlight with Blinking NEW badge)", type: "boolean", initialValue: false }),
  ],
  preview: {
    select: { title: "titleEn", subtitle: "startDateEn" },
  },
});

export const onlineCourse: SchemaTypeDefinition = defineType({
  name: "onlineCourse",
  title: "Online Course",
  type: "document",
  fields: [
    defineField({ name: "slug", type: "slug", options: { source: "titleEn" }, validation: (r) => r.required() }),
    defineField({ name: "titleHi", title: "Course Title (Hindi)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "titleEn", title: "Course Title (English)", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Live Classes", value: "live" },
          { title: "UPSC CSE", value: "upsc" },
          { title: "MPPSC Special", value: "mppsc" },
          { title: "MPSI Special", value: "mpsi" },
          { title: "Literature Special", value: "literature" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
      initialValue: "upsc",
    }),
    defineField({ name: "image", title: "Course Cover Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "altHi", title: "Cover Image Alt Text (Hindi)", type: "string" }),
    defineField({ name: "altEn", title: "Cover Image Alt Text (English)", type: "string" }),
    defineField({ name: "badgeHi", title: "Status Badge (Hindi)", type: "string" }),
    defineField({ name: "badgeEn", title: "Status Badge (English)", type: "string" }),
    defineField({ name: "isLive", title: "Is Live Class?", type: "boolean", initialValue: () => false }),
    defineField({ name: "enrollUrl", title: "Enroll Link / URL", type: "url" }),
    defineField({ name: "mentorNameHi", title: "Mentor Name (Hindi)", type: "string" }),
    defineField({ name: "mentorNameEn", title: "Mentor Name (English)", type: "string" }),
    defineField({ name: "mentorTitleHi", title: "Mentor Title / Role (Hindi)", type: "string" }),
    defineField({ name: "mentorTitleEn", title: "Mentor Title / Role (English)", type: "string" }),
    defineField({ name: "mentorImage", title: "Mentor Photo", type: "image", options: { hotspot: true } }),
    defineField({ name: "mentorBioHi", title: "Mentor Bio (Hindi)", type: "text", rows: 3 }),
    defineField({ name: "mentorBioEn", title: "Mentor Bio (English)", type: "text", rows: 3 }),
    defineField({ name: "price", title: "Discounted Price (e.g. ₹12,499)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "originalPrice", title: "Original Price (e.g. ₹24,999)", type: "string" }),
    defineField({ name: "durationHi", title: "Duration (Hindi, e.g. 18 महीने)", type: "string" }),
    defineField({ name: "durationEn", title: "Duration (English, e.g. 18 Months)", type: "string" }),
    defineField({ name: "lecturesCountHi", title: "Lectures Count (Hindi)", type: "string" }),
    defineField({ name: "lecturesCountEn", title: "Lectures Count (English)", type: "string" }),
    defineField({ name: "studentsCountHi", title: "Students Count (Hindi)", type: "string" }),
    defineField({ name: "studentsCountEn", title: "Students Count (English)", type: "string" }),
    defineField({ name: "rating", title: "Rating (e.g. 4.9)", type: "string", initialValue: "4.9" }),
    defineField({ name: "descriptionHi", title: "Description (Hindi)", type: "text", rows: 4 }),
    defineField({ name: "descriptionEn", title: "Description (English)", type: "text", rows: 4 }),
    defineField({ name: "whatYouLearnHi", title: "What You Learn List (Hindi)", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "whatYouLearnEn", title: "What You Learn List (English)", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "highlightsHi", title: "Course Highlights (Hindi)", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "highlightsEn", title: "Course Highlights (English)", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "syllabus",
      title: "Syllabus Modules",
      type: "array",
      of: [
        {
          type: "object",
          name: "syllabusModule",
          title: "Syllabus Module",
          fields: [
            { name: "titleHi", type: "string", title: "Module Title (Hindi)" },
            { name: "titleEn", type: "string", title: "Module Title (English)" },
            { name: "topicsHi", type: "array", of: [{ type: "string" }], title: "Topics (Hindi)" },
            { name: "topicsEn", type: "array", of: [{ type: "string" }], title: "Topics (English)" },
          ],
        },
      ],
    }),
    defineField({
      name: "features",
      title: "Course Key Features",
      type: "array",
      of: [
        {
          type: "object",
          name: "courseFeature",
          title: "Course Feature",
          fields: [
            { name: "icon", type: "string", title: "Icon (Lucide name)" },
            { name: "labelHi", type: "string", title: "Label (Hindi)" },
            { name: "labelEn", type: "string", title: "Label (English)" },
            { name: "valueHi", type: "string", title: "Value (Hindi)" },
            { name: "valueEn", type: "string", title: "Value (English)" },
          ],
        },
      ],
    }),
    defineField({
      name: "testimonials",
      title: "Student Testimonials",
      type: "array",
      of: [
        {
          type: "object",
          name: "courseTestimonial",
          title: "Student Testimonial",
          fields: [
            { name: "nameHi", type: "string", title: "Student Name (Hindi)" },
            { name: "nameEn", type: "string", title: "Student Name (English)" },
            { name: "examHi", type: "string", title: "Exam / Achievement (Hindi)" },
            { name: "examEn", type: "string", title: "Exam / Achievement (English)" },
            { name: "textHi", type: "text", title: "Testimonial Text (Hindi)" },
            { name: "textEn", type: "text", title: "Testimonial Text (English)" },
            { name: "avatar", type: "image", title: "Avatar Photo" },
          ],
        },
      ],
    }),
    defineField({ name: "orderIndex", title: "Order Index (for sorting)", type: "number", initialValue: 0 }),
  ],
  preview: {
    select: { title: "titleEn", subtitle: "category" },
  },
});

export const testSchedule: SchemaTypeDefinition = defineType({
  name: "testSchedule",
  title: "Test Schedule",
  type: "document",
  fields: [
    defineField({ name: "date", title: "Date / Time (e.g. 24 Oct 2024)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "code", title: "Test Code (e.g. UPSC GS-1)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "titleHi", title: "Title (Hindi)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "titleEn", title: "Title (English)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "focusHi", title: "Focus/Syllabus (Hindi)", type: "string" }),
    defineField({ name: "focusEn", title: "Focus/Syllabus (English)", type: "string" }),
    defineField({ name: "orderIndex", title: "Order Index", type: "number", initialValue: 0 }),
  ],
  preview: {
    select: { title: "titleEn", subtitle: "date" },
  },
});

export const topper: SchemaTypeDefinition = defineType({
  name: "topper",
  title: "Topper / Selected Student",
  type: "document",
  fields: [
    defineField({ name: "nameHi", title: "Name (Hindi)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "nameEn", title: "Name (English)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "rank", title: "Rank", type: "number", validation: (r) => r.required() }),
    defineField({
      name: "exam",
      title: "Exam",
      type: "string",
      options: {
        list: [
          { title: "UPSC", value: "UPSC" },
          { title: "MPPSC", value: "MPPSC" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
      initialValue: "MPPSC",
    }),
    defineField({ name: "year", title: "Year", type: "number", validation: (r) => r.required() }),
    defineField({ name: "postHi", title: "Post / Designation (Hindi)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "postEn", title: "Post / Designation (English)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "avatar", title: "Topper Photo", type: "image", options: { hotspot: true } }),
    defineField({ name: "quoteHi", title: "Quote / Testimonial (Hindi)", type: "text", rows: 3 }),
    defineField({ name: "quoteEn", title: "Quote / Testimonial (English)", type: "text", rows: 3 }),
    defineField({ name: "rollNo", title: "Roll Number", type: "string" }),
    defineField({ name: "isRanker", title: "Is Featured Ranker (Top 10)?", type: "boolean", initialValue: () => false }),
    defineField({ name: "orderIndex", title: "Order Index (for sorting)", type: "number", initialValue: () => 0 }),
  ],
  preview: {
    select: { title: "nameEn", subtitle: "postEn", media: "avatar" },
  },
});

export const subjectQuiz: SchemaTypeDefinition = defineType({
  name: "subjectQuiz",
  title: "Subject Quiz (विषय-वार क्विज़)",
  type: "document",
  fields: [
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "titleEn" }, validation: (r) => r.required() }),
    defineField({ name: "titleHi", title: "Title (Hindi)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "titleEn", title: "Title (English)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "descriptionHi", title: "Description (Hindi)", type: "text", rows: 3 }),
    defineField({ name: "descriptionEn", title: "Description (English)", type: "text", rows: 3 }),
    defineField({
      name: "subject",
      title: "Subject (विषय)",
      type: "string",
      options: {
        list: [
          { title: "Madhya Pradesh GK (MPGK)", value: "MPGK" },
          { title: "General Science (विज्ञान)", value: "Science" },
          { title: "Geography (भूगोल)", value: "Geography" },
          { title: "History & Culture (इतिहास)", value: "History" },
          { title: "Polity & Governance (राजव्यवस्था)", value: "Polity" },
          { title: "Economy (अर्थव्यवस्था)", value: "Economy" },
          { title: "Environment & Ecology (पर्यावरण)", value: "Environment" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "difficulty",
      title: "Difficulty (कठिनाई स्तर)",
      type: "string",
      options: {
        list: [
          { title: "Easy", value: "EASY" },
          { title: "Medium", value: "MEDIUM" },
          { title: "Hard", value: "HARD" },
        ],
        layout: "radio",
      },
      initialValue: "MEDIUM",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "durationMins",
      title: "Duration (Mins) - समय अवधि (मिनट)",
      type: "number",
      initialValue: 15,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "mcqs",
      title: "MCQs",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "question", type: "string", title: "Question (HI)" },
            { name: "questionEn", type: "string", title: "Question (EN)" },
            { name: "options", type: "array", of: [{ type: "string" }], title: "Options (HI)" },
            { name: "optionsEn", type: "array", of: [{ type: "string" }], title: "Options (EN)" },
            { name: "correctIndex", type: "number", title: "Correct Index" },
            { name: "explanation", type: "text", title: "Explanation (HI)" },
            { name: "explanationEn", type: "text", title: "Explanation (EN)" },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { title: "titleEn", subtitle: "subject" },
  },
});

export const aboutPageConfig: SchemaTypeDefinition = defineType({
  name: "aboutPageConfig",
  title: "About Page Configuration",
  type: "document",
  fields: [
    defineField({
      name: "testimonials",
      title: "Success Stories / Testimonials (सफलता की कहानियां)",
      type: "array",
      of: [
        {
          type: "object",
          name: "aboutTestimonial",
          title: "Testimonial",
          fields: [
            ...localeStringField("name", "Student Name (HI)", "Student Name (EN)"),
            ...localeStringField("exam", "Exam / Achievement (HI)", "Exam / Achievement (EN)"),
            ...localeTextField("quote", "Testimonial Text (HI)", "Testimonial Text (EN)"),
            defineField({ name: "avatar", type: "image", title: "Avatar Photo (Optional)", options: { hotspot: true } }),
          ],
          preview: {
            select: { title: "nameEn", subtitle: "examEn" },
          },
        },
      ],
    }),
    defineField({
      name: "galleryImages",
      title: "Campus Gallery Images (कैंपस गैलरी)",
      type: "array",
      of: [
        {
          type: "object",
          name: "galleryImage",
          title: "Gallery Image",
          fields: [
            defineField({ name: "image", type: "image", title: "Image", options: { hotspot: true }, validation: (r) => r.required() }),
            ...localeStringField("caption", "Caption (HI)", "Caption (EN)"),
            defineField({
              name: "layout",
              title: "Layout Size",
              type: "string",
              options: {
                list: [
                  { title: "Large (8 cols)", value: "large" },
                  { title: "Small (4 cols)", value: "small" },
                  { title: "Full Width (12 cols)", value: "full" },
                ],
              },
              initialValue: "large",
            }),
          ],
          preview: {
            select: { title: "captionEn", media: "image" },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "About Page Configuration" };
    },
  },
});

export const ncertBook: SchemaTypeDefinition = defineType({
  name: "ncertBook",
  title: "NCERT E-Book",
  type: "document",
  fields: [
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "titleEn" }, validation: (r) => r.required() }),
    defineField({ name: "title", title: "Title (HI)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "titleEn", title: "Title (EN)", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "classNumber",
      title: "Class",
      type: "number",
      validation: (r) => r.required().min(6).max(12),
      description: "Class number (6–12)",
    }),
    defineField({
      name: "subject",
      title: "Subject",
      type: "string",
      options: {
        list: [
          { title: "History", value: "History" },
          { title: "Geography", value: "Geography" },
          { title: "Polity", value: "Polity" },
          { title: "Economics", value: "Economics" },
          { title: "Science", value: "Science" },
          { title: "Biology", value: "Biology" },
          { title: "Physics", value: "Physics" },
          { title: "Chemistry", value: "Chemistry" },
          { title: "Mathematics", value: "Mathematics" },
          { title: "Sociology", value: "Sociology" },
          { title: "Art & Culture", value: "Art & Culture" },
          { title: "Hindi", value: "Hindi" },
          { title: "English", value: "English" },
          { title: "Social Science", value: "Social Science" },
          { title: "Environment", value: "Environment" },
          { title: "Other", value: "Other" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "part", title: "Part (e.g. Part I, Part II)", type: "string" }),
    defineField({
      name: "language",
      title: "Book Language",
      type: "string",
      options: {
        list: [
          { title: "Hindi", value: "hi" },
          { title: "English", value: "en" },
        ],
      },
      initialValue: "hi",
      validation: (r) => r.required(),
    }),
    defineField({ name: "file", title: "PDF File", type: "file", validation: (r) => r.required() }),
    defineField({ name: "coverImage", title: "Cover Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "publishedAt", title: "Published At", type: "datetime", initialValue: () => new Date().toISOString() }),
  ],
  orderings: [
    { title: "Class (Desc)", name: "classDesc", by: [{ field: "classNumber", direction: "desc" }] },
    { title: "Class (Asc)", name: "classAsc", by: [{ field: "classNumber", direction: "asc" }] },
  ],
  preview: {
    select: { title: "titleEn", classNumber: "classNumber", subject: "subject" },
    prepare(selection) {
      const { title, classNumber, subject } = selection;
      return {
        title: title || "Untitled",
        subtitle: `Class ${classNumber || "?"} — ${subject || ""}`,
      };
    },
  },
});

export const offlinePageConfig: SchemaTypeDefinition = defineType({
  name: "offlinePageConfig",
  title: "Offline Page Configuration (ऑफलाइन पेज सेटिंग्स)",
  type: "document",
  fields: [
    defineField({
      name: "brochure",
      title: "Classroom Brochure PDF (क्लासरूम ब्रोशर पीडीएफ)",
      type: "file",
      options: { accept: ".pdf" },
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Offline Page Configuration",
      };
    },
  },
});

export const examCalendar: SchemaTypeDefinition = defineType({
  name: "examCalendar",
  title: "Exam Calendar (परीक्षा कैलेंडर)",
  type: "document",
  fields: [
    ...localeStringField("name", "Exam Name (HI)", "Exam Name (EN)"),
    defineField({
      name: "examDate",
      title: "Sortable Date/Time",
      type: "datetime",
      description: "Used to sort exams and for countdown timers.",
      validation: (r) => r.required(),
    }),
    ...localeStringField("dateText", "Display Date (HI)", "Display Date (EN)"),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Upcoming / आगामी", value: "upcoming" },
          { title: "Ongoing / जारी", value: "ongoing" },
          { title: "Completed / संपन्न", value: "completed" },
        ],
      },
      initialValue: "upcoming",
      validation: (r) => r.required(),
    }),
    ...localeTextField("description", "Description (HI)", "Description (EN)"),
    defineField({
      name: "isPrimaryCountdown",
      title: "Is Primary Countdown Target?",
      type: "boolean",
      description: "If checked, this exam's date will be used for the countdown timer on the calendar and home pages.",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "nameEn",
      titleHi: "name",
      dateText: "dateTextEn",
      examDate: "examDate",
    },
    prepare(selection) {
      const { title, titleHi, dateText, examDate } = selection;
      const displayTitle = title || titleHi || "Untitled Exam";
      const displayDate = dateText || (examDate ? new Date(examDate).toLocaleDateString() : "No date");
      return {
        title: displayTitle,
        subtitle: displayDate,
      };
    },
  },
});

export const popupBanner: SchemaTypeDefinition = defineType({
  name: "popupBanner",
  title: "Popup Banner (Enquiry Poster)",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title / Label",
      type: "string",
      description: "Internal label for identification (e.g. 'Admission 2026-27 Poster')",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "image",
      title: "Poster Image (1:1 Square Recommended)",
      type: "image",
      options: { hotspot: true },
      description: "Upload the banner image that appears on the left side of the enquiry popup. Recommended: 1:1 square (e.g. 500x500px or 800x800px).",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "altText",
      title: "Alt Text",
      type: "string",
      description: "Accessibility alt text for the image",
      initialValue: "Aakar IAS Academy — Admission Open",
    }),
    defineField({
      name: "isActive",
      title: "Active (Show on Website)",
      type: "boolean",
      description: "Toggle to enable/disable this popup banner on the website",
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: "title", media: "image", active: "isActive" },
    prepare(selection) {
      const { title, media, active } = selection;
      return {
        title: title || "Popup Banner",
        subtitle: active ? "✅ Active" : "❌ Inactive",
        media,
      };
    },
  },
});

export const homeNotice: SchemaTypeDefinition = defineType({
  name: "homeNotice",
  title: "Home Notice Ticker (होम नोटिस)",
  type: "document",
  fields: [
    defineField({
      name: "noticeTextHi",
      title: "Notice Text (Hindi)",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "noticeTextEn",
      title: "Notice Text (English)",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "noticeLink",
      title: "Notice Link / URL (Optional)",
      type: "string",
    }),
    defineField({
      name: "isActive",
      title: "Active",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "orderIndex",
      title: "Order Index (for sorting)",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: {
    select: { title: "noticeTextHi", subtitle: "noticeTextEn", active: "isActive" },
    prepare(selection) {
      const { title, subtitle, active } = selection;
      return {
        title: title || "Untitled Notice",
        subtitle: `${active ? "🟢 Active" : "🔴 Inactive"} | ${subtitle || ""}`,
      };
    },
  },
});

export const schemaTypes: SchemaTypeDefinition[] = [
  article,
  staticGk,
  editorial,
  blog,
  weekly,
  monthly,
  category,
  tag,
  author,
  monthlyPdf,
  notification,
  faq,
  pyq,
  homeConfig,
  downloadPageConfig,
  staticPage,
  testSeries,
  publication,
  mediaRelease,
  syllabusPage,
  topperCopy,
  ad,
  faculty,
  offlineBatch,
  onlineCourse,
  testSchedule,
  topper,
  subjectQuiz,
  aboutPageConfig,
  ncertBook,
  offlinePageConfig,
  examCalendar,
  popupBanner,
  homeNotice,
];
