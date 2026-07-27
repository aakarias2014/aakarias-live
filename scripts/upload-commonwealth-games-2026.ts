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
  console.log("🚀 Starting upload process for CWG 2026 Hub Article with Glasgow Medals Top Thumbnail...");

  const publicBlogDir = path.resolve(process.cwd(), "public/images/blog");
  
  // NEW TOP FEATURED THUMBNAIL IMAGE (Glasgow 2026 Gold, Silver, Bronze Medals)
  const medalsTopThumbnailPath = path.join(publicBlogDir, "glasgow_2026_cwg_medals_top_thumbnail.png");
  let assetFeaturedThumbnail;
  if (fs.existsSync(medalsTopThumbnailPath)) {
    console.log("📸 Uploading Glasgow 2026 Medals Top Featured Image for CWG 2026 Hub to Sanity...");
    assetFeaturedThumbnail = await client.assets.upload("image", fs.createReadStream(medalsTopThumbnailPath), {
      filename: "glasgow_2026_cwg_medals_top_thumbnail.png",
    });
    console.log(`✔ Uploaded Medals Top Featured Image. Asset ID: ${assetFeaturedThumbnail._id}`);
  }

  // 1st Image: India CWG 2026 Medal Winners Banner
  const indiaWinnersBannerPath = path.join(publicBlogDir, "cwg_2026_india_medal_winners_tally_banner.jpg");
  let assetIndiaWinnersBanner;
  if (fs.existsSync(indiaWinnersBannerPath)) {
    console.log("📸 Uploading CWG 2026 India Medal Winners Graphic Banner to Sanity...");
    assetIndiaWinnersBanner = await client.assets.upload("image", fs.createReadStream(indiaWinnersBannerPath), {
      filename: "cwg_2026_india_medal_winners_tally_banner.jpg",
    });
    console.log(`✔ Uploaded India Medal Winners Banner. Asset ID: ${assetIndiaWinnersBanner._id}`);
  }

  // Victory Podium Image
  const mirabaiPodiumPath = path.join(publicBlogDir, "mirabai_chanu_2026_gold_victory_podium.png");
  let assetVictoryPodium;
  if (fs.existsSync(mirabaiPodiumPath)) {
    console.log("📸 Uploading Victory Podium Photo to Sanity...");
    assetVictoryPodium = await client.assets.upload("image", fs.createReadStream(mirabaiPodiumPath), {
      filename: "mirabai_chanu_2026_gold_victory_podium.png",
    });
    console.log(`✔ Uploaded Victory Podium Image. Asset ID: ${assetVictoryPodium._id}`);
  }

  const article = {
    _id: "ca-commonwealth-games-2026",
    _type: "currentAffairs",
    slug: { _type: "slug", current: "commonwealth-games-2026-updates-india-medal-tally" },
    title: "कॉमनवेल्थ गेम्स 2026 मेडल टैली: भारत के सभी पदक विजेता, हटाए गए खेल, 190kg रिकॉर्ड व पूरी तालिका | MPPSC & UPSC",
    titleEn: "Commonwealth Games 2026 India Medals Tally: Winners List, Dropped Sports & Key Updates | MPPSC & UPSC",
    excerpt: "कॉमनवेल्थ गेम्स 2026 (ग्लासगो, स्कॉटलैंड): भारत की पदक तालिका (Medals Tally Table), 2026 खेलों से हटाए गए 5 प्रमुख खेल (Shooting, Wrestling, Badminton, Hockey, Table Tennis), मीराबाई चानू का 190kg स्वर्ण, ऋषिकांत व मुथुपांडी का रजत, झांडू का कांस्य, 122 एथलीटों का दल, MPPSC व UPSC परीक्षा नोट्स।",
    excerptEn: "Live updates on Commonwealth Games 2026 (Glasgow, Scotland): India's full medals tally table, 5 sports dropped from CWG 2026 (Shooting, Wrestling, Badminton, Hockey, Table Tennis), Mirabai Chanu's 190kg Gold, Rishikanta & Muthupandi Silver, Jhandu Bronze, and complete winners list for MPPSC & UPSC exams.",
    ca_date: "2026-07-27",
    publishedAt: new Date().toISOString(),
    featured: true,
    readingTime: 11,
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
      "CWG 2026 dropped sports list",
      "कॉमनवेल्थ गेम्स 2026 से हटाए गए खेल",
      "Mirabai Chanu Gold Medal CWG 2026 190kg",
      "ऋषिकांत सिंह वेटलिफ्टिंग स्नैच रिकॉर्ड",
      "झांडू कुमार पैरा पावरलिफ्टिंग कांस्य",
      "मुथुपांडी राजा वेटलिफ्टिंग रजत",
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
        title: "कॉमनवेल्थ गेम्स 2026: मुख्य बिंदु एवं भारत का स्वर्णिम अभियान",
        titleEn: "CWG 2026 Overview & India Highlights",
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
            children: [{ _key: "s1-2", _type: "span", text: "भारतीय खिलाड़ियों ने शानदार प्रदर्शन करते हुए **1 स्वर्ण, 2 रजत और 1 कांस्य** सहित कुल **4 पदक** अपने नाम कर लिए हैं। स्टार भारोत्तोलक मीराबाई चानू ने 190 किग्रा भार उठाकर भारत का पहला स्वर्ण पदक जीता।" }],
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
              ["**भारत के कुल पदक (Total Medals)**", "**4 (1 स्वर्ण, 2 रजत, 1 कांस्य)**"]
            ]
          }
        ],
        bodyEn: [
          {
            _key: "b1-3", _type: "block", style: "normal",
            children: [{ _key: "s1-3", _type: "span", text: "The 23rd Commonwealth Games 2026 are held in Glasgow, Scotland from July 23 to August 2, 2026, with an Indian contingent of 122 athletes having secured 4 medals (1 Gold, 2 Silver, 1 Bronze) so far." }],
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
        title: "कॉमनवेल्थ गेम्स 2026: भारत के सभी पदक विजेता (Medal Winners Table)",
        titleEn: "CWG 2026 India Medal Winners List & Table",
        body: [
          ...(assetIndiaWinnersBanner ? [{
            _type: "image",
            asset: { _type: "reference", _ref: assetIndiaWinnersBanner._id },
            alt: "कॉमनवेल्थ गेम्स 2026 में भारत का शानदार प्रदर्शन सभी पदक विजेता और पूरी मेडल टेली आकार आईएएस",
            caption: "कॉमनवेल्थ गेम्स 2026 में भारत का शानदार प्रदर्शन: सभी पदक विजेता (ऋषिकांत सिंह, झांडू कुमार, मीराबाई चानू, मुथुपांडी राजा) एवं मेडल टेली",
          }] : []),
          {
            _key: "b3-h1", _type: "block", style: "h3",
            children: [{ _key: "sh3-1", _type: "span", text: "1. पदक विजेताओं की आधिकारिक तालिका (Medal Winners List)" }],
          },
          {
            _type: "table",
            caption: "कॉमनवेल्थ गेम्स 2026: भारतीय पदक विजेताओं की आधिकारिक तालिका (प्रोफ़ाइल हेतु खिलाड़ी नाम पर क्लिक करें)",
            headers: ["क्रमांक (No.)", "खिलाड़ी (Athlete)", "स्पर्धा (Event)", "खेल (Sport)", "पदक (Medal)"],
            rows: [
              ["1", "[**मीराबाई चानू (Mirabai Chanu)**](/current-affairs/mirabai-chanu-biography-cwg-2026-gold-medal-weightlifting)", "महिला 48 किग्रा", "वेटलिफ्टिंग", "**स्वर्ण (Gold)**"],
              ["2", "**ऋषिकांत सिंह**", "पुरुष 60 किग्रा", "वेटलिफ्टिंग", "**रजत (Silver)**"],
              ["3", "**मुथुपांडी राजा**", "पुरुष 65 किग्रा", "वेटलिफ्टिंग", "**रजत (Silver)**"],
              ["4", "**झांडू कुमार**", "पुरुष हेवीवेट", "पैरा पावरलिफ्टिंग", "**कांस्य (Bronze)**"]
            ]
          },
          {
            _key: "b3-h2", _type: "block", style: "h3",
            children: [{ _key: "sh3-2", _type: "span", text: "2. भारतीय पदक विजेताओं का व्यक्तिगत प्रदर्शन" }],
          },
          {
            _key: "b3-5", _type: "block", style: "normal",
            children: [{ _key: "s3-5", _type: "span", text: "• **मीराबाई चानू (महिला 48 किग्रा - स्वर्ण)**: स्टार वेटलिफ्टर मीराबाई चानू ने महिला 48 किलोग्राम वर्ग में स्वर्ण पदक जीतकर भारत को ग्लासगो 2026 का **पहला गोल्ड मेडल (190 किग्रा)** दिलाया। इसके साथ ही उन्होंने **लगातार तीसरी बार** कॉमनवेल्थ गेम्स का स्वर्ण पदक जीतने का ऐतिहासिक कारनामा किया। [मीराबाई चानू की सम्पूर्ण जीवनी एवं रिकॉर्ड्स पढ़ें ➔](/current-affairs/mirabai-chanu-biography-cwg-2026-gold-medal-weightlifting)" }],
          },
          {
            _key: "b3-6", _type: "block", style: "normal",
            children: [{ _key: "s3-6", _type: "span", text: "• **ऋषिकांत सिंह (पुरुष 60 किग्रा - रजत)**: ऋषिकांत सिंह ने पुरुष 60 किलोग्राम वेटलिफ्टिंग स्पर्धा में रजत पदक जीता। इस दौरान उन्होंने **स्नैच (Snatch) में नया कॉमनवेल्थ गेम्स रिकॉर्ड** भी बनाया और कॉमनवेल्थ गेम्स 2026 में पदक जीतने वाले पहले एबल-बॉडीड भारतीय खिलाड़ी बने।" }],
          },
          {
            _key: "b3-7", _type: "block", style: "normal",
            children: [{ _key: "s3-7", _type: "span", text: "• **झांडू कुमार (पुरुष हेवीवेट - कांस्य)**: भारत का पहला पदक झांडू कुमार ने पैरा पावरलिफ्टिंग में कांस्य पदक जीतकर दिलाया। उनके इस प्रदर्शन ने भारत के पदक अभियान की शानदार शुरुआत की।" }],
          },
          {
            _key: "b3-8", _type: "block", style: "normal",
            children: [{ _key: "s3-8", _type: "span", text: "• **मुथुपांडी राजा (पुरुष 65 किग्रा - रजत)**: मुथुपांडी राजा ने पुरुष 65 किलोग्राम वेटलिफ्टिंग स्पर्धा में रजत पदक जीतकर भारत की पदक संख्या 4 तक पहुँचाई।" }],
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
              ["**वेटलिफ्टिंग (Weightlifting)**", "1", "2", "0", "**3**"],
              ["**पैरा पावरलिफ्टिंग (Para Powerlifting)**", "0", "0", "1", "**1**"],
              ["**कुल भारत पदक तालिका (Total)**", "**1**", "**2**", "**1**", "**4**"]
            ]
          },
          {
            _key: "b3-h4", _type: "block", style: "h3",
            children: [{ _key: "sh4-4", _type: "span", text: "4. इन खिलाड़ियों से भी हैं पदक की उम्मीद (Upcoming Medal Contenders)" }],
          },
          {
            _key: "b3-12", _type: "block", style: "normal",
            children: [{ _key: "s3-12", _type: "span", text: "• **लवलीना बोरगोहैन (Boxing)**: महिला 75 किलोग्राम मुक्केबाजी स्पर्धा के क्वार्टरफाइनल में बाई मिलने के कारण **कम से कम कांस्य पदक पहले ही सुनिश्चित** कर चुकी हैं।" }],
          },
          {
            _key: "b3-13", _type: "block", style: "normal",
            children: [{ _key: "s3-13", _type: "span", text: "• **एथलेटिक्स स्टार्स**: गुरिंदरवीर सिंह, अनिमेष कुजूर, मुरली श्रीशंकर, तजिंदरपाल सिंह तूर, पारुल चौधरी एवं गुलवीर सिंह।" }],
          },
        ],
        bodyEn: [
          {
            _key: "b3-14", _type: "block", style: "normal",
            children: [{ _key: "s3-14", _type: "span", text: "Comprehensive winners table: Mirabai Chanu's 3rd consecutive Gold, Rishikanta Singh's Snatch CWG Record Silver, Jhandu Kumar's opening Bronze in Para Powerlifting, and Lovlina Borgohain's assured medal." }],
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
            children: [{ _key: "s4-6", _type: "span", text: "• **सर्वकालिक रिकॉर्ड**: भारत अब तक 18 संस्करणों में भाग लेकर **564 से अधिक पदक** जीत चुका है और ऑस्ट्रेलिया, इंग्लैंड व कनाडा के बाद इतिहास के सबसे सफल देशों में शामिल है।" }],
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
              { label: "मीराबाई चानू", value: "महिला 48 किग्रा में स्वर्ण (**190 किग्रा कुल भार**). [मीराबाई चानू जीवनी पढ़ें ➔](/current-affairs/mirabai-chanu-biography-cwg-2026-gold-medal-weightlifting)" },
              { label: "ऋषिकांत सिंह", value: "पुरुष 60 किग्रा में रजत (**स्नैच CWG रिकॉर्ड**)" },
              { label: "झांडू कुमार", value: "पैरा पावरलिफ्टिंग में कांस्य (**भारत का खाता खोला**)" },
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
        answer: "भारत ने अब तक कुल 4 पदक जीते हैं, जिनमें 1 स्वर्ण (मीराबाई चानू - वेटलिफ्टिंग), 2 रजत (ऋषिकांत सिंह व मुथुपांडी राजा - वेटलिफ्टिंग) और 1 कांस्य (झांडू कुमार - पैरा पावरलिफ्टिंग) शामिल हैं।",
        answerEn: "India has secured 4 medals (1 Gold, 2 Silver, 1 Bronze) so far in CWG 2026."
      },
      {
        question: "कॉमनवेल्थ गेम्स 2026 से किन प्रमुख खेलों को बाहर (Dropped Sports) कर दिया गया है?",
        questionEn: "Which major sports have been dropped from Commonwealth Games 2026?",
        answer: "ग्लासगो 2026 खेलों से 5 प्रमुख खेलों: **निशानेबाजी (Shooting), कुश्ती (Wrestling), बैडमिंटन (Badminton), हॉकी (Hockey), तथा टेबल टेनिस (Table Tennis)** को बाहर कर दिया गया है।",
        answerEn: "Shooting, Wrestling, Badminton, Hockey, and Table Tennis have been dropped from CWG 2026."
      },
      {
        question: "कॉमनवेल्थ गेम्स 2026 में भारत का पहला स्वर्ण पदक किसने जीता?",
        questionEn: "Who won India's first Gold medal at the Commonwealth Games 2026?",
        answer: "स्टार वेटलिफ्टर मीराबाई चानू ने महिला 48 किलोग्राम वेटलिफ्टिंग स्पर्धा में स्वर्ण पदक जीतकर भारत का पहला गोल्ड मेडल जीता। यह उनका लगातार तीसरा CWG स्वर्ण पदक है।",
        answerEn: "Mirabai Chanu won India's first Gold medal in the women's 48kg weightlifting event."
      },
      {
        question: "कॉमनवेल्थ गेम्स 2026 में भारतीय एथलीटों ने कितने भारवर्गों में हिस्सा लिया?",
        questionEn: "In how many weight categories are Indian weightlifters competing?",
        answer: "भारतीय भारोत्तोलक विभिन्न श्रेणियों (48kg, 60kg, 65kg आदि) में हिस्सा ले रहे हैं और अब तक 3 पदक जीत चुके हैं।",
        answerEn: "Indian weightlifters are competing in multiple categories and have won 3 medals so far."
      },
      {
        question: "कॉमनवेल्थ गेम्स 2026 कहाँ और कब तक आयोजित हो रहे हैं?",
        questionEn: "Where and until when are the Commonwealth Games 2026 taking place?",
        answer: "23वें कॉमनवेल्थ गेम्स 2026 स्कॉटलैंड के ग्लासगो शहर में 23 जुलाई से 2 अगस्त 2026 तक आयोजित हो रहे हैं।",
        answerEn: "Glasgow, Scotland is hosting CWG 2026 from July 23 to August 2, 2026."
      },
      {
        question: "ऋषिकांत सिंह ने कॉमनवेल्थ गेम्स 2026 में क्या नया रिकॉर्ड बनाया?",
        questionEn: "What new record did Rishikanta Singh set at CWG 2026?",
        answer: "ऋषिकांत सिंह ने पुरुष 60 किग्रा वेटलिफ्टिंग में स्नैच श्रेणी में नया कॉमनवेल्थ गेम्स रिकॉर्ड बनाते हुए रजत पदक हासिल किया।",
        answerEn: "Rishikanta Singh created a new CWG Snatch record in men's 60kg weightlifting while winning Silver."
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
        question: "कॉमनवेल्थ गेम्स 2026 (CWG 2026) में भारत के लिए पहला स्वर्ण पदक (Gold Medal) किस खिलाड़ी ने जीता?",
        questionEn: "Which athlete won India's first Gold medal at the Commonwealth Games 2026?",
        options: ["A. मीराबाई चानू", "B. ऋषिकांत सिंह", "C. मुथुपांडी राजा", "D. लवलीना बोरगोहैन"],
        optionsEn: ["A. Mirabai Chanu", "B. Rishikanta Singh", "C. Muthupandi Raja", "D. Lovlina Borgohain"],
        correctIndex: 0,
        explanation: "मीराबाई चानू ने महिला 48 किग्रा वेटलिफ्टिंग में स्वर्ण पदक जीतकर भारत को 2026 खेलों का पहला गोल्ड दिलाया।",
        explanationEn: "Mirabai Chanu won India's first Gold medal in women's 48kg weightlifting at CWG 2026."
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
        question: "कॉमनवेल्थ गेम्स 2026 में भारत का पहला पदक (कांस्य) जीतकर खाता खोलने वाले एथलीट कौन हैं?",
        questionEn: "Who won India's very first medal (Bronze) to open the medal tally at CWG 2026?",
        options: ["A. झांडू कुमार", "B. ऋषिकांत सिंह", "C. मुरली श्रीशंकर", "D. पारुल चौधरी"],
        optionsEn: ["A. Jhandu Kumar", "B. Rishikanta Singh", "C. Murali Sreeshankar", "D. Parul Chaudhary"],
        correctIndex: 0,
        explanation: "झांडू कुमार ने पुरुष हेवीवेट पैरा पावरलिफ्टिंग स्पर्धा में कांस्य पदक जीतकर भारत का खाता खोला।",
        explanationEn: "Jhandu Kumar won Bronze in Para Powerlifting to open India's medal account."
      },
      {
        question: "पुरुष 60 किग्रा वेटलिफ्टिंग में स्नैच में नया कॉमनवेल्थ गेम्स रिकॉर्ड बनाकर रजत पदक किसने जीता?",
        questionEn: "Who set a new CWG Snatch record while winning Silver in men's 60kg weightlifting?",
        options: ["A. ऋषिकांत सिंह", "B. मुथुपांडी राजा", "C. अच्युत शेवली", "D. सतीश शिवलिंगम"],
        optionsEn: ["A. Rishikanta Singh", "B. Muthupandi Raja", "C. Achinta Sheuli", "D. Sathish Sivalingam"],
        correctIndex: 0,
        explanation: "ऋषिकांत सिंह ने स्नैच श्रेणी में नया रिकॉर्ड बनाते हुए पुरुष 60 किग्रा में रजत पदक जीता।",
        explanationEn: "Rishikanta Singh set a new CWG Snatch record in men's 60kg weightlifting."
      },
      {
        question: "कॉमनवेल्थ गेम्स 2026 का आयोजन स्कॉटलैंड के किस शहर में किया जा रहा है?",
        questionEn: "Which Scottish city is hosting the Commonwealth Games 2026?",
        options: ["A. एडिनबर्ग", "B. ग्लासगो", "C. एबरडीन", "D. डंडी"],
        optionsEn: ["A. Edinburgh", "B. Glasgow", "C. Aberdeen", "D. Dundee"],
        correctIndex: 1,
        explanation: "23वें कॉमनवेल्थ गेम्स 2026 का आयोजन ग्लासगो, स्कॉटलैंड में 23 जुलाई से 2 अगस्त 2026 तक हो रहा है।",
        explanationEn: "Glasgow, Scotland is hosting CWG 2026."
      },
      {
        question: "कॉमनवेल्थ गेम्स में भारत का सर्वकालिक सर्वश्रेष्ठ प्रदर्शन किस वर्ष (101 पदक) रहा था?",
        questionEn: "In which year did India achieve its best ever CWG performance with 101 medals?",
        options: ["A. 2002 मैनचेस्टर", "B. 2010 नई दिल्ली", "C. 2018 गोल्ड कोस्ट", "D. 2022 बर्मिंघम"],
        optionsEn: ["A. 2002 Manchester", "B. 2010 New Delhi", "C. 2018 Gold Coast", "D. 2022 Birmingham"],
        correctIndex: 1,
        explanation: "भारत का सर्वश्रेष्ठ प्रदर्शन 2010 नई दिल्ली राष्ट्रमंडल खेलों में 38 स्वर्ण सहित 101 पदकों के साथ रहा था।",
        explanationEn: "India won 101 medals (38 Gold) at the 2010 New Delhi Games."
      },
      {
        question: "कॉमनवेल्थ गेम्स के इतिहास में भारत के लिए पहला स्वर्ण पदक 1958 में किसने जीता था?",
        questionEn: "Who won India's first ever CWG Gold medal in history at the 1958 Cardiff Games?",
        options: ["A. मिल्खा सिंह", "B. रशीद अनवर", "C. ध्यानचंद", "D. कपिल देव"],
        optionsEn: ["A. Milkha Singh", "B. Rashid Anwar", "C. Dhyan Chand", "D. Kapil Dev"],
        correctIndex: 0,
        explanation: "मिल्खा सिंह ने 1958 कार्डिफ खेलों में 440 यार्ड दौड़ में भारत का पहला स्वर्ण पदक जीता था।",
        explanationEn: "Milkha Singh won India's first Gold in 1958 Cardiff Games."
      },
      {
        question: "MPPSC मुख्य परीक्षा पाठ्यक्रम में खेल समसामयिकी (Sports GK) किस पेपर का अभिन्न अंग है?",
        questionEn: "In MPPSC Mains syllabus, Sports Current Affairs comes under which paper?",
        options: ["A. केवल गणित", "B. सामान्य अध्ययन Paper 1 एवं Paper 3", "C. केवल हिंदी", "D. केवल दर्शनशास्त्र"],
        optionsEn: ["A. Mathematics only", "B. General Studies Paper 1 & Paper 3", "C. Hindi only", "D. Philosophy only"],
        correctIndex: 1,
        explanation: "खेलकूद MPPSC प्रारम्भिक परीक्षा (Paper 1 GS) तथा मुख्य परीक्षा (Paper 1 व Paper 3) का अनिवार्य हिस्सा है।",
        explanationEn: "Sports GK is a key section in MPPSC Prelims Paper 1 GS and Mains Paper 1/3."
      }
    ]
  };

  console.log(`📝 Syncing CWG 2026 hub article ID "${article._id}" to Sanity CMS with Glasgow Medals Top Thumbnail...`);
  const res = await client.createOrReplace(article);
  console.log(`🎉 SUCCESS! Article uploaded & published in Sanity CMS. Document ID: ${res._id}`);
  console.log(`URL slug: ${res.slug.current}`);
}

main().catch((err) => {
  console.error("❌ Error uploading Commonwealth Games 2026 article:", err);
  process.exit(1);
});
