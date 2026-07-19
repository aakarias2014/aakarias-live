import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

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
  console.log("📸 Uploading both realistic images to Sanity...");

  const firstImagePath = "/Users/aakariastech/.gemini/antigravity-ide/brain/88da7c54-64f2-4b71-8cb1-fd9504f89743/vbg_ramg_rural_workers_1782898060648.png";
  const secondImagePath = "/Users/aakariastech/.gemini/antigravity-ide/brain/88da7c54-64f2-4b71-8cb1-fd9504f89743/vbg_ramg_employment_card_1782898112213.png";

  if (!fs.existsSync(firstImagePath) || !fs.existsSync(secondImagePath)) {
    console.error("❌ Image files do not exist at paths!");
    process.exit(1);
  }

  // Upload first image (Rural Workers)
  console.log("Uploading featured image (rural workers)...");
  const firstAsset = await client.assets.upload("image", fs.createReadStream(firstImagePath), {
    filename: "vbg_ramg_rural_workers.png",
  });
  console.log("✔ Uploaded featured image, ID:", firstAsset._id);

  // Upload second image (Employment Cards)
  console.log("Uploading inline image (employment cards)...");
  const secondAsset = await client.assets.upload("image", fs.createReadStream(secondImagePath), {
    filename: "vbg_ramg_employment_cards.png",
  });
  console.log("✔ Uploaded inline image, ID:", secondAsset._id);

  // Read existing article to preserve all other sections
  console.log("Fetching current article ca-vbg-ramg-act-2026...");
  const article: any = await client.getDocument("ca-vbg-ramg-act-2026");
  if (!article) {
    console.error("❌ Article not found!");
    process.exit(1);
  }

  // Update sections with inline images
  const updatedSections = article.sections.map((section: any) => {
    if (section.kind === "whyInNews") {
      return {
        ...section,
        body: [
          {
            _key: "b1",
            _type: "block",
            children: [
              {
                _key: "s1",
                _type: "span",
                text: "1 जुलाई 2026 से देश भर में नया ग्रामीण रोजगार कानून 'विकसित भारत-गारंटी फॉर रोजगार और आजीविका मिशन (ग्रामीण) कानून, 2025' (VB-G RAM G) लागू हो गया है। इस ऐतिहासिक कानून का राष्ट्रीय शुभारंभ 2 जुलाई 2026 को आंध्र प्रदेश के तिरुपति जिले के मुक्कावरिपल्ली गांव में किया जाएगा, जहां ग्रामीणों को नए रोजगार गारंटी कार्ड बांटे जाएंगे।",
              },
            ],
            style: "normal",
          },
          {
            _key: "b1-img",
            _type: "image",
            asset: {
              _type: "reference",
              _ref: secondAsset._id,
            },
            alt: "ग्रामीण महिलाओं द्वारा नए रोजगार गारंटी कार्ड का प्रदर्शन",
            caption: "मुक्कावरिपल्ली गांव में बांटे जा रहे नए ग्रामीण रोजगार गारंटी कार्ड",
          }
        ],
        bodyEn: [
          {
            _key: "b1",
            _type: "block",
            children: [
              {
                _key: "s1",
                _type: "span",
                text: "The new rural employment legislation, 'Viksit Bharat-Guarantee for Employment and Livelihood Mission (Rural) Act, 2025' (VB-G RAM G), has come into effect nationwide starting July 1, 2026. The national launch of this historic act is scheduled for July 2, 2026, in Mukkaparipalli village, Tirupati district, Andhra Pradesh, where new rural employment guarantee cards will be distributed to beneficiaries.",
              },
            ],
            style: "normal",
          },
          {
            _key: "b1-img-en",
            _type: "image",
            asset: {
              _type: "reference",
              _ref: secondAsset._id,
            },
            alt: "Empowered rural women showing their new employment guarantee cards",
            caption: "New Rural Employment Guarantee Cards being distributed to beneficiaries",
          }
        ]
      };
    }
    return section;
  });

  // Update article doc
  console.log("Updating article ca-vbg-ramg-act-2026...");
  await client.patch("ca-vbg-ramg-act-2026")
    .set({
      featuredImage: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: firstAsset._id,
        },
        alt: "Rural Indian workers building check dam under VB-G RAM G Act",
        caption: "जल संरक्षण के कार्यों में जुटे ग्रामीण कामगार (VB-G RAM G Act)",
      },
      sections: updatedSections,
    })
    .commit();

  console.log("✨ Both images successfully uploaded, linked, and embedded!");
}

main().catch((err) => {
  console.error("❌ Error during updates:", err);
  process.exit(1);
});
