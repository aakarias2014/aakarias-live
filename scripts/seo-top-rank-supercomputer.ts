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
  console.log("🚀 Starting SEO & AI Search Engine Optimization for Supercomputer Articles...");

  // Comprehensive Keyword Target Array covering all Google Autocomplete & PAA Queries
  const seoKeywords = [
    // Google Autocomplete & User Queries (Hinglish + Hindi + English)
    "bharat me super computer ka janak",
    "bharat me super computer kitne hai",
    "bharat me super computer kab aaya",
    "bharat me super computer ke janak kaun hai",
    "bharat me super computer kab bana",
    "भारत में सुपर कंप्यूटर के जनक",
    "भारत में सुपर कंप्यूटर का विकास",
    "भारत में सुपर कंप्यूटर कहां पर स्थित है",
    "भारत में सुपर कंप्यूटर का नाम",
    "super computer in india",
    "super computer kya hai",
    "super computer price",
    "super computer of india list",
    "super computer in hindi",
    "super computer in world",
    "supercomputer kise kahate hain",
    "super computer mppsc",
    "वर्तमान में भारत का सबसे तेज सुपर कंप्यूटर कौन सा है",
    "भारत में कौन सी कंपनी सुपर कंप्यूटर बनाती है",
    "भारत में सुपरकंप्यूटर का इतिहास क्या है",
    "Dr Vijay Bhatkar father of Indian supercomputing",
    "PARAM 8000 C-DAC Pune 1991",
    "AIRAWAT PARAM Siddhi AI TOP500",
    "PARAM Pragya AI Supercomputer IIT Delhi",
    "National Supercomputing Mission NSM 2015",
    "MPPSC Science & Technology Paper 3 Unit 7 Unit 10 Notes"
  ];

  // Google PAA & AI Search Direct Snippet Answers Section
  const paaDirectSectionHi = {
    _key: "sec-paa-direct-answers",
    kind: "whyInNews",
    title: "भारत में सुपरकंप्यूटर: मुख्य बिंदु एवं प्रश्नोत्तर (Key Facts)",
    titleEn: "Supercomputers in India: Key Facts & Overview",
    body: [
      ...createBlocks([
        "### 1. वर्तमान में भारत का सबसे तेज सुपर कंप्यूटर कौन सा है?",
        "• **उत्तर**: वर्तमान में भारत के सबसे शक्तिशाली सुपरकंप्यूटर **PARAM Pragya** (250 AI पेटाफ्लॉप्स - 2026 में IIT दिल्ली सोनीपत में स्थापित) तथा **AIRAWAT – PSAI** (13.17 पेटाफ्लॉप्स - C-DAC पुणे में स्थापित, जिसे जून 2023 TOP500 सूची में **75वाँ वैश्विक स्थान** मिला) हैं।",
        "### 2. भारत में सुपर कंप्यूटर के जनक कौन हैं?",
        "• **उत्तर**: भारत में सुपरकंप्यूटर के जनक (Father of Indian Supercomputers) महान वैज्ञानिक **डॉ. विजय भटकर (Dr. Vijay Bhatkar)** हैं। उन्होंने वर्ष 1988 में C-DAC की स्थापना के बाद 1991 में भारत का पहला स्वदेशी सुपरकंप्यूटर **PARAM 8000** विकसित किया था।",
        "### 3. भारत में कुल कितने सुपर कंप्यूटर हैं?",
        "• **उत्तर**: राष्ट्रीय सुपरकंप्यूटिंग मिशन (NSM) के तहत भारत में **15 से अधिक प्रमुख सुपरकंप्यूटर नोड्स** (जैसे PARAM Shivay, PARAM Pravega, PARAM Ananta, PARAM Pragya आदि) विभिन्न IITs और शोध संस्थानों में स्थापित हैं। इनमें से **4 सुपरकंप्यूटर** (AIRAWAT, PARAM Siddhi-AI, Pratyush और Mihir) अंतर्राष्ट्रीय **TOP500 सूची** में शामिल हैं।",
        "### 4. भारत में कौन सी कंपनी/संस्था सुपर कंप्यूटर बनाती है?",
        "• **उत्तर**: भारत में सुपरकंप्यूटर बनाने वाली मुख्य सरकारी संस्था **C-DAC (Centre for Development of Advanced Computing, मुख्यालय: पुणे)** है। इसके अतिरिक्त **BARC** (Anupam सीरीज), **ANURAG/DRDO** (PACE सीरीज), **C-DOT** (CHIPPS) और **NAL** भी सुपरकंप्यूटिंग प्रणालियाँ विकसित करती हैं।",
        "### 5. भारत में सुपरकंप्यूटर का इतिहास क्या है और पहला सुपरकंप्यूटर कब बना?",
        "• **उत्तर**: भारत में सुपरकंप्यूटिंग की शुरुआत **1987** में अमेरिका द्वारा Cray X-MP सुपरकंप्यूटर देने से मना करने के बाद हुई। इसके जवाब में भारत ने 1988 में C-DAC की स्थापना की और **1991 में भारत का पहला स्वदेशी सुपरकंप्यूटर PARAM 8000** सफलतापूर्वक बनाया।"
      ]),
      createTable(
        "table-paa-summary-hi",
        "भारत के प्रमुख सुपरकंप्यूटर: नाम, स्थान और क्षमता (India Supercomputer Summary List)",
        ["सुपरकंप्यूटर का नाम (Name)", "स्थापना स्थल (Location)", "क्षमता / वैश्विक रैंक (Capacity / Rank)", "विशेषता (Key Fact)"],
        [
          ["**PARAM 8000**", "C-DAC पुणे (1991)", "GigaFLOPS Range", "भारत का पहला स्वदेशी सुपरकंप्यूटर"],
          ["**AIRAWAT – PSAI**", "C-DAC पुणे (2023)", "13.17 Petaflops (Rank 75)", "TOP500 में भारत का शीर्ष सुपरकंप्यूटर"],
          ["**PARAM Siddhi-AI**", "C-DAC पुणे (2020)", "5.27 Petaflops (Rank 131)", "भारत का पहला समर्पित AI सुपरकंप्यूटर"],
          ["**PARAM Pragya**", "IIT दिल्ली सोनीपत (2026)", "250 AI Petaflops", "400 NVIDIA A100 GPUs से लैस नवीनतम AI फैसिलिटी"],
          ["**Pratyush (Cray XC40)**", "IITM पुणे", "4.01 Petaflops (Rank 169)", "मौसम व जलवायु पूर्वानुमान"],
          ["**Mihir (Cray XC40)**", "NCMRWF नोएडा", "2.81 Petaflops (Rank 316)", "मध्यम अवधि मौसम पूर्वानुमान"],
          ["**PARAM Shivay**", "IIT BHU वाराणसी (2020)", "Petascale Class", "NSM मिशन के तहत पहला सुपरकंप्यूटर"]
        ]
      )
    ],
    bodyEn: [
      ...createBlocks([
        "### 1. Which is the fastest supercomputer in India currently?",
        "• **Answer**: Currently, **PARAM Pragya** (250 AI Petaflops launched at IIT Delhi Sonipat in 2026) and **AIRAWAT – PSAI** (13.17 Petaflops peak at C-DAC Pune, ranked **75th globally** in June 2023 TOP500) are India's fastest AI supercomputing systems.",
        "### 2. Who is known as the Father of Indian Supercomputing?",
        "• **Answer**: **Dr. Vijay Bhatkar** is recognized as the Father of Indian Supercomputers. He led C-DAC to build India's 1st indigenous supercomputer **PARAM 8000 in 1991**.",
        "### 3. How many supercomputers are there in India?",
        "• **Answer**: India operates **over 15 major HPC supercomputers** under the National Supercomputing Mission (NSM) across premier institutes like IITs, IISc, and C-DAC, with **4 systems listed in global TOP500**.",
        "### 4. Which organization/company builds supercomputers in India?",
        "• **Answer**: **C-DAC (Centre for Development of Advanced Computing, Pune)** is the premier nodal agency building indigenous supercomputers in India under MeitY and DST.",
        "### 5. What is the history of supercomputing in India and when was the first supercomputer built?",
        "• **Answer**: Triggered by the 1987 US denial of Cray X-MP exports, India established C-DAC in 1988 and successfully developed **PARAM 8000 in 1991**."
      ]),
      createTable(
        "table-paa-summary-en",
        "Summary List of India's Major Supercomputers",
        ["Supercomputer", "Location & Year", "Capacity / Rank", "Key Highlight"],
        [
          ["**PARAM 8000**", "C-DAC Pune (1991)", "GigaFLOPS Range", "India's First Indigenous Supercomputer"],
          ["**AIRAWAT – PSAI**", "C-DAC Pune (2023)", "13.17 Petaflops (Rank 75)", "Highest Ranked Indian System in TOP500"],
          ["**PARAM Siddhi-AI**", "C-DAC Pune (2020)", "5.27 Petaflops (Rank 131)", "India's 1st Dedicated AI Supercomputer"],
          ["**PARAM Pragya**", "IIT Delhi Sonipat (2026)", "250 AI Petaflops", "Flagship AI Supercomputer with 400 A100 GPUs"],
          ["**Pratyush**", "IITM Pune", "4.01 Petaflops (Rank 169)", "Monsoon & Climate Research"],
          ["**Mihir**", "NCMRWF Noida", "2.81 Petaflops (Rank 316)", "Medium-Range Weather Prediction"]
        ]
      )
    ]
  };

  // Comprehensive 7 Collapsible FAQs for Google PAA Rich Snippets
  const expandedFaqs = [
    {
      question: "वर्तमान में भारत का सबसे तेज सुपर कंप्यूटर कौन सा है?",
      questionEn: "Which is India's fastest supercomputer currently?",
      answer: "अगस्त 2026 में स्थापित PARAM Pragya (250 AI पेटाफ्लॉप्स, IIT दिल्ली सोनीपत) तथा जून 2023 TOP500 रैंकिंग में 75वाँ स्थान प्राप्त AIRAWAT - PSAI (13.17 Petaflops, C-DAC पुणे) भारत के सबसे तेज सुपरकंप्यूटर हैं।",
      answerEn: "PARAM Pragya (250 AI Petaflops, IIT Delhi Sonipat) and AIRAWAT – PSAI (Rank 75 in TOP500, C-DAC Pune) are currently India's fastest AI supercomputers."
    },
    {
      question: "भारत में सुपर कंप्यूटर के जनक कौन हैं और पहला सुपरकंप्यूटर कब बना?",
      questionEn: "Who is the Father of Indian Supercomputers and when was the first one built?",
      answer: "भारत में सुपरकंप्यूटर के जनक डॉ. विजय भटकर हैं। उनके नेतृत्व में C-DAC पुणे ने वर्ष 1991 में भारत का पहला स्वदेशी सुपरकंप्यूटर 'PARAM 8000' सफलतापूर्वक विकसित किया था।",
      answerEn: "Dr. Vijay Bhatkar is the Father of Indian Supercomputing. Under his guidance, C-DAC Pune built India's first indigenous supercomputer 'PARAM 8000' in 1991."
    },
    {
      question: "भारत में कुल कितने सुपर कंप्यूटर हैं और TOP500 में कितने शामिल हैं?",
      questionEn: "How many supercomputers are there in India and how many are in TOP500?",
      answer: "राष्ट्रीय सुपरकंप्यूटिंग मिशन (NSM) के तहत भारत में 15 से अधिक प्रमुख सुपरकंप्यूटर नोड्स कार्यरत हैं। जून 2023 की अंतर्राष्ट्रीय TOP500 सूची में भारत के 4 सुपरकंप्यूटर (AIRAWAT, PARAM Siddhi-AI, Pratyush, Mihir) शामिल थे।",
      answerEn: "India operates over 15 major supercomputing nodes under NSM. In the June 2023 global TOP500 list, 4 Indian supercomputers (AIRAWAT, PARAM Siddhi-AI, Pratyush, Mihir) were featured."
    },
    {
      question: "भारत में कौन सी कंपनी या संस्था सुपर कंप्यूटर बनाती है?",
      questionEn: "Which organization or company manufactures supercomputers in India?",
      answer: "भारत में स्वदेशी सुपरकंप्यूटर बनाने की मुख्य नोडल संस्था C-DAC (Centre for Development of Advanced Computing, पुणे) है। इसके अलावा BARC (Anupam), DRDO-ANURAG (PACE) और C-DOT (CHIPPS) भी सुपरकंप्यूटर बनाती हैं।",
      answerEn: "C-DAC (Centre for Development of Advanced Computing, Pune) is India's premier nodal agency. BARC, DRDO-ANURAG, and C-DOT also engineer supercomputers."
    },
    {
      question: "सुपरकंप्यूटर क्या है और इसकी गति (Performance) किसमें मापी जाती है?",
      questionEn: "What is a supercomputer and in what unit is its processing speed measured?",
      answer: "सुपरकंप्यूटर अत्यधिक उच्च गति और समानांतर प्रसंस्करण (Parallel Processing) क्षमता वाले कंप्यूटर हैं। इनकी कार्यक्षमता FLOPS (Floating-Point Operations Per Second) में मापी जाती है।",
      answerEn: "Supercomputers are high-performance parallel computing systems. Speed is measured in FLOPS (Floating-Point Operations Per Second)."
    },
    {
      question: "राष्ट्रीय सुपरकंप्यूटिंग मिशन (NSM) क्या है और इसकी शुरुआत कब हुई थी?",
      questionEn: "What is National Supercomputing Mission (NSM) and when was it launched?",
      answer: "NSM की शुरुआत वर्ष 2015 में MeitY और DST द्वारा ₹4,500 करोड़ ($730 Million) के बजट से की गई थी। इसका उद्देश्य देश के शिक्षण संस्थानों को HPC ग्रिड से जोड़ना तथा 73 स्वदेशी सुपरकंप्यूटर स्थापित करना है।",
      answerEn: "NSM was launched in 2015 by MeitY and DST with a ₹4,500 Crore budget to build a national HPC grid connecting academic institutes."
    },
    {
      question: "दुनिया का सबसे शक्तिशाली सुपरकंप्यूटर कौन सा है?",
      questionEn: "Which is the world's most powerful supercomputer currently?",
      answer: "2026 की नवीनतम अंतर्राष्ट्रीय रैंकिंग के अनुसार, चीन का LineShine (2.19 Exaflops) तथा अमेरिका का Frontier और El Capitan विश्व के सबसे शक्तिशाली exascale सुपरकंप्यूटर हैं।",
      answerEn: "According to 2026 global rankings, China's LineShine (2.19 Exaflops) and US systems Frontier & El Capitan are the world's most powerful exascale supercomputers."
    }
  ];

  // Fetch current staticGk document
  const existingGk = await client.getDocument("gk-supercomputer-what-is-supercomputing-guide");
  if (existingGk) {
    console.log("✔ Found existing gk-supercomputer document. Applying SEO enhancements...");

    const updatedSections = [
      paaDirectSectionHi,
      ...(existingGk.sections as any[] || []).filter(s => s._key !== "sec-paa-direct-answers")
    ];

    const updatedGkDoc = {
      ...existingGk,
      title: "भारत में सुपर कंप्यूटर: जनक, इतिहास, सूची व विशेषताएँ | MPPSC & UPSC Notes (Supercomputers in India)",
      titleEn: "Supercomputers in India: History, Father of Supercomputing, Full List & Specs | MPPSC & UPSC Notes",
      excerpt: "भारत में सुपर कंप्यूटर के जनक डॉ. विजय भटकर, PARAM 8000 (1991), 1987 Cray X-MP प्रतिबंध, C-DAC, NSM (2015), AIRAWAT (Rank 75), PARAM Siddhi-AI और परम प्रज्ञा (250 AI Petaflops) का संपूर्ण विश्लेषण।",
      excerptEn: "Complete study guide covering Father of Indian Supercomputing Dr. Vijay Bhatkar, PARAM 8000 (1991), C-DAC, National Supercomputing Mission (NSM), AIRAWAT (Rank 75), and PARAM Pragya (250 AI Petaflops).",
      keywords: seoKeywords,
      sections: updatedSections,
      faqs: expandedFaqs,
    };

    await client.createOrReplace(updatedGkDoc);
    console.log("✨ Successfully updated Static GK document with top-tier SEO!");

    // Also sync to Current Affairs document
    const updatedCaDoc = {
      ...updatedGkDoc,
      _id: "ca-supercomputer-what-is-supercomputing-guide",
      _type: "currentAffairs",
    };
    await client.createOrReplace(updatedCaDoc);
    console.log("✨ Successfully updated Current Affairs document with top-tier SEO!");
  } else {
    console.error("❌ Document gk-supercomputer-what-is-supercomputing-guide not found!");
  }
}

main().catch((err) => {
  console.error("❌ Error optimizing SEO:", err);
  process.exit(1);
});
