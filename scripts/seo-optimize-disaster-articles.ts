import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import path from "path";

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
  console.log("🚀 Enhancing Disaster Management Articles for Google #1 SEO & AI Overview Optimization...");

  const conceptUrl = "/general-awareness/what-is-disaster-management-ncert-types-mppsc-notes";
  const actUrl = "/current-affairs/disaster-management-amendment-act-2025-mppsc-upsc-notes";
  const mainsUrl = "/mppsc/mains-syllabus";
  const heroAssetId = "image-cafdf2307b0ec91a044dee3d6b93817a88778fbb-1024x1024-jpg";

  // Comprehensive SEO Body for "आपदा प्रबंधन क्या है? अर्थ, प्रकार, 6 चरण, MPPSC Mains Notes"
  const enhancedConceptBody = [
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "आपदा प्रबंधन (Disaster Management) राज्य एवं राष्ट्र के सतत विकास और लोक कल्याण का एक अत्यंत महत्वपूर्ण स्तंभ है। ",
        },
        {
          _type: "span",
          marks: ["strong"],
          text: "MPPSC मुख्य परीक्षा (GS Paper 3 Unit 5 एवं GS Paper 4 Part B Unit 3)",
        },
        {
          _type: "span",
          text: " तथा ",
        },
        {
          _type: "span",
          marks: ["strong"],
          text: "UPSC मुख्य परीक्षा (GS Paper 3)",
        },
        {
          _type: "span",
          text: " में आपदा प्रबंधन पर सीधे प्रश्न पूछे जाते हैं। इस विस्तृत लेख में आपदा की परिभाषा, प्रकार, 4 मुख्य घटक, 6 चरण, मध्य प्रदेश का संदर्भ (DMI भोपाल), सुदूर संवेदन (Remote Sensing/GIS) की भूमिका एवं MPPSC 2, 7 व 10 अंकों के मॉडल उत्तरों का पूरा समावेश है।",
        },
      ],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        { _type: "span", text: "⚡ " },
        { _type: "span", text: `[नवीनतम कानून पढ़ें: आपदा प्रबंधन (संशोधन) अधिनियम 2025: मुख्य प्रावधान व UDMA धारा 41A](${actUrl})` },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "आपदा प्रबंधन क्या होता है? परिभाषा व अर्थ (Definition & Meaning)" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "आपदा अधिनियम 2005 के अनुसार, ",
        },
        {
          _type: "span",
          marks: ["strong"],
          text: "आपदा (Disaster)",
        },
        {
          _type: "span",
          text: " किसी भी क्षेत्र में होने वाली ऐसी गंभीर तबाही, दुर्घटना या आपदा है जो प्राकृतिक या मानव निर्मित कारणों से उत्पन्न होती है और जिससे बड़े पैमाने पर जन-धन की हानि, जीवन की क्षति तथा पर्यावरण का विनाश होता है, जो प्रभावित समाज की अपनी क्षमताओं से परे होती है।",
        },
      ],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "आपदा प्रबंधन एक सतत और एकीकृत प्रक्रिया है जिसमें आपदाओं की रोकथाम, शमन, तैयारियों, त्वरित प्रतिक्रिया, राहत व पुनर्निर्माण का आयोजन शामिल है।",
        },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "आपदा किसे कहते हैं? आपदाओं का वर्गीकरण व प्रकार (Types of Disasters)" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        { _type: "span", text: "• " },
        { _type: "span", marks: ["strong"], text: "1. प्राकृतिक आपदाएँ (Natural Disasters): " },
        { _type: "span", text: "भूकंप, बाढ़, चक्रवात, सुनामी, सूखा, भूस्खलन, ओलावृष्टि व बादल फटना।" },
      ],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        { _type: "span", text: "• " },
        { _type: "span", marks: ["strong"], text: "2. मानव निर्मित आपदाएँ (Man-made Disasters): " },
        { _type: "span", text: "औद्योगिक/रासायनिक दुर्घटनाएँ (उदा. 1984 भोपाल गैस त्रासदी), आगजनी, महामारी, परमाणु दुर्घटनाएँ व भगदड़।" },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "आपदा के 10 मुख्य कारण (10 Major Causes of Disasters)" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        { _type: "span", text: "• " },
        { _type: "span", marks: ["strong"], text: "1. अनियंत्रित शहरीकरण: " },
        { _type: "span", text: "अवैध निर्माण एवं प्राकृतिक जल निकासी मार्गों का अवरोध।" },
      ],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        { _type: "span", text: "• " },
        { _type: "span", marks: ["strong"], text: "2. वनों की अंधाधुंध कटाई (Deforestation): " },
        { _type: "span", text: "मृदा अपरदन एवं भूस्खलन का मुख्य कारण।" },
      ],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        { _type: "span", text: "• " },
        { _type: "span", marks: ["strong"], text: "3. जलवायु परिवर्तन (Climate Change): " },
        { _type: "span", text: "चरम मौसमी घटनाएँ जैसे बादल फटना और तीव्र चक्रवात।" },
      ],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        { _type: "span", text: "• " },
        { _type: "span", marks: ["strong"], text: "4. औद्योगिक लापरवाही: " },
        { _type: "span", text: "सुरक्षा मानकों की अनदेखी और विशाक्त रसायनों का रिसाव।" },
      ],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        { _type: "span", text: "• " },
        { _type: "span", marks: ["strong"], text: "5. विवर्तनिक गतिविधियाँ (Tectonic Activities): " },
        { _type: "span", text: "पृथ्वी की प्लेटों की गति से उत्पन्न भूकंप और सुनामी।" },
      ],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        { _type: "span", text: "• " },
        { _type: "span", marks: ["strong"], text: "6. अवसंरचनात्मक विफलता: " },
        { _type: "span", text: "पुराने बांधों का टूटना या पुलों का ध्वस्त होना।" },
      ],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        { _type: "span", text: "• " },
        { _type: "span", marks: ["strong"], text: "7. जनसंख्या दबाव: " },
        { _type: "span", text: "संवेदनशील एवं जोखिम भरे क्षेत्रों में घनी आबादी का निवास।" },
      ],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        { _type: "span", text: "• " },
        { _type: "span", marks: ["strong"], text: "8. जल प्रबंधन का अभाव: " },
        { _type: "span", text: "अत्यधिक सिंचाई, नदियों का अतिक्रमण एवं भूजल का दोहन।" },
      ],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        { _type: "span", text: "• " },
        { _type: "span", marks: ["strong"], text: "9. पूर्व चेतावनी प्रणाली की कमी: " },
        { _type: "span", text: "समय पर सूचना न मिलने से जनहानि में वृद्धि।" },
      ],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        { _type: "span", text: "• " },
        { _type: "span", marks: ["strong"], text: "10. जन-जॉगरुकता का अभाव: " },
        { _type: "span", text: "आपदा के समय क्या करें और क्या न करें की जानकारी न होना।" },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "आपदा के 4 मुख्य प्रभाव (4 Major Impacts of Disasters)" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        { _type: "span", text: "• " },
        { _type: "span", marks: ["strong"], text: "1. सामाजिक प्रभाव: " },
        { _type: "span", text: "मानव जीवन की हानि, बेघर होना, परिवारों का विस्थापन एवं स्वास्थ्य संकट।" },
      ],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        { _type: "span", text: "• " },
        { _type: "span", marks: ["strong"], text: "2. आर्थिक प्रभाव: " },
        { _type: "span", text: "अवसंरचनात्मक विनाश, कृषि व व्यवसायों का नुकसान, भारी वित्तीय बोझ।" },
      ],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        { _type: "span", text: "• " },
        { _type: "span", marks: ["strong"], text: "3. पर्यावरणीय प्रभाव: " },
        { _type: "span", text: "मृदा अपरदन, जैव विविधता की क्षति, जल प्रदूषण व पारिस्थितिकी क्षरण।" },
      ],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        { _type: "span", text: "• " },
        { _type: "span", marks: ["strong"], text: "4. मनोवैज्ञानिक प्रभाव: " },
        { _type: "span", text: "आपदा के बाद पीड़ितों में मानसिक तनाव (PTSD), भय एवं अवसाद।" },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "आपदा प्रबंधन के 4 मुख्य घटक (4 Pillars / Components)" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        { _type: "span", text: "• " },
        { _type: "span", marks: ["strong"], text: "1. रोकथाम (Prevention): " },
        { _type: "span", text: "आपदा के खतरों को पूरी तरह टालने के प्रयास करना।" },
      ],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        { _type: "span", text: "• " },
        { _type: "span", marks: ["strong"], text: "2. शमन (Mitigation): " },
        { _type: "span", text: "आपदा के दुष्प्रभावों को कम करने के दीर्घकालिक उपाय (उदा. तटबंध निर्माण, भूकंपरोधी मकान)।" },
      ],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        { _type: "span", text: "• " },
        { _type: "span", marks: ["strong"], text: "3. तैयारी (Preparedness): " },
        { _type: "span", text: "आपदा आने से पहले पूर्व चेतावनी, योजनाएँ, मॉक ड्रिल एवं राहत सामग्री भंडारण।" },
      ],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        { _type: "span", text: "• " },
        { _type: "span", marks: ["strong"], text: "4. प्रतिक्रिया व पुनर्प्राप्ति (Response & Recovery): " },
        { _type: "span", text: "आपदा के तुरंत बाद खोज व बचाव (NDRF/SDRF) तथा दीर्घकालिक पुनर्वास।" },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "मध्य प्रदेश का संदर्भ: आपदा प्रबंधन संस्थान (DMI Bhopal) व राज्य ढांचा" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          marks: ["strong"],
          text: "Disaster Management Institute (DMI) Bhopal: ",
        },
        {
          _type: "span",
          text: "1984 की भोपाल गैस त्रासदी के बाद 1987 में स्थापित आपदा प्रबंधन संस्थान (DMI), भोपाल एशिया का पहला स्वायत्त संस्थान है जो आपदा प्रबंधन में प्रशिक्षण, अनुसंधान और नीति निर्धारण का कार्य करता है।",
        },
      ],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        { _type: "span", text: "• " },
        { _type: "span", marks: ["strong"], text: "MP SDMA: " },
        { _type: "span", text: "मध्य प्रदेश राज्य आपदा प्रबंधन प्राधिकरण (अध्यक्ष: मुख्यमंत्री) राज्य स्तर पर आपदा राहत और नीति का क्रियान्वयन करता है।" },
      ],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        { _type: "span", text: "• " },
        { _type: "span", marks: ["strong"], text: "मध्य प्रदेश की मुख्य आपदाएँ: " },
        { _type: "span", text: "मालवा एवं बुंदेलखंड में सूखा, नर्मदा व चंबल नदी घाटियों में बाढ़, औद्योगिक दुर्घटनाएँ तथा भूकंपीय संवेदनशीलता (Zone II & III)।" },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "आधुनिक तकनीक: सुदूर संवेदन (Remote Sensing) व GIS की भूमिका" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "MPPSC Mains परीक्षा में Remote Sensing & GIS अनुप्रयोगों पर प्रश्न अनिवार्य रूप से पूछा जाता है:",
        },
      ],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        { _type: "span", text: "• " },
        { _type: "span", marks: ["strong"], text: "आपदा पूर्व मैपिंग: " },
        { _type: "span", text: "सैटेलाइट इमेजरी की मदद से बाढ़ व चक्रवात के जोखिम वाले क्षेत्रों का नक्शा तैयार करना।" },
      ],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        { _type: "span", text: "• " },
        { _type: "span", marks: ["strong"], text: "पूर्व चेतावनी (Early Warning System): " },
        { _type: "span", text: "मौसम संबंधी आँकड़ों और उपग्रह से प्राप्त चित्रों के आधार पर समय पर अलर्ट जारी करना।" },
      ],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        { _type: "span", text: "• " },
        { _type: "span", marks: ["strong"], text: "क्षति का सटीक मूल्यांकन: " },
        { _type: "span", text: "आपदा के तुरंत बाद बाढ़ प्रभावित फसलों और क्षतिग्रस्त बुनियादी ढांचे की रियल-टाइम सैटेलाइट मैपिंग।" },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "MPPSC Mains मॉडल उत्तर प्रारूप (2, 7 एवं 10 अंकीय प्रश्न)" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        { _type: "span", text: "📌 " },
        { _type: "span", marks: ["strong"], text: "2-Marker: NDMA (राष्ट्रीय आपदा प्रबंधन प्राधिकरण)" },
      ],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        { _type: "span", text: "उत्तर: 1. स्थापना: आपदा प्रबंधन अधिनियम 2005 के तहत। 2. अध्यक्ष: भारत के प्रधानमंत्री। 3. कार्य: देश में आपदा प्रबंधन की नीतियाँ व दिशानिर्देश बनाना।" },
      ],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        { _type: "span", text: "📌 " },
        { _type: "span", marks: ["strong"], text: "7-Marker: आपदा प्रबंधन चक्र के प्रमुख चरणों को समझाइए।" },
      ],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        { _type: "span", text: "उत्तर: आपदा प्रबंधन चक्र 3 मुख्य चरणों में विभक्त है: (A) आपदा-पूर्व: शमन, रोकथाम व तैयारी। (B) आपदा के दौरान: खोज, बचाव (NDRF/SDRF) व त्वरित सहायता। (C) आपदा-पश्चात: पुनर्वास, पुनर्निर्माण व 'बिल्ड बैक बेटर' (Build Back Better) की रणनीति।" },
      ],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "👉 ",
        },
        {
          _type: "span",
          text: `[MPPSC Mains Syllabus 2026 PDF Download in Hindi (Paper 1 to Paper 6)](${mainsUrl})`,
        },
      ],
    },
  ];

  // High-Intent FAQs for Google PAA (People Also Ask)
  const conceptFaqs = [
    {
      question: "आपदा प्रबंधन क्या होता है?",
      answer: "आपदा प्रबंधन एक एकीकृत प्रक्रिया है जिसके अंतर्गत प्राकृतिक या मानव-निर्मित आपदाओं के प्रभाव को कम करने के लिए रोकथाम, शमन, पूर्व तैयारी, खोज व बचाव, राहत एवं पुनर्निर्माण का कार्य किया जाता है।",
    },
    {
      question: "आपदा प्रबंधन की परिभाषा क्या है?",
      answer: "आपदा अधिनियम 2005 के अनुसार, आपदा प्रबंधन जीवन व संपत्ति के नुकसान को रोकने, जोखिम को कम करने और आपदाओं के बाद समाज के पुनर्वास हेतु बनाई गई संगठित योजना और कार्यान्वयन है।",
    },
    {
      question: "आपदा किसे कहते हैं और यह कितने प्रकार की होती है?",
      answer: "आपदा किसी क्षेत्र में होने वाली वह गंभीर घटना है जिससे भारी जन-धन की हानि होती है। यह मुख्य रूप से 2 प्रकार की होती है: 1. प्राकृतिक आपदाएँ (भूकंप, बाढ़, चक्रवात) और 2. मानव-निर्मित आपदाएँ (औद्योगिक दुर्घटनाएँ, आग, महामारी)।",
    },
    {
      question: "आपदा के 10 मुख्य कारण क्या हैं?",
      answer: "आपदा के 10 मुख्य कारणों में अनियंत्रित शहरीकरण, वनों की कटाई, जलवायु परिवर्तन, औद्योगिक लापरवाही, विवर्तनिक प्लेट हलचल, पुराने बुनियादी ढाँचे, जनसंख्या दबाव, जल अवप्रबंधन, पूर्व चेतावनी की कमी और जन-जागरूकता का अभाव शामिल हैं।",
    },
    {
      question: "आपदा के 4 मुख्य प्रभाव क्या हैं?",
      answer: "आपदा के 4 मुख्य प्रभाव हैं: 1. सामाजिक (जनहानि व विस्थापन), 2. आर्थिक (वित्तीय नुकसान व व्यापार में बाधा), 3. पर्यावरणीय (मृदा व जैव विविधता का ह्रास), और 4. मनोवैज्ञानिक (मानसिक तनाव व अवसाद)।",
    },
    {
      question: "आपदा प्रबंधन के 4 घटक क्या हैं?",
      answer: "आपदा प्रबंधन के 4 प्रमुख स्तंभ (घटक) हैं: 1. रोकथाम (Prevention), 2. शमन (Mitigation), 3. तैयारी (Preparedness), और 4. प्रतिक्रिया एवं पुनर्प्राप्ति (Response & Recovery)।",
    },
    {
      question: "DMI भोपाल (Disaster Management Institute) की स्थापना कब और क्यों हुई?",
      answer: "DMI भोपाल की स्थापना 1984 की भोपाल गैस त्रासदी के बाद 1987 में मध्य प्रदेश सरकार द्वारा की गई थी। यह एशिया का पहला आपदा प्रबंधन प्रशिक्षण व अनुसंधान संस्थान है।",
    },
  ];

  // MCQs for Quizzes
  const conceptMcqs = [
    {
      question: "भारत में राष्ट्रीय आपदा प्रबंधन प्राधिकरण (NDMA) का पदेन अध्यक्ष कौन होता है?",
      options: ["केंद्रीय गृह मंत्री", "भारत के राष्ट्रपति", "भारत के प्रधानमंत्री", "पर्यावरण मंत्री"],
      correctIndex: 2,
      explanation: "आपदा प्रबंधन अधिनियम 2005 की धारा 3(2) के तहत भारत के प्रधानमंत्री NDMA के पदेन अध्यक्ष होते हैं।",
    },
    {
      question: "एशिया का प्रथम आपदा प्रबंधन संस्थान (DMI) कहाँ स्थित है?",
      options: ["इंदौर", "भोपाल", "नई दिल्ली", "नागपुर"],
      correctIndex: 1,
      explanation: "DMI (Disaster Management Institute) भोपाल में स्थित है, जिसकी स्थापना 1987 में की गई थी।",
    },
    {
      question: "आपदा प्रबंधन (संशोधन) अधिनियम, 2025 के तहत किस नए प्राधिकरण के गठन का प्रावधान किया गया है?",
      options: ["NDMA", "SDMA", "UDMA (शहरी आपदा प्रबंधन प्राधिकरण)", "DDMA"],
      correctIndex: 2,
      explanation: "2025 के संशोधन अधिनियम की धारा 41A के तहत राज्य सरकारों को राज्य की राजधानी तथा बड़े शहरों हेतु UDMA के गठन का अधिकार दिया गया है।",
    },
  ];

  console.log("📝 Updating 'gk-what-is-disaster-management-ncert' with SEO Google PAA & MPPSC Mains topics...");
  await client
    .patch("gk-what-is-disaster-management-ncert")
    .set({
      title: "आपदा प्रबंधन क्या है? अर्थ, प्रकार, 6 चरण, MPPSC Mains Notes व DMI भोपाल",
      excerpt: "आपदा प्रबंधन (Disaster Management) की परिभाषा, प्रकार, 4 घटक, 10 कारण, 4 प्रभाव, DMI भोपाल, सुदूर संवेदन (GIS) व MPPSC Mains (Paper 3 Unit 5) उत्तर लेखन नोट्स।",
      keywords: [
        "आपदा प्रबंधन क्या है",
        "aapda prabandhan mppsc mains",
        "aapda prabandhan in hindi",
        "dmi bhopal disaster management",
        "mppsc mains paper 3 unit 5 notes",
        "आपदा के 10 कारण",
        "आपदा के 4 घटक",
        "आपदा प्रबंधन अधिनियम 2005",
      ],
      featuredImage: {
        _type: "image",
        asset: { _type: "reference", _ref: heroAssetId },
        alt: "NDRF Rescue Operation - Disaster Management MPPSC Mains Notes",
      },
      category: { _type: "reference", _ref: "cat-disaster-management" },
      body: enhancedConceptBody,
      faqs: conceptFaqs,
      mcqs: conceptMcqs,
    })
    .commit();
  console.log("✅ Successfully updated 'gk-what-is-disaster-management-ncert'!");

  console.log("🌐 Triggering Vercel live cache revalidation...");
  try {
    const fetchRes = await fetch("https://www.aakarias.com/api/revalidate?secret=aakar-ias-revalidation-secret-key-2026&path=all");
    const json = await fetchRes.json();
    console.log("🔄 Revalidation output:", json);
  } catch (err) {
    console.warn("⚠️ Revalidation fetch failed:", err);
  }
}

main().catch((err) => {
  console.error("❌ Execution error:", err);
  process.exit(1);
});
