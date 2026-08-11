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
  console.log("🔗 Starting Bidirectional Interlinking for Supercomputer Articles...");

  // 1. Fetch Param Pragya Documents
  const paramPragyaCa = await client.getDocument("ca-param-pragya-ai-supercomputer");
  const paramPragyaGk = await client.getDocument("gk-param-pragya-ai-supercomputer");

  // 2. Fetch Supercomputer Guide Documents
  const supercomputerGk = await client.getDocument("gk-supercomputer-what-is-supercomputing-guide");
  const supercomputerCa = await client.getDocument("ca-supercomputer-what-is-supercomputing-guide");

  if (!paramPragyaCa || !supercomputerGk) {
    console.error("❌ Required documents not found in Sanity!");
    process.exit(1);
  }

  // Interlink Block to insert inside Param Pragya Article
  const interlinkBlockInPragyaHi = {
    _key: "interlink-block-supercomputer-guide-hi",
    _type: "block",
    style: "h3",
    children: [
      {
        _key: "span-interlink-pragya-hi",
        _type: "span",
        text: "🔗 संबंधित विस्तृत अध्ययन सामग्री: ",
      },
      {
        _key: "span-link-pragya-hi",
        _type: "span",
        text: "सुपरकंप्यूटर क्या है? उपयोग, विशेषताएँ, इतिहास और भारत के प्रमुख सुपरकंप्यूटर (Complete Study Guide)",
        marks: ["strong"],
      }
    ],
  };

  const interlinkBannerInPragyaHi = {
    _key: "interlink-banner-pragya-hi",
    _type: "block",
    style: "normal",
    children: [
      {
        _key: "span-banner-pragya-hi-1",
        _type: "span",
        text: "भारत की सुपरकंप्यूटिंग यात्रा, परम 8000 से लेकर AIRAWAT, FLOPS मापक प्रणाली और विश्व के शीर्ष सुपरकंप्यूटरों के संपूर्ण अध्ययन हेतु हमारा विस्तृत लेख पढ़ें: ",
      },
      {
        _key: "span-banner-pragya-hi-2",
        _type: "span",
        text: "[सुपरकंप्यूटर सम्पूर्ण गाइड व नोट्स](/general-awareness/supercomputer-what-is-supercomputing-history-india-mppsc-notes)",
      }
    ]
  };

  const interlinkBannerInPragyaEn = {
    _key: "interlink-banner-pragya-en",
    _type: "block",
    style: "normal",
    children: [
      {
        _key: "span-banner-pragya-en-1",
        _type: "span",
        text: "Read our comprehensive guide on Supercomputing history, PARAM 8000, FLOPS, National Supercomputing Mission & World TOP500 rankings: ",
      },
      {
        _key: "span-banner-pragya-en-2",
        _type: "span",
        text: "[Supercomputers Complete Study Notes](/en/general-awareness/supercomputer-what-is-supercomputing-history-india-mppsc-notes)",
      }
    ]
  };

  // Add interlink callout block into Param Pragya sections
  const pragyaSectionsHi = (paramPragyaCa.sections as any[] || []).map((sec) => {
    if (sec.kind === "keyHighlights" || sec.title?.includes("परम 8000 से परम प्रज्ञा")) {
      return {
        ...sec,
        body: [...(sec.body || []), interlinkBlockInPragyaHi, interlinkBannerInPragyaHi],
        bodyEn: [...(sec.bodyEn || []), interlinkBlockInPragyaHi, interlinkBannerInPragyaEn],
      };
    }
    return sec;
  });

  // Update Param Pragya CA Document with Next Article Reference & Interlinking
  const updatedPragyaCa = {
    ...paramPragyaCa,
    nextArticle: { _type: "reference", _ref: "gk-supercomputer-what-is-supercomputing-guide" },
    sections: pragyaSectionsHi,
  };
  await client.createOrReplace(updatedPragyaCa);
  console.log("✨ Updated Param Pragya CA Document with Next Article Reference & Interlink!");

  // Update Param Pragya GK Document
  if (paramPragyaGk) {
    const updatedPragyaGk = {
      ...paramPragyaGk,
      nextArticle: { _type: "reference", _ref: "gk-supercomputer-what-is-supercomputing-guide" },
      sections: pragyaSectionsHi,
    };
    await client.createOrReplace(updatedPragyaGk);
    console.log("✨ Updated Param Pragya GK Document with Next Article Reference & Interlink!");
  }

  // Interlink Block to insert inside Supercomputer Guide Article
  const interlinkBlockInGuideHi = {
    _key: "interlink-block-pragya-ca-hi",
    _type: "block",
    style: "h3",
    children: [
      {
        _key: "span-interlink-guide-hi",
        _type: "span",
        text: "⚡ नवीनतम समसामयिकी (Current Affairs): ",
      },
      {
        _key: "span-link-guide-hi",
        _type: "span",
        text: "भारत का नया AI सुपरकंप्यूटर 'परम प्रज्ञा' (PARAM Pragya AI Supercomputer) — विस्तृत विश्लेषण",
        marks: ["strong"],
      }
    ],
  };

  const interlinkBannerInGuideHi = {
    _key: "interlink-banner-guide-hi",
    _type: "block",
    style: "normal",
    children: [
      {
        _key: "span-banner-guide-hi-1",
        _type: "span",
        text: "प्रधानमंत्री नरेंद्र मोदी द्वारा आईआईटी दिल्ली सोनीपत परिसर में उद्घाटन किए गए 250 AI पेटाफ्लॉप्स क्षमता वाले 'परम प्रज्ञा' सुपरकंप्यूटर पर विशेष परीक्षा नोट्स पढ़ने के लिए क्लिक करें: ",
      },
      {
        _key: "span-banner-guide-hi-2",
        _type: "span",
        text: "[परम प्रज्ञा AI सुपरकंप्यूटर 2026 नोट्स](/current-affairs/param-pragya-ai-supercomputer-india-supercomputing-journey)",
      }
    ]
  };

  const interlinkBannerInGuideEn = {
    _key: "interlink-banner-guide-en",
    _type: "block",
    style: "normal",
    children: [
      {
        _key: "span-banner-guide-en-1",
        _type: "span",
        text: "Explore dedicated coverage on India's latest 250 AI Petaflops PARAM Pragya supercomputer inaugurated at IIT Delhi Sonipat Campus: ",
      },
      {
        _key: "span-banner-guide-en-2",
        _type: "span",
        text: "[PARAM Pragya AI Supercomputer Detailed Notes](/en/current-affairs/param-pragya-ai-supercomputer-india-supercomputing-journey)",
      }
    ]
  };

  // Add interlink callout block into Supercomputer Guide sections
  const guideSectionsHi = (supercomputerGk.sections as any[] || []).map((sec) => {
    if (sec.kind === "keyHighlights" || sec.title?.includes("परम प्रज्ञा") || sec._key === "sec-interlink-pragya") {
      return {
        ...sec,
        body: [...(sec.body || []), interlinkBlockInGuideHi, interlinkBannerInGuideHi],
        bodyEn: [...(sec.bodyEn || []), interlinkBlockInGuideHi, interlinkBannerInGuideEn],
      };
    }
    return sec;
  });

  // Update Supercomputer Guide GK Document with Next Article Reference & Interlinking
  const updatedGuideGk = {
    ...supercomputerGk,
    nextArticle: { _type: "reference", _ref: "ca-param-pragya-ai-supercomputer" },
    sections: guideSectionsHi,
  };
  await client.createOrReplace(updatedGuideGk);
  console.log("✨ Updated Supercomputer Guide GK Document with Next Article Reference & Interlink!");

  // Update Supercomputer Guide CA Document
  if (supercomputerCa) {
    const updatedGuideCa = {
      ...supercomputerCa,
      nextArticle: { _type: "reference", _ref: "ca-param-pragya-ai-supercomputer" },
      sections: guideSectionsHi,
    };
    await client.createOrReplace(updatedGuideCa);
    console.log("✨ Updated Supercomputer Guide CA Document with Next Article Reference & Interlink!");
  }

  console.log("🎉 Successfully completed Bidirectional Interlinking between both articles!");
}

main().catch((err) => {
  console.error("❌ Error performing interlinking:", err);
  process.exit(1);
});
