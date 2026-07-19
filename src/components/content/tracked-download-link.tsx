"use client";

import { trackDownload, type TrackDownloadInput } from "@/actions/download";

interface TrackedDownloadLinkProps {
  input: TrackDownloadInput;
  children: React.ReactNode;
  className?: string;
  "aria-label"?: string;
}

/**
 * A wrapper around the HTML anchor tag that executes the trackDownload 
 * Server Action in a fire-and-forget manner to persist download counts 
 * in Supabase.
 */
export function TrackedDownloadLink({
  input,
  children,
  className,
  "aria-label": ariaLabel,
}: TrackedDownloadLinkProps) {
  const handleClick = () => {
    trackDownload(input).catch((err) => {
      console.warn("Failed to track download count:", err);
    });
  };

  return (
    <a
      href={input.url}
      target="_blank"
      rel="noopener noreferrer"
      download
      onClick={handleClick}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}
