import { cn } from "@/lib/utils";

/**
 * Centered max-width container. Default caps at the --content-max token (80rem).
 */
export function Container({
  children,
  className,
  size = "default",
  as: Component = "div",
}: {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide";
  as?: React.ElementType;
}) {
  const max =
    size === "narrow" ? "max-w-3xl" : size === "wide" ? "max-w-[90rem]" : "max-w-[var(--content-max)]";
  return <Component className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", max, className)}>{children}</Component>;
}
