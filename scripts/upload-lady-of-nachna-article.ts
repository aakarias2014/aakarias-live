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
  console.log("🚀 Starting upload process for 'Lady of Nachna' Gupta Sculpture Article...");

  // Image file paths in public/images/blog/
  const imagePaths = {
    cover: path.resolve(process.cwd(), "public/images/blog/lady-of-nachna-gupta-sculpture-panna-cover.jpg"),
    temples: path.resolve(process.cwd(), "public/images/blog/nachna-kuthara-parvati-and-chaumukhnath-temples.jpg"),
  };

  // Verify images exist
  if (!fs.existsSync(imagePaths.cover) || !fs.existsSync(imagePaths.temples)) {
    console.error("❌ Required images not found in public/images/blog/");
    process.exit(1);
  }

  // 1. Upload Cover Image
  console.log("📸 Uploading cover banner image to Sanity...");
  const assetCover = await client.assets.upload("image", fs.createReadStream(imagePaths.cover), {
    filename: "lady-of-nachna-gupta-sculpture-panna-cover.jpg",
  });
  console.log(`✔ Uploaded Cover Image. Asset ID: ${assetCover._id}`);

  // 2. Upload Supporting Temples Image
  console.log("📸 Uploading Nachna temples architectural image to Sanity...");
  const assetTemples = await client.assets.upload("image", fs.createReadStream(imagePaths.temples), {
    filename: "nachna-kuthara-parvati-and-chaumukhnath-temples.jpg",
  });
  console.log(`✔ Uploaded Supporting Temples Image. Asset ID: ${assetTemples._id}`);

  const authorId = "author-aakar-ias-team";

  // SEO Target Keywords
  const keywordsArray = [
    "लेडी ऑफ नचना",
    "लेडी ऑफ नचना क्या है",
    "lady of nachna panna madhya pradesh",
    "lady of nachna gupta period sculpture asi",
    "1500 year old gupta sculpture discovered in panna",
    "nachna kuthara parvati temple ramayana friezes",
    "chaumukhnath temple chaturmukha shivling nachna",
    "lady of nachna vs lady of gyaraspur",
    "लेडी ऑफ नचना बनाम लेडी ऑफ ग्यारसपुर",
    "asi discovery nachna panna november 2026",
    "dr shivakant vajpayee asi nachna",
    "gupta era grey sandstone nayika self adornment",
    "mppsc prelims unit 2 mp history nachna temples",
    "mppsc mains paper 1 part a gupta architecture",
    "alexander cunningham nachna kuthara 1883 84",
    "vakataka vyaghradeva nachna inscriptions",
    "earliest structural stone temples in india nachna",
    "ancient hair clip gupta woman sculpture nachna",
    "panna district historical sites mppsc notes",
    "golden age of indian art gupta period sculptures",
    "shalbhanjika gyaraspur vidisha mona lisa of india",
    "chaturmukha shivling sadyojata vamadeva aghora tatpurusha"
  ];

  const docTitleHi = "‘लेडी ऑफ नचना’ (Lady of Nachna): पन्ना में मिली 1,500 साल पुरानी गुप्तकालीन मूर्ति, पार्वती मंदिर व परीक्षा नोट्स | MPPSC & UPSC";
  const docTitleEn = "‘Lady of Nachna’: 1,500-Year-Old Gupta Period Sculpture Discovered in Panna, Parvati Temple & Exam Notes | MPPSC & UPSC";

  const docExcerptHi = "नवंबर 2026 में भारतीय पुरातत्व सर्वेक्षण (ASI) द्वारा मध्य प्रदेश के पन्ना जिले की सलेहा तहसील स्थित ऐतिहासिक नचना कुठार में जमीन से 4 फीट नीचे 1,500 साल पुरानी दुर्लभ गुप्तकालीन बलुआ पत्थर की ‘लेडी ऑफ नचना’ (Lady of Nachna) प्रतिमा खोजी गई। 20 सेमी ऊंची यह प्रतिमा स्वयं श्रृंगार करती नायिका को सातलड़ी हार व हेयर क्लिप के साथ दर्शाती है। जानें पार्वती मंदिर, चौमुखनाथ मंदिर एवं लेडी ऑफ ग्यारसपुर से तुलना।";
  const docExcerptEn = "In November 2026, the Archaeological Survey of India (ASI) unearthed a pristine 1,500-year-old Gupta-era grey sandstone sculpture titled the 'Lady of Nachna' from a depth of 4 feet at Nachna Kuthara, Panna district (Madhya Pradesh). Depicting a graceful nayika adorning her hair with an ancient hair-clip and saptaladi necklace, this discovery revolutionizes our understanding of 5th-century classical Indian art. Includes architectural analysis of Parvati & Chaumukhnath temples, Gyaraspur comparison, and 8 practice MCQs for MPPSC & UPSC.";

  const docSlug = "lady-of-nachna-1500-year-old-gupta-sculpture-panna-mppsc-notes";

  // Upsert for both Current Affairs and Static GK
  const docIds = [
    "ca-lady-of-nachna-gupta-sculpture-panna",
    "gk-lady-of-nachna-gupta-sculpture-panna",
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
      ca_date: "2026-11-20",
      publishedAt: "2026-11-20T08:00:00.000Z",
      featured: true,
      readingTime: 10,
      keywords: keywordsArray,
      seoTitle: sanitizeText("लेडी ऑफ नचना (Lady of Nachna) पन्ना गुप्तकालीन मूर्ति | MPPSC & UPSC"),
      seoTitleEn: sanitizeText("Lady of Nachna 1500-Year-Old Gupta Sculpture Panna | MPPSC & UPSC"),
      metaDescription: sanitizeText(docExcerptHi),
      metaDescriptionEn: sanitizeText(docExcerptEn),
      category: { _type: "reference", _ref: "cat-history" },
      author: { _type: "reference", _ref: authorId },
      tags: [
        { _type: "reference", _ref: "tag-mppsc", _key: "ref-tag-mppsc" },
        { _type: "reference", _ref: "tag-upsc", _key: "ref-tag-upsc" },
        { _type: "reference", _ref: "tag-prelims", _key: "ref-tag-prelims" },
        { _type: "reference", _ref: "tag-mains", _key: "ref-tag-mains" },
      ],
      syllabus: [
        "MPPSC Prelims Paper-1 Unit 2 (History, Culture & Literature of Madhya Pradesh - Ancient Dynasties & Art)",
        "MPPSC Mains Paper-1 Part-A Unit 4 & 5 (Architecture & Sculpture of Madhya Pradesh - Gupta & Medieval Art)",
        "UPSC GS Paper-1 (Indian Heritage and Culture - Ancient Art Forms, Sculptures & Temple Architecture)",
      ],
      featuredImage: {
        _type: "image",
        asset: { _type: "reference", _ref: assetCover._id },
        alt: "लेडी ऑफ नचना (Lady of Nachna) पन्ना मध्य प्रदेश में मिली 1500 साल पुरानी गुप्तकालीन मूर्ति | Lady of Nachna Gupta Sculpture Banner",
      },
      mainImage: {
        _type: "image",
        asset: { _type: "reference", _ref: assetCover._id },
        alt: "Lady of Nachna Gupta Era Grey Sandstone Nayika Sculpture Discovered by ASI in Panna Madhya Pradesh",
      },
      nextArticle: {
        title: "भारत के प्रमुख प्राचीन अभिलेख एवं स्तूप: ऐतिहासिक व पुरातात्विक नोट्स",
        titleEn: "Ancient Inscriptions and Stupas of India: Historical & Archaeological Notes",
        href: "/general-awareness/bharat-ke-pramukh-abhilekh-evam-stoop-mppsc-upsc-notes",
      },

      /* ─── SECTIONS ──────────────────────────────────────────────── */
      sections: [
        /* ── 1. Discovery & Historical Background ─────────────────── */
        {
          _key: "sec-discovery",
          kind: "whyInNews",
          title: sanitizeText("1. खोज और ऐतिहासिक पृष्ठभूमि (Discovery & Historical Context)"),
          titleEn: sanitizeText("1. Discovery & Historical Context of Lady of Nachna"),
          body: [
            {
              _key: "b1-1",
              _type: "block",
              style: "h3",
              children: [{ _key: "s1-1", _type: "span", text: sanitizeText("मध्य प्रदेश के पन्ना में पुरातात्विक उत्खनन की ऐतिहासिक उपलब्धि") }],
            },
            {
              _key: "b1-2",
              _type: "block",
              style: "normal",
              children: [{ _key: "s1-2", _type: "span", text: sanitizeText("• **स्थान और उत्खनन**: नवंबर 2026 में **भारतीय पुरातत्व सर्वेक्षण (ASI - Archaeological Survey of India)** द्वारा मध्य प्रदेश के पन्ना जिले की सलेहा तहसील के ऐतिहासिक **नचना (नचना कुठार)** गांव में वैज्ञानिक उत्खनन के दौरान जमीन से लगभग **4 फीट नीचे** एक दुर्लभ मूर्ति प्राप्त हुई, जिसे पुरातत्वविदों द्वारा **'लेडी ऑफ नचना' (Lady of Nachna)** नाम दिया गया है।") }],
            },
            {
              _key: "b1-3",
              _type: "block",
              style: "normal",
              children: [{ _key: "s1-3", _type: "span", text: sanitizeText("• **ऐतिहासिक काल (गुप्त काल)**: पुरातत्वविदों के अनुसार यह प्रतिमा **चौथी से पांचवीं शताब्दी ईस्वी (लगभग 1,500 वर्ष पूर्व - गुप्त काल)** की है। भारतीय इतिहास में गुप्त काल को कला, स्थापत्य और साहित्य का **'स्वर्ण युग' (Golden Age)** माना जाता है।") }],
            },
            {
              _key: "b1-4",
              _type: "block",
              style: "normal",
              children: [{ _key: "s1-4", _type: "span", text: sanitizeText("• **असाधारण सुरक्षित अवस्था**: इस खोज की सबसे बड़ी विशेषता यह है कि यह किसी बड़े मंदिर की दीवार या स्तंभ से टूटा हुआ खंडित अवशेष नहीं है, बल्कि एक **स्वतंत्र और पूर्ण प्रतिमा (Freestanding and Complete Sculpture)** है, जो 1,500 वर्षों तक भूमिगत रहने के बावजूद आश्चर्यजनक रूप से अक्षुण्ण अवस्था में मिली है।") }],
            },
            {
              _key: "b1-5",
              _type: "block",
              style: "normal",
              children: [{ _key: "s1-5", _type: "span", text: sanitizeText("• **परीक्षा प्रासंगिकता**: [MPPSC Prelims Syllabus 2026](/mppsc/prelims-syllabus) की यूनिट 2 (मध्य प्रदेश का इतिहास, संस्कृति एवं साहित्य) तथा [MPPSC Mains Syllabus 2026](/mppsc/mains-syllabus) के पेपर 1 (भाग-अ: मध्य प्रदेश में मूर्तिकला व मंदिर स्थापत्य) के लिए यह एक अत्यंत महत्वपूर्ण विषय है।") }],
            },
          ],
          bodyEn: [
            {
              _key: "b1-1e",
              _type: "block",
              style: "h3",
              children: [{ _key: "s1-1e", _type: "span", text: sanitizeText("Historic Archaeological Excavation in Panna, Madhya Pradesh") }],
            },
            {
              _key: "b1-2e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s1-2e", _type: "span", text: sanitizeText("• **Provenance & Excavation**: In November 2026, the **Archaeological Survey of India (ASI)** unearthed an exquisite ancient sculpture, formally designated the **'Lady of Nachna'**, from a depth of approximately **4 feet underground** during systematic scientific excavations at Nachna (Nachna Kuthara) village in Saleha tehsil, Panna district, Madhya Pradesh.") }],
            },
            {
              _key: "b1-3e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s1-3e", _type: "span", text: sanitizeText("• **Chronological Dating (Gupta Era)**: Stylistic and stratigraphical analysis dates the sculpture to the **4th to 5th Century CE (approx. 1,500 years old - Classical Gupta Period)**, universally celebrated as the 'Golden Age' of classical Indian plastic art and architecture.") }],
            },
            {
              _key: "b1-4e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s1-4e", _type: "span", text: sanitizeText("• **Unbroken Freestanding State**: Unlike typical architectural temple fragments or structural friezes, this sculpture is a **complete, independent, freestanding artifact** preserved in near-pristine condition after 15 centuries.") }],
            },
            {
              _key: "b1-5e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s1-5e", _type: "span", text: sanitizeText("• **Syllabus Mapping**: Crucial for [MPPSC Prelims Paper 1 Unit 2](/en/mppsc/prelims-syllabus) (History, Culture & Architecture of MP) and [MPPSC Mains Paper 1 Part A](/en/mppsc/mains-syllabus).") }],
            },
          ],
        },

        /* ── 2. Artistic & Anatomical Features ────────────────────── */
        {
          _key: "sec-artistic-features",
          kind: "issues",
          title: sanitizeText("2. मूर्ति की बनावट और कलात्मक विशेषताएँ (Artistic Features & Anatomy)"),
          titleEn: sanitizeText("2. Anatomical Structure & Artistic Excellence of Lady of Nachna"),
          body: [
            {
              _key: "b2-1",
              _type: "block",
              style: "h3",
              children: [{ _key: "s2-1", _type: "span", text: sanitizeText("आकार, माध्यम एवं गुप्तकालीन पॉलिश") }],
            },
            {
              _key: "b2-2",
              _type: "block",
              style: "normal",
              children: [{ _key: "s2-2", _type: "span", text: sanitizeText("• **आकार और सामग्री**: लगभग **20 सेंटीमीटर (करीब 8 इंच)** ऊंची यह प्रतिमा सूक्ष्म दानेदार **भूरे रंग के बलुआ पत्थर (Grey Sandstone)** से तराशी गई है। इसकी सतह पर गुप्तकालीन शिल्प की सर्वोत्कृष्ट पहचान मानी जाने वाली अत्यंत चिकनी और चमकदार पॉलिश विद्यमान है।") }],
            },
            {
              _key: "b2-3",
              _type: "block",
              style: "normal",
              children: [{ _key: "s2-3", _type: "span", text: sanitizeText("• **श्रृंगार करती नायिका (Darpan/Shringar Nayika)**: किसी देवी अथवा पौराणिक चरित्र के स्थान पर, इसमें एक सामान्य स्त्री (नायिका) को **स्वयं का श्रृंगार (Self-adornment)** और केश-सज्जा करते हुए दर्शाया गया है। यह प्राचीन भारतीय समाज में नारी की व्यक्तिगत स्वतंत्रता, सौंदर्य चेतना और दैनिक जीवन के यथार्थवादी चित्रण को प्रकट करता है।") }],
            },
            {
              _key: "b2-4",
              _type: "block",
              style: "normal",
              children: [{ _key: "s2-4", _type: "span", text: sanitizeText("• **अति-सूक्ष्म आभूषण**: मूर्तिकार ने नायिका के गले में **सात लड़ियों वाला हार (सप्तलड़ी हार)**, कानों में बड़े कुंडल, सुडौल बाजुओं में कलात्मक बाजूबंद और कलाइयों में सुंदर चूड़ियों को बेहद बारीकी से उकेरा है।") }],
            },
            {
              _key: "b2-5",
              _type: "block",
              style: "normal",
              children: [{ _key: "s2-5", _type: "span", text: sanitizeText("• **अनोखी आधुनिक केश-सज्जा (Hair Clip Phenomenon)**: इस प्रतिमा का सर्वाधिक विस्मयकारी पहलू इसके बालों का विन्यास है। महिला के बालों में एक **सजावटी क्लिप (Decorative Hair Clip)** जैसी वस्तु स्पष्ट रूप से लगी हुई दिखाई देती है। यह ऐतिहासिक साक्ष्य साबित करता है कि आज से 1,500 वर्ष पूर्व भी भारतीय महिलाओं में आधुनिक केश-विन्यास और हेयर क्लिप का परिष्कृत उपयोग प्रचलित था।") }],
            },
          ],
          bodyEn: [
            {
              _key: "b2-1e",
              _type: "block",
              style: "h3",
              children: [{ _key: "s2-1e", _type: "span", text: sanitizeText("Dimensions, Medium & Classical Gupta Polish") }],
            },
            {
              _key: "b2-2e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s2-2e", _type: "span", text: sanitizeText("• **Dimensions & Medium**: Standing approximately **20 centimeters (about 8 inches)** in height, carved meticulously from fine-grained **grey sandstone**. The surface retains the radiant, porcelain-like mirror polish characteristic of peak Gupta ateliers.") }],
            },
            {
              _key: "b2-3e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s2-3e", _type: "span", text: sanitizeText("• **Secular Nayika Adorning Herself**: Departing from divine or celestial iconography, it depicts a secular mortal maiden (nayika) engaged in the intimate act of **self-adornment (prasadhan / shringar)**, reflecting aesthetic consciousness and realistic feminine agency in classical India.") }],
            },
            {
              _key: "b2-4e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s2-4e", _type: "span", text: sanitizeText("• **Intricate Classical Ornaments**: Adorned with a delicate **seven-strand beaded pearl necklace (saptaladi haar)**, circular ear kundalas, sculpted armlets (keyura), and wrist bangles (kankana).") }],
            },
            {
              _key: "b2-5e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s2-5e", _type: "span", text: sanitizeText("• **The Ancient 'Hair Clip' Sensation**: The crowning artistic highlight is her elaborate coiffure. Her gathered tresses are secured with a distinctly carved **decorative hair clip**, providing physical archaeological proof that modern hair-clasping accoutrements were in active fashionable use in 5th-century India.") }],
            },
          ],
        },

        /* ── 3. Archaeological Significance & Comparison ─────────── */
        {
          _key: "sec-significance",
          kind: "reforms",
          title: sanitizeText("3. पुरातात्विक एवं सांस्कृतिक महत्व (Archaeological & Cultural Significance)"),
          titleEn: sanitizeText("3. Archaeological Significance & Comparative Art History"),
          body: [
            {
              _key: "b3-1",
              _type: "block",
              style: "h3",
              children: [{ _key: "s3-1", _type: "span", text: sanitizeText("मध्य प्रदेश में अपनी तरह की पहली अद्वितीय खोज") }],
            },
            {
              _key: "b3-2",
              _type: "block",
              style: "normal",
              children: [{ _key: "s3-2", _type: "span", text: sanitizeText("• **डॉ. शिवकांत वाजपेयी का कथन**: ASI जबलपुर मंडल के अधीक्षण पुरातत्वविद **डॉ. शिवकांत वाजपेयी** के अनुसार, मध्य प्रदेश में अब तक प्राप्त मूर्तियों में यह अपनी तरह की पहली स्वतंत्र प्रतिमा है जिसमें किसी महिला को सक्रिय रूप से श्रृंगार और केश-सज्जा करते हुए यथार्थवादी शैली में दर्शाया गया है।") }],
            },
            {
              _key: "b3-3",
              _type: "block",
              style: "normal",
              children: [{ _key: "s3-3", _type: "span", text: sanitizeText("• **ग्यारसपुर की शालभंजिका से प्राचीनता**: मध्य प्रदेश के विदिशा स्थित ग्यारसपुर की विश्वप्रसिद्ध **'लेडी ऑफ ग्यारसपुर' (शालभंजिका - भारत की मोनालिसा)** प्रतिहार काल (9वीं-10वीं शताब्दी) की है, जबकि 'लेडी ऑफ नचना' उससे लगभग **400 से 500 वर्ष अधिक प्राचीन** है।") }],
            },
            {
              _key: "b3-4",
              _type: "block",
              style: "normal",
              children: [{ _key: "s3-4", _type: "span", text: sanitizeText("• **खजुराहो की 'सुखनायिका' से तुलना**: खजुराहो संग्रहालय में संरक्षित 10वीं-11वीं शताब्दी की चंदेलकालीन 'सुखनायिका' की तुलना में यह गुप्तकालीन नायिका भारतीय मूर्तिकला के विकासक्रम की प्रारंभिक और अधिक स्वाभाविक नींव को दर्शाती है।") }],
            },
            {
              _key: "b3-5",
              _type: "block",
              style: "normal",
              children: [{ _key: "s3-5", _type: "span", text: sanitizeText("• **संरक्षण**: ASI ने इस अमूल्य राष्ट्रीय धरोहर को सुरक्षित कर लिया है और रासायनिक संरक्षण के उपरांत इसे शोधकर्ताओं व आम पर्यटकों के लिए संग्रहालय में प्रदर्शित किया जाएगा।") }],
            },
          ],
          bodyEn: [
            {
              _key: "b3-1e",
              _type: "block",
              style: "h3",
              children: [{ _key: "s3-1e", _type: "span", text: sanitizeText("First-of-its-Kind Secular Discovery in Central India") }],
            },
            {
              _key: "b3-2e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s3-2e", _type: "span", text: sanitizeText("• **ASI Expert Endorsement**: According to **Dr. Shivakant Vajpayee**, Superintending Archaeologist at ASI Jabalpur Circle, this is the very first freestanding sculpture unearthed in Madhya Pradesh representing a woman actively performing personal coiffure and cosmetics.") }],
            },
            {
              _key: "b3-3e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s3-3e", _type: "span", text: sanitizeText("• **Centuries Older than Lady of Gyaraspur**: Vidisha's internationally acclaimed 9th-10th century Pratihara masterpiece, the **'Lady of Gyaraspur' (Shalabhanjika)**, is post-Gupta. 'Lady of Nachna' predates it by **400 to 500 years**.") }],
            },
            {
              _key: "b3-4e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s3-4e", _type: "span", text: sanitizeText("• **Bridging Evolutionary Art Eras**: Precedes the famous 10th-11th century Chandela sculptures of Khajuraho (such as the 'Sukhanaika'), providing a vital empirical link in tracking the evolution of Indian feminine aesthetics from naturalistic classical Gupta restraint to medieval ornamental dynamism.") }],
            },
            {
              _key: "b3-5e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s3-5e", _type: "span", text: sanitizeText("• **Museum Conservation**: Currently preserved under institutional custody of the ASI for scientific stabilization and planned public exhibition.") }],
            },
          ],
        },

        /* ── 4. Nachna Kuthara Historical Landscape & Temples ─────── */
        {
          _key: "sec-temples",
          kind: "background",
          title: sanitizeText("4. नचना गांव का ऐतिहासिक महत्व: पार्वती मंदिर एवं चौमुखनाथ मंदिर (Nachna Temples)"),
          titleEn: sanitizeText("4. Historical Landscape of Nachna Kuthara: Parvati & Chaumukhnath Temples"),
          body: [
            {
              _key: "b4-1",
              _type: "block",
              style: "h3",
              children: [{ _key: "s4-1", _type: "span", text: sanitizeText("नचना कुठार: भारतीय पाषाण मंदिर वास्तुकला की जन्मस्थली") }],
            },
            {
              _key: "b4-2",
              _type: "block",
              style: "normal",
              children: [{ _key: "s4-2", _type: "span", text: sanitizeText("• **अलेक्जेंडर कनिंघम का सर्वेक्षण (1883-84)**: नचना कुठार की ऐतिहासिक महत्ता को सर्वप्रथम आधुनिक इतिहास के पटल पर लाने का श्रेय ब्रिटिश पुरातत्वविद **सर अलेक्जेंडर कनिंघम (Alexander Cunningham)** को जाता है, जिन्होंने वर्ष 1883-84 में इस स्थल का विस्तृत पुरातात्विक सर्वेक्षण किया था।") }],
            },
            {
              _key: "b4-3",
              _type: "block",
              style: "h3",
              children: [{ _key: "s4-3", _type: "span", text: sanitizeText("1. पार्वती मंदिर (Parvati Temple, Nachna Kuthara)") }],
            },
            {
              _key: "b4-4",
              _type: "block",
              style: "normal",
              children: [{ _key: "s4-4", _type: "span", text: sanitizeText("• **भारत का सबसे पुराना पाषाण मंदिर**: यह मंदिर भारत में पत्थर से बने सबसे पुराने सुरक्षित संरचनात्मक मंदिरों (Structural Stone Temples) में से एक माना जाता है।") }],
            },
            {
              _key: "b4-5",
              _type: "block",
              style: "normal",
              children: [{ _key: "s4-5", _type: "span", text: sanitizeText("• **निर्माण काल एवं वाकाटक शासक**: इसका निर्माण **5वीं शताब्दी ईस्वी (लगभग 465 ईस्वी)** के आसपास गुप्त काल के दौरान हुआ था। पास ही मिले अभिलेखों के अनुसार इसे वाकाटक वंश के शासकों के सामंत **व्याघ्रदेव (Vyaghradeva)** द्वारा बनवाया गया माना जाता है।") }],
            },
            {
              _key: "b4-6",
              _type: "block",
              style: "normal",
              children: [{ _key: "s4-6", _type: "span", text: sanitizeText("• **समतल छत एवं प्रदक्षिणा पथ**: यह मंदिर एक ऊंचे चबूतरे (जगती) पर बना है। इसके गर्भगृह की छत **समतल (Flat-roofed)** है, जो प्रारंभिक गुप्तकालीन मंदिरों की मुख्य पहचान है। गर्भगृह के ठीक ऊपर एक छोटा दूसरा कक्ष भी है तथा चारों ओर जालीदार खिड़कियों (गवाक्ष) से युक्त ढका हुआ प्रदक्षिणा पथ है।") }],
            },
            {
              _key: "b4-7",
              _type: "block",
              style: "normal",
              children: [{ _key: "s4-7", _type: "span", text: sanitizeText("• **रामायण के सबसे प्राचीन अंकन**: मंदिर के प्रवेश द्वार पर **गंगा और यमुना** की नक्काशीदार प्रतिमाएँ हैं। इसकी दीवारों और चबूतरे पर **रामायण के दुर्लभ दृश्य (जैसे शूर्पणखा प्रसंग, सीता हरण, रावण-जटायु युद्ध)** उकेरे गए हैं, जो भारतीय मंदिर कला में रामायण कथाओं के सबसे प्राचीन दृश्य साक्ष्य माने जाते हैं।") }],
            },
            {
              _key: "b4-8",
              _type: "block",
              style: "h3",
              children: [{ _key: "s4-8", _type: "span", text: sanitizeText("2. चौमुखनाथ मंदिर (Chaumukhnath Mahadev Temple)") }],
            },
            {
              _key: "b4-9",
              _type: "block",
              style: "normal",
              children: [{ _key: "s4-9", _type: "span", text: sanitizeText("• **भगवान शिव को समर्पित नागर शिखर मंदिर**: पार्वती मंदिर के समीप स्थित यह मंदिर भारतीय मंदिर निर्माण कला में समतल छत से **'शिखर' (Nagara Shikhara)** की ओर संक्रमण को दर्शाता है। इसका मूल निर्माण 5वीं शताब्दी (गुप्त काल) में हुआ था, जबकि इसका ऊंचा वक्ररेखीय शिखर 7वीं से 9वीं शताब्दी के बीच (प्रतिहार/कलचुरी काल) में विकसित हुआ।") }],
            },
            {
              _key: "b4-10",
              _type: "block",
              style: "normal",
              children: [{ _key: "s4-10", _type: "span", text: sanitizeText("• **चतुर्मुखी शिवलिंग**: इसके गर्भगृह में भगवान शिव का एक विशाल और दुर्लभ **चतुर्मुखी शिवलिंग** स्थापित है, जिसके चार मुख शिव के चार अलग-अलग स्वरूपों — **सद्योजात, वामदेव, अघोर (रौद्र/भैरव) और तत्पुरुष** को अत्यंत सजीवता से दर्शाते हैं।") }],
            },
            {
              _key: "b4-img",
              _type: "image",
              asset: { _type: "reference", _ref: assetTemples._id },
              alt: "Ancient 5th Century Gupta Era Parvati and Chaumukhnath Temples at Nachna Kuthara Panna Madhya Pradesh",
              caption: "चित्र: नचना कुठार (पन्ना, म.प्र.) स्थित 5वीं शताब्दी का ऐतिहासिक गुप्तकालीन पार्वती मंदिर एवं समीपवर्ती नागर शिखर युक्त चौमुखनाथ मंदिर",
            },
          ],
          bodyEn: [
            {
              _key: "b4-1e",
              _type: "block",
              style: "h3",
              children: [{ _key: "s4-1e", _type: "span", text: sanitizeText("Nachna Kuthara: Cradle of Indian Structural Stone Architecture") }],
            },
            {
              _key: "b4-2e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s4-2e", _type: "span", text: sanitizeText("• **Alexander Cunningham's Survey (1883-84)**: The monumental significance of Nachna Kuthara was first documented scientifically by British archaeologist **Sir Alexander Cunningham** during his seminal Central India archaeological surveys in 1883-84.") }],
            },
            {
              _key: "b4-3e",
              _type: "block",
              style: "h3",
              children: [{ _key: "s4-3e", _type: "span", text: sanitizeText("1. Parvati Temple (c. 465 CE)") }],
            },
            {
              _key: "b4-4e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s4-4e", _type: "span", text: sanitizeText("• **Earliest Surviving Stone Temple**: Among the earliest standing structural stone temples in Indian architectural history.") }],
            },
            {
              _key: "b4-5e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s4-5e", _type: "span", text: sanitizeText("• **Vakataka Feudatory Inscription**: Built around **465 CE** during the Gupta epoch by feudatory chieftain **Vyaghradeva**, subordinate to the Vakataka dynasty, as confirmed by epigraphical records found at the site.") }],
            },
            {
              _key: "b4-6e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s4-6e", _type: "span", text: sanitizeText("• **Flat Roof & Perforated Trellises**: Elevated on a high molded stone plinth (jagati) with western stairs. Features a **flat roof** with a smaller upper story sanctum chamber and an enclosed ambulatory circumambulatory path (pradakshina-patha) illuminated by pierced stone lattice windows (gavakshas).") }],
            },
            {
              _key: "b4-7e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s4-7e", _type: "span", text: sanitizeText("• **Earliest Ramayana Narrative Reliefs**: The temple doorway displays river goddesses Ganga and Yamuna. Its plinth moldings bear the **earliest known sculpted Ramayana narrative panels** in Indian art (including the Surpanakha mutilation, Ravana's abduction of Sita, and Jatayu's valor).") }],
            },
            {
              _key: "b4-8e",
              _type: "block",
              style: "h3",
              children: [{ _key: "s4-8e", _type: "span", text: sanitizeText("2. Chaumukhnath Temple (Chaturmukha Mahadev)") }],
            },
            {
              _key: "b4-9e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s4-9e", _type: "span", text: sanitizeText("• **Evolution of the Nagara Shikhara**: Adjoining the Parvati temple, it traces the historical evolution from flat roof sanctums to towering **Nagara curvilinear shikharas**. Founded in the 5th century Gupta era, its upper superstructure was augmented during the 7th-9th centuries under Pratihara/Kalachuri regimes.") }],
            },
            {
              _key: "b4-10e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s4-10e", _type: "span", text: sanitizeText("• **Rare Four-Faced Shiva Lingam**: Houses a colossal 5th-century **Chaturmukha Shiva Lingam**, capturing four cosmic manifestations of Shiva: **Sadyojata, Vamadeva, Aghora (fierce Bhairava), and Tatpurusha** with sublime spiritual serenity.") }],
            },
          ],
        },

        /* ── 5. Comparison Tables ─────────────────────────────────── */
        {
          _key: "sec-tables",
          kind: "initiatives",
          title: sanitizeText("5. तुलनात्मक सारणियाँ (Comparative Analysis Tables)"),
          titleEn: sanitizeText("5. Comparative Analysis Tables: Nachna Temples & Iconic Sculptures"),
          body: [
            {
              _key: "b5-t1-heading",
              _type: "block",
              style: "h3",
              children: [{ _key: "s5-t1", _type: "span", text: sanitizeText("सारणी 1: पार्वती मंदिर बनाम चौमुखनाथ मंदिर तुलनात्मक सारणी") }],
            },
            createTable(
              "table-nachna-temples",
              "नचना कुठार के प्रमुख मंदिरों का तुलनात्मक अध्ययन (पार्वती मंदिर बनाम चौमुखनाथ मंदिर)",
              ["विशेषता (Feature)", "पार्वती मंदिर (Parvati Temple)", "चौमुखनाथ मंदिर (Chaumukhnath Temple)"],
              [
                ["निर्माण काल", "5वीं शताब्दी ईस्वी (लगभग 465 ईस्वी - गुप्त काल)", "मूल: 5वीं शताब्दी (गुप्त); शिखर: 7वीं–9वीं शताब्दी"],
                ["मुख्य देवता", "देवी पार्वती (मूल रूप से शिव/पार्वती)", "चतुर्मुखी शिवलिंग (भगवान शिव)"],
                ["छत / शिखर संरचना", "समतल छत (Flat-roofed, दो मंजिला लघु कक्ष)", "नागर शैली का वक्ररेखीय ऊंचा शिखर (Nagara Shikhara)"],
                ["प्रमुख वास्तुकला लक्षण", "ऊंची जगती, ढका हुआ प्रदक्षिणा पथ, जालीदार गवाक्ष", "परिपक्व नागर मंदिर विन्यास, बाहरी दीवारों पर नक्काशी"],
                ["प्रमुख कलात्मक आकर्षण", "गंगा-यमुना द्वारपाल और रामायण के दुर्लभ प्रसंग", "भगवान शिव का चार मुखों वाला दुर्लभ विशाल शिवलिंग"],
                ["अभिलेखीय साक्ष्य", "वाकाटक सामंत व्याघ्रदेव के उत्कीर्ण लेख", "उत्तर गुप्त एवं मध्यकालीन स्थापत्य शैलियों का मिश्रण"],
                ["संरक्षण स्थिति", "ASI द्वारा राष्ट्रीय महत्व का संरक्षित स्मारक", "ASI द्वारा राष्ट्रीय महत्व का संरक्षित स्मारक"]
              ]
            ),
            {
              _key: "b5-t2-heading",
              _type: "block",
              style: "h3",
              children: [{ _key: "s5-t2", _type: "span", text: sanitizeText("सारणी 2: 'लेडी ऑफ नचना' बनाम 'लेडी ऑफ ग्यारसपुर' (शालभंजिका) तुलना") }],
            },
            createTable(
              "table-nachna-vs-gyaraspur",
              "लेडी ऑफ नचना बनाम लेडी ऑफ ग्यारसपुर: भारतीय मूर्तिकला का तुलनात्मक विश्लेषण",
              ["विशेषता (Feature)", "लेडी ऑफ नचना (Lady of Nachna)", "लेडी ऑफ ग्यारसपुर (Lady of Gyaraspur - शालभंजिका)"],
              [
                ["खोज स्थान एवं जिला", "नचना कुठार (पन्ना जिला, मध्य प्रदेश)", "ग्यारसपुर (विदिशा जिला, मध्य प्रदेश)"],
                ["ऐतिहासिक काल", "चौथी–पांचवीं शताब्दी ईस्वी (गुप्त काल)", "नौवीं–दसवीं शताब्दी ईस्वी (प्रतिहार काल)"],
                ["प्राचीनता व कालक्रम", "ग्यारसपुर की प्रतिमा से लगभग 400 से 500 वर्ष अधिक प्राचीन", "मध्यकालीन अलंकृत मूर्तिकला का परिपक्व प्रतिनिधित्व"],
                ["आकार और स्वरूप", "लगभग 20 सेमी (8 इंच) ऊंची छोटी स्वतंत्र प्रतिमा", "बड़े आकार की स्मारकीय प्रतिमा (मूलतः मंदिर स्तंभ/तोरण का अंग)"],
                ["मुद्रा एवं भावभंगिमा", "सामान्य नायिका, जो दर्पण देखकर स्वयं का केश-श्रृंगार कर रही है", "शालभंजिका / अप्सरा की त्रिभंग नृत्य मुद्रा, चेहरे पर रहस्यमयी मुस्कान"],
                ["पत्थर एवं सतह पॉलिश", "भूरे रंग का बलुआ पत्थर (Grey Sandstone), चमकदार गुप्त पॉलिश", "हल्के पीले-भूरे रंग का बलुआ पत्थर (Buff Sandstone), गहरी नक्काशी"],
                ["विशेष आभूषण व पहचान", "बालों में सजावटी हेयर क्लिप और गले में सातलड़ी हार", "चेहरे की 'मोनालिसा' जैसी मुस्कान और आभूषणों का अति-अलंकरण"],
                ["वर्तमान स्थिति व संरक्षण", "नवंबर 2026 में ASI द्वारा खोजी गई, ASI संरक्षण में", "ग्वालियर के गुजरी महल संग्रहालय (Gujari Mahal) में सुरक्षित"],
                ["कला का ऐतिहासिक संदेश", "गुप्त काल की सहज सादगी, आनुपातिक संतुलन व स्वाभाविक सौंदर्य", "प्रतिहार कालीन शास्त्रीय परिपक्वता, गतिशीलता व वैभवशाली अलंकरण"]
              ]
            ),
          ],
          bodyEn: [
            {
              _key: "b5-t1e-heading",
              _type: "block",
              style: "h3",
              children: [{ _key: "s5-t1e", _type: "span", text: sanitizeText("Table 1: Comparative Analysis of Nachna Temples (Parvati vs Chaumukhnath)") }],
            },
            createTable(
              "table-nachna-temples-en",
              "Comparative Study of Nachna Kuthara Temples (Parvati vs Chaumukhnath)",
              ["Feature", "Parvati Temple", "Chaumukhnath Temple"],
              [
                ["Period of Construction", "5th Century CE (c. 465 CE - Classical Gupta)", "Core: 5th Century CE; Shikhara: 7th–9th Century CE"],
                ["Principal Presiding Deity", "Goddess Parvati (or Shiva-Parvati)", "Chaturmukha Shiva Lingam (Four-Faced Shiva)"],
                ["Roof Superstructure", "Flat roof with miniature upper sanctum chamber", "Towering Curvilinear Nagara Shikhara"],
                ["Architectural Highlights", "High Jagati plinth, covered pradakshina-patha, pierced gavakshas", "Transition to mature Nagara temple plan with external friezes"],
                ["Artistic Masterpiece", "Ganga-Yamuna dvarashakhas & earliest Ramayana reliefs", "Majestic Four-Faced Chaturmukha Shiva Lingam"],
                ["Epigraphical Record", "Inscribed records of Vakataka vassal Vyaghradeva", "Evolution from Late Gupta to Pratihara/Kalachuri idiom"],
                ["Statutory Protection", "Protected Monument of National Importance (ASI)", "Protected Monument of National Importance (ASI)"]
              ]
            ),
            {
              _key: "b5-t2e-heading",
              _type: "block",
              style: "h3",
              children: [{ _key: "s5-t2e", _type: "span", text: sanitizeText("Table 2: Comparative Study: Lady of Nachna vs Lady of Gyaraspur (Shalabhanjika)") }],
            },
            createTable(
              "table-nachna-vs-gyaraspur-en",
              "Comparative Aesthetic Analysis: Lady of Nachna vs Lady of Gyaraspur",
              ["Feature", "Lady of Nachna", "Lady of Gyaraspur (Shalabhanjika)"],
              [
                ["Findspot & District", "Nachna Kuthara (Panna District, Madhya Pradesh)", "Gyaraspur (Vidisha District, Madhya Pradesh)"],
                ["Chronological Era", "4th–5th Century CE (Classical Gupta Period)", "9th–10th Century CE (Pratihara Period)"],
                ["Antiquity Differential", "Approximately 400 to 500 years older than Gyaraspur", "Represents mature medieval North Indian sculpture"],
                ["Dimensions & Format", "Compact 20 cm (8 inch) freestanding independent sculpture", "Monumental architectural bracket figure from a temple pillar"],
                ["Pose & Subject Matter", "Secular Nayika engaged in intimate personal coiffure/adornment", "Celestial Shalabhanjika/Apsara in dynamic Tribhanga dance posture"],
                ["Stone & Polishing", "Grey Sandstone with high lustrous classical Gupta glaze", "Buff Sandstone with deeply undercut ornamental relief"],
                ["Defining Attributes", "Prominent carved hair clip and delicate seven-strand necklace", "Enigmatic 'Indian Mona Lisa' smile and lavish jewel ornamentation"],
                ["Current Repository", "Excavated Nov 2026; housed under ASI institutional custody", "Preserved and displayed at Gujari Mahal Museum, Gwalior Fort"],
                ["Aesthetic Significance", "Exemplifies Gupta naturalistic balance, modesty & proportion", "Exemplifies medieval ornamentation, movement & baroque luxury"]
              ]
            ),
          ],
        },

        /* ── 6. Art History & Conservation ────────────────────────── */
        {
          _key: "sec-art-evolution",
          kind: "background",
          title: sanitizeText("6. भारतीय मूर्तिकला के विकास में महत्व व संरक्षण (Art History & Cultural Insights)"),
          titleEn: sanitizeText("6. Evolution of Indian Plastic Art & Scientific Conservation"),
          body: [
            {
              _key: "b6-1",
              _type: "block",
              style: "normal",
              children: [{ _key: "s6-1", _type: "span", text: sanitizeText("• **कला का विकासक्रम**: लेडी ऑफ नचना गुप्त काल की सादगी, स्वाभाविक सौंदर्य और प्रारंभिक शिल्प कौशल को दिखाती है, जबकि लेडी ऑफ ग्यारसपुर लगभग 500 साल बाद के प्रतिहार काल की परिपक्व, अलंकृत और गतिशील मूर्तिकला का उत्कृष्ट उदाहरण है।") }],
            },
            {
              _key: "b6-2",
              _type: "block",
              style: "normal",
              children: [{ _key: "s6-2", _type: "span", text: sanitizeText("• **अभिलेखीय व ऐतिहासिक संदर्भ**: मध्य प्रदेश के प्राचीन मंदिरों व शिलालेखों की व्यापक समझ के लिए हमारे विशेष अध्ययन नोट्स [भारत के प्रमुख प्राचीन अभिलेख एवं स्तूप](/general-awareness/bharat-ke-pramukh-abhilekh-evam-stoop-mppsc-upsc-notes) का अध्ययन करें, जहां सांची, एररण और नचना के शिलालेखीय साक्ष्यों का संकलन है।") }],
            },
            {
              _key: "b6-3",
              _type: "block",
              style: "normal",
              children: [{ _key: "s6-3", _type: "span", text: sanitizeText("• **जनजातीय व लोक कलाओं से जुड़ाव**: जैसे मध्य प्रदेश में [बैगा जनजाति की सांस्कृतिक परंपराएँ](/general-awareness/baiga-tribe-madhya-pradesh-pvtg) और हाल ही में गिनीज रिकॉर्ड बनाने वाला [असम का कार्बी लोकनृत्य ‘निमसो केरुंग’](/current-affairs/assam-karbi-folk-dance-nimso-kerung-guinness-world-record) भारत की विविधता को दर्शाते हैं, वैसे ही गुप्तकालीन नचना की खोज शास्त्रीय धरोहर का मुकुट है।") }],
            },
          ],
          bodyEn: [
            {
              _key: "b6-1e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s6-1e", _type: "span", text: sanitizeText("• **Evolutionary Paradigm**: The Lady of Nachna embodies classical Gupta naturalism, restrained grace, and organic proportionality, whereas the Lady of Gyaraspur embodies mature medieval Pratihara ornamentation, dynamic curvature, and elaborate jewelry.") }],
            },
            {
              _key: "b6-2e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s6-2e", _type: "span", text: sanitizeText("• **Epigraphical & Architectural Interlinking**: For an integrated perspective on ancient Central Indian epigraphy and architecture, explore our study notes on [Ancient Inscriptions and Stupas of India](/en/general-awareness/bharat-ke-pramukh-abhilekh-evam-stoop-mppsc-upsc-notes).") }],
            },
            {
              _key: "b6-3e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s6-3e", _type: "span", text: sanitizeText("• **Cultural Synthesis**: Paralleling tribal living heritage like the [Baiga Tribe of MP](/en/general-awareness/baiga-tribe-madhya-pradesh-pvtg) and the record-setting [Assam Karbi Folk Dance Nimso Kerung](/en/current-affairs/assam-karbi-folk-dance-nimso-kerung-guinness-world-record), Nachna represents the zenith of classical stone art.") }],
            },
          ],
        },

        /* ── 7. High-Yield Exam Memory Points ─────────────────────── */
        {
          _key: "sec-exam-highlights",
          kind: "background",
          title: sanitizeText("7. MPPSC एवं UPSC परीक्षा हेतु महत्वपूर्ण स्मरणीय तथ्य (High-Yield Quick Revision)"),
          titleEn: sanitizeText("7. High-Yield Memory Points for MPPSC & UPSC Aspirants"),
          body: [
            {
              _key: "b7-1",
              _type: "block",
              style: "normal",
              children: [{ _key: "s7-1", _type: "span", text: sanitizeText("• **खोज का नाम व तिथि**: 'लेडी ऑफ नचना' (Lady of Nachna) — नवंबर 2026।") }],
            },
            {
              _key: "b7-2",
              _type: "block",
              style: "normal",
              children: [{ _key: "s7-2", _type: "span", text: sanitizeText("• **उत्खनन स्थल**: नचना (नचना कुठार), सलेहा तहसील, पन्ना जिला, मध्य प्रदेश (जमीन से 4 फीट नीचे)।") }],
            },
            {
              _key: "b7-3",
              _type: "block",
              style: "normal",
              children: [{ _key: "s7-3", _type: "span", text: sanitizeText("• **खोजकर्ता संस्था**: भारतीय पुरातत्व सर्वेक्षण (ASI - अधीक्षण पुरातत्वविद डॉ. शिवकांत वाजपेयी)।") }],
            },
            {
              _key: "b7-4",
              _type: "block",
              style: "normal",
              children: [{ _key: "s7-4", _type: "span", text: sanitizeText("• **ऐतिहासिक काल**: 4थी से 5वीं शताब्दी ईस्वी (गुप्त काल — लगभग 1,500 वर्ष प्राचीन)।") }],
            },
            {
              _key: "b7-5",
              _type: "block",
              style: "normal",
              children: [{ _key: "s7-5", _type: "span", text: sanitizeText("• **सामग्री व आकार**: भूरा बलुआ पत्थर (Grey Sandstone), लगभग 20 सेमी (8 इंच) ऊंची स्वतंत्र प्रतिमा।") }],
            },
            {
              _key: "b7-6",
              _type: "block",
              style: "normal",
              children: [{ _key: "s7-6", _type: "span", text: sanitizeText("• **मुख्य विषयवस्तु**: केश-सज्जा और स्वयं का श्रृंगार करती सामान्य स्त्री (नायिका)।") }],
            },
            {
              _key: "b7-7",
              _type: "block",
              style: "normal",
              children: [{ _key: "s7-7", _type: "span", text: sanitizeText("• **विशिष्ट पहचान**: बालों में लगा सजावटी हेयर क्लिप और गले में सात लड़ियों वाला हार (सप्तलड़ी हार)।") }],
            },
            {
              _key: "b7-8",
              _type: "block",
              style: "normal",
              children: [{ _key: "s7-8", _type: "span", text: sanitizeText("• **नचना पार्वती मंदिर का निर्माता**: वाकाटक सामंत व्याघ्रदेव (लगभग 465 ईस्वी, समतल छत शैली)।") }],
            },
            {
              _key: "b7-9",
              _type: "block",
              style: "normal",
              children: [{ _key: "s7-9", _type: "span", text: sanitizeText("• **चौमुखनाथ मंदिर की विशेषता**: गर्भगृह में 5वीं सदी का चतुर्मुखी शिवलिंग, नागर शैली का शिखर।") }],
            },
            {
              _key: "b7-10",
              _type: "block",
              style: "normal",
              children: [{ _key: "s7-10", _type: "span", text: sanitizeText("• **नचना मंदिरों का प्रथम आधुनिक सर्वेक्षक**: सर अलेक्जेंडर कनिंघम (1883-84 ईस्वी)।") }],
            },
          ],
          bodyEn: [
            {
              _key: "b7-1e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s7-1e", _type: "span", text: sanitizeText("• **Artifact Designation & Date**: 'Lady of Nachna' — Unearthed in November 2026.") }],
            },
            {
              _key: "b7-2e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s7-2e", _type: "span", text: sanitizeText("• **Excavation Provenance**: Nachna Kuthara, Saleha Tehsil, Panna District, MP (4 feet below ground).") }],
            },
            {
              _key: "b7-3e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s7-3e", _type: "span", text: sanitizeText("• **Excavating Agency**: Archaeological Survey of India (ASI, headed by Dr. Shivakant Vajpayee).") }],
            },
            {
              _key: "b7-4e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s7-4e", _type: "span", text: sanitizeText("• **Chronological Horizon**: 4th to 5th Century CE (Classical Gupta Period — ~1,500 years old).") }],
            },
            {
              _key: "b7-5e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s7-5e", _type: "span", text: sanitizeText("• **Medium & Dimensions**: Grey Sandstone, 20 cm (approx. 8 inches) freestanding sculpture.") }],
            },
            {
              _key: "b7-6e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s7-6e", _type: "span", text: sanitizeText("• **Subject Matter**: Secular Nayika engaged in personal hair coiffure & self-adornment.") }],
            },
            {
              _key: "b7-7e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s7-7e", _type: "span", text: sanitizeText("• **Iconic Diagnostic Features**: Sculpted decorative hair clip and seven-strand beaded necklace.") }],
            },
            {
              _key: "b7-8e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s7-8e", _type: "span", text: sanitizeText("• **Parvati Temple Patron**: Vakataka feudatory Vyaghradeva (c. 465 CE, flat-roofed style).") }],
            },
            {
              _key: "b7-9e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s7-9e", _type: "span", text: sanitizeText("• **Chaumukhnath Temple Highlight**: Four-faced Chaturmukha Shiva Lingam with Nagara shikhara.") }],
            },
            {
              _key: "b7-10e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s7-10e", _type: "span", text: sanitizeText("• **First Scientific Survey**: Sir Alexander Cunningham (1883-84).") }],
            },
          ],
        },
      ],

      /* ── 8 Practice MCQs (Quizzes) ──────────────────────────────── */
      mcqs: [
        {
          question: "नवंबर 2026 में भारतीय पुरातत्व सर्वेक्षण (ASI) द्वारा मध्य प्रदेश के किस जिले में 1,500 साल पुरानी 'लेडी ऑफ नचना' प्रतिमा खोजी गई?",
          questionEn: "In which district of Madhya Pradesh did the Archaeological Survey of India (ASI) unearth the 1,500-year-old 'Lady of Nachna' sculpture in November 2026?",
          options: [
            "पन्ना जिला (Panna)",
            "विदिशा जिला (Vidisha)",
            "छतरपुर जिला (Chhatarpur)",
            "उज्जैन जिला (Ujjain)"
          ],
          optionsEn: [
            "Panna District",
            "Vidisha District",
            "Chhatarpur District",
            "Ujjain District"
          ],
          correctIndex: 0,
          explanation: "नवंबर 2026 में ASI द्वारा मध्य प्रदेश के पन्ना जिले की सलेहा तहसील के ऐतिहासिक नचना कुठार गांव में जमीन से 4 फीट नीचे यह गुप्तकालीन प्रतिमा खोजी गई।",
          explanationEn: "In November 2026, ASI unearthed the 1,500-year-old Gupta-era sculpture from a depth of 4 feet at Nachna Kuthara, Saleha tehsil, Panna district (MP)."
        },
        {
          question: "'लेडी ऑफ नचना' प्रतिमा किस ऐतिहासिक काल एवं कला शैली से संबंधित है?",
          questionEn: "To which historical era and artistic tradition does the 'Lady of Nachna' sculpture belong?",
          options: [
            "मौर्य काल (Mauryan Period)",
            "गुप्त काल (Gupta Period - 4थी से 5वीं शताब्दी ईस्वी)",
            "चंदेल काल (Chandela Period)",
            "प्रतिहार काल (Pratihara Period)"
          ],
          optionsEn: [
            "Mauryan Period",
            "Gupta Period (4th–5th Century CE)",
            "Chandela Period",
            "Pratihara Period"
          ],
          correctIndex: 1,
          explanation: "यह प्रतिमा 4थी से 5वीं शताब्दी ईस्वी (गुप्त काल) की है, जिसे भारतीय कला और स्थापत्य का स्वर्ण युग कहा जाता है।",
          explanationEn: "The sculpture belongs to the 4th–5th Century CE (Classical Gupta Period), universally celebrated as the Golden Age of Indian art."
        },
        {
          question: "'लेडी ऑफ नचना' प्रतिमा की सबसे अद्वितीय आधुनिक विशेषता क्या है जो पुरातत्वविदों के आकर्षण का केंद्र बनी?",
          questionEn: "What is the most unique, modern-like diagnostic feature of the 'Lady of Nachna' sculpture that amazed archaeologists?",
          options: [
            "हाथ में आधुनिक मोबाइल का चित्रण",
            "बालों में लगा सजावटी हेयर क्लिप (Decorative Hair Clip)",
            "पैरों में हाई-हील सैंडल",
            "हाथ में पिस्तौल का अंकन"
          ],
          optionsEn: [
            "Depiction of a modern mobile device",
            "A decorative hair clip worn in her coiffure",
            "High-heeled footwear",
            "Depiction of a firearm"
          ],
          correctIndex: 1,
          explanation: "नायिका के बालों में एक आधुनिक हेयर क्लिप जैसी सजावटी वस्तु लगी हुई है, जो दर्शाती है कि 1,500 वर्ष पूर्व भी भारतीय महिलाओं में आधुनिक केश-विन्यास प्रचलित था।",
          explanationEn: "Her sculpted tresses feature a distinctly carved decorative hair clip, establishing empirical proof of sophisticated hair accessories in 5th-century India."
        },
        {
          question: "नचना कुठार स्थित 5वीं शताब्दी का प्रसिद्ध 'पार्वती मंदिर' किस वास्तुशिल्प विशेषता के लिए जाना जाता है?",
          questionEn: "For which distinctive architectural characteristic is the famous 5th-century 'Parvati Temple' at Nachna Kuthara renowned?",
          options: [
            "ऊंचा द्रविड़ गोपुरम",
            "प्रारंभिक गुप्तकालीन समतल छत (Flat-roofed) एवं ऊंची जगती",
            "विशाल अष्टकोणीय स्तूप",
            "लकड़ी की नक्काशीदार छत"
          ],
          optionsEn: [
            "Towering Dravidian Gopuram",
            "Early Gupta-style flat roof on an elevated stone plinth (Jagati)",
            "Colossal octagonal stupa",
            "Carved timber ceiling"
          ],
          correctIndex: 1,
          explanation: "पार्वती मंदिर भारत के सबसे पुराने पत्थर के मंदिरों में से एक है, जिसमें समतल छत, ऊंची जगती, गवाक्ष और गंगा-यमुना द्वारपाल मूर्तियां हैं।",
          explanationEn: "The Parvati temple is one of India's earliest structural stone temples, featuring a characteristic flat roof, high jagati plinth, and perforated stone windows."
        },
        {
          question: "नचना कुठार के पार्वती मंदिर की दीवारों पर किन प्राचीनतम धार्मिक प्रसंगों के पाषाण शिल्प उकेरे गए हैं?",
          questionEn: "Which earliest narrative reliefs in Indian temple art are sculpted on the plinth and walls of the Nachna Parvati Temple?",
          options: [
            "महाभारत का कुरुक्षेत्र युद्ध",
            "रामायण के दुर्लभ प्रसंग (शूर्पणखा प्रसंग, सीता हरण, जटायु प्रसंग)",
            "जातक कथाएं",
            "पंचतंत्र की कहानियां"
          ],
          optionsEn: [
            "Mahabharata Kurukshetra War",
            "Rare Ramayana narrative scenes (Surpanakha, Sita Haran, Jatayu)",
            "Jataka Tales",
            "Panchatantra fables"
          ],
          correctIndex: 1,
          explanation: "पार्वती मंदिर के चबूतरे और दीवारों पर रामायण के दुर्लभ प्रसंग उकेरे गए हैं, जो भारतीय मंदिर वास्तुकला में रामायण के सबसे प्राचीन शिल्प अंकनों में गिने जाते हैं।",
          explanationEn: "The temple features the earliest surviving sculpted Ramayana narrative panels in Indian structural stone temple architecture."
        },
        {
          question: "नचना कुठार स्थित 'चौमुखनाथ मंदिर' के गर्भगृह में स्थापित मुख्य शिवलिंग की क्या विशेषता है?",
          questionEn: "What is the defining attribute of the presiding Shiva Lingam inside the sanctum of the Chaumukhnath Temple at Nachna?",
          options: [
            "यह 12 ज्योतिर्लिंगों में से एक है",
            "यह भगवान शिव का चार मुखों वाला (सद्योजात, वामदेव, अघोर, तत्पुरुष) दुर्लभ शिवलिंग है",
            "यह पारे (पारद) से बना हुआ है",
            "यह केवल जल में तैरता है"
          ],
          optionsEn: [
            "It is one of the 12 Jyotirlingas",
            "It is a rare four-faced (Sadyojata, Vamadeva, Aghora, Tatpurusha) Shiva Lingam",
            "It is cast in mercury (Parad)",
            "It floats on water"
          ],
          correctIndex: 1,
          explanation: "चौमुखनाथ मंदिर में 5वीं सदी का विशाल चतुर्मुखी शिवलिंग स्थापित है, जिसमें शिव के चार मुख (रौद्र अघोर और सौम्य ध्यानमग्न रूप) उकेरे गए हैं।",
          explanationEn: "It enshrines a magnificent 5th-century four-faced Chaturmukha Lingam depicting Sadyojata, Vamadeva, Aghora (fierce), and Tatpurusha."
        },
        {
          question: "नचना कुठार के ऐतिहासिक मंदिरों का सर्वप्रथम वैज्ञानिक पुरातात्विक सर्वेक्षण किस ब्रिटिश विद्वान द्वारा 1883-84 में किया गया था?",
          questionEn: "Which renowned British archaeologist first systematically surveyed the historic temples of Nachna Kuthara in 1883-84?",
          options: [
            "सर जॉन मार्शल (Sir John Marshall)",
            "सर अलेक्जेंडर कनिंघम (Sir Alexander Cunningham)",
            "मोर्टिमर व्हीलर (Mortimer Wheeler)",
            "जेम्स प्रिंसेप (James Prinsep)"
          ],
          optionsEn: [
            "Sir John Marshall",
            "Sir Alexander Cunningham",
            "Mortimer Wheeler",
            "James Prinsep"
          ],
          correctIndex: 1,
          explanation: "भारतीय पुरातत्व के जनक सर अलेक्जेंडर कनिंघम ने 1883-84 में नचना कुठार का विस्तृत पुरातात्विक सर्वेक्षण कर इसे राष्ट्रीय पटल पर स्थापित किया।",
          explanationEn: "Sir Alexander Cunningham, founder of the Archaeological Survey of India, surveyed Nachna Kuthara in 1883-84."
        },
        {
          question: "विदिशा की प्रसिद्ध 'लेडी ऑफ ग्यारसपुर' (शालभंजिका) की तुलना में 'लेडी ऑफ नचना' कितनी प्राचीन मानी गई है?",
          questionEn: "Compared to Vidisha's famous 'Lady of Gyaraspur' (Shalabhanjika), how much older is the 'Lady of Nachna'?",
          options: [
            "लगभग 100 वर्ष",
            "लगभग 400 से 500 वर्ष अधिक प्राचीन",
            "दोनों समकालीन हैं",
            "लेडी ऑफ नचना ग्यारसपुर से नई है"
          ],
          optionsEn: [
            "Approximately 100 years",
            "Approximately 400 to 500 years older",
            "Both are exactly contemporary",
            "Lady of Nachna is younger than Gyaraspur"
          ],
          correctIndex: 1,
          explanation: "ग्यारसपुर की शालभंजिका प्रतिहार काल (9वीं-10वीं सदी) की है, जबकि लेडी ऑफ नचना गुप्त काल (4थी-5वीं सदी) की है, जो उससे लगभग 400 से 500 वर्ष अधिक प्राचीन है।",
          explanationEn: "Lady of Gyaraspur is 9th-10th century Pratihara art, making the 4th-5th century Gupta 'Lady of Nachna' roughly 400 to 500 years older."
        }
      ],

      /* ── 10 Collapsible FAQs ────────────────────────────────────── */
      faqs: [
        {
          question: "‘लेडी ऑफ नचना’ (Lady of Nachna) क्या है और यह कहाँ मिली है?",
          questionEn: "What is the 'Lady of Nachna' and where was it found?",
          answer: "‘लेडी ऑफ नचना’ लगभग 1,500 साल पुरानी गुप्तकालीन (4थी-5वीं शताब्दी) भूरे बलुआ पत्थर से निर्मित 20 सेमी ऊंची एक दुर्लभ प्रतिमा है। यह नवंबर 2026 में मध्य प्रदेश के पन्ना जिले की सलेहा तहसील के नचना कुठार गांव में जमीन से 4 फीट नीचे ASI की खुदाई में मिली है।",
          answerEn: "The 'Lady of Nachna' is a 1,500-year-old Gupta period (4th–5th century CE) grey sandstone sculpture measuring 20 cm, unearthed from 4 feet underground in Nov 2026 at Nachna Kuthara, Panna district, Madhya Pradesh by the ASI."
        },
        {
          question: "इस प्रतिमा की सबसे प्रमुख कलात्मक विशेषता क्या है?",
          questionEn: "What is the defining artistic feature of this sculpture?",
          answer: "यह किसी देवी के बजाय एक सामान्य स्त्री (नायिका) को स्वयं का श्रृंगार करते हुए दर्शाती है। इसके बालों में एक आधुनिक जैसी सजावटी हेयर क्लिप और गले में सात लड़ियों वाला हार (सप्तलड़ी हार) बेहद बारीक नक्काशी के साथ उकेरा गया है।",
          answerEn: "Depicting a secular nayika engaged in personal self-adornment, it features an intricately carved decorative hair clip securing her coiffure and a delicate seven-strand beaded necklace."
        },
        {
          question: "‘लेडी ऑफ नचना’ और ‘लेडी ऑफ ग्यारसपुर’ में मुख्य अंतर क्या है?",
          questionEn: "What is the key difference between Lady of Nachna and Lady of Gyaraspur?",
          answer: "लेडी ऑफ नचना गुप्त काल (4थी-5वीं सदी) की 20 सेमी की स्वतंत्र प्रतिमा है और यह ग्यारसपुर से 400-500 वर्ष पुरानी है। लेडी ऑफ ग्यारसपुर प्रतिहार काल (9वीं-10वीं सदी) की एक स्मारकीय शालभंजिका है जो ग्वालियर के गुजरी महल में सुरक्षित है।",
          answerEn: "Lady of Nachna is a 20 cm freestanding 5th-century Gupta sculpture, roughly 400–500 years older than the monumental 9th-10th century Pratihara Shalabhanjika 'Lady of Gyaraspur' housed in Gujari Mahal, Gwalior."
        },
        {
          question: "नचना कुठार का पार्वती मंदिर भारत के इतिहास में क्यों प्रसिद्ध है?",
          questionEn: "Why is the Nachna Parvati Temple celebrated in Indian architectural history?",
          answer: "यह भारत में पत्थर से बने सबसे पुराने सुरक्षित संरचनात्मक मंदिरों में से एक है (लगभग 465 ईस्वी)। इसकी समतल छत, ढका हुआ प्रदक्षिणा पथ और दीवारों पर रामायण के प्राचीनतम शिल्प अंकन (शूर्पणखा प्रसंग, सीता हरण) इसे अद्वितीय बनाते हैं।",
          answerEn: "Constructed c. 465 CE, it is one of India's earliest standing structural stone temples, celebrated for its flat-roofed Gupta architecture and the earliest carved Ramayana friezes."
        },
        {
          question: "पार्वती मंदिर का निर्माण किस शासक/वंश द्वारा करवाया गया था?",
          questionEn: "Who commissioned the construction of the Nachna Parvati Temple?",
          answer: "शिलालेखीय साक्ष्यों के अनुसार इसका निर्माण गुप्त काल में वाकाटक वंश के शासकों के सामंत व्याघ्रदेव (Vyaghradeva) द्वारा करवाया गया था।",
          answerEn: "Epigraphical records confirm it was built under chieftain Vyaghradeva, a feudatory vassal of the Vakataka dynasty during the Gupta epoch."
        },
        {
          question: "चौमुखनाथ मंदिर की मुख्य धार्मिक व वास्तुशिल्प पहचान क्या है?",
          questionEn: "What is the architectural and religious hallmark of the Chaumukhnath Temple?",
          answer: "इसके गर्भगृह में 5वीं सदी का विशाल चतुर्मुखी शिवलिंग स्थापित है (सद्योजात, वामदेव, अघोर, तत्पुरुष)। इसका ऊंचा वक्ररेखीय शिखर गुप्तकालीन समतल छत से नागर शिखर की ओर ऐतिहासिक विकास को दर्शाता है।",
          answerEn: "It enshrines a colossal 5th-century four-faced Shiva Lingam and features an evolved Nagara curvilinear shikhara demonstrating the transition from flat roofs to temple spires."
        },
        {
          question: "नचना कुठार के मंदिरों की खोज किसने की थी?",
          questionEn: "Who surveyed the temples of Nachna Kuthara initially?",
          answer: "ब्रिटिश पुरातत्वविद सर अलेक्जेंडर कनिंघम ने वर्ष 1883-84 में इन मंदिरों का प्रथम वैज्ञानिक पुरातात्विक सर्वेक्षण किया था।",
          answerEn: "British archaeologist Sir Alexander Cunningham conducted the first systematic scientific survey of Nachna Kuthara in 1883-84."
        },
        {
          question: "लेडी ऑफ नचना किस पत्थर से बनी है और इस पर कौन सी पॉलिश है?",
          questionEn: "Which stone and polish characterize the Lady of Nachna?",
          answer: "यह भूरे रंग के बलुआ पत्थर (Grey Sandstone) से बनी है और इस पर गुप्तकालीन शिल्प की विशिष्ट चमकदार एवं चिकनी पॉलिश मौजूद है।",
          answerEn: "Carved from fine-grained grey sandstone, it displays the characteristic radiant, glass-smooth polish of peak Gupta ateliers."
        },
        {
          question: "MPPSC परीक्षा के लिए यह विषय क्यों महत्वपूर्ण है?",
          questionEn: "Why is this discovery vital for MPPSC exam preparation?",
          answer: "MPPSC प्रारंभिक परीक्षा यूनिट 2 (मध्य प्रदेश का इतिहास व स्थापत्य) और मुख्य परीक्षा पेपर 1 (इतिहास व संस्कृति) में गुप्तकालीन मंदिरों, अभिलेखों एवं पन्ना जिले की धरोहरों पर सीधे प्रश्न पूछे जाते हैं।",
          answerEn: "Directly tested under MPPSC Prelims Unit 2 (MP History & Architecture) and Mains Paper 1 (Central Indian art, Gupta monuments, and archaeological finds)."
        },
        {
          question: "क्या यह प्रतिमा जनता के दर्शन हेतु उपलब्ध होगी?",
          questionEn: "Will the sculpture be placed on public display?",
          answer: "हाँ, ASI द्वारा रासायनिक संरक्षण एवं वैज्ञानिक दस्तावेजीकरण के पश्चात इसे शोधकर्ताओं और आम जनता के अवलोकनार्थ संग्रहालय में प्रदर्शित किया जाएगा।",
          answerEn: "Yes, following chemical stabilization and documentation by the ASI, it will be placed on institutional museum display for researchers and the public."
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

