import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { createClient } from "@sanity/client";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

async function main() {
  console.log("🚀 Starting upload process for QS World University Rankings 2027 Article...");

  const publicBlogDir = path.resolve(process.cwd(), "public/images/blog");

  // 1. Image 1: Hero IIT Delhi QS Rankings
  const image1Path = path.join(publicBlogDir, "qs_world_university_rankings_2027_iit_delhi.png");
  let assetImage1;
  if (fs.existsSync(image1Path)) {
    console.log("📸 Uploading IIT Delhi QS Rankings Image to Sanity...");
    assetImage1 = await client.assets.upload("image", fs.createReadStream(image1Path), {
      filename: "qs_world_university_rankings_2027_iit_delhi.png",
    });
    console.log(`✔ Uploaded Image 1. Asset ID: ${assetImage1._id}`);
  }

  // 2. Image 2: IISc Bengaluru Research Citations
  const image2Path = path.join(publicBlogDir, "iisc_bengaluru_research_citations_qs_2027.png");
  let assetImage2;
  if (fs.existsSync(image2Path)) {
    console.log("📸 Uploading IISc Bengaluru Research Citations Image to Sanity...");
    assetImage2 = await client.assets.upload("image", fs.createReadStream(image2Path), {
      filename: "iisc_bengaluru_research_citations_qs_2027.png",
    });
    console.log(`✔ Uploaded Image 2. Asset ID: ${assetImage2._id}`);
  }

  // 3. Image 3: IIT Indore MPPSC Special Notes
  const image3Path = path.join(publicBlogDir, "mppsc_iit_indore_qs_world_rankings_2027.png");
  let assetImage3;
  if (fs.existsSync(image3Path)) {
    console.log("📸 Uploading IIT Indore MPPSC Special Image to Sanity...");
    assetImage3 = await client.assets.upload("image", fs.createReadStream(image3Path), {
      filename: "mppsc_iit_indore_qs_world_rankings_2027.png",
    });
    console.log(`✔ Uploaded Image 3. Asset ID: ${assetImage3._id}`);
  }

  const article = {
    _id: "ca-qs-world-university-rankings-2027",
    _type: "currentAffairs",
    slug: { _type: "slug", current: "qs-world-university-rankings-2027-india-performance-iit-delhi" },
    title: "QS वर्ल्ड यूनिवर्सिटी रैंकिंग 2027: भारत का ऐतिहासिक प्रदर्शन, 52 विश्वविद्यालय शामिल, IIT दिल्ली 118वें स्थान पर व IIT इंदौर 546वें स्थान पर | MPPSC & UPSC",
    titleEn: "QS World University Rankings 2027: India's Historic Performance, 52 Universities Ranked, IIT Delhi Rank 118 & IIT Indore Rank 546 | MPPSC & UPSC",
    excerpt: "QS World University Rankings 2027 में भारत के 52 विश्वविद्यालय शामिल हुए। अमेरिका, यूके, चीन व जर्मनी के बाद भारत विश्व का 5वाँ सबसे अधिक प्रतिनिधित्व वाला देश बना। IIT दिल्ली (118) भारत में प्रथम, IISc बेंगलुरु Citations per Faculty में विश्व में 21वें स्थान पर व मध्य प्रदेश का IIT इंदौर 546वें स्थान पर। MPPSC/UPSC उपयोगी परीक्षा नोट्स।",
    excerptEn: "QS World University Rankings 2027: 52 Indian universities ranked, making India the 5th most represented country globally. IIT Delhi leads India at 118th rank, IISc Bengaluru ranks 21st in Citations per Faculty, and IIT Indore ranks 546th.",
    ca_date: "2026-07-28",
    publishedAt: new Date().toISOString(),
    featured: true,
    readingTime: 12,
    keywords: [
      "QS World University Rankings 2027",
      "QS रैंकिंग 2027",
      "QS World University Rankings 2027 India",
      "IIT Delhi QS Rank 118",
      "IISc Bengaluru Citations per Faculty 21",
      "IIT Indore QS Rank 546",
      "QS World University Rankings Criteria",
      "India 5th Most Represented Country QS",
      "Quacquarelli Symonds 2027",
      "MIT Number 1 QS Ranking",
      "MPPSC Education Current Affairs",
      "MPPSC Science and Tech Notes",
      "MPPSC Paper 3 Current Affairs",
      "MPPSC Prelims GS Unit 7",
      "UPSC Higher Education Notes",
      "MPPSC Current Affairs 2026"
    ],
    category: { _type: "reference", _ref: "cat-misc" },
    author: { _type: "reference", _ref: "author-aakar" },
    tags: [
      { _type: "reference", _ref: "tag-mppsc" },
      { _type: "reference", _ref: "tag-upsc" },
      { _type: "reference", _ref: "tag-prelims" },
      { _type: "reference", _ref: "tag-mains" },
    ],
    syllabus: ["MPPSC Paper-1 GS", "MPPSC Paper-3 Unit-7 Science & Tech", "UPSC GS Paper-2 Education", "Prelims-GS"],
    ...(assetImage1 ? {
      featuredImage: {
        _type: "image",
        asset: { _type: "reference", _ref: assetImage1._id },
        alt: "QS World University Rankings 2027 IIT Delhi India Top Ranked University Global Rank 118 MPPSC UPSC Notes",
      }
    } : {}),

    /* ─── SECTIONS ──────────────────────────────────────────────── */
    sections: [
      /* ── 1. Why in News & Overview ─────────────────────────────── */
      {
        _key: "sec-why-in-news",
        kind: "whyInNews",
        title: "चर्चा में क्यों? QS वर्ल्ड यूनिवर्सिटी रैंकिंग 2027 एवं भारत का प्रदर्शन",
        titleEn: "Why in News? QS World University Rankings 2027 & India's Milestone",
        body: [
          {
            _key: "b1-1", _type: "block", style: "normal",
            children: [{ _key: "s1-1", _type: "span", text: "वैश्विक उच्च शिक्षा विश्लेषण संस्था **Quacquarelli Symonds (QS)** द्वारा **QS World University Rankings 2027** जारी कर दी गई है। इस वर्ष की रैंकिंग में भारत ने उच्च शिक्षा के क्षेत्र में अभूतपूर्व और उल्लेखनीय प्रदर्शन दर्ज किया है।" }],
          },
          ...(assetImage1 ? [{
            _type: "image",
            asset: { _type: "reference", _ref: assetImage1._id },
            alt: "IIT Delhi Iconic Campus with QS World University Rankings 2027 Rank 118 Banner",
            caption: "IIT दिल्ली: QS वर्ल्ड यूनिवर्सिटी रैंकिंग 2027 में 118वीं वैश्विक रैंक के साथ लगातार दूसरे वर्ष भारत का सर्वोच्च संस्थान बना",
          }] : []),
          {
            _key: "b1-2", _type: "block", style: "normal",
            children: [{ _key: "s1-2", _type: "span", text: "इस वर्ष भारत के **52 विश्वविद्यालय वैश्विक रैंकिंग में शामिल** हुए हैं। इसके साथ ही भारत अमेरिका, यूनाइटेड किंगडम (UK), चीन और जर्मनी के बाद **दुनिया का पाँचवाँ सबसे अधिक प्रतिनिधित्व वाला देश** बन गया है।" }],
          },
          {
            _key: "b1-seo", _type: "block", style: "normal",
            children: [{ _key: "s1-seo", _type: "span", text: "🔗 **संबंधित महत्वपूर्ण लेख**: [MPPSC Current Affairs 2026 पोर्टल ➔](/mppsc-current-affairs) | [कॉमनवेल्थ गेम्स 2026 मेडल टैली ➔](/current-affairs/commonwealth-games-2026-updates-india-medal-tally) | [शर्मिला धनखड़ स्वर्ण पदक एवं जीवनी ➔](/current-affairs/sharmila-dhankar-biography-cwg-2026-gold-medal-para-athletics)" }],
          },
          {
            _key: "b1-h1", _type: "block", style: "h3",
            children: [{ _key: "sh1-1", _type: "span", text: "मुख्य आकर्षण एवं त्वरित विवरण (Key Highlights)" }],
          },
          {
            _key: "b1-d1", _type: "block", style: "normal",
            children: [{ _key: "s1-d1", _type: "span", text: "• **कुल भारतीय संस्थान**: रैंकिंग में भारत के कुल **52 विश्वविद्यालय** शामिल।" }],
          },
          {
            _key: "b1-d2", _type: "block", style: "normal",
            children: [{ _key: "s1-d2", _type: "span", text: "• **वैश्विक प्रतिनिधित्व में 5वाँ स्थान**: अमेरिका, यूके, चीन और जर्मनी के बाद भारत विश्व का **5वाँ सबसे अधिक प्रतिनिधित्व वाला देश** बना।" }],
          },
          {
            _key: "b1-d3", _type: "block", style: "normal",
            children: [{ _key: "s1-d3", _type: "span", text: "• **भारत का सर्वोच्च संस्थान**: **IIT दिल्ली** 118वीं वैश्विक रैंक के साथ लगातार दूसरे वर्ष भारत का शीर्ष संस्थान रहा।" }],
          },
          {
            _key: "b1-d4", _type: "block", style: "normal",
            children: [{ _key: "s1-d4", _type: "span", text: "• **अनुसंधान क्षेत्र में वैश्विक पहचान**: **IISc बेंगलुरु** ने प्रति संकाय शोध उद्धरण (**Citations per Faculty**) में विश्व में **21वाँ स्थान** प्राप्त किया।" }],
          },
        ],
        bodyEn: [
          {
            _key: "b1-3", _type: "block", style: "normal",
            children: [{ _key: "s1-3", _type: "span", text: "In QS World University Rankings 2027, 52 Indian universities were featured, making India the 5th most represented nation globally after USA, UK, China, and Germany. IIT Delhi ranked 118th as India's top institute." }],
          },
        ],
      },

      /* ── 2. Full Ranking Breakdown & Universities Table ───────── */
      {
        _key: "sec-india-rankings-table",
        kind: "keyHighlights",
        title: "QS Ranking 2027: भारतीय संस्थानों की संपूर्ण रैंक तालिका",
        titleEn: "Complete Rank List of Indian Universities in QS 2027",
        body: [
          {
            _key: "b2-h1", _type: "block", style: "h3",
            children: [{ _key: "sh2-1", _type: "span", text: "1. शीर्ष भारतीय प्रौद्योगिकी संस्थान (Top Indian Institutes of Technology)" }],
          },
          {
            _type: "table",
            caption: "QS 2027: शीर्ष 5 भारतीय प्रौद्योगिकी संस्थान",
            headers: ["भारतीय संस्थान (Institute)", "वैश्विक रैंक (Global Rank 2027)", "भारत में स्थान (Rank in India)"],
            rows: [
              ["**IIT दिल्ली (IIT Delhi)**", "**118**", "**1**"],
              ["**IIT बॉम्बे (IIT Bombay)**", "**134**", "**2**"],
              ["**IIT मद्रास (IIT Madras)**", "**180**", "**3**"],
              ["**IIT खड़गपुर (IIT Kharagpur)**", "**205**", "**4**"],
              ["**IIT कानपुर (IIT Kanpur)**", "**221**", "**5**"]
            ]
          },
          {
            _key: "b2-h2", _type: "block", style: "h3",
            children: [{ _key: "sh2-2", _type: "span", text: "2. अन्य प्रमुख भारतीय विश्वविद्यालय एवं संस्थान (Other Ranked Indian Institutions)" }],
          },
          {
            _type: "table",
            caption: "QS World University Rankings 2027: प्रमुख भारतीय विश्वविद्यालयों की तालिका",
            headers: ["संस्थान का नाम (University / Institute)", "QS वैश्विक रैंक (Global Rank)"],
            rows: [
              ["दिल्ली विश्वविद्यालय (DU)", "332"],
              ["IIT रुड़की (IIT Roorkee)", "335"],
              ["IIT गुवाहाटी (IIT Guwahati)", "349"],
              ["शूलिनी यूनिवर्सिटी (Shoolini University)", "452"],
              ["अन्ना यूनिवर्सिटी (Anna University)", "470"],
              ["IIT (BHU) वाराणसी", "510"],
              ["चंडीगढ़ यूनिवर्सिटी (Chandigarh University)", "526"],
              ["**IIT इंदौर (IIT Indore - Madhya Pradesh)**", "**546**"],
              ["जवाहरलाल नेहरू विश्वविद्यालय (JNU)", "555"],
              ["BITS पिलानी (BITS Pilani)", "575"],
              ["IIT हैदराबाद (IIT Hyderabad)", "588"],
              ["VIT वेल्लोर (VIT Vellore)", "597"],
              ["सिम्बायोसिस इंटरनेशनल (Symbiosis International)", "655"],
              ["जामिया मिलिया इस्लामिया (Jamia Millia Islamia)", "686"]
            ]
          },
        ],
        bodyEn: [
          {
            _key: "b2-3", _type: "block", style: "normal",
            children: [{ _key: "s2-3", _type: "span", text: "Detailed breakdown of Indian universities in QS 2027: IIT Delhi (118), IIT Bombay (134), IIT Madras (180), IIT Kharagpur (205), IIT Kanpur (221), DU (332), IIT Indore (546), JNU (555)." }],
          },
        ],
      },

      /* ── 3. Research & Citations Excellence ───────────────────── */
      {
        _key: "sec-research-citations",
        kind: "analysis",
        title: "अनुसंधान प्रदर्शन: IISc बेंगलुरु का वैश्विक कीर्तिमान",
        titleEn: "Research Excellence: IISc Bengaluru's Global Distinction",
        body: [
          {
            _key: "b3-1", _type: "block", style: "normal",
            children: [{ _key: "s3-1", _type: "span", text: "भारतीय विज्ञान संस्थान (**IISc बेंगलुरु**) ने शोध एवं अनुसंधान के क्षेत्र में भारत का मान बढ़ाया है। IISc बेंगलुरु ने **Citations per Faculty (प्रति संकाय शोध उद्धरण)** संकेतक में पूरे विश्व में **21वाँ स्थान** प्राप्त किया है।" }],
          },
          ...(assetImage2 ? [{
            _type: "image",
            asset: { _type: "reference", _ref: assetImage2._id },
            alt: "IISc Bengaluru Historic Main Building Citations per Faculty World Rank 21 in QS 2027",
            caption: "IISc बेंगलुरु: Citations per Faculty (प्रति संकाय उद्धरण) में विश्व में 21वीं रैंक हासिल कर भारतीय अनुसंधान का परचम लहराया",
          }] : []),
          {
            _key: "b3-2", _type: "block", style: "normal",
            children: [{ _key: "s3-2", _type: "span", text: "• **शोध प्रभाव (Research Impact)**: प्रति संकाय 21वाँ स्थान यह सिद्ध करता है कि भारतीय वैज्ञानिकों और प्रोफेसरों द्वारा प्रकाशित शोध पत्रों की अंतरराष्ट्रीय स्तर पर उच्च गुणवत्ता और स्वीकार्यता है।" }],
          },
          {
            _key: "b3-3", _type: "block", style: "normal",
            children: [{ _key: "s3-3", _type: "span", text: "• **नवाचार को बढ़ावा**: यह उपलब्धि भारत के R&D (अनुसंधान एवं विकास) क्षेत्र में हो रहे सकारात्मक बदलावों को दर्शाती है।" }],
          },
        ],
        bodyEn: [
          {
            _key: "b3-4", _type: "block", style: "normal",
            children: [{ _key: "s3-4", _type: "span", text: "IISc Bengaluru achieved global rank 21 in Citations per Faculty indicator, highlighting high research impact and academic citation strength of Indian institutions." }],
          },
        ],
      },

      /* ── 4. MPPSC Special Focus: IIT Indore (MP) ───────────────── */
      {
        _key: "sec-mppsc-special-iit-indore",
        kind: "background",
        title: "मध्य प्रदेश परीक्षा विशेष: IIT इंदौर का प्रदर्शन (MPPSC Special)",
        titleEn: "MPPSC Exam Special: IIT Indore Ranking & Madhya Pradesh Context",
        body: [
          {
            _key: "b4-intro", _type: "block", style: "normal",
            children: [{ _key: "s4-in", _type: "span", text: "MPPSC प्रारम्भिक परीक्षा (Paper 1 GS) एवं मुख्य परीक्षा (Paper 3 Unit-7) की दृष्टि से मध्य प्रदेश के संस्थानों का प्रदर्शन अत्यंत महत्वपूर्ण है:" }],
          },
          ...(assetImage3 ? [{
            _type: "image",
            asset: { _type: "reference", _ref: assetImage3._id },
            alt: "IIT Indore Campus Madhya Pradesh QS World University Rankings 2027 Rank 546 MPPSC Notes",
            caption: "IIT इंदौर (मध्य प्रदेश): QS वर्ल्ड यूनिवर्सिटी रैंकिंग 2027 में 546वीं वैश्विक रैंक के साथ राज्य का प्रमुख उच्च शिक्षण संस्थान",
          }] : []),
          {
            _key: "b4-1", _type: "block", style: "normal",
            children: [{ _key: "s4-1", _type: "span", text: "• **IIT इंदौर की वैश्विक रैंक**: मध्य प्रदेश के प्रतिष्ठित संस्थान **भारतीय प्रौद्योगिकी संस्थान (IIT) इंदौर** ने QS 2027 रैंकिंग में **546वाँ स्थान** प्राप्त किया है।" }],
          },
          {
            _key: "b4-2", _type: "block", style: "normal",
            children: [{ _key: "s4-2", _type: "span", text: "• **मध्य प्रदेश में महत्व**: IIT इंदौर मध्य प्रदेश का एकमात्र IIT संस्थान है जो लगातार अंतरराष्ट्रीय रैंकिंग में अपनी उपस्थिति दर्ज करा रहा है।" }],
          },
          {
            _key: "b4-3", _type: "block", style: "normal",
            children: [{ _key: "s4-3", _type: "span", text: "• **MPPSC मेंस उत्तर लेखन बिंदु**: मुख्य परीक्षा में 'मध्य प्रदेश में विज्ञान एवं प्रौद्योगिकी का विकास' प्रश्न में IIT इंदौर के वैश्विक प्रदर्शन का उल्लेख उत्तर को अधिक गुणवत्तापूर्ण बनाता है।" }],
          },
        ],
        bodyEn: [
          {
            _key: "b4-4", _type: "block", style: "normal",
            children: [{ _key: "s4-4", _type: "span", text: "IIT Indore from Madhya Pradesh achieved global rank 546 in QS 2027, making it a crucial state-level fact for MPPSC GS Paper 3 Science & Tech section." }],
          },
        ],
      },

      /* ── 5. Evaluation Criteria & World Top 10 ───────────────── */
      {
        _key: "sec-evaluation-criteria-top10",
        kind: "keyHighlights",
        title: "QS Ranking के मूल्यांकन मानदंड एवं विश्व के शीर्ष 10 विश्वविद्यालय",
        titleEn: "QS Evaluation Criteria & Global Top 10 Universities",
        body: [
          {
            _key: "b5-h1", _type: "block", style: "h3",
            children: [{ _key: "sh5-1", _type: "span", text: "1. QS Ranking मूल्यांकन के 8 प्रमुख मानदंड (Evaluation Indicators)" }],
          },
          {
            _key: "b5-1", _type: "block", style: "normal",
            children: [{ _key: "s5-1", _type: "span", text: "• **Academic Reputation (शैक्षणिक प्रतिष्ठा)**: विश्वविद्यालयों की वैश्विक शैक्षणिक साख।" }],
          },
          {
            _key: "b5-2", _type: "block", style: "normal",
            children: [{ _key: "s5-2", _type: "span", text: "• **Employer Reputation (नियोक्ता प्रतिष्ठा)**: स्नातकों की रोजगार क्षमता एवं कंपनियों में साख।" }],
          },
          {
            _key: "b5-3", _type: "block", style: "normal",
            children: [{ _key: "s5-3", _type: "span", text: "• **Citations per Faculty (प्रति संकाय उद्धरण)**: शोध पत्रों की गुणवत्ता और संदर्भ प्रभाव।" }],
          },
          {
            _key: "b5-4", _type: "block", style: "normal",
            children: [{ _key: "s5-4", _type: "span", text: "• **Faculty–Student Ratio (शिक्षक-विद्यार्थी अनुपात)**: व्यक्तिगत ध्यान एवं कक्षा गुणवत्ता।" }],
          },
          {
            _key: "b5-5", _type: "block", style: "normal",
            children: [{ _key: "s5-5", _type: "span", text: "• **International Faculty & Students (अंतरराष्ट्रीय संकाय व छात्र)**: कैम्पस का अंतरराष्ट्रीयकरण।" }],
          },
          {
            _key: "b5-6", _type: "block", style: "normal",
            children: [{ _key: "s5-6", _type: "span", text: "• **Employment Outcomes & Sustainability (रोजगार परिणाम व सतत विकास)**: हरित कैंपस व करियर सफलता।" }],
          },
          {
            _key: "b5-h2", _type: "block", style: "h3",
            children: [{ _key: "sh5-2", _type: "span", text: "2. विश्व के शीर्ष 10 विश्वविद्यालय (Global Top 10 List)" }],
          },
          {
            _type: "table",
            caption: "QS World University Rankings 2027: विश्व के शीर्ष 10 विश्वविद्यालय",
            headers: ["वैश्विक रैंक (Rank)", "विश्वविद्यालय (University)", "देश (Country)"],
            rows: [
              ["**1**", "**Massachusetts Institute of Technology (MIT)**", "अमेरिका (USA)"],
              ["**2**", "Imperial College London", "यूके (UK)"],
              ["**3**", "Stanford University", "अमेरिका (USA)"],
              ["**4**", "University of Oxford", "यूके (UK)"],
              ["**5**", "Harvard University", "अमेरिका (USA)"],
              ["**6**", "University of Cambridge", "यूके (UK)"],
              ["**7**", "California Institute of Technology (Caltech)", "अमेरिका (USA)"],
              ["**8**", "ETH Zurich", "स्विट्जरलैंड"],
              ["**9**", "University College London (UCL)", "यूके (UK)"],
              ["**10**", "National University of Singapore (NUS)", "सिंगापुर"]
            ]
          },
        ],
        bodyEn: [
          {
            _key: "b5-7", _type: "block", style: "normal",
            children: [{ _key: "s5-7", _type: "span", text: "Evaluation criteria include Academic Reputation, Employer Reputation, Citations per Faculty, Faculty-Student Ratio, International Faculty/Students, Employment Outcomes, and Sustainability. MIT ranks World #1." }],
          },
        ],
      },

      /* ── 6. Significance, Challenges & Quick Revision ───────────── */
      {
        _key: "sec-significance-challenges-notes",
        kind: "analysis",
        title: "भारत के लिए महत्व, प्रमुख चुनौतियाँ एवं परीक्षा उपयोगी तथ्य",
        titleEn: "Significance for India, Major Challenges & Quick Exam Revision",
        body: [
          {
            _key: "b6-h1", _type: "block", style: "h3",
            children: [{ _key: "sh6-1", _type: "span", text: "1. भारत के लिए महत्व (Significance for India)" }],
          },
          {
            _key: "b6-1", _type: "block", style: "normal",
            children: [{ _key: "s6-1", _type: "span", text: "• **ग्लोबल एजुकेशन हब**: 52 संस्थानों के साथ भारत की अंतरराष्ट्रीय उपस्थिति मजबूत हुई है।" }],
          },
          {
            _key: "b6-2", _type: "block", style: "normal",
            children: [{ _key: "s6-2", _type: "span", text: "• **विदेशी सहयोग व छात्र आकर्षण**: वैश्विक रैंकिंग में सुधार से विदेशी विद्यार्थियों और शोधकर्ताओं का आकर्षण बढ़ेगा।" }],
          },
          {
            _key: "b6-h2", _type: "block", style: "h3",
            children: [{ _key: "sh6-2", _type: "span", text: "2. प्रमुख चुनौतियाँ (Major Challenges)" }],
          },
          {
            _key: "b6-3", _type: "block", style: "normal",
            children: [{ _key: "s6-3", _type: "span", text: "• **R&D में सीमित बजट**: जीडीपी का 0.7% से कम अनुसंधान पर खर्च होना मुख्य बाधा है।" }],
          },
          {
            _key: "b6-4", _type: "block", style: "normal",
            children: [{ _key: "s6-4", _type: "span", text: "• **शीर्ष 100 में अनुपस्थिति**: विश्व के शीर्ष 100 संस्थानों में किसी भी भारतीय संस्थान का न होना।" }],
          },
          {
            _key: "b6-5", _type: "block", style: "normal",
            children: [{ _key: "s6-5", _type: "span", text: "• **अंतरराष्ट्रीयकरण की कमी**: विदेशी संकाय एवं छात्रों का कम अनुपात।" }],
          },
          {
            _key: "b6-h3", _type: "block", style: "h3",
            children: [{ _key: "sh6-3", _type: "span", text: "3. परीक्षा हेतु महत्वपूर्ण वन-लाइनर तथ्य (Quick Revision Notes)" }],
          },
          {
            _key: "b6-6", _type: "block", style: "normal",
            children: [{ _key: "s6-6", _type: "span", text: "• **QS का पूर्ण रूप**: Quacquarelli Symonds (यूनाइटेड किंगडम - UK)" }],
          },
          {
            _key: "b6-7", _type: "block", style: "normal",
            children: [{ _key: "s6-7", _type: "span", text: "• **भारत के कुल विश्वविद्यालय**: 52 संस्थान (विश्व में 5वाँ स्थान)" }],
          },
          {
            _key: "b6-8", _type: "block", style: "normal",
            children: [{ _key: "s6-8", _type: "span", text: "• **भारत का शीर्ष संस्थान**: IIT दिल्ली (वैश्विक रैंक 118)" }],
          },
          {
            _key: "b6-9", _type: "block", style: "normal",
            children: [{ _key: "s6-9", _type: "span", text: "• **Citations में श्रेष्ठ संस्थान**: IISc बेंगलुरु (वैश्विक रैंक 21)" }],
          },
          {
            _key: "b6-10", _type: "block", style: "normal",
            children: [{ _key: "s6-10", _type: "span", text: "• **विश्व का नंबर 1 संस्थान**: MIT (Massachusetts Institute of Technology, USA)" }],
          },
          {
            _key: "b6-11", _type: "block", style: "normal",
            children: [{ _key: "s6-11", _type: "span", text: "• **मध्य प्रदेश का शीर्ष संस्थान**: IIT इंदौर (वैश्विक रैंक 546)" }],
          },
        ],
        bodyEn: [
          {
            _key: "b6-12", _type: "block", style: "normal",
            children: [{ _key: "s6-12", _type: "span", text: "Key exam takeaways: QS stands for Quacquarelli Symonds (UK). 52 Indian universities ranked (5th globally). IIT Delhi rank 118, IISc rank 21 in Citations, IIT Indore rank 546, MIT World #1." }],
          },
        ],
      },
    ],

    /* ─── FAQS ──────────────────────────────────────────────────── */
    faqs: [
      {
        question: "QS World University Rankings किस संस्था द्वारा जारी की जाती है?",
        answer: "QS World University Rankings यूनाइटेड किंगडम (UK) स्थित वैश्विक उच्च शिक्षा विश्लेषण संस्था Quacquarelli Symonds (QS) द्वारा प्रतिवर्ष जारी की जाती है।",
      },
      {
        question: "QS Rankings 2027 में भारत का सर्वोच्च स्थान प्राप्त संस्थान कौन सा है?",
        answer: "IIT दिल्ली वैश्विक स्तर पर 118वीं रैंक के साथ लगातार दूसरे वर्ष भारत का सर्वोच्च स्थान प्राप्त विश्वविद्यालय बना है।",
      },
      {
        question: "Citations per Faculty संकेतक में किस भारतीय संस्थान ने 21वीं वैश्विक रैंक हासिल की?",
        answer: "भारतीय विज्ञान संस्थान (IISc बेंगलुरु) ने Citations per Faculty (प्रति संकाय शोध उद्धरण) में विश्व में 21वाँ स्थान प्राप्त किया है।",
      },
      {
        question: "QS World University Rankings 2027 में भारत के कितने विश्वविद्यालय शामिल हैं?",
        answer: "इस वर्ष की रैंकिंग में भारत के कुल 52 विश्वविद्यालय शामिल हुए हैं, जिससे भारत अमेरिका, यूके, चीन और जर्मनी के बाद विश्व का 5वाँ सर्वाधिक प्रतिनिधित्व वाला देश बन गया है।",
      },
      {
        question: "QS World University Rankings 2027 में विश्व का नंबर 1 विश्वविद्यालय कौन सा है?",
        answer: "अमेरिका स्थित Massachusetts Institute of Technology (MIT) लगातार प्रथम स्थान पर कायम है।",
      },
      {
        question: "QS 2027 रैंकिंग में मध्य प्रदेश के किस संस्थान को स्थान मिला है?",
        answer: "मध्य प्रदेश स्थित भारतीय प्रौद्योगिकी संस्थान (IIT Indore) को 546वीं वैश्विक रैंक हासिल हुई है।",
      }
    ],

    /* ─── EXACTLY 8 MCQS (AS PER MANDATORY CURRENT AFFAIRS RULE) ─── */
    mcqs: [
      {
        question: "QS World University Rankings 2027 में भारत का सर्वोच्च रैंक प्राप्त संस्थान कौन सा रहा?",
        options: ["IIT बॉम्बे", "IIT मद्रास", "IIT दिल्ली", "IISc बेंगलुरु"],
        correctIndex: 2,
        explanation: "IIT दिल्ली वैश्विक स्तर पर 118वीं रैंक के साथ भारत का सर्वोच्च रैंक प्राप्त संस्थान रहा, जिसके बाद IIT बॉम्बे (134) और IIT मद्रास (180) रहे।",
      },
      {
        question: "QS World University Rankings 2027 में प्रतिनिधित्व के मामले में भारत का विश्व में कौन सा स्थान है?",
        options: ["तीसरा", "चौथा", "पाँचवाँ", "छठा"],
        correctIndex: 2,
        explanation: "भारत के 52 विश्वविद्यालय रैंकिंग में शामिल हुए, जिससे भारत अमेरिका, यूके, चीन और जर्मनी के बाद विश्व का 5वाँ सबसे अधिक प्रतिनिधित्व वाला देश बना।",
      },
      {
        question: "Citations per Faculty (प्रति संकाय उद्धरण) संकेतक में किस भारतीय संस्थान ने विश्व में 21वाँ स्थान प्राप्त किया?",
        options: ["IIT दिल्ली", "IISc बेंगलुरु", "IIT बॉम्बे", "दिल्ली विश्वविद्यालय"],
        correctIndex: 1,
        explanation: "भारतीय विज्ञान संस्थान (IISc), बेंगलुरु ने Citations per Faculty संकेतक में विश्व में 21वाँ स्थान प्राप्त कर अनुसंधान गुणवत्ता में उत्कृष्ट प्रदर्शन किया।",
      },
      {
        question: "QS World University Rankings किस देश की संस्था द्वारा जारी की जाती है?",
        options: ["अमेरिका (USA)", "यूनाइटेड किंगडम (UK)", "स्विस (Switzerland)", "जर्मनी (Germany)"],
        correctIndex: 1,
        explanation: "QS (Quacquarelli Symonds) यूनाइटेड किंगडम (UK) स्थित एक वैश्विक उच्च शिक्षा विश्लेषण संस्था है।",
      },
      {
        question: "QS World University Rankings 2027 में विश्व का शीर्ष (रैंक 1) विश्वविद्यालय कौन सा है?",
        options: ["Imperial College London", "Stanford University", "Harvard University", "Massachusetts Institute of Technology (MIT)"],
        correctIndex: 3,
        explanation: "अमेरिका का Massachusetts Institute of Technology (MIT) रैंकिंग में विश्व में प्रथम स्थान पर है।",
      },
      {
        question: "मध्य प्रदेश के किस संस्थान ने QS World University Rankings 2027 में 546वीं रैंक प्राप्त की है?",
        options: ["IIT इंदौर", "MANIT भोपाल", "डॉ. हरीसिंह गौर विश्वविद्यालय", "IIT (BHU)"],
        correctIndex: 0,
        explanation: "मध्य प्रदेश के इंदौर स्थित भारतीय प्रौद्योगिकी संस्थान (IIT Indore) ने QS 2027 रैंकिंग में 546वीं वैश्विक रैंक हासिल की है।",
      },
      {
        question: "QS World University Rankings के संदर्भ में निम्नलिखित में से कौन सा संकेतक शामिल नहीं है?",
        options: ["Academic Reputation", "Employer Reputation", "Citations per Faculty", "प्रति व्यक्ति आय (Per Capita Income)"],
        correctIndex: 3,
        explanation: "QS रैंकिंग Academic Reputation, Employer Reputation, Citations per Faculty, Faculty-Student Ratio आदि पर आधारित है; प्रति व्यक्ति आय इसका संकेतक नहीं है।",
      },
      {
        question: "QS Rankings 2027 में दिल्ली विश्वविद्यालय (DU) ने कौन सी वैश्विक रैंक प्राप्त की है?",
        options: ["205", "332", "335", "555"],
        correctIndex: 1,
        explanation: "दिल्ली विश्वविद्यालय (DU) ने QS 2027 रैंकिंग में 332वीं वैश्विक रैंक प्राप्त की है।",
      }
    ]
  };

  console.log(`📝 Syncing QS World University Rankings 2027 article ID "${article._id}" to Sanity CMS...`);
  const result = await client.createOrReplace(article);
  console.log(`🎉 SUCCESS! Article uploaded & published in Sanity CMS. Document ID: ${result._id}`);
  console.log(`URL slug: ${article.slug.current}`);
}

main().catch((err) => {
  console.error("❌ Error uploading QS World University Rankings article to Sanity:", err);
  process.exit(1);
});
