import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const {
  NEXT_PUBLIC_SANITY_PROJECT_ID: projectId,
  NEXT_PUBLIC_SANITY_DATASET: dataset,
  SANITY_API_WRITE_TOKEN: token,
} = process.env;

if (!projectId || !dataset || !token) {
  console.error("❌ Missing Sanity variables in .env.local!");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-10-01",
  useCdn: false,
});

async function main() {
  console.log("🚀 Setting Ramsar Sites article as Featured and creating StaticGK version for General Awareness page...");

  const nowIso = new Date().toISOString();

  // 1. Fetch current Ramsar article document to duplicate as staticGk
  const sourceDoc = await client.fetch(`*[_id == "ca-ramsar-sites-in-india-2026"][0]`);

  if (!sourceDoc) {
    console.error("❌ Could not find ca-ramsar-sites-in-india-2026 document!");
    process.exit(1);
  }

  // Update existing CurrentAffairs documents to be Featured and set publishedAt to NOW
  const caDocIds = [
    "ca-ramsar-sites-in-india-2026",
    "ca-ramsar-sites-in-india-2026-seo",
    "ca-ramsar-sites-in-india-short",
    "ca-ramsar-sites-in-india"
  ];

  for (const docId of caDocIds) {
    await client.patch(docId).set({
      isFeatured: true,
      publishedAt: nowIso,
      category: { _type: "reference", _ref: "cat-environment" }
    }).commit();
    console.log(`✅ Set isFeatured: true & publishedAt: ${nowIso} for document: ${docId}`);
  }

  // 2. Create / Update staticGk version of Ramsar Sites article for /general-awareness?subject=environment
  const gkDocId = "gk-ramsar-sites-in-india";
  const staticGkDoc = {
    _id: gkDocId,
    _type: "staticGk",
    title: sourceDoc.title,
    titleEn: sourceDoc.titleEn,
    slug: { _type: "slug", current: "ramsar-sites-in-india" },
    publishedAt: nowIso,
    isFeatured: true,
    category: { _type: "reference", _ref: "cat-environment" },
    author: sourceDoc.author,
    featuredImage: sourceDoc.featuredImage,
    excerpt: sourceDoc.excerpt,
    excerptEn: sourceDoc.excerptEn,
    body: sourceDoc.body,
    bodyEn: sourceDoc.bodyEn,
    faqs: sourceDoc.faqs,
    mcqs: sourceDoc.mcqs,
    keywords: sourceDoc.keywords,
    seoTitle: sourceDoc.seoTitle,
    seoDescription: sourceDoc.seoDescription,
    tags: sourceDoc.tags
  };

  await client.createOrReplace(staticGkDoc);
  console.log(`✅ Created/Updated staticGk document: ${gkDocId} for /general-awareness?subject=environment`);

  console.log("✨ All visibility fixes executed successfully!");
}

main().catch((err) => {
  console.error("❌ Error fixing visibility:", err);
  process.exit(1);
});
