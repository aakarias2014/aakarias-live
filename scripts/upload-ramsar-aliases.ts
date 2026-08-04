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
  console.log("🚀 Creating Ramsar article aliases in Sanity for all possible URL slugs...");

  // Fetch the primary document
  const primaryDoc = await client.fetch(`*[_id == "ca-ramsar-sites-in-india-2026"][0]`);

  if (!primaryDoc) {
    console.error("❌ Primary document ca-ramsar-sites-in-india-2026 not found!");
    process.exit(1);
  }

  const slugsToCreate = [
    "ramsar-sites-in-india",
    "ramsar-sites-in-india-2026",
  ];

  for (const slugStr of slugsToCreate) {
    const aliasDocId = `ca-${slugStr}`;
    const aliasDoc = {
      ...primaryDoc,
      _id: aliasDocId,
      slug: { _type: "slug", current: slugStr },
    };

    await client.createOrReplace(aliasDoc);
    console.log(`✅ Created/Updated alias document: ${aliasDocId} -> /current-affairs/${slugStr}`);
  }

  console.log("✨ All Ramsar article URL aliases successfully published to Sanity CMS!");
}

main().catch((err) => {
  console.error("❌ Error syncing aliases:", err);
  process.exit(1);
});
