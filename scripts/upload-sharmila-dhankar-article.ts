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
  console.log("🚀 Starting upload process for Sharmila Dhankar CWG 2026 Gold Medal Article...");

  const publicBlogDir = path.resolve(process.cwd(), "public/images/blog");

  // 1. Real Flag Celebration Photo (Featured & Sec 1)
  const realFlagPath = path.join(publicBlogDir, "sharmila_dhankar_real_flag_celebration.png");
  let assetRealFlag;
  if (fs.existsSync(realFlagPath)) {
    console.log("📸 Uploading Real Flag Celebration Photo for Sharmila Dhankar to Sanity...");
    assetRealFlag = await client.assets.upload("image", fs.createReadStream(realFlagPath), {
      filename: "sharmila_dhankar_real_flag_celebration.png",
    });
    console.log(`✔ Uploaded Real Flag Photo. Asset ID: ${assetRealFlag._id}`);
  }

  // 2. Real Shot Put Action Photo (Sec 2)
  const realActionPath = path.join(publicBlogDir, "sharmila_dhankar_real_shot_put_action.png");
  let assetRealAction;
  if (fs.existsSync(realActionPath)) {
    console.log("📸 Uploading Real Shot Put Action Photo for Sharmila Dhankar to Sanity...");
    assetRealAction = await client.assets.upload("image", fs.createReadStream(realActionPath), {
      filename: "sharmila_dhankar_real_shot_put_action.png",
    });
    console.log(`✔ Uploaded Real Shot Put Action Photo. Asset ID: ${assetRealAction._id}`);
  }

  const article = {
    _id: "ca-sharmila-dhankar-gold-cwg-2026",
    _type: "currentAffairs",
    slug: { _type: "slug", current: "sharmila-dhankar-biography-cwg-2026-gold-medal-para-athletics" },
    title: "शर्मिला धनखड़ (Sharmila Dhankar): जीवनी, उम्र, पति, घरेलू हिंसा से CWG 2026 स्वर्ण तक की कहानी, 9.81m रिकॉर्ड व नोट्स | MPPSC & UPSC",
    titleEn: "Sharmila Dhankar Biography: Age, Husband, Abuse Survivor to CWG 2026 Gold (9.81m Record), Shot Put F57 & Notes | MPPSC & UPSC",
    excerpt: "शर्मिला धनखड़ (Sharmila Dhankar) की प्रेरणादायक जीवनी: उम्र, पति, घरेलू हिंसा से उबरकर ग्लासगो 2026 कॉमनवेल्थ गेम्स में शॉट पुट F57 का पहला स्वर्ण (9.81m) जीतने का स्वर्णिम सफर, F57 श्रेणी का तकनीकी विश्लेषण, महेंद्रगढ़ (हरियाणा) का जीवन संघर्ष, फज्जा चैंपियनशिप रिकॉर्ड्स व MPPSC/UPSC परीक्षा उपयोगी नोट्स।",
    excerptEn: "Sharmila Dhankar Biography: Age, husband, domestic abuse survivor story, CWG 2026 Gold Medal in Women's Shot Put F57 with 9.81m Season Best throw, F57 classification, Mahendragarh Haryana struggle, and MPPSC/UPSC study notes.",
    ca_date: "2026-07-28",
    publishedAt: new Date().toISOString(),
    featured: true,
    readingTime: 14,
    keywords: [
      "Sharmila Dhankar",
      "शर्मिला धनखड़",
      "शर्मिला धनकर",
      "sharmila dhankhar commonwealth games",
      "sharmila dhankar age",
      "sharmila dhankar husband",
      "sharmila dhankar domestic abuse survivor story",
      "sharmila dhankar para athletics gold",
      "sharmila dhankar story in hindi",
      "sharmila dhankar cwg 2026",
      "sharmila dhankar biography",
      "Sharmila Dhankar Gold Medal CWG 2026",
      "शर्मिला धनखड़ कॉमनवेल्थ गेम्स 2026 स्वर्ण पदक",
      "Women Shot Put F57 CWG 2026",
      "Sharmila Dhankar 9.81m Shot Put Record",
      "Para Athletics India First Gold CWG",
      "F57 Category Para Athletics",
      "F vs T in Para Sports",
      "Sharmila Dhankar Mahendragarh Haryana",
      "Glasgow Commonwealth Games 2026 Para Athletics",
      "Fazza International Para Athletics Championships",
      "Sports Current Affairs 2026",
      "खेल समसामयिकी 2026",
      "MPPSC Sports Notes",
      "MPPSC Paper 1 Sports Syllabus",
      "MPPSC Paper 3 General Knowledge",
      "UPSC Current Affairs Sports"
    ],
    category: { _type: "reference", _ref: "cat-sports" },
    author: { _type: "reference", _ref: "author-aakar" },
    tags: [
      { _type: "reference", _ref: "tag-mppsc" },
      { _type: "reference", _ref: "tag-upsc" },
      { _type: "reference", _ref: "tag-sports" },
      { _type: "reference", _ref: "tag-prelims" },
      { _type: "reference", _ref: "tag-mains" },
    ],
    syllabus: ["Sports-GK", "MPPSC Paper-1 Unit-5", "MPPSC Paper-3", "Prelims-GS"],
    ...(assetRealFlag ? {
      featuredImage: {
        _type: "image",
        asset: { _type: "reference", _ref: assetRealFlag._id },
        alt: "Sharmila Dhankar Gold Medal Victory Shot Put F57 Glasgow 2026 Commonwealth Games MPPSC UPSC Notes",
      }
    } : {}),

    /* ─── SECTIONS ──────────────────────────────────────────────── */
    sections: [
      /* ── 1. Why in News & Overview ─────────────────────────────── */
      {
        _key: "sec-why-in-news",
        kind: "whyInNews",
        title: "शर्मिला धनखड़ ने रचा इतिहास: राष्ट्रमंडल खेल 2026 में पैरा एथलेटिक्स का पहला स्वर्ण",
        titleEn: "Sharmila Dhankar Scripted History: India's 1st CWG Para Athletics Gold",
        body: [
          {
            _key: "b1-1", _type: "block", style: "normal",
            children: [{ _key: "s1-1", _type: "span", text: "ग्लासगो **कॉमनवेल्थ गेम्स 2026 (Glasgow Commonwealth Games 2026)** में भारतीय पैरा एथलीट **शर्मिला धनखड़ (Sharmila Dhankar)** ने **महिला शॉट पुट F57 स्पर्धा** में **9.81 मीटर** के अपने सीजन के सर्वश्रेष्ठ प्रदर्शन (**Season Best - SB**) के साथ स्वर्ण पदक जीतकर इतिहास रच दिया है।" }],
          },
          ...(assetRealFlag ? [{
            _type: "image",
            asset: { _type: "reference", _ref: assetRealFlag._id },
            alt: "Sharmila Dhankar celebrating Gold Medal with Indian national flag in Glasgow CWG 2026 stadium",
            caption: "शर्मिला धनखड़: कॉमनवेल्थ गेम्स 2026 ग्लासगो में महिला शॉट पुट F57 में ऐतिहासिक स्वर्ण पदक जीतने के बाद भारतीय तिरंगे के साथ जश्न मनातीं",
          }] : []),
          {
            _key: "b1-2", _type: "block", style: "normal",
            children: [{ _key: "s1-2", _type: "span", text: "यह राष्ट्रमंडल खेलों के इतिहास में **पैरा एथलेटिक्स में भारत का पहला स्वर्ण पदक** है। इसके साथ ही, शर्मिला धनखड़ राष्ट्रमंडल खेलों में पैरा एथलेटिक्स में स्वर्ण पदक जीतने वाली **पहली भारतीय** और पदक हासिल करने वाली **पहली भारतीय महिला पैरा एथलीट** बन गई हैं। भारत की इस ऐतिहासिक सफलता में साथी एथलीट शिल्पा के. शायला ने कांस्य पदक जीतकर दोहरी खुशी प्रदान की।" }],
          },
          {
            _key: "b1-seo", _type: "block", style: "normal",
            children: [{ _key: "s1-seo", _type: "span", text: "🔗 **संबंधित महत्वपूर्ण लेख**: [कॉमनवेल्थ गेम्स 2026 मेडल टैली एवं भारत के सभी पदक विजेता ➔](/current-affairs/commonwealth-games-2026-updates-india-medal-tally) | [मीराबाई चानू का 190kg स्वर्ण पदक एवं सम्पूर्ण जीवनी ➔](/current-affairs/mirabai-chanu-biography-cwg-2026-gold-medal-weightlifting)" }],
          },
          {
            _key: "b1-h1", _type: "block", style: "h3",
            children: [{ _key: "sh1-1", _type: "span", text: "चर्चा में क्यों? (Key Context & Highlights)" }],
          },
          {
            _key: "b1-d1", _type: "block", style: "normal",
            children: [{ _key: "s1-d1", _type: "span", text: "• **ऐतिहासिक स्वर्ण पदक**: कॉमनवेल्थ गेम्स 2026 (ग्लासगो) में भारत को पैरा एथलेटिक्स श्रेणी का पहला ऐतिहासिक स्वर्ण पदक।" }],
          },
          {
            _key: "b1-d2", _type: "block", style: "normal",
            children: [{ _key: "s1-d2", _type: "span", text: "• **सर्वश्रेष्ठ थ्रो (9.81m)**: महिला शॉट पुट F57 स्पर्धा में 9.81 मीटर का सीजन का सर्वश्रेष्ठ प्रदर्शन (Season Best)।" }],
          },
          {
            _key: "b1-d3", _type: "block", style: "normal",
            children: [{ _key: "s1-d3", _type: "span", text: "• **20 वर्षों का सूखा समाप्त**: राष्ट्रमंडल खेलों में 20 वर्षों के लंबे इंतजार के बाद पैरा एथलेटिक्स में भारत को स्वर्ण पदक मिला।" }],
          },
          {
            _key: "b1-d4", _type: "block", style: "normal",
            children: [{ _key: "s1-d4", _type: "span", text: "• **वैश्विक दिग्गजों को दी मात**: कनाडा, इंग्लैंड, वेल्स, ऑस्ट्रेलिया और घाना जैसी दिग्गज टीमों की शीर्ष खिलाड़ियों को पछाड़कर स्वर्ण पदक अपने नाम किया।" }],
          },
        ],
        bodyEn: [
          {
            _key: "b1-3", _type: "block", style: "normal",
            children: [{ _key: "s1-3", _type: "span", text: "Sharmila Dhankar won India's first ever Gold medal in Para-Athletics at the Glasgow Commonwealth Games 2026 with a Season Best throw of 9.81m in Women's Shot Put F57." }],
          },
        ],
      },

      /* ── 2. Competition Performance Breakdown ──────────────────── */
      {
        _key: "sec-competition-performance",
        kind: "keyHighlights",
        title: "कॉमनवेल्थ गेम्स 2026: शर्मिला धनखड़ का प्रतियोगिता में प्रदर्शन",
        titleEn: "CWG 2026 Event Breakdown & Performance Details",
        body: [
          ...(assetRealAction ? [{
            _type: "image",
            asset: { _type: "reference", _ref: assetRealAction._id },
            alt: "Sharmila Dhankar performing Shot Put F57 throw with intense concentration",
            caption: "शर्मिला धनखड़: शॉट पुट F57 स्पर्धा में 9.81 मीटर का स्वर्णिम थ्रो फेंकते हुए एकाग्रता की वास्तविक तस्वीर",
          }] : []),
          {
            _key: "b2-h1", _type: "block", style: "h3",
            children: [{ _key: "sh2-1", _type: "span", text: "1. स्पर्धा विवरण एवं थ्रो आँकड़े (Performance Statistics Table)" }],
          },
          {
            _type: "table",
            caption: "शर्मिला धनखड़: CWG 2026 स्वर्ण पदक प्रदर्शन तालिका",
            headers: ["मानदंड (Parameter)", "प्रदर्शन / विवरण (Details)"],
            rows: [
              ["**एथलीट (Athlete)**", "**शर्मिला धनखड़ (Sharmila Dhankar)**"],
              ["**स्पर्धा (Event)**", "महिला शॉट पुट F57 (Women's Shot Put F57)"],
              ["**आयोजन स्थल (Venue)**", "ग्लासगो, स्कॉटलैंड (CWG 2026)"],
              ["**पहला प्रयास (First Attempt)**", "9.48 मीटर"],
              ["**सर्वश्रेष्ठ थ्रो (Best Throw)**", "**9.81 मीटर (Season Best - SB)**"],
              ["**अंतिम परिणाम (Medal)**", "**स्वर्ण पदक (Gold Medal)**"],
              ["**प्रतिद्वंद्वी देश (Competitors)**", "कनाडा, इंग्लैंड, वेल्स, ऑस्ट्रेलिया, घाना"]
            ]
          },
          {
            _key: "b2-h2", _type: "block", style: "h3",
            children: [{ _key: "sh2-2", _type: "span", text: "2. थ्रो का रणनीतिक विश्लेषण" }],
          },
          {
            _key: "b2-1", _type: "block", style: "normal",
            children: [{ _key: "s2-1", _type: "span", text: "• **शुरुआती बढ़त**: शर्मिला ने अपने पहले ही प्रयास में **9.48 मीटर** का थ्रो फेंककर प्रतियोगिता पर मजबूत पकड़ बना ली थी।" }],
          },
          {
            _key: "b2-2", _type: "block", style: "normal",
            children: [{ _key: "s2-2", _type: "span", text: "• **स्वर्णिम मील का पत्थर**: उन्होंने अपने अगले प्रयासों में और अधिक सुधार करते हुए **9.81 मीटर** का सीजन का सर्वश्रेष्ठ प्रदर्शन दर्ज किया, जिसे कोई भी अन्य प्रतिद्वंद्वी पार नहीं कर सका।" }],
          },
        ],
        bodyEn: [
          {
            _key: "b2-3", _type: "block", style: "normal",
            children: [{ _key: "s2-3", _type: "span", text: "Detailed attempt breakdown: 9.48m on first attempt and peak Season Best of 9.81m to secure Gold ahead of Canada, England, and Australia." }],
          },
        ],
      },

      /* ── 3. F57 Category & Technical Classification ───────────── */
      {
        _key: "sec-f57-classification",
        kind: "background",
        title: "पैरा एथलेटिक्स F57 श्रेणी क्या है? (Technical Classification for MPPSC)",
        titleEn: "What is F57 Category in Para Athletics? Technical Explanation",
        body: [
          {
            _key: "b3-intro", _type: "block", style: "normal",
            children: [{ _key: "s3-in", _type: "span", text: "परीक्षा की दृष्टि से पैरा खेलों का वर्गीकरण (Classification) अत्यंत महत्वपूर्ण है। **F57** पैरा एथलेटिक्स की एक विशेष फील्ड स्पर्धा श्रेणी है:" }],
          },
          {
            _key: "b3-h1", _type: "block", style: "h3",
            children: [{ _key: "sh3-1", _type: "span", text: "1. F57 श्रेणी की प्रमुख विशेषताएँ" }],
          },
          {
            _key: "b3-1", _type: "block", style: "normal",
            children: [{ _key: "s3-1", _type: "span", text: "• **बैठकर थ्रो (Seated Position)**: F57 श्रेणी के एथलीट खड़े होकर नहीं, बल्कि विशेष रूप से तैयार किए गए थ्रोइंग फ्रेम (Throwing Frame) पर बैठकर थ्रो करते हैं।" }],
          },
          {
            _key: "b3-2", _type: "block", style: "normal",
            children: [{ _key: "s3-2", _type: "span", text: "• **शारीरिक अक्षमता (Impairment)**: इस श्रेणी में ऐसे खिलाड़ियों को शामिल किया जाता है जिनके निचले अंगों में विकलांगता, अंग हानि (Amputation), या मांसपेशियों में अत्यधिक कमजोरी होती है।" }],
          },
          {
            _key: "b3-3", _type: "block", style: "normal",
            children: [{ _key: "s3-3", _type: "span", text: "• **तकनीक व शक्ति (Upper Body Strength)**: चूंकि निचले शरीर का उपयोग नहीं होता, इसलिए थ्रो का पूरा दारोमदार **ऊपरी शरीर (Trunk & Shoulder) की शक्ति, संतुलन और हाथ की गतिविधि** पर निर्भर करता है।" }],
          },
          {
            _key: "b3-h2", _type: "block", style: "h3",
            children: [{ _key: "sh3-2", _type: "span", text: "2. PYQ Concept: 'F' एवं 'T' श्रेणी का अर्थ (MPPSC Exam Special)" }],
          },
          {
            _key: "b3-4", _type: "block", style: "normal",
            children: [{ _key: "s3-4", _type: "span", text: "• **F (Field Events)**: पैरा एथलेटिक्स में 'F' का तात्पर्य **फील्ड स्पर्धाओं** से है, जैसे शॉट पुट (gola phek), डिस्कस थ्रो (chakka phek), और जैवलिन थ्रो (bhalaphek)।" }],
          },
          {
            _key: "b3-5", _type: "block", style: "normal",
            children: [{ _key: "s3-5", _type: "span", text: "• **T (Track Events)**: पैरा एथलेटिक्स में 'T' का तात्पर्य **ट्रैक स्पर्धाओं** से है, जैसे 100m, 200m, 400m दौड़ प्रतियोगिताएँ एवं व्हीलचेयर रेसिंग।" }],
          },
        ],
        bodyEn: [
          {
            _key: "b3-6", _type: "block", style: "normal",
            children: [{ _key: "s3-6", _type: "span", text: "F57 classification involves seated throwers with lower limb impairments relying on upper body power. F denotes Field events and T denotes Track events." }],
          },
        ],
      },

      /* ── 4. Sharmila Dhankar Biography, Age, Family & Abuse Survivor Journey ────── */
      {
        _key: "sec-biography-struggles",
        kind: "analysis",
        title: "शर्मिला धनखड़ का जीवन परिचय: उम्र, पति, घरेलू हिंसा से CWG स्वर्ण तक का स्वर्णिम सफर",
        titleEn: "Sharmila Dhankar Biography: Age, Family, Domestic Abuse Survivor to CWG Gold",
        body: [
          {
            _key: "b4-h1", _type: "block", style: "h3",
            children: [{ _key: "sh4-1", _type: "span", text: "1. व्यक्तिगत परिचय व पारिवारिक पृष्ठभूमि (Personal Profile)" }],
          },
          {
            _key: "b4-1", _type: "block", style: "normal",
            children: [{ _key: "s4-1", _type: "span", text: "• **पूरा नाम**: शर्मिला धनखड़ (Sharmila Dhankar)" }],
          },
          {
            _key: "b4-2", _type: "block", style: "normal",
            children: [{ _key: "s4-2", _type: "span", text: "• **गृह राज्य व जिला**: महेंद्रगढ़ जिला, हरियाणा (India)" }],
          },
          {
            _key: "b4-3", _type: "block", style: "normal",
            children: [{ _key: "s4-3", _type: "span", text: "• **उम्र व जन्म (Age & Profile)**: शर्मिला का जन्म हरियाणा के ग्रामीण अंचल में हुआ। विपरीत परिस्थितियों में पलकर उन्होंने अंतरराष्ट्रीय खेलों में अपनी अमिट छाप छोड़ी है।" }],
          },
          {
            _key: "b4-h2", _type: "block", style: "h3",
            children: [{ _key: "sh4-2", _type: "span", text: "2. घरेलू हिंसा और दुर्व्यवहार से उबरकर चैंपियन बनने की प्रेरणादायक कहानी (Abuse Survivor Story)" }],
          },
          {
            _key: "b4-4", _type: "block", style: "normal",
            children: [{ _key: "s4-4", _type: "span", text: "• **घरेलू दुर्व्यवहार का सामना**: शर्मिला धनखड़ का शुरुआती व्यक्तिगत जीवन अत्यधिक वेदनादायक और संघर्षों से भरा रहा। शादी के बाद उन्हें गंभीर **घरेलू हिंसा (Domestic Abuse)** और मानसिक-शारीरिक प्रताड़ना का सामना करना पड़ा।" }],
          },
          {
            _key: "b4-5", _type: "block", style: "normal",
            children: [{ _key: "s4-5", _type: "span", text: "• **आत्मविश्वास और पुनर्जन्म**: प्रताड़नाओं से टूटने के बजाय शर्मिला ने अपने आत्मसम्मान के लिए संघर्ष का रास्ता चुना और खेलों को अपनी शक्ति बनाया। उन्होंने अपने जीवन की सबसे बड़ी त्रासदी को अपनी सबसे बड़ी ताकत में बदल दिया।" }],
          },
          {
            _key: "b4-6", _type: "block", style: "normal",
            children: [{ _key: "s4-6", _type: "span", text: "• **खेल हेतु परिवार ने बेचा घर**: अपने स्पोर्ट्स करियर, उपकरण, खुराक और ट्रेनिंग खर्चों को पूरा करने के लिए शर्मिला के परिवार को अपना **घर तक बेचना पड़ा**। इस अद्वितीय पारिवारिक समर्पण और अटूट लगन का प्रतिफल आज राष्ट्रमंडल खेल 2026 के स्वर्ण पदक के रूप में देश के सामने है।" }],
          },
          {
            _key: "b4-h3", _type: "block", style: "h3",
            children: [{ _key: "sh4-3", _type: "span", text: "3. शर्मिला धनखड़ की प्रमुख राष्ट्रीय व अंतरराष्ट्रीय उपलब्धियाँ" }],
          },
          {
            _key: "b4-7", _type: "block", style: "normal",
            children: [{ _key: "s4-7", _type: "span", text: "• 🥇 **कॉमनवेल्थ गेम्स 2026 (ग्लासगो)**: महिला शॉट पुट F57 में 9.81m थ्रो के साथ **स्वर्ण पदक**।" }],
          },
          {
            _key: "b4-8", _type: "block", style: "normal",
            children: [{ _key: "s4-8", _type: "span", text: "• 🥇🥉 **फज्जा इंटरनेशनल पैरा एथलेटिक्स (दुबई)**: शॉट पुट में **स्वर्ण पदक** तथा डिस्कस थ्रो में **कांस्य पदक**।" }],
          },
          {
            _key: "b4-9", _type: "block", style: "normal",
            children: [{ _key: "s4-9", _type: "span", text: "• 🇮🇳 **राष्ट्रीय पैरा एथलेटिक्स चैंपियनशिप**: **9.52 मीटर** थ्रो के साथ राष्ट्रीय रिकॉर्ड अपने नाम दर्ज किया।" }],
          },
          {
            _key: "b4-10", _type: "block", style: "normal",
            children: [{ _key: "s4-10", _type: "span", text: "• 🏅 **कॉमनवेल्थ गेम्स 2022 (बर्मिंघम)**: चौथे स्थान (4th Position) पर रहीं।" }],
          },
          {
            _key: "b4-11", _type: "block", style: "normal",
            children: [{ _key: "s4-11", _type: "span", text: "• 🏅 **एशियाई पैरा खेल (हांगझोऊ)**: चौथा स्थान (4th Position)।" }],
          },
          {
            _key: "b4-12", _type: "block", style: "normal",
            children: [{ _key: "s4-12", _type: "span", text: "• 🏅 **विश्व पैरा एथलेटिक्स चैंपियनशिप (नई दिल्ली)**: पाँचवाँ स्थान (5th Position)।" }],
          },
        ],
        bodyEn: [
          {
            _key: "b4-13", _type: "block", style: "normal",
            children: [{ _key: "s4-13", _type: "span", text: "Hailing from Mahendragarh Haryana, Sharmila overcame domestic abuse and severe financial hardship—where her family sold their house to fund her sports training—to script history by winning CWG 2026 Gold." }],
          },
        ],
      },

      /* ── 5. Significance & Impact for Indian Para Sports ──────── */
      {
        _key: "sec-significance-impact",
        kind: "wayForward",
        title: "राष्ट्रमंडल खेल 2026 में भारत के लिए इस स्वर्ण का महत्व",
        titleEn: "Significance of Sharmila's Gold for Indian Para Sports Movement",
        body: [
          {
            _key: "b5-1", _type: "block", style: "normal",
            children: [{ _key: "s5-1", _type: "span", text: "• **20 वर्षों का सूखा समाप्त**: भारत को राष्ट्रमंडल खेलों की पैरा एथलेटिक्स स्पर्धा में 20 सालों के लंबे इंतजार के बाद पहला गोल्ड मेडल मिला है।" }],
          },
          {
            _key: "b5-2", _type: "block", style: "normal",
            children: [{ _key: "s5-2", _type: "span", text: "• **पैरा खिलाड़ियों के लिए प्रेरणा**: शर्मिला की यह उपलब्धि देश के लाखों दिव्यांग युवाओं और एथलीटों को अंतर्राष्ट्रीय स्तर पर देश का नाम रोशन करने की नई दिशा देगी।" }],
          },
          {
            _key: "b5-3", _type: "block", style: "normal",
            children: [{ _key: "s5-3", _type: "span", text: "• **वैश्विक मंच पर भारत की धक**: ओलंपिक और पैरालिंपिक के बाद अब राष्ट्रमंडल खेलों में भी भारतीय पैरा स्पोर्ट्स का दबदबा स्थापित हो रहा है।" }],
          },
        ],
        bodyEn: [
          {
            _key: "b5-4", _type: "block", style: "normal",
            children: [{ _key: "s5-4", _type: "span", text: "This Gold ends a 20-year wait in CWG Para-Athletics and serves as a major milestone for Indian para-sports." }],
          },
        ],
      },

      /* ── 6. MPPSC & UPSC Quick Revision Study Notes ───────────── */
      {
        _key: "sec-revision-facts-grid",
        kind: "wayForward",
        title: "MPPSC & UPSC परीक्षा हेतु Quick Revision One-Liners",
        titleEn: "MPPSC & UPSC Quick Revision Notes Grid",
        body: [
          {
            _type: "facts",
            items: [
              { label: "खिलाड़ी नाम", value: "**शर्मिला धनखड़ (Sharmila Dhankar)**" },
              { label: "गृह राज्य व जिला", value: "**महेंद्रगढ़, हरियाणा**" },
              { label: "खेल व स्पर्धा", value: "**पैरा-एथलेटिक्स, महिला शॉट पुट F57**" },
              { label: "सर्वश्रेष्ठ थ्रो (CWG 2026)", value: "**9.81 मीटर (Season Best - SB)**" },
              { label: "जीता गया पदक", value: "**स्वर्ण पदक (Gold Medal)**" },
              { label: "F57 श्रेणी अर्थ", value: "**बैठकर (Seated) शॉट पुट फेंकने वाले पैरा एथलीट**" },
              { label: "F बनाम T का अर्थ", value: "**F = Field Events (शॉट पुट), T = Track Events (दौड़)**" },
              { label: "विशेष उपलब्धि", value: "**CWG पैरा एथलेटिक्स में स्वर्ण जीतने वाली पहली भारतीय महिला**" },
            ]
          }
        ],
        bodyEn: [
          {
            _key: "b6-1", _type: "block", style: "normal",
            children: [{ _key: "s6-1", _type: "span", text: "High-yield one-liner revision points tailored for MPPSC & UPSC exams." }],
          },
        ],
      },
    ],

    /* ─── FAQS (8 Collapsible FAQs) ───────────────────────── */
    faqs: [
      {
        question: "शर्मिला धनखड़ ने राष्ट्रमंडल खेल 2026 में कौन-सा पदक जीता है?",
        questionEn: "Which medal did Sharmila Dhankar win at the Commonwealth Games 2026?",
        answer: "शर्मिला धनखड़ ने ग्लासगो कॉमनवेल्थ गेम्स 2026 में महिला शॉट पुट F57 स्पर्धा में **स्वर्ण पदक (Gold Medal)** जीता है। यह CWG इतिहास में पैरा एथलेटिक्स में भारत का पहला स्वर्ण पदक है।",
        answerEn: "Sharmila Dhankar won the Gold Medal in Women's Shot Put F57 at CWG 2026."
      },
      {
        question: "शर्मिला धनखड़ ने कितने मीटर का थ्रो करके स्वर्ण पदक अपने नाम किया?",
        questionEn: "What was Sharmila Dhankar's winning throw distance at CWG 2026?",
        answer: "उन्होंने **9.81 मीटर** का थ्रो करके अपने सीजन का सर्वश्रेष्ठ प्रदर्शन (Season Best - SB) दर्ज किया और स्वर्ण पदक हासिल किया।",
        answerEn: "She achieved a Season Best throw of 9.81 meters to secure the Gold Medal."
      },
      {
        question: "पैरा एथलेटिक्स में F57 श्रेणी का क्या अर्थ होता है?",
        questionEn: "What does the F57 category signify in Para Athletics?",
        answer: "F57 श्रेणी में वे एथलीट शामिल होते हैं जो विशेष थ्रोइंग फ्रेम पर बैठकर (Seated Position) थ्रो करते हैं और जिनके निचले अंगों में विकलांगता या मांसपेशियों की कमजोरी होती है।",
        answerEn: "F57 category includes seated throwers with lower limb impairments."
      },
      {
        question: "पैरा एथलेटिक्स वर्गीकरण में 'F' और 'T' का क्या तात्पर्य है?",
        questionEn: "What do 'F' and 'T' represent in Para Athletics classifications?",
        answer: "'F' का अर्थ **Field Events** (जैसे शॉट पुट, डिस्कस, जैवलिन) है, जबकि 'T' का अर्थ **Track Events** (जैसे 100m, 200m दौड़) होता है।",
        answerEn: "'F' stands for Field Events and 'T' stands for Track Events."
      },
      {
        question: "शर्मिला धनखड़ भारत के किस राज्य व जिले की निवासी हैं?",
        questionEn: "Which state and district does Sharmila Dhankar belong to?",
        answer: "शर्मिला धनखड़ का संबंध **हरियाणा** राज्य के **महेंद्रगढ़** जिले से है।",
        answerEn: "Sharmila Dhankar belongs to Mahendragarh district in Haryana."
      },
      {
        question: "शर्मिला धनखड़ की अंतरराष्ट्रीय स्तर पर अन्य प्रमुख उपलब्धियाँ क्या हैं?",
        questionEn: "What are Sharmila Dhankar's other major international achievements?",
        answer: "उन्होंने फज्जा इंटरनेशनल पैरा एथलेटिक्स चैंपियनशिप (दुबाई) में शॉट पुट में स्वर्ण एवं डिस्कस में कांस्य पदक जीता है, तथा राष्ट्रीय चैंपियनशिप में 9.52m का राष्ट्रीय रिकॉर्ड बनाया है।",
        answerEn: "She won Gold in Shot Put & Bronze in Discus at Dubai Fazza Championships and holds a 9.52m National Record."
      },
      {
        question: "राष्ट्रमंडल खेलों में पैरा एथलेटिक्स में भारत का यह स्वर्ण पदक क्यों ऐतिहासिक है?",
        questionEn: "Why is this Para Athletics Gold medal historic for India at the Commonwealth Games?",
        answer: "यह CWG इतिहास में पैरा एथलेटिक्स में भारत का पहला स्वर्ण पदक है, जिससे 20 वर्षों का लंबा इंतजार समाप्त हुआ है। शर्मिला यह स्वर्ण जीतने वाली पहली भारतीय एथलीट बनी हैं।",
        answerEn: "This is India's first ever CWG Gold in Para-Athletics, ending a 20-year wait."
      },
      {
        question: "MPPSC परीक्षा में खेल समसामयिकी (Sports Current Affairs) का क्या महत्व है?",
        questionEn: "What is the significance of Sports Current Affairs for MPPSC exams?",
        answer: "MPPSC प्रारम्भिक परीक्षा (Paper 1 GS) एवं मुख्य परीक्षा (Paper 1 व Paper 3) में राष्ट्रीय व अंतरराष्ट्रीय खेल पदक विजेताओं, रिकॉर्ड्स और पैरा स्पोर्ट्स से संबंधित सीधे प्रश्न पूछे जाते हैं।",
        answerEn: "Sports Current Affairs accounts for direct high-yield questions in MPPSC Prelims Paper 1 GS and Mains Paper 1 & 3."
      }
    ],

    /* ─── MCQS (8 High-Quality Practice Quizzes) ───────────────── */
    mcqs: [
      {
        question: "राष्ट्रमंडल खेल 2026 (CWG 2026) में भारत का पहला पैरा एथलेटिक्स स्वर्ण पदक किस खिलाड़ी ने जीता?",
        questionEn: "Which athlete won India's first ever Para Athletics Gold medal at the Commonwealth Games 2026?",
        options: ["A. दीपा मलिक", "B. शर्मिला धनखड़", "C. भावना पटेल", "D. अवनी लेखरा"],
        optionsEn: ["A. Deepa Malik", "B. Sharmila Dhankar", "C. Bhavina Patel", "D. Avani Lekhara"],
        correctIndex: 1,
        explanation: "शर्मिला धनखड़ ने महिला शॉट पुट F57 स्पर्धा में 9.81m थ्रो के साथ भारत का पहला पैरा एथलेटिक्स स्वर्ण पदक जीता।",
        explanationEn: "Sharmila Dhankar won India's first CWG Para Athletics Gold in Women's Shot Put F57."
      },
      {
        question: "ग्लासगो कॉमनवेल्थ गेम्स 2026 में शर्मिला धनखड़ ने कितने मीटर का थ्रो करके स्वर्ण पदक हासिल किया?",
        questionEn: "What was Sharmila Dhankar's Gold medal-winning throw distance at CWG 2026?",
        options: ["A. 8.50 मीटर", "B. 9.81 मीटर", "C. 10.20 मीटर", "D. 9.15 मीटर"],
        optionsEn: ["A. 8.50 meters", "B. 9.81 meters", "C. 10.20 meters", "D. 9.15 meters"],
        correctIndex: 1,
        explanation: "शर्मिला ने 9.81 मीटर का सीजन का सर्वश्रेष्ठ थ्रो (Season Best) करके स्वर्ण पदक अपने नाम किया।",
        explanationEn: "Sharmila set a Season Best throw of 9.81 meters to win Gold."
      },
      {
        question: "पैरा एथलेटिक्स स्पर्धाओं के वर्गीकरण में 'F' का क्या अर्थ होता है?",
        questionEn: "In Para Athletics classification, what does the letter 'F' signify?",
        options: ["A. Fast Running", "B. Field Events (फील्ड स्पर्धाएँ - शॉट पुट, डिस्कस आदि)", "C. Final Round", "D. First Class"],
        optionsEn: ["A. Fast Running", "B. Field Events (Shot Put, Discus, Javelin)", "C. Final Round", "D. First Class"],
        correctIndex: 1,
        explanation: "पैरा एथलेटिक्स में 'F' का अर्थ Field Events (जैसे शॉट पुट) और 'T' का अर्थ Track Events (दौड़) होता है।",
        explanationEn: "'F' stands for Field Events and 'T' stands for Track Events."
      },
      {
        question: "पैरा एथलेटिक्स की 'F57' श्रेणी के संदर्भ में निम्नलिखित में से कौन-सा कथन सत्य है?",
        questionEn: "Which statement is correct regarding the 'F57' category in Para Athletics?",
        options: ["A. एथलीट खड़े होकर दौड़ते हैं", "B. एथलीट विशेष थ्रोइंग फ्रेम पर बैठकर (Seated) थ्रो करते हैं", "C. यह केवल दृष्टिबाधित एथलीटों के लिए है", "D. इसमें केवल तैराकी शामिल है"],
        optionsEn: ["A. Athletes run standing", "B. Athletes throw from a seated position on a frame", "C. It is for visually impaired only", "D. It includes swimming only"],
        correctIndex: 1,
        explanation: "F57 श्रेणी में निचले अंगों में विकलांगता वाले एथलीट बैठकर (Seated Position) थ्रो करते हैं।",
        explanationEn: "In F57 category, athletes with lower limb impairment perform throws seated on a frame."
      },
      {
        question: "पैरा एथलीट शर्मिला धनखड़ का संबंध भारत के किस राज्य से है?",
        questionEn: "Para athlete Sharmila Dhankar belongs to which state of India?",
        options: ["A. मध्य प्रदेश", "B. हरियाणा (महेंद्रगढ़ जिला)", "C. राजस्थान", "D. पंजाब"],
        optionsEn: ["A. Madhya Pradesh", "B. Haryana (Mahendragarh district)", "C. Rajasthan", "D. Punjab"],
        correctIndex: 1,
        explanation: "शर्मिला धनखड़ हरियाणा राज्य के महेंद्रगढ़ जिले की निवासी हैं।",
        explanationEn: "Sharmila Dhankar belongs to Mahendragarh district, Haryana."
      },
      {
        question: "राष्ट्रमंडल खेलों में पैरा एथलेटिक्स में भारत को कितने वर्षों के लंबे अंतराल के बाद पहला स्वर्ण पदक मिला?",
        questionEn: "After how many years did India win a Gold medal in Para Athletics at CWG?",
        options: ["A. 5 वर्ष", "B. 10 वर्ष", "C. 20 वर्ष", "D. 30 वर्ष"],
        optionsEn: ["A. 5 years", "B. 10 years", "C. 20 years", "D. 30 years"],
        correctIndex: 2,
        explanation: "शर्मिला धनखड़ की इस ऐतिहासिक जीत से राष्ट्रमंडल खेलों की पैरा एथलेटिक्स में 20 वर्षों का सूखा समाप्त हुआ।",
        explanationEn: "Sharmila's victory ended a 20-year wait for India in CWG Para Athletics."
      },
      {
        question: "23वें कॉमनवेल्थ गेम्स 2026 का आयोजन किस देश के ग्लासगो शहर में किया जा रहा है?",
        questionEn: "Which country's city Glasgow is hosting the 23rd Commonwealth Games 2026?",
        options: ["A. ऑस्ट्रेलिया", "B. स्कॉटलैंड (UK)", "C. कनाडा", "D. इंग्लैंड"],
        optionsEn: ["A. Australia", "B. Scotland (UK)", "C. Canada", "D. England"],
        correctIndex: 1,
        explanation: "23वें राष्ट्रमंडल खेल 2026 ग्लासगो, स्कॉटलैंड (यूनाइटेड किंगडम) में आयोजित हो रहे हैं।",
        explanationEn: "Glasgow, Scotland (UK) is hosting CWG 2026."
      },
      {
        question: "MPPSC परीक्षा की तैयारी में खेल समसामयिकी (Sports Current Affairs) किस पेपर के लिए अति-महत्वपूर्ण है?",
        questionEn: "In MPPSC examination, Sports Current Affairs is essential for which papers?",
        options: ["A. केवल गणित", "B. प्रारम्भिक परीक्षा Paper 1 एवं मुख्य परीक्षा Paper 1 & 3", "C. केवल निबंध", "D. केवल दर्शनशास्त्र"],
        optionsEn: ["A. Mathematics only", "B. Prelims Paper 1 GS & Mains Paper 1 & 3", "C. Essay only", "D. Philosophy only"],
        correctIndex: 1,
        explanation: "खेलकूद एवं राष्ट्रीय/अंतरराष्ट्रीय पदक विजेता MPPSC Prelims Paper 1 GS तथा Mains Paper 1/3 का हिस्सा हैं।",
        explanationEn: "Sports GK is a core section in MPPSC Prelims Paper 1 GS and Mains Paper 1 & 3."
      }
    ]
  };

  console.log(`📝 Syncing Sharmila Dhankar CWG 2026 Gold article ID "${article._id}" to Sanity CMS...`);
  const res = await client.createOrReplace(article);
  console.log(`🎉 SUCCESS! Article uploaded & published in Sanity CMS. Document ID: ${res._id}`);
  console.log(`URL slug: ${res.slug.current}`);
}

main().catch((err) => {
  console.error("❌ Error uploading Sharmila Dhankar article:", err);
  process.exit(1);
});
