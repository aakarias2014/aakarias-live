import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import path from "path";
import { civilianAwardsArticleData, mpStateAwardsArticleData } from "../src/data/awards-articles-override";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const {
  NEXT_PUBLIC_SANITY_PROJECT_ID: projectId,
  NEXT_PUBLIC_SANITY_DATASET: dataset,
  SANITY_API_WRITE_TOKEN: token,
} = process.env;

if (!token) {
  console.error("❌ SANITY_API_WRITE_TOKEN is missing in .env.local");
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
  console.log("🚀 Syncing Awards & Honors Category Articles to Sanity CMS...");

  const articles = [civilianAwardsArticleData, mpStateAwardsArticleData];

  for (const doc of articles) {
    try {
      const res = await client.createOrReplace(doc as any);
      console.log(`✅ Synced article to Sanity: ${res._id} (${doc.slug.current})`);
    } catch (err: any) {
      console.warn(`⚠️ Warning syncing ${doc.slug.current}:`, err.message || err);
    }
  }

  console.log("🎉 Awards & Honors articles sync completed!");
}

main().catch(console.error);
