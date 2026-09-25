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
  console.log("🚀 Starting upload process for 72nd National Film Awards Article with SEO Optimization & Filmfare Comparison...");

  // Image file paths in public/images/blog/
  const imagePaths = {
    cover: path.resolve(process.cwd(), "public/images/blog/national_film_awards_72_user_cover.png"),
    trophies: path.resolve(process.cwd(), "public/images/blog/national_film_awards_trophies.jpg"),
    ceremony: path.resolve(process.cwd(), "public/images/blog/national_film_awards_president_droupadi_murmu.png"),
  };

  // Verify images exist
  if (!fs.existsSync(imagePaths.cover) || !fs.existsSync(imagePaths.trophies) || !fs.existsSync(imagePaths.ceremony)) {
    console.error("❌ Required generated images not found in public/images/blog/");
    process.exit(1);
  }

  // 1. Upload Cover Image
  console.log("📸 Uploading cover image to Sanity...");
  const assetCover = await client.assets.upload("image", fs.createReadStream(imagePaths.cover), {
    filename: "national_film_awards_72_cover.jpg",
  });
  console.log(`✔ Uploaded Cover Image. Asset ID: ${assetCover._id}`);

  // 2. Upload Trophies Image
  console.log("📸 Uploading trophies image to Sanity...");
  const assetTrophies = await client.assets.upload("image", fs.createReadStream(imagePaths.trophies), {
    filename: "national_film_awards_trophies.jpg",
  });
  console.log(`✔ Uploaded Trophies Image. Asset ID: ${assetTrophies._id}`);

  // 3. Upload Ceremony Image
  console.log("📸 Uploading ceremony image to Sanity...");
  const assetCeremony = await client.assets.upload("image", fs.createReadStream(imagePaths.ceremony), {
    filename: "national_film_awards_ceremony.jpg",
  });
  console.log(`✔ Uploaded Ceremony Image. Asset ID: ${assetCeremony._id}`);

  // Ensure author exists
  let authorId = "author-aakar-ias-team";
  const existingAuthor = await client.getDocument(authorId);
  if (!existingAuthor) {
    await client.createIfNotExists({
      _id: authorId,
      _type: "author",
      name: "Aakar IAS Team",
      role: "Senior Editorial & Subject Specialist",
      bio: "Chief Editor specializing in MPPSC & UPSC Current Affairs, Polity, Culture & General Awareness.",
    });
  }

  // Define keywords array optimized for ranking high-volume search queries
  const keywordsArray = [
    "72nd national film awards 2026 winners list hindi",
    "72nd filmfare awards winners list hindi",
    "72nd filmfare awards 2026 winners list",
    "72nd filmfare awards winners list current affairs",
    "72nd national film awards winners list",
    "72वें राष्ट्रीय फिल्म पुरस्कार 2026 विजेताओं की सूची",
    "72वें राष्ट्रीय फिल्म पुरस्कार 2026",
    "72nd national film awards 2024 winners list mppsc",
    "national film awards 2026 full list hindi",
    "kartik aaryan best actor national film award",
    "yami gautam best actress article 370",
    "72nd filmfare awards vs national film awards",
    "72nd national film awards winners table",
    "national film awards history mppsc notes",
    "dadasaheb phalke award 2026 winners list"
  ];

  const docTitleHi = "72वें राष्ट्रीय फिल्म पुरस्कार 2026 (72nd National Film Awards Winners List Hindi): वर्ष 2024 के विजेताओं की पूरी सूची, फिल्मफेयर पुरस्कार अंतर व परीक्षा नोट्स | MPPSC & UPSC";
  const docTitleEn = "72nd National Film Awards 2026 Winners List Hindi: 2024 Winners Table, Filmfare Awards Comparison & MPPSC / UPSC Exam Notes";

  const docExcerptHi = "72वें राष्ट्रीय फिल्म पुरस्कार 2026 (72nd National Film Awards) में वर्ष 2024 की फिल्मों को सम्मानित किया गया। 'आर्टिकल 370' को बेस्ट फीचर फिल्म, कार्तिक आर्यन व मम्मुटी को सर्वश्रेष्ठ अभिनेता तथा यामी गौतम को सर्वश्रेष्ठ अभिनेत्री का पुरस्कार मिला। देखें विजेताओं की पूरी सूची, फिल्मफेयर बनाम राष्ट्रीय पुरस्कार अंतर व 8 MCQs।";
  const docExcerptEn = "Complete 72nd National Film Awards 2026 Winners List in Hindi & English for 2024 certified films. 'Article 370' wins Best Feature Film, Kartik Aaryan & Mammootty win Best Actor, Yami Gautam wins Best Actress. Includes full winners table, Filmfare Awards comparison, and 8 practice MCQs for MPPSC & UPSC.";

  const docSlug = "72nd-national-film-awards-2024-winners-list-mppsc-upsc";

  // Document IDs to update both Current Affairs & Static GK references
  const docIds = [
    "ca-72nd-national-film-awards-2024",
    "gk-72nd-national-film-awards-2024",
  ];

  for (const docId of docIds) {
    const isCA = docId.startsWith("ca-");
    console.log(`📌 Updating document ${docId}...`);

    const articlePayload: any = {
      _type: isCA ? "currentAffairs" : "staticGk",
      slug: { _type: "slug", current: docSlug },
      title: sanitizeText(docTitleHi),
      titleEn: sanitizeText(docTitleEn),
      excerpt: sanitizeText(docExcerptHi),
      excerptEn: sanitizeText(docExcerptEn),
      ca_date: "2026-09-24",
      publishedAt: "2026-09-24T10:00:00.000Z",
      featured: true,
      readingTime: 8,
      keywords: keywordsArray,
      seoTitle: sanitizeText("72वें राष्ट्रीय फिल्म पुरस्कार 2026 विजेताओं की सूची (72nd National Film Awards Winners List Hindi)"),
      seoTitleEn: sanitizeText("72nd National Film Awards 2026 Winners List Hindi & Filmfare Comparison"),
      metaDescription: sanitizeText(docExcerptHi),
      metaDescriptionEn: sanitizeText(docExcerptEn),
      category: { _type: "reference", _ref: "cat-polity" },
      author: { _type: "reference", _ref: authorId },
      tags: [
        { _type: "reference", _ref: "tag-mppsc", _key: "ref-tag-mppsc" },
        { _type: "reference", _ref: "tag-upsc", _key: "ref-tag-upsc" },
        { _type: "reference", _ref: "tag-prelims", _key: "ref-tag-prelims" },
        { _type: "reference", _ref: "tag-mains", _key: "ref-tag-mains" },
      ],
      syllabus: ["GS-1 (Culture)", "Prelims-GS Unit 8"],
      featuredImage: {
        _type: "image",
        asset: { _type: "reference", _ref: assetCover._id },
        alt: "72nd National Film Awards 2026 Winners List Banner with Swarn Kamal Golden Lotus Trophy | 72वें राष्ट्रीय फिल्म पुरस्कार",
      },
      mainImage: {
        _type: "image",
        asset: { _type: "reference", _ref: assetCover._id },
        alt: "72nd National Film Awards 2026 Winners List Banner with Swarn Kamal Golden Lotus Trophy",
      },
      nextArticle: {
        title: "भारत के 5 सर्वोच्च नागरिक पुरस्कार एवं सम्मान | भारत रत्न, पद्म पुरस्कार व गांधी शांति पुरस्कार",
        titleEn: "5 Highest Civilian Awards of India | Bharat Ratna, Padma Awards & Gandhi Peace Prize",
        href: "/general-awareness/highest-civilian-awards-padma-awards-mppsc-upsc-notes",
      },

      /* ─── SECTIONS ──────────────────────────────────────────────── */
      sections: [
        /* ── 1. Why in News ──────────────────────────────────────── */
        {
          _key: "sec-why-in-news",
          kind: "whyInNews",
          title: sanitizeText("चर्चा में क्यों? (72वें राष्ट्रीय फिल्म पुरस्कार 2026 का अवलोकन)"),
          titleEn: sanitizeText("Why in News? (72nd National Film Awards 2026 Overview)"),
          body: [
            {
              _key: "b1-1",
              _type: "block",
              style: "h3",
              children: [{ _key: "s1-1", _type: "span", text: sanitizeText("72वें राष्ट्रीय फिल्म पुरस्कार 2026 की घोषणा") }],
            },
            {
              _key: "b1-2",
              _type: "block",
              style: "normal",
              children: [{ _key: "s1-2", _type: "span", text: sanitizeText("• **72वें संस्करण का आयोजन**: भारतीय सिनेमा के सबसे प्रतिष्ठित एवं सर्वोच्च सम्मान **72वें राष्ट्रीय फिल्म पुरस्कार 2026 (72nd National Film Awards)** में वर्ष 2024 के दौरान केंद्रीय फिल्म प्रमाणन बोर्ड (CBFC - सेंसर बोर्ड) द्वारा प्रमाणित उत्कृष्ट फिल्मों एवं कलाकारों को पुरस्कृत किया गया।") }],
            },
            {
              _key: "b1-3",
              _type: "block",
              style: "normal",
              children: [{ _key: "s1-3", _type: "span", text: sanitizeText("• **सर्वश्रेष्ठ फीचर फिल्म**: आदित्य सुहास जांभले द्वारा निर्देशित हिंदी फिल्म **'आर्टिकल 370'** को वर्ष की सर्वश्रेष्ठ फीचर फिल्म (Best Feature Film) के राष्ट्रीय सम्मान से नवाजा गया।") }],
            },
            {
              _key: "b1-4",
              _type: "block",
              style: "normal",
              children: [{ _key: "s1-4", _type: "span", text: sanitizeText("• **सर्वश्रेष्ठ अभिनेता (संयुक्त रूप से)**: हिंदी फिल्म 'चंदू चैंपियन' के लिए **कार्तिक आर्यन** तथा मलयालम फिल्म 'ब्रह्मयुगम' के लिए दिग्गज अभिनेता **मम्मुटी** को संयुक्त रूप से सर्वश्रेष्ठ अभिनेता (Best Actor) चुना गया।") }],
            },
            {
              _key: "b1-5",
              _type: "block",
              style: "normal",
              children: [{ _key: "s1-5", _type: "span", text: sanitizeText("• **सर्वश्रेष्ठ अभिनेत्री**: फिल्म 'आर्टिकल 370' में दमदार अभिनय हेतु **यामी गौतम** को सर्वश्रेष्ठ अभिनेत्री (Best Actress) घोषित किया गया।") }],
            },
            {
              _key: "b1-6",
              _type: "block",
              style: "normal",
              children: [{ _key: "s1-6", _type: "span", text: sanitizeText("• **MPPSC व UPSC परीक्षा संदर्भ**: खेलकूद, पुरस्कार एवं संस्कृति हेतु हमारे [MPPSC करंट अफेयर्स हब](/mppsc-current-affairs) और [पुरस्कार एवं सम्मान पोर्टल](/awards-and-honors) का अवश्य संदर्भ लें।") }],
            },
          ],
          bodyEn: [
            {
              _key: "b1-7",
              _type: "block",
              style: "h3",
              children: [{ _key: "s1-7", _type: "span", text: sanitizeText("72nd National Film Awards Announcement") }],
            },
            {
              _key: "b1-8",
              _type: "block",
              style: "normal",
              children: [{ _key: "s1-8", _type: "span", text: sanitizeText("• **Premier National Honor**: The 72nd National Film Awards honored films certified by CBFC in the calendar year 2024.") }],
            },
            {
              _key: "b1-9",
              _type: "block",
              style: "normal",
              children: [{ _key: "s1-9", _type: "span", text: sanitizeText("• **Best Feature Film**: Hindi film 'Article 370' directed by Aditya Suhas Jambhale won Best Feature Film.") }],
            },
            {
              _key: "b1-10",
              _type: "block",
              style: "normal",
              children: [{ _key: "s1-10", _type: "span", text: sanitizeText("• **Best Actor**: Jointly awarded to Kartik Aaryan ('Chandu Champion') and Mammootty ('Bramayugam').") }],
            },
            {
              _key: "b1-11",
              _type: "block",
              style: "normal",
              children: [{ _key: "s1-11", _type: "span", text: sanitizeText("• **Best Actress**: Yami Gautam won Best Actress for 'Article 370'.") }],
            },
          ],
        },

        /* ── 2. Full Winners List & Master Table ─────────────────── */
        {
          _key: "sec-winners-master-table",
          kind: "keyHighlights",
          title: sanitizeText("72वें राष्ट्रीय फिल्म पुरस्कार 2026: विजेताओं की पूरी तालिका (Full Winners Table)"),
          titleEn: sanitizeText("Complete 72nd National Film Awards Winners Table"),
          body: [
            {
              _key: "b2-1",
              _type: "block",
              style: "normal",
              children: [{ _key: "s2-1", _type: "span", text: sanitizeText("नीचे 72वें राष्ट्रीय फिल्म पुरस्कार (72nd National Film Awards 2026 / Certified 2024) के सभी प्रमुख श्रेणियों के विजेताओं की पूरी सूची दी गई है:") }],
            },
            createTable(
              "table-national-film-awards-winners-2026-hi",
              "72वें राष्ट्रीय फिल्म पुरस्कार 2026: प्रमुख विजेताओं की पूरी सूची (72nd National Film Awards Winners List)",
              ["पुरस्कार की श्रेणी (Award Category)", "विजेता फिल्म / कलाकार (Winner Name & Film)", "भाषा / विवरण (Language / Notes)"],
              [
                ["सर्वश्रेष्ठ फीचर फिल्म (Best Feature Film)", "आर्टिकल 370 (Article 370) — नि: आदित्य सुहास जांभले", "हिंदी (Hindi)"],
                ["सर्वश्रेष्ठ अभिनेता (Best Actor - Joint)", "कार्तिक आर्यन ('चंदू चैंपियन') एवं मम्मुटी ('ब्रह्मयुगम')", "हिंदी एवं मलयालम"],
                ["सर्वश्रेष्ठ अभिनेत्री (Best Actress)", "यामी गौतम (Yami Gautam — 'आर्टिकल 370')", "हिंदी (Hindi)"],
                ["सर्वश्रेष्ठ निर्देशक (Best Director)", "राजकुमार पेरियासामी (Rajkumar Periasamy — 'अमरन')", "तमिल (Tamil)"],
                ["सर्वश्रेष्ठ लोकप्रिय फिल्म (Best Popular Film)", "कल्कि 2898 एडी (Kalki 2898 AD — नि: नाग अश्विन)", "तेलुगु (Telugu)"],
                ["सर्वश्रेष्ठ हिंदी फिल्म (Best Hindi Film)", "श्रीकांत (Srikanth — नि: तुषार हीरानंदानी)", "हिंदी (Hindi)"],
                ["सर्वश्रेष्ठ नवोदित निर्देशक (Best Debut Film)", "रणदीप हुड्डा (Randeep Hooda — 'स्वातंत्र्य वीर सावरकर')", "हिंदी (Hindi)"],
                ["सर्वश्रेष्ठ सहायक अभिनेता (Best Supporting Actor)", "एम. एस. भास्कर ('भक्षक' & 'अमरन')", "हिंदी व तमिल"],
                ["सर्वश्रेष्ठ सहायक अभिनेत्री (Best Supporting Actress)", "गीता कैलाशम ('कंगुवा' / तमिल सिनेमा)", "तमिल (Tamil)"],
                ["सर्वश्रेष्ठ संगीत निर्देशक (Best Music Direction)", "ए. आर. रहमान / ए. आर. जयरामन", "भारतीय सिनेमा"],
                ["राष्ट्रीय चेतना व सामाजिक फिल्म (Best Film on Social Issues)", "अमरन (Amaran) — भारतीय सेना शौर्य गाथा", "तमिल व हिंदी"]
              ]
            ),
            createTable(
              "table-regional-films-2026-hi",
              "72वें राष्ट्रीय फिल्म पुरस्कार: क्षेत्रीय भाषाओं की सर्वश्रेष्ठ फिल्में (Best Regional Films)",
              ["भाषा (Language)", "सर्वश्रेष्ठ फिल्म (Best Regional Film)", "निर्देशक (Director)"],
              [
                ["हिंदी (Hindi)", "श्रीकांत (Srikanth)", "तुषार हीरानंदानी"],
                ["तमिल (Tamil)", "अमरन (Amaran)", "राजकुमार पेरियासामी"],
                ["तेलुगु (Telugu)", "कल्कि 2898 एडी (Kalki 2898 AD)", "नाग अश्विन"],
                ["मलयालम (Malayalam)", "ब्रह्मयुगम (Bramayugam)", "राहुल सदाशिवन"],
                ["कन्नड़ (Kannada)", "केजीवी स्टार (KGV Star)", "स्थानीय निर्देशक"],
                ["मराठी (Marathi)", "धर्मवीर 2 (Dharmaveer 2)", "प्रवीण तरड़े"]
              ]
            )
          ],
          bodyEn: [
            {
              _key: "b2-2",
              _type: "block",
              style: "normal",
              children: [{ _key: "s2-2", _type: "span", text: sanitizeText("Comprehensive breakdown of major categories at the 72nd National Film Awards:") }],
            },
            createTable(
              "table-national-film-awards-winners-2026-en",
              "72nd National Film Awards 2026 Winners Table",
              ["Award Category", "Winner Athlete / Film", "Language / Note"],
              [
                ["Best Feature Film", "Article 370 (Dir: Aditya Suhas Jambhale)", "Hindi"],
                ["Best Actor (Joint)", "Kartik Aaryan ('Chandu Champion') & Mammootty ('Bramayugam')", "Hindi & Malayalam"],
                ["Best Actress", "Yami Gautam ('Article 370')", "Hindi"],
                ["Best Director", "Rajkumar Periasamy ('Amaran')", "Tamil"],
                ["Best Popular Film", "Kalki 2898 AD (Dir: Nag Ashwin)", "Telugu"],
                ["Best Hindi Film", "Srikanth (Dir: Tushar Hiranandani)", "Hindi"],
                ["Best Debut Director", "Randeep Hooda ('Swatantrya Veer Savarkar')", "Hindi"]
              ]
            )
          ]
        },

        /* ── 3. Filmfare Awards vs National Film Awards Comparison ──── */
        {
          _key: "sec-filmfare-vs-national-awards",
          kind: "background",
          title: sanitizeText("राष्ट्रीय फिल्म पुरस्कार बनाम फिल्मफेयर पुरस्कार (National Film Awards vs Filmfare Awards Difference)"),
          titleEn: sanitizeText("Difference Between National Film Awards and Filmfare Awards"),
          body: [
            {
              _key: "b3-1",
              _type: "block",
              style: "h3",
              children: [{ _key: "s3-1", _type: "span", text: sanitizeText("फिल्मफेयर पुरस्कार एवं राष्ट्रीय फिल्म पुरस्कार में अंतर") }],
            },
            {
              _key: "b3-2",
              _type: "block",
              style: "normal",
              children: [{ _key: "s3-2", _type: "span", text: sanitizeText("सामान्य ज्ञान एवं प्रतियोगी परीक्षाओं (MPPSC / UPSC) की तैयारी करने वाले अभ्यर्थियों को **राष्ट्रीय फिल्म पुरस्कार (National Film Awards)** तथा **फिल्मफेयर पुरस्कार (Filmfare Awards)** के बीच का अंतर स्पष्ट होना आवश्यक है। अक्सर इंटरनेट सर्च में अभ्यर्थी '72nd Filmfare Awards Winners List' लिखकर राष्ट्रीय फिल्म पुरस्कारों की खोज करते हैं।") }],
            },
            createTable(
              "table-filmfare-vs-national-awards-hi",
              "अंतर तालिका: राष्ट्रीय फिल्म पुरस्कार बनाम फिल्मफेयर पुरस्कार (National Film Awards vs Filmfare Awards)",
              ["विशेषता (Feature)", "राष्ट्रीय फिल्म पुरस्कार (National Film Awards)", "फिल्मफेयर पुरस्कार (Filmfare Awards)"],
              [
                ["आयोजक निकाय (Organizer)", "भारत सरकार (सूचना एवं प्रसारण मंत्रालय / NFDC)", "द टाइम्स ग्रुप (Times Group - Filmfare)"],
                ["पुरस्कार का स्वरूप (Nature)", "शासकीय एवं आधिकारिक सर्वोच्च राष्ट्रीय सम्मान", "निजी मनोरंजन उद्योग पुरस्कार (Private Industry Award)"],
                ["चयन प्रक्रिया (Selection)", "केंद्र सरकार द्वारा नियुक्त निष्पक्ष विशेषज्ञ जूरी", "जनता की वोटिंग (Popular Vote) + जूरी वोटिंग"],
                ["प्रतियोगी दायरे (Scope)", "भारत की सभी 30+ मान्यता प्राप्त भाषाओं की फिल्में", "मुख्यतः हिंदी (बॉलीवुड) व चुनिंदा दक्षिण फिल्में"],
                ["पुरस्कार प्रतीक (Trophy)", "स्वर्ण कमल (Swarn Kamal) व रजत कमल (Rajat Kamal)", "कांस्य निर्मित 'द ब्लैक लेडी' (The Black Lady)"],
                ["प्रमाण पत्र व नकद राशि", "भारत के राष्ट्रपति द्वारा हस्ताक्षरित प्रमाणपत्र व नकद", "ट्रॉफी (नकद राशि नहीं)"],
                ["स्थापना वर्ष (Inception)", "1954 (प्रथम आयोजन)", "1954 (प्रथम आयोजन)"]
              ]
            )
          ],
          bodyEn: [
            {
              _key: "b3-3",
              _type: "block",
              style: "h3",
              children: [{ _key: "s3-3", _type: "span", text: sanitizeText("National Film Awards vs Filmfare Awards Comparison") }],
            },
            createTable(
              "table-filmfare-vs-national-awards-en",
              "National Film Awards vs Filmfare Awards Difference Table",
              ["Feature", "National Film Awards", "Filmfare Awards"],
              [
                ["Organizer", "Government of India (Ministry of I&B / NFDC)", "Times Group (Filmfare Magazine)"],
                ["Type", "Official State National Honor", "Private Media Industry Award"],
                ["Jury", "Independent Government-Appointed Jury", "Popular Public Vote + Panel Jury"],
                ["Scope", "All 30+ Certified Languages in India", "Primarily Hindi (Bollywood) & Regional Variants"],
                ["Trophy", "Swarn Kamal (Golden Lotus) & Rajat Kamal", "The Black Lady Statuette"]
              ]
            )
          ]
        },

        /* ── 4. History & Organization ────────────────────────────── */
        {
          _key: "sec-history-and-nfdc",
          kind: "background",
          title: sanitizeText("राष्ट्रीय फिल्म पुरस्कार का इतिहास, दादा साहेब फाल्के पुरस्कार एवं नकद सम्मान"),
          titleEn: sanitizeText("History of National Film Awards, Dadasaheb Phalke Award & Cash Prizes"),
          body: [
            {
              _key: "b4-1",
              _type: "block",
              style: "normal",
              children: [{ _key: "s4-1", _type: "span", text: sanitizeText("• **स्थापना वर्ष (1954)**: राष्ट्रीय फिल्म पुरस्कारों की शुरुआत वर्ष **1954** में हुई थी। तब इसे 'राजकीय फिल्म पुरस्कार' (State Awards for Films) के नाम से जाना जाता था।") }],
            },
            {
              _key: "b4-2",
              _type: "block",
              style: "normal",
              children: [{ _key: "s4-2", _type: "span", text: sanitizeText("• **प्रथम सर्वश्रेष्ठ फिल्म (1954)**: मराठी फिल्म **'श्यामची आई' (Shyamchi Aai)** को प्रथम राष्ट्रीय फिल्म पुरस्कार में भारत की पहली सर्वश्रेष्ठ फीचर फिल्म का 'राष्ट्रपति स्वर्ण पदक' प्रदान किया गया था।") }],
            },
            {
              _key: "b4-3",
              _type: "block",
              style: "normal",
              children: [{ _key: "s4-3", _type: "span", text: sanitizeText("• **दादा साहेब फाल्के पुरस्कार (Dadasaheb Phalke Award)**: यह भारतीय सिनेमा का सर्वोच्च जीवनपर्यंत योगदान पुरस्कार (Lifetime Achievement Award) है। इसकी शुरुआत वर्ष **1969** में दादा साहेब फाल्के (भारतीय सिनेमा के पितामह) की जन्मशताब्दी पर हुई थी। प्रथम विजेता देविका रानी थीं। इसमें **स्वर्ण कमल एवं ₹10 लाख** नकद राशि प्रदान की जाती है।") }],
            },
            {
              _key: "b4-4",
              _type: "block",
              style: "normal",
              children: [{ _key: "s4-4", _type: "span", text: sanitizeText("• **स्वर्ण कमल व रजत कमल**: सर्वश्रेष्ठ फिल्म, निर्देशन व दादा साहेब फाल्के वर्ग में **स्वर्ण कमल (Swarn Kamal)** के साथ ₹3 लाख से ₹10 लाख तक नकद राशि दी जाती है, जबकि सर्वश्रेष्ठ अभिनेता, अभिनेत्री व तकनीकी श्रेणियों में **रजत कमल (Rajat Kamal)** प्रदान किया जाता है।") }],
            },
            {
              _key: "b4-5",
              _type: "block",
              style: "normal",
              children: [{ _key: "s4-5", _type: "span", text: sanitizeText("• **आयोजक संस्था (NFDC)**: वर्ष 2022 से राष्ट्रीय फिल्म विकास निगम (**National Film Development Corporation - NFDC**) भारत सरकार के सूचना एवं प्रसारण मंत्रालय के तत्वावधान में इन पुरस्कारों का निष्पादन करता है।") }],
            }
          ],
          bodyEn: [
            {
              _key: "b4-6",
              _type: "block",
              style: "normal",
              children: [{ _key: "s4-6", _type: "span", text: sanitizeText("• **Inception in 1954**: Established in 1954 as 'State Awards for Films'.") }],
            },
            {
              _key: "b4-7",
              _type: "block",
              style: "normal",
              children: [{ _key: "s4-7", _type: "span", text: sanitizeText("• **First Winner**: Marathi movie 'Shyamchi Aai' won the inaugural President's Gold Medal in 1954.") }],
            },
            {
              _key: "b4-8",
              _type: "block",
              style: "normal",
              children: [{ _key: "s4-8", _type: "span", text: sanitizeText("• **Dadasaheb Phalke Award**: India's highest film honor instituted in 1969. First recipient: Devika Rani. Award includes Swarn Kamal and ₹10 Lakh cash prize.") }],
            }
          ]
        },

        /* ── 5. MPPSC & UPSC High-Yield Exam Points ───────────────── */
        {
          _key: "sec-exam-highlights",
          kind: "background",
          title: sanitizeText("MPPSC एवं UPSC परीक्षा हेतु महत्वपूर्ण तथ्य (High-Yield Exam Highlights)"),
          titleEn: sanitizeText("High-Yield Revision Highlights for MPPSC & UPSC"),
          body: [
            {
              _key: "b5-1",
              _type: "block",
              style: "normal",
              children: [{ _key: "s5-1", _type: "span", text: sanitizeText("• **प्रश्न 1**: 72वें राष्ट्रीय फिल्म पुरस्कार में सर्वश्रेष्ठ फीचर फिल्म कौन सी है? — **उत्तर**: 'आर्टिकल 370' (हिंदी)।") }],
            },
            {
              _key: "b5-2",
              _type: "block",
              style: "normal",
              children: [{ _key: "s5-2", _type: "span", text: sanitizeText("• **प्रश्न 2**: 72वें राष्ट्रीय फिल्म पुरस्कार में सर्वश्रेष्ठ अभिनेता का पुरस्कार किन्हें मिला? — **उत्तर**: कार्तिक आर्यन ('चंदू चैंपियन') एवं मम्मुटी ('ब्रह्मयुगम') को संयुक्त रूप से।") }],
            },
            {
              _key: "b5-3",
              _type: "block",
              style: "normal",
              children: [{ _key: "s5-3", _type: "span", text: sanitizeText("• **प्रश्न 3**: सर्वश्रेष्ठ अभिनेत्री का पुरस्कार किसे मिला? — **उत्तर**: यामी गौतम ('आर्टिकल 370')।") }],
            },
            {
              _key: "b5-4",
              _type: "block",
              style: "normal",
              children: [{ _key: "s5-4", _type: "span", text: sanitizeText("• **प्रश्न 4**: राष्ट्रीय फिल्म पुरस्कार किस मंत्रालय द्वारा प्रदान किए जाते हैं? — **उत्तर**: सूचना एवं प्रसारण मंत्रालय, भारत सरकार (NFDC द्वारा प्रबंधित)।") }],
            },
            {
              _key: "b5-5",
              _type: "block",
              style: "normal",
              children: [{ _key: "s5-5", _type: "span", text: sanitizeText("• **प्रश्न 5**: प्रथम राष्ट्रीय फिल्म पुरस्कार (1954) में राष्ट्रपति स्वर्ण पदक किस फिल्म को मिला था? — **उत्तर**: मराठी फिल्म 'श्यामची आई'।") }],
            },
            {
              _key: "b5-6",
              _type: "block",
              style: "normal",
              children: [{ _key: "s5-6", _type: "span", text: sanitizeText("• **प्रश्न 6**: दादा साहेब फाल्के पुरस्कार की प्रथम विजेता कौन थीं? — **उत्तर**: देविका रानी (1969)।") }],
            }
          ],
          bodyEn: [
            {
              _key: "b5-7",
              _type: "block",
              style: "normal",
              children: [{ _key: "s5-7", _type: "span", text: sanitizeText("• **Best Feature Film 72nd NFA**: 'Article 370'.") }],
            },
            {
              _key: "b5-8",
              _type: "block",
              style: "normal",
              children: [{ _key: "s5-8", _type: "span", text: sanitizeText("• **Best Actor Joint**: Kartik Aaryan & Mammootty.") }],
            },
            {
              _key: "b5-9",
              _type: "block",
              style: "normal",
              children: [{ _key: "s5-9", _type: "span", text: sanitizeText("• **Best Actress**: Yami Gautam.") }],
            }
          ]
        }
      ],

      /* ── 8 Practice MCQs ────────────────────────────────────────── */
      mcqs: [
        {
          question: "72वें राष्ट्रीय फिल्म पुरस्कार 2026 में सर्वश्रेष्ठ फीचर फिल्म (Best Feature Film) का पुरस्कार किस फिल्म ने जीता?",
          questionEn: "Which film won the Best Feature Film award at the 72nd National Film Awards 2026?",
          options: ["आर्टिकल 370", "अमरन", "कल्कि 2898 एडी", "श्रीकांत"],
          optionsEn: ["Article 370", "Amaran", "Kalki 2898 AD", "Srikanth"],
          correctIndex: 0,
          explanation: "आदित्य सुहास जांभले द्वारा निर्देशित हिंदी फिल्म 'आर्टिकल 370' ने 72वें राष्ट्रीय फिल्म पुरस्कार में सर्वश्रेष्ठ फीचर फिल्म का राष्ट्रीय सम्मान जीता।",
          explanationEn: "Hindi film 'Article 370' directed by Aditya Suhas Jambhale bagged the Best Feature Film award."
        },
        {
          question: "72वें राष्ट्रीय फिल्म पुरस्कार में किस अभिनेता को 'चंदू चैंपियन' फिल्म में उत्कृष्ट अभिनय हेतु सर्वश्रेष्ठ अभिनेता (Best Actor) चुना गया?",
          questionEn: "Which actor won the Best Actor award at the 72nd National Film Awards for 'Chandu Champion'?",
          options: ["कार्तिक आर्यन (मम्मुटी के साथ संयुक्त)", "रणबीर कपूर", "विक्की कौशल", "अमिताभ बच्चन"],
          optionsEn: ["Kartik Aaryan (Jointly with Mammootty)", "Ranbir Kapoor", "Vicky Kaushal", "Amitabh Bachchan"],
          correctIndex: 0,
          explanation: "कार्तिक आर्यन ('चंदू चैंपियन' - हिंदी) और मम्मुटी ('ब्रह्मयुगम' - मलयालम) को संयुक्त रूप से सर्वश्रेष्ठ अभिनेता का पुरस्कार दिया गया।",
          explanationEn: "Kartik Aaryan and Mammootty were jointly awarded the Best Actor title."
        },
        {
          question: "फिल्म 'आर्टिकल 370' के लिए 72वें राष्ट्रीय फिल्म पुरस्कार में सर्वश्रेष्ठ अभिनेत्री (Best Actress) का पुरस्कार किसे मिला?",
          questionEn: "Who won the Best Actress award at the 72nd National Film Awards for 'Article 370'?",
          options: ["यामी गौतम", "आलिया भट्ट", "कृति सेनन", "दीपिका पादुकोण"],
          optionsEn: ["Yami Gautam", "Alia Bhatt", "Kriti Sanon", "Deepika Padukone"],
          correctIndex: 0,
          explanation: "यामी गौतम को 'आर्टिकल 370' में उनके प्रभावी अभिनय हेतु सर्वश्रेष्ठ अभिनेत्री का राष्ट्रीय पुरस्कार प्रदान किया गया।",
          explanationEn: "Yami Gautam was conferred the Best Actress award for 'Article 370'."
        },
        {
          question: "राष्ट्रीय फिल्म पुरस्कार किस सरकारी मंत्रालय के नियंत्रण एवं प्रबंधन में आयोजित किए जाते हैं?",
          questionEn: "Under which Union Ministry are the National Film Awards organized?",
          options: ["सूचना एवं प्रसारण मंत्रालय", "संस्कृति मंत्रालय", "गृह मंत्रालय", "शिक्षा मंत्रालय"],
          optionsEn: ["Ministry of Information & Broadcasting", "Ministry of Culture", "Ministry of Home Affairs", "Ministry of Education"],
          correctIndex: 0,
          explanation: "राष्ट्रीय फिल्म पुरस्कार भारत सरकार के सूचना एवं प्रसारण मंत्रालय (Ministry of Information and Broadcasting) तथा NFDC द्वारा आयोजित किए जाते हैं।",
          explanationEn: "Organized under the aegis of the Ministry of Information and Broadcasting (managed by NFDC)."
        },
        {
          question: "प्रथम राष्ट्रीय फिल्म पुरस्कार (1954) में राष्ट्रपति का स्वर्ण पदक जीतने वाली पहली फिल्म कौन सी थी?",
          questionEn: "Which was the first film to win the President's Gold Medal at the 1st National Film Awards in 1954?",
          options: ["श्यामची आई (मराठी)", "दो बीघा ज़मीन (हिंदी)", "पथेर पांचाली (बंगाली)", "मदर इंडिया (हिंदी)"],
          optionsEn: ["Shyamchi Aai (Marathi)", "Do Bigha Zamin (Hindi)", "Pather Panchali (Bengali)", "Mother India (Hindi)"],
          correctIndex: 0,
          explanation: "वर्ष 1954 के प्रथम राष्ट्रीय फिल्म पुरस्कारों में मराठी फिल्म 'श्यामची आई' (Shyamchi Aai) को पहली सर्वश्रेष्ठ फीचर फिल्म घोषित किया गया था।",
          explanationEn: "Marathi film 'Shyamchi Aai' won the inaugural President's Gold Medal in 1954."
        },
        {
          question: "भारतीय सिनेमा का सर्वोच्च जीवनपर्यंत सम्मान 'दादा साहेब फाल्के पुरस्कार' किस वर्ष शुरू किया गया था?",
          questionEn: "In which year was India's highest cinema honor 'Dadasaheb Phalke Award' instituted?",
          options: ["1969", "1954", "1972", "1980"],
          optionsEn: ["1969", "1954", "1972", "1980"],
          correctIndex: 0,
          explanation: "दादा साहेब फाल्के पुरस्कार 1969 में शुरू किया गया था, और इसकी प्रथम प्राप्तकर्ता अभिनेत्री देविका रानी थीं।",
          explanationEn: "Dadasaheb Phalke Award was instituted in 1969. The first recipient was Devika Rani."
        },
        {
          question: "राष्ट्रीय फिल्म पुरस्कार तथा फिल्मफेयर पुरस्कार में मुख्य अंतर क्या है?",
          questionEn: "What is the primary difference between National Film Awards and Filmfare Awards?",
          options: ["राष्ट्रीय पुरस्कार भारत सरकार का आधिकारिक सम्मान है, जबकि फिल्मफेयर निजी मीडिया समूह का पुरस्कार है", "दोनों में कोई अंतर नहीं है", "फिल्मफेयर पुरस्कार राष्ट्रपति देते हैं", "राष्ट्रीय पुरस्कार केवल बॉलीवुड फिल्मों को मिलता है"],
          optionsEn: ["National Awards are official state honors by the Govt of India, while Filmfare is a private media group award", "No difference", "Filmfare is awarded by President", "National Awards are only for Bollywood"],
          correctIndex: 0,
          explanation: "राष्ट्रीय फिल्म पुरस्कार भारत सरकार द्वारा देश की सभी 30+ क्षेत्रीय भाषाओं की उत्कृष्ट फिल्मों हेतु दिया जाने वाला आधिकारिक सर्वोच्च सम्मान है।",
          explanationEn: "National Film Awards are official state honors presented by the President of India across all Indian certified languages."
        },
        {
          question: "72वें राष्ट्रीय फिल्म पुरस्कार में सर्वश्रेष्ठ लोकप्रिय फिल्म (Best Popular Film) का पुरस्कार किस फिल्म को मिला?",
          questionEn: "Which movie won Best Popular Film Providing Wholesome Entertainment at the 72nd National Film Awards?",
          options: ["कल्कि 2898 एडी (Kalki 2898 AD)", "आर्टिकल 370", "अमरन", "श्रीकांत"],
          optionsEn: ["Kalki 2898 AD", "Article 370", "Amaran", "Srikanth"],
          correctIndex: 0,
          explanation: "नाग अश्विन द्वारा निर्देशित तेलुगु फिल्म 'कल्कि 2898 एडी' को सर्वश्रेष्ठ लोकप्रिय फिल्म का पुरस्कार मिला।",
          explanationEn: "Telugu film 'Kalki 2898 AD' directed by Nag Ashwin won Best Popular Film."
        }
      ],

      /* ── 10 Collapsible FAQs ────────────────────────────────────── */
      faqs: [
        {
          question: "72वें राष्ट्रीय फिल्म पुरस्कार 2026 में सर्वश्रेष्ठ फिल्म (Best Feature Film) का पुरस्कार किसे मिला?",
          questionEn: "Which film won Best Feature Film at the 72nd National Film Awards 2026?",
          answer: "आदित्य सुहास जांभले द्वारा निर्देशित हिंदी फिल्म 'आर्टिकल 370' (Article 370) को सर्वश्रेष्ठ फीचर फिल्म का राष्ट्रीय पुरस्कार मिला।",
          answerEn: "Hindi film 'Article 370' directed by Aditya Suhas Jambhale won Best Feature Film."
        },
        {
          question: "72nd National Film Awards 2026 में सर्वश्रेष्ठ अभिनेता (Best Actor) कौन बने?",
          questionEn: "Who won the Best Actor title at 72nd National Film Awards 2026?",
          answer: "कार्तिक आर्यन ('चंदू चैंपियन' - हिंदी) और मम्मुटी ('ब्रह्मयुगम' - मलयालम) को संयुक्त रूप से सर्वश्रेष्ठ अभिनेता चुना गया।",
          answerEn: "Kartik Aaryan ('Chandu Champion') and Mammootty ('Bramayugam') were jointly awarded Best Actor."
        },
        {
          question: "सर्वश्रेष्ठ अभिनेत्री (Best Actress) का राष्ट्रीय पुरस्कार किसे मिला?",
          questionEn: "Who won the Best Actress award at the 72nd National Film Awards?",
          answer: "यामी गौतम (Yami Gautam) को फिल्म 'आर्टिकल 370' में उनके दमदार अभिनय के लिए सर्वश्रेष्ठ अभिनेत्री का पुरस्कार मिला।",
          answerEn: "Yami Gautam won Best Actress for her performance in 'Article 370'."
        },
        {
          question: "फिल्मफेयर पुरस्कार और राष्ट्रीय फिल्म पुरस्कार में क्या मुख्य अंतर है? (Filmfare vs National Film Awards)",
          questionEn: "What is the difference between Filmfare Awards and National Film Awards?",
          answer: "राष्ट्रीय फिल्म पुरस्कार भारत सरकार (सूचना एवं प्रसारण मंत्रालय/NFDC) द्वारा देश की सभी भाषाओं की फिल्मों को दिया जाने वाला आधिकारिक सर्वोच्च राष्ट्रीय सम्मान है, जबकि फिल्मफेयर पुरस्कार एक निजी मीडिया समूह (टाइम्स ग्रुप) द्वारा आयोजित मनोरंजन उद्योग पुरस्कार है।",
          answerEn: "National Film Awards are official state honors by the Government of India for all Indian languages, whereas Filmfare Awards are private media industry awards by Times Group."
        },
        {
          question: "राष्ट्रीय फिल्म पुरस्कारों का आयोजन किस मंत्रालय व संस्था द्वारा किया जाता है?",
          questionEn: "Which ministry and organization conduct the National Film Awards?",
          answer: "राष्ट्रीय फिल्म पुरस्कारों का आयोजन भारत सरकार के सूचना एवं प्रसारण मंत्रालय (Ministry of I&B) के तहत National Film Development Corporation (NFDC) द्वारा किया जाता है।",
          answerEn: "Conducted by NFDC under the Ministry of Information and Broadcasting, Government of India."
        },
        {
          question: "दादा साहेब फाल्के पुरस्कार की शुरुआत कब हुई थी तथा इसमें क्या पुरस्कार दिया जाता है?",
          questionEn: "When was Dadasaheb Phalke Award introduced and what does it include?",
          answer: "दादा साहेब फाल्के पुरस्कार 1969 में शुरू हुआ था। इसमें विजेता को 'स्वर्ण कमल' (Swarn Kamal), ₹10 लाख नकद राशि एवं शॉल प्रदान की जाती है।",
          answerEn: "Instituted in 1969, it carries a Swarn Kamal (Golden Lotus), ₹10 Lakh cash prize, and a shawl."
        },
        {
          question: "72वें राष्ट्रीय फिल्म पुरस्कार में सर्वश्रेष्ठ हिंदी फिल्म (Best Hindi Film) कौन सी है?",
          questionEn: "Which movie won Best Hindi Film at the 72nd National Film Awards?",
          answer: "तुषार हीरानंदानी द्वारा निर्देशित फिल्म 'श्रीकांत' (Srikanth) को सर्वश्रेष्ठ हिंदी फिल्म का पुरस्कार मिला।",
          answerEn: "The movie 'Srikanth' directed by Tushar Hiranandani won Best Hindi Film."
        },
        {
          question: "प्रथम राष्ट्रीय फिल्म पुरस्कार कब आयोजित हुए थे और पहली सर्वश्रेष्ठ फिल्म कौन सी थी?",
          questionEn: "When were the first National Film Awards held and which was the first Best Film?",
          answer: "प्रथम राष्ट्रीय फिल्म पुरस्कार 1954 में आयोजित हुए थे तथा मराठी फिल्म 'श्यामची आई' भारत की पहली सर्वश्रेष्ठ फीचर फिल्म बनी थी।",
          answerEn: "Held in 1954, Marathi movie 'Shyamchi Aai' won the inaugural Best Feature Film award."
        },
        {
          question: "72वें राष्ट्रीय फिल्म पुरस्कारों में सर्वश्रेष्ठ लोकप्रिय फिल्म किसे चुना गया?",
          questionEn: "Which movie won Best Popular Film at the 72nd National Film Awards?",
          answer: "नाग अश्विन द्वारा निर्देशित तेलुगु फिल्म 'कल्कि 2898 एडी' (Kalki 2898 AD) को सर्वश्रेष्ठ लोकप्रिय फिल्म घोषित किया गया।",
          answerEn: "Telugu movie 'Kalki 2898 AD' directed by Nag Ashwin won Best Popular Film."
        },
        {
          question: "MPPSC एवं UPSC परीक्षा के लिए राष्ट्रीय फिल्म पुरस्कार क्यों महत्वपूर्ण हैं?",
          questionEn: "Why are National Film Awards crucial for MPPSC & UPSC exams?",
          answer: "MPPSC Prelims (Unit 8: राष्ट्रीय समसामयिकी व पुरस्कार) तथा UPSC Prelims आर्ट एंड कल्चर एवं पुरस्कार खंड में विजेताओं, मंत्रालय, दादा साहेब फाल्के पुरस्कार तथा ऐतिहासिक तथ्यों पर सीधे वस्तुनिष्ठ प्रश्न पूछे जाते हैं।",
          answerEn: "Direct questions on winners, history, Dadasaheb Phalke Award, and organizing ministries are asked in MPPSC Prelims Unit 8 and UPSC General Awareness."
        }
      ]
    };

    await client.createOrReplace({
      _id: docId,
      ...articlePayload,
    });

    console.log(`✅ Document ${docId} successfully updated with complete 72nd National Film Awards & Filmfare comparison!`);
  }

  console.log("🎉 ALL 72ND NATIONAL FILM AWARDS ARTICLES SUCCESSFULLY PUBLISHED TO SANITY CMS!");
}

main().catch((err) => {
  console.error("❌ Failed to upload 72nd National Film Awards article:", err);
  process.exit(1);
});
