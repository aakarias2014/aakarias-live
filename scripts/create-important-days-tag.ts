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
  const tag = {
    _id: "tag-important-days",
    _type: "tag",
    name: "Important Days / महत्वपूर्ण दिवस",
    slug: { _type: "slug", current: "important-days" },
  };

  console.log("Creating/Ensuring 'Important Days' tag in Sanity...");
  await client.createOrReplace(tag);
  console.log("✔ Created tag:", tag._id);
}

main().catch((err) => {
  console.error("❌ Error running script:", err);
  process.exit(1);
});
