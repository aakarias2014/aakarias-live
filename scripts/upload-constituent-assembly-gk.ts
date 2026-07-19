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
  console.log("🚀 Starting upload process for Constituent Assembly Static GK Article...");

  // Image file paths in public/images/blog/
  const imagePaths = {
    hall: path.resolve(process.cwd(), "public/images/blog/constituent-assembly-1.png"),
    ambedkar: path.resolve(process.cwd(), "public/images/blog/constituent-assembly-2.png"),
    preamble: path.resolve(process.cwd(), "public/images/blog/constituent-assembly-3.png"),
  };

  // Check if files exist
  if (!fs.existsSync(imagePaths.hall) || !fs.existsSync(imagePaths.ambedkar) || !fs.existsSync(imagePaths.preamble)) {
    console.error("❌ Required images not found in public/images/blog/");
    process.exit(1);
  }

  // 1. Upload Hall Image
  console.log("📸 Uploading assembly hall image...");
  const assetHall = await client.assets.upload("image", fs.createReadStream(imagePaths.hall), {
    filename: "constituent_assembly_hall.png",
  });
  console.log(`✔ Uploaded hall image. Asset ID: ${assetHall._id}`);

  // 2. Upload Ambedkar Image
  console.log("📸 Uploading Ambedkar image...");
  const assetAmbedkar = await client.assets.upload("image", fs.createReadStream(imagePaths.ambedkar), {
    filename: "dr_ambedkar_constitution.png",
  });
  console.log(`✔ Uploaded Ambedkar image. Asset ID: ${assetAmbedkar._id}`);

  // 3. Upload Preamble Image
  console.log("📸 Uploading Preamble image...");
  const assetPreamble = await client.assets.upload("image", fs.createReadStream(imagePaths.preamble), {
    filename: "preamble_decorated.png",
  });
  console.log(`✔ Uploaded Preamble image. Asset ID: ${assetPreamble._id}`);

  // 4. Construct the Article document
  const article = {
    _id: "gk-constituent-assembly-of-india",
    _type: "staticGk",
    slug: { _type: "slug", current: "constituent-assembly-of-india" },
    title: "संविधान सभा: भारतीय संविधान का निर्माण, महत्वपूर्ण तथ्य एवं प्रमुख व्यक्तित्व",
    titleEn: "Constituent Assembly of India: Making of the Constitution, Facts & Personalities",
    excerpt: "संविधान सभा का गठन, विभाजन के बाद सदस्यों की संख्या, प्रारूप समिति, प्रमुख महिला सदस्य और संविधान निर्माण की पूरी यात्रा पर आधारित महत्वपूर्ण तथ्य एवं वन-लाइनर रिवीजन।",
    excerptEn: "A comprehensive guide to the formation, composition, committees, key office-bearers, prominent women members, and calligraphers of the Constituent Assembly of India.",
    ca_date: "2026-07-08",
    publishedAt: new Date().toISOString(),
    featured: true,
    readingTime: 6,
    keywords: [
      "Constituent Assembly",
      "Making of Indian Constitution",
      "Cabinet Mission 1946",
      "Dr. B.R. Ambedkar",
      "Drafting Committee",
      "15 Women of Constituent Assembly",
      "Calligraphy of Constitution",
      "संविधान सभा",
      "संविधान निर्माण",
      "कैबिनेट मिशन",
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
      asset: { _type: "reference", _ref: assetHall._id },
      alt: "Chamber of the Constituent Assembly of India in 1946 showing delegates seated in semicircular benches",
    },

    /* ─── SECTIONS ──────────────────────────────────────────────── */
    sections: [
      /* ── 1. Why in News / Context ────────────────────────────── */
      {
        _key: "sec-why-important",
        kind: "whyInNews",
        title: "परीक्षा में क्यों महत्वपूर्ण?",
        titleEn: "Why is it Important in Exams?",
        body: [
          {
            _key: "b1-1", _type: "block", style: "normal",
            children: [{ _key: "s1-1", _type: "span", text: "भारतीय संविधान का निर्माण संविधान सभा (Constituent Assembly) द्वारा किया गया था। लोक सेवा आयोग परीक्षाओं (MPPSC, UPSC) के साथ-साथ SSC, Railway और Banking जैसी अन्य प्रतियोगी परीक्षाओं में संविधान सभा के गठन, बैठकों, सदस्यों की संख्या, प्रारूप समिति और इसके प्रमुख पदाधिकारियों से संबंधित तथ्य बार-बार पूछे जाते हैं।" }],
          },
        ],
        bodyEn: [
          {
            _key: "b1-2", _type: "block", style: "normal",
            children: [{ _key: "s1-2", _type: "span", text: "The Indian Constitution was drafted by the Constituent Assembly. Facts regarding its formation, composition, timeline of meetings, drafting committees, and key office bearers are frequently asked in UPSC, MPPSC, SSC, and other competitive examinations." }],
          },
        ],
      },

      /* ── 2. Assembly Formation & Dates ───────────────────────── */
      {
        _key: "sec-assembly-formation",
        kind: "background",
        title: "संविधान सभा का गठन एवं प्रमुख तिथियाँ",
        titleEn: "Formation of the Constituent Assembly & Key Dates",
        body: [
          {
            _key: "b2-1", _type: "block", style: "normal",
            children: [{ _key: "s2-1", _type: "span", text: "• गठन का आधार: कैबिनेट मिशन योजना, 1946 (Cabinet Mission Plan, 1946)" }],
          },
          {
            _key: "b2-2", _type: "block", style: "normal",
            children: [{ _key: "s2-2", _type: "span", text: "• प्रथम बैठक: 9 दिसंबर 1946 (संसद भवन के केंद्रीय कक्ष में)" }],
          },
          {
            _key: "b2-3", _type: "block", style: "normal",
            children: [{ _key: "s2-3", _type: "span", text: "• संविधान अंगीकृत (Adopted): 26 नवंबर 1949 (इस दिन संविधान पूर्णतः बनकर तैयार हुआ और इसीलिए प्रतिवर्ष 26 नवंबर को 'संविधान दिवस' मनाया जाता है)" }],
          },
          {
            _key: "b2-4", _type: "block", style: "normal",
            children: [{ _key: "s2-4", _type: "span", text: "• अंतिम बैठक: 24 जनवरी 1950 (इसी दिन सदस्यों ने संविधान पर हस्ताक्षर किए)" }],
          },
          {
            _key: "b2-5", _type: "block", style: "normal",
            children: [{ _key: "s2-5", _type: "span", text: "• संविधान लागू होने की तिथि: 26 जनवरी 1950 (इसी दिन से भारत एक गणतंत्र बना)" }],
          },
        ],
        bodyEn: [
          {
            _key: "b2-6", _type: "block", style: "normal",
            children: [{ _key: "s2-6", _type: "span", text: "• Basis of Formation: Cabinet Mission Plan (1946)" }],
          },
          {
            _key: "b2-7", _type: "block", style: "normal",
            children: [{ _key: "s2-7", _type: "span", text: "• First Meeting: December 9, 1946 (in the Central Hall of Parliament)" }],
          },
          {
            _key: "b2-8", _type: "block", style: "normal",
            children: [{ _key: "s2-8", _type: "span", text: "• Adoption of the Constitution: November 26, 1949 (Celebrated as 'Constitution Day' or 'Samvidhan Diwas' in India)" }],
          },
          {
            _key: "b2-9", _type: "block", style: "normal",
            children: [{ _key: "s2-9", _type: "span", text: "• Final Session: January 24, 1950 (Members signed the official manuscript copies)" }],
          },
          {
            _key: "b2-10", _type: "block", style: "normal",
            children: [{ _key: "s2-10", _type: "span", text: "• Date of Commencement: January 26, 1950 (Commemorated as Republic Day)" }],
          },
        ],
      },

      /* ── 3. Membership & Women ───────────────────────────────── */
      {
        _key: "sec-membership",
        kind: "keyAspects",
        title: "संविधान सभा की सदस्य संख्या एवं महिला प्रतिनिधित्व",
        titleEn: "Composition of the Constituent Assembly & Women Representation",
        body: [
          {
            _key: "b3-1", _type: "block", style: "normal",
            children: [{ _key: "s3-1", _type: "span", text: "• प्रारंभिक कुल सदस्य संख्या (अविभाजित भारत में): 389 सदस्य" }],
          },
          {
            _key: "b3-2", _type: "block", style: "normal",
            children: [{ _key: "s3-2", _type: "span", text: "  - ब्रिटिश प्रांतों से: 292 सदस्य" }],
          },
          {
            _key: "b3-3", _type: "block", style: "normal",
            children: [{ _key: "s3-3", _type: "span", text: "  - देशी रियासतों (Princely States) से: 93 सदस्य" }],
          },
          {
            _key: "b3-4", _type: "block", style: "normal",
            children: [{ _key: "s3-4", _type: "span", text: "  - मुख्य आयुक्त प्रांतों (Chief Commissioner Provinces) से: 4 सदस्य" }],
          },
          {
            _key: "b3-5", _type: "block", style: "normal",
            children: [{ _key: "s3-5", _type: "span", text: "• विभाजन के बाद सदस्य संख्या (299 सदस्य): भारत-पाकिस्तान विभाजन के कारण मुस्लिम लीग के सदस्य हट जाने से संख्या 299 रह गई।" }],
          },
          {
            _key: "b3-6", _type: "block", style: "normal",
            children: [{ _key: "s3-6", _type: "span", text: "• महिला सदस्य (15): संविधान सभा में कुल 15 महिला सदस्य थीं, जिन्होंने राष्ट्र निर्माण में अमूल्य योगदान दिया। प्रमुख नाम निम्नलिखित हैं:" }],
          },
          {
            _key: "b3-7", _type: "block", style: "normal",
            children: [{ _key: "s3-7", _type: "span", text: "  - सरोजिनी नायडू, सुचेता कृपलानी, विजयलक्ष्मी पंडित, राजकुमारी अमृत कौर (भारत की प्रथम स्वास्थ्य मंत्री), हंसा मेहता, बेगम एजाज रसूल (संविधान सभा में एकमात्र मुस्लिम महिला सदस्य), दक्षायनी वेलायुधन (एकमात्र दलित महिला प्रतिनिधि), दुर्गाबाई देशमुख, अम्मू स्वामीनाथन, एनी मास्करीन, कमला चौधरी, लीला रॉय, मालती चौधरी, पूर्णिमा बनर्जी, और रेणुका राय।" }],
          },
        ],
        bodyEn: [
          {
            _key: "b3-8", _type: "block", style: "normal",
            children: [{ _key: "s3-8", _type: "span", text: "• Initial Strength (Before Partition): 389 Members" }],
          },
          {
            _key: "b3-9", _type: "block", style: "normal",
            children: [{ _key: "s3-9", _type: "span", text: "  - From British Provinces: 292 members" }],
          },
          {
            _key: "b3-10", _type: "block", style: "normal",
            children: [{ _key: "s3-10", _type: "span", text: "  - From Princely States: 93 members" }],
          },
          {
            _key: "b3-11", _type: "block", style: "normal",
            children: [{ _key: "s3-11", _type: "span", text: "  - From Chief Commissioner's Provinces: 4 members" }],
          },
          {
            _key: "b3-12", _type: "block", style: "normal",
            children: [{ _key: "s3-12", _type: "span", text: "• Post-Partition Strength (299 Members): Reduced from 389 following the withdrawal of Muslim League representatives." }],
          },
          {
            _key: "b3-13", _type: "block", style: "normal",
            children: [{ _key: "s3-13", _type: "span", text: "• Women Representation (15 Members): A total of 15 women were part of the assembly. Key figures include:" }],
          },
          {
            _key: "b3-14", _type: "block", style: "normal",
            children: [{ _key: "s3-14", _type: "span", text: "  - Sarojini Naidu, Sucheta Kripalani, Vijaya Lakshmi Pandit, Rajkumari Amrit Kaur (first health minister), Hansa Mehta, Begum Aizaz Rasul (the only Muslim woman member), Dakshayani Velayudhan (the only Dalit woman member), Durgabai Deshmukh, Ammu Swaminathan, Annie Mascarene, Kamla Chaudhry, Leela Roy, Malati Choudhury, Purnima Banerjee, and Renuka Ray." }],
          },
        ],
      },

      /* ── 4. Key Office Bearers ───────────────────────────────── */
      {
        _key: "sec-office-bearers",
        kind: "keyHighlights",
        title: "संविधान सभा के प्रमुख पदाधिकारी एवं समितियाँ",
        titleEn: "Key Office Bearers & Committees of the Assembly",
        body: [
          {
            _key: "b4-1", _type: "block", style: "normal",
            children: [{ _key: "s4-1", _type: "span", text: "• अस्थायी अध्यक्ष (Temporary President): डॉ. सच्चिदानंद सिन्हा (9 दिसंबर 1946 की पहली बैठक में फ्रांस की प्रथा के अनुसार सबसे वरिष्ठ सदस्य होने के नाते चुने गए)" }],
          },
          {
            _key: "b4-2", _type: "block", style: "normal",
            children: [{ _key: "s4-2", _type: "span", text: "• स्थायी अध्यक्ष (Permanent President): डॉ. राजेन्द्र प्रसाद (11 दिसंबर 1946 को निर्वाचित)" }],
          },
          {
            _key: "b4-3", _type: "block", style: "normal",
            children: [{ _key: "s4-3", _type: "span", text: "• अस्थायी उपाध्यक्ष: फ्रैंक एंथोनी | स्थायी उपाध्यक्ष: एच. सी. मुखर्जी" }],
          },
          {
            _key: "b4-4", _type: "block", style: "normal",
            children: [{ _key: "s4-4", _type: "span", text: "• संवैधानिक सलाहकार (Constitutional Advisor): सर बी. एन. राव (सर बेनेगल नरसिंह राव)" }],
          },
          {
            _key: "b4-img", _type: "image",
            asset: { _type: "reference", _ref: assetAmbedkar._id },
            alt: "A detailed scholarly portrait of Dr. B. R. Ambedkar sitting at a desk with the Indian Constitution book",
          },
          {
            _key: "b4-5", _type: "block", style: "normal",
            children: [{ _key: "s4-5", _type: "span", text: "• प्रारूप समिति (Drafting Committee) के अध्यक्ष: डॉ. भीमराव अम्बेडकर (गठन: 29 अगस्त 1947, कुल सदस्य: 7)" }],
          },
          {
            _key: "b4-6", _type: "block", style: "normal",
            children: [{ _key: "s4-6", _type: "span", text: "• संविधान सभा के सचिव (Secretary): एच. वी. आर. अयंगर" }],
          },
          {
            _key: "b4-7", _type: "block", style: "normal",
            children: [{ _key: "s4-7", _type: "span", text: "• मुख्य प्रारूपकार (Chief Draftsman): एस. एन. मुखर्जी" }],
          },
        ],
        bodyEn: [
          {
            _key: "b4-8", _type: "block", style: "normal",
            children: [{ _key: "s4-8", _type: "span", text: "• Temporary President: Dr. Sachchidananda Sinha (Chosen on Dec 9, 1946, as the oldest member, following the French practice)" }],
          },
          {
            _key: "b4-9", _type: "block", style: "normal",
            children: [{ _key: "s4-9", _type: "span", text: "• Permanent President: Dr. Rajendra Prasad (Elected on Dec 11, 1946)" }],
          },
          {
            _key: "b4-10", _type: "block", style: "normal",
            children: [{ _key: "s4-10", _type: "span", text: "• Vice-Presidents: Frank Anthony (Temporary) | H. C. Mookherjee (Permanent)" }],
          },
          {
            _key: "b4-11", _type: "block", style: "normal",
            children: [{ _key: "s4-11", _type: "span", text: "• Constitutional Advisor: Sir B. N. Rau (Benegal Narsing Rau)" }],
          },
          {
            _key: "b4-img-en", _type: "image",
            asset: { _type: "reference", _ref: assetAmbedkar._id },
            alt: "A detailed scholarly portrait of Dr. B. R. Ambedkar sitting at a desk with the Indian Constitution book",
          },
          {
            _key: "b4-12", _type: "block", style: "normal",
            children: [{ _key: "s4-12", _type: "span", text: "• Chairman of Drafting Committee: Dr. B. R. Ambedkar (Appointed on August 29, 1947; Committee size: 7 members)" }],
          },
          {
            _key: "b4-13", _type: "block", style: "normal",
            children: [{ _key: "s4-13", _type: "span", text: "• Secretary to the Constituent Assembly: H. V. R. Iengar" }],
          },
          {
            _key: "b4-14", _type: "block", style: "normal",
            children: [{ _key: "s4-14", _type: "span", text: "• Chief Draftsman of the Constitution: S. N. Mukherjee" }],
          },
        ],
      },

      /* ── 5. Creation Process, Time & Cost ────────────────────── */
      {
        _key: "sec-creation-process",
        kind: "quickFacts",
        title: "संविधान निर्माण का समय, वाचन एवं लागत",
        titleEn: "Timeline, Readings, and Financial Budget",
        body: [
          {
            _key: "b5-1", _type: "block", style: "normal",
            children: [{ _key: "s5-1", _type: "span", text: "• निर्माण में लगा कुल समय: 2 वर्ष 11 माह 18 दिन" }],
          },
          {
            _key: "b5-2", _type: "block", style: "normal",
            children: [{ _key: "s5-2", _type: "span", text: "• कुल बैठकें (सत्र): 11 सत्र (कुल कार्य दिवस 165 दिन)" }],
          },
          {
            _key: "b5-3", _type: "block", style: "normal",
            children: [{ _key: "s5-3", _type: "span", text: "• संविधान के प्रारूप पर चर्चा: 114 दिन" }],
          },
          {
            _key: "b5-4", _type: "block", style: "normal",
            children: [{ _key: "s5-4", _type: "span", text: "• कुल व्यय (लागत): ₹63,96,729" }],
          },
          {
            _key: "b5-5", _type: "block", style: "normal",
            children: [{ _key: "s5-5", _type: "span", text: "• संविधान सभा का प्रतीक चिन्ह: हाथी (Elephant) को संविधान सभा ने अपने प्रतीक/मोहर के रूप में अपनाया था।" }],
          },
          {
            _key: "b5-6", _type: "block", style: "normal",
            children: [{ _key: "s5-6", _type: "span", text: "• संविधान सभा के तीन वाचन (Readings):" }],
          },
          {
            _key: "b5-7", _type: "block", style: "normal",
            children: [{ _key: "s5-7", _type: "span", text: "  - प्रथम वाचन: 4 नवंबर – 9 नवंबर 1948 (5 दिन)" }],
          },
          {
            _key: "b5-8", _type: "block", style: "normal",
            children: [{ _key: "s5-8", _type: "span", text: "  - द्वितीय वाचन: 15 नवंबर 1948 – 17 अक्टूबर 1949 (10 माह 3 दिन - सबसे लंबा वाचन)" }],
          },
          {
            _key: "b5-9", _type: "block", style: "normal",
            children: [{ _key: "s5-9", _type: "span", text: "  - तृतीय वाचन: 14 नवंबर – 26 नवंबर 1949" }],
          },
        ],
        bodyEn: [
          {
            _key: "b5-10", _type: "block", style: "normal",
            children: [{ _key: "s5-10", _type: "span", text: "• Total Time Taken: 2 years, 11 months, and 18 days" }],
          },
          {
            _key: "b5-11", _type: "block", style: "normal",
            children: [{ _key: "s5-11", _type: "span", text: "• Total Sessions: 11 Sessions (comprising 165 days of active work)" }],
          },
          {
            _key: "b5-12", _type: "block", style: "normal",
            children: [{ _key: "s5-12", _type: "span", text: "• Consideration of Draft Constitution: 114 days" }],
          },
          {
            _key: "b5-13", _type: "block", style: "normal",
            children: [{ _key: "s5-13", _type: "span", text: "• Total Expenditure Incurred: ₹63,96,729" }],
          },
          {
            _key: "b5-14", _type: "block", style: "normal",
            children: [{ _key: "s5-14", _type: "span", text: "• Seal/Symbol of the Assembly: Elephant" }],
          },
          {
            _key: "b5-15", _type: "block", style: "normal",
            children: [{ _key: "s5-15", _type: "span", text: "• Three Readings of the Draft Constitution:" }],
          },
          {
            _key: "b5-16", _type: "block", style: "normal",
            children: [{ _key: "s5-16", _type: "span", text: "  - First Reading: November 4 – November 9, 1948" }],
          },
          {
            _key: "b5-17", _type: "block", style: "normal",
            children: [{ _key: "s5-17", _type: "span", text: "  - Second Reading: November 15, 1948 – October 17, 1949 (longest and most comprehensive)" }],
          },
          {
            _key: "b5-18", _type: "block", style: "normal",
            children: [{ _key: "s5-18", _type: "span", text: "  - Third Reading: November 14 – November 26, 1949" }],
          },
        ],
      },

      /* ── 6. Art & Calligraphy ────────────────────────────────── */
      {
        _key: "sec-calligraphy",
        kind: "importance",
        title: "संविधान का लेखन एवं कलात्मक सज्जा",
        titleEn: "Calligraphy & Artistic Beautification of the Constitution",
        body: [
          {
            _key: "b6-1", _type: "block", style: "normal",
            children: [{ _key: "s6-1", _type: "span", text: "• मूल अंग्रेजी हस्तलिखित लेखक: प्रेम बिहारी नारायण रायज़ादा (इन्होंने सुंदर इटैलिक शैली में मूल अंग्रेजी प्रति को लिखा। इसके लिए उन्होंने कोई शुल्क नहीं लिया, बल्कि हर पृष्ठ पर अपना नाम और अंतिम पृष्ठ पर अपने गुरु व दादा का नाम लिखने की शर्त रखी थी)" }],
          },
          {
            _key: "b6-2", _type: "block", style: "normal",
            children: [{ _key: "s6-2", _type: "span", text: "• मूल हिंदी हस्तलिखित लेखक: बसंत कृष्ण वैद्य (इन्होंने हिंदी संस्करण का हस्तलेखन किया था)" }],
          },
          {
            _key: "b6-img", _type: "image",
            asset: { _type: "reference", _ref: assetPreamble._id },
            alt: "Ornate calligraphic Preamble page of the Constitution of India, showing beautiful gold patterns and painted borders",
          },
          {
            _key: "b6-3", _type: "block", style: "normal",
            children: [{ _key: "s6-3", _type: "span", text: "• कलात्मक सज्जा व चित्रांकन (Decoration & Illustration): शांतिनिकेतन के कलाकारों द्वारा किया गया।" }],
          },
          {
            _key: "b6-4", _type: "block", style: "normal",
            children: [{ _key: "s6-4", _type: "span", text: "  - प्रमुख मार्गदर्शक/कलाकार: नंदलाल बोस (Nandalal Bose)" }],
          },
          {
            _key: "b6-5", _type: "block", style: "normal",
            children: [{ _key: "s6-5", _type: "span", text: "  - प्रस्तावना पृष्ठ का अलंकरण: व्यौहार राममनोहर सिन्हा (Beohar Rammanohar Sinha - इन्होंने अपने हस्ताक्षर 'Ram' के रूप में पृष्ठ पर अंकित किए थे)" }],
          },
        ],
        bodyEn: [
          {
            _key: "b6-6", _type: "block", style: "normal",
            children: [{ _key: "s6-6", _type: "span", text: "• Calligrapher of the Original English Copy: Prem Behari Narain Raizada (Handwrote the entire constitution in beautiful running italic style without charging any fee, on the condition that he sign every page and include his grandfather's name on the final page)" }],
          },
          {
            _key: "b6-7", _type: "block", style: "normal",
            children: [{ _key: "s6-7", _type: "span", text: "• Calligrapher of the Hindi Copy: Vasant Krishnan Vaidya" }],
          },
          {
            _key: "b6-img-en", _type: "image",
            asset: { _type: "reference", _ref: assetPreamble._id },
            alt: "Ornate calligraphic Preamble page of the Constitution of India, showing beautiful gold patterns and painted borders",
          },
          {
            _key: "b6-8", _type: "block", style: "normal",
            children: [{ _key: "s6-8", _type: "span", text: "• Beautification and Illuminations: Executed by artists from Shantiniketan:" }],
          },
          {
            _key: "b6-9", _type: "block", style: "normal",
            children: [{ _key: "s6-9", _type: "span", text: "  - Lead artist: Nandalal Bose" }],
          },
          {
            _key: "b6-10", _type: "block", style: "normal",
            children: [{ _key: "s6-10", _type: "span", text: "  - Preamble Page Illustrator: Beohar Rammanohar Sinha (Signed the page under his nickname 'Ram' in the bottom corner)" }],
          },
        ],
      },
    ],

    /* ─── MCQs ──────────────────────────────────────────────── */
    mcqs: [
      {
        question: "संविधान सभा का गठन किस योजना के आधार पर हुआ था?",
        questionEn: "On the basis of which plan was the Constituent Assembly formed?",
        options: ["माउंटबेटन योजना", "कैबिनेट मिशन योजना", "क्रिप्स मिशन", "वेवेल योजना"],
        optionsEn: ["Mountbatten Plan", "Cabinet Mission Plan", "Cripps Mission", "Wavell Plan"],
        correctIndex: 1,
        explanation: "संविधान सभा का गठन वर्ष 1946 की कैबिनेट मिशन योजना (Cabinet Mission Plan) के प्रस्तावों के आधार पर किया गया था।",
        explanationEn: "The Constituent Assembly was formed in 1946 based on the proposals of the Cabinet Mission Plan."
      },
      {
        question: "संविधान सभा के स्थायी अध्यक्ष कौन थे?",
        questionEn: "Who was the Permanent President of the Constituent Assembly?",
        options: ["डॉ. भीमराव अम्बेडकर", "जवाहरलाल नेहरू", "डॉ. राजेन्द्र प्रसाद", "बी. एन. राव"],
        optionsEn: ["Dr. B. R. Ambedkar", "Jawaharlal Nehru", "Dr. Rajendra Prasad", "B. N. Rau"],
        correctIndex: 2,
        explanation: "11 दिसंबर 1946 को डॉ. राजेन्द्र प्रसाद संविधान सभा के स्थायी अध्यक्ष के रूप में निर्वाचित हुए थे। उनसे पूर्व 9 दिसंबर को पहली बैठक में डॉ. सच्चिदानंद सिन्हा को अस्थायी अध्यक्ष चुना गया था।",
        explanationEn: "On December 11, 1946, Dr. Rajendra Prasad was elected as the Permanent President of the Assembly."
      },
      {
        question: "संविधान सभा में प्रारंभिक कुल सदस्य कितने थे?",
        questionEn: "What was the initial total strength of the Constituent Assembly?",
        options: ["299", "389", "292", "324"],
        optionsEn: ["299", "389", "292", "324"],
        correctIndex: 1,
        explanation: "अविभाजित भारत में संविधान सभा में प्रारंभिक सदस्यों की संख्या 389 निर्धारित की गई थी, जिसमें ब्रिटिश भारत से 292, देशी रियासतों से 93 और मुख्य आयुक्त प्रांतों से 4 सदस्य थे।",
        explanationEn: "The initial strength was set at 389 members, which later reduced to 299 post-partition."
      },
      {
        question: "भारतीय संविधान के प्रारूप समिति (Drafting Committee) के अध्यक्ष कौन थे?",
        questionEn: "Who was the Chairman of the Drafting Committee of the Indian Constitution?",
        options: ["बी. एन. राव", "एच. वी. आर. अयंगर", "डॉ. बी. आर. अम्बेडकर", "के. एम. मुंशी"],
        optionsEn: ["B. N. Rau", "H. V. R. Iengar", "Dr. B. R. Ambedkar", "K. M. Munshi"],
        correctIndex: 2,
        explanation: "डॉ. भीमराव अम्बेडकर 29 अगस्त 1947 को गठित 7-सदस्यीय प्रारूप समिति (Drafting Committee) के अध्यक्ष थे, इसीलिए उन्हें भारतीय संविधान का शिल्पकार कहा जाता है।",
        explanationEn: "Dr. B. R. Ambedkar was the Chairman of the Drafting Committee, established on August 29, 1947."
      },
      {
        question: "भारतीय संविधान को अंगीकृत (Adopt) कब किया गया?",
        questionEn: "When was the Indian Constitution adopted?",
        options: ["15 अगस्त 1947", "26 नवंबर 1949", "24 जनवरी 1950", "26 जनवरी 1950"],
        optionsEn: ["August 15, 1947", "November 26, 1949", "January 24, 1950", "January 26, 1950"],
        correctIndex: 1,
        explanation: "भारतीय संविधान को संविधान सभा द्वारा 26 नवंबर 1949 को अंगीकृत, अधिनियमित और आत्मार्पित किया गया। इसे पूर्ण रूप से 26 जनवरी 1950 को लागू किया गया था।",
        explanationEn: "The Constitution was adopted on November 26, 1949, and officially came into force on January 26, 1950."
      },
      {
        question: "संविधान सभा में कुल कितनी महिला सदस्य थीं?",
        questionEn: "How many total women members were there in the Constituent Assembly?",
        options: ["10", "12", "15", "18"],
        optionsEn: ["10", "12", "15", "18"],
        correctIndex: 2,
        explanation: "भारतीय संविधान सभा में कुल 15 महिला सदस्य थीं, जिनमें सरोजिनी नायडू, राजकुमारी अमृत कौर, हंसा मेहता और बेगम एजाज रसूल प्रमुख थीं।",
        explanationEn: "There were 15 women members who participated in drafting and discussions of the Constituent Assembly."
      },
      {
        question: "निम्न कथनों पर विचार कीजिए:\n1. संविधान सभा का गठन कैबिनेट मिशन योजना के आधार पर हुआ था।\n2. संविधान निर्माण में 2 वर्ष 11 माह 18 दिन लगे।",
        questionEn: "Consider the following statements:\n1. The Constituent Assembly was formed under the Cabinet Mission Plan.\n2. The Constitution took 2 years, 11 months, and 18 days to be completed.",
        options: ["केवल 1 सही है", "केवल 2 सही है", "दोनों सही हैं", "दोनों गलत हैं"],
        optionsEn: ["Only 1 is correct", "Only 2 is correct", "Both are correct", "Both are incorrect"],
        correctIndex: 2,
        explanation: "दोनों कथन सत्य हैं। संविधान सभा का गठन कैबिनेट मिशन योजना के तहत हुआ तथा इसके निर्माण में कुल 2 वर्ष 11 माह और 18 दिन का समय लगा था।",
        explanationEn: "Both statements are correct. The assembly was formed under the Cabinet Mission, and it took 2 years, 11 months, and 18 days to draft the constitution."
      }
    ],

    /* ─── FAQs ──────────────────────────────────────────────── */
    faqs: [
      {
        question: "संविधान सभा के संवैधानिक सलाहकार कौन थे?",
        questionEn: "Who was the Constitutional Advisor to the Constituent Assembly?",
        answer: "सर बी. एन. राव (बेनेगल नरसिंह राव) संविधान सभा के संवैधानिक सलाहकार थे। इन्होंने ही संविधान का पहला कच्चा प्रारूप तैयार किया था।",
        answerEn: "Sir B. N. Rau (Benegal Narsing Rau) served as the Constitutional Advisor to the Assembly and prepared the initial draft."
      },
      {
        question: "मूल हस्तलिखित संविधान की प्रतियों को किसने लिखा था?",
        questionEn: "Who wrote the original handwritten copies of the Indian Constitution?",
        answer: "मूल अंग्रेजी संस्करण को प्रेम बिहारी नारायण रायज़ादा ने और मूल हिंदी संस्करण को बसंत कृष्ण वैद्य ने अपने हाथों से लिखा (Calligraphy) था।",
        answerEn: "The original English copy was hand-calligraphed by Prem Behari Narain Raizada, while the Hindi copy was calligraphed by Vasant Krishnan Vaidya."
      },
      {
        question: "संविधान सभा में एकमात्र मुस्लिम महिला सदस्य कौन थीं?",
        questionEn: "Who was the only Muslim woman member in the Constituent Assembly?",
        answer: "बेगम एजाज रसूल संविधान सभा में एकमात्र मुस्लिम महिला सदस्य थीं।",
        answerEn: "Begum Aizaz Rasul was the only Muslim woman representative in the Constituent Assembly."
      }
    ],

    /* ─── Sources ────────────────────────────────────────────── */
    sources: [
      { label: "Parliament of India Archive", url: "https://sansad.in/ls/about/historical-perspective" },
      { label: "Ministry of Law and Justice, Government of India", url: "https://legislative.gov.in" }
    ]
  };

  try {
    await client.createOrReplace(article);
    console.log("✨ Successfully uploaded Constituent Assembly Static GK Article to Sanity!");
  } catch (err) {
    console.error("❌ Failed to create/replace document in Sanity:", err);
  }
}

main().catch((err) => {
  console.error("❌ Error running script:", err);
  process.exit(1);
});
