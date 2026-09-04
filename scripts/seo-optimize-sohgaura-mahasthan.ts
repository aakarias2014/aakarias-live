import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "pnc4agic",
  dataset: "production321",
  token: "skMxhNrkeT5w1uVLqfPq5Nl0u5zFudQZ5hhquH0XvroVCqS6tc13u2SUmmOXzoigpPzdyyPXeP6vcZnoJCjCpwPBid1aZmcNgOWsXmkoJ0HZlVG4v0MCTfMIny0H8rvVv0CYmO1qpsjIugnrYGf8196GWMBXdv9V3FoeeF5SJbvXfFRhPJu3",
  apiVersion: "2024-10-01",
  useCdn: false,
});

async function main() {
  const userAssetId = "image-d6527974c61b4ee8ad3d66c6c0fb2e3fb2bbd557-1024x682-jpg";

  const title = "सोहगौरा ताम्रपत्र अभिलेख एवं महास्थान प्रस्तर लेख: मौर्यकालीन अकाल राहत व आपदा प्रबंधन के प्रथम साक्ष्य | MPPSC & UPSC Notes";
  const titleEn = "Sohgaura Copper Plate & Mahasthan Inscription: Archaeological Evidences of Mauryan Famine Relief & Disaster Management | MPPSC & UPSC Notes";

  const excerpt = "सोहगौरा ताम्रपत्र अभिलेख (गोरखपुर) एवं महास्थान प्रस्तर लेख (बोगरा, बांग्लादेश) का विस्तृत विश्लेषणात्मक विवरण: सोहगौरा अभिलेख किसने बनाया, कहाँ स्थित है, किस राजा का है, कोष्ठागार, गंडक सिक्के, कौटिल्य का अर्थशास्त्र, MPPSC (2, 7, 10 अंक) व UPSC मॉडल उत्तर एवं MCQs।";
  const excerptEn = "Comprehensive guide on Sohgaura Copper Plate Inscription (Gorakhpur) & Mahasthan Stone Inscription (Bogra): Location, Mauryan ruler Chandragupta Maurya, state granaries (Koshthagara), Gandaka coins, Kautilya's Arthashastra, MPPSC (2, 7, 10 marks) model answers & MCQs.";

  const slug = "sohgaura-copper-plate-mahasthan-inscription-mppsc-notes";

  const keywords = [
    "सोहगौरा अभिलेख kisne banaya",
    "सोहगौरा अभिलेख kaha hai",
    "सोहगौरा ताम्रपत्र अभिलेख",
    "सौहगरा ताम्रपत्र लेख",
    "सोहागौरा तांबे की प्लेट कहां थी",
    "Mahasthan abhilekh kaha hai",
    "Mahasthan abhilekh kiska hai",
    "Mahasthan abhilekh kahan hai",
    "Mahasthan inscription in hindi",
    "sohgaura copper plate inscription which king",
    "sohgaura location",
    "sohgaura inscription related to",
    "sohgaura chalcolithic site",
    "sohgaura copper plate inscription upsc",
    "sohgaura is famous for",
    "MPPSC History Notes",
    "MPPSC Mains Disaster Management",
    "Mauryan Famine Relief Inscriptions",
    "Chandragupta Maurya Koshthagara"
  ];

  // Internal Links URLs
  const disasterActUrl = "/current-affairs/disaster-management-amendment-act-2025-mppsc-upsc-notes";
  const mainsSyllabusUrl = "/mppsc/mains-syllabus";
  const geographyNotesUrl = "/mppsc-notes/bharat-ka-bhautik-bhugol-mppsc-mains-unit-1-notes";
  const ramsarUrl = "/current-affairs/ramsar-sites-in-india-2026-complete-list-mppsc-notes";
  const answerWritingUrl = "/mppsc-mains-answer-writing";

  const bodyHi = [
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "प्राचीन भारतीय इतिहास, पुरालेखशास्त्र (Epigraphy) तथा प्रतियोगी परीक्षाओं (MPPSC & UPSC) के दृष्टिकोण से **सोहगौरा ताम्रपत्र अभिलेख (Sohgaura Copper Plate Inscription)** और **महास्थान प्रस्तर लेख (Mahasthan Stone Inscription)** अत्यंत महत्त्वपूर्ण पुरातात्विक साक्ष्य हैं। इन्हें प्राचीन भारत में **आपदा प्रबंधन (Disaster Management)**, **राजकीय अन्नागार (Koshthagara)**, **अकाल राहत कार्य (Famine Relief)** तथा **कल्याणकारी राज्य (Welfare State)** की अवधारणा का सबसे पहला प्रामाणिक अभिलेख माना जाता है। MPPSC राज्य सेवा मुख्य परीक्षा (प्रश्नपत्र 1 - इतिहास व संस्कृति) तथा UPSC सिविल सेवा परीक्षा में इनसे बार-बार प्रश्न पूछे जाते हैं।",
        },
      ],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        { _type: "span", text: "🔗 " },
        { _type: "span", text: `[आधुनिक भारत में आपदा प्रबंधन की नीतियाँ पढ़ें: आपदा प्रबंधन (संशोधन) अधिनियम 2025: मुख्य प्रावधान, UDMA धारा 41A व MPPSC/UPSC नोट्स](${disasterActUrl})` },
      ],
    },
    {
      _type: "image",
      asset: { _type: "reference", _ref: userAssetId },
      alt: "सोहगौरा ताम्रपत्र अभिलेख (Sohgaura Copper Plate Inscription Artefact with Brahmi Script and Symbols)",
      caption: "चित्र 1: सोहगौरा ताम्रपत्र अभिलेख (गोरखपुर) — मौर्यी ब्राह्मी लिपि, चार खंभों पर निर्मित दो मंजिला अन्नागार (कोष्ठागार), बोधि वृक्ष एवं पर्वत पर अर्धचंद्र के प्रतीक चिन्ह।"
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "1. सोहगौरा अभिलेख: स्थान, काल, लिपि एवं किसने बनाया? (Sohgaura Location & History)" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **सोहगौरा अभिलेख कहाँ स्थित है? (Location)**: उत्तर प्रदेश के **गोरखपुर** जिले में राप्ती नदी के किनारे स्थित **'सोहगौरा' (Sohgaura)** नामक गांव/पुरातात्विक स्थल से प्राप्त हुआ। (ध्यान दें: सोहगौरा एक ताम्रपाषाणिक स्थल / Chalcolithic Site भी है)।\n• **सोहगौरा अभिलेख किस राजा का है? (Which King / Period)**: यह **मौर्य काल** (संभवतः **चंद्रगुप्त मौर्य** के शासनकाल, 3rd Century BCE / लगभग 300 ई.पू.) से संबंधित है।\n• **सोहगौरा अभिलेख किसने बनाया? (Issued By)**: यह अभिलेख **श्रावस्ती (Shravasti) के महामात्रों (राजकीय अधिकारियों)** द्वारा सम्राट के आदेश पर जारी किया गया था।\n• **लिपि एवं भाषा**: मौर्यी **ब्राह्मी लिपि** (Brahmi Script) एवं **प्राकृत भाषा** (Prakrit Language)।\n• **मुख्य विषय (Main Content)**: इसमें श्रावस्ती के महामात्रों को स्पष्ट आदेश दिया गया है कि क्षेत्र में दो राजकीय अन्न भंडारों (**कोष्ठागारों/Koshthagara**) की स्थापना की जाए। इन अन्नागारों में रखे अनाज का उपयोग केवल अकाल (Famine), सूखे या आपातकालीन परिस्थिति में जनता के बीच मुफ़्त वितरण हेतु किया जाएगा। सामान्य दिनों में इस अनाज का उपभोग पूर्णतः वर्जित था।",
        },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "2. सोहगौरा ताम्रपत्र के प्रतीक चिन्ह एवं उनकी व्याख्या (Symbols on Sohgaura Plate)" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "सोहगौरा ताम्रपत्र की ऊपरी रेखा पर कुछ विशेष पुरातात्विक प्रतीक उत्कीर्ण हैं:",
        },
      ],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **चार खंभों का दुमंजिला ढांचा (Storehouse)**: चार खंभों पर टिका छप्परयुक्त दो मंजिला ढांचा, जो राजकीय अन्नागार (कोष्ठागार) का प्रतीक निरूपण है।\n• **वेदिका में वृक्ष (Tree in Railing)**: चारदीवारी के भीतर स्थित पेड़, जो बोधि वृक्ष या पवित्र वृक्षासन का प्रतीक है।\n• **पर्वत पर अर्धचंद्र (Mountain with Crescent)**: तीन चोटी वाले पर्वत पर अर्धचंद्र की आकृति (पर्वत पर चंद्र), जो मौर्यकालीन राजकीय मोहरों एवं पंचमार्क सिक्कों (Punch-Marked Coins) का प्रतीक चिन्ह है।\n• **छत्र व ध्वज आकृति**: प्रशासनिक शक्ति व राजकीय संरक्षण का सूचक।",
        },
      ],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        { _type: "span", text: "📌 " },
        { _type: "span", text: `[MPPSC Mains Unit-1 नोट्स पढ़ें: भारत का भौतिक भूगोल: पर्वत, पठार, मैदान व जल-विभाजक](${geographyNotesUrl})` },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "3. महास्थान प्रस्तर लेख: स्थान, पुण्ड्रनगर व अकाल राहत (Mahasthan Inscription in Hindi)" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **महास्थान अभिलेख कहाँ स्थित है? (Location)**: वर्तमान **बांग्लादेश के बोगरा (Bogra)** जिले में करतोया नदी के तट पर स्थित **'महास्थान' (Mahasthangarh)** से प्राप्त हुआ। प्राचीन काल में इसे **पुण्ड्रवर्धन (Pundravardhana)** या **पुण्ड्रनगर (Pundranagar)** कहा जाता था।\n• **महास्थान अभिलेख किसका है? (Period & King)**: यह भी मौर्य काल (चंद्रगुप्त मौर्य के शासनकाल, 3rd Century BCE) का प्रस्तर शिलालेख (Stone Slab Inscription) है।\n• **लिपि व भाषा**: ब्राह्मी लिपि एवं प्राकृत भाषा।\n• **अकाल राहत व गंडक सिक्के (Famine Relief & Currency)**: अभिलेख में दर्ज है कि पुण्ड्रनगर में भीषण अकाल पड़ा था। मौर्य सम्राट ने पुण्ड्रनगर के महामात्र को आदेश दिया कि प्रभावित प्रजा को राजकीय अन्नागारों से धान (अनाज) बांटा जाए तथा **'गंडक' (Gandaka)** नामक सिक्कों के रूप में आपातकालीन आर्थिक सहायता (ऋण) दी जाए।\n• **ऋण वापसी की शर्त**: लेख में स्पष्ट शर्त थी कि जैसे ही सुभिक्ष (अच्छे दिन) वापस आएं, जनता को वह अनाज व गंडक सिक्के राजकीय कोष में लौटाने होंगे। यह प्राचीन भारत की प्रथम दर्ज **'आपदा राहत ऋण एवं पुनर्भुगतान नीति'** है।",
        },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "4. सोहगौरा एवं महास्थान अभिलेखों की तुलनात्मक तालिका (Comparative Chart)" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **प्राप्ति स्थल**: सोहगौरा (गोरखपुर, उत्तर प्रदेश) | महास्थान (बोगरा, बांग्लादेश / पुण्ड्रनगर)\n• **अभिलेख स्वरूप**: ताम्रपत्र (Copper Plate) | प्रस्तर पट्टिका (Stone Inscription)\n• **संबंधित नदी**: राप्ती नदी | करतोया नदी\n• **जारीकर्ता अधिकारी**: श्रावस्ती के महामात्र | पुण्ड्रनगर के महामात्र\n• **मुख्य प्रावधान**: 2 कोष्ठागारों की स्थापना व आपातकालीन अनाज संचयन | धान वितरण, गंडक सिक्कों की आर्थिक सहायता व ऋण वापसी\n• **ऐतिहासिक महत्त्व**: भारत का प्रथम ताम्रपत्र लेख व आपदा प्रबंधन साक्ष्य | उत्तर बंगाल (पुण्ड्रवर्धन) में मौर्य साम्राज्य का प्रत्यक्ष साक्ष्य",
        },
      ],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        { _type: "span", text: "🌿 " },
        { _type: "span", text: `[पर्यावरण व आर्द्रभूमि संरक्षण पढ़ें: भारत में रामसर स्थल 2026: 101 रामसर स्थल व मध्य प्रदेश के 5 स्थल](${ramsarUrl})` },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "5. मौर्यकालीन कल्याणकारी राज्य एवं अर्थशास्त्र से तुलना (Welfare State Concept)" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **कल्याणकारी राज्य (Welfare State)**: सोहगौरा और महास्थान अभिलेख सिद्ध करते हैं कि मौर्य साम्राज्य केवल कर वसूलने वाला राज्य नहीं था, बल्कि संकट में प्रजा की रक्षा करने वाला कल्याणकारी राज्य था। कौटिल्य के अर्थशास्त्र के सिद्धांत 'प्रजासुखे सुखं राज्ञः' (प्रजा के सुख में ही राजा का सुख है) का यह सीधा पुरातात्विक प्रमाण है।\n• **कौटिल्य की अकाल नीति (Arthashastra Alignment)**: कौटिल्य के अर्थशास्त्र (अधिकरण 4, अध्याय 3) में अकाल के समय राजा द्वारा अन्न भंडारों को खोलने, धन वितरित करने तथा सुभिक्ष आने पर ऋण वसूलने का स्पष्ट नियम है, जिसकी पुष्टि महास्थान व सोहगौरा लेख करते हैं।",
        },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "6. MPPSC & UPSC Mains मॉडल प्रश्नोत्तर (2, 7 एवं 10 अंक)" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **प्रश्न 1 (2 अंक): सोहगौरा ताम्रपत्र अभिलेख का क्या ऐतिहासिक महत्त्व है?**\n  *उत्तर*: यह प्राचीन भारत का प्रथम ताम्रपत्र लेख (गोरखपुर, यू.पी.) है, जो मौर्य काल में अकाल से निपटने हेतु राजकीय अन्नागारों (कोष्ठागारों) की स्थापना एवं आपदा प्रबंधन का प्रथम पुरातात्विक प्रमाण प्रस्तुत करता है।",
        },
      ],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **प्रश्न 2 (7 अंक): महास्थान प्रस्तर लेख के मुख्य प्रावधानों एवं इसकी अकाल राहत नीति पर प्रकाश डालिए।**\n  *उत्तर*: बांग्लादेश के बोगरा (पुण्ड्रनगर) से प्राप्त महास्थान अभिलेख में अकाल के समय महामात्रों को प्रजा में धान एवं 'गंडक' सिक्कों के वितरण का आदेश दर्ज है। इसमें यह शर्त भी शामिल थी कि अकाल समाप्त होने (सुभिक्ष आने) पर जनता अनाज व ऋण राजकीय कोष में लौटाएगी। यह मौर्य साम्राज्य की सुव्यवस्थित अकाल राहत व ऋण नीति को दर्शाता है।",
        },
      ],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **प्रश्न 3 (10 अंक): 'मौर्य काल में कल्याणकारी राज्य एवं आपदा प्रबंधन की अवधारणा विद्यमान थी।' सोहगौरा ताम्रपत्र एवं महास्थान प्रस्तर लेख के विशेष संदर्भ में विश्लेषणात्मक मूल्यांकन कीजिए।**\n  *उत्तर संरचना*: प्रस्तावना ➔ सोहगौरा ताम्रपत्र (स्थान, 2 कोष्ठागार, अनाज सुरक्षा) ➔ महास्थान प्रस्तर लेख (पुण्ड्रवर्धन अकाल, धान व गंडक सिक्कों का वितरण, ऋण वापसी शर्त) ➔ कौटिल्य के अर्थशास्त्र की अकाल नीति से तुलना ➔ कल्याणकारी राज्य (Welfare State) का पुरातात्विक साक्ष्य ➔ निष्कर्ष।",
        },
      ],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        { _type: "span", text: "📚 " },
        { _type: "span", text: `[MPPSC परीक्षा गाइडलाइंस: MPPSC Mains Syllabus 2026 PDF Download](${mainsSyllabusUrl}) | [MPPSC Mains Answer Writing Strategy & Toppers Copies](${answerWritingUrl})` },
      ],
    },
  ];

  const bodyEn = [
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "In ancient Indian history and epigraphy, the **Sohgaura Copper Plate Inscription** and the **Mahasthan Stone Inscription** hold monumental significance for competitive exams like MPPSC & UPSC. Belonging to the Mauryan Period (3rd Century BCE, during the reign of Emperor Chandragupta Maurya), these two records serve as the earliest direct archaeological evidence of **Disaster Management**, **State Famine Relief**, **Public Granaries (Koshthagara)**, and the **Welfare State** model in ancient India.",
        },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "1. Sohgaura Copper Plate Inscription: Location & History" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **Where is Sohgaura Located?**: Discovered at Sohgaura village on the Rapti river in Gorakhpur district, Uttar Pradesh. (Note: Sohgaura is also an ancient Chalcolithic site).\n• **Which King / Period?**: Mauryan Period (approx. 300 BCE / 3rd Century BCE, reign of Chandragupta Maurya).\n• **Who Issued It?**: Issued by the Mahamatras (high royal officials) of Shravasti.\n• **Script & Language**: Mauryan Brahmi Script and Prakrit Language.\n• **Core Subject**: Decrees the establishment of two public granaries (**Koshthagara**) in the region to store grain exclusively reserved for emergency famine relief.",
        },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "2. Mahasthan Stone Inscription: Location & Famine Policy" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **Where is Mahasthan Located?**: Found at Mahasthangarh on the Karatoya river in Bogra district, Bangladesh (anciently known as **Pundranagar** or **Pundravardhana**).\n• **Core Provisions**: Records famine relief during a severe drought in Pundranagar. The Mauryan Emperor ordered officials to distribute paddy from state granaries and provide financial assistance in **Gandaka coins**.\n• **Emergency Credit & Loan Policy**: Stipulated that once prosperity returned, citizens must return the paddy and Gandaka coins back to the state treasury.",
        },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "3. MPPSC & UPSC Model Question Answers (2, 7 & 10 Marks)" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **Question 1 (2 Marks): What is the historical significance of the Sohgaura Copper Plate?**\n  *Answer*: Discovered in Gorakhpur (UP), it is the earliest known copper plate inscription in India (3rd Century BCE). It provides the first archaeological evidence of Mauryan disaster management and state granaries (Koshthagara) established for famine relief.",
        },
      ],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **Question 2 (7 Marks): Highlight the famine relief policy outlined in the Mahasthan Stone Inscription.**\n  *Answer*: Found at Bogra (Bangladesh), the Mahasthan inscription records Mauryan famine relief during a severe drought in Pundranagar. The Emperor instructed officials to distribute paddy from state granaries and provide emergency financial credit in 'Gandaka' coins, with a clear policy that citizens return the grain and money once normal agricultural conditions returned.",
        },
      ],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **Question 3 (10 Marks): 'The concept of a Welfare State and Disaster Management existed during the Mauryan Period.' Critically analyze with reference to Sohgaura and Mahasthan inscriptions.**\n  *Answer Structure*: Introduction ➔ Sohgaura Copper Plate (Gorakhpur, 2 granaries, reserved grain) ➔ Mahasthan Inscription (Pundranagar famine, paddy distribution, Gandaka coin loans, repayment clause) ➔ Alignment with Kautilya's Arthashastra ➔ Proof of Welfare State Model ➔ Conclusion.",
        },
      ],
    },
  ];

  const faqs = [
    {
      question: "सोहगौरा अभिलेख कहाँ स्थित है? (Where is Sohgaura Inscription located?)",
      questionEn: "Where is the Sohgaura inscription located?",
      answer: "सोहगौरा तांबे की प्लेट (ताम्रपत्र अभिलेख) उत्तर प्रदेश के गोरखपुर जिले में राप्ती नदी के किनारे स्थित सोहगौरा (Sohgaura) नामक स्थान से प्राप्त हुआ है।",
      answerEn: "The Sohgaura copper plate was discovered at Sohgaura on the banks of the Rapti river in Gorakhpur district, Uttar Pradesh, India."
    },
    {
      question: "सोहगौरा अभिलेख किस राजा का है और किसने बनाया?",
      questionEn: "Which king is associated with the Sohgaura copper plate inscription?",
      answer: "सोहगौरा अभिलेख मौर्य काल (संभवतः चंद्रगुप्त मौर्य के शासनकाल, 3rd Century BCE) का है। यह श्रावस्ती के महामात्रों (राजकीय अधिकारियों) द्वारा सम्राट के आदेश पर जारी किया गया था।",
      answerEn: "The Sohgaura inscription belongs to the Mauryan Period (3rd Century BCE, reign of Chandragupta Maurya). It was issued by the Mahamatras of Shravasti."
    },
    {
      question: "महास्थान अभिलेख कहाँ स्थित है और किस राजा से संबंधित है?",
      questionEn: "Where is the Mahasthan inscription located and who is it related to?",
      answer: "महास्थान अभिलेख बांग्लादेश के बोगरा जिले में करतोया नदी के किनारे 'महास्थान' (प्राचीन पुण्ड्रनगर/पुण्ड्रवर्धन) से प्राप्त हुआ है। यह मौर्य सम्राट चंद्रगुप्त मौर्य के समय का प्रस्तर शिलालेख है।",
      answerEn: "The Mahasthan inscription was found at Mahasthan (ancient Pundranagar/Pundravardhana) on the Karatoya river in Bogra district, Bangladesh, dating back to the Mauryan era."
    },
    {
      question: "सोहगौरा ताम्रपत्र पर कौन से मुख्य प्रतीक चिन्ह बने हुए हैं?",
      questionEn: "What main symbols are engraved on the Sohgaura copper plate?",
      answer: "सोहगौरा ताम्रपत्र पर 4 खंभों पर निर्मित दो मंजिला अन्नागार (कोष्ठागार), वेदिका में वृक्ष (बोधि वृक्ष), और पर्वत पर अर्धचंद्र (तीन चोटी के पर्वत पर चंद्र) के प्रतीक बने हैं।",
      answerEn: "It features a four-pillared two-storeyed granary (Koshthagara), a sacred tree in railing, and a crescent on a three-arched mountain symbol."
    },
    {
      question: "महास्थान लेख में किस सिक्के का उल्लेख अकाल राहत ऋण के रूप में हुआ है?",
      questionEn: "Which coin is mentioned in the Mahasthan inscription for famine relief?",
      answer: "महास्थान अभिलेख में 'गंडक' (Gandaka) नामक प्राचीन सिक्के का उल्लेख अकाल पीड़ित प्रजा को आपातकालीन आर्थिक सहायता व ऋण के रूप में देने हेतु हुआ है, जिसे सुभिक्ष आने पर वापस लौटाना था।",
      answerEn: "The Mahasthan record mentions 'Gandaka' coins distributed as emergency state credit to famine-affected citizens, refundable once normal conditions returned."
    },
    {
      question: "इतिहास के स्रोत पर सोहगौरा तांबे की प्लेट का क्या महत्त्व है?",
      questionEn: "What is the historical significance of the Sohgaura copper plate inscription?",
      answer: "यह भारत का सबसे प्राचीन ताम्रपत्र लेख है, जो मौर्य काल में आपदा प्रबंधन, राजकीय अन्नागारों (कोष्ठागारों) की स्थापना और कल्याणकारी राज्य (Welfare State) का प्रथम पुरातात्विक साक्ष्य प्रस्तुत करता है।",
      answerEn: "It is the earliest copper plate inscription of India, serving as the first archaeological proof of state disaster management, granaries, and welfare state in the Mauryan Empire."
    }
  ];

  const mcqs = [
    {
      question: "भारत का प्रथम ताम्रपत्र लेख (First Copper Plate Inscription of India) किसे माना जाता है?",
      questionEn: "Which is considered the first copper plate inscription of India?",
      options: ["सोहगौरा ताम्रपत्र अभिलेख (Gorakhpur)", "महास्थान प्रस्तर लेख (Bogra)", "जूनागढ़ शिलालेख", "ऐहोल अभिलेख"],
      optionsEn: ["Sohgaura Copper Plate Inscription (Gorakhpur)", "Mahasthan Stone Inscription (Bogra)", "Junagadh Inscription", "Aihole Inscription"],
      correctIndex: 0,
      explanation: "सोहगौरा ताम्रपत्र (गोरखपुर, यू.पी.) मौर्यकालीन अभिलेख है, जिसे प्राचीन भारत का प्रथम ताम्रपत्र लेख एवं आपदा प्रबंधन का प्रथम पुरातात्विक साक्ष्य माना जाता है।",
      explanationEn: "Sohgaura copper plate (Gorakhpur, UP) is a Mauryan inscription, recognized as the earliest copper plate inscription and first evidence of state disaster management in India."
    },
    {
      question: "महास्थान प्रस्तर लेख वर्तमान में किस स्थान/देश से प्राप्त हुआ है?",
      questionEn: "From which modern location/country was the Mahasthan Stone Inscription discovered?",
      options: ["बोगरा, बांग्लादेश (प्राचीन पुण्ड्रनगर)", "गोरखपुर, उत्तर प्रदेश", "विदिशा, मध्य प्रदेश", "लुम्बिनी, नेपाल"],
      optionsEn: ["Bogra, Bangladesh (Ancient Pundranagar)", "Gorakhpur, Uttar Pradesh", "Vidisha, Madhya Pradesh", "Lumbini, Nepal"],
      correctIndex: 0,
      explanation: "महास्थान प्रस्तर लेख बांग्लादेश के बोगरा जिले में करतोया नदी के तट पर स्थित महास्थानगढ़ (प्राचीन पुण्ड्रनगर/पुण्ड्रवर्धन) से प्राप्त हुआ है।",
      explanationEn: "The Mahasthan inscription was discovered at Mahasthangarh (ancient Pundranagar) on the Karatoya river in Bogra district, Bangladesh."
    },
    {
      question: "सोहगौरा ताम्रपत्र किस मौर्यकालीन राजा के शासनकाल का माना जाता है?",
      questionEn: "Which Mauryan king's reign is the Sohgaura copper plate associated with?",
      options: ["चंद्रगुप्त मौर्य (Chandragupta Maurya)", "सम्राट अशोक (Emperor Ashoka)", "बिंदुसार (Bindusara)", "बृहद्रथ (Brihadratha)"],
      optionsEn: ["Chandragupta Maurya", "Emperor Ashoka", "Bindusara", "Brihadratha"],
      correctIndex: 0,
      explanation: "पुरालेखशास्त्रियों के अनुसार सोहगौरा ताम्रपत्र एवं महास्थान प्रस्तर लेख मौर्य वंश के संस्थापक चंद्रगुप्त मौर्य (300 ई.पू.) के काल से संबंधित हैं।",
      explanationEn: "Epigraphists attribute both the Sohgaura copper plate and Mahasthan inscription to the reign of Chandragupta Maurya (3rd Century BCE)."
    },
    {
      question: "महास्थान प्रस्तर लेख में अकाल राहत हेतु किस मुद्रा/सिक्के का उल्लेख मिलता है?",
      questionEn: "Which coin is mentioned in the Mahasthan inscription for famine relief credit?",
      options: ["गंडक (Gandaka)", "कार्षापण (Karshapana)", "दीनार (Dinar)", "रूपक (Rupaka)"],
      optionsEn: ["Gandaka", "Karshapana", "Dinar", "Rupaka"],
      correctIndex: 0,
      explanation: "महास्थान लेख में सम्राट द्वारा अकाल पीड़ितों को धान के साथ 'गंडक' (Gandaka) सिक्कों के रूप में सहायता देने तथा सुभिक्ष आने पर वापस लौटाने की शर्त दर्ज है।",
      explanationEn: "The Mahasthan record mentions providing paddy along with 'Gandaka' coins as emergency credit to famine victims, refundable after prosperity returns."
    },
    {
      question: "सोहगौरा ताम्रपत्र पर उत्कीर्ण चार खंभों का दुमंजिला ढांचा किसका प्रतीक है?",
      questionEn: "What does the four-pillared two-storeyed structure engraved on the Sohgaura copper plate represent?",
      options: ["राजकीय अन्नागार (कोष्ठागार)", "बौद्ध स्तूप", "राजप्रसाद (महल)", "सैन्य छावनी"],
      optionsEn: ["State Granary (Koshthagara)", "Buddhist Stupa", "Royal Palace", "Military Camp"],
      correctIndex: 0,
      explanation: "सोहगौरा ताम्रपत्र पर 4 खंभों पर निर्मित दो मंजिला ढांचा आपातकालीन अनाज संचयन हेतु बने राजकीय अन्नागार (कोष्ठागार) का प्रतीक निरूपण है।",
      explanationEn: "The four-pillared structure on the Sohgaura copper plate visually depicts the state granary (Koshthagara) built for emergency grain storage."
    }
  ];

  const doc = {
    _id: "gk-sohgaura-copper-plate-mahasthan-inscription",
    _type: "staticGk",
    title,
    titleEn,
    slug: { _type: "slug", current: slug },
    category: "History",
    subcategory: "Ancient History",
    examTags: ["tag-mppsc", "tag-upsc", "tag-ssc"],
    authorName: "Aakar IAS Team",
    publishedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    readTime: "8 min read",
    excerpt,
    excerptEn,
    keywords,
    body: bodyHi,
    bodyEn: bodyEn,
    faqs,
    mcqs,
    mainImage: {
      _type: "image",
      asset: { _type: "reference", _ref: userAssetId },
      alt: "सोहगौरा ताम्रपत्र अभिलेख एवं महास्थान प्रस्तर लेख (Sohgaura Copper Plate & Mahasthan Inscription Artefact)",
      caption: "सोहगौरा ताम्रपत्र अभिलेख (गोरखपुर) — प्राचीन भारत में मौर्यकालीन आपदा प्रबंधन, अन्नागार (कोष्ठागार) व अकाल राहत का प्रथम पुरातात्विक प्रमाण।"
    }
  };

  console.log("Updating article in Sanity CMS with internal interlinking...");
  const res = await client.createOrReplace(doc);
  console.log(`Successfully updated document with internal links! Document ID: ${res._id}`);
}

main().catch(console.error);
