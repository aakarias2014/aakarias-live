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
  console.log("🚀 Starting upload process for Income Tax Day 2026 (आयकर दिवस) Static GK Article...");

  // Source images from public/images/blog/ or fallback to artifact directory
  const publicBlogDir = path.resolve(process.cwd(), "public/images/blog");
  const artifactDir = "/Users/aakariastech/.gemini/antigravity-ide/brain/b98c605b-850a-4c91-a0d8-d4d815df1aa4";

  const destWilson = path.join(publicBlogDir, "income_tax_day_james_wilson_1860.png");
  const destBuilding = path.join(publicBlogDir, "cbdt_income_tax_department_building.png");
  const destDigital = path.join(publicBlogDir, "digital_income_tax_efiling_cpc.png");

  if (!fs.existsSync(destWilson) || !fs.existsSync(destBuilding) || !fs.existsSync(destDigital)) {
    const srcWilson = path.join(artifactDir, "income_tax_day_james_wilson_1860_1784969240093.png");
    const srcBuilding = path.join(artifactDir, "cbdt_income_tax_department_building_1784969253341.png");
    const srcDigital = path.join(artifactDir, "digital_income_tax_efiling_cpc_1784969267113.png");

    if (fs.existsSync(srcWilson) && fs.existsSync(srcBuilding) && fs.existsSync(srcDigital)) {
      if (!fs.existsSync(publicBlogDir)) fs.mkdirSync(publicBlogDir, { recursive: true });
      fs.copyFileSync(srcWilson, destWilson);
      fs.copyFileSync(srcBuilding, destBuilding);
      fs.copyFileSync(srcDigital, destDigital);
    } else {
      console.error("❌ Required images not found!");
      process.exit(1);
    }
  }

  // 1. Upload James Wilson Image
  console.log("📸 Uploading Sir James Wilson 1860 image...");
  const assetWilson = await client.assets.upload("image", fs.createReadStream(destWilson), {
    filename: "income_tax_day_james_wilson_1860.png",
  });
  console.log(`✔ Uploaded James Wilson image. Asset ID: ${assetWilson._id}`);

  // 2. Upload CBDT Building Image
  console.log("📸 Uploading CBDT Building image...");
  const assetBuilding = await client.assets.upload("image", fs.createReadStream(destBuilding), {
    filename: "cbdt_income_tax_department_building.png",
  });
  console.log(`✔ Uploaded CBDT Building image. Asset ID: ${assetBuilding._id}`);

  // 3. Upload Digital E-filing Image
  console.log("📸 Uploading Digital E-filing CPC image...");
  const assetDigital = await client.assets.upload("image", fs.createReadStream(destDigital), {
    filename: "digital_income_tax_efiling_cpc.png",
  });
  console.log(`✔ Uploaded Digital E-filing image. Asset ID: ${assetDigital._id}`);

  // 4. Construct the Article document
  const article = {
    _id: "gk-income-tax-day-2026-in-hindi",
    _type: "staticGk",
    slug: { _type: "slug", current: "income-tax-day-2026-in-hindi-history-cbdt-1961-act" },
    title: "आयकर दिवस 2026 (Income Tax Day): इतिहास, महत्व, CBDT व 166 वर्षों का सफर | MPPSC & UPSC Notes",
    titleEn: "Income Tax Day 2026: History, Sir James Wilson (1860), Income Tax Act 1961, CBDT & Key Facts | MPPSC & UPSC",
    excerpt: "भारत में प्रतिवर्ष 24 जुलाई को आयकर दिवस (Income Tax Day) मनाया जाता है। जानिए Sir James Wilson (1860), 1961 अधिनियम, CBDT, और आय के 5 प्रमुख स्रोतों का ऐतिहासिक सफर। MPPSC एवं UPSC हेतु संपूर्ण नोट्स।",
    excerptEn: "Comprehensive exam guide on Income Tax Day observed on 24th July in India. Covers historical background (1860 to 2026), Income Tax Act 1961, CBDT structure, 5 heads of income, and digital tax initiatives for MPPSC and UPSC exams.",
    ca_date: "2026-07-26",
    publishedAt: new Date().toISOString(),
    featured: true,
    readingTime: 7,
    keywords: [
      "Income Tax Day",
      "आयकर दिवस 2026",
      "Important Days",
      "महत्वपूर्ण दिवस",
      "MPPSC Income Tax Notes",
      "Income Tax Day 2026",
      "Sir James Wilson",
      "Income Tax Act 1961",
      "CBDT in Hindi",
      "Central Board of Direct Taxes",
      "CPC Bengaluru",
      "5 Heads of Income",
      "Vivad Se Vishwas Scheme",
      "MPPSC Economy Notes",
      "UPSC Economy Notes",
      "MPPSC Taxation"
    ],
    category: { _type: "reference", _ref: "cat-economy" },
    author: { _type: "reference", _ref: "author-aakar" },
    tags: [
      { _type: "reference", _ref: "tag-mppsc" },
      { _type: "reference", _ref: "tag-upsc" },
      { _type: "reference", _ref: "tag-important-days" },
      { _type: "reference", _ref: "tag-prelims" },
      { _type: "reference", _ref: "tag-mains" },
    ],
    syllabus: ["GS-3", "Prelims-GS"],
    featuredImage: {
      _type: "image",
      asset: { _type: "reference", _ref: assetBuilding._id },
      alt: "Ministry of Finance North Block building in New Delhi representing Central Board of Direct Taxes CBDT",
    },

    /* ─── SECTIONS ──────────────────────────────────────────────── */
    sections: [
      /* ── 1. Why in News ──────────────────────────────────────── */
      {
        _key: "sec-why-in-news",
        kind: "whyInNews",
        title: "चर्चा में क्यों? (166वाँ आयकर दिवस 2026)",
        titleEn: "Why in News? (166th Income Tax Day 2026)",
        body: [
          {
            _key: "b1-1", _type: "block", style: "normal",
            children: [{ _key: "s1-1", _type: "span", text: "भारत में प्रतिवर्ष **24 जुलाई** को **आयकर दिवस (Income Tax Day)** मनाया जाता है। वर्ष **2026** में यह दिवस **166वें आयकर दिवस** के रूप में मनाया जा रहा है। यह दिन भारत में **आयकर प्रणाली की शुरुआत**, **ईमानदार करदाताओं के योगदान** तथा **राष्ट्र निर्माण में कर व्यवस्था की भूमिका** को सम्मानित करने के लिए समर्पित है।" }],
          },
          {
            _key: "b1-2", _type: "block", style: "normal",
            children: [{ _key: "s1-2", _type: "span", text: "• **166वाँ आयकर दिवस**: **24 जुलाई 2026** को भारत ने **166वाँ आयकर दिवस** मनाया।" }],
          },
          {
            _key: "b1-3", _type: "block", style: "normal",
            children: [{ _key: "s1-3", _type: "span", text: "• **उद्देश्य**: इसका उद्देश्य **कर जागरूकता (Tax Awareness)** बढ़ाना, **स्वैच्छिक कर अनुपालन (Voluntary Tax Compliance)** को प्रोत्साहित करना तथा **करदाताओं के योगदान** को सम्मान देना है।" }],
          },
          {
            _key: "b1-img", _type: "image",
            asset: { _type: "reference", _ref: assetBuilding._id },
            alt: "CBDT North Block Ministry of Finance building in New Delhi",
          },
        ],
        bodyEn: [
          {
            _key: "b1-4", _type: "block", style: "normal",
            children: [{ _key: "s1-4", _type: "span", text: "India celebrates Income Tax Day annually on July 24th. In 2026, the 166th Income Tax Day was observed to acknowledge the historical beginning of direct taxes and honor honest taxpayers." }],
          },
        ],
      },

      /* ── 2. What is Income Tax & 5 Heads of Income ─────────── */
      {
        _key: "sec-definition-heads",
        kind: "background",
        title: "आयकर (Income Tax) क्या है और आय के 5 प्रमुख स्रोत",
        titleEn: "What is Income Tax & 5 Heads of Income",
        body: [
          {
            _key: "b2-1", _type: "block", style: "normal",
            children: [{ _key: "s2-1", _type: "span", text: "• **आयकर (Income Tax)**: यह एक **वित्तीय वर्ष** के दौरान व्यक्तियों और व्यवसायों द्वारा अर्जित आय पर सरकार द्वारा लगाया जाने वाला **प्रत्यक्ष कर (Direct Tax)** है।" }],
          },
          {
            _key: "b2-2", _type: "block", style: "normal",
            children: [{ _key: "s2-2", _type: "span", text: "• **आय (Income)**: **\"आय\"** में विभिन्न स्रोत शामिल हैं, जिन्हें **आयकर अधिनियम, 1961** की **धारा 2(24)** के तहत व्यापक रूप से परिभाषित किया गया है।" }],
          },
          {
            _key: "b2-h1", _type: "block", style: "h3",
            children: [{ _key: "sh2-1", _type: "span", text: "आय के 5 प्रमुख स्रोत (5 Heads of Income)" }],
          },
          {
            _key: "b2-3", _type: "block", style: "normal",
            children: [{ _key: "s2-3", _type: "span", text: "• **1. वेतन (Salary)**: इसमें नियोक्ता द्वारा कर्मचारी को किए जाने वाले सभी भुगतान शामिल होते हैं, जैसे कि **मूल वेतन, भत्ते, कमीशन और सेवानिवृत्ति लाभ**।" }],
          },
          {
            _key: "b2-4", _type: "block", style: "normal",
            children: [{ _key: "s2-4", _type: "span", text: "• **2. मकान संपत्ति (House Property)**: आवासीय या व्यावसायिक संपत्तियों से प्राप्त **किराये की आय** कर योग्य होती है।" }],
          },
          {
            _key: "b2-5", _type: "block", style: "normal",
            children: [{ _key: "s2-5", _type: "span", text: "• **3. व्यवसाय / पेशा (Business / Profession)**: व्यवसाय या पेशेवर गतिविधियों से होने वाले लाभ पर **स्वीकृत व्यय घटाने के बाद** कर लगाया जाता है।" }],
          },
          {
            _key: "b2-6", _type: "block", style: "normal",
            children: [{ _key: "s2-6", _type: "span", text: "• **4. पूंजीगत लाभ (Capital Gains)**: संपत्ति, शेयर या आभूषण जैसी **पूंजीगत परिसंपत्तियों** की बिक्री से प्राप्त लाभ कर योग्य होते हैं (दीर्घकालिक या अल्पकालिक)।" }],
          },
          {
            _key: "b2-7", _type: "block", style: "normal",
            children: [{ _key: "s2-7", _type: "span", text: "• **5. अन्य स्रोत (Other Sources)**: इसमें अन्य 4 श्रेणियों में शामिल न होने वाली आय शामिल है, जैसे **बचत पर ब्याज, पारिवारिक पेंशन, उपहार, लॉटरी जीत और निवेश लाभ**।" }],
          },
        ],
        bodyEn: [
          {
            _key: "b2-8", _type: "block", style: "normal",
            children: [{ _key: "s2-8", _type: "span", text: "Income tax is a direct tax levied on income under 5 heads specified in Section 2(24) of the Income Tax Act 1961: Salary, House Property, Business/Profession, Capital Gains, and Other Sources." }],
          },
        ],
      },

      /* ── 3. Historical Evolution 1860-2026 ───────────────── */
      {
        _key: "sec-historical-evolution",
        kind: "keyHighlights",
        title: "भारत में आयकर का ऐतिहासिक विकास (1860 से 2026 तक का सफर)",
        titleEn: "Historical Evolution of Income Tax in India (1860 to 2026)",
        body: [
          {
            _key: "b3-h1", _type: "block", style: "h3",
            children: [{ _key: "sh3-1", _type: "span", text: "24 जुलाई 1860: पहली बार आयकर लागू" }],
          },
          {
            _key: "b3-1", _type: "block", style: "normal",
            children: [{ _key: "s3-1", _type: "span", text: "• **प्रवर्तक**: ब्रिटिश भारत के पहले वित्त सदस्य **सर जेम्स विल्सन (Sir James Wilson)** ने पहली बार आयकर लागू किया।" }],
          },
          {
            _key: "b3-2", _type: "block", style: "normal",
            children: [{ _key: "s3-2", _type: "span", text: "• **उद्देश्य**: इसका मुख्य उद्देश्य **1857 के प्रथम स्वतंत्रता संग्राम (सैन्य विद्रोह)** के बाद उत्पन्न **वित्तीय संकट** से हुए नुकसान की भरपाई करना था।" }],
          },
          {
            _key: "b3-img1", _type: "image",
            asset: { _type: "reference", _ref: assetWilson._id },
            alt: "Portrait of Sir James Wilson who introduced Income Tax in India on 24 July 1860",
          },
          {
            _key: "b3-h2", _type: "block", style: "h3",
            children: [{ _key: "sh3-2", _type: "span", text: "प्रमुख ऐतिहासिक घटनाक्रम" }],
          },
          {
            _key: "b3-3", _type: "block", style: "normal",
            children: [{ _key: "s3-3", _type: "span", text: "• **1860**: **24 जुलाई 1860** को भारत में पहली बार **आयकर** लागू हुआ।" }],
          },
          {
            _key: "b3-4", _type: "block", style: "normal",
            children: [{ _key: "s3-4", _type: "span", text: "• **1886**: भारत का पहला संगठित **Income Tax Act, 1886** लागू किया गया।" }],
          },
          {
            _key: "b3-5", _type: "block", style: "normal",
            children: [{ _key: "s3-5", _type: "span", text: "• **1922**: **आयकर अधिनियम, 1922** द्वारा कर प्रशासन का पुनर्गठन हुआ और विभिन्न प्राधिकरणों को औपचारिक दर्जा मिला।" }],
          },
          {
            _key: "b3-6", _type: "block", style: "normal",
            children: [{ _key: "s3-6", _type: "span", text: "• **1924**: **केंद्रीय राजस्व बोर्ड अधिनियम (1924)** के तहत केंद्रीय राजस्व बोर्ड की स्थापना की गई।" }],
          },
          {
            _key: "b3-7", _type: "block", style: "normal",
            children: [{ _key: "s3-7", _type: "span", text: "• **1946**: बॉम्बे और कलकत्ता में **ग्रुप ए अधिकारियों** का प्रशिक्षण शुरू हुआ।" }],
          },
          {
            _key: "b3-8", _type: "block", style: "normal",
            children: [{ _key: "s3-8", _type: "span", text: "• **1957**: **राष्ट्रीय प्रत्यक्ष कर अकादमी (NADT)** की स्थापना नागपुर में हुई।" }],
          },
          {
            _key: "b3-9", _type: "block", style: "normal",
            children: [{ _key: "s3-9", _type: "span", text: "• **1961**: वर्तमान **Income Tax Act, 1961** संसद द्वारा पारित किया गया।" }],
          },
          {
            _key: "b3-10", _type: "block", style: "normal",
            children: [{ _key: "s3-10", _type: "span", text: "• **1 अप्रैल 1962**: **आयकर अधिनियम, 1961** पूरे भारत में प्रभावी हुआ।" }],
          },
          {
            _key: "b3-11", _type: "block", style: "normal",
            children: [{ _key: "s3-11", _type: "span", text: "• **1964**: **केंद्रीय राजस्व बोर्ड अधिनियम, 1963** के तहत बोर्ड का विभाजन कर **केंद्रीय प्रत्यक्ष कर बोर्ड (CBDT)** का गठन किया गया।" }],
          },
          {
            _key: "b3-12", _type: "block", style: "normal",
            children: [{ _key: "s3-12", _type: "span", text: "• **1981**: चालानों की इलेक्ट्रॉनिक प्रोसेसिंग हेतु **कम्प्यूटरीकरण (Computerisation)** की शुरुआत।" }],
          },
          {
            _key: "b3-13", _type: "block", style: "normal",
            children: [{ _key: "s3-13", _type: "span", text: "• **2009**: बेंगलुरु में **केंद्रीकृत प्रोसेसिंग सेंटर (CPC)** की स्थापना की गई।" }],
          },
          {
            _key: "b3-14", _type: "block", style: "normal",
            children: [{ _key: "s3-14", _type: "span", text: "• **2010**: आयकर लागू होने के **150 वर्ष** पूरे होने के अवसर पर **24 जुलाई 2010** को पहला **Income Tax Day** मनाया गया।" }],
          },
        ],
        bodyEn: [
          {
            _key: "b3-15", _type: "block", style: "normal",
            children: [{ _key: "s3-15", _type: "span", text: "Historical evolution of income tax in India from Sir James Wilson's initial introduction in 1860 to the 1961 Act, creation of CBDT in 1964, CPC Bengaluru in 2009, and celebration of Income Tax Day since 2010." }],
          },
        ],
      },

      /* ── 4. CBDT Administration & Digital Initiatives ──────── */
      {
        _key: "sec-cbdt-initiatives",
        kind: "analysis",
        title: "आयकर प्रशासन: CBDT एवं प्रमुख डिजिटल पहलें",
        titleEn: "Tax Administration: CBDT & Key Digital Initiatives",
        body: [
          {
            _key: "b4-h1", _type: "block", style: "h3",
            children: [{ _key: "sh4-1", _type: "span", text: "CBDT (केंद्रीय प्रत्यक्ष कर बोर्ड)" }],
          },
          {
            _key: "b4-1", _type: "block", style: "normal",
            children: [{ _key: "s4-1", _type: "span", text: "• **मंत्रालय**: **वित्त मंत्रालय** के राजस्व विभाग के अधीन वैधानिक निकाय।" }],
          },
          {
            _key: "b4-2", _type: "block", style: "normal",
            children: [{ _key: "s4-2", _type: "span", text: "• **भूमिका**: भारत में **प्रत्यक्ष करों (Direct Taxes)** के प्रशासन, संग्रह एवं नीति निर्माण का सर्वोच्च निकाय।" }],
          },
          {
            _key: "b4-img2", _type: "image",
            asset: { _type: "reference", _ref: assetDigital._id },
            alt: "Digital tax administration income tax return e-filing portal interface and CPC processing",
          },
          {
            _key: "b4-h2", _type: "block", style: "h3",
            children: [{ _key: "sh4-2", _type: "span", text: "आयकर विभाग की प्रमुख डिजिटल पहलें व योजनाएं" }],
          },
          {
            _key: "b4-3", _type: "block", style: "normal",
            children: [{ _key: "s4-3", _type: "span", text: "• **E-Filing Portal**: करदाताओं के लिए निर्बाध और त्वरित ऑनलाइन आईटीआर (ITR) दाखिल करने की सुविधा।" }],
          },
          {
            _key: "b4-4", _type: "block", style: "normal",
            children: [{ _key: "s4-4", _type: "span", text: "• **Faceless Assessment & Appeal**: मानव-इंटरफेस को समाप्त कर पारदर्शी एवं निष्पक्ष कर मूल्यांकन प्रणाली।" }],
          },
          {
            _key: "b4-5", _type: "block", style: "normal",
            children: [{ _key: "s4-5", _type: "span", text: "• **PAN–Aadhaar Linking**: कर चोरी रोकने एवं वित्तीय डेटा को एकीकृत करने की अनिवार्यता।" }],
          },
          {
            _key: "b4-6", _type: "block", style: "normal",
            children: [{ _key: "s4-6", _type: "span", text: "• **AIS (Annual Information Statement)**: करदाता के सभी वित्तीय लेन-देन का व्यापक विवरण।" }],
          },
          {
            _key: "b4-7", _type: "block", style: "normal",
            children: [{ _key: "s4-7", _type: "span", text: "• **TIS (Taxpayer Information Summary)**: कर योग्य आय की सरलीकृत जानकारी प्रदर्शित करने वाला टूल।" }],
          },
          {
            _key: "b4-8", _type: "block", style: "normal",
            children: [{ _key: "s4-8", _type: "span", text: "• **ई-सत्यापन योजना (E-Verification Scheme)**: अधिकारियों को करदाता की आय का सही निर्धारण करने तथा कर चोरी घटाने में मदद करती है।" }],
          },
          {
            _key: "b4-9", _type: "block", style: "normal",
            children: [{ _key: "s4-9", _type: "span", text: "• **विवाद से विश्वास योजना (Vivad Se Vishwas Scheme)**: सरकार और करदाताओं के बीच लंबित **प्रत्यक्ष कर विवादों** को समाप्त करने तथा फंसे राजस्व को एकत्र करने का विवाद निवारण कार्यक्रम।" }],
          },
        ],
        bodyEn: [
          {
            _key: "b4-10", _type: "block", style: "normal",
            children: [{ _key: "s4-10", _type: "span", text: "Overview of CBDT and digital initiatives including E-filing portal, Faceless assessment, AIS, TIS, PAN-Aadhaar linking, E-verification, and Vivad Se Vishwas scheme." }],
          },
        ],
      },

      /* ── 5. Significance & Impact ───────────────────────── */
      {
        _key: "sec-significance",
        kind: "impact",
        title: "आयकर दिवस का महत्व एवं राष्ट्र निर्माण में भूमिका",
        titleEn: "Significance of Income Tax Day & Nation Building",
        body: [
          {
            _key: "b5-1", _type: "block", style: "normal",
            children: [{ _key: "s5-1", _type: "span", text: "• **राष्ट्र निर्माण में योगदान**: आयकर से प्राप्त राजस्व **शिक्षा, स्वास्थ्य, रक्षा एवं इंफ्रास्ट्रक्चर** के विकास के लिए मुख्य धन उपलब्ध कराता है।" }],
          },
          {
            _key: "b5-2", _type: "block", style: "normal",
            children: [{ _key: "s5-2", _type: "span", text: "• **धन का पुनर्वितरण**: यह आय की असमानता घटाने तथा धन के पुनर्वितरण के माध्यम से सामाजिक न्याय सुनिश्चित करता है।" }],
          },
          {
            _key: "b5-3", _type: "block", style: "normal",
            children: [{ _key: "s5-3", _type: "span", text: "• **स्वैच्छिक कर अनुपालन**: यह दिवस ईमानदार करदाताओं को सम्मानित कर **स्वैच्छिक कर-अनुपालन** की संस्कृति को बढ़ावा देता है।" }],
          },
          {
            _key: "b5-4", _type: "block", style: "normal",
            children: [{ _key: "s5-4", _type: "span", text: "• **आत्मनिर्भर भारत**: कर राजस्व देश की आत्मनिर्भरता और सामाजिक कल्याणकारी योजनाओं को मजबूती प्रदान करता है।" }],
          },
        ],
        bodyEn: [
          {
            _key: "b5-5", _type: "block", style: "normal",
            children: [{ _key: "s5-5", _type: "span", text: "Direct tax revenues drive national development in healthcare, defense, and infrastructure while creating a transparent social contract." }],
          },
        ],
      },

      /* ── 6. Exam Quick Revision ──────────────────────────── */
      {
        _key: "sec-quick-revision",
        kind: "wayForward",
        title: "परीक्षा हेतु महत्वपूर्ण तथ्य एवं Quick Revision",
        titleEn: "Exam Key Points & Quick Revision",
        body: [
          {
            _key: "b6-1", _type: "block", style: "normal",
            children: [{ _key: "s6-1", _type: "span", text: "• **आयकर दिवस**: **24 जुलाई** (वर्ष 2026 में 166वाँ आयकर दिवस)" }],
          },
          {
            _key: "b6-2", _type: "block", style: "normal",
            children: [{ _key: "s6-2", _type: "span", text: "• **पहला आयकर**: **24 जुलाई 1860** (सर जेम्स विल्सन द्वारा)" }],
          },
          {
            _key: "b6-3", _type: "block", style: "normal",
            children: [{ _key: "s6-3", _type: "span", text: "• **वर्तमान कानून**: **Income Tax Act, 1961** (1 अप्रैल 1962 से प्रभावी)" }],
          },
          {
            _key: "b6-4", _type: "block", style: "normal",
            children: [{ _key: "s6-4", _type: "span", text: "• **CBDT**: केंद्रीय प्रत्यक्ष कर बोर्ड (वित्त मंत्रालय के अधीन, 1964 में गठित)" }],
          },
          {
            _key: "b6-5", _type: "block", style: "normal",
            children: [{ _key: "s6-5", _type: "span", text: "• **CPC बेंगलुरु**: 2009 में स्थापित केंद्रीकृत प्रोसेसिंग सेंटर" }],
          },
          {
            _key: "b6-6", _type: "block", style: "normal",
            children: [{ _key: "s6-6", _type: "span", text: "• **पहला आयकर दिवस उत्सव**: **2010** (150 वर्ष पूरे होने पर)" }],
          },
          {
            _key: "b6-7", _type: "block", style: "normal",
            children: [{ _key: "s6-7", _type: "span", text: "• **आय के 5 शीर्ष**: वेतन, मकान संपत्ति, व्यवसाय/पेशा, पूंजीगत लाभ, अन्य स्रोत" }],
          },
        ],
        bodyEn: [
          {
            _key: "b6-8", _type: "block", style: "normal",
            children: [{ _key: "s6-8", _type: "span", text: "High-yield quick revision points tailored for UPSC, MPPSC, and SSC examinations." }],
          },
        ],
      },
    ],

    /* ─── FAQS (Exactly 8) ─────────────────────────────────── */
    faqs: [
      {
        question: "भारत में प्रतिवर्ष 'आयकर दिवस' (Income Tax Day) किस तिथि को मनाया जाता है?",
        questionEn: "On which date is Income Tax Day celebrated annually in India?",
        answer: "भारत में प्रतिवर्ष 24 जुलाई को आयकर दिवस (Income Tax Day) मनाया जाता है। वर्ष 2026 में यह दिवस भारत की कर व्यवस्था के 166वें आयकर दिवस के रूप में मनाया गया।",
        answerEn: "Income Tax Day is celebrated in India every year on 24th July. In 2026, India observed its 166th Income Tax Day."
      },
      {
        question: "भारत में पहली बार आयकर (Income Tax) कब और किसके द्वारा लागू किया गया था?",
        questionEn: "When and by whom was income tax introduced for the first time in India?",
        answer: "भारत में पहली बार 24 जुलाई 1860 को ब्रिटिश अर्थशास्त्री सर जेम्स विल्सन (Sir James Wilson) द्वारा आयकर लागू किया गया था। इसका मुख्य उद्देश्य 1857 के सैन्य विद्रोह के बाद उत्पन्न वित्तीय संकट से हुए नुकसान की भरपाई करना था।",
        answerEn: "Income tax was introduced in India on 24th July 1860 by Sir James Wilson to overcome the financial crisis post the 1857 revolt."
      },
      {
        question: "भारत में पहला 'आयकर दिवस' किस वर्ष मनाया गया था?",
        questionEn: "In which year was the first Income Tax Day celebrated in India?",
        answer: "भारत में पहली बार आयकर लागू होने के 150 वर्ष पूरे होने के उपलक्ष्य में वर्ष 2010 में औपचारिक रूप से पहला आयकर दिवस (Income Tax Day) मनाया गया था।",
        answerEn: "The first formal Income Tax Day was observed on 24th July 2010, marking 150 years of income tax implementation in India."
      },
      {
        question: "वर्तमान में भारत में कौन-सा आयकर कानून लागू है?",
        questionEn: "Which income tax act is currently applicable in India?",
        answer: "वर्तमान में भारत में आयकर अधिनियम, 1961 (Income Tax Act, 1961) लागू है, जो 1 अप्रैल 1962 से प्रभावी हुआ था और पूरे भारत पर लागू होता है।",
        answerEn: "The Income Tax Act, 1961 currently governs direct taxation in India, coming into force from 1st April 1962."
      },
      {
        question: "CBDT (केंद्रीय प्रत्यक्ष कर बोर्ड) क्या है और यह किस मंत्रालय के अधीन कार्यरत है?",
        questionEn: "What is CBDT and under which ministry does it operate?",
        answer: "CBDT (Central Board of Direct Taxes) भारत में प्रत्यक्ष करों के प्रशासन एवं नीति निर्माण का सर्वोच्च वैधानिक निकाय है। यह वित्त मंत्रालय के अधीन कार्य करता है। इसे केंद्रीय राजस्व बोर्ड अधिनियम, 1963 के तहत 1964 में गठित किया गया था।",
        answerEn: "CBDT (Central Board of Direct Taxes) is the apex statutory authority for direct tax administration under the Ministry of Finance."
      },
      {
        question: "आयकर अधिनियम की धारा 2(24) के तहत 'आय के 5 प्रमुख स्रोत' कौन-से हैं?",
        questionEn: "What are the 5 heads of income defined under Section 2(24) of the Income Tax Act?",
        answer: "आयकर अधिनियम की धारा 2(24) के तहत आय के 5 प्रमुख शीर्ष (Heads of Income) हैं: (1) वेतन (Salary), (2) मकान संपत्ति (House Property), (3) व्यवसाय/पेशा (Business/Profession), (4) पूंजीगत लाभ (Capital Gains), तथा (5) अन्य स्रोत (Other Sources)।",
        answerEn: "The 5 heads of income are: Salary, House Property, Business/Profession, Capital Gains, and Other Sources."
      },
      {
        question: "आयकर विभाग का CPC (केंद्रीकृत प्रोसेसिंग सेंटर) कहाँ स्थित है?",
        questionEn: "Where is the Centralized Processing Centre (CPC) of the Income Tax Department located?",
        answer: "आयकर विभाग के केंद्रीकृत प्रोसेसिंग सेंटर (CPC) की स्थापना वर्ष 2009 में बेंगलुरु में की गई थी, जो ई-फाइल और पेपर रिटर्न की थोक एवं क्षेत्राधिकार-मुक्त प्रोसेसिंग करता है।",
        answerEn: "The Centralized Processing Centre (CPC) was established in Bengaluru in 2009 for automated bulk e-filing return processing."
      },
      {
        question: "'विवाद से विश्वास योजना' (Vivad Se Vishwas Scheme) का मुख्य उद्देश्य क्या है?",
        questionEn: "What is the primary objective of the Vivad Se Vishwas Scheme?",
        answer: "विवाद से विश्वास योजना भारत सरकार का एक निपटान कार्यक्रम है, जिसका उद्देश्य करदाताओं और सरकार के बीच लंबित प्रत्यक्ष कर विवादों को समाप्त करना, मुकदमों की संख्या घटाना और फंसे हुए राजस्व को एकत्र करना है।",
        answerEn: "The Vivad Se Vishwas Scheme is a tax dispute resolution mechanism designed to settle pending direct tax litigation and recover revenue."
      }
    ],

    /* ─── MCQS (Exactly 8) ─────────────────────────────────── */
    mcqs: [
      {
        question: "भारत में प्रतिवर्ष 'आयकर दिवस' (Income Tax Day) किस तिथि को मनाया जाता है?",
        questionEn: "On which date is Income Tax Day celebrated annually in India?",
        options: ["A. 1 अप्रैल", "B. 24 जुलाई", "C. 28 अगस्त", "D. 15 अगस्त"],
        optionsEn: ["A. April 1", "B. July 24", "C. August 28", "D. August 15"],
        correctIndex: 1,
        explanation: "भारत में प्रतिवर्ष 24 जुलाई को आयकर दिवस मनाया जाता है क्योंकि 24 जुलाई 1860 को सर जेम्स विल्सन द्वारा पहली बार भारत में आयकर लागू किया गया था।",
        explanationEn: "Income Tax Day is observed annually on 24th July to commemorate the first introduction of income tax in 1860."
      },
      {
        question: "1857 के विद्रोह के बाद उपजे वित्तीय संकट से निपटने हेतु 24 जुलाई 1860 को भारत में पहली बार आयकर किसने शुरू किया था?",
        questionEn: "Who introduced income tax in India on 24th July 1860 following the financial crisis post the 1857 revolt?",
        options: ["A. लॉर्ड कैनिंग", "B. सर जेम्स विल्सन", "C. लॉर्ड रिपन", "D. लॉर्ड कर्जन"],
        optionsEn: ["A. Lord Canning", "B. Sir James Wilson", "C. Lord Ripon", "D. Lord Curzon"],
        correctIndex: 1,
        explanation: "24 जुलाई 1860 को ब्रिटिश अर्थशास्त्री सर जेम्स विल्सन ने भारत में पहली बार आयकर प्रणाली की शुरुआत की थी।",
        explanationEn: "Sir James Wilson introduced the first income tax act in British India on July 24, 1860."
      },
      {
        question: "भारत में पहली बार औपचारिक रूप से 'आयकर दिवस' किस वर्ष मनाया गया था?",
        questionEn: "In which year was Income Tax Day formally celebrated for the first time in India?",
        options: ["A. 1961", "B. 1981", "C. 2010", "D. 2024"],
        optionsEn: ["A. 1961", "B. 1981", "C. 2010", "D. 2024"],
        correctIndex: 2,
        explanation: "24 जुलाई 2010 को पहली बार Income Tax Day मनाया गया था, जो 1860 में आयकर की शुरुआत के 150 वर्षों का प्रतीक था।",
        explanationEn: "The Income Tax Department celebrated the first Income Tax Day on 24th July 2010 to mark 150 years of tax administration."
      },
      {
        question: "वर्तमान में लागू 'आयकर अधिनियम, 1961' (Income Tax Act, 1961) किस तिथि से प्रभावी हुआ था?",
        questionEn: "From which date did the currently applicable Income Tax Act, 1961 come into force?",
        options: ["A. 24 जुलाई 1860", "B. 1 अप्रैल 1962", "C. 1 जनवरी 1964", "D. 15 अगस्त 1947"],
        optionsEn: ["A. 24 July 1860", "B. 1 April 1962", "C. 1 January 1964", "D. 15 August 1947"],
        correctIndex: 1,
        explanation: "आयकर अधिनियम, 1961 को संसद द्वारा पारित किए जाने के बाद 1 अप्रैल 1962 से पूरे भारत में लागू किया गया था।",
        explanationEn: "The Income Tax Act of 1961 came into effect across India from April 1, 1962."
      },
      {
        question: "केंद्रीय प्रत्यक्ष कर बोर्ड (CBDT) के संदर्भ में निम्नलिखित में से कौन-सा कथन सत्य है?",
        questionEn: "Which statement is correct regarding the Central Board of Direct Taxes (CBDT)?",
        options: [
          "A. यह गृह मंत्रालय के अधीन एक गैर-संवैधानिक निकाय है",
          "B. यह प्रत्यक्ष करों के प्रशासन हेतु वित्त मंत्रालय के अधीन सर्वोच्च वैधानिक निकाय है",
          "C. इसकी स्थापना 1860 में सर जेम्स विल्सन ने की थी",
          "D. यह केवल अप्रत्यक्ष करों (GST) का प्रबंधन करता है"
        ],
        optionsEn: [
          "A. It is a non-constitutional body under Ministry of Home Affairs",
          "B. It is the apex statutory body for direct taxes under Ministry of Finance",
          "C. It was established in 1860 by Sir James Wilson",
          "D. It manages only indirect taxes like GST"
        ],
        correctIndex: 1,
        explanation: "CBDT वित्त मंत्रालय के अधीन भारत में प्रत्यक्ष करों के प्रशासन और नीति निर्माण का सर्वोच्च निकाय है, जिसे 1964 में गठित किया गया था।",
        explanationEn: "CBDT is the statutory authority functioning under the Department of Revenue, Ministry of Finance."
      },
      {
        question: "ई-फाइलिंग और पेपर रिटर्न की थोक एवं क्षेत्राधिकार-मुक्त प्रोसेसिंग हेतु वर्ष 2009 में केंद्रीकृत प्रोसेसिंग सेंटर (CPC) की स्थापना कहाँ की गई थी?",
        questionEn: "Where was the Centralized Processing Centre (CPC) established in 2009 for automated return processing?",
        options: ["A. नई दिल्ली", "B. मुंबई", "C. बेंगलुरु", "D. कोलकाता"],
        optionsEn: ["A. New Delhi", "B. Mumbai", "C. Bengaluru", "D. Kolkata"],
        correctIndex: 2,
        explanation: "2009 में बेंगलुरु में केंद्रीकृत प्रोसेसिंग सेंटर (CPC) की स्थापना की गई थी जो आईटीआर (ITR) की थोक इलेक्ट्रॉनिक प्रोसेसिंग करता है।",
        explanationEn: "The CPC was set up in Bengaluru in 2009 for jurisdiction-free bulk processing of income tax returns."
      },
      {
        question: "निम्नलिखित में से कौन-सा आय का स्रोत आयकर अधिनियम की धारा 2(24) के तहत 5 प्रमुख शीर्षों (Heads of Income) में शामिल है?",
        questionEn: "Which of the following is included among the 5 heads of income under Section 2(24) of the Income Tax Act?",
        options: [
          "A. वेतन (Salary)",
          "B. मकान संपत्ति (House Property)",
          "C. पूंजीगत लाभ (Capital Gains)",
          "D. उपर्युक्त सभी"
        ],
        optionsEn: [
          "A. Salary",
          "B. House Property",
          "C. Capital Gains",
          "D. All of the above"
        ],
        correctIndex: 3,
        explanation: "धारा 2(24) के तहत आय के 5 शीर्ष हैं: (1) वेतन, (2) मकान संपत्ति, (3) व्यवसाय/पेशा, (4) पूंजीगत लाभ, तथा (5) अन्य स्रोत।",
        explanationEn: "Section 2(24) categorizes income into 5 distinct heads: Salary, House Property, Business/Profession, Capital Gains, and Other Sources."
      },
      {
        question: "करदाताओं और सरकार के बीच लंबित प्रत्यक्ष कर विवादों एवं मुकदमेबाजी को समाप्त करने हेतु शुरू किया गया निपटान कार्यक्रम कौन-सा है?",
        questionEn: "Which dispute resolution program was introduced to settle pending direct tax litigation between taxpayers and the government?",
        options: [
          "A. विवाद से विश्वास योजना",
          "B. ई-सत्यापन योजना",
          "C. राष्ट्रीय प्रत्यक्ष कर अकादमी योजना",
          "D. पीकेवीवाई योजना"
        ],
        optionsEn: [
          "A. Vivad Se Vishwas Scheme",
          "B. E-Verification Scheme",
          "C. National Academy of Direct Taxes Scheme",
          "D. PKVY Scheme"
        ],
        correctIndex: 0,
        explanation: "'विवाद से विश्वास योजना' लंबित प्रत्यक्ष कर विवादों को समाप्त करने और फंसे राजस्व को एकत्र करने के लिए शुरू किया गया निपटान कार्यक्रम है।",
        explanationEn: "The Vivad Se Vishwas Scheme provides a resolution platform for settling pending direct tax litigation."
      },
      {
        question: "आयकर अधिनियम 1961 की धारा 139(1) के तहत व्यक्तिगत करदाताओं के लिए (जहाँ ऑडिट आवश्यक नहीं है) वार्षिक आयकर रिटर्न (ITR) दाखिल करने की सामान्य अंतिम तिथि (Due Date) क्या है?",
        questionEn: "What is the standard due date for filing individual Income Tax Returns (ITR) under Section 139(1) of the Income Tax Act 1961 (where audit is not required)?",
        options: ["A. 31 मार्च", "B. 31 जुलाई", "C. 31 अक्टूबर", "D. 31 दिसंबर"],
        optionsEn: ["A. 31st March", "B. 31st July", "C. 31st October", "D. 31st December"],
        correctIndex: 1,
        explanation: "आयकर अधिनियम 1961 की धारा 139(1) के अंतर्गत गैर-ऑडिट मामलों में व्यक्तिगत करदाताओं के लिए आईटीआर फाइलिंग की सामान्य अंतिम तिथि 31 जुलाई होती है।",
        explanationEn: "Under Section 139(1) of the Income Tax Act 1961, the standard due date for filing ITR by non-audit individual taxpayers is 31st July."
      }
    ],

    /* ─── Sources ────────────────────────────────────────────── */
    sources: [
      { label: "Press Information Bureau (PIB), Government of India", url: "https://pib.gov.in" },
      { label: "Income Tax Department, Ministry of Finance, Govt of India", url: "https://incometaxindia.gov.in" }
    ]
  };

  try {
    // 1. Upload Static GK Article
    await client.createOrReplace(article);
    console.log("✨ Successfully uploaded Income Tax Day 2026 Static GK Article to Sanity CMS!");

    // 2. Upload Current Affairs Article (slug: income-tax-day-2026)
    const caArticle1 = {
      ...article,
      _id: "ca-income-tax-day-2026-in-hindi",
      _type: "currentAffairs",
      slug: { _type: "slug", current: "income-tax-day-2026" },
    };
    await client.createOrReplace(caArticle1);
    console.log("✨ Successfully uploaded Current Affairs Article (income-tax-day-2026) to Sanity CMS!");
  } catch (err) {
    console.error("❌ Failed to create/replace document in Sanity:", err);
  }
}

main().catch((err) => {
  console.error("❌ Error running script:", err);
  process.exit(1);
});
