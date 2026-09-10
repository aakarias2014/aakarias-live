import { createClient } from "@sanity/client";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const {
  NEXT_PUBLIC_SANITY_PROJECT_ID: projectId,
  NEXT_PUBLIC_SANITY_DATASET: dataset,
  SANITY_API_WRITE_TOKEN: token,
} = process.env;

if (!projectId || !dataset || !token) {
  console.error("❌ Missing Sanity environment variables in .env.local!");
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
  console.log("🔗 Executing Bidirectional High-Trust SEO Interlinking for Pithora Painting Article...");

  const pithoraSlug = "pithora-painting-gi-tag-2026-rathwa-tribe-gujarat-mppsc-upsc-notes";
  const pithoraUrl = `/current-affairs/${pithoraSlug}`;

  // 1. Interlinking Block to insert into Pithora Painting Article
  const pithoraInterlinkBlockHi = [
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "🔗 संबंधित जीआई टैग, जनजातीय हस्तशिल्प एवं मध्य प्रदेश अध्ययन सामग्री (SEO Interlinking)" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        { _type: "span", text: "MPPSC एवं UPSC परीक्षा हेतु भौगोलिक संकेतक (GI Tags) और जनजातीय कला से जुड़े निम्नलिखित उच्च-अथॉरिटी लेख भी अवश्य पढ़ें:\n" },
        { _type: "span", text: `👉 [डॉ. रजनीकांत: भारत के 'GI मैन' एवं पद्म श्री सम्मान से सम्मानित GI विशेषज्ञ](${`/current-affairs/dr-rajnikant-gi-man-of-india-padma-shri-geographical-indication-mppsc-upsc-notes`})\n` },
        { _type: "span", text: `👉 [जबलपुर के मटर और सिंघाड़ा को मिला GI टैग 2026: नर्मदा घाटी की कृषि विरासत](${`/current-affairs/jabalpur-matar-singhada-gi-tag-2026`})\n` },
        { _type: "span", text: `👉 [मध्य प्रदेश की 4 आदिवासी फसलों एवं कृषि उत्पादों को GI टैग 2026: गोंड चावल व बाड़ी बाजरा](${`/current-affairs/mp-tribal-crops-gi-2026`})\n` },
        { _type: "span", text: `👉 [मध्यप्रदेश: बुरहानपुर के केले को मिला प्रतिष्ठित GI टैग](${`/current-affairs/burhanpur-banana-gi-tag`})\n` },
        { _type: "span", text: `👉 [राष्ट्रीय हथकरघा दिवस 2026: स्वदेशी आंदोलन व वस्त्र/हस्तशिल्प मंत्रालय की योजनाएं](${`/current-affairs/national-handloom-day-2026-swadeshi-movement-textiles-mppsc-upsc-notes`})\n` },
        { _type: "span", text: `👉 [एक जिला एक उत्पाद योजना (ODOP Scheme 2026): जनजातीय हस्तशिल्प एवं निर्यात प्रोत्साहन](${`/current-affairs/one-district-one-product-odop-scheme-2026-mppsc-upsc-notes`})` },
      ],
    },
  ];

  const pithoraInterlinkBlockEn = [
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "🔗 Related GI Tags, Tribal Art & Study Notes (SEO Interlinking)" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        { _type: "span", text: "Enhance your MPPSC & UPSC Civil Services preparation with these high-authority related articles:\n" },
        { _type: "span", text: `👉 [Dr. Rajnikant: 'GI Man of India' & Padma Shri Awardee for GI Registry Innovations](${`/current-affairs/dr-rajnikant-gi-man-of-india-padma-shri-geographical-indication-mppsc-upsc-notes`})\n` },
        { _type: "span", text: `👉 [Jabalpur Peas and Water Chestnut Secure GI Tags 2026](${`/current-affairs/jabalpur-matar-singhada-gi-tag-2026`})\n` },
        { _type: "span", text: `👉 [MP Tribal Crops GI Tag 2026: Gond Rice, Badi Bajra & Agricultural Heritage](${`/current-affairs/mp-tribal-crops-gi-2026`})\n` },
        { _type: "span", text: `👉 [Madhya Pradesh: Burhanpur Banana Receives Prestigious GI Tag](${`/current-affairs/burhanpur-banana-gi-tag`})\n` },
        { _type: "span", text: `👉 [National Handloom Day 2026: Swadeshi Movement & Textile Schemes](${`/current-affairs/national-handloom-day-2026-swadeshi-movement-textiles-mppsc-upsc-notes`})\n` },
        { _type: "span", text: `👉 [One District One Product (ODOP Scheme 2026): Tribal Handicrafts Promotion](${`/current-affairs/one-district-one-product-odop-scheme-2026-mppsc-upsc-notes`})` },
      ],
    },
  ];

  // Update Pithora Painting Document
  const pithoraDoc = await client.fetch(`*[_id == "ca-pithora-painting-gi-tag-2026"][0]`);
  if (pithoraDoc) {
    console.log("📝 Adding Interlinking Section to Pithora Painting Article...");
    const cleanBodyHi = (pithoraDoc.body || []).filter(
      (b: any) => !b.children?.[0]?.text?.includes("SEO Interlinking")
    );
    const cleanBodyEn = (pithoraDoc.bodyEn || []).filter(
      (b: any) => !b.children?.[0]?.text?.includes("SEO Interlinking")
    );

    // Insert interlink block before exam takeaways / section 10
    const insertIdxHi = cleanBodyHi.findIndex((b: any) => b.children?.[0]?.text?.includes("10. MPPSC"));
    if (insertIdxHi !== -1) {
      cleanBodyHi.splice(insertIdxHi, 0, ...pithoraInterlinkBlockHi);
    } else {
      cleanBodyHi.push(...pithoraInterlinkBlockHi);
    }

    const insertIdxEn = cleanBodyEn.findIndex((b: any) => b.children?.[0]?.text?.includes("10. Key Summary"));
    if (insertIdxEn !== -1) {
      cleanBodyEn.splice(insertIdxEn, 0, ...pithoraInterlinkBlockEn);
    } else {
      cleanBodyEn.push(...pithoraInterlinkBlockEn);
    }

    await client.patch("ca-pithora-painting-gi-tag-2026")
      .set({ body: cleanBodyHi, bodyEn: cleanBodyEn })
      .commit();
    console.log("✅ Updated Pithora Painting document with outbound interlinks!");
  }

  // 2. Reverse Interlinking: Add links pointing TO Pithora Painting in related articles
  const targetDocIds = [
    "ca-dr-rajnikant-gi-man-of-india",
    "ca-jabalpur-matar-singhada-gi-tag-2026",
    "ca-mp-tribal-crops-gi-2026",
    "ca-burhanpur-banana-gi-tag",
    "ca-national-handloom-day-2026",
    "ca-one-district-one-product-odop-scheme-2026",
  ];

  const reverseInterlinkBlockHi = [
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "🎨 नवीनतम जीआई टैग एवं जनजातीय कला अपडेट 2026 (Featured GI Tag)" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        { _type: "span", text: `👉 [पिथोरा पेंटिंग को मिला भौगोलिक संकेत (GI) टैग 2026: गुजरात की राठवा जनजाति की अनुष्ठानिक भित्ति कला, लखारा व बड़वा परंपरा एवं MPPSC/UPSC नोट्स](${pithoraUrl})` }
      ],
    },
  ];

  const reverseInterlinkBlockEn = [
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "🎨 Latest GI Tag & Tribal Art Update 2026 (Featured GI Tag)" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        { _type: "span", text: `👉 [Pithora Painting Awarded Geographical Indication (GI) Tag 2026: Gujarat Rathwa Tribal Ritual Wall Art & MPPSC/UPSC Notes](${pithoraUrl})` }
      ],
    },
  ];

  for (const docId of targetDocIds) {
    const doc = await client.fetch(`*[_id == $docId][0]`, { docId });
    if (!doc) {
      console.log(`⚠️ Document not found: ${docId}, skipping.`);
      continue;
    }

    const cleanBody = (doc.body || []).filter((b: any) => !b.children?.[0]?.text?.includes("पिथोरा पेंटिंग को मिला भौगोलिक संकेत"));
    const cleanBodyEn = (doc.bodyEn || []).filter((b: any) => !b.children?.[0]?.text?.includes("Pithora Painting Awarded Geographical Indication"));

    await client.patch(docId)
      .set({
        body: [...cleanBody, ...reverseInterlinkBlockHi],
        bodyEn: [...cleanBodyEn, ...reverseInterlinkBlockEn],
      })
      .commit();

    console.log(`✅ Successfully added reverse interlinking to target document: ${docId}`);
  }

  console.log("🎉 SUCCESS! Bidirectional High-Trust SEO Interlinking completed for Pithora Painting!");
}

main().catch((err) => {
  console.error("❌ Error performing interlinking:", err);
  process.exit(1);
});
