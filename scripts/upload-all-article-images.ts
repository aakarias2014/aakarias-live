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
  console.log("📸 Uploading generated images to Sanity and linking them to articles...");

  const images = {
    passport: "/Users/aakariastech/.gemini/antigravity-ide/brain/538a1226-b8ad-4ed2-834d-b29823d879ed/indian_passport_1782475716761.png",
    banana: "/Users/aakariastech/.gemini/antigravity-ide/brain/538a1226-b8ad-4ed2-834d-b29823d879ed/burhanpur_banana_1782475731542.png",
    rupee: "/Users/aakariastech/.gemini/antigravity-ide/brain/538a1226-b8ad-4ed2-834d-b29823d879ed/digital_rupee_1782475750469.png",
    pranam: "/Users/aakariastech/.gemini/antigravity-ide/brain/538a1226-b8ad-4ed2-834d-b29823d879ed/pm_pranam_1782475763583.png",
    parliament: "/Users/aakariastech/.gemini/antigravity-ide/brain/538a1226-b8ad-4ed2-834d-b29823d879ed/indian_parliament_1782475779213.png",
  };

  // 1. Upload Passport Image
  console.log("Uploading passport image...");
  const passportAsset = await client.assets.upload("image", fs.createReadStream(images.passport), {
    filename: "indian_passport.png",
  });
  console.log("✔ Uploaded Passport Image, ID:", passportAsset._id);

  // 2. Upload Banana Image
  console.log("Uploading Burhanpur banana image...");
  const bananaAsset = await client.assets.upload("image", fs.createReadStream(images.banana), {
    filename: "burhanpur_banana.png",
  });
  console.log("✔ Uploaded Banana Image, ID:", bananaAsset._id);

  // 3. Upload Digital Rupee Image
  console.log("Uploading digital rupee image...");
  const rupeeAsset = await client.assets.upload("image", fs.createReadStream(images.rupee), {
    filename: "digital_rupee.png",
  });
  console.log("✔ Uploaded Rupee Image, ID:", rupeeAsset._id);

  // 4. Upload PM-PRANAM Image
  console.log("Uploading PM-PRANAM image...");
  const pranamAsset = await client.assets.upload("image", fs.createReadStream(images.pranam), {
    filename: "pm_pranam.png",
  });
  console.log("✔ Uploaded PM-PRANAM Image, ID:", pranamAsset._id);

  // 5. Upload Parliament Image
  console.log("Uploading parliament image...");
  const parliamentAsset = await client.assets.upload("image", fs.createReadStream(images.parliament), {
    filename: "indian_parliament.png",
  });
  console.log("✔ Uploaded Parliament Image, ID:", parliamentAsset._id);

  // --- Patching Articles ---

  // Update ca-indian-passport-citizenship
  console.log("Linking passport image to ca-indian-passport-citizenship...");
  await client.patch("ca-indian-passport-citizenship")
    .set({
      featuredImage: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: passportAsset._id,
        },
        alt: "Indian Passport with gold embossed State Emblem of India",
      }
    })
    .commit();

  // Update ca-burhanpur-banana-gi-tag
  console.log("Linking banana image to ca-burhanpur-banana-gi-tag...");
  await client.patch("ca-burhanpur-banana-gi-tag")
    .set({
      featuredImage: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: bananaAsset._id,
        },
        alt: "Fresh yellow Burhanpur bananas on a green banana leaf",
      }
    })
    .commit();

  // Update ca-digital-rupee
  console.log("Linking rupee image to ca-digital-rupee...");
  await client.patch("ca-digital-rupee")
    .set({
      featuredImage: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: rupeeAsset._id,
        },
        alt: "Futuristic digital rupee CBDC concept illustration",
      }
    })
    .commit();

  // Update ca-pm-pranam
  console.log("Linking PM-PRANAM image to ca-pm-pranam...");
  await client.patch("ca-pm-pranam")
    .set({
      featuredImage: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: pranamAsset._id,
        },
        alt: "Lush green agricultural fields in India representing PM-PRANAM",
      }
    })
    .commit();

  // Update ed-federalism
  console.log("Linking parliament image to ed-federalism...");
  await client.patch("ed-federalism")
    .set({
      featuredImage: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: parliamentAsset._id,
        },
        alt: "The Indian Parliament house in New Delhi under blue sky",
      }
    })
    .commit();

  console.log("✨ All images uploaded and linked successfully!");
}

main().catch(err => {
  console.error("❌ Error uploading and linking images:", err);
  process.exit(1);
});
