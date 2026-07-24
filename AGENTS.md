<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Mandatory Sanity CMS Sync Rule
- Any content added or modified in the codebase (e.g. static GK articles, current affairs, toppers' answer copies, publications, syllabus breakdowns, FAQs, MCQs) MUST be updated and published directly in Sanity CMS using the Sanity Client/Write pipeline (`SANITY_API_WRITE_TOKEN`).

# Git Push Rule
- NEVER execute `git push` automatically. Always build, test, and wait for explicit approval/command from the user before pushing any changes to Git.


