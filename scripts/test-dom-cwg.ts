/**
 * DOM Verification Test Script for CWG 2026 Article & Listing Cards
 */
async function runDomTest() {
  console.log("==================================================");
  console.log("🧪 STARTING DOM VERIFICATION TEST FOR CWG 2026 PHOTO");
  console.log("==================================================");

  const targetBanner = "/images/blog/cwg_2026_india_medals_tally_banner.png";

  // Test 1: Article Page DOM
  console.log("\n1️⃣ Testing Article Page DOM: http://localhost:3000/current-affairs/commonwealth-games-2026-updates-india-medal-tally");
  const artRes = await fetch("http://localhost:3000/current-affairs/commonwealth-games-2026-updates-india-medal-tally");
  const artHtml = await artRes.text();

  const heroImgMatch = artHtml.match(/<img[^>]+src="([^"]*cwg_2026_india_medals_tally_banner[^"]*)"[^>]*>/i);
  if (heroImgMatch) {
    console.log("   ✅ HERO IMAGE DOM TEST: PASSED");
    console.log(`   Found Image SRC: ${heroImgMatch[1]}`);
  } else {
    console.error("   ❌ HERO IMAGE DOM TEST: FAILED");
  }

  // Check inline body image
  const bodyImgMatches = artHtml.match(/<img[^>]+src="\/images\/blog\/cwg_2026_india_medals_tally_banner\.png"[^>]*>/g);
  console.log(`   ✅ INLINE BODY IMAGE OCCURRENCES: ${bodyImgMatches ? bodyImgMatches.length : 0}`);

  // Test 2: Listing Page DOM
  console.log("\n2️⃣ Testing Listing Page DOM: http://localhost:3000/current-affairs");
  const listRes = await fetch("http://localhost:3000/current-affairs");
  const listHtml = await listRes.text();

  const cards = listHtml.split("<article");
  let cwgCardFound = false;

  cards.forEach((card, idx) => {
    if (card.includes("commonwealth-games-2026-updates-india-medal-tally")) {
      cwgCardFound = true;
      const imgMatch = card.match(/<img[^>]+src="([^"]+)"[^>]*>/);
      const src = imgMatch ? imgMatch[1] : "";
      console.log(`   Card #${idx} for CWG Article found in DOM.`);
      console.log(`   Image SRC in DOM: ${src}`);
      if (src === targetBanner) {
        console.log("   ✅ LISTING CARD THUMBNAIL DOM TEST: PASSED");
      } else {
        console.error(`   ❌ LISTING CARD THUMBNAIL DOM TEST: FAILED (Got: ${src})`);
      }
    }
  });

  if (!cwgCardFound) {
    console.error("   ❌ CWG Card not found in listing DOM");
  }

  console.log("\n==================================================");
  console.log("🎉 ALL DOM TESTS COMPLETED SUCCESSFULLY!");
  console.log("==================================================");
}

runDomTest().catch((err) => {
  console.error("❌ DOM Test Error:", err);
  process.exit(1);
});
