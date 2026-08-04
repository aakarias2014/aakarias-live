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

// All 101 sites data
const allRamsarSitesData = [
  { nameHi: "कोल्लेरू झील", nameEn: "Kolleru Lake", stateHi: "आंध्र प्रदेश", stateEn: "Andhra Pradesh", year: "2002", area: "901" },
  { nameHi: "दीपोर बील", nameEn: "Deepor Beel", stateHi: "असम", stateEn: "Assam", year: "2002", area: "40" },
  { nameHi: "कंवर (कबर) ताल", nameEn: "Kanwar (Kabar) Taal", stateHi: "बिहार", stateEn: "Bihar", year: "2020", area: "26.2" },
  { nameHi: "नागी पक्षी अभयारण्य", nameEn: "Nagi Bird Sanctuary", stateHi: "बिहार", stateEn: "Bihar", year: "2023", area: "2" },
  { nameHi: "नक्ती पक्षी अभयारण्य", nameEn: "Nakti Bird Sanctuary", stateHi: "बिहार", stateEn: "Bihar", year: "2023", area: "3.3" },
  { nameHi: "नंदा झील", nameEn: "Nanda Lake", stateHi: "गोवा", stateEn: "Goa", year: "2022", area: "0.42" },
  { nameHi: "खिजाडिया डब्ल्यूएलएस", nameEn: "Khijadia WLS", stateHi: "गुजरात", stateEn: "Gujarat", year: "2021", area: "6" },
  { nameHi: "नलसरोवर बीएस", nameEn: "Nalsarovar BS", stateHi: "गुजरात", stateEn: "Gujarat", year: "2012", area: "123" },
  { nameHi: "थोल झील", nameEn: "Thol Lake", stateHi: "गुजरात", stateEn: "Gujarat", year: "2021", area: "6.99" },
  { nameHi: "वधवाना आर्द्रभूमि", nameEn: "Wadhvana Wetland", stateHi: "गुजरात", stateEn: "Gujarat", year: "2021", area: "10.38" },
  { nameHi: "भिंडावास डब्ल्यूएलएस", nameEn: "Bhindawas WLS", stateHi: "हरियाणा", stateEn: "Haryana", year: "2021", area: "4.11" },
  { nameHi: "सुल्तानपुर राष्ट्रीय उद्यान", nameEn: "Sultanpur National Park", stateHi: "हरियाणा", stateEn: "Haryana", year: "2021", area: "142.5" },
  { nameHi: "चंद्र ताल", nameEn: "Chandra Taal", stateHi: "हिमाचल प्रदेश", stateEn: "Himachal Pradesh", year: "2005", area: "0.49" },
  { nameHi: "पोंग बांध झील", nameEn: "Pong Dam Lake", stateHi: "हिमाचल प्रदेश", stateEn: "Himachal Pradesh", year: "2002", area: "156.62" },
  { nameHi: "रेणुका झील", nameEn: "Renuka Lake", stateHi: "हिमाचल प्रदेश", stateEn: "Himachal Pradesh", year: "2005", area: "0.2" },
  { nameHi: "रंगनाथितु बीएस", nameEn: "Ranganathittu BS", stateHi: "कर्नाटक", stateEn: "Karnataka", year: "2022", area: "5.18" },
  { nameHi: "मगाडी केरे संरक्षण अभ्यारण्य", nameEn: "Magadi Kere Conservation Reserve", stateHi: "कर्नाटक", stateEn: "Karnataka", year: "2024", area: "0.5" },
  { nameHi: "अंकसमुद्र पक्षी संरक्षण रिजर्व", nameEn: "Ankasamudra Bird Conservation Reserve", stateHi: "कर्नाटक", stateEn: "Karnataka", year: "2024", area: "0.98" },
  { nameHi: "अघनाशिनी मुहाना", nameEn: "Aghanashini Estuary", stateHi: "कर्नाटक", stateEn: "Karnataka", year: "2024", area: "4.8" },
  { nameHi: "अष्टामुडी आर्द्रभूमि", nameEn: "Ashtamudi Wetland", stateHi: "केरल", stateEn: "Kerala", year: "2002", area: "614" },
  { nameHi: "सस्थमकोट्टा झील", nameEn: "Sasthamkotta Lake", stateHi: "केरल", stateEn: "Kerala", year: "2002", area: "3.73" },
  { nameHi: "वेम्बनाड-कोल आर्द्रभूमि", nameEn: "Vembanad-Kol Wetland", stateHi: "केरल", stateEn: "Kerala", year: "2002", area: "1,512.5" },
  { nameHi: "भोज आर्द्रभूमि", nameEn: "Bhoj Wetland", stateHi: "मध्य प्रदेश", stateEn: "Madhya Pradesh", year: "2002", area: "32" },
  { nameHi: "साख्य सागर", nameEn: "Sakhya Sagar", stateHi: "मध्य प्रदेश", stateEn: "Madhya Pradesh", year: "2022", area: "2.48" },
  { nameHi: "सिरपुर आर्द्रभूमि", nameEn: "Sirpur Wetland", stateHi: "मध्य प्रदेश", stateEn: "Madhya Pradesh", year: "2022", area: "1.61" },
  { nameHi: "यशवंत सागर", nameEn: "Yashwant Sagar", stateHi: "मध्य प्रदेश", stateEn: "Madhya Pradesh", year: "2022", area: "8.22" },
  { nameHi: "तावा जलाशय", nameEn: "Tawa Reservoir", stateHi: "मध्य प्रदेश", stateEn: "Madhya Pradesh", year: "2024", area: "200" },
  { nameHi: "लोनार झील", nameEn: "Lonar Lake", stateHi: "महाराष्ट्र", stateEn: "Maharashtra", year: "2020", area: "4.27" },
  { nameHi: "नंदुर मधमेश्वर", nameEn: "Nandur Madhameshwar", stateHi: "महाराष्ट्र", stateEn: "Maharashtra", year: "2019", area: "14" },
  { nameHi: "थाने क्रीक", nameEn: "Thane Creek", stateHi: "महाराष्ट्र", stateEn: "Maharashtra", year: "2022", area: "65.21" },
  { nameHi: "लोकटक झील", nameEn: "Loktak Lake", stateHi: "मणिपुर", stateEn: "Manipur", year: "1990", area: "266" },
  { nameHi: "पाला आर्द्रभूमि", nameEn: "Pala Wetland", stateHi: "मिजोरम", stateEn: "Mizoram", year: "2021", area: "18.5" },
  { nameHi: "अनसुपा झील", nameEn: "Ansupa Lake", stateHi: "ओडिशा", stateEn: "Odisha", year: "2021", area: "2.31" },
  { nameHi: "भितरकनिका मैंग्रोव", nameEn: "Bhitarkanika Mangroves", stateHi: "ओडिशा", stateEn: "Odisha", year: "2002", area: "650" },
  { nameHi: "चिल्का झील", nameEn: "Chilika Lake", stateHi: "ओडिशा", stateEn: "Odisha", year: "1981", area: "1,165" },
  { nameHi: "हीराकुड जलाशय", nameEn: "Hirakud Reservoir", stateHi: "ओडिशा", stateEn: "Odisha", year: "2021", area: "654" },
  { nameHi: "सतकोसिया घाटी", nameEn: "Satkosia Gorge", stateHi: "ओडिशा", stateEn: "Odisha", year: "2021", area: "981.97" },
  { nameHi: "ताम्पारा झील", nameEn: "Tampara Lake", stateHi: "ओडिशा", stateEn: "Odisha", year: "2021", area: "3" },
  { nameHi: "बीस सीएनआर", nameEn: "Beas CNR", stateHi: "पंजाब", stateEn: "Punjab", year: "2019", area: "64" },
  { nameHi: "हरिके आर्द्रभूमि", nameEn: "Harike Wetland", stateHi: "पंजाब", stateEn: "Punjab", year: "1990", area: "41" },
  { nameHi: "कंजली आर्द्रभूमि", nameEn: "Kanjli Wetland", stateHi: "पंजाब", stateEn: "Punjab", year: "2002", area: "1.83" },
  { nameHi: "केशोपुर-मियानी सीएमआर", nameEn: "Keshopur-Miani CMR", stateHi: "पंजाब", stateEn: "Punjab", year: "2019", area: "34" },
  { nameHi: "नांगल डब्ल्यूएलएस", nameEn: "Nangal WLS", stateHi: "पंजाब", stateEn: "Punjab", year: "2019", area: "1" },
  { nameHi: "रोपड़ आर्द्रभूमि", nameEn: "Ropar Wetland", stateHi: "पंजाब", stateEn: "Punjab", year: "2002", area: "13.65" },
  { nameHi: "केओलादेव राष्ट्रीय उद्यान", nameEn: "Keoladeo National Park", stateHi: "राजस्थान", stateEn: "Rajasthan", year: "1981", area: "28.73" },
  { nameHi: "सांभर झील", nameEn: "Sambhar Lake", stateHi: "राजस्थान", stateEn: "Rajasthan", year: "1990", area: "240" },
  { nameHi: "चित्रांगुडी बीएस", nameEn: "Chitrangudi BS", stateHi: "तमिलनाडु", stateEn: "Tamil Nadu", year: "2021", area: "2.6" },
  { nameHi: "मन्नार की खाड़ी समुद्री बीआर", nameEn: "Gulf of Mannar Marine BR", stateHi: "तमिलनाडु", stateEn: "Tamil Nadu", year: "2022", area: "526.72" },
  { nameHi: "कंजीरंकुलम बीएस", nameEn: "Kanjirankulam BS", stateHi: "तमिलनाडु", stateEn: "Tamil Nadu", year: "2022", area: "0.96" },
  { nameHi: "करिकिली बीएस", nameEn: "Karikili BS", stateHi: "तमिलनाडु", stateEn: "Tamil Nadu", year: "2022", area: "0.584" },
  { nameHi: "कूनथंकुलम बीएस", nameEn: "Koonthankulam BS", stateHi: "तमिलनाडु", stateEn: "Tamil Nadu", year: "2021", area: "0.72" },
  { nameHi: "पल्लीकरनई मार्श रिजर्व वन", nameEn: "Pallikaranai Marsh Reserve Forest", stateHi: "तमिलनाडु", stateEn: "Tamil Nadu", year: "2022", area: "12.475" },
  { nameHi: "पिचावरम मैंग्रोव", nameEn: "Pichavaram Mangrove", stateHi: "तमिलनाडु", stateEn: "Tamil Nadu", year: "2022", area: "14.786" },
  { nameHi: "पॉइंट कैलिमेरे डब्ल्यूएलएस और बीएस", nameEn: "Point Calimere WLS & BS", stateHi: "तमिलनाडु", stateEn: "Tamil Nadu", year: "2002", area: "389" },
  { nameHi: "सुचिंद्रम थेरूर आर्द्रभूमि परिसर", nameEn: "Suchindram Theroor Wetland Complex", stateHi: "तमिलनाडु", stateEn: "Tamil Nadu", year: "2022", area: "0.94" },
  { nameHi: "उदयमार्थंदपुरम बीएस", nameEn: "Udayamarthandapuram BS", stateHi: "तमिलनाडु", stateEn: "Tamil Nadu", year: "2022", area: "0.44" },
  { nameHi: "वडुवुर बीएस", nameEn: "Vaduvoor BS", stateHi: "तमिलनाडु", stateEn: "Tamil Nadu", year: "2022", area: "1.12" },
  { nameHi: "वेदान्थंगल बीएस", nameEn: "Vedanthangal BS", stateHi: "तमिलनाडु", stateEn: "Tamil Nadu", year: "2022", area: "0.4" },
  { nameHi: "वेलोड बीएस", nameEn: "Vellode BS", stateHi: "तमिलनाडु", stateEn: "Tamil Nadu", year: "2022", area: "0.77" },
  { nameHi: "वेम्बन्नूर आर्द्रभूमि परिसर", nameEn: "Vembannur Wetland Complex", stateHi: "तमिलनाडु", stateEn: "Tamil Nadu", year: "2022", area: "0.2" },
  { nameHi: "कारावेट्टी पक्षी अभयारण्य", nameEn: "Karaivetti Bird Sanctuary", stateHi: "तमिलनाडु", stateEn: "Tamil Nadu", year: "2024", area: "4.5" },
  { nameHi: "लॉन्गवुड शोला आरक्षित वन", nameEn: "Longwood Shola Reserve Forest", stateHi: "तमिलनाडु", stateEn: "Tamil Nadu", year: "2024", area: "1.16" },
  { nameHi: "नंजरायन पक्षी अभयारण्य", nameEn: "Nanjarayan Bird Sanctuary", stateHi: "तमिलनाडु", stateEn: "Tamil Nadu", year: "2024", area: "1.3" },
  { nameHi: "काझुवेली पक्षी अभयारण्य", nameEn: "Kazhuveli Bird Sanctuary", stateHi: "तमिलनाडु", stateEn: "Tamil Nadu", year: "2024", area: "1,513" },
  { nameHi: "रुद्रसागर झील", nameEn: "Rudrasagar Lake", stateHi: "त्रिपुरा", stateEn: "Tripura", year: "2005", area: "2.4" },
  { nameHi: "होकेरा आर्द्रभूमि", nameEn: "Hokera Wetland", stateHi: "जम्मू और कश्मीर", stateEn: "UT of J&K", year: "2005", area: "13.75" },
  { nameHi: "हाइगम आर्द्रभूमि सीएनआर", nameEn: "Hygam Wetland CNR", stateHi: "जम्मू और कश्मीर", stateEn: "UT of J&K", year: "2022", area: "8.02" },
  { nameHi: "शैलबुघ वेटलैंड सीएनआर", nameEn: "Shallbugh Wetland CNR", stateHi: "जम्मू और कश्मीर", stateEn: "UT of J&K", year: "2022", area: "16.75" },
  { nameHi: "सुरिंसर-मानसर झीलें", nameEn: "Surinsar-Mansar Lakes", stateHi: "जम्मू और कश्मीर", stateEn: "UT of J&K", year: "2005", area: "3.5" },
  { nameHi: "वुलर झील", nameEn: "Wular Lake", stateHi: "जम्मू और कश्मीर", stateEn: "UT of J&K", year: "1990", area: "189" },
  { nameHi: "त्सो कार", nameEn: "Tso Kar", stateHi: "लद्दाख", stateEn: "UT of Ladakh", year: "2020", area: "95.77" },
  { nameHi: "त्सोमोरिरि", nameEn: "Tsomoriri", stateHi: "लद्दाख", stateEn: "UT of Ladakh", year: "2002", area: "120" },
  { nameHi: "बखीरा डब्ल्यूएलएस", nameEn: "Bakhira WLS", stateHi: "उत्तर प्रदेश", stateEn: "Uttar Pradesh", year: "2021", area: "28.94" },
  { nameHi: "हैदरपुर आर्द्रभूमि", nameEn: "Haiderpur Wetland", stateHi: "उत्तर प्रदेश", stateEn: "Uttar Pradesh", year: "2021", area: "69" },
  { nameHi: "नवाबगंज बीएस", nameEn: "Nawabganj BS", stateHi: "उत्तर प्रदेश", stateEn: "Uttar Pradesh", year: "2019", area: "2" },
  { nameHi: "पार्वती अर्गा बीएस", nameEn: "Parvati Arga BS", stateHi: "उत्तर प्रदेश", stateEn: "Uttar Pradesh", year: "2019", area: "7" },
  { nameHi: "समन बीएस", nameEn: "Saman BS", stateHi: "उत्तर प्रदेश", stateEn: "Uttar Pradesh", year: "2019", area: "5" },
  { nameHi: "समसपुर बीएस", nameEn: "Samaspur BS", stateHi: "उत्तर प्रदेश", stateEn: "Uttar Pradesh", year: "2019", area: "8" },
  { nameHi: "सैंडी बीएस", nameEn: "Sandi BS", stateHi: "उत्तर प्रदेश", stateEn: "Uttar Pradesh", year: "2019", area: "3" },
  { nameHi: "सरसाई नवार झील", nameEn: "Sarsai Nawar Jheel", stateHi: "उत्तर प्रदेश", stateEn: "Uttar Pradesh", year: "2019", area: "2" },
  { nameHi: "सुर सरोवर (कीथम झील)", nameEn: "Sur Sarovar (Keetham Lake)", stateHi: "उत्तर प्रदेश", stateEn: "Uttar Pradesh", year: "2020", area: "4.31" },
  { nameHi: "ऊपरी गंगा नदी", nameEn: "Upper Ganga River", stateHi: "उत्तर प्रदेश", stateEn: "Uttar Pradesh", year: "2005", area: "265.9" },
  { nameHi: "आसन बैराज", nameEn: "Asan Barrage", stateHi: "उत्तराखंड", stateEn: "Uttarakhand", year: "2020", area: "4.44" },
  { nameHi: "पूर्वी कोलकाता आर्द्रभूमि", nameEn: "East Kolkata Wetlands", stateHi: "पश्चिम बंगाल", stateEn: "West Bengal", year: "2002", area: "125" },
  { nameHi: "सुंदरबन आर्द्रभूमि", nameEn: "Sundarban Wetland", stateHi: "पश्चिम बंगाल", stateEn: "West Bengal", year: "2019", area: "4,230" },
  { nameHi: "सक्कराकोट्टई पक्षी अभयारण्य", nameEn: "Sakkarakottai Bird Sanctuary", stateHi: "तमिलनाडु", stateEn: "Tamil Nadu", year: "2025", area: "–" },
  { nameHi: "थेरथांगल पक्षी अभयारण्य", nameEn: "Therthangal Bird Sanctuary", stateHi: "तमिलनाडु", stateEn: "Tamil Nadu", year: "2025", area: "–" },
  { nameHi: "खेचेओपालरी आर्द्रभूमि", nameEn: "Khecheopalri Wetland", stateHi: "सिक्किम", stateEn: "Sikkim", year: "2025", area: "–" },
  { nameHi: "उधवा झील", nameEn: "Udhwa Lake", stateHi: "झारखंड", stateEn: "Jharkhand", year: "2025", area: "–" },
  { nameHi: "खिचन (फलोदी)", nameEn: "Khichan (Phalodi)", stateHi: "राजस्थान", stateEn: "Rajasthan", year: "2025", area: "–" },
  { nameHi: "मेनार (उदयपुर)", nameEn: "Menar (Udaipur)", stateHi: "राजस्थान", stateEn: "Rajasthan", year: "2025", area: "–" },
  { nameHi: "गोकुल जलाशय", nameEn: "Gokul Jalashay", stateHi: "बिहार", stateEn: "Bihar", year: "2025", area: "–" },
  { nameHi: "उदयपुर झील", nameEn: "Udaipur Jheel", stateHi: "बिहार", stateEn: "Bihar", year: "2025", area: "–" },
  { nameHi: "गोगबील झील", nameEn: "Gogabeel Lake", stateHi: "बिहार", stateEn: "Bihar", year: "2025", area: "–" },
  { nameHi: "सिलिसरह झील", nameEn: "Siliserh Lake", stateHi: "राजस्थान", stateEn: "Rajasthan", year: "2025", area: "–" },
  { nameHi: "कोपरा जलाशय", nameEn: "Kopra Jalashay", stateHi: "छत्तीसगढ़", stateEn: "Chhattisgarh", year: "2025", area: "–" },
  { nameHi: "पटना पक्षी अभयारण्य", nameEn: "Patna Bird Sanctuary", stateHi: "उत्तर प्रदेश", stateEn: "Uttar Pradesh", year: "2026", area: "–" },
  { nameHi: "छारी-धंड", nameEn: "Chhari-Dhand", stateHi: "कच्छ (गुजरात)", stateEn: "Gujarat (Kutch)", year: "2026", area: "–" },
  { nameHi: "शेखा झील पक्षी अभयारण्य", nameEn: "Shekha Jheel Bird Sanctuary", stateHi: "उत्तर प्रदेश", stateEn: "Uttar Pradesh", year: "2026", area: "–" },
  { nameHi: "जय प्रकाश नारायण पक्षी अभयारण्य", nameEn: "Jai Prakash Narayan Bird Sanctuary", stateHi: "उत्तर प्रदेश", stateEn: "Uttar Pradesh", year: "2026", area: "–" },
  { nameHi: "ग्लाव झील (Glaw Lake)", nameEn: "Glaw Lake", stateHi: "अरुणाचल प्रदेश", stateEn: "Arunachal Pradesh", year: "2026", area: "–" },
];

// Sort chronologically by year (ascending)
const sortedRamsarSites = [...allRamsarSitesData].sort((a, b) => Number(a.year) - Number(b.year));

// Form Hindi & English table rows (1 to 101)
const yearwiseTableHi = sortedRamsarSites.map((item, idx) => [
  String(idx + 1),
  item.nameHi,
  item.stateHi,
  item.year,
  item.area,
]);

const yearwiseTableEn = sortedRamsarSites.map((item, idx) => [
  String(idx + 1),
  item.nameEn,
  item.stateEn,
  item.year,
  item.area,
]);

async function main() {
  console.log("📅 Sorting 101 Ramsar sites chronologically by Designated Year (1981 to 2026)...");

  const docIds = [
    "ca-ramsar-sites-in-india-2026",
    "ca-ramsar-sites-in-india-2026-seo",
    "ca-ramsar-sites-in-india-short",
    "ca-ramsar-sites-in-india"
  ];

  for (const docId of docIds) {
    const doc = await client.fetch(`*[_id == $docId][0]`, { docId });
    if (!doc) continue;

    // Update body table block to Year-wise order
    const updatedBody = doc.body.map((block: any) => {
      if (block._type === "table" && block.caption?.includes("101")) {
        return {
          ...block,
          caption: "भारत में रामसर स्थलों की वर्षवार सूची 1981-2026 (Year-wise Ramsar Sites in India)",
          headers: ["क्रमांक", "रामसर साइट", "राज्य/केंद्र शासित प्रदेश", "नामित वर्ष", "क्षेत्रफल (किमी²)"],
          rows: yearwiseTableHi,
        };
      }
      return block;
    });

    const updatedBodyEn = (doc.bodyEn || []).map((block: any) => {
      if (block._type === "table" && block.caption?.includes("101")) {
        return {
          ...block,
          caption: "Year-wise List of Ramsar Sites in India 1981-2026 (Chronological Order)",
          headers: ["S.No", "Ramsar Site", "State/UT", "Designated Year", "Area (km²)"],
          rows: yearwiseTableEn,
        };
      }
      return block;
    });

    await client.patch(docId).set({ body: updatedBody, bodyEn: updatedBodyEn }).commit();
    console.log(`✅ Updated year-wise list for document: ${docId}`);
  }

  console.log("✨ Successfully updated Year-wise Ramsar sites list in Sanity CMS!");
}

main().catch((err) => {
  console.error("❌ Error updating year-wise list:", err);
  process.exit(1);
});
