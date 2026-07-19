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
  console.log("✈ Uploading Indian Passport & Citizenship Article to Sanity...");

  const article = {
    _id: "ca-indian-passport-citizenship",
    _type: "currentAffairs",
    slug: { _type: "slug", current: "indian-passport-citizenship-proof" },
    title: "भारतीय पासपोर्ट और नागरिकता: क्या पासपोर्ट नागरिकता का अंतिम प्रमाण है?",
    titleEn: "Indian Passport and Citizenship: Is Passport Conclusive Proof of Citizenship?",
    excerpt: "हाल ही में विदेश मंत्रालय (MEA) ने स्पष्ट किया है कि भारतीय पासपोर्ट नागरिकता का अंतिम प्रमाण नहीं, बल्कि एक यात्रा दस्तावेज (Travel Document) है।",
    excerptEn: "The Ministry of External Affairs (MEA) has clarified that an Indian passport is not conclusive proof of citizenship, but rather a travel document.",
    ca_date: "2026-06-26", // Current date
    publishedAt: new Date().toISOString(),
    featured: true,
    readingTime: 6,
    keywords: [
      "Indian Passport",
      "Citizenship Act 1955",
      "Passport Act 1967",
      "Citizenship Proof",
      "MEA Clarification",
      "UPSC Polity",
      "भारतीय पासपोर्ट",
      "नागरिकता अधिनियम",
      "मेनका गांधी केस"
    ],
    category: { _type: "reference", _ref: "cat-polity" }, // Polity & Constitution
    author: { _type: "reference", _ref: "author-aakar" },
    tags: [
      { _type: "reference", _ref: "tag-upsc" },
      { _type: "reference", _ref: "tag-mppsc" },
      { _type: "reference", _ref: "tag-prelims" },
      { _type: "reference", _ref: "tag-mains" },
    ],
    syllabus: ["GS-2", "Prelims-GS"],
    sections: [
      {
        _key: "sec-context",
        kind: "whyInNews",
        title: "प्रसंग (Context)",
        titleEn: "Why in News?",
        body: [
          {
            _key: "b1-1",
            _type: "block",
            children: [
              {
                _key: "s1-1",
                _type: "span",
                text: "हाल ही में विदेश मंत्रालय (MEA) ने स्पष्ट किया है कि भारतीय पासपोर्ट (Indian Passport) नागरिकता (Citizenship) का अंतिम प्रमाण नहीं, बल्कि एक यात्रा दस्तावेज (Travel Document) है। इसका मुख्य उद्देश्य भारतीय नागरिकों को विदेश यात्रा की अनुमति देना और विदेशों में भारतीय दूतावासों से राजनयिक सहायता उपलब्ध कराना है।",
              },
            ],
            style: "normal",
          },
        ],
        bodyEn: [
          {
            _key: "b1-2",
            _type: "block",
            children: [
              {
                _key: "s1-2",
                _type: "span",
                text: "Recently, the Ministry of External Affairs (MEA) clarified that an Indian passport is not the conclusive proof of citizenship, but rather a travel document. Its primary purpose is to authorize Indian citizens to travel abroad and to provide diplomatic/consular assistance through Indian missions abroad.",
              },
            ],
            style: "normal",
          },
        ],
      },
      {
        _key: "sec-whatis",
        kind: "background",
        title: "पासपोर्ट और नागरिकता क्या हैं?",
        titleEn: "What are Passport and Citizenship?",
        body: [
          {
            _key: "b2-1",
            _type: "block",
            children: [
              {
                _key: "s2-1",
                _type: "span",
                text: "पासपोर्ट (Passport): यह एक सरकारी यात्रा दस्तावेज है, जिसे पासपोर्ट अधिनियम, 1967 (Passport Act, 1967) के तहत जारी किया जाता है। यह धारक की पहचान और राष्ट्रीयता (Nationality) का साक्ष्य होता है, लेकिन इसे नागरिकता का अंतिम (Conclusive) प्रमाण नहीं माना जा सकता।",
              },
            ],
            style: "normal",
          },
          {
            _key: "b2-2",
            _type: "block",
            children: [
              {
                _key: "s2-2",
                _type: "span",
                text: "नागरिकता (Citizenship): नागरिकता किसी व्यक्ति और राज्य के बीच एक कानूनी संबंध है, जिसके आधार पर उसे संविधान एवं कानून द्वारा नागरिक अधिकार और कर्तव्य प्राप्त होते हैं। भारत में नागरिकता संबंधी प्रावधानों को मुख्य रूप से नागरिकता अधिनियम, 1955 (Citizenship Act, 1955) के तहत विनियमित किया जाता है।",
              },
            ],
            style: "normal",
          },
        ],
        bodyEn: [
          {
            _key: "b2-3",
            _type: "block",
            children: [
              {
                _key: "s2-3",
                _type: "span",
                text: "Passport: A passport is a government travel document issued under the Passport Act, 1967. It serves as evidence of the holder's identity and nationality, but is not considered conclusive proof of citizenship.",
              },
            ],
            style: "normal",
          },
          {
            _key: "b2-4",
            _type: "block",
            children: [
              {
                _key: "s2-4",
                _type: "span",
                text: "Citizenship: Citizenship is a legal relationship between an individual and the state, granting rights and obligations under the constitution and laws. In India, citizenship is primarily governed by the Citizenship Act, 1955.",
              },
            ],
            style: "normal",
          },
        ],
      },
      {
        _key: "sec-differences",
        kind: "keyHighlights",
        title: "पासपोर्ट और नागरिकता में अंतर",
        titleEn: "Differences Between Passport and Citizenship",
        body: [
          {
            _key: "b3-1",
            _type: "block",
            children: [{ _key: "s3-1", _type: "span", text: "• पासपोर्ट एक यात्रा दस्तावेज (Travel Document) है, जबकि नागरिकता एक कानूनी दर्जा (Legal Status) है।" }],
            style: "normal",
          },
          {
            _key: "b3-2",
            _type: "block",
            children: [{ _key: "s3-2", _type: "span", text: "• पासपोर्ट को पासपोर्ट अधिनियम, 1967 के तहत जारी किया जाता है, जबकि नागरिकता नागरिकता अधिनियम, 1955 द्वारा नियंत्रित होती है।" }],
            style: "normal",
          },
          {
            _key: "b3-3",
            _type: "block",
            children: [{ _key: "s3-3", _type: "span", text: "• पासपोर्ट का प्राथमिक उद्देश्य विदेश यात्रा को सुगम बनाना है, जबकि नागरिकता मतदान के अधिकार, संवैधानिक अधिकार एवं सरकारी सेवाओं के लाभ का आधार है।" }],
            style: "normal",
          },
          {
            _key: "b3-4",
            _type: "block",
            children: [{ _key: "s3-4", _type: "span", text: "• पासपोर्ट नागरिकता का अंतिम प्रमाण नहीं है, जबकि नागरिकता को विभिन्न सहायक कानूनी दस्तावेजों के आधार पर सिद्ध किया जाता है।" }],
            style: "normal",
          },
        ],
        bodyEn: [
          {
            _key: "b3-5",
            _type: "block",
            children: [{ _key: "s3-5", _type: "span", text: "• Passport is a travel document, whereas Citizenship is a legal status." }],
            style: "normal",
          },
          {
            _key: "b3-6",
            _type: "block",
            children: [{ _key: "s3-6", _type: "span", text: "• A passport is issued under the Passport Act, 1967, while citizenship is regulated under the Citizenship Act, 1955." }],
            style: "normal",
          },
          {
            _key: "b3-7",
            _type: "block",
            children: [{ _key: "s3-7", _type: "span", text: "• The primary purpose of a passport is to facilitate foreign travel, whereas citizenship is the prerequisite for voting rights, holding constitutional offices, and receiving government services." }],
            style: "normal",
          },
          {
            _key: "b3-8",
            _type: "block",
            children: [{ _key: "s3-8", _type: "span", text: "• A passport is not conclusive proof of citizenship, whereas citizenship is established through various supporting legal documents." }],
            style: "normal",
          },
        ],
      },
      {
        _key: "sec-proof",
        kind: "importance",
        title: "भारत में नागरिकता का कोई एकल प्रमाण-पत्र नहीं",
        titleEn: "No Single Universal Citizenship Certificate in India",
        body: [
          {
            _key: "b4-1",
            _type: "block",
            children: [
              {
                _key: "s4-1",
                _type: "span",
                text: "भारत में ऐसा कोई एकल नागरिकता प्रमाण-पत्र (Universal Citizenship Certificate) नहीं है जो प्रत्येक नागरिक के पास हो। नागरिकता का निर्धारण विभिन्न कानूनी अभिलेखों और दस्तावेजों जैसे— जन्म प्रमाण पत्र (Birth Certificate), माता-पिता की नागरिकता के साक्ष्य, प्राकृतिककरण प्रमाण पत्र (Naturalisation Certificate) आदि के आधार पर किया जाता है।",
              },
            ],
            style: "normal",
          },
        ],
        bodyEn: [
          {
            _key: "b4-2",
            _type: "block",
            children: [
              {
                _key: "s4-2",
                _type: "span",
                text: "There is no single 'Universal Citizenship Certificate' in India that every citizen possesses. Citizenship status is determined using various legal records and documents, such as birth certificates, proof of parents' citizenship, registration certificates, and naturalization documents.",
              },
            ],
            style: "normal",
          },
        ],
      },
      {
        _key: "sec-acquisition",
        kind: "prelimsPoint",
        title: "भारतीय नागरिकता प्राप्त करने के 4 प्रमुख तरीके (नागरिकता अधिनियम, 1955)",
        titleEn: "4 Key Ways to Acquire Indian Citizenship (Citizenship Act, 1955)",
        body: [
          {
            _key: "b5-1",
            _type: "block",
            children: [{ _key: "s5-1", _type: "span", text: "1. जन्म से (By Birth):" }],
            style: "h4",
          },
          {
            _key: "b5-2",
            _type: "block",
            children: [{ _key: "s5-2", _type: "span", text: "• 26 जनवरी 1950 से 1 जुलाई 1987 के बीच: भारत में जन्मा प्रत्येक व्यक्ति स्वतः नागरिक माना जाता है।" }],
            style: "normal",
          },
          {
            _key: "b5-3",
            _type: "block",
            children: [{ _key: "s5-3", _type: "span", text: "• 1 जुलाई 1987 से 3 दिसंबर 2004 के बीच: जन्म के समय माता या पिता में से कोई एक भारतीय नागरिक होना चाहिए।" }],
            style: "normal",
          },
          {
            _key: "b5-4",
            _type: "block",
            children: [{ _key: "s5-4", _type: "span", text: "• 3 दिसंबर 2004 के बाद: माता-पिता में से एक भारतीय नागरिक हो और दूसरा अवैध प्रवासी (Illegal Migrant) न हो।" }],
            style: "normal",
          },
          {
            _key: "b5-5",
            _type: "block",
            children: [{ _key: "s5-5", _type: "span", text: "2. वंश द्वारा (By Descent):" }],
            style: "h4",
          },
          {
            _key: "b5-6",
            _type: "block",
            children: [{ _key: "s5-6", _type: "span", text: "• भारत से बाहर जन्मे व्यक्ति को वंश के आधार पर नागरिकता मिल सकती है यदि उसके जन्म के समय उसके माता-पिता में से कोई एक भारतीय नागरिक हो और निर्धारित समयावधि में भारतीय दूतावास में पंजीकरण कराया गया हो।" }],
            style: "normal",
          },
          {
            _key: "b5-7",
            _type: "block",
            children: [{ _key: "s5-7", _type: "span", text: "3. पंजीकरण द्वारा (By Registration):" }],
            style: "h4",
          },
          {
            _key: "b5-8",
            _type: "block",
            children: [{ _key: "s5-8", _type: "span", text: "• भारतीय मूल के व्यक्ति (PIO), भारतीय नागरिक के जीवनसाथी (Spouse), और नाबालिग बच्चों को निर्धारित शर्तों और निवास अवधि के बाद पंजीकरण द्वारा नागरिकता मिल सकती है।" }],
            style: "normal",
          },
          {
            _key: "b5-9",
            _type: "block",
            children: [{ _key: "s5-9", _type: "span", text: "4. प्राकृतिककरण द्वारा (By Naturalisation):" }],
            style: "h4",
          },
          {
            _key: "b5-10",
            _type: "block",
            children: [{ _key: "s5-10", _type: "span", text: "• कोई विदेशी नागरिक निर्धारित पात्रता मानदंडों को पूरा करने और सामान्यतः 12 वर्ष भारत में निवास करने के बाद प्राकृतिककरण के माध्यम से नागरिकता प्राप्त कर सकता है।" }],
            style: "normal",
          },
        ],
        bodyEn: [
          {
            _key: "b5-11",
            _type: "block",
            children: [{ _key: "s5-11", _type: "span", text: "1. By Birth:" }],
            style: "h4",
          },
          {
            _key: "b5-12",
            _type: "block",
            children: [{ _key: "s5-12", _type: "span", text: "• Jan 26, 1950 to July 1, 1987: Anyone born in India is a citizen by birth regardless of parents' nationality." }],
            style: "normal",
          },
          {
            _key: "b5-13",
            _type: "block",
            children: [{ _key: "s5-13", _type: "span", text: "• July 1, 1987 to Dec 3, 2004: At least one parent must be an Indian citizen at the time of birth." }],
            style: "normal",
          },
          {
            _key: "b5-14",
            _type: "block",
            children: [{ _key: "s5-14", _type: "span", text: "• After Dec 3, 2004: One parent must be an Indian citizen and the other must not be an illegal migrant." }],
            style: "normal",
          },
          {
            _key: "b5-15",
            _type: "block",
            children: [{ _key: "s5-15", _type: "span", text: "2. By Descent:" }],
            style: "h4",
          },
          {
            _key: "b5-16",
            _type: "block",
            children: [{ _key: "s5-16", _type: "span", text: "• A person born outside India can become an Indian citizen if either parent was a citizen of India at the time of birth, subject to timely registration at the Indian consulate." }],
            style: "normal",
          },
          {
            _key: "b5-17",
            _type: "block",
            children: [{ _key: "s5-17", _type: "span", text: "3. By Registration:" }],
            style: "h4",
          },
          {
            _key: "b5-18",
            _type: "block",
            children: [{ _key: "s5-18", _type: "span", text: "• Persons of Indian Origin (PIO), spouses of Indian citizens, and minor children can be registered as citizens upon meeting specific residency criteria." }],
            style: "normal",
          },
          {
            _key: "b5-19",
            _type: "block",
            children: [{ _key: "s5-19", _type: "span", text: "4. By Naturalisation:" }],
            style: "h4",
          },
          {
            _key: "b5-20",
            _type: "block",
            children: [{ _key: "s5-20", _type: "span", text: "• A foreigner can apply for citizenship after satisfying certain qualifications, including residing in India for at least 12 years (11 years of cumulative stay + 12 months immediately preceding the application)." }],
            style: "normal",
          },
        ],
      },
      {
        _key: "sec-reforms",
        kind: "factsAtAGlance",
        title: "नागरिकता कानून में प्रमुख संशोधन और न्यायिक निर्णय",
        titleEn: "Key Amendments and Judicial Decisions",
        body: [
          {
            _key: "b6-1",
            _type: "block",
            children: [{ _key: "s6-1", _type: "span", text: "• 1986 संशोधन: इसके तहत केवल भारत में जन्म लेने से मिलने वाली स्वतः नागरिकता (Jus Soli) को समाप्त कर माता या पिता की नागरिकता की अनिवार्यता जोड़ी गई।" }],
            style: "normal",
          },
          {
            _key: "b6-2",
            _type: "block",
            children: [{ _key: "s6-2", _type: "span", text: "• 2003 संशोधन: अवैध प्रवासियों के बच्चों के लिए नागरिकता के मार्ग को बंद किया गया तथा नियमों को अधिक कठोर बनाया गया।" }],
            style: "normal",
          },
          {
            _key: "b6-3",
            _type: "block",
            children: [{ _key: "s6-3", _type: "span", text: "• OCI एवं PIO योजना (2005, 2015): विदेशी नागरिकों के लिए ओसीआई (OCI) व्यवस्था को मजबूत किया गया तथा 2015 में पीआईओ (PIO) और ओसीआई का आपस में विलय कर दिया गया।" }],
            style: "normal",
          },
          {
            _key: "b6-4",
            _type: "block",
            children: [{ _key: "s6-4", _type: "span", text: "• नागरिकता संशोधन अधिनियम, 2019 (CAA): पाकिस्तान, बांग्लादेश और अफगानिस्तान से 31 दिसंबर 2014 से पहले आए छह धार्मिक अल्पसंख्यक समुदायों (हिंदू, सिख, बौद्ध, जैन, पारसी और ईसाई) के लिए नागरिकता प्राप्त करने की विशेष व्यवस्था की गई।" }],
            style: "normal",
          },
          {
            _key: "b6-5",
            _type: "block",
            children: [{ _key: "s6-5", _type: "span", text: "• मेनका गांधी बनाम भारत संघ (1978): इस ऐतिहासिक मामले में सुप्रीम कोर्ट ने व्यवस्था दी थी कि पासपोर्ट इस धारणा पर जारी किया जाता है कि धारक एक भारतीय नागरिक है, लेकिन यह नागरिकता का अंतिम एवं अकाट्य (Conclusive) प्रमाण नहीं माना जा सकता है।" }],
            style: "normal",
          },
        ],
        bodyEn: [
          {
            _key: "b6-6",
            _type: "block",
            children: [{ _key: "s6-6", _type: "span", text: "• 1986 Amendment: Ended the absolute right of citizenship by birth (jus soli) and introduced the requirement of parent's citizenship." }],
            style: "normal",
          },
          {
            _key: "b6-7",
            _type: "block",
            children: [{ _key: "s6-7", _type: "span", text: "• 2003 Amendment: Disallowed children of illegal migrants from acquiring citizenship by birth and introduced stricter enforcement." }],
            style: "normal",
          },
          {
            _key: "b6-8",
            _type: "block",
            children: [{ _key: "s6-8", _type: "span", text: "• OCI and PIO Schemes (2005, 2015): Introduced the Overseas Citizen of India (OCI) scheme. Later in 2015, the PIO (Person of Indian Origin) card scheme was merged with the OCI card scheme." }],
            style: "normal",
          },
          {
            _key: "b6-9",
            _type: "block",
            children: [{ _key: "s6-9", _type: "span", text: "• Citizenship Amendment Act, 2019 (CAA): Provided a fast-track pathway to citizenship for persecuted religious minorities (Hindus, Sikhs, Buddhists, Jains, Parsis, and Christians) who arrived from Pakistan, Bangladesh, and Afghanistan on or before December 31, 2014." }],
            style: "normal",
          },
          {
            _key: "b6-10",
            _type: "block",
            children: [{ _key: "s6-10", _type: "span", text: "• Maneka Gandhi vs Union of India (1978): The Supreme Court observed that although a passport is issued based on the understanding that the holder is an Indian citizen, it cannot be considered absolute or conclusive proof of citizenship." }],
            style: "normal",
          },
        ],
      },
      {
        _key: "sec-important-facts",
        kind: "timeline",
        title: "महत्वपूर्ण परीक्षा तथ्य",
        titleEn: "Important Exam Facts",
        body: [
          {
            _key: "b7-1",
            _type: "block",
            children: [{ _key: "s7-1", _type: "span", text: "• एकल नागरिकता: भारतीय संविधान के तहत दोहरी नागरिकता (Dual Citizenship) की अनुमति नहीं है। केवल एकल नागरिकता (Single Citizenship) का प्रावधान है।" }],
            style: "normal",
          },
          {
            _key: "b7-2",
            _type: "block",
            children: [{ _key: "s7-2", _type: "span", text: "• नोडल एजेंसी: भारतीय पासपोर्ट विदेश मंत्रालय (Ministry of External Affairs - MEA) द्वारा जारी किया जाता है।" }],
            style: "normal",
          },
          {
            _key: "b7-3",
            _type: "block",
            children: [{ _key: "s7-3", _type: "span", text: "• पासपोर्ट का मूल उद्देश्य: अंतरराष्ट्रीय यात्रा को वैध बनाना और विदेशों में राजनयिक संरक्षण प्रदान करना है, न कि नागरिकता को सिद्ध करना।" }],
            style: "normal",
          },
          {
            _key: "b7-4",
            _type: "block",
            children: [{ _key: "s7-4", _type: "span", text: "• संविधान में नागरिकता: संविधान के भाग II में अनुच्छेद 5 से 11 तक नागरिकता का वर्णन है।" }],
            style: "normal",
          },
          {
            _key: "b7-5",
            _type: "block",
            children: [{ _key: "s7-5", _type: "span", text: "• अनुच्छेद 11: यह अनुच्छेद संसद को नागरिकता के अधिकार को विधि द्वारा विनियमित करने और नए नियम बनाने की पूर्ण शक्ति प्रदान करता है।" }],
            style: "normal",
          },
        ],
        bodyEn: [
          {
            _key: "b7-6",
            _type: "block",
            children: [{ _key: "s7-6", _type: "span", text: "• Single Citizenship: The Indian Constitution does not allow dual citizenship. It only provides for single citizenship." }],
            style: "normal",
          },
          {
            _key: "b7-7",
            _type: "block",
            children: [{ _key: "s7-7", _type: "span", text: "• Issuing Authority: Indian passports are issued by the Ministry of External Affairs (MEA), Government of India." }],
            style: "normal",
          },
          {
            _key: "b7-8",
            _type: "block",
            children: [{ _key: "s7-8", _type: "span", text: "• Core Purpose of Passport: To regulate and validate international travel and ensure consular support abroad, rather than establishing domestic citizenship." }],
            style: "normal",
          },
          {
            _key: "b7-9",
            _type: "block",
            children: [{ _key: "s7-9", _type: "span", text: "• Constitutional Position: Part II of the Constitution (Articles 5 to 11) deals with citizenship." }],
            style: "normal",
          },
          {
            _key: "b7-10",
            _type: "block",
            children: [{ _key: "s7-10", _type: "span", text: "• Article 11: Grants Parliament the exclusive power to regulate the right of citizenship and make legislation on it." }],
            style: "normal",
          },
        ],
      },
    ],
    mcqs: [
      {
        question: "निम्नलिखित में से कौन-सा कथन सही है?",
        questionEn: "Which of the following statements is correct?",
        options: [
          "भारतीय पासपोर्ट नागरिकता का अंतिम प्रमाण है।",
          "भारत में प्रत्येक नागरिक को नागरिकता प्रमाण-पत्र जारी किया जाता है।",
          "भारतीय पासपोर्ट मुख्यतः एक यात्रा दस्तावेज है, नागरिकता का अंतिम प्रमाण नहीं।",
          "भारत में दोहरी नागरिकता की अनुमति है।"
        ],
        optionsEn: [
          "The Indian passport is conclusive proof of citizenship.",
          "A citizenship certificate is issued to every citizen in India.",
          "The Indian passport is primarily a travel document, not conclusive proof of citizenship.",
          "Dual citizenship is allowed in India."
        ],
        correctIndex: 2,
        explanation: "विदेश मंत्रालय (MEA) और सुप्रीम कोर्ट (मेनका गांधी बनाम भारत संघ, 1978) ने स्पष्ट किया है कि पासपोर्ट धारक की राष्ट्रीयता का संकेत देने वाला एक यात्रा दस्तावेज है, लेकिन यह नागरिकता का अंतिम और अकाट्य प्रमाण नहीं है। नागरिकता का निर्धारण नागरिकता अधिनियम, 1955 के तहत जन्म प्रमाण पत्र व अन्य दस्तावेजों के आधार पर होता है।",
        explanationEn: "The Ministry of External Affairs (MEA) and the Supreme Court (Maneka Gandhi vs Union of India, 1978) have clarified that a passport is a travel document indicating nationality, but is not conclusive proof of citizenship. Citizenship is established through birth certificates and other documents under the Citizenship Act, 1955."
      }
    ],
    faqs: [
      {
        question: "क्या भारत दोहरी नागरिकता की अनुमति देता है?",
        questionEn: "Does India allow dual citizenship?",
        answer: "नहीं, भारत में दोहरी नागरिकता (Dual Citizenship) की अनुमति नहीं है। यदि कोई भारतीय नागरिक स्वेच्छा से किसी अन्य देश की नागरिकता प्राप्त करता है, तो उसकी भारतीय नागरिकता स्वतः समाप्त हो जाती है। हालांकि, भारत सरकार OCI (Overseas Citizen of India) योजना प्रदान करती है, जो नागरिकता नहीं बल्कि एक दीर्घकालिक वीजा दर्जा है।",
        answerEn: "No, India does not allow dual citizenship. Under Article 9 of the Constitution, if an Indian citizen voluntarily acquires the citizenship of another country, their Indian citizenship ceases. The Government offers OCI (Overseas Citizen of India) status, which is not dual citizenship but a lifelong visa with certain privileges."
      },
      {
        question: "नागरिकता से संबंधित संवैधानिक प्रावधान किस भाग में हैं?",
        questionEn: "Which part of the constitution contains provisions related to citizenship?",
        answer: "भारतीय संविधान के भाग II में अनुच्छेद 5 से 11 तक नागरिकता से संबंधित प्रावधान दिए गए हैं। अनुच्छेद 11 संसद को नागरिकता के अर्जन, समाप्ति और नागरिकता से संबंधित अन्य सभी मामलों के संबंध में कानून बनाने की शक्ति प्रदान करता है।",
        answerEn: "Part II of the Indian Constitution, from Article 5 to 11, contains provisions related to citizenship. Article 11 gives Parliament the power to regulate the right of citizenship by law, covering acquisition, termination, and all other matters relating to it."
      }
    ],
    sources: [
      {
        label: "Ministry of External Affairs (MEA)",
        url: "https://www.mea.gov.in"
      },
      {
        label: "Supreme Court of India - Maneka Gandhi v. Union of India (1978)",
        url: "https://main.sci.gov.in"
      }
    ],
  };

  try {
    await client.createOrReplace(article);
    console.log("✨ Successfully uploaded Passport & Citizenship Article to Sanity!");
  } catch (err) {
    console.error("❌ Failed to create/replace document in Sanity:", err);
  }
}

main().catch((err) => {
  console.error("❌ Error running script:", err);
  process.exit(1);
});
