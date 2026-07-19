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
