import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const {
  NEXT_PUBLIC_SANITY_PROJECT_ID: projectId,
  NEXT_PUBLIC_SANITY_DATASET: dataset,
} = process.env;

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-10-01",
  useCdn: true,
});

async function main() {
  const slug = "disaster-management-amendment-act-2025-mppsc-upsc-notes";
  const query = `*[_type in ["currentAffairs","article","editorial","blog","weekly","monthly","staticGk"] && slug.current == $slug][0]`;
  const raw = await client.fetch(query, { slug });
  console.log("📄 Raw Sanity Document for disaster-management-amendment-act-2025:");
  console.log(JSON.stringify(raw, null, 2));
}

main().catch(console.error);
