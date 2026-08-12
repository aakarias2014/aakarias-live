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
  console.log("🚀 Starting upload process for Simon Commission Static GK Article...");

  // Image file paths in public/images/blog/
  const imagePaths = {
    protest: path.resolve(process.cwd(), "public/images/blog/simon-commission-protest-1928.png"),
    lalaLajpatRai: path.resolve(process.cwd(), "public/images/blog/lala-lajpat-rai-lahore-protest-1928.png"),
    nehruReport: path.resolve(process.cwd(), "public/images/blog/nehru-report-1928-document.png"),
  };

  // Check if files exist
  if (!fs.existsSync(imagePaths.protest) || !fs.existsSync(imagePaths.lalaLajpatRai) || !fs.existsSync(imagePaths.nehruReport)) {
    console.error("❌ Required images not found in public/images/blog/");
    process.exit(1);
  }

  // 1. Upload Protest Image
  console.log("📸 Uploading Simon Go Back protest image...");
  const assetProtest = await client.assets.upload("image", fs.createReadStream(imagePaths.protest), {
    filename: "simon_commission_protest_1928.png",
  });
  console.log(`✔ Uploaded protest image. Asset ID: ${assetProtest._id}`);

  // 2. Upload Lala Lajpat Rai Image
  console.log("📸 Uploading Lala Lajpat Rai protest image...");
  const assetLalaLajpatRai = await client.assets.upload("image", fs.createReadStream(imagePaths.lalaLajpatRai), {
    filename: "lala_lajpat_rai_lahore_protest_1928.png",
  });
  console.log(`✔ Uploaded Lala Lajpat Rai image. Asset ID: ${assetLalaLajpatRai._id}`);

  // 3. Upload Nehru Report Document Image
  console.log("📸 Uploading Nehru Report document image...");
  const assetNehruReport = await client.assets.upload("image", fs.createReadStream(imagePaths.nehruReport), {
    filename: "nehru_report_1928_document.png",
  });
  console.log(`✔ Uploaded Nehru Report document image. Asset ID: ${assetNehruReport._id}`);

  // 4. Construct the Article document
  const article = {
    _id: "gk-simon-commission-1927-1928",
    _type: "staticGk",
    slug: { _type: "slug", current: "simon-commission-1927-1928-mppsc-notes" },
    title: "साइमन कमीशन (Simon Commission): गठन, 'Simon Go Back' विरोध, लाला लाजपत राय की शहादत एवं स्वतंत्रता संग्राम पर प्रभाव | MPPSC & UPSC Notes",
    titleEn: "Simon Commission (1927-1928): Formation, 'Simon Go Back' Boycott, Martyrdom of Lala Lajpat Rai & Impact: MPPSC & UPSC Notes PDF",
    excerpt: "साइमन कमीशन (भारतीय सांविधानिक आयोग) का संपूर्ण इतिहास, 1919 अधिनियम की समीक्षा, श्वेत आयोग का मद्रास अधिवेशन (1927) में विरोध, लाला लाजपत राय की शहादत, नेहरू रिपोर्ट (1928) और 1935 के अधिनियम पर प्रभाव। MPPSC (इतिहास) एवं UPSC मुख्य परीक्षा हेतु विस्तृत नोट्स।",
    excerptEn: "Complete notes on Simon Commission (Indian Statutory Commission, 1927): objectives, diarchy evaluation, 1927 Madras Session boycott, martyrdom of Lala Lajpat Rai in Lahore, Nehru Report 1928, and Government of India Act 1935. Crucial for MPPSC & UPSC examinations.",
    ca_date: "2026-08-12",
    publishedAt: new Date().toISOString(),
    featured: true,
    readingTime: 8,
    keywords: [
      "Simon Commission",
      "Simon Go Back",
      "Indian Statutory Commission",
      "Lala Lajpat Rai",
      "1927 Madras Session",
      "Dr MA Ansari",
      "Nehru Report 1928",
      "Government of India Act 1935",
      "Diarchy System 1919",
      "Punjab Kesari",
      "साइमन कमीशन",
      "साइमन वापस जाओ",
      "लाला लाजपत राय की शहादत",
      "नेहरू रिपोर्ट 1928",
      "MPPSC History Notes",
      "UPSC Modern History"
    ],
    category: { _type: "reference", _ref: "cat-polity" }, // Subject-wise: Polity
    author: { _type: "reference", _ref: "author-aakar" },
    tags: [
      { _type: "reference", _ref: "tag-mppsc" },
      { _type: "reference", _ref: "tag-upsc" },
      { _type: "reference", _ref: "tag-prelims" },
      { _type: "reference", _ref: "tag-mains" },
    ],
    syllabus: ["GS-2", "Prelims-GS"],
    featuredImage: {
      _type: "image",
      asset: { _type: "reference", _ref: assetProtest._id },
      alt: "Historic 1928 demonstration showing Indian independence activists holding black flags and Simon Go Back banners at Bombay harbor",
    },

    /* ─── SECTIONS ──────────────────────────────────────────────── */
    sections: [
      /* ── 1. Why in News / Context ────────────────────────────── */
      {
        _key: "sec-why-important",
        kind: "whyInNews",
        title: "परीक्षा में क्यों महत्वपूर्ण?",
        titleEn: "Why is it Important in Exams?",
        body: [
          {
            _key: "b1-1", _type: "block", style: "normal",
            children: [{ _key: "s1-1", _type: "span", text: "भारतीय आधुनिक इतिहास (Modern Indian History) तथा भारत के स्वतंत्रता संग्राम में **साइमन कमीशन (Simon Commission 1927-28)** का आगमन एक निर्णायक मोड़ साबित हुआ था। लोक सेवा आयोग (MPPSC राज्य सेवा परीक्षा एवं UPSC Civil Services Exam) के प्रारंभिक एवं मुख्य परीक्षा (GS Paper-1) में साइमन कमीशन के गठन के कारण, श्वेत आयोग (All-White Commission) की आलोचना, 'Simon Go Back' आंदोलन, लाला लाजपत राय की शहादत, नेहरू रिपोर्ट (1928) तथा भारत शासन अधिनियम 1935 पर इसके संवैधानिक प्रभाव से संबंधित प्रश्न प्रतिवर्ष पूछे जाते हैं।" }],
          },
        ],
        bodyEn: [
          {
            _key: "b1-2", _type: "block", style: "normal",
            children: [{ _key: "s1-2", _type: "span", text: "The arrival of the **Simon Commission (1927-28)** was a turning point in Modern Indian History and the Indian Freedom Struggle. For civil services aspirants (MPPSC & UPSC GS Paper-1), understanding the background of the all-white commission, nationwide boycott ('Simon Go Back'), the martyrdom of Lala Lajpat Rai, the drafting of the Nehru Report (1928), and its impact on the Government of India Act 1935 is essential." }],
          },
        ],
      },

      /* ── 2. Introduction & Background ────────────────────────── */
      {
        _key: "sec-intro-background",
        kind: "background",
        title: "साइमन कमीशन: परिचय एवं ऐतिहासिक पृष्ठभूमि",
        titleEn: "Simon Commission: Introduction & Historical Background",
        body: [
          {
            _key: "b2-1", _type: "block", style: "h3",
            children: [{ _key: "s2-1", _type: "span", text: "1. औपचारिक नाम एवं गठन का उद्देश्य" }],
          },
          {
            _key: "b2-2", _type: "block", style: "normal",
            children: [{ _key: "s2-2", _type: "span", text: "• **औपचारिक नाम (Formal Name)**: साइमन कमीशन को औपचारिक रूप से **भारतीय सांविधानिक आयोग (Indian Statutory Commission)** कहा गया।" }],
          },
          {
            _key: "b2-3", _type: "block", style: "normal",
            children: [{ _key: "s2-3", _type: "span", text: "• **नियुक्ति की पृष्ठभूमि**: ब्रिटिश सरकार द्वारा **भारत शासन अधिनियम, 1919 (Government of India Act, 1919)** में यह प्रावधान किया गया था कि अधिनियम लागू होने के 10 वर्ष बाद एक आयोग गठित किया जाएगा, जो इसके क्रियान्वयन और संवैधानिक सुधारों की समीक्षा करेगा। हालांकि, ब्रिटेन में दलीय राजनीति के कारण इसे 2 वर्ष पूर्व ही **नवंबर 1927** में सर जॉन साइमन (Sir John Simon) की अध्यक्षता में नियुक्त कर दिया गया।" }],
          },
          {
            _key: "b2-4", _type: "block", style: "normal",
            children: [{ _key: "s2-4", _type: "span", text: "• **सबसे बड़ी कमी (श्वेत आयोग - All-White Commission)**: इस आयोग की सबसे बड़ी कमी और विवाद का मुख्य कारण यह था कि इसमें **एक भी भारतीय सदस्य शामिल नहीं था**। इसके सभी 7 सदस्य ब्रिटिश संसद के सदस्य थे। इसे भारतीयों के आत्मनिर्णय के अधिकार और राजनीतिक आकांक्षाओं का सीधा अपमान माना गया।" }],
          },
          {
            _key: "b2-5", _type: "block", style: "normal",
            children: [{ _key: "s2-5", _type: "span", text: "• **आगमन और 'Simon Go Back' नारा**: जब यह आयोग **1928 में भारत आया**, तो पूरे देश में इसका तीव्र और अभूतपूर्व विरोध हुआ। देश के सभी वर्गों और राजनीतिक दलों ने एक स्वर में नारा लगाया - **'Simon Go Back' (साइमन वापस जाओ)**।" }],
          },
          {
            _key: "b2-img-1", _type: "image",
            asset: { _type: "reference", _ref: assetProtest._id },
            alt: "Historic crowd protesting against Simon Commission in 1928 with Simon Go Back banners",
          },
        ],
        bodyEn: [
          {
            _key: "b2-6", _type: "block", style: "h3",
            children: [{ _key: "s2-6", _type: "span", text: "1. Formal Name & Mandate of Formation" }],
          },
          {
            _key: "b2-7", _type: "block", style: "normal",
            children: [{ _key: "s2-7", _type: "span", text: "• **Formal Title**: Officially designated as the **Indian Statutory Commission**." }],
          },
          {
            _key: "b2-8", _type: "block", style: "normal",
            children: [{ _key: "s2-8", _type: "span", text: "• **Background of Appointment**: Appointed by the British Conservative Government in **November 1927** under the chairmanship of **Sir John Simon** to review the working of the Government of India Act 1919 and suggest further constitutional reforms." }],
          },
          {
            _key: "b2-9", _type: "block", style: "normal",
            children: [{ _key: "s2-9", _type: "span", text: "• **Major Flaw ('All-White Commission')**: The primary cause of intense public anger was that **not a single Indian was included** among its seven British parliamentary members." }],
          },
          {
            _key: "b2-10", _type: "block", style: "normal",
            children: [{ _key: "s2-10", _type: "span", text: "• **Arrival & Slogan**: Upon its arrival in India in **1928**, it faced unanimous hostility across political lines, giving birth to the iconic nationwide slogan: **'Simon Go Back'**." }],
          },
          {
            _key: "b2-img-1-en", _type: "image",
            asset: { _type: "reference", _ref: assetProtest._id },
            alt: "Historic crowd protesting against Simon Commission in 1928 with Simon Go Back banners",
          },
        ],
      },

      /* ── 3. Objectives & Mandate ─────────────────────────────── */
      {
        _key: "sec-objectives-mandate",
        kind: "keyAspects",
        title: "आयोग का उद्देश्य और कार्यदेश (Objectives & Mandate)",
        titleEn: "Objectives and Mandate of the Commission",
        body: [
          {
            _key: "b3-1", _type: "block", style: "h3",
            children: [{ _key: "s3-1", _type: "span", text: "2. साइमन कमीशन के प्रमुख कार्य एवं जांच क्षेत्र" }],
          },
          {
            _key: "b3-2", _type: "block", style: "normal",
            children: [{ _key: "s3-2", _type: "span", text: "• **द्वैध शासन का मूल्यांकन**: आयोग का प्राथमिक उद्देश्य भारत सरकार अधिनियम 1919 के कामकाज का मूल्यांकन करना था, विशेष रूप से प्रांतों में लागू **द्वैध शासन (Diarchy)** की प्रणाली की जांच करना, जिसमें प्रांतीय जिम्मेदारियां ब्रिटिश अधिकारियों और भारतीय मंत्रियों के बीच साझा की जाती थीं।" }],
          },
          {
            _key: "b3-3", _type: "block", style: "normal",
            children: [{ _key: "s3-3", _type: "span", text: "• **संवैधानिक सुधारों की सिफारिश**: इसने ऐसे संवैधानिक सुधारों की सिफारिश करने का प्रयास किया, जो ब्रिटिश संप्रभुता (British Sovereignty) को बनाए रखते हुए प्रशासनिक चुनौतियों और सीमित भारतीय मांगों का समाधान कर सकें।" }],
          },
          {
            _key: "b3-4", _type: "block", style: "normal",
            children: [{ _key: "s3-4", _type: "span", text: "• **सांप्रदायिक प्रतिनिधित्व की जांच**: आयोग का उद्देश्य सांप्रदायिक प्रतिनिधित्व (Communal Representation) का आकलन करना तथा बढ़ते राष्ट्रवादी आंदोलनों के बीच देश में कानून और व्यवस्था (Law and Order) की स्थिति की समीक्षा करना था।" }],
          },
          {
            _key: "b3-5", _type: "block", style: "normal",
            children: [{ _key: "s3-5", _type: "span", text: "• **उत्तरदायी सरकार की सीमा**: यह जांचना कि भारत किस हद तक उत्तरदायी सरकार (Responsible Government) की स्थापना के लिए तैयार है।" }],
          },
        ],
        bodyEn: [
          {
            _key: "b3-6", _type: "block", style: "h3",
            children: [{ _key: "s3-6", _type: "span", text: "2. Key Objectives & Terms of Reference" }],
          },
          {
            _key: "b3-7", _type: "block", style: "normal",
            children: [{ _key: "s3-7", _type: "span", text: "• **Evaluation of Diarchy**: To examine the working of the provincial **Diarchy system** introduced by the 1919 Act, where power was divided between British executive counselors and elected Indian ministers." }],
          },
          {
            _key: "b3-8", _type: "block", style: "normal",
            children: [{ _key: "s3-8", _type: "span", text: "• **Constitutional Recommendations**: To propose constitutional restructuring while preserving British imperial sovereignty over India." }],
          },
          {
            _key: "b3-9", _type: "block", style: "normal",
            children: [{ _key: "s3-9", _type: "span", text: "• **Communal Electorates & Law/Order**: To evaluate separate electorates and review law and order amid rising nationalist agitations." }],
          },
          {
            _key: "b3-10", _type: "block", style: "normal",
            children: [{ _key: "s3-10", _type: "span", text: "• **Readiness for Responsible Governance**: To determine whether India was ready for representative democratic institutions." }],
          },
        ],
      },

      /* ── 4. Criticism & Boycott ───────────────────────────────── */
      {
        _key: "sec-criticism-boycott",
        kind: "analysis",
        title: "आलोचना एवं राष्ट्रव्यापी बहिष्कार (Criticism & Boycott)",
        titleEn: "Criticism & Nationwide Boycott (Madras Session 1927)",
        body: [
          {
            _key: "b3-11", _type: "block", style: "h3",
            children: [{ _key: "s3-11", _type: "span", text: "3. बहिष्कार के कारण एवं मद्रास अधिवेशन (1927)" }],
          },
          {
            _key: "b3-12", _type: "block", style: "normal",
            children: [{ _key: "s3-12", _type: "span", text: "• **भारतीयों का अपमान**: साइमन कमीशन को इस बात के लिए कड़ी आलोचना का सामना करना पड़ा कि इसमें एक भी भारतीय सदस्य शामिल नहीं था, जिसे भारतीय राजनीतिक आकांक्षाओं का जानबूझकर किया गया अपमान माना गया।" }],
          },
          {
            _key: "b3-13", _type: "block", style: "normal",
            children: [{ _key: "s3-13", _type: "span", text: "• **ब्रिटिश औपनिवेशिक रणनीति**: कई भारतीयों का मानना था कि यह आयोग वास्तविक सुधारों में देरी करने और औपनिवेशिक नियंत्रण (Colonial Control) बनाए रखने की ब्रिटिश रणनीति थी।" }],
          },
          {
            _key: "b3-14", _type: "block", style: "normal",
            children: [{ _key: "s3-14", _type: "span", text: "• **कांग्रेस का मद्रास अधिवेशन (1927)**: भारतीय राष्ट्रीय कांग्रेस ने **दिसंबर 1927 में डॉ. एम. ए. अंसारी (Dr. M. A. Ansari)** की अध्यक्षता में आयोजित **मद्रास अधिवेशन** में आधिकारिक तौर पर 'हर स्तर पर और हर रूप में' साइमन कमीशन के पूर्ण राष्ट्रव्यापी बहिष्कार का ऐतिहासिक प्रस्ताव पारित किया।" }],
          },
          {
            _key: "b3-15", _type: "block", style: "normal",
            children: [{ _key: "s3-15", _type: "span", text: "• **व्यापक राजनीतिक एकजुटता**: बहिष्कार के निर्णय को भारतीय राष्ट्रीय कांग्रेस, हिंदू महासभा, लिबरल फेडरेशन और मुस्लिम लीग के एक बड़े वर्ग (जिसका नेतृत्व **मोहम्मद अली जिन्ना** कर रहे थे) ने एक साथ समर्थन दिया। हालांकि, पंजाब में जस्टिस पार्टी और यूनियनवादी पार्टी (Unionist Party) ने बहिष्कार नहीं किया।" }],
          },
        ],
        bodyEn: [
          {
            _key: "b3-16", _type: "block", style: "h3",
            children: [{ _key: "s3-16", _type: "span", text: "3. Reasons for Boycott & INC Madras Session (1927)" }],
          },
          {
            _key: "b3-17", _type: "block", style: "normal",
            children: [{ _key: "s3-17", _type: "span", text: "• **Insult to Self-Respect**: Exclusion of Indian members was condemned as a deliberate rejection of India's right to decide its own constitutional future." }],
          },
          {
            _key: "b3-18", _type: "block", style: "normal",
            children: [{ _key: "s3-18", _type: "span", text: "• **Colonial Delaying Tactics**: Viewed by nationalists as a gimmick to prolong colonial dominance and delay self-rule." }],
          },
          {
            _key: "b3-19", _type: "block", style: "normal",
            children: [{ _key: "s3-19", _type: "span", text: "• **INC Madras Session (1927)**: The Indian National Congress, under the presidency of **Dr. M. A. Ansari** at Madras in December 1927, passed a resolution calling for a total boycott of the commission 'at every stage and in every form'." }],
          },
          {
            _key: "b3-20", _type: "block", style: "normal",
            children: [{ _key: "s3-20", _type: "span", text: "• **Cross-Party Unity**: Supported by the Congress, Hindu Mahasabha, Liberal Federation, and the Jinnah-led faction of the Muslim League (except Justice Party in Madras and Unionists in Punjab)." }],
          },
        ],
      },

      /* ── 5. Protests & Martyrdom of Lala Lajpat Rai ─────────── */
      {
        _key: "sec-protests-martyrdom",
        kind: "keyAspects",
        title: "भारत में आगमन, विरोध प्रदर्शन एवं लाला लाजपत राय की शहादत",
        titleEn: "Arrival in India, Protests & Martyrdom of Lala Lajpat Rai",
        body: [
          {
            _key: "b4-1", _type: "block", style: "h3",
            children: [{ _key: "s4-1", _type: "span", text: "4. बंबई आगमन, युवा भागीदारी और लाहौर की ऐतिहासिक घटना" }],
          },
          {
            _key: "b4-2", _type: "block", style: "normal",
            children: [{ _key: "s4-2", _type: "span", text: "• **3 फरवरी 1928 (बंबई आगमन)**: 3 फरवरी, 1928 को साइमन कमीशन बंबई (मुंबई) पहुँचा। इसके स्वागत में फूल नहीं, बल्कि काले झंडे, विशाल हड़तालें और विरोध प्रदर्शन हुए।" }],
          },
          {
            _key: "b4-3", _type: "block", style: "normal",
            children: [{ _key: "s4-3", _type: "span", text: "• **युवाओं की अग्रणी भूमिका**: विशेष रूप से छात्रों और युवा संगठनों (जैसे जवाहरलाल नेहरू और सुभाष चंद्र बोस द्वारा नेतृत्व) ने इन प्रदर्शनों में अग्रणी भूमिका निभाई, जिससे यह स्पष्ट हुआ कि भारतीय युवावर्ग अब स्वतंत्रता के संघर्ष में सक्रिय भागीदारी के लिए तैयार है।" }],
          },
          {
            _key: "b4-4", _type: "block", style: "normal",
            children: [{ _key: "s4-4", _type: "span", text: "• **लाहौर विरोध प्रदर्शन (30 अक्टूबर 1928)**: 30 अक्टूबर 1928 को लाहौर में **लाला लाजपत राय (पंजाब केसरी)** के नेतृत्व में एक विशाल, अहिंसक विरोध रैली आयोजित की गई।" }],
          },
          {
            _key: "b4-5", _type: "block", style: "normal",
            children: [{ _key: "s4-5", _type: "span", text: "• **पुलिस का निर्दय लाठीचार्ज**: इस दौरान लाहौर के पुलिस अधीक्षक जे. ए. स्कॉट (James A. Scott) के आदेश पर पुलिस द्वारा लाठीचार्ज किया गया। लाला लाजपत राय पर पुलिस अधिकारी सॉन्डर्स और स्कॉट द्वारा सीधे सिर और छाती पर निर्दय लाठियाँ बरसाई गईं, जिससे वे गंभीर रूप से घायल हो गए।" }],
          },
          {
            _key: "b4-6", _type: "block", style: "normal",
            children: [{ _key: "s4-6", _type: "span", text: "• **लालाजी का ऐतिहासिक कथन**: घायल लाला लाजपत राय ने विशाल जनसभा को संबोधित करते हुए कहा — *'मेरे शरीर पर पड़ी एक-एक लाठी ब्रिटिश साम्राज्य के ताबूत की आखिरी कील साबित होगी।'* (Every blow struck on my body will be a nail in the coffin of the British Empire)." }],
          },
          {
            _key: "b4-7", _type: "block", style: "normal",
            children: [{ _key: "s4-7", _type: "span", text: "• **17 नवंबर 1928 (लालाजी की शहादत)**: गंभीर चोटों के कारण **17 नवंबर 1928** को लाला लाजपत राय का निधन हो गया। उनकी शहादत ने पूरे देश में क्रांतिकारी चेतना को प्रज्वलित कर दिया और भगत सिंह, शिवराम राजगुरु, सुखदेव और चंद्र शेखर आजाद जैसे युवाओं को सांडर्स वध (Saunders Murder) के लिए प्रेरित किया।" }],
          },
          {
            _key: "b4-img-2", _type: "image",
            asset: { _type: "reference", _ref: assetLalaLajpatRai._id },
            alt: "Lala Lajpat Rai leading the protest against Simon Commission in Lahore in October 1928",
          },
        ],
        bodyEn: [
          {
            _key: "b4-8", _type: "block", style: "h3",
            children: [{ _key: "s4-8", _type: "span", text: "4. Landing in Bombay, Youth Movement & Lahore Incident" }],
          },
          {
            _key: "b4-9", _type: "block", style: "normal",
            children: [{ _key: "s4-9", _type: "span", text: "• **Arrival in Bombay (Feb 3, 1928)**: Arrived in Bombay on February 3, 1928, greeted by black flags, complete general strikes (hartals), and mass demonstrations." }],
          },
          {
            _key: "b4-10", _type: "block", style: "normal",
            children: [{ _key: "s4-10", _type: "span", text: "• **Vibrant Youth Participation**: Youth and student bodies spearheaded the protest under leaders like Jawaharlal Nehru and Subhash Chandra Bose." }],
          },
          {
            _key: "b4-11", _type: "block", style: "normal",
            children: [{ _key: "s4-11", _type: "span", text: "• **Lahore Protest Rally (Oct 30, 1928)**: Led by veteran nationalist leader **Lala Lajpat Rai ('Lion of Punjab')** at Lahore Railway Station." }],
          },
          {
            _key: "b4-12", _type: "block", style: "normal",
            children: [{ _key: "s4-12", _type: "span", text: "• **Brutal Police Lathi Charge**: Under Superintendent James A. Scott's orders, police brutally assaulted the peaceful crowd, striking Lala Lajpat Rai severely." }],
          },
          {
            _key: "b4-13", _type: "block", style: "normal",
            children: [{ _key: "s4-13", _type: "span", text: "• **Historic Quote**: Lala Lajpat Rai declared: *'The blows struck at me today will be the last nails in the coffin of British rule in India.'*" }],
          },
          {
            _key: "b4-14", _type: "block", style: "normal",
            children: [{ _key: "s4-14", _type: "span", text: "• **Martyrdom (Nov 17, 1928)**: Lala Lajpat Rai succumbed to injuries on **November 17, 1928**, sparking immense rage and inspiring revolutionary actions by Bhagat Singh, Rajguru, Sukhdev, and HSRA." }],
          },
          {
            _key: "b4-img-2-en", _type: "image",
            asset: { _type: "reference", _ref: assetLalaLajpatRai._id },
            alt: "Lala Lajpat Rai leading the protest against Simon Commission in Lahore in October 1928",
          },
        ],
      },

      /* ── 6. Impact on Indian Freedom Movement ────────────────── */
      {
        _key: "sec-impact-legacy",
        kind: "impact",
        title: "भारतीय स्वतंत्रता आंदोलन पर प्रभाव एवं संवैधानिक परिणाम",
        titleEn: "Impact on Indian Freedom Movement & Constitutional Consequences",
        body: [
          {
            _key: "b5-1", _type: "block", style: "h3",
            children: [{ _key: "s5-1", _type: "span", text: "5. नेहरू रिपोर्ट, 1935 का अधिनियम और सविनय अवज्ञा का मार्ग" }],
          },
          {
            _key: "b5-2", _type: "block", style: "normal",
            children: [{ _key: "s5-2", _type: "span", text: "• **स्वशासन की माँग की तीव्रता**: साइमन कमीशन के विरोध ने भारतीयों की स्वशासन (Self-Governance) की माँग को और तीव्र कर दिया।" }],
          },
          {
            _key: "b5-3", _type: "block", style: "normal",
            children: [{ _key: "s5-3", _type: "span", text: "• **नेहरू रिपोर्ट (1928) की प्रेरणा**: जब भारत सचिव लॉर्ड बर्कनहेड (Lord Birkenhead) ने भारतीयों को सर्वसम्मति से संविधान बनाने की चुनौती दी, तो इसे स्वीकार करते हुए **पं. मोतीलाल नेहरू** की अध्यक्षता में सर्वदलीय समिति गठित हुई, जिसने **नेहरू रिपोर्ट (1928)** प्रस्तुत की। इसमें भारत के लिए डोमिनियन स्टेटस (Dominion Status), मूल अधिकारों और धर्मनिरपेक्ष लोकतंत्र की रूपरेखा दी गई।" }],
          },
          {
            _key: "b5-4", _type: "block", style: "normal",
            children: [{ _key: "s5-4", _type: "span", text: "• **भारत शासन अधिनियम, 1935 का आधार**: साइमन कमीशन ने मई 1930 में अपनी रिपोर्ट सौंपी। यद्यपि भारतीयों ने इसे खारिज किया, किंतु **भारत शासन अधिनियम 1935 (Government of India Act 1935)** की कई सिफारिशें आयोग की रिपोर्ट तथा गोलमेज सम्मेलनों (Round Table Conferences) पर आधारित थीं:" }],
          },
          {
            _key: "b5-5", _type: "block", style: "normal",
            children: [{ _key: "s5-5", _type: "span", text: "  - इसमें प्रांतों में **प्रांतीय स्वायत्तता (Provincial Autonomy)** लागू की गई।" }],
          },
          {
            _key: "b5-6", _type: "block", style: "normal",
            children: [{ _key: "s5-6", _type: "span", text: "  - प्रांतों से **द्वैध शासन (Diarchy)** को समाप्त कर केंद्र में लागू करने का प्रावधान किया गया।" }],
          },
          {
            _key: "b5-7", _type: "block", style: "normal",
            children: [{ _key: "s5-7", _type: "span", text: "  - परंतु यह अधिनियम भी पूर्ण स्वराज की आकांक्षाओं को पूरा नहीं कर सका।" }],
          },
          {
            _key: "b5-8", _type: "block", style: "normal",
            children: [{ _key: "s5-8", _type: "span", text: "• **राजनीतिक एकता एवं उग्र राष्ट्रवाद**: साइमन कमीशन के विरोध ने भारतीय राजनीति में विभिन्न दलों के बीच एकता को मजबूत किया तथा भगत सिंह जैसे युवा नेताओं के माध्यम से नवीन क्रांतिकारी राष्ट्रवादी विचारधाराओं को जन्म दिया।" }],
          },
          {
            _key: "b5-9", _type: "block", style: "normal",
            children: [{ _key: "s5-9", _type: "span", text: "• **याचक से स्वतंत्रता के अधिकारी**: इस आंदोलन ने यह स्पष्ट कर दिया कि भारतीय जनता अब सुधारों की याचक नहीं, बल्कि पूर्ण स्वतंत्रता की अधिकारी है।" }],
          },
          {
            _key: "b5-10", _type: "block", style: "normal",
            children: [{ _key: "s5-10", _type: "span", text: "• **पूर्ण स्वराज एवं सविनय अवज्ञा (1929-1930)**: साइमन कमीशन के विरोध, लाला लाजपत राय की शहादत और युवाओं के असंतोष ने **लाहौर अधिवेशन (1929)** में **पूर्ण स्वराज प्रस्ताव** तथा महात्मा गांधी के **सविनय अवज्ञा आंदोलन (Civil Disobedience Movement 1930)** का मार्ग प्रशस्त किया।" }],
          },
          {
            _key: "b5-img-3", _type: "image",
            asset: { _type: "reference", _ref: assetNehruReport._id },
            alt: "Historical manuscript of Nehru Report 1928 drafted in response to Simon Commission challenge",
          },
        ],
        bodyEn: [
          {
            _key: "b5-11", _type: "block", style: "h3",
            children: [{ _key: "s5-11", _type: "span", text: "5. Nehru Report, GOI Act 1935 & Prelude to Civil Disobedience" }],
          },
          {
            _key: "b5-12", _type: "block", style: "normal",
            children: [{ _key: "s5-12", _type: "span", text: "• **Intensified Demand for Self-Rule**: Transformed vague demands into an unyielding movement for total governance rights." }],
          },
          {
            _key: "b5-13", _type: "block", style: "normal",
            children: [{ _key: "s5-13", _type: "span", text: "• **Nehru Report (1928)**: In response to Lord Birkenhead's challenge, Motilal Nehru drafted the Nehru Report demanding Dominion Status, Fundamental Rights, and a secular federal framework." }],
          },
          {
            _key: "b5-14", _type: "block", style: "normal",
            children: [{ _key: "s5-14", _type: "span", text: "• **Foundation for GOI Act 1935**: The Commission submitted its report in May 1930, which later shaped key features of the Government of India Act 1935:" }],
          },
          {
            _key: "b5-15", _type: "block", style: "normal",
            children: [{ _key: "s5-15", _type: "span", text: "  - Granted **Provincial Autonomy**." }],
          },
          {
            _key: "b5-16", _type: "block", style: "normal",
            children: [{ _key: "s5-16", _type: "span", text: "  - Abolished **Diarchy** in provinces." }],
          },
          {
            _key: "b5-17", _type: "block", style: "normal",
            children: [{ _key: "s5-17", _type: "span", text: "  - Proposed an All-India Federation and communal electorate extensions." }],
          },
          {
            _key: "b5-18", _type: "block", style: "normal",
            children: [{ _key: "s5-18", _type: "span", text: "• **Political Unity & Revolutionary Surge**: Solidified anti-imperialist unity and triggered revolutionary youth action (HSRA)." }],
          },
          {
            _key: "b5-19", _type: "block", style: "normal",
            children: [{ _key: "s5-19", _type: "span", text: "• **From Petitioners to Sovereign Claimants**: Shifted political consciousness from seeking concessions to asserting sovereignty." }],
          },
          {
            _key: "b5-20", _type: "block", style: "normal",
            children: [{ _key: "s5-20", _type: "span", text: "• **Pathway to Purna Swaraj (1929)**: Directly led to the adoption of the **Purna Swaraj resolution** at the 1929 Lahore Session and Mahatma Gandhi's **Civil Disobedience Movement (1930)**." }],
          },
          {
            _key: "b5-img-3-en", _type: "image",
            asset: { _type: "reference", _ref: assetNehruReport._id },
            alt: "Historical manuscript of Nehru Report 1928 drafted in response to Simon Commission challenge",
          },
        ],
      },

      /* ── 7. Exam Quick Revision Table (MPPSC & UPSC) ─────────── */
      {
        _key: "sec-mppsc-quick-facts",
        kind: "mppscNotes",
        title: "MPPSC & UPSC परीक्षा उपयोगी Quick Revision Fact Sheet",
        titleEn: "MPPSC & UPSC Exam Quick Revision Fact Sheet",
        body: [
          {
            _key: "b6-1", _type: "block", style: "h3",
            children: [{ _key: "s6-1", _type: "span", text: "6. त्वरित परीक्षा स्मरण बिंदु (Key Exam Points)" }],
          },
          {
            _key: "b6-2", _type: "block", style: "normal",
            children: [{ _key: "s6-2", _type: "span", text: "• **आयोग की नियुक्ति वर्ष**: 8 नवंबर 1927 (लंदन में)" }],
          },
          {
            _key: "b6-3", _type: "block", style: "normal",
            children: [{ _key: "s6-3", _type: "span", text: "• **भारत में आगमन तिथि**: 3 फरवरी 1928 (बंबई)" }],
          },
          {
            _key: "b6-4", _type: "block", style: "normal",
            children: [{ _key: "s6-4", _type: "span", text: "• **आयोग के अध्यक्ष**: सर जॉन साइमन (Sir John Simon)" }],
          },
          {
            _key: "b6-5", _type: "block", style: "normal",
            children: [{ _key: "s6-5", _type: "span", text: "• **कुल सदस्य संख्या**: 7 सदस्य (सभी ब्रिटिश - इसीलिए 'श्वेत आयोग' या 'White Commission' कहा गया)" }],
          },
          {
            _key: "b6-6", _type: "block", style: "normal",
            children: [{ _key: "s6-6", _type: "span", text: "• **उल्लेखनीय सदस्य**: क्लेमेंट एटली (Clement Attlee - जो बाद में 1947 में भारत की आजादी के समय ब्रिटेन के प्रधानमंत्री बने)" }],
          },
          {
            _key: "b6-7", _type: "block", style: "normal",
            children: [{ _key: "s6-7", _type: "span", text: "• **बहिष्कार का निर्णय लेने वाला अधिवेशन**: कांग्रेस का मद्रास अधिवेशन 1927 (अध्यक्ष: डॉ. एम. ए. अंसारी)" }],
          },
          {
            _key: "b6-8", _type: "block", style: "normal",
            children: [{ _key: "s6-8", _type: "span", text: "• **लाहौर प्रदर्शन तिथि**: 30 अक्टूबर 1928 (नेतृत्वकर्ता: लाला लाजपत राय)" }],
          },
          {
            _key: "b6-9", _type: "block", style: "normal",
            children: [{ _key: "s6-9", _type: "span", text: "• **लाला लाजपत राय की शहादत तिथि**: 17 नवंबर 1928" }],
          },
          {
            _key: "b6-10", _type: "block", style: "normal",
            children: [{ _key: "s6-10", _type: "span", text: "• **आयोग की रिपोर्ट प्रकाशन**: मई 1930" }],
          },
        ],
        bodyEn: [
          {
            _key: "b6-11", _type: "block", style: "h3",
            children: [{ _key: "s6-11", _type: "span", text: "6. Fast-Track Revision Points for Civil Services" }],
          },
          {
            _key: "b6-12", _type: "block", style: "normal",
            children: [{ _key: "s6-12", _type: "span", text: "• **Appointment Date**: November 8, 1927 (in London)" }],
          },
          {
            _key: "b6-13", _type: "block", style: "normal",
            children: [{ _key: "s6-13", _type: "span", text: "• **Arrival in India**: February 3, 1928 (Bombay)" }],
          },
          {
            _key: "b6-14", _type: "block", style: "normal",
            children: [{ _key: "s6-14", _type: "span", text: "• **Chairman**: Sir John Simon" }],
          },
          {
            _key: "b6-15", _type: "block", style: "normal",
            children: [{ _key: "s6-15", _type: "span", text: "• **Total Members**: 7 Members (All British MP - termed 'White Commission')" }],
          },
          {
            _key: "b6-16", _type: "block", style: "normal",
            children: [{ _key: "s6-16", _type: "span", text: "• **Notable Member**: Clement Attlee (who became British PM during Indian Independence in 1947)" }],
          },
          {
            _key: "b6-17", _type: "block", style: "normal",
            children: [{ _key: "s6-17", _type: "span", text: "• **Boycott Resolution**: INC Madras Session 1927 (President: Dr. M. A. Ansari)" }],
          },
          {
            _key: "b6-18", _type: "block", style: "normal",
            children: [{ _key: "s6-18", _type: "span", text: "• **Lahore Protest Date**: October 30, 1928 (Led by Lala Lajpat Rai)" }],
          },
          {
            _key: "b6-19", _type: "block", style: "normal",
            children: [{ _key: "s6-19", _type: "span", text: "• **Martyrdom of Lala Lajpat Rai**: November 17, 1928" }],
          },
          {
            _key: "b6-20", _type: "block", style: "normal",
            children: [{ _key: "s6-20", _type: "span", text: "• **Report Submission Date**: May 1930" }],
          },
        ],
      },
    ],

    /* ─── MCQs ──────────────────────────────────────────────── */
    mcqs: [
      {
        question: "साइमन कमीशन का औपचारिक नाम क्या था?",
        questionEn: "What was the formal official title of the Simon Commission?",
        options: ["भारतीय सांविधानिक आयोग (Indian Statutory Commission)", "भारतीय प्रशासनिक आयोग", "शाही स्वायत्तता आयोग", "केन्द्रीय सुधार आयोग"],
        optionsEn: ["Indian Statutory Commission", "Indian Administrative Commission", "Royal Autonomy Commission", "Central Reform Commission"],
        correctIndex: 0,
        explanation: "साइमन कमीशन को औपचारिक रूप से भारतीय सांविधानिक आयोग (Indian Statutory Commission) कहा गया था, जो भारत शासन अधिनियम 1919 की समीक्षा हेतु गठित हुआ था।",
        explanationEn: "The Simon Commission was officially titled the Indian Statutory Commission."
      },
      {
        question: "साइमन कमीशन का भारत में तीव्र विरोध क्यों किया गया?",
        questionEn: "Why did the Simon Commission face intense opposition across India?",
        options: ["क्योंकि इसने सांप्रदायिक निर्वाचन समाप्त कर दिया था", "क्योंकि इसमें एक भी भारतीय सदस्य शामिल नहीं था", "क्योंकि इसके अध्यक्ष लॉर्ड कैनिंग थे", "क्योंकि इसने प्रांतीय स्वायत्तता रद्द कर दी थी"],
        optionsEn: ["Because it abolished separate electorates", "Because not a single Indian member was included", "Because Lord Canning chaired it", "Because it cancelled provincial autonomy"],
        correctIndex: 1,
        explanation: "साइमन कमीशन के सभी 7 सदस्य अंग्रेज (ब्रिटिश संसद के सदस्य) थे। इसमें एक भी भारतीय सदस्य शामिल नहीं होने के कारण इसे 'श्वेत आयोग' (White Commission) कहा गया और इसका सर्वत्र विरोध हुआ।",
        explanationEn: "All 7 members of the commission were British MPs, making it an all-white commission without any Indian representation."
      },
      {
        question: "भारतीय राष्ट्रीय कांग्रेस के किस अधिवेशन में साइमन कमीशन के पूर्ण बहिष्कार का निर्णय लिया गया?",
        questionEn: "In which session of the Indian National Congress was the complete boycott of the Simon Commission decided?",
        options: ["लाहौर अधिवेशन 1929", "मद्रास अधिवेशन 1927", "कलकत्ता अधिवेशन 1928", "कराची अधिवेशन 1931"],
        optionsEn: ["Lahore Session 1929", "Madras Session 1927", "Calcutta Session 1928", "Karachi Session 1931"],
        correctIndex: 1,
        explanation: "दिसंबर 1927 के मद्रास अधिवेशन में डॉ. एम. ए. अंसारी की अध्यक्षता में कांग्रेस ने साइमन कमीशन के पूर्ण बहिष्कार का ऐतिहासिक प्रस्ताव पारित किया था।",
        explanationEn: "The 1927 INC Madras Session, chaired by Dr. M. A. Ansari, passed the resolution to boycott the Simon Commission."
      },
      {
        question: "साइमन कमीशन के विरोध के दौरान लाहौर में हुए पुलिस लाठीचार्ज में कौन-से महान स्वतंत्रता सेनानी गंभीर रूप से घायल हुए थे?",
        questionEn: "Which great freedom fighter was fatally injured during the police lathi charge while protesting against the Simon Commission in Lahore?",
        options: ["बाल गंगाधर तिलक", "विपिन चंद्र पाल", "लाला लाजपत राय", "गोपाल कृष्ण गोखले"],
        optionsEn: ["Bal Gangadhar Tilak", "Bipin Chandra Pal", "Lala Lajpat Rai", "Gopal Krishna Gokhale"],
        correctIndex: 2,
        explanation: "30 अक्टूबर 1928 को लाहौर में साइमन कमीशन के खिलाफ विरोध रैली का नेतृत्व करते हुए लाला लाजपत राय पुलिस लाठीचार्ज में सिर पर गंभीर चोटें लगने से घायल हुए और 17 नवंबर 1928 को शहीद हो गए।",
        explanationEn: "Lala Lajpat Rai was severely injured during the police lathi charge on Oct 30, 1928 in Lahore and attained martyrdom on Nov 17, 1928."
      },
      {
        question: "'मेरे शरीर पर पड़ी एक-एक लाठी ब्रिटिश साम्राज्य के ताबूत की कील साबित होगी' - यह प्रसिद्ध कथन किसका है?",
        questionEn: "'Every blow struck on my body will be a nail in the coffin of the British Empire' - Who made this famous statement?",
        options: ["भगत सिंह", "लाला लाजपत राय", "सुभाष चंद्र बोस", "चंद्रशेखर आजाद"],
        optionsEn: ["Bhagat Singh", "Lala Lajpat Rai", "Subhash Chandra Bose", "Chandrashekhar Azad"],
        correctIndex: 1,
        explanation: "यह ऐतिहासिक कथन पंजाब केसरी लाला लाजपत राय का है, जो उन्होंने लाहौर में लाठीचार्ज के बाद घायल अवस्था में दिया था।",
        explanationEn: "This iconic statement was made by Punjab Kesari Lala Lajpat Rai after being wounded in Lahore."
      },
      {
        question: "साइमन कमीशन की चुनौती के उत्तर में भारतीयों द्वारा 1928 में तैयार की गई संवैधानिक रिपोर्ट कौन-सी थी?",
        questionEn: "Which constitutional document was prepared by Indians in 1928 in response to the Simon Commission challenge?",
        options: ["जिन्ना के 14 सूत्र", "नेहरू रिपोर्ट (Nehru Report)", "पुना पैक्ट", "वेवेल योजना"],
        optionsEn: ["Jinnah's 14 Points", "Nehru Report", "Poona Pact", "Wavell Plan"],
        correctIndex: 1,
        explanation: "ब्रिटिश भारत सचिव लॉर्ड बर्कनहेड की चुनौती के जवाब में सर्वदलीय समिति ने पं. मोतीलाल नेहरू की अध्यक्षता में 'नेहरू रिपोर्ट (1928)' तैयार की थी।",
        explanationEn: "In response to Lord Birkenhead's challenge, the All-Parties Conference chaired by Motilal Nehru published the Nehru Report in 1928."
      }
    ],

    /* ─── FAQs ──────────────────────────────────────────────── */
    faqs: [
      {
        question: "साइमन कमीशन क्या था और इसका गठन क्यों किया गया था?",
        questionEn: "What was the Simon Commission and why was it formed?",
        answer: "साइमन कमीशन (भारतीय सांविधानिक आयोग) 7 ब्रिटिश सांसदों का एक समूह था, जिसे सर जॉन साइमन की अध्यक्षता में 1927 में नियुक्त किया गया था। इसका मुख्य उद्देश्य भारत शासन अधिनियम 1919 के कामकाज और द्वैध शासन प्रणाली की समीक्षा करना तथा नए संवैधानिक सुधारों की सिफारिश करना था।",
        answerEn: "The Simon Commission (Indian Statutory Commission) was a group of 7 British MPs formed under Sir John Simon in 1927 to evaluate the Government of India Act 1919 and recommend constitutional reforms."
      },
      {
        question: "साइमन कमीशन को 'श्वेत आयोग' क्यों कहा जाता है?",
        questionEn: "Why is the Simon Commission called the 'White Commission'?",
        answer: "क्योंकि साइमन कमीशन के सभी 7 सदस्य अंग्रेज (ब्रिटिश संसद के सदस्य) थे और इसमें एक भी भारतीय प्रतिनिधि को शामिल नहीं किया गया था। इसीलिए इसे 'श्वेत आयोग' (All-White Commission) कहा जाता है।",
        answerEn: "It is called the White Commission because all seven of its members were British, excluding any Indian representation."
      },
      {
        question: "साइमन कमीशन का भारत में विरोध किस नारे के साथ हुआ?",
        questionEn: "With which famous slogan was the Simon Commission protested in India?",
        answer: "3 फरवरी 1928 को जब साइमन कमीशन बंबई पहुँचा, तो पूरे देश में काले झंडों और हड़तालों के साथ **'Simon Go Back' (साइमन वापस जाओ)** के नारे से इसका विरोध किया गया।",
        answerEn: "When the commission arrived in Bombay on Feb 3, 1928, it was met with black flags and the slogan 'Simon Go Back'."
      },
      {
        question: "लाला लाजपत राय की शहादत का साइमन कमीशन से क्या संबंध है?",
        questionEn: "How is the martyrdom of Lala Lajpat Rai connected to the Simon Commission?",
        answer: "30 अक्टूबर 1928 को लाहौर में साइमन कमीशन के विरोध प्रदर्शन का नेतृत्व लाला लाजपत राय कर रहे थे। वहाँ ब्रिटिश पुलिस अधिकारी सॉन्डर्स और स्कॉट के आदेश पर हुए निर्दय लाठीचार्ज में लालाजी के सिर में गंभीर चोटें आईं और 17 नवंबर 1928 को वे शहीद हो गए।",
        answerEn: "On Oct 30, 1928, while leading a peaceful protest against the Simon Commission in Lahore, Lala Lajpat Rai suffered severe injuries from a police lathi charge and passed away on Nov 17, 1928."
      },
      {
        question: "साइमन कमीशन की सिफारिशों का 1935 के अधिनियम पर क्या प्रभाव पड़ा?",
        questionEn: "What impact did the Simon Commission recommendations have on the GOI Act 1935?",
        answer: "साइमन कमीशन की सिफारिशों के आधार पर ही भारत शासन अधिनियम 1935 में प्रांतों से द्वैध शासन को समाप्त करके 'प्रांतीय स्वायत्तता' (Provincial Autonomy) दी गई तथा केंद्र में द्वैध शासन लागू करने की योजना तैयार की गई।",
        answerEn: "The Commission's recommendations directly influenced the Government of India Act 1935, which introduced Provincial Autonomy and abolished provincial diarchy."
      }
    ],

    /* ─── Sources ────────────────────────────────────────────── */
    sources: [
      { label: "National Archives of India - Freedom Struggle Records", url: "https://nationalarchives.nic.in" },
      { label: "NCERT Class 12 Modern Indian History Textbook", url: "https://ncert.nic.in" },
      { label: "MPPSC Official Syllabus & Historical Archives", url: "https://mppsc.mp.gov.in" }
    ]
  };

  try {
    await client.createOrReplace(article);
    console.log("✨ Successfully uploaded Simon Commission Static GK Article to Sanity!");
  } catch (err) {
    console.error("❌ Failed to create/replace document in Sanity:", err);
  }
}

main().catch((err) => {
  console.error("❌ Error running script:", err);
  process.exit(1);
});
