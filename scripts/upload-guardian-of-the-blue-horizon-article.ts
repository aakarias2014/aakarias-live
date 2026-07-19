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

if (!projectId || dataset === undefined || !token) {
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
  console.log("🚀 Starting upload process for Guardian of the Blue Horizon Article...");

  // Image file paths
  const imagePaths = {
    hero: path.resolve(process.cwd(), "public/images/blog/guardian-of-the-blue-horizon-1.png"),
    content: path.resolve(process.cwd(), "public/images/blog/guardian-of-the-blue-horizon-2.png"),
  };

  // Check if files exist
  if (!fs.existsSync(imagePaths.hero) || !fs.existsSync(imagePaths.content)) {
    console.error("❌ Required images not found in public/images/blog/");
    process.exit(1);
  }

  // 1. Upload Hero Image
  console.log("📸 Uploading hero image...");
  const asset1 = await client.assets.upload("image", fs.createReadStream(imagePaths.hero), {
    filename: "guardian_of_the_blue_horizon_hero.png",
  });
  console.log(`✔ Uploaded hero. Asset ID: ${asset1._id}`);

  // 2. Upload Content Image
  console.log("📸 Uploading content image...");
  const asset2 = await client.assets.upload("image", fs.createReadStream(imagePaths.content), {
    filename: "guardian_of_the_blue_horizon_content.png",
  });
  console.log(`✔ Uploaded content image. Asset ID: ${asset2._id}`);

  // 3. Construct the Article
  const article = {
    _id: "ca-guardian-of-the-blue-horizon-modi-seychelles",
    _type: "currentAffairs",
    slug: { _type: "slug", current: "guardian-of-the-blue-horizon-modi-seychelles-award" },
    title: "प्रधानमंत्री नरेंद्र मोदी को मिला सेशेल्स का सर्वोच्च नागरिक सम्मान 'गार्जियन ऑफ़ द ब्लू होराइज़न'",
    titleEn: "PM Modi Honored with Seychelles' Highest Award 'Guardian of the Blue Horizon'",
    excerpt: "28 जून 2026 को पर्यावरण संरक्षण, नीली अर्थव्यवस्था (Blue Economy) और छोटे द्वीपीय देशों (SIDS) के समर्थन में योगदान के लिए पीएम मोदी को यह सम्मान दिया गया।",
    excerptEn: "On June 28, 2026, PM Narendra Modi was conferred with the 'Guardian of the Blue Horizon' award by Seychelles for his environment & blue economy leadership.",
    ca_date: "2026-06-28",
    publishedAt: new Date().toISOString(),
    featured: true,
    readingTime: 6,
    keywords: [
      "Guardian of the Blue Horizon",
      "PM Modi Seychelles Award",
      "Blue Economy",
      "SIDS Support",
      "International Solar Alliance",
      "Mission LiFE",
      "Climate Action India",
      "गार्जियन ऑफ़ द ब्लू होराइज़न",
      "प्रधानमंत्री मोदी सेशेल्स सम्मान",
      "UPSC Current Affairs",
      "MPPSC Current Affairs",
    ],
    category: { _type: "reference", _ref: "cat-environment" }, // GS-3: Environment
    author: { _type: "reference", _ref: "author-aakar" },
    tags: [
      { _type: "reference", _ref: "tag-upsc" },
      { _type: "reference", _ref: "tag-mppsc" },
      { _type: "reference", _ref: "tag-prelims" },
      { _type: "reference", _ref: "tag-mains" },
    ],
    syllabus: ["GS-3", "GS-2", "Prelims-GS"],
    featuredImage: {
      _type: "image",
      asset: { _type: "reference", _ref: asset1._id },
      alt: "Prime Minister Modi receiving Guardian of the Blue Horizon Citation from Seychelles President",
    },

    /* ─── SECTIONS ──────────────────────────────────────────────── */
    sections: [
      /* ── 1. Why in News ──────────────────────────────────────── */
      {
        _key: "sec-context",
        kind: "whyInNews",
        title: "चर्चा में क्यों?",
        titleEn: "Why in News?",
        body: [
          {
            _key: "b1-1", _type: "block", style: "normal",
            children: [{ _key: "s1-1", _type: "span", text: "28 जून 2026 को सेशेल्स गणराज्य के राष्ट्रपति डॉ. पैट्रिक हर्मिनी द्वारा भारतीय प्रधानमंत्री नरेंद्र मोदी को उनके उत्कृष्ट पर्यावरणीय नेतृत्व और सतत विकास के प्रयासों के लिए सेशेल्स के सर्वोच्च नागरिक/राष्ट्रपति सम्मान ‘गार्जियन ऑफ द ब्लू होराइजन’ (Guardian of the Blue Horizon) से सम्मानित किया गया।" }],
          },
          {
            _key: "b1-2", _type: "block", style: "normal",
            children: [{ _key: "s1-2", _type: "span", text: "यह ऐतिहासिक समारोह सेशेल्स की राजधानी विक्टोरिया (माहे) में एक विशेष राजकीय समारोह में आयोजित हुआ। इतिहास में यह पहली बार है जब यह विशिष्ट राष्ट्रपति सम्मान तैयार किया गया है और किसी वैश्विक नेता को प्रदान किया गया है।" }],
          },
        ],
        bodyEn: [
          {
            _key: "b1-3", _type: "block", style: "normal",
            children: [{ _key: "s1-3", _type: "span", text: "On June 28, 2026, Indian Prime Minister Narendra Modi was conferred with the 'Guardian of the Blue Horizon' award, the highest presidential citation of the Republic of Seychelles, by President Dr. Patrick Herminie." }],
          },
          {
            _key: "b1-4", _type: "block", style: "normal",
            children: [{ _key: "s1-4", _type: "span", text: "The historic ceremony took place during a state event in Victoria, Mahe. This is the first time in history that this prestigious presidential honor has been created and presented to any global leader." }],
          },
        ],
      },

      /* ── 2. What is the Award? ────────────────────────── */
      {
        _key: "sec-award-details",
        kind: "background",
        title: "‘गार्जियन ऑफ द ब्लू होराइजन’ सम्मान क्या है?",
        titleEn: "What is the 'Guardian of the Blue Horizon' Award?",
        body: [
          {
            _key: "b2-1", _type: "block", style: "normal",
            children: [{ _key: "s2-1", _type: "span", text: "• अर्थ: इसका हिंदी अनुवाद 'ब्लू होराइजन का संरक्षक' (नीले क्षितिज का रक्षक) है। यह एक विशिष्ट राष्ट्रपति सम्मान है।" }],
          },
          {
            _key: "b2-2", _type: "block", style: "normal",
            children: [{ _key: "s2-2", _type: "span", text: "• उद्देश्य: इसे विशेष रूप से पर्यावरण संरक्षण, जलवायु अनुकूलन, हरित विकास और समुद्री पारिस्थितिकी तंत्र के सतत प्रबंधन (Sustainable Management of Marine Ecosystems) में अनुकरणीय अंतरराष्ट्रीय नेतृत्व को मान्यता देने के लिए बनाया गया है।" }],
          },
          {
            _key: "b2-img", _type: "image",
            asset: { _type: "reference", _ref: asset2._id },
            alt: "PM Modi Seychelles Award Ceremony",
          },
          {
            _key: "b2-3", _type: "block", style: "normal",
            children: [{ _key: "s2-3", _type: "span", text: "• संचित वैश्विक सम्मान: यह पुरस्कार प्रधानमंत्री नरेंद्र मोदी को किसी विदेशी राष्ट्र द्वारा दिया जाने वाला 34वां अंतरराष्ट्रीय सम्मान है।" }],
          },
        ],
        bodyEn: [
          {
            _key: "b2-4", _type: "block", style: "normal",
            children: [{ _key: "s2-4", _type: "span", text: "• Meaning: It translates to the 'Guardian of the Blue Horizon'. It is a unique presidential honor." }],
          },
          {
            _key: "b2-5", _type: "block", style: "normal",
            children: [{ _key: "s2-5", _type: "span", text: "• Objective: It has been created to recognize exemplary international leadership in environmental protection, climate adaptation, green growth, and sustainable management of marine ecosystems." }],
          },
          {
            _key: "b2-img-en", _type: "image",
            asset: { _type: "reference", _ref: asset2._id },
            alt: "PM Modi Seychelles Award Ceremony Detail",
          },
          {
            _key: "b2-6", _type: "block", style: "normal",
            children: [{ _key: "s2-6", _type: "span", text: "• Global Tally: This award represents the 34th international honor received by PM Modi from foreign nations." }],
          },
        ],
      },

      /* ── 3. Pillars ───────────────────────────────────── */
      {
        _key: "sec-pillars",
        kind: "keyAspects",
        title: "सम्मान के प्रमुख आधार स्तंभ",
        titleEn: "Key Pillars of the Award",
        body: [
          {
            _key: "b3-1", _type: "block", style: "normal",
            children: [{ _key: "s3-1", _type: "span", text: "1. नीली अर्थव्यवस्था (Blue Economy) को बढ़ावा देना: भारत के सागर (SAGAR - Security and Growth for All in the Region) दृष्टिकोण के तहत समुद्री संसाधनों के संरक्षण और सतत विकास को मान्यता मिली है।" }],
          },
          {
            _key: "b3-2", _type: "block", style: "normal",
            children: [{ _key: "s3-2", _type: "span", text: "2. लघु द्वीपीय विकासशील राज्यों (SIDS) का समर्थन: सेशेल्स जैसे छोटे विकासशील द्वीपीय देशों को जलवायु चुनौतियों से निपटने और क्षमता निर्माण में भारत का निरंतर सहयोग।" }],
          },
          {
            _key: "b3-3", _type: "block", style: "normal",
            children: [{ _key: "s3-3", _type: "span", text: "3. अंतर्राष्ट्रीय सौर गठबंधन (ISA): भारत और फ्रांस द्वारा संयुक्त रूप से स्थापित आईएसए के माध्यम से सौर ऊर्जा संग्रहण को बढ़ाने के प्रयास।" }],
          },
          {
            _key: "b3-4", _type: "block", style: "normal",
            children: [{ _key: "s3-4", _type: "span", text: "4. मिशन लाइफ (Mission LiFE): पर्यावरण अनुकूल जीवनशैली को बढ़ावा देने वाला वैश्विक आंदोलन।" }],
          },
          {
            _key: "b3-5", _type: "block", style: "normal",
            children: [{ _key: "s3-5", _type: "span", text: "5. 'एक पेड़ मां के नाम' और बिग कैट एलायंस: बड़े पैमाने पर वृक्षारोपण और वन्यजीव संरक्षण अभियान।" }],
          },
        ],
        bodyEn: [
          {
            _key: "b3-6", _type: "block", style: "normal",
            children: [{ _key: "s3-6", _type: "span", text: "1. Promoting the Blue Economy: Under India's SAGAR (Security and Growth for All in the Region) vision, sustainable ocean management was highly appreciated." }],
          },
          {
            _key: "b3-7", _type: "block", style: "normal",
            children: [{ _key: "s3-7", _type: "span", text: "2. Supporting Small Island Developing States (SIDS): India's role as a trusted partner in capacity building for small islands to fight climate change." }],
          },
          {
            _key: "b3-8", _type: "block", style: "normal",
            children: [{ _key: "s3-8", _type: "span", text: "3. International Solar Alliance (ISA): Promoting solar transition in developing and tropical nations." }],
          },
          {
            _key: "b3-9", _type: "block", style: "normal",
            children: [{ _key: "s3-9", _type: "span", text: "4. Mission LiFE (Lifestyle for Environment): A global campaign to turn climate action into a personal, lifestyle endeavor." }],
          },
          {
            _key: "b3-10", _type: "block", style: "normal",
            children: [{ _key: "s3-10", _type: "span", text: "5. Mass Reforestation & Big Cat Alliance: Initiatives like 'Ek Ped Maa Ke Naam' and wildlife conservation." }],
          },
        ],
      },

      {
        _key: "sec-historical-context",
        kind: "keyAspects",
        title: "ऐतिहासिक महत्व व राजनयिक संबंध",
        titleEn: "Diplomatic Importance",
        body: [
          {
            _key: "b4-1", _type: "block", style: "normal",
            children: [{ _key: "s4-1", _type: "span", text: "पीएम मोदी ने यह सम्मान उन सभी देशों को समर्पित किया जो जलवायु परिवर्तन के खिलाफ लड़ाई में अग्रसर हैं। उन्होंने रेखांकित किया कि यह सम्मान भारत और सेशेल्स के राजनयिक संबंधों के 50 वर्ष पूरे होने के अवसर पर मिला है, जो दोनों देशों की ऐतिहासिक दोस्ती को और मजबूत करेगा।" }],
          },
        ],
        bodyEn: [
          {
            _key: "b4-2", _type: "block", style: "normal",
            children: [{ _key: "s4-2", _type: "span", text: "PM Modi dedicated the honor to all nations standing resilient in the fight against climate change. He highlighted that this award arrives as India and Seychelles commemorate 50 years of diplomatic relations, paving the way for stronger bilateral ties." }],
          },
        ],
      },

      /* ── 5. Quick Facts ────────────────────────────────────── */
      {
        _key: "sec-facts",
        kind: "quickFacts",
        title: "त्वरित तथ्य (Quick Facts)",
        titleEn: "Quick Facts",
        body: [
          {
            _key: "b5-1", _type: "block", style: "normal",
            children: [{ _key: "s5-1", _type: "span", text: "• पुरस्कार: गार्जियन ऑफ द ब्लू होराइजन (Guardian of the Blue Horizon)" }],
          },
          {
            _key: "b5-2", _type: "block", style: "normal",
            children: [{ _key: "s5-2", _type: "span", text: "• सेशेल्स के राष्ट्रपति: डॉ. पैट्रिक हर्मिनी (छठे राष्ट्रपति)" }],
          },
          {
            _key: "b5-3", _type: "block", style: "normal",
            children: [{ _key: "s5-3", _type: "span", text: "• तिथि: 28 जून 2026" }],
          },
          {
            _key: "b5-4", _type: "block", style: "normal",
            children: [{ _key: "s5-4", _type: "span", text: "• स्थान: विक्टोरिया, माहे (सेशेल्स)" }],
          },
          {
            _key: "b5-5", _type: "block", style: "normal",
            children: [{ _key: "s5-5", _type: "span", text: "• अन्य मुख्य पर्यावरण पुरस्कार: चैंपियंस ऑफ द अर्थ (UN), एग्रीकोला मेडल (FAO), सियोल शांति पुरस्कार" }],
          },
        ],
        bodyEn: [
          {
            _key: "b5-6", _type: "block", style: "normal",
            children: [{ _key: "s5-6", _type: "span", text: "• Award: Guardian of the Blue Horizon" }],
          },
          {
            _key: "b5-7", _type: "block", style: "normal",
            children: [{ _key: "s5-7", _type: "span", text: "• President of Seychelles: Dr. Patrick Herminie" }],
          },
          {
            _key: "b5-8", _type: "block", style: "normal",
            children: [{ _key: "s5-8", _type: "span", text: "• Date Conferred: June 28, 2026" }],
          },
          {
            _key: "b5-9", _type: "block", style: "normal",
            children: [{ _key: "s5-9", _type: "span", text: "• Location: Victoria, Mahe (Seychelles)" }],
          },
          {
            _key: "b5-10", _type: "block", style: "normal",
            children: [{ _key: "s5-10", _type: "span", text: "• Other notable honors: UN Champions of the Earth, FAO Agricola Medal, Seoul Peace Prize" }],
          },
        ],
      },

      /* ── 6. Practice Questions ─────────────────────────────── */
      {
        _key: "sec-practice",
        kind: "practiceQuestions",
        title: "अभ्यास प्रश्न",
        titleEn: "Practice Questions",
        body: [
          {
            _key: "b6-1", _type: "block", style: "h3",
            children: [{ _key: "s6-1", _type: "span", text: "प्रारंभिक परीक्षा अभ्यास प्रश्न" }],
          },
          {
            _key: "b6-2", _type: "block", style: "normal",
            children: [{ _key: "s6-2", _type: "span", text: "1. सेशेल्स द्वारा पहली बार प्रदान किए गए 'गार्जियन ऑफ द ब्लू होराइजन' सम्मान के संदर्भ में निम्नलिखित में से कौन-सा कथन सत्य है?" }],
          },
          {
            _key: "b6-3", _type: "block", style: "normal",
            children: [{ _key: "s6-3", _type: "span", text: "(i) यह सेशेल्स का सर्वोच्च नागरिक सम्मान है जो पर्यावरण और समुद्री संरक्षण के लिए दिया जाता है।" }],
          },
          {
            _key: "b6-4", _type: "block", style: "normal",
            children: [{ _key: "s6-4", _type: "span", text: "(ii) इतिहास में यह सम्मान पहली बार भारत के प्रधानमंत्री नरेंद्र मोदी को दिया गया है।" }],
          },
          {
            _key: "b6-5", _type: "block", style: "normal",
            children: [{ _key: "s6-5", _type: "span", text: "विकल्प: (a) केवल (i) (b) केवल (ii) (c) (i) और (ii) दोनों (d) न तो (i) और न ही (ii)" }],
          },
          {
            _key: "b6-6", _type: "block", style: "normal",
            children: [{ _key: "s6-6", _type: "span", text: "उत्तर: (c) (i) और (ii) दोनों" }],
          },
        ],
        bodyEn: [
          {
            _key: "b6-7", _type: "block", style: "h3",
            children: [{ _key: "s6-7", _type: "span", text: "Prelims Practice Question" }],
          },
          {
            _key: "b6-8", _type: "block", style: "normal",
            children: [{ _key: "s6-8", _type: "span", text: "1. Which of the following statements is/are correct regarding the 'Guardian of the Blue Horizon' award?" }],
          },
          {
            _key: "b6-9", _type: "block", style: "normal",
            children: [{ _key: "s6-9", _type: "span", text: "(i) It is the highest presidential honor of Seychelles designed for ecological leadership." }],
          },
          {
            _key: "b6-10", _type: "block", style: "normal",
            children: [{ _key: "s6-10", _type: "span", text: "(ii) PM Narendra Modi is the first global leader to receive this award." }],
          },
          {
            _key: "b6-11", _type: "block", style: "normal",
            children: [{ _key: "s6-11", _type: "span", text: "Options: (a) Only (i) (b) Only (ii) (c) Both (i) and (ii) (d) Neither (i) nor (ii)" }],
          },
          {
            _key: "b6-12", _type: "block", style: "normal",
            children: [{ _key: "s6-12", _type: "span", text: "Answer: (c) Both (i) and (ii)" }],
          },
        ],
      },
    ],

    /* ─── MCQs ──────────────────────────────────────────────── */
    mcqs: [
      {
        question: "हाल ही में प्रधानमंत्री मोदी को किस देश का सर्वोच्च राष्ट्रपति सम्मान ‘गार्जियन ऑफ द ब्लू होराइजन’ प्राप्त हुआ है?",
        questionEn: "Recently, PM Narendra Modi received the 'Guardian of the Blue Horizon' award from which country?",
        options: ["मॉरीशस", "सेशेल्स", "मालदीव", "मेडागास्कर"],
        optionsEn: ["Mauritius", "Seychelles", "Maldives", "Madagascar"],
        correctIndex: 1,
      },
      {
        question: "‘गार्जियन ऑफ द ब्लू होराइजन’ पुरस्कार मुख्य रूप से किस क्षेत्र में योगदान के लिए दिया जाता है?",
        questionEn: "The 'Guardian of the Blue Horizon' award is primarily given for contributions in which field?",
        options: ["अंतरिक्ष प्रौद्योगिकी", "पर्यावरण संरक्षण और नीली अर्थव्यवस्था", "डिजिटल साक्षरता", "वैश्विक स्वास्थ्य"],
        optionsEn: ["Space Technology", "Environmental Conservation & Blue Economy", "Digital Literacy", "Global Health"],
        correctIndex: 1,
      },
      {
        question: "सेशेल्स के किस राष्ट्रपति ने प्रधानमंत्री मोदी को जून 2026 में यह सम्मान प्रदान किया?",
        questionEn: "Which President of Seychelles conferred this honor upon PM Modi in June 2026?",
        options: ["वेवेल रामकलावन", "डैनी फॉरे", "डॉ. पैट्रिक हर्मिनी", "जेम्स मिशेल"],
        optionsEn: ["Wavel Ramkalawan", "Danny Faure", "Dr. Patrick Herminie", "James Michel"],
        correctIndex: 2,
      },
    ],

    /* ─── FAQs ──────────────────────────────────────────────── */
    faqs: [
      {
        question: "गार्जियन ऑफ़ द ब्लू होराइज़न पुरस्कार क्या है?",
        questionEn: "What is the Guardian of the Blue Horizon award?",
        answer: "यह सेशेल्स गणराज्य का सर्वोच्च राष्ट्रपति सम्मान है जिसे वैश्विक स्तर पर ग्रीन लीडरशिप, समुद्री पारिस्थितिकी तंत्र संरक्षण और सस्टेनेबल डेवलपमेंट को बढ़ावा देने के लिए दिया जाता है।",
        answerEn: "It is the highest presidential citation of the Republic of Seychelles, created to honor global leaders showcasing exemplary commitment to environment protection, marine ecology, and sustainable development.",
      },
      {
        question: "यह पुरस्कार प्राप्त करने वाले प्रथम वैश्विक नेता कौन हैं?",
        questionEn: "Who is the first global leader to receive this award?",
        answer: "इतिहास में पहली बार यह विशिष्ट राष्ट्रपति सम्मान तैयार किया गया है और भारत के प्रधानमंत्री नरेंद्र मोदी को प्रदान किया गया है।",
        answerEn: "This unique presidential honor has been designed and awarded for the very first time in history to India's Prime Minister Narendra Modi.",
      },
    ],

    /* ─── Sources ────────────────────────────────────────────── */
    sources: [
      { label: "Ministry of External Affairs, Government of India", url: "https://mea.gov.in" },
      { label: "Presidency of the Republic of Seychelles", url: "http://www.president.gov.sc" },
      { label: "PIB Delhi", url: "https://pib.gov.in" },
    ],
  };

  try {
    await client.createOrReplace(article);
    console.log("✨ Successfully uploaded Guardian of the Blue Horizon Article to Sanity!");
  } catch (err) {
    console.error("❌ Failed to create/replace document in Sanity:", err);
  }
}

main().catch((err) => {
  console.error("❌ Error running script:", err);
  process.exit(1);
});
