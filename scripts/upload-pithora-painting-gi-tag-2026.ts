import { createClient } from "@sanity/client";
import * as dotenv from "dotenv";
import * as path from "path";
import * as fs from "fs";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const {
  NEXT_PUBLIC_SANITY_PROJECT_ID: projectId,
  NEXT_PUBLIC_SANITY_DATASET: dataset,
  SANITY_API_WRITE_TOKEN: token,
} = process.env;

if (!projectId || !dataset || !token) {
  console.error("❌ Missing Sanity environment variables in .env.local!");
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
  console.log("🎨 SEO Optimizing & Re-Publishing Pithora Painting GI Tag (2026) Article to Sanity CMS...");

  const img1Path = "/Users/aakariastech/.gemini/antigravity-ide/brain/fd3a9409-fc40-42fe-b9fb-a975a01b25dd/pithora_painting_rathwa_mural_1789036334954.jpg";
  const img2Path = "/Users/aakariastech/.gemini/antigravity-ide/brain/fd3a9409-fc40-42fe-b9fb-a975a01b25dd/lakhara_artisan_painting_wall_1789036502175.jpg";
  const img3Path = "/Users/aakariastech/.gemini/antigravity-ide/brain/fd3a9409-fc40-42fe-b9fb-a975a01b25dd/pithora_painting_motifs_closeup_1789036672659.jpg";
  const img4Path = "/Users/aakariastech/.gemini/antigravity-ide/brain/fd3a9409-fc40-42fe-b9fb-a975a01b25dd/pithora_canvas_art_gi_tag_1789036690764.jpg";
  const img5Path = "/Users/aakariastech/.gemini/antigravity-ide/brain/fd3a9409-fc40-42fe-b9fb-a975a01b25dd/bhuri_bai_pithora_dots_canvas_1789039639825.jpg";

  console.log("📸 Uploading Image Assets to Sanity CMS...");

  const img1Asset = await client.assets.upload("image", fs.createReadStream(img1Path), { filename: "pithora_painting_rathwa_mural.jpg" });
  const img2Asset = await client.assets.upload("image", fs.createReadStream(img2Path), { filename: "lakhara_artisan_painting_wall.jpg" });
  const img3Asset = await client.assets.upload("image", fs.createReadStream(img3Path), { filename: "pithora_painting_motifs_closeup.jpg" });
  const img4Asset = await client.assets.upload("image", fs.createReadStream(img4Path), { filename: "pithora_canvas_art_gi_tag.jpg" });
  const img5Asset = await client.assets.upload("image", fs.createReadStream(img5Path), { filename: "bhuri_bai_pithora_dots_canvas.jpg" });

  const titleHi = "पिथोरा पेंटिंग को मिला भौगोलिक संकेत (GI) टैग (2026): मध्य प्रदेश व गुजरात की भील-राठवा अनुष्ठानिक भित्ति कला, पद्म श्री भूरी बाई एवं जीआई पहचान | MPPSC & UPSC Notes";
  const titleEn = "Pithora Painting Granted Geographical Indication (GI) Tag (2026): MP & Gujarat Bhil-Rathwa Ritual Wall Art, Padma Shri Bhuri Bai & GI Impact | MPPSC & UPSC";

  const excerptHi = "मध्य प्रदेश (झाबुआ, अलीराजपुर) और गुजरात (छोटा उदयपुर) की भील, भीलाला व राठवा जनजातियों की पवित्र अनुष्ठानिक भित्ति कला 'पिथोरा पेंटिंग' को 2026 में GI टैग मिला। लिखांद्र, झोकरा व बड़वा अनुष्ठान, 7 घोड़ों (7 पहाड़ियों) का प्रतीक, पद्म श्री भूरी बाई (2021), गंगू बाई, दूध-मदिरा प्राकृतिक लेप, 10 FAQs तथा 8 मॉडल MCQs का संपूर्ण MPPSC व UPSC नोट्स।";
  const excerptEn = "Comprehensive guide on Pithora Painting awarded GI Tag in 2026. Covers MP & Gujarat Bhil-Rathwa tribal heritage, Likhindra/Jhokhara/Badwa roles, 7 Horses representing 7 Hills, Padma Shri Bhuri Bai (2021), Gangu Bai, natural dyes with milk & alcohol binders, 10 FAQs, and 8 model MCQs for MPPSC & UPSC exams.";

  const slug = "pithora-painting-gi-tag-2026-rathwa-tribe-gujarat-mppsc-upsc-notes";
  const publishedAt = "2026-09-10T09:00:00.000Z";
  const caDate = "2026-09-10";

  const bodyHi = [
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "मध्य प्रदेश एवं गुजरात के आदिवासी बहुल क्षेत्रों, विशेष रूप से **भील (Bhil)**, **भीलाला (Bhilala)** तथा **राठवा (Rathwa)** जनजातियों की सदियों पुरानी अनुष्ठानिक भित्ति चित्रकारी परंपरा, **पिथोरा पेंटिंग (Pithora Painting)** को वर्ष **2026 में भौगोलिक संकेत (GI) टैग** से सम्मानित किया गया है। यह केवल चित्रकारी नहीं है, बल्कि जनजातीय आस्था, संकल्प, मन्नत (badha/mannat) और अनुष्ठान की एक पवित्र व जीवंत लोक परंपरा है। मध्य प्रदेश लोक सेवा आयोग (**MPPSC प्रारंभिक एवं मुख्य परीक्षा प्रश्नपत्र 1 - मध्य प्रदेश की जनजातीय कला व संस्कृति**) तथा **UPSC GS Paper 1** के दृष्टिकोण से पिथोरा चित्रकला पर यह विस्तृत नोट्स अति-महत्वपूर्ण है।",
        },
      ],
    },
    {
      _type: "image",
      asset: { _type: "reference", _ref: img1Asset._id },
      alt: "पिथोरा पेंटिंग जीआई टैग 2026: मध्य प्रदेश व गुजरात की भील-राठवा भित्ति चित्रकला | MPPSC & UPSC Notes",
      caption: "चित्र 1: पवित्र पिथोरा भित्ति चित्रकला — गाय के गोबर व मिट्टी से लिपी मुख्य दीवार पर 7 घोड़ों, पिथोरा देव एवं प्राकृतिक रंगों का संयोजन।"
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "1. पिथोरा पेंटिंग: मध्य प्रदेश व गुजरात में भौगोलिक विस्तार (Geographical Spread in MP & Gujarat)" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **मध्य प्रदेश में मुख्य क्षेत्र (Core MP Region)**: पश्चिमी मध्य प्रदेश के **झाबुआ (Jhabua)**, **अलीराजपुर (Alirajpur)** तथा **इंदौर (Indore)** के निकटवर्ती जनजातीय क्षेत्रों में यह व्यापक रूप से प्रचलित है।\n• **उद्गम स्थल (Origin Village)**: झाबुआ/अलीराजपुर जिले के **भाबरा ग्राम (Bhabhra Village)** को पिथौरा कला का मुख्य उद्गम स्थल माना जाता है।\n• **गुजरात का क्षेत्र**: गुजरात के छोटा उदयपुर (Chhota Udepur) तथा पंचमहल (Panchmahal) जिले।\n• **संबद्ध जनजातियां (Associated Tribes)**: मुख्य रूप से **भील (Bhil)**, **भीलाला (Bhilala)**, **राठवा (Rathwa)** तथा **नायका (Nayaka)** समुदाय।\n• **नामकरण व मान्यता**: यह कला जनजातीय देवता **बाबा पिथोरा / पिथोरा दे (Pithora Dev)** के नाम पर है। माना जाता है कि इसे घर की दीवारों पर चित्रित करने से घर में शांति, खुशहाली, आरोग्य और सौहार्द का वास होता है।",
        },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "2. पिथोरा कला के प्रमुख अनुष्ठानिक पात्र: लिखांद्र, झोकरा व बड़वा (Key Terminology & Roles)" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **लिखांद्र / लखारा (Likhindra / Lakhara)**: पिथोरा चित्र बनाने वाले मुख्य विशेषज्ञ अनुष्ठान चित्रकारों को **'लिखांद्र'** (या लखारा) कहा जाता है।\n• **झोकरा (Jhokhara)**: पिथोरा चित्रकला के दौरान लगने वाली सामग्रियों, चढ़ावे तथा अनुष्ठान का **हिसाब रखने वाले व्यक्ति को 'झोकरा' (Jhokhara)** कहा जाता है (MPPSC स्पेशल फैक्ट)।\n• **बड़वा पुजारी (Badwa Pujari)**: अनुष्ठान संपन्न कराने वाले सर्वोच्च पद पर आसीन आदिवासी पुजारी को **'बड़वा' (Badwa)** कहा जाता है।\n• **धार्मिक श्रद्धा**: भील व राठवा समुदाय के लोग धार्मिक प्रवृत्ति के होते हैं और मन्नत पूरी होने (विवाह, जन्म, फसल कटाई) पर अपने घरों में पिथोरा चित्र बनवाने में बहुत धन व संसाधन अर्पित करते हैं।",
        },
      ],
    },
    {
      _type: "image",
      asset: { _type: "reference", _ref: img2Asset._id },
      alt: "लिखांद्र चित्रकार एवं बड़वा पुजारी द्वारा पिथोरा चित्रकला का निर्माण | MPPSC Notes",
      caption: "चित्र 2: बड़वा पुजारी की उपस्थिति में लिखांद्र चित्रकार द्वारा बांस की कूची व प्राकृतिक रंगों से अनुष्ठानिक पिथोरा चित्रकारी।"
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "3. रंग, सामग्री एवं पारंपरिक निर्माण विधि (Natural Pigments & Binders)" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **दीवार की तैयारी (Wall Plastering)**: घरों की भीतरी दीवारों, ओसारियों या दहलीज को पहले **गाय के गोबर और मिट्टी (Cow dung & Mud)** से लिपा जाता है।\n• **प्राकृतिक रंग (Natural Pigments)**: इसमें प्राकृतिक रंगों का उपयोग किया जाता है:\n  - **गेरू (Red Ochre)**\n  - **खड़िया / चूना (White Chalk/Lime)**\n  - **हल्दी (Turmeric Yellow)**\n  - **हिंगुल / सिंदूरी (Vermilion Red)**\n  - **तवे की कालिक (Stove Soot Black)**\n  - **हरा, नीला, आसमानी व चांदनी रंग**\n• **प्राकृतिक घोलक/बाइंडर (Natural Binder)**: रंगों को घोलने तथा स्थायित्व देने के लिए उन्हें **दूध (Milk) एवं मदिरा (Alcohol/Liquor)** में घोला जाता है (विशेष परीक्षा तथ्य)।\n• **पारंपरिक कूँची (Brush Implements)**: ब्रश बनाने के लिए **बेंत (Cane)** या **टहनी के किनारों को कूटकर** कूची बनाई जाती थी, जिनका स्थान अब बाजार के ब्रशों ने ले लिया है।",
        },
      ],
    },
    {
      _type: "image",
      asset: { _type: "reference", _ref: img3Asset._id },
      alt: "पिथोरा कला में 7 घोड़ों एवं 7 पहाड़ियों का प्रतीक | MPPSC & UPSC Notes",
      caption: "चित्र 3: पिथोरा कला का मुख्य विषय — पिथोरा बाबा के प्रतीक 7 घोड़े (जो क्षेत्र की 7 पहाड़ियों को दर्शाते हैं) एवं प्रकृति का चित्रांकन।"
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "4. विषय-वस्तु एवं 7 घोड़ों (7 पहाड़ियों) का प्रतीक (Motifs & Symbolism of 7 Horses)" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **सात घोड़ों का प्रतीक (7 Horses = 7 Hills)**: इन चित्रों में पिथोरा बाबा के मुख्य प्रतीक **सात घोड़े** उकेरे जाते हैं, जो **क्षेत्र की सात पहाड़ियों (Seven Hills of the region)** को दर्शाते हैं।\n• **घोड़े का महत्व**: घोड़ा दिव्य शक्ति, सामर्थ्य, गति और समृद्धि का सर्वोच्च प्रतीक है।\n• **अन्य प्रमुख विषय**: देवी-देवता (गणेश जी, पिथोरी देवी, सूर्य, चंद्रमा), पशु-पक्षी (हाथी, मोर, हिरण) तथा दैनिक जीवन के दृश्य (कृषि, शिकार, ढोल-नाच, उत्सव)।",
        },
      ],
    },
    {
      _type: "image",
      asset: { _type: "reference", _ref: img5Asset._id },
      alt: "पद्म श्री भूरी बाई: भील पिथोरा पेंटिंग को कैनवास पर उतारने वाली पहली महिला | MPPSC Notes",
      caption: "चित्र 4: पद्म श्री भूरी बाई (झाबुआ) — बहु-रंगीन बिंदुओं (dot style) से कैनवास पर पिथोरा कला का सृजन करने वाली प्रख्यात भील कलाकार।"
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "5. मध्य प्रदेश के प्रख्यात पिथोरा कलाकार: भूरी बाई व गंगू बाई (Prominent MP Artists)" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **पद्म श्री भूरी बाई (Padma Shri Bhuri Bai)**:\n  - **जन्म व गांव**: मध्य प्रदेश के झाबुआ जिले के **पिटोल गांव (Pitol Village)** में एक भील परिवार में जन्म।\n  - **ऐतिहासिक उपलब्धि**: पारंपरिक भित्तिचित्रों (दीवारों) से बाहर निकलकर **कागज और कैनवास पर चित्रकारी करने वाली भील समुदाय की पहली महिला कलाकार**।\n  - **खोज का श्रेय**: भोपाल में **भारत भवन (Bharat Bhavan)** के निर्माण के दौरान मजदूरी करते समय प्रसिद्ध चित्रकार व निदेशक **जे. स्वामीनाथन (J. Swaminathan)** ने उनकी कला को पहचाना और कैनवास पर उतारने की प्रेरणा दी।\n  - **विशिष्ट शैली**: इनकी पेंटिंग की मुख्य पहचान **बहु-रंगीन बिंदु (Multi-coloured dots)** हैं।\n  - **आधुनिक विषयों का समावेश**: इन्होंने पारंपरिक प्रकृति व देवी-देवताओं के साथ-साथ **हवाई जहाज, टेलीविजन, बस और कारों** जैसी आधुनिक वस्तुओं को कला में सहजता से शामिल किया।\n  - **पद्म श्री पुरस्कार**: भारत सरकार द्वारा वर्ष **2021 में देश का चौथा सर्वोच्च नागरिक सम्मान 'पद्म श्री'** प्रदान किया गया।\n• **गंगू बाई (Gangu Bai)**: भोपाल स्थित मानव संग्रहालय (Indira Gandhi Rashtriya Manav Sangrahalaya - IGRMS) के 'करो और सीखो' कार्यक्रम में पारम्परिक भील/पिथोरा कला का प्रशिक्षण देने वाली प्रसिद्ध कलाकार।",
        },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "6. MPPSC मुख्य परीक्षा (Mains) हेतु आदर्श उत्तर ढांचा (Model Mains Answer)" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **प्रश्न (MPPSC Mains 5 अंक / 50 शब्द)**: 'मध्य प्रदेश की पिथोरा चित्रकला की प्रमुख विशेषताओं पर टिप्पणी लिखिए।'\n• **आदर्श उत्तर (Model Answer)**:\n  1. **परिचय**: पश्चिमी मध्य प्रदेश (झाबुआ, अलीराजपुर) के भील एवं भीलाला जनजातियों की पवित्र अनुष्ठानिक भित्ति कला।\n  2. **प्रतीक**: मुख्य विषय 'बाबा पिथोरा', जिसमें **7 घोड़े** क्षेत्र की **7 पहाड़ियों** का प्रतिनिधित्व करते हैं।\n  3. **कलाकार व पात्र**: भित्तिचित्र निर्माता को **लिखांद्र**, अनुष्ठान पुरोहित को **बड़वा** तथा हिसाब रखने वाले को **झोकरा** कहते हैं।\n  4. **सामग्री**: गोबर-मिट्टी से लिपी दीवार पर प्राकृतिक रंगों को **दूध व मदिरा** के घोल में मिलाकर चित्रण।\n  5. **प्रमुख कलाकार व उपलब्धि**: **पद्म श्री भूरी बाई (2021)** एवं वर्ष **2026 में प्रतिष्ठित GI टैग** प्राप्त।",
        },
      ],
    },
    {
      _type: "image",
      asset: { _type: "reference", _ref: img4Asset._id },
      alt: "पिथोरा पेंटिंग जीआई टैग 2026 प्रमाणीकरण एवं आर्थिक प्रभाव | MPPSC & UPSC",
      caption: "चित्र 5: आधुनिक कैनवास पर पिथोरा कला एवं जीआई टैग 2026 — जनजातीय कारीगरों का अंतर्राष्ट्रीय बाजार में सशक्तीकरण।"
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "7. भौगोलिक संकेत (GI Tag 2026) का महत्व" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **प्रामाणिकता व विधिक संरक्षण**: वर्ष 2026 में जीआई टैग मिलने से भील व राठवा कला की प्रामाणिकता सुरक्षित होगी।\n• **नकल पर रोक**: बाजारों में व्यावसायिक मशीन-प्रिंट डुप्लिकेट्स पर कानूनी रोक।\n• **स्थायी आजीविका**: झाबुआ, अलीराजपुर व छोटा उदयपुर के हजारों लिखांद्र कारीगरों को अंतरराष्ट्रीय पहचान और बेहतर आय।",
        },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "8. MPPSC व UPSC परीक्षा उपयोगी अति-महत्वपूर्ण तथ्य (Key Exam Summary Points)" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **कला का प्रकार**: भील व राठवा जनजातीय अनुष्ठानिक भित्ति चित्रकला।\n• **मध्य प्रदेश में केंद्र**: झाबुआ, अलीराजपुर (भाबरा ग्राम), इंदौर।\n• **गुजरात में केंद्र**: छोटा उदयपुर, पंचमहल।\n• **मुख्य चित्रकार (Artist)**: लिखांद्र / लखारा (Likhindra / Lakhara)।\n• **हिसाब रखने वाला (Accountant)**: झोकरा (Jhokhara)।\n• **सर्वोच्च पुजारी (Priest)**: बड़वा (Badwa Pujari)।\n• **सात घोड़ों का प्रतीक**: क्षेत्र की 7 पहाड़ियां।\n• **रंगों का घोलक/बाइंडर**: दूध एवं मदिरा (Milk & Alcohol)।\n• **पद्म श्री भूरी बाई (2021)**: पिटोल गांव (झाबुआ), कैनवास पर पहली भील महिला चित्रकार, बिंदु शैली (dot style), भारत भवन भोपाल।\n• **जीआई टैग वर्ष**: 2026 (Geographical Indications Registry, Chennai)।",
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
          text: "The centuries-old ritualistic wall art tradition of the **Bhil**, **Bhilala**, and **Rathwa** tribal communities across Madhya Pradesh and Gujarat, known as **Pithora Painting**, has been officially awarded the **Geographical Indication (GI) Tag in 2026**. It is not merely a painting technique, but a sacred living folk tradition of faith, vows (badha/mannat), and spiritual rituals. This expanded study guide is tailored specifically for civil service aspirants preparing for **MPPSC (Prelims & Mains Paper 1 - MP Tribal Art & Culture)** and **UPSC GS Paper 1 (Art & Culture)**.",
        },
      ],
    },
    {
      _type: "image",
      asset: { _type: "reference", _ref: img1Asset._id },
      alt: "Pithora Painting GI Tag 2026: MP & Gujarat Bhil-Rathwa Ritual Wall Art | MPPSC & UPSC Notes",
      caption: "Figure 1: Sacred Pithora wall mural painted on mud & cow dung wall featuring 7 horses, Pithora Dev, and natural dyes."
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "1. Pithora Painting: Geographical Spread in MP & Gujarat" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **Madhya Pradesh Hub**: Widely practiced across Western MP tribal belts—predominantly in **Jhabua**, **Alirajpur**, and neighboring parts of **Indore**.\n• **Origin Village**: **Bhabhra Village** in Jhabua/Alirajpur district is regarded as the core point of origin for Pithora art in MP.\n• **Gujarat Hub**: Chhota Udepur and Panchmahal districts.\n• **Associated Tribes**: **Bhil**, **Bhilala**, **Rathwa**, and **Nayaka** indigenous groups.\n• **Deity & Beliefs**: Named after **Pithora Baba / Pithora Dev**. Drawing this mural on home walls is believed to bring peace, prosperity, health, and communal harmony.",
        },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "2. Key Terminology & Ritual Roles: Likhindra, Jhokhara & Badwa" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **Likhindra / Lakhara (Master Painter)**: The master ritual painter who draws the mural figures is called **'Likhindra'** (or Lakhara).\n• **Jhokhara (Inventory Keeper)**: The person responsible for maintaining the accounts, offerings, and inventory during the ritual painting is called **'Jhokhara'** (Key MPPSC Fact).\n• **Badwa Pujari (Supreme Priest)**: The high priest presiding over the ritualistic ceremony and prayers is called **'Badwa'**.\n• **Religious Devotion**: Bhil and Rathwa families invest substantial resources into installing Pithora paintings upon fulfilling vows (marriage, childbirth, bumper harvest).",
        },
      ],
    },
    {
      _type: "image",
      asset: { _type: "reference", _ref: img2Asset._id },
      alt: "Likhindra Painter and Badwa Priest executing Pithora art | MPPSC Notes",
      caption: "Figure 2: Likhindra painter rendering Pithora murals under the guidance of Badwa priest using natural bamboo brushes."
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "3. Colors, Implements & Natural Binders (Milk & Alcohol)" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **Wall Preparation**: Walls and verandas are coated with an organic layer of **Cow Dung and Mud (Gobhar & Mitti)**.\n• **Natural Pigments**: Organic pigments include **Geru** (Red Ochre), **Khadiya** (White Chalk), **Turmeric** (Haldi Yellow), **Hingul** (Vermilion), and **Stove Soot** (Black).\n• **Natural Binder (Milk & Alcohol)**: Pigments are traditionally dissolved in a binding mixture of **Milk and Alcohol/Madira** to ensure color adhesion and vibrancy.\n• **Traditional Brushes**: Handmade brushes were prepared by crushing the tips of **cane sticks or wooden twigs**.",
        },
      ],
    },
    {
      _type: "image",
      asset: { _type: "reference", _ref: img3Asset._id },
      alt: "Pithora Art 7 Horses Symbolism of 7 Hills | MPPSC & UPSC Notes",
      caption: "Figure 3: Central Pithora motif — 7 horses representing the 7 sacred hills of the region alongside natural flora and fauna."
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "4. Motifs & Symbolism of 7 Horses (Seven Hills)" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **7 Horses = 7 Hills**: The central motif depicts **7 sacred horses** of Pithora Baba, representing the **7 sacred hills of the region**.\n• **Horse Symbolism**: Represents divine strength, speed, prosperity, and heavenly protection.\n• **Other Motifs**: Tribal deities (Ganesha, Pithori Devi, Sun, Moon), wildlife (elephants, peacocks), and village scenes (farming, hunting, drumming).",
        },
      ],
    },
    {
      _type: "image",
      asset: { _type: "reference", _ref: img5Asset._id },
      alt: "Padma Shri Bhuri Bai Bhil Pithora Dot Style Canvas Art | MPPSC Notes",
      caption: "Figure 4: Padma Shri Bhuri Bai (Jhabua) — pioneer Bhil artist who transitioned Pithora art onto paper & canvas using multi-colored dot techniques."
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "5. Prominent MP Pithora Artists: Padma Shri Bhuri Bai & Gangu Bai" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **Padma Shri Bhuri Bai**:\n  - **Origin**: Born in **Pitol Village, Jhabua District, Madhya Pradesh** in a Bhil family.\n  - **Historic Milestone**: First Bhil female artist to transition traditional Pithora wall art onto **paper and canvas**.\n  - **Discovery**: Discovered by legendary artist **J. Swaminathan** while working as a construction laborer at **Bharat Bhavan Bhopal**.\n  - **Signature Style**: Distinguished by **multi-coloured dots**.\n  - **Modern Motifs**: Blended traditional nature and gods with modern elements like **airplanes, buses, cars, and televisions**.\n  - **Padma Shri Award**: Honored with India's 4th highest civilian award **Padma Shri in 2021**.\n• **Gangu Bai**: Master Bhil artist conducting workshops at **IGRMS (Manav Sangrahalaya Bhopal)**, popularizing Bhil Pithora art.",
        },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "6. MPPSC Mains Model Answer (5-Marker)" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **Question (MPPSC Mains 5 Marks / 50 Words)**: 'Write a short note on Pithora Art of Madhya Pradesh.'\n• **Model Answer**:\n  1. **Intro**: Sacred ritualistic wall art of Bhil & Bhilala tribes across Western MP (Jhabua, Alirajpur).\n  2. **Deity & Symbolism**: Dedicated to Baba Pithora; central **7 horses** represent the **7 sacred hills** of the region.\n  3. **Roles**: Rendered by **Likhindra** (artist) under **Badwa** (priest), while **Jhokhara** manages ritual accounts.\n  4. **Technique**: Natural pigments mixed in **milk & alcohol** binder applied on cow dung plastered walls.\n  5. **Renowned Artist**: **Padma Shri Bhuri Bai (2021)** & granted **GI Tag in 2026**.",
        },
      ],
    },
    {
      _type: "image",
      asset: { _type: "reference", _ref: img4Asset._id },
      alt: "Pithora Painting GI Tag 2026 Certification & Economic Impact | MPPSC & UPSC",
      caption: "Figure 5: Contemporary Pithora canvas art with GI Tag 2026 certification seal, empowering artisans globally."
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "7. Significance of GI Tag (2026)" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **Authenticity & Legal Rights**: Provides GI protection for Bhil & Rathwa tribal art origin in 2026.\n• **Prevents Misuse**: Stops unauthorized commercial machine prints.\n• **Sustainable Income**: Improves livelihoods for Likhindra artisans across Jhabua, Alirajpur, and Chhota Udepur.",
        },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "8. Key Summary Takeaways for MPPSC & UPSC Exams" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **Art Form**: Bhil & Rathwa Ritualistic Tribal Wall Art.\n• **MP Centers**: Jhabua (Pitol village), Alirajpur (Bhabhra village), Indore.\n• **Master Painter**: Likhindra / Lakhara.\n• **Account Keeper**: Jhokhara.\n• **High Priest**: Badwa Pujari.\n• **7 Horses Symbol**: 7 Hills of the region.\n• **Natural Binder**: Milk & Alcohol (Madira).\n• **Padma Shri Bhuri Bai (2021)**: Pitol village (Jhabua), dot style, first female Bhil canvas painter, Bharat Bhavan Bhopal.\n• **GI Tag Year**: 2026 (GI Registry Chennai).",
        },
      ],
    },
  ];

  const faqs = [
    {
      _key: "faq1",
      question: "पिथोरा पेंटिंग क्या है और यह मध्य प्रदेश में किस जनजाति से संबंधित है?",
      answer: "पिथोरा चित्रकला मध्य प्रदेश (झाबुआ, अलीराजपुर, इंदौर) और गुजरात (छोटा उदयपुर) की भील, भीलाला तथा राठवा जनजातियों की एक प्रसिद्ध अनुष्ठानिक भित्ति (दीवार) चित्रकला है।",
      questionEn: "What is Pithora Painting and which MP tribe is it related to?",
      answerEn: "Pithora painting is a famous ritualistic wall art form practiced by the Bhil, Bhilala, and Rathwa tribes across MP (Jhabua, Alirajpur, Indore) and Gujarat (Chhota Udepur)."
    },
    {
      _key: "faq2",
      question: "पिथोरा चित्रकला कहां की है?",
      answer: "पिथोरा चित्रकला मुख्य रूप से मध्य प्रदेश के झाबुआ व अलीराजपुर जिलों (उद्गम: भाबरा ग्राम) तथा गुजरात के छोटा उदयपुर एवं पंचमहल जिलों की प्रसिद्ध लोक चित्रकला है।",
      questionEn: "Where does Pithora painting originate from?",
      answerEn: "Pithora painting originates from Jhabua and Alirajpur districts of Madhya Pradesh (origin: Bhabhra village) and Chhota Udepur & Panchmahal districts of Gujarat."
    },
    {
      _key: "faq3",
      question: "पिथोरा चित्रकला में 'लिखांद्र', 'झोकरा' और 'बड़वा' कौन हैं?",
      answer: "चित्र बनाने वाले विशेष कलाकार को 'लिखांद्र' (या लखारा), अनुष्ठान सामग्री व चढ़ावे का हिसाब रखने वाले को 'झोकरा' तथा अनुष्ठान संपन्न कराने वाले पुजारी को 'बड़वा' कहा जाता है।",
      questionEn: "Who are 'Likhindra', 'Jhokhara', and 'Badwa' in Pithora painting?",
      answerEn: "'Likhindra' (or Lakhara) is the master mural painter, 'Jhokhara' is the account/inventory keeper, and 'Badwa' is the high priest presiding over the ritual."
    },
    {
      _key: "faq4",
      question: "पिथोरा का अर्थ किस देवता से है?",
      answer: "पिथोरा कला का नाम जनजातीय देवता 'बाबा पिथोरा' (पिथोरा दे) से है, जिन्हें समृद्धि, संतानोत्पत्ति, आरोग्य और शांति देने वाला देवता माना जाता है।",
      questionEn: "Which deity is Pithora painting named after?",
      answerEn: "Pithora art is named after the tribal deity 'Baba Pithora' (Pithora Dev), believed to bestow prosperity, health, and family well-being."
    },
    {
      _key: "faq5",
      question: "पद्म श्री भूरी बाई और पिथोरा पेंटिंग का क्या संबंध है?",
      answer: "पद्म श्री भूरी बाई झाबुआ के पिटोल गांव की प्रसिद्ध भील चित्रकार हैं, जो पारंपरिक पिथोरा भित्तिचित्रों को कागज और कैनवास पर उतारने वाली पहली भील महिला कलाकार हैं। इन्हें वर्ष 2021 में पद्म श्री से सम्मानित किया गया।",
      questionEn: "What is the association between Padma Shri Bhuri Bai and Pithora painting?",
      answerEn: "Padma Shri Bhuri Bai is a renowned Bhil artist from Pitol village (Jhabua) who pioneered transferring traditional Pithora wall art onto paper & canvas, awarded Padma Shri in 2021."
    },
    {
      _key: "faq6",
      question: "पिथोरा चित्रकला में सात घोड़ों (7 Horses) का क्या प्रतीक है?",
      answer: "पिथोरा चित्रों में उकेरे जाने वाले सात घोड़े (7 Horses) मुख्य रूप से क्षेत्र की सात पहाड़ियों (7 Hills of the region) को दर्शाते हैं।",
      questionEn: "What do the 7 Horses symbolize in Pithora painting?",
      answerEn: "The seven horses painted in Pithora murals primarily symbolize the seven sacred hills of the region."
    },
    {
      _key: "faq7",
      question: "पिथोरा पेंटिंग में रंगों को घोलने के लिए किस घोलक/बाइंडर का उपयोग किया जाता है?",
      answer: "रंगों (गेरू, खड़िया, हल्दी, हिंगुल, कालिक) को घोलने और स्थायित्व प्रदान करने के लिए 'दूध एवं मदिरा' (Milk & Alcohol) का मिश्रण उपयोग किया जाता है।",
      questionEn: "Which binder liquid is used to dissolve colors in Pithora painting?",
      answerEn: "A natural mixture of Milk and Alcohol (Madira) is traditionally used to dissolve pigments for adhesion."
    },
    {
      _key: "faq8",
      question: "भूरी बाई को भोपाल के भारत भवन में किसने पहचाना था?",
      answer: "भोपाल के भारत भवन निर्माण के दौरान मजदूरी करते समय तत्कालीन निदेशक जे. स्वामीनाथन (J. Swaminathan) ने उनकी कला प्रतिभा को पहचाना था।",
      questionEn: "Who recognized Bhuri Bai's art at Bharat Bhavan Bhopal?",
      answerEn: "Director J. Swaminathan recognized her artistic talent while she was working as a construction laborer at Bharat Bhavan Bhopal."
    },
    {
      _key: "faq9",
      question: "पिथोरा पेंटिंग को GI टैग किस वर्ष मिला है?",
      answer: "पिथोरा पेंटिंग को आधिकारिक रूप से वर्ष 2026 में भौगोलिक संकेत (GI Tag 2026) प्रदान किया गया है।",
      questionEn: "In which year was Pithora Painting granted the GI Tag?",
      answerEn: "Pithora Painting was officially granted the Geographical Indication (GI) Tag in the year 2026."
    },
    {
      _key: "faq10",
      question: "मानव संग्रहालय भोपाल में भील पिथोरा कला का प्रशिक्षण कौन देती हैं?",
      answer: "मानव संग्रहालय (IGRMS Bhopal) के 'करो और सीखो' कार्यक्रम के तहत भील पिथोरा चित्रकला का प्रशिक्षण पारंपरिक कलाकार गंगू बाई (Gangu Bai) द्वारा दिया जाता है।",
      questionEn: "Who imparts Bhil Pithora art training at Manav Sangrahalaya Bhopal?",
      answerEn: "Traditional artist Gangu Bai conducts Bhil Pithora art training workshops under 'Karo aur Seekho' at Manav Sangrahalaya Bhopal."
    }
  ];

  const mcqs = [
    {
      _key: "mcq1",
      question: "पिथोरा चित्रकला मुख्य रूप से मध्य प्रदेश की किस जनजाति से संबंधित है?",
      questionEn: "Pithora Painting is primarily related to which tribe of Madhya Pradesh?",
      options: ["गोंड जनजाति (Gond Tribe)", "भील और भीलाला जनजाति (Bhil & Bhilala Tribe)", "बैगा जनजाति (Baiga Tribe)", "कोर्कू जनजाति (Korku Tribe)"],
      optionsEn: ["Gond Tribe", "Bhil & Bhilala Tribe", "Baiga Tribe", "Korku Tribe"],
      correctIndex: 1,
      explanation: "पिथोरा चित्रकला मुख्य रूप से मध्य प्रदेश (झाबुआ, अलीराजपुर) की भील व भीलाला जनजातियों तथा गुजरात की राठवा जनजाति से संबंधित है।",
      explanationEn: "Pithora painting is primarily associated with Bhil and Bhilala tribes of MP (Jhabua, Alirajpur) and Rathwa tribe of Gujarat."
    },
    {
      _key: "mcq2",
      question: "पिथोरा कला में भित्ति चित्र बनाने वाले विशेषज्ञ कलाकार को क्या कहा जाता है?",
      questionEn: "What is the master artist who paints Pithora wall murals locally called?",
      options: ["झोकरा (Jhokhara)", "लिखांद्र / लिखांदरा (Likhindra)", "बड़वा (Badwa)", "ओझा (Ojha)"],
      optionsEn: ["Jhokhara", "Likhindra / Lakhara", "Badwa", "Ojha"],
      correctIndex: 1,
      explanation: "चित्र बनाने वाले को 'लिखांद्र' (या लखारा), हिसाब रखने वाले को 'झोकरा' तथा अनुष्ठान कराने वाले पुजारी को 'बड़वा' कहते हैं।",
      explanationEn: "The mural artist is called Likhindra, the inventory keeper is Jhokhara, and the priest is Badwa."
    },
    {
      _key: "mcq3",
      question: "पद्म श्री भूरी बाई (2021) मध्य प्रदेश के किस जिले के पिटोल गांव से संबंधित प्रसिद्ध भील चित्रकार हैं?",
      questionEn: "Padma Shri Bhuri Bai (2021) belongs to Pitol village of which district in MP?",
      options: ["धार (Dhar)", "झाबुआ (Jhabua)", "खरगोन (Khargone)", "बड़वानी (Barwani)"],
      optionsEn: ["Dhar", "Jhabua", "Khargone", "Barwani"],
      correctIndex: 1,
      explanation: "पद्म श्री भूरी बाई झाबुआ जिले के पिटोल गांव की प्रसिद्ध भील चित्रकार हैं, जिन्हें 2021 में पद्म श्री से सम्मानित किया गया।",
      explanationEn: "Padma Shri Bhuri Bai hails from Pitol village in Jhabua district, honored with Padma Shri in 2021."
    },
    {
      _key: "mcq4",
      question: "मध्य प्रदेश में पिथोरा चित्रकला का मुख्य उद्गम स्थल किस गांव को माना जाता है?",
      questionEn: "Which village is considered the main origin point of Pithora art in Madhya Pradesh?",
      options: ["भाबरा ग्राम (Bhabhra Village)", "पिटोल ग्राम (Pitol Village)", "बाजना ग्राम (Bajna Village)", "कुक्षी ग्राम (Kukshi Village)"],
      optionsEn: ["Bhabhra Village", "Pitol Village", "Bajna Village", "Kukshi Village"],
      correctIndex: 0,
      explanation: "झाबुआ/अलीराजपुर जिले के भाबरा ग्राम को पिथोरा चित्रकला का उद्गम स्थल माना जाता है।",
      explanationEn: "Bhabhra village in Jhabua/Alirajpur district is recognized as the origin point of Pithora art in MP."
    },
    {
      _key: "mcq5",
      question: "पिथोरा चित्रकला में चित्रित 7 घोड़े मुख्य रूप से किसका प्रतीक हैं?",
      questionEn: "The 7 Horses painted in Pithora murals represent which of the following?",
      options: ["क्षेत्र की 7 पहाड़ियां (7 Hills of the region)", "7 नदियां (7 Rivers)", "7 नक्षत्र (7 Constellations)", "7 महाद्वीप (7 Continents)"],
      optionsEn: ["7 Hills of the region", "7 Rivers", "7 Constellations", "7 Continents"],
      correctIndex: 0,
      explanation: "पिथोरा कला में सात घोड़े क्षेत्र की सात पहाड़ियों (7 Hills) के प्रतीक माने जाते हैं।",
      explanationEn: "The 7 horses of Pithora Baba represent the seven hills of the local geography."
    },
    {
      _key: "mcq6",
      question: "पिथोरा पेंटिंग में प्राकृतिक रंगों को घोलने के लिए पारंपरिक रूप से किस बाइंडर का उपयोग किया जाता है?",
      questionEn: "Which traditional liquid binder is used to mix colors in Pithora painting?",
      options: ["दूध एवं मदिरा (Milk & Alcohol)", "गोंद और जल", "शहद और तेल", "सरसों का तेल"],
      optionsEn: ["Milk & Alcohol (Madira)", "Gum and water", "Honey and oil", "Mustard oil"],
      correctIndex: 0,
      explanation: "पिथोरा पेंटिंग में प्राकृतिक रंगों (गेरू, खड़िया, हल्दी, कालिक) को दूध एवं मदिरा में घोला जाता है।",
      explanationEn: "Natural colors in Pithora painting are mixed in a binding solution of milk and alcohol."
    },
    {
      _key: "mcq7",
      question: "भारत भवन भोपाल में भूरी बाई की कला प्रतिभा को किस चित्रकार व निदेशक ने पहचाना था?",
      questionEn: "Which artist and director identified Bhuri Bai's talent at Bharat Bhavan Bhopal?",
      options: ["जे. स्वामीनाथन (J. Swaminathan)", "एम. एफ. हुसैन (M.F. Husain)", "सैयद हैदर रज़ा", "राम कुमार"],
      optionsEn: ["J. Swaminathan", "M.F. Husain", "Syed Haider Raza", "Ram Kumar"],
      correctIndex: 0,
      explanation: "भारत भवन भोपाल के तत्कालीन निदेशक जे. स्वामीनाथन ने मजदूरी कर रहीं भूरी बाई की कला को पहचाना और कैनवास पर काम करने के लिए प्रेरित किया।",
      explanationEn: "Director J. Swaminathan of Bharat Bhavan Bhopal discovered Bhuri Bai and encouraged her to paint on canvas."
    },
    {
      _key: "mcq8",
      question: "पिथोरा पेंटिंग को किस वर्ष भौगोलिक संकेत (GI Tag) से सम्मानित किया गया है?",
      questionEn: "In which year has Pithora Painting been granted the Geographical Indication (GI Tag)?",
      options: ["2024", "2025", "2026", "2027"],
      optionsEn: ["2024", "2025", "2026", "2027"],
      correctIndex: 2,
      explanation: "पिथोरा पेंटिंग को आधिकारिक रूप से वर्ष 2026 में भौगोलिक संकेत (GI Tag 2026) प्रदान किया गया है।",
      explanationEn: "Pithora Painting was granted the Geographical Indication (GI) Tag in the year 2026."
    }
  ];

  const articleDoc = {
    _id: "ca-pithora-painting-gi-tag-2026",
    _type: "currentAffairs",
    slug: { _type: "slug", current: slug },
    title: titleHi,
    titleEn: titleEn,
    excerpt: excerptHi,
    excerptEn: excerptEn,
    ca_date: caDate,
    publishedAt: publishedAt,
    featured: true,
    readingTime: 7,
    keywords: [
      "pithora painting artist hindi",
      "pithora painting hindi",
      "pithora painting is related to which tribal community",
      "pithora painting is related to which tribe of madhya pradesh",
      "pithora painting which tribe",
      "pithora painting in mp",
      "pithora painting of madhya pradesh",
      "pithora painting artist",
      "pithora painting gi tag",
      "पिथौरा पेंटिंग भूरी बाई",
      "पिथोरा चित्रकला कहां की है",
      "Pithora chitrakala kis janjati se sambandhit hai",
      "Pithora ka arth kis devta se hai",
      "Pithora Painting GI Tag 2026",
      "Padma Shri Bhuri Bai Pithora Art",
      "Bhil Tribe Pithora Painting MP",
      "Alirajpur Jhabua Bhabhra Pitol Pithora",
      "Likhindra Jhokhara Badwa Pithora",
      "7 Horses 7 Hills Pithora Symbol",
      "Gangu Bai Manav Sangrahalaya Bhopal",
      "MPPSC Art and Culture Notes"
    ],
    category: { _type: "reference", _ref: "cat-history" },
    author: { _type: "reference", _ref: "author-aakar" },
    tags: [
      { _type: "reference", _ref: "tag-mppsc" },
      { _type: "reference", _ref: "tag-upsc" },
      { _type: "reference", _ref: "tag-prelims" },
      { _type: "reference", _ref: "tag-mains" },
      { _type: "reference", _ref: "tag-mp-ca" },
    ],
    syllabus: ["GS-1", "MPPSC-Paper-1", "UPSC-GS-1"],
    mainImage: {
      _type: "image",
      asset: { _type: "reference", _ref: img1Asset._id },
      alt: "पिथोरा पेंटिंग जीआई टैग 2026: मध्य प्रदेश व गुजरात की भील-राठवा भित्ति चित्रकला | MPPSC Notes",
      caption: "पिथोरा पेंटिंग — मध्य प्रदेश (झाबुआ, अलीराजपुर) एवं गुजरात की भील व राठवा जनजाति की पवित्र अनुष्ठानिक भित्ति कला (जीआई टैग 2026)।"
    },
    body: bodyHi,
    bodyEn: bodyEn,
    faqs: faqs,
    mcqs: mcqs,
  };

  console.log("🚀 Updating article document in Sanity with SEO Search Intent Highlights & Mains Model Answer...");
  const res = await client.createOrReplace(articleDoc);
  console.log("✅ Successfully updated Pithora article in Sanity CMS!");
  console.log("📄 Document ID:", res._id);
  console.log("🔗 Slug:", res.slug.current);
}

main().catch((err) => {
  console.error("❌ Error uploading article to Sanity CMS:", err);
  process.exit(1);
});
