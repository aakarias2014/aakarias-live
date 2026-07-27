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
  console.log("🚀 Starting upload/sync process for Bio-fertilizers (जैव-उर्वरक) Static GK Article...");

  // Source images from public/images/blog/
  const publicBlogDir = path.resolve(process.cwd(), "public/images/blog");

  if (!fs.existsSync(publicBlogDir)) {
    fs.mkdirSync(publicBlogDir, { recursive: true });
  }

  const imageFiles = {
    nodules: path.join(publicBlogDir, "bio_fertilizer_rhizobium_nodules.png"),
    liquid: path.join(publicBlogDir, "liquid_biofertilizer_drip_irrigation.png"),
    pranam: path.join(publicBlogDir, "pm_pranam_sustainable_agriculture.png"),
  };

  // Check if images exist
  if (!fs.existsSync(imageFiles.nodules) || !fs.existsSync(imageFiles.liquid) || !fs.existsSync(imageFiles.pranam)) {
    console.error("❌ Required images not found in public/images/blog!");
    process.exit(1);
  }

  // 1. Upload Nodules Image
  console.log("📸 Uploading Rhizobium root nodules image...");
  const assetNodules = await client.assets.upload("image", fs.createReadStream(imageFiles.nodules), {
    filename: "bio_fertilizer_rhizobium_nodules.png",
  });
  console.log(`✔ Uploaded Root Nodules image. Asset ID: ${assetNodules._id}`);

  // 2. Upload Liquid Biofertilizers Image
  console.log("📸 Uploading Liquid Bio-fertilizers drip irrigation image...");
  const assetLiquid = await client.assets.upload("image", fs.createReadStream(imageFiles.liquid), {
    filename: "liquid_biofertilizer_drip_irrigation.png",
  });
  console.log(`✔ Uploaded Liquid Bio-fertilizer image. Asset ID: ${assetLiquid._id}`);

  // 3. Upload PM-PRANAM Image
  console.log("📸 Uploading PM-PRANAM sustainable agriculture image...");
  const assetPranam = await client.assets.upload("image", fs.createReadStream(imageFiles.pranam), {
    filename: "pm_pranam_sustainable_agriculture.png",
  });
  console.log(`✔ Uploaded PM-PRANAM image. Asset ID: ${assetPranam._id}`);

  // 4. Construct the Article document with complete SEO optimization
  const article = {
    _id: "gk-bio-fertilizers-in-hindi",
    _type: "staticGk",
    slug: { _type: "slug", current: "bio-fertilizers-in-hindi-types-benefits-pm-pranam" },
    title: "जैव-उर्वरक (Bio-fertilizers): क्या हैं, प्रकार, FCO दिशानिर्देश, लाभ एवं PM-PRANAM योजना | MPPSC & UPSC Notes",
    titleEn: "Bio-fertilizers in Hindi: Types, FCO Guidelines, Working, Agricultural Benefits & PM-PRANAM | MPPSC & UPSC Notes",
    excerpt: "जैव-उर्वरक (Bio-fertilizers) क्या हैं? जानिए जैव-उर्वरक के प्रकार (Rhizobium, Azotobacter, PSB, VAM), फर्टिलाइजर कंट्रोल ऑर्डर (FCO Guidelines), कृषि में महत्व, स्थानीय जैव-उर्वरक इकाई और PM-PRANAM योजना। MPPSC एवं UPSC परीक्षा हेतु संपूर्ण नोट्स।",
    excerptEn: "Complete guide on Bio-fertilizers in Hindi: Types (N2 fixers, PSB, KSB, VAM), Fertilizer Control Order (FCO) guidelines, agricultural importance, local biopesticide production units, PM-PRANAM & PKVY schemes for MPPSC and UPSC exams.",
    ca_date: "2026-07-27",
    publishedAt: new Date().toISOString(),
    featured: true,
    readingTime: 10,
    keywords: [
      "Bio-fertilizers",
      "Biofertilizers in hindi",
      "Biofertilizers in hindi pdf",
      "जैव-उर्वरक",
      "जैव उर्वरक क्या है",
      "जैव उर्वरक के प्रकार",
      "Types of biofertilizers in hindi",
      "जैव उर्वरक का महत्व",
      "जैव उर्वरक क्या है कृषि में इसका क्या महत्व है",
      "जैव उर्वरक के नाम",
      "जैव उर्वरक क्या है उदाहरण दीजिए",
      "जैव उर्वरक क्या है इसके प्रकार एवं महत्व बताइए",
      "FCO guidelines for biofertilizers",
      "Fertilizer Control Order biofertilizer",
      "Fertilizer Control Order 1985 pdf",
      "Fertilizer Control Order 2024 2025 PDF",
      "FCO biofertilizer quality standards",
      "स्थानीय जैव उर्वरक जैव कीटनाशी इकाई का भ्रमण pdf",
      "Rhizobium in Hindi",
      "PSB Bacteria",
      "VAM Mycorrhiza",
      "PM-PRANAM Yojana",
      "PKVY Scheme",
      "Liquid Bio-fertilizer Technology",
      "Bio-fertilizers vs Chemical Fertilizers",
      "MPPSC Bio-fertilizers",
      "MPPSC Science and Technology Paper 3",
      "MPPSC Agriculture",
      "MPPSC Environment",
      "UPSC Environment"
    ],
    category: { _type: "reference", _ref: "cat-environment" },
    author: { _type: "reference", _ref: "author-aakar" },
    tags: [
      { _type: "reference", _ref: "tag-mppsc" },
      { _type: "reference", _ref: "tag-upsc" },
      { _type: "reference", _ref: "tag-prelims" },
      { _type: "reference", _ref: "tag-mains" },
    ],
    syllabus: ["GS-3", "MPPSC Paper-3 Unit-7", "MPPSC Paper-3 Unit-10", "Prelims-GS"],
    featuredImage: {
      _type: "image",
      asset: { _type: "reference", _ref: assetNodules._id },
      alt: "Legume plant roots with Rhizobium root nodules in rich dark soil representing bio-fertilizers for MPPSC and UPSC",
    },

    /* ─── SECTIONS ──────────────────────────────────────────────── */
    sections: [
      /* ── 1. Definition & Core Concept with Examples ──────────── */
      {
        _key: "sec-definition",
        kind: "whyInNews",
        title: "जैव-उर्वरक (Bio-fertilizers) क्या हैं? परिभाषा एवं उदाहरण",
        titleEn: "What are Bio-fertilizers? Definition & Examples",
        body: [
          {
            _key: "b1-1", _type: "block", style: "normal",
            children: [{ _key: "s1-1", _type: "span", text: "जैव-उर्वरक (Bio-fertilizers) ऐसे प्राकृतिक उत्पाद होते हैं जिनमें **जीवित सूक्ष्मजीव (Living Microorganisms)** (जैसे जीवाणु, कवक एवं नील-हरित शैवाल) पाए जाते हैं। जब इन्हें **बीज, पौधों की जड़ों या मृदा** में मिलाया जाता है, तो ये पौधों के लिए आवश्यक पोषक तत्वों (जैसे नाइट्रोजन, फॉस्फोरस एवं पोटेशियम) की उपलब्धता को बढ़ाते हैं तथा प्राकृतिक रूप से **मृदा की उर्वरता (Soil Fertility)** में सुधार करते हैं।" }],
          },
          {
            _key: "b1-2", _type: "block", style: "normal",
            children: [{ _key: "s1-2", _type: "span", text: "इन्हें **\"जैविक पोषक तत्व परिवर्तक\" (Biological Nutrient Converter)** भी कहा जाता है क्योंकि ये वायुमंडलीय मुक्त नाइट्रोजन को पौधों द्वारा ग्रहण करने योग्य रूप (अमोनिया/नाइट्रेट) में स्थिर करते हैं तथा मृदा में अघुलनशील खनिजों को घोलकर सुलभ बनाते हैं।" }],
          },
          {
            _key: "b1-h1", _type: "block", style: "h3",
            children: [{ _key: "sh1-1", _type: "span", text: "जैव-उर्वरक के मुख्य उदाहरण (Key Examples of Bio-fertilizers)" }],
          },
          {
            _key: "b1-3", _type: "block", style: "normal",
            children: [{ _key: "s1-3", _type: "span", text: "• **राइजोबियम (Rhizobium)**: दलहनी फसलों (जैसे चना, अरहर, मूंग, सोयाबीन) की जड़ों की ग्रंथियों में पाया जाने वाला सहजीवी जीवाणु।" }],
          },
          {
            _key: "b1-4", _type: "block", style: "normal",
            children: [{ _key: "s1-4", _type: "span", text: "• **एज़ोटोबैक्टर (Azotobacter)**: गेहूं, धान, मक्का जैसी गैर-दलहनी फसलों के लिए मुक्तजीवी (Free-living) नाइट्रोजन स्थिरीकारक जीवाणु।" }],
          },
          {
            _key: "b1-5", _type: "block", style: "normal",
            children: [{ _key: "s1-5", _type: "span", text: "• **एज़ोस्पिरिलम (Azospirillum)**: ज्वार, बाजरा, गन्ना एवं घास कुल के पौधों हेतु सहयोगी नाइट्रोजन स्थिरीकारक।" }],
          },
          {
            _key: "b1-6", _type: "block", style: "normal",
            children: [{ _key: "s1-6", _type: "span", text: "• **PSB (Phosphate Solubilizing Bacteria)**: मृदा में जमे अघुलनशील फॉस्फेट को घोलने वाले जीवाणु (उदा. *Pseudomonas striata*, *Bacillus megaterium*)।" }],
          },
          {
            _key: "b1-7", _type: "block", style: "normal",
            children: [{ _key: "s1-7", _type: "span", text: "• **VAM माइकोराइजा (Vesicular Arbuscular Mycorrhiza)**: पौधों की जड़ों से जुड़कर जल एवं फॉस्फोरस अवशोषण बढ़ाने वाला कवक।" }],
          },
          {
            _key: "b1-8", _type: "block", style: "normal",
            children: [{ _key: "s1-8", _type: "span", text: "• **नील-हरित शैवाल (BGA / Anabaena-Azolla)**: जलमग्न धान के खेतों में उपयोग किया जाने वाला जैविक नाइट्रोजन स्रोत।" }],
          },
          {
            _key: "b1-img", _type: "image",
            asset: { _type: "reference", _ref: assetNodules._id },
            alt: "Legume root nodules with Rhizobium bacteria illustrating biofertilizers definition and examples for MPPSC and UPSC",
          },
        ],
        bodyEn: [
          {
            _key: "b1-9", _type: "block", style: "normal",
            children: [{ _key: "s1-9", _type: "span", text: "Bio-fertilizers are formulations containing living microorganisms (bacteria, fungi, blue-green algae) that enhance nutrient availability (N, P, K) to plants and improve soil fertility naturally when applied to seeds, plant surfaces, or soil." }],
          },
        ],
      },

      /* ── 2. Detailed Classification & Types ─────────────────── */
      {
        _key: "sec-types",
        kind: "background",
        title: "जैव-उर्वरक के प्रकार (Types of Bio-fertilizers in Hindi)",
        titleEn: "Types of Bio-fertilizers",
        body: [
          {
            _key: "b2-intro", _type: "block", style: "normal",
            children: [{ _key: "s2-in", _type: "span", text: "जैव-उर्वरकों को उनके **कार्य करने के तरीके और पोषक तत्व प्रदान करने की क्षमता** के आधार पर निम्नलिखित प्रमुख श्रेणियों में विभाजित किया जाता है:" }],
          },
          {
            _key: "b2-h1", _type: "block", style: "h3",
            children: [{ _key: "sh2-1", _type: "span", text: "1. नाइट्रोजन-स्थिरीकरण जैव-उर्वरक (Nitrogen-Fixing Bio-fertilizers)" }],
          },
          {
            _key: "b2-1", _type: "block", style: "normal",
            children: [{ _key: "s2-1", _type: "span", text: "• **सहजीवी (Symbiotic N2 Fixers)**: राइजोबियम (Rhizobium) जो दलहनी फसलों की जड़ों में ग्रंथि (Nodules) बनाकर नाइट्रोजन स्थिर करता है।" }],
          },
          {
            _key: "b2-2", _type: "block", style: "normal",
            children: [{ _key: "s2-2", _type: "span", text: "• **मुक्तजीवी (Free-living N2 Fixers)**: एज़ोटोबैक्टर (Azotobacter), क्लॉस्ट्रिडियम (Clostridium) जो स्वतंत्र रूप से मृदा में रहकर नाइट्रोजन स्थिर करते हैं।" }],
          },
          {
            _key: "b2-3", _type: "block", style: "normal",
            children: [{ _key: "s2-3", _type: "span", text: "• **सहयोगी सहजीवी (Associative Symbiotic N2 Fixers)**: एज़ोस्पिरिलम (Azospirillum) जो जड़ों के बाहरी सतह पर रहकर कार्य करता है।" }],
          },
          {
            _key: "b2-4", _type: "block", style: "normal",
            children: [{ _key: "s2-4", _type: "span", text: "• **नील-हरित शैवाल एवं एजोला (BGA & Azolla)**: *Anabaena azollae* का जलीय फर्ना एजोला के साथ सहजीवन, जो धान की फसल हेतु अत्यंत लाभकारी है।" }],
          },
          {
            _key: "b2-h2", _type: "block", style: "h3",
            children: [{ _key: "sh2-2", _type: "span", text: "2. फॉस्फोरस घुलनशील एवं गतिमान जैव-उर्वरक (Phosphorus Solubilizing & Mobilizing)" }],
          },
          {
            _key: "b2-5", _type: "block", style: "normal",
            children: [{ _key: "s2-5", _type: "span", text: "• **फॉस्फेट घुलनशील जीवाणु (PSB)**: *Bacillus subtilis*, *Pseudomonas striata* जो मिट्टी के अघुलनशील फॉस्फेट को साइट्रिक या मैलिक अम्ल छोड़कर घोलते हैं।" }],
          },
          {
            _key: "b2-6", _type: "block", style: "normal",
            children: [{ _key: "s2-6", _type: "span", text: "• **फॉस्फेट घुलनशील कवक (PSF)**: *Aspergillus niger*, *Penicillium* कवक जो फॉस्फेट को उपलब्ध कराते हैं।" }],
          },
          {
            _key: "b2-7", _type: "block", style: "normal",
            children: [{ _key: "s2-7", _type: "span", text: "• **फॉस्फेट गतिमान माइकोराइजा (VAM)**: *Glomus* कवक जो कवकजाल (Hyphae) द्वारा दूर-दराज के फॉस्फोरस एवं सूक्ष्म पोषक तत्वों को खींचकर जड़ों तक पहुंचाते हैं।" }],
          },
          {
            _key: "b2-h3", _type: "block", style: "h3",
            children: [{ _key: "sh2-3", _type: "span", text: "3. पोटेशियम घुलनशील जैव-उर्वरक (Potassium Solubilizing Bio-fertilizers - KSB)" }],
          },
          {
            _key: "b2-8", _type: "block", style: "normal",
            children: [{ _key: "s2-8", _type: "span", text: "• **KSB जीवाणु**: *Frateuria aurantia* जैसे जीवाणु जो मृदा के सिलिकेट एवं माइका खनिजों से पोटेशियम को मुक्त करते हैं।" }],
          },
          {
            _key: "b2-h4", _type: "block", style: "h3",
            children: [{ _key: "sh2-4", _type: "span", text: "4. पादप वृद्धि वर्धक राइजोबैक्टीरिया (PGPR - Plant Growth Promoting Rhizobacteria)" }],
          },
          {
            _key: "b2-9", _type: "block", style: "normal",
            children: [{ _key: "s2-9", _type: "span", text: "• **PGPR कार्य**: ऑक्सिन (Auxin), जिबरेलिन (Gibberellin) जैसे पादप हार्मोन का स्राव कर जड़ों के विकास को प्रेरित करना।" }],
          },
          {
            _key: "b2-10", _type: "block", style: "normal",
            children: [{ _key: "s2-10", _type: "span", text: "• **रोग नियंत्रण**: सिडेरोफोर (Siderophore) बनाकर हानिकारक रोगजनकों को रोकते हैं।" }],
          },
        ],
        bodyEn: [
          {
            _key: "b2-11", _type: "block", style: "normal",
            children: [{ _key: "s2-11", _type: "span", text: "Detailed taxonomy of bio-fertilizers classified into N2 fixers (Rhizobium, Azotobacter, Azospirillum, BGA), P solubilizers/mobilizers (PSB, VAM), K solubilizers (KSB), and Plant Growth Promoting Rhizobacteria (PGPR)." }],
          },
        ],
      },

      /* ── 3. FCO Guidelines & Quality Control Standards ────────── */
      {
        _key: "sec-fco-guidelines",
        kind: "keyHighlights",
        title: "फर्टिलाइजर कंट्रोल ऑर्डर (FCO Guidelines for Biofertilizers)",
        titleEn: "Fertilizer Control Order (FCO) Guidelines for Biofertilizers",
        body: [
          {
            _key: "b3-intro", _type: "block", style: "normal",
            children: [{ _key: "s3-in", _type: "span", text: "भारत सरकार द्वारा **उर्वरक नियंत्रण आदेश, 1985 (Fertilizer Control Order - FCO 1985)** और इसके नवीनतम संशोधनों (2023, 2024 व 2025 updates) के तहत जैव-उर्वरकों को वैधानिक गुणवत्ता नियंत्रण के दायरे में शामिल किया गया है। FCO का मुख्य उद्देश्य किसानों को उच्च गुणवत्तायुक्त एवं मानक जैव-उर्वरक उपलब्ध कराना है।" }],
          },
          {
            _key: "b3-h1", _type: "block", style: "h3",
            children: [{ _key: "sh3-1", _type: "span", text: "1. FCO के तहत जैव-उर्वरकों के वैधानिक मानकीकरण मानदंड (Mandatory FCO Standards)" }],
          },
          {
            _key: "b3-1", _type: "block", style: "normal",
            children: [{ _key: "s3-1", _type: "span", text: "• **सूक्ष्मजीवों की न्यूनतम संख्या (Minimum Microbial Load)**: वाहक आधारित (Carrier-based) जैव-उर्वरकों में कम से कम **$10^7$ CFU (Colony Forming Units) प्रति ग्राम** तथा तरल जैव-उर्वरकों (Liquid Biofertilizers) में न्यूनतम **$10^8$ CFU प्रति मिलीलीटर** होना अनिवार्य है।" }],
          },
          {
            _key: "b3-2", _type: "block", style: "normal",
            children: [{ _key: "s3-2", _type: "span", text: "• **संदूषण सीमा (Contamination Limit)**: संदूषक सूक्ष्मजीवों (Contaminants) की संख्या $10^5$ प्रति ग्राम/मिलीलीटर से अधिक नहीं होनी चाहिए (10^-5 तनुकरण पर कोई संदूषण नहीं)।" }],
          },
          {
            _key: "b3-3", _type: "block", style: "normal",
            children: [{ _key: "s3-3", _type: "span", text: "• **pH मान सीमा (pH Range)**: वाहक आधारित जैव-उर्वरकों का pH मान **6.5 से 7.5** के मध्य स्थिर होना आवश्यक है।" }],
          },
          {
            _key: "b3-4", _type: "block", style: "normal",
            children: [{ _key: "s3-4", _type: "span", text: "• **शेल्फ-लाइफ (Shelf Life Norms)**: चूर्ण/वाहक आधारित जैव-उर्वरकों की न्यूनतम शेल्फ-लाइफ निर्माण तिथि से **6 माह** तथा तरल जैव-उर्वरकों की न्यूनतम शेल्फ-लाइफ **12 से 24 माह** होना FCO नियमों के अनुसार अनिवार्य है।" }],
          },
          {
            _key: "b3-5", _type: "block", style: "normal",
            children: [{ _key: "s3-5", _type: "span", text: "• **कण आकार (Particle Size)**: वाहक पदार्थ (जैसे लिग्नाइट/पीट चूर्ण) का कण आकार 0.15 से 0.21 मिमी (75-100 मेष छलनी) से होकर गुजरना चाहिए।" }],
          },
          {
            _key: "b3-h2", _type: "block", style: "h3",
            children: [{ _key: "sh2-2", _type: "span", text: "2. FCO अनुसूची में अधिसूचित प्रमुख जैव-उर्वरक स्ट्रेन" }],
          },
          {
            _key: "b3-6", _type: "block", style: "normal",
            children: [{ _key: "s3-6", _type: "span", text: "• **अधिसूचित 10+ जैव-उर्वरक**: FCO के तहत Rhizobium, Azotobacter, Azospirillum, PSB, Mycorrhiza, KSB, Zinc Solubilizing Bacteria (ZSB), Phosphate Solubilizing Fungal cultures को आधिकारिक मान्यता प्राप्त है।" }],
          },
          {
            _key: "b3-7", _type: "block", style: "normal",
            children: [{ _key: "s3-7", _type: "span", text: "• **लैब परीक्षण व प्रयोगशाला जाँच**: प्रत्येक निर्माण इकाई हेतु FCO लाइसेंस प्राप्त करना और राज्य उर्वरक प्रयोगशाला से गुणवत्ता प्रमाण पत्र प्राप्त करना अनिवार्य है।" }],
          },
        ],
        bodyEn: [
          {
            _key: "b3-8", _type: "block", style: "normal",
            children: [{ _key: "s3-8", _type: "span", text: "Comprehensive Fertilizer Control Order (FCO 1985 & recent amendments) statutory guidelines for Bio-fertilizers: Minimum microbial count ($10^7$ CFU/g carrier, $10^8$ CFU/mL liquid), pH range 6.5-7.5, maximum allowable contamination limit ($10^5$), particle size specs, and shelf-life compliance." }],
          },
        ],
      },

      /* ── 4. Importance & Role in Agriculture ──────────────────── */
      {
        _key: "sec-importance",
        kind: "impact",
        title: "जैव-उर्वरक का महत्व एवं कृषि में उपयोग (Importance of Bio-fertilizers)",
        titleEn: "Importance and Role of Bio-fertilizers in Agriculture",
        body: [
          {
            _key: "b4-h1", _type: "block", style: "h3",
            children: [{ _key: "sh4-1", _type: "span", text: "1. मृदा स्वास्थ्य एवं संरचना में सुधार (Soil Health Restoration)" }],
          },
          {
            _key: "b4-1", _type: "block", style: "normal",
            children: [{ _key: "s4-1", _type: "span", text: "• **जैविक पदार्थ में वृद्धि**: मिट्टी में ह्यूमस और कार्बनिक कार्बन का स्तर बढ़ाते हैं।" }],
          },
          {
            _key: "b4-2", _type: "block", style: "normal",
            children: [{ _key: "s4-2", _type: "span", text: "• **सूक्ष्मजीव पारिस्थितिकी**: मिट्टी की जैविक संरचना और लाभकारी जीवाणुओं की संख्या को पुनर्स्थापित करते हैं।" }],
          },
          {
            _key: "b4-h2", _type: "block", style: "h3",
            children: [{ _key: "sh4-2", _type: "span", text: "2. फसल उत्पादकता में वृद्धि एवं लागत में कमी (Yield Boost & Cost Savings)" }],
          },
          {
            _key: "b4-3", _type: "block", style: "normal",
            children: [{ _key: "s4-3", _type: "span", text: "• **पैदावार**: फसलों की उपज में **10% से 25%** तक की प्रत्यक्ष वृद्धि।" }],
          },
          {
            _key: "b4-4", _type: "block", style: "normal",
            children: [{ _key: "s4-4", _type: "span", text: "• **यूरिया/रासायनिक उर्वरक की बचत**: रासायनिक NPK उर्वरकों की आवश्यकता में **20% से 30%** तक की कटौती।" }],
          },
          {
            _key: "b4-h3", _type: "block", style: "h3",
            children: [{ _key: "sh4-3", _type: "span", text: "3. पर्यावरण एवं भूजल संरक्षण (Environmental Protection)" }],
          },
          {
            _key: "b4-5", _type: "block", style: "normal",
            children: [{ _key: "s4-5", _type: "span", text: "• **नाइट्रेट लीचिंग में कमी**: भूजल में नाइट्रेट प्रदूषण को रोकते हैं।" }],
          },
          {
            _key: "b4-6", _type: "block", style: "normal",
            children: [{ _key: "s4-6", _type: "span", text: "• **सुपोषकता (Eutrophication) पर रोक**: नदियों व तालाबों में रासायनिक रिसाव से होने वाले जल प्रदूषण को कम करते हैं।" }],
          },
          {
            _key: "b4-h4", _type: "block", style: "h3",
            children: [{ _key: "sh4-4", _type: "span", text: "4. राष्ट्रीय यूरिया सब्सिडी एवं विदेशी मुद्रा की बचत (Macroeconomic Impact)" }],
          },
          {
            _key: "b4-7", _type: "block", style: "normal",
            children: [{ _key: "s4-7", _type: "span", text: "• **सरकारी खजाने की बचत**: उर्वरक आयात सब्सिडी के अरबों रुपये की बचत।" }],
          },
          {
            _key: "b4-8", _type: "block", style: "normal",
            children: [{ _key: "s4-8", _type: "span", text: "• **सतत विकास लक्ष्य (SDG 15 - Life on Land)**: सतत कृषि और मृदा क्षरण को रोकने में निर्णायक योगदान।" }],
          },
        ],
        bodyEn: [
          {
            _key: "b4-9", _type: "block", style: "normal",
            children: [{ _key: "s4-9", _type: "span", text: "Agricultural significance of bio-fertilizers: Soil structure restoration, 10-25% crop yield increase, 20-30% reduction in chemical NPK requirement, protection against groundwater nitrate leaching, and national fertilizer subsidy reduction." }],
          },
        ],
      },

      /* ── 5. Local Bio-fertilizer & Biopesticide Production Unit ── */
      {
        _key: "sec-local-unit-visit",
        kind: "analysis",
        title: "स्थानीय जैव-उर्वरक एवं जैव-कीटनाशी इकाई (Local Production Unit Setup - MPPSC Special)",
        titleEn: "Local Bio-fertilizer & Biopesticide Unit Setup & Field Visit",
        body: [
          {
            _key: "b5-intro", _type: "block", style: "normal",
            children: [{ _key: "s5-in", _type: "span", text: "**MPPSC मुख्य परीक्षा (Paper 3 Unit 7/10)** हेतु अति-महत्वपूर्ण विषय: स्थानीय स्तर पर जैव-उर्वरक और जैव-कीटनाशी (Biopesticides जैसे *Trichoderma*, *Pseudomonas*) उत्पादन इकाइयों की स्थापना, कार्यप्रणाली एवं शैक्षणिक भ्रमण प्रक्रिया।" }],
          },
          {
            _key: "b5-h1", _type: "block", style: "h3",
            children: [{ _key: "sh5-1", _type: "span", text: "1. स्थानीय जैव-उर्वरक उत्पादन इकाई के प्रमुख उपकरण (Essential Equipment)" }],
          },
          {
            _key: "b5-1", _type: "block", style: "normal",
            children: [{ _key: "s5-1", _type: "span", text: "• **ऑटोक्लेव (Autoclave)**: वाहक पदार्थों और संवर्धन माध्यमों (Culture Media) को उच्च दाब व ताप (121°C, 15 psi) पर जीवाणुरहित (Sterilize) करने हेतु।" }],
          },
          {
            _key: "b5-2", _type: "block", style: "normal",
            children: [{ _key: "s5-2", _type: "span", text: "• **लेमिनार एयर फ्लो (Laminar Air Flow)**: पूर्णतः स्टेरॉयड एवं जीवाणुरहित वातावरण में संवर्धन (Inoculation) हेतु।" }],
          },
          {
            _key: "b5-3", _type: "block", style: "normal",
            children: [{ _key: "s5-3", _type: "span", text: "• **फर्मेंन्टर (Fermenter / Bioreactor)**: बड़े पैमाने पर जीवाणु संवर्धन (Mass Multiplication) हेतु नियंत्रित टैंक।" }],
          },
          {
            _key: "b5-4", _type: "block", style: "normal",
            children: [{ _key: "s5-4", _type: "span", text: "• **रोटरी शेकर एवं इन्क्यूबेटर (Rotary Shaker & Incubator)**: जीवाणु कोशिकाओं की इष्टतम वृद्धि (28°C-30°C) हेतु।" }],
          },
          {
            _key: "b5-h2", _type: "block", style: "h3",
            children: [{ _key: "sh5-2", _type: "span", text: "2. निर्माण एवं प्रसंस्करण चरण (Production Process Flow)" }],
          },
          {
            _key: "b5-5", _type: "block", style: "normal",
            children: [{ _key: "s5-5", _type: "span", text: "• **मृदा से स्ट्रेन पृथक्करण (Isolation)**: उच्च दक्षता वाले स्थानीय Rhizobium/PSB स्ट्रेन की पहचान करना।" }],
          },
          {
            _key: "b5-6", _type: "block", style: "normal",
            children: [{ _key: "s5-6", _type: "span", text: "• **मास मल्टीप्लिकेशन (Broth Culture)**: फर्मेंन्टर में न्यूट्रिएंट ब्रोथ में जीवाणु वृद्धि।" }],
          },
          {
            _key: "b5-7", _type: "block", style: "normal",
            children: [{ _key: "s5-7", _type: "span", text: "• **वाहक के साथ सम्मिश्रण (Carrier Mixing)**: लिग्नाइट/चारकोल/पीट पाउडर या न्यूट्रिएंट लिक्विड में संवर्धन मिलाना।" }],
          },
          {
            _key: "b5-8", _type: "block", style: "normal",
            children: [{ _key: "s5-8", _type: "span", text: "• **पैकिंग व FCO गुणवत्ता जाँच**: पॉलिथीन पैकेट में सीलिंग और CFU काउंट परीक्षण।" }],
          },
          {
            _key: "b5-h3", _type: "block", style: "h3",
            children: [{ _key: "sh5-3", _type: "span", text: "3. जैव-कीटनाशी इकाई (Biopesticide Unit - Trichoderma / Bt)" }],
          },
          {
            _key: "b5-9", _type: "block", style: "normal",
            children: [{ _key: "s5-9", _type: "span", text: "• **ट्राइकोडर्मा (Trichoderma viride/harzianum)**: मृदा जनित फफूंद जनित रोगों (जैसे उकठा/Wilt, जड़ सड़न) को नियंत्रित करने वाला जैविक कवक।" }],
          },
          {
            _key: "b5-10", _type: "block", style: "normal",
            children: [{ _key: "s5-10", _type: "span", text: "• **स्यूडोमोनास फ्लोरेसेंस (*Pseudomonas fluorescens*)**: जीवाणुनाशक एवं कवकनाशी गुणों से युक्त जैव-नियंत्रण कारक।" }],
          },
        ],
        bodyEn: [
          {
            _key: "b5-11", _type: "block", style: "normal",
            children: [{ _key: "s5-11", _type: "span", text: "Practical overview of Local Bio-fertilizer & Biopesticide Production Unit for MPPSC Mains Paper 3: Laboratory infrastructure (Autoclave, Laminar Airflow, Fermenter), strain isolation, carrier mixing, biopesticide mass production (Trichoderma, Pseudomonas), and quality assurance procedures." }],
          },
        ],
      },

      /* ── 6. Govt Schemes & Achievements ───────────────────────── */
      {
        _key: "sec-india-achievements",
        kind: "wayForward",
        title: "भारत सरकार की प्रमुख योजनाएँ (PM-PRANAM, PKVY & Liquid Tech)",
        titleEn: "India's Government Schemes: PM-PRANAM, PKVY & Liquid Technology",
        body: [
          {
            _key: "b6-h1", _type: "block", style: "h3",
            children: [{ _key: "sh6-1", _type: "span", text: "1. PM-PRANAM योजना" }],
          },
          {
            _key: "b6-1", _type: "block", style: "normal",
            children: [{ _key: "s6-1", _type: "span", text: "• **पूरा नाम**: **PM Programme for Restoration, Awareness, Nourishment and Amelioration of Mother Earth**" }],
          },
          {
            _key: "b6-2", _type: "block", style: "normal",
            children: [{ _key: "s6-2", _type: "span", text: "• **मुख्य उद्देश्य**: राज्यों एवं केंद्रशासित प्रदेशों को रासायनिक उर्वरकों (यूरिया, DAP) की खपत कम करने हेतु वित्तीय प्रोत्साहन देना।" }],
          },
          {
            _key: "b6-3", _type: "block", style: "normal",
            children: [{ _key: "s6-3", _type: "span", text: "• **सब्सिडी बचत शेयरिंग**: रासायनिक उर्वरक बचत से बची सब्सिडी राशि का **50% हिस्सा** राज्यों को अनुदान के रूप में दिया जाता है।" }],
          },
          {
            _key: "b6-img1", _type: "image",
            asset: { _type: "reference", _ref: assetPranam._id },
            alt: "PM-PRANAM scheme promoting sustainable agriculture and bio-fertilizer usage for MPPSC and UPSC",
          },
          {
            _key: "b6-h2", _type: "block", style: "h3",
            children: [{ _key: "sh6-2", _type: "span", text: "2. तरल जैव-उर्वरक तकनीक (Liquid Bio-fertilizer Technology)" }],
          },
          {
            _key: "b6-4", _type: "block", style: "normal",
            children: [{ _key: "s6-4", _type: "span", text: "• **दीर्घ शेल्फ-लाइफ**: 12 से 24 महीने तक बिना खराब हुए सक्रिय बने रहने की क्षमता।" }],
          },
          {
            _key: "b6-5", _type: "block", style: "normal",
            children: [{ _key: "s6-5", _type: "span", text: "• **ड्रिप सिंचाई योग्य (Fertigation)**: तरल रूप में होने के कारण ड्रिप एवं स्प्रिंकलर सिंचाई प्रणालियों में सीधे उपयोग योग्य।" }],
          },
          {
            _key: "b6-img2", _type: "image",
            asset: { _type: "reference", _ref: assetLiquid._id },
            alt: "Liquid biofertilizers fertigation application via modern drip irrigation system",
          },
          {
            _key: "b6-h3", _type: "block", style: "h3",
            children: [{ _key: "sh6-3", _type: "span", text: "3. परंपरागत कृषि विकास योजना (PKVY)" }],
          },
          {
            _key: "b6-6", _type: "block", style: "normal",
            children: [{ _key: "s6-6", _type: "span", text: "• **क्लस्टर आधारित दृष्टिकोण**: जैविक खेती को 50 या अधिक किसानों के क्लस्टर बनाकर बढ़ावा देना।" }],
          },
          {
            _key: "b6-7", _type: "block", style: "normal",
            children: [{ _key: "s6-7", _type: "span", text: "• **वित्तीय सहायता**: ₹50,000 प्रति हेक्टेयर सहायता (जिसमें से ₹31,000 जैव-इनपुट्स हेतु किसानों को डीबीटी के माध्यम से)।" }],
          },
        ],
        bodyEn: [
          {
            _key: "b6-8", _type: "block", style: "normal",
            children: [{ _key: "s6-8", _type: "span", text: "In-depth analysis of Indian flagship schemes supporting biofertilizers: PM-PRANAM, Liquid Biofertilizer fertigation technology, and Paramparagat Krishi Vikas Yojana (PKVY)." }],
          },
        ],
      },

      /* ── 7. Comparison Matrix ─────────────────────────────────── */
      {
        _key: "sec-comparison",
        kind: "analysis",
        title: "जैव-उर्वरक बनाम रासायनिक उर्वरक (Bio-fertilizers vs Chemical Fertilizers)",
        titleEn: "Bio-fertilizers vs Chemical Fertilizers Comparison",
        body: [
          {
            _key: "b7-1", _type: "block", style: "normal",
            children: [{ _key: "s7-1", _type: "span", text: "• **मूल स्रोत**: जैव-उर्वरक प्राकृतिक जीवित सूक्ष्मजीवों पर आधारित हैं, जबकि रासायनिक उर्वरक सिंथेटिक कारखानी रसायनों से बनते हैं।" }],
          },
          {
            _key: "b7-2", _type: "block", style: "normal",
            children: [{ _key: "s7-2", _type: "span", text: "• **मृदा प्रभाव**: जैव-उर्वरक मिट्टी की भौतिक, रासायनिक व जैविक बनावट सुधारते हैं, जबकि अत्यधिक रासायनिक उर्वरक मिट्टी को अम्लीय/क्षारीय बनाकर बंजर बनाते हैं।" }],
          },
          {
            _key: "b7-3", _type: "block", style: "normal",
            children: [{ _key: "s7-3", _type: "span", text: "• **पर्यावरण व प्रदूषण**: जैव-उर्वरक 100% पर्यावरण-अनुकूल हैं, जबकि रासायनिक उर्वरक जल प्रदूषण और ग्रीनहाउस गैस (N2O) उत्सर्जन करते हैं।" }],
          },
          {
            _key: "b7-4", _type: "block", style: "normal",
            children: [{ _key: "s7-4", _type: "span", text: "• **कीमत व सब्सिडी**: जैव-उर्वरक अत्यंत सस्ते होते हैं, जबकि रासायनिक उर्वरक अत्यधिक महंगे और भारी सरकारी सब्सिडी पर निर्भर हैं।" }],
          },
        ],
        bodyEn: [
          {
            _key: "b7-5", _type: "block", style: "normal",
            children: [{ _key: "s7-5", _type: "span", text: "Comparative analysis highlighting eco-friendliness, soil health retention, cost effectiveness, and environmental impact." }],
          },
        ],
      },

      /* ── 8. Exam Points & PDF Revision Notes ──────────────────── */
      {
        _key: "sec-quick-revision",
        kind: "wayForward",
        title: "MPPSC & UPSC परीक्षा हेतु महत्वपूर्ण तथ्य (Study Notes & Quick Revision)",
        titleEn: "MPPSC & UPSC Key Facts & PDF Study Revision Notes",
        body: [
          {
            _key: "b8-1", _type: "block", style: "normal",
            children: [{ _key: "s8-1", _type: "span", text: "• **जैव-उर्वरक परिभाषा**: जीवित सूक्ष्मजीव जो वायुमंडलीय नाइट्रोजन स्थिर करते हैं और मृदा खनिजों को सुलभ बनाते हैं।" }],
          },
          {
            _key: "b8-2", _type: "block", style: "normal",
            children: [{ _key: "s8-2", _type: "span", text: "• **FCO 1985 मानक**: न्यूनतम $10^7$ CFU/g (वाहक) एवं $10^8$ CFU/mL (तरल)। pH मान 6.5-7.5।" }],
          },
          {
            _key: "b8-3", _type: "block", style: "normal",
            children: [{ _key: "s8-3", _type: "span", text: "• **Rhizobium**: दलहनी फसलों में सहजीवी N2 स्थिरीकरण।" }],
          },
          {
            _key: "b8-4", _type: "block", style: "normal",
            children: [{ _key: "s8-4", _type: "span", text: "• **Azotobacter**: गेहूँ, मक्का हेतु मुक्तजीवी N2 स्थिरीकारक जीवाणु।" }],
          },
          {
            _key: "b8-5", _type: "block", style: "normal",
            children: [{ _key: "s8-5", _type: "span", text: "• **PSB (Phosphate Solubilizing Bacteria)**: *Bacillus*, *Pseudomonas* - कार्बनिक अम्ल छोड़कर फॉस्फेट घोलना।" }],
          },
          {
            _key: "b8-6", _type: "block", style: "normal",
            children: [{ _key: "s8-6", _type: "span", text: "• **VAM Mycorrhiza**: *Glomus* कवकजाल द्वारा जल व फॉस्फोरस अवशोषण में वृद्धि।" }],
          },
          {
            _key: "b8-7", _type: "block", style: "normal",
            children: [{ _key: "s8-7", _type: "span", text: "• **PM-PRANAM**: रासायनिक उर्वरक सब्सिडी घटाने व वैकल्पिक/जैव-उर्वरक प्रोत्साहन योजना।" }],
          },
          {
            _key: "b8-8", _type: "block", style: "normal",
            children: [{ _key: "s8-8", _type: "span", text: "• **स्थानीय इकाई उपकरण**: ऑटोक्लेव, लेमिनार एयर फ्लो, फर्मेंन्टर, इन्क्यूबेटर (MPPSC Paper 3 Special)।" }],
          },
        ],
        bodyEn: [
          {
            _key: "b8-9", _type: "block", style: "normal",
            children: [{ _key: "s8-9", _type: "span", text: "One-liner exam revision points tailored specifically for MPPSC & UPSC competitive exams." }],
          },
        ],
      },
    ],

    /* ─── FAQS (8 Search-Targeted Collapsible FAQs) ─────────────── */
    faqs: [
      {
        question: "जैव-उर्वरक (Bio-fertilizer) किसे कहते हैं एवं इसके उदाहरण क्या हैं?",
        questionEn: "What are Bio-fertilizers and what are their examples?",
        answer: "जैव-उर्वरक (Bio-fertilizers) ऐसे प्राकृतिक उत्पाद हैं जिनमें जीवित सूक्ष्मजीव (जैसे जीवाणु, कवक व नील-हरित शैवाल) पाए जाते हैं। जब इन्हें बीज या मिट्टी में मिलाया जाता है, तो ये वायुमंडलीय नाइट्रोजन का स्थिरीकरण करते हैं तथा मिट्टी में पोषक तत्वों की सुलभता बढ़ाते हैं। प्रमुख उदाहरण: Rhizobium, Azotobacter, Azospirillum, PSB, VAM Mycorrhiza, और Blue-Green Algae।",
        answerEn: "Bio-fertilizers are preparations containing living microorganisms that enrich soil fertility by fixing atmospheric nitrogen or solubilizing soil phosphorus. Key examples include Rhizobium, Azotobacter, PSB, and VAM Mycorrhiza."
      },
      {
        question: "फर्टिलाइजर कंट्रोल ऑर्डर (FCO Guidelines) के अनुसार जैव-उर्वरकों के मानक क्या हैं?",
        questionEn: "What are the Fertilizer Control Order (FCO) guidelines for Bio-fertilizers?",
        answer: "FCO 1985 (तथा 2023-2025 संशोधनों) के अनुसार, वाहक (Carrier) आधारित जैव-उर्वरक में न्यूनतम $10^7$ CFU/ग्राम तथा तरल (Liquid) जैव-उर्वरक में न्यूनतम $10^8$ CFU/मिलीलीटर जीवित सूक्ष्मजीव होना अनिवार्य है। इसका pH मान 6.5 से 7.5 के मध्य और संदूषण सीमा $10^5$ से अधिक नहीं होनी चाहिए।",
        answerEn: "Under FCO guidelines, carrier-based biofertilizers must maintain a minimum microbial population of $10^7$ CFU/g, and liquid formulations must maintain $10^8$ CFU/mL with permissible pH 6.5-7.5."
      },
      {
        question: "जैव-उर्वरक के मुख्य प्रकार कौन-कौन से हैं?",
        questionEn: "What are the main types of Bio-fertilizers?",
        answer: "जैव-उर्वरकों को 4 मुख्य श्रेणियों में बाँटा जाता है: 1. नाइट्रोजन स्थिरीकारक (Rhizobium, Azotobacter, Azospirillum), 2. फॉस्फेट घुलनशील व गतिमान (PSB, VAM Mycorrhiza), 3. पोटेशियम घुलनशील (KSB), और 4. पादप वृद्धि कारक राइजोबैक्टीरिया (PGPR)।",
        answerEn: "Biofertilizers are categorized into Nitrogen Fixers, Phosphate Solubilizers/Mobilizers (PSB/VAM), Potassium Solubilizers (KSB), and Plant Growth Promoting Rhizobacteria (PGPR)."
      },
      {
        question: "कृषि में जैव-उर्वरक का क्या महत्व एवं लाभ है?",
        questionEn: "What is the importance and benefit of Bio-fertilizers in agriculture?",
        answer: "कृषि में जैव-उर्वरक उपयोग करने से फसल उपज में 10-25% की वृद्धि होती है, रासायनिक NPK उर्वरकों पर निर्भरता 20-30% घटती है, मृदा में ह्यूमस व जैविक कार्बन बढ़ता है, तथा भूजल प्रदूषण व यूरिया सब्सिडी का बोझ कम होता है।",
        answerEn: "Biofertilizers improve soil physical and biological health, boost crop yield by 10-25%, cut synthetic fertilizer expenses by 20-30%, and protect against nitrate groundwater pollution."
      },
      {
        question: "स्थानीय जैव-उर्वरक एवं जैव-कीटनाशी इकाई में कौन से उपकरण उपयोग होते हैं?",
        questionEn: "What equipment are used in local biofertilizer & biopesticide production units?",
        answer: "स्थानीय उत्पादन इकाई (MPPSC Paper 3 Syllabus) में ऑटोक्लेव (Autoclave - नसबंदी हेतु), लेमिनार एयर फ्लो (Laminar Air Flow - संवर्धन हेतु), फर्मेंन्टर (Fermenter - मास मल्टीप्लिकेशन हेतु), तथा शेकर इन्क्यूबेटर (Incubator) का प्रयोग किया जाता है।",
        answerEn: "Key laboratory infrastructure includes Autoclaves for sterilization, Laminar Air Flow cabinets for inoculation, Fermenters for bacterial multiplication, and Shaker Incubators for temperature control."
      },
      {
        question: "PM-PRANAM योजना क्या है और यह जैव-उर्वरकों को कैसे बढ़ावा देती है?",
        questionEn: "What is the PM-PRANAM scheme and how does it promote biofertilizers?",
        answer: "PM-PRANAM का पूरा नाम 'PM Programme for Restoration, Awareness, Nourishment and Amelioration of Mother Earth' है। यह योजना रासायनिक उर्वरकों की खपत घटाने वाले राज्यों को उर्वरक सब्सिडी बचत का 50% हिस्सा अनुदान के रूप में देकर वैकल्पिक व जैव-उर्वरकों के प्रयोग को प्रोत्साहित करती है।",
        answerEn: "PM-PRANAM incentivizes Indian states to cut chemical fertilizer use by passing 50% of the saved subsidy as grants to promote bio-fertilizers and organic inputs."
      },
      {
        question: "VAM माइकोराइजा (Vesicular Arbuscular Mycorrhiza) का क्या कार्य है?",
        questionEn: "What is the function of VAM Mycorrhiza?",
        answer: "VAM एक लाभकारी कवक है जो पौधों की जड़ों से जुड़कर एक विस्तृत कवकजाल (Hyphal Network) बनाता है। यह मिट्टी में दूर तक फैलकर पौधों को फॉस्फोरस, जस्ता, तांबा एवं जल अवशोषित करने में मदद करता है।",
        answerEn: "VAM is a symbiotic fungus that develops extensive hyphal networks to dramatically increase root absorptive surface area for water, phosphorus, and zinc."
      },
      {
        question: "जैव-उर्वरक और रासायनिक उर्वरक में क्या मुख्य अंतर है?",
        questionEn: "What is the main difference between Bio-fertilizers and Chemical Fertilizers?",
        answer: "जैव-उर्वरक प्राकृतिक जीवित सूक्ष्मजीवों पर आधारित, 100% पर्यावरण-अनुकूल और सस्ते होते हैं जो मृदा की दीर्घकालिक उर्वरता बढ़ाते हैं। रासायनिक उर्वरक कारखानी रसायनों से निर्मित, महंगे होते हैं जो अत्यधिक प्रयोग पर मिट्टी को बंजर बना देते हैं।",
        answerEn: "Bio-fertilizers are living organism-based, eco-friendly, and cost-effective soil builders, whereas synthetic chemical fertilizers are costly and cause long-term soil degradation if overused."
      }
    ],

    /* ─── MCQS (8 High-Quality Practice Quizzes) ───────────────── */
    mcqs: [
      {
        question: "फर्टिलाइजर कंट्रोल ऑर्डर (FCO Guidelines) के अनुसार वाहक आधारित (Carrier-based) जैव-उर्वरक में न्यूनतम जीवित सूक्ष्मजीवों (CFU Count) की संख्या कितनी होनी चाहिए?",
        questionEn: "According to Fertilizer Control Order (FCO) guidelines, what is the minimum required CFU count per gram for carrier-based biofertilizers?",
        options: [
          "A. $10^5$ CFU/gram",
          "B. $10^7$ CFU/gram",
          "C. $10^3$ CFU/gram",
          "D. $10^{12}$ CFU/gram"
        ],
        optionsEn: [
          "A. $10^5$ CFU/gram",
          "B. $10^7$ CFU/gram",
          "C. $10^3$ CFU/gram",
          "D. $10^{12}$ CFU/gram"
        ],
        correctIndex: 1,
        explanation: "FCO मानकों के अनुसार, वाहक (Carrier) आधारित जैव-उर्वरक में न्यूनतम $10^7$ CFU/ग्राम तथा तरल (Liquid) में $10^8$ CFU/मिलीलीटर होना अनिवार्य है।",
        explanationEn: "Under FCO standards, carrier-based biofertilizers must contain a minimum of $10^7$ CFU per gram ($10^8$ CFU/mL for liquid formulations)."
      },
      {
        question: "निम्नलिखित में से कौन-सा सहजीवी जीवाणु (Symbiotic Bacteria) दलहनी फसलों की जड़ों की ग्रंथियों में नाइट्रोजन स्थिरीकरण करता है?",
        questionEn: "Which symbiotic bacterium fixes atmospheric nitrogen in the root nodules of leguminous crops?",
        options: ["A. Azotobacter", "B. Rhizobium", "C. Nitrosomonas", "D. Thiobacillus"],
        optionsEn: ["A. Azotobacter", "B. Rhizobium", "C. Nitrosomonas", "D. Thiobacillus"],
        correctIndex: 1,
        explanation: "Rhizobium जीवाणु दलहनी फसलों (जैसे चना, सोयाबीन, अरहर) की जड़ों की ग्रंथियों में रहकर सहजीवी रूप से वायुमंडलीय नाइट्रोजन को अमोनिया में बदलता है।",
        explanationEn: "Rhizobium bacteria form symbiotic associations with leguminous roots to fix atmospheric nitrogen into bioavailable ammonia."
      },
      {
        question: "PSB (Phosphate Solubilizing Bacteria) मिट्टी में अघुलनशील फॉस्फेट को किस माध्यम से घुलनशील बनाते हैं?",
        questionEn: "By what mechanism do Phosphate Solubilizing Bacteria (PSB) dissolve insoluble soil phosphate?",
        options: [
          "A. कार्बनिक अम्ल (Organic Acids) स्रावित करके",
          "B. अत्यधिक पानी अवशोषित करके",
          "C. मिट्टी का तापमान बढ़ाकर",
          "D. नाइट्रोजन गैस छोड़कर"
        ],
        optionsEn: [
          "A. By secreting Organic Acids",
          "B. By absorbing excessive water",
          "C. By raising soil temperature",
          "D. By releasing nitrogen gas"
        ],
        correctIndex: 0,
        explanation: "PSB जीवाणु (जैसे *Bacillus*, *Pseudomonas*) कार्बनिक अम्ल (साइट्रिक/मैलिक एसिड) स्रावित करके अघुलनशील त्रिकैल्शियम फॉस्फेट को घुलनशील आयनों में बदलते हैं।",
        explanationEn: "PSB secrete organic acids that solubilize bound insoluble soil phosphates into plant-absorbable ionic forms."
      },
      {
        question: "VAM (Vesicular Arbuscular Mycorrhiza) के संदर्भ में कौन-सा कथन सत्य है?",
        questionEn: "Which statement regarding VAM (Vesicular Arbuscular Mycorrhiza) is correct?",
        options: [
          "A. यह एक प्रकार का विषाणु (Virus) है",
          "B. यह एक लाभकारी सहजीवी कवक (Fungus) है जो फॉस्फोरस व जल अवशोषण बढ़ाता है",
          "C. यह केवल नाइट्रोजन का स्थिरीकरण करता है",
          "D. यह एक रासायनिक कीटनाशक है"
        ],
        optionsEn: [
          "A. It is a pathogenic virus",
          "B. It is a beneficial symbiotic fungus that enhances phosphorus and water absorption",
          "C. It exclusively fixes atmospheric nitrogen",
          "D. It is a synthetic biopesticide"
        ],
        correctIndex: 1,
        explanation: "VAM एक लाभकारी एंडो-माइकोराइजल कवक (Endo-mycorrhizal Fungus) है जो पौधों की जड़ों से जुड़कर फॉस्फोरस, सूक्ष्म पोषक तत्व एवं जल अवशोषण क्षमता बढ़ाता है।",
        explanationEn: "VAM is an endo-mycorrhizal fungus that forms hyphal networks to dramatically boost plant uptake of phosphorus, trace minerals, and water."
      },
      {
        question: "स्थानीय जैव-उर्वरक प्रयोगशाला में संवर्धन माध्यम और उपकरणों को जीवाणुरहित (Sterilize) करने हेतु किस उपकरण का प्रयोग किया जाता है?",
        questionEn: "Which laboratory equipment is used to sterilize culture media and glasswares in a local bio-fertilizer unit?",
        options: [
          "A. लेमिनार एयर फ्लो",
          "B. ऑटोक्लेव (Autoclave)",
          "C. सेंट्रीफ्यूज",
          "D. शेकर"
        ],
        optionsEn: [
          "A. Laminar Air Flow",
          "B. Autoclave",
          "C. Centrifuge",
          "D. Shaker"
        ],
        correctIndex: 1,
        explanation: "ऑटोक्लेव (Autoclave) का उपयोग उच्च दाब (15 psi) एवं ताप (121°C) पर संवर्धन माध्यम एवं उपकरणों को पूर्णतः जीवाणुरहित (Sterilize) करने के लिए किया जाता है।",
        explanationEn: "Autoclave uses pressurized steam (121°C at 15 psi) to ensure absolute sterilization of culture media and equipment."
      },
      {
        question: "'PM-PRANAM' योजना का मुख्य उद्देश्य क्या है?",
        questionEn: "What is the primary objective of the PM-PRANAM scheme?",
        options: [
          "A. केवल रासायनिक यूरिया पर सब्सिडी बढ़ाना",
          "B. रासायनिक उर्वरकों की खपत कम कर जैव व वैकल्पिक उर्वरकों को बढ़ावा देना",
          "C. ट्रैक्टर खरीद पर ऋण देना",
          "D. विदेशों से उर्वरक आयात दोगुना करना"
        ],
        optionsEn: [
          "A. Only increasing subsidies on synthetic urea",
          "B. Reducing chemical fertilizer consumption and promoting alternative & bio-fertilizers",
          "C. Providing tractor purchasing loans",
          "D. Doubling chemical fertilizer imports"
        ],
        correctIndex: 1,
        explanation: "PM-PRANAM का पूरा नाम 'PM Programme for Restoration, Awareness, Nourishment and Amelioration of Mother Earth' है, जो रासायनिक उर्वरकों पर निर्भरता घटाने के लिए शुरू की गई है।",
        explanationEn: "PM-PRANAM incentivizes states to reduce reliance on synthetic fertilizers by rewarding chemical subsidy reductions."
      },
      {
        question: "निम्नलिखित में से कौन-सा मुक्तजीवी (Free-living) नाइट्रोजन स्थिरीकारक जीवाणु है जो गैर-दलहनी फसलों (जैसे गेहूँ, मक्का) हेतु उपयोगी है?",
        questionEn: "Which of the following is a free-living nitrogen-fixing bacterium suitable for non-leguminous crops like wheat and maize?",
        options: ["A. Rhizobium", "B. Azotobacter", "C. Trichoderma", "D. Glomus"],
        optionsEn: ["A. Rhizobium", "B. Azotobacter", "C. Trichoderma", "D. Glomus"],
        correctIndex: 1,
        explanation: "Azotobacter एक मुक्तजीवी (Free-living) एरोबिक जीवाणु है जो बिना किसी पौधे से सहजीवन किए मिट्टी में रहकर नाइट्रोजन स्थिर करता है।",
        explanationEn: "Azotobacter is a free-living aerobic nitrogen-fixing bacterium widely used for cereal crops like wheat, maize, and rice."
      },
      {
        question: "तरल जैव-उर्वरक तकनीक (Liquid Bio-fertilizer Technology) की वाहक आधारित (Carrier-based) जैव-उर्वरकों की तुलना में क्या प्रमुख विशेषता है?",
        questionEn: "What is the key advantage of Liquid Bio-fertilizer Technology over traditional carrier-based biofertilizers?",
        options: [
          "A. इसकी शेल्फ-लाइफ केवल 1 महीना होती है",
          "B. इसकी शेल्फ-लाइफ 12-24 महीने तक होती है और इसे ड्रिप सिंचाई (Fertigation) से दिया जा सकता है",
          "C. इसमें जीवित सूक्ष्मजीव नहीं होते",
          "D. यह केवल सूखी मिट्टी में काम करता है"
        ],
        optionsEn: [
          "A. Shelf life is restricted to 1 month",
          "B. Extended shelf life of 12-24 months and fully compatible with drip fertigation systems",
          "C. Contains no living microorganisms",
          "D. Works exclusively in arid soils"
        ],
        correctIndex: 1,
        explanation: "तरल जैव-उर्वरकों की शेल्फ-लाइफ लंबी (12-24 माह) होती है, ये उच्च ताप सहन कर सकते हैं और इन्हें ड्रिप सिंचाई (Fertigation) के साथ आसानी से दिया जा सकता है।",
        explanationEn: "Liquid biofertilizer formulations offer extended thermal tolerance, zero carrier contamination, 12-24 month shelf life, and drip fertigation compatibility."
      }
    ]
  };

  // Upload or Replace staticGk document in Sanity CMS
  console.log(`📝 Syncing Static GK article ID "${article._id}" to Sanity CMS...`);
  const res = await client.createOrReplace(article);
  console.log(`🎉 SUCCESS! Article uploaded & published in Sanity CMS. Document ID: ${res._id}`);
  console.log(`URL slug: ${res.slug.current}`);
}

main().catch((err) => {
  console.error("❌ Error syncing bio-fertilizers article to Sanity CMS:", err);
  process.exit(1);
});
