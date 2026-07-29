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
  console.log("🚀 Uploading Dr. M.S. Swaminathan Article with 4 Real Photos to Sanity CMS...");

  const publicBlogDir = path.resolve(process.cwd(), "public/images/blog");
  const artifactDir = "/Users/aakariastech/.gemini/antigravity-ide/brain/46ddf059-c542-4af1-8a30-e0605b309cce";

  if (!fs.existsSync(publicBlogDir)) fs.mkdirSync(publicBlogDir, { recursive: true });

  const destPortrait = path.join(publicBlogDir, "ms_swaminathan_real_portrait.jpg");
  const destSpeech = path.join(publicBlogDir, "ms_swaminathan_rajya_sabha_speech.jpg");
  const destBharatRatna = path.join(publicBlogDir, "ms_swaminathan_bharat_ratna_award.png");
  const destCeremony = path.join(publicBlogDir, "ms_swaminathan_bharat_ratna_ceremony_droupadi_murmu.jpg");

  const srcPortrait = path.join(artifactDir, "media__1785330110049.jpg");
  const srcSpeech = path.join(artifactDir, "media__1785330146303.jpg");
  const srcBharatRatna = path.join(artifactDir, "media__1785330193250.png");
  const srcCeremony = path.join(artifactDir, "media__1785330322906.jpg");

  if (fs.existsSync(srcPortrait)) fs.copyFileSync(srcPortrait, destPortrait);
  if (fs.existsSync(srcSpeech)) fs.copyFileSync(srcSpeech, destSpeech);
  if (fs.existsSync(srcBharatRatna)) fs.copyFileSync(srcBharatRatna, destBharatRatna);
  if (fs.existsSync(srcCeremony)) fs.copyFileSync(srcCeremony, destCeremony);

  console.log("📸 Uploading real photos to Sanity CMS...");
  const assetPortrait = await client.assets.upload("image", fs.createReadStream(destPortrait), {
    filename: "ms_swaminathan_real_portrait.jpg",
  });
  const assetSpeech = await client.assets.upload("image", fs.createReadStream(destSpeech), {
    filename: "ms_swaminathan_rajya_sabha_speech.jpg",
  });
  const assetBharatRatna = await client.assets.upload("image", fs.createReadStream(destBharatRatna), {
    filename: "ms_swaminathan_bharat_ratna_award.png",
  });
  const assetCeremony = await client.assets.upload("image", fs.createReadStream(destCeremony), {
    filename: "ms_swaminathan_bharat_ratna_ceremony_droupadi_murmu.jpg",
  });

  console.log("📂 Seeding Inspirational Icons category into Sanity...");
  await client.createOrReplace({
    _id: "cat-inspirational-icons",
    _type: "category",
    slug: { _type: "slug", current: "inspirational-icons" },
    title: "महत्त्वपूर्ण व्यक्तित्व",
    titleEn: "Inspirational Icons",
    description: "महान व्यक्तित्व, विचारकों, वैज्ञानिकों, स्वतंत्रता सेनानियों एवं राष्ट्र निर्माताओं के जीवनी व योगदान पर आधारित नोट्स।",
    descriptionEn: "Notes and comprehensive biographies on inspirational leaders, scientists, freedom fighters, and nation builders.",
    color: { hex: "#f59e0b" },
    icon: "user-check",
  });

  const docId = "gk-dr-ms-swaminathan-green-revolution";
  const slug = "dr-ms-swaminathan-father-of-green-revolution-mppsc-upsc-notes";

  const articleDoc = {
    _id: docId,
    _type: "staticGk",
    title: "डॉ. एम. एस. स्वामीनाथन: भारत में हरित क्रांति के जनक, जीवनी, स्वामीनाथन आयोग MSP रिपोर्ट, पुरस्कार व योगदान | MPPSC & UPSC Notes",
    titleEn: "Dr. M.S. Swaminathan: Father of Green Revolution in India, Biography, MSP Report, Awards & NPP-2000 | MPPSC & UPSC Notes",
    slug: { _type: "slug", current: slug },
    category: { _type: "reference", _ref: "cat-inspirational-icons" },
    ca_date: "2026-07-29",
    publishedAt: new Date().toISOString(),
    featured: true,
    readingTime: 12,
    tags: [
      { _type: "reference", _ref: "tag-mppsc" },
      { _type: "reference", _ref: "tag-upsc" },
      { _type: "reference", _ref: "tag-prelims" },
      { _type: "reference", _ref: "tag-mains" },
      { _type: "reference", _ref: "tag-inspirational-icons" },
    ],
    excerpt: "भारत में हरित क्रांति के जनक डॉ. एम.एस. स्वामीनाथन का जीवन परिचय, कल्याण सोना व सोनालिका गेहूँ किस्मों का विकास, स्वामीनाथन आयोग 50% MSP सिफारिश, सदाबहार क्रांति (Evergreen Revolution), राष्ट्रीय जनसंख्या नीति 2000 (NPP-2000) में भूमिका, भारत रत्न 2024, विश्व खाद्य पुरस्कार व मैंग्रोव संरक्षण। MPPSC व UPSC परीक्षा नोट्स।",
    excerptEn: "Comprehensive exam notes on Dr. M.S. Swaminathan (Father of Green Revolution in India), high-yielding wheat varieties (Kalyan Sona, Sonalika), Swaminathan Commission MSP 50% recommendation, Evergreen Revolution, NPP-2000 drafting, Bharat Ratna 2024, World Food Prize & Mangrove conservation.",
    seoTitle: "डॉ. एम. एस. स्वामीनाथन | Father of Green Revolution in India | MPPSC & UPSC Notes",
    seoDescription: "डॉ. एम. एस. स्वामीनाथन (MS Swaminathan): भारत में हरित क्रांति के जनक, 50% MSP स्वामीनाथन रिपोर्ट, कल्याण सोना व सोनालिका गेहूँ, सदाबहार क्रांति, NPP-2000, भारत रत्न 2024 व पुरस्कार। MPPSC & UPSC परीक्षा नोट्स व MCQs।",
    keywords: [
      "डॉ एम एस स्वामीनाथन",
      "एम एस स्वामीनाथन का जीवन परिचय",
      "MS Swaminathan Father of Green Revolution",
      "एमएस स्वामीनाथन हरित क्रांति के जनक",
      "स्वामीनाथन रिपोर्ट MSP 50 प्रतिशत",
      "स्वामीनाथन आयोग की सिफारिशें",
      "कल्याण सोना और सोनालिका गेहूं",
      "सदाबहार क्रांति Evergreen Revolution",
      "एमएस स्वामीनाथन भारत रत्न 2024",
      "विश्व खाद्य पुरस्कार 1987",
      "राष्ट्रीय जनसंख्या नीति 2000 स्वामीनाथन समिति",
      "MSSRF",
      "MPPSC Notes",
      "UPSC Notes"
    ],
    featuredImage: {
      _type: "image",
      asset: { _type: "reference", _ref: assetPortrait._id },
      alt: "Dr MS Swaminathan Father of Green Revolution in India Real Portrait MPPSC UPSC Notes",
    },

    /* ────────────── HINDI BODY ────────────── */
    body: [
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "1. डॉ. एम. एस. स्वामीनाथन: परिचय एवं जीवन यात्रा" }],
      },
      {
        _type: "image",
        asset: { _type: "reference", _ref: assetPortrait._id },
        alt: "Dr MS Swaminathan Real Photo Father of Green Revolution MPPSC UPSC Notes",
        caption: "डॉ. एम. एस. स्वामीनाथन (1925–2023): भारत में हरित क्रांति के जनक एवं महान कृषि वैज्ञानिक",
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "भारत में 'हरित क्रांति के जनक' (Father of the Green Revolution in India) कहे जाने वाले महान कृषि वैज्ञानिक एवं आनुवंशिकीविद् ",
          },
          {
            _type: "span",
            marks: ["strong"],
            text: "मॉन्कोम्बू संबासिवन (एम. एस.) स्वामीनाथन (Mankombu Sambasivan Swaminathan)",
          },
          {
            _type: "span",
            text: " का 98 वर्ष की आयु में 28 सितंबर, 2023 को चेन्नई में निधन हो गया। वर्ष 2024 में भारत सरकार द्वारा उन्हें मरणोपरांत देश के सर्वोच्च नागरिक सम्मान ",
          },
          {
            _type: "span",
            marks: ["strong"],
            text: "'भारत रत्न' (Bharat Ratna 2024)",
          },
          {
            _type: "span",
            text: " से सम्मानित किया गया।",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **जन्म एवं प्रारंभिक प्रेरणा**: डॉ. स्वामीनाथन का जन्म 7 अगस्त, 1925 को कुंभकोणम (तमिलनाडु) में हुआ था। वे महात्मा गांधी के विचारों तथा स्वतंत्रता संग्राम से अत्यधिक प्रभावित थे। शुरुआत में वे चिकित्सा (Medicine) के क्षेत्र में जाना चाहते थे, परंतु **1942–1943 के भयानक बंगाल अकाल (Bengal Famine)** के भीषण दृश्य ने उनके जीवन की दिशा बदल दी और उन्होंने भारत को खाद्यान्न उत्पादन में आत्मनिर्भर बनाने हेतु कृषि विज्ञान को अपना लक्ष्य बनाया।" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **उच्च शिक्षा एवं शोध**: उन्होंने मद्रास विश्वविद्यालय से प्राणिशास्त्र में B.Sc., कोयंबटूर कृषि कॉलेज से कृषि विज्ञान में B.Sc. तथा वर्ष 1952 में प्रतिष्ठित **कैम्ब्रिज विश्वविद्यालय (UK)** से आनुवंशिकी (Genetics) में Ph.D. की उपाधि प्राप्त की। इसके पश्चात उन्होंने विस्कॉन्सिन विश्वविद्यालय (USA) में पोस्ट-डॉक्टरेट शोध किया।" }]
      },

      /* ── 2. Career & Administrative Roles ── */
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "2. प्रमुख पद एवं प्रशासनिक कैरियर" }],
      },
      {
        _type: "image",
        asset: { _type: "reference", _ref: assetSpeech._id },
        alt: "Dr MS Swaminathan Speaking as Rajya Sabha Member MPPSC UPSC Notes",
        caption: "डॉ. एम. एस. स्वामीनाथन राज्यसभा सांसद एवं राष्ट्रीय किसान आयोग के अध्यक्ष के रूप में विचार व्यक्त करते हुए",
      },
      {
        _type: "table",
        caption: "डॉ. एम. एस. स्वामीनाथन का प्रशासनिक एवं संस्थागत कैरियर",
        headers: ["वर्ष / समय-सीमा", "पद / संस्था", "प्रमुख योगदान व भूमिका"],
        rows: [
          ["**1954**", "**भारतीय कृषि अनुसंधान संस्थान (IARI)**", "संस्थान में वैज्ञानिक के रूप में कार्य प्रारंभ किया तथा फसल प्रजननो पर शोध किया।"],
          ["**1972–1979**", "**भारतीय कृषि अनुसंधान परिषद (ICAR)**", "ICAR के महानिदेशक (Director General) के रूप में भारत में कृषि अनुसंधान व शिक्षा का विस्तार किया।"],
          ["**1980–1982**", "**योजना आयोग (Planning Commission)**", "योजना आयोग के सदस्य के रूप में कृषि एवं ग्रामीण विकास नीतियों का निर्माण किया।"],
          ["**1982–1988**", "**अंतर्राष्ट्रीय चावल अनुसंधान संस्थान (IRRI)**", "फिलीपींस स्थित IRRI के पहले भारतीय महानिदेशक बने; एशिया में उच्च उपज वाले चावल का प्रसार किया।"],
          ["**1988**", "**MSSRF की स्थापना**", "सतत कृषि व ग्रामीण विकास हेतु चेन्नई में 'एम. एस. स्वामीनाथन रिसर्च फाउंडेशन' की स्थापना की।"],
          ["**1994–2000**", "**राष्ट्रीय जनसंख्या नीति विशेषज्ञ समूह**", "भारत की **राष्ट्रीय जनसंख्या नीति, 2000 (NPP-2000)** का मसौदा तैयार करने वाली समिति की अध्यक्षता की।"],
          ["**2004–2006**", "**राष्ट्रीय किसान आयोग (NCF)**", "राष्ट्रीय किसान आयोग की अध्यक्षता की तथा ऐतिहासिक 50% MSP सिफारिश प्रस्तुत की।"]
        ]
      },

      /* ── 3. Green Revolution Role ── */
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "3. भारत में हरित क्रांति में ऐतिहासिक भूमिका: कल्याण सोना व सोनालिका गेहूँ" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "1960 के दशक में भारत भीषण खाद्यान्न संकट और अकाल की स्थिति से जूझ रहा था तथा अमेरिका से PL-480 योजना के तहत खाद्यान्न आयात पर निर्भर था। डॉ. स्वामीनाथन ने अमेरिकी वैज्ञानिक ",
          },
          {
            _type: "span",
            marks: ["strong"],
            text: "डॉ. नॉर्मन बोरलॉग (Norman Borlaug)",
          },
          {
            _type: "span",
            text: " के साथ मिलकर मेक्सिकन अर्ध-वामन (Semi-Dwarf) गेहूँ की किस्मों को भारतीय जलवायु के अनुकूल विकसित किया।",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **कल्याण सोना एवं सोनालिका (Kalyan Sona & Sonalika)**: मेक्सिकन गेहूँ की किस्में लाल रंग की थीं, लेकिन भारतीय चपाती/रोटी हेतु सुनहरे गेहूँ की माँग थी। डॉ. स्वामीनाथन ने क्रॉस-ब्रीडिंग के माध्यम से सुनहरे रंग की उच्च उपज वाली किस्में — कल्याण सोना और सोनालिका विकसित कीं।" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **पंजाब व हरियाणा का अन्न भंडार बनना**: इन किस्मों के प्रयोग से पंजाब, हरियाणा व पश्चिमी उत्तर प्रदेश में गेहूँ के उत्पादन में अभूतपूर्व वृद्धि हुई। मात्र 4 वर्षों में (1967 से 1971) भारत खाद्यान्न संकट से निकलकर आत्मनिर्भर एवं अनाज सरप्लस देश बन गया।" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **'किसान पहले' (Farmer First) दर्शन**: डॉ. स्वामीनाथन का मानना था कि \"खेत भी एक प्रयोगशाला है और किसान असली वैज्ञानिक हैं।\" उन्होंने वैज्ञानिकों को प्रयोगशालाओं से निकलकर सीधे किसानों के खेतों में जाकर समाधान देने पर बल दिया।" }]
      },

      /* ── 4. Swaminathan Commission & 50% MSP Recommendation ── */
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "4. स्वामीनाथन आयोग (NCF) एवं 50% न्यूनतम समर्थन मूल्य (MSP) सिफारिश" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "वर्ष 2004 में केंद्र सरकार ने डॉ. एम. एस. स्वामीनाथन की अध्यक्षता में ",
          },
          {
            _type: "span",
            marks: ["strong"],
            text: "राष्ट्रीय किसान आयोग (National Commission on Farmers - NCF)",
          },
          {
            _type: "span",
            text: " का गठन किया। इस आयोग ने 2004 से 2006 के मध्य कुल 5 ऐतिहासिक रिपोर्टें सौंपीं।",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **50% अधिक MSP की ऐतिहासिक सिफारिश (C2 + 50%)**: स्वामीनाथन आयोग की सबसे प्रमुख सिफारिश यह थी कि न्यूनतम समर्थन मूल्य (MSP) फसल की व्यापक औसत उत्पादन लागत (C2 cost) से कम से कम **50% अधिक** होना चाहिए। यह सिफारिश आज भी देश भर के किसान संगठनों की प्राथमिक मांग है।" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **पौध किस्म और कृषक अधिकार संरक्षण अधिनियम, 2001**: उन्होंने PPV&FR Act, 2001 के निर्माण में केंद्रीय भूमिका निभाई, जिससे किसानों को पारंपरिक बीजों के संरक्षण व व्यापार के अधिकार मिले।" }]
      },

      /* ── 5. Connection to NPP-2000 (Population Policy Interlinking) ── */
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "5. राष्ट्रीय जनसंख्या नीति 2000 (NPP-2000) में योगदान" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "बहुत कम लोग जानते हैं कि डॉ. एम. एस. स्वामीनाथन ने केवल कृषि ही नहीं, बल्कि भारत की जनसंख्या नीति के निर्माण में भी युगांतरकारी योगदान दिया। उन्होंने वर्ष 1994 में गठित जनसंख्या नीति विशेषज्ञ समूह की अध्यक्षता की, जिसकी रिपोर्ट के आधार पर फरवरी 2000 में भारत सरकार ने ",
          },
          {
            _type: "span",
            marks: ["strong"],
            text: "राष्ट्रीय जनसंख्या नीति, 2000 (NPP-2000)",
          },
          {
            _type: "span",
            text: " लागू की।",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "👉 [भारत की जनसंख्या नीति (NPP-2000), जनगणना 2011 आंकड़े व स्वामीनाथन समिति के संपूर्ण नोट्स पढ़ें](/general-awareness/population-policy-of-india-npp-2000-mppsc-upsc-notes)",
          },
        ],
      },

      /* ── 6. Evergreen Revolution & Mangrove Conservation ── */
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "6. 'सदाबहार क्रांति' (Evergreen Revolution) एवं मैंग्रोव संरक्षण" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **सदाबहार क्रांति (Evergreen Revolution)**: 1990 के दशक में हरित क्रांति के दुष्परिणामों (भूजल स्तर में गिरावट, मृदा क्षरण, कीटनाशक प्रदूषण) को देखते हुए उन्होंने 'सदाबहार क्रांति' की अवधारणा दी। इसका अर्थ है — ऐसी कृषि क्रांति जो पर्यावरण व पारिस्थिकी को नुकसान पहुँचाए बिना निरंतर उत्पादकता बढ़ाए।" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **मैंग्रोव संरक्षण (Mangrove Conservation)**: 1989 में उन्होंने जलवायु परिवर्तन व सुनामी से रक्षा हेतु मैंग्रोव वनों की भूमिका को रेखांकित किया और 1990 में 'इन्टरनेशनल सोसाइटी फॉर मैंग्रोव इकोसिस्टम्स (ISME)' की स्थापना की। तमिलनाडु व ओडिशा में 'फिशबोन कैनाल पद्धति' द्वारा मैंग्रोव का पुनरुद्धार कराया।" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **GIAHS विश्व धरोहर मान्यता**: 'मन्नार की खाड़ी समुद्री जीवमंडल' तथा समुद्र तल से नीचे धान की खेती करने वाले केरल के **कुट्टनाड (Kuttanad)** को GIAHS (विश्व स्तर पर महत्वपूर्ण कृषि विरासत स्थल) की मान्यता दिलाई।" }]
      },

      /* ── 7. Awards & Honors with Bharat Ratna ── */
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "7. प्रमुख पुरस्कार एवं सम्मान: भारत रत्न 2024 व विश्व खाद्य पुरस्कार" }],
      },
      {
        _type: "image",
        asset: { _type: "reference", _ref: assetCeremony._id },
        alt: "President Droupadi Murmu Presenting Bharat Ratna Award to Dr MS Swaminathan Daughter Nitya Rao MPPSC UPSC Notes",
        caption: "राष्ट्रपति द्रौपदी मुर्मू द्वारा डॉ. एम. एस. स्वामीनाथन को मरणोपरांत सर्वोच्च नागरिक सम्मान 'भारत रत्न (2024)' प्रदान किया गया (उनकी सुपुत्री डॉ. नित्या राव द्वारा ग्रहण किया गया)",
      },
      {
        _type: "image",
        asset: { _type: "reference", _ref: assetBharatRatna._id },
        alt: "Dr MS Swaminathan Conferred Bharat Ratna 2024 Insignia MPPSC UPSC Notes",
        caption: "डॉ. एम. एस. स्वामीनाथन: भारत रत्न (2024) से सम्मानित महान भारतीय आनुवंशिकीविद् व कृषि वैज्ञानिक",
      },
      {
        _type: "facts",
        items: [
          { label: "भारत रत्न (2024)", value: "**भारत का सर्वोच्च नागरिक सम्मान** (मरणोपरांत)" },
          { label: "प्रथम विश्व खाद्य पुरस्कार (1987)", value: "**World Food Prize** के पहले विजेता (UN द्वारा 'लिविंग लीजेंड' की उपाधि)" },
          { label: "पद्म विभूषण (1989)", value: "**भारत का दूसरा सर्वोच्च नागरिक सम्मान**" },
          { label: "पद्म भूषण (1972)", value: "**भारत का तीसरा सर्वोच्च नागरिक सम्मान**" },
          { label: "पद्म श्री (1967)", value: "**भारत का चतुर्थ नागरिक सम्मान**" },
          { label: "रेमन मैग्सेसे पुरस्कार (1971)", value: "**एशिया का नोबेल पुरस्कार** (पुरस्कार राशि ग्रामीण छात्रवृत्ति हेतु दान की)" },
          { label: "अल्बर्ट आइंस्टीन विश्व विज्ञान पुरस्कार", value: "**1986 में सम्मानित**" }
        ]
      },

      /* ── 8. Related Interlinking ── */
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "8. संबंधित अध्ययन सामग्री एवं नोट्स" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "👉 [भारत की जनसंख्या नीति: NPP-2000, TFR 2.1 व स्वामीनाथन समिति के नोट्स](/general-awareness/population-policy-of-india-npp-2000-mppsc-upsc-notes)",
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
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "👉 [आपदा प्रबंधन (संशोधन) अधिनियम 2025: UDMA धारा 41A व MPPSC Notes](/current-affairs/disaster-management-amendment-act-2025-mppsc-upsc-notes)",
          },
        ],
      },

      /* ── 9. Conclusion ── */
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "9. निष्कर्ष" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "डॉ. एम. एस. स्वामीनाथन का जीवन और कार्य केवल कृषि तक सीमित नहीं था; उन्होंने खाद्य सुरक्षा, किसान कल्याण, पर्यावरण संरक्षण और जनसंख्या नीति के क्षेत्र में भारत को नई दिशा दी। MPPSC एवं UPSC परीक्षा की दृष्टि से हरित क्रांति, 50% MSP सिफारिश, सदाबहार क्रांति व NPP-2000 में उनका योगदान अत्यंत महत्वपूर्ण है।",
          },
        ],
      },
    ],

    /* ────────────── ENGLISH BODY ────────────── */
    bodyEn: [
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "1. Dr. M.S. Swaminathan: Introduction & Life Journey" }],
      },
      {
        _type: "image",
        asset: { _type: "reference", _ref: assetPortrait._id },
        alt: "Dr MS Swaminathan Real Photo Father of Green Revolution MPPSC UPSC Notes",
        caption: "Dr. M.S. Swaminathan (1925–2023): Father of Green Revolution in India & Eminent Agricultural Scientist",
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Renowned agricultural scientist and plant geneticist ",
          },
          {
            _type: "span",
            marks: ["strong"],
            text: "Mankombu Sambasivan (M.S.) Swaminathan",
          },
          {
            _type: "span",
            text: ", widely revered as the 'Father of the Green Revolution in India', passed away on September 28, 2023, in Chennai at the age of 98. In 2024, the Government of India posthumously conferred upon him India's highest civilian honor, the ",
          },
          {
            _type: "span",
            marks: ["strong"],
            text: "Bharat Ratna (2024)",
          },
          {
            _type: "span",
            text: ".",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **Birth & Inspiration**: Born on August 7, 1925, in Kumbakonam, Tamil Nadu, he was deeply influenced by Mahatma Gandhi and the Indian freedom struggle. Though initially planning a career in medicine, the devastating **1942–1943 Bengal Famine** inspired him to dedicate his life to agricultural research and ending hunger in India." }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **Higher Education**: Earned B.Sc. degrees in Zoology (Madras University) and Agriculture (Coimbatore Agricultural College), followed by a Ph.D. in Genetics from **Cambridge University (UK) in 1952** and post-doctoral research at the University of Wisconsin (USA)." }]
      },

      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "2. Key Institutional Roles & Administrative Leadership" }],
      },
      {
        _type: "image",
        asset: { _type: "reference", _ref: assetSpeech._id },
        alt: "Dr MS Swaminathan Speaking as Rajya Sabha Member MPPSC UPSC Notes",
        caption: "Dr. M.S. Swaminathan addressing a conference as Rajya Sabha Member & Chairman of National Commission on Farmers",
      },
      {
        _type: "table",
        caption: "Key Institutional Roles & Career Milestones of Dr. M.S. Swaminathan",
        headers: ["Year / Timeline", "Organization / Position", "Major Contributions & Legacy"],
        rows: [
          ["**1954**", "**Indian Agricultural Research Institute (IARI)**", "Joined as a scientist and spearheaded crop genetics research."],
          ["**1972–1979**", "**Indian Council of Agricultural Research (ICAR)**", "Served as Director General of ICAR, expanding national agricultural research."],
          ["**1982–1988**", "**International Rice Research Institute (IRRI)**", "First Indian Director General of IRRI (Philippines), expanding high-yielding rice in Asia."],
          ["**1988**", "**MSSRF Establishment**", "Founded the M.S. Swaminathan Research Foundation in Chennai for sustainable rural development."],
          ["**1994–2000**", "**National Population Policy Expert Group**", "Chaired the expert group that drafted India's **National Population Policy 2000 (NPP-2000)**."],
          ["**2004–2006**", "**National Commission on Farmers (NCF)**", "Chaired NCF and authored the historical 50% MSP cost recommendation."]
        ]
      },

      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "3. Historical Role in Green Revolution: Kalyan Sona & Sonalika Wheat" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "During the 1960s, India faced severe food shortages and depended on US PL-480 grain imports. Collaborating with Nobel laureate ",
          },
          {
            _type: "span",
            marks: ["strong"],
            text: "Dr. Norman Borlaug",
          },
          {
            _type: "span",
            text: ", Dr. Swaminathan adapted Mexican semi-dwarf wheat varieties to Indian soil and agro-climatic conditions.",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **Kalyan Sona & Sonalika Wheat**: Since Mexican wheat was reddish in color, he cross-bred varieties to produce golden-colored high-yielding wheat varieties — **Kalyan Sona** and **Sonalika**, perfectly suited for Indian chapati making." }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **Food Self-Sufficiency**: Within 4 years (1967–1971), India transformed from a famine-prone nation into a self-sufficient grain surplus power, with Punjab and Haryana becoming India's breadbasket." }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **'Farmer First' Philosophy**: Believed that \"fields are laboratories and farmers are the true scientists.\" He urged agricultural scientists to step out of labs directly into farmers' fields." }]
      },

      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "4. Swaminathan Commission (NCF) & 50% MSP Recommendation" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **50% MSP Recommendation (C2 + 50%)**: Under NCF (2004–2006), he recommended fixing Minimum Support Price (MSP) at at least **50% above weighted average cost of production (C2)**, which remains the central demand of farmer unions nationwide." }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **PPV&FR Act 2001**: Played a foundational role in drafting the Protection of Plant Varieties and Farmers' Rights Act, 2001, protecting farmers' rights to save and exchange seeds." }]
      },

      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "5. Drafting the National Population Policy 2000 (NPP-2000)" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Dr. Swaminathan chaired the 1994 Group of Experts on Population Policy, whose report laid the groundwork for India's ",
          },
          {
            _type: "span",
            marks: ["strong"],
            text: "National Population Policy 2000 (NPP-2000)",
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
        children: [
          {
            _type: "span",
            text: "👉 [Read Complete Notes on Population Policy of India (NPP-2000) & Swaminathan Committee](/en/general-awareness/population-policy-of-india-npp-2000-mppsc-upsc-notes)",
          },
        ],
      },

      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "6. 'Evergreen Revolution' & Mangrove Conservation" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **Evergreen Revolution**: Coined in the 1990s to advocate for sustainable agriculture — increasing productivity in perpetuity without ecological harm." }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **Mangrove Conservation**: Founded the International Society for Mangrove Ecosystems (ISME) in 1990 and pioneered 'fishbone canal' mangrove restoration in Tamil Nadu & Odisha." }]
      },

      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "7. Awards & International Honors" }],
      },
      {
        _type: "image",
        asset: { _type: "reference", _ref: assetCeremony._id },
        alt: "President Droupadi Murmu Presenting Bharat Ratna Award to Dr MS Swaminathan Daughter Nitya Rao MPPSC UPSC Notes",
        caption: "President Droupadi Murmu conferring the Bharat Ratna (2024) posthumously upon Dr. M.S. Swaminathan, received by his daughter Dr. Nitya Rao",
      },
      {
        _type: "image",
        asset: { _type: "reference", _ref: assetBharatRatna._id },
        alt: "Dr MS Swaminathan Conferred Bharat Ratna 2024 Insignia MPPSC UPSC Notes",
        caption: "Dr. M.S. Swaminathan: Conferred with Bharat Ratna (2024), India's Highest Civilian Award",
      },
      {
        _type: "facts",
        items: [
          { label: "Bharat Ratna (2024)", value: "**India's Highest Civilian Honor** (Posthumous)" },
          { label: "First World Food Prize (1987)", value: "**First Recipient** (Hailed as 'Living Legend' by UN Secretary-General)" },
          { label: "Padma Vibhushan (1989)", value: "**India's Second Highest Civilian Award**" },
          { label: "Padma Bhushan (1972)", value: "**India's Third Highest Civilian Award**" },
          { label: "Padma Shri (1967)", value: "**Fourth Highest Civilian Award**" },
          { label: "Ramon Magsaysay Award (1971)", value: "**Asia's Nobel Prize** (Donated prize money for rural scholarships)" },
          { label: "Albert Einstein World Award of Science", value: "**Conferred in 1986**" }
        ]
      },

      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "8. Related Study Material & Interlinked Notes" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "👉 [Population Policy of India (NPP-2000), Census 2011 & Swaminathan Committee Notes](/en/general-awareness/population-policy-of-india-npp-2000-mppsc-upsc-notes)",
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
        style: "h3",
        children: [{ _type: "span", text: "9. Conclusion" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Dr. M.S. Swaminathan's legacy encompasses food security, agricultural genetics, farmer welfare (50% MSP), ecological conservation (Evergreen Revolution), and population policy (NPP-2000). Understanding his contributions is vital for MPPSC and UPSC Mains GS Paper-3 & Prelims.",
          },
        ],
      },
    ],

    /* ────────────── BILINGUAL FAQS ────────────── */
    faqs: [
      {
        question: "भारत में हरित क्रांति का जनक किसे कहा जाता है?",
        questionEn: "Who is known as the Father of the Green Revolution in India?",
        answer: "डॉ. एम. एस. स्वामीनाथन (M.S. Swaminathan) को भारत में हरित क्रांति का जनक कहा जाता है।",
        answerEn: "Dr. M.S. Swaminathan is known as the Father of the Green Revolution in India."
      },
      {
        question: "डॉ. एम. एस. स्वामीनाथन को भारत सरकार द्वारा 'भारत रत्न' से किस वर्ष सम्मानित किया गया?",
        questionEn: "In which year was Dr. M.S. Swaminathan posthumously awarded the Bharat Ratna?",
        answer: "वर्ष 2024 में डॉ. एम. एस. स्वामीनाथन को मरणोपरांत भारत के सर्वोच्च नागरिक सम्मान 'भारत रत्न' से सम्मानित किया गया।",
        answerEn: "Dr. M.S. Swaminathan was posthumously conferred the Bharat Ratna in the year 2024."
      },
      {
        question: "स्वामीनाथन आयोग (NCF) की 50% MSP सिफारिश का क्या तात्पर्य है?",
        questionEn: "What is the 50% MSP recommendation of the Swaminathan Commission?",
        answer: "स्वामीनाथन आयोग ने सिफारिश की थी कि न्यूनतम समर्थन मूल्य (MSP) फसल की औसत उत्पादन लागत (C2 cost) से कम से कम 50% अधिक होना चाहिए।",
        answerEn: "The Swaminathan Commission recommended fixing MSP at at least 50% above the weighted average cost of production (C2)."
      },
      {
        question: "प्रथम 'विश्व खाद्य पुरस्कार (World Food Prize)' किस वर्ष और किसे प्रदान किया गया था?",
        questionEn: "In which year and to whom was the first World Food Prize awarded?",
        answer: "प्रथम विश्व खाद्य पुरस्कार वर्ष 1987 में डॉ. एम. एस. स्वामीनाथन को प्रदान किया गया था।",
        answerEn: "The first World Food Prize was awarded to Dr. M.S. Swaminathan in the year 1987."
      },
      {
        question: "'सदाबहार क्रांति (Evergreen Revolution)' की अवधारणा किसने दी?",
        questionEn: "Who coined the concept of the 'Evergreen Revolution'?",
        answer: "सदाबहार क्रांति की अवधारणा डॉ. एम. एस. स्वामीनाथन ने 1990 के दशक में दी, जिसका उद्देश्य पर्यावरण को नुकसान पहुँचाए बिना निरंतर कृषि उत्पादकता बढ़ाना है।",
        answerEn: "The concept of the Evergreen Revolution was coined by Dr. M.S. Swaminathan to promote ecologically sustainable agricultural productivity."
      },
      {
        question: "राष्ट्रीय जनसंख्या नीति 2000 (NPP-2000) के निर्माण में डॉ. स्वामीनाथन की क्या भूमिका थी?",
        questionEn: "What was Dr. Swaminathan's role in drafting the National Population Policy 2000?",
        answer: "डॉ. स्वामीनाथन ने 1994 में गठित जनसंख्या नीति विशेषज्ञ समूह की अध्यक्षता की, जिसकी रिपोर्ट के आधार पर NPP-2000 तैयार की गई।",
        answerEn: "Dr. Swaminathan chaired the 1994 Group of Experts on Population Policy, forming the basis of NPP-2000."
      }
    ],

    /* ────────────── BILINGUAL MCQS ────────────── */
    mcqs: [
      {
        question: "भारत में हरित क्रांति के जनक डॉ. एम. एस. स्वामीनाथन को किस वर्ष भारत रत्न से सम्मानित किया गया?",
        questionEn: "In which year was Dr. M.S. Swaminathan awarded the Bharat Ratna?",
        options: ["A. 2021", "B. 2022", "C. 2023", "D. 2024"],
        optionsEn: ["A. 2021", "B. 2022", "C. 2023", "D. 2024"],
        correctIndex: 3,
        explanation: "वर्ष 2024 में डॉ. एम. एस. स्वामीनाथन को मरणोपरांत भारत रत्न से सम्मानित किया गया।",
        explanationEn: "Dr. M.S. Swaminathan was posthumously awarded the Bharat Ratna in 2024."
      },
      {
        question: "1987 में प्रथम विश्व खाद्य पुरस्कार (World Food Prize) के विजेता कौन थे?",
        questionEn: "Who was the winner of the first World Food Prize in 1987?",
        options: ["A. नॉर्मन बोरलॉग", "B. डॉ. एम. एस. स्वामीनाथन", "C. वर्गीज कुरियन", "D. सी. सुब्रमण्यम"],
        optionsEn: ["A. Norman Borlaug", "B. Dr. M.S. Swaminathan", "C. Verghese Kurien", "D. C. Subramaniam"],
        correctIndex: 1,
        explanation: "वर्ष 1987 में प्रथम विश्व खाद्य पुरस्कार डॉ. एम. एस. स्वामीनाथन को प्रदान किया गया था।",
        explanationEn: "The first World Food Prize in 1987 was awarded to Dr. M.S. Swaminathan."
      },
      {
        question: "स्वामीनाथन आयोग (राष्ट्रीय किसान आयोग) के अनुसार MSP उत्पादक लागत से कितना अधिक होना चाहिए?",
        questionEn: "According to the Swaminathan Commission, MSP should be how much higher than production cost?",
        options: ["A. कम से कम 25%", "B. कम से कम 33%", "C. कम से कम 50%", "D. कम से कम 75%"],
        optionsEn: ["A. At least 25%", "B. At least 33%", "C. At least 50%", "D. At least 75%"],
        correctIndex: 2,
        explanation: "स्वामीनाथन आयोग ने न्यूनतम समर्थन मूल्य (MSP) को उत्पादन लागत (C2) से कम से कम 50% अधिक रखने की सिफारिश की थी।",
        explanationEn: "The Swaminathan Commission recommended fixing MSP at at least 50% above production cost."
      },
      {
        question: "डॉ. स्वामीनाथन द्वारा मेक्सिकन अर्ध-वामन किस्मों से भारत हेतु विकसित गेहूँ की प्रमुख किस्में कौन सी थीं?",
        questionEn: "Which major wheat varieties were developed for India by Dr. Swaminathan from Mexican semi-dwarf strains?",
        options: ["A. सोनालिका एवं कल्याण सोना", "B. पूसा 1121 एवं बासमती", "C. जया एवं रत्ना", "D. सुजाता एवं मालविका"],
        optionsEn: ["A. Sonalika and Kalyan Sona", "B. Pusa 1121 and Basmati", "C. Jaya and Ratna", "D. Sujata and Malavika"],
        correctIndex: 0,
        explanation: "डॉ. स्वामीनाथन ने भारतीय परिस्थितियों के अनुकूल कल्याण सोना और सोनालिका गेहूँ की किस्में विकसित कीं।",
        explanationEn: "Dr. Swaminathan developed golden-colored high-yielding wheat varieties — Kalyan Sona and Sonalika."
      },
      {
        question: "पर्यावरण को नुकसान पहुँचाए बिना निरंतर कृषि उत्पादकता बढ़ाने हेतु 'सदाबहार क्रांति' की अवधारणा किसने दी?",
        questionEn: "Who coined the concept of the 'Evergreen Revolution' to enhance agricultural productivity sustainably?",
        options: ["A. डॉ. वर्गीज कुरियन", "B. डॉ. एम. एस. स्वामीनाथन", "C. सुंदरलाल बहुगुणा", "D. बाबा आमटे"],
        optionsEn: ["A. Dr. Verghese Kurien", "B. Dr. M.S. Swaminathan", "C. Sunderlal Bahuguna", "D. Baba Amte"],
        correctIndex: 1,
        explanation: "1990 के दशक में डॉ. एम. एस. स्वामीनाथन ने 'सदाबहार क्रांति (Evergreen Revolution)' की अवधारणा प्रस्तुत की।",
        explanationEn: "Dr. M.S. Swaminathan introduced the concept of the 'Evergreen Revolution'."
      }
    ]
  };

  console.log(`📝 Syncing Dr. M.S. Swaminathan Article with 4 Real Photos "${articleDoc._id}" to Sanity CMS...`);
  const res = await client.createOrReplace(articleDoc);
  console.log(`🎉 SUCCESS! Article uploaded & published in Sanity CMS. Document ID: ${res._id}`);
  console.log(`URL slug: ${res.slug.current}`);
}

main().catch((err) => {
  console.error("❌ Error uploading Dr. M.S. Swaminathan article with images:", err);
  process.exit(1);
});
