import dotenv from "dotenv";
import path from "path";
import { createClient } from "@sanity/client";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

const mppscKeywords = [
  "MPPSC Current Affairs 2026",
  "MPPSC Current Affairs",
  "MPPSC Current Affairs in Hindi",
  "MPPSC Current Affairs 2026 in Hindi",
  "MP Current Affairs 2026",
  "MP Current Affairs PDF",
  "MP Current Affairs in Hindi",
  "MP GK Current Affairs",
  "MPPSC Current Affairs Magazine",
  "MPPSC Monthly Current Affairs PDF",
  "MPPSC Current Affairs Book",
  "MP Police Current Affairs",
  "MPPSC Current Affairs Quiz",
  "MPPSC Current Affairs Notes",
  "MPPSC Exam Current Affairs",
  "MP Current Affairs 2026 PDF",
  "mppsc current affairs source",
  "MPPSC Daily Current Affairs"
];

async function main() {
  console.log("🚀 Starting bulk SEO optimization for MPPSC Current Affairs articles in Sanity CMS...");

  const articles = await client.fetch<Array<{ _id: string; title: string; keywords?: string[] }>>(`
    *[_type == "currentAffairs" && (references("tag-mppsc") || references("tag-sports") || references("tag-mp-current-affairs"))][0..50]{
      _id,
      title,
      keywords
    }
  `);

  console.log(`🔍 Found ${articles.length} articles to update in Sanity...`);

  for (const article of articles) {
    const existingKeywords = article.keywords || [];
    const combinedKeywords = Array.from(new Set([...existingKeywords, ...mppscKeywords]));

    await client
      .patch(article._id)
      .set({ keywords: combinedKeywords })
      .commit();

    console.log(`✔ Updated keywords for: "${article.title}" (${article._id})`);
  }

  console.log("🎉 SUCCESS! Bulk MPPSC Current Affairs SEO Keyword optimization completed in Sanity CMS.");
}

main().catch((err) => {
  console.error("❌ Error updating Sanity CMS articles:", err);
  process.exit(1);
});
