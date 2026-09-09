import type { Post } from "@/lib/types";
import { mediaUrl, siteUrl } from "@/lib/render";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const ORG = {
  "@type": "Organization",
  "@id": `${SITE}/#organization`,
  name: "Tasama Management Consultancy",
  url: "https://tasamaconsultancy.com",
  logo: {
    "@type": "ImageObject",
    url: `${SITE}/logo-light-bg.svg`,
    width: 1044,
    height: 828,
  },
};

const WEBSITE = {
  "@type": "WebSite",
  "@id": `${SITE}/#website`,
  url: SITE,
  name: "Tasama Insights",
  publisher: { "@id": `${SITE}/#organization` },
};

export function PostJsonLd({ post }: { post: Post }) {
  const url = siteUrl(`/blog/${post.slug}`);
  const seo = post.seo;
  const datePublished = post.datePublishedOverride ?? post.publishedAt;
  const dateModified = post.dateReviewed ?? post.updatedAt;

  const article: Record<string, unknown> = {
    "@type": seo?.structuredDataType || "BlogPosting",
    "@id": `${url}#article`,
    isPartOf: { "@id": `${SITE}/#website` },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: (seo?.metaTitle || post.title).slice(0, 110),
    description: post.tldr || seo?.metaDescription || post.excerpt,
    image: [mediaUrl(post.coverImage?.url)].filter(Boolean),
    datePublished,
    dateModified,
    publisher: { "@id": `${SITE}/#organization` },
    articleSection: post.category?.name,
    keywords: seo?.keywords || undefined,
    wordCount: post.content?.trim().split(/\s+/).filter(Boolean).length,
  };

  if (post.author) {
    article.author = {
      "@type": "Person",
      "@id": `${SITE}/authors/${post.author.slug}#person`,
      name: post.author.name,
      jobTitle: post.author.jobTitle || undefined,
      description: post.author.credentials || post.author.bio || undefined,
      url: post.author.websiteURL || `${SITE}/authors/${post.author.slug}`,
      image: post.author.avatar ? mediaUrl(post.author.avatar.url) : undefined,
      knowsAbout: post.author.knowsAbout || undefined,
      sameAs: [post.author.linkedinURL, post.author.twitterURL].filter(Boolean),
      worksFor: { "@id": `${SITE}/#organization` },
    };
  }

  if (post.sources?.length) {
    article.citation = post.sources.map((s) => ({
      "@type": "CreativeWork",
      name: s.label,
      url: s.url,
      publisher: s.publisher || undefined,
    }));
  }

  const graph: Record<string, unknown>[] = [
    WEBSITE,
    ORG,
    article,
    {
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Insights", item: siteUrl("/blog") },
        { "@type": "ListItem", position: 2, name: post.title, item: url },
      ],
    },
  ];

  if (post.faq?.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: post.faq.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    });
  }

  if (seo?.structuredData && typeof seo.structuredData === "object") {
    graph.push(seo.structuredData as Record<string, unknown>);
  }

  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(
    /</g,
    "\\u003c",
  );

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
