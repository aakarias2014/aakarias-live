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
  console.log("🚀 Starting upload process for Mirabai Chanu Article with Victory Podium Photo...");

  const publicBlogDir = path.resolve(process.cwd(), "public/images/blog");
  const actionThumbnailPath = path.join(publicBlogDir, "mirabai_chanu_glasgow_2026_action_thumbnail.png");

  let assetFeaturedThumbnail;
  if (fs.existsSync(actionThumbnailPath)) {
    console.log("📸 Uploading Action Shot Thumbnail for Mirabai Chanu to Sanity...");
    assetFeaturedThumbnail = await client.assets.upload("image", fs.createReadStream(actionThumbnailPath), {
      filename: "mirabai_chanu_glasgow_2026_action_thumbnail.png",
    });
    console.log(`✔ Uploaded Action Featured Image. Asset ID: ${assetFeaturedThumbnail._id}`);
  }

  const mirabaiInfographicPath = path.join(publicBlogDir, "mirabai_chanu_cwg_medals.jpg");
  let assetInfographic;
  if (fs.existsSync(mirabaiInfographicPath)) {
    console.log("📸 Uploading Mirabai Chanu CWG Infographic to Sanity...");
    assetInfographic = await client.assets.upload("image", fs.createReadStream(mirabaiInfographicPath), {
      filename: "mirabai_chanu_cwg_medals_infographic.jpg",
    });
    console.log(`✔ Uploaded Infographic Image. Asset ID: ${assetInfographic._id}`);
  }

  const mirabaiPodiumPath = path.join(publicBlogDir, "mirabai_chanu_2026_gold_victory_podium.png");
  let assetVictoryPodium;
  if (fs.existsSync(mirabaiPodiumPath)) {
    console.log("📸 Uploading Mirabai Chanu 2026 Gold Victory Podium Photo to Sanity...");
    assetVictoryPodium = await client.assets.upload("image", fs.createReadStream(mirabaiPodiumPath), {
      filename: "mirabai_chanu_2026_gold_victory_podium.png",
    });
    console.log(`✔ Uploaded Victory Podium Image. Asset ID: ${assetVictoryPodium._id}`);
  }

  const article = {
    _id: "ca-mirabai-chanu-gold-cwg-2026",
    _type: "currentAffairs",
    slug: { _type: "slug", current: "mirabai-chanu-biography-cwg-2026-gold-medal-weightlifting" },
    title: "मीराबाई चानू (Mirabai Chanu): जीवनी, CWG 2026 स्वर्ण पदक, 190kg रिकॉर्ड, कोच व 10 लाइन नोट्स | MPPSC & UPSC",
    titleEn: "Mirabai Chanu Biography: CWG 2026 Gold Medal (190kg Record), Firewood Struggle, Coach & 10 Lines Notes | MPPSC & UPSC",
    excerpt: "स्टार भारोत्तोलक साइखोम मीराबाई चानू का जीवन परिचय: 2026 ग्लासगो खेलों में 190kg स्वर्ण, 10 पंक्तियों में नोट्स (10 Lines on Mirabai Chanu), कोच विजय शर्मा, विश्व रिकॉर्ड (119kg), IWLF पद, मणिपुर पुलिस ASP व MPPSC/UPSC परीक्षा नोट्स।",
    excerptEn: "Saikhom Mirabai Chanu Biography: CWG 2026 Gold Medal (190kg total lift), 10 Lines on Mirabai Chanu for competitive exams, Coach Vijay Sharma, Clean & Jerk World Record (119kg), IWLF Chairperson, Manipur Police ASP & MPPSC/UPSC exam notes.",
    ca_date: "2026-07-27",
    publishedAt: new Date().toISOString(),
    featured: true,
    readingTime: 12,
    keywords: [
      "Mirabai Chanu",
      "मीराबाई चानू",
      "2026 win mirabai chanu",
      "mirabai chanu 2026 gold medal victory podium",
      "मीराबाई चानू जीवनी",
      "Mirabai Chanu 2026",
      "Mirabai Chanu Gold Medal CWG 2026",
      "10 lines on Mirabai Chanu",
      "10 lines on Mirabai Chanu in Hindi",
      "Mirabai Chanu coach Vijay Sharma",
      "Mirabai Chanu Weightlifting 48kg 190kg",
      "Mirabai Chanu Clean and Jerk World Record 119kg",
      "Mirabai Chanu Firewood Childhood Struggle",
      "Mirabai Chanu IWLF Athletes Commission Chairperson",
      "Mirabai Chanu Tokyo Olympics Silver",
      "Mirabai Chanu Manipur Police ASP",
      "Mirabai Chanu Padma Shri Khel Ratna",
      "Lift Win Repeat Mirabai Chanu",
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
    ...(assetFeaturedThumbnail ? {
      featuredImage: {
        _type: "image",
        asset: { _type: "reference", _ref: assetFeaturedThumbnail._id },
        alt: "Mirabai Chanu Gold Medal Weightlifting Clean Jerk Action Shot Glasgow 2026 Commonwealth Games MPPSC UPSC Notes",
      }
    } : {}),

    /* ─── SECTIONS ──────────────────────────────────────────────── */
    sections: [
      /* ── 1. Why in News & Performance Breakdown ──────────────── */
      {
        _key: "sec-why-in-news",
        kind: "whyInNews",
        title: "चर्चा में क्यों? (Why in News?) & CWG 2026 में 190 किग्रा स्वर्णिम रिकॉर्ड",
        titleEn: "Why in News? & CWG 2026 190kg Gold Medal Record",
        body: [
          {
            _key: "b1-1", _type: "block", style: "normal",
            children: [{ _key: "s1-1", _type: "span", text: "भारत की स्टार महिला भारोत्तोलक **साइखोम मीराबाई चानू (Saikhom Mirabai Chanu)** ने ग्लासगो (स्कॉटलैंड) में आयोजित **कॉमनवेल्थ गेम्स 2026 (CWG 2026)** में महिलाओं की 48 किलोग्राम भारवर्ग स्पर्धा में **स्वर्ण पदक (Gold Medal)** जीतकर नया इतिहास रच दिया है।" }],
          },
          ...(assetVictoryPodium ? [{
            _type: "image",
            asset: { _type: "reference", _ref: assetVictoryPodium._id },
            alt: "2026 win mirabai chanu gold medal victory podium glasgow commonwealth games weightlifting mppsc upsc notes",
            caption: "2026 win mirabai chanu: ग्लासगो कॉमनवेल्थ गेम्स 2026 में 48kg स्वर्ण पदक और अधिकारिक शुभंकर के साथ पोडियम पर साइखोम मीराबाई चानू",
          }] : []),
          {
            _key: "b1-2", _type: "block", style: "normal",
            children: [{ _key: "s1-2", _type: "span", text: "मीराबाई चानू ने कुल **190 किग्रा भार** (Snatch – 85 kg | Clean & Jerk – 105 kg) उठाकर भारत को ग्लासगो खेलों का **पहला स्वर्ण पदक** दिलाया। इसके साथ ही वे लगातार तीन कॉमनवेल्थ गेम्स (**2018 गोल्ड कोस्ट, 2022 बर्मिंघम और 2026 ग्लासगो**) में स्वर्ण पदक जीतने वाली भारत की पहली महिला भारोत्तोलक बन गई हैं।" }],
          },
          {
            _key: "b1-h1", _type: "block", style: "h3",
            children: [{ _key: "sh1-1", _type: "span", text: "1. ग्लासगो 2026 स्पर्धा में शानदार प्रदर्शन के मुख्य आँकड़े" }],
          },
          {
            _type: "table",
            caption: "मीराबाई चानू: कॉमनवेल्थ गेम्स 2026 प्रदर्शन विवरण (Statistics Table)",
            headers: ["वर्ग (Category)", "प्रदर्शन / आँकड़ा (Statistics)", "विशेष उपलब्धि (Remark)"],
            rows: [
              ["**स्पर्धा भारवर्ग**", "महिला 48 किलोग्राम", "ग्लासगो 2026 भारोत्तोलन"],
              ["**कुल भार उठाया (Total Lifted)**", "**190 किग्रा**", "भारत का पहला 2026 स्वर्ण पदक"],
              ["**स्नैच (Snatch) राउंड**", "**85 किग्रा**", "स्नैच राउंड में दो बार CWG रिकॉर्ड तोड़ा"],
              ["**क्लीन एवं जर्क (Clean & Jerk)**", "**105 किग्रा**", "शानदार तकनीकी निष्पादित लिफ्ट"],
              ["**जीत का अंतर (Margin of Victory)**", "**22 किग्रा**", "रजत पदक विजेता से 22 किग्रा अधिक भार उठाकर ऐतिहासिक जीत दर्ज की"]
            ]
          },
          {
            _key: "b1-3", _type: "block", style: "normal",
            children: [{ _key: "s1-3", _type: "span", text: "🏆 **सम्पूर्ण पदक तालिका देखें**: [कॉमनवेल्थ गेम्स 2026: भारत की पूरी पदक तालिका और सभी पदक विजेताओं की सूची](/current-affairs/commonwealth-games-2026-updates-india-medal-tally)" }],
          },
        ],
        bodyEn: [
          {
            _key: "b1-4", _type: "block", style: "normal",
            children: [{ _key: "s1-4", _type: "span", text: "Saikhom Mirabai Chanu secured the Gold Medal in women's 48kg weightlifting at CWG 2026 in Glasgow with a total lift of 190kg (Snatch 85kg + Clean & Jerk 105kg), winning by a massive 22kg margin." }],
          },
        ],
      },

      /* ── 2. Early Life, Firewood Struggle, Coach & IWLF Role ───── */
      {
        _key: "sec-biography-early-life",
        kind: "background",
        title: "जीवन परिचय, लकड़ियों के गट्ठे उठाने की गाथा, कोच विजय शर्मा एवं IWLF पद",
        titleEn: "Mirabai Chanu Biography: Childhood Firewood Struggle, Coach Vijay Sharma & IWLF Chair Profile",
        body: [
          {
            _key: "b2-h1", _type: "block", style: "h3",
            children: [{ _key: "sh2-1", _type: "span", text: "1. व्यक्तिगत परिचय एवं प्रशासनिक दायित्व (Profile Table)" }],
          },
          {
            _type: "table",
            caption: "साइखोम मीराबाई चानू: व्यक्तिगत प्रोफाइल (Profile Table)",
            headers: ["विवरण (Parameter)", "जानकारी (Information)"],
            rows: [
              ["**पूरा नाम (Full Name)**", "साइखोम मीराबाई चानू (Saikhom Mirabai Chanu)"],
              ["**जन्म तिथि (Date of Birth)**", "8 अगस्त 1994"],
              ["**जन्म स्थान (Birthplace)**", "नोंगपोक काकचिंग, इम्फाल पूर्व (मणिपुर)"],
              ["**खेल व भारवर्ग (Sport)**", "भारोत्तोलन (Weightlifting - 48kg / 49kg)"],
              ["**मुख्य कोच (Chief Coach)**", "**विजय शर्मा (Vijay Sharma)** - द्रोणाचार्य पुरस्कार विजेता"],
              ["**प्रारंभिक संघर्ष (Childhood Strain)**", "12 वर्ष की उम्र में पहाड़ी गाँव से भारी लकड़ियों के गट्ठे (Firewood) उठाना"],
              ["**प्रशिक्षण केंद्र (Training Center)**", "NIS पटियाला (पंजाब)"],
              ["**IWLF पद (Federation Role)**", "**अध्यक्ष (Chairperson)**, IWLF एथलीट्स कमीशन"],
              ["**वर्तमान पद (Designation)**", "**अतिरिक्त पुलिस अधीक्षक (Additional SP Sports)**, मणिपुर पुलिस"]
            ]
          },
          {
            _key: "b2-h2", _type: "block", style: "h3",
            children: [{ _key: "sh2-2", _type: "span", text: "2. 12 वर्ष की आयु में लकड़ियों के गट्ठे उठाने से राष्ट्रीय पहचान तक का सफर" }],
          },
          {
            _key: "b2-1", _type: "block", style: "normal",
            children: [{ _key: "s2-1", _type: "span", text: "• **लकड़ियों के भारी गट्ठे (Firewood Struggle)**: मणिपुर के नोंगपोक काकचिंग में पली-बढ़ीं मीराबाई चानू की क्षमता की पहचान मात्र 12 वर्ष की उम्र में हुई। वे अपने बड़े भाईयों से भी अधिक वजनी लकड़ियों के गट्ठे (Firewood) आसानी से उठाकर पहाड़ी रास्तों से घर पहुँचा देती थीं।" }],
          },
          {
            _key: "b2-2", _type: "block", style: "normal",
            children: [{ _key: "s2-2", _type: "span", text: "• **कोच विजय शर्मा का मार्गदर्शन**: उन्होंने मणिपुर की महान भारोत्तोलक **एन. कुंजरानी देवी** को अपनी प्रेरणा मानकर 2008 में मणिपुर स्पोर्ट्स अकादमी में दाखिला लिया। द्रोणाचार्य पुरस्कार विजेता **कोच विजय शर्मा** के मार्गदर्शन में उन्होंने तकनीकी सुधार कर ओलंपिक और कॉमनवेल्थ में ऐतिहासिक रिकॉर्ड कायम किए।" }],
          },
          {
            _key: "b2-3", _type: "block", style: "normal",
            children: [{ _key: "s2-3", _type: "span", text: "• **IWLF एथलीट्स कमीशन की अध्यक्ष**: टोक्यो ओलंपिक में रजत पदक जीतने के बाद उन्हें इंडियन वेटलिफ्टिंग फेडरेशन (IWLF) के एथलीट्स आयोग का अध्यक्ष चुना गया।" }],
          },
        ],
        bodyEn: [
          {
            _key: "b2-4", _type: "block", style: "normal",
            children: [{ _key: "s2-4", _type: "span", text: "Inspiring childhood story: Carried heavy firewood bundles at age 12 that her elder brothers struggled with. Coached by Vijay Sharma, serves as Manipur Police ASP and Chairperson of IWLF Athletes Commission." }],
          },
        ],
      },

      /* ── 3. Major International Achievements & Medals Table ───── */
      {
        _key: "sec-achievements-table",
        kind: "keyHighlights",
        title: "Lift. Win. Repeat: मीराबाई चानू की अंतरराष्ट्रीय स्वर्णिम यात्रा व रिकॉर्ड्स",
        titleEn: "Lift. Win. Repeat: Mirabai Chanu Career Achievements & Medals Table",
        body: [
          ...(assetInfographic ? [{
            _type: "image",
            asset: { _type: "reference", _ref: assetInfographic._id },
            alt: "राष्ट्रमंडल खेल में सोने सी चमकी मीराबाई चानू 2014 रजत 2018 स्वर्ण 2022 स्वर्ण 2026 स्वर्ण पदक यात्रा इंफोग्राफिक",
            caption: "राष्ट्रमंडल खेल में सोने सी चमकी मीराबाई चानू: 2014 ग्लासगो (रजत), 2018 गोल्ड कोस्ट (स्वर्ण), 2022 बर्मिंघम (स्वर्ण) और 2026 ग्लासगो (स्वर्ण)",
          }] : []),
          {
            _key: "b3-h1", _type: "block", style: "h3",
            children: [{ _key: "sh3-1", _type: "span", text: "1. अंतरराष्ट्रीय पदक एवं प्रदर्शन तालिका (Complete Medals Table)" }],
          },
          {
            _type: "table",
            caption: "मीराबाई चानू: सर्वकालिक अंतरराष्ट्रीय प्रतियोगिता पदक तालिका",
            headers: ["प्रतियोगिता (Event)", "वर्ष (Year)", "आयोजन स्थल (Venue)", "भारवर्ग (Category)", "पदक / स्थान (Result)"],
            rows: [
              ["**कॉमनवेल्थ गेम्स 2026**", "2026", "ग्लासगो, स्कॉटलैंड", "48 किग्रा", "**स्वर्ण पदक (Gold - 190kg)**"],
              ["**कॉमनवेल्थ चैंपियनशिप 2025**", "2025", "अहमदाबाद, भारत", "49 किग्रा", "**स्वर्ण पदक (Gold)**"],
              ["**विश्व वेटलिफ्टिंग चैंपियनशिप**", "2025", "फोर्डे, नॉर्वे", "49 किग्रा", "**रजत पदक (Silver)**"],
              ["**पेरिस ओलंपिक खेल**", "2024", "पेरिस, फ्रांस", "49 किग्रा", "**चौथा स्थान (4th Position)**"],
              ["**बर्मिंघम कॉमनवेल्थ गेम्स**", "2022", "बर्मिंघम, यूके", "49 किग्रा", "**स्वर्ण पदक (Gold)**"],
              ["**विश्व वेटलिफ्टिंग चैंपियनशिप**", "2022", "बोगोटा, कोलंबिया", "49 किग्रा", "**रजत पदक (Silver)**"],
              ["**टोक्यो ओलंपिक खेल**", "2020 (2021)", "टोक्यो, जापान", "49 किग्रा", "**रजत पदक (Silver - पहली भारतीय महिला)**"],
              ["**गोल्ड कोस्ट कॉमनवेल्थ गेम्स**", "2018", "गोल्ड कोस्ट, ऑस्ट्रेलिया", "48 किग्रा", "**स्वर्ण पदक (Gold)**"],
              ["**विश्व वेटलिफ्टिंग चैंपियनशिप**", "2017", "अनाहाइम, अमेरिका", "48 किग्रा", "**स्वर्ण पदक (Gold)**"],
              ["**ग्लासगो कॉमनवेल्थ गेम्स**", "2014", "ग्लासगो, स्कॉटलैंड", "48 किग्रा", "**रजत पदक (Silver)**"]
            ]
          },
          {
            _key: "b3-h2", _type: "block", style: "h3",
            children: [{ _key: "sh3-2", _type: "span", text: "2. ऐतिहासिक मील के पत्थर, विश्व रिकॉर्ड व त्याग का भाव" }],
          },
          {
            _key: "b3-1", _type: "block", style: "normal",
            children: [{ _key: "s3-1", _type: "span", text: "• **क्लीन एवं जर्क में विश्व रिकॉर्ड (119kg)**: मीराबाई चानू के नाम 49 किग्रा वर्ग के क्लीन एंड जर्क राउंड में **119 किग्रा** भार उठाने का विश्व रिकॉर्ड (World Record) दर्ज है।" }],
          },
          {
            _key: "b3-2", _type: "block", style: "normal",
            children: [{ _key: "s3-2", _type: "span", text: "• **त्याग व समर्पण का संदेश**: जीत के बाद भावुक होकर मीराबाई चानू ने कहा, *'मैंने और मेरे परिवार ने वर्षों तक कई कड़े त्याग (sacrifices) किए हैं। देश के लिए गोल्ड जीतना उन सभी कष्टों का सर्वश्रेष्ठ फल है।'*" }],
          },
          {
            _key: "b3-3", _type: "block", style: "normal",
            children: [{ _key: "s3-3", _type: "span", text: "• **CWG स्वर्णिम हैट्रिक**: राष्ट्रमंडल खेलों (2018, 2022, 2026) में लगातार 3 स्वर्ण पदक जीतने वाली भारत की एकमात्र महिला भारोत्तोलक।" }],
          },
          {
            _key: "b3-h3", _type: "block", style: "h3",
            children: [{ _key: "sh3-3", _type: "span", text: "3. राष्ट्रीय पुरस्कार एवं सम्मान (National Awards)" }],
          },
          {
            _type: "table",
            caption: "मीराबाई चानू: प्राप्त प्रमुख राष्ट्रीय पुरस्कार",
            headers: ["पुरस्कार का नाम (Award)", "वर्ष (Year)", "प्रदानकर्ता (Conferring Body)"],
            rows: [
              ["**मेजर ध्यानचंद खेल रत्न पुरस्कार**", "2018", "भारत सरकार (युवा कार्यक्रम एवं खेल मंत्रालय)"],
              ["**पद्म श्री (Padma Shri)**", "2018", "भारत के राष्ट्रपति (नागरिक सम्मान)"]
            ]
          }
        ],
        bodyEn: [
          {
            _key: "b3-4", _type: "block", style: "normal",
            children: [{ _key: "s3-4", _type: "span", text: "Complete achievement breakdown: Clean & Jerk 119kg World Record, Tokyo Olympics Silver, 2017 World Championships Gold, 2022/2025 World Championships Silver, and 3 CWG Gold Medals." }],
          },
        ],
      },

      /* ── 4. 10 Lines on Mirabai Chanu for Competitive Exams ─────── */
      {
        _key: "sec-10-lines-summary",
        kind: "analysis",
        title: "10 Lines on Mirabai Chanu (मीराबाई चानू पर 10 मुख्य बिंदु)",
        titleEn: "10 Lines on Mirabai Chanu for MPPSC & Competitive Exams",
        body: [
          {
            _key: "b10-1", _type: "block", style: "normal",
            children: [{ _key: "s10-1", _type: "span", text: "1. साइखोम मीराबाई चानू भारत की दिग्गज महिला भारोत्तोलक (Weightlifter) हैं, जिनका संबंध मणिपुर राज्य से है।" }],
          },
          {
            _key: "b10-2", _type: "block", style: "normal",
            children: [{ _key: "s10-2", _type: "span", text: "2. उन्होंने 2026 ग्लासगो कॉमनवेल्थ गेम्स में महिला 48 किग्रा भार वर्ग में कुल **190 किग्रा** भार उठाकर भारत का पहला स्वर्ण पदक जीता।" }],
          },
          {
            _key: "b10-3", _type: "block", style: "normal",
            children: [{ _key: "s10-3", _type: "span", text: "3. उन्होंने राष्ट्रमंडल खेलों (2018, 2022, 2026) में लगातार तीन स्वर्ण पदक जीतकर ऐतिहासिक हैट्रिक बनाई है।" }],
          },
          {
            _key: "b10-4", _type: "block", style: "normal",
            children: [{ _key: "s10-4", _type: "span", text: "4. टोक्यो ओलंपिक 2020 (49kg) में वे भारोत्तोलन में रजत पदक (Silver Medal) जीतने वाली पहली भारतीय महिला बनी थीं।" }],
          },
          {
            _key: "b10-5", _type: "block", style: "normal",
            children: [{ _key: "s10-5", _type: "span", text: "5. उन्होंने 2017 में अनाहाइम (अमेरिका) में आयोजित विश्व भारोत्तोलन चैंपियनशिप में स्वर्ण पदक जीता था।" }],
          },
          {
            _key: "b10-6", _type: "block", style: "normal",
            children: [{ _key: "s10-6", _type: "span", text: "6. मीराबाई चानू के नाम 49 किग्रा वर्ग में क्लीन एंड जर्क का **119 किग्रा विश्व रिकॉर्ड** दर्ज है।" }],
          },
          {
            _key: "b10-7", _type: "block", style: "normal",
            children: [{ _key: "s10-7", _type: "span", text: "7. उनके मुख्य कोच द्रोणाचार्य पुरस्कार विजेता **विजय शर्मा** हैं।" }],
          },
          {
            _key: "b10-8", _type: "block", style: "normal",
            children: [{ _key: "s10-8", _type: "span", text: "8. उन्हें वर्ष 2018 में भारत सरकार द्वारा **मेजर ध्यानचंद खेल रत्न** तथा **पद्म श्री** पुरस्कार से सम्मानित किया गया था।" }],
          },
          {
            _key: "b10-9", _type: "block", style: "normal",
            children: [{ _key: "s10-9", _type: "span", text: "9. वे वर्तमान में मणिपुर पुलिस में **अतिरिक्त पुलिस अधीक्षक (Additional SP Sports)** के पद पर सेवारत हैं।" }],
          },
          {
            _key: "b10-10", _type: "block", style: "normal",
            children: [{ _key: "s10-10", _type: "span", text: "10. वे इंडियन वेटलिफ्टिंग फेडरेशन (IWLF) के एथलीट्स आयोग की अध्यक्ष पद का भी निर्वहन कर रही हैं।" }],
          },
        ],
        bodyEn: [
          {
            _key: "b10-11", _type: "block", style: "normal",
            children: [{ _key: "s10-11", _type: "span", text: "10 key revision points on Mirabai Chanu covering birthplace, medals, coach, world records and awards." }],
          },
        ],
      },

      /* ── 5. MPPSC & UPSC Exam Revision Notes (STYLIZED FACTS GRID) ─── */
      {
        _key: "sec-exam-notes",
        kind: "wayForward",
        title: "MPPSC & UPSC परीक्षा हेतु Quick Revision Study Notes",
        titleEn: "MPPSC & UPSC Sports Exam Notes on Mirabai Chanu",
        body: [
          {
            _type: "facts",
            items: [
              { label: "स्थान व आयोजन", value: "**2026 ग्लासगो कॉमनवेल्थ गेम्स** (महिला 48 किग्रा भारोत्तोलन)" },
              { label: "कुल भार क्षमता (Total Lift)", value: "**190 किग्रा** (Snatch – 85 kg | Clean & Jerk – 105 kg)" },
              { label: "ऐतिहासिक रिकॉर्ड", value: "स्नैच में **2 बार CWG रिकॉर्ड तोड़ा** | क्लीन एवं जर्क **119kg वर्ल्ड रिकॉर्ड**" },
              { label: "लगातार स्वर्णिम हैट्रिक", value: "**2018 (गोल्ड कोस्ट), 2022 (बर्मिंघम) व 2026 (ग्लासगो)** में 3 लगातार CWG स्वर्ण" },
              { label: "मूल राज्य, पद व कोच", value: "मणिपुर | **Additional SP (Sports)** | **IWLF अध्यक्ष** | **कोच: विजय शर्मा**" },
              { label: "राष्ट्रीय पुरस्कार व सम्मान", value: "**मेजर ध्यानचंद खेल रत्न (2018)** एवं **पद्म श्री (2018)**" },
            ]
          },
          {
            _key: "b4-7", _type: "block", style: "normal",
            children: [{ _key: "s4-7", _type: "span", text: "🏆 **कॉमनवेल्थ गेम्स 2026 की पूरी पदक तालिका देखने हेतु यहाँ क्लिक करें**: [CWG 2026 Medals Tally & Winners List](/current-affairs/commonwealth-games-2026-updates-india-medal-tally)" }],
          },
        ],
        bodyEn: [
          {
            _key: "b4-8", _type: "block", style: "normal",
            children: [{ _key: "s4-8", _type: "span", text: "High-yield one-liner revision points on Mirabai Chanu for competitive exam aspirants." }],
          },
        ],
      },
    ],

    /* ─── FAQS (8 Collapsible FAQs) ───────────────────────── */
    faqs: [
      {
        question: "मीराबाई चानू ने कॉमनवेल्थ गेम्स 2026 में कुल कितना भार उठाकर स्वर्ण पदक जीता?",
        questionEn: "What was the total weight lifted by Mirabai Chanu to win Gold at CWG 2026?",
        answer: "मीराबाई चानू ने कुल **190 किग्रा भार** (स्नैच – 85 किग्रा + क्लीन एवं जर्क – 105 किग्रा) उठाकर महिला 48 किग्रा वर्ग में स्वर्ण पदक जीता।",
        answerEn: "Mirabai Chanu lifted a total of 190kg (Snatch 85kg + Clean & Jerk 105kg) to capture Gold."
      },
      {
        question: "मीराबाई चानू के मुख्य कोच कौन हैं और उन्हें कौन-सा पुरस्कार मिला है?",
        questionEn: "Who is Mirabai Chanu's chief coach and which award has he received?",
        answer: "मीराबाई चानू के मुख्य कोच **विजय शर्मा (Vijay Sharma)** हैं, जिन्हें खेल में उत्कृष्ट प्रशिक्षण के लिए द्रोणाचार्य पुरस्कार से सम्मानित किया गया है।",
        answerEn: "Her chief coach is Vijay Sharma, a recipient of the prestigious Dronacharya Award."
      },
      {
        question: "मीराबाई चानू का संबंध किस राज्य से है तथा वे किस प्रशासनिक पद व खेल आयोग की अध्यक्ष हैं?",
        questionEn: "Which state does Mirabai Chanu belong to and what are her administrative positions?",
        answer: "वे **मणिपुर** (इम्फाल पूर्व) से हैं। वे मणिपुर पुलिस में **अतिरिक्त पुलिस अधीक्षक (Sports)** तथा **IWLF (इंडियन वेटलिफ्टिंग फेडरेशन) एथलीट्स कमीशन की अध्यक्ष** हैं।",
        answerEn: "She belongs to Manipur, serves as Manipur Police ASP (Sports) and Chairperson of IWLF Athletes Commission."
      },
      {
        question: "मीराबाई चानू के नाम भारोत्तोलन में कौन-सा विश्व रिकॉर्ड दर्ज है?",
        questionEn: "Which world record does Mirabai Chanu hold in weightlifting?",
        answer: "उनके नाम महिला 49 किग्रा भारवर्ग के क्लीन एंड जर्क राउंड में **119 किग्रा** भार उठाने का विश्व रिकॉर्ड (World Record) दर्ज है।",
        answerEn: "She holds the World Record in Clean & Jerk (119kg) in the women's 49kg category."
      },
      {
        question: "मीराबाई चानू ने ग्लासगो 2026 खेलों में क्या इतिहास रचा?",
        questionEn: "What history did Mirabai Chanu create at Glasgow 2026 Games?",
        answer: "मीराबाई चानू ने महिला 48 किग्रा वर्ग में कुल 190 किग्रा भार उठाकर भारत को 2026 खेलों का पहला स्वर्ण पदक दिलाया और लगातार 3 राष्ट्रमंडल खेलों में स्वर्ण जीतने वाली पहली महिला भारोत्तोलक बनीं।",
        answerEn: "She won India's first Gold at Glasgow 2026 and became the first woman weightlifter to win 3 consecutive CWG Gold medals."
      },
      {
        question: "मीराबाई चानू के बचपन (12 वर्ष की आयु) में क्षमता प्रदर्शन की कौन-सी घटना प्रसिद्ध है?",
        questionEn: "What famous childhood story is associated with Mirabai Chanu's strength?",
        answer: "12 वर्ष की उम्र में वे अपने गाँव के पहाड़ी रास्तों पर अपने बड़े भाईयों से भी अधिक भारी लकड़ियों के गट्ठे (Firewood) आसानी से उठाकर घर लाती थीं।",
        answerEn: "At age 12, she easily carried heavy firewood bundles from hills that her elder brothers struggled with."
      },
      {
        question: "मीराबाई चानू ने राष्ट्रमंडल खेलों में लगातार कितनी बार स्वर्ण पदक जीता है?",
        questionEn: "How many consecutive Gold Medals has Mirabai Chanu won in CWG?",
        answer: "मीराबाई चानू ने लगातार 3 कॉमनवेल्थ गेम्स (**2018 गोल्ड कोस्ट, 2022 बर्मिंघम, 2026 ग्लासगो**) में स्वर्ण पदक जीतकर ऐतिहासिक हैट्रिक बनाई है।",
        answerEn: "She has won 3 consecutive CWG Gold Medals in 2018, 2022, and 2026."
      },
      {
        question: "MPPSC परीक्षा के लिए मीराबाई चानू से संबंधित कौन-से तथ्य अत्यंत महत्वपूर्ण हैं?",
        questionEn: "Which facts related to Mirabai Chanu are vital for MPPSC exams?",
        answer: "MPPSC परीक्षा के लिए उनका राज्य (मणिपुर), कुल भार (190 किग्रा), 3 CWG गोल्ड हैट्रिक, टोक्यो सिल्वर, IWLF पद, कोच विजय शर्मा, खेल रत्न/पद्म श्री (2018) तथा मणिपुर पुलिस ASP पद महत्वपूर्ण हैं।",
        answerEn: "State, 190kg lift, 3 CWG Gold Medals, Tokyo Silver, IWLF Chair, Coach Vijay Sharma, Khel Ratna/Padma Shri (2018), and ASP post are important."
      }
    ],

    /* ─── MCQS (8 High-Quality Practice Quizzes) ───────────────── */
    mcqs: [
      {
        question: "मीराबाई चानू ने कॉमनवेल्थ गेम्स 2026 में किस भार वर्ग में स्वर्ण पदक जीता?",
        questionEn: "In which weight category did Mirabai Chanu win Gold at CWG 2026?",
        options: ["A. 49 किग्रा", "B. 55 किग्रा", "C. 48 किग्रा", "D. 59 किग्रा"],
        optionsEn: ["A. 49 kg", "B. 55 kg", "C. 48 kg", "D. 59 kg"],
        correctIndex: 2,
        explanation: "मीराबाई चानू ने महिला 48 किग्रा भार वर्ग स्पर्धा में कुल 190 किग्रा भार उठाकर स्वर्ण पदक जीता।",
        explanationEn: "Mirabai Chanu won Gold in the women's 48kg category at CWG 2026."
      },
      {
        question: "मीराबाई चानू के मुख्य कोच कौन हैं जिन्हें द्रोणाचार्य पुरस्कार प्रदान किया गया है?",
        questionEn: "Who is the Dronacharya awardee chief coach of Mirabai Chanu?",
        options: ["A. विजय शर्मा", "B. पुलेला गोपीचंद", "C. सतपाल सिंह", "D. ओमप्रकाश भारद्वाज"],
        optionsEn: ["A. Vijay Sharma", "B. Pullela Gopichand", "C. Satpal Singh", "D. Om Prakash Bhardwaj"],
        correctIndex: 0,
        explanation: "उनके मुख्य कोच विजय शर्मा (Vijay Sharma) हैं, जिनके मार्गदर्शन में उन्होंने कई वैश्विक पदक जीते हैं।",
        explanationEn: "Vijay Sharma is her Dronacharya award-winning chief weightlifting coach."
      },
      {
        question: "मीराबाई चानू के नाम भारोत्तोलन के क्लीन एंड जर्क राउंड में कितना विश्व रिकॉर्ड (World Record) दर्ज है?",
        questionEn: "What is Mirabai Chanu's World Record lift in the Clean & Jerk category?",
        options: ["A. 110 किग्रा", "B. 119 किग्रा", "C. 125 किग्रा", "D. 105 किग्रा"],
        optionsEn: ["A. 110 kg", "B. 119 kg", "C. 125 kg", "D. 105 kg"],
        correctIndex: 1,
        explanation: "उन्होंने 49 किग्रा वर्ग के क्लीन एंड जर्क में 119 किग्रा भार उठाकर विश्व रिकॉर्ड कायम किया था।",
        explanationEn: "She set a World Record of 119kg in Clean & Jerk in the 49kg category."
      },
      {
        question: "मीराबाई चानू ने राष्ट्रमंडल खेलों 2026 में कुल कितना भार उठाकर स्वर्ण पदक हासिल किया?",
        questionEn: "What was the total weight lifted by Mirabai Chanu to win Gold at CWG 2026?",
        options: ["A. 180 किग्रा", "B. 190 किग्रा (स्नैच 85kg + क्लीन एंड जर्क 105kg)", "C. 200 किग्रा", "D. 175 किग्रा"],
        optionsEn: ["A. 180 kg", "B. 190 kg (Snatch 85kg + Clean & Jerk 105kg)", "C. 200 kg", "D. 175 kg"],
        correctIndex: 1,
        explanation: "मीराबाई चानू ने स्नैच में 85 किग्रा और क्लीन एंड जर्क में 105 किग्रा सहित कुल 190 किग्रा भार उठाया।",
        explanationEn: "Mirabai Chanu lifted 85kg in Snatch and 105kg in Clean & Jerk for a total of 190kg."
      },
      {
        question: "मीराबाई चानू वर्तमान में किस भारतीय खेल महासंघ (Federation) के एथलीट्स आयोग की अध्यक्ष हैं?",
        questionEn: "Which sports federation's Athletes Commission is currently chaired by Mirabai Chanu?",
        options: ["A. भारतीय ओलंपिक संघ (IOA)", "B. इंडियन वेटलिफ्टिंग फेडरेशन (IWLF)", "C. भारतीय मुक्केबाजी संघ (BFI)", "D. भारतीय एथलेटिक्स महासंघ (AFI)"],
        optionsEn: ["A. Indian Olympic Association", "B. Indian Weightlifting Federation (IWLF)", "C. Boxing Federation of India", "D. Athletics Federation of India"],
        correctIndex: 1,
        explanation: "वे इंडियन वेटलिफ्टिंग फेडरेशन (IWLF) एथलीट्स कमीशन की अध्यक्ष हैं।",
        explanationEn: "She serves as Chairperson of the IWLF Athletes Commission."
      },
      {
        question: "मीराबाई चानू ने कॉमनवेल्थ गेम्स में लगातार कितनी बार स्वर्ण पदक जीतने की ऐतिहासिक हैट्रिक बनाई है?",
        questionEn: "How many consecutive CWG Gold Medals has Mirabai Chanu won to complete her hat-trick?",
        options: ["A. 2 बार (2022, 2026)", "B. 3 बार (2018, 2022, 2026)", "C. 4 बार", "D. 1 बार"],
        optionsEn: ["A. 2 times", "B. 3 times (2018, 2022, 2026)", "C. 4 times", "D. 1 time"],
        correctIndex: 1,
        explanation: "वे 2018 (गोल्ड कोस्ट), 2022 (बर्मिंघम) तथा 2026 (ग्लासगो) में लगातार 3 बार स्वर्ण जीत चुकी हैं।",
        explanationEn: "She won Gold consecutively in 2018, 2022, and 2026 CWG."
      },
      {
        question: "मीराबाई चानू के बचपन (12 वर्ष की आयु) में क्षमता प्रदर्शन की कौन-सी घटना प्रसिद्ध है?",
        questionEn: "Which event demonstrating Mirabai Chanu's childhood strength at age 12 is famous?",
        options: ["A. भारी लकड़ियों के गट्ठे उठाना", "B. तैरकर नदी पार करना", "C. पत्थर उठाना", "D. लंबी कूद लगाना"],
        optionsEn: ["A. Carrying heavy firewood bundles", "B. Swimming across river", "C. Lifting boulders", "D. Long jump"],
        correctIndex: 0,
        explanation: "12 वर्ष की उम्र में वे अपने बड़े भाईयों से भी भारी लकड़ियों के गट्ठे उठाकर पहाड़ी गाँव लाती थीं।",
        explanationEn: "She carried heavy firewood bundles that her elder brothers struggled with."
      },
      {
        question: "MPPSC मुख्य परीक्षा पाठ्यक्रम में खेल समसामयिकी (Sports GK) किस पेपर के अंतर्गत आता है?",
        questionEn: "In MPPSC Mains syllabus, Sports Current Affairs comes under which paper?",
        options: ["A. केवल गणित", "B. सामान्य अध्ययन Paper 1 एवं Paper 3", "C. केवल निबंध", "D. केवल नैतिकता"],
        optionsEn: ["A. Mathematics only", "B. General Studies Paper 1 & Paper 3", "C. Hindi only", "D. Philosophy only"],
        correctIndex: 1,
        explanation: "खेलकूद MPPSC प्रारम्भिक परीक्षा GS-1 एवं मुख्य परीक्षा Paper 1 तथा Paper 3 का अनिवार्य विषय है।",
        explanationEn: "Sports Current Affairs is a key unit in MPPSC Prelims GS-1 and Mains Paper 1 & Paper 3."
      }
    ]
  };

  console.log(`📝 Syncing Mirabai Chanu article ID "${article._id}" to Sanity CMS...`);
  const res = await client.createOrReplace(article);
  console.log(`🎉 SUCCESS! Article uploaded & published in Sanity CMS. Document ID: ${res._id}`);
  console.log(`URL slug: ${res.slug.current}`);
}

main().catch((err) => {
  console.error("❌ Error uploading Mirabai Chanu article:", err);
  process.exit(1);
});
