import { Link2, ChevronDown } from "lucide-react";
import type { SourceRef } from "@/lib/content/types";

const defaultSourcesEn = [
  { label: "Press Information Bureau (PIB)", url: "https://pib.gov.in" },
  { label: "Government of India Portals", url: "https://india.gov.in" },
  { label: "National Newspapers (The Hindu / Indian Express)", url: "https://www.thehindu.com" },
];

const defaultSourcesHi = [
  { label: "प्रेस सूचना ब्यूरो (PIB)", url: "https://pib.gov.in" },
  { label: "भारत सरकार आधिकारिक पोर्टल", url: "https://india.gov.in" },
  { label: "प्रमुख राष्ट्रीय समाचार पत्र (द हिंदू / इंडियन एक्सप्रेस)", url: "https://www.thehindu.com" },
];

export function SourcesList({
  sources,
  locale = "hi",
  isCa = false,
}: {
  sources?: SourceRef[];
  locale?: string;
  isCa?: boolean;
}) {
  const isHi = locale === "hi";

  let displaySources = sources || [];
  if (displaySources.length === 0 && isCa) {
    displaySources = isHi ? defaultSourcesHi : defaultSourcesEn;
  }

  if (displaySources.length === 0) return null;

  const count = displaySources.length;
  const titleText = isHi ? "लेख के स्रोत" : "Article Sources";
  const sourceSubtitle = isHi 
    ? `${count} स्रोत` 
    : `${count} source${count !== 1 ? "s" : ""}`;

  return (
    <details className="group rounded-2xl border border-border bg-card shadow-sm overflow-hidden transition-all duration-300">
      <summary className="flex cursor-pointer items-center justify-between p-5 md:p-6 list-none select-none hover:bg-muted/10 transition-colors [&::-webkit-details-marker]:hidden">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted">
            <Link2 className="h-5 w-5 text-muted-foreground" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-foreground sm:text-base">{titleText}</h4>
            <p className="text-xs text-muted-foreground">{sourceSubtitle}</p>
          </div>
        </div>
        <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-open:rotate-180" />
      </summary>
      <div className="border-t border-border bg-muted/5 p-5 md:p-6">
        <ul className="space-y-4">
          {displaySources.map((s, i) => (
            <li key={i} className="flex items-start gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-muted text-xs font-bold text-muted-foreground font-mono">
                {i + 1}
              </div>
              <div className="min-w-0 flex-1 pt-0.5">
                {s.url ? (
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-primary hover:underline break-all"
                  >
                    {s.url}
                  </a>
                ) : (
                  <span className="text-sm font-semibold text-foreground break-all">
                    {s.label}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </details>
  );
}
