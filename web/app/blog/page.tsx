import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPosts } from "@/lib/strapi";
import { mediaUrl, siteUrl } from "@/lib/render";
import { Eyebrow, ArrowLink } from "@/components/ui";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Advisory notes on GCC tax, finance, strategy and compliance from the Tasama Management Consultancy practice.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Tasama Insights",
    description:
      "Advisory notes on GCC tax, finance, strategy and compliance from the Tasama Management Consultancy practice.",
    url: siteUrl("/blog"),
    type: "website",
  },
};

export default async function BlogIndex() {
  const { data: posts } = await getPosts({ pageSize: 24 });

  return (
    <main className="wrap py-20 md:py-28">
      <header className="border-b border-line pb-10">
        <Eyebrow>Tasama Insights</Eyebrow>
        <h1 className="mt-6 max-w-[16ch] font-display text-[clamp(40px,5.4vw,64px)] font-semibold leading-[1.02] tracking-[-0.05em] text-ink">
          Advisory notes for regional growth.
        </h1>
        <p className="mt-5 max-w-[54ch] text-[17px] leading-[1.8] text-muted">
          Perspectives on tax, finance, strategy and compliance for GCC founders, family
          businesses and leadership teams.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="mt-16 text-muted">No notes published yet.</p>
      ) : (
        <ul className="border-t border-line">
          {posts.map((post, i) => (
            <li key={post.id}>
              <Link
                href={`/blog/${post.slug}`}
                className="group grid gap-6 border-b border-line py-10 transition-[padding,background] duration-200 hover:bg-cream/60 md:grid-cols-[1.15fr_2fr] md:gap-12 md:px-0 md:hover:px-4"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-cream">
                  {post.coverImage?.url && (
                    <Image
                      src={mediaUrl(post.coverImage.url)}
                      alt={post.coverImageAlt || post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  )}
                  <span className="absolute left-0 top-0 bg-[#050505] px-3 py-2 font-display text-[10px] font-bold tracking-[0.18em] text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="self-center">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
                    {post.category?.name && (
                      <span className="text-gold-eyebrow">{post.category.name}</span>
                    )}
                    {post.category?.name && <span aria-hidden>/</span>}
                    <time dateTime={post.publishedAt}>
                      {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                        dateStyle: "medium",
                      })}
                    </time>
                    {post.readingTimeMinutes ? <span>&middot; {post.readingTimeMinutes} min</span> : null}
                  </div>

                  <h2 className="mt-3 max-w-[24ch] font-display text-[26px] font-semibold leading-[1.15] tracking-[-0.025em] text-ink transition-colors group-hover:text-gold-deep">
                    {post.title}
                  </h2>
                  <p className="mt-3 max-w-[62ch] text-[15px] leading-[1.7] text-muted">
                    {post.excerpt}
                  </p>

                  <div className="mt-5 flex items-center gap-4">
                    <ArrowLink>Read the note</ArrowLink>
                    {post.author?.name && (
                      <span className="text-[12px] text-muted">By {post.author.name}</span>
                    )}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
