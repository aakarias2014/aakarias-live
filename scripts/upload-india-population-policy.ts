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
  console.log("🚀 Uploading Complete Expanded & Fully Bilingual Population Policy Article to Sanity CMS...");

  const publicBlogDir = path.resolve(process.cwd(), "public/images/blog");
  const destHealth = path.join(publicBlogDir, "india_population_policy_family_welfare_healthcare.png");
  const destInfographic = path.join(publicBlogDir, "national_population_policy_2000_targets_infographic.png");
  const destYouth = path.join(publicBlogDir, "india_demographic_dividend_youth_development.png");

  let assetHealthRef: string | undefined = undefined;
  let assetInfographicRef: string | undefined = undefined;
  let assetYouthRef: string | undefined = undefined;

  if (fs.existsSync(destHealth)) {
    const assetHealth = await client.assets.upload("image", fs.createReadStream(destHealth), {
      filename: "india_population_policy_family_welfare_healthcare.png",
    });
    assetHealthRef = assetHealth._id;
  }
  if (fs.existsSync(destInfographic)) {
    const assetInfographic = await client.assets.upload("image", fs.createReadStream(destInfographic), {
      filename: "national_population_policy_2000_targets_infographic.png",
    });
    assetInfographicRef = assetInfographic._id;
  }
  if (fs.existsSync(destYouth)) {
    const assetYouth = await client.assets.upload("image", fs.createReadStream(destYouth), {
      filename: "india_demographic_dividend_youth_development.png",
    });
    assetYouthRef = assetYouth._id;
  }

  const docId = "gk-india-population-policy-notes";
  const slug = "population-policy-of-india-npp-2000-mppsc-upsc-notes";

  const articleDoc = {
    _id: docId,
    _type: "staticGk",
    title: "भारत की जनसंख्या नीति: विकास, राष्ट्रीय जनसंख्या नीति 2000, जनगणना 2011 आंकड़े एवं कानून | MPPSC & UPSC Notes",
    titleEn: "Population Policy of India: Evolution, NPP-2000, Census 2011 Data, Cairo Model & Legislation | MPPSC & UPSC Notes",
    slug: { _type: "slug", current: slug },
    category: { _type: "reference", _ref: "cat-misc" },
    ca_date: "2026-07-29",
    publishedAt: new Date().toISOString(),
    featured: true,
    readingTime: 14,
    tags: [
      { _type: "reference", _ref: "tag-mppsc" },
      { _type: "reference", _ref: "tag-upsc" },
      { _type: "reference", _ref: "tag-prelims" },
      { _type: "reference", _ref: "tag-mains" },
    ],
    excerpt: "आज़ादी के बाद भारत की जनसंख्या नीति (1952 परिवार नियोजन, 1976 पहली नीति, NPP-2000 स्वामीनाथन समिति), काहिरा मॉडल 1996, राष्ट्रीय जनसंख्या आयोग, जनगणना 2011 संपूर्ण आंकड़े, जनसंख्या वृद्धि के कारण, फायदे, नुकसान, NCRWC सिफारिशें व समाधान। MPPSC & UPSC सम्पूर्ण नोट्स।",
    excerptEn: "Comprehensive exam notes on Population Policy of India post-independence (1952 Family Planning, 1976 Policy, NPP-2000 Swaminathan Committee), Cairo Model 1996, National Commission on Population, Census 2011 statistics, causes of growth, benefits, drawbacks, NCRWC recommendations & solutions for MPPSC & UPSC.",
    seoTitle: "भारत की जनसंख्या नीति | National Population Policy 2000 & Census 2011 | MPPSC & UPSC Notes",
    seoDescription: "भारत की जनसंख्या नीति (NPP-2000), 1952 परिवार नियोजन, 1976 पहली नीति, काहिरा मॉडल, जनगणना 2011 आंकड़े, राष्ट्रीय जनसंख्या आयोग, NCRWC सिफारिशें, जनसंख्या वृद्धि के कारण, फायदे, नुकसान व समाधान। MPPSC & UPSC सम्पूर्ण नोट्स।",
    keywords: [
      "भारत की जनसंख्या नीति",
      "आज़ादी के बाद भारत की जनसंख्या नीति",
      "राष्ट्रीय जनसंख्या नीति 2000",
      "National Population Policy 2000",
      "NPP 2000",
      "काहिरा मॉडल 1996",
      "राष्ट्रीय जनसंख्या आयोग",
      "राष्ट्रीय जनसंख्या स्थिरता कोष",
      "जनगणना 2011 आंकड़े",
      "जनसंख्या वृद्धि के कारण और निवारण",
      "जनसंख्या लाभांश",
      "NCRWC जनसंख्या नियंत्रण कानून",
      "MPPSC Notes",
      "UPSC Notes"
    ],
    ...(assetHealthRef ? {
      featuredImage: {
        _type: "image",
        asset: { _type: "reference", _ref: assetHealthRef },
        alt: "India Population Policy Family Welfare Healthcare Census 2011 MPPSC UPSC Notes",
      }
    } : {}),

    /* ────────────── HINDI BODY ────────────── */
    body: [
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "1. स्वतंत्रता पश्चात भारत में जनसंख्या नीति का ऐतिहासिक विकास (1952 से 2000)" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "भारत दुनिया का पहला ऐसा देश है जिसने सबसे पहले वर्ष ",
          },
          {
            _type: "span",
            marks: ["strong"],
            text: "1952 में राष्ट्रीय परिवार नियोजन कार्यक्रम (National Family Planning Programme)",
          },
          {
            _type: "span",
            text: " को अपनाया। स्वतंत्रता के बाद प्रथम पंचवर्षीय योजना (1951–56) में ही तीव्र गति से बढ़ती आबादी को देश के आर्थिक एवं सामाजिक विकास के बाधक के तौर पर चिन्हित किया गया था। तभी से विभिन्न पंचवर्षीय योजनाओं में जनसंख्या नियंत्रण एवं परिवार कल्याण के लिए निरंतर प्रयास किए जाते रहे हैं।",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **1960 की विशेषज्ञ समिति**: भारत में सबसे पहले एक समर्पित जनसंख्या नीति बनाने का औपचारिक सुझाव वर्ष 1960 में गठित एक विशेषज्ञ समूह ने दिया था।" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **पहली राष्ट्रीय जनसंख्या नीति (1976)**: वर्ष 1976 में देश की पहली औपचारिक राष्ट्रीय जनसंख्या नीति की घोषणा की गई (बाद में 1981 में इसमें कुछ संशोधन किए गए)। इस नीति के मुख्य लक्ष्य जन्म दर में कमी लाना, विवाह की न्यूनतम आयु में वृद्धि (लड़कियों हेतु 18 वर्ष व लड़कों हेतु 21 वर्ष), परिवार नियोजन को प्रोत्साहित करना और महिला शिक्षा पर विशेष जोर देना था।" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **राष्ट्रीय जनसंख्या नीति, 2000 (NPP-2000)**: फरवरी 2000 में भारत सरकार ने नई राष्ट्रीय जनसंख्या नीति की घोषणा की। यह नीति प्रसिद्ध कृषि वैज्ञानिक **डॉ. एम. एस. स्वामीनाथन** की अध्यक्षता में गठित विशेषज्ञ दल की रिपोर्ट पर आधारित थी। इसका मुख्य उद्देश्य प्रजनन तथा शिशु स्वास्थ्य देखभाल हेतु बुनियादी ढाँचा मजबूत करना तथा दीर्घकालिक लक्ष्य वर्ष **2045 तक जनसंख्या में स्थायित्व** प्राप्त करना है।" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **काहिरा मॉडल (Cairo Model 1996)**: आबादी पर काबू पाने के लिहाज़ से भारत में वर्ष 1996 से काहिरा मॉडल लागू है। इसके तहत आबादी घटाने के लिए आम जनता पर किसी प्रकार का दबाव या जबरदस्ती नहीं डाली जाती, बल्कि शिक्षा व जन-जागरूकता के ज़रिए उनमें छोटे परिवार का अहसास जगाया जाता है। वर्तमान में संपूर्ण विश्व में यही काहिरा मॉडल लागू है।" }],
      },

      /* ── 2. National Commission on Population ── */
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "2. राष्ट्रीय जनसंख्या आयोग एवं राष्ट्रीय जनसंख्या स्थिरता कोष" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "मई 2000 में भारत के प्रधानमंत्री की अध्यक्षता में ",
          },
          {
            _type: "span",
            marks: ["strong"],
            text: "राष्ट्रीय जनसंख्या आयोग (National Commission on Population)",
          },
          {
            _type: "span",
            text: " का गठन किया गया। इस आयोग के प्रमुख कार्य निम्नलिखित हैं:",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **1. नीति समीक्षा**: राष्ट्रीय जनसंख्या नीति के क्रियान्वयन की समय-समय पर समीक्षा करना।" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **2. निगरानी एवं निर्देशन**: जनसंख्या नियंत्रण कार्यक्रमों की निगरानी करना और आवश्यक नीतिगत दिशा-निर्देश देना।" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **3. अंतर-क्षेत्रीय सहक्रिया**: स्वास्थ्य, शैक्षणिक, पर्यावरणीय और विकास कार्यक्रमों के मध्य सहक्रिया (Synergy) को बढ़ावा देना।" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **4. संस्थागत तालमेल**: कार्यक्रमों की योजना बनाने व क्रियान्वयन करने में अंतर-क्षेत्रीय (Inter-sectoral) तालमेल स्थापित करना।" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "📌 **राष्ट्रीय जनसंख्या स्थिरता कोष (JJSK)**: इस आयोग के अंतर्गत 'राष्ट्रीय जनसंख्या स्थिरता कोष' की स्थापना की गई थी, जिसे बाद में स्वास्थ्य और परिवार कल्याण मंत्रालय के अंतर्गत स्थानांतरित कर दिया गया।",
          },
        ],
      },

      /* ── 3. Census 2011 Facts & Key Demographic Metrics ── */
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "3. भारत में जनगणना 2011 एवं स्वास्थ्य सर्वे के महत्वपूर्ण आंकड़े" }],
      },
      ...(assetInfographicRef ? [{
        _type: "image",
        asset: { _type: "reference", _ref: assetInfographicRef },
        alt: "Census 2011 Key Demographic Facts India Population Policy MPPSC UPSC Notes",
        caption: "जनगणना 2011: भारत के प्रमुख जनसांख्यिकीय आंकड़े व साक्षरता दर",
      }] : []),
      {
        _type: "table",
        caption: "जनगणना 2011 एवं स्वास्थ्य सूचकांकों के प्रामाणिक आंकड़े (MPPSC & UPSC)",
        headers: ["जनसांख्यिकीय मापदंड / सूचकांक", "प्रामाणिक आंकड़ा (Census 2011 / NFHS)"],
        rows: [
          ["**भारत की कुल जनसंख्या (2011)**", "**1,21,08,54,977 (121.08 करोड़)**"],
          ["**पुरुष जनसंख्या की हिस्सेदारी**", "**51.47%**"],
          ["**महिला जनसंख्या की हिस्सेदारी**", "**48.53%**"],
          ["**0–6 वर्ष आयु वर्ग के बच्चों की हिस्सेदारी**", "**13.6%**"],
          ["**दशकीय जनसंख्या वृद्धि दर (2001–2011)**", "**17.7%**"],
          ["**वार्षिक जनसंख्या वृद्धि दर**", "**1.64%**"],
          ["**कुल लिंगानुपात (Sex Ratio)**", "**943 महिलाएँ प्रति 1000 पुरुष**"],
          ["**बाल लिंगानुपात (Child Sex Ratio 0-6)**", "**919 बालिकाएँ प्रति 1000 बालक**"],
          ["**कुल साक्षरता दर (Literacy Rate)**", "**73.0%**"],
          ["**पुरुष साक्षरता दर**", "**80.9%**"],
          ["**महिला साक्षरता दर**", "**64.6%**"],
          ["**जनसंख्या घनत्व (2011)**", "**382 व्यक्ति प्रति वर्ग किमी** (2001 में 325/किमी²)"],
          ["**ग्रामीण जनसंख्या की हिस्सेदारी**", "**68.84%**"],
          ["**शहरी जनसंख्या की हिस्सेदारी**", "**31.16%**"],
          ["**जनसंख्या की दृष्टि से सबसे बड़ा राज्य**", "**उत्तर प्रदेश**"],
          ["**जनसंख्या की दृष्टि से सबसे छोटा राज्य**", "**सिक्किम**"],
          ["**शिशु मृत्यु दर (IMR - 2016)**", "**34 प्रति 1,000 जीवित जन्म**"],
          ["**जन्म दर (Crude Birth Rate - 2016)**", "**20.4 प्रति 1,000**"],
          ["**मृत्यु दर (Crude Death Rate - 2016)**", "**6.4 प्रति 1,000**"],
          ["**मातृ मृत्यु दर (MMR - 2014-16)**", "**130 प्रति 1 लाख जीवित जन्म**"],
          ["**NFHS-4 (2015-16) कुल प्रजनन दर (TFR)**", "**2.18** (वैश्विक प्रतिस्थापन दर 2.30 से कम)"]
        ]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "📌 **UN रिपोर्ट का अनुमान**: वर्ष 2017 में संयुक्त राष्ट्र के आर्थिक और सामाजिक मामले विभाग (UN DESA) द्वारा जारी 'द वर्ल्ड पापुलेशन प्रॉस्पेक्ट्स: 2017 रिवीजन' रिपोर्ट में अनुमान लगाया गया था कि भारत की आबादी 7 वर्षों में चीन से अधिक हो जाएगी।",
          },
        ],
      },

      /* ── 4. Causes of Population Growth ── */
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "4. भारत में जनसंख्या वृद्धि के मुख्य कारण" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **1. जीवन प्रत्याशा में वृद्धि**: आधुनिक चिकित्सा सुविधाओं एवं टीकाकरण के कारण औसत जीवन प्रत्याशा बढ़ी है तथा मृत्यु दर में भारी गिरावट आई है।" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **2. परिवार नियोजन एवं साधनों की कमी**: ग्रामीण व दूरस्थ क्षेत्रों में गर्भनिरोधक साधनों एवं परिवार नियोजन की पर्याप्त जानकारी व उपलब्धता का अभाव।" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **3. बाल विवाह**: कम उम्र में विवाह होने के कारण महिलाओं की प्रजनन अवधि लंबी हो जाती है।" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **4. अशिक्षा एवं जागरूकता का अभाव**: विशेष रूप से महिला साक्षरता की कमी से परिवार नियोजन का महत्व न समझ पाना।" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **5. धार्मिक कारण एवं रूढ़िवादिता**: पुत्र प्राप्ति की सामाजिक लालसा तथा परिवार नियोजन के प्रति पारंपरिक भ्रांतियाँ।" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **6. गरीबी**: निर्धन परिवारों में अधिक बच्चों को अतिरिक्त आय कमाने वाले हाथ के रूप में देखा जाना।" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **7. अवैध प्रवास (Illegal Migration)**: पड़ौसी देशों से होने वाले अवैध प्रवासन के कारण सीमावर्ती राज्यों में जनसंख्या का दबाव बढ़ना।" }]
      },

      /* ── 5. Benefits & Advantages of Demographic Dividend ── */
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "5. जनसंख्या वृद्धि के सकारात्मक पहलू एवं जनसांख्यिकीय लाभांश" }],
      },
      ...(assetYouthRef ? [{
        _type: "image",
        asset: { _type: "reference", _ref: assetYouthRef },
        alt: "Demographic Dividend Youth Advantage Skill Development MPPSC UPSC Notes",
        caption: "भारत का जनसांख्यिकीय लाभांश: युवा कार्यशील आबादी राष्ट्रीय विकास की रीढ़",
      }] : []),
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "यदि जनसंख्या वृद्धि को एक सकारात्मक दृष्टिकोण से देखा जाए, तो भारत जैसे विकासशील देश के लिए यह एक बड़ा अवसर सिद्ध हो सकती है:",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **1. जनसांख्यिकीय लाभांश (Demographic Dividend)**: भारत में कुल आबादी में कार्यशील उम्र (15-59 वर्ष) का अनुपात बहुत अधिक है। 2011 की जनगणना के अनुसार भारत की लगभग **50% आबादी 25 वर्ष से कम आयु** की है। यह युवा आबादी देश के तेज़ आर्थिक विकास का संवाहक बन सकती है।" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **2. मानव संसाधन में बढ़ोतरी (Human Capital)**: कुशल श्रम (Skilled Labour), मानव संसाधनों का वैश्विक निर्यात, और प्रतिस्पर्धी लागत पर श्रम की उपलब्धता भारत को विनिर्माण व सेवा क्षेत्र में वैश्विक केंद्र बना सकती है।" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **3. विशाल घरेलू बाजार (Huge Consumer Market)**: विशाल जनसंख्या विदेशी व घरेलू कंपनियों के लिए एक बड़ा उपभोक्ता बाजार प्रदान करती है, जिससे प्रत्यक्ष विदेशी निवेश (FDI) आकर्षित होता है।" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **4. शक्तिशाली सैन्य बल**: पर्याप्त मानव संसाधन के कारण भारत के पास दुनिया की सबसे बड़ी और मजबूत थल सेनाओं में से एक है।" }]
      },

      /* ── 6. Drawbacks & Challenges of Overpopulation ── */
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "6. जनसंख्या विस्फोट के नुकसान एवं गंभीर सामाजिक-आर्थिक चुनौतियाँ" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "अनियंत्रित जनसंख्या वृद्धि भारत के बुनियादी विकास में कई गंभीर बाधएँ उत्पन्न करती है:",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **1. बेरोजगारी (Unemployment)**: पूंजीगत साधनों की कमी के कारण सभी युवाओं के लिए पर्याप्त रोजगार के अवसर सृजित करना सबसे बड़ी चुनौती है।" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **2. खाद्य सुरक्षा एवं कुपोषण**: बढ़ती मांग के कारण खाद्यान्न आपूर्ति पर दबाव, बच्चों व महिलाओं में कुपोषण की समस्या।" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **3. प्रति व्यक्ति आय व निर्धनता**: प्रति व्यक्ति निम्न आय, निर्धनता रेखा के नीचे जीवन यापन करने वाली आबादी में वृद्धि और महंगाई।" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **4. जनोपयोगी सेवाओं पर अतिरिक्त व्यय**: स्वास्थ्य, शिक्षा, परिवहन और आवास जैसे बुनियादी बुनियादी ढाँचे पर अत्यधिक वित्तीय बोझ।" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **5. कृषि एवं पर्यावरण पर दबाव**: भूमि का विखंडन, वनों की कटाई, जल संकट और अनियंत्रित शहरीकरण व पलायन।" }]
      },

      /* ── 7. Constitution Review Commission (NCRWC) & Legislation Proposals ── */
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "7. संविधान समीक्षा आयोग (NCRWC) की सिफारिशें एवं जनसंख्या नियंत्रण कानून" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "वर्ष 2000 में गठित ",
          },
          {
            _type: "span",
            marks: ["strong"],
            text: "संविधान के कार्यकरण की समीक्षा के लिए राष्ट्रीय आयोग (NCRWC - जस्टिस एम.एन. वेंकटचेलैया आयोग)",
          },
          {
            _type: "span",
            text: " ने व्यापक विचार-विमर्श के बाद जनसंख्या नियंत्रण हेतु महत्वपूर्ण सुझाव दिए थे:",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **अनुच्छेद 47A का समावेश**: NCRWC ने संविधान के नीति निर्देशक तत्वों के अंतर्गत **अनुच्छेद 47A (Article 47A)** शामिल करने और एक सख्त जनसंख्या नियंत्रण कानून बनाने का सुझाव दिया था।" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **अन्य कानूनों से तुलना**: NCRWC की सिफारिश पर मनरेगा (MGNREGA), शिक्षा का अधिकार (RTE), सूचना का अधिकार (RTI) और खाद्य सुरक्षा अधिकार (Right to Food) जैसे कानून बने, परंतु जनसंख्या नियंत्रण कानून पर विधायी सहमति नहीं बन सकी।" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **दो बच्चों का नियम (Two-Child Norm Proposal)**: जनहित याचिकाओं में सुझाव दिया गया है कि केंद्र सरकार सरकारी नौकरियों, वित्तीय सहायता व सब्सिडी हेतु दो बच्चों का नियम लागू कर सकती है तथा इसका उल्लंघन करने पर कुछ चुनावी व कानूनी अधिकारों को प्रतिबंधित किया जा सकता है।" }]
      },
      {
        _type: "table",
        caption: "संसाधन व जनसंख्या की दृष्टि से भारत एवं चीन की तुलना",
        headers: ["मापदंड", "भारत की स्थिति", "चीन की स्थिति / तुलना"],
        rows: [
          ["**वैश्विक कृषि योग्य भूमि**", "**मात्र 2%**", "भारत के पास वैश्विक भूमि का 2.4% भाग"],
          ["**वैश्विक पीने योग्य पानी**", "**मात्र 4%**", "भारत के पास वैश्विक जल संसाधनों का 4%"],
          ["**वैश्विक जनसंख्या हिस्सेदारी**", "**लगभग 18% - 20%**", "विश्व की 18% से अधिक जनसंख्या"],
          ["**भौगोलिक क्षेत्रफल**", "**32.87 लाख वर्ग किमी**", "चीन का क्षेत्रफल भारत से **लगभग 3 गुना बड़ा**"],
          ["**जनसंख्या वृद्धि दर**", "प्रति मिनट **33 बच्चे** पैदा होते हैं", "चीन में प्रति मिनट **11 बच्चे** पैदा होते हैं"]
        ]
      },

      /* ── 8. Measures & Solutions ── */
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "8. जनसंख्या स्थायित्व हेतु भावी राह एवं आवश्यक उपाय" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **1. महिला शिक्षा व सशक्तिकरण**: महिला साक्षरता दर बढ़ाने पर विशेष ध्यान देना, क्योंकि साक्षर महिलाएँ परिवार नियोजन के प्रति अधिक जागरूक होती हैं।" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **2. विवाह की न्यूनतम आयु का सख्ती से पालन**: बाल विवाह रोकथाम अधिनियम का कड़ाई से पालन कराना।" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **3. परिवार नियोजन सेवाओं की सुलभता**: आशा (ASHA) कार्यकर्ताओं के माध्यम से प्राथमिक स्वास्थ्य केंद्रों पर गर्भनिरोधक साधनों की होम-डिलीवरी व गुणवत्तापूर्ण सेवाएँ पहुँचाना।" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **4. सार्वजनिक स्वास्थ्य एवं संस्थागत प्रसव**: मातृ व शिशु मृत्यु दर घटाने हेतु संस्थागत प्रसव (Institutional Delivery) को प्रोत्साहन।" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **5. संतुलित क्षेत्रीय विकास एवं औद्योगीकरण**: ग्रामीण क्षेत्रों में रोजगार सृजित कर शहरों की ओर अनियंत्रित पलायन रोकना।" }]
      },

      /* ── 9. High-Yield Revision Takeaways ── */
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "9. MPPSC एवं UPSC परीक्षा हेतु त्वरित स्मरणीय बिंदु" }],
      },
      {
        _type: "facts",
        items: [
          { label: "1952", value: "**राष्ट्रीय परिवार नियोजन कार्यक्रम** (विश्व में पहला देश)" },
          { label: "1976", value: "**पहली राष्ट्रीय जनसंख्या नीति** (विवाह आयु 18 व 21 वर्ष)" },
          { label: "1996", value: "**काहिरा मॉडल (Cairo Model)** (स्वेच्छा व शिक्षा पर आधारित)" },
          { label: "2000", value: "**राष्ट्रीय जनसंख्या नीति 2000 (NPP-2000)** (स्वामीनाथन समिति, 2045 तक स्थायित्व लक्ष्य)" },
          { label: "मई 2000", value: "**राष्ट्रीय जनसंख्या आयोग** (अध्यक्ष: भारत के प्रधानमंत्री)" },
          { label: "जनगणना 2011", value: "**कुल जनसंख्या 121.08 करोड़ | लिंगानुपात 943 | साक्षरता 73% | घनत्व 382/किमी²**" },
          { label: "NCRWC सुझाव", value: "**संविधान में अनुच्छेद 47A जोड़ने का प्रस्ताव**" }
        ]
      },

      /* ── 10. Interlinking ── */
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "10. संबंधित अध्ययन सामग्री एवं नोट्स" }],
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
        style: "normal",
        children: [
          {
            _type: "span",
            text: "👉 [MPPSC 2026 नवीन पाठ्यक्रम, परीक्षा पैटर्न व संपूर्ण रणनीति](/mppsc/syllabus-2026)",
          },
        ],
      },

      /* ── 11. Conclusion ── */
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "11. निष्कर्ष" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "भारत की जनसंख्या नीति केवल जन्म दर को नियंत्रित करने तक सीमित नहीं है, बल्कि यह मानव पूंजी निर्माण, शिक्षा, महिला अधिकार एवं सतत विकास से जुड़ी एक व्यापक राष्ट्रीय रणनीति है। काहिरा मॉडल के सिद्धांतों के अनुरूप शिक्षा और स्वास्थ्य सेवाओं के विस्तार से ही भारत अपनी विशाल जनसंख्या को जनसांख्यिकीय लाभांश में परिवर्तित कर सकता है।",
          },
        ],
      },
    ],

    /* ────────────── ENGLISH BODY ────────────── */
    bodyEn: [
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "1. Historical Evolution of Population Policy in India Post-Independence (1952 to 2000)" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "India holds the distinction of being the first country in the world to launch an official ",
          },
          {
            _type: "span",
            marks: ["strong"],
            text: "National Family Planning Programme in 1952",
          },
          {
            _type: "span",
            text: ". Right from the First Five-Year Plan (1951–56), rapid population growth was identified as a major bottleneck to economic development. Subsequent Five-Year Plans progressively incorporated population stabilization measures.",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **1960 Expert Group Recommendation**: An expert group appointed in 1960 first formally recommended formulating a dedicated national population policy." }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **First National Population Policy (1976)**: India's first formal National Population Policy was announced in 1976 (amended in 1981). Key objectives included lowering birth rates, raising the legal minimum age at marriage (18 for females, 21 for males), promoting family planning, and emphasizing female education." }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **National Population Policy 2000 (NPP-2000)**: Announced in February 2000 based on the recommendations of the Dr. M.S. Swaminathan Expert Committee. It set the long-term target of **population stabilization by the year 2045**." }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **Cairo Model (1996)**: Since 1996, India has adopted the Cairo Model of population management. Under this approach, population control relies on voluntary choices, education, and health empowerment rather than coercion or forced targets." }]
      },

      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "2. National Commission on Population & Stabilization Fund" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "In May 2000, the ",
          },
          {
            _type: "span",
            marks: ["strong"],
            text: "National Commission on Population",
          },
          {
            _type: "span",
            text: " was established under the chairmanship of the Prime Minister of India. Its mandated functions include:",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **1. Policy Review**: Reviewing the implementation of the National Population Policy periodically." }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **2. Monitoring & Direction**: Monitoring population control programmes and providing policy direction." }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **3. Synergizing Sectoral Schemes**: Promoting synergy across health, educational, environmental, and developmental programmes." }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **4. Inter-Sectoral Coordination**: Fostering inter-sectoral coordination in planning and execution." }]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "📌 **National Population Stabilization Fund**: Established under the Commission and later transferred under the Ministry of Health and Family Welfare.",
          },
        ],
      },

      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "3. Census 2011 Key Demographic Facts & Health Indicators" }],
      },
      {
        _type: "table",
        caption: "Key Demographic Data from Census 2011 & Health Surveys for MPPSC & UPSC",
        headers: ["Demographic Indicator / Parameter", "Official Metric (Census 2011 / NFHS)"],
        rows: [
          ["**Total Population of India (2011)**", "**1,21,08,54,977 (121.08 Crore)**"],
          ["**Male Population Share**", "**51.47%**"],
          ["**Female Population Share**", "**48.53%**"],
          ["**0–6 Years Child Share**", "**13.6%**"],
          ["**Decadal Population Growth (2001–2011)**", "**17.7%**"],
          ["**Annual Population Growth Rate**", "**1.64%**"],
          ["**Overall Sex Ratio**", "**943 Females per 1000 Males**"],
          ["**Child Sex Ratio (0-6 Years)**", "**919 Girls per 1000 Boys**"],
          ["**Total Literacy Rate**", "**73.0%**"],
          ["**Male Literacy Rate**", "**80.9%**"],
          ["**Female Literacy Rate**", "**64.6%**"],
          ["**Population Density (2011)**", "**382 persons per sq. km** (325 in 2001)"],
          ["**Rural Population Share**", "**68.84%**"],
          ["**Urban Population Share**", "**31.16%**"],
          ["**Most Populous State**", "**Uttar Pradesh**"],
          ["**Least Populous State**", "**Sikkim**"],
          ["**Infant Mortality Rate (IMR 2016)**", "**34 per 1,000 live births**"],
          ["**Crude Birth Rate (2016)**", "**20.4 per 1,000**"],
          ["**Crude Death Rate (2016)**", "**6.4 per 1,000**"],
          ["**Maternal Mortality Ratio (MMR 2014-16)**", "**130 per 100,000 live births**"],
          ["**NFHS-4 (2015-16) Total Fertility Rate (TFR)**", "**2.18** (Below global replacement rate 2.30)"]
        ]
      },

      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "4. Causes of Rapid Population Growth in India" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **1. Rise in Life Expectancy**: Improved medical healthcare and immunization lowered mortality rates while extending average life span." }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **2. Lack of Family Planning Awareness**: Limited availability and access to contraceptives in remote rural areas." }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **3. Early & Child Marriage**: Early marriage prolongs the total reproductive age span of women." }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **4. Illiteracy**: Low female literacy reduces awareness regarding reproductive rights and family welfare." }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **5. Social & Religious Orthodoxy**: Preference for male children and traditional misconceptions about contraception." }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **6. Poverty**: Impoverished families often view additional children as extra earning hands." }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **7. Illegal Migration**: Influx of illegal migrants in border states adds demographic pressure." }]
      },

      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "5. Advantages & Opportunities of Demographic Dividend" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **1. Demographic Dividend**: Over **50% of India's population is under 25 years of age**. A large working-age ratio accelerates economic productivity." }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **2. Human Capital Expansion**: Export of skilled manpower, competitive labor cost, and large talent pool in tech and services." }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **3. Huge Consumer Market**: Attracts foreign direct investment (FDI) due to a massive domestic market." }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **4. Powerful Armed Forces**: Vast human resources sustain one of the world's largest defense forces." }]
      },

      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "6. Socio-Economic Challenges of Overpopulation" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **1. Unemployment**: Shortage of capital resources makes job creation for youth a major challenge." }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **2. Food Security & Malnutrition**: Pressure on agricultural land and child/maternal malnutrition." }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **3. Low Per Capita Income**: Increased poverty ratio and inflation." }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **4. Burden on Public Services**: High expenditure on healthcare, education, housing, and urban transport." }]
      },

      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "7. Constitution Review Commission (NCRWC) & Legislative Proposals" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **Article 47A Recommendation**: The National Commission to Review the Working of the Constitution (NCRWC - Justice Venkatachaliah Commission) recommended inserting **Article 47A** into the Directive Principles of State Policy for population control." }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **Two-Child Norm Proposal**: PILs suggest enforcing a two-child policy for government jobs, subsidies, and contesting elections." }]
      },
      {
        _type: "table",
        caption: "Resource Comparison: India vs. China Demographic Balance",
        headers: ["Parameter", "India's Share / Metric", "China Comparison"],
        rows: [
          ["**Global Arable Land**", "**Only 2%**", "India has 2.4% of total land area"],
          ["**Global Drinking Water**", "**Only 4%**", "India has 4% of global freshwater"],
          ["**Global Population Share**", "**~18% to 20%**", "Over 18% of world population"],
          ["**Geographical Area**", "**3.28 Million sq. km**", "China is **~3 times larger** in area"],
          ["**Birth Rate Speed**", "**33 births per minute**", "China records **11 births per minute**"]
        ]
      },

      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "8. Solutions & Future Roadmap" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **1. Female Literacy & Empowerment**: Educated women are key to reproductive choice and family planning." }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **2. Strict Enforcement of Minimum Marriage Age**: Curbing child marriage through stringent legal implementation." }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **3. Doorstep Family Planning Services**: Utilizing ASHA workers for contraceptive distribution." }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **4. Strengthening Institutional Deliveries**: Reducing IMR and MMR under NHM." }]
      },

      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "9. High-Yield Revision Takeaways for MPPSC & UPSC" }],
      },
      {
        _type: "facts",
        items: [
          { label: "1952", value: "**National Family Planning Programme** (First in World)" },
          { label: "1976", value: "**First National Population Policy** (Marriage Age 18 & 21)" },
          { label: "1996", value: "**Cairo Model** (Voluntary choice and education)" },
          { label: "2000", value: "**NPP-2000 Policy** (Swaminathan Committee, 2045 Stabilization Goal)" },
          { label: "May 2000", value: "**National Commission on Population** (Chaired by PM)" },
          { label: "Census 2011", value: "**Population 121.08 Cr | Sex Ratio 943 | Literacy 73% | Density 382/sq km**" },
          { label: "NCRWC Proposal", value: "**Insertion of Article 47A into Constitution**" }
        ]
      },

      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "10. Related Study Material & Interlinked Notes" }],
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
            text: "👉 [What is Disaster Management? NCERT Concepts](/en/general-awareness/what-is-disaster-management-ncert-types-mppsc-notes)",
          },
        ],
      },

      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "11. Conclusion" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "India's population policy post-independence reflects a shift from clinical targets to voluntary human rights and Cairo Model principles. Strategic focus on female literacy, healthcare, and skill development will convert demographic growth into sustainable economic growth.",
          },
        ],
      },
    ],

    /* ────────────── BILINGUAL FAQS ────────────── */
    faqs: [
      {
        question: "विश्व में राष्ट्रीय स्तर पर परिवार नियोजन कार्यक्रम शुरू करने वाला प्रथम देश कौन सा है?",
        questionEn: "Which is the first country in the world to launch a national family planning programme?",
        answer: "भारत विश्व का पहला देश है जिसने वर्ष 1952 में राष्ट्रीय स्तर पर परिवार नियोजन कार्यक्रम शुरू किया था।",
        answerEn: "India is the first country in the world to launch a national family planning programme in 1952."
      },
      {
        question: "राष्ट्रीय जनसंख्या नीति 2000 (NPP-2000) किस समिति की सिफारिशों पर आधारित थी?",
        questionEn: "On which committee's recommendations was the National Population Policy 2000 drafted?",
        answer: "NPP-2000 का मसौदा प्रसिद्ध कृषि वैज्ञानिक डॉ. एम. एस. स्वामीनाथन की अध्यक्षता वाली विशेषज्ञ समिति की रिपोर्ट पर आधारित था।",
        answerEn: "NPP-2000 was drafted based on the expert committee report headed by Dr. M.S. Swaminathan."
      },
      {
        question: "काहिरा मॉडल (Cairo Model 1996) का मुख्य सिद्धांत क्या है?",
        questionEn: "What is the core principle of the Cairo Model (1996)?",
        answer: "काहिरा मॉडल के तहत आबादी नियंत्रण हेतु कोई दबाव या जबरदस्ती नहीं डाली जाती, बल्कि शिक्षा व स्वास्थ्य सेवाओं के ज़रिए स्वेच्छा से छोटे परिवार के प्रति जागरूकता फैलाई जाती है।",
        answerEn: "The Cairo Model emphasizes voluntary family planning through female education and reproductive healthcare empowerment rather than coercive targets."
      },
      {
        question: "राष्ट्रीय जनसंख्या आयोग के अध्यक्ष कौन होते हैं?",
        questionEn: "Who is the ex-officio Chairman of the National Commission on Population?",
        answer: "मई 2000 में गठित राष्ट्रीय जनसंख्या आयोग के पदेन अध्यक्ष भारत के प्रधानमंत्री होते हैं।",
        answerEn: "The Prime Minister of India is the ex-officio Chairman of the National Commission on Population."
      },
      {
        question: "संविधान समीक्षा आयोग (NCRWC) ने जनसंख्या नियंत्रण हेतु किस अनुच्छेद को जोड़ने का सुझाव दिया था?",
        questionEn: "Which Article did the NCRWC recommend adding to the Constitution for population control?",
        answer: "NCRWC (जस्टिस वेंकटचेलैया आयोग) ने संविधान के नीति निर्देशक तत्वों में अनुच्छेद 47A (Article 47A) जोड़ने का सुझाव दिया था।",
        answerEn: "NCRWC recommended inserting Article 47A into the Directive Principles of State Policy for population control."
      },
      {
        question: "जनगणना 2011 के अनुसार भारत की कुल जनसंख्या और साक्षरता दर क्या थी?",
        questionEn: "What was India's total population and literacy rate according to Census 2011?",
        answer: "2011 की जनगणना के अनुसार भारत की कुल जनसंख्या 1,21,08,54,977 (121.08 करोड़) और साक्षरता दर 73.0% (पुरुष 80.9%, महिला 64.6%) थी।",
        answerEn: "According to Census 2011, India's total population was 121.08 crore and literacy rate was 73.0% (Male 80.9%, Female 64.6%)."
      },
      {
        question: "जनसंख्या स्थायित्व का दीर्घकालिक लक्ष्य किस वर्ष तक रखा गया है?",
        questionEn: "What is the target year for achieving population stabilization under NPP-2000?",
        answer: "राष्ट्रीय जनसंख्या नीति 2000 के तहत वर्ष 2045 तक भारत की जनसंख्या में स्थायित्व (Population Stabilization) प्राप्त करने का लक्ष्य रखा गया है।",
        answerEn: "NPP-2000 targeted achieving population stabilization by the year 2045."
      },
      {
        question: "MPPSC मुख्य परीक्षा में जनसंख्या नीति से संबंधित प्रश्न किस पेपर में आते हैं?",
        questionEn: "In which MPPSC Mains paper are questions on Population Policy asked?",
        answer: "MPPSC Mains GS Paper-1 (भूगोल व जनसांख्यिकी) एवं GS Paper-2 (सामाजिक क्षेत्र व स्वास्थ्य) में जनसंख्या नीति, 2011 जनगणना व जनसांख्यिकीय लाभांश पर 5 व 11 अंकों के प्रश्न पूछे जाते हैं।",
        answerEn: "In MPPSC Mains, 5-mark and 11-mark questions appear in GS Paper-1 (Demography) and GS Paper-2 (Social Sector & Health)."
      }
    ],

    /* ────────────── BILINGUAL MCQS ────────────── */
    mcqs: [
      {
        question: "भारत में पहली बार राष्ट्रीय स्तर पर परिवार नियोजन कार्यक्रम किस वर्ष शुरू किया गया था?",
        questionEn: "In which year was the national family planning programme launched in India?",
        options: ["A. 1947", "B. 1952", "C. 1966", "D. 1976"],
        optionsEn: ["A. 1947", "B. 1952", "C. 1966", "D. 1976"],
        correctIndex: 1,
        explanation: "भारत वर्ष 1952 में राष्ट्रीय स्तर पर परिवार नियोजन कार्यक्रम लागू करने वाला दुनिया का पहला देश बना था।",
        explanationEn: "India became the first country in the world to launch a national family planning programme in 1952."
      },
      {
        question: "राष्ट्रीय जनसंख्या नीति 2000 का मसौदा किस विशेषज्ञ समिति की रिपोर्ट पर आधारित था?",
        questionEn: "On which expert committee's report was the National Population Policy 2000 drafted?",
        options: ["A. कस्तूरीरंगन समिति", "B. डॉ. एम. एस. स्वामीनाथन समिति", "C. केेलकर समिति", "D. वेंकटचेलैया आयोग"],
        optionsEn: ["A. Kasturirangan Committee", "B. Dr. M.S. Swaminathan Committee", "C. Kelkar Committee", "D. Venkatachaliah Commission"],
        correctIndex: 1,
        explanation: "NPP-2000 का मसौदा डॉ. एम. एस. स्वामीनाथन की अध्यक्षता वाली समिति की सिफारिशों पर आधारित था।",
        explanationEn: "NPP-2000 was drafted based on the recommendations of the Dr. M.S. Swaminathan Expert Committee."
      },
      {
        question: "भारत में जनसंख्या नियंत्रण हेतु 'काहिरा मॉडल (Cairo Model)' किस वर्ष से लागू है?",
        questionEn: "Since which year has the Cairo Model of population control been in effect in India?",
        options: ["A. 1976", "B. 1985", "C. 1996", "D. 2000"],
        optionsEn: ["A. 1976", "B. 1985", "C. 1996", "D. 2000"],
        correctIndex: 2,
        explanation: "भारत में 1996 से काहिरा मॉडल लागू है, जो बिना किसी दबाव के शिक्षा व जागरूकता के जरिए जनसंख्या नियंत्रण पर बल देता है।",
        explanationEn: "India adopted the Cairo Model in 1996, focusing on voluntary family planning through education and health."
      },
      {
        question: "मई 2000 में गठित राष्ट्रीय जनसंख्या आयोग की अध्यक्षता किसके द्वारा की जाती है?",
        questionEn: "Who chairpersons the National Commission on Population established in May 2000?",
        options: ["A. केंद्रीय स्वास्थ्य मंत्री", "B. भारत के राष्ट्रपति", "C. भारत के प्रधानमंत्री", "D. नीति आयोग के उपाध्यक्ष"],
        optionsEn: ["A. Union Health Minister", "B. President of India", "C. Prime Minister of India", "D. Vice Chairman of NITI Aayog"],
        correctIndex: 2,
        explanation: "राष्ट्रीय जनसंख्या आयोग के पदेन अध्यक्ष भारत के प्रधानमंत्री होते हैं।",
        explanationEn: "The Prime Minister of India is the ex-officio Chairman of the National Commission on Population."
      },
      {
        question: "जनगणना 2011 के अनुसार भारत का लिंगानुपात (Sex Ratio) कितना दर्ज किया गया था?",
        questionEn: "What was India's Sex Ratio according to Census 2011?",
        options: ["A. 933 / 1000", "B. 940 / 1000", "C. 943 / 1000", "D. 950 / 1000"],
        optionsEn: ["A. 933 / 1000", "B. 940 / 1000", "C. 943 / 1000", "D. 950 / 1000"],
        correctIndex: 2,
        explanation: "जनगणना 2011 के अनुसार भारत का लिंगानुपात 943 महिलाएँ प्रति 1,000 पुरुष था।",
        explanationEn: "According to Census 2011, India's sex ratio was recorded at 943 females per 1,000 males."
      },
      {
        question: "संविधान समीक्षा आयोग (NCRWC) ने संविधान में किस अनुच्छेद को जोड़ने की सिफारिश की थी?",
        questionEn: "Which Article was recommended by NCRWC to be inserted into the Constitution?",
        options: ["A. अनुच्छेद 21A", "B. अनुच्छेद 47A", "C. अनुच्छेद 51A", "D. अनुच्छेद 300A"],
        optionsEn: ["A. Article 21A", "B. Article 47A", "C. Article 51A", "D. Article 300A"],
        correctIndex: 1,
        explanation: "NCRWC ने नीति निर्देशक तत्वों में जनसंख्या नियंत्रण हेतु अनुच्छेद 47A जोड़ने का सुझाव दिया था।",
        explanationEn: "NCRWC recommended inserting Article 47A under Directive Principles of State Policy for population control."
      },
      {
        question: "जनगणना 2011 के अनुसार भारत का जनसंख्या घनत्व (Population Density) कितना दर्ज किया गया था?",
        questionEn: "What was India's Population Density according to Census 2011?",
        options: ["A. 325 प्रति किमी²", "B. 350 प्रति किमी²", "C. 382 प्रति किमी²", "D. 415 प्रति किमी²"],
        optionsEn: ["A. 325 per sq km", "B. 350 per sq km", "C. 382 per sq km", "D. 415 per sq km"],
        correctIndex: 2,
        explanation: "2011 में भारत का जनसंख्या घनत्व 382 व्यक्ति प्रति वर्ग किलोमीटर दर्ज किया गया (जो 2001 में 325 था)।",
        explanationEn: "India's population density in Census 2011 was 382 persons per sq km, up from 325 in 2001."
      },
      {
        question: "राष्ट्रीय जनसंख्या नीति 2000 के अनुसार किस वर्ष तक जनसंख्या स्थिरता प्राप्त करने का दीर्घकालिक लक्ष्य है?",
        questionEn: "Under NPP-2000, what is the long-term target year for achieving population stabilization?",
        options: ["A. 2030", "B. 2040", "C. 2045", "D. 2050"],
        optionsEn: ["A. 2030", "B. 2040", "C. 2045", "D. 2050"],
        correctIndex: 2,
        explanation: "NPP-2000 का दीर्घकालिक लक्ष्य वर्ष 2045 तक सतत विकास के अनुरूप जनसंख्या स्थायित्व प्राप्त करना है।",
        explanationEn: "NPP-2000 set the long-term target of population stabilization by the year 2045."
      }
    ]
  };

  console.log(`📝 Syncing Fully Expanded Bilingual Article "${articleDoc._id}" to Sanity CMS...`);
  const res = await client.createOrReplace(articleDoc);
  console.log(`🎉 SUCCESS! Fully Expanded Article uploaded & published in Sanity CMS. Document ID: ${res._id}`);
  console.log(`URL slug: ${res.slug.current}`);
}

main().catch((err) => {
  console.error("❌ Error uploading Population Policy article:", err);
  process.exit(1);
});
