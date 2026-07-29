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
  console.log("🚀 Uploading Complete Global Forest Goals Report 2026 Article to Sanity CMS...");

  const publicBlogDir = path.resolve(process.cwd(), "public/images/blog");
  const artifactDir = "/Users/aakariastech/.gemini/antigravity-ide/brain/46ddf059-c542-4af1-8a30-e0605b309cce";

  if (!fs.existsSync(publicBlogDir)) fs.mkdirSync(publicBlogDir, { recursive: true });

  const destCover = path.join(publicBlogDir, "global_forest_goals_report_2026_unff_deforestation.png");
  const destEnergy = path.join(publicBlogDir, "energy_poverty_fuelwood_charcoal_dependence.png");
  const destSdg = path.join(publicBlogDir, "india_sdg_index_2026_sustainable_development_goals.png");
  const destCampa = path.join(publicBlogDir, "india_green_mission_campa_afforestation_initiatives.png");

  const srcCover = path.join(artifactDir, "global_forest_goals_report_2026_unff_deforestation_conservation_1785333997425.png");
  const srcEnergy = path.join(artifactDir, "energy_poverty_fuelwood_charcoal_dependence_developing_nations_1785334016056.png");
  const srcSdg = path.join(artifactDir, "india_sdg_index_2026_sustainable_development_goals_94th_rank_1785334036385.png");
  const srcCampa = path.join(artifactDir, "india_green_mission_campa_afforestation_initiatives_2026_1785334054277.png");

  if (fs.existsSync(srcCover)) fs.copyFileSync(srcCover, destCover);
  if (fs.existsSync(srcEnergy)) fs.copyFileSync(srcEnergy, destEnergy);
  if (fs.existsSync(srcSdg)) fs.copyFileSync(srcSdg, destSdg);
  if (fs.existsSync(srcCampa)) fs.copyFileSync(srcCampa, destCampa);

  console.log("📸 Uploading 4 real images to Sanity CMS...");
  const assetCover = await client.assets.upload("image", fs.createReadStream(destCover), {
    filename: "global_forest_goals_report_2026_unff_deforestation.png",
  });
  const assetEnergy = await client.assets.upload("image", fs.createReadStream(destEnergy), {
    filename: "energy_poverty_fuelwood_charcoal_dependence.png",
  });
  const assetSdg = await client.assets.upload("image", fs.createReadStream(destSdg), {
    filename: "india_sdg_index_2026_sustainable_development_goals.png",
  });
  const assetCampa = await client.assets.upload("image", fs.createReadStream(destCampa), {
    filename: "india_green_mission_campa_afforestation_initiatives.png",
  });

  const docId = "ca-global-forest-goals-report-2026";
  const slug = "global-forest-goals-report-2026-sdg-india-rank-mppsc-upsc-notes";

  const articleDoc = {
    _id: docId,
    _type: "currentAffairs",
    title: "वैश्विक वन लक्ष्य रिपोर्ट 2026 एवं सतत विकास रिपोर्ट 2026: संयुक्त राष्ट्र UNFF GFG आंकड़े, भारत SDG 94वाँ स्थान, ऊर्जा गरीबी व पहल | MPPSC & UPSC Notes",
    titleEn: "Global Forest Goals Report 2026 & Sustainable Development Report 2026: UNFF Data, India SDG Rank 94th & Initiatives | MPPSC & UPSC Notes",
    slug: { _type: "slug", current: slug },
    category: { _type: "reference", _ref: "cat-misc" },
    ca_date: "2026-07-29",
    publishedAt: new Date().toISOString(),
    featured: true,
    readingTime: 16,
    tags: [
      { _type: "reference", _ref: "tag-mppsc" },
      { _type: "reference", _ref: "tag-upsc" },
      { _type: "reference", _ref: "tag-prelims" },
      { _type: "reference", _ref: "tag-mains" },
    ],
    excerpt: "संयुक्त राष्ट्र UNFF द्वारा जारी 'वैश्विक वन लक्ष्य रिपोर्ट 2026' (Global Forest Goals Report 2026) व UN SDSN 'सतत विकास रिपोर्ट 2026': 2015-2025 में 4 करोड़ हेक्टेयर वन क्षेत्र की कमी, ऊर्जा गरीबी, ईंधन लकड़ी प्रभाव, भारत SDG रैंक 94वीं (68.3 स्कोर), हरित भारत मिशन, CAMPA व 8 अभ्यास प्रश्न। MPPSC & UPSC सम्पूर्ण परीक्षा नोट्स।",
    excerptEn: "Detailed analysis of UNFF Global Forest Goals Report 2026 & UN SDSN Sustainable Development Report 2026: 40 million hectares forest loss, energy poverty, India SDG 94th rank (68.3 score), Green India Mission, CAMPA Act & 8 MCQs for MPPSC & UPSC.",
    seoTitle: "वैश्विक वन लक्ष्य रिपोर्ट 2026 | Global Forest Goals Report & SDG 2026 | MPPSC & UPSC Notes",
    seoDescription: "वैश्विक वन लक्ष्य रिपोर्ट 2026 (Global Forest Goals Report 2026) व सतत विकास रिपोर्ट 2026: UNFF आंकड़े, 4 करोड़ हे. वन क्षरण, ऊर्जा गरीबी, भारत SDG 94वाँ स्थान, हरित भारत मिशन, CAMPA व 8 MCQs। MPPSC & UPSC परीक्षा नोट्स।",
    keywords: [
      "वैश्विक वन लक्ष्य रिपोर्ट 2026",
      "Global Forest Goals Report 2026",
      "सतत विकास रिपोर्ट 2026",
      "Sustainable Development Report 2026",
      "UNFF GFG 2026",
      "Global Forest Goals Report 2026 MPPSC",
      "Global Forest Goals Report 2026 UPSC",
      "SDG India Index 2026",
      "भारत SDG 94वां स्थान 2026",
      "UNDESA UNFF 2026",
      "ऊर्जा गरीबी और वन संकट",
      "CAMPA Act 2016",
      "हरित भारत मिशन",
      "MPPSC Notes",
      "UPSC Notes"
    ],
    featuredImage: {
      _type: "image",
      asset: { _type: "reference", _ref: assetCover._id },
      alt: "UNFF Global Forest Goals Report 2026 Deforestation Conservation MPPSC UPSC Notes",
    },

    /* ────────────── HINDI BODY ────────────── */
    body: [
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "1. वैश्विक वन लक्ष्य रिपोर्ट 2026: चर्चा में क्यों?" }],
      },
      {
        _type: "image",
        asset: { _type: "reference", _ref: assetCover._id },
        alt: "UNFF Global Forest Goals Report 2026 Deforestation Conservation MPPSC UPSC Notes",
        caption: "वैश्विक वन लक्ष्य रिपोर्ट 2026 (Global Forest Goals Report 2026): वनों का क्षरण, संरक्षण व सतत विकास",
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "हाल ही में संयुक्त राष्ट्र द्वारा जारी ",
          },
          {
            _type: "span",
            marks: ["strong"],
            text: "ग्लोबल फॉरेस्ट गोल्स रिपोर्ट 2026 (Global Forest Goals Report 2026)",
          },
          {
            _type: "span",
            text: " ने विश्व को वनों की बिगड़ती स्थिति के प्रति आगाह किया है। रिपोर्ट के अनुसार वर्ष 2015 से 2025 के बीच वैश्विक वन क्षेत्र में लगभग **4 करोड़ हेक्टेयर (40 मिलियन हेक्टेयर)** की कमी दर्ज की गई है। रिपोर्ट का सबसे महत्वपूर्ण निष्कर्ष यह है कि कृषि विस्तार के अतिरिक्त अब ईंधन लकड़ी (Fuelwood) और चारकोल की बढ़ती मांग भी वन क्षरण का प्रमुख कारण बनती जा रही है, विशेषकर अफ्रीका और एशिया के विकासशील क्षेत्रों में।",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "यह निष्कर्ष ऐसे समय में सामने आया है जब विश्व जलवायु परिवर्तन, जैव विविधता संरक्षण और सतत विकास लक्ष्यों (SDGs) की प्राप्ति के लिए वनों को सबसे महत्वपूर्ण प्राकृतिक संसाधनों में से एक मान रहा है। भारत सहित विश्व के अधिकांश देशों के लिए यह रिपोर्ट केवल पर्यावरणीय चिंता नहीं बल्कि विकास, ऊर्जा सुरक्षा, खाद्य सुरक्षा और सामाजिक न्याय से जुड़ा एक व्यापक नीति दस्तावेज है।" }]
      },

      /* ── 2. Report Introduction ── */
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "2. ग्लोबल फॉरेस्ट गोल्स रिपोर्ट 2026 का परिचय व ढाँचा" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "यह रिपोर्ट संयुक्त राष्ट्र आर्थिक एवं सामाजिक मामलों के विभाग (UNDESA) तथा ",
          },
          {
            _type: "span",
            marks: ["strong"],
            text: "संयुक्त राष्ट्र वन मंच (United Nations Forum on Forests-UNFF)",
          },
          {
            _type: "span",
            text: " द्वारा तैयार की जाती है। इसका उद्देश्य वर्ष 2017-2030 के लिए निर्धारित संयुक्त राष्ट्र रणनीतिक वन योजना (UN Strategic Plan for Forests) के अंतर्गत निर्धारित **छह वैश्विक वन लक्ष्यों (6 Global Forest Goals)** और **26 उप-लक्ष्यों (26 Targets)** की प्रगति का आकलन करना है।",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "इन लक्ष्यों का उद्देश्य विश्वभर में वन क्षेत्र का संरक्षण, पुनर्स्थापन, सतत प्रबंधन तथा वनों के माध्यम से जलवायु परिवर्तन और गरीबी जैसी वैश्विक चुनौतियों का समाधान करना है।" }]
      },

      /* ── 3. Key Findings Table & Bullets ── */
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "3. ग्लोबल फॉरेस्ट गोल्स रिपोर्ट 2026 के मुख्य निष्कर्ष एवं आंकड़े" }],
      },
      {
        _type: "table",
        caption: "वैश्विक वन लक्ष्य रिपोर्ट 2026 के प्रामाणिक आंकड़े (UNFF & UNDESA Data)",
        headers: ["मापदंड / सूचकांक", "प्रामाणिक आंकड़ा एवं स्थिति (2015-2025)"],
        rows: [
          ["**वैश्विक वन क्षेत्र (2015)**", "**4.18 अरब हेक्टेयर**"],
          ["**वैश्विक वन क्षेत्र (2025)**", "**4.14 अरब हेक्टेयर**"],
          ["**10 वर्षों में शुद्ध वन कमी**", "**लगभग 4 करोड़ हेक्टेयर (40 मिलियन हेक्टेयर)**"],
          ["**प्राथमिक वनों (Primary Forests) का नुकसान**", "**1.6 करोड़ हेक्टेयर (सर्वाधिक दक्षिण अमेरिका में)**"],
          ["**वनों की कटाई का मुख्य कारण**", "**कृषि विस्तार एवं ईंधन लकड़ी/चारकोल मांग**"],
          ["**वन बहाली का संकल्प (91 देश)**", "**19 करोड़ हेक्टेयर का संकल्प**"],
          ["**वास्तविक वन बहाली (2025 तक)**", "**केवल 4.4 करोड़ हेक्टेयर (अपेक्षित से काफी कम)**"],
          ["**कार्बन अवशोषण क्षमता**", "**मानव उत्सर्जन का लगभग 1/3 भाग वनों द्वारा अवशोषित**"]
        ]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **वैश्विक वन क्षेत्र में लगातार गिरावट**: वर्ष 2015 में विश्व का कुल वन क्षेत्र 4.18 अरब हेक्टेयर था, जो 2025 में घटकर 4.14 अरब हेक्टेयर रह गया। अर्थात एक दशक में लगभग 4 करोड़ हेक्टेयर वन क्षेत्र समाप्त हो गया। यह गिरावट वैश्विक स्तर पर वन संरक्षण प्रयासों की सीमाओं को दर्शाती है।" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **प्राथमिक वनों का तेजी से क्षरण**: विश्व ने 2015-2025 के बीच लगभग 1.6 करोड़ हेक्टेयर प्राथमिक वन खो दिए। प्राथमिक वन वे प्राकृतिक वन होते हैं जिनमें मानवीय हस्तक्षेप अत्यंत सीमित होता है। ये वन जैव विविधता, जल संरक्षण तथा कार्बन भंडारण के लिए अत्यधिक महत्वपूर्ण हैं। दक्षिण अमेरिका में इन वनों का सर्वाधिक नुकसान हुआ है।" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **कृषि विस्तार अभी भी सबसे बड़ा कारण**: वनों को कृषि भूमि में परिवर्तित करना वैश्विक स्तर पर वनों की कटाई का सबसे बड़ा कारण बना हुआ है। खाद्य उत्पादन की बढ़ती मांग तथा व्यावसायिक कृषि गतिविधियों ने बड़े पैमाने पर वन क्षेत्रों को प्रभावित किया है।" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **ईंधन लकड़ी और चारकोल की बढ़ती मांग**: रिपोर्ट का सबसे महत्वपूर्ण निष्कर्ष यह है कि ऊर्जा गरीबी के कारण विकासशील देशों में लाखों परिवार आज भी ईंधन लकड़ी और चारकोल पर निर्भर हैं। परिणामस्वरूप वन संसाधनों पर भारी दबाव बढ़ रहा है। यह स्थिति विशेष रूप से उप-सहारा अफ्रीका तथा एशिया के कुछ क्षेत्रों में अधिक गंभीर है।" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **जलवायु परिवर्तन के बढ़ते प्रभाव**: सूखा, हीटवेव, जंगलों में आग, कीट संक्रमण तथा वन रोगों की बढ़ती घटनाएं वन पारिस्थितिक तंत्र को कमजोर कर रही हैं। इससे वन कार्बन सिंक के रूप में अपनी क्षमता खो रहे हैं।" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **वन बहाली की धीमी प्रगति**: 91 देशों ने लगभग 19 करोड़ हेक्टेयर वन क्षेत्र के पुनर्स्थापन का संकल्प लिया था, किंतु 2025 तक केवल 4.4 करोड़ हेक्टेयर क्षेत्र ही बहाल किया जा सका। यह दर्शाता है कि वैश्विक स्तर पर वन बहाली की गति अभी भी अपेक्षित स्तर से काफी कम है।" }]
      },

      /* ── 4. Energy Poverty & Forest Crisis ── */
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "4. ऊर्जा गरीबी और वन संकट: नया दृष्टिकोण" }],
      },
      {
        _type: "image",
        asset: { _type: "reference", _ref: assetEnergy._id },
        alt: "Energy Poverty Fuelwood Charcoal Dependence Clean Energy Transition MPPSC UPSC Notes",
        caption: "ऊर्जा गरीबी का समाधान: स्वच्छ रसोई ईंधन (LPG, बायोगैस, सौर ऊर्जा) द्वारा वन क्षरण की रोकथाम",
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "ग्लोबल फॉरेस्ट गोल्स रिपोर्ट 2026 की सबसे बड़ी विशेषता यह है कि यह वन क्षरण को केवल पर्यावरणीय समस्या के रूप में नहीं देखती, बल्कि इसे ",
          },
          {
            _type: "span",
            marks: ["strong"],
            text: "ऊर्जा और गरीबी के प्रश्न से जोड़ती है",
          },
          {
            _type: "span",
            text: "। दुनिया के अनेक गरीब समुदाय आज भी खाना पकाने और घरेलू ऊर्जा आवश्यकताओं के लिए लकड़ी पर निर्भर हैं। ऐसी स्थिति में वन संरक्षण संबंधी कानून तब तक पूर्णतः प्रभावी नहीं हो सकते जब तक लोगों को वैकल्पिक स्वच्छ ऊर्जा उपलब्ध नहीं कराई जाती।",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "इसलिए स्वच्छ ऊर्जा तक पहुंच, एलपीजी, बायोगैस, सौर ऊर्जा और स्वच्छ खाना पकाने की तकनीकों का प्रसार वास्तव में वन संरक्षण का भी एक महत्वपूर्ण उपाय है। यह दृष्टिकोण सतत विकास लक्ष्यों (SDGs) के एकीकृत स्वरूप को दर्शाता है।" }]
      },

      /* ── 5. UN SDSN Sustainable Development Report 2026 & India Rank 94th ── */
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "5. संयुक्त राष्ट्र सतत विकास रिपोर्ट 2026: भारत 94वें स्थान पर (SDG Rank 94th)" }],
      },
      {
        _type: "image",
        asset: { _type: "reference", _ref: assetSdg._id },
        alt: "India SDG Index 2026 Sustainable Development Goals 94th Rank MPPSC UPSC Notes",
        caption: "संयुक्त राष्ट्र सतत विकास रिपोर्ट 2026 (UN SDSN): भारत 167 देशों में 94वें स्थान पर (स्कॉर 68.3)",
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "संयुक्त राष्ट्र सतत विकास समाधान नेटवर्क (UN SDSN) द्वारा जारी ",
          },
          {
            _type: "span",
            marks: ["strong"],
            text: "सतत विकास रिपोर्ट 2026 (Sustainable Development Report 2026)",
          },
          {
            _type: "span",
            text: " के अनुसार, भारत ने **167 देशों में 94वाँ स्थान** प्राप्त किया है। देश का समग्र स्कोर **100 में से 68.3** रहा, जो अब तक का उसका सर्वश्रेष्ठ प्रदर्शन माना जाता है और सतत विकास लक्ष्यों (SDGs) की दिशा में हुई महत्त्वपूर्ण प्रगति को दर्शाता है।",
          },
        ],
      },
      {
        _type: "table",
        caption: "सतत विकास रिपोर्ट 2026 (UN SDSN) एवं भारत का प्रदर्शन",
        headers: ["मापदंड / सूचकांक", "वैश्विक एवं भारत का प्रामाणिक आंकड़ा (SDR 2026)"],
        rows: [
          ["**भारत की वैश्विक रैंकिंग (2026)**", "**94वाँ स्थान (167 देशों में)**"],
          ["**भारत का समग्र स्कोर**", "**68.3 / 100** (2015 में 112वें स्थान से 18 स्थानों का सुधार)"],
          ["**वैश्विक शीर्ष 3 देश**", "**1. फिनलैंड | 2. स्वीडन | 3. डेनमार्क** (नॉर्डिक देश)"],
          ["**सब्सैद्धांतिक सबसे कमजोर देश**", "**चाड, मध्य अफ्रीकी गणराज्य, दक्षिण सूडान**"],
          ["**बहुपक्षवाद (Multilateralism) में प्रथम**", "**बारबाडोस** (अमेरिका सबसे अंतिम)"],
          ["**भारत के 2030 लक्ष्य ऑन-ट्रैक**", "**33.3% लक्ष्य ऑन-ट्रैक | 42.7% सीमित सुधार | 24% में गिरावट**"],
          ["**भारत में 'शून्य भुखमरी' (SDG 2)**", "**चाइल्ड वेस्टिंग 19% (वैश्विक उच्चतम) | चाइल्ड स्टंटिंग 29.3% | कुपोषण 12%**"],
          ["**भारत की प्रमुख सफलताएं**", "**SDG 7 (बिजली पहुंच) एवं SDG 9 (मोबाइल ब्रॉडबैंड/इंटरनेट)**"]
        ]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **वैश्विक स्थिति चिंताजनक**: वर्ष 2030 तक की दिशा में 17 सतत विकास लक्ष्यों में से कोई भी लक्ष्य अब तक पूरी तरह से निर्धारित समय-सीमा के अनुरूप प्रगति पथ पर नहीं है। केवल 16.5% SDG ही सही गति से आगे बढ़ रहे हैं, जबकि 15% लक्ष्य 2015 के बाद से विपरीत दिशा में चले गए हैं।" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **शीर्ष एवं पिछड़े देश**: नॉर्डिक देश शीर्ष पर हैं (फिनलैंड प्रथम, स्वीडन द्वितीय, डेनमार्क तृतीय)। संघर्षग्रस्त चाड, मध्य अफ्रीकी गणराज्य व दक्षिण सूडान सबसे नीचे हैं।" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **भारत की उल्लेखनीय प्रगति**: 2015 के 112वें स्थान से 94वें स्थान तक (18 स्थानों का सुधार)। हालांकि यह भूटान, मालदीव, नेपाल और श्रीलंका जैसे पड़ोसियों से पीछे है।" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **संरचनात्मक चुनौतियाँ (7 लक्ष्य)**: भारत SDG 2 (शून्य भुखमरी), SDG 3 (उत्तम स्वास्थ्य), SDG 5 (लैंगिक समानता), SDG 11 (संवहनीय शहर), SDG 14 (जलीय जीव), SDG 15 (स्थलीय जीव) और SDG 16 (शांति व न्याय) में प्रमुख चुनौतियों का सामना कर रहा है। SDG 16 के तहत प्रेस स्वतंत्रता सूचकांक स्कोर 2015 के 59.51 से घटकर 2026 में 31.96 रह गया है। प्रति व्यक्ति CO₂ उत्सर्जन 2.21 टन के रिकॉर्ड स्तर पर पहुँचा है।" }]
      },

      /* ── 6. India Initiatives & CAMPA ── */
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "6. भारत की प्रमुख वन संरक्षण एवं सतत विकास पहलें" }],
      },
      {
        _type: "image",
        asset: { _type: "reference", _ref: assetCampa._id },
        alt: "India Green Mission CAMPA Afforestation Initiatives 2026 MPPSC UPSC Notes",
        caption: "भारत की प्रमुख पहलें: हरित भारत मिशन, CAMPA प्रतिपूरक वनीकरण एवं मिशन LiFE",
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **हरित भारत मिशन (Green India Mission)**: वर्ष 2014 में राष्ट्रीय जलवायु परिवर्तन कार्य योजना (NAPCC) के अंतर्गत शुरू किया गया। उद्देश्य: वन व वृक्ष आच्छादन बढ़ाना।" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **राष्ट्रीय वनीकरण कार्यक्रम (National Afforestation Programme)**: वर्ष 2000 में प्रारंभ। क्षतिग्रस्त वन क्षेत्रों का पुनरुद्धार व संयुक्त वन प्रबंधन समितियों द्वारा सामुदायिक भागीदारी।" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **CAMPA निधि (CAF Act 2016)**: 2002 में सर्वोच्च न्यायालय के निर्देशों के बाद अवधारणा विकसित हुई तथा प्रतिपूरक वनीकरण निधि अधिनियम, 2016 द्वारा वैधानिक आधार मिला।" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **वन संरक्षण अधिनियम (Forest Conservation Act 1980)**: 1980 में लागू, वन भूमि के गैर-वन उपयोग पर नियंत्रण। वर्ष 2023 में महत्वपूर्ण संशोधन।" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **भूमि क्षरण तटस्थता (LDN) लक्ष्य 2030**: UNCCD के तहत 2019 में घोषित, 2030 तक भूमि क्षरण तटस्थता का लक्ष्य।" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **मिशन LiFE (Lifestyle for Environment)**: COP-26 (ग्लासगो 2021) में अवधारणा व 2022 में औपचारिक लॉन्च। पर्यावरण-अनुकूल जीवनशैली।" }]
      },

      /* ── 7. Domestic Framework & NITI Aayog ── */
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "7. भारत का घरेलू SDG निगरानी ढाँचा: नीति आयोग व MoSPI" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **नीति आयोग (SDG India Index)**: भारत में SDG निगरानी हेतु नोडल एजेंसी। सहकारी एवं प्रतिस्पर्द्धी संघवाद को बढ़ावा।" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **MoSPI (राष्ट्रीय संकेतक ढाँचा - NIF)**: 277 राष्ट्रीय संकेतकों द्वारा SDG प्रगति की निगरानी।" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **पंचायती राज मंत्रालय (LIF & PAI)**: 9 विषयगत थीम व पंचायत उन्नति सूचकांक (PAI) द्वारा 2.5 लाख से अधिक ग्राम पंचायतों का मूल्यांकन।" }]
      },

      /* ── 8. Way Forward ── */
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "8. आगे की राह एवं निष्कर्ष" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• वनों की कटाई रोकने हेतु कठोर नीतियाँ व कृषि-वन प्रबंधन में संतुलन।" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• स्वच्छ ऊर्जा (LPG, बायोगैस, सौर) तक सार्वभौमिक पहुँच द्वारा ऊर्जा गरीबी का अंत।" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• जनजातीय एवं स्थानीय समुदायों की भागीदारी व डिफॉरेस्टेशन-फ्री सप्लाई चेन।" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "निष्कर्षतः, ग्लोबल फॉरेस्ट गोल्स रिपोर्ट 2026 और सतत विकास रिपोर्ट 2026 यह सिद्ध करती हैं कि वन संरक्षण और सतत विकास केवल पर्यावरणीय प्रश्न नहीं, बल्कि मानव सभ्यता के भविष्य से जुड़े मूलभूत विषय हैं। विकास और पर्यावरण के मध्य संतुलन ही 2030 एजेंडा की सफलता की कुंजी है।",
          },
        ],
      },

      /* ── 9. Interlinking ── */
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "9. संबंधित अध्ययन सामग्री एवं नोट्स" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "👉 [आपदा प्रबंधन (संशोधन) अधिनियम 2025: NCMC, UDMA धारा 41A व MPPSC Notes](/current-affairs/disaster-management-amendment-act-2025-mppsc-upsc-notes)",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "👉 [डॉ. एम. एस. स्वामीनाथन: हरित क्रांति, 50% MSP स्वामीनाथन आयोग रिपोर्ट व योगदान](/general-awareness/dr-ms-swaminathan-father-of-green-revolution-mppsc-upsc-notes)",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "👉 [भारत की जनसंख्या नीति (NPP-2000), जनगणना 2011 आंकड़े व कानून](/general-awareness/population-policy-of-india-npp-2000-mppsc-upsc-notes)",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "👉 [अंतर्राष्ट्रीय संगठन एवं उनके मुख्यालय: संपूर्ण सूची व रिपोर्ट्स](/general-awareness/international-organizations-and-their-headquarters-mppsc-upsc-notes)",
          },
        ],
      },
    ],

    /* ────────────── ENGLISH BODY ────────────── */
    bodyEn: [
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "1. Global Forest Goals Report 2026: Context & Background" }],
      },
      {
        _type: "image",
        asset: { _type: "reference", _ref: assetCover._id },
        alt: "UNFF Global Forest Goals Report 2026 Deforestation Conservation MPPSC UPSC Notes",
        caption: "UNFF Global Forest Goals Report 2026: Tracking global deforestation, primary forest loss & sustainable forest management",
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "The United Nations ",
          },
          {
            _type: "span",
            marks: ["strong"],
            text: "Global Forest Goals Report 2026",
          },
          {
            _type: "span",
            text: ", published by UNDESA and UNFF, warns that global forest cover declined by **40 million hectares (4 crore hectares)** between 2015 and 2025. Besides agricultural expansion, fuelwood and charcoal demand fueled by energy poverty in developing countries has emerged as a driver of forest degradation.",
          },
        ],
      },

      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "2. Key Findings of Global Forest Goals Report 2026" }],
      },
      {
        _type: "table",
        caption: "Key Metrics from Global Forest Goals Report 2026 & UN SDSN SDR 2026",
        headers: ["Indicator / Parameter", "Official Metric (2015–2025 Data)"],
        rows: [
          ["**Global Forest Area (2015)**", "**4.18 Billion Hectares**"],
          ["**Global Forest Area (2025)**", "**4.14 Billion Hectares**"],
          ["**Decadal Net Forest Loss**", "**40 Million Hectares (4 Crore Hectares)**"],
          ["**Primary Forest Loss**", "**16 Million Hectares (Highest in South America)**"],
          ["**India SDG Rank 2026 (UN SDSN)**", "**94th Rank out of 167 nations (Score: 68.3/100)**"],
          ["**Top SDG Country 2026**", "**Finland (Followed by Sweden & Denmark)**"],
          ["**CAMPA Act Year**", "**Compensatory Afforestation Fund Act 2016**"],
          ["**Green India Mission Year**", "**2014 under NAPCC**"]
        ]
      },

      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "3. Energy Poverty & Clean Energy Transition" }],
      },
      {
        _type: "image",
        asset: { _type: "reference", _ref: assetEnergy._id },
        alt: "Energy Poverty Fuelwood Charcoal Dependence Clean Energy Transition MPPSC UPSC Notes",
        caption: "Addressing Energy Poverty: Universal clean cooking energy (LPG, Biogas, Solar) as a primary forest conservation tool",
      },

      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "4. Sustainable Development Report 2026 & India's Performance (94th Rank)" }],
      },
      {
        _type: "image",
        asset: { _type: "reference", _ref: assetSdg._id },
        alt: "India SDG Index 2026 Sustainable Development Goals 94th Rank MPPSC UPSC Notes",
        caption: "UN SDSN Sustainable Development Report 2026: India ranks 94th out of 167 countries with a score of 68.3",
      },

      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "5. India's Forest & Environmental Initiatives" }],
      },
      {
        _type: "image",
        asset: { _type: "reference", _ref: assetCampa._id },
        alt: "India Green Mission CAMPA Afforestation Initiatives 2026 MPPSC UPSC Notes",
        caption: "India's Afforestation Initiatives: Green India Mission (2014), CAMPA Fund (CAF Act 2016) & Mission LiFE",
      },

      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "6. Related Study Material & Interlinked Notes" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "👉 [Disaster Management (Amendment) Act 2025 Notes](/en/current-affairs/disaster-management-amendment-act-2025-mppsc-upsc-notes)",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "👉 [Dr. M.S. Swaminathan: Biography, Father of Green Revolution & MSP Report](/en/general-awareness/dr-ms-swaminathan-father-of-green-revolution-mppsc-upsc-notes)",
          },
        ],
      },
    ],

    /* ────────────── BILINGUAL FAQS ────────────── */
    faqs: [
      {
        question: "ग्लोबल फॉरेस्ट गोल्स रिपोर्ट 2026 किस संस्था द्वारा जारी की जाती है?",
        questionEn: "Which agency publishes the Global Forest Goals Report 2026?",
        answer: "यह रिपोर्ट संयुक्त राष्ट्र आर्थिक एवं सामाजिक मामलों के विभाग (UNDESA) तथा संयुक्त राष्ट्र वन मंच (UNFF) द्वारा जारी की जाती है।",
        answerEn: "This report is published by UNDESA and the United Nations Forum on Forests (UNFF)."
      },
      {
        question: "ग्लोबल फॉरेस्ट गोल्स रिपोर्ट 2026 के अनुसार 2015 से 2025 के बीच कितना वन क्षेत्र नष्ट हुआ?",
        questionEn: "How much forest cover was lost between 2015 and 2025 according to the Global Forest Goals Report 2026?",
        answer: "2015 से 2025 के बीच वैश्विक स्तर पर लगभग 4 करोड़ हेक्टेयर (40 मिलियन हेक्टेयर) वन क्षेत्र समाप्त हो गया।",
        answerEn: "Approximately 40 million hectares (4 crore hectares) of forest cover was lost globally between 2015 and 2025."
      },
      {
        question: "सतत विकास रिपोर्ट 2026 (UN SDSN) में भारत को कौन सा स्थान प्राप्त हुआ है?",
        questionEn: "What rank did India achieve in the UN SDSN Sustainable Development Report 2026?",
        answer: "भारत ने 167 देशों में 94वाँ स्थान प्राप्त किया है और उसका स्कोर 68.3/100 रहा है।",
        answerEn: "India achieved 94th rank among 167 nations with an overall score of 68.3 out of 100."
      },
      {
        question: "सतत विकास रिपोर्ट 2026 की वैश्विक रैंकिंग में शीर्ष स्थान किस देश का है?",
        questionEn: "Which country topped the global ranking in the Sustainable Development Report 2026?",
        answer: "फिनलैंड ने पहला स्थान हासिल किया है, जिसके बाद स्वीडन और डेनमार्क का स्थान है।",
        answerEn: "Finland topped the ranking, followed by Sweden and Denmark."
      },
      {
        question: "भारत में प्रतिपूरक वनीकरण निधि अधिनियम (CAMPA Act) किस वर्ष लागू किया गया था?",
        questionEn: "In which year was the Compensatory Afforestation Fund Act (CAMPA Act) enacted in India?",
        answer: "CAMPA अधिनियम (CAF Act) को वर्ष 2016 में वैधानिक रूप से पारित किया गया था।",
        answerEn: "The CAMPA Act (CAF Act) was statutorily enacted in 2016."
      },
      {
        question: "हरित भारत मिशन (Green India Mission) की शुरुआत किस वर्ष हुई थी?",
        questionEn: "In which year was the Green India Mission launched in India?",
        answer: "हरित भारत मिशन की शुरुआत वर्ष 2014 में राष्ट्रीय जलवायु परिवर्तन कार्य योजना (NAPCC) के तहत हुई थी।",
        answerEn: "Green India Mission was launched in 2014 under the National Action Plan on Climate Change (NAPCC)."
      },
      {
        question: "मिशन LiFE (Lifestyle for Environment) की अवधारणा किसने और कब प्रस्तुत की थी?",
        questionEn: "Who introduced the concept of Mission LiFE and when?",
        answer: "प्रधानमंत्री नरेंद्र मोदी द्वारा वर्ष 2021 में COP-26 (ग्लासगो) में अवधारणा प्रस्तुत की गई व 2022 में औपचारिक रूप से लॉन्च किया गया।",
        answerEn: "Introduced by PM Narendra Modi at COP-26 (Glasgow) in 2021 and formally launched in 2022."
      },
      {
        question: "भारत में घरेलू स्तर पर SDG निगरानी हेतु नोडल एजेंसी कौन सी है?",
        questionEn: "Which nodal agency monitors SDG implementation domestically in India?",
        answer: "नीति आयोग (NITI Aayog) SDG इंडिया इंडेक्स के माध्यम से घरेलू निगरानी हेतु नोडल एजेंसी है।",
        answerEn: "NITI Aayog is the nodal agency for domestic SDG monitoring via the SDG India Index."
      }
    ],

    /* ────────────── 8 EXAM MCQS ────────────── */
    mcqs: [
      {
        question: "ग्लोबल फॉरेस्ट गोल्स रिपोर्ट 2026 निम्नलिखित में से किस संस्था द्वारा जारी की गई है?",
        questionEn: "The Global Forest Goals Report 2026 has been published by which organization?",
        options: [
          "A. यूएनईपी (UNEP)",
          "B. यूएनडीईएसए एवं संयुक्त राष्ट्र वन मंच (UNDESA & UNFF)",
          "C. डब्ल्यूडब्ल्यूएफ (WWF)",
          "D. नीति आयोग (NITI Aayog)"
        ],
        optionsEn: [
          "A. UNEP",
          "B. UNDESA & United Nations Forum on Forests (UNFF)",
          "C. WWF",
          "D. NITI Aayog"
        ],
        correctIndex: 1,
        explanation: "ग्लोबल फॉरेस्ट गोल्स रिपोर्ट संयुक्त राष्ट्र आर्थिक एवं सामाजिक मामलों के विभाग (UNDESA) और UNFF द्वारा तैयार की जाती है।",
        explanationEn: "The report is prepared jointly by UNDESA and the United Nations Forum on Forests (UNFF)."
      },
      {
        question: "ग्लोबल फॉरेस्ट गोल्स रिपोर्ट 2026 के अनुसार, वर्ष 2015 से 2025 के बीच वैश्विक वन क्षेत्र में कितनी कमी दर्ज की गई?",
        questionEn: "According to the Global Forest Goals Report 2026, what was the net loss in global forest cover between 2015 and 2025?",
        options: [
          "A. 1 करोड़ हेक्टेयर",
          "B. 2.5 करोड़ हेक्टेयर",
          "C. 4 करोड़ हेक्टेयर (40 मिलियन हेक्टेयर)",
          "D. 8 करोड़ हेक्टेयर"
        ],
        optionsEn: [
          "A. 10 million hectares",
          "B. 25 million hectares",
          "C. 40 million hectares (4 crore hectares)",
          "D. 80 million hectares"
        ],
        correctIndex: 2,
        explanation: "2015 में वैश्विक वन क्षेत्र 4.18 अरब हेक्टेयर से घटकर 2025 में 4.14 अरब हेक्टेयर रह गया (4 करोड़ हेक्टेयर की कमी)।",
        explanationEn: "Global forest cover declined from 4.18 billion ha in 2015 to 4.14 billion ha in 2025 (40 million ha loss)."
      },
      {
        question: "संयुक्त राष्ट्र सतत विकास रिपोर्ट 2026 (UN SDSN) में भारत ने 167 देशों में कौन सा स्थान प्राप्त किया है?",
        questionEn: "What is India's rank among 167 countries in the UN SDSN Sustainable Development Report 2026?",
        options: [
          "A. 68वाँ स्थान",
          "B. 82वाँ स्थान",
          "C. 94वाँ स्थान (स्कॉर 68.3)",
          "D. 112वाँ स्थान"
        ],
        optionsEn: [
          "A. 68th rank",
          "B. 82nd rank",
          "C. 94th rank (Score 68.3)",
          "D. 112th rank"
        ],
        correctIndex: 2,
        explanation: "भारत ने 68.3 स्कोर के साथ 94वाँ स्थान हासिल किया, जो 2015 के 112वें स्थान से 18 स्थानों का सुधार है।",
        explanationEn: "India achieved 94th rank with a score of 68.3, improving 18 places since 2015."
      },
      {
        question: "सतत विकास रिपोर्ट 2026 (SDG Index 2026) की वैश्विक रैंकिंग में प्रथम स्थान पर कौन सा देश रहा?",
        questionEn: "Which country ranked first in the global Sustainable Development Report 2026?",
        options: [
          "A. स्वीडन",
          "B. नॉर्वे",
          "C. फिनलैंड",
          "D. स्विट्जरलैंड"
        ],
        optionsEn: [
          "A. Sweden",
          "B. Norway",
          "C. Finland",
          "D. Switzerland"
        ],
        correctIndex: 2,
        explanation: "फिनलैंड ने पहला स्थान हासिल किया, जिसके बाद स्वीडन और डेनमार्क का स्थान है।",
        explanationEn: "Finland topped the index, followed by Sweden and Denmark."
      },
      {
        question: "भारत में प्रतिपूरक वनीकरण निधि अधिनियम (CAMPA Act) किस वर्ष वैधानिक रूप से पारित किया गया था?",
        questionEn: "In which year was the Compensatory Afforestation Fund Act (CAMPA Act) statutorily passed in India?",
        options: [
          "A. 2002",
          "B. 2010",
          "C. 2016",
          "D. 2020"
        ],
        optionsEn: [
          "A. 2002",
          "B. 2010",
          "C. 2016",
          "D. 2020"
        ],
        correctIndex: 2,
        explanation: "प्रतिपूरक वनीकरण निधि अधिनियम (CAF Act) को वर्ष 2016 में वैधानिक आधार प्रदान किया गया था।",
        explanationEn: "The Compensatory Afforestation Fund Act (CAF Act) was passed in 2016."
      },
      {
        question: "राष्ट्रीय जलवायु परिवर्तन कार्य योजना (NAPCC) के तहत 'हरित भारत मिशन' किस वर्ष शुरू किया गया था?",
        questionEn: "Under NAPCC, in which year was the 'Green India Mission' launched?",
        options: [
          "A. 2008",
          "B. 2014",
          "C. 2018",
          "D. 2021"
        ],
        optionsEn: [
          "A. 2008",
          "B. 2014",
          "C. 2018",
          "D. 2021"
        ],
        correctIndex: 1,
        explanation: "हरित भारत मिशन वर्ष 2014 में NAPCC के 8 राष्ट्रीय मिशनों में से एक के रूप में शुरू किया गया था।",
        explanationEn: "Green India Mission was launched in 2014 as one of the 8 national missions under NAPCC."
      },
      {
        question: "पर्यावरण के अनुकूल जीवन शैली को बढ़ावा देने वाले 'मिशन LiFE' की अवधारणा PM मोदी ने किस सम्मेलन में दी थी?",
        questionEn: "In which summit did PM Modi introduce the concept of 'Mission LiFE'?",
        options: [
          "A. COP-21 पेरिस (2015)",
          "B. COP-26 ग्लासगो (2021)",
          "C. COP-27 शर्म अल-शेख (2022)",
          "D. COP-28 दुबई (2023)"
        ],
        optionsEn: [
          "A. COP-21 Paris (2015)",
          "B. COP-26 Glasgow (2021)",
          "C. COP-27 Sharm El-Sheikh (2022)",
          "D. COP-28 Dubai (2023)"
        ],
        correctIndex: 1,
        explanation: "मिशन LiFE की अवधारणा 2021 में ग्लासगो COP-26 में दी गई और 2022 में औपचारिक रूप से लॉन्च की गई।",
        explanationEn: "Mission LiFE was introduced at COP-26 (Glasgow) in 2021 and launched in 2022."
      },
      {
        question: "भारत में सतत विकास लक्ष्यों (SDGs) के कार्यान्वयन एवं निगरानी हेतु नोडल एजेंसी कौन सी है?",
        questionEn: "Which nodal agency monitors the implementation of SDGs in India?",
        options: [
          "A. पर्यावरण, वन और जलवायु परिवर्तन मंत्रालय",
          "B. नीति आयोग (NITI Aayog)",
          "C. वित्त मंत्रालय",
          "D. MoSPI"
        ],
        optionsEn: [
          "A. Ministry of Environment, Forest and Climate Change",
          "B. NITI Aayog",
          "C. Ministry of Finance",
          "D. MoSPI"
        ],
        correctIndex: 1,
        explanation: "नीति आयोग SDG इंडिया इंडेक्स एवं डैशबोर्ड के माध्यम से भारत में SDG कार्यान्वयन की नोडल एजेंसी है।",
        explanationEn: "NITI Aayog is the nodal agency for SDG implementation and monitoring via the SDG India Index."
      }
    ]
  };

  console.log(`📝 Syncing Global Forest Goals Report 2026 Article "${articleDoc._id}" to Sanity CMS...`);
  const res = await client.createOrReplace(articleDoc);
  console.log(`🎉 SUCCESS! Article uploaded & published in Sanity CMS. Document ID: ${res._id}`);
  console.log(`URL slug: ${res.slug.current}`);
}

main().catch((err) => {
  console.error("❌ Error uploading Global Forest Goals Report 2026 article:", err);
  process.exit(1);
});
