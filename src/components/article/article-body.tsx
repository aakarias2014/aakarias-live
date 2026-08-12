import { cn } from "@/lib/utils";
import type { Article, ArticleBlock, ArticleSection } from "@/lib/content/types";
import { McqList } from "@/components/article/mcq-list";
import { FaqList } from "@/components/article/faq-list";
import { SourcesList } from "@/components/article/sources-list";
import { ArticleAdRotator } from "@/components/article/article-ad-rotator";
import type { AdConfig } from "@/data/ads";
import { Download, FileText, Tag as TagIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

/**
 * Renders the full article body: structured sections (Why In News,
 * Background, Key Highlights, …) + inline blocks.
 */
export function ArticleBody({ article, ads }: { article: Article; ads?: AdConfig[] }) {
  return (
    <div className="prose-aakar space-y-6">
      {(article.sections || []).map((section, idx) => (
        <ArticleSectionBlock key={section.id || `sec-${idx}`} section={section} />
      ))}

      {article.body && article.body.length > 0 && (
        <div className="space-y-4 my-6">
          {article.body.map((block, i) => (
            <BlockRenderer key={`body-blk-${i}`} block={block} />
          ))}
        </div>
      )}

      {/* Next Related Article Link (और पढ़ें) */}
      {article.nextArticle && (
        <div className="my-8 rounded-xl border border-dashed border-primary/30 bg-primary/5 p-4 transition-all hover:bg-primary/10">
          <p className="m-0 text-sm sm:text-base leading-relaxed">
            <span className="font-extrabold text-primary mr-2">
              {article.locale === "hi" ? "और पढ़ें:" : "Read More:"}
            </span>
            <Link
              href={article.nextArticle.href}
              className="font-bold text-foreground hover:text-primary transition-colors hover:underline"
            >
              {article.nextArticle.title}
            </Link>
          </p>
        </div>
      )}

      {/* Inline promotional ad — mobile only (desktop sidebar shows the ad card) */}
      <div className="mt-10 lg:hidden">
        <ArticleAdRotator locale={article.locale} ads={ads} className="max-w-sm mx-auto" />
      </div>

      {article.mcqs && article.mcqs.length > 0 && (
        <div className="mt-12">
          <McqList mcqs={article.mcqs} articleSlug={article.slug} locale={article.locale} />
        </div>
      )}

      {article.faqs && article.faqs.length > 0 && (
        <div className="mt-12">
          <FaqList faqs={article.faqs} locale={article.locale} />
        </div>
      )}

      {article.tags && article.tags.length > 0 && (
        <div className="mt-8 flex flex-wrap items-center gap-2 text-sm">
          <span className="flex items-center gap-1.5 font-semibold text-muted-foreground">
            <TagIcon className="h-4 w-4 shrink-0" />
            {article.locale === "hi" ? "टैग:" : "Tags:"}
          </span>
          <div className="flex flex-wrap gap-2">
            {(article.tags || []).map((tag) => {
              const tagHref = article.locale === "hi" ? `/tag/${tag.slug}` : `/en/tag/${tag.slug}`;
              return (
                <Link
                  key={tag.id}
                  href={tagHref}
                  className="rounded-lg bg-primary/5 px-2.5 py-1 text-xs font-semibold text-primary border border-primary/10 hover:bg-primary/10 transition-all duration-200"
                >
                  {tag.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {(article.type === "currentAffairs" || (article.sources && article.sources.length > 0)) && (
        <div className="mt-8">
          <SourcesList
            sources={article.sources || []}
            locale={article.locale}
            isCa={article.type === "currentAffairs"}
          />
        </div>
      )}

      {/* Mobile PDF Download Card — hidden on desktop (sidebar handles desktop) */}
      <div className="mt-10 lg:hidden">
        <div className="flex items-center justify-between gap-4 rounded-2xl bg-foreground p-4 text-background shadow-soft-lg">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <h4 className="text-sm font-bold">
                {article.locale === "hi" ? "इस लेख का PDF डाउनलोड करें" : "Download Article PDF"}
              </h4>
              <p className="text-[11px] opacity-60">
                {article.locale === "hi" ? "UPSC विशेष नोट्स" : "UPSC Special Notes"}
              </p>
            </div>
          </div>
          <Link
            href={article.locale === "hi" ? "/monthly-pdf" : "/en/monthly-pdf"}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-foreground transition-transform active:scale-90"
            aria-label="Download PDF"
          >
            <Download className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ─── Internal: Section block ───────────────────────────────────────── */

function ArticleSectionBlock({ section }: { section: ArticleSection }) {
  const sectionLabel = sectionLabels[section.kind];
  const Icon = sectionLabel?.icon;

  return (
    <section
      id={section.id}
      className="article-section scroll-mt-24"
    >
      {/* Section header with gradient accent line */}
      <div className="mb-8 flex items-center gap-3 pb-3 relative">
        {Icon && (
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <Icon className="h-[18px] w-[18px] text-primary" />
          </span>
        )}
        <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl m-0">
          {section.title}
        </h2>
        {/* Gradient underline */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary/40 via-primary/15 to-transparent" />
      </div>

      <div className="space-y-4">
        {(section.blocks || []).map((block, i) => (
          <BlockRenderer key={`${section.kind}-block-${i}`} block={block} />
        ))}
      </div>
    </section>
  );
}

/* ─── Internal: Block renderer ──────────────────────────────────────── */

/**
 * Parse markdown links [text](url) inside a text fragment.
 * Returns an array of ReactNode (plain strings + Link elements).
 */
function renderLinks(text: string, keyOffset: number): React.ReactNode[] {
  if (!text.includes("[")) return [text];

  const result: React.ReactNode[] = [];
  const linkRegex = /\[([^\]]*)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let key = keyOffset;
  let match: RegExpExecArray | null;

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      result.push(text.slice(lastIndex, match.index));
    }
    const linkText = match[1].replace(/\*\*/g, "");
    const linkUrl = match[2];
    result.push(
      <Link
        key={`lnk-${key++}`}
        href={linkUrl}
        className="text-primary font-extrabold underline decoration-primary/60 underline-offset-4 hover:decoration-primary hover:text-primary/80 transition-colors cursor-pointer"
      >
        {linkText}
      </Link>,
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    result.push(text.slice(lastIndex));
  }

  return result;
}

/**
 * Render markdown-formatted text supporting **bold** and [links](url),
 * including links nested inside bold blocks.
 */
function renderFormattedText(text: string) {
  if (!text) return "";
  if (!text.includes("**") && !text.includes("[")) return text;

  // If no bold markers, just parse links
  if (!text.includes("**")) {
    return renderLinks(text, 0);
  }

  const elements: React.ReactNode[] = [];
  let key = 0;

  // Split by bold markers — captures the **…** groups
  const parts = text.split(/(\*\*[\s\S]*?\*\*)/g);

  for (const part of parts) {
    if (!part) continue;

    if (part.startsWith("**") && part.endsWith("**")) {
      const inner = part.slice(2, -2);
      // Recursively process links inside the bold block
      elements.push(
        <strong key={`b-${key}`} className="font-bold text-foreground">
          {inner.includes("[") ? renderLinks(inner, key * 100) : inner}
        </strong>,
      );
    } else {
      // Non-bold segment — parse links
      if (part.includes("[")) {
        const linkNodes = renderLinks(part, key * 100);
        for (const node of linkNodes) {
          elements.push(node);
        }
      } else {
        elements.push(part);
      }
    }
    key++;
  }

  return elements;
}

function BlockRenderer({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "paragraph": {
      const text = block.text.trim();
      const firstTwo = text.slice(0, 2);
      const isCallout = ["⚡", "💡", "⚠️", "📌", "🔥"].some((symbol) => text.startsWith(symbol));

      if (isCallout) {
        const isWarning = text.startsWith("⚠️");
        const isTip = text.startsWith("💡") || text.startsWith("⚡");

        return (
          <div
            className={cn(
              "my-6 rounded-2xl p-4 sm:p-5 border transition-all shadow-soft-xs",
              isWarning
                ? "bg-amber-500/10 border-amber-500/30 text-amber-950 dark:text-amber-100"
                : isTip
                ? "bg-primary/5 border-primary/20 text-foreground"
                : "bg-muted/40 border-border text-foreground"
            )}
          >
            <div className="flex gap-3 items-start">
              <span className="text-xl shrink-0 mt-0.5 select-none">{firstTwo}</span>
              <div className="text-sm sm:text-base leading-relaxed font-medium text-foreground/90">
                {renderFormattedText(text.slice(2).trim())}
              </div>
            </div>
          </div>
        );
      }

      return (
        <p className="text-foreground/85 leading-[1.85] text-base sm:text-[17px] my-3">
          {renderFormattedText(block.text)}
        </p>
      );
    }

    case "heading":
      return (
        <h3
          id={block.id}
          className="mt-8 mb-4 text-lg sm:text-xl font-extrabold tracking-tight text-foreground border-l-4 border-primary pl-3.5 py-0.5 bg-primary/5 rounded-r-lg"
        >
          {block.text}
        </h3>
      );

    case "list":
      return block.ordered ? (
        <ol className="my-5 space-y-3 pl-1 sm:pl-2">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-base sm:text-[16.5px] leading-[1.8] text-foreground/90">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary mt-0.5 shadow-sm">
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">{renderFormattedText(item)}</div>
            </li>
          ))}
        </ol>
      ) : (
        <ul className="my-5 space-y-3 pl-1 sm:pl-2">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-base sm:text-[16.5px] leading-[1.8] text-foreground/90">
              <span className="h-2 w-2 rounded-full bg-primary shrink-0 mt-2.5 shadow-sm" />
              <div className="flex-1 min-w-0">{renderFormattedText(item)}</div>
            </li>
          ))}
        </ul>
      );

    case "quote":
      return (
        <blockquote>
          {block.text}
          {block.cite && (
            <footer className="mt-1 text-sm not-italic text-muted-foreground">— {block.cite}</footer>
          )}
        </blockquote>
      );

    case "image":
      return (
        <figure className="my-8">
          <Image
            src={block.image.url}
            alt={block.image.alt}
            width={block.image.width ?? 800}
            height={block.image.height ?? 450}
            className="w-full h-auto rounded-xl"
            sizes="(max-width: 768px) 100vw, 800px"
          />
          {(block.image.caption || block.image.credit) && (
            <figcaption className="mt-2 text-center text-sm text-muted-foreground">
              {block.image.caption}
              {block.image.credit && (
                <span className="ml-1">Credit: {block.image.credit}</span>
              )}
            </figcaption>
          )}
        </figure>
      );

    case "table":
      return (
        <div className="my-8 overflow-hidden rounded-2xl border border-primary/20 bg-background shadow-soft-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              {block.table.caption && (
                <caption className="bg-primary/5 px-5 py-3 text-left text-sm font-bold text-primary border-b border-primary/15 tracking-wide">
                  {block.table.caption}
                </caption>
              )}
              <thead>
                <tr className="border-b border-primary/20 bg-primary/10">
                  {block.table.headers.map((h, i) => (
                    <th key={i} className={`px-4 py-3 font-bold text-foreground tracking-wide text-xs uppercase ${i < 2 ? "whitespace-nowrap" : ""}`}>
                      {renderFormattedText(h)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {block.table.rows.map((row, ri) => (
                  <tr key={ri} className="transition-colors hover:bg-primary/5 odd:bg-background even:bg-muted/20">
                    {row.map((cell, ci) => (
                      <td key={ci} className={`px-4 py-3 text-foreground/90 font-medium ${ci < 2 ? "whitespace-nowrap text-center" : ""}`}>
                        {renderFormattedText(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );

    case "timeline":
      return (
        <div className="my-8 relative border-l-2 border-primary/30 pl-6 space-y-6">
          {block.items.map((item, i) => (
            <div key={i} className="relative">
              <div className="absolute -left-[31px] top-1 h-3 w-3 rounded-full border-2 border-primary bg-background" />
              <div className="text-xs font-bold uppercase tracking-wide text-primary">{item.date}</div>
              <div className="mt-1 font-semibold text-foreground">{item.title}</div>
              {item.description && (
                <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
              )}
            </div>
          ))}
        </div>
      );

    case "facts":
      return (
        <div className="my-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
          {block.items.map((fact, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-background p-4 sm:p-5 shadow-soft-xs transition-all duration-300 hover:border-primary/40 hover:shadow-soft-md"
            >
              <div className="flex items-center justify-between gap-2 border-b border-primary/15 pb-2 mb-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-primary">
                  {renderFormattedText(fact.label)}
                </span>
                <span className="h-2 w-2 rounded-full bg-primary/60 group-hover:scale-125 transition-transform" />
              </div>
              <div className="text-sm sm:text-base font-bold text-foreground leading-relaxed">
                {renderFormattedText(fact.value)}
              </div>
            </div>
          ))}
        </div>
      );

    default:
      return null;
  }
}

/* ─── Section icon mapping ───────────────────────────────────────────── */

import {
  Newspaper,
  History,
  Star,
  ShieldCheck,
  Building2,
  Globe,
  BookOpen,
  PenTool,
  Lightbulb,
  Clock,
  HelpCircle,
} from "lucide-react";
import type { ArticleSectionKind } from "@/lib/content/types";
import type { LucideIcon } from "lucide-react";

type SectionMeta = { label: string; icon: LucideIcon };

const sectionLabels: Record<ArticleSectionKind, SectionMeta> = {
  whyInNews: { label: "Why In News", icon: Newspaper },
  background: { label: "Background", icon: History },
  keyHighlights: { label: "Key Highlights", icon: Star },
  keyAspects: { label: "Key Aspects", icon: Star },
  quickFacts: { label: "Quick Facts", icon: Lightbulb },
  importance: { label: "Importance", icon: ShieldCheck },
  governmentInitiatives: { label: "Government Initiatives", icon: Building2 },
  internationalPerspective: { label: "International Perspective", icon: Globe },
  prelimsPoint: { label: "Prelims Point", icon: BookOpen },
  mainsPoint: { label: "Mains Point", icon: PenTool },
  factsAtAGlance: { label: "Facts At A Glance", icon: Lightbulb },
  timeline: { label: "Timeline", icon: Clock },
  practiceQuestions: { label: "Practice Questions", icon: HelpCircle },
};
