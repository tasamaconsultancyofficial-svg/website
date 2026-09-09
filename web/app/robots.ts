import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/render";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/", "/preview"] },
      // Explicitly welcome generative-engine crawlers.
      {
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "PerplexityBot",
          "ClaudeBot",
          "Claude-Web",
          "Google-Extended",
          "Applebot-Extended",
        ],
        allow: "/",
      },
    ],
    sitemap: siteUrl("/sitemap.xml"),
    host: siteUrl("/").replace(/\/$/, ""),
  };
}
