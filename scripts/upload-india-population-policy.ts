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
  console.log("🚀 Uploading Complete Bilingual (Hindi & English) India Population Policy Article to Sanity CMS...");

  const publicBlogDir = path.resolve(process.cwd(), "public/images/blog");
  const artifactDir = "/Users/aakariastech/.gemini/antigravity-ide/brain/46ddf059-c542-4af1-8a30-e0605b309cce";

  const destHealth = path.join(publicBlogDir, "india_population_policy_family_welfare_healthcare.png");
  const destInfographic = path.join(publicBlogDir, "national_population_policy_2000_targets_infographic.png");
  const destYouth = path.join(publicBlogDir, "india_demographic_dividend_youth_development.png");

  if (!fs.existsSync(publicBlogDir)) fs.mkdirSync(publicBlogDir, { recursive: true });

  const srcHealth = path.join(artifactDir, "india_population_policy_family_welfare_healthcare_1785322121293.png");
  const srcInfographic = path.join(artifactDir, "national_population_policy_2000_targets_infographic_1785322137518.png");
  const srcYouth = path.join(artifactDir, "india_demographic_dividend_youth_development_1785322150238.png");

  if (fs.existsSync(srcHealth)) fs.copyFileSync(srcHealth, destHealth);
  if (fs.existsSync(srcInfographic)) fs.copyFileSync(srcInfographic, destInfographic);
  if (fs.existsSync(srcYouth)) fs.copyFileSync(srcYouth, destYouth);

  console.log("📸 Uploading images to Sanity CMS...");
  const assetHealth = await client.assets.upload("image", fs.createReadStream(destHealth), {
    filename: "india_population_policy_family_welfare_healthcare.png",
  });
  const assetInfographic = await client.assets.upload("image", fs.createReadStream(destInfographic), {
    filename: "national_population_policy_2000_targets_infographic.png",
  });
  const assetYouth = await client.assets.upload("image", fs.createReadStream(destYouth), {
    filename: "india_demographic_dividend_youth_development.png",
  });

  const docId = "gk-india-population-policy-notes";
  const slug = "population-policy-of-india-npp-2000-mppsc-upsc-notes";

  const articleDoc = {
    _id: docId,
    _type: "staticGk",
    title: "भारत की जनसंख्या नीति: विकास, राष्ट्रीय जनसंख्या नीति 2000 (NPP-2000) एवं प्रमुख प्रावधान | MPPSC & UPSC Notes",
    titleEn: "Population Policy of India: Evolution, National Population Policy 2000 (NPP-2000) & Key Provisions | MPPSC & UPSC Notes",
    slug: { _type: "slug", current: slug },
    category: { _type: "reference", _ref: "cat-misc" }, // General Studies / Misc
    ca_date: "2026-07-29",
    publishedAt: new Date().toISOString(),
    featured: true,
    readingTime: 10,
    tags: [
      { _type: "reference", _ref: "tag-mppsc" },
      { _type: "reference", _ref: "tag-upsc" },
      { _type: "reference", _ref: "tag-prelims" },
      { _type: "reference", _ref: "tag-mains" },
    ],
    excerpt: "भारत की जनसंख्या नीति का विकास (1952 से 2000), पहली राष्ट्रीय जनसंख्या नीति 1976, राष्ट्रीय जनसंख्या नीति 2000 (NPP-2000) के मुख्य उद्देश्य, लक्ष्य (TFR 2.1, 2045 स्थिरता), RCH कार्यक्रम, हालिया पहल, ट्रिक्स, FAQs व MCQs। MPPSC व UPSC परीक्षा हेतु संपूर्ण नोट्स।",
    excerptEn: "Comprehensive exam notes on Population Policy of India, 1952 Family Planning, 1976 Policy, National Population Policy 2000 (NPP-2000) targets (TFR 2.1, 2045 stabilization, IMR/MMR), RCH programme, recent control initiatives, memory tricks, FAQs and MCQs for MPPSC & UPSC.",
    seoTitle: "भारत की जनसंख्या नीति | National Population Policy 2000 | MPPSC & UPSC Notes",
    seoDescription: "भारत की जनसंख्या नीति (NPP-2000), पहली जनसंख्या नीति 1976, परिवार नियोजन कार्यक्रम 1952, TFR 2.1 लक्ष्य, RCH कार्यक्रम व जनसंख्या नियंत्रण पहलों के संपूर्ण नोट्स। MPPSC & UPSC परीक्षा हेतु ट्रिक्स, FAQs व MCQs।",
    keywords: [
      "भारत की जनसंख्या नीति",
      "भारत की जनसंख्या नीति 2000",
      "राष्ट्रीय जनसंख्या नीति 2000",
      "National Population Policy 2000",
      "NPP 2000",
      "भारत की जनसंख्या नीति की विवेचना कीजिए",
      "भारत की जनसंख्या नीति पर संक्षिप्त टिप्पणी",
      "भारत की जनसंख्या नीति pdf",
      "भारत की जनसंख्या नीति क्या है",
      "भारत की राष्ट्रीय जनसंख्या नीति 2000 पर एक लेख लिखिए",
      "राष्ट्रीय जनसंख्या नीति की मुख्य विशेषताएं",
      "राष्ट्रीय जनसंख्या नीति 1976",
      "bharat ki jansankhya niti mppsc",
      "MPPSC Notes",
      "UPSC Notes",
      "Population Policy India",
      "Family Planning Programme India"
    ],
    featuredImage: {
      _type: "image",
      asset: { _type: "reference", _ref: assetHealth._id },
      alt: "India Population Policy Family Welfare Healthcare RCH Programme MPPSC UPSC Notes",
    },

    /* ─── HINDI BODY ─── */
    body: [
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "1. चर्चा में क्यों? एवं जनसंख्या नीति का अर्थ" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "वर्तमान में भारत विश्व का सर्वाधिक जनसंख्या वाला देश है। तीव्र गति से बढ़ती जनसंख्या का सीधा प्रभाव प्राकृतिक संसाधनों, रोजगार, स्वास्थ्य सुविधाओं, शिक्षा व्यवस्था और देश के समग्र आर्थिक विकास पर पड़ता है। इसी चुनौती से कुशलतापूर्वक निपटने के लिए भारत सरकार ने समय-समय पर ",
          },
          {
            _type: "span",
            marks: ["strong"],
            text: "जनसंख्या नीति (Population Policy)",
          },
          {
            _type: "span",
            text: " और परिवार कल्याण कार्यक्रम लागू किए हैं। प्रतियोगी परीक्षाओं जैसे ",
          },
          {
            _type: "span",
            marks: ["strong"],
            text: "MPPSC (प्रारम्भिक व मुख्य परीक्षा) तथा UPSC",
          },
          {
            _type: "span",
            text: " में भारत की जनसंख्या नीतियों एवं राष्ट्रीय जनसंख्या नीति 2000 से संबंधित प्रश्न नियमित रूप से पूछे जाते हैं।",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "📌 **जनसंख्या नीति का अर्थ**: जनसंख्या नीति वह सुव्यवस्थित सरकारी नीति है जिसके माध्यम से जनसंख्या वृद्धि दर को नियंत्रित व संतुलित करना, प्रजनन दर (TFR) में कमी लाना, मातृ एवं शिशु स्वास्थ्य में सुधार करना तथा देश के भौतिक संसाधनों और मानव जनसंख्या के मध्य सतत संतुलन स्थापित करना मुख्य लक्ष्य होता है।",
          },
        ],
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "2. भारत में जनसंख्या नीति का ऐतिहासिक विकास (1952 से 2000 तक)" }],
      },
      {
        _type: "image",
        asset: { _type: "reference", _ref: assetInfographic._id },
        alt: "Evolution of India Population Policy Timeline 1952 to National Population Policy 2000 MPPSC UPSC Notes",
        caption: "भारत में जनसंख्या नीति का ऐतिहासिक क्रम: 1952 के राष्ट्रीय परिवार नियोजन से 2000 की राष्ट्रीय जनसंख्या नीति तक का सफर",
      },
      {
        _type: "table",
        caption: "भारत में जनसंख्या नीति एवं परिवार कल्याण कार्यक्रमों का विकास क्रम",
        headers: ["वर्ष", "महत्वपूर्ण पहल / नीति", "मुख्य प्रावधान एवं विशेषताएँ"],
        rows: [
          ["**1952**", "**राष्ट्रीय परिवार नियोजन कार्यक्रम**", "• **भारत विश्व का पहला देश बना** जिसने राष्ट्रीय स्तर पर परिवार नियोजन कार्यक्रम शुरू किया।\n• उद्देश्य: जनसंख्या वृद्धि को नियंत्रित करना एवं मातृ-शिशु स्वास्थ्य में सुधार।"],
          ["**1961–62**", "**परिवार कल्याण कार्यक्रम का विस्तार**", "• परिवार नियोजन कार्यक्रम का दायरा बढ़ाकर इसे व्यापक **परिवार कल्याण कार्यक्रम (Family Welfare Programme)** का स्वरूप दिया गया।"],
          ["**1966**", "**परिवार नियोजन विभाग का गठन**", "• स्वास्थ्य मंत्रालय के अंतर्गत पृथक **परिवार नियोजन विभाग (Department of Family Planning)** स्थापित किया गया।"],
          ["**1976**", "**पहली राष्ट्रीय जनसंख्या नीति (NPP-1976)**", "• भारत की पहली औपचारिक जनसंख्या नीति घोषित हुई।\n• लड़कियों के विवाह की न्यूनतम आयु **15 से बढ़ाकर 18 वर्ष** की गई।\n• लड़कों के विवाह की न्यूनतम आयु **18 से बढ़ाकर 21 वर्ष** की गई।\n• **1971 की जनगणना फ्रीज**: संसद में प्रतिनिधित्व, केंद्रीय सहायता एवं करों के वितरण के लिए 1971 की जनगणना को आधार माना गया (वर्ष 2001 तक)।"],
          ["**1997**", "**प्रजनन एवं बाल स्वास्थ्य कार्यक्रम (RCH)**", "• **RCH (Reproductive and Child Health Programme)** प्रारंभ किया गया।\n• मुख्य ध्यान मातृ मृत्यु दर (MMR) व शिशु मृत्यु दर (IMR) घटाने तथा सुरक्षित प्रसव पर केंद्रित किया गया।"],
          ["**2000**", "**राष्ट्रीय जनसंख्या नीति, 2000 (NPP-2000)**", "• भारत की सबसे महत्वपूर्ण और वर्तमान में प्रभावी नीति (एम.एस. स्वामीनाथन समिति की सिफारिशों पर आधारित)।\n• **दीर्घकालिक लक्ष्य**: 2045 तक जनसंख्या स्थिरता।"]
        ]
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "3. राष्ट्रीय जनसंख्या नीति, 2000 (NPP-2000): मुख्य उद्देश्य व लक्ष्य" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **1. तत्काल लक्ष्य**: प्रजनन स्वास्थ्य एवं बुनियादी स्वास्थ्य ढाँचे का विस्तार करना, स्वास्थ्य कार्यकर्ताओं की उपलब्धता बढ़ाना तथा गर्भनिरोधक साधनों की पहुँच सुनिश्चित करना।" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **2. मध्यमकालिक लक्ष्य**: वर्ष 2010 तक कुल प्रजनन दर (TFR - Total Fertility Rate) को घटाकर **2.1 (प्रतिस्थापन स्तर / Replacement Level)** तक लाना।" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **3. दीर्घकालिक लक्ष्य**: वर्ष **2045 तक** सतत आर्थिक विकास, सामाजिक प्रगति और पर्यावरण संरक्षण की आवश्यकताओं के अनुरूप जनसंख्या में स्थिरता (Population Stabilization) प्राप्त करना।" }],
      },
      {
        _type: "table",
        caption: "राष्ट्रीय जनसंख्या नीति 2000 के प्रमुख सामाजिक व स्वास्थ्य लक्ष्य",
        headers: ["क्षेत्र / पैरामीटर", "NPP-2000 द्वारा निर्धारित लक्ष्य"],
        rows: [
          ["**शिशु मृत्यु दर (IMR)**", "प्रति 1000 जीवित जन्मों पर शिशु मृत्यु दर को **30 से कम** करना।"],
          ["**मातृ मृत्यु दर (MMR)**", "प्रति 1 लाख जीवित जन्मों पर मातृ मृत्यु दर को **100 से कम** करना।"],
          ["**कुल प्रजनन दर (TFR)**", "कुल प्रजनन दर को घटाकर **2.1 (प्रतिस्थापन स्तर)** पर लाना।"],
          ["**टीकाकरण (Immunization)**", "सभी बच्चों का संक्रामक बीमारियों के विरुद्ध **100% सार्वभौमिक टीकाकरण**।"],
          ["**संस्थागत प्रसव (Institutional Delivery)**", "100% प्रसव प्रशिक्षित स्वास्थ्य कर्मियों व अस्पतालों द्वारा संपन्न कराना।"],
          ["**निःशुल्क प्राथमिक शिक्षा**", "14 वर्ष तक के बच्चों के लिए प्राथमिक शिक्षा को निःशुल्क एवं अनिवार्य बनाना।"],
          ["**विवाह की आयु**", "लड़कियों के विवाह की आयु 18 वर्ष से ऊपर (बेहतर 20 वर्ष) रखने को बढ़ावा देना।"],
          ["**पंजीकरण (Registration)**", "जन्म, मृत्यु, विवाह एवं गर्भावस्था का 100% शत-प्रतिशत पंजीकरण।"]
        ]
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "4. जनसंख्या नियंत्रण हेतु हालिया सरकारी पहल एवं जनसांख्यिकीय लाभांश" }],
      },
      {
        _type: "image",
        asset: { _type: "reference", _ref: assetYouth._id },
        alt: "India Demographic Dividend Youth Skill Development Human Capital MPPSC UPSC Notes",
        caption: "भारत का जनसांख्यिकीय लाभांश (Demographic Dividend): युवाओं के कौशल विकास और उत्पादकता द्वारा राष्ट्रीय विकास में योगदान",
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **मिशन परिवार विकास**: वर्ष 2016 में देश के 7 उच्च TFR वाले राज्यों (मध्य प्रदेश, उत्तर प्रदेश, बिहार, राजस्थान, झारखंड, छत्तीसगढ़ व असम) के 145 जिलों में परिवार नियोजन सेवाओं की पहुँच बढ़ाने के लिए शुरू किया गया।" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **राष्ट्रीय स्वास्थ्य मिशन (NHM)**: जननी सुरक्षा योजना (JSY) एवं जननी शिशु सुरक्षा कार्यक्रम (JSSK) के माध्यम से मातृ एवं शिशु स्वास्थ्य में अभूतपूर्व सुधार।" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **जनसांख्यिकीय लाभांश (Demographic Dividend)**: भारत की लगभग 65% आबादी कार्यशील आयु वर्ग (15–59 वर्ष) में है। यदि स्वास्थ्य, शिक्षा और कौशल विकास में निवेश किया जाए, तो यह जनसंख्या वृद्धि भारत को आर्थिक महाशक्ति बनाने की क्षमता रखती है।" }],
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "5. परीक्षा हेतु महत्वपूर्ण तथ्य एवं स्मरणीय बिंदु" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "💡 **स्मार्ट याद रखने की ट्रिक**: \"52 में परिवार, 66 में विभाग, 76 में नीति, 97 में RCH, 2000 में नई जनसंख्या नीति।\"",
          },
        ],
      },
      {
        _type: "facts",
        items: [
          { label: "1952", value: "**परिवार नियोजन कार्यक्रम** (विश्व में पहला देश)" },
          { label: "1961–62", value: "**परिवार कल्याण कार्यक्रम**" },
          { label: "1966", value: "**परिवार नियोजन विभाग** का गठन" },
          { label: "1976", value: "**पहली राष्ट्रीय जनसंख्या नीति** (विवाह आयु 18 व 21 वर्ष)" },
          { label: "1997", value: "**RCH (प्रजनन एवं बाल स्वास्थ्य कार्यक्रम)**" },
          { label: "2000", value: "**राष्ट्रीय जनसंख्या नीति 2000 (NPP-2000)** (TFR 2.1 व 2045 स्थिरता)" },
        ]
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "6. संबंधित अध्ययन सामग्री एवं नोट्स" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "👉 [अंतर्राष्ट्रीय संगठन एवं उनके मुख्यालय: संपूर्ण सूची, स्थापना वर्ष व रिपोर्ट्स](/general-awareness/international-organizations-and-their-headquarters-mppsc-upsc-notes)",
          },
        ],
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
            text: "👉 [आपदा प्रबंधन क्या है? NCERT सिद्धांत व मेन्स उत्तर लेखन नोट्स](/general-awareness/what-is-disaster-management-ncert-types-mppsc-notes)",
          },
        ],
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "7. निष्कर्ष" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "भारत की जनसंख्या नीति केवल जनसंख्या नियंत्रण तक सीमित नहीं है, बल्कि यह मातृ-शिशु स्वास्थ्य, शिक्षा, लैंगिक समानता और मानव संसाधन के विकास से जुड़ी एक व्यापक विकास नीति है। MPPSC एवं UPSC अभ्यर्थियों के लिए जनसंख्या नीति का ऐतिहासिक क्रम, TFR 2.1 का लक्ष्य तथा हाल की सरकारी पहलों का गहराई से अध्ययन करना अत्यंत आवश्यक है।",
          },
        ],
      },
    ],

    /* ─── ENGLISH BODY ─── */
    bodyEn: [
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "1. Why in News? & Definition of Population Policy" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "India is currently the most populous country in the world. Rapid population growth impacts natural resources, employment, healthcare infrastructure, education, and national economic development. To address these demographic challenges, the Government of India has periodically instituted comprehensive ",
          },
          {
            _type: "span",
            marks: ["strong"],
            text: "Population Policies and Family Welfare Programmes",
          },
          {
            _type: "span",
            text: ". Topics surrounding India's population policies and the National Population Policy 2000 (NPP-2000) are essential for ",
          },
          {
            _type: "span",
            marks: ["strong"],
            text: "MPPSC (Prelims & Mains Paper-1/2) and UPSC CSE",
          },
          {
            _type: "span",
            text: " examinations.",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "📌 **Definition of Population Policy**: A Population Policy is a systematic government framework designed to balance population growth rates, reduce Total Fertility Rate (TFR), enhance maternal and child healthcare, and align human population with available physical resources for sustainable national development.",
          },
        ],
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "2. Historical Evolution of Population Policy in India (1952 to 2000)" }],
      },
      {
        _type: "image",
        asset: { _type: "reference", _ref: assetInfographic._id },
        alt: "Evolution of India Population Policy Timeline 1952 to National Population Policy 2000 MPPSC UPSC Notes",
        caption: "Timeline of Population Policy in India: From 1952 National Family Planning to National Population Policy 2000 (NPP-2000)",
      },
      {
        _type: "table",
        caption: "Historical Timeline of India Population Policies & Family Welfare Programmes",
        headers: ["Year", "Key Initiative / Policy", "Major Provisions & Directives"],
        rows: [
          ["**1952**", "**National Family Planning Programme**", "• **India became the first country in the world** to launch a national family planning programme.\n• Focus: Controlling population growth & improving maternal/child health."],
          ["**1961–62**", "**Expansion to Family Welfare Programme**", "• Scope expanded from clinical birth control to comprehensive **Family Welfare Programme**."],
          ["**1966**", "**Department of Family Planning**", "• Created a dedicated **Department of Family Planning** under the Ministry of Health."],
          ["**1976**", "**First National Population Policy (NPP-1976)**", "• First formal population policy statement.\n• Raised minimum marriage age for females from **15 to 18 years** and males from **18 to 21 years**.\n• **1971 Census Freeze**: Fixed parliamentary seat allocation and central financial assistance based on the 1971 Census until 2001."],
          ["**1997**", "**Reproductive and Child Health (RCH) Programme**", "• Launched **RCH Programme** targeting reduction in Maternal Mortality Ratio (MMR) and Infant Mortality Rate (IMR)."],
          ["**2000**", "**National Population Policy 2000 (NPP-2000)**", "• Formulated on the recommendations of the Dr. M.S. Swaminathan Committee.\n• **Long-term Goal**: Population stabilization by 2045."]
        ]
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "3. National Population Policy 2000 (NPP-2000): Key Objectives & Targets" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **1. Immediate Objective**: Meeting unmet needs for health infrastructure, health personnel, and providing integrated service delivery for basic reproductive and child healthcare." }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **2. Medium-term Target**: Bringing Total Fertility Rate (TFR) down to **2.1 (Replacement Level)** by the year 2010." }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **3. Long-term Target**: Achieving **population stabilization by 2045**, consistent with sustainable economic growth and social development." }]
      },
      {
        _type: "table",
        caption: "Key Socio-Demographic Targets of National Population Policy 2000",
        headers: ["Parameter / Domain", "NPP-2000 Targeted Goal"],
        rows: [
          ["**Infant Mortality Rate (IMR)**", "Reduce IMR to **below 30 per 1,000** live births."],
          ["**Maternal Mortality Ratio (MMR)**", "Reduce MMR to **below 100 per 100,000** live births."],
          ["**Total Fertility Rate (TFR)**", "Achieve replacement level TFR of **2.1**."],
          ["**Immunization**", "Achieve **100% universal immunization** of children against vaccine-preventable diseases."],
          ["**Institutional Deliveries**", "Achieve 100% institutional deliveries by trained health attendants."],
          ["**Free Primary Education**", "Promote free and compulsory primary education up to age 14."],
          ["**Age at Marriage**", "Promote delayed marriage for girls (preferably after 20 years)."],
          ["**Vital Registration**", "Achieve 100% registration of births, deaths, marriages, and pregnancies."]
        ]
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "4. Recent Population Control Initiatives & Demographic Dividend" }],
      },
      {
        _type: "image",
        asset: { _type: "reference", _ref: assetYouth._id },
        alt: "India Demographic Dividend Youth Skill Development Human Capital MPPSC UPSC Notes",
        caption: "India's Demographic Dividend: Harnessing youth potential through healthcare, skill development and quality education",
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **Mission Parivar Vikas**: Launched in 2016 across 145 high-fertility districts in 7 focus states (including Madhya Pradesh, UP, Bihar, Rajasthan) to accelerate family planning access." }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **National Health Mission (NHM)**: Janani Suraksha Yojana (JSY) and JSSK ensuring free maternal and child health services." }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **Demographic Dividend**: Over 65% of India's population belongs to the working-age group (15–59 years). Strategic investment in youth skill development transforms demographic growth into economic prosperity." }]
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "5. High-Yield Revision Takeaways & Memory Tricks" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "💡 **Memory Trick**: \"1952 Family Planning, 1966 Department, 1976 First Policy, 1997 RCH, 2000 NPP-2000 Policy.\"",
          },
        ],
      },
      {
        _type: "facts",
        items: [
          { label: "1952", value: "**National Family Planning Programme** (First in World)" },
          { label: "1961–62", value: "**Family Welfare Programme** Expansion" },
          { label: "1966", value: "**Department of Family Planning** Created" },
          { label: "1976", value: "**First National Population Policy** (Marriage Age 18 & 21)" },
          { label: "1997", value: "**RCH Programme** Launched" },
          { label: "2000", value: "**National Population Policy 2000 (NPP-2000)** (TFR 2.1 & 2045 Goal)" },
        ]
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
            text: "👉 [International Organizations & Headquarters List](/en/general-awareness/international-organizations-and-their-headquarters-mppsc-upsc-notes)",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "👉 [Disaster Management (Amendment) Act 2025: UDMA Section 41A Notes](/en/current-affairs/disaster-management-amendment-act-2025-mppsc-upsc-notes)",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "👉 [What is Disaster Management? NCERT Concepts & MPPSC Notes](/en/general-awareness/what-is-disaster-management-ncert-types-mppsc-notes)",
          },
        ],
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "7. Conclusion" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "India's population policy extends beyond birth control into maternal health, education, and human capital development. Understanding NPP-2000 targets (TFR 2.1, 2045 stabilization) is crucial for MPPSC and UPSC mains answer writing.",
          },
        ],
      },
    ],

    /* ─── BILINGUAL FAQS ─── */
    faqs: [
      {
        question: "भारत में पहली राष्ट्रीय जनसंख्या नीति की घोषणा किस वर्ष की गई थी?",
        questionEn: "In which year was the first National Population Policy announced in India?",
        answer: "भारत में पहली राष्ट्रीय जनसंख्या नीति की घोषणा वर्ष 1976 में की गई थी। इसके अंतर्गत लड़कियों के विवाह की न्यूनतम आयु 18 वर्ष और लड़कों की 21 वर्ष तय की गई थी।",
        answerEn: "The first National Population Policy in India was announced in 1976, raising legal marriage age to 18 for females and 21 for males."
      },
      {
        question: "राष्ट्रीय जनसंख्या नीति 2000 (NPP-2000) का मुख्य दीर्घकालिक लक्ष्य क्या है?",
        questionEn: "What is the primary long-term target of the National Population Policy 2000 (NPP-2000)?",
        answer: "NPP-2000 का दीर्घकालिक लक्ष्य वर्ष 2045 तक सतत आर्थिक विकास और सामाजिक प्रगति के अनुरूप भारत की जनसंख्या में स्थिरता (Population Stabilization) प्राप्त करना है।",
        answerEn: "The long-term goal of NPP-2000 is to achieve population stabilization by the year 2045."
      },
      {
        question: "प्रतिस्थापन स्तर कुल प्रजनन दर (Replacement Level TFR) क्या होता है?",
        questionEn: "What is Replacement Level Total Fertility Rate (TFR)?",
        answer: "प्रतिस्थापन स्तर TFR का मान 2.1 होता है। इसका तात्पर्य है कि एक पीढ़ी बिना जनसंख्या वृद्धि या कमी के अगली पीढ़ी को प्रतिस्थापित करती है। NPP-2000 में इसे 2010 तक प्राप्त करने का लक्ष्य रखा गया था।",
        answerEn: "Replacement level TFR is 2.1, where population exactly replaces itself from one generation to the next without migration."
      },
      {
        question: "विश्व में राष्ट्रीय स्तर पर परिवार नियोजन कार्यक्रम शुरू करने वाला पहला देश कौन सा है?",
        questionEn: "Which is the first country in the world to launch a national family planning programme?",
        answer: "भारत विश्व का पहला देश है जिसने वर्ष 1952 में राष्ट्रीय स्तर पर परिवार नियोजन कार्यक्रम (National Family Planning Programme) शुरू किया था।",
        answerEn: "India is the first country in the world to launch a national programme for family planning in 1952."
      },
      {
        question: "प्रजनन एवं बाल स्वास्थ्य कार्यक्रम (RCH Programme) किस वर्ष शुरू किया गया?",
        questionEn: "In which year was the Reproductive and Child Health (RCH) Programme launched?",
        answer: "RCH (Reproductive and Child Health Programme) वर्ष 1997 में शुरू किया गया था, जिसका उद्देश्य मातृ व शिशु मृत्यु दर को नियंत्रित करना था।",
        answerEn: "The RCH Programme was launched in 1997 focusing on maternal and child health care."
      },
      {
        question: "NPP-2000 में शिशु मृत्यु दर (IMR) और मातृ मृत्यु दर (MMR) का क्या लक्ष्य रखा गया था?",
        questionEn: "What targets were set for IMR and MMR under NPP-2000?",
        answer: "NPP-2000 में शिशु मृत्यु दर (IMR) को प्रति 1000 पर 30 से कम करने तथा मातृ मृत्यु दर (MMR) को प्रति 1 लाख जीवित जन्मों पर 100 से कम करने का लक्ष्य निर्धारित किया गया था।",
        answerEn: "NPP-2000 aimed to reduce IMR below 30 per 1,000 live births and MMR below 100 per 100,000 live births."
      },
      {
        question: "1976 की जनसंख्या नीति में परिसीमन हेतु किस जनगणना को आधार माना गया था?",
        questionEn: "Which census was fixed as the baseline under the 1976 Population Policy?",
        answer: "1976 की नीति के तहत संसद में राज्यों के प्रतिनिधित्व, परिसीमन एवं वित्तीय सहायता हेतु 1971 की जनगणना को वर्ष 2001 तक के लिए फ्रीज किया गया था।",
        answerEn: "The 1971 Census was fixed as the base for parliamentary seat representation and tax distribution until 2001."
      },
      {
        question: "'मिशन परिवार विकास' का मुख्य उद्देश्य क्या है?",
        questionEn: "What is the primary objective of Mission Parivar Vikas?",
        answer: "वर्ष 2016 में शुरू मिशन परिवार विकास का उद्देश्य उच्च प्रजनन दर (High TFR) वाले 7 राज्यों के 145 जिलों में परिवार नियोजन सेवाओं की पहुँच में तेजी से वृद्धि करना है।",
        answerEn: "Launched in 2016, Mission Parivar Vikas aims to accelerate access to family planning services in 145 high-fertility districts."
      },
      {
        question: "भारत की वर्तमान जनसंख्या नीति किस समिति की सिफारिशों पर आधारित थी?",
        questionEn: "On which committee's recommendations was the NPP-2000 drafted?",
        answer: "राष्ट्रीय जनसंख्या नीति 2000 का मसौदा प्रसिद्ध कृषि वैज्ञानिक डॉ. एम.एस. स्वामीनाथन की अध्यक्षता वाली विशेषज्ञ समिति की रिपोर्ट पर आधारित था।",
        answerEn: "The draft of NPP-2000 was based on the expert committee report headed by Dr. M.S. Swaminathan."
      },
      {
        question: "MPPSC मुख्य परीक्षा में जनसंख्या नीति से संबंधित किस प्रकार के प्रश्न पूछे जाते हैं?",
        questionEn: "What type of questions are asked on Population Policy in MPPSC Mains?",
        answer: "MPPSC Mains GS Paper-1 (भूगोल व जनसांख्यिकी) एवं GS Paper-2 (सामाजिक क्षेत्र व स्वास्थ्य) में जनसंख्या नीति का विकास, NPP-2000 की विशेषताएँ व जनसंख्या नियंत्रण के उपायों पर 5 और 11 अंकों के प्रश्न पूछे जाते हैं।",
        answerEn: "In MPPSC Mains, 5-mark and 11-mark questions are asked on the evolution of population policy, NPP-2000 features, and demographic challenges."
      }
    ],

    /* ─── BILINGUAL MCQS ─── */
    mcqs: [
      {
        question: "भारत में पहली राष्ट्रीय जनसंख्या नीति की घोषणा किस वर्ष की गई थी?",
        questionEn: "In which year was the first National Population Policy announced in India?",
        options: ["A. 1952", "B. 1966", "C. 1976", "D. 2000"],
        optionsEn: ["A. 1952", "B. 1966", "C. 1976", "D. 2000"],
        correctIndex: 2,
        explanation: "भारत सरकार ने पहली बार वर्ष 1976 में औपचारिक 'राष्ट्रीय जनसंख्या नीति' घोषित की थी, जिसके तहत विवाह की न्यूनतम आयु बढ़ाई गई थी।",
        explanationEn: "India announced its first formal National Population Policy in 1976, which raised the legal marriage age."
      },
      {
        question: "राष्ट्रीय जनसंख्या नीति 2000 (NPP-2000) के अनुसार कुल प्रजनन दर (TFR) का प्रतिस्थापन स्तर कितना निर्धारित किया गया है?",
        questionEn: "What replacement level of Total Fertility Rate (TFR) was set under NPP-2000?",
        options: ["A. 1.8", "B. 2.1", "C. 2.5", "D. 3.0"],
        optionsEn: ["A. 1.8", "B. 2.1", "C. 2.5", "D. 3.0"],
        correctIndex: 1,
        explanation: "NPP-2000 में वर्ष 2010 तक कुल प्रजनन दर (TFR) को घटाकर 2.1 (प्रतिस्थापन स्तर) पर लाने का मध्यमकालिक लक्ष्य रखा गया था।",
        explanationEn: "NPP-2000 targeted achieving a replacement level TFR of 2.1 by 2010."
      },
      {
        question: "भारत सरकार द्वारा वर्ष 2045 तक जनसंख्या स्थिरता प्राप्त करने का लक्ष्य किस नीति में निर्धारित किया गया था?",
        questionEn: "In which policy was the target of population stabilization by 2045 set?",
        options: ["A. राष्ट्रीय जनसंख्या नीति 1976", "B. राष्ट्रीय जनसंख्या नीति 2000", "C. राष्ट्रीय स्वास्थ्य नीति 2017", "D. 1952 परिवार नियोजन नीति"],
        optionsEn: ["A. National Population Policy 1976", "B. National Population Policy 2000", "C. National Health Policy 2017", "D. 1952 Family Planning Policy"],
        correctIndex: 1,
        explanation: "राष्ट्रीय जनसंख्या नीति 2000 (NPP-2000) का मुख्य दीर्घकालिक लक्ष्य वर्ष 2045 तक जनसंख्या स्थिरता प्राप्त करना है।",
        explanationEn: "NPP-2000 set the long-term objective of population stabilization by the year 2045."
      },
      {
        question: "'प्रजनन एवं बाल स्वास्थ्य कार्यक्रम (RCH Programme)' की शुरुआत किस वर्ष की गई थी?",
        questionEn: "In which year was the Reproductive and Child Health (RCH) Programme launched?",
        options: ["A. 1952", "B. 1976", "C. 1997", "D. 2005"],
        optionsEn: ["A. 1952", "B. 1976", "C. 1997", "D. 2005"],
        correctIndex: 2,
        explanation: "भारत में प्रजनन एवं बाल स्वास्थ्य कार्यक्रम (RCH Programme) की शुरुआत वर्ष 1997 में की गई थी।",
        explanationEn: "The RCH Programme was launched in India in 1997."
      },
      {
        question: "राष्ट्रीय जनसंख्या नीति 1976 के तहत लड़कियों के विवाह की न्यूनतम आयु बढ़ाकर कितनी की गई थी?",
        questionEn: "What was the minimum marriage age for females raised to under the 1976 Population Policy?",
        options: ["A. 15 वर्ष से 18 वर्ष", "B. 14 वर्ष से 16 वर्ष", "C. 18 वर्ष से 21 वर्ष", "D. 16 वर्ष से 18 वर्ष"],
        optionsEn: ["A. 15 years to 18 years", "B. 14 years to 16 years", "C. 18 years to 21 years", "D. 16 years to 18 years"],
        correctIndex: 0,
        explanation: "1976 की नीति में लड़कियों के विवाह की न्यूनतम आयु 15 से बढ़ाकर 18 वर्ष तथा लड़कों की 18 से बढ़ाकर 21 वर्ष की गई थी।",
        explanationEn: "The 1976 policy raised female marriage age from 15 to 18 years and male marriage age from 18 to 21 years."
      },
      {
        question: "विश्व में राष्ट्रीय स्तर पर परिवार नियोजन कार्यक्रम शुरू करने वाला प्रथम देश कौन सा है?",
        questionEn: "Which is the first country in the world to launch a national family planning programme?",
        options: ["A. चीन", "B. भारत", "C. अमेरिका", "D. जापान"],
        optionsEn: ["A. China", "B. India", "C. USA", "D. Japan"],
        correctIndex: 1,
        explanation: "भारत वर्ष 1952 में राष्ट्रीय स्तर पर परिवार नियोजन कार्यक्रम लागू करने वाला दुनिया का पहला देश बना था।",
        explanationEn: "India was the first country in the world to launch a national family planning programme in 1952."
      },
      {
        question: "राष्ट्रीय जनसंख्या नीति 2000 के तहत शिशु मृत्यु दर (IMR) को घटाकर कितना लाने का लक्ष्य रखा गया था?",
        questionEn: "What target was set for Infant Mortality Rate (IMR) under NPP-2000?",
        options: ["A. प्रति 1000 पर 50 से कम", "B. प्रति 1000 पर 30 से कम", "C. प्रति 1000 पर 20 से कम", "D. प्रति 1000 पर 10 से कम"],
        optionsEn: ["A. Below 50 per 1000", "B. Below 30 per 1000", "C. Below 20 per 1000", "D. Below 10 per 1000"],
        correctIndex: 1,
        explanation: "NPP-2000 में शिशु मृत्यु दर (IMR) को प्रति 1,000 जीवित जन्मों पर 30 से कम करने का सामाजिक लक्ष्य रखा गया था।",
        explanationEn: "NPP-2000 aimed to reduce Infant Mortality Rate (IMR) below 30 per 1,000 live births."
      },
      {
        question: "भारत के 145 उच्च प्रजनन दर वाले जिलों में परिवार नियोजन पहुँच बढ़ाने हेतु कौन सा मिशन शुरू किया गया है?",
        questionEn: "Which mission was launched to improve family planning access in 145 high-fertility districts?",
        options: ["A. मिशन परिवार विकास", "B. राष्ट्रीय स्वास्थ्य मिशन", "C. मिशन इन्द्रधनुष", "D. जननी सुरक्षा योजना"],
        optionsEn: ["A. Mission Parivar Vikas", "B. National Health Mission", "C. Mission Indradhanush", "D. Janani Suraksha Yojana"],
        correctIndex: 0,
        explanation: "वर्ष 2016 में केंद्र सरकार द्वारा 145 उच्च TFR जिलों में 'मिशन परिवार विकास' शुरू किया गया था।",
        explanationEn: "Mission Parivar Vikas was launched in 2016 targeting 145 high-fertility districts across 7 states."
      }
    ]
  };

  console.log(`📝 Syncing Fully Bilingual India Population Policy Article "${articleDoc._id}" to Sanity CMS...`);
  const res = await client.createOrReplace(articleDoc);
  console.log(`🎉 SUCCESS! Fully Bilingual Article uploaded & published in Sanity CMS. Document ID: ${res._id}`);
  console.log(`URL slug: ${res.slug.current}`);
}

main().catch((err) => {
  console.error("❌ Error uploading India Population Policy article:", err);
  process.exit(1);
});
