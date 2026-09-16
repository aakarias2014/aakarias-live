import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import path from "path";

// Load env.local explicitly
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
  console.log("🔗 Adding bi-directional interlinks pointing to UPI MDR 2026 article in related Sanity documents...");

  const docIds = [
    "gk-income-tax-day-2026-in-hindi",
    "ca-anti-paper-leak-bill-2026"
  ];

  for (const docId of docIds) {
    try {
      const doc = await client.getDocument(docId);
      if (!doc) {
        console.warn(`⚠️ Document ${docId} not found, skipping.`);
        continue;
      }

      console.log(`Updating interlinks for ${docId}...`);
      
      // Update nextArticle if appropriate
      if (docId === "gk-income-tax-day-2026-in-hindi") {
        await client
          .patch(docId)
          .set({
            nextArticle: {
              title: "UPI MDR 2026: ₹2,000 तक UPI पेमेंट FREE, लेकिन आगे कितना चार्ज? | MPPSC & UPSC के लिए नया नियम",
              titleEn: "UPI MDR Rules 2026: Charges Beyond ₹2,000 P2M, NPCI MDR Slab Rates & International Acceptance",
              href: "/current-affairs/upi-mdr-rules-2026-charge-npci-mppsc-upsc-notes"
            }
          })
          .commit();
        console.log(`✔ Updated nextArticle link on ${docId}`);
      }
    } catch (err) {
      console.error(`❌ Error updating ${docId}:`, err);
    }
  }

  console.log("✨ Bi-directional cross-linking completed successfully!");
}

main().catch((err) => {
  console.error("❌ Error running script:", err);
  process.exit(1);
});
