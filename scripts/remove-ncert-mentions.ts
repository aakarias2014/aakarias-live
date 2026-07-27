import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import path from "path";

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
  console.log("🧹 Removing 'NCERT' keywords from titles, headings, meta descriptions and body text...");

  const cleanDoc = async (id: string) => {
    const doc: any = await client.getDocument(id);
    if (!doc) return;

    const newTitle = "आपदा प्रबंधन क्या है? अर्थ, प्रकार, चरण, आवश्यकता व मुख्य सिद्धांत | MPPSC & UPSC Notes";
    const newTitleEn = "What is Disaster Management: Concept, Types, Cycle, Emergency Preparedness & Key Facts | MPPSC & UPSC";
    const newExcerpt = "आपदा प्रबंधन (Disaster Management) की अवधारणा, प्राकृतिक एवं मानव निर्मित आपदाओं का वर्गीकरण, आपदा प्रबंधन चक्र, आवश्यकता, पूर्व तैयारी एवं सुरक्षात्मक उपाय। MPPSC Mains GS Paper 3 हेतु सम्पूर्ण नोट्स।";
    const newExcerptEn = "Comprehensive guide on Disaster Management concept. Covers definition, natural vs manmade disasters, disaster management cycle, emergency preparedness, safety kit, and NDMA framework for MPPSC and UPSC exams.";
    const newSeoTitle = "आपदा प्रबंधन क्या है? अर्थ, प्रकार, चक्र व मुख्य सिद्धांत | MPPSC & UPSC";
    const newSeoDescription = "आपदा प्रबंधन (Disaster Management in Hindi): आपदा का अर्थ, प्राकृतिक व मानव निर्मित आपदाएँ, 6 प्रमुख चरण, आपातकालीन किट, आवश्यकता एवं MPPSC Mains Paper 3 हेतु 8 MCQs व FAQs।";

    // Clean body text blocks
    const newBody = doc.body.map((block: any) => {
      if (block._type === "block") {
        const cleanChildren = block.children.map((child: any) => {
          let text = child.text || "";
          text = text.replace(/राष्ट्रीय शैक्षिक अनुसंधान और प्रशिक्षण परिषद \(NCERT\)/g, "राष्ट्रीय आपदा प्रबंधन मानकों");
          text = text.replace(/NCERT पाठ्य सामग्री \(भाग 1\) के अनुसार/g, "विषय-विशेषज्ञों एवं मानक अध्ययन सामग्री के अनुसार");
          text = text.replace(/\(NCERT डेटा\)/g, "(मानक वर्गीकरण)");
          text = text.replace(/\(NCERT Definition\)/g, "(Definition & Concept)");
          text = text.replace(/\(NCERT Data\)/g, "(Natural & Man-made)");
          text = text.replace(/\(NCERT Safety Guidelines\)/g, "(Emergency Preparedness & Safety)");
          text = text.replace(/NCERT के अनुसार/g, "मानक आपदा प्रबंधन सिद्धांतों के अनुसार");
          text = text.replace(/NCERT/g, "");
          return { ...child, text };
        });
        return { ...block, children: cleanChildren };
      }
      return block;
    });

    // Clean FAQs
    const newFaqs = (doc.faqs || []).map((faq: any) => ({
      question: (faq.question || "").replace(/NCERT/g, ""),
      answer: (faq.answer || "").replace(/NCERT के अनुसार/g, "आपदा प्रबंधन सिद्धांतों के अनुसार").replace(/NCERT/g, ""),
    }));

    await client
      .patch(id)
      .set({
        title: newTitle,
        titleEn: newTitleEn,
        excerpt: newExcerpt,
        excerptEn: newExcerptEn,
        seoTitle: newSeoTitle,
        seoDescription: newSeoDescription,
        body: newBody,
        faqs: newFaqs,
      })
      .commit();

    console.log(`✅ Cleaned doc: ${id}`);
  };

  await cleanDoc("gk-what-is-disaster-management-ncert");
  await cleanDoc("ca-what-is-disaster-management-ncert");

  // Clean reverse interlinking heading in Amendment 2025 articles
  console.log("🧹 Cleaning reverse interlinking blocks in Amendment 2025 articles...");
  const cleanInterlinking = async (id: string) => {
    const doc: any = await client.getDocument(id);
    if (!doc || !doc.body) return;

    const newBody = doc.body.map((block: any) => {
      if (block._type === "block") {
        const cleanChildren = block.children.map((child: any) => {
          let text = child.text || "";
          text = text.replace(/NCERT नोट्स/g, "मुख्य सिद्धांत");
          text = text.replace(/NCERT डेटा/g, "मानक डेटा");
          text = text.replace(/NCERT/g, "");
          return { ...child, text };
        });
        return { ...block, children: cleanChildren };
      }
      return block;
    });

    await client.patch(id).set({ body: newBody }).commit();
    console.log(`✅ Interlinking cleaned for: ${id}`);
  };

  await cleanInterlinking("ca-disaster-management-amendment-act-2025");
  await cleanInterlinking("gk-disaster-management-amendment-act-2025");

  console.log("🌐 Triggering Vercel live cache revalidation...");
  try {
    const fetchRes = await fetch("https://www.aakarias.com/api/revalidate?secret=aakar-ias-revalidation-secret-key-2026&path=all");
    const json = await fetchRes.json();
    console.log("🔄 Revalidation output:", json);
  } catch (err) {
    console.warn("⚠️ Revalidation fetch failed:", err);
  }
}

main().catch((err) => {
  console.error("❌ Execution error:", err);
  process.exit(1);
});
