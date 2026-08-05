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
    unoptimized: false,
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
        source: "/general-awareness/ramsar-sites-in-india",
        destination: "/current-affairs/ramsar-sites-in-india",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
