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

const dummyIds = [
  "author-aakar",
  "cat-polity",
  "cat-economy",
  "cat-environment",
  "cat-scitech",
  "tag-upsc",
  "tag-mppsc",
  "tag-prelims",
  "tag-mains",
  "ca-pm-pranam",
  "ca-digital-rupee",
  "ed-federalism",
  "blog-tips",
  "pdf-june-2026",
  "pdf-upsc-syllabus",
  "pdf-mppsc-pyq-2026",
  "weekly-june-w1",
  "monthly-june-digest",
  "notif-upsc-prelims",
  "notif-mppsc-prelims",
  "faq-q1",
  "faq-q2",
];

async function main() {
  console.log("🧹 Deleting dummy data from Sanity...");
  
  for (const id of dummyIds) {
    try {
      // Delete published document
      await client.delete(id);
      // Delete draft document if it exists
      await client.delete(`drafts.${id}`);
      console.log(`✔ Deleted: ${id}`);
    } catch (err: any) {
      console.error(`❌ Failed to delete ${id}:`, err.message);
    }
  }
  
  console.log("✨ Cleanup completed!");
}

main().catch(console.error);
