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
  console.log("🚀 Starting upload for SEO-Optimized UPI MDR 2026 Current Affairs Article...");

  // Image file paths in public/images/blog/
  const publicBlogDir = path.resolve(process.cwd(), "public/images/blog");
  const imgPathQr = path.join(publicBlogDir, "upi_mdr_2026_merchant_payment_qr.jpg");
  const imgPathInfra = path.join(publicBlogDir, "upi_mdr_2026_banking_infrastructure.jpg");

  if (!fs.existsSync(imgPathQr) || !fs.existsSync(imgPathInfra)) {
    console.error("❌ Image files not found in public/images/blog/");
    process.exit(1);
  }

  // Upload images to Sanity
  console.log("📸 Uploading UPI MDR images to Sanity...");
  const assetQr = await client.assets.upload("image", fs.createReadStream(imgPathQr), {
    filename: "upi_mdr_2026_merchant_payment_qr.jpg",
  });
  const assetInfra = await client.assets.upload("image", fs.createReadStream(imgPathInfra), {
    filename: "upi_mdr_2026_banking_infrastructure.jpg",
  });
  console.log(`✔ Uploaded assets. QR Asset: ${assetQr._id}, Infra Asset: ${assetInfra._id}`);

  // Ensure Economy category exists
  const economyCategory = {
    _id: "cat-economy",
    _type: "category",
    slug: { _type: "slug", current: "economy" },
    title: "भारतीय अर्थव्यवस्था व बैंकिंग",
    titleEn: "Indian Economy & Banking",
    description: "भारतीय अर्थव्यवस्था, बैंकिंग प्रणाली, डिजिटल भुगतान, फिनटेक एवं मौद्रिक नीति संबंधी अध्ययन सामग्री।",
    descriptionEn: "Study notes on Indian Economy, Banking System, Digital Payments, Fintech, and Monetary Policy.",
    color: { hex: "#10b981" },
    icon: "trending-up",
  };
  await client.createOrReplace(economyCategory);

  // Construct Article Document
  const article = {
    _id: "ca-upi-mdr-rules-2026",
    _type: "currentAffairs",
    slug: { _type: "slug", current: "upi-mdr-rules-2026-charge-npci-mppsc-upsc-notes" },
    title: "UPI MDR 2026: ₹2,000 तक UPI पेमेंट FREE, लेकिन आगे कितना चार्ज? | MPPSC & UPSC के लिए नया नियम, MDR स्लैब व PDF",
    titleEn: "UPI MDR Rules 2026: Charges Beyond ₹2,000 P2M, NPCI MDR Slab Rates & International Acceptance | MPPSC & UPSC Notes",
    excerpt: "15 अक्टूबर 2026 से लागू हो रहे UPI मर्चेंट डिस्काउंट रेट (MDR) फ्रेमवर्क का संपूर्ण विश्लेषण। MPPSC (तृतीय प्रश्नपत्र: भारतीय अर्थव्यवस्था व विज्ञान-प्रौद्योगिकी) एवं UPSC हेतु ₹2,000 तक फ्री, 0.40% शुल्क, ₹300 कैप, P2P बनाम P2M, NPCI इतिहास, अंतरराष्ट्रीय उपयोग और 8 अभ्यास प्रश्न हिंदी व अंग्रेजी में।",
    excerptEn: "Complete study guide on NPCI's UPI MDR Framework launching Oct 15, 2026. Covers ₹2,000 free threshold, 0.40% merchant charge, ₹300 maximum cap, P2P vs P2M transactions, NPCI history, global acceptance, and 8 MCQs for MPPSC & UPSC.",
    ca_date: "2026-09-16",
    publishedAt: new Date().toISOString(),
    featured: true,
    readingTime: 8,
    keywords: [
      "UPI MDR 2026",
      "UPI MDR rules 2026",
      "UPI payment charge 2026",
      "UPI transaction charges",
      "MDR full form",
      "Merchant Discount Rate UPI",
      "NPCI UPI MDR framework",
      "P2P and P2M transaction UPI",
      "UPI international acceptance countries",
      "UPI history NPCI launch date 2016",
      "upi charges new rules in hindi",
      "upi charges by bank",
      "upi charges new rule",
      "upi charges latest news",
      "upi charges per transaction",
      "upi charges for merchants",
      "upi charges on rupay credit card",
      "upi charges in india",
      "upi charges above 2000",
      "upi mdr charges in hindi",
      "upi mdr kya hai",
      "upi mdr full form",
      "upi mdr bill",
      "upi mdr charges indian bank in hindi",
      "upi mdr meaning",
      "यूपीआई का मालिक कौन है",
      "भारत का पहला यूपीआई ऐप",
      "किन 7 देशों में यूपीआई है",
      "MPPSC Economy Notes",
      "MPPSC Paper 3 Economy",
      "UPSC Indian Economy UPI Notes",
      "यूपीआई मर्चेंट डिस्काउंट रेट 2026"
    ],
    category: { _type: "reference", _ref: "cat-economy" },
    author: { _type: "reference", _ref: "author-aakar" },
    // MPPSC Priority Rule: Put tag-mppsc before tag-upsc
    tags: [
      { _type: "reference", _ref: "tag-mppsc" },
      { _type: "reference", _ref: "tag-upsc" },
      { _type: "reference", _ref: "tag-prelims" },
      { _type: "reference", _ref: "tag-mains" },
    ],
    syllabus: ["GS-3", "MPPSC-Paper-3", "Prelims-GS"],

    featuredImage: {
      _type: "image",
      asset: { _type: "reference", _ref: assetQr._id },
      alt: "UPI MDR 2026 merchant payment QR code scanning smartphone digital india ecosystem MPPSC UPSC notes",
    },

    nextArticle: {
      title: "आयकर दिवस 2026: इतिहास, महत्व, CBDT व 166 वर्षों का सफर | MPPSC & UPSC Notes",
      titleEn: "Income Tax Day 2026: History, Sir James Wilson (1860), Income Tax Act 1961, CBDT & Key Facts | MPPSC & UPSC",
      href: "/general-awareness/income-tax-day-2026-in-hindi-history-cbdt-1961-act"
    },

    /* ─── SECTIONS ──────────────────────────────────────────────── */
    sections: [
      /* ── 1. Why in News / Context ────────────────────────────── */
      {
        _key: "sec-context",
        kind: "whyInNews",
        title: "चर्चा में क्यों? (Context & Record UPI Payment Growth)",
        titleEn: "Why in News? (Context & Record UPI Payment Growth)",
        body: [
          ...createBlocks([
            "प्रधानमंत्री नरेंद्र मोदी के कार्यकाल में **Unified Payments Interface (UPI)** को भारत की डिजिटल क्रांति का सबसे बड़ा स्तंभ माना गया है। हालिया आंकड़ों के अनुसार, **अगस्त 2026** में UPI से रिकॉर्ड **₹29,82,000 करोड़ (₹29.82 ट्रिलियन / 29.82 लाख करोड़ रुपये)** से अधिक का डिजिटल भुगतान हुआ है, जो एक माह में अब तक का सबसे बड़ा ऑल-टाइम रिकॉर्ड है।",
            "• **नया नियम लागू होने की तिथि**: नेशनल पेमेंट्स कॉर्पोरेशन ऑफ इंडिया (**NPCI**) ने नया **UPI मर्चेंट डिस्काउंट रेट (MDR) फ्रेमवर्क** तैयार किया है, जो **15 अक्टूबर 2026** से प्रभावी रूप से लागू होगा।",
            "• **आम उपभोक्ता हेतु राहत**: पीटूपी (**P2P - Person to Person**) यानी एक व्यक्ति से दूसरे व्यक्ति या रिश्तेदार/मित्र को किया जाने वाला भुगतान पूरी तरह **मुफ्त (FREE)** रहेगा।",
            "• **₹2,000 तक फ्री**: मर्चेंट (**P2M - Person to Merchant**) भुगतानों में ₹2,000 तक के छोटे लेन-देन पर कोई MDR नहीं लगेगा। देश के लगभग **96% P2M ट्रांजैक्शन** इस नए नियम से पूरी तरह अप्रभावित रहेंगे।",
            "• **परीक्षा उपयोगिता**: यह विषय [MPPSC मुख्य परीक्षा द्वितीय/तृतीय प्रश्नपत्र (भारतीय अर्थव्यवस्था, बैंकिंग व डिजिटल प्रौद्योगिकी)](/mppsc/mains-syllabus) और [MPPSC प्रारंभिक परीक्षा](/mppsc/prelims-syllabus) हेतु अत्यंत महत्वपूर्ण है।",
            "### ⚡ UPI MDR 2026 फ्रेमवर्क: नियम व चार्ज स्लैब (Quick Highlights)",
            "• **P2P (व्यक्ति से व्यक्ति)**: **0% MDR (पूरी तरह FREE)** — कोई सीमा नहीं | उपभोक्ताओं के लिए 100% निशुल्क",
            "• **P2M (₹2,000 तक)**: **0% MDR (पूरी तरह FREE)** — लगभग 96% P2M लेनदेन | छोटे व्यापारी व ग्राहक दोनों हेतु फ्री",
            "• **P2M (₹2,000 से अधिक)**: **0.40% MDR** — पात्र मर्चेंट ट्रांजैक्शन | व्यापारी (मर्चेंट) द्वारा देय, ग्राहक पर नहीं",
            "• **P2M (₹75,000 या अधिक)**: **अधिकतम ₹300 (Cap)** — कैप (सीमा) लागू | ₹1 लाख के भुगतान पर भी केवल ₹300",
            "• **छोटे मर्चेंट (मासिक क्यूआर ≤ ₹1 लाख)**: **0% (MDR से बाहर)** — टर्नओवर छूट | छोटे दुकानदारों को पूरी छूट"
          ])
        ],
        bodyEn: [
          ...createBlocks([
            "During Prime Minister Narendra Modi's tenure, **UPI (Unified Payments Interface)** has emerged as India's premier fintech revolution. In August 2026, UPI recorded an all-time monthly high of over **₹29.82 Lakh Crore (₹29,82,000 Crore)** in transaction value.",
            "• **Effective Date**: NPCI's updated **UPI Merchant Discount Rate (MDR) Framework** comes into effect on **October 15, 2026**.",
            "• **100% Free P2P**: Person-to-Person transfers between individuals remain completely FREE.",
            "• **₹2,000 Free Cap**: Person-to-Merchant (P2M) payments up to ₹2,000 carry zero MDR, protecting ~96% of everyday transactions.",
            "• **Target Exams**: Essential for [MPPSC Mains Paper 3 (Indian Economy & Digital Tech)](/mppsc/mains-syllabus) and UPSC GS-3 Economy.",
            "### ⚡ UPI MDR Rules 2026 Slab Structure At a Glance",
            "• **P2P (Person to Person)**: **0% MDR (FREE)** — Unlimited amount | No charges for individuals",
            "• **P2M (Up to ₹2,000)**: **0% MDR (FREE)** — ~96% of P2M volume | Zero charges for consumers & small shops",
            "• **P2M (Above ₹2,000)**: **0.40% MDR** — Eligible merchants | Merchant pays 0.40% (e.g. ₹40 on ₹10,000)",
            "• **P2M (₹75,000 & Above)**: **Max ₹300 Cap** — Ceiling capped at ₹300 | Maximum ₹300 even on ₹1 Lakh",
            "• **Small Merchants (QR ≤ ₹1 Lakh/mo)**: **0% (Exempted)** — Monthly receipt threshold | Small vendors completely exempt"
          ])
        ],
      },

      /* ── 2. What is MDR (Background) ─────────────────────────── */
      {
        _key: "sec-mdr-definition",
        kind: "background",
        title: "MDR क्या है? (What is Merchant Discount Rate?)",
        titleEn: "What is MDR? (Understanding Merchant Discount Rate)",
        body: [
          ...createBlocks([
            "### MDR का अर्थ व अवधारणा",
            "• **MDR का Full Form**: **Merchant Discount Rate** (मर्चेंट डिस्काउंट रेट)।",
            "• **व्यापारिक शुल्क**: MDR डिजिटल पेमेंट स्वीकार करने की सुविधा के बदले बैंक या पेमेंट सर्विस प्रोवाइडर द्वारा दुकानदार/व्यापारी (मर्चेंट) से लिया जाने वाला प्रसंस्करण शुल्क (Processing Fee) है।",
            "• **सरकारी टैक्स नहीं**: MDR कोई टैक्स (जैसे GST) नहीं है और न ही यह सरकार या NPCI द्वारा लगाया गया सरकारी शुल्क है।",
            "• **इकोसिस्टम में वितरण**: MDR से प्राप्त राशि पेमेंट इकोसिस्टम के प्रमुख घटकों में बांटी जाती है:",
            "  - **इश्यूइंग बैंक (Issuing Bank)**: ग्राहक का बैंक खाता।",
            "  - **एक्वायरिंग बैंक (Acquiring Bank)**: मर्चेंट का बैंक खाता।",
            "  - **पेमेंट सर्विस प्रोवाइडर (PSP)**: ऐप प्रदाता जैसे PhonePe, Paytm, Google Pay, BHIM।",
            "  - **NPCI infrastructure**: डिजिटल नेटवर्क ऑपरेटर।",
            "• **लागू करने का उद्देश्य**: अरबों डिजिटल लेन-देन के सुरक्षित संचालन हेतु सर्वर इंफ्रास्ट्रक्चर की मजबूती, नवाचार, साइबर सुरक्षा और 24x7 ग्राहक सेवा में निरंतर निवेश सुनिश्चित करना।"
          ])
        ],
        bodyEn: [
          ...createBlocks([
            "### Definition & Core Concept of MDR",
            "• **MDR Full Form**: **Merchant Discount Rate**.",
            "• **Merchant Fee**: MDR is the fee charged to merchants by financial institutions for accepting digital payments.",
            "• **Not a Tax**: It is neither a government tax nor a sovereign levy.",
            "• **Ecosystem Redistribution**: Collected revenue is distributed among issuing banks, acquiring banks, Payment Service Providers (PSPs like BHIM, PhonePe, Google Pay), and NPCI to fund cyber security, cloud infrastructure, and fintech innovation."
          ])
        ],
      },

      /* ── 3. Slab Wise Breakdown & Calculation ───────────────── */
      {
        _key: "sec-slabs-calculation",
        kind: "keyHighlights",
        title: "MDR की दरें, स्लैब एवं व्यावहारिक गणना (Fee Calculation Examples)",
        titleEn: "MDR Rates, Slabs & Practical Calculation Examples",
        body: [
          ...createBlocks([
            "### MDR की नई दरें (15 अक्टूबर 2026 से लागू)",
            "• **₹2,000 तक का भुगतान**: **कोई MDR नहीं (0% Fee)**। (देश के 96% दैनिक भुगतानों पर कोई असर नहीं)।",
            "• **₹2,000 से अधिक का भुगतान**: **0.40% MDR** शुल्क मर्चेंट पर लागू होगा।",
            "• **₹75,000 या उससे अधिक का भुगतान**: MDR की अधिकतम सीमा **₹300 प्रति ट्रांजैक्शन** पर कैप (Cap) कर दी गई है।",
            "### व्यावहारिक उदाहरण द्वारा समझें:",
            "• **उदाहरण 1 (₹1,500 का भुगतान)**: ₹2,000 की सीमा के भीतर होने के कारण MDR = **₹0 (फ्री)**।",
            "• **उदाहरण 2 (₹10,000 का भुगतान)**: ₹10,000 का 0.40% = **₹40 MDR** (व्यापारी द्वारा देय)।",
            "• **उदाहरण 3 (₹1,000,000 यानी ₹1 लाख का भुगतान)**: सामान्य 0.40% के हिसाब से ₹400 बनता है, लेकिन अधिकतम सीमा नियम के तहत मर्चेंट को **केवल ₹300 ही MDR** देना होगा।",
            "• **छोटे व्यापारियों को सुरक्षा**: जिन छोटे दुकानदारों की UPI QR कोड के माध्यम से मासिक प्राप्ति **₹1 लाख तक** है, वे पूरी तरह MDR से बाहर रहेंगे।"
          ]),
          {
            _key: "img-qr-scanner",
            _type: "image",
            asset: { _type: "reference", _ref: assetQr._id },
            alt: "Indian merchant retail store scanning UPI QR code stand 2026 MDR framework MPPSC notes",
          }
        ],
        bodyEn: [
          ...createBlocks([
            "### Detailed Slab Structure",
            "• **Up to ₹2,000**: **0% MDR (FREE)** - Covers ~96% of total transactions.",
            "• **Above ₹2,000**: **0.40% MDR** charged to merchants.",
            "• **₹75,000 and Above**: Maximum cap fixed at **₹300 per transaction**.",
            "### Practical Numerical Examples:",
            "• **Example 1 (₹1,500 Payment)**: Within ₹2,000 free slab = **₹0 Fee**.",
            "• **Example 2 (₹10,000 Payment)**: ₹10,000 × 0.40% = **₹40 MDR**.",
            "• **Example 3 (₹1,00,000 Payment)**: Instead of ₹400, capped at maximum **₹300 MDR**.",
            "• **Exemption for Small Merchants**: Merchants receiving up to ₹1 Lakh/month via UPI QR are completely exempt from MDR."
          ]),
          {
            _key: "img-qr-scanner-en",
            _type: "image",
            asset: { _type: "reference", _ref: assetQr._id },
            alt: "Indian merchant retail store scanning UPI QR code stand 2026 MDR framework MPPSC notes",
          }
        ],
      },

      /* ── 4. History of UPI & NPCI ───────────────────────────── */
      {
        _key: "sec-upi-history",
        kind: "keyAspects",
        title: "UPI और NPCI का इतिहास — परीक्षा में पूछे जाने योग्य तथ्य",
        titleEn: "History of UPI & NPCI — Key Exam Facts for MPPSC & UPSC",
        body: [
          ...createBlocks([
            "### NPCI (नेशनल पेमेंट्स कॉर्पोरेशन ऑफ इंडिया)",
            "• **स्थापना**: **वर्ष 2008** में भारतीय रिजर्व बैंक (**RBI**) और भारतीय बैंक संघ (**IBA**) की संयुक्त पहल के रूप में।",
            "• **कानूनी आधार**: **Payment and Settlement Systems Act, 2007** के प्रावधानों के तहत एक गैर-लाभकारी (Section 8) कंपनी के रूप में।",
            "• **मुख्यालय**: मुंबई, महाराष्ट्र।",
            "• **भूमिका**: भारत में खुदरा भुगतान और निपटान प्रणाली (Retail Payments & Settlement System) के संचालन हेतु प्रमुख छत्र संस्था (Umbrella Organization)।",
            "### UPI (Unified Payments Interface)",
            "• **विकासकर्ता**: **NPCI (National Payments Corporation of India)**।",
            "• **पायलट लॉन्च**: **11 अप्रैल 2016** (तत्कालीन RBI गवर्नर डॉ. रघुराम राजन द्वारा)।",
            "• **सार्वजनिक शुरुआत**: **अगस्त 2016** से आम नागरिकों के लेन-देन हेतु चालू।",
            "• **तकनीक**: Immediate Payment Service (**IMPS**) प्रोटोकॉल पर आधारित, जो 24x7x365 तत्काल बैंक-टू-बैंक फंड ट्रांसफर की सुविधा देता है।"
          ]),
          {
            _key: "img-banking-infra",
            _type: "image",
            asset: { _type: "reference", _ref: assetInfra._id },
            alt: "3D digital illustration of India UPI payment ecosystem connecting commercial banks RBI NPCI fintech MPPSC notes",
          }
        ],
        bodyEn: [
          ...createBlocks([
            "### NPCI (National Payments Corporation of India)",
            "• **Established**: **2008** as a joint initiative of Reserve Bank of India (RBI) and Indian Banks' Association (IBA).",
            "• **Statutory Basis**: Under the **Payment and Settlement Systems Act, 2007**.",
            "• **Role**: Umbrella organization for operating retail payment and settlement systems in India.",
            "### UPI (Unified Payments Interface)",
            "• **Developed By**: **NPCI**.",
            "• **Pilot Launch**: **April 11, 2016** by then RBI Governor Dr. Raghuram Rajan.",
            "• **Public Rollout**: **August 2016** for general public transactions.",
            "• **Underlying Architecture**: Built on IMPS (Immediate Payment Service) infrastructure enabling instant 24x7 bank account transfers."
          ]),
          {
            _key: "img-banking-infra-en",
            _type: "image",
            asset: { _type: "reference", _ref: assetInfra._id },
            alt: "3D digital illustration of India UPI payment ecosystem connecting commercial banks RBI NPCI fintech MPPSC notes",
          }
        ],
      },

      /* ── 5. International Acceptance ────────────────────────── */
      {
        _key: "sec-international-upi",
        kind: "keyAspects",
        title: "UPI किन-किन देशों में उपलब्ध है? (Global Acceptance & Cross-Border Linkage)",
        titleEn: "International Acceptance of UPI & Cross-Border Linkages",
        body: createBlocks([
          "### अंतरराष्ट्रीय मर्चेंट स्वीकार्यता (Global Merchant Acceptance)",
          "NPCI की अंतरराष्ट्रीय शाखा **NIPL (NPCI International Payments Limited)** द्वारा विश्व के प्रमुख देशों में UPI की स्वीकार्यता का विस्तार किया गया है:",
          "• **नेपाल**: भारत के बाहर **UPI अपनाने वाला दुनिया का पहला देश** बना। साथ ही भारत-नेपाल के बीच **P2P Cross-border Remittance** की सुविधा भी विकसित की गई है।",
          "• **सिंगापुर**: **India-Singapore UPI-PayNow Linkage** के माध्यम से दोनों देशों के नागरिकों के बीच तत्काल और कम लागत में सीमा-पार फंड ट्रांसफर सुविधा उपलब्ध है।",
          "• **फ्रांस**: यूरोप में UPI की स्वीकार्यता की शुरुआत, चुनिंदा ऐतिहासिक मर्चेंट लोकेशन्स (जैसे एफिल टावर) पर भारतीय पर्यटक UPI से भुगतान कर सकते हैं।",
          "• **भूटान**: भारत के QR कोड मानक (BHIM UPI) को स्वीकार करने वाला पहला पड़ोसी देश।",
          "• **मॉरीशस व श्रीलंका**: फरवरी 2024 में प्रधान मंत्री नरेंद्र मोदी द्वारा संयुक्त रूप से UPI सेवाओं का शुभारंभ किया गया।",
          "• **संयुक्त अरब अमीरात (UAE)**: Mashreq बैंक और NeoPay टर्मिनल्स के माध्यम से व्यापक मर्चेंट स्वीकार्यता।"
        ]),
        bodyEn: createBlocks([
          "### Global Footprint of UPI (NIPL Initiative)",
          "• **Nepal**: First country outside India to adopt UPI and enable P2P cross-border remittances.",
          "• **Singapore**: **UPI-PayNow Linkage** for instant cross-border funds transfer between bank accounts.",
          "• **France**: UPI acceptance launched at iconic merchant sites including the Eiffel Tower.",
          "• **Bhutan**: First country to accept BHIM UPI QR codes.",
          "• **Mauritius & Sri Lanka**: Launched in Feb 2024 for Indian tourists and cross-border payments.",
          "• **UAE**: Merchant acceptance via Mashreq Bank and NeoPay terminals."
        ]),
      },

      /* ── 6. Google People Also Ask (PAA) SEO High-Rank Section ── */
      {
        _key: "sec-google-paa",
        kind: "keyAspects",
        title: "लोगों ने यह भी पूछा (Google People Also Ask — High Rank SEO Answers)",
        titleEn: "Google People Also Ask (Search Intent Answers)",
        body: createBlocks([
          "### 1. यूपीआई (UPI) का मालिक कौन है और यह किस देश का है?",
          "• **उत्तर**: UPI का मालिक और संचालनकर्ता **NPCI (National Payments Corporation of India)** है, जो कि **भारत (India)** की एक गैर-लाभकारी (Section 8) छत्र संस्था है। यह **भारतीय रिज़र्व बैंक (RBI)** और **भारतीय बैंक संघ (IBA)** के मार्गदर्शन में कार्य करती है।",
          "### 2. भारत का पहला यूपीआई ऐप कौन सा है और UPI की शुरुआत कब हुई?",
          "• **उत्तर**: भारत का पहला आधिकारिक राष्ट्रीय UPI ऐप **BHIM (Bharat Interface for Money)** है, जिसे प्रधानमंत्री नरेंद्र मोदी द्वारा 30 दिसंबर 2016 को लॉन्च किया गया था। UPI का पायलट 11 अप्रैल 2016 को लॉन्च हुआ था तथा अगस्त 2016 में यह आम जनता हेतु शुरू हुआ।",
          "### 3. यूपीआई किन 7 प्रमुख देशों में काम करता है?",
          "• **उत्तर**: UPI की अंतरराष्ट्रीय स्वीकार्यता मुख्य रूप से 7 देशों में है: **नेपाल, भूटान, सिंगापुर, फ्रांस, मॉरीशस, श्रीलंका और संयुक्त अरब अमीरात (UAE)**। इनमें नेपाल भारत के बाहर UPI अपनाने वाला पहला देश बना।",
          "### 4. What is UPI MDR Charges / UPI MDR क्या होता है?",
          "• **उत्तर**: **MDR (Merchant Discount Rate)** वह सेवा शुल्क है जो मर्चेंट/दुकानदार से डिजिटल पेमेंट स्वीकार करने पर लिया जाता है। 15 अक्टूबर 2026 से ₹2,000 से अधिक के P2M भुगतानों पर **0.40% MDR** (अधिकतम ₹300) लागू होगा। आम ग्राहक और ₹2,000 तक के लेन-देन पूरी तरह FREE हैं।",
          "### 5. RuPay क्रेडिट कार्ड पर UPI चार्ज का क्या नियम है?",
          "• **उत्तर**: NPCI के नियमों के अनुसार **RuPay Credit Card** को UPI से जोड़ने पर ₹2,000 तक के मर्चेंट भुगतान पर 0% MDR तथा ₹2,000 से ऊपर के पात्र व्यावसायिक भुगतानों पर 0.40% मर्चेंट शुल्क लागू होता है।",
          "### 6. गूगल पे, फोनपे, पेटीएम और बैंकों के बीच MDR शुल्क का वितरण कैसे होगा?",
          "• **उत्तर**: MDR से प्राप्त राशि इश्यूइंग बैंक, एक्वायरिंग बैंक, पेमेंट सर्विस प्रोवाइडर (गूगल पे, फोनपे, पेटीएम) और NPCI के बीच बांटी जाती है ताकि 24x7 डिजिटल नेटवर्क, सर्वर क्षमता और साइबर सुरक्षा को मजबूत किया जा सके।"
        ]),
        bodyEn: createBlocks([
          "### Google Search Intent Answers (People Also Ask)",
          "• **Who owns UPI?**: NPCI (National Payments Corporation of India), an Indian non-profit organization regulated by RBI and IBA.",
          "• **India's First UPI App**: BHIM (Bharat Interface for Money) launched on Dec 30, 2016.",
          "• **7 Global Countries**: Nepal, Bhutan, Singapore, France, Mauritius, Sri Lanka, and UAE.",
          "• **UPI MDR Meaning**: Merchant Discount Rate of 0.40% charged to merchants for transactions above ₹2,000.",
          "• **RuPay Credit Card UPI Rules**: 0% MDR up to ₹2,000 and 0.40% MDR above ₹2,000 for merchant payments."
        ]),
      },

      /* ── 7. Top 8 Questions & Answers (Detailed FAQ Section) ── */
      {
        _key: "sec-faqs-breakdown",
        kind: "keyAspects",
        title: "UPI MDR नियम 2026: आम नागरिकों व व्यापारियों के प्रमुख सवाल और उत्तर",
        titleEn: "UPI MDR Rules 2026: Frequently Asked Questions & Detailed Answers",
        body: createBlocks([
          "### सवाल 1. मर्चेंट डिस्काउंट रेट (MDR) क्यों लागू किया जा रहा है?",
          "• **उत्तर**: UPI हर महीने अरबों लेन-देन संभालता है। प्राप्त MDR राशि केवल UPI इकोसिस्टम में ही वितरित की जाएगी, ताकि बैंकिंग व डिजिटल इंफ्रास्ट्रक्चर की मजबूती, फिनटेक नवाचार, बैंकों व गैर-बैंकों के साथ साइबर सुरक्षा और ग्राहक सेवा में और अधिक निवेश किया जा सके। क्रेडिट व डेबिट कार्ड की तुलना में UPI पर MDR की दरें काफी कम रखी गई हैं।",
          "### सवाल 2. क्या कम राशि के यूपीआई लेनदेन प्रभावित होंगे?",
          "• **उत्तर**: **बिलकुल नहीं**। ₹2,000 तक के कम राशि के UPI लेन-देन पर **0% MDR (कोई चार्ज नहीं)** लगेगा, जो कुल P2M लेनदेन का **96% से अधिक** हिस्सा है।",
          "### सवाल 3. दोस्तों या रिश्तेदारों को पैसे भेजने पर कितना चार्ज लगेगा?",
          "• **उत्तर**: **शून्य (FREE)**। एक व्यक्ति से दूसरे व्यक्ति को किए जाने वाले **P2P (Person to Person)** पेमेंट पर कोई चार्ज नहीं लगाया गया है।",
          "### सवाल 4. किस-किस को देना होगा एक्स्ट्रा चार्ज?",
          "• **उत्तर**: MDR केवल मर्चेंट (दुकानदार या सर्विस प्रोवाइडर) द्वारा ₹2,000 से अधिक के P2M भुगतानों पर देय होगा। आम ग्राहकों से कोई अतिरिक्त शुल्क नहीं लिया जाएगा।",
          "### सवाल 5. MDR क्या होता है और यह किससे लिया जाता है?",
          "• **उत्तर**: MDR (Merchant Discount Rate) डिजिटल पेमेंट स्वीकार करने की सुविधा के बदले व्यापारी/दुकानदार से लिया जाने वाला सर्विस चार्ज है।",
          "### सवाल 6. किन लोगों पर पड़ेगा सीधा असर?",
          "• **उत्तर**: इसका सीधा प्रभाव ₹2,000 से अधिक का क्यूआर भुगतान लेने वाले बड़े व्यापारियों और व्यावसायिक प्रतिष्ठानों की पेमेंट लागत पर पड़ेगा। आम नागरिक इससे पूरी तरह मुक्त हैं।",
          "### सवाल 7. अधिकतम ₹300 की सीमा कैसे तय होगी?",
          "• **उत्तर**: ₹2,000 से ऊपर के भुगतान पर 0.40% का MDR लागू है, लेकिन बड़े भुगतानों में व्यापारी सुरक्षा हेतु अधिकतम सीमा **₹300** तय की गई है। उदाहरण के लिए ₹1 लाख के भुगतान पर 0.40% = ₹400 के बजाय केवल ₹300 ही चार्ज लगेगा।",
          "### सवाल 8. ऑनलाइन शॉपिंग पर कितना चार्ज लगेगा?",
          "• **उत्तर**: अब तक प्राप्त जानकारी के अनुसार पर्सन टू पर्सन लेन-देन तथा सामान्य ऑनलाइन ई-कॉमर्स खरीद पर आम ग्राहक को कोई अतिरिक्त शुल्क नहीं देना होगा।"
        ]),
        bodyEn: createBlocks([
          "### Top FAQs Explained",
          "• **Why MDR?**: To fund cyber security, cloud servers, and 24x7 network reliability across banks and PSPs.",
          "• **Small Transactions Impact**: Zero impact on payments up to ₹2,000 (~96% of P2M transactions).",
          "• **P2P Charges**: Completely free for transfers between friends/family.",
          "• **Who pays?**: Merchants pay 0.40% on transactions above ₹2,000.",
          "• **Max Cap Rule**: Capped at ₹300 maximum per transaction."
        ]),
      },

      /* ── 8. MPPSC Exam Mains Analysis ────────────────────────── */
      {
        _key: "sec-mppsc-analysis",
        kind: "keyAspects",
        title: "MPPSC मुख्य परीक्षा (तृतीय प्रश्नपत्र) व सुशासन (Governance) विश्लेषण",
        titleEn: "MPPSC Mains Paper-3 Economy & Digital Financial Governance",
        body: createBlocks([
          "### MPPSC Mains Paper-3 (अर्थव्यवस्था व बैंकिंग) उत्तर लेखन फ्रेमवर्क",
          "• **डिजिटल समावेशी संवृद्धि (Inclusive Digital Growth)**: Zero MDR नीति ने भारत को कैशलेस अर्थव्यवस्था की ओर तेज़ी से आगे बढ़ाया है। ₹2,000 तक की निशुल्क सीमा से वित्तीय समावेशन (Financial Inclusion) बना रहेगा।",
          "• **फिनटेक इकोसिस्टम की वित्तीय स्थिरता**: बैंकों तथा PhonePe, Google Pay, Paytm जैसे प्रदाताओं के लिए बुनियादी ढांचे और साइबर सुरक्षा लागतों को वहन करने हेतु न्यायसंगत MDR आवश्यक है।",
          "• **डिजिटल सार्वजनिक अवसंरचना (DPI)**: UPI भारत के डिजिटल पब्लिक इंफ्रास्ट्रक्चर (DPI - Aadhaar, UPI, DigiLocker) का प्रमुख वैश्विक उदाहरण बन चुका है। [MPPSC Notes Portal](/mppsc-notes) पर संपूर्ण अर्थव्यवस्था अध्ययन सामग्री उपलब्ध है।"
        ]),
        bodyEn: createBlocks([
          "### MPPSC Mains Paper-3 Answer Writing Points",
          "• Financial inclusion balance via ₹2,000 free threshold.",
          "• Sustainable monetization of India's Digital Public Infrastructure (DPI) to support cloud servers and cyber security.",
          "• Internationalization of Rupee and UPI global footprint."
        ]),
      },

      /* ── 9. Revision & Interlinking ──────────────────────────── */
      {
        _key: "sec-interlinking-seo",
        kind: "factsAtAGlance",
        title: "🔗 क्विक रिवीजन & संबंधित MPPSC अध्ययन सामग्री (SEO Interlinking)",
        titleEn: "Quick Revision & Related MPPSC Notes (Interlinking)",
        body: createBlocks([
          "### त्वरित रिवीजन पॉइंटर्स (Quick Revision)",
          "• **MDR की फुल फॉर्म** → Merchant Discount Rate (मर्चेंट डिस्काउंट रेट)",
          "• **UPI की फुल फॉर्म** → Unified Payments Interface",
          "• **NPCI की फुल फॉर्म** → National Payments Corporation of India (स्थापना: 2008)",
          "• **UPI लॉन्च वर्ष** → 2016 (पायलट: 11 अप्रैल 2016 | आम जन: अगस्त 2016)",
          "• **नया नियम लागू तिथि** → 15 अक्टूबर 2026",
          "• **फ्री लिमिट** → P2P (100% फ्री) | P2M (₹2,000 तक 0% MDR)",
          "• **MDR दर** → ₹2,000 से अधिक पर 0.40% (अधिकतम सीमा: ₹300)",
          "• **पहला अंतरराष्ट्रीय देश** → नेपाल (नेपाल पहला UPI अपनाने वाला देश)",
          "### संबंधित MPPSC अध्ययन सामग्री & महत्वपूर्ण लिंक्स",
          "👉 [आयकर दिवस 2026 (Income Tax Day): इतिहास, CBDT व 166 वर्षों का सफर](/general-awareness/income-tax-day-2026-in-hindi-history-cbdt-1961-act)",
          "👉 [प्रत्यक्ष व अप्रत्यक्ष कर संशोधन विधेयक 2026 नोट्स](/current-affairs/taxation-bill-2026-mppsc-upsc-notes)",
          "👉 [MPPSC Mains Syllabus 2026 (तृतीय प्रश्नपत्र: अर्थव्यवस्था व विज्ञान)](/mppsc/mains-syllabus)",
          "👉 [MPPSC Prelims General Studies Complete Syllabus](/mppsc/prelims-syllabus)",
          "👉 [FCRA Amendment Bill & Rules 2026: मुख्य प्रावधान व MPPSC Notes](/current-affairs/fcra-amendment-rules-2026)",
          "👉 [आपदा प्रबंधन (संशोधन) अधिनियम 2025: मुख्य प्रावधान व MPPSC Notes](/current-affairs/disaster-management-amendment-act-2025-mppsc-upsc-notes)",
          "👉 [MPPSC 2026-27 ऑनलाइन लाइव बैच में प्रवेश लें](/online-courses/mppsc-mains-2027-online-live-batch)"
        ]),
        bodyEn: createBlocks([
          "### Related MPPSC Notes & Links",
          "👉 [Income Tax Day 2026 & CBDT History Notes](/general-awareness/income-tax-day-2026-in-hindi-history-cbdt-1961-act)",
          "👉 [Taxation Bill 2026 MPPSC Notes](/current-affairs/taxation-bill-2026-mppsc-upsc-notes)",
          "👉 [MPPSC Mains Paper 3 Syllabus](/mppsc/mains-syllabus)",
          "👉 [MPPSC Prelims Syllabus](/mppsc/prelims-syllabus)"
        ]),
      }
    ],

    /* ─── MCQs (EXACTLY 8 HIGH-QUALITY MCQs) ───────────────── */
    mcqs: [
      {
        question: "NPCI द्वारा घोषित नए ढांचे (15 अक्टूबर 2026 से प्रभावी) के तहत कितने रुपये तक के UPI P2M लेन-देन को MDR से पूरी तरह मुक्त (FREE) रखा गया है?",
        questionEn: "Under NPCI's new framework effective Oct 15, 2026, UPI P2M transactions up to what amount are completely exempt from MDR?",
        options: ["₹1,000", "₹2,000", "₹5,000", "₹10,000"],
        optionsEn: ["₹1,000", "₹2,000", "₹5,000", "₹10,000"],
        correctIndex: 1,
        explanation: "नए नियम के अनुसार ₹2,000 तक के P2M (Person to Merchant) भुगतानों पर कोई MDR नहीं लगेगा, जो कुल P2M लेन-देन का लगभग 96% है।",
        explanationEn: "P2M transactions up to ₹2,000 are subject to zero MDR, covering ~96% of total merchant transactions."
      },
      {
        question: "₹2,000 से अधिक के पात्र UPI मर्चेंट लेन-देन पर मर्चेंट डिस्काउंट रेट (MDR) की मानक दर कितनी निर्धारित की गई है?",
        questionEn: "What is the standard Merchant Discount Rate (MDR) fixed for eligible UPI transactions above ₹2,000?",
        options: ["0.04%", "0.40%", "1.00%", "2.00%"],
        optionsEn: ["0.04%", "0.40%", "1.00%", "2.00%"],
        correctIndex: 1,
        explanation: "₹2,000 से ऊपर की राशि वाले पात्र मर्चेंट भुगतानों पर 0.40% की दर से MDR लागू होगा (उदाहरण: ₹10,000 पर ₹40)।",
        explanationEn: "A standard MDR rate of 0.40% applies to eligible merchant payments over ₹2,000."
      },
      {
        question: "₹75,000 या उससे अधिक के उच्च मूल्य वाले UPI मर्चेंट भुगतान पर MDR शुल्क की अधिकतम सीमा (Maximum Cap) कितनी तय की गई है?",
        questionEn: "What is the maximum capping ceiling for MDR on UPI merchant transactions of ₹75,000 or above?",
        options: ["₹100 प्रति लेन-देन", "₹200 प्रति लेन-देन", "₹300 प्रति लेन-देन", "₹500 प्रति लेन-देन"],
        optionsEn: ["₹100 per transaction", "₹200 per transaction", "₹300 per transaction", "₹500 per transaction"],
        correctIndex: 2,
        explanation: "उच्च मूल्य वाले भुगतानों पर व्यापारियों को राहत देने हेतु MDR की अधिकतम सीमा ₹300 प्रति लेन-देन निर्धारित की गई है।",
        explanationEn: "The MDR fee is capped at a maximum ceiling of ₹300 per transaction for amounts of ₹75,000 or more."
      },
      {
        question: "भारत में खुदरा भुगतान और निपटान प्रणालियों के संचालन हेतु जिम्मेदार प्रमुख संस्था NPCI (National Payments Corporation of India) की स्थापना किस वर्ष हुई थी?",
        questionEn: "In which year was NPCI (National Payments Corporation of India) established to operate retail payment systems in India?",
        options: ["2005", "2008", "2014", "2016"],
        optionsEn: ["2005", "2008", "2014", "2016"],
        correctIndex: 1,
        explanation: "NPCI की स्थापना वर्ष 2008 में भारतीय रिजर्व बैंक (RBI) और भारतीय बैंक संघ (IBA) की संयुक्त पहल के रूप में हुई थी।",
        explanationEn: "NPCI was established in 2008 under the guidance of RBI and Indian Banks' Association (IBA)."
      },
      {
        question: "भारत के बाहर यूनिफाइड पेमेंट्स इंटरफेस (UPI) प्रणाली को अपनाने वाला दुनिया का पहला देश कौन सा बना था?",
        questionEn: "Which country became the first outside India to adopt the Unified Payments Interface (UPI) system?",
        options: ["नेपाल", "भूटान", "सिंगापुर", "मॉरीशस"],
        optionsEn: ["Nepal", "Bhutan", "Singapore", "Mauritius"],
        correctIndex: 0,
        explanation: "नेपाल भारत के बाहर UPI को अपनाने वाला पहला देश बना था, जहाँ भारत-नेपाल के बीच P2P cross-border remittance की सुविधा भी चालू है।",
        explanationEn: "Nepal became the first foreign country to adopt India's UPI ecosystem."
      },
      {
        question: "NPCI द्वारा UPI (Unified Payments Interface) का शुरुआती पायलट (Pilot) किस तिथि को लॉन्च किया गया था?",
        questionEn: "On which date was the initial pilot of UPI (Unified Payments Interface) launched by NPCI?",
        options: ["11 अप्रैल 2016", "15 अगस्त 2016", "8 नवंबर 2016", "1 जनवरी 2017"],
        optionsEn: ["11 April 2016", "15 August 2016", "8 November 2016", "1 January 2017"],
        correctIndex: 0,
        explanation: "UPI का पायलट लॉन्च 11 अप्रैल 2016 को तत्कालीन RBI गवर्नर डॉ. रघुराम राजन द्वारा किया गया था, जबकि आम जन के लिए अगस्त 2016 में सेवा शुरू हुई।",
        explanationEn: "UPI pilot was launched on 11th April 2016 by former RBI Governor Dr. Raghuram Rajan."
      },
      {
        question: "डिजिटल बैंकिंग एवं UPI लेन-देन के संदर्भ में 'P2M' का पूरा नाम (Full Form) क्या है?",
        questionEn: "In the context of digital banking and UPI transactions, what is the full form of 'P2M'?",
        options: ["Person to Merchant", "Payment to Merchant", "Public to Market", "Peer to Management"],
        optionsEn: ["Person to Merchant", "Payment to Merchant", "Public to Market", "Peer to Management"],
        correctIndex: 0,
        explanation: "P2M का अर्थ Person to Merchant (व्यक्ति से व्यापारी/दुकानदार को किया गया भुगतान) होता है।",
        explanationEn: "P2M stands for Person to Merchant transaction."
      },
      {
        question: "NPCI के नए फ्रेमवर्क के अनुसार, UPI पर नया मर्चेंट डिस्काउंट रेट (MDR) नियम किस तिथि से लागू होगा?",
        questionEn: "According to NPCI, from which date will the updated UPI MDR Framework come into effect?",
        options: ["1 अक्टूबर 2026", "15 अक्टूबर 2026", "1 नवंबर 2026", "1 दिसंबर 2026"],
        optionsEn: ["1 October 2026", "15 October 2026", "1 November 2026", "1 December 2026"],
        correctIndex: 1,
        explanation: "NPCI द्वारा घोषित नया UPI MDR नियम 15 अक्टूबर 2026 से प्रभावी रूप से लागू होगा।",
        explanationEn: "The updated UPI MDR Framework will take effect on October 15, 2026."
      }
    ],

    /* ─── FAQS (Rich Snippet Google PAA Coverage) ───────────── */
    faqs: [
      {
        question: "यूपीआई (UPI) का मालिक कौन है और यह किस देश का है?",
        questionEn: "Who owns UPI and which country does it belong to?",
        answer: "UPI का मालिक और संचालनकर्ता NPCI (National Payments Corporation of India) है, जो कि भारत (India) की एक गैर-लाभकारी छत्र संस्था है। यह भारतीय रिज़र्व बैंक (RBI) और भारतीय बैंक संघ (IBA) के मार्गदर्शन में कार्य करती है।",
        answerEn: "UPI is owned and operated by National Payments Corporation of India (NPCI), an Indian non-profit umbrella organization regulated by RBI and IBA."
      },
      {
        question: "भारत का पहला यूपीआई ऐप कौन सा है और UPI कब लॉन्च हुआ था?",
        questionEn: "Which is India's first official UPI app and when was UPI launched?",
        answer: "भारत का पहला आधिकारिक राष्ट्रीय UPI ऐप BHIM (Bharat Interface for Money) है, जिसे 30 दिसंबर 2016 को लॉन्च किया गया था। UPI का पायलट 11 अप्रैल 2016 को और सार्वजनिक उपयोग अगस्त 2016 में चालू हुआ।",
        answerEn: "India's first official national UPI app is BHIM, launched on Dec 30, 2016. UPI pilot began on April 11, 2016 and public rollout started in August 2016."
      },
      {
        question: "किन 7 देशों में यूपीआई (UPI) स्वीकार्य है?",
        questionEn: "Which 7 countries support international UPI acceptance?",
        answer: "नेपाल, भूटान, सिंगापुर, फ्रांस, मॉरीशस, श्रीलंका और संयुक्त अरब अमीरात (UAE) में UPI सेवाएं और मर्चेंट भुगतान उपलब्ध हैं। नेपाल पहला अंतरराष्ट्रीय देश था।",
        answerEn: "UPI operates in Nepal, Bhutan, Singapore, France, Mauritius, Sri Lanka, and the UAE. Nepal was the first foreign nation to adopt UPI."
      },
      {
        question: "मर्चेंट डिस्काउंट रेट (MDR) क्यों लागू किया जा रहा है?",
        questionEn: "Why is Merchant Discount Rate (MDR) being implemented on UPI?",
        answer: "UPI हर महीने अरबों लेन-देन संभालता है। प्राप्त MDR राशि केवल UPI इकोसिस्टम में ही वितरित की जाएगी, ताकि बैंकिंग व डिजिटल इंफ्रास्ट्रक्चर की मजबूती, फिनटेक नवाचार, साइबर सुरक्षा और ग्राहक सेवा में निवेश किया जा सके।",
        answerEn: "MDR revenue is distributed within the UPI ecosystem to fund cloud infrastructure, cybersecurity, 24x7 server stability, and fintech innovation."
      },
      {
        question: "क्या कम राशि के यूपीआई लेनदेन प्रभावित होंगे?",
        questionEn: "Will small value UPI transactions be affected?",
        answer: "नहीं, ₹2,000 तक के कम राशि के UPI लेन-देन पर कोई प्रभाव नहीं पड़ेगा। 96% से अधिक P2M लेन-देन पूरी तरह से मुफ्त रहेंगे।",
        answerEn: "No, transactions up to ₹2,000 carry zero MDR, ensuring ~96% of everyday merchant payments stay completely free."
      },
      {
        question: "दोस्तों या रिश्तेदारों को पैसे भेजने (P2P) पर कितना चार्ज लगेगा?",
        questionEn: "What charges apply when sending money to friends or relatives (P2P)?",
        answer: "एक व्यक्ति से दूसरे व्यक्ति को किए जाने वाले P2P (Person to Person) पेमेंट पर किसी तरह का चार्ज नहीं लगाया गया है। यह 100% फ्री है।",
        answerEn: "Zero charges apply to Person-to-Person (P2P) money transfers between friends or family."
      },
      {
        question: "किस-किस को एक्स्ट्रा चार्ज देना होगा?",
        questionEn: "Who has to pay the extra MDR charge?",
        answer: "MDR केवल मर्चेंट (दुकानदार या व्यापारी) द्वारा ₹2,000 से अधिक के P2M भुगतानों पर देय होगा। आम ग्राहकों से कोई अतिरिक्त शुल्क नहीं लिया जाएगा।",
        answerEn: "MDR is payable solely by merchants for eligible P2M payments exceeding ₹2,000. Consumers pay nothing extra."
      },
      {
        question: "MDR क्या होता है और यह किससे लिया जाता है?",
        questionEn: "What is MDR and who is it collected from?",
        answer: "MDR (Merchant Discount Rate) डिजिटल भुगतान स्वीकार करने की सुविधा के बदले व्यापारी या दुकानदार से लिया जाने वाला सर्विस चार्ज है।",
        answerEn: "MDR is a service processing fee charged to merchants for accepting digital payment options."
      },
      {
        question: "किन लोगों पर MDR का सीधा असर पड़ेगा?",
        questionEn: "Who will be directly impacted by the MDR rule?",
        answer: "MDR मर्चेंट से जुड़ा शुल्क है, इसलिए इसका असर बड़े दुकानदारों और व्यावसायिक प्रतिष्ठानों की पेमेंट लागत पर पड़ेगा। आम नागरिक इससे अप्रभावित हैं।",
        answerEn: "It impacts the payment processing cost of commercial merchants receiving payments over ₹2,000. Individual users are unaffected."
      },
      {
        question: "अधिकतम ₹300 की सीमा कैसे तय होगी?",
        questionEn: "How is the maximum capping of ₹300 calculated?",
        answer: "₹2,000 से ऊपर के भुगतान पर 0.40% चार्ज लागू होगा, जो अधिकतम ₹300 तक ही होगा। जैसे ₹1 लाख के भुगतान पर 0.40% (₹400) के बजाय सिर्फ ₹300 ही चार्ज लगेगा।",
        answerEn: "Though a 0.40% rate applies above ₹2,000, the fee is capped at ₹300 per transaction. For instance, a ₹1 Lakh payment incurs only ₹300 instead of ₹400."
      },
      {
        question: "ऑनलाइन शॉपिंग पर कितना चार्ज लगेगा?",
        questionEn: "What charges apply to online shopping transactions?",
        answer: "पर्सन टू पर्सन और सामान्य ऑनलाइन ई-कॉमर्स खरीद पर उपभोक्ता को कोई अतिरिक्त शुल्क नहीं देना होगा।",
        answerEn: "No extra charges apply to individual consumers making routine online shopping purchases."
      },
      {
        question: "RuPay क्रेडिट कार्ड द्वारा UPI भुगतान पर क्या MDR नियम है?",
        questionEn: "What are the MDR rules for RuPay Credit Card UPI transactions?",
        answer: "RuPay Credit Card से UPI मर्चेंट भुगतान पर ₹2,000 तक 0% MDR तथा ₹2,000 से ऊपर के लेन-देन पर 0.40% मानक मर्चेंट शुल्क लागू होता है।",
        answerEn: "RuPay Credit Card UPI merchant payments carry 0% MDR up to ₹2,000 and standard 0.40% MDR above ₹2,000."
      }
    ],

    /* ─── Sources ────────────────────────────────────────────── */
    sources: [
      { label: "National Payments Corporation of India (NPCI Press Releases)", url: "https://www.npci.org.in" },
      { label: "Reserve Bank of India (RBI Payment Systems Data)", url: "https://www.rbi.org.in" },
      { label: "Ministry of Finance (Digital Payments Dashboard)", url: "https://finmin.nic.in" }
    ]
  };

  try {
    await client.createOrReplace(article);
    console.log("✨ Successfully uploaded SEO-Optimized UPI MDR 2026 Article to Sanity CMS!");
  } catch (err) {
    console.error("❌ Failed to create/replace document in Sanity:", err);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("❌ Error running script:", err);
  process.exit(1);
});
