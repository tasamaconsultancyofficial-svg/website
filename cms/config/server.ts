import type { Core } from "@strapi/strapi";

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Server => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  // Public URL Strapi uses to build absolute media / admin links.
  // In production set PUBLIC_URL=https://cms.tasamaconsultancy.com
  url: env("PUBLIC_URL", "http://localhost:1337"),
  // Trust the platform's TLS-terminating proxy / load balancer in production.
  proxy: env.bool("IS_PROXIED", false),
  app: {
    keys: env.array("APP_KEYS")!,
  },
  webhooks: {
    populateRelations: env.bool("WEBHOOKS_POPULATE_RELATIONS", true),
  },
});

export default config;
