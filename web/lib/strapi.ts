import type { Post, StrapiList } from "./types";

const STRAPI_URL = process.env.STRAPI_URL ?? "http://localhost:1337";
const TOKEN = process.env.STRAPI_API_TOKEN;

type QueryValue = string | number | boolean;
type Query = Record<string, QueryValue>;
type FetchOpts = { query?: Query; revalidate?: number; tags?: string[] };

export async function strapiFetch<T>(path: string, opts: FetchOpts = {}): Promise<T> {
  const url = new URL(`/api/${path}`, STRAPI_URL);
  for (const [key, value] of Object.entries(opts.query ?? {})) {
    url.searchParams.set(key, String(value));
  }

  const headers: Record<string, string> = { Accept: "application/json" };
  if (TOKEN) headers.Authorization = `Bearer ${TOKEN}`;

  const res = await fetch(url, {
    headers,
    next: { revalidate: opts.revalidate ?? 300, tags: opts.tags },
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Strapi ${res.status} ${res.statusText} on /api/${path} — ${body.slice(0, 300)}`);
  }
  return res.json() as Promise<T>;
}

/** Deep-populate map for a single fully-rendered post. */
const POST_DETAIL_POPULATE: Query = {
  "populate[coverImage][fields][0]": "url",
  "populate[coverImage][fields][1]": "width",
  "populate[coverImage][fields][2]": "height",
  "populate[coverImage][fields][3]": "alternativeText",
  "populate[author][populate][avatar][fields][0]": "url",
  "populate[category][fields][0]": "name",
  "populate[category][fields][1]": "slug",
  "populate[tags][fields][0]": "name",
  "populate[seo][populate][ogImage][fields][0]": "url",
  "populate[keyPoints]": "true",
  "populate[faq]": "true",
  "populate[sources]": "true",
};

/** Lightweight populate for cards on the index page. */
const POST_CARD_POPULATE: Query = {
  "populate[coverImage][fields][0]": "url",
  "populate[coverImage][fields][1]": "width",
  "populate[coverImage][fields][2]": "height",
  "populate[author][fields][0]": "name",
  "populate[author][fields][1]": "slug",
  "populate[category][fields][0]": "name",
  "populate[category][fields][1]": "slug",
};

export function getPosts({ page = 1, pageSize = 12 } = {}) {
  return strapiFetch<StrapiList<Post>>("posts", {
    query: {
      sort: "publishedAt:desc",
      "pagination[page]": page,
      "pagination[pageSize]": pageSize,
      ...POST_CARD_POPULATE,
    },
    tags: ["posts"],
  });
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const { data } = await strapiFetch<StrapiList<Post>>("posts", {
    query: { "filters[slug][$eq]": slug, ...POST_DETAIL_POPULATE },
    tags: ["posts", `post:${slug}`],
  });
  return data[0] ?? null;
}

export async function getAllPostSlugs(): Promise<string[]> {
  const { data } = await strapiFetch<StrapiList<{ slug: string }>>("posts", {
    query: { "fields[0]": "slug", "pagination[pageSize]": 200 },
    revalidate: 3600,
    tags: ["posts"],
  });
  return data.map((p) => p.slug).filter(Boolean);
}
