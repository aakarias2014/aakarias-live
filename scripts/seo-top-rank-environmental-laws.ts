import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import path from "path";

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
  console.log("🚀 Optimizing Environmental Laws in India Article for TOP Google Ranking (SERP Keywords)...");

  // Fetch current document to retain featured asset reference
  const doc = await client.getDocument("gk-environmental-laws-in-india");
  if (!doc) {
    console.error("❌ Document 'gk-environmental-laws-in-india' not found in Sanity!");
    process.exit(1);
  }

  // Define ultra-targeted SEO Title & Meta Description with MPPSC priority
  const titleHi = "भारत में पर्यावरण संरक्षण से संबंधित प्रमुख अधिनियम, नीतियाँ और संस्थाएँ | MPPSC & UPSC Notes PDF";
  const titleEn = "Environmental Laws & Policies in India: Major Acts, Institutions & NGT | MPPSC & UPSC Notes";
  const excerptHi = "MPPSC (पेपर-3 इकाई-10) एवं UPSC हेतु भारत के 11 प्रमुख पर्यावरण कानून, पर्यावरण नीति का विश्लेषण, पर्यावरण प्रदूषण कानून एवं मानव समुदाय, NGT अधिनियम 2010, CPCB, अनुसूचियाँ, FAQs एवं MCQs (पर्यावरण संरक्षण अधिनियम 1986 PDF नोट्स)।";
  const excerptEn = "Complete SEO study notes for MPPSC & UPSC on Environmental Laws in India: Analysis of India's environmental policy, 11 major environmental acts, EPA 1986, Air Act 1981, Water Act 1974, Biodiversity Act 2002, NGT 2010, FAQs & MCQs.";

  const keywords = [
    "पर्यावरण कानून in hindi",
    "paryavaran se sambandhit pramukh adhiniyam mppsc",
    "paryavaran se sambandhit adhiniyam",
    "bharat ki paryavaran niti ka vishleshan kijiye",
    "भारत की पर्यावरण नीति pdf",
    "paryavaran sanrakshan adhiniyam 1986 in hindi pdf",
    "bharat mein paryavaran kanoon ki avashyakta ka varnan kijiye",
    "पर्यावरण कानून नोट्स pdf",
    "bharat mein paryavaran sanrakshan adhiniyam kab lagu hua",
    "paryavaran sanrakshan hetu bharat mein kaun sa adhiniyam lagu nahin hai",
    "Environmental pollution law and human Communities in Hindi",
    "पर्यावरण विधि pdf",
    "भारत के 11 प्रमुख पर्यावरण कानून कौन से हैं",
    "पर्यावरण अधिनियम 1981 क्या है",
    "भारत की प्रमुख पर्यावरण नीतियाँ कौन-कौन सी हैं",
    "paryavaran se sambandhit pramukh adhiniyam meaning",
    "paryavaran se sambandhit pramukh adhiniyam essay",
    "Wildlife Protection Act 1972 Schedules MPPSC",
    "National Green Tribunal NGT Exclusions",
    "MPPSC Paper 3 Environment Notes"
  ];

  // Updated Body Sections incorporating exact Google Search Intent & PAA Queries
  const sections = [
    /* ── 1. Origin, Need & Policy Analysis ─────────────────────── */
    {
      _key: "sec-need-policy-analysis",
      kind: "whyInNews",
      title: "भारत में पर्यावरण कानून की आवश्यकता का वर्णन एवं पर्यावरण नीति का विश्लेषण",
      titleEn: "Need for Environmental Laws in India & Analysis of National Environment Policy",
      body: [
        ...createBlocks([
          "### भारत में पर्यावरण कानून की आवश्यकता क्यों है? (Need for Environmental Legislation)",
          "भारत तीव्र औद्योगिकीकरण, शहरीकरण और जनसंख्या वृद्धि के दौर से गुजर रहा है। प्राकृतिक संसाधनों के अत्यधिक दोहन, वनों की कटाई, औद्योगिक अपशिष्टों के अनियंत्रित निस्तारण तथा वायु व जल प्रदूषण से निपटने के लिए सुदृढ़ **पर्यावरण कानून (Environmental Law)** और नीतियों की अत्यंत आवश्यकता है।",
          "• **संवैधानिक दायित्व**: भारतीय संविधान के **अनुच्छेद 48A** (राज्य नीति के निर्देशक तत्व) के तहत राज्य को पर्यावरण के संरक्षण और संवर्धन तथा वनों व वन्यजीवों की रक्षा का निर्देश दिया गया है। साथ ही **अनुच्छेद 51A(g)** के तहत प्रत्येक नागरिक का यह मौलिक कर्तव्य है कि वह प्राकृतिक पर्यावरण की रक्षा करे।",
          "• **मानव अधिकारों की सुरक्षा**: सर्वोच्च न्यायालय ने **अनुच्छेद 21 (जीवन का अधिकार)** के अंतर्गत 'स्वच्छ एवं स्वस्थ पर्यावरण के अधिकार' को मौलिक अधिकार माना है (सुभाष कुमार बनाम बिहार राज्य वाद, 1991)।",
          "### भारत की पर्यावरण नीति का विश्लेषण कीजिए (Analysis of India's Environmental Policy)",
          "भारत की पर्यावरण नीति का विकास 1972 के **स्टॉकहोम घोषणापत्र** से शुरू हुआ।",
          "1. **राष्ट्रीय पर्यावरण नीति 2006 (National Environment Policy 2006)**: इसका मुख्य उद्देश्य सतत विकास (Sustainable Development), पारिस्थितिक प्रणालियों का संरक्षण और पर्यावरणीय संसाधनों के प्रबंधन में समानता सुनिश्चित करना है।",
          "2. **संस्थागत विकास**: 1972 में गठित **राष्ट्रीय पर्यावरण नीति एवं योजना परिषद (NCPEP)** को 1985 में **पर्यावरण एवं वन मंत्रालय (MoEF)** तथा वर्तमान में **MoEFCC** में बदला गया।"
        ]),
      ],
      bodyEn: [
        ...createBlocks([
          "### Need for Environmental Laws in India",
          "With rapid industrialization, urbanization, and population density, India requires robust **Environmental Legislation** to prevent ecological degradation, control pollution, and protect natural capital.",
          "• **Constitutional Mandate**: **Article 48A** directs the State to protect and improve the environment, while **Article 51A(g)** mandates every citizen to protect forests, lakes, rivers, and wildlife.",
          "• **Fundamental Right under Article 21**: The Supreme Court of India recognized the 'Right to a Clean and Healthy Environment' as an integral part of the Right to Life under Article 21 (Subhash Kumar v. State of Bihar, 1991).",
          "### Analysis of India's Environmental Policy",
          "India's environmental policy framework evolved post the 1972 Stockholm Declaration.",
          "1. **National Environment Policy (NEP) 2006**: Focuses on sustainable development, conservation of critical environmental resources, and equitable access.",
          "2. **Institutional Evolution**: Upgraded from the 1972 National Committee on Environmental Planning to the Ministry of Environment, Forest and Climate Change (MoEFCC)."
        ]),
      ],
    },

    /* ── 2. List of 11 Key Environmental Laws ─────────────────── */
    {
      _key: "sec-11-major-laws",
      kind: "keyAspects",
      title: "भारत के 11 प्रमुख पर्यावरण कानून (11 Major Environmental Laws in India)",
      titleEn: "11 Major Environmental Laws & Acts in India",
      body: [
        ...createBlocks([
          "प्रतियोगी परीक्षाओं (MPPSC & UPSC) की दृष्टि से **भारत के 11 प्रमुख पर्यावरण अधिनियम** निम्नलिखित हैं:"
        ]),
        createTable(
          "table-11-laws-hi",
          "भारत के 11 प्रमुख पर्यावरण कानून एवं वर्ष",
          ["क्रमांक", "अधिनियम / कानून का नाम (Act Name)", "वर्ष (Year)", "मुख्य उद्देश्य / विवरण"],
          [
            ["1", "**वन्यजीव (संरक्षण) अधिनियम** (Wildlife Protection Act)", "1972", "वन्य जीवों, पक्षियों और वनस्पतियों की रक्षा, 6 अनुसूचियाँ"],
            ["2", "**जल (प्रदूषण निवारण एवं नियंत्रण) अधिनियम** (Water Act)", "1974", "जल निकायों की शुद्धता बहाल करना, CPCB & SPCB का गठन"],
            ["3", "**जल (प्रदूषण निवारण एवं नियंत्रण) उपकर अधिनियम** (Water Cess Act)", "1977", "औद्योगिक जल उपभोग पर शुल्क वसूलना"],
            ["4", "**वन (संरक्षण) अधिनियम** (Forest Conservation Act)", "1980", "वनों की कटाई रोकना, गैर-वन उपयोग हेतु केंद्र की अनुमति"],
            ["5", "**वायु (प्रदूषण निवारण एवं नियंत्रण) अधिनियम** (Air Act)", "1981", "वायु प्रदूषण नियंत्रण (1987 में ध्वनि प्रदूषण शामिल)"],
            ["6", "**पर्यावरण (संरक्षण) अधिनियम** (Environment Protection Act)", "1986", "भोपाल गैस त्रासदी के बाद व्यापक छाता विधान (Umbrella Act)"],
            ["7", "**लोक दायित्व बीमा अधिनियम** (Public Liability Insurance Act)", "1991", "खतरनाक पदार्थों से दुर्घटना होने पर तत्काल राहत"],
            ["8", "**राष्ट्रीय पर्यावरण अपीलीय प्राधिकरण अधिनियम** (NEAA Act)", "1997", "पर्यावरणीय स्वीकृतियों के खिलाफ अपील सुनने हेतु निकाय"],
            ["9", "**जैव विविधता अधिनियम** (Biological Diversity Act)", "2002", "जैव विविधता संरक्षण, NBA (चेन्नई) & BMC गठन"],
            ["10", "**राष्ट्रीय हरित न्यायाधिकरण अधिनियम** (NGT Act)", "2010", "पर्यावरण मामलों का 6 माह में त्वरित समाधान (18 ऑक्टोबर 2010)"],
            ["11", "**क्षतिपूरक वनीकरण कोष अधिनियम** (CAMPA Act)", "2016", "वन भूमि डायवर्जन के एवज में पुनर्वनीकरण हेतु कोष प्रबंधन"]
          ]
        )
      ],
      bodyEn: [
        ...createBlocks([
          "For competitive civil services examinations (MPPSC & UPSC), here is the consolidated matrix of the **11 Major Environmental Laws in India**:"
        ]),
        createTable(
          "table-11-laws-en",
          "11 Major Environmental Acts in India",
          ["S.No.", "Act Name & Title", "Year", "Core Feature / Significance"],
          [
            ["1", "**Wildlife (Protection) Act**", "1972", "Fauna/Flora protection, 6 schedules"],
            ["2", "**Water (Prevention & Control of Pollution) Act**", "1974", "Established CPCB & SPCBs for water purity"],
            ["3", "**Water (Prevention & Control of Pollution) Cess Act**", "1977", "Levy of cess on water consumed by industries"],
            ["4", "**Forest (Conservation) Act**", "1980", "Mandatory Central clearance for non-forest land use"],
            ["5", "**Air (Prevention & Control of Pollution) Act**", "1981", "Emissions control; included noise pollution in 1987"],
            ["6", "**Environment (Protection) Act**", "1986", "Umbrella Act post-1984 Bhopal Gas Leak (Article 253)"],
            ["7", "**Public Liability Insurance Act**", "1991", "Immediate relief to victims of hazardous incidents"],
            ["8", "**National Environment Appellate Authority Act**", "1997", "Appellate body against environmental clearances"],
            ["9", "**Biological Diversity Act**", "2002", "NBA (Chennai), SBB, BMC architecture; prevents biopiracy"],
            ["10", "**National Green Tribunal (NGT) Act**", "2010", "Fast-track green tribunal set up on 18 Oct 2010"],
            ["11", "**Compensatory Afforestation Fund (CAMPA) Act**", "2016", "Management of funds collected for lost forest land"]
          ]
        )
      ],
    },

    /* ── 3. Environmental Pollution Law & Human Communities ──── */
    {
      _key: "sec-pollution-human-communities",
      kind: "keyHighlights",
      title: "पर्यावरण प्रदूषण कानून एवं मानव समुदाय (Environmental Pollution Law and Human Communities)",
      titleEn: "Environmental Pollution Law and Human Communities",
      body: [
        ...createBlocks([
          "### पर्यावरण प्रदूषण का मानव समुदाय पर प्रभाव एवं कानूनी सुरक्षा",
          "पर्यावरण प्रदूषण (जल, वायु, मृदा, ध्वनि एवं खतरनाक रसायन) प्रत्यक्ष रूप से मानव समुदायों के स्वास्थ्य, आजीविका और जीवन की गुणवत्ता को प्रभावित करता है।",
          "• **भोपाल गैस त्रासदी (1984)**: इसने भारत में औद्योगिक सुरक्षा और सार्वजनिक स्वास्थ्य कानूनों की पुनर्रचना की नींव रखी, जिसके परिणामस्वरूप **पर्यावरण संरक्षण अधिनियम 1986** तथा **लोक दायित्व बीमा अधिनियम 1991** अस्तित्व में आए।",
          "• **प्रदूषक भुगतान सिद्धांत (Polluter Pays Principle)**: सर्वोच्च न्यायालय ने वेल्लोर नागरिक कल्याण मंच वाद (1996) में यह स्पष्ट किया कि प्रदूषण फैलाने वाले उद्योग को पर्यावरण की क्षतिपूर्ति और प्रभावित मानव समुदाय को मुआवजा देना होगा।",
          "• **सावधानी सिद्धांत (Precautionary Principle)**: पर्यावरणीय क्षति की संभावना होने पर कानूनी निकायों को अग्रिम सुधारात्मक कदम उठाने की शक्ति दी गई है।"
        ]),
      ],
      bodyEn: [
        ...createBlocks([
          "### Impact of Pollution on Human Communities & Legal Shields",
          "Environmental pollution directly impinges upon human health, livelihood, and community well-being.",
          "• **Post-Bhopal Jurisprudence**: The 1984 disaster catalyzed comprehensive community protection laws including the **EPA 1986** and **Public Liability Insurance Act 1991**.",
          "• **Polluter Pays Principle**: Upheld by the Supreme Court in Vellore Citizens Welfare Forum case (1996), holding polluting industries strictly liable to compensate impacted communities.",
          "• **Precautionary Principle**: Mandates state authorities to take anticipatory action to protect human settlements from ecological hazards."
        ]),
      ],
    },

    /* ── 4. Non-Applicable / Excluded Acts (NGT Exclusions) ────── */
    {
      _key: "sec-excluded-acts",
      kind: "keyAspects",
      title: "पर्यावरण संरक्षण हेतु भारत में कौन सा अधिनियम लागू नहीं है / अपवर्जित कानून",
      titleEn: "Acts Excluded from NGT Jurisdiction & Applicability Scope",
      body: [
        ...createBlocks([
          "### पर्यावरण संरक्षण हेतु NGT के तहत कौन से अधिनियम लागू नहीं हैं?",
          "प्रतियोगी परीक्षा में बार-बार पूछा जाता है कि **राष्ट्रीय हरित न्यायाधिकरण (NGT) के क्षेत्राधिकार में कौन से अधिनियम शामिल नहीं हैं?**",
          "1. **वन्यजीव (संरक्षण) अधिनियम, 1972 (Wildlife Protection Act, 1972)**: NGT इस कानून के तहत दायर अपीलों की सुनवाई नहीं करता। इसके मुकदमे उच्च न्यायालय या संबंधित वन्यजीव प्राधिकारियों के पास जाते हैं।",
          "2. **भारतीय वन अधिनियम, 1927 (Indian Forest Act, 1927)**: यह अधिनियम भी NGT अधिनियम 2010 की अनुसूची-1 से बाहर रखा गया है।",
          "• **स्मरण तथ्य**: NGT केवल 5 सिविल पर्यावरण कानूनों (जल अधिनियम 1974, जल उपकर 1977, वायु अधिनियम 1981, पर्यावरण संरक्षण अधिनियम 1986, जैव विविधता अधिनियम 2002) के तहत सुनवाई करता है।"
        ]),
      ],
      bodyEn: [
        ...createBlocks([
          "### Which Acts are Excluded from NGT Jurisdiction?",
          "A frequent high-yield exam question concerns the statutory limits of NGT jurisdiction:",
          "1. **Wildlife (Protection) Act, 1972**: Outside NGT purview; governed by High Courts and statutory wildlife authorities.",
          "2. **Indian Forest Act, 1927**: Excluded from Schedule I of NGT Act 2010.",
          "• **Key Fact**: NGT adjudicates strictly under 5 civil environmental laws (Water Act 1974, Water Cess Act 1977, Air Act 1981, EPA 1986, Biological Diversity Act 2002)."
        ]),
      ],
    },

    /* ── 5. Quick Revision Table & Key Exam Dates ────────────── */
    {
      _key: "sec-quick-revision-dates",
      kind: "keyHighlights",
      title: "पर्यावरण अधिनियम लागू होने की तिथियाँ एवं वन-लाइनर तथ्य",
      titleEn: "Enforcement Dates of Environmental Acts & Key Exam Facts",
      body: [
        ...createBlocks([
          "### भारत में प्रमुख पर्यावरण अधिनियम कब लागू हुए? (Enforcement Dates)",
          "• **वन्यजीव (संरक्षण) अधिनियम**: **9 सितंबर 1972** को लागू हुआ।",
          "• **जल (प्रदूषण निवारण एवं नियंत्रण) अधिनियम**: **23 मार्च 1974** को लागू हुआ।",
          "• **वन (संरक्षण) अधिनियम**: **25 अक्टूबर 1980** को लागू हुआ (अध्यादेश के रूप में)।",
          "• **वायु (प्रदूषण निवारण एवं नियंत्रण) अधिनियम**: **16 मई 1981** को लागू हुआ।",
          "• **पर्यावरण (संरक्षण) अधिनियम**: राष्ट्रपति की स्वीकृति **23 मई 1986** को मिली तथा यह **19 नवंबर 1986** (इंद्रा गांधी की जयंती) को लागू हुआ।",
          "• **जैव विविधता अधिनियम**: **5 फरवरी 2003** को राष्ट्रपति की सहमति मिली (कानून 2002 का है)।",
          "• **राष्ट्रीय हरित न्यायाधिकरण (NGT)**: **18 अक्टूबर 2010** को औपचारिक रूप से गठित हुआ।"
        ]),
      ],
      bodyEn: [
        ...createBlocks([
          "### Enforcement Dates of Key Environmental Acts",
          "• **Wildlife (Protection) Act**: Enforced on **9 September 1972**.",
          "• **Water Act**: Enforced on **23 March 1974**.",
          "• **Forest (Conservation) Act**: Enforced on **25 October 1980**.",
          "• **Air Act**: Enforced on **16 May 1981**.",
          "• **Environment (Protection) Act**: Presidential assent on **23 May 1986**; enforced on **19 November 1986**.",
          "• **Biological Diversity Act**: Presidential assent on **5 February 2003** (Act of 2002).",
          "• **National Green Tribunal (NGT)**: Established on **18 October 2010**."
        ]),
      ],
    }
  ];

  /* ─── EXPANDED SERP/PAA FAQS ──────────────────────────────────── */
  const faqs = [
    {
      _key: "faq-paa-1",
      question: "भारत के 11 प्रमुख पर्यावरण कानून कौन से हैं?",
      questionEn: "What are the 11 major environmental laws in India?",
      answer: "भारत के 11 प्रमुख पर्यावरण कानून हैं: 1. वन्यजीव संरक्षण अधिनियम 1972, 2. जल अधिनियम 1974, 3. जल उपकर अधिनियम 1977, 4. वन संरक्षण अधिनियम 1980, 5. वायु अधिनियम 1981, 6. पर्यावरण संरक्षण अधिनियम 1986, 7. लोक दायित्व बीमा अधिनियम 1991, 8. राष्ट्रीय पर्यावरण अपीलीय प्राधिकरण अधिनियम 1997, 9. जैव विविधता अधिनियम 2002, 10. NGT अधिनियम 2010, तथा 11. कैम्पा (CAMPA) अधिनियम 2016।",
      answerEn: "The 11 major environmental acts are: 1. Wildlife Protection Act 1972, 2. Water Act 1974, 3. Water Cess Act 1977, 4. Forest Conservation Act 1980, 5. Air Act 1981, 6. EPA 1986, 7. Public Liability Insurance Act 1991, 8. NEAA Act 1997, 9. Biological Diversity Act 2002, 10. NGT Act 2010, and 11. CAMPA Act 2016.",
    },
    {
      _key: "faq-paa-2",
      question: "पर्यावरण अधिनियम क्या है (What is Environment Protection Act)?",
      questionEn: "What is the Environment Protection Act?",
      answer: "पर्यावरण (संरक्षण) अधिनियम 1986 भारत में भोपाल गैस त्रासदी के बाद अनुच्छेद 253 के तहत पारित किया गया एक व्यापक छाता विधान (Umbrella Legislation) है, जो पर्यावरण की रक्षा, प्रदूषण नियंत्रण और खतरनाक पदार्थों के नियमन के लिए केंद्र सरकार को शक्तियाँ प्रदान करता है।",
      answerEn: "The Environment (Protection) Act 1986 is an umbrella legislation enacted under Article 253 post the 1984 Bhopal Gas Tragedy, giving broad powers to the Central Government to protect the environment and control hazardous pollutants.",
    },
    {
      _key: "faq-paa-3",
      question: "पर्यावरण अधिनियम 1981 (वायु अधिनियम 1981) क्या है?",
      questionEn: "What is the Air Pollution Act of 1981?",
      answer: "वायु (प्रदूषण निवारण एवं नियंत्रण) अधिनियम, 1981 बढ़ते वायु प्रदूषण को नियंत्रित करने और उद्योगों/वाहनों के लिए उत्सर्जन मानक तय करने के उद्देश्य से 16 मई 1981 को लागू हुआ था। 1987 में इसमें संशोधन करके ध्वनि प्रदूषण को भी वायु प्रदूषक के रूप में शामिल किया गया।",
      answerEn: "The Air (Prevention and Control of Pollution) Act 1981 came into force on 16 May 1981 to control industrial and vehicular emissions. An amendment in 1987 officially incorporated noise pollution under its scope.",
    },
    {
      _key: "faq-paa-4",
      question: "भारत की प्रमुख पर्यावरण नीतियाँ कौन-कौन सी हैं?",
      questionEn: "What are the key environmental policies of India?",
      answer: "भारत की प्रमुख पर्यावरण नीतियों में: 1. राष्ट्रीय पर्यावरण नीति 2006 (NEP 2006), 2. राष्ट्रीय वन नीति 1988, 3. राष्ट्रीय जल नीति 2012, 4. राष्ट्रीय जलवायु परिवर्तन कार्य योजना (NAPCC 2008), तथा 5. राष्ट्रीय स्वच्छ वायु कार्यक्रम (NCAP) शामिल हैं।",
      answerEn: "Key environmental policies include: 1. National Environment Policy 2006 (NEP 2006), 2. National Forest Policy 1988, 3. National Water Policy 2012, 4. National Action Plan on Climate Change (NAPCC 2008), and 5. National Clean Air Programme (NCAP).",
    },
    {
      _key: "faq-paa-5",
      question: "भारत में पर्यावरण संरक्षण अधिनियम कब लागू हुआ?",
      questionEn: "When was the Environment Protection Act enforced in India?",
      answer: "पर्यावरण (संरक्षण) अधिनियम, 1986 को राष्ट्रपति की स्वीकृति 23 मई 1986 को मिली तथा यह 19 नवंबर 1986 (श्रीमती इंदिरा गांधी की जयंती) को पूरे भारत में लागू हुआ।",
      answerEn: "The Environment (Protection) Act 1986 received Presidential assent on 23 May 1986 and officially came into force on 19 November 1986 across India.",
    },
    {
      _key: "faq-paa-6",
      question: "पर्यावरण संरक्षण हेतु भारत में कौन सा अधिनियम लागू नहीं है (NGT के बाहर है)?",
      questionEn: "Which environmental act is excluded from NGT jurisdiction in India?",
      answer: "वन्यजीव (संरक्षण) अधिनियम 1972 तथा भारतीय वन अधिनियम 1927 राष्ट्रीय हरित न्यायाधिकरण (NGT) के अधिकार क्षेत्र से बाहर रखे गए हैं।",
      answerEn: "The Wildlife (Protection) Act 1972 and the Indian Forest Act 1927 are explicitly excluded from NGT jurisdiction.",
    },
    {
      _key: "faq-paa-7",
      question: "पर्यावरण कानून नोट्स PDF कैसे डाउनलोड करें?",
      questionEn: "How to download Environmental Law Notes PDF for MPPSC & UPSC?",
      answer: "आप आकार आईएएस (Aakar IAS) की आधिकारिक वेबसाइट से MPPSC एवं UPSC परीक्षा हेतु सम्पूर्ण पर्यावरण कानून, नीतियाँ, NGT एवं अधिनियम के द्विभाषी (Hindi/English) नोट्स PDF निःशुल्क डाउनलोड कर सकते हैं।",
      answerEn: "You can download comprehensive bilingual (Hindi/English) PDF notes for Environmental Laws, NGT, and Policies for MPPSC & UPSC directly from the Aakar IAS official website.",
    }
  ];

  /* ─── EXPANDED SERP MCQS ──────────────────────────────────────── */
  const mcqs = [
    {
      _key: "mcq-serp-1",
      question: "पर्यावरण (संरक्षण) अधिनियम, 1986 भारत में किस तिथि को आधिकारिक रूप से लागू हुआ था?",
      questionEn: "On which date was the Environment (Protection) Act, 1986 officially enforced in India?",
      options: [
        "23 मई 1986 / 23 May 1986",
        "19 नवंबर 1986 / 19 November 1986",
        "9 सितंबर 1972 / 9 September 1972",
        "18 अक्टूबर 2010 / 18 October 2010"
      ],
      correctIndex: 1,
      explanation: "पर्यावरण (संरक्षण) अधिनियम 1986 को 23 मई 1986 को राष्ट्रपति की स्वीकृति मिली तथा यह 19 नवंबर 1986 को लागू हुआ।",
      explanationEn: "Assented to on 23 May 1986, the Environment (Protection) Act 1986 officially came into force on 19 November 1986.",
    },
    {
      _key: "mcq-serp-2",
      question: "भारत में किस अधिनियम के तहत केंद्रीय प्रदूषण नियंत्रण बोर्ड (CPCB) का गठन किया गया था?",
      questionEn: "Under which Act was the Central Pollution Control Board (CPCB) constituted in India?",
      options: [
        "वन्यजीव संरक्षण अधिनियम 1972",
        "जल (प्रदूषण निवारण एवं नियंत्रण) अधिनियम 1974",
        "वायु अधिनियम 1981",
        "पर्यावरण संरक्षण अधिनियम 1986"
      ],
      correctIndex: 1,
      explanation: "CPCB की स्थापना सितंबर 1974 में जल (प्रदूषण निवारण एवं नियंत्रण) अधिनियम, 1974 के तहत की गई थी।",
      explanationEn: "CPCB was constituted in September 1974 under the statutory provisions of the Water (Prevention and Control of Pollution) Act, 1974.",
    },
    {
      _key: "mcq-serp-3",
      question: "निम्नलिखित में से कौन सा कानून राष्ट्रीय हरित न्यायाधिकरण (NGT) के अधिकार क्षेत्र में नहीं आता है?",
      questionEn: "Which of the following acts does NOT fall under NGT jurisdiction?",
      options: [
        "जल (प्रदूषण निवारण एवं नियंत्रण) अधिनियम, 1974",
        "वायु (प्रदूषण निवारण एवं नियंत्रण) अधिनियम, 1981",
        "वन्यजीव (संरक्षण) अधिनियम, 1972",
        "जैव विविधता अधिनियम, 2002"
      ],
      correctIndex: 2,
      explanation: "वन्यजीव (संरक्षण) अधिनियम 1972 और भारतीय वन अधिनियम 1927 NGT अधिनियम 2010 की अनुसूची I में शामिल नहीं हैं।",
      explanationEn: "The Wildlife (Protection) Act 1972 and Indian Forest Act 1927 are explicitly excluded from NGT jurisdiction.",
    },
    {
      _key: "mcq-serp-4",
      question: "भारतीय संविधान का कौन सा अनुच्छेद संसद को अंतरराष्ट्रीय समझौतों (जैसे स्टॉकहोम 1972) को लागू करने के लिए पर्यावरण कानून बनाने की शक्ति देता है?",
      questionEn: "Which Article of the Indian Constitution empowers Parliament to legislate on environment to implement international agreements?",
      options: [
        "अनुच्छेद 246 / Article 246",
        "अनुच्छेद 253 / Article 253",
        "अनुच्छेद 356 / Article 356",
        "अनुच्छेद 368 / Article 368"
      ],
      correctIndex: 1,
      explanation: "अनुच्छेद 253 के तहत संसद को किसी भी अंतरराष्ट्रीय संधि, करार या सम्मेलन के निर्णयों को लागू करने हेतु पूरे भारत या किसी भाग के लिए कानून बनाने का अधिकार है।",
      explanationEn: "Article 253 empowers Parliament to enact legislation for giving effect to international treaties and agreements.",
    },
    {
      _key: "mcq-serp-5",
      question: "राष्ट्रीय जैव विविधता प्राधिकरण (NBA) की स्थापना किस वर्ष हुई थी और इसका मुख्यालय कहाँ है?",
      questionEn: "In which year was the National Biodiversity Authority (NBA) established and where is its headquarters?",
      options: [
        "2002 - नई दिल्ली / New Delhi",
        "2003 - चेन्नई / Chennai",
        "2010 - भोपाल / Bhopal",
        "1986 - देहरादून / Dehradun"
      ],
      correctIndex: 1,
      explanation: "जैव विविधता अधिनियम 2002 के तहत NBA की स्थापना 2003 में चेन्नई (तमिलनाडु) में की गई थी।",
      explanationEn: "NBA was established in 2003 under the Biological Diversity Act 2002 with headquarters in Chennai.",
    }
  ];

  console.log("📝 Patching document 'gk-environmental-laws-in-india' in Sanity CMS with TOP SERP SEO Data...");

  await client
    .patch("gk-environmental-laws-in-india")
    .set({
      title: titleHi,
      titleEn: titleEn,
      excerpt: excerptHi,
      excerptEn: excerptEn,
      keywords: keywords,
      sections: sections,
      faqs: faqs,
      mcqs: mcqs,
    })
    .commit();

  console.log("🎉 Successfully optimized Environmental Laws in India article for TOP GOOGLE RANKING!");
}

main().catch((err) => {
  console.error("❌ Error updating SEO:", err);
  process.exit(1);
});
