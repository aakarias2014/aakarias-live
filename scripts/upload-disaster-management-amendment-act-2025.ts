import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

// Load env.local explicitly
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
  console.log("🚀 Starting upload process for Disaster Management Amendment Act 2025 article...");

  const publicBlogDir = path.resolve(process.cwd(), "public/images/blog");
  const artifactDir = "/Users/aakariastech/.gemini/antigravity-ide/brain/303f8097-7120-4c19-b5d4-05d0c10485d5";

  const destNdma = path.join(publicBlogDir, "disaster_management_ndma_command_center.png");
  const destUdma = path.join(publicBlogDir, "urban_disaster_management_udma.png");
  const destSdrf = path.join(publicBlogDir, "sdrf_disaster_response_team_india.png");

  if (!fs.existsSync(publicBlogDir)) fs.mkdirSync(publicBlogDir, { recursive: true });

  const srcNdma = path.join(artifactDir, "disaster_management_ndma_command_center_1785160211199.png");
  const srcUdma = path.join(artifactDir, "urban_disaster_management_udma_1785160229019.png");
  const srcSdrf = path.join(artifactDir, "sdrf_disaster_response_team_india_1785160249431.png");

  if (fs.existsSync(srcNdma)) fs.copyFileSync(srcNdma, destNdma);
  if (fs.existsSync(srcUdma)) fs.copyFileSync(srcUdma, destUdma);
  if (fs.existsSync(srcSdrf)) fs.copyFileSync(srcSdrf, destSdrf);

  // 1. Upload NDMA Command Center image
  console.log("📸 Uploading NDMA Command Center image...");
  const assetNdma = await client.assets.upload("image", fs.createReadStream(destNdma), {
    filename: "disaster_management_ndma_command_center.png",
  });

  // 2. Upload UDMA image
  console.log("📸 Uploading UDMA Urban Disaster Management image...");
  const assetUdma = await client.assets.upload("image", fs.createReadStream(destUdma), {
    filename: "urban_disaster_management_udma.png",
  });

  // 3. Upload SDRF Rescue Team image
  console.log("📸 Uploading SDRF Disaster Response Team image...");
  const assetSdrf = await client.assets.upload("image", fs.createReadStream(destSdrf), {
    filename: "sdrf_disaster_response_team_india.png",
  });

  console.log("✅ All images uploaded successfully!");

  // Ensure tags exist or reference them
  const docId = "ca-disaster-management-amendment-act-2025";
  const slug = "disaster-management-amendment-act-2025-mppsc-upsc-notes";

  const articleDoc = {
    _id: docId,
    _type: "currentAffairs",
    title: "आपदा प्रबंधन (संशोधन) अधिनियम, 2025: मुख्य विशेषताएँ, प्रावधान, महत्व व चुनौतियाँ | MPPSC & UPSC Notes",
    titleEn: "The Disaster Management (Amendment) Act, 2025: Key Features, Provisions, Significance & Challenges | MPPSC & UPSC",
    slug: { _type: "slug", current: slug },
    ca_date: "2025-04-09",
    category: "राष्ट्रीय परिदृश्य (National Affairs)",
    categoryEn: "National Affairs",
    locale: "hi",
    tags: ["tag-mppsc", "tag-upsc", "mppsc-mains-paper-3", "disaster-management"],
    featured: true,
    readingTime: 8,
    excerpt: "29 मार्च 2025 को राष्ट्रपति द्वारा स्वीकृत आपदा प्रबंधन (संशोधन) अधिनियम 2025 के मुख्य प्रावधान, UDMA गठन, धारा 41A, NDMA/SDMA शक्तियाँ, महत्व व चुनौतियाँ। MPPSC Mains GS Paper 3 हेतु सम्पूर्ण नोट्स।",
    excerptEn: "Comprehensive analysis of The Disaster Management (Amendment) Act, 2025 enforced from 9 April 2025. Covers UDMA creation (Section 41A), statutory status to NCMC & HLC, climate risk assessment, and SDRF provisions for MPPSC & UPSC exams.",
    seoTitle: "आपदा प्रबंधन संशोधन अधिनियम 2025 | MPPSC & UPSC Mains Notes",
    seoDescription: "आपदा प्रबंधन (संशोधन) अधिनियम 2025 (Disaster Management Amendment Act 2025): राष्ट्रपति स्वीकृति (29 मार्च 2025), लागू (9 अप्रैल 2025), UDMA धारा 41A, NCMC, HLC, SDRF एवं MPPSC हेतु 8 MCQs व FAQs।",
    publishedAt: "2025-04-09T00:00:00Z",

    // Body content in Portable Text format
    body: [
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
            text: " को संसद के दोनों सदनों द्वारा पारित किए जाने के बाद राष्ट्रपति द्रौपदी मुर्मु द्वारा 29 मार्च, 2025 को मंजूरी प्रदान की गई। यह अधिनियम 9 अप्रैल, 2025 से संपूर्ण भारत में प्रभावी हो गया है। MPPSC मुख्य परीक्षा (GS Paper 3 Unit 5 एवं GS Paper 4 Part B Unit 3) तथा UPSC मुख्य परीक्षा (GS Paper 3) के दृष्टिकोण से यह अधिनियम अत्यंत महत्वपूर्ण है।",
          },
        ],
      },
      {
        _type: "image",
        asset: { _type: "reference", _ref: assetNdma._id },
        alt: "National Disaster Management Authority NDMA Emergency Operations Center India",
        caption: "राष्ट्रीय आपदा प्रबंधन प्राधिकरण (NDMA) आपातकालीन नियंत्रण कक्ष एवं आपदा निगरानी तंत्र",
      },

      // Subheading 1: विधायी यात्रा एवं प्रमुख तिथियाँ
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "आपदा प्रबंधन (संशोधन) अधिनियम, 2025 की विधायी यात्रा एवं लागू होने की तिथि" }],
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
            text: "राज्यसभा द्वारा पारित: ",
          },
          {
            _type: "span",
            text: "संशोधन विधेयक 25 मार्च, 2025 को राज्यसभा द्वारा ध्वनिमत से पारित किया गया।",
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
            text: "लोकसभा द्वारा पारित: ",
          },
          {
            _type: "span",
            text: "27 मार्च, 2025 को लोकसभा ने इस विधेयक को अपनी स्वीकृति प्रदान की।",
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
            text: "राष्ट्रपति की स्वीकृति: ",
          },
          {
            _type: "span",
            text: "29 मार्च, 2025 को भारत की राष्ट्रपति श्रीमती द्रौपदी मुर्मु ने अधिनियम को अपनी सहमति दी।",
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
            text: "लागू होने की तिथि: ",
          },
          {
            _type: "span",
            text: "यह संशोधित अधिनियम 9 अप्रैल, 2025 से आधिकारिक राजपत्र में अधिसूचना के साथ देश भर में लागू किया गया।",
          },
        ],
      },

      // Subheading 2: संशोधन की मुख्य विशेषताएँ
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "संशोधन अधिनियम 2025 की मुख्य विशेषताएँ एवं नए प्रावधान (Key Features)" }],
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
            text: "NDMA और SDMA का सशक्तीकरण: ",
          },
          {
            _type: "span",
            text: "राष्ट्रीय आपदा प्रबंधन प्राधिकरण (NDMA) तथा राज्य आपदा प्रबंधन प्राधिकरण (SDMA) को आपदाओं के रोकथाम, शमन एवं प्रबंधन से संबंधित नीतियाँ और योजनाएँ तैयार करने का प्रत्यक्ष अधिकार प्रदान किया गया है।",
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
            text: "शहरी आपदा प्रबंधन प्राधिकरण (UDMA - नई धारा 41A): ",
          },
          {
            _type: "span",
            text: "राज्यों की राजधानियों एवं बड़े नगरों (Metro Cities) के लिए शहरी आपदा प्रबंधन प्राधिकरण (Urban Disaster Management Authority - UDMA) के गठन का अधिकार दिया गया है। इसके लिए अधिनियम में एक नई धारा 41A जोड़ी गई है।",
          },
        ],
      },
      {
        _type: "image",
        asset: { _type: "reference", _ref: assetUdma._id },
        alt: "Urban Disaster Management Authority UDMA Metro Stormwater Drainage Drainage Inspection",
        caption: "शहरी आपदा प्रबंधन प्राधिकरण (UDMA) धारा 41A के तहत नगरों में जलभराव एवं आपदा रोधी अवसंरचना का निरीक्षण",
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
            text: "मौजूदा समितियों को वैधानिक दर्जा: ",
          },
          {
            _type: "span",
            text: "राष्ट्रीय संकट प्रबंधन समिति (NCMC) और उच्च स्तरीय समिति (HLC) जैसी महत्वपूर्ण अंतर-मंत्रालयी सलाहकार व समन्वय संस्थाओं को वैधानिक दर्जा (Statutory Status) देकर उनकी भूमिका को औपचारिक बनाया गया।",
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
            text: "जलवायु जोखिम आकलन (Climate Risk Assessment): ",
          },
          {
            _type: "span",
            text: "NDMA और SDMA को समय-समय पर आपदा जोखिम का वैज्ञानिक आकलन करने और आपदा प्रबंधन योजनाओं में जलवायु परिवर्तन के प्रभावों को एकीकृत करने का स्पष्ट दायित्व सौंपा गया है।",
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
            text: "राष्ट्रीय एवं राज्य आपदा डेटाबेस: ",
          },
          {
            _type: "span",
            text: "आपदा जोखिम आकलन, शमन रणनीतियों तथा त्वरित तैयारियों की वास्तविक समय पर निगरानी हेतु एक केंद्रीकृत राष्ट्रीय एवं राज्य आपदा डेटाबेस तैयार करना अनिवार्य किया गया है।",
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
            text: "आपदा पश्चात लेखा परीक्षण (Post-Disaster Audit): ",
          },
          {
            _type: "span",
            text: "NDMA को यह वैधानिक अधिकार दिया गया है कि वह किसी भी बड़ी आपदा के उपरांत तैयारियों, राहत व पुनर्वास की प्रभावशीलता का पोस्ट-डिजास्टर ऑडिट (Post-Disaster Audit) कर सके।",
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
            text: "राज्य आपदा प्रतिक्रिया बल (SDRF): ",
          },
          {
            _type: "span",
            text: "संशोधन राज्यों को अपना स्वयं का राज्य आपदा प्रतिक्रिया बल (SDRF) गठित करने और उसे सुदृढ़ करने का स्पष्ट कानूनी अधिकार देता है, जिससे राज्य स्तर पर प्रतिक्रिया क्षमता बढ़ेगी।",
          },
        ],
      },
      {
        _type: "image",
        asset: { _type: "reference", _ref: assetSdrf._id },
        alt: "State Disaster Response Force SDRF Flood Rescue Operation India",
        caption: "राज्य आपदा प्रतिक्रिया बल (SDRF) द्वारा बाढ़ प्रभावित क्षेत्रों में त्वरित राहत एवं बचाव कार्य",
      },

      // Subheading 3: संशोधन अधिनियम का महत्व
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "आपदा प्रबंधन (संशोधन) अधिनियम, 2025 का महत्व (Significance)" }],
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
            text: "समग्र एवं सक्रिय दृष्टिकोण: ",
          },
          {
            _type: "span",
            text: "यह अधिनियम देश में आपदा प्रबंधन को केवल 'आपदा पश्चात राहत' (Reactive Relief) मॉडल से हटाकर 'सक्रिय जोखिम निम्नीकरण एवं आपदा रोधी' (Proactive Risk Reduction & Resilience) मॉडल की ओर ले जाता है।",
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
            text: "जलवायु अनुकूलन का मुख्यधारा में समावेश: ",
          },
          {
            _type: "span",
            text: "यह सुनिश्चित करता है कि जलवायु परिवर्तन को आपदा प्रबंधन से अलग न देखा जाए, बल्कि उसे सभी विकास योजनाओं में अनिवार्य रूप से एकीकृत किया जाए।",
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
            text: "वैश्विक नेतृत्व (Global Leadership): ",
          },
          {
            _type: "span",
            text: "आपदा जोखिम न्यूनीकरण के लिए सेंडाई फ्रेमवर्क (Sendai Framework 2015-2030) के अनुरूप यह संशोधन भारत को विकासशील देशों के बीच जलवायु जोखिम प्रबंधन में वैश्विक अग्रणी स्थान प्रदान करता है।",
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
            text: "सुदृढ़ स्थानीय शासन: ",
          },
          {
            _type: "span",
            text: "नगरपालिकाओं, नगर निगमों और ग्राम पंचायतों को प्रथम प्रतिक्रियाकर्ता (First Responders) के रूप में बेहतर उपकरण, प्रशिक्षण एवं वित्तीय स्वायत्तता प्रदान करता है।",
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
            text: "अंतर-मंत्रालयी एवं केंद्र-राज्य तालमेल: ",
          },
          {
            _type: "span",
            text: "NCMC और HLC को कानूनी दर्जा मिलने से केंद्र और राज्य सरकारों की एजेंसियों के मध्य त्वरित सूचना साझाकरण व निर्बाध समन्वय सुनिश्चित होगा।",
          },
        ],
      },

      // Subheading 4: विद्यमान चुनौतियाँ
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "कार्यान्वयन से जुड़ी प्रमुख चुनौतियाँ (Challenges)" }],
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
            text: "स्थानीय निकायों में क्षमता की कमी: ",
          },
          {
            _type: "span",
            text: "ग्राम पंचायतों और शहरी स्थानीय निकायों में जलवायु जोखिम रजिस्टर (Climate Risk Register) तैयार करने हेतु विशेषज्ञ जनशक्ति एवं तकनीकी उपकरणों का अभाव है।",
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
            text: "वित्तीय बाधाएँ (Financial Constraints): ",
          },
          {
            _type: "span",
            text: "आपदा प्रबंधन योजनाओं के निर्माण, अवसंरचना सुदृढ़ीकरण तथा सतत निगरानी हेतु पर्याप्त वित्तीय आवंटन न होना एक प्रमुख बाधा बना हुआ है।",
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
            text: "डेटा का अभाव (High-Resolution Data Deficit): ",
          },
          {
            _type: "span",
            text: "भारत में जिला, तहसील तथा ब्लॉक स्तर पर उच्च-रिज़ॉल्यूशन जलवायु एवं आपदा जोखिम डेटा की उपलब्धता अत्यंत सीमित है।",
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
            text: "अनियंत्रित शहरी नियोजन: ",
          },
          {
            _type: "span",
            text: "बाढ़ संभावित क्षेत्रों, जलभराव वाले नालों और तटीय क्षेत्रों में अवैध व अनियंत्रित निर्माण (Encroachment) शहरी आपदा प्रबंधन के लिए गंभीर चुनौती उत्पन्न करता है।",
          },
        ],
      },

      // Subheading 5: MPPSC Exam Points
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
            text: "MPPSC Mains GS Paper 3 (Unit 5 - आपदा प्रबंधन): ",
          },
          {
            _type: "span",
            text: "मुख्य परीक्षा हेतु आपदा प्रबंधन अधिनियम 2005 एवं 2025 संशोधन के मुख्य अंतर, UDMA की धारा 41A, तथा SDRF की भूमिका पर 7-अंक व 10-अंक का प्रश्न पूछा जा सकता है।",
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
            text: "MPPSC Mains GS Paper 4 (Part B Unit 3 - आपदा प्रबंधन): ",
          },
          {
            _type: "span",
            text: "आपदाओं के समय प्रशासनिक तनाव, लोक सेवाओं की भूमिका और नैतिक संवेदनशीलता से जुड़े केस स्टडी प्रश्नों में इस कानून का उल्लेख उत्तर को अधिक अंक दिलाएगा।",
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
            text: "MPPSC Prelims Point: ",
          },
          {
            _type: "span",
            text: "राष्ट्रपति द्वारा स्वीकृति तिथि: 29 मार्च 2025 | लागू होने की तिथि: 9 अप्रैल 2025 | शहरी आपदा प्राधिकरण हेतु नई धारा: 41A।",
          },
        ],
      },
    ],

    // FAQs Section
    faqs: [
      {
        question: "आपदा प्रबंधन (संशोधन) अधिनियम, 2025 कब लागू हुआ?",
        answer:
          "आपदा प्रबंधन (संशोधन) अधिनियम, 2025 को 29 मार्च, 2025 को राष्ट्रपति द्रौपदी मुर्मु द्वारा मंजूरी प्रदान की गई थी और यह 9 अप्रैल, 2025 से संपूर्ण भारत में आधिकारिक रूप से लागू हुआ।",
      },
      {
        question: "शहरी आपदा प्रबंधन प्राधिकरण (UDMA) किस धारा के तहत गठित होता है?",
        answer:
          "आपदा प्रबंधन (संशोधन) अधिनियम, 2025 के माध्यम से मूल अधिनियम 2005 में एक नई धारा 41A (Section 41A) जोड़ी गई है, जिसके तहत राज्य सरकारों को राजधानी और बड़े नगरों के लिए UDMA गठित करने का अधिकार मिला है।",
      },
      {
        question: "संशोधन अधिनियम 2025 के तहत किन समितियों को वैधानिक दर्जा दिया गया है?",
        answer:
          "राष्ट्रीय संकट प्रबंधन समिति (National Crisis Management Committee - NCMC) और उच्च स्तरीय समिति (High Level Committee - HLC) को कानूनी/वैधानिक दर्जा (Statutory Status) प्रदान किया गया है।",
      },
      {
        question: "आपदा प्रबंधन अधिनियम सबसे पहले किस वर्ष पारित हुआ था?",
        answer:
          "भारत में मूल आपदा प्रबंधन अधिनियम (Disaster Management Act) वर्ष 2005 (23 दिसंबर 2005) में पारित किया गया था, जिसके तहत NDMA, SDMA और DDMA की स्थापना की गई थी।",
      },
      {
        question: "NDMA का अध्यक्ष कौन होता है?",
        answer:
          "राष्ट्रीय आपदा प्रबंधन प्राधिकरण (NDMA) के पदेन अध्यक्ष भारत के प्रधानमंत्री होते हैं। इसी प्रकार राज्य आपदा प्रबंधन प्राधिकरण (SDMA) के अध्यक्ष संबंधित राज्य के मुख्यमंत्री होते हैं।",
      },
      {
        question: "आपदा प्रबंधन (संशोधन) अधिनियम 2025 MPPSC परीक्षा के लिए क्यों महत्वपूर्ण है?",
        answer:
          "यह अधिनियम MPPSC Mains GS Paper 3 (इकाई 5 - आपदा प्रबंधन) तथा GS Paper 4 (Part B इकाई 3 - आपदा प्रबंधन) का सीधा हिस्सा है। इसके अलावा 2025-2026 की प्रारंभिक परीक्षा में 9 अप्रैल 2025 लागू तिथि व धारा 41A पर प्रश्न पूछे जा सकते हैं।",
      },
    ],

    // 8 Exam-focused MCQs (Quizzes) as required for currentAffairs
    mcqs: [
      {
        question: "आपदा प्रबंधन (संशोधन) अधिनियम, 2025 को राष्ट्रपति द्वारा किस तिथि को स्वीकृति प्रदान की गई?",
        options: ["25 मार्च, 2025", "27 मार्च, 2025", "29 मार्च, 2025", "9 अप्रैल, 2025"],
        correctIndex: 2,
        explanation: "आपदा प्रबंधन (संशोधन) अधिनियम 2025 को 25 मार्च को राज्यसभा, 27 मार्च को लोकसभा से पारित होने के बाद 29 मार्च, 2025 को राष्ट्रपति द्रौपदी मुर्मु द्वारा स्वीकृति प्रदान की गई तथा यह 9 अप्रैल 2025 से लागू हुआ।",
      },
      {
        question: "आपदा प्रबंधन (संशोधन) अधिनियम, 2025 के तहत शहरी आपदा प्रबंधन प्राधिकरण (UDMA) की स्थापना हेतु कौन सी नई धारा जोड़ी गई है?",
        options: ["धारा 35B", "धारा 41A", "धारा 50C", "धारा 62A"],
        correctIndex: 1,
        explanation: "राज्यों की राजधानियों और बड़े नगरों के लिए शहरी आपदा प्रबंधन प्राधिकरण (UDMA) गठित करने हेतु अधिनियम में नई धारा 41A (Section 41A) जोड़ी गई है।",
      },
      {
        question: "संशोधन अधिनियम 2025 के अनुसार, किस निकाय को आपदा पश्चात ऑडिट (Post-Disaster Audit) करने का अधिकार दिया गया है?",
        options: ["निजी लेखा परीक्षक", "NDMA (राष्ट्रीय आपदा प्रबंधन प्राधिकरण)", "नीति आयोग", "केंद्रीय सतर्कता आयोग"],
        correctIndex: 1,
        explanation: "अधिनियम की नई व्यवस्था के तहत NDMA को यह अधिकार दिया गया है कि वह बड़ी आपदाओं के बाद राहत, पुनर्वास और तैयारियों की प्रभावशीलता का आपदा पश्चात लेखा परीक्षण (Post-Disaster Audit) कर सके।",
      },
      {
        question: "आपदा प्रबंधन (संशोधन) अधिनियम, 2025 के संबंध में निम्नलिखित कथनों पर विचार कीजिए:\n1. यह अधिनियम 9 अप्रैल, 2025 से लागू हुआ।\n2. इसके तहत NCMC और HLC को वैधानिक दर्जा प्रदान किया गया है।\nसत्य कथन चुनिए:",
        options: ["केवल 1", "केवल 2", "1 और 2 दोनों", "न तो 1 और न ही 2"],
        correctIndex: 2,
        explanation: "दोनों कथन सत्य हैं। यह अधिनियम 9 अप्रैल 2025 से लागू हुआ और राष्ट्रीय संकट प्रबंधन समिति (NCMC) व उच्च स्तरीय समिति (HLC) को वैधानिक दर्जा प्रदान किया गया।",
      },
      {
        question: "मूल आपदा प्रबंधन अधिनियम (Disaster Management Act) किस वर्ष लागू किया गया था?",
        options: ["1999", "2001", "2005", "2010"],
        correctIndex: 2,
        explanation: "भारत में मूल आपदा प्रबंधन अधिनियम वर्ष 2005 में पारित किया गया था, जिसमें 2025 में व्यापक संशोधन किया गया।",
      },
      {
        question: "राज्य आपदा प्रबंधन प्राधिकरण (SDMA) के पदेन अध्यक्ष कौन होते हैं?",
        answer: "राज्य के मुख्यमंत्री",
        options: ["राज्य के राज्यपाल", "राज्य के मुख्यमंत्री", "राज्य के गृह मंत्री", "राज्य के मुख्य सचिव"],
        correctIndex: 1,
        explanation: "SDMA के पदेन अध्यक्ष संबंधित राज्य के मुख्यमंत्री होते हैं, जबकि NDMA के अध्यक्ष भारत के प्रधानमंत्री होते हैं।",
      },
      {
        question: "आपदा प्रबंधन (संशोधन) अधिनियम 2025 का मुख्य उद्देश्य क्या है?",
        options: [
          "केवल आपदा राहत राशि बढ़ाना",
          "आपदा प्रबंधन को प्रतिक्रियात्मक (Reactive) मॉडल से सक्रिय शमन (Proactive Mitigation) एवं जलवायु अनुकूलन मॉडल में बदलना",
          "मौसम विभाग को समाप्त करना",
          "केवल विदेशी सहायता पर निर्भर रहना"
        ],
        correctIndex: 1,
        explanation: "यह संशोधन आपदा प्रबंधन को केवल आपदा के बाद राहत देने के बजाय पूर्व-आपदा जोखिम निम्नीकरण, जलवायु जोखिम आकलन तथा शहरी सुरक्षा रोधी मॉडल पर केंद्रित करता है।",
      },
      {
        question: "MPPSC Mains परीक्षा के किस प्रश्नपत्र में आपदा प्रबंधन (Disaster Management) पाठ्यक्रम का मुख्य भाग है?",
        options: [
          "GS Paper 1 (इतिहास)",
          "GS Paper 2 (राजनीति)",
          "GS Paper 3 (विज्ञान, अर्थशास्त्र व आपदा प्रबंधन Unit 5)",
          "Paper 5 (सामान्य हिंदी)"
        ],
        correctIndex: 2,
        explanation: "MPPSC Mains परीक्षा के GS Paper 3 की Unit 5 तथा GS Paper 4 Part B की Unit 3 में आपदा प्रबंधन विशेष रूप से शामिल है।",
      },
    ],
  };

  console.log("📝 Creating document in Sanity CMS...");
  const res = await client.createOrReplace(articleDoc);
  console.log(`✅ Successfully published article to Sanity CMS! Document ID: ${res._id}`);

  // Auto trigger site revalidation
  console.log("🌐 Triggering live Vercel cache revalidation...");
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
