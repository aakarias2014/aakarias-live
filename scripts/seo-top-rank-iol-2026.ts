import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import path from "path";

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
  console.log("🚀 Executing SEO Top-Rank & Bidirectional Interlinking for International Linguistics Olympiad (IOL) 2026...");

  const iolDocIdCa = "ca-international-linguistics-olympiad-2026-india";
  const iolDocIdGk = "gk-international-linguistics-olympiad-2026-india";

  const iolUrl = "/current-affairs/international-linguistics-olympiad-2026-india-gold-medal-mppsc-notes";
  const iolTitle = "23वाँ अंतर्राष्ट्रीय भाषाविज्ञान ओलंपियाड (IOL 2026): भारत का प्रदर्शन एवं स्वर्ण पदक";

  const iphoUrl = "/current-affairs/ipho-2026-india-gold-medals-physics-olympiad";
  const iphoTitle = "56वाँ अंतर्राष्ट्रीय भौतिकी ओलंपियाड (IPhO 2026): भारत ने जीते सभी 5 स्वर्ण पदक";

  const paramPragyaUrl = "/current-affairs/param-pragya-supercomputer-ai-notes";
  const paramPragyaTitle = "परम प्रवेगा एवं परम प्रज्ञा सुपरकंप्यूटर: भारत में AI व सुपरकंप्यूटिंग";

  // Asset IDs existing from previous upload
  const assetWinnersId = "image-1c07a5cd8549a438fb5dbcd4403251af1d6871a6-1024x1024-jpg";
  const assetTrainingId = "image-6ebb653887bb603944abfee144c0afc8ee575b39-1024x1024-jpg";
  const assetAiNlpId = "image-db26cb730093a3bf9ed45ec8cf1c3a79e76c3788-1024x1024-jpg";
  const assetThumbnailId = "image-4001fd2095bbbb1948abba632c236720b71e9877-1024x378-png";

  // Construct Document for Current Affairs
  const caArticle = {
    _id: iolDocIdCa,
    _type: "currentAffairs",
    slug: { _type: "slug", current: "international-linguistics-olympiad-2026-india-gold-medal-mppsc-notes" },
    title: "23वाँ अंतर्राष्ट्रीय भाषाविज्ञान ओलंपियाड (IOL) 2026: भारत का प्रदर्शन, श्रीलक्ष्मी वेंकटरमन को स्वर्ण पदक व IIIT हैदराबाद | MPPSC & UPSC Notes",
    titleEn: "23rd International Linguistics Olympiad (IOL) 2026: India Wins 1 Gold & 3 Bronze Medals, Sreelakshmi Venkataraman & PLO Notes PDF",
    excerpt: "23वां International Linguistics Olympiad (IOL 2026) बुखारेस्ट, रोमानिया में 26 जुलाई से 2 अगस्त 2026 तक आयोजित। 46 देशों के 255 प्रतिभागियों में भारत ने 1 स्वर्ण (श्रीलक्ष्मी वेंकटरमन), 3 कांस्य व 1 Honourable Mention जीता। पाणिनि लिंग्विस्टिक्स ओलंपियाड (PLO) व IIIT हैदराबाद (LTRC)। MPPSC (पेपर-3: विज्ञान व प्रौद्योगिकी) एवं UPSC नोट्स।",
    excerptEn: "Detailed notes on 23rd International Linguistics Olympiad (IOL 2026) held in Bucharest, Romania (July 26 - August 2, 2026). India secured 1 Gold (Sreelakshmi Venkataraman), 3 Bronze, and 1 Honourable Mention. Panini Linguistics Olympiad (PLO) & IIIT Hyderabad LTRC for MPPSC & UPSC.",
    ca_date: "2026-08-12",
    publishedAt: new Date().toISOString(),
    featured: true,
    readingTime: 10,
    keywords: [
      "international linguistics olympiad 2026 hindi",
      "international linguistics olympiad 2026 current affairs",
      "international linguistics olympiad 2026",
      "अंतर्राष्ट्रीय भाषाविज्ञान ओलंपियाड 2026",
      "अंतर्राष्ट्रीय भाषाविज्ञान ओलंपियाड 2026 भारत",
      "23rd international linguistics olympiad 2026",
      "international linguistics olympiad 2026 winners list",
      "iol 2026 romania bucharest india",
      "panini linguistics olympiad 2026",
      "sreelakshmi venkataraman gold medal iol 2026",
      "iiit hyderabad ltrc linguistics olympiad",
      "international linguistics olympiad 2026 pdf notes",
      "aarav anil rao bronze medal iol 2026",
      "nishant shankar lakshmanan bronze medal",
      "advay mishra bronze medal iol 2026",
      "soham amit pednekar honourable mention",
      "International Linguistics Olympiad 2026 MPPSC",
      "International Linguistics Olympiad 2026 UPSC",
      "Computational Linguistics AI NLP India",
      "Science Olympiads 2026 India Winners"
    ],
    category: { _type: "reference", _ref: "cat-scitech" },
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
      asset: { _type: "reference", _ref: assetThumbnailId },
      alt: "Official IOL 2026 International Linguistics Olympiad Team India Winners Banner with Indian Flag and Medals",
    },

    /* ─── SECTIONS ──────────────────────────────────────────────── */
    sections: [
      /* ── 1. Google Featured Snippet / AI Direct Answer Box ──── */
      {
        _key: "sec-featured-snippet-iol",
        kind: "whyInNews",
        title: "Google Featured Snippet: 23वाँ अंतर्राष्ट्रीय भाषाविज्ञान ओलंपियाड (IOL 2026) - त्वरित सारांश (Quick Answer Box)",
        titleEn: "Google Featured Snippet: 23rd International Linguistics Olympiad (IOL 2026) Quick Summary",
        body: [
          {
            _key: "fs-1", _type: "block", style: "normal",
            children: [
              { _key: "fs-s1", _type: "span", text: "• **प्रतियोगिता (Event Name)**: 23वाँ अंतर्राष्ट्रीय भाषाविज्ञान ओलंपियाड 2026 (23rd International Linguistics Olympiad - IOL 2026)।" }
            ]
          },
          {
            _key: "fs-2", _type: "block", style: "normal",
            children: [
              { _key: "fs-s2", _type: "span", text: "• **आयोजन स्थल एवं तिथियाँ (Venue & Dates)**: " },
              { _key: "fs-s3", _type: "span", marks: ["strong"], text: "बुखारेस्ट, रोमानिया (Bucharest, Romania) | 26 जुलाई से 2 अगस्त 2026" },
              { _key: "fs-s4", _type: "span", text: "।" }
            ]
          },
          {
            _key: "fs-3", _type: "block", style: "normal",
            children: [
              { _key: "fs-s5", _type: "span", text: "• **कुल प्रतिभागी (Participants)**: 46 देशों की 65 टीमों के 255 प्रतियोगी।" }
            ]
          },
          {
            _key: "fs-4", _type: "block", style: "normal",
            children: [
              { _key: "fs-s6", _type: "span", text: "• **भारत का कुल प्रदर्शन (India's Tally)**: " },
              { _key: "fs-s7", _type: "span", marks: ["strong"], text: "1 स्वर्ण (Gold), 3 कांस्य (Bronze) तथा 1 ऑनरेबल मेंशन (Honourable Mention)" },
              { _key: "fs-s8", _type: "span", text: "।" }
            ]
          },
          {
            _key: "fs-5", _type: "block", style: "normal",
            children: [
              { _key: "fs-s9", _type: "span", text: "• **भारतीय पदक विजेता (Winners List)**: 1. **श्रीलक्ष्मी वेंकटरमन** (स्वर्ण पदक - 70.0 अंक), 2. **आरव अनिल राव** (कांस्य पदक), 3. **निशांत शंकर लक्ष्मणन** (कांस्य पदक), 4. **अद्वय मिश्रा** (कांस्य पदक), 5. **सोहम अमित पेडणेकर** (Honourable Mention)।" }
            ]
          },
          {
            _key: "fs-6", _type: "block", style: "normal",
            children: [
              { _key: "fs-s10", _type: "span", text: "• **राष्ट्रीय चयन एवं प्रशिक्षण**: चयन — **पाणिनि लिंग्विस्टिक्स ओलंपियाड (PLO)**; प्रशिक्षण — **IIIT हैदराबाद का LTRC** (31 मई से 10 जून 2026)।" }
            ]
          },
          {
            _key: "fs-7", _type: "block", style: "normal",
            children: [
              { _key: "fs-s11", _type: "span", text: "• **स्मरण सूत्र (Memory Formula)**: IOL 2026 बुखारेस्ट = श्रीलक्ष्मी (स्वर्ण) + 3 कांस्य + PLO + IIIT हैदराबाद LTRC।" }
            ]
          },
        ],
        bodyEn: [
          {
            _key: "fs-8", _type: "block", style: "normal",
            children: [
              { _key: "fs-s12", _type: "span", text: "• **Event**: 23rd International Linguistics Olympiad (IOL 2026)." }
            ]
          },
          {
            _key: "fs-9", _type: "block", style: "normal",
            children: [
              { _key: "fs-s13", _type: "span", text: "• **Venue & Dates**: Bucharest, Romania (July 26 to August 2, 2026)." }
            ]
          },
          {
            _key: "fs-10", _type: "block", style: "normal",
            children: [
              { _key: "fs-s14", _type: "span", text: "• **Participants**: 255 contestants from 65 teams representing 46 countries." }
            ]
          },
          {
            _key: "fs-11", _type: "block", style: "normal",
            children: [
              { _key: "fs-s15", _type: "span", text: "• **India's Tally**: 1 Gold (Sreelakshmi Venkataraman), 3 Bronze (Aarav Anil Rao, Nishant Shankar Lakshmanan, Advay Mishra), and 1 Honourable Mention (Soham Amit Pednekar)." }
            ]
          },
        ],
      },

      /* ── 2. Detailed Performance & Winners ───────────────────── */
      {
        _key: "sec-detailed-winners-iol",
        kind: "background",
        title: "अंतर्राष्ट्रीय भाषाविज्ञान ओलंपियाड 2026: भारत की ऐतिहासिक उपलब्धि",
        titleEn: "23rd IOL 2026: Detailed Overview & Team India Winners List",
        body: [
          {
            _key: "b2-1", _type: "block", style: "h3",
            children: [{ _key: "s2-1", _type: "span", text: "1. बुखारेस्ट, रोमानिया में भारत का स्वर्णिम प्रदर्शन" }],
          },
          {
            _key: "b2-2", _type: "block", style: "normal",
            children: [{ _key: "s2-2", _type: "span", text: "• **आयोजन स्थान (Venue)**: बुखारेस्ट, रोमानिया (Bucharest, Romania)" }],
          },
          {
            _key: "b2-3", _type: "block", style: "normal",
            children: [{ _key: "s2-3", _type: "span", text: "• **आयोजन अवधि (Dates)**: 26 जुलाई से 2 अगस्त 2026 तक" }],
          },
          {
            _key: "b2-4", _type: "block", style: "normal",
            children: [{ _key: "s2-4", _type: "span", text: "• **प्रतियोगिता का नाम**: 23वाँ International Linguistics Olympiad (IOL 2026)" }],
          },
          {
            _key: "b2-5", _type: "block", style: "normal",
            children: [{ _key: "s2-5", _type: "span", text: "• **भागीदारी (Participation)**: 46 देशों की 65 टीमों के 255 मेधावी स्कूली छात्र।" }],
          },
          {
            _key: "b2-6", _type: "block", style: "normal",
            children: [{ _key: "s2-6", _type: "span", text: "• **भारतीय दल**: 8 सदस्यों का दल, जिसमें व्यक्तिगत प्रतियोगिता में 5 पदक/सम्मान प्राप्त हुए।" }],
          },
          {
            _key: "b2-7", _type: "block", style: "h3",
            children: [{ _key: "s2-7", _type: "span", text: "भारतीय पदक विजेताओं की संपूर्ण सूची:" }],
          },
          {
            _key: "b2-8", _type: "block", style: "normal",
            children: [{ _key: "s2-8", _type: "span", text: "• **1. श्रीलक्ष्मी वेंकटरमन (Sreelakshmi Venkataraman)**: **स्वर्ण पदक (Gold Medal)** — 70.0 अंक हासिल कर सर्वोच्च उपलब्धि दर्ज की।" }]
          },
          {
            _key: "b2-9", _type: "block", style: "normal",
            children: [{ _key: "s2-9", _type: "span", text: "• **2. आरव अनिल राव (Aarav Anil Rao)**: **कांस्य पदक (Bronze Medal)**" }]
          },
          {
            _key: "b2-10", _type: "block", style: "normal",
            children: [{ _key: "s2-10", _type: "span", text: "• **3. निशांत शंकर लक्ष्मणन (Nishant Shankar Lakshmanan)**: **कांस्य पदक (Bronze Medal)**" }]
          },
          {
            _key: "b2-11", _type: "block", style: "normal",
            children: [{ _key: "s2-11", _type: "span", text: "• **4. अद्वय मिश्रा (Advay Mishra)**: **कांस्य पदक (Bronze Medal)**" }]
          },
          {
            _key: "b2-12", _type: "block", style: "normal",
            children: [{ _key: "s2-12", _type: "span", text: "• **5. सोहम अमित पेडणेकर (Soham Amit Pednekar)**: **Honourable Mention (ऑनरेबल मेंशन)**" }]
          },
          {
            _key: "b2-img-1", _type: "image",
            asset: { _type: "reference", _ref: assetWinnersId },
            alt: "Indian students celebrating gold and bronze medals with Indian national flag at IOL 2026 Bucharest",
          },
        ],
        bodyEn: [
          {
            _key: "b2-13", _type: "block", style: "h3",
            children: [{ _key: "s2-13", _type: "span", text: "1. Team India Performance at IOL 2026 Bucharest" }],
          },
          {
            _key: "b2-14", _type: "block", style: "normal",
            children: [{ _key: "s2-14", _type: "span", text: "• **Venue & Dates**: Bucharest, Romania (July 26 - August 2, 2026)." }],
          },
          {
            _key: "b2-15", _type: "block", style: "normal",
            children: [{ _key: "s2-15", _type: "span", text: "• **Gold Medalist**: Sreelakshmi Venkataraman (70.0 score)." }],
          },
          {
            _key: "b2-16", _type: "block", style: "normal",
            children: [{ _key: "s2-16", _type: "span", text: "• **Bronze Medalists**: Aarav Anil Rao, Nishant Shankar Lakshmanan, Advay Mishra." }],
          },
          {
            _key: "b2-17", _type: "block", style: "normal",
            children: [{ _key: "s2-17", _type: "span", text: "• **Honourable Mention**: Soham Amit Pednekar." }],
          },
        ],
      },

      /* ── 3. What is IOL & 5 Testing Domains ──────────────────── */
      {
        _key: "sec-what-is-iol-domains",
        kind: "keyAspects",
        title: "क्या है International Linguistics Olympiad? 5 प्रमुख भाषाई क्षेत्र",
        titleEn: "What is International Linguistics Olympiad? 5 Core Testing Domains",
        body: [
          {
            _key: "b3-1", _type: "block", style: "h3",
            children: [{ _key: "s3-1", _type: "span", text: "2. आईओएल का स्वरूप एवं परीक्षा पद्धति" }],
          },
          {
            _key: "b3-2", _type: "block", style: "normal",
            children: [{ _key: "s3-2", _type: "span", text: "• **IOL = International Linguistics Olympiad**: विश्व की 13 अंतर्राष्ट्रीय विज्ञान ओलंपियाडों में से एक प्रमुख वार्षिक प्रतियोगिता।" }],
          },
          {
            _key: "b3-3", _type: "block", style: "normal",
            children: [{ _key: "s3-3", _type: "span", text: "• **मूल्यांकन का आधार**: रटने की क्षमता के स्थान पर **तार्किक सोच (Logical Thinking), भाषा-विश्लेषण (Linguistic Analysis) और समस्या-समाधान कौशल (Problem-Solving Skills)**।" }],
          },
          {
            _key: "b3-4", _type: "block", style: "normal",
            children: [{ _key: "s3-4", _type: "span", text: "• **प्रश्नों की प्रकृति**: प्रतिभागियों को अपरिचित या प्राचीन भाषाओं के भाषाई आंकड़े दिए जाते हैं, जिनसे उन्हें व्याकरणिक नियम, वाक्य संरचनाएं एवं पैटर्न डिकोड करने होते हैं।" }],
          },
          {
            _key: "b3-5", _type: "block", style: "h3",
            children: [{ _key: "s3-5", _type: "span", text: "परीक्षा के 5 मुख्य भाषाई क्षेत्र (5 Domains):" }],
          },
          {
            _key: "b3-6", _type: "block", style: "normal",
            children: [{ _key: "s3-6", _type: "span", text: "• **1. ध्वनिविज्ञान (Phonetics/Phonology)**: ध्वनि प्रणालियों का विश्लेषण।" }]
          },
          {
            _key: "b3-7", _type: "block", style: "normal",
            children: [{ _key: "s3-7", _type: "span", text: "• **2. रूपविज्ञान (Morphology)**: शब्द रचना, उपसर्ग एवं प्रत्यय।" }]
          },
          {
            _key: "b3-8", _type: "block", style: "normal",
            children: [{ _key: "s3-8", _type: "span", text: "• **3. वाक्यविन्यास (Syntax)**: वाक्य विन्यास नियम एवं पदक्रम।" }]
          },
          {
            _key: "b3-9", _type: "block", style: "normal",
            children: [{ _key: "s3-9", _type: "span", text: "• **4. अर्थविज्ञान (Semantics)**: अर्थ संरचना एवं शब्द संबंध।" }]
          },
          {
            _key: "b3-10", _type: "block", style: "normal",
            children: [{ _key: "s3-10", _type: "span", text: "• **5. भाषा तुलना एवं पैटर्न पहचान (Language Comparison & Pattern Recognition)**: बहुभाषाई तुलना।" }]
          },
        ],
        bodyEn: [
          {
            _key: "b3-11", _type: "block", style: "h3",
            children: [{ _key: "s3-11", _type: "span", text: "2. Structure & Testing Domains of IOL" }],
          },
          {
            _key: "b3-12", _type: "block", style: "normal",
            children: [{ _key: "s3-12", _type: "span", text: "• **5 Domains**: Phonetics/Phonology, Morphology, Syntax, Semantics, and Language Comparison & Pattern Recognition." }],
          },
        ],
      },

      /* ── 4. PLO Selection & IIIT Hyderabad Role ──────────────── */
      {
        _key: "sec-plo-iiit-hyderabad-details",
        kind: "keyAspects",
        title: "भारत की टीम का चयन (PLO) एवं IIIT हैदराबाद LTRC की भूमिका",
        titleEn: "Selection via Panini Linguistics Olympiad (PLO) & IIIT Hyderabad LTRC",
        body: [
          {
            _key: "b4-1", _type: "block", style: "h3",
            children: [{ _key: "s4-1", _type: "span", text: "3. राष्ट्रीय चयन फनल (PLO Selection Funnel 2026)" }],
          },
          {
            _key: "b4-2", _type: "block", style: "normal",
            children: [{ _key: "s4-2", _type: "span", text: "• **PLO = Panini Linguistics Olympiad**: महान भारतीय वैयाकरण महर्षि पाणिनि के नाम पर आधारित राष्ट्रीय चयन प्रतियोगिता।" }],
          },
          {
            _key: "b4-3", _type: "block", style: "normal",
            children: [{ _key: "s4-3", _type: "span", text: "• **चयन फनल (Selection Funnel)**: 525 पंजीकृत छात्र -> 338 ओपन नेशनल क्वालिफाइंग राउंड -> 34 शीर्ष छात्र प्रशिक्षण शिविर हेतु -> 8 सदस्यीय अंतिम टीम।" }],
          },
          {
            _key: "b4-4", _type: "block", style: "normal",
            children: [{ _key: "s4-4", _type: "span", text: "• **प्रशिक्षण शिविर (Training Camp)**: **31 मई से 10 जून 2026** तक **IIIT Hyderabad के Language Technologies Research Centre (LTRC)** द्वारा संचालित।" }],
          },
          {
            _key: "b4-img-2", _type: "image",
            asset: { _type: "reference", _ref: assetTrainingId },
            alt: "High school students participating in Panini Linguistics Olympiad training workshop at IIIT Hyderabad LTRC",
          },
        ],
        bodyEn: [
          {
            _key: "b4-5", _type: "block", style: "h3",
            children: [{ _key: "s4-5", _type: "span", text: "3. Selection Process via PLO & Training Camp" }],
          },
          {
            _key: "b4-6", _type: "block", style: "normal",
            children: [{ _key: "s4-6", _type: "span", text: "• **PLO**: Panini Linguistics Olympiad, national qualifier for Team India." }],
          },
          {
            _key: "b4-7", _type: "block", style: "normal",
            children: [{ _key: "s4-7", _type: "span", text: "• **IIIT Hyderabad LTRC**: Language Technologies Research Centre at IIIT Hyderabad conducted the intensive training camp from May 31 to June 10, 2026." }],
          },
        ],
      },

      /* ── 5. AI, NLP & Computational Linguistics Relevance ───── */
      {
        _key: "sec-ai-nlp-relevance",
        kind: "analysis",
        title: "क्यों महत्वपूर्ण है? AI, NLP एवं पाणिनि व्याकरण की प्रासंगिकता",
        titleEn: "Relevance to Artificial Intelligence (AI), NLP & Panini Grammar",
        body: [
          {
            _key: "b5-1", _type: "block", style: "h3",
            children: [{ _key: "s5-1", _type: "span", text: "4. भाषाविज्ञान का तकनीक एवं कृत्रिम बुद्धिमत्ता (AI) से संबंध" }],
          },
          {
            _key: "b5-2", _type: "block", style: "normal",
            children: [{ _key: "s5-2", _type: "span", text: "• **AI एवं NLP में योगदान**: भाषाविज्ञान में विकसित विश्लेषणात्मक क्षमता **Artificial Intelligence (AI), Natural Language Processing (NLP) तथा Computational Linguistics** का आधार है।" }],
          },
          {
            _key: "b5-3", _type: "block", style: "normal",
            children: [{ _key: "s5-3", _type: "span", text: "• **महर्षि पाणिनि का योगदान**: 'अष्टाध्यायी' विश्व का पहला नियम-आधारित जनरेटिव व्याकरण (Rule-Based Generative Grammar) है, जो आधुनिक प्रोग्रामिंग और भाषा मॉडल (LLMs) की प्रेरणा है।" }],
          },
          {
            _key: "b5-img-3", _type: "image",
            asset: { _type: "reference", _ref: assetAiNlpId },
            alt: "Graphic illustration connecting Paninian grammar syntax trees to Artificial Intelligence and Natural Language Processing NLP",
          },
        ],
        bodyEn: [
          {
            _key: "b5-4", _type: "block", style: "h3",
            children: [{ _key: "s5-4", _type: "span", text: "4. Connection to AI & Natural Language Processing" }],
          },
          {
            _key: "b5-5", _type: "block", style: "normal",
            children: [{ _key: "s5-5", _type: "span", text: "• Structural linguistic analysis directly powers NLP, AI Large Language Models (LLMs), and Machine Translation." }],
          },
        ],
      },

      /* ── 6. Bidirectional Interlinking Block ────────────────── */
      {
        _key: "sec-interlink-olympiads-scitech",
        kind: "keyAspects",
        title: "🔗 संबंधित अंतर्राष्ट्रीय ओलंपियाड एवं विज्ञान-प्रौद्योगिकी अध्ययन सामग्री (Related Olympiad Notes)",
        titleEn: "🔗 Related International Olympiads & Science Notes",
        body: [
          {
            _key: "b-il-1", _type: "block", style: "normal",
            children: [
              { _key: "s-il-1", _type: "span", text: "• **अंतर्राष्ट्रीय भौतिकी ओलंपियाड 2026**: " },
              { _key: "s-il-2", _type: "span", text: `[${iphoTitle}](${iphoUrl})` }
            ]
          },
          {
            _key: "b-il-2", _type: "block", style: "normal",
            children: [
              { _key: "s-il-3", _type: "span", text: "• **कृत्रिम बुद्धिमत्ता एवं सुपरकंप्यूटिंग भारत**: " },
              { _key: "s-il-4", _type: "span", text: `[${paramPragyaTitle}](${paramPragyaUrl})` }
            ]
          }
        ],
        bodyEn: [
          {
            _key: "b-il-5", _type: "block", style: "normal",
            children: [
              { _key: "s-il-5", _type: "span", text: "• **International Physics Olympiad (IPhO 2026)**: " },
              { _key: "s-il-6", _type: "span", text: `[${iphoTitle}](${iphoUrl})` }
            ]
          }
        ]
      },

      /* ── 7. Exam Quick Revision Sheet ───────────────────────── */
      {
        _key: "sec-mppsc-quick-facts-iol",
        kind: "mppscNotes",
        title: "परीक्षा के लिए महत्वपूर्ण तथ्य (MPPSC & UPSC Key Facts Sheet)",
        titleEn: "Key Exam Facts for MPPSC & UPSC Civil Services",
        body: [
          {
            _key: "b6-1", _type: "block", style: "h3",
            children: [{ _key: "s6-1", _type: "span", text: "5. आईओएल 2026 परीक्षा उपयोगी स्मरण बिंदु" }],
          },
          {
            _key: "b6-2", _type: "block", style: "normal",
            children: [{ _key: "s6-2", _type: "span", text: "• **स्थान एवं तिथियाँ**: बुखारेस्ट, रोमानिया (26 जुलाई से 2 अगस्त 2026)" }]
          },
          {
            _key: "b6-3", _type: "block", style: "normal",
            children: [{ _key: "s6-3", _type: "span", text: "• **संस्करण**: 23वाँ (23rd Edition)" }]
          },
          {
            _key: "b6-4", _type: "block", style: "normal",
            children: [{ _key: "s6-4", _type: "span", text: "• **भारत की पहली भागीदारी**: 2009" }]
          },
          {
            _key: "b6-5", _type: "block", style: "normal",
            children: [{ _key: "s6-5", _type: "span", text: "• **2026 पदक तालिका**: 1 Gold + 3 Bronze + 1 Honourable Mention" }]
          },
          {
            _key: "b6-6", _type: "block", style: "normal",
            children: [{ _key: "s6-6", _type: "span", text: "• **स्वर्ण पदक विजेता**: श्रीलक्ष्मी वेंकटरमन (70.0 अंक)" }]
          },
          {
            _key: "b6-7", _type: "block", style: "normal",
            children: [{ _key: "s6-7", _type: "span", text: "• **राष्ट्रीय चयन**: पाणिनि लिंग्विस्टिक्स ओलंपियाड (PLO)" }]
          },
          {
            _key: "b6-8", _type: "block", style: "normal",
            children: [{ _key: "s6-8", _type: "span", text: "• **प्रशिक्षण संस्थान**: IIIT Hyderabad (LTRC)" }]
          },
          {
            _key: "b6-9", _type: "block", style: "normal",
            children: [{ _key: "s6-9", _type: "span", text: "• **2026 कुल प्रतिभागी**: 46 देशों के 255 छात्र" }]
          },
        ],
        bodyEn: [
          {
            _key: "b6-10", _type: "block", style: "h3",
            children: [{ _key: "s6-10", _type: "span", text: "5. Quick Revision Points" }],
          },
          {
            _key: "b6-11", _type: "block", style: "normal",
            children: [{ _key: "s6-11", _type: "span", text: "• **Venue & Dates**: Bucharest, Romania (July 26 - Aug 2, 2026)" }]
          },
          {
            _key: "b6-12", _type: "block", style: "normal",
            children: [{ _key: "s6-12", _type: "span", text: "• **Tally**: 1 Gold, 3 Bronze, 1 Honourable Mention" }]
          },
        ],
      },
    ],

    /* ─── MCQs (EXACTLY 8 HIGH QUALITY MCQs FOR CURRENT AFFAIRS) ── */
    mcqs: [
      {
        question: "International Linguistics Olympiad 2026 में भारत के लिए स्वर्ण पदक किसने जीता?",
        questionEn: "Who won the Gold Medal for India at the International Linguistics Olympiad 2026?",
        options: ["आरव अनिल राव", "अद्वय मिश्रा", "श्रीलक्ष्मी वेंकटरमन", "सोहम अमित पेडणेकर"],
        optionsEn: ["Aarav Anil Rao", "Advay Mishra", "Sreelakshmi Venkataraman", "Soham Amit Pednekar"],
        correctIndex: 2,
        explanation: "श्रीलक्ष्मी वेंकटरमन (Sreelakshmi Venkataraman) ने बुखारेस्ट, रोमानिया में आयोजित 23वें अंतर्राष्ट्रीय भाषाविज्ञान ओलंपियाड (IOL 2026) में 70.0 अंक हासिल कर भारत के लिए स्वर्ण पदक जीता।",
        explanationEn: "Sreelakshmi Venkataraman scored 70.0 points to win the Gold Medal for India at the 23rd International Linguistics Olympiad (IOL 2026) in Bucharest, Romania."
      },
      {
        question: "23वें अंतर्राष्ट्रीय भाषाविज्ञान ओलंपियाड (IOL 2026) का आयोजन 26 जुलाई से 2 अगस्त 2026 तक किस स्थान पर किया गया?",
        questionEn: "Where was the 23rd International Linguistics Olympiad (IOL 2026) held from July 26 to August 2, 2026?",
        options: ["पेरिस, फ्रांस", "बुखारेस्ट, रोमानिया", "टोक्यो, जापान", "जेनेवा, स्विट्जरलैंड"],
        optionsEn: ["Paris, France", "Bucharest, Romania", "Tokyo, Japan", "Geneva, Switzerland"],
        correctIndex: 1,
        explanation: "IOL 2026 का आयोजन रोमानिया की राजधानी बुखारेस्ट में 26 जुलाई से 2 अगस्त 2026 तक किया गया था, जिसमें 46 देशों के 255 प्रतिभागियों ने हिस्सा लिया।",
        explanationEn: "The 23rd IOL 2026 was hosted in Bucharest, Romania from July 26 to August 2, 2026."
      },
      {
        question: "अंतर्राष्ट्रीय भाषाविज्ञान ओलंपियाड (IOL) हेतु भारतीय टीम का चयन किस राष्ट्रीय प्रतियोगिता के माध्यम से किया जाता है?",
        questionEn: "Through which national competition is the Indian team selected for the International Linguistics Olympiad (IOL)?",
        options: ["आर्यभट्ट गणित ओलंपियाड", "पाणिनि लिंग्विस्टिक्स ओलंपियाड (PLO)", "भास्कर भाषा ओलंपियाड", "राष्ट्रीय विज्ञान ओलंपियाड (NSO)"],
        optionsEn: ["Aryabhata Mathematics Olympiad", "Panini Linguistics Olympiad (PLO)", "Bhaskara Language Olympiad", "National Science Olympiad (NSO)"],
        correctIndex: 1,
        explanation: "भारतीय टीम का चयन 'पाणिनि लिंग्विस्टिक्स ओलंपियाड' (Panini Linguistics Olympiad - PLO) के माध्यम से किया जाता है।",
        explanationEn: "The Indian squad for IOL is selected through the Panini Linguistics Olympiad (PLO)."
      },
      {
        question: "IOL 2026 की भारतीय टीम के लिए राष्ट्रीय प्रशिक्षण शिविर का आयोजन किस संस्थान के LTRC सेंटर द्वारा किया गया?",
        questionEn: "The national training camp for Team India IOL 2026 was conducted by the LTRC center of which institute?",
        options: ["IIT बॉम्बे", "IIIT हैदराबाद", "TIFR मुंबई", "IISc बेंगलुरु"],
        optionsEn: ["IIT Bombay", "IIIT Hyderabad", "TIFR Mumbai", "IISc Bengaluru"],
        correctIndex: 1,
        explanation: "भारतीय टीम के प्रशिक्षण शिविर का संचालन IIIT Hyderabad के Language Technologies Research Centre (LTRC) द्वारा 31 मई से 10 जून 2026 तक किया गया था।",
        explanationEn: "The training camp was conducted by the Language Technologies Research Centre (LTRC) at IIIT Hyderabad."
      },
      {
        question: "23वें अंतर्राष्ट्रीय भाषाविज्ञान ओलंपियाड (IOL 2026) में भारत का कुल प्रदर्शन क्या रहा?",
        questionEn: "What was India's overall medal performance at the 23rd International Linguistics Olympiad (IOL 2026)?",
        options: ["2 स्वर्ण + 2 रजत", "1 स्वर्ण + 3 कांस्य + 1 ऑनरेबल मेंशन", "3 स्वर्ण + 1 कांस्य", "2 रजत + 3 कांस्य"],
        optionsEn: ["2 Gold + 2 Silver", "1 Gold + 3 Bronze + 1 Honourable Mention", "3 Gold + 1 Bronze", "2 Silver + 3 Bronze"],
        correctIndex: 1,
        explanation: "भारत ने IOL 2026 में कुल 1 स्वर्ण पदक, 3 कांस्य पदक तथा 1 ऑनरेबल मेंशन प्राप्त किया।",
        explanationEn: "India won 1 Gold, 3 Bronze medals, and 1 Honourable Mention at IOL 2026."
      },
      {
        question: "भारत ने अंतर्राष्ट्रीय भाषाविज्ञान ओलंपियाड (IOL) में पहली बार किस वर्ष भाग लिया था?",
        questionEn: "In which year did India participate in the International Linguistics Olympiad (IOL) for the first time?",
        options: ["2001", "2009", "2014", "2020"],
        optionsEn: ["2001", "2009", "2014", "2020"],
        correctIndex: 1,
        explanation: "भारत ने अंतर्राष्ट्रीय भाषाविज्ञान ओलंपियाड (IOL) में पहली बार वर्ष 2009 में भाग लिया था।",
        explanationEn: "India first participated in the International Linguistics Olympiad in 2009."
      },
      {
        question: "अंतर्राष्ट्रीय भाषाविज्ञान ओलंपियाड (IOL) में मुख्य रूप से किस कौशल की परीक्षा ली जाती है?",
        questionEn: "What primary skill is evaluated in the International Linguistics Olympiad (IOL)?",
        options: ["विदेशी भाषाओं को रटने की क्षमता", "तार्किक सोच, भाषाई पैटर्न विश्लेषण एवं समस्या-समाधान", "केवल संस्कृत व्याकरण का ज्ञान", "साहित्यिक निबंध लेखन"],
        optionsEn: ["Rote memorization of foreign languages", "Logical reasoning, linguistic pattern analysis & problem solving", "Only knowledge of Sanskrit grammar", "Literary essay writing"],
        correctIndex: 1,
        explanation: "IOL में किसी भाषा के पूर्व ज्ञान या रटने के बजाय अपरिचित भाषाओं के डेटा के आधार पर तार्किक सोच, भाषा-विश्लेषण और समस्या-समाधान कौशल की परीक्षा ली जाती है।",
        explanationEn: "IOL tests logical analytical reasoning and pattern recognition using unfamiliar linguistic data."
      },
      {
        question: "भाषाविज्ञान ओलंपियाड में विकसित होने वाली तार्किक क्षमता मुख्य रूप से किस तकनीक क्षेत्र में अत्यंत उपयोगी है?",
        questionEn: "The analytical skill developed through linguistics olympiads is directly applicable in which technology domain?",
        options: ["आर्टिफिशियल इंटेलिजेंस (AI) एवं प्राकृतिक भाषा प्रसंस्करण (NLP)", "नाभिकीय भौतिकी", "ऑटोमोबाइल डिजाइनिंग", "समुद्री जीवविज्ञान"],
        optionsEn: ["Artificial Intelligence (AI) & Natural Language Processing (NLP)", "Nuclear Physics", "Automobile Designing", "Marine Biology"],
        correctIndex: 0,
        explanation: "भाषाई संरचना और पैटर्न विश्लेषण कौशल AI, नेचुरल लैंग्वेज प्रोसेसिंग (NLP), कम्प्यूटेशनल लिंग्विस्टिक्स और बड़े भाषा मॉडल (LLMs) के विकास में अत्यंत महत्वपूर्ण है।",
        explanationEn: "Linguistic structural analysis directly powers Artificial Intelligence (AI) and Natural Language Processing (NLP)."
      }
    ],

    /* ─── FAQs ──────────────────────────────────────────────── */
    faqs: [
      {
        question: "23वां International Linguistics Olympiad (IOL 2026) कब और कहाँ आयोजित हुआ?",
        questionEn: "When and where was the 23rd International Linguistics Olympiad (IOL 2026) held?",
        answer: "23वां IOL 2026 बुखारेस्ट, रोमानिया (Bucharest, Romania) में 26 जुलाई से 2 अगस्त 2026 तक आयोजित किया गया। इसमें 46 देशों के 255 प्रतियोगियों ने भाग लिया।",
        answerEn: "The 23rd IOL 2026 was held in Bucharest, Romania from July 26 to August 2, 2026, featuring 255 contestants from 46 countries."
      },
      {
        question: "IOL 2026 में भारत के लिए स्वर्ण पदक किसने जीता?",
        questionEn: "Who won the Gold Medal for India at IOL 2026?",
        answer: "श्रीलक्ष्मी वेंकटरमन (Sreelakshmi Venkataraman) ने 70.0 अंकों के साथ भारत के लिए स्वर्ण पदक जीता।",
        answerEn: "Sreelakshmi Venkataraman won the Gold Medal for India with a score of 70.0 points."
      },
      {
        question: "International Linguistics Olympiad (IOL) 2026 में भारत का कुल प्रदर्शन क्या रहा?",
        questionEn: "What was India's total performance at IOL 2026?",
        answer: "भारत ने कुल 1 स्वर्ण (श्रीलक्ष्मी वेंकटरमन), 3 कांस्य पदक (आरव अनिल राव, निशांत शंकर लक्ष्मणन, अद्वय मिश्रा) तथा 1 ऑनरेबल मेंशन (सोहम अमित पेडणेकर) हासिल किया।",
        answerEn: "India won 1 Gold, 3 Bronze medals, and 1 Honourable Mention at IOL 2026."
      },
      {
        question: "पाणिनि लिंग्विस्टिक्स ओलंपियाड (PLO) क्या है?",
        questionEn: "What is the Panini Linguistics Olympiad (PLO)?",
        answer: "पाणिनि लिंग्विस्टिक्स ओलंपियाड (PLO) भारत की राष्ट्रीय प्रतियोगिता है, जिसके माध्यम से IOL हेतु भारतीय दल का चयन किया जाता है। 2026 में इसमें 525 छात्रों ने पंजीकरण कराया था।",
        answerEn: "PLO is India's national selection competition for IOL, named after ancient grammarian Maharishi Panini."
      },
      {
        question: "IOL हेतु भारतीय टीम का प्रशिक्षण शिविर कहाँ आयोजित किया गया?",
        questionEn: "Where was the training camp for Team India conducted?",
        answer: "IIIT Hyderabad के Language Technologies Research Centre (LTRC) द्वारा 31 मई से 10 जून 2026 तक भारतीय टीम के लिए विशेष प्रशिक्षण शिविर आयोजित किया गया था।",
        answerEn: "The Language Technologies Research Centre (LTRC) at IIIT Hyderabad conducted the intensive training camp from May 31 to June 10, 2026."
      },
      {
        question: "भाषाविज्ञान का आर्टिफिशियल इंटेलिजेंस (AI) में क्या महत्व है?",
        questionEn: "What is the significance of linguistics in Artificial Intelligence (AI)?",
        answer: "भाषाविज्ञान का तार्किक ढांचा AI, नेचुरल लैंग्वेज प्रोसेसिंग (NLP), कम्प्यूटेशनल लिंग्विस्टिक्स और ChatGPT / Gemini जैसे बड़े भाषा मॉडलों (LLMs) के विकास की मूल नींव है।",
        answerEn: "Linguistic structures form the core foundation for Natural Language Processing (NLP), Computational Linguistics, and AI Large Language Models."
      }
    ],

    /* ─── Sources ────────────────────────────────────────────── */
    sources: [
      { label: "International Linguistics Olympiad (IOL Official)", url: "https://ioling.org" },
      { label: "IIIT Hyderabad Language Technologies Research Centre (LTRC)", url: "https://ltrc.iiit.ac.in" },
      { label: "Panini Linguistics Olympiad (PLO Portal)", url: "https://plo.iiit.ac.in" }
    ]
  };

  const gkArticle = {
    ...caArticle,
    _id: iolDocIdGk,
    _type: "staticGk",
  };

  try {
    console.log("📤 Updating caArticle in Sanity...");
    await client.createOrReplace(caArticle);
    console.log(`✔ Successfully updated ${iolDocIdCa}`);

    console.log("📤 Updating gkArticle in Sanity...");
    await client.createOrReplace(gkArticle);
    console.log(`✔ Successfully updated ${iolDocIdGk}`);

    // Interlink IOL article into IPhO article as well
    const iphoDoc: any = await client.getDocument("ca-ipho-2026-gold-medals");
    if (iphoDoc) {
      const sections = iphoDoc.sections || [];
      const interlinkBlock = {
        _key: "sec-interlink-iol-2026",
        kind: "keyAspects",
        title: "🔗 अंतर्राष्ट्रीय भाषाविज्ञान ओलंपियाड 2026 (IOL 2026 Notes)",
        titleEn: "🔗 International Linguistics Olympiad 2026 Notes",
        body: [
          {
            _key: "b-iol-1", _type: "block", style: "normal",
            children: [
              { _key: "s-iol-1", _type: "span", text: "• **रोमानिया में भारत का स्वर्णिम प्रदर्शन**: " },
              { _key: "s-iol-2", _type: "span", text: `[${iolTitle}](${iolUrl})` }
            ]
          }
        ],
        bodyEn: [
          {
            _key: "b-iol-3", _type: "block", style: "normal",
            children: [
              { _key: "s-iol-3", _type: "span", text: "• **International Linguistics Olympiad (IOL 2026)**: " },
              { _key: "s-iol-4", _type: "span", text: `[${iolTitle}](${iolUrl})` }
            ]
          }
        ]
      };
      const filtered = sections.filter((s: any) => s._key !== "sec-interlink-iol-2026");
      filtered.push(interlinkBlock);
      await client.patch("ca-ipho-2026-gold-medals").set({ sections: filtered }).commit();
      console.log("✔ Updated bidirectional interlink in ca-ipho-2026-gold-medals");
    }

    console.log("✨ Successfully completed SEO Top-Rank & Bidirectional Interlinking for IOL 2026!");
  } catch (err) {
    console.error("❌ Error updating Sanity documents:", err);
  }
}

main().catch((err) => {
  console.error("❌ Script error:", err);
  process.exit(1);
});
