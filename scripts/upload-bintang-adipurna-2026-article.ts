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
  console.log("🚀 Starting upload process for Bintang Adipurna Article...");

  // Image file paths in public/images/blog/
  const imagePaths = {
    pinning: path.resolve(process.cwd(), "public/images/blog/bintang-adipurna-1.jpg"),
    standing: path.resolve(process.cwd(), "public/images/blog/bintang-adipurna-2.jpg"),
    gate: path.resolve(process.cwd(), "public/images/blog/bintang-adipurna-3.jpg"),
  };

  // Check if files exist
  if (!fs.existsSync(imagePaths.pinning) || !fs.existsSync(imagePaths.standing) || !fs.existsSync(imagePaths.gate)) {
    console.error("❌ Required images not found in public/images/blog/");
    process.exit(1);
  }

  // 1. Upload Pinning Ceremony Image
  console.log("📸 Uploading pinning image...");
  const assetPinning = await client.assets.upload("image", fs.createReadStream(imagePaths.pinning), {
    filename: "bintang_adipurna_pinning.jpg",
  });
  console.log(`✔ Uploaded pinning image. Asset ID: ${assetPinning._id}`);

  // 2. Upload Standing Image (Featured Image)
  console.log("📸 Uploading standing image...");
  const assetStanding = await client.assets.upload("image", fs.createReadStream(imagePaths.standing), {
    filename: "bintang_adipurna_standing.jpg",
  });
  console.log(`✔ Uploaded standing image. Asset ID: ${assetStanding._id}`);

  // 3. Upload Gate Image
  console.log("📸 Uploading gate image...");
  const assetGate = await client.assets.upload("image", fs.createReadStream(imagePaths.gate), {
    filename: "bintang_adipurna_gate.jpg",
  });
  console.log(`✔ Uploaded gate image. Asset ID: ${assetGate._id}`);

  // 4. Construct the Article document
  const article = {
    _id: "ca-bintang-adipurna-modi-indonesia",
    _type: "currentAffairs",
    slug: { _type: "slug", current: "bintang-adipurna-modi-indonesia-award" },
    title: "पीएम मोदी को मिला इंडोनेशिया का सर्वोच्च नागरिक सम्मान ‘बिंतांग आदिपूर्णा’",
    titleEn: "PM Modi Honored with Indonesia's Highest Civilian Award 'Bintang Adipurna'",
    excerpt: "प्रधानमंत्री नरेंद्र मोदी को भारत-इंडोनेशिया के रणनीतिक संबंधों और वैश्विक कूटनीति को मजबूत करने के लिए इंडोनेशिया के सर्वोच्च नागरिक सम्मान 'बिंतांग आदिपूर्णा' से सम्मानित किया गया। वे यह सम्मान पाने वाले दूसरे भारतीय प्रधानमंत्री हैं।",
    excerptEn: "PM Narendra Modi was conferred with Indonesia's highest civilian award, 'Bintang Adipurna', for strengthening India-Indonesia strategic ties and global diplomacy. He is the second Indian PM to receive this honor.",
    ca_date: "2026-07-07",
    publishedAt: new Date().toISOString(),
    featured: true,
    readingTime: 6,
    keywords: [
      "Bintang Adipurna",
      "PM Modi Indonesia Award",
      "India Indonesia Relations",
      "Highest Civilian Honour Indonesia",
      "Prabowo Subianto",
      "बिंतांग आदिपूर्णा",
      "प्रधानमंत्री मोदी इंडोनेशिया सम्मान",
      "UPSC Current Affairs",
      "MPPSC Current Affairs"
    ],
    category: { _type: "reference", _ref: "cat-polity" }, // GS-2: International Relations & Polity
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
      asset: { _type: "reference", _ref: assetStanding._id },
      alt: "Prime Minister Narendra Modi and President Prabowo Subianto standing with national flags",
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
            children: [{ _key: "s1-1", _type: "span", text: "7 जुलाई 2026 को इंडोनेशिया की राजधानी जकार्ता में आयोजित एक भव्य राजकीय समारोह में भारतीय प्रधानमंत्री नरेंद्र मोदी को इंडोनेशिया के सर्वोच्च नागरिक सम्मान 'बिंतांग आदिपूर्णा' (Bintang Adipurna) से सम्मानित किया गया। यह सम्मान उन्हें इंडोनेशिया के राष्ट्रपति प्रबोवो सुबियांतो द्वारा प्रदान किया गया।" }],
          },
          {
            _key: "b1-2", _type: "block", style: "normal",
            children: [{ _key: "s1-2", _type: "span", text: "यह पुरस्कार भारत-इंडोनेशिया के ऐतिहासिक द्विपक्षीय संबंधों, कूटनीतिक रणनीतिक साझेदारी को प्रगाढ़ बनाने और वैश्विक दक्षिण (Global South) के हितों को रेखांकित करने में प्रधानमंत्री मोदी के असाधारण नेतृत्व को मान्यता देता है।" }],
          },
        ],
        bodyEn: [
          {
            _key: "b1-3", _type: "block", style: "normal",
            children: [{ _key: "s1-3", _type: "span", text: "On July 7, 2026, Prime Minister Narendra Modi was conferred with Indonesia's highest civilian honor, 'Bintang Adipurna' (Medal of Honour), during a grand state ceremony in Jakarta. The award was presented by Indonesian President Prabowo Subianto." }],
          },
          {
            _key: "b1-4", _type: "block", style: "normal",
            children: [{ _key: "s1-4", _type: "span", text: "This prestigious honor recognizes PM Modi's exceptional leadership in strengthening India-Indonesia historical bilateral ties, deepening the strategic diplomatic partnership, and championing the causes of the Global South." }],
          },
        ],
      },

      /* ── 2. What is Bintang Adipurna? ────────────────────────── */
      {
        _key: "sec-award-details",
        kind: "background",
        title: "बिंतांग आदिपूर्णा क्या है?",
        titleEn: "What is Bintang Adipurna?",
        body: [
          {
            _key: "b2-1", _type: "block", style: "normal",
            children: [{ _key: "s2-1", _type: "span", text: "• इंडोनेशिया का सर्वोच्च नागरिक सम्मान: 'बिंतांग आदिपूर्णा' (Bintang Adipurna) इंडोनेशिया का सर्वोच्च नागरिक सम्मान (Highest Civilian Honour) है।" }],
          },
          {
            _key: "b2-2", _type: "block", style: "normal",
            children: [{ _key: "s2-2", _type: "span", text: "• स्थापना: इसकी स्थापना वर्ष 1959 में की गई थी।" }],
          },
          {
            _key: "b2-3", _type: "block", style: "normal",
            children: [{ _key: "s2-3", _type: "span", text: "• अर्थ: इसका शाब्दिक अर्थ 'सम्मान पदक' (Medal of Honour) होता है। यह 'Bintang Republik Indonesia' (इंडोनेशिया गणराज्य का तारा) पुरस्कार की सर्वोच्च श्रेणी है।" }],
          },
          {
            _key: "b2-img", _type: "image",
            asset: { _type: "reference", _ref: assetPinning._id },
            alt: "President Prabowo Subianto pinning Bintang Adipurna on PM Modi",
          },
          {
            _key: "b2-4", _type: "block", style: "normal",
            children: [{ _key: "s2-4", _type: "span", text: "• पात्रता: यह सम्मान उन नागरिकों या विदेशी राष्ट्राध्यक्षों को प्रदान किया जाता है जिन्होंने इंडोनेशिया की एकता, अखंडता, स्थिरता, समृद्धि और अंतरराष्ट्रीय सहयोग को बढ़ावा देने में असाधारण व ऐतिहासिक योगदान दिया हो।" }],
          },
        ],
        bodyEn: [
          {
            _key: "b2-5", _type: "block", style: "normal",
            children: [{ _key: "s2-5", _type: "span", text: "• Highest Civilian Honour: 'Bintang Adipurna' is the highest class of the Star of the Republic of Indonesia." }],
          },
          {
            _key: "b2-6", _type: "block", style: "normal",
            children: [{ _key: "s2-6", _type: "span", text: "• Establishment: It was instituted in the year 1959." }],
          },
          {
            _key: "b2-7", _type: "block", style: "normal",
            children: [{ _key: "s2-7", _type: "span", text: "• Meaning: It translates to the 'Medal of Honour' and is the highest class of the Star of the Republic of Indonesia (Bintang Republik Indonesia) order." }],
          },
          {
            _key: "b2-img-en", _type: "image",
            asset: { _type: "reference", _ref: assetPinning._id },
            alt: "President Prabowo Subianto pinning Bintang Adipurna on PM Modi",
          },
          {
            _key: "b2-8", _type: "block", style: "normal",
            children: [{ _key: "s2-8", _type: "span", text: "• Eligibility: Conferred upon individuals (both domestic and foreign) who have made outstanding contributions toward the unity, stability, prosperity, and international relations of Indonesia." }],
          },
        ],
      },

      /* ── 3. Why Conferred ─────────────────────────────────────── */
      {
        _key: "sec-why-conferred",
        kind: "importance",
        title: "क्यों दिया गया यह सम्मान?",
        titleEn: "Why was this Award Conferred?",
        body: [
          {
            _key: "b3-1", _type: "block", style: "normal",
            children: [{ _key: "s3-1", _type: "span", text: "प्रधानमंत्री मोदी को यह प्रतिष्ठित सम्मान निम्नलिखित महत्वपूर्ण प्रयासों के लिए प्रदान किया गया:" }],
          },
          {
            _key: "b3-2", _type: "block", style: "normal",
            children: [{ _key: "s3-2", _type: "span", text: "1. रणनीतिक साझेदारी का सुदृढ़ीकरण: पिछले दशक में भारत-इंडोनेशिया रणनीतिक साझेदारी (Strategic Partnership) को व्यापक रणनीतिक साझेदारी (Comprehensive Strategic Partnership) में बदलना।" }],
          },
          {
            _key: "b3-3", _type: "block", style: "normal",
            children: [{ _key: "s3-3", _type: "span", text: "2. इंडो-पैसिफिक क्षेत्र में सहयोग: इंडो-पैसिफिक क्षेत्र में समुद्री सुरक्षा, स्वतंत्र और खुला आवागमन सुनिश्चित करने में साझा हितों को बढ़ावा देना।" }],
          },
          {
            _key: "b3-4", _type: "block", style: "normal",
            children: [{ _key: "s3-4", _type: "span", text: "3. नीली अर्थव्यवस्था (Blue Economy): समुद्री संसाधनों के सतत संरक्षण एवं दोहन के लिए द्विपक्षीय सहयोग बढ़ाना।" }],
          },
          {
            _key: "b3-5", _type: "block", style: "normal",
            children: [{ _key: "s3-5", _type: "span", text: "4. व्यापार और रक्षा सहयोग: दोनों देशों के बीच व्यापारिक निवेश का विस्तार, आतंकवाद विरोधी रक्षा सहयोग और संयुक्त अभ्यास का विस्तार करना।" }],
          },
          {
            _key: "b3-6", _type: "block", style: "normal",
            children: [{ _key: "s3-6", _type: "span", text: "5. ग्लोबल साउथ (Global South) की आवाज़: G20, आसियान आदि बहुपक्षीय मंचों पर विकासशील देशों की प्राथमिकताओं को सशक्त रूप से उठाना।" }],
          },
        ],
        bodyEn: [
          {
            _key: "b3-7", _type: "block", style: "normal",
            children: [{ _key: "s3-7", _type: "span", text: "PM Modi was conferred with this award in recognition of his significant contributions across several domains:" }],
          },
          {
            _key: "b3-8", _type: "block", style: "normal",
            children: [{ _key: "s3-8", _type: "span", text: "1. Elevating Strategic Ties: Elevating the India-Indonesia relationship to a 'Comprehensive Strategic Partnership'." }],
          },
          {
            _key: "b3-9", _type: "block", style: "normal",
            children: [{ _key: "s3-9", _type: "span", text: "2. Indo-Pacific Collaboration: Driving mutual cooperation for a free, open, and rules-based Indo-Pacific region." }],
          },
          {
            _key: "b3-10", _type: "block", style: "normal",
            children: [{ _key: "s3-10", _type: "span", text: "3. Blue Economy & Security: Expanding collaboration in maritime security, disaster management, and the blue economy." }],
          },
          {
            _key: "b3-11", _type: "block", style: "normal",
            children: [{ _key: "s3-11", _type: "span", text: "4. Trade and Defense: Strengthening economic ties, mutual investments, and counter-terrorism defense cooperation." }],
          },
          {
            _key: "b3-12", _type: "block", style: "normal",
            children: [{ _key: "s3-12", _type: "span", text: "5. Global South Leadership: Amplifying the concerns, representation, and priorities of the Global South at forums like G20 and ASEAN." }],
          },
        ],
      },

      /* ── 4. Exam Specific Facts ───────────────────────────────── */
      {
        _key: "sec-exam-facts",
        kind: "factsAtAGlance",
        title: "परीक्षा हेतु महत्वपूर्ण तथ्य",
        titleEn: "Important Facts for Exams",
        body: [
          {
            _key: "b4-1", _type: "block", style: "normal",
            children: [{ _key: "s4-1", _type: "span", text: "• दूसरे भारतीय प्रधानमंत्री: जवाहरलाल नेहरू के बाद नरेंद्र मोदी इंडोनेशिया का यह सर्वोच्च नागरिक सम्मान प्राप्त करने वाले दूसरे भारतीय प्रधानमंत्री हैं।" }],
          },
          {
            _key: "b4-2", _type: "block", style: "normal",
            children: [{ _key: "s4-2", _type: "span", text: "• तुलनात्मक विवरण:" }],
          },
          {
            _key: "b4-3", _type: "block", style: "normal",
            children: [{ _key: "s4-3", _type: "span", text: "1. जवाहरलाल नेहरू - वर्ष 1995" }],
          },
          {
            _key: "b4-4", _type: "block", style: "normal",
            children: [{ _key: "s4-4", _type: "span", text: "2. नरेंद्र मोदी - वर्ष 2026" }],
          },
          {
            _key: "b4-5", _type: "block", style: "normal",
            children: [{ _key: "s4-5", _type: "span", text: "• पीएम मोदी को मिले अन्य प्रमुख अंतरराष्ट्रीय नागरिक सम्मान:" }],
          },
          {
            _key: "b4-6", _type: "block", style: "normal",
            children: [{ _key: "s4-6", _type: "span", text: "- बिंतांग आदिपूर्णा: इंडोनेशिया (2026)" }],
          },
          {
            _key: "b4-7", _type: "block", style: "normal",
            children: [{ _key: "s4-7", _type: "span", text: "- ऑर्डर ऑफ द ड्रुक ग्यालपो: भूटान (2024)" }],
          },
          {
            _key: "b4-8", _type: "block", style: "normal",
            children: [{ _key: "s4-8", _type: "span", text: "- गार्जियन ऑफ द ब्लू होराइजन: सेशेल्स (2026)" }],
          },
          {
            _key: "b4-9", _type: "block", style: "normal",
            children: [{ _key: "s4-9", _type: "span", text: "- ऑर्डर ऑफ द नाइल: मिस्र (2023)" }],
          },
          {
            _key: "b4-10", _type: "block", style: "normal",
            children: [{ _key: "s4-10", _type: "span", text: "- लीजन ऑफ मेरिट: अमेरिका (2020)" }],
          },
          {
            _key: "b4-11", _type: "block", style: "normal",
            children: [{ _key: "s4-11", _type: "span", text: "- ऑर्डर ऑफ सेंट एंड्रयू द एपोस्टल: रूस (2019)" }],
          },
          {
            _key: "b4-12", _type: "block", style: "normal",
            children: [{ _key: "s4-12", _type: "span", text: "- ग्रैंड कमांडर ऑफ द ऑर्डर ऑफ द नाइजर: नाइजीरिया (2024)" }],
          },
        ],
        bodyEn: [
          {
            _key: "b4-13", _type: "block", style: "normal",
            children: [{ _key: "s4-13", _type: "span", text: "• Second Indian PM: PM Narendra Modi is only the second Indian Prime Minister to receive this decoration, after Jawaharlal Nehru." }],
          },
          {
            _key: "b4-14", _type: "block", style: "normal",
            children: [{ _key: "s4-14", _type: "span", text: "• Timeline of Recipients:" }],
          },
          {
            _key: "b4-15", _type: "block", style: "normal",
            children: [{ _key: "s4-15", _type: "span", text: "1. Jawaharlal Nehru - 1995" }],
          },
          {
            _key: "b4-16", _type: "block", style: "normal",
            children: [{ _key: "s4-16", _type: "span", text: "2. Narendra Modi - 2026" }],
          },
          {
            _key: "b4-17", _type: "block", style: "normal",
            children: [{ _key: "s4-17", _type: "span", text: "• Other Major Global Honors Conferred on PM Modi:" }],
          },
          {
            _key: "b4-18", _type: "block", style: "normal",
            children: [{ _key: "s4-18", _type: "span", text: "- Bintang Adipurna: Indonesia (2026)" }],
          },
          {
            _key: "b4-19", _type: "block", style: "normal",
            children: [{ _key: "s4-19", _type: "span", text: "- Order of the Druk Gyalpo: Bhutan (2024)" }],
          },
          {
            _key: "b4-20", _type: "block", style: "normal",
            children: [{ _key: "s4-20", _type: "span", text: "- Guardian of the Blue Horizon: Seychelles (2026)" }],
          },
          {
            _key: "b4-21", _type: "block", style: "normal",
            children: [{ _key: "s4-21", _type: "span", text: "- Order of the Nile: Egypt (2023)" }],
          },
          {
            _key: "b4-22", _type: "block", style: "normal",
            children: [{ _key: "s4-22", _type: "span", text: "- Legion of Merit: United States (2020)" }],
          },
          {
            _key: "b4-23", _type: "block", style: "normal",
            children: [{ _key: "s4-23", _type: "span", text: "- Order of St. Andrew the Apostle: Russia (2019)" }],
          },
          {
            _key: "b4-24", _type: "block", style: "normal",
            children: [{ _key: "s4-24", _type: "span", text: "- Grand Commander of the Order of the Niger: Nigeria (2024)" }],
          },
        ],
      },

      /* ── 5. India-Indonesia Relations ────────────────────────── */
      {
        _key: "sec-relations",
        kind: "keyHighlights",
        title: "भारत-इंडोनेशिया संबंध",
        titleEn: "India-Indonesia Bilateral Relations",
        body: [
          {
            _key: "b5-1", _type: "block", style: "normal",
            children: [{ _key: "s5-1", _type: "span", text: "• समुद्री निकटता: दोनों देश हिंद महासागर क्षेत्र में एक साझा समुद्री सीमा साझा करते हैं। अंडमान और निकोबार द्वीप समूह (भारत) इंडोनेशिया के सुमात्रा द्वीप के बहुत निकट स्थित है।" }],
          },
          {
            _key: "b5-2", _type: "block", style: "normal",
            children: [{ _key: "s5-2", _type: "span", text: "• बहुपक्षीय सहयोग: दोनों देश G20, पूर्वी एशिया शिखर सम्मेलन (EAS), आसियान (ASEAN) और हिंद महासागर रिम एसोसिएशन (IORA) जैसे बहुपक्षीय मंचों पर साथ मिलकर कार्य करते हैं।" }],
          },
          {
            _key: "b5-3", _type: "block", style: "normal",
            children: [{ _key: "s5-3", _type: "span", text: "• आसियान में महत्व: इंडोनेशिया दक्षिण-पूर्वी एशियाई देशों के संगठन (ASEAN) का सबसे बड़ा भौगोलिक सदस्य देश और अर्थव्यवस्था है, जो भारत की एक्ट ईस्ट नीति का केंद्रीय स्तंभ है।" }],
          },
          {
            _key: "b5-img", _type: "image",
            asset: { _type: "reference", _ref: assetGate._id },
            alt: "Scenic Balinese Candi Bentar split gate representing historical cultural ties",
          },
          {
            _key: "b5-4", _type: "block", style: "normal",
            children: [{ _key: "s5-4", _type: "span", text: "• सांस्कृतिक ऐतिहासिक संबंध: दोनों देशों के बीच प्राचीन काल से गहरे सांस्कृतिक संबंध रहे हैं (विशेषकर रामायण, महाभारत और बौद्ध परंपराओं के माध्यम से), जो आज भी इंडोनेशिया के बाली (Bali) और जावा (Java) जैसे क्षेत्रों में स्पष्ट रूप से दिखाई देते हैं।" }],
          },
        ],
        bodyEn: [
          {
            _key: "b5-5", _type: "block", style: "normal",
            children: [{ _key: "s5-5", _type: "span", text: "• Maritime Proximity: The two countries share a crucial maritime boundary in the Indian Ocean. India's Andaman and Nicobar Islands are situated very close to Indonesia's Sumatra island." }],
          },
          {
            _key: "b5-6", _type: "block", style: "normal",
            children: [{ _key: "s5-6", _type: "span", text: "• Multilateral Engagement: They collaborate closely across regional and global forums including G20, East Asia Summit (EAS), ASEAN, and Indian Ocean Rim Association (IORA)." }],
          },
          {
            _key: "b5-7", _type: "block", style: "normal",
            children: [{ _key: "s5-7", _type: "span", text: "• Anchor of Act East Policy: As the largest country and economy in ASEAN, Indonesia forms the cornerstone of India's 'Act East' Policy." }],
          },
          {
            _key: "b5-img-en", _type: "image",
            asset: { _type: "reference", _ref: assetGate._id },
            alt: "Scenic Balinese Candi Bentar split gate representing historical cultural ties",
          },
          {
            _key: "b5-8", _type: "block", style: "normal",
            children: [{ _key: "s5-8", _type: "span", text: "• Strong Cultural Links: Deep historical, commercial, and cultural ties span over two millennia, reflected in shared epics (Ramayana and Mahabharata) and Buddhist traditions visible in Bali and Java today." }],
          },
        ],
      },

      /* ── 6. Indonesia at a Glance ────────────────────────────── */
      {
        _key: "sec-indonesia-glance",
        kind: "quickFacts",
        title: "इंडोनेशिया: एक नजर में",
        titleEn: "Indonesia at a Glance",
        body: [
          {
            _key: "b6-1", _type: "block", style: "normal",
            children: [{ _key: "s6-1", _type: "span", text: "• राजधानी: जकार्ता (Jakarta)" }],
          },
          {
            _key: "b6-2", _type: "block", style: "normal",
            children: [{ _key: "s6-2", _type: "span", text: "• नई प्रस्तावित राजधानी: नुसंतारा (Nusantara) - बोर्नियो द्वीप पर स्थानांतरित की जा रही है।" }],
          },
          {
            _key: "b6-3", _type: "block", style: "normal",
            children: [{ _key: "s6-3", _type: "span", text: "• मुद्रा: इंडोनेशियाई रुपियाह (Rupiah)" }],
          },
          {
            _key: "b6-4", _type: "block", style: "normal",
            children: [{ _key: "s6-4", _type: "span", text: "• राष्ट्रपति: प्रबोवो सुबियांतो (Prabowo Subianto)" }],
          },
          {
            _key: "b6-5", _type: "block", style: "normal",
            children: [{ _key: "s6-5", _type: "span", text: "• आधिकारिक भाषा: इंडोनेशियाई (Bahasa Indonesia)" }],
          },
        ],
        bodyEn: [
          {
            _key: "b6-6", _type: "block", style: "normal",
            children: [{ _key: "s6-6", _type: "span", text: "• Capital: Jakarta" }],
          },
          {
            _key: "b6-7", _type: "block", style: "normal",
            children: [{ _key: "s6-7", _type: "span", text: "• Proposed New Capital: Nusantara (on Borneo Island)" }],
          },
          {
            _key: "b6-8", _type: "block", style: "normal",
            children: [{ _key: "s6-8", _type: "span", text: "• Currency: Indonesian Rupiah (IDR)" }],
          },
          {
            _key: "b6-9", _type: "block", style: "normal",
            children: [{ _key: "s6-9", _type: "span", text: "• President: Prabowo Subianto" }],
          },
          {
            _key: "b6-10", _type: "block", style: "normal",
            children: [{ _key: "s6-10", _type: "span", text: "• Official Language: Indonesian (Bahasa Indonesia)" }],
          },
        ],
      },
    ],

    /* ─── MCQs ──────────────────────────────────────────────── */
    mcqs: [
      {
        question: "'बिंतांग आदिपूर्णा' किस देश का सर्वोच्च नागरिक सम्मान है?",
        questionEn: "'Bintang Adipurna' is the highest civilian honor of which country?",
        options: ["मलेशिया", "इंडोनेशिया", "सिंगापुर", "थाईलैंड"],
        optionsEn: ["Malaysia", "Indonesia", "Singapore", "Thailand"],
        correctIndex: 1,
        explanation: "बिंतांग आदिपूर्णा इंडोनेशिया का सर्वोच्च नागरिक सम्मान (Highest Civilian Honour) है, जिसकी स्थापना 1959 में हुई थी।",
        explanationEn: "Bintang Adipurna is the highest civilian honor of Indonesia, established in 1959."
      },
      {
        question: "प्रधानमंत्री नरेंद्र मोदी को 'बिंतांग आदिपूर्णा' सम्मान किस वर्ष प्रदान किया गया?",
        questionEn: "In which year was Prime Minister Narendra Modi conferred with the 'Bintang Adipurna' award?",
        options: ["2024", "2025", "2026", "2027"],
        optionsEn: ["2024", "2025", "2026", "2027"],
        correctIndex: 2,
        explanation: "प्रधानमंत्री नरेंद्र मोदी को 7 जुलाई 2026 को इंडोनेशिया के राष्ट्रपति प्रबोवो सुबियांतो द्वारा यह सम्मान प्रदान किया गया।",
        explanationEn: "PM Narendra Modi was conferred with the award on July 7, 2026, by Indonesian President Prabowo Subianto."
      },
      {
        question: "'बिंतांग आदिपूर्णा' सम्मान प्राप्त करने वाले दूसरे भारतीय प्रधानमंत्री कौन हैं?",
        questionEn: "Who is the second Indian Prime Minister to receive the 'Bintang Adipurna' award?",
        options: ["इंदिरा गांधी", "अटल बिहारी वाजपेयी", "नरेंद्र मोदी", "मनमोहन सिंह"],
        optionsEn: ["Indira Gandhi", "Atal Bihari Vajpayee", "Narendra Modi", "Manmohan Singh"],
        correctIndex: 2,
        explanation: "नरेंद्र मोदी इस सम्मान से सम्मानित होने वाले दूसरे भारतीय प्रधानमंत्री हैं, जो जवाहरलाल नेहरू के बाद यह उपलब्धि हासिल करने वाले दूसरे भारतीय पीएम बने।",
        explanationEn: "Narendra Modi is the second Indian Prime Minister to be conferred with this honor, following Jawaharlal Nehru."
      },
      {
        question: "निम्नलिखित में से किस भारतीय प्रधानमंत्री को सबसे पहले 'बिंतांग आदिपूर्णा' सम्मान प्राप्त हुआ था?",
        questionEn: "Which of the following Indian Prime Ministers was the first to receive the 'Bintang Adipurna' honor?",
        options: ["राजीव गांधी", "जवाहरलाल नेहरू", "लाल बहादुर शास्त्री", "पी. वी. नरसिम्हा राव"],
        optionsEn: ["Rajiv Gandhi", "Jawaharlal Nehru", "Lal Bahadur Shastri", "P. V. Narasimha Rao"],
        correctIndex: 1,
        explanation: "जवाहरलाल नेहरू को सबसे पहले 1995 में यह सम्मान प्राप्त हुआ था।",
        explanationEn: "Jawaharlal Nehru was the first Indian Prime Minister to receive this award in 1995."
      },
      {
        question: "इंडोनेशिया की आधिकारिक मुद्रा क्या है?",
        questionEn: "What is the official currency of Indonesia?",
        options: ["रिंगिट", "बाट", "रुपियाह", "डॉलर"],
        optionsEn: ["Ringgit", "Baht", "Rupiah", "Dollar"],
        correctIndex: 2,
        explanation: "इंडोनेशिया की आधिकारिक मुद्रा इंडोनेशियाई रुपियाह (Rupiah) है।",
        explanationEn: "The official currency of Indonesia is the Indonesian Rupiah (IDR)."
      },
      {
        question: "इंडोनेशिया के वर्तमान राष्ट्रपति कौन हैं?",
        questionEn: "Who is the current President of Indonesia?",
        options: ["जोको विडोडो", "प्रबोवो सुबियांतो", "सुसिलो बंबांग युधोयोनो", "मेगावती सुकर्णोपुत्री"],
        optionsEn: ["Joko Widodo", "Prabowo Subianto", "Susilo Bambang Yudhoyono", "Megawati Sukarnoputri"],
        correctIndex: 1,
        explanation: "इंडोनेशिया के वर्तमान राष्ट्रपति प्रबोवो सुबियांतो हैं जिन्होंने जोको विडोडो का स्थान लिया है।",
        explanationEn: "The current President of Indonesia is Prabowo Subianto, who succeeded Joko Widodo."
      },
      {
        question: "बिंतांग आदिपूर्णा के संदर्भ में निम्न कथनों पर विचार कीजिए:\n1. यह इंडोनेशिया का सर्वोच्च नागरिक सम्मान है।\n2. प्रधानमंत्री नरेंद्र मोदी यह सम्मान प्राप्त करने वाले दूसरे भारतीय प्रधानमंत्री हैं।",
        questionEn: "Consider the following statements regarding Bintang Adipurna:\n1. It is the highest civilian award of Indonesia.\n2. PM Narendra Modi is the second Indian PM to receive this award.",
        options: ["केवल 1 सही", "केवल 2 सही", "दोनों सही", "दोनों गलत"],
        optionsEn: ["Only 1 is correct", "Only 2 is correct", "Both are correct", "Both are incorrect"],
        correctIndex: 2,
        explanation: "कथन 1 और 2 दोनों सत्य हैं। बिंतांग आदिपूर्णा इंडोनेशिया का सर्वोच्च नागरिक सम्मान है और पीएम मोदी यह सम्मान पाने वाले दूसरे भारतीय प्रधानमंत्री हैं (पहले जवाहरलाल नेहरू थे)।",
        explanationEn: "Both statements 1 and 2 are correct. Bintang Adipurna is Indonesia's highest civilian award and PM Modi is the second Indian PM to receive it (after Jawaharlal Nehru)."
      },
      {
        question: "निम्नलिखित में से कौन-सा सम्मान प्रधानमंत्री नरेंद्र मोदी को सेशेल्स द्वारा प्रदान किया गया?",
        questionEn: "Which of the following awards was conferred upon PM Narendra Modi by Seychelles?",
        options: ["ऑर्डर ऑफ द नाइल", "गार्डियन ऑफ द ब्लू होराइजन", "लीजन ऑफ मेरिट", "ऑर्डर ऑफ द ड्रुक ग्यालपो"],
        optionsEn: ["Order of the Nile", "Guardian of the Blue Horizon", "Legion of Merit", "Order of the Druk Gyalpo"],
        correctIndex: 1,
        explanation: "सेशेल्स द्वारा प्रधानमंत्री मोदी को 'गार्डियन ऑफ द ब्लू होराइजन' सम्मान वर्ष 2026 में प्रदान किया गया था।",
        explanationEn: "The 'Guardian of the Blue Horizon' award was conferred on PM Modi by Seychelles in 2026."
      }
    ],

    /* ─── FAQs ──────────────────────────────────────────────── */
    faqs: [
      {
        question: "बिंतांग आदिपूर्णा क्या है?",
        questionEn: "What is Bintang Adipurna?",
        answer: "यह इंडोनेशिया का सर्वोच्च नागरिक सम्मान (Highest Civilian Honour) है, जिसकी स्थापना 1959 में की गई थी। यह उन व्यक्तियों को दिया जाता है जिन्होंने इंडोनेशिया की एकता, समृद्धि और वैश्विक सहयोग में अभूतपूर्व योगदान दिया हो।",
        answerEn: "It is Indonesia's highest civilian decoration, established in 1959. It is awarded to individuals making extraordinary contributions to the unity, prosperity, and international cooperation of Indonesia."
      },
      {
        question: "इस सम्मान को पाने वाले पहले भारतीय प्रधानमंत्री कौन थे?",
        questionEn: "Who was the first Indian Prime Minister to receive this honor?",
        answer: "प्रधानमंत्री जवाहरलाल नेहरू वर्ष 1995 में इस सम्मान से सम्मानित होने वाले पहले भारतीय प्रधानमंत्री बने थे।",
        answerEn: "Prime Minister Jawaharlal Nehru was the first Indian Prime Minister to be conferred with this honor in the year 1995."
      }
    ],

    /* ─── Sources ────────────────────────────────────────────── */
    sources: [
      { label: "Ministry of External Affairs, India", url: "https://mea.gov.in" },
      { label: "Cabinet Secretariat, Republic of Indonesia", url: "https://setkab.go.id" },
      { label: "PIB Delhi", url: "https://pib.gov.in" }
    ]
  };

  try {
    await client.createOrReplace(article);
    console.log("✨ Successfully uploaded Bintang Adipurna Article to Sanity!");
  } catch (err) {
    console.error("❌ Failed to create/replace document in Sanity:", err);
  }
}

main().catch((err) => {
  console.error("❌ Error running script:", err);
  process.exit(1);
});
