# Article Writing Format & Structure Rules

All future articles written or updated in this repository (e.g. for `staticGk`, `currentAffairs`, etc.) MUST strictly adhere to this locked format to guarantee maximum readability, SEO, and exam utility.

## 1. Do Not Shorten Content
- Always preserve the full, detailed text, statistics, names, and lists provided by the user verbatim. Do not summarize or truncate sections.

## 2. Structure with H3 Subheadings
- Avoid large blocks of text. Break down the article into detailed logical units using subheadings of style `"h3"` (e.g. `style: "h3"` blocks in Sanity Portable Text).

## 3. Explicit Bullet Points (Separate Blocks)
- Never combine lists into a single text block.
- Render each list item as a separate block starting with `"• "` to trigger the automatic frontend list parser.
- Use colons in bullets (e.g. `"• Key Concept: Detailed explanation"`) to auto-bold the bullet titles.

## 4. Bold Key Terms (Highlights)
- Use standard markdown bold tags `**word**` within text blocks to highlight key terms, schemes, deities, districts, or facts.

## 5. Collapsible FAQs
- Map all QA/FAQ content into the `faqs` schema array field of the document so they render in the interactive collapsible accordion UI at the bottom.

## 6. Practice MCQs
- Always include multiple relevant, exam-focused MCQs in the `mcqs` schema array field (with Hindi/English questions, options, correctIndex, and explanations) so they render as interactive quizzes.
- **For `currentAffairs` articles specifically, you MUST generate and include exactly 8 high-quality MCQs (quizzes).**


## 7. Real Image Integration
- Generate 3-4 highly realistic, context-appropriate images using the `generate_image` tool.
- Upload them to Sanity as assets and embed them as `_type: "image"` blocks with appropriate `alt` and `caption` tags directly inside the body sections.

## 8. Locked Vacancy Notification UI & SEO Standard
- All future vacancy notifications created or updated MUST strictly follow the locked MPSI 2026 UI structure:
  - Structured Rulebook Overview with brand tables (`#6ac7f2`/`#20698f`)
  - No duplicate body text & no MCQs (pass `body: []` and `mcqs: []` to `ArticleBody` when overview component is active)
  - Course banners in Right Sidebar & Bottom of main column
  - Right Sidebar sequence: Target Course -> WhatsApp Alert -> Coaching Batches -> Sponsored Ad Rotator
  - Full SEO & GEO Schema Graph (`JobPosting`, `FAQPage` 10 FAQs, `NewsArticle` by Aakar IAS Team)
## 9. Mandatory Sitemap & SEO Indexing Rule
- **ALL Dynamic Pages MUST be in `sitemap.ts`**: Every single dynamic content type (Current Affairs, Static GK, Notifications, Monthly PDFs, Publications, Online Courses, Topper Copies, Tag Pages, Date Pages) in both Hindi (`/`) and English (`/en/`) MUST be fetched and generated dynamically in `src/app/sitemap.ts`.
- **Metadata Language Alignment**: When generating metadata via `buildMetadata`, always explicitly specify `locale: "en"` for `/en/` routes so OpenGraph and hreflang tags match the route language.
- **Dynamic Headers**: Ensure canonical URLs and hreflang links are always clean and valid so Googlebot can crawl and index all content seamlessly.
