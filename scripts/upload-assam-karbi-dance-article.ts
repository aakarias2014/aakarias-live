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

// Helper function to sanitize text by stripping zero-width unicode characters
function sanitizeText(str: string): string {
  if (!str) return "";
  return str.replace(/[\u200B-\u200D\u200E\u200F\u202A-\u202E\u2060-\u206F\uFEFF\u00AD\u2000-\u200A]/g, "").trim();
}

function createTable(key: string, caption: string, headers: string[], rows: string[][]): any {
  const cleanedHeaders = headers.map(sanitizeText);
  const cleanedRows = rows.map((r) => r.map(sanitizeText));
  return {
    _key: key,
    _type: "table",
    table: {
      caption: sanitizeText(caption),
      headers: cleanedHeaders,
      rows: cleanedRows,
    },
  };
}

async function main() {
  console.log("🚀 Starting upload process for Assam Karbi Folk Dance 'Nimso Kerung' Guinness World Record Article...");

  // Image file paths in public/images/blog/
  const imagePaths = {
    cover: path.resolve(process.cwd(), "public/images/blog/assam-karbi-dance-nimso-kerung-guinness-record-cover.jpg"),
    supporting: path.resolve(process.cwd(), "public/images/blog/assam-karbi-nimso-kerung-dance-world-record.jpg"),
  };

  // Verify images exist
  if (!fs.existsSync(imagePaths.cover) || !fs.existsSync(imagePaths.supporting)) {
    console.error("❌ Required images not found in public/images/blog/");
    process.exit(1);
  }

  // 1. Upload Cover Image
  console.log("📸 Uploading cover banner image to Sanity...");
  const assetCover = await client.assets.upload("image", fs.createReadStream(imagePaths.cover), {
    filename: "assam-karbi-dance-nimso-kerung-guinness-record-cover.jpg",
  });
  console.log(`✔ Uploaded Cover Image. Asset ID: ${assetCover._id}`);

  // 2. Upload Supporting Performance Image
  console.log("📸 Uploading supporting performance image to Sanity...");
  const assetSupporting = await client.assets.upload("image", fs.createReadStream(imagePaths.supporting), {
    filename: "assam-karbi-nimso-kerung-dance-world-record.jpg",
  });
  console.log(`✔ Uploaded Supporting Image. Asset ID: ${assetSupporting._id}`);

  const authorId = "author-aakar-ias-team";

  // SEO Target Keywords
  const keywordsArray = [
    "असम के कार्बी लोकनृत्य ने बनाया गिनीज वर्ल्ड रिकॉर्ड",
    "निमसो केरुंग लोकनृत्य क्या है",
    "nimso kerung folk dance guinness world record",
    "largest karbi folk dance diphu assam",
    "karbi anglong nimso kerung dance 15000 artists",
    "chomangkan festival karbi tribe mppsc notes",
    "folk dances of assam upsc mppsc gk notes",
    "assam national parks kaziranga manas gk table",
    "karbi anglong autonomous council kaac",
    "mppsc prelims unit 1 and unit 10 tribal culture",
    "bihu bagurumba bhortal nimso kerung comparison",
  ];

  const docTitleHi = "असम के कार्बी लोकनृत्य ‘निमसो केरुंग’ ने बनाया गिनीज वर्ल्ड रिकॉर्ड: 15,000 कलाकारों की ऐतिहासिक प्रस्तुति, संस्कृति व परीक्षा नोट्स | MPPSC & UPSC";
  const docTitleEn = "Assam's Karbi Folk Dance 'Nimso Kerung' Sets Guinness World Record: 15,000 Artists, Culture & Exam Notes | MPPSC & UPSC";

  const docExcerptHi = "16 नवंबर 2026 को असम के कार्बी आंगलोंग जिले के दीफू में 15,000 कलाकारों ने पारंपरिक कार्बी लोकनृत्य ‘निमसो केरुंग’ (Nimso Kerung) प्रस्तुत कर 'Largest Karbi Folk Dance' का गिनीज वर्ल्ड रिकॉर्ड बनाया। जानें चोमांगकान उत्सव, कार्बी जनजाति, असम के 7 राष्ट्रीय उद्यान, जीआई टैग एवं 8 अभ्यास MCQs।";
  const docExcerptEn = "On 16 November 2026, 15,000 tribal artists performed the traditional 'Nimso Kerung' folk dance in Diphu, Karbi Anglong (Assam), setting a Guinness World Record for the 'Largest Karbi Folk Dance'. Explore the cultural roots of Chomangkan festival, Karbi heritage, Assam static GK, and 8 practice MCQs for MPPSC & UPSC.";

  const docSlug = "assam-karbi-folk-dance-nimso-kerung-guinness-world-record";

  // Upsert for both Current Affairs and Static GK
  const docIds = [
    "ca-assam-karbi-folk-dance-nimso-kerung",
    "gk-assam-karbi-folk-dance-nimso-kerung",
  ];

  for (const docId of docIds) {
    const isCA = docId.startsWith("ca-");
    console.log(`📌 Upserting document ${docId}...`);

    const articlePayload: any = {
      _type: isCA ? "currentAffairs" : "staticGk",
      slug: { _type: "slug", current: docSlug },
      title: sanitizeText(docTitleHi),
      titleEn: sanitizeText(docTitleEn),
      excerpt: sanitizeText(docExcerptHi),
      excerptEn: sanitizeText(docExcerptEn),
      ca_date: "2026-11-19",
      publishedAt: "2026-11-19T08:00:00.000Z",
      featured: true,
      readingTime: 9,
      keywords: keywordsArray,
      seoTitle: sanitizeText("असम के कार्बी लोकनृत्य ‘निमसो केरुंग’ ने बनाया गिनीज वर्ल्ड रिकॉर्ड | MPPSC & UPSC"),
      seoTitleEn: sanitizeText("Assam Karbi Folk Dance Nimso Kerung Guinness World Record | MPPSC & UPSC"),
      metaDescription: sanitizeText(docExcerptHi),
      metaDescriptionEn: sanitizeText(docExcerptEn),
      category: { _type: "reference", _ref: "cat-history" },
      author: { _type: "reference", _ref: authorId },
      tags: [
        { _type: "reference", _ref: "tag-mppsc", _key: "ref-tag-mppsc" },
        { _type: "reference", _ref: "tag-upsc", _key: "ref-tag-upsc" },
        { _type: "reference", _ref: "tag-prelims", _key: "ref-tag-prelims" },
        { _type: "reference", _ref: "tag-mains", _key: "ref-tag-mains" },
      ],
      syllabus: [
        "MPPSC Prelims Paper-1 Unit 1 (Concepts, Ideas & Culture of India)",
        "MPPSC Prelims Paper-1 Unit 10 (Tribes of India: Heritage, Folk Culture & Folk Literature)",
        "MPPSC Mains Paper-1 Part-A Unit 5 (Indian Cultural Heritage, Performing Arts & Folk Traditions)",
        "UPSC GS Paper-1 (Indian Heritage and Culture: Visual & Performing Arts)",
      ],
      featuredImage: {
        _type: "image",
        asset: { _type: "reference", _ref: assetCover._id },
        alt: "असम के कार्बी लोकनृत्य ने बनाया गिनीज वर्ल्ड रिकॉर्ड: निमसो केरुंग लोकनृत्य | Assam Karbi Nimso Kerung Guinness Record Banner",
      },
      mainImage: {
        _type: "image",
        asset: { _type: "reference", _ref: assetCover._id },
        alt: "Assam Karbi Folk Dance Nimso Kerung Guinness World Record Banner with Dancers and Certificate",
      },
      nextArticle: {
        title: "72वें राष्ट्रीय फिल्म पुरस्कार 2026: विजेताओं की पूरी सूची, फिल्मफेयर अंतर व परीक्षा नोट्स",
        titleEn: "72nd National Film Awards 2026 Winners List: Filmfare Comparison & Exam Notes",
        href: "/current-affairs/72nd-national-film-awards-2024-winners-list-mppsc-upsc",
      },

      /* ─── SECTIONS ──────────────────────────────────────────────── */
      sections: [
        /* ── 1. Overview & Guinness World Record Context ──────────── */
        {
          _key: "sec-overview",
          kind: "whyInNews",
          title: sanitizeText("चर्चा में क्यों? (Why in News: निमसो केरुंग लोकनृत्य का ऐतिहासिक गिनीज रिकॉर्ड)"),
          titleEn: sanitizeText("Why in News? (Historic Guinness World Record by Nimso Kerung)"),
          body: [
            {
              _key: "b1-1",
              _type: "block",
              style: "h3",
              children: [{ _key: "s1-1", _type: "span", text: sanitizeText("असम की समृद्ध जनजातीय सांस्कृतिक धरोहर को वैश्विक सम्मान") }],
            },
            {
              _key: "b1-2",
              _type: "block",
              style: "normal",
              children: [{ _key: "s1-2", _type: "span", text: sanitizeText("• **ऐतिहासिक उपलब्धि**: 16 नवंबर 2026 को असम के कार्बी आंगलोंग जिले के जिला मुख्यालय **दीफू (Diphu)** में लगभग **15,000 कलाकारों** ने पारंपरिक कार्बी लोकनृत्य **‘निमसो केरुंग’ (Nimso Kerung)** की सामूहिक प्रस्तुति देकर गिनीज वर्ल्ड रिकॉर्ड (Guinness World Record) में अपना नाम दर्ज कराया।") }],
            },
            {
              _key: "b1-3",
              _type: "block",
              style: "normal",
              children: [{ _key: "s1-3", _type: "span", text: sanitizeText("• **रिकॉर्ड का आधिकारिक शीर्षक**: गिनीज बुक ऑफ वर्ल्ड रिकॉर्ड्स द्वारा इसे **'Largest Karbi Folk Dance'** (सबसे बड़ा कार्बी लोकनृत्य) का खिताब प्रदान किया गया।") }],
            },
            {
              _key: "b1-4",
              _type: "block",
              style: "normal",
              children: [{ _key: "s1-4", _type: "span", text: sanitizeText("• **आयोजक संस्था**: इस ऐतिहासिक मेगा सांस्कृतिक आयोजन का नेतृत्व **कार्बी आंगलोंग स्वायत्त परिषद (KAAC - Karbi Anglong Autonomous Council)** द्वारा किया गया, जो भारतीय संविधान की छठी अनुसूची (Sixth Schedule) के अंतर्गत कार्य करती है।") }],
            },
            {
              _key: "b1-5",
              _type: "block",
              style: "normal",
              children: [{ _key: "s1-5", _type: "span", text: sanitizeText("• **परीक्षा प्रासंगिकता**: [MPPSC Prelims Syllabus 2026](/mppsc/prelims-syllabus) की यूनिट 1 व यूनिट 10 (भारत एवं मध्य प्रदेश की जनजातीय विरासत, लोकनृत्य एवं संस्कृति) तथा [MPPSC Mains Syllabus 2026](/mppsc/mains-syllabus) के पेपर 1 (भारतीय संस्कृति व कला) के लिए यह विषय अत्यंत उपयोगी है।") }],
            },
          ],
          bodyEn: [
            {
              _key: "b1-1e",
              _type: "block",
              style: "h3",
              children: [{ _key: "s1-1e", _type: "span", text: sanitizeText("Global Milestone for Indigenous Karbi Tribal Heritage") }],
            },
            {
              _key: "b1-2e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s1-2e", _type: "span", text: sanitizeText("• **Historic Achievement**: On 16 November 2026, a colossal ensemble of approximately **15,000 artists** assembled at Diphu, the headquarters of Karbi Anglong district in Assam, performing the traditional Karbi indigenous folk dance **'Nimso Kerung'** to establish an official Guinness World Record.") }],
            },
            {
              _key: "b1-3e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s1-3e", _type: "span", text: sanitizeText("• **Official Record Title**: Conferred the official Guinness certification for the **'Largest Karbi Folk Dance'**.") }],
            },
            {
              _key: "b1-4e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s1-4e", _type: "span", text: sanitizeText("• **Lead Organizing Authority**: Conceptualized and organized by the **Karbi Anglong Autonomous Council (KAAC)**, a constitutional tribal administrative body established under the Sixth Schedule of the Constitution of India.") }],
            },
            {
              _key: "b1-5e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s1-5e", _type: "span", text: sanitizeText("• **Curriculum Alignment**: Directly mapped to [MPPSC Prelims Paper 1 Unit 1 & Unit 10](/en/mppsc/prelims-syllabus) (Indian Heritage, Folk Dances & Tribal Culture) and [MPPSC Mains Paper 1 Part A](/en/mppsc/mains-syllabus).") }],
            },
          ],
        },

        /* ── 2. Facts Table of the Record ─────────────────────────── */
        {
          _key: "sec-record-facts",
          kind: "initiatives",
          title: sanitizeText("गिनीज वर्ल्ड रिकॉर्ड 2026 से जुड़े प्रमुख तथ्य (Guinness Record Key Facts)"),
          titleEn: sanitizeText("Key Data Points: Largest Karbi Folk Dance World Record"),
          body: [
            createTable(
              "table-record-facts",
              "कार्बी लोकनृत्य ‘निमसो केरुंग’ गिनीज वर्ल्ड रिकॉर्ड 2026: मुख्य सांख्यिकी",
              ["मापदंड (Parameter)", "विवरण (Details)"],
              [
                ["आयोजन की तिथि", "16 नवंबर 2026"],
                ["आयोजन स्थल", "दीफू (Diphu), कार्बी आंगलोंग जिला, असम"],
                ["प्रस्तुत लोकनृत्य", "निमसो केरुंग (Nimso Kerung)"],
                ["कुल प्रतिभागी कलाकार", "लगभग 15,000 कलाकार (युवक एवं युवतियाँ)"],
                ["गिनीज रिकॉर्ड का शीर्षक", "Largest Karbi Folk Dance"],
                ["मुख्य आयोजक", "कार्बी आंगलोंग स्वायत्त परिषद (KAAC)"],
                ["न्यूनतम रिकॉर्ड थ्रेशोल्ड", "कम से कम 250 प्रतिभागी (उपलब्धि: 60 गुना अधिक)"],
                ["न्यूनतम प्रस्तुति अवधि", "कम से कम 5 मिनट निरंतर समकालिक नृत्य (Synchronized)"],
                ["परिधान अनिवार्यता", "100% पारंपरिक कार्बी परिधान (पिनी, पेकोक, पोहो)"]
              ]
            ),
            {
              _key: "b2-img",
              _type: "image",
              asset: { _type: "reference", _ref: assetSupporting._id },
              alt: "15,000 Karbi Artists Performing Nimso Kerung Folk Dance in Diphu Assam Setting Guinness World Record",
              caption: "चित्र: दीफू (कार्बी आंगलोंग, असम) में 15,000 कलाकारों द्वारा पारंपरिक परिधान में ‘निमसो केरुंग’ की ऐतिहासिक प्रस्तुति",
            },
          ],
          bodyEn: [
            createTable(
              "table-record-facts-en",
              "Nimso Kerung Karbi Folk Dance Guinness World Record: Core Statistics",
              ["Parameter", "Details"],
              [
                ["Date of Event", "16 November 2026"],
                ["Venue", "Diphu, Karbi Anglong District, Assam"],
                ["Folk Dance Form", "Nimso Kerung"],
                ["Total Participants", "Approximately 15,000 dancers (Men & Women)"],
                ["Official Record Title", "Largest Karbi Folk Dance"],
                ["Organizing Body", "Karbi Anglong Autonomous Council (KAAC)"],
                ["Guinness Entry Threshold", "Minimum 250 performers (Outperformed by 60x)"],
                ["Minimum Performance Duration", "At least 5 minutes of unbroken synchronized choreography"],
                ["Dress Code Mandate", "100% authentic woven Karbi tribal ethnic attire"]
              ]
            ),
          ],
        },

        /* ── 3. Nimso Kerung Meaning & Artistic Features ──────────── */
        {
          _key: "sec-dance-features",
          kind: "background",
          title: sanitizeText("निमसो केरुंग लोकनृत्य: नामकरण, स्वरूप एवं कलात्मक विशेषताएँ (Artistic Features)"),
          titleEn: sanitizeText("Nimso Kerung Folk Dance: Etymology, Choreography & Style"),
          body: [
            {
              _key: "b3-1",
              _type: "block",
              style: "h3",
              children: [{ _key: "s3-1", _type: "span", text: sanitizeText("1. शाब्दिक अर्थ (Etymology)") }],
            },
            {
              _key: "b3-2",
              _type: "block",
              style: "normal",
              children: [{ _key: "s3-2", _type: "span", text: sanitizeText("• **'निमसो' (Nimso)**: कार्बी भाषा में 'निमसो' का तात्पर्य **युवती या कुंवारी कन्या (Young Maiden)** से है।") }],
            },
            {
              _key: "b3-3",
              _type: "block",
              style: "normal",
              children: [{ _key: "s3-3", _type: "span", text: sanitizeText("• **'केरुंग' (Kerung)**: कार्बी बोली में 'केरुंग' का अर्थ **चुनना, आमंत्रित करना या साथ लेकर चलना (To choose or take along)** होता है। अतः यह नृत्य सामाजिक रूप से युवाओं द्वारा जीवनसाथी चुनने अथवा सामूहिक सौहार्द्र में एक-दूसरे का हाथ थामने का प्रतीक है।") }],
            },
            {
              _key: "b3-4",
              _type: "block",
              style: "h3",
              children: [{ _key: "s3-4", _type: "span", text: sanitizeText("2. नृत्य शैली एवं संगीत तालमेल") }],
            },
            {
              _key: "b3-5",
              _type: "block",
              style: "normal",
              children: [{ _key: "s3-5", _type: "span", text: sanitizeText("• **समूह विन्यास**: इसमें युवक और युवतियाँ पारंपरिक पोशाक पहनकर समानांतर व वृत्ताकार पंक्तियों में खड़े होते हैं। एक-दूसरे की कमर या हाथ थामकर लयबद्ध कदमों (Rhythmic Footwork) से आगे-पीछे गति करते हैं।") }],
            },
            {
              _key: "b3-6",
              _type: "block",
              style: "normal",
              children: [{ _key: "s3-6", _type: "span", text: sanitizeText("• **पारंपरिक वाद्ययंत्र**: इस नृत्य की ताल **‘चेंग’ (Cheng - कार्बी पारंपरिक ढोल)**, **‘मुरली’ (बांसुरी)** तथा पारंपरिक लोकगीतों की धुनों पर संचालित होती है।") }],
            },
            {
              _key: "b3-7",
              _type: "block",
              style: "h3",
              children: [{ _key: "s3-7", _type: "span", text: sanitizeText("3. पारंपरिक परिधान (Traditional Karbi Attire)") }],
            },
            {
              _key: "b3-8",
              _type: "block",
              style: "normal",
              children: [{ _key: "s3-8", _type: "span", text: sanitizeText("• **महिला परिधान**: युवतियाँ हाथ से बुनी विशिष्ट **‘पिनी’ (Pini - कमर पर लपेटा जाने वाला वस्त्र)**, **‘पेकोक’ (Pekok - छाती पर बांधा जाने वाला चौकोर कपड़ा)** तथा **‘वामकोक’ (कमरबंद)** धारण करती हैं।") }],
            },
            {
              _key: "b3-9",
              _type: "block",
              style: "normal",
              children: [{ _key: "s3-9", _type: "span", text: sanitizeText("• **पुरुष परिधान**: युवक **‘चोई’ (पारंपरिक जैकेट)**, **‘रिकॉन्ग’ (धोती)** और सिर पर रेशमी पगड़ी **‘पोहो’ (Poho)** पहनते हैं।") }],
            },
          ],
          bodyEn: [
            {
              _key: "b3-1e",
              _type: "block",
              style: "h3",
              children: [{ _key: "s3-1e", _type: "span", text: sanitizeText("1. Etymological Origins") }],
            },
            {
              _key: "b3-2e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s3-2e", _type: "span", text: sanitizeText("• **'Nimso'**: In the Tibeto-Burman Karbi language, 'Nimso' signifies a **young maiden or unmarried damsel**.") }],
            },
            {
              _key: "b3-3e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s3-3e", _type: "span", text: sanitizeText("• **'Kerung'**: Translates as **'to choose, invite, or escort together'**. Historically, the dance symbolizes social courtship, mutual community trust, and matrimonial alliance selection among tribal youth.") }],
            },
            {
              _key: "b3-4e",
              _type: "block",
              style: "h3",
              children: [{ _key: "s3-4e", _type: "span", text: sanitizeText("2. Choreography & Musical Instrumentation") }],
            },
            {
              _key: "b3-5e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s3-5e", _type: "span", text: sanitizeText("• **Choreographic Formation**: Dancers form interlocking concentric circles and straight arrays, holding waistbands or clasping hands while executing synchronized, rhythmic forward-backward foot steps.") }],
            },
            {
              _key: "b3-6e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s3-6e", _type: "span", text: sanitizeText("• **Acoustic Instruments**: Driven by the resonant beats of the **'Cheng' (the indigenous Karbi hand drum)**, complemented by the bamboo flute **'Murli' / 'Pongsi'** and resonant antiphonal chanting.") }],
            },
            {
              _key: "b3-7e",
              _type: "block",
              style: "h3",
              children: [{ _key: "s3-7e", _type: "span", text: sanitizeText("3. Traditional Indigenous Regalia") }],
            },
            {
              _key: "b3-8e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s3-8e", _type: "span", text: sanitizeText("• **Female Regalia**: Handwoven wraparound skirt **'Pini'**, upper torso drape **'Pekok'**, and the silver/beaded decorative belt **'Vamkok'**.") }],
            },
            {
              _key: "b3-9e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s3-9e", _type: "span", text: sanitizeText("• **Male Regalia**: Sleeveless ethnic vest **'Choi'**, waistcloth **'Rikong'**, and elegant ceremonial headgear turban **'Poho'**.") }],
            },
          ],
        },

        /* ── 4. Social Significance & Chomangkan Connection ──────── */
        {
          _key: "sec-social-significance",
          kind: "issues",
          title: sanitizeText("सामाजिक एवं सांस्कृतिक महत्व: चोमांगकान उत्सव से जुड़ाव (Chomangkan Connection)"),
          titleEn: sanitizeText("Social & Cultural Significance: The Chomangkan Ancestral Link"),
          body: [
            {
              _key: "b4-1",
              _type: "block",
              style: "h3",
              children: [{ _key: "s4-1", _type: "span", text: sanitizeText("चोमांगकान (Chomangkan): कार्बी समाज का सर्वोच्च अनुष्ठान") }],
            },
            {
              _key: "b4-2",
              _type: "block",
              style: "normal",
              children: [{ _key: "s4-2", _type: "span", text: sanitizeText("• **दिवंगत आत्माओं की शांति का पर्व**: निमसो केरुंग नृत्य पारंपरिक रूप से कार्बी जनजाति के सबसे महत्वपूर्ण व भव्य अनुष्ठान **‘चोमांगकान’ (Chomangkan)** से जुड़ा हुआ है। यह एक 4-दिवसीय मृत्यु संस्कार समारोह होता है, जो दिवंगत पूर्वजों की आत्माओं को मुक्ति एवं शांति दिलाने तथा उनका सम्मान करने हेतु आयोजित किया जाता है।") }],
            },
            {
              _key: "b4-3",
              _type: "block",
              style: "normal",
              children: [{ _key: "s4-3", _type: "span", text: sanitizeText("• **शोक को उत्सव में बदलना**: कार्बी दर्शन के अनुसार मृत्यु जीवन का अंत नहीं बल्कि पूर्वजों के लोक (चोमांग) की यात्रा है। निमसो केरुंग नृत्य के माध्यम से युवा पीढ़ी पूर्वजों के प्रति सम्मान प्रकट करती है और शोक के वातावरण को सामुदायिक एकता व जीवन के उल्लास में बदलती है।") }],
            },
            {
              _key: "b4-4",
              _type: "block",
              style: "normal",
              children: [{ _key: "s4-4", _type: "span", text: sanitizeText("• **युवाओं की सामाजिक सहभागिता**: यह नृत्य युवाओं के बीच आपसी परिचय, सामाजिक मेलजोल, विवाह योग्य वर-वधु के चयन और जनजातीय विश्वास को पीढ़ी-दर-पीढ़ी जीवंत बनाए रखने का प्रमुख मंच है।") }],
            },
            {
              _key: "b4-5",
              _type: "block",
              style: "normal",
              children: [{ _key: "s4-5", _type: "span", text: sanitizeText("• **सांस्कृतिक एकता का प्रदर्शन**: 15,000 कलाकारों की एक साथ समकालिक प्रस्तुति ने यह सिद्ध किया कि आधुनिकीकरण के दौर में भी पूर्वोत्तर भारत की जनजातीय परंपराएँ अपनी मूल पहचान के साथ पूरी तरह सुरक्षित और सुदृढ़ हैं।") }],
            },
          ],
          bodyEn: [
            {
              _key: "b4-1e",
              _type: "block",
              style: "h3",
              children: [{ _key: "s4-1e", _type: "span", text: sanitizeText("Chomangkan: The Sacred Ancestral Mortuary Ritual") }],
            },
            {
              _key: "b4-2e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s4-2e", _type: "span", text: sanitizeText("• **Honoring Departed Ancestors**: Nimso Kerung is deeply embedded in **'Chomangkan'**, the supreme post-funerary ceremony of the Karbi people. Spanning across 4 days and nights, Chomangkan is held to guide the souls of deceased kin to the ancestral spirit-world (Chom-Arong).") }],
            },
            {
              _key: "b4-3e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s4-3e", _type: "span", text: sanitizeText("• **Transforming Grief into Celebration**: Karbi philosophy views physical death not as an end, but as a spiritual transition. Nimso Kerung channels collective solemnity into vibrant rhythmic celebration, honoring the lineage.") }],
            },
            {
              _key: "b4-4e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s4-4e", _type: "span", text: sanitizeText("• **Youth Matrimonial & Social Bonding**: Serves as a vital customary institution where unmarried youth from different clans (Kur) socialize, establish mutual respect, and select matrimonial partners under community blessing.") }],
            },
            {
              _key: "b4-5e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s4-5e", _type: "span", text: sanitizeText("• **Living Cultural Preservation**: The 15,000-strong synchronous display demonstrates the resilience and vitality of Northeast India's indigenous heritage amid contemporary modernization.") }],
            },
          ],
        },

        /* ── 5. Assam Comprehensive Static GK & Facts Tables ─────── */
        {
          _key: "sec-assam-gk",
          kind: "background",
          title: sanitizeText("असम सामान्य ज्ञान: परीक्षा हेतु संपूर्ण संदर्भ सारणी (Comprehensive Assam Static GK)"),
          titleEn: sanitizeText("Assam Comprehensive General Knowledge: Essential Exam Tables"),
          body: [
            {
              _key: "b5-1",
              _type: "block",
              style: "h3",
              children: [{ _key: "s5-1", _type: "span", text: sanitizeText("1. असम राज्य का सामान्य परिचय एवं राजकीय प्रतीक") }],
            },
            createTable(
              "table-assam-symbols",
              "असम राज्य के प्रमुख प्रशासनिक तथ्य एवं राजकीय प्रतीक",
              ["मापदंड (Parameter)", "विवरण (Details)"],
              [
                ["राज्य का गठन", "26 जनवरी 1950"],
                ["राजधानी", "दिसपुर (Dispur)"],
                ["प्रमुख वाणिज्यिक नगर", "गुवाहाटी (Guwahati - पूर्वोत्तर का प्रवेश द्वार)"],
                ["प्रमुख जीवनदायिनी नदी", "ब्रह्मपुत्र (Brahmaputra) एवं बराक (Barak)"],
                ["राजकीय पशु", "एक सींग वाला गैंडा (Indian One-horned Rhinoceros)"],
                ["राजकीय पक्षी", "सफेद पंखों वाला बत्तख (White-winged Wood Duck - देवहाह)"],
                ["राजकीय वृक्ष", "होलोंग (Hollong - Dipterocarpus macrocarpus)"],
                ["राजकीय पुष्प", "फॉक्सटेल ऑर्किड / कोपो फूल (Foxtail Orchid - Rhynchostylis retusa)"],
                ["राजकीय शास्त्रीय नृत्य", "सत्रिया (Sattriya - श्रीमंत शंकरदेव द्वारा प्रवर्तित)"],
                ["प्रमुख जनजातियाँ", "बोडो, कार्बी, मिसिंग, राभा, दिमासा, तिवा (लालूंग), देउरी"]
              ]
            ),
            {
              _key: "b5-2",
              _type: "block",
              style: "h3",
              children: [{ _key: "s5-2", _type: "span", text: sanitizeText("2. असम के 7 राष्ट्रीय उद्यान (National Parks of Assam)") }],
            },
            createTable(
              "table-assam-national-parks",
              "असम के सभी 7 राष्ट्रीय उद्यान: परीक्षा उपयोगी विश्लेषण",
              ["क्र.", "राष्ट्रीय उद्यान (National Park)", "प्रमुख विशेषताएँ एवं वन्यजीव"],
              [
                ["1.", "काजीरंगा राष्ट्रीय उद्यान (Kaziranga NP)", "विश्व धरोहर स्थल (UNESCO); विश्व के दो-तिहाई एक सींग वाले गैंडों का घर; टाइगर रिजर्व"],
                ["2.", "मानस राष्ट्रीय उद्यान (Manas NP)", "UNESCO विश्व धरोहर स्थल; बायोस्फीयर रिजर्व; पिग्मी हॉग, गोल्डन लंगूर एवं जंगली जल भैंसा"],
                ["3.", "नामेरी राष्ट्रीय उद्यान (Nameri NP)", "सफेद पंखों वाले बत्तख (देवहाह) एवं हाथियों के लिए प्रसिद्ध; जिया भोरली नदी"],
                ["4.", "ओरांग राष्ट्रीय उद्यान (Orang NP)", "‘मिनी काजीरंगा’ के रूप में प्रसिद्ध; ब्रह्मपुत्र के उत्तरी तट पर स्थित टाइगर रिजर्व"],
                ["5.", "डिब्रू-सैखोवा राष्ट्रीय उद्यान (Dibru-Saikhowa NP)", "बायोस्फीयर रिजर्व; जंगली फेरल घोड़े (Feral Horses) एवं दुर्लभ सफेद बत्तख"],
                ["6.", "देहिंग पटकाई राष्ट्रीय उद्यान (Dihing Patkai NP)", "‘असम का वर्षावन’ (Amazon of the East); वर्षावन जैव विविधता व हाथी रिजर्व"],
                ["7.", "रायमोना राष्ट्रीय उद्यान (Raimona NP)", "बोडोलैंड प्रादेशिक क्षेत्र (BTR) में स्थित; प्रसिद्ध गोल्डन लंगूर (Golden Langur) का पर्यावास"]
              ]
            ),
            {
              _key: "b5-3",
              _type: "block",
              style: "h3",
              children: [{ _key: "s5-3", _type: "span", text: sanitizeText("3. असम की कला, संस्कृति, त्योहार एवं GI टैग") }],
            },
            {
              _key: "b5-4",
              _type: "block",
              style: "normal",
              children: [{ _key: "s5-4", _type: "span", text: sanitizeText("• **प्रमुख लोकनृत्य**: बिहू नृत्य (असम का सर्वाधिक लोकप्रिय नृत्य), बागुरुम्बा (बोडो जनजाति का तितली नृत्य), भोरताल नृत्य (सत्रीय संस्कृति आधारित), झूमर (चाय जनजाति का नृत्य) तथा निमसो केरुंग (कार्बी जनजाति)।") }],
            },
            {
              _key: "b5-5",
              _type: "block",
              style: "normal",
              children: [{ _key: "s5-5", _type: "span", text: sanitizeText("• **तीन बिहू पर्व**: रोंगाली बिहू (बोहाग बिहू - असमिया नववर्ष व बुवाई, अप्रैल), कोंगाली बिहू (काटी बिहू - फसल की रक्षा, अक्टूबर), और भोगाली बिहू (माघ बिहू - फसल कटाई व दावत, जनवरी)।") }],
            },
            {
              _key: "b5-6",
              _type: "block",
              style: "normal",
              children: [{ _key: "s5-6", _type: "span", text: sanitizeText("• **भौगोलिक संकेतक (GI Tags)**: **मूगा सिल्क (Muga Silk - असम का सुनहरा रेशम)**, असमिया **गामोसा (Gamosa)**, दिमासा जनजाति की **जुडिमा राइस वाइन (Judima Rice Wine)**, काजी नेमु (असमिया नींबू), और चोकुवा चावल (जादुई चावल)।") }],
            },
            {
              _key: "b5-7",
              _type: "block",
              style: "h3",
              children: [{ _key: "s5-7", _type: "span", text: sanitizeText("4. असम के अन्य ऐतिहासिक व भौगोलिक मील के पत्थर") }],
            },
            {
              _key: "b5-8",
              _type: "block",
              style: "normal",
              children: [{ _key: "s5-8", _type: "span", text: sanitizeText("• **माजुली द्वीप (Majuli Island)**: ब्रह्मपुत्र नदी पर स्थित विश्व का सबसे बड़ा नदी द्वीप (World's Largest River Island) तथा भारत का पहला द्वीपीय जिला।") }],
            },
            {
              _key: "b5-9",
              _type: "block",
              style: "normal",
              children: [{ _key: "s5-9", _type: "span", text: sanitizeText("• **डिगबोई तेल रिफाइनरी (Digboi)**: वर्ष 1901 में स्थापित, एशिया की पहली तथा विश्व की सबसे पुरानी कार्यरत तेल रिफाइनरियों में से एक।") }],
            },
            {
              _key: "b5-10",
              _type: "block",
              style: "normal",
              children: [{ _key: "s5-10", _type: "span", text: sanitizeText("• **भूपेन हजारिका सेतु (ढोला-सादिया पुल)**: लोहित नदी (ब्रह्मपुत्र की सहायक) पर बना 9.15 किमी लंबा भारत का सबसे लंबा नदी पुल, जो असम और अरुणाचल प्रदेश को जोड़ता है।") }],
            },
            {
              _key: "b5-11",
              _type: "block",
              style: "normal",
              children: [{ _key: "s5-11", _type: "span", text: sanitizeText("• **अंतरराष्ट्रीय सीमाएँ**: असम उत्तर में **भूटान** तथा दक्षिण-पश्चिम में **बांग्लादेश** के साथ अंतरराष्ट्रीय सीमा साझा करता है।") }],
            },
          ],
          bodyEn: [
            {
              _key: "b5-1e",
              _type: "block",
              style: "h3",
              children: [{ _key: "s5-1e", _type: "span", text: sanitizeText("1. Administrative Facts & State Symbols of Assam") }],
            },
            createTable(
              "table-assam-symbols-en",
              "Assam State Administrative Facts & Official State Symbols",
              ["Parameter", "Details"],
              [
                ["Date of Formation", "26 January 1950"],
                ["Capital", "Dispur"],
                ["Largest City / Gateway", "Guwahati (Gateway to Northeast India)"],
                ["Lifeline Rivers", "Brahmaputra and Barak"],
                ["State Animal", "One-horned Rhinoceros (Rhinoceros unicornis)"],
                ["State Bird", "White-winged Wood Duck (Asarcornis scutulata - Deohah)"],
                ["State Tree", "Hollong (Dipterocarpus macrocarpus)"],
                ["State Flower", "Foxtail Orchid / Kopou Phool (Rhynchostylis retusa)"],
                ["State Classical Dance", "Sattriya (Instituted by Srimanta Sankardev)"],
                ["Major Tribes", "Bodo, Karbi, Mishing, Rabha, Dimasa, Tiwa, Deori"]
              ]
            ),
            {
              _key: "b5-2e",
              _type: "block",
              style: "h3",
              children: [{ _key: "s5-2e", _type: "span", text: sanitizeText("2. 7 National Parks of Assam (Complete Breakdown)") }],
            },
            createTable(
              "table-assam-national-parks-en",
              "All 7 National Parks of Assam: Exam Analysis",
              ["No.", "National Park", "Key Biodiversity Highlights"],
              [
                ["1.", "Kaziranga National Park", "UNESCO World Heritage Site; harbors 2/3rd of world's one-horned rhinos; Tiger Reserve"],
                ["2.", "Manas National Park", "UNESCO World Heritage Site; Biosphere Reserve; Pygmy Hog, Golden Langur, Wild Water Buffalo"],
                ["3.", "Nameri National Park", "Prime habitat of White-winged Wood Duck & Asian Elephants; Jia Bhoroli river"],
                ["4.", "Orang National Park", "Known as 'Mini Kaziranga'; Tiger Reserve located on north bank of Brahmaputra"],
                ["5.", "Dibru-Saikhowa National Park", "Biosphere Reserve; feral wild horses and rare white-winged ducks"],
                ["6.", "Dihing Patkai National Park", "Termed 'Amazon of the East'; pristine lowland evergreen rainforest & elephant corridor"],
                ["7.", "Raimona National Park", "Located in Bodoland Territorial Region (BTR); prime sanctuary for endemic Golden Langur"]
              ]
            ),
            {
              _key: "b5-3e",
              _type: "block",
              style: "h3",
              children: [{ _key: "s5-3e", _type: "span", text: sanitizeText("3. Art, Culture, Festivals & GI Products") }],
            },
            {
              _key: "b5-4e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s5-4e", _type: "span", text: sanitizeText("• **Prominent Folk Dances**: Bihu Dance (celebratory agricultural dance), Bagurumba (butterfly dance of Bodos), Bhortal Dance (neo-Vaishnavite monastery tradition), Jhumur (Tea garden community dance), and Nimso Kerung (Karbi tribe).") }],
            },
            {
              _key: "b5-5e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s5-5e", _type: "span", text: sanitizeText("• **Tri-Bihu Festival Cycle**: Rongali (Bohag Bihu - Assamese New Year sowing in April), Kongali (Kati Bihu - pest protection in October), and Bhogali (Magh Bihu - post-harvest feast in January).") }],
            },
            {
              _key: "b5-6e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s5-6e", _type: "span", text: sanitizeText("• **Geographical Indications (GI Tags)**: **Muga Silk** (Golden silk of Assam), **Assamese Gamosa**, **Judima Rice Wine** (Dimasa tribe - first fermented beverage GI in NE), Kaji Nemu, and Chokuwa (magic rice).") }],
            },
            {
              _key: "b5-7e",
              _type: "block",
              style: "h3",
              children: [{ _key: "s5-7e", _type: "span", text: sanitizeText("4. Geography & Heritage Milestones") }],
            },
            {
              _key: "b5-8e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s5-8e", _type: "span", text: sanitizeText("• **Majuli Island**: World's largest riverine island on Brahmaputra river and India's first island district.") }],
            },
            {
              _key: "b5-9e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s5-9e", _type: "span", text: sanitizeText("• **Digboi Oil Refinery**: Established in 1901; Asia's first and one of the oldest operating crude oil refineries globally.") }],
            },
            {
              _key: "b5-10e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s5-10e", _type: "span", text: sanitizeText("• **Bhupen Hazarika Setu (Dhola-Sadiya Bridge)**: 9.15 km bridge over Lohit river connecting Assam with Arunachal Pradesh, one of India's longest water bridges.") }],
            },
            {
              _key: "b5-11e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s5-11e", _type: "span", text: sanitizeText("• **International Frontiers**: Shares international land borders with **Bhutan** to the north and **Bangladesh** to the south and west.") }],
            },
          ],
        },

        /* ── 6. High-Yield Exam Memory Points ─────────────────────── */
        {
          _key: "sec-exam-highlights",
          kind: "background",
          title: sanitizeText("MPPSC एवं UPSC परीक्षा हेतु महत्वपूर्ण स्मरणीय तथ्य (High-Yield Quick Revision)"),
          titleEn: sanitizeText("High-Yield Memory Points for MPPSC & UPSC Aspirants"),
          body: [
            {
              _key: "b6-1",
              _type: "block",
              style: "normal",
              children: [{ _key: "s6-1", _type: "span", text: sanitizeText("• **गिनीज वर्ल्ड रिकॉर्ड बनाने वाला लोकनृत्य**: निमसो केरुंग (Nimso Kerung)।") }],
            },
            {
              _key: "b6-2",
              _type: "block",
              style: "normal",
              children: [{ _key: "s6-2", _type: "span", text: sanitizeText("• **प्रतिभागियों की संख्या**: लगभग 15,000 कलाकार।") }],
            },
            {
              _key: "b6-3",
              _type: "block",
              style: "normal",
              children: [{ _key: "s6-3", _type: "span", text: sanitizeText("• **आयोजन स्थल एवं जिला**: दीफू (Diphu), कार्बी आंगलोंग जिला, असम।") }],
            },
            {
              _key: "b6-4",
              _type: "block",
              style: "normal",
              children: [{ _key: "s6-4", _type: "span", text: sanitizeText("• **आयोजन तिथि**: 16 नवंबर 2026।") }],
            },
            {
              _key: "b6-5",
              _type: "block",
              style: "normal",
              children: [{ _key: "s6-5", _type: "span", text: sanitizeText("• **संबद्ध पारंपरिक उत्सव**: चोमांगकान (Chomangkan - पूर्वजों की स्मृति में आयोजित अनुष्ठान)।") }],
            },
            {
              _key: "b6-6",
              _type: "block",
              style: "normal",
              children: [{ _key: "s6-6", _type: "span", text: sanitizeText("• **असम का शास्त्रीय नृत्य**: सत्रिया (Sattriya - 2000 में संगीत नाटक अकादमी द्वारा शास्त्रीय नृत्य घोषित)।") }],
            },
            {
              _key: "b6-7",
              _type: "block",
              style: "normal",
              children: [{ _key: "s6-7", _type: "span", text: sanitizeText("• **असम का राजकीय पशु**: एक सींग वाला गैंडा (काजीरंगा राष्ट्रीय उद्यान में सर्वाधिक आबादी)।") }],
            },
            {
              _key: "b6-8",
              _type: "block",
              style: "normal",
              children: [{ _key: "s6-8", _type: "span", text: sanitizeText("• **असम के कुल राष्ट्रीय उद्यान**: 7 राष्ट्रीय उद्यान (काजीरंगा, मानस, नामेरी, ओरांग, डिब्रू-सैखोवा, देहिंग पटकाई, रायमोना)।") }],
            },
            {
              _key: "b6-9",
              _type: "block",
              style: "normal",
              children: [{ _key: "s6-9", _type: "span", text: sanitizeText("• **विश्व का सबसे बड़ा नदी द्वीप**: माजुली द्वीप (ब्रह्मपुत्र नदी, असम)।") }],
            },
          ],
          bodyEn: [
            {
              _key: "b6-1e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s6-1e", _type: "span", text: sanitizeText("• **Record-Setting Folk Dance**: Nimso Kerung.") }],
            },
            {
              _key: "b6-2e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s6-2e", _type: "span", text: sanitizeText("• **Participant Ensemble**: Approximately 15,000 tribal dancers.") }],
            },
            {
              _key: "b6-3e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s6-3e", _type: "span", text: sanitizeText("• **Venue & District**: Diphu, Karbi Anglong District, Assam.") }],
            },
            {
              _key: "b6-4e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s6-4e", _type: "span", text: sanitizeText("• **Date of Record**: 16 November 2026.") }],
            },
            {
              _key: "b6-5e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s6-5e", _type: "span", text: sanitizeText("• **Associated Cultural Rite**: Chomangkan (Ancestral mortuary festival).") }],
            },
            {
              _key: "b6-6e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s6-6e", _type: "span", text: sanitizeText("• **Classical Dance of Assam**: Sattriya (Recognized by Sangeet Natak Akademi in 2000).") }],
            },
            {
              _key: "b6-7e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s6-7e", _type: "span", text: sanitizeText("• **State Animal of Assam**: Greater One-horned Rhinoceros.") }],
            },
            {
              _key: "b6-8e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s6-8e", _type: "span", text: sanitizeText("• **Total National Parks**: 7 (Kaziranga, Manas, Nameri, Orang, Dibru-Saikhowa, Dihing Patkai, Raimona).") }],
            },
            {
              _key: "b6-9e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s6-9e", _type: "span", text: sanitizeText("• **World's Largest River Island**: Majuli on Brahmaputra river.") }],
            },
          ],
        },
      ],

      /* ── 8 Practice MCQs (Quizzes) ──────────────────────────────── */
      mcqs: [
        {
          question: "नवंबर 2026 में लगभग 15,000 कलाकारों द्वारा प्रस्तुत किस कार्बी लोकनृत्य ने ‘Largest Karbi Folk Dance’ का गिनीज वर्ल्ड रिकॉर्ड बनाया?",
          questionEn: "Which Karbi folk dance performed by approximately 15,000 artists in November 2026 set a Guinness World Record for the 'Largest Karbi Folk Dance'?",
          options: [
            "बिहू (Bihu)",
            "बागुरुम्बा (Bagurumba)",
            "निमसो केरुंग (Nimso Kerung)",
            "सत्रिया (Sattriya)"
          ],
          optionsEn: [
            "Bihu",
            "Bagurumba",
            "Nimso Kerung",
            "Sattriya"
          ],
          correctIndex: 2,
          explanation: "16 नवंबर 2026 को असम के कार्बी आंगलोंग जिले के दीफू में लगभग 15,000 कलाकारों ने पारंपरिक ‘निमसो केरुंग’ (Nimso Kerung) लोकनृत्य प्रस्तुत कर गिनीज वर्ल्ड रिकॉर्ड बनाया।",
          explanationEn: "On 16 November 2026, 15,000 artists performed the 'Nimso Kerung' dance at Diphu, Karbi Anglong, setting an official Guinness World Record."
        },
        {
          question: "कार्बी भाषा में ‘निमसो केरुंग’ (Nimso Kerung) का शाब्दिक अर्थ क्या होता है?",
          questionEn: "What is the literal meaning of 'Nimso Kerung' in the Karbi language?",
          options: [
            "युवती को चुनना या साथ लेकर चलना",
            "फसल की कटाई का उत्सव",
            "युद्ध की विजय का उल्लास",
            "नदियों का पवित्र संगम"
          ],
          optionsEn: [
            "To choose or take along a young maiden",
            "Celebration of agricultural harvest",
            "Jubilation of wartime victory",
            "Sacred confluence of rivers"
          ],
          correctIndex: 0,
          explanation: "कार्बी भाषा में 'निमसो' का अर्थ युवती/कुंवारी कन्या और 'केरुंग' का अर्थ चुनना या साथ लेना होता है। यह सामाजिक रूप से युवा मेलजोल और विवाह परंपरा से जुड़ा है।",
          explanationEn: "'Nimso' translates to young maiden, and 'Kerung' means to choose or take along, symbolizing community courtship and tribal youth alliance."
        },
        {
          question: "‘निमसो केरुंग’ लोकनृत्य पारंपरिक रूप से कार्बी जनजाति के किस प्रमुख उत्सव/संस्कार से जुड़ा हुआ है?",
          questionEn: "With which sacred ancestral festival/ceremony of the Karbi community is the 'Nimso Kerung' dance traditionally associated?",
          options: [
            "रोंगाली बिहू",
            "चोमांगकान (Chomangkan)",
            "अंबुबाची मेला",
            "हॉर्नबिल उत्सव"
          ],
          optionsEn: [
            "Rongali Bihu",
            "Chomangkan",
            "Ambubachi Mela",
            "Hornbill Festival"
          ],
          correctIndex: 1,
          explanation: "निमसो केरुंग पारंपरिक रूप से ‘चोमांगकान’ (Chomangkan) से जुड़ा है, जो दिवंगत परिजनों की आत्मा की शांति और सम्मान में आयोजित होने वाला कार्बी समाज का 4-दिवसीय अनुष्ठान है।",
          explanationEn: "Nimso Kerung is an integral component of 'Chomangkan', the 4-day sacred mortuary festival honoring deceased ancestral spirits in Karbi tradition."
        },
        {
          question: "असम का आधिकारिक शास्त्रीय नृत्य (Classical Dance) कौन सा है, जिसे संगीत नाटक अकादमी द्वारा वर्ष 2000 में मान्यता दी गई थी?",
          questionEn: "Which is the official Classical Dance of Assam, formally recognized by the Sangeet Natak Akademi in the year 2000?",
          options: [
            "बिहू नृत्य",
            "बागुरुम्बा नृत्य",
            "सत्रिया (Sattriya)",
            "भोरताल नृत्य"
          ],
          optionsEn: [
            "Bihu Dance",
            "Bagurumba Dance",
            "Sattriya",
            "Bhortal Dance"
          ],
          correctIndex: 2,
          explanation: "15वीं शताब्दी में वैष्णव संत श्रीमंत शंकरदेव द्वारा स्थापित 'सत्रिया' असम का शास्त्रीय नृत्य है, जिसे संगीत नाटक अकादमी ने 15 नवंबर 2000 को 8वें शास्त्रीय नृत्य के रूप में मान्यता दी।",
          explanationEn: "Sattriya, initiated by 15th-century saint Srimanta Sankardev in Assam's monastic Sattras, was recognized as an official classical dance in 2000."
        },
        {
          question: "वर्तमान में असम में कुल कितने राष्ट्रीय उद्यान (National Parks) अधिसूचित हैं?",
          questionEn: "How many National Parks are officially notified in the state of Assam currently?",
          options: [
            "5",
            "6",
            "7",
            "8"
          ],
          optionsEn: [
            "5",
            "6",
            "7",
            "8"
          ],
          correctIndex: 2,
          explanation: "असम में कुल 7 राष्ट्रीय उद्यान हैं: काजीरंगा, मानस, नामेरी, ओरांग, डिब्रू-सैखोवा, देहिंग पटकाई और रायमोना। मध्य प्रदेश (11/12) के बाद असम देश के सर्वाधिक राष्ट्रीय उद्यानों वाले राज्यों में शामिल है।",
          explanationEn: "Assam has 7 National Parks: Kaziranga, Manas, Nameri, Orang, Dibru-Saikhowa, Dihing Patkai, and Raimona."
        },
        {
          question: "असम के किस लोकनृत्य को बोडो जनजाति द्वारा प्रकृति और तितली की गति से प्रेरित होकर प्रस्तुत किया जाता है?",
          questionEn: "Which indigenous folk dance of Assam is performed by the Bodo community, traditionally inspired by the fluttering motion of butterflies?",
          options: [
            "बागुरुम्बा (Bagurumba)",
            "झूमर (Jhumur)",
            "ओजापली (Ojapali)",
            "भोरताल (Bhortal)"
          ],
          optionsEn: [
            "Bagurumba",
            "Jhumur",
            "Ojapali",
            "Bhortal"
          ],
          correctIndex: 0,
          explanation: "बागुरुम्बा (Bagurumba) बोडो जनजाति का अत्यंत प्रसिद्ध लोकनृत्य है, जिसमें नर्तकियाँ रंग-बिरंगे पारंपरिक वस्त्रों (दोखोना) में तितली की तरह हाथ फैलाकर नृत्य करती हैं।",
          explanationEn: "Bagurumba is the celebrated folk dance of Assam's Bodo tribe, famously characterized by butterfly-like rhythmic arm and body movements."
        },
        {
          question: "ब्रह्मपुत्र नदी पर स्थित विश्व का सबसे बड़ा नदी द्वीप (World's Largest River Island) कौन सा है?",
          questionEn: "Which is the world's largest inhabited riverine island, situated on the Brahmaputra River in Assam?",
          options: [
            "उमानंद द्वीप",
            "माजुली द्वीप (Majuli)",
            "भवानी द्वीप",
            "मुनरो द्वीप"
          ],
          optionsEn: [
            "Umananda Island",
            "Majuli Island",
            "Bhavani Island",
            "Munroe Island"
          ],
          correctIndex: 1,
          explanation: "माजुली द्वीप (Majuli) ब्रह्मपुत्र नदी पर स्थित विश्व का सबसे बड़ा नदी द्वीप है। यह 2016 में भारत का पहला द्वीपीय जिला बना तथा नव-वैष्णव सत्रीय संस्कृति का प्रमुख केंद्र है।",
          explanationEn: "Majuli Island on the Brahmaputra River is the world's largest river island and became India's first complete island district in 2016."
        },
        {
          question: "असम की किस पारंपरिक राइस वाइन (Rice Wine) को पूर्वोत्तर भारत के पहले किण्वित पेय के रूप में भौगोलिक संकेतक (GI Tag) प्रदान किया गया था?",
          questionEn: "Which traditional tribal rice wine of Assam was conferred the Geographical Indication (GI Tag), making it the first fermented beverage from Northeast India to get a GI tag?",
          options: [
            "अपांग (Apong)",
            "जुडिमा (Judima - दिमासा जनजाति)",
            "फेनी (Feni)",
            "जुआंग (Jhuang)"
          ],
          optionsEn: [
            "Apong",
            "Judima (Dimasa tribe)",
            "Feni",
            "Jhuang"
          ],
          correctIndex: 1,
          explanation: "असम की दिमासा जनजाति द्वारा चिपचिपे चावल और पारंपरिक जड़ी-बूटियों से निर्मित 'जुडिमा' (Judima) राइस वाइन को जीआई टैग प्रदान किया गया है।",
          explanationEn: "Judima, an indigenous fermented rice wine brewed by Assam's Dimasa tribe, is the first alcoholic beverage from the Northeast to receive a GI tag."
        }
      ],

      /* ── 10 Collapsible FAQs ────────────────────────────────────── */
      faqs: [
        {
          question: "असम के किस लोकनृत्य ने हाल ही में गिनीज वर्ल्ड रिकॉर्ड बनाया है?",
          questionEn: "Which folk dance of Assam recently set a Guinness World Record?",
          answer: "कार्बी जनजाति के पारंपरिक लोकनृत्य ‘निमसो केरुंग’ (Nimso Kerung) ने 16 नवंबर 2026 को लगभग 15,000 कलाकारों की सामूहिक प्रस्तुति के साथ 'Largest Karbi Folk Dance' का गिनीज वर्ल्ड रिकॉर्ड बनाया।",
          answerEn: "The traditional Karbi indigenous dance 'Nimso Kerung' set a Guinness World Record on 16 Nov 2026 for 'Largest Karbi Folk Dance' with 15,000 performers."
        },
        {
          question: "यह ऐतिहासिक आयोजन असम के किस जिले में आयोजित हुआ?",
          questionEn: "In which district of Assam was this historic performance staged?",
          answer: "यह आयोजन असम के कार्बी आंगलोंग जिले के जिला मुख्यालय दीफू (Diphu) में आयोजित किया गया।",
          answerEn: "The event was organized at Diphu, the district headquarters of Karbi Anglong in Assam."
        },
        {
          question: "‘निमसो केरुंग’ शब्द का शाब्दिक अर्थ क्या है?",
          questionEn: "What does 'Nimso Kerung' literally mean in the Karbi language?",
          answer: "कार्बी भाषा में ‘निमसो’ का अर्थ युवती/कुंवारी कन्या और ‘केरुंग’ का अर्थ चुनना या साथ लेकर चलना होता है।",
          answerEn: "'Nimso' signifies a young maiden and 'Kerung' translates as choosing or escorting along together in the Karbi language."
        },
        {
          question: "निमसो केरुंग नृत्य किस पारंपरिक कार्बी उत्सव से संबंधित है?",
          questionEn: "With which festival is Nimso Kerung customarily associated?",
          answer: "यह पारंपरिक रूप से ‘चोमांगकान’ (Chomangkan) समारोह से जुड़ा है, जो दिवंगत पूर्वजों की आत्मा की शांति और मुक्ति हेतु मनाया जाने वाला पवित्र 4-दिवसीय अनुष्ठान है।",
          answerEn: "It is linked to 'Chomangkan', the 4-day ancestral post-funerary festival honoring deceased forebears in Karbi society."
        },
        {
          question: "गिनीज रिकॉर्ड बनाने के लिए क्या मुख्य शर्तें निर्धारित थीं?",
          questionEn: "What were the mandatory criteria prescribed by Guinness World Records?",
          answer: "न्यूनतम 250 कलाकारों की उपस्थिति, 100% प्रामाणिक पारंपरिक परिधान और कम से कम 5 मिनट तक निरंतर समकालिक (Synchronized) सामूहिक नृत्य। 15,000 कलाकारों ने इन सभी शर्तों को पूर्ण किया।",
          answerEn: "Mandatory conditions included at least 250 participants, authentic traditional tribal costume, and at least 5 minutes of unbroken synchronized performance."
        },
        {
          question: "असम का शास्त्रीय नृत्य कौन सा है और इसके प्रवर्तक कौन थे?",
          questionEn: "Which is the classical dance of Assam and who was its founder?",
          answer: "असम का शास्त्रीय नृत्य ‘सत्रिया’ (Sattriya) है, जिसे 15वीं शताब्दी में महान वैष्णव संत और समाज सुधारक श्रीमंत शंकरदेव द्वारा सत्रीय मठों में शुरू किया गया था।",
          answerEn: "Assam's classical dance is 'Sattriya', pioneered in the 15th century by Vaishnavite saint-reformer Srimanta Sankardev."
        },
        {
          question: "असम में कितने राष्ट्रीय उद्यान हैं?",
          questionEn: "How many National Parks are situated in Assam?",
          answer: "असम में कुल 7 राष्ट्रीय उद्यान हैं: काजीरंगा, मानस, नामेरी, ओरांग, डिब्रू-सैखोवा, देहिंग पटकाई और रायमोना।",
          answerEn: "Assam hosts 7 National Parks: Kaziranga, Manas, Nameri, Orang, Dibru-Saikhowa, Dihing Patkai, and Raimona."
        },
        {
          question: "काजीरंगा राष्ट्रीय उद्यान किस वन्यजीव के लिए वैश्विक स्तर पर प्रसिद्ध है?",
          questionEn: "Which wildlife species is Kaziranga National Park world-renowned for?",
          answer: "काजीरंगा राष्ट्रीय उद्यान विश्व के दो-तिहाई 'एक सींग वाले गैंडों' (Great One-horned Rhinoceros) की आबादी का पर्यावास होने के लिए विश्व प्रसिद्ध है। यह UNESCO विश्व धरोहर स्थल भी है।",
          answerEn: "Kaziranga is globally renowned for hosting two-thirds of the world's Greater One-horned Rhinoceros population."
        },
        {
          question: "माजुली द्वीप का क्या भौगोलिक महत्व है?",
          questionEn: "What is the geographical significance of Majuli Island?",
          answer: "माजुली ब्रह्मपुत्र नदी में स्थित विश्व का सबसे बड़ा नदी द्वीप है तथा यह भारत का पहला द्वीपीय जिला और सत्रीय वैष्णव संस्कृति का प्रमुख केंद्र है।",
          answerEn: "Majuli is the world's largest river island on the Brahmaputra River and was declared India's first island district in 2016."
        },
        {
          question: "MPPSC परीक्षा के लिए कार्बी लोकनृत्य और असम का क्या महत्व है?",
          questionEn: "Why is Karbi folk dance and Assam GK important for MPPSC aspirants?",
          answer: "MPPSC प्रारंभिक परीक्षा की यूनिट 1 व यूनिट 10 (जनजातियाँ एवं लोक संस्कृति) तथा मुख्य परीक्षा पेपर 1 में भारत की जनजातीय विरासत, प्रमुख राष्ट्रीय उद्यान एवं सांस्कृतिक रिकॉर्ड्स पर सीधे प्रश्न पूछे जाते हैं।",
          answerEn: "It directly features in MPPSC Prelims Unit 1 & Unit 10 (Tribal Heritage & Folk Arts) and Mains Paper 1 Indian Culture."
        }
      ]
    };

    const res = await client.createOrReplace({
      _id: docId,
      ...articlePayload,
    });

    console.log(`✅ Successfully published ${docId} to Sanity CMS!`);
  }

  console.log("🎉 All documents uploaded and synced to Sanity CMS successfully!");
}

main().catch((err) => {
  console.error("❌ Error uploading article:", err);
  process.exit(1);
});

