import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";

/**
 * Page section with consistent vertical rhythm + optional heading.
 * Inspired by Apple's section spacing.
 */
export function Section({
  children,
  className,
  containerSize = "default",
  title,
  description,
  action,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  containerSize?: "default" | "narrow" | "wide";
  title?: string;
  description?: string;
  action?: React.ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-12 sm:py-16 lg:py-20", className)}>
      <Container size={containerSize}>
        {(title || description || action) && (
          <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:mb-10">
            <div className="max-w-2xl">
              {title && (
                <h2 className="text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  {title}
                </h2>
              )}
              {description && (
                <p className="mt-2 text-pretty text-muted-foreground">{description}</p>
              )}
            </div>
            {action && <div className="shrink-0">{action}</div>}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
