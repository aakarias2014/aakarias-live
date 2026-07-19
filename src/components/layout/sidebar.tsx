import type { Category, Tag } from "@/lib/content/types";
import { Newsletter } from "@/components/content/newsletter";
import type { Locale } from "@/lib/i18n/locales";
import { localePrefix } from "@/lib/i18n/locales";

export function Sidebar({
  categories,
  tags,
  activeCategory,
  activeTag,
  locale = "hi",
  basePath = "/current-affairs",
}: {
  categories?: Category[];
  tags?: Tag[];
  activeCategory?: string;
  activeTag?: string;
  locale?: Locale;
  /** Locale-neutral listing path the category/tag filters append to. */
  basePath?: string;
}) {
  const prefix = localePrefix(locale);

  return (
    <aside className="space-y-8 lg:sticky lg:top-20">
      {/* Categories */}
      {categories && categories.length > 0 && (
        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Categories
          </h3>
          <ul className="space-y-1">
            {categories.map((cat) => (
              <li key={cat.slug}>
                <a
                  href={`${prefix}${basePath}?category=${cat.slug}`}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                    activeCategory === cat.slug
                      ? "bg-primary/10 font-semibold text-primary"
                      : "text-foreground/80 hover:bg-muted"
                  }`}
                >
                  {cat.color && (
                    <span
                      className="inline-block h-2 w-2 rounded-full"
                      style={{ backgroundColor: cat.color }}
                    />
                  )}
                  {cat.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tags */}
      {tags && tags.length > 0 && (
        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Popular Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <a
                key={tag.slug}
                href={`${prefix}${basePath}?tag=${tag.slug}`}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  activeTag === tag.slug
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {tag.name}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Newsletter mini */}
      <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
        <Newsletter variant="footer" />
      </div>
    </aside>
  );
}
