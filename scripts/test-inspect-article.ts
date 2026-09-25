import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

import { getContentRepository } from "../src/lib/content/content-repository";

async function main() {
  const repo = await getContentRepository();
  const art = await repo.getArticle("asian-games-2026-10m-air-rifle-india-medals-himanshu-dhillon-rudrankksh-patil", "hi");
  console.log("Article Title:", art?.title);
  console.log("Sections count:", art?.sections?.length);
  const sec0 = art?.sections?.[0];
  console.log("Section 0 blocks:", JSON.stringify(sec0?.blocks, null, 2));
}

main().catch(console.error);
