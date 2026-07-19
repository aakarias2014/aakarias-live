import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

// Load env.local explicitly
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

const faculties = [
  // Hindi Medium Mentors
  {
    nameHi: "अश्विनी कुमार मुदगिल",
    nameEn: "Ashwini Kumar Mudgil",
    titleHi: "Senior Faculty (Polity & Philosophy)",
    titleEn: "Senior Faculty (Polity & Philosophy)",
    descHi: "UPSC और राज्य PSC के लिए 16+ वर्षों का अध्यापन। सहायक भू-अभिलेख अधीक्षक (MPPSC), इंटेलिजेंस ब्यूरो (IB), और संसद में प्रोटोकॉल अधिकारी के रूप में चयनित।",
    descEn: "16+ years teaching UPSC & State PSC. Selected as Asst. Superintendent of Land Records (MPPSC), Intelligence Bureau (IB), and Protocol Officer in Parliament.",
    imagePath: "public/images/faculty/ashwini-kumar.png",
    medium: "hindi",
    orderIndex: 1,
  },
  {
    nameHi: "अथर्व तिवारी",
    nameEn: "Atharv Tiwari",
    titleHi: "Senior Faculty (History & Culture)",
    titleEn: "Senior Faculty (History & Culture)",
    descHi: "UPSC और MPPSC के लिए 16+ वर्षों का अध्यापन। इतिहास में एम.ए., नेट और सेट क्वालिफाइड, पीएच.डी. शोधार्थी। सहायक प्राध्यापक (MPPSC) और सब-इंस्पेक्टर (SSC) के रूप में चयनित।",
    descEn: "16+ years teaching UPSC & MPPSC. M.A. History, UGC-NET & MP-SET qualified, enrolled in Ph.D. Selected as Asst. Professor - History (MPPSC) & Sub-Inspector (SSC).",
    imagePath: "public/images/faculty/atharv-tiwari.png",
    medium: "hindi",
    orderIndex: 2,
  },
  {
    nameHi: "गौरव तिवारी",
    nameEn: "Gaurav Tiwari",
    titleHi: "Senior Faculty (Geography & Science)",
    titleEn: "Senior Faculty (Geography & Science)",
    descHi: "UPSC और राज्य PSC के लिए 12+ वर्षों का अध्यापन। भूगोल में यूजीसी-नेट क्वालिफाइड। जूनियर इंजीनियर और भारतीय रेलवे लोको पायलट के रूप में चयनित।",
    descEn: "12+ years of teaching UPSC & State PSC. UGC-NET Qualified in Geography. Selected as Junior Engineer and Indian Railways Loco Pilot.",
    imagePath: "public/images/faculty/gaurav-tiwari.png",
    medium: "hindi",
    orderIndex: 3,
  },
  {
    nameHi: "नितिन गुप्ता",
    nameEn: "Nitin Gupta",
    titleHi: "Faculty (Hindi & Essay)",
    titleEn: "Faculty (Hindi & Essay)",
    descHi: "UPSC और राज्य PSC के लिए 11+ वर्षों का अध्यापन। बीसीए (यूनिवर्सिटी टॉपर) और एमएसडब्ल्यू (कॉलेज टॉपर)। हिंदी भवन भोपाल में वाटरशेड प्रबंधन परियोजना प्रमुख के रूप में चयनित।",
    descEn: "11+ years teaching UPSC & State PSC. BCA & MA Social Work topper. Selected as Project Head, Watershed Management at Hindi Bhawan Bhopal.",
    imagePath: "public/images/faculty/nitin-gupta.png",
    medium: "hindi",
    orderIndex: 4,
  },
  {
    nameHi: "जीवन पाटीदार",
    nameEn: "Jeevan Patidar",
    titleHi: "Faculty (Science & Environment)",
    titleEn: "Faculty (Science & Environment)",
    descHi: "UPSC और राज्य PSC के लिए 10+ वर्षों का अध्यापन अनुभव। राजनीति विज्ञान में स्नातकोत्तर।",
    descEn: "10+ years teaching UPSC & State PSC. Postgraduate in Political Science.",
    imagePath: "public/images/faculty/jeevan-patidar.png",
    medium: "hindi",
    orderIndex: 5,
  },
  {
    nameHi: "राहुल बघेल",
    nameEn: "Rahul Baghel",
    titleHi: "Faculty (MPGK)",
    titleEn: "Faculty (MPGK)",
    descHi: "UPSC और राज्य PSC के लिए 10+ वर्षों का अध्यापन। बायोमेडिकल इंजीनियरिंग (SGSITS) में स्नातक। मध्य प्रदेश सामान्य ज्ञान विशेषज्ञ।",
    descEn: "10+ years teaching UPSC & State PSC. Bachelor's in Biomedical Engineering (SGSITS). Specialist in MP General Knowledge.",
    imagePath: "public/images/faculty/rahul-baghel.png",
    medium: "hindi",
    orderIndex: 6,
  },
  // English Medium Mentors
  {
    nameHi: "विवेक परमार",
    nameEn: "Vivek Parmar",
    titleHi: "Faculty (History & Culture)",
    titleEn: "Faculty (History & Culture)",
    descHi: "UPSC और राज्य PSC के लिए 13+ वर्षों का अध्यापन। राज्य सेवा (MPPSC) साक्षात्कार में शामिल। इतिहास में एम.ए., एसएससी सीजीएल और सीपीओ लिखित परीक्षा उत्तीर्ण।",
    descEn: "13+ years teaching UPSC & State PSC. Appeared in State Services (MPPSC) Interview. MA in History, SSC CGL & CPO Written Qualified.",
    imagePath: "public/images/faculty/vivek-parmar.png",
    medium: "english",
    orderIndex: 7,
  },
  {
    nameHi: "अभिषेक यादव",
    nameEn: "Abhishek Yadav",
    titleHi: "Faculty (Polity)",
    titleEn: "Faculty (Polity)",
    descHi: "UPSC और राज्य PSC के लिए 8+ वर्षों का अध्यापन। राज्य सेवा (MPPSC) साक्षात्कार में शामिल। बी.ई. और राजनीति विज्ञान व इतिहास में एम.ए.।",
    descEn: "8+ years teaching UPSC & State PSC. Appeared in State Services (MPPSC) Interview. B.E. & pursuing M.A. in Political Science and History.",
    imagePath: "public/images/faculty/abhishek-yadav.png",
    medium: "english",
    orderIndex: 8,
  },
  {
    nameHi: "कार्तिक गौतम",
    nameEn: "Kartik Gautam",
    titleHi: "Faculty (Economics & Management)",
    titleEn: "Faculty (Economics & Management)",
    descHi: "UPSC और राज्य PSC के लिए 7+ वर्षों का अध्यापन। राज्य सेवा (MPPSC) साक्षात्कार में शामिल। राजनीति विज्ञान में स्नातकोत्तर, यूपीएससी सीडीएस लिखित परीक्षा उत्तीर्ण।",
    descEn: "7+ years teaching UPSC & State PSC. Appeared in State Services (MPPSC) Interview. Master's in Political Science, Qualified UPSC CDS Written.",
    imagePath: "public/images/faculty/kartik-gautam.png",
    medium: "english",
    orderIndex: 9,
  },
  {
    nameHi: "निहार रंजन",
    nameEn: "Nihar Ranjan",
    titleHi: "Faculty (Science & Tech & Environment)",
    titleEn: "Faculty (Science & Tech & Environment)",
    descHi: "UPSC और MPPSC के लिए 9+ वर्षों का अध्यापन अनुभव। यूपीएससी और ओपीएससी मुख्य परीक्षा में शामिल। एम.एससी. (बायोटेक्नोलॉजी) और एम.ए. (लोक प्रशासन)।",
    descEn: "9+ years teaching UPSC & MPPSC. Appeared in UPSC & OPSC Mains. M.Sc. (Biotechnology) and M.A. (Public Administration).",
    imagePath: "public/images/faculty/nihar-ranjan.png",
    medium: "english",
    orderIndex: 10,
  },
  {
    nameHi: "अमित कुमार जैन",
    nameEn: "Amit Kumar Jain",
    titleHi: "Faculty (MPGS)",
    titleEn: "Faculty (MPGS)",
    descHi: "MPPSC और UPSC के लिए 8+ वर्षों का अध्यापन। यूपीएससी मुख्य परीक्षा और 6 बार एमपीपीएससी मुख्य परीक्षा में शामिल। इतिहास में एम.ए., यूजीसी नेट क्वालिफाइड।",
    descEn: "8+ years teaching MPPSC & UPSC. Appeared in UPSC Mains & 6 MPPSC Mains. MA (History) & B.Sc (Industrial Chemistry), UGC NET Qualified.",
    imagePath: "public/images/faculty/amit-kumar-jain.png",
    medium: "english",
    orderIndex: 11,
  },
  {
    nameHi: "धर्मेंद्र चौधरी",
    nameEn: "Dharmendra Choudhary",
    titleHi: "Faculty (Philosophy, Polity & Ethics)",
    titleEn: "Faculty (Philosophy, Polity & Ethics)",
    descHi: "MPPSC और UPSC के लिए 9+ वर्षों का अध्यापन। यूपीएससी सिविल सेवा साक्षात्कार में शामिल। बी.ई., दर्शनशास्त्र व राजनीति विज्ञान में एम.ए. (यूजीसी नेट)। म.प्र. सरकार में स्वच्छता निरीक्षक के रूप में चयनित।",
    descEn: "9+ years teaching MPPSC & UPSC. Appeared in UPSC CSE Interview. Bachelor of Engineering, MA Philosophy & MA Political Science (UGC NET). Selected as Sanitary Inspector (Govt. of MP).",
    imagePath: "public/images/faculty/dharmendra-choudhary.png",
    medium: "english",
    orderIndex: 12,
  },
  {
    nameHi: "वरुण सक्सेना",
    nameEn: "Varun Saxena",
    titleHi: "Faculty (Sociology, Law & Constitution)",
    titleEn: "Faculty (Sociology, Law & Constitution)",
    descHi: "UPSC और MPPSC के लिए 10 वर्षों का अध्यापन। यूपीएससी साक्षात्कार में शामिल, 5 बार एसएससी सीजीएल लिखित परीक्षा उत्तीर्ण। म.प्र. उच्च न्यायालय में अभ्यास करने वाले वकील। बी.ई., एलएल.बी., एलएल.एम.।",
    descEn: "10 years teaching UPSC & MPPSC. Appeared in UPSC Interview, Qualified SSC CGL Written 5 times. Practicing Lawyer at MP High Court. B.E., LL.B., LL.M.",
    imagePath: "public/images/faculty/varun-saxena.png",
    medium: "english",
    orderIndex: 13,
  },
];

async function seed() {
  console.log("🌱 Starting to seed faculties...");

  for (const faculty of faculties) {
    const fullPath = path.resolve(process.cwd(), faculty.imagePath);

    if (!fs.existsSync(fullPath)) {
      console.warn(`⚠️ Warning: Image file not found at ${fullPath}. Skipping image upload.`);
      continue;
    }

    try {
      console.log(`📸 Uploading image for ${faculty.nameEn}...`);
      const fileStream = fs.createReadStream(fullPath);
      const asset = await client.assets.upload("image", fileStream, {
        filename: path.basename(faculty.imagePath),
      });

      console.log(`📝 Creating Sanity document for ${faculty.nameEn}...`);
      await client.create({
        _type: "faculty",
        nameHi: faculty.nameHi,
        nameEn: faculty.nameEn,
        titleHi: faculty.titleHi,
        titleEn: faculty.titleEn,
        descHi: faculty.descHi,
        descEn: faculty.descEn,
        medium: faculty.medium,
        orderIndex: faculty.orderIndex,
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: asset._id,
          },
        },
      });
      console.log(`✅ Seeded ${faculty.nameEn} successfully.`);
    } catch (err: any) {
      console.error(`❌ Failed to seed ${faculty.nameEn}:`, err.message);
    }
  }

  console.log("🎉 Seeding completed!");
}

seed();
