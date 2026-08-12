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
  console.log("🚀 Starting upload process for Taxation and Other Laws (Amendment) Bill 2026...");

  // Image file paths in public/images/blog/
  const imagePaths = {
    parliament: path.resolve(process.cwd(), "public/images/blog/taxation-bill-parliament-2026.png"),
    diamondElectronics: path.resolve(process.cwd(), "public/images/blog/foreign-investment-diamond-electronics.png"),
    reitDataCenter: path.resolve(process.cwd(), "public/images/blog/reit-invit-datacenter-india-2026.png"),
  };

  // Check if files exist
  if (!fs.existsSync(imagePaths.parliament) || !fs.existsSync(imagePaths.diamondElectronics) || !fs.existsSync(imagePaths.reitDataCenter)) {
    console.error("❌ Required images not found in public/images/blog/");
    process.exit(1);
  }

  // 1. Upload Parliament Image
  console.log("📸 Uploading Parliament image...");
  const assetParliament = await client.assets.upload("image", fs.createReadStream(imagePaths.parliament), {
    filename: "taxation_bill_parliament_2026.png",
  });
  console.log(`✔ Uploaded parliament image. Asset ID: ${assetParliament._id}`);

  // 2. Upload Diamond & Electronics Image
  console.log("📸 Uploading Diamond & Electronics image...");
  const assetDiamondElectronics = await client.assets.upload("image", fs.createReadStream(imagePaths.diamondElectronics), {
    filename: "foreign_investment_diamond_electronics.png",
  });
  console.log(`✔ Uploaded diamond electronics image. Asset ID: ${assetDiamondElectronics._id}`);

  // 3. Upload REIT & Data Center Image
  console.log("📸 Uploading REIT & Data Center image...");
  const assetReitDataCenter = await client.assets.upload("image", fs.createReadStream(imagePaths.reitDataCenter), {
    filename: "reit_invit_datacenter_india_2026.png",
  });
  console.log(`✔ Uploaded REIT data center image. Asset ID: ${assetReitDataCenter._id}`);

  const articleSlug = "taxation-and-other-laws-amendment-bill-2026-mppsc-notes";

  // Construct Document Object for Current Affairs
  const caArticle = {
    _id: "ca-taxation-and-other-laws-amendment-bill-2026",
    _type: "currentAffairs",
    slug: { _type: "slug", current: articleSlug },
    title: "कराधान एवं अन्य विधियाँ (संशोधन) विधेयक, 2026 (Taxation & Other Laws Amendment Bill 2026): मुख्य प्रावधान, कर छूट एवं प्रभाव | MPPSC & UPSC Notes",
    titleEn: "Taxation and Other Laws (Amendment) Bill, 2026: Key Provisions, Tax Exemptions & MPPSC / UPSC Notes PDF",
    excerpt: "संसद से पारित कराधान एवं अन्य विधियाँ (संशोधन) विधेयक, 2026 का संपूर्ण विश्लेषण। वित्त मंत्रालय, आयकर अधिनियम 2025 संशोधन, सरकारी प्रतिभूतियों में FII कर छूट, हीरा उद्योग (2026-2041), इलेक्ट्रॉनिक्स विनिर्माण, फंड नियम छूट, REIT/InvIT SPV अधिभार (10% से 25%) तथा डेटा सेंटर प्रावधान। MPPSC (पेपर-2: अर्थव्यवस्था) एवं UPSC नोट्स।",
    excerptEn: "Detailed analysis of Taxation and Other Laws (Amendment) Bill, 2026 passed by Parliament. Key tax exemptions for foreign investment in G-Secs, rough diamond trade (2026-2041), electronics bonded warehouses, India-managed investment funds, REIT/InvIT SPV surcharge hike (10% to 25%), and Data Centers for MPPSC & UPSC.",
    ca_date: "2026-08-12",
    publishedAt: new Date().toISOString(),
    featured: true,
    readingTime: 8,
    keywords: [
      "Taxation and Other Laws Amendment Bill 2026",
      "कराधान एवं अन्य विधियाँ संशोधन विधेयक 2026",
      "Ministry of Finance",
      "Income Tax Act 2025",
      "Finance Act 2026",
      "Payment and Settlement Systems Act 2007",
      "Foreign Institutional Investor FII",
      "Bank for International Settlements BIS",
      "Government Securities G-Secs Tax Exemption",
      "Diamond Industry Tax Relief",
      "Electronics Manufacturing Bonded Warehouse",
      "Foreign Investment Funds India Managed",
      "REIT InvIT SPV Surcharge 25 percent",
      "Data Center Tax Exemptions India",
      "MPPSC Economy Notes",
      "UPSC Indian Economy"
    ],
    category: { _type: "reference", _ref: "cat-economy" }, // Subject-wise: Economy
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
      asset: { _type: "reference", _ref: assetParliament._id },
      alt: "Indian Parliament Sansad Bhavan with financial dashboard overlay for Taxation and Other Laws Amendment Bill 2026",
    },

    /* ─── SECTIONS ──────────────────────────────────────────────── */
    sections: [
      /* ── 1. Why in News / Context ────────────────────────────── */
      {
        _key: "sec-why-important",
        kind: "whyInNews",
        title: "परीक्षा में क्यों महत्वपूर्ण? (Why is it Important in Exams?)",
        titleEn: "Why is it Important in Exams?",
        body: [
          {
            _key: "b1-1", _type: "block", style: "normal",
            children: [{ _key: "s1-1", _type: "span", text: "संसद द्वारा **कराधान एवं अन्य विधियाँ (संशोधन) विधेयक, 2026 (Taxation and Other Laws Amendment Bill, 2026)** पारित किया गया है। लोक सेवा आयोग (MPPSC राज्य सेवा परीक्षा एवं UPSC Civil Services Examination) के **सामान्य अध्ययन पेपर-2 (भारतीय अर्थव्यवस्था एवं कराधान प्रणाली / Indian Economy & Taxation)** में प्रत्यक्ष एवं अप्रत्यक्ष कर सुधारों, विदेशी संस्थागत निवेश (FII), कॉर्पोरेट कर छूट, REITs/InvITs तथा इलेक्ट्रॉनिक्स विनिर्माण को दिए जाने वाले प्रोत्साहन से संबंधित प्रश्न अत्यंत महत्वपूर्ण हैं।" }],
          },
        ],
        bodyEn: [
          {
            _key: "b1-2", _type: "block", style: "normal",
            children: [{ _key: "s1-2", _type: "span", text: "The **Taxation and Other Laws (Amendment) Bill, 2026** was passed by Parliament to amend the Income Tax Act 2025, Finance Act 2026, and Payment and Settlement Systems Act 2007. This comprehensive tax reform legislation is vital for MPPSC & UPSC GS Paper-2 (Economy & Taxation)." }],
          },
        ],
      },

      /* ── 2. Legislative Journey & Background ──────────────────── */
      {
        _key: "sec-legislative-journey",
        kind: "background",
        title: "विधेयक का परिचय एवं महत्वपूर्ण विधायी तथ्य",
        titleEn: "Introduction & Key Legislative Timeline of the Bill",
        body: [
          {
            _key: "b2-1", _type: "block", style: "h3",
            children: [{ _key: "s2-1", _type: "span", text: "1. मंत्रालय, पेश होने तथा पारित होने की प्रमुख तिथियाँ" }],
          },
          {
            _key: "b2-2", _type: "block", style: "normal",
            children: [{ _key: "s2-2", _type: "span", text: "• **संबंधित मंत्रालय (Ministry)**: वित्त मंत्रालय (Ministry of Finance, Government of India)" }],
          },
          {
            _key: "b2-3", _type: "block", style: "normal",
            children: [{ _key: "s2-3", _type: "span", text: "• **लोकसभा में प्रस्तुत तिथि (Introduced in Lok Sabha)**: 4 अगस्त 2026" }],
          },
          {
            _key: "b2-4", _type: "block", style: "normal",
            children: [{ _key: "s2-4", _type: "span", text: "• **लोकसभा से पारित तिथि (Passed by Lok Sabha)**: 6 अगस्त 2026" }],
          },
          {
            _key: "b2-5", _type: "block", style: "normal",
            children: [{ _key: "s2-5", _type: "span", text: "• **राज्यसभा से पारित तिथि (Passed by Rajya Sabha)**: 10 अगस्त 2026" }],
          },
          {
            _key: "b2-6", _type: "block", style: "normal",
            children: [{ _key: "s2-6", _type: "span", text: "• **विधेयक का मुख्य उद्देश्य (Primary Objective)**: यह विधेयक **आयकर अधिनियम, 2025 (Income Tax Act, 2025)** में व्यापक संशोधनों के साथ-साथ **वित्त अधिनियम, 2026 (Finance Act, 2026)** और **भुगतान एवं निपटान प्रणाली अधिनियम, 2007 (Payment and Settlement Systems Act, 2007)** में महत्वपूर्ण संरचनात्मक बदलाव करता है।" }],
          },
          {
            _key: "b2-img-1", _type: "image",
            asset: { _type: "reference", _ref: assetParliament._id },
            alt: "Indian Parliament and Finance Ministry financial dashboard for Taxation and Other Laws Amendment Bill 2026",
          },
        ],
        bodyEn: [
          {
            _key: "b2-7", _type: "block", style: "h3",
            children: [{ _key: "s2-7", _type: "span", text: "1. Ministry & Parliamentary Timeline" }],
          },
          {
            _key: "b2-8", _type: "block", style: "normal",
            children: [{ _key: "s2-8", _type: "span", text: "• **Nodal Ministry**: Ministry of Finance, Govt of India" }],
          },
          {
            _key: "b2-9", _type: "block", style: "normal",
            children: [{ _key: "s2-9", _type: "span", text: "• **Introduced in Lok Sabha**: August 4, 2026" }],
          },
          {
            _key: "b2-10", _type: "block", style: "normal",
            children: [{ _key: "s2-10", _type: "span", text: "• **Passed by Lok Sabha**: August 6, 2026" }],
          },
          {
            _key: "b2-11", _type: "block", style: "normal",
            children: [{ _key: "s2-11", _type: "span", text: "• **Passed by Rajya Sabha**: August 10, 2026" }],
          },
          {
            _key: "b2-12", _type: "block", style: "normal",
            children: [{ _key: "s2-12", _type: "span", text: "• **Amended Acts**: Income Tax Act 2025, Finance Act 2026, and Payment and Settlement Systems Act 2007." }],
          },
          {
            _key: "b2-img-1-en", _type: "image",
            asset: { _type: "reference", _ref: assetParliament._id },
            alt: "Indian Parliament and Finance Ministry financial dashboard for Taxation and Other Laws Amendment Bill 2026",
          },
        ],
      },

      /* ── 3. Provisions 1 & 2: Foreign Investment & Diamond Industry ─ */
      {
        _key: "sec-provisions-1-2",
        kind: "keyAspects",
        title: "विधेयक के प्रमुख प्रावधान: विदेशी निवेश एवं हीरा उद्योग कर छूट",
        titleEn: "Key Provisions: G-Sec Foreign Investment & Diamond Industry Tax Exemption",
        body: [
          {
            _key: "b3-1", _type: "block", style: "h3",
            children: [{ _key: "s3-1", _type: "span", text: "2. सरकारी प्रतिभूतियों एवं हीरा उद्योग हेतु कर राहत" }],
          },
          {
            _key: "b3-2", _type: "block", style: "normal",
            children: [{ _key: "s3-2", _type: "span", text: "• **1. सरकारी प्रतिभूतियों में विदेशी निवेश (Foreign Investment in G-Secs)**: कुछ निर्दिष्ट विदेशी निवेशकों को भारत की सरकारी प्रतिभूतियों (Government Securities) से होने वाली आय पर **आयकर छूट (Income Tax Exemption)** प्रदान करने का प्रावधान किया गया है।" }],
          },
          {
            _key: "b3-3", _type: "block", style: "normal",
            children: [{ _key: "s3-3", _type: "span", text: "  - **कर छूट के दायरे में शामिल आय**: सरकारी प्रतिभूतियों से प्राप्त **ब्याज (Interest Income)** तथा उनकी बिक्री, विनिमय या हस्तांतरण से होने वाला **पूंजीगत लाभ (Capital Gains)**।" }],
          },
          {
            _key: "b3-4", _type: "block", style: "normal",
            children: [{ _key: "s3-4", _type: "span", text: "  - **लागू होने की तिथि**: यह छूट **1 अप्रैल 2026** या उसके बाद अर्जित आय पर प्रभावी होगी।" }],
          },
          {
            _key: "b3-5", _type: "block", style: "normal",
            children: [{ _key: "s3-5", _type: "span", text: "  - **प्रमुख संस्थाएं**: **FII** (Foreign Institutional Investor - विदेशी संस्थागत निवेशक) एवं **BIS** (Bank for International Settlements - बैंक फॉर इंटरनेशनल सेटलमेंट्स)।" }],
          },
          {
            _key: "b3-6", _type: "block", style: "normal",
            children: [{ _key: "s3-6", _type: "span", text: "• **2. हीरा उद्योग को कर छूट (Tax Exemption to Diamond Industry)**: अधिसूचित विशेष क्षेत्र (Notified Special Notified Zones - SNZ) में कच्चे हीरों (Raw / Rough Diamonds) की बिक्री से होने वाली आय पर कुछ विदेशी कंपनियों को कर छूट देने का प्रावधान है।" }],
          },
          {
            _key: "b3-7", _type: "block", style: "normal",
            children: [{ _key: "s3-7", _type: "span", text: "  - **लाभार्थी इकाइयाँ**: इसमें हीरा खनन कंपनियां (Diamond Mining Companies) तथा उनसे संबंधित दलाल (Brokers), एग्रीगेटर (Aggregators) और निविदा/नीलामी इकाइयाँ (Tender/Auction Entities) शामिल हैं।" }],
          },
          {
            _key: "b3-8", _type: "block", style: "normal",
            children: [{ _key: "s3-8", _type: "span", text: "  - **छूट की कार्यावधि**: यह प्रावधान **1 अक्टूबर 2026 से 31 मार्च 2041** तक प्रभावी रहेगा।" }],
          },
          {
            _key: "b3-img-2", _type: "image",
            asset: { _type: "reference", _ref: assetDiamondElectronics._id },
            alt: "Illustration of uncut diamonds, semiconductor microchips and Indian Government bond certificates representing tax incentives",
          },
        ],
        bodyEn: [
          {
            _key: "b3-9", _type: "block", style: "h3",
            children: [{ _key: "s3-9", _type: "span", text: "2. Relief for Foreign Investors & Diamond Sector" }],
          },
          {
            _key: "b3-10", _type: "block", style: "normal",
            children: [{ _key: "s3-10", _type: "span", text: "• **1. Foreign Investment in Government Securities**: Full tax exemption provided on interest income and capital gains (sale, exchange, or transfer) derived from G-Secs by notified foreign entities like **FIIs** and the **Bank for International Settlements (BIS)**, effective April 1, 2026." }],
          },
          {
            _key: "b3-11", _type: "block", style: "normal",
            children: [{ _key: "s3-11", _type: "span", text: "• **2. Tax Exemption for Diamond Industry**: Exemption granted on income from sales of rough diamonds in Notified Special Zones for foreign diamond mining firms, brokers, aggregators, and tender/auction entities from **October 1, 2026 to March 31, 2041**." }],
          },
          {
            _key: "b3-img-2-en", _type: "image",
            asset: { _type: "reference", _ref: assetDiamondElectronics._id },
            alt: "Illustration of uncut diamonds, semiconductor microchips and Indian Government bond certificates representing tax incentives",
          },
        ],
      },

      /* ── 4. Provisions 3 & 4: Electronics & Foreign Investment Funds ─ */
      {
        _key: "sec-provisions-3-4",
        kind: "keyAspects",
        title: "विधेयक के प्रमुख प्रावधान: इलेक्ट्रॉनिक्स विनिर्माण तथा विदेशी निवेश फंड नियम",
        titleEn: "Key Provisions: Electronics Manufacturing & Offshore Fund Regulation",
        body: [
          {
            _key: "b4-1", _type: "block", style: "h3",
            children: [{ _key: "s4-1", _type: "span", text: "3. इलेक्ट्रॉनिक्स विनिर्माण संवर्धन एवं विदेशी फंडों की सरलीकरण शर्तें" }],
          },
          {
            _key: "b4-2", _type: "block", style: "normal",
            children: [{ _key: "s4-2", _type: "span", text: "• **3. इलेक्ट्रॉनिक्स विनिर्माण को बढ़ावा (Boosting Electronics Manufacturing)**: सीमा शुल्क बंधित क्षेत्र (Customs Bonded Area) में इलेक्ट्रॉनिक घटकों (Electronic Components) के भंडारण से होने वाली आय पर कुछ विदेशी कंपनियों को कर छूट प्रदान की गई है।" }],
          },
          {
            _key: "b4-3", _type: "block", style: "normal",
            children: [{ _key: "s4-3", _type: "span", text: "  - **शामिल उत्पाद**: स्मार्टफोन, लैपटॉप, सर्वर और तैयार माल के उप-असेंबली (Sub-assemblies)।" }],
          },
          {
            _key: "b4-4", _type: "block", style: "normal",
            children: [{ _key: "s4-4", _type: "span", text: "  - **समय सीमा विस्तार**: पूंजीगत वस्तुओं (Capital Goods), उपकरणों एवं औजारों की आपूर्ति से संबंधित कर छूट की समय सीमा **2030-31 से बढ़ाकर 2040-41** (10 वर्ष का विस्तार) कर दी गई है।" }],
          },
          {
            _key: "b4-5", _type: "block", style: "normal",
            children: [{ _key: "s4-5", _type: "span", text: "• **4. भारत से प्रबंधित विदेशी निवेश फंड (Foreign Investment Funds Managed from India)**: भारत के बाहर पंजीकृत लेकिन भारत से प्रबंधित पात्र निवेश फंडों (Eligible Offshore Funds) के लिए कुछ जटिल और कड़े नियमों को समाप्त करने का प्रस्ताव है।" }],
          },
          {
            _key: "b4-6", _type: "block", style: "normal",
            children: [{ _key: "s4-6", _type: "span", text: "  - **हटाई जाने वाली 4 प्रमुख शर्तें (4 Criteria Removed)**:" }],
          },
          {
            _key: "b4-7", _type: "block", style: "normal",
            children: [{ _key: "s4-7", _type: "span", text: "    1. न्यूनतम 25 सदस्यों की अनिवार्यता हटाना" }],
          },
          {
            _key: "b4-8", _type: "block", style: "normal",
            children: [{ _key: "s4-8", _type: "span", text: "    2. एक निवेशक की अधिकतम 10% हिस्सेदारी की सीमा हटाना" }],
          },
          {
            _key: "b4-9", _type: "block", style: "normal",
            children: [{ _key: "s4-9", _type: "span", text: "    3. न्यूनतम ₹100 करोड़ के मासिक औसत कोष (Monthly Average Corpus) की शर्त समाप्त करना" }],
          },
          {
            _key: "b4-10", _type: "block", style: "normal",
            children: [{ _key: "s4-10", _type: "span", text: "    4. किसी एक इकाई में 25% से अधिक निवेश पर रोक की बाध्यता हटाना" }],
          },
        ],
        bodyEn: [
          {
            _key: "b4-11", _type: "block", style: "h3",
            children: [{ _key: "s4-11", _type: "span", text: "3. Electronics Supply Chains & Relaxation for Investment Funds" }],
          },
          {
            _key: "b4-12", _type: "block", style: "normal",
            children: [{ _key: "s4-12", _type: "span", text: "• **3. Electronics Manufacturing Boost**: Income tax exemption for foreign companies storing electronic components (phones, laptops, servers, sub-assemblies) in Customs Bonded Areas. Tax relief for capital goods and tooling supplies extended from **2030-31 to 2040-41**." }],
          },
          {
            _key: "b4-13", _type: "block", style: "normal",
            children: [{ _key: "s4-13", _type: "span", text: "• **4. India-Managed Offshore Funds**: Removed four restrictive criteria for eligible offshore investment funds managed from India: minimum 25 members, 10% single investor holding cap, ₹100 Crore monthly average corpus requirement, and 25% entity investment cap." }],
          },
        ],
      },

      /* ── 5. Provisions 5 & 6: REIT/InvIT & Data Center Sector ──── */
      {
        _key: "sec-provisions-5-6",
        kind: "keyAspects",
        title: "विधेयक के प्रमुख प्रावधान: REIT, InvIT एवं डेटा सेंटर क्षेत्र",
        titleEn: "Key Provisions: REIT, InvIT & Data Center Sector Reforms",
        body: [
          {
            _key: "b5-1", _type: "block", style: "h3",
            children: [{ _key: "s5-1", _type: "span", text: "4. रियल एस्टेट, बुनियादी ढांचा और डेटा सेंटरों हेतु कर नीतियाँ" }],
          },
          {
            _key: "b5-2", _type: "block", style: "normal",
            children: [{ _key: "s5-2", _type: "span", text: "• **5. REIT एवं InvIT से संबंधित बदलाव**: " }],
          },
          {
            _key: "b5-3", _type: "block", style: "normal",
            children: [{ _key: "s5-3", _type: "span", text: "  - **REIT**: Real Estate Investment Trust (रियल एस्टेट इन्वेस्टमेन्ट ट्रस्ट)" }],
          },
          {
            _key: "b5-4", _type: "block", style: "normal",
            children: [{ _key: "s5-4", _type: "span", text: "  - **InvIT**: Infrastructure Investment Trust (इन्फ्रास्ट्रक्चर इन्वेस्टमेन्ट ट्रस्ट)" }],
          },
          {
            _key: "b5-5", _type: "block", style: "normal",
            children: [{ _key: "s5-5", _type: "span", text: "  - **अधिभार दर (Surcharge Rate) में वृद्धि**: व्यावसायिक ट्रस्ट (Business Trusts) के Special Purpose Vehicle (SPV) के लिए अधिभार दर को **10% से बढ़ाकर 25%** करने का प्रावधान।" }],
          },
          {
            _key: "b5-6", _type: "block", style: "normal",
            children: [{ _key: "s5-6", _type: "span", text: "  - **लाभांश छूट (Dividend Relief)**: SPV से यूनिट धारकों (Unitholders) को प्राप्त कुछ विशिष्ट लाभांश आय को कर छूट प्रदान करने का प्रस्ताव।" }],
          },
          {
            _key: "b5-7", _type: "block", style: "normal",
            children: [{ _key: "s5-7", _type: "span", text: "• **6. डेटा सेंटर क्षेत्र (Data Center Sector)**: विदेशी कंपनियों को डेटा सेंटर सेवाओं से होने वाली आय पर कर छूट के लिए कड़े प्रतिबंधों और शर्तों को हटाया गया है।" }],
          },
          {
            _key: "b5-8", _type: "block", style: "normal",
            children: [{ _key: "s5-8", _type: "span", text: "  - **विस्तार**: यह कर छूट भारतीय कंपनी द्वारा पट्टे (Leased) पर लिए गए और संचालित किए जा रहे डेटा सेंटरों तक भी विस्तारित की जाएगी।" }],
          },
          {
            _key: "b5-img-3", _type: "image",
            asset: { _type: "reference", _ref: assetReitDataCenter._id },
            alt: "Futuristic illustration showing REIT office buildings, InvIT highways, and Data Centers in India",
          },
        ],
        bodyEn: [
          {
            _key: "b5-9", _type: "block", style: "h3",
            children: [{ _key: "s5-9", _type: "span", text: "4. Real Estate, Infrastructure & Digital Data Infrastructure" }],
          },
          {
            _key: "b5-10", _type: "block", style: "normal",
            children: [{ _key: "s5-10", _type: "span", text: "• **5. REIT & InvIT Reforms**: Increased the surcharge rate for Special Purpose Vehicles (SPVs) of Business Trusts (REITs & InvITs) from **10% to 25%**, while proposing tax exemptions on certain dividends distributed by SPVs to unitholders." }],
          },
          {
            _key: "b5-11", _type: "block", style: "normal",
            children: [{ _key: "s5-11", _type: "span", text: "• **6. Data Center Incentive Expansion**: Relaxed income tax conditions for foreign entities rendering data center services in India, extending tax relief to data centers leased and operated by Indian companies." }],
          },
          {
            _key: "b5-img-3-en", _type: "image",
            asset: { _type: "reference", _ref: assetReitDataCenter._id },
            alt: "Futuristic illustration showing REIT office buildings, InvIT highways, and Data Centers in India",
          },
        ],
      },

      /* ── 6. Memory Trick & Quick Summary Table ──────────────── */
      {
        _key: "sec-mppsc-quick-facts",
        kind: "mppscNotes",
        title: "परीक्षा में ऐसे याद रखें (MPPSC & UPSC Memory Formula)",
        titleEn: "Memory Formula for MPPSC & UPSC Exams",
        body: [
          {
            _key: "b6-1", _type: "block", style: "h3",
            children: [{ _key: "s6-1", _type: "span", text: "5. त्वरित स्मरण सूत्र एवं वन-लाइनर तथ्य" }],
          },
          {
            _key: "b6-2", _type: "block", style: "normal",
            children: [
              { _key: "s6-2a", _type: "span", text: "• **परीक्षा स्मरण सूत्र**: " },
              { _key: "s6-2b", _type: "span", marks: ["strong"], text: "2026 कराधान संशोधन = विदेशी निवेश + हीरा + इलेक्ट्रॉनिक्स + निवेश फंड + REIT/InvIT + डेटा सेंटर" }
            ]
          },
          {
            _key: "b6-3", _type: "block", style: "normal",
            children: [{ _key: "s6-3", _type: "span", text: "• **नोडल मंत्रालय**: वित्त मंत्रालय" }]
          },
          {
            _key: "b6-4", _type: "block", style: "normal",
            children: [{ _key: "s6-4", _type: "span", text: "• **संशोधित मुख्य कानून**: आयकर अधिनियम 2025, वित्त अधिनियम 2026, भुगतान एवं निपटान प्रणाली अधिनियम 2007" }]
          },
          {
            _key: "b6-5", _type: "block", style: "normal",
            children: [{ _key: "s6-5", _type: "span", text: "• **हीरा उद्योग कर छूट अवधि**: 1 अक्टूबर 2026 से 31 मार्च 2041" }]
          },
          {
            _key: "b6-6", _type: "block", style: "normal",
            children: [{ _key: "s6-6", _type: "span", text: "• **इलेक्ट्रॉनिक्स पूंजीगत वस्तु छूट सीमा**: 2040-41 तक विस्तारित" }]
          },
          {
            _key: "b6-7", _type: "block", style: "normal",
            children: [{ _key: "s6-7", _type: "span", text: "• **SPV अधिभार वृद्धि**: 10% से बढ़ाकर 25%" }]
          },
        ],
        bodyEn: [
          {
            _key: "b6-8", _type: "block", style: "h3",
            children: [{ _key: "s6-8", _type: "span", text: "5. Fast Revision Summary & Memory Trick" }],
          },
          {
            _key: "b6-9", _type: "block", style: "normal",
            children: [
              { _key: "s6-9a", _type: "span", text: "• **Memory Trick**: " },
              { _key: "s6-9b", _type: "span", marks: ["strong"], text: "Taxation Amendment 2026 = Foreign Investment + Diamond + Electronics + Funds + REIT/InvIT + Data Center" }
            ]
          },
          {
            _key: "b6-10", _type: "block", style: "normal",
            children: [{ _key: "s6-10", _type: "span", text: "• **Ministry**: Ministry of Finance" }]
          },
          {
            _key: "b6-11", _type: "block", style: "normal",
            children: [{ _key: "s6-11", _type: "span", text: "• **SPV Surcharge Rate**: Increased from 10% to 25%" }]
          },
          {
            _key: "b6-12", _type: "block", style: "normal",
            children: [{ _key: "s6-12", _type: "span", text: "• **Diamond Exemption Tenure**: Oct 1, 2026 to Mar 31, 2041" }]
          },
        ],
      },
    ],

    /* ─── MCQs (EXACTLY 8 HIGH QUALITY MCQs FOR CURRENT AFFAIRS) ── */
    mcqs: [
      {
        question: "कराधान एवं अन्य विधियाँ (संशोधन) विधेयक, 2026 का संबंध मुख्य रूप से किस मंत्रालय से है?",
        questionEn: "Which Ministry is primarily associated with the Taxation and Other Laws (Amendment) Bill, 2026?",
        options: ["वाणिज्य एवं उद्योग मंत्रालय", "वित्त मंत्रालय", "इलेक्ट्रॉनिक्स एवं सूचना प्रौद्योगिकी मंत्रालय", "कॉर्पोरेट कार्य मंत्रालय"],
        optionsEn: ["Ministry of Commerce and Industry", "Ministry of Finance", "Ministry of Electronics and Information Technology", "Ministry of Corporate Affairs"],
        correctIndex: 1,
        explanation: "कराधान एवं अन्य विधियाँ (संशोधन) विधेयक, 2026 का संबंध वित्त मंत्रालय (Ministry of Finance) से है। इसे 4 अगस्त 2026 को लोकसभा में प्रस्तुत किया गया था।",
        explanationEn: "The Taxation and Other Laws (Amendment) Bill, 2026 is governed by the Ministry of Finance and was introduced in Lok Sabha on August 4, 2026."
      },
      {
        question: "कराधान एवं अन्य विधियाँ (संशोधन) विधेयक, 2026 द्वारा निम्नलिखित में से किस अधिनियम में संशोधन नहीं किया गया है?",
        questionEn: "Which of the following Acts is NOT amended by the Taxation and Other Laws (Amendment) Bill, 2026?",
        options: ["आयकर अधिनियम, 2025", "वित्त अधिनियम, 2026", "भुगतान एवं निपटान प्रणाली अधिनियम, 2007", "कंपनी अधिनियम, 2013"],
        optionsEn: ["Income Tax Act, 2025", "Finance Act, 2026", "Payment and Settlement Systems Act, 2007", "Companies Act, 2013"],
        correctIndex: 3,
        explanation: "यह विधेयक आयकर अधिनियम 2025, वित्त अधिनियम 2026 तथा भुगतान एवं निपटान प्रणाली अधिनियम 2007 में संशोधन करता है। कंपनी अधिनियम 2013 इसमें शामिल नहीं है।",
        explanationEn: "The bill amends the Income Tax Act 2025, Finance Act 2026, and Payment and Settlement Systems Act 2007, but not the Companies Act 2013."
      },
      {
        question: "विधेयक के अनुसार, सरकारी प्रतिभूतियों (G-Secs) में विदेशी संस्थागत निवेशकों (FII) को मिलने वाली कर छूट किस तिथि से प्रभावी होगी?",
        questionEn: "According to the bill, from which date will the tax exemption on foreign investment in Government Securities (G-Secs) be applicable?",
        options: ["1 जनवरी 2026", "1 अप्रैल 2026", "1 अक्टूबर 2026", "1 अप्रैल 2027"],
        optionsEn: ["January 1, 2026", "April 1, 2026", "October 1, 2026", "April 1, 2027"],
        correctIndex: 1,
        explanation: "सरकारी प्रतिभूतियों से होने वाले ब्याज एवं पूंजीगत लाभ पर आयकर छूट 1 अप्रैल 2026 या उसके बाद अर्जित आय पर लागू होगी।",
        explanationEn: "Tax exemption on interest and capital gains from G-Secs applies to income earned on or after April 1, 2026."
      },
      {
        question: "अधिसूचित विशेष क्षेत्र में कच्चे हीरों की बिक्री से होने वाली आय पर विदेशी कंपनियों को कर छूट की कार्यावधि क्या निर्धारित की गई है?",
        questionEn: "What is the tenure set for tax exemption granted to foreign entities on rough diamond sales in Notified Special Zones?",
        options: ["1 अप्रैल 2026 से 31 मार्च 2031", "1 अक्टूबर 2026 से 31 मार्च 2041", "1 जनवरी 2026 से 31 दिसंबर 2035", "1 अगस्त 2026 से 31 मार्च 2030"],
        optionsEn: ["April 1, 2026 to March 31, 2031", "October 1, 2026 to March 31, 2041", "January 1, 2026 to December 31, 2035", "August 1, 2026 to March 31, 2030"],
        correctIndex: 1,
        explanation: "हीरा उद्योग (कच्चे हीरों की बिक्री) के लिए कर छूट का प्रावधान 1 अक्टूबर 2026 से 31 मार्च 2041 (15 वर्ष) तक उपलब्ध रहेगा।",
        explanationEn: "Tax exemption for the diamond sector in special notified zones is provided from October 1, 2026 to March 31, 2041."
      },
      {
        question: "इलेक्ट्रॉनिक्स विनिर्माण को बढ़ावा देने हेतु पूंजीगत वस्तुओं की आपूर्ति से संबंधित कर छूट की समय सीमा को किस वर्ष तक बढ़ाया गया है?",
        questionEn: "Until which year has the tax relief deadline for supply of capital goods and tooling for electronics manufacturing been extended?",
        options: ["2030-31", "2035-36", "2040-41", "2050-51"],
        optionsEn: ["2030-31", "2035-36", "2040-41", "2050-51"],
        correctIndex: 2,
        explanation: "इलेक्ट्रॉनिक्स विनिर्माण क्षेत्र हेतु पूंजीगत वस्तुओं और औजारों की आपूर्ति से संबंधित कर छूट की समय सीमा 2030-31 से बढ़ाकर 2040-41 की जा रही है।",
        explanationEn: "The tax relief for supplying capital goods and tools in electronics manufacturing has been extended from 2030-31 to 2040-41."
      },
      {
        question: "व्यावसायिक ट्रस्टों (REITs एवं InvITs) के Special Purpose Vehicle (SPV) के लिए अधिभार दर (Surcharge Rate) को बदलकर कितना कर दिया गया है?",
        questionEn: "What is the revised surcharge rate for Special Purpose Vehicles (SPVs) of Business Trusts (REITs & InvITs)?",
        options: ["5% से बढ़ाकर 15%", "10% से बढ़ाकर 25%", "15% से बढ़ाकर 30%", "20% से बढ़ाकर 37%"],
        optionsEn: ["Increased from 5% to 15%", "Increased from 10% to 25%", "Increased from 15% to 30%", "Increased from 20% to 37%"],
        correctIndex: 1,
        explanation: "कराधान संशोधन विधेयक 2026 द्वारा REIT एवं InvIT के SPV हेतु अधिभार दर (Surcharge Rate) को 10% से बढ़ाकर 25% कर दिया गया है।",
        explanationEn: "The surcharge rate for Special Purpose Vehicles (SPVs) of REITs and InvITs has been raised from 10% to 25%."
      },
      {
        question: "भारत से प्रबंधित पात्र विदेशी निवेश फंडों हेतु हटाई गई शर्तों के संदर्भ में कौन-सा कथन सत्य है?",
        questionEn: "Which of the following statements is TRUE regarding the relaxed criteria for eligible offshore investment funds managed from India?",
        options: ["न्यूनतम 25 सदस्यों की बाध्यता हटाई गई", "एक निवेशक की अधिकतम 10% हिस्सेदारी की सीमा हटाई गई", "न्यूनतम ₹100 करोड़ के मासिक कोष की शर्त हटाई गई", "उपर्युक्त सभी कथन सत्य हैं"],
        optionsEn: ["Minimum 25 members rule removed", "Max 10% single investor holding cap removed", "Minimum ₹100 Crore monthly corpus rule removed", "All of the above are true"],
        correctIndex: 3,
        explanation: "विधेयक में विदेशी निवेश फंडों हेतु चारों कड़े प्रतिबंधों (25 सदस्य, 10% हिस्सेदारी, ₹100 करोड़ फंड, 25% इकाई सीमा) को हटाने का प्रस्ताव किया गया है।",
        explanationEn: "All four stringent criteria (minimum 25 members, 10% single investor cap, ₹100 Cr corpus, and 25% entity limit) have been removed."
      },
      {
        question: "कराधान एवं अन्य विधियाँ (संशोधन) विधेयक, 2026 को राज्यसभा से किस तिथि को पारित किया गया?",
        questionEn: "On which date was the Taxation and Other Laws (Amendment) Bill, 2026 passed by the Rajya Sabha?",
        options: ["4 अगस्त 2026", "6 अगस्त 2026", "10 अगस्त 2026", "15 अगस्त 2026"],
        optionsEn: ["August 4, 2026", "August 6, 2026", "August 10, 2026", "August 15, 2026"],
        correctIndex: 2,
        explanation: "विधेयक को 4 अगस्त 2026 को प्रस्तुत, 6 अगस्त को लोकसभा से पारित तथा 10 अगस्त 2026 को राज्यसभा से पारित किया गया।",
        explanationEn: "The Bill was introduced on Aug 4, 2026, passed by Lok Sabha on Aug 6, 2026, and passed by Rajya Sabha on Aug 10, 2026."
      }
    ],

    /* ─── FAQs ──────────────────────────────────────────────── */
    faqs: [
      {
        question: "कराधान एवं अन्य विधियाँ (संशोधन) विधेयक, 2026 क्या है?",
        questionEn: "What is the Taxation and Other Laws (Amendment) Bill, 2026?",
        answer: "यह वित्त मंत्रालय द्वारा प्रस्तुत एक महत्वपूर्ण कर सुधार विधेयक है, जिसे अगस्त 2026 में संसद द्वारा पारित किया गया। यह आयकर अधिनियम 2025, वित्त अधिनियम 2026 और भुगतान एवं निपटान प्रणाली अधिनियम 2007 में संशोधन करता है।",
        answerEn: "It is a major tax reform legislation passed by Parliament in August 2026 to amend the Income Tax Act 2025, Finance Act 2026, and Payment & Settlement Systems Act 2007."
      },
      {
        question: "विधेयक के 6 प्रमुख स्तंभ कौन-से हैं?",
        questionEn: "What are the 6 key pillars of the Bill?",
        answer: "इसके 6 मुख्य स्तंभ हैं: 1. सरकारी प्रतिभूतियों में FII निवेश कर छूट, 2. हीरा उद्योग (SNZ) कर राहत (2026-2041), 3. इलेक्ट्रॉनिक्स विनिर्माण प्रोत्साहन, 4. भारत से प्रबंधित विदेशी निवेश फंड नियमों का सरलीकरण, 5. REIT/InvIT SPV अधिभार (10% से 25%), और 6. डेटा सेंटर क्षेत्र विस्तार।",
        answerEn: "The 6 key pillars are: G-Sec foreign investment tax relief, Diamond industry tax exemption (2026-2041), Electronics manufacturing boost, Offshore fund rule relaxations, REIT/InvIT SPV surcharge hike (10% to 25%), and Data center tax incentives."
      },
      {
        question: "सरकारी प्रतिभूतियों (G-Secs) में विदेशी निवेशकों को क्या छूट दी गई है?",
        questionEn: "What tax exemption is provided for foreign investors in G-Secs?",
        answer: "FII और BIS जैसे विदेशी निवेशकों को भारत की सरकारी प्रतिभूतियों से प्राप्त ब्याज आय तथा उनके हस्तांतरण/बिक्री से प्राप्त पूंजीगत लाभ (Capital Gains) पर पूर्ण आयकर छूट दी गई है, जो 1 अप्रैल 2026 से प्रभावी होगी।",
        answerEn: "Full tax exemption on interest income and capital gains from G-Secs is granted to foreign institutional investors (FIIs) and BIS, effective April 1, 2026."
      },
      {
        question: "हीरा उद्योग हेतु क्या विशेष कर प्रावधान किए गए हैं?",
        questionEN: "What specific tax provisions are made for the diamond industry?",
        answer: "विशेष अधिसूचित क्षेत्रों (SNZ) में कच्चे हीरों की बिक्री से विदेशी कंपनियों, दलालों, एग्रीगेटरों एवं नीलामी संस्थाओं को होने वाली आय पर 1 अक्टूबर 2026 से 31 मार्च 2041 तक कर छूट दी गई है।",
        answerEn: "Income tax exemption is granted for sales of rough diamonds in Notified Special Zones for foreign mining firms, brokers, and auction entities from Oct 1, 2026 to Mar 31, 2041."
      },
      {
        question: "REIT एवं InvIT के अधिभार (Surcharge) में क्या संशोधन हुआ है?",
        questionEn: "What amendment was made to the REIT & InvIT surcharge?",
        answer: "व्यावसायिक ट्रस्टों के Special Purpose Vehicle (SPV) हेतु अधिभार दर को 10% से बढ़ाकर 25% किया गया है, तथा SPV से मिलने वाले कुछ लाभांश को करमुक्त करने का प्रस्ताव है।",
        answerEn: "The surcharge rate for Special Purpose Vehicles (SPVs) of REITs and InvITs is increased from 10% to 25%, while proposing dividend tax exemptions for unitholders."
      },
      {
        question: "विदेशी निवेश फंडों हेतु कौन-सी 4 शर्तें हटाई गई हैं?",
        questionEn: "Which 4 conditions were removed for offshore investment funds?",
        answer: "1. न्यूनतम 25 सदस्य, 2. एक निवेशक की 10% सीमा, 3. ₹100 करोड़ का मासिक कोष, और 4. एक इकाई में 25% निवेश सीमा—इन चारों प्रतिबंधों को समाप्त कर दिया गया है।",
        answerEn: "The four conditions removed are: min 25 members, max 10% single investor holding, min ₹100 Cr monthly average corpus, and 25% single entity investment cap."
      }
    ],

    /* ─── Sources ────────────────────────────────────────────── */
    sources: [
      { label: "Ministry of Finance, Government of India", url: "https://finmin.nic.in" },
      { label: "PRS Legislative Research - Taxation and Other Laws Bill 2026", url: "https://prsindia.org" },
      { label: "Lok Sabha Secretariat Legislative Bills Archive", url: "https://sansad.in/ls" }
    ]
  };

  // Construct Static GK Document Object as well for cross-indexing
  const gkArticle = {
    ...caArticle,
    _id: "gk-taxation-and-other-laws-amendment-bill-2026",
    _type: "staticGk",
  };

  try {
    console.log("📤 Uploading caArticle to Sanity...");
    await client.createOrReplace(caArticle);
    console.log("✔ Successfully created/replaced ca-taxation-and-other-laws-amendment-bill-2026");

    console.log("📤 Uploading gkArticle to Sanity...");
    await client.createOrReplace(gkArticle);
    console.log("✔ Successfully created/replaced gk-taxation-and-other-laws-amendment-bill-2026");

    console.log("✨ Successfully published Taxation and Other Laws (Amendment) Bill 2026 article in Sanity CMS!");
  } catch (err) {
    console.error("❌ Failed to create/replace document in Sanity:", err);
  }
}

main().catch((err) => {
  console.error("❌ Error running script:", err);
  process.exit(1);
});
