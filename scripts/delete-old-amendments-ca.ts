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
  projectId,
  dataset,
  token,
  apiVersion: "2024-10-01",
  useCdn: false,
});

async function main() {
  const targetId = "ca-73-74-constitutional-amendments-1992";
  console.log(`Deleting old currentAffairs document: ${targetId}...`);
  try {
    await client.delete(targetId);
    console.log("✔ Successfully deleted old currentAffairs document!");
  } catch (err) {
    console.error("❌ Failed to delete document:", err);
  }
}

main().catch(console.error);
