"use client";

import dynamic from "next/dynamic";

const InquiryPopup = dynamic(
  () => import("@/components/layout/inquiry-popup").then((m) => m.InquiryPopup),
  { ssr: false }
);

const ScrollInquiryModalWrapper = dynamic(
  () => import("@/components/layout/scroll-inquiry-modal-wrapper").then((m) => m.ScrollInquiryModalWrapper),
  { ssr: false }
);

const WhatsAppTracker = dynamic(
  () => import("@/components/layout/whatsapp-tracker").then((m) => m.WhatsAppTracker),
  { ssr: false }
);

/**
 * Client-side lazy overlays wrapper.
 * Defers loading of heavy popups and trackers to prevent main-thread hydration blocking.
 */
export function ClientOverlays() {
  return (
    <>
      <WhatsAppTracker />
      <InquiryPopup />
      <ScrollInquiryModalWrapper />
    </>
  );
}
