import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import path from "path";

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

async function main() {
  console.log("🔗 Starting Bidirectional Interlinking for Sports & Athletics Articles...");

  // 1. Fetch Ariha Pangambam Documents
  const arihaCa = await client.getDocument("ca-ariha-pangambam-asian-gymnastics-gold-2026");
  const arihaGk = await client.getDocument("gk-ariha-pangambam-asian-gymnastics-gold-2026");

  // 2. Fetch Yamini Maurya Documents
  const yaminiCa = await client.getDocument("ca-yamini-maurya-biography-cwg-2026-silver-medal-judo");
  const yaminiGk = await client.getDocument("gk-yamini-maurya-biography-cwg-2026-silver-medal-judo");

  // 3. Fetch Mirabai Chanu Documents
  const mirabaiCa = await client.getDocument("ca-mirabai-chanu-gold-cwg-2026");
  const mirabaiGk = await client.getDocument("gk-mirabai-chanu-gold-cwg-2026");

  if (!arihaCa) {
    console.error("❌ Ariha Pangambam document not found!");
    process.exit(1);
  }

  // Interlink Blocks to insert in Ariha Pangambam Article
  const interlinkBlockInArihaHi = {
    _key: "interlink-block-sports-rel-hi",
    _type: "block",
    style: "h3",
    children: [
      {
        _key: "span-interlink-ariha-hi-1",
        _type: "span",
        text: "🔗 संबंधित अंतर्राष्ट्रीय एवं राष्ट्रीय खेल अध्ययन सामग्री (Related Sports Notes): ",
      },
      {
        _key: "span-link-ariha-hi-2",
        _type: "span",
        text: "यामिनी मौर्य एवं मीराबाई चानू — परीक्षा उपयोगी स्पोर्ट्स नोट्स",
        marks: ["strong"],
      }
    ],
  };

  const interlinkBannersInArihaHi = [
    {
      _key: "interlink-banner-yamini-hi",
      _type: "block",
      style: "normal",
      children: [
        {
          _key: "span-banner-yamini-hi-1",
          _type: "span",
          text: "• **मध्य प्रदेश खेल विशेष**: मध्य प्रदेश के सागर की जूडो स्टार यामिनी मौर्य की प्रेरणादायक कहानी व CWG रिकॉर्ड्स पढ़ें: ",
        },
        {
          _key: "span-banner-yamini-hi-2",
          _type: "span",
          text: "[यामिनी मौर्य (Yamini Maurya) जीवनी व नोट्स](/current-affairs/yamini-maurya-biography-cwg-2026-silver-medal-judo)",
        }
      ]
    },
    {
      _key: "interlink-banner-mirabai-hi",
      _type: "block",
      style: "normal",
      children: [
        {
          _key: "span-banner-mirabai-hi-1",
          _type: "span",
          text: "• **मणिपुर खेल रत्न**: मणिपुर की ही भारतोलक चैंपियन मीराबाई चानू के स्वर्णिम रिकॉर्ड्स पढ़ें: ",
        },
        {
          _key: "span-banner-mirabai-hi-2",
          _type: "span",
          text: "[मीराबाई चानू (Mirabai Chanu) जीवनी व नोट्स](/current-affairs/mirabai-chanu-biography-cwg-2026-gold-medal-weightlifting)",
        }
      ]
    }
  ];

  const interlinkBannersInArihaEn = [
    {
      _key: "interlink-banner-yamini-en",
      _type: "block",
      style: "normal",
      children: [
        {
          _key: "span-banner-yamini-en-1",
          _type: "span",
          text: "• **MP Sports Special**: Read complete biography and achievements of Sagar (MP) Judo star Yamini Maurya: ",
        },
        {
          _key: "span-banner-yamini-en-2",
          _type: "span",
          text: "[Yamini Maurya Biography & Notes](/en/current-affairs/yamini-maurya-biography-cwg-2026-silver-medal-judo)",
        }
      ]
    },
    {
      _key: "interlink-banner-mirabai-en",
      _type: "block",
      style: "normal",
      children: [
        {
          _key: "span-banner-mirabai-en-1",
          _type: "span",
          text: "• **Manipur Sports Pride**: Read gold medallist weightlifter Mirabai Chanu's career records: ",
        },
        {
          _key: "span-banner-mirabai-en-2",
          _type: "span",
          text: "[Mirabai Chanu Biography & Notes](/en/current-affairs/mirabai-chanu-biography-cwg-2026-gold-medal-weightlifting)",
        }
      ]
    }
  ];

  // Insert Interlink Blocks into Ariha Pangambam sections
  const updatedArihaSections = (arihaCa.sections as any[] || []).map((sec) => {
    if (sec.kind === "impact" || sec._key === "sec-4-exam-quick-revision") {
      return {
        ...sec,
        body: [...(sec.body || []), interlinkBlockInArihaHi, ...interlinkBannersInArihaHi],
        bodyEn: [...(sec.bodyEn || []), interlinkBlockInArihaHi, ...interlinkBannersInArihaEn],
      };
    }
    return sec;
  });

  // Update Ariha Pangambam CA Document with Next Article reference to Yamini Maurya
  const updatedArihaCa = {
    ...arihaCa,
    nextArticle: yaminiCa ? { _type: "reference", _ref: yaminiCa._id } : undefined,
    sections: updatedArihaSections,
  };
  await client.createOrReplace(updatedArihaCa);
  console.log("✨ Updated Ariha Pangambam CA Document with Sports Interlinks & Next Article Reference!");

  if (arihaGk) {
    const updatedArihaGk = {
      ...arihaGk,
      nextArticle: yaminiCa ? { _type: "reference", _ref: yaminiCa._id } : undefined,
      sections: updatedArihaSections,
    };
    await client.createOrReplace(updatedArihaGk);
    console.log("✨ Updated Ariha Pangambam GK Document with Sports Interlinks!");
  }

  // Update Yamini Maurya Document with Interlink to Ariha Pangambam
  if (yaminiCa) {
    const interlinkBlockInYaminiHi = {
      _key: "interlink-block-ariha-in-yamini-hi",
      _type: "block",
      style: "h3",
      children: [
        {
          _key: "span-link-yamini-ariha-hi",
          _type: "span",
          text: "🔗 नवीनतम स्पोर्ट्स समसामयिकी: अरिहा पंगमबम (Ariha Pangambam) ने एशियन एयरोबिक जिम्नास्टिक में जीता भारत का पहला गोल्ड मेडल — ",
        },
        {
          _key: "span-link-yamini-ariha-hi-2",
          _type: "span",
          text: "[अरिहा पंगमबम नोट्स पढ़ें](/current-affairs/ariha-pangambam-asian-aerobic-gymnastics-championship-gold-medal)",
          marks: ["strong"],
        }
      ]
    };

    const yaminiSections = (yaminiCa.sections as any[] || []).map((sec, idx) => {
      if (idx === (yaminiCa.sections.length - 1)) {
        return {
          ...sec,
          body: [...(sec.body || []), interlinkBlockInYaminiHi],
        };
      }
      return sec;
    });

    await client.patch(yaminiCa._id)
      .set({
        nextArticle: { _type: "reference", _ref: arihaCa._id },
        sections: yaminiSections,
      })
      .commit();
    console.log("✨ Updated Yamini Maurya Document with Interlink to Ariha Pangambam!");

    if (yaminiGk) {
      await client.patch(yaminiGk._id)
        .set({
          nextArticle: { _type: "reference", _ref: arihaCa._id },
          sections: yaminiSections,
        })
        .commit();
    }
  }

  console.log("🎉 Sports Articles Bidirectional Interlinking successfully completed!");
}

main().catch((err) => {
  console.error("❌ Error performing interlinking:", err);
  process.exit(1);
});
