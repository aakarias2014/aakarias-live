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
  console.log("🚀 Starting upload process for Comprehensive 18th BRICS Summit 2026 Article to Sanity CMS...");

  // Banner image path
  const imagePath = path.resolve(process.cwd(), "public/images/blog/brics_summit_2026_banner.png");
  if (!fs.existsSync(imagePath)) {
    console.error(`❌ Image not found at ${imagePath}`);
    process.exit(1);
  }

  // 1. Upload Banner Image
  console.log("📸 Uploading BRICS Summit 2026 banner image...");
  const assetBanner = await client.assets.upload("image", fs.createReadStream(imagePath), {
    filename: "brics_summit_2026_banner.png",
  });
  console.log(`✔ Banner image uploaded successfully. Asset ID: ${assetBanner._id}`);

  // 2. Construct Article Document with Maximum SEO Optimization
  const articleDoc = {
    _id: "ca-18th-brics-summit-2026-new-delhi",
    _type: "currentAffairs",
    slug: { _type: "slug", current: "18th-brics-summit-2026-new-delhi-india-chairship" },
    title: "18वां BRICS शिखर सम्मेलन 2026 (नई दिल्ली): भारत की अध्यक्षता, एजेंडा, महत्व, भारत के रणनीतिक हित, 11 सदस्य देश, NDB व 25 वर्षों का सफर | MPPSC & UPSC Notes",
    titleEn: "18th BRICS Summit 2026 (New Delhi): India's Chairship, Agenda, Strategic Interests, 11 Member Nations, NDB & 25-Year Journey | MPPSC & UPSC Notes",
    excerpt: "भारत की अध्यक्षता में 12-13 सितंबर 2026 को नई दिल्ली के भारत मंडपम में आयोजित 18वें BRICS शिखर सम्मेलन का पूर्ण एजेंडा, 25 साल का सफर (2001-2026), भारत के 11 रणनीतिक हित, 11 सदस्य देश, तिरुक्कुरल भेंट, NDB बैंक, नई दिल्ली घोषणापत्र एवं MPPSC/UPSC हेतु 8 अभ्यास प्रश्न।",
    excerptEn: "Complete guide to the 18th BRICS Summit held under India's presidency on 12-13 September 2026 at Bharat Mandapam, New Delhi. Covers full summit agenda, India's 11 strategic interests, 25-year milestone (2001-2026), BRICS expansion to 11 members, Thirukkural gift, NDB & 8 MCQs for MPPSC & UPSC.",
    ca_date: "2026-09-12",
    publishedAt: new Date("2026-09-12T12:00:00.000Z").toISOString(),
    featured: true,
    readingTime: 12,
    keywords: [
      "18th BRICS Summit 2026",
      "BRICS Summit 2026 New Delhi",
      "BRICS India Chairship 2026",
      "18वां BRICS शिखर सम्मेलन 2026 का एजेंडा",
      "18वां ब्रिक्स शिखर सम्मेलन का महत्व",
      "ब्रिक्स समूह और भारत के रणनीतिक हित",
      "BRICS 11 Member Countries",
      "BRICS Expansion 2024 2025",
      "BRIC 25 years milestone 2001 2026",
      "Thirukkural gift to Putin",
      "New Development Bank NDB Shanghai",
      "New Delhi Declaration BRICS 2026",
      "Jim O'Neill BRIC 2001",
      "Bharat Mandapam New Delhi",
      "MPPSC Current Affairs 2026",
      "UPSC Current Affairs 2026",
      "Global South Leadership",
      "De-dollarisation local currency trade UPI India Stack"
    ],
    category: { _type: "reference", _ref: "cat-polity" },
    author: { _type: "reference", _ref: "author-aakar" },
    tags: [
      { _type: "reference", _ref: "tag-mppsc" },
      { _type: "reference", _ref: "tag-upsc" },
      { _type: "reference", _ref: "tag-prelims" },
      { _type: "reference", _ref: "tag-mains" },
    ],
    syllabus: ["GS-2", "Prelims-GS"],
    featuredImage: {
      _type: "image",
      asset: { _type: "reference", _ref: assetBanner._id },
      alt: "18th BRICS Summit 2026 New Delhi — India Chairship, Agenda, Strategic Interests, PM Modi gifts Thirukkural to Vladimir Putin at Bharat Mandapam",
      caption: "18वां BRICS शिखर सम्मेलन 2026: भारत मंडपम, नई दिल्ली में आयोजित सम्मेलन में प्रधानमंत्री नरेंद्र मोदी ने रूसी राष्ट्रपति व्लादिमीर पुतिन को 'तिरुक्कुरल' का रूसी अनुवाद भेंट किया",
    },

    /* ─── SECTIONS (Bilingual PortableText with Full Verbatim Content) ──── */
    sections: [
      /* ── 1. Context / Why in News ──────────────────────────────────── */
      {
        _key: "sec-context",
        kind: "whyInNews",
        title: "चर्चा में क्यों?",
        titleEn: "Why in News?",
        body: [
          {
            _key: "b1-1", _type: "block", style: "normal",
            children: [{ _key: "s1-1", _type: "span", text: "भारत की अध्यक्षता में **12-13 सितंबर 2026** को नई दिल्ली स्थित **भारत मंडपम** में **18वां BRICS शिखर सम्मेलन 2026** सफलतापूर्वक आयोजित हुआ।" }],
          },
          {
            _key: "b1-2", _type: "block", style: "normal",
            children: [{ _key: "s1-2", _type: "span", text: "यह सम्मेलन वर्तमान अंतरराष्ट्रीय घटनाक्रम के साथ-साथ **[MPPSC करेंट अफेयर्स 2026](/mppsc-current-affairs)**, **[MPPSC प्रारंभिक परीक्षा पाठ्यक्रम](/mppsc/prelims-syllabus)** तथा **[MPPSC मुख्य परीक्षा पाठ्यक्रम (GS-2 अंतर्राष्ट्रीय संबंध)](/mppsc/mains-syllabus)** एवं UPSC परीक्षाओं के लिए एक अत्यंत महत्वपूर्ण विषय है।" }],
          },
          {
            _key: "b1-3", _type: "block", style: "normal",
            children: [{ _key: "s1-3", _type: "span", text: "यह शिखर सम्मेलन उभरती अर्थव्यवस्थाओं के बीच सहयोग को मजबूत करने, वैश्विक दक्षिण की प्राथमिकताओं को उजागर करने और **2001 में BRIC अवधारणा की शुरुआत के 25 साल पूरे होने (25-Year Milestone)** का एक ऐतिहासिक मील का पत्थर है।" }],
          },
        ],
        bodyEn: [
          {
            _key: "b1-4", _type: "block", style: "normal",
            children: [{ _key: "s1-4", _type: "span", text: "Under India's presidency, the **18th BRICS Summit 2026** was successfully held on **12–13 September 2026** at the prestigious **Bharat Mandapam**, New Delhi." }],
          },
          {
            _key: "b1-5", _type: "block", style: "normal",
            children: [{ _key: "s1-5", _type: "span", text: "This landmark summit is a vital topic for **[MPPSC Current Affairs 2026](/en/mppsc-current-affairs)**, **[MPPSC Mains Syllabus GS-2](/en/mppsc/mains-syllabus)**, and UPSC Civil Services examinations." }],
          },
          {
            _key: "b1-6", _type: "block", style: "normal",
            children: [{ _key: "s1-6", _type: "span", text: "The 2026 summit marks the **25th anniversary milestone** since the BRIC concept was introduced in 2001, reflecting the group's evolution into a formidable global block." }],
          },
        ],
      },

      /* ── 2. BRIC / BRICS Overview & 25 Years Milestone ────────────── */
      {
        _key: "sec-bric-overview",
        kind: "background",
        title: "BRIC / BRICS: अवधारणा, 25 वर्षों का सफर एवं विस्तार",
        titleEn: "BRIC / BRICS: Concept, 25-Year Journey & Expansion",
        body: [
          {
            _key: "b2-0", _type: "block", style: "normal",
            children: [{ _key: "s2-0", _type: "span", text: "ब्रिक्स (BRICS) प्रमुख उभरती अर्थव्यवस्थाओं का एक अंतर्राष्ट्रीय समूह है जिसका उद्देश्य व्यापार, निवेश, वित्त, सतत विकास, प्रौद्योगिकी और वैश्विक शासन जैसे क्षेत्रों में सहयोग को बढ़ावा देना है।" }],
          },
          {
            _key: "b2-1", _type: "block", style: "h3",
            children: [{ _key: "s2-1", _type: "span", text: "BRIC की उत्पत्ति एवं ऐतिहासिक विकासक्रम:" }],
          },
          {
            _key: "b2-2", _type: "block", style: "normal",
            children: [{ _key: "s2-2", _type: "span", text: "• **ब्रिक (BRIC) अवधारणा (2001)**: ब्रिक्स शब्द का प्रयोग सबसे पहले वर्ष **2001** में गोल्डमैन सैक्स के प्रसिद्ध ब्रिटिश अर्थशास्त्री **जिम ओ'नील (Jim O'Neill)** द्वारा ब्राजील, रूस, भारत और चीन की तेजी से बढ़ती अर्थव्यवस्थाओं के लिए किया गया था। **वर्ष 2026 में इसके 25 साल पूरे हो चुके हैं।**" }],
          },
          {
            _key: "b2-3", _type: "block", style: "normal",
            children: [{ _key: "s2-3", _type: "span", text: "• **संस्थापक सदस्य**: ब्राजील, रूस, भारत और चीन (BRIC)।" }],
          },
          {
            _key: "b2-4", _type: "block", style: "normal",
            children: [{ _key: "s2-4", _type: "span", text: "• **पहला आधिकारिक शिखर सम्मेलन**: **16 जून 2009** को येकातेरिनबर्ग, रूस में आयोजित हुआ।" }],
          },
          {
            _key: "b2-5", _type: "block", style: "normal",
            children: [{ _key: "s2-5", _type: "span", text: "• **दक्षिण अफ्रीका का प्रवेश (2010)**: वर्ष 2010 में दक्षिण अफ्रीका के शामिल होने के बाद ब्रिक का नाम बदलकर **BRICS** हो गया।" }],
          },
          {
            _key: "b2-6", _type: "block", style: "normal",
            children: [{ _key: "s2-6", _type: "span", text: "• **BRICS+ ऐतिहासिक विस्तार (2024-2025)**: **जनवरी 2024** में मिस्र (Egypt), इथियोपिया (Ethiopia), ईरान (Iran), सऊदी अरब (Saudi Arabia) और संयुक्त अरब अमीरात (UAE) नए पूर्ण सदस्य बने। इसके बाद **जनवरी 2025** में इंडोनेशिया (Indonesia) भी पूर्ण सदस्य के रूप में शामिल हो गया।" }],
          },
          {
            _key: "b2-7", _type: "block", style: "normal",
            children: [{ _key: "s2-7", _type: "span", text: "• **प्रकृति (Nature)**: सदस्य देशों के बीच आर्थिक, राजनीतिक और विकासात्मक सहयोग के लिए एक अनौपचारिक बहुपक्षीय मंच।" }],
          },
          {
            _key: "b2-8", _type: "block", style: "normal",
            children: [{ _key: "s2-8", _type: "span", text: "• **न्यू डेवलपमेंट बैंक (NDB)**: बुनियादी ढांचे और सतत विकास परियोजनाओं को समर्थन देने के लिए ब्रिक्स देशों द्वारा स्थापित बहुपक्षीय विकास बैंक (मुख्यालय: शंघाई, चीन)।" }],
          },
        ],
        bodyEn: [
          {
            _key: "b2-9", _type: "block", style: "normal",
            children: [{ _key: "s2-9", _type: "span", text: "BRICS is an alliance of leading emerging economies aimed at promoting cooperation in trade, investment, finance, sustainable development, technology, and global governance." }],
          },
          {
            _key: "b2-10", _type: "block", style: "h3",
            children: [{ _key: "s2-10", _type: "span", text: "Origin & 25-Year Evolution:" }],
          },
          {
            _key: "b2-11", _type: "block", style: "normal",
            children: [{ _key: "s2-11", _type: "span", text: "• **BRIC Concept (2001)**: Coined by economist **Jim O'Neill** in 2001 for Brazil, Russia, India, and China. Year 2026 marks the **25-year milestone** of this concept." }],
          },
          {
            _key: "b2-12", _type: "block", style: "normal",
            children: [{ _key: "s2-12", _type: "span", text: "• **Founding Members**: Brazil, Russia, India, and China." }],
          },
          {
            _key: "b2-13", _type: "block", style: "normal",
            children: [{ _key: "s2-13", _type: "span", text: "• **First Summit**: Held on **16 June 2009** at Yekaterinburg, Russia." }],
          },
          {
            _key: "b2-14", _type: "block", style: "normal",
            children: [{ _key: "s2-14", _type: "span", text: "• **South Africa Entry (2010)**: South Africa joined in 2010, converting BRIC into BRICS." }],
          },
          {
            _key: "b2-15", _type: "block", style: "normal",
            children: [{ _key: "s2-15", _type: "span", text: "• **BRICS+ Expansion (2024-2025)**: Egypt, Ethiopia, Iran, Saudi Arabia, and UAE joined in January 2024, followed by Indonesia in January 2025, expanding BRICS to **11 full members**." }],
          },
        ],
      },

      /* ── 3. 18th BRICS Summit Agenda (Full 9 Points) ─────────────── */
      {
        _key: "sec-summit-agenda",
        kind: "analysis",
        title: "18वें ब्रिक्स शिखर सम्मेलन 2026 का विस्तृत एजेंडा (9 प्रमुख बिंदु)",
        titleEn: "Comprehensive Agenda of the 18th BRICS Summit 2026 (9 Key Focus Areas)",
        body: [
          {
            _key: "b3-0", _type: "block", style: "normal",
            children: [{ _key: "s3-0", _type: "span", text: "18वां ब्रिक्स शिखर सम्मेलन 2026 सदस्य देशों के बीच सहयोग को मजबूत करने के साथ-साथ प्रमुख वैश्विक आर्थिक, तकनीकी और पर्यावरणीय चुनौतियों का समाधान करने पर केंद्रित है। भारत के एजेंडे में वैश्विक दक्षिण की प्राथमिकताओं, नवाचार, डिजिटल सहयोग, जलवायु कार्रवाई और सतत विकास पर विशेष जोर दिया गया है:" }],
          },
          {
            _key: "b3-1", _type: "block", style: "normal",
            children: [{ _key: "s3-1", _type: "span", text: "• **1. ग्लोबल साउथ (Global South)**: वैश्विक शासन एवं अंतरराष्ट्रीय संस्थानों में विकासशील देशों की आवाज और प्राथमिकताओं को मजबूत करना।" }],
          },
          {
            _key: "b3-2", _type: "block", style: "normal",
            children: [{ _key: "s3-2", _type: "span", text: "• **2. जलवायु कार्रवाई (Climate Action)**: जलवायु लचीलापन, स्वच्छ ऊर्जा तकनीकों को बढ़ावा और सतत विकास लक्ष्यों की प्राप्ति।" }],
          },
          {
            _key: "b3-3", _type: "block", style: "normal",
            children: [{ _key: "s3-3", _type: "span", text: "• **3. ग्रीन फाइनेंस (Green Finance)**: सतत व पर्यावरण-अनुकूल परियोजनाओं के लिए अधिक हरित और जलवायु वित्त को प्रोत्साहित करना।" }],
          },
          {
            _key: "b3-4", _type: "block", style: "normal",
            children: [{ _key: "s3-4", _type: "span", text: "• **4. डिजिटल सार्वजनिक अवसंरचना (DPI)**: डिजिटल पब्लिक इंफ्रास्ट्रक्चर (DPI), डिजिटल भुगतान (UPI, India Stack) और समावेशी डिजिटल सेवाओं में ब्रिक्स सहयोग का विस्तार।" }],
          },
          {
            _key: "b3-5", _type: "block", style: "normal",
            children: [{ _key: "s3-5", _type: "span", text: "• **5. नवाचार और प्रौद्योगिकी (Innovation & AI)**: कृत्रिम बुद्धिमत्ता (AI), स्टार्टअप इकोसिस्टम, वैज्ञानिक अनुसंधान और समावेशी नवाचार को बढ़ावा देना।" }],
          },
          {
            _key: "b3-6", _type: "block", style: "normal",
            children: [{ _key: "s3-6", _type: "span", text: "• **6. ऊर्जा संक्रमण (Energy Transition)**: स्वच्छ ऊर्जा, हरित हाइड्रोजन और टिकाऊ ऊर्जा प्रणालियों का समर्थन करना।" }],
          },
          {
            _key: "b3-7", _type: "block", style: "normal",
            children: [{ _key: "s3-7", _type: "span", text: "• **7. लचीली आपूर्ति श्रृंखलाएं (Resilient Supply Chains)**: ब्रिक्स देशों के बीच अधिक सहयोग के माध्यम से क्रिटिकल मिनरल्स, खाद्य व ऊर्जा की विश्वसनीय और विविध वैश्विक आपूर्ति श्रृंखलाओं का निर्माण।" }],
          },
          {
            _key: "b3-8", _type: "block", style: "normal",
            children: [{ _key: "s3-8", _type: "span", text: "• **8. बहुपक्षीय सुधार (Multilateral Reforms)**: संयुक्त राष्ट्र सुरक्षा परिषद (UNSC), IMF, विश्व बैंक और WTO को अधिक प्रतिनिधि और समावेशी बनाने के लिए प्रयास।" }],
          },
          {
            _key: "b3-9", _type: "block", style: "normal",
            children: [{ _key: "s3-9", _type: "span", text: "• **9. वित्तीय सहयोग और डी-डॉलराइज़ेशन (Financial Cooperation)**: ब्रिक्स देशों के बीच स्थानीय मुद्राओं (Local Currencies) में द्विपक्षीय व्यापार और सीमा पार डिजिटल भुगतानों के अधिक उपयोग की संभावनाएँ तलाशना।" }],
          },
        ],
        bodyEn: [
          {
            _key: "b3-10", _type: "block", style: "normal",
            children: [{ _key: "s3-10", _type: "span", text: "The agenda of the 18th BRICS Summit 2026 under India's chairship focuses on 9 core priorities:" }],
          },
          {
            _key: "b3-11", _type: "block", style: "normal",
            children: [{ _key: "s3-11", _type: "span", text: "• **1. Global South Leadership**: Strengthening the collective voice of developing economies in global governance." }],
          },
          {
            _key: "b3-12", _type: "block", style: "normal",
            children: [{ _key: "s3-12", _type: "span", text: "• **2. Climate Action**: Promoting climate resilience, clean energy transitions, and sustainable development." }],
          },
          {
            _key: "b3-13", _type: "block", style: "normal",
            children: [{ _key: "s3-13", _type: "span", text: "• **3. Green Finance**: Encouraging climate finance mechanisms for sustainable green infrastructure projects." }],
          },
          {
            _key: "b3-14", _type: "block", style: "normal",
            children: [{ _key: "s3-14", _type: "span", text: "• **4. Digital Public Infrastructure (DPI)**: Expanding cooperation in DPI, digital payments (UPI, India Stack), and inclusive e-governance." }],
          },
          {
            _key: "b3-15", _type: "block", style: "normal",
            children: [{ _key: "s3-15", _type: "span", text: "• **5. Innovation & AI**: Fostering responsible Artificial Intelligence, startup ecosystems, and scientific research." }],
          },
          {
            _key: "b3-16", _type: "block", style: "normal",
            children: [{ _key: "s3-16", _type: "span", text: "• **6. Energy Transition**: Supporting sustainable clean energy systems and green hydrogen." }],
          },
          {
            _key: "b3-17", _type: "block", style: "normal",
            children: [{ _key: "s3-17", _type: "span", text: "• **7. Resilient Supply Chains**: Building diverse and reliable supply chains for critical minerals, food, and energy." }],
          },
          {
            _key: "b3-18", _type: "block", style: "normal",
            children: [{ _key: "s3-18", _type: "span", text: "• **8. Multilateral Reforms**: Advocating for reform in UNSC, IMF, World Bank, and WTO to reflect current geopolitical realities." }],
          },
          {
            _key: "b3-19", _type: "block", style: "normal",
            children: [{ _key: "s3-19", _type: "span", text: "• **9. Financial Cooperation**: Expanding local currency bilateral trade settlements and cross-border digital payments among BRICS+." }],
          },
        ],
      },

      /* ── 4. Significance of 18th BRICS Summit 2026 ───────────────── */
      {
        _key: "sec-significance",
        kind: "analysis",
        title: "18वें ब्रिक्स शिखर सम्मेलन 2026 का महत्व",
        titleEn: "Significance of the 18th BRICS Summit 2026",
        body: [
          {
            _key: "b4-0", _type: "block", style: "normal",
            children: [{ _key: "s4-0", _type: "span", text: "भारत की अध्यक्षता में आयोजित 18वां ब्रिक्स शिखर सम्मेलन 2026 महत्वपूर्ण है क्योंकि यह उभरती अर्थव्यवस्थाओं के बीच सहयोग को मजबूत करने और वैश्विक दक्षिण की प्राथमिकताओं को उजागर करने का अवसर प्रदान करता है:" }],
          },
          {
            _key: "b4-1", _type: "block", style: "normal",
            children: [{ _key: "s4-1", _type: "span", text: "• **ग्लोबल साउथ का सशक्तिकरण**: वैश्विक निर्णय लेने में विकासशील और उभरती अर्थव्यवस्थाओं की सामूहिक आवाज को मजबूत करता है।" }],
          },
          {
            _key: "b4-2", _type: "block", style: "normal",
            children: [{ _key: "s4-2", _type: "span", text: "• **वैश्विक शासन सुधार**: बहुपक्षीय संस्थानों को अधिक प्रतिनिधि और समावेशी बनाने के प्रयासों का समर्थन करता है।" }],
          },
          {
            _key: "b4-3", _type: "block", style: "normal",
            children: [{ _key: "s4-3", _type: "span", text: "• **जलवायु कार्रवाई**: जलवायु परिवर्तन, सतत विकास और हरित विकास पर बहुपक्षीय सहयोग को बढ़ावा देता है।" }],
          },
          {
            _key: "b4-4", _type: "block", style: "normal",
            children: [{ _key: "s4-4", _type: "span", text: "• **डिजिटल सहयोग**: डिजिटल सार्वजनिक अवसंरचना (DPI), प्रौद्योगिकी और डिजिटल समावेशन में सहयोग को प्रोत्साहित करता है।" }],
          },
          {
            _key: "b4-5", _type: "block", style: "normal",
            children: [{ _key: "s4-5", _type: "span", text: "• **आर्थिक सहयोग**: ब्रिक्स सदस्यों के बीच व्यापार, निवेश और वित्तीय सहयोग को बढ़ाने के अभूतपूर्व अवसर प्रदान करता है।" }],
          },
          {
            _key: "b4-6", _type: "block", style: "normal",
            children: [{ _key: "s4-6", _type: "span", text: "• **ऊर्जा संक्रमण**: स्वच्छ ऊर्जा, ऊर्जा सुरक्षा और टिकाऊ ऊर्जा प्रणालियों पर सहयोग को प्रोत्साहित करता है।" }],
          },
          {
            _key: "b4-7", _type: "block", style: "normal",
            children: [{ _key: "s4-7", _type: "span", text: "• **नवाचार**: प्रौद्योगिकी, अनुसंधान और नवाचार-आधारित आर्थिक विकास पर अधिक जोर देता है।" }],
          },
          {
            _key: "b4-8", _type: "block", style: "normal",
            children: [{ _key: "s4-8", _type: "span", text: "• **भारत की वैश्विक भूमिका**: वैश्विक विकास और अंतर्राष्ट्रीय सहयोग पर चर्चाओं को आकार देने में भारत की अग्रणी भूमिका को मजबूत करता है।" }],
          },
          {
            _key: "b4-9", _type: "block", style: "normal",
            children: [{ _key: "s4-9", _type: "span", text: "• **25 साल का मील का पत्थर**: यह शिखर सम्मेलन 2026 में आयोजित हो रहा है, जो 2001 में BRIC अवधारणा की शुरुआत के 25 साल बाद है, जो इस समूह के परिपक्व विकास को दर्शाता है।" }],
          },
        ],
        bodyEn: [
          {
            _key: "b4-10", _type: "block", style: "normal",
            children: [{ _key: "s4-10", _type: "span", text: "The significance of the 18th BRICS Summit 2026 under India's leadership:" }],
          },
          {
            _key: "b4-11", _type: "block", style: "normal",
            children: [{ _key: "s4-11", _type: "span", text: "• **Amplifying Global South**: Unifies emerging markets to demand equitable voting rights in global institutions." }],
          },
          {
            _key: "b4-12", _type: "block", style: "normal",
            children: [{ _key: "s4-12", _type: "span", text: "• **Global Governance Reform**: Pushes for democratic restructuring of the UN Security Council, IMF, and World Bank." }],
          },
          {
            _key: "b4-13", _type: "block", style: "normal",
            children: [{ _key: "s4-13", _type: "span", text: "• **25-Year Legacy**: Celebrates 25 years of the BRIC concept (2001–2026), proving its sustained global relevance." }],
          },
        ],
      },

      /* ── 5. BRICS Alliance & India's Strategic Interests (11 Points) ── */
      {
        _key: "sec-strategic-interests",
        kind: "analysis",
        title: "ब्रिक्स समूह और भारत के रणनीतिक हित (11 प्रमुख स्तंभ)",
        titleEn: "BRICS Alliance & India's Strategic Interests (11 Key Pillars)",
        body: [
          {
            _key: "b5-0", _type: "block", style: "normal",
            children: [{ _key: "s5-0", _type: "span", text: "BRICS मंच भारत के लिए न केवल आर्थिक बल्कि बहुआयामी भू-राजनीतिक एवं रणनीतिक हित साधने का एक प्रमुख साधन है:" }],
          },
          {
            _key: "b5-1", _type: "block", style: "normal",
            children: [{ _key: "s5-1", _type: "span", text: "• **1. रणनीतिक स्वायत्तता और बहु-संरेखण (Strategic Autonomy & Multi-alignment)**: ब्रिक्स भारत को किसी एक गुट पर निर्भर रहे बिना स्वतंत्र विदेश नीति बनाए रखते हुए प्रमुख वैश्विक शक्तियों (रूस, चीन, ब्राजील, मध्य-पूर्व) के साथ जुड़ने में मदद करता है।" }],
          },
          {
            _key: "b5-2", _type: "block", style: "normal",
            children: [{ _key: "s5-2", _type: "span", text: "• **2. वैश्विक दक्षिण का नेतृत्व (Global South Leadership)**: यह खाद्य सुरक्षा, जलवायु वित्त, स्वास्थ्य सेवा, कर्ज राहत और विकास से संबंधित विकासशील देशों की चिंताओं को उठाने में भारत की विश्वगुरु/अग्रणी भूमिका को मजबूत करता है।" }],
          },
          {
            _key: "b5-3", _type: "block", style: "normal",
            children: [{ _key: "s5-3", _type: "span", text: "• **3. वैश्विक शासन सुधार (Global Governance Reforms)**: ब्रिक्स संयुक्त राष्ट्र सुरक्षा परिषद (UNSC), अंतर्राष्ट्रीय मुद्रा कोष (IMF), विश्व बैंक और विश्व व्यापार संगठन (WTO) में स्थायी सदस्यता व अधिक प्रतिनिधित्व की भारत की मांग का पुरजोर समर्थन करता है।" }],
          },
          {
            _key: "b5-4", _type: "block", style: "normal",
            children: [{ _key: "s5-4", _type: "span", text: "• **4. अधिक राजनयिक प्रभाव (Diplomatic Influence)**: यह समूह भारत को वैश्विक आर्थिक, वित्तीय और भू-राजनीतिक मुद्दों पर चर्चा और अंतरराष्ट्रीय नियमों को आकार देने के लिए एक बड़ा मंच प्रदान करता है।" }],
          },
          {
            _key: "b5-5", _type: "block", style: "normal",
            children: [{ _key: "s5-5", _type: "span", text: "• **5. व्यापार और निर्यात विविधीकरण (Trade & Export Diversification)**: ब्रिक्स एशिया, अफ्रीका, लैटिन अमेरिका और पश्चिम एशिया (मिडिल ईस्ट) में तेजी से बढ़ते नए बाजारों तक सीधी पहुंच प्रदान करता है, जिससे भारत को अपने निर्यात बास्केट में विविधता लाने में मदद मिलती है।" }],
          },
          {
            _key: "b5-6", _type: "block", style: "normal",
            children: [{ _key: "s5-6", _type: "span", text: "• **6. ऊर्जा सुरक्षा (Energy Security)**: रूस, सऊदी अरब, ईरान और UAE जैसे प्रमुख तेल और गैस उत्पादकों के साथ ब्रिक्स के तहत सीधे सहयोग से भारत को रियायती, विश्वसनीय और विविध ऊर्जा आपूर्ति सुनिश्चित करने में मदद मिलती है।" }],
          },
          {
            _key: "b5-7", _type: "block", style: "normal",
            children: [{ _key: "s5-7", _type: "span", text: "• **7. महत्वपूर्ण खनिजों की सुरक्षा (Critical Minerals Security)**: संसाधन संपन्न ब्रिक्स सदस्य देशों (जैसे ब्राजील, दक्षिण अफ्रीका, रूस) के साथ साझेदारी से निकल, लिथियम, लौह अयस्क और दुर्लभ मृदा तत्वों (Rare Earth Elements) तक सुरक्षित पहुंच में सुधार होता है।" }],
          },
          {
            _key: "b5-8", _type: "block", style: "normal",
            children: [{ _key: "s5-8", _type: "span", text: "• **8. वैकल्पिक विकास वित्त (Alternative Development Finance - NDB)**: न्यू डेवलपमेंट बैंक (NDB) भारत की राष्ट्रीय अवसंरचना (Infrastructure), स्मार्ट सिटीज और सतत विकास परियोजनाओं के लिए बिना कठोर राजनीतिक शर्तों के अतिरिक्त वित्तपोषण प्रदान करता है।" }],
          },
          {
            _key: "b5-9", _type: "block", style: "normal",
            children: [{ _key: "s5-9", _type: "span", text: "• **9. वित्तीय स्वतंत्रता (Financial Independence & Local Currency Trade)**: स्थानीय मुद्रा (रुपया, रूबल, युआन, रियाल) में व्यापार और भुगतान प्रणालियों के उपयोग से अमेरिकी डॉलर पर अत्यधिक निर्भरता कम होती है और अंतरराष्ट्रीय लेन-देन लागत में बड़ी गिरावट आती है।" }],
          },
          {
            _key: "b5-10", _type: "block", style: "normal",
            children: [{ _key: "s5-10", _type: "span", text: "• **10. प्रौद्योगिकी और डिजिटल सहयोग (Technology & Digital Cooperation)**: ब्रिक्स एआई (AI), फिनटेक, डिजिटल सार्वजनिक अवसंरचना (DPI), अंतरिक्ष अनुसंधान और स्वास्थ्य सेवा में सहयोग के अवसर प्रदान करता है, जहां भारत अपने **UPI** और **India Stack** की वैश्विक सफलता का प्रदर्शन कर सकता है।" }],
          },
          {
            _key: "b5-11", _type: "block", style: "normal",
            children: [{ _key: "s5-11", _type: "span", text: "• **11. आपूर्ति श्रृंखला लचीलापन (Supply Chain Resilience)**: अधिक ब्रिक्स सहयोग से भारत के ऊर्जा, खनिज, खाद्य और औद्योगिक इनपुट के स्रोतों में विविधता लाई जा सकती है, जिससे वैश्विक भू-राजनीतिक व्यवधानों और युद्धों के प्रति संवेदनशीलता कम हो जाती है।" }],
          },
        ],
        bodyEn: [
          {
            _key: "b5-12", _type: "block", style: "normal",
            children: [{ _key: "s5-12", _type: "span", text: "India's strategic interests in the BRICS framework across 11 critical pillars:" }],
          },
          {
            _key: "b5-13", _type: "block", style: "normal",
            children: [{ _key: "s5-13", _type: "span", text: "• **1. Strategic Autonomy & Multi-alignment**: Balances ties with Western powers while deepening economic engagements with non-Western giants." }],
          },
          {
            _key: "b5-14", _type: "block", style: "normal",
            children: [{ _key: "s5-14", _type: "span", text: "• **2. Global South Leadership**: Champions debt sustainability, climate finance, and food security for developing economies." }],
          },
          {
            _key: "b5-15", _type: "block", style: "normal",
            children: [{ _key: "s5-15", _type: "span", text: "• **3. Global Governance Reforms**: Backs India's permanent seat ambition in the UNSC and voting quota reform in IMF/World Bank." }],
          },
          {
            _key: "b5-16", _type: "block", style: "normal",
            children: [{ _key: "s5-16", _type: "span", text: "• **4. Enhanced Diplomatic Influence**: Provides a powerful global platform to shape multilateral rules." }],
          },
          {
            _key: "b5-17", _type: "block", style: "normal",
            children: [{ _key: "s5-17", _type: "span", text: "• **5. Trade & Export Diversification**: Expands Indian exports into fast-growing Latin American, African, and Middle Eastern markets." }],
          },
          {
            _key: "b5-18", _type: "block", style: "normal",
            children: [{ _key: "s5-18", _type: "span", text: "• **6. Energy Security**: Partnerships with top hydrocarbon producers (Russia, Saudi Arabia, UAE, Iran) ensure affordable crude and gas." }],
          },
          {
            _key: "b5-19", _type: "block", style: "normal",
            children: [{ _key: "s5-19", _type: "span", text: "• **7. Critical Minerals Access**: Secures supply chains for Lithium, Nickel, and Rare Earth Elements essential for electric mobility and high-tech manufacturing." }],
          },
          {
            _key: "b5-20", _type: "block", style: "normal",
            children: [{ _key: "s5-20", _type: "span", text: "• **8. Alternative Development Finance**: NDB provides non-conditional long-term loans for Indian infrastructure and green projects." }],
          },
          {
            _key: "b5-21", _type: "block", style: "normal",
            children: [{ _key: "s5-21", _type: "span", text: "• **9. De-dollarisation & Local Currency Settlement**: Reduces US dollar dependency, mitigating currency volatility and transaction costs." }],
          },
          {
            _key: "b5-22", _type: "block", style: "normal",
            children: [{ _key: "s5-22", _type: "span", text: "• **10. Tech & DPI Showcase**: Showcases UPI and India Stack as global benchmarks for financial inclusion and AI governance." }],
          },
          {
            _key: "b5-23", _type: "block", style: "normal",
            children: [{ _key: "s5-23", _type: "span", text: "• **11. Supply Chain Resilience**: De-risks Indian industrial inputs from unilateral Western sanctions or global logistical shocks." }],
          },
        ],
      },

      /* ── 6. 18th Summit Key Facts Table & Theme ───────────────────── */
      {
        _key: "sec-key-facts-2026",
        kind: "keyHighlights",
        title: "18वां BRICS शिखर सम्मेलन 2026: एक नज़र में प्रमुख तथ्य",
        titleEn: "18th BRICS Summit 2026: Key Facts at a Glance",
        body: [
          {
            _key: "b6-1", _type: "block", style: "normal",
            children: [{ _key: "s6-1", _type: "span", text: "• **आयोजन तिथि**: 12–13 सितंबर 2026" }],
          },
          {
            _key: "b6-2", _type: "block", style: "normal",
            children: [{ _key: "s6-2", _type: "span", text: "• **मेजबान देश**: भारत (1 जनवरी 2026 से अध्यक्षता संभाली)" }],
          },
          {
            _key: "b6-3", _type: "block", style: "normal",
            children: [{ _key: "s6-3", _type: "span", text: "• **आयोजन स्थान**: भारत मंडपम, नई दिल्ली" }],
          },
          {
            _key: "b6-4", _type: "block", style: "normal",
            children: [{ _key: "s6-4", _type: "span", text: "• **भारत की अध्यक्षता**: चौथी बार (पूर्व अध्यक्षता: 2012, 2016, 2021)" }],
          },
          {
            _key: "b6-5", _type: "block", style: "normal",
            children: [{ _key: "s6-5", _type: "span", text: "• **अध्यक्ष**: प्रधानमंत्री नरेंद्र मोदी" }],
          },
          {
            _key: "b6-6", _type: "block", style: "normal",
            children: [{ _key: "s6-6", _type: "span", text: "• **आधिकारिक थीम**: *Building for Resilience, Innovation, Cooperation and Sustainability*" }],
          },
          {
            _key: "b6-7", _type: "block", style: "normal",
            children: [{ _key: "s6-7", _type: "span", text: "• **हिंदी अर्थ**: *लचीलापन, नवाचार, सहयोग और सततता के लिए निर्माण*" }],
          },
          {
            _key: "b6-8", _type: "block", style: "normal",
            children: [{ _key: "s6-8", _type: "span", text: "• **मूल दर्शन**: **'Humanity First' (मानवता प्रथम)**" }],
          },
          {
            _key: "b6-9", _type: "block", style: "normal",
            children: [{ _key: "s6-9", _type: "span", text: "• **आधिकारिक वेबसाइट**: brics2026.gov.in" }],
          },
          {
            _key: "b6-10", _type: "block", style: "normal",
            children: [{ _key: "s6-10", _type: "span", text: "तुलनात्मक अध्ययन: पढ़ें **[जी-7 शिखर सम्मेलन 2026](/current-affairs/g7-summit-2026-pm-modi-outreach-session)** में PM मोदी के संपर्क सत्र का संबोधन।" }],
          },
        ],
        bodyEn: [
          {
            _key: "b6-11", _type: "block", style: "normal",
            children: [{ _key: "s6-11", _type: "span", text: "• **Dates**: 12–13 September 2026" }],
          },
          {
            _key: "b6-12", _type: "block", style: "normal",
            children: [{ _key: "s6-12", _type: "span", text: "• **Host**: India (Chairship started 1 Jan 2026)" }],
          },
          {
            _key: "b6-13", _type: "block", style: "normal",
            children: [{ _key: "s6-13", _type: "span", text: "• **Venue**: Bharat Mandapam, New Delhi" }],
          },
          {
            _key: "b6-14", _type: "block", style: "normal",
            children: [{ _key: "s6-14", _type: "span", text: "• **India's Chairship Track**: 4th time (2012, 2016, 2021, 2026)" }],
          },
          {
            _key: "b6-15", _type: "block", style: "normal",
            children: [{ _key: "s6-15", _type: "span", text: "• **Official Theme**: *Building for Resilience, Innovation, Cooperation and Sustainability* ('Humanity First')" }],
          },
        ],
      },

      /* ── 7. BRICS Members (11 Full Members) & Partner Countries ──── */
      {
        _key: "sec-members-expansion",
        kind: "analysis",
        title: "BRICS के 11 सदस्य देश एवं 10 पार्टनर कंट्रीज़",
        titleEn: "BRICS 11 Full Member Countries & 10 Partner Nations",
        body: [
          {
            _key: "b7-1", _type: "block", style: "h3",
            children: [{ _key: "s7-1", _type: "span", text: "1. 11 पूर्ण सदस्य देश (Full Members)" }],
          },
          {
            _key: "b7-2", _type: "block", style: "normal",
            children: [{ _key: "s7-2", _type: "span", text: "• **मूल 5 सदस्य**: ब्राज़ील, रूस, भारत, चीन, दक्षिण अफ्रीका" }],
          },
          {
            _key: "b7-3", _type: "block", style: "normal",
            children: [{ _key: "s7-3", _type: "span", text: "• **2024 विस्तार (5 सदस्य)**: मिस्र (Egypt), इथियोपिया (Ethiopia), ईरान (Iran), सऊदी अरब (Saudi Arabia), संयुक्त अरब अमीरात (UAE)" }],
          },
          {
            _key: "b7-4", _type: "block", style: "normal",
            children: [{ _key: "s7-4", _type: "span", text: "• **2025 विस्तार (1 सदस्य)**: इंडोनेशिया (Indonesia)" }],
          },
          {
            _key: "b7-5", _type: "block", style: "h3",
            children: [{ _key: "s7-5", _type: "span", text: "2. 10 पार्टनर देश (Partner Countries)" }],
          },
          {
            _key: "b7-6", _type: "block", style: "normal",
            children: [{ _key: "s7-6", _type: "span", text: "बेलारूस, बोलीविया, क्यूबा, कज़ाख़स्तान, मलेशिया, नाइजीरिया, थाईलैंड, युगांडा, उज़्बेकिस्तान और वियतनाम।" }],
          },
        ],
        bodyEn: [
          {
            _key: "b7-7", _type: "block", style: "h3",
            children: [{ _key: "s7-7", _type: "span", text: "1. 11 Full Member States" }],
          },
          {
            _key: "b7-8", _type: "block", style: "normal",
            children: [{ _key: "s7-8", _type: "span", text: "Brazil, Russia, India, China, South Africa, Egypt, Ethiopia, Iran, Saudi Arabia, UAE, and Indonesia." }],
          },
          {
            _key: "b7-9", _type: "block", style: "h3",
            children: [{ _key: "s7-9", _type: "span", text: "2. 10 Partner Countries" }],
          },
          {
            _key: "b7-10", _type: "block", style: "normal",
            children: [{ _key: "s7-10", _type: "span", text: "Belarus, Bolivia, Cuba, Kazakhstan, Malaysia, Nigeria, Thailand, Uganda, Uzbekistan, and Vietnam." }],
          },
        ],
      },

      /* ── 8. Prominent Global Leaders ──────────────────────────────── */
      {
        _key: "sec-attendees",
        kind: "keyHighlights",
        title: "18वें शिखर सम्मेलन में भाग लेने वाले प्रमुख वैश्विक नेता",
        titleEn: "Prominent Global Leaders Attending the 18th Summit",
        body: [
          {
            _key: "b8-1", _type: "block", style: "normal",
            children: [{ _key: "s8-1", _type: "span", text: "• रूसी राष्ट्रपति **व्लादिमीर पुतिन (Vladimir Putin)**" }],
          },
          {
            _key: "b8-2", _type: "block", style: "normal",
            children: [{ _key: "s8-2", _type: "span", text: "• चीनी राष्ट्रपति **शी जिनपिंग (Xi Jinping)**" }],
          },
          {
            _key: "b8-3", _type: "block", style: "normal",
            children: [{ _key: "s8-3", _type: "span", text: "• दक्षिण अफ्रीकी राष्ट्रपति **सिरिल रामाफोसा (Cyril Ramaphosa)**" }],
          },
          {
            _key: "b8-4", _type: "block", style: "normal",
            children: [{ _key: "s8-4", _type: "span", text: "• ईरानी राष्ट्रपति **मसूद पेज़ेश्कियान (Masoud Pezeshkian)**" }],
          },
          {
            _key: "b8-5", _type: "block", style: "normal",
            children: [{ _key: "s8-5", _type: "span", text: "• इंडोनेशियाई राष्ट्रपति **प्रबोवो सुबियांतो (Prabowo Subianto)**" }],
          },
          {
            _key: "b8-6", _type: "block", style: "normal",
            children: [{ _key: "s8-6", _type: "span", text: "• मिस्र के राष्ट्रपति **अब्देल फतह अल-सिसी (Abdel Fattah el-Sisi)**" }],
          },
          {
            _key: "b8-7", _type: "block", style: "normal",
            children: [{ _key: "s8-7", _type: "span", text: "• इथियोपिया के प्रधानमंत्री **आबी अहमद (Abiy Ahmed)**" }],
          },
          {
            _key: "b8-8", _type: "block", style: "normal",
            children: [{ _key: "s8-8", _type: "span", text: "• अबू धाबी के क्राउन प्रिंस **खालेद बिन मोहम्मद बिन ज़ायद अल नाहयान**" }],
          },
          {
            _key: "b8-9", _type: "block", style: "normal",
            children: [{ _key: "s8-9", _type: "span", text: "• ब्राज़ील के विदेश मंत्री **मौरो विएरा (Mauro Vieira)**" }],
          },
          {
            _key: "b8-10", _type: "block", style: "normal",
            children: [{ _key: "s8-10", _type: "span", text: "• इसके अलावा मलेशिया, वियतनाम, फिलीपींस के नेता तथा **WHO प्रमुख डॉ. टेड्रोस एडनॉम गेब्रेयसस** एवं **WTO महानिदेशक डॉ. न्गोज़ी ओकोन्जो-इवेला** ने सहभागिता की।" }],
          },
        ],
        bodyEn: [
          {
            _key: "b8-11", _type: "block", style: "normal",
            children: [{ _key: "s8-11", _type: "span", text: "• Russian President **Vladimir Putin**" }],
          },
          {
            _key: "b8-12", _type: "block", style: "normal",
            children: [{ _key: "s8-12", _type: "span", text: "• Chinese President **Xi Jinping**" }],
          },
          {
            _key: "b8-13", _type: "block", style: "normal",
            children: [{ _key: "s8-13", _type: "span", text: "• South African President **Cyril Ramaphosa**" }],
          },
          {
            _key: "b8-14", _type: "block", style: "normal",
            children: [{ _key: "s8-14", _type: "span", text: "• Iranian President **Masoud Pezeshkian**" }],
          },
          {
            _key: "b8-15", _type: "block", style: "normal",
            children: [{ _key: "s8-15", _type: "span", text: "• Indonesian President **Prabowo Subianto**" }],
          },
          {
            _key: "b8-16", _type: "block", style: "normal",
            children: [{ _key: "s8-16", _type: "span", text: "• Egyptian President **Abdel Fattah el-Sisi**" }],
          },
          {
            _key: "b8-17", _type: "block", style: "normal",
            children: [{ _key: "s8-17", _type: "span", text: "• Ethiopian Prime Minister **Abiy Ahmed**" }],
          },
          {
            _key: "b8-18", _type: "block", style: "normal",
            children: [{ _key: "s8-18", _type: "span", text: "• Heads of WHO (**Dr. Tedros Adhanom Ghebreyesus**) and WTO (**Dr. Ngozi Okonjo-Iweala**)." }],
          },
        ],
      },

      /* ── 9. NDB (New Development Bank) ────────────────────────────── */
      {
        _key: "sec-ndb",
        kind: "background",
        title: "NDB (New Development Bank / ब्रिक्स बैंक) का ढांचा",
        titleEn: "New Development Bank (NDB / BRICS Bank) Structure",
        body: [
          {
            _key: "b9-1", _type: "block", style: "normal",
            children: [{ _key: "s9-1", _type: "span", text: "• **पूरा नाम**: New Development Bank (पूर्व नाम: BRICS Bank)" }],
          },
          {
            _key: "b9-2", _type: "block", style: "normal",
            children: [{ _key: "s9-2", _type: "span", text: "• **स्थापना**: 2014 के फोर्टालेज़ा (Fortaleza), ब्राज़ील शिखर सम्मेलन के दौरान समझौता। 2015 से परिचालन शुरू।" }],
          },
          {
            _key: "b9-3", _type: "block", style: "normal",
            children: [{ _key: "s9-3", _type: "span", text: "• **मुख्यालय**: **शंघाई, चीन (Shanghai, China)**" }],
          },
          {
            _key: "b9-4", _type: "block", style: "normal",
            children: [{ _key: "s9-4", _type: "span", text: "• **प्रारंभिक अधिकृत पूंजी**: $100 बिलियन डॉलर (संस्थापक 5 देशों की समान शेयरधारिता व मताधिकार)।" }],
          },
          {
            _key: "b9-5", _type: "block", style: "normal",
            children: [{ _key: "s9-5", _type: "span", text: "• **उद्देश्य**: उभरती अर्थव्यवस्थाओं में बुनियादी ढांचे (Infrastructure) और सतत विकास परियोजनाओं को समर्थन देना।" }],
          },
        ],
        bodyEn: [
          {
            _key: "b9-6", _type: "block", style: "normal",
            children: [{ _key: "s9-6", _type: "span", text: "• **Full Name**: New Development Bank (formerly BRICS Bank)" }],
          },
          {
            _key: "b9-7", _type: "block", style: "normal",
            children: [{ _key: "s9-7", _type: "span", text: "• **Establishment**: 2014 Fortaleza Declaration; operationalized in 2015." }],
          },
          {
            _key: "b9-8", _type: "block", style: "normal",
            children: [{ _key: "s9-8", _type: "span", text: "• **Headquarters**: **Shanghai, China**" }],
          },
          {
            _key: "b9-9", _type: "block", style: "normal",
            children: [{ _key: "s9-9", _type: "span", text: "• **Objective**: Financial support for infrastructure and clean energy in emerging and developing markets." }],
          },
        ],
      },

      /* ── 10. Cultural Diplomacy: Thirukkural Gift ────────────────── */
      {
        _key: "sec-thirukkural",
        kind: "analysis",
        title: "सांस्कृतिक कूटनीति: PM मोदी ने पुतिन को भेंट किया 'तिरुक्कुरल'",
        titleEn: "Cultural Diplomacy: PM Modi Gifts 'Thirukkural' to Putin",
        body: [
          {
            _key: "b10-1", _type: "block", style: "normal",
            children: [{ _key: "s10-1", _type: "span", text: "प्रधानमंत्री नरेंद्र मोदी ने रूसी राष्ट्रपति व्लादिमीर पुतिन को महान प्राचीन तमिल ग्रंथ **'तिरुक्कुरल' (Thirukkural)** का रूसी अनुवाद भेंट किया।" }],
          },
          {
            _key: "b10-2", _type: "block", style: "h3",
            children: [{ _key: "s10-2", _type: "span", text: "'तिरुक्कुरल' से जुड़े प्रमुख परीक्षा उपयोगी तथ्य:" }],
          },
          {
            _key: "b10-3", _type: "block", style: "normal",
            children: [{ _key: "s10-3", _type: "span", text: "• **रचयिता**: महान तमिल संत, कवि एवं दार्शनिक **तिरुवल्लुवर (Thiruvalluvar)**।" }],
          },
          {
            _key: "b10-4", _type: "block", style: "normal",
            children: [{ _key: "s10-4", _type: "span", text: "• **संरचना**: कुल **1,330 कुराल (दोहे)** हैं, जो 133 अध्यायों में विभाजित हैं।" }],
          },
          {
            _key: "b10-5", _type: "block", style: "normal",
            children: [{ _key: "s10-5", _type: "span", text: "• **तीन भाग (मुप्पाल / Muppaal)**: 1. **अरम (Aram)**: धर्म व नैतिकता, 2. **पोरुल (Porul)**: अर्थ, सुशासन व राजनीति, 3. **इनबम/कामम (Inbam/Kamam)**: प्रेम व मानवीय भावनाएं।" }],
          },
          {
            _key: "b10-6", _type: "block", style: "normal",
            children: [{ _key: "s10-6", _type: "span", text: "• **उपनाम**: इसे तमिल साहित्य में **'तमिल वेद'** या **'पंचम वेद'** भी कहा जाता है और इसका 100 से अधिक भाषाओं में अनुवाद हुआ है।" }],
          },
          {
            _key: "b10-7", _type: "block", style: "normal",
            children: [{ _key: "s10-7", _type: "span", text: "सांस्कृतिक विरासत संबंधी लेख पढ़ें: **[जीआई टैग एवं भारतीय कला व संस्कृति](/general-awareness)**।" }],
          },
        ],
        bodyEn: [
          {
            _key: "b10-8", _type: "block", style: "normal",
            children: [{ _key: "s10-8", _type: "span", text: "PM Modi gifted a Russian translation of Thirukkural to President Vladimir Putin." }],
          },
          {
            _key: "b10-9", _type: "block", style: "h3",
            children: [{ _key: "s10-9", _type: "span", text: "Key Thirukkural Exam Facts:" }],
          },
          {
            _key: "b10-10", _type: "block", style: "normal",
            children: [{ _key: "s10-10", _type: "span", text: "• **Author**: Saint Thiruvalluvar. Contains 1,330 couplets in 3 sections: Aram (Ethics), Porul (Governance), Inbam (Love). Known as 'Tamil Veda'." }],
          },
        ],
      },

      /* ── 11. Exam Importance (MPPSC & UPSC) ───────────────────────── */
      {
        _key: "sec-exam-importance",
        kind: "analysis",
        title: "परीक्षा दृष्टिकोण: MPPSC एवं UPSC के लिए क्यों महत्वपूर्ण है?",
        titleEn: "Exam Relevance for MPPSC & UPSC Aspirants",
        body: [
          {
            _key: "b11-1", _type: "block", style: "normal",
            children: [{ _key: "s11-1", _type: "span", text: "• **MPPSC प्रारंभिक परीक्षा**: BRICS के 11 सदस्य देश, 2001 में जिम ओ'नील द्वारा प्रतिपादित 25 साल की यात्रा, 2026 की थीम ('Humanity First'), NDB शंघाई मुख्यालय और तिरुक्कुरल के 3 मुप्पााल भागों पर 1-अंकीय फैक्चुअल प्रश्न।" }],
          },
          {
            _key: "b11-2", _type: "block", style: "normal",
            children: [{ _key: "s11-2", _type: "span", text: "• **MPPSC मुख्य परीक्षा (GS-2 अंतर्राष्ट्रीय संबंध)**: 'ब्रिक्स समूह और भारत के 11 रणनीतिक हित', 'वैश्विक दक्षिण (Global South) का नेतृत्व', 'डी-डॉलराइज़ेशन व स्थानीय मुद्रा व्यापार' तथा 'UNSC/IMF सुधारों' पर 11-अंकीय दीर्घ उत्तरीय प्रश्न।" }],
          },
          {
            _key: "b11-3", _type: "block", style: "normal",
            children: [{ _key: "s11-3", _type: "span", text: "अपनी तैयारी को और बेहतर बनाएं: **[MPPSC ऑनलाइन कोचिंग एवं टेस्ट सीरीज](/online-courses)** से जुड़ें।" }],
          },
        ],
        bodyEn: [
          {
            _key: "b11-4", _type: "block", style: "normal",
            children: [{ _key: "s11-4", _type: "span", text: "• **MPPSC Prelims**: Objective questions on 11 members, 25-year milestone, NDB Shanghai HQ, and Thirukkural." }],
          },
          {
            _key: "b11-5", _type: "block", style: "normal",
            children: [{ _key: "s11-5", _type: "span", text: "• **MPPSC Mains GS-2**: Long analytical questions on India's 11 strategic interests, Global South leadership, and de-dollarisation." }],
          },
          {
            _key: "b11-6", _type: "block", style: "normal",
            children: [{ _key: "s11-6", _type: "span", text: "Join **[Aakar IAS Online Courses](/en/online-courses)**." }],
          },
        ],
      },

      /* ── 12. Timeline Table at a Glance ───────────────────────────── */
      {
        _key: "sec-timeline-table",
        kind: "analysis",
        title: "एक नजर में टाइमलाइन (BRICS Milestones 2001–2026)",
        titleEn: "Timeline at a Glance (BRICS Milestones 2001–2026)",
        body: [
          {
            _key: "b12-1", _type: "block", style: "normal",
            children: [{ _key: "s12-1", _type: "span", text: "• **2001**: अर्थशास्त्री जिम ओ'नील द्वारा 'BRIC' शब्द प्रतिपादित।" }],
          },
          {
            _key: "b12-2", _type: "block", style: "normal",
            children: [{ _key: "s12-2", _type: "span", text: "• **2006**: BRIC की पहली औपचारिक विदेश मंत्री स्तरीय बैठक।" }],
          },
          {
            _key: "b12-3", _type: "block", style: "normal",
            children: [{ _key: "s12-3", _type: "span", text: "• **2009**: पहला BRIC शिखर सम्मेलन (येकातेरिनबर्ग, रूस)।" }],
          },
          {
            _key: "b12-4", _type: "block", style: "normal",
            children: [{ _key: "s12-4", _type: "span", text: "• **2010**: दक्षिण अफ्रीका शामिल, नाम बदलकर BRICS हुआ।" }],
          },
          {
            _key: "b12-5", _type: "block", style: "normal",
            children: [{ _key: "s12-5", _type: "span", text: "• **2024**: बड़ा विस्तार (मिस्र, इथियोपिया, ईरान, UAE, सऊदी अरब शामिल)।" }],
          },
          {
            _key: "b12-6", _type: "block", style: "normal",
            children: [{ _key: "s12-6", _type: "span", text: "• **2025**: इंडोनेशिया 11वें पूर्ण सदस्य के रूप में जुड़ा।" }],
          },
          {
            _key: "b12-7", _type: "block", style: "normal",
            children: [{ _key: "s12-7", _type: "span", text: "• **2026**: भारत की अध्यक्षता में 18वां शिखर सम्मेलन (नई दिल्ली) — BRIC अवधारणा के **25 साल पूरे**।" }],
          },
        ],
        bodyEn: [
          {
            _key: "b12-8", _type: "block", style: "normal",
            children: [{ _key: "s12-8", _type: "span", text: "• **2001**: Jim O'Neill coins 'BRIC'." }],
          },
          {
            _key: "b12-9", _type: "block", style: "normal",
            children: [{ _key: "s12-9", _type: "span", text: "• **2006**: First formal foreign ministers meeting." }],
          },
          {
            _key: "b12-10", _type: "block", style: "normal",
            children: [{ _key: "s12-10", _type: "span", text: "• **2009**: 1st BRIC Summit in Yekaterinburg, Russia." }],
          },
          {
            _key: "b12-11", _type: "block", style: "normal",
            children: [{ _key: "s12-11", _type: "span", text: "• **2010**: South Africa joins; group renamed BRICS." }],
          },
          {
            _key: "b12-12", _type: "block", style: "normal",
            children: [{ _key: "s12-12", _type: "span", text: "• **2024**: Major expansion (Egypt, Ethiopia, Iran, UAE, Saudi Arabia)." }],
          },
          {
            _key: "b12-13", _type: "block", style: "normal",
            children: [{ _key: "s12-13", _type: "span", text: "• **2025**: Indonesia becomes 11th full member." }],
          },
          {
            _key: "b12-14", _type: "block", style: "normal",
            children: [{ _key: "s12-14", _type: "span", text: "• **2026**: 18th BRICS Summit in New Delhi under India Chairship — **25th Anniversary Milestone**." }],
          },
        ],
      },
    ],

    /* ─── COLLAPSIBLE FAQS (10 High-Value SEO & PAA FAQs) ───────────────── */
    faqs: [
      {
        _key: "faq-1",
        question: "18वां BRICS शिखर सम्मेलन 2026 कहाँ और कब आयोजित हुआ?",
        questionEn: "Where and when was the 18th BRICS Summit 2026 held?",
        answer: "18वां BRICS शिखर सम्मेलन 12–13 सितंबर 2026 को भारत की अध्यक्षता में भारत मंडपम, नई दिल्ली (भारत) में आयोजित किया गया।",
        answerEn: "The 18th BRICS Summit was held on 12–13 September 2026 at Bharat Mandapam, New Delhi under India's chairship.",
      },
      {
        _key: "faq-2",
        question: "BRICS 2026 की आधिकारिक थीम (विषय) क्या है?",
        questionEn: "What is the official theme of BRICS 2026 under India's presidency?",
        answer: "BRICS 2026 की थीम 'Building for Resilience, Innovation, Cooperation and Sustainability' (लचीलापन, नवाचार, सहयोग और सततता के लिए निर्माण) है, जिसका मूल दर्शन 'Humanity First' (मानवता प्रथम) है।",
        answerEn: "The official theme is 'Building for Resilience, Innovation, Cooperation and Sustainability', guided by the core philosophy of 'Humanity First'.",
      },
      {
        _key: "faq-3",
        question: "वर्ष 2026 में BRICS समूह में कुल कितने पूर्ण सदस्य देश हैं?",
        questionEn: "How many full member countries belong to BRICS as of 2026?",
        answer: "वर्ष 2026 तक BRICS में कुल 11 पूर्ण सदस्य देश हैं: ब्राज़ील, रूस, भारत, चीन, दक्षिण अफ्रीका, मिस्र, इथियोपिया, ईरान, संयुक्त अरब अमीरात (UAE), सऊदी अरब और इंडोनेशिया।",
        answerEn: "As of 2026, BRICS comprises 11 full member states: Brazil, Russia, India, China, South Africa, Egypt, Ethiopia, Iran, UAE, Saudi Arabia, and Indonesia.",
      },
      {
        _key: "faq-4",
        question: "BRIC शब्द की शुरुआत कब हुई और 2026 में इसका क्या महत्व है?",
        questionEn: "When was the BRIC concept introduced and why is 2026 significant?",
        answer: "BRIC शब्द का प्रतिपादन वर्ष 2001 में अर्थशास्त्री जिम ओ'नील ने किया था। वर्ष 2026 में BRIC अवधारणा की शुरुआत के 25 साल (25-Year Milestone) पूरे हो चुके हैं, जो इस समूह की वैश्विक सफलता को दर्शाता है।",
        answerEn: "The term BRIC was coined by Jim O'Neill in 2001. The year 2026 marks the 25-year milestone of the BRIC concept.",
      },
      {
        _key: "faq-5",
        question: "18वें ब्रिक्स शिखर सम्मेलन 2026 के एजेंडे में कौन से 9 प्रमुख क्षेत्र शामिल हैं?",
        questionEn: "What are the 9 core focus areas of the 18th BRICS Summit 2026 agenda?",
        answer: "एजेंडे में 9 मुख्य बिंदु हैं: 1. ग्लोबल साउथ का नेतृत्व, 2. जलवायु कार्रवाई, 3. ग्रीन फाइनेंस, 4. डिजिटल सार्वजनिक अवसंरचना (DPI/UPI), 5. नवाचार और AI, 6. ऊर्जा संक्रमण, 7. लचीली आपूर्ति श्रृंखलाएं (क्रिटिकल मिनरल्स), 8. बहुपक्षीय सुधार (UNSC/IMF), और 9. स्थानीय मुद्रा में वित्तीय व्यापार।",
        answerEn: "The 9 core areas include Global South leadership, climate action, green finance, DPI (UPI/India Stack), AI innovation, energy transition, supply chain resilience, multilateral reforms, and local currency trade.",
      },
      {
        _key: "faq-6",
        question: "ब्रिक्स समूह और भारत के कौन से 11 प्रमुख रणनीतिक हित हैं?",
        questionEn: "What are the 11 key strategic interests of India in BRICS?",
        answer: "भारत के 11 रणनीतिक हित हैं: 1. रणनीतिक स्वायत्तता, 2. ग्लोबल साउथ नेतृत्व, 3. वैश्विक शासन सुधार (UNSC), 4. राजनयिक प्रभाव, 5. व्यापार विविधीकरण, 6. ऊर्जा सुरक्षा, 7. महत्वपूर्ण खनिज सुरक्षा, 8. NDB विकास वित्त, 9. डी-डॉलराइज़ेशन व स्थानीय मुद्रा व्यापार, 10. DPI व UPI प्रदर्शन, 11. आपूर्ति श्रृंखला लचीलापन।",
        answerEn: "India's 11 strategic interests span strategic autonomy, Global South leadership, UNSC/IMF reforms, diplomatic influence, trade diversification, energy security, critical minerals access, NDB funding, local currency settlement, DPI/UPI showcase, and supply chain resilience.",
      },
      {
        _key: "faq-7",
        question: "न्यू डेवलपमेंट बैंक (NDB / BRICS Bank) का मुख्यालय कहाँ स्थित है?",
        questionEn: "Where is the headquarters of the New Development Bank (NDB)?",
        answer: "NDB (न्यू डेवलपमेंट बैंक) का मुख्यालय शंघाई, चीन में स्थित है। इसकी स्थापना 2014 के फोर्टालेज़ा घोषणापत्र के तहत हुई थी।",
        answerEn: "The headquarters of the New Development Bank (NDB) is located in Shanghai, China. It was established under the 2014 Fortaleza Declaration.",
      },
      {
        _key: "faq-8",
        question: "PM नरेंद्र मोदी ने रूसी राष्ट्रपति व्लादिमीर पुतिन को कौन सी प्रसिद्ध पुस्तक भेंट की?",
        questionEn: "Which literary classic did PM Modi gift to Russian President Vladimir Putin?",
        answer: "PM मोदी ने व्लादिमीर पुतिन को महान तमिल संत-कवि तिरुवल्लुवर द्वारा रचित प्राचीन ग्रंथ 'तिरुक्कुरल' का रूसी अनुवाद भेंट किया।",
        answerEn: "PM Modi presented a Russian translation of 'Thirukkural', authored by ancient Tamil saint Thiruvalluvar, to Vladimir Putin.",
      },
      {
        _key: "faq-9",
        question: "'तिरुक्कुरल' ग्रंथ के तीन प्रमुख भाग कौन से हैं और इसे क्या कहा जाता है?",
        questionEn: "What are the three sections of Thirukkural and what title is given to it?",
        answer: "तिरुक्कुरल में 1,330 कुराल (दोहे) हैं जो तीन भागों—अरम (नैतिकता), पोरुल (सुशासन/अर्थ), और इनबम (प्रेम)—में विभाजित हैं। इसे तमिल परंपरा में 'तमिल वेद' या 'पंचम वेद' कहा जाता है।",
        answerEn: "Thirukkural has 1,330 couplets in 3 sections: Aram (Ethics), Porul (Governance), and Inbam (Love). It is revered as the 'Tamil Veda' or 'Pancham Veda'.",
      },
      {
        _key: "faq-10",
        question: "MPPSC परीक्षा के दृष्टिकोण से BRICS 2026 का क्या महत्व है?",
        questionEn: "What is the significance of BRICS 2026 for MPPSC & UPSC examinations?",
        answer: "यह विषय MPPSC प्रारंभिक (1-अंकीय तथ्य) एवं मुख्य परीक्षा (GS-2 अंतर्राष्ट्रीय संबंध 11-अंकीय उत्तर लेखन) दोनों के लिए अत्यंत महत्वपूर्ण है। इसमें भारत के रणनीतिक हित, डी-डॉलराइज़ेशन, NDB बैंक सुधार और Global South कूटनीति पर सीधे प्रश्न आते हैं।",
        answerEn: "BRICS 2026 is vital for MPPSC & UPSC Prelims and Mains (GS-2 International Relations), testing India's foreign policy, multipolarity, de-dollarisation, NDB reforms, and Global South leadership.",
      },
    ],

    /* ─── PRACTICE MCQS (Exactly 8 High-Quality Exam Quizzes) ───────────── */
    mcqs: [
      {
        _key: "mcq-1",
        question: "18वें BRICS शिखर सम्मेलन 2026 से संबंधित निम्नलिखित कथनों पर विचार कीजिए:\n1. इसका आयोजन 12-13 सितंबर 2026 को भारत मंडपम, नई दिल्ली में हुआ।\n2. वर्ष 2026 में ब्रिक (BRIC) अवधारणा के 25 वर्ष पूरे हुए हैं।\n3. 2026 की आधिकारिक थीम 'Building for Resilience, Innovation, Cooperation and Sustainability' है।\nउपरोक्त में से कौन से कथन सही हैं?",
        questionEn: "Consider the following statements regarding the 18th BRICS Summit 2026:\n1. It was held on 12–13 September 2026 at Bharat Mandapam, New Delhi.\n2. The year 2026 marks 25 years of the BRIC concept.\n3. The official theme for 2026 is 'Building for Resilience, Innovation, Cooperation and Sustainability'.\nWhich of the statements given above are correct?",
        options: ["केवल 1 और 2", "केवल 2 और 3", "केवल 1 और 3", "1, 2 और 3 सभी"],
        optionsEn: ["Only 1 and 2", "Only 2 and 3", "Only 1 and 3", "1, 2 and 3 All"],
        correctIndex: 3,
        explanation: "तीनों कथन सही हैं। 18वां BRICS शिखर सम्मेलन 12-13 सितंबर 2026 को नई दिल्ली में आयोजित हुआ। 2001 में जिम ओ'नील द्वारा प्रतिपादित ब्रिक अवधारणा के 2026 में 25 वर्ष पूरे हो गए।",
        explanationEn: "All three statements are correct. The 18th Summit took place on 12-13 September 2026 in New Delhi. The year 2026 marks 25 years since Jim O'Neill coined BRIC in 2001.",
      },
      {
        _key: "mcq-2",
        question: "भारत के 18वें ब्रिक्स शिखर सम्मेलन 2026 के एजेंडे में निम्नलिखित में से कौन सा बिंदु शामिल नहीं है?",
        questionEn: "Which of the following points is NOT part of India's agenda for the 18th BRICS Summit 2026?",
        options: [
          "डिजिटल सार्वजनिक अवसंरचना (DPI, UPI व India Stack) का विस्तार",
          "स्थानीय मुद्राओं में व्यापार और डी-डॉलराइज़ेशन को बढ़ावा",
          "एकल साझा BRICS मुद्रा अनिवार्य रूप से लागू करना",
          "क्रिटिकल मिनरल्स हेतु लचीली आपूर्ति श्रृंखलाओं का निर्माण"
        ],
        optionsEn: [
          "Expanding Digital Public Infrastructure (DPI, UPI & India Stack)",
          "Promoting local currency trade and de-dollarisation",
          "Mandatorily implementing a single unified BRICS currency",
          "Building resilient supply chains for critical minerals"
        ],
        correctIndex: 2,
        explanation: "एकल साझा मुद्रा का अनिवार्य कार्यान्वयन एजेंडे में शामिल नहीं है; इसके बजाय ब्रिक्स देशों के बीच स्थानीय मुद्राओं (Local Currencies) में द्विपक्षीय व्यापार और भुगतान प्रणालियों को बढ़ावा देने पर बल दिया गया है।",
        explanationEn: "A single unified BRICS currency is not on the agenda; instead, bilateral trade in local currencies and cross-border digital payments are emphasized.",
      },
      {
        _key: "mcq-3",
        question: "वर्ष 2026 तक BRICS समूह के पूर्ण सदस्य देशों की कुल संख्या कितनी हो चुकी है?",
        questionEn: "What is the total number of full member countries in BRICS as of 2026?",
        options: ["5", "8", "11", "15"],
        optionsEn: ["5", "8", "11", "15"],
        correctIndex: 2,
        explanation: "वर्ष 2026 तक BRICS में 11 पूर्ण सदस्य देश हैं: मूल 5 (ब्राज़ील, रूस, भारत, चीन, दक्षिण अफ्रीका) + 2024 में जुड़े (मिस्र, इथियोपिया, ईरान, सऊदी अरब, UAE) + 2025 में जुड़ा इंडोनेशिया।",
        explanationEn: "As of 2026, BRICS comprises 11 full member countries following expansions in 2024 (Egypt, Ethiopia, Iran, UAE, Saudi Arabia) and 2025 (Indonesia).",
      },
      {
        _key: "mcq-4",
        question: "न्यू डेवलपमेंट बैंक (NDB / BRICS Bank) के संबंध में कौन सा कथन सत्य है?",
        questionEn: "Which statement is true regarding the New Development Bank (NDB)?",
        options: [
          "इसका मुख्यालय नई दिल्ली, भारत में स्थित है",
          "इसकी स्थापना 2014 के फोर्टालेज़ा घोषणापत्र के तहत हुई और मुख्यालय शंघाई में है",
          "यह केवल यूरोपीय संघ के देशों को विकास ऋण देता है",
          "इसमें केवल संस्थापक 5 देशों की ही शेयरधारिता संभव है"
        ],
        optionsEn: [
          "Its headquarters is located in New Delhi, India",
          "It was established under 2014 Fortaleza Declaration and is headquartered in Shanghai",
          "It exclusively funds EU nations",
          "Only original 5 founding nations can hold equity"
        ],
        correctIndex: 1,
        explanation: "NDB का गठन 2014 में फोर्टालेज़ा (ब्राज़ील) में हुए 6ठे BRICS शिखर सम्मेलन में हस्ताक्षरित समझौते के तहत हुआ था और इसका मुख्यालय शंघाई, चीन में है।",
        explanationEn: "NDB was established via the 2014 Fortaleza Declaration during the 6th Summit and has its headquarters in Shanghai, China.",
      },
      {
        _key: "mcq-5",
        question: "PM मोदी द्वारा 18वें BRICS शिखर सम्मेलन में व्लादिमीर पुतिन को भेंट की गई पुस्तक 'तिरुक्कुरल' के संबंध में कौन सा कथन गलत है?",
        questionEn: "Which statement is incorrect regarding 'Thirukkural', gifted by PM Modi to Vladimir Putin?",
        options: [
          "इसके रचयिता प्रसिद्ध तमिल संत व दार्शनिक तिरुवल्लुवर हैं",
          "इसमें 1,330 कुराल (दोहे) हैं जो अरम, पोरुल और इनबम भागों में विभाजित हैं",
          "इसे तमिल परंपरा में 'तमिल वेद' या 'पंचम वेद' भी कहा जाता है",
          "यह केवल तमिल में उपलब्ध है और इसका विदेशी भाषाओं में अनुवाद नहीं हुआ है"
        ],
        optionsEn: [
          "Authored by famous Tamil saint and philosopher Thiruvalluvar",
          "Contains 1,330 couplets divided into Aram, Porul, and Inbam",
          "Revered as 'Tamil Veda' or 'Pancham Veda'",
          "It is available only in Tamil and has no foreign language translations"
        ],
        correctIndex: 3,
        explanation: "कथन (d) गलत है क्योंकि 'तिरुक्कुरल' का रूसी, अंग्रेजी, फ्रेंच समेत 100 से अधिक विश्व भाषाओं में अनुवाद हो चुका है। PM मोदी ने पुतिन को इसका रूसी अनुवाद भेंट किया।",
        explanationEn: "Statement (d) is incorrect because Thirukkural has been translated into over 100 global languages. PM Modi presented a Russian translation to President Putin.",
      },
      {
        _key: "mcq-6",
        question: "ब्रिक्स समूह में भारत के रणनीतिक हितों के संदर्भ में निम्नलिखित में से कौन सा कथन सही है?",
        questionEn: "Which statement is correct regarding India's strategic interests in BRICS?",
        options: [
          "यह भारत को स्वतंत्र विदेश नीति (रणनीतिक स्वायत्तता) बनाए रखने में मदद करता है",
          "यह UNSC और IMF में भारत की स्थाई सदस्यता व सुधारों की मांग का समर्थन करता है",
          "यह क्रिटिकल मिनरल्स और ऊर्जा सुरक्षा हेतु आपूर्ति श्रृंखलाओं को मजबूत करता है",
          "उपरोक्त सभी सही हैं"
        ],
        optionsEn: [
          "It helps India maintain strategic autonomy in foreign policy",
          "It supports India's demand for UNSC permanent seat and IMF quota reforms",
          "It secures supply chains for critical minerals and energy security",
          "All of the above are correct"
        ],
        correctIndex: 3,
        explanation: "सभी कथन सही हैं। ब्रिक्स भारत को रणनीतिक स्वायत्तता, वैश्विक दक्षिण का नेतृत्व, UNSC सुधार, ऊर्जा सुरक्षा, क्रिटिकल मिनरल्स तथा NDB से वैकल्पिक विकास वित्त प्रदान करता है।",
        explanationEn: "All options are correct. BRICS advances India's strategic autonomy, Global South leadership, UNSC reforms, energy security, and NDB development finance.",
      },
      {
        _key: "mcq-7",
        question: "18वें BRICS शिखर सम्मेलन 2026 में स्वीकृत 'New Delhi Declaration' की मुख्य प्राथमिकता क्या है?",
        questionEn: "What is the key priority of the 'New Delhi Declaration' adopted at the 18th BRICS Summit 2026?",
        options: [
          "समावेशी वैश्विक शासन में सुधार, स्थानीय मुद्राओं में व्यापार एवं बहुपक्षवाद को सशक्त करना",
          "केवल सैन्य गठबंधन का निर्माण करना",
          "यूरोपीय संघ के समान एकल वैश्विक मुद्रा जारी करना",
          "जी-7 देशों पर आर्थिक प्रतिबंध लगाना"
        ],
        optionsEn: [
          "Reforming inclusive global governance, promoting local currency trade & strengthening multilateralism",
          "Creating a military pact",
          "Issuing a single global currency like Euro",
          "Imposing economic sanctions on G-7 nations"
        ],
        correctIndex: 0,
        explanation: "नई दिल्ली घोषणापत्र वैश्विक शासन सुधार (UNSC, IMF), डी-डॉलराइज़ेशन, स्थानीय मुद्राओं में द्विपक्षीय व्यापार और बहुध्रुवीयता पर बल देता है।",
        explanationEn: "The New Delhi Declaration emphasizes global governance reform (UNSC, IMF), de-dollarisation, local currency bilateral trade, and multipolarity.",
      },
      {
        _key: "mcq-8",
        question: "निम्नलिखित में से किस वर्ष भारत ने BRICS शिखर सम्मेलन की अध्यक्षता नहीं की?",
        questionEn: "In which of the following years did India NOT hold the BRICS Summit Chairship?",
        options: ["2012", "2016", "2020", "2021"],
        optionsEn: ["2012", "2016", "2020", "2021"],
        correctIndex: 2,
        explanation: "भारत ने 2012, 2016, 2021 और 2026 में अध्यक्षता की। वर्ष 2020 में रूस ने अध्यक्षता की थी।",
        explanationEn: "India hosted BRICS in 2012, 2016, 2021, and 2026. Russia hosted the summit in 2020.",
      },
    ],

    /* ─── MANDATORY NEXT ARTICLE INTERLINKING ──────────────────────────── */
    nextArticle: {
      title: "जी-7 शिखर सम्मेलन 2026: संपर्क सत्र में प्रधानमंत्री मोदी की भागीदारी",
      titleEn: "G-7 Summit 2026: PM Modi's Participation in Outreach Session",
      href: "/current-affairs/g7-summit-2026-pm-modi-outreach-session",
    },
  };

  // 3. Save / Overwrite Article in Sanity CMS
  console.log("💾 Uploading / Updating comprehensive document in Sanity CMS...");
  const result = await client.createOrReplace(articleDoc);
  console.log(`✅ Article published successfully! Document ID: ${result._id}`);

  // 4. Update Back-link in G-7 Summit 2026 Article for 2-Way Rich Interlinking
  console.log("🔗 Updating bi-directional interlinking in G-7 Summit 2026 article...");
  try {
    const g7Doc = await client.getDocument("ca-g7-summit-2026-modi-outreach-session");
    if (g7Doc) {
      await client
        .patch("ca-g7-summit-2026-modi-outreach-session")
        .set({
          nextArticle: {
            title: "18वां BRICS शिखर सम्मेलन 2026 (नई दिल्ली): भारत की अध्यक्षता, एजेंडा व रणनीतिक हित",
            titleEn: "18th BRICS Summit 2026 (New Delhi): India's Chairship, Agenda & Strategic Interests",
            href: "/current-affairs/18th-brics-summit-2026-new-delhi-india-chairship",
          },
        })
        .commit();
      console.log("✔ Bi-directional back-link updated in G-7 Summit 2026 article!");
    }
  } catch (err) {
    console.warn("⚠️ Could not patch G-7 article for bi-directional link:", err);
  }

  console.log("🎉 All upload, SEO optimization, and interlinking operations completed successfully!");
}

main().catch((err) => {
  console.error("❌ Execution failed:", err);
  process.exit(1);
});
