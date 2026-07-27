import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

async function main() {
  const { getContentRepository } = await import("../src/lib/content/content-repository");
  const repo = await getContentRepository();
  const res = await repo.listArticles({ contentType: "currentAffairs", page: 1, pageSize: 6, locale: "hi" });
  console.log("CWG ARTICLES:");
  for (const item of res.items) {
    console.log(`- Slug: ${item.slug}`);
    console.log(`  Title: ${item.title}`);
    console.log(`  Featured Image URL: ${item.featuredImage?.url}`);
    console.log(`  Featured Image Alt: ${item.featuredImage?.alt}`);
  }
}

main().catch(console.error);
