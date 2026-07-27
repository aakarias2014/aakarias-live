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
  console.log("🔗 Adding rich SEO interlinking blocks to Disaster Management articles in Sanity CMS...");

  const conceptUrl = "/general-awareness/what-is-disaster-management-ncert-types-mppsc-notes";
  const actUrl = "/current-affairs/disaster-management-amendment-act-2025-mppsc-upsc-notes";

  // 1. Update Concept Articles (ca-what-is-disaster-management-ncert & gk-what-is-disaster-management-ncert)
  const updateConceptDoc = async (id: string) => {
    const doc: any = await client.getDocument(id);
    if (!doc || !doc.body) return;

    // Filter out existing interlink blocks if any, then insert structured interlink block
    const filteredBody = doc.body.filter(
      (b: any) => !(b._type === "block" && b.children && b.children.some((c: any) => c.text && c.text.includes("नवीनतम कानून: आपदा प्रबंधन (संशोधन) अधिनियम, 2025")))
    );

    const interlinkBlock = [
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "4. भारत में नवीन कानून: आपदा प्रबंधन (संशोधन) अधिनियम, 2025" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "भारत में वर्ष 2005 के मूल आपदा प्रबंधन अधिनियम को और अधिक आधुनिक बनाने एवं शहरी आपदाओं से प्रभावी ढंग से निपटने के लिए नया संशोधन पारित किया गया है। इसके अंतर्गत राष्ट्रपति स्वीकृति (29 मार्च 2025) तथा 9 अप्रैल 2025 से लागू नए प्रावधानों, UDMA (धारा 41A) एवं NCMC व HLC के वैधानिक दर्जे की विस्तृत समीक्षा पढ़ें:\n👉 ",
          },
          {
            _type: "span",
            text: `[आपदा प्रबंधन (संशोधन) अधिनियम 2025: मुख्य प्रावधान, UDMA धारा 41A व MPPSC Notes](${actUrl})`,
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
            text: "संबंधित अध्ययन सामग्री: ",
          },
          {
            _type: "span",
            text: `[आपदा प्रबंधन अधिनियम 2025 के सभी महत्वपूर्ण तथ्य एवं MPPSC Mains उत्तर लेखन हेतु निर्देश](${actUrl})`,
          },
        ],
      },
    ];

    // Find insertion index before exam takeaways or append
    const insertIdx = filteredBody.findIndex(
      (b: any) => b.style === "h3" && b.children && b.children.some((c: any) => c.text && c.text.includes("MPPSC & UPSC परीक्षा"))
    );

    let newBody;
    if (insertIdx !== -1) {
      newBody = [...filteredBody.slice(0, insertIdx), ...interlinkBlock, ...filteredBody.slice(insertIdx)];
    } else {
      newBody = [...filteredBody, ...interlinkBlock];
    }

    await client.patch(id).set({ body: newBody }).commit();
    console.log(`✅ SEO Interlinking updated for concept doc: ${id}`);
  };

  await updateConceptDoc("ca-what-is-disaster-management-ncert");
  await updateConceptDoc("gk-what-is-disaster-management-ncert");

  // 2. Update Act Articles (ca-disaster-management-amendment-act-2025 & gk-disaster-management-amendment-act-2025)
  const updateActDoc = async (id: string) => {
    const doc: any = await client.getDocument(id);
    if (!doc || !doc.body) return;

    const filteredBody = doc.body.filter(
      (b: any) => !(b._type === "block" && b.children && b.children.some((c: any) => c.text && c.text.includes("मूलभूत अवधारणा")))
    );

    const interlinkBlock = [
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "आपदा प्रबंधन की मूलभूत अवधारणा, प्रकार एवं चरण" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "2025 संशोधन अधिनियम को बेहतर ढंग से समझने के लिए आपदा प्रबंधन का मूल अर्थ, प्राकृतिक एवं मानव निर्मित आपदाओं का वर्गीकरण, आपदा प्रबंधन चक्र के 6 चरण तथा आपातकालीन किट (Emergency Kit) की जानकारी यहाँ पढ़ें:\n👉 ",
          },
          {
            _type: "span",
            text: `[आपदा प्रबंधन क्या है? अर्थ, प्रकार, 6 चरण, आवश्यकता व मुख्य सिद्धांत (MPPSC Notes)](${conceptUrl})`,
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
            text: "मूल अवधारणा नोट्स: ",
          },
          {
            _type: "span",
            text: `[प्राकृतिक व मानव निर्मित आपदाओं का वर्गीकरण एवं आपदा प्रबंधन चक्र (Disaster Management Cycle)](${conceptUrl})`,
          },
        ],
      },
    ];

    const insertIdx = filteredBody.findIndex(
      (b: any) => b.style === "h3" && b.children && b.children.some((c: any) => c.text && c.text.includes("MPPSC & UPSC परीक्षा"))
    );

    let newBody;
    if (insertIdx !== -1) {
      newBody = [...filteredBody.slice(0, insertIdx), ...interlinkBlock, ...filteredBody.slice(insertIdx)];
    } else {
      newBody = [...filteredBody, ...interlinkBlock];
    }

    await client.patch(id).set({ body: newBody }).commit();
    console.log(`✅ SEO Interlinking updated for Act doc: ${id}`);
  };

  await updateActDoc("ca-disaster-management-amendment-act-2025");
  await updateActDoc("gk-disaster-management-amendment-act-2025");

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
