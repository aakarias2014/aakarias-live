import Link from "next/link";
import type { Category } from "@/lib/content/types";
import { cn } from "@/lib/utils";
import { localePrefix } from "@/lib/i18n/locales";

export function CategoryBadge({
  category,
  locale = "hi",
  className,
  size = "sm",
}: {
  category?: Pick<Category, "slug" | "title" | "color"> | null;
  locale?: "hi" | "en";
  className?: string;
  size?: "sm" | "md";
}) {
  if (!category) return null;
  const href = `${localePrefix(locale)}/category/${category.slug}`;
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-semibold uppercase tracking-wide text-primary transition-colors hover:text-primary/80",
        size === "sm" ? "text-[11px]" : "text-xs",
        className,
      )}
    >
      {category.color && (
        <span
          className="inline-block h-2 w-2 rounded-full"
          style={{ backgroundColor: category.color }}
          aria-hidden
        />
      )}
      {category.title}
    </Link>
  );
}
