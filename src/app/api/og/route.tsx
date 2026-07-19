/**
 * Dynamic OG Image API — /api/og
 *
 * Generates branded social preview images for articles.
 * Uses Next.js ImageResponse (built on @vercel/og).
 *
 * Usage:
 *   /api/og?title=Article+Title&category=Polity&date=23+Jun+2026&lang=hi
 *
 * Cached for 1 hour by default (social crawlers re-request infrequently).
 */

import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";
export const contentType = "image/png";

const BRAND_RED = "#C8102E";
const DARK_BG = "#0B1120";
const LIGHT_BG = "#F8FAFF";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const title = searchParams.get("title") ?? "Aakar IAS Current Affairs";
  const category = searchParams.get("category") ?? "";
  const date = searchParams.get("date") ?? "";
  const lang = searchParams.get("lang") ?? "hi";
  const type = searchParams.get("type") ?? "article"; // 'article' | 'pdf' | 'editorial'

  // Truncate long titles
  const displayTitle = title.length > 80 ? `${title.slice(0, 77)}…` : title;

  const typeLabel =
    type === "pdf" ? "📄 PDF" : type === "editorial" ? "✍️ Editorial" : "📰 Current Affairs";
  const langLabel = lang === "hi" ? "हिंदी" : "English";

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          background: DARK_BG,
          fontFamily: "system-ui, -apple-system, sans-serif",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Background gradient blobs */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${BRAND_RED}33, transparent 70%)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "-80px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, #1e3a6e44, transparent 70%)",
          }}
        />

        {/* Top bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "32px 48px 0",
            position: "relative",
            zIndex: 10,
          }}
        >
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                background: BRAND_RED,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "22px",
                fontWeight: 900,
                color: "white",
              }}
            >
              A
            </div>
            <span
              style={{
                fontSize: "22px",
                fontWeight: 800,
                color: "white",
                letterSpacing: "-0.3px",
              }}
            >
              Aakar IAS
            </span>
          </div>

          {/* Type + Lang badge */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                padding: "6px 14px",
                borderRadius: "100px",
                background: `${BRAND_RED}22`,
                border: `1.5px solid ${BRAND_RED}66`,
                color: "#FF6B6B",
                fontSize: "13px",
                fontWeight: 700,
              }}
            >
              {typeLabel}
            </div>
            <div
              style={{
                padding: "6px 14px",
                borderRadius: "100px",
                background: "#ffffff11",
                border: "1.5px solid #ffffff22",
                color: "#94A3B8",
                fontSize: "13px",
                fontWeight: 600,
              }}
            >
              {langLabel}
            </div>
          </div>
        </div>

        {/* Main content */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 48px",
            position: "relative",
            zIndex: 10,
          }}
        >
          {/* Category */}
          {category && (
            <div
              style={{
                fontSize: "15px",
                fontWeight: 700,
                color: BRAND_RED,
                textTransform: "uppercase",
                letterSpacing: "1.5px",
                marginBottom: "16px",
              }}
            >
              {category}
            </div>
          )}

          {/* Title */}
          <div
            style={{
              fontSize: displayTitle.length > 50 ? "42px" : "52px",
              fontWeight: 900,
              color: "white",
              lineHeight: 1.15,
              letterSpacing: "-1px",
              maxWidth: "960px",
            }}
          >
            {displayTitle}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 48px 36px",
            position: "relative",
            zIndex: 10,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {date && (
              <span style={{ color: "#64748B", fontSize: "15px", fontWeight: 500 }}>
                📅 {date}
              </span>
            )}
          </div>
          <div
            style={{
              padding: "10px 24px",
              borderRadius: "100px",
              background: BRAND_RED,
              color: "white",
              fontSize: "15px",
              fontWeight: 700,
              letterSpacing: "0.2px",
            }}
          >
            aakarias.com
          </div>
        </div>

        {/* Red bottom accent line */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: `linear-gradient(90deg, ${BRAND_RED}, #FF6B6B, ${BRAND_RED})`,
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
      },
    },
  );
}
