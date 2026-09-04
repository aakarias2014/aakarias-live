import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable Next.js dev indicator overlay badge on bottom left
  devIndicators: false,

  // Optimised standalone output for Vercel / Docker deployments.
  output: "standalone",

  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Allow images from Sanity CDN and Google User Content.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "yt3.ggpht.com",
      },
    ],
  },

  // Security headers applied to every response.
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        ],
      },
    ];
  },

  // 301 Redirects to enforce single domain version (www -> non-www) & path consolidations
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.aakarias.com",
          },
        ],
        destination: "https://aakarias.com/:path*",
        permanent: true,
      },
      // ─── Legacy WordPress PDF Uploads 301 Redirects ─────────────────
      {
        source: "/wp-content/uploads/:path*",
        destination: "/free-pdf",
        permanent: true,
      },
      // ─── Legacy Category Paths 301 Redirects ─────────────────────────
      {
        source: "/en/category/:slug*",
        destination: "/en/general-awareness",
        permanent: true,
      },
      {
        source: "/category/:slug*",
        destination: "/general-awareness",
        permanent: true,
      },
      // ─── High Intent English Mirror Landing Page 301 Redirects ───────
      {
        source: "/en/best-mppsc-coaching-in-indore",
        destination: "/best-mppsc-coaching-in-indore",
        permanent: true,
      },
      {
        source: "/en/mppsc-coaching-fees-in-indore",
        destination: "/mppsc-coaching-fees-in-indore",
        permanent: true,
      },
      {
        source: "/en/mppsc-online-coaching",
        destination: "/mppsc-online-coaching",
        permanent: true,
      },
      {
        source: "/en/mppsc-english-medium-coaching",
        destination: "/mppsc-english-medium-coaching",
        permanent: true,
      },
      {
        source: "/en/mppsc-mains-answer-writing",
        destination: "/mppsc-mains-answer-writing",
        permanent: true,
      },
      {
        source: "/en/ncert-books-for-mppsc",
        destination: "/ncert-books-for-mppsc",
        permanent: true,
      },
      {
        source: "/en/mppsc-mains-books",
        destination: "/mppsc-mains-books",
        permanent: true,
      },
      // ─── Legacy Pages & Typos 301 Redirects ──────────────────────────
      {
        source: "/index.html",
        destination: "/",
        permanent: true,
      },
      {
        source: "/en/index",
        destination: "/en",
        permanent: true,
      },
      {
        source: "/mppsc-study-materials-by-aakar-ias",
        destination: "/mppsc-notes",
        permanent: true,
      },
      {
        source: "/admissions",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/distance-learning",
        destination: "/online-courses",
        permanent: true,
      },
      {
        source: "/fee-structure-aakar-ias",
        destination: "/mppsc-coaching-fees-in-indore",
        permanent: true,
      },
      {
        source: "/one-day-exam",
        destination: "/one-day-exam/mpsi",
        permanent: true,
      },
      {
        source: "/tag",
        destination: "/",
        permanent: true,
      },
      {
        source: "/stitch",
        destination: "/",
        permanent: true,
      },
      {
        source: "/en/stitch",
        destination: "/en",
        permanent: true,
      },
      // ─── Legacy PDF Files 301 Redirects ─────────────────────────────
      {
        source: "/pdf/:path*",
        destination: "/free-pdf",
        permanent: true,
      },
      // ─── Existing Article & Notes Redirects ──────────────────────────
      {
        source: "/ramsar-sites-in-india",
        destination: "/current-affairs/ramsar-sites-in-india",
        permanent: true,
      },
      {
        source: "/ramsar-site-in-india",
        destination: "/current-affairs/ramsar-sites-in-india",
        permanent: true,
      },
      {
        source: "/current-affairs/ramsar-sites-in-india-2026",
        destination: "/current-affairs/ramsar-sites-in-india",
        permanent: true,
      },
      {
        source: "/en/current-affairs/ramsar-sites-in-india-2026",
        destination: "/current-affairs/ramsar-sites-in-india",
        permanent: true,
      },
      {
        source: "/en/current-affairs/ramsar-sites-in-india-2026-state-wise-list-101st-site-mppsc-upsc-notes",
        destination: "/current-affairs/ramsar-sites-in-india",
        permanent: true,
      },
      {
        source: "/general-awareness/ramsar-sites-in-india",
        destination: "/current-affairs/ramsar-sites-in-india",
        permanent: true,
      },
      {
        source: "/general-awareness/mppsc-mains-geography-paper-1-part-b-unit-1-notes",
        destination: "/mppsc-notes/bharat-ka-bhautik-bhugol-mppsc-mains-unit-1-notes",
        permanent: true,
      },
      {
        source: "/mppsc-notes/mppsc-mains-geography-paper-1-part-b-unit-1-notes",
        destination: "/mppsc-notes/bharat-ka-bhautik-bhugol-mppsc-mains-unit-1-notes",
        permanent: true,
      },
      {
        source: "/general-awareness/water-divides-in-india-mppsc-notes",
        destination: "/mppsc-notes/water-divides-in-india-mppsc-notes",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
