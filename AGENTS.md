<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Mandatory Sanity CMS Sync Rule
- Any content added or modified in the codebase (e.g. static GK articles, current affairs, toppers' answer copies, publications, syllabus breakdowns, FAQs, MCQs) MUST be updated and published directly in Sanity CMS using the Sanity Client/Write pipeline (`SANITY_API_WRITE_TOKEN`).

# Git Push Rule
- NEVER execute `git push` automatically. Always build, test, and wait for explicit approval/command from the user before pushing any changes to Git.

# MPPSC Priority Rule
- **MPPSC MUST ALWAYS be prioritized first** over UPSC across all articles, SEO titles, meta descriptions, excerpts, tags, exam points, FAQs, and MCQs (e.g. always use "MPPSC & UPSC", "MPPSC / UPSC", put `tag-mppsc` before `tag-upsc`, and target MPPSC exam syllabus explicitly).

# Mandatory Default Author Rule
- **Deepraj Sikarwar (Editorial Team)** MUST ALWAYS be set as the default author for all articles, static GK, current affairs, publications, overrides, and repository fallbacks across the application.

# Mandatory Bilingual Content Rule (Hindi & English)
- **ALL ARTICLES MUST ALWAYS BE WRITTEN AND MAINTAINED BILINGUALLY IN BOTH HINDI AND ENGLISH**.
- For every block, paragraph, heading, list item, table header, FAQ, and MCQ, provide complete Hindi (`text`, `title`, `excerpt`, `question`, `answer`, `explanation`) AND complete English (`textEn`, `titleEn`, `excerptEn`, `questionEn`, `answerEn`, `explanationEn`) translations so switching to `/en/...` routes renders full English text without falling back to Hindi.

# Locked Vacancy Notification UI & SEO Standard Rule
- **ALL FUTURE RECRUITMENT VACANCY NOTIFICATIONS MUST STRICTLY ADHERE TO THIS LOCKED UI & SEO FORMAT**:
  1. **Rulebook Overview UI Component**: Use structured table cards in website brand colors (`#6ac7f2`/`#20698f`) covering all key sections (Job Overview, Important Dates, Vacancy Breakdown, Qualifications, Age Limits, Application Fees, Selection Process, Detailed Syllabus Tables, Physical PET Standards, Pay Matrix Salary, Exam Centers, Documents).
  2. **No Duplicate Body Content**: Pass `body: []` to `ArticleBody` when rendering a dedicated Rulebook Overview component so body text blocks are not duplicated, while keeping interactive MCQs & FAQs.
  3. **Target Course Promotion**: Include dedicated Paid Course Banners in **Right Sidebar (`variant="sidebar"`)** and at **Bottom of Main Content (`variant="full"`)**.
  4. **Right Sidebar Layout Sequence**:
     - Top: Target Course Banner (`variant="sidebar"`)
     - Middle: WhatsApp Job Alert Card (`bg-emerald-500/10`)
     - Middle: Aakar IAS Coaching Batches Card
     - Bottom: Dynamic `ArticleAdRotator` Card (Sponsored Ads)
  5. **SEO & GEO (AI Search Engine Optimization)**:
     - Target high-intent Google search keywords in title & meta tags.
     - Include `JobPosting` schema (hiring org, location, baseSalary Level 9, validThrough).
     - Include `FAQPage` schema with 10 high-value FAQs in both Hindi & English.
     - Include `NewsArticle` schema with default author **Deepraj Sikarwar (Editorial Team)**.

