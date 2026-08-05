import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: '2024-10-01',
  useCdn: false,
});

const img1Src = '/Users/aakariastech/.gemini/antigravity-ide/brain/4baba4cd-82b4-4b62-8239-15248b7a4282/water_divide_india_map_mppsc_1785920011641.png';
const img2Src = '/Users/aakariastech/.gemini/antigravity-ide/brain/4baba4cd-82b4-4b62-8239-15248b7a4282/western_ghats_water_divide_passes_mppsc_1785920025784.png';

const img1Dest = path.resolve(process.cwd(), 'public/images/blog/water_divide_india_map_mppsc.png');
const img2Dest = path.resolve(process.cwd(), 'public/images/blog/western_ghats_water_divide_passes_mppsc.png');

async function uploadImage(filePath: string, alt: string) {
  const fileBuffer = fs.readFileSync(filePath);
  const asset = await client.assets.upload('image', fileBuffer, {
    filename: path.basename(filePath),
  });
  return {
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref: asset._id,
    },
    url: asset.url,
    alt: alt,
  };
}

async function run() {
  fs.copyFileSync(img1Src, img1Dest);
  fs.copyFileSync(img2Src, img2Dest);
  console.log('Copied images to public/images/blog/');

  console.log('Uploading images to Sanity...');
  const bannerImageAsset = await uploadImage(img1Dest, 'भारत के प्रमुख जल-विभाजक मानचित्र - MPPSC Geography Mains');
  const passesImageAsset = await uploadImage(img2Dest, 'पश्चिमी घाट पर्वतीय जल-विभाजक व दर्रे - MPPSC Geography Notes');

  const docId = 'gk-water-divides-in-india';
  const slug = 'water-divides-in-india-mppsc-notes';

  const title = 'मध्य प्रदेश व भारत के प्रमुख जल-विभाजक (Water Divide in India): MPPSC Mains Geography Paper 1 Notes';
  const titleEn = 'Major Water Divides of India & MP (Water Divide in India): MPPSC Mains Geography Paper 1 Notes';

  const excerpt = 'MPPSC Mains Paper 1 (भूगोल) के लिए भारत के चार प्रमुख जल-विभाजकों (हिमालयन, अरावली, सतपुड़ा-मैकाल व पश्चिमी घाट) का सम्पूर्ण विश्लेषणात्मक विवरण, अपवाह प्रदेश, मानचित्र, 3, 5 व 11 अंक के प्रश्न उत्तर एवं MCQs।';
  const excerptEn = 'Comprehensive analytical guide on Major Water Divides of India (Himalayan, Aravalli, Satpura-Maikal, and Western Ghats) for MPPSC Mains Paper 1 Geography, including maps, model answers (3, 5, 11 marks), and MCQs.';

  const keywords = [
    'water divide in india mppsc',
    'bharat ke pramukh jal vibhajak',
    'mppsc mains geography notes',
    'mppsc paper 1 geography notes',
    'जल विभाजक रेखा किसे कहते हैं',
    'himalayan water divide mppsc',
    'aravalli water divide mppsc',
    'satpura maikal water divide mppsc',
    'western ghats water divide mppsc',
    'madhya pradesh ke jal vibhajak',
    'great water divide of india in hindi'
  ];

  const body = [
    {
      _type: 'block',
      style: 'h3',
      children: [{ _type: 'span', text: '1. जल-विभाजक (Water Divide) क्या है? - अवधारणा एवं परिभाषा' }],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'जल-विभाजक (Water Divide) ऐसी उच्च पर्वतीय या पठारी शीर्ष रेखाएँ (Elevated Ridges) होती हैं, जो दो समीपवर्ती अपवाह द्रोणियों (Drainage Basins) अथवा जलप्रवाह प्रदेशों को एक-दूसरे से प्राकृतिक रूप से अलग करती हैं। जब वर्षा का जल इन उच्च भू-भागों पर गिरता है, तो जल-विभाजक रेखा वर्षा जल के प्रवाह को विपरीत दिशाओं में मोड़ देती है।',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: '• **मुख्य कार्य**: जल-विभाजक न केवल नदियों के बहाव की दिशा निर्धारित करते हैं, बल्कि प्राकृतिक भौगोलिक प्रदेशों में अपवाह प्रणाली को सीमांकित करने का कार्य भी करते हैं।',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: '• **भारत के 4 मुख्य अपवाह प्रदेश**: भारत के महान जल-विभाजक (Great Water Divide of India) के आधार पर देश को मुख्य रूप से 4 अपवाह प्रदेशों में बांटा जाता है:\n  1. **सिन्धु अपवाह प्रदेश (Indus Drainage Basin)**\n  2. **गंगा-ब्रह्मपुत्र अपवाह प्रदेश (Ganga-Brahmaputra Drainage Basin)**\n  3. **पूर्वी-प्रवाह का प्रायद्वीपीय अपवाह प्रदेश (East-Flowing Peninsular Basin)**\n  4. **पश्चिमी प्रवाह का प्रायद्वीपीय अपवाह प्रदेश (West-Flowing Peninsular Basin)**',
        },
      ],
    },
    bannerImageAsset,
    {
      _type: 'block',
      style: 'h3',
      children: [{ _type: 'span', text: '2. भारत की 4 प्रमुख जल-विभाजक रेखाएँ (Major Water Divide Ranges)' }],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'उपरोक्त चार अपवाह प्रदेशों का सीमांकन भारत की 4 मुख्य पर्वतीय जल-विभाजक रेखाओं द्वारा होता है:',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: '• **(1) हिमालयन जल-विभाजक (Himalayan Water Divide)**: यह मुख्यतः हिमानी (Glacial) जल-स्रोत पर आधारित जल-विभाजक है। हिमाद्रि (महान हिमालय) शृंखला विश्व की सर्वाधिक ऊँची जल-विभाजक के रूप में कार्य करती है। इससे निकलने वाली नदियों का जल प्रवाह उत्तर में चीन (तिब्बत) की ओर तथा दक्षिण में भारतीय मैदानी प्रदेश की ओर होता है। यह लगभग **2,600 किमी लंबी** है तथा इसकी औसत ऊँचाई **6,000 मीटर** है। सिन्धु, सतलज, काली, तीस्ता और ब्रह्मपुत्र जैसी **पूर्वगामी नदियाँ (Antecedent Rivers)** संकरी घाटियाँ (Gorges) बनाकर इस महान् जल-विभाजक की क्रमबद्धता को तोड़ती हैं।',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: '• **(2) अरावली जल-विभाजक (Aravalli Water Divide)**: अरावली पर्वत शृंखला भारत की दूसरी सबसे महत्त्वपूर्ण जल-विभाजक है। इसकी लम्बाई **1,100 किमी** तथा औसत ऊँचाई **750-1,000 मीटर** है। यह एक अवशिष्ट पर्वत शृंखला (Residual Mountain) है, जो **सिन्धु अपवाह प्रदेश** (जैसे लूनी व बनास नदियाँ) और **गंगा अपवाह प्रदेश** (चम्बल व उसकी सहायक नदियाँ) को एक-दूसरे से पृथक करती है। अरावली का उत्तरी भाग **दिल्ली विभाजक (Delhi Ridge)** के नाम से विख्यात है, जो अन्ततः शिवालिक शृंखला से मिल जाता है।',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: '• **(3) सतपुड़ा-महादेव-मैकाल जल-विभाजक (Satpura-Mahadeo-Maikal Water Divide)**: मध्य प्रदेश के लिए अत्यंत महत्त्वपूर्ण यह जल-विभाजक भारत के मध्यवर्ती भाग में स्थित है। इसकी कुल लम्बाई लगभग **1,920 किमी** है तथा ऊँचाई **275 मीटर से 1,100 मीटर** के मध्य है। यह जल-विभाजक **उत्तर में नर्मदा व सोन (गंगा तंत्र)** और **दक्षिण में ताप्ती व गोदावरी (प्रायद्वीपीय तंत्र)** अपवाह बेसिनों को विभाजित करता है। मैकाल श्रेणी की अमरकंटक पहाड़ी अरीय अपवाह (Radial Drainage) का उत्कृष्ट उदाहरण है, जहाँ से नर्मदा, सोन व जोहिला नदियाँ अलग-अलग दिशाओं में निकलती हैं।',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: '• **(4) पश्चिमी घाट पर्वतीय जल-विभाजक (Western Ghats Mountain Water Divide)**: पश्चिमी घाट (सह्याद्रि) श्रेणी लगभग **1,600 किमी लंबी** है, जो उत्तर से दक्षिण तक फैली हुई है। यह भारत के दो प्रमुख महासागरीय अपवाह तंत्रों — **अरब सागर अपवाह** (पश्चिम की ओर) एवं **बंगाल की खाड़ी अपवाह** (पूर्व की ओर) को पृथक करती है। यहाँ से निकलने वाली अधिकांश बड़ी नदियाँ (गोदावरी, कृष्णा, कावेरी) अनुवर्ती प्रकार (Consequent Drainage) के अपवाह प्रतिरूप का पालन करते हुए पूर्व की ओर बहकर बंगाल की खाड़ी में गिरती हैं, जबकि कुछ तीव्रगामी नदियाँ (जैसे पेरियार, भरतपुझा, मांडवी) पश्चिम की ओर बहकर अरब सागर में गिरती हैं।',
        },
      ],
    },
    passesImageAsset,
    {
      _type: 'block',
      style: 'h3',
      children: [{ _type: 'span', text: '3. पश्चिमी घाट जल-विभाजक के 4 प्रमुख दर्रे (Mountain Passes)' }],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'पश्चिमी घाट जल-विभाजक की निरन्तरता (Continuity) चार प्रमुख पर्वतीय दर्रों द्वारा भंग होती है:\n  1. **थाल घाट (Thal Ghat)**: नासिक एवं मुंबई को जोड़ता है (महाराष्ट्र)।\n  2. **भोर घाट (Bhor Ghat)**: मुंबई एवं पुणे को जोड़ता है (महाराष्ट्र)।\n  3. **पाल घाट (Pal Ghat)**: नीलगिरी एवं अन्नामलाई पहाड़ियों के बीच पलक्कड़ (केरल) व कोयंबटूर (तमिलनाडु) को जोड़ता है।\n  4. **सेनकोट्टा पास (Shencottah Pass)**: कार्डमम (इलायची) पहाड़ियों में स्थित, जो तिरुवनंतपुरम एवं मदुरै को जोड़ता है।',
        },
      ],
    },
    {
      _type: 'block',
      style: 'h3',
      children: [{ _type: 'span', text: '4. मध्य प्रदेश के विशेष संदर्भ में जल-विभाजक (Water Divides in MP)' }],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'MPPSC Mains भूगोल उत्तर लेखन के लिए मध्य प्रदेश के प्रमुख जल-विभाजक निम्नलिखित हैं:\n• **विंध्याचल पर्वत श्रेणी**: गंगा अपवाह तंत्र (चम्बल, केन, बेतवा) तथा नर्मदा अपवाह तंत्र के मध्य प्रमुख जल-विभाजक है।\n• **सतपुड़ा-मैकाल श्रेणी**: नर्मदा नदी घाटी (उत्तर) तथा ताप्ती व गोदावरी बेसिन (दक्षिण) को अलग करती है।\n• **अमरकंटक पठार**: भारत के अद्वितीय अरीय अपवाह (Radial Drainage Pattern) का निर्माण करता है, जहाँ से नर्मदा (पश्चिम), सोन (उत्तर-पूर्व) एवं महानदी तंत्र की नदियाँ निकलती हैं।',
        },
      ],
    },
    {
      _type: 'block',
      style: 'h3',
      children: [{ _type: 'span', text: '5. MPPSC Mains मॉडल उत्तर (3, 5 एवं 11 अंक)' }],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: '• **प्रश्न 1 (3 अंक): जल-विभाजक (Water Divide) से आप क्या समझते हैं?**\n  *उत्तर*: वह उच्च पर्वतीय या पठारी शीर्ष रेखा जो दो पड़ोसी अपवाह द्रोणियों को पृथक करती है तथा वर्षा जल के बहाव की दिशा निर्धारित करती है, जल-विभाजक कहलाती है। उदाहरण: अरावली श्रेणी, विंध्याचल श्रेणी।',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: '• **प्रश्न 2 (5 अंक): पश्चिमी घाट जल-विभाजक की प्रमुख विशेषताएँ लिखिए।**\n  *उत्तर*: (1) लंबाई लगभग 1600 किमी; (2) अरब सागर तथा बंगाल की खाड़ी अपवाह तंत्र के मध्य महान विभाजक; (3) गोदावरी, कृष्णा, कावेरी का उद्गम स्थल; (4) इसकी निरन्तरता 4 दर्रों (थाल घाट, भोर घाट, पाल घाट, सेनकोट्टा) द्वारा भंग होती है।',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: '• **प्रश्न 3 (11 अंक): भारत में पाए जाने वाले प्रमुख जल-विभाजकों का मानचित्र सहित विश्लेषणात्मक वर्णन कीजिए।**\n  *उत्तर संरचना*: मुख्य अवधारणा ➔ 4 अपवाह प्रदेश (सिन्धु, गंगा, पूर्वी व पश्चिमी प्रायद्वीपीय) ➔ 4 मुख्य विभाजक रेखाएँ (हिमालयन, अरावली, सतपुड़ा-मैकाल, पश्चिमी घाट) ➔ दर्रे व पूर्वगामी नदियाँ ➔ निष्कर्ष व मानचित्र।',
        },
      ],
    },
  ];

  const bodyEn = [
    {
      _type: 'block',
      style: 'h3',
      children: [{ _type: 'span', text: '1. What is a Water Divide? - Concept & Definition' }],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'A Water Divide (or Drainage Divide) is an elevated line of highland or mountain ridge that naturally separates two adjacent drainage basins or river systems. Rainwater falling on either side of a water divide drains into distinct river networks flowing toward different water bodies.',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: '• **Core Function**: Water divides demarcate natural geographical regions and control the direction of river runoff across continents.',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: '• **4 Major Drainage Basins of India**: Based on the Great Water Divide of India, the subcontinent is divided into four primary drainage regions:\n  1. **Indus Drainage Basin**\n  2. **Ganga-Brahmaputra Drainage Basin**\n  3. **East-Flowing Peninsular Drainage Basin**\n  4. **West-Flowing Peninsular Drainage Basin**',
        },
      ],
    },
    bannerImageAsset,
    {
      _type: 'block',
      style: 'h3',
      children: [{ _type: 'span', text: '2. The 4 Major Water Divide Ranges of India' }],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: '• **(1) Himalayan Water Divide**: Glacial-fed water divide formed by the Himadri (Great Himalayas) range, standing as the highest water divide in the world (~6,000m average height, ~2,600 km length). Rivers originating here flow either north toward Tibet/China or south toward the Indo-Gangetic plains. Antecedent rivers such as the Indus, Satluj, Kali, Teesta, and Brahmaputra cut deep gorges across this divide.',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: '• **(2) Aravalli Water Divide**: Residual mountain range (~1,100 km length, 750-1,000m height) separating the Indus basin (Luni river) from the Ganga basin (Chambal & tributaries). Its northern stretch is known as the Delhi Ridge.',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: '• **(3) Satpura-Mahadeo-Maikal Water Divide**: Central Indian mountain system (~1,920 km length) separating Narmada-Son (Ganga system) in the north from Tapti-Godavari (Peninsular system) in the south. The Amarkantak plateau forms a classic Radial Drainage Pattern.',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: '• **(4) Western Ghats Mountain Water Divide**: Continuous mountain chain (~1,600 km length) separating the Arabian Sea drainage (westwards) from the Bay of Bengal drainage (eastwards). Major peninsular rivers like Godavari, Krishna, and Kaveri originate here and flow eastward.',
        },
      ],
    },
    passesImageAsset,
    {
      _type: 'block',
      style: 'h3',
      children: [{ _type: 'span', text: '3. Four Key Mountain Passes of the Western Ghats Divide' }],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: '1. **Thal Ghat**: Connects Nashik and Mumbai (Maharashtra).\n2. **Bhor Ghat**: Connects Mumbai and Pune (Maharashtra).\n3. **Pal Ghat**: Connects Palakkad (Kerala) and Coimbatore (Tamil Nadu) between Nilgiri and Anaimalai hills.\n4. **Shencottah Pass**: Connects Thiruvananthapuram and Madurai across Cardamom hills.',
        },
      ],
    },
  ];

  const faqs = [
    {
      question: 'जल-विभाजक (Water Divide) क्या होता है?',
      questionEn: 'What is a Water Divide?',
      answer: 'जल-विभाजक एक ऐसी उच्च पर्वतीय या पठारी रेखा होती है जो दो पड़ौसी अपवाह द्रोणियों (Drainage Basins) को अलग करती है और नदियों के बहाव की दिशा तय करती है।',
      answerEn: 'A water divide is an elevated line or ridge that separates two adjacent drainage basins and determines the direction of river flow.'
    },
    {
      question: 'भारत के 4 प्रमुख जल-विभाजक कौन से हैं?',
      questionEn: 'What are the 4 major water divides of India?',
      answer: 'भारत के 4 मुख्य जल-विभाजक हैं: (1) हिमालयन जल-विभाजक, (2) अरावली जल-विभाजक, (3) सतपुड़ा-महादेव-मैकाल जल-विभाजक, तथा (4) पश्चिमी घाट पर्वतीय जल-विभाजक।',
      answerEn: 'The four major water divides of India are: (1) Himalayan Water Divide, (2) Aravalli Water Divide, (3) Satpura-Mahadeo-Maikal Water Divide, and (4) Western Ghats Mountain Water Divide.'
    },
    {
      question: 'पश्चिमी घाट के 4 प्रमुख दर्रे कौन से हैं जो जल-विभाजक को भंग करते हैं?',
      questionEn: 'Which 4 mountain passes break the continuity of the Western Ghats water divide?',
      answer: 'पश्चिमी घाट जल-विभाजक की निरन्तरता थाल घाट, भोर घाट, पाल घाट और सेनकोट्टा दर्रे द्वारा चार स्थानों पर भंग होती है।',
      answerEn: 'The continuity of the Western Ghats water divide is broken by Thal Ghat, Bhor Ghat, Pal Ghat, and Shencottah Pass.'
    },
    {
      question: 'मध्य प्रदेश में विंध्याचल एवं सतपुड़ा श्रेणियाँ किस प्रकार जल-विभाजक का कार्य करती हैं?',
      questionEn: 'How do Vindhyachal and Satpura ranges act as water divides in Madhya Pradesh?',
      answer: 'विंध्याचल श्रेणी उत्तर में चम्बल-बेतवा (गंगा तंत्र) और दक्षिण में नर्मदा घाटी को अलग करती है। सतपुड़ा श्रेणी नर्मदा घाटी (उत्तर) और ताप्ती-गोदावरी तंत्र (दक्षिण) के मध्य विभाजक का कार्य करती है।',
      answerEn: 'The Vindhyachal range separates the Ganga system (Chambal, Betwa) from the Narmada valley, while the Satpura range divides the Narmada valley from the Tapti-Godavari systems.'
    }
  ];

  const mcqs = [
    {
      question: 'हिमालयन जल-विभाजक की औसत ऊँचाई एवं लम्बाई क्रमशः कितनी है?',
      questionEn: 'What is the average height and length of the Himalayan Water Divide?',
      options: ['6,000 मीटर एवं 2,600 किमी', '4,500 मीटर एवं 1,800 किमी', '3,000 मीटर एवं 2,000 किमी', '7,500 मीटर एवं 3,000 किमी'],
      optionsEn: ['6,000 meters and 2,600 km', '4,500 meters and 1,800 km', '3,000 meters and 2,000 km', '7,500 meters and 3,000 km'],
      correctIndex: 0,
      explanation: 'हिमालयन जल-विभाजक (हिमाद्रि श्रेणी) लगभग 2,600 किमी लंबा है तथा इसकी औसत ऊँचाई 6,000 मीटर है, जो इसे विश्व का सबसे ऊँचा जल-विभाजक बनाती है।',
      explanationEn: 'The Himalayan Water Divide (Himadri range) is approx 2,600 km long with an average height of 6,000 meters, making it the highest water divide in the world.'
    },
    {
      question: 'अरावली जल-विभाजक का उत्तरी भाग किस नाम से विख्यात है?',
      questionEn: 'By what name is the northern part of the Aravalli Water Divide famous?',
      options: ['दिल्ली विभाजक (Delhi Ridge)', 'मालवा पठार', 'बुंदेलखंड रिज', 'शिवालिक पास'],
      optionsEn: ['Delhi Ridge', 'Malwa Plateau', 'Bundelkhand Ridge', 'Shiwalik Pass'],
      correctIndex: 0,
      explanation: 'अरावली पर्वत श्रेणी का उत्तरी भाग दिल्ली विभाजक (Delhi Ridge) के नाम से जाना जाता है, जो गंगा व सिंधु अपवाह प्रदेशों को अलग करता है।',
      explanationEn: 'The northern section of the Aravalli range is famous as the Delhi Ridge, which separates the Indus and Ganga drainage basins.'
    },
    {
      question: 'अमरकंटक पठार से निकलने वाली नदियाँ किस प्रकार का अपवाह प्रतिरूप (Drainage Pattern) बनाती हैं?',
      questionEn: 'What type of drainage pattern is formed by rivers originating from Amarkantak plateau?',
      options: ['अरीय अपवाह प्रतिरूप (Radial Drainage)', 'वृक्षाकार अपवाह', 'जालीनुमा अपवाह', 'समांतर अपवाह'],
      optionsEn: ['Radial Drainage Pattern', 'Dendritic Drainage', 'Trellis Drainage', 'Parallel Drainage'],
      correctIndex: 0,
      explanation: 'अमरकंटक से नर्मदा (पश्चिम), सोन (उत्तर-पूर्व) एवं महानदी तंत्र की नदियाँ अलग-अलग दिशाओं में निकलती हैं, जो अरीय अपवाह (Radial Drainage) का सर्वोत्तम उदाहरण है।',
      explanationEn: 'Narmada, Son, and Johilla flow in different directions from Amarkantak plateau, forming a classic Radial Drainage Pattern.'
    },
    {
      question: 'केरल के पलक्कड़ और तमिलनाडु के कोयंबटूर को जोड़ने वाला दर्रा कौन सा है?',
      questionEn: 'Which mountain pass connects Palakkad in Kerala with Coimbatore in Tamil Nadu?',
      options: ['पाल घाट (Pal Ghat)', 'थाल घाट', 'भोर घाट', 'सेनकोट्टा दर्रा'],
      optionsEn: ['Pal Ghat', 'Thal Ghat', 'Bhor Ghat', 'Shencottah Pass'],
      correctIndex: 0,
      explanation: 'पाल घाट दर्रा नीलगिरी एवं अन्नामलाई पहाड़ियों के बीच स्थित है जो केरल एवं तमिलनाडु को जोड़ता है और पश्चिमी घाट जल-विभाजक की निरन्तरता को भंग करता है।',
      explanationEn: 'Pal Ghat pass lies between Nilgiri and Anaimalai hills, connecting Palakkad (Kerala) and Coimbatore (Tamil Nadu).'
    },
    {
      question: 'निम्नलिखित में से कौन-सी नदी पश्चिमी घाट से निकलकर अरब सागर में गिरती है?',
      questionEn: 'Which of the following rivers originates in the Western Ghats and falls into the Arabian Sea?',
      options: ['पेरियार (Periyar)', 'गोदावरी', 'कृष्णा', 'कावेरी'],
      optionsEn: ['Periyar', 'Godavari', 'Krishna', 'Kaveri'],
      correctIndex: 0,
      explanation: 'पेरियार नदी पश्चिमी घाट से निकलकर पश्चिम की ओर बहते हुए अरब सागर में गिरती है, जबकि गोदावरी, कृष्णा व कावेरी पूर्व की ओर बहकर बंगाल की खाड़ी में गिरती हैं।',
      explanationEn: 'Periyar river flows westward into the Arabian Sea, whereas Godavari, Krishna, and Kaveri flow eastward into the Bay of Bengal.'
    }
  ];

  const doc = {
    _id: docId,
    _type: 'staticGk',
    slug: { _type: 'slug', current: slug },
    title,
    titleEn,
    seoTitle: 'MPPSC Mains Geography: भारत में प्रमुख जल-विभाजक (Water Divide in India)',
    seoDescription: excerpt,
    excerpt,
    excerptEn,
    keywords,
    publishedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    readingTime: 12,
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
    featuredImage: bannerImageAsset,
    body,
    bodyEn,
    faqs,
    mcqs,
  };

  console.log('Publishing document to Sanity CMS:', docId);
  await client.createOrReplace(doc);
  console.log('Successfully created and published article in Sanity:', docId);
}

run().catch((err) => {
  console.error('Error uploading article:', err);
  process.exit(1);
});
