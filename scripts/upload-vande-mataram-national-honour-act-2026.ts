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

// Helper to convert array of strings into separate Portable Text blocks with markdown link parsing
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

    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const children: any[] = [];
    const markDefs: any[] = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        children.push({
          _key: `span-t-${idx}-${children.length}-${randomSuffix}`,
          _type: "span",
          text: text.substring(lastIndex, match.index),
        });
      }
      const linkKey = `link-${idx}-${markDefs.length}-${randomSuffix}`;
      markDefs.push({
        _key: linkKey,
        _type: "link",
        href: match[2],
      });
      children.push({
        _key: `span-l-${idx}-${children.length}-${randomSuffix}`,
        _type: "span",
        text: match[1],
        marks: [linkKey],
      });
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      children.push({
        _key: `span-e-${idx}-${children.length}-${randomSuffix}`,
        _type: "span",
        text: text.substring(lastIndex),
      });
    }

    return {
      _key: `block-${idx}-${randomSuffix}`,
      _type: "block",
      style: "normal",
      markDefs: markDefs.length > 0 ? markDefs : undefined,
      children: children.length > 0 ? children : [
        {
          _key: `span-${idx}-${randomSuffix}`,
          _type: "span",
          text: text,
        },
      ],
    };
  });
}

// Helper to create table block
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
  console.log("🚀 Starting upload process for Vande Mataram National Honour Act 2026 Article (Updated with 11 August 2026 Assent Data)...");

  // Image file paths in public/images/blog/
  const imagePaths = {
    bankim: path.resolve(process.cwd(), "public/images/blog/vande-mataram-bankim-chandra-1875.png"),
    congress: path.resolve(process.cwd(), "public/images/blog/vande-mataram-congress-session-1896.png"),
    act2026: path.resolve(process.cwd(), "public/images/blog/vande-mataram-national-honour-act-2026.png"),
  };

  // Upload images to Sanity
  console.log("📸 Uploading images to Sanity...");
  const assetBankim = await client.assets.upload("image", fs.createReadStream(imagePaths.bankim), {
    filename: "vande_mataram_bankim_chandra_1875.png",
  });
  const assetCongress = await client.assets.upload("image", fs.createReadStream(imagePaths.congress), {
    filename: "vande_mataram_congress_session_1896.png",
  });
  const assetAct2026 = await client.assets.upload("image", fs.createReadStream(imagePaths.act2026), {
    filename: "vande_mataram_national_honour_act_2026.png",
  });

  console.log(`✔ Uploaded image assets:
    - Bankim: ${assetBankim._id}
    - Congress 1896: ${assetCongress._id}
    - Act 2026: ${assetAct2026._id}`);

  const targetSlug = "vande-mataram-national-honour-act-2026-mppsc-upsc-notes";
  const docId = "ca-vande-mataram-national-honour-act-2026";

  const article = {
    _id: docId,
    _type: "currentAffairs",
    slug: { _type: "slug", current: targetSlug },
    title: "राष्ट्रीय सम्मान कानून के अंतर्गत 'वंदे मातरम्' संशोधन अधिनियम 2026: राष्ट्रपति की 11 अगस्त 2026 की मंजूरी, सजा के प्रावधान व 1971 कानून | MPPSC & UPSC Notes",
    titleEn: "Vande Mataram under Prevention of Insults to National Honour Act 1971 Amendment 2026: Presidential Assent on 11 August 2026, Penal Provisions & History | MPPSC & UPSC Notes PDF",
    excerpt: "11 अगस्त 2026 को भारत की राष्ट्रपति द्रौपदी मुर्मू ने 'राष्ट्रीय सम्मान के अपमान की रोकथाम (संशोधन) अधिनियम, 2026' को औपचारिक मंजूरी प्रदान कर दी है। इसके तहत राष्ट्रगीत 'वंदे मातरम्' के गायन में जानबूझकर बाधा डालने या अपमान करने पर अधिकतम 3 साल की कैद, जुर्माना या दोनों की सजा का प्रावधान किया गया है, जबकि दोबारा अपराध करने पर न्यूनतम 1 साल की अनिवार्य जेल होगी। इसे राष्ट्रगान 'जन गण मन' के समान वैधानिक संरक्षण मिला है। बंकिमचंद्र चट्टोपाध्याय द्वारा 1875 में रचना, आनंदमठ, 1896 कांग्रेस अधिवेशन (रहमतुल्ला एम. सयानी), श्री अरविंद घोष द्वारा अंग्रेजी अनुवाद एवं MPPSC/UPSC परीक्षा नोट्स।",
    excerptEn: "On 11 August 2026, President of India Droupadi Murmu granted official assent to the Prevention of Insults to National Honour (Amendment) Act, 2026. Under this law, intentional obstruction or disrespect to 'Vande Mataram' is a statutory offense punishable with up to 3 years imprisonment, fine, or both, with a mandatory minimum 1-year jail term for repeat offenders, According it equal legal protection alongside 'Jana Gana Mana'. Comprehensive exam notes for MPPSC & UPSC.",
    ca_date: "2026-08-13",
    publishedAt: new Date().toISOString(),
    featured: true,
    readingTime: 10,
    keywords: [
      "vande mataram sanshodhan 2026",
      "vande mataram president droupadi murmu assent 11 august 2026",
      "rashtriya samman ke apman ki roktham sanshodhan adhiniyam 2026",
      "vande mataram 3 years imprisonment fine",
      "vande mataram repeat offense 1 year mandatory jail",
      "rashtriya gaurav apman nivaran adhiniyam 1971 section 3",
      "vande mataram jana gana mana equal protection",
      "vande mataram bankim chandra chattopadhyay 1875",
      "vande mataram 1896 congress session rahimtullah sayani",
      "vande mataram english translation sri aurobindo",
      "vande mataram anandamath novel",
      "vande mataram duration 1 minute 9 seconds",
      "vande mataram mppsc notes",
      "vande mataram upsc notes",
      "वंदे मातरम संशोधन 2026",
      "राष्ट्रपति द्रौपदी मुर्मू 11 अगस्त 2026 मंजूरी वंदे मातरम",
      "राष्ट्रीय सम्मान के अपमान की रोकथाम संशोधन अधिनियम 2026",
      "राष्ट्रीय गौरव अपमान निवारण अधिनियम 1971 धारा 3",
      "1896 कलकत्ता कांग्रेस अधिवेशन रहमतुल्ला सयानी",
      "आनंदमठ बंकिमचंद्र चट्टोपाध्याय 1875",
      "MPPSC Current Affairs 2026",
      "UPSC GS 2 Polity Current Affairs"
    ],
    category: { _type: "reference", _ref: "cat-polity" },
    author: { _type: "reference", _ref: "author-aakar" },
    // MPPSC Priority Rule: tag-mppsc before tag-upsc
    tags: [
      { _type: "reference", _ref: "tag-mppsc" },
      { _type: "reference", _ref: "tag-upsc" },
      { _type: "reference", _ref: "tag-prelims" },
      { _type: "reference", _ref: "tag-mains" },
    ],
    syllabus: ["MPPSC-Paper-2", "GS-2", "Prelims-GS"],

    featuredImage: {
      _type: "image",
      asset: { _type: "reference", _ref: assetAct2026._id },
      alt: "राष्ट्रीय सम्मान कानून 2026 के अंतर्गत वंदे मातरम् संशोधन अधिनियम 1971 MPPSC UPSC नोट्स",
    },

    /* ─── SECTIONS ──────────────────────────────────────────────── */
    sections: [
      /* ── 1. Quick Overview Box ───────────────────────────────── */
      {
        _key: "sec-overview",
        kind: "whyInNews",
        title: "राष्ट्रीय सम्मान कानून के अंतर्गत 'वंदे मातरम्' (11 अगस्त 2026 संशोधन): मुख्य बिंदु",
        titleEn: "Vande Mataram under National Honour Act 2026 (11 August Assent): Quick Overview",
        body: [
          ...createBlocks([
            "**11 अगस्त 2026** को भारत की **राष्ट्रपति द्रौपदी मुर्मू (President Droupadi Murmu)** ने **राष्ट्रीय सम्मान के अपमान की रोकथाम (संशोधन) अधिनियम, 2026 (Prevention of Insults to National Honour Amendment Act, 2026)** को अपनी औपचारिक मंजूरी प्रदान कर दी है।",
            "• **'जन गण मन' जैसा समान कानूनी दर्जा**: इस नए अधिनियम के माध्यम से भारत के राष्ट्रीय गीत 'वंदे मातरम्' को राष्ट्रगान 'जन गण मन' के समान वैधानिक और कानूनी संरक्षण (Equal Statutory & Legal Protection) प्राप्त हो गया है।",
            "• **अपराध का दायरा**: 'वंदे मातरम्' के गायन/वादन को जानबूझकर रोकना, बाधा डालना या इसके सम्मान में आयोजित सभा में व्यवधान पैदा करना अब संज्ञेय और दंडनीय अपराध है।",
            "• **सजा के कड़े प्रावधान (धारा 3)**:",
            "  - **प्रथम अपराध (First Offense)**: दोषी पाए जाने पर अधिकतम **3 साल तक की कैद (कारावास)**, जुर्माना या दोनों।",
            "  - **दोबारा अपराध (Repeat Offense)**: दोबारा ऐसा अपराध करने पर कम से कम **1 साल की अनिवार्य कैद (1 Year Mandatory Imprisonment)** का प्रावधान किया गया है।",
            "• **15 अगस्त 2026 (स्वतंत्रता दिवस)**: रचना के 150 वर्ष पूर्ण होने के अवसर पर 15 अगस्त 2026 स्वतंत्रता दिवस समारोह में 'वंदे मातरम्' की विशेष धुन गूँजेगी।",
            "• **गृह मंत्रालय के 2026 दिशानिर्देश**: 6 फरवरी 2026 को जारी निर्देशानुसार, जब राष्ट्रगान और राष्ट्रीय गीत दोनों एक साथ गाए/बजाए जाएं, तो **राष्ट्रगान (National Anthem) पहले गाया जाएगा**।",
            "• **परीक्षा उपयोगिता**: यह विषय [MPPSC मुख्य परीक्षा पाठ्यक्रम](/mppsc/mains-syllabus) (द्वितीय प्रश्नपत्र: राजव्यवस्था व संविधान) तथा [73वें व 74वें संविधान संशोधन](/general-awareness/73-74-amendment-act-panchayati-raj-mppsc-notes) की तरह अत्यंत महत्वपूर्ण है।"
          ]),
          createTable(
            "table-vande-mataram-summary",
            "राष्ट्रीय सम्मान कानून 2026 एवं वंदे मातरम्: प्रमुख तथ्य तालिका",
            ["विशेषता / पहलू (Feature)", "तथ्य एवं कानूनी प्रावधान (Fact / Provision)"],
            [
              ["**राष्ट्रपति की स्वीकृति तिथि**", "**11 अगस्त 2026** (राष्ट्रपति द्रौपदी मुर्मू द्वारा अधिनियम को मंजूरी)"],
              ["**संशोधित अधिनियम का नाम**", "राष्ट्रीय सम्मान के अपमान की रोकथाम (संशोधन) अधिनियम, 2026 / Prevention of Insults to National Honour Act, 1971"],
              ["**कानूनी संरक्षण का स्वरूप**", "राष्ट्रगान 'जन गण मन' के समान वैधानिक सुरक्षा एवं अपराध की श्रेणी (धारा 3)"],
              ["**प्रथम अपराध की सजा**", "अधिकतम **3 साल तक की कैद (कारावास)**, जुर्माना या दोनों"],
              ["**पुनरावृत्ति (Repeat Offense) पर सजा**", "कम से कम **1 साल की अनिवार्य कैद (Mandatory Imprisonment)**"],
              ["**गीत के रचयिता व वर्ष**", "बंकिमचंद्र चट्टोपाध्याय (वर्ष 1875 ई., भाषा: संस्कृत)"],
              ["**प्रसिद्ध उपन्यास**", "आनंदमठ (Anandamath - 1882 ई., संन्यासी विद्रोह की पृष्ठभूमि)"],
              ["**प्रथम सार्वजनिक गायन**", "1896 ई. कलकत्ता कांग्रेस का 12वां अधिवेशन (अध्यक्ष: रहमतुल्ला एम. सयानी)"],
              ["**अंग्रेजी अनुवादक**", "श्री अरविंद घोष (Sri Aurobindo Ghose - 1909)"],
              ["**संविधान सभा घोषणा**", "24 जनवरी 1950 (डॉ. राजेंद्र प्रसाद द्वारा राष्ट्रगान के समान दर्जा)"],
              ["**गायन की अवधि**", "लगभग 1 मिनट 9 सेकंड (69 सेकंड)"],
              ["**गृह मंत्रालय निर्देश (6 फेब 2026)**", "राष्ट्रगान और राष्ट्रीय गीत साथ में बजाए जाने पर राष्ट्रगान पहले गाया जाएगा"]
            ]
          )
        ],
        bodyEn: [
          ...createBlocks([
            "**11 August 2026**: President Droupadi Murmu granted presidential assent to the **Prevention of Insults to National Honour (Amendment) Act, 2026**.",
            "• **Equal Legal Protection**: Grants the National Song **'Vande Mataram'** equal statutory penal protection alongside the National Anthem **'Jana Gana Mana'**.",
            "• **First Offense Penalty**: Up to **3 years imprisonment, fine, or both**.",
            "• **Repeat Offense Penalty**: Mandatory minimum **1 year imprisonment** for repeat offenders.",
            "• **Composition**: Composed in **1875 AD** in Sanskrit by **Bankim Chandra Chattopadhyay** in his novel *Anandamath*.",
            "• **First Public Performance**: 1896 Indian National Congress Calcutta Session under **Rahmatullah M. Sayani**.",
            "• **MHA Protocol (6 Feb 2026)**: When performed together, the National Anthem shall precede the National Song."
          ])
        ],
      },

      /* ── 2. Insult to National Honour Act 1971 Amendment 2026 ─ */
      {
        _key: "sec-act-details",
        kind: "background",
        title: "राष्ट्रीय सम्मान के अपमान की रोकथाम (संशोधन) अधिनियम, 2026 के मुख्य कानूनी प्रावधान",
        titleEn: "Key Penal Provisions of the Prevention of Insults to National Honour (Amendment) Act, 2026",
        body: [
          ...createBlocks([
            "### 11 अगस्त 2026: राष्ट्रपति द्रौपदी मुर्मू की मंजूरी के बाद कानून लागू",
            "11 अगस्त 2026 को भारत की राष्ट्रपति द्रौपदी मुर्मू ने 'राष्ट्रीय सम्मान के अपमान की रोकथाम (संशोधन) विधेयक, 2026' को मंजूरी दी। राष्ट्रपति के हस्ताक्षर के साथ ही यह विधेयक आधिकारिक कानून बनकर देशभर में लागू हो गया है।",
            "### नया कानून और सजा के कड़े प्रावधान:",
            "• **अपराध का दायरा**: जानबूझकर 'वंदे मातरम्' के गायन को रोकना, बाधा डालना या इसके सम्मान में आयोजित किसी सभा/समारोह में व्यवधान पैदा करना अब दंडनीय अपराध है।",
            "• **सजा (प्रथम बार अपराध)**: इस संशोधन के तहत दोषी पाए जाने पर अधिकतम **3 साल तक की कैद (कारावास)**, जुर्माना या दोनों हो सकते हैं।",
            "• **बार-बार अपराध करने पर (Repeat Offense)**: दोबारा या बार-बार ऐसा अपराध करने पर कम से कम **1 साल की अनिवार्य कैद (Mandatory Minimum 1 Year Jail)** का प्रावधान किया गया है।",
            "• **'जन गण मन' जैसा वैधानिक संरक्षण**: 1971 के मूल अधिनियम की धारा 3 के तहत केवल राष्ट्रगान को यह संरक्षण प्राप्त था। नए संशोधन के माध्यम से 'वंदे मातरम्' को भी राष्ट्रगान 'जन गण मन' के समान वैधानिक दर्जा और सुरक्षा प्राप्त हो गई है।"
          ]),
          {
            _key: "b-img-act2026",
            _type: "image",
            asset: { _type: "reference", _ref: assetAct2026._id },
            alt: "President Droupadi Murmu Assent 11 August 2026 Prevention of Insults to National Honour Act Vande Mataram MPPSC UPSC Notes",
          }
        ],
        bodyEn: [
          ...createBlocks([
            "### Statutory Provisions under the 2026 Amendment Act (Assented 11 August 2026)",
            "• **Scope of Offense**: Intentionally preventing, interrupting, or disrupting the singing or playing of 'Vande Mataram' is a statutory crime.",
            "• **First Offense Penalty**: Up to **3 years imprisonment**, fine, or both under Section 3.",
            "• **Repeat Offense Penalty**: Mandatory minimum **1-year imprisonment** upon subsequent conviction.",
            "• **Parity with National Anthem**: Grants the National Song statutory protection identical to the National Anthem ('Jana Gana Mana')."
          ])
        ],
      },

      /* ── 3. Historical Facts & Composition ───────────────────── */
      {
        _key: "sec-history-composition",
        kind: "keyHighlights",
        title: "'वंदे मातरम्' से जुड़े महत्वपूर्ण ऐतिहासिक तथ्य (History, Composition & Anandamath)",
        titleEn: "Historical Facts: Composition, Language & Anandamath Novel",
        body: [
          ...createBlocks([
            "प्रतियोगी परीक्षाओं (MPPSC, UPSC व अन्य लोक सेवा आयोगों) की दृष्टि से 'वंदे मातरम्' से संबंधित सभी ऐतिहासिक तथ्य निम्नलिखित हैं:",
            "• **रचनाकार (Composer)**: बंकिमचंद्र चट्टोपाध्याय (Bankim Chandra Chattopadhyay)",
            "• **रचना वर्ष (Year of Composition)**: 7 नवंबर 1875 ई.",
            "• **मूल भाषा (Language)**: मुख्य रूप से **संस्कृत (Sanskrit)** (जिसमें कुछ बंगाली शब्दों का सम्मिश्रण है)।",
            "• **उपन्यास 'आनंदमठ' में समावेश**: यह गीत बंकिमचंद्र चट्टोपाध्याय के प्रसिद्ध सामाजिक-राजनीतिक उपन्यास **'आनंदमठ' (Anandamath - 1882 ई.)** में शामिल किया गया। यह उपन्यास 18वीं शताब्दी के **संन्यासी विद्रोह (Sanyasi Rebellion)** की पृष्ठभूमि पर आधारित है।",
            "• **विषय-वस्तु**: यह गीत भारत-भूमि (मातृभूमि) की देवी के रूप में वंदना करता है, जिसमें सुजलां, सुफलां, मलयजशीतलाम् जैसे कालजयी प्राकृतिक व समृद्ध स्वरूप का वर्णन है।"
          ]),
          {
            _key: "b-img-bankim",
            _type: "image",
            asset: { _type: "reference", _ref: assetBankim._id },
            alt: "Bankim Chandra Chattopadhyay writing Vande Mataram manuscript 1875 MPPSC UPSC Notes",
          }
        ],
        bodyEn: [
          ...createBlocks([
            "### Key Static GK Facts on Vande Mataram",
            "• **Composer**: Bankim Chandra Chattopadhyay on 7 November 1875.",
            "• **Language**: Sanskritized Bengali.",
            "• **Novel**: Embedded in the 1882 novel *Anandamath*, written against the backdrop of the Sanyasi Rebellion.",
            "• **Theme**: Hymn in praise of Mother India as the supreme nurturing deity."
          ])
        ],
      },

      /* ── 4. Freedom Struggle & 1896 Congress Session ──────────── */
      {
        _key: "sec-freedom-struggle",
        kind: "keyHighlights",
        title: "भारतीय स्वतंत्रता आंदोलन में भूमिका एवं 1896 का कांग्रेस अधिवेशन",
        titleEn: "Role in Freedom Struggle: 1896 INC Session & Sri Aurobindo Translation",
        body: [
          ...createBlocks([
            "स्वतंत्रता संग्राम के दौरान 'वंदे मातरम्' केवल एक गीत नहीं, बल्कि संपूर्ण राष्ट्र का मूल मंत्र और क्रांतिकारी प्रेरणास्रोत बन गया:",
            "### 1. 1896 का कांग्रेस अधिवेशन (1896 INC Calcutta Session)",
            "• **प्रथम सार्वजनिक गायन**: वर्ष **1896 ई.** में कलकत्ता में आयोजित भारतीय राष्ट्रीय कांग्रेस के 12वें वार्षिक अधिवेशन में पहली बार 'वंदे मातरम्' सार्वजनिक रूप से गाया गया।",
            "• **अधिवेशन के अध्यक्ष**: इस 1896 के ऐतिहासिक कांग्रेस अधिवेशन की अध्यक्षता **रहमतुल्ला एम. सयानी (Rahmatullah M. Sayani)** ने की थी। (इस गीत की धुन रवींद्रनाथ टैगोर ने तैयार कर गाई थी)।",
            "### 2. स्वतंत्रता आंदोलन का महामंत्र",
            "• **स्वदेशी आंदोलन (1905)**: 1905 के बंगाल विभाजन विरोधी आंदोलन और स्वदेशी आंदोलन के दौरान 'वंदे मातरम्' ब्रिटिश हुकूमत के खिलाफ क्रांति का सबसे प्रमुख नारा बना।",
            "• **अंग्रेजी अनुवाद (English Translation)**: इसका महान स्वतंत्रता सेनानी एवं दार्शनिक **श्री अरविंद घोष (Sri Aurobindo Ghose)** ने वर्ष 1909 में अंग्रेजी गद्य (English Prose) में अनुवाद किया ('Mother, I bow to thee!').",
            "• **समाचार पत्र**: श्री अरविंद घोष ने 1906 में 'वंदे मातरम्' नाम से ही एक राष्ट्रवादी अंग्रेजी समाचार पत्र का संपादन भी किया था।"
          ]),
          {
            _key: "b-img-congress",
            _type: "image",
            asset: { _type: "reference", _ref: assetCongress._id },
            alt: "1896 INC Calcutta Session Rahmatullah Sayani Vande Mataram MPPSC UPSC Notes",
          }
        ],
        bodyEn: [
          ...createBlocks([
            "### Historic 1896 INC Session & Freedom Movement",
            "• **First Sung Publicly**: 1896 Indian National Congress 12th Session in Calcutta.",
            "• **Session President**: **Rahmatullah M. Sayani** (Set to tune and sung by Rabindranath Tagore).",
            "• **English Translation**: Translated into English prose by **Sri Aurobindo Ghose** in 1909.",
            "• **Swadeshi Movement (1905)**: Served as the unifying battle cry against the Partition of Bengal."
          ])
        ],
      },

      /* ── 5. National Song Status & 2026 Guidelines ────────────── */
      {
        _key: "sec-national-song-rules",
        kind: "keyHighlights",
        title: "राष्ट्रीय गीत के रूप में दर्जा एवं 2026 के महत्वपूर्ण सरकारी दिशानिर्देश",
        titleEn: "Constituent Assembly Declaration 1950 & MHA 2026 Guidelines",
        body: [
          ...createBlocks([
            "### 1. संविधान सभा की ऐतिहासिक घोषणा (24 जनवरी 1950)",
            "• **24 जनवरी 1950** को भारत की संविधान सभा के अंतिम सत्र में प्रथम राष्ट्रपति **डॉ. राजेंद्र प्रसाद** ने आधिकारिक घोषणा की कि 'जन-गण-मन' भारत का राष्ट्रगान होगा तथा 'वंदे मातरम्' को भारत के राष्ट्रीय गीत (National Song) के रूप में समान आदर और स्थान प्राप्त होगा।",
            "• **गायन की अवधि**: 'वंदे मातरम्' के प्रथम दो पदों (जिन्हें राष्ट्रीय गीत के रूप में गाया जाता है) के गायन की अवधि **लगभग 1 मिनट 9 सेकंड (69 सेकंड)** है।",
            "### 2. वर्ष 2025-2026 के महत्वपूर्ण घटनाक्रम",
            "• **11 अगस्त 2026 (राष्ट्रपति की मंजूरी)**: राष्ट्रपति द्रौपदी मुर्मू ने राष्ट्रीय सम्मान के अपमान की रोकथाम (संशोधन) अधिनियम, 2026 को मंजूरी दी।",
            "• **15 अगस्त 2026 (150 वर्ष समारोह)**: रचना के 150 वर्ष पूर्ण होने पर 2026 के स्वतंत्रता दिवस पर वंदे मातरम् की विशेष धुन बजाने का निर्णय लिया गया।",
            "• **6 फरवरी 2026 (गृह मंत्रालय के दिशानिर्देश)**: केंद्रीय गृह मंत्रालय (MHA) के निर्देशानुसार, जब राष्ट्रगान और राष्ट्रीय गीत दोनों एक साथ गाए/बजाए जाएं, तो **राष्ट्रगान का गायन पहले किया जाएगा**।"
          ])
        ],
        bodyEn: [
          ...createBlocks([
            "### Constitutional Status & MHA Protocol",
            "• **24 January 1950**: Dr. Rajendra Prasad declared 'Vande Mataram' as the National Song, according it equal status with the National Anthem.",
            "• **Duration**: Approximately **1 minute 9 seconds (69 seconds)** for the first two stanzas.",
            "• **11 August 2026**: President Droupadi Murmu approved the 2026 Amendment Act.",
            "• **6 February 2026 MHA Guidelines**: Prescribed protocol stating that when both are performed together, the National Anthem must be performed first."
          ])
        ],
      },

      /* ── 6. MPPSC Mains Model Answer Writing ─────────────────── */
      {
        _key: "sec-mains-model-qa",
        kind: "mainsAnswerWriting",
        title: "MPPSC मुख्य परीक्षा मॉडल प्रश्नोत्तर (Mains Model Q&A - Paper 2)",
        titleEn: "MPPSC Mains Model Answer Writing - Paper 2 Governance",
        body: [
          ...createBlocks([
            "### मॉडल प्रश्न (MPPSC मुख्य परीक्षा - 11 अंक / 200 शब्द)",
            "**प्रश्न**: 'राष्ट्रीय सम्मान के अपमान की रोकथाम (संशोधन) अधिनियम, 2026 के मुख्य प्रावधानों की विवेचना कीजिए। राष्ट्रगीत 'वंदे मातरम्' को राष्ट्रगान के समान कानूनी सुरक्षा प्रदान करने के संवैधानिक व ऐतिहासिक आधार का विश्लेषण कीजिए।'",
            "### उत्तर प्रारूप एवं मुख्य बिंदु (Model Answer Outline):",
            "• **1. भूमिका (Introduction)**: 11 अगस्त 2026 को राष्ट्रपति द्रौपदी मुर्मू द्वारा संशोधन अधिनियम को दी गई मंजूरी तथा 1971 अधिनियम का संदर्भ।",
            "• **2. मुख्य कानूनी प्रावधान (Legal Provisions)**:",
            "  - धारा 3 के अंतर्गत प्रथम बार अपराध पर अधिकतम 3 साल की कैद/जुर्माना।",
            "  - दोबारा अपराध करने पर कम से कम 1 साल की अनिवार्य कैद (Mandatory Imprisonment)।",
            "  - राष्ट्रगान 'जन गण मन' के समान वैधानिक सुरक्षा एवं अपराध की श्रेणी।",
            "• **3. ऐतिहासिक व संवैधानिक आधार (Historical & Constitutional Basis)**:",
            "  - बंकिमचंद्र चट्टोपाध्याय द्वारा 1875 में रचना, आनंदमठ उपन्यास (1882) एवं संन्यासी विद्रोह।",
            "  - 1896 कांग्रेस कलकत्ता अधिवेशन (रहमतुल्ला सयानी) तथा 24 जनवरी 1950 को डॉ. राजेंद्र प्रसाद द्वारा घोषित समान दर्जा।",
            "  - मौलिक कर्तव्य (अनुच्छेद 51A(a)) के तहत राष्ट्रीय प्रतीकों के आदर का दायित्व।",
            "• **4. निष्कर्ष (Conclusion)**: राष्ट्रीय एकता, देशभक्ति और संवैधानिक संस्थाओं की गरिमा हेतु यह कानून एक युगान्तकारी कदम है।"
          ])
        ],
        bodyEn: [
          ...createBlocks([
            "### MPPSC Mains Model Question (11 Marks / 200 Words)",
            "**Question**: Discuss the key provisions of the Prevention of Insults to National Honour (Amendment) Act, 2026. Analyze the historical and constitutional basis for according equal legal protection to 'Vande Mataram' alongside the National Anthem.",
            "**Model Answer Outline**: Detail 11 August 2026 Presidential Assent by Droupadi Murmu, 3-year jail for 1st offense, 1-year mandatory jail for repeat offense, 1875 Bankim Chandra origin, 1896 INC session under Rahmatullah Sayani, and Article 51A Fundamental Duties."
          ])
        ],
      },

      /* ── 7. Exam Point of View Revision Summary ───────────────── */
      {
        _key: "sec-exam-summary",
        kind: "keyHighlights",
        title: "EXAM POINT OF VIEW : परीक्षा की दृष्टि से महत्वपूर्ण तथ्य",
        titleEn: "EXAM POINT OF VIEW: Quick Revision Notes for MPPSC & UPSC",
        body: [
          ...createBlocks([
            "MPPSC (प्रारंभिक व मुख्य परीक्षा) तथा UPSC अभ्यर्थियों के लिए इस कानून व इतिहास के सबसे महत्वपूर्ण स्मरणीय तथ्य नीचे दिए गए हैं:",
            "• **राष्ट्रपति की मंजूरी तिथि**: **11 अगस्त 2026** (राष्ट्रपति द्रौपदी मुर्मू द्वारा मंजूरी स्वीकृत)",
            "• **अधिनियम का नाम**: राष्ट्रीय सम्मान के अपमान की रोकथाम (संशोधन) अधिनियम, 2026 (1971 कानून संशोधन)",
            "• **प्रथम अपराध की सजा**: **अधिकतम 3 वर्ष तक की कैद (कारावास)**, जुर्माना या दोनों (धारा 3)",
            "• **पुनरावृत्ति (Repeat Offense) पर सजा**: **कम से कम 1 वर्ष की अनिवार्य जेल (Mandatory 1 Year Jail)**",
            "• **संरक्षण का दर्जा**: राष्ट्रगान 'जन गण मन' के समान वैधानिक सुरक्षा",
            "• **रचनाकार व वर्ष**: बंकिमचंद्र चट्टोपाध्याय (7 नवंबर 1875 ई., भाषा: संस्कृत)",
            "• **उपन्यास**: आनंदमठ (1882 ई. - संन्यासी विद्रोह पृष्ठभूमि)",
            "• **प्रथम गायन**: 1896 ई. कलकत्ता कांग्रेस अधिवेशन (अध्यक्ष: रहमतुल्ला एम. सयानी)",
            "• **अंग्रेजी अनुवाद**: श्री अरविंद घोष (1909 ई.)",
            "• **संविधान सभा दर्जा**: 24 जनवरी 1950 (डॉ. राजेंद्र प्रसाद द्वारा घोषित)",
            "• **गायन की अवधि**: लगभग 1 मिनट 9 सेकंड (69 सेकंड)",
            "• **गृह मंत्रालय नियम (6 फेब 2026)**: राष्ट्रगान और राष्ट्रीय गीत साथ में बजाए जाने पर **राष्ट्रगान पहले गाया जाएगा**",
            "• **सम्बंधित अध्ययन सामग्री**: [73वां व 74वां संविधान संशोधन](/general-awareness/73-74-amendment-act-panchayati-raj-mppsc-notes), [आपदा प्रबंधन संशोधन अधिनियम 2025](/current-affairs/disaster-management-amendment-act-2025-mppsc-upsc-notes) तथा [संविधान सभा का गठन](/general-awareness/constituent-assembly-formation-history-mppsc-notes)।"
          ]),
          createTable(
            "table-vande-mataram-exam-table",
            "MPPSC / UPSC परीक्षा रिवीजन तालिका: वंदे मातरम् व 2026 अधिनियम",
            ["परीक्षा उपयोगी बिंदु", "तथ्य / प्रावधान"],
            [
              ["**राष्ट्रपति की मंजूरी तिथि**", "**11 अगस्त 2026 (राष्ट्रपति द्रौपदी मुर्मू)**"],
              ["**संशोधित अधिनियम**", "**राष्ट्रीय सम्मान के अपमान की रोकथाम (संशोधन) अधिनियम, 2026 (धारा 3)**"],
              ["**प्रथम अपराध की सजा**", "**अधिकतम 3 वर्ष तक की जेल, जुर्माना या दोनों**"],
              ["**पुनरावृत्ति (Repeat Offense)**", "**कम से कम 1 वर्ष की अनिवार्य कैद (Mandatory Imprisonment)**"],
              ["**रचनाकार व वर्ष**", "**बंकिमचंद्र चट्टोपाध्याय (1875 ई., संस्कृत भाषा)**"],
              ["**उपन्यास**", "**आनंदमठ (1882 ई., संन्यासी विद्रोह)**"],
              ["**प्रथम सार्वजनिक गायन**", "**1896 कांग्रेस कलकत्ता अधिवेशन (अध्यक्ष: रहमतुल्ला एम. सयानी)**"],
              ["**अंग्रेजी अनुवादक**", "**श्री अरविंद घोष (1909 ई.)**"],
              ["**संवैधानिक मान्यता तिथि**", "**24 जनवरी 1950 (डॉ. राजेंद्र प्रसाद की घोषणा)**"],
              ["**गृह मंत्रालय नियम 2026**", "**राष्ट्रगान और राष्ट्रीय गीत साथ होने पर राष्ट्रगान पहले गाया जाएगा**"]
            ]
          )
        ],
        bodyEn: [
          ...createBlocks([
            "Key revision bullet points for MPPSC Prelims/Mains and UPSC exams:",
            "• **Presidential Assent Date**: **11 August 2026** (President Droupadi Murmu)",
            "• **First Offense Penalty**: Up to 3 years imprisonment or fine under Section 3",
            "• **Repeat Offense Penalty**: Mandatory minimum **1 year imprisonment**",
            "• **Statutory Status**: Equal protection with National Anthem ('Jana Gana Mana')",
            "• **Composer**: Bankim Chandra Chattopadhyay (1875 AD in Sanskrit)",
            "• **Novel**: Anandamath (1882 AD)",
            "• **First Sung**: 1896 INC Calcutta Session (President: Rahmatullah M. Sayani)",
            "• **English Translator**: Sri Aurobindo Ghose (1909 AD)",
            "• **National Song Status**: 24 January 1950 (Dr. Rajendra Prasad)",
            "• **Duration**: Approx 1 minute 9 seconds (69 seconds)"
          ])
        ],
      },
    ],

    /* ─── FAQs Array Field ─────────────────────────────────────── */
    faqs: [
      {
        question: "राष्ट्रपति द्रौपदी मुर्मू ने किस तिथि को 'राष्ट्रीय सम्मान के अपमान की रोकथाम (संशोधन) अधिनियम, 2026' को मंजूरी दी?",
        answer: "राष्ट्रपति द्रौपदी मुर्मू ने 11 अगस्त 2026 को इस संशोधन अधिनियम को अपनी औपचारिक मंजूरी प्रदान की, जिसके बाद राष्ट्रगीत 'वंदे मातरम्' के अपमान पर कानून लागू हो गया।",
        questionEn: "On which date did President Droupadi Murmu grant assent to the Prevention of Insults to National Honour (Amendment) Act, 2026?",
        answerEn: "President Droupadi Murmu granted official assent on 11 August 2026.",
      },
      {
        question: "'वंदे मातरम्' के अपमान या गायन में बाधा डालने पर क्या सजा का प्रावधान है?",
        answer: "प्रथम बार अपराध करने पर अधिकतम 3 साल की कैद, जुर्माना या दोनों हो सकते हैं। वहीं दोबारा या बार-बार ऐसा अपराध करने पर कम से कम 1 साल की अनिवार्य कैद (Mandatory Imprisonment) का प्रावधान है।",
        questionEn: "What is the penalty for disrespecting or obstructing 'Vande Mataram' under the 2026 law?",
        answerEn: "For the first offense, up to 3 years imprisonment, fine, or both. For repeat offenses, a mandatory minimum of 1 year imprisonment is prescribed.",
      },
      {
        question: "क्या 2026 के नए कानून ने 'वंदे मातरम्' को 'जन गण मन' के समान वैधानिक दर्जा दिया है?",
        answer: "हाँ, इस नए संशोधन ने 1971 के मूल अधिनियम की धारा 3 के अंतर्गत राष्ट्रगीत 'वंदे मातरम्' को राष्ट्रगान 'जन गण मन' के समान वैधानिक और कानूनी संरक्षण प्रदान किया है।",
        questionEn: "Does the 2026 law accord 'Vande Mataram' equal status with 'Jana Gana Mana'?",
        answerEn: "Yes, it accords 'Vande Mataram' equal statutory and legal penal protection alongside the National Anthem 'Jana Gana Mana' under Section 3.",
      },
      {
        question: "'वंदे मातरम्' की रचना किसने, किस भाषा में और किस वर्ष की थी?",
        answer: "'वंदे मातरम्' की रचना बंकिमचंद्र चट्टोपाध्याय ने 7 नवंबर 1875 ई. में मूलतः संस्कृत भाषा में की थी।",
        questionEn: "Who composed 'Vande Mataram', in which language, and in which year?",
        answerEn: "Composed by Bankim Chandra Chattopadhyay in 1875 AD in Sanskritized Bengali.",
      },
      {
        question: "'वंदे मातरम्' किस प्रसिद्ध उपन्यास में शामिल है?",
        answer: "यह गीत बंकिमचंद्र चट्टोपाध्याय के प्रसिद्ध उपन्यास 'आनंदमठ' (Anandamath - 1882 ई.) में शामिल है, जो संन्यासी विद्रोह की पृष्ठभूमि पर आधारित है।",
        questionEn: "In which famous novel is 'Vande Mataram' included?",
        answerEn: "In Bankim Chandra Chattopadhyay's 1882 novel 'Anandamath', based on the Sanyasi Rebellion.",
      },
      {
        question: "कांग्रेस के किस अधिवेशन में 'वंदे मातरम्' पहली बार सार्वजनिक रूप से गाया गया था?",
        answer: "वर्ष 1896 ई. में कलकत्ता में आयोजित भारतीय राष्ट्रीय कांग्रेस के 12वें वार्षिक अधिवेशन में पहली बार 'वंदे मातरम्' गाया गया था, जिसकी अध्यक्षता रहमतुल्ला एम. सयानी ने की थी।",
        questionEn: "In which Congress session was 'Vande Mataram' first sung publicly?",
        answerEn: "At the 1896 INC Calcutta Session, presided over by Rahmatullah M. Sayani.",
      },
      {
        question: "'वंदे मातरम्' का अंग्रेजी अनुवाद किसने किया था?",
        answer: "'वंदे मातरम्' का अंग्रेजी गद्य अनुवाद महान स्वतंत्रता सेनानी एवं दार्शनिक श्री अरविंद घोष (Sri Aurobindo Ghose) ने वर्ष 1909 में किया था।",
        questionEn: "Who translated 'Vande Mataram' into English?",
        answerEn: "Sri Aurobindo Ghose translated it into English prose in 1909 ('Mother, I bow to thee!').",
      },
      {
        question: "गृह मंत्रालय के 6 फरवरी 2026 के दिशानिर्देशानुसार राष्ट्रगान और राष्ट्रीय गीत का क्रम क्या होगा?",
        answer: "गृह मंत्रालय के 6 फरवरी 2026 के निर्देशों के अनुसार, जब राष्ट्रगान और राष्ट्रीय गीत दोनों एक साथ गाए या बजाए जाएं, तो राष्ट्रगान (Jana Gana Mana) पहले गाया जाएगा।",
        questionEn: "What is the MHA protocol guideline of 6 February 2026 regarding singing order?",
        answerEn: "When both are performed together, the National Anthem must be performed first.",
      },
    ],

    /* ─── MCQs Array Field (EXACTLY 8 HIGH QUALITY MCQs) ────── */
    mcqs: [
      {
        question: "राष्ट्रपति द्रौपदी मुर्मू ने किस तिथि को 'राष्ट्रीय सम्मान के अपमान की रोकथाम (संशोधन) अधिनियम, 2026' को अपनी मंजूरी प्रदान की?",
        options: ["1 अक्टूबर 2025", "6 फरवरी 2026", "5 मई 2026", "11 अगस्त 2026"],
        correctIndex: 3,
        explanation: "राष्ट्रपति द्रौपदी मुर्मू ने 11 अगस्त 2026 को इस ऐतिहासिक संशोधन अधिनियम को मंजूरी दी, जिससे 'वंदे मातरम्' को 'जन गण मन' के समान वैधानिक संरक्षण मिला।",
        questionEn: "On which date did President Droupadi Murmu grant official assent to the Prevention of Insults to National Honour (Amendment) Act, 2026?",
        optionsEn: ["1 October 2025", "6 February 2026", "5 May 2026", "11 August 2026"],
        explanationEn: "President Droupadi Murmu granted assent on 11 August 2026, granting 'Vande Mataram' statutory parity with 'Jana Gana Mana'.",
      },
      {
        question: "'राष्ट्रीय सम्मान के अपमान की रोकथाम (संशोधन) अधिनियम, 2026' के तहत 'वंदे मातरम्' का दोबारा (Repeat Offense) अपमान करने पर न्यूनतम कितनी सजा का प्रावधान है?",
        options: ["6 माह की सजा", "1 वर्ष की अनिवार्य कैद", "2 वर्ष की सजा", "3 वर्ष की सजा"],
        correctIndex: 1,
        explanation: "नये कानून के तहत दोबारा ऐसा अपराध करने पर कम से कम 1 वर्ष की अनिवार्य कैद (Mandatory Imprisonment) का प्रावधान किया गया है।",
        questionEn: "Under the 2026 Amendment Act, what is the mandatory minimum sentence for a repeat offense regarding 'Vande Mataram'?",
        optionsEn: ["6 months imprisonment", "1 year mandatory imprisonment", "2 years imprisonment", "3 years imprisonment"],
        explanationEn: "For repeat offenders, the 2026 Act prescribes a mandatory minimum of 1 year imprisonment.",
      },
      {
        question: "'वंदे मातरम्' के संबंध में निम्नलिखित में से कौन-सा कथन सही है?",
        options: [
          "इसकी रचना रवींद्रनाथ टैगोर ने की थी।",
          "इसे पहली बार 1896 के कांग्रेस अधिवेशन में गाया गया था।",
          "यह मूल रूप से 'गीतांजलि' में शामिल था।",
          "इसका अंग्रेजी अनुवाद महात्मा गांधी ने किया था।"
        ],
        correctIndex: 1,
        explanation: "'वंदे मातरम्' की रचना बंकिमचंद्र चट्टोपाध्याय ने 1875 में की थी और इसे पहली बार 1896 के कलकत्ता कांग्रेस अधिवेशन में गाया गया था, जिसकी अध्यक्षता रहमतुल्ला एम. सयानी ने की थी।",
        questionEn: "Which of the following statements regarding 'Vande Mataram' is correct?",
        optionsEn: [
          "It was composed by Rabindranath Tagore.",
          "It was sung for the first time in the 1896 Congress session.",
          "It was originally included in 'Gitanjali'.",
          "Its English translation was done by Mahatma Gandhi."
        ],
        explanationEn: "Vande Mataram was composed by Bankim Chandra Chattopadhyay in 1875 and was first sung publicly at the 1896 INC Calcutta Session under Rahmatullah M. Sayani.",
      },
      {
        question: "'वंदे मातरम्' बंकिमचंद्र चट्टोपाध्याय के किस प्रसिद्ध उपन्यास में शामिल है?",
        options: ["दुर्गेशनंदिनी", "कपालकुंडला", "आनंदमठ", "देवी चौधुरानी"],
        correctIndex: 2,
        explanation: "'वंदे मातरम्' बंकिमचंद्र चट्टोपाध्याय के 1882 के उपन्यास 'आनंदमठ' में शामिल है, जो संन्यासी विद्रोह पर आधारित है।",
        questionEn: "'Vande Mataram' is included in which famous novel by Bankim Chandra Chattopadhyay?",
        optionsEn: ["Durgeshnandini", "Kapalkundala", "Anandamath", "Devi Chaudhurani"],
        explanationEn: "It is included in Bankim Chandra's 1882 novel 'Anandamath', set against the Sanyasi Rebellion.",
      },
      {
        question: "वर्ष 1896 के भारतीय राष्ट्रीय कांग्रेस के कलकत्ता अधिवेशन की अध्यक्षता किसने की थी, जिसमें पहली बार 'वंदे मातरम्' गाया गया?",
        options: ["दादाभाई नौरोजी", "रहमतुल्ला एम. सयानी", "गोपाल कृष्ण गोखले", "बदरुद्दीन तैयबजी"],
        correctIndex: 1,
        explanation: "1896 के कलकत्ता अधिवेशन की अध्यक्षता रहमतुल्ला एम. सयानी (Rahmatullah M. Sayani) ने की थी।",
        questionEn: "Who presided over the 1896 INC Calcutta session where 'Vande Mataram' was first sung?",
        optionsEn: ["Dadabhai Naoroji", "Rahmatullah M. Sayani", "Gopal Krishna Gokhale", "Badruddin Tyabji"],
        explanationEn: "The 1896 session was presided over by Rahmatullah M. Sayani.",
      },
      {
        question: "'वंदे मातरम्' का अंग्रेजी में गद्य अनुवाद (English Prose Translation) 1909 में किसके द्वारा किया गया था?",
        options: ["रवींद्रनाथ टैगोर", "श्री अरविंद घोष", "सरोजिनी नायडू", "सुभाष चंद्र बोस"],
        correctIndex: 1,
        explanation: "महान स्वतंत्रता सेनानी व दार्शनिक श्री अरविंद घोष (Sri Aurobindo Ghose) ने 1909 में 'वंदे मातरम्' का अंग्रेजी अनुवाद किया था।",
        questionEn: "Who rendered the English prose translation of 'Vande Mataram' in 1909?",
        optionsEn: ["Rabindranath Tagore", "Sri Aurobindo Ghose", "Sarojini Naidu", "Subhas Chandra Bose"],
        explanationEn: "Sri Aurobindo Ghose translated Vande Mataram into English prose in 1909.",
      },
      {
        question: "संविधान सभा में डॉ. राजेंद्र प्रसाद द्वारा 'वंदे मातरम्' को भारत के राष्ट्रीय गीत के रूप में किस तिथि को घोषित किया गया था?",
        options: ["15 अगस्त 1947", "26 नवंबर 1949", "24 जनवरी 1950", "26 जनवरी 1950"],
        correctIndex: 2,
        explanation: "24 जनवरी 1950 को संविधान सभा के अंतिम सत्र में डॉ. राजेंद्र प्रसाद ने वंदे मातरम् को राष्ट्रीय गीत के समान दर्जे की घोषणा की थी।",
        questionEn: "On which date was 'Vande Mataram' declared as the National Song by Dr. Rajendra Prasad in the Constituent Assembly?",
        optionsEn: ["15 August 1947", "26 November 1949", "24 January 1950", "26 January 1950"],
        explanationEn: "Declared on 24 January 1950 during the final session of the Constituent Assembly.",
      },
      {
        question: "केंद्रीय गृह मंत्रालय द्वारा 6 फरवरी 2026 को जारी निर्देशों के अनुसार, जब राष्ट्रगान और राष्ट्रीय गीत दोनों बजाए जाएं, तो क्या नियम लागू होगा?",
        options: [
          "राष्ट्रीय गीत पहले गाया जाएगा",
          "राष्ट्रगान पहले गाया जाएगा",
          "दोनों एक साथ गाए जाएंगे",
          "कोई भी पहले गाया जा सकता है"
        ],
        correctIndex: 1,
        explanation: "6 फरवरी 2026 के MHA दिशानिर्देशों के अनुसार, राष्ट्रगान (जन-गण-मन) का वादन/गायन राष्ट्रीय गीत (वंदे मातरम्) से पहले होगा।",
        questionEn: "According to MHA guidelines of 6 February 2026, when both National Anthem and National Song are performed, what is the protocol?",
        optionsEn: [
          "National Song must be performed first",
          "National Anthem must be performed first",
          "Both must be performed simultaneously",
          "Either can be performed first"
        ],
        explanationEn: "The guidelines state that the National Anthem must precede the National Song when performed together.",
      },
    ],
  };

  console.log("💾 Uploading Vande Mataram National Honour Act 2026 Article to Sanity...");
  const res = await client.createOrReplace(article);
  console.log(`✅ Successfully uploaded article to Sanity! Document ID: ${res._id}`);
  console.log(`✔ Live URL: /current-affairs/${targetSlug}`);
}

main().catch((err) => {
  console.error("❌ Error uploading article to Sanity:", err);
  process.exit(1);
});
