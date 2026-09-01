import type { NextConfig } from "next";

const languageNegotiationHeaders = [
  {
    key: "Vary",
    value: "Accept-Language, Cookie",
  },
  {
    key: "Cache-Control",
    value: "private, no-store, max-age=0",
  },
];

const nextConfig: NextConfig = {
  // Keep the delivery site's directory URL so its relative assets resolve correctly.
  skipTrailingSlashRedirect: true,
  images: {
    imageSizes: [32, 48, 64, 96, 128, 256, 384, 512],
  },
  async headers() {
    return [
      { source: "/", headers: languageNegotiationHeaders },
      { source: "/activities/:path*", headers: languageNegotiationHeaders },
      { source: "/partners/:path*", headers: languageNegotiationHeaders },
      { source: "/contact/:path*", headers: languageNegotiationHeaders },
      {
        source: "/hibakujumoku/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive",
          },
        ],
      },
      {
        source: "/kagemichi/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive",
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/hibakujumoku/",
        destination: "/hibakujumoku/index.html",
      },
      {
        source: "/kagemichi/",
        destination: "/kagemichi/index.html",
      },
    ];
  },
};

export default nextConfig;
