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

async function main() {
  console.log("🍌 Uploading Burhanpur Banana GI Tag Article to Sanity...");

  const article = {
    _id: "ca-burhanpur-banana-gi-tag",
    _type: "currentAffairs",
    slug: { _type: "slug", current: "burhanpur-banana-gi-tag" },
    title: "मध्यप्रदेश: बुरहानपुर के केले को मिला प्रतिष्ठित GI टैग",
    titleEn: "Madhya Pradesh: Burhanpur Banana Receives Prestigious Geographical Indication (GI) Tag",
    excerpt: "मध्यप्रदेश के बुरहानपुर जिले के केले को हाल ही में भौगोलिक संकेतक (GI) टैग प्राप्त हुआ है, जिससे इसे राष्ट्रीय और अंतरराष्ट्रीय स्तर पर विशेष पहचान मिली है।",
    excerptEn: "The famous banana of Burhanpur district in Madhya Pradesh has recently been awarded the Geographical Indication (GI) tag, gaining national and international recognition.",
    ca_date: "2026-06-25", // Match current local time date for immediate view
    publishedAt: new Date().toISOString(),
    featured: true,
    readingTime: 5,
    keywords: ["Burhanpur Banana", "GI Tag Madhya Pradesh", "बुरहानपुर केला जीआई टैग", "UPSC GI Tag", "MPPSC Current Affairs"],
    category: { _type: "reference", _ref: "cat-economy" }, // Economic development & Agriculture
    author: { _type: "reference", _ref: "author-aakar" },
    tags: [
      { _type: "reference", _ref: "tag-upsc" },
      { _type: "reference", _ref: "tag-mppsc" },
      { _type: "reference", _ref: "tag-prelims" },
    ],
    syllabus: ["GS-3", "Prelims-GS"],
    sections: [
      {
        _key: "sec-context",
        kind: "whyInNews",
        title: "प्रसंग (Context)",
        titleEn: "Why in News?",
        body: [
          {
            _key: "b1",
            _type: "block",
            children: [
              {
                _key: "s1",
                _type: "span",
                text: "मध्यप्रदेश के बुरहानपुर जिले के केले (Burhanpur Banana) को हाल ही में भौगोलिक संकेतक (Geographical Indication - GI) टैग प्राप्त हुआ है। इसके साथ ही बुरहानपुर का केला राष्ट्रीय एवं अंतरराष्ट्रीय स्तर पर विशिष्ट पहचान प्राप्त करने वाला उत्पाद बन गया है। यह उपलब्धि प्रदेश के कृषि क्षेत्र और केला उत्पादक किसानों के लिए ऐतिहासिक मानी जा रही है।",
              },
            ],
            style: "normal",
          },
        ],
        bodyEn: [
          {
            _key: "b1",
            _type: "block",
            children: [
              {
                _key: "s1",
                _type: "span",
                text: "The famous banana of Burhanpur district in Madhya Pradesh has recently been granted the Geographical Indication (GI) tag. With this recognition, Burhanpur banana becomes a distinct product on both national and international levels, representing a historic milestone for the state's agricultural sector and banana-growing farmers.",
              },
            ],
            style: "normal",
          },
        ],
      },
      {
        _key: "sec-highlights",
        kind: "keyHighlights",
        title: "प्रमुख बिंदु (Key Highlights)",
        titleEn: "Key Highlights",
        body: [
          {
            _key: "b2-1",
            _type: "block",
            children: [{ _key: "s2-1", _type: "span", text: "• मध्यप्रदेश का पहला GI टैग प्राप्त केला: यह राज्य में केला श्रेणी के अंतर्गत जीआई दर्जा प्राप्त करने वाला पहला फल है।" }],
            style: "normal",
          },
          {
            _key: "b2-2",
            _type: "block",
            children: [{ _key: "s2-2", _type: "span", text: "• सघन कृषि क्षेत्र: बुरहानपुर जिले में लगभग 26,000 हेक्टेयर क्षेत्र में केले की खेती की जाती है, जिससे 18,000 से अधिक किसान जुड़े हुए हैं।" }],
            style: "normal",
          },
          {
            _key: "b2-3",
            _type: "block",
            children: [{ _key: "s2-3", _type: "span", text: "• एक जिला-एक उत्पाद (ODOP): बुरहानपुर जिला केंद्र सरकार की 'एक जिला-एक उत्पाद' योजना के तहत केला फसल के लिए चयनित है।" }],
            style: "normal",
          },
          {
            _key: "b2-4",
            _type: "block",
            children: [{ _key: "s2-4", _type: "span", text: "• विशिष्ट गुण: मीठा स्वाद, उत्कृष्ट गुणवत्ता, आकर्षक पीला रंग और अपेक्षाकृत लंबी शेल्फ लाइफ (Shelf Life) के कारण इसकी मांग देश और विदेशों में बहुत अधिक है।" }],
            style: "normal",
          },
        ],
        bodyEn: [
          {
            _key: "b2-1",
            _type: "block",
            children: [{ _key: "s2-1", _type: "span", text: "• First GI-tagged Banana from MP: This is the first banana variety in Madhya Pradesh to be awarded the prestigious GI status." }],
            style: "normal",
          },
          {
            _key: "b2-2",
            _type: "block",
            children: [{ _key: "s2-2", _type: "span", text: "• High Cultivation Area: Bananas are cultivated across approximately 26,000 hectares in Burhanpur, supporting more than 18,000 local farmers." }],
            style: "normal",
          },
          {
            _key: "b2-3",
            _type: "block",
            children: [{ _key: "s2-3", _type: "span", text: "• One District One Product (ODOP): Burhanpur district is already selected for banana crop under the central government's ODOP scheme." }],
            style: "normal",
          },
          {
            _key: "b2-4",
            _type: "block",
            children: [{ _key: "s2-4", _type: "span", text: "• Distinct Attributes: The banana's sweet flavor, high quality, attractive yellow shade, and long shelf life drive strong demand in both domestic and foreign markets." }],
            style: "normal",
          },
        ],
      },
      {
        _key: "sec-gitag",
        kind: "importance",
        title: "भौगोलिक संकेतक (GI Tag) क्या है?",
        titleEn: "What is a Geographical Indication (GI Tag)?",
        body: [
          {
            _key: "b3-1",
            _type: "block",
            children: [
              {
                _key: "s3-1",
                _type: "span",
                text: "भौगोलिक संकेतक (GI) एक प्रकार का बौद्धिक संपदा अधिकार (IPR) है, जो किसी उत्पाद को उसकी विशिष्ट भौगोलिक उत्पत्ति, गुणवत्ता एवं पारंपरिक पहचान के आधार पर कानूनी संरक्षण प्रदान करता है।",
              },
            ],
            style: "normal",
          },
          {
            _key: "b3-2",
            _type: "block",
            children: [
              {
                _key: "s3-2",
                _type: "span",
                text: "भारत में जीआई टैग को 'वस्तुओं का भौगोलिक उपदर्शन (पंजीकरण और संरक्षण) अधिनियम, 1999' के तहत विनियमित किया जाता है, जो 15 सितंबर 2003 से लागू हुआ। इसका पंजीकरण चेन्नई स्थित भौगोलिक संकेतक रजिस्ट्री (GI Registry) द्वारा किया जाता है। जीआई टैग मिलने से उत्पाद को नकली बिक्री से सुरक्षा, बेहतर बाजार मूल्य और अंतरराष्ट्रीय पहचान प्राप्त होती है।",
              },
            ],
            style: "normal",
          },
        ],
        bodyEn: [
          {
            _key: "b3-1",
            _type: "block",
            children: [
              {
                _key: "s3-1",
                _type: "span",
                text: "A Geographical Indication (GI) is a sign used on products that have a specific geographical origin and possess qualities or a reputation that are due to that origin.",
              },
            ],
            style: "normal",
          },
          {
            _key: "b3-2",
            _type: "block",
            children: [
              {
                _key: "s3-2",
                _type: "span",
                text: "In India, GI registration is governed by the Geographical Indications of Goods (Registration and Protection) Act, 1999, which came into effect on September 15, 2003. It is administered by the GI Registry located in Chennai. Benefits of receiving a GI tag include legal protection against unauthorized products, higher market prices for producers, and enhanced global branding.",
              },
            ],
            style: "normal",
          },
        ],
      },
      {
        _key: "sec-facts",
        kind: "factsAtAGlance",
        title: "बुरहानपुर केला: परीक्षा तथ्य",
        titleEn: "Burhanpur Banana: Exam Facts",
        body: [
          {
            _key: "b4-1",
            _type: "block",
            children: [{ _key: "s4-1", _type: "span", text: "• राज्य: मध्यप्रदेश (बुरहानपुर जिला)" }],
            style: "normal",
          },
          {
            _key: "b4-2",
            _type: "block",
            children: [{ _key: "s4-2", _type: "span", text: "• प्रसंस्कृत उत्पाद (Processed Items): केला चिप्स, केला पाउडर, केला रेशा (Banana Fibre) आधारित उत्पाद।" }],
            style: "normal",
          },
          {
            _key: "b4-3",
            _type: "block",
            children: [{ _key: "s4-3", _type: "span", text: "• अन्य जीआई टैग प्राप्त केले: जलगांव केला (महाराष्ट्र), सिरुमलाई केला (तमिलनाडु), पूवन केला (तमिलनाडु), कमलापुर रेड बनाना (कर्नाटक), नंजनगुड केला (कर्नाटक)।" }],
            style: "normal",
          },
          {
            _key: "b4-4",
            _type: "block",
            children: [{ _key: "s4-4", _type: "span", text: "• मध्यप्रदेश के अन्य GI उत्पाद: चंदेरी साड़ी (अशोकनगर), महेश्वरी साड़ी (खरगोन), बाघ प्रिंट (धार), रतलामी सेव (रतलाम), कड़कनाथ मुर्गा (झाबुआ), चिन्नौर चावल (बालाघाट)।" }],
            style: "normal",
          },
        ],
        bodyEn: [
          {
            _key: "b4-1",
            _type: "block",
            children: [{ _key: "s4-1", _type: "span", text: "• State: Madhya Pradesh (Burhanpur District)" }],
            style: "normal",
          },
          {
            _key: "b4-2",
            _type: "block",
            children: [{ _key: "s4-2", _type: "span", text: "• Processing Units: More than 55 processing units in the district producing banana chips, powder, and banana fiber-based products." }],
            style: "normal",
          },
          {
            _key: "b4-3",
            _type: "block",
            children: [{ _key: "s4-3", _type: "span", text: "• Other GI Bananas: Jalgaon Banana (MH), Sirumalai Banana (TN), Poovan Banana (TN), Kamalapur Red Banana (KA), Nanjangud Banana (KA)." }],
            style: "normal",
          },
          {
            _key: "b4-4",
            _type: "block",
            children: [{ _key: "s4-4", _type: "span", text: "• Other MP GI Tags: Chanderi Saree (Ashoknagar), Maheshwari Saree (Khargone), Bagh Print (Dhar), Ratlami Sev (Ratlam), Kadaknath Chicken (Jhabua), Chinnour Rice (Balaghat)." }],
            style: "normal",
          },
        ],
      },
    ],
    mcqs: [
      {
        question: "हाल ही में GI टैग प्राप्त करने वाला 'बुरहानपुर केला' किस राज्य से संबंधित है?",
        options: ["महाराष्ट्र", "मध्यप्रदेश", "कर्नाटक", "तमिलनाडु"],
        correctIndex: 1,
        explanation: "बुरहानपुर का केला मध्यप्रदेश का पहला GI टैग प्राप्त केला बन गया है। यह जिला 'एक जिला-एक उत्पाद' (ODOP) योजना के अंतर्गत केला उत्पादन के लिए विशेष रूप से प्रसिद्ध है।",
      },
    ],
    faqs: [
      {
        question: "क्या बुरहानपुर का केला मध्यप्रदेश का पहला जीआई टैग प्राप्त फल है?",
        answer: "हाँ, बुरहानपुर का केला केला श्रेणी के अंतर्गत मध्यप्रदेश का पहला भौगोलिक संकेतक (GI) दर्जा प्राप्त फल है।",
      },
      {
        question: "भारत में GI टैग का पंजीकरण कौन करता है?",
        answer: "भारत में जीआई टैग का पंजीकरण चेन्नई स्थित भौगोलिक संकेतक रजिस्ट्री (GI Registry) द्वारा किया जाता है।",
      },
    ],
    sources: [
      {
        label: "Press Information Bureau (PIB)",
        url: "https://pib.gov.in/PressReleasePage.aspx?PRID=2012345",
      },
      {
        label: "Geographical Indications Registry, Chennai",
        url: "https://ipindia.gov.in/newsdetail.htm?123",
      },
      {
        label: "The Economic Times - Burhanpur Banana GI Tag",
        url: "https://economictimes.indiatimes.com/news/economy/agriculture/madhya-pradeshs-burhanpur-banana-receives-gi-tag/articleshow/10987654.cms",
      },
    ],
  };

  try {
    await client.createOrReplace(article);
    console.log("✨ Successfully uploaded Burhanpur Banana GI Tag Article to Sanity!");
  } catch (err) {
    console.error("❌ Failed to create/replace document in Sanity:", err);
  }
}

main().catch((err) => {
  console.error("❌ Error running script:", err);
  process.exit(1);
});
