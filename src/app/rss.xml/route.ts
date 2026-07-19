import { getContentRepository } from "@/lib/content/content-repository";
import { siteConfig } from "@/lib/site-config";

/**
 * RSS 2.0 feed at /rss.xml. Reads the latest Hindi current affairs by default.
 */
export const revalidate = 3600;

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const repo = await getContentRepository();
  const { items } = await repo.listArticles({ locale: "hi", pageSize: 20, page: 1 });

  const channel = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">`,
    `  <channel>`,
    `    <title>${escapeXml(siteConfig.name)}</title>`,
    `    <link>${siteConfig.url}</link>`,
    `    <description>${escapeXml(siteConfig.description)}</description>`,
    `    <language>hi-IN</language>`,
    `    <atom:link href="${siteConfig.url}/rss.xml" rel="self" type="application/rss+xml" />`,
  ];

  for (const a of items) {
    const url = `${siteConfig.url}${a.href}`;
    channel.push(
      `    <item>`,
      `      <title>${escapeXml(a.title)}</title>`,
      `      <link>${url}</link>`,
      `      <guid isPermaLink="true">${url}</guid>`,
      `      <description>${escapeXml(a.excerpt)}</description>`,
      `      <pubDate>${new Date(a.date).toUTCString()}</pubDate>`,
      a.category ? `      <category>${escapeXml(a.category.title)}</category>` : "",
      `    </item>`,
    );
  }

  channel.push(`  </channel>`, `</rss>`);

  return new Response(channel.filter(Boolean).join("\n"), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
