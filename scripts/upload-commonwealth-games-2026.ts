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
  console.log("🚀 Uploading / Updating Commonwealth Games 2026 Hub Article with 15 Medals Tally...");

  const imagePaths = {
    featuredThumbnail: path.resolve(process.cwd(), "public/images/blog/cwg-2026-glasgow-medals-thumbnail.png"),
    mirabaiGold: path.resolve(process.cwd(), "public/images/blog/mirabai-chanu-cwg-2026-gold-1.png"),
    indiaWinnersBanner: path.resolve(process.cwd(), "public/images/blog/cwg-2026-india-winners-banner.png"),
    athleticsTraining: path.resolve(process.cwd(), "public/images/blog/cwg-2026-athletics-india.png"),
  };

  let assetFeaturedThumbnail, assetVictoryPodium, assetIndiaWinnersBanner, assetAthleticsTraining;

  try {
    if (fs.existsSync(imagePaths.featuredThumbnail)) {
      assetFeaturedThumbnail = await client.assets.upload("image", fs.createReadStream(imagePaths.featuredThumbnail), { filename: "cwg_2026_medals_thumbnail.png" });
    }
    if (fs.existsSync(imagePaths.mirabaiGold)) {
      assetVictoryPodium = await client.assets.upload("image", fs.createReadStream(imagePaths.mirabaiGold), { filename: "mirabai_chanu_gold_podium.png" });
    }
    if (fs.existsSync(imagePaths.indiaWinnersBanner)) {
      assetIndiaWinnersBanner = await client.assets.upload("image", fs.createReadStream(imagePaths.indiaWinnersBanner), { filename: "cwg_2026_india_winners_banner.png" });
    }
    if (fs.existsSync(imagePaths.athleticsTraining)) {
      assetAthleticsTraining = await client.assets.upload("image", fs.createReadStream(imagePaths.athleticsTraining), { filename: "cwg_2026_athletics_india.png" });
    }
    console.log("📸 Images checked & uploaded.");
  } catch (e) {
    console.warn("⚠️ Image upload warning:", e);
  }

  const article = {
    _id: "ca-commonwealth-games-2026",
    _type: "currentAffairs",
    slug: { _type: "slug", current: "commonwealth-games-2026-updates-india-medal-tally" },
    title: "कॉमनवेल्थ गेम्स 2026 मेडल टैली: भारत के सभी 15 पदक विजेता, मीराबाई, शर्मिला व दिलीप का स्वर्ण, श्रीशंकर, बासिल, हरजिंदर का रजत, पूरी तालिका | MPPSC & UPSC",
    titleEn: "Commonwealth Games 2026 India Medals Tally: 15 Winners List, Dilip Gavit, Mirabai Chanu & Sharmila Gold, Sreeshankar & Basil Silver & Key Updates | MPPSC & UPSC",
    excerpt: "कॉमनवेल्थ गेम्स 2026 (ग्लासगो, स्कॉटलैंड): भारत की अद्यतन पदक तालिका (Medals Tally Table), कुल 15 पदक (3 स्वर्ण, 9 रजत, 3 कांस्य)। मीराबाई चानू, शर्मिला धनखड़ व दिलीप गावित का स्वर्ण, ऋषिकांत, मुथुपांडी, ज्ञानेश्वरी, सर्वेश, वल्लुरी अजय बाबू, हरजिंदर कौर, गुलवीर सिंह, मुरली श्रीशंकर व मोहम्मद बासिल का रजत, झंडू, बिंदियारानी व शिल्पा का कांस्य। MPPSC व UPSC परीक्षा नोट्स।",
    excerptEn: "Live updates on Commonwealth Games 2026 (Glasgow, Scotland): India's full 15 medals tally table (3 Gold, 9 Silver, 3 Bronze), Dilip Gavit, Mirabai Chanu & Sharmila Gold, Rishikanta, Muthupandi, Gyaneshwari, Sarvesh, Valluri Ajay, Harjinder, Gulveer, Sreeshankar & Basil Silver, Jhandu, Bindyarani & Shilpa Bronze for MPPSC & UPSC exams.",
    ca_date: "2026-07-30",
    publishedAt: new Date().toISOString(),
    featured: true,
    readingTime: 12,
    keywords: [
      "Commonwealth Games 2026",
      "कॉमनवेल्थ गेम्स 2026",
      "glasgow 2026 cwg gold silver bronze medals",
      "2026 win mirabai chanu",
      "mirabai chanu 2026 gold medal victory podium",
      "कॉमनवेल्थ गेम्स 2026 में भारत का शानदार प्रदर्शन",
      "कॉमनवेल्थ गेम्स 2026 मेडल टैली",
      "Commonwealth Games 2026 India Medals Tally",
      "CWG 2026 Medal Winners List",
      "Dilip Gavit Gold Medal CWG 2026",
      "Mohammad Basil Silver Medal CWG 2026",
      "Murali Sreeshankar Silver Medal CWG 2026",
      "CWG 2026 dropped sports list",
      "कॉमनवेल्थ गेम्स 2026 से हटाए गए खेल",
      "Mirabai Chanu Gold Medal CWG 2026 190kg",
      "ऋषिकांत सिंह वेटलिफ्टिंग स्नैच रिकॉर्ड",
      "झांडू कुमार पैरा पावरलिफ्टिंग कांस्य",
      "मुथुपांडी राजा वेटलिफ्टिंग रजत",
      "ज्ञानेश्वरी यादव वेटलिफ्टिंग रजत",
      "बिंदियारानी देवी वेटलिफ्टिंग कांस्य",
      "शर्मिला पैरा एथलेटिक्स स्वर्ण",
      "सर्वेश कुशारे एथलेटिक्स रजत",
      "शिल्पा के. शायला पैरा एथलेटिक्स कांस्य",
      "वल्लुरी अजय बाबू वेटलिफ्टिंग रजत",
      "हरजिंदर कौर वेटलिफ्टिंग 69kg रजत",
      "गुलवीर सिंह एथलेटिक्स 10000m रजत",
      "मुरली श्रीशंकर मेंस लॉन्ग जंप रजत",
      "दिलीप गावित 100m T47 स्वर्ण",
      "मोहम्मद बासिल 100m T47 रजत",
      "स्कॉटलैंड ग्लासगो CWG 2026",
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
        alt: "Glasgow 2026 Commonwealth Games Gold Silver Bronze Medals Official Logo Thumbnail MPPSC UPSC Notes",
      }
    } : {}),

    /* ─── SECTIONS ──────────────────────────────────────────────── */
    sections: [
      /* ── 1. Overview & Highlights ─────────────────────────────── */
      {
        _key: "sec-overview-highlights",
        kind: "whyInNews",
        title: "चर्चा में क्यों? कॉमनवेल्थ गेम्स 2026 (Glasgow CWG Overview)",
        titleEn: "Context & Overview of Commonwealth Games 2026",
        body: [
          {
            _key: "b1-1", _type: "block", style: "normal",
            children: [{ _key: "s1-1", _type: "span", text: "23वें **कॉमनवेल्थ गेम्स 2026 (Commonwealth Games 2026)** का भव्य आयोजन **23 जुलाई से 2 अगस्त 2026** तक स्कॉटलैंड के **ग्लासगो** शहर में आयोजित किया जा रहा है। इस प्रतिष्ठित बहु-खेल प्रतियोगिता में भारत ने **122 खिलाड़ियों का दल** भेजा है, जो विभिन्न खेलों और पैरा स्पर्धाओं में देश का प्रतिनिधित्व कर रहे हैं।" }],
          },
          ...(assetVictoryPodium ? [{
            _type: "image",
            asset: { _type: "reference", _ref: assetVictoryPodium._id },
            alt: "2026 win mirabai chanu gold medal victory podium glasgow commonwealth games weightlifting mppsc upsc notes",
            caption: "2026 win mirabai chanu: कॉमनवेल्थ गेम्स 2026 (ग्लासगो) में 48kg स्वर्ण पदक जीत के साथ पोडियम पर मुस्कुरातीं मीराबाई चानू",
          }] : []),
          {
            _key: "b1-2", _type: "block", style: "normal",
            children: [{ _key: "s1-2", _type: "span", text: "भारतीय खिलाड़ियों ने शानदार प्रदर्शन करते हुए **3 स्वर्ण, 9 रजत और 3 कांस्य** सहित कुल **15 पदक** अपने नाम कर लिए हैं। मीराबाई चानू (वेटलिफ्टिंग 48kg), शर्मिला (पैरा-एथलेटिक्स शॉट पुट F57) एवं दिलीप गावित (पैरा-एथलेटिक्स मेंस 100m T47) ने स्वर्ण पदक जीतकर भारत का सिर गर्व से ऊँचा किया है। वहीं ऋषिकांत सिंह, मुथुपांडी राजा, ज्ञानेश्वरी यादव, सर्वेश कुशारे, वल्लुरी अजय बाबू, हरजिंदर कौर, गुलवीर सिंह, मुरली श्रीशंकर और मोहम्मद बासिल ने रजत पदक तथा झंडू कुमार, बिंदियारानी देवी एवं शिल्पा के. शायला ने कांस्य पदक हासिल किए हैं।" }],
          },
          {
            _key: "b1-h1", _type: "block", style: "h3",
            children: [{ _key: "sh1-1", _type: "span", text: "मुख्य बिंदु तालिका (CWG 2026 Highlights Table)" }],
          },
          {
            _type: "table",
            caption: "कॉमनवेल्थ गेम्स 2026: एक नज़र में (Highlights Table)",
            headers: ["विवरण (Parameter)", "महत्वपूर्ण जानकारी (Details)"],
            rows: [
              ["**आयोजन (Event)**", "कॉमनवेल्थ गेम्स 2026 (23वां संस्करण)"],
              ["**मेजबान शहर (Host City)**", "ग्लासगो, स्कॉटलैंड (United Kingdom)"],
              ["**आयोजन तिथि (Dates)**", "23 जुलाई – 2 अगस्त 2026"],
              ["**भारतीय दल (Indian Contingent)**", "122 खिलाड़ी (8 नियमित + 5 पैरा खेल)"],
              ["**भारत के कुल पदक (Total Medals)**", "**15 (3 स्वर्ण, 9 रजत, 3 कांस्य)**"]
            ]
          }
        ],
        bodyEn: [
          {
            _key: "b1-3", _type: "block", style: "normal",
            children: [{ _key: "s1-3", _type: "span", text: "The 23rd Commonwealth Games 2026 are held in Glasgow, Scotland from July 23 to August 2, 2026, with an Indian contingent of 122 athletes having secured 15 medals (3 Gold, 9 Silver, 3 Bronze) so far." }],
          },
        ],
      },

      /* ── 2. India's Performance & CWG 2026 Dropped Sports List ─── */
      {
        _key: "sec-sports-disciplines",
        kind: "background",
        title: "ग्लासगो 2026: शामिल खेल एवं बाहर किए गए 5 प्रमुख खेल (Dropped Sports)",
        titleEn: "CWG 2026 Sports Disciplines & List of 5 Dropped Major Sports",
        body: [
          {
            _key: "b2-intro", _type: "block", style: "normal",
            children: [{ _key: "s2-in", _type: "span", text: "ग्लासगो 2026 राष्ट्रमंडल खेलों का आयोजन बजट कम करने के उद्देश्य से एक सीमित (Scaled-down) प्रारूप में किया जा रहा है। इस बार कुल **10 खेलों** को ही शामिल किया गया है।" }],
          },
          {
            _key: "b2-h1", _type: "block", style: "h3",
            children: [{ _key: "sh2-1", _type: "span", text: "1. 2026 कॉमनवेल्थ गेम्स से बाहर किए गए 5 प्रमुख खेल (MPPSC Special Notes)" }],
          },
          {
            _key: "b2-d1", _type: "block", style: "normal",
            children: [{ _key: "s2-d1", _type: "span", text: "• 🚫 **निशानेबाजी (Shooting)**: भारत का सबसे सफल खेल होने के बावजूद ग्लासगो 2026 से बाहर।" }],
          },
          {
            _key: "b2-d2", _type: "block", style: "normal",
            children: [{ _key: "s2-d2", _type: "span", text: "• 🚫 **कुश्ती (Wrestling)**: भारत का एक और पारंपरिक पदक-विजेता खेल बाहर किया गया।" }],
          },
          {
            _key: "b2-d3", _type: "block", style: "normal",
            children: [{ _key: "s2-d3", _type: "span", text: "• 🚫 **बैडमिंटन (Badminton)**: स्टार शटलरों का मुकाबला इस बार आयोजित नहीं हो रहा।" }],
          },
          {
            _key: "b2-d4", _type: "block", style: "normal",
            children: [{ _key: "s2-d4", _type: "span", text: "• 🚫 **हॉकी (Hockey)**: पुरुष व महिला राष्ट्रीय हॉकी स्पर्धाएँ बाहर।" }],
          },
          {
            _key: "b2-d5", _type: "block", style: "normal",
            children: [{ _key: "s2-d5", _type: "span", text: "• 🚫 **टेबल टेनिस (Table Tennis)**: टीटी स्पर्धाएँ भी इस बार हटाई गई हैं।" }],
          },
          {
            _key: "b2-h2", _type: "block", style: "h3",
            children: [{ _key: "sh2-2", _type: "span", text: "2. ग्लासगो 2026 में शामिल 10 प्रमुख खेल" }],
          },
          {
            _key: "b2-1", _type: "block", style: "normal",
            children: [{ _key: "s2-1", _type: "span", text: "• **एथलेटिक्स व पैरा एथलेटिक्स**, **भारोत्तोलन व पैरा पावरलिफ्टिंग**, **मुक्केबाजी**, **तैराकी व पैरा तैराकी**, **आर्टिस्टिक जिम्नास्टिक**, **जूडो**, **लॉन बाउल्स**, **ट्रैक साइकिलिंग**, **3×3 व्हीलचेयर बास्केटबॉल**, **नेटबॉल**।" }],
          },
        ],
        bodyEn: [
          {
            _key: "b2-14", _type: "block", style: "normal",
            children: [{ _key: "s2-14", _type: "span", text: "CWG 2026 is hosted in a scaled-down format featuring 10 sports. Major sports dropped include Shooting, Wrestling, Badminton, Hockey, and Table Tennis." }],
          },
        ],
      },

      /* ── 3. Medal Winners Table & Player Performances ──────────── */
      {
        _key: "sec-winners-table-details",
        kind: "keyHighlights",
        title: "कॉमनवेल्थ गेम्स 2026: भारतीय पदक विजेता (Medal Winners Table)",
        titleEn: "CWG 2026 India Medal Winners List & Table",
        body: [
          ...(assetIndiaWinnersBanner ? [{
            _type: "image",
            asset: { _type: "reference", _ref: assetIndiaWinnersBanner._id },
            alt: "कॉमनवेल्थ गेम्स 2026 में भारत का शानदार प्रदर्शन सभी पदक विजेता और पूरी मेडल टेली आकार आईएएस",
            caption: "कॉमनवेल्थ गेम्स 2026 में भारत का शानदार प्रदर्शन: सभी 15 पदक विजेता एवं मेडल टेली",
          }] : []),
          {
            _key: "b3-h1", _type: "block", style: "h3",
            children: [{ _key: "sh3-1", _type: "span", text: "1. पदक विजेताओं की आधिकारिक तालिका (Medal Winners List)" }],
          },
          {
            _type: "table",
            caption: "कॉमनवेल्थ गेम्स 2026: भारतीय पदक विजेता (15 Medals Tally)",
            headers: ["नम्बर", "एथलीट", "इवेंट", "खेल", "मेडल"],
            rows: [
              ["1", "**ऋषिकांत सिंह**", "मेंस 60किग्रा", "वेटलिफ्टिंग", "**सिल्वर (Silver)**"],
              ["2", "**झंडू कुमार**", "मेंस हेविवेट", "पैरा पावरलिफ्टिंग", "**ब्रॉन्ज (Bronze)**"],
              ["3", "[**मीराबाई चानू (Mirabai Chanu)**](/current-affairs/mirabai-chanu-biography-cwg-2026-gold-medal-weightlifting)", "वूमेंस 48किग्रा", "वेटलिफ्टिंग", "**गोल्ड (Gold)**"],
              ["4", "**मुथुपांडी राजा**", "मेंस 65किग्रा", "वेटलिफ्टिंग", "**सिल्वर (Silver)**"],
              ["5", "**ज्ञानेश्वरी यादव**", "वूमेंस 53किग्रा", "वेटलिफ्टिंग", "**सिल्वर (Silver)**"],
              ["6", "**बिंदियारानी देवी**", "वूमेंस 58किग्रा", "वेटलिफ्टिंग", "**ब्रॉन्ज (Bronze)**"],
              ["7", "[**शर्मिला धनखड़ (Sharmila Dhankar)**](/current-affairs/sharmila-dhankar-biography-cwg-2026-gold-medal-para-athletics)", "वूमेंस शॉट पुट F57", "पैरा-एथलेटिक्स", "**गोल्ड (Gold)**"],
              ["8", "**सर्वेश कुशारे**", "मेंस हाई जंप", "एथलेटिक्स", "**सिल्वर (Silver)**"],
              ["9", "**शिल्पा के. शायला**", "वूमेंस शॉट पुट F57", "पैरा-एथलेटिक्स", "**ब्रॉन्ज (Bronze)**"],
              ["10", "**वल्लुरी अजय बाबू**", "मेंस 79किग्रा", "वेटलिफ्टिंग", "**सिल्वर (Silver)**"],
              ["11", "**हरजिंदर कौर**", "वूमेंस 69किग्रा", "वेटलिफ्टिंग", "**सिल्वर (Silver)**"],
              ["12", "**गुलवीर सिंह**", "मेंस 10000मी", "एथलेटिक्स", "**सिल्वर (Silver)**"],
              ["13", "**मुरली श्रीशंकर**", "मेंस लॉन्ग जंप", "एथलेटिक्स", "**सिल्वर (Silver)**"],
              ["14", "**दिलीप गावित**", "मेंस 100 मीटर T47", "पैरा एथलेटिक्स", "**गोल्ड (Gold)**"],
              ["15", "**मोहम्मद बासिल**", "मेंस 100 मीटर T47", "पैरा एथलेटिक्स", "**सिल्वर (Silver)**"]
            ]
          },
          {
            _key: "b3-h2", _type: "block", style: "h3",
            children: [{ _key: "sh3-2", _type: "span", text: "2. भारतीय पदक विजेताओं का व्यक्तिगत प्रदर्शन" }],
          },
          {
            _key: "b3-1", _type: "block", style: "normal",
            children: [{ _key: "s3-1", _type: "span", text: "• **ऋषिकांत सिंह (मेंस 60किग्रा - सिल्वर)**: पुरुष 60 किग्रा वेटलिफ्टिंग स्पर्धा में स्नैच (Snatch) श्रेणी में नया कॉमनवेल्थ गेम्स रिकॉर्ड बनाते हुए शानदार रजत पदक हासिल किया।" }],
          },
          {
            _key: "b3-2", _type: "block", style: "normal",
            children: [{ _key: "s3-2", _type: "span", text: "• **झंडू कुमार (मेंस हेविवेट - ब्रॉन्ज)**: मेंस हेविवेट पैरा पावरलिफ्टिंग स्पर्धा में कांस्य पदक जीतकर कॉमनवेल्थ गेम्स 2026 में भारत का पहला पदक दर्ज किया।" }],
          },
          {
            _key: "b3-3", _type: "block", style: "normal",
            children: [{ _key: "s3-3", _type: "span", text: "• **मीराबाई चानू (वूमेंस 48किग्रा - गोल्ड)**: स्टार वेटलिफ्टर मीराबाई चानू ने महिला 48 किग्रा वर्ग में 190 किग्रा भार उठाकर भारत को 2026 खेलों का **पहला स्वर्ण पदक** दिलाया। यह उनका लगातार तीसरा CWG गोल्ड मेडल है। [मीराबाई चानू की सम्पूर्ण जीवनी पढ़ें ➔](/current-affairs/mirabai-chanu-biography-cwg-2026-gold-medal-weightlifting)" }],
          },
          {
            _key: "b3-4", _type: "block", style: "normal",
            children: [{ _key: "s3-4", _type: "span", text: "• **मुथुपांडी राजा (मेंस 65किग्रा - सिल्वर)**: मेंस 65 किग्रा वेटलिफ्टिंग स्पर्धा में बेहतरीन प्रदर्शन करते हुए रजत पदक अपने नाम किया।" }],
          },
          {
            _key: "b3-5", _type: "block", style: "normal",
            children: [{ _key: "s3-5", _type: "span", text: "• **ज्ञानेश्वरी यादव (वूमेंस 53किग्रा - सिल्वर)**: वूमेंस 53 किग्रा वेटलिफ्टिंग स्पर्धा में उत्कृष्ट भारोत्तोलन तकनीक का प्रदर्शन करते हुए भारत के लिए रजत पदक जीता।" }],
          },
          {
            _key: "b3-6", _type: "block", style: "normal",
            children: [{ _key: "s3-6", _type: "span", text: "• **बिंदियारानी देवी (वूमेंस 58किग्रा - ब्रॉन्ज)**: वूमेंस 58 किग्रा वेटलिफ्टिंग में कांस्य पदक जीतकर भारत की वेटलिफ्टिंग टीम की सफलता को आगे बढ़ाया।" }],
          },
          {
            _key: "b3-7", _type: "block", style: "normal",
            children: [{ _key: "s3-7", _type: "span", text: "• **शर्मिला धनखड़ (वूमेंस शॉट पुट F57 - गोल्ड)**: वूमेंस शॉट पुट F57 पैरा-एथलेटिक्स स्पर्धा में अपने 9.81m सर्वश्रेष्ठ थ्रो के साथ भारत को 2026 खेलों का **दूसरा स्वर्ण पदक** (पैरा एथलेटिक्स इतिहास का पहला गोल्ड) दिलाया। [शर्मिला धनखड़ की सम्पूर्ण जीवनी एवं रिकॉर्ड्स पढ़ें ➔](/current-affairs/sharmila-dhankar-biography-cwg-2026-gold-medal-para-athletics)" }],
          },
          {
            _key: "b3-8", _type: "block", style: "normal",
            children: [{ _key: "s3-8", _type: "span", text: "• **सर्वेश कुशारे (मेंस हाई जंप - सिल्वर)**: मेंस हाई जंप एथलेटिक्स स्पर्धा में ऊँची छलांग लगाकर भारत के लिए एथलेटिक्स में रजत पदक हासिल किया।" }],
          },
          {
            _key: "b3-9", _type: "block", style: "normal",
            children: [{ _key: "s3-9", _type: "span", text: "• **शिल्पा के. शायला (वूमेंस शॉट पुट F57 - ब्रॉन्ज)**: वूमेंस शॉट पुट F57 पैरा-एथलेटिक्स स्पर्धा में कांस्य पदक जीतकर भारत की दोहरी सफलता (शर्मिला गोल्ड, शिल्पा ब्रॉन्ज) सुनिश्चित की।" }],
          },
          {
            _key: "b3-10", _type: "block", style: "normal",
            children: [{ _key: "s3-10", _type: "span", text: "• **वल्लुरी अजय बाबू (मेंस 79किग्रा - सिल्वर)**: मेंस 79 किग्रा वेटलिफ्टिंग स्पर्धा में शानदार प्रदर्शन करते हुए रजत पदक अपने नाम किया।" }],
          },
          {
            _key: "b3-11", _type: "block", style: "normal",
            children: [{ _key: "s3-11", _type: "span", text: "• **हरजिंदर कौर (वूमेंस 69किग्रा - सिल्वर)**: महिला 69 किग्रा वेटलिफ्टिंग स्पर्धा में उत्कृष्ट भारोत्तोलन क्षमता दिखाते हुए रजत पदक हासिल किया।" }],
          },
          {
            _key: "b3-12", _type: "block", style: "normal",
            children: [{ _key: "s3-12", _type: "span", text: "• **गुलवीर सिंह (मेंस 10000मी - सिल्वर)**: पुरुष 10,000 मीटर लंबी दूरी की दौड़ एथलेटिक्स स्पर्धा में शानदार गति व स्टैमिना का प्रदर्शन करते हुए भारत के लिए रजत पदक जीता।" }],
          },
          {
            _key: "b3-13", _type: "block", style: "normal",
            children: [{ _key: "s3-13", _type: "span", text: "• **मुरली श्रीशंकर (मेंस लॉन्ग जंप - सिल्वर)**: पुरुष लंबी कूद (Long Jump) एथलेटिक्स स्पर्धा में उत्कृष्ट प्रदर्शन करते हुए भारत को एथलेटिक्स में एक और महत्वपूर्ण रजत पदक दिलाया।" }],
          },
          {
            _key: "b3-14-dilip", _type: "block", style: "normal",
            children: [{ _key: "s3-14d", _type: "span", text: "• **दिलीप गावित (मेंस 100m T47 - गोल्ड)**: मेंस 100 मीटर T47 पैरा एथलेटिक्स स्प्रिंट स्पर्धा में रिकॉर्ड स्पीड के साथ पहला स्थान हासिल कर भारत को **तीसरा स्वर्ण पदक** दिलाया।" }],
          },
          {
            _key: "b3-15-basil", _type: "block", style: "normal",
            children: [{ _key: "s3-15b", _type: "span", text: "• **मोहम्मद बासिल (मेंस 100m T47 - सिल्वर)**: मेंस 100 मीटर T47 पैरा एथलेटिक्स में दूसरे स्थान पर रहकर रजत पदक जीता और 100m स्प्रिंट में भारत को 1-2 (गोल्ड व सिल्वर) की ऐतिहासिक बढ़त दिलाई।" }],
          },
          {
            _key: "b3-h3", _type: "block", style: "h3",
            children: [{ _key: "sh3-3", _type: "span", text: "3. खेलवार भारत की पदक तालिका (Sport-wise Medal Tally)" }],
          },
          {
            _type: "table",
            caption: "खेलवार भारत की पदक तालिका (Sport-wise Medal Tally)",
            headers: ["खेल (Sport)", "स्वर्ण (Gold)", "रजत (Silver)", "कांस्य (Bronze)", "कुल (Total)"],
            rows: [
              ["**वेटलिफ्टिंग (Weightlifting)**", "1", "5", "1", "**7**"],
              ["**पैरा-एथलेटिक्स (Para Athletics)**", "2", "1", "1", "**4**"],
              ["**एथलेटिक्स (Athletics)**", "0", "3", "0", "**3**"],
              ["**पैरा पावरलिफ्टिंग (Para Powerlifting)**", "0", "0", "1", "**1**"],
              ["**कुल भारत पदक तालिका (Total)**", "**3**", "**9**", "**3**", "**15**"]
            ]
          },
          {
            _key: "b3-h4", _type: "block", style: "h3",
            children: [{ _key: "sh4-4", _type: "span", text: "4. आगामी प्रतिस्पर्धाएँ एवं पदक दावेदार (Upcoming Medal Contenders)" }],
          },
          {
            _key: "b3-contender1", _type: "block", style: "normal",
            children: [{ _key: "s3-c1", _type: "span", text: "• **लवलीना बोरगोहैन (Boxing)**: महिला 75 किलोग्राम मुक्केबाजी स्पर्धा के सेमिफाइनल/फाइनल मुकाबलों में पदक की मजबूत दावेदार हैं।" }],
          },
          {
            _key: "b3-contender2", _type: "block", style: "normal",
            children: [{ _key: "s3-c2", _type: "span", text: "• **एथलेटिक्स स्टार्स**: गुरिंदरवीर सिंह, अनिमेष कुजूर, तजिंदरपाल सिंह तूर एवं पारुल चौधरी।" }],
          },
        ],
        bodyEn: [
          {
            _key: "b3-14", _type: "block", style: "normal",
            children: [{ _key: "s3-14", _type: "span", text: "Comprehensive winners table: Dilip Gavit, Mirabai Chanu & Sharmila Gold, Rishikanta, Muthupandi, Gyaneshwari, Sarvesh, Valluri Ajay, Harjinder, Gulveer, Sreeshankar & Basil Silver, Jhandu, Bindyarani & Shilpa Bronze." }],
          },
        ],
      },

      /* ── 4. History & Milestone Achievements ──────────────────── */
      {
        _key: "sec-cwg-history",
        kind: "analysis",
        title: "कॉमनवेल्थ गेम्स में भारत का इतिहास एवं सर्वश्रेष्ठ प्रदर्शन",
        titleEn: "India's CWG History & All-Time Performance",
        body: [
          {
            _key: "b4-h1", _type: "block", style: "h3",
            children: [{ _key: "sh4-1", _type: "span", text: "1. कॉमनवेल्थ गेम्स का संक्षिप्त इतिहास (Brief History of CWG)" }],
          },
          {
            _key: "b4-1", _type: "block", style: "normal",
            children: [{ _key: "s4-1", _type: "span", text: "• **पहला संस्करण (1930)**: पहला कॉमनवेल्थ गेम्स 1930 में कनाडा के **हैमिल्टन** शहर में आयोजित हुआ था (11 देशों के ~400 खिलाड़ी)।" }],
          },
          {
            _key: "b4-2", _type: "block", style: "normal",
            children: [{ _key: "s4-2", _type: "span", text: "• **भारत का पदार्पण (1934)**: भारत ने पहली बार 1934 (लंदन) में भाग लिया था।" }],
          },
          {
            _key: "b4-3", _type: "block", style: "normal",
            children: [{ _key: "s4-3", _type: "span", text: "• **पहला पदक**: भारत का पहला पदक **रशीद अनवर** ने 1934 में कुश्ती (कांस्य) में जीता।" }],
          },
          {
            _key: "b4-4", _type: "block", style: "normal",
            children: [{ _key: "s4-4", _type: "span", text: "• **पहला स्वर्ण पदक (1958)**: भारत का पहला स्वर्ण पदक **मिल्खा सिंह** ने 1958 में कार्डिफ में जीता।" }],
          },
          {
            _key: "b4-h2", _type: "block", style: "h3",
            children: [{ _key: "sh4-2", _type: "span", text: "2. भारत का सर्वश्रेष्ठ प्रदर्शन (Best Tally - Delhi 2010)" }],
          },
          {
            _key: "b4-5", _type: "block", style: "normal",
            children: [{ _key: "s4-5", _type: "span", text: "• **2010 नई दिल्ली**: भारत का अब तक का सर्वश्रेष्ठ प्रदर्शन नई दिल्ली 2010 कॉमनवेल्थ गेम्स में रहा, जब मेजबान देश के रूप में भारत ने **38 स्वर्ण, 27 रजत, 36 कांस्य सहित 101 पदक** जीतकर पदक तालिका में **दूसरा स्थान** प्राप्त किया।" }],
          },
          {
            _type: "table",
            caption: "भारत का सर्वश्रेष्ठ CWG प्रदर्शन (नई दिल्ली 2010)",
            headers: ["स्वर्ण (Gold)", "रजत (Silver)", "कांस्य (Bronze)", "कुल पदक (Total Medals)", "रैंक (Rank)"],
            rows: [
              ["38", "27", "36", "**101**", "**2nd (द्वितीय स्थान)**"]
            ]
          },
          {
            _key: "b4-6", _type: "block", style: "normal",
            children: [{ _key: "s4-6", _type: "span", text: "• **सर्वकालिक रिकॉर्ड**: भारत अब तक 18 संस्करणों में भाग लेकर **570 से अधिक पदक** जीत चुका है और ऑस्ट्रेलिया, इंग्लैंड व कनाडा के बाद इतिहास के सबसे सफल देशों में शामिल है।" }],
          },
        ],
        bodyEn: [
          {
            _key: "b4-8", _type: "block", style: "normal",
            children: [{ _key: "s4-8", _type: "span", text: "Historic stats: 1930 Hamilton origin, Rashid Anwar 1934 first bronze, Milkha Singh 1958 first gold, Delhi 2010 best performance (101 medals, 2nd rank)." }],
          },
        ],
      },

      /* ── 5. MPPSC & UPSC Exam Revision Notes (STYLIZED FACTS GRID) ─── */
      {
        _key: "sec-revision-notes",
        kind: "wayForward",
        title: "MPPSC & UPSC परीक्षा हेतु Quick Revision Study Notes",
        titleEn: "MPPSC & UPSC Sports Revision Notes",
        body: [
          {
            _type: "facts",
            items: [
              { label: "2026 CWG मेजबान", value: "**ग्लासगो, स्कॉटलैंड** (23 जुलाई - 2 अगस्त 2026)" },
              { label: "भारतीय दल क्षमता", value: "**122 खिलाड़ी** (8 नियमित + 5 पैरा खेल)" },
              { label: "भारत के कुल पदक", value: "**15 पदक (3 स्वर्ण, 9 रजत, 3 कांस्य)**" },
              { label: "गोल्ड मेडलिस्ट", value: "**मीराबाई चानू** (वेटलिफ्टिंग 48kg), **शर्मिला** (पैरा-एथलेटिक्स शॉट पुट) व **दिलीप गावित** (पैरा-एथलेटिक्स 100m)" },
              { label: "सिल्वर मेडलिस्ट", value: "**ऋषिकांत, मुथुपांडी, ज्ञानेश्वरी, सर्वेश, वल्लुरी अजय बाबू, हरजिंदर कौर, गुलवीर सिंह, मुरली श्रीशंकर, मोहम्मद बासिल**" },
              { label: "ब्रॉन्ज मेडलिस्ट", value: "**झंडू कुमार, बिंदियारानी देवी, शिल्पा के. शायला**" },
              { label: "हटाए गए प्रमुख खेल", value: "**निशानेबाजी, कुश्ती, बैडमिंटन, हॉकी, टेबल टेनिस**" },
            ]
          }
        ],
        bodyEn: [
          {
            _key: "b5-8", _type: "block", style: "normal",
            children: [{ _key: "s5-8", _type: "span", text: "High-yield one-liner revision points tailored for MPPSC & UPSC exams." }],
          },
        ],
      },
    ],

    /* ─── FAQS (8 Collapsible FAQs) ───────────────────────── */
    faqs: [
      {
        question: "कॉमनवेल्थ गेम्स 2026 में भारत ने अब तक कितने पदक जीते हैं?",
        questionEn: "How many medals has India won so far in Commonwealth Games 2026?",
        answer: "भारत ने अब तक कुल 15 पदक जीते हैं, जिनमें 3 स्वर्ण (मीराबाई चानू - वेटलिफ्टिंग, शर्मिला - पैरा-एथलेटिक्स, दिलीप गावित - 100m T47), 9 रजत (ऋषिकांत, मुथुपांडी, ज्ञानेश्वरी, सर्वेश, वल्लुरी अजय बाबू, हरजिंदर कौर, गुलवीर सिंह, मुरली श्रीशंकर, मोहम्मद बासिल) और 3 कांस्य (झंडू कुमार, बिंदियारानी देवी, शिल्पा के. शायला) शामिल हैं।",
        answerEn: "India has secured 15 medals (3 Gold, 9 Silver, 3 Bronze) so far in CWG 2026."
      },
      {
        question: "कॉमनवेल्थ गेम्स 2026 में भारत के लिए स्वर्ण पदक (Gold Medals) किन खिलाड़ियों ने जीते हैं?",
        questionEn: "Who won Gold medals for India at CWG 2026?",
        answer: "भारत के लिए 3 स्वर्ण पदक जीते गए हैं: मीराबाई चानू (महिला 48 किग्रा वेटलिफ्टिंग), शर्मिला धनखड़ (महिला शॉट पुट F57 पैरा-एथलेटिक्स) एवं दिलीप गावित (पुरुष 100m T47 पैरा-एथलेटिक्स)।",
        answerEn: "Mirabai Chanu (Weightlifting), Sharmila (Shot Put F57), and Dilip Gavit (100m T47) won Gold."
      },
      {
        question: "कॉमनवेल्थ गेम्स 2026 में मेंस 100m T47 में किन भारतीय पैरा एथलीटों ने पदक जीते?",
        questionEn: "Which Indian para athletes won medals in Men's 100m T47 at CWG 2026?",
        answer: "पुरुष 100 मीटर T47 पैरा एथलेटिक्स स्पर्धा में दिलीप गावित ने स्वर्ण पदक (Gold) तथा मोहम्मद बासिल ने रजत पदक (Silver) जीतकर भारत के लिए पहला व दूसरा स्थान हासिल किया।",
        answerEn: "Dilip Gavit won Gold and Mohammad Basil won Silver in Men's 100m T47."
      },
      {
        question: "कॉमनवेल्थ गेम्स 2026 से किन 5 प्रमुख खेलों को बाहर (Dropped Sports) किया गया है?",
        questionEn: "Which 5 major sports have been dropped from Commonwealth Games 2026?",
        answer: "ग्लासगो 2026 खेलों से 5 प्रमुख खेलों: **निशानेबाजी (Shooting), कुश्ती (Wrestling), बैडमिंटन (Badminton), हॉकी (Hockey), तथा टेबल टेनिस (Table Tennis)** को बाहर कर दिया गया है।",
        answerEn: "Shooting, Wrestling, Badminton, Hockey, and Table Tennis have been dropped from CWG 2026."
      },
      {
        question: "कॉमनवेल्थ गेम्स 2026 में मुरली श्रीशंकर ने किस खेल में पदक जीता है?",
        questionEn: "Which medal did Murali Sreeshankar win at CWG 2026?",
        answer: "मुरली श्रीशंकर ने पुरुष लंबी कूद (Men's Long Jump - Athletics) स्पर्धा में शानदार प्रदर्शन करते हुए भारत के लिए रजत पदक (Silver) जीता है।",
        answerEn: "Murali Sreeshankar won Silver medal in Men's Long Jump."
      },
      {
        question: "गुलवीर सिंह और हरजिंदर कौर ने CWG 2026 में कौन-से पदक जीते हैं?",
        questionEn: "Which medals did Gulveer Singh and Harjinder Kaur win at CWG 2026?",
        answer: "हरजिंदर कौर ने महिला 69 किग्रा वेटलिफ्टिंग में रजत पदक और गुलवीर सिंह ने पुरुष 10,000 मीटर लंबी दूरी की दौड़ (एथलेटिक्स) में रजत पदक जीता है।",
        answerEn: "Harjinder Kaur won Silver in Women's 69kg weightlifting and Gulveer Singh won Silver in Men's 10,000m race."
      },
      {
        question: "कॉमनवेल्थ गेम्स में भारत का अब तक का सर्वश्रेष्ठ प्रदर्शन कौन-सा रहा है?",
        questionEn: "Which was India's best ever performance at the Commonwealth Games?",
        answer: "भारत का सर्वश्रेष्ठ प्रदर्शन 2010 के नई दिल्ली राष्ट्रमंडल खेलों में रहा, जहाँ भारत ने 38 स्वर्ण, 27 रजत और 36 कांस्य सहित रिकॉर्ड 101 पदक जीतकर पदक तालिका में 2nd स्थान प्राप्त किया था।",
        answerEn: "India recorded its highest tally of 101 medals (38 Gold, 2nd rank) at the 2010 New Delhi Games."
      },
      {
        question: "MPPSC परीक्षा में खेल समसामयिकी (Sports Current Affairs) का क्या महत्व है?",
        questionEn: "What is the importance of Sports Current Affairs in MPPSC exams?",
        answer: "MPPSC प्रारम्भिक परीक्षा (Paper 1 GS) एवं मुख्य परीक्षा (Paper 1/3) में खेलकूद, राष्ट्रीय-अंतरराष्ट्रीय पदक विजेताओं, रिकॉर्ड्स एवं स्पर्धाओं से 4-6 प्रश्न सीधे पूछे जाते हैं।",
        answerEn: "Sports Current Affairs accounts for 4-6 high-scoring direct questions in MPPSC Prelims Paper 1 GS and Mains."
      }
    ],

    /* ─── MCQS (8 High-Quality Practice Quizzes) ───────────────── */
    mcqs: [
      {
        question: "कॉमनवेल्थ गेम्स 2026 (CWG 2026) में भारत ने अब तक कुल कितने पदक (Medals) जीते हैं?",
        questionEn: "How many total medals has India won at the Commonwealth Games 2026?",
        options: ["A. 10 पदक", "B. 12 पदक", "C. 15 पदक (3 स्वर्ण, 9 रजत, 3 कांस्य)", "D. 20 पदक"],
        optionsEn: ["A. 10 Medals", "B. 12 Medals", "C. 15 Medals (3 Gold, 9 Silver, 3 Bronze)", "D. 20 Medals"],
        correctIndex: 2,
        explanation: "भारत ने CWG 2026 में 3 स्वर्ण, 9 रजत और 3 कांस्य सहित कुल 15 पदक जीत लिए हैं।",
        explanationEn: "India has secured a total of 15 medals (3 Gold, 9 Silver, 3 Bronze) at CWG 2026."
      },
      {
        question: "कॉमनवेल्थ गेम्स 2026 में पुरुष 100 मीटर T47 (पैरा एथलेटिक्स) स्पर्धा में स्वर्ण पदक किस भारतीय खिलाड़ी ने जीता?",
        questionEn: "Which Indian athlete won Gold in Men's 100m T47 at CWG 2026?",
        options: ["A. दिलीप गावित", "B. मोहम्मद बासिल", "C. सुमित अंतिल", "D. निशाद कुमार"],
        optionsEn: ["A. Dilip Gavit", "B. Mohammad Basil", "C. Sumit Antil", "D. Nishad Kumar"],
        correctIndex: 0,
        explanation: "दिलीप गावित ने पुरुष 100 मीटर T47 पैरा एथलेटिक्स में स्वर्ण पदक तथा मोहम्मद बासिल ने रजत पदक जीता।",
        explanationEn: "Dilip Gavit won Gold and Mohammad Basil won Silver in Men's 100m T47."
      },
      {
        question: "कॉमनवेल्थ गेम्स 2026 में पुरुष लॉन्ग जंप (लंबी कूद) एथलेटिक्स स्पर्धा में रजत पदक किस भारतीय एथलीट ने जीता?",
        questionEn: "Who won Silver medal in Men's Long Jump at CWG 2026 for India?",
        options: ["A. मुरली श्रीशंकर", "B. सर्वेश कुशारे", "C. अविनाश साबले", "D. तेजस्विन शंकर"],
        optionsEn: ["A. Murali Sreeshankar", "B. Sarvesh Kushare", "C. Avinash Sable", "D. Tejaswin Shankar"],
        correctIndex: 0,
        explanation: "मुरली श्रीशंकर ने पुरुष लॉन्ग जंप एथलेटिक्स स्पर्धा में रजत पदक हासिल किया।",
        explanationEn: "Murali Sreeshankar won Silver medal in Men's Long Jump."
      },
      {
        question: "कॉमनवेल्थ गेम्स 2026 में पुरुष 10,000 मीटर दौड़ (एथलेटिक्स) स्पर्धा में रजत पदक किस भारतीय एथलीट ने जीता?",
        questionEn: "Which Indian athlete won Silver medal in Men's 10,000m race at CWG 2026?",
        options: ["A. गुलवीर सिंह", "B. अविनाश साबले", "C. जिन्सन जॉनसन", "D. मोहम्मद अनस"],
        optionsEn: ["A. Gulveer Singh", "B. Avinash Sable", "C. Jinson Johnson", "D. Muhammed Anas"],
        correctIndex: 0,
        explanation: "गुलवीर सिंह ने पुरुष 10,000 मीटर दौड़ में शानदार प्रदर्शन करते हुए भारत के लिए रजत पदक जीता।",
        explanationEn: "Gulveer Singh won the Silver medal in Men's 10,000m race at CWG 2026."
      },
      {
        question: "कॉमनवेल्थ गेम्स 2026 में महिला 69 किग्रा वेटलिफ्टिंग स्पर्धा में रजत पदक किस भारतीय खिलाड़ी ने जीता?",
        questionEn: "Who won Silver medal in Women's 69kg Weightlifting at CWG 2026 for India?",
        options: ["A. हरजिंदर कौर", "B. मीराबाई चानू", "C. बिंदियारानी देवी", "D. संजीता चानू"],
        optionsEn: ["A. Harjinder Kaur", "B. Mirabai Chanu", "C. Bindyarani Devi", "D. Sanjita Chanu"],
        correctIndex: 0,
        explanation: "हरजिंदर कौर ने महिला 69 किग्रा भारोत्तोलन (वेटलिफ्टिंग) स्पर्धा में रजत पदक हासिल किया।",
        explanationEn: "Harjinder Kaur won Silver medal in Women's 69kg weightlifting."
      },
      {
        question: "कॉमनवेल्थ गेम्स 2026 में महिला शॉट पुट F57 (पैरा-एथलेटिक्स) स्पर्धा में स्वर्ण पदक किस भारतीय खिलाड़ी ने जीता?",
        questionEn: "Which Indian athlete won Gold in Women's Shot Put F57 Para-Athletics at CWG 2026?",
        options: ["A. शर्मिला", "B. शिल्पा के. शायला", "C. दीपा मलिक", "D. एकता भ्यान"],
        optionsEn: ["A. Sharmila", "B. Shilpa K. Shayla", "C. Deepa Malik", "D. Ekta Bhyan"],
        correctIndex: 0,
        explanation: "शर्मिला ने महिला शॉट पुट F57 में स्वर्ण पदक तथा शिल्पा के. शायला ने कांस्य पदक जीता।",
        explanationEn: "Sharmila won Gold and Shilpa K. Shayla won Bronze in Women's Shot Put F57."
      },
      {
        question: "ग्लासगो राष्ट्रमंडल खेल 2026 से किस प्रमुख खेल को बाहर (Dropped) कर दिया गया है?",
        questionEn: "Which major sport has been dropped from the Glasgow CWG 2026?",
        options: ["A. निशानेबाजी एवं कुश्ती", "B. वेटलिफ्टिंग", "C. एथलेटिक्स", "D. जूडो"],
        optionsEn: ["A. Shooting and Wrestling", "B. Weightlifting", "C. Athletics", "D. Judo"],
        correctIndex: 0,
        explanation: "निशानेबाजी, कुश्ती, बैडमिंटन, हॉकी एवं टेबल टेनिस को बजट कम करने के उद्देश्य से 2026 खेलों से बाहर रखा गया है।",
        explanationEn: "Shooting, Wrestling, Badminton, Hockey and Table Tennis were dropped from CWG 2026."
      },
      {
        question: "कॉमनवेल्थ गेम्स 2026 में भारत को वेटलिफ्टिंग (भारोत्तोलन) खेल से कुल कितने पदक प्राप्त हुए हैं?",
        questionEn: "How many total medals did India win in Weightlifting at CWG 2026?",
        options: ["A. 3 पदक", "B. 5 पदक", "C. 7 पदक (1 स्वर्ण, 5 रजत, 1 कांस्य)", "D. 10 पदक"],
        optionsEn: ["A. 3 Medals", "B. 5 Medals", "C. 7 Medals (1 Gold, 5 Silver, 1 Bronze)", "D. 10 Medals"],
        correctIndex: 2,
        explanation: "भारत को वेटलिफ्टिंग से कुल 7 पदक प्राप्त हुए हैं: मीराबाई चानू (गोल्ड), ऋषिकांत, मुथुपांडी, ज्ञानेश्वरी, वल्लुरी अजय, हरजिंदर कौर (रजत), तथा बिंदियारानी देवी (कांस्य)।",
        explanationEn: "India secured 7 medals in Weightlifting: 1 Gold, 5 Silver, and 1 Bronze."
      }
    ]
  };

  console.log(`📝 Syncing CWG 2026 hub article ID "${article._id}" to Sanity CMS with updated 15 medals...`);
  const res = await client.createOrReplace(article);
  console.log(`🎉 SUCCESS! Article uploaded & published in Sanity CMS. Document ID: ${res._id}`);
  console.log(`URL slug: ${res.slug.current}`);
}

main().catch((err) => {
  console.error("❌ Error uploading Commonwealth Games 2026 article:", err);
  process.exit(1);
});
