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

// Helper to convert array of strings to Portable Text blocks
function createBlocks(items: string[]): any[] {
  return items.map((text, idx) => {
    const randomSuffix = Math.random().toString(36).substring(2, 9);
    if (text.startsWith("### ")) {
      return {
        _key: `block-h-${idx}-${randomSuffix}`,
        _type: "block",
        style: "h3",
        children: [
          {
            _key: `span-h-${idx}-${randomSuffix}`,
            _type: "span",
            text: text.replace("### ", ""),
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

// Helper to create table block
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
  console.log("🚀 Starting SEO & AI Search Engine Optimization for Ariha Pangambam Article...");

  // Comprehensive PASF Target Keywords
  const pasfKeywords = [
    // Google "People Also Search For" Exact Terms
    "Aerobic gymnastics asian championships winners",
    "Aerobic gymnastics asian championships results",
    "Asian Gymnastics Championships 2026",
    "Asian Gymnastics Championships 2026 results",
    "Asian Gymnastics Championships 2026 schedule",
    "Asian Artistic Gymnastics Championships 2026 Results",
    "2026 Asian Men's Artistic Gymnastics Championships",
    "Asian gymnastics union",

    // Hindi & Regional Exam Target Terms
    "अरिहा पंगमबम जिम्नास्टिक परिणाम 2026",
    "एशियन एयरोबिक जिम्नास्टिक्स चैंपियनशिप 2026 विजेता",
    "एशियन जिम्नास्टिक्स यूनियन AGU नोट्स",
    "अरिहा पंगमबम मणिपुर स्वर्ण पदक",
    "सीनियर एयरो स्टेप कांस्य पदक भारत",
    "MPPSC Sports Current Affairs 2026 Notes",
    "UPSC Gymnastics Asian Championships 2026"
  ];

  // Direct Answers / Results Summary Section (Targeting Google Snippets & AI Search)
  const resultsDirectSection = {
    _key: "sec-pasf-results-direct-answers",
    kind: "whyInNews",
    title: "एशियन एयरोबिक जिम्नास्टिक्स चैंपियनशिप 2026: परिणाम, विजेता एवं मुख्य बिंदु (Results & Winners)",
    titleEn: "Asian Aerobic Gymnastics Championships 2026: Results, Winners & Highlights",
    body: [
      ...createBlocks([
        "### एशियन एयरोबिक जिम्नास्टिक्स चैंपियनशिप 2026 (Asian Championships Results)",
        "• **प्रतियोगिता का नाम**: 10वीं एशियन एयरोबिक जिम्नास्टिक्स चैंपियनशिप 2026 (10th Asian Aerobic Gymnastics Championships).",
        "• **शासी संस्था (Governing Body)**: **एशियन जिम्नास्टिक्स यूनियन (AGU - Asian Gymnastics Union)**, जो अंतर्राष्ट्रीय जिम्नास्टिक्स संघ (FIG) से संबद्ध है।",
        "• **आयोजन स्थल व तिथि**: **4-7 अगस्त 2026**, तगाएताय सिटी (Tagaytay City, फिलीपींस)।",
        "• **भारत का पहला स्वर्णिम विजेता (Gold Medallist)**: मणिपुर की **अरिहा पंगमबम (Ariha Pangambam)** ने **सीनियर महिला व्यक्तिगत (Senior Individual Women)** स्पर्धा में **19.100** का ऐतिहासिक कुल स्कोर बनाकर भारत का पहला स्वर्ण पदक जीता।",
        "• **भारत का टीम कांस्य पदक (Team Bronze Medal)**: भारतीय टीम ने **सीनियर एयरो स्टेप (Senior Aero Step)** कैटेगरी में कांस्य पदक हासिल किया।",
        "### एयरोबिक बनाम आर्टिस्टिक जिम्नास्टिक्स में अंतर (Aerobic vs Artistic Gymnastics)",
        "• **एयरोबिक जिम्नास्टिक्स (Aerobic)**: संगीत की तीव्र गति पर ताकत, लचक और संतुलन का निरंतर गतिज प्रदर्शन। इसमें उपकरण नहीं होते।",
        "• **आर्टिस्टिक जिम्नास्टिक्स (Artistic Gymnastics)**: वाल्ट, अनइवन बार्स, बैलेंस बीम, फ्लोर (महिला) एवं पैरेलल बार्स, पोमेल हॉर्स, रिंग्स (पुरुष) जैसे उपकरणों का प्रयोग।"
      ]),
      createTable(
        "table-championship-results-2026-hi",
        "एशियन एयरोबिक जिम्नास्टिक्स चैंपियनशिप 2026: भारत का परिणाम कार्ड (India Results Sheet)",
        ["स्पर्धा (Event Category)", "एथलीट / टीम (Athlete/Team)", "पदक (Medal)", "अंतिम स्कोर (Final Score)"],
        [
          ["**सीनियर महिला व्यक्तिगत**", "अरिहा पंगमबम (Ariha Pangambam)", "🥇 स्वर्ण पदक (Gold)", "19.100 (Art: 8.650, Ex: 7.600, Diff: 2.850)"],
          ["**सीनियर एयरो स्टेप टीम**", "भारतीय सीनियर टीम (Indian Squad)", "🥉 कांस्य पदक (Bronze)", "एशियाई पोडियम तृतीय स्थान"]
        ]
      )
    ],
    bodyEn: [
      ...createBlocks([
        "### Asian Aerobic Gymnastics Championships 2026 Official Results",
        "• **Championship**: 10th Asian Aerobic Gymnastics Championships 2026.",
        "• **Governing Body**: **Asian Gymnastics Union (AGU)**.",
        "• **Venue & Dates**: August 4–7, 2026 in Tagaytay City, Philippines.",
        "• **Gold Medal Winner**: Ariha Pangambam (Manipur, India) with a score of 19.100.",
        "• **Bronze Medal Winner**: Indian Squad in Senior Aero Step category."
      ]),
      createTable(
        "table-championship-results-2026-en",
        "Asian Aerobic Gymnastics Championships 2026: India Results Sheet",
        ["Event Category", "Athlete/Team", "Medal Won", "Final Score"],
        [
          ["**Senior Women's Individual**", "Ariha Pangambam", "🥇 Gold Medal", "19.100 (Artistry: 8.650, Execution: 7.600, Difficulty: 2.850)"],
          ["**Senior Aero Step**", "Team India", "🥉 Bronze Medal", "Podium 3rd Position"]
        ]
      )
    ]
  };

  // Expanded FAQs covering all PASF search queries
  const expandedFaqs = [
    {
      question: "एशियन एयरोबिक जिम्नास्टिक्स चैंपियनशिप 2026 का परिणाम और विजेता कौन है?",
      questionEn: "What are the results and who is the gold medallist at the Asian Aerobic Gymnastics Championships 2026?",
      answer: "7 अगस्त 2026 को फिलीपींस में आयोजित 10वीं एशियन एयरोबिक जिम्नास्टिक्स चैंपियनशिप में भारत की अरिहा पंगमबम ने 19.100 अंक बनाकर सीनियर महिला व्यक्तिगत स्पर्धा में स्वर्ण पदक जीता। इसके अतिरिक्त भारत ने सीनियर एयरो स्टेप में कांस्य पदक जीता।",
      answerEn: "At the 10th Asian Championships in Philippines, India's Ariha Pangambam won Gold in Senior Women's Individual with 19.100 points, while India also won Bronze in Senior Aero Step."
    },
    {
      question: "एशियन जिम्नास्टिक्स यूनियन (AGU) क्या है और इसकी स्थापना कब हुई?",
      questionEn: "What is Asian Gymnastics Union (AGU) and when was it established?",
      answer: "एशियन जिम्नास्टिक्स यूनियन (AGU) पूरे एशिया महाद्वीप में जिम्नास्टिक्स खेलों की शासी निकाय है, जो 2009 से एशियन एयरोबिक जिम्नास्टिक्स चैंपियनशिप का संचालन कर रही है।",
      answerEn: "AGU is the continental governing body for gymnastics across Asia, organizing the Asian Championships since 2009."
    },
    {
      question: "पहली एशियन एयरोबिक जिम्नास्टिक्स चैंपियनशिप कहाँ आयोजित की गई थी?",
      questionEn: "Where was the inaugural Asian Aerobic Gymnastics Championship held?",
      answer: "पहली एशियन एयरोबिक जिम्नास्टिक्स चैंपियनशिप का आयोजन मार्च 2009 में बैंकॉक, थाईलैंड में किया गया था जिसमें 10 देशों ने भाग लिया था।",
      answerEn: "The 1st Asian Aerobic Gymnastics Championship took place in March 2009 in Bangkok, Thailand with 10 nations."
    },
    {
      question: "अरिहा पंगमबम कौन हैं और किस राज्य से संबंधित हैं?",
      questionEn: "Who is Ariha Pangambam and which state does she belong to?",
      answer: "अरिहा पंगमबम मणिपुर राज्य की रहने वाली 22 वर्षीया अंतर्राष्ट्रीय एयरोबिक जिम्नास्ट हैं, जिन्होंने 2023 और 2025 राष्ट्रीय खेलों में भी स्वर्ण पदक जीता है।",
      answerEn: "Ariha Pangambam is a 22-year-old international aerobic gymnast from Manipur, who also won Gold at the 2023 & 2025 National Games."
    },
    {
      question: "एयरोबिक जिम्नास्टिक्स और आर्टिस्टिक जिम्नास्टिक्स में क्या अंतर है?",
      questionEn: "What is the difference between Aerobic Gymnastics and Artistic Gymnastics?",
      answer: "एयरोबिक जिम्नास्टिक्स में बिना उपकरणों के संगीत की धुन पर निरंतर गतिज शारीरिक तालमेल दिखाया जाता है, जबकि आर्टिस्टिक जिम्नास्टिक्स में वाल्ट, बीम, पैरेलल बार्स जैसे उपकरणों का उपयोग होता है।",
      answerEn: "Aerobic gymnastics emphasizes continuous dynamic routine to music without apparatus, whereas artistic gymnastics uses apparatus like vault, uneven bars, and parallel bars."
    },
    {
      question: "अरिहा पंगमबम के मुख्य कोच कौन हैं?",
      questionEn: "Who is the coach of Ariha Pangambam?",
      answer: "अरिहा पंगमबम के मुख्य कोच युमनाम रंजन सिंह (Yumnam Ranjan Singh) हैं।",
      answerEn: "Ariha Pangambam trains under coach Yumnam Ranjan Singh."
    },
    {
      question: "अरिहा पंगमबम खेल के साथ किस क्षेत्र में पढ़ाई कर रही हैं?",
      questionEn: "What higher studies is Ariha Pangambam pursuing?",
      answer: "वह AISTS India से स्पोर्ट्स लीडरशिप व स्पोर्ट्स मैनेजमेंट में Post-Graduate Certificate प्राप्त कर रही हैं।",
      answerEn: "She is pursuing a Post-Graduate Certificate in Sports Management & Leadership from AISTS India."
    }
  ];

  // Fetch current documents
  const caDoc = await client.getDocument("ca-ariha-pangambam-asian-gymnastics-gold-2026");
  const gkDoc = await client.getDocument("gk-ariha-pangambam-asian-gymnastics-gold-2026");

  if (caDoc) {
    console.log("✔ Found existing ca-ariha-pangambam document. Applying PASF & SEO enhancements...");

    const updatedSections = [
      resultsDirectSection,
      ...(caDoc.sections as any[] || []).filter(s => s._key !== "sec-pasf-results-direct-answers")
    ];

    const updatedCaDoc = {
      ...caDoc,
      title: "अरिहा पंगमबम: एशियन एयरोबिक जिम्नास्टिक्स चैंपियनशिप 2026 में भारत का पहला स्वर्ण पदक | परिणाम, विजेता व MPPSC नोट्स",
      titleEn: "Ariha Pangambam: India's 1st Gold at Asian Aerobic Gymnastics Championships 2026 | Results, Winners & MPPSC Notes",
      excerpt: "7 अगस्त 2026 को मणिपुर की अरिहा पंगमबम ने 10वीं एशियन एयरोबिक जिम्नास्टिक्स चैंपियनशिप (AGU) में 19.100 स्कोर से स्वर्ण तथा भारत की सीनियर एयरो स्टेप टीम ने कांस्य पदक जीतकर इतिहास रचा।",
      excerptEn: "Ariha Pangambam wins India's historic 1st Gold Medal (19.100 Score) & Senior Aero Step team wins Bronze at 10th Asian Aerobic Gymnastics Championships 2026 in Philippines.",
      keywords: Array.from(new Set([...(caDoc.keywords as string[] || []), ...pasfKeywords])),
      sections: updatedSections,
      faqs: expandedFaqs,
    };

    await client.createOrReplace(updatedCaDoc);
    console.log("✨ Successfully updated Current Affairs document with top PASF SEO!");

    if (gkDoc) {
      const updatedGkDoc = {
        ...updatedCaDoc,
        _id: gkDoc._id,
        _type: "staticGk",
      };
      await client.createOrReplace(updatedGkDoc);
      console.log("✨ Successfully updated Static GK document with top PASF SEO!");
    }
  } else {
    console.error("❌ Document ca-ariha-pangambam-asian-gymnastics-gold-2026 not found!");
  }
}

main().catch((err) => {
  console.error("❌ Error optimizing SEO:", err);
  process.exit(1);
});
