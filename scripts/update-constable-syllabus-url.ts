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
  apiVersion: "2024-01-01",
  useCdn: false,
});

async function main() {
  const docId = "mp-police-constable-recruitment-2026";
  const newUrl = "https://drive.google.com/file/d/1Wlx_JDWSRQUCFTfnWaZ3w3VwYlsgOcko/view?usp=sharing";

  console.log(`🚀 Updating syllabusPdfUrl for ${docId} in Sanity...`);
  await client
    .patch(docId)
    .set({ syllabusPdfUrl: newUrl })
    .commit();

  console.log("✅ Successfully updated syllabusPdfUrl in Sanity CMS!");
}

main().catch((err) => {
  console.error("❌ Error updating syllabusPdfUrl in Sanity:", err);
  process.exit(1);
});
