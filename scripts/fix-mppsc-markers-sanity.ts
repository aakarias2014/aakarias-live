import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "pnc4agic",
  dataset: "production321",
  token: "skMxhNrkeT5w1uVLqfPq5Nl0u5zFudQZ5hhquH0XvroVCqS6tc13u2SUmmOXzoigpPzdyyPXeP6vcZnoJCjCpwPBid1aZmcNgOWsXmkoJ0HZlVG4v0MCTfMIny0H8rvVv0CYmO1qpsjIugnrYGf8196GWMBXdv9V3FoeeF5SJbvXfFRhPJu3",
  apiVersion: "2024-10-01",
  useCdn: false,
});

async function main() {
  console.log("Fetching all documents from Sanity CMS...");
  const docs = await client.fetch<any[]>(`*[_type in ["article", "currentAffairs", "staticGk", "editorial", "blog"]]`);

  for (const doc of docs) {
    let jsonStr = JSON.stringify(doc);

    let updatedJson = jsonStr
      .replace(/3, 5 एवं 11 अंक/g, "2, 7 एवं 10 अंक")
      .replace(/3, 5 व 11 अंक/g, "2, 7 व 10 अंक")
      .replace(/3, 5, 11 marks/g, "2, 7, 10 marks")
      .replace(/3, 5, 11/g, "2, 7, 10")
      .replace(/3 अंक \(अति लघुत्तरीय\), 5 अंक \(लघुत्तरीय\) और 11 अंक \(दीर्घ उत्तरीय\)/g, "2 अंक (अति लघुत्तरीय), 7 अंक (लघुत्तरीय) और 10 अंक (दीर्घ उत्तरीय)")
      .replace(/3, 5 एवं 11 अंकीय/g, "2, 7 एवं 10 अंकीय")
      .replace(/5 व 11 अंकों/g, "7 व 10 अंकों")
      .replace(/3, 5 व 11 अंकों/g, "2, 7 व 10 अंकों")
      .replace(/3-Marker/g, "2-Marker")
      .replace(/5-Marker/g, "7-Marker")
      .replace(/11-Marker/g, "10-Marker")
      .replace(/3-mark/g, "2-mark")
      .replace(/5-mark/g, "7-mark")
      .replace(/11-mark/g, "10-mark")
      .replace(/3-marks/g, "2-marks")
      .replace(/5-marks/g, "7-marks")
      .replace(/11-marks/g, "10-marks")
      .replace(/प्रश्न 1 \(3 अंक\)/g, "प्रश्न 1 (2 अंक)")
      .replace(/प्रश्न 2 \(5 अंक\)/g, "प्रश्न 2 (7 अंक)")
      .replace(/प्रश्न 3 \(11 अंक\)/g, "प्रश्न 3 (10 अंक)");

    if (updatedJson !== jsonStr) {
      const updatedDoc = JSON.parse(updatedJson);
      delete updatedDoc._createdAt;
      delete updatedDoc._updatedAt;
      delete updatedDoc._rev;

      console.log(`Updating document ${doc._id} (${doc.title || doc.slug?.current}) in Sanity...`);
      await client.createOrReplace(updatedDoc);
      console.log(`Updated ${doc._id}!`);
    }
  }

  console.log("Sanity CMS sync complete!");
}

main().catch(console.error);
