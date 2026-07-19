import type { ArticleListItem } from "@/lib/content/types";
import { ArticleCard } from "@/components/content/article-card";
import { Section } from "@/components/layout/section";

export function RelatedArticles({ articles }: { articles: ArticleListItem[] }) {
  if (!articles.length) return null;
  return (
    <Section title="Related Articles" className="border-t border-border">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((a) => (
          <ArticleCard key={a.id} article={a} />
        ))}
      </div>
    </Section>
  );
}
