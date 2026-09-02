import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const {
  NEXT_PUBLIC_SANITY_PROJECT_ID: projectId,
  NEXT_PUBLIC_SANITY_DATASET: dataset,
  SANITY_API_WRITE_TOKEN: token,
} = process.env;

if (!projectId || !dataset || !token) {
  console.error("Missing Sanity credentials in environment variables.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-10-01",
  useCdn: false,
});

async function uploadImageAsset(filePath: string, filename: string) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Image file not found at: ${filePath}`);
  }
  console.log(`Uploading asset: ${filename}...`);
  const asset = await client.assets.upload("image", fs.createReadStream(filePath), {
    filename,
    contentType: filePath.endsWith(".png") ? "image/png" : "image/jpeg",
  });
  console.log(`Uploaded! Asset ID: ${asset._id}`);
  return asset;
}

async function main() {
  const docId = "mpsi-recruitment-2026-notification-out-507-posts";

  // 1. Copy user uploaded thumbnail & generated images to public directory
  const publicNotifDir = path.resolve(process.cwd(), "public/images/notifications");
  if (!fs.existsSync(publicNotifDir)) {
    fs.mkdirSync(publicNotifDir, { recursive: true });
  }

  const userUploadedThumbnailPath = "/Users/aakariastech/.gemini/antigravity-ide/brain/2df3bd94-033a-4089-9266-20ed6bf18dd5/.user_uploaded/media_1788337685313.png";
  const thumbPublicPath = path.join(publicNotifDir, "mpsi-recruitment-2026-thumbnail.png");
  fs.copyFileSync(userUploadedThumbnailPath, thumbPublicPath);

  const imgHqPath = "/Users/aakariastech/.gemini/antigravity-ide/brain/2df3bd94-033a-4089-9266-20ed6bf18dd5/mpsi_2026_police_hq_bhopal_1788337810902.jpg";
  const imgPetPath = "/Users/aakariastech/.gemini/antigravity-ide/brain/2df3bd94-033a-4089-9266-20ed6bf18dd5/mpsi_2026_physical_efficiency_test_1788337829672.jpg";
  const imgPrepPath = "/Users/aakariastech/.gemini/antigravity-ide/brain/2df3bd94-033a-4089-9266-20ed6bf18dd5/mpsi_2026_exam_preparation_strategy_1788337894283.jpg";

  // 2. Upload images to Sanity
  const thumbAsset = await uploadImageAsset(thumbPublicPath, "mpsi-recruitment-2026-thumbnail.png");
  const hqAsset = await uploadImageAsset(imgHqPath, "mpsi-2026-police-hq-bhopal.jpg");
  const petAsset = await uploadImageAsset(imgPetPath, "mpsi-2026-physical-efficiency-test.jpg");
  const prepAsset = await uploadImageAsset(imgPrepPath, "mpsi-2026-exam-preparation-strategy.jpg");

  // Helper block builders
  const h3Block = (text: string) => ({
    _type: "block",
    _key: `h3_${Math.random().toString(36).substring(2, 9)}`,
    style: "h3",
    children: [{ _type: "span", text }],
  });

  const pBlock = (text: string) => ({
    _type: "block",
    _key: `p_${Math.random().toString(36).substring(2, 9)}`,
    style: "normal",
    children: [{ _type: "span", text }],
  });

  const bulletBlock = (text: string) => ({
    _type: "block",
    _key: `b_${Math.random().toString(36).substring(2, 9)}`,
    style: "normal",
    children: [{ _type: "span", text: text.startsWith("• ") ? text : `• ${text}` }],
  });

  const imageBlock = (assetRef: string, alt: string, caption: string) => ({
    _type: "image",
    _key: `img_${Math.random().toString(36).substring(2, 9)}`,
    asset: {
      _type: "reference",
      _ref: assetRef,
    },
    alt,
    caption,
  });

  // Portable Text Body (Hindi)
  const bodyHi = [
    h3Block("MP Police Subedar / उप निरीक्षक (MPSI) भर्ती 2026: 507 पदों हेतु आधिकारिक अधिसूचना जारी"),
    pBlock("मध्य प्रदेश कर्मचारी चयन मंडल (ESB), भोपाल ने पुलिस मुख्यालय, गृह (पुलिस) विभाग, मध्यप्रदेश शासन के अंतर्गत **सूबेदार एवं उप निरीक्षक (Sub-Inspector & Subedar)** संवर्ग की सीधी भर्ती हेतु **चयन परीक्षा-2026** की विस्तृत अधिसूचना जारी कर दी है। इस भर्ती परीक्षा के माध्यम से कुल **507 पदों** पर नियुक्तियां की जाएंगी। MPPSC एवं म.प्र. राज्य स्तरीय प्रतियोगी परीक्षाओं की तैयारी कर रहे अभ्यर्थियों के लिए यह एक स्वर्णिम अवसर है।"),

    h3Block("1. महत्वपूर्ण तिथियां (Important Dates Schedule)"),
    bulletBlock("• **ऑनलाइन आवेदन प्रारंभ तिथि**: 09 सितंबर 2026 (09.09.2026)"),
    bulletBlock("• **ऑनलाइन आवेदन की अंतिम तिथि**: 23 सितंबर 2026 (23.09.2026)"),
    bulletBlock("• **आवेदन पत्र में संशोधन की प्रारंभ तिथि**: 09 सितंबर 2026 (09.09.2026)"),
    bulletBlock("• **आवेदन पत्र में संशोधन की अंतिम तिथि**: 28 सितंबर 2026 (28.09.2026)"),
    bulletBlock("• **परीक्षा प्रारंभ तिथि**: **28 अक्टूबर 2026 (बुधवार से प्रारंभ)**"),
    bulletBlock("• **परीक्षा पालियां**: प्रथम पाली (प्रातः 10:00 से 12:00 बजे, रिपोर्टिंग 08:00-09:00 बजे) एवं द्वितीय पाली (दोपहर 03:00 से 05:00 बजे, रिपोर्टिंग 01:00-02:00 बजे)।"),

    h3Block("2. रिक्त पदों का विस्तृत विवरण (Vacancy Breakdown - Total 507 Posts)"),
    pBlock("MPSI भर्ती 2026 के अंतर्गत गैर-तकनीकी (Non-Technical) एवं तकनीकी (Technical) दोनों संवर्गों में पद विज्ञापित किए गए हैं:"),
    h3Block("गैर-तकनीकी पद (Non-Technical Cadre - 462 Posts)"),
    bulletBlock("• **सूबेदार (Subedar)**: कुल 81 पद"),
    bulletBlock("• **उप निरीक्षक (विशेष सशस्त्र बल – SAF)**: कुल 69 पद *(केवल पुरुष अभ्यर्थियों हेतु)*"),
    bulletBlock("• **उप निरीक्षक (जिला पुलिस बल – DEF)**: कुल 312 पद"),
    h3Block("तकनीकी पद (Technical Cadre - 45 Posts)"),
    bulletBlock("• **उप निरीक्षक (आयुध – Ordnance)**: कुल 10 पद"),
    bulletBlock("• **उप निरीक्षक (फोटो – Photography)**: कुल 09 पद"),
    bulletBlock("• **उप निरीक्षक (प्रश्नाधीन दस्तावेज़ – Questioned Documents / Q.D.)**: कुल 04 पद"),
    bulletBlock("• **उप निरीक्षक (अंगुल चिन्ह – Fingerprint)**: कुल 22 पद"),
    bulletBlock("• **डोमिसिल नियम (Non-MP Domicile Rules)**: मध्यप्रदेश के बाहर (अन्य राज्यों) के अभ्यर्थी केवल अनारक्षित (UR) श्रेणी के अंतर्गत ही पात्र होंगे। उन्हें किसी प्रकार का आरक्षण या आयु सीमा में छूट प्रदान नहीं की जाएगी।"),

    imageBlock(
      hqAsset._id,
      "MP Police Headquarters Bhopal Assembly - MPSI Recruitment 2026",
      "मध्य प्रदेश पुलिस मुख्यालय (Bhopal) - सूबेदार एवं उप निरीक्षक भर्ती 2026 के अंतर्गत 507 पदों पर सीधी चयन प्रक्रिया प्रारंभ"
    ),

    h3Block("3. अनिवार्य शैक्षणिक योग्यता (Educational Qualification)"),
    bulletBlock("• **सूबेदार, SI (जिला पुलिस बल - DEF), SI (विशेष सशस्त्र बल - SAF)**: भारत में विधि द्वारा स्थापित किसी भी मान्यता प्राप्त विश्वविद्यालय से **स्नातक (Graduation in any stream)** की उपाधि।"),
    bulletBlock("• **उप निरीक्षक (आयुध)**: किसी मान्यता प्राप्त संस्थान से **मैकेनिकल इंजीनियरिंग में 3 वर्षीय डिप्लोमा**।"),
    bulletBlock("• **उप निरीक्षक (फोटो / QD / अंगुल चिन्ह)**: मान्यता प्राप्त विश्वविद्यालय से **गणित (Mathematics), भौतिक शास्त्र (Physics) एवं रसायन शास्त्र (Chemistry)** विषयों के साथ विज्ञान स्नातक (B.Sc.) की उपाधि।"),

    h3Block("4. आयु सीमा एवं आयु में छूट (Age Limit & Relaxation)"),
    pBlock("आयु सीमा की गणना आवेदन पत्र भरने की अंतिम तिथि तक की जाएगी:"),
    bulletBlock("• **पुरुष अभ्यर्थी (अनारक्षित / EWS - म.प्र. मूल निवासी)**: अधिकतम 33 वर्ष"),
    bulletBlock("• **अन्य राज्यों के सभी अभ्यर्थी (पुरुष / महिला)**: अधिकतम 33 वर्ष"),
    bulletBlock("• **महिला अभ्यर्थी (सभी वर्ग - UR/SC/ST/OBC/EWS)**: अधिकतम 38 वर्ष (5 वर्ष छूट)"),
    bulletBlock("• **आरक्षित वर्ग (SC / ST / OBC पुरुष - केवल म.प्र. निवासी)**: अधिकतम 38 वर्ष"),
    bulletBlock("• **शासकीय / निगम / मंडल कर्मचारी (पुरुष)**: अधिकतम 38 वर्ष"),
    bulletBlock("• **विक्रम पुरस्कार विजेता**: पुरुष हेतु 38 वर्ष, महिला हेतु 43 वर्ष"),
    bulletBlock("• **अंतर्जातीय विवाह प्रोत्साहन योजना (महिला)**: अधिकतम 43 वर्ष"),
    bulletBlock("• **भूतपूर्व सैनिक (Ex-Servicemen)**: नियमानुसार सैन्य सेवा अवधि घटाकर अधिकतम आयु सीमा में 3 वर्ष की छूट।"),

    h3Block("5. आवेदन शुल्क एवं कियोस्क चार्ज (Application Fee Standard)"),
    bulletBlock("• **अनारक्षित (General / UR) अभ्यर्थी**: सीधी भर्ती ₹500/- | विभागीय परीक्षा ₹200/-"),
    bulletBlock("• **SC / ST / OBC / EWS (केवल म.प्र. के मूल निवासी)**: सीधी भर्ती ₹250/- | विभागीय परीक्षा ₹100/-"),
    bulletBlock("• **MP ऑनलाइन कियोस्क पोर्टल शुल्क**: ₹60/- प्रति आवेदन"),
    bulletBlock("• **रजिस्टर्ड सिटीजन यूजर लॉगिन द्वारा फॉर्म भरने पर**: ₹20/- पोर्टल शुल्क"),

    h3Block("6. चयन प्रक्रिया का स्वरूप (Selection Process - 2 Stages)"),
    pBlock("MPSI भर्ती परीक्षा 2026 का आयोजन दो मुख्य चरणों में किया जाएगा:"),
    bulletBlock("• **प्रथम चरण (प्रारंभिक लिखित परीक्षा)**: कुल **100 अंक**, अवधि 2 घंटे। बहुविकल्पीय वस्तुनिष्ठ प्रश्न (MCQs)। प्रारंभिक परीक्षा में **कोई ऋणात्मक अंकन (Negative Marking) नहीं** है। विज्ञापित पदों की संख्या से **10 गुना अभ्यर्थियों** को मुख्य परीक्षा हेतु शॉर्टलिस्ट किया जाएगा।"),
    bulletBlock("• **द्वितीय चरण (क - मुख्य लिखित परीक्षा)**: प्रश्न पत्र I व II (सामान्य अध्ययन) – प्रत्येक 300 अंक, 2-2 घंटे। तकनीकी पदों हेतु अतिरिक्त प्रश्न पत्र III (300 अंक, 2 घंटे)। मुख्य परीक्षा में प्रत्येक गलत उत्तर पर **1/3 अंक का ऋणात्मक अंकन (Negative Marking)** लागू रहेगा। मुख्य परीक्षा से पदों के **3 गुना अभ्यर्थियों** को शारीरिक दक्षता परीक्षा हेतु बुलाया जाएगा।"),
    bulletBlock("• **द्वितीय चरण (ख - शारीरिक दक्षता परीक्षण PET)**: कुल **100 अंक** (800 मीटर दौड़ - 40 अंक, लंबी कूद - 30 अंक, गोला फेंक - 30 अंक)। न्यूनतम अर्हक अंक: गैर-तकनीकी हेतु 30 अंक, तकनीकी हेतु 20 अंक।"),
    bulletBlock("• **द्वितीय चरण (ग - साक्षात्कार Interview)**: कुल **50 अंक** का व्यक्तिगत साक्षात्कार लिया जाएगा।"),

    imageBlock(
      petAsset._id,
      "MP Police Sub Inspector Physical Efficiency Test PET 800m Running Long Jump",
      "MPSI भर्ती 2026 द्वितीय चरण - शारीरिक दक्षता परीक्षण (PET) 100 अंक (800 मीटर दौड़, लंबी कूद, गोला फेंक)"
    ),

    h3Block("7. विस्तृत परीक्षा पाठ्यक्रम (Detailed Syllabus - Prelims & Mains)"),
    h3Block("प्रारंभिक परीक्षा पाठ्यक्रम (100 अंक, 10 मुख्य विषय)"),
    bulletBlock("• 1. हिंदी भाषायी बोध | 2. अंग्रेजी भाषायी बोध | 3. विश्लेषणात्मक क्षमता"),
    bulletBlock("• 4. इतिहास (भारत व म.प्र.) | 5. भूगोल (भारत व म.प्र.) | 6. सामान्य विज्ञान"),
    bulletBlock("• 7. नागरिक शास्त्र व भारतीय राजव्यवस्था | 8. बुनियादी कंप्यूटर ज्ञान"),
    bulletBlock("• 9. तर्कशक्ति (Reasoning) | 10. करेंट अफेयर्स (राष्ट्रीय, अंतर्राष्ट्रीय व म.प्र. समसामयिकी)"),

    h3Block("मुख्य परीक्षा पाठ्यक्रम - प्रश्न पत्र I : सामान्य अध्ययन (300 अंक)"),
    bulletBlock("• **भाग क (150 अंक) - इतिहास और भारतीय समाज**: हड़प्पा सभ्यता, मौर्य, गुप्त, हर्षवर्धन, भक्ति-सूफी परंपराएं, विजयनगर, मुग़ल साम्राज्य, 1857 का संग्राम, राष्ट्रीय आंदोलन, स्वतंत्रता के बाद समेकन, भारतीय समाज की विशेषताएं, म.प्र. की जनजातियां व जनसांख्यिकी।"),
    bulletBlock("• **भाग ख (150 अंक) - शासन, संविधान, राजनीति व सामाजिक न्याय**: भारतीय संविधान के मूल ढाँचे, संघ व राज्यों के उत्तरदायित्व, त्रिस्तरीय पंचायती राज, संसद व राज्य विधायिका, कार्यपालिका व न्यायपालिका, कमजोर वर्गों हेतु कल्याणकारी योजनाएं, गरीबी व भूख संबंधी चुनौतियाँ।"),

    h3Block("मुख्य परीक्षा पाठ्यक्रम - प्रश्न पत्र II : सामान्य अध्ययन (300 अंक)"),
    bulletBlock("• **भाग क (150 अंक) - करेंट अफेयर्स, प्रौद्योगिकी, अर्थव्यवस्था व आंतरिक सुरक्षा**: विज्ञान एवं प्रौद्योगिकी, IT, AI, रोबोटिक्स, स्पेस टेक्नोलॉजी, पर्यावरण प्रभाव आंकलन, म.प्र. व भारतीय अर्थव्यवस्था, नवीकरणीय ऊर्जा, पुलिस प्रशासन की भूमिका, साइबर सुरक्षा, मनी लॉन्ड्रिंग व आतंकवाद की चुनौतियाँ।"),
    bulletBlock("• **भाग ख (150 अंक) - तर्क एवं अंकों की व्याख्या**: संख्यात्मक योग्यता, सांख्यिकी, प्रायिकता, डेटा इंटरप्रिटेशन (DI), लाभ-हानि, प्रतिशत, साधारण व चक्रवृद्धि ब्याज, क्षेत्रमिति, तार्किक क्षमता व समस्या समाधान।"),

    h3Block("मुख्य परीक्षा पाठ्यक्रम - प्रश्न पत्र III : तकनीकी परीक्षा (केवल तकनीकी पदों हेतु, 300 अंक)"),
    bulletBlock("• **SI (आयुध)**: मैकेनिकल इंजीनियरिंग डिप्लोमा स्तर के 100 वस्तुनिष्ठ प्रश्न।"),
    bulletBlock("• **SI (फोटो / QD / अंगुल चिन्ह)**: गणित, भौतिक शास्त्र एवं रसायन शास्त्र पर आधारित 100 वस्तुनिष्ठ प्रश्न।"),

    h3Block("8. न्यूनतम शारीरिक मानक (Physical Standards)"),
    bulletBlock("• **पुरुष अभ्यर्थियों की ऊंचाई**: न्यूनतम 167.5 सेमी (या अधिक)"),
    bulletBlock("• **महिला अभ्यर्थियों की ऊंचाई**: न्यूनतम 152.4 सेमी (या अधिक)"),
    bulletBlock("• **पुरुषों का सीना (Chest)**: बिना फुलाए न्यूनतम 81 सेमी, फुलाकर न्यूनतम 86 सेमी (कम से कम 5 सेमी का फुलाव अनिवार्य)"),
    bulletBlock("• **दृष्टि मानक**: बिना चश्मे के एक आंख 6/9 तथा दूसरी आंख 6/12 से कम नहीं होनी चाहिए। नोक-नी (Knock-knee) व फ्लैट फुट (Flat Foot) की समस्या नहीं होनी चाहिए।"),

    h3Block("9. वेतनमान एवं परिवीक्षा अवधि (Pay Scale & Probation Period)"),
    bulletBlock("• **वेतनमान (Pay Matrix Level 9)**: ₹ 36,200 – ₹ 1,14,800/- (सूबेदार एवं सभी उप निरीक्षक पद)"),
    bulletBlock("• **स्टायपेंड नियम (Stipend During Probation)**: प्रथम वर्ष – नियत वेतन का 70%, द्वितीय वर्ष – 80%, तृतीय वर्ष – 90%। 3 वर्ष की परिवीक्षा अवधि सफलतापूर्वक पूर्ण करने पर पूर्ण वेतनमान देय होगा।"),
    bulletBlock("• **सेवा शर्त**: जिस इकाई या जिले में पदस्थापना होगी, वहां न्यूनतम 5 वर्ष तक सेवा देना अनिवार्य होगा। गृह जिले में पदस्थापना नहीं दी जाएगी।"),

    h3Block("10. परीक्षा केंद्र एवं आवश्यक दस्तावेज (Exam Centers & Documents)"),
    bulletBlock("• **परीक्षा शहर**: भोपाल, इंदौर, जबलपुर, खंडवा, नीमच, रतलाम, रीवा, सागर, सतना, सीधी, उज्जैन, बड़वानी, अनूपपुर।"),
    bulletBlock("• **जरूरी दस्तावेज (DVP हेतु)**: 10वीं-12वीं अंकसूची, स्नातक/डिपलोमा प्रमाण पत्र, म.प्र. मूल निवासी प्रमाण पत्र, SC/ST/OBC/EWS जाति प्रमाण पत्र, आधार कार्ड (बायोमेट्रिक सत्यापन हेतु), मूल फोटोयुक्त आईडी कार्ड।"),

    imageBlock(
      prepAsset._id,
      "MPPSC & MPSI Exam Preparation Books Notes Roadmap Syllabus Strategy",
      "आकार IAS मार्गदर्शन - MPPSC एवं MPSI 2026 परीक्षा की एक साथ एकीकृत (Integrated) तैयारी रणनीति"
    ),

    h3Block("11. MPPSC & MPSI 2026 की सर्वोत्तम तैयारी रणनीति (Expert Guidance)"),
    bulletBlock("• **1. GS विषयों की एकीकृत तैयारी (Integrated GS Approach)**: MPSI मुख्य परीक्षा का सामान्य अध्ययन (इतिहास, भूगोल, संविधान, अर्थव्यवस्था, विज्ञान) का पाठ्यक्रम MPPSC Mains परीक्षा से अत्यधिक मेल खाता है। MPPSC के गहन अध्ययन से MPSI Mains स्वतः मजबूत होता है।"),
    bulletBlock("• **2. MP GK व करेंट अफेयर्स पर विशेष बल**: मध्यप्रदेश की जनसांख्यिकी, जनजातियों, इतिहास व राज्य के समसामयिक घटनाक्रम पर न्यूनतम 25-30% प्रश्न पूछे जाते हैं। आकार IAS दैनिक MP करेंट अफेयर्स बुलेटिन का नियमित अध्ययन करें।"),
    bulletBlock("• **3. गणित, तर्कशक्ति व DI का अभ्यास**: प्रश्न पत्र II भाग ख (150 अंक) पूरी तरह से गणित, सांख्यिकी व रीजनिंग पर केंद्रित है। दैनिक 1-2 घंटे प्रश्नों को हल करने का अभ्यास करें।"),
    bulletBlock("• **4. शारीरिक दक्षता की नियमित तैयारी**: लिखित परीक्षा के साथ-साथ प्रतिदिन सुबह 800 मीटर दौड़ एवं लंबी कूद का अभ्यास जारी रखें ताकि 100 अंकों के PET में अधिकतम स्कोर प्राप्त किया जा सके।"),
    bulletBlock("• **5. मॉक टेस्ट व PYQ सॉल्विंग**: आकार IAS ऑनलाइन टेस्ट सीरीज़ व विगत वर्षों के प्रश्न पत्रों का नियमित अभ्यास करें।"),
  ];

  // Portable Text Body (English)
  const bodyEn = [
    h3Block("MP Police Subedar & Sub Inspector (MPSI) Recruitment 2026: 507 Posts Notification Out"),
    pBlock("Madhya Pradesh Employees Selection Board (MPESB), Bhopal has officially released the detailed Rulebook Notification for **Sub-Inspector & Subedar Recruitment Examination 2026** under the Police Headquarters, Home (Police) Department, Govt of MP. A total of **507 vacancies** will be filled through this direct selection test. This presents a major career opportunity for candidates preparing for MPPSC and MP state competitive examinations."),

    h3Block("1. Important Dates & Time Schedule"),
    bulletBlock("• **Online Application Start Date**: 09 September 2026 (09.09.2026)"),
    bulletBlock("• **Online Application Closing Date**: 23 September 2026 (23.09.2026)"),
    bulletBlock("• **Application Modification Start Date**: 09 September 2026 (09.09.2026)"),
    bulletBlock("• **Application Modification Closing Date**: 28 September 2026 (28.09.2026)"),
    bulletBlock("• **Examination Commencement Date**: **From 28 October 2026 (Wednesday)**"),
    bulletBlock("• **Exam Shifts**: Shift 1 (10:00 AM - 12:00 PM, Reporting 08:00-09:00 AM) & Shift 2 (03:00 PM - 05:00 PM, Reporting 01:00-02:00 PM)."),

    h3Block("2. Detailed Vacancy Breakdown (Total 507 Vacancies)"),
    pBlock("The advertised vacancies are divided into Non-Technical and Technical cadres as detailed below:"),
    h3Block("Non-Technical Posts (462 Vacancies)"),
    bulletBlock("• **Subedar**: 81 Posts"),
    bulletBlock("• **Sub Inspector (Special Armed Force – SAF)**: 69 Posts *(Male Candidates Only)*"),
    bulletBlock("• **Sub Inspector (District Executive Force – DEF)**: 312 Posts"),
    h3Block("Technical Posts (45 Vacancies)"),
    bulletBlock("• **Sub Inspector (Ordnance - Armorer)**: 10 Posts"),
    bulletBlock("• **Sub Inspector (Photography)**: 09 Posts"),
    bulletBlock("• **Sub Inspector (Questioned Documents - Q.D.)**: 04 Posts"),
    bulletBlock("• **Sub Inspector (Fingerprint)**: 22 Posts"),
    bulletBlock("• **Non-MP Domicile Candidate Rules**: Candidates from outside Madhya Pradesh can apply strictly under the Unreserved (UR) category and will not be eligible for age relaxations or category reservations."),

    imageBlock(
      hqAsset._id,
      "Madhya Pradesh Police HQ Bhopal Sub Inspector Officers Parade",
      "Madhya Pradesh Police Headquarters Bhopal - Recruitment Notification issued for 507 Posts of Sub Inspector and Subedar"
    ),

    h3Block("3. Educational Qualifications"),
    bulletBlock("• **Subedar, SI (District Police - DEF), SI (Special Armed Force - SAF)**: Bachelor's Degree (Graduation in any discipline) from a recognized University in India."),
    bulletBlock("• **Sub Inspector (Ordnance)**: 3-Year Diploma in Mechanical Engineering from a recognized polytechnic institute."),
    bulletBlock("• **Sub Inspector (Photo / QD / Fingerprint)**: Bachelor of Science (B.Sc.) with **Mathematics, Physics, and Chemistry (PCM)** from a recognized university."),

    h3Block("4. Age Limit & Category Relaxations"),
    pBlock("Age is calculated as on the closing date of application submission:"),
    bulletBlock("• **Male Candidates (Unreserved / EWS - MP Domicile)**: Maximum 33 Years"),
    bulletBlock("• **Candidates from Other States (Male / Female)**: Maximum 33 Years"),
    bulletBlock("• **Female Candidates (All Categories - UR/SC/ST/OBC/EWS)**: Maximum 38 Years (5 Years Relaxation)"),
    bulletBlock("• **Reserved Categories (SC / ST / OBC Male - MP Domicile)**: Maximum 38 Years"),
    bulletBlock("• **Govt / Corporation / Board Employees (Male)**: Maximum 38 Years"),
    bulletBlock("• **Vikram Award Winners**: Male - 38 Years, Female - 43 Years"),
    bulletBlock("• **Inter-caste Marriage Scheme (Female)**: Maximum 43 Years"),
    bulletBlock("• **Ex-Servicemen**: Age relaxation as per service rules (up to 3 years deduction after military service)."),

    h3Block("5. Application Fee & Portal Charges"),
    bulletBlock("• **Unreserved (UR / General)**: Direct Recruitment ₹500/- | Departmental Exam ₹200/-"),
    bulletBlock("• **SC / ST / OBC / EWS (MP Domicile Only)**: Direct Recruitment ₹250/- | Departmental Exam ₹100/-"),
    bulletBlock("• **MP Online Kiosk Portal Fee**: ₹60/- per application"),
    bulletBlock("• **Citizen User Login Portal Fee**: ₹20/- per application"),

    h3Block("6. Selection Process (Two Main Stages)"),
    pBlock("The recruitment is conducted in two comprehensive phases:"),
    bulletBlock("• **Stage 1 (Preliminary Written Exam)**: Total **100 Marks**, 2-Hour duration. Multiple Choice Questions (MCQs). **No Negative Marking** in Prelims. Candidates equal to **10 times the number of vacancies** will be shortlisted for Mains."),
    bulletBlock("• **Stage 2 (Part A - Mains Written Exam)**: Paper I & II (General Studies) – 300 Marks each, 2 Hours each. Technical Posts have an additional Paper III (300 Marks, 2 Hours). **1/3rd Negative Marking** for wrong answers in Mains. Candidates equal to **3 times the vacancies** move to PET."),
    bulletBlock("• **Stage 2 (Part B - Physical Efficiency Test PET)**: Total **100 Marks** (800m Run - 40 Marks, Long Jump - 30 Marks, Shot Put - 30 Marks). Qualifying marks: Non-Technical – 30 Marks, Technical – 20 Marks."),
    bulletBlock("• **Stage 2 (Part C - Interview)**: Personal Interview of **50 Marks**."),

    imageBlock(
      petAsset._id,
      "MP Police Sub Inspector Physical Efficiency Test Track Running Long Jump Shot Put",
      "MPSI Recruitment 2026 Stage 2 Physical Efficiency Test (PET) 100 Marks Assessment"
    ),

    h3Block("7. Complete Written Examination Syllabus"),
    h3Block("Preliminary Examination Syllabus (100 Marks, 10 Subjects)"),
    bulletBlock("• 1. Hindi Language Comprehension | 2. English Language Comprehension | 3. Analytical Ability"),
    bulletBlock("• 4. History (India & MP) | 5. Geography (India & MP) | 6. General Science"),
    bulletBlock("• 7. Civics & Indian Polity | 8. Basic Computer Knowledge"),
    bulletBlock("• 9. Reasoning Ability | 10. Current Affairs (National, International & MP)"),

    h3Block("Mains Examination - Paper I : General Studies (300 Marks)"),
    bulletBlock("• **Part A (150 Marks) - History & Indian Society**: Harappan Civilization, Mauryan, Gupta empires, Harsha, Bhakti-Sufi movement, Vijayanagar, Mughals, 1857 Revolt, National Movement, Post-independence consolidation, Indian Society, MP Tribes & Demographics."),
    bulletBlock("• **Part B (150 Marks) - Governance, Constitution, Politics & Social Justice**: Basic structure of Constitution, Centre-State relations, Panchayati Raj, Executive & Judiciary, Welfare schemes for vulnerable sections, Poverty & Hunger issues."),

    h3Block("Mains Examination - Paper II : General Studies (300 Marks)"),
    bulletBlock("• **Part A (150 Marks) - Current Affairs, Tech, Economy & Internal Security**: Science & Technology, IT, AI, Robotics, Space, Environmental Impact Assessment, MP & Indian Economy, Renewable Energy, Role of Police in Democracy, Cyber Security, Money Laundering & Counter-Terrorism."),
    bulletBlock("• **Part B (150 Marks) - Reasoning & Data Interpretation**: Quantitative Aptitude, Statistics, Probability, Data Interpretation (DI), Profit & Loss, Percentages, Interest, Mensuration, Logic & Problem Solving."),

    h3Block("Mains Examination - Paper III : Technical Exam (Technical Posts Only, 300 Marks)"),
    bulletBlock("• **SI (Ordnance)**: 100 MCQs based on Mechanical Engineering Diploma curriculum."),
    bulletBlock("• **SI (Photo / QD / Fingerprint)**: 100 MCQs based on B.Sc. Mathematics, Physics, and Chemistry subjects."),

    h3Block("8. Physical Standards Requirements"),
    bulletBlock("• **Male Height**: Minimum 167.5 cm or more"),
    bulletBlock("• **Female Height**: Minimum 152.4 cm or more"),
    bulletBlock("• **Male Chest Measurement**: Unexpanded minimum 81 cm, Expanded minimum 86 cm (Minimum 5 cm expansion required)"),
    bulletBlock("• **Vision Standards**: Minimum 6/9 in one eye and 6/12 in another without glasses. Candidates must not suffer from Knock-knee or Flat foot."),

    h3Block("9. Pay Scale & Service Conditions"),
    bulletBlock("• **Pay Scale (Pay Matrix Level 9)**: ₹ 36,200 – ₹ 1,14,800/- (Subedar & all Sub Inspector cadres)"),
    bulletBlock("• **Probation Stipend Rule**: Year 1 – 70% of base pay, Year 2 – 80%, Year 3 – 90%. Full pay scale applies upon successful completion of 3-year probation."),
    bulletBlock("• **Service Commitment**: Mandatory minimum 5-year tenure at assigned unit/district before transfer eligibility. Postings will not be given in home district."),

    h3Block("10. Exam Centers & Verification Documents"),
    bulletBlock("• **Test Cities**: Bhopal, Indore, Jabalpur, Khandwa, Neemach, Ratlam, Rewa, Sagar, Satna, Sidhi, Ujjain, Barwani, Anuppur."),
    bulletBlock("• **Mandatory Documents**: Class 10th & 12th Marksheets, Graduation/Diploma Certificates, MP Domicile Certificate, Caste Certificate (SC/ST/OBC/EWS), Aadhaar Card (Biometric verification), Original Photo ID."),

    imageBlock(
      prepAsset._id,
      "MPPSC & MPSI Exam Study Notes Books Strategy Guide Desk",
      "Aakar IAS Guidance - Integrated Preparation Strategy for MPPSC & MPSI 2026 Examinations"
    ),

    h3Block("11. Expert Preparation Strategy for MPPSC & MPSI 2026"),
    bulletBlock("• **1. Integrated GS Strategy**: MPSI Mains General Studies syllabus heavily overlaps with MPPSC Mains. Preparing for MPPSC automatically solidifies MPSI GS Papers I & II."),
    bulletBlock("• **2. Special Focus on MP GK & Current Affairs**: 25-30% of questions in Prelims and Mains cover Madhya Pradesh Geography, History, Culture, and State Current Affairs. Revise Aakar IAS MP Bulletins regularly."),
    bulletBlock("• **3. Master Maths, Reasoning & DI**: Paper II Part B carries 150 marks dedicated to numerical aptitude and DI. Practice problem solving daily for 1-2 hours."),
    bulletBlock("• **4. Physical Fitness Training**: Maintain daily morning practice for 800m run and long jump alongside written studies to score maximum in the 100-mark PET."),
    bulletBlock("• **5. Mock Tests & PYQ Solving**: Practice standard mock papers and previous years' question banks available on Aakar IAS portal."),
  ];

  // FAQs
  const faqs = [
    {
      _key: "faq1",
      question: "MPSI भर्ती 2026 के अंतर्गत कुल कितने पदों पर भर्ती की जाएगी?",
      questionEn: "How many total vacancies are advertised in MPSI Recruitment 2026?",
      answer: "मध्य प्रदेश कर्मचारी चयन मंडल (MPESB) द्वारा जारी अधिसूचना के अनुसार कुल 507 पदों पर भर्ती होगी, जिसमें सूबेदार के 81 पद, उप निरीक्षक जिला पुलिस बल (DEF) के 312 पद, उप निरीक्षक विशेष सशस्त्र बल (SAF) के 69 पद तथा 45 तकनीकी पद शामिल हैं।",
      answerEn: "As per the MPESB notification, a total of 507 posts are advertised, including 81 Subedar posts, 312 District Police SI (DEF) posts, 69 SAF SI posts, and 45 Technical SI posts.",
    },
    {
      _key: "faq2",
      question: "MPSI 2026 के लिए ऑनलाइन आवेदन और परीक्षा की तिथियां क्या हैं?",
      questionEn: "What are the key dates for MPSI 2026 application and examination?",
      answer: "ऑनलाइन आवेदन 09 सितंबर 2026 से 23 सितंबर 2026 तक स्वीकार किए जाएंगे। आवेदन संशोधन की अंतिम तिथि 28 सितंबर 2026 है। लिखित परीक्षा 28 अक्टूबर 2026 (बुधवार) से प्रारंभ होगी।",
      answerEn: "Online applications will be accepted from 09 September 2026 to 23 September 2026. Application correction closes on 28 September 2026. The examination starts on 28 October 2026.",
    },
    {
      _key: "faq3",
      question: "क्या अन्य राज्यों के अभ्यर्थी (Non-MP Domicile) MPSI 2026 हेतु आवेदन कर सकते हैं?",
      questionEn: "Can candidates from outside Madhya Pradesh apply for MPSI 2026?",
      answer: "हाँ, अन्य राज्यों के अभ्यर्थी आवेदन कर सकते हैं, परंतु वे केवल अनारक्षित (Unreserved/UR) श्रेणी के अंतर्गत ही पात्र होंगे और उन्हें आयु या वर्ग आरक्षण का लाभ नहीं मिलेगा।",
      answerEn: "Yes, candidates from other states can apply, but strictly under the Unreserved (UR) category without category or age relaxations.",
    },
    {
      _key: "faq4",
      question: "MPSI लिखित परीक्षा में ऋणात्मक अंकन (Negative Marking) का क्या नियम है?",
      questionEn: "What is the negative marking scheme in MPSI 2026 exam?",
      answer: "प्रारंभिक परीक्षा (100 अंक) में कोई ऋणात्मक अंकन नहीं है। हालाँकि, द्वितीय चरण मुख्य लिखित परीक्षा में प्रत्येक गलत उत्तर पर 1/3 अंक का ऋणात्मक अंकन (Negative Marking) लागू रहेगा।",
      answerEn: "There is no negative marking in the Preliminary Exam (100 marks). However, 1/3rd negative marking applies to wrong answers in the Mains Written Exam.",
    },
    {
      _key: "faq5",
      question: "MPSI सूबेदार एवं उप निरीक्षक का वेतनमान (Salary) कितना है?",
      questionEn: "What is the pay scale for MP Police SI and Subedar posts?",
      answer: "सूबेदार एवं उप निरीक्षक पदों का वेतनमान पे मैट्रिक्स लेवल-9 (₹ 36,200 – ₹ 1,14,800/-) है। परिवीक्षा अवधि में प्रथम वर्ष 70%, द्वितीय वर्ष 80% तथा तृतीय वर्ष 90% स्टायपेंड प्रदान किया जाएगा।",
      answerEn: "The salary falls under Pay Matrix Level 9 (₹ 36,200 – ₹ 1,14,800/-). During the 3-year probation, stipend is 70% in Year 1, 80% in Year 2, and 90% in Year 3.",
    },
    {
      _key: "faq6",
      question: "शारीरिक दक्षता परीक्षण (PET) में कौन सी स्पर्धाएँ होंगी?",
      questionEn: "What events are evaluated in the Physical Efficiency Test (PET)?",
      answer: "PET परीक्षण कुल 100 अंकों का होगा जिसमें 800 मीटर दौड़ (40 अंक), लंबी कूद (30 अंक) तथा गोला फेंक (30 अंक) शामिल हैं। गैर-तकनीकी पदों हेतु न्यूनतम 30 अंक प्राप्त करना अनिवार्य है।",
      answerEn: "The 100-mark PET comprises 800m Run (40 marks), Long Jump (30 marks), and Shot Put (30 marks). A minimum of 30 marks is mandatory to qualify for non-technical posts.",
    },
  ];

  // MCQs (8 High-Quality MCQs)
  const mcqs = [
    {
      _key: "mcq1",
      question: "MPESB द्वारा जारी अधिसूचना के अनुसार MPSI एवं सूबेदार भर्ती 2026 में कुल कितने पद विज्ञापित किए गए हैं?",
      questionEn: "According to the MPESB notification, how many total vacancies are advertised for MPSI & Subedar Recruitment 2026?",
      options: ["450 पद", "507 पद", "504 पद", "620 पद"],
      optionsEn: ["450 Posts", "507 Posts", "504 Posts", "620 Posts"],
      correctIndex: 1,
      explanation: "MPESB द्वारा जारी आधिकारिक नियमपुस्तिका 2026 के अनुसार सूबेदार एवं उप निरीक्षक संवर्ग के कुल 507 पदों पर सीधी भर्ती की जाएगी।",
      explanationEn: "According to the official MPESB Rulebook 2026, a total of 507 vacancies are advertised across Subedar and Sub-Inspector cadres.",
    },
    {
      _key: "mcq2",
      question: "MPSI 2026 मुख्य लिखित परीक्षा में गलत उत्तर अंकित करने पर ऋणात्मक अंकन (Negative Marking) की दर क्या निर्धारित है?",
      questionEn: "What rate of negative marking is specified for wrong answers in MPSI 2026 Mains Written Examination?",
      options: ["1/2 (50%)", "1/3 (33.33%)", "1/4 (25%)", "कोई ऋणात्मक अंकन नहीं"],
      optionsEn: ["1/2 (50%)", "1/3 (33.33%)", "1/4 (25%)", "No Negative Marking"],
      correctIndex: 1,
      explanation: "MPSI मुख्य परीक्षा (द्वितीय चरण) में प्रत्येक गलत उत्तर पर 1/3 अंक ऋणात्मक काटे जाएंगे, जबकि प्रारंभिक परीक्षा में कोई ऋणात्मक अंकन नहीं है।",
      explanationEn: "In MPSI Mains (Stage 2), 1/3rd negative marking is levied per incorrect answer, whereas Prelims has no negative marking.",
    },
    {
      _key: "mcq3",
      question: "MPSI भर्ती 2026 के अंतर्गत पुरुष उम्मीदवारों (अनारक्षित वर्ग) के लिए न्यूनतम ऊंचाई मानक क्या रखा गया है?",
      questionEn: "What is the minimum height standard prescribed for male UR candidates in MPSI Recruitment 2026?",
      options: ["165.0 सेमी", "167.5 सेमी", "170.0 सेमी", "162.5 सेमी"],
      optionsEn: ["165.0 cm", "167.5 cm", "170.0 cm", "162.5 cm"],
      correctIndex: 1,
      explanation: "MPSI शारीरिक मानक नियम पुस्तिका के अनुसार पुरुष अभ्यर्थियों हेतु न्यूनतम ऊंचाई 167.5 सेमी तथा महिला अभ्यर्थियों हेतु 152.4 सेमी निर्धारित है।",
      explanationEn: "As per MPSI Physical Standards, the minimum height for male candidates is 167.5 cm and for female candidates is 152.4 cm.",
    },
    {
      _key: "mcq4",
      question: "MPSI 2026 द्वितीय चरण शारीरिक दक्षता परीक्षा (PET) में गैर-तकनीकी पदों हेतु न्यूनतम अर्हक (Qualifying) अंक कितने हैं?",
      questionEn: "What are the minimum qualifying marks in the 100-mark Physical Efficiency Test (PET) for non-technical posts in MPSI 2026?",
      options: ["20 अंक", "25 अंक", "30 अंक", "40 अंक"],
      optionsEn: ["20 Marks", "25 Marks", "30 Marks", "40 Marks"],
      correctIndex: 2,
      explanation: "100 अंकों की शारीरिक दक्षता परीक्षा में गैर-तकनीकी पदों हेतु न्यूनतम 30 अंक तथा तकनीकी पदों हेतु न्यूनतम 20 अंक प्राप्त करना अनिवार्य है।",
      explanationEn: "In the 100-mark PET, candidates must score at least 30 marks for non-technical posts and 20 marks for technical posts to qualify.",
    },
    {
      _key: "mcq5",
      question: "MPSI प्रारंभिक लिखित परीक्षा (100 अंक) के परिणाम के आधार पर मुख्य परीक्षा हेतु पदों के कितने गुना अभ्यर्थी चुने जाएँगे?",
      questionEn: "How many times the number of advertised vacancies will be shortlisted for Mains based on MPSI Prelims result?",
      options: ["3 गुना", "5 गुना", "10 गुना", "15 गुना"],
      optionsEn: ["3 Times", "5 Times", "10 Times", "15 Times"],
      correctIndex: 2,
      explanation: "प्रारंभिक परीक्षा के प्राप्तांकों के आधार पर विज्ञापित पदों की संख्या से 10 गुना अभ्यर्थियों को मुख्य लिखित परीक्षा हेतु चुना जाएगा।",
      explanationEn: "Candidates equal to 10 times the total advertised vacancies will be selected for the Mains written exam based on Prelims.",
    },
    {
      _key: "mcq6",
      question: "मध्य प्रदेश पुलिस उप निरीक्षक (MPSI) पद किस वेतन स्तर (Pay Matrix Level) के अंतर्गत आता है?",
      questionEn: "Which Pay Matrix Level governs the MP Police Sub-Inspector (MPSI) post salary scale?",
      options: ["Level 7 (₹ 28,700 - 91,300)", "Level 8 (₹ 32,800 - 1,03,600)", "Level 9 (₹ 36,200 - 1,14,800)", "Level 10 (₹ 42,700 - 1,35,100)"],
      optionsEn: ["Level 7 (₹ 28,700 - 91,300)", "Level 8 (₹ 32,800 - 1,03,600)", "Level 9 (₹ 36,200 - 1,14,800)", "Level 10 (₹ 42,700 - 1,35,100)"],
      correctIndex: 2,
      explanation: "म.प्र. पुलिस सूबेदार एवं उप निरीक्षक पद वेतनमान पे मैट्रिक्स लेवल-9 (₹ 36,200 – ₹ 1,14,800/-) में आते हैं।",
      explanationEn: "MP Police Subedar and Sub-Inspector posts are categorized under Pay Matrix Level 9 (₹ 36,200 – ₹ 1,14,800/-).",
    },
    {
      _key: "mcq7",
      question: "MPSI 2026 भर्ती में उप निरीक्षक (विशेष सशस्त्र बल – SAF) पद हेतु कौन से अभ्यर्थी आवेदन कर सकते हैं?",
      questionEn: "Which candidates are eligible to apply for Sub Inspector in Special Armed Force (SAF) under MPSI 2026?",
      options: ["केवल महिला अभ्यर्थी", "केवल पुरुष अभ्यर्थी", "पुरुष एवं महिला दोनों", "केवल भूतपूर्व सैनिक"],
      optionsEn: ["Female Candidates Only", "Male Candidates Only", "Both Male & Female", "Ex-Servicemen Only"],
      correctIndex: 1,
      explanation: "नियमपुस्तिका के अनुसार उप निरीक्षक (विशेष सशस्त्र बल – SAF) के 69 पद केवल पुरुष अभ्यर्थियों हेतु आरक्षित हैं।",
      explanationEn: "As per the official rulebook, 69 posts of Sub Inspector (Special Armed Force - SAF) are reserved exclusively for male candidates.",
    },
    {
      _key: "mcq8",
      question: "MPSI 2026 तकनीकी पद उप निरीक्षक (अंगुल चिन्ह / QD / फोटो) हेतु अनिवार्य न्यूनतम शैक्षणिक योग्यता क्या है?",
      questionEn: "What is the mandatory minimum qualification for MPSI Technical posts (Fingerprint / QD / Photography)?",
      options: ["B.A. (कला में स्नातक)", "B.Sc. (गणित, भौतिकी व रसायन शास्त्र)", "B.Com", "Diploma in Civil Engineering"],
      optionsEn: ["B.A. (Arts)", "B.Sc. (Maths, Physics & Chemistry)", "B.Com", "Diploma in Civil Engineering"],
      correctIndex: 1,
      explanation: "तकनीकी पद SI (अंगुल चिन्ह, QD व फोटो) हेतु मान्यता प्राप्त विश्वविद्यालय से गणित, भौतिक शास्त्र व रसायन शास्त्र (PCM) के साथ B.Sc. अनिवार्य है।",
      explanationEn: "For Technical SI posts (Fingerprint, QD & Photo), a B.Sc. degree with Mathematics, Physics, and Chemistry (PCM) is required.",
    },
  ];

  // Document payload
  const doc = {
    _id: docId,
    _type: "notification",
    title: "MPSI भर्ती 2026: 507 पदों (उप निरीक्षक एवं सूबेदार) के लिए अधिसूचना जारी, ऑनलाइन आवेदन, आयु, योग्यता व विस्तृत परीक्षा पैटर्न",
    titleEn: "MPSI Recruitment 2026 Notification Out: 507 Posts for Sub-Inspector & Subedar, Apply Online, Age Limit, Eligibility & Exam Pattern",
    slug: {
      _type: "slug",
      current: docId,
    },
    exam: "MP Police / ESB",
    date: "2026-09-02T10:00:00Z",
    status: "out",
    url: "https://esb.mp.gov.in",
    officialPdfUrl: "https://esb.mp.gov.in",
    applyOnlineUrl: "https://esb.mp.gov.in",
    youtubeUrl: "https://www.youtube.com/live/7J3YPQLgMAk?si=C2b5IQIempvtRtc7",
    totalPosts: "507 पद (सूबेदार: 81 | SI जिला पुलिस: 312 | SI SAF: 69 | तकनीकी SI: 45)",
    totalPostsEn: "507 Posts (Subedar: 81 | SI DEF: 312 | SI SAF: 69 | Technical SI: 45)",
    ageLimit: "18 से 33 वर्ष (म.प्र. आरक्षित/महिला: 38-43 वर्ष)",
    ageLimitEn: "18 to 33 Years (38-43 Years for MP Reserved/Females)",
    qualification: "स्नातक (Graduation) / डिप्लोमा (Mechanical) / BSc (PCM)",
    qualificationEn: "Graduation (Any Stream) / Diploma (Mechanical) / BSc (PCM)",
    startDate: "2026-09-09",
    endDate: "2026-09-23",
    examDate: "28 अक्टूबर 2026, बुधवार से प्रारंभ",
    examDateEn: "Starts from 28 October 2026 (Wednesday)",
    description: "मध्य प्रदेश कर्मचारी चयन मंडल (MPESB), भोपाल ने पुलिस मुख्यालय गृह (पुलिस) विभाग अंतर्गत सूबेदार एवं उप निरीक्षक (MPSI) संवर्ग भर्ती 2026 की आधिकारिक अधिसूचना जारी कर दी है। कुल 507 पदों पर सीधी भर्ती हेतु आवेदन 09 सितंबर 2026 से प्रारंभ होंगे। जानें आयु, पात्रता, परीक्षा पैटर्न व संपूर्ण रणनीति।",
    descriptionEn: "Madhya Pradesh Employees Selection Board (MPESB), Bhopal has released the official notification for MP Police Sub-Inspector (MPSI) & Subedar Recruitment 2026 for 507 vacancies. Online applications start from 09 September 2026. Check eligibility, age limit, exam pattern, and detailed syllabus.",
    featuredImage: {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: thumbAsset._id,
      },
      alt: "MPSI Recruitment 2026 Notification Out Sub Inspector & Subedar Total Posts Salary Exam Date Syllabus Strategy",
      caption: "MP Police Subedar / उप निरीक्षक (MPSI) भर्ती परीक्षा 2026 - कुल 507 पद आधिकारिक अधिसूचना जारी बैनर",
    },
    body: bodyHi,
    bodyEn: bodyEn,
    faqs: faqs,
    mcqs: mcqs,
  };

  console.log(`Creating/Replacing document ${docId} in Sanity...`);
  const res = await client.createOrReplace(doc);
  console.log("Successfully uploaded to Sanity CMS! Document ID:", res._id);
}

main().catch((err) => {
  console.error("Error uploading MPSI notification to Sanity:", err);
  process.exit(1);
});
