import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Pagination({
  currentPage,
  totalPages,
  basePath,
  searchParams = {},
}: {
  currentPage: number;
  totalPages: number;
  basePath: string;
  searchParams?: Record<string, string | undefined>;
}) {
  if (totalPages <= 1) return null;

  function hrefForPage(page: number): string {
    const sp = new URLSearchParams();
    for (const [k, v] of Object.entries(searchParams)) {
      if (v) sp.set(k, v);
    }
    if (page > 1) sp.set("page", String(page));
    const qs = sp.toString();
    return `${basePath}${qs ? `?${qs}` : ""}`;
  }

  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <nav aria-label="Pagination" className="mt-10 flex items-center justify-center gap-1">
      <Button variant="ghost" size="icon" asChild disabled={currentPage <= 1}>
        <Link href={hrefForPage(currentPage - 1)} aria-label="Previous page">
          <ChevronLeft className="h-4 w-4" />
        </Link>
      </Button>

      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`ellipsis-${i}`} className="px-2 text-muted-foreground">
            …
          </span>
        ) : (
          <Button
            key={p}
            variant={p === currentPage ? "default" : "ghost"}
            size="sm"
            asChild
            className={cn("h-9 w-9", p === currentPage && "pointer-events-none")}
          >
            <Link href={hrefForPage(p as number)} aria-label={`Page ${p}`}>
              {p}
            </Link>
          </Button>
        ),
      )}

      <Button variant="ghost" size="icon" asChild disabled={currentPage >= totalPages}>
        <Link href={hrefForPage(currentPage + 1)} aria-label="Next page">
          <ChevronRight className="h-4 w-4" />
        </Link>
      </Button>
    </nav>
  );
}

/** Generate a windowed range of page numbers with ellipsis. */
function getPageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: (number | "...")[] = [1];

  if (current > 3) pages.push("...");

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) pages.push(i);

  if (current < total - 2) pages.push("...");

  if (total > 1) pages.push(total);

  return pages;
}
