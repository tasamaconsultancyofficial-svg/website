import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui";
import { SITE } from "@/lib/site";

const PATH = "/terms";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms on which ${SITE.name} makes this website and its content available.`,
  alternates: { canonical: PATH },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <section className="bg-paper">
      <div className="wrap max-w-[46rem] section">
        <Breadcrumbs
          trail={[
            { name: "Home", path: "/" },
            { name: "Terms of Service", path: PATH },
          ]}
        />
        <h1 className="mt-8 font-display text-[clamp(32px,4.4vw,48px)] font-semibold tracking-[-0.045em] text-ink">
          Terms of Service
        </h1>
        <p className="mt-3 text-[13px] text-muted">Last updated {new Date().getFullYear()}</p>

        <div className="prose prose-neutral mt-10">
          <h2>Use of this website</h2>
          <p>
            This website is provided by {SITE.name} for general information. You may view and share
            its content for your own reference. You may not republish it as your own or use it in a
            way that misrepresents Tasama.
          </p>
          <h2>No advice by publication</h2>
          <p>
            Articles, service descriptions and answers on this site are general in nature and do not
            constitute tax, legal, accounting or investment advice. Rules change and depend on your
            specific facts. Engage Tasama for advice you can rely on.
          </p>
          <h2>Enquiries</h2>
          <p>
            Submitting the contact form does not create a client relationship. An engagement begins
            only when a written scope of work is agreed in writing by both parties.
          </p>
          <h2>Liability</h2>
          <p>
            To the extent permitted by law, Tasama is not liable for loss arising from reliance on
            website content in the absence of a signed engagement.
          </p>
          <h2>Governing law</h2>
          <p>These terms are governed by the laws of the United Arab Emirates.</p>
          <h2>Contact</h2>
          <p>
            Questions about these terms: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
          </p>
        </div>
      </div>
    </section>
  );
}
