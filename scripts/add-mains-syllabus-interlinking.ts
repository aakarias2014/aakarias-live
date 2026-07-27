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
  console.log("🔗 Adding MPPSC Mains Syllabus interlinks to all Disaster Management articles in Sanity...");

  const mainsSyllabusUrl = "/mppsc/mains-syllabus";
  const prelimsSyllabusUrl = "/mppsc/prelims-syllabus";

  const addSyllabusLinks = async (id: string) => {
    const doc: any = await client.getDocument(id);
    if (!doc || !doc.body) return;

    // Remove existing syllabus blocks if any
    const filteredBody = doc.body.filter(
      (b: any) => !(b._type === "block" && b.children && b.children.some((c: any) => c.text && c.text.includes("MPPSC Mains Syllabus 2026")))
    );

    const syllabusBlock = [
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "MPPSC Mains Syllabus (Paper 3 Unit 5 & Paper 4 Part B)" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "MPPSC मुख्य परीक्षा पाठ्यक्रम 2026 के अनुसार आपदा प्रबंधन सामान्य अध्ययन III (विज्ञान, प्रौद्योगिकी व आपदा प्रबंधन) तथा सामान्य अध्ययन IV (दर्शनशास्त्र, मनोविज्ञान, लोक प्रशासन व प्रबंधन) का अनिवार्य भाग है। संपूर्ण पाठ्यक्रम का PDF यहाँ देखें:\n👉 ",
          },
          {
            _type: "span",
            text: `[MPPSC Mains Syllabus 2026 PDF Download in Hindi (Paper 1 to Paper 6)](${mainsSyllabusUrl})`,
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "📌 ",
          },
          {
            _type: "span",
            marks: ["strong"],
            text: "प्रारंभिक परीक्षा पाठ्यक्रम: ",
          },
          {
            _type: "span",
            text: `[MPPSC Prelims Syllabus 2026 PDF Free Download in Hindi](${prelimsSyllabusUrl})`,
          },
        ],
      },
    ];

    const newBody = [...filteredBody, ...syllabusBlock];
    await client.patch(id).set({ body: newBody }).commit();
    console.log(`✅ Mains Syllabus interlinking updated for: ${id}`);
  };

  await addSyllabusLinks("ca-disaster-management-amendment-act-2025");
  await addSyllabusLinks("gk-disaster-management-amendment-act-2025");
  await addSyllabusLinks("ca-what-is-disaster-management-ncert");
  await addSyllabusLinks("gk-what-is-disaster-management-ncert");

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
