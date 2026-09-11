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
  console.log("🚀 Uploading Ramon Magsaysay Award 2026 Article with Rich Interlinking to Sanity...");

  // Image file paths in public/images/blog/
  const imagePaths = {
    medallion: path.resolve(process.cwd(), "public/images/blog/ramon-magsaysay-2026-1.jpg"),
    hospital: path.resolve(process.cwd(), "public/images/blog/ramon-magsaysay-2026-2.jpg"),
    diplomacy: path.resolve(process.cwd(), "public/images/blog/ramon-magsaysay-2026-3.jpg"),
  };

  // Check if files exist
  if (!fs.existsSync(imagePaths.medallion) || !fs.existsSync(imagePaths.hospital) || !fs.existsSync(imagePaths.diplomacy)) {
    console.error("❌ Required images not found in public/images/blog/");
    process.exit(1);
  }

  // 1. Upload Medallion Image (Featured Image)
  console.log("📸 Uploading medallion image...");
  const assetMedallion = await client.assets.upload("image", fs.createReadStream(imagePaths.medallion), {
    filename: "ramon_magsaysay_2026_medallion.jpg",
  });
  console.log(`✔ Uploaded medallion image. Asset ID: ${assetMedallion._id}`);

  // 2. Upload Floating Hospital Image
  console.log("📸 Uploading floating hospital image...");
  const assetHospital = await client.assets.upload("image", fs.createReadStream(imagePaths.hospital), {
    filename: "ramon_magsaysay_2026_runa_khan_hospital.jpg",
  });
  console.log(`✔ Uploaded floating hospital image. Asset ID: ${assetHospital._id}`);

  // 3. Upload Diplomacy Image
  console.log("📸 Uploading diplomacy image...");
  const assetDiplomacy = await client.assets.upload("image", fs.createReadStream(imagePaths.diplomacy), {
    filename: "ramon_magsaysay_2026_tommy_koh_diplomacy.jpg",
  });
  console.log(`✔ Uploaded diplomacy image. Asset ID: ${assetDiplomacy._id}`);

  // 4. Construct Article Document with Rich Interlinking
  const article = {
    _id: "ca-ramon-magsaysay-award-2026",
    _type: "currentAffairs",
    slug: { _type: "slug", current: "ramon-magsaysay-award-2026-winners-list" },
    title: "रमन मैग्सेसे पुरस्कार 2026: विजेताओं की पूरी सूची, एशिया का प्रतिष्ठित सम्मान एवं महत्वपूर्ण तथ्य (MPPSC & UPSC)",
    titleEn: "Ramon Magsaysay Award 2026: Full Winners List, Asia's Premier Honor & Key Exam Facts (MPPSC & UPSC)",
    excerpt: "रमन मैग्सेसे पुरस्कार 2026 (68वां संस्करण) के लिए तीन एशियाई व्यक्तित्वों—टॉमी कोह (सिंगापुर), रुना खान (बांग्लादेश) और बो की (म्याँमार) को चुना गया है। जानिए एशिया के नोबेल पुरस्कार का इतिहास, भारत से जुड़े प्रमुख तथ्य और MPPSC/UPSC हेतु 8 अभ्यास प्रश्न।",
    excerptEn: "The 68th Ramon Magsaysay Award 2026 honours three Asian leaders: Tommy Koh (Singapore), Runa Khan (Bangladesh), and Bo Kyi (Myanmar). Explore the history of Asia's Nobel Prize, Indian laureates, and 8 practice MCQs for MPPSC & UPSC.",
    ca_date: "2026-09-11",
    publishedAt: new Date().toISOString(),
    featured: true,
    readingTime: 7,
    keywords: [
      "रमन मैग्सेसे पुरस्कार 2026",
      "Ramon Magsaysay Award 2026 winners list",
      "Tommy Koh Singapore",
      "Runa Khan Bangladesh Friendship",
      "Bo Kyi Myanmar AAPP",
      "Asia Nobel Prize",
      "एशिया का नोबेल पुरस्कार",
      "Vinoba Bhave 1958",
      "Educate Girls 2025",
      "Dr R Ravi Kannan 2023",
      "MPPSC Current Affairs 2026",
      "UPSC Current Affairs 2026",
      "Ramon Magsaysay Award Foundation Manila"
    ],
    category: { _type: "reference", _ref: "cat-misc" },
    author: { _type: "reference", _ref: "author-aakar" },
    tags: [
      { _type: "reference", _ref: "tag-mppsc" },
      { _type: "reference", _ref: "tag-upsc" },
      { _type: "reference", _ref: "tag-prelims" },
      { _type: "reference", _ref: "tag-mains" },
    ],
    syllabus: ["Prelims-GS", "GS-2", "GS-1"],
    featuredImage: {
      _type: "image",
      asset: { _type: "reference", _ref: assetMedallion._id },
      alt: "Ramon Magsaysay Award 2026 Golden Medallion and Ceremonial Ribbon",
    },
    nextArticle: {
      title: "पीएम मोदी को मिला इंडोनेशिया का सर्वोच्च नागरिक सम्मान ‘बिंतांग आदिपूर्णा’",
      titleEn: "PM Modi Honored with Indonesia's Highest Civilian Award 'Bintang Adipurna'",
      href: "/current-affairs/bintang-adipurna-modi-indonesia-award",
    },

    /* ─── SECTIONS WITH INTERLINKS ──────────────────────────────── */
    sections: [
      /* ── 1. Why in News ──────────────────────────────────────── */
      {
        _key: "sec-context",
        kind: "whyInNews",
        title: "प्रसंग एवं चर्चा में क्यों? (Why in News?)",
        titleEn: "Why in News? (Context)",
        body: [
          {
            _key: "b1-1",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s1-1",
                _type: "span",
                text: "31 अगस्त 2026 को **रमन मैग्सेसे पुरस्कार फाउंडेशन (Ramon Magsaysay Award Foundation - RMAF)** ने 68वें रमन मैग्सेसे पुरस्कार 2026 (Ramon Magsaysay Award 2026) के विजेताओं की आधिकारिक घोषणा की। इस वर्ष एशिया के सबसे प्रतिष्ठित नागरिक सम्मान हेतु तीन प्रमुख एशियाई नेताओं को चुना गया है। अंतर्राष्ट्रीय पुरस्कारों एवं राष्ट्रीय सम्मान की विस्तृत जानकारी हेतु हमारे [पुरस्कार एवं सम्मान सेक्शन](/awards-and-honors) तथा नवीनतम [MPPSC करेंट अफेयर्स](/mppsc-current-affairs) पर जाएं।",
              },
            ],
          },
          {
            _key: "b1-2",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s1-2",
                _type: "span",
                text: "• **टॉमी कोह (Tommy Koh)** — सिंगापुर: अंतर्राष्ट्रीय कूटनीति, पर्यावरण कानून (UNCLOS) और वैश्विक शांति में छः दशकों के अमूल्य योगदान के लिए।",
              },
            ],
          },
          {
            _key: "b1-3",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s1-3",
                _type: "span",
                text: "• **रुना खान (Runa Khan)** — बांग्लादेश: 'फ्रेंडशिप' (Friendship) एनजीओ के माध्यम से दूरस्थ नदी तटीय (Char) समुदायों को फ्लोटिंग अस्पतालों के जरिए स्वास्थ्य, शिक्षा और सामाजिक विकास प्रदान करने के लिए।",
              },
            ],
          },
          {
            _key: "b1-4",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s1-4",
                _type: "span",
                text: "• **बो की (Bo Kyi)** — म्याँमार: 'असिस्टेंस एसोसिएशन फॉर पॉलिटिकल प्रिजनर्स' (AAPP) के माध्यम से राजनीतिक बंदियों के अधिकारों, मानवाधिकारों और लोकतांत्रिक मूल्यों की रक्षा के लिए।",
              },
            ],
          },
          {
            _key: "b1-5",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s1-5",
                _type: "span",
                text: "यह पुरस्कार समारोह **15 नवंबर 2026** को फिलीपींस की राजधानी मनीला के ऐतिहासिक मेट्रोपॉलिटन थिएटर में आयोजित किया जाएगा। वर्ष 2026 में किसी भी भारतीय व्यक्ति या संस्था को यह पुरस्कार नहीं मिला है।",
              },
            ],
          },
        ],
        bodyEn: [
          {
            _key: "b1-6",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s1-6",
                _type: "span",
                text: "On August 31, 2026, the **Ramon Magsaysay Award Foundation (RMAF)** announced the laureates of the 68th Ramon Magsaysay Award 2026. For comprehensive coverage of international honors and national awards, visit our dedicated [Awards and Honors Section](/en/awards-and-honors) and explore [MPPSC Current Affairs](/en/mppsc-current-affairs).",
              },
            ],
          },
          {
            _key: "b1-7",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s1-7",
                _type: "span",
                text: "• **Tommy Koh (Singapore)**: Recognized for six decades of transformative work in international diplomacy, UNCLOS ocean law, and global dispute resolution.",
              },
            ],
          },
          {
            _key: "b1-8",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s1-8",
                _type: "span",
                text: "• **Runa Khan (Bangladesh)**: Honored for pioneering floating boat hospitals, primary healthcare, education, and climate resilience in remote river communities via NGO 'Friendship'.",
              },
            ],
          },
          {
            _key: "b1-9",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s1-9",
                _type: "span",
                text: "• **Bo Kyi (Myanmar)**: Celebrated for relentless human rights advocacy, supporting political prisoners, and restoring democratic freedoms through the Assistance Association for Political Prisoners (AAPP).",
              },
            ],
          },
          {
            _key: "b1-10",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s1-10",
                _type: "span",
                text: "The presentation ceremony will be held on **November 15, 2026**, at the Metropolitan Theater in Manila, Philippines. Notably, no Indian candidate or organization was named among the 2026 laureates.",
              },
            ],
          },
        ],
      },

      /* ── 2. Winners Detailed Breakdown ────────────────────── */
      {
        _key: "sec-winners-breakdown",
        kind: "keyHighlights",
        title: "रमन मैग्सेसे पुरस्कार 2026: विजेताओं का विस्तृत विवरण",
        titleEn: "Ramon Magsaysay Award 2026: Detailed Profile of Winners",
        body: [
          {
            _key: "b2-1",
            _type: "block",
            style: "h3",
            children: [{ _key: "s2-1", _type: "span", text: "1. टॉमी कोह (Tommy Koh) — सिंगापुर" }],
          },
          {
            _key: "b2-2",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s2-2",
                _type: "span",
                text: "• **क्षेत्र**: अंतर्राष्ट्रीय कूटनीति, पर्यावरण कानून और वैश्विक न्याय। अंतर्राष्ट्रीय सम्मेलनों एवं अंतरराष्ट्रीय संबंधों के अध्ययन के लिए [MPPSC Mains GS-2 पाठ्यक्रम](/mppsc/mains-syllabus) देखें।",
              },
            ],
          },
          {
            _key: "b2-3",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s2-3",
                _type: "span",
                text: "• **प्रमुख योगदान**: प्रो. टॉमी कोह सिंगापुर के अनुभवी राजनयिक व कानूनविद हैं। उन्होंने 1982 में **समुद्र के कानून पर संयुक्त राष्ट्र सम्मेलन (UNCLOS)** के अध्यक्ष के रूप में ऐतिहासिक भूमिका निभाई। इसके अलावा 1992 के रियो पृथ्वी सम्मेलन की मुख्य समिति की अध्यक्षता की। उन्होंने अंतर्राष्ट्रीय शांति वार्ता और पर्यावरण संरक्षण हेतु छह दशकों तक अमूल्य सेवा दी है।",
              },
            ],
          },
          {
            _key: "b2-img-1",
            _type: "image",
            asset: { _type: "reference", _ref: assetDiplomacy._id },
            alt: "Prof. Tommy Koh addressing an international conference on international law and diplomacy",
          },
          {
            _key: "b2-4",
            _type: "block",
            style: "h3",
            children: [{ _key: "s2-4", _type: "span", text: "2. रुना खान (Runa Khan) — बांग्लादेश" }],
          },
          {
            _key: "b2-5",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s2-5",
                _type: "span",
                text: "• **क्षेत्र**: स्वास्थ्य सेवा, शिक्षा, सामाजिक विकास और जलवायु अनुकूलन। सतत विकास व स्वास्थ्य अभियानों के अध्ययन हेतु [सामान्य ज्ञान व पर्यावरण नोट्स](/general-awareness) देखें।",
              },
            ],
          },
          {
            _key: "b2-6",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s2-6",
                _type: "span",
                text: "• **प्रमुख योगदान**: रुना खान बांग्लादेशी सामाजिक उद्यमी और गैर-सरकारी संगठन **'फ्रेंडशिप' (Friendship NGO)** की संस्थापिका हैं। उन्होंने बांग्लादेश के बाह्य एवं बाढ़-प्रभावित नदी द्वीपों (चौर क्षेत्रों) में **तैरते अस्पतालों (Floating Hospital Ships)** का संचालन शुरू किया, जिससे लाखों वंचित ग्रामीणों को मुफ्त प्राथमिक व विशेषज्ञ स्वास्थ्य सुविधाएं प्राप्त हुईं।",
              },
            ],
          },
          {
            _key: "b2-img-2",
            _type: "image",
            asset: { _type: "reference", _ref: assetHospital._id },
            alt: "Runa Khan's Friendship NGO floating hospital boat providing medical care in Bangladesh",
          },
          {
            _key: "b2-7",
            _type: "block",
            style: "h3",
            children: [{ _key: "s2-7", _type: "span", text: "3. बो की (Bo Kyi) — म्याँमार" }],
          },
          {
            _key: "b2-8",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s2-8",
                _type: "span",
                text: "• **क्षेत्र**: राजनीतिक बंदियों की सहायता, मानवाधिकार और नागरिक स्वतंत्रता। नागरिक स्वतंत्रता एवं राजव्यवस्था के अध्ययन हेतु [MPPSC नोट्स ऑनलाइन](/mppsc-notes) पर जाएं।",
              },
            ],
          },
          {
            _key: "b2-9",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s2-9",
                _type: "span",
                text: "• **प्रमुख योगदान**: बो की स्वयं म्याँमार में पूर्व राजनीतिक बंदी रहे हैं। उन्होंने **'असिस्टेंस एसोसिएशन फॉर पॉलिटिकल प्रिजनर्स' (AAPP)** की सह-स्थापना की। सैन्य शासन के तहत जेलों में बंद कार्यकर्ताओं, पत्रकारों और राजनीतिक बंदियों की रिहाई, विधिक सहायता और उनके पुनर्वास के लिए उन्होंने निरंतर साहसिक कार्य किया।",
              },
            ],
          },
        ],
        bodyEn: [
          {
            _key: "b2-10",
            _type: "block",
            style: "h3",
            children: [{ _key: "s2-10", _type: "span", text: "1. Tommy Koh (Singapore)" }],
          },
          {
            _key: "b2-11",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s2-11",
                _type: "span",
                text: "• **Domain**: International Relations, Ocean Law, Global Peace, and Environmental Justice. For international conventions, read our [MPPSC Mains Syllabus Guide](/en/mppsc/mains-syllabus).",
              },
            ],
          },
          {
            _key: "b2-12",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s2-12",
                _type: "span",
                text: "• **Contributions**: Prof. Tommy Koh served as President of the Third UN Conference on the **Law of the Sea (UNCLOS)** in 1982 and chaired the Main Committee of the 1992 Rio Earth Summit. Over six decades, he has forged consensus on international treaties, maritime laws, and environmental conventions.",
              },
            ],
          },
          {
            _key: "b2-img-1-en",
            _type: "image",
            asset: { _type: "reference", _ref: assetDiplomacy._id },
            alt: "Prof. Tommy Koh addressing an international conference on international law and diplomacy",
          },
          {
            _key: "b2-13",
            _type: "block",
            style: "h3",
            children: [{ _key: "s2-13", _type: "span", text: "2. Runa Khan (Bangladesh)" }],
          },
          {
            _key: "b2-14",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s2-14",
                _type: "span",
                text: "• **Domain**: Healthcare Access, Primary Education, Climate Adaptation, Rural Development. Explore our [General Awareness Notes](/en/general-awareness) for similar social development topics.",
              },
            ],
          },
          {
            _key: "b2-15",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s2-15",
                _type: "span",
                text: "• **Contributions**: Runa Khan is Founder of NGO **'Friendship'**. She pioneered solar-powered **floating hospital ships** operating along vulnerable river islands in Bangladesh, bringing free specialized healthcare, education, and climate adaptation training to isolated communities.",
              },
            ],
          },
          {
            _key: "b2-img-2-en",
            _type: "image",
            asset: { _type: "reference", _ref: assetHospital._id },
            alt: "Runa Khan's Friendship NGO floating hospital boat providing medical care in Bangladesh",
          },
          {
            _key: "b2-16",
            _type: "block",
            style: "h3",
            children: [{ _key: "s2-16", _type: "span", text: "3. Bo Kyi (Myanmar)" }],
          },
          {
            _key: "b2-17",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s2-17",
                _type: "span",
                text: "• **Domain**: Political Prisoner Advocacy, Human Rights Defense, Democratic Freedom. See our [MPPSC Notes Collection](/en/mppsc-notes) for Polity & Rights modules.",
              },
            ],
          },
          {
            _key: "b2-18",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s2-18",
                _type: "span",
                text: "• **Contributions**: A former political prisoner, Bo Kyi co-founded the **Assistance Association for Political Prisoners (AAPP)**. He has dedicated his life to documenting human rights abuses and securing the release of political detainees in Myanmar.",
              },
            ],
          },
        ],
      },

      /* ── 3. History and Significance ───────────────────────── */
      {
        _key: "sec-history-significance",
        kind: "background",
        title: "रमन मैग्सेसे पुरस्कार: महत्वपूर्ण तथ्य एवं इतिहास",
        titleEn: "Ramon Magsaysay Award: Key History & Significance",
        body: [
          {
            _key: "b3-1",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s3-1",
                _type: "span",
                text: "• **स्थापना की पृष्ठभूमि**: वर्ष 1957 में फिलीपींस के 7वें राष्ट्रपति **रमन मैग्सेसे (Ramon Magsaysay)** की विमान दुर्घटना में मृत्यु के पश्चात उनकी स्मृति में 1958 में इस पुरस्कार की स्थापना की गई थी। अंतर्राष्ट्रीय नागरिक पुरस्कारों की तुलना हेतु हमारे [भारत के 5 सर्वोच्च नागरिक पुरस्कार (भारत रत्न व पद्म सम्मान) गाइड](/general-awareness/highest-civilian-awards-padma-awards-mppsc-upsc-notes) को पढ़ें।",
              },
            ],
          },
          {
            _key: "b3-2",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s3-2",
                _type: "span",
                text: "• **प्रदान करने वाली संस्था**: **रमन मैग्सेसे पुरस्कार फाउंडेशन (RMAF)**, मनीला (फिलीपींस) द्वारा इसे प्रतिवर्ष 31 अगस्त (रमन मैग्सेसे का जन्मदिवस) को घोषित किया जाता है।",
              },
            ],
          },
          {
            _key: "b3-3",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s3-3",
                _type: "span",
                text: "• **एशिया का नोबेल पुरस्कार (Asia's Nobel Prize)**: यह पुरस्कार जाति, राष्ट्रीयता, लिंग या धर्म के भेदभाव के बिना एशियाई लोगों व संस्थाओं को निःस्वार्थ जनसेवा, मानवीय नेतृत्व और सकारात्मक परिवर्तन के लिए दिया जाने वाला महाद्वीप का सर्वोच्च सम्मान है।",
              },
            ],
          },
          {
            _key: "b3-4",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s3-4",
                _type: "span",
                text: "• **पुरस्कार श्रेणी में बदलाव (1958-2008 बनाम 2009 से अब तक)**: 1958 से 2008 तक यह 6 निश्चित श्रेणियों में दिया जाता था। 2009 से निश्चित श्रेणियां हटा दी गईं और किसी भी क्षेत्र में असाधारण परिवर्तनकारी नेतृत्व हेतु दिया जाने लगा।",
              },
            ],
          },
        ],
        bodyEn: [
          {
            _key: "b3-5",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s3-5",
                _type: "span",
                text: "• **Establishment**: Established in April 1957 in memory of Ramon Magsaysay, 7th President of the Philippines. For comparative national honors, see our [5 Highest Civilian Awards of India Guide](/en/general-awareness/highest-civilian-awards-padma-awards-mppsc-upsc-notes).",
              },
            ],
          },
          {
            _key: "b3-6",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s3-6",
                _type: "span",
                text: "• **Awarding Body**: Presented annually by the **Ramon Magsaysay Award Foundation (RMAF)** in Manila, Philippines.",
              },
            ],
          },
          {
            _key: "b3-7",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s3-7",
                _type: "span",
                text: "• **Asia's Nobel Prize**: Regarded as Asia's equivalent to the Nobel Prize, honoring individuals and organizations showing moral courage and transformative leadership.",
              },
            ],
          },
        ],
      },

      /* ── 4. India Related Facts ─────────────────────────────── */
      {
        _key: "sec-india-facts",
        kind: "importance",
        title: "भारत से जुड़े सबसे महत्वपूर्ण तथ्य (MPPSC & UPSC स्पेशल)",
        titleEn: "India-Related Facts & Laureates (MPPSC & UPSC Special)",
        body: [
          {
            _key: "b4-1",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s4-1",
                _type: "span",
                text: "• **प्रथम भारतीय विजेता — विनोबा भावे (1958)**: आचार्य विनोबा भावे रमन मैग्सेसे पुरस्कार पाने वाले **प्रथम भारतीय** (और पहले एशियाई विजेता) थे। उन्हें 1958 में 'सामुदायिक नेतृत्व' और **भूदान आंदोलन** हेतु सम्मानित किया गया था। भारतीय स्वतंत्रता संग्राम व सुधार आंदोलनों के लिए [MPPSC प्रारंभिक परीक्षा पाठ्यक्रम](/mppsc/prelims-syllabus) पढ़ें।",
              },
            ],
          },
          {
            _key: "b4-2",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s4-2",
                _type: "span",
                text: "• **हालिया व्यक्तिगत भारतीय विजेता — डॉ. आर. रवि कन्नन (2023)**: सर्जिकल ऑन्कोलॉजिस्ट डॉ. आर. रवि कन्नन को असम में कछार कैंसर अस्पताल के माध्यम से जन-केंद्रित और किफायती कैंसर देखभाल के लिए 2023 में यह पुरस्कार मिला।",
              },
            ],
          },
          {
            _key: "b4-3",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s4-3",
                _type: "span",
                text: "• **प्रथम भारतीय संस्था — 'Educate Girls' (2025)**: वर्ष 2025 में 'Foundation to Educate Girls Globally' (Educate Girls) रमन मैग्सेसे पुरस्कार प्राप्त करने वाली **पहली भारतीय संस्था/एनजीओ** बनी। इसे बालिका शिक्षा और लैंगिक समानता हेतु सम्मानित किया गया।",
              },
            ],
          },
          {
            _key: "b4-4",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s4-4",
                _type: "span",
                text: "• **प्रधानमंत्री नरेंद्र मोदी का इंडोनेशियाई नागरिक सम्मान**: अंतर्राष्ट्रीय सर्वोच्च नागरिक सम्मानों के संबंध में हालिया [पीएम मोदी को मिला इंडोनेशिया का 'बिंतांग आदिपूर्णा' सम्मान](/current-affairs/bintang-adipurna-modi-indonesia-award) लेख भी पढ़ें।",
              },
            ],
          },
          {
            _key: "b4-5",
            _type: "block",
            style: "h3",
            children: [{ _key: "s4-5", _type: "span", text: "प्रमुख ऐतिहासिक भारतीय मैग्सेसे विजेता:" }],
          },
          {
            _key: "b4-6",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s4-6",
                _type: "span",
                text: "• **मदर टेरेसा (1962)** — अंतर्राष्ट्रीय समझ और जनसेवा। अन्य सामाजिक कल्याण योजनाओं हेतु [VB-G RAM G Act 2026 ग्रामीण रोजगार कानून](/current-affairs/vbg-ramg-act-2026) देखें।",
              },
            ],
          },
          {
            _key: "b4-7",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s4-7",
                _type: "span",
                text: "• **सत्यजीत रे (1967)** — पत्रकारिता, साहित्य एवं रचनात्मक संचार कला।",
              },
            ],
          },
          {
            _key: "b4-8",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s4-8",
                _type: "span",
                text: "• **एम. एस. स्वामीनाथन (1971)** — हरित क्रांति और सामुदायिक नेतृत्व।",
              },
            ],
          },
          {
            _key: "b4-9",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s4-9",
                _type: "span",
                text: "• **किरण बेदी (1994)** — सरकारी सेवा (तिहाड़ जेल सुधार)।",
              },
            ],
          },
          {
            _key: "b4-10",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s4-10",
                _type: "span",
                text: "• **अरविन्द केजरीवाल (2006)** — उदयीमान नेतृत्व (RTI आंदोलन)।",
              },
            ],
          },
          {
            _key: "b4-11",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s4-11",
                _type: "span",
                text: "• **रविश कुमार (2019)** — पत्रकारिता (सच्ची पत्रकारिता और बेआवाजों की आवाज)। MPPSC की संपूर्ण ऑनलाइन तैयारी हेतु हमारे [Aakar IAS ऑनलाइन कोर्सेस](/online-courses) से जुड़ें।",
              },
            ],
          },
        ],
        bodyEn: [
          {
            _key: "b4-12",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s4-12",
                _type: "span",
                text: "• **First Indian Laureate — Vinoba Bhave (1958)**: Acharya Vinoba Bhave was the **first Indian recipient** in 1958 for his historic Bhoodan Movement. Check our [MPPSC Prelims Syllabus](/en/mppsc/prelims-syllabus).",
              },
            ],
          },
          {
            _key: "b4-13",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s4-13",
                _type: "span",
                text: "• **Recent Individual Indian Winner — Dr. R. Ravi Kannan (2023)**: Surgical oncologist Dr. R. Ravi Kannan was awarded in 2023 for transforming cancer care in Assam.",
              },
            ],
          },
          {
            _key: "b4-14",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s4-14",
                _type: "span",
                text: "• **First Indian Organization — 'Educate Girls' (2025)**: In 2025, 'Educate Girls' became the first Indian NGO to win the Ramon Magsaysay Award.",
              },
            ],
          },
          {
            _key: "b4-15",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s4-15",
                _type: "span",
                text: "• **PM Modi Foreign Honors**: Also read about [PM Modi Honored with Indonesia's Highest Civilian Award Bintang Adipurna](/en/current-affairs/bintang-adipurna-modi-indonesia-award).",
              },
            ],
          },
          {
            _key: "b4-16",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s4-16",
                _type: "span",
                text: "• **Other Major Indian Laureates**: Mother Teresa (1962), Satyajit Ray (1967), M.S. Swaminathan (1971), Kiran Bedi (1994), Arvind Kejriwal (2006), and Ravish Kumar (2019). Explore our [Aakar IAS Online Courses](/en/online-courses).",
              },
            ],
          },
        ],
      },

      /* ── 5. Facts at a glance ─────────────────────────────── */
      {
        _key: "sec-facts-summary",
        kind: "factsAtAGlance",
        title: "रमन मैग्सेसे पुरस्कार 2026: एक नज़र में (Facts at a Glance)",
        titleEn: "Ramon Magsaysay Award 2026: Quick Summary Table",
        body: [
          {
            _key: "bf-1",
            _type: "block",
            style: "normal",
            children: [{ _key: "sf-1", _type: "span", text: "• **पुरस्कार का नाम**: 68वां रमन मैग्सेसे पुरस्कार 2026" }],
          },
          {
            _key: "bf-2",
            _type: "block",
            style: "normal",
            children: [{ _key: "sf-2", _type: "span", text: "• **उपनाम**: एशिया का नोबेल पुरस्कार (Asia's Nobel Prize)" }],
          },
          {
            _key: "bf-3",
            _type: "block",
            style: "normal",
            children: [{ _key: "sf-3", _type: "span", text: "• **स्थापना वर्ष**: 1958 (फिलीपींस के राष्ट्रपति रमन मैग्सेसे की स्मृति में)" }],
          },
          {
            _key: "bf-4",
            _type: "block",
            style: "normal",
            children: [{ _key: "sf-4", _type: "span", text: "• **आयोजक संस्था**: रमन मैग्सेसे पुरस्कार फाउंडेशन (RMAF), मनीला" }],
          },
          {
            _key: "bf-5",
            _type: "block",
            style: "normal",
            children: [{ _key: "sf-5", _type: "span", text: "• **2026 के विजेता (3)**: टॉमी कोह (सिंगापुर), रुना खान (बांग्लादेश), बो की (म्याँमार)" }],
          },
          {
            _key: "bf-6",
            _type: "block",
            style: "normal",
            children: [{ _key: "sf-6", _type: "span", text: "• **2026 में भारतीय विजेता**: शून्य (कोई भारतीय शामिल नहीं)" }],
          },
          {
            _key: "bf-7",
            _type: "block",
            style: "normal",
            children: [{ _key: "sf-7", _type: "span", text: "• **प्रथम भारतीय विजेता**: विनोबा भावे (1958, भूदान आंदोलन)" }],
          },
          {
            _key: "bf-8",
            _type: "block",
            style: "normal",
            children: [{ _key: "sf-8", _type: "span", text: "• **प्रथम भारतीय एनजीओ/संस्था**: Educate Girls (2025)" }],
          },
        ],
        bodyEn: [
          {
            _key: "bf-9",
            _type: "block",
            style: "normal",
            children: [{ _key: "sf-9", _type: "span", text: "• **Award Title**: 68th Ramon Magsaysay Award 2026" }],
          },
          {
            _key: "bf-10",
            _type: "block",
            style: "normal",
            children: [{ _key: "sf-10", _type: "span", text: "• **Popular Designation**: Asia's Nobel Prize" }],
          },
          {
            _key: "bf-11",
            _type: "block",
            style: "normal",
            children: [{ _key: "sf-11", _type: "span", text: "• **Established Year**: 1958 (In honor of Philippine President Ramon Magsaysay)" }],
          },
          {
            _key: "bf-12",
            _type: "block",
            style: "normal",
            children: [{ _key: "sf-12", _type: "span", text: "• **Awarding Foundation**: Ramon Magsaysay Award Foundation (RMAF), Manila" }],
          },
          {
            _key: "bf-13",
            _type: "block",
            style: "normal",
            children: [{ _key: "sf-13", _type: "span", text: "• **2026 Laureates (3)**: Tommy Koh (Singapore), Runa Khan (Bangladesh), Bo Kyi (Myanmar)" }],
          },
          {
            _key: "bf-14",
            _type: "block",
            style: "normal",
            children: [{ _key: "sf-14", _type: "span", text: "• **2026 Indian Recipient**: None" }],
          },
          {
            _key: "bf-15",
            _type: "block",
            style: "normal",
            children: [{ _key: "sf-15", _type: "span", text: "• **First Indian Laureate**: Vinoba Bhave (1958, Bhoodan Movement)" }],
          },
          {
            _key: "bf-16",
            _type: "block",
            style: "normal",
            children: [{ _key: "sf-16", _type: "span", text: "• **First Indian Institution**: Educate Girls (2025)" }],
          },
        ],
      },
    ],

    /* ─── MCQs (EXACTLY 8 HIGH-QUALITY MCQS) ────────────────────────── */
    mcqs: [
      {
        question: "1. वर्ष 2026 में रमन मैग्सेसे पुरस्कार के लिए चुने गए विजेताओं में से किसका संबंध अंतर्राष्ट्रीय कूटनीति एवं संयुक्त राष्ट्र समुद्री कानून (UNCLOS) से है?",
        questionEn: "1. Among the Ramon Magsaysay Award 2026 laureates, who has been recognized for contributions to international diplomacy and UNCLOS?",
        options: ["रुना खान", "टॉमी कोह", "बो की", "डॉ. आर. रवि कन्नन"],
        optionsEn: ["Runa Khan", "Tommy Koh", "Bo Kyi", "Dr. R. Ravi Kannan"],
        correctIndex: 1,
        explanation: "सिंगापुर के प्रो. टॉमी कोह (Tommy Koh) को अंतर्राष्ट्रीय कूटनीति, UNCLOS और पर्यावरण न्याय में छः दशकों के योगदान हेतु 2026 के रमन मैग्सेसे पुरस्कार के लिए चुना गया है।",
        explanationEn: "Prof. Tommy Koh of Singapore has been selected for the Ramon Magsaysay Award 2026 for six decades of work in international diplomacy, UNCLOS, and environmental law."
      },
      {
        question: "2. 68वें रमन मैग्सेसे पुरस्कार 2026 की विजेता रुना खान किस देश से संबंधित हैं और उनका मुख्य योगदान क्या है?",
        questionEn: "2. 68th Ramon Magsaysay Award 2026 laureate Runa Khan belongs to which country and what is her key contribution?",
        options: [
          "म्याँमार — राजनीतिक बंदियों की रिहाई",
          "बांग्लादेश — फ्लोटिंग अस्पतालों के माध्यम से ग्रामीण स्वास्थ्य एवं विकास",
          "सिंगापुर — हरित ऊर्जा नीति",
          "नेपाल — बालिका शिक्षा"
        ],
        optionsEn: [
          "Myanmar — Release of political prisoners",
          "Bangladesh — Rural health & development via floating hospital ships",
          "Singapore — Green energy policy",
          "Nepal — Girl child education"
        ],
        correctIndex: 1,
        explanation: "रुना खान बांग्लादेश की सामाजिक कार्यकर्ता हैं, जिन्होंने 'फ्रेंडशिप' एनजीओ के तहत तैरते अस्पताल जहाजों (Floating Hospitals) से दूरस्थ तटीय/नदी क्षेत्रों में स्वास्थ्य सेवाएं प्रदान की हैं।",
        explanationEn: "Runa Khan is a Bangladeshi social entrepreneur who pioneered floating hospital ships via NGO 'Friendship' to deliver healthcare in remote river communities."
      },
      {
        question: "3. 'एशिया का नोबेल पुरस्कार' कहे जाने वाले रमन मैग्सेसे पुरस्कार की स्थापना किस वर्ष की गई थी?",
        questionEn: "3. In which year was the Ramon Magsaysay Award, often referred to as 'Asia's Nobel Prize', established?",
        options: ["1950", "1958", "1962", "1975"],
        optionsEn: ["1950", "1958", "1962", "1975"],
        correctIndex: 1,
        explanation: "फिलीपींस के 7वें राष्ट्रपति रमन मैग्सेसे की स्मृति में रमन मैग्सेसे पुरस्कार की स्थापना वर्ष 1957 में की गई थी तथा प्रथम पुरस्कार समारोह 1958 में आयोजित हुआ था।",
        explanationEn: "Established in 1957 in memory of 7th Philippine President Ramon Magsaysay, the first award ceremony took place in 1958."
      },
      {
        question: "4. रमन मैग्सेसे पुरस्कार प्राप्त करने वाले प्रथम भारतीय कौन थे?",
        questionEn: "4. Who was the first Indian recipient of the Ramon Magsaysay Award?",
        options: ["मदर टेरेसा", "आचार्य विनोबा भावे", "सत्यजीत रे", "डॉ. वर्गिज कुरियन"],
        optionsEn: ["Mother Teresa", "Acharya Vinoba Bhave", "Satyajit Ray", "Dr. Verghese Kurien"],
        correctIndex: 1,
        explanation: "आचार्य विनोबा भावे 1958 में 'सामुदायिक नेतृत्व' तथा भूदान आंदोलन के लिए रमन मैग्सेसे पुरस्कार प्राप्त करने वाले प्रथम भारतीय बने थे।",
        explanationEn: "Acharya Vinoba Bhave became the first Indian laureate in 1958 for Community Leadership and his Bhoodan Movement."
      },
      {
        question: "5. रमन मैग्सेसे पुरस्कार प्राप्त करने वाली पहली भारतीय संस्था/एनजीओ कौन सी है, जिसे वर्ष 2025 में सम्मानित किया गया?",
        questionEn: "5. Which is the first Indian organization/NGO to receive the Ramon Magsaysay Award, honored in 2025?",
        options: ["अक्षय पात्र फाउंडेशन", "Educate Girls (Foundation to Educate Girls Globally)", "गूँज (Goonj)", "प्रथम (Pratham NGO)"],
        optionsEn: ["Akshaya Patra Foundation", "Educate Girls (Foundation to Educate Girls Globally)", "Goonj", "Pratham NGO"],
        correctIndex: 1,
        explanation: "वर्ष 2025 में 'Educate Girls' (Foundation to Educate Girls Globally) रमन मैग्सेसे पुरस्कार से सम्मानित होने वाली प्रथम भारतीय संस्था बनी।",
        explanationEn: "In 2025, 'Educate Girls' became the very first Indian organization to be awarded the Ramon Magsaysay Award."
      },
      {
        question: "6. वर्ष 2026 में रमन मैग्सेसे पुरस्कार के विजेताओं में भारत से कितने व्यक्तियों या संस्थाओं को शामिल किया गया है?",
        questionEn: "6. How many Indian individuals or institutions were included in the Ramon Magsaysay Award 2026 winners list?",
        options: ["एक (1)", "दो (2)", "तीन (3)", "शून्य (0)"],
        optionsEn: ["One (1)", "Two (2)", "Three (3)", "Zero (0)"],
        correctIndex: 3,
        explanation: "वर्ष 2026 में रमन मैग्सेसे पुरस्कार के तीन विजेता सिंगापुर, बांग्लादेश और म्याँमार से हैं; 2026 में कोई भारतीय विजेता नहीं है।",
        explanationEn: "In 2026, all three laureates hail from Singapore, Bangladesh, and Myanmar. There is no Indian winner in 2026."
      },
      {
        question: "7. रमन मैग्सेसे पुरस्कार के संदर्भ में निम्नलिखित कथनों पर विचार कीजिए:\n1. 2009 से इस पुरस्कार को निश्चित 6 श्रेणियों में बांटना समाप्त कर दिया गया है।\n2. यह पुरस्कार रमन मैग्सेसे पुरस्कार फाउंडेशन, मनीला द्वारा प्रदान किया जाता है।\nउपरोक्त में से कौन-सा/से कथन सत्य है/हैं?",
        questionEn: "7. Consider the following statements regarding the Ramon Magsaysay Award:\n1. Since 2009, fixed 6-category distinctions have been discontinued.\n2. The award is presented by the Ramon Magsaysay Award Foundation, Manila.\nWhich of the above statements is/are correct?",
        options: ["केवल 1", "केवल 2", "1 और 2 दोनों", "न तो 1 और न ही 2"],
        optionsEn: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
        correctIndex: 2,
        explanation: "कथन 1 और 2 दोनों सत्य हैं। 2009 से निश्चित श्रेणियां हटा दी गईं और यह पुरस्कार RMAF मनीला द्वारा दिया जाता है।",
        explanationEn: "Both statements 1 and 2 are correct. Fixed category boundaries were abolished in 2009, and the honor is conferred by RMAF in Manila."
      },
      {
        question: "8. 68वें रमन मैग्सेसे पुरस्कार 2026 के विजेता बो की (Bo Kyi) किस संगठन के सह-संस्थापक हैं?",
        questionEn: "8. 68th Ramon Magsaysay Award 2026 laureate Bo Kyi is the co-founder of which organization?",
        options: [
          "फ्रेंडशिप एनजीओ (Friendship NGO)",
          "असिस्टेंस एसोसिएशन फॉर पॉलिटिकल प्रिजनर्स (AAPP)",
          "ह्यूमन राइट्स वॉच एशिया",
          "एशियाई मानवाधिकार आयोग"
        ],
        optionsEn: [
          "Friendship NGO",
          "Assistance Association for Political Prisoners (AAPP)",
          "Human Rights Watch Asia",
          "Asian Human Rights Commission"
        ],
        correctIndex: 1,
        explanation: "म्याँमार के बो की (Bo Kyi) 'Assistance Association for Political Prisoners' (AAPP) के सह-संस्थापक हैं, जो राजनीतिक बंदियों के अधिकारों हेतु कार्यरत हैं।",
        explanationEn: "Bo Kyi of Myanmar is the co-founder of AAPP, dedicated to defending political prisoners and democratic rights."
      }
    ],

    /* ─── FAQS (10 COLLAPSIBLE FAQS) ────────────────────────────── */
    faqs: [
      {
        question: "रमन मैग्सेसे पुरस्कार 2026 के विजेता कौन-कौन हैं?",
        questionEn: "Who are the winners of the Ramon Magsaysay Award 2026?",
        answer: "रमन मैग्सेसे पुरस्कार 2026 के तीन विजेता हैं: टॉमी कोह (सिंगापुर - अंतर्राष्ट्रीय कूटनीति), रुना खान (बांग्लादेश - फ्लोटिंग अस्पतालों के माध्यम से ग्रामीण विकास), तथा बो की (म्याँमार - राजनीतिक बंदियों के मानवाधिकार)।",
        answerEn: "The three laureates of the Ramon Magsaysay Award 2026 are Tommy Koh (Singapore - International Diplomacy), Runa Khan (Bangladesh - Floating healthcare & community development), and Bo Kyi (Myanmar - Political prisoner human rights advocacy)."
      },
      {
        question: "क्या 2026 में कोई भारतीय रमन मैग्सेसे पुरस्कार विजेता है?",
        questionEn: "Is there any Indian winner in the Ramon Magsaysay Award 2026?",
        answer: "नहीं, वर्ष 2026 में कोई भारतीय विजेता नहीं है। तीनों विजेता क्रमशः सिंगापुर, बांग्लादेश और म्याँमार से हैं।",
        answerEn: "No, there is no Indian recipient in 2026. All three laureates are from Singapore, Bangladesh, and Myanmar."
      },
      {
        question: "रमन मैग्सेसे पुरस्कार को क्या कहा जाता है?",
        questionEn: "What is the Ramon Magsaysay Award commonly referred to as?",
        answer: "रमन मैग्सेसे पुरस्कार को प्रायः 'एशिया का नोबेल पुरस्कार' (Asia's Nobel Prize) कहा जाता है। यह एशिया महाद्वीप का सबसे प्रतिष्ठित नागरिक सम्मान है।",
        answerEn: "The Ramon Magsaysay Award is widely called 'Asia's Nobel Prize'. It is the continent's most prestigious honor for selfless leadership."
      },
      {
        question: "रमन मैग्सेसे पुरस्कार की स्थापना कब और किसकी स्मृति में की गई थी?",
        questionEn: "When and in whose memory was the Ramon Magsaysay Award established?",
        answer: "इसकी स्थापना 1957 में फिलीपींस के 7वें राष्ट्रपति रमन मैग्सेसे की स्मृति में की गई थी। प्रथम पुरस्कार समारोह 1958 में आयोजित हुआ था।",
        answerEn: "It was established in 1957 in honor of Ramon Magsaysay, the 7th President of the Philippines. The first presentation was held in 1958."
      },
      {
        question: "प्रथम भारतीय रमन मैग्सेसे पुरस्कार विजेता कौन थे?",
        questionEn: "Who was the first Indian Ramon Magsaysay Award laureate?",
        answer: "प्रथम भारतीय विजेता आचार्य विनोबा भावे (1958) थे, जिन्हें भूदान आंदोलन और सामुदायिक नेतृत्व के लिए सम्मानित किया गया था।",
        answerEn: "The first Indian laureate was Acharya Vinoba Bhave in 1958, recognized for his Bhoodan Movement and community leadership."
      },
      {
        question: "रमन मैग्सेसे पुरस्कार पाने वाली पहली भारतीय संस्था कौन सी है?",
        questionEn: "Which is the first Indian organization to receive the Ramon Magsaysay Award?",
        answer: "वर्ष 2025 में 'Educate Girls' (Foundation to Educate Girls Globally) रमन मैग्सेसे पुरस्कार पाने वाली पहली भारतीय संस्था बनी।",
        answerEn: "In 2025, 'Educate Girls' (Foundation to Educate Girls Globally) became the first Indian organization to win this award."
      },
      {
        question: "हाल ही में चिकित्सा के क्षेत्र में किस भारतीय को रमन मैग्सेसे पुरस्कार मिला था?",
        questionEn: "Which Indian recently received the Ramon Magsaysay Award in healthcare?",
        answer: "वर्ष 2023 में सर्जिकल ऑन्कोलॉजिस्ट डॉ. आर. रवि कन्नन को असम में सस्ती व सुलभ कैंसर चिकित्सा प्रदान करने के लिए सम्मानित किया गया था।",
        answerEn: "In 2023, surgical oncologist Dr. R. Ravi Kannan was awarded for providing equitable cancer care in Assam."
      },
      {
        question: "यह पुरस्कार किस संस्था द्वारा और कहाँ प्रदान किया जाता है?",
        questionEn: "Which foundation presents this award and where?",
        answer: "यह पुरस्कार 'रमन मैग्सेसे पुरस्कार फाउंडेशन' (RMAF) द्वारा फिलीपींस की राजधानी मनीला में प्रदान किया जाता है। 2026 का समारोह 15 नवंबर को मनीला में होगा।",
        answerEn: "It is presented by the Ramon Magsaysay Award Foundation (RMAF) in Manila, Philippines. The 2026 ceremony takes place on Nov 15 in Manila."
      },
      {
        question: "2009 के बाद रमन मैग्सेसे पुरस्कार की श्रेणियों में क्या बदलाव आया?",
        questionEn: "What changes occurred in award categories after 2009?",
        answer: "2009 से पहले यह पुरस्कार 6 निश्चित श्रेणियों में दिया जाता था। 2009 से निश्चित श्रेणियों की व्यवस्था समाप्त कर दी गई (केवल Emergent Leadership श्रेणी बनी रही) और पुरस्कार किसी भी क्षेत्र में उल्लेखनीय नेतृत्व हेतु दिया जाता है।",
        answerEn: "Before 2009, it was given in 6 defined categories. Post-2009, fixed category restrictions were removed (retaining Emergent Leadership) to award holistic leadership."
      },
      {
        question: "MPPSC और UPSC परीक्षाओं में रमन मैग्सेसे पुरस्कार से संबंधित प्रश्न कैसे पूछे जाते हैं?",
        questionEn: "How are questions on the Ramon Magsaysay Award framed in MPPSC and UPSC exams?",
        answer: "परीक्षाओं में नवीनतम विजेताओं के नाम, उनके देश, उनके द्वारा संचालित एनजीओ/क्षेत्र, प्रथम भारतीय विजेता (विनोबा भावे), प्रथम भारतीय संस्था (Educate Girls) तथा पुरस्कार के इतिहास पर बहुविकल्पीय एवं मुख्य परीक्षा प्रश्न पूछे जाते हैं।",
        answerEn: "Exams test candidates on latest laureates, their domain/NGO, first Indian winner (Vinoba Bhave), first Indian NGO (Educate Girls), and structural history."
      }
    ],

    /* ─── SOURCES ────────────────────────────────────────────── */
    sources: [
      { label: "Ramon Magsaysay Award Foundation Official Portal", url: "https://rmaward.asia" },
      { label: "Press Information Bureau (PIB India)", url: "https://pib.gov.in" },
      { label: "Aakar IAS Current Affairs & Notes Portal", url: "https://aakarias.com/current-affairs" }
    ]
  };

  try {
    await client.createOrReplace(article);
    console.log("✨ Successfully uploaded Ramon Magsaysay Award 2026 Article with Rich Interlinking to Sanity!");
  } catch (err) {
    console.error("❌ Failed to create/replace document in Sanity:", err);
  }
}

main().catch((err) => {
  console.error("❌ Error running script:", err);
  process.exit(1);
});
