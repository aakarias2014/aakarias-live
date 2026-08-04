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
  console.log("🔗 Adding Rich Two-Way SEO Interlinking to Ramsar Sites & Environment Articles...");

  const ramsarUrl = "/current-affairs/ramsar-sites-in-india";
  const forestReportUrl = "/current-affairs/global-forest-goals-report-2026-sdg-india-rank-mppsc-upsc-notes";
  const mpGiUrl = "/current-affairs/mp-tribal-crops-gi-2026";
  const disasterUrl = "/current-affairs/disaster-management-amendment-act-2025-mppsc-upsc-notes";
  const bioFertilizerUrl = "/general-awareness/bio-fertilizers-types-benefits-soil-fertility-ncert-mppsc-notes";

  // 1. Add Interlinking Section inside all Ramsar Documents
  const ramsarDocIds = [
    "ca-ramsar-sites-in-india-2026",
    "ca-ramsar-sites-in-india-2026-seo",
    "ca-ramsar-sites-in-india-short",
    "ca-ramsar-sites-in-india"
  ];

  const interlinkBlockHi = [
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "🔗 संबंधित पर्यावरण, पारिस्थितिकी एवं मध्य प्रदेश अध्ययन सामग्री (SEO Interlinking)" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        { _type: "span", text: "MPPSC एवं UPSC परीक्षा की तैयारी को और अधिक सुदृढ़ बनाने के लिए निम्नलिखित संबंधित पर्यावरण एवं मध्य प्रदेश करेंट अफेयर्स लेख भी पढ़ें:\n" },
        { _type: "span", text: `👉 [वैश्विक वन लक्ष्य रिपोर्ट 2026 (Global Forest Goals Report 2026): 4 करोड़ हे. वन क्षरण, भारत SDG 94वाँ स्थान व CAMPA एक्ट](${forestReportUrl})\n` },
        { _type: "span", text: `👉 [मध्य प्रदेश की 4 आदिवासी फसलों एवं कृषि उत्पादों को GI टैग 2026: गोंड चावल, बाड़ी बाजरा व MPPSC नोट्स](${mpGiUrl})\n` },
        { _type: "span", text: `👉 [आपदा प्रबंधन (संशोधन) अधिनियम 2025: NCMC, UDMA धारा 41A एवं पर्यावरण सुरक्षा नियम](${disasterUrl})\n` },
        { _type: "span", text: `👉 [जैव उर्वरक एवं मृदा पारिस्थितिकी (Bio-fertilizers NCERT GK Notes)](${bioFertilizerUrl})` },
      ],
    },
  ];

  const interlinkBlockEn = [
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "🔗 Related Environment & MP Study Notes (SEO Interlinking)" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        { _type: "span", text: "Explore key related study notes for MPPSC & UPSC Civil Services Preparation:\n" },
        { _type: "span", text: `👉 [UNFF Global Forest Goals Report 2026: Forest Loss, India SDG 94th Rank & Green India Mission](${forestReportUrl})\n` },
        { _type: "span", text: `👉 [MP Tribal Crops GI Tag 2026: Agricultural Heritage & MPPSC Notes](${mpGiUrl})\n` },
        { _type: "span", text: `👉 [Disaster Management Amendment Act 2025: UDMA Section 41A & Governance](${disasterUrl})\n` },
        { _type: "span", text: `👉 [Bio-fertilizers and Sustainable Soil Ecology NCERT GK Notes](${bioFertilizerUrl})` },
      ],
    },
  ];

  for (const docId of ramsarDocIds) {
    const doc = await client.fetch(`*[_id == $docId][0]`, { docId });
    if (!doc) continue;

    // Filter out previous interlink block if any
    const cleanBody = (doc.body || []).filter((b: any) => !b.children?.[0]?.text?.includes("संबंधित पर्यावरण, पारिस्थितिकी"));
    const cleanBodyEn = (doc.bodyEn || []).filter((b: any) => !b.children?.[0]?.text?.includes("Related Environment & MP"));

    // Insert interlink block before exam takeaways / FAQs
    const insertIdx = cleanBody.findIndex((b: any) => b.children?.[0]?.text?.includes("MPPSC एवं UPSC परीक्षा हेतु महत्वपूर्ण"));
    const splitAt = insertIdx !== -1 ? insertIdx : cleanBody.length - 1;

    const newBody = [
      ...cleanBody.slice(0, splitAt),
      ...interlinkBlockHi,
      ...cleanBody.slice(splitAt)
    ];

    const insertIdxEn = cleanBodyEn.findIndex((b: any) => b.children?.[0]?.text?.includes("Syllabus Interlinking"));
    const splitAtEn = insertIdxEn !== -1 ? insertIdxEn : cleanBodyEn.length - 1;

    const newBodyEn = [
      ...cleanBodyEn.slice(0, splitAtEn),
      ...interlinkBlockEn,
      ...cleanBodyEn.slice(splitAtEn)
    ];

    await client.patch(docId).set({ body: newBody, bodyEn: newBodyEn }).commit();
    console.log(`✅ Successfully added interlinking section to Ramsar document: ${docId}`);
  }

  // 2. Reverse Interlinking: Add Ramsar Sites links into Global Forest Goals Report 2026 article
  const forestDoc = await client.fetch(`*[_id == "ca-global-forest-goals-report-2026"][0]`);
  if (forestDoc) {
    const hasRamsarLink = forestDoc.body?.some((b: any) => b.children?.some((c: any) => c.text && c.text.includes("रामसर स्थल")));
    if (!hasRamsarLink) {
      const reverseInterlinkHi = {
        _type: "block",
        style: "normal",
        children: [
          { _type: "span", text: "📌 " },
          { _type: "span", marks: ["strong"], text: "संबंधित महत्वपूर्ण अध्ययन सामग्री: " },
          { _type: "span", text: `[भारत में रामसर स्थल 2026: राज्यवार संपूर्ण सूची, 101वाँ स्थल ग्लाव झील, मध्य प्रदेश के 5 स्थल व 8 MCQs](${ramsarUrl})` },
        ],
      };
      const newForestBody = [...(forestDoc.body || []), reverseInterlinkHi];
      await client.patch("ca-global-forest-goals-report-2026").set({ body: newForestBody }).commit();
      console.log("✅ Reverse SEO interlink added to Global Forest Goals Report 2026 article!");
    }
  }

  console.log("✨ All two-way SEO interlinking updates completed successfully!");
}

main().catch((err) => {
  console.error("❌ Error running interlinking:", err);
  process.exit(1);
});
