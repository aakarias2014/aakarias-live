import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: '2024-10-01',
  useCdn: false,
});

async function run() {
  const docId = 'gk-mppsc-mains-geography-paper-1-unit-1';
  const slug = 'mppsc-mains-geography-paper-1-part-b-unit-1-notes';

  const title = 'MPPSC Mains Geography Paper 1 Part B Unit 1 Notes: भारत का भौतिक भूगोल (Physical Geography of India)';
  const titleEn = 'MPPSC Mains Geography Paper 1 Part B Unit 1 Notes: Physical Geography of India';

  const excerpt = 'MPPSC Mains Paper 1 Part B Unit 1 (भारत का भौतिक भूगोल) के लिए सम्पूर्ण स्टडी नोट्स: भू-आकृतिक प्रदेश, पर्वत, पठार, मैदान, नदियाँ, जल-विभाजक (Water Divides), जलवायु, भारतीय मानसून, चक्रवात, एल-नीनो व मॉडल उत्तर।';
  const excerptEn = 'Complete study notes for MPPSC Mains Paper 1 Part B Unit 1 (Physical Geography of India): Physiographic divisions, mountains, plateaus, plains, rivers, water divides, climate, Indian monsoon, cyclones, El-Nino & model answers.';

  const keywords = [
    'mppsc mains geography paper 1 unit 1 notes',
    'mppsc paper 1 part b unit 1 in hindi',
    'bharat ka bhautik bhugol mppsc notes',
    'mppsc geography mains study material',
    'mppsc paper 1 section b unit 1 notes',
    'water divide in india mppsc',
    'indian monsoon mechanism mppsc notes',
    'physiographic divisions of india mppsc'
  ];

  const body = [
    {
      _type: 'block',
      style: 'h3',
      children: [{ _type: 'span', text: '1. पाठ्यक्रम अवलोकन: MPPSC मुख्य परीक्षा Paper 1 Part B Unit 1' }],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'MPPSC राज्य सेवा मुख्य परीक्षा के द्वितीय प्रश्नपत्र (Paper 1) के खंड (ब) की इकाई-1 **भारत का भौतिक भूगोल (Physical Geography of India)** कुल **30 अंकों** के लिए निर्धारित है। इसमें 3 अंक (अति लघुत्तरीय), 5 अंक (लघुत्तरीय) और 11 अंक (दीर्घ उत्तरीय) के प्रश्न पूछे जाते हैं।',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: '• **मुख्य पाठ्यक्रम विषय**:\n  1. **प्रमुख भू-आकृतिक लक्षण**: पर्वत, पठार, मैदान, नदियाँ, जल-विभाजक (Water Divides), झीलें एवं हिमनद।\n  2. **भारत के भू-आकृतिक प्रदेश**: उत्तर का पर्वतीय प्रदेश (हिमालय), विशाल मैदानी प्रदेश, प्रायद्वीपीय पठार, तटीय मैदान एवं द्वीप समूह।\n  3. **जलवायु एवं मानसून प्रणाली**: भारतीय मानसून की उत्पत्ति (Origin of Indian Monsoon), जेट स्ट्रीम (Jet Stream), चक्रवात (उष्णकटिबंधीय व शीतोष्ण), एल-नीनो (El Nino), ला-नीना (La Nina) एवं IOD का प्रभाव।',
        },
      ],
    },
    {
      _type: 'block',
      style: 'h3',
      children: [{ _type: 'span', text: '2. भारत के 5 प्रमुख भू-आकृतिक प्रदेश (Physiographic Divisions of India)' }],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: '• **(1) उत्तर का पर्वतीय प्रदेश (Himalayan Region)**: हिमाद्रि (महान हिमालय), हिमाचल (मध्य हिमालय) एवं शिवालिक (बाय हिमालय)। यह भारत की उत्तरी सीमा का प्रहरी है तथा पूर्वगामी नदियों (Indus, Satluj, Brahmaputra) का उद्गम स्थल है।\n• **(2) उत्तर का विशाल मैदान (Northern Plains)**: सिंधु, गंगा एवं ब्रह्मपुत्र नदियों द्वारा निर्मित जलोढ़ मैदान। इसे उत्तर से दक्षिण 4 भागों में बांटा जाता है — भाबर (कंकड़-पत्थर), तराई (दलदली क्षेत्र), बांगर (पुराना जलोढ़) एवं खादर (नवीन उपजाऊ जलोढ़)।\n• **(3) प्रायद्वीपीय पठार (Peninsular Plateau)**: भारत का सबसे प्राचीन एवं स्थिर भू-खंड (गोंडवाना लैंड का भाग)। इसमें मालवा पठार, विंध्याचल, सतपुड़ा, दक्कन का पठार एवं छोटानागपुर पठार शामिल हैं।\n• **(4) तटीय मैदान (Coastal Plains)**: पश्चिमी तटीय मैदान (कच्छ, कोकण, कन्नड़, मालाबार) तथा पूर्वी तटीय मैदान (उत्कल, काकीनाडा, कोरोमंडल)।\n• **(5) द्वीप समूह (Islands)**: बंगाल की खाड़ी में अंडमान व निकोबार (निमज्जित पर्वतीय द्वीप) एवं अरब सागर में लक्षद्वीप (प्रवाल निर्मित/Coral Islands)।',
        },
      ],
    },
    {
      _type: 'block',
      style: 'h3',
      children: [{ _type: 'span', text: '3. भारत का अपवाह तंत्र एवं महान जल-विभाजक (Water Divide in India)' }],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: '• **जल-विभाजक (Water Divide)**: वह उच्च पर्वतीय या पठारी शीर्ष रेखा जो दो पड़ोसी अपवाह बेसिनों को अलग करती है।\n• **भारत के 4 मुख्य जल-विभाजक**:\n  1. **हिमालयन जल-विभाजक**: विश्व की सर्वाधिक ऊँची विभाजक रेखा (~6,000 मी ऊँचाई, 2,600 किमी लंबाई)।\n  2. **अरावली जल-विभाजक**: सिंधु अपवाह (लूनी) व गंगा अपवाह (चम्बल) को अलग करता है; उत्तरी भाग दिल्ली विभाजक (Delhi Ridge) कहलाता है।\n  3. **सतपुड़ा-मैकाल जल-विभाजक**: उत्तर में नर्मदा-सोन (गंगा तंत्र) और दक्षिण में ताप्ती-गोदावरी को पृथक करता है।\n  4. **पश्चिमी घाट जल-विभाजक**: अरब सागर (पश्चिम प्रवाह) एवं बंगाल की खाड़ी (पूर्व प्रवाह) अपवाह तंत्रों के मध्य महान विभाजक है। इसके 4 प्रमुख दर्रे — थाल घाट, भोर घाट, पाल घाट एवं सेनकोट्टा पास हैं।',
        },
      ],
    },
    {
      _type: 'block',
      style: 'h3',
      children: [{ _type: 'span', text: '4. भारतीय मानसून, चक्रवात एवं एल-नीनो व ला-नीना' }],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: '• **मानसून की उत्पत्ति (Monsoon Origin)**: तापीय सिद्धांत (Halley), विषुवतीय पछुआ पवन सिद्धांत (Flohn), एवं आधुनिक जेट स्ट्रीम सिद्धांत (East African Jet & Tropical Easterly Jet)।\n• **एल-नीनो (El Nino)**: प्रशांत महासागर के पेरू तट के पास गर्म समुद्री जलधारा का उत्पन्न होना, जो भारतीय मानसून को कमजोर (सूखा) बनाता है।\n• **ला-नीना (La Nina)**: पेरू तट पर सामान्य से अधिक ठंडे जल का जमाव, जिससे भारतीय मानसून अत्यधिक मजबूत (अच्छी वर्षा) होता है।\n• **चक्रवात (Cyclones)**: बंगाल की खाड़ी एवं अरब सागर में उष्णकटिबंधीय चक्रवात (Tropical Cyclones) उठते हैं (उदा. मोचा, चक्रवात बिपरजॉय, मिचौंग)।',
        },
      ],
    },
    {
      _type: 'block',
      style: 'h3',
      children: [{ _type: 'span', text: '5. MPPSC Mains मॉडल प्रश्नोत्तर (3, 5 एवं 11 अंक)' }],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: '• **प्रश्न 1 (3 अंक): भाबर और खादर में अंतर स्पष्ट कीजिए।**\n  *उत्तर*: भाबर शिवालिक के गिरिपद में कंकड़-पत्थर युक्त पारगम्य क्षेत्र है जहाँ नदियाँ अदृश्य हो जाती हैं। खादर नदियों के बाढ़ क्षेत्र का नवीन उपजाऊ जलोढ़ मैदान है जो कृषि हेतु सर्वोत्तम होता है।',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: '• **प्रश्न 2 (5 अंक): एल-नीनो का भारतीय मानसून पर क्या प्रभाव पड़ता है?**\n  *उत्तर*: एल-नीनो के दौरान पेरू तट पर गर्म जल के कारण तापीय दाब में परिवर्तन होता है। इससे प्रशांत महासागर में वॉकर चक्र कमजोर पड़ता है, जिससे भारत में दक्षिण-पश्चिम मानसून की वर्षा में कमी आती है और सूखे की स्थिति उत्पन्न होती है।',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: '• **प्रश्न 3 (11 अंक): भारत के भौतिक प्रदेशों का वर्गीकरण करते हुए उत्तर के विशाल मैदान का विस्तृत भौगोलिक वर्णन कीजिए।**\n  *उत्तर संरचना*: प्रस्तावना ➔ भारत के 5 भू-आकृतिक प्रदेश ➔ विशाल मैदान का निर्माण (नदियों द्वारा निक्षेपण) ➔ 4 उप-भाग (भाबर, तराई, बांगर, खादर) ➔ क्षेत्रीय विभाजन (पंजाब, राजस्थान, गंगा, ब्रह्मपुत्र मैदान) ➔ आर्थिक व कृषि महत्त्व ➔ निष्कर्ष।',
        },
      ],
    },
  ];

  const bodyEn = [
    {
      _type: 'block',
      style: 'h3',
      children: [{ _type: 'span', text: '1. Syllabus Overview: MPPSC Mains Paper 1 Part B Unit 1' }],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'Unit 1 of MPPSC Mains Paper 1 Part B covers **Physical Geography of India** carrying **30 marks**. It includes 3-mark short answers, 5-mark medium answers, and 11-mark long answers.',
        },
      ],
    },
    {
      _type: 'block',
      style: 'h3',
      children: [{ _type: 'span', text: '2. Five Physiographic Divisions of India' }],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: '• **Northern Mountains (Himalayas)**: Himadri, Himachal, and Shiwalik ranges.\n• **Northern Great Plains**: Bhabar, Terai, Bhangar, and Khadar alluvial deposits.\n• **Peninsular Plateau**: Ancient Gondwanaland mass including Malwa, Vindhyan, Satpura, and Deccan plateaus.\n• **Coastal Plains**: Western (Konkan, Malabar) and Eastern (Coromandel, Utkal) coastal plains.\n• **Islands**: Andaman & Nicobar (Volcanic/Tectonic) and Lakshadweep (Coral reefs).',
        },
      ],
    },
    {
      _type: 'block',
      style: 'h3',
      children: [{ _type: 'span', text: '3. Water Divides & Drainage Systems' }],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'The Great Water Divide of India separates Arabian Sea drainage from Bay of Bengal drainage. Four key divides: Himalayan, Aravalli (Delhi Ridge), Satpura-Maikal, and Western Ghats (Thal Ghat, Bhor Ghat, Pal Ghat, Shencottah).',
        },
      ],
    },
  ];

  const faqs = [
    {
      question: 'MPPSC Mains Paper 1 Part B Unit 1 में कौन-कौन से विषय शामिल हैं?',
      questionEn: 'What topics are included in MPPSC Mains Paper 1 Part B Unit 1?',
      answer: 'इसमें भारत के प्रमुख भू-आकृतिक प्रदेश (हिमालय, मैदान, पठार, तटीय मैदान, द्वीप समूह), पर्वत, नदियाँ, जल-विभाजक, जलवायु, मानसून उत्पत्ति, चक्रवात, एल-नीनो व ला-नीना शामिल हैं।',
      answerEn: 'It includes Physiographic Divisions of India (Himalayas, Plains, Plateaus, Coastal Plains, Islands), Mountains, Rivers, Water Divides, Climate, Monsoon Mechanism, Cyclones, El-Nino, and La-Nina.'
    },
    {
      question: 'भाबर और तराई में मुख्य अंतर क्या है?',
      questionEn: 'What is the main difference between Bhabar and Terai?',
      answer: 'भाबर शिवालिक के आधार पर पत्थरों/कंकड़ का क्षेत्र है जहाँ नदियाँ भूमिगत हो जाती हैं। तराई भाबर के दक्षिण में दलदली व वनाच्छादित क्षेत्र है जहाँ नदियाँ पुनः धरातल पर प्रकट होती हैं।',
      answerEn: 'Bhabar is a pebbly region at the foothills of Shiwaliks where streams disappear underground. Terai is a marshy, forested region south of Bhabar where streams reappear on the surface.'
    }
  ];

  const mcqs = [
    {
      question: 'भारत का सबसे प्राचीन एवं स्थिर भू-आकृतिक प्रदेश कौन सा है?',
      questionEn: 'Which is the most ancient and stable physiographic division of India?',
      options: ['प्रायद्वीपीय पठार (Peninsular Plateau)', 'उत्तर का विशाल मैदान', 'हिमालय पर्वतीय प्रदेश', 'तटीय मैदान'],
      optionsEn: ['Peninsular Plateau', 'Northern Great Plains', 'Himalayan Mountain Region', 'Coastal Plains'],
      correctIndex: 0,
      explanation: 'प्रायद्वीपीय पठार प्राचीन गोंडवाना लैंड का भाग है जो भारत का सबसे प्राचीन एवं भूगर्भीय रूप से सबसे स्थिर भू-आकृतिक प्रदेश है।',
      explanationEn: 'The Peninsular Plateau is part of the ancient Gondwanaland and is the oldest and geologically most stable landmass of India.'
    },
    {
      question: 'पेरू तट के पास गर्म जलधारा के उद्भव को क्या कहा जाता है जो भारतीय मानसून को कमजोर करता है?',
      questionEn: 'What is the warming of ocean waters off the Peru coast called that weakens the Indian monsoon?',
      options: ['एल-नीनो (El Nino)', 'ला-नीना', 'जेट स्ट्रीम', 'आईटीसीजेड'],
      optionsEn: ['El Nino', 'La Nina', 'Jet Stream', 'ITCZ'],
      correctIndex: 0,
      explanation: 'एल-नीनो प्रशांत महासागर के पेरू तट पर विकसित होने वाली गर्म जलधारा है जो सामान्य वायुदाब तंत्र को बदलकर भारतीय मानसून में वर्षा की कमी लाती है।',
      explanationEn: 'El Nino is a warm ocean current off the coast of Peru that alters atmospheric pressure and reduces rainfall during the Indian monsoon.'
    }
  ];

  const doc = {
    _id: docId,
    _type: 'staticGk',
    slug: { _type: 'slug', current: slug },
    title,
    titleEn,
    seoTitle: 'MPPSC Mains Paper 1 Part B Unit 1 Notes: भारत का भौतिक भूगोल',
    seoDescription: excerpt,
    excerpt,
    excerptEn,
    keywords,
    publishedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    readingTime: 15,
    author: {
      _type: 'reference',
      _ref: 'author-aakar',
    },
    category: {
      _type: 'reference',
      _ref: 'cat-geography',
    },
    tags: [
      { _type: 'reference', _ref: 'tag-mppsc' },
      { _type: 'reference', _ref: 'tag-upsc' },
    ],
    body,
    bodyEn,
    faqs,
    mcqs,
  };

  console.log('Publishing geography unit 1 notes to Sanity CMS:', docId);
  await client.createOrReplace(doc);
  console.log('Successfully created and published geography unit 1 notes in Sanity:', docId);
}

run().catch((err) => {
  console.error('Error uploading geography unit 1 notes:', err);
  process.exit(1);
});
