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
  console.log("🔗 Starting Bidirectional Interlinking for Taxation & Financial Legislation Articles in Sanity CMS...");

  const taxBillUrl = "/current-affairs/taxation-and-other-laws-amendment-bill-2026-mppsc-notes";
  const taxBillTitle = "कराधान एवं अन्य विधियाँ (संशोधन) विधेयक 2026 (Taxation and Other Laws Amendment Bill 2026)";

  const incomeTaxDayUrl = "/current-affairs/income-tax-day-2026-mppsc-notes";
  const incomeTaxDayTitle = "आयकर दिवस (Income Tax Day 2026): 166वाँ आयकर दिवस एवं प्रत्यक्ष कर सुधार";

  const antiPaperLeakUrl = "/current-affairs/anti-paper-leak-bill-2026-mppsc-upsc-notes";
  const antiPaperLeakTitle = "लोक परीक्षा (अनुचित साधनों की रोकथाम) संशोधन विधेयक 2026 (Anti Paper Leak Bill 2026)";

  const fcraUrl = "/current-affairs/fcra-amendment-rules-2026-mppsc-notes";
  const fcraTitle = "विदेशी अंशदान (विनियमन) संशोधन नियम 2026 (FCRA Amendment Rules 2026)";

  // 1. Interlink block to insert into Taxation Bill 2026 document
  const interlinkBlockForTaxBill = {
    _key: "sec-related-finance-bills-interlink",
    kind: "keyAspects",
    title: "🔗 संबंधित वित्तीय एवं विधायी अध्ययन सामग्री (Related Financial Legislation Notes)",
    titleEn: "🔗 Related Financial Legislation & Policy Notes",
    body: [
      {
        _key: "b-il-1", _type: "block", style: "normal",
        children: [
          { _key: "s-il-1", _type: "span", text: "• **आयकर दिवस एवं कर सुधार**: " },
          { _key: "s-il-2", _type: "span", text: `[${incomeTaxDayTitle}](${incomeTaxDayUrl})` }
        ]
      },
      {
        _key: "b-il-2", _type: "block", style: "normal",
        children: [
          { _key: "s-il-3", _type: "span", text: "• **संसदीय संशोधन कानून 2026**: " },
          { _key: "s-il-4", _type: "span", text: `[${antiPaperLeakTitle}](${antiPaperLeakUrl})` }
        ]
      },
      {
        _key: "b-il-3", _type: "block", style: "normal",
        children: [
          { _key: "s-il-5", _type: "span", text: "• **विदेशी अंशदान एवं FII विनियम**: " },
          { _key: "s-il-6", _type: "span", text: `[${fcraTitle}](${fcraUrl})` }
        ]
      }
    ],
    bodyEn: [
      {
        _key: "b-il-7", _type: "block", style: "normal",
        children: [
          { _key: "s-il-7", _type: "span", text: "• **Income Tax Day & Direct Tax Reforms**: " },
          { _key: "s-il-8", _type: "span", text: `[${incomeTaxDayTitle}](${incomeTaxDayUrl})` }
        ]
      },
      {
        _key: "b-il-8", _type: "block", style: "normal",
        children: [
          { _key: "s-il-9", _type: "span", text: "• **Parliamentary Amendment Bills 2026**: " },
          { _key: "s-il-10", _type: "span", text: `[${antiPaperLeakTitle}](${antiPaperLeakUrl})` }
        ]
      }
    ]
  };

  // Update ca-taxation-and-other-laws-amendment-bill-2026 and gk-taxation-and-other-laws-amendment-bill-2026
  const updateTaxBillDoc = async (docId: string) => {
    const doc: any = await client.getDocument(docId);
    if (!doc) return;

    // Filter out existing interlink section if present
    const sections = (doc.sections || []).filter((s: any) => s._key !== "sec-related-finance-bills-interlink");
    sections.push(interlinkBlockForTaxBill);

    await client.patch(docId).set({ sections }).commit();
    console.log(`✔ Updated interlinking in ${docId}`);
  };

  await updateTaxBillDoc("ca-taxation-and-other-laws-amendment-bill-2026");
  await updateTaxBillDoc("gk-taxation-and-other-laws-amendment-bill-2026");

  // 2. Interlink Taxation Bill in Income Tax Day document
  const updateIncomeTaxDayDoc = async (docId: string) => {
    const doc: any = await client.getDocument(docId);
    if (!doc) return;

    const sections = doc.sections || [];
    const interlinkBlock = {
      _key: "sec-interlink-taxation-bill-2026",
      kind: "keyAspects",
      title: "🔗 नवीनतम कर सुधार विधेयक 2026 (Latest Tax Reform Bill)",
      titleEn: "🔗 Latest Tax Reform Legislation 2026",
      body: [
        {
          _key: "b-itd-1", _type: "block", style: "normal",
          children: [
            { _key: "s-itd-1", _type: "span", text: "• **संसद द्वारा पारित नया कराधान कानून**: " },
            { _key: "s-itd-2", _type: "span", text: `[${taxBillTitle}](${taxBillUrl})` }
          ]
        }
      ],
      bodyEn: [
        {
          _key: "b-itd-3", _type: "block", style: "normal",
          children: [
            { _key: "s-itd-3", _type: "span", text: "• **Latest Tax Amendment Passed by Parliament**: " },
            { _key: "s-itd-4", _type: "span", text: `[${taxBillTitle}](${taxBillUrl})` }
          ]
        }
      ]
    };

    const filteredSections = sections.filter((s: any) => s._key !== "sec-interlink-taxation-bill-2026");
    filteredSections.push(interlinkBlock);

    await client.patch(docId).set({ sections: filteredSections }).commit();
    console.log(`✔ Updated interlinking in ${docId}`);
  };

  await updateIncomeTaxDayDoc("ca-income-tax-day-2026");
  await updateIncomeTaxDayDoc("gk-income-tax-day-2026");

  console.log("✨ Successfully completed bidirectional SEO interlinking for Taxation Bill 2026!");
}

main().catch((err) => {
  console.error("❌ Error during interlinking:", err);
  process.exit(1);
});
