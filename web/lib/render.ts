import { marked } from "marked";
import sanitizeHtml from "sanitize-html";

// STRAPI_URL is the internal, server-only address used to fetch data from
// Strapi (e.g. http://127.0.0.1:1337 in production, avoiding a public round
// trip). It must never be used to build <img>/<Image> src values — those get
// embedded in HTML sent to the visitor's browser, which cannot reach an
// internal/loopback address. Use the publicly reachable media URL instead.
const STRAPI_MEDIA_URL =
  process.env.NEXT_PUBLIC_STRAPI_MEDIA_URL ??
  process.env.STRAPI_URL ??
  "http://localhost:1337";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

/** Turn a Strapi media path into an absolute, publicly-reachable URL. */
export function mediaUrl(url?: string | null): string {
  if (!url) return "";
  return url.startsWith("http") ? url : `${STRAPI_MEDIA_URL}${url}`;
}

/** Absolute site URL for a path (canonical, JSON-LD @id, OG). */
export function siteUrl(path = "/"): string {
  return new URL(path, SITE_URL).toString();
}

marked.setOptions({ gfm: true, breaks: false });

const ALLOWED_TAGS = sanitizeHtml.defaults.allowedTags.concat([
  "img",
  "h1",
  "h2",
  "figure",
  "figcaption",
  "sup",
  "sub",
]);

/** Markdown -> sanitized HTML string, safe to pass to dangerouslySetInnerHTML. */
export async function renderMarkdown(markdown: string): Promise<string> {
  const rawHtml = await marked.parse(markdown ?? "");
  return sanitizeHtml(rawHtml, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ["src", "alt", "title", "width", "height", "loading"],
      a: ["href", "name", "target", "rel"],
      code: ["class"],
      span: ["class"],
    },
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer" }, true),
      img: (tagName, attribs) => ({
        tagName,
        attribs: { ...attribs, src: mediaUrl(attribs.src), loading: "lazy" },
      }),
    },
  });
}

/** Rough reading-time fallback when the CMS value is missing. */
export function estimateReadingMinutes(markdown: string): number {
  const words = (markdown ?? "").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}
