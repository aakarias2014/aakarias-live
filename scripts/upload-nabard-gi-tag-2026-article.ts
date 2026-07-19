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
  console.log("🚀 Starting upload process for NABARD 28 New GI Tags 2026 Article with SEO FAQs...");

  // Image file paths in public/images/blog/
  const imagePaths = {
    banner: path.resolve(process.cwd(), "public/images/blog/nabard-gi-tags-2026-1.png"),
    weaver: path.resolve(process.cwd(), "public/images/blog/nabard-gi-tags-2026-2.png"),
    showcase: path.resolve(process.cwd(), "public/images/blog/nabard-gi-tags-2026-3.png"),
  };

  // Check if files exist
  if (!fs.existsSync(imagePaths.banner) || !fs.existsSync(imagePaths.weaver) || !fs.existsSync(imagePaths.showcase)) {
    console.error("❌ Required images not found in public/images/blog/");
    process.exit(1);
  }

  // 1. Upload Banner Image
  console.log("📸 Uploading banner image...");
  const assetBanner = await client.assets.upload("image", fs.createReadStream(imagePaths.banner), {
    filename: "nabard_gi_tags_banner_2026.png",
  });
  console.log(`✔ Uploaded banner image. Asset ID: ${assetBanner._id}`);

  // 2. Upload Weaver Image
  console.log("📸 Uploading weaver image...");
  const assetWeaver = await client.assets.upload("image", fs.createReadStream(imagePaths.weaver), {
    filename: "nabard_gi_tags_weaver_2026.png",
  });
  console.log(`✔ Uploaded weaver image. Asset ID: ${assetWeaver._id}`);

  // 3. Upload Showcase Image
  console.log("📸 Uploading showcase image...");
  const assetShowcase = await client.assets.upload("image", fs.createReadStream(imagePaths.showcase), {
    filename: "nabard_gi_tags_showcase_2026.png",
  });
  console.log(`✔ Uploaded showcase image. Asset ID: ${assetShowcase._id}`);

  // 4. Construct the Article document
  const article = {
    _id: "gk-nabard-28-new-gi-tags-2026",
    _type: "staticGk",
    slug: { _type: "slug", current: "nabard-28-new-gi-tags-2026" },
    title: "नाबार्ड ने 28 नए उत्पादों को दिलाया GI टैग: भारत के GI उत्पादों की संख्या बढ़कर 176 हुई",
    titleEn: "NABARD Facilitates GI Tags for 28 New Products: India's Supported GI Product Count Reaches 176",
    excerpt: "10 जुलाई 2026 को राष्ट्रीय कृषि एवं ग्रामीण विकास बैंक (NABARD) ने देश के 28 नए पारंपरिक उत्पादों को Geographical Indication (GI) पंजीकरण दिलाने में महत्वपूर्ण भूमिका निभाई। इसके साथ ही NABARD द्वारा समर्थित GI उत्पादों की कुल संख्या 176 हो गई।",
    excerptEn: "On July 10, 2026, the National Bank for Agriculture and Rural Development (NABARD) facilitated Geographical Indication (GI) registration for 28 new traditional Indian products, bringing its total supported count to 176.",
    ca_date: "2026-07-10",
    publishedAt: new Date().toISOString(),
    featured: true,
    readingTime: 6,
    keywords: [
      "NABARD GI Tag 2026",
      "Geographical Indication Registry Chennai",
      "Geographical Indications of Goods Act 1999",
      "Bawanbuti Saree GI Tag",
      "Gaya Pattharkatti Craft",
      "Kuchai Silk Saree Jharkhand",
      "Ba Shilp Assam",
      "Khajuraho Metal Craft GI",
      "Darjeeling Tea First GI",
      "Vocal for Local India",
      "नाबार्ड जीआई टैग",
      "भौगोलिक संकेतक 1999 अधिनियम",
      "यूपी जीआई टैग सूची",
      "बावनबूटी साड़ी नालंदा",
      "खजुराहो मेटल क्राफ्ट"
    ],
    category: { _type: "reference", _ref: "cat-economy" }, // Economics
    author: { _type: "reference", _ref: "author-aakar" },
    tags: [
      { _type: "reference", _ref: "tag-upsc" },
      { _type: "reference", _ref: "tag-mppsc" },
      { _type: "reference", _ref: "tag-prelims" },
      { _type: "reference", _ref: "tag-mains" },
    ],
    syllabus: ["GS-3", "Prelims-GS"],
    featuredImage: {
      _type: "image",
      asset: { _type: "reference", _ref: assetBanner._id },
      alt: "An elegant arrangement of traditional Indian GI-tagged products including Darjeeling tea, Banarasi silk saree, and Khajuraho metal craft",
    },
    sections: [
      /* Section 1: Context */
      {
        _key: "sec-context",
        kind: "whyInNews",
        title: "प्रसंग (Context)",
        titleEn: "Why in News?",
        body: createBlocks([
          "10 जुलाई 2026 को राष्ट्रीय कृषि एवं ग्रामीण विकास बैंक (NABARD) ने देश के 28 नए पारंपरिक उत्पादों को भौगोलिक संकेतक (Geographical Indication - GI) पंजीकरण दिलाने में महत्वपूर्ण भूमिका निभाई। इसके साथ ही NABARD द्वारा समर्थित GI उत्पादों की कुल संख्या 176 हो गई। यह पहल स्थानीय कारीगरों, पारंपरिक शिल्प, ग्रामीण उद्योग और 'Vocal for Local' अभियान को मजबूती प्रदान करती है।"
        ]),
        bodyEn: createBlocks([
          "On July 10, 2026, the National Bank for Agriculture and Rural Development (NABARD) played a pivotal role in securing Geographical Indication (GI) registration for 28 new traditional products across India. With this addition, the total number of GI products supported by NABARD has risen to 176. This milestone provides a substantial boost to local artisans, traditional crafts, rural enterprises, and the nationwide 'Vocal for Local' campaign."
        ]),
      },

      /* Section 2: What is GI Tag */
      {
        _key: "sec-gitag-definition",
        kind: "background",
        title: "भौगोलिक संकेतक (GI Tag) क्या है?",
        titleEn: "What is a Geographical Indication (GI Tag)?",
        body: [
          ...createBlocks([
            "जीआई (Geographical Indication) एक ऐसा बौद्धिक संपदा अधिकार (Intellectual Property Right) चिन्ह है, जो किसी उत्पाद की विशिष्ट गुणवत्ता, प्रतिष्ठा या पहचान को उसके भौगोलिक क्षेत्र से जोड़ता है।",
            "• संबंधित अधिनियम: वस्तुओं का भौगोलिक उपदर्शन (पंजीकरण और संरक्षण) अधिनियम, 1999 (Geographical Indications of Goods Act, 1999)",
            "• लागू होने की तिथि: 15 सितम्बर 2003",
            "• पंजीकरण प्राधिकरण: जीआई रजिस्ट्री (GI Registry), चेन्नई",
            "• प्रशासनिक नियंत्रण: पेटेंट, डिजाइन और ट्रेडमार्क महानियंत्रक (Controller General of Patents, Designs & Trade Marks - CGPDTM)",
            "• मान्यता अवधि: 10 वर्ष (इसके बाद नवीनीकृत किया जा सकता है)",
            "• जीआई टैग के लाभार्थी: यह किसी व्यक्ति विशेष को नहीं, बल्कि एक समुदाय या विशिष्ट क्षेत्र के उत्पादकों को प्राप्त होता है।"
          ])
        ],
        bodyEn: [
          ...createBlocks([
            "A Geographical Indication (GI) is an Intellectual Property Right (IPR) sign used on products that have a specific geographical origin and possess qualities, reputation, or characteristics that are essentially attributable to that place of origin.",
            "• Governing Law: Geographical Indications of Goods (Registration and Protection) Act, 1999",
            "• Date of Effect: September 15, 2003",
            "• Registration Authority: GI Registry, Chennai",
            "• Administrative Control: Controller General of Patents, Designs & Trade Marks (CGPDTM)",
            "• Validity: 10 years (renewable thereafter)",
            "• Beneficiary: It is granted to a community/association of producers in a region, not to an individual."
          ])
        ],
      },

      /* Section 3: Benefits */
      {
        _key: "sec-benefits",
        kind: "importance",
        title: "GI टैग के प्रमुख लाभ",
        titleEn: "Key Benefits of GI Tags",
        body: createBlocks([
          "• विशिष्ट पहचान: स्थानीय उत्पादों की विशिष्ट पहचान और अंतरराष्ट्रीय स्तर पर ब्रांडिंग।",
          "• कानूनी संरक्षण: नकली और अनधिकृत उत्पादों की बिक्री पर प्रभावी रोक।",
          "• निर्यात को बढ़ावा: प्रीमियम गुणवत्ता और विशिष्टता के कारण उत्पादों के निर्यात (Export) को बढ़ावा।",
          "• कारीगरों की आय: मूल्य वृद्धि के माध्यम से स्थानीय कारीगरों और किसानों की आय में वृद्धि।",
          "• सांस्कृतिक संरक्षण: पीढ़ियों पुरानी पारंपरिक कला, संस्कृति और शिल्प का संरक्षण।",
          "• ग्रामीण रोजगार: ग्रामीण क्षेत्रों में नए प्रत्यक्ष एवं अप्रत्यक्ष रोजगार के अवसरों का सृजन।"
        ]),
        bodyEn: createBlocks([
          "• Unique Identity: Establishes a distinct identity and branding for local products globally.",
          "• Legal Protection: Prevents unauthorized use, counterfeiting, or copycats of certified goods.",
          "• Export Growth: Drives premium export value due to verified quality and authenticity.",
          "• Income Growth: Enhances income of rural artisans and farmers through premium pricing.",
          "• Heritage Preservation: Safeguards centuries-old traditional crafts, art forms, and crops.",
          "• Rural Employment: Promotes livelihood and job creation within local and rural ecosystems."
        ]),
      },

      /* Section 4: NABARD's Role */
      {
        _key: "sec-nabard-role",
        kind: "keyAspects",
        title: "नाबार्ड (NABARD) की भूमिका एवं उपलब्धियां",
        titleEn: "Role and Achievements of NABARD",
        body: [
          ...createBlocks([
            "नाबार्ड केवल वित्तीय सहायता ही नहीं देता, बल्कि पारंपरिक उत्पादों के जीआई पंजीकरण में तकनीकी सहयोग प्रदान करता है। नाबार्ड ने जीआई सुविधा केंद्रों (GI Facilitation Centres) की स्थापना कर कारीगरों को ब्रांडिंग, पैकेजिंग, विपणन सहायता और निर्यात के अवसर प्रदान किए हैं।"
          ]),
          {
            _key: "b4-img-weaver",
            _type: "image",
            asset: { _type: "reference", _ref: assetWeaver._id },
            alt: "A rural Indian female artisan in Bihar intricately weaving a traditional white cotton Nalanda Bawanbuti saree on a handloom",
          },
          ...createBlocks([
            "• कारीगर एवं उत्पादक: 13,000 से अधिक कारीगर एवं उत्पादक सीधे तौर पर जुड़े।",
            "• प्रत्यक्ष रोजगार: 50,000 से अधिक लोगों के लिए प्रत्यक्ष रोजगार का सृजन।",
            "• ग्रामीण संगठन: 14 ग्रामीण उद्यम उत्पादक संगठनों (REPOs) की स्थापना।",
            "• सुविधा केंद्र: अहमदाबाद, बिहार और तमिलनाडु में जीआई सुविधा केंद्रों की स्थापना।",
            "• जीआई रिटेल स्टोर: ऐहोल (कर्नाटक) में पहला जीआई स्टोर स्थापित किया गया है।"
          ])
        ],
        bodyEn: [
          ...createBlocks([
            "Beyond basic credit facilitation, NABARD actively sponsors end-to-end technical support for GI registration. It helps local clusters setup branding strategies, state-of-the-art packaging facilities, direct-to-market channels, and coordinates national/international exhibitions."
          ]),
          {
            _key: "b4-img-weaver-en",
            _type: "image",
            asset: { _type: "reference", _ref: assetWeaver._id },
            alt: "A rural Indian female artisan in Bihar intricately weaving a traditional white cotton Nalanda Bawanbuti saree on a handloom",
          },
          ...createBlocks([
            "• Artisan Integration: Supported over 13,000+ local artisans and primary producers.",
            "• Employment Generation: Generated 50,000+ direct and indirect livelihood opportunities in villages.",
            "• Producer Organizations: Structured 14 Rural Enterprise Producer Organizations (REPOs) to support collective trade.",
            "• Facilitation Centers: Dedicated GI Facilitation Centers in Ahmedabad, Bihar, and Tamil Nadu.",
            "• Exclusive Retail: Opened the first flagship GI Retail Store at Aihole, Karnataka."
          ])
        ],
      },

      /* Section 5: New major GI products */
      {
        _key: "sec-new-products",
        kind: "keyHighlights",
        title: "नवीनतम प्रमुख GI उत्पाद (जुलाई 2026)",
        titleEn: "Newly Tagged Prominent Products (July 2026)",
        body: [
          ...createBlocks([
            "10 जुलाई 2026 को जोड़े गए 28 उत्पादों में से कुछ प्रमुख परीक्षा-महत्वपूर्ण उत्पाद और उनकी विशेषताएँ निम्न हैं:",
            "• बिहार - नालंदा बावनबूटी साड़ी: सूती कपड़ों पर हाथ से 52 बूटी (डिजाइन) बनाने की पारंपरिक कला।",
            "• बिहार - गया पत्थरकट्टी शिल्प: गया जिले के विशिष्ट नीले-काले पत्थर (Blue-black stone) से सुंदर नक्काशीदार मूर्तियां बनाने की अनूठी कला।",
            "• झारखंड - कुचाई सिल्क साड़ी: सरायकेला-खरसावां जिले के जैविक कुचाई रेशम से निर्मित पारंपरिक वस्त्र।",
            "• असम - बा शिल्प (बांस शिल्प): असमिया कारीगरों द्वारा बांस से बनी उत्तम हस्तशिल्प और कलाकृतियां।",
            "• असम - बिहू पेपा: असमिया बिहू लोक नृत्य में बजाया जाने वाला भैंस के सींग (Buffalo horn) से निर्मित पारंपरिक वाद्य यंत्र।",
            "• हिमाचल प्रदेश - हिमाचली वुड कार्विंग: मंदिरों और घरों के दरवाजों पर जटिल देवदार नक्काशी।",
            "• मध्य प्रदेश - खजुराहो Metal Craft: तांबे, पीतल और लोहे की ढलाई से बनी सुंदर पारंपरिक कलाकृतियां।"
          ]),
          {
            _key: "b5-img-showcase",
            _type: "image",
            asset: { _type: "reference", _ref: assetShowcase._id },
            alt: "A close-up photograph showcasing fresh green tea leaves, a traditional Assamese Bihu Pepa instrument, and a Ganesha brass craft",
          }
        ],
        bodyEn: [
          ...createBlocks([
            "Among the 28 products registered on July 10, 2026, the following are highly relevant for exams:",
            "• Bihar - Nalanda Bawanbuti Saree: Exquisite hand-woven cotton fabric featuring 52 traditional motifs (butis) depicting local history.",
            "• Bihar - Gaya Pattharkatti Craft: Intricate stonework sculptures carved out of a unique blue-black stone from the Gaya region.",
            "• Jharkhand - Kuchai Silk Saree: Highly valued organic wild silk garments originating from the Kuchai region of Saraikela-Kharsawan.",
            "• Assam - Ba Shilp (Bamboo Craft): Fine organic bamboo handicrafts and daily utility objects.",
            "• Assam - Bihu Pepa: A musical wind instrument made from buffalo horn, central to Bihu folk performances.",
            "• Himachal Pradesh - Himachali Wood Carving: Ornate wooden reliefs and structural patterns primarily carved from local Deodar cedar trees.",
            "• Madhya Pradesh - Khajuraho Metal Craft: Traditional bell-metal and brass casting works showcasing mythical figures and figurines."
          ]),
          {
            _key: "b5-img-showcase-en",
            _type: "image",
            asset: { _type: "reference", _ref: assetShowcase._id },
            alt: "A close-up photograph showcasing fresh green tea leaves, a traditional Assamese Bihu Pepa instrument, and a Ganesha brass craft",
          }
        ],
      },

      /* Section 6: State rankings in a Table */
      {
        _key: "sec-state-rankings",
        kind: "quickFacts",
        title: "2026 तक सर्वाधिक GI टैग वाले प्रमुख भारतीय राज्य",
        titleEn: "Top Indian States by GI Tag Count (As of 2026)",
        body: [
          ...createBlocks([
            "2026 तक भारत में सर्वाधिक भौगोलिक संकेतक (GI Tag) वाले प्रमुख राज्यों की सूची इस प्रकार है:"
          ]),
          createTable(
            "table-rankings-hi",
            "भारत के शीर्ष 10 जीआई टैग वाले राज्य (Top 10 GI Tag States in India)",
            ["रैंक (Rank)", "राज्य (State)", "GI उत्पाद लगभग (Approx GI Products)"],
            [
              ["1", "उत्तर प्रदेश", "70+"],
              ["2", "तमिलनाडु", "65+"],
              ["3", "कर्नाटक", "50+"],
              ["4", "महाराष्ट्र", "50+"],
              ["5", "ओडिशा", "35+"],
              ["6", "पश्चिम बंगाल", "25+"],
              ["7", "राजस्थान", "25+"],
              ["8", "गुजरात", "22+"],
              ["9", "आंध्र प्रदेश", "19+"],
              ["10", "असम", "15+"]
            ]
          )
        ],
        bodyEn: [
          ...createBlocks([
            "According to the latest 2026 registry updates, the rankings of top Indian states by their total GI tag counts are as follows:"
          ]),
          createTable(
            "table-rankings-en",
            "Top 10 States with Most GI Tags in India",
            ["Rank", "State", "GI Products (Approx)"],
            [
              ["1", "Uttar Pradesh", "70+"],
              ["2", "Tamil Nadu", "65+"],
              ["3", "Karnataka", "50+"],
              ["4", "Maharashtra", "50+"],
              ["5", "Odisha", "35+"],
              ["6", "West Bengal", "25+"],
              ["7", "Rajasthan", "25+"],
              ["8", "Gujarat", "22+"],
              ["9", "Andhra Pradesh", "19+"],
              ["10", "Assam", "15+"]
            ]
          )
        ],
      },

      /* Section 7: Famous products in a Table */
      {
        _key: "sec-famous-products",
        kind: "factsAtAGlance",
        title: "सबसे प्रसिद्ध भारतीय GI उत्पाद (Exam Revision)",
        titleEn: "Famous Historical Indian GI Products (Exam Revision)",
        body: [
          ...createBlocks([
            "परीक्षा की दृष्टि से भारत के राज्यों के सबसे प्रसिद्ध जीआई उत्पाद और उनके वर्ष निम्न प्रकार हैं:"
          ]),
          createTable(
            "table-famous-hi",
            "प्रमुख राज्यों के ऐतिहासिक व लोकप्रिय जीआई उत्पाद",
            ["राज्य (State)", "प्रसिद्ध GI उत्पाद (Exam Revision)"],
            [
              ["पश्चिम बंगाल", "दार्जिलिंग चाय (भारत का पहला GI टैग – 2004-05), बालूचरी साड़ी"],
              ["उत्तर प्रदेश", "बनारसी साड़ी, लखनऊ चिकनकारी, आगरा पेठा"],
              ["तमिलनाडु", "कांचीपुरम सिल्क, तंजावुर पेंटिंग"],
              ["कर्नाटक", "मैसूर सिल्क, कूर्ग अरैबिका कॉफी"],
              ["महाराष्ट्र", "अल्फांसो आम, कोल्हापुरी चप्पल (कर्नाटक के साथ संयुक्त)"],
              ["मध्य प्रदेश", "चंदेरी साड़ी, महेश्वरी साड़ी, खजुराहो मेटल क्राफ्ट, बाग प्रिंट"],
              ["असम", "मुगा सिल्क (सुनहरा सिल्क), बिहू पेपा"]
            ]
          )
        ],
        bodyEn: [
          ...createBlocks([
            "Quick revision of legendary GI items that frequently appear in GS civil services papers:"
          ]),
          createTable(
            "table-famous-en",
            "Famous GI Products for Civil Services Exams",
            ["State", "Famous GI Products (Exam Revision)"],
            [
              ["West Bengal", "Darjeeling Tea (India's first GI Tag – 2004-05), Baluchari Saree"],
              ["Uttar Pradesh", "Banarasi Saree, Lucknow Chikan Craft, Agra Petha"],
              ["Tamil Nadu", "Kanchipuram Silk, Thanjavur Painting"],
              ["Karnataka", "Mysore Silk, Coorg Arabica Coffee"],
              ["Maharashtra", "Alphonso Mango, Kolhapuri Chappal (shared with Karnataka)"],
              ["Madhya Pradesh", "Chanderi Saree, Maheshwari Saree, Khajuraho Metal Craft, Bagh Prints"],
              ["Assam", "Muga Silk, Bihu Pepa"]
            ]
          )
        ],
      },

      /* Section 8: NABARD info */
      {
        _key: "sec-nabard-info",
        kind: "quickFacts",
        title: "नाबार्ड (NABARD) संगठन से जुड़े परीक्षा तथ्य",
        titleEn: "Key Facts about NABARD",
        body: createBlocks([
          "राष्ट्रीय कृषि एवं ग्रामीण विकास बैंक (NABARD) के बारे में परीक्षा हेतु महत्वपूर्ण तथ्य:",
          "• स्थापना: 12 जुलाई 1982 (बी. शिवरामन समिति की सिफारिश पर)",
          "• मुख्यालय: मुंबई (महाराष्ट्र)",
          "• वर्तमान अध्यक्ष: डॉ. शाजी कृष्णन वी.",
          "• मुख्य कार्य: ग्रामीण भारत में कृषि, लघु उद्योगों, कुटीर उद्योगों, हस्तशिल्प और अन्य ग्रामीण शिल्पों के विकास के लिए ऋण एवं नीतिगत सहायता प्रदान करना।"
        ]),
        bodyEn: createBlocks([
          "Important organizational facts about NABARD for competitive examinations:",
          "• Establishment: July 12, 1982 (Based on the recommendations of the B. Sivaraman Committee)",
          "• Headquarters: Mumbai, Maharashtra",
          "• Current Chairman: Dr. Shaji Krishnan V.",
          "• Mandate: Serving as the apex development financial institution for agriculture, small-scale industries, cottage and village industries, handicrafts, and allied economic activities in rural India."
        ]),
      },

      /* Section 9: Key Exam Facts */
      {
        _key: "sec-exam-facts",
        kind: "factsAtAGlance",
        title: "परीक्षा हेतु महत्वपूर्ण तथ्य",
        titleEn: "Critical Exam Facts",
        body: createBlocks([
          "• पहला जीआई टैग: दार्जिलिंग चाय (2004-05) को भारत का प्रथम जीआई दर्जा मिला।",
          "• कार्यालय: भौगोलिक संकेतक रजिस्ट्री (GI Registry) चेन्नई, तमिलनाडु में स्थित है।",
          "• कानून: वस्तुओं का भौगोलिक उपदर्शन अधिनियम, 1999 (लागू 15 सितंबर 2003)।",
          "• बौद्धिक संपदा: जीआई एक प्रकार का बौद्धिक संपदा अधिकार (IPR) है।",
          "• प्राप्तकर्ता: यह टैग किसी व्यक्ति विशेष को नहीं, बल्कि एक पूरे समुदाय/क्षेत्र को मिलता है।"
        ]),
        bodyEn: createBlocks([
          "• First GI Tag: Awarded to Darjeeling Tea in the year 2004-05.",
          "• Registry Location: The GI Registry office is located in Chennai, Tamil Nadu.",
          "• Legal Act: Governed under the Geographical Indications of Goods Act, 1999 (in effect since Sept 2003).",
          "• Intellectual Property: GI is categorized as a type of Intellectual Property Right (IPR).",
          "• Recipient: Awarded to a regional community/association, not to a single individual."
        ]),
      },

      /* Section 10: One-Liner Revision */
      {
        _key: "sec-revision",
        kind: "factsAtAGlance",
        title: "वन-लाइनर रिवीजन (One Liner Revision)",
        titleEn: "One-Liner Revision Checklist",
        body: createBlocks([
          "• नाबार्ड ने 28 नए उत्पादों को जीआई (GI) पंजीकरण दिलाया।",
          "• नाबार्ड द्वारा समर्थित कुल जीआई उत्पादों की संख्या बढ़कर 176 हुई।",
          "• भारत का जीआई अधिनियम 1999 में पारित हुआ और 2003 में लागू हुआ।",
          "• भौगोलिक संकेतक रजिस्ट्री (GI Registry) चेन्नई, तमिलनाडु में स्थित है।",
          "• नाबार्ड की स्थापना 12 जुलाई 1982 को हुई थी, इसका मुख्यालय मुंबई में है।",
          "• वर्तमान अध्यक्ष डॉ. शाजी कृष्णन वी. हैं।",
          "• भारत का पहला जीआई टैग प्राप्त उत्पाद दार्जिलिंग चाय (2004-05) है।",
          "• जीआई टैग की वैधता अवधि 10 वर्ष होती है।",
          "• सर्वाधिक जीआई टैग वाले राज्यों में उत्तर प्रदेश (UP) 70+ उत्पादों के साथ पहले स्थान पर है।"
        ]),
        bodyEn: createBlocks([
          "• NABARD helped register 28 new traditional items as GI tags.",
          "• Total GI products financially and technically supported by NABARD stands at 176.",
          "• GI Registry is situated in Chennai, under CGPDTM control.",
          "• India's first GI Tag product is Darjeeling Tea (awarded in 2004-05).",
          "• NABARD was established on July 12, 1982, with headquarters in Mumbai.",
          "• The current chairman of NABARD is Dr. Shaji Krishnan V.",
          "• The validity period of a GI Tag in India is 10 years.",
          "• Uttar Pradesh is the leading state in India with over 70+ GI tags."
        ]),
      },
    ],
    mcqs: [
      {
        question: "10 जुलाई 2026 को राष्ट्रीय कृषि एवं ग्रामीण विकास बैंक (NABARD) ने देश के कितने नए पारंपरिक उत्पादों को GI टैग दिलाया?",
        questionEn: "On July 10, 2026, the National Bank for Agriculture and Rural Development (NABARD) secured GI tags for how many new traditional products?",
        options: ["18", "22", "28", "35"],
        optionsEn: ["18", "22", "28", "35"],
        correctIndex: 2,
        explanation: "10 जुलाई 2026 को नाबार्ड ने देश के 28 नए उत्पादों को जीआई पंजीकरण दिलाया, जिससे नाबार्ड समर्थित उत्पादों की कुल संख्या 176 हो गई है।",
        explanationEn: "On July 10, 2026, NABARD secured GI tags for 28 new traditional products, raising the total count of NABARD-supported GI products to 176.",
      },
      {
        question: "NABARD द्वारा समर्थित GI उत्पादों की कुल संख्या बढ़कर कितनी हो गई है?",
        questionEn: "What is the total number of GI products supported by NABARD after the latest additions?",
        options: ["150", "160", "170", "176"],
        optionsEn: ["150", "160", "170", "176"],
        correctIndex: 3,
        explanation: "28 नए उत्पादों के जुड़ने से अब नाबार्ड द्वारा समर्थित कुल भौगोलिक संकेतक (GI) उत्पादों की संख्या बढ़कर 176 हो गई है।",
        explanationEn: "Following the inclusion of 28 new traditional items, the total number of GI products supported by NABARD is now 176.",
      },
      {
        question: "भारत में भौगोलिक संकेतक (GI Tag) किस अधिनियम के तहत प्रदान किया जाता है?",
        questionEn: "In India, Geographical Indications (GI tags) are granted under which of the following acts?",
        options: [
          "Patent Act, 1970",
          "Copyright Act, 1957",
          "Geographical Indications of Goods Act, 1999",
          "Trademark Act, 1999"
        ],
        optionsEn: [
          "Patent Act, 1970",
          "Copyright Act, 1957",
          "Geographical Indications of Goods Act, 1999",
          "Trademark Act, 1999"
        ],
        correctIndex: 2,
        explanation: "भारत में जीआई टैग को 'वस्तुओं का भौगोलिक उपदर्शन (पंजीकरण और संरक्षण) अधिनियम, 1999' के तहत विनियमित किया जाता है, जो 15 सितंबर 2003 से पूर्ण रूप से प्रभावी हुआ।",
        explanationEn: "In India, GI tags are governed and protected under the Geographical Indications of Goods (Registration and Protection) Act, 1999, which came into effect on September 15, 2003.",
      },
      {
        question: "भारत की भौगोलिक संकेतक रजिस्ट्री (GI Registry) कहाँ स्थित है?",
        questionEn: "Where is the Geographical Indications Registry (GI Registry) of India located?",
        options: ["मुंबई", "नई दिल्ली", "चेन्नई", "हैदराबाद"],
        optionsEn: ["Mumbai", "New Delhi", "Chennai", "Hyderabad"],
        correctIndex: 2,
        explanation: "भारत में जीआई टैग का पंजीकरण चेन्नई (तमिलनाडु) में स्थित भौगोलिक संकेतक रजिस्ट्री कार्यालय द्वारा किया जाता है।",
        explanationEn: "The Geographical Indications Registry of India is established and located in Chennai, Tamil Nadu.",
      },
      {
        question: "भारत का पहला भौगोलिक संकेतक (GI) टैग प्राप्त उत्पाद कौन-सा है?",
        questionEn: "Which of the following was the first Indian product to receive a Geographical Indication (GI) tag?",
        options: ["बनारसी साड़ी", "मैसूर सिल्क", "दार्जिलिंग चाय", "चंदेरी साड़ी"],
        optionsEn: ["Banarasi Saree", "Mysore Silk", "Darjeeling Tea", "Chanderi Saree"],
        correctIndex: 2,
        explanation: "पश्चिम बंगाल की प्रसिद्ध 'दार्जिलिंग चाय' को वर्ष 2004-05 में भारत का सबसे पहला जीआई टैग प्रदान किया गया था।",
        explanationEn: "Darjeeling Tea of West Bengal was the first Indian product to be granted a GI tag, awarded during 2004-05.",
      },
      {
        question: "NABARD की स्थापना किस वर्ष की गई थी और इसका मुख्यालय कहाँ स्थित है?",
        questionEn: "In which year was NABARD established, and where is its headquarters located?",
        options: [
          "1980, नई दिल्ली",
          "1982, मुंबई",
          "1985, पुणे",
          "1990, बेंगलुरु"
        ],
        optionsEn: [
          "1980, New Delhi",
          "1982, Mumbai",
          "1985, Pune",
          "1990, Bengaluru"
        ],
        correctIndex: 1,
        explanation: "नाबार्ड (NABARD) की स्थापना 12 जुलाई 1982 को शिवरामन समिति की सिफारिश पर की गई थी। इसका मुख्यालय मुंबई में स्थित है।",
        explanationEn: "NABARD was established on July 12, 1982, based on the B. Sivaraman Committee recommendations, and is headquartered in Mumbai.",
      },
      {
        question: "निम्नलिखित में से कौन-सा नवीन जीआई उत्पाद मध्य प्रदेश राज्य से संबंधित है?",
        questionEn: "Which of the following newly tagged GI products belongs to the state of Madhya Pradesh?",
        options: ["नालंदा बावनबूटी साड़ी", "बिहू पेपा", "खजुराहो मेटल क्राफ्ट", "कुचाई सिल्क"],
        optionsEn: ["Nalanda Bawanbuti Saree", "Bihu Pepa", "Khajuraho Metal Craft", "Kuchai Silk"],
        correctIndex: 2,
        explanation: "खजुराहो मेटल क्राफ्ट मध्य प्रदेश का प्रसिद्ध पारंपरिक धातु शिल्प है जिसे 2026 में जीआई दर्जा दिलाने में नाबार्ड ने सहायता की। बावनबूटी बिहार से, बिहू पेपा असम से और कुचाई सिल्क झारखंड से है।",
        explanationEn: "Khajuraho Metal Craft is from Madhya Pradesh. Nalanda Bawanbuti is from Bihar, Bihu Pepa from Assam, and Kuchai Silk from Jharkhand.",
      },
      {
        question: "जीआई (GI) टैग के संदर्भ में निम्नलिखित कथनों पर विचार कीजिए:\n1. यह उत्पाद की विशिष्ट भौगोलिक पहचान और गुणवत्ता को दर्शाता है।\n2. जीआई टैग किसी एकल व्यक्ति/उद्यमी को ही विशेष तौर पर प्रदान किया जाता है।\nउपरोक्त में से कौन-सा/से कथन सत्य हैं?",
        questionEn: "Consider the following statements regarding GI tags:\n1. It indicates a product's unique geographic origin and specific quality.\n2. A GI tag is granted exclusively to a single individual or entrepreneur.\nWhich of the statements given above is/are correct?",
        options: ["केवल 1 सही", "केवल 2 सही", "दोनों सही", "दोनों गलत"],
        optionsEn: ["Only 1 is correct", "Only 2 is correct", "Both are correct", "Both are incorrect"],
        correctIndex: 0,
        explanation: "कथन 1 बिल्कुल सत्य है। लेकिन कथन 2 असत्य है क्योंकि जीआई टैग किसी व्यक्ति विशेष को नहीं, बल्कि उस समुदाय/क्षेत्र के उत्पादकों के संघ को मिलता है।",
        explanationEn: "Statement 1 is correct as it highlights geographic origin. Statement 2 is incorrect because a GI tag is a community right granted to collective producers of a region, not to a single individual.",
      },
    ],
    faqs: [
      /* FAQ 1: NABARD July 2026 additions */
      {
        question: "नाबार्ड (NABARD) ने 10 जुलाई 2026 को कितने नए उत्पादों को जीआई (GI) टैग दिलाया है?",
        questionEn: "How many new products did NABARD facilitate GI tags for on July 10, 2026?",
        answer: "राष्ट्रीय कृषि एवं ग्रामीण विकास बैंक (NABARD) ने 10 जुलाई 2026 को देश के 28 नए पारंपरिक उत्पादों को भौगोलिक संकेतक (GI) पंजीकरण दिलाने में महत्वपूर्ण भूमिका निभाई।",
        answerEn: "NABARD facilitated Geographical Indication (GI) registration for 28 new traditional products across India on July 10, 2026.",
      },
      /* FAQ 2: Total supported count */
      {
        question: "नाबार्ड द्वारा कुल कितने जीआई (GI) उत्पादों को वित्तीय और तकनीकी रूप से समर्थित किया गया है?",
        questionEn: "What is the total number of GI products supported by NABARD?",
        answer: "28 नए उत्पादों के जुड़ने से अब नाबार्ड (NABARD) द्वारा समर्थित कुल भौगोलिक संकेतक (GI) उत्पादों की संख्या बढ़कर 176 हो गई है।",
        answerEn: "With the addition of 28 new products, the total number of GI products supported by NABARD has reached 176.",
      },
      /* FAQ 3: GI Law and enactment */
      {
        question: "भारत में जीआई (GI) टैग किस कानून के तहत और कब से लागू किया गया?",
        questionEn: "Under which law is the GI tag granted in India, and when did it take effect?",
        answer: "भारत में जीआई टैग 'वस्तुओं का भौगोलिक उपदर्शन (पंजीकरण और संरक्षण) अधिनियम, 1999' (Geographical Indications of Goods Act, 1999) के तहत दिया जाता है, जो 15 सितम्बर 2003 से पूर्ण रूप से प्रभावी हुआ।",
        answerEn: "GI tags in India are administered under the Geographical Indications of Goods (Registration and Protection) Act, 1999, which came into force on September 15, 2003.",
      },
      /* FAQ 4: GI Registry Location */
      {
        question: "भारत में जीआई रजिस्ट्री (GI Registry) का मुख्यालय कहाँ स्थित है?",
        questionEn: "Where is the headquarters of the GI Registry located in India?",
        answer: "भारत में भौगोलिक संकेतक रजिस्ट्री (GI Registry) का मुख्यालय चेन्नई, तमिलनाडु में स्थित है। यह कार्यालय पेटेंट, डिजाइन और ट्रेडमार्क महानियंत्रक (CGPDTM) के प्रशासनिक नियंत्रण में कार्य करता है।",
        answerEn: "The Geographical Indications Registry (GI Registry) of India is headquartered in Chennai, Tamil Nadu, operating under the administrative control of the Controller General of Patents, Designs & Trade Marks (CGPDTM).",
      },
      /* FAQ 5: NABARD establishment and headquarters */
      {
        question: "नाबार्ड (NABARD) की स्थापना कब हुई थी और इसका मुख्यालय कहाँ है?",
        questionEn: "When was NABARD established and where is its headquarters?",
        answer: "नाबार्ड (राष्ट्रीय कृषि एवं ग्रामीण विकास बैंक) की स्थापना 12 जुलाई 1982 को बी. शिवरामन समिति की सिफारिश पर की गई थी। इसका मुख्यालय मुंबई (महाराष्ट्र) में स्थित है।",
        answerEn: "NABARD (National Bank for Agriculture and Rural Development) was established on July 12, 1982, on the recommendations of the B. Sivaraman Committee. It is headquartered in Mumbai, Maharashtra.",
      },
      /* FAQ 6: NABARD Current Chairman */
      {
        question: "नाबार्ड (NABARD) के वर्तमान अध्यक्ष कौन हैं?",
        questionEn: "Who is the current chairman of NABARD?",
        answer: "नाबार्ड (NABARD) के वर्तमान अध्यक्ष डॉ. शाजी कृष्णन वी. हैं।",
        answerEn: "The current chairman of NABARD is Dr. Shaji Krishnan V.",
      },
      /* FAQ 7: First GI Tag */
      {
        question: "भारत का पहला जीआई टैग (GI Tag) किस उत्पाद को और कब मिला था?",
        questionEn: "Which Indian product received the first GI tag and when?",
        answer: "पश्चिम बंगाल की प्रसिद्ध 'दार्जिलिंग चाय' को वर्ष 2004-05 में भारत का सबसे पहला जीआई टैग (GI Tag) प्रदान किया गया था।",
        answerEn: "The famous 'Darjeeling Tea' of West Bengal was the first product in India to receive a Geographical Indication (GI) tag, awarded in the fiscal year 2004-05.",
      },
      /* FAQ 8: Validity */
      {
        question: "भौगोलिक संकेतक (GI Tag) की वैधता अवधि कितनी होती है?",
        questionEn: "What is the validity period of a Geographical Indication (GI) tag in India?",
        answer: "जीआई पंजीकरण की वैधता अवधि 10 वर्ष होती है। 10 वर्ष पूर्ण होने पर इसे जीआई रजिस्ट्री कार्यालय के माध्यम से शुल्क भुगतान करके पुनः नवीनीकृत (Renew) किया जा सकता है।",
        answerEn: "A GI tag registration is valid for a period of 10 years. It can be renewed periodically for another 10 years upon application and fee payment to the GI Registry.",
      },
      /* FAQ 9: Highest State */
      {
        question: "जुलाई 2026 तक भारत में किस राज्य के पास सर्वाधिक जीआई (GI) टैग प्राप्त उत्पाद हैं?",
        questionEn: "Which state in India has the highest number of GI tags as of July 2026?",
        answer: "जुलाई 2026 तक के नवीनतम आंकड़ों के अनुसार, उत्तर प्रदेश (UP) 70 से अधिक जीआई उत्पादों के साथ भारत में प्रथम स्थान पर है, जबकि तमिलनाडु लगभग 65 उत्पादों के साथ दूसरे स्थान पर है।",
        answerEn: "As of July 2026, Uttar Pradesh (UP) leads with the highest number of GI-tagged products (70+ items), closely followed by Tamil Nadu (65+ items) in second place.",
      },
      /* FAQ 10: Unauthorized use */
      {
        question: "क्या जीआई टैग प्राप्त उत्पाद का कोई और नकली उपयोग कर सकता है?",
        questionEn: "Can a GI-tagged product name be legally used by other unauthorized producers?",
        answer: "नहीं, वस्तुओं का जीआई संरक्षण अधिनियम 1999 के तहत अनधिकृत उपयोग कानूनी अपराध है। ऐसा करने वाले व्यक्ति/संस्था के विरुद्ध कानूनी कार्यवाही की जा सकती है तथा जुर्माना या कारावास का प्रावधान है।",
        answerEn: "No, unauthorized registration or use of a registered GI name by other producers is prohibited under the 1999 Act, constituting a punishable offence with fines and imprisonment.",
      },
    ],
    sources: [
      {
        label: "National Bank for Agriculture and Rural Development (NABARD) Press Release",
        url: "https://www.nabard.org",
      },
      {
        label: "Geographical Indications Registry, Chennai",
        url: "https://ipindia.gov.in",
      },
      {
        label: "Press Information Bureau (PIB) Government of India",
        url: "https://pib.gov.in",
      },
    ],
  };

  try {
    await client.createOrReplace(article);
    console.log("✨ Successfully uploaded reformatted NABARD 28 New GI Tags 2026 Article to Sanity with SEO-rich FAQs!");
  } catch (err) {
    console.error("❌ Failed to create/replace document in Sanity:", err);
  }
}

main().catch((err) => {
  console.error("❌ Error running script:", err);
  process.exit(1);
});
