import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

/**
 * Strapi webhook target. Configure in Strapi:
 *   Settings -> Webhooks -> Create
 *   URL:    https://insights.tasamaconsultancy.com/api/revalidate
 *   Header: Authorization: Bearer <STRAPI_WEBHOOK_SECRET>
 *   Events: entry.publish, entry.update, entry.unpublish, entry.delete
 */
export async function POST(req: NextRequest) {
  const expected = `Bearer ${process.env.STRAPI_WEBHOOK_SECRET}`;
  if (!process.env.STRAPI_WEBHOOK_SECRET || req.headers.get("authorization") !== expected) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}) as Record<string, unknown>);
  const entry = (body as { entry?: { slug?: string } }).entry;
  const model = (body as { model?: string }).model;

  // Next 16: revalidateTag takes a cacheLife profile (or { expire }) as its 2nd arg.
  revalidateTag("posts", "max");
  if (entry?.slug) revalidateTag(`post:${entry.slug}`, "max");

  return NextResponse.json({
    revalidated: true,
    model: model ?? null,
    slug: entry?.slug ?? null,
    now: Date.now(),
  });
}
