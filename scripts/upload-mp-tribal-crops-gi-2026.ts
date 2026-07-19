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

// Helper to convert an array of bullet strings into separate Portable Text blocks
function createBlocks(items: string[]): any[] {
  return items.map((text, idx) => {
    const randomSuffix = Math.random().toString(36).substring(2, 9);
    return {
      _key: `block-${idx}-${randomSuffix}`,
      _type: "block",
      style: "normal",
      children: [
        {
          _key: `span-${idx}-${randomSuffix}`,
          _type: "span",
          text: text,
        },
      ],
    };
  });
}

// Helper to create a custom table block
function createTable(key: string, caption: string, headers: string[], rows: string[][]): any {
  return {
    _key: key,
    _type: "table",
    table: {
      caption,
      headers,
      rows,
    },
  };
}

async function main() {
  console.log("🚀 Starting upload process for MP Tribal Crops GI Tags 2026 Current Affairs Article...");

  // Image file paths in public/images/blog/
  const imagePaths = {
    banner: path.resolve(process.cwd(), "public/images/blog/mp-tribal-crops-2026-1.png"),
    field: path.resolve(process.cwd(), "public/images/blog/mp-tribal-crops-2026-2.png"),
    pulses: path.resolve(process.cwd(), "public/images/blog/mp-tribal-crops-2026-3.png"),
  };

  // Check if files exist
  if (!fs.existsSync(imagePaths.banner) || !fs.existsSync(imagePaths.field) || !fs.existsSync(imagePaths.pulses)) {
    console.error("❌ Required images not found in public/images/blog/");
    process.exit(1);
  }

  // 1. Clean up old Static GK article (prevent duplicates)
  console.log("🧹 Cleaning up old Static GK article (if it exists)...");
  try {
    await client.delete("gk-mp-tribal-crops-gi-2026");
    console.log("✔ Successfully deleted old Static GK document ID: gk-mp-tribal-crops-gi-2026");
  } catch (err) {
    console.warn("⚠ Old Static GK document did not exist or could not be deleted:", err);
  }

  // 2. Upload Banner Image
  console.log("📸 Uploading banner image...");
  const assetBanner = await client.assets.upload("image", fs.createReadStream(imagePaths.banner), {
    filename: "mp_tribal_crops_banner_2026.png",
  });
  console.log(`✔ Uploaded banner image. Asset ID: ${assetBanner._id}`);

  // 3. Upload Field Image
  console.log("📸 Uploading field image...");
  const assetField = await client.assets.upload("image", fs.createReadStream(imagePaths.field), {
    filename: "mp_kutki_field_2026.png",
  });
  console.log(`✔ Uploaded field image. Asset ID: ${assetField._id}`);

  // 4. Upload Pulses Image
  console.log("📸 Uploading pulses image...");
  const assetPulses = await client.assets.upload("image", fs.createReadStream(imagePaths.pulses), {
    filename: "mp_baiga_arhar_pulses_2026.png",
  });
  console.log(`✔ Uploaded pulses image. Asset ID: ${assetPulses._id}`);

  // 5. Construct the Article document with _type: "currentAffairs"
  const article = {
    _id: "ca-mp-tribal-crops-gi-2026",
    _type: "currentAffairs",
    slug: { _type: "slug", current: "mp-tribal-crops-gi-2026" },
    title: "मध्य प्रदेश की 4 आदिवासी फसलों को मिला GI टैग: पारंपरिक कृषि विरासत को राष्ट्रीय पहचान",
    titleEn: "4 Tribal Crops of Madhya Pradesh Secure GI Tags: National Recognition for Indigenous Agricultural Heritage",
    excerpt: "मध्य प्रदेश की चार पारंपरिक आदिवासी फसलों—सीताही कुटकी, नागदमन कुटकी, बैगानी अरहर और महाकोशल छत्रिया चावल—को भौगोलिक संकेत (GI) टैग प्राप्त हुआ है। यह उनकी विशिष्ट गुणवत्ता और पारंपरिक खेती को संरक्षित करने की दिशा में एक बड़ा कदम है।",
    excerptEn: "Four traditional tribal crops of Madhya Pradesh—Sitahi Kutki, Nagdaman Kutki, Baigani Arhar, and Mahakoshal Chhatriya Rice—have been granted GI tags, protecting their indigenous agricultural heritage.",
    ca_date: "2026-07-14",
    publishedAt: new Date().toISOString(),
    featured: true,
    readingTime: 6,
    keywords: [
      "MP Tribal Crops GI Tag",
      "Sitahi Kutki Dindori",
      "Nagdaman Kutki MP",
      "Baigani Arhar Baiga Tribe",
      "Chhatriya Dhan Jabalpur Katni",
      "MP GK Current Affairs",
      "MPPSC Prelims GK",
      "Geographical Indications of Goods Act 1999",
      "PVTG Baiga Tribe MP",
      "मध्य प्रदेश आदिवासी फसल जीआई टैग",
      "सीताही कुटकी डिंडोरी",
      "बैगानी अरहर दाल",
      "छत्रिया धान जबलपुर",
      "एमपीपीएससी मुख्य परीक्षा"
    ],
    category: { _type: "reference", _ref: "cat-mpgk" }, // MP GK subject category
    author: { _type: "reference", _ref: "author-aakar" },
    tags: [
      { _type: "reference", _ref: "tag-upsc" },
      { _type: "reference", _ref: "tag-mppsc" },
      { _type: "reference", _ref: "tag-prelims" },
      { _type: "reference", _ref: "tag-mains" },
      { _type: "reference", _ref: "tag-mp-ca" }, // MP Current Affairs
    ],
    syllabus: ["GS-3", "Prelims-GS"],
    featuredImage: {
      _type: "image",
      asset: { _type: "reference", _ref: assetBanner._id },
      alt: "Traditional tribal agricultural crops of Madhya Pradesh including Sitahi Kutki millet, Baigani Arhar pulse, and Chhatriya rice displayed in rustic pots",
    },
    sections: [
      /* Section 1: Context */
      {
        _key: "sec-context",
        kind: "whyInNews",
        title: "प्रसंग (Context)",
        titleEn: "Why in News?",
        body: createBlocks([
          "मध्य प्रदेश की चार पारंपरिक आदिवासी फसलों को भौगोलिक संकेत (Geographical Indication - GI) टैग प्रदान किया गया है। यह सम्मान इन फसलों की विशिष्ट गुणवत्ता, भौगोलिक पहचान, पारंपरिक खेती और आदिवासी विरासत को संरक्षित करने की दिशा में महत्वपूर्ण कदम है। इससे किसानों की आय बढ़ेगी, जैविक खेती को बढ़ावा मिलेगा तथा अंतरराष्ट्रीय बाजार में इन उत्पादों की पहचान मजबूत होगी।"
        ]),
        bodyEn: createBlocks([
          "Four traditional tribal crops of Madhya Pradesh have been granted the Geographical Indication (GI) tag. This recognition marks a significant step toward preserving the unique quality, geographical origin, traditional farming methods, and indigenous tribal heritage of these crops. The GI status will help increase farmers' incomes, encourage organic farming, and establish a strong presence for these products in global markets."
        ]),
      },

      /* Section 2: Detailed description of the crops */
      {
        _key: "sec-crops-description",
        kind: "keyHighlights",
        title: "GI टैग प्राप्त फसलों का विस्तृत विवरण",
        titleEn: "Details of the Four GI-Tagged Crops",
        body: [
          ...createBlocks([
            "मध्य प्रदेश के जनजातीय क्षेत्रों से संबंधित चारों फसलों का विवरण निम्न प्रकार है:",
            "• सीताही कुटकी (Sitahi Kutki): डिंडोरी जिले में मुख्य रूप से बैगा एवं गोंड जनजातियों द्वारा उगाई जाने वाली एक लघु अनाज (Millet) फसल है। यह अत्यधिक पौष्टिक, मोटा अनाज है जो कम वर्षा और सूखा सहन करने में सक्षम है।",
            "• नागदमन कुटकी (Nagdaman Kutki): यह भी डिंडोरी जिले की बैगा एवं गोंड जनजातियों द्वारा उगाई जाने वाली एक पारंपरिक वर्षा-आधारित मिलेट फसल है। यह आदिवासी समुदाय का प्रमुख खाद्यान्न रहा है और इसका पोषण स्तर बहुत उच्च है।"
          ]),
          {
            _key: "b2-img-field",
            _type: "image",
            asset: { _type: "reference", _ref: assetField._id },
            alt: "A lush green organic millet field of Kutki crop in Dindori, Madhya Pradesh, with local tribal farmers working in the background",
          },
          ...createBlocks([
            "• बैगानी अरहर (Baigani Arhar): डिंडोरी जिले की बैगा जनजाति की एक पारंपरिक अरहर (तूर दाल) की किस्म है। इसकी खेती रासायनिक उर्वरकों या कीटनाशकों के बिना पूरी तरह जैविक तरीके से की जाती है, जिसके कारण इसका स्वाद और पौष्टिकता उत्कृष्ट होती है।",
            "• महाकोशल छत्रिया चावल (Chhatriya Dhan): जबलपुर और कटनी जिलों में उगाई जाने वाली धान की एक पारंपरिक किस्म है। यह अपनी अनूठी सुगंध, बेहतर स्वाद, उच्च गुणवत्ता और स्थानीय जलवायु परिस्थितियों के प्रति अनुकूलता के लिए जानी जाती है।"
          ])
        ],
        bodyEn: [
          ...createBlocks([
            "A brief breakdown of the agricultural and geographic traits of each of the four crops is detailed below:",
            "• Sitahi Kutki: A traditional small millet crop cultivated mainly by the Baiga and Gond tribes in the Dindori district. It is highly nutritious, drought-resistant, and grown using age-old organic methods.",
            "• Nagdaman Kutki: Another rain-fed small millet variety grown by Gond and Baiga tribal communities in Dindori. It serves as a primary food crop for these tribes and is valued for its rich dietary fiber and mineral content."
          ]),
          {
            _key: "b2-img-field-en",
            _type: "image",
            asset: { _type: "reference", _ref: assetField._id },
            alt: "A lush green organic millet field of Kutki crop in Dindori, Madhya Pradesh, with local tribal farmers working in the background",
          },
          ...createBlocks([
            "• Baigani Arhar: An indigenous pigeon pea (toor dal) variety cultivated by the Baiga PVTG in Dindori. Since it is grown completely free of synthetic fertilizers and chemicals, it holds an exceptional earthy flavor and texture.",
            "• Mahakoshal Chhatriya Rice (Chhatriya Dhan): A traditional variety of paddy cultivated in Jabalpur and Katni districts. It is renowned locally for its distinct aroma, superior taste, and resistance to regional climate extremes."
          ])
        ],
      },

      /* Section 3: Comparison Table */
      {
        _key: "sec-comparison-table",
        kind: "factsAtAGlance",
        title: "GI टैग प्राप्त चारों फसलों का तुलनात्मक अवलोकन",
        titleEn: "Comparative Overview of the Four GI Crops",
        body: [
          createTable(
            "table-crops-hi",
            "मध्य प्रदेश की चार नव-पंजीकृत जीआई फसलें",
            ["फसल (Crop)", "उत्पादक क्षेत्र", "प्रमुख जनजाति", "विशेषताएं एवं लाभ"],
            [
              ["सीताही कुटकी", "डिंडोरी", "बैगा एवं गोंड", "सूखा रोधी लघु धान्य (मोटा अनाज), उच्च लौह तत्व (Iron) व पोषण"],
              ["नागदमन कुटकी", "डिंडोरी", "बैगा एवं गोंड", "वर्षा आधारित खेती, फाइबर युक्त औषधीय व पोषण गुण"],
              ["बैगानी अरहर", "डिंडोरी", "बैगा जनजाति", "बिना रसायनों के पारंपरिक जैविक दाल, लाजवाब स्वाद"],
              ["महाकोशल छत्रिया चावल", "जबलपुर एवं कटनी", "स्थानीय समुदाय", "सुगंधित चावल, स्थानीय पर्यावरण के अनुकूल, उच्च उत्पादकता"]
            ]
          )
        ],
        bodyEn: [
          createTable(
            "table-crops-en",
            "Comparative analysis of newly tagged MP tribal crops",
            ["Crop Name", "Cultivation Region", "Associated Tribe", "Key Features & Merits"],
            [
              ["Sitahi Kutki", "Dindori", "Baiga & Gond", "Drought-tolerant millet, rich in iron, minerals, and micro-nutrients"],
              ["Nagdaman Kutki", "Dindori", "Baiga & Gond", "Rain-fed organic crop, high dietary fiber and medicinal values"],
              ["Baigani Arhar", "Dindori", "Baiga Tribe", "Traditional chemical-free organic pigeon pea, premium earthy taste"],
              ["Mahakoshal Chhatriya Rice", "Jabalpur & Katni", "Local Farmers", "Aromatic long-grain paddy, resilient to local climate shocks"]
            ]
          )
        ],
      },

      /* Section 4: What is GI Tag */
      {
        _key: "sec-what-is-gi",
        kind: "background",
        title: "जीआई (Geographical Indication) का सामान्य परिचय",
        titleEn: "Understanding Geographical Indications (GI Tags)",
        body: createBlocks([
          "जीआई (Geographical Indication) एक ऐसा बौद्धिक संपदा अधिकार (IPR) है जो किसी उत्पाद की विशिष्ट गुणवत्ता, प्रतिष्ठा या पहचान को उसके विशिष्ट भौगोलिक क्षेत्र से जोड़ता है।",
          "• कानून: वस्तुओं का भौगोलिक उपदर्शन (पंजीकरण और संरक्षण) अधिनियम, 1999 (Geographical Indications of Goods Act, 1999)",
          "• प्रभावी तिथि: 15 सितम्बर 2003 से लागू।",
          "• पंजीकरण प्राधिकरण: भौगोलिक संकेतक रजिस्ट्री (GI Registry), चेन्नई (तमिलनाडु)।",
          "• शासी संगठन: Department for Promotion of Industry and Internal Trade (DPIIT), वाणिज्य एवं उद्योग मंत्रालय, भारत सरकार।"
        ]),
        bodyEn: createBlocks([
          "A Geographical Indication (GI) is an Intellectual Property Right (IPR) status granted to products that possess specific characteristics, quality, or reputation originating from a defined geographical area.",
          "• Legislation: Geographical Indications of Goods (Registration and Protection) Act, 1999",
          "• In Effect: Since September 15, 2003.",
          "• Registrar Office: GI Registry located in Chennai, Tamil Nadu.",
          "• Nodal Authority: DPIIT under the Ministry of Commerce and Industry, Government of India."
        ]),
      },

      /* Section 5: Benefits of GI Tags */
      {
        _key: "sec-gi-benefits",
        kind: "importance",
        title: "जीआई टैग के प्रमुख लाभ",
        titleEn: "Merits and Benefits of GI Tags",
        body: createBlocks([
          "• स्थानीय उत्पादों को विशिष्ट राष्ट्रीय और अंतरराष्ट्रीय पहचान दिलाना।",
          "• बाजार में नकली और गैर-भौगोलिक उत्पादों के विक्रय पर पूर्ण रोक।",
          "• उत्पादों के लिए बेहतर बाजार मूल्य सुनिश्चित करना, जिससे कृषि आय में वृद्धि हो।",
          "• आदिवासी समुदायों के पारंपरिक कृषि ज्ञान, बीजों की किस्मों और सांस्कृतिक विरासत का संरक्षण।",
          "• जैविक कृषि प्रथाओं को बढ़ावा देना और ग्रामीण क्षेत्रों में रोजगार बढ़ाना।"
        ]),
        bodyEn: createBlocks([
          "• Provides exclusive legal and commercial rights, establishing globally recognized branding.",
          "• Restricts copycats or adulterated goods from misusing the geographical name.",
          "• Attracts premium prices in markets, directly elevating tribal farmer incomes.",
          "• Safeguards traditional indigenous knowledge, ancestral seeds, and cultural methods.",
          "• Encourages organic farming and reduces rural-to-urban distress migration."
        ]),
      },

      /* Section 6: MP Historical GI Tags Table */
      {
        _key: "sec-mp-famous-gi",
        kind: "factsAtAGlance",
        title: "मध्य प्रदेश के प्रमुख GI टैग उत्पाद (Exam Revision)",
        titleEn: "Key GI Products of Madhya Pradesh (Exam Revision)",
        body: [
          ...createBlocks([
            "एमपीपीएससी और राज्य स्तरीय परीक्षाओं हेतु मध्य प्रदेश के ऐतिहासिक और नवीनतम पंजीकृत जीआई उत्पादों का विवरण:"
          ]),
          createTable(
            "table-mp-gi-hi",
            "मध्य प्रदेश के प्रमुख जीआई उत्पाद",
            ["उत्पाद (GI Product)", "श्रेणी (Category)", "प्रमुख क्षेत्र/जिल्हा"],
            [
              ["चंदेरी साड़ी", "हथकरघा वस्त्र", "अशोकनगर"],
              ["महेश्वरी साड़ी", "हथकरघा वस्त्र", "खरगोन"],
              ["बाघ प्रिंट", "हस्तशिल्प", "धार"],
              ["रतलामी सेव", "खाद्य उत्पाद", "रतलाम"],
              ["कड़कनाथ मुर्गा", "जीवित उत्पाद", "झाबुआ"],
              ["चिन्नौर चावल", "कृषि उत्पाद", "बालाघाट"],
              ["खजुराहो मेटल क्राफ्ट", "हस्तशिल्प", "छतरपुर"],
              ["सीताही व नागदमन कुटकी", "कृषि उत्पाद", "डिंडोरी (आदिवासी)"],
              ["बैगानी अरहर व छत्रिया चावल", "कृषि उत्पाद", "डिंडोरी, जबलपुर, कटनी"]
            ]
          )
        ],
        bodyEn: [
          ...createBlocks([
            "Important GI products of Madhya Pradesh that frequently appear in state-level exam papers:"
          ]),
          createTable(
            "table-mp-gi-en",
            "Prominent GI Tags of Madhya Pradesh",
            ["Product Name", "Category", "Origin District"],
            [
              ["Chanderi Saree", "Handloom Textils", "Ashoknagar"],
              ["Maheshwari Saree", "Handloom Textils", "Khargone"],
              ["Bagh Prints", "Handicrafts", "Dhar"],
              ["Ratlami Sev", "Foodstuff", "Ratlam"],
              ["Kadaknath Chicken", "Live Animal Product", "Jhabua"],
              ["Chinnour Rice", "Agricultural Good", "Balaghat"],
              ["Khajuraho Metal Craft", "Handicrafts", "Chhatarpur"],
              ["Sitahi & Nagdaman Kutki", "Agricultural Good", "Dindori (Tribal)"],
              ["Baigani Arhar & Chhatriya Rice", "Agricultural Good", "Dindori, Jabalpur, Katni"]
            ]
          )
        ],
      },

      /* Section 7: Tribal Profiles */
      {
        _key: "sec-tribal-profile",
        kind: "keyAspects",
        title: "बैगा एवं गोंड जनजाति: एक परिचय",
        titleEn: "Tribal Profile: Baiga and Gond Tribes",
        body: [
          ...createBlocks([
            "इन फसलों का उत्पादन मुख्य रूप से मध्य प्रदेश की दो ऐतिहासिक जनजातियों द्वारा किया जाता है:",
            "• बैगा जनजाति (Baiga Tribe): यह भारत सरकार द्वारा घोषित 'विशेष रूप से कमजोर जनजातीय समूह' (PVTG) है। ये मुख्य रूप से डिंडोरी, मंडला और बालाघाट जिलों में निवास करते हैं और पारंपरिक रूप से रासायनिक खादों के बिना प्राकृतिक खेती करते हैं।",
            "• गोंड जनजाति (Gond Tribe): यह भारत और मध्य प्रदेश की विशालतम जनजातियों में से एक है। ये अपनी कला, संस्कृति, पारंपरिक खान-पान और प्राकृतिक संसाधनों के प्रबंधन के लिए जाने जाते हैं।"
          ]),
          {
            _key: "b7-img-pulses",
            _type: "image",
            asset: { _type: "reference", _ref: assetPulses._id },
            alt: "A close-up shot of sun-dried red lentils and pigeon peas of Baigani Arhar in a rustic clay bowl",
          }
        ],
        bodyEn: [
          ...createBlocks([
            "The farming clusters of these crops are closely aligned with two major tribal groups in Madhya Pradesh:",
            "• Baiga Tribe: Classified as a Particularly Vulnerable Tribal Group (PVTG) by the Government of India. They reside heavily in Dindori, Mandla, and Balaghat districts and strictly adhere to traditional, chemical-free organic farming practices.",
            "• Gond Tribe: One of the largest tribal communities in Central India. They have a rich heritage of folklore, art (Gond paintings), and sustainable usage of forest and agricultural resources."
          ]),
          {
            _key: "b7-img-pulses-en",
            _type: "image",
            asset: { _type: "reference", _ref: assetPulses._id },
            alt: "A close-up shot of sun-dried red lentils and pigeon peas of Baigani Arhar in a rustic clay bowl",
          }
        ],
      },

      /* Section 8: One Liner Revision */
      {
        _key: "sec-one-liner",
        kind: "factsAtAGlance",
        title: "वन-लाइनर रिवीजन (One Liner Revision)",
        titleEn: "One-Liner Revision Checklist",
        body: createBlocks([
          "• मध्य प्रदेश की 4 नई आदिवासी फसलों को GI टैग प्रदान किया गया है।",
          "• डिंडोरी जिले से संबंधित सीताही कुटकी, नागदमन कुटकी और बैगानी अरहर को GI दर्जा मिला।",
          "• जबलपुर और कटनी से संबंधित महाकोशल छत्रिया चावल (छत्रिया धान) को GI मान्यता दी गई।",
          "• बैगा जनजाति भारत सरकार द्वारा घोषित एक PVTG (विशेष पिछड़ी जनजाति) है।",
          "• भारत में जीआई कानून वर्ष 1999 में पारित हुआ और 15 सितंबर 2003 को लागू हुआ।",
          "• भारत का पहला जीआई उत्पाद दार्जिलिंग चाय (2004-05) है, और जीआई रजिस्ट्री चेन्नई में है।"
        ]),
        bodyEn: createBlocks([
          "• Four tribal crops from Madhya Pradesh have been awarded GI tags.",
          "• Sitahi Kutki, Nagdaman Kutki, and Baigani Arhar belong to the Dindori district.",
          "• Mahakoshal Chhatriya Rice (Chhatriya Dhan) is cultivated in Jabalpur and Katni.",
          "• The Baiga tribe is recognized as a Particularly Vulnerable Tribal Group (PVTG) in India.",
          "• The GI Act was passed in 1999 and enacted on September 15, 2003.",
          "• Darjeeling Tea (2004-05) was India's first GI tag, and the GI Registry office is in Chennai."
        ]),
      },
    ],
    mcqs: [
      {
        question: "हाल ही में मध्य प्रदेश की कितनी आदिवासी फसलों को भौगोलिक संकेतक (GI Tag) प्राप्त हुआ?",
        questionEn: "Recently, how many tribal crops of Madhya Pradesh were awarded the Geographical Indication (GI) tag?",
        options: ["2", "3", "4", "5"],
        optionsEn: ["2", "3", "4", "5"],
        correctIndex: 2,
        explanation: "मध्य प्रदेश की चार आदिवासी फसलों (सीताही कुटकी, नागदमन कुटकी, बैगानी अरहर और महाकोशल छत्रिया चावल) को जीआई टैग प्रदान किया गया है।",
        explanationEn: "Four tribal crops of Madhya Pradesh (Sitahi Kutki, Nagdaman Kutki, Baigani Arhar, and Mahakoshal Chhatriya Rice) were granted GI tags.",
      },
      {
        question: "जीआई टैग प्राप्त 'सीताही कुटकी' और 'नागदमन कुटकी' मध्य प्रदेश के किस जिले से संबंधित हैं?",
        questionEn: "The GI-tagged crops 'Sitahi Kutki' and 'Nagdaman Kutki' are associated with which district of Madhya Pradesh?",
        options: ["मंडला", "डिंडोरी", "बालाघाट", "छिंदवाड़ा"],
        optionsEn: ["Mandla", "Dindori", "Balaghat", "Chhindwara"],
        correctIndex: 1,
        explanation: "सीताही कुटकी और नागदमन कुटकी मुख्य रूप से डिंडोरी जिले में बैगा एवं गोंड जनजातियों द्वारा उगाई जाने वाली पौष्टिक मिलेट फसलें हैं।",
        explanationEn: "Sitahi Kutki and Nagdaman Kutki are highly nutritious millet varieties grown primarily in Dindori district.",
      },
      {
        question: "'बैगानी अरहर' (तूर दाल) मध्य प्रदेश की किस जनजाति की पारंपरिक कृषि विरासत का हिस्सा है?",
        questionEn: "'Baigani Arhar' (pigeon pea) is a part of the traditional agricultural heritage of which tribe in Madhya Pradesh?",
        options: ["भील", "कोरकू", "बैगा", "सहरिया"],
        optionsEn: ["Bhils", "Korku", "Baiga", "Sahariya"],
        correctIndex: 2,
        explanation: "बैगानी अरहर डिंडोरी जिले की बैगा जनजाति की पारंपरिक तूर दाल है जिसे बिना किसी रासायनिक खाद के पूर्णतः जैविक तरीके से उगाया जाता है।",
        explanationEn: "Baigani Arhar is a traditional organic pigeon pea variety grown by the Baiga tribe in Dindori district.",
      },
      {
        question: "हाल ही में जीआई मान्यता प्राप्त 'महाकोशल छत्रिया चावल' मुख्यतः किन जिलों में उत्पादित किया जाता है?",
        questionEn: "The recently GI-tagged 'Mahakoshal Chhatriya Rice' is primarily produced in which districts?",
        options: [
          "सागर एवं दमोह",
          "जबलपुर एवं कटनी",
          "रीवा एवं सतना",
          "छिंदवाड़ा एवं सिवनी"
        ],
        optionsEn: [
          "Sagar and Damoh",
          "Jabalpur and Katni",
          "Rewa and Satna",
          "Chhindwara and Seoni"
        ],
        correctIndex: 1,
        explanation: "महाकोशल छत्रिया चावल (छत्रिया धान) जबलपुर और कटनी जिलों से संबंधित एक पारंपरिक धान की स्वादिष्ट किस्म है।",
        explanationEn: "Mahakoshal Chhatriya Rice is a highly aromatic and tasty paddy variety grown in Jabalpur and Katni districts.",
      },
      {
        question: "भारत में जीआई (GI) रजिस्ट्री का मुख्यालय कहाँ स्थित है?",
        questionEn: "Where is the headquarters of the GI Registry located in India?",
        options: ["मुंबई", "चेन्नई", "हैदरबाद", "नई दिल्ली"],
        optionsEn: ["Mumbai", "Chennai", "Hyderabad", "New Delhi"],
        correctIndex: 1,
        explanation: "भारत में जीआई रजिस्ट्री का मुख्यालय चेन्नई, तमिलनाडु में स्थित है।",
        explanationEn: "The Geographical Indications Registry office of India is located in Chennai, Tamil Nadu.",
      },
      {
        question: "भारत में वस्तुओं का भौगोलिक उपदर्शन (पंजीकरण और संरक्षण) अधिनियम किस वर्ष पारित किया गया था?",
        questionEn: "In which year was the Geographical Indications of Goods (Registration and Protection) Act passed in India?",
        options: ["1992", "1999", "2003", "2005"],
        optionsEn: ["1992", "1999", "2003", "2005"],
        correctIndex: 1,
        explanation: "भारत में जीआई अधिनियम वर्ष 1999 में पारित किया गया था और यह 15 सितंबर 2003 से लागू हुआ।",
        explanationEn: "The GI Act was passed in 1999 and became legally effective from September 15, 2003.",
      },
      {
        question: "जीआई (GI) टैग की वैधता अवधि कितने वर्ष होती है?",
        questionEn: "What is the validity period of a Geographical Indication (GI) tag in India?",
        options: ["5 वर्ष", "8 वर्ष", "10 वर्ष", "15 वर्ष"],
        optionsEn: ["5 years", "8 years", "10 years", "15 years"],
        correctIndex: 2,
        explanation: "एक बार जीआई टैग मिलने के बाद यह 10 वर्षों के लिए वैध रहता है, जिसके बाद इसे दोबारा नवीनीकृत कराया जा सकता है।",
        explanationEn: "Once a GI tag is granted, it is valid for 10 years, and can be renewed indefinitely after every 10 years.",
      },
      {
        question: "निम्नलिखित में से कौन-सा जीआई टैग प्राप्त उत्पाद मध्य प्रदेश से संबंधित नहीं है?",
        questionEn: "Which of the following GI-tagged products does NOT belong to Madhya Pradesh?",
        options: ["रतलामी सेव", "चिन्नौर चावल", "दार्जिलिंग चाय", "खजुराहो मेटल क्राफ्ट"],
        optionsEn: ["Ratlami Sev", "Chinnour Rice", "Darjeeling Tea", "Khajuraho Metal Craft"],
        correctIndex: 2,
        explanation: "दार्जिलिंग चाय पश्चिम बंगाल का प्रसिद्ध उत्पाद है जिसे भारत का सबसे पहला जीआई टैग मिला था। रतलामी सेव, चिन्नौर चावल और खजुराहो मेटल क्राफ्ट सभी मध्य प्रदेश से संबंधित हैं।",
        explanationEn: "Darjeeling Tea belongs to West Bengal, and was India's first GI tag. The other options are well-known products from Madhya Pradesh.",
      },
    ],
    faqs: [
      /* FAQ 1: Sitahi & Nagdaman Kutki */
      {
        question: "सीताही कुटकी और नागदमन कुटकी क्या हैं और इन्हें कहाँ उगाया जाता है?",
        questionEn: "What are Sitahi Kutki and Nagdaman Kutki, and where are they grown?",
        answer: "सीताही कुटकी और नागदमन कुटकी डिंडोरी जिले में बैगा और गोंड जनजातियों द्वारा उगाई जाने वाली पारंपरिक लघु धान्य (Millet) फसलें हैं। ये पौष्टिक व सूखा रोधी होती हैं।",
        answerEn: "Sitahi Kutki and Nagdaman Kutki are highly nutritious and drought-resistant small millet varieties cultivated in the Dindori district of Madhya Pradesh by Baiga and Gond tribes.",
      },
      /* FAQ 2: Baigani Arhar */
      {
        question: "बैगानी अरहर किस प्रकार की फसल है और इसकी विशेषता क्या है?",
        questionEn: "What kind of crop is Baigani Arhar and what is its specialty?",
        answer: "बैगानी अरहर मध्य प्रदेश के डिंडोरी जिले की बैगा जनजाति की पारंपरिक तूर (अरहर) दाल है। यह पूरी तरह से रासायनिक खादों के बिना जैविक रूप से उगाई जाती है और अपने बेहतरीन स्वाद के लिए जानी जाती है।",
        answerEn: "Baigani Arhar is an indigenous pigeon pea (toor dal) variety cultivated organically without chemical inputs by the Baiga tribal group in Dindori. It is prized for its exceptional aroma and taste.",
      },
      /* FAQ 3: Chhatriya Rice */
      {
        question: "महाकोशल छत्रिया चावल मुख्यतः मध्य प्रदेश के किन जिलों में उगाया जाता है?",
        questionEn: "In which districts of Madhya Pradesh is Mahakoshal Chhatriya Rice primarily cultivated?",
        answer: "महाकोशल छत्रिया चावल (छत्रिया धान) मध्य प्रदेश के जबलपुर और कटनी जिलों में उत्पादित किया जाने वाला एक सुगंधित और स्वादिष्ट पारंपरिक धान है।",
        answerEn: "Mahakoshal Chhatriya Rice (Chhatriya Dhan) is an aromatic and flavorful traditional paddy variety grown primarily in Jabalpur and Katni districts of Madhya Pradesh.",
      },
      /* FAQ 4: PVTG Baiga */
      {
        question: "बैगा जनजाति मध्य प्रदेश के किन क्षेत्रों में पाई जाती है और क्या यह PVTG है?",
        questionEn: "Where is the Baiga tribe located in Madhya Pradesh, and is it a PVTG?",
        answer: "हाँ, बैगा जनजाति भारत सरकार द्वारा घोषित एक 'विशेष रूप से कमजोर जनजातीय समूह' (PVTG) है। ये मुख्य रूप से मध्य प्रदेश के डिंडोरी, मंडला और बालाघाट जिलों में निवास करते हैं।",
        answerEn: "Yes, the Baiga tribe is recognized as a Particularly Vulnerable Tribal Group (PVTG) in India. They live primarily in Dindori, Mandla, and Balaghat districts of Madhya Pradesh.",
      },
      /* FAQ 5: First GI Tag in India */
      {
        question: "भारत का सबसे पहला भौगोलिक संकेतक (GI Tag) उत्पाद कौन-सा है?",
        questionEn: "Which was the first product in India to be awarded a GI Tag?",
        answer: "पश्चिम बंगाल की 'दार्जिलिंग चाय' को वर्ष 2004-05 में भारत का पहला भौगोलिक संकेतक (GI Tag) प्रदान किया गया था।",
        answerEn: "Darjeeling Tea of West Bengal was the first product in India to receive a Geographical Indication (GI) tag, awarded in the fiscal year 2004-05.",
      },
      /* FAQ 6: Total GI Crops from MP in July 2026 */
      {
        question: "जुलाई 2026 में मध्य प्रदेश की कितनी फसलों को एक साथ जीआई (GI) टैग मिला है?",
        questionEn: "How many crops of Madhya Pradesh received GI tags together in July 2026?",
        answer: "जुलाई 2026 में मध्य प्रदेश की 4 फसलों (सीताही कुटकी, नागदमन कुटकी, बैगानी अरहर और महाकोशल छत्रिया चावल) को जीआई दर्जा मिला है।",
        answerEn: "Four crops of Madhya Pradesh (Sitahi Kutki, Nagdaman Kutki, Baigani Arhar, and Mahakoshal Chhatriya Rice) were granted GI tags in July 2026.",
      },
      /* FAQ 7: Registry of GI Tags */
      {
        question: "जीआई (GI) टैग के पंजीकरण का प्राधिकरण कहाँ स्थित है?",
        questionEn: "Where is the registration authority for GI tags located?",
        answer: "भारत में जीआई रजिस्ट्री (GI Registry) चेन्नई, तमिलनाडु में स्थित है, जो वाणिज्य और उद्योग मंत्रालय के पेटेंट, डिजाइन और ट्रेडमार्क महानियंत्रक (CGPDTM) के तहत काम करती है।",
        answerEn: "The GI Registry is situated in Chennai, Tamil Nadu, operating under the Controller General of Patents, Designs & Trade Marks (CGPDTM), Ministry of Commerce and Industry.",
      },
      /* FAQ 8: Validity and Renewal */
      {
        question: "भौगोलिक संकेतक (GI Tag) की वैधता कितने वर्ष होती है?",
        questionEn: "What is the validity period of a GI tag?",
        answer: "जीआई पंजीकरण की वैधता अवधि 10 वर्ष होती है, जिसके उपरांत इसे प्रत्येक 10 वर्ष के चक्र में नवीनीकृत (Renew) कराया जा सकता है।",
        answerEn: "A GI tag is valid for 10 years and can be renewed indefinitely after every 10 years upon application and fee payment.",
      },
      /* FAQ 9: Benefits of GI Tags for PVTGs */
      {
        question: "आदिवासी फसलों को जीआई टैग मिलने से स्थानीय जनजातियों को क्या लाभ होगा?",
        questionEn: "How will the GI tags on tribal crops benefit local indigenous communities?",
        answer: "इससे फसलों को राष्ट्रीय मान्यता मिलेगी, बिचौलियों से मुक्ति मिलेगी, जैविक उत्पादों के मूल्य में वृद्धि होगी, और बैगा/गोंड जनजाति के पारंपरिक कृषि कौशल को संरक्षण मिलेगा।",
        answerEn: "It provides national recognition, eliminates middlemen, secures premium pricing for organic produce, and preserves the traditional farming methods and heritage of Gond and Baiga PVTGs.",
      },
      /* FAQ 10: State ranking of MP */
      {
        question: "क्या मध्य प्रदेश भारत में सर्वाधिक जीआई (GI) टैग वाले शीर्ष राज्यों में शामिल है?",
        questionEn: "Is Madhya Pradesh among the top states with the most GI tags in India?",
        answer: "हाँ, इन 4 नई फसलों के जुड़ने से मध्य प्रदेश के जीआई उत्पादों की संख्या में उल्लेखनीय वृद्धि हुई है, जिससे राज्य कृषि और जनजातीय विविधता श्रेणी में अग्रगामी बनकर उभरा है।",
        answerEn: "Yes, the addition of these four crops significantly increases MP's counts, establishing it as a frontrunner in the agricultural and tribal heritage categories in India.",
      },
    ],
    sources: [
      {
        label: "Department for Promotion of Industry and Internal Trade (DPIIT), Ministry of Commerce",
        url: "https://dpiit.gov.in",
      },
      {
        label: "Geographical Indications Registry, Chennai",
        url: "https://ipindia.gov.in",
      },
      {
        label: "Government of Madhya Pradesh, Department of Agriculture",
        url: "https://mpkrishi.mp.gov.in",
      },
    ],
  };

  try {
    await client.createOrReplace(article);
    console.log("✨ Successfully uploaded MP Tribal Crops GI Tags 2026 Current Affairs Article to Sanity!");
  } catch (err) {
    console.error("❌ Failed to create/replace document in Sanity:", err);
  }
}

main().catch((err) => {
  console.error("❌ Error running script:", err);
  process.exit(1);
});
