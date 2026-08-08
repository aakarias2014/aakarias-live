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
  console.error("Missing Sanity credentials in environment variables.");
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
  const docId = "mp-patwari-group-2-subgroup-4-bharti-2026";
  const youtubeUrl = "https://youtu.be/CWBcJ86R2kc";

  console.log(`Updating Sanity document ${docId} with youtubeUrl: ${youtubeUrl}...`);

  const res = await client
    .patch(docId)
    .set({ youtubeUrl })
    .commit();

  console.log("Successfully updated Sanity document:", res._id, "youtubeUrl:", res.youtubeUrl);
}

main().catch((err) => {
  console.error("Error updating Sanity document:", err);
  process.exit(1);
});
