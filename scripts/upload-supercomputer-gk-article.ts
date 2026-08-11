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
  console.log("🚀 Starting upload process for Supercomputer Complete Guide Article...");

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
    featured: path.resolve(process.cwd(), "public/images/blog/supercomputer-overview-featured.png"),
    cpus: path.resolve(process.cwd(), "public/images/blog/supercomputer-architecture-cpus.png"),
    apps: path.resolve(process.cwd(), "public/images/blog/supercomputer-applications-scitech.png"),
  };

  // Check if files exist
  if (
    !fs.existsSync(imagePaths.featured) ||
    !fs.existsSync(imagePaths.cpus) ||
    !fs.existsSync(imagePaths.apps)
  ) {
    console.error("❌ Required images not found in public/images/blog/");
    process.exit(1);
  }

  // Upload Images
  console.log("📸 Uploading featured image...");
  const assetFeatured = await client.assets.upload("image", fs.createReadStream(imagePaths.featured), {
    filename: "supercomputer_overview_featured.png",
  });
  console.log(`✔ Uploaded featured image. Asset ID: ${assetFeatured._id}`);

  console.log("📸 Uploading CPUs architecture image...");
  const assetCpus = await client.assets.upload("image", fs.createReadStream(imagePaths.cpus), {
    filename: "supercomputer_architecture_cpus.png",
  });
  console.log(`✔ Uploaded CPUs architecture image. Asset ID: ${assetCpus._id}`);

  console.log("📸 Uploading applications image...");
  const assetApps = await client.assets.upload("image", fs.createReadStream(imagePaths.apps), {
    filename: "supercomputer_applications_scitech.png",
  });
  console.log(`✔ Uploaded applications image. Asset ID: ${assetApps._id}`);

  // Construct the Article document
  const article = {
    _id: "gk-supercomputer-what-is-supercomputing-guide",
    _type: "staticGk",
    slug: { _type: "slug", current: "supercomputer-what-is-supercomputing-history-india-mppsc-notes" },
    title: "MPPSC & UPSC विशेष: सुपरकंप्यूटर क्या है? उपयोग, विशेषताएँ, इतिहास और भारत के प्रमुख सुपरकंप्यूटर (Complete Supercomputer Study Notes)",
    titleEn: "Supercomputers: What is Supercomputing? Uses, Features, Global History & India's Major Supercomputers | MPPSC & UPSC Notes",
    excerpt: "सुपरकंप्यूटर (Supercomputer) उच्च-प्रदर्शन वाले कंप्यूटर हैं जो FLOPS में जटिल गणनाएँ करते हैं। भारत में Cray X-MP प्रतिबंध (1987) के बाद C-DAC, PARAM शृंखला (PARAM 8000), NSM (2015) से लेकर नवीनतम AIRAWAT, PARAM Siddhi-AI एवं PARAM Pragya तक का विस्तृत संपूर्ण विश्लेषण।",
    excerptEn: "Supercomputers are high-performance computing systems measured in FLOPS. Comprehensive study guide covering multi-CPU architecture, global history (Cray-1, Roadrunner, LineShine), C-DAC PARAM series, National Supercomputing Mission (NSM), AIRAWAT, and latest PARAM Pragya AI supercomputer.",
    ca_date: "2026-08-11",
    publishedAt: new Date().toISOString(),
    featured: true,
    readingTime: 8,
    keywords: [
      "Supercomputer study notes MPPSC",
      "What is Supercomputer FLOPS",
      "PARAM 8000 C-DAC history",
      "National Supercomputing Mission NSM 2015",
      "AIRAWAT PARAM Siddhi AI",
      "LineShine Frontier El Capitan Fugaku",
      "PARAM Pragya AI Supercomputer",
      "MPPSC Science & Technology Paper 3 Unit 7",
      "MPPSC Paper 3 Unit 10 Computing",
      "UPSC GS 3 Supercomputing",
      "Vector Arithmetic Multi CPU Supercomputer",
      "BARC Anupam C-DOT CHIPPS ANURAG PACE",
      "सुपरकंप्यूटर क्या है",
      "परम 8000",
      "राष्ट्रीय सुपरकंप्यूटिंग मिशन"
    ],
    category: { _type: "reference", _ref: "cat-scitech" },
    author: { _type: "reference", _ref: "author-aakar" },
    nextArticle: { _type: "reference", _ref: "ca-param-pragya-ai-supercomputer" },
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
      alt: "उच्च-प्रदर्शन सुपरकंप्यूटर सर्वर क्लस्टर डाटा सेंटर — सुपरकंप्यूटिंग अध्ययन नोट्स | MPPSC & UPSC Notes",
      caption: "चित्र 1: सुपरकंप्यूटर (Supercomputer) — FLOPS क्षमता, समानांतर प्रसंस्करण (Parallel Processing) एवं उच्च-प्रदर्शन कंप्यूटिंग (HPC) डाटा सेंटर।",
    },

    /* ─── SECTIONS ──────────────────────────────────────────────── */
    sections: [
      /* ── 1. What is Supercomputer & Overview ──────────────────── */
      {
        _key: "sec-overview",
        kind: "whyInNews",
        title: "सुपरकंप्यूटर क्या है? (What is a Supercomputer?)",
        titleEn: "What is a Supercomputer? Overview & Performance Metrics",
        body: [
          ...createBlocks([
            "**सुपरकंप्यूटर (Supercomputer)** ऐसे उच्च-प्रदर्शन (High-Performance) वाले कंप्यूटर हैं, जिन्हें अत्यंत जटिल और बड़े पैमाने की गणनाओं (Large-Scale Complex Computation) को बहुत तेज गति से निष्पादित करने के लिए विशेष रूप से डिज़ाइन किया जाता है। इनकी कंप्यूटिंग क्षमता सामान्य व्यक्तिगत कंप्यूटरों (Personal Computers) की तुलना में लाखों गुना अधिक होती है।",
            "• **प्रदर्शन की इकाई (Unit of Performance)**: सुपरकंप्यूटर की कार्यक्षमता एवं गति को **FLOPS (Floating-Point Operations Per Second)** में मापा जाता है। FLOPS यह दर्शाता है कि कोई सिस्टम प्रति सेकंड कितनी दशमलव (Floating-Point) गणितीय गणनाएँ कर सकता है।",
            "• **समानांतर प्रसंस्करण (Parallel Processing)**: सुपरकंप्यूटर में सैकड़ों व हजारों CPU तथा GPU प्रोसेसिंग यूनिट्स मिलकर कार्य करती हैं। किसी बड़े जटिल कार्य को छोटे-छोटे स्वतंत्र भागों में विभाजित करके एक साथ प्रोसेस (Parallel Processing) किया जाता है, जिससे बहुत कम समय में विशाल गणना संभव होती है।",
            "• **विशिष्ट उद्देश्य हेतु उपयोग (Specialized Applications)**: सामान्य गणना के अलावा विशेष कार्यों हेतु भी सुपरकंप्यूटर बनाए जाते हैं। उदाहरण के रूप में **Belle, Hydra और Deep Blue** जैसे सुपरकंप्यूटरों का उपयोग ग्रैंडमास्टर स्तर के शतरंज खेलने हेतु किया गया था।",
            "• **MPPSC व UPSC महत्व**: MPPSC मुख्य परीक्षा (पेपर-3 इकाई-7 व 10 - सूचना व संचार प्रौद्योगिकी) एवं UPSC प्रारंभिक परीक्षा हेतु सुपरकंप्यूटिंग की अवधारणा, FLOPS, NSM तथा भारत के सुपरकंप्यूटर अत्यंत महत्वपूर्ण विषय हैं।"
          ]),
          createTable(
            "table-supercomputer-quick-facts-hi",
            "क्विक फैक्ट्स: सुपरकंप्यूटर (Quick Facts: Supercomputer)",
            ["विवरण (Parameter)", "जानकारी (Details)"],
            [
              ["**प्रदर्शन की मापक इकाई (Unit)**", "**FLOPS (Floating-Point Operations Per Second)**"],
              ["**मुख्य तकनीकी विशेषता**", "**अत्यधिक उच्च कंप्यूटेशन गति एवं समानांतर प्रसंस्करण**"],
              ["**प्रोसेसिंग आर्किटेक्चर**", "**Multiple CPUs / Processing Units / Tensor GPUs**"],
              ["**भारत का प्रमुख कार्यक्रम**", "**राष्ट्रीय सुपरकंप्यूटिंग मिशन (National Supercomputing Mission - NSM)**"],
              ["**NSM की घोषणा व बजट**", "**2015 (₹4,500 करोड़ / $730 Million)**"],
              ["**प्रमुख कार्यान्वयन एजेंसियाँ**", "**C-DAC (पुणे) और IISc (बेंगलुरु)**"],
              ["**भारत की PARAM शृंखला**", "**C-DAC द्वारा विकसित स्वदेशी सुपरकंप्यूटर श्रृंखला**"],
              ["**PARAM 8000 लॉन्च**", "**1991 (भारत का पहला स्वदेशी सुपरकंप्यूटर)**"],
              ["**PARAM 9000 शृंखला**", "**1993 (Peak Compute Power: 5 GFLOPS)**"],
              ["**PARAM 10000 शृंखला**", "**1998 (Sustained Performance: 38 GFLOPS)**"],
              ["**भारत के प्रमुख शीर्ष सुपरकंप्यूटर**", "**AIRAWAT, PARAM Siddhi-AI, Pratyush, Mihir, PARAM Pragya**"]
            ]
          )
        ],
        bodyEn: [
          ...createBlocks([
            "**Supercomputers** are high-performance computing systems explicitly engineered to process extremely complex, large-scale mathematical computations at extraordinary speeds. Their computational capacity exceeds standard commercial personal computers by several orders of magnitude.",
            "• **Performance Metric**: The computational speed of a supercomputer is measured in **FLOPS (Floating-Point Operations Per Second)**, representing the number of floating-point arithmetic calculations executed per second.",
            "• **Parallel Processing Architecture**: Employs thousands of interconnected CPUs and GPU processing units operating simultaneously. Large computational workloads are decomposed into smaller sub-tasks processed in parallel.",
            "• **Specialized Purpose Computers**: Apart from general scientific research, specialized supercomputers have been developed for targeted tasks—such as **Belle, Hydra, and Deep Blue** designed for playing grandmaster chess.",
            "• **MPPSC & UPSC Exam Relevance**: Vital for MPPSC Mains (Paper 3 Unit 7 & 10 - ICT) and UPSC GS-3 Science & Technology syllabus."
          ]),
          createTable(
            "table-supercomputer-quick-facts-en",
            "Quick Facts: Supercomputer",
            ["Parameter", "Details"],
            [
              ["**Unit of Performance**", "**FLOPS (Floating-Point Operations Per Second)**"],
              ["**Core Characteristic**", "**High Computation Speed & Parallel Processing**"],
              ["**Processing Architecture**", "**Multiple CPUs / Processing Units / GPUs**"],
              ["**India's Flagship Program**", "**National Supercomputing Mission (NSM)**"],
              ["**NSM Announcement**", "**2015 (Outlay: ₹4,500 Crore / $730 Million)**"],
              ["**Implementing Agencies**", "**C-DAC (Pune) & IISc (Bengaluru)**"],
              ["**India's PARAM Series**", "**Indigenous Supercomputer Series developed by C-DAC**"],
              ["**PARAM 8000 Launch**", "**1991 (India's First Indigenous Supercomputer)**"],
              ["**PARAM 9000 Series**", "**1993 (Peak Computing Power: 5 GFLOPS)**"],
              ["**PARAM 10000 Series**", "**1998 (Sustained Performance: 38 GFLOPS)**"],
              ["**India's Major Supercomputers**", "**AIRAWAT, PARAM Siddhi-AI, Pratyush, Mihir, PARAM Pragya**"]
            ]
          )
        ],
      },

      /* ── 2. Features of Supercomputers ────────────────────────── */
      {
        _key: "sec-features",
        kind: "background",
        title: "सुपरकंप्यूटर की प्रमुख विशेषताएँ (Key Features of Supercomputers)",
        titleEn: "Key Features & Architectural Characteristics of Supercomputers",
        body: [
          ...createBlocks([
            "सुपरकंप्यूटर की मुख्य तकनीकी विशेषताएँ निम्नलिखित हैं जो इन्हें सामान्य कंप्यूटरों से अलग बनाती हैं:",
            "### 1. मल्टीपल सीपीयूस (Multiple CPUs)",
            "• **संरचना**: सुपरकंप्यूटर में एक से अधिक (हजारों) CPU होते हैं। प्रत्येक CPU प्रोग्राम के निर्देशों को समझने तथा अरिथमेटिक और लॉजिकल ऑपरेशन्स (Arithmetic & Logical Operations) को निष्पादित करने का कार्य करता है।",
            "### 2. अत्यधिक गति (Extreme Speed / High Computation Speed)",
            "• **उच्च गति**: सुपरकंप्यूटर की सबसे महत्वपूर्ण विशेषता इसकी High Computation Speed है। कई प्रोसेसर्स एक साथ कार्य करके बड़े गणनात्मक कार्यों (Computational Tasks) को नैनोसेकंड्स में पूरा करते हैं।",
            "### 3. उच्च भंडारण क्षमता (High Storage Capacity)",
            "• **विशाल स्टोरेज**: सुपरकंप्यूटर में पेराबाइट्स एवं पेटाबाइट्स की Storage Capacity होती है। उच्च गति की गणना के लिए संचित डाटा और निर्देशों को उच्च बैंडविड्थ पर तेजी से एक्सेस/रिट्रीव (Retrieve) करना आवश्यक होता है।",
            "### 4. वेक्टर अरिथमेटिक (Vector Arithmetic)",
            "• **एरे प्रोसेसिंग**: Vector Arithmetic की सहायता से सुपरकंप्यूटर केवल दो अकेली संख्याओं की जगह संख्याओं की पूरी सूचियों (Arrays/Vector Pairs) पर एक साथ ऑपरेशन्स निष्पादित कर सकते हैं।",
            "### 5. मल्टी-यूजर सिस्टम (Multi-User System)",
            "• **साझा संसाधन**: एक सुपरकंप्यूटर पर एक ही समय में Multiple Users (हजारों शोधकर्ता) एक साथ सुपरकंप्यूटिंग रिसोर्सेज का उपयोग कर सकते हैं।"
          ]),
          {
            _key: "img-cpus-arch",
            _type: "image",
            asset: { _type: "reference", _ref: assetCpus._id },
            alt: "Supercomputer Multi-CPU Motherboard Node Architecture with Parallel Processing Vector Units",
            caption: "चित्र 2: सुपरकंप्यूटर आर्किटेक्चर — मल्टीपल सीपीयूस (Multiple CPUs), उच्च-बैंडविड्थ मेमोरी और समानांतर वेक्टर प्रसंस्करण (Vector Processing)।"
          }
        ],
        bodyEn: [
          ...createBlocks([
            "The architectural foundations that distinguish supercomputers from standard computing systems include:",
            "### 1. Multiple CPUs & Parallel Processing",
            "• **Architecture**: Houses thousands of high-performance CPUs and GPUs working synchronously. Each unit handles arithmetic and logic pipeline execution.",
            "### 2. Extreme Computation Speed",
            "• **High Throughput**: Capable of executing quadrillions of floating-point operations per second to complete massive datasets in real time.",
            "### 3. High Storage Capacity & Throughput",
            "• **Parallel Storage**: Incorporates multi-petabyte parallel file systems ensuring rapid data access and instruction retrieval across nodes.",
            "### 4. Vector Arithmetic Capability",
            "• **Vector Operations**: Processes entire numerical lists and matrix arrays simultaneously rather than operating on isolated scalar numbers.",
            "### 5. Multi-User Shared Infrastructure",
            "• **Resource Sharing**: Supports concurrent high-priority execution threads for hundreds of multi-disciplinary researchers globally."
          ]),
          {
            _key: "img-cpus-arch-en",
            _type: "image",
            asset: { _type: "reference", _ref: assetCpus._id },
            alt: "Supercomputer Multi-CPU Motherboard Architecture",
            caption: "Figure 2: Supercomputer Node Architecture — Multi-CPU sockets, vector processors, and high-density memory subsystem."
          }
        ],
      },

      /* ── 3. Global History & Major World Supercomputers ───────── */
      {
        _key: "sec-global-history",
        kind: "keyHighlights",
        title: "सुपरकंप्यूटर का वैश्विक इतिहास एवं विश्व के प्रमुख सुपरकंप्यूटर",
        titleEn: "Global History of Supercomputing & World's Top Supercomputers",
        body: [
          ...createBlocks([
            "### सुपरकंप्यूटर के विकास का वैश्विक इतिहास",
            "सुपरकंप्यूटिंग का विकास **1950 के दशक के उत्तरार्ध** में तेज हुआ। इस दौरान अमेरिकी सरकार ने High-Performance Computing (HPC) तकनीक के विकास के लिए लगातार वित्तीय सहायता प्रदान की। इसका मुख्य उद्देश्य सैन्य अनुप्रयोगों और परमाणु अनुसंधान से जुड़ी गणनाओं को पूरा करना था।",
            "• **1976 - Cray-1**: सेमोर क्रे (Seymour Cray) द्वारा विकसित **Cray-1** को पेश किया गया। यह Vector Processing के सफल कार्यान्वयन के लिए ऐतिहासिक मील का पत्थर बना।",
            "• **1985 - Cray-2**: चार-प्रोसेसर वाले **Cray-2** ने 1 अरब FLOPS (1 Gigaflop) से अधिक की गति प्राप्त करने वाले पहले कंप्यूटर के रूप में इतिहास रचा।",
            "• **2008 - IBM Roadrunner**: IBM द्वारा विकसित **Roadrunner** ने 1,000 TFLOPS या **1 Petaflop** से अधिक प्रदर्शन हासिल करने वाले विश्व के पहले सुपरकंप्यूटर का कीर्तिमान स्थापित किया।",
            "### दुनिया के प्रमुख शक्तिशाली सुपरकंप्यूटर (World's Leading Supercomputers)",
            "• **LineShine (चीन)**: जून 2026 की नवीनतम रिपोर्ट के अनुसार, चीन का **LineShine** सिस्टम दुनिया का सबसे शक्तिशाली सुपरकंप्यूटर है, जिसकी प्रसंस्करण क्षमता **2.19 Exaflops** दर्ज की गई है।",
            "• **El Capitan (अमेरिका)**: लॉरेंस लिवरमोर नेशनल लेबोरेटरी (LLNL) में स्थित यह AMD-आधारित उच्च-प्रदर्शन प्रणाली है।",
            "• **Frontier (अमेरिका)**: ओक रिज नेशनल लेबोरेटरी (ORNL) में स्थित प्रमुख exascale सुपरकंप्यूटर प्रणाली।",
            "• **Aurora (अमेरिका)**: आर्गोन नेशनल लेबोरेटरी में स्थित और Intel architecture पर आधारित exascale सिस्टम।",
            "• **Fugaku (जापान)**: जापान के कोबे स्थित **RIKEN Center for Computational Science** में स्थापित उच्च क्षमता वाला सुपरकंप्यूटर।",
            "### वैश्विक वितरण (Global Distribution)",
            "• **संयुक्त राज्य अमेरिका (USA)**: TOP500 सूची में सबसे अधिक systems और सबसे अधिक कंप्यूटेशनल आउटपुट रखने वाला अग्रणी देश।",
            "• **चीन (China)**: कुल एग्रीगेट परफॉर्मेंस और प्रणालियों की संख्या में द्वितीय स्थान पर।",
            "• **यूरोप व जापान**: जापान, इटली, जर्मनी और स्विट्जरलैंड में जलवायु मॉडल, औषधि खोज और एआई अनुसंधान हेतु प्रमुख HPC नोड्स कार्यरत हैं।"
          ])
        ],
        bodyEn: [
          ...createBlocks([
            "### Evolution of Global Supercomputing",
            "High-performance computing accelerated in the late 1950s, driven by US defense and scientific research funding:",
            "• **1976 - Cray-1**: Designed by Seymour Cray, Cray-1 pioneered commercial vector processing architecture.",
            "• **1985 - Cray-2**: A 4-processor supercomputer that became the first system to break the 1 Gigaflop (1 Billion FLOPS) speed barrier.",
            "• **2008 - IBM Roadrunner**: Became the first supercomputer to break the 1 Petaflop (1,000 TFLOPS) barrier.",
            "### World's Leading Supercomputing Systems",
            "• **LineShine (China)**: Ranked as a top global system in 2026 reaching a peak throughput of **2.19 Exaflops**.",
            "• **El Capitan (United States)**: Located at Lawrence Livermore National Laboratory (LLNL), powered by AMD architecture.",
            "• **Frontier (United States)**: Premier exascale system deployed at Oak Ridge National Laboratory (ORNL).",
            "• **Aurora (United States)**: Intel-based exascale system operating at Argonne National Laboratory.",
            "• **Fugaku (Japan)**: Situated at RIKEN Center for Computational Science in Kobe, Japan.",
            "### Global Geographic Distribution",
            "• **United States**: Leads the biannual TOP500 list with maximum aggregate computational capacity.",
            "• **China**: Holds the second largest aggregate compute footprint globally.",
            "• **Europe & Japan**: Deploys cutting-edge HPC grids across Germany, Italy, Switzerland, and Japan for AI and climate modeling."
          ])
        ],
      },

      /* ── 4. Supercomputing in India & Institutions ────────────── */
      {
        _key: "sec-india-development",
        kind: "analysis",
        title: "भारत में सुपरकंप्यूटर का विकास एवं प्रमुख वैज्ञानिक संस्थाएँ",
        titleEn: "Supercomputing Development in India & Key Scientific Institutions",
        body: [
          ...createBlocks([
            "### भारत में स्वदेशी सुपरकंप्यूटिंग की पृष्ठभूमि (1987)",
            "भारत में स्वदेशी सुपरकंप्यूटिंग कार्यक्रम को वास्तविक गति तब मिली जब **1987 में अमेरिका ने भारत को Cray X-MP सुपरकंप्यूटर बेचने से मना कर दिया**। भारत को मौसम पूर्वानुमान (Weather Forecasting) और अकादमिक अनुसंधान हेतु इस कंप्यूटर की नितांत आवश्यकता थी।",
            "इस प्रतिबंध के बाद भारत ने अमेरिका पर निर्भर रहने के बजाय अपनी स्वदेशी सुपरकंप्यूटिंग क्षमता (Indigenous Capability) विकसित करने का ऐतिहासिक संकल्प लिया।",
            "### भारत में सुपरकंप्यूटिंग से जुड़ी प्रमुख संस्थाएँ एवं उपलब्धियाँ",
            "• **C-DAC (Centre for Development of Advanced Computing)**: 1988 में पुणे में स्थापित। इसने भारत की प्रसिद्ध **PARAM** सुपरकंप्यूटर शृंखला विकसित की।",
            "• **BARC (भाभा परमाणु अनुसंधान केंद्र)**: परमाणु अनुसंधान एवं वैज्ञानिक सिमुलेशन हेतु **Anupam (अनुपम)** शृंखला के सुपरकंप्यूटर विकसित किए।",
            "• **ANURAG (Advanced Numerical Research and Analysis Group - DRDO)**: रक्षा अनुसंधान हेतु **PACE** शृंखला के सुपरकंप्यूटर विकसित किए।",
            "• **C-DOT (Centre for Development of Telematics)**: उच्च प्रदर्शन हेतु **CHIPPS** (Parallel Processing System) का विकास किया।",
            "• **NAL (National Aerospace Laboratories)**: एयरोस्पेस एवं विमानन क्षेत्र हेतु सुपरकंप्यूटिंग प्रणालियाँ विकसित कीं।"
          ]),
          createTable(
            "table-india-institutions-hi",
            "भारतीय संस्थाएँ एवं उनकी स्वदेशी सुपरकंप्यूटर श्रृंखला",
            ["संस्था (Institution)", "सुपरकंप्यूटर श्रृंखला (Supercomputer Series)", "मुख्य अनुप्रयोग (Key Application)"],
            [
              ["**C-DAC (पुणे)**", "**PARAM (परम) शृंखला**", "**राष्ट्रीय सुपरकंप्यूटिंग, HPC व AI रिसर्च**"],
              ["**BARC (मुंबई)**", "**Anupam (अनुपम) शृंखला**", "**परमाणु अनुसंधान व वैज्ञानिक सिमुलेशन**"],
              ["**ANURAG (DRDO)**", "**PACE शृंखला**", "**रक्षा, मिसाइल व बैलिस्टिक सिमुलेशन**"],
              ["**C-DOT (दिल्ली)**", "**CHIPPS सिस्टम**", "**टेलीकॉम व पैरेलल प्रोसेसिंग**"],
              ["**NAL (बेंगलुरु)**", "**Flosolver शृंखला**", "**विमानन व एयरोडायनामिक्स**"]
            ]
          ),
          ...createBlocks([
            "### PARAM सुपरकंप्यूटर श्रृंखला का विकास (PARAM Series Evolution)",
            "PARAM का संस्कृत में अर्थ **\"सर्वश्रेष्ठ\" (Supreme)** है तथा यह **PARAllel Machine** का संक्षिप्त रूप भी है। इसे C-DAC पुणे द्वारा डिजाइन और असेंबल किया गया:",
            "• **PARAM 8000 (1991)**: C-DAC की पहली ऐतिहासिक सफलता। इसने GigaFLOPS क्षमता में समानांतर कंप्यूटिंग प्रदान की और भारत का पहला स्वदेशी सुपरकंप्यूटर बना।",
            "• **PARAM 9000 (1993)**: 1993 में जारी इस सीरीज की पिक कंप्यूटिंग पॉवर **5 GFLOPS** थी।",
            "• **PARAM 10000 (1998)**: 1998 में जारी। LINPACK बेंचमार्क पर इसकी Sustained Performance **38 GFLOPS** दर्ज की गई।"
          ])
        ],
        bodyEn: [
          ...createBlocks([
            "### Historical Background: The 1987 US Embargo",
            "India's supercomputing program gained decisive momentum after **the US government denied the export of the Cray X-MP supercomputer to India in 1987**. India urgently required the system for weather forecasting and academic research.",
            "This embargo impelled India to embark on a self-reliant path to build indigenous supercomputing infrastructure.",
            "### Major Indian Institutions & Indigenous Series",
            "• **C-DAC (Centre for Development of Advanced Computing)**: Established in 1988 in Pune; pioneered the famous **PARAM** series.",
            "• **BARC (Bhabha Atomic Research Centre)**: Developed the **Anupam** supercomputer series for nuclear modeling.",
            "• **ANURAG (DRDO)**: Designed the **PACE** series for defense and ballistic applications.",
            "• **C-DOT**: Developed **CHIPPS**, a high-performance Parallel Processing System.",
            "• **NAL (National Aerospace Laboratories)**: Engineered parallel systems for aerodynamics."
          ]),
          createTable(
            "table-india-institutions-en",
            "Indian Scientific Institutions & Indigenous Supercomputer Series",
            ["Institution", "Supercomputer Series", "Primary Focus Area"],
            [
              ["**C-DAC (Pune)**", "**PARAM Series**", "**National HPC Grid & AI Research**"],
              ["**BARC (Mumbai)**", "**Anupam Series**", "**Nuclear Physics & Molecular Modeling**"],
              ["**ANURAG (DRDO)**", "**PACE Series**", "**Defense & Aerospace Simulations**"],
              ["**C-DOT (Delhi)**", "**CHIPPS Architecture**", "**Telecommunications & Parallel Systems**"],
              ["**NAL (Bengaluru)**", "**Flosolver Series**", "**Aeronautics & Computational Fluid Dynamics**"]
            ]
          ),
          ...createBlocks([
            "### Evolution of C-DAC's PARAM Series",
            "PARAM signifies **\"Supreme\"** in Sanskrit and stands for **PARAllel Machine**:",
            "• **PARAM 8000 (1991)**: India's 1st indigenous parallel supercomputer (GigaFLOPS range).",
            "• **PARAM 9000 (1993)**: Delivered peak computing power of **5 GFLOPS**.",
            "• **PARAM 10000 (1998)**: Achieved sustained performance of **38 GFLOPS** on LINPACK benchmarks."
          ])
        ],
      },

      /* ── 5. TOP500 & National Supercomputing Mission (NSM) ────── */
      {
        _key: "sec-nsm-top500",
        kind: "keyHighlights",
        title: "TOP500 में भारतीय सुपरकंप्यूटर एवं राष्ट्रीय सुपरकंप्यूटिंग मिशन (NSM)",
        titleEn: "Indian Supercomputers in TOP500 & National Supercomputing Mission (NSM)",
        body: [
          ...createBlocks([
            "### TOP500 में भारतीय सुपरकंप्यूटर (Indian Systems in TOP500 List)",
            "जून 2023 की TOP500 अंतर्राष्ट्रीय रैंकिंग के अनुसार, भारत के **4 प्रमुख सुपरकंप्यूटर** विश्व की शीर्ष सूची में शामिल थे:"
          ]),
          createTable(
            "table-top500-india-hi",
            "TOP500 सूची में शामिल भारतीय सुपरकंप्यूटर (जून 2023)",
            ["रैंक (Rank)", "संस्थान (Site)", "सुपरकंप्यूटर (Supercomputer)", "Rmax (TFLOPS)", "Rpeak (TFLOPS)"],
            [
              ["**75**", "C-DAC पुणे", "**AIRAWAT – PSAI**", "**8.50**", "**13.17**"],
              ["**131**", "C-DAC पुणे", "**PARAM Siddhi-AI**", "**4.62**", "**5.27**"],
              ["**169**", "IITM पुणे", "**Pratyush (Cray XC40)**", "**3.76**", "**4.01**"],
              ["**316**", "NCMRWF नोएडा", "**Mihir (Cray XC40)**", "**2.57**", "**2.81**"]
            ]
          ),
          ...createBlocks([
            "### राष्ट्रीय सुपरकंप्यूटिंग मिशन (National Supercomputing Mission - NSM)",
            "• **घोषणा व मंत्रालय**: 2015 में **इलेक्ट्रॉनिक्स और सूचना प्रौद्योगिकी मंत्रालय (MeitY)** एवं **DST** द्वारा संयुक्त रूप से की गई।",
            "• **बजट व समयावधि**: **$730 Million (₹4,500 करोड़)** के बजट के साथ 7 वर्षों का राष्ट्रीय कार्यक्रम।",
            "• **मूल लक्ष्य**: देश भर के उच्च शिक्षण व अनुसंधान संस्थानों में NKN (National Knowledge Network) के माध्यम से **73 स्वदेशी सुपरकंप्यूटर स्थापित करना** तथा भौगोलिक रूप से फैले HPC सेंटर्स का ग्रिड तैयार करना।",
            "• **कार्यान्वयन एजेंसियाँ**: C-DAC (पुणे) तथा भारतीय विज्ञान संस्थान (IISc, बेंगलुरु)।",
            "• **स्वदेशीकरण (Localisation)**: सुपरकंप्यूटर के सभी पुर्जों (मदरबोर्ड, सर्वर नोड 'रुद्र', इंटरकनेक्ट 'त्रिनेत्र') का निर्माण भारत में ही करना।",
            "### NSM के अंतर्गत स्थापित प्रमुख PARAM सुपरकंप्यूटर",
            "• **PARAM Shivay**: NSM के अंतर्गत भारत का पहला सुपरकंप्यूटर (2020 में **IIT BHU वाराणसी** में स्थापित)।",
            "• **PARAM Pravega**: IISc बेंगलुरु में स्थापित शक्तिशाली पेट्रास्केल प्रणाली।",
            "• **PARAM Utkarsh**: C-DAC बेंगलुरु में स्थापित।",
            "• **PARAM Ananta**: IIT गांधीनगर में स्थापित।",
            "• **PARAM Himalaya**: IIT मंडी में स्थापित।",
            "• **PARAM Siddhi-AI**: C-DAC पुणे में स्थापित एआई सुपरकंप्यूटर।"
          ])
        ],
        bodyEn: [
          ...createBlocks([
            "### Indian Supercomputers in Global TOP500 (June 2023 Data)",
            "According to the official TOP500 supercomputing ranking, India featured 4 prominent systems:"
          ]),
          createTable(
            "table-top500-india-en",
            "Indian Supercomputing Systems in Global TOP500 (June 2023)",
            ["Rank", "Site", "Supercomputer System", "Rmax (TFLOPS)", "Rpeak (TFLOPS)"],
            [
              ["**75**", "C-DAC Pune", "**AIRAWAT – PSAI**", "**8.50**", "**13.17**"],
              ["**131**", "C-DAC Pune", "**PARAM Siddhi-AI**", "**4.62**", "**5.27**"],
              ["**169**", "IITM Pune", "**Pratyush (Cray XC40)**", "**3.76**", "**4.01**"],
              ["**316**", "NCMRWF Noida", "**Mihir (Cray XC40)**", "**2.57**", "**2.81**"]
            ]
          ),
          ...createBlocks([
            "### National Supercomputing Mission (NSM)",
            "• **Launch & Outlay**: Announced in **2015** jointly by MeitY and DST with an outlay of **₹4,500 Crore ($730 Million)**.",
            "• **Objective**: Connecting 73 academic and research institutions via the National Knowledge Network (NKN) HPC grid.",
            "• **Key Deployed Systems**: **PARAM Shivay** (IIT BHU - 1st NSM node in 2020), **PARAM Pravega** (IISc), **PARAM Ananta** (IIT Gandhinagar), **PARAM Himalaya** (IIT Mandi)."
          ])
        ],
      },

      /* ── 6. Interlink Section: Latest PARAM Pragya AI Supercomputer ─ */
      {
        _key: "sec-interlink-pragya",
        kind: "keyHighlights",
        title: "विशेष समसामयिकी अंतर्संबंध: 'परम प्रज्ञा' AI सुपरकंप्यूटर (2026)",
        titleEn: "Special Interlinked Coverage: 'PARAM Pragya' AI Supercomputer (2026)",
        body: [
          ...createBlocks([
            "### भारत का नवीनतम 250 AI पेटाफ्लॉप्स सुपरकंप्यूटर: परम प्रज्ञा",
            "वर्ष 2026 में भारत की स्वदेशी सुपरकंप्यूटिंग यात्रा में एक और ऐतिहासिक मील का पत्थर जुड़ा, जब **प्रधानमंत्री नरेंद्र मोदी** ने **8 अगस्त 2026** को **आईआईटी दिल्ली (सोनीपत कैंपस)** में **'परम प्रज्ञा' (PARAM Pragya)** का उद्घाटन किया।",
            "• **कंप्यूटिंग गति**: 400 NVIDIA A100 GPUs के साथ **~250 AI पेटाफ्लॉप्स**।",
            "• **ओपन रिसर्च एक्सेस**: 40% प्रोसेसिंग क्षमता देश भर के बाहरी शोधकर्ताओं और स्टार्टअप्स हेतु उपलब्ध।",
            "• **विस्तृत लेख पढ़ें**: परम प्रज्ञा AI सुपरकंप्यूटर, इसकी तकनीकी संरचना और भारत की AI क्रांति पर हमारा विशेष लेख पढ़ने के लिए नीचे दिए गए लिंक पर क्लिक करें:"
          ]),
          createBlocks([
            "### [और पढ़ें: भारत का नया AI सुपरकंप्यूटर 'परम प्रज्ञा' — विस्तृत विश्लेषण एवं परीक्षा नोट्स](/current-affairs/param-pragya-ai-supercomputer-india-supercomputing-journey)"
          ])
        ],
        bodyEn: [
          ...createBlocks([
            "### India's Latest 250 AI Petaflops Supercomputer: PARAM Pragya",
            "In August 2026, Prime Minister Narendra Modi inaugurated **PARAM Pragya** at **IIT Delhi Sonipat Campus**.",
            "• **Compute Speed**: **~250 AI Petaflops** powered by 400 NVIDIA A100 GPUs.",
            "• **Read Complete Coverage**: Explore our dedicated deep-dive article on PARAM Pragya:"
          ]),
          createBlocks([
            "### [Read More: PARAM Pragya AI Supercomputer Detailed Analysis & Notes](/en/current-affairs/param-pragya-ai-supercomputer-india-supercomputing-journey)"
          ])
        ],
      },

      /* ── 7. Applications, Advantages & Limitations ───────────── */
      {
        _key: "sec-apps-advantages-limitations",
        kind: "analysis",
        title: "सुपरकंप्यूटर के उपयोग, लाभ एवं सीमाएँ (Applications, Advantages & Limitations)",
        titleEn: "Applications, Advantages & Limitations of Supercomputers",
        body: [
          ...createBlocks([
            "### सुपरकंप्यूटर के प्रमुख उपयोग (Key Applications)",
            "• **1. मौसम पूर्वानुमान व जलवायु अनुसंधान**: सैटेलाइट व मौसम बैलून से प्राप्त विशाल डाटा की प्रोसेसिंग (जैसे Derecho सुपरकंप्यूटर, Pratyush व Mihir)।",
            "• **2. जीनोम सीक्वेंसिंग व ड्रग डिस्कवरी**: DNA सीक्वेंसिंग एवं मॉलिक्यूलर मॉडल (Stanford यूनिवर्सिटी द्वारा सबसे तेज जीनोमिक सीक्वेंसिंग का गिनीज वर्ल्ड रिकॉर्ड)।",
            "• **3. विमानन इंजीनियरिंग (Aviation)**: टर्बुलेंस भविष्यवाणी, सौर ज्वालाओं का अध्ययन और नेक्स्ट-जनरेशन ओपन फैन इंजन टेस्टिंग (जैसे GE Aerospace द्वारा Frontier का उपयोग)।",
            "• **4. अंतरिक्ष अनुसंधान (Space Exploration)**: नासा का Aitken सुपरकंप्यूटर Artemis Moon Mission के लिए सिमुलेशन तैयार करता है।",
            "• **5. परमाणु संलयन अनुसंधान (Nuclear Fusion)**: प्लाज्मा में ऊर्जा नुकसान और न्यूक्लियर टेस्ट का वर्चुअल सिमुलेशन।",
            "• **6. तेल एवं गैस अन्वेषण**: सिस्मिक (Seismic) डाटा प्रोसेसिंग द्वारा तेल के नए भंडारों की खोज।",
            "• **7. रक्षा एवं सैन्य अनुप्रयोग**: बैलिस्टिक मिसाइल सिमुलेशन व सामरिक सुरक्षा गणनाएँ।",
            "• **8. स्मॉग व प्रदूषण पूर्वानुमान**: स्मॉग, कोहरे और वायु प्रदूषण का पूर्वानुमान (जैसे Tianhe-1A)।",
            "### सुपरकंप्यूटर के प्रमुख लाभ (Advantages)",
            "• विशाल डाटा का प्रति सेकंड ट्रिलियंस ऑपरेशन्स पर तीव्र प्रसंस्करण।",
            "• जटिल वैज्ञानिक व जलवायु सिमुलेशन का सटीक निष्पादन।",
            "• रक्षा, अंतरिक्ष व AI अनुसंधान में राष्ट्रीय आत्मनिर्भरता।",
            "### सुपरकंप्यूटर की सीमाएँ एवं नुकसान (Limitations & Challenges)",
            "• **1. विशाल भौतिक आकार (Physical Size)**: 1,000 वर्ग फुट से अधिक बड़े स्थान की आवश्यकता।",
            "• **2. जटिल रखरखाव (Maintenance)**: विशेष सॉफ्टवेयर व उच्च-स्तरीय विशेषज्ञता अनिवार्य।",
            "• **3. विशाल स्टोरेज आवश्यकता**: प्रति सेकंड उत्पन्न विशाल डाटा को स्टोर करने हेतु पेंटाबाइट्स स्टोरेज आवश्यक।",
            "• **4. अत्यधिक ऊष्मा उत्सर्जन (Heat Release)**: हजारों प्रोसेसर्स से उत्पन्न ऊष्मा हेतु भारी लिक्विड कूलिंग अनिवार्य।",
            "• **5. भारी बिजली खपत (Power Consumption)**: एक सुपरकंप्यूटर को चलाने हेतु औसतन **4 मेगावॉट (MW)** बिजली की आवश्यकता होती है।"
          ]),
          {
            _key: "img-apps-infographic",
            _type: "image",
            asset: { _type: "reference", _ref: assetApps._id },
            alt: "Supercomputer Multi-disciplinary Applications Infographic in Weather, Space, Aviation and Genomics",
            caption: "चित्र 3: सुपरकंप्यूटर के बहुविषयक अनुप्रयोग — मौसम पूर्वानुमान, अंतरिक्ष अन्वेषण, जीनोम सीक्वेंसिंग, और रक्षा अनुसंधान।"
          }
        ],
        bodyEn: [
          ...createBlocks([
            "### Key Applications of Supercomputers",
            "• **1. Weather & Climate Modeling**: Processing global satellite data for severe weather and monsoon predictions.",
            "• **2. Genomic Sequencing & Medicine**: Molecular modeling and rapid DNA sequencing.",
            "• **3. Aviation Engineering**: Aerodynamic turbulence testing and open fan engine simulations.",
            "• **4. Space Exploration**: NASA's Aitken supercomputer supporting Artemis Moon missions.",
            "• **5. Nuclear Fusion Research**: Plasma containment simulations using Frontier and Summit.",
            "• **6. Oil & Gas Exploration**: Processing massive 3D seismic geophysical datasets.",
            "• **7. Defense Simulations**: Virtual nuclear explosion testing and ballistic missile trajectory calculation.",
            "• **8. Pollution & Smog Prediction**: Predicting regional air quality and smog distribution.",
            "### Limitations & Technical Challenges",
            "• **1. Enormous Physical Footprint**: Requires over 1,000 sq ft dedicated cleanroom facilities.",
            "• **2. High Maintenance Costs**: Demands specialized parallel operating systems and engineering expertise.",
            "• **3. Massive Heat Generation**: Demands active liquid-cooling infrastructure.",
            "• **4. Extreme Power Consumption**: Consumes average of **4 Megawatts (MW)** of electricity."
          ]),
          {
            _key: "img-apps-infographic-en",
            _type: "image",
            asset: { _type: "reference", _ref: assetApps._id },
            alt: "Supercomputer Applications Infographic",
            caption: "Figure 3: Multi-disciplinary Applications of Supercomputers across Meteorology, Aviation, Space, and Defense."
          }
        ],
      },

      /* ── 8. MPPSC & UPSC Quick Revision ──────────────────────── */
      {
        _key: "sec-revision-one-liners",
        kind: "conclusion",
        title: "MPPSC & UPSC Quick Revision: वन-लाइनर तथ्य",
        titleEn: "MPPSC & UPSC Quick Revision: Key Facts & One-Liners",
        body: [
          ...createBlocks([
            "### MPPSC एवं UPSC हेतु त्वरित रिवीजन पॉइंट्स",
            "• **1987** → अमेरिका ने भारत को Cray X-MP खरीदने से मना किया।",
            "• **C-DAC** → PARAM शृंखला के विकास से जुड़ी प्रमुख संस्था (मुख्यालय: पुणे)।",
            "• **PARAM** → \"Supreme\" तथा PARAllel Machine का संक्षिप्त रूप।",
            "• **PARAM 8000** → 1991 (भारत का पहला स्वदेशी सुपरकंप्यूटर)।",
            "• **PARAM 9000** → 1993 (Peak Compute Power: 5 GFLOPS)।",
            "• **PARAM 10000** → 1998 (Sustained Performance: 38 GFLOPS)।",
            "• **National Supercomputing Mission** → 2015 ($730M / ₹4,500 करोड़)।",
            "• **PARAM Shivay** → NSM के अंतर्गत पहला सुपरकंप्यूटर (2020, IIT-BHU)।",
            "• **AIRAWAT** → जून 2023 TOP500 सूची में 75वीं रैंक।",
            "• **PARAM Siddhi-AI** → C-DAC पुणे में स्थापित AI सुपरकंप्यूटर।",
            "• **Pratyush** → इंडियन इंस्टीट्यूट ऑफ ट्रॉपिकल मीटियोरोलॉजी (IITM पुणे)।",
            "• **Mihir** → नेशनल सेंटर फॉर मीडियम रेंज वेदर फॉरकास्टिंग (NCMRWF नोएडा)।",
            "• **PARAM Pragya** → 2026 में स्थापित 250 AI Petaflops सुपरकंप्यूटर (IIT दिल्ली सोनीपत)।",
            "### MPPSC मुख्य परीक्षा (Paper-3 Unit-7 & 10) उत्तर-लेखन कैप्सूल",
            "**\"सुपरकंप्यूटिंग केवल उच्च गति गणना का साधन नहीं है, बल्कि यह मौसम पूर्वानुमान, जीनोम शोध, परमाणु सुरक्षा, एआई विकास और आत्मनिर्भर भारत की वैज्ञानिक संप्रभुता की रीढ़ है।\"**"
          ])
        ],
        bodyEn: [
          ...createBlocks([
            "### High-Yield Facts for MPPSC & UPSC Prelims",
            "• **1987** → US embargo denying Cray X-MP export to India.",
            "• **C-DAC** → Nodal agency behind PARAM series (HQ: Pune).",
            "• **PARAM** → Acronym for PARAllel Machine & Sanskrit for 'Supreme'.",
            "• **PARAM 8000** → 1991 (India's 1st indigenous supercomputer).",
            "• **National Supercomputing Mission** → 2015 (₹4,500 Crore outlay).",
            "• **PARAM Shivay** → 1st NSM supercomputer (2020 at IIT BHU).",
            "• **AIRAWAT** → Ranked 75 in June 2023 TOP500 list.",
            "• **PARAM Pragya** → 250 AI Petaflops supercomputer at IIT Delhi Sonipat (2026).",
            "### Mains Answer Booster Capsule",
            "**\"Supercomputing forms the technological cornerstone for weather modeling, genomics, defense simulations, and AI sovereignty, driving India's journey towards scientific self-reliance.\"**"
          ])
        ],
      }
    ],

    /* ─── MCQs ──────────────────────────────────────────────── */
    mcqs: [
      {
        question: "सुपरकंप्यूटर का प्रदर्शन (Performance) सामान्यतः किस इकाई में मापा जाता है?",
        questionEn: "In which unit is the performance of a supercomputer measured?",
        options: ["A. MIPS", "B. FLOPS", "C. Gigahertz", "D. Terabytes"],
        optionsEn: ["A. MIPS", "B. FLOPS", "C. Gigahertz", "D. Terabytes"],
        correctIndex: 1,
        explanation: "सुपरकंप्यूटर की गति और प्रदर्शन को FLOPS (Floating-Point Operations Per Second) में मापा जाता है।",
        explanationEn: "Supercomputer processing speed is measured in FLOPS (Floating-Point Operations Per Second)."
      },
      {
        question: "भारत का पहला स्वदेशी सुपरकंप्यूटर 'PARAM 8000' किस संस्था द्वारा विकसित किया गया था?",
        questionEn: "India's first indigenous supercomputer 'PARAM 8000' was developed by which organization?",
        options: ["A. BARC", "B. ISRO", "C. C-DAC", "D. DRDO"],
        optionsEn: ["A. BARC", "B. ISRO", "C. C-DAC", "D. DRDO"],
        correctIndex: 2,
        explanation: "PARAM 8000 को 1991 में पुणे स्थित C-DAC (Centre for Development of Advanced Computing) द्वारा विकसित किया गया था।",
        explanationEn: "PARAM 8000 was developed in 1991 by C-DAC (Centre for Development of Advanced Computing), Pune."
      },
      {
        question: "राष्ट्रीय सुपरकंप्यूटिंग मिशन (NSM) की शुरुआत किस वर्ष की गई थी?",
        questionEn: "In which year was the National Supercomputing Mission (NSM) launched?",
        options: ["A. 2010", "B. 2012", "C. 2015", "D. 2018"],
        optionsEn: ["A. 2010", "B. 2012", "C. 2015", "D. 2018"],
        correctIndex: 2,
        explanation: "राष्ट्रीय सुपरकंप्यूटिंग मिशन (NSM) की घोषणा 2015 में ₹4,500 करोड़ ($730 Million) के बजट के साथ की गई थी।",
        explanationEn: "The National Supercomputing Mission (NSM) was announced in 2015 with a budget outlay of ₹4,500 Crore."
      },
      {
        question: "NSM के अंतर्गत स्थापित भारत का पहला सुपरकंप्यूटर कौन-सा था और इसे कहाँ स्थापित किया गया?",
        questionEn: "Which was the first supercomputer deployed under NSM and where was it installed?",
        options: [
          "A. PARAM Siddhi-AI (C-DAC पुणे)",
          "B. PARAM Shivay (IIT BHU)",
          "C. PARAM Pravega (IISc बेंगलुरु)",
          "D. PARAM Ananta (IIT गांधीनगर)"
        ],
        optionsEn: [
          "A. PARAM Siddhi-AI (C-DAC Pune)",
          "B. PARAM Shivay (IIT BHU)",
          "C. PARAM Pravega (IISc Bengaluru)",
          "D. PARAM Ananta (IIT Gandhinagar)"
        ],
        correctIndex: 1,
        explanation: "NSM के तहत भारत का पहला सुपरकंप्यूटर PARAM Shivay वर्ष 2020 में IIT-BHU वाराणसी में स्थापित किया गया था।",
        explanationEn: "PARAM Shivay was the first supercomputer deployed under NSM, installed at IIT BHU Varanasi in 2020."
      },
      {
        question: "जून 2023 की अंतर्राष्ट्रीय TOP500 सूची में भारत के AIRAWAT सुपरकंप्यूटर की क्या रैंक थी?",
        questionEn: "What was the rank of India's AIRAWAT supercomputer in the June 2023 TOP500 list?",
        options: ["A. 50वीं", "B. 62वीं", "C. 75वीं", "D. 131वीं"],
        optionsEn: ["A. 50th", "B. 62nd", "C. 75th", "D. 131st"],
        correctIndex: 2,
        explanation: "जून 2023 की TOP500 सूची में C-DAC पुणे में स्थापित AIRAWAT - PSAI को 75वाँ स्थान प्राप्त हुआ था।",
        explanationEn: "AIRAWAT - PSAI installed at C-DAC Pune achieved Rank 75 in the June 2023 global TOP500 list."
      },
      {
        question: "1987 में किस देश ने भारत को Cray X-MP सुपरकंप्यूटर बेचने से मना कर दिया था?",
        questionEn: "Which country denied the sale of Cray X-MP supercomputer to India in 1987?",
        options: ["A. रूस", "B. संयुक्त राज्य अमेरिका (USA)", "C. ब्रिटेन", "D. फ्रांस"],
        optionsEn: ["A. Russia", "B. United States (USA)", "C. United Kingdom", "D. France"],
        correctIndex: 1,
        explanation: "1987 में अमेरिका ने भारत को मौसम पूर्वानुमान हेतु Cray X-MP सुपरकंप्यूटर देने से मना कर दिया था, जिसके बाद भारत ने स्वदेशी C-DAC की स्थापना की।",
        explanationEn: "In 1987, the US denied exporting the Cray X-MP supercomputer to India, prompting India to build indigenous capabilities via C-DAC."
      },
      {
        question: "परमाणु अनुसंधान हेतु 'Anupam' (अनुपम) शृंखला के सुपरकंप्यूटर किस संस्था ने विकसित किए?",
        questionEn: "Which organization developed the 'Anupam' series of supercomputers for nuclear research?",
        options: ["A. BARC (भाभा परमाणु अनुसंधान केंद्र)", "B. DRDO", "C. ISRO", "D. NAL"],
        optionsEn: ["A. BARC (Bhabha Atomic Research Centre)", "B. DRDO", "C. ISRO", "D. NAL"],
        correctIndex: 0,
        explanation: "BARC (भाभा परमाणु अनुसंधान केंद्र, मुंबई) ने अनुपम (Anupam) शृंखला के स्वदेशी सुपरकंप्यूटर विकसित किए।",
        explanationEn: "BARC (Bhabha Atomic Research Centre, Mumbai) developed the indigenous Anupam series of supercomputers."
      },
      {
        question: "हाल ही में अगस्त 2026 में IIT दिल्ली सोनीपत परिसर में उद्घाटन किए गए 250 AI पेटाफ्लॉप्स सुपरकंप्यूटर का नाम क्या है?",
        questionEn: "What is the name of the 250 AI Petaflops supercomputer inaugurated at IIT Delhi Sonipat Campus in August 2026?",
        options: ["A. PARAM Rudra", "B. PARAM Pragya", "C. AIRAWAT", "D. PARAM Shakti"],
        optionsEn: ["A. PARAM Rudra", "B. PARAM Pragya", "C. AIRAWAT", "D. PARAM Shakti"],
        correctIndex: 1,
        explanation: "प्रधानमंत्री नरेंद्र मोदी ने 8 अगस्त 2026 को IIT दिल्ली सोनीपत परिसर में 'PARAM Pragya' AI सुपरकंप्यूटर का उद्घाटन किया।",
        explanationEn: "PM Narendra Modi inaugurated the PARAM Pragya AI supercomputer at IIT Delhi Sonipat Campus on August 8, 2026."
      }
    ],

    /* ─── FAQs ──────────────────────────────────────────────── */
    faqs: [
      {
        question: "सुपरकंप्यूटर क्या है और इसकी गति किसमें मापी जाती है?",
        questionEn: "What is a supercomputer and how is its speed measured?",
        answer: "सुपरकंप्यूटर उच्च-प्रदर्शन वाले कंप्यूटर हैं जो विशाल गणनाओं को तेजी से निपटाते हैं। इनकी गति FLOPS (Floating-Point Operations Per Second) में मापी जाती है।",
        answerEn: "Supercomputers are high-performance systems capable of massive calculations. Speed is measured in FLOPS (Floating-Point Operations Per Second)."
      },
      {
        question: "भारत का पहला सुपरकंप्यूटर कौन-सा था?",
        questionEn: "Which was India's first supercomputer?",
        answer: "भारत का पहला स्वदेशी सुपरकंप्यूटर 'PARAM 8000' था, जिसे 1991 में C-DAC (पुणे) द्वारा विकसित किया गया था।",
        answerEn: "India's first indigenous supercomputer was 'PARAM 8000', developed by C-DAC Pune in 1991."
      },
      {
        question: "राष्ट्रीय सुपरकंप्यूटिंग मिशन (NSM) क्या है?",
        questionEn: "What is the National Supercomputing Mission (NSM)?",
        answer: "NSM 2015 में शुरू किया गया ₹4,500 करोड़ का राष्ट्रीय मिशन है, जिसका लक्ष्य भारत के शिक्षण व शोध संस्थानों को सुपरकंप्यूटिंग ग्रिड से जोड़ना और स्वदेशी निर्माण को बढ़ावा देना है।",
        answerEn: "NSM is a ₹4,500 Crore national mission launched in 2015 to create a national HPC grid and promote indigenous supercomputer manufacturing."
      }
    ],

    /* ─── Sources ────────────────────────────────────────────── */
    sources: [
      { label: "C-DAC Official Supercomputing Portal", url: "https://cdac.in" },
      { label: "National Supercomputing Mission (NSM)", url: "https://nsmpact.in" },
      { label: "TOP500 Global Supercomputer Rankings", url: "https://top500.org" }
    ]
  };

  const fullDoc = {
    ...article,
    date: article.publishedAt,
  };

  try {
    const resGk = await client.createOrReplace(fullDoc);
    console.log("✨ Successfully published Static GK document to Sanity:", resGk._id);

    console.log("📌 Upserting Current Affairs document for feeds...");
    const caDoc = {
      ...fullDoc,
      _id: "ca-supercomputer-what-is-supercomputing-guide",
      _type: "currentAffairs",
    };
    const resCa = await client.createOrReplace(caDoc);
    console.log("✨ Successfully published Current Affairs document to Sanity:", resCa._id);

  } catch (err) {
    console.error("❌ Failed to create/replace document in Sanity:", err);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("❌ Error running script:", err);
  process.exit(1);
});
