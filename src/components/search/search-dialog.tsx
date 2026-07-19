"use client";

import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Search, Loader2, TrendingUp, ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { searchArticles } from "@/actions/search";
import { useLanguage } from "@/components/providers/language-provider";
import type { SearchHit } from "@/lib/search/algolia";
import { cn } from "@/lib/utils";

/** Static trending topics shown when the dialog opens with an empty query. */
const TRENDING_TERMS = [
  "UPSC Current Affairs",
  "MPPSC Syllabus",
  "Economy 2026",
  "Climate Change",
  "Digital India",
];

export function SearchDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const { locale } = useLanguage();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchHit[]>([]);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [loading, isPending] = useTransition();

  // Keep the latest query in a ref so the debounced timer reads fresh value
  // without re-subscribing on every keystroke.
  const queryRef = useRef(query);
  useEffect(() => {
    queryRef.current = query;
  }, [query]);

  // Debounced search via Sanity. Runs whenever the query text changes.
  const runSearch = useCallback(
    async (term: string) => {
      if (!term.trim()) {
        setResults([]);
        return;
      }
      isPending(async () => {
        try {
          const hits = await searchArticles(term, locale, 6);
          setResults(hits);
          setActiveIdx(-1);
        } catch (err) {
          console.error("Search failed:", err);
          setResults([]);
        }
      });
    },
    [locale],
  );

  useEffect(() => {
    const timer = setTimeout(() => runSearch(queryRef.current), 250);
    return () => clearTimeout(timer);
  }, [query, runSearch]);

  // Reset state when the dialog closes.
  useEffect(() => {
    if (!open) return;
    const reset = () => {
      setQuery("");
      setResults([]);
      setActiveIdx(-1);
    };
    reset();
  }, [open]);

  const navigateTo = useCallback(
    (href: string) => {
      onOpenChange(false);
      router.push(href);
    },
    [onOpenChange, router],
  );

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, -1));
    } else if (e.key === "Enter" && activeIdx >= 0 && results[activeIdx]) {
      e.preventDefault();
      navigateTo(results[activeIdx].href);
    }
  }

  const hasResults = results.length > 0;
  const hasQuery = query.trim().length > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-w-2xl flex-col gap-0 overflow-hidden p-0 sm:rounded-2xl">
        <DialogHeader className="sr-only">
          <DialogTitle>Search</DialogTitle>
        </DialogHeader>

        {/* Search input */}
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search current affairs, editorials, topics…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="border-0 bg-transparent p-0 text-base shadow-none focus-visible:ring-0"
            autoFocus
          />
          {loading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
        </div>

        {/* Results body */}
        <div className="max-h-[60vh] overflow-y-auto p-2 scrollbar-thin">
          {hasQuery && !hasResults && !loading && (
            <div className="px-4 py-10 text-center text-sm text-muted-foreground">
              No results found for &ldquo;{query}&rdquo;. Try a different term.
            </div>
          )}

          {hasResults && (
            <ul role="listbox" className="space-y-1 px-2">
              {results.map((hit, i) => (
                <li key={hit.id} role="option" aria-selected={i === activeIdx}>
                  <button
                    onClick={() => navigateTo(hit.href)}
                    onMouseEnter={() => setActiveIdx(i)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors",
                      i === activeIdx ? "bg-primary/10 text-foreground" : "text-foreground hover:bg-muted",
                    )}
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted text-sm font-bold text-primary">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <div className="flex-1 overflow-hidden">
                      <p className="truncate text-sm font-semibold">{hit.title}</p>
                      {hit.excerpt && (
                        <p className="truncate text-xs text-muted-foreground">{hit.excerpt}</p>
                      )}
                      {hit.category && (
                        <span className="mt-0.5 inline-block rounded bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                          {hit.category}
                        </span>
                      )}
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                  </button>
                </li>
              ))}
            </ul>
          )}

          {!hasQuery && !loading && (
            <div className="px-4 py-4">
              <p className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <TrendingUp className="h-3.5 w-3.5" />
                Trending
              </p>
              <div className="flex flex-wrap gap-2">
                {TRENDING_TERMS.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="rounded-full border border-border bg-muted/50 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer hint */}
        <div className="flex items-center justify-between border-t border-border px-4 py-2.5 text-xs text-muted-foreground">
          <span>
            <kbd className="rounded border border-border bg-muted px-1.5 py-0.5">↑↓</kbd> Navigate
            <kbd className="ml-2 rounded border border-border bg-muted px-1.5 py-0.5">↵</kbd> Open
            <kbd className="ml-2 rounded border border-border bg-muted px-1.5 py-0.5">Esc</kbd> Close
          </span>
          <span>Powered by Sanity</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
