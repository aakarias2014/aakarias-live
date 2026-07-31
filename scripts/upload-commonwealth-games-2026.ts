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
  console.log("🚀 Starting upload process for CWG 2026 Medals Tally & Updates Article...");

  const publicBlogDir = path.resolve(process.cwd(), "public/images/blog");

  // 1. Mirabai Chanu Real Photo Asset
  const mirabaiPath = path.join(publicBlogDir, "mirabai_chanu_cwg_2026_gold_real.png");
  let assetMirabai;
  if (fs.existsSync(mirabaiPath)) {
    console.log("📸 Uploading Real Mirabai Chanu Photo to Sanity...");
    try {
      assetMirabai = await client.assets.upload("image", fs.createReadStream(mirabaiPath), {
        filename: "mirabai_chanu_cwg_2026_gold_real.png",
      });
      console.log(`✔ Uploaded Mirabai Photo. Asset ID: ${assetMirabai._id}`);
    } catch (e) {
      console.warn("⚠️ Image upload warning:", e);
    }
  }

  // 2. Lovepreet Singh Silver Photo Asset
  const lovepreetPath = path.join(publicBlogDir, "lovepreet-singh-cwg-2026-silver.png");
  let assetLovepreet;
  if (fs.existsSync(lovepreetPath)) {
    console.log("📸 Uploading Lovepreet Singh Silver Photo to Sanity...");
    try {
      assetLovepreet = await client.assets.upload("image", fs.createReadStream(lovepreetPath), {
        filename: "lovepreet-singh-cwg-2026-silver.png",
      });
      console.log(`✔ Uploaded Lovepreet Photo. Asset ID: ${assetLovepreet._id}`);
    } catch (e) {
      console.warn("⚠️ Image upload warning:", e);
    }
  }

  // 3. Seema Kaliramna Discus Throw Bronze Photo Asset
  const seemaPath = path.join(publicBlogDir, "seema-kaliramna-cwg-2026-bronze.png");
  let assetSeema;
  if (fs.existsSync(seemaPath)) {
    console.log("📸 Uploading Seema Kaliramna Bronze Photo to Sanity...");
    try {
      assetSeema = await client.assets.upload("image", fs.createReadStream(seemaPath), {
        filename: "seema-kaliramna-cwg-2026-bronze.png",
      });
      console.log(`✔ Uploaded Seema Photo. Asset ID: ${assetSeema._id}`);
    } catch (e) {
      console.warn("⚠️ Image upload warning:", e);
    }
  }

  const article = {
    _id: "ca-commonwealth-games-2026",
    _type: "currentAffairs",
    slug: { _type: "slug", current: "commonwealth-games-2026-updates-india-medal-tally" },
    title: "कॉमनवेल्थ गेम्स 2026 मेडल टैली (CWG 2026 Medal Tally): भारत के 17 पदक विजेता, Day 8 & Day 9 शेड्यूल, नीरज चोपड़ा व पूरी तालिका | MPPSC & UPSC",
    titleEn: "Commonwealth Games 2026 India Medals Tally & Rankings: 17 Winners List, Day 8 & Day 9 Schedule, Neeraj Chopra & Full Live Updates | MPPSC & UPSC",
    excerpt: "कॉमनवेल्थ गेम्स 2026 (ग्लासगो, स्कॉटलैंड) मेडल टैली: भारत की अद्यतन पदक तालिका (Medals Tally Table), कुल 17 पदक (3 स्वर्ण, 10 रजत, 4 कांस्य)। मीराबाई चानू, शर्मिला धनखड़ व दिलीप गावित का स्वर्ण, ऋषिकांत, मुथुपांडी, ज्ञानेश्वरी, सर्वेश, वल्लुरी अजय बाबू, हरजिंदर कौर, गुलवीर सिंह, मुरली श्रीशंकर, मोहम्मद बासिल व लवप्रीत सिंह का रजत, झंडू, बिंदियारानी, शिल्पा व सीमा कालीरामना का कांस्य। Day 8 & Day 9 नीरज चोपड़ा शेड्यूल व MPPSC/UPSC परीक्षा नोट्स।",
    excerptEn: "Live updates on Commonwealth Games 2026 (Glasgow, Scotland) Medal Tally & Rankings: India's full 17 medals table (3 Gold, 10 Silver, 4 Bronze), Dilip Gavit, Mirabai Chanu & Sharmila Gold, Lovepreet Singh & Sreeshankar Silver, Seema Kaliramna Bronze, Neeraj Chopra Day 9 schedule for MPPSC & UPSC exams.",
    ca_date: "2026-07-31",
    publishedAt: new Date().toISOString(),
    featured: true,
    readingTime: 14,
    keywords: [
      "Commonwealth Games 2026",
      "कॉमनवेल्थ गेम्स 2026",
      "glasgow commonwealth games 2026 medal tally",
      "Commonwealth Games 2026 India Medals Tally",
      "Commonwealth games 2026 neeraj",
      "Commonwealth games 2026 medal tally results",
      "Commonwealth games 2026 day 7",
      "Commonwealth games 2026 day 8",
      "Commonwealth games 2026 day 9 schedule",
      "Commonwealth games 2026 medal tally live",
      "Commonwealth Games medals 2026",
      "List of sports in Commonwealth Games 2026",
      "Commonwealth Games 2026 live",
      "Who won the silver medal in the Commonwealth Games 2026",
      "How many medals were won by India in the Commonwealth Games",
      "राष्ट्रमंडल खेलों में भारत ने कितने पदक जीते थे",
      "राष्ट्र मंडल खेलों 2026 में रजत पदक किसने जीता",
      "कॉमनवेल्थ गेम्स 2026 में भाला फेंक किसने जीता",
      "2026 win mirabai chanu",
      "mirabai chanu 2026 gold medal victory podium",
      "कॉमनवेल्थ गेम्स 2026 में भारत का शानदार प्रदर्शन",
      "कॉमनवेल्थ गेम्स 2026 मेडल टैली",
      "CWG 2026 Medal Winners List",
      "Lovepreet Singh Silver Medal CWG 2026",
      "Seema Kaliramna Discus Throw Bronze CWG 2026",
      "Dilip Gavit Gold Medal CWG 2026",
      "Mohammad Basil Silver Medal CWG 2026",
      "Murali Sreeshankar Silver Medal CWG 2026",
      "CWG 2026 dropped sports list",
      "कॉमनवेल्थ गेम्स 2026 से हटाए गए खेल",
      "लवप्रीत सिंह वेटलिफ्टिंग रजत",
      "सीमा कालीरामना डिस्कस थ्रो कांस्य",
      "स्कॉटलैंड ग्लासगो CWG 2026",
      "Sports Current Affairs 2026",
      "MPPSC Sports Notes"
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
    ...(assetMirabai ? {
      featuredImage: {
        _type: "image",
        asset: { _type: "reference", _ref: assetMirabai._id },
        alt: "Mirabai Chanu Gold Medal CWG 2026 Glasgow Weightlifting 48kg India 17 Medals Tally MPPSC UPSC Notes",
      }
    } : {}),

    /* ─── SECTIONS ──────────────────────────────────────────────── */
    sections: [
      {
        _key: "sec-overview-highlights",
        kind: "whyInNews",
        title: "चर्चा में क्यों? कॉमनवेल्थ गेम्स 2026 (Glasgow CWG Overview & Medal Tally)",
        titleEn: "Context & Overview of Commonwealth Games 2026 Medal Tally",
        body: [
          {
            _key: "b1-1", _type: "block", style: "normal",
            children: [{ _key: "s1-1", _type: "span", text: "23वें **कॉमनवेल्थ गेम्स 2026 (Glasgow 2026 Commonwealth Games)** का भव्य आयोजन **23 जुलाई से 2 अगस्त 2026** तक स्कॉटलैंड के **ग्लासगो** शहर में आयोजित किया जा रहा है। इस प्रतिष्ठित बहु-खेल प्रतियोगिता में भारत ने **122 खिलाड़ियों का दल** भेजा है, जो विभिन्न खेलों और पैरा स्पर्धाओं में देश का प्रतिनिधित्व कर रहे हैं।" }],
          },
          ...(assetMirabai ? [{
            _type: "image",
            asset: { _type: "reference", _ref: assetMirabai._id },
            alt: "Mirabai Chanu Gold Medal victory on podium Glasgow CWG 2026 with Indian tricolor flag",
            caption: "मीराबाई चानू: ग्लासगो 2026 राष्ट्रमंडल खेलों में 48 किग्रा भारोत्तोलन में 190 किग्रा भार उठाकर ऐतिहासिक स्वर्ण पदक जीतते हुए",
          }] : []),
          {
            _key: "b1-2", _type: "block", style: "normal",
            children: [{ _key: "s1-2", _type: "span", text: "भारतीय खिलाड़ियों ने लगातार शानदार प्रदर्शन करते हुए **3 स्वर्ण, 10 रजत और 4 कांस्य** सहित कुल **17 पदक (17 Medals Tally)** अपने नाम कर लिए हैं। मीराबाई चानू (वेटलिफ्टिंग 48kg), शर्मिला (पैरा-एथलेटिक्स शॉट पुट F57) एवं दिलीप गावित (पैरा-एथलेटिक्स मेंस 100m T47) ने स्वर्ण पदक जीतकर भारत का सिर गर्व से ऊँचा किया है। वहीं आठवें दिन **लवप्रीत सिंह** ने पुरुष +110 किग्रा वेटलिफ्टिंग में **रजत पदक** तथा **सीमा कालीरामना** ने महिला डिस्कस थ्रो (एथलेटिक्स) में **कांस्य पदक** हासिल कर भारत की पदक संख्या को 17 तक पहुँचा दिया है।" }],
          },
          {
            _key: "b1-h1", _type: "block", style: "h3",
            children: [{ _key: "sh1-1", _type: "span", text: "मुख्य बिंदु तालिका (CWG 2026 Medal Tally & Highlights Table)" }],
          },
          {
            _type: "table",
            caption: "कॉमनवेल्थ गेम्स 2026: एक नज़र में (Medal Tally Highlights)",
            headers: ["विवरण (Parameter)", "महत्वपूर्ण जानकारी (Details)"],
            rows: [
              ["**आयोजन (Event)**", "कॉमनवेल्थ गेम्स 2026 (23वां संस्करण)"],
              ["**मेजबान शहर (Host City)**", "ग्लासगो, स्कॉटलैंड (United Kingdom)"],
              ["**आयोजन तिथि (Dates)**", "23 जुलाई – 2 अगस्त 2026"],
              ["**भारतीय दल (Indian Contingent)**", "122 खिलाड़ी (8 नियमित + 5 पैरा खेल)"],
              ["**भारत के कुल पदक (Total Medals)**", "**17 (3 स्वर्ण, 10 रजत, 4 कांस्य)**"],
              ["**मेडल टैली स्थिति (Medal Rank)**", "**8वें से 10वें स्थान पर** (ऑस्ट्रेलिया शीर्ष पर)"]
            ]
          }
        ],
      },

      {
        _key: "sec-day8-day9-schedule",
        kind: "analysis",
        title: "CWG 2026 Day 8 & Day 9 लाइव शेड्यूल: नीरज चोपड़ा एवं प्रमुख भारतीय मुकाबले",
        titleEn: "CWG 2026 Day 8 & Day 9 Live Schedule & Neeraj Chopra Action",
        body: [
          {
            _key: "b-day-h1", _type: "block", style: "h3",
            children: [{ _key: "sh-d1", _type: "span", text: "1. Day 8 (30 जुलाई) के परिणाम: लवप्रीत का सिल्वर एवं सीमा का कांस्य" }],
          },
          {
            _key: "b-day-1", _type: "block", style: "normal",
            children: [{ _key: "s-d1", _type: "span", text: "• **लवप्रीत सिंह (वेटलिफ्टिंग)**: पुरुष +110 किग्रा भारी भारोत्तोलन श्रेणी में लवप्रीत सिंह ने शानदार लिफ्ट के साथ भारत के लिए 10वां रजत पदक दर्ज किया।" }],
          },
          ...(assetLovepreet ? [{
            _type: "image",
            asset: { _type: "reference", _ref: assetLovepreet._id },
            alt: "Lovepreet Singh Men +110kg Weightlifting Silver Medal Glasgow CWG 2026",
            caption: "लवप्रीत सिंह: कॉमनवेल्थ गेम्स 2026 पुरुष +110 किग्रा भारोत्तोलन में रजत पदक जीतने के बाद",
          }] : []),
          {
            _key: "b-day-2", _type: "block", style: "normal",
            children: [{ _key: "s-d2", _type: "span", text: "• **सीमा कालीरामना (एथलेटिक्स)**: महिला डिस्कस थ्रो (चक्का फेंक) में सीमा कालीरामना ने कांस्य पदक जीतकर भारत की कुल पदक संख्या 17 कर दी।" }],
          },
          ...(assetSeema ? [{
            _type: "image",
            asset: { _type: "reference", _ref: assetSeema._id },
            alt: "Seema Kaliramna Women Discus Throw Bronze Medal Glasgow CWG 2026",
            caption: "सीमा कालीरामना: ग्लासगो 2026 में महिला डिस्कस थ्रो में शानदार प्रदर्शन कर कांस्य पदक हासिल करते हुए",
          }] : []),
          {
            _key: "b-day-h2", _type: "block", style: "h3",
            children: [{ _key: "sh-d2", _type: "span", text: "2. Day 9 (31 जुलाई - 1 अगस्त) मुख्य मुकाबले व पदक दावेदार" }],
          },
          {
            _key: "b-day-3", _type: "block", style: "normal",
            children: [{ _key: "s-d3", _type: "span", text: "• 🥇 **नीरज चोपड़ा (Neeraj Chopra - Javelin Throw)**: टोक्यो ओलंपिक व विश्व चैंपियन नीरज चोपड़ा भाला फेंक स्पर्धा के फाइनल्स में भारत के सबसे बड़े स्वर्ण पदक दावेदार हैं।" }],
          },
          {
            _key: "b-day-4", _type: "block", style: "normal",
            children: [{ _key: "s-d4", _type: "span", text: "• 🥊 **लवलीना बोरगोहैन (Lovlina Borgohain - Boxing)**: महिला 75 किग्रा मुक्केबाजी के सेमिफाइनल व फाइनल मुकाबलों में स्वर्ण पदक की दौड़ में।" }],
          },
          {
            _key: "b-day-5", _type: "block", style: "normal",
            children: [{ _key: "s-d5", _type: "span", text: "• 🏃‍♂️ **तेजस्विन शंकर व पारुल चौधरी**: हाई जंप व 3000m स्टीपलचेस स्पर्धाओं में पदक हेतु ट्रैक पर।" }],
          }
        ],
      },

      {
        _key: "sec-sports-disciplines",
        kind: "background",
        title: "ग्लासगो 2026: शामिल 10 खेल एवं बाहर किए गए 5 प्रमुख खेल (Dropped Sports)",
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
          }
        ],
      },

      {
        _key: "sec-winners-table-details",
        kind: "keyHighlights",
        title: "कॉमनवेल्थ गेम्स 2026: भारतीय पदक विजेता (Medal Winners Table)",
        titleEn: "CWG 2026 India Medal Winners List & Table",
        body: [
          {
            _key: "b3-h1", _type: "block", style: "h3",
            children: [{ _key: "sh3-1", _type: "span", text: "1. पदक विजेताओं की आधिकारिक तालिका (Medal Winners List)" }],
          },
          {
            _type: "table",
            caption: "कॉमनवेल्थ गेम्स 2026: भारतीय पदक विजेता (17 Medals Tally)",
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
              ["14", "[**दिलीप गावित (Dilip Gavit)**](/current-affairs/dilip-gavit-biography-cwg-2026-gold-medal-para-athletics)", "मेंस 100 मीटर T47", "पैरा एथलेटिक्स", "**गोल्ड (Gold)**"],
              ["15", "**मोहम्मद बासिल**", "मेंस 100 मीटर T47", "पैरा एथलेटिक्स", "**सिल्वर (Silver)**"],
              ["16", "**लवप्रीत सिंह**", "मेंस +110 किग्रा", "वेटलिफ्टिंग", "**सिल्वर (Silver)**"],
              ["17", "**सीमा कालीरामना**", "वूमेंस डिस्कस थ्रो", "एथलेटिक्स", "**ब्रॉन्ज (Bronze)**"]
            ]
          },
          {
            _key: "b3-h2", _type: "block", style: "h3",
            children: [{ _key: "sh3-2", _type: "span", text: "2. भारतीय पदक विजेताओं का व्यक्तिगत प्रदर्शन" }],
          },
          {
            _key: "b3-1", _type: "block", style: "normal",
            children: [{ _key: "s3-1", _type: "span", text: "• **ऋषिकांत सिंह (मेंस 60किग्रा - सिल्वर)**: पुरुष 60 किग्रा वेटलिफ्टिंग स्पर्धा में स्नैच में नया कॉमनवेल्थ गेम्स रिकॉर्ड बनाते हुए रजत पदक हासिल किया।" }],
          },
          {
            _key: "b3-2", _type: "block", style: "normal",
            children: [{ _key: "s3-2", _type: "span", text: "• **झंडू कुमार (मेंस हेविवेट - ब्रॉन्ज)**: मेंस हेविवेट पैरा पावरलिफ्टिंग स्पर्धा में कांस्य पदक जीतकर भारत का पहला पदक दर्ज किया।" }],
          },
          {
            _key: "b3-3", _type: "block", style: "normal",
            children: [{ _key: "s3-3", _type: "span", text: "• **मीराबाई चानू (वूमेंस 48किग्रा - गोल्ड)**: 190 किग्रा भार उठाकर लगातार तीसरा CWG स्वर्ण पदक अपने नाम किया।" }],
          },
          {
            _key: "b3-4", _type: "block", style: "normal",
            children: [{ _key: "s3-4", _type: "span", text: "• **मुथुपांडी राजा (मेंस 65किग्रा - सिल्वर)**: मेंस 65 किग्रा वेटलिफ्टिंग में रजत पदक प्राप्त किया।" }],
          },
          {
            _key: "b3-5", _type: "block", style: "normal",
            children: [{ _key: "s3-5", _type: "span", text: "• **ज्ञानेश्वरी यादव (वूमेंस 53किग्रा - सिल्वर)**: वूमेंस 53 किग्रा वेटलिफ्टिंग स्पर्धा में रजत पदक जीता।" }],
          },
          {
            _key: "b3-6", _type: "block", style: "normal",
            children: [{ _key: "s3-6", _type: "span", text: "• **बिंदियारानी देवी (वूमेंस 58किग्रा - ब्रॉन्ज)**: वूमेंस 58 किग्रा वेटलिफ्टिंग में कांस्य पदक जीता।" }],
          },
          {
            _key: "b3-7", _type: "block", style: "normal",
            children: [{ _key: "s3-7", _type: "span", text: "• **शर्मिला धनखड़ (वूमेंस शॉट पुट F57 - गोल्ड)**: पैरा-एथलेटिक्स शॉट पुट F57 स्पर्धा में 9.81m थ्रो के साथ स्वर्ण पदक जीता।" }],
          },
          {
            _key: "b3-8", _type: "block", style: "normal",
            children: [{ _key: "s3-8", _type: "span", text: "• **सर्वेश कुशारे (मेंस हाई जंप - सिल्वर)**: मेंस हाई जंप एथलेटिक्स में रजत पदक हासिल किया।" }],
          },
          {
            _key: "b3-9", _type: "block", style: "normal",
            children: [{ _key: "s3-9", _type: "span", text: "• **शिल्पा के. शायला (वूमेंस शॉट पुट F57 - ब्रॉन्ज)**: महिला शॉट पुट F57 स्पर्धा में कांस्य पदक जीता।" }],
          },
          {
            _key: "b3-10", _type: "block", style: "normal",
            children: [{ _key: "s3-10", _type: "span", text: "• **वल्लुरी अजय बाबू (मेंस 79किग्रा - सिल्वर)**: मेंस 79 किग्रा वेटलिफ्टिंग में रजत पदक जीता।" }],
          },
          {
            _key: "b3-11", _type: "block", style: "normal",
            children: [{ _key: "s3-11", _type: "span", text: "• **हरजिंदर कौर (वूमेंस 69किग्रा - सिल्वर)**: महिला 69 किग्रा वेटलिफ्टिंग में रजत पदक प्राप्त किया।" }],
          },
          {
            _key: "b3-12", _type: "block", style: "normal",
            children: [{ _key: "s3-12", _type: "span", text: "• **गुलवीर सिंह (मेंस 10000मी - सिल्वर)**: पुरुष 10,000 मीटर लंबी दूरी दौड़ में रजत पदक जीता।" }],
          },
          {
            _key: "b3-13", _type: "block", style: "normal",
            children: [{ _key: "s3-13", _type: "span", text: "• **मुरली श्रीशंकर (मेंस लॉन्ग जंप - सिल्वर)**: पुरुष लंबी कूद एथलेटिक्स में रजत पदक जीता।" }],
          },
          {
            _key: "b3-14", _type: "block", style: "normal",
            children: [{ _key: "s3-14", _type: "span", text: "• **दिलीप गावित (मेंस 100m T47 - गोल्ड)**: मेंस 100 मीटर T47 पैरा एथलेटिक्स स्प्रिंट में 10.71s गेम्स रिकॉर्ड के साथ स्वर्ण पदक जीता। [दिलीप गावित की सम्पूर्ण जीवनी पढ़ें ➔](/current-affairs/dilip-gavit-biography-cwg-2026-gold-medal-para-athletics)" }],
          },
          {
            _key: "b3-15", _type: "block", style: "normal",
            children: [{ _key: "s3-15", _type: "span", text: "• **मोहम्मद बासिल (मेंस 100m T47 - सिल्वर)**: मेंस 100 मीटर T47 पैरा एथलेटिक्स में 10.89s समय के साथ रजत पदक जीता।" }],
          },
          {
            _key: "b3-16", _type: "block", style: "normal",
            children: [{ _key: "s3-16", _type: "span", text: "• **लवप्रीत सिंह (मेंस +110किग्रा - सिल्वर)**: पुरुष +110 किग्रा भारोत्तोलन (वेटलिफ्टिंग) स्पर्धा में 10वां रजत पदक जीता।" }],
          },
          {
            _key: "b3-17", _type: "block", style: "normal",
            children: [{ _key: "s3-17", _type: "span", text: "• **सीमा कालीरामना (वूमेंस डिस्कस थ्रो - ब्रॉन्ज)**: महिला डिस्कस थ्रो (चक्का फेंक) एथलेटिक्स स्पर्धा में कांस्य पदक हासिल किया।" }],
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
              ["**वेटलिफ्टिंग (Weightlifting)**", "1", "6", "1", "**8**"],
              ["**पैरा-एथलेटिक्स (Para Athletics)**", "2", "1", "1", "**4**"],
              ["**एथलेटिक्स (Athletics)**", "0", "3", "1", "**4**"],
              ["**पैरा पावरलिफ्टिंग (Para Powerlifting)**", "0", "0", "1", "**1**"],
              ["**कुल भारत पदक तालिका (Total)**", "**3**", "**10**", "**4**", "**17**"]
            ]
          }
        ],
      },

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
            children: [{ _key: "s4-1", _type: "span", text: "• **पहला संस्करण (1930)**: पहला कॉमनवेल्थ गेम्स 1930 में कनाडा के **हैमिल्टन** शहर में आयोजित हुआ था।" }],
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
            children: [{ _key: "s4-5", _type: "span", text: "• **2010 नई दिल्ली**: भारत ने 38 स्वर्ण, 27 रजत, 36 कांस्य सहित 101 पदक जीतकर 2nd स्थान प्राप्त किया था।" }],
          }
        ],
      },

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
              { label: "भारत के कुल पदक", value: "**17 पदक (3 स्वर्ण, 10 रजत, 4 कांस्य)**" },
              { label: "गोल्ड मेडलिस्ट", value: "**मीराबाई चानू, शर्मिला, दिलीप गावित**" },
              { label: "सिल्वर मेडलिस्ट (10)", value: "**ऋषिकांत, मुथुपांडी, ज्ञानेश्वरी, सर्वेश, वल्लुरी अजय बाबू, हरजिंदर कौर, गुलवीर सिंह, मुरली श्रीशंकर, मोहम्मद बासिल, लवप्रीत सिंह**" },
              { label: "ब्रॉन्ज मेडलिस्ट (4)", value: "**झंडू कुमार, बिंदियारानी देवी, शिल्पा के. शायला, सीमा कालीरामना**" },
            ]
          }
        ],
      }
    ],

    faqs: [
      {
        question: "कॉमनवेल्थ गेम्स 2026 में भारत ने अब तक कुल कितने पदक जीते हैं?",
        answer: "भारत ने कॉमनवेल्थ गेम्स 2026 (ग्लासगो) में अब तक कुल 17 पदक जीते हैं, जिनमें 3 स्वर्ण (मीराबाई चानू, शर्मिला, दिलीप गावित), 10 रजत (ऋषिकांत, मुथुपांडी, ज्ञानेश्वरी, सर्वेश, वल्लुरी अजय बाबू, हरजिंदर कौर, गुलवीर सिंह, मुरली श्रीशंकर, मोहम्मद बासिल, लवप्रीत सिंह) और 4 कांस्य (झंडू कुमार, बिंदियारानी देवी, शिल्पा के. शायला, सीमा कालीरामना) शामिल हैं।"
      },
      {
        question: "राष्ट्र मंडल खेलों 2026 में भारत के लिए रजत पदक (Silver Medals) किसने जीते हैं?",
        answer: "भारत के लिए 10 रजत पदक जीते गए हैं: ऋषिकांत सिंह (वेटलिफ्टिंग), मुथुपांडी राजा (वेटलिफ्टिंग), ज्ञानेश्वरी यादव (वेटलिफ्टिंग), सर्वेश कुशारे (हाई जंप), वल्लुरी अजय बाबू (वेटलिफ्टिंग), हरजिंदर कौर (वेटलिफ्टिंग), गुलवीर सिंह (10000m दौड़), मुरली श्रीशंकर (लॉन्ग जंप), मोहम्मद बासिल (100m T47) एवं लवप्रीत सिंह (वेटलिफ्टिंग +110kg)।"
      },
      {
        question: "कॉमनवेल्थ गेम्स 2026 में भाला फेंक (Javelin Throw - नीरज चोपड़ा) का शेड्यूल क्या है?",
        answer: "टोक्यो ओलंपिक व विश्व चैंपियन नीरज चोपड़ा कॉमनवेल्थ गेम्स 2026 के एथलेटिक्स भाला फेंक (Javelin Throw) स्पर्धा में भारत के मुख्य स्वर्ण पदक दावेदार हैं, जिनका मुकाबला CWG 2026 के डे 9 (Day 9) शेड्यूल्ड मुकाबलों में आयोजित हो रहा है।"
      },
      {
        question: "कॉमनवेल्थ गेम्स 2026 Day 8 एवं Day 9 में भारत का शेड्यूल और परिणाम क्या रहे?",
        answer: "Day 8 में लवप्रीत सिंह (वेटलिफ्टिंग) ने रजत तथा सीमा कालीरामना (डिस्कस थ्रो) ने कांस्य पदक जीता। Day 9 में नीरज चोपड़ा (भाला फेंक), लवलीना बोरगोहैन (बॉक्सिंग सेमिफाइनल/फाइनल), तेजस्विन शंकर (हाई जंप) और पारुल चौधरी (स्टीपलचेस) के मुख्य मुकाबले हैं।"
      },
      {
        question: "कॉमनवेल्थ गेम्स 2026 में 100m T47 पैरा एथलेटिक्स में स्वर्ण व रजत पदक किसने जीते?",
        answer: "पुरुष 100 मीटर T47 पैरा एथलेटिक्स में दिलीप गावित ने 10.71 सेकंड के गेम्स रिकॉर्ड के साथ स्वर्ण पदक (Gold) तथा मोहम्मद बासिल ने 10.89 सेकंड के साथ रजत पदक (Silver) जीतकर भारत को ऐतिहासिक 1-2 पोडियम फिनिश दिलाई।"
      },
      {
        question: "कॉमनवेल्थ गेम्स 2026 से किन 5 प्रमुख खेलों को बाहर (Dropped Sports) किया गया है?",
        answer: "ग्लासगो 2026 राष्ट्रमंडल खेलों से निशानेबाजी (Shooting), कुश्ती (Wrestling), बैडमिंटन (Badminton), हॉकी (Hockey) तथा टेबल टेनिस (Table Tennis) को बाहर किया गया है।"
      },
      {
        question: "कॉमनवेल्थ गेम्स में भारत का अब तक का सर्वश्रेष्ठ प्रदर्शन कौन-सा रहा है?",
        answer: "भारत का सर्वश्रेष्ठ प्रदर्शन 2010 नई दिल्ली राष्ट्रमंडल खेलों में रहा, जहाँ भारत ने 38 स्वर्ण, 27 रजत और 36 कांस्य सहित रिकॉर्ड 101 पदक जीतकर पदक तालिका में 2nd स्थान प्राप्त किया था।"
      },
      {
        question: "MPPSC परीक्षा में खेल समसामयिकी (Sports Current Affairs) का क्या महत्व है?",
        answer: "MPPSC प्रारम्भिक परीक्षा (Paper 1 GS Unit-5) तथा मुख्य परीक्षा में राष्ट्रीय-अंतरराष्ट्रीय पदक विजेताओं, रिकॉर्ड्स, स्पर्धाओं और पैरा एथलीटों से 4-6 अंक के प्रश्न सीधे पूछे जाते हैं।"
      }
    ],

    mcqs: [
      {
        question: "कॉमनवेल्थ गेम्स 2026 (CWG 2026) में भारत ने अब तक कुल कितने पदक (Medals) जीते हैं?",
        options: ["A. 12 पदक", "B. 15 पदक", "C. 17 पदक (3 स्वर्ण, 10 रजत, 4 कांस्य)", "D. 20 पदक"],
        correctIndex: 2,
        explanation: "भारत ने CWG 2026 में 3 स्वर्ण, 10 रजत और 4 कांस्य सहित कुल 17 पदक जीत लिए हैं।"
      },
      {
        question: "कॉमनवेल्थ गेम्स 2026 में भाला फेंक (Javelin Throw) स्पर्धा में भारत के मुख्य स्वर्ण पदक दावेदार कौन हैं?",
        options: ["A. नीरज चोपड़ा", "B. किशोर जेना", "C. शिवपाल सिंह", "D. सुमित अंतिल"],
        correctIndex: 0,
        explanation: "ओलंपिक व विश्व चैंपियन नीरज चोपड़ा भाला फेंक स्पर्धा में भारत के प्रमुख स्वर्ण पदक दावेदार हैं।"
      },
      {
        question: "कॉमनवेल्थ गेम्स 2026 में पुरुष +110 किग्रा भारोत्तोलन (वेटलिफ्टिंग) स्पर्धा में रजत पदक किस भारतीय खिलाड़ी ने जीता?",
        options: ["A. लवप्रीत सिंह", "B. गुरुदीप सिंह", "C. विकास ठाकुर", "D. प्रदीप सिंह"],
        correctIndex: 0,
        explanation: "लवप्रीत सिंह ने पुरुष +110 किग्रा भारोत्तोलन में शानदार प्रदर्शन करते हुए रजत पदक जीता।"
      },
      {
        question: "कॉमनवेल्थ गेम्स 2026 में महिला डिस्कस थ्रो (Discus Throw) एथलेटिक्स स्पर्धा में कांस्य पदक किस भारतीय खिलाड़ी ने जीता?",
        options: ["A. सीमा कालीरामना", "B. कमलप्रीत कौर", "C. अनु रानी", "D. मंजू बाला"],
        correctIndex: 0,
        explanation: "सीमा कालीरामना ने महिला डिस्कस थ्रो स्पर्धा में कांस्य पदक जीता और भारत के पदकों की संख्या 17 तक पहुँचाई।"
      },
      {
        question: "कॉमनवेल्थ गेम्स 2026 में पुरुष 100 मीटर T47 (पैरा एथलेटिक्स) स्पर्धा में स्वर्ण पदक किस भारतीय खिलाड़ी ने जीता?",
        options: ["A. दिलीप गावित", "B. मोहम्मद बासिल", "C. सुमित अंतिल", "D. निशाद कुमार"],
        correctIndex: 0,
        explanation: "दिलीप गावित ने पुरुष 100 मीटर T47 पैरा एथलेटिक्स में 10.71s गेम्स रिकॉर्ड के साथ स्वर्ण पदक तथा मोहम्मद बासिल ने रजत पदक जीता।"
      },
      {
        question: "कॉमनवेल्थ गेम्स 2026 में पुरुष लॉन्ग जंप (लंबी कूद) एथलेटिक्स स्पर्धा में रजत पदक किस भारतीय एथलीट ने जीता?",
        options: ["A. मुरली श्रीशंकर", "B. सर्वेश कुशारे", "C. अविनाश साबले", "D. तेजस्विन शंकर"],
        correctIndex: 0,
        explanation: "मुरली श्रीशंकर ने पुरुष लॉन्ग जंप एथलेटिक्स स्पर्धा में रजत पदक हासिल किया।"
      },
      {
        question: "ग्लासगो राष्ट्रमंडल खेल 2026 से किस प्रमुख खेल को बाहर (Dropped) कर दिया गया है?",
        options: ["A. निशानेबाजी एवं कुश्ती", "B. वेटलिफ्टिंग", "C. एथलेटिक्स", "D. जूडो"],
        correctIndex: 0,
        explanation: "निशानेबाजी, कुश्ती, बैडमिंटन, हॉकी एवं टेबल टेनिस को 2026 खेलों से बाहर रखा गया है।"
      },
      {
        question: "कॉमनवेल्थ गेम्स 2026 में भारत को वेटलिफ्टिंग (भारोत्तोलन) खेल से कुल कितने पदक प्राप्त हुए हैं?",
        options: ["A. 5 पदक", "B. 7 पदक", "C. 8 पदक (1 स्वर्ण, 6 रजत, 1 कांस्य)", "D. 10 पदक"],
        correctIndex: 2,
        explanation: "भारत को वेटलिफ्टिंग से कुल 8 पदक प्राप्त हुए हैं।"
      }
    ]
  };

  console.log(`📝 Uploading CWG 2026 article ID "${article._id}" to Sanity CMS...`);
  try {
    const res = await client.createOrReplace(article);
    console.log(`🎉 SUCCESS! Article uploaded & published in Sanity CMS. Document ID: ${res._id}`);
    console.log(`URL slug: ${res.slug.current}`);
  } catch (err) {
    console.error("❌ Error uploading CWG 2026 article to Sanity:", err);
  }
}

main().catch((err) => {
  console.error("❌ Error executing CWG 2026 upload script:", err);
  process.exit(1);
});
