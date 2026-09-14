import type { NextConfig } from "next";

// Must match the publicly reachable origin used by mediaUrl() in lib/render.ts,
// not the internal-only STRAPI_URL — Next's Image loader fetches these
// directly and needs a real, allowlisted public hostname.
const strapiMedia = new URL(
  process.env.NEXT_PUBLIC_STRAPI_MEDIA_URL ?? process.env.STRAPI_URL ?? "http://localhost:1337",
);

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: strapiMedia.protocol.replace(":", "") as "http" | "https",
        hostname: strapiMedia.hostname,
        port: strapiMedia.port || undefined,
      },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
};

export default nextConfig;
