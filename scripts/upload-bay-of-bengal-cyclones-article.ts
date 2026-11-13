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
  console.log("🚀 Starting upload process for Bay of Bengal Cyclones Article...");

  // Image file paths in public/images/blog/
  const imagePaths = {
    satellite: path.resolve(process.cwd(), "public/images/blog/bay-of-bengal-cyclone-satellite-view.jpg"),
    infographic: path.resolve(process.cwd(), "public/images/blog/bay-of-bengal-vs-arabian-sea-cyclone-infographic.jpg"),
  };

  // Verify images exist
  if (!fs.existsSync(imagePaths.satellite) || !fs.existsSync(imagePaths.infographic)) {
    console.error("❌ Required generated images not found in public/images/blog/");
    process.exit(1);
  }

  // 1. Upload Satellite Image
  console.log("📸 Uploading satellite view image to Sanity...");
  const assetSatellite = await client.assets.upload("image", fs.createReadStream(imagePaths.satellite), {
    filename: "bay-of-bengal-cyclone-satellite-view.jpg",
  });
  console.log(`✔ Uploaded Satellite Image. Asset ID: ${assetSatellite._id}`);

  // 2. Upload Infographic Image
  console.log("📸 Uploading infographic comparison image to Sanity...");
  const assetInfographic = await client.assets.upload("image", fs.createReadStream(imagePaths.infographic), {
    filename: "bay-of-bengal-vs-arabian-sea-cyclone-infographic.jpg",
  });
  console.log(`✔ Uploaded Infographic Image. Asset ID: ${assetInfographic._id}`);

  const authorId = "author-aakar-ias-team";

  // Keywords targeting high intent MPPSC & UPSC search queries
  const keywordsArray = [
    "बंगाल की खाड़ी में चक्रवात क्यों आते हैं",
    "why bay of bengal has more cyclones than arabian sea",
    "bay of bengal cyclone causes mppsc notes",
    "cyclone formation mechanism upsc",
    "cyclone naming wmo escap list 169 names",
    "cyclone arnab cyclone murasu 2026",
    "imd tropical cyclone classification table",
    "bay of bengal vs arabian sea cyclones geography",
    "mppsc mains geography disaster management notes",
    "चक्रवात बनने के अनुकूल कारण समुद्र तापमान",
    "चक्रवात का नामकरण प्रक्रिया भारत 13 देश",
    "mppsc mains paper 1 part b geography unit 1",
  ];

  const docTitleHi = "बंगाल की खाड़ी में अधिक चक्रवात आने के प्रमुख कारण: भूगोल एवं आपदा प्रबंधन | MPPSC & UPSC Notes";
  const docTitleEn = "Why Bay of Bengal Has More Cyclones Than Arabian Sea: Geography & Disaster Management | MPPSC & UPSC Notes";

  const docExcerptHi = "भारत के पूर्वी तट पर स्थित बंगाल की खाड़ी में अरब सागर की तुलना में 4 गुना अधिक चक्रवात बनते हैं। जानें समुद्री सतह का तापमान (28°C–30°C), गंगा-ब्रह्मपुत्र का मीठा पानी, कीप जैसी भौगोलिक आकृति, चक्रवात बनने के 6 चरण, WMO/ESCAP नामकरण प्रणाली (13 देश, 169 नाम) एवं 8 महत्वपूर्ण अभ्यास MCQs।";
  const docExcerptEn = "Why does the Bay of Bengal witness 4 times more cyclones than the Arabian Sea? Detailed analysis of Sea Surface Temperature (>26.5°C), freshwater runoff from Ganga-Brahmaputra, funnel geography, 6-step cyclone genesis, IMD classification, WMO/ESCAP 169-name roster, and 8 practice MCQs for MPPSC & UPSC.";

  const docSlug = "why-bay-of-bengal-has-more-cyclones-than-arabian-sea";

  // Document IDs to create/update in both Current Affairs & Static GK
  const docIds = [
    "ca-why-bay-of-bengal-has-more-cyclones",
    "gk-why-bay-of-bengal-has-more-cyclones",
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
      ca_date: "2026-11-13",
      publishedAt: "2026-11-13T10:00:00.000Z",
      featured: true,
      readingTime: 9,
      keywords: keywordsArray,
      seoTitle: sanitizeText("बंगाल की खाड़ी में अधिक चक्रवात आने के प्रमुख कारण | MPPSC & UPSC"),
      seoTitleEn: sanitizeText("Why Bay of Bengal Has More Cyclones Than Arabian Sea | MPPSC & UPSC"),
      metaDescription: sanitizeText(docExcerptHi),
      metaDescriptionEn: sanitizeText(docExcerptEn),
      category: { _type: "reference", _ref: "cat-geography" },
      author: { _type: "reference", _ref: authorId },
      tags: [
        { _type: "reference", _ref: "tag-mppsc", _key: "ref-tag-mppsc" },
        { _type: "reference", _ref: "tag-upsc", _key: "ref-tag-upsc" },
        { _type: "reference", _ref: "tag-mains", _key: "ref-tag-mains" },
        { _type: "reference", _ref: "tag-prelims", _key: "ref-tag-prelims" },
      ],
      syllabus: [
        "MPPSC Prelims Paper-1 Unit 3 (Geography of India)",
        "MPPSC Mains Paper-1 Part-B (Geography & Disaster Management)",
        "UPSC GS Paper-1 (Physical Geography)",
        "UPSC GS Paper-3 (Disaster Management)",
      ],
      featuredImage: {
        _type: "image",
        asset: { _type: "reference", _ref: assetSatellite._id },
        alt: "Bay of Bengal Tropical Cyclone Satellite View showing Eye and Spiral Rainbands | बंगाल की खाड़ी में चक्रवात उपग्रह दृश्य",
      },
      mainImage: {
        _type: "image",
        asset: { _type: "reference", _ref: assetSatellite._id },
        alt: "Satellite Imagery of Severe Tropical Cyclone over Bay of Bengal Coast",
      },
      nextArticle: {
        title: "आपदा प्रबंधन क्या है? अर्थ, प्रकार, चरण, संस्थागत ढांचा एवं NCERT नोट्स",
        titleEn: "What is Disaster Management: Concept, Types, Cycle & Institutional Framework",
        href: "/general-awareness/what-is-disaster-management-ncert-types-mppsc-notes",
      },

      /* ─── SECTIONS ──────────────────────────────────────────────── */
      sections: [
        /* ── 1. Overview & Context ────────────────────────────────── */
        {
          _key: "sec-overview",
          kind: "whyInNews",
          title: sanitizeText("चर्चा में क्यों एवं भौगोलिक पृष्ठभूमि (Overview & Regional Context)"),
          titleEn: sanitizeText("Why in News & Regional Meteorological Context"),
          body: [
            {
              _key: "b1-1",
              _type: "block",
              style: "h3",
              children: [{ _key: "s1-1", _type: "span", text: sanitizeText("बंगाल की खाड़ी: चक्रवातों का वैश्विक आकर्षण केंद्र") }],
            },
            {
              _key: "b1-2",
              _type: "block",
              style: "normal",
              children: [{ _key: "s1-2", _type: "span", text: sanitizeText("• **अत्यधिक संवेदनशीलता**: भारत के पूर्वी तट पर स्थित **बंगाल की खाड़ी (Bay of Bengal)** चक्रवातों की दृष्टि से विश्व के सबसे संवेदनशील समुद्री क्षेत्रों में से एक है। ऐतिहासिक आंकड़ों के अनुसार, उत्तर हिंद महासागर में उत्पन्न होने वाले कुल चक्रवातों में से लगभग **80% चक्रवात बंगाल की खाड़ी** में विकसित होते हैं, जबकि अरब सागर में मात्र 20% चक्रवात ही बनते हैं।") }],
            },
            {
              _key: "b1-3",
              _type: "block",
              style: "normal",
              children: [{ _key: "s1-3", _type: "span", text: sanitizeText("• **अरब सागर से 4:1 का अनुपात**: बंगाल की खाड़ी और अरब सागर के बीच चक्रवात आवृत्ति का अनुपात लगभग **4:1** है। इसके पीछे समुद्री तापमान, मीठे पानी का अंतर्प्रवाह, वायुमंडलीय दबाव एवं तटरेखा की भौगोलिक बनावट जैसे बहुआयामी कारक उत्तरदायी हैं।") }],
            },
            {
              _key: "b1-4",
              _type: "block",
              style: "normal",
              children: [{ _key: "s1-4", _type: "span", text: sanitizeText("• **आपदा प्रबंधन में महत्व**: [MPPSC Mains Syllabus 2026](/mppsc/mains-syllabus) के पेपर 1 (भाग-ब भूगोल) और [आपदा प्रबंधन](/general-awareness/what-is-disaster-management-ncert-types-mppsc-notes) के अंतर्गत चक्रवात, इसके उत्पत्ति तंत्र एवं पूर्व चेतावनी प्रणालियों से संबंधित प्रश्न प्रतिवर्ष पूछे जाते हैं।") }],
            },
          ],
          bodyEn: [
            {
              _key: "b1-1e",
              _type: "block",
              style: "h3",
              children: [{ _key: "s1-1e", _type: "span", text: sanitizeText("Bay of Bengal: Global Hotspot for Tropical Cyclones") }],
            },
            {
              _key: "b1-2e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s1-2e", _type: "span", text: sanitizeText("• **High Vulnerability**: Flanking the eastern seaboard of India, the **Bay of Bengal** is recognized globally as one of the most storm-prone oceanic basins. Meteorological records confirm that nearly **80% of all tropical cyclones** originating in the North Indian Ocean develop in the Bay of Bengal, compared to merely 20% in the Arabian Sea.") }],
            },
            {
              _key: "b1-3e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s1-3e", _type: "span", text: sanitizeText("• **4:1 Cyclonic Ratio**: The historical ratio of cyclonic disturbances between the Bay of Bengal and Arabian Sea stands at roughly **4:1**. A combination of warm Sea Surface Temperatures (SST), heavy freshwater discharge from massive river systems, shallow bathymetry, and concave funnel geography drives this disparity.") }],
            },
            {
              _key: "b1-4e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s1-4e", _type: "span", text: sanitizeText("• **Syllabus Relevance**: Essential for [MPPSC Mains Geography Paper 1 Part B](/mppsc/mains-syllabus) and [Disaster Management Frameworks](/general-awareness/what-is-disaster-management-ncert-types-mppsc-notes).") }],
            },
          ],
        },

        /* ── 2. Five Key Causes ───────────────────────────────────── */
        {
          _key: "sec-causes",
          kind: "issues",
          title: sanitizeText("बंगाल की खाड़ी में अधिक चक्रवात बनने के 5 प्रमुख कारण (5 Key Causes)"),
          titleEn: sanitizeText("5 Primary Scientific Reasons Behind Frequent Bay of Bengal Cyclones"),
          body: [
            {
              _key: "b2-1",
              _type: "block",
              style: "h3",
              children: [{ _key: "s2-1", _type: "span", text: sanitizeText("1. समुद्र की सतह का उच्च तापमान (High Sea Surface Temperature - SST)") }],
            },
            {
              _key: "b2-2",
              _type: "block",
              style: "normal",
              children: [{ _key: "s2-2", _type: "span", text: sanitizeText("• **तापीय थ्रेशोल्ड**: उष्णकटिबंधीय चक्रवात निर्माण हेतु न्यूनतम तापीय सीमा **26.5°C या उससे अधिक** मानी जाती है। बंगाल की खाड़ी का सतही तापमान वर्षभर प्रायः **28°C से 30°C** के बीच बना रहता है, जो वायुमंडलीय संवहन को निरंतर तीव्र ईंधन (ऊष्मा व आर्द्रता) प्रदान करता है।") }],
            },
            {
              _key: "b2-3",
              _type: "block",
              style: "h3",
              children: [{ _key: "s2-3", _type: "span", text: sanitizeText("2. नदियों द्वारा मीठे पानी का भारी प्रवाह (Enormous Freshwater Runoff & Stratification)") }],
            },
            {
              _key: "b2-4",
              _type: "block",
              style: "normal",
              children: [{ _key: "s2-4", _type: "span", text: sanitizeText("• **लवणता का स्तरीकरण (Salinity Stratification)**: गंगा, ब्रह्मपुत्र, महानदी, गोदावरी, कृष्णा और इरावदी जैसी विशाल बारहमासी नदियाँ भारी मात्रा में मीठा पानी बंगाल की खाड़ी में विसर्जित करती हैं। मीठा पानी खारे पानी की तुलना में हल्का होता है, जिससे समुद्र की ऊपरी सतह पर एक **स्थिर हल्की गर्म परत** बन जाती है। यह परत गहरे ठंडे समुद्री जल को ऊपर आने (Upwelling) से रोकती है, जिससे सतह अत्यधिक गर्म बनी रहती है।") }],
            },
            {
              _key: "b2-5",
              _type: "block",
              style: "h3",
              children: [{ _key: "s2-5", _type: "span", text: sanitizeText("3. कीप जैसी संकरी भौगोलिक आकृति (Funnel-Shaped Coastline Geometry)") }],
            },
            {
              _key: "b2-6",
              _type: "block",
              style: "normal",
              children: [{ _key: "s2-6", _type: "span", text: sanitizeText("• **तूफानी महोर्मि (Storm Surge) का संकेंद्रण**: बंगाल की खाड़ी का उत्तरी भाग (पश्चिम बंगाल और बांग्लादेश तट) एक संकरे कीप (Funnel) के समान है। जब चक्रवात उत्तर की ओर बढ़ता है, तो संकरी तटरेखा के कारण समुद्री जल का फैलाव रुक जाता है और पानी तट की ओर भीषण लहरों (Storm Surge) के रूप में ऊपर चढ़ता है, जिससे जान-माल का नुकसान कई गुना बढ़ जाता है।") }],
            },
            {
              _key: "b2-7",
              _type: "block",
              style: "h3",
              children: [{ _key: "s2-7", _type: "span", text: sanitizeText("4. कमजोर वर्टिकल विंड शीयर (Low Vertical Wind Shear)") }],
            },
            {
              _key: "b2-8",
              _type: "block",
              style: "normal",
              children: [{ _key: "s2-8", _type: "span", text: sanitizeText("• **चक्रवाती स्तंभ का संरक्षण**: ऊँचाई के साथ हवा की दिशा और गति में न्यूनतम अंतर होने को **कमजोर वर्टिकल विंड शीयर** कहते हैं। बंगाल की खाड़ी में मानसून पश्चात (अक्टूबर-नवंबर) विंड शीयर अत्यंत कमजोर होता है, जिससे कपासी वर्षी बादलों (Cumulonimbus) का ऊर्ध्वाधर स्तंभ बिना बिखरे सुदृढ़ चक्रवात में बदल जाता है।") }],
            },
            {
              _key: "b2-9",
              _type: "block",
              style: "h3",
              children: [{ _key: "s2-9", _type: "span", text: sanitizeText("5. प्रशांत महासागर एवं दक्षिण चीन सागर के अवशेष (Remnants of Pacific Typhoons)") }],
            },
            {
              _key: "b2-10",
              _type: "block",
              style: "normal",
              children: [{ _key: "s2-10", _type: "span", text: sanitizeText("• **पुनरुत्थान (Re-intensification)**: दक्षिण चीन सागर और उत्तर-पश्चिमी प्रशांत महासागर में उत्पन्न होने वाले कई टाइफून जब वियतनाम, थाईलैंड और म्यांमार के थल भाग को पार करते हैं, तो उनके निम्न वायुदाब अवशेष (Low-Pressure Remnants) बंगाल की खाड़ी में प्रवेश कर जाते हैं। यहाँ अनुकूल गर्म तापमान पाकर वे पुनः शक्तिशाली चक्रवात में तब्दील हो जाते हैं।") }],
            },
          ],
          bodyEn: [
            {
              _key: "b2-1e",
              _type: "block",
              style: "h3",
              children: [{ _key: "s2-1e", _type: "span", text: sanitizeText("1. Elevated Sea Surface Temperatures (SST 28°C–30°C)") }],
            },
            {
              _key: "b2-2e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s2-2e", _type: "span", text: sanitizeText("• **Thermodynamic Engine**: The recognized threshold for tropical cyclogenesis is **26.5°C**. The Bay of Bengal consistently maintains temperatures between **28°C and 30°C**, supplying colossal amounts of sensible and latent heat to sustain cyclonic vortexes.") }],
            },
            {
              _key: "b2-3e",
              _type: "block",
              style: "h3",
              children: [{ _key: "s2-3e", _type: "span", text: sanitizeText("2. Salinity Stratification via Freshwater Inflow") }],
            },
            {
              _key: "b2-4e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s2-4e", _type: "span", text: sanitizeText("• **Inhibition of Ocean Upwelling**: Massive river discharges from the Ganga, Brahmaputra, Mahanadi, Godavari, Krishna, and Irrawaddy deposit enormous volumes of fresh, low-density water on the oceanic surface. This forms a buoyant, shallow 'barrier layer' that inhibits the upward mixing of cold deep-sea water, ensuring the sea surface remains superheated.") }],
            },
            {
              _key: "b2-5e",
              _type: "block",
              style: "h3",
              children: [{ _key: "s2-5e", _type: "span", text: sanitizeText("3. Funnel-Shaped Coastline Geometry") }],
            },
            {
              _key: "b2-6e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s2-6e", _type: "span", text: sanitizeText("• **Storm Surge Amplification**: The northern curvature of the Bay, encompassing coastal West Bengal and Bangladesh, forms a natural geographic funnel. As cyclonic storms track northward, water is forced into an increasingly constricted concave basin, producing catastrophic tidal surges.") }],
            },
            {
              _key: "b2-7e",
              _type: "block",
              style: "h3",
              children: [{ _key: "s2-7e", _type: "span", text: sanitizeText("4. Weak Vertical Wind Shear") }],
            },
            {
              _key: "b2-8e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s2-8e", _type: "span", text: sanitizeText("• **Preserving the Vertical Eye-Wall**: Low difference in wind speed and direction between lower and upper tropospheric levels enables towering convective cloud towers to stay vertically aligned without being sheared apart.") }],
            },
            {
              _key: "b2-9e",
              _type: "block",
              style: "h3",
              children: [{ _key: "s2-9e", _type: "span", text: sanitizeText("5. Re-intensification of Pacific Typhoon Remnants") }],
            },
            {
              _key: "b2-10e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s2-10e", _type: "span", text: sanitizeText("• **Trans-Basin Energy Transfer**: Remnant atmospheric low-pressure systems originating in the South China Sea cross the Indochina landmass and enter the Bay of Bengal, where warm waters trigger rapid explosive cyclogenesis.") }],
            },
          ],
        },

        /* ── 3. Comparative Table Section ─────────────────────────── */
        {
          _key: "sec-comparison",
          kind: "background",
          title: sanitizeText("बंगाल की खाड़ी बनाम अरब सागर: तुलनात्मक विश्लेषण (Comparative Analysis)"),
          titleEn: sanitizeText("Bay of Bengal vs Arabian Sea: Meteorological Comparison"),
          body: [
            {
              _key: "b3-1",
              _type: "block",
              style: "normal",
              children: [{ _key: "s3-1", _type: "span", text: sanitizeText("• **वैज्ञानिक तुलना**: [MPPSC Prelims Syllabus](/mppsc/prelims-syllabus) एवं मुख्य परीक्षा के लिए दोनों समुद्री द्रोणियों के प्रमुख अंतरों को समझना अत्यंत आवश्यक है:") }],
            },
            createTable(
              "table-bob-vs-as",
              "बंगाल की खाड़ी बनाम अरब सागर: प्रमुख भौतिक व मौसम संबंधी अंतर",
              ["मापदंड (Parameter)", "बंगाल की खाड़ी (Bay of Bengal)", "अरब सागर (Arabian Sea)"],
              [
                ["औसत सतही तापमान (SST)", "28°C से 30°C (अत्यधिक गर्म)", "26°C से 27°C (तुलनात्मक रूप से ठंडा)"],
                ["चक्रवात आवृत्ति अनुपात", "लगभग 80% (4 गुना अधिक)", "लगभग 20% (कम चक्रवात)"],
                ["नदियों का मीठा पानी", "गंगा, ब्रह्मपुत्र, इरावदी आदि से भारी प्रवाह", "नर्मदा, ताप्ती, सिंधु (कम प्रवाह)"],
                ["लवणता एवं स्तरीकरण", "कम लवणता, स्थिर हल्की जल परत (कम Upwelling)", "अधिक लवणता, तीव्र ऊर्ध्वाधर मिश्रण (सक्रिय Upwelling)"],
                ["तटरेखा का आकार", "संकीर्ण कीप (Funnel) जैसी बनावट", "चौड़ा व खुला तटवर्ती क्षेत्र"],
                ["विंड शीयर (Wind Shear)", "मानसून पश्चात अत्यंत कमजोर (अनुकूल)", "अपेक्षाकृत तीव्र हवाएँ (प्रतिकूल)"],
                ["प्रशांत टाइफून का प्रभाव", "अवशेष सीधे प्रवेश कर पुनर्जीवित होते हैं", "सीधा प्रशांत प्रभाव नगण्य"]
              ]
            ),
            {
              _key: "b3-img",
              _type: "image",
              asset: { _type: "reference", _ref: assetInfographic._id },
              alt: "Bay of Bengal vs Arabian Sea Cyclone Comparative Infographic Map",
              caption: "चित्र: बंगाल की खाड़ी बनाम अरब सागर — तापमान, मीठे पानी के अंतर्प्रवाह व चक्रवाती मार्गों का भौगोलिक तुलनात्मक मानचित्र",
            },
          ],
          bodyEn: [
            {
              _key: "b3-1e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s3-1e", _type: "span", text: sanitizeText("• **Basin Contrast**: Core physical and meteorological differences between both oceanic basins in the North Indian Ocean:") }],
            },
            createTable(
              "table-bob-vs-as-en",
              "Comparative Analysis: Bay of Bengal vs Arabian Sea",
              ["Parameter", "Bay of Bengal", "Arabian Sea"],
              [
                ["Average SST", "28°C to 30°C (Warm Pool)", "26°C to 27°C (Cooler Basin)"],
                ["Cyclone Frequency Ratio", "80% of total (4:1 Dominance)", "20% of total events"],
                ["Freshwater River Inflow", "Huge (Ganga, Brahmaputra, Irrawaddy)", "Moderate (Narmada, Tapi, Indus)"],
                ["Salinity Stratification", "Lower salinity, buoyant top layer prevents cold upwelling", "Higher salinity, strong vertical convective mixing"],
                ["Coastal Bathymetry", "Narrow concave funnel coast (High surge)", "Open and deeper coastal configuration"],
                ["Vertical Wind Shear", "Very weak post-monsoon (Conducive)", "Stronger winds disrupt vortex formation"],
                ["Pacific Typhoons Influence", "Frequent remnant inflow from South China Sea", "Negligible direct Pacific influx"]
              ]
            ),
          ],
        },

        /* ── 4. Cyclone Genesis 6-Step Mechanism ─────────────────── */
        {
          _key: "sec-genesis",
          kind: "initiatives",
          title: sanitizeText("चक्रवात बनने की 6-चरणीय वैज्ञानिक प्रक्रिया (Cyclone Genesis Mechanism)"),
          titleEn: sanitizeText("6-Step Tropical Cyclogenesis Mechanism"),
          body: [
            {
              _key: "b4-1",
              _type: "block",
              style: "normal",
              children: [{ _key: "s4-1", _type: "span", text: sanitizeText("• **चरण 1: तीव्र वाष्पीकरण**: समुद्र की सतह का तापमान 26.5°C से अधिक होने पर पानी तेजी से वाष्पीकृत होता है।") }],
            },
            {
              _key: "b4-2",
              _type: "block",
              style: "normal",
              children: [{ _key: "s4-2", _type: "span", text: sanitizeText("• **चरण 2: निम्न वायुदाब का विकास**: गर्म और अत्यधिक नम हवा तेजी से ऊपर उठती है, जिससे समुद्र तल पर एक शक्तिशाली **निम्न वायुदाब क्षेत्र (Low Pressure Area)** निर्मित होता है।") }],
            },
            {
              _key: "b4-3",
              _type: "block",
              style: "normal",
              children: [{ _key: "s4-3", _type: "span", text: sanitizeText("• **चरण 3: अभिसरण (Convergence)**: आसपास के उच्च वायुदाब वाले क्षेत्रों से ठंडी व भारी हवा तेजी से इस निम्न दाब केंद्र की ओर भागती है।") }],
            },
            {
              _key: "b4-4",
              _type: "block",
              style: "normal",
              children: [{ _key: "s4-4", _type: "span", text: sanitizeText("• **चरण 4: संघनन एवं गुप्त ऊष्मा (Latent Heat of Condensation)**: ऊपर उठती हुई नम हवा क्षोभमंडल में ठंडी होकर संघनित होती है। संघनन की इस प्रक्रिया में निकलने वाली **गुप्त ऊष्मा (Latent Heat)** चक्रवात के लिए मुख्य इंजन का काम करती है और हवा को और अधिक तेजी से ऊपर खींचती है।") }],
            },
            {
              _key: "b4-5",
              _type: "block",
              style: "normal",
              children: [{ _key: "s4-5", _type: "span", text: sanitizeText("• **चरण 5: कोरिओलिस बल द्वारा चक्राकार घूर्णन**: पृथ्वी के अपने अक्ष पर घूर्णन के कारण लगने वाले **कोरिओलिस बल (Coriolis Force)** के प्रभाव से हवा उत्तरी गोलार्ध में **वामावर्त (Anti-Clockwise)** दिशा में तीव्र गति से घूमने लगती है।") }],
            },
            {
              _key: "b4-6",
              _type: "block",
              style: "normal",
              children: [{ _key: "s4-6", _type: "span", text: sanitizeText("• **चरण 6: चक्रवात का परिपक्व रूप (Eye Formation)**: केंद्र में शांत क्षेत्र **'चक्रवात की आँख' (Eye of the Cyclone)** तथा उसके चारों ओर भीषण तूफानी बादलों की **आई-वॉल (Eye Wall)** का निर्माण होता है।") }],
            },
          ],
          bodyEn: [
            {
              _key: "b4-1e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s4-1e", _type: "span", text: sanitizeText("• **Step 1: Rapid Evaporation**: Sea surface temperatures above 26.5°C trigger intensive moisture evaporation.") }],
            },
            {
              _key: "b4-2e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s4-2e", _type: "span", text: sanitizeText("• **Step 2: Low-Pressure Depletion**: Warm moist air expands and ascends dynamically, carving out a deep atmospheric low-pressure core at sea level.") }],
            },
            {
              _key: "b4-3e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s4-3e", _type: "span", text: sanitizeText("• **Step 3: Atmospheric Inflow**: Denser surrounding air rushes inwards toward the low-pressure pocket to balance the pressure gradient.") }],
            },
            {
              _key: "b4-4e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s4-4e", _type: "span", text: sanitizeText("• **Step 4: Release of Latent Heat**: As warm air ascends, condensation forms cumulonimbus clouds, unlocking massive **latent heat of condensation** that acts as the thermal powerhouse.") }],
            },
            {
              _key: "b4-5e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s4-5e", _type: "span", text: sanitizeText("• **Step 5: Coriolis Spin Deflection**: Earth's rotational Coriolis effect deflects converging air winds into a counter-clockwise spiral in the Northern Hemisphere.") }],
            },
            {
              _key: "b4-6e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s4-6e", _type: "span", text: sanitizeText("• **Step 6: Vortex Maturity & Eye Formation**: The mature cyclone exhibits a calm central 'Eye' enveloped by the destructive, high-velocity 'Eye Wall'.") }],
            },
          ],
        },

        /* ── 5. IMD Cyclone Classification Table ──────────────────── */
        {
          _key: "sec-classification",
          kind: "background",
          title: sanitizeText("उष्णकटिबंधीय चक्रवातों का वर्गीकरण (IMD Cyclone Classification)"),
          titleEn: sanitizeText("Tropical Cyclone Intensity Classification by IMD"),
          body: [
            {
              _key: "b5-1",
              _type: "block",
              style: "normal",
              children: [{ _key: "s5-1", _type: "span", text: sanitizeText("• **आईएमडी का आधिकारिक पैमाना**: भारतीय मौसम विज्ञान विभाग (IMD) निरंतर पवन गति (Sustained Wind Speed) के आधार पर चक्रवातों को 7 श्रेणियों में वर्गीकृत करता है:") }],
            },
            createTable(
              "table-imd-classification",
              "भारतीय मौसम विज्ञान विभाग (IMD) द्वारा चक्रवातों का तीव्रता वर्गीकरण",
              ["श्रेणी (Category)", "पवन गति (नॉट्स / Knots)", "पवन गति (किमी/घंटा / kmph)", "अवस्था / प्रभाव"],
              [
                ["कम दबाव का क्षेत्र (Low Pressure)", "< 17 नॉट्स", "< 31 किमी/घंटा", "प्रारंभिक मौसमी विक्षोभ"],
                ["अवदाब (Depression)", "17 से 27 नॉट्स", "31 से 49 किमी/घंटा", "स्थानीय वर्षा व तेज हवाएँ"],
                ["गहरा अवदाब (Deep Depression)", "28 से 33 नॉट्स", "50 से 61 किमी/घंटा", "भारी वर्षा व तटीय चेतावनी"],
                ["चक्रवाती तूफान (Cyclonic Storm - CS)", "34 से 47 नॉट्स", "62 से 88 किमी/घंटा", "नामकरण इसी स्तर पर होता है"],
                ["गंभीर चक्रवाती तूफान (Severe CS)", "48 से 63 नॉट्स", "89 से 117 किमी/घंटा", "पेड़ उखड़ना व संरचनात्मक क्षति"],
                ["अत्यंत गंभीर चक्रवाती तूफान (VSCS)", "64 से 89 नॉट्स", "118 से 166 किमी/घंटा", "व्यापक विनाशकारी लहरें"],
                ["अति गंभीर चक्रवाती तूफान (ESCS)", "90 से 119 नॉट्स", "167 से 221 किमी/घंटा", "भीषण तबाही व भारी जलभराव"],
                ["सुपर साइक्लोन (Super Cyclone)", "≥ 120 नॉट्स", "≥ 222 किमी/घंटा", "प्रलयंकारी प्रभाव (जैसे 1999 ओडिशा)"]
              ]
            ),
          ],
          bodyEn: [
            {
              _key: "b5-1e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s5-1e", _type: "span", text: sanitizeText("• **Official Scale**: The India Meteorological Department (IMD) classifies cyclonic disturbances into 7 categories based on 3-minute maximum sustained wind speeds:") }],
            },
            createTable(
              "table-imd-classification-en",
              "IMD Tropical Cyclone Intensity Classification Scale",
              ["Category", "Wind Speed (Knots)", "Wind Speed (km/h)", "Typical Impact"],
              [
                ["Low Pressure Area", "< 17 knots", "< 31 km/h", "Incipient stage disturbance"],
                ["Depression (D)", "17 to 27 knots", "31 to 49 km/h", "Localized rain squalls"],
                ["Deep Depression (DD)", "28 to 33 knots", "50 to 61 km/h", "Rough sea conditions"],
                ["Cyclonic Storm (CS)", "34 to 47 knots", "62 to 88 km/h", "Official naming occurs here"],
                ["Severe Cyclonic Storm (SCS)", "48 to 63 knots", "89 to 117 km/h", "Structural & foliage damage"],
                ["Very Severe Cyclonic Storm (VSCS)", "64 to 89 knots", "118 to 166 km/h", "Severe coastal storm surges"],
                ["Extremely Severe CS (ESCS)", "90 to 119 knots", "167 to 221 km/h", "Catastrophic damage profile"],
                ["Super Cyclonic Storm (SuCS)", "≥ 120 knots", "≥ 222 km/h", "Extreme devastation (e.g., 1999 Odisha)"]
              ]
            ),
          ],
        },

        /* ── 6. Naming System ─────────────────────────────────────── */
        {
          _key: "sec-naming",
          kind: "reforms",
          title: sanitizeText("चक्रवातों का नामकरण तंत्र: WMO/ESCAP पैनल (Cyclone Naming System)"),
          titleEn: sanitizeText("Cyclone Naming Mechanism: WMO/ESCAP Panel & 169-Name Roster"),
          body: [
            {
              _key: "b6-1",
              _type: "block",
              style: "h3",
              children: [{ _key: "s6-1", _type: "span", text: sanitizeText("13 देश, 169 नाम एवं आईएमडी की भूमिका") }],
            },
            {
              _key: "b6-2",
              _type: "block",
              style: "normal",
              children: [{ _key: "s6-2", _type: "span", text: sanitizeText("• **वैश्विक संस्था**: चक्रवातों के नामकरण की व्यवस्था **विश्व मौसम विज्ञान संगठन (WMO)** और संयुक्त राष्ट्र के **ESCAP (Economic and Social Commission for Asia and the Pacific)** पैनल के तत्वावधान में की जाती है।") }],
            },
            {
              _key: "b6-3",
              _type: "block",
              style: "normal",
              children: [{ _key: "s6-3", _type: "span", text: sanitizeText("• **13 सदस्य देश**: उत्तर हिंद महासागर (बंगाल की खाड़ी और अरब सागर) क्षेत्र में 13 तटीय देश शामिल हैं — **भारत, बांग्लादेश, ईरान, मालदीव, म्यांमार, ओमान, पाकिस्तान, कतर, सऊदी अरब, श्रीलंका, थाईलैंड, यूएई और यमन**।") }],
            },
            {
              _key: "b6-4",
              _type: "block",
              style: "normal",
              children: [{ _key: "s6-4", _type: "span", text: sanitizeText("• **169 नामों की नई सूची (2020)**: प्रत्येक देश ने 13-13 नाम सुझाए, जिससे **कुल 169 नामों** की व्यापक सूची तैयार की गई। चक्रवातों को अंग्रेजी वर्णमाला क्रम (Alphabetical Order of Countries) के अनुसार क्रमिक रूप से नाम दिए जाते हैं।") }],
            },
            {
              _key: "b6-5",
              _type: "block",
              style: "normal",
              children: [{ _key: "s6-5", _type: "span", text: sanitizeText("• **नामकरण की अनिवार्य शर्त**: चक्रवात का नाम तभी दिया जाता है, जब उसकी अधिकतम निरंतर पवन गति **34 समुद्री मील प्रति घंटा (लगभग 62 किमी/घंटा)** तक पहुँचती है। नई दिल्ली स्थित **भारत मौसम विज्ञान विभाग (IMD)** इस क्षेत्र में क्षेत्रीय विशिष्ट मौसम विज्ञान केंद्र (RSMC) के रूप में नामकरण व चेतावनी जारी करता है।") }],
            },
          ],
          bodyEn: [
            {
              _key: "b6-1e",
              _type: "block",
              style: "h3",
              children: [{ _key: "s6-1e", _type: "span", text: sanitizeText("13 Member Nations, 169 Names & IMD's Mandate") }],
            },
            {
              _key: "b6-2e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s6-2e", _type: "span", text: sanitizeText("• **Institutional Mechanism**: Cyclone nomenclature is managed under the mandate of the **World Meteorological Organization (WMO)** and the United Nations **ESCAP** panel.") }],
            },
            {
              _key: "b6-3e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s6-3e", _type: "span", text: sanitizeText("• **13 Member Nations**: The North Indian Ocean panel comprises 13 littoral nations: **India, Bangladesh, Iran, Maldives, Myanmar, Oman, Pakistan, Qatar, Saudi Arabia, Sri Lanka, Thailand, UAE, and Yemen**.") }],
            },
            {
              _key: "b6-4e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s6-4e", _type: "span", text: sanitizeText("• **169-Name Roster**: In April 2020, a new roster of 169 names was unveiled (13 names contributed by each of the 13 nations). Names are allocated sequentially following the alphabetical order of the contributing country.") }],
            },
            {
              _key: "b6-5e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s6-5e", _type: "span", text: sanitizeText("• **Naming Threshold**: A storm is designated a name only when sustained wind speeds reach **34 knots (~62 km/h)**. New Delhi's IMD serves as the Regional Specialized Meteorological Centre (RSMC) responsible for tracking and naming.") }],
            },
          ],
        },

        /* ── 7. Recent Cyclones 2026 ──────────────────────────────── */
        {
          _key: "sec-recent-cyclones",
          kind: "whyInNews",
          title: sanitizeText("अक्टूबर–नवंबर 2026 के प्रमुख चक्रवात (Recent Cyclones: Oct–Nov 2026)"),
          titleEn: sanitizeText("Recent Cyclonic Events of October–November 2026"),
          body: [
            {
              _key: "b7-1",
              _type: "block",
              style: "h3",
              children: [{ _key: "s7-1", _type: "span", text: sanitizeText("चक्रवात अर्नब एवं चक्रवात मुरासु") }],
            },
            {
              _key: "b7-2",
              _type: "block",
              style: "normal",
              children: [{ _key: "s7-2", _type: "span", text: sanitizeText("• **चक्रवात अर्नब (Cyclone Arnab)**: अक्टूबर 2026 के अंत में मध्य-पूर्व बंगाल की खाड़ी में विकसित हुआ। इसने ओडिशा और आंध्र प्रदेश के तटीय जिलों में मूसलाधार बारिश और 75-85 किमी/घंटा की गति से तेज हवाओं को प्रेरित किया।") }],
            },
            {
              _key: "b7-3",
              _type: "block",
              style: "normal",
              children: [{ _key: "s7-3", _type: "span", text: sanitizeText("• **चक्रवात मुरासु (Cyclone Murasu)**: नवंबर 2026 की शुरुआत में दक्षिण-पश्चिम बंगाल की खाड़ी में तमिलनाडु और पुडुचेरी तट के समीप तीव्र हुआ। इसका नाम मालदीव द्वारा सुझाया गया था।") }],
            },
          ],
          bodyEn: [
            {
              _key: "b7-1e",
              _type: "block",
              style: "h3",
              children: [{ _key: "s7-1e", _type: "span", text: sanitizeText("Recent Cyclones: Arnab and Murasu") }],
            },
            {
              _key: "b7-2e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s7-2e", _type: "span", text: sanitizeText("• **Cyclone Arnab**: Formed in late October 2026 over the east-central Bay of Bengal, causing extensive squally rains across the coasts of Odisha and Andhra Pradesh.") }],
            },
            {
              _key: "b7-3e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s7-3e", _type: "span", text: sanitizeText("• **Cyclone Murasu**: Developed in early November 2026 over the southwest Bay of Bengal heading towards Tamil Nadu and Puducherry. The name 'Murasu' was contributed by Maldives.") }],
            },
          ],
        },

        /* ── 8. High-Yield Exam Facts ─────────────────────────────── */
        {
          _key: "sec-exam-facts",
          kind: "background",
          title: sanitizeText("MPPSC एवं UPSC परीक्षा हेतु महत्वपूर्ण स्मरणीय तथ्य (High-Yield Facts)"),
          titleEn: sanitizeText("High-Yield Memory Points for MPPSC & UPSC Aspirants"),
          body: [
            {
              _key: "b8-1",
              _type: "block",
              style: "normal",
              children: [{ _key: "s8-1", _type: "span", text: sanitizeText("• **चक्रवात निर्माण के लिए न्यूनतम समुद्री तापमान**: 26.5°C या उससे अधिक।") }],
            },
            {
              _key: "b8-2",
              _type: "block",
              style: "normal",
              children: [{ _key: "s8-2", _type: "span", text: sanitizeText("• **बंगाल की खाड़ी में गिरने वाली प्रमुख नदियाँ**: गंगा, ब्रह्मपुत्र, महानदी, गोदावरी, कृष्णा, कावेरी एवं इरावदी।") }],
            },
            {
              _key: "b8-3",
              _type: "block",
              style: "normal",
              children: [{ _key: "s8-3", _type: "span", text: sanitizeText("• **चक्रवात की ऊर्जा का मुख्य स्रोत**: संघनन की गुप्त ऊष्मा (Latent Heat of Condensation)।") }],
            },
            {
              _key: "b8-4",
              _type: "block",
              style: "normal",
              children: [{ _key: "s8-4", _type: "span", text: sanitizeText("• **उत्तरी गोलार्ध में चक्रवातों की घूर्णन दिशा**: वामावर्त (Anti-Clockwise), कोरिओलिस बल के कारण।") }],
            },
            {
              _key: "b8-5",
              _type: "block",
              style: "normal",
              children: [{ _key: "s8-5", _type: "span", text: sanitizeText("• **उत्तर हिंद महासागर में नामकरण हेतु योगदानकर्ता देश**: 13 देश।") }],
            },
            {
              _key: "b8-6",
              _type: "block",
              style: "normal",
              children: [{ _key: "s8-6", _type: "span", text: sanitizeText("• **कुल प्रस्तावित चक्रवात नामों की सूची**: 169 नाम (13 × 13)।") }],
            },
            {
              _key: "b8-7",
              _type: "block",
              style: "normal",
              children: [{ _key: "s8-7", _type: "span", text: sanitizeText("• **नामकरण हेतु न्यूनतम पवन गति थ्रेशोल्ड**: 34 नॉट्स (लगभग 62 किमी/घंटा)।") }],
            },
            {
              _key: "b8-8",
              _type: "block",
              style: "normal",
              children: [{ _key: "s8-8", _type: "span", text: sanitizeText("• **नोडल पूर्वानुमान एवं नामकरण एजेंसी**: भारत मौसम विज्ञान विभाग (IMD, नई दिल्ली)।") }],
            },
          ],
          bodyEn: [
            {
              _key: "b8-1e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s8-1e", _type: "span", text: sanitizeText("• **Critical SST Threshold for Cyclone Genesis**: 26.5°C or higher.") }],
            },
            {
              _key: "b8-2e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s8-2e", _type: "span", text: sanitizeText("• **Major Freshwater River Systems**: Ganga, Brahmaputra, Mahanadi, Godavari, Krishna, Irrawaddy.") }],
            },
            {
              _key: "b8-3e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s8-3e", _type: "span", text: sanitizeText("• **Primary Energy Source**: Latent Heat of Condensation.") }],
            },
            {
              _key: "b8-4e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s8-4e", _type: "span", text: sanitizeText("• **Direction of Rotation in Northern Hemisphere**: Counter-Clockwise (due to Coriolis deflection).") }],
            },
            {
              _key: "b8-5e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s8-5e", _type: "span", text: sanitizeText("• **Contributing Countries in North Indian Ocean**: 13 littoral nations.") }],
            },
            {
              _key: "b8-6e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s8-6e", _type: "span", text: sanitizeText("• **Total Names on Approved Roster**: 169 names (13 nations × 13 names each).") }],
            },
            {
              _key: "b8-7e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s8-7e", _type: "span", text: sanitizeText("• **Naming Wind Speed Threshold**: 34 knots (~62 km/h).") }],
            },
            {
              _key: "b8-8e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s8-8e", _type: "span", text: sanitizeText("• **Designated Regional RSMC**: India Meteorological Department (IMD, New Delhi).") }],
            },
          ],
        },
      ],

      /* ── 8 Practice MCQs (Quizzes) ──────────────────────────────── */
      mcqs: [
        {
          question: "उत्तर हिंद महासागर क्षेत्र में चक्रवातों के नामकरण की सूची में कितने देश योगदान देते हैं?",
          questionEn: "How many littoral nations contribute names to the North Indian Ocean tropical cyclone roster?",
          options: ["8", "10", "13", "15"],
          optionsEn: ["8", "10", "13", "15"],
          correctIndex: 2,
          explanation: "उत्तर हिंद महासागर क्षेत्र में भारत, बांग्लादेश, ईरान, मालदीव, म्यांमार, ओमान, पाकिस्तान, कतर, सऊदी अरब, श्रीलंका, थाईलैंड, यूएई और यमन सहित 13 देश नाम सुझाते हैं। प्रत्येक देश 13 नाम देता है, जिससे कुल 169 नामों की सूची तैयार होती है।",
          explanationEn: "13 countries (India, Bangladesh, Iran, Maldives, Myanmar, Oman, Pakistan, Qatar, Saudi Arabia, Sri Lanka, Thailand, UAE, Yemen) contribute 13 names each, creating a master roster of 169 names."
        },
        {
          question: "उष्णकटिबंधीय चक्रवात (Tropical Cyclone) बनने के लिए समुद्र की सतह का न्यूनतम तापमान (SST) सामान्यतः कितना होना आवश्यक है?",
          questionEn: "What is the recognized minimum Sea Surface Temperature (SST) threshold required for tropical cyclogenesis?",
          options: ["22.0°C", "24.5°C", "26.5°C", "32.0°C"],
          optionsEn: ["22.0°C", "24.5°C", "26.5°C", "32.0°C"],
          correctIndex: 2,
          explanation: "चक्रवात के निर्माण और तीव्र संवहन के लिए समुद्र की सतह का तापमान कम से कम 26.5°C या उससे अधिक होना चाहिए। बंगाल की खाड़ी का तापमान प्रायः 28°C–30°C रहता है।",
          explanationEn: "A sea surface temperature of at least 26.5°C is universally recognized as the essential thermal threshold for sustaining cyclonic convection."
        },
        {
          question: "बंगाल की खाड़ी में अरब सागर की तुलना में कम लवणता और अधिक सतही तापमान का मुख्य कारण क्या है?",
          questionEn: "What is the primary factor driving lower salinity and warmer surface water in the Bay of Bengal compared to the Arabian Sea?",
          options: ["गंगा एवं ब्रह्मपुत्र जैसी विशाल नदियों से मीठे पानी का भारी प्रवाह", "अरब सागर में अधिक सूर्यताप", "प्रशांत महासागर की ठंडी धाराएँ", "कोरिओलिस बल का अभाव"],
          optionsEn: ["Massive freshwater runoff from the Ganga and Brahmaputra river systems", "Higher insolation in Arabian Sea", "Cold currents from Pacific Ocean", "Absence of Coriolis force"],
          correctIndex: 0,
          explanation: "गंगा, ब्रह्मपुत्र और इरावदी नदियों से आने वाला मीठा पानी समुद्र की ऊपरी सतह पर हल्की परत बनाता है, जिससे गहरा ठंडा पानी ऊपर नहीं आ पाता (Upwelling बाधित होती है)।",
          explanationEn: "Huge freshwater discharge from Ganga and Brahmaputra creates a buoyant surface layer that inhibits cold water upwelling, trapping heat at the surface."
        },
        {
          question: "किसी मौसमी विक्षोभ को आधिकारिक तौर पर 'चक्रवाती तूफान' (Cyclonic Storm) मानकर नाम दिए जाने हेतु न्यूनतम निरंतर पवन गति कितनी होनी चाहिए?",
          questionEn: "What is the minimum sustained wind speed required for an atmospheric system to be officially classified and named as a Cyclonic Storm?",
          options: ["17 नॉट्स (31 किमी/घंटा)", "28 नॉट्स (50 किमी/घंटा)", "34 नॉट्स (62 किमी/घंटा)", "64 नॉट्स (118 किमी/घंटा)"],
          optionsEn: ["17 knots (31 km/h)", "28 knots (50 km/h)", "34 knots (62 km/h)", "64 knots (118 km/h)"],
          correctIndex: 2,
          explanation: "जब किसी मौसमी विक्षोभ में निरंतर पवन गति 34 समुद्री मील (नॉट्स) यानी लगभग 62 किमी/घंटा तक पहुँचती है, तब उसे चक्रवाती तूफान का दर्जा देकर WMO/ESCAP सूची से नाम दिया जाता है।",
          explanationEn: "A storm is officially named when its 3-minute sustained wind speed reaches 34 knots (~62 km/h), crossing the threshold into Cyclonic Storm status."
        },
        {
          question: "उत्तरी गोलार्ध (Northern Hemisphere) में उष्णकटिबंधीय चक्रवात किस दिशा में घूमते हैं?",
          questionEn: "In which direction do tropical cyclones rotate in the Northern Hemisphere?",
          options: ["घड़ी की सुई की दिशा में (Clockwise)", "वामावर्त या घड़ी की सुई के विपरीत (Counter-Clockwise / Anti-Clockwise)", "सीधी रेखा में", "पूर्व से पश्चिम की ओर बिना घूर्णन के"],
          optionsEn: ["Clockwise", "Counter-Clockwise / Anti-Clockwise", "Linear Path", "East to West without rotation"],
          correctIndex: 1,
          explanation: "पृथ्वी के घूर्णन के कारण लगने वाले कोरिओलिस बल (Coriolis Force) के प्रभाव से उत्तरी गोलार्ध में चक्रवात हमेशा वामावर्त (Anti-Clockwise) घूमते हैं।",
          explanationEn: "The Coriolis effect deflects converging wind vectors to the right in the Northern Hemisphere, inducing a counter-clockwise rotational spin."
        },
        {
          question: "उष्णकटिबंधीय चक्रवात को ऊर्जा और तीव्रता प्रदान करने वाला मुख्य 'ऊष्मीय इंजन' (Thermal Engine) क्या है?",
          questionEn: "What acts as the primary thermodynamic engine powering a tropical cyclone?",
          options: ["जल के संघनन की गुप्त ऊष्मा (Latent Heat of Condensation)", "समुद्री ज्वार-भाटा की गतिज ऊर्जा", "चंद्रमा का गुरुत्वाकर्षण खिंचाव", "ओजोन परत द्वारा अवशोषित विकिरण"],
          optionsEn: ["Latent Heat of Condensation", "Kinetic energy of ocean tides", "Gravitational pull of the Moon", "Ozone layer absorption"],
          correctIndex: 0,
          explanation: "जब गर्म और नम हवा ऊपर उठती है और ठंडी होकर बादलों में बदलती है, तो संघनन की गुप्त ऊष्मा निकलती है, जो हवा को और ऊपर खींचकर निम्न दाब को और अधिक गहरा बनाती है।",
          explanationEn: "Latent heat released during water vapor condensation within towering cumulonimbus clouds fuels the cyclone's rapid vertical convective chimney."
        },
        {
          question: "उत्तर हिंद महासागर क्षेत्र में चक्रवातों की निगरानी, पूर्वानुमान एवं नामकरण हेतु अधिकृत 'क्षेत्रीय विशिष्ट मौसम विज्ञान केंद्र' (RSMC) कहाँ स्थित है?",
          questionEn: "Where is the designated Regional Specialized Meteorological Centre (RSMC) for cyclone forecasting and naming in the North Indian Ocean located?",
          options: ["कराची (पाकिस्तान)", "कोलंबो (श्रीलंका)", "नई दिल्ली (भारत - IMD)", "ढाका (बांग्लादेश)"],
          optionsEn: ["Karachi (Pakistan)", "Colombo (Sri Lanka)", "New Delhi (India - IMD)", "Dhaka (Bangladesh)"],
          correctIndex: 2,
          explanation: "WMO द्वारा नई दिल्ली स्थित भारत मौसम विज्ञान विभाग (IMD) को उत्तर हिंद महासागर क्षेत्र के लिए क्षेत्रीय विशिष्ट मौसम विज्ञान केंद्र (RSMC) के रूप में नामित किया गया है।",
          explanationEn: "India Meteorological Department (IMD) at New Delhi functions as the official WMO-designated Regional Specialized Meteorological Centre (RSMC)."
        },
        {
          question: "भारतीय मौसम विज्ञान विभाग (IMD) के अनुसार 'सुपर साइक्लोन' (Super Cyclonic Storm) हेतु न्यूनतम निरंतर पवन गति कितनी होनी चाहिए?",
          questionEn: "According to the IMD classification scale, what is the wind speed threshold for a Super Cyclonic Storm?",
          options: ["89 किमी/घंटा", "118 किमी/घंटा", "167 किमी/घंटा", "222 किमी/घंटा या अधिक (≥ 120 नॉट्स)"],
          optionsEn: ["89 km/h", "118 km/h", "167 km/h", "222 km/h or more (≥ 120 knots)"],
          correctIndex: 3,
          explanation: "IMD के अनुसार जब निरंतर पवन गति 120 नॉट्स (222 किमी/घंटा या उससे अधिक) हो जाती है, तो उसे 'सुपर साइक्लोन' कहा जाता है (जैसे 1999 का ओडिशा सुपर साइक्लोन)।",
          explanationEn: "Sustained wind speeds of 120 knots (222 km/h or higher) designate a Super Cyclonic Storm, representing the peak destructive category."
        }
      ],

      /* ── 10 Collapsible FAQs ────────────────────────────────────── */
      faqs: [
        {
          question: "बंगाल की खाड़ी में अरब सागर की तुलना में अधिक चक्रवात क्यों आते हैं?",
          questionEn: "Why does the Bay of Bengal experience more cyclones than the Arabian Sea?",
          answer: "बंगाल की खाड़ी में उच्च सतही तापमान (28°C–30°C), गंगा-ब्रह्मपुत्र नदियों से भारी मीठे पानी का प्रवाह (जिससे खारे पानी की उपवेल्लिंग रुकती है), कीप जैसी संकरी तटरेखा, कमजोर विंड शीयर और प्रशांत टाइफून के अवशेषों का पुनर्जीवित होना इसके 5 प्रमुख कारण हैं।",
          answerEn: "Warmer Sea Surface Temperatures (28°C–30°C), freshwater runoff preventing cold upwelling, funnel coastline geometry, weak vertical wind shear, and influx of Pacific typhoon remnants drive higher frequency."
        },
        {
          question: "चक्रवात निर्माण के लिए न्यूनतम समुद्री तापमान कितना आवश्यक है?",
          questionEn: "What is the minimum sea surface temperature required for cyclone genesis?",
          answer: "उष्णकटिबंधीय चक्रवात बनने के लिए समुद्र की सतह का तापमान कम से कम 26.5°C या उससे अधिक होना आवश्यक है।",
          answerEn: "A minimum sea surface temperature of 26.5°C is required to supply sufficient moisture and convective energy."
        },
        {
          question: "गंगा और ब्रह्मपुत्र का मीठा पानी चक्रवात निर्माण में कैसे सहायता करता है?",
          questionEn: "How does freshwater from Ganga and Brahmaputra facilitate cyclone formation?",
          answer: "मीठा पानी खारे पानी से हल्का होता है, जिससे समुद्र की सतह पर एक गर्म पानी की परत बन जाती है। यह परत गहरे ठंडे समुद्री जल को ऊपर आने से रोकती है, जिससे सतह का तापमान लगातार 28°C से ऊपर बना रहता है।",
          answerEn: "Freshwater creates a low-density surface cap that blocks cold, deep-ocean water from upwelling, preserving high surface water temperatures."
        },
        {
          question: "उत्तर हिंद महासागर में चक्रवातों का नामकरण कौन करता है?",
          questionEn: "Who names cyclones in the North Indian Ocean?",
          answer: "विश्व मौसम विज्ञान संगठन (WMO) और ESCAP पैनल के अंतर्गत नई दिल्ली स्थित भारत मौसम विज्ञान विभाग (IMD) द्वारा 13 सदस्य देशों द्वारा सुझाई गई 169 नामों की सूची से नामकरण किया जाता है।",
          answerEn: "The India Meteorological Department (IMD, New Delhi) issues names from a 169-name roster agreed upon by 13 member littoral nations under WMO/ESCAP."
        },
        {
          question: "चक्रवातों के नामकरण में कितने देश शामिल हैं?",
          questionEn: "How many countries are part of the cyclone naming panel for the North Indian Ocean?",
          answer: "कुल 13 देश: भारत, बांग्लादेश, ईरान, मालदीव, म्यांमार, ओमान, पाकिस्तान, कतर, सऊदी अरब, श्रीलंका, थाईलैंड, यूएई और यमन।",
          answerEn: "13 littoral countries: India, Bangladesh, Iran, Maldives, Myanmar, Oman, Pakistan, Qatar, Saudi Arabia, Sri Lanka, Thailand, UAE, and Yemen."
        },
        {
          question: "चक्रवात का नाम कब दिया जाता है?",
          questionEn: "At what wind speed is a cyclone officially given a name?",
          answer: "जब चक्रवाती विक्षोभ की निरंतर पवन गति 34 नॉट्स (लगभग 62 किमी/घंटा) तक पहुँचती है, तब उसे आधिकारिक रूप से नाम दिया जाता है।",
          answerEn: "A storm receives an official name when its maximum sustained wind speed reaches 34 knots (~62 km/h)."
        },
        {
          question: "अक्टूबर–नवंबर 2026 में बंगाल की खाड़ी में कौन से प्रमुख चक्रवात विकसित हुए?",
          questionEn: "Which major cyclones formed in the Bay of Bengal during October–November 2026?",
          answer: "अक्टूबर 2026 के अंत में 'चक्रवात अर्नब' और नवंबर 2026 की शुरुआत में 'चक्रवात मुरासु' विकसित हुए।",
          answerEn: "Cyclone Arnab formed in late October 2026, followed by Cyclone Murasu in early November 2026."
        },
        {
          question: "चक्रवात की आँख (Eye of the Cyclone) क्या होती है?",
          questionEn: "What is the Eye of a Cyclone?",
          answer: "चक्रवात की आँख उसके केंद्र में स्थित लगभग 20 से 50 किमी चौड़ा अत्यंत शांत, बादलरहित और निम्नतम वायुदाब वाला क्षेत्र होता है।",
          answerEn: "The Eye is the calm, cloud-free circular core (20–50 km wide) featuring the lowest atmospheric pressure of the vortex."
        },
        {
          question: "उत्तरी गोलार्ध में चक्रवात एंटी-क्लॉकवाइज (वामावर्त) क्यों घूमते हैं?",
          questionEn: "Why do cyclones rotate counter-clockwise in the Northern Hemisphere?",
          answer: "पृथ्वी के घूर्णन से उत्पन्न कोरिओलिस बल के कारण उत्तरी गोलार्ध में गतिशील हवाएँ अपनी दाहिनी ओर मुड़ती हैं, जिससे चक्रवाती परिसंचरण वामावर्त हो जाता है।",
          answerEn: "The Coriolis effect deflects inward-rushing winds to the right in the Northern Hemisphere, generating counter-clockwise cyclonic rotation."
        },
        {
          question: "तूफानी महोर्मि (Storm Surge) क्या होती है?",
          questionEn: "What is a Storm Surge?",
          answer: "चक्रवाती हवाओं और अत्यधिक निम्न वायुदाब के कारण समुद्र का जलस्तर सामान्य ज्वार से कई मीटर ऊपर उठकर तटवर्ती क्षेत्रों में बाढ़ ला देता है, जिसे तूफानी महोर्मि कहते हैं।",
          answerEn: "A storm surge is an abnormal rise in sea level above astronomical tides caused by intense cyclonic winds and shallow coastal bathymetry."
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

