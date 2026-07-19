import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  name: string;
  href?: string;
}

export function Breadcrumb({ items, className }: { items: BreadcrumbItem[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={cn("text-sm", className)}>
      <ol className="flex flex-wrap items-center gap-1.5 text-muted-foreground">
        <li>
          <Link
            href="/"
            className="inline-flex items-center gap-1 transition-colors hover:text-foreground"
            aria-label="Home"
          >
            <Home className="h-3.5 w-3.5" />
          </Link>
        </li>
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={`${item.name}-${i}`} className="flex items-center gap-1.5">
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50" />
              {item.href && !isLast ? (
                <Link href={item.href} className="transition-colors hover:text-foreground">
                  {item.name}
                </Link>
              ) : (
                <span className={cn(isLast && "font-medium text-foreground")} aria-current="page">
                  {item.name}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  );
}
