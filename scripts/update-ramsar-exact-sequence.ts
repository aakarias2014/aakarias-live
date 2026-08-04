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

// Exact sequence matching user screenshots (1 to 101)
const exactRamsarTableHi = [
  ["1", "कोल्लेरू झील", "आंध्र प्रदेश", "2002", "901"],
  ["2", "दीपोर बील", "असम", "2002", "40"],
  ["3", "कंवर (कबर) ताल", "बिहार", "2020", "26.2"],
  ["4", "नागी पक्षी अभयारण्य", "बिहार", "2023", "2"],
  ["5", "नक्ती पक्षी अभयारण्य", "बिहार", "2023", "3.3"],
  ["6", "नंदा झील", "गोवा", "2022", "0.42"],
  ["7", "खिजाडिया डब्ल्यूएलएस", "गुजरात", "2021", "6"],
  ["8", "नलसरोवर बीएस", "गुजरात", "2012", "123"],
  ["9", "थोल झील", "गुजरात", "2021", "6.99"],
  ["10", "वधवाना आर्द्रभूमि", "गुजरात", "2021", "10.38"],
  ["11", "भिंडावास डब्ल्यूएलएस", "हरियाणा", "2021", "4.11"],
  ["12", "सुल्तानपुर राष्ट्रीय उद्यान", "हरियाणा", "2021", "142.5"],
  ["13", "चंद्र ताल", "हिमाचल प्रदेश", "2005", "0.49"],
  ["14", "पोंग बांध झील", "हिमाचल प्रदेश", "2002", "156.62"],
  ["15", "रेणुका झील", "हिमाचल प्रदेश", "2005", "0.2"],
  ["16", "रंगनाथितु बीएस", "कर्नाटक", "2022", "5.18"],
  ["17", "मगाडी केरे संरक्षण अभ्यारण्य", "कर्नाटक", "2024", "0.5"],
  ["18", "अंकसमुद्र पक्षी संरक्षण रिजर्व", "कर्नाटक", "2024", "0.98"],
  ["19", "अघनाशिनी मुहाना", "कर्नाटक", "2024", "4.8"],
  ["20", "अष्टामुडी आर्द्रभूमि", "केरल", "2002", "614"],
  ["21", "सस्थमकोट्टा झील", "केरल", "2002", "3.73"],
  ["22", "वेम्बनाड-कोल आर्द्रभूमि", "केरल", "1905", "1,512.5"],
  ["23", "भोज आर्द्रभूमि", "मध्य प्रदेश", "2002", "32"],
  ["24", "साख्य सागर", "मध्य प्रदेश", "2022", "2.48"],
  ["25", "सिरपुर आर्द्रभूमि", "मध्य प्रदेश", "2022", "1.61"],
  ["26", "यशवंत सागर", "मध्य प्रदेश", "2022", "8.22"],
  ["27", "तावा जलाशय", "मध्य प्रदेश", "2024", "200"],
  ["28", "लोनार झील", "महाराष्ट्र", "2020", "4.27"],
  ["29", "नंदुर मधमेश्वर", "महाराष्ट्र", "2019", "14"],
  ["30", "थाने क्रीक", "महाराष्ट्र", "2022", "65.21"],
  ["31", "लोकटक झील", "मणिपुर", "1990", "266"],
  ["32", "पाला आर्द्रभूमि", "मिजोरम", "2021", "18.5"],
  ["33", "अनसुपा झील", "ओडिशा", "2021", "2.31"],
  ["34", "भितरकनिका मैंग्रोव", "ओडिशा", "2002", "650"],
  ["35", "चिल्का झील", "ओडिशा", "1981", "1,165"],
  ["36", "हीराकुड जलाशय", "ओडिशा", "2021", "654"],
  ["37", "सतकोसिया घाटी", "ओडिशा", "2021", "981.97"],
  ["38", "ताम्पारा झील", "ओडिशा", "2021", "3"],
  ["39", "बीस सीएनआर", "पंजाब", "2019", "64"],
  ["40", "हरिके आर्द्रभूमि", "पंजाब", "1990", "41"],
  ["41", "कंजली आर्द्रभूमि", "पंजाब", "2002", "1.83"],
  ["42", "केशोपुर-मियानी सीएमआर", "पंजाब", "2019", "34"],
  ["43", "नांगल डब्ल्यूएलएस", "पंजाब", "2019", "1"],
  ["44", "रोपड़ आर्द्रभूमि", "पंजाब", "2002", "13.65"],
  ["45", "केओलादेव राष्ट्रीय उद्यान", "राजस्थान", "1981", "28.73"],
  ["46", "सांभर झील", "राजस्थान", "1990", "240"],
  ["47", "चित्रांगुडी बीएस", "तमिलनाडु", "2021", "2.6"],
  ["48", "मन्नार की खाड़ी समुद्री बीआर", "तमिलनाडु", "2022", "526.72"],
  ["49", "कंजीरंकुलम बीएस", "तमिलनाडु", "2022", "0.96"],
  ["50", "करिकिली बीएस", "तमिलनाडु", "2022", "0.584"],
  ["51", "कूनथंकुलम बीएस", "तमिलनाडु", "2021", "0.72"],
  ["52", "पल्लीकरनई मार्श रिजर्व वन", "तमिलनाडु", "2022", "12.475"],
  ["53", "पिचावरम मैंग्रोव", "तमिलनाडु", "2022", "14.786"],
  ["54", "पॉइंट कैलिमेरे डब्ल्यूएलएस और बीएस", "तमिलनाडु", "2002", "389"],
  ["55", "सुचिंद्रम थेरूर आर्द्रभूमि परिसर", "तमिलनाडु", "2022", "0.94"],
  ["56", "उदयमार्थंदपुरम बीएस", "तमिलनाडु", "2022", "0.44"],
  ["57", "वडुवुर बीएस", "तमिलनाडु", "2022", "1.12"],
  ["58", "वेदान्थंगल बीएस", "तमिलनाडु", "2022", "0.4"],
  ["59", "वेलोड बीएस", "तमिलनाडु", "2022", "0.77"],
  ["60", "वेम्बन्नूर आर्द्रभूमि परिसर", "तमिलनाडु", "2022", "0.2"],
  ["61", "कारावेट्टी पक्षी अभयारण्य", "तमिलनाडु", "2024", "4.5"],
  ["62", "लॉन्गवुड शोला आरक्षित वन", "तमिलनाडु", "2024", "1.16"],
  ["63", "नंजरायन पक्षी अभयारण्य", "तमिलनाडु", "2024", "1.3"],
  ["64", "काझुवेली पक्षी अभयारण्य", "तमिलनाडु", "2024", "1,513"],
  ["65", "रुद्रसागर झील", "त्रिपुरा", "2005", "2.4"],
  ["66", "होकेरा आर्द्रभूमि", "जम्मू और कश्मीर केंद्र शासित प्रदेश", "2005", "13.75"],
  ["67", "हाइगम आर्द्रभूमि सीएनआर", "जम्मू और कश्मीर केंद्र शासित प्रदेश", "2022", "8.02"],
  ["68", "शैलबुघ वेटलैंड सीएनआर", "जम्मू और कश्मीर केंद्र शासित प्रदेश", "2022", "16.75"],
  ["69", "सुरिंसर-मानसर झीलें", "जम्मू और कश्मीर केंद्र शासित प्रदेश", "2005", "3.5"],
  ["70", "वुलर झील", "जम्मू और कश्मीर केंद्र शासित प्रदेश", "1990", "189"],
  ["71", "त्सो कार", "लद्दाख केंद्र शासित प्रदेश", "2020", "95.77"],
  ["72", "त्सोमोरिरि", "लद्दाख केंद्र शासित प्रदेश", "2002", "120"],
  ["73", "बखीरा डब्ल्यूएलएस", "उत्तर प्रदेश", "2021", "28.94"],
  ["74", "हैदरपुर आर्द्रभूमि", "उत्तर प्रदेश", "2021", "69"],
  ["75", "नवाबगंज बीएस", "उत्तर प्रदेश", "2019", "2"],
  ["76", "पार्वती अर्गा बीएस", "उत्तर प्रदेश", "2019", "7"],
  ["77", "समन बीएस", "उत्तर प्रदेश", "2019", "5"],
  ["78", "समसपुर बीएस", "उत्तर प्रदेश", "2019", "8"],
  ["79", "सैंडी बीएस", "उत्तर प्रदेश", "2019", "3"],
  ["80", "सरसाई नवार झील", "उत्तर प्रदेश", "2019", "2"],
  ["81", "सुर सरोवर (कीथम झील)", "उत्तर प्रदेश", "2020", "4.31"],
  ["82", "ऊपरी गंगा नदी (बृजघाट से नरोरा तक)", "उत्तर प्रदेश", "2005", "265.9"],
  ["83", "आसन बैराज", "उत्तराखंड", "2020", "4.44"],
  ["84", "पूर्वी कोलकाता आर्द्रभूमि", "पश्चिम बंगाल", "2002", "125"],
  ["85", "सुंदरबन आर्द्रभूमि", "पश्चिम बंगाल", "2019", "4,230"],
  ["86", "सक्कराकोट्टई पक्षी अभयारण्य", "तमिलनाडु", "2025", "–"],
  ["87", "थेरथांगल पक्षी अभयारण्य", "तमिलनाडु", "2025", "–"],
  ["88", "खेचेओपालरी आर्द्रभूमि", "सिक्किम", "2025", "–"],
  ["89", "उधवा झील", "झारखंड", "2025", "–"],
  ["90", "खिचन (फलोदी)", "राजस्थान", "2025", "–"],
  ["91", "मेनार (उदयपुर)", "राजस्थान", "2025", "–"],
  ["92", "गोकुल जलाशय", "बिहार", "2025", "–"],
  ["93", "उदयपुर झील", "बिहार", "2025", "–"],
  ["94", "गोगबील झील", "बिहार", "2025", "–"],
  ["95", "सिलिसरह झील", "राजस्थान", "2025", "–"],
  ["96", "कोपरा जलाशय", "छत्तीसगढ़", "2025", "–"],
  ["97", "पटना पक्षी अभयारण्य", "उत्तर प्रदेश", "2026", "–"],
  ["98", "छारी-धंड", "कच्छ (गुजरात)", "2026", "–"],
  ["99", "शेखा झील पक्षी अभयारण्य", "उत्तर प्रदेश", "2026", "–"],
  ["100", "जय प्रकाश नारायण पक्षी अभयारण्य", "उत्तर प्रदेश", "2026", "–"],
  ["101", "ग्लाव झील (Glaw Lake)", "अरुणाचल प्रदेश", "2026", "–"]
];

const exactRamsarTableEn = [
  ["1", "Kolleru Lake", "Andhra Pradesh", "2002", "901"],
  ["2", "Deepor Beel", "Assam", "2002", "40"],
  ["3", "Kanwar (Kabar) Taal", "Bihar", "2020", "26.2"],
  ["4", "Nagi Bird Sanctuary", "Bihar", "2023", "2"],
  ["5", "Nakti Bird Sanctuary", "Bihar", "2023", "3.3"],
  ["6", "Nanda Lake", "Goa", "2022", "0.42"],
  ["7", "Khijadia WLS", "Gujarat", "2021", "6"],
  ["8", "Nalsarovar BS", "Gujarat", "2012", "123"],
  ["9", "Thol Lake", "Gujarat", "2021", "6.99"],
  ["10", "Wadhvana Wetland", "Gujarat", "2021", "10.38"],
  ["11", "Bhindawas WLS", "Haryana", "2021", "4.11"],
  ["12", "Sultanpur National Park", "Haryana", "2021", "142.5"],
  ["13", "Chandra Taal", "Himachal Pradesh", "2005", "0.49"],
  ["14", "Pong Dam Lake", "Himachal Pradesh", "2002", "156.62"],
  ["15", "Renuka Lake", "Himachal Pradesh", "2005", "0.2"],
  ["16", "Ranganathittu BS", "Karnataka", "2022", "5.18"],
  ["17", "Magadi Kere Conservation Reserve", "Karnataka", "2024", "0.5"],
  ["18", "Ankasamudra Bird Conservation Reserve", "Karnataka", "2024", "0.98"],
  ["19", "Aghanashini Estuary", "Karnataka", "2024", "4.8"],
  ["20", "Ashtamudi Wetland", "Kerala", "2002", "614"],
  ["21", "Sasthamkotta Lake", "Kerala", "2002", "3.73"],
  ["22", "Vembanad-Kol Wetland", "Kerala", "1905", "1,512.5"],
  ["23", "Bhoj Wetland", "Madhya Pradesh", "2002", "32"],
  ["24", "Sakhya Sagar", "Madhya Pradesh", "2022", "2.48"],
  ["25", "Sirpur Wetland", "Madhya Pradesh", "2022", "1.61"],
  ["26", "Yashwant Sagar", "Madhya Pradesh", "2022", "8.22"],
  ["27", "Tawa Reservoir", "Madhya Pradesh", "2024", "200"],
  ["28", "Lonar Lake", "Maharashtra", "2020", "4.27"],
  ["29", "Nandur Madhameshwar", "Maharashtra", "2019", "14"],
  ["30", "Thane Creek", "Maharashtra", "2022", "65.21"],
  ["31", "Loktak Lake", "Manipur", "1990", "266"],
  ["32", "Pala Wetland", "Mizoram", "2021", "18.5"],
  ["33", "Ansupa Lake", "Odisha", "2021", "2.31"],
  ["34", "Bhitarkanika Mangroves", "Odisha", "2002", "650"],
  ["35", "Chilika Lake", "Odisha", "1981", "1,165"],
  ["36", "Hirakud Reservoir", "Odisha", "2021", "654"],
  ["37", "Satkosia Gorge", "Odisha", "2021", "981.97"],
  ["38", "Tampara Lake", "Odisha", "2021", "3"],
  ["39", "Beas CNR", "Punjab", "2019", "64"],
  ["40", "Harike Wetland", "Punjab", "1990", "41"],
  ["41", "Kanjli Wetland", "Punjab", "2002", "1.83"],
  ["42", "Keshopur-Miani CMR", "Punjab", "2019", "34"],
  ["43", "Nangal WLS", "Punjab", "2019", "1"],
  ["44", "Ropar Wetland", "Punjab", "2002", "13.65"],
  ["45", "Keoladeo National Park", "Rajasthan", "1981", "28.73"],
  ["46", "Sambhar Lake", "Rajasthan", "1990", "240"],
  ["47", "Chitrangudi BS", "Tamil Nadu", "2021", "2.6"],
  ["48", "Gulf of Mannar Marine BR", "Tamil Nadu", "2022", "526.72"],
  ["49", "Kanjirankulam BS", "Tamil Nadu", "2022", "0.96"],
  ["50", "Karikili BS", "Tamil Nadu", "2022", "0.584"],
  ["51", "Koonthankulam BS", "Tamil Nadu", "2021", "0.72"],
  ["52", "Pallikaranai Marsh Reserve Forest", "Tamil Nadu", "2022", "12.475"],
  ["53", "Pichavaram Mangrove", "Tamil Nadu", "2022", "14.786"],
  ["54", "Point Calimere WLS & BS", "Tamil Nadu", "2002", "389"],
  ["55", "Suchindram Theroor Wetland Complex", "Tamil Nadu", "2022", "0.94"],
  ["56", "Udayamarthandapuram BS", "Tamil Nadu", "2022", "0.44"],
  ["57", "Vaduvoor BS", "Tamil Nadu", "2022", "1.12"],
  ["58", "Vedanthangal BS", "Tamil Nadu", "2022", "0.4"],
  ["59", "Vellode BS", "Tamil Nadu", "2022", "0.77"],
  ["60", "Vembannur Wetland Complex", "Tamil Nadu", "2022", "0.2"],
  ["61", "Karaivetti Bird Sanctuary", "Tamil Nadu", "2024", "4.5"],
  ["62", "Longwood Shola Reserve Forest", "Tamil Nadu", "2024", "1.16"],
  ["63", "Nanjarayan Bird Sanctuary", "Tamil Nadu", "2024", "1.3"],
  ["64", "Kazhuveli Bird Sanctuary", "Tamil Nadu", "2024", "1,513"],
  ["65", "Rudrasagar Lake", "Tripura", "2005", "2.4"],
  ["66", "Hokera Wetland", "UT of J&K", "2005", "13.75"],
  ["67", "Hygam Wetland CNR", "UT of J&K", "2022", "8.02"],
  ["68", "Shallbugh Wetland CNR", "UT of J&K", "2022", "16.75"],
  ["69", "Surinsar-Mansar Lakes", "UT of J&K", "2005", "3.5"],
  ["70", "Wular Lake", "UT of J&K", "1990", "189"],
  ["71", "Tso Kar", "UT of Ladakh", "2020", "95.77"],
  ["72", "Tsomoriri", "UT of Ladakh", "2002", "120"],
  ["73", "Bakhira WLS", "Uttar Pradesh", "2021", "28.94"],
  ["74", "Haiderpur Wetland", "Uttar Pradesh", "2021", "69"],
  ["75", "Nawabganj BS", "Uttar Pradesh", "2019", "2"],
  ["76", "Parvati Arga BS", "Uttar Pradesh", "2019", "7"],
  ["77", "Saman BS", "Uttar Pradesh", "2019", "5"],
  ["78", "Samaspur BS", "Uttar Pradesh", "2019", "8"],
  ["79", "Sandi BS", "Uttar Pradesh", "2019", "3"],
  ["80", "Sarsai Nawar Jheel", "Uttar Pradesh", "2019", "2"],
  ["81", "Sur Sarovar (Keetham Lake)", "Uttar Pradesh", "2020", "4.31"],
  ["82", "Upper Ganga River", "Uttar Pradesh", "2005", "265.9"],
  ["83", "Asan Barrage", "Uttarakhand", "2020", "4.44"],
  ["84", "East Kolkata Wetlands", "West Bengal", "2002", "125"],
  ["85", "Sundarban Wetland", "West Bengal", "2019", "4,230"],
  ["86", "Sakkarakottai Bird Sanctuary", "Tamil Nadu", "2025", "–"],
  ["87", "Therthangal Bird Sanctuary", "Tamil Nadu", "2025", "–"],
  ["88", "Khecheopalri Wetland", "Sikkim", "2025", "–"],
  ["89", "Udhwa Lake", "Jharkhand", "2025", "–"],
  ["90", "Khichan (Phalodi)", "Rajasthan", "2025", "–"],
  ["91", "Menar (Udaipur)", "Rajasthan", "2025", "–"],
  ["92", "Gokul Jalashay", "Bihar", "2025", "–"],
  ["93", "Udaipur Jheel", "Bihar", "2025", "–"],
  ["94", "Gogabeel Lake", "Bihar", "2025", "–"],
  ["95", "Siliserh Lake", "Rajasthan", "2025", "–"],
  ["96", "Kopra Jalashay", "Chhattisgarh", "2025", "–"],
  ["97", "Patna Bird Sanctuary", "Uttar Pradesh", "2026", "–"],
  ["98", "Chhari-Dhand", "Kutch (Gujarat)", "2026", "–"],
  ["99", "Shekha Jheel Bird Sanctuary", "Uttar Pradesh", "2026", "–"],
  ["100", "Jai Prakash Narayan Bird Sanctuary", "Uttar Pradesh", "2026", "–"],
  ["101", "Glaw Lake", "Arunachal Pradesh", "2026", "–"]
];

async function main() {
  console.log("🔄 Updating Ramsar state-wise table to exact sequence (1 to 101)...");

  const docIds = [
    "ca-ramsar-sites-in-india-2026",
    "ca-ramsar-sites-in-india-2026-seo",
    "ca-ramsar-sites-in-india-short",
    "ca-ramsar-sites-in-india"
  ];

  for (const docId of docIds) {
    const doc = await client.fetch(`*[_id == $docId][0]`, { docId });
    if (!doc) continue;

    // Update body table block
    const updatedBody = doc.body.map((block: any) => {
      if (block._type === "table" && block.caption?.includes("101")) {
        return {
          ...block,
          caption: "भारत में रामसर स्थलों की राज्यवार सूची 2026 (1 से 101 तक संपूर्ण क्रम)",
          headers: ["क्रमांक", "रामसर साइट", "राज्य/केंद्र शासित प्रदेश", "नामित वर्ष", "क्षेत्रफल (किमी²)"],
          rows: exactRamsarTableHi,
        };
      }
      return block;
    });

    const updatedBodyEn = (doc.bodyEn || []).map((block: any) => {
      if (block._type === "table" && block.caption?.includes("101")) {
        return {
          ...block,
          caption: "State-wise List of Ramsar Sites in India 2026 (Complete 1 to 101 Sequence)",
          headers: ["S.No", "Ramsar Site", "State/UT", "Designated Year", "Area (km²)"],
          rows: exactRamsarTableEn,
        };
      }
      return block;
    });

    await client.patch(docId).set({ body: updatedBody, bodyEn: updatedBodyEn }).commit();
    console.log(`✅ Updated exact 1-101 sequence for document: ${docId}`);
  }

  console.log("✨ Successfully updated exact sequence for all Ramsar documents in Sanity CMS!");
}

main().catch((err) => {
  console.error("❌ Error updating sequence:", err);
  process.exit(1);
});
