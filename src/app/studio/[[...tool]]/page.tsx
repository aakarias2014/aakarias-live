import { NextStudio } from "next-sanity/studio";
import { sanityStudioConfig } from "../../../../sanity/studio.config";

export const dynamic = "force-static";

/**
 * Embedded Sanity Studio at /studio.
 * Gated by NEXT_PUBLIC_ENABLE_STUDIO flag.
 */
export default function StudioPage() {
  return <NextStudio config={sanityStudioConfig} />;
}
