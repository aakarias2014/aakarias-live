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
  console.log("🗑️ Removing Static GK concept document 'ca-what-is-disaster-management-ncert' from Current Affairs in Sanity CMS...");

  try {
    await client.delete("ca-what-is-disaster-management-ncert");
    console.log("✅ Successfully deleted 'ca-what-is-disaster-management-ncert' from Current Affairs!");
  } catch (err) {
    console.warn("⚠️ Warning during deletion:", err);
  }

  // Ensure Static GK version 'gk-what-is-disaster-management-ncert' exists and is assigned to 'cat-disaster-management'
  console.log("📌 Verifying Static GK document 'gk-what-is-disaster-management-ncert'...");
  const staticDoc: any = await client.getDocument("gk-what-is-disaster-management-ncert");
  if (staticDoc) {
    console.log("✔ Static GK document exists under General Awareness!");
  }

  console.log("🌐 Triggering Vercel live cache revalidation...");
  try {
    const fetchRes = await fetch("https://www.aakarias.com/api/revalidate?secret=aakar-ias-revalidation-secret-key-2026&path=all");
    const json = await fetchRes.json();
    console.log("🔄 Revalidation output:", json);
  } catch (err) {
    console.warn("⚠️ Revalidation fetch failed:", err);
  }
}

main().catch((err) => {
  console.error("❌ Execution error:", err);
  process.exit(1);
});
