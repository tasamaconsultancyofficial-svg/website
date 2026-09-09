import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";

/**
 * Draft preview entry point. Point Strapi's admin "Preview" URL here:
 *   https://insights.tasamaconsultancy.com/api/preview?secret=<STRAPI_PREVIEW_SECRET>&slug=<slug>
 *
 * Enabling draft mode lets you extend lib/strapi.ts to request
 * `status=draft` (with an API token that can read drafts) for signed-in editors.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug") ?? "";

  if (!process.env.STRAPI_PREVIEW_SECRET || secret !== process.env.STRAPI_PREVIEW_SECRET) {
    return new Response("Invalid preview secret", { status: 401 });
  }

  (await draftMode()).enable();
  redirect(`/blog/${slug}`);
}
