import type { NextConfig } from "next";

const strapi = new URL(process.env.STRAPI_URL ?? "http://localhost:1337");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: strapi.protocol.replace(":", "") as "http" | "https",
        hostname: strapi.hostname,
        port: strapi.port || undefined,
      },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
};

export default nextConfig;
