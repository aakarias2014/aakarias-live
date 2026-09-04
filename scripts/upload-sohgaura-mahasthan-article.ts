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

  const title = "सौहगरा ताम्रपत्र लेख एवं महास्थान प्रस्तर लेख: मौर्यकालीन आपदा प्रबंधन व अकाल राहत के प्रथम पुरातात्विक साक्ष्य | MPPSC & UPSC Notes";
  const titleEn = "Sohgaura Copper Plate & Mahasthan Inscription: Archaeological Evidences of Mauryan Famine Relief & Disaster Management | MPPSC & UPSC Notes";

  const excerpt = "मौर्यकालीन सौहगरा ताम्रपत्र (गोरखपुर) एवं महास्थान प्रस्तर लेख (बोगरा, बांग्लादेश) का विस्तृत विश्लेषणात्मक विवरण: स्थान, काल, लिपि, ब्राह्मी-प्राकृत अभिलेख, अकाल राहत, अन्नागार (कोष्ठागार), गंडक सिक्के, कल्याणकारी राज्य की अवधारणा, 2, 7 व 10 अंक के मॉडल उत्तर एवं MCQs।";
  const excerptEn = "Detailed study of Mauryan Sohgaura Copper Plate (Gorakhpur) & Mahasthan Inscription (Bogra): Location, script, Brahmi-Prakrit texts, famine relief granaries (Koshthagara), Gandaka coins, welfare state concept, model answers (2, 7, 10 marks), and MCQs for MPPSC & UPSC.";

  const slug = "sohgaura-copper-plate-mahasthan-inscription-mppsc-notes";

  const bodyHi = [
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "प्राचीन भारतीय इतिहास एवं पुरालेखशास्त्र (Epigraphy) में **सौहगरा ताम्रपत्र लेख (Sohgaura Copper Plate Inscription)** और **महास्थान प्रस्तर लेख (Mahasthan Stone Inscription)** का विशेष महत्त्व है। यह दोनों अभिलेख मौर्य साम्राज्य (संभवतः चंद्रगुप्त मौर्य के शासनकाल, 3rd Century BCE) से संबंधित हैं। यह प्राचीन भारत में **आपदा प्रबंधन (Disaster Management)**, **अकाल राहत कार्य (Famine Relief)**, **राजकीय कोष्ठागारों (State Granaries)** तथा **कल्याणकारी राज्य (Welfare State)** की स्थापना के प्रथम प्रत्यक्ष पुरातात्विक प्रमाण हैं। MPPSC (मुख्य परीक्षा प्रश्नपत्र 1 - इतिहास व संस्कृति) तथा UPSC सिविल सेवा परीक्षा के दृष्टिकोण से यह एक अत्यंत महत्त्वपूर्ण टॉपिक है।",
        },
      ],
    },
    {
      _type: "image",
      asset: { _type: "reference", _ref: userAssetId },
      alt: "सौहगरा ताम्रपत्र लेख (Sohgaura Copper Plate Inscription Artefact with Brahmi Script and Symbols)",
      caption: "चित्र 1: सौहगरा ताम्रपत्र लेख (गोरखपुर) — मौर्यकालीन ब्राह्मी लिपि, चार खंभों पर निर्मित दो मंजिला कोष्ठागार (अन्नागार), वृक्षासन (पेड़) एवं पर्वत पर अर्धचंद्र के प्रतीक चिन्ह।"
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "1. सौहगरा ताम्रपत्र लेख (Sohgaura Copper Plate Inscription)" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "सौहगरा ताम्रपत्र भारत का सबसे प्राचीन ज्ञात ताम्रपत्र अभिलेख (First Copper Plate Inscription of Ancient India) माना जाता है। इसमें मौर्यकालीन अकाल प्रबंधन की स्पष्ट रूपरेखा मिलती है।",
        },
      ],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **स्थान (Location)**: उत्तर प्रदेश के गोरखपुर जिले में राप्ती नदी के किनारे स्थित **'सौहगरा' (Sohgaura)** नामक स्थान से प्राप्त हुआ था।\n• **काल (Period)**: मौर्यकालीन (संभवतः चंद्रगुप्त मौर्य के शासनकाल, 300 ई.पू. / 3rd Century BCE)।\n• **लिपि (Script)**: मौर्यी ब्राह्मी लिपि (Brahmi Script)।\n• **भाषा (Language)**: प्राकृत भाषा (Prakrit Language)।\n• **मुख्य विषय (Core Subject)**: इसमें श्रावस्ती (Shravasti) के महामात्रों (अधिकारियों) द्वारा जारी किया गया एक प्रशासनिक आदेश उत्कीर्ण है। आदेश के अनुसार क्षेत्र में दो राजकीय अन्न भंडारों (**कोष्ठागारों/Koshthagara**) की स्थापना की जाए तथा उनमें रखे अनाज का उपयोग केवल अकाल, सूखे या भुखमरी जैसी आपातकालीन स्थिति में जनता के बीच वितरण हेतु किया जाए। सामान्य दिनों में इस अनाज का उपभोग वर्जित था।\n• **प्रशासकीय संदेश**: यह अभिलेख साबित करता है कि मौर्य शासन में आपातकालीन खाद्यान्न भंडार (Emergency Grain Reserve) की व्यवस्था केंद्रीकृत व सुसंगठित थी।",
        },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "2. सौहगरा ताम्रपत्र पर उत्कीर्ण प्रतीक एवं उनकी व्याख्या" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "सौहगरा ताम्रपत्र के ऊपरी भाग में कुछ विशिष्ट धार्मिक व प्रशासनिक प्रतीक (Symbols) उत्कीर्ण हैं, जिनका ऐतिहासिक विश्लेषण निम्नवत् है:",
        },
      ],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **वृक्ष (Tree in Enclosure)**: चारदीवारी/कटहरे के भीतर स्थित पेड़, जो बोधि वृक्ष या पवित्र वृक्षासन का प्रतीक माना जाता है।\n• **चार खंभों का दुमंजिला ढांचा (Four-Pillared Storehouse)**: चार खंभों पर टिका हुआ छप्परयुक्त दो मंजिला ढांचा, जो राजकीय अन्नागार (कोष्ठागार) का प्रतीक निरूपण है।\n• **पर्वत एवं अर्धचंद्र (Mountain with Crescent)**: तीन चोटी वाले पर्वत के ऊपर बने अर्धचंद्र की आकृति (पर्वत पर चंद्र), जो मौर्यकालीन राजकीय मोहरों एवं पंचमार्क सिक्कों (Punch-Marked Coins) का प्रमुख प्रतीक चिन्ह है।\n• **छत्र व ध्वज आकृति**: प्रशासनिक शक्ति व राजकीय संरक्षण का सूचक।",
        },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "3. महास्थान प्रस्तर लेख (Mahasthan Stone Inscription)" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "महास्थान प्रस्तर लेख मौर्याभिलेखाशास्त्र का दूसरा सबसे महत्त्वपूर्ण पुरातात्विक साक्ष्य है, जो बंगाल (पुण्ड्रवर्धन) में मौर्य शासन व आपातकालीन अकाल राहत नीति की पुष्टि करता है।",
        },
      ],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **स्थान (Location)**: वर्तमान बांग्लादेश के **बोगरा (Bogra)** जिले में करतोया नदी के तट पर स्थित **'महास्थान' (Mahasthangarh)** से प्राप्त। प्राचीन काल में इसे **पुण्ड्रवर्धन (Pundravardhana)** या **पुण्ड्रनगर (Pundranagar)** कहा जाता था।\n• **काल (Period)**: मौर्यकालीन (चंद्रगुप्त मौर्य का काल, 3rd Century BCE)।\n• **लिपि व भाषा**: ब्राह्मी लिपि एवं प्राकृत भाषा।\n• **मुख्य विषय (Core Subject)**: इसमें उल्लेख है कि पुण्ड्रनगर (महास्थान) में भीषण अकाल (सूखा) पड़ा था। सम्राट द्वारा पुण्ड्रनगर के महामात्र (प्रांतीय गवर्नर/अधिकारी) को आदेश जारी किया गया कि अकाल से प्रभावित जनता को राजकीय अन्नागारों से धान (अनाज) बांटा जाए तथा **'गंडक' (Gandaka)** नामक प्राचीन सिक्कों के रूप में आर्थिक सहायता/ऋण प्रदान किया जाए।\n• **ऋण वापसी की शर्त (Credit/Loan Policy)**: लेख में स्पष्ट उल्लेख है कि 'जैसे ही सुभिक्ष (अच्छे दिन) वापस आएं और अकाल समाप्त हो जाए, जनता को वह अनाज तथा गंडक (सिक्के) राजकीय कोष में वापस लौटाने होंगे।'\n• **महत्व**: यह प्राचीन भारत की प्रथम दर्ज 'आपदा राहत ऋण एवं पुनर्भुगतान नीति' (Disaster Relief Credit & Repayment Policy) है।",
        },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "4. सौहगरा एवं महास्थान लेखों की तुलनात्मक तालिका" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **प्राप्ति स्थल**: सौहगरा (गोरखपुर, यू.पी.) | महास्थान (बोगरा, बांग्लादेश / प्राचीन पुण्ड्रनगर)\n• **सामग्री / स्वरूप**: ताम्रपत्र (Copper Plate) | प्रस्तर पट्टिका (Stone Slab)\n• **संबद्ध नदियाँ**: राप्ती नदी तट | करतोया नदी तट\n• **प्रशासनिक अधिकारी**: श्रावस्ती के महामात्र | पुण्ड्रनगर के महामात्र\n• **मुख्य प्रावधान**: 2 कोष्ठागारों की स्थापना व आपातकालीन अनाज संचयन | अकाल में धान वितरण, गंडक सिक्कों की आर्थिक सहायता व सुभिक्ष आने पर ऋण वापसी\n• **विशेष पहचान**: प्रथम ताम्रपत्र लेख व आपदा प्रबंधन साक्ष्य | बंगाल में मौर्य साम्राज्य का प्रथम अभिलेखीय प्रमाण",
        },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "5. मौर्यकालीन कल्याणकारी राज्य (Welfare State) एवं ऐतिहासिक महत्त्व" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "सौहगरा ताम्रपत्र और महास्थान प्रस्तर लेख प्राचीन भारतीय इतिहास एवं अर्थशास्त्र (Kautilya's Arthashastra) के सिद्धांतों का सजीव प्रमाण प्रस्तुत करते हैं:",
        },
      ],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **कल्याणकारी राज्य की अवधारणा (Welfare State Concept)**: मौर्य साम्राज्य केवल कर वसूलने वाला राज्य नहीं था, बल्कि संकट काल में प्रजा की जीवन रक्षा करने हेतु प्रतिबद्ध कल्याणकारी राज्य था। कौटिल्य के अर्थशास्त्र में उल्लिखित 'प्रजासुखे सुखं राज्ञः' (प्रजा के सुख में ही राजा का सुख है) का यह सीधा पुरातात्विक साक्ष्य है।\n• **कौटिल्यीय अकाल नीति का व्यावहारिक रूप**: कौटिल्य के अर्थशास्त्र (अधिकरण 4, अध्याय 3 'उपपात-प्रतीकार') में अकाल के समय राजा द्वारा अन्न भंडारों को खोलने, बीज व धन वितरित करने तथा सार्वजनिक निर्माण कार्य शुरू करने का विधान है। सौहगरा व महास्थान लेख इसी नीति का व्यावहारिक कार्यान्वयन दर्शाते हैं।\n• **प्राचीनतम ताम्रपत्र व आपदा साक्ष्य**: सौहगरा ताम्रपत्र भारत का सबसे पहला ताम्रपत्र लेख है, जो यह साबित करता है कि मौर्य काल में प्रशासनिक अध्यादेश ताम्रपत्रों पर उत्कीर्ण करके जिलों/महामात्रों को भेजे जाते थे।\n• **साम्राज्य की सीमा निर्धारण**: महास्थान लेख से यह निर्विवाद सिद्ध होता है कि मौर्य साम्राज्य की पूर्वी सीमा उत्तर बंगाल (पुण्ड्रवर्धन) तक विस्तृत थी।",
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
          text: "• **प्रश्न 1 (2 अंक): सौहगरा ताम्रपत्र लेख का क्या ऐतिहासिक महत्त्व है?**\n  *उत्तर*: यह प्राचीन भारत का प्रथम ताम्रपत्र लेख (गोरखपुर, यू.पी.) है, जो मौर्य काल में अकाल से निपटने हेतु राजकीय अन्नागारों (कोष्ठागारों) के निर्माण एवं आपदा प्रबंधन का प्रथम पुरातात्विक प्रमाण प्रस्तुत करता है।",
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
          text: "• **प्रश्न 3 (10 अंक): 'मौर्य काल में कल्याणकारी राज्य एवं आपदा प्रबंधन की अवधारणा विद्यमान थी।' सौहगरा ताम्रपत्र एवं महास्थान प्रस्तर लेख के विशेष संदर्भ में विश्लेषणात्मक मूल्यांकन कीजिए।**\n  *उत्तर संरचना*: प्रस्तावना ➔ सौहगरा ताम्रपत्र (स्थान, 2 कोष्ठागार, अनाज सुरक्षा) ➔ महास्थान प्रस्तर लेख (पुण्ड्रवर्धन अकाल, धान व गंडक सिक्कों का वितरण, ऋण वापसी शर्त) ➔ कौटिल्य के अर्थशास्त्र की अकाल नीति से तुलना ➔ कल्याणकारी राज्य (Welfare State) का पुरातात्विक साक्ष्य ➔ निष्कर्ष।",
        },
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
          text: "In ancient Indian history and epigraphy, the **Sohgaura Copper Plate Inscription** and the **Mahasthan Stone Inscription** hold monumental significance. Belonging to the Mauryan Period (3rd Century BCE, likely during the reign of Chandragupta Maurya), these two records serve as the earliest direct archaeological evidence of **Disaster Management**, **State Famine Relief**, **Public Granaries (Koshthagara)**, and the **Welfare State** model in ancient India. This topic is crucial for MPPSC Mains (Paper 1 History & Culture) and UPSC Civil Services examinations.",
        },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "1. Sohgaura Copper Plate Inscription" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **Location**: Discovered at Sohgaura on the banks of the Rapti river in Gorakhpur district, Uttar Pradesh.\n• **Period**: Mauryan Era (approx. 300 BCE / 3rd Century BCE, reign of Chandragupta Maurya).\n• **Script & Language**: Mauryan Brahmi Script and Prakrit Language.\n• **Core Subject**: It records a royal administrative decree issued by the Mahamatras (high officials) of Shravasti. The decree orders the establishment of two public granaries (**Koshthagara**) in the region. The grain stored in these granaries was strictly reserved for emergency public distribution during famines, droughts, or food shortages.\n• **Historical Significance**: It is recognized as the **First Copper Plate Inscription of Ancient India** and the earliest archaeological record of state disaster management.",
        },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "2. Symbols Engraved on Sohgaura Plate" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **Tree in Enclosure**: Represents a sacred Bodhi tree or tree-in-railing.\n• **Four-Pillared Two-Storeyed Structure**: Pictorial representation of the state granary (Koshthagara) supported on four pillars with a roofed structure.\n• **Crescent on Hill / Mountain**: A three-arched hill surmounted by a crescent moon, a hallmark symbol found on Mauryan royal seals and punch-marked coins.",
        },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "3. Mahasthan Stone Inscription" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **Location**: Discovered at Mahasthan (Mahasthan-garh) on the Karatoya river in Bogra district, Bangladesh. Anciently known as **Pundranagar** or **Pundravardhana**.\n• **Period & Script**: Mauryan Period, Brahmi Script, Prakrit Language.\n• **Core Subject**: Records a severe famine in Pundranagar. The Mauryan Emperor issued orders to the local Mahamatra to distribute paddy (grain) from state granaries and provide financial assistance in the form of **Gandaka coins**.\n• **Emergency Loan & Repayment Policy**: The inscription specifies that once prosperity returns (famine ends), citizens must return the grain and coins back to the state treasury.\n• **Significance**: Proves Mauryan imperial administrative control extended to Bengal (Pundravardhana) and documents ancient India's first recorded emergency famine relief loan policy.",
        },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "4. Comparative Summary: Sohgaura vs Mahasthan Inscriptions" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **Site**: Sohgaura (Gorakhpur, UP) | Mahasthan (Bogra, Bangladesh / Pundranagar)\n• **Medium**: Copper Plate (Tamrapatra) | Stone Slab (Prastar Lekh)\n• **Rivers**: Rapti River | Karatoya River\n• **Issued By**: Mahamatras of Shravasti | Mahamatras of Pundranagar\n• **Provisions**: Setup 2 Granaries for Emergency Reserves | Distribute Paddy + Gandaka Coins with repayment terms post-famine\n• **Significance**: Earliest Copper Plate & Disaster Management Evidence | Earliest Inscription proving Mauryan control over North Bengal",
        },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "5. MPPSC & UPSC Model Question Answers (2, 7 & 10 Marks)" }],
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
      question: "सौहगरा ताम्रपत्र लेख कहाँ से प्राप्त हुआ है?",
      questionEn: "Where was the Sohgaura Copper Plate inscription discovered?",
      answer: "सौहगरा ताम्रपत्र उत्तर प्रदेश के गोरखपुर जिले में राप्ती नदी के तट पर स्थित 'सौहगरा' नामक पुरातात्विक स्थल से प्राप्त हुआ है।",
      answerEn: "The Sohgaura copper plate was discovered at Sohgaura on the banks of the Rapti river in Gorakhpur district, Uttar Pradesh."
    },
    {
      question: "सौहगरा ताम्रपत्र और महास्थान लेख किस काल व लिपि के हैं?",
      questionEn: "To which period and script do the Sohgaura and Mahasthan inscriptions belong?",
      answer: "यह दोनों अभिलेख मौर्य काल (संभवतः चंद्रगुप्त मौर्य का शासनकाल, 3rd Century BCE) के हैं। इनकी लिपि मौर्यी ब्राह्मी तथा भाषा प्राकृत है।",
      answerEn: "Both inscriptions belong to the Mauryan Period (3rd Century BCE, Chandragupta Maurya's reign). They are written in Mauryan Brahmi script and Prakrit language."
    },
    {
      question: "महास्थान प्रस्तर लेख कहाँ स्थित है और इसका प्राचीन नाम क्या था?",
      questionEn: "Where is the Mahasthan stone inscription located and what was its ancient name?",
      answer: "महास्थान प्रस्तर लेख बांग्लादेश के बोगरा जिले में करतोया नदी के किनारे 'महास्थानगढ़' से प्राप्त हुआ है। प्राचीन काल में इसे पुण्ड्रवर्धन या पुण्ड्रनगर कहा जाता था।",
      answerEn: "The Mahasthan inscription was found at Mahasthangarh on the Karatoya river in Bogra district, Bangladesh. Anciently, it was called Pundranagar or Pundravardhana."
    },
    {
      question: "सौहगरा ताम्रपत्र पर कौन से मुख्य प्रतीक बने हुए हैं?",
      questionEn: "What main symbols are engraved on the Sohgaura copper plate?",
      answer: "सौहगरा ताम्रपत्र पर 4 खंभों पर बना दुमंजिला अन्नागार (कोष्ठागार), चारदीवारी में पेड़ (बोधि वृक्ष), और पर्वत पर अर्धचंद्र (पर्वत पर चंद्र) के प्रतीक बने हैं।",
      answerEn: "It features a four-pillared two-storeyed granary (Koshthagara), a sacred tree in railing, and a crescent on a three-arched mountain symbol."
    },
    {
      question: "महास्थान लेख में किस सिक्के का उल्लेख अकाल राहत ऋण के रूप में हुआ है?",
      questionEn: "Which coin is mentioned in the Mahasthan inscription for famine relief credit?",
      answer: "महास्थान लेख में 'गंडक' (Gandaka) नामक प्राचीन सिक्के का उल्लेख अकाल प्रभावित जनता को आपातकालीन आर्थिक ऋण देने हेतु हुआ है।",
      answerEn: "The inscription mentions 'Gandaka' coins distributed as emergency state credit to famine-affected citizens."
    }
  ];

  const mcqs = [
    {
      question: "भारत का प्रथम ताम्रपत्र लेख (First Copper Plate Inscription of India) किसे माना जाता है?",
      questionEn: "Which is considered the first copper plate inscription of India?",
      options: ["सौहगरा ताम्रपत्र लेख", "महास्थान प्रस्तर लेख", "जूनागढ़ शिलालेख", "ऐहोल अभिलेख"],
      optionsEn: ["Sohgaura Copper Plate Inscription", "Mahasthan Stone Inscription", "Junagadh Inscription", "Aihole Inscription"],
      correctIndex: 0,
      explanation: "सौहगरा ताम्रपत्र (गोरखपुर, यू.पी.) मौर्यकालीन अभिलेख है, जिसे प्राचीन भारत का प्रथम ताम्रपत्र लेख एवं आपदा प्रबंधन का प्रथम पुरातात्विक प्रमाण माना जाता है।",
      explanationEn: "Sohgaura copper plate (Gorakhpur, UP) is a Mauryan inscription, recognized as the earliest copper plate inscription and first evidence of state disaster management in India."
    },
    {
      question: "महास्थान प्रस्तर लेख वर्तमान में किस देश/स्थान से प्राप्त हुआ है?",
      questionEn: "From which modern location/country was the Mahasthan Stone Inscription discovered?",
      options: ["बोगरा, बांग्लादेश (प्राचीन पुण्ड्रनगर)", "गोरखपुर, उत्तर प्रदेश", "विदिशा, मध्य प्रदेश", "लुम्बिनी, नेपाल"],
      optionsEn: ["Bogra, Bangladesh (Ancient Pundranagar)", "Gorakhpur, Uttar Pradesh", "Vidisha, Madhya Pradesh", "Lumbini, Nepal"],
      correctIndex: 0,
      explanation: "महास्थान प्रस्तर लेख बांग्लादेश के बोगरा जिले में करतोया नदी के तट पर स्थित महास्थानगढ़ (प्राचीन पुण्ड्रनगर/पुण्ड्रवर्धन) से प्राप्त हुआ है।",
      explanationEn: "The Mahasthan inscription was discovered at Mahasthangarh (ancient Pundranagar) on the Karatoya river in Bogra district, Bangladesh."
    },
    {
      question: "सौहगरा ताम्रपत्र में मुख्य रूप से किस प्रशासनिक व्यवस्था का आदेश उत्कीर्ण है?",
      questionEn: "What administrative system is primarily ordered in the Sohgaura Copper Plate?",
      options: ["2 राजकीय अन्नागारों (कोष्ठागारों) की स्थापना व आपातकालीन अकाल राहत", "सैन्य अभियान एवं कर वृद्धि", "बौद्ध धर्म प्रचार एवं स्तूप निर्माण", "नौसेना गठन व जल कर संग्रह"],
      optionsEn: ["Establishment of 2 state granaries (Koshthagara) for emergency famine relief", "Military campaigns and tax hikes", "Buddhist propagation and stupa construction", "Navy formation and water tax collection"],
      correctIndex: 0,
      explanation: "श्रावस्ती के महामात्रों द्वारा जारी इस आदेश में 2 राजकीय कोष्ठागारों के निर्माण तथा केवल अकाल/आपदा काल में प्रजा को अनाज बांटने का निर्देश है।",
      explanationEn: "Issued by the Mahamatras of Shravasti, it orders the construction of 2 state granaries strictly for famine/disaster food distribution."
    },
    {
      question: "महास्थान प्रस्तर लेख में अकाल राहत हेतु किस सिक्का/मुद्रा का उल्लेख आर्थिक सहायता के रूप में मिलता है?",
      questionEn: "Which currency/coin is mentioned in the Mahasthan inscription for famine relief credit?",
      options: ["गंडक (Gandaka)", "कार्षापण (Karshapana)", "दीनार (Dinar)", "रूपक (Rupaka)"],
      optionsEn: ["Gandaka", "Karshapana", "Dinar", "Rupaka"],
      correctIndex: 0,
      explanation: "महास्थान लेख में सम्राट द्वारा अकाल पीड़ितों को धान (अनाज) के साथ 'गंडक' (Gandaka) सिक्कों के रूप में आर्थिक सहायता देने तथा सुभिक्ष आने पर वापस लौटाने की शर्त दर्ज है।",
      explanationEn: "The Mahasthan record mentions providing paddy along with 'Gandaka' coins as emergency credit to famine victims, refundable after prosperity returns."
    },
    {
      question: "सौहगरा ताम्रपत्र एवं महास्थान लेख किस प्राचीन ग्रंथ की अकाल राहत नीति का पुरातात्विक साक्ष्य प्रस्तुत करते हैं?",
      questionEn: "Which ancient text's famine relief policy is archaeologically corroborated by the Sohgaura & Mahasthan inscriptions?",
      options: ["कौटिल्य का अर्थशास्त्र (Kautilya's Arthashastra)", "मेगस्थनीज की इण्डिका", "पतंजलि का महाभाष्य", "विशाखदत्त का मुद्राराक्षस"],
      optionsEn: ["Kautilya's Arthashastra", "Megasthenes' Indica", "Patanjali's Mahabhashya", "Visakhadatta's Mudrarakshasa"],
      correctIndex: 0,
      explanation: "कौटिल्य के अर्थशास्त्र (अधिकरण 4) में उल्लिखित राजकीय अन्नागारों एवं अकाल राहत उपायों का प्रत्यक्ष पुरातात्विक साक्ष्य सौहगरा व महास्थान लेखों में मिलता है।",
      explanationEn: "These inscriptions provide direct archaeological evidence of state granaries and famine relief measures outlined in Kautilya's Arthashastra."
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
    body: bodyHi,
    bodyEn: bodyEn,
    faqs,
    mcqs,
    mainImage: {
      _type: "image",
      asset: { _type: "reference", _ref: userAssetId },
      alt: "सौहगरा ताम्रपत्र लेख एवं महास्थान प्रस्तर लेख (Sohgaura Copper Plate & Mahasthan Inscription Artefact)",
      caption: "सौहगरा ताम्रपत्र लेख (गोरखपुर) — प्राचीन भारत में मौर्यकालीन आपदा प्रबंधन, अन्नागार (कोष्ठागार) व अकाल राहत का प्रथम पुरातात्विक प्रमाण।"
    }
  };

  console.log("Publishing article directly to Sanity CMS...");
  const res = await client.createOrReplace(doc);
  console.log(`Successfully published document to Sanity! Document ID: ${res._id}`);
}

main().catch(console.error);
