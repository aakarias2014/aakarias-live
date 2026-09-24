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
  return str.replace(/[\u200B-\u200D\u200E\u200F\u202A-\u202E\u2060-\u206F\uFEFF\u00AD]/g, "");
}

async function main() {
  console.log("🚀 Starting upload process for 72nd National Film Awards Article...");

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

  // 4. Construct the Article document adhering to MPPSC Priority, Bilingual, and formatting rules
  const article = {
    _id: "ca-72nd-national-film-awards-2024",
    _type: "currentAffairs",
    slug: { _type: "slug", current: "72nd-national-film-awards-2024-winners-list-mppsc-upsc" },
    title: sanitizeText("72वें राष्ट्रीय फिल्म पुरस्कार: वर्ष 2024 की फिल्मों को मिला राष्ट्रीय सम्मान, विजेताओं की पूरी सूची एवं महत्वपूर्ण तथ्य | MPPSC & UPSC Notes"),
    titleEn: sanitizeText("72nd National Film Awards: 2024 Winners List, Swarn Kamal, Key Highlights & Exam Facts | MPPSC & UPSC Notes"),
    excerpt: sanitizeText("भारतीय सिनेमा के सर्वोच्च सम्मान 72वें राष्ट्रीय फिल्म पुरस्कार में वर्ष 2024 की फिल्मों को सम्मानित किया गया। 'आर्टिकल 370' को सर्वश्रेष्ठ फीचर फिल्म, कार्तिक आर्यन को सर्वश्रेष्ठ अभिनेता तथा यामी गौतम को सर्वश्रेष्ठ अभिनेत्री का पुरस्कार मिला। MPPSC व UPSC परीक्षा हेतु संपूर्ण सूची व 8 MCQs।"),
    excerptEn: sanitizeText("The 72nd National Film Awards honored top Indian films certified in 2024. 'Article 370' won Best Feature Film, Kartik Aaryan won Best Actor, and Yami Gautam won Best Actress. Complete winners list, facts, and 8 practice MCQs for MPPSC & UPSC."),
    ca_date: "2026-09-24",
    publishedAt: new Date().toISOString(),
    featured: true,
    readingTime: 7,
    keywords: [
      "72nd National Film Awards Winners List",
      "72va National Film Awards 2024",
      "National Film Awards Best Actor Kartik Aaryan",
      "Article 370 Best Feature Film",
      "Yami Gautam Best Actress Article 370",
      "Kalki 2898 AD Best Popular Film",
      "National Film Development Corporation NFDC",
      "Swarn Kamal Rajat Kamal National Film Awards",
      "Dadasaheb Phalke Award History",
      "72वें राष्ट्रीय फिल्म पुरस्कार विजेताओं की सूची",
      "MPPSC Current Affairs Awards Notes",
      "UPSC Current Affairs Film Awards"
    ],
    category: { _type: "reference", _ref: "cat-polity" }, // Polity / Culture / Governance
    author: { _type: "reference", _ref: "author-aakar" }, // Mandatory Aakar IAS Team
    tags: [
      { _type: "reference", _ref: "tag-mppsc" }, // Mandatory MPPSC Priority FIRST
      { _type: "reference", _ref: "tag-upsc" },
      { _type: "reference", _ref: "tag-prelims" },
      { _type: "reference", _ref: "tag-mains" },
    ],
    syllabus: ["GS-1 (Culture)", "Prelims-GS"],
    featuredImage: {
      _type: "image",
      asset: { _type: "reference", _ref: assetCover._id },
      alt: "72nd National Film Awards Banner with Swarn Kamal Golden Lotus Trophy and Cinematic Reels",
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
        title: sanitizeText("चर्चा में क्यों? (72वां राष्ट्रीय फिल्म पुरस्कार)"),
        titleEn: sanitizeText("Why in News? (72nd National Film Awards)"),
        body: [
          {
            _key: "b1-1",
            _type: "block",
            style: "normal",
            children: [{ _key: "s1-1", _type: "span", text: sanitizeText("भारतीय सिनेमा के सबसे प्रतिष्ठित एवं सर्वोच्च सम्मानों में शामिल **राष्ट्रीय फिल्म पुरस्कार के 72वें संस्करण (72nd National Film Awards)** में वर्ष 2024 के दौरान केंद्रीय फिल्म प्रमाणन बोर्ड (CBFC - सेंसर बोर्ड) द्वारा प्रमाणित फिल्मों को सम्मानित किया गया। इस समारोह में भारतीय सिनेमा की कलात्मक, तकनीकी और सामाजिक उत्कृष्टता को प्रदर्शित करने वाली सर्वश्रेष्ठ फिल्मों और कलाकारों को पुरस्कार प्रदान किए गए।") }],
          },
          {
            _key: "b1-2",
            _type: "block",
            style: "normal",
            children: [{ _key: "s1-2", _type: "span", text: sanitizeText("72वें संस्करण में आदित्य सुहास जांभले द्वारा निर्देशित हिंदी फिल्म **'आर्टिकल 370'** को सर्वश्रेष्ठ फीचर फिल्म घोषित किया गया। इसके अतिरिक्त 'चंदू चैंपियन' के लिए कार्तिक आर्यन तथा 'ब्रह्मयुगम' के लिए मम्मुटी को संयुक्त रूप से सर्वश्रेष्ठ अभिनेता तथा यामी गौतम को सर्वश्रेष्ठ अभिनेत्री चुना गया। अन्य प्रमुख राष्ट्रीय व अंतरराष्ट्रीय पुरस्कारों हेतु हमारे [पुरस्कार एवं सम्मान पोर्टल](/awards-and-honors) तथा [भारत के 5 सर्वोच्च नागरिक पुरस्कार नोट्स](/general-awareness/highest-civilian-awards-padma-awards-mppsc-upsc-notes) का अध्ययन करें।") }],
          },
        ],
        bodyEn: [
          {
            _key: "b1-3",
            _type: "block",
            style: "normal",
            children: [{ _key: "s1-3", _type: "span", text: sanitizeText("The 72nd edition of the prestigious **National Film Awards** honored cinematic excellence for feature and non-feature films certified by the Central Board of Film Certification (CBFC) during the calendar year 2024. As India's premier film awards, this edition celebrated artistic, technical, and social brilliance across regional and national languages.") }],
          },
          {
            _key: "b1-4",
            _type: "block",
            style: "normal",
            children: [{ _key: "s1-4", _type: "span", text: sanitizeText("In the 72nd edition, the Hindi film **'Article 370'**, directed by Aditya Suhas Jambhale, bagged the Best Feature Film award. Kartik Aaryan ('Chandu Champion') and Mammootty ('Bramayugam') were jointly awarded Best Actor, while Yami Gautam won Best Actress for 'Article 370'. For other honors, explore our [Awards & Honors Hub](/en/awards-and-honors) and [India's 5 Highest Civilian Awards Notes](/en/general-awareness/highest-civilian-awards-padma-awards-mppsc-upsc-notes).") }],
          },
        ],
      },

      /* ── 2. Significance & Organization ───────────────────────── */
      {
        _key: "sec-significance",
        kind: "background",
        title: sanitizeText("राष्ट्रीय फिल्म पुरस्कार का महत्व एवं आयोजन व्यवस्था"),
        titleEn: sanitizeText("Significance & Organizational Framework"),
        body: [
          {
            _key: "b2-1",
            _type: "block",
            style: "normal",
            children: [{ _key: "s2-1", _type: "span", text: sanitizeText("• **सर्वोच्च राष्ट्रीय सम्मान**: यह भारत के सबसे प्रमुख एवं आधिकारिक राष्ट्रीय फिल्म पुरस्कारों में से एक है, जो भारतीय सिनेमा की विविधता और बहुभाषी समृद्धि को रेखांकित करता है।") }],
          },
          {
            _key: "b2-2",
            _type: "block",
            style: "normal",
            children: [{ _key: "s2-2", _type: "span", text: sanitizeText("• **मूल उद्देश्य**: इसका प्राथमिक उद्देश्य भारतीय सिनेमा की कलात्मक, तकनीकी, सांस्कृतिक और सामाजिक उत्कृष्टता को प्रोत्साहित एवं सम्मानित करना है।") }],
          },
          {
            _key: "b2-3",
            _type: "block",
            style: "normal",
            children: [{ _key: "s2-3", _type: "span", text: sanitizeText("• **मंत्रालय का नियंत्रण**: राष्ट्रीय फिल्म पुरस्कारों का आयोजन भारत सरकार के **सूचना एवं प्रसारण मंत्रालय (Ministry of Information and Broadcasting)** के अंतर्गत किया जाता है।") }],
          },
          {
            _key: "b2-4",
            _type: "block",
            style: "normal",
            children: [{ _key: "s2-4", _type: "span", text: sanitizeText("• **NFDC द्वारा आयोजन (2022 से)**: वर्ष 2022 से इस पुरस्कार समारोह का निष्पादन और प्रबंधन **National Film Development Corporation (NFDC)** द्वारा किया जा रहा है।") }],
          },
          {
            _key: "b2-5",
            _type: "block",
            style: "normal",
            children: [{ _key: "s2-5", _type: "span", text: sanitizeText("• **स्वतंत्र जूरी चयन**: विजेताओं का निष्पक्ष चयन भारत सरकार द्वारा गठित स्वतंत्र एवं प्रतिष्ठित विशेषज्ञों की जूरी करती है।") }],
          },
          {
            _key: "b2-6",
            _type: "block",
            style: "normal",
            children: [{ _key: "s2-6", _type: "span", text: sanitizeText("• **पुरस्कार वितरण स्थल**: सभी विजेताओं को नई दिल्ली स्थित विज्ञान भवन में भारत के राष्ट्रपति द्वारा पुरस्कार एवं नकद सम्मान प्रदान किए जाते हैं।") }],
          },
        ],
        bodyEn: [
          {
            _key: "b2-7",
            _type: "block",
            style: "normal",
            children: [{ _key: "s2-7", _type: "span", text: sanitizeText("• **Premier National Honor**: The National Film Awards constitute India's most prestigious and official film recognition system, highlighting multilingual diversity across Indian cinema.") }],
          },
          {
            _key: "b2-8",
            _type: "block",
            style: "normal",
            children: [{ _key: "s2-8", _type: "span", text: sanitizeText("• **Core Objective**: To promote, encourage, and honor artistic, technical, cultural, and social merit in Indian filmmaking.") }],
          },
          {
            _key: "b2-9",
            _type: "block",
            style: "normal",
            children: [{ _key: "s2-9", _type: "span", text: sanitizeText("• **Parent Ministry**: Organized under the aegis of the **Ministry of Information and Broadcasting**, Government of India.") }],
          },
          {
            _key: "b2-10",
            _type: "block",
            style: "normal",
            children: [{ _key: "s2-10", _type: "span", text: sanitizeText("• **Organized by NFDC (Since 2022)**: Since 2022, the National Film Development Corporation (NFDC) manages and executes the awards event.") }],
          },
          {
            _key: "b2-11",
            _type: "block",
            style: "normal",
            children: [{ _key: "s2-11", _type: "span", text: sanitizeText("• **Independent Jury**: Winners are evaluated and selected by an independent jury of distinguished filmmakers, critics, and industry stalwarts appointed by the Union Government.") }],
          },
          {
            _key: "b2-12",
            _type: "block",
            style: "normal",
            children: [{ _key: "s2-12", _type: "span", text: sanitizeText("• **Presentation Ceremony**: Conferred by the President of India during a solemn national ceremony held at Vigyan Bhawan, New Delhi.") }],
          },
        ],
      },

      /* ── 3. Major Winners List ────────────────────────────────── */
      {
        _key: "sec-winners-list",
        kind: "keyHighlights",
        title: sanitizeText("72वें राष्ट्रीय फिल्म पुरस्कार के प्रमुख विजेता (Full Winners List)"),
        titleEn: sanitizeText("Key Winners of the 72nd National Film Awards"),
        body: [
          {
            _key: "b3-1",
            _type: "block",
            style: "normal",
            children: [{ _key: "s3-1", _type: "span", text: sanitizeText("72वें राष्ट्रीय फिल्म पुरस्कार के अंतर्गत विभिन्न वर्गों में घोषित प्रमुख पुरस्कार विजेताओं की सूची निम्नवत है:") }],
          },
          {
            _key: "b3-2",
            _type: "block",
            style: "normal",
            children: [{ _key: "s3-2", _type: "span", text: sanitizeText("• **सर्वश्रेष्ठ फीचर फिल्म (Best Feature Film)**: आर्टिकल 370 (हिंदी) — निर्देशक: आदित्य सुहास जांभले") }],
          },
          {
            _key: "b3-3",
            _type: "block",
            style: "normal",
            children: [{ _key: "s3-3", _type: "span", text: sanitizeText("• **सर्वश्रेष्ठ अभिनेता (Best Actor - Jointly)**: कार्तिक आर्यन ('चंदू चैंपियन' - हिंदी) और मम्मुटी ('ब्रह्मयुगम' - मलयालम) के लिए संयुक्त रूप से") }],
          },
          {
            _key: "b3-4",
            _type: "block",
            style: "normal",
            children: [{ _key: "s3-4", _type: "span", text: sanitizeText("• **सर्वश्रेष्ठ अभिनेत्री (Best Actress)**: यामी गौतम — 'आर्टिकल 370' (हिंदी)") }],
          },
          {
            _key: "b3-img-1",
            _type: "image",
            asset: { _type: "reference", _ref: assetTrophies._id },
            alt: "Swarn Kamal Golden Lotus and Rajat Kamal Silver Lotus Trophies of National Film Awards India",
          },
          {
            _key: "b3-5",
            _type: "block",
            style: "normal",
            children: [{ _key: "s3-5", _type: "span", text: sanitizeText("• **सर्वश्रेष्ठ निर्देशन (Best Direction)**: राजकुमार पेरियासामी — 'अमरन' (तमिल)") }],
          },
          {
            _key: "b3-6",
            _type: "block",
            style: "normal",
            children: [{ _key: "s3-6", _type: "span", text: sanitizeText("• **सर्वश्रेष्ठ लोकप्रिय फिल्म (Best Popular Film Providing Wholesome Entertainment)**: कल्कि 2898 एडी (तेलुगु) — निर्देशक: नाग अश्विन") }],
          },
          {
            _key: "b3-7",
            _type: "block",
            style: "normal",
            children: [{ _key: "s3-7", _type: "span", text: sanitizeText("• **सर्वश्रेष्ठ हिंदी फिल्म (Best Hindi Film)**: श्रीकांत — निर्देशक: तुषार हीरानंदानी") }],
          },
          {
            _key: "b3-8",
            _type: "block",
            style: "normal",
            children: [{ _key: "s3-8", _type: "span", text: sanitizeText("• **सर्वश्रेष्ठ नवोदित निर्देशक (Best Debut Film of a Director)**: रणदीप हुड्डा — 'स्वातंत्र्य वीर सावरकर'") }],
          },
          {
            _key: "b3-9",
            _type: "block",
            style: "normal",
            children: [{ _key: "s3-9", _type: "span", text: sanitizeText("• **सर्वश्रेष्ठ सहायक अभिनेता (Best Supporting Actor)**: संजय मिश्रा — 'भक्षक'") }],
          },
          {
            _key: "b3-10",
            _type: "block",
            style: "normal",
            children: [{ _key: "s3-10", _type: "span", text: sanitizeText("• **सर्वश्रेष्ठ नॉन-फीचर फिल्म (Best Non-Feature Film)**: भांगड़ — निर्देशक: सुमीर टांग") }],
          },
          {
            _key: "b3-11",
            _type: "block",
            style: "normal",
            children: [{ _key: "s3-11", _type: "span", text: sanitizeText("• **सर्वश्रेष्ठ वृत्तचित्र (Best Documentary Film)**: राम-नामी — निर्देशक: भट्टवाला गणपति") }],
          },
        ],
        bodyEn: [
          {
            _key: "b3-12",
            _type: "block",
            style: "normal",
            children: [{ _key: "s3-12", _type: "span", text: sanitizeText("The complete list of key category winners at the 72nd National Film Awards is detailed below:") }],
          },
          {
            _key: "b3-13",
            _type: "block",
            style: "normal",
            children: [{ _key: "s3-13", _type: "span", text: sanitizeText("• **Best Feature Film**: Article 370 (Hindi) — Director: Aditya Suhas Jambhale") }],
          },
          {
            _key: "b3-14",
            _type: "block",
            style: "normal",
            children: [{ _key: "s3-14", _type: "span", text: sanitizeText("• **Best Actor (Jointly)**: Kartik Aaryan ('Chandu Champion' - Hindi) & Mammootty ('Bramayugam' - Malayalam)") }],
          },
          {
            _key: "b3-15",
            _type: "block",
            style: "normal",
            children: [{ _key: "s3-15", _type: "span", text: sanitizeText("• **Best Actress**: Yami Gautam — 'Article 370' (Hindi)") }],
          },
          {
            _key: "b3-img-1-en",
            _type: "image",
            asset: { _type: "reference", _ref: assetTrophies._id },
            alt: "Swarn Kamal Golden Lotus and Rajat Kamal Silver Lotus Trophies of National Film Awards India",
          },
          {
            _key: "b3-16",
            _type: "block",
            style: "normal",
            children: [{ _key: "s3-16", _type: "span", text: sanitizeText("• **Best Direction**: Rajkumar Periasamy — 'Amaran' (Tamil)") }],
          },
          {
            _key: "b3-17",
            _type: "block",
            style: "normal",
            children: [{ _key: "s3-17", _type: "span", text: sanitizeText("• **Best Popular Film Providing Wholesome Entertainment**: Kalki 2898 AD (Telugu) — Director: Nag Ashwin") }],
          },
          {
            _key: "b3-18",
            _type: "block",
            style: "normal",
            children: [{ _key: "s3-18", _type: "span", text: sanitizeText("• **Best Hindi Film**: Srikanth — Director: Tushar Hiranandani") }],
          },
          {
            _key: "b3-19",
            _type: "block",
            style: "normal",
            children: [{ _key: "s3-19", _type: "span", text: sanitizeText("• **Best Debut Director**: Randeep Hooda — 'Swatantrya Veer Savarkar'") }],
          },
          {
            _key: "b3-20",
            _type: "block",
            style: "normal",
            children: [{ _key: "s3-20", _type: "span", text: sanitizeText("• **Best Supporting Actor**: Sanjay Mishra — 'Bhakshak'") }],
          },
          {
            _key: "b3-21",
            _type: "block",
            style: "normal",
            children: [{ _key: "s3-21", _type: "span", text: sanitizeText("• **Best Non-Feature Film**: Bhangad — Director: Sumeer Tang") }],
          },
          {
            _key: "b3-22",
            _type: "block",
            style: "normal",
            children: [{ _key: "s3-22", _type: "span", text: sanitizeText("• **Best Documentary Film**: Ram-Nami — Director: Bhattwala Ganapati") }],
          },
        ],
      },

      /* ── 4. History & Inception ───────────────────────────────── */
      {
        _key: "sec-history",
        kind: "importance",
        title: sanitizeText("राष्ट्रीय फिल्म पुरस्कार की शुरुआत एवं ऐतिहासिक पृष्ठभूमि"),
        titleEn: sanitizeText("Inception & Historical Evolution of National Film Awards"),
        body: [
          {
            _key: "b4-1",
            _type: "block",
            style: "normal",
            children: [{ _key: "s4-1", _type: "span", text: sanitizeText("• **स्थापना वर्ष (1954)**: राष्ट्रीय फिल्म पुरस्कारों की शुरुआत वर्ष **1954** में की गई थी।") }],
          },
          {
            _key: "b4-2",
            _type: "block",
            style: "normal",
            children: [{ _key: "s4-2", _type: "span", text: sanitizeText("• **मूल नाम (State Awards for Films)**: शुरुआत में इन पुरस्कारों को **'स्टेट अवॉर्ड्स फॉर फिल्म्स' (State Awards for Films)** के रूप में जाना जाता था।") }],
          },
          {
            _key: "b4-3",
            _type: "block",
            style: "normal",
            children: [{ _key: "s4-3", _type: "span", text: sanitizeText("• **नाम परिवर्तन (1973)**: वर्ष **1973** से इन पुरस्कारों का नाम आधिकारिक तौर पर **'नेशनल फिल्म अवॉर्ड्स' (National Film Awards)** कर दिया गया।") }],
          },
          {
            _key: "b4-img-2",
            _type: "image",
            asset: { _type: "reference", _ref: assetCeremony._id },
            alt: "Hon'ble President of India Smt. Droupadi Murmu presenting National Film Award to Yami Gautam",
          },
          {
            _key: "b4-4",
            _type: "block",
            style: "normal",
            children: [{ _key: "s4-4", _type: "span", text: sanitizeText("• **तीन प्रमुख वर्ग (Three Main Categories)**: ये पुरस्कार मुख्य रूप से तीन प्रमुख वर्गों में प्रदान किए जाते हैं:") }],
          },
          {
            _key: "b4-5",
            _type: "block",
            style: "normal",
            children: [{ _key: "s4-5", _type: "span", text: sanitizeText("1. **फीचर फिल्म पुरस्कार (Feature Film Awards)**") }],
          },
          {
            _key: "b4-6",
            _type: "block",
            style: "normal",
            children: [{ _key: "s4-6", _type: "span", text: sanitizeText("2. **गैर-फीचर फिल्म पुरस्कार (Non-Feature Film Awards)**") }],
          },
          {
            _key: "b4-7",
            _type: "block",
            style: "normal",
            children: [{ _key: "s4-7", _type: "span", text: sanitizeText("3. **सिनेमा पर सर्वश्रेष्ठ लेखन (Best Writing on Cinema)**") }],
          },
        ],
        bodyEn: [
          {
            _key: "b4-8",
            _type: "block",
            style: "normal",
            children: [{ _key: "s4-8", _type: "span", text: sanitizeText("• **Inception (1954)**: The National Film Awards were instituted in the year **1954** by the Ministry of Information and Broadcasting.") }],
          },
          {
            _key: "b4-9",
            _type: "block",
            style: "normal",
            children: [{ _key: "s4-9", _type: "span", text: sanitizeText("• **Original Nomenclature**: Initially, these honors were designated as **'State Awards for Films'**.") }],
          },
          {
            _key: "b4-10",
            _type: "block",
            style: "normal",
            children: [{ _key: "s4-10", _type: "span", text: sanitizeText("• **Renamed in 1973**: In **1973**, the awards were formally renamed as the **'National Film Awards'**.") }],
          },
          {
            _key: "b4-img-2-en",
            _type: "image",
            asset: { _type: "reference", _ref: assetCeremony._id },
            alt: "Hon'ble President of India Smt. Droupadi Murmu presenting National Film Award to Yami Gautam",
          },
          {
            _key: "b4-11",
            _type: "block",
            style: "normal",
            children: [{ _key: "s4-11", _type: "span", text: sanitizeText("• **Three Primary Sections**: The awards are broadly presented across three distinct umbrellas:") }],
          },
          {
            _key: "b4-12",
            _type: "block",
            style: "normal",
            children: [{ _key: "s4-12", _type: "span", text: sanitizeText("1. **Feature Film Awards**") }],
          },
          {
            _key: "b4-13",
            _type: "block",
            style: "normal",
            children: [{ _key: "s4-13", _type: "span", text: sanitizeText("2. **Non-Feature Film Awards**") }],
          },
          {
            _key: "b4-14",
            _type: "block",
            style: "normal",
            children: [{ _key: "s4-14", _type: "span", text: sanitizeText("3. **Best Writing on Cinema**") }],
          },
        ],
      },

      /* ── 5. Award Categories & Trophies ──────────────────────── */
      {
        _key: "sec-award-types",
        kind: "factsAtAGlance",
        title: sanitizeText("पुरस्कारों में मिलने वाले प्रमुख सम्मान एवं श्रेणियां"),
        titleEn: sanitizeText("Major Categories & Award Honors"),
        body: [
          {
            _key: "b5-1",
            _type: "block",
            style: "normal",
            children: [{ _key: "s5-1", _type: "span", text: sanitizeText("• **स्वर्ण कमल (Golden Lotus / Swarn Kamal)**: यह प्रमुख और सर्वोच्च श्रेणियों (जैसे सर्वश्रेष्ठ फीचर फिल्म, सर्वश्रेष्ठ निर्देशन, सर्वश्रेष्ठ लोकप्रिय फिल्म, सर्वश्रेष्ठ नवोदित निर्देशक) के लिए दिया जाने वाला सम्मान है। इसके तहत स्वर्ण कमल पदक और नकद राशि प्रदान की जाती है।") }],
          },
          {
            _key: "b5-2",
            _type: "block",
            style: "normal",
            children: [{ _key: "s5-2", _type: "span", text: sanitizeText("• **रजत कमल (Silver Lotus / Rajat Kamal)**: यह विभिन्न उत्कृष्ट प्रदर्शन, अभिनय, सहायक भूमिकाओं तथा तकनीकी श्रेणियों (जैसे सर्वश्रेष्ठ अभिनेता, सर्वश्रेष्ठ अभिनेत्री, सर्वश्रेष्ठ सहायक अभिनेता, सर्वश्रेष्ठ पटकथा, सिनेमैटोग्राफी, पार्श्वगायन आदि) में प्रदान किया जाता है। इसके साथ रजत कमल पदक और नकद राशि दी जाती है।") }],
          },
          {
            _key: "b5-3",
            _type: "block",
            style: "normal",
            children: [{ _key: "s5-3", _type: "span", text: sanitizeText("• **दादा साहब फाल्के पुरस्कार (Dadasaheb Phalke Award)**: भारतीय सिनेमा में आजीवन योगदान (Lifetime Contribution) के लिए दिया जाने वाला सर्वोच्च और अति-प्रतिष्ठित फिल्म सम्मान है। इसकी शुरुआत 1969 में हुई थी। इसके विजेता को स्वर्ण कमल, ₹10 लाख की नकद राशि तथा एक रेशमी शॉल प्रदान की जाती है।") }],
          },
        ],
        bodyEn: [
          {
            _key: "b5-4",
            _type: "block",
            style: "normal",
            children: [{ _key: "s5-4", _type: "span", text: sanitizeText("• **Swarn Kamal (Golden Lotus)**: Conferred upon apex categories including Best Feature Film, Best Direction, Best Popular Film, and Best Debut Director. Winners receive the Golden Lotus medallion along with cash prize.") }],
          },
          {
            _key: "b5-5",
            _type: "block",
            style: "normal",
            children: [{ _key: "s5-5", _type: "span", text: sanitizeText("• **Rajat Kamal (Silver Lotus)**: Conferred upon individual performance and technical achievements including Best Actor, Best Actress, Best Supporting Actor/Actress, Best Screenplay, Cinematography, and Music Direction. Includes Silver Lotus medallion and cash prize.") }],
          },
          {
            _key: "b5-6",
            _type: "block",
            style: "normal",
            children: [{ _key: "s5-6", _type: "span", text: sanitizeText("• **Dadasaheb Phalke Award**: India's highest award in cinema for lifetime dedication and contribution to Indian film history (instituted in 1969). Carries a Golden Lotus (Swarn Kamal), ₹10 Lakhs cash reward, and a ceremonial shawl.") }],
          },
        ],
      },

      /* ── 6. Exam Revision Summary ────────────────────────────── */
      {
        _key: "sec-exam-facts",
        kind: "quickFacts",
        title: sanitizeText("MPPSC & UPSC परीक्षा हेतु मुख्य बिंदु (Facts at a Glance)"),
        titleEn: sanitizeText("Key Facts for MPPSC & UPSC Exams"),
        body: [
          {
            _key: "b6-1",
            _type: "block",
            style: "normal",
            children: [{ _key: "s6-1", _type: "span", text: sanitizeText("• **पुरस्कार का नाम**: 72वाँ राष्ट्रीय फिल्म पुरस्कार (National Film Awards 2024)") }],
          },
          {
            _key: "b6-2",
            _type: "block",
            style: "normal",
            children: [{ _key: "s6-2", _type: "span", text: sanitizeText("• **स्थापना वर्ष**: 1954 (प्रारंभिक नाम: State Awards for Films)") }],
          },
          {
            _key: "b6-3",
            _type: "block",
            style: "normal",
            children: [{ _key: "s6-3", _type: "span", text: sanitizeText("• **नाम परिवर्तन**: 1973 से 'National Film Awards'") }],
          },
          {
            _key: "b6-4",
            _type: "block",
            style: "normal",
            children: [{ _key: "s6-4", _type: "span", text: sanitizeText("• **आयोजक मंत्रालय**: सूचना एवं प्रसारण मंत्रालय (Ministry of Information & Broadcasting)") }],
          },
          {
            _key: "b6-5",
            _type: "block",
            style: "normal",
            children: [{ _key: "s6-5", _type: "span", text: sanitizeText("• **आयोजक संस्था**: National Film Development Corporation - NFDC (2022 से)") }],
          },
          {
            _key: "b6-6",
            _type: "block",
            style: "normal",
            children: [{ _key: "s6-6", _type: "span", text: sanitizeText("• **सर्वश्रेष्ठ फीचर फिल्म**: आर्टिकल 370 (हिंदी) — निर्देशक: आदित्य सुहास जांभले") }],
          },
          {
            _key: "b6-7",
            _type: "block",
            style: "normal",
            children: [{ _key: "s6-7", _type: "span", text: sanitizeText("• **सर्वश्रेष्ठ अभिनेता**: कार्तिक आर्यन (चंदू चैंपियन) एवं मम्मुटी (ब्रह्मयुगम) संयुक्त रूप से") }],
          },
          {
            _key: "b6-8",
            _type: "block",
            style: "normal",
            children: [{ _key: "s6-8", _type: "span", text: sanitizeText("• **सर्वश्रेष्ठ अभिनेत्री**: यामी गौतम (आर्टिकल 370)") }],
          },
          {
            _key: "b6-9",
            _type: "block",
            style: "normal",
            children: [{ _key: "s6-9", _type: "span", text: sanitizeText("• **सर्वश्रेष्ठ लोकप्रिय फिल्म**: कल्कि 2898 एडी (नाग अश्विन)") }],
          },
          {
            _key: "b6-10",
            _type: "block",
            style: "normal",
            children: [{ _key: "s6-10", _type: "span", text: sanitizeText("• **अधिकृत सूचना स्रोत**: PIB (Press Information Bureau) Factsheet (PIB Id: 151027)") }],
          },
        ],
        bodyEn: [
          {
            _key: "b6-11",
            _type: "block",
            style: "normal",
            children: [{ _key: "s6-11", _type: "span", text: sanitizeText("• **Award Edition**: 72nd National Film Awards (Films certified in 2024)") }],
          },
          {
            _key: "b6-12",
            _type: "block",
            style: "normal",
            children: [{ _key: "s6-12", _type: "span", text: sanitizeText("• **Year of Inception**: 1954 (Initial Name: State Awards for Films)") }],
          },
          {
            _key: "b6-13",
            _type: "block",
            style: "normal",
            children: [{ _key: "s6-13", _type: "span", text: sanitizeText("• **Renamed**: In 1973 to 'National Film Awards'") }],
          },
          {
            _key: "b6-14",
            _type: "block",
            style: "normal",
            children: [{ _key: "s6-14", _type: "span", text: sanitizeText("• **Parent Ministry**: Ministry of Information & Broadcasting") }],
          },
          {
            _key: "b6-15",
            _type: "block",
            style: "normal",
            children: [{ _key: "s6-15", _type: "span", text: sanitizeText("• **Implementing Agency**: National Film Development Corporation - NFDC (since 2022)") }],
          },
          {
            _key: "b6-16",
            _type: "block",
            style: "normal",
            children: [{ _key: "s6-16", _type: "span", text: sanitizeText("• **Best Feature Film**: Article 370 (Hindi) — Director: Aditya Suhas Jambhale") }],
          },
          {
            _key: "b6-17",
            _type: "block",
            style: "normal",
            children: [{ _key: "s6-17", _type: "span", text: sanitizeText("• **Best Actor**: Kartik Aaryan ('Chandu Champion') & Mammootty ('Bramayugam') jointly") }],
          },
          {
            _key: "b6-18",
            _type: "block",
            style: "normal",
            children: [{ _key: "s6-18", _type: "span", text: sanitizeText("• **Best Actress**: Yami Gautam ('Article 370')") }],
          },
          {
            _key: "b6-19",
            _type: "block",
            style: "normal",
            children: [{ _key: "s6-19", _type: "span", text: sanitizeText("• **Best Popular Film**: Kalki 2898 AD (Director: Nag Ashwin)") }],
          },
          {
            _key: "b6-20",
            _type: "block",
            style: "normal",
            children: [{ _key: "s6-20", _type: "span", text: sanitizeText("• **Official Source Reference**: Press Information Bureau (PIB Id: 151027)") }],
          },
        ],
      },
    ],

    /* ─── MCQs (Exactly 8 High-Quality Quizzes as mandated) ─────── */
    mcqs: [
      {
        question: sanitizeText("राष्ट्रीय फिल्म पुरस्कारों की स्थापना किस वर्ष हुई थी?"),
        questionEn: sanitizeText("In which year were the National Film Awards established?"),
        options: [sanitizeText("1947"), sanitizeText("1950"), sanitizeText("1954"), sanitizeText("1973")],
        optionsEn: [sanitizeText("1947"), sanitizeText("1950"), sanitizeText("1954"), sanitizeText("1973")],
        correctIndex: 2,
        explanation: sanitizeText("राष्ट्रीय फिल्म पुरस्कारों की शुरुआत 1954 में 'State Awards for Films' के रूप में हुई थी। 1973 से इन्हें 'National Film Awards' कहा जाने लगा।"),
        explanationEn: sanitizeText("The National Film Awards were established in 1954 as 'State Awards for Films' and were renamed in 1973.")
      },
      {
        question: sanitizeText("72वें राष्ट्रीय फिल्म पुरस्कार में 'सर्वश्रेष्ठ फीचर फिल्म' (Best Feature Film) का पुरस्कार किस फिल्म को मिला?"),
        questionEn: sanitizeText("Which movie won the 'Best Feature Film' award at the 72nd National Film Awards?"),
        options: [sanitizeText("कल्कि 2898 एडी"), sanitizeText("आर्टिकल 370"), sanitizeText("श्रीकांत"), sanitizeText("स्वातंत्र्य वीर सावरकर")],
        optionsEn: [sanitizeText("Kalki 2898 AD"), sanitizeText("Article 370"), sanitizeText("Srikanth"), sanitizeText("Swatantrya Veer Savarkar")],
        correctIndex: 1,
        explanation: sanitizeText("आदित्य सुहास जांभले द्वारा निर्देशित हिंदी फिल्म 'आर्टिकल 370' को 72वें राष्ट्रीय फिल्म पुरस्कार में सर्वश्रेष्ठ फीचर फिल्म चुना गया।"),
        explanationEn: sanitizeText("The Hindi film 'Article 370', directed by Aditya Suhas Jambhale, won the Best Feature Film award.")
      },
      {
        question: sanitizeText("वर्ष 2022 से राष्ट्रीय फिल्म पुरस्कारों का आयोजन किस संस्था द्वारा किया जा रहा है?"),
        questionEn: "Which organization has been organizing the National Film Awards since 2022?",
        options: [sanitizeText("सेंसर बोर्ड (CBFC)"), sanitizeText("National Film Development Corporation (NFDC)"), sanitizeText("फिल्म एंड टेलीविजन इंस्टीट्यूट ऑफ इंडिया (FTII)"), sanitizeText("संगीत नाटक अकादमी")],
        optionsEn: [sanitizeText("Central Board of Film Certification (CBFC)"), sanitizeText("National Film Development Corporation (NFDC)"), sanitizeText("Film and Television Institute of India (FTII)"), sanitizeText("Sangeet Natak Akademi")],
        correctIndex: 1,
        explanation: sanitizeText("वर्ष 2022 से सूचना एवं प्रसारण मंत्रालय के अंतर्गत National Film Development Corporation (NFDC) द्वारा इसका आयोजन किया जा रहा है।"),
        explanationEn: "Since 2022, the National Film Development Corporation (NFDC) under the I&B Ministry organizes the awards."
      },
      {
        question: sanitizeText("72वें राष्ट्रीय फिल्म पुरस्कार में सर्वश्रेष्ठ अभिनेत्री (Best Actress) का पुरस्कार किसे प्रदान किया गया?"),
        questionEn: "Who was awarded Best Actress at the 72nd National Film Awards?",
        options: [sanitizeText("आलिया भट्ट"), sanitizeText("यामी गौतम"), sanitizeText("दीपिका पादुकोण"), sanitizeText("तृप्ति डिमरी")],
        optionsEn: [sanitizeText("Alia Bhatt"), sanitizeText("Yami Gautam"), sanitizeText("Deepika Padukone"), sanitizeText("Triptii Dimri")],
        correctIndex: 1,
        explanation: sanitizeText("यामी गौतम को फिल्म 'आर्टिकल 370' में उनके उत्कृष्ट प्रदर्शन के लिए सर्वश्रेष्ठ अभिनेत्री चुना गया।"),
        explanationEn: "Yami Gautam was awarded Best Actress for her stellar role in 'Article 370'."
      },
      {
        question: sanitizeText("72वें राष्ट्रीय फिल्म पुरस्कार में 'सर्वश्रेष्ठ लोकप्रिय फिल्म' (Best Popular Film) का पुरस्कार किस फिल्म ने जीता?"),
        questionEn: "Which film won the 'Best Popular Film Providing Wholesome Entertainment' award at the 72nd National Film Awards?",
        options: [sanitizeText("अमरन"), sanitizeText("श्रीकांत"), sanitizeText("कल्कि 2898 एडी"), sanitizeText("चंदू चैंपियन")],
        optionsEn: [sanitizeText("Amaran"), sanitizeText("Srikanth"), sanitizeText("Kalki 2898 AD"), sanitizeText("Chandu Champion")],
        correctIndex: 2,
        explanation: sanitizeText("नाग अश्विन द्वारा निर्देशित तेलुगु फिल्म 'कल्कि 2898 एडी' को सर्वश्रेष्ठ लोकप्रिय फिल्म का पुरस्कार मिला।"),
        explanationEn: "The Telugu film 'Kalki 2898 AD', directed by Nag Ashwin, won the Best Popular Film award."
      },
      {
        question: sanitizeText("राष्ट्रीय फिल्म पुरस्कारों में किस वर्ग को सर्वोच्च सम्मान 'स्वर्ण कमल' (Golden Lotus) दिया जाता है?"),
        questionEn: "Which honor is considered the apex recognition ('Swarn Kamal') in National Film Awards?",
        options: [sanitizeText("केवल सर्वश्रेष्ठ अभिनेता"), sanitizeText("सर्वश्रेष्ठ फीचर फिल्म एवं निर्देशन जैसी प्रमुख श्रेणियां"), sanitizeText("केवल सर्वश्रेष्ठ पार्श्व गायक"), sanitizeText("सर्वश्रेष्ठ सिनेमैटोग्राफी")],
        optionsEn: [sanitizeText("Best Actor only"), sanitizeText("Major categories like Best Feature Film & Best Direction"), sanitizeText("Best Playback Singer only"), sanitizeText("Best Cinematography")],
        correctIndex: 1,
        explanation: sanitizeText("स्वर्ण कमल प्रमुख शीर्ष श्रेणियों जैसे सर्वश्रेष्ठ फीचर फिल्म, सर्वश्रेष्ठ निर्देशन, सर्वश्रेष्ठ लोकप्रिय फिल्म तथा सर्वश्रेष्ठ नवोदित निर्देशक के लिए दिया जाता है।"),
        explanationEn: "Swarn Kamal (Golden Lotus) is awarded to apex categories like Best Feature Film, Best Direction, and Best Popular Film."
      },
      {
        question: sanitizeText("भारतीय सिनेमा में आजीवन योगदान के लिए दिया जाने वाला सर्वोच्च फिल्म सम्मान कौन सा है?"),
        questionEn: "Which is India's highest award in cinema for lifetime contribution?",
        options: [sanitizeText("फिल्मफेयर लाइफटाइम अचीवमेंट पुरस्कार"), sanitizeText("दादा साहब फाल्के पुरस्कार"), sanitizeText("राष्ट्रीय स्वर्ण कमल पुरस्कार"), sanitizeText("सत्यजीत रे लाइफटाइम पुरस्कार")],
        optionsEn: [sanitizeText("Filmfare Lifetime Achievement Award"), sanitizeText("Dadasaheb Phalke Award"), sanitizeText("National Swarn Kamal Award"), sanitizeText("Satyajit Ray Lifetime Award")],
        correctIndex: 1,
        explanation: sanitizeText("दादा साहब फाल्के पुरस्कार (1969 में स्थापित) भारतीय सिनेमा में आजीवन योगदान हेतु दिया जाने वाला सर्वोच्च फिल्म सम्मान है।"),
        explanationEn: "The Dadasaheb Phalke Award (instituted in 1969) is India's highest award for lifetime contribution to cinema."
      },
      {
        question: sanitizeText("72वें राष्ट्रीय फिल्म पुरस्कार में सर्वश्रेष्ठ नवोदित निर्देशक (Best Debut Director) का पुरस्कार किसने जीता?"),
        questionEn: "Who won the Best Debut Director award at the 72nd National Film Awards?",
        options: [sanitizeText("तुषार हीरानंदानी"), sanitizeText("रणदीप हुड्डा"), sanitizeText("सुमीर टांग"), sanitizeText("राजकुमार पेरियासामी")],
        optionsEn: [sanitizeText("Tushar Hiranandani"), sanitizeText("Randeep Hooda"), sanitizeText("Sumeer Tang"), sanitizeText("Rajkumar Periasamy")],
        correctIndex: 1,
        explanation: sanitizeText("रणदीप हुड्डा ने अपनी निर्देशित फिल्म 'स्वातंत्र्य वीर सावरकर' के लिए सर्वश्रेष्ठ नवोदित निर्देशक का पुरस्कार जीता।"),
        explanationEn: "Randeep Hooda won the Best Debut Director award for his film 'Swatantrya Veer Savarkar'."
      }
    ],

    /* ─── FAQs ──────────────────────────────────────────────── */
    faqs: [
      {
        question: sanitizeText("72वें राष्ट्रीय फिल्म पुरस्कार में किस वर्ष की फिल्मों को सम्मानित किया गया?"),
        questionEn: "Films certified in which year were honored at the 72nd National Film Awards?",
        answer: sanitizeText("72वें राष्ट्रीय फिल्म पुरस्कार में सेंसर बोर्ड (CBFC) द्वारा वर्ष 2024 के दौरान प्रमाणित फिल्मों को सम्मानित किया गया।"),
        answerEn: "Films certified by the Central Board of Film Certification (CBFC) during the calendar year 2024 were honored."
      },
      {
        question: sanitizeText("72वें राष्ट्रीय फिल्म पुरस्कार में सर्वश्रेष्ठ फीचर फिल्म का पुरस्कार किसे मिला?"),
        questionEn: "Which movie won the Best Feature Film award at the 72nd National Film Awards?",
        answer: sanitizeText("आदित्य सुहास जांभले द्वारा निर्देशित हिंदी फिल्म 'आर्टिकल 370' को सर्वश्रेष्ठ फीचर फिल्म घोषित किया गया।"),
        answerEn: "The Hindi film 'Article 370', directed by Aditya Suhas Jambhale, won the Best Feature Film award."
      },
      {
        question: sanitizeText("72वें राष्ट्रीय फिल्म पुरस्कार में सर्वश्रेष्ठ अभिनेता कौन चुने गए?"),
        questionEn: "Who won the Best Actor award at the 72nd National Film Awards?",
        answer: sanitizeText("कार्तिक आर्यन ('चंदू चैंपियन' - हिंदी) और मम्मुटी ('ब्रह्मयुगम' - मलयालम) को संयुक्त रूप से सर्वश्रेष्ठ अभिनेता चुना गया।"),
        answerEn: "Kartik Aaryan ('Chandu Champion') and Mammootty ('Bramayugam') were jointly awarded Best Actor."
      },
      {
        question: sanitizeText("72वें राष्ट्रीय फिल्म पुरस्कार में सर्वश्रेष्ठ अभिनेत्री का पुरस्कार किसे मिला?"),
        questionEn: "Who bagged the Best Actress award at the 72nd National Film Awards?",
        answer: sanitizeText("यामी गौतम को फिल्म 'आर्टिकल 370' के लिए सर्वश्रेष्ठ अभिनेत्री चुना गया।"),
        answerEn: "Yami Gautam won the Best Actress award for her portrayal in 'Article 370'."
      },
      {
        question: sanitizeText("राष्ट्रीय फिल्म पुरस्कारों की शुरुआत कब और किस नाम से हुई थी?"),
        questionEn: "When were the National Film Awards started and under what name?",
        answer: sanitizeText("इनकी शुरुआत 1954 में हुई थी और प्रारंभ में इन्हें 'State Awards for Films' कहा जाता था। 1973 से इन्हें 'National Film Awards' कहा जाने लगा।"),
        answerEn: "They were instituted in 1954 as 'State Awards for Films' and renamed 'National Film Awards' in 1973."
      },
      {
        question: sanitizeText("राष्ट्रीय फिल्म पुरस्कारों का आयोजन किस मंत्रालय और संस्था द्वारा किया जाता है?"),
        questionEn: "Which ministry and organization conduct the National Film Awards?",
        answer: sanitizeText("यह पुरस्कार सूचना एवं प्रसारण मंत्रालय (Ministry of Information & Broadcasting) के अंतर्गत आते हैं तथा 2022 से NFDC द्वारा आयोजित किए जाते हैं।"),
        answerEn: "Under the Ministry of Information & Broadcasting, organized by the National Film Development Corporation (NFDC) since 2022."
      },
      {
        question: sanitizeText("स्वर्ण कमल और रजत कमल में क्या अंतर है?"),
        questionEn: "What is the difference between Swarn Kamal and Rajat Kamal?",
        answer: sanitizeText("स्वर्ण कमल (Golden Lotus) प्रमुख शीर्ष श्रेणियों (सर्वश्रेष्ठ फीचर फिल्म, निर्देशन, लोकप्रिय फिल्म) हेतु दिया जाता है, जबकि रजत कमल (Silver Lotus) अभिनय व तकनीकी श्रेणियों हेतु दिया जाता है।"),
        answerEn: "Swarn Kamal (Golden Lotus) is awarded to apex categories (Best Feature Film, Direction, Popular Film), while Rajat Kamal (Silver Lotus) is for acting and technical excellence."
      },
      {
        question: sanitizeText("दादा साहब फाल्के पुरस्कार क्या है?"),
        questionEn: "What is the Dadasaheb Phalke Award?",
        answer: sanitizeText("यह भारतीय सिनेमा में आजीवन योगदान के लिए दिया जाने वाला सर्वोच्च सम्मान है (स्थापना 1969)। इसमें स्वर्ण कमल, ₹10 लाख नकद राशि व शॉल दी जाती है।"),
        answerEn: "It is India's highest award in cinema for lifetime contribution (instituted in 1969), carrying a Golden Lotus, ₹10 Lakhs cash prize, and shawl."
      }
    ],

    /* ─── Sources ────────────────────────────────────────────── */
    sources: [
      { label: "PIB Delhi Factsheet (PIB Id: 151027)", url: "https://www.pib.gov.in/FactsheetDetails.aspx?Id=151027&reg=3&lang=2" },
      { label: "Ministry of Information & Broadcasting, Govt of India", url: "https://mib.gov.in" },
      { label: "National Film Development Corporation (NFDC)", url: "https://nfdcindia.com" }
    ]
  };

  try {
    await client.createOrReplace(article);
    console.log("✨ Successfully created/replaced 72nd National Film Awards Article in Sanity!");
  } catch (err) {
    console.error("❌ Failed to create/replace document in Sanity:", err);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("❌ Error running upload script:", err);
  process.exit(1);
});
