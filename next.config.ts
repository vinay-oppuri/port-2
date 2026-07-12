import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "script-src 'self' 'unsafe-inline' https://sdk.scdn.co https://static.cloudflareinsights.com;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;