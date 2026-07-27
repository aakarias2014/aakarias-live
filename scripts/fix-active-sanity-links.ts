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
  console.log("🛠️ Converting all interlinking text blocks in Sanity into active active links...");

  const conceptUrl = "/general-awareness/what-is-disaster-management-ncert-types-mppsc-notes";
  const actUrl = "/current-affairs/disaster-management-amendment-act-2025-mppsc-upsc-notes";
  const mainsUrl = "/mppsc/mains-syllabus";

  // 1. Fix ca-disaster-management-amendment-act-2025 & gk-disaster-management-amendment-act-2025
  const fixActDocs = async (id: string) => {
    const doc: any = await client.getDocument(id);
    if (!doc || !doc.body) return;

    const newBody = doc.body.map((block: any) => {
      if (block._type === "block") {
        const text = block.children?.map((c: any) => c.text).join("") || "";
        
        // If text contains "विस्तृत नोट्स यहाँ पढ़ें" or "आपदा प्रबंधन क्या है"
        if (text.includes("विस्तृत नोट्स यहाँ पढ़ें") || text.includes("मूलभूत अवधारणा")) {
          return {
            _type: "block",
            style: "normal",
            children: [
              {
                _type: "span",
                text: "👉 ",
              },
              {
                _type: "span",
                text: `[आपदा प्रबंधन क्या है? अर्थ, प्रकार, 6 चरण, आवश्यकता व मुख्य सिद्धांत (MPPSC Notes)](${conceptUrl})`,
              },
            ],
          };
        }
      }
      return block;
    });

    await client.patch(id).set({ body: newBody }).commit();
    console.log(`✅ Fixed active links for: ${id}`);
  };

  await fixActDocs("ca-disaster-management-amendment-act-2025");
  await fixActDocs("gk-disaster-management-amendment-act-2025");

  // 2. Fix ca-what-is-disaster-management-ncert & gk-what-is-disaster-management-ncert
  const fixConceptDocs = async (id: string) => {
    const doc: any = await client.getDocument(id);
    if (!doc || !doc.body) return;

    const newBody = doc.body.map((block: any) => {
      if (block._type === "block") {
        const text = block.children?.map((c: any) => c.text).join("") || "";
        
        if (text.includes("नवीनतम कानून") || text.includes("अधिनियम, 2025")) {
          return {
            _type: "block",
            style: "normal",
            children: [
              {
                _type: "span",
                text: "👉 ",
              },
              {
                _type: "span",
                text: `[आपदा प्रबंधन (संशोधन) अधिनियम 2025: मुख्य विशेषताएँ, UDMA धारा 41A व महत्व](${actUrl})`,
              },
            ],
          };
        }
      }
      return block;
    });

    await client.patch(id).set({ body: newBody }).commit();
    console.log(`✅ Fixed active links for: ${id}`);
  };

  await fixConceptDocs("ca-what-is-disaster-management-ncert");
  await fixConceptDocs("gk-what-is-disaster-management-ncert");

  // Run the full add-seo-interlinking script as well to make sure all blocks are in place
  console.log("🔄 Re-applying full interlinking structure...");
  const addInterlinkingScript = require("./add-seo-interlinking");
  
  console.log("🌐 Triggering Vercel live cache revalidation...");
  try {
    const fetchRes = await fetch("https://www.aakarias.com/api/revalidate?secret=aakar-ias-revalidation-secret-key-2026&path=all");
    const json = await fetchRes.json();
    console.log("🔄 Revalidation output:", json);
  } catch (err) {
    console.warn("⚠️ Revalidation fetch failed:", err);
  }
}

main().catch((err) => {
  console.error("❌ Execution error:", err);
  process.exit(1);
});
