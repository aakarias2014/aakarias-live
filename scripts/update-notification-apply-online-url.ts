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
  console.log("🔗 Updating applyOnlineUrl across Notification documents in Sanity CMS...");

  const newApplyOnlineUrl = "https://esb.mponline.gov.in/Portal/Examinations/Vyapam/examsList.aspx";

  const targetDocIds = [
    "mp-police-constable-recruitment-2026",
    "mpsi-recruitment-2026",
    "mp-patwari-group-2-subgroup-4-bharti-2026",
  ];

  for (const docId of targetDocIds) {
    const doc = await client.fetch(`*[_id == $docId][0]`, { docId });
    if (!doc) {
      console.log(`⚠️ Document not found in Sanity: ${docId}, searching by slug...`);
      const docBySlug = await client.fetch(`*[_type == "notification" && slug.current == $docId][0]`, { docId });
      if (docBySlug) {
        await client.patch(docBySlug._id)
          .set({ applyOnlineUrl: newApplyOnlineUrl })
          .commit();
        console.log(`✅ Updated applyOnlineUrl for ${docBySlug._id} (by slug)`);
      }
      continue;
    }

    await client.patch(docId)
      .set({ applyOnlineUrl: newApplyOnlineUrl })
      .commit();
    console.log(`✅ Updated applyOnlineUrl for ${docId}`);
  }

  // Also update any other MPESB/Vyapam notifications in Sanity
  const allNotifications = await client.fetch(`*[_type == "notification"]`);
  console.log(`Found ${allNotifications.length} total notifications in Sanity.`);
  for (const n of allNotifications) {
    if (n.exam?.toLowerCase().includes("esb") || n.exam?.toLowerCase().includes("police") || n.title?.toLowerCase().includes("mp")) {
      await client.patch(n._id)
        .set({ applyOnlineUrl: newApplyOnlineUrl })
        .commit();
      console.log(`✅ Updated MP notification: ${n._id}`);
    }
  }

  console.log("🎉 SUCCESS! Online Application Portal URL updated to esb.mponline.gov.in!");
}

main().catch((err) => {
  console.error("❌ Error updating applyOnlineUrl:", err);
  process.exit(1);
});
