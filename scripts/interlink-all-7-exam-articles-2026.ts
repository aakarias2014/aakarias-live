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
  console.log("🔗 Removing '(SEO & AI Overview)' text from section titles across all 7 Current Affairs Articles...");

  // Article IDs mapping
  const docIds = {
    kibithu: "ca-india-china-corps-commander-talks-kibithu-2026",
    amogh: "ca-exercise-amogh-jwala-2026",
    drone: "ca-indias-first-drone-battalion-punjab-2026",
    sikhya: "ca-punjab-sikhya-kranti-2-0-2026",
    drap: "ca-dumpsite-remediation-accelerator-program-drap-2026",
    shipbuilding: "ca-worlds-first-autonomous-shipbuilding-centre-ap-2026",
    water: "ca-un-world-water-development-report-2026",
  };

  // Slugs mapping
  const urls = {
    kibithu: "/current-affairs/india-china-corps-commander-talks-kibithu-sector-2026",
    amogh: "/current-affairs/exercise-amogh-jwala-2026-indian-army-uttar-pradesh",
    drone: "/current-affairs/indias-first-drone-battalion-punjab-2026",
    sikhya: "/current-affairs/punjab-sikhya-kranti-2-0-education-scheme",
    drap: "/current-affairs/dumpsite-remediation-accelerator-program-drap-sbm-u-2-0",
    shipbuilding: "/current-affairs/worlds-first-autonomous-shipbuilding-centre-andhra-pradesh-2026",
    water: "/current-affairs/un-world-water-development-report-2026-unesco",
    mppscCa: "/mppsc-current-affairs",
    mppscSyllabus: "/mppsc/mains-syllabus",
    mppscNotes: "/mppsc-notes",
    gkHub: "/general-awareness",
  };

  // Helper to add clean interlinking section blocks
  const addInterlinkingSection = async (docId: string, interlinkBlocksHi: any[], interlinkBlocksEn: any[]) => {
    const doc: any = await client.getDocument(docId);
    if (!doc) return;

    const secId = `sec-seo-interlink-${Math.random().toString(36).substring(2, 7)}`;
    const newSectionHi = {
      _key: secId,
      kind: "syllabusInterlinking",
      title: "📌 संबंधित महत्वपूर्ण अध्ययन सामग्री एवं उपयोगी लिंक",
      titleEn: "📌 Related Exam Study Material & Links",
      body: interlinkBlocksHi,
      bodyEn: interlinkBlocksEn,
    };

    // Filter out previous interlink section if exists
    const existingSections = (doc.sections || []).filter(
      (s: any) => !(s.title && s.title.includes("संबंधित महत्वपूर्ण अध्ययन सामग्री"))
    );

    const updatedSections = [...existingSections, newSectionHi];

    // Build combined body
    const allHiBlocks: any[] = [];
    const allEnBlocks: any[] = [];
    for (const sec of updatedSections) {
      allHiBlocks.push({
        _key: `h-${sec._key}`,
        _type: "block",
        style: "h2",
        children: [{ _key: `spnh-${sec._key}`, _type: "span", text: sec.title }]
      });
      if (sec.body) allHiBlocks.push(...sec.body);

      allEnBlocks.push({
        _key: `h-en-${sec._key}`,
        _type: "block",
        style: "h2",
        children: [{ _key: `spnh-en-${sec._key}`, _type: "span", text: sec.titleEn || sec.title }]
      });
      if (sec.bodyEn) allEnBlocks.push(...sec.bodyEn);
    }

    await client.patch(docId).set({
      sections: updatedSections,
      body: allHiBlocks,
      bodyEn: allEnBlocks,
    }).commit();

    console.log(`✅ Cleaned section title for doc: ${docId}`);
  };

  // Article 1 Interlinks (Kibithu)
  await addInterlinkingSection(
    docIds.kibithu,
    [
      {
        _key: "ik-1", _type: "block", style: "normal",
        children: [
          { _type: "span", text: "• भारतीय सेना अभ्यास: " },
          { _type: "span", text: `[अमोघ ज्वाला अभ्यास 2026: उत्तर प्रदेश में सेना का 13 दिवसीय युद्ध अभ्यास](${urls.amogh})` },
        ],
      },
      {
        _key: "ik-2", _type: "block", style: "normal",
        children: [
          { _type: "span", text: "• सीमा सुरक्षा सर्विलांस: " },
          { _type: "span", text: `[पंजाब में स्थापित देश की पहली ड्रोन बटालियन एवं काउंटर-ड्रोन तकनीक](${urls.drone})` },
        ],
      },
      {
        _key: "ik-3", _type: "block", style: "normal",
        children: [
          { _type: "span", text: "• परीक्षा अध्ययन हब: " },
          { _type: "span", text: `[MPPSC दैनिक करेंट अफेयर्स पोर्टल](${urls.mppscCa})` },
          { _type: "span", text: " | " },
          { _type: "span", text: `[MPPSC मुख्य परीक्षा पेपर-2 पाठ्यक्रम](${urls.mppscSyllabus})` },
        ],
      },
    ],
    [
      {
        _key: "ik-1-en", _type: "block", style: "normal",
        children: [
          { _type: "span", text: "• Indian Army Drills: " },
          { _type: "span", text: `[Exercise Amogh Jwala 2026: Indian Army Maneuver Drill in UP](${urls.amogh})` },
        ],
      },
      {
        _key: "ik-2-en", _type: "block", style: "normal",
        children: [
          { _type: "span", text: "• Border Defense Technology: " },
          { _type: "span", text: `[India's First Drone Battalion Established in Punjab](${urls.drone})` },
        ],
      },
      {
        _key: "ik-3-en", _type: "block", style: "normal",
        children: [
          { _type: "span", text: "• Exam Resources: " },
          { _type: "span", text: `[MPPSC Daily Current Affairs Portal](${urls.mppscCa})` },
          { _type: "span", text: " | " },
          { _type: "span", text: `[MPPSC Mains Paper 2 Syllabus](${urls.mppscSyllabus})` },
        ],
      },
    ]
  );

  // Article 2 Interlinks (Amogh Jwala)
  await addInterlinkingSection(
    docIds.amogh,
    [
      {
        _key: "ia-1", _type: "block", style: "normal",
        children: [
          { _type: "span", text: "• पूर्वी सीमा सुरक्षा: " },
          { _type: "span", text: `[किबिथू सेक्टर में पहली बार भारत-चीन कोर कमांडर वार्ता](${urls.kibithu})` },
        ],
      },
      {
        _key: "ia-2", _type: "block", style: "normal",
        children: [
          { _type: "span", text: "• ड्रोन सर्विलांस तकनीक: " },
          { _type: "span", text: `[पंजाब में स्थापित देश की पहली ड्रोन बटालियन व शौर्य स्क्वाड्रन सर्विलांस](${urls.drone})` },
        ],
      },
      {
        _key: "ia-3", _type: "block", style: "normal",
        children: [
          { _type: "span", text: "• एमपीपीएससी परीक्षा पोर्टल: " },
          { _type: "span", text: `[MPPSC मुख्य परीक्षा पेपर-3 रक्षा एवं वैज्ञानिक तकनीक नोट्स](${urls.mppscNotes})` },
          { _type: "span", text: " | " },
          { _type: "span", text: `[MPPSC Current Affairs Hub](${urls.mppscCa})` },
        ],
      },
    ],
    [
      {
        _key: "ia-1-en", _type: "block", style: "normal",
        children: [
          { _type: "span", text: "• Eastern Border Security: " },
          { _type: "span", text: `[India-China Military Talks in Kibithu Sector](${urls.kibithu})` },
        ],
      },
      {
        _key: "ia-2-en", _type: "block", style: "normal",
        children: [
          { _type: "span", text: "• Tactical Drone Tech: " },
          { _type: "span", text: `[India's First Drone Battalion Operations in Punjab](${urls.drone})` },
        ],
      },
      {
        _key: "ia-3-en", _type: "block", style: "normal",
        children: [
          { _type: "span", text: "• MPPSC Study Notes: " },
          { _type: "span", text: `[MPPSC Paper 3 Defence & Science Notes](${urls.mppscNotes})` },
        ],
      },
    ]
  );

  // Article 3 Interlinks (Drone Battalion)
  await addInterlinkingSection(
    docIds.drone,
    [
      {
        _key: "id-1", _type: "block", style: "normal",
        children: [
          { _type: "span", text: "• स्वायत्त मैरीटाइम तकनीक: " },
          { _type: "span", text: `[विश्व का पहला स्वायत्त समुद्री जहाज निर्माण केंद्र आंध्र प्रदेश](${urls.shipbuilding})` },
        ],
      },
      {
        _key: "id-2", _type: "block", style: "normal",
        children: [
          { _type: "span", text: "• सेना की आधुनिक कॉम्बैट ड्रिल: " },
          { _type: "span", text: `[अमोघ ज्वाला अभ्यास 2026 में शौर्य स्क्वाड्रन सर्विलांस](${urls.amogh})` },
        ],
      },
      {
        _key: "id-3", _type: "block", style: "normal",
        children: [
          { _type: "span", text: "• परीक्षा अध्ययन सामग्री: " },
          { _type: "span", text: `[MPPSC मुख्य परीक्षा पेपर-3 विज्ञान एवं तकनीक पाठ्यक्रम 2026](${urls.mppscSyllabus})` },
          { _type: "span", text: " | " },
          { _type: "span", text: `[सामान्य अध्ययन (Static GK) विषयवार नोट्स](${urls.gkHub})` },
        ],
      },
    ],
    [
      {
        _key: "id-1-en", _type: "block", style: "normal",
        children: [
          { _type: "span", text: "• Autonomous Robotics: " },
          { _type: "span", text: `[World's First Autonomous Shipbuilding Centre in AP](${urls.shipbuilding})` },
        ],
      },
      {
        _key: "id-2-en", _type: "block", style: "normal",
        children: [
          { _type: "span", text: "• Army Combat Exercises: " },
          { _type: "span", text: `[Exercise Amogh Jwala 2026 Battle Drills](${urls.amogh})` },
        ],
      },
      {
        _key: "id-3-en", _type: "block", style: "normal",
        children: [
          { _type: "span", text: "• Exam Prep: " },
          { _type: "span", text: `[MPPSC Mains Science & Tech Syllabus](${urls.mppscSyllabus})` },
        ],
      },
    ]
  );

  // Article 4 Interlinks (Sikhya Kranti)
  await addInterlinkingSection(
    docIds.sikhya,
    [
      {
        _key: "is-1", _type: "block", style: "normal",
        children: [
          { _type: "span", text: "• सरकारी शहरी योजनाएं: " },
          { _type: "span", text: `[डंपसाइट रेमेडिएशन एक्सेलेरेटर प्रोग्राम (DRAP SBM-U 2.0)](${urls.drap})` },
        ],
      },
      {
        _key: "is-2", _type: "block", style: "normal",
        children: [
          { _type: "span", text: "• एमपी शिक्षा मॉडल: " },
          { _type: "span", text: `[MPPSC पेपर-2 मानव संसाधन विकास व सीएम राइज स्कूल योजना](${urls.mppscNotes})` },
        ],
      },
      {
        _key: "is-3", _type: "block", style: "normal",
        children: [
          { _type: "span", text: "• मुख्य परीक्षा पोर्टल: " },
          { _type: "span", text: `[MPPSC मुख्य परीक्षा विस्तृत पाठ्यक्रम 2026](${urls.mppscSyllabus})` },
          { _type: "span", text: " | " },
          { _type: "span", text: `[MPPSC Current Affairs Hub](${urls.mppscCa})` },
        ],
      },
    ],
    [
      {
        _key: "is-1-en", _type: "block", style: "normal",
        children: [
          { _type: "span", text: "• Government Initiatives: " },
          { _type: "span", text: `[Dumpsite Remediation Accelerator Program (DRAP SBM-U 2.0)](${urls.drap})` },
        ],
      },
      {
        _key: "is-2-en", _type: "block", style: "normal",
        children: [
          { _type: "span", text: "• MP Education Policy: " },
          { _type: "span", text: `[MPPSC Paper 2 Human Capital & CM RISE Schools](${urls.mppscNotes})` },
        ],
      },
    ]
  );

  // Article 5 Interlinks (DRAP)
  await addInterlinkingSection(
    docIds.drap,
    [
      {
        _key: "idr-1", _type: "block", style: "normal",
        children: [
          { _type: "span", text: "• वैश्विक जल सुरक्षा: " },
          { _type: "span", text: `[संयुक्त राष्ट्र विश्व जल विकास रिपोर्ट 2026 - यूनेस्को](${urls.water})` },
        ],
      },
      {
        _key: "idr-2", _type: "block", style: "normal",
        children: [
          { _type: "span", text: "• सामाजिक विकास योजनाएं: " },
          { _type: "span", text: `[पंजाब सिख्या क्रांति 2.0 शिक्षा सुधार पहल](${urls.sikhya})` },
        ],
      },
      {
        _key: "idr-3", _type: "block", style: "normal",
        children: [
          { _type: "span", text: "• इंदौर मॉडल व MPPSC: " },
          { _type: "span", text: `[MPPSC मुख्य परीक्षा पेपर-3 इकाई-9 पर्यावरण व ठोस अपशिष्ट प्रबंधन](${urls.mppscNotes})` },
        ],
      },
    ],
    [
      {
        _key: "idr-1-en", _type: "block", style: "normal",
        children: [
          { _type: "span", text: "• Global Water Security: " },
          { _type: "span", text: `[UN World Water Development Report 2026 by UNESCO](${urls.water})` },
        ],
      },
      {
        _key: "idr-2-en", _type: "block", style: "normal",
        children: [
          { _type: "span", text: "• Indore Waste Benchmark: " },
          { _type: "span", text: `[MPPSC Paper 3 Solid Waste Management Notes](${urls.mppscNotes})` },
        ],
      },
    ]
  );

  // Article 6 Interlinks (Autonomous Shipbuilding)
  await addInterlinkingSection(
    docIds.shipbuilding,
    [
      {
        _key: "ish-1", _type: "block", style: "normal",
        children: [
          { _type: "span", text: "• एआई व ड्रोन तकनीक: " },
          { _type: "span", text: `[पंजाब में स्थापित देश की पहली ड्रोन बटालियन](${urls.drone})` },
        ],
      },
      {
        _key: "ish-2", _type: "block", style: "normal",
        children: [
          { _type: "span", text: "• जल संसाधन व पर्यावरण: " },
          { _type: "span", text: `[संयुक्त राष्ट्र विश्व जल विकास रिपोर्ट 2026](${urls.water})` },
        ],
      },
      {
        _key: "ish-3", _type: "block", style: "normal",
        children: [
          { _type: "span", text: "• परीक्षा अध्ययन सामग्री: " },
          { _type: "span", text: `[MPPSC पेपर-3 इकाई-7 रोबोटिक्स व एआई टेक्नोलॉजी](${urls.mppscSyllabus})` },
          { _type: "span", text: " | " },
          { _type: "span", text: `[MPPSC Current Affairs Hub](${urls.mppscCa})` },
        ],
      },
    ],
    [
      {
        _key: "ish-1-en", _type: "block", style: "normal",
        children: [
          { _type: "span", text: "• Defense Drone Tech: " },
          { _type: "span", text: `[India's First Drone Battalion Established in Punjab](${urls.drone})` },
        ],
      },
      {
        _key: "ish-2-en", _type: "block", style: "normal",
        children: [
          { _type: "span", text: "• Maritime & Water Resources: " },
          { _type: "span", text: `[UN World Water Development Report 2026](${urls.water})` },
        ],
      },
    ]
  );

  // Article 7 Interlinks (UN Water Report)
  await addInterlinkingSection(
    docIds.water,
    [
      {
        _key: "iw-1", _type: "block", style: "normal",
        children: [
          { _type: "span", text: "• पर्यावरण अपशिष्ट प्रबंधन: " },
          { _type: "span", text: `[डंपसाइट रेमेडिएशन एक्सेलेरेटर प्रोग्राम (DRAP SBM-U 2.0)](${urls.drap})` },
        ],
      },
      {
        _key: "iw-2", _type: "block", style: "normal",
        children: [
          { _type: "span", text: "• अंतर्देशीय जलमार्ग व तटीय तकनीक: " },
          { _type: "span", text: `[विश्व का पहला स्वायत्त समुद्री जहाज निर्माण केंद्र आंध्र प्रदेश](${urls.shipbuilding})` },
        ],
      },
      {
        _key: "iw-3", _type: "block", style: "normal",
        children: [
          { _type: "span", text: "• एमपी भूजल एवं पर्यावरण: " },
          { _type: "span", text: `[MPPSC मुख्य परीक्षा पेपर-3 इकाई-10 जल संसाधन व भूजल रीचार्ज नोट्स](${urls.mppscNotes})` },
          { _type: "span", text: " | " },
          { _type: "span", text: `[MPPSC Current Affairs Portal](${urls.mppscCa})` },
        ],
      },
    ],
    [
      {
        _key: "iw-1-en", _type: "block", style: "normal",
        children: [
          { _type: "span", text: "• Urban Environmental Remediation: " },
          { _type: "span", text: `[Dumpsite Remediation Accelerator Program (DRAP SBM-U 2.0)](${urls.drap})` },
        ],
      },
      {
        _key: "iw-2-en", _type: "block", style: "normal",
        children: [
          { _type: "span", text: "• MP Groundwater & Hydrology: " },
          { _type: "span", text: `[MPPSC Paper 3 Unit 10 Water Resources Notes](${urls.mppscNotes})` },
        ],
      },
    ]
  );

  console.log("🎉 ALL SECTION TITLES CLEANED AND REMOVED '(SEO & AI Overview)' SUCCESSFULLY!");
}

main().catch((err) => {
  console.error("❌ Error running clean script:", err);
  process.exit(1);
});
