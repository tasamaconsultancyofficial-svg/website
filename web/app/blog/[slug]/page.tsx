import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getAllPostSlugs, getPostBySlug } from "@/lib/strapi";
import { mediaUrl, renderMarkdown, siteUrl, estimateReadingMinutes } from "@/lib/render";
import { PostJsonLd } from "@/components/post-json-ld";
import { Eyebrow } from "@/components/ui";

export const revalidate = 300;
export const dynamicParams = true;

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return { title: "Not found", robots: { index: false, follow: false } };
  }

  const seo = post.seo;
  const canonical = seo?.canonicalURL || siteUrl(`/blog/${post.slug}`);
  const ogImage = mediaUrl(seo?.ogImage?.url ?? post.coverImage?.url);
  const robotsTokens = (seo?.metaRobots ?? "index, follow").split(",").map((t) => t.trim());

  return {
    title: seo?.metaTitle || post.title,
    description: seo?.metaDescription || post.excerpt,
    keywords: seo?.keywords ? seo.keywords.split(",").map((k) => k.trim()) : undefined,
    alternates: { canonical },
    robots: {
      index: robotsTokens.includes("index"),
      follow: robotsTokens.includes("follow"),
      "max-image-preview": "large",
      "max-snippet": -1,
    },
    authors: post.author
      ? [{ name: post.author.name, url: post.author.linkedinURL ?? undefined }]
      : undefined,
    openGraph: {
      type: "article",
      url: canonical,
      title: seo?.ogTitle || seo?.metaTitle || post.title,
      description: seo?.ogDescription || seo?.metaDescription || post.excerpt,
      publishedTime: post.datePublishedOverride ?? post.publishedAt,
      modifiedTime: post.dateReviewed ?? post.updatedAt,
      authors: post.author ? [post.author.name] : undefined,
      section: post.category?.name,
      tags: post.tags?.map((t) => t.name),
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630, alt: post.coverImageAlt }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: seo?.metaTitle || post.title,
      description: seo?.metaDescription || post.excerpt,
      images: ogImage ? [ogImage] : [],
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const html = await renderMarkdown(post.content);
  const published = post.datePublishedOverride ?? post.publishedAt;
  const readMinutes = post.readingTimeMinutes ?? estimateReadingMinutes(post.content);

  return (
    <>
      <PostJsonLd post={post} />

      <article className="wrap max-w-[46rem] py-16 md:py-24">
        <nav className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted">
          <Link href="/blog" className="text-gold-eyebrow hover:text-gold-deep">
            Insights
          </Link>
          {post.category?.name && <span> / {post.category.name}</span>}
        </nav>

        <h1 className="mt-6 font-display text-[clamp(34px,4.6vw,52px)] font-semibold leading-[1.06] tracking-[-0.045em] text-ink text-balance">
          {post.title}
        </h1>

        <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-muted">
          {post.author?.avatar?.url && (
            <Image
              src={mediaUrl(post.author.avatar.url)}
              alt={post.author.name}
              width={36}
              height={36}
              className="bg-cream object-contain"
            />
          )}
          {post.author?.name && (
            <span className="font-semibold text-ink">{post.author.name}</span>
          )}
          {post.author?.jobTitle && <span>{post.author.jobTitle}</span>}
          <span aria-hidden className="text-gold">
            &bull;
          </span>
          <time dateTime={published}>
            {new Date(published).toLocaleDateString("en-GB", { dateStyle: "long" })}
          </time>
          <span aria-hidden className="text-gold">
            &bull;
          </span>
          <span>{readMinutes} min read</span>
        </div>

        {post.coverImage?.url && (
          <div className="mt-8 border-t-2 border-gold">
            <Image
              src={mediaUrl(post.coverImage.url)}
              alt={post.coverImageAlt}
              width={post.coverImage.width ?? 1200}
              height={post.coverImage.height ?? 630}
              priority
              className="aspect-[16/9] w-full object-cover"
            />
          </div>
        )}

        {post.tldr && (
          <aside className="mt-10 border-l-2 border-gold bg-cream p-6">
            <Eyebrow>In short</Eyebrow>
            <p className="mt-2 text-[15px] leading-[1.75] text-ink-soft">{post.tldr}</p>
          </aside>
        )}

        {post.keyPoints && post.keyPoints.length > 0 && (
          <section className="mt-10">
            <h2 className="font-display text-[19px] font-semibold tracking-[-0.02em] text-ink">
              Key takeaways
            </h2>
            <ol className="mt-4 space-y-3">
              {post.keyPoints.map((k, i) => (
                <li key={k.id} className="flex gap-4 text-[15px] leading-[1.7] text-ink-soft">
                  <span className="font-display text-[12px] font-bold tracking-[0.16em] text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{k.text}</span>
                </li>
              ))}
            </ol>
          </section>
        )}

        <div
          className="prose prose-neutral mt-12 prose-headings:scroll-mt-24 prose-a:font-medium prose-a:underline-offset-2 prose-img:border-t prose-img:border-line"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {post.faq && post.faq.length > 0 && (
          <section className="mt-16 border-t border-line pt-12">
            <Eyebrow>Questions</Eyebrow>
            <h2 className="mt-4 font-display text-[26px] font-semibold tracking-[-0.03em] text-ink">
              Frequently asked
            </h2>
            <dl className="mt-8">
              {post.faq.map((f) => (
                <div key={f.id} className="border-t border-line py-6 first:border-t-0">
                  <dt className="font-display text-[16px] font-semibold text-ink">{f.question}</dt>
                  <dd className="mt-2 text-[15px] leading-[1.75] text-ink-soft">{f.answer}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        {post.sources && post.sources.length > 0 && (
          <section className="mt-14">
            <h2 className="font-display text-[18px] font-semibold tracking-[-0.02em] text-ink">
              References
            </h2>
            <ol className="mt-4 space-y-2 text-[13px] text-muted">
              {post.sources.map((s, i) => (
                <li key={s.id} className="flex gap-3">
                  <span className="font-display font-bold text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <a
                      href={s.url}
                      rel="nofollow noopener noreferrer"
                      target="_blank"
                      className="text-gold-deep underline underline-offset-2 hover:text-gold"
                    >
                      {s.label}
                    </a>
                    {s.publisher ? ` — ${s.publisher}` : null}
                  </span>
                </li>
              ))}
            </ol>
          </section>
        )}

        {post.author?.bio && (
          <section className="mt-16 border border-gold/35 bg-gradient-to-br from-[#111827] to-[#070707] p-8 text-white">
            <Eyebrow tone="light">Written by</Eyebrow>
            <p className="mt-3 font-display text-[20px] font-semibold tracking-[-0.02em]">
              {post.author.name}
            </p>
            {post.author.jobTitle && (
              <p className="text-[13px] text-white/55">{post.author.jobTitle}</p>
            )}
            <p className="mt-3 text-[14px] leading-[1.75] text-white/70">{post.author.bio}</p>
            {(post.author.linkedinURL || post.author.websiteURL) && (
              <div className="mt-4 flex gap-5 text-[12px] font-semibold uppercase tracking-[0.12em] text-gold-light">
                {post.author.linkedinURL && (
                  <a href={post.author.linkedinURL} target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                )}
                {post.author.websiteURL && (
                  <a href={post.author.websiteURL} target="_blank" rel="noopener noreferrer">
                    Website
                  </a>
                )}
              </div>
            )}
          </section>
        )}

        <div className="mt-14 border-t border-line pt-8">
          <Link href="/blog" className="text-[13px] font-bold text-ink">
            <span aria-hidden className="text-gold-eyebrow">
              &larr;
            </span>{" "}
            All insights
          </Link>
        </div>
      </article>
    </>
  );
}
