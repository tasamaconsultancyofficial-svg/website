export type StrapiMedia = {
  url: string;
  width?: number;
  height?: number;
  alternativeText?: string | null;
};

export type StrapiList<T> = {
  data: T[];
  meta: {
    pagination?: { page: number; pageSize: number; pageCount: number; total: number };
  };
};

export type Author = {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  jobTitle?: string | null;
  bio?: string | null;
  credentials?: string | null;
  avatar?: StrapiMedia | null;
  linkedinURL?: string | null;
  twitterURL?: string | null;
  websiteURL?: string | null;
  knowsAbout?: string[] | null;
};

export type Seo = {
  metaTitle: string;
  metaDescription: string;
  canonicalURL?: string | null;
  keywords?: string | null;
  metaRobots?: string | null;
  structuredDataType: "BlogPosting" | "Article" | "NewsArticle";
  ogTitle?: string | null;
  ogDescription?: string | null;
  ogImage?: StrapiMedia | null;
  ogType?: string | null;
  twitterCard?: string | null;
  structuredData?: Record<string, unknown> | null;
};

export type FaqItem = { id: number; question: string; answer: string };
export type KeyPoint = { id: number; text: string };
export type Source = { id: number; label: string; url: string; publisher?: string | null };

export type Post = {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: StrapiMedia;
  coverImageAlt: string;
  tldr?: string | null;
  keyPoints?: KeyPoint[];
  faq?: FaqItem[];
  sources?: Source[];
  seo: Seo;
  author?: Author | null;
  category?: { id: number; name: string; slug: string } | null;
  tags?: { id: number; name: string }[];
  readingTimeMinutes?: number | null;
  featured?: boolean;
  datePublishedOverride?: string | null;
  dateReviewed?: string | null;
  publishedAt: string;
  updatedAt: string;
  createdAt: string;
};
