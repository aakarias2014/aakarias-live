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

if (!projectId || dataset === undefined || !token) {
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
  console.log("🚀 Starting upload process for IPhO 2026 Current Affairs Article...");

  // Image file paths
  const imagePaths = {
    team: path.resolve(process.cwd(), "public/images/blog/ipho-2026-team.jpg"),
    winners: path.resolve(process.cwd(), "public/images/blog/ipho-2026-banner.jpg"),
  };

  // Check if files exist
  if (!fs.existsSync(imagePaths.team) || !fs.existsSync(imagePaths.winners)) {
    console.error("❌ Required images not found in public/images/blog/");
    process.exit(1);
  }

  // 1. Upload Team Image (Hero Image)
  console.log("📸 Uploading team image...");
  const teamAsset = await client.assets.upload("image", fs.createReadStream(imagePaths.team), {
    filename: "ipho_2026_team.jpg",
  });
  console.log(`✔ Uploaded team image. Asset ID: ${teamAsset._id}`);

  // 2. Upload Team Banner Image (Content Image)
  console.log("📸 Uploading team banner image...");
  const winnersAsset = await client.assets.upload("image", fs.createReadStream(imagePaths.winners), {
    filename: "ipho_2026_banner.jpg",
  });
  console.log(`✔ Uploaded team banner image. Asset ID: ${winnersAsset._id}`);

  // 3. Construct the Article
  const article = {
    _id: "ca-ipho-2026-gold-medals",
    _type: "currentAffairs",
    slug: { _type: "slug", current: "ipho-2026-india-gold-medals-physics-olympiad" },
    
    // Title & Excerpt
    title: "56वाँ अंतर्राष्ट्रीय भौतिकी ओलंपियाड (IPhO) 2026: भारत ने जीते सभी 5 स्वर्ण पदक, संयुक्त रूप से विश्व में प्रथम स्थान",
    titleEn: "56th International Physics Olympiad (IPhO) 2026: India Wins 5 Gold Medals, Secures Joint First Rank Globally",
    excerpt: "कोलंबिया के बुकारामांगा में आयोजित 56वें अंतर्राष्ट्रीय भौतिकी ओलंपियाड (IPhO-2026) में भारत के सभी 5 प्रतिभागियों ने स्वर्ण पदक जीतकर इतिहास रचा। भारत चीन, कज़ाकिस्तान, रूस, दक्षिण कोरिया और ताइवान के साथ संयुक्त रूप से प्रथम रहा।",
    excerptEn: "Indian students made history at the 56th International Physics Olympiad (IPhO 2026) in Bucaramanga, Colombia, by winning 5 gold medals and securing joint first rank globally alongside China, Russia, and South Korea.",
    
    // Metadata
    ca_date: "2026-07-12",
    publishedAt: new Date().toISOString(),
    featured: true,
    readingTime: 6,
    keywords: [
      "IPhO 2026",
      "56th International Physics Olympiad",
      "56वाँ अंतर्राष्ट्रीय भौतिकी ओलंपियाड",
      "India IPhO 2026 Gold Medals",
      "HBCSE TIFR",
      "Physics Olympiad 2026 Winners",
      "Bucaramanga Colombia Olympiad",
      "Indian Physics Olympiad Gold Medalists",
      "Science Olympiad India Rank 1",
      "UPSC Current Affairs Science",
      "MPPSC Science and Technology",
      "Daily Current Affairs Aakar IAS",
    ],
    
    // Relations & Mapping
    category: { _type: "reference", _ref: "cat-scitech" }, // Science & Technology
    author: { _type: "reference", _ref: "author-aakar" },
    tags: [
      { _type: "reference", _ref: "tag-upsc" },
      { _type: "reference", _ref: "tag-mppsc" },
      { _type: "reference", _ref: "tag-prelims" },
      { _type: "reference", _ref: "tag-mains" },
    ],
    syllabus: ["GS-3", "Prelims-GS"],
    
    // Images
    featuredImage: {
      _type: "image",
      asset: { _type: "reference", _ref: teamAsset._id },
      alt: "Indian team celebrating with the national flag at the 56th International Physics Olympiad (IPhO 2026) in Bucaramanga, Colombia",
    },

    /* ─── SECTIONS ──────────────────────────────────────────────── */
    sections: [
      /* ── 1. Why in News ──────────────────────────────────────── */
      {
        _key: "sec-why-in-news",
        kind: "whyInNews",
        title: "चर्चा में क्यों?",
        titleEn: "Why in News?",
        body: [
          {
            _key: "b1-1", _type: "block", style: "normal",
            children: [{ _key: "s1-1", _type: "span", text: "हाल ही में कोलंबिया के बुकारामांगा (Bucaramanga) शहर में आयोजित 56वें अंतर्राष्ट्रीय भौतिकी ओलंपियाड (IPhO-2026) में भारत ने ऐतिहासिक सफलता हासिल की है। भारतीय टीम के सभी 5 प्रतिभागियों ने स्वर्ण पदक (Gold Medal) जीतकर इतिहास रच दिया है।" }],
          },
          {
            _key: "b1-2", _type: "block", style: "normal",
            children: [{ _key: "s1-2", _type: "span", text: "इस असाधारण प्रदर्शन के साथ भारत ने चीन, कज़ाकिस्तान, रूस, दक्षिण कोरिया और ताइवान के साथ संयुक्त रूप से विश्व में प्रथम स्थान (Joint First Rank) प्राप्त किया है। यह भारत की विज्ञान शिक्षा और प्रतिभा विकास प्रणाली की एक बड़ी सफलता है।" }],
          },
        ],
        bodyEn: [
          {
            _key: "b1-3", _type: "block", style: "normal",
            children: [{ _key: "s1-3", _type: "span", text: "India achieved a historic milestone at the 56th International Physics Olympiad (IPhO-2026) held in Bucaramanga, Colombia. All 5 participants representing India won gold medals, marking a clean sweep." }],
          },
          {
            _key: "b1-4", _type: "block", style: "normal",
            children: [{ _key: "s1-4", _type: "span", text: "With this outstanding performance, India secured the joint first position globally along with China, Kazakhstan, Russia, South Korea, and Taiwan. This achievement stands as a testament to India's robust science education and talent development framework." }],
          },
        ],
      },

      /* ── 2. Key Highlights ────────────────────────────────── */
      {
        _key: "sec-key-highlights",
        kind: "keyHighlights",
        title: "मुख्य तथ्य एवं भारतीय स्वर्ण पदक विजेता",
        titleEn: "Key Highlights & Indian Gold Medalists",
        body: [
          {
            _key: "b2-1", _type: "block", style: "normal",
            children: [{ _key: "s2-1", _type: "span", text: "• कार्यक्रम: 56वाँ अंतर्राष्ट्रीय भौतिकी ओलंपियाड (IPhO-2026)" }],
          },
          {
            _key: "b2-2", _type: "block", style: "normal",
            children: [{ _key: "s2-2", _type: "span", text: "• आयोजन स्थल: बुकारामांगा (Bucaramanga), कोलंबिया" }],
          },
          {
            _key: "b2-3", _type: "block", style: "normal",
            children: [{ _key: "s2-3", _type: "span", text: "• आयोजन तिथि: 4 जुलाई से 12 जुलाई 2026" }],
          },
          {
            _key: "b2-4", _type: "block", style: "normal",
            children: [{ _key: "s2-4", _type: "span", text: "• भागीदारी: प्रतियोगिता में कुल 87 देशों के 381 प्रतिभाशाली छात्रों ने हिस्सा लिया।" }],
          },
          {
            _key: "b2-5", _type: "block", style: "normal",
            children: [{ _key: "s2-5", _type: "span", text: "• भारत की उपलब्धि: 5 स्वर्ण पदक, संयुक्त रूप से विश्व में प्रथम स्थान।" }],
          },
          {
            _key: "b2-6", _type: "block", style: "normal",
            children: [{ _key: "s2-6", _type: "span", text: "• लगातार रिकॉर्ड: पिछले एक दशक (10 वर्षों) से भारत के प्रत्येक प्रतिभागी ने ओलंपियाड में कोई न कोई पदक अवश्य जीता है।" }],
          },
          {
            _key: "b2-h1", _type: "block", style: "h3",
            children: [{ _key: "sh2-1", _type: "span", text: "स्वर्ण पदक विजेता भारतीय छात्र:" }],
          },
          {
            _key: "b2-7", _type: "block", style: "normal",
            children: [{ _key: "s2-7", _type: "span", text: "• कनिष्क जैन: पुणे, महाराष्ट्र" }],
          },
          {
            _key: "b2-8", _type: "block", style: "normal",
            children: [{ _key: "s2-8", _type: "span", text: "• रिद्धेश अनंत बेंडाले: इंदौर, मध्य प्रदेश" }],
          },
          {
            _key: "b2-9", _type: "block", style: "normal",
            children: [{ _key: "s2-9", _type: "span", text: "• ऋषित गर्ग: द्वारका, नई दिल्ली" }],
          },
          {
            _key: "b2-10", _type: "block", style: "normal",
            children: [{ _key: "s2-10", _type: "span", text: "• श्रेष्ठ सुरैया: मुंबई, महाराष्ट्र" }],
          },
          {
            _key: "b2-11", _type: "block", style: "normal",
            children: [{ _key: "s2-11", _type: "span", text: "• स्वरित जोशी: अहमदाबाद, गुजरात" }],
          },
          {
            _key: "b2-img", _type: "image",
            asset: { _type: "reference", _ref: winnersAsset._id },
            alt: "Indian Team Banner - Uniting Young Minds - International Physics Olympiad 2026",
          },
        ],
        bodyEn: [
          {
            _key: "b2-12", _type: "block", style: "normal",
            children: [{ _key: "s2-12", _type: "span", text: "• Event: 56th International Physics Olympiad (IPhO-2026)" }],
          },
          {
            _key: "b2-13", _type: "block", style: "normal",
            children: [{ _key: "s2-13", _type: "span", text: "• Venue: Bucaramanga, Colombia" }],
          },
          {
            _key: "b2-14", _type: "block", style: "normal",
            children: [{ _key: "s2-14", _type: "span", text: "• Dates: July 4 to July 12, 2026" }],
          },
          {
            _key: "b2-15", _type: "block", style: "normal",
            children: [{ _key: "s2-15", _type: "span", text: "• Participation: 381 students from 87 countries worldwide." }],
          },
          {
            _key: "b2-16", _type: "block", style: "normal",
            children: [{ _key: "s2-16", _type: "span", text: "• India's Performance: 5 Gold Medals, securing joint 1st place in the country ranking." }],
          },
          {
            _key: "b2-17", _type: "block", style: "normal",
            children: [{ _key: "s2-17", _type: "span", text: "• Ongoing Streak: For over a decade, every single Indian representative has returned with a medal." }],
          },
          {
            _key: "b2-h2", _type: "block", style: "h3",
            children: [{ _key: "sh2-2", _type: "span", text: "Gold Medal Winners from India:" }],
          },
          {
            _key: "b2-18", _type: "block", style: "normal",
            children: [{ _key: "s2-18", _type: "span", text: "• Kanishk Jain: Pune, Maharashtra" }],
          },
          {
            _key: "b2-19", _type: "block", style: "normal",
            children: [{ _key: "s2-19", _type: "span", text: "• Riddhesh Anant Bendale: Indore, Madhya Pradesh" }],
          },
          {
            _key: "b2-20", _type: "block", style: "normal",
            children: [{ _key: "s2-20", _type: "span", text: "• Rishit Garg: Dwarka, New Delhi" }],
          },
          {
            _key: "b2-21", _type: "block", style: "normal",
            children: [{ _key: "s2-21", _type: "span", text: "• Shresth Suraiya: Mumbai, Maharashtra" }],
          },
          {
            _key: "b2-22", _type: "block", style: "normal",
            children: [{ _key: "s2-22", _type: "span", text: "• Svarit Joshi: Ahmedabad, Gujarat" }],
          },
          {
            _key: "b2-img-en", _type: "image",
            asset: { _type: "reference", _ref: winnersAsset._id },
            alt: "Indian Team Banner - Uniting Young Minds - International Physics Olympiad 2026 Details",
          },
        ],
      },

      /* ── 3. What is IPhO ──────────────────────────────────── */
      {
        _key: "sec-about-ipho",
        kind: "background",
        title: "IPhO (International Physics Olympiad) क्या है?",
        titleEn: "What is IPhO (International Physics Olympiad)?",
        body: [
          {
            _key: "b3-1", _type: "block", style: "normal",
            children: [{ _key: "s3-1", _type: "span", text: "अंतर्राष्ट्रीय भौतिकी ओलंपियाड (IPhO) विश्व की सबसे प्रतिष्ठित वार्षिक अंतरराष्ट्रीय भौतिकी प्रतियोगिता है। यह माध्यमिक एवं उच्च माध्यमिक स्तर (High School & Higher Secondary) के स्कूल छात्रों के लिए आयोजित की जाती है।" }],
          },
          {
            _key: "b3-2", _type: "block", style: "normal",
            children: [{ _key: "s3-2", _type: "span", text: "• मुख्य उद्देश्य: इसका उद्देश्य युवाओं में वैज्ञानिक प्रतिभाओं की पहचान करना, वैज्ञानिक सोच को बढ़ावा देना, भौतिकी में अनुसंधान और नवाचार को प्रोत्साहित करना और दुनिया भर के छात्रों के बीच वैज्ञानिक सहयोग विकसित करना है।" }],
          },
        ],
        bodyEn: [
          {
            _key: "b3-3", _type: "block", style: "normal",
            children: [{ _key: "s3-3", _type: "span", text: "The International Physics Olympiad (IPhO) is the premier annual physics competition for secondary school students. It consists of rigorous theoretical and experimental exams." }],
          },
          {
            _key: "b3-4", _type: "block", style: "normal",
            children: [{ _key: "s3-4", _type: "span", text: "• Key Objectives: Identifying young scientific talents, promoting creative thinking and research-oriented attitude in physics, encouraging innovation in science education, and fostering international cooperation and friendships among students." }],
          },
        ],
      },

      /* ── 4. HBCSE & Selection Process ──────────────────────── */
      {
        _key: "sec-hbcse-selection",
        kind: "importance",
        title: "नोडल संस्थान: HBCSE (होमी भाभा विज्ञान शिक्षा केंद्र)",
        titleEn: "Nodal Institution: HBCSE (Homi Bhabha Centre for Science Education)",
        body: [
          {
            _key: "b4-1", _type: "block", style: "normal",
            children: [{ _key: "s4-1", _type: "span", text: "भारत में अंतरराष्ट्रीय ओलंपियाड कार्यक्रमों (भौतिकी, रसायन विज्ञान, जीव विज्ञान, गणित, खगोल विज्ञान) की पूरी तैयारी और संचालन का नोडल संस्थान होमी भाभा सेंटर फॉर साइंस एजुकेशन (HBCSE) है।" }],
          },
          {
            _key: "b4-2", _type: "block", style: "normal",
            children: [{ _key: "s4-2", _type: "span", text: "• HBCSE के बारे में: यह टाटा इंस्टीट्यूट ऑफ फंडामेंटल रिसर्च (TIFR) का एक राष्ट्रीय केंद्र है, जो भारत सरकार के परमाणु ऊर्जा विभाग (DAE) के अधीन एक सहायता प्राप्त संस्थान के रूप में कार्य करता है। इसका मुख्यालय मुंबई में स्थित है।" }],
          },
          {
            _key: "b4-3", _type: "block", style: "normal",
            children: [{ _key: "s4-3", _type: "span", text: "• चयन प्रक्रिया: भारतीय टीम का चयन 5 चरणों वाली बहु-स्तरीय प्रक्रिया के माध्यम से होता है—" }],
          },
          {
            _key: "b4-4", _type: "block", style: "normal",
            children: [{ _key: "s4-4", _type: "span", text: "  1. राष्ट्रीय स्तर की प्रारंभिक परीक्षा (NSEP)" }],
          },
          {
            _key: "b4-5", _type: "block", style: "normal",
            children: [{ _key: "s4-5", _type: "span", text: "  2. भारतीय राष्ट्रीय भौतिकी ओलंपियाड (INPhO)" }],
          },
          {
            _key: "b4-6", _type: "block", style: "normal",
            children: [{ _key: "s4-6", _type: "span", text: "  3. ओरिएंटेशन कम ट्रेनिंग कैंप (OCSC) - HBCSE में आयोजित" }],
          },
          {
            _key: "b4-7", _type: "block", style: "normal",
            children: [{ _key: "s4-7", _type: "span", text: "  4. प्रस्थान पूर्व प्रशिक्षण शिविर (PDT) - विशेषज्ञों द्वारा उन्नत प्रशिक्षण" }],
          },
          {
            _key: "b4-8", _type: "block", style: "normal",
            children: [{ _key: "s4-8", _type: "span", text: "  5. अंतिम 5 सदस्यीय राष्ट्रीय टीम का चयन व अंतरराष्ट्रीय स्तर पर प्रतिनिधित्व।" }],
          },
        ],
        bodyEn: [
          {
            _key: "b4-9", _type: "block", style: "normal",
            children: [{ _key: "s4-9", _type: "span", text: "In India, the National Olympiad Program in science and mathematics is coordinated by the Homi Bhabha Centre for Science Education (HBCSE)." }],
          },
          {
            _key: "b4-10", _type: "block", style: "normal",
            children: [{ _key: "s4-10", _type: "span", text: "• About HBCSE: HBCSE is a National Centre of the Tata Institute of Fundamental Research (TIFR), operating under the aegis of the Department of Atomic Energy (DAE), Government of India. It is headquartered in Mumbai." }],
          },
          {
            _key: "b4-11", _type: "block", style: "normal",
            children: [{ _key: "s4-11", _type: "span", text: "• Selection Procedure: The Indian team goes through a rigorous 5-stage selection pipeline:" }],
          },
          {
            _key: "b4-12", _type: "block", style: "normal",
            children: [{ _key: "s4-12", _type: "span", text: "  1. National Standard Examination in Physics (NSEP)" }],
          },
          {
            _key: "b4-13", _type: "block", style: "normal",
            children: [{ _key: "s4-13", _type: "span", text: "  2. Indian National Physics Olympiad (INPhO)" }],
          },
          {
            _key: "b4-14", _type: "block", style: "normal",
            children: [{ _key: "s4-14", _type: "span", text: "  3. Orientation-cum-Selection Camp (OCSC) at HBCSE" }],
          },
          {
            _key: "b4-15", _type: "block", style: "normal",
            children: [{ _key: "s4-15", _type: "span", text: "  4. Pre-departure Training Camp (PDT) - advanced training by experts" }],
          },
          {
            _key: "b4-16", _type: "block", style: "normal",
            children: [{ _key: "s4-16", _type: "span", text: "  5. Final 5-member National Team representation in IPhO." }],
          },
        ],
      },

      /* ── 5. Facts At A Glance ─────────────────────────────── */
      {
        _key: "sec-facts-glance",
        kind: "factsAtAGlance",
        title: "याद रखने योग्य तथ्य (Exam Booster)",
        titleEn: "Facts at a Glance (Exam Booster)",
        body: [
          {
            _key: "b5-1", _type: "block", style: "normal",
            children: [{ _key: "s5-1", _type: "span", text: "• आयोजन स्थल → बुकारामांगा, कोलंबिया" }],
          },
          {
            _key: "b5-2", _type: "block", style: "normal",
            children: [{ _key: "s5-2", _type: "span", text: "• संस्करण → 56वाँ" }],
          },
          {
            _key: "b5-3", _type: "block", style: "normal",
            children: [{ _key: "s5-3", _type: "span", text: "• भारत के पदक → 5 स्वर्ण पदक (शत-प्रतिशत सफलता)" }],
          },
          {
            _key: "b5-4", _type: "block", style: "normal",
            children: [{ _key: "s5-4", _type: "span", text: "• भारत की रैंक → संयुक्त रूप से विश्व में प्रथम स्थान (चीन, रूस, कज़ाकिस्तान, द. कोरिया, ताइवान के साथ)" }],
          },
          {
            _key: "b5-5", _type: "block", style: "normal",
            children: [{ _key: "s5-5", _type: "span", text: "• नोडल संस्था → HBCSE (Homi Bhabha Centre for Science Education)" }],
          },
          {
            _key: "b5-6", _type: "block", style: "normal",
            children: [{ _key: "s5-6", _type: "span", text: "• सम्बद्धता → HBCSE, TIFR का एक राष्ट्रीय केंद्र है, जो परमाणु ऊर्जा विभाग (DAE) के अधीन काम करता है।" }],
          },
          {
            _key: "b5-7", _type: "block", style: "normal",
            children: [{ _key: "s5-7", _type: "span", text: "• अन्य ओलंपियाड → भारत जिन अन्य अंतरराष्ट्रीय विज्ञान ओलंपियाडों में भाग लेता है: गणित (IMO), रसायन विज्ञान (IChO), जीव विज्ञान (IBO), खगोल विज्ञान और खगोल भौतिकी (IOAA) तथा सूचना विज्ञान (IOI)।" }],
          },
        ],
        bodyEn: [
          {
            _key: "b5-8", _type: "block", style: "normal",
            children: [{ _key: "s5-8", _type: "span", text: "• Venue → Bucaramanga, Colombia" }],
          },
          {
            _key: "b5-9", _type: "block", style: "normal",
            children: [{ _key: "s5-9", _type: "span", text: "• Edition → 56th IPhO" }],
          },
          {
            _key: "b5-10", _type: "block", style: "normal",
            children: [{ _key: "s5-10", _type: "span", text: "• India's Medals → 5 Gold Medals (100% success rate)" }],
          },
          {
            _key: "b5-11", _type: "block", style: "normal",
            children: [{ _key: "s5-11", _type: "span", text: "• India's Rank → Joint 1st globally (with China, Russia, Kazakhstan, South Korea, and Taiwan)" }],
          },
          {
            _key: "b5-12", _type: "block", style: "normal",
            children: [{ _key: "s5-12", _type: "span", text: "• Nodal Agency → HBCSE (Homi Bhabha Centre for Science Education)" }],
          },
          {
            _key: "b5-13", _type: "block", style: "normal",
            children: [{ _key: "s5-13", _type: "span", text: "• Parent bodies → HBCSE is a national centre of TIFR, which is an aided institution under the Department of Atomic Energy (DAE)." }],
          },
          {
            _key: "b5-14", _type: "block", style: "normal",
            children: [{ _key: "s5-14", _type: "span", text: "• Other Olympiads → Other global science Olympiads India participates in: Mathematics (IMO), Chemistry (IChO), Biology (IBO), Astronomy & Astrophysics (IOAA), and Informatics (IOI)." }],
          },
        ],
      },
    ],

    /* ─── MCQs ──────────────────────────────────────────────── */
    mcqs: [
      {
        question: "56वाँ अंतर्राष्ट्रीय भौतिकी ओलंपियाड (IPhO-2026) कहाँ आयोजित हुआ?",
        questionEn: "Where was the 56th International Physics Olympiad (IPhO-2026) held?",
        options: ["ब्राज़ील", "कोलंबिया", "स्पेन", "फ्रांस"],
        optionsEn: ["Brazil", "Colombia", "Spain", "France"],
        correctIndex: 1,
        explanation: "56वाँ अंतर्राष्ट्रीय भौतिकी ओलंपियाड (IPhO-2026) कोलंबिया के बुकारामांगा (Bucaramanga) शहर में आयोजित किया गया था।",
        explanationEn: "The 56th International Physics Olympiad (IPhO-2026) was held in Bucaramanga, Colombia."
      },
      {
        question: "IPhO-2026 में भारत ने कुल कितने स्वर्ण पदक जीते?",
        questionEn: "How many gold medals did India win in IPhO-2026?",
        options: ["2", "3", "4", "5"],
        optionsEn: ["2", "3", "4", "5"],
        correctIndex: 3,
        explanation: "भारत के सभी पाँचों प्रतिभागियों ने प्रतियोगिता में स्वर्ण पदक जीता, जिससे भारत ने शत-प्रतिशत सफलता प्राप्त की।",
        explanationEn: "All five participants from India won gold medals, achieving a 100% success rate."
      },
      {
        question: "भारत में राष्ट्रीय ओलंपियाड कार्यक्रम का नोडल संस्थान कौन-सा है?",
        questionEn: "Which is the nodal institution for the National Olympiad Program in India?",
        options: ["IIT दिल्ली", "IISc बेंगलुरु", "HBCSE", "CSIR"],
        optionsEn: ["IIT Delhi", "IISc Bengaluru", "HBCSE", "CSIR"],
        correctIndex: 2,
        explanation: "होमी भाभा विज्ञान शिक्षा केंद्र (HBCSE), मुंबई भारत में राष्ट्रीय ओलंपियाड कार्यक्रम के आयोजन का नोडल संस्थान है।",
        explanationEn: "Homi Bhabha Centre for Science Education (HBCSE), Mumbai is the nodal agency for conducting Olympiads in India."
      },
      {
        question: "HBCSE किस संस्थान का राष्ट्रीय केंद्र है?",
        questionEn: "HBCSE is a national centre of which institution?",
        options: ["IISER", "IIT", "TIFR", "AIIMS"],
        optionsEn: ["IISER", "IIT", "TIFR", "AIIMS"],
        correctIndex: 2,
        explanation: "होमी भाभा विज्ञान शिक्षा केंद्र (HBCSE) टाटा इंस्टीट्यूट ऑफ फंडामेंटल रिसर्च (TIFR) का एक राष्ट्रीय केंद्र है।",
        explanationEn: "Homi Bhabha Centre for Science Education (HBCSE) is a National Centre of the Tata Institute of Fundamental Research (TIFR)."
      },
      {
        question: "TIFR का पूर्ण रूप क्या है?",
        questionEn: "What is the full form of TIFR?",
        options: [
          "Tata Institute of Fundamental Research",
          "Technical Institute for Fundamental Research",
          "Tata Institute of Future Research",
          "Technology Institute for Research"
        ],
        optionsEn: [
          "Tata Institute of Fundamental Research",
          "Technical Institute for Fundamental Research",
          "Tata Institute of Future Research",
          "Technology Institute for Research"
        ],
        correctIndex: 0,
        explanation: "TIFR का पूर्ण रूप 'Tata Institute of Fundamental Research' (टाटा इंस्टीट्यूट ऑफ फंडामेंटल रिसर्च) है।",
        explanationEn: "TIFR stands for Tata Institute of Fundamental Research."
      },
      {
        question: "HBCSE किस मंत्रालय/विभाग के अधीन सहायता प्राप्त संस्थान है?",
        questionEn: "HBCSE is an aided institution under which ministry/department?",
        options: ["शिक्षा मंत्रालय", "विज्ञान एवं प्रौद्योगिकी मंत्रालय", "परमाणु ऊर्जा विभाग (DAE)", "AICTE"],
        optionsEn: ["Ministry of Education", "Ministry of Science & Technology", "Department of Atomic Energy (DAE)", "AICTE"],
        correctIndex: 2,
        explanation: "TIFR और उसका राष्ट्रीय केंद्र HBCSE, भारत सरकार के परमाणु ऊर्जा विभाग (DAE) के अधीन एक सहायता प्राप्त संस्थान हैं।",
        explanationEn: "TIFR and its national centre HBCSE are aided institutions under the Department of Atomic Energy (DAE), Government of India."
      },
      {
        question: "निम्न कथनों पर विचार कीजिए:\n1. IPhO-2026 का आयोजन कोलंबिया में हुआ।\n2. भारत के सभी पाँच प्रतिभागियों ने स्वर्ण पदक जीते।\nसही विकल्प चुनिए:",
        questionEn: "Consider the following statements:\n1. IPhO-2026 was held in Colombia.\n2. All five participants from India won gold medals.\nChoose the correct option:",
        options: ["केवल 1 सही", "केवल 2 सही", "दोनों सही", "दोनों गलत"],
        optionsEn: ["Only 1 is correct", "Only 2 is correct", "Both are correct", "Both are incorrect"],
        correctIndex: 2,
        explanation: "दोनों कथन बिल्कुल सही हैं। 56वें अंतर्राष्ट्रीय भौतिकी ओलंपियाड का आयोजन कोलंबिया के बुकारामांगा में हुआ था और भारत ने 5 स्वर्ण पदक जीते।",
        explanationEn: "Both statements are correct. The 56th International Physics Olympiad was held in Bucaramanga, Colombia, and India won 5 gold medals."
      },
      {
        question: "IPhO का मुख्य उद्देश्य क्या है?",
        questionEn: "What is the primary objective of IPhO?",
        options: [
          "केवल विश्वविद्यालय छात्रों की परीक्षा",
          "वैज्ञानिक प्रतिभाओं की पहचान एवं प्रोत्साहन",
          "केवल शोध पत्र प्रस्तुत करना",
          "केवल इंजीनियरिंग छात्रों की प्रतियोगिता"
        ],
        optionsEn: [
          "Examination of university students only",
          "Identification and promotion of scientific talent",
          "Presenting research papers only",
          "Competition for engineering students only"
        ],
        correctIndex: 1,
        explanation: "IPhO का प्राथमिक उद्देश्य माध्यमिक स्तर के प्रतिभाशाली छात्रों की पहचान करना और उनके बीच वैज्ञानिक सहयोग को प्रोत्साहित करना है।",
        explanationEn: "The primary objective of IPhO is to identify talented high-school physics students and foster global scientific collaboration."
      },
    ],

    /* ─── FAQs ──────────────────────────────────────────────── */
    faqs: [
      {
        question: "56वाँ अंतर्राष्ट्रीय भौतिकी ओलंपियाड (IPhO) 2026 कहाँ आयोजित हुआ था?",
        questionEn: "Where was the 56th International Physics Olympiad (IPhO) 2026 held?",
        answer: "56वाँ अंतर्राष्ट्रीय भौतिकी ओलंपियाड (IPhO) 2026 कोलंबिया के बुकारामांगा (Bucaramanga) शहर में 4 जुलाई से 12 जुलाई 2026 के बीच आयोजित किया गया था।",
        answerEn: "The 56th International Physics Olympiad (IPhO) 2026 was held in Bucaramanga, Colombia from July 4 to July 12, 2026.",
      },
      {
        question: "IPhO-2026 में भारत का क्या प्रदर्शन रहा?",
        questionEn: "What was India's performance in IPhO-2026?",
        answer: "भारत ने शत-प्रतिशत सफलता प्राप्त करते हुए सभी 5 स्वर्ण पदक जीते और चीन, कज़ाकिस्तान, रूस, दक्षिण कोरिया और ताइवान के साथ संयुक्त रूप से विश्व में प्रथम स्थान प्राप्त किया।",
        answerEn: "India achieved a clean sweep by winning all 5 gold medals, securing the joint first rank globally alongside China, Kazakhstan, Russia, South Korea, and Taiwan.",
      },
      {
        question: "भारत में विज्ञान और गणित ओलंपियाड का संचालन कौन-सी संस्था करती है?",
        questionEn: "Which agency coordinates the science and math Olympiads in India?",
        answer: "मुंबई स्थित होमी भाभा विज्ञान शिक्षा केंद्र (HBCSE), जो टाटा इंस्टीट्यूट ऑफ फंडामेंटल रिसर्च (TIFR) का एक राष्ट्रीय केंद्र है, भारत में राष्ट्रीय ओलंपियाड कार्यक्रमों के संचालन के लिए नोडल एजेंसी है। यह परमाणु ऊर्जा विभाग (DAE) के अधीन सहायता प्राप्त है।",
        answerEn: "Homi Bhabha Centre for Science Education (HBCSE), Mumbai, which is a national centre of TIFR, is the nodal agency for the National Olympiad Program in India. It is aided by the Department of Atomic Energy (DAE).",
      },
    ],

    /* ─── Sources ────────────────────────────────────────────── */
    sources: [
      { label: "Homi Bhabha Centre for Science Education (HBCSE)", url: "https://www.hbcse.tifr.res.in" },
      { label: "International Physics Olympiad (IPhO) Official Portal", url: "https://www.ipho2026.co" },
      { label: "Tata Institute of Fundamental Research (TIFR)", url: "https://www.tifr.res.in" },
      { label: "Department of Atomic Energy (DAE), Govt of India", url: "https://dae.gov.in" },
    ],
  };

  try {
    await client.createOrReplace(article);
    console.log("✨ Successfully uploaded IPhO 2026 Article to Sanity!");
  } catch (err) {
    console.error("❌ Failed to create/replace document in Sanity:", err);
  }
}

main().catch((err) => {
  console.error("❌ Error running script:", err);
  process.exit(1);
});
