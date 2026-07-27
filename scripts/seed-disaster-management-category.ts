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
  console.log("🌱 Creating 'Disaster Management' (आपदा प्रबंधन) subject category in Sanity...");

  const categoryDoc = {
    _id: "cat-disaster-management",
    _type: "category",
    slug: { _type: "slug", current: "disaster-management" },
    title: "आपदा प्रबंधन",
    titleEn: "Disaster Management",
    description: "MPPSC GS Paper 3 (Unit 5), GS Paper 4 Part B (Unit 3) एवं UPSC परीक्षाओं हेतु आपदा प्रबंधन, अधिनियम 2025, NDMA, SDMA, UDMA, चक्रवात, बाढ़ व शमन रणनीतियों पर अद्यतन अध्ययन सामग्री।",
    descriptionEn: "Comprehensive notes and updates on Disaster Management, Disaster Management Amendment Act 2025, NDMA, SDMA, UDMA, urban floods, climate resilience, and disaster risk reduction for MPPSC & UPSC.",
    color: { hex: "#f97316" }, // Amber/Orange
    icon: "shield-alert",
  };

  console.log("Saving category to Sanity CMS:", categoryDoc.titleEn);
  await client.createOrReplace(categoryDoc);

  console.log("🔄 Updating Current Affairs document 'ca-disaster-management-amendment-act-2025' category reference...");
  await client
    .patch("ca-disaster-management-amendment-act-2025")
    .set({
      category: { _type: "reference", _ref: "cat-disaster-management" },
    })
    .commit();

  // Also create a staticGk version so it appears in Static GK under Disaster Management subject tab
  console.log("📝 Creating Static GK version 'gk-disaster-management-amendment-act-2025'...");
  const caDoc: any = await client.getDocument("ca-disaster-management-amendment-act-2025");

  if (caDoc) {
    const gkDoc = {
      ...caDoc,
      _id: "gk-disaster-management-amendment-act-2025",
      _type: "staticGk",
      category: { _type: "reference", _ref: "cat-disaster-management" },
      slug: { _type: "slug", current: "disaster-management-amendment-act-2025-mppsc-upsc-notes" },
    };
    delete gkDoc._createdAt;
    delete gkDoc._updatedAt;
    delete gkDoc._rev;

    await client.createOrReplace(gkDoc);
    console.log("✅ Static GK document created/replaced successfully!");
  }

  console.log("🌐 Triggering live Vercel cache revalidation...");
  try {
    const fetchRes = await fetch("https://www.aakarias.com/api/revalidate?secret=aakar-ias-revalidation-secret-key-2026&path=all");
    const json = await fetchRes.json();
    console.log("🔄 Revalidation output:", json);
  } catch (err) {
    console.warn("⚠️ Revalidation fetch failed:", err);
  }
}

main().catch((err) => {
  console.error("❌ Error running script:", err);
  process.exit(1);
});
