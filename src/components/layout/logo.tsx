import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

/**
 * Aakar IAS Logo and Wordmark component.
 * Features the custom circular logo and wordmark with tagline "Shaping Your Dreams".
 */
export function Logo({ className, withText = true }: { className?: string; withText?: boolean }) {
  return (
    <Link
      href="/"
      aria-label={siteConfig.name}
      className={cn("group inline-flex items-center gap-2.5", className)}
    >
      <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full shadow-soft transition-transform group-hover:scale-105 border border-border/20">
        <Image
          src="/images/aakar-ias-logo.png"
          alt="Aakar IAS Logo"
          fill
          sizes="36px"
          priority
          className="object-cover"
        />
      </div>
      {withText && (
        <span className="flex flex-col leading-none">
          <span className="text-lg font-extrabold tracking-tight text-foreground">
            Aakar <span className="text-primary">IAS</span>
          </span>
          <span className="mt-0.5 text-[9px] font-bold uppercase tracking-wider text-primary">
            Shaping Your Dreams
          </span>
        </span>
      )}
    </Link>
  );
}
