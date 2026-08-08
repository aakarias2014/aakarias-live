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
  console.error("Missing Sanity environment variables.");
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
  const docId = "gk-sohgaura-copper-plate-mahasthan-inscription";

  console.log(`Assigning article ${docId} to Indian History category (cat-history)...`);

  const patch = client
    .patch(docId)
    .set({
      category: {
        _type: "reference",
        _ref: "cat-history",
      },
      tags: [
        { _type: "reference", _ref: "tag-mppsc", _key: "tag-mppsc-key" },
        { _type: "reference", _ref: "tag-upsc", _key: "tag-upsc-key" },
        { _type: "reference", _ref: "tag-art-culture", _key: "tag-art-culture-key" },
      ],
    });

  const res = await patch.commit();

  console.log("Successfully updated article in Sanity CMS:");
  console.log("Document ID:", res._id);
  console.log("Category reference:", res.category);
  console.log("Tags:", res.tags);
}

main().catch((err) => {
  console.error("Error updating article:", err);
  process.exit(1);
});
