import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  name: string;
  href?: string;
}

export function Breadcrumb({
  items,
  className,
  variant = "default",
}: {
  items: BreadcrumbItem[];
  className?: string;
  variant?: "default" | "light";
}) {
  const isLight = variant === "light";
  return (
    <nav aria-label="Breadcrumb" className={cn("text-sm", className)}>
      <ol className={cn("flex flex-wrap items-center gap-1.5", isLight ? "text-white/70" : "text-muted-foreground")}>
        <li>
          <Link
            href="/"
            className={cn("inline-flex items-center gap-1 transition-colors", isLight ? "hover:text-white text-white/80" : "hover:text-foreground")}
            aria-label="Home"
          >
            <Home className="h-3.5 w-3.5" />
          </Link>
        </li>
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={`${item.name}-${i}`} className="flex items-center gap-1.5">
              <ChevronRight className={cn("h-3.5 w-3.5", isLight ? "text-white/40" : "text-muted-foreground/50")} />
              {item.href && !isLast ? (
                <Link href={item.href} className={cn("transition-colors", isLight ? "hover:text-white text-white/80" : "hover:text-foreground")}>
                  {item.name}
                </Link>
              ) : (
                <span className={cn(isLast && (isLight ? "font-semibold text-white" : "font-medium text-foreground"))} aria-current="page">
                  {item.name}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
