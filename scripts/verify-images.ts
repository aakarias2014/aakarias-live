import { getContentRepository } from "../src/lib/content/content-repository";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

async function main() {
  const repo = await getContentRepository();
  const featured = await repo.getFeatured("hi", undefined, 1);
  console.log("Featured Article:", JSON.stringify(featured, null, 2));

  const latest = await repo.listArticles({ locale: "hi", page: 1, pageSize: 6 });
  console.log("\nLatest Articles Images:");
  latest.items.forEach(i => {
    console.log(`- ${i.title}: ${i.featuredImage ? i.featuredImage.url : 'No image'}`);
  });
}

main().catch(console.error);
