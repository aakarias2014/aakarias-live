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

// Helper to convert an array of strings into Portable Text blocks
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
  console.log("🚀 Starting upload process for Param Pragya AI Supercomputer Current Affairs Article...");

  // Ensure default author & tags exist in Sanity
  const authorDoc = {
    _id: "author-aakar",
    _type: "author",
    slug: { _type: "slug", current: "deepraj-sikarwar" },
    name: "Deepraj Sikarwar (Editorial Team)",
    role: "Senior Content Developer & Exam Strategist",
    bio: "Deepraj Sikarwar leads the Editorial Team at Aakar IAS, specializing in MPPSC & UPSC Science & Tech, Current Affairs, and Polity content development.",
  };
  await client.createOrReplace(authorDoc);
  console.log("✔ Ensured Default Author: Deepraj Sikarwar (Editorial Team)");

  const tagSciTech = {
    _id: "tag-scitech",
    _type: "tag",
    slug: { _type: "slug", current: "science-and-technology" },
    name: "Science & Technology",
  };
  await client.createOrReplace(tagSciTech);
  console.log("✔ Ensured Tag: Science & Technology (tag-scitech)");

  // Image file paths in public/images/blog/
  const imagePaths = {
    featured: path.resolve(process.cwd(), "public/images/blog/param-pragya-featured.png"),
    gpu: path.resolve(process.cwd(), "public/images/blog/param-pragya-gpu-cluster.png"),
    journey: path.resolve(process.cwd(), "public/images/blog/param-pragya-journey.png"),
  };

  // Check if files exist
  if (
    !fs.existsSync(imagePaths.featured) ||
    !fs.existsSync(imagePaths.gpu) ||
    !fs.existsSync(imagePaths.journey)
  ) {
    console.error("❌ Required images not found in public/images/blog/");
    process.exit(1);
  }

  // Upload Images
  console.log("📸 Uploading featured image...");
  const assetFeatured = await client.assets.upload("image", fs.createReadStream(imagePaths.featured), {
    filename: "param_pragya_featured.png",
  });
  console.log(`✔ Uploaded featured image. Asset ID: ${assetFeatured._id}`);

  console.log("📸 Uploading GPU cluster image...");
  const assetGpu = await client.assets.upload("image", fs.createReadStream(imagePaths.gpu), {
    filename: "param_pragya_gpu_cluster.png",
  });
  console.log(`✔ Uploaded GPU cluster image. Asset ID: ${assetGpu._id}`);

  console.log("📸 Uploading journey infographic image...");
  const assetJourney = await client.assets.upload("image", fs.createReadStream(imagePaths.journey), {
    filename: "param_pragya_journey.png",
  });
  console.log(`✔ Uploaded journey image. Asset ID: ${assetJourney._id}`);

  // Construct the Article document
  const article = {
    _id: "ca-param-pragya-ai-supercomputer",
    _type: "currentAffairs",
    slug: { _type: "slug", current: "param-pragya-ai-supercomputer-india-supercomputing-journey" },
    title: "MPPSC & UPSC विशेष: भारत का नया AI सुपरकंप्यूटर 'परम प्रज्ञा' — परम 8000 से परम प्रज्ञा तक भारत की सुपरकंप्यूटिंग व AI क्रांति की गौरवगाथा",
    titleEn: "PARAM Pragya AI Supercomputer: India's Journey from PARAM 8000 to High-Performance Computing (HPC) & AI Dominance | MPPSC & UPSC Notes",
    excerpt: "प्रधानमंत्री नरेंद्र मोदी ने आईआईटी दिल्ली (सोनीपत परिसर) में 250 AI पेटाफ्लॉप्स क्षमता वाले 'परम प्रज्ञा' AI सुपरकंप्यूटर का उद्घाटन किया। C-DAC और राष्ट्रीय सुपरकंप्यूटिंग मिशन (NSM) द्वारा विकसित यह प्रणाली भारत को AI एवं उच्च-प्रदर्शन कंप्यूटिंग (HPC) क्षेत्र में स्वावलंबी बनाने की दिशा में ऐतिहासिक मील का पत्थर है।",
    excerptEn: "Prime Minister Narendra Modi inaugurated the 250 AI Petaflops 'PARAM Pragya' AI supercomputer at IIT Delhi Sonipat Campus. Developed under the National Supercomputing Mission (NSM) by C-DAC, this facility marks a watershed moment in India's journey from PARAM 8000 to self-reliant AI infrastructure.",
    ca_date: "2026-08-08",
    publishedAt: new Date().toISOString(),
    featured: true,
    readingTime: 7,
    keywords: [
      "PARAM Pragya supercomputer",
      "Param Pragya AI IIT Delhi",
      "Param Pragya Sonipat Campus",
      "PARAM 8000 to PARAM Pragya",
      "National Supercomputing Mission NSM",
      "C-DAC supercomputer India",
      "Vijay Bhatkar PARAM 8000",
      "NVIDIA A100 GPU 250 AI Petaflops",
      "MPPSC Science & Technology Unit 7",
      "UPSC Science & Tech Supercomputers",
      "AIRAWAT PARAM Siddhi AI",
      "Bhashini Multilingual AI India",
      "परम प्रज्ञा सुपरकंप्यूटर",
      "परम 8000",
      "विजय भटकर सुपरकंप्यूटर"
    ],
    category: { _type: "reference", _ref: "cat-scitech" },
    author: { _type: "reference", _ref: "author-aakar" },
    tags: [
      { _type: "reference", _ref: "tag-mppsc", _key: "tag-mppsc-key" },
      { _type: "reference", _ref: "tag-upsc", _key: "tag-upsc-key" },
      { _type: "reference", _ref: "tag-scitech", _key: "tag-scitech-key" },
      { _type: "reference", _ref: "tag-prelims", _key: "tag-prelims-key" },
      { _type: "reference", _ref: "tag-mains", _key: "tag-mains-key" },
    ],
    syllabus: ["MPPSC Paper-3 Unit-7", "MPPSC Paper-3 Unit-10", "UPSC GS-3 Science & Tech"],
    featuredImage: {
      _type: "image",
      asset: { _type: "reference", _ref: assetFeatured._id },
      alt: "IIT Delhi Sonipat Campus में स्थापित PARAM Pragya AI सुपरकंप्यूटर डाटा सेंटर क्लस्टर | MPPSC & UPSC Notes",
      caption: "चित्र 1: 'परम प्रज्ञा' AI सुपरकंप्यूटर — 250 AI पेटाफ्लॉप्स क्षमता एवं 400 NVIDIA A100 GPUs से लैस भारत की अत्याधुनिक AI कंप्यूटिंग सुविधा।",
    },

    /* ─── SECTIONS ──────────────────────────────────────────────── */
    sections: [
      /* ── 1. Why in News / Context ────────────────────────────── */
      {
        _key: "sec-context",
        kind: "whyInNews",
        title: "चर्चा में क्यों? (Why in News?)",
        titleEn: "Context & Why in News?",
        body: [
          ...createBlocks([
            "भारत ने कृत्रिम बुद्धिमत्ता (AI) और उच्च-प्रदर्शन कंप्यूटिंग (HPC) के क्षेत्र में एक नया इतिहास रचते हुए **'परम प्रज्ञा' (PARAM Pragya)** नामक अत्याधुनिक AI-पावर्ड सुपरकंप्यूटिंग सुविधा का उद्घाटन किया है।",
            "• **उद्घाटन**: भारत के **प्रधानमंत्री नरेंद्र मोदी** ने **8 अगस्त 2026** को **आईआईटी दिल्ली (IIT Delhi)** के 57वें दीक्षांत समारोह के अवसर पर **सोनीपत परिसर (Sonipat Campus)** में इस सुपरकंप्यूटर का औपचारिक लोकार्पण किया।",
            "• **राष्ट्रीय सुपरकंप्यूटिंग मिशन (NSM)**: इस सुपरकंप्यूटिंग इंफ्रास्ट्रक्चर को **विज्ञान एवं प्रौद्योगिकी विभाग (DST)** तथा **इलेक्ट्रॉनिक्स और सूचना प्रौद्योगिकी मंत्रालय (MeitY)** के संयुक्त तत्वावधान में **C-DAC (सेंटर फॉर डेवलपमेंट ऑफ एडवांस्ड कंप्यूटिंग)** द्वारा विकसित किया गया है।",
            "• **लागत व निवेश**: परियोजना की कुल लागत **₹135 करोड़** है, जिसमें से ₹110 करोड़ राष्ट्रीय सुपरकंप्यूटिंग मिशन (NSM) द्वारा तथा ₹25 करोड़ आईआईटी दिल्ली द्वारा वहन किए गए हैं।",
            "• **MPPSC व UPSC महत्व**: MPPSC मुख्य परीक्षा (पेपर-3 इकाई-7 व 10) एवं UPSC प्रारम्भिक परीक्षा हेतु भारत की सुपरकंप्यूटिंग क्रांति, C-DAC, NSM तथा AI इंफ्रास्ट्रक्चर से संबंधित प्रश्न अत्यंत महत्वपूर्ण हैं।"
          ]),
          createTable(
            "table-pragya-quick-facts-hi",
            "परम प्रज्ञा सुपरकंप्यूटर: एक नजर में (Quick Facts)",
            ["मानदंड (Parameter)", "महत्वपूर्ण विवरण (Details)"],
            [
              ["**सुपरकंप्यूटर का नाम**", "**परम प्रज्ञा (PARAM Pragya)**"],
              ["**उद्घाटन तिथि व कर्ता**", "**8 अगस्त 2026, प्रधानमंत्री नरेंद्र मोदी**"],
              ["**स्थापना स्थल**", "**आईआईटी दिल्ली (IIT Delhi) - सोनीपत कैंपस, हरियाणा**"],
              ["**प्रसंस्करण क्षमता (Compute Capacity)**", "**~250 AI पेटाफ्लॉप्स (AI Petaflops) / 8 PF नॉर्मल**"],
              ["**ग्राफिक्स प्रोसेसिंग यूनिट (GPU)**", "**400 NVIDIA A100 (80GB) GPUs**"],
              ["**स्टोरेज क्षमता**", "**10 पैटाबाइट (PB) पैरेलल फाइल सिस्टम**"],
              ["**नोडल मिशन**", "**राष्ट्रीय सुपरकंप्यूटिंग मिशन (NSM)**"],
              ["**कार्यान्वयन संस्था**", "**C-DAC (पुणे) एवं IIT दिल्ली**"],
              ["**कुल परियोजना लागत**", "**₹135 करोड़ (₹110 Cr NSM + ₹25 Cr IIT Delhi)**"],
              ["**सार्वजनिक पहुँच आवंटन**", "**40% क्षमता बाहरी शोधकर्ताओं व स्टार्टअप्स हेतु आरक्षित**"]
            ]
          )
        ],
        bodyEn: [
          ...createBlocks([
            "Marking a giant leap in India's Artificial Intelligence (AI) and High-Performance Computing (HPC) ecosystem, Prime Minister Narendra Modi inaugurated the state-of-the-art **'PARAM Pragya'** AI-powered supercomputer facility.",
            "• **Inauguration**: Formally launched by **PM Narendra Modi** on **August 8, 2026**, during the 57th Convocation Ceremony of **IIT Delhi** at its **Sonipat Campus**, Haryana.",
            "• **National Supercomputing Mission (NSM)**: Commissioned under the NSM—a joint flaghip initiative of the **Department of Science & Technology (DST)** and the **Ministry of Electronics & Information Technology (MeitY)**—implemented by **C-DAC (Centre for Development of Advanced Computing)**.",
            "• **Project Investment**: Total project cost stands at **₹135 Crore** (₹110 Crore funded under NSM and ₹25 Crore contributed by IIT Delhi).",
            "• **Exam Relevance for MPPSC & UPSC**: Highly essential for MPPSC Mains (Paper 3 Unit 7 & 10) and UPSC GS-3 Science & Tech coverage on indigenous AI infrastructure."
          ]),
          createTable(
            "table-pragya-quick-facts-en",
            "PARAM Pragya Supercomputer: Quick Facts",
            ["Parameter", "Details"],
            [
              ["**Facility Name**", "**PARAM Pragya AI Supercomputer**"],
              ["**Inauguration Date & Host**", "**August 8, 2026 by PM Narendra Modi**"],
              ["**Location**", "**IIT Delhi Sonipat Campus, Haryana**"],
              ["**Compute Capacity**", "**~250 AI Petaflops (PF) / 8 PF Conventional**"],
              ["**GPU Architecture**", "**400 NVIDIA A100 (80GB) Tensor Core GPUs**"],
              ["**Storage Capacity**", "**10 Petabytes (PB) Parallel File System**"],
              ["**Nodal Framework**", "**National Supercomputing Mission (NSM)**"],
              ["**Implementing Agency**", "**C-DAC (Pune) & IIT Delhi**"],
              ["**Project Cost**", "**₹135 Crore (₹110 Cr NSM + ₹25 Cr IIT Delhi)**"],
              ["**Open Access Policy**", "**40% capacity allocated to external researchers & startups**"]
            ]
          )
        ],
      },

      /* ── 2. Specifications & Architecture ────────────────────────── */
      {
        _key: "sec-specs-architecture",
        kind: "background",
        title: "परम प्रज्ञा: तकनीकी संरचना एवं विशेषताएँ (Specifications & Architecture)",
        titleEn: "PARAM Pragya: Technical Architecture & Key Specifications",
        body: [
          ...createBlocks([
            "**'परम प्रज्ञा'** को विशेष रूप से गहन एआई अनुसंधान (Deep AI Research), लार्ज लैंग्वेज मॉडल (LLM) ट्रेनिंग और जटिल वैज्ञानिक सिमुलेशन चलाने के उद्देश्य से डिजाइन किया गया है:",
            "### 1. 250 AI पेटाफ्लॉप्स कंप्यूटिंग क्षमता",
            "• **पेटाफ्लॉप (Petaflop) की परिभाषा**: 1 पेटाफ्लॉप का अर्थ है प्रति सेकंड **10^15 (1 quadrillion)** फ्लोटिंग-पॉइंट ऑपरेशन्स (FLOPs) निष्पादित करने की क्षमता।",
            "• **AI क्षमता**: परम प्रज्ञा एआई-विशिष्ट मिश्रित-सटीकता (Mixed Precision AI Computation) में **250 AI पेटाफ्लॉप्स** की अभूतपूर्व गति प्रदान करता है, जो इसे भारत के सबसे शक्तिशाली एआई सुपरकंप्यूटरों की श्रेणी में खड़ा करता है।",
            "### 2. 400 NVIDIA A100 GPUs का शक्तिशाली क्लस्टर",
            "• **हार्डवेयर सर्वर विन्यास**: इसमें 400 उच्च क्षमता वाले **NVIDIA A100 80GB Tensor Core GPUs** लगे हैं, जो हाई-स्पीड NVLink इंटरकनेक्ट के माध्यम से जुड़े हैं।",
            "• **पैरेलल प्रोसेसिंग**: यह सेटअप अरबों पैरामीटर वाले जटिल एआई मॉडलों को कुछ ही घंटों में प्रशिक्षित (Train) करने में सक्षम है।",
            "### 3. 10 पैटाबाइट पैरेलल फाइल सिस्टम",
            "• **डाटा स्टोरेज**: इसमें 10 PB (Petabytes) का हाई-स्पीड पैरेलल फाइल स्टोरेज सिस्टम दिया गया है, जो पेटराबाइट्स डाटा को नैनोसेकंड्स में रीड/राइट कर सकता है।",
            "### 4. हरित डाटा सेंटर एवं ऊर्जा दक्षता",
            "• **ऊर्जा खपत**: यह पूरा सुपरकंप्यूटिंग क्लस्टर लगभग **800 किलोवाट (kW)** ऊर्जा पर संचालित होता है और इसमें लिक्विड कूलिंग तकनीक का प्रयोग किया गया है जो ऊर्जा बर्बादी को न्यूनतम करती है।",
            "### 5. 40% खुला सार्वजनिक आवंटन (Democratization of Computing)",
            "• **ओपन एक्सेस नीति**: राष्ट्रीय सुपरकंप्यूटिंग मिशन के तहत 'परम प्रज्ञा' की **40% प्रोसेसिंग क्षमता** आईआईटी दिल्ली के बाहर के भारतीय शोधकर्ताओं, अन्य अकादमिक संस्थानों, सरकारी प्रयोगशालाओं और दीप-टेक स्टार्टअप्स के लिए उपलब्ध कराई जाएगी।"
          ]),
          {
            _key: "img-gpu-cluster",
            _type: "image",
            asset: { _type: "reference", _ref: assetGpu._id },
            alt: "NVIDIA A100 Tensor Core GPUs cluster powering PARAM Pragya supercomputer at IIT Delhi Sonipat",
            caption: "चित्र 2: 400 NVIDIA A100 80GB GPUs तथा हाई-स्पीड ऑप्टिकल इंटरकनेक्ट का क्लस्टर जो परम प्रज्ञा को 250 AI पेटाफ्लॉप्स की प्रोसेसिंग गति प्रदान करता है।"
          }
        ],
        bodyEn: [
          ...createBlocks([
            "**'PARAM Pragya'** has been custom-engineered for deep AI training, Large Language Models (LLMs), and compute-intensive scientific applications:",
            "### 1. 250 AI Petaflops Compute Power",
            "• **What is a Petaflop?**: One petaflop equals **10^15 (1 quadrillion)** floating-point operations per second.",
            "• **AI Performance**: Delivers **~250 AI Petaflops** of AI mixed-precision performance alongside **8 Petaflops** of conventional HPC compute.",
            "### 2. Cluster of 400 NVIDIA A100 GPUs",
            "• **Hardware Architecture**: Incorporates **400 NVIDIA A100 (80GB)** Tensor Core GPUs interconnected via ultra-high bandwidth NVLink fabrics.",
            "• **Deep Learning Efficiency**: Enables training of multi-billion parameter AI models at unprecedented speeds.",
            "### 3. 10 Petabytes Parallel Storage",
            "• **Data Subsystem**: Equipped with a **10 PB Parallel File System** allowing instantaneous multi-gigabyte data throughput across nodes.",
            "### 4. Green Data Center & Energy Efficiency",
            "• **Power Profile**: Operates within an optimized **800 kW** energy envelope utilizing advanced liquid cooling solutions to minimize carbon footprint.",
            "### 5. 40% External Research Access",
            "• **Democratizing AI Compute**: In line with NSM guidelines, **40% of compute cycles** are explicitly reserved for non-IIT Delhi scholars, research labs, and Indian deep-tech startups."
          ]),
          {
            _key: "img-gpu-cluster-en",
            _type: "image",
            asset: { _type: "reference", _ref: assetGpu._id },
            alt: "NVIDIA A100 Tensor Core GPUs cluster powering PARAM Pragya supercomputer",
            caption: "Figure 2: Cluster of 400 NVIDIA A100 GPUs providing high-throughput 250 AI Petaflops compute performance for PARAM Pragya."
          }
        ],
      },

      /* ── 3. History: PARAM 8000 to PARAM Pragya ────────────────── */
      {
        _key: "sec-history-journey",
        kind: "keyHighlights",
        title: "परम 8000 से परम प्रज्ञा तक: भारत की स्वदेशी सुपरकंप्यूटिंग यात्रा",
        titleEn: "India's Supercomputing Journey: From PARAM 8000 (1991) to PARAM Pragya (2026)",
        body: [
          ...createBlocks([
            "भारत की सुपरकंप्यूटिंग यात्रा वैज्ञानिकों के दृढ़ संकल्प, राजनीतिक इच्छाशक्ति और प्रौद्योगिकी में आत्मनिर्भरता (Self-reliance) की स्वर्णिम गाथा है:",
            "### 1. अमेरिका द्वारा 'क्र्रे (Cray)' सुपरकंप्यूटर देने से इंकार (1980s)",
            "• **पृष्ठभूमि**: 1980 के दशक के उत्तरार्ध में भारत सरकार (मौसम पूर्वानुमान हेतु) अमेरिका से **Cray X-MP** सुपरकंप्यूटर खरीदना चाहती थी।",
            "• **तकनीकी प्रतिबंध (Denied Access)**: अमेरिका ने यह आशंका जताते हुए कि भारत इसका उपयोग परमाणु हथियार डिजाइन करने में कर सकता है, भारत को सुपरकंप्यूटर बेचने से मना कर दिया।",
            "### 2. C-DAC का गठन एवं डॉ. विजय भटकर की भूमिका (1988)",
            "• **C-DAC की स्थापना**: 1988 में भारत सरकार ने पुणे में **सेंटर फॉर डेवलपमेंट ऑफ एडवांस्ड कंप्यूटिंग (C-DAC)** का गठन किया।",
            "• **भारतीय सुपरकंप्यूटिंग के जनक**: महान वैज्ञानिक **डॉ. विजय भटकर** के नेतृत्व में भारतीय इंजीनियरों ने स्वदेशी सुपरकंप्यूटर बनाने का बीड़ा उठाया।",
            "### 3. 'परम 8000' (PARAM 8000) का ऐतिहासिक निर्माण (1991)",
            "• **पहला स्वदेशी सुपरकंप्यूटर**: 1991 में C-DAC ने भारत का पहला सुपरकंप्यूटर **PARAM 8000** बनाकर पूरी दुनिया को चौंका दिया।",
            "• **लागत व वैश्विक निर्यात**: यह अमेरिका के क्रे सुपरकंप्यूटर से 28 गुना सस्ता था। भारत ने इसे जर्मनी, ब्रिटेन और रूस जैसे विकसित देशों को निर्यात भी किया।",
            "### 4. भारत के प्रमुख सुपरकंप्यूटिंग मील के पत्थर (Timeline of India's Supercomputers)",
            "• **PARAM 8000 (1991)**: 1 Gigaflop क्षमता वाला भारत का पहला सुपरकंप्यूटर।",
            "• **PARAM Padma (2002)**: 1 Teraflop (10^12 FLOPs) की सीमा पार करने वाला भारत का पहला सुपरकंप्यूटर।",
            "• **PARAM Yuva / Yuva II (2008-2013)**: ग्रीन कंप्यूटिंग में वैश्विक स्तर पर शीर्ष रैंक हासिल करने वाला सुपरकंप्यूटर।",
            "• **PARAM Shivay (2019)**: IIT BHU में स्थापित राष्ट्रीय सुपरकंप्यूटिंग मिशन (NSM) का प्रथम सुपरकंप्यूटर।",
            "• **PARAM Siddhi-AI (2020)**: 210 AI पेटाफ्लॉप्स क्षमता के साथ विश्व के TOP500 में 62वाँ स्थान प्राप्त करने वाला AI सुपरकंप्यूटर।",
            "• **AIRAWAT (2023)**: C-DAC पुणे में स्थापित एआई सुपरकंप्यूटर जिसने विश्व रैंकिंग में 75वाँ स्थान हासिल किया।",
            "• **PARAM Rudra (2024)**: पुणे, दिल्ली और कोलकाता में स्थापित उन्नत NSM सुपरकंप्यूटर सीरीज।",
            "• **PARAM Pragya (2026)**: 250 AI पेटाफ्लॉप्स क्षमता के साथ आईआईटी दिल्ली सोनीपत में स्थापित भारत की नवीनतम AI सुपरकंप्यूटिंग प्रणाली।"
          ]),
          {
            _key: "img-journey-timeline",
            _type: "image",
            asset: { _type: "reference", _ref: assetJourney._id },
            alt: "Timeline of India's Supercomputer Evolution from PARAM 8000 in 1991 to PARAM Pragya in 2026",
            caption: "चित्र 3: भारत की स्वदेशी सुपरकंप्यूटिंग विकास यात्रा — 1991 में परम 8000 से लेकर 2026 में परम प्रज्ञा AI सुपरकंप्यूटर तक का स्वर्णिम सफर।"
          }
        ],
        bodyEn: [
          ...createBlocks([
            "India's supercomputing saga is a shining testament to scientific perseverance, political resolve, and technological self-reliance:",
            "### 1. The 1980s US Technology Embargo (Cray Denial)",
            "• **Historical Background**: In the late 1980s, India sought to purchase a **Cray X-MP** supercomputer from the US for weather forecasting.",
            "• **Sanctions**: Fearing potential dual-use applications in nuclear research, the US government denied the export license to India.",
            "### 2. Establishment of C-DAC & Dr. Vijay Bhatkar (1988)",
            "• **Creation of C-DAC**: In response, the Government of India established **C-DAC (Centre for Development of Advanced Computing)** in Pune in 1988.",
            "• **Father of Indian Supercomputing**: Renowned scientist **Dr. Vijay Bhatkar** spearheaded the indigenous supercomputing mission.",
            "### 3. Launch of 'PARAM 8000' (1991)",
            "• **First Indigenous Supercomputer**: In 1991, C-DAC successfully unveiled **PARAM 8000**, surprising the global scientific community.",
            "• **Global Recognition**: Built at a fraction (1/28th) of the cost of a Cray machine, PARAM 8000 was exported to Germany, UK, and Russia.",
            "### 4. Key Milestones in India's Supercomputing History",
            "• **PARAM 8000 (1991)**: India's 1st indigenous supercomputer (1 Gigaflop speed).",
            "• **PARAM Padma (2002)**: First Indian system to break the 1 Teraflop barrier.",
            "• **PARAM Yuva / Yuva II (2008-2013)**: High-efficiency green supercomputers ranked globally.",
            "• **PARAM Shivay (2019)**: First supercomputer deployed under NSM at IIT BHU.",
            "• **PARAM Siddhi-AI (2020)**: Reached Rank 62 in TOP500 globally with 210 AI Petaflops.",
            "• **AIRAWAT (2023)**: C-DAC Pune's AI supercomputer ranked 75th globally.",
            "• **PARAM Rudra (2024)**: High-performance NSM nodes deployed across Pune, Delhi, and Kolkata.",
            "• **PARAM Pragya (2026)**: Latest 250 AI Petaflops flagship AI facility inaugurated at IIT Delhi Sonipat."
          ]),
          {
            _key: "img-journey-timeline-en",
            _type: "image",
            asset: { _type: "reference", _ref: assetJourney._id },
            alt: "Timeline of India's Supercomputer Evolution from PARAM 8000 in 1991 to PARAM Pragya in 2026",
            caption: "Figure 3: India's indigenous supercomputing evolution timeline — From PARAM 8000 (1991) to PARAM Pragya AI (2026)."
          }
        ],
      },

      /* ── 4. NSM Framework ────────────────────────────────────── */
      {
        _key: "sec-nsm-framework",
        kind: "analysis",
        title: "राष्ट्रीय सुपरकंप्यूटिंग मिशन (NSM) एवं C-DAC की भूमिका",
        titleEn: "National Supercomputing Mission (NSM) & Role of C-DAC",
        body: [
          ...createBlocks([
            "### राष्ट्रीय सुपरकंप्यूटिंग मिशन (NSM) क्या है?",
            "• **लॉन्च तिथि**: वर्ष **2015** में 7 वर्षों की अवधि के लिए (₹4,500 करोड़ के परिव्यय के साथ) लॉन्च किया गया।",
            "• **नोडल मंत्रालय**: विज्ञान एवं प्रौद्योगिकी विभाग (**DST**) तथा इलेक्ट्रॉनिक्स और सूचना प्रौद्योगिकी मंत्रालय (**MeitY**)।",
            "• **कार्यान्वयन एजेंसियाँ**: सेंटर फॉर डेवलपमेंट ऑफ एडवांस्ड कंप्यूटिंग (**C-DAC**, पुणे) तथा भारतीय विज्ञान संस्थान (**IISc**, बेंगलुरु)।",
            "• **मुख्य उद्देश्य**: देश भर के अकादमिक और शोध संस्थानों को एक राष्ट्रीय हाई-परफॉर्मेंस कंप्यूटिंग (HPC) ग्रिड से जोड़ना तथा सुपरकंप्यूटरों का स्वदेशी विनिर्माण करना।",
            "### NSM के 3 विकास चरण (Phases of NSM)",
            "• **चरण-1 (Phase 1)**: विदेशों से आयातित उपकरणों से सुपरकंप्यूटरों का असेंबलिंग करना।",
            "• **चरण-2 (Phase 2)**: मदरबोर्ड, कैबिनेट और कूलिंग सिस्टम का भारत में ही विनिर्माण करना (जैसे 'परम शक्ति', 'परम गंगा')।",
            "• **चरण-3 (Phase 3)**: पूर्ण स्वदेशी प्रोसेसर, रुद्र (Rudra) सर्वर बोर्ड और त्रिनेत्र (Trinetra) हाई-स्पीड इंटरकनेक्ट का उपयोग करके पूरी तरह से 'मेड इन इंडिया' सुपरकंप्यूटर तैयार करना।"
          ])
        ],
        bodyEn: [
          ...createBlocks([
            "### What is National Supercomputing Mission (NSM)?",
            "• **Launch Year**: Launched in **2015** with a total outlay of ₹4,500 Crore to bolster India's HPC infrastructure.",
            "• **Nodal Ministries**: Jointly driven by Department of Science & Technology (**DST**) and Ministry of Electronics & IT (**MeitY**).",
            "• **Executing Entities**: Centre for Development of Advanced Computing (**C-DAC**) and Indian Institute of Science (**IISc** Bengaluru).",
            "• **Core Mandate**: Connecting academic and scientific institutions via the National Knowledge Network (NKN) HPC grid.",
            "### The 3 Phases of NSM",
            "• **Phase 1**: Assembling supercomputing systems using imported components.",
            "• **Phase 2**: Manufacturing motherboards, chassis, and liquid-cooling hardware domestically.",
            "• **Phase 3**: Developing 100% indigenous supercomputers utilizing India's own **Rudra** server platforms and **Trinetra** interconnects."
          ])
        ],
      },

      /* ── 5. Applications & Significance ──────────────────────── */
      {
        _key: "sec-applications",
        kind: "keyHighlights",
        title: "'परम प्रज्ञा' के प्रमुख अनुप्रयोग एवं सामरिक महत्व",
        titleEn: "Applications & Strategic Significance of PARAM Pragya",
        body: [
          ...createBlocks([
            "परम प्रज्ञा केवल एक गणनात्मक मशीन नहीं है, बल्कि यह भारत के सामाजिक-आर्थिक और वैज्ञानिक विकास का आधार स्तंभ है:",
            "### 1. भाषिणी (Bhashini) एवं भारतीय भाषा AI मॉडल (Indic Multilingual AI)",
            "• **भारतीय भाषाओं में AI**: भारत की विविध भाषाओं में प्राकृतिक भाषा प्रसंस्करण (NLP) और वॉयस AI विकसित करने के लिए बड़े AI मॉडलों को प्रशिक्षित किया जाएगा।",
            "### 2. सटीक स्वास्थ्य सेवा एवं औषधि खोज (Precision Healthcare & Drug Discovery)",
            "• **ड्रग डिजाइनिंग**: जीनोमिक्स डाटा का विश्लेषण, कैंसर और संक्रामक रोगों के लिए नई दवाओं का त्वरित वर्चुअल सिम्यूलेशन।",
            "### 3. मानसून व जलवायु पूर्वानुमान (Monsoon & Weather Prediction)",
            "• **कृषि सहायता**: भारतीय मौसम विज्ञान विभाग (IMD) के लिए मानसून के सटीक मॉडल और चक्रवात की सटीक पूर्व चेतावनी प्रणाली।",
            "### 4. आपदा प्रबंधन एवं उपग्रह डाटा प्रोसेसिंग (Disaster Management)",
            "• **ISRO सहायता**: इसरो के उपग्रह डाटा का तीव्र विश्लेषण, बाढ़, भूस्खलन व भूकंप की पूर्व चेतावनी।",
            "### 5. रोबोटिक्स, रक्षा एवं क्वांटम सिमुलेशन (Robotics & Quantum Research)",
            "• **सामरिक क्षमता**: रक्षा अनुसंधान (DRDO) और एरोडायनामिक्स सिमुलेशन को तीव्र गति प्रदान करना।"
          ])
        ],
        bodyEn: [
          ...createBlocks([
            "PARAM Pragya serves as a vital catalyst across multiple national priority domains:",
            "### 1. Indic AI & Bhashini Multilingual Models",
            "• **Language Inclusion**: Trains foundational AI models for Indian languages under Digital India's **Bhashini** initiative.",
            "### 2. Healthcare & Accelerated Drug Discovery",
            "• **Biomedical Research**: Rapid genomic sequencing analysis and molecular docking simulations for targeted therapeutics.",
            "### 3. Climate Science & Monsoon Dynamics",
            "• **Meteorology**: Enhances high-resolution weather forecasting and climate change modeling for Indian agriculture.",
            "### 4. Space & Satellite Image Processing",
            "• **ISRO Earth Observation**: Real-time satellite imagery analysis for disaster response and natural resource mapping.",
            "### 5. Defense, Robotics & Quantum Mechanics",
            "• **Strategic Applications**: Supports advanced computational fluid dynamics (CFD) for aerospace and defense research."
          ])
        ],
      },

      /* ── 6. MPPSC & UPSC Quick Revision ──────────────────────── */
      {
        _key: "sec-revision-notes",
        kind: "conclusion",
        title: "MPPSC & UPSC परीक्षा हेतु महत्वपूर्ण रिवीजन पॉइंट्स (Quick Exam Revision)",
        titleEn: "Quick Revision Points for MPPSC & UPSC Examinations",
        body: [
          ...createBlocks([
            "### MPPSC एवं UPSC प्रारंभिक परीक्षा के लिए मुख्य तथ्य",
            "• **भारत का पहला सुपरकंप्यूटर** → **PARAM 8000 (1991 में C-DAC द्वारा निर्मित)**",
            "• **भारतीय सुपरकंप्यूटिंग के जनक** → **डॉ. विजय भटकर (Dr. Vijay Bhatkar)**",
            "• **C-DAC का मुख्यालय** → **पुणे, महाराष्ट्र**",
            "• **परम प्रज्ञा का स्थान** → **आईआईटी दिल्ली, सोनीपत कैंपस (हरियाणा)**",
            "• **परम प्रज्ञा की क्षमता** → **250 AI पेटाफ्लॉप्स (400 NVIDIA A100 GPUs)**",
            "• **राष्ट्रीय सुपरकंप्यूटिंग मिशन की शुरुआत** → **वर्ष 2015 (DST एवं MeitY का संयुक्त मिशन)**",
            "• **भारत का पहला AI सुपरकंप्यूटर** → **PARAM Siddhi-AI (2020)**",
            "• **वैश्विक सुपरकंप्यूटर रैंकिंग सूची** → **TOP500 List (वर्ष में दो बार जारी होती है)**",
            "### महत्वपूर्ण शब्दावली व संक्षिप्त नाम (Crucial Abbreviations)",
            "• **C-DAC**: **Centre for Development of Advanced Computing**",
            "• **HPC**: **High-Performance Computing**",
            "• **NSM**: **National Supercomputing Mission**",
            "• **Petaflop**: **10^15 Operations Per Second (FLOPs)**",
            "• **FLOPs**: **Floating-Point Operations Per Second**",
            "• **DST**: **Department of Science & Technology**",
            "• **MeitY**: **Ministry of Electronics and Information Technology**",
            "### MPPSC मुख्य परीक्षा (Paper-3 Unit-7/10) उत्तर लेखन बूस्टर",
            "**\"परम 8000 (1991) से परम प्रज्ञा (2026) तक भारत का सफर केवल कंप्यूटिंग क्षमता का विस्तार नहीं है, बल्कि यह विदेशी तकनीकी निर्भरता को तोड़कर 'आत्मनिर्भर भारत' और 'एआई फॉर ऑल' (AI for All) के संकल्प को साकार करने का राष्ट्रीय प्रतीक है।\"**"
          ])
        ],
        bodyEn: [
          ...createBlocks([
            "### High-Yield Facts for MPPSC & UPSC Prelims",
            "• **India's First Supercomputer** → **PARAM 8000 (Built by C-DAC in 1991)**",
            "• **Father of Indian Supercomputing** → **Dr. Vijay Bhatkar**",
            "• **C-DAC Headquarters** → **Pune, Maharashtra**",
            "• **PARAM Pragya Location** → **IIT Delhi Sonipat Campus, Haryana**",
            "• **PARAM Pragya Compute Capacity** → **~250 AI Petaflops (400 NVIDIA A100 GPUs)**",
            "• **National Supercomputing Mission Launch** → **2015 (Joint DST & MeitY initiative)**",
            "• **India's 1st Dedicated AI Supercomputer** → **PARAM Siddhi-AI (2020)**",
            "• **Global Supercomputer Ranking** → **TOP500 List (Published biannually)**",
            "### Crucial Abbreviations",
            "• **C-DAC**: **Centre for Development of Advanced Computing**",
            "• **HPC**: **High-Performance Computing**",
            "• **NSM**: **National Supercomputing Mission**",
            "• **Petaflop**: **10^15 Operations Per Second**",
            "• **FLOPs**: **Floating-Point Operations Per Second**",
            "### Mains Answer Writing Booster Capsule",
            "**\"India's trajectory from PARAM 8000 (1991) to PARAM Pragya (2026) represents a transition from technological denial to self-reliant AI dominance, cementing India's stature as a global leader in High-Performance Computing and indigenous AI infrastructure.\"**"
          ])
        ],
      }
    ],

    /* ─── MCQs ──────────────────────────────────────────────── */
    mcqs: [
      {
        question: "हाल ही में अगस्त 2026 में उद्घाटन किए गए AI सुपरकंप्यूटर 'परम प्रज्ञा' (PARAM Pragya) को कहाँ स्थापित किया गया है?",
        questionEn: "Where has the AI supercomputer 'PARAM Pragya', inaugurated in August 2026, been established?",
        options: [
          "A. आईआईटी खड़गपुर",
          "B. आईआईटी दिल्ली (सोनीपत कैंपस)",
          "C. आईआईएससी बेंगलुरु",
          "D. सी-डैक पुणे"
        ],
        optionsEn: [
          "A. IIT Kharagpur",
          "B. IIT Delhi (Sonipat Campus)",
          "C. IISc Bengaluru",
          "D. C-DAC Pune"
        ],
        correctIndex: 1,
        explanation: "8 अगस्त 2026 को प्रधानमंत्री नरेंद्र मोदी ने आईआईटी दिल्ली के सोनीपत कैंपस (हरियाणा) में 'परम प्रज्ञा' AI सुपरकंप्यूटर का उद्घाटन किया।",
        explanationEn: "On August 8, 2026, PM Narendra Modi inaugurated the 'PARAM Pragya' AI supercomputer at IIT Delhi's Sonipat Campus in Haryana."
      },
      {
        question: "परम प्रज्ञा (PARAM Pragya) सुपरकंप्यूटर की कुल एआई कंप्यूटिंग क्षमता (AI Compute Capacity) कितनी है?",
        questionEn: "What is the total AI compute capacity of the PARAM Pragya supercomputer?",
        options: [
          "A. 100 AI पेटाफ्लॉप्स",
          "B. 150 AI पेटाफ्लॉप्स",
          "C. 250 AI पेटाफ्लॉप्स",
          "D. 500 AI पेटाफ्लॉप्स"
        ],
        optionsEn: [
          "A. 100 AI Petaflops",
          "B. 150 AI Petaflops",
          "C. 250 AI Petaflops",
          "D. 500 AI Petaflops"
        ],
        correctIndex: 2,
        explanation: "परम प्रज्ञा सुपरकंप्यूटर में 400 NVIDIA A100 GPUs लगे हैं जो इसे लगभग 250 AI पेटाफ्लॉप्स की प्रसंस्करण क्षमता प्रदान करते हैं।",
        explanationEn: "PARAM Pragya is equipped with 400 NVIDIA A100 GPUs delivering approximately 250 AI Petaflops of computational capacity."
      },
      {
        question: "भारत का पहला स्वदेशी सुपरकंप्यूटर 'परम 8000' (PARAM 8000) किस वर्ष लॉन्च किया गया था?",
        questionEn: "In which year was India's first indigenous supercomputer 'PARAM 8000' launched?",
        options: ["A. 1988", "B. 1991", "C. 1995", "D. 1998"],
        optionsEn: ["A. 1988", "B. 1991", "C. 1995", "D. 1998"],
        correctIndex: 1,
        explanation: "C-DAC ने वर्ष 1991 में डॉ. विजय भटकर के नेतृत्व में भारत का पहला स्वदेशी सुपरकंप्यूटर PARAM 8000 विकसित किया था।",
        explanationEn: "C-DAC developed India's first indigenous supercomputer PARAM 8000 in 1991 under the leadership of Dr. Vijay Bhatkar."
      },
      {
        question: "भारत में 'सुपरकंप्यूटिंग के जनक' (Father of Indian Supercomputing) के रूप में किसे जाना जाता है?",
        questionEn: "Who is known as the 'Father of Indian Supercomputing'?",
        options: [
          "A. डॉ. ए.पी.जे. अब्दुल कलाम",
          "B. डॉ. होमी जहांगीर भाभा",
          "C. डॉ. विजय भटकर",
          "D. प्रो. यू.आर. राव"
        ],
        optionsEn: [
          "A. Dr. A.P.J. Abdul Kalam",
          "B. Dr. Homi Jehangir Bhabha",
          "C. Dr. Vijay Bhatkar",
          "D. Prof. U.R. Rao"
        ],
        correctIndex: 2,
        explanation: "डॉ. विजय भटकर ने 1988 में C-DAC की स्थापना के बाद भारत के पहले सुपरकंप्यूटर PARAM 8000 के विकास का नेतृत्व किया था, इसलिए उन्हें भारत में सुपरकंप्यूटिंग का जनक कहा जाता है।",
        explanationEn: "Dr. Vijay Bhatkar led the development of India's first supercomputer PARAM 8000 at C-DAC, earning him the title of Father of Indian Supercomputing."
      },
      {
        question: "राष्ट्रीय सुपरकंप्यूटिंग मिशन (NSM) की शुरुआत किस वर्ष की गई थी?",
        questionEn: "In which year was the National Supercomputing Mission (NSM) launched?",
        options: ["A. 2010", "B. 2012", "C. 2015", "D. 2018"],
        optionsEn: ["A. 2010", "B. 2012", "C. 2015", "D. 2018"],
        correctIndex: 2,
        explanation: "राष्ट्रीय सुपरकंप्यूटिंग मिशन (NSM) को 2015 में DST और MeitY द्वारा संयुक्त रूप से ₹4,500 करोड़ के बजट के साथ शुरू किया गया था।",
        explanationEn: "The National Supercomputing Mission (NSM) was launched in 2015 as a joint initiative of DST and MeitY with a total outlay of ₹4,500 Crore."
      },
      {
        question: "परम प्रज्ञा (PARAM Pragya) सुपरकंप्यूटर की कुल कंप्यूटिंग क्षमता का कितना प्रतिशत हिस्सा बाहरी शोधकर्ताओं और स्टार्टअप्स के लिए आरक्षित किया गया है?",
        questionEn: "What percentage of PARAM Pragya's total computing capacity has been reserved for external researchers and startups?",
        options: ["A. 20%", "B. 30%", "C. 40%", "D. 50%"],
        optionsEn: ["A. 20%", "B. 30%", "C. 40%", "D. 50%"],
        correctIndex: 2,
        explanation: "सुपरकंप्यूटिंग क्षमता का लोकतंत्रीकरण करने के लिए परम प्रज्ञा की 40% क्षमता आईआईटी दिल्ली के बाहर के शोधकर्ताओं व स्टार्टअप्स हेतु आरक्षित रखी गई है।",
        explanationEn: "To democratize supercomputing access, 40% of PARAM Pragya's compute capacity is explicitly reserved for external scholars and deep-tech startups."
      },
      {
        question: "C-DAC (सेंटर फॉर डेवलपमेंट ऑफ एडवांस्ड कंप्यूटिंग) का मुख्यालय कहाँ स्थित है?",
        questionEn: "Where is the headquarters of C-DAC (Centre for Development of Advanced Computing) located?",
        options: ["A. नई दिल्ली", "B. बेंगलुरु", "C. पुणे", "D. हैदराबाद"],
        optionsEn: ["A. New Delhi", "B. Bengaluru", "C. Pune", "D. Hyderabad"],
        correctIndex: 2,
        explanation: "C-DAC की स्थापना 1988 में हुई थी और इसका मुख्यालय पुणे, महाराष्ट्र में स्थित है।",
        explanationEn: "C-DAC was established in 1988 and its central headquarters is situated in Pune, Maharashtra."
      },
      {
        question: "1 पेटाफ्लॉप (1 Petaflop) का अर्थ प्रति सेकंड कितने फ्लोटिंग-पॉइंट ऑपरेशन्स (FLOPs) निष्पादित करने की क्षमता है?",
        questionEn: "1 Petaflop represents the capability to perform how many Floating-Point Operations per second?",
        options: ["A. 10^12 FLOPs", "B. 10^15 FLOPs", "C. 10^18 FLOPs", "D. 10^21 FLOPs"],
        optionsEn: ["A. 10^12 FLOPs", "B. 10^15 FLOPs", "C. 10^18 FLOPs", "D. 10^21 FLOPs"],
        correctIndex: 1,
        explanation: "1 पेटाफ्लॉप बराबर 10^15 (1 क्वाड्रिलियन) फ्लोटिंग-पॉइंट ऑपरेशन्स प्रति सेकंड होता है। (जबकि 1 टेराफ्लॉप = 10^12 और 1 एग्जाफ्लॉप = 10^18 होता है)।",
        explanationEn: "1 Petaflop equals 10^15 (1 quadrillion) floating-point operations per second. (1 Teraflop = 10^12 and 1 Exaflop = 10^18)."
      }
    ],

    /* ─── FAQs ──────────────────────────────────────────────── */
    faqs: [
      {
        question: "'परम प्रज्ञा' (PARAM Pragya) क्या है और इसका उद्घाटन किसने किया?",
        questionEn: "What is 'PARAM Pragya' and who inaugurated it?",
        answer: "परम प्रज्ञा 250 AI पेटाफ्लॉप्स क्षमता वाला भारत का अत्याधुनिक AI सुपरकंप्यूटर है, जिसका उद्घाटन प्रधानमंत्री नरेंद्र मोदी ने 8 अगस्त 2026 को आईआईटी दिल्ली के सोनीपत कैंपस में किया।",
        answerEn: "PARAM Pragya is India's advanced 250 AI Petaflops supercomputer, inaugurated by PM Narendra Modi on August 8, 2026, at IIT Delhi's Sonipat Campus."
      },
      {
        question: "भारत का पहला सुपरकंप्यूटर कौन-सा था और इसे किसने बनाया था?",
        questionEn: "Which was India's first supercomputer and who built it?",
        answer: "भारत का पहला स्वदेशी सुपरकंप्यूटर 'PARAM 8000' था, जिसे 1991 में डॉ. विजय भटकर के नेतृत्व में C-DAC (पुणे) द्वारा विकसित किया गया था।",
        answerEn: "India's first indigenous supercomputer was 'PARAM 8000', developed by C-DAC Pune in 1991 under the guidance of Dr. Vijay Bhatkar."
      },
      {
        question: "राष्ट्रीय सुपरकंप्यूटिंग मिशन (NSM) का मुख्य उद्देश्य क्या है?",
        questionEn: "What is the main objective of the National Supercomputing Mission (NSM)?",
        answer: "NSM का उद्देश्य देश के वैज्ञानिक संस्थानों को एक उच्च-प्रदर्शन कंप्यूटिंग ग्रिड से जोड़ना तथा 'मेड इन इंडिया' सुपरकंप्यूटरों का स्वदेशी विनिर्माण करना है।",
        answerEn: "The primary goal of NSM is to connect research institutions via a high-performance national computing grid and foster domestic supercomputer manufacturing."
      }
    ],

    /* ─── Sources ────────────────────────────────────────────── */
    sources: [
      { label: "C-DAC Official Portal", url: "https://cdac.in" },
      { label: "IIT Delhi Official News Release", url: "https://home.iitd.ac.in" },
      { label: "National Supercomputing Mission (NSM)", url: "https://nsmpact.in" }
    ]
  };

  const fullDoc = {
    ...article,
    date: article.publishedAt,
  };

  try {
    const resCa = await client.createOrReplace(fullDoc);
    console.log("✨ Successfully published Current Affairs document to Sanity:", resCa._id);

    console.log("📌 Upserting staticGk document for feeds...");
    const gkDoc = {
      ...fullDoc,
      _id: "gk-param-pragya-ai-supercomputer",
      _type: "staticGk",
    };
    const resGk = await client.createOrReplace(gkDoc);
    console.log("✨ Successfully published Static GK document to Sanity:", resGk._id);

  } catch (err) {
    console.error("❌ Failed to create/replace document in Sanity:", err);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("❌ Error running script:", err);
  process.exit(1);
});
