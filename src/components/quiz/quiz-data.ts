export interface Option {
  key: "A" | "B" | "C" | "D";
  textHi: string;
  textEn: string;
}

export interface Question {
  id: string;
  subjectHi: string;
  subjectEn: string;
  textHi: string;
  textEn: string;
  options: Option[];
  correctAnswer: "A" | "B" | "C" | "D";
  explanationHi: string;
  explanationEn: string;
}

export interface Quiz {
  id: string;
  titleHi: string;
  titleEn: string;
  descriptionHi: string;
  descriptionEn: string;
  categoryHi: string;
  categoryEn: string;
  durationMins: number;
  questionsCount: number;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  questions: Question[];
  subject?: string;
}

export const quizzes: Quiz[] = [
  {
    id: "todays-quiz",
    titleHi: "आज का लाइव क्विज़ (24 मई)",
    titleEn: "Today's Live Quiz (24th May)",
    descriptionHi: "24 मई के करेंट अफेयर्स का विस्तृत विश्लेषण और अभ्यास।",
    descriptionEn: "Comprehensive analysis and practice of 24th May current affairs.",
    categoryHi: "दैनिक करेंट अफेयर्स",
    categoryEn: "Daily Current Affairs",
    durationMins: 5,
    questionsCount: 5,
    difficulty: "MEDIUM",
    questions: [
      {
        id: "q1-ca",
        subjectHi: "करेंट अफेयर्स - पर्यावरण",
        subjectEn: "Current Affairs - Environment",
        textHi: "राष्ट्रीय स्वच्छ वायु कार्यक्रम (NCAP) के संदर्भ में निम्नलिखित कथनों पर विचार करें:\n1. इसका उद्देश्य अगले 5 वर्षों में PM2.5 और PM10 सांद्रता में 20-30% की कमी लाना है।\n2. यह देश भर के सभी शहरों में लागू एक कानूनी रूप से बाध्यकारी कार्यक्रम है।\nउपरोक्त में से कौन सा/से कथन सही है/हैं?",
        textEn: "Consider the following statements regarding the 'National Clean Air Programme' (NCAP):\n1. It aims to achieve a 20-30% reduction in PM2.5 and PM10 concentrations in the next 5 years.\n2. It is a legally binding programme implemented in all cities across the country.\nWhich of the statements given above is/are correct?",
        options: [
          { key: "A", textHi: "केवल 1", textEn: "1 only" },
          { key: "B", textHi: "केवल 2", textEn: "2 only" },
          { key: "C", textHi: "1 और 2 दोनों", textEn: "Both 1 and 2" },
          { key: "D", textHi: "न तो 1 और न ही 2", textEn: "Neither 1 nor 2" }
        ],
        correctAnswer: "A",
        explanationHi: "राष्ट्रीय स्वच्छ वायु कार्यक्रम (NCAP) एक गैर-बाध्यकारी (non-binding) नीतिगत दस्तावेज है जिसका उद्देश्य वायु गुणवत्ता में सुधार करना है। इसलिए कथन 2 गलत है। कथन 1 बिल्कुल सही है, इसका लक्ष्य 2024 तक (आधार वर्ष 2017) PM सांद्रता में 20-30% की कमी लाना है जिसे बाद में संशोधित किया गया है।",
        explanationEn: "The National Clean Air Programme (NCAP) is a multi-sectoral, non-binding initiative to reduce particulate matter levels. Hence statement 2 is incorrect. Statement 1 is correct as it targetted a 20-30% reduction of PM2.5 and PM10 concentration levels by 2024 with 2017 as the base year."
      },
      {
        id: "q2-ca",
        subjectHi: "अंतर्राष्ट्रीय संबंध",
        subjectEn: "International Relations",
        textHi: "हाल ही में चर्चा में रहे G7 शिखर सम्मेलन के संबंध में निम्नलिखित कथनों पर विचार कीजिए:\n1. भारत G7 समूह का संस्थापक सदस्य है।\n2. यूरोपीय संघ G7 में एक गैर-गणित सदस्य के रूप में भाग लेता है।\nउपरोक्त कथनों में से कौन सा/से सही है/हैं?",
        textEn: "With reference to the G7 Summit recently in the news, consider the following statements:\n1. India is a founding member of the G7 group.\n2. The European Union participates in the G7 as a non-enumerated member.\nWhich of the statements given above is/are correct?",
        options: [
          { key: "A", textHi: "केवल 1", textEn: "1 only" },
          { key: "B", textHi: "केवल 2", textEn: "2 only" },
          { key: "C", textHi: "1 और 2 दोनों", textEn: "Both 1 and 2" },
          { key: "D", textHi: "न तो 1 और न ही 2", textEn: "Neither 1 nor 2" }
        ],
        correctAnswer: "B",
        explanationHi: "भारत G7 का सदस्य नहीं है, हालांकि इसे अक्सर अतिथि देश के रूप में आमंत्रित किया जाता है। इसलिए कथन 1 गलत है। यूरोपीय संघ (EU) G7 की बैठकों में भाग लेता है लेकिन उसे पूर्ण सदस्य के अधिकार प्राप्त नहीं हैं। इसलिए कथन 2 सही है।",
        explanationEn: "India is not a member of the G7 (Group of Seven), though it is frequently invited as a guest nation. Hence statement 1 is incorrect. The European Union is a unique non-enumerated participant in the G7 since 1977. Hence statement 2 is correct."
      },
      {
        id: "q3-ca",
        subjectHi: "कृषि व अर्थव्यवस्था",
        subjectEn: "Agriculture & Economy",
        textHi: "हाल ही में भौगोलिक संकेत (GI) टैग प्राप्त करने वाले 'बुरहानपुर केला' का संबंध किस राज्य से है?",
        textEn: "The 'Burhanpur Banana' which recently received the Geographical Indication (GI) tag belongs to which state?",
        options: [
          { key: "A", textHi: "मध्य प्रदेश", textEn: "Madhya Pradesh" },
          { key: "B", textHi: "महाराष्ट्र", textEn: "Maharashtra" },
          { key: "C", textHi: "गुजरात", textEn: "Gujarat" },
          { key: "D", textHi: "उत्तर प्रदेश", textEn: "Uttar Pradesh" }
        ],
        correctAnswer: "A",
        explanationHi: "मध्य प्रदेश के बुरहानपुर जिले के प्रसिद्ध केले को इसके अनूठे स्वाद और मिठास के लिए भौगोलिक संकेत (GI Tag) प्रदान किया गया है। बुरहानपुर केला उत्पादन का एक प्रमुख केंद्र है।",
        explanationEn: "Burhanpur is located in Madhya Pradesh and is widely known for its banana cultivation. The Burhanpur Banana was granted a Geographical Indication (GI) tag due to its unique aroma, taste, and quality characteristics."
      },
      {
        id: "q4-ca",
        subjectHi: "विज्ञान व तकनीक",
        subjectEn: "Science & Technology",
        textHi: "'डीपफेक' तकनीक के संदर्भ में, निम्नांकित में से कौन सा कृत्रिम बुद्धिमत्ता (AI) मॉडल मुख्य रूप से यथार्थवादी सिंथेटिक मीडिया बनाने के लिए उपयोग किया जाता है?",
        textEn: "In the context of 'Deepfake' technology, which of the following artificial intelligence models is primarily used to generate realistic synthetic media?",
        options: [
          { key: "A", textHi: "जेनरेटिव एडवरसेरियल नेटवर्क (GAN)", textEn: "Generative Adversarial Networks (GANs)" },
          { key: "B", textHi: "सपोर्ट वेक्टर मशीन (SVM)", textEn: "Support Vector Machines (SVM)" },
          { key: "C", textHi: "लिनियर रिग्रेशन", textEn: "Linear Regression" },
          { key: "D", textHi: "रैंडम फॉरेस्ट", textEn: "Random Forest" }
        ],
        correctAnswer: "A",
        explanationHi: "डीपफेक जेनरेटिव एडवरसेरियल नेटवर्क (GAN) नामक एआई पद्धति का उपयोग करते हैं, जिसमें दो न्यूरल नेटवर्क (जनरेटर और डिस्क्रिमिनेटर) एक-दूसरे के विपरीत काम करके अत्यधिक यथार्थवादी सिंथेटिक तस्वीरें और वीडियो बनाते हैं।",
        explanationEn: "Deepfakes are created using Generative Adversarial Networks (GANs), a class of machine learning frameworks where two neural networks contest with each other to generate highly realistic synthetic media."
      },
      {
        id: "q5-ca",
        subjectHi: "भारतीय राजव्यवस्था",
        subjectEn: "Indian Polity",
        textHi: "भारतीय संविधान का कौन सा अनुच्छेद संसद के अवकाश के दौरान अध्यादेश जारी करने की राष्ट्रपति की शक्ति से संबंधित है?",
        textEn: "Which article of the Indian Constitution grants the President the power to promulgate ordinances during the recess of Parliament?",
        options: [
          { key: "A", textHi: "अनुच्छेद 72", textEn: "Article 72" },
          { key: "B", textHi: "अनुच्छेद 110", textEn: "Article 110" },
          { key: "C", textHi: "अनुच्छेद 123", textEn: "Article 123" },
          { key: "D", textHi: "अनुच्छेद 213", textEn: "Article 213" }
        ],
        correctAnswer: "C",
        explanationHi: "संविधान का अनुच्छेद 123 राष्ट्रपति को अध्यादेश जारी करने का अधिकार देता है जब संसद के दोनों सदनों में से कोई भी सत्र में न हो। अनुच्छेद 213 राज्यपाल की अध्यादेश शक्ति से संबंधित है।",
        explanationEn: "Article 123 of the Constitution empowers the President of India to promulgate ordinances when either of the two Houses of Parliament is not in session. Article 213 is related to the Governor's power to issue ordinances."
      }
    ]
  },
  {
    id: "economics-special",
    titleHi: "अर्थशास्त्र विशेष: राजकोषीय नीति",
    titleEn: "Economics Special: Fiscal Policy",
    descriptionHi: "राजकोषीय उत्तरदायित्व और बजट प्रबंधन (FRBM) अधिनियम, कराधान और जीएसटी परिषद से संबंधित महत्वपूर्ण प्रश्न।",
    descriptionEn: "Important questions related to FRBM Act, taxation structure, and the GST Council.",
    categoryHi: "अर्थव्यवस्था",
    categoryEn: "Economy",
    durationMins: 15,
    questionsCount: 5,
    difficulty: "MEDIUM",
    questions: [
      {
        id: "q1-eco",
        subjectHi: "राजकोषीय नीति",
        subjectEn: "Fiscal Policy",
        textHi: "राजकोषीय उत्तरदायित्व और बजट प्रबंधन (FRBM) अधिनियम, 2003 के तहत निर्धारित प्रमुख लक्ष्यों में से एक था:",
        textEn: "One of the key targets set under the Fiscal Responsibility and Budget Management (FRBM) Act, 2003 was to:",
        options: [
          { key: "A", textHi: "राजस्व घाटे को शून्य पर लाना", textEn: "Eliminate revenue deficit to zero" },
          { key: "B", textHi: "प्राथमिक घाटे को समाप्त करना", textEn: "Eliminate primary deficit entirely" },
          { key: "C", textHi: "विदेशी ऋण को जीडीपी के 10% से कम करना", textEn: "Reduce foreign debt to less than 10% of GDP" },
          { key: "D", textHi: "मुद्रास्फीति को 2% पर स्थिर रखना", textEn: "Stabilize inflation at 2% flat" }
        ],
        correctAnswer: "A",
        explanationHi: "FRBM अधिनियम 2003 का मुख्य मूल लक्ष्य राजस्व घाटे को समाप्त करना (यानी शून्य पर लाना) और राजकोषीय घाटे को सकल घरेलू उत्पाद (GDP) के 3% तक सीमित करना था।",
        explanationEn: "The original target of the FRBM Act, 2003 was to eliminate the revenue deficit (reducing it to zero) and restrict the fiscal deficit to a manageable 3% of the GDP."
      },
      {
        id: "q2-eco",
        subjectHi: "कराधान",
        subjectEn: "Taxation",
        textHi: "निम्नलिखित में से कौन सा कर प्रत्यक्ष कर (Direct Tax) का उदाहरण है?",
        textEn: "Which of the following taxes is an example of a Direct Tax?",
        options: [
          { key: "A", textHi: "वस्तु एवं सेवा कर (GST)", textEn: "Goods and Services Tax (GST)" },
          { key: "B", textHi: "सीमा शुल्क (Customs Duty)", textEn: "Customs Duty" },
          { key: "C", textHi: "निगम कर (Corporate Tax)", textEn: "Corporate Income Tax" },
          { key: "D", textHi: "उत्पाद शुल्क (Excise Duty)", textEn: "Excise Duty" }
        ],
        correctAnswer: "C",
        explanationHi: "निगम कर (Corporate Tax) और व्यक्तिगत आयकर प्रत्यक्ष कर हैं क्योंकि इनका भुगतान सीधे करदाता द्वारा सरकार को किया जाता है। GST, सीमा शुल्क और उत्पाद शुल्क अप्रत्यक्ष करों के उदाहरण हैं।",
        explanationEn: "Corporate Income Tax is levied directly on the profits of corporations and cannot be shifted. Hence it is a Direct Tax. GST, Customs, and Excise are indirect taxes whose incidence can be passed to consumers."
      },
      {
        id: "q3-eco",
        subjectHi: "जीएसटी परिषद",
        subjectEn: "GST Council",
        textHi: "जीएसटी परिषद (GST Council) के अध्यक्ष कौन होते हैं?",
        textEn: "Who acts as the Chairperson of the GST Council?",
        options: [
          { key: "A", textHi: "भारत के प्रधान मंत्री", textEn: "Prime Minister of India" },
          { key: "B", textHi: "केंद्रीय वित्त मंत्री", textEn: "Union Finance Minister" },
          { key: "C", textHi: "भारतीय रिजर्व बैंक के गवर्नर", textEn: "Governor of RBI" },
          { key: "D", textHi: "भारत के मुख्य आर्थिक सलाहकार", textEn: "Chief Economic Advisor of India" }
        ],
        correctAnswer: "B",
        explanationHi: "संविधान के अनुच्छेद 279A के तहत स्थापित जीएसटी परिषद की अध्यक्षता भारत के केंद्रीय वित्त मंत्री द्वारा की जाती है। राज्य सरकारों के वित्त मंत्री इसके सदस्य होते हैं।",
        explanationEn: "The GST Council is a constitutional body under Article 279A, and it is chaired by the Union Finance Minister of India."
      },
      {
        id: "q4-eco",
        subjectHi: "बजटीय शब्दावली",
        subjectEn: "Budget Terminology",
        textHi: "'प्राथमिक घाटा' (Primary Deficit) को किस प्रकार मापा जाता है?",
        textEn: "How is 'Primary Deficit' measured?",
        options: [
          { key: "A", textHi: "राजकोषीय घाटा - ब्याज भुगतान", textEn: "Fiscal Deficit - Interest Payments" },
          { key: "B", textHi: "राजस्व घाटा - पूंजीगत व्यय", textEn: "Revenue Deficit - Capital Expenditure" },
          { key: "C", textHi: "कुल व्यय - कुल प्राप्तियां", textEn: "Total Expenditure - Total Receipts" },
          { key: "D", textHi: "राजकोषीय घाटा + सार्वजनिक ऋण", textEn: "Fiscal Deficit + Public Debt" }
        ],
        correctAnswer: "A",
        explanationHi: "प्राथमिक घाटा मौजूदा वर्ष के राजकोषीय घाटे और पिछले ऋणों पर किए जाने वाले ब्याज भुगतान का अंतर होता है। (प्राथमिक घाटा = राजकोषीय घाटा - ब्याज भुगतान)",
        explanationEn: "Primary Deficit is calculated by subtracting interest payments on past borrowings from the current fiscal deficit (Primary Deficit = Fiscal Deficit - Interest Payments)."
      },
      {
        id: "q5-eco",
        subjectHi: "मुद्रास्फीति व मौद्रिक नीति",
        subjectEn: "Inflation & Monetary Policy",
        textHi: "यदि रिज़र्व बैंक नकद आरक्षित अनुपात (CRR) को कम करता है, तो इसका अर्थव्यवस्था पर क्या प्रभाव पड़ेगा?",
        textEn: "If the Reserve Bank of India reduces the Cash Reserve Ratio (CRR), what will be its immediate impact on the economy?",
        options: [
          { key: "A", textHi: "ऋण उपलब्धता में कमी होगी", textEn: "Credit availability will decrease" },
          { key: "B", textHi: "बाजार में तरलता (Money Supply) बढ़ेगी", textEn: "Liquidity in the market will increase" },
          { key: "C", textHi: "ब्याज दरों में तत्काल वृद्धि होगी", textEn: "Interest rates will immediately rise" },
          { key: "D", textHi: "सरकारी बॉन्ड की पैदावार बढ़ेगी", textEn: "Government bond yields will surge" }
        ],
        correctAnswer: "B",
        explanationHi: "नकद आरक्षित अनुपात (CRR) वह राशि है जो बैंकों को आरबीआई के पास नकद रूप में रखनी होती है। यदि CRR घटाया जाता है, तो बैंकों के पास ऋण देने के लिए अधिक धन बचेगा, जिससे बाजार में तरलता (पैसा) बढ़ेगी।",
        explanationEn: "CRR is the share of net demand and time liabilities that banks must keep as cash with RBI. Reducing CRR frees up funds for commercial banks, increasing market liquidity/credit supply."
      }
    ]
  },
  {
    id: "indian-polity",
    titleHi: "राजव्यवस्था मॉक: मौलिक अधिकार",
    titleEn: "Polity Mock: Fundamental Rights",
    descriptionHi: "संविधान के भाग III, अनुच्छेद 12 से 35, न्यायपालिका की व्याख्याओं पर आधारित बहुविकल्पीय प्रश्न।",
    descriptionEn: "Multiple choice questions based on Part III of the Constitution, Articles 12 to 35, and Judicial interpretations.",
    categoryHi: "भारतीय राजव्यवस्था",
    categoryEn: "Indian Polity",
    durationMins: 10,
    questionsCount: 5,
    difficulty: "EASY",
    questions: [
      {
        id: "q1-pol",
        subjectHi: "मौलिक अधिकार",
        subjectEn: "Fundamental Rights",
        textHi: "भारतीय संविधान का निम्नलिखित में से कौन सा अनुच्छेद राष्ट्रपति को वित्तीय आपातकाल घोषित करने का अधिकार देता है?",
        textEn: "Which of the following Articles of the Indian Constitution empowers the President to proclaim a Financial Emergency?",
        options: [
          { key: "A", textHi: "अनुच्छेद 352 / Article 352", textEn: "Article 352 / Article 352" },
          { key: "B", textHi: "अनुच्छेद 360 / Article 360", textEn: "Article 360 / Article 360" },
          { key: "C", textHi: "अनुच्छेद 356 / Article 356", textEn: "Article 356 / Article 356" },
          { key: "D", textHi: "अनुच्छेद 348 / Article 348", textEn: "Article 348 / Article 348" }
        ],
        correctAnswer: "B",
        explanationHi: "अनुच्छेद 360 राष्ट्रपति को वित्तीय आपातकाल लगाने का अधिकार देता है यदि वे आश्वस्त हों कि देश की वित्तीय स्थिरता खतरे में है।",
        explanationEn: "Article 360 of the Indian Constitution contains provisions for financial emergency, allowing the President to issue a proclamation if financial stability is threatened."
      },
      {
        id: "q2-pol",
        subjectHi: "संवैधानिक उपचार",
        subjectEn: "Constitutional Remedies",
        textHi: "डॉ. बी.आर. अम्बेडकर ने किस अधिकार को 'संविधान का हृदय और आत्मा' कहा था?",
        textEn: "Which right was described by Dr. B.R. Ambedkar as the 'Heart and Soul of the Constitution'?",
        options: [
          { key: "A", textHi: "समानता का अधिकार", textEn: "Right to Equality" },
          { key: "B", textHi: "धार्मिक स्वतंत्रता का अधिकार", textEn: "Right to Freedom of Religion" },
          { key: "C", textHi: "संवैधानिक उपचारों का अधिकार", textEn: "Right to Constitutional Remedies" },
          { key: "D", textHi: "स्वतंत्रता का अधिकार", textEn: "Right to Freedom" }
        ],
        correctAnswer: "C",
        explanationHi: "अनुच्छेद 32 (संवैधानिक उपचारों का अधिकार) को डॉ. बी.आर. अम्बेडकर ने भारतीय संविधान का हृदय और आत्मा कहा था क्योंकि यह मौलिक अधिकारों को लागू करने की गारंटी देता है।",
        explanationEn: "Dr. B.R. Ambedkar termed Article 32 (Right to Constitutional Remedies) as the heart and soul of the Constitution because it provides a judicial remedy for the enforcement of fundamental rights."
      },
      {
        id: "q3-pol",
        subjectHi: "निजता का अधिकार",
        subjectEn: "Right to Privacy",
        textHi: "सुप्रीम कोर्ट के किस ऐतिहासिक फैसले में निजता के अधिकार (Right to Privacy) को अनुच्छेद 21 के तहत मौलिक अधिकार घोषित किया गया था?",
        textEn: "In which landmark judgement of the Supreme Court was the 'Right to Privacy' declared a Fundamental Right under Article 21?",
        options: [
          { key: "A", textHi: "केसवानंद भारती केस", textEn: "Kesavananda Bharati Case" },
          { key: "B", textHi: "के.एस. पुट्टास्वामी बनाम भारत संघ", textEn: "K.S. Puttaswamy v. Union of India" },
          { key: "C", textHi: "मेनका गांधी बनाम भारत संघ", textEn: "Maneka Gandhi v. Union of India" },
          { key: "D", textHi: "इंदिरा साहनी केस", textEn: "Indira Sawhney Case" }
        ],
        correctAnswer: "B",
        explanationHi: "वर्ष 2017 में न्यायमूर्ति के.एस. पुट्टास्वामी (सेवानिवृत्त) बनाम भारत संघ मामले में सुप्रीम कोर्ट की 9 जजों की पीठ ने निजता के अधिकार को अनुच्छेद 21 के तहत जीवन और व्यक्तिगत स्वतंत्रता का अभिन्न अंग माना।",
        explanationEn: "In the 2017 K.S. Puttaswamy v. Union of India case, a 9-judge bench of the Supreme Court unanimously declared the Right to Privacy as a fundamental right protected under Article 21."
      },
      {
        id: "q4-pol",
        subjectHi: "रिट क्षेत्राधिकार",
        subjectEn: "Writs Jurisdiction",
        textHi: "अवैध बंदीकरण के खिलाफ व्यक्तिगत स्वतंत्रता की रक्षा के लिए न्यायपालिका द्वारा कौन सी रिट जारी की जाती है?",
        textEn: "Which writ is issued by the judiciary to protect personal liberty against unlawful detention?",
        options: [
          { key: "A", textHi: "बंदी प्रत्यक्षीकरण (Habeas Corpus)", textEn: "Habeas Corpus" },
          { key: "B", textHi: "परमादेश (Mandamus)", textEn: "Mandamus" },
          { key: "C", textHi: "उत्प्रेषण (Certiorari)", textEn: "Certiorari" },
          { key: "D", textHi: "अधिकार पृच्छा (Quo Warranto)", textEn: "Quo Warranto" }
        ],
        correctAnswer: "A",
        explanationHi: "बंदी प्रत्यक्षीकरण (Habeas Corpus) रिट का शाब्दिक अर्थ 'शरीर को प्रस्तुत करना' होता है। यह अवैध हिरासत में लिए गए व्यक्ति को रिहा करने के लिए न्यायालय द्वारा जारी किया जाता है।",
        explanationEn: "Habeas Corpus (meaning 'to have the body') is a writ issued to secure the release of a person who has been unlawfully or arbitrarily detained."
      },
      {
        id: "q5-pol",
        subjectHi: "मौलिक अधिकार - अपवाद",
        subjectEn: "Fundamental Rights - Exceptions",
        textHi: "राष्ट्रीय आपातकाल (अनुच्छेद 352) के दौरान निम्नलिखित में से कौन से मौलिक अधिकार निलंबित नहीं किए जा सकते?",
        textEn: "Which of the following Fundamental Rights cannot be suspended during a National Emergency (Article 352)?",
        options: [
          { key: "A", textHi: "अनुच्छेद 14 और 19", textEn: "Articles 14 and 19" },
          { key: "B", textHi: "अनुच्छेद 19 और 20", textEn: "Articles 19 and 20" },
          { key: "C", textHi: "अनुच्छेद 20 और 21", textEn: "Articles 20 and 21" },
          { key: "D", textHi: "अनुच्छेद 21 और 22", textEn: "Articles 21 and 22" }
        ],
        correctAnswer: "C",
        explanationHi: "44वें संविधान संशोधन अधिनियम, 1978 के बाद, राष्ट्रीय आपातकाल के दौरान भी अनुच्छेद 20 (अपराधों के लिए दोषसिद्धि के संबंध में संरक्षण) और अनुच्छेद 21 (प्राण और दैहिक स्वतंत्रता का अधिकार) को निलंबित नहीं किया जा सकता।",
        explanationEn: "By virtue of the 44th Amendment Act of 1978, the rights guaranteed under Article 20 (Protection in respect of conviction for offenses) and Article 21 (Protection of life and personal liberty) cannot be suspended during a National Emergency."
      }
    ]
  }
];

interface SanityMCQ {
  question?: string;
  questionEn?: string;
  options?: string[];
  optionsEn?: string[];
  correctIndex?: number;
  explanation?: string;
  explanationEn?: string;
}

export interface SanityQuizItem {
  id: string;
  slug?: string;
  titleHi?: string;
  titleEn?: string;
  descriptionHi?: string;
  descriptionEn?: string;
  ca_date?: string;
  publishedAt?: string;
  readingTime?: number;
  mcqs?: SanityMCQ[];
}

export function mapSanityQuizzes(sanityItems: SanityQuizItem[]): Quiz[] {
  if (!Array.isArray(sanityItems)) return [];
  
  return sanityItems.map((item) => {
    const questions = Array.isArray(item.mcqs)
      ? item.mcqs.map((q: SanityMCQ, idx: number) => {
          const keys: ("A" | "B" | "C" | "D")[] = ["A", "B", "C", "D"];
          const options = keys.map((key, optIdx) => {
            return {
              key,
              textHi: q.options?.[optIdx] || q.optionsEn?.[optIdx] || "",
              textEn: q.optionsEn?.[optIdx] || q.options?.[optIdx] || ""
            };
          });
          
          return {
            id: `q-${idx}-${item.id}`,
            subjectHi: "दैनिक करेंट अफेयर्स",
            subjectEn: "Daily Current Affairs",
            textHi: q.question || q.questionEn || "",
            textEn: q.questionEn || q.question || "",
            options,
            correctAnswer: keys[q.correctIndex ?? 0] || "A",
            explanationHi: q.explanation || q.explanationEn || "",
            explanationEn: q.explanationEn || q.explanation || ""
          };
        })
      : [];

    return {
      id: item.slug || item.id,
      titleHi: item.titleHi || "दैनिक क्विज़",
      titleEn: item.titleEn || "Daily Quiz",
      descriptionHi: item.descriptionHi || `${item.ca_date} के करेंट अफेयर्स का अभ्यास।`,
      descriptionEn: item.descriptionEn || `Practice current affairs of ${item.ca_date}.`,
      categoryHi: "दैनिक करेंट अफेयर्स",
      categoryEn: "Daily Current Affairs",
      durationMins: Math.max(5, Math.round((questions.length) * 1.5)),
      questionsCount: questions.length,
      difficulty: "MEDIUM" as const,
      questions
    };
  });
}

export interface SanitySubjectQuizItem {
  id: string;
  slug?: string;
  titleHi?: string;
  titleEn?: string;
  descriptionHi?: string;
  descriptionEn?: string;
  subject?: string;
  difficulty?: string;
  durationMins?: number;
  mcqs?: SanityMCQ[];
}

export function mapSanitySubjectQuizzes(sanityItems: SanitySubjectQuizItem[]): Quiz[] {
  if (!Array.isArray(sanityItems)) return [];

  const subjectMap: Record<string, { hi: string; en: string }> = {
    MPGK: { hi: "मध्य प्रदेश सामान्य ज्ञान", en: "Madhya Pradesh GK" },
    Science: { hi: "सामान्य विज्ञान", en: "General Science" },
    Geography: { hi: "भूगोल", en: "Geography" },
    History: { hi: "इतिहास एवं संस्कृति", en: "History & Culture" },
    Polity: { hi: "राजव्यवस्था एवं शासन", en: "Polity & Governance" },
    Economy: { hi: "अर्थव्यवस्था", en: "Economy" },
    Environment: { hi: "पर्यावरण एवं पारिस्थितिकी", en: "Environment & Ecology" },
  };

  return sanityItems.map((item) => {
    const subInfo = subjectMap[item.subject || ""] || { hi: "विषय-वार क्विज़", en: "Subject Quiz" };
    
    const questions = Array.isArray(item.mcqs)
      ? item.mcqs.map((q: SanityMCQ, idx: number) => {
          const keys: ("A" | "B" | "C" | "D")[] = ["A", "B", "C", "D"];
          const options = keys.map((key, optIdx) => {
            return {
              key,
              textHi: q.options?.[optIdx] || q.optionsEn?.[optIdx] || "",
              textEn: q.optionsEn?.[optIdx] || q.options?.[optIdx] || ""
            };
          });
          
          return {
            id: `q-${idx}-${item.id}`,
            subjectHi: subInfo.hi,
            subjectEn: subInfo.en,
            textHi: q.question || q.questionEn || "",
            textEn: q.questionEn || q.question || "",
            options,
            correctAnswer: keys[q.correctIndex ?? 0] || "A",
            explanationHi: q.explanation || q.explanationEn || "",
            explanationEn: q.explanationEn || q.explanation || ""
          };
        })
      : [];

    return {
      id: item.slug || item.id,
      titleHi: item.titleHi || "विषय-वार क्विज़",
      titleEn: item.titleEn || "Subject Quiz",
      descriptionHi: item.descriptionHi || `अभ्यास क्विज़ - ${subInfo.hi}`,
      descriptionEn: item.descriptionEn || `Practice Quiz - ${subInfo.en}`,
      categoryHi: "विषय-वार क्विज़",
      categoryEn: "Subject-wise Quiz",
      durationMins: item.durationMins || Math.max(5, Math.round((questions.length) * 1.5)),
      questionsCount: questions.length,
      difficulty: (item.difficulty || "MEDIUM") as "EASY" | "MEDIUM" | "HARD",
      questions,
      subject: item.subject
    };
  });
}

