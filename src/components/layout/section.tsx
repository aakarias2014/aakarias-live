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
    <section id={id} className={cn("py-6 sm:py-12 lg:py-16", className)}>
      <Container size={containerSize}>
        {(title || description || action) && (
          <div className="mb-4 sm:mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div className="max-w-2xl">
              {title && (
                <h2 className="text-balance text-lg sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-foreground">
                  {title}
                </h2>
              )}
              {description && (
                <p className="mt-0.5 sm:mt-1.5 text-xs sm:text-base text-muted-foreground">{description}</p>
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
