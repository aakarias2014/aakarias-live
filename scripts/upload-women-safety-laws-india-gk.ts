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
  console.log("🚀 Starting upload process for Women Safety Laws Static GK Article...");

  // Image file paths in public/images/blog/
  const imagePaths = {
    featured: path.resolve(process.cwd(), "public/images/blog/women-safety-1.png"),
    posh: path.resolve(process.cwd(), "public/images/blog/women-safety-2.png"),
    pocso: path.resolve(process.cwd(), "public/images/blog/women-safety-3.png"),
    domestic: path.resolve(process.cwd(), "public/images/blog/women-safety-4.png"),
    talaq: path.resolve(process.cwd(), "public/images/blog/women-safety-5.png"),
  };

  // Check if files exist
  if (
    !fs.existsSync(imagePaths.featured) ||
    !fs.existsSync(imagePaths.posh) ||
    !fs.existsSync(imagePaths.pocso) ||
    !fs.existsSync(imagePaths.domestic) ||
    !fs.existsSync(imagePaths.talaq)
  ) {
    console.error("❌ Required images not found in public/images/blog/");
    process.exit(1);
  }

  // 1. Upload Featured Image
  console.log("📸 Uploading featured image...");
  const assetFeatured = await client.assets.upload("image", fs.createReadStream(imagePaths.featured), {
    filename: "women_safety_laws_featured.png",
  });
  console.log(`✔ Uploaded featured image. Asset ID: ${assetFeatured._id}`);

  // 2. Upload POSH Image
  console.log("📸 Uploading POSH image...");
  const assetPosh = await client.assets.upload("image", fs.createReadStream(imagePaths.posh), {
    filename: "posh_act_workplace_safety.png",
  });
  console.log(`✔ Uploaded POSH image. Asset ID: ${assetPosh._id}`);

  // 3. Upload POCSO Image
  console.log("📸 Uploading POCSO image...");
  const assetPocso = await client.assets.upload("image", fs.createReadStream(imagePaths.pocso), {
    filename: "pocso_act_child_protection.png",
  });
  console.log(`✔ Uploaded POCSO image. Asset ID: ${assetPocso._id}`);

  // 4. Upload Domestic Violence Image
  console.log("📸 Uploading Domestic Violence image...");
  const assetDomestic = await client.assets.upload("image", fs.createReadStream(imagePaths.domestic), {
    filename: "domestic_violence_protection.png",
  });
  console.log(`✔ Uploaded Domestic Violence image. Asset ID: ${assetDomestic._id}`);

  // 5. Upload Triple Talaq Image
  console.log("📸 Uploading Triple Talaq image...");
  const assetTalaq = await client.assets.upload("image", fs.createReadStream(imagePaths.talaq), {
    filename: "triple_talaq_muslim_women_rights.png",
  });
  console.log(`✔ Uploaded Triple Talaq image. Asset ID: ${assetTalaq._id}`);

  // 5. Construct the Article document
  const article = {
    _id: "gk-women-safety-laws-india",
    _type: "staticGk",
    slug: { _type: "slug", current: "women-safety-laws-in-india" },
    title: "महिलाओं की सुरक्षा से संबंधित प्रमुख अधिनियम (Women Safety Laws in India)",
    titleEn: "Major Women Safety Laws in India: Legislation, Provisions & Exam Facts",
    excerpt: "महिलाओं की सुरक्षा और सम्मान सुनिश्चित करने के लिए भारत में लागू प्रमुख अधिनियमों (दहेज, घरेलू हिंसा, कार्यस्थल पर उत्पीड़न, पॉक्सो, मुस्लिम महिला अधिकार संरक्षण) की सूची, प्रावधान, महत्वपूर्ण तिथियाँ एवं परीक्षा तथ्य।",
    excerptEn: "A comprehensive overview of key women safety legislation in India, including the Dowry Prohibition Act, Domestic Violence Act, POSH Act, POCSO, and BNS provisions, with timelines and exam facts.",
    ca_date: "2026-07-18",
    publishedAt: new Date().toISOString(),
    featured: true,
    readingTime: 8,
    keywords: [
      "Women Safety Laws India",
      "Dowry Prohibition Act 1961",
      "Domestic Violence Act 2005",
      "POSH Act 2013",
      "POCSO Amendment 2019",
      "Triple Talaq Law 2019",
      "BNS 2023 Women Safety",
      "Vishaka Guidelines 1997",
      "महिला सुरक्षा कानून",
      "घरेलू हिंसा अधिनियम 2005",
      "UPSC Polity",
      "MPPSC Polity"
    ],
    category: { _type: "reference", _ref: "cat-polity" }, // Polity & Constitution
    author: { _type: "reference", _ref: "author-aakar" },
    tags: [
      { _type: "reference", _ref: "tag-upsc" },
      { _type: "reference", _ref: "tag-mppsc" },
      { _type: "reference", _ref: "tag-prelims" },
      { _type: "reference", _ref: "tag-mains" },
    ],
    syllabus: ["GS-2", "Prelims-GS"],
    featuredImage: {
      _type: "image",
      asset: { _type: "reference", _ref: assetFeatured._id },
      alt: "Symbolic scale of justice with female silhouette in front of the Supreme Court of India",
    },

    /* ─── SECTIONS ──────────────────────────────────────────────── */
    sections: [
      /* ── 1. Why in News / Context ────────────────────────────── */
      {
        _key: "sec-context",
        kind: "whyInNews",
        title: "चर्चा में क्यों? (Context)",
        titleEn: "Why is it Important in Exams?",
        body: [
          ...createBlocks([
            "महिलाओं की सुरक्षा और सम्मान सुनिश्चित करने के लिए भारत में समय-समय पर कई महत्वपूर्ण कानून बनाए गए हैं। ये अधिनियम महिलाओं को **घरेलू हिंसा**, **दहेज**, **कार्यस्थल पर उत्पीड़न**, **अश्लील चित्रण**, **यौन अपराध** और **विवाह संबंधी अन्याय** से कानूनी संरक्षण प्रदान करते हैं।",
            "प्रतियोगी परीक्षाओं (UPSC, MPPSC, SSC) के लिए इन कानूनों का वर्ष, उद्देश्य, प्रमुख प्रावधान और उनसे जुड़े ऐतिहासिक न्यायालयी निर्णय (जैसे विशाखा वाद 1997) अत्यंत महत्वपूर्ण हैं।"
          ]),
          createTable(
            "table-women-safety-hi",
            "प्रमुख अधिनियम एक नजर में",
            ["विवरण / अधिनियम", "जानकारी (वर्ष/विवरण)"],
            [
              ["**दहेज प्रतिषेध अधिनियम**", "**1961** – दहेज लेने-देने पर रोक"],
              ["**महिलाओं का अशिष्ट चित्रण (निषेध) अधिनियम**", "**1986** – महिलाओं के अश्लील चित्रण पर रोक"],
              ["**घरेलू हिंसा से महिलाओं का संरक्षण अधिनियम**", "**2005** – घरेलू हिंसा से कानूनी सुरक्षा"],
              ["**कार्यस्थल पर महिलाओं का यौन उत्पीड़न अधिनियम**", "**2013** – सुरक्षित कार्यस्थल सुनिश्चित करना"],
              ["**मुस्लिम महिला (विवाह पर अधिकारों का संरक्षण) अधिनियम**", "**2019** – तीन तलाक को अपराध घोषित करना"],
              ["**पॉक्सो (POCSO) संशोधन अधिनियम**", "**2019** – बच्चों को यौन अपराधों से सुरक्षा"]
            ]
          )
        ],
        bodyEn: [
          ...createBlocks([
            "To ensure the safety, dignity, and empowerment of women, the Government of India has enacted several landmark legislations over time. These acts offer robust legal protection to women against **domestic violence**, **dowry harassment**, **sexual harassment at the workplace**, **indecent representation**, **sexual offenses**, and **marital injustices**.",
            "For competitive examinations like UPSC, MPPSC, SSC, and other state exams, understanding the enactment year, core objectives, key provisions, and landmark judicial precedents (such as the Vishaka Case, 1997) associated with these laws is highly essential."
          ]),
          createTable(
            "table-women-safety-en",
            "Key Legislations at a Glance",
            ["Act / Legislation", "Year & Core Description"],
            [
              ["**Dowry Prohibition Act**", "**1961** – Prohibits giving or taking dowry"],
              ["**Indecent Representation of Women (Prohibition) Act**", "**1986** – Bans indecent depiction of women"],
              ["**Protection of Women from Domestic Violence Act**", "**2005** – Legal shield against domestic abuse"],
              ["**Sexual Harassment of Women at Workplace (POSH) Act**", "**2013** – Ensures safe working environments"],
              ["**Muslim Women (Protection of Rights on Marriage) Act**", "**2019** – Criminalizes instant triple talaq"],
              ["**POCSO Amendment Act**", "**2019** – Safety of children from sexual offenses"]
            ]
          )
        ],
      },

      /* ── 2. Dowry & Indecent Representation Acts ───────────────── */
      {
        _key: "sec-dowry-indecent",
        kind: "keyAspects",
        title: "दहेज प्रतिषेध (1961) एवं अशिष्ट चित्रण निषेध अधिनियम (1986)",
        titleEn: "Dowry Prohibition (1961) & Indecent Representation of Women Acts (1986)",
        body: createBlocks([
          "### 1. दहेज प्रतिषेध अधिनियम, 1961",
          "• **मुख्य उद्देश्य**: समाज से दहेज प्रथा को समाप्त करना तथा दहेज लेने-देने पर रोक लगाना।",
          "• **दंडनीय अपराध**: विवाह के संबंध में प्रत्यक्ष या अप्रत्यक्ष रूप से दहेज मांगना, देना या लेना कानूनन दंडनीय अपराध है।",
          "• **दहेज मांगना**: विवाह के पूर्व, दौरान या बाद में वर या वधू पक्ष से दहेज की मांग करना गंभीर अपराध है, जिसके लिए कारावास एवं जुर्माना दोनों का प्रावधान है।",
          "• **दहेज लेना**: विवाह के समय लिए जाने वाले अनधिकृत उपहार भी दहेज की श्रेणी में आते हैं।",
          "• **महिलाओं के अधिकार**: वधू को मिले उपहारों (स्त्रीधन) पर उसका पूर्ण कानूनी अधिकार होता है।",
          "### 2. महिलाओं का अशिष्ट चित्रण (निषेध) अधिनियम, 1986",
          "• **मुख्य उद्देश्य**: विज्ञापनों, प्रकाशनों, लेखन, चित्रों, या किसी भी अन्य माध्यम में महिलाओं के अश्लील, अपमानजनक और अवांछनीय चित्रण पर रोक लगाना।",
          "• **लागू क्षेत्र**: यह कानून विज्ञापन, पोस्टर, पत्र-पत्रिकाएँ, फिल्में, डिजिटल मीडिया तथा सोशल मीडिया पर कड़ाई से लागू होता है।",
          "• **परीक्षा तथ्य**: इसका आधिकारिक अंग्रेजी नाम **Indecent Representation of Women (Prohibition) Act, 1986** है।"
        ]),
        bodyEn: createBlocks([
          "### 1. Dowry Prohibition Act, 1961",
          "• **Main Objective**: To eliminate the practice of dowry and prohibit the giving, taking, or demanding of dowry in marriages.",
          "• **Punishable Offense**: Demanding, giving, or receiving dowry directly or indirectly is a severe criminal offense.",
          "• **Demanding Dowry**: Seeking dowry before, during, or after marriage attracts strict imprisonment and financial penalties.",
          "• **Receiving Dowry**: Unauthorized transactions of assets under the guise of wedding gifts are prohibited.",
          "• **Rights of Women**: Absolute ownership of all wedding gifts (Stree-dhan) belongs legally to the bride.",
          "### 2. Indecent Representation of Women (Prohibition) Act, 1986",
          "• **Main Objective**: To prohibit the indecent, vulgar, or derogatory representation of women through advertisements, publications, writings, paintings, or figures.",
          "• **Applicability**: This act strictly regulates advertisements, posters, newspapers/magazines, movies, and digital/social media platforms.",
          "• **Exam Fact**: It is officially titled the **Indecent Representation of Women (Prohibition) Act, 1986**."
        ]),
      },

      /* ── 3. Domestic Violence Act ────────────────────────────── */
      {
        _key: "sec-domestic-violence",
        kind: "keyHighlights",
        title: "घरेलू हिंसा से महिलाओं का संरक्षण अधिनियम, 2005",
        titleEn: "Protection of Women from Domestic Violence Act, 2005",
        body: [
          ...createBlocks([
            "घरेलू हिंसा अधिनियम, 2005 घरेलू दायरे के भीतर महिलाओं को किसी भी प्रकार की हिंसा या दुर्व्यवहार से बचाने के लिए एक मील का पत्थर है। यह सिविल कानून होने के बावजूद त्वरित राहत प्रदान करता है।",
            "### घरेलू हिंसा में शामिल श्रेणियां",
            "• **शारीरिक हिंसा**: मारना-पीटना, धक्का देना, चोट पहुंचाना या शारीरिक पीड़ा देना।",
            "• **मानसिक व भावनात्मक उत्पीड़न**: गाली देना, अपमानित करना, चरित्र पर लांछन लगाना या धमकी देना।",
            "• **आर्थिक शोषण**: महिला के वित्तीय संसाधनों को छीनना, बुनियादी जरूरतों से वंचित करना, या स्त्रीधन/वेतन का जबरन नियंत्रण।",
            "• **यौन हिंसा**: महिला की सहमति के बिना उसके आत्मसम्मान को ठेस पहुंचाने वाले यौन व्यवहार के लिए मजबूर करना।",
            "### अधिनियम के विशेष प्रावधान",
            "• **संरक्षण आदेश**: मजिस्ट्रेट द्वारा पीड़ित महिला के पक्ष में और प्रताड़ित करने वाले व्यक्ति के खिलाफ संरक्षण आदेश जारी करना ताकि आगे की हिंसा रोकी जा सके।",
            "• **निवास का अधिकार**: महिला को अपने ससुराल या साझे घर (Shared Household) में रहने का पूरा कानूनी अधिकार है; उसे जबरन बेदखल नहीं किया जा सकता।",
            "• **भरण-पोषण**: कोर्ट पीड़ित महिला और उसके बच्चों के दैनिक खर्चों के लिए अंतरिम और मासिक भरण-पोषण राशि तय कर सकता है।",
            "• **मुआवजा**: घरेलू हिंसा के कारण पहुंचे मानसिक और शारीरिक नुकसान के लिए मुआवजा प्राप्त करने का अधिकार।"
          ]),
          {
            _key: "b3-img-domestic",
            _type: "image",
            asset: { _type: "reference", _ref: assetDomestic._id },
            alt: "A young Indian woman smiling confidently in a safe and supportive home environment with family in background",
          }
        ],
        bodyEn: [
          ...createBlocks([
            "The Protection of Women from Domestic Violence Act, 2005 (PWDVA) is a path-breaking civil legislation designed to shield women from any form of abuse occurring within a shared household.",
            "### Forms of Domestic Violence Covered",
            "• **Physical Violence**: Act of beating, pushing, causing bodily pain, or physical harm.",
            "• **Mental & Emotional Abuse**: Verbal insults, derogatory remarks, questioning character, and threats of harm.",
            "• **Economic Abuse**: Depriving the victim of financial resources, basic necessities, or forcing control over her income/Stree-dhan.",
            "• **Sexual Abuse**: Any forced sexual contact or behavior that violates the modesty and dignity of a woman.",
            "### Key Protective Remedies Provided",
            "• **Protection Orders**: Magisterial orders restraining the respondent from committing further acts of domestic violence or entering the victim's workplace.",
            "• **Right to Reside**: Guarantees a woman's right to live in the shared matrimonial home, regardless of whether she has any ownership title.",
            "• **Monetary Relief**: Provisions for financial support, including medical expenses and loss of earnings, paid by the respondent.",
            "• **Compensation**: Directs the respondent to pay damages for mental torture and physical injuries caused."
          ]),
          {
            _key: "b3-img-domestic-en",
            _type: "image",
            asset: { _type: "reference", _ref: assetDomestic._id },
            alt: "A young Indian woman smiling confidently in a safe and supportive home environment with family in background",
          }
        ],
      },

      /* ── 4. POSH Act, 2013 ───────────────────────────────────── */
      {
        _key: "sec-posh-act",
        kind: "keyAspects",
        title: "कार्यस्थल पर महिलाओं का यौन उत्पीड़न (POSH Act, 2013)",
        titleEn: "Sexual Harassment of Women at Workplace (POSH) Act, 2013",
        body: [
          ...createBlocks([
            "यह कानून कामकाजी महिलाओं के लिए एक सुरक्षित, लैंगिक-समान और सम्मानजनक कार्यस्थल सुनिश्चित करने की दिशा में मील का पत्थर है।",
            "• **Full Form**: **POSH** का अर्थ **Prevention of Sexual Harassment** (यौन उत्पीड़न की रोकथाम) है।",
            "• **अधिनियम का आधार**: यह अधिनियम सुप्रीम कोर्ट के ऐतिहासिक निर्णय **विशाखा बनाम राजस्थान राज्य (1997)** में दिए गए दिशा-निर्देशों पर आधारित है।",
            "• **Internal Committee (IC)**: प्रत्येक संगठन या कार्यालय जिसमें **10 या अधिक कर्मचारी** कार्यरत हैं, वहां एक **Internal Committee (IC)** का गठन अनिवार्य है, जिसकी अध्यक्षता एक वरिष्ठ महिला कर्मचारी करेगी।",
            "• **Local Committee**: जिन संस्थानों में **10 से कम कर्मचारी** हैं या शिकायत स्वयं नियोक्ता के खिलाफ है, वहां जिला स्तर पर **Local Committee** सुनवाई करेगी।",
            "• **शिकायत अवधि**: पीड़ित महिला घटना के **3 माह** के भीतर अपनी शिकायत दर्ज करा सकती है।",
            "• **जांच प्रक्रिया**: समिति द्वारा जांच प्रक्रिया को पूरी तरह से गोपनीय रखा जाता है।"
          ]),
          {
            _key: "b4-img-posh",
            _type: "image",
            asset: { _type: "reference", _ref: assetPosh._id },
            alt: "Professional Indian women collaborating happily in a modern and safe office environment",
          }
        ],
        bodyEn: [
          ...createBlocks([
            "Popularly known as the POSH Act, 2013, this legislation is dedicated to ensuring a safe, equitable, and dignified work environment for women across all sectors, formal and informal.",
            "• **Full Form**: **POSH** stands for **Prevention of Sexual Harassment**.",
            "• **Judicial Origin**: The POSH Act formalizes the **Vishaka Guidelines** laid down by the Supreme Court of India in the landmark case of **Vishaka vs. State of Rajasthan (1997)**.",
            "• **Internal Committee (IC)**: Mandatory for every workplace employing **10 or more people**. The committee must be headed by a senior woman employee.",
            "• **Local Committee**: Set up at the district level to address complaints from workplaces with **fewer than 10 employees** or when the complaint is against the employer directly.",
            "• **Filing Period**: The complaint must be filed within **3 months** from the date of the incident.",
            "• **Inquiry Process**: The identity of the complainant and the inquiry details must be kept strictly confidential under the law."
          ]),
          {
            _key: "b4-img-posh-en",
            _type: "image",
            asset: { _type: "reference", _ref: assetPosh._id },
            alt: "Professional Indian women collaborating happily in a modern and safe office environment",
          }
        ],
      },

      /* ── 5. Muslim Women Act, 2019 ───────────────────────────── */
      {
        _key: "sec-muslim-women",
        kind: "keyAspects",
        title: "मुस्लिम महिला (विवाह पर अधिकारों का संरक्षण) अधिनियम, 2019",
        titleEn: "Muslim Women (Protection of Rights on Marriage) Act, 2019",
        body: [
          ...createBlocks([
            "• **मुख्य उद्देश्य**: तत्काल **तीन तलाक (Triple Talaq)** पर रोक लगाना।",
            "• **Triple Talaq**: तत्काल तीन तलाक (तलाक-ए-बिद्दत) बोलना चाहे वह मौखिक, लिखित या इलेक्ट्रॉनिक माध्यम से हो, कानूनन अवैध एवं शून्य (Void) घोषित किया गया है।",
            "• **दंड**: तत्काल तीन तलाक देने वाले पति के लिए **तीन वर्ष तक के कारावास** और जुर्माने का प्रावधान है।",
            "• **भरण-पोषण**: पीड़ित पत्नी को अपने और अपने आश्रित बच्चों के लिए भरण-पोषण प्राप्त करने का अधिकार है।",
            "• **अभिरक्षा**: पीड़ित महिला को अपने नाबालिग बच्चों की अभिरक्षा (Custody) पाने का अधिकार है।"
          ]),
          {
            _key: "b5-img-talaq",
            _type: "image",
            asset: { _type: "reference", _ref: assetTalaq._id },
            alt: "A young Indian Muslim woman wearing a hijab sitting in a modern room, smiling confidently, representing legal rights and empowerment",
          }
        ],
        bodyEn: [
          ...createBlocks([
            "• **Main Objective**: To ban the practice of instant **Triple Talaq** (Talaq-e-Biddat).",
            "• **Triple Talaq**: Declared illegal, null, and void in any form—whether spoken, written, or transmitted electronically.",
            "• **Punishment**: Prescribes up to **three years of imprisonment** and a fine for the husband pronouncing instant triple talaq.",
            "• **Maintenance**: Entitles the aggrieved wife to receive subsistence allowance for herself and her dependent children.",
            "• **Custody**: Grants the mother the custody of her minor children."
          ]),
          {
            _key: "b5-img-talaq-en",
            _type: "image",
            asset: { _type: "reference", _ref: assetTalaq._id },
            alt: "A young Indian Muslim woman wearing a hijab sitting in a modern room, smiling confidently, representing legal rights and empowerment",
          }
        ],
      },

      /* ── 6. POCSO Amendment Act, 2019 ────────────────────────── */
      {
        _key: "sec-pocso-act",
        kind: "keyAspects",
        title: "पॉक्सो (POCSO) संशोधन अधिनियम, 2019",
        titleEn: "Protection of Children from Sexual Offences (POCSO) Amendment Act, 2019",
        body: [
          ...createBlocks([
            "यह कानून बच्चों को यौन शोषण, यौन उत्पीड़न और पोर्नोग्राफी जैसे गंभीर अपराधों से सुरक्षा प्रदान करने के लिए अत्यंत महत्वपूर्ण है।",
            "• **Full Form**: **POCSO** का अर्थ **Protection of Children from Sexual Offences Act** है।",
            "• **मूल अधिनियम**: यह मूल रूप से **वर्ष 2012** में लागू किया गया था।",
            "• **संशोधन**: इसे और अधिक कड़ा बनाने के लिए **वर्ष 2019** में संशोधित किया गया।",
            "• **मुख्य उद्देश्य**: **18 वर्ष से कम** आयु के बच्चों को यौन अपराधों से कड़ी सुरक्षा प्रदान करना (जेंडर-तटस्थ कानून)।",
            "• **कठोर दंड**: गंभीर यौन हमले के मामलों में न्यूनतम 20 वर्ष के कारावास से लेकर **मृत्युदंड (Death Penalty)** का प्रावधान किया गया है।",
            "• **बाल-अनुकूल न्याय प्रक्रिया**: जांच और सुनवाई के दौरान बच्चे के मानसिक स्वास्थ्य को ध्यान में रखते हुए प्रक्रिया को सरल व अनुकूल बनाया गया है।"
          ]),
          {
            _key: "b6-img-pocso",
            _type: "image",
            asset: { _type: "reference", _ref: assetPocso._id },
            alt: "A happy Indian child playing safely outdoors in a sunny park with a protective adult nearby",
          }
        ],
        bodyEn: [
          ...createBlocks([
            "The POCSO Act is a gender-neutral legislation crucial for protecting children from sexual abuse, sexual harassment, and child pornography.",
            "• **Full Form**: **POCSO** stands for **Protection of Children from Sexual Offences**.",
            "• **Original Act**: Enacted in the year **2012**.",
            "• **Amendment**: Revised in **2019** to introduce more stringent penalties.",
            "• **Core Objective**: To protect children **under 18 years of age** from sexual offenses under a child-friendly legal framework.",
            "• **Death Penalty**: The 2019 amendment introduces the **death penalty** for aggravated penetrative sexual assault cases.",
            "• **Child-Friendly Justice System**: Police recording and court testimony are structured to prevent secondary trauma to the child."
          ]),
          {
            _key: "b6-img-pocso-en",
            _type: "image",
            asset: { _type: "reference", _ref: assetPocso._id },
            alt: "A happy Indian child playing safely outdoors in a sunny park with a protective adult nearby",
          }
        ],
      },

      /* ── 7. Other Acts ───────────────────────────────────────── */
      {
        _key: "sec-other-acts",
        kind: "quickFacts",
        title: "महिलाओं की सुरक्षा से जुड़े अन्य महत्वपूर्ण अधिनियम",
        titleEn: "Other Important Acts Related to Women Safety & Rights",
        body: createBlocks([
          "• **सती निषेध अधिनियम, 1987**: सती प्रथा के महिमामंडन और इस अमानवीय कृत्य को पूरी तरह से प्रतिबंधित करता है।",
          "• **बाल विवाह प्रतिषेध अधिनियम, 2006**: बाल विवाह को रोकने के लिए कानूनी उपाय। इसके तहत लड़कियों की विवाह की न्यूनतम आयु 18 वर्ष निर्धारित है।",
          "• **मातृत्व लाभ अधिनियम, 1961**: कामकाजी महिलाओं को गर्भावस्था के दौरान और बाद में सवैतनिक अवकाश (Maternity Leave) प्रदान करता है।",
          "• **समान पारिश्रमिक अधिनियम, 1976**: समान कार्य के लिए पुरुष और महिला श्रमिकों को समान वेतन सुनिश्चित करता है।",
          "• **भारतीय न्याय संहिता (BNS), 2023**: आईपीसी (IPC) का स्थान लेने वाली इस नई संहिता में महिलाओं के विरुद्ध अपराधों (बलात्कार, झूठे वादे पर यौन संबंध) के लिए कड़े प्रावधान किए गए हैं।"
        ]),
        bodyEn: createBlocks([
          "• **Commission of Sati (Prevention) Act, 1987**: Bans the practice and glorification of Sati.",
          "• **Prohibition of Child Marriage Act, 2006**: Restricts child marriages and establishes 18 as the minimum marriageable age for females.",
          "• **Maternity Benefit Act, 1961**: Protects women's employment during pregnancy and guarantees paid maternity leave.",
          "• **Equal Remuneration Act, 1976**: Ensures equal pay for equal work for both male and female employees.",
          "• **Bharatiya Nyaya Sanhita (BNS), 2023**: Replacing the IPC, it updates and tightens definitions and penalties for crimes against women."
        ]),
      },

      /* ── 8. Exam POV ─────────────────────────────────────────── */
      {
        _key: "sec-exam-pov",
        kind: "factsAtAGlance",
        title: "परीक्षा दृष्टिकोण (Exam POV)",
        titleEn: "Exam Perspective & Key Highlights",
        body: createBlocks([
          "### याद रखने योग्य महत्वपूर्ण वर्ष",
          "• **1961** → **दहेज प्रतिषेध अधिनियम**",
          "• **1986** → **महिलाओं का अशिष्ट चित्रण (निषेध) अधिनियम**",
          "• **2005** → **घरेलू हिंसा से महिलाओं का संरक्षण अधिनियम**",
          "• **2013** → **POSH Act (कार्यस्थल पर यौन उत्पीड़न की रोकथाम)**",
          "• **2019** → **मुस्लिम महिला (विवाह पर अधिकारों का संरक्षण) अधिनियम**",
          "• **2019** → **POCSO संशोधन अधिनियम**",
          "• **2023** → **भारतीय न्याय संहिता (BNS)**",
          "### महत्वपूर्ण फुल फॉर्म (Full Forms)",
          "• **PVTG**: **Particularly Vulnerable Tribal Group** (विशेष रूप से कमजोर जनजातीय समूह)",
          "• **POCSO**: **Protection of Children from Sexual Offences**",
          "• **POSH**: **Prevention of Sexual Harassment**",
          "• **IPC**: **Indian Penal Code** (अब भारतीय न्याय संहिता - BNS)",
          "• **BNS**: **Bharatiya Nyaya Sanhita**"
        ]),
        bodyEn: createBlocks([
          "### Crucial Timelines to Remember",
          "• **1961** → **Dowry Prohibition Act**",
          "• **1986** → **Indecent Representation of Women (Prohibition) Act**",
          "• **2005** → **Protection of Women from Domestic Violence Act**",
          "• **2013** → **POSH Act (Workplace Sexual Harassment)**",
          "• **2019** → **Muslim Women (Protection of Rights on Marriage) Act**",
          "• **2019** → **POCSO Amendment Act**",
          "• **2023** → **Bharatiya Nyaya Sanhita (BNS)**",
          "### Important Abbreviations",
          "• **PVTG**: **Particularly Vulnerable Tribal Group**",
          "• **POCSO**: **Protection of Children from Sexual Offences**",
          "• **POSH**: **Prevention of Sexual Harassment**",
          "• **IPC**: **Indian Penal Code** (superseded by BNS)",
          "• **BNS**: **Bharatiya Nyaya Sanhita**"
        ]),
      }
    ],

    /* ─── MCQs ──────────────────────────────────────────────── */
    mcqs: [
      {
        question: "दहेज प्रतिषेध अधिनियम कब लागू हुआ?",
        questionEn: "When did the Dowry Prohibition Act come into force?",
        options: ["1955", "1961", "1986", "2005"],
        optionsEn: ["1955", "1961", "1986", "2005"],
        correctIndex: 1,
        explanation: "दहेज प्रतिषेध अधिनियम 1961 में लागू हुआ। इसके तहत विवाह में दहेज लेना-देना या मांगना दंडनीय अपराध घोषित किया गया है।",
        explanationEn: "The Dowry Prohibition Act came into force in 1961, making the giving, taking, or demanding of dowry a punishable offense."
      },
      {
        question: "POSH अधिनियम किससे संबंधित है?",
        questionEn: "The POSH Act is related to which of the following?",
        options: [
          "घरेलू हिंसा से सुरक्षा",
          "दहेज प्रथा पर रोक",
          "कार्यस्थल पर महिलाओं के यौन उत्पीड़न की रोकथाम",
          "बाल विवाह का निषेध"
        ],
        optionsEn: [
          "Protection from domestic violence",
          "Prohibiting dowry",
          "Prevention of sexual harassment of women at workplace",
          "Prohibition of child marriage"
        ],
        correctIndex: 2,
        explanation: "POSH (Prevention of Sexual Harassment) Act, 2013 कार्यस्थल पर महिलाओं के यौन उत्पीड़न की रोकथाम, निषेध और निवारण से संबंधित है।",
        explanationEn: "The POSH Act, 2013 deals with the prevention, prohibition, and redressal of sexual harassment of women at the workplace."
      },
      {
        question: "POCSO अधिनियम किसके संरक्षण के लिए बनाया गया है?",
        questionEn: "For whose protection was the POCSO Act enacted?",
        options: [
          "केवल वयस्क महिलाओं के लिए",
          "वरिष्ठ नागरिकों के लिए",
          "18 वर्ष से कम आयु के बच्चों के लिए",
          "दिव्यांग व्यक्तियों के लिए"
        ],
        optionsEn: [
          "Only for adult women",
          "For senior citizens",
          "For children below 18 years of age",
          "For disabled persons"
        ],
        correctIndex: 2,
        explanation: "POCSO (Protection of Children from Sexual Offences) अधिनियम 18 वर्ष से कम आयु के सभी बच्चों (बालक-बालिका दोनों) को यौन अपराधों से सुरक्षा प्रदान करता है।",
        explanationEn: "The POCSO Act is designed to protect all children below 18 years of age from sexual abuse, exploitation, and harassment."
      },
      {
        question: "घरेलू हिंसा से महिलाओं का संरक्षण अधिनियम किस वर्ष लागू हुआ?",
        questionEn: "In which year did the Protection of Women from Domestic Violence Act come into force?",
        options: ["1986", "2005", "2013", "2019"],
        optionsEn: ["1986", "2005", "2013", "2019"],
        correctIndex: 1,
        explanation: "घरेलू हिंसा से महिलाओं का संरक्षण अधिनियम वर्ष 2005 में लागू हुआ। यह घरेलू हिंसा के शिकार महिलाओं को संरक्षण और साझा निवास का अधिकार देता है।",
        explanationEn: "The Protection of Women from Domestic Violence Act came into force in 2005, providing legal protection and residence rights to victims of domestic abuse."
      },
      {
        question: "तीन तलाक (तत्काल) को अपराध घोषित करने वाला अधिनियम कौन-सा है?",
        questionEn: "Which act declared instant triple talaq a punishable offense?",
        options: [
          "दहेज प्रतिषेध अधिनियम",
          "POSH Act",
          "POCSO संशोधन अधिनियम",
          "मुस्लिम महिला (विवाह पर अधिकारों का संरक्षण) अधिनियम, 2019"
        ],
        optionsEn: [
          "Dowry Prohibition Act",
          "POSH Act",
          "POCSO Amendment Act",
          "Muslim Women (Protection of Rights on Marriage) Act, 2019"
        ],
        correctIndex: 3,
        explanation: "मुस्लिम महिला (विवाह पर अधिकारों का संरक्षण) अधिनियम, 2019 ने तत्काल तीन तलाक (तलाक-ए-बिद्दत) को अवैध, शून्य और तीन साल के कारावास के साथ दंडनीय घोषित किया।",
        explanationEn: "The Muslim Women (Protection of Rights on Marriage) Act, 2019 criminalized the practice of instant triple talaq (Talaq-e-Biddat), making it void and punishable with up to three years in prison."
      },
      {
        question: "विशाखा बनाम राजस्थान राज्य (1997) मामला किससे संबंधित है?",
        questionEn: "The Vishaka vs. State of Rajasthan (1997) case is related to:",
        options: [
          "पंचायती राज व्यवस्था",
          "कार्यस्थल पर यौन उत्पीड़न की रोकथाम",
          "घरेलू हिंसा निवारण",
          "सती प्रथा उन्मूलन"
        ],
        optionsEn: [
          "Panchayati Raj System",
          "Prevention of sexual harassment at workplace",
          "Domestic violence prevention",
          "Abolition of Sati practice"
        ],
        correctIndex: 1,
        explanation: "सर्वोच्च न्यायालय ने विशाखा बनाम राजस्थान राज्य (1997) मामले में कार्यस्थल पर यौन उत्पीड़न की रोकथाम हेतु व्यापक दिशा-निर्देश जारी किए, जो 2013 के POSH Act का आधार बने।",
        explanationEn: "The Supreme Court in Vishaka vs. State of Rajasthan (1997) issued guidelines to address sexual harassment of women at the workplace, which formed the basis of the POSH Act, 2013."
      },
      {
        question: "पॉक्सो (POCSO) संशोधन अधिनियम, 2019 के तहत गंभीर यौन हमले के मामलों में अधिकतम क्या सजा दी जा सकती है?",
        questionEn: "What is the maximum punishment under the POCSO Amendment Act, 2019 for aggravated penetrative sexual assault?",
        options: ["10 वर्ष का कठोर कारावास", "20 वर्ष का कठोर कारावास", "मृत्युदंड", "केवल वित्तीय जुर्माना"],
        optionsEn: ["10 years rigorous imprisonment", "20 years rigorous imprisonment", "Death Penalty", "Only financial fine"],
        correctIndex: 2,
        explanation: "वर्ष 2019 के पॉक्सो संशोधन अधिनियम के तहत गंभीर मामलों (Aggravated Penetrative Sexual Assault) में मृत्युदंड (Death Penalty) का प्रावधान जोड़ा गया है।",
        explanationEn: "The 2019 amendment to the POCSO Act introduced the provision for the death penalty (capital punishment) in severe cases of child sexual assault."
      },
      {
        question: "समान पारिश्रमिक अधिनियम (Equal Remuneration Act) किस वर्ष पारित किया गया था?",
        questionEn: "In which year was the Equal Remuneration Act enacted?",
        options: ["1961", "1976", "1987", "2006"],
        optionsEn: ["1961", "1976", "1987", "2006"],
        correctIndex: 1,
        explanation: "समान पारिश्रमिक अधिनियम 1976 में पारित हुआ था। यह समान कार्य के लिए पुरुष और महिला श्रमिकों को समान वेतन की गारंटी देता है।",
        explanationEn: "The Equal Remuneration Act was passed in 1976, ensuring that male and female workers receive equal pay for performing the same or similar work."
      }
    ],

    /* ─── FAQs ──────────────────────────────────────────────── */
    faqs: [
      {
        question: "दहेज प्रतिषेध अधिनियम कब लागू हुआ?",
        questionEn: "When did the Dowry Prohibition Act come into force?",
        answer: "दहेज प्रतिषेध अधिनियम 1961 में लागू हुआ। यह अधिनियम दहेज की मांग करने, देने या लेने पर रोक लगाता है और इसके उल्लंघन पर सजा का प्रावधान करता है।",
        answerEn: "The Dowry Prohibition Act came into force in 1961. It prohibits demanding, giving, or taking dowry and outlines penal provisions for violations."
      },
      {
        question: "POSH अधिनियम किससे संबंधित है?",
        questionEn: "What is the primary focus of the POSH Act?",
        answer: "POSH अधिनियम 2013 कार्यस्थल पर महिलाओं के यौन उत्पीड़न की रोकथाम, संरक्षण और निवारण से संबंधित है। इसके तहत प्रत्येक 10 से अधिक कर्मचारियों वाले संगठन में आंतरिक शिकायत समिति (IC) का गठन अनिवार्य है।",
        answerEn: "The POSH Act, 2013 focuses on the prevention, prohibition, and redressal of sexual harassment of women at the workplace. It mandates setting up an Internal Committee (IC) in organisations with 10 or more employees."
      },
      {
        question: "POCSO अधिनियम किसके संरक्षण के लिए बनाया गया है?",
        questionEn: "For whose protection is the POCSO Act intended?",
        answer: "POCSO अधिनियम 18 वर्ष से कम आयु के बच्चों को यौन शोषण और यौन अपराधों से सुरक्षा प्रदान करने के लिए बनाया गया है। 2019 के संशोधन के बाद इसमें गंभीर अपराधों के लिए मृत्युदंड का प्रावधान भी किया गया है।",
        answerEn: "The POCSO Act protects children below 18 years of age from sexual exploitation and offenses. The 2019 amendment introduces the death penalty for aggravated offenses."
      },
      {
        question: "घरेलू हिंसा से महिलाओं का संरक्षण अधिनियम किस वर्ष लागू हुआ?",
        questionEn: "When was the Domestic Violence Act enacted?",
        answer: "यह अधिनियम वर्ष 2005 में लागू हुआ। यह घरेलू दायरे (पारिवारिक संबंधों) में होने वाली शारीरिक, मानसिक, भावनात्मक, आर्थिक और यौन हिंसा के खिलाफ महिलाओं को कानूनी सुरक्षा प्रदान करता है।",
        answerEn: "This Act was enacted in 2005. It provides statutory protection and civil remedies to women facing physical, mental, emotional, economic, or sexual violence within domestic relationships."
      },
      {
        question: "तीन तलाक को अपराध घोषित करने वाला अधिनियम कौन-सा है?",
        questionEn: "Which act criminalizes Triple Talaq in India?",
        answer: "मुस्लिम महिला (विवाह पर अधिकारों का संरक्षण) अधिनियम, 2019 तत्काल तीन तलाक (तलाक-ए-बिद्दत) को अपराध घोषित करता है और पति को तीन वर्ष तक के कारावास का दंड प्रदान करता है।",
        answerEn: "The Muslim Women (Protection of Rights on Marriage) Act, 2019 criminalizes the practice of instant triple talaq (Talaq-e-Biddat), prescribing up to three years of imprisonment."
      }
    ],

    /* ─── Sources ────────────────────────────────────────────── */
    sources: [
      { label: "Ministry of Women and Child Development, India", url: "https://wcd.nic.in" },
      { label: "Legislative Department, Ministry of Law and Justice", url: "https://legislative.gov.in" },
      { label: "Supreme Court of India (Vishaka Case Guidelines)", url: "https://sci.gov.in" }
    ]
  };

  try {
    await client.createOrReplace(article);
    console.log("✨ Successfully uploaded Women Safety Laws Static GK Article to Sanity!");
  } catch (err) {
    console.error("❌ Failed to create/replace document in Sanity:", err);
  }
}

main().catch((err) => {
  console.error("❌ Error running script:", err);
  process.exit(1);
});
