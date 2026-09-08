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

if (!projectId || dataset === undefined || !token) {
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
  console.log("🕸️ Starting Comprehensive 2-Way Domain Authority SEO Interlinking (New <-> Old Articles)...");

  // New Articles Slugs
  const newUrls = {
    kibithu: "/current-affairs/india-china-corps-commander-talks-kibithu-sector-2026",
    amogh: "/current-affairs/exercise-amogh-jwala-2026-indian-army-uttar-pradesh",
    drone: "/current-affairs/indias-first-drone-battalion-punjab-2026",
    sikhya: "/current-affairs/punjab-sikhya-kranti-2-0-education-scheme",
    drap: "/current-affairs/dumpsite-remediation-accelerator-program-drap-sbm-u-2-0",
    shipbuilding: "/current-affairs/worlds-first-autonomous-shipbuilding-centre-andhra-pradesh-2026",
    water: "/current-affairs/un-world-water-development-report-2026-unesco",
  };

  // Old High-Authority Articles Slugs
  const oldUrls = {
    ramsar: "/general-awareness/ramsar-sites-in-india",
    paramPragya: "/general-awareness/param-pragya-ai-supercomputer-india-supercomputing-journey",
    supercomputerGk: "/general-awareness/supercomputer-what-is-supercomputing-history-india-mppsc-notes",
    disasterAct: "/current-affairs/disaster-management-amendment-act-2025-mppsc-upsc-notes",
    g7Summit: "/current-affairs/g7-summit-2026-pm-modi-outreach-session",
    envLaws: "/general-awareness/environmental-laws-in-india-acts-constitutional-provisions-mppsc-notes",
    intOrg: "/general-awareness/international-organizations-headquarters-list-tricks-mppsc-notes",
    disasterNcert: "/general-awareness/what-is-disaster-management-ncert-types-mppsc-notes",
    isroEos: "/current-affairs/isro-gslv-f17-eos-05-mission-2026",
    mpUcc: "/current-affairs/mp-ucc-bill-2026-cabinet-approval",
    womenSafety: "/general-awareness/women-safety-laws-in-india",
  };

  // Helper to append interlink blocks to an existing document's body
  const appendInterlinksToDoc = async (docId: string, titleText: string, links: { text: string; url: string }[]) => {
    const doc: any = await client.getDocument(docId);
    if (!doc || !doc.body) return;

    // Filter existing interlink block with same title to prevent duplication
    const filteredBody = doc.body.filter(
      (b: any) => !(b.style === "h3" && b.children && b.children.some((c: any) => c.text && c.text.includes(titleText)))
    );

    const interlinkBlock = [
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: titleText }],
      },
      ...links.map((link) => ({
        _type: "block",
        style: "normal",
        children: [
          { _type: "span", text: "👉 " },
          { _type: "span", text: `[${link.text}](${link.url})` },
        ],
      })),
    ];

    const updatedBody = [...filteredBody, ...interlinkBlock];
    await client.patch(docId).set({ body: updatedBody }).commit();
    console.log(`✅ Old document updated with authority link: ${docId}`);
  };

  // 1. UPDATE OLD HIGH-AUTHORITY ARTICLES WITH LINKS TO NEW ARTICLES
  console.log("📥 Step 1: Injecting new article links into Old High-Authority documents...");

  // Update Ramsar Sites document
  await appendInterlinksToDoc(
    "gk-ramsar-sites-in-india",
    "नवीनतम जल एवं पर्यावरण सामयिकी (Current Affairs 2026)",
    [
      { text: "संयुक्त राष्ट्र विश्व जल विकास रिपोर्ट 2026: यूनेस्को द्वारा जारी भूजल रिपोर्ट", url: newUrls.water },
      { text: "डंपसाइट रेमेडिएशन एक्सेलेरेटर प्रोग्राम (DRAP SBM-U 2.0)", url: newUrls.drap },
    ]
  );

  // Update Environmental Laws document
  await appendInterlinksToDoc(
    "gk-environmental-laws-india",
    "नवीनतम पर्यावरण कानून व योजनाएं (2026)",
    [
      { text: "डंपसाइट रेमेडिएशन एक्सेलेरेटर प्रोग्राम (DRAP SBM-U 2.0) - स्वच्छ भारत मिशन शहरी 2.0", url: newUrls.drap },
      { text: "संयुक्त राष्ट्र विश्व जल विकास रिपोर्ट 2026 (UNESCO)", url: newUrls.water },
    ]
  );

  // Update PARAM Pragya Supercomputer document
  await appendInterlinksToDoc(
    "gk-param-pragya-ai-supercomputer",
    "नवीनतम एआई एवं रक्षा तकनीक (Defence & AI 2026)",
    [
      { text: "देश की पहली ड्रोन बटालियन: पंजाब में शुरुआत व एआई सर्विलांस", url: newUrls.drone },
      { text: "विश्व का पहला स्वायत्त समुद्री जहाज निर्माण केंद्र (आंध्र प्रदेश)", url: newUrls.shipbuilding },
    ]
  );

  // Update Disaster Management Amendment Act document
  await appendInterlinksToDoc(
    "ca-disaster-management-amendment-act-2025",
    "संबंधित सैन्य अभ्यास व सुरक्षा तंत्र",
    [
      { text: "अमोघ ज्वाला अभ्यास 2026: बबीना रेंज में सेना का 13 दिवसीय युद्ध अभ्यास", url: newUrls.amogh },
      { text: "पंजाब में स्थापित देश की पहली ड्रोन बटालियन व बॉर्डर सर्विलांस", url: newUrls.drone },
    ]
  );

  // Update G-7 Summit document
  await appendInterlinksToDoc(
    "ca-g7-summit-2026-modi-outreach-session",
    "संबंधित द्विपक्षीय सुरक्षा एवं कूटनीति",
    [
      { text: "किबिथू सेक्टर में पहली बार भारत-चीन कोर कमांडर स्तर की वार्ता", url: newUrls.kibithu },
    ]
  );

  // 2. UPDATE ALL 7 NEW ARTICLES WITH LINKS TO OLD HIGH-AUTHORITY ARTICLES
  console.log("📤 Step 2: Injecting Old High-Authority links into 7 New Articles...");

  const updateNewDocWithOldLinks = async (
    docId: string,
    additionalHiLinks: { text: string; url: string }[],
    additionalEnLinks: { text: string; url: string }[]
  ) => {
    const doc: any = await client.getDocument(docId);
    if (!doc || !doc.sections) return;

    // Find the SEO interlinking section
    const interlinkSecIdx = doc.sections.findIndex(
      (s: any) => s.title && s.title.includes("संबंधित महत्वपूर्ण अध्ययन सामग्री")
    );

    if (interlinkSecIdx !== -1) {
      const sec = doc.sections[interlinkSecIdx];
      const extraHiBlocks = additionalHiLinks.map((link) => ({
        _key: `blk-old-${Math.random().toString(36).substring(2, 7)}`,
        _type: "block",
        style: "normal",
        children: [
          { _type: "span", text: "• " },
          { _type: "span", text: `[${link.text}](${link.url})` },
        ],
      }));

      const extraEnBlocks = additionalEnLinks.map((link) => ({
        _key: `blk-old-en-${Math.random().toString(36).substring(2, 7)}`,
        _type: "block",
        style: "normal",
        children: [
          { _type: "span", text: "• " },
          { _type: "span", text: `[${link.text}](${link.url})` },
        ],
      }));

      sec.body = [...(sec.body || []), ...extraHiBlocks];
      sec.bodyEn = [...(sec.bodyEn || []), ...extraEnBlocks];

      // Rebuild top-level body arrays
      const allHiBlocks: any[] = [];
      const allEnBlocks: any[] = [];
      for (const s of doc.sections) {
        allHiBlocks.push({
          _key: `h-${s._key}`,
          _type: "block",
          style: "h2",
          children: [{ _key: `spnh-${s._key}`, _type: "span", text: s.title }]
        });
        if (s.body) allHiBlocks.push(...s.body);

        allEnBlocks.push({
          _key: `h-en-${s._key}`,
          _type: "block",
          style: "h2",
          children: [{ _key: `spnh-en-${s._key}`, _type: "span", text: s.titleEn || s.title }]
        });
        if (s.bodyEn) allEnBlocks.push(...s.bodyEn);
      }

      await client.patch(docId).set({
        sections: doc.sections,
        body: allHiBlocks,
        bodyEn: allEnBlocks,
      }).commit();

      console.log(`✅ 2-Way Authority Links added to New Doc: ${docId}`);
    }
  };

  // 1. Kibithu Talks -> Old Articles
  await updateNewDocWithOldLinks(
    "ca-india-china-corps-commander-talks-kibithu-2026",
    [
      { text: "जी-7 शिखर सम्मेलन 2026: संपर्क सत्र में प्रधानमंत्री मोदी का संबोधन", url: oldUrls.g7Summit },
      { text: "अंतर्राष्ट्रीय संगठन एवं उनके मुख्यालय: संपूर्ण सूची व ट्रिक्स", url: oldUrls.intOrg },
    ],
    [
      { text: "G-7 Summit 2026: PM Modi's Participation in Outreach Session", url: oldUrls.g7Summit },
      { text: "International Organizations and Their Headquarters Complete List", url: oldUrls.intOrg },
    ]
  );

  // 2. Amogh Jwala -> Old Articles
  await updateNewDocWithOldLinks(
    "ca-exercise-amogh-jwala-2026",
    [
      { text: "परम प्रज्ञा AI सुपरकंप्यूटर व भारत की सुपरकंप्यूटिंग यात्रा", url: oldUrls.paramPragya },
      { text: "आपदा प्रबंधन (संशोधन) अधिनियम 2025: UDMA धारा 41A प्रावधान", url: oldUrls.disasterAct },
    ],
    [
      { text: "PARAM Pragya AI Supercomputer: India's Supercomputing Journey", url: oldUrls.paramPragya },
      { text: "Disaster Management Amendment Act 2025 Notes", url: oldUrls.disasterAct },
    ]
  );

  // 3. Drone Battalion -> Old Articles
  await updateNewDocWithOldLinks(
    "ca-indias-first-drone-battalion-punjab-2026",
    [
      { text: "ISRO GSLV-F17 / EOS-05 अर्थ ऑब्जर्वेशन सैटेलाइट मिशन 2026", url: oldUrls.isroEos },
      { text: "भारत में सुपर कंप्यूटर: इतिहास, जनक, सूची व रक्षा उपयोग", url: oldUrls.supercomputerGk },
    ],
    [
      { text: "ISRO GSLV-F17 EOS-05 Mission 2026", url: oldUrls.isroEos },
      { text: "Supercomputers in India: History & Full List", url: oldUrls.supercomputerGk },
    ]
  );

  // 4. Sikhya Kranti -> Old Articles
  await updateNewDocWithOldLinks(
    "ca-punjab-sikhya-kranti-2-0-2026",
    [
      { text: "मध्य प्रदेश समान नागरिक संहिता (UCC) विधेयक 2026", url: oldUrls.mpUcc },
      { text: "महिलाओं की सुरक्षा से संबंधित प्रमुख कानून व अधिकार", url: oldUrls.womenSafety },
    ],
    [
      { text: "MP Uniform Civil Code Bill 2026 Notes", url: oldUrls.mpUcc },
      { text: "Major Women Safety Laws in India", url: oldUrls.womenSafety },
    ]
  );

  // 5. DRAP Dumpsite -> Old Articles
  await updateNewDocWithOldLinks(
    "ca-dumpsite-remediation-accelerator-program-drap-2026",
    [
      { text: "भारत में पर्यावरण संरक्षण अधिनियम (Environment Protection Act 1986)", url: oldUrls.envLaws },
      { text: "मध्य प्रदेश के रामसर स्थल (कुल 5) एवं भारत में 101 रामसर स्थल 2026", url: oldUrls.ramsar },
    ],
    [
      { text: "Environmental Laws in India: Acts & Constitutional Provisions", url: oldUrls.envLaws },
      { text: "Ramsar Sites in Madhya Pradesh & India 2026 Complete List", url: oldUrls.ramsar },
    ]
  );

  // 6. Autonomous Shipbuilding -> Old Articles
  await updateNewDocWithOldLinks(
    "ca-worlds-first-autonomous-shipbuilding-centre-ap-2026",
    [
      { text: "परम प्रज्ञा AI सुपरकंप्यूटर: भारत की हाई-परफॉर्मेंस कंप्यूटिंग क्रांति", url: oldUrls.paramPragya },
      { text: "ISRO GSLV-F17 / EOS-05 अर्थ ऑब्जर्वेशन सैटेलाइट 2026", url: oldUrls.isroEos },
    ],
    [
      { text: "PARAM Pragya AI Supercomputer Notes", url: oldUrls.paramPragya },
      { text: "ISRO GSLV-F17 EOS-05 Earth Observation Mission", url: oldUrls.isroEos },
    ]
  );

  // 7. UN Water Report -> Old Articles
  await updateNewDocWithOldLinks(
    "ca-un-world-water-development-report-2026",
    [
      { text: "मध्य प्रदेश के रामसर स्थल (कुल 5) एवं भारत की 101 आर्द्रभूमियां", url: oldUrls.ramsar },
      { text: "भारत में पर्यावरण संरक्षण कानून एवं संवैधानिक प्रावधान", url: oldUrls.envLaws },
      { text: "अंतर्राष्ट्रीय संगठन एवं उनके मुख्यालय: संपूर्ण सूची व ट्रिक्स", url: oldUrls.intOrg },
    ],
    [
      { text: "Ramsar Sites in Madhya Pradesh & India 2026 List", url: oldUrls.ramsar },
      { text: "Environmental Laws in India Notes", url: oldUrls.envLaws },
      { text: "International Organizations and Their Headquarters List", url: oldUrls.intOrg },
    ]
  );

  console.log("🎉 ALL 2-WAY AUTHORITY INTERLINKS SYNCED SUCCESSFULLY TO SANITY CMS!");
}

main().catch((err) => {
  console.error("❌ Error running 2-way interlinking script:", err);
  process.exit(1);
});
