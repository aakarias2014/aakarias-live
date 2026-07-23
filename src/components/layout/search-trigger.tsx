"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { SearchDialog } from "@/components/search/search-dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Search trigger — a Perplexity-inspired pill button that opens the command
 * palette. Listens for ⌘K / Ctrl+K globally.
 */
export function SearchTrigger({ className, iconOnly = false }: { className?: string; iconOnly?: boolean }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <Button
        variant="outline"
        role="combobox"
        aria-expanded={open}
        aria-label="Search articles"
        onClick={() => setOpen(true)}
        className={cn(
          "h-9 w-full justify-start gap-2 bg-muted/40 text-sm font-normal text-muted-foreground sm:w-56 lg:w-72",
          iconOnly && "w-9 px-0 justify-center sm:w-9",
          className,
        )}
      >
        <Search className="h-4 w-4 shrink-0" />
        {!iconOnly && (
          <span className="flex-1 truncate text-left hidden sm:inline-block">Search current affairs…</span>
        )}
        {!iconOnly && (
          <kbd className="hidden shrink-0 rounded border border-border bg-background px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground sm:inline-block">
            ⌘K
          </kbd>
        )}
      </Button>
      <SearchDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
