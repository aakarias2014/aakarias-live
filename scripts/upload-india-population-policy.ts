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
  console.log("🚀 Uploading Complete Interlinked Population Policy Article to Sanity CMS...");

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
        children: [{ _type: "span", text: "• **1960 की विशेषज्ञ समिति**: भारत में सबसे पहले एक समर्पित जनसंख्या नीति बनाने का औपचारिक सुझाव वर्ष 1960 में गठित एक विशेषज्ञ समूह ने दिया था।" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **पहली राष्ट्रीय जनसंख्या नीति (1976)**: वर्ष 1976 में देश की पहली औपचारिक राष्ट्रीय जनसंख्या नीति की घोषणा की गई (बाद में 1981 में इसमें कुछ संशोधन किए गए)। इस नीति के मुख्य लक्ष्य जन्म दर में कमी लाना, विवाह की न्यूनतम आयु में वृद्धि (लड़कियों हेतु 18 वर्ष व लड़कों हेतु 21 वर्ष), परिवार नियोजन को प्रोत्साहित करना और महिला शिक्षा पर विशेष जोर देना था।" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "• **राष्ट्रीय जनसंख्या नीति, 2000 (NPP-2000)**: फरवरी 2000 में भारत सरकार ने नई राष्ट्रीय जनसंख्या नीति की घोषणा की। यह नीति प्रसिद्ध कृषि वैज्ञानिक ",
          },
          {
            _type: "span",
            text: "👉 [डॉ. एम. एस. स्वामीनाथन (जीवन परिचय व हरित क्रांति नोट्स)](/general-awareness/dr-ms-swaminathan-father-of-green-revolution-mppsc-upsc-notes)",
          },
          {
            _type: "span",
            text: " की अध्यक्षता में गठित विशेषज्ञ दल की रिपोर्ट पर आधारित थी। इसका मुख्य उद्देश्य प्रजनन तथा शिशु स्वास्थ्य देखभाल हेतु बुनियादी ढाँचा मजबूत करना तथा दीर्घकालिक लक्ष्य वर्ष **2045 तक जनसंख्या में स्थायित्व** प्राप्त करना है।",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **काहिरा मॉडल (Cairo Model 1996)**: आबादी पर काबू पाने के लिहाज़ से भारत में वर्ष 1996 से काहिरा मॉडल लागू है। इसके तहत आबादी घटाने के लिए आम जनता पर किसी प्रकार का दबाव या जबरदस्ती नहीं डाली जाती, बल्कि शिक्षा व जन-जागरूकता के ज़रिए उनमें छोटे परिवार का अहसास जगाया जाता है। वर्तमान में संपूर्ण विश्व में यही काहिरा मॉडल लागू है।" }]
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
        children: [{ _type: "span", text: "• **1. नीति समीक्षा**: राष्ट्रीय जनसंख्या नीति के क्रियान्वयन की समय-समय पर समीक्षा करना।" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **2. निगरानी एवं निर्देशन**: जनसंख्या नियंत्रण कार्यक्रमों की निगरानी करना और आवश्यक नीतिगत दिशा-निर्देश देना।" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **3. अंतर-क्षेत्रीय सहक्रिया**: स्वास्थ्य, शैक्षणिक, पर्यावरणीय और विकास कार्यक्रमों के मध्य सहक्रिया (Synergy) को बढ़ावा देना।" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **4. संस्थागत तालमेल**: कार्यक्रमों की योजना बनाने व क्रियान्वयन करने में अंतर-क्षेत्रीय (Inter-sectoral) तालमेल स्थापित करना।" }]
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

      /* ── 3. Census 2011 Facts ── */
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "3. भारत में जनगणना 2011 एवं स्वास्थ्य सर्वे के महत्वपूर्ण आंकड़े" }],
      },
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

      /* ── 4. Causes ── */
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "4. भारत में जनसंख्या वृद्धि के मुख्य कारण" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **1. जीवन प्रत्याशा में वृद्धि**: आधुनिक चिकित्सा सुविधाओं एवं टीकाकरण के कारण मृत्यु दर में गिरावट व औसत जीवन प्रत्याशा बढ़ी।" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **2. परिवार नियोजन एवं साधनों की कमी**: ग्रामीण व दूरस्थ क्षेत्रों में गर्भनिरोधक साधनों की सीमित पहुँच।" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **3. बाल विवाह**: कम उम्र में विवाह से महिलाओं की प्रजनन अवधि लंबी हो जाती है।" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **4. अशिक्षा एवं जागरूकता का अभाव**: विशेष रूप से महिला साक्षरता की कमी।" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **5. धार्मिक कारण एवं रूढ़िवादिता**: पुत्र प्राप्ति की लालसा व भ्रांतियाँ।" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **6. गरीबी**: निर्धन परिवारों में बच्चों को कमाई के अतिरिक्त साधन के रूप में देखना।" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **7. अवैध प्रवास (Illegal Migration)**: सीमावर्ती राज्यों में जनसंख्या का दबाव।" }]
      },

      /* ── 5. Benefits ── */
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "5. जनसंख्या वृद्धि के सकारात्मक पहलू एवं जनसांख्यिकीय लाभांश" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **1. जनसांख्यिकीय लाभांश (Demographic Dividend)**: भारत में लगभग **50% आबादी 25 वर्ष से कम आयु** की है जो आर्थिक विकास की रीढ़ है।" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **2. मानव संसाधन में बढ़ोतरी (Human Capital)**: कुशल श्रम व तकनीक का वैश्विक निर्यात।" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **3. विशाल घरेलू बाजार**: प्रत्यक्ष विदेशी निवेश (FDI) व उपभोक्ता बाजार।" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **4. शक्तिशाली सैन्य बल**: विशाल मानव संसाधन से मजबूत सैन्य क्षमता।" }]
      },

      /* ── 6. Challenges ── */
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "6. जनसंख्या विस्फोट के नुकसान एवं गंभीर सामाजिक-आर्थिक चुनौतियाँ" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **1. बेरोजगारी (Unemployment)**: रोजगार के अवसरों के सृजन की चुनौती।" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **2. खाद्य सुरक्षा एवं कुपोषण**: खाद्यान्न मांग व बाल कुपोषण।" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **3. प्रति व्यक्ति आय व निर्धनता**: प्रति व्यक्ति आय में कमी व महंगाई।" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **4. बुनियादी ढाँचे पर बोझ**: स्वास्थ्य, आवास व शिक्षा पर वित्तीय दबाव।" }]
      },

      /* ── 7. NCRWC ── */
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "7. संविधान समीक्षा आयोग (NCRWC) की सिफारिशें एवं जनसंख्या नियंत्रण कानून" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **अनुच्छेद 47A का समावेश**: NCRWC (जस्टिस वेंकटचेलैया आयोग) ने नीति निर्देशक तत्वों में **अनुच्छेद 47A** जोड़ने व जनसंख्या कानून बनाने का सुझाव दिया।" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **दो बच्चों का नियम**: जनहित याचिका में दो बच्चों का नियम लागू करने का सुझाव।" }]
      },

      /* ── 8. Solutions ── */
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "8. जनसंख्या स्थायित्व हेतु भावी राह एवं आवश्यक उपाय" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **1. महिला शिक्षा व सशक्तिकरण**: महिला साक्षरता द्वारा परिवार नियोजन जागरूकता।" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **2. विवाह की उम्र का कड़ाई से पालन**: बाल विवाह रोकथाम।" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **3. स्वास्थ्य सेवाओं का विस्तार**: संस्थागत प्रसव व आशा कार्यकर्ताओं की भूमिका।" }]
      },

      /* ── 9. Facts ── */
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
            text: "👉 [डॉ. एम. एस. स्वामीनाथन: जीवन परिचय, हरित क्रांति के जनक, 50% MSP व योगदान](/general-awareness/dr-ms-swaminathan-father-of-green-revolution-mppsc-upsc-notes)",
          },
        ],
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
            text: "भारत की जनसंख्या नीति केवल जन्म दर को नियंत्रित करने तक सीमित नहीं है, बल्कि यह मानव पूंजी निर्माण, शिक्षा, महिला अधिकार एवं सतत विकास से जुड़ी एक व्यापक राष्ट्रीय रणनीति है। काहिरा मॉडल के सिद्धांतों व डॉ. स्वामीनाथन समिति की सिफारिशों के अनुरूप शिक्षा और स्वास्थ्य सेवाओं के विस्तार से ही भारत अपनी विशाल जनसंख्या को जनसांख्यिकीय लाभांश में परिवर्तित कर सकता है।",
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
            text: "India was the first country in the world to launch an official ",
          },
          {
            _type: "span",
            marks: ["strong"],
            text: "National Family Planning Programme in 1952",
          },
          {
            _type: "span",
            text: ". Rapid population growth was identified as a major bottleneck to development in the First Five-Year Plan (1951–56).",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **1960 Expert Group**: First formally recommended formulating a dedicated population policy." }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **First National Population Policy (1976)**: Raised minimum marriage age to 18 for females and 21 for males." }]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "• **National Population Policy 2000 (NPP-2000)**: Formulated under the chairmanship of ",
          },
          {
            _type: "span",
            text: "👉 [Dr. M.S. Swaminathan (Biography & Green Revolution Notes)](/en/general-awareness/dr-ms-swaminathan-father-of-green-revolution-mppsc-upsc-notes)",
          },
          {
            _type: "span",
            text: ", targeting TFR 2.1 and population stabilization by 2045.",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **Cairo Model (1996)**: Focuses on voluntary family planning through education rather than forced coercion." }]
      },

      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "2. National Commission on Population & Stabilization Fund" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "Established in May 2000 under the Prime Minister to review policy implementation and promote inter-sectoral coordination." }]
      },

      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "3. Census 2011 Key Demographic Facts" }],
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
          ["**Least Populous State**", "**Sikkim**"]
        ]
      },

      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "4. Related Study Material & Interlinked Notes" }],
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
        style: "h3",
        children: [{ _type: "span", text: "5. Conclusion" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "India's population policy post-independence reflects a shift towards education, voluntary choices, and Cairo Model principles. Strategic focus on female literacy and healthcare will convert demographic growth into sustainable economic dividend.",
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
        answerEn: "The Cairo Model emphasizes voluntary family planning through female education and reproductive healthcare empowerment."
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
        options: ["A. कस्तूरीरंगन समिति", "B. डॉ. एम. एस. स्वामीनाथन समिति", "C. केलकर समिति", "D. वेंकटचेलैया आयोग"],
        optionsEn: ["A. Kasturirangan Committee", "B. Dr. M.S. Swaminathan Committee", "C. Kelkar Committee", "D. Venkatachaliah Commission"],
        correctIndex: 1,
        explanation: "NPP-2000 का मसौदा डॉ. एम. एस. स्वामीनाथन की अध्यक्षता वाली समिति की सिफारिशों पर आधारित था।",
        explanationEn: "NPP-2000 was drafted based on the recommendations of the Dr. M.S. Swaminathan Expert Committee."
      }
    ]
  };

  console.log(`📝 Syncing Interlinked Population Policy Article "${articleDoc._id}" to Sanity CMS...`);
  const res = await client.createOrReplace(articleDoc);
  console.log(`🎉 SUCCESS! Interlinked Article uploaded & published in Sanity CMS. Document ID: ${res._id}`);
}

main().catch((err) => {
  console.error("❌ Error uploading Population Policy article:", err);
  process.exit(1);
});
