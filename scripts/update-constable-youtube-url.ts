import { createClient } from "@sanity/client";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const {
  NEXT_PUBLIC_SANITY_PROJECT_ID: projectId,
  NEXT_PUBLIC_SANITY_DATASET: dataset,
  SANITY_API_WRITE_TOKEN: token,
} = process.env;

if (!projectId || !dataset || !token) {
  console.error("❌ Missing Sanity environment variables in .env.local!");
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
  const docId = "mp-police-constable-recruitment-2026";
  const youtubeUrl = "https://youtube.com/live/PaP_uUtYGMU?feature=share";

  console.log(`📹 Updating youtubeUrl for Sanity document: ${docId}...`);
  await client.patch(docId)
    .set({ youtubeUrl })
    .commit();

  console.log("🎉 SUCCESS! YouTube video URL updated in Sanity CMS!");
}

main().catch((err) => {
  console.error("❌ Error updating youtubeUrl:", err);
  process.exit(1);
});
