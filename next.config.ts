import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep the delivery site's directory URL so its relative assets resolve correctly.
  skipTrailingSlashRedirect: true,
  images: {
    imageSizes: [32, 48, 64, 96, 128, 256, 384, 512],
  },
  async headers() {
    return [
      {
        source: "/hibakujumoku/:path*",
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
    ];
  },
};

export default nextConfig;
