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

// Helper to convert an array of strings into separate Portable Text blocks
function createBlocks(items: string[]): any[] {
  return items.map((text, idx) => {
    const randomSuffix = Math.random().toString(36).substring(2, 9);

    if (text.startsWith("## ")) {
      return {
        _key: `block-h2-${idx}-${randomSuffix}`,
        _type: "block",
        style: "h2",
        children: [
          {
            _key: `span-h2-${idx}-${randomSuffix}`,
            _type: "span",
            text: text.replace("## ", ""),
          },
        ],
      };
    }

    if (text.startsWith("### ")) {
      return {
        _key: `block-h3-${idx}-${randomSuffix}`,
        _type: "block",
        style: "h3",
        children: [
          {
            _key: `span-h3-${idx}-${randomSuffix}`,
            _type: "span",
            text: text.replace("### ", ""),
          },
        ],
      };
    }

    if (text.startsWith("#### ")) {
      return {
        _key: `block-h4-${idx}-${randomSuffix}`,
        _type: "block",
        style: "h4",
        children: [
          {
            _key: `span-h4-${idx}-${randomSuffix}`,
            _type: "span",
            text: text.replace("#### ", ""),
          },
        ],
      };
    }

    return {
      _key: `block-${idx}-${randomSuffix}`,
      _type: "block",
      style: "normal",
      children: [
        {
          _key: `span-${idx}-${randomSuffix}`,
          _type: "span",
          text: text,
        },
      ],
    };
  });
}

// Helper to create a custom table block
function createTable(key: string, caption: string, headers: string[], rows: string[][]): any {
  return {
    _key: key,
    _type: "table",
    table: {
      caption,
      headers,
      rows,
    },
  };
}

async function main() {
  console.log("🚀 Starting upload process for Golden Spice Mission 2026 Article...");

  // Image file paths in public/images/blog/
  const imagePaths = {
    featured: path.resolve(process.cwd(), "public/images/blog/golden-spice-1.png"),
    farmers: path.resolve(process.cwd(), "public/images/blog/golden-spice-2.png"),
  };

  if (!fs.existsSync(imagePaths.featured) || !fs.existsSync(imagePaths.farmers)) {
    console.error("❌ Required images not found in public/images/blog/");
    process.exit(1);
  }

  // 1. Upload Featured Lakadong Turmeric Image
  console.log("📸 Uploading Lakadong Turmeric image...");
  const assetFeatured = await client.assets.upload("image", fs.createReadStream(imagePaths.featured), {
    filename: "golden_spice_lakadong.png",
  });
  console.log(`✔ Uploaded Featured image. Asset ID: ${assetFeatured._id}`);

  // 2. Upload Farming Image
  console.log("📸 Uploading Meghalaya Farmers image...");
  const assetFarmers = await client.assets.upload("image", fs.createReadStream(imagePaths.farmers), {
    filename: "golden_spice_farmers.png",
  });
  console.log(`✔ Uploaded Farmers image. Asset ID: ${assetFarmers._id}`);

  // Construct the body content
  const bodyTextBeforeTable = [
    "भारत सरकार ने मेघालय की प्रसिद्ध GI-टैग प्राप्त लकाडोंग हल्दी (Lakadong Turmeric) को वैश्विक स्तर पर प्रीमियम मसाला ब्रांड बनाने के लिए ₹175.45 करोड़ की \"मिशन गोल्डन स्पाइस – एकीकृत लकाडोंग हल्दी मूल्य श्रृंखला संवर्धन परियोजना\" की शुरुआत की है। इस मिशन का उद्देश्य किसानों की आय बढ़ाना, निर्यात को प्रोत्साहन देना तथा पूर्वोत्तर भारत को कृषि आधारित आर्थिक विकास का नया केंद्र बनाना है।",
  ];

  const quickFactsTable = createTable(
    "quick-facts-table-golden-spice",
    "त्वरित तथ्य (Quick Facts)",
    ["विवरण", "जानकारी"],
    [
      ["मिशन", "Golden Spice Mission"],
      ["परियोजना लागत", "₹175.45 करोड़"],
      ["अवधि", "2025–2030 (5 वर्ष)"],
      ["राज्य", "मेघालय"],
      ["प्रमुख उत्पाद", "लकाडोंग हल्दी (Lakadong Turmeric)"],
      ["विशेषता", "GI-टैग प्राप्त हल्दी"],
      ["उद्देश्य", "Global Premium Spice Brand विकसित करना"],
    ]
  );

  const bodyTextSection1 = [
    "## चर्चा में क्यों?",
    "• शुभारंभ: केंद्रीय संचार एवं पूर्वोत्तर क्षेत्र विकास (DoNER) मंत्री ज्योतिरादित्य एम. सिंधिया तथा मेघालय के मुख्यमंत्री कॉनराड के. संगमा ने संयुक्त रूप से इस परियोजना का शुभारंभ किया।",
    "• महत्व: यह पहल प्रधानमंत्री के \"आत्मनिर्भर नॉर्थ ईस्ट\" और \"अष्टलक्ष्मी विजन\" को साकार करने की दिशा में एक महत्वपूर्ण कदम मानी जा रही है।",
    "## मिशन गोल्डन स्पाइस क्या है?",
    "• परिभाषा: मिशन गोल्डन स्पाइस मेघालय की GI-टैग प्राप्त लकाडोंग हल्दी की पूरी Value Chain (उत्पादन से निर्यात तक) विकसित करने वाली एक राष्ट्रीय परियोजना है।",
    "### उद्देश्य",
    "• लकाडोंग हल्दी: लकाडोंग हल्दी को वैश्विक प्रीमियम ब्रांड बनाना।",
    "• किसानों की आय: किसानों की आय बढ़ाना।",
    "• Value Addition: कृषि उत्पादों में मूल्य संवर्धन (Value Addition) करना।",
    "• निर्यात: निर्यात योग्य उत्पाद तैयार करना।",
    "• पूर्वोत्तर भारत: पूर्वोत्तर क्षेत्र की अर्थव्यवस्था को मजबूत करना।",
  ];

  const inlineImageBlock1 = {
    _key: "image-block-lakadong",
    _type: "image",
    asset: {
      _type: "reference",
      _ref: assetFeatured._id,
    },
    alt: "Mission Golden Spice Lakadong Turmeric Meghalaya GI Tag Curcumin UPSC MPPSC",
    caption: "₹175.45 करोड़ के मिशन गोल्डन स्पाइस के तहत मेघालय की लकाडोंग हल्दी बनेगी वैश्विक प्रीमियम ब्रांड।",
  };

  const bodyTextSection2 = [
    "## लकाडोंग हल्दी क्यों है विशेष?",
    "• विश्व स्तरीय गुणवत्ता: लकाडोंग हल्दी विश्व की सर्वोत्तम हल्दी किस्मों में मानी जाती है।",
    "### प्रमुख विशेषताएँ",
    "• Curcumin: करक्यूमिन (Curcumin) मात्रा 7–10%।",
    "• विशेषता: विश्व औसत से लगभग चार गुना अधिक।",
    "• औषधीय गुण: औषधीय गुणों से भरपूर।",
    "• गुणवत्ता: उच्च गुणवत्ता एवं विशिष्ट सुगंध।",
    "• जैविक खेती: जैविक खेती के लिए उपयुक्त।",
    "• वैश्विक मांग: अंतरराष्ट्रीय बाजार में प्रीमियम मांग।",
    "## करक्यूमिन (Curcumin) क्या है?",
    "• परिभाषा: Curcumin हल्दी में पाया जाने वाला प्रमुख सक्रिय जैविक यौगिक (Active Compound) है।",
    "### प्रमुख गुण",
    "• शक्तिशाली एंटीऑक्सीडेंट",
    "• सूजनरोधी (Anti-inflammatory)",
    "• रोग प्रतिरोधक क्षमता बढ़ाता है",
    "• औषधि एवं न्यूट्रास्यूटिकल उद्योग में व्यापक उपयोग",
    "## GI टैग क्या है?",
    "• GI = Geographical Indication (भौगोलिक संकेतक)",
    "• परिभाषा: GI टैग ऐसे उत्पादों को दिया जाता है जिनकी गुणवत्ता, प्रतिष्ठा या विशेषता किसी विशेष भौगोलिक क्षेत्र से जुड़ी होती है।",
    "### भारत में",
    "• GI अधिनियम: 1999",
    "• पंजीकरण अवधि: 10 वर्ष",
    "• नवीनीकरण: बाद में नवीनीकरण संभव।",
    "## मिशन के प्रमुख उद्देश्य",
    "• किसानों की आय में वृद्धि",
    "• मूल्य संवर्धन (Value Addition)",
    "• आधुनिक प्रसंस्करण इकाइयों की स्थापना",
    "• कोल्ड चेन एवं भंडारण सुविधा",
    "• ब्रांडिंग एवं GI उत्पादों का वैश्विक प्रचार",
    "• निर्यात बढ़ाना",
    "• ग्रामीण रोजगार सृजन",
    "• महिला सशक्तिकरण",
    "## किन संस्थाओं का सहयोग?",
    "• परियोजना: यह परियोजना कई केंद्रीय एवं राज्य संस्थानों के समन्वय से लागू होगी।",
    "### प्रमुख संस्थाएँ",
    "• DoNER मंत्रालय",
    "• North Eastern Council (NEC)",
    "• APEDA",
    "• Spices Board",
    "• National Turmeric Board",
    "• ICAR",
    "• NABARD",
    "• SFAC",
    "• Meghalaya Government",
  ];

  const inlineImageBlock2 = {
    _key: "image-block-farmers",
    _type: "image",
    asset: {
      _type: "reference",
      _ref: assetFarmers._id,
    },
    alt: "Meghalaya Farmers Harvesting Lakadong Turmeric Golden Spice Mission",
    caption: "मेघालय में जैविक लकाडोंग हल्दी की खेती करते जनजातीय किसान।",
  };

  const bodyTextSection3 = [
    "## मिशन का महत्व",
    "### आर्थिक महत्व",
    "• किसानों को बेहतर मूल्य मिलेगा।",
    "• कृषि निर्यात बढ़ेगा।",
    "• खाद्य प्रसंस्करण उद्योग को बढ़ावा मिलेगा।",
    "• पूर्वोत्तर भारत में निवेश बढ़ेगा।",
    "### सामाजिक महत्व",
    "• महिला स्वयं सहायता समूहों को लाभ।",
    "• ग्रामीण रोजगार में वृद्धि।",
    "• स्थानीय कृषि परंपराओं का संरक्षण।",
    "• जनजातीय किसानों की आय में सुधार।",
    "### सामरिक महत्व",
    "• \"Brand North East\" को वैश्विक पहचान।",
    "• आत्मनिर्भर पूर्वोत्तर की दिशा में बड़ा कदम।",
    "• भारत की कृषि सॉफ्ट पावर मजबूत होगी।",
    "## प्रमुख चुनौतियाँ",
    "• आधुनिक प्रसंस्करण इकाइयों का अभाव।",
    "• कमजोर बाजार संपर्क।",
    "• कोल्ड चेन इंफ्रास्ट्रक्चर की कमी।",
    "• GI उत्पादों की प्रभावी ब्रांडिंग का अभाव।",
    "• मूल्य संवर्धन की सीमित व्यवस्था।",
    "• निर्यात हेतु गुणवत्ता मानकों की चुनौती।",
    "## अष्टलक्ष्मी विजन क्या है?",
    "• परिभाषा: प्रधानमंत्री द्वारा पूर्वोत्तर भारत के समग्र विकास के लिए प्रस्तुत विजन।",
    "### इसके अंतर्गत",
    "• कृषि",
    "• पर्यटन",
    "• उद्योग",
    "• अवसंरचना",
    "• कौशल विकास",
    "• निर्यात",
    "• कनेक्टिविटी",
    "• उद्यमिता",
    "• उद्देश्य: को बढ़ावा देकर पूर्वोत्तर राज्यों को भारत के विकास का प्रमुख केंद्र बनाया जा रहा है।",
    "## Exam Point Facts",
    "• मिशन लागत: ₹175.45 करोड़",
    "• राज्य: मेघालय",
    "• उत्पाद: लकाडोंग हल्दी",
    "• Curcumin: 7–10%",
    "• विशेषता: GI-टैग प्राप्त हल्दी",
    "• अवधि: 2025–2030",
    "• लागू करने वाला प्रमुख मंत्रालय: DoNER",
    "• Vision: Atmanirbhar North East",
    "• Brand Initiative: Golden Spice Mission",
    "## Full Forms",
    "• GI: Geographical Indication (भौगोलिक संकेतक)",
    "• DoNER: Ministry of Development of North Eastern Region (पूर्वोत्तर क्षेत्र विकास मंत्रालय)",
    "• NEC: North Eastern Council",
    "• APEDA: Agricultural and Processed Food Products Export Development Authority",
    "• ICAR: Indian Council of Agricultural Research",
    "• NABARD: National Bank for Agriculture and Rural Development",
    "• SFAC: Small Farmers' Agribusiness Consortium",
    "## UPSC / MPPSC Mains Value Addition",
    "• मुख्य बिंदु: मिशन गोल्डन स्पाइस केवल एक कृषि परियोजना नहीं, बल्कि पूर्वोत्तर भारत में मूल्य संवर्धन, GI उत्पादों के वैश्विक ब्रांड निर्माण, महिला सशक्तिकरण, कृषि निर्यात वृद्धि और किसानों की आय दोगुनी करने की दिशा में एक समग्र विकास मॉडल है। यह 'वोकल फॉर लोकल' और 'आत्मनिर्भर भारत' की अवधारणा को भी सशक्त बनाता है।",
    "## Quick Revision",
    "• मिशन → Golden Spice Mission",
    "• राज्य → मेघालय",
    "• प्रमुख उत्पाद → लकाडोंग हल्दी",
    "• Curcumin → 7–10%",
    "• परियोजना लागत → ₹175.45 करोड़",
    "• अवधि → 2025–2030",
    "• GI टैग → Geographical Indication",
    "• प्रमुख मंत्रालय → DoNER",
    "• Vision → Atmanirbhar North East",
    "## One-Liner (UPSC/MPPSC)",
    "\"मिशन गोल्डन स्पाइस (Golden Spice Mission) भारत सरकार की एकीकृत मूल्य श्रृंखला परियोजना है, जिसका उद्देश्य मेघालय की GI-टैग प्राप्त लकाडोंग हल्दी को वैश्विक प्रीमियम मसाला ब्रांड के रूप में विकसित करना, किसानों की आय बढ़ाना तथा पूर्वोत्तर भारत में कृषि आधारित आर्थिक विकास को बढ़ावा देना है।\"",
  ];

  const fullBody = [
    ...createBlocks(bodyTextBeforeTable),
    quickFactsTable,
    ...createBlocks(bodyTextSection1),
    inlineImageBlock1,
    ...createBlocks(bodyTextSection2),
    inlineImageBlock2,
    ...createBlocks(bodyTextSection3),
  ];

  const faqs = [
    {
      question: "'मिशन गोल्डन स्पाइस' (Golden Spice Mission) का संबंध किस GI-टैग प्राप्त उत्पाद से है?",
      answer: "मिशन गोल्डन स्पाइस का संबंध मेघालय की GI-टैग प्राप्त लकाडोंग हल्दी (Lakadong Turmeric) से है।",
    },
    {
      question: "मिशन गोल्डन स्पाइस किस राज्य में लागू किया गया है और इसकी कुल परियोजना लागत कितनी है?",
      answer: "यह मिशन मेघालय राज्य में लागू किया गया है और इसकी कुल परियोजना लागत ₹175.45 करोड़ है।",
    },
    {
      question: "लकाडोंग हल्दी में करक्यूमिन (Curcumin) की मात्रा कितनी होती है?",
      answer: "लकाडोंग हल्दी में करक्यूमिन की मात्रा 7–10% पाई जाती है, जो कि विश्व औसत से लगभग चार गुना अधिक है।",
    },
    {
      question: "मिशन गोल्डन स्पाइस का क्रियान्वयन किस अवधि के लिए किया जा रहा है?",
      answer: "इस मिशन का क्रियान्वयन 5 वर्षों की अवधि (2025–2030) के लिए किया जा रहा है।",
    },
    {
      question: "करक्यूमिन (Curcumin) क्या है और इसके मुख्य गुण क्या हैं?",
      answer: "करक्यूमिन हल्दी में पाया जाने वाला प्रमुख सक्रिय जैविक यौगिक (Active Compound) है, जो शक्तिशाली एंटीऑक्सीडेंट, सूजनरोधी (Anti-inflammatory) और इम्युनिटी बढ़ाने वाले गुणों से युक्त होता है।",
    },
    {
      question: "भारत में भौगोलिक संकेतक (GI Tag) किस अधिनियम के तहत दिया जाता है और इसकी वैधता कितनी होती है?",
      answer: "भारत में GI टैग 1999 के अधिनियम के तहत दिया जाता है तथा इसकी प्रारंभिक पंजीकरण अवधि 10 वर्ष होती है, जिसे बाद में नवीनीकृत कराया जा सकता है।",
    },
    {
      question: "मिशन गोल्डन स्पाइस का शुभारंभ किन प्रमुख नेताओं द्वारा किया गया?",
      answer: "केंद्रीय DoNER मंत्री ज्योतिरादित्य एम. सिंधिया तथा मेघालय के मुख्यमंत्री कॉनराड के. संगमा द्वारा संयुक्त रूप से इसका शुभारंभ किया गया।",
    },
    {
      question: "अष्टलक्ष्मी विजन (Ashtalakshmi Vision) क्या है?",
      answer: "यह प्रधानमंत्री द्वारा पूर्वोत्तर भारत के 8 राज्यों के समग्र विकास (कृषि, पर्यटन, कनेक्टिविटी, उद्योग आदि) को गति देने के लिए प्रस्तुत किया गया एक विशेष विजन है।",
    },
  ];

  const mcqs = [
    {
      question: "'मिशन गोल्डन स्पाइस' (Golden Spice Mission) का संबंध निम्नलिखित में से किस GI-टैग प्राप्त उत्पाद से है?",
      options: ["लक्षद्वीप नारियल", "लकाडोंग हल्दी", "नागपुर संतरा", "कश्मीर केसर"],
      correctIndex: 1,
      explanation: "मिशन गोल्डन स्पाइस का संबंध मेघालय की GI-टैग प्राप्त लकाडोंग हल्दी (Lakadong Turmeric) से है, जिसे वैश्विक प्रीमियम मसाला ब्रांड के रूप में विकसित किया जा रहा है।",
    },
    {
      question: "मेघालय की लकाडोंग हल्दी में करक्यूमिन (Curcumin) का प्रतिशत कितना होता है?",
      options: ["1–2%", "3–4%", "7–10%", "12–15%"],
      correctIndex: 2,
      explanation: "लकाडोंग हल्दी में करक्यूमिन की मात्रा 7–10% होती है, जो विश्व की सामान्य हल्दी किस्मों के औसत से लगभग चार गुना अधिक है।",
    },
    {
      question: "₹175.45 करोड़ की 'मिशन गोल्डन स्पाइस' परियोजना की कार्यान्वयन अवधि क्या रखी गई है?",
      options: ["2024–2027 (3 वर्ष)", "2025–2030 (5 वर्ष)", "2026–2031 (5 वर्ष)", "2025–2035 (10 वर्ष)"],
      correctIndex: 1,
      explanation: "मिशन गोल्डन स्पाइस परियोजना की अवधि 5 वर्ष (2025 से 2030) निर्धारित की गई है।",
    },
    {
      question: "हाल ही में मिशन गोल्डन स्पाइस का शुभारंभ केंद्रीय DoNER मंत्री ज्योतिरादित्य एम. सिंधिया के साथ किस राज्य के मुख्यमंत्री ने किया?",
      options: ["असम", "मणिपुर", "मेघालय", "नागालैंड"],
      correctIndex: 2,
      explanation: "मेघालय के मुख्यमंत्री कॉनराड के. संगमा तथा केंद्रीय DoNER मंत्री ज्योतिरादित्य एम. सिंधिया ने संयुक्त रूप से इसका शुभारंभ किया।",
    },
    {
      question: "भारत में भौगोलिक संकेतक (Geographical Indication - GI Tag) अधिनियम किस वर्ष पारित किया गया था?",
      options: ["1995", "1999", "2003", "2005"],
      correctIndex: 1,
      explanation: "भारत में भौगोलिक संकेतक (पंजीकरण और संरक्षण) अधिनियम 1999 में पारित किया गया था, जिसके तहत GI टैग 10 वर्षों के लिए प्रदान किया जाता है।",
    },
    {
      question: "हल्दी में पाया जाने वाला कौन सा प्रमुख जैविक यौगिक इसे औषधीय गुण और एंटीऑक्सीडेंट विशेषताएँ प्रदान करता है?",
      options: ["कैफीन", "करक्यूमिन (Curcumin)", "निकोटिन", "कैपेसाइसिन"],
      correctIndex: 1,
      explanation: "करक्यूमिन हल्दी में पाया जाने वाला मुख्य सक्रिय यौगिक है जो सूजनरोधी और एंटीऑक्सीडेंट गुणों के लिए जाना जाता है।",
    },
    {
      question: "निम्नलिखित में से कौन सी संस्था 'मिशन गोल्डन स्पाइस' के कार्यान्वयन और मूल्य संवर्धन में सहयोगी नहीं है?",
      options: ["APEDA", "Spices Board", "NABARD", "ISRO"],
      correctIndex: 3,
      explanation: "मिशन में DoNER, NEC, APEDA, Spices Board, ICAR, NABARD, SFAC और मेघालय सरकार शामिल हैं। ISRO इसमें शामिल नहीं है।",
    },
    {
      question: "पूर्वोत्तर भारत के 8 राज्यों के एकीकृत विकास के लिए केंद्र सरकार द्वारा प्रयुक्त शब्द कौन सा है?",
      options: ["अष्टलक्ष्मी विजन (Ashtalakshmi Vision)", "पूर्वोदय योजना", "अष्टविनायक मिशन", "सप्तऋषि विजन"],
      correctIndex: 0,
      explanation: "पूर्वोत्तर के आठ राज्यों के विकास के लिए प्रधानमंत्री द्वारा 'अष्टलक्ष्मी विजन' की अवधारणा प्रस्तुत की गई है।",
    },
  ];

  const articleDoc = {
    _id: "ca-golden-spice-mission-lakadong-turmeric-2026",
    _type: "currentAffairs",
    slug: { _type: "slug", current: "golden-spice-mission-lakadong-turmeric-2026" },
    title: "गोल्डन स्पाइस मिशन 2026 (Golden Spice Mission): मेघालय की लकाडोंग हल्दी, उद्देश्य, महत्व | MPPSC, UPSC",
    titleEn: "Mission Golden Spice 2026: Meghalaya Lakadong Turmeric, Curcumin & Exam Notes | UPSC, MPPSC | Aakar IAS",
    excerpt: "मिशन गोल्डन स्पाइस (Golden Spice Mission 2026) की परियोजना लागत ₹175.45 करोड़, मेघालय की लकाडोंग हल्दी, करक्यूमिन 7–10%, MCQs एवं MPPSC, UPSC परीक्षा हेतु सम्पूर्ण जानकारी पढ़ें।",
    excerptEn: "Mission Golden Spice was launched with an outlay of ₹175.45 crore to develop Meghalaya's GI-tagged Lakadong Turmeric (7-10% curcumin) as a global premium spice brand.",
    ca_date: "2026-07-26",
    publishedAt: new Date().toISOString(),
    featured: true,
    readingTime: 6,
    featuredImage: {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: assetFeatured._id,
      },
      alt: "Mission Golden Spice Lakadong Turmeric Meghalaya GI Tag Curcumin UPSC MPPSC",
      caption: "₹175.45 करोड़ के मिशन गोल्डन स्पाइस के तहत मेघालय की लकाडोंग हल्दी बनेगी वैश्विक प्रीमियम ब्रांड।",
    },
    mainImage: {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: assetFeatured._id,
      },
      alt: "Mission Golden Spice Lakadong Turmeric Meghalaya GI Tag Curcumin UPSC MPPSC",
      caption: "₹175.45 करोड़ के मिशन गोल्डन स्पाइस के तहत मेघालय की लकाडोंग हल्दी बनेगी वैश्विक प्रीमियम ब्रांड।",
    },
    keywords: [
      "Golden Spice Mission 2026",
      "मिशन गोल्डन स्पाइस",
      "Lakadong Turmeric Meghalaya",
      "लकाडोंग हल्दी करक्यूमिन",
      "Curcumin 7-10 percentage",
      "DoNER Ministry Jyotiraditya Scindia",
      "Conrad Sangma Meghalaya",
      "Ashtalakshmi Vision North East",
      "GI Tag Turmeric India",
      "UPSC Agriculture Current Affairs",
      "MPPSC Current Affairs 2026",
    ],
    body: fullBody,
    faqs,
    mcqs,
  };

  console.log("📝 Creating/updating article in Sanity CMS...");
  const res = await client.createOrReplace(articleDoc);
  console.log(`✅ Successfully uploaded Golden Spice Mission article! Document ID: ${res._id}`);
}

main().catch((err) => {
  console.error("❌ Failed to upload article:", err);
  process.exit(1);
});
