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
  const query = `*[_type == "pyq"] { _id, title, titleEn, exam, year, subject, paper, "fileUrl": file.asset->url }`;
  const result = await client.fetch(query);
  
  console.log("Query Results for pyq:");
  console.log(JSON.stringify(result, null, 2));
}

main().catch(console.error);
