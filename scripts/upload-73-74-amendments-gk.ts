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
  console.log("🚀 Starting upload process for 73rd and 74th Amendments Static GK Article...");

  // Image file paths in public/images/blog/
  const imagePaths = {
    constitution: path.resolve(process.cwd(), "public/images/blog/const-amendments-1992-1.png"),
    panchayat: path.resolve(process.cwd(), "public/images/blog/const-amendments-1992-2.png"),
    municipal: path.resolve(process.cwd(), "public/images/blog/const-amendments-1992-3.png"),
  };

  // Check if files exist
  if (!fs.existsSync(imagePaths.constitution) || !fs.existsSync(imagePaths.panchayat) || !fs.existsSync(imagePaths.municipal)) {
    console.error("❌ Required images not found in public/images/blog/");
    process.exit(1);
  }

  // 1. Upload Constitution Image
  console.log("📸 Uploading constitution image...");
  const assetConst = await client.assets.upload("image", fs.createReadStream(imagePaths.constitution), {
    filename: "const_amendments_1992_constitution.png",
  });
  console.log(`✔ Uploaded constitution image. Asset ID: ${assetConst._id}`);

  // 2. Upload Panchayat Image (Rural)
  console.log("📸 Uploading Gram Panchayat image...");
  const assetPanchayat = await client.assets.upload("image", fs.createReadStream(imagePaths.panchayat), {
    filename: "const_amendments_1992_panchayat.png",
  });
  console.log(`✔ Uploaded Panchayat image. Asset ID: ${assetPanchayat._id}`);

  // 3. Upload Municipal Image (Urban)
  console.log("📸 Uploading Municipal Nagar Nigam image...");
  const assetMunicipal = await client.assets.upload("image", fs.createReadStream(imagePaths.municipal), {
    filename: "const_amendments_1992_municipal.png",
  });
  console.log(`✔ Uploaded Municipal image. Asset ID: ${assetMunicipal._id}`);

  // 4. Construct the Article document
  const article = {
    _id: "gk-73-74-constitutional-amendments-1992",
    _type: "staticGk",
    slug: { _type: "slug", current: "73-74-constitutional-amendments-1992" },
    title: "73वाँ एवं 74वाँ संविधान संशोधन अधिनियम, 1992: स्थानीय स्वशासन की नींव",
    titleEn: "73rd and 74th Constitutional Amendment Acts, 1992: The Foundation of Local Self-Government",
    excerpt: "73वें एवं 74वें संविधान संशोधन अधिनियमों ने भारत में क्रमशः पंचायती राज और नगरीय निकायों को संवैधानिक दर्जा प्रदान कर भारत में त्रिस्तरीय स्वशासन प्रणाली का सूत्रपात किया। यह विषय मुख्य परीक्षाओं तथा प्रारंभिक परीक्षाओं की दृष्टि से महत्वपूर्ण है।",
    excerptEn: "The 73rd and 74th Constitutional Amendment Acts, 1992 institutionalized rural Panchayati Raj and urban municipalities in India, creating a decentralized three-tier democratic governance. Critical for civil services preparation.",
    ca_date: "2026-07-08",
    publishedAt: new Date().toISOString(),
    featured: true,
    readingTime: 7,
    keywords: [
      "73rd Amendment",
      "74th Amendment",
      "Panchayati Raj",
      "Local Self Government",
      "Urban Local Bodies",
      "11th Schedule",
      "12th Schedule",
      "73वाँ संविधान संशोधन",
      "74वाँ संविधान संशोधन",
      "पंचायती राज",
      "नगर निगम",
      "UPSC Polity",
      "MPPSC Polity"
    ],
    category: { _type: "reference", _ref: "cat-polity" }, // Subject-wise: Polity
    author: { _type: "reference", _ref: "author-aakar" },
    tags: [
      { _type: "reference", _ref: "tag-upsc" },
      { _type: "reference", _ref: "tag-mppsc" },
      { _type: "reference", _ref: "tag-prelims" },
      { _type: "reference", _ref: "tag-mains" },
    ],
    syllabus: ["GS-2", "Prelims-GS"],
    featuredImage: {
      _type: "image",
      asset: { _type: "reference", _ref: assetConst._id },
      alt: "Gold-embossed Constitution of India book on study table representing 73rd and 74th amendments",
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
            children: [{ _key: "s1-1", _type: "span", text: "वर्ष 1992 में पारित 73वें एवं 74वें संविधान संशोधन अधिनियमों ने भारत में स्थानीय स्वशासन (Local Self Government) को संवैधानिक दर्जा दिया। इस व्यवस्था ने भारतीय लोकतंत्र को जमीनी स्तर (Grassroots Level) पर मजबूत करने का कार्य किया है।" }],
          },
          {
            _key: "b1-2", _type: "block", style: "normal",
            children: [{ _key: "s1-2", _type: "span", text: "हाल ही में पंचायती राज और शहरी स्थानीय निकायों की संवैधानिक स्थापना के तीन दशक पूरे होने के संदर्भ में इसके प्रभाव एवं मूल्यांकन पर व्यापक चर्चा हो रही है। यह विषय लोक सेवा आयोग परीक्षाओं (UPSC & State PSCs) के मुख्य परीक्षा (Mains) एवं प्रारंभिक परीक्षा (Prelims) दोनों की दृष्टि से अत्यंत महत्वपूर्ण है।" }],
          },
        ],
        bodyEn: [
          {
            _key: "b1-3", _type: "block", style: "normal",
            children: [{ _key: "s1-3", _type: "span", text: "The 73rd and 74th Constitutional Amendment Acts, passed in 1992, provided constitutional status to local self-government in India. This framework successfully institutionalized democratic decentralization at the grassroots level." }],
          },
          {
            _key: "b1-4", _type: "block", style: "normal",
            children: [{ _key: "s1-4", _type: "span", text: "With over three decades of implementation, reviewing their structure, assigned subjects, and developmental impacts remains highly critical for civil services exams, including both Prelims and Mains." }],
          },
        ],
      },

      /* ── 2. 73rd Amendment ───────────────────────────────────── */
      {
        _key: "sec-73rd-details",
        kind: "background",
        title: "73वाँ संविधान संशोधन अधिनियम, 1992 (पंचायती राज)",
        titleEn: "73rd Constitutional Amendment Act, 1992 (Panchayati Raj)",
        body: [
          {
            _key: "b2-1", _type: "block", style: "normal",
            children: [{ _key: "s2-1", _type: "span", text: "• ऐतिहासिक पृष्ठभूमि व महत्वपूर्ण तिथियाँ:" }],
          },
          {
            _key: "b2-2", _type: "block", style: "normal",
            children: [{ _key: "s2-2", _type: "span", text: "  - लोकसभा से पारित: 22 दिसंबर 1992" }],
          },
          {
            _key: "b2-3", _type: "block", style: "normal",
            children: [{ _key: "s2-3", _type: "span", text: "  - राज्यसभा से पारित: 23 दिसंबर 1992" }],
          },
          {
            _key: "b2-4", _type: "block", style: "normal",
            children: [{ _key: "s2-4", _type: "span", text: "  - राष्ट्रपति की स्वीकृति: 20 अप्रैल 1993" }],
          },
          {
            _key: "b2-5", _type: "block", style: "normal",
            children: [{ _key: "s2-5", _type: "span", text: "  - अधिनियम लागू होने की तिथि: 24 अप्रैल 1993 (इसीलिए प्रतिवर्ष 24 अप्रैल को राष्ट्रीय पंचायती राज दिवस मनाया जाता है)" }],
          },
          {
            _key: "b2-6", _type: "block", style: "normal",
            children: [{ _key: "s2-6", _type: "span", text: "  - तत्कालीन राष्ट्रपति: डॉ. शंकर दयाल शर्मा | तत्कालीन प्रधानमंत्री: पी. वी. नरसिम्हा राव" }],
          },
          {
            _key: "b2-img", _type: "image",
            asset: { _type: "reference", _ref: assetPanchayat._id },
            alt: "A modern Gram Panchayat Pipariya building flying the Indian national flag representing rural local bodies",
          },
          {
            _key: "b2-7", _type: "block", style: "normal",
            children: [{ _key: "s2-7", _type: "span", text: "• प्रमुख संवैधानिक प्रावधान:" }],
          },
          {
            _key: "b2-8", _type: "block", style: "normal",
            children: [{ _key: "s2-8", _type: "span", text: "  - संविधान में नया भाग-IX (Part IX) जोड़ा गया।" }],
          },
          {
            _key: "b2-9", _type: "block", style: "normal",
            children: [{ _key: "s2-9", _type: "span", text: "  - इसके तहत अनुच्छेद 243 से 243O (Articles 243-243O) जोड़े गए।" }],
          },
          {
            _key: "b2-10", _type: "block", style: "normal",
            children: [{ _key: "s2-10", _type: "span", text: "  - संविधान में 11वीं अनुसूची (11th Schedule) जोड़ी गई, जिसमें पंचायतों को 29 कार्यक्षेत्र विषय (29 Functional Subjects) सौंपे गए।" }],
          },
          {
            _key: "b2-11", _type: "block", style: "normal",
            children: [{ _key: "s2-11", _type: "span", text: "• त्रिस्तरीय पंचायती राज व्यवस्था:" }],
          },
          {
            _key: "b2-12", _type: "block", style: "normal",
            children: [{ _key: "s2-12", _type: "span", text: "  1. Gram Panchayat (ग्राम स्तर पर)" }],
          },
          {
            _key: "b2-13", _type: "block", style: "normal",
            children: [{ _key: "s2-13", _type: "span", text: "  2. जनपद पंचायत / पंचायत समिति (खंड या मध्यवर्ती स्तर पर)" }],
          },
          {
            _key: "b2-14", _type: "block", style: "normal",
            children: [{ _key: "s2-14", _type: "span", text: "  3. जिला पंचायत (जिला स्तर पर)" }],
          },
          {
            _key: "b2-15", _type: "block", style: "normal",
            children: [{ _key: "s2-15", _type: "span", text: "• विशेष तथ्य: मध्यप्रदेश इस ऐतिहासिक 73वें संविधान संशोधन अधिनियम को प्रभावी रूप से लागू करने वाला देश का पहला राज्य बना था।" }],
          },
        ],
        bodyEn: [
          {
            _key: "b2-16", _type: "block", style: "normal",
            children: [{ _key: "s2-16", _type: "span", text: "• Historical Timeline & Critical Dates:" }],
          },
          {
            _key: "b2-17", _type: "block", style: "normal",
            children: [{ _key: "s2-17", _type: "span", text: "  - Passed by Lok Sabha: December 22, 1992" }],
          },
          {
            _key: "b2-18", _type: "block", style: "normal",
            children: [{ _key: "s2-18", _type: "span", text: "  - Passed by Rajya Sabha: December 23, 1992" }],
          },
          {
            _key: "b2-19", _type: "block", style: "normal",
            children: [{ _key: "s2-19", _type: "span", text: "  - Presidential Assent Conferred: April 20, 1993" }],
          },
          {
            _key: "b2-20", _type: "block", style: "normal",
            children: [{ _key: "s2-20", _type: "span", text: "  - Date of Commencement: April 24, 1993 (Observed annually as National Panchayati Raj Day)" }],
          },
          {
            _key: "b2-21", _type: "block", style: "normal",
            children: [{ _key: "s2-21", _type: "span", text: "  - President at the time: Dr. Shankar Dayal Sharma | Prime Minister at the time: P. V. Narasimha Rao" }],
          },
          {
            _key: "b2-img-en", _type: "image",
            asset: { _type: "reference", _ref: assetPanchayat._id },
            alt: "A modern Gram Panchayat Pipariya building flying the Indian national flag representing rural local bodies",
          },
          {
            _key: "b2-22", _type: "block", style: "normal",
            children: [{ _key: "s2-22", _type: "span", text: "• Constitutional Features:" }],
          },
          {
            _key: "b2-23", _type: "block", style: "normal",
            children: [{ _key: "s2-23", _type: "span", text: "  - Added a new Part-IX (Part IX) to the Constitution of India." }],
          },
          {
            _key: "b2-24", _type: "block", style: "normal",
            children: [{ _key: "s2-24", _type: "span", text: "  - Inserted Articles 243 to 243O." }],
          },
          {
            _key: "b2-25", _type: "block", style: "normal",
            children: [{ _key: "s2-25", _type: "span", text: "  - Added the 11th Schedule containing 29 functional subjects for rural governance." }],
          },
          {
            _key: "b2-26", _type: "block", style: "normal",
            children: [{ _key: "s2-26", _type: "span", text: "• Three-Tier System Structure:" }],
          },
          {
            _key: "b2-27", _type: "block", style: "normal",
            children: [{ _key: "s2-27", _type: "span", text: "  1. Gram Panchayat (at the Village Level)" }],
          },
          {
            _key: "b2-28", _type: "block", style: "normal",
            children: [{ _key: "s2-28", _type: "span", text: "  2. Janpad Panchayat / Panchayat Samiti (at the Block/Intermediate Level)" }],
          },
          {
            _key: "b2-29", _type: "block", style: "normal",
            children: [{ _key: "s2-29", _type: "span", text: "  3. Zila Panchayat (at the District Level)" }],
          },
          {
            _key: "b2-30", _type: "block", style: "normal",
            children: [{ _key: "s2-30", _type: "span", text: "• Special Fact: Madhya Pradesh was the first state in India to implement and conduct elections under the 73rd Amendment framework." }],
          },
        ],
      },

      /* ── 3. 74th Amendment ───────────────────────────────────── */
      {
        _key: "sec-74th-details",
        kind: "background",
        title: "74वाँ संविधान संशोधन अधिनियम, 1992 (शहरी स्थानीय निकाय)",
        titleEn: "74th Constitutional Amendment Act, 1992 (Urban Local Bodies)",
        body: [
          {
            _key: "b3-1", _type: "block", style: "normal",
            children: [{ _key: "s3-1", _type: "span", text: "• ऐतिहासिक पृष्ठभूमि व महत्वपूर्ण तिथियाँ:" }],
          },
          {
            _key: "b3-2", _type: "block", style: "normal",
            children: [{ _key: "s3-2", _type: "span", text: "  - लोकसभा से पारित: 22 दिसंबर 1992" }],
          },
          {
            _key: "b3-3", _type: "block", style: "normal",
            children: [{ _key: "s3-3", _type: "span", text: "  - राज्यसभा से पारित: 23 दिसंबर 1992" }],
          },
          {
            _key: "b3-4", _type: "block", style: "normal",
            children: [{ _key: "s3-4", _type: "span", text: "  - राष्ट्रपति की स्वीकृति: 20 अप्रैल 1993" }],
          },
          {
            _key: "b3-5", _type: "block", style: "normal",
            children: [{ _key: "s3-5", _type: "span", text: "  - अधिनियम लागू होने की तिथि: 1 जून 1993" }],
          },
          {
            _key: "b3-img", _type: "image",
            asset: { _type: "reference", _ref: assetMunicipal._id },
            alt: "A modern Municipal Corporation (Nagar Nigam) building representing urban local governance and smart city planning",
          },
          {
            _key: "b3-6", _type: "block", style: "normal",
            children: [{ _key: "s3-6", _type: "span", text: "• प्रमुख संवैधानिक प्रावधान:" }],
          },
          {
            _key: "b3-7", _type: "block", style: "normal",
            children: [{ _key: "s3-7", _type: "span", text: "  - संविधान में नया भाग-IXA (Part IXA) जोड़ा गया।" }],
          },
          {
            _key: "b3-8", _type: "block", style: "normal",
            children: [{ _key: "s3-8", _type: "span", text: "  - इसके तहत अनुच्छेद 243P से 243ZG (Articles 243P-243ZG) जोड़े गए।" }],
          },
          {
            _key: "b3-9", _type: "block", style: "normal",
            children: [{ _key: "s3-9", _type: "span", text: "  - संविधान में 12वीं अनुसूची (12th Schedule) जोड़ी गई, जिसमें नगर निकायों को 18 कार्यक्षेत्र विषय (18 Functional Subjects) सौंपे गए।" }],
          },
          {
            _key: "b3-10", _type: "block", style: "normal",
            children: [{ _key: "s3-10", _type: "span", text: "• शहरी निकायों का त्रिस्तरीय वर्गीकरण:" }],
          },
          {
            _key: "b3-11", _type: "block", style: "normal",
            children: [{ _key: "s3-11", _type: "span", text: "  1. नगर पंचायत (ग्रामीण से शहरी क्षेत्र में संक्रमणशील क्षेत्रों के लिए)" }],
          },
          {
            _key: "b3-12", _type: "block", style: "normal",
            children: [{ _key: "s3-12", _type: "span", text: "  2. नगर पालिका परिषद (छोटे शहरी क्षेत्रों के लिए)" }],
          },
          {
            _key: "b3-13", _type: "block", style: "normal",
            children: [{ _key: "s3-13", _type: "span", text: "  3. नगर निगम (बड़े महानगरीय/शहरी क्षेत्रों के लिए)" }],
          },
        ],
        bodyEn: [
          {
            _key: "b3-14", _type: "block", style: "normal",
            children: [{ _key: "s3-14", _type: "span", text: "• Historical Timeline & Dates:" }],
          },
          {
            _key: "b3-15", _type: "block", style: "normal",
            children: [{ _key: "s3-15", _type: "span", text: "  - Passed by Lok Sabha: December 22, 1992" }],
          },
          {
            _key: "b3-16", _type: "block", style: "normal",
            children: [{ _key: "s3-16", _type: "span", text: "  - Passed by Rajya Sabha: December 23, 1992" }],
          },
          {
            _key: "b3-17", _type: "block", style: "normal",
            children: [{ _key: "s3-17", _type: "span", text: "  - Presidential Assent: April 20, 1993" }],
          },
          {
            _key: "b3-18", _type: "block", style: "normal",
            children: [{ _key: "s3-18", _type: "span", text: "  - Date of Commencement: June 1, 1993" }],
          },
          {
            _key: "b3-img-en", _type: "image",
            asset: { _type: "reference", _ref: assetMunicipal._id },
            alt: "A modern Municipal Corporation (Nagar Nigam) building representing urban local governance and smart city planning",
          },
          {
            _key: "b3-19", _type: "block", style: "normal",
            children: [{ _key: "s3-19", _type: "span", text: "• Constitutional Features:" }],
          },
          {
            _key: "b3-20", _type: "block", style: "normal",
            children: [{ _key: "s3-20", _type: "span", text: "  - Added Part-IXA (Part IXA) to the Constitution of India." }],
          },
          {
            _key: "b3-21", _type: "block", style: "normal",
            children: [{ _key: "s3-21", _type: "span", text: "  - Inserted Articles 243P to 243ZG." }],
          },
          {
            _key: "b3-22", _type: "block", style: "normal",
            children: [{ _key: "s3-22", _type: "span", text: "  - Added the 12th Schedule containing 18 functional subjects for urban governance." }],
          },
          {
            _key: "b3-23", _type: "block", style: "normal",
            children: [{ _key: "s3-23", _type: "span", text: "• Three-Tier Classification of ULBs:" }],
          },
          {
            _key: "b3-24", _type: "block", style: "normal",
            children: [{ _key: "s3-24", _type: "span", text: "  1. Nagar Panchayat (for transitional areas from rural to urban)" }],
          },
          {
            _key: "b3-25", _type: "block", style: "normal",
            children: [{ _key: "s3-25", _type: "span", text: "  2. Municipal Council / Nagar Palika (for smaller urban areas)" }],
          },
          {
            _key: "b3-26", _type: "block", style: "normal",
            children: [{ _key: "s3-26", _type: "span", text: "  3. Municipal Corporation / Nagar Nigam (for larger urban areas)" }],
          },
        ],
      },

      /* ── 4. Comparison ───────────────────────────────────────── */
      {
        _key: "sec-comparison",
        kind: "keyHighlights",
        title: "73वें एवं 74वें संशोधन में तुलनात्मक अंतर",
        titleEn: "Comparison between 73rd and 74th Amendments",
        body: [
          {
            _key: "b4-1", _type: "block", style: "normal",
            children: [{ _key: "s4-1", _type: "span", text: "• 73वाँ संविधान संशोधन (ग्रामीण स्थानीय स्वशासन):" }],
          },
          {
            _key: "b4-2", _type: "block", style: "normal",
            children: [{ _key: "s4-2", _type: "span", text: "  - शासन प्रकार: ग्रामीण स्थानीय स्वशासन (Panchayati Raj)" }],
          },
          {
            _key: "b4-3", _type: "block", style: "normal",
            children: [{ _key: "s4-3", _type: "span", text: "  - जोड़ा गया भाग: भाग-IX" }],
          },
          {
            _key: "b4-4", _type: "block", style: "normal",
            children: [{ _key: "s4-4", _type: "span", text: "  - जोड़ी गई अनुसूची: 11वीं अनुसूची" }],
          },
          {
            _key: "b4-5", _type: "block", style: "normal",
            children: [{ _key: "s4-5", _type: "span", text: "  - कुल कार्यक्षेत्र विषय: 29 विषय (जैसे कृषि, पेयजल, भूमि सुधार)" }],
          },
          {
            _key: "b4-6", _type: "block", style: "normal",
            children: [{ _key: "s4-6", _type: "span", text: "• 74वाँ संविधान संशोधन (नगरीय स्थानीय स्वशासन):" }],
          },
          {
            _key: "b4-7", _type: "block", style: "normal",
            children: [{ _key: "s4-7", _type: "span", text: "  - शासन प्रकार: नगरीय स्थानीय स्वशासन (Municipalities)" }],
          },
          {
            _key: "b4-8", _type: "block", style: "normal",
            children: [{ _key: "s4-8", _type: "span", text: "  - जोड़ा गया भाग: भाग-IXA" }],
          },
          {
            _key: "b4-9", _type: "block", style: "normal",
            children: [{ _key: "s4-9", _type: "span", text: "  - जोड़ी गई अनुसूची: 12वीं अनुसूची" }],
          },
          {
            _key: "b4-10", _type: "block", style: "normal",
            children: [{ _key: "s4-10", _type: "span", text: "  - कुल कार्यक्षेत्र विषय: 18 विषय (जैसे शहरी नियोजन, सड़कें, जल आपूर्ति)" }],
          },
        ],
        bodyEn: [
          {
            _key: "b4-11", _type: "block", style: "normal",
            children: [{ _key: "s4-11", _type: "span", text: "• 73rd Amendment (Rural Governance):" }],
          },
          {
            _key: "b4-12", _type: "block", style: "normal",
            children: [{ _key: "s4-12", _type: "span", text: "  - Governance Type: Rural local self-government (Panchayati Raj)" }],
          },
          {
            _key: "b4-13", _type: "block", style: "normal",
            children: [{ _key: "s4-13", _type: "span", text: "  - Added Part: Part-IX" }],
          },
          {
            _key: "b4-14", _type: "block", style: "normal",
            children: [{ _key: "s4-14", _type: "span", text: "  - Added Schedule: 11th Schedule" }],
          },
          {
            _key: "b4-15", _type: "block", style: "normal",
            children: [{ _key: "s4-15", _type: "span", text: "  - Number of subjects: 29 functional areas (e.g., agriculture, sanitation, rural housing)" }],
          },
          {
            _key: "b4-16", _type: "block", style: "normal",
            children: [{ _key: "s4-16", _type: "span", text: "• 74th Amendment (Urban Governance):" }],
          },
          {
            _key: "b4-17", _type: "block", style: "normal",
            children: [{ _key: "s4-17", _type: "span", text: "  - Governance Type: Urban local self-government (Municipalities)" }],
          },
          {
            _key: "b4-18", _type: "block", style: "normal",
            children: [{ _key: "s4-18", _type: "span", text: "  - Added Part: Part-IXA" }],
          },
          {
            _key: "b4-19", _type: "block", style: "normal",
            children: [{ _key: "s4-19", _type: "span", text: "  - Added Schedule: 12th Schedule" }],
          },
          {
            _key: "b4-20", _type: "block", style: "normal",
            children: [{ _key: "s4-20", _type: "span", text: "  - Number of subjects: 18 functional areas (e.g., urban planning, fire services, public health)" }],
          },
        ],
      },

      /* ── 5. Tricks & Articles ────────────────────────────────── */
      {
        _key: "sec-tricks",
        kind: "factsAtAGlance",
        title: "याद रखने की शॉर्ट ट्रिक व महत्वपूर्ण अनुच्छेद",
        titleEn: "Memory Shortcut & Important Articles",
        body: [
          {
            _key: "b5-1", _type: "block", style: "normal",
            children: [{ _key: "s5-1", _type: "span", text: "• याद रखने की ट्रिक (Memory Trick):" }],
          },
          {
            _key: "b5-2", _type: "block", style: "normal",
            children: [{ _key: "s5-2", _type: "span", text: "  \"11-29 गाँव, 12-18 शहर\"" }],
          },
          {
            _key: "b5-3", _type: "block", style: "normal",
            children: [{ _key: "s5-3", _type: "span", text: "  - 11वीं अनुसूची = 29 विषय = ग्रामीण पंचायत" }],
          },
          {
            _key: "b5-4", _type: "block", style: "normal",
            children: [{ _key: "s5-4", _type: "span", text: "  - 12वीं अनुसूची = 18 विषय = शहरी नगर निकाय" }],
          },
          {
            _key: "b5-5", _type: "block", style: "normal",
            children: [{ _key: "s5-5", _type: "span", text: "• परीक्षा में बार-बार पूछे जाने वाले अनुच्छेद:" }],
          },
          {
            _key: "b5-6", _type: "block", style: "normal",
            children: [{ _key: "s5-6", _type: "span", text: "  - अनुच्छेद 243A: ग्राम सभा (Gram Sabha)" }],
          },
          {
            _key: "b5-7", _type: "block", style: "normal",
            children: [{ _key: "s5-7", _type: "span", text: "  - अनुच्छेद 243B: पंचायतों का गठन (Constitution of Panchayats)" }],
          },
          {
            _key: "b5-8", _type: "block", style: "normal",
            children: [{ _key: "s5-8", _type: "span", text: "  - अनुच्छेद 243D: सीटों का आरक्षण (Reservation of Seats) - महिलाओं के लिए 1/3 सीटों का आरक्षण अनिवार्य।" }],
          },
          {
            _key: "b5-9", _type: "block", style: "normal",
            children: [{ _key: "s5-9", _type: "span", text: "  - अनुच्छेद 243I: राज्य वित्त आयोग (State Finance Commission) का गठन।" }],
          },
          {
            _key: "b5-10", _type: "block", style: "normal",
            children: [{ _key: "s5-10", _type: "span", text: "  - अनुच्छेद 243K: राज्य निर्वाचन आयोग (State Election Commission) का गठन।" }],
          },
        ],
        bodyEn: [
          {
            _key: "b5-11", _type: "block", style: "normal",
            children: [{ _key: "s5-11", _type: "span", text: "• Memory Hack:" }],
          },
          {
            _key: "b5-12", _type: "block", style: "normal",
            children: [{ _key: "s5-12", _type: "span", text: "  \"11-29 Village, 12-18 Town\"" }],
          },
          {
            _key: "b5-13", _type: "block", style: "normal",
            children: [{ _key: "s5-13", _type: "span", text: "  - 11th Schedule = 29 Subjects = Rural Panchayat" }],
          },
          {
            _key: "b5-14", _type: "block", style: "normal",
            children: [{ _key: "s5-14", _type: "span", text: "  - 12th Schedule = 18 Subjects = Urban Municipalities" }],
          },
          {
            _key: "b5-15", _type: "block", style: "normal",
            children: [{ _key: "s5-15", _type: "span", text: "• Most Important Articles for Exams:" }],
          },
          {
            _key: "b5-16", _type: "block", style: "normal",
            children: [{ _key: "s5-16", _type: "span", text: "  - Article 243A: Gram Sabha" }],
          },
          {
            _key: "b5-17", _type: "block", style: "normal",
            children: [{ _key: "s5-17", _type: "span", text: "  - Article 243B: Constitution of Panchayats" }],
          },
          {
            _key: "b5-18", _type: "block", style: "normal",
            children: [{ _key: "s5-18", _type: "span", text: "  - Article 243D: Reservation of Seats (Mandatory 1/3rd seats for women)" }],
          },
          {
            _key: "b5-19", _type: "block", style: "normal",
            children: [{ _key: "s5-19", _type: "span", text: "  - Article 243I: State Finance Commission" }],
          },
          {
            _key: "b5-20", _type: "block", style: "normal",
            children: [{ _key: "s5-20", _type: "span", text: "  - Article 243K: State Election Commission" }],
          },
        ],
      },
    ],

    /* ─── MCQs ──────────────────────────────────────────────── */
    mcqs: [
      {
        question: "73वें संविधान संशोधन द्वारा संविधान में कौन-सा भाग जोड़ा गया?",
        questionEn: "Which Part was added to the Constitution by the 73rd Constitutional Amendment Act?",
        options: ["भाग VIII", "भाग IX", "भाग IX-A", "भाग X"],
        optionsEn: ["Part VIII", "Part IX", "Part IX-A", "Part X"],
        correctIndex: 1,
        explanation: "73वें संविधान संशोधन, 1992 द्वारा संविधान में भाग IX (Part IX) जोड़ा गया, जो पंचायती राज संस्थाओं से संबंधित है।",
        explanationEn: "Part IX was added to the Constitution by the 73rd Constitutional Amendment, dealing with Panchayati Raj."
      },
      {
        question: "74वें संविधान संशोधन द्वारा कौन-सी अनुसूची जोड़ी गई?",
        questionEn: "Which Schedule was added by the 74th Constitutional Amendment Act?",
        options: ["10वीं", "11वीं", "12वीं", "13वीं"],
        optionsEn: ["10th", "11th", "12th", "13th"],
        correctIndex: 2,
        explanation: "74वें संविधान संशोधन द्वारा संविधान में 12वीं अनुसूची जोड़ी गई, जो नगर निकायों (Municipalities) से संबंधित है।",
        explanationEn: "The 12th Schedule was added to the Constitution by the 74th Amendment, relating to urban local bodies."
      },
      {
        question: "11वीं अनुसूची में कितने विषय शामिल हैं?",
        questionEn: "How many functional subjects are included in the 11th Schedule?",
        options: ["18", "22", "29", "32"],
        optionsEn: ["18", "22", "29", "32"],
        correctIndex: 2,
        explanation: "11वीं अनुसूची में पंचायतों को सौंपे गए कुल 29 विषय शामिल किए गए हैं।",
        explanationEn: "The 11th Schedule contains 29 functional subjects assigned to rural Panchayats."
      },
      {
        question: "नगर निकायों से संबंधित विषय किस अनुसूची में हैं?",
        questionEn: "Under which Schedule are the subjects relating to urban local bodies listed?",
        options: ["10वीं", "11वीं", "12वीं", "9वीं"],
        optionsEn: ["10th", "11th", "12th", "9th"],
        correctIndex: 2,
        explanation: "शहरी स्थानीय निकायों (नगर निकायों) के लिए 18 कार्यक्षेत्र विषयों का उल्लेख संविधान की 12वीं अनुसूची में है।",
        explanationEn: "The 18 functional subjects of urban local bodies are listed in the 12th Schedule."
      },
      {
        question: "राष्ट्रीय पंचायती राज दिवस कब मनाया जाता है?",
        questionEn: "When is National Panchayati Raj Day celebrated in India?",
        options: ["20 अप्रैल", "24 अप्रैल", "1 जून", "26 जनवरी"],
        optionsEn: ["April 20", "April 24", "June 1", "January 26"],
        correctIndex: 1,
        explanation: "73वाँ संविधान संशोधन 24 अप्रैल 1993 से लागू हुआ था, इसलिए प्रतिवर्ष 24 अप्रैल को राष्ट्रीय पंचायती राज दिवस मनाया जाता है।",
        explanationEn: "Since the 73rd Amendment came into force on April 24, 1993, April 24 is observed as National Panchayati Raj Day annually."
      },
      {
        question: "73वें और 74वें संविधान संशोधन के संबंध में निम्न कथनों पर विचार कीजिए:\n1. 73वें संविधान संशोधन द्वारा पंचायती राज संस्थाओं को संवैधानिक दर्जा दिया गया।\n2. 74वें संविधान संशोधन द्वारा 12वीं अनुसूची जोड़ी गई।",
        questionEn: "Consider the following statements regarding the 73rd and 74th Amendments:\n1. The 73rd Amendment gave constitutional status to Panchayati Raj institutions.\n2. The 74th Amendment added the 12th Schedule to the Constitution.",
        options: ["केवल 1 सही है", "केवल 2 सही है", "दोनों सही हैं", "दोनों गलत हैं"],
        optionsEn: ["Only 1 is correct", "Only 2 is correct", "Both are correct", "Both are incorrect"],
        correctIndex: 2,
        explanation: "कथन 1 और 2 दोनों सत्य हैं। 73वें संशोधन से भाग IX व 11वीं अनुसूची जोड़कर पंचायतों को और 74वें संशोधन से भाग IXA व 12वीं अनुसूची जोड़कर नगर निकायों को संवैधानिक मान्यता दी गई।",
        explanationEn: "Both statements 1 and 2 are correct. The 73rd Amendment recognized Panchayats (Part IX, 11th Schedule) and the 74th recognized urban local bodies (Part IXA, 12th Schedule)."
      }
    ],

    /* ─── FAQs ──────────────────────────────────────────────── */
    faqs: [
      {
        question: "73वें और 74वें संविधान संशोधन के समय भारत के प्रधानमंत्री कौन थे?",
        questionEn: "Who was the Prime Minister of India when the 73rd and 74th Amendments were passed?",
        answer: "इन दोनों संविधान संशोधनों के पारित होने के समय पी. वी. नरसिम्हा राव भारत के प्रधानमंत्री थे और राष्ट्रपति डॉ. शंकर दयाल शर्मा थे।",
        answerEn: "P. V. Narasimha Rao was the Prime Minister of India and Dr. Shankar Dayal Sharma was the President when these amendments were enacted."
      },
      {
        question: "11वीं और 12वीं अनुसूची में कुल कितने-कितने विषय हैं?",
        questionEn: "How many functional subjects are in the 11th and 12th Schedules?",
        answer: "11वीं अनुसूची (पंचायती राज) में कुल 29 विषय हैं, जबकि 12वीं अनुसूची (नगरीय निकाय) में कुल 18 विषय शामिल हैं।",
        answerEn: "There are 29 functional subjects in the 11th Schedule (Panchayati Raj) and 18 subjects in the 12th Schedule (Municipalities)."
      }
    ],

    /* ─── Sources ────────────────────────────────────────────── */
    sources: [
      { label: "Constitution of India, Ministry of Law and Justice", url: "https://legislative.gov.in/constitution-of-india" },
      { label: "Ministry of Panchayati Raj, Government of India", url: "https://panchayat.gov.in" },
      { label: "Ministry of Housing and Urban Affairs", url: "https://mohua.gov.in" }
    ]
  };

  try {
    await client.createOrReplace(article);
    console.log("✨ Successfully uploaded 73rd and 74th Amendments Static GK Article to Sanity!");
  } catch (err) {
    console.error("❌ Failed to create/replace document in Sanity:", err);
  }
}

main().catch((err) => {
  console.error("❌ Error running script:", err);
  process.exit(1);
});
