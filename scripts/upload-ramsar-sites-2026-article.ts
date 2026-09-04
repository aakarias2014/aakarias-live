import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

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
  console.log("🚀 Uploading Complete Ramsar Sites in India 2026 Article to Sanity CMS...");

  // 1. Ensure Default Author exists per rules
  const authorDoc = {
    _id: "author-aakar",
    _type: "author",
    slug: { _type: "slug", current: "aakar-ias-team" },
    name: "Aakar IAS Team",
    role: "Senior Editorial Lead & MPPSC/UPSC Subject Specialist",
    bio: "Lead content developer and researcher specializing in MPPSC & UPSC environment, governance, and national affairs.",
  };
  await client.createOrReplace(authorDoc);
  console.log("✔ Verified/Updated Default Author: Aakar IAS Team");

  // 2. Prepare & Copy Image Assets
  const publicBlogDir = path.resolve(process.cwd(), "public/images/blog");
  const artifactDir = "/Users/aakariastech/.gemini/antigravity-ide/brain/e3878d1d-a66f-4a6d-84dd-b181a33cf548";

  if (!fs.existsSync(publicBlogDir)) fs.mkdirSync(publicBlogDir, { recursive: true });

  const destCover = path.join(publicBlogDir, "ramsar_sites_india_2026_map_wetlands_cover.png");
  const destGlaw = path.join(publicBlogDir, "glaw_lake_arunachal_pradesh_101st_ramsar_site.png");
  const destSundarban = path.join(publicBlogDir, "sundarban_wetland_largest_ramsar_site.png");
  const destMontreux = path.join(publicBlogDir, "montreux_record_keoladeo_loktak_conservation.png");

  const srcCover = path.join(artifactDir, "ramsar_sites_india_2026_map_wetlands_cover_1785831169818.png");
  const srcGlaw = path.join(artifactDir, "glaw_lake_arunachal_pradesh_101st_ramsar_site_1785831188761.png");
  const srcSundarban = path.join(artifactDir, "sundarban_wetland_largest_ramsar_site_1785831218160.png");
  const srcMontreux = path.join(artifactDir, "montreux_record_keoladeo_loktak_conservation_1785831236058.png");

  if (fs.existsSync(srcCover)) fs.copyFileSync(srcCover, destCover);
  if (fs.existsSync(srcGlaw)) fs.copyFileSync(srcGlaw, destGlaw);
  if (fs.existsSync(srcSundarban)) fs.copyFileSync(srcSundarban, destSundarban);
  if (fs.existsSync(srcMontreux)) fs.copyFileSync(srcMontreux, destMontreux);

  console.log("📸 Uploading 4 real images to Sanity CMS...");
  const assetCover = await client.assets.upload("image", fs.createReadStream(destCover), {
    filename: "ramsar_sites_india_2026_map_wetlands_cover.png",
  });
  const assetGlaw = await client.assets.upload("image", fs.createReadStream(destGlaw), {
    filename: "glaw_lake_arunachal_pradesh_101st_ramsar_site.png",
  });
  const assetSundarban = await client.assets.upload("image", fs.createReadStream(destSundarban), {
    filename: "sundarban_wetland_largest_ramsar_site.png",
  });
  const assetMontreux = await client.assets.upload("image", fs.createReadStream(destMontreux), {
    filename: "montreux_record_keoladeo_loktak_conservation.png",
  });

  const docId = "ca-ramsar-sites-in-india-2026";
  const slug = "ramsar-sites-in-india-2026-state-wise-list-101st-site-mppsc-upsc-notes";

  const articleDoc = {
    _id: docId,
    _type: "currentAffairs",
    title: "भारत में रामसर स्थल 2026: राज्यवार सूची, कुल 101 स्थल, 101वाँ स्थल ग्लाव झील, मानदंड, मोंट्रेक्स रिकॉर्ड व नवीनतम विवरण | MPPSC & UPSC Notes",
    titleEn: "Ramsar Sites in India 2026: State-wise List, Total 101 Sites, 101st Site Glaw Lake, Criteria, Montreux Record & Latest Details | MPPSC & UPSC Notes",
    slug: { _type: "slug", current: slug },
    category: { _type: "reference", _ref: "cat-environment" },
    author: { _type: "reference", _ref: "author-aakar" },
    ca_date: "2026-08-04",
    publishedAt: new Date().toISOString(),
    featured: true,
    readingTime: 20,
    tags: [
      { _type: "reference", _ref: "tag-mppsc" },
      { _type: "reference", _ref: "tag-upsc" },
      { _type: "reference", _ref: "tag-prelims" },
      { _type: "reference", _ref: "tag-mains" },
    ],
    syllabus: ["GS-3", "Prelims-GS"],
    excerpt: "भारत में रामसर स्थल 2026: 28 राज्यों व यूटी में फैले कुल 101 रामसर स्थल। 3 अगस्त 2026 को घोषित 101वाँ रामसर स्थल अरुणाचल प्रदेश की ग्लाव झील (Glaw Lake), 2025-2026 में नए स्थल, सुंदरबन (सबसे बड़ा), रेणुका व वेम्बन्नूर (सबसे छोटे), चिल्का व केवलादेव (सबसे पुराने), मोंट्रेक्स रिकॉर्ड, रामसर मानदंड व 8 वस्तुनिष्ठ अभ्यास प्रश्न। MPPSC व UPSC परीक्षा हेतु संपूर्ण गाइड।",
    excerptEn: "Comprehensive guide on Ramsar Sites in India 2026: 101 total sites across 28 states/UTs, 101st site Glaw Lake (Arunachal Pradesh - 3 Aug 2026), 2025-26 additions, largest (Sundarbans), smallest (Renuka & Vembannur), oldest (Chilika & Keoladeo), Montreux record, Ramsar criteria & 8 MCQs for MPPSC & UPSC.",
    seoTitle: "भारत में रामसर स्थल 2026 (कुल 101 स्थल) | Ramsar Sites in India 2026 | MPPSC & UPSC Notes",
    seoDescription: "भारत में 101 रामसर स्थल 2026 (Ramsar Sites in India 2026): 3 अगस्त 2026 को घोषित 101वाँ स्थल ग्लाव झील (अरुणाचल प्रदेश), राज्यवार संपूर्ण सूची, 2025-26 में जोड़े गए नए 16 स्थल, रामसर कन्वेंशन मानदंड, मोंट्रेक्स रिकॉर्ड व 8 MCQs। MPPSC व UPSC अध्ययन सामग्री।",
    keywords: [
      "भारत में रामसर स्थल 2026",
      "Ramsar Sites in India 2026",
      "101st Ramsar Site India",
      "ग्लाव झील अरुणाचल प्रदेश",
      "Glaw Lake Ramsar Site",
      "रामसर स्थल 2026 राज्यवार सूची",
      "Statewise Ramsar Sites India 2026",
      "Montreux Record in India",
      "मोंट्रेक्स रिकॉर्ड भारत",
      "रामसर कन्वेंशन 1971",
      "Ramsar Sites MPPSC Notes",
      "Ramsar Sites UPSC Notes",
      "पर्यावरण एवं पारिस्थितिकी MPPSC",
      "Environment and Ecology Current Affairs 2026"
    ],
    featuredImage: {
      _type: "image",
      asset: { _type: "reference", _ref: assetCover._id },
      alt: "India Ramsar Sites 2026 Map Total 101 Wetlands MPPSC UPSC Notes",
      caption: "भारत में रामसर स्थल 2026 (Ramsar Sites in India 2026): 28 राज्यों में फैले कुल 101 आर्द्रभूमि क्षेत्र",
    },

    /* ────────────── HINDI BODY ────────────── */
    body: [
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "1. भारत में रामसर स्थल 2026: हालिया घटनाक्रम एवं परिचय" }],
      },
      {
        _type: "image",
        asset: { _type: "reference", _ref: assetCover._id },
        alt: "India Ramsar Sites 2026 Map Total 101 Wetlands MPPSC UPSC Notes",
        caption: "भारत में रामसर स्थलों की स्थिति 2026: पारिस्थितिक विविधता, जैव विविधता एवं आर्द्रभूमि संरक्षण",
      },
      {
        _type: "block",
        style: "normal",
        children: [
          { _type: "span", text: "भारत में आर्द्रभूमि (Wetlands) संरक्षण की दिशा में ऐतिहासिक उपलब्धि हासिल करते हुए देश में रामसर स्थलों की कुल संख्या बढ़कर " },
          { _type: "span", marks: ["strong"], text: "101" },
          { _type: "span", text: " हो गई है। केंद्र सरकार के पर्यावरण, वन और जलवायु परिवर्तन मंत्रालय द्वारा दी गई आधिकारिक जानकारी के अनुसार, " },
          { _type: "span", marks: ["strong"], text: "3 अगस्त 2026" },
          { _type: "span", text: " को अरुणाचल प्रदेश के लोहित जिले में स्थित प्रसिद्ध " },
          { _type: "span", marks: ["strong"], text: "ग्लाव झील (Glaw Lake)" },
          { _type: "span", text: " को अंतर्राष्ट्रीय महत्व का रामसर स्थल (101st Ramsar Site of India) घोषित किया गया है। यह अरुणाचल प्रदेश का पहला रामसर स्थल भी है।" },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          { _type: "span", text: "वर्तमान में भारत के 28 राज्यों एवं केंद्र शासित प्रदेशों में 101 रामसर स्थल विस्तृत हैं, जो देश के समृद्ध जलवैज्ञानिक, पारिस्थितिकीय और जैव विविधता संतुलन को प्रदर्शित करते हैं। इनमें से सबसे बड़ा रामसर स्थल पश्चिम बंगाल स्थित " },
          { _type: "span", marks: ["strong"], text: "सुंदरबन आर्द्रभूमि (4,230 वर्ग किमी)" },
          { _type: "span", text: " है, जबकि सबसे छोटे स्थलों में हिमाचल प्रदेश की " },
          { _type: "span", marks: ["strong"], text: "रेणुका झील (0.2 वर्ग किमी)" },
          { _type: "span", text: " तथा तमिलनाडु का " },
          { _type: "span", marks: ["strong"], text: "वेम्बन्नूर आर्द्रभूमि परिसर (0.2 वर्ग किमी)" },
          { _type: "span", text: " शामिल हैं। भारत के प्रथम रामसर स्थल के रूप में वर्ष 1981 में ओडिशा की **चिल्का झील** और राजस्थान के **केवलादेव घाना राष्ट्रीय उद्यान** को शामिल किया गया था।" },
        ],
      },

      /* ── 2. What is Ramsar Site & Criteria ── */
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "2. रामसर स्थल क्या है एवं रामसर सम्मेलन (Ramsar Convention 1971) के मानदंड" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          { _type: "span", text: "रामसर स्थल एक अंतर्राष्ट्रीय मान्यता प्राप्त आर्द्रभूमि क्षेत्र है, जिसे **2 फरवरी 1971** को ईरान के रामसर शहर में हस्ताक्षरित " },
          { _type: "span", marks: ["strong"], text: "रामसर सम्मेलन (Ramsar Convention on Wetlands)" },
          { _type: "span", text: " के अंतर्गत वैश्विक जैव विविधता और पारिस्थितिक तंत्र के संरक्षण के लिए नामांकित किया जाता है। भारत 1 फरवरी 1982 को इस सम्मेलन का हस्ताक्षरकर्ता बना।" },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "किसी आर्द्रभूमि को रामसर स्थल का दर्जा प्राप्त करने के लिए निम्नलिखित 9 अंतरराष्ट्रीय मानदंडों में से कम से कम एक को पूरा करना अनिवार्य होता है:" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **मानदंड 1 (अद्वितीय/दुर्लभ आर्द्रभूमि)**: यदि वह आर्द्रभूमि संबंधित जैव-भौगोलिक क्षेत्र में एक अद्वितीय या प्रतिनिधि प्राकृतिक/निकट-प्राकृतिक उदाहरण प्रस्तुत करती हो।" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **मानदंड 2 (लुप्तप्राय प्रजातियां)**: यदि यह संकटग्रस्त, लुप्तप्राय या अति-संवेदनशील प्रजातियों या पारिस्थितिक समुदायों का समर्थन करती हो।" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **मानदंड 3 (जैव विविधता पोषिता)**: यदि यह किसी विशिष्ट जैव-भौगोलिक क्षेत्र की पादप व पशु विविधता को बनाए रखने में महत्वपूर्ण भूमिका निभाती हो।" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **मानदंड 4 (जीवन चक्र में सहायता)**: यदि यह जीवों को उनके जीवन चक्र के नाजुक चरणों में शरण या प्रतिकूल परिस्थितियों में सुरक्षा प्रदान करती हो।" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **मानदंड 5 (20,000+ जलपक्षी)**: यदि यह नियमित रूप से 20,000 या उससे अधिक जलपक्षियों (Waterbirds) का आवास स्थल हो।" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **मानदंड 6 (1% जलपक्षी आबादी)**: यदि यह जलपक्षी की किसी एक प्रजाति या उप-प्रजाति की वैश्विक आबादी का कम से कम 1% नियमित रूप से समर्थन करती हो।" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **मानदंड 7 (मछली विविधता व जीवन चक्र)**: यदि यह देशी मछली प्रजातियों, जीवन-चक्र चरणों और पारिस्थितिक अंतःक्रियाओं का एक महत्वपूर्ण अनुपात समर्थित करती हो।" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **मानदंड 8 (मत्स्य प्रजनन व नर्सरी)**: यदि यह मछलियों के लिए भोजन, नर्सरी क्षेत्र या प्रवासन मार्ग का कार्य करती हो।" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **मानदंड 9 (अन्य गैर-पक्षी प्रजातियों की 1% आबादी)**: यदि यह गैर-एवियन जल-निर्भर पशु प्रजातियों की 1% आबादी का नियमित समर्थन करती हो।" }],
      },

      /* ── 3. 101st Ramsar Site: Glaw Lake ── */
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "3. भारत का 101वाँ रामसर स्थल: ग्लाव झील (Glaw Lake, Arunachal Pradesh)" }],
      },
      {
        _type: "image",
        asset: { _type: "reference", _ref: assetGlaw._id },
        alt: "Glaw Lake Arunachal Pradesh 101st Ramsar Site India Wildlife Ecosystem",
        caption: "ग्लाव झील (Glaw Lake), अरुणाचल प्रदेश: भारत का 101वाँ रामसर स्थल (3 अगस्त 2026 को घोषित)",
      },
      {
        _type: "block",
        style: "normal",
        children: [
          { _type: "span", text: "केंद्र सरकार द्वारा " },
          { _type: "span", marks: ["strong"], text: "3 अगस्त 2026" },
          { _type: "span", text: " को अधिसूचित " },
          { _type: "span", marks: ["strong"], text: "ग्लाव झील (Glaw Lake)" },
          { _type: "span", text: " अरुणाचल प्रदेश के लोहित जिले के वाकरो (Wakro) उप-विभाग में " },
          { _type: "span", marks: ["strong"], text: "कमलांग वन्यजीव अभयारण्य (Kamlang Wildlife Sanctuary)" },
          { _type: "span", text: " के भीतर स्थित एक अत्यंत प्राचीन और प्राकृतिक रूप से समृद्ध उच्च-ऊंचाई वाली मीठे पानी की झील है।" },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **स्थान एवं भूगोल**: यह झील समुद्र तल से लगभग 1,200 मीटर की ऊंचाई पर स्थित है और घने उप-उष्णकटिबंधीय वर्षावनों तथा मिशमी पहाड़ियों से घिरी हुई है।" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **पारिस्थितिकीय महत्व**: यह झील कमलांग नदी का मुख्य जलग्रहण स्रोत है, जो आगे चलकर लोहित नदी में मिलती है। यह संकटग्रस्त हॉर्नबिल, मिशमी ताकिन (Mishmi Takin), कस्तूरी मृग और दुर्लभ जैव विविधता का निवास स्थान है।" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **सांस्कृतिक महत्व**: स्थानीय मिशमी जनजाति (Mishmi Tribe) के लिए यह झील अत्यंत पवित्र मानी जाती है और पारंपरिक लोक मान्यताओं से जुड़ी हुई है।" }],
      },

      /* ── 4. Recently Added Sites 2025-2026 ── */
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "4. वर्ष 2025 एवं 2026 में हाल ही में जोड़े गए नए रामसर स्थल (16 स्थल)" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "वर्ष 2025 और 2026 के दौरान भारत ने अपनी सूची में 16 नए रामसर स्थलों को जोड़ा है, जिससे कुल संख्या 101 तक पहुँच गई है। इन हालिया परिवर्द्धनों की सूची निम्नलिखित है:" }]
      },
      {
        _type: "table",
        caption: "हाल ही में शामिल किए गए नए रामसर स्थल (2025-2026 Additions)",
        headers: ["क्र.", "रामसर स्थल का नाम", "राज्य / केंद्र शासित प्रदेश", "नामित वर्ष", "प्रमुख विवरण व पारिस्थितिक महत्व"],
        rows: [
          ["1", "**सक्कराकोट्टई पक्षी अभयारण्य**", "तमिलनाडु", "2025", "प्रवासी जलपक्षियों एवं जलीय वनस्पतियों हेतु महत्वपूर्ण टैंक पारिस्थितिकी तंत्र।"],
          ["2", "**थेरथांगल पक्षी अभयारण्य**", "तमिलनाडु", "2025", "स्थानीय समुदाय द्वारा संरक्षित सिंचाई टैंक व पक्षी प्रजनन केंद्र।"],
          ["3", "**खेचेओपालरी आर्द्रभूमि**", "सिक्किम", "2025", "डेमाजोंग घाटी में हिंदू व बौद्ध समुदाय हेतु पवित्र उच्च-ऊंचाई वाली पवित्र झील।"],
          ["4", "**उधवा झील पक्षी अभयारण्य**", "झारखंड", "2025", "गंगा नदी के बाढ़ के मैदान में स्थित गोखुर (Oxbow) झील; ओरिएंटल व्हाइट-बैक्ड गिद्ध का आवास।"],
          ["5", "**खिचन (फलोदी)**", "राजस्थान", "2025", "थार मरुस्थल में साइबेरियाई डेमोइसेल क्रेन (कुर्जा पक्षी) का प्रसिद्ध शीतकालीन आवास।"],
          ["6", "**मेनार आर्द्रभूमि परिसर**", "राजस्थान", "2025", "उदयपुर का 'बर्ड विलेज'; मानसून संचालित मीठे पानी का पक्षी संरक्षण स्थल।"],
          ["7", "**गोकुल जलाशय**", "बिहार", "2025", "बक्सर में गंगा के तट पर स्थित गोखुर झील; मत्स्य पालन व प्रवासी पक्षी केंद्र।"],
          ["8", "**उदयपुर झील**", "बिहार", "2025", "पश्चिम चंपारण के उदयपुर अभयारण्य में 280 पादप प्रजातियों से समृद्ध झील।"],
          ["9", "**गोगबील झील**", "बिहार", "2025", "कटिहार जिले में महानंदा व गंगा के संगम पर स्थित बिहार का प्रथम सामुदायिक रिज़र्व।"],
          ["10", "**सिलिसरह झील**", "राजस्थान", "2025", "अलवर में अरावली पर्वतमाला के बीच स्थित ऐतिहासिक मानव निर्मित मीठे पानी की झील।"],
          ["11", "**कोपरा जलाशय**", "छत्तीसगढ़", "2025", "बिलासपुर जिले में स्थित समृद्ध जलीय जीव व पक्षी आश्रय स्थल।"],
          ["12", "**पटना पक्षी अभयारण्य**", "उत्तर प्रदेश", "2026", "एटा जिले में स्थित मौसमी मीठे पानी की दलदली भूमि; जलपक्षियों का आश्रय।"],
          ["13", "**छारी-धंड आर्द्रभूमि**", "गुजरात (कच्छ)", "2026", "कच्छ के रन में स्थित मौसमी खारी-मीठी आर्द्रभूमि; फ्लेमिंगो व कॉमन क्रैन केंद्र।"],
          ["14", "**शेखा झील पक्षी अभयारण्य**", "उत्तर प्रदेश", "2026", "अलीगढ़ में ऊपरी गंगा नहर के पास स्थित ताजे पानी का आर्द्रभूमि पारिस्थितिकी तंत्र।"],
          ["15", "**जय प्रकाश नारायण पक्षी अभयारण्य (सुरहा ताल)**", "उत्तर प्रदेश", "2026", "बलिया जिले में गंगा नदी द्वारा निर्मित विशाल गोखुर झील (100th Ramsar Site)।"],
          ["16", "**ग्लाव झील (Glaw Lake)**", "अरुणाचल प्रदेश", "2026", "लोहित जिले में कमलांग अभयारण्य के भीतर स्थित (101st Ramsar Site - 3 Aug 2026)।"]
        ]
      },

      /* ── 5. Statewise Complete List ── */
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "5. भारत में रामसर स्थलों की राज्यवार संपूर्ण सूची 2026 (101 स्थल)" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "नीचे भारत के सभी 28 राज्यों एवं केंद्र शासित प्रदेशों में स्थित सभी 101 रामसर स्थलों की प्रामाणिक राज्यवार सूची दी गई है:" }]
      },
      {
        _type: "table",
        caption: "भारत के 101 रामसर स्थलों की राज्यवार सूची (State-wise Ramsar Sites in India 2026)",
        headers: ["क्र.", "रामसर स्थल (Ramsar Site)", "राज्य / केंद्र शासित प्रदेश", "नामित वर्ष", "क्षेत्रफल (वर्ग किमी)"],
        rows: [
          ["1", "कोल्लेरू झील (Kolleru Lake)", "आंध्र प्रदेश", "2002", "901"],
          ["2", "दीपोर बील (Deepor Beel)", "असम", "2002", "40"],
          ["3", "कंवर (कबर) ताल", "बिहार", "2020", "26.2"],
          ["4", "नागी पक्षी अभयारण्य", "बिहार", "2023", "2.0"],
          ["5", "नक्ती पक्षी अभयारण्य", "बिहार", "2023", "3.3"],
          ["6", "गोकुल जलाशय", "बिहार", "2025", "–"],
          ["7", "उदयपुर झील", "बिहार", "2025", "–"],
          ["8", "गोगबील झील", "बिहार", "2025", "–"],
          ["9", "नंदा झील (Nanda Lake)", "गोवा", "2022", "0.42"],
          ["10", "खिजाडिया पक्षी अभयारण्य", "गुजरात", "2021", "6.0"],
          ["11", "नलसरोवर पक्षी अभयारण्य", "गुजरात", "2012", "123.0"],
          ["12", "थोल झील पक्षी अभयारण्य", "गुजरात", "2021", "6.99"],
          ["13", "वधवाना आर्द्रभूमि", "गुजरात", "2021", "10.38"],
          ["14", "छारी-धंड (कच्छ)", "गुजरात", "2026", "–"],
          ["15", "भिंडावास वन्यजीव अभयारण्य", "हरियाणा", "2021", "4.11"],
          ["16", "सुल्तानपुर राष्ट्रीय उद्यान", "हरियाणा", "2021", "142.5"],
          ["17", "चंद्र ताल", "हिमाचल प्रदेश", "2005", "0.49"],
          ["18", "पोंग बांध झील", "हिमाचल प्रदेश", "2002", "156.62"],
          ["19", "रेणुका झील", "हिमाचल प्रदेश", "2005", "0.20"],
          ["20", "रंगनाथित्तु पक्षी अभयारण्य", "कर्नाटक", "2022", "5.18"],
          ["21", "मगाडी केरे संरक्षण अभ्यारण्य", "कर्नाटक", "2024", "0.50"],
          ["22", "अंकसमुद्र पक्षी संरक्षण रिजर्व", "कर्नाटक", "2024", "0.98"],
          ["23", "अघनाशिनी मुहाना (Aghanashini Estuary)", "कर्नाटक", "2024", "4.80"],
          ["24", "अष्टामुडी आर्द्रभूमि", "केरल", "2002", "614.0"],
          ["25", "सस्थमकोट्टा झील", "केरल", "2002", "3.73"],
          ["26", "वेम्बनाड-कोल आर्द्रभूमि", "केरल", "2002", "1512.5"],
          ["27", "भोज आर्द्रभूमि (Bhoj Wetland)", "मध्य प्रदेश", "2002", "32.0"],
          ["28", "साख्य सागर", "मध्य प्रदेश", "2022", "2.48"],
          ["29", "सिरपुर आर्द्रभूमि", "मध्य प्रदेश", "2022", "1.61"],
          ["30", "यशवंत सागर", "मध्य प्रदेश", "2022", "8.22"],
          ["31", "तावा जलाशय (Tawa Reservoir)", "मध्य प्रदेश", "2024", "200.0"],
          ["32", "लोनार झील", "महाराष्ट्र", "2020", "4.27"],
          ["33", "नंदुर मधमेश्वर", "महाराष्ट्र", "2019", "14.0"],
          ["34", "थाने क्रीक (Thane Creek)", "महाराष्ट्र", "2022", "65.21"],
          ["35", "लोकटक झील (Loktak Lake)", "मणिपुर", "1990", "266.0"],
          ["36", "पाला आर्द्रभूमि (Pala Wetland)", "मिजोरम", "2021", "18.5"],
          ["37", "अनसुपा झील", "ओडिशा", "2021", "2.31"],
          ["38", "भितरकनिका मैंग्रोव", "ओडिशा", "2002", "650.0"],
          ["39", "चिलिका झील (Chilika Lake)", "ओडिशा", "1981", "1165.0"],
          ["40", "हीराकुड जलाशय", "ओडिशा", "2021", "654.0"],
          ["41", "सतकोसिया घाटी (Satkosia Gorge)", "ओडिशा", "2021", "981.97"],
          ["42", "ताम्पारा झील", "ओडिशा", "2021", "3.0"],
          ["43", "बीस संरक्षण रिजर्व", "पंजाब", "2019", "64.0"],
          ["44", "हरिके आर्द्रभूमि", "पंजाब", "1990", "41.0"],
          ["45", "कंजली आर्द्रभूमि", "पंजाब", "2002", "1.83"],
          ["46", "केशोपुर-मियानी कम्युनिटी रिजर्व", "पंजाब", "2019", "34.0"],
          ["47", "नांगल वन्यजीव अभयारण्य", "पंजाब", "2019", "1.0"],
          ["48", "रोपड़ आर्द्रभूमि", "पंजाब", "2002", "13.65"],
          ["49", "केवलादेव घाना राष्ट्रीय उद्यान", "राजस्थान", "1981", "28.73"],
          ["50", "सांभर झील", "राजस्थान", "1990", "240.0"],
          ["51", "खिचन (फलोदी)", "राजस्थान", "2025", "–"],
          ["52", "मेनार आर्द्रभूमि (उदयपुर)", "राजस्थान", "2025", "–"],
          ["53", "सिलिसरह झील", "राजस्थान", "2025", "–"],
          ["54", "चित्रांगुडी पक्षी अभयारण्य", "तमिलनाडु", "2021", "2.6"],
          ["55", "मन्नार की खाड़ी मरीन बायोस्फीयर", "तमिलनाडु", "2022", "526.72"],
          ["56", "कंजीरंकुलम पक्षी अभयारण्य", "तमिलनाडु", "2022", "0.96"],
          ["57", "करिकिली पक्षी अभयारण्य", "तमिलनाडु", "2022", "0.584"],
          ["58", "कूनथंकुलम पक्षी अभयारण्य", "तमिलनाडु", "2021", "0.72"],
          ["59", "पल्लीकरनई मार्श रिजर्व वन", "तमिलनाडु", "2022", "12.475"],
          ["60", "पिचावरम मैंग्रोव", "तमिलनाडु", "2022", "14.786"],
          ["61", "पॉइंट कैलिमेरे अभयारण्य", "तमिलनाडु", "2002", "389.0"],
          ["62", "सुचिंद्रम थेरूर आर्द्रभूमि", "तमिलनाडु", "2022", "0.94"],
          ["63", "उदयमार्थंदपुरम पक्षी अभयारण्य", "तमिलनाडु", "2022", "0.44"],
          ["64", "वडुवुर पक्षी अभयारण्य", "तमिलनाडु", "2022", "1.12"],
          ["65", "वेदान्थंगल पक्षी अभयारण्य", "तमिलनाडु", "2022", "0.40"],
          ["66", "वेलोड पक्षी अभयारण्य", "तमिलनाडु", "2022", "0.77"],
          ["67", "वेम्बन्नूर आर्द्रभूमि परिसर", "तमिलनाडु", "2022", "0.20"],
          ["68", "कारावेट्टी पक्षी अभयारण्य", "तमिलनाडु", "2024", "4.5"],
          ["69", "लॉन्गवुड शोला आरक्षित वन", "तमिलनाडु", "2024", "1.16"],
          ["70", "नंजरायन पक्षी अभयारण्य", "तमिलनाडु", "2024", "1.3"],
          ["71", "काझुवेली पक्षी अभयारण्य", "तमिलनाडु", "2024", "1513.0"],
          ["72", "सक्कराकोट्टई पक्षी अभयारण्य", "तमिलनाडु", "2025", "–"],
          ["73", "थेरथांगल पक्षी अभयारण्य", "तमिलनाडु", "2025", "–"],
          ["74", "रुद्रसागर झील", "त्रिपुरा", "2005", "2.4"],
          ["75", "होकेरा आर्द्रभूमि", "जम्मू और कश्मीर (UT)", "2005", "13.75"],
          ["76", "हाइगम वेटलैंड रिजर्व", "जम्मू और कश्मीर (UT)", "2022", "8.02"],
          ["77", "शैलबुघ वेटलैंड रिजर्व", "जम्मू और कश्मीर (UT)", "2022", "16.75"],
          ["78", "सुरिंसर-मानसर झीलें", "जम्मू और कश्मीर (UT)", "2005", "3.5"],
          ["79", "वुलर झील (Wular Lake)", "जम्मू और कश्मीर (UT)", "1990", "189.0"],
          ["80", "त्सो कार आर्द्रभूमि परिसर", "लद्दाख (UT)", "2020", "95.77"],
          ["81", "त्सोमोरिरि झील", "लद्दाख (UT)", "2002", "120.0"],
          ["82", "बखीरा पक्षी अभयारण्य", "उत्तर प्रदेश", "2021", "28.94"],
          ["83", "हैदरपुर आर्द्रभूमि", "उत्तर प्रदेश", "2021", "69.0"],
          ["84", "नवाबगंज पक्षी अभयारण्य", "उत्तर प्रदेश", "2019", "2.0"],
          ["85", "पार्वती अर्गा पक्षी अभयारण्य", "उत्तर प्रदेश", "2019", "7.0"],
          ["86", "समन पक्षी अभयारण्य", "उत्तर प्रदेश", "2019", "5.0"],
          ["87", "समसपुर पक्षी अभयारण्य", "उत्तर प्रदेश", "2019", "8.0"],
          ["88", "सैंडी पक्षी अभयारण्य", "उत्तर प्रदेश", "2019", "3.0"],
          ["89", "सरसाई नवार झील", "उत्तर प्रदेश", "2019", "2.0"],
          ["90", "सुर सरोवर (कीथम झील)", "उत्तर प्रदेश", "2020", "4.31"],
          ["91", "ऊपरी गंगा नदी (बृजघाट से नरोरा)", "उत्तर प्रदेश", "2005", "265.9"],
          ["92", "पटना पक्षी अभयारण्य", "उत्तर प्रदेश", "2026", "–"],
          ["93", "शेखा झील पक्षी अभयारण्य", "उत्तर प्रदेश", "2026", "–"],
          ["94", "जय प्रकाश नारायण (सुरहा ताल)", "उत्तर प्रदेश", "2026", "–"],
          ["95", "आसन बैराज", "उत्तराखंड", "2020", "4.44"],
          ["96", "पूर्वी कोलकाता आर्द्रभूमि", "पश्चिम बंगाल", "2002", "125.0"],
          ["97", "सुंदरबन आर्द्रभूमि", "पश्चिम बंगाल", "2019", "4230.0"],
          ["98", "खेचेओपालरी आर्द्रभूमि", "सिक्किम", "2025", "–"],
          ["99", "उधवा झील अभयारण्य", "झारखंड", "2025", "–"],
          ["100", "कोपरा जलाशय", "छत्तीसगढ़", "2025", "–"],
          ["101", "ग्लाव झील (Glaw Lake)", "अरुणाचल प्रदेश", "2026", "–"]
        ]
      },

      /* ── 6. Key Comparative Facts ── */
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "6. भारत के प्रमुख रामसर स्थल: सर्वाधिक, सबसे छोटे एवं प्रथम स्थल" }],
      },
      {
        _type: "image",
        asset: { _type: "reference", _ref: assetSundarban._id },
        alt: "Sundarban Wetland West Bengal Largest Ramsar Site India Bengal Tiger Mangroves",
        caption: "सुंदरबन आर्द्रभूमि (West Bengal): भारत का सबसे बड़ा रामसर स्थल (4,230 वर्ग किमी)",
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "परीक्षा की दृष्टि से भारत के रामसर स्थलों के महत्वपूर्ण तुलनात्मक तथ्य निम्नलिखित हैं:" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **सर्वाधिक रामसर स्थलों वाला राज्य**: **तमिलनाडु (18 स्थल)** के साथ भारत में प्रथम स्थान पर है, जबकि **उत्तर प्रदेश (13 स्थल)** द्वितीय स्थान पर है।" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **भारत का सबसे बड़ा रामसर स्थल**: पश्चिम बंगाल का **सुंदरबन आर्द्रभूमि (4,230 वर्ग किमी)** है। इसके बाद तमिलनाडु का **काझुवेली पक्षी अभयारण्य (1,513 वर्ग किमी)** और केरल का **वेम्बनाड-कोल (1,512.5 वर्ग किमी)** आते हैं।" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **भारत के सबसे छोटे रामसर स्थल**: हिमाचल प्रदेश की **रेणुका झील (0.2 वर्ग किमी)** और तमिलनाडु का **वेम्बन्नूर आर्द्रभूमि परिसर (0.2 वर्ग किमी)** भारत के सबसे छोटे नामांकित स्थल हैं।" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **भारत के प्रथम रामसर स्थल**: **वर्ष 1981** में ओडिशा की **चिल्का झील** और राजस्थान के **केवलादेव घाना राष्ट्रीय उद्यान** को एक साथ भारत के प्रथम रामसर स्थल के रूप में नामित किया गया था।" }]
      },

      /* ── 7. Montreux Record ── */
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "7. भारत में मोंट्रेक्स रिकॉर्ड (Montreux Record in India)" }],
      },
      {
        _type: "image",
        asset: { _type: "reference", _ref: assetMontreux._id },
        alt: "Montreux Record India Loktak Lake Keoladeo Wetland Conservation MPPSC UPSC Notes",
        caption: "मोंट्रेक्स रिकॉर्ड (Montreux Record): पारिस्थितिक क्षरण का सामना कर रहे संकटग्रस्त आर्द्रभूमि क्षेत्रों का रजिस्टर",
      },
      {
        _type: "block",
        style: "normal",
        children: [
          { _type: "span", text: "मोंट्रेक्स रिकॉर्ड रामसर सूची के तहत अंतरराष्ट्रीय महत्व के उन आर्द्रभूमि स्थलों का एक रजिस्टर (Register) है जहाँ तकनीकी विकास, प्रदूषण या मानवीय हस्तक्षेप के कारण " },
          { _type: "span", marks: ["strong"], text: "पारिस्थितिक चरित्र (Ecological Character) में परिवर्तन आ चुका है, आ रहा है या आने की संभावना है।" },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "वर्तमान में भारत के केवल **2 रामसर स्थल** मोंट्रेक्स रिकॉर्ड में दर्ज हैं:" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "1. **केवलादेव घाना राष्ट्रीय उद्यान (राजस्थान)**: वर्ष 1990 में शामिल। कारण: जल की कमी तथा आक्रामक वनस्पति (पसपालम डिस्टिचम घास) का अत्यधिक फैलाव।" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "2. **लोकटक झील (मणिपुर)**: वर्ष 1993 में शामिल। कारण: इथाई बैराज निर्माण के कारण फुमडी (Phumdis) का क्षरण, गाद जमना और प्रदूषण।" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **विशेष नोट (चिल्का झील का हटना)**: ओडिशा की **चिल्का झील** को वर्ष 1993 में मोंट्रेक्स रिकॉर्ड में डाला गया था, लेकिन चिल्का विकास प्राधिकरण (CDA) के सफल गाद सफाई व संरक्षण प्रयासों के कारण **वर्ष 2002 में इसे मोंट्रेक्स रिकॉर्ड से हटा दिया गया**। इसके लिए भारत को 'रामसर संरक्षण पुरस्कार' भी मिला था।" }]
      },

      /* ── 8. MPPSC & UPSC Exam Syllabus Interlinking ── */
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "8. MPPSC एवं UPSC परीक्षा हेतु महत्वपूर्ण दृष्टिकोण व पाठ्यक्रम जुड़ाव" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **MPPSC प्रारंभिक परीक्षा (Unit-7)**: रामसर स्थलों की संख्या (101), 101वाँ स्थल (ग्लाव झील, अरुणाचल), मध्य प्रदेश के 5 रामसर स्थल (भोज, साख्य सागर, सिरपुर, यशवंत सागर, तावा), सर्वाधिक स्थल वाला राज्य (तमिलनाडु), और मोंट्रेक्स रिकॉर्ड से सीधे वस्तुनिष्ठ प्रश्न पूछे जाते हैं।" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **MPPSC मुख्य परीक्षा (GS Paper-3, Unit-10/Environment)**: आर्द्रभूमि के पारिस्थितिकीय सेवाएँ (भूजल पुनर्भरण, बाढ़ नियंत्रण, कार्बन अवशोषण), रामसर सम्मेलन 1971 के मानदंड, तथा आर्द्रभूमि संरक्षण अधिनियम 2017 पर 7 व 10 अंकों के विश्लेषणात्मक प्रश्न पूछे जाते हैं।" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **UPSC Prelims & Mains (GS-3 Environment)**: मोंट्रेक्स रिकॉर्ड मानदंड, प्रवासी पक्षी फ्लाईवे (Central Asian Flyway), रामसर स्थलों का मानचित्र आधारित मिलान, और आर्द्रभूमियों का आर्थिक व पर्यावरणीय महत्व।" }]
      }
    ],

    /* ────────────── ENGLISH BODY ────────────── */
    bodyEn: [
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "1. Ramsar Sites in India 2026: Recent Developments & Overview" }],
      },
      {
        _type: "image",
        asset: { _type: "reference", _ref: assetCover._id },
        alt: "India Ramsar Sites 2026 Map Total 101 Wetlands MPPSC UPSC Notes",
        caption: "India Ramsar Sites 2026: Ecological Diversity, Biodiversity & Wetland Conservation",
      },
      {
        _type: "block",
        style: "normal",
        children: [
          { _type: "span", text: "In a historic milestone for wetland conservation in India, the total number of Ramsar Sites in the country has reached " },
          { _type: "span", marks: ["strong"], text: "101" },
          { _type: "span", text: ". According to the official announcement by the Ministry of Environment, Forest and Climate Change, on " },
          { _type: "span", marks: ["strong"], text: "August 3, 2026" },
          { _type: "span", text: ", the famous " },
          { _type: "span", marks: ["strong"], text: "Glaw Lake" },
          { _type: "span", text: " located in the Lohit district of Arunachal Pradesh was designated as the **101st Ramsar Site of India**. This is also Arunachal Pradesh's very first Ramsar Site." },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          { _type: "span", text: "Currently, India's 101 Ramsar Sites are spread across 28 states and Union Territories. The largest Ramsar Site in India is the " },
          { _type: "span", marks: ["strong"], text: "Sundarban Wetland (4,230 sq km)" },
          { _type: "span", text: " in West Bengal, while the smallest sites include " },
          { _type: "span", marks: ["strong"], text: "Renuka Lake (0.2 sq km)" },
          { _type: "span", text: " in Himachal Pradesh and " },
          { _type: "span", marks: ["strong"], text: "Vembannur Wetland Complex (0.2 sq km)" },
          { _type: "span", text: " in Tamil Nadu. India's oldest Ramsar Sites, designated in 1981, are **Chilika Lake** (Odisha) and **Keoladeo Ghana National Park** (Rajasthan)." },
        ],
      },

      /* ── 2. What is Ramsar Site & Criteria (EN) ── */
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "2. What is a Ramsar Site? Criteria under Ramsar Convention 1971" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          { _type: "span", text: "A Ramsar Site is an internationally recognized wetland designated under the " },
          { _type: "span", marks: ["strong"], text: "Ramsar Convention on Wetlands" },
          { _type: "span", text: ", signed on **February 2, 1971**, in Ramsar, Iran. India became a contracting party to the convention on February 1, 1982." },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "To be designated as a Ramsar Site, a wetland must fulfill at least one of the following 9 international criteria:" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **Criterion 1 (Representative/Unique)**: Contains a representative, rare, or unique example of a natural or near-natural wetland type." }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **Criterion 2 (Threatened Species)**: Supports vulnerable, endangered, or critically endangered species or threatened ecological communities." }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **Criterion 3 (Biodiversity Maintenance)**: Supports populations of plant and/or animal species important for maintaining regional biological diversity." }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **Criterion 4 (Critical Life Stages)**: Supports plant and/or animal species at a critical stage in their life cycles, or provides refuge during adverse conditions." }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **Criterion 5 (20,000+ Waterbirds)**: Regularly supports 20,000 or more waterbirds." }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **Criterion 6 (1% Waterbird Population)**: Regularly supports 1% of the individuals in a population of one species or subspecies of waterbird." }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **Criterion 7 (Fish Diversity)**: Supports a significant proportion of indigenous fish subspecies, species, or families, life-history stages, and interactions." }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **Criterion 8 (Fish Spawning/Nursery)**: Is an important source of food for fishes, spawning ground, nursery, and/or migration path." }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **Criterion 9 (1% Non-Avian Population)**: Regularly supports 1% of the individuals in a population of one species or subspecies of wetland-dependent non-avian animal species." }]
      },

      /* ── 3. 101st Ramsar Site: Glaw Lake (EN) ── */
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "3. India's 101st Ramsar Site: Glaw Lake (Arunachal Pradesh)" }],
      },
      {
        _type: "image",
        asset: { _type: "reference", _ref: assetGlaw._id },
        alt: "Glaw Lake Arunachal Pradesh 101st Ramsar Site India Wildlife Ecosystem",
        caption: "Glaw Lake, Arunachal Pradesh: India's 101st Ramsar Site (Designated on August 3, 2026)",
      },
      {
        _type: "block",
        style: "normal",
        children: [
          { _type: "span", text: "Notified by the Ministry of Environment on " },
          { _type: "span", marks: ["strong"], text: "August 3, 2026" },
          { _type: "span", text: ", " },
          { _type: "span", marks: ["strong"], text: "Glaw Lake" },
          { _type: "span", text: " is a pristine high-altitude freshwater lake situated inside the " },
          { _type: "span", marks: ["strong"], text: "Kamlang Wildlife Sanctuary" },
          { _type: "span", text: " in Wakro circle of Lohit district, Arunachal Pradesh." },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **Location & Altitude**: Situated at an elevation of ~1,200 meters above sea level, surrounded by dense subtropical evergreen rainforests and the Mishmi Hills." }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **Ecological Value**: Acts as the primary catchment water source for the Kamlang River (a major tributary of the Lohit River). Habitat for vulnerable species like Mishmi Takin, Musk Deer, Hornbills, and rare orchids." }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **Cultural Significance**: Revered as a sacred lake by the indigenous Mishmi tribe." }]
      },

      /* ── 4. Recently Added Sites 2025-2026 (EN) ── */
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "4. Recently Added Ramsar Sites in 2025 and 2026 (16 New Sites)" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "During 2025 and 2026, India added 16 new Ramsar Sites, bringing the total count to 101:" }]
      },
      {
        _type: "table",
        caption: "Recently Added Ramsar Sites in India (2025-2026 Additions)",
        headers: ["S.No", "Ramsar Site", "State / UT", "Year", "Ecological Importance"],
        rows: [
          ["1", "**Sakkarakottai Bird Sanctuary**", "Tamil Nadu", "2025", "Important irrigation tank ecosystem for migratory waterbirds."],
          ["2", "**Therthangal Bird Sanctuary**", "Tamil Nadu", "2025", "Community-protected irrigation tank and heronry."],
          ["3", "**Khecheopalri Wetland**", "Sikkim", "2025", "Sacred high-altitude lake in Demazong Valley revered by Hindus & Buddhists."],
          ["4", "**Udhwa Lake Bird Sanctuary**", "Jharkhand", "2025", "Oxbow lake along Ganges; habitat for Oriental White-Backed Vulture."],
          ["5", "**Khichan (Phalodi)**", "Rajasthan", "2025", "Thar Desert wetland famous for wintering Demoiselle Cranes (Kurja)."],
          ["6", "**Menar Wetland Complex**", "Rajasthan", "2025", "Udaipur's 'Bird Village'; monsoon-fed freshwater bird sanctuary."],
          ["7", "**Gokul Jalashay**", "Bihar", "2025", "Oxbow lake in Buxar along the Ganges; fisheries and waterfowl habitat."],
          ["8", "**Udaipur Jheel**", "Bihar", "2025", "Rich oxbow lake in West Champaran with 280+ plant species."],
          ["9", "**Gogabeel Lake**", "Bihar", "2025", "Katihar district oxbow lake at Mahananda-Ganges confluence."],
          ["10", "**Siliserh Lake**", "Rajasthan", "2025", "Historic freshwater lake in Alwar nestled in Aravalli hills."],
          ["11", "**Kopra Jalashay**", "Chhattisgarh", "2025", "Rich aquatic ecosystem and waterfowl shelter in Bilaspur."],
          ["12", "**Patna Bird Sanctuary**", "Uttar Pradesh", "2026", "Seasonal freshwater marshland in Etah district for migratory birds."],
          ["13", "**Chhari-Dhand Wetland**", "Gujarat (Kutch)", "2026", "Seasonal brackish-freshwater wetland in Rann of Kutch for Flamingos."],
          ["14", "**Shekha Jheel Bird Sanctuary**", "Uttar Pradesh", "2026", "Freshwater wetland near Upper Ganges Canal in Aligarh."],
          ["15", "**Jai Prakash Narayan (Surha Tal)**", "Uttar Pradesh", "2026", "Massive oxbow lake on Ganges in Ballia district (100th Ramsar Site)."],
          ["16", "**Glaw Lake**", "Arunachal Pradesh", "2026", "High-altitude lake in Kamlang WLS, Lohit (101st Ramsar Site - 3 Aug 2026)."]
        ]
      },

      /* ── 5. Statewise Complete List (EN) ── */
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "5. Complete State-wise List of Ramsar Sites in India 2026 (101 Sites)" }],
      },
      {
        _type: "table",
        caption: "State-wise List of 101 Ramsar Sites in India (2026)",
        headers: ["S.No", "Ramsar Site Name", "State / UT", "Designated Year", "Area (sq km)"],
        rows: [
          ["1", "Kolleru Lake", "Andhra Pradesh", "2002", "901"],
          ["2", "Deepor Beel", "Assam", "2002", "40"],
          ["3", "Kanwar (Kabar) Taal", "Bihar", "2020", "26.2"],
          ["4", "Nagi Bird Sanctuary", "Bihar", "2023", "2.0"],
          ["5", "Nakti Bird Sanctuary", "Bihar", "2023", "3.3"],
          ["6", "Gokul Jalashay", "Bihar", "2025", "–"],
          ["7", "Udaipur Jheel", "Bihar", "2025", "–"],
          ["8", "Gogabeel Lake", "Bihar", "2025", "–"],
          ["9", "Nanda Lake", "Goa", "2022", "0.42"],
          ["10", "Khijadia WLS", "Gujarat", "2021", "6.0"],
          ["11", "Nalsarovar BS", "Gujarat", "2012", "123.0"],
          ["12", "Thol Lake", "Gujarat", "2021", "6.99"],
          ["13", "Wadhvana Wetland", "Gujarat", "2021", "10.38"],
          ["14", "Chhari-Dhand (Kutch)", "Gujarat", "2026", "–"],
          ["15", "Bhindawas WLS", "Haryana", "2021", "4.11"],
          ["16", "Sultanpur National Park", "Haryana", "2021", "142.5"],
          ["17", "Chandra Taal", "Himachal Pradesh", "2005", "0.49"],
          ["18", "Pong Dam Lake", "Himachal Pradesh", "2002", "156.62"],
          ["19", "Renuka Lake", "Himachal Pradesh", "2005", "0.20"],
          ["20", "Ranganathittu BS", "Karnataka", "2022", "5.18"],
          ["21", "Magadi Kere Conservation Reserve", "Karnataka", "2024", "0.50"],
          ["22", "Ankasamudra Bird Conservation Reserve", "Karnataka", "2024", "0.98"],
          ["23", "Aghanashini Estuary", "Karnataka", "2024", "4.80"],
          ["24", "Ashtamudi Wetland", "Kerala", "2002", "614.0"],
          ["25", "Sasthamkotta Lake", "Kerala", "2002", "3.73"],
          ["26", "Vembanad-Kol Wetland", "Kerala", "2002", "1512.5"],
          ["27", "Bhoj Wetland", "Madhya Pradesh", "2002", "32.0"],
          ["28", "Sakhya Sagar", "Madhya Pradesh", "2022", "2.48"],
          ["29", "Sirpur Wetland", "Madhya Pradesh", "2022", "1.61"],
          ["30", "Yashwant Sagar", "Madhya Pradesh", "2022", "8.22"],
          ["31", "Tawa Reservoir", "Madhya Pradesh", "2024", "200.0"],
          ["32", "Lonar Lake", "Maharashtra", "2020", "4.27"],
          ["33", "Nandur Madhameshwar", "Maharashtra", "2019", "14.0"],
          ["34", "Thane Creek", "Maharashtra", "2022", "65.21"],
          ["35", "Loktak Lake", "Manipur", "1990", "266.0"],
          ["36", "Pala Wetland", "Mizoram", "2021", "18.5"],
          ["37", "Ansupa Lake", "Odisha", "2021", "2.31"],
          ["38", "Bhitarkanika Mangroves", "Odisha", "2002", "650.0"],
          ["39", "Chilika Lake", "Odisha", "1981", "1165.0"],
          ["40", "Hirakud Reservoir", "Odisha", "2021", "654.0"],
          ["41", "Satkosia Gorge", "Odisha", "2021", "981.97"],
          ["42", "Tampara Lake", "Odisha", "2021", "3.0"],
          ["43", "Beas Conservation Reserve", "Punjab", "2019", "64.0"],
          ["44", "Harike Wetland", "Punjab", "1990", "41.0"],
          ["45", "Kanjli Wetland", "Punjab", "2002", "1.83"],
          ["46", "Keshopur-Miani Community Reserve", "Punjab", "2019", "34.0"],
          ["47", "Nangal WLS", "Punjab", "2019", "1.0"],
          ["48", "Ropar Wetland", "Punjab", "2002", "13.65"],
          ["49", "Keoladeo Ghana National Park", "Rajasthan", "1981", "28.73"],
          ["50", "Sambhar Lake", "Rajasthan", "1990", "240.0"],
          ["51", "Khichan (Phalodi)", "Rajasthan", "2025", "–"],
          ["52", "Menar Wetland Complex", "Rajasthan", "2025", "–"],
          ["53", "Siliserh Lake", "Rajasthan", "2025", "–"],
          ["54", "Chitrangudi BS", "Tamil Nadu", "2021", "2.6"],
          ["55", "Gulf of Mannar Marine BR", "Tamil Nadu", "2022", "526.72"],
          ["56", "Kanjirankulam BS", "Tamil Nadu", "2022", "0.96"],
          ["57", "Karikili BS", "Tamil Nadu", "2022", "0.584"],
          ["58", "Koonthankulam BS", "Tamil Nadu", "2021", "0.72"],
          ["59", "Pallikaranai Marsh RF", "Tamil Nadu", "2022", "12.475"],
          ["60", "Pichavaram Mangrove", "Tamil Nadu", "2022", "14.786"],
          ["61", "Point Calimere WLS & BS", "Tamil Nadu", "2002", "389.0"],
          ["62", "Suchindram Theroor Wetland Complex", "Tamil Nadu", "2022", "0.94"],
          ["63", "Udayamarthandapuram BS", "Tamil Nadu", "2022", "0.44"],
          ["64", "Vaduvoor BS", "Tamil Nadu", "2022", "1.12"],
          ["65", "Vedanthangal BS", "Tamil Nadu", "2022", "0.40"],
          ["66", "Vellode BS", "Tamil Nadu", "2022", "0.77"],
          ["67", "Vembannur Wetland Complex", "Tamil Nadu", "2022", "0.20"],
          ["68", "Karaivetti BS", "Tamil Nadu", "2024", "4.5"],
          ["69", "Longwood Shola RF", "Tamil Nadu", "2024", "1.16"],
          ["70", "Nanjarayan BS", "Tamil Nadu", "2024", "1.3"],
          ["71", "Kazhuveli BS", "Tamil Nadu", "2024", "1513.0"],
          ["72", "Sakkarakottai BS", "Tamil Nadu", "2025", "–"],
          ["73", "Therthangal BS", "Tamil Nadu", "2025", "–"],
          ["74", "Rudrasagar Lake", "Tripura", "2005", "2.4"],
          ["75", "Hokera Wetland", "UT of J&K", "2005", "13.75"],
          ["76", "Hygam Wetland CR", "UT of J&K", "2022", "8.02"],
          ["77", "Shallbugh Wetland CR", "UT of J&K", "2022", "16.75"],
          ["78", "Surinsar-Mansar Lakes", "UT of J&K", "2005", "3.5"],
          ["79", "Wular Lake", "UT of J&K", "1990", "189.0"],
          ["80", "Tso Kar Wetland Complex", "UT of Ladakh", "2020", "95.77"],
          ["81", "Tsomoriri", "UT of Ladakh", "2002", "120.0"],
          ["82", "Bakhira WLS", "Uttar Pradesh", "2021", "28.94"],
          ["83", "Haiderpur Wetland", "Uttar Pradesh", "2021", "69.0"],
          ["84", "Nawabganj BS", "Uttar Pradesh", "2019", "2.0"],
          ["85", "Parvati Arga BS", "Uttar Pradesh", "2019", "7.0"],
          ["86", "Saman BS", "Uttar Pradesh", "2019", "5.0"],
          ["87", "Samaspur BS", "Uttar Pradesh", "2019", "8.0"],
          ["88", "Sandi BS", "Uttar Pradesh", "2019", "3.0"],
          ["89", "Sarsai Nawar Jheel", "Uttar Pradesh", "2019", "2.0"],
          ["90", "Sur Sarovar (Keetham Lake)", "Uttar Pradesh", "2020", "4.31"],
          ["91", "Upper Ganga River", "Uttar Pradesh", "2005", "265.9"],
          ["92", "Patna Bird Sanctuary", "Uttar Pradesh", "2026", "–"],
          ["93", "Shekha Jheel Bird Sanctuary", "Uttar Pradesh", "2026", "–"],
          ["94", "Jai Prakash Narayan (Surha Tal)", "Uttar Pradesh", "2026", "–"],
          ["95", "Asan Barrage", "Uttarakhand", "2020", "4.44"],
          ["96", "East Kolkata Wetlands", "West Bengal", "2002", "125.0"],
          ["97", "Sundarban Wetland", "West Bengal", "2019", "4230.0"],
          ["98", "Khecheopalri Wetland", "Sikkim", "2025", "–"],
          ["99", "Udhwa Lake Sanctuary", "Jharkhand", "2025", "–"],
          ["100", "Kopra Jalashay", "Chhattisgarh", "2025", "–"],
          ["101", "Glaw Lake", "Arunachal Pradesh", "2026", "–"]
        ]
      },

      /* ── 6. Comparative Facts (EN) ── */
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "6. Major Comparative Facts of Indian Ramsar Sites" }],
      },
      {
        _type: "image",
        asset: { _type: "reference", _ref: assetSundarban._id },
        alt: "Sundarban Wetland West Bengal Largest Ramsar Site India Bengal Tiger Mangroves",
        caption: "Sundarban Wetland (West Bengal): India's Largest Ramsar Site (4,230 sq km)",
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **State with Highest Sites**: **Tamil Nadu ranks 1st with 18 sites**, followed by **Uttar Pradesh with 13 sites**." }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **Largest Ramsar Site**: **Sundarban Wetland (West Bengal) - 4,230 sq km**, followed by Kazhuveli Bird Sanctuary (1,513 sq km) and Vembanad-Kol (1,512.5 sq km)." }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **Smallest Ramsar Sites**: **Renuka Lake (Himachal Pradesh - 0.2 sq km)** and **Vembannur Wetland Complex (Tamil Nadu - 0.2 sq km)**." }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **First Ramsar Sites**: Designated in **1981**, **Chilika Lake (Odisha)** and **Keoladeo Ghana National Park (Rajasthan)** were India's first Ramsar sites." }]
      },

      /* ── 7. Montreux Record (EN) ── */
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "7. Montreux Record in India" }],
      },
      {
        _type: "image",
        asset: { _type: "reference", _ref: assetMontreux._id },
        alt: "Montreux Record India Loktak Lake Keoladeo Wetland Conservation MPPSC UPSC Notes",
        caption: "Montreux Record: Register of Ramsar wetlands facing severe ecological changes",
      },
      {
        _type: "block",
        style: "normal",
        children: [
          { _type: "span", text: "The Montreux Record is a register of Ramsar sites where changes in ecological character have occurred, are occurring, or are likely to occur as a result of technological developments, pollution or other human interference." }
        ]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "Currently, **2 Ramsar Sites in India** are listed under the Montreux Record:" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "1. **Keoladeo Ghana National Park (Rajasthan)**: Listed in 1990 due to water shortage and unchecked grazing by cattle." }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "2. **Loktak Lake (Manipur)**: Listed in 1993 due to deforestation in catchment area, siltation, and ecological disruption from Ithai Barrage." }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **Special Note (Chilika Lake Removal)**: Chilika Lake was placed in the Montreux Record in 1993 but was **removed in 2002** after successful restoration by the Chilika Development Authority (CDA). It was awarded the Ramsar Wetland Conservation Award." }]
      },

      /* ── 8. MPPSC & UPSC Exam Syllabus (EN) ── */
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "8. Syllabus Interlinking & Strategic Importance for MPPSC & UPSC" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **MPPSC Prelims (Unit-7 Science & Environment)**: Key facts on 101 total sites, 101st site Glaw Lake, MP's 5 sites (Bhoj, Sakhya Sagar, Sirpur, Yashwant Sagar, Tawa), and Montreux record." }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **MPPSC Mains (GS Paper-3 Environment)**: Analytical questions on wetland ecological services, groundwater recharge, Ramsar 1971 criteria, and Wetland Conservation Rules 2017." }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **UPSC Prelims & Mains (GS-3)**: Map-based matching of wetlands, migratory flyways (Central Asian Flyway), and Montreux record criteria." }]
      }
    ],

    /* ────────────── COLLAPSIBLE FAQS (HINDI & ENGLISH) ────────────── */
    faqs: [
      {
        question: "3 अगस्त 2026 को घोषित भारत का 101वाँ रामसर स्थल कौन सा है?",
        questionEn: "Which site was declared as India's 101st Ramsar Site on August 3, 2026?",
        answer: "3 अगस्त 2026 को अरुणाचल प्रदेश के लोहित जिले स्थित 'ग्लाव झील' (Glaw Lake) को भारत का 101वाँ रामसर स्थल घोषित किया गया। यह अरुणाचल प्रदेश का पहला रामसर स्थल भी है।",
        answerEn: "On August 3, 2026, Glaw Lake located in Lohit district of Arunachal Pradesh was designated as India's 101st Ramsar Site. It is also the first Ramsar Site in Arunachal Pradesh."
      },
      {
        question: "भारत में वर्तमान में कुल कितने रामसर स्थल हैं (2026 तक)?",
        questionEn: "How many total Ramsar Sites are currently present in India (as of 2026)?",
        answer: "3 अगस्त 2026 तक भारत में 28 राज्यों और केंद्र शासित प्रदेशों में फैले कुल 101 रामसर स्थल मौजूद हैं।",
        answerEn: "As of August 3, 2026, India has a total of 101 Ramsar Sites spread across 28 states and Union Territories."
      },
      {
        question: "भारत में सबसे अधिक रामसर स्थल किस राज्य में स्थित हैं?",
        questionEn: "Which Indian state has the highest number of Ramsar Sites?",
        answer: "भारत में सर्वाधिक रामसर स्थल तमिलनाडु राज्य में (18 स्थल) स्थित हैं। इसके बाद उत्तर प्रदेश (13 स्थल) द्वितीय स्थान पर आता है।",
        answerEn: "Tamil Nadu holds the first position with the highest number of Ramsar Sites in India (18 sites), followed by Uttar Pradesh in second place (13 sites)."
      },
      {
        question: "भारत का सबसे बड़ा और सबसे छोटा रामसर स्थल कौन सा है?",
        questionEn: "Which are the largest and smallest Ramsar Sites in India?",
        answer: "भारत का सबसे बड़ा रामसर स्थल पश्चिम बंगाल का 'सुंदरबन आर्द्रभूमि' (4,230 वर्ग किमी) है। सबसे छोटे रामसर स्थलों में हिमाचल प्रदेश की 'रेणुका झील' (0.2 वर्ग किमी) तथा तमिलनाडु का 'वेम्बन्नूर आर्द्रभूमि परिसर' (0.2 वर्ग किमी) शामिल हैं।",
        answerEn: "The largest Ramsar Site in India is the Sundarban Wetland in West Bengal (4,230 sq km). The smallest Ramsar Sites are Renuka Lake in Himachal Pradesh (0.2 sq km) and Vembannur Wetland Complex in Tamil Nadu (0.2 sq km)."
      },
      {
        question: "भारत में मोंट्रेक्स रिकॉर्ड (Montreux Record) में कौन-कौन से स्थल शामिल हैं?",
        questionEn: "Which Indian Ramsar sites are currently listed in the Montreux Record?",
        answer: "वर्तमान में भारत के 2 स्थल मोंट्रेक्स रिकॉर्ड में दर्ज हैं: 1. केवलादेव घाना राष्ट्रीय उद्यान (राजस्थान - 1990) तथा 2. लोकटक झील (मणिपुर - 1993)। चिल्का झील को 2002 में इस सूची से सफलतापूर्वक हटा दिया गया था।",
        answerEn: "Currently, 2 Ramsar sites in India are listed under the Montreux Record: 1. Keoladeo Ghana National Park (Rajasthan - 1990) and 2. Loktak Lake (Manipur - 1993). Chilika Lake was removed from the list in 2002 following successful restoration."
      },
      {
        question: "मध्य प्रदेश में कुल कितने रामसर स्थल हैं?",
        questionEn: "How many Ramsar Sites are located in Madhya Pradesh?",
        answer: "मध्य प्रदेश में कुल 5 रामसर स्थल स्थित हैं: 1. भोज आर्द्रभूमि (भोपाल - 2002), 2. साख्य सागर (शिवपुरी - 2022), 3. सिरपुर आर्द्रभूमि (इंदौर - 2022), 4. यशवंत सागर (इंदौर - 2022), और 5. तावा जलाशय (नर्मदापुरम - 2024)।",
        answerEn: "Madhya Pradesh has 5 Ramsar Sites: 1. Bhoj Wetland (Bhopal - 2002), 2. Sakhya Sagar (Shivpuri - 2022), 3. Sirpur Wetland (Indore - 2022), 4. Yashwant Sagar (Indore - 2022), and 5. Tawa Reservoir (Narmadapuram - 2024)."
      }
    ],

    /* ────────────── EXACTLY 8 MCQS (HINDI & ENGLISH) ────────────── */
    mcqs: [
      {
        question: "3 अगस्त 2026 को घोषित भारत का 101वाँ रामसर स्थल 'ग्लाव झील' (Glaw Lake) किस राज्य/केंद्र शासित प्रदेश में स्थित है?",
        questionEn: "In which State/UT is 'Glaw Lake', declared as India's 101st Ramsar Site on August 3, 2026, located?",
        options: ["सिक्किम", "अरुणाचल प्रदेश", "असम", "मणिपुर"],
        optionsEn: ["Sikkim", "Arunachal Pradesh", "Assam", "Manipur"],
        correctIndex: 1,
        explanation: "केंद्र सरकार ने 3 अगस्त 2026 को अरुणाचल प्रदेश के लोहित जिले में स्थित 'ग्लाव झील' (Glaw Lake) को भारत का 101वाँ रामसर स्थल घोषित किया है। यह कमलांग वन्यजीव अभयारण्य के भीतर स्थित अरुणाचल प्रदेश का पहला रामसर स्थल है।",
        explanationEn: "On August 3, 2026, the Union Government designated Glaw Lake in Lohit district of Arunachal Pradesh as India's 101st Ramsar Site. Located inside Kamlang WLS, it is the state's first Ramsar site."
      },
      {
        question: "भारत में अगस्त 2026 तक रामसर स्थलों की कुल संख्या बढ़कर कितनी हो गई है?",
        questionEn: "What is the total number of Ramsar Sites in India as of August 2026?",
        options: ["80", "85", "100", "101"],
        optionsEn: ["80", "85", "100", "101"],
        correctIndex: 3,
        explanation: "अरुणाचल प्रदेश की ग्लाव झील को शामिल करने के बाद भारत में कुल रामसर स्थलों की संख्या बढ़कर 101 हो गई है, जो 28 राज्यों और केंद्र शासित प्रदेशों में फैले हुए हैं।",
        explanationEn: "With the addition of Glaw Lake in Arunachal Pradesh, the total number of Ramsar Sites in India has reached 101 across 28 states and UTs."
      },
      {
        question: "भारत में सर्वाधिक रामसर स्थलों वाला राज्य कौन सा है?",
        questionEn: "Which state holds the highest number of Ramsar Sites in India?",
        options: ["उत्तर प्रदेश (13)", "तमिलनाडु (18)", "केरल (10)", "ओडिशा (8)"],
        optionsEn: ["Uttar Pradesh (13)", "Tamil Nadu (18)", "Kerala (10)", "Odisha (8)"],
        correctIndex: 1,
        explanation: "तमिलनाडु 18 रामसर स्थलों के साथ भारत में प्रथम स्थान पर है, जबकि उत्तर प्रदेश 13 स्थलों के साथ दूसरे स्थान पर है।",
        explanationEn: "Tamil Nadu ranks first in India with 18 Ramsar Sites, followed by Uttar Pradesh with 13 sites."
      },
      {
        question: "क्षेत्रफल की दृष्टि से भारत का सबसे बड़ा रामसर स्थल कौन सा है?",
        questionEn: "Which is the largest Ramsar Site in India by surface area?",
        options: ["चिल्का झील (ओडिशा)", "सुंदरबन आर्द्रभूमि (पश्चिम बंगाल)", "वेम्बनाड-कोल (केरल)", "काझुवेली (तमिलनाडु)"],
        optionsEn: ["Chilika Lake (Odisha)", "Sundarban Wetland (West Bengal)", "Vembanad-Kol (Kerala)", "Kazhuveli (Tamil Nadu)"],
        correctIndex: 1,
        explanation: "पश्चिम बंगाल में स्थित सुंदरबन आर्द्रभूमि 4,230 वर्ग किमी क्षेत्रफल के साथ भारत का सबसे बड़ा रामसर स्थल है।",
        explanationEn: "Sundarban Wetland in West Bengal, spanning 4,230 sq km, is the largest Ramsar Site in India."
      },
      {
        question: "वर्तमान में भारत के कौन से दो रामसर स्थल 'मोंट्रेक्स रिकॉर्ड' (Montreux Record) में शामिल हैं?",
        questionEn: "Which two Indian Ramsar sites are currently listed under the 'Montreux Record'?",
        options: [
          "चिल्का झील एवं लोकटक झील",
          "केवलादेव घाना राष्ट्रीय उद्यान एवं लोकटक झील",
          "सुंदरबन एवं भोज आर्द्रभूमि",
          "वुलर झील एवं दीपोर बील"
        ],
        optionsEn: [
          "Chilika Lake & Loktak Lake",
          "Keoladeo Ghana National Park & Loktak Lake",
          "Sundarban & Bhoj Wetland",
          "Wular Lake & Deepor Beel"
        ],
        correctIndex: 1,
        explanation: "केवलादेव घाना राष्ट्रीय उद्यान (राजस्थान - 1990 में शामिल) और लोकटक झील (मणिपुर - 1993 में शामिल) वर्तमान में मोंट्रेक्स रिकॉर्ड में दर्ज हैं। चिल्का झील को 2002 में मोंट्रेक्स रिकॉर्ड से हटा दिया गया था।",
        explanationEn: "Keoladeo Ghana National Park (Rajasthan - listed 1990) and Loktak Lake (Manipur - listed 1993) are currently under the Montreux Record. Chilika Lake was removed in 2002."
      },
      {
        question: "निम्नलिखित में से मध्य प्रदेश का कौन सा स्थल रामसर सूची में शामिल नहीं है?",
        questionEn: "Which of the following sites in Madhya Pradesh is NOT listed as a Ramsar Site?",
        options: ["भोज आर्द्रभूमि (Bhoj Wetland)", "सिरपुर आर्द्रभूमि (Sirpur Wetland)", "तावा जलाशय (Tawa Reservoir)", "गांधी सागर जलाशय (Gandhi Sagar Reservoir)"],
        optionsEn: ["Bhoj Wetland", "Sirpur Wetland", "Tawa Reservoir", "Gandhi Sagar Reservoir"],
        correctIndex: 3,
        explanation: "मध्य प्रदेश के 5 रामसर स्थल हैं: भोज आर्द्रभूमि, साख्य सागर, सिरपुर आर्द्रभूमि, यशवंत सागर और तावा जलाशय। गांधी सागर जलाशय रामसर स्थल नहीं है।",
        explanationEn: "MP's 5 Ramsar sites are Bhoj Wetland, Sakhya Sagar, Sirpur Wetland, Yashwant Sagar, and Tawa Reservoir. Gandhi Sagar is not a Ramsar site."
      },
      {
        question: "वर्ष 1981 में नामित भारत के प्रथम रामसर स्थल कौन से थे?",
        questionEn: "Which were the first Ramsar Sites designated in India in the year 1981?",
        options: ["सुंदरबन एवं वुलर झील", "चिल्का झील एवं केवलादेव घाना राष्ट्रीय उद्यान", "लोकटक झील एवं दीपोर बील", "भोज आर्द्रभूमि एवं हरिके आर्द्रभूमि"],
        optionsEn: ["Sundarban & Wular Lake", "Chilika Lake & Keoladeo Ghana National Park", "Loktak Lake & Deepor Beel", "Bhoj Wetland & Harike Wetland"],
        correctIndex: 1,
        explanation: "वर्ष 1981 में ओडिशा की चिल्का झील और राजस्थान के केवलादेव घाना राष्ट्रीय उद्यान को एक साथ भारत के प्रथम रामसर स्थल घोषित किया गया था।",
        explanationEn: "In 1981, Chilika Lake (Odisha) and Keoladeo Ghana National Park (Rajasthan) were jointly designated as India's first Ramsar sites."
      },
      {
        question: "रामसर सम्मेलन (Ramsar Convention) किस वर्ष अपनाया गया था तथा भारत किस वर्ष इसका हस्ताक्षरकर्ता बना?",
        questionEn: "In which year was the Ramsar Convention adopted, and when did India become a contracting party?",
        options: ["1971 में अपनाया गया, भारत 1982 में शामिल हुआ", "1972 में अपनाया गया, भारत 1985 में शामिल हुआ", "1981 में अपनाया गया, भारत 1990 में शामिल हुआ", "1969 में अपनाया गया, भारत 1980 में शामिल हुआ"],
        optionsEn: ["Adopted in 1971, India joined in 1982", "Adopted in 1972, India joined in 1985", "Adopted in 1981, India joined in 1990", "Adopted in 1969, India joined in 1980"],
        correctIndex: 0,
        explanation: "रामसर सम्मेलन 2 फरवरी 1971 को ईरान के रामसर शहर में अपनाया गया था। भारत 1 फरवरी 1982 को इस सम्मेलन का हस्ताक्षरकर्ता सदस्य बना।",
        explanationEn: "The Ramsar Convention was adopted on 2 February 1971 in Ramsar, Iran. India became a contracting party on 1 February 1982."
      }
    ],

    sources: [
      { label: "Ministry of Environment, Forest and Climate Change (MoEFCC)", url: "https://moef.gov.in" },
      { label: "Ramsar Convention Official Secretariat", url: "https://www.ramsar.org" },
      { label: "Vajiram & Ravi Current Affairs", url: "https://vajiramandravi.com/current-affairs/ramsar-sites-in-india/" }
    ]
  };

  console.log("📝 Creating/Updating Document in Sanity CMS ID:", docId);
  await client.createOrReplace(articleDoc);
  console.log("✅ SUCCESS! Ramsar Sites in India 2026 Article successfully published to Sanity CMS!");
}

main().catch((err) => {
  console.error("❌ Error uploading to Sanity CMS:", err);
  process.exit(1);
});
