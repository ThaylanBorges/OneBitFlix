import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3333",
      },
      {
        protocol: "https",
        hostname: "pub-0effc836ba104bc0b83f3e1ab222ff6f.r2.dev",
      },
    ],
    dangerouslyAllowLocalIP: true,
  },
};

export default nextConfig;
