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
  console.log("🚀 Starting upload process for Bio-fertilizers (जैव-उर्वरक) Static GK Article...");

  // Source images from brain artifacts directory or public/images/blog/
  const artifactDir = "/Users/aakariastech/.gemini/antigravity-ide/brain/b98c605b-850a-4c91-a0d8-d4d815df1aa4";
  const publicBlogDir = path.resolve(process.cwd(), "public/images/blog");

  if (!fs.existsSync(publicBlogDir)) {
    fs.mkdirSync(publicBlogDir, { recursive: true });
  }

  const imageFiles = {
    nodules: path.join(artifactDir, "bio_fertilizer_rhizobium_root_nodules_1784967603234.png"),
    liquid: path.join(artifactDir, "liquid_biofertilizers_drip_irrigation_1784967617252.png"),
    pranam: path.join(artifactDir, "pm_pranam_sustainable_agriculture_1784967628974.png"),
  };

  // Check if artifact images exist
  if (!fs.existsSync(imageFiles.nodules) || !fs.existsSync(imageFiles.liquid) || !fs.existsSync(imageFiles.pranam)) {
    console.error("❌ Required images not found in brain artifacts!");
    process.exit(1);
  }

  // Copy images to public/images/blog/ for permanent record
  const destNodules = path.join(publicBlogDir, "bio_fertilizer_rhizobium_nodules.png");
  const destLiquid = path.join(publicBlogDir, "liquid_biofertilizer_drip_irrigation.png");
  const destPranam = path.join(publicBlogDir, "pm_pranam_sustainable_agriculture.png");

  fs.copyFileSync(imageFiles.nodules, destNodules);
  fs.copyFileSync(imageFiles.liquid, destLiquid);
  fs.copyFileSync(imageFiles.pranam, destPranam);

  // 1. Upload Nodules Image
  console.log("📸 Uploading Rhizobium root nodules image...");
  const assetNodules = await client.assets.upload("image", fs.createReadStream(destNodules), {
    filename: "bio_fertilizer_rhizobium_nodules.png",
  });
  console.log(`✔ Uploaded Root Nodules image. Asset ID: ${assetNodules._id}`);

  // 2. Upload Liquid Biofertilizers Image
  console.log("📸 Uploading Liquid Bio-fertilizers drip irrigation image...");
  const assetLiquid = await client.assets.upload("image", fs.createReadStream(destLiquid), {
    filename: "liquid_biofertilizer_drip_irrigation.png",
  });
  console.log(`✔ Uploaded Liquid Bio-fertilizer image. Asset ID: ${assetLiquid._id}`);

  // 3. Upload PM-PRANAM Image
  console.log("📸 Uploading PM-PRANAM sustainable agriculture image...");
  const assetPranam = await client.assets.upload("image", fs.createReadStream(destPranam), {
    filename: "pm_pranam_sustainable_agriculture.png",
  });
  console.log(`✔ Uploaded PM-PRANAM image. Asset ID: ${assetPranam._id}`);

  // 4. Construct the Article document
  const article = {
    _id: "gk-bio-fertilizers-in-hindi",
    _type: "staticGk",
    slug: { _type: "slug", current: "bio-fertilizers-in-hindi-types-benefits-pm-pranam" },
    title: "जैव-उर्वरक (Bio-fertilizers): क्या हैं, कार्य, लाभ एवं PM-PRANAM योजना | MPPSC & UPSC Notes",
    titleEn: "Bio-fertilizers: Working Mechanisms, Benefits, Schemes (PM-PRANAM, PKVY) & Key Facts | MPPSC & UPSC",
    excerpt: "जैव-उर्वरक (Bio-fertilizers) मिट्टी की उर्वरता बढ़ाने वाले जीवित सूक्ष्मजीव हैं। जानिए Rhizobium, PSB, VAM के कार्य, PM-PRANAM व PKVY योजनाएं, और रासायनिक उर्वरकों से तुलना। MPPSC एवं UPSC हेतु संपूर्ण नोट्स।",
    excerptEn: "Comprehensive guide on Bio-fertilizers covering living microorganisms (Rhizobium, PSB, VAM), working mechanisms, liquid bio-fertilizer technology, PM-PRANAM & PKVY schemes, and comparison with chemical fertilizers for MPPSC and UPSC exams.",
    ca_date: "2026-07-25",
    publishedAt: new Date().toISOString(),
    featured: true,
    readingTime: 7,
    keywords: [
      "Bio-fertilizers",
      "जैव-उर्वरक",
      "MPPSC Bio-fertilizers",
      "Living Microorganisms",
      "Nitrogen Fixation",
      "Rhizobium in Hindi",
      "PSB Bacteria",
      "VAM Mycorrhiza",
      "PM-PRANAM Yojana",
      "Paramparagat Krishi Vikas Yojana",
      "PKVY Scheme",
      "Liquid Bio-fertilizer Technology",
      "Bio-fertilizers vs Chemical Fertilizers",
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
    syllabus: ["GS-3", "Prelims-GS"],
    featuredImage: {
      _type: "image",
      asset: { _type: "reference", _ref: assetNodules._id },
      alt: "Legume plant roots with Rhizobium root nodules in rich dark soil representing bio-fertilizers",
    },

    /* ─── SECTIONS ──────────────────────────────────────────────── */
    sections: [
      /* ── 1. Definition & Core Concept ──────────────────────── */
      {
        _key: "sec-definition",
        kind: "whyInNews",
        title: "जैव-उर्वरक (Bio-fertilizers) क्या हैं?",
        titleEn: "What are Bio-fertilizers?",
        body: [
          {
            _key: "b1-1", _type: "block", style: "normal",
            children: [{ _key: "s1-1", _type: "span", text: "जैव-उर्वरक (Bio-fertilizers) ऐसे उत्पाद होते हैं जिनमें **जीवित सूक्ष्मजीव (Living Microorganisms)** पाए जाते हैं। इन्हें **बीज, पौधों की जड़ों या मिट्टी** में प्रयोग किया जाता है। ये पौधों के लिए आवश्यक पोषक तत्वों की उपलब्धता बढ़ाते हैं तथा प्राकृतिक रूप से **मिट्टी की उर्वरता** में सुधार करते हैं।" }],
          },
          {
            _key: "b1-2", _type: "block", style: "normal",
            children: [{ _key: "s1-2", _type: "span", text: "इन्हें **\"जैविक पोषक तत्व परिवर्तक\" (Biological Nutrient Converter)** भी कहा जाता है क्योंकि ये **वायुमंडलीय नाइट्रोजन** को स्थिर करते हैं तथा मिट्टी में उपस्थित खनिजों को पौधों के लिए उपयोगी रूप में परिवर्तित करते हैं।" }],
          },
          {
            _key: "b1-img", _type: "image",
            asset: { _type: "reference", _ref: assetNodules._id },
            alt: "Rhizobium bacterial root nodules on legume plant roots enhancing soil fertility",
          },
        ],
        bodyEn: [
          {
            _key: "b1-3", _type: "block", style: "normal",
            children: [{ _key: "s1-3", _type: "span", text: "Bio-fertilizers are substance containing living microorganisms that enhance plant nutrient availability and improve soil fertility naturally when applied to seeds, plant roots, or soil." }],
          },
          {
            _key: "b1-4", _type: "block", style: "normal",
            children: [{ _key: "s1-4", _type: "span", text: "They are termed Biological Nutrient Converters as they fix atmospheric nitrogen and solubilize bound soil minerals into plant-accessible forms." }],
          },
        ],
      },

      /* ── 2. Working Mechanism ───────────────────────────── */
      {
        _key: "sec-working-mechanism",
        kind: "background",
        title: "जैव-उर्वरक कैसे कार्य करते हैं?",
        titleEn: "How Bio-fertilizers Work?",
        body: [
          {
            _key: "b2-h1", _type: "block", style: "h3",
            children: [{ _key: "sh2-1", _type: "span", text: "1. नाइट्रोजन स्थिरीकरण (Nitrogen Fixation)" }],
          },
          {
            _key: "b2-1", _type: "block", style: "normal",
            children: [{ _key: "s2-1", _type: "span", text: "• **राइजोबियम (Rhizobium)**: राइजोबियम (Rhizobium) जैसे जीवाणु दलहनी फसलों की जड़ों में रहते हैं।" }],
          },
          {
            _key: "b2-2", _type: "block", style: "normal",
            children: [{ _key: "s2-2", _type: "span", text: "• **नाइट्रोजन रूपांतरण**: ये वायुमंडलीय नाइट्रोजन को अमोनिया में परिवर्तित करते हैं।" }],
          },
          {
            _key: "b2-3", _type: "block", style: "normal",
            children: [{ _key: "s2-3", _type: "span", text: "• **लाभ**: इससे पौधों को प्राकृतिक रूप से नाइट्रोजन प्राप्त होती है।" }],
          },
          {
            _key: "b2-h2", _type: "block", style: "h3",
            children: [{ _key: "sh2-2", _type: "span", text: "2. फॉस्फेट घुलनशीलता (Phosphate Solubilization)" }],
          },
          {
            _key: "b2-4", _type: "block", style: "normal",
            children: [{ _key: "s2-4", _type: "span", text: "• **फॉस्फोरस की स्थिति**: मिट्टी में उपस्थित फॉस्फोरस सामान्यतः अघुलनशील रूप में होता है।" }],
          },
          {
            _key: "b2-5", _type: "block", style: "normal",
            children: [{ _key: "s2-5", _type: "span", text: "• **PSB (Phosphate Solubilizing Bacteria)**: PSB कार्बनिक अम्ल छोड़कर फॉस्फेट को घोलते हैं।" }],
          },
          {
            _key: "b2-6", _type: "block", style: "normal",
            children: [{ _key: "s2-6", _type: "span", text: "• **लाभ**: इससे पौधे फॉस्फोरस को आसानी से अवशोषित कर पाते हैं।" }],
          },
          {
            _key: "b2-h3", _type: "block", style: "h3",
            children: [{ _key: "sh2-3", _type: "span", text: "3. माइकोराइजा (VAM – Vesicular Arbuscular Mycorrhiza)" }],
          },
          {
            _key: "b2-7", _type: "block", style: "normal",
            children: [{ _key: "s2-7", _type: "span", text: "• **प्रकार**: यह एक लाभकारी कवक (Fungus) है।" }],
          },
          {
            _key: "b2-8", _type: "block", style: "normal",
            children: [{ _key: "s2-8", _type: "span", text: "• **संरचना**: इसकी महीन संरचनाएँ मिट्टी में गहराई तक फैलती हैं।" }],
          },
          {
            _key: "b2-9", _type: "block", style: "normal",
            children: [{ _key: "s2-9", _type: "span", text: "• **लाभ**: पौधों को अधिक जल एवं फॉस्फोरस उपलब्ध कराती हैं।" }],
          },
          {
            _key: "b2-h4", _type: "block", style: "h3",
            children: [{ _key: "sh2-4", _type: "span", text: "4. अपघटन (Decomposition)" }],
          },
          {
            _key: "b2-10", _type: "block", style: "normal",
            children: [{ _key: "s2-10", _type: "span", text: "• **फसल अवशेष**: कुछ जैव-उर्वरक फसल अवशेष (जैसे पराली) को विघटित करते हैं।" }],
          },
          {
            _key: "b2-11", _type: "block", style: "normal",
            children: [{ _key: "s2-11", _type: "span", text: "• **कार्बनिक पदार्थ**: इससे मिट्टी में कार्बनिक पदार्थ एवं कार्बन की मात्रा बढ़ती है।" }],
          },
          {
            _key: "b2-12", _type: "block", style: "normal",
            children: [{ _key: "s2-12", _type: "span", text: "• **मिट्टी की गुणवत्ता**: मिट्टी की संरचना एवं उर्वरता में सुधार होता है।" }],
          },
        ],
        bodyEn: [
          {
            _key: "b2-13", _type: "block", style: "normal",
            children: [{ _key: "s2-13", _type: "span", text: "Bio-fertilizers operate through four main biological mechanisms: Nitrogen fixation via Rhizobium, Phosphate solubilization via PSB, Water & nutrient absorption via VAM fungus, and Crop residue decomposition." }],
          },
        ],
      },

      /* ── 3. India's Achievements & Govt Schemes ───────────── */
      {
        _key: "sec-india-achievements",
        kind: "keyHighlights",
        title: "भारत की प्रमुख उपलब्धियाँ एवं सरकारी योजनाएँ",
        titleEn: "India's Achievements & Government Schemes",
        body: [
          {
            _key: "b3-h1", _type: "block", style: "h3",
            children: [{ _key: "sh3-1", _type: "span", text: "PM-PRANAM योजना" }],
          },
          {
            _key: "b3-1", _type: "block", style: "normal",
            children: [{ _key: "s3-1", _type: "span", text: "• **PM-PRANAM**: **PM Programme for Restoration, Awareness, Nourishment and Amelioration of Mother Earth**" }],
          },
          {
            _key: "b3-2", _type: "block", style: "normal",
            children: [{ _key: "s3-2", _type: "span", text: "• **उद्देश्य**: राज्यों/केंद्रशासित प्रदेशों को रासायनिक उर्वरकों की खपत कम करने हेतु प्रोत्साहित करती है।" }],
          },
          {
            _key: "b3-3", _type: "block", style: "normal",
            children: [{ _key: "s3-3", _type: "span", text: "• **प्रोत्साहन**: वैकल्पिक एवं जैव-उर्वरकों के उपयोग को बढ़ावा देती है।" }],
          },
          {
            _key: "b3-img1", _type: "image",
            asset: { _type: "reference", _ref: assetPranam._id },
            alt: "PM-PRANAM scheme promoting sustainable agriculture and chemical free farming in India",
          },
          {
            _key: "b3-h2", _type: "block", style: "h3",
            children: [{ _key: "sh3-2", _type: "span", text: "तरल जैव-उर्वरक तकनीक (Liquid Bio-fertilizer Technology)" }],
          },
          {
            _key: "b3-4", _type: "block", style: "normal",
            children: [{ _key: "s3-4", _type: "span", text: "• **तकनीक**: भारत ने दीर्घ शेल्फ-लाइफ वाले तरल जैव-उर्वरक विकसित किए हैं।" }],
          },
          {
            _key: "b3-5", _type: "block", style: "normal",
            children: [{ _key: "s3-5", _type: "span", text: "• **संग्रहण**: इन्हें आसानी से संग्रहित किया जा सकता है।" }],
          },
          {
            _key: "b3-6", _type: "block", style: "normal",
            children: [{ _key: "s3-6", _type: "span", text: "• **उपयोग**: ड्रिप सिंचाई के माध्यम से भी उपयोग संभव है।" }],
          },
          {
            _key: "b3-img2", _type: "image",
            asset: { _type: "reference", _ref: assetLiquid._id },
            alt: "Farmer applying liquid bio-fertilizers via drip irrigation in green field",
          },
          {
            _key: "b3-h3", _type: "block", style: "h3",
            children: [{ _key: "sh3-3", _type: "span", text: "PKVY का विस्तार (Paramparagat Krishi Vikas Yojana)" }],
          },
          {
            _key: "b3-7", _type: "block", style: "normal",
            children: [{ _key: "s3-7", _type: "span", text: "• **PKVY**: **Paramparagat Krishi Vikas Yojana**" }],
          },
          {
            _key: "b3-8", _type: "block", style: "normal",
            children: [{ _key: "s3-8", _type: "span", text: "• **उद्देश्य**: जैविक एवं प्राकृतिक खेती को बढ़ावा।" }],
          },
          {
            _key: "b3-9", _type: "block", style: "normal",
            children: [{ _key: "s3-9", _type: "span", text: "• **प्रोत्साहन**: स्वदेशी जैव-इनपुट्स के उपयोग को प्रोत्साहन।" }],
          },
          {
            _key: "b3-10", _type: "block", style: "normal",
            children: [{ _key: "s3-10", _type: "span", text: "• **उपलब्धि**: लाखों हेक्टेयर भूमि जैविक खेती के दायरे में लाई गई।" }],
          },
        ],
        bodyEn: [
          {
            _key: "b3-11", _type: "block", style: "normal",
            children: [{ _key: "s3-11", _type: "span", text: "Key Indian government initiatives promoting bio-fertilizers include PM-PRANAM (promoting alternative fertilizers), Liquid Bio-fertilizers, and Paramparagat Krishi Vikas Yojana (PKVY)." }],
          },
        ],
      },

      /* ── 4. Key Benefits ──────────────────────────────── */
      {
        _key: "sec-benefits",
        kind: "impact",
        title: "जैव-उर्वरकों के प्रमुख लाभ",
        titleEn: "Key Benefits of Bio-fertilizers",
        body: [
          {
            _key: "b4-h1", _type: "block", style: "h3",
            children: [{ _key: "sh4-1", _type: "span", text: "मिट्टी के स्वास्थ्य में सुधार" }],
          },
          {
            _key: "b4-1", _type: "block", style: "normal",
            children: [{ _key: "s4-1", _type: "span", text: "• **सूक्ष्मजीव**: प्राकृतिक सूक्ष्मजीवों की संख्या बढ़ती है।" }],
          },
          {
            _key: "b4-2", _type: "block", style: "normal",
            children: [{ _key: "s4-2", _type: "span", text: "• **उर्वरता**: मिट्टी की उर्वरता एवं उत्पादकता बढ़ती है।" }],
          },
          {
            _key: "b4-h2", _type: "block", style: "h3",
            children: [{ _key: "sh4-2", _type: "span", text: "कम लागत वाली खेती" }],
          },
          {
            _key: "b4-3", _type: "block", style: "normal",
            children: [{ _key: "s4-3", _type: "span", text: "• **लागत**: रासायनिक उर्वरकों की तुलना में सस्ते।" }],
          },
          {
            _key: "b4-4", _type: "block", style: "normal",
            children: [{ _key: "s4-4", _type: "span", text: "• **लाभार्थी**: छोटे एवं सीमांत किसानों के लिए लाभकारी।" }],
          },
          {
            _key: "b4-h3", _type: "block", style: "h3",
            children: [{ _key: "sh4-3", _type: "span", text: "जल प्रदूषण में कमी" }],
          },
          {
            _key: "b4-5", _type: "block", style: "normal",
            children: [{ _key: "s4-5", _type: "span", text: "• **नाइट्रेट लीचिंग**: नाइट्रेट लीचिंग कम होती है।" }],
          },
          {
            _key: "b4-6", _type: "block", style: "normal",
            children: [{ _key: "s4-6", _type: "span", text: "• **भूजल संरक्षण**: भूजल प्रदूषण की संभावना घटती है।" }],
          },
          {
            _key: "b4-h4", _type: "block", style: "h3",
            children: [{ _key: "sh4-4", _type: "span", text: "यूरिया सब्सिडी में कमी" }],
          },
          {
            _key: "b4-7", _type: "block", style: "normal",
            children: [{ _key: "s4-7", _type: "span", text: "• **निर्भरता**: रासायनिक उर्वरकों पर निर्भरता कम होती है।" }],
          },
          {
            _key: "b4-8", _type: "block", style: "normal",
            children: [{ _key: "s4-8", _type: "span", text: "• **बचत**: विदेशी मुद्रा एवं सरकारी सब्सिडी की बचत होती है।" }],
          },
          {
            _key: "b4-h5", _type: "block", style: "h3",
            children: [{ _key: "sh4-5", _type: "span", text: "पर्यावरण संरक्षण" }],
          },
          {
            _key: "b4-9", _type: "block", style: "normal",
            children: [{ _key: "s4-9", _type: "span", text: "• **जैव विविधता**: मिट्टी की जैव विविधता सुरक्षित रहती है।" }],
          },
          {
            _key: "b4-10", _type: "block", style: "normal",
            children: [{ _key: "s4-10", _type: "span", text: "• **सतत कृषि**: दीर्घकालिक सतत कृषि (Sustainable Agriculture) को बढ़ावा मिलता है।" }],
          },
        ],
        bodyEn: [
          {
            _key: "b4-11", _type: "block", style: "normal",
            children: [{ _key: "s4-11", _type: "span", text: "Benefits include soil health restoration, cost reduction for small farmers, lowered nitrate leaching, reduced national subsidy burden on urea, and long-term sustainable farming." }],
          },
        ],
      },

      /* ── 5. Comparison Section ──────────────────────────── */
      {
        _key: "sec-comparison",
        kind: "analysis",
        title: "जैव-उर्वरक बनाम रासायनिक उर्वरक",
        titleEn: "Bio-fertilizers vs Chemical Fertilizers",
        body: [
          {
            _key: "b5-1", _type: "block", style: "normal",
            children: [{ _key: "s5-1", _type: "span", text: "• **आधार**: जैव-उर्वरक जीवित सूक्ष्मजीवों पर आधारित होते हैं, जबकि रासायनिक उर्वरक रासायनिक तत्वों पर आधारित होते हैं।" }],
          },
          {
            _key: "b5-2", _type: "block", style: "normal",
            children: [{ _key: "s5-2", _type: "span", text: "• **मृदा स्वास्थ्य**: जैव-उर्वरक मिट्टी की उर्वरता बढ़ाते हैं, जबकि रासायनिक उर्वरक लंबे समय में मिट्टी की गुणवत्ता घटा सकते हैं।" }],
          },
          {
            _key: "b5-3", _type: "block", style: "normal",
            children: [{ _key: "s5-3", _type: "span", text: "• **पर्यावरण प्रभाव**: जैव-उर्वरक पूर्णतः पर्यावरण के अनुकूल हैं, जबकि रासायनिक उर्वरकों से प्रदूषण की संभावना अधिक होती है।" }],
          },
          {
            _key: "b5-4", _type: "block", style: "normal",
            children: [{ _key: "s5-4", _type: "span", text: "• **लागत**: जैव-उर्वरक कम लागत वाले होते हैं, जबकि रासायनिक उर्वरक अपेक्षाकृत महंगे होते हैं।" }],
          },
        ],
        bodyEn: [
          {
            _key: "b5-5", _type: "block", style: "normal",
            children: [{ _key: "s5-5", _type: "span", text: "Comparison matrix showing living organism base, eco-friendliness, cost efficiency, and long-term soil health impacts." }],
          },
        ],
      },

      /* ── 6. Exam Points & Quick Revision ───────────────── */
      {
        _key: "sec-quick-revision",
        kind: "wayForward",
        title: "परीक्षा हेतु महत्वपूर्ण तथ्य एवं Quick Revision",
        titleEn: "Exam Key Points & Quick Revision",
        body: [
          {
            _key: "b6-1", _type: "block", style: "normal",
            children: [{ _key: "s6-1", _type: "span", text: "• **जैव-उर्वरक**: जीवित सूक्ष्मजीव आधारित उर्वरक।" }],
          },
          {
            _key: "b6-2", _type: "block", style: "normal",
            children: [{ _key: "s6-2", _type: "span", text: "• **Rhizobium**: Nitrogen Fixation (दलहनी पौधों की जड़ों में)।" }],
          },
          {
            _key: "b6-3", _type: "block", style: "normal",
            children: [{ _key: "s6-3", _type: "span", text: "• **PSB**: Phosphate Solubilizing Bacteria (अघुलनशील फॉस्फेट को घोलना)।" }],
          },
          {
            _key: "b6-4", _type: "block", style: "normal",
            children: [{ _key: "s6-4", _type: "span", text: "• **VAM**: Vesicular Arbuscular Mycorrhiza (जल एवं फॉस्फोरस अवशोषण कवक)।" }],
          },
          {
            _key: "b6-5", _type: "block", style: "normal",
            children: [{ _key: "s6-5", _type: "span", text: "• **अपघटक सूक्ष्मजीव**: फसल अवशेष (पराली) का विघटन।" }],
          },
          {
            _key: "b6-6", _type: "block", style: "normal",
            children: [{ _key: "s6-6", _type: "span", text: "• **PM-PRANAM**: रासायनिक उर्वरकों की खपत कम करने की योजना।" }],
          },
          {
            _key: "b6-7", _type: "block", style: "normal",
            children: [{ _key: "s6-7", _type: "span", text: "• **PKVY**: Paramparagat Krishi Vikas Yojana (जैविक एवं प्राकृतिक खेती)।" }],
          },
        ],
        bodyEn: [
          {
            _key: "b6-8", _type: "block", style: "normal",
            children: [{ _key: "s6-8", _type: "span", text: "High-yield one-liner revision points tailored for UPSC & State PSC competitive exams." }],
          },
        ],
      },
    ],

    /* ─── FAQS (Exactly 8) ─────────────────────────────────── */
    faqs: [
      {
        question: "जैव-उर्वरक (Bio-fertilizer) किसे कहते हैं?",
        questionEn: "What are Bio-fertilizers?",
        answer: "जैव-उर्वरक ऐसे उत्पाद हैं जिनमें जीवित सूक्ष्मजीव (Living Microorganisms) पाए जाते हैं। जब इन्हें बीज, पौधों की जड़ों या मिट्टी में प्रयोग किया जाता है, तो ये वायुमंडलीय नाइट्रोजन का स्थिरीकरण करते हैं और मिट्टी में पोषक तत्वों की उपलब्धता बढ़ाकर प्राकृतिक रूप से मिट्टी की उर्वरता में सुधार करते हैं।",
        answerEn: "Bio-fertilizers are substances containing living microorganisms that, when applied to seeds, plant roots, or soil, colonize the rhizosphere and enhance the availability of primary nutrients to the host plant."
      },
      {
        question: "राइजोबियम (Rhizobium) जैव-उर्वरक पौधों के लिए कैसे उपयोगी है?",
        questionEn: "How is Rhizobium bio-fertilizer beneficial to plants?",
        answer: "राइजोबियम (Rhizobium) जीवाणु दलहनी फसलों की जड़ों में रहते हैं और वायुमंडलीय नाइट्रोजन को अमोनिया में परिवर्तित करते हैं। इससे पौधों को प्राकृतिक रूप से नाइट्रोजन प्राप्त होती है, जिससे रासायनिक यूरिया पर निर्भरता कम होती है।",
        answerEn: "Rhizobium bacteria reside in the root nodules of leguminous plants and convert atmospheric nitrogen into ammonia, providing a natural nitrogen source."
      },
      {
        question: "PSB (Phosphate Solubilizing Bacteria) की क्या भूमिका है?",
        questionEn: "What is the role of PSB (Phosphate Solubilizing Bacteria)?",
        answer: "मिट्टी में उपस्थित फॉस्फोरस सामान्यतः अघुलनशील रूप में होता है जिसे पौधे अवशोषित नहीं कर पाते। PSB (फॉस्फेट घुलनशील जीवाणु) कार्बनिक अम्ल छोड़कर इस अघुलनशील फॉस्फेट को घोलते हैं, जिससे पौधे आसानी से फॉस्फोरस अवशोषित कर लेते हैं।",
        answerEn: "PSB secrete organic acids to solubilize bound insoluble phosphorus in the soil into accessible ionic forms for plants."
      },
      {
        question: "माइकोराइजा (VAM) क्या है और यह पौधों की सहायता कैसे करता है?",
        questionEn: "What is VAM Mycorrhiza and how does it help plants?",
        answer: "VAM (Vesicular Arbuscular Mycorrhiza) एक लाभकारी कवक (Fungus) है। इसकी महीन संरचनाएँ मिट्टी में गहराई तक फैलती हैं, जिससे पौधों को अधिक मात्रा में जल एवं फॉस्फोरस उपलब्ध होता है।",
        answerEn: "VAM is a symbiotic fungus that extends fine hyphal structures deep into the soil to dramatically increase water and phosphorus absorption for crops."
      },
      {
        question: "PM-PRANAM योजना का मुख्य उद्देश्य क्या है?",
        questionEn: "What is the main objective of the PM-PRANAM scheme?",
        answer: "PM-PRANAM योजना का मुख्य उद्देश्य राज्यों और केंद्रशासित प्रदेशों को रासायनिक उर्वरकों की खपत कम करने तथा उनके स्थान पर वैकल्पिक एवं जैव-उर्वरकों के उपयोग को बढ़ावा देने के लिए प्रोत्साहित करना है।",
        answerEn: "The PM-PRANAM scheme aims to incentivize states and UTs to reduce chemical fertilizer consumption and promote alternative and bio-fertilizer adoption."
      },
      {
        question: "तरल जैव-उर्वरक तकनीक (Liquid Bio-fertilizer Technology) के क्या लाभ हैं?",
        questionEn: "What are the advantages of Liquid Bio-fertilizer Technology?",
        answer: "भारत द्वारा विकसित तरल जैव-उर्वरक तकनीक की शेल्फ-लाइफ लंबी होती है, इन्हें आसानी से संग्रहित किया जा सकता है और इनका उपयोग ड्रिप सिंचाई (Drip Irrigation) के माध्यम से भी आसानी से किया जा सकता है।",
        answerEn: "Liquid bio-fertilizers offer extended shelf-life, simple storage conditions, and seamless application through modern drip irrigation fertigation systems."
      },
      {
        question: "परंपरागत कृषि विकास योजना (PKVY) जैव-उर्वरकों को कैसे प्रोत्साहित करती है?",
        questionEn: "How does PKVY promote bio-fertilizer usage?",
        answer: "PKVY योजना जैविक एवं प्राकृतिक खेती को बढ़ावा देने के लिए स्वदेशी जैव-इनपुट्स (Bio-inputs) और जैव-उर्वरकों के उपयोग को प्रोत्साहित करती है, जिससे भारत में लाखों हेक्टेयर भूमि जैविक खेती के दायरे में आई है।",
        answerEn: "PKVY promotes organic farming and indigenous bio-inputs, bringing millions of hectares of agricultural land under sustainable organic practices."
      },
      {
        question: "जैव-उर्वरक और रासायनिक उर्वरक में मुख्य अंतर क्या है?",
        questionEn: "What is the key difference between Bio-fertilizers and Chemical Fertilizers?",
        answer: "जैव-उर्वरक जीवित सूक्ष्मजीवों पर आधारित, पर्यावरण के अनुकूल, कम लागत वाले होते हैं और मिट्टी की उर्वरता बढ़ाते हैं। इसके विपरीत, रासायनिक उर्वरक रासायनिक तत्वों पर आधारित होते हैं, महंगे होते हैं और लंबे समय में मिट्टी की गुणवत्ता घटा सकते हैं।",
        answerEn: "Bio-fertilizers are living microbe-based, eco-friendly, cost-effective, and long-term soil enhancers, whereas chemical fertilizers are synthetic, costly, and can degrade soil structure over time."
      }
    ],

    /* ─── MCQS (Exactly 8) ─────────────────────────────────── */
    mcqs: [
      {
        question: "जैव-उर्वरकों को 'जैविक पोषक तत्व परिवर्तक' (Biological Nutrient Converter) क्यों कहा जाता है?",
        questionEn: "Why are bio-fertilizers called 'Biological Nutrient Converters'?",
        options: [
          "A. ये रासायनिक उर्वरकों का निर्माण करते हैं",
          "B. ये वायुमंडलीय नाइट्रोजन को स्थिर कर खनिजों को उपयोगी रूप में बदलते हैं",
          "C. ये मिट्टी में जल के अवशोषण को पूरी तरह रोकते हैं",
          "D. ये केवल फसलों की पत्तियों का रंग बदलते हैं"
        ],
        optionsEn: [
          "A. They manufacture synthetic chemical fertilizers",
          "B. They fix atmospheric nitrogen and convert minerals into usable forms",
          "C. They completely stop water absorption in soil",
          "D. They only alter leaf pigmentation"
        ],
        correctIndex: 1,
        explanation: "जैव-उर्वरक वायुमंडलीय नाइट्रोजन का स्थिरीकरण करते हैं और मिट्टी में उपस्थित खनिजों को पौधों के लिए उपयोगी रूप में परिवर्तित करते हैं, इसलिए इन्हें 'जैविक पोषक तत्व परिवर्तक' कहा जाता है।",
        explanationEn: "Bio-fertilizers fix atmospheric nitrogen and convert bound soil minerals into bio-available forms for plants."
      },
      {
        question: "निम्नलिखित में से कौन-सा जीवाणु दलहनी फसलों की जड़ों में रहकर नाइट्रोजन स्थिरीकरण (Nitrogen Fixation) करता है?",
        questionEn: "Which bacterium resides in the root nodules of legumes to perform nitrogen fixation?",
        options: ["A. PSB", "B. Rhizobium", "C. VAM", "D. यूरिया"],
        optionsEn: ["A. PSB", "B. Rhizobium", "C. VAM", "D. Urea"],
        correctIndex: 1,
        explanation: "Rhizobium जीवाणु दलहनी फसलों की जड़ों में रहते हैं और वायुमंडलीय नाइट्रोजन को अमोनिया में परिवर्तित करते हैं।",
        explanationEn: "Rhizobium bacteria form symbiotic associations with leguminous roots to convert gaseous nitrogen into ammonia."
      },
      {
        question: "PSB (Phosphate Solubilizing Bacteria) मिट्टी में अघुलनशील फॉस्फेट को घुलनशील बनाने के लिए क्या छोड़ते हैं?",
        questionEn: "What do Phosphate Solubilizing Bacteria (PSB) release to dissolve insoluble soil phosphate?",
        options: [
          "A. कार्बनिक अम्ल (Organic Acids)",
          "B. क्षार (Bases)",
          "C. केवल जलवाष्प",
          "D. रासायनिक लवण"
        ],
        optionsEn: [
          "A. Organic Acids",
          "B. Alkaline bases",
          "C. Only water vapor",
          "D. Synthetic chemical salts"
        ],
        correctIndex: 0,
        explanation: "PSB सूक्ष्मजीव कार्बनिक अम्ल छोड़कर मिट्टी में उपस्थित अघुलनशील फॉस्फेट को घोलते हैं ताकि पौधे इसे आसानी से अवशोषित कर सकें।",
        explanationEn: "PSB secrete organic acids that solubilize insoluble phosphorus compounds in soil into ionic plant-absorbable forms."
      },
      {
        question: "VAM (Vesicular Arbuscular Mycorrhiza) के संदर्भ में कौन-सा कथन सत्य है?",
        questionEn: "Which statement regarding VAM (Vesicular Arbuscular Mycorrhiza) is correct?",
        options: [
          "A. यह एक प्रकार का जीवाणु (Bacteria) है",
          "B. यह रासायनिक यूरिया का विकल्प है",
          "C. यह एक लाभकारी कवक (Fungus) है जो जल एवं फॉस्फोरस अवशोषण बढ़ाता है",
          "D. यह केवल पराली जलाने में काम आता है"
        ],
        optionsEn: [
          "A. It is a unicellular bacterium",
          "B. It is a synthetic chemical substitute for urea",
          "C. It is a beneficial fungus that enhances water and phosphorus absorption",
          "D. It is used exclusively for stubble burning"
        ],
        correctIndex: 2,
        explanation: "VAM एक लाभकारी कवक (Fungus) है जिसकी महीन संरचनाएं मिट्टी में गहराई तक फैलकर पौधों को अधिक जल एवं फॉस्फोरस उपलब्ध कराती हैं।",
        explanationEn: "VAM is a symbiotic fungus that develops hyphal networks to dramatically increase water and phosphorus uptake."
      },
      {
        question: "'PM-PRANAM' योजना का पूरा नाम क्या है?",
        questionEn: "What is the full expansion of the 'PM-PRANAM' scheme?",
        options: [
          "A. PM Programme for Rural Agriculture and Natural Farming",
          "B. PM Programme for Restoration, Awareness, Nourishment and Amelioration of Mother Earth",
          "C. PM Production Renewal and Agricultural Nutrient Action Mission",
          "D. PM Promotion of Organic and Natural Fertilizer Mission"
        ],
        optionsEn: [
          "A. PM Programme for Rural Agriculture and Natural Farming",
          "B. PM Programme for Restoration, Awareness, Nourishment and Amelioration of Mother Earth",
          "C. PM Production Renewal and Agricultural Nutrient Action Mission",
          "D. PM Promotion of Organic and Natural Fertilizer Mission"
        ],
        correctIndex: 1,
        explanation: "PM-PRANAM का पूरा नाम 'PM Programme for Restoration, Awareness, Nourishment and Amelioration of Mother Earth' है।",
        explanationEn: "PM-PRANAM stands for PM Programme for Restoration, Awareness, Nourishment and Amelioration of Mother Earth."
      },
      {
        question: "भारत द्वारा विकसित तरल जैव-उर्वरक तकनीक (Liquid Bio-fertilizer Technology) की प्रमुख विशेषता क्या है?",
        questionEn: "What is the main feature of India's Liquid Bio-fertilizer Technology?",
        options: [
          "A. इसकी शेल्फ-लाइफ बहुत कम होती है",
          "B. इसे केवल हवा में छिड़का जाता है",
          "C. इसकी दीर्घ शेल्फ-लाइफ होती है और इसे ड्रिप सिंचाई से भी प्रयोग किया जा सकता है",
          "D. यह मिट्टी की नमी सुखा देती है"
        ],
        optionsEn: [
          "A. Extremely short shelf life",
          "B. Can only be sprayed in air",
          "C. Extended shelf life and compatible with drip irrigation systems",
          "D. Depletes soil moisture"
        ],
        correctIndex: 2,
        explanation: "तरल जैव-उर्वरक की शेल्फ-लाइफ लंबी होती है, यह आसानी से संग्रहित की जा सकती है और ड्रिप सिंचाई द्वारा भी दी जा सकती है।",
        explanationEn: "Liquid formulations provide higher thermal tolerance, longer shelf life, and seamless fertigation capability via drip irrigation."
      },
      {
        question: "जैव-उर्वरकों के प्रयोग से निम्नलिखित में से किसमें कमी आती है?",
        questionEn: "The application of bio-fertilizers directly leads to a reduction in which of the following?",
        options: [
          "A. मिट्टी के जैविक कार्बन में",
          "B. नाइट्रेट लीचिंग एवं भूजल प्रदूषण में",
          "C. सूक्ष्मजीवों की कुल संख्या में",
          "D. फसल उत्पादन एवं गुणवत्ता में"
        ],
        optionsEn: [
          "A. Soil organic carbon levels",
          "B. Nitrate leaching and groundwater pollution",
          "C. Beneficial microbial population",
          "D. Total agricultural crop yield"
        ],
        correctIndex: 1,
        explanation: "जैव-उर्वरकों के प्रयोग से नाइट्रेट लीचिंग कम होती है, जिससे भूजल प्रदूषण घटता है और यूरिया सब्सिडी का बोझ भी कम होता है।",
        explanationEn: "Bio-fertilizers reduce chemical runoff and nitrate leaching, safeguarding groundwater ecosystems."
      },
      {
        question: "जैविक एवं प्राकृतिक खेती को बढ़ावा देने तथा स्वदेशी जैव-इनपुट्स को प्रोत्साहित करने वाली योजना कौन-सी है?",
        questionEn: "Which central scheme focuses on promoting organic farming and indigenous bio-inputs?",
        options: [
          "A. PM-PRANAM",
          "B. PKVY (Paramparagat Krishi Vikas Yojana)",
          "C. VAM योजना",
          "D. PSB मिशन"
        ],
        optionsEn: [
          "A. PM-PRANAM",
          "B. PKVY (Paramparagat Krishi Vikas Yojana)",
          "C. VAM Scheme",
          "D. PSB Mission"
        ],
        correctIndex: 1,
        explanation: "PKVY (परंपरागत कृषि विकास योजना) का उद्देश्य जैविक एवं प्राकृतिक खेती को बढ़ावा देना और स्वदेशी जैव-इनपुट्स के उपयोग को प्रोत्साहित करना है।",
        explanationEn: "PKVY promotes organic agriculture, cluster farming, and indigenous bio-inputs across India."
      }
    ],

    /* ─── Sources ────────────────────────────────────────────── */
    sources: [
      { label: "Ministry of Agriculture & Farmers Welfare, Govt of India", url: "https://agricoop.nic.in" },
      { label: "Indian Council of Agricultural Research (ICAR)", url: "https://icar.org.in" }
    ]
  };

  try {
    await client.createOrReplace(article);
    console.log("✨ Successfully uploaded Bio-fertilizers Static GK Article to Sanity CMS!");
  } catch (err) {
    console.error("❌ Failed to create/replace document in Sanity:", err);
  }
}

main().catch((err) => {
  console.error("❌ Error running script:", err);
  process.exit(1);
});
