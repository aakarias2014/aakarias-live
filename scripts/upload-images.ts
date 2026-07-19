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
  console.log("📸 Uploading generated images to Sanity...");

  const images = {
    agriculture: "/Users/aakariastech/.gemini/antigravity-ide/brain/9bcd9b85-6334-460a-9d03-34c82dd94703/agriculture_field_1782216874288.png",
    digital_currency: "/Users/aakariastech/.gemini/antigravity-ide/brain/9bcd9b85-6334-460a-9d03-34c82dd94703/digital_currency_1782216890702.png",
    parliament: "/Users/aakariastech/.gemini/antigravity-ide/brain/9bcd9b85-6334-460a-9d03-34c82dd94703/indian_parliament_1782216905395.png",
  };

  // Upload agriculture field
  console.log("Uploading agriculture field...");
  const agAsset = await client.assets.upload("image", fs.createReadStream(images.agriculture), {
    filename: "agriculture_field.png",
  });
  console.log("✔ Uploaded Agriculture Image, ID:", agAsset._id);

  // Upload digital currency
  console.log("Uploading digital currency...");
  const dcAsset = await client.assets.upload("image", fs.createReadStream(images.digital_currency), {
    filename: "digital_currency.png",
  });
  console.log("✔ Uploaded Digital Currency Image, ID:", dcAsset._id);

  // Upload parliament
  console.log("Uploading parliament...");
  const plAsset = await client.assets.upload("image", fs.createReadStream(images.parliament), {
    filename: "indian_parliament.png",
  });
  console.log("✔ Uploaded Parliament Image, ID:", plAsset._id);

  // Update ca-pm-pranam
  console.log("Updating ca-pm-pranam article...");
  await client.patch("ca-pm-pranam")
    .set({
      featuredImage: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: agAsset._id,
        },
        alt: "Farmers in bright green agricultural fields",
      }
    })
    .commit();

  // Update ca-digital-rupee
  console.log("Updating ca-digital-rupee article...");
  await client.patch("ca-digital-rupee")
    .set({
      featuredImage: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: dcAsset._id,
        },
        alt: "Futuristic digital rupee CBDC concept illustration",
      }
    })
    .commit();

  // Update ed-federalism
  console.log("Updating ed-federalism editorial...");
  await client.patch("ed-federalism")
    .set({
      featuredImage: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: plAsset._id,
        },
        alt: "The new Indian Parliament building illuminated at twilight",
      }
    })
    .commit();

  // Update blog-tips
  console.log("Updating blog-tips post...");
  await client.patch("blog-tips")
    .set({
      featuredImage: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: plAsset._id,
        },
        alt: "Indian Parliament Building study atmosphere",
      }
    })
    .commit();

  console.log("✨ All images successfully uploaded and linked!");
}

main().catch(err => {
  console.error("❌ Error uploading/linking images:", err);
  process.exit(1);
});
