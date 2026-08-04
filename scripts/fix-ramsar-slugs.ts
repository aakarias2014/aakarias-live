import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const {
  NEXT_PUBLIC_SANITY_PROJECT_ID: projectId,
  NEXT_PUBLIC_SANITY_DATASET: dataset,
  SANITY_API_WRITE_TOKEN: token,
} = process.env;

const client = createClient({
  projectId: projectId!,
  dataset: dataset!,
  token: token!,
  apiVersion: "2024-10-01",
  useCdn: false,
});

async function main() {
  const baseDoc = await client.fetch(`*[_id in ["ca-ramsar-sites-in-india", "ca-ramsar-sites-in-india-2026"]][0]`);

  const slugVariants = [
    { id: "ca-ramsar-sites-in-india-short", slug: "ramsar-sites-in-india" },
    { id: "ca-ramsar-sites-in-india-2026", slug: "ramsar-sites-in-india-2026" },
    { id: "ca-ramsar-sites-in-india-2026-seo", slug: "ramsar-sites-in-india-2026-state-wise-list-101st-site-mppsc-upsc-notes" },
  ];

  for (const item of slugVariants) {
    const doc = {
      ...baseDoc,
      _id: item.id,
      slug: { _type: "slug", current: item.slug },
    };
    await client.createOrReplace(doc);
    console.log(`✅ Synced document ${item.id} with slug: ${item.slug}`);
  }
}

main().catch(console.error);
