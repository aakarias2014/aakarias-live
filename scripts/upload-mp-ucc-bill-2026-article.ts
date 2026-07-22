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

// Helper to convert an array of strings into separate Portable Text blocks
function createBlocks(items: string[]): any[] {
  return items.map((text, idx) => {
    const randomSuffix = Math.random().toString(36).substring(2, 9);
    if (text.startsWith("### ")) {
      return {
        _key: `block-h-${idx}-${randomSuffix}`,
        _type: "block",
        style: "h3",
        children: [
          {
            _key: `span-h-${idx}-${randomSuffix}`,
            _type: "span",
            text: text.replace("### ", ""),
          },
        ],
      };
    }
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
  console.log("🚀 Starting upload process for MP UCC Bill 2026 Current Affairs Article...");

  // Image file paths in public/images/blog/
  const imagePaths = {
    featured: path.resolve(process.cwd(), "public/images/blog/mp-ucc-1.png"),
    constitution: path.resolve(process.cwd(), "public/images/blog/mp-ucc-2.png"),
    womenRights: path.resolve(process.cwd(), "public/images/blog/mp-ucc-3.png"),
  };

  // Check if files exist
  if (
    !fs.existsSync(imagePaths.featured) ||
    !fs.existsSync(imagePaths.constitution) ||
    !fs.existsSync(imagePaths.womenRights)
  ) {
    console.error("❌ Required images not found in public/images/blog/");
    process.exit(1);
  }

  // 1. Upload Featured Assembly Image
  console.log("📸 Uploading MP Legislative Assembly image...");
  const assetFeatured = await client.assets.upload("image", fs.createReadStream(imagePaths.featured), {
    filename: "mp_ucc_2026_assembly.png",
  });
  console.log(`✔ Uploaded Assembly image. Asset ID: ${assetFeatured._id}`);

  // 2. Upload Constitution & Article 44 Image
  console.log("📸 Uploading Article 44 Constitution image...");
  const assetConstitution = await client.assets.upload("image", fs.createReadStream(imagePaths.constitution), {
    filename: "mp_ucc_2026_article44.png",
  });
  console.log(`✔ Uploaded Constitution image. Asset ID: ${assetConstitution._id}`);

  // 3. Upload Women Rights Image
  console.log("📸 Uploading Women Rights & Gender Justice image...");
  const assetWomenRights = await client.assets.upload("image", fs.createReadStream(imagePaths.womenRights), {
    filename: "mp_ucc_2026_women_rights.png",
  });
  console.log(`✔ Uploaded Women Rights image. Asset ID: ${assetWomenRights._id}`);

  // 4. Construct the Article document
  const article = {
    _id: "ca-mp-ucc-bill-2026",
    _type: "currentAffairs",
    slug: { _type: "slug", current: "mp-ucc-bill-2026" },
    title: "समान नागरिक संहिता (UCC) 2026 : मध्य प्रदेश विधानसभा से विधेयक पारित | Exam Point of View",
    titleEn: "Uniform Civil Code (UCC) Bill 2026 Passed by Madhya Pradesh Assembly: Key Features & Analysis",
    excerpt: "मध्य प्रदेश विधानसभा ने समान नागरिक संहिता (Uniform Civil Code - UCC) विधेयक 2026 पारित कर दिया है। उत्तराखंड, गुजरात और असम के बाद मध्य प्रदेश UCC विधेयक पारित करने वाला देश का चौथा राज्य बन गया है। जानिए इसके प्रमुख प्रावधान, संवैधानिक आधार और परीक्षा उपयोगी बिंदु।",
    excerptEn: "The Madhya Pradesh Legislative Assembly has passed the Uniform Civil Code (UCC) Bill, 2026, making it the 4th Indian state after Uttarakhand, Gujarat, and Assam to pass UCC legislation. Read key highlights, Article 44 provisions, and exam insights.",
    ca_date: "2026-07-22",
    publishedAt: new Date().toISOString(),
    featured: true,
    readingTime: 8,
    keywords: [
      "MP UCC Bill 2026",
      "Uniform Civil Code Madhya Pradesh",
      "Article 44 DPSP",
      "समान नागरिक संहिता मध्य प्रदेश",
      "UCC MP Vidhan Sabha",
      "Ranjana Prakash Desai Committee MP",
      "Portuguese Civil Code 1867 Goa",
      "UCC States in India",
      "Live in Relationship Registration MP UCC",
      "Triple Talaq Prohibition MP",
      "UPSC Polity Article 44",
      "MPPSC Current Affairs 2026"
    ],
    category: { _type: "reference", _ref: "cat-polity" }, // Polity & Governance
    author: { _type: "reference", _ref: "author-aakar" },
    tags: [
      { _type: "reference", _ref: "tag-upsc" },
      { _type: "reference", _ref: "tag-mppsc" },
      { _type: "reference", _ref: "tag-prelims" },
      { _type: "reference", _ref: "tag-mains" },
      { _type: "reference", _ref: "tag-mp-ca" },
    ],
    syllabus: ["GS-2", "MPPSC Paper-2", "Prelims-GS"],
    featuredImage: {
      _type: "image",
      asset: { _type: "reference", _ref: assetFeatured._id },
      alt: "Madhya Pradesh Vidhan Sabha building in Bhopal with official banner announcing Uniform Civil Code UCC Bill 2026",
    },

    /* ─── SECTIONS ──────────────────────────────────────────────── */
    sections: [
      /* ── 1. Context & Why in News ────────────────────────────── */
      {
        _key: "sec-context",
        kind: "whyInNews",
        title: "चर्चा में क्यों? (Why in News?)",
        titleEn: "Context & Why in News?",
        body: [
          ...createBlocks([
            "**मध्य प्रदेश विधानसभा** ने **समान नागरिक संहिता (Uniform Civil Code - UCC) विधेयक, 2026** पारित कर दिया है। इसके साथ ही **उत्तराखंड, गुजरात और असम** के बाद **मध्य प्रदेश** UCC विधेयक पारित करने वाला देश का **चौथा राज्य** बन गया है। यह कानून **विवाह, तलाक, उत्तराधिकार, भरण-पोषण, संरक्षकता एवं संपत्ति** जैसे नागरिक मामलों में समान कानूनी व्यवस्था स्थापित करने की दिशा में महत्वपूर्ण कदम माना जा रहा है। इसका मुख्य उद्देश्य **महिलाओं एवं बच्चों के अधिकारों को सशक्त बनाना**, **सामाजिक समानता को बढ़ावा देना** तथा **संविधान के अनुच्छेद 44** की भावना को लागू करना है।",
            "### मुख्य हाइलाइट्स",
            "• **मध्य प्रदेश विधानसभा**: **UCC विधेयक 2026** पारित किया।",
            "• **चौथा राज्य**: **उत्तराखंड, गुजरात और असम** के बाद **UCC बिल पारित करने वाला चौथा राज्य** बना।",
            "• **तीन तलाक एवं निकाह हलाला**: तीन तलाक एवं निकाह हलाला जैसी प्रथाओं को अपराध की श्रेणी में रखा गया।",
            "• **विवाह एवं तलाक**: विवाह एवं तलाक का पंजीकरण अनिवार्य किया गया।",
            "• **महिलाओं एवं बच्चों के अधिकार**: महिलाओं, बच्चों एवं उत्तराधिकार संबंधी कानूनों में समानता पर विशेष जोर।"
          ]),
          createTable(
            "table-ucc-quick-facts-hi",
            "त्वरित तथ्य (Quick Facts)",
            ["विवरण", "जानकारी"],
            [
              ["**विधेयक**", "**समान नागरिक संहिता (UCC) विधेयक, 2026**"],
              ["**राज्य**", "**मध्य प्रदेश**"],
              ["**देश का स्थान**", "**UCC विधेयक पारित करने वाला चौथा राज्य**"],
              ["**मुख्य उद्देश्य**", "**समान नागरिक कानून लागू करना एवं महिलाओं व बच्चों के अधिकारों को सशक्त बनाना**"],
              ["**संवैधानिक आधार**", "**अनुच्छेद 44 (DPSP)**"]
            ]
          )
        ],
        bodyEn: [
          ...createBlocks([
            "The **Madhya Pradesh Legislative Assembly** has passed the **Uniform Civil Code (UCC) Bill, 2026**. With this, **Madhya Pradesh** has become the **fourth state** in India to pass a UCC bill, following **Uttarakhand, Gujarat, and Assam**. This legislation is considered a historic step toward establishing a uniform civil law framework governing **marriage, divorce, inheritance, maintenance, guardianship, and property rights**. Its core objectives include **empowering women and children**, **promoting social equality**, and implementing the mandate of **Article 44 of the Indian Constitution**.",
            "### Key Highlights",
            "• **Madhya Pradesh Assembly**: Passed the **UCC Bill 2026**.",
            "• **Fourth State**: Became the **4th state to pass the UCC Bill** after **Uttarakhand, Gujarat, and Assam**.",
            "• **Triple Talaq & Nikah Halala**: Criminalized practices like Triple Talaq and Nikah Halala.",
            "• **Mandatory Registration**: Compulsory registration of all marriages and divorces.",
            "• **Rights of Women & Children**: Special emphasis on gender equality and equal inheritance rights for all children."
          ]),
          createTable(
            "table-ucc-quick-facts-en",
            "Quick Facts at a Glance",
            ["Parameter", "Details"],
            [
              ["**Bill Name**", "**Uniform Civil Code (UCC) Bill, 2026**"],
              ["**State**", "**Madhya Pradesh**"],
              ["**National Status**", "**4th State to pass UCC Bill**"],
              ["**Primary Objective**", "**Uniform civil laws & empowerment of women and children**"],
              ["**Constitutional Basis**", "**Article 44 (DPSP)**"]
            ]
          )
        ],
      },

      /* ── 2. What is UCC & Constitutional Provisions ───────────────── */
      {
        _key: "sec-ucc-concept",
        kind: "background",
        title: "UCC (Uniform Civil Code) क्या है एवं इसका संवैधानिक आधार?",
        titleEn: "What is Uniform Civil Code (UCC) & Constitutional Basis?",
        body: [
          ...createBlocks([
            "### UCC (Uniform Civil Code) क्या है?",
            "• **परिभाषा**: **समान नागरिक संहिता (Uniform Civil Code)** ऐसा कानून है जिसके अंतर्गत **विवाह, तलाक, उत्तराधिकार, गोद लेना, भरण-पोषण एवं संपत्ति** से जुड़े नागरिक मामलों में सभी नागरिकों के लिए धर्म-आधारित अलग-अलग व्यक्तिगत कानूनों के स्थान पर एक समान कानून लागू किया जाता है।",
            "### संवैधानिक आधार",
            "### अनुच्छेद 44",
            "• **राज्य के नीति निदेशक तत्व (Directive Principles of State Policy - DPSP)** के अंतर्गत राज्य भारत के सभी नागरिकों के लिए समान नागरिक संहिता लागू करने का प्रयास करेगा।",
            "### संबंधित अनुच्छेद",
            "• **अनुच्छेद 14**: कानून के समक्ष समानता।",
            "• **अनुच्छेद 15**: धर्म, जाति, लिंग आदि के आधार पर भेदभाव निषिद्ध।",
            "• **अनुच्छेद 25**: धर्म की स्वतंत्रता।"
          ]),
          {
            _key: "b2-img-constitution",
            _type: "image",
            asset: { _type: "reference", _ref: assetConstitution._id },
            alt: "Constitution of India book open at Article 44 Directive Principles of State Policy with scales of justice",
          }
        ],
        bodyEn: [
          ...createBlocks([
            "### What is Uniform Civil Code (UCC)?",
            "• **Definition**: A **Uniform Civil Code (UCC)** refers to a single set of secular laws governing personal matters such as **marriage, divorce, inheritance, adoption, maintenance, and property** for all citizens of India, replacing religion-based personal laws.",
            "### Constitutional Basis",
            "### Article 44",
            "• Under the **Directive Principles of State Policy (DPSP)** in Part IV of the Constitution, the State shall endeavor to secure for citizens a Uniform Civil Code throughout the territory of India.",
            "### Related Articles",
            "• **Article 14**: Equality before law and equal protection of laws.",
            "• **Article 15**: Prohibition of discrimination on grounds of religion, race, caste, sex, or place of birth.",
            "• **Article 25**: Freedom of conscience and free profession, practice, and propagation of religion."
          ]),
          {
            _key: "b2-img-constitution-en",
            _type: "image",
            asset: { _type: "reference", _ref: assetConstitution._id },
            alt: "Constitution of India book open at Article 44 Directive Principles of State Policy with scales of justice",
          }
        ],
      },

      /* ── 3. Major Features of MP UCC Bill 2026 ────────────────────── */
      {
        _key: "sec-mp-provisions",
        kind: "keyHighlights",
        title: "मध्य प्रदेश UCC विधेयक 2026 की प्रमुख विशेषताएँ",
        titleEn: "Key Features of Madhya Pradesh UCC Bill 2026",
        body: [
          ...createBlocks([
            "### 1. एक विवाह (Monogamy)",
            "• **बहुविवाह**: बहुविवाह प्रथा को पूर्णतः समाप्त किया गया।",
            "• **वैध विवाह**: एक समय में केवल एक ही वैध विवाह की अनुमति होगी।",
            "### 2. तीन तलाक समाप्त",
            "• **तीन तलाक**: तीन तलाक (तलाक-ए-बिद्लत) को गैर-कानूनी और दंडनीय अपराध घोषित किया गया।",
            "### 3. निकाह हलाला पर प्रतिबंध",
            "• **निकाह हलाला**: निकाह हलाला जैसी सामाजिक-धार्मिक कुप्रथाएँ अब दंडनीय अपराध होंगी।",
            "### 4. विवाह पंजीकरण अनिवार्य",
            "• **Registration**: प्रत्येक विवाह का रजिस्ट्रेशन अनिवार्य होगा।",
            "• **व्यवस्था**: ग्राम पंचायत से लेकर नगर निगम स्तर तक पंजीकरण की व्यवस्था की गई है।",
            "### 5. तलाक का पंजीकरण",
            "• **तलाक**: कोर्ट के माध्यम से होने वाले प्रत्येक तलाक का विधिवत पंजीकरण अनिवार्य।",
            "### 6. महिलाओं को अधिक अधिकार",
            "• **संपत्ति**: पैतृक एवं अर्जित संपत्ति में महिलाओं को समान अधिकार।",
            "• **विवाह**: विवाह संबंधी कानूनी सुरक्षा।",
            "• **भरण-पोषण**: तलाक अथवा अलग रहने की स्थिति में भरण-पोषण (Maintenance) का कानूनी अधिकार।",
            "### 7. बच्चों को समान कानूनी दर्जा",
            "• **जैविक**: जैविक (Biological) बच्चों की तरह समान अधिकार।",
            "• **गोद लिए हुए**: गोद लिए हुए बच्चों को कानूनी समानता।",
            "• **ART**: सहाय्यित प्रजननीय प्रौद्योगिकी (ART) से जन्मे बच्चे।",
            "• **सरोगेसी से जन्मे**: सरोगेसी के माध्यम से जन्मे बच्चों को पूर्ण कानूनी दर्जा।",
            "### 8. उत्तराधिकार में समान अधिकार",
            "• **बेटा-बेटी**: बेटे और बेटी दोनों को उत्तराधिकार में समान हक।",
            "• **विवाहित-अविवाहित**: विवाहित अथवा अविवाहित पुत्री के बीच कोई भेदभाव नहीं।",
            "### 9. Custody का आधार",
            "• **Best Interest of Child**: बच्चों की कस्टडी का फैसला बच्चे के सर्वोत्तम हित (Best Interest of Child) के आधार पर होगा।",
            "### 10. Live-in Relationship",
            "• **Registration**: साथ रहने (लिव-इन) के एक माह के भीतर अनिवार्य रजिस्ट्रेशन।",
            "• **दंड**: बिना पंजीकरण निर्धारित अवधि से अधिक रहने पर जुर्माना एवं सजा का प्रावधान।",
            "• **गलत जानकारी**: लिव-इन पंजीकरण में गलत जानकारी देने पर भी दंड का प्रावधान।",
            "### 11. Live-in से जन्मे बच्चों को अधिकार",
            "• **वैध संतान**: लिव-इन रिलेशनशिप से जन्मे बच्चों को वैध संतान का कानूनी दर्जा प्राप्त होगा।",
            "• **उत्तराधिकार**: माता-पिता की संपत्ति में उत्तराधिकार का अधिकार होगा।",
            "### 12. हत्या करने वाले को उत्तराधिकार नहीं",
            "• **उत्तराधिकार**: संपत्ति पाने के इरादे से हत्या करने वाला व्यक्ति उत्तराधिकार के अधिकार से पूर्णतः वंचित होगा।",
            "### 13. अनुसूचित जनजातियों को छूट",
            "• **अनुसूचित जनजातियाँ (ST)**: अनुसूचित जनजातियों को UCC के दायरे से बाहर रखा गया है।",
            "• **संविधान द्वारा संरक्षित पारंपरिक समुदाय**: संविधान के तहत संरक्षित पारंपरिक जनजातीय समुदायों की रूढ़िवादी प्रथाएँ अक्षुण्ण रहेंगी।",
            "### महिलाओं के लिए विशेष प्रावधान",
            "• **पति द्वारा दूसरी महिला के साथ रहने पर**: पत्नी को कानूनी संरक्षण प्राप्त होगा।",
            "• **भरण-पोषण**: भरण-पोषण (Maintenance) का मजबूत अधिकार।",
            "• **संपत्ति**: संपत्ति में पूर्ण एवं समान अधिकार।",
            "• **विवाह एवं तलाक**: विवाह एवं तलाक की प्रक्रिया में समान कानूनी सुरक्षा।",
            "### दंड का प्रावधान",
            "• **Live-in Registration**: निर्धारित 1 माह के भीतर लिव-इन का रजिस्ट्रेशन नहीं कराना।",
            "• **गलत जानकारी**: रजिस्ट्रेशन में असत्य या भ्रामक जानकारी देना।",
            "• **कानून का उल्लंघन**: एक विवाह नियम या पंजीकरण नियमों का उल्लंघन करना।",
            "• **दंड स्वरूप**: जुर्माना, कारावास अथवा दोनों शामिल हो सकते हैं।"
          ]),
          {
            _key: "b3-img-women-rights",
            _type: "image",
            asset: { _type: "reference", _ref: assetWomenRights._id },
            alt: "Empowered Indian women lawyers and citizens outside Madhya Pradesh High Court celebrating gender equality and legal rights",
          }
        ],
        bodyEn: [
          ...createBlocks([
            "### 1. Monogamy Mandate",
            "• **Polygamy**: Polygamy is completely abolished.",
            "• **Valid Marriage**: Only one living spouse permitted at any time.",
            "### 2. Prohibition of Triple Talaq",
            "• **Triple Talaq**: Instant Triple Talaq (Talaq-e-Biddat) declared illegal and criminalized.",
            "### 3. Ban on Nikah Halala",
            "• **Nikah Halala**: Practicing Nikah Halala and forced marriages made punishable offenses.",
            "### 4. Mandatory Marriage Registration",
            "• **Registration**: Compulsory registration of all marriages within prescribed timelines.",
            "• **Infrastructure**: Registration centers designated from Gram Panchayats to Municipal Corporations.",
            "### 5. Mandatory Divorce Registration",
            "• **Divorce**: Every divorce granted by court decree must be officially registered.",
            "### 6. Enhanced Rights for Women",
            "• **Property**: Equal rights in ancestral and acquired family property.",
            "• **Maintenance**: Mandatory maintenance rights during separation or divorce.",
            "### 7. Equal Status for All Children",
            "• **Biological**: Equal rights for biological children.",
            "• **Adopted**: Full legal equality for adopted children.",
            "• **ART & Surrogacy**: Children born through Assisted Reproductive Technology (ART) and Surrogacy given complete legal status.",
            "### 8. Equal Inheritance Rights",
            "• **Son & Daughter**: Sons and daughters receive identical shares in inheritance.",
            "• **Marital Status**: No distinction between married and unmarried daughters.",
            "### 9. Child Custody Principle",
            "• **Best Interest of Child**: Child custody determined solely on the 'Best Interest of the Child'.",
            "### 10. Live-in Relationship Regulations",
            "• **Registration**: Mandatory registration of live-in relationships within 1 month of cohabitation.",
            "• **Penalties**: Failure to register within 30 days attracts fines and imprisonment.",
            "• **False Details**: Providing false information during registration is a punishable offense.",
            "### 11. Rights of Children Born in Live-in Relationships",
            "• **Legitimacy**: Children born out of registered live-in relationships hold full legal legitimacy.",
            "• **Inheritance**: Entitled to inherit property from both parents.",
            "### 12. Disqualification for Homicide",
            "• **Inheritance Bar**: Anyone committing or abetting murder to claim inheritance is permanently barred.",
            "### 13. Exemption for Scheduled Tribes",
            "• **Scheduled Tribes (ST)**: ST communities protected under Constitution excluded from UCC scope.",
            "• **Customary Protections**: Preserved customary laws of indigenous tribal groups.",
            "### Special Rights for Women",
            "• **Protection against Desertion**: Legal protection if a spouse lives with another partner.",
            "• **Maintenance Security**: Guaranteed maintenance and housing rights.",
            "• **Equal Property Rights**: Complete equality in property and assets.",
            "### Penal Provisions",
            "• **Non-registration of Live-in**: Penalty for non-registration within 1 month.",
            "• **False Information**: Criminal liability for submitting misleading documents.",
            "• **Legal Violations**: Penalties including fines, imprisonment, or both for law breaches."
          ]),
          {
            _key: "b3-img-women-rights-en",
            _type: "image",
            asset: { _type: "reference", _ref: assetWomenRights._id },
            alt: "Empowered Indian women lawyers and citizens outside Madhya Pradesh High Court celebrating gender equality and legal rights",
          }
        ],
      },

      /* ── 4. Analysis: Status, Goa, Timeline & Committee ─────────────── */
      {
        _key: "sec-status-timeline",
        kind: "analysis",
        title: "अब तक UCC की स्थिति, ऐतिहासिक विकास एवं समिति",
        titleEn: "UCC State-wise Status, Historical Evolution & MP Committee",
        body: [
          ...createBlocks([
            "### अब तक UCC की स्थिति (State-wise Status)",
            "भारत के विभिन्न राज्यों में समान नागरिक संहिता (UCC) की स्थिति का विवरण इस प्रकार है:"
          ]),
          createTable(
            "table-ucc-states-hi",
            "अब तक UCC की राज्यवार स्थिति (State-wise UCC Status)",
            ["राज्य (State)", "विवरण एवं वर्तमान स्थिति"],
            [
              ["**उत्तराखंड**", "**27 जनवरी 2025 से पूर्ण लागू (स्वतंत्र भारत में UCC लागू करने वाला पहला राज्य)**"],
              ["**गुजरात**", "**मार्च 2026 में विधानसभा द्वारा UCC विधेयक पारित**"],
              ["**असम**", "**मई 2026 में विधानसभा द्वारा UCC विधेयक पारित**"],
              ["**मध्य प्रदेश**", "**विधानसभा से UCC विधेयक 2026 पारित (देश का चौथा राज्य)**"],
              ["**गोवा**", "**पुर्तगाली सिविल कोड, 1867 के तहत स्वतंत्रता से पूर्व से समान नागरिक कानून लागू**"]
            ]
          ),
          ...createBlocks([
            "### गोवा क्यों महत्वपूर्ण है?",
            "• **Portuguese Civil Code, 1867**: गोवा में पुर्तगाली शासन के समय से ही 1867 का पुर्तगाली सिविल कोड लागू है।",
            "• **स्वतंत्रता के बाद**: वर्ष 1961 में गोवा के भारत में विलय के बाद भी इस व्यवस्था को जारी रखा गया।",
            "• **महत्व**: इसी कारण गोवा को लंबे समय से समान नागरिक कानून वाला राज्य माना जाता है।",
            "### UCC का ऐतिहासिक विकास (Historical Timeline)",
            "• **1835**: ब्रिटिश सरकार द्वारा आपराधिक एवं संविदा कानूनों में एकरूपता पर रिपोर्ट प्रस्तुत की गई, किंतु व्यक्तिगत कानूनों को बाहर रखा गया।",
            "• **1840**: आपराधिक एवं अनुबंध संबंधी कानूनों का एकीकरण।",
            "• **1941**: **बी. एन. राव समिति (B.N. Rau Committee)** का गठन हिंदू कानूनों को संहित करने के लिए किया गया।",
            "• **1948**: संविधान सभा में **हिंदू कोड बिल** पर चर्चा शुरू।",
            "• **1950**: संविधान के **अनुच्छेद 44 (DPSP)** में UCC का प्रावधान शामिल।",
            "### मध्य प्रदेश UCC समिति (MP UCC Committee)",
            "• **गठन की तिथि**: **27 अप्रैल 2026**",
            "• **अध्यक्ष**: **न्यायमूर्ति (सेवानिवृत्त) रंजना प्रकाश देसाई (Justice Retd. Ranjana Prakash Desai)**",
            "• **समिति का आकार**: **7 सदस्यीय विशेषज्ञ समिति**"
          ])
        ],
        bodyEn: [
          ...createBlocks([
            "### State-wise Status of UCC in India",
            "The implementation and legislative status of UCC across Indian states is detailed below:"
          ]),
          createTable(
            "table-ucc-states-en",
            "State-wise UCC Status in India",
            ["State", "Implementation & Legislative Details"],
            [
              ["**Uttarakhand**", "**Fully implemented on January 27, 2025 (First state in post-independence India)**"],
              ["**Gujarat**", "**UCC Bill passed by Legislative Assembly in March 2026**"],
              ["**Assam**", "**UCC Bill passed by Legislative Assembly in May 2026**"],
              ["**Madhya Pradesh**", "**UCC Bill 2026 passed by Legislative Assembly (4th State in India)**"],
              ["**Goa**", "**Governed by Portuguese Civil Code, 1867 since pre-independence**"]
            ]
          ),
          ...createBlocks([
            "### Why is Goa Significant?",
            "• **Portuguese Civil Code, 1867**: Goa has operated under the Portuguese Civil Code since 1867.",
            "• **Post-Independence**: After Goa's liberation in 1961, the existing uniform civil law was retained.",
            "• **Significance**: Goa remains the only state with a long-standing historical uniform civil code.",
            "### Historical Evolution of UCC",
            "• **1835**: Lex Loci Report under British rule advocated uniform laws for crimes and evidence, excluding personal laws.",
            "• **1840**: Codification of crime and contract laws across British India.",
            "• **1941**: **B. N. Rau Committee** constituted to codify Hindu law.",
            "• **1948**: Draft **Hindu Code Bill** introduced in the Constituent Assembly.",
            "• **1950**: Enshrined under **Article 44 (DPSP)** of the Indian Constitution.",
            "### Madhya Pradesh UCC Expert Committee",
            "• **Date of Formation**: **April 27, 2026**",
            "• **Chairperson**: **Justice (Retd.) Ranjana Prakash Desai**",
            "• **Committee Size**: **7-member expert panel**"
          ])
        ],
      },

      /* ── 5. Arguments For & Controversies ─────────────────────────── */
      {
        _key: "sec-arguments-debates",
        kind: "arguments",
        title: "UCC के पक्ष में तर्क एवं प्रमुख विवाद",
        titleEn: "Arguments in Favor of UCC & Key Controversies",
        body: [
          ...createBlocks([
            "### UCC के पक्ष में तर्क (Arguments in Favor)",
            "• **सभी नागरिकों के लिए समान कानून**: एक देश में धर्म के आधार पर कानून विभाजन समाप्त कर कानून की सर्वोपरिता स्थापित करना।",
            "• **महिलाओं के अधिकार मजबूत**: तीन तलाक, निकाह हलाला जैसी प्रथाओं का अंत और संपत्ति एवं उत्तराधिकार में लैंगिक समानता।",
            "• **लैंगिक समानता**: पुरुष और महिला दोनों को समान कानूनी अधिकार एवं सुरक्षा।",
            "• **सामाजिक न्याय**: समाज के वंचित वर्गों एवं बच्चों को कानूनी सुरक्षा प्रदान करना।",
            "• **कानूनी सरलता**: विभिन्न धर्मों के जटिल पर्सनल लॉ के स्थान पर एक सरल और सुलभ कानून।",
            "• **राष्ट्रीय एकता को बढ़ावा**: राष्ट्रीय एकीकरण और धर्मनिरपेक्षता की भावना को सुदृढ़ करना।",
            "### प्रमुख विवाद एवं चुनौतियाँ (Controversies & Challenges)",
            "• **धार्मिक स्वतंत्रता बनाम समान कानून**: अनुच्छेद 25 (धार्मिक स्वतंत्रता) और अनुच्छेद 44 (UCC) के बीच सामंजस्य की चुनौती।",
            "• **व्यक्तिगत कानूनों का प्रश्न**: विभिन्न धार्मिक समुदायों के पर्सनल लॉ में हस्तक्षेपात्मक चिंताएँ।",
            "• **सांस्कृतिक विविधता**: भारत की बहुसांस्कृतिक और विविध सामाजिक संरचना।",
            "• **संघीय ढाँचे से जुड़े मुद्दे**: समवर्ती सूची (Concurrent List) का विषय होने के कारण केंद्र और राज्यों के बीच कानूनों में विविधता।"
          ])
        ],
        bodyEn: [
          ...createBlocks([
            "### Arguments in Favor of UCC",
            "• **Uniformity for All Citizens**: Replaces religious personal laws with a single secular law for all citizens.",
            "• **Women Empowerment**: Ends discriminatory practices like Triple Talaq and Nikah Halala; ensures property inheritance equality.",
            "• **Gender Equality**: Guarantees identical legal status and security for men and women.",
            "• **Social Justice**: Protects vulnerable sections, children, and spouses during legal separations.",
            "• **Legal Simplification**: Simplifies complex personal law jurisprudence into a streamlined framework.",
            "• **National Integration**: Strengthens secularism and national solidarity.",
            "### Major Controversies & Challenges",
            "• **Religious Freedom vs. Uniform Law**: Harmonizing Article 25 (Freedom of Religion) with Article 44 (UCC).",
            "• **Personal Law Concerns**: Apprehensions regarding state interference in minority personal laws.",
            "• **Cultural Diversity**: Preserving India's diverse customs and traditions.",
            "• **Federal Dynamics**: Subject falls under the Concurrent List, leading to state-wise legislative variations."
          ])
        ],
      },

      /* ── 6. Exam Point of View & Quick Revision ───────────────────── */
      {
        _key: "sec-exam-pov",
        kind: "examPerspective",
        title: "Exam Point of View & Quick Revision",
        titleEn: "Exam Point of View & Quick Revision",
        body: [
          ...createBlocks([
            "### अत्यंत महत्वपूर्ण तथ्य (Exam Essentials)",
            "• **UCC** → **Uniform Civil Code (समान नागरिक संहिता)**",
            "• **अनुच्छेद 44** → समान नागरिक संहिता (संविधान का भाग IV - DPSP)",
            "• **भाग IV** → राज्य के नीति निदेशक तत्व (Directive Principles of State Policy)",
            "• **UCC लागू करने वाला पहला राज्य** → **उत्तराखंड** (27 जनवरी 2025)",
            "• **UCC विधेयक पारित करने वाला चौथा राज्य** → **मध्य प्रदेश** (2026)",
            "• **गोवा** → **Portuguese Civil Code, 1867** (ऐतिहासिक रूप से समान कानून वाला राज्य)",
            "• **ST समुदाय** → **UCC के दायरे से बाहर**",
            "• **विवाह एवं तलाक** → पंजीकरण अनिवार्य",
            "• **Live-in Registration** → सहवास के 1 माह (30 दिन) के भीतर अनिवार्य",
            "### Full Forms",
            "• **UCC**: **Uniform Civil Code (समान नागरिक संहिता)**",
            "• **DPSP**: **Directive Principles of State Policy (राज्य के नीति निदेशक तत्व)**",
            "• **ART**: **Assisted Reproductive Technology (सहाय्यित प्रजननीय प्रौद्योगिकी)**",
            "### Prelims Quick Revision",
            "• **अनुच्छेद 44** → **UCC का संवैधानिक प्रावधान**",
            "• **भाग IV** → **DPSP के तहत शामिल**",
            "• **पहला लागू राज्य** → **उत्तराखंड**",
            "• **चौथा UCC विधेयक पारित राज्य** → **मध्य प्रदेश**",
            "• **गोवा** → **Portuguese Civil Code, 1867**",
            "• **तीन तलाक** → गैर-कानूनी और दंडनीय अपराध",
            "• **निकाह हलाला** → प्रतिबंधित",
            "• **विवाह पंजीकरण** → ग्राम पंचायत से नगर निगम स्तर तक अनिवार्य",
            "• **ST समुदाय** → **UCC से पूर्णतः बाहर**",
            "### Mains Value Addition",
            "• **उद्देश्य**: समान नागरिक संहिता का उद्देश्य सभी नागरिकों के लिए समान नागरिक कानून लागू करना, महिलाओं एवं बच्चों के अधिकारों की रक्षा करना, सामाजिक समानता स्थापित करना तथा संविधान के **अनुच्छेद 44** की भावना को व्यवहार में लागू करना है।"
          ])
        ],
        bodyEn: [
          ...createBlocks([
            "### Exam Essentials (Key Takeaways)",
            "• **UCC** → **Uniform Civil Code**",
            "• **Article 44** → Uniform Civil Code under Part IV (DPSP) of the Indian Constitution.",
            "• **Part IV** → Directive Principles of State Policy (DPSP).",
            "• **First State to Implement UCC** → **Uttarakhand** (January 27, 2025).",
            "• **4th State to Pass UCC Bill** → **Madhya Pradesh** (2026).",
            "• **Goa** → **Portuguese Civil Code, 1867** (Historically uniform personal law state).",
            "• **ST Exemption** → Scheduled Tribes excluded from UCC scope.",
            "• **Registration** → Mandatory for all marriages, divorces, and live-in relationships (within 30 days).",
            "### Full Forms",
            "• **UCC**: **Uniform Civil Code**",
            "• **DPSP**: **Directive Principles of State Policy**",
            "• **ART**: **Assisted Reproductive Technology**",
            "### Prelims Quick Revision",
            "• **Article 44** → **UCC Provision**",
            "• **Part IV** → **DPSP Framework**",
            "• **First State** → **Uttarakhand**",
            "• **4th State** → **Madhya Pradesh**",
            "• **Goa** → **Portuguese Civil Code 1867**",
            "• **Triple Talaq** → Criminalized",
            "• **Nikah Halala** → Banned",
            "• **ST Exemption** → Full exclusion for Scheduled Tribes",
            "### Mains Value Addition",
            "• **Core Philosophy**: The enactment of UCC fulfills the Directive Principle of Article 44 by securing gender justice, legal equity, and protection for women and children across all personal law matters."
          ])
        ],
      }
    ],

    /* ─── MCQS (EXACTLY 8 HIGH QUALITY MCQs) ───────────────────── */
    mcqs: [
      {
        question: "समान नागरिक संहिता (UCC) विधेयक 2026 पारित करने वाला देश का चौथा राज्य कौन-सा बना है?",
        questionEn: "Which state has become the 4th state in India to pass the Uniform Civil Code (UCC) Bill, 2026?",
        options: ["गुजरात", "असम", "मध्य प्रदेश", "महाराष्ट्र"],
        optionsEn: ["Gujarat", "Assam", "Madhya Pradesh", "Maharashtra"],
        correctIndex: 2,
        explanation: "मध्य प्रदेश विधानसभा ने UCC विधेयक 2026 पारित किया, जिससे उत्तराखंड, गुजरात और असम के बाद मध्य प्रदेश UCC विधेयक पारित करने वाला देश का चौथा राज्य बन गया।",
        explanationEn: "The Madhya Pradesh Legislative Assembly passed the UCC Bill 2026, making MP the 4th state after Uttarakhand, Gujarat, and Assam to pass a UCC bill."
      },
      {
        question: "भारतीय संविधान के किस अनुच्छेद में राज्य के नीति निदेशक तत्वों (DPSP) के तहत समान नागरिक संहिता (UCC) का प्रावधान है?",
        questionEn: "Under which Article of the Indian Constitution is the provision for Uniform Civil Code (UCC) included in DPSP?",
        options: ["अनुच्छेद 40", "अनुच्छेद 44", "अनुच्छेद 50", "अनुच्छेद 14"],
        optionsEn: ["Article 40", "Article 44", "Article 50", "Article 14"],
        correctIndex: 1,
        explanation: "भारतीय संविधान के भाग IV में अनुच्छेद 44 राज्य के नीति निदेशक तत्वों (DPSP) के अंतर्गत भारत के सभी नागरिकों के लिए समान नागरिक संहिता लागू करने का निर्देश देता है।",
        explanationEn: "Article 44 in Part IV of the Constitution directs the State to endeavor to secure for citizens a Uniform Civil Code throughout India."
      },
      {
        question: "स्वतंत्र भारत का पहला राज्य कौन सा है जहाँ समान नागरिक संहिता (UCC) पूर्ण रूप से लागू किया गया?",
        questionEn: "Which is the first state in post-independence India where the Uniform Civil Code (UCC) was fully implemented?",
        options: ["मध्य प्रदेश", "गुजरात", "उत्तराखंड", "असम"],
        optionsEn: ["Madhya Pradesh", "Gujarat", "Uttarakhand", "Assam"],
        correctIndex: 2,
        explanation: "उत्तराखंड 27 जनवरी 2025 को स्वतंत्र भारत में समान नागरिक संहिता (UCC) पूर्ण रूप से लागू करने वाला पहला राज्य बना था।",
        explanationEn: "Uttarakhand became the first state in post-independence India to fully implement the Uniform Civil Code on January 27, 2025."
      },
      {
        question: "मध्य प्रदेश समान नागरिक संहिता (UCC) समिति की अध्यक्ष कौन थीं?",
        questionEn: "Who chaired the Madhya Pradesh Uniform Civil Code (UCC) Expert Committee?",
        options: [
          "न्यायमूर्ति (सेवानिवृत्त) रंजना प्रकाश देसाई",
          "न्यायमूर्ति इंदु मल्होत्रा",
          "न्यायमूर्ति डी.वाई. चंद्रचूड़",
          "न्यायमूर्ति यू.यू. ललित"
        ],
        optionsEn: [
          "Justice (Retd.) Ranjana Prakash Desai",
          "Justice Indu Malhotra",
          "Justice D.Y. Chandrachud",
          "Justice U.U. Lalit"
        ],
        correctIndex: 0,
        explanation: "मध्य प्रदेश सरकार द्वारा 27 अप्रैल 2026 को गठित 7-सदस्यीय UCC समिति की अध्यक्ष न्यायमूर्ति (सेवानिवृत्त) रंजना प्रकाश देसाई थीं।",
        explanationEn: "Justice (Retd.) Ranjana Prakash Desai headed the 7-member UCC Expert Committee constituted by MP Government on April 27, 2026."
      },
      {
        question: "मध्य प्रदेश UCC विधेयक 2026 के अंतर्गत लिव-इन रिलेशनशिप (Live-in Relationship) के पंजीकरण के संदर्भ में क्या समय-सीमा निर्धारित की गई है?",
        questionEn: "Under the MP UCC Bill 2026, what is the mandatory timeframe for registering a live-in relationship?",
        options: [
          "साथ रहने के 15 दिनों के भीतर",
          "साथ रहने के 1 माह के भीतर",
          "साथ रहने के 6 माह के भीतर",
          "कोई पंजीकरण आवश्यक नहीं"
        ],
        optionsEn: [
          "Within 15 days of cohabitation",
          "Within 1 month of cohabitation",
          "Within 6 months of cohabitation",
          "No registration required"
        ],
        correctIndex: 1,
        explanation: "मध्य प्रदेश UCC विधेयक 2026 के अनुसार, लिव-इन रिलेशनशिप में साथ रहने के 1 माह (30 दिन) के भीतर पंजीकरण कराना अनिवार्य है।",
        explanationEn: "According to the MP UCC Bill 2026, partners in a live-in relationship must register within 1 month (30 days) of cohabitation."
      },
      {
        question: "मध्य प्रदेश UCC विधेयक 2026 में निम्नलिखित में से किस समुदाय को UCC के दायरे से बाहर रखा गया है?",
        questionEn: "Which of the following communities is explicitly exempted from the scope of the MP UCC Bill 2026?",
        options: [
          "धार्मिक अल्पसंख्यक समुदाय",
          "अनुसूचित जनजातियाँ (ST)",
          "अन्य पिछड़ा वर्ग (OBC)",
          "केवल प्रवासी नागरिक"
        ],
        optionsEn: [
          "Religious Minority Communities",
          "Scheduled Tribes (ST)",
          "Other Backward Classes (OBC)",
          "NRI Citizens Only"
        ],
        correctIndex: 1,
        explanation: "मध्य प्रदेश UCC विधेयक 2026 में संविधान द्वारा संरक्षित अनुसूचित जनजातियों (ST) एवं पारंपरिक समुदायों को इस कानून के दायरे से बाहर रखा गया है।",
        explanationEn: "The MP UCC Bill 2026 explicitly excludes Scheduled Tribes (ST) protected under the Constitution from its purview."
      },
      {
        question: "स्वतंत्रता से पूर्व एवं पुर्तगाली सिविल कोड, 1867 (Portuguese Civil Code) के तहत किस भारतीय राज्य में ऐतिहासिक रूप से समान नागरिक कानून लागू रहा है?",
        questionEn: "Which Indian state has historically operated under uniform civil laws under the Portuguese Civil Code, 1867?",
        options: ["पांडिचेरी", "गोवा", "दमन और दीव", "केरल"],
        optionsEn: ["Puducherry", "Goa", "Daman & Diu", "Kerala"],
        correctIndex: 1,
        explanation: "गोवा में पुर्तगाली शासन के समय से Portuguese Civil Code, 1867 लागू है, जिसे 1961 में स्वतंत्रता एवं विलय के बाद भी निरंतर जारी रखा गया है।",
        explanationEn: "Goa has been governed by the Portuguese Civil Code of 1867 since pre-independence, which was retained after its liberation in 1961."
      },
      {
        question: "1941 में औपनिवेशिक भारत में हिंदू कानूनों के सहिंताकरण हेतु किस समिति का गठन किया गया था जिसने बाद में हिंदू कोड बिल का आधार तैयार किया?",
        questionEn: "Which committee was formed in colonial India in 1941 to codify Hindu law, laying the groundwork for the Hindu Code Bill?",
        options: ["बी. एन. राव समिति", "सरदार पटेल समिति", "के. एम. मुंशी समिति", "आंबेडकर समिति"],
        optionsEn: ["B. N. Rau Committee", "Sardar Patel Committee", "K. M. Munshi Committee", "Ambedkar Committee"],
        correctIndex: 0,
        explanation: "वर्ष 1941 में बी. एन. राव समिति (B. N. Rau Committee) का गठन किया गया था, जिसने हिंदू कानूनों को संहित करने की सिफारिश की थी।",
        explanationEn: "The B. N. Rau Committee was constituted in 1941 to reform and codify Hindu personal laws in India."
      }
    ],

    /* ─── FAQs ──────────────────────────────────────────────── */
    faqs: [
      {
        question: "समान नागरिक संहिता (UCC) विधेयक 2026 पारित करने वाला देश का चौथा राज्य कौन-सा बना है?",
        questionEn: "Which is the 4th state in India to pass the UCC Bill 2026?",
        answer: "मध्य प्रदेश विधानसभा ने UCC विधेयक 2026 पारित किया, जिससे उत्तराखंड, गुजरात और असम के बाद मध्य प्रदेश UCC विधेयक पारित करने वाला देश का चौथा राज्य बन गया।",
        answerEn: "Madhya Pradesh passed the UCC Bill 2026, becoming the 4th Indian state after Uttarakhand, Gujarat, and Assam."
      },
      {
        question: "क्या मध्य प्रदेश UCC विधेयक 2026 में अनुसूचित जनजातियों (ST) को शामिल किया गया है?",
        questionEn: "Are Scheduled Tribes (ST) covered under the MP UCC Bill 2026?",
        answer: "नहीं, मध्य प्रदेश UCC विधेयक 2026 में संविधान द्वारा संरक्षित अनुसूचित जनजातियों (ST) और उनकी रूढ़िवादी परंपराओं को इस कानून के दायरे से पूर्णतः बाहर रखा गया है।",
        answerEn: "No, Scheduled Tribes (ST) and their traditional customary practices protected under the Constitution are explicitly excluded from the MP UCC Bill 2026."
      },
      {
        question: "मध्य प्रदेश UCC के तहत लिव-इन रिलेशनशिप के लिए क्या नियम बनाए गए हैं?",
        questionEn: "What are the rules for live-in relationships under MP UCC?",
        answer: "लिव-इन रिलेशनशिप में साथ रहने के 1 माह (30 दिन) के भीतर पंजीकरण कराना अनिवार्य है। बिना पंजीकरण रहने पर सजा एवं जुर्माने का प्रावधान है तथा लिव-इन से जन्मे बच्चों को पूर्ण वैध संतान का दर्जा एवं संपत्ति का अधिकार मिलेगा।",
        answerEn: "Mandatory registration is required within 30 days of cohabitation. Children born out of registered live-in relationships are granted full legal legitimacy and inheritance rights."
      }
    ],

    /* ─── Sources ────────────────────────────────────────────── */
    sources: [
      { label: "Madhya Pradesh Vidhan Sabha Official Portal", url: "https://mpvidhansabha.nic.in" },
      { label: "Ministry of Law and Justice, Govt of India", url: "https://lawmin.gov.in" },
      { label: "Constitution of India (Article 44 DPSP)", url: "https://legislative.gov.in" }
    ]
  };

  try {
    await client.createOrReplace(article);
    console.log("✨ Successfully uploaded MP UCC Bill 2026 Current Affairs Article to Sanity!");
  } catch (err) {
    console.error("❌ Failed to create/replace document in Sanity:", err);
  }
}

main().catch((err) => {
  console.error("❌ Error running script:", err);
  process.exit(1);
});
