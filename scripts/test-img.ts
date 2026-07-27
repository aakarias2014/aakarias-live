import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

async function main() {
  const { getContentRepository } = await import("../src/lib/content/content-repository");
  const repo = await getContentRepository();
  const res = await repo.listArticles({ contentType: "currentAffairs", page: 1, pageSize: 5, locale: "hi" });
  console.log("ITEMS:", JSON.stringify(res.items.map(i => ({ title: i.title, img: i.featuredImage })), null, 2));
}

main().catch(console.error);
