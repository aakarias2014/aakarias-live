import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import path from "path";
import { sakshiChoudharyArticleData } from "../src/data/sakshi-choudhary-article-override";
import { priyaGhanghasArticleData } from "../src/data/priya-ghanghas-article-override";
import { arundhatiChoudharyArticleData } from "../src/data/arundhati-choudhary-article-override";
import { sachinSiwachArticleData } from "../src/data/sachin-siwach-article-override";
import { ankushPanghalArticleData } from "../src/data/ankush-panghal-article-override";

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

const articlesToUpload = [
  { data: sakshiChoudharyArticleData, name: "Sakshi Choudhary (Women's 51kg Gold)" },
  { data: priyaGhanghasArticleData, name: "Priya Ghanghas (Women's 60kg Gold)" },
  { data: arundhatiChoudharyArticleData, name: "Arundhati Choudhary (Women's 70kg Gold)" },
  { data: sachinSiwachArticleData, name: "Sachin Siwach (Men's 60kg Gold)" },
  { data: ankushPanghalArticleData, name: "Ankush Panghal (Men's 80kg Gold)" },
];

async function main() {
  console.log("🚀 Uploading 5 CWG 2026 Boxing Gold Medalist Articles to Sanity CMS...");

  for (const item of articlesToUpload) {
    const doc = {
      ...item.data,
      category: { _type: "reference", _ref: "cat-sports" },
      author: { _type: "reference", _ref: "author-aakar" },
      tags: [
        { _type: "reference", _ref: "tag-mppsc" },
        { _type: "reference", _ref: "tag-upsc" },
        { _type: "reference", _ref: "tag-sports" },
        { _type: "reference", _ref: "tag-prelims" },
        { _type: "reference", _ref: "tag-mains" },
      ],
    };

    console.log(`📝 Uploading ${item.name} ID: "${doc._id}"...`);
    try {
      const res = await client.createOrReplace(doc as any);
      console.log(`  🎉 Success: ${res._id} -> slug: ${res.slug?.current}`);
    } catch (err) {
      console.error(`  ❌ Failed for ${item.name}:`, err);
    }
  }

  console.log("✅ Finished uploading all 5 boxing articles to Sanity CMS!");
}

main();
