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

  // 1. 5 Gold Medals Thumbnail Image Asset
  const thumbPath = path.join(publicBlogDir, "cwg_2026_5_gold_medals_thumbnail.jpg");
  let assetThumb;
  if (fs.existsSync(thumbPath)) {
    console.log("📸 Uploading 5 Gold Medals Thumbnail Photo to Sanity...");
    try {
      assetThumb = await client.assets.upload("image", fs.createReadStream(thumbPath), {
        filename: "cwg_2026_5_gold_medals_thumbnail.jpg",
      });
      console.log(`✔ Uploaded Thumbnail Photo. Asset ID: ${assetThumb._id}`);
    } catch (e) {
      console.warn("⚠️ Image upload warning:", e);
    }
  }

  // 2. Medals Tally Banner Asset
  const tallyBannerPath = path.join(publicBlogDir, "cwg_2026_india_medals_tally_banner.png");
  let assetTallyBanner;
  if (fs.existsSync(tallyBannerPath)) {
    console.log("📸 Uploading Medals Tally Banner Photo to Sanity...");
    try {
      assetTallyBanner = await client.assets.upload("image", fs.createReadStream(tallyBannerPath), {
        filename: "cwg_2026_india_medals_tally_banner.png",
      });
      console.log(`✔ Uploaded Tally Banner Photo. Asset ID: ${assetTallyBanner._id}`);
    } catch (e) {
      console.warn("⚠️ Image upload warning:", e);
    }
  }

  // 3. Mirabai Chanu Real Photo Asset
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

  // 4. Lovepreet Singh Silver Photo Asset
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

  // 5. Seema Kaliramna Discus Throw Bronze Photo Asset
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
    title: "कॉमनवेल्थ गेम्स 2026 मेडल टैली (CWG 2026 Live Medal Table): भारत के 23 पदक विजेता (5 स्वर्ण, 12 रजत, 6 कांस्य), नीरज चोपड़ा, जूडो व पूरी लिस्ट | MPPSC & UPSC",
    titleEn: "Commonwealth Games 2026 India Medals Tally & Winners List: 23 Medals (5 Gold, 12 Silver, 6 Bronze), Neeraj Chopra, Day 9 Live Standings | MPPSC & UPSC",
    excerpt: "कॉमनवेल्थ गेम्स 2026 (Glasgow CWG 2026) मेडल टैली लाइव: भारत ने 5 स्वर्ण, 12 रजत और 6 कांस्य सहित कुल 23 पदक जीत लिए हैं (10वां स्थान)। अस्मिता डे व हर्ष सिंह (जूडो गोल्ड), नीरज चोपड़ा व यामिनी मौर्या (रजत), तेजस्विन शंकर व यश वीर सिंह (कांस्य)। देखें भारतीय विजेताओं की पूरी लिस्ट, अपडेटेड मेडल तालिका व MPPSC/UPSC नोट्स।",
    excerptEn: "Glasgow Commonwealth Games 2026 India Medals Tally & Full Winners List: India standings after Day 9 with 23 medals (5 Gold, 12 Silver, 6 Bronze). Asmita Dey & Harsh Singh (Judo Gold), Neeraj Chopra & Yamini Mourya (Silver), Tejaswin Shankar & Yash Veer Singh (Bronze). Complete medal table, schedule & MPPSC/UPSC study notes.",
    ca_date: "2026-08-01",
    publishedAt: "2026-08-01T07:45:00.000Z",
    featured: true,
    readingTime: 14,
    keywords: [
      "Commonwealth Games 2026",
      "कॉमनवेल्थ गेम्स 2026",
      "glasgow commonwealth games 2026 medal tally",
      "Commonwealth Games 2026 India Medals Tally",
      "Commonwealth games 2026 neeraj",
      "Commonwealth games 2026 javelin gold medal",
      "Commonwealth games 2026 medal tally time",
      "Commonwealth games 2026 medal tally results",
      "Commonwealth games 2026 medal tally live",
      "Glasgow commonwealth games 2026 medal tally",
      "Glasgow Commonwealth Games medals",
      "Glasgow 2026 news",
      "India wins six medals on day nine of Commonwealth Games 2026",
      "CWG 2026 Day 9 Medal Table",
      "India 10th with 5 Gold",
      "Commonwealth Games 2026 India medals tally and winners list",
      "CWG 2026 Medal Race Update",
      "Who won the silver medal in the Commonwealth Games 2026",
      "How many medals were won by India in the Commonwealth Games",
      "कॉमनवेल्थ गेम्स 2026 में भारत ने कितने पदक जीते हैं",
      "राष्ट्रमंडल खेलों 2026 में भारत की मेडल तालिका",
      "Asmita Dey Judo Gold Medal CWG 2026",
      "Harsh Singh Judo Gold Medal CWG 2026",
      "Yamini Mourya Judo Silver Medal",
      "Neeraj Chopra Javelin Throw Silver CWG 2026",
      "Tejaswin Shankar Decathlon Bronze CWG 2026",
      "Yash Veer Singh Javelin Throw Bronze CWG 2026",
      "Mirabai Chanu Gold Medal CWG 2026",
      "Lovepreet Singh Weightlifting Silver",
      "Seema Kaliramna Discus Throw Bronze",
      "CWG 2026 Medal Winners List PDF",
      "CWG 2026 dropped sports list",
      "कॉमनवेल्थ गेम्स 2026 से हटाए गए खेल",
      "MPPSC Current Affairs 2026 Sports Notes",
      "UPSC Sports Current Affairs 2026"
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
    ...(assetThumb ? {
      featuredImage: {
        _type: "image",
        asset: { _type: "reference", _ref: assetThumb._id },
        alt: "5 स्वर्ण भारत का शानदार प्रदर्शन! कॉमनवेल्थ गेम्स 2026: भारतीय खिलाड़ियों का ऐतिहासिक जलवा - मीराबाई चानू, शर्मिला धनखड़, दिलीप गावित, अस्मिता डे और हर्ष सिंह",
        caption: "कॉमनवेल्थ गेम्स 2026: भारत के 5 स्वर्ण पदक विजेता एथलीटों का ऐतिहासिक जलवा (मीराबाई चानू, शर्मिला धनखड़, दिलीप गावित, अस्मिता डे एवं हर्ष सिंह)",
      }
    } : (assetMirabai ? {
      featuredImage: {
        _type: "image",
        asset: { _type: "reference", _ref: assetMirabai._id },
        alt: "Mirabai Chanu Gold Medal CWG 2026 Glasgow Weightlifting 48kg India 23 Medals Tally MPPSC UPSC Notes",
      }
    } : {})),

    /* ─── SECTIONS ──────────────────────────────────────────────── */
    sections: [
      {
        _key: "sec-overview-highlights",
        kind: "whyInNews",
        title: "चर्चा में क्यों? कॉमनवेल्थ गेम्स 2026 (Glasgow CWG Overview & Medal Tally)",
        titleEn: "Context & Overview of Commonwealth Games 2026 Medal Tally",
        body: [
          ...(assetThumb ? [{
            _key: "b1-img-gold-banner",
            _type: "image",
            asset: { _type: "reference", _ref: assetThumb._id },
            alt: "5 स्वर्ण भारत का शानदार प्रदर्शन! कॉमनवेल्थ गेम्स 2026: भारतीय खिलाड़ियों का ऐतिहासिक जलवा - मीराबाई चानू, शर्मिला धनखड़, दिलीप गावित, अस्मिता डे और हर्ष सिंह",
            caption: "कॉमनवेल्थ गेम्स 2026: भारत के 5 स्वर्ण पदक विजेता एथलीटों का ऐतिहासिक जलवा (मीराबाई चानू, शर्मिला धनखड़, दिलीप गावित, अस्मिता डे एवं हर्ष सिंह)",
          }] : []),
          {
            _key: "b1-1", _type: "block", style: "normal",
            children: [{
              _key: "s1-1",
              _type: "span",
              text: "23वें **कॉमनवेल्थ गेम्स 2026 (Glasgow 2026 Commonwealth Games)** का भव्य आयोजन **23 जुलाई से 2 अगस्त 2026** तक स्कॉटलैंड के **ग्लासगो** शहर में आयोजित किया जा रहा है। इस प्रतिष्ठित बहु-खेल प्रतियोगिता में भारत ने **122 खिलाड़ियों का दल** भेजा है, जो विभिन्न खेलों और पैरा स्पर्धाओं में देश का प्रतिनिधित्व कर रहे हैं।",
              textEn: "The 23rd **Commonwealth Games 2026 (Glasgow 2026 Commonwealth Games)** is taking place grandly from **July 23 to August 2, 2026** in **Glasgow, Scotland**. India has fielded a strong contingent of **122 athletes** representing the nation across regular and para sporting events."
            }],
          },
          {
            _key: "b1-2", _type: "block", style: "normal",
            children: [{
              _key: "s1-2",
              _type: "span",
              text: "भारतीय खिलाड़ियों ने लगातार शानदार प्रदर्शन करते हुए **5 स्वर्ण, 12 रजत और 6 कांस्य** सहित कुल **23 पदक (23 Medals Tally)** अपने नाम कर लिए हैं। अस्मिता डे (जूडो -48 किग्रा) और हर्ष सिंह (जूडो -60 किग्रा) ने स्वर्ण पदक जीतकर भारत की स्वर्ण पदकों की संख्या 5 कर दी है। इसके अलावा यामिनी मौर्या (जूडो -57किग्रा) और नीरज चोपड़ा (मेंस जैवलिन थ्रो) ने रजत पदक तथा तेजस्विन शंकर (डेकॉथ्लॉन) व यश वीर सिंह (जैवलिन थ्रो) ने कांस्य पदक जीतकर भारत की पदक तालिका को 23 तक पहुँचा दिया है।",
              textEn: "Indian athletes have delivered a spectacular performance, accumulating a total of **23 medals (5 Gold, 12 Silver, and 6 Bronze)** in the official standings. Asmita Dey (Judo -48kg) and Harsh Singh (Judo -60kg) won Gold medals to boost India's gold count to 5. Additionally, Yamini Mourya (Judo -57kg) and Neeraj Chopra (Men's Javelin Throw) claimed Silver medals, while Tejaswin Shankar (Decathlon) and Yash Veer Singh (Javelin Throw) secured Bronze medals to elevate India's total medal tally to 23."
            }],
          },
          {
            _key: "b1-h1", _type: "block", style: "h3",
            children: [{
              _key: "sh1-1",
              _type: "span",
              text: "मुख्य बिंदु तालिका (CWG 2026 Medal Tally & Highlights Table)",
              textEn: "Highlights Table (CWG 2026 Medal Tally & Overview)"
            }],
          },
          {
            _type: "table",
            caption: "कॉमनवेल्थ गेम्स 2026: एक नज़र में (Medal Tally Highlights)",
            captionEn: "Commonwealth Games 2026: At a Glance (Medal Tally Highlights)",
            headers: ["विवरण (Parameter)", "महत्वपूर्ण जानकारी (Details)"],
            headersEn: ["Parameter", "Details"],
            rows: [
              ["**आयोजन (Event)**", "कॉमनवेल्थ गेम्स 2026 (23वां संस्करण)"],
              ["**मेजबान शहर (Host City)**", "ग्लासगो, स्कॉटलैंड (United Kingdom)"],
              ["**आयोजन तिथि (Dates)**", "23 जुलाई – 2 अगस्त 2026"],
              ["**भारतीय दल (Indian Contingent)**", "122 खिलाड़ी (8 नियमित + 5 पैरा खेल)"],
              ["**भारत के कुल पदक (Total Medals)**", "**23 (5 स्वर्ण, 12 रजत, 6 कांस्य)**"],
              ["**मेडल टैली स्थिति (Medal Rank)**", "**10वां स्थान** (ऑस्ट्रेलिया शीर्ष पर)"]
            ],
            rowsEn: [
              ["**Event**", "Commonwealth Games 2026 (23rd Edition)"],
              ["**Host City**", "Glasgow, Scotland (United Kingdom)"],
              ["**Event Dates**", "July 23 – August 2, 2026"],
              ["**Indian Contingent**", "122 Athletes (8 Regular + 5 Para Sports)"],
              ["**India Total Medals**", "**23 (5 Gold, 12 Silver, 6 Bronze)**"],
              ["**Medal Rank**", "**10th Rank** (Australia leads the tally)"]
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
            children: [{
              _key: "sh-d1",
              _type: "span",
              text: "1. 9वें दिन के ऐतिहासिक परिणाम: जूडो में 2 स्वर्ण, नीरज का रजत व 6 पदकों की बौछार",
              textEn: "1. Day 9 Historic Results: 2 Gold in Judo, Neeraj Silver & 6 Medals Rush"
            }],
          },
          {
            _key: "b-day-1", _type: "block", style: "normal",
            children: [{
              _key: "s-d1",
              _type: "span",
              text: "• **अस्मिता डे एवं हर्ष सिंह (जूडो गोल्ड)**: महिला -48 किग्रा में अस्मिता डे ने तथा पुरुष -60 किग्रा में हर्ष सिंह ने स्वर्ण पदक जीतकर इतिहास रचा।",
              textEn: "• **Asmita Dey & Harsh Singh (Judo Gold)**: Asmita Dey won Gold in Women's -48kg and Harsh Singh claimed Gold in Men's -60kg Judo event."
            }],
          },
          {
            _key: "b-day-2", _type: "block", style: "normal",
            children: [{
              _key: "s-d2",
              _type: "span",
              text: "• **नीरज चोपड़ा एवं यामिनी मौर्या (रजत पदक)**: ओलंपिक चैंपियन नीरज चोपड़ा ने भाला फेंक (जैवलिन थ्रो) में रजत पदक तथा यामिनी मौर्या ने जूडो -57 किग्रा में रजत पदक हासिल किया।",
              textEn: "• **Neeraj Chopra & Yamini Mourya (Silver Medals)**: Olympic champion Neeraj Chopra bagged Silver in Men's Javelin Throw, and Yamini Mourya won Silver in Women's -57kg Judo."
            }],
          },
          {
            _key: "b-day-3", _type: "block", style: "normal",
            children: [{
              _key: "s-d3",
              _type: "span",
              text: "• **तेजस्विन शंकर व यश वीर सिंह (कांस्य पदक)**: तेजस्विन शंकर ने डेकॉथ्लॉन में ऐतिहासिक कांस्य पदक तथा यश वीर सिंह ने भाला फेंक स्पर्धा में कांस्य पदक हासिल किया।",
              textEn: "• **Tejaswin Shankar & Yash Veer Singh (Bronze Medals)**: Tejaswin Shankar won a historic Bronze in Decathlon, and Yash Veer Singh claimed Bronze in Men's Javelin Throw."
            }],
          },
          {
            _key: "b-day-4", _type: "block", style: "normal",
            children: [{
              _key: "s-d4",
              _type: "span",
              text: "• **लवप्रीत सिंह व सीमा कालीरामना**: लवप्रीत सिंह (वेटलिफ्टिंग +110kg) ने रजत तथा सीमा कालीरामना (महिला डिस्कस थ्रो) ने कांस्य पदक जीतकर भारत की तालिका को मजबूत किया।",
              textEn: "• **Lovepreet Singh & Seema Kaliramna**: Lovepreet Singh (+110kg Weightlifting) won Silver and Seema Kaliramna (Women's Discus Throw) secured Bronze."
            }],
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
            children: [{
              _key: "s2-in",
              _type: "span",
              text: "ग्लासगो 2026 राष्ट्रमंडल खेलों का आयोजन बजट कम करने के उद्देश्य से एक सीमित (Scaled-down) प्रारूप में किया जा रहा है। इस बार कुल **10 खेलों** को ही शामिल किया गया है।",
              textEn: "Glasgow 2026 Commonwealth Games is organized in a scaled-down format to control operational budgets. Only **10 sports disciplines** are featured in this edition."
            }],
          },
          {
            _key: "b2-h1", _type: "block", style: "h3",
            children: [{
              _key: "sh2-1",
              _type: "span",
              text: "1. 2026 कॉमनवेल्थ गेम्स से बाहर किए गए 5 प्रमुख खेल (MPPSC Special Notes)",
              textEn: "1. 5 Major Sports Excluded from Glasgow 2026 (MPPSC Exam Notes)"
            }],
          },
          {
            _key: "b2-d1", _type: "block", style: "normal",
            children: [{
              _key: "s2-d1",
              _type: "span",
              text: "• 🚫 **निशानेबाजी (Shooting)**: भारत का सबसे सफल खेल होने के बावजूद ग्लासगो 2026 से बाहर।",
              textEn: "• 🚫 **Shooting**: Excluded from Glasgow 2026 despite being India's most successful CWG sport."
            }],
          },
          {
            _key: "b2-d2", _type: "block", style: "normal",
            children: [{
              _key: "s2-d2",
              _type: "span",
              text: "• 🚫 **कुश्ती (Wrestling)**: भारत का एक और पारंपरिक पदक-विजेता खेल बाहर किया गया।",
              textEn: "• 🚫 **Wrestling**: India's powerhouse medal-winning discipline dropped."
            }],
          },
          {
            _key: "b2-d3", _type: "block", style: "normal",
            children: [{
              _key: "s2-d3",
              _type: "span",
              text: "• 🚫 **बैडमिंटन (Badminton)**: स्टार शटलरों का मुकाबला इस बार आयोजित नहीं हो रहा।",
              textEn: "• 🚫 **Badminton**: Excluded from the official 2026 sports program."
            }],
          },
          {
            _key: "b2-d4", _type: "block", style: "normal",
            children: [{
              _key: "s2-d4",
              _type: "span",
              text: "• 🚫 **हॉकी (Hockey)**: पुरुष व महिला राष्ट्रीय हॉकी स्पर्धाएँ बाहर।",
              textEn: "• 🚫 **Hockey**: Men's and Women's national hockey events excluded."
            }],
          },
          {
            _key: "b2-d5", _type: "block", style: "normal",
            children: [{
              _key: "s2-d5",
              _type: "span",
              text: "• 🚫 **टेबल टेनिस (Table Tennis)**: टीटी स्पर्धाएँ भी इस बार हटाई गई हैं।",
              textEn: "• 🚫 **Table Tennis**: Table tennis disciplines dropped from this edition."
            }],
          },
          {
            _key: "b2-h2", _type: "block", style: "h3",
            children: [{
              _key: "sh2-2",
              _type: "span",
              text: "2. ग्लासगो 2026 में शामिल 10 प्रमुख खेल",
              textEn: "2. 10 Featured Sports Disciplines in Glasgow 2026"
            }],
          },
          {
            _key: "b2-1", _type: "block", style: "normal",
            children: [{
              _key: "s2-1",
              _type: "span",
              text: "• **एथलेटिक्स व पैरा एथलेटिक्स**, **भारोत्तोलन व पैरा पावरलिफ्टिंग**, **मुक्केबाजी**, **तैराकी व पैरा तैराकी**, **आर्टिस्टिक जिम्नास्टिक**, **जूडो**, **लॉन बाउल्स**, **ट्रैक साइकिलिंग**, **3×3 व्हीलचेयर बास्केटबॉल**, **नेटबॉल**।",
              textEn: "• **Athletics & Para Athletics**, **Weightlifting & Para Powerlifting**, **Boxing**, **Swimming & Para Swimming**, **Artistic Gymnastics**, **Judo**, **Lawn Bowls**, **Track Cycling**, **3x3 Wheelchair Basketball**, and **Netball**."
            }],
          }
        ],
      },

      {
        _key: "sec-winners-table-details",
        kind: "keyHighlights",
        title: "कॉमनवेल्थ गेम्स 2026: भारतीय पदक विजेता (Medal Winners Table)",
        titleEn: "CWG 2026 India Medal Winners List & Table",
        body: [
          ...(assetTallyBanner ? [{
            _key: "b4-img-tally-banner",
            _type: "image",
            asset: { _type: "reference", _ref: assetTallyBanner._id },
            alt: "कॉमनवेल्थ गेम्स 2026 स्कॉटलैंड ग्लासगो सिल्वर, गोल्ड और कांस्य मेडल - भारत की पदक तालिका (India Medals Tally)",
            caption: "कॉमनवेल्थ गेम्स 2026 (ग्लासगो, स्कॉटलैंड): भारत की अद्यतन मेडल टैली एवं आधिकारिक पदक तालिका (5 स्वर्ण, 12 रजत, 6 कांस्य)",
          }] : []),
          {
            _key: "b3-h1", _type: "block", style: "h3",
            children: [{
              _key: "sh3-1",
              _type: "span",
              text: "1. पदक विजेताओं की आधिकारिक तालिका (23 Medal Winners List)",
              textEn: "1. Official List of All 23 Indian Medal Winners"
            }],
          },
          {
            _type: "table",
            caption: "कॉमनवेल्थ गेम्स 2026: भारतीय पदक विजेता (23 Medals Tally)",
            captionEn: "Commonwealth Games 2026: Indian Medal Winners (23 Medals Tally)",
            headers: ["नम्बर", "एथलीट", "इवेंट", "खेल", "मेडल"],
            headersEn: ["S.No.", "Athlete", "Event / Category", "Sport Discipline", "Medal"],
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
              ["17", "**सीमा कालीरामना**", "वूमेंस डिस्कस थ्रो", "एथलेटिक्स", "**ब्रॉन्ज (Bronze)**"],
              ["18", "[**अस्मिता डे (Asmita Dey)**](/current-affairs/asmita-dey-biography-cwg-2026-gold-medal-judo)", "वूमेंस -48 किग्रा", "जूडो", "**गोल्ड (Gold)**"],
              ["19", "[**हर्ष सिंह (Harsh Singh)**](/current-affairs/harsh-singh-biography-cwg-2026-gold-medal-judo)", "मेंस -60 किग्रा", "जूडो", "**गोल्ड (Gold)**"],
              ["20", "**यामिनी मौर्या**", "वूमेंस -57 किग्रा", "जूडो", "**सिल्वर (Silver)**"],
              ["21", "**तेजस्विन शंकर**", "मेंस डेकॉथ्लॉन", "एथलेटिक्स", "**ब्रॉन्ज (Bronze)**"],
              ["22", "[**नीरज चोपड़ा (Neeraj Chopra)**](/current-affairs/neeraj-chopra-javelin-records-cwg-2026-silver-medal-biography)", "मेंस जैवलिन थ्रो", "एथलेटिक्स", "**सिल्वर (Silver)**"],
              ["23", "**यश वीर सिंह**", "मेंस जैवलिन थ्रो", "एथलेटिक्स", "**ब्रॉन्ज (Bronze)**"]
            ],
            rowsEn: [
              ["1", "**Rishikanta Singh**", "Men's 60kg", "Weightlifting", "**Silver**"],
              ["2", "**Jhandu Kumar**", "Men's Heavyweight", "Para Powerlifting", "**Bronze**"],
              ["3", "[**Mirabai Chanu**](/en/current-affairs/mirabai-chanu-biography-cwg-2026-gold-medal-weightlifting)", "Women's 48kg", "Weightlifting", "**Gold**"],
              ["4", "**Muthupandi Raja**", "Men's 65kg", "Weightlifting", "**Silver**"],
              ["5", "**Gyaneshwari Yadav**", "Women's 53kg", "Weightlifting", "**Silver**"],
              ["6", "**Bindyarani Devi**", "Women's 58kg", "Weightlifting", "**Bronze**"],
              ["7", "[**Sharmila Dhankar**](/en/current-affairs/sharmila-dhankar-biography-cwg-2026-gold-medal-para-athletics)", "Women's Shot Put F57", "Para Athletics", "**Gold**"],
              ["8", "**Sarvesh Kushare**", "Men's High Jump", "Athletics", "**Silver**"],
              ["9", "**Shilpa K. Shaila**", "Women's Shot Put F57", "Para Athletics", "**Bronze**"],
              ["10", "**Valluri Ajay Babu**", "Men's 79kg", "Weightlifting", "**Silver**"],
              ["11", "**Harjinder Kaur**", "Women's 69kg", "Weightlifting", "**Silver**"],
              ["12", "**Gulveer Singh**", "Men's 10,000m", "Athletics", "**Silver**"],
              ["13", "**Murali Sreeshankar**", "Men's Long Jump", "Athletics", "**Silver**"],
              ["14", "[**Dilip Gavit**](/en/current-affairs/dilip-gavit-biography-cwg-2026-gold-medal-para-athletics)", "Men's 100m T47", "Para Athletics", "**Gold**"],
              ["15", "**Mohammad Basil**", "Men's 100m T47", "Para Athletics", "**Silver**"],
              ["16", "**Lovepreet Singh**", "Men's +110kg", "Weightlifting", "**Silver**"],
              ["17", "**Seema Kaliramna**", "Women's Discus Throw", "Athletics", "**Bronze**"],
              ["18", "[**Asmita Dey**](/en/current-affairs/asmita-dey-biography-cwg-2026-gold-medal-judo)", "Women's -48kg", "Judo", "**Gold**"],
              ["19", "[**Harsh Singh**](/en/current-affairs/harsh-singh-biography-cwg-2026-gold-medal-judo)", "Men's -60kg", "Judo", "**Gold**"],
              ["20", "**Yamini Mourya**", "Women's -57kg", "Judo", "**Silver**"],
              ["21", "**Tejaswin Shankar**", "Men's Decathlon", "Athletics", "**Bronze**"],
              ["22", "[**Neeraj Chopra**](/en/current-affairs/neeraj-chopra-javelin-records-cwg-2026-silver-medal-biography)", "Men's Javelin Throw", "Athletics", "**Silver**"],
              ["23", "**Yash Veer Singh**", "Men's Javelin Throw", "Athletics", "**Bronze**"]
            ]
          },
          {
            _key: "b3-h2", _type: "block", style: "h3",
            children: [{
              _key: "sh3-2",
              _type: "span",
              text: "2. खेलवार भारत की पदक तालिका (Sport-wise Medal Tally)",
              textEn: "2. Sport-wise Medal Tally Breakdown"
            }],
          },
          {
            _type: "table",
            caption: "खेलवार भारत की पदक तालिका (Sport-wise Medal Tally)",
            captionEn: "Sport-wise Breakdown of India's Medals Tally",
            headers: ["खेल (Sport)", "स्वर्ण (Gold)", "रजत (Silver)", "कांस्य (Bronze)", "कुल (Total)"],
            headersEn: ["Sport Discipline", "Gold", "Silver", "Bronze", "Total"],
            rows: [
              ["**वेटलिफ्टिंग (Weightlifting)**", "1", "6", "1", "**8**"],
              ["**जूडो (Judo)**", "2", "1", "0", "**3**"],
              ["**एथलेटिक्स (Athletics)**", "0", "4", "3", "**7**"],
              ["**पैरा-एथलेटिक्स (Para Athletics)**", "2", "1", "1", "**4**"],
              ["**पैरा पावरलिफ्टिंग (Para Powerlifting)**", "0", "0", "1", "**1**"],
              ["**कुल भारत पदक तालिका (Total)**", "**5**", "**12**", "**6**", "**23**"]
            ],
            rowsEn: [
              ["**Weightlifting**", "1", "6", "1", "**8**"],
              ["**Judo**", "2", "1", "0", "**3**"],
              ["**Athletics**", "0", "4", "3", "**7**"],
              ["**Para Athletics**", "2", "1", "1", "**4**"],
              ["**Para Powerlifting**", "0", "0", "1", "**1**"],
              ["**Total Medals**", "**5**", "**12**", "**6**", "**23**"]
            ]
          }
        ],
      },

      {
        _key: "sec-cwg-history",
        kind: "analysis",
        title: "कॉमनवेल्थ गेम्स में भारत का इतिहास एवं सर्वश्रेष्ठ प्रदर्शन",
        titleEn: "India's CWG History & All-Time Best Performance",
        body: [
          {
            _key: "b4-h1", _type: "block", style: "h3",
            children: [{
              _key: "sh4-1",
              _type: "span",
              text: "1. कॉमनवेल्थ गेम्स का संक्षिप्त इतिहास (Brief History of CWG)",
              textEn: "1. Brief History of Commonwealth Games"
            }],
          },
          {
            _key: "b4-1", _type: "block", style: "normal",
            children: [{
              _key: "s4-1",
              _type: "span",
              text: "• **पहला संस्करण (1930)**: पहला कॉमनवेल्थ गेम्स 1930 में कनाडा के **हैमिल्टन** शहर में आयोजित हुआ था।",
              textEn: "• **First Edition (1930)**: The first Commonwealth Games was hosted in **Hamilton**, Canada in 1930."
            }],
          },
          {
            _key: "b4-2", _type: "block", style: "normal",
            children: [{
              _key: "s4-2",
              _type: "span",
              text: "• **भारत का पदार्पण (1934)**: भारत ने पहली बार 1934 (लंदन) में भाग लिया था।",
              textEn: "• **India's Debut (1934)**: India participated for the first time in 1934 (London)."
            }],
          },
          {
            _key: "b4-3", _type: "block", style: "normal",
            children: [{
              _key: "s4-3",
              _type: "span",
              text: "• **पहला पदक**: भारत का पहला पदक **रशीद अनवर** ने 1934 में कुश्ती (कांस्य) में जीता।",
              textEn: "• **First Medal**: India's first CWG medal was won by **Rashid Anwar** in Wrestling (Bronze) in 1934."
            }],
          },
          {
            _key: "b4-4", _type: "block", style: "normal",
            children: [{
              _key: "s4-4",
              _type: "span",
              text: "• **पहला स्वर्ण पदक (1958)**: भारत का पहला स्वर्ण पदक **मिल्खा सिंह** ने 1958 में कार्डिफ में जीता।",
              textEn: "• **First Gold Medal (1958)**: Legendary **Milkha Singh** won India's first Gold medal in Cardiff (1958)."
            }],
          },
          {
            _key: "b4-h2", _type: "block", style: "h3",
            children: [{
              _key: "sh4-2",
              _type: "span",
              text: "2. भारत का सर्वश्रेष्ठ प्रदर्शन (Best Tally - Delhi 2010)",
              textEn: "2. India's Best All-Time Performance (Delhi 2010)"
            }],
          },
          {
            _key: "b4-5", _type: "block", style: "normal",
            children: [{
              _key: "s4-5",
              _type: "span",
              text: "• **2010 नई दिल्ली**: भारत ने 38 स्वर्ण, 27 रजत, 36 कांस्य सहित 101 पदक जीतकर 2nd स्थान प्राप्त किया था।",
              textEn: "• **2010 New Delhi**: India achieved its best-ever tally with 101 medals (38 Gold, 27 Silver, 36 Bronze) ranking 2nd overall."
            }],
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
              { label: "2026 CWG मेजबान", labelEn: "2026 Host City", value: "**ग्लासगो, स्कॉटलैंड** (23 जुलाई - 2 अगस्त 2026)", valueEn: "**Glasgow, Scotland** (July 23 - Aug 2, 2026)" },
              { label: "भारतीय दल क्षमता", labelEn: "Indian Contingent", value: "**122 खिलाड़ी** (8 नियमित + 5 पैरा खेल)", valueEn: "**122 Athletes** (8 Regular + 5 Para Sports)" },
              { label: "भारत के कुल पदक", labelEn: "India Total Medals", value: "**23 पदक (5 स्वर्ण, 12 रजत, 6 कांस्य)**", valueEn: "**23 Medals (5 Gold, 12 Silver, 6 Bronze)**" },
              { label: "स्वर्ण पदक विजेता (5)", labelEn: "Gold Medalists (5)", value: "**मीराबाई चानू, शर्मिला, दिलीप गावित, अस्मिता डे, हर्ष सिंह**", valueEn: "**Mirabai Chanu, Sharmila, Dilip Gavit, Asmita Dey, Harsh Singh**" },
              { label: "रजत पदक विजेता (12)", labelEn: "Silver Medalists (12)", value: "**ऋषिकांत, मुथुपांडी, ज्ञानेश्वरी, सर्वेश, वल्लुरी, हरजिंदर, गुलवीर, श्रीशंकर, बासिल, लवप्रीत, यामिनी, नीरज चोपड़ा**", valueEn: "**Rishikanta, Muthupandi, Gyaneshwari, Sarvesh, Valluri, Harjinder, Gulveer, Sreeshankar, Basil, Lovepreet, Yamini, Neeraj**" },
              { label: "कांस्य पदक विजेता (6)", labelEn: "Bronze Medalists (6)", value: "**झंडू कुमार, बिंदियारानी, शिल्पा, सीमा कालीरामना, तेजस्विन शंकर, यश वीर सिंह**", valueEn: "**Jhandu Kumar, Bindyarani, Shilpa, Seema Kaliramna, Tejaswin, Yash Veer**" },
            ]
          }
        ],
      }
    ],

    /* ─── FAQS (8 Collapsible FAQs addressing Google PAA) ─────── */
    faqs: [
      {
        question: "कॉमनवेल्थ गेम्स 2026 में भारत ने अब तक कुल कितने पदक जीते हैं?",
        questionEn: "How many medals has India won in the Commonwealth Games 2026 so far?",
        answer: "भारत ने कॉमनवेल्थ गेम्स 2026 (ग्लासगो) में अब तक कुल 23 पदक जीते हैं, जिनमें 5 स्वर्ण (मीराबाई चानू, शर्मिला, दिलीप गावित, अस्मिता डे, हर्ष सिंह), 12 रजत (नीरज चोपड़ा, यामिनी मौर्या, लवप्रीत आदि) और 6 कांस्य (तेजस्विन शंकर, यश वीर सिंह आदि) शामिल हैं।",
        answerEn: "India has won a total of 23 medals (5 Gold, 12 Silver, 6 Bronze) at the Commonwealth Games 2026 in Glasgow so far, holding the 10th rank."
      },
      {
        question: "राष्ट्र मंडल खेलों 2026 में जूडो खेल में भारत ने कौन-से पदक जीते हैं?",
        questionEn: "Which medals did India win in Judo at Commonwealth Games 2026?",
        answer: "जूडो में अस्मिता डे (महिला -48 किग्रा) तथा हर्ष सिंह (पुरुष -60 किग्रा) ने स्वर्ण पदक (Gold) तथा यामिनी मौर्या (महिला -57 किग्रा) ने रजत पदक (Silver) जीता।",
        answerEn: "In Judo, Asmita Dey (Women's -48kg) and Harsh Singh (Men's -60kg) won Gold medals, while Yamini Mourya (Women's -57kg) won Silver medal."
      },
      {
        question: "कॉमनवेल्थ गेम्स 2026 में भाला फेंक (Javelin Throw - नीरज चोपड़ा) स्पर्धा का परिणाम क्या रहा?",
        questionEn: "What was the result of Neeraj Chopra in Men's Javelin Throw at CWG 2026?",
        answer: "ओलंपिक चैंपियन नीरज चोपड़ा ने पुरुष भाला फेंक स्पर्धा में रजत पदक (Silver) तथा भारत के ही यश वीर सिंह ने कांस्य पदक (Bronze) अपने नाम किया।",
        answerEn: "Olympic champion Neeraj Chopra won the Silver medal in Men's Javelin Throw, while fellow Indian Yash Veer Singh secured the Bronze medal."
      },
      {
        question: "कॉमनवेल्थ गेम्स 2026 Day 9 में भारत को कितने पदक प्राप्त हुए?",
        questionEn: "How many medals did India win on Day 9 of Commonwealth Games 2026?",
        answer: "9वें दिन भारत ने 6 पदक जीते: अस्मिता डे व हर्ष सिंह का स्वर्ण, नीरज चोपड़ा व यामिनी मौर्या का रजत, तथा तेजस्विन शंकर व यश वीर सिंह का कांस्य पदक।",
        answerEn: "On Day 9, India delivered a historic 6-medal surge: 2 Gold (Asmita Dey & Harsh Singh), 2 Silver (Neeraj Chopra & Yamini Mourya), and 2 Bronze (Tejaswin Shankar & Yash Veer Singh)."
      },
      {
        question: "कॉमनवेल्थ गेम्स 2026 में 100m T47 पैरा एथलेटिक्स में स्वर्ण व रजत पदक किसने जीते?",
        questionEn: "Who won Gold and Silver in Men's 100m T47 Para Athletics at CWG 2026?",
        answer: "पुरुष 100 मीटर T47 पैरा एथलेटिक्स में दिलीप गावित ने 10.71 सेकंड के गेम्स रिकॉर्ड के साथ स्वर्ण पदक (Gold) तथा मोहम्मद बासिल ने 10.89 सेकंड के साथ रजत पदक (Silver) जीता।",
        answerEn: "Dilip Gavit won Gold with a Games Record of 10.71s in Men's 100m T47, and Mohammad Basil secured Silver with 10.89s, giving India a 1-2 finish."
      },
      {
        question: "कॉमनवेल्थ गेम्स 2026 से किन 5 प्रमुख खेलों को बाहर (Dropped Sports) किया गया है?",
        questionEn: "Which 5 major sports were dropped from Commonwealth Games 2026?",
        answer: "ग्लासगो 2026 राष्ट्रमंडल खेलों से निशानेबाजी (Shooting), कुश्ती (Wrestling), बैडमिंटन (Badminton), हॉकी (Hockey) तथा टेबल टेनिस (Table Tennis) को बाहर किया गया है।",
        answerEn: "Shooting, Wrestling, Badminton, Hockey, and Table Tennis have been excluded from the Glasgow 2026 Commonwealth Games program."
      },
      {
        question: "कॉमनवेल्थ गेम्स में भारत का अब तक का सर्वश्रेष्ठ प्रदर्शन कौन-सा रहा है?",
        questionEn: "What is India's best-ever performance in Commonwealth Games history?",
        answer: "भारत का सर्वश्रेष्ठ प्रदर्शन 2010 नई दिल्ली राष्ट्रमंडल खेलों में रहा, जहाँ भारत ने 38 स्वर्ण, 27 रजत और 36 कांस्य सहित रिकॉर्ड 101 पदक जीतकर पदक तालिका में 2nd स्थान प्राप्त किया था।",
        answerEn: "India's best performance was at the 2010 New Delhi Games, winning 101 medals (38 Gold, 27 Silver, 36 Bronze) to finish 2nd overall."
      },
      {
        question: "MPPSC परीक्षा में खेल समसामयिकी (Sports Current Affairs) का क्या महत्व है?",
        questionEn: "What is the importance of Sports Current Affairs in MPPSC exams?",
        answer: "MPPSC प्रारम्भिक परीक्षा (Paper 1 GS Unit-5) तथा मुख्य परीक्षा में राष्ट्रीय-अंतरराष्ट्रीय पदक विजेताओं, रिकॉर्ड्स, स्पर्धाओं और पैरा एथलीटों से 4-6 अंक के प्रश्न सीधे पूछे जाते हैं।",
        answerEn: "In MPPSC Prelims (Paper 1 GS Unit-5) and Mains, sports current affairs account for 4-6 direct marks covering medalists, records, and venues."
      }
    ],

    /* ─── MCQS (EXACTLY 8 High-Quality Practice Quizzes) ───────────────── */
    mcqs: [
      {
        question: "कॉमनवेल्थ गेम्स 2026 (CWG 2026) में भारत ने अब तक कुल कितने पदक (Medals) जीते हैं?",
        questionEn: "How many total medals has India won at the Commonwealth Games 2026 so far?",
        options: ["A. 17 पदक", "B. 20 पदक", "C. 23 पदक (5 स्वर्ण, 12 रजत, 6 कांस्य)", "D. 25 पदक"],
        optionsEn: ["A. 17 Medals", "B. 20 Medals", "C. 23 Medals (5 Gold, 12 Silver, 6 Bronze)", "D. 25 Medals"],
        correctIndex: 2,
        explanation: "भारत ने CWG 2026 में 5 स्वर्ण, 12 रजत और 6 कांस्य सहित कुल 23 पदक जीत लिए हैं।",
        explanationEn: "India has won a total of 23 medals (5 Gold, 12 Silver, 6 Bronze) at the Glasgow Commonwealth Games 2026."
      },
      {
        question: "कॉमनवेल्थ गेम्स 2026 में पुरुष भाला फेंक (Javelin Throw) स्पर्धा में रजत पदक किस भारतीय खिलाड़ी ने जीता?",
        questionEn: "Which Indian athlete won the Silver medal in Men's Javelin Throw at CWG 2026?",
        options: ["A. नीरज चोपड़ा", "B. किशोर जेना", "C. यश वीर सिंह", "D. सुमित अंतिल"],
        optionsEn: ["A. Neeraj Chopra", "B. Kishore Jena", "C. Yash Veer Singh", "D. Sumit Antil"],
        correctIndex: 0,
        explanation: "नीरज चोपड़ा ने पुरुष भाला फेंक स्पर्धा में रजत पदक तथा यश वीर सिंह ने कांस्य पदक हासिल किया।",
        explanationEn: "Neeraj Chopra won the Silver medal in Men's Javelin Throw, while Yash Veer Singh won the Bronze medal."
      },
      {
        question: "कॉमनवेल्थ गेम्स 2026 में महिला -48 किग्रा जूडो स्पर्धा में स्वर्ण पदक किस भारतीय एथलीट ने जीता?",
        questionEn: "Which Indian athlete won the Gold medal in Women's -48kg Judo at CWG 2026?",
        options: ["A. अस्मिता डे", "B. यामिनी मौर्या", "C. शुशीला देवी", "D. तूलिका मान"],
        optionsEn: ["A. Asmita Dey", "B. Yamini Mourya", "C. Shushila Devi", "D. Tulika Maan"],
        correctIndex: 0,
        explanation: "अस्मिता डे ने महिला -48 किग्रा जूडो स्पर्धा में भारत के लिए ऐतिहासिक स्वर्ण पदक जीता।",
        explanationEn: "Asmita Dey won a historic Gold medal for India in the Women's -48kg Judo competition."
      },
      {
        question: "कॉमनवेल्थ गेम्स 2026 में पुरुष डेकॉथ्लॉन (Decathlon) स्पर्धा में कांस्य पदक किस एथलीट ने हासिल किया?",
        questionEn: "Which athlete won the Bronze medal in Men's Decathlon at CWG 2026?",
        options: ["A. तेजस्विन शंकर", "B. सर्वेश कुशारे", "C. श्रीशंकर", "D. अविनाश साबले"],
        optionsEn: ["A. Tejaswin Shankar", "B. Sarvesh Kushare", "C. Sreeshankar", "D. Avinash Sable"],
        correctIndex: 0,
        explanation: "तेजस्विन शंकर ने पुरुष डेकॉथ्लॉन स्पर्धा में भारत के लिए कांस्य पदक जीतकर इतिहास रचा।",
        explanationEn: "Tejaswin Shankar scripted history by winning the Bronze medal in Men's Decathlon."
      },
      {
        question: "कॉमनवेल्थ गेम्स 2026 में पुरुष 100 मीटर T47 (पैरा एथलेटिक्स) स्पर्धा में स्वर्ण पदक किस भारतीय खिलाड़ी ने जीता?",
        questionEn: "Who won the Gold medal in Men's 100m T47 Para Athletics at CWG 2026?",
        options: ["A. दिलीप गावित", "B. मोहम्मद बासिल", "C. सुमित अंतिल", "D. निशाद कुमार"],
        optionsEn: ["A. Dilip Gavit", "B. Mohammad Basil", "C. Sumit Antil", "D. Nishad Kumar"],
        correctIndex: 0,
        explanation: "दिलीप गावित ने पुरुष 100 मीटर T47 पैरा एथलेटिक्स में 10.71s गेम्स रिकॉर्ड के साथ स्वर्ण पदक जीता।",
        explanationEn: "Dilip Gavit won the Gold medal in Men's 100m T47 with a new Games Record of 10.71 seconds."
      },
      {
        question: "कॉमनवेल्थ गेम्स 2026 में पुरुष -60 किग्रा जूडो स्पर्धा में भारत के लिए स्वर्ण पदक किसने जीता?",
        questionEn: "Who won the Gold medal for India in Men's -60kg Judo at CWG 2026?",
        options: ["A. हर्ष सिंह", "B. विजय कुमार", "C. जसलीन सिंह", "D. अवतार सिंह"],
        optionsEn: ["A. Harsh Singh", "B. Vijay Kumar", "C. Jasleen Singh", "D. Avtar Singh"],
        correctIndex: 0,
        explanation: "हर्ष सिंह ने पुरुष -60 किग्रा जूडो स्पर्धा में स्वर्ण पदक जीतकर भारत की स्वर्ण पदकों की संख्या 5 तक पहुँचायी।",
        explanationEn: "Harsh Singh won Gold in Men's -60kg Judo to take India's gold tally to 5."
      },
      {
        question: "ग्लासगो राष्ट्रमंडल खेल 2026 से किस प्रमुख खेल को बाहर (Dropped) कर दिया गया है?",
        questionEn: "Which major sport discipline was dropped from Glasgow CWG 2026?",
        options: ["A. निशानेबाजी एवं कुश्ती", "B. वेटलिफ्टिंग", "C. एथलेटिक्स", "D. जूडो"],
        optionsEn: ["A. Shooting & Wrestling", "B. Weightlifting", "C. Athletics", "D. Judo"],
        correctIndex: 0,
        explanation: "निशानेबाजी, कुश्ती, बैडमिंटन, हॉकी एवं टेबल टेनिस को 2026 खेलों से बाहर रखा गया है।",
        explanationEn: "Shooting, Wrestling, Badminton, Hockey, and Table Tennis have been excluded from 2026 Games."
      },
      {
        question: "कॉमनवेल्थ गेम्स 2026 में भारत को वेटलिफ्टिंग (भारोत्तोलन) खेल से कुल कितने पदक प्राप्त हुए हैं?",
        questionEn: "How many total medals did India win in Weightlifting at CWG 2026?",
        options: ["A. 5 पदक", "B. 7 पदक", "C. 8 पदक (1 स्वर्ण, 6 रजत, 1 कांस्य)", "D. 10 पदक"],
        optionsEn: ["A. 5 Medals", "B. 7 Medals", "C. 8 Medals (1 Gold, 6 Silver, 1 Bronze)", "D. 10 Medals"],
        correctIndex: 2,
        explanation: "भारत को वेटलिफ्टिंग से कुल 8 पदक (1 स्वर्ण, 6 रजत, 1 कांस्य) प्राप्त हुए हैं।",
        explanationEn: "India won 8 total medals in Weightlifting (1 Gold, 6 Silver, 1 Bronze)."
      }
    ]
  };

  console.log('📝 Uploading CWG 2026 article ID "ca-commonwealth-games-2026" to Sanity CMS...');
  await client.createOrReplace(article);
  console.log('🎉 SUCCESS! Article uploaded & published in Sanity CMS. Document ID: ca-commonwealth-games-2026');
  console.log('URL slug: commonwealth-games-2026-updates-india-medal-tally');
}

main().catch((err) => {
  console.error("❌ Upload process failed:", err);
  process.exit(1);
});
