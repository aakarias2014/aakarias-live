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
  // 1. Create or replace the MP Current Affairs tag
  const tag = {
    _id: "tag-mp-ca",
    _type: "tag",
    name: "MP Current Affairs",
    slug: { _type: "slug", current: "mp-current-affairs" },
  };

  console.log("Creating MP Current Affairs tag...");
  await client.createOrReplace(tag);
  console.log("✔ Created tag:", tag._id);

  // 2. Fetch the Burhanpur Banana article
  console.log("Fetching Burhanpur Banana GI Tag article...");
  const article = await client.getDocument("ca-burhanpur-banana-gi-tag");
  if (!article) {
    console.error("❌ Article 'ca-burhanpur-banana-gi-tag' not found!");
    return;
  }

  // 3. Append tag reference if missing
  const tags = (article.tags as any[]) || [];
  const hasTag = tags.some((t: any) => t._ref === "tag-mp-ca");
  
  if (!hasTag) {
    console.log("Appending tag reference to article...");
    await client.patch("ca-burhanpur-banana-gi-tag")
      .set({
        tags: [...tags, { _type: "reference", _ref: "tag-mp-ca" }]
      })
      .commit();
    console.log("✔ Tag successfully appended!");
  } else {
    console.log("✔ Tag is already assigned to the article.");
  }
}

main().catch((err) => {
  console.error("❌ Error running script:", err);
  process.exit(1);
});
