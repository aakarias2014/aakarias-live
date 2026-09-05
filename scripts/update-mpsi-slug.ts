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
  const possibleOldDocIds = [
    "mpsi-sub-inspector-recruitment-2026-507-posts",
    "mpsi-recruitment-2026-notification-out-507-posts"
  ];
  const newSlug = "mpsi-vacancy-2026-507-posts";

  console.log(`Updating Sanity CMS slug to: ${newSlug}...`);

  let oldDoc: any = null;
  let foundOldId = "";
  for (const id of possibleOldDocIds) {
    const doc = await client.getDocument(id);
    if (doc) {
      oldDoc = doc;
      foundOldId = id;
      break;
    }
  }

  if (oldDoc) {
    const newDoc = {
      ...oldDoc,
      _id: newSlug,
      slug: {
        _type: "slug",
        current: newSlug,
      },
    };

    console.log(`Creating new document with ID: ${newSlug}...`);
    await client.createOrReplace(newDoc);
    console.log(`Created document ${newSlug}!`);

    if (foundOldId !== newSlug) {
      console.log(`Deleting old document: ${foundOldId}...`);
      await client.delete(foundOldId);
      console.log(`Deleted ${foundOldId}`);
    }
  } else {
    // Patch if already exists under new ID
    const existingNewDoc = await client.getDocument(newSlug);
    if (existingNewDoc) {
      console.log(`Document ${newSlug} already exists in Sanity. Updating slug field...`);
      await client.patch(newSlug).set({
        slug: { _type: "slug", current: newSlug }
      }).commit();
    } else {
      console.error("No existing document found to copy!");
    }
  }

  console.log("Sanity CMS Slug Update to mpsi-vacancy-2026-507-posts Completed Successfully!");
}

main().catch((err) => {
  console.error("Failed to update Sanity CMS slug:", err);
  process.exit(1);
});
