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
  const gkDoc: any = await client.getDocument("gk-disaster-management-amendment-act-2025");
  const caDoc: any = await client.getDocument("ca-disaster-management-amendment-act-2025");

  console.log("📌 GK Doc featuredImage asset ref:", gkDoc?.featuredImage?.asset?._ref);
  console.log("📌 CA Doc featuredImage asset ref:", caDoc?.featuredImage?.asset?._ref);
}

main();
