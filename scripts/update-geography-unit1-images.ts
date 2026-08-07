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

const img1Src = '/Users/aakariastech/.gemini/antigravity-ide/brain/4baba4cd-82b4-4b62-8239-15248b7a4282/physical_geography_india_banner_1785921641508.png';
const img2Src = '/Users/aakariastech/.gemini/antigravity-ide/brain/4baba4cd-82b4-4b62-8239-15248b7a4282/indian_monsoon_mechanism_diagram_1785921659804.png';
const imgWaterDivideSrc = '/Users/aakariastech/.gemini/antigravity-ide/brain/4baba4cd-82b4-4b62-8239-15248b7a4282/water_divide_india_map_mppsc_1785920011641.png';

const img1Dest = path.resolve(process.cwd(), 'public/images/blog/physical_geography_india_banner.png');
const img2Dest = path.resolve(process.cwd(), 'public/images/blog/indian_monsoon_mechanism_diagram.png');

async function uploadImage(filePath: string, alt: string, caption: string) {
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
    caption: caption,
  };
}

async function run() {
  fs.copyFileSync(img1Src, img1Dest);
  fs.copyFileSync(img2Src, img2Dest);
  console.log('Copied real images to public/images/blog/');

  console.log('Uploading images to Sanity...');
  const bannerImageAsset = await uploadImage(img1Dest, 'भारत का भौतिक भूगोल मानचित्र - MPPSC Mains Geography', 'भारत का भौतिक भूगोल (Physical Geography of India) - MPPSC Mains Paper 1 Notes');
  const monsoonImageAsset = await uploadImage(img2Dest, 'भारतीय दक्षिण-पश्चिम मानसून प्रणाली एवं एल-नीनो/ला-नीना प्रभाव', 'भारतीय मानसून की उत्पत्ति, जेट स्ट्रीम एवं एल-नीनो/ला-नीना प्रभाव आरेख');
  const waterDivideImageAsset = await uploadImage(img1Dest, 'भारत के प्रमुख भू-आकृतिक प्रदेश', 'भारत के 5 प्रमुख भू-आकृतिक प्रदेश (Physiographic Divisions)');

  const docId = 'gk-mppsc-mains-geography-paper-1-unit-1';

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
          text: 'MPPSC राज्य सेवा मुख्य परीक्षा के प्रथम प्रश्नपत्र (Paper 1) के खंड (ब) की इकाई-1 **भारत का भौतिक भूगोल (Physical Geography of India)** कुल **30 अंकों** के लिए निर्धारित है। इसमें 2 अंक (अति लघुत्तरीय), 7 अंक (लघुत्तरीय) और 10 अंक (दीर्घ उत्तरीय) के प्रश्न पूछे जाते हैं।',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: '• **मुख्य पाठ्यक्रम विषय**:\n  1. **प्रमुख भू-आकृतिक लक्षण**: पर्वत, पठार, मैदान, नदियाँ, जल-विभाजक (Water Divides), झीलें एवं हिमनद।\n  2. **भारत के भू-आकृतिक प्रदेश**: उत्तर का पर्वतीय प्रदेश (हिमालय), विशाल मैदानी प्रदेश, प्रायद्वीपीय पठार, तटीय मैदान एवं द्वीप समूह।\n  3. **जलवायु एवं मानसून प्रणाली**: भारतीय मानसून की उत्पत्ति (Origin of Indian Monsoon), जेट स्ट्रीम (Jet Stream), चक्रवात (शीतोष्ण एवं उष्णकटिबंधीय), एल-नीनो (El Nino), ला-नीना (La Nina) तथा IOD का प्रभाव।',
        },
      ],
    },
    bannerImageAsset,
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
    waterDivideImageAsset,
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
    monsoonImageAsset,
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
      children: [{ _type: 'span', text: '5. MPPSC Mains मॉडल प्रश्नोत्तर (2, 7 एवं 10 अंक)' }],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: '• **प्रश्न 1 (2 अंक): भाबर और खादर में अंतर स्पष्ट कीजिए।**\n  *उत्तर*: भाबर शिवालिक के गिरिपद में कंकड़-पत्थर युक्त पारगम्य क्षेत्र है जहाँ नदियाँ अदृश्य हो जाती हैं। खादर नदियों के बाढ़ क्षेत्र का नवीन उपजाऊ जलोढ़ मैदान है जो कृषि हेतु सर्वोत्तम होता है।',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: '• **प्रश्न 2 (7 अंक): एल-नीनो का भारतीय मानसून पर क्या प्रभाव पड़ता है?**\n  *उत्तर*: एल-नीनो के दौरान पेरू तट पर गर्म जल के कारण तापीय दाब में परिवर्तन होता है। इससे प्रशांत महासागर में वॉकर चक्र कमजोर पड़ता है, जिससे भारत में दक्षिण-पश्चिम मानसून की वर्षा में कमी आती है और सूखे की स्थिति उत्पन्न होती है।',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: '• **प्रश्न 3 (10 अंक): भारत के भौतिक प्रदेशों का वर्गीकरण करते हुए उत्तर के विशाल मैदान का विस्तृत भौगोलिक वर्णन कीजिए।**\n  *उत्तर संरचना*: प्रस्तावना ➔ भारत के 5 भू-आकृतिक प्रदेश ➔ विशाल मैदान का निर्माण (नदियों द्वारा निक्षेपण) ➔ 4 उप-भाग (भाबर, तराई, बांगर, खादर) ➔ क्षेत्रीय विभाजन (पंजाब, राजस्थान, गंगा, ब्रह्मपुत्र मैदान) ➔ आर्थिक व कृषि महत्त्व ➔ निष्कर्ष।',
        },
      ],
    },
  ];

  console.log('Updating document featuredImage and body with real physical geography images in Sanity:', docId);
  await client.patch(docId).set({
    featuredImage: bannerImageAsset,
    body: body,
    publishedAt: new Date().toISOString()
  }).commit();
  console.log('Successfully updated real geography images in Sanity for:', docId);
}

run().catch((err) => {
  console.error('Error updating images:', err);
  process.exit(1);
});
