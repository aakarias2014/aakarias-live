import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import fs from "fs";
import path from "path";
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "pnc4agic",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production321",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
  apiVersion: "2024-01-01",
});

async function main() {
  console.log("🚀 Updating Ankit Kumar Chaturvedi faculty content & photo...");

  const photoPath = "/Users/aakariastech/.gemini/antigravity-ide/brain/e3878d1d-a66f-4a6d-84dd-b181a33cf548/media__1785839734391.png";
  if (!fs.existsSync(photoPath)) {
    throw new Error(`Photo file not found at: ${photoPath}`);
  }

  // 1. Save locally to public folder
  const publicDest = path.join(process.cwd(), "public", "images", "faculty", "ankit_kumar_chaturvedi.png");
  fs.mkdirSync(path.dirname(publicDest), { recursive: true });
  fs.copyFileSync(photoPath, publicDest);
  console.log(`✅ Saved local photo copy to: ${publicDest}`);

  // 2. Upload asset to Sanity CMS
  console.log("⬆ Uploading new faculty photo asset to Sanity CMS...");
  const imageStream = fs.createReadStream(photoPath);
  const asset = await client.assets.upload("image", imageStream, {
    filename: "ankit_kumar_chaturvedi_faculty.png",
    contentType: "image/png",
  });
  console.log(`✅ Uploaded photo asset to Sanity! Asset ID: ${asset._id}`);

  // 3. Patch the faculty document in Sanity CMS
  const docId = "Q6R6fi5q3GMXY7ysEuZkBR";
  const updatedDoc = {
    nameHi: "अंकित कुमार चतुर्वेदी",
    nameEn: "Ankit Kumar Chaturvedi",
    titleHi: "HOD - टेस्ट सीरीज़ व इंटरव्यू प्रोग्राम | फैकल्टी",
    titleEn: "HOD - Test Series, HOD - Interview Programme | Faculty",
    descEn: "Civil Services mentor with 8+ years of experience in guiding MPPSC and UPSC aspirants. He specializes in General Studies (culture, tribes, society), Answer Writing, Administrative Translation, and Interview Guidance. Known for his concept-based teaching and practical approach, he is dedicated to helping students achieve success in the Civil Services Examination.",
    descHi: "एमपीपीएससी (MPPSC) एवं यूपीएससी (UPSC) अभ्यर्थियों को मार्गदर्शन देने का 8+ वर्षों का अनुभव। वे सामान्य अध्ययन (संस्कृति, जनजातियाँ, समाज), उत्तर लेखन (Answer Writing), प्रशासनिक अनुवाद एवं साक्षात्कार मार्गदर्शन में विशेषज्ञ हैं। अपनी अवधारणा-आधारित शिक्षण शैली और व्यावहारिक दृष्टिकोण के लिए जाने जाने वाले, वे सिविल सेवा परीक्षा में छात्रों की सफलता के लिए समर्पित हैं।",
    medium: "hindi",
    image: {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: asset._id,
      },
    },
  };

  await client.patch(docId).set(updatedDoc).commit();
  console.log(`✨ Successfully updated Sanity faculty document: ${docId}`);

  // Also check if any other faculty doc exists with name Ankit
  const allAnkitDocs = await client.fetch(`*[_type == "faculty" && (nameHi match "*अंकित*" || nameEn match "*Ankit*")]{ _id }`);
  for (const doc of allAnkitDocs) {
    if (doc._id !== docId) {
      await client.patch(doc._id).set(updatedDoc).commit();
      console.log(`✨ Updated additional faculty document: ${doc._id}`);
    }
  }

  console.log("🎉 Faculty update complete!");
}

main().catch((err) => {
  console.error("❌ Update script failed:", err);
  process.exit(1);
});
