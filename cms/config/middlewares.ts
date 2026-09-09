import type { Core } from "@strapi/strapi";

/**
 * Origins allowed to call this API from a browser.
 * Server-to-server calls from Next.js are not subject to CORS, but keep this
 * tight for client-side use (search, comments, preview).
 */
const allowedOrigins = (env: Core.Config.Shared.ConfigParams["env"]): string[] => {
  const fromEnv = env("CORS_ORIGINS", "");
  const base = [
    "https://insights.tasamaconsultancy.com",
    "https://tasamaconsultancy.com",
    "http://localhost:3000",
    "http://localhost:1337",
  ];
  return fromEnv ? Array.from(new Set([...base, ...fromEnv.split(",").map((s) => s.trim())])) : base;
};

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Middlewares => [
  "strapi::logger",
  "strapi::errors",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "https:"],
          "img-src": [
            "'self'",
            "data:",
            "blob:",
            "market-assets.strapi.io",
            "res.cloudinary.com",
            "cms.tasamaconsultancy.com",
          ],
          "media-src": ["'self'", "data:", "blob:", "res.cloudinary.com"],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: "strapi::cors",
    config: {
      origin: (ctx: { request: { header: { origin?: string } } }) => {
        const list = allowedOrigins(env);
        const reqOrigin = ctx.request.header.origin ?? "";
        const ok =
          list.includes(reqOrigin) ||
          /^https:\/\/[a-z0-9-]+\.vercel\.app$/.test(reqOrigin);
        return ok ? reqOrigin : list[0];
      },
      methods: ["GET", "HEAD", "OPTIONS", "POST"],
      headers: ["Content-Type", "Authorization", "Accept", "Origin"],
      keepHeaderOnError: true,
      credentials: true,
      maxAge: 86400,
    },
  },
  "strapi::poweredBy",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];

export default config;
