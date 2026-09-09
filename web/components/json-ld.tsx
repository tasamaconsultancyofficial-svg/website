/** Render a pre-serialised JSON-LD string (from lib/schema `graph()`). */
export function JsonLd({ json }: { json: string }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
