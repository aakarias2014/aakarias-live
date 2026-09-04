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
  console.log("🔄 Patching default author in Sanity CMS...");
  const authorDoc = {
    _id: "author-aakar",
    _type: "author",
    name: "Aakar IAS Team",
    slug: { _type: "slug", current: "aakar-ias-team" },
    bio: "Aakar IAS Editorial Team - Specializing in MPPSC & UPSC Civil Services preparation, current affairs, static GK, and polity development.",
  };

  await client.createOrReplace(authorDoc);
  console.log("✅ Successfully set 'Aakar IAS Team' as default author in Sanity CMS!");
}

main().catch((err) => {
  console.error("❌ Failed to update author in Sanity:", err);
});
