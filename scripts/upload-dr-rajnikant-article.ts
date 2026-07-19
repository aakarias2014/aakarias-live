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

// Helper to convert an array of strings into separate Portable Text blocks
function createBlocks(items: string[]): any[] {
  return items.map((text, idx) => {
    const randomSuffix = Math.random().toString(36).substring(2, 9);
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

// Helper to create a custom block with a link
function createLinkBlock(textBefore: string, linkText: string, textAfter: string, url: string): any {
  const randomSuffix = Math.random().toString(36).substring(2, 9);
  return {
    _key: `block-link-${randomSuffix}`,
    _type: "block",
    style: "normal",
    children: [
      {
        _key: `span-before-${randomSuffix}`,
        _type: "span",
        text: textBefore,
      },
      {
        _key: `span-link-${randomSuffix}`,
        _type: "span",
        text: `[${linkText}](${url})`,
      },
      {
        _key: `span-after-${randomSuffix}`,
        _type: "span",
        text: textAfter,
      }
    ]
  };
}

// Helper to create a custom table block
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
  console.log("🚀 Starting upload process for Padmashree Dr. Rajnikant GI Man of India Article using real images...");

  // Image files uploaded by the user and local generated files
  const imagePaths = {
    banner: path.resolve(process.cwd(), "/Users/aakariastech/.gemini/antigravity-ide/brain/f3368bc5-9762-4cc4-a6af-e2c9e58d3968/media__1784201663723.jpg"), // President presenting Padmashree
    portrait: path.resolve(process.cwd(), "/Users/aakariastech/.gemini/antigravity-ide/brain/f3368bc5-9762-4cc4-a6af-e2c9e58d3968/media__1784201620338.png"), // Dr. Rajnikant Portrait
    crafts: path.resolve(process.cwd(), "/Users/aakariastech/.gemini/antigravity-ide/brain/f3368bc5-9762-4cc4-a6af-e2c9e58d3968/traditional_indian_crafts_1784201332181.png"), // Indian crafts
  };

  // Check if files exist
  if (!fs.existsSync(imagePaths.banner) || !fs.existsSync(imagePaths.portrait) || !fs.existsSync(imagePaths.crafts)) {
    console.error("❌ Required images not found in the paths!");
    process.exit(1);
  }

  // 1. Upload Banner Image (Dr. Rajnikant receiving Padmashree)
  console.log("📸 Uploading banner image...");
  const assetBanner = await client.assets.upload("image", fs.createReadStream(imagePaths.banner), {
    filename: "dr_rajnikant_padmashree_award.jpg",
  });
  console.log(`✔ Uploaded banner image. Asset ID: ${assetBanner._id}`);

  // 2. Upload Portrait Image (Dr. Rajnikant in red vest)
  console.log("📸 Uploading portrait image...");
  const assetPortrait = await client.assets.upload("image", fs.createReadStream(imagePaths.portrait), {
    filename: "dr_rajnikant_portrait.png",
  });
  console.log(`✔ Uploaded portrait image. Asset ID: ${assetPortrait._id}`);

  // 3. Upload Crafts Image (Indian crafts)
  console.log("📸 Uploading crafts image...");
  const assetCrafts = await client.assets.upload("image", fs.createReadStream(imagePaths.crafts), {
    filename: "traditional_indian_crafts.png",
  });
  console.log(`✔ Uploaded crafts image. Asset ID: ${assetCrafts._id}`);

  // 4. Construct the Article document with _type: "currentAffairs"
  const article = {
    _id: "ca-dr-rajnikant-gi-man-of-india",
    _type: "currentAffairs",
    slug: { _type: "slug", current: "dr-rajnikant-gi-man-of-india" },
    title: "पद्मश्री डॉ. रजनीकांत: 'GI Man of India' जिन्होंने भारत की पारंपरिक विरासत को दिलाई वैश्विक पहचान",
    titleEn: "Padmashree Dr. Rajnikant: The 'GI Man of India' Who Secured Global Recognition for India's Heritage",
    excerpt: "बनारसी साड़ी, दार्जिलिंग चाय और चंदेरी साड़ी जैसे पारंपरिक उत्पादों को भौगोलिक संकेतक (GI Tag) दिलाकर कानूनी सुरक्षा प्रदान करने में पद्मश्री डॉ. रजनीकांत का असाधारण योगदान रहा है। उन्हें भारत में 'GI Man of India' के रूप में सम्मानित किया जाता है।",
    excerptEn: "Padmashree Dr. Rajnikant, popularly known as the 'GI Man of India', has played a pioneering role in securing Geographical Indication (GI) tags for over 250 traditional Indian products, empowering rural artisans and farmers.",
    ca_date: "2026-07-16",
    publishedAt: new Date().toISOString(),
    featured: true,
    readingTime: 6,
    keywords: [
      "Dr Rajnikant GI Man of India",
      "Geographical Indications Registry Chennai",
      "Geographical Indications of Goods Act 1999",
      "Banarasi Saree GI Tag",
      "Darjeeling Tea First GI Tag India",
      "UPSC Intellectual Property Rights",
      "MPPSC GK Current Affairs",
      "पद्मश्री डॉ. रजनीकांत जीआई टैग",
      "जीआई मैन ऑफ इंडिया",
      "भौगोलिक संकेतक अधिनियम 1999"
    ],
    category: { _type: "reference", _ref: "cat-mpgk" }, // MP GK / General Knowledge subject category
    author: { _type: "reference", _ref: "author-aakar" },
    tags: [
      { _type: "reference", _ref: "tag-upsc" },
      { _type: "reference", _ref: "tag-mppsc" },
      { _type: "reference", _ref: "tag-prelims" },
      { _type: "reference", _ref: "tag-mains" },
      { _type: "reference", _ref: "tag-mp-ca" }, // MP Current Affairs
    ],
    syllabus: ["GS-3", "Prelims-GS"],
    featuredImage: {
      _type: "image",
      asset: { _type: "reference", _ref: assetBanner._id },
      alt: "Padmashree Dr. Rajnikant receiving the prestigious Padmashree award from the President of India",
    },
    sections: [
      /* Section 1: Context */
      {
        _key: "sec-context",
        kind: "whyInNews",
        title: "प्रसंग (Context)",
        titleEn: "Why in News?",
        body: createBlocks([
          "भारत की समृद्ध सांस्कृतिक, कृषि और हस्तशिल्प विरासत दुनिया में अपनी विशिष्ट पहचान रखती है। बनारसी साड़ी, कांचीपुरम सिल्क, चंदेरी साड़ी, महेश्वरी साड़ी, रतलामी सेव और बासमती चावल जैसे पारंपरिक उत्पाद केवल वस्तुएँ नहीं, बल्कि भारत की ऐतिहासिक धरोहर हैं। इन उत्पादों की मौलिकता को कानूनी सुरक्षा और वैश्विक प्रतिष्ठा प्रदान करने में पद्मश्री डॉ. रजनीकांत का योगदान मील का पत्थर रहा है। हाल ही में जबलपुर के दो प्रसिद्ध उत्पादों को जीआई टैग मिलने में भी उनकी महत्वपूर्ण विशेषज्ञ भूमिका रही है।"
        ]),
        bodyEn: createBlocks([
          "India's rich cultural, agricultural, and handicraft heritage holds a unique global position. Traditional specialties like Banarasi Saree, Kanchipuram Silk, Chanderi Saree, Maheshwari Saree, Ratlami Sev, and Basmati Rice are not just commodities but reflections of India's legacy. Padmashree Dr. Rajnikant, celebrated as the 'GI Man of India', has spent over two decades securing legal protection and global prestige for these indigenous crafts. His expertise was instrumental in recently securing GI tags for Jabalpur's local specialties."
        ]),
      },

      /* Section 2: Who is Dr. Rajnikant */
      {
        _key: "sec-who-is-he",
        kind: "background",
        title: "कौन हैं पद्मश्री डॉ. रजनीकांत?",
        titleEn: "Who is Padmashree Dr. Rajnikant?",
        body: [
          ...createBlocks([
            "पद्मश्री डॉ. रजनीकांत भारत के प्रसिद्ध बौद्धिक संपदा अधिकार (Intellectual Property Rights - IPR) विशेषज्ञ हैं। वे पिछले दो दशकों से अधिक समय से देश के पारंपरिक उत्पादों, हस्तशिल्प, हथकरघा, कृषि उत्पादों तथा ग्रामीण कारीगरों को Geographical Indication (GI) टैग दिलाने के लिए समर्पित हैं। उनके अथक प्रयासों के कारण भारत के सैकड़ों पारंपरिक उत्पादों को राष्ट्रीय एवं अंतरराष्ट्रीय स्तर पर नई पहचान मिली है। इसी असाधारण योगदान के लिए उन्हें वर्ष 2019 में भारत सरकार द्वारा प्रतिष्ठित पद्मश्री सम्मान से नवाजा गया।"
          ]),
          {
            _key: "who-is-he-img-portrait",
            _type: "image",
            asset: { _type: "reference", _ref: assetPortrait._id },
            alt: "Padmashree Dr. Rajnikant, the GI Man of India",
          }
        ],
        bodyEn: [
          ...createBlocks([
            "Padmashree Dr. Rajnikant is India's foremost Intellectual Property Rights (IPR) expert specializing in Geographical Indications (GI). For over twenty years, he has dedicated himself to safeguarding traditional crafts, handlooms, and farm produce by helping local cooperative societies, self-help groups, and FPOs register their products under the GI Registry. In recognition of his outstanding contributions to rural revival and heritage preservation, the Government of India honored him with the Padmashree award in 2019."
          ]),
          {
            _key: "who-is-he-img-portrait-en",
            _type: "image",
            asset: { _type: "reference", _ref: assetPortrait._id },
            alt: "Padmashree Dr. Rajnikant, the GI Man of India",
          }
        ],
      },

      /* Section 3: Why called GI Man of India */
      {
        _key: "sec-gi-man",
        kind: "keyHighlights",
        title: "उन्हें 'GI Man of India' क्यों कहा जाता है?",
        titleEn: "Why is He Called the 'GI Man of India'?",
        body: [
          ...createBlocks([
            "डॉ. रजनीकांत को भारत में जीआई आंदोलन को मुख्यधारा में लाने का प्रमुख श्रेय दिया जाता है:",
            "• 250 से अधिक GI पंजीकरण: उन्होंने वर्ष 2007 से इस अभियान की शुरुआत की और तब से अब तक देश के 250 से अधिक जीआई पंजीकरण आवेदनों की प्रक्रिया का सफल नेतृत्व किया है।",
            "• पारंपरिक धरोहरों का संरक्षण: हस्तशिल्प, हथकरघा और जैविक कृषि उत्पादों का व्यापक दस्तावेजीकरण कर उनकी नकल को रोका है।"
          ]),
          {
            _key: "b3-img-crafts",
            _type: "image",
            asset: { _type: "reference", _ref: assetCrafts._id },
            alt: "A beautiful display of Indian GI-tagged products including a Banarasi silk saree and a wooden box of Darjeeling tea",
          },
          createLinkBlock(
            "• हाल ही के प्रमुख प्रयास: डॉ. रजनीकांत ने हाल ही में मध्य प्रदेश के ",
            "जबलपुर के मटर और सिंघाड़ा को GI टैग",
            " दिलाने की आवेदन प्रक्रिया में मुख्य विशेषज्ञ के रूप में कार्य किया है।",
            "/current-affairs/jabalpur-matar-singhada-gi-tag-2026"
          ),
          createLinkBlock(
            "इसके अतिरिक्त, उन्होंने ",
            "नाबार्ड के माध्यम से 28 नए उत्पादों को जीआई टैग",
            " दिलाने और ",
            "/general-awareness/nabard-28-new-gi-tags-2026"
          ),
          createLinkBlock(
            "",
            "मध्य प्रदेश की 4 आदिवासी फसलों को जीआई टैग",
            " दिलाने में भी विशेषज्ञता प्रदान की है।",
            "/current-affairs/mp-tribal-crops-gi-2026"
          )
        ],
        bodyEn: [
          ...createBlocks([
            "Dr. Rajnikant is widely credited with transforming the GI registration process into a powerful movement for grassroots economic empowerment:",
            "• Led 250+ Registrations: Since starting his mission in 2007, he has personally guided the filing and advocacy for over 250 GI applications across various states.",
            "• Documentation & Conservation: He has archived thousands of traditional art techniques, preventing counterfeit sales and securing copyright protection for local craft communities."
          ]),
          {
            _key: "b3-img-crafts-en",
            _type: "image",
            asset: { _type: "reference", _ref: assetCrafts._id },
            alt: "A beautiful display of Indian GI-tagged products including a Banarasi silk saree and a wooden box of Darjeeling tea",
          },
          createLinkBlock(
            "• Recent Landmark Contributions: He served as the chief mentor for the newly registered ",
            "Jabalpur Peas and Water Chestnut GI Tag",
            " applications.",
            "/current-affairs/jabalpur-matar-singhada-gi-tag-2026"
          ),
          createLinkBlock(
            "Furthermore, he played a vital role in helping ",
            "NABARD secure 28 new GI tags",
            " for regional crafts and ",
            "/general-awareness/nabard-28-new-gi-tags-2026"
          ),
          createLinkBlock(
            "guiding the documentation for the ",
            "4 tribal crops of Madhya Pradesh",
            " to protect indigenous farming seeds.",
            "/current-affairs/mp-tribal-crops-gi-2026"
          )
        ],
      },

      /* Section 4: What is GI Tag background */
      {
        _key: "sec-gi-concept",
        kind: "background",
        title: "भौगोलिक संकेतक (GI Tag) क्या है?",
        titleEn: "What is a Geographical Indication (GI)?",
        body: createBlocks([
          "जीआई (Geographical Indication) एक प्रकार का बौद्धिक संपदा अधिकार (IPR) है, जो किसी उत्पाद की विशिष्ट गुणवत्ता, प्रतिष्ठा या विशेषताओं को उसके भौगोलिक क्षेत्र से जोड़ता है।",
          "• अधिनियम: भारत में जीआई टैग 'वस्तुओं का भौगोलिक उपदर्शन (पंजीकरण और संरक्षण) अधिनियम, 1999' के तहत विनियमित होता है, जो 15 सितंबर 2003 से लागू हुआ।",
          "• प्रथम उत्पाद: भारत का पहला जीआई टैग वर्ष 2004 में दार्जिलिंग चाय (Darjeeling Tea) को प्रदान किया गया था।",
          "• पंजीकरण कार्यालय: चेन्नई स्थित भौगोलिक संकेतक रजिस्ट्री (GI Registry) द्वारा इसका पंजीकरण किया जाता है।"
        ]),
        bodyEn: createBlocks([
          "A Geographical Indication (GI) is a type of intellectual property protection given to products that originate from a specific region and possess qualities or a reputation that are due to that geographical location.",
          "• Legislation: Governed by the Geographical Indications of Goods (Registration and Protection) Act, 1999, which came into effect on September 15, 2003.",
          "• First GI Product: Darjeeling Tea was the first product in India to receive the GI tag in 2004.",
          "• Nodal Registry: The registration is handled by the GI Registry based in Chennai, Tamil Nadu."
        ]),
      },

      /* Section 5: Economic & Rural Impact */
      {
        _key: "sec-economic-impact",
        kind: "importance",
        title: "ग्रामीण अर्थव्यवस्था और कारीगरों पर प्रभाव",
        titleEn: "Impact on Rural Economy and Artisans",
        body: createBlocks([
          "डॉ. रजनीकांत के अनुसार, जीआई टैग केवल एक प्रमाणपत्र नहीं है, बल्कि ग्रामीण सशक्तिकरण का एक बड़ा माध्यम है:",
          "• नकली उत्पादों पर रोक: बनारसी साड़ी या महेश्वरी साड़ी के नाम पर बिकने वाले डुप्लिकेट/मशीनी कपड़ों पर रोक लगती है।",
          "• बेहतर मूल्य: वैश्विक ब्रांडिंग होने के कारण कारीगरों को अपने उत्पाद का उचित और अधिक मूल्य मिलता है।",
          "• ग्रामीण रोजगार: बुनकरों और शिल्पकारों की नई पीढ़ी पारंपरिक हुनर को अपना रही है, जिससे ग्रामीण पलायन कम हो रहा है।",
          "• सामाजिक योगदान: उन्होंने भूमिहीन महिलाओं को स्वयं सहायता समूहों (SHGs) के जरिए आत्मनिर्भर बनाया है।"
        ]),
        bodyEn: createBlocks([
          "For Dr. Rajnikant, GI tags serve as a tool for financial independence and cultural pride for artisans:",
          "• Curbing Counterfeits: Restricts powerloom or synthetic textiles from being fraudulently sold as authentic handloom Banarasi or Maheshwari sarees.",
          "• Premium Market Prices: Global branding helps rural craftspeople sell their goods directly without middlemen, improving profit margins.",
          "• Sustaining Traditional Arts: Motivates the younger generation to learn ancestral craft traditions, curbing rural distress migration.",
          "• Social Empowerment: Focuses heavily on mobilizing landless women into Self-Help Groups (SHGs) to achieve financial autonomy."
        ]),
      },

      /* Section 6: Exam Table */
      {
        _key: "sec-exam-table",
        kind: "factsAtAGlance",
        title: "परीक्षा की दृष्टि से महत्वपूर्ण तथ्य",
        titleEn: "Key Exam Facts",
        body: [
          createTable(
            "table-rajnikant-exam-hi",
            "डॉ. रजनीकांत - परीक्षा स्मरणीय तथ्य",
            ["विषय तथ्य", "विवरण"],
            [
              ["प्रसिद्ध नाम", "GI Man of India"],
              ["पद्मश्री सम्मान", "वर्ष 2019 में प्रदान किया गया"],
              ["मुख्य योगदान क्षेत्र", "पारंपरिक कला, हथकरघा, हस्तशिल्प और कृषि उत्पादों का GI पंजीकरण (250+)"],
              ["भारत का प्रथम GI उत्पाद", "दार्जिलिंग चाय (वर्ष 2004 में पंजीकृत)"],
              ["जीआई रजिस्ट्री कार्यालय", "चेन्नई (तमिलनाडु)"],
              ["जीआई टैग की वैधता", "10 वर्ष (नवीकरणीय)"]
            ]
          )
        ],
        bodyEn: [
          createTable(
            "table-rajnikant-exam-en",
            "Dr. Rajnikant - Key Exam Pointers",
            ["Fact Parameter", "Details"],
            [
              ["Famous Alias", "GI Man of India"],
              ["Padmashree Awarded", "2019"],
              ["Area of Contribution", "Documentation and GI registration of 250+ traditional crafts & agricultural items"],
              ["India's First GI Product", "Darjeeling Tea (Registered in 2004)"],
              ["GI Registry Office", "Chennai (Tamil Nadu)"],
              ["Validity of GI Tag", "10 Years (Renewable)"]
            ]
          )
        ],
      }
    ],
    mcqs: [
      {
        question: "भारत में 'GI Man of India' के नाम से किन्हें जाना जाता है, जिन्हें वर्ष 2019 में पद्मश्री से सम्मानित किया गया?",
        questionEn: "Who is known as the 'GI Man of India' and was honored with the Padmashree in 2019?",
        options: ["पद्मश्री डॉ. रजनीकांत", "डॉ. अनिल प्रकाश जोशी", "डॉ. रजनीश कुमार", "श्री जादव पायेंग"],
        optionsEn: ["Padmashree Dr. Rajnikant", "Dr. Anil Prakash Joshi", "Dr. Rajnish Kumar", "Shri Jadav Payeng"],
        correctIndex: 0,
        explanation: "पद्मश्री डॉ. रजनीकांत को देश के 250 से अधिक पारंपरिक उत्पादों को जीआई टैग दिलाने में उत्कृष्ट योगदान के लिए 'GI Man of India' कहा जाता है।",
        explanationEn: "Padmashree Dr. Rajnikant is widely honored as the 'GI Man of India' for helping secure GI status for over 250 indigenous products."
      },
      {
        question: "भारत में किस उत्पाद को सर्वप्रथम भौगोलिक संकेतक (GI) टैग प्रदान किया गया था?",
        questionEn: "Which was the first product in India to receive a Geographical Indication (GI) tag?",
        options: ["चंदेरी साड़ी", "बनारसी साड़ी", "दार्जिलिंग चाय", "रतलामी सेव"],
        optionsEn: ["Chanderi Saree", "Banarasi Saree", "Darjeeling Tea", "Ratlami Sev"],
        correctIndex: 2,
        explanation: "दार्जिलिंग चाय भारत का पहला जीआई टैग प्राप्त उत्पाद है, जिसे वर्ष 2004 में पंजीकृत किया गया था।",
        explanationEn: "Darjeeling Tea was the first product in India to be granted the Geographical Indication (GI) status in the year 2004."
      }
    ],
    faqs: [
      {
        question: "डॉ. रजनीकांत को किस वर्ष पद्मश्री दिया गया?",
        questionEn: "In which year was Dr. Rajnikant awarded the Padmashree?",
        answer: "उन्हें पारंपरिक हस्तशिल्प और कला संरक्षण के क्षेत्र में असाधारण योगदान के लिए वर्ष 2019 में पद्मश्री प्रदान किया गया था।",
        answerEn: "He was conferred the prestigious Padmashree award in 2019 for his outstanding service in craft preservation."
      },
      {
        question: "जीआई टैग की वैधता कितने वर्षों की होती है?",
        questionEn: "What is the validity period of a GI tag in India?",
        answer: "जीआई पंजीकरण 10 वर्षों के लिए वैध होता है और इसके बाद इसका नवीनीकरण कराया जा सकता है।",
        answerEn: "GI registration is valid for 10 years and can be renewed indefinitely after that period."
      }
    ],
    sources: [
      {
        label: "Ministry of Commerce & Industry - IPR Division",
        url: "https://commerce.gov.in/ipr-india",
      },
      {
        label: "Geographical Indications Registry, Chennai",
        url: "https://ipindia.gov.in",
      }
    ]
  };

  try {
    await client.createOrReplace(article);
    console.log("✨ Successfully uploaded Dr. Rajnikant 'GI Man of India' Article to Sanity with real images!");
  } catch (err) {
    console.error("❌ Failed to create/replace document in Sanity:", err);
  }
}

main().catch((err) => {
  console.error("❌ Error running script:", err);
  process.exit(1);
});
