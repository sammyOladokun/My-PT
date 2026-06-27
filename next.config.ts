import type { NextConfig } from "next";

const manifestHeaders = [
  {
    key: "Access-Control-Allow-Origin",
    value: "*",
  },
];
 
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      {
        protocol: "https",
        hostname: "**.ufs.sh",
      },
    ],
  },
  allowedDevOrigins: [
    "127.0.0.1",
    "10.211.154.17",
  ],
  async headers() {
    return [{ source: "/site.webmanifest", headers: manifestHeaders }];
  },
};

export default nextConfig;
