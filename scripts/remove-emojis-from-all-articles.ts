import { createClient } from "@sanity/client";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "v8f99338",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2023-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

function removeEmojis(text: string): string {
  if (!text) return "";
  // Regex to remove all emojis
  return text
    .replace(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F600}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]|[\u{1F900}-\u{1F9FF}]|[\u{1FA00}-\u{1FA6F}]|[\u{1FA70}-\u{1FAFF}]/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanBlocks(blocks: any[]): any[] {
  if (!Array.isArray(blocks)) return blocks;
  return blocks.map((block) => {
    if (block._type === "block") {
      const cleanedChildren = (block.children || []).map((child: any) => {
        const cleaned: any = { ...child };
        if (child.text !== undefined) cleaned.text = removeEmojis(child.text || "");
        if (child.textEn !== undefined && String(child.textEn).trim() !== "") {
          cleaned.textEn = removeEmojis(child.textEn);
        } else {
          delete cleaned.textEn;
        }
        return cleaned;
      });
      return {
        ...block,
        children: cleanedChildren,
      };
    }
    return block;
  });
}

async function main() {
  console.log("🚀 Removing all emojis from Sanity currentAffairs documents...");

  const docs = await sanityClient.fetch<any[]>('*[_type == "currentAffairs"]{ _id, title, body, bodyEn }');
  console.log(`Found ${docs.length} currentAffairs documents.`);

  for (const doc of docs) {
    let needsUpdate = false;
    const patchData: any = {};

    if (doc.title && /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu.test(doc.title)) {
      patchData.title = removeEmojis(doc.title);
      needsUpdate = true;
    }

    if (doc.body) {
      const cleanedBody = cleanBlocks(doc.body);
      patchData.body = cleanedBody;
      needsUpdate = true;
    }

    if (doc.bodyEn) {
      const cleanedBodyEn = cleanBlocks(doc.bodyEn);
      patchData.bodyEn = cleanedBodyEn;
      needsUpdate = true;
    }

    if (needsUpdate) {
      console.log(`📌 Stripping emojis from doc: ${doc._id}`);
      await sanityClient.patch(doc._id).set(patchData).commit();
    }
  }

  console.log("🎉 ALL EMOJIS REMOVED SUCCESSFULLY FROM SANITY CMS!");
}

main().catch((err) => {
  console.error("❌ Failed to remove emojis:", err);
  process.exit(1);
});
