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
  console.log("🚀 Starting upload for NCERT Disaster Management Concept Article...");

  const publicBlogDir = path.resolve(process.cwd(), "public/images/blog");
  const artifactDir = "/Users/aakariastech/.gemini/antigravity-ide/brain/303f8097-7120-4c19-b5d4-05d0c10485d5";

  const destTypes = path.join(publicBlogDir, "ncert_disaster_management_concept_types.png");
  const destNdma = path.join(publicBlogDir, "disaster_management_ndma_command_center.png");
  const destSdrf = path.join(publicBlogDir, "sdrf_disaster_response_team_india.png");

  if (!fs.existsSync(publicBlogDir)) fs.mkdirSync(publicBlogDir, { recursive: true });

  const srcTypes = path.join(artifactDir, "ncert_disaster_management_concept_types_1785161203791.png");
  const srcNdma = path.join(artifactDir, "disaster_management_ndma_command_center_1785160211199.png");
  const srcSdrf = path.join(artifactDir, "sdrf_disaster_response_team_india_1785160249431.png");

  if (fs.existsSync(srcTypes)) fs.copyFileSync(srcTypes, destTypes);
  if (fs.existsSync(srcNdma)) fs.copyFileSync(srcNdma, destNdma);
  if (fs.existsSync(srcSdrf)) fs.copyFileSync(srcSdrf, destSdrf);

  console.log("📸 Uploading images to Sanity...");
  const assetTypes = await client.assets.upload("image", fs.createReadStream(destTypes), {
    filename: "ncert_disaster_management_concept_types.png",
  });
  const assetNdma = await client.assets.upload("image", fs.createReadStream(destNdma), {
    filename: "disaster_management_ndma_command_center.png",
  });
  const assetSdrf = await client.assets.upload("image", fs.createReadStream(destSdrf), {
    filename: "sdrf_disaster_response_team_india.png",
  });

  const docId = "gk-what-is-disaster-management-ncert";
  const slug = "what-is-disaster-management-ncert-types-mppsc-notes";

  const articleDoc = {
    _id: docId,
    _type: "staticGk",
    title: "आपदा प्रबंधन क्या है? अर्थ, प्रकार, चरण, आवश्यकता एवं NCERT नोट्स | MPPSC & UPSC Notes",
    titleEn: "What is Disaster Management: Concept, Types, Cycle, NCERT Notes & Key Facts | MPPSC & UPSC",
    slug: { _type: "slug", current: slug },
    category: { _type: "reference", _ref: "cat-disaster-management" },
    ca_date: "2026-07-27",
    publishedAt: new Date().toISOString(),
    featured: true,
    readingTime: 9,
    tags: [
      { _type: "reference", _ref: "tag-mppsc" },
      { _type: "reference", _ref: "tag-upsc" },
      { _type: "reference", _ref: "tag-prelims" },
      { _type: "reference", _ref: "tag-mains" },
    ],
    excerpt: "आपदा प्रबंधन (Disaster Management) की अवधारणा, प्राकृतिक एवं मानव निर्मित आपदाओं का वर्गीकरण (NCERT डेटा), आपदा प्रबंधन चक्र, आवश्यकता, पूर्व तैयारी एवं सुरक्षात्मक उपाय। MPPSC Mains GS Paper 3 हेतु सम्पूर्ण नोट्स।",
    excerptEn: "Comprehensive guide on Disaster Management based on NCERT material. Covers definition, natural vs manmade disasters, disaster management cycle, preparedness, emergency kit, and NDMA framework for MPPSC and UPSC exams.",
    seoTitle: "आपदा प्रबंधन क्या है? आपदा के प्रकार, चक्र व NCERT नोट्स | MPPSC & UPSC",
    seoDescription: "आपदा प्रबंधन (Disaster Management in Hindi): आपदा का अर्थ, प्राकृतिक व मानव निर्मित आपदाएँ (NCERT डेटा), 6 प्रमुख चरण, आपातकालीन किट, आवश्यकता एवं MPPSC Mains Paper 3 हेतु 8 MCQs व FAQs।",
    featuredImage: {
      _type: "image",
      asset: { _type: "reference", _ref: assetTypes._id },
      alt: "Disaster Management Concept Types Natural and Manmade Disasters NCERT Notes MPPSC",
    },

    body: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "किसी भी क्षेत्र में होने वाली ऐसी अनपेक्षित दुर्घटना या विनाशकारी घटना जिससे सामान्य जन-जीवन गंभीर रूप से प्रभावित होता है, व्यापक जान-माल की हानि होती है तथा स्थानीय संसाधन उससे निपटने के लिए अपर्याप्त सिद्ध होते हैं, उसे ",
          },
          {
            _type: "span",
            marks: ["strong"],
            text: "आपदा (Disaster)",
          },
          {
            _type: "span",
            text: " कहते हैं। ",
          },
          {
            _type: "span",
            marks: ["strong"],
            text: "राष्ट्रीय शैक्षिक अनुसंधान और प्रशिक्षण परिषद (NCERT)",
          },
          {
            _type: "span",
            text: " के अनुसार, आपदा प्रबंधन आपदाओं से उत्पन्न जोखिम को कम करने, प्रभावित आबादी को तत्काल राहत पहुँचाने और पुनर्निर्माण की एक एकीकृत प्रक्रिया है। ",
          },
          {
            _type: "span",
            marks: ["strong"],
            text: "MPPSC मुख्य परीक्षा (GS Paper 3 Unit 5 एवं GS Paper 4 Part B Unit 3)",
          },
          {
            _type: "span",
            text: " तथा UPSC (GS Paper 3) के लिए यह एक अति महत्वपूर्ण बुनियादी विषय है।",
          },
        ],
      },
      {
        _type: "image",
        asset: { _type: "reference", _ref: assetTypes._id },
        alt: "Disaster Management Concept Types Emergency Warning Flood Rescue India",
        caption: "प्राकृतिक आपदाओं के समय पूर्व चेतावनी प्रणाली एवं राहत बचाव कार्य (NCERT आधारित वर्गीकरण)",
      },

      // Subheading 1: आपदा की परिभाषा एवं अर्थ
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "1. आपदा क्या है? (What is a Disaster - NCERT Definition)" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "किसी समाज या समुदाय के कामकाज में होने वाला वह गंभीर व्यवधान जो व्यापक मानव, भौतिक, आर्थिक या पर्यावरणीय क्षति पहुँचाता है, आपदा कहलाता है। आपदा के मुख्य घटक निम्न हैं:",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "• ",
          },
          {
            _type: "span",
            marks: ["strong"],
            text: "अनपेक्षित घटना: ",
          },
          {
            _type: "span",
            text: "यह अचानक या तीव्र गति से घटित होने वाली घटना है जो सामान्य जीवन चक्र को अस्त-व्यस्त कर देती है।",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "• ",
          },
          {
            _type: "span",
            marks: ["strong"],
            text: "व्यापक जान-माल की हानि: ",
          },
          {
            _type: "span",
            text: "इसमें मानव जीवन, पशुधन, इमारतों, फसलों और बुनियादी ढाँचे का बड़ा नुकसान होता है।",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "• ",
          },
          {
            _type: "span",
            marks: ["strong"],
            text: "स्थानीय क्षमताओं से परे: ",
          },
          {
            _type: "span",
            text: "आपदा की तीव्रता इतनी अधिक होती है कि प्रभावित समुदाय अपने संसाधनों से इसका मुकाबला नहीं कर पाता।",
          },
        ],
      },

      // Subheading 2: आपदाओं के प्रकार (NCERT वर्गीकरण)
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "2. आपदाओं के मुख्य प्रकार (Types of Disasters - NCERT Data)" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "NCERT पाठ्य सामग्री (भाग 1) के अनुसार आपदाओं को उत्पत्ति के आधार पर दो प्रमुख वर्गों में विभाजित किया जाता है:",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "• ",
          },
          {
            _type: "span",
            marks: ["strong"],
            text: "(A) प्राकृतिक आपदाएँ (Natural Disasters): ",
          },
          {
            _type: "span",
            text: "पर्यावरण के असंतुलन या धरती के अंदर हलचल के कारण घटने वाली प्राकृतिक घटनाएँ जो जीवन और संपत्ति को हानि पहुँचाती हैं।",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "  — ",
          },
          {
            _type: "span",
            marks: ["strong"],
            text: "भूकंप (Earthquake): ",
          },
          {
            _type: "span",
            text: "भूगर्भिक टेक्टोनिक प्लेटों की गति से अचानक आने वाला कंपन।",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "  — ",
          },
          {
            _type: "span",
            marks: ["strong"],
            text: "बाढ़ (Floods) एवं अतिवृष्टि: ",
          },
          {
            _type: "span",
            text: "नदियों का जलस्तर बढ़ने से मैदानी क्षेत्रों का जलमग्न होना।",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "  — ",
          },
          {
            _type: "span",
            marks: ["strong"],
            text: "सूखा (Drought): ",
          },
          {
            _type: "span",
            text: "दीर्घकाल तक वर्षा न होने से जल एवं खाद्यान्न की कमी।",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "  — ",
          },
          {
            _type: "span",
            marks: ["strong"],
            text: "चक्रवात एवं तूफ़ान (Cyclones & Storms): ",
          },
          {
            _type: "span",
            text: "समुद्री तटीय क्षेत्रों में उच्च वेग की हवाएँ और बारिश।",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "  — ",
          },
          {
            _type: "span",
            marks: ["strong"],
            text: "अन्य प्राकृतिक आपदाएँ: ",
          },
          {
            _type: "span",
            text: "सुनामी, बादल का फटना (Cloudburst), प्राकृतिक भूस्खलन (Landslides), शीत लहर, ताप लहर (Heat Wave), वनों में आग (Wildfires) तथा ज्वालामुखी फटना।",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "• ",
          },
          {
            _type: "span",
            marks: ["strong"],
            text: "(B) मानव निर्मित आपदाएँ (Man-made Disasters): ",
          },
          {
            _type: "span",
            text: "मनुष्य की असावधानी, भूल, लापरवाही या सुरक्षा प्रणालियों के असफल होने से घटने वाली आपदाएँ।",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "  — ",
          },
          {
            _type: "span",
            marks: ["strong"],
            text: "परिवहन दुर्घटनाएँ: ",
          },
          {
            _type: "span",
            text: "सड़क, रेल या वायु दुर्घटनाएँ।",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "  — ",
          },
          {
            _type: "span",
            marks: ["strong"],
            text: "औद्योगिक व भीषण आग: ",
          },
          {
            _type: "span",
            text: "कारखानों या घनी बस्तियों में भीषण अग्निकांड।",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "  — ",
          },
          {
            _type: "span",
            marks: ["strong"],
            text: "पर्यावरण व तकनीकी दुर्घटनाएँ: ",
          },
          {
            _type: "span",
            text: "धुंध व गंभीर वायु प्रदूषण, रासायनिक गैस रिसाव (जैसे भोपाल गैस त्रासदी), जैविक महामारी (Epidemic/Pandemic), बम विस्फोट और नाभिकीय (Nuclear) आपदाएँ।",
          },
        ],
      },

      // Subheading 3: आपदा प्रबंधन की प्रक्रिया एवं चरण
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "3. आपदा प्रबंधन की प्रक्रिया एवं चरण (Disaster Management Cycle)" }],
      },
      {
        _type: "image",
        asset: { _type: "reference", _ref: assetNdma._id },
        alt: "Disaster Management Cycle Mitigation Preparedness Response Recovery NDMA India",
        caption: "राष्ट्रीय आपदा प्रबंधन प्राधिकरण (NDMA) का आपदा प्रबंधन चक्र एवं संस्थागत तंत्र",
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "किसी आपदा से निपटने के लिए सरकारी एवं गैर-सरकारी संगठनों द्वारा की जाने वाली राहत व योजनाबद्ध व्यवस्था को ",
          },
          {
            _type: "span",
            marks: ["strong"],
            text: "आपदा प्रबंधन (Disaster Management)",
          },
          {
            _type: "span",
            text: " कहते हैं। NCERT के अनुसार इसमें 6 मुख्य चरण शामिल हैं:",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "• ",
          },
          {
            _type: "span",
            marks: ["strong"],
            text: "1. आपदा के आने से पहले उससे निपटने की तैयारी (Preparedness): ",
          },
          {
            _type: "span",
            text: "पूर्व चेतावनी प्रणाली स्थापित करना, मॉक ड्रिल आयोजित करना तथा आपातकालीन योजना बनाना।",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "• ",
          },
          {
            _type: "span",
            marks: ["strong"],
            text: "2. आपदा के खतरे की रोकथाम (Mitigation & Prevention): ",
          },
          {
            _type: "span",
            text: "आपदा रोधी इमारतों का निर्माण, तटबंध बनाना तथा जोखिम कम करना।",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "• ",
          },
          {
            _type: "span",
            marks: ["strong"],
            text: "3. तत्काल सहायता एवं राहत (Emergency Relief & Rescue): ",
          },
          {
            _type: "span",
            text: "आपदा के समय फँसे पीड़ितों को बाहर निकालना, चिकित्सा और भोजन उपलब्ध कराना।",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "• ",
          },
          {
            _type: "span",
            marks: ["strong"],
            text: "4. पुनर्निर्माण (Reconstruction): ",
          },
          {
            _type: "span",
            text: "आपदा में नष्ट हुई संपत्ति, सड़कों, पुलों और सार्वजनिक अवसंरचना का फिर से निर्माण करना।",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "• ",
          },
          {
            _type: "span",
            marks: ["strong"],
            text: "5. पुनर्वास (Rehabilitation): ",
          },
          {
            _type: "span",
            text: "बेघर हुए लोगों, गाँवों और बस्तियों को दोबारा सुरक्षित स्थानों पर स्थायी रूप से बसाना।",
          },
        ],
      },

      // INTERLINKING SECTION
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "4. नवीनतम कानून: आपदा प्रबंधन (संशोधन) अधिनियम, 2025" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "भारत में 2005 के मूल आपदा कानून में संशोधन करके केंद्र सरकार ने ",
          },
          {
            _type: "span",
            marks: ["strong"],
            text: "आपदा प्रबंधन (संशोधन) अधिनियम, 2025",
          },
          {
            _type: "span",
            text: " लागू किया है। इसके तहत शहरी आपदा प्रबंधन प्राधिकरण (UDMA - नई धारा 41A), NCMC व HLC को वैधानिक दर्जा और पोस्ट-डिजास्टर ऑडिट की शक्तियाँ दी गई हैं।\n👉 ",
          },
          {
            _type: "span",
            marks: ["strong"],
            text: "विस्तृत नोट्स यहाँ पढ़ें: ",
          },
          {
            _type: "span",
            text: "आपदा प्रबंधन (संशोधन) अधिनियम, 2025: मुख्य प्रावधान, महत्व व चुनौतियाँ",
          },
        ],
      },
      {
        _type: "image",
        asset: { _type: "reference", _ref: assetSdrf._id },
        alt: "SDRF Disaster Response Force Rescue Team in Action Flood Relief India",
        caption: "राज्य आपदा प्रतिक्रिया बल (SDRF) द्वारा आपदा प्रभावित क्षेत्रों में त्वरित बचाव एवं सहायता कार्य",
      },

      // Subheading 5: पूर्व तैयारी के उपाय (Emergency Kit)
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "5. आपदा से निपटने की तैयारी कैसे करें? (NCERT Safety Guidelines)" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "• ",
          },
          {
            _type: "span",
            marks: ["strong"],
            text: "आपात्कालीन किट तैयार रखें: ",
          },
          {
            _type: "span",
            text: "जरूरी कागजात, फर्स्ट एड किट, टॉर्च, रेडियो, सूखी खाद्य सामग्री और पीने का पानी सुरक्षित रखें।",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "• ",
          },
          {
            _type: "span",
            marks: ["strong"],
            text: "एकत्रित होने का स्थान: ",
          },
          {
            _type: "span",
            text: "आपात स्थिति में परिवार के सदस्यों के अलग होने पर मिलने की जगह पहले से निश्चित करें।",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "• ",
          },
          {
            _type: "span",
            marks: ["strong"],
            text: "आधिकारिक चेतावनियों का पालन: ",
          },
          {
            _type: "span",
            text: "रेडियो, टीवी व आधिकारिक घोषणाओं का ध्यान रखें, अफवाहों पर ध्यान न दें।",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "• ",
          },
          {
            _type: "span",
            marks: ["strong"],
            text: "इमरजेंसी हेल्पलाइन नंबर: ",
          },
          {
            _type: "span",
            text: "राष्ट्रीय आपदा हेल्पलाइन 1070 तथा राज्य आपदा हेल्पलाइन 1077 अपने फोन में सेव रखें।",
          },
        ],
      },

      // Subheading 6: MPPSC Exam Points
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "MPPSC & UPSC परीक्षा उपयोगी महत्वपूर्ण तथ्य (Exam Takeaways)" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "• ",
          },
          {
            _type: "span",
            marks: ["strong"],
            text: "MPPSC Mains GS Paper 3 (Unit 5): ",
          },
          {
            _type: "span",
            text: "आपदा की परिभाषा, प्राकृतिक एवं मानव निर्मित आपदाओं का वर्गीकरण, तथा आपदा प्रबंधन चक्र पर 7-अंक व 10-अंक का प्रश्न पूछा जाता है।",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "• ",
          },
          {
            _type: "span",
            marks: ["strong"],
            text: "MPPSC Mains GS Paper 4 (Part B Unit 3): ",
          },
          {
            _type: "span",
            text: "आपदा प्रबंधन में लोक प्रशासन एवं नागरिक सुरक्षा की भूमिका पर केस स्टडी प्रश्न।",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "• ",
          },
          {
            _type: "span",
            marks: ["strong"],
            text: "संस्थागत ढाँचा: ",
          },
          {
            _type: "span",
            text: "NDMA अध्यक्ष = प्रधानमंत्री | SDMA अध्यक्ष = मुख्यमंत्री | DDMA अध्यक्ष = जिलाधिकारी (DM/Collector)।",
          },
        ],
      },
    ],

    faqs: [
      {
        question: "आपदा प्रबंधन (Disaster Management) की सरल परिभाषा क्या है?",
        answer:
          "आपदा से निपटने के लिए आपदा-पीड़ित क्षेत्र में सरकारी एवं गैर-सरकारी संगठनों द्वारा की जाने वाली सहायता, शमन, राहत, पुनर्वास एवं बचाव की योजनाबद्ध व्यवस्था को आपदा प्रबंधन कहते हैं।",
      },
      {
        question: "प्राकृतिक और मानव निर्मित आपदाओं में मुख्य अंतर क्या है?",
        answer:
          "प्राकृतिक आपदाएँ पर्यावरण असंतुलन या भूगर्भीय हलचलों (जैसे भूकंप, बाढ़, सुनामी) के कारण घटती हैं, जबकि मानव निर्मित आपदाएँ मनुष्य की असावधानी, लापरवाही या व्यवस्था की असफलता (जैसे कारखाने में आग, रासायनिक गैस रिसाव, सड़क दुर्घटना) के कारण होती हैं।",
      },
      {
        question: "आपदा प्रबंधन चक्र (Disaster Management Cycle) के मुख्य चरण कौन से हैं?",
        answer:
          "इसके 6 प्रमुख चरण हैं: (1) आपदा पूर्व तैयारी, (2) रोकथाम व शमन, (3) पूर्व चेतावनी, (4) तत्काल राहत व बचाव, (5) पुनर्निर्माण, और (6) पुनर्वास।",
      },
      {
        question: "NDMA का गठन किस अधिनियम के तहत हुआ था?",
        answer:
          "राष्ट्रीय आपदा प्रबंधन प्राधिकरण (NDMA) का औपचारिक गठन आपदा प्रबंधन अधिनियम, 2005 के तहत 27 सितंबर 2006 को किया गया था।",
      },
      {
        question: "आपदा प्रबंधन (संशोधन) अधिनियम, 2025 में क्या नया जोड़ा गया है?",
        answer:
          "2025 संशोधन द्वारा शहरी आपदा प्रबंधन प्राधिकरण (UDMA - नई धारा 41A) का गठन, NCMC व HLC को वैधानिक दर्जा, और NDMA को पोस्ट-डिजास्टर ऑडिट का अधिकार दिया गया है।",
      },
      {
        question: "MPPSC परीक्षा में आपदा प्रबंधन का क्या महत्व है?",
        answer:
          "MPPSC Mains GS Paper 3 की Unit 5 तथा GS Paper 4 Part B की Unit 3 में आपदा प्रबंधन का पूरा पाठ्यक्रम शामिल है।",
      },
    ],

    mcqs: [
      {
        question: "राष्ट्रीय आपदा प्रबंधन प्राधिकरण (NDMA) के पदेन अध्यक्ष कौन होते हैं?",
        options: ["गृह मंत्री", "भारत के प्रधानमंत्री", "पर्यावरण मंत्री", "राष्ट्रपति"],
        correctIndex: 1,
        explanation: "आपदा प्रबंधन अधिनियम 2005 के अनुसार NDMA के पदेन अध्यक्ष भारत के प्रधानमंत्री होते हैं।",
      },
      {
        question: "जिला आपदा प्रबंधन प्राधिकरण (DDMA) के अध्यक्ष कौन होते हैं?",
        options: ["जिलाधिकारी / कलेक्टर", "जिला पंचायत अध्यक्ष", "स्थानीय विधायक", "पुलिस अधीक्षक"],
        correctIndex: 0,
        explanation: "जिला स्तर पर DDMA के पदेन अध्यक्ष जिलाधिकारी (District Magistrate / Collector) होते हैं।",
      },
      {
        question: "निम्नलिखित में से कौन सी मानव निर्मित आपदा (Man-made Disaster) का उदाहरण है?",
        options: ["सुनामी", "भोपाल गैस त्रासदी (रासायनिक रिसाव)", "बादल का फटना", "ज्वालामुखी विस्फोट"],
        correctIndex: 1,
        explanation: "भोपाल गैस त्रासदी 1984 रासायनिक गैस रिसाव मानव निर्मित आपदा का उदाहरण है, जबकि सुनामी, बादल फटना और ज्वालामुखी प्राकृतिक आपदाएँ हैं।",
      },
      {
        question: "NCERT के अनुसार, आपदा प्रबंधन प्रक्रिया में इनमें से कौन सा चरण शामिल है?",
        options: ["आपदा पूर्व तैयारी", "तत्काल राहत एवं बचाव", "पुनर्निर्माण एवं पुनर्वास", "उपर्युक्त सभी"],
        correctIndex: 3,
        explanation: "आपदा प्रबंधन में पूर्व तैयारी, त्वरित राहत-बचाव, पुनर्निर्माण और पुनर्वास सभी चरण शामिल हैं।",
      },
      {
        question: "आपदा आपातकालीन राष्ट्रीय हेल्पलाइन नंबर (National Disaster Helpline) कौन सा है?",
        options: ["100", "108", "1070", "112"],
        correctIndex: 2,
        explanation: "भारत में राष्ट्रीय आपदा राहत हेल्पलाइन नंबर 1070 तथा राज्य स्तर पर 1077 है।",
      },
      {
        question: "आपदा प्रबंधन (संशोधन) अधिनियम, 2025 के तहत किस स्तर पर UDMA गठित करने की व्यवस्था की गई है?",
        options: ["ग्रामीण स्तर पर", "शहरी/राजधानी स्तर पर (धारा 41A)", "अंतर्राष्ट्रीय स्तर पर", "केवल ब्लॉक स्तर पर"],
        correctIndex: 1,
        explanation: "संशोधन अधिनियम 2025 में नई धारा 41A जोड़कर राजधानी और बड़े नगरों में शहरी आपदा प्रबंधन प्राधिकरण (UDMA) गठित करने का प्रावधान किया गया है।",
      },
      {
        question: "आपदा जोखिम न्यूनीकरण के लिए अंतर्राष्ट्रीय फ्रेमवर्क कौन सा है?",
        options: ["सेंडाई फ्रेमवर्क (Sendai Framework 2015-2030)", "पेरिस समझौता", "क्योटो प्रोटोकॉल", "मांट्रियल प्रोटोकॉल"],
        correctIndex: 0,
        explanation: "सेंडाई फ्रेमवर्क (Sendai Framework for Disaster Risk Reduction 2015-2030) आपदा जोखिम कम करने का वैश्विक खाका है।",
      },
      {
        question: "MPPSC मुख्य परीक्षा के किस प्रश्नपत्र में आपदा प्रबंधन (Disaster Management) शामिल है?",
        options: ["GS Paper 1 Unit 1", "GS Paper 2 Unit 3", "GS Paper 3 Unit 5 एवं GS Paper 4 Part B Unit 3", "Paper 6"],
        correctIndex: 2,
        explanation: "MPPSC Mains GS Paper 3 Unit 5 तथा GS Paper 4 Part B Unit 3 में आपदा प्रबंधन पूरा पाठ्यक्रम है।",
      },
    ],
  };

  console.log("📝 Creating Static GK document in Sanity...");
  const resStatic = await client.createOrReplace(articleDoc);
  console.log(`✅ Published Static GK document! ID: ${resStatic._id}`);

  // Also create currentAffairs document version
  const caDoc = {
    ...articleDoc,
    _id: "ca-what-is-disaster-management-ncert",
    _type: "currentAffairs",
    category: { _type: "reference", _ref: "cat-disaster-management" },
    slug: { _type: "slug", current: slug },
  };

  console.log("📝 Creating Current Affairs document in Sanity...");
  const resCa = await client.createOrReplace(caDoc);
  console.log(`✅ Published Current Affairs document! ID: ${resCa._id}`);

  // INTERLINKING: Update the 2025 Amendment Act article to link back to this concept article!
  console.log("🔗 Updating Disaster Management Amendment Act 2025 article for reverse interlinking...");
  const amendmentDoc: any = await client.getDocument("ca-disaster-management-amendment-act-2025");
  if (amendmentDoc && amendmentDoc.body) {
    const updatedBody = [
      ...amendmentDoc.body,
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "आपदा प्रबंधन मूलभूत अवधारणा एवं NCERT नोट्स" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "आपदा प्रबंधन का मूल अर्थ, प्राकृतिक व मानव निर्मित आपदाओं का वर्गीकरण (NCERT डेटा) एवं आपदा प्रबंधन चक्र की विस्तृत जानकारी के लिए पढ़ें:\n👉 ",
          },
          {
            _type: "span",
            marks: ["strong"],
            text: "आपदा प्रबंधन क्या है? अर्थ, प्रकार, चरण, आवश्यकता एवं NCERT नोट्स",
          },
        ],
      },
    ];
    await client.patch("ca-disaster-management-amendment-act-2025").set({ body: updatedBody }).commit();
    await client.patch("gk-disaster-management-amendment-act-2025").set({ body: updatedBody }).commit();
    console.log("✅ Interlinking updated on Disaster Management Amendment Act 2025 articles!");
  }

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
