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
  console.log("🚀 Redesigning and uploading European Companies Arrival Article with high-grade UI components...");

  // Image file path in public/images/blog/
  const imagePath = path.resolve(process.cwd(), "public/images/blog/european-companies-arrival-1.png");

  if (!fs.existsSync(imagePath)) {
    console.error("❌ Required featured image not found in public/images/blog/");
    process.exit(1);
  }

  // Upload Featured Image
  console.log("📸 Uploading high-res featured image...");
  const assetImage = await client.assets.upload("image", fs.createReadStream(imagePath), {
    filename: "european_companies_arrival_calicut.png",
  });
  console.log(`✔ Uploaded featured image. Asset ID: ${assetImage._id}`);

  // Construct Article document
  const article = {
    _id: "gk-arrival-of-european-companies-in-india",
    _type: "staticGk",
    slug: { _type: "slug", current: "arrival-of-european-companies-in-india" },
    title: "मध्यकालीन भारत में यूरोपीय कंपनियों का आगमन: व्यापार से साम्राज्य तक की कहानी",
    titleEn: "Arrival of European Companies in India: From Trade to Empire",
    excerpt: "भारत में पुर्तगाली, डच, अंग्रेज, डेनिश एवं फ्रांसीसी ईस्ट इंडिया कंपनियों के आगमन का इतिहास, प्रथम व्यापारिक केंद्र, तुलनात्मक तालिका, प्रमुख युद्ध (कर्नाटक, वांडीवाश) एवं कालक्रम। UPSC व MPPSC परीक्षा हेतु संपूर्ण नोट्स।",
    excerptEn: "Comprehensive static GK study notes on the arrival of European powers in India, Portuguese, Dutch, British, Danish, and French East India Companies, Carnatic Wars, comparison table, timeline, and exam MCQs.",
    ca_date: "2026-07-24",
    publishedAt: new Date().toISOString(),
    featured: true,
    readingTime: 9,
    keywords: [
      "Arrival of European Companies in India",
      "European Companies in India",
      "Portuguese in India",
      "Dutch East India Company VOC",
      "British East India Company EIC",
      "Danish East India Company",
      "French East India Company",
      "Carnatic Wars",
      "Battle of Wandiwash 1760",
      "Battle of Bedara 1759",
      "Vasco da Gama 1498",
      "भारत में यूरोपीय कंपनियों का आगमन",
      "कर्नाटक युद्ध",
      "वांडीवाश का युद्ध",
      "UPSC History Notes",
      "MPPSC History Notes"
    ],
    category: { _type: "reference", _ref: "cat-history" },
    author: { _type: "reference", _ref: "author-aakar" },
    tags: [
      { _type: "reference", _ref: "tag-upsc" },
      { _type: "reference", _ref: "tag-mppsc" },
      { _type: "reference", _ref: "tag-prelims" },
      { _type: "reference", _ref: "tag-mains" }
    ],
    syllabus: ["GS-1", "Prelims-GS"],
    featuredImage: {
      _type: "image",
      asset: { _type: "reference", _ref: assetImage._id },
      alt: "Portuguese ships arriving at the port of Calicut Kerala India in 1498 greeted by Zamorin king",
      caption: "1498 ई. में वास्को-दा-गामा का केप ऑफ गुड होप मार्ग से कालीकट (केरल) आगमन"
    },

    /* ─── SECTIONS ──────────────────────────────────────────────── */
    sections: [
      /* 1. Direct Answer & Executive Summary (GEO/AI Overview Callout) */
      {
        _key: "sec-tldr",
        kind: "whyInNews",
        title: "Quick Takeaway & Direct Answer (संक्षेप उत्तर)",
        titleEn: "Executive Summary & Direct Answer",
        body: [
          {
            _type: "block", style: "normal",
            children: [{ _type: "span", text: "⚡ **सीधा उत्तर (Direct Snippet Answer)**: भारत में सबसे पहले पुर्तगाली (1498) आए और सबसे अंत में (1961) गए। आगमन का सही क्रम है: **पुर्तगाली (1498) ➔ डच (1605) ➔ अंग्रेज (1608) ➔ डेनिश (1620) ➔ फ्रांसीसी (1668)**। किन्तु अपनी नौसैनिक श्रेष्ठता, मजबूत आर्थिक आधार और 1760 के वांडीवाश के युद्ध में फ्रांसीसियों को पराजित कर अंग्रेजों ने पूरे भारत पर औपनिवेशिक साम्राज्य स्थापित किया।" }]
          }
        ],
        bodyEn: [
          {
            _type: "block", style: "normal",
            children: [{ _type: "span", text: "⚡ **Direct Answer**: The Portuguese arrived first in India (1498) and left last (1961). The correct arrival sequence is: **Portuguese (1498) -> Dutch (1605) -> English (1608) -> Danish (1620) -> French (1668)**. However, due to naval dominance, financial autonomy, and victory in the Battle of Wandiwash (1760), the British established supreme colonial rule." }]
          }
        ]
      },

      /* 2. Quick Facts Table */
      {
        _key: "sec-quick-facts",
        kind: "quickFacts",
        title: "Quick Facts: अति-महत्वपूर्ण तथ्य",
        titleEn: "Quick Facts",
        body: [
          { _key: "qf-1", _type: "block", style: "normal", children: [{ _key: "sqf-1", _type: "span", text: "• विषय: मध्यकालीन एवं आधुनिक भारत में यूरोपीय कंपनियों का आगमन" }] },
          { _key: "qf-2", _type: "block", style: "normal", children: [{ _key: "sqf-2", _type: "span", text: "• प्रमुख यूरोपीय कंपनियाँ: पुर्तगाली, डच, अंग्रेज, डेनिश, फ्रांसीसी" }] },
          { _key: "qf-3", _type: "block", style: "normal", children: [{ _key: "sqf-3", _type: "span", text: "• प्रमुख उद्देश्य: व्यापारिक एकाधिकार, समुद्री मार्ग खोज, उपनिवेश स्थापना, राजनीतिक नियंत्रण" }] },
          { _key: "qf-4", _type: "block", style: "normal", children: [{ _key: "sqf-4", _type: "span", text: "• परीक्षा उपयोगिता: UPSC, MPPSC, राज्य लोक सेवा आयोग एवं अन्य प्रतियोगी परीक्षाएँ" }] }
        ],
        bodyEn: [
          { _key: "qf-5", _type: "block", style: "normal", children: [{ _key: "sqf-5", _type: "span", text: "• Subject: Arrival of European Companies in Medieval & Modern India" }] },
          { _key: "qf-6", _type: "block", style: "normal", children: [{ _key: "sqf-6", _type: "span", text: "• Major European Powers: Portuguese, Dutch, British, Danish, French" }] },
          { _key: "qf-7", _type: "block", style: "normal", children: [{ _key: "sqf-7", _type: "span", text: "• Primary Objectives: Trade Monopoly, Sea Route Discovery, Colonization, Political Control" }] },
          { _key: "qf-8", _type: "block", style: "normal", children: [{ _key: "sqf-8", _type: "span", text: "• Exam Relevance: UPSC, MPPSC, State PCS & Other Competitive Exams" }] }
        ]
      },

      /* 3. Comparative Matrix Table Section (STUNNING REAL TABLE) */
      {
        _key: "sec-matrix",
        kind: "factsAtAGlance",
        title: "यूरोपीय कंपनियों की तुलनात्मक तालिका (Comparative Matrix)",
        titleEn: "Comparative Matrix of European Companies",
        body: [
          {
            _type: "block",
            style: "normal",
            children: [{ _type: "span", text: "⚠️ **Exam Alert**: प्रतियोगी परीक्षाओं में कंपनी के 'स्थापना वर्ष' और 'भारत आगमन वर्ष' का अंतर बार-बार पूछा जाता है। इसे नीचे दी गई तालिका से आसानी से समझें:" }]
          },
          {
            _type: "table",
            table: {
              caption: "यूरोपीय कंपनियों की स्थापना, भारत आगमन एवं व्यापारिक केंद्रों का तुलनात्मक विवरण",
              headers: ["यूरोपीय कंपनी", "स्थापना वर्ष", "भारत आगमन", "प्रथम कारखाना (Factory)", "मुख्य केंद्र / मुख्यालय", "पतन का कारण / निर्णायक युद्ध"],
              rows: [
                ["पुर्तगाली (Portuguese)", "1498 ई.", "1498 ई.", "कोचीन (1503)", "गोवा", "डच व ब्रिटिश नौसैनिक प्रतिस्पर्धा"],
                ["डच (Dutch VOC)", "1602 ई.", "1605 ई.", "मसुलीपट्टनम (1605)", "पुलिकट / नागापट्टनम", "बेदरा का युद्ध (1759)"],
                ["अंग्रेज (British EIC)", "1600 ई.", "1608 ई.", "सूरत (1613)", "कलकत्ता (फोर्ट विलियम)", "1858 तक एकछत्र ब्रिटिश राज"],
                ["डेनिश (Danish)", "1616 ई.", "1620 ई.", "त्रांकेबार (1620)", "सेरामपुर (बंगाल)", "बस्तियाँ अंग्रेजों को बेचीं (1845)"],
                ["फ्रांसीसी (French)", "1664 ई.", "1668 ई.", "सूरत (1668)", "पांडिचेरी", "वांडीवाश का युद्ध (1760)"]
              ]
            }
          }
        ],
        bodyEn: [
          {
            _type: "block",
            style: "normal",
            children: [{ _type: "span", text: "⚠️ **Exam Alert**: Key distinction between Company Establishment Year and Arrival Year in India:" }]
          },
          {
            _type: "table",
            table: {
              caption: "Comparative Matrix of European Companies in India",
              headers: ["Company", "Established", "Arrival", "First Factory", "Headquarters", "Final Outcome / Battle"],
              rows: [
                ["Portuguese", "1498 AD", "1498 AD", "Cochin (1503)", "Goa", "Defeated by Dutch & British"],
                ["Dutch (VOC)", "1602 AD", "1605 AD", "Masulipatnam (1605)", "Pulicat / Nagapattinam", "Battle of Bedara (1759)"],
                ["British (EIC)", "1600 AD", "1608 AD", "Surat (1613)", "Calcutta (Fort William)", "Supreme until 1858"],
                ["Danish", "1616 AD", "1620 AD", "Tranquebar (1620)", "Serampore (Bengal)", "Sold settlements (1845)"],
                ["French", "1664 AD", "1668 AD", "Surat (1668)", "Pondicherry", "Battle of Wandiwash (1760)"]
              ]
            }
          }
        ]
      },

      /* 4. Reasons for Arrival */
      {
        _key: "sec-reasons",
        kind: "background",
        title: "यूरोपीय कंपनियों के भारत आने के प्रमुख कारण",
        titleEn: "Primary Reasons for European Arrival in India",
        body: [
          { _key: "r-1", _type: "block", style: "normal", children: [{ _key: "sr-1", _type: "span", text: "• मसालों के व्यापार पर नियंत्रण: भारतीय मसालों (काली मिर्च, दालचीनी) के व्यापार पर नियंत्रण स्थापित करना।" }] },
          { _key: "r-2", _type: "block", style: "normal", children: [{ _key: "sr-2", _type: "span", text: "• अरब व्यापारियों का एकाधिकार समाप्त करना: थल मार्ग पर अरब और वेनिस के व्यापारियों के एकाधिकार को समाप्त करना।" }] },
          { _key: "r-3", _type: "block", style: "normal", children: [{ _key: "sr-3", _type: "span", text: "• सीधा समुद्री व्यापार: भारत एवं पूर्वी देशों से सीधे समुद्री व्यापारिक मार्ग खोजना।" }] },
          { _key: "r-4", _type: "block", style: "normal", children: [{ _key: "sr-4", _type: "span", text: "• व्यापारिक लाभ: नए बाजार प्राप्त कर अत्यधिक व्यापारिक लाभ कमाना।" }] },
          { _key: "r-5", _type: "block", style: "normal", children: [{ _key: "sr-5", _type: "span", text: "• उपनिवेश स्थापना: एशिया में व्यापारिक एवं रणनीतिक बस्तियाँ तथा उपनिवेश स्थापित करना।" }] },
          { _key: "r-6", _type: "block", style: "normal", children: [{ _key: "sr-6", _type: "span", text: "• धर्म प्रचार: एशिया में ईसाई धर्म का प्रचार-प्रसार करना।" }] }
        ],
        bodyEn: [
          { _key: "re-1", _type: "block", style: "normal", children: [{ _key: "sre-1", _type: "span", text: "• Control over Spice Trade: Securing monopoly over high-value Indian spices." }] },
          { _key: "re-2", _type: "block", style: "normal", children: [{ _key: "sre-2", _type: "span", text: "• Breaking Arab Monopoly: Bypassing Arab and Venetian merchants on overland trade routes." }] },
          { _key: "re-3", _type: "block", style: "normal", children: [{ _key: "sre-3", _type: "span", text: "• Direct Sea Routes: Discovering direct oceanic routes to India and the East Indies." }] },
          { _key: "re-4", _type: "block", style: "normal", children: [{ _key: "sre-4", _type: "span", text: "• Commercial Profits: Maximizing revenue through new consumer markets." }] },
          { _key: "re-5", _type: "block", style: "normal", children: [{ _key: "sre-5", _type: "span", text: "• Colonial Expansion: Establishing fortified commercial posts and colonies." }] },
          { _key: "re-6", _type: "block", style: "normal", children: [{ _key: "sre-6", _type: "span", text: "• Religious Proselytization: Spreading Christianity across Asia." }] }
        ]
      },

      /* 5. Portuguese */
      {
        _key: "sec-portuguese",
        kind: "keyAspects",
        title: "1. पुर्तगालियों का आगमन (Portuguese)",
        titleEn: "1. The Portuguese in India",
        body: [
          { _key: "p-1", _type: "block", style: "normal", children: [{ _key: "sp-1", _type: "span", text: "• 1498 ई.: वास्को-दा-गामा कालीकट (केरल) पहुँचा।" }] },
          { _key: "p-2", _type: "block", style: "normal", children: [{ _key: "sp-2", _type: "span", text: "• प्रथम यूरोपीय: समुद्री मार्ग से भारत आने वाला पहला यूरोपीय यात्री वास्को-दा-गामा था।" }] },
          { _key: "p-3", _type: "block", style: "normal", children: [{ _key: "sp-3", _type: "span", text: "• समुद्री मार्ग: अफ्रीका के केप ऑफ गुड होप (Cape of Good Hope) मार्ग से भारत पहुँचा।" }] },
          { _key: "p-4", _type: "block", style: "normal", children: [{ _key: "sp-4", _type: "span", text: "• स्वागताध्यक्ष: कालीकट के स्थानीय शासक जमोरिन ने उसका स्वागत किया।" }] },
          { _key: "p-5", _type: "block", style: "normal", children: [{ _key: "sp-5", _type: "span", text: "• फ्रांसिस्को डी अल्मेडा (1505 ई.): भारत में प्रथम पुर्तगाली गवर्नर ('ब्लू वॉटर पॉलिसी' का जनक)।" }] },
          { _key: "p-6", _type: "block", style: "normal", children: [{ _key: "sp-6", _type: "span", text: "• अल्फांसो डी अल्बुकर्क (1509 ई.): भारत में पुर्तगाली शक्ति का वास्तविक संस्थापक।" }] },
          { _key: "p-7", _type: "block", style: "normal", children: [{ _key: "sp-7", _type: "span", text: "• 1510 ई.: अल्बुकर्क ने बीजापुर के सुल्तान से गोवा पर अधिकार कर लिया।" }] },
          { _key: "p-8", _type: "block", style: "normal", children: [{ _key: "sp-8", _type: "span", text: "• राजधानी: आगे चलकर गोवा को पुर्तगाली साम्राज्य की औपचारिक राजधानी बनाया गया।" }] },
          { _key: "p-9", _type: "block", style: "normal", children: [{ _key: "sp-9", _type: "span", text: "• प्रमुख व्यापारिक केंद्र: गोवा, कोचीन, दमन, दीव एवं कालीकट।" }] }
        ],
        bodyEn: [
          { _key: "pe-1", _type: "block", style: "normal", children: [{ _key: "spe-1", _type: "span", text: "• 1498 AD: Vasco da Gama reached Calicut (Kerala)." }] },
          { _key: "pe-2", _type: "block", style: "normal", children: [{ _key: "spe-2", _type: "span", text: "• First European: Vasco da Gama was the first European explorer to reach India by sea." }] },
          { _key: "pe-3", _type: "block", style: "normal", children: [{ _key: "spe-3", _type: "span", text: "• Route: Traveled via the Cape of Good Hope route around Africa." }] },
          { _key: "pe-4", _type: "block", style: "normal", children: [{ _key: "spe-4", _type: "span", text: "• Welcome: Welcomed by Zamorin, the ruler of Calicut." }] },
          { _key: "pe-5", _type: "block", style: "normal", children: [{ _key: "spe-5", _type: "span", text: "• Francisco de Almeida (1505): First Portuguese Governor (Initiator of 'Blue Water Policy')." }] },
          { _key: "pe-6", _type: "block", style: "normal", children: [{ _key: "spe-6", _type: "span", text: "• Afonso de Albuquerque (1509): Real founder of Portuguese power in India." }] },
          { _key: "pe-7", _type: "block", style: "normal", children: [{ _key: "spe-7", _type: "span", text: "• 1510 AD: Captured Goa from Bijapur Sultanate." }] },
          { _key: "pe-8", _type: "block", style: "normal", children: [{ _key: "spe-8", _type: "span", text: "• Capital: Goa became the official capital of Portuguese India." }] },
          { _key: "pe-9", _type: "block", style: "normal", children: [{ _key: "spe-9", _type: "span", text: "• Major Trade Centers: Goa, Cochin, Daman, Diu, and Calicut." }] }
        ]
      },

      /* 6. Dutch */
      {
        _key: "sec-dutch",
        kind: "keyAspects",
        title: "2. डच कंपनी (Dutch East India Company - VOC)",
        titleEn: "2. The Dutch East India Company (VOC)",
        body: [
          { _key: "d-1", _type: "block", style: "normal", children: [{ _key: "sd-1", _type: "span", text: "• 1602 ई.: डच ईस्ट इंडिया कंपनी की स्थापना हुई।" }] },
          { _key: "d-2", _type: "block", style: "normal", children: [{ _key: "sd-2", _type: "span", text: "• कंपनी का मूल नाम: VOC (Vereenigde Oostindische Compagnie)।" }] },
          { _key: "d-3", _type: "block", style: "normal", children: [{ _key: "sd-3", _type: "span", text: "• पहला कारखाना: 1605 ई. में मसुलीपट्टनम में प्रथम डच कारखाना स्थापित हुआ।" }] },
          { _key: "d-4", _type: "block", style: "normal", children: [{ _key: "sd-4", _type: "span", text: "• मुख्यालय: पुलिकट (बाद में नागापट्टनम स्थानांतरण)।" }] },
          { _key: "d-5", _type: "block", style: "normal", children: [{ _key: "sd-5", _type: "span", text: "• व्यापारिक वस्तुएं: मसाले, सूती वस्त्र, नील और शोरा।" }] },
          { _key: "d-6", _type: "block", style: "normal", children: [{ _key: "sd-6", _type: "span", text: "• प्रमुख व्यापारिक केंद्र: पुलिकट, नागापट्टनम, मसुलीपट्टनम, कोचीन एवं चिनसुरा (बंगाल)।" }] },
          { _key: "d-7", _type: "block", style: "normal", children: [{ _key: "sd-7", _type: "span", text: "• पतन (1759 ई.): बेदरा के युद्ध (Battle of Bedara) में अंग्रेजों ने डचों को पराजित कर भारत में उनकी शक्ति समाप्त कर दी।" }] }
        ],
        bodyEn: [
          { _key: "de-1", _type: "block", style: "normal", children: [{ _key: "sde-1", _type: "span", text: "• 1602 AD: Establishment of Dutch East India Company." }] },
          { _key: "de-2", _type: "block", style: "normal", children: [{ _key: "sde-2", _type: "span", text: "• Original Company Name: VOC (Vereenigde Oostindische Compagnie)." }] },
          { _key: "de-3", _type: "block", style: "normal", children: [{ _key: "sde-3", _type: "span", text: "• First Factory: Established in Masulipatnam in 1605 AD." }] },
          { _key: "de-4", _type: "block", style: "normal", children: [{ _key: "sde-4", _type: "span", text: "• Headquarters: Pulicat (later shifted to Nagapattinam)." }] },
          { _key: "de-5", _type: "block", style: "normal", children: [{ _key: "sde-5", _type: "span", text: "• Major Trade Commodities: Spices, cotton textiles, indigo, and saltpetre." }] },
          { _key: "de-6", _type: "block", style: "normal", children: [{ _key: "sde-6", _type: "span", text: "• Major Centers: Pulicat, Nagapattinam, Masulipatnam, Cochin, Chinsurah." }] },
          { _key: "de-7", _type: "block", style: "normal", children: [{ _key: "sde-7", _type: "span", text: "• Fall (1759 AD): British decisively defeated Dutch in the Battle of Bedara." }] }
        ]
      },

      /* 7. British */
      {
        _key: "sec-british",
        kind: "keyAspects",
        title: "3. अंग्रेज (British East India Company - EIC)",
        titleEn: "3. The British East India Company (EIC)",
        body: [
          { _key: "b-1", _type: "block", style: "normal", children: [{ _key: "sb-1", _type: "span", text: "• 31 दिसंबर 1600: महारानी एलिजाबेथ प्रथम द्वारा चार्टर (शाही फरमान) प्रदान कर कंपनी की स्थापना।" }] },
          { _key: "b-2", _type: "block", style: "normal", children: [{ _key: "sb-2", _type: "span", text: "• 1608 ई.: कैप्टन हॉकिन्स (हेक्टर जहाज से) मुगल सम्राट जहाँगीर के दरबार पहुँचा।" }] },
          { _key: "b-3", _type: "block", style: "normal", children: [{ _key: "sb-3", _type: "span", text: "• 1615 ई.: सर थॉमस रो जहाँगीर के दरबार आया और व्यापारिक छूट प्राप्त की।" }] },
          { _key: "b-4", _type: "block", style: "normal", children: [{ _key: "sb-4", _type: "span", text: "• 1613 ई.: सूरत में अंग्रेजों ने अपनी प्रथम स्थायी फैक्ट्री स्थापित की।" }] },
          { _key: "b-5", _type: "block", style: "normal", children: [{ _key: "sb-5", _type: "span", text: "• प्रमुख प्रेसिडेंसी केंद्र: सूरत, मद्रास (फोर्ट सेंट जॉर्ज), बंबई एवं कलकत्ता (फोर्ट विलियम)।" }] },
          { _key: "b-6", _type: "block", style: "normal", children: [{ _key: "sb-6", _type: "span", text: "• 1757 ई.: प्लासी का युद्ध - बंगाल पर राजनीतिक नियंत्रण की शुरुआत।" }] },
          { _key: "b-7", _type: "block", style: "normal", children: [{ _key: "sb-7", _type: "span", text: "• 1764 ई.: बक्सर का युद्ध - अंग्रेजों का भारत में वास्तविक प्रभुत्व स्थापित।" }] },
          { _key: "b-8", _type: "block", style: "normal", children: [{ _key: "sb-8", _type: "span", text: "• 1765 ई.: इलाहाबाद की संधि द्वारा बंगाल, बिहार व उड़ीसा के दीवानी अधिकार प्राप्त।" }] },
          { _key: "b-9", _type: "block", style: "normal", children: [{ _key: "sb-9", _type: "span", text: "• 1858 ई.: 1857 के विद्रोह के बाद ईस्ट इंडिया कंपनी का शासन समाप्त होकर ब्रिटिश क्राउन का प्रत्यक्ष शासन लागू हुआ।" }] }
        ],
        bodyEn: [
          { _key: "be-1", _type: "block", style: "normal", children: [{ _key: "sbe-1", _type: "span", text: "• Dec 31, 1600: Royal Charter granted by Queen Elizabeth I establishing EIC." }] },
          { _key: "be-2", _type: "block", style: "normal", children: [{ _key: "sbe-2", _type: "span", text: "• 1608 AD: Captain Hawkins arrived at Emperor Jahangir's court." }] },
          { _key: "be-3", _type: "block", style: "normal", children: [{ _key: "sbe-3", _type: "span", text: "• 1615 AD: Sir Thomas Roe secured royal trade concessions from Jahangir." }] },
          { _key: "be-4", _type: "block", style: "normal", children: [{ _key: "sbe-4", _type: "span", text: "• 1613 AD: First permanent factory established at Surat." }] },
          { _key: "be-5", _type: "block", style: "normal", children: [{ _key: "sbe-5", _type: "span", text: "• Major Presidencies: Surat, Madras (Fort St. George), Bombay, Calcutta (Fort William)." }] },
          { _key: "be-6", _type: "block", style: "normal", children: [{ _key: "sbe-6", _type: "span", text: "• 1757 AD: Battle of Plassey - Beginning of political control over Bengal." }] },
          { _key: "be-7", _type: "block", style: "normal", children: [{ _key: "sbe-7", _type: "span", text: "• 1764 AD: Battle of Buxar - Firm foundation of British supremacy in India." }] },
          { _key: "be-8", _type: "block", style: "normal", children: [{ _key: "sbe-8", _type: "span", text: "• 1765 AD: Treaty of Allahabad granted Diwani rights over Bengal, Bihar, and Orissa." }] },
          { _key: "be-9", _type: "block", style: "normal", children: [{ _key: "sbe-9", _type: "span", text: "• 1858 AD: Company rule abolished; British Crown assumed direct governance." }] }
        ]
      },

      /* 8. Danish */
      {
        _key: "sec-danish",
        kind: "keyAspects",
        title: "4. डेनिश कंपनी (Danish East India Company)",
        titleEn: "4. The Danish East India Company",
        body: [
          { _key: "dn-1", _type: "block", style: "normal", children: [{ _key: "sdn-1", _type: "span", text: "• 1616 ई.: डेनिश ईस्ट इंडिया कंपनी की स्थापना।" }] },
          { _key: "dn-2", _type: "block", style: "normal", children: [{ _key: "sdn-2", _type: "span", text: "• प्रमुख व्यापारिक केंद्र: त्रांकेबार (तमिलनाडु - 1620) एवं सेरामपुर (बंगाल - 1676)।" }] },
          { _key: "dn-3", _type: "block", style: "normal", children: [{ _key: "sdn-3", _type: "span", text: "• मुख्य गतिविधि: व्यापार से अधिक ईसाई मिशनरी गतिविधियों पर ध्यान केंद्रित।" }] },
          { _key: "dn-4", _type: "block", style: "normal", children: [{ _key: "sdn-4", _type: "span", text: "• अंतिम स्थिति: सीमित संसाधनों के कारण अपनी सभी भारतीय बस्तियाँ 1845 तक अंग्रेजों को बेच दीं।" }] }
        ],
        bodyEn: [
          { _key: "dne-1", _type: "block", style: "normal", children: [{ _key: "sdne-1", _type: "span", text: "• 1616 AD: Establishment of Danish East India Company." }] },
          { _key: "dne-2", _type: "block", style: "normal", children: [{ _key: "sdne-2", _type: "span", text: "• Major Settlements: Tranquebar (Tamil Nadu - 1620) and Serampore (Bengal - 1676)." }] },
          { _key: "dne-3", _type: "block", style: "normal", children: [{ _key: "sdne-3", _type: "span", text: "• Core Focus: Focused more on Christian missionary work than commercial empire." }] },
          { _key: "dne-4", _type: "block", style: "normal", children: [{ _key: "sdne-4", _type: "span", text: "• Final Position: Sold all Indian settlements to the British by 1845." }] }
        ]
      },

      /* 9. French */
      {
        _key: "sec-french",
        kind: "keyAspects",
        title: "5. फ्रांसीसी कंपनी (French East India Company)",
        titleEn: "5. The French East India Company",
        body: [
          { _key: "f-1", _type: "block", style: "normal", children: [{ _key: "sf-1", _type: "span", text: "• 1664 ई.: मंत्री जीन बैप्टिस्ट कोलबर्ट के प्रयासों से फ्रांस के राजा लुई XIV के संरक्षण में स्थापना।" }] },
          { _key: "f-2", _type: "block", style: "normal", children: [{ _key: "sf-2", _type: "span", text: "• प्रथम कारखाना: 1668 ई. में फ्रैंकन कैरो द्वारा सूरत में स्थापित।" }] },
          { _key: "f-3", _type: "block", style: "normal", children: [{ _key: "sf-3", _type: "span", text: "• मुख्यालय: पांडिचेरी (1673 ई. में फ्रैंको मार्टिन द्वारा स्थापित)।" }] },
          { _key: "f-4", _type: "block", style: "normal", children: [{ _key: "sf-4", _type: "span", text: "• प्रमुख केंद्र: पांडिचेरी, चंद्रनगर, माहे, करैकाल एवं यानम।" }] },
          { _key: "f-5", _type: "block", style: "normal", children: [{ _key: "sf-5", _type: "span", text: "• प्रसिद्ध गवर्नर: जोसेफ फ्रांस्वा डुप्ले (Dupleix) - भारतीय राजनीति में हस्तक्षेप की नीति का प्रवर्तक।" }] },
          { _key: "f-6", _type: "block", style: "normal", children: [{ _key: "sf-6", _type: "span", text: "• पतन: कर्नाटक युद्धों (1746–1763) में अंग्रेजों से पराजय के बाद फ्रांसीसी राजनीतिक महत्व समाप्त।" }] }
        ],
        bodyEn: [
          { _key: "fe-1", _type: "block", style: "normal", children: [{ _key: "sfe-1", _type: "span", text: "• 1664 AD: Established by Jean-Baptiste Colbert under King Louis XIV." }] },
          { _key: "fe-2", _type: "block", style: "normal", children: [{ _key: "sfe-2", _type: "span", text: "• First Factory: Established at Surat in 1668 AD by Francois Caron." }] },
          { _key: "fe-3", _type: "block", style: "normal", children: [{ _key: "sfe-3", _type: "span", text: "• Headquarters: Pondicherry (founded in 1673 by Francois Martin)." }] },
          { _key: "fe-4", _type: "block", style: "normal", children: [{ _key: "sfe-4", _type: "span", text: "• Key Centers: Pondicherry, Chandernagore, Mahe, Karaikal, Yanam." }] },
          { _key: "fe-5", _type: "block", style: "normal", children: [{ _key: "sfe-5", _type: "span", text: "• Famous Governor: Joseph Francois Dupleix - Pioneer of political intervention policy." }] },
          { _key: "fe-6", _type: "block", style: "normal", children: [{ _key: "sfe-6", _type: "span", text: "• Decline: Defeated in Carnatic Wars (1746–1763), ending French political ambitions." }] }
        ]
      },

      /* 10. Carnatic Wars */
      {
        _key: "sec-carnatic-wars",
        kind: "keyHighlights",
        title: "एंग्लो-फ्रेंच संघर्ष: कर्नाटक युद्ध (Carnatic Wars 1746–1763)",
        titleEn: "Anglo-French Struggle: Carnatic Wars (1746–1763)",
        body: [
          { _key: "cw-1", _type: "block", style: "normal", children: [{ _key: "scw-1", _type: "span", text: "• प्रथम कर्नाटक युद्ध (1746–1748): यूरोप में ऑस्ट्रिया के उत्तराधिकार युद्ध का प्रभाव। फ्रांसीसियों ने मद्रास पर कब्जा किया। 1748 में ऐक्स-ला-शैपल की संधि (Treaty of Aix-la-Chapelle) के तहत मद्रास अंग्रेजों को वापस मिला।" }] },
          { _key: "cw-2", _type: "block", style: "normal", children: [{ _key: "scw-2", _type: "span", text: "• द्वितीय कर्नाटक युद्ध (1749–1754): हैदराबाद व कर्नाटक के आन्तरिक उत्तराधिकार विवाद के कारण। डुप्ले की नीति असफल रही और उसे फ्रांस वापस बुलाया गया। 1754 में पांडिचेरी की संधि से युद्ध विराम हुआ।" }] },
          { _key: "cw-3", _type: "block", style: "normal", children: [{ _key: "scw-3", _type: "span", text: "• तृतीय कर्नाटक युद्ध (1756–1763): यूरोप के सात वर्षीय युद्ध (Seven Years' War) का हिस्सा। 1760 ई. में वांडीवाश का युद्ध (Battle of Wandiwash) लड़ा गया, जिसमें आयर कूट के नेतृत्व में अंग्रेजों ने काउंट डी लाली की फ्रांसीसी सेना को निर्णायक रूप से पराजित किया।" }] },
          { _key: "cw-4", _type: "block", style: "normal", children: [{ _key: "scw-4", _type: "span", text: "• 1763 ई. पेरिस की संधि: पेरिस की संधि द्वारा फ्रांसीसियों को व्यापार की अनुमति तो मिली, लेकिन किलेबंदी और सेना रखने का अधिकार छीन लिया गया।" }] }
        ],
        bodyEn: [
          { _key: "cwe-1", _type: "block", style: "normal", children: [{ _key: "scwe-1", _type: "span", text: "• First Carnatic War (1746–1748): Fallout of War of Austrian Succession. French captured Madras. Ended with Treaty of Aix-la-Chapelle (1748)." }] },
          { _key: "cwe-2", _type: "block", style: "normal", children: [{ _key: "scwe-2", _type: "span", text: "• Second Carnatic War (1749–1754): Sparked by succession disputes in Hyderabad & Carnatic. Dupleix recalled. Ended with Treaty of Pondicherry (1754)." }] },
          { _key: "cwe-3", _type: "block", style: "normal", children: [{ _key: "scwe-3", _type: "span", text: "• Third Carnatic War (1756–1763): Part of Global Seven Years' War. Decisive Battle of Wandiwash (1760) where British under Eyre Coote defeated French." }] },
          { _key: "cwe-4", _type: "block", style: "normal", children: [{ _key: "scwe-4", _type: "span", text: "• Treaty of Paris (1763): French restricted to trade only; lost right to fortify settlements." }] }
        ]
      },

      /* 11. Reasons for British Success */
      {
        _key: "sec-british-success",
        kind: "importance",
        title: "अंग्रेजों की सफलता के प्रमुख कारण",
        titleEn: "Key Factors Behind British Victory",
        body: [
          { _key: "bs-1", _type: "block", style: "normal", children: [{ _key: "sbs-1", _type: "span", text: "• शक्तिशाली नौसेना: अंग्रेजों के पास तत्कालीन विश्व की सबसे अद्यतन और शक्तिशाली जलसेना थी।" }] },
          { _key: "bs-2", _type: "block", style: "normal", children: [{ _key: "sbs-2", _type: "span", text: "• आर्थिक स्वतंत्रता व सुदृढ़ता: ईस्ट इंडिया कंपनी एक निजी शेयरधारक कंपनी थी, जिससे त्वरित निर्णय संभव थे, जबकि फ्रांसीसी कंपनी पूर्णतः सरकारी नियंत्रण में थी।" }] },
          { _key: "bs-3", _type: "block", style: "normal", children: [{ _key: "sbs-3", _type: "span", text: "• बंगाल पर नियंत्रण: 1757 में बंगाल की अपार धन-संपदा पर अधिकार से अंग्रेजों को असीमित वित्तीय संसाधन मिले।" }] },
          { _key: "bs-4", _type: "block", style: "normal", children: [{ _key: "sbs-4", _type: "span", text: "• आधुनिक सेना व नेतृत्व: रॉबर्ट क्लाइव, हेक्टर मुनरो और आयर कूट जैसे कुशल सैन्य सलाहकारों व अधिकारियों का नेतृत्व।" }] },
          { _key: "bs-5", _type: "block", style: "normal", children: [{ _key: "sbs-5", _type: "span", text: "• भारतीय शासकों की आपसी फूट: देशी रियासतों की आपसी प्रतिद्वंद्विता का अंग्रेजों ने पूर्ण लाभ उठाया।" }] }
        ],
        bodyEn: [
          { _key: "bse-1", _type: "block", style: "normal", children: [{ _key: "sbse-1", _type: "span", text: "• Naval Superiority: British possessed the world's most formidable navy." }] },
          { _key: "bse-2", _type: "block", style: "normal", children: [{ _key: "sbse-2", _type: "span", text: "• Commercial Autonomy: Private corporate structure of EIC enabled agile decision making compared to state-run French company." }] },
          { _key: "bse-3", _type: "block", style: "normal", children: [{ _key: "sbse-3", _type: "span", text: "• Bengal Conquest: Conquest of rich Bengal provided limitless financial capital." }] },
          { _key: "bse-4", _type: "block", style: "normal", children: [{ _key: "sbse-4", _type: "span", text: "• Military Leadership: Exceptional leadership of Clive, Eyre Coote, and Hector Munro." }] },
          { _key: "bse-5", _type: "block", style: "normal", children: [{ _key: "sbse-5", _type: "span", text: "• Indian Disunity: Exploit native rulers' internal rivalries and lack of unified resistance." }] }
        ]
      },

      /* 12. Impacts */
      {
        _key: "sec-impacts",
        kind: "mainsPoint",
        title: "यूरोपीय शक्तियों का भारत पर प्रभाव (सकारात्मक एवं नकारात्मक)",
        titleEn: "Socio-Economic Impact of European Arrival on India",
        body: [
          { _key: "im-1", _type: "block", style: "normal", children: [{ _key: "sim-1", _type: "span", text: "• सकारात्मक: समुद्री व्यापार एवं वैश्विक बाजार का विस्तार; बंबई, मद्रास, कलकत्ता जैसे आधुनिक बंदरगाह नगरों का विकास; प्रिंटिंग प्रेस व आधुनिक तकनीकी पद्धतियों का परिचय।" }] },
          { _key: "im-2", _type: "block", style: "normal", children: [{ _key: "sim-2", _type: "span", text: "• नकारात्मक: भारत के पारंपरिक हस्तशिल्प और कुटीर उद्योगों का विनाश (वि-औद्योगिकीकरण); कच्चे माल का एकतरफा निर्यात; राजनीतिक संप्रभुता का हनन तथा औपनिवेशिक शोषण।" }] }
        ],
        bodyEn: [
          { _key: "ime-1", _type: "block", style: "normal", children: [{ _key: "sime-1", _type: "span", text: "• Positive: Expansion of maritime trade and global markets; rise of major port cities (Bombay, Madras, Calcutta); introduction of printing press." }] },
          { _key: "ime-2", _type: "block", style: "normal", children: [{ _key: "sime-2", _type: "span", text: "• Negative: Destruction of traditional Indian handicrafts (Deindustrialization); unilateral drain of wealth; loss of political sovereignty and colonial subjugation." }] }
        ]
      },

      /* 13. Timeline Table */
      {
        _key: "sec-timeline",
        kind: "timeline",
        title: "प्रमुख घटनाओं का कालक्रम (Timeline Table)",
        titleEn: "Timeline of Major Historical Events",
        body: [
          { _key: "t-1", _type: "block", style: "normal", children: [{ _key: "st-1", _type: "span", text: "• 1498: वास्को-दा-गामा कालीकट (केरल) पहुँचा" }] },
          { _key: "t-2", _type: "block", style: "normal", children: [{ _key: "st-2", _type: "span", text: "• 1505: अल्मेडा प्रथम पुर्तगाली गवर्नर बना" }] },
          { _key: "t-3", _type: "block", style: "normal", children: [{ _key: "st-3", _type: "span", text: "• 1510: अल्बुकर्क ने गोवा पर अधिकार किया" }] },
          { _key: "t-4", _type: "block", style: "normal", children: [{ _key: "st-4", _type: "span", text: "• 1600: ब्रिटिश ईस्ट इंडिया कंपनी (EIC) की स्थापना (31 दिसंबर)" }] },
          { _key: "t-5", _type: "block", style: "normal", children: [{ _key: "st-5", _type: "span", text: "• 1602: डच ईस्ट इंडिया कंपनी (VOC) की स्थापना" }] },
          { _key: "t-6", _type: "block", style: "normal", children: [{ _key: "st-6", _type: "span", text: "• 1613: सूरत में अंग्रेजों की पहली स्थायी फैक्ट्री" }] },
          { _key: "t-7", _type: "block", style: "normal", children: [{ _key: "st-7", _type: "span", text: "• 1616: डेनिश ईस्ट इंडिया कंपनी की स्थापना" }] },
          { _key: "t-8", _type: "block", style: "normal", children: [{ _key: "st-8", _type: "span", text: "• 1664: फ्रांसीसी ईस्ट इंडिया कंपनी की स्थापना" }] },
          { _key: "t-9", _type: "block", style: "normal", children: [{ _key: "st-9", _type: "span", text: "• 1746–1763: कर्नाटक युद्ध (एंग्लो-फ्रेंच संघर्ष)" }] },
          { _key: "t-10", _type: "block", style: "normal", children: [{ _key: "st-10", _type: "span", text: "• 1757: प्लासी का युद्ध" }] },
          { _key: "t-11", _type: "block", style: "normal", children: [{ _key: "st-11", _type: "span", text: "• 1759: बेदरा का युद्ध (डचों की पराजय)" }] },
          { _key: "t-12", _type: "block", style: "normal", children: [{ _key: "st-12", _type: "span", text: "• 1760: वांडीवाश का युद्ध (फ्रांसीसियों की निर्णायक हार)" }] },
          { _key: "t-13", _type: "block", style: "normal", children: [{ _key: "st-13", _type: "span", text: "• 1763: पेरिस की संधि" }] },
          { _key: "t-14", _type: "block", style: "normal", children: [{ _key: "st-14", _type: "span", text: "• 1764: बक्सर का युद्ध" }] },
          { _key: "t-15", _type: "block", style: "normal", children: [{ _key: "st-15", _type: "span", text: "• 1765: इलाहाबाद की संधि (दीवानी अधिकार प्राप्त)" }] },
          { _key: "t-16", _type: "block", style: "normal", children: [{ _key: "st-16", _type: "span", text: "• 1858: कंपनी शासन समाप्त, ब्रिटिश क्राउन का शासन प्रारंभ" }] }
        ],
        bodyEn: [
          { _key: "te-1", _type: "block", style: "normal", children: [{ _key: "ste-1", _type: "span", text: "• 1498: Vasco da Gama arrived at Calicut" }] },
          { _key: "te-2", _type: "block", style: "normal", children: [{ _key: "ste-2", _type: "span", text: "• 1505: Francisco de Almeida appointed 1st Portuguese Governor" }] },
          { _key: "te-3", _type: "block", style: "normal", children: [{ _key: "ste-3", _type: "span", text: "• 1510: Albuquerque captured Goa" }] },
          { _key: "te-4", _type: "block", style: "normal", children: [{ _key: "ste-4", _type: "span", text: "• 1600: British East India Company incorporated (Dec 31)" }] },
          { _key: "te-5", _type: "block", style: "normal", children: [{ _key: "ste-5", _type: "span", text: "• 1602: Dutch East India Company (VOC) established" }] },
          { _key: "te-6", _type: "block", style: "normal", children: [{ _key: "ste-6", _type: "span", text: "• 1613: British 1st permanent factory established at Surat" }] },
          { _key: "te-7", _type: "block", style: "normal", children: [{ _key: "ste-7", _type: "span", text: "• 1616: Danish East India Company founded" }] },
          { _key: "te-8", _type: "block", style: "normal", children: [{ _key: "ste-8", _type: "span", text: "• 1664: French East India Company founded" }] },
          { _key: "te-9", _type: "block", style: "normal", children: [{ _key: "ste-9", _type: "span", text: "• 1746–1763: Carnatic Wars (Anglo-French conflicts)" }] },
          { _key: "te-10", _type: "block", style: "normal", children: [{ _key: "ste-10", _type: "span", text: "• 1757: Battle of Plassey" }] },
          { _key: "te-11", _type: "block", style: "normal", children: [{ _key: "ste-11", _type: "span", text: "• 1759: Battle of Bedara (Dutch power eliminated)" }] },
          { _key: "te-12", _type: "block", style: "normal", children: [{ _key: "ste-12", _type: "span", text: "• 1760: Battle of Wandiwash (French decisively defeated)" }] },
          { _key: "te-13", _type: "block", style: "normal", children: [{ _key: "ste-13", _type: "span", text: "• 1763: Treaty of Paris" }] },
          { _key: "te-14", _type: "block", style: "normal", children: [{ _key: "ste-14", _type: "span", text: "• 1764: Battle of Buxar" }] },
          { _key: "te-15", _type: "block", style: "normal", children: [{ _key: "ste-15", _type: "span", text: "• 1765: Treaty of Allahabad (Diwani Rights obtained)" }] },
          { _key: "te-16", _type: "block", style: "normal", children: [{ _key: "ste-16", _type: "span", text: "• 1858: EIC Rule ended; Crown Rule established" }] }
        ]
      }
    ],

    /* ─── FAQS (8 SEO & Exam Optimized) ───────────────────────── */
    faqs: [
      {
        question: "भारत आने वाला पहला यूरोपीय यात्री कौन था और वह कब भारत आया?",
        questionEn: "Who was the first European explorer to arrive in India and when?",
        answer: "भारत आने वाला पहला यूरोपीय यात्री वास्को-दा-गामा था, जो 1498 ई. में अफ्रीका के केप ऑफ गुड होप मार्ग से कालीकट (केरल) पहुँचा था। कालीकट के शासक जमोरिन ने उसका स्वागत किया था।",
        answerEn: "Vasco da Gama was the first European explorer to reach India in 1498 AD via the Cape of Good Hope route around Africa, landing at Calicut (Kerala)."
      },
      {
        question: "डच ईस्ट इंडिया कंपनी (VOC) की स्थापना कब हुई थी और इसका भारत में पहला कारखाना कहाँ स्थापित हुआ?",
        questionEn: "When was the Dutch East India Company (VOC) founded and where was its first factory in India?",
        answer: "डच ईस्ट इंडिया कंपनी (VOC) की स्थापना 1602 ई. में हुई थी। भारत में डचों का पहला कारखाना 1605 ई. में मसुलीपट्टनम में स्थापित हुआ था और इनका मुख्यालय पुलिकट में था।",
        answerEn: "The Dutch East India Company (VOC) was established in 1602 AD. Its first factory in India was established at Masulipatnam in 1605 AD, with headquarters at Pulicat."
      },
      {
        question: "ब्रिटिश ईस्ट इंडिया कंपनी का पहला प्रतिनिधि किस मुगल सम्राट के दरबार में आया था?",
        questionEn: "Which Mughal Emperor's court was visited by the first representative of the British East India Company?",
        answer: "कैप्टन हॉकिन्स 1608 ई. में और सर थॉमस रो 1615 ई. में ब्रिटिश ईस्ट इंडिया कंपनी के प्रतिनिधि के रूप में मुगल सम्राट जहाँगीर के दरबार में आए थे।",
        answerEn: "Captain Hawkins (1608 AD) and Sir Thomas Roe (1615 AD) visited Mughal Emperor Jahangir's court as representatives of the British East India Company."
      },
      {
        question: "भारत में अंग्रेजों और फ्रांसीसियों के बीच निर्णायक संघर्ष किस युद्ध में हुआ था?",
        questionEn: "In which battle was the decisive struggle between the British and the French fought in India?",
        answer: "अंग्रेजों और फ्रांसीसियों के बीच निर्णायक संघर्ष 1760 ई. के वांडीवाश के युद्ध (तृतीय कर्नाटक युद्ध) में हुआ था, जिसमें अंग्रेजों की विजय हुई और भारत में फ्रांसीसियों का राजनीतिक प्रभुत्व समाप्त हो गया।",
        answerEn: "The decisive battle between British and French was the Battle of Wandiwash in 1760 AD (Third Carnatic War), where Sir Eyre Coote defeated French forces under Lally."
      },
      {
        question: "बेदरा का युद्ध किस वर्ष हुआ था और इसका क्या परिणाम रहा?",
        questionEn: "In which year did the Battle of Bedara take place and what was its outcome?",
        answer: "बेदरा का युद्ध 1759 ई. में अंग्रेजों और डच कंपनी के बीच हुआ था। इस युद्ध में अंग्रेजों ने डचों को पराजित किया, जिसके बाद भारत में डच शक्ति का अंत हो गया।",
        answerEn: "The Battle of Bedara took place in 1759 AD between the British and Dutch forces. British victory permanently ended Dutch political ambitions in India."
      },
      {
        question: "पुर्तगालियों ने गोवा पर किस वर्ष अधिकार किया था?",
        questionEn: "In which year did the Portuguese capture Goa?",
        answer: "पुर्तगाली गवर्नर अल्फांसो डी अल्बुकर्क ने 1510 ई. में बीजापुर के सुल्तान से गोवा पर अधिकार किया था और आगे चलकर गोवा पुर्तगालियों की आधिकारिक राजधानी बना।",
        answerEn: "Portuguese Governor Afonso de Albuquerque captured Goa from the Sultan of Bijapur in 1510 AD, which later became the official capital of Portuguese India."
      },
      {
        question: "फ्रांसीसी ईस्ट इंडिया कंपनी की स्थापना किसके द्वारा और किस राजा के संरक्षण में की गई थी?",
        questionEn: "Who established the French East India Company and under whose patronage?",
        answer: "फ्रांसीसी ईस्ट इंडिया कंपनी की स्थापना 1664 ई. में जीन बैप्टिस्ट कोलबर्ट द्वारा फ्रांस के राजा लुई XIV के संरक्षण में की गई थी। इसका भारतीय मुख्यालय पांडिचेरी था।",
        answerEn: "The French East India Company was founded in 1664 AD by Jean-Baptiste Colbert under the patronage of King Louis XIV of France, with headquarters at Pondicherry."
      },
      {
        question: "भारत में अंग्रेजों की सफलता के प्रमुख कारण क्या थे?",
        questionEn: "What were the primary reasons behind the success of the British in India?",
        answer: "भारत में अंग्रेजों की सफलता के प्रमुख कारणों में उनकी शक्तिशाली नौसेना, मजबूत आर्थिक स्थिति व निजी स्वामित्व (EIC), आधुनिक हथियार व नेतृत्व, तथा भारतीय शासकों की आपसी प्रतिद्वंद्विता का लाभ उठाना शामिल था।",
        answerEn: "Key reasons for British victory included naval dominance, strong financial backing and private corporate agility of EIC, superior military tactics, and exploiting Indian internal disunity."
      }
    ],

    /* ─── MCQS (8 High Quality UPSC/MPPSC Level) ──────────────── */
    mcqs: [
      {
        question: "वास्को-दा-गामा 1498 ई. में भारत के किस तट पर पहुँचा था और उसका स्वागत किस स्थानीय शासक ने किया था?",
        questionEn: "Vasco da Gama reached which coast of India in 1498 AD and was welcomed by which ruler?",
        options: ["मसुलीपट्टनम - मोहम्मद कुली", "कालीकट - जमोरिन", "सूरत - जहांगीर", "पुलिकट - कृष्णदेव राय"],
        optionsEn: ["Masulipatnam - Mohammed Quli", "Calicut - Zamorin", "Surat - Jahangir", "Pulicat - Krishnadevaraya"],
        correctIndex: 1,
        explanation: "1498 ई. में वास्को-दा-गामा केप ऑफ गुड होप मार्ग से कालीकट (केरल) पहुँचा, जहाँ के शासक जमोरिन ने उसका स्वागत किया।",
        explanationEn: "In 1498 AD, Vasco da Gama reached Calicut (Kerala) via the Cape of Good Hope, where he was received by the local ruler Zamorin."
      },
      {
        question: "1510 ई. में बीजापुर से गोवा छीनकर पुर्तगाली साम्राज्य का सुदृढ़ीकरण करने वाला पुर्तगाली गवर्नर कौन था?",
        questionEn: "Which Portuguese Governor captured Goa from Bijapur in 1510 AD to solidify Portuguese control?",
        options: ["फ्रांसिस्को डी अल्मेडा", "जोसेफ फ्रांस्वा डुप्ले", "अल्फांसो डी अल्बुकर्क", "सर थॉमस रो"],
        optionsEn: ["Francisco de Almeida", "Joseph Francois Dupleix", "Afonso de Albuquerque", "Sir Thomas Roe"],
        correctIndex: 2,
        explanation: "1510 ई. में अल्फांसो डी अल्बुकर्क ने गोवा पर अधिकार किया और बाद में गोवा को पुर्तगालियों की राजधानी बनाया गया।",
        explanationEn: "In 1510 AD, Afonso de Albuquerque captured Goa from the Sultan of Bijapur, laying the foundation of Portuguese rule."
      },
      {
        question: "1759 ई. में लड़े गए 'बेदरा के युद्ध' का भारत के इतिहास में क्या परिणाम रहा?",
        questionEn: "What was the historical outcome of the Battle of Bedara (1759 AD) in India?",
        options: [
          "भारत से फ्रांसीसी प्रभाव समाप्त हो गया।",
          "अंग्रेजों ने डच शक्ति को पूर्णतः समाप्त कर दिया।",
          "ब्रिटिश ईस्ट इंडिया कंपनी को बंगाल के दीवानी अधिकार मिले।",
          "पुर्तगालियों ने अंग्रेजों को अपनी बस्तियाँ बेच दीं।"
        ],
        optionsEn: [
          "French influence ended completely.",
          "British decisively eliminated Dutch power.",
          "British EIC obtained Diwani rights of Bengal.",
          "Portuguese sold their settlements to British."
        ],
        correctIndex: 1,
        explanation: "1759 के बेदरा के युद्ध में अंग्रेजों ने डच (Dutch) सेना को पराजित किया, जिसके परिणामस्वरूप भारत में डच शक्ति समाप्त हो गई।",
        explanationEn: "In the Battle of Bedara (1759), the British defeated the Dutch army, ending Dutch power in India."
      },
      {
        question: "ब्रिटिश ईस्ट इंडिया कंपनी ने भारत में अपनी पहली स्थायी व्यापारिक कोठी (फैक्ट्री) 1613 ई. में कहाँ स्थापित की थी?",
        questionEn: "Where did the British East India Company set up its first permanent trading factory in 1613 AD?",
        options: ["मद्रास", "कलकत्ता", "सूरत", "बंबई"],
        optionsEn: ["Madras", "Calcutta", "Surat", "Bombay"],
        correctIndex: 2,
        explanation: "महारानी एलिजाबेथ प्रथम से 1600 में चार्टर मिलने के बाद, अंग्रेजों ने 1613 ई. में सूरत में अपनी पहली स्थायी फैक्ट्री स्थापित की।",
        explanationEn: "After receiving the Royal Charter in 1600, the British established their first permanent factory at Surat in 1613 AD."
      },
      {
        question: "प्रथम कर्नाटक युद्ध (1746–1748) का अंत किस यूरोपीय संधि के साथ हुआ था?",
        questionEn: "Which treaty brought an end to the First Carnatic War (1746–1748)?",
        options: ["पेरिस की संधि", "ऐक्स-ला-शैपल की संधि", "पांडिचेरी की संधि", "इलाहाबाद की संधि"],
        optionsEn: ["Treaty of Paris", "Treaty of Aix-la-Chapelle", "Treaty of Pondicherry", "Treaty of Allahabad"],
        correctIndex: 1,
        explanation: "प्रथम कर्नाटक युद्ध (1746–1748) ऑस्ट्रियन उत्तराधिकार युद्ध से प्रभावित था और 1748 ई. में 'ऐक्स-ला-शैपल की संधि' के बाद समाप्त हुआ।",
        explanationEn: "The First Carnatic War ended in 1748 with the Treaty of Aix-la-Chapelle, restoring Madras to the British."
      },
      {
        question: "तृतीय कर्नाटक युद्ध के दौरान 1760 ई. में लड़े गए 'वांडीवाश के युद्ध' के संदर्भ में कौन सा कथन सत्य है?",
        questionEn: "Which statement is correct regarding the Battle of Wandiwash fought in 1760 AD?",
        options: [
          "फ्रांसीसियों ने अंग्रेजों को हराकर मद्रास जीता।",
          "अंग्रेजों ने फ्रांसीसियों को निर्णायक रूप से पराजित किया।",
          "डच और अंग्रेजों के बीच शांति समझौता हुआ।",
          "मुगल सम्राट ने अंग्रेजों को दीवानी अधिकार प्रदान किए।"
        ],
        optionsEn: [
          "French defeated the British and captured Madras.",
          "British decisively defeated the French army.",
          "Peace treaty signed between Dutch and British.",
          "Mughal Emperor granted Diwani rights to British."
        ],
        correctIndex: 1,
        explanation: "1760 के वांडीवाश के युद्ध में सर आयर कूट के नेतृत्व में अंग्रेजों ने फ्रांसीसियों को निर्णायक रूप से पराजित किया।",
        explanationEn: "In the Battle of Wandiwash (1760), British forces led by Sir Eyre Coote decisively defeated the French under Lally."
      },
      {
        question: "निम्नलिखित में से किस यूरोपीय कंपनी ने सीमित संसाधनों के कारण अपनी भारतीय बस्तियाँ अंग्रेजों को बेच दी थीं?",
        questionEn: "Which European company sold all its Indian settlements to the British due to limited commercial resources?",
        options: [
          "पुर्तगाली ईस्ट इंडिया कंपनी",
          "डच ईस्ट इंडिया कंपनी (VOC)",
          "डेनिश ईस्ट इंडिया कंपनी",
          "फ्रांसीसी ईस्ट इंडिया कंपनी"
        ],
        optionsEn: [
          "Portuguese East India Company",
          "Dutch East India Company (VOC)",
          "Danish East India Company",
          "French East India Company"
        ],
        correctIndex: 2,
        explanation: "1616 ई. में स्थापित डेनिश कंपनी सीमित संसाधनों के कारण अधिक सफल नहीं हो सकी और उसने अपनी बस्तियाँ 1845 तक अंग्रेजों को बेच दीं।",
        explanationEn: "The Danish East India Company (founded 1616) sold all its settlements (Tranquebar, Serampore) to the British by 1845."
      },
      {
        question: "यूरोपीय शक्तियों के भारत आगमन का सही कालानुक्रम क्या है?",
        questionEn: "What is the correct chronological sequence of the arrival of European powers in India?",
        options: [
          "पुर्तगाली -> अंग्रेज -> डच -> फ्रांसीसी -> डेनिश",
          "पुर्तगाली -> डच -> अंग्रेज -> डेनिश -> फ्रांसीसी",
          "डच -> पुर्तगाली -> अंग्रेज -> फ्रांसीसी -> डेनिश",
          "पुर्तगाली -> डेनिश -> डच -> अंग्रेज -> फ्रांसीसी"
        ],
        optionsEn: [
          "Portuguese -> British -> Dutch -> French -> Danish",
          "Portuguese -> Dutch -> British -> Danish -> French",
          "Dutch -> Portuguese -> British -> French -> Danish",
          "Portuguese -> Danish -> Dutch -> British -> French"
        ],
        correctIndex: 1,
        explanation: "भारत आने वाली यूरोपीय शक्तियों का सही क्रम है: पुर्तगाली (1498), डच (1602 VOC), अंग्रेज (1608 आगमन), डेनिश (1616), एवं फ्रांसीसी (1664)।",
        explanationEn: "The correct sequence of European arrival in India is: Portuguese (1498) -> Dutch (1602 VOC) -> British (1608 arrival) -> Danish (1616) -> French (1664)."
      }
    ],

    /* ─── Sources ────────────────────────────────────────────── */
    sources: [
      { label: "NCERT Class 12 Modern Indian History (Themes in Indian History III)", url: "https://ncert.nic.in" },
      { label: "Ministry of Culture & National Archives of India", url: "https://nationalarchives.nic.in" },
      { label: "Spectrum Modern India Historical Archives", url: "https://mppsc.mp.gov.in" }
    ]
  };

  try {
    await client.createOrReplace(article);
    console.log("✨ Successfully uploaded redesigned European Companies Arrival Article to Sanity!");
  } catch (err) {
    console.error("❌ Failed to create/replace document in Sanity:", err);
  }
}

main().catch((err) => {
  console.error("❌ Error running script:", err);
  process.exit(1);
});
