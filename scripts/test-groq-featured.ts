import { sanityFetch } from "../src/lib/sanity/fetch";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

async function main() {
  const slug = "dr-ms-swaminathan-father-of-green-revolution-mppsc-upsc-notes";
  const featuredImageProjection = `{
    "assetRef": asset._ref,
    alt, caption, credit
  }`;

  const query = `*[_type == "staticGk" && slug.current == $slug][0]{
    _id,
    title,
    featuredImage,
    "projectedImage": coalesce(featuredImage, mainImage) ${featuredImageProjection}
  }`;

  const res = await sanityFetch<any>({ query, params: { slug }, revalidate: 0 });
  console.log("RESULT:", JSON.stringify(res, null, 2));
}

main().catch(console.error);
