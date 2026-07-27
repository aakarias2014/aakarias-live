import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

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
  console.log("🚀 Syncing and updating featuredImage & active links on ALL Disaster Management documents...");

  const publicBlogDir = path.resolve(process.cwd(), "public/images/blog");
  const destImg = path.join(publicBlogDir, "disaster_management_act_2025_hero_thumbnail.png");

  console.log("⬆️ Uploading fresh hero image asset to Sanity CMS...");
  const asset = await client.assets.upload("image", fs.createReadStream(destImg), {
    filename: "disaster_management_act_2025_hero_thumbnail.png",
  });
  console.log(`✔ Asset ID: ${asset._id}`);

  const featuredImageObj = {
    _type: "image",
    asset: { _type: "reference", _ref: asset._id },
    alt: "NDRF Emergency Rescue Operation during Flood - Disaster Management Amendment Act 2025 Notes",
  };

  const conceptUrl = "/general-awareness/what-is-disaster-management-ncert-types-mppsc-notes";
  const actUrl = "/current-affairs/disaster-management-amendment-act-2025-mppsc-upsc-notes";
  const mainsUrl = "/mppsc/mains-syllabus";

  const ndmaAssetId = "image-cafdf2307b0ec91a044dee3d6b93817a88778fbb-1024x1024-jpg";

  // Build complete PortableText body for Disaster Management Amendment Act 2025
  const actBody = [
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "भारत प्राकृतिक आपदाओं जैसे भूकम्प, बाढ़, सूखा और चक्रवात के प्रति अत्यधिक संवेदनशील देश है। आपदा प्रबंधन को आधुनिक जलवायु चुनौतियों के अनुकूल बनाने और शहरी आपदाओं से प्रभावी ढंग से निपटने के लिए ",
        },
        {
          _type: "span",
          marks: ["strong"],
          text: "आपदा प्रबंधन अधिनियम, 2005 (Disaster Management Act, 2005)",
        },
        {
          _type: "span",
          text: " में एक ऐतिहासिक संशोधन किया गया है। ",
        },
        {
          _type: "span",
          marks: ["strong"],
          text: "आपदा प्रबंधन (संशोधन) अधिनियम, 2025 [The Disaster Management (Amendment) Act, 2025]",
        },
        {
          _type: "span",
          text: " को संसद द्वारा पारित किए जाने के बाद 29 मार्च, 2025 को राष्ट्रपति द्रौपदी मुर्मु द्वारा मंजूरी प्रदान की गई तथा यह 9 अप्रैल, 2025 से संपूर्ण भारत में लागू किया गया। MPPSC मुख्य परीक्षा (GS Paper 3 Unit 5 एवं GS Paper 4 Part B Unit 3) तथा UPSC मुख्य परीक्षा (GS Paper 3) के दृष्टिकोण से यह अधिनियम अत्यंत महत्वपूर्ण है।",
        },
      ],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "👉 ",
        },
        {
          _type: "span",
          text: `[आपदा प्रबंधन क्या है? अर्थ, प्रकार, 6 चरण, आवश्यकता व मुख्य सिद्धांत (MPPSC Notes)](${conceptUrl})`,
        },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "आपदा प्रबंधन (संशोधन) अधिनियम, 2025 की विधायी यात्रा एवं लागू होने की तिथि" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        { _type: "span", text: "• " },
        { _type: "span", marks: ["strong"], text: "राज्यसभा द्वारा पारित: " },
        { _type: "span", text: "25 मार्च, 2025 को ध्वनिमत से पारित किया गया।" },
      ],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        { _type: "span", text: "• " },
        { _type: "span", marks: ["strong"], text: "लोकसभा द्वारा पारित: " },
        { _type: "span", text: "27 मार्च, 2025 को लोकसभा ने अपनी स्वीकृति दी।" },
      ],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        { _type: "span", text: "• " },
        { _type: "span", marks: ["strong"], text: "राष्ट्रपति की स्वीकृति: " },
        { _type: "span", text: "29 मार्च, 2025 को राष्ट्रपति द्रौपदी मुर्मु ने मंजूरी प्रदान की।" },
      ],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        { _type: "span", text: "• " },
        { _type: "span", marks: ["strong"], text: "लागू होने की तिथि: " },
        { _type: "span", text: "9 अप्रैल, 2025 से संपूर्ण भारत में प्रभावी हो गया।" },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "संशोधन अधिनियम 2025 की मुख्य विशेषताएँ एवं नए प्रावधान (Key Features)" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        { _type: "span", text: "• " },
        { _type: "span", marks: ["strong"], text: "NDMA और SDMA का सशक्तीकरण: " },
        { _type: "span", text: "राष्ट्रीय आपदा प्रबंधन प्राधिकरण (NDMA) तथा राज्य आपदा प्रबंधन प्राधिकरण (SDMA) को योजनाएं तैयार करने का सीधा अधिकार दिया गया।" },
      ],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        { _type: "span", text: "• " },
        { _type: "span", marks: ["strong"], text: "शहरी आपदा प्रबंधन प्राधिकरण (UDMA - नई धारा 41A): " },
        { _type: "span", text: "राजधानियों एवं बड़े नगरों हेतु UDMA के गठन का अधिकार दिया गया। इसके लिए अधिनियम में नई धारा 41A जोड़ी गई।" },
      ],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        { _type: "span", text: "• " },
        { _type: "span", marks: ["strong"], text: "मौजूदा समितियों को वैधानिक दर्जा: " },
        { _type: "span", text: "राष्ट्रीय संकट प्रबंधन समिति (NCMC) और उच्च स्तरीय समिति (HLC) जैसी सलाहकार एवं समन्वय समितियों को वैधानिक दर्जा दिया गया।" },
      ],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        { _type: "span", text: "• " },
        { _type: "span", marks: ["strong"], text: "जलवायु जोखिम आकलन: " },
        { _type: "span", text: "समय-समय पर आपदा जोखिम आकलन और जलवायु परिवर्तन के प्रभावों को आपदा योजनाओं में एकीकृत करने का दायित्व सौंपा गया।" },
      ],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        { _type: "span", text: "• " },
        { _type: "span", marks: ["strong"], text: "राष्ट्रीय और राज्य आपदा डेटाबेस: " },
        { _type: "span", text: "जोखिम आकलन, शमन रणनीतियों और त्वरित तैयारियों की निगरानी हेतु व्यापक डेटाबेस तैयार करना अनिवार्य किया गया।" },
      ],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        { _type: "span", text: "• " },
        { _type: "span", marks: ["strong"], text: "आपदा पश्चात लेखा परीक्षण (Post-Disaster Audit): " },
        { _type: "span", text: "NDMA को यह अधिकार दिया गया है कि वह आपदा के बाद तैयारियों और राहत कार्यों की प्रभावशीलता का ऑडिट कर सके।" },
      ],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        { _type: "span", text: "• " },
        { _type: "span", marks: ["strong"], text: "राज्य आपदा प्रतिक्रिया बल (SDRF): " },
        { _type: "span", text: "संशोधन राज्यों को अपना स्वयं का SDRF गठित करने का स्पष्ट अधिकार देता है।" },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "आपदा प्रबंधन (संशोधन) अधिनियम, 2025 का महत्व (Significance)" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        { _type: "span", text: "• " },
        { _type: "span", marks: ["strong"], text: "समग्र दृष्टिकोण: " },
        { _type: "span", text: "आपदा प्रबंधन को प्रतिक्रियात्मक राहत मॉडल से सक्रिय जोखिम निम्नीकरण एवं आपदा रोधी मॉडल की ओर ले जाता है।" },
      ],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        { _type: "span", text: "• " },
        { _type: "span", marks: ["strong"], text: "जलवायु अनुकूलन को मुख्यधारा में लाना: " },
        { _type: "span", text: "जलवायु परिवर्तन को विकास योजनाओं के साथ एकीकृत करना सुनिश्चित करता है।" },
      ],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        { _type: "span", text: "• " },
        { _type: "span", marks: ["strong"], text: "वैश्विक नेतृत्व: " },
        { _type: "span", text: "सेंडाई फ्रेमवर्क (Sendai Framework 2015-2030) के तहत भारत को विकासशील देशों के बीच जलवायु जोखिम प्रबंधन में अग्रणी स्थान दिलाता है।" },
      ],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        { _type: "span", text: "• " },
        { _type: "span", marks: ["strong"], text: "दृढ़ स्थानीय सुरक्षात्मक शासन: " },
        { _type: "span", text: "नगरपालिकाओं और पंचायतों को प्रथम प्रतिक्रियाकर्ता के रूप में सशक्त बनाना।" },
      ],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        { _type: "span", text: "• " },
        { _type: "span", marks: ["strong"], text: "बेहतर तालमेल: " },
        { _type: "span", text: "NCMC जैसी संस्थाओं को कानूनी दर्जा प्रदान कर केंद्र और राज्यों के बीच आपसी समन्वय मजबूत करता है।" },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "कार्यान्वयन से जुड़ी प्रमुख चुनौतियाँ (Challenges)" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        { _type: "span", text: "• " },
        { _type: "span", marks: ["strong"], text: "क्षमता की कमी: " },
        { _type: "span", text: "पंचायतों और स्थानीय निकायों में जलवायु जोखिम रजिस्टर तैयार करने हेतु विशेषज्ञों का अभाव।" },
      ],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        { _type: "span", text: "• " },
        { _type: "span", marks: ["strong"], text: "वित्तीय बाधाएँ: " },
        { _type: "span", text: "योजनाओं के निर्माण, क्रियान्वयन व सतत निगरानी हेतु पर्याप्त आवंटन न होना।" },
      ],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        { _type: "span", text: "• " },
        { _type: "span", marks: ["strong"], text: "डेटा अभाव: " },
        { _type: "span", text: "जिला व ब्लॉक स्तर पर उच्च रिज़ॉल्यूशन जलवायु एवं आपदा डेटा का सीमित मात्रा में उपलब्ध होना।" },
      ],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        { _type: "span", text: "• " },
        { _type: "span", marks: ["strong"], text: "शहरी नियोजन सम्बन्धी मुद्दे: " },
        { _type: "span", text: "बाढ़ क्षेत्रों एवं तटीय क्षेत्रों में अवैध व अनियंत्रित निर्माण।" },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "MPPSC Mains Syllabus 2026 इंटरलिंकिंग" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "👉 ",
        },
        {
          _type: "span",
          text: `[MPPSC Mains Syllabus 2026 PDF Download in Hindi (Paper 1 to Paper 6)](${mainsUrl})`,
        },
      ],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "📌 ",
        },
        {
          _type: "span",
          marks: ["strong"],
          text: "मूल अवधारणा नोट्स: ",
        },
        {
          _type: "span",
          text: `[आपदा प्रबंधन क्या है? अर्थ, प्रकार, 6 चरण, आवश्यकता व मुख्य सिद्धांत (MPPSC Notes)](${conceptUrl})`,
        },
      ],
    },
  ];

  const updateDoc = async (id: string) => {
    console.log(`🔄 Updating doc: ${id}...`);
    await client
      .patch(id)
      .set({
        featuredImage: featuredImageObj,
        category: { _type: "reference", _ref: "cat-disaster-management" },
        body: actBody,
      })
      .commit();
    console.log(`✅ Doc ${id} successfully synced with NDRF hero image & active links!`);
  };

  await updateDoc("ca-disaster-management-amendment-act-2025");
  await updateDoc("gk-disaster-management-amendment-act-2025");

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
