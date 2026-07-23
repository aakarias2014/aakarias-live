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
      className={cn("group inline-flex items-center gap-2 shrink-0 min-w-0 select-none", className)}
    >
      <div className="relative h-8 w-8 sm:h-9 sm:w-9 shrink-0 overflow-hidden rounded-full shadow-soft transition-transform group-hover:scale-105 border border-border/20">
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
        <span className="flex flex-col justify-center leading-none min-w-0">
          <span className="text-base sm:text-lg font-extrabold tracking-tight text-foreground whitespace-nowrap leading-none">
            Aakar <span className="text-primary">IAS</span>
          </span>
          <span className="mt-0.5 text-[6.5px] sm:text-[8px] font-bold uppercase tracking-tight text-primary whitespace-nowrap leading-none">
            Shaping Your Dreams
          </span>
        </span>
      )}
    </Link>
  );
}
