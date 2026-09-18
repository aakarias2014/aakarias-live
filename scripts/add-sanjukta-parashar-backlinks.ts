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
  console.log("🔗 Adding bi-directional backlinks for Sanjukta Parashar CoBRA IG article...");

  const targetDocIds = [
    "mp-police-constable-recruitment-2026",
    "mp-police-subedar-steno-asi-bharti-2026",
    "mpsi-recruitment-2026",
  ];

  for (const id of targetDocIds) {
    try {
      const doc = await client.getDocument(id);
      if (!doc) {
        console.log(`⚠️ Document ${id} not found, skipping.`);
        continue;
      }

      console.log(`Updating nextArticle / links for ${id}...`);
      await client
        .patch(id)
        .set({
          nextArticle: {
            title: "IPS संजुक्ता पराशर: CRPF CoBRA की पहली महिला IG बनीं — संपूर्ण करियर व परीक्षा नोट्स",
            titleEn: "IPS Sanjukta Parashar Appointed First Female IG of CRPF CoBRA — Complete Career & Exam Notes",
            href: "/current-affairs/sanjukta-parashar-first-woman-ig-crpf-cobra",
          },
        })
        .commit();
      console.log(`✅ Bi-directional backlink updated for ${id}`);
    } catch (err) {
      console.error(`Error updating document ${id}:`, err);
    }
  }

  console.log("🎉 All bi-directional backlinks successfully synchronized!");
}

main().catch(console.error);
