# Tasama Insights — blog subsystem

A headless blog for `insights.tasamaconsultancy.com`, added alongside the existing
static marketing site (which is untouched — still `index.html` + Firebase Hosting).

```
cms/   Strapi v5 headless CMS  (REST API on :1337, admin on :1337/admin)
web/   Next.js 16 App Router frontend  (:3000)  — TypeScript, Tailwind v4
```

## Run it locally

Two terminals:

```bash
# 1 — CMS
cd cms
npm run develop
#   admin:  http://localhost:1337/admin
#   login:  shashwatraghav.work@gmail.com  /  Tasama2026!   (change this)
#   first boot seeds one published post + author/category/tags and
#   grants the Public role find/findOne on post, author, category, tag

# 2 — Frontend
cd web
npm run dev
#   http://localhost:3000        -> redirects to /blog
#   http://localhost:3000/blog
#   http://localhost:3000/blog/restructuring-for-resilience
#   http://localhost:3000/sitemap.xml , /robots.txt
```

> npm 12 blocks dependency install scripts by default. The native/build deps were
> approved with `npm install-scripts approve …` (recorded in each `package.json`
> `allowScripts`). If you reinstall on another machine, re-approve
> `better-sqlite3 esbuild @swc/core fsevents` in `cms/` then `npm rebuild`.

## What each phase delivered

### Phase 1 — architecture & subdomain  *(deploy steps are manual)*
DNS records, TLS/HSTS caveat, Vercel + Strapi-host setup, and the reasoning are in
the implementation guide artifact. CORS + CSP are already coded:
`cms/config/middlewares.ts` (exact-origin allowlist + `*.vercel.app`, CSP `img-src`
for the media host) and `cms/config/server.ts` (`PUBLIC_URL`, `proxy`).

### Phase 2 — Strapi schema  (`cms/src/`)
- `components/shared/seo.json` — metaTitle, metaDescription, canonicalURL,
  metaRobots, structuredDataType (enum), OG fields, `structuredData` JSON escape hatch
- `components/content/{faq-item,key-point,source}.json` — GEO extractables
- `api/author` — Person-graph fields: jobTitle, credentials, `knowsAbout` (JSON),
  social URLs → `sameAs`
- `api/post` — title/slug/excerpt/content, `coverImage` + required `coverImageAlt`,
  `tldr`, `keyPoints[]`, `faq[]`, `sources[]`, required `seo` component,
  `dateReviewed` → `dateModified`, relations to author/category/tag
- `src/index.ts` — bootstrap: Public permissions + idempotent seed

### Phase 3 — Next.js  (`web/`)
- `lib/strapi.ts` — typed fetch wrapper with `next: { revalidate, tags }`, deep
  populate maps, `getPosts` / `getPostBySlug` / `getAllPostSlugs`
- `lib/render.ts` — `marked` + `sanitize-html`, absolute media URLs
- `app/blog/[slug]/page.tsx` — `generateStaticParams` (SSG), `generateMetadata`
  (title / description / canonical / robots / OpenGraph / Twitter from Strapi `seo`),
  Tailwind Typography `prose` body, FAQ + References sections
- `components/post-json-ld.tsx` — one `@graph`: WebSite + Organization +
  BlogPosting (Person author w/ `knowsAbout`, `sameAs`, `citation`) +
  BreadcrumbList + FAQPage, with `<` escaped
- `app/sitemap.ts`, `app/robots.ts` (allows GPTBot / PerplexityBot / ClaudeBot /
  Google-Extended …), `app/api/revalidate/route.ts` (bearer-secured tag purge),
  `app/api/preview/route.ts` (draft mode)

## Wiring the publish webhook

Strapi admin → Settings → Webhooks → Create:
- URL: `https://insights.tasamaconsultancy.com/api/revalidate`
- Header: `Authorization: Bearer <STRAPI_WEBHOOK_SECRET>` (same value in `web/.env`)
- Events: entry publish / update / unpublish / delete

## Before deploying

- `cms`: switch `DATABASE_CLIENT` to `postgres`, set `PUBLIC_URL`, `IS_PROXIED=true`,
  generate fresh secrets, move media to S3/Cloudinary (`@strapi/provider-upload-*`).
- `web`: set `NEXT_PUBLIC_SITE_URL`, `STRAPI_URL`, a read-only `STRAPI_API_TOKEN`,
  and the webhook/preview secrets in Vercel env. Add `cms.tasamaconsultancy.com`
  to `next.config.ts` `images.remotePatterns` (already keyed off `STRAPI_URL`).
- Add `insights.tasamaconsultancy.com` as its own Google Search Console property;
  submit `/sitemap.xml`.
