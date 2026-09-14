import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui";
import { SITE } from "@/lib/site";

const PATH = "/privacy";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${SITE.name} collects, uses and protects personal information submitted through this website.`,
  alternates: { canonical: PATH },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <section className="bg-paper">
      <div className="wrap max-w-[46rem] section">
        <Breadcrumbs
          trail={[
            { name: "Home", path: "/" },
            { name: "Privacy Policy", path: PATH },
          ]}
        />
        <h1 className="reveal mt-8 font-display text-[clamp(32px,4.4vw,48px)] font-semibold tracking-[-0.045em] text-ink">
          Privacy Policy
        </h1>
        <p className="reveal mt-3 text-[13px] text-muted">Last updated {new Date().getFullYear()}</p>

        <div className="reveal prose prose-neutral mt-10">
          <p>
            {SITE.name} (&ldquo;Tasama&rdquo;, &ldquo;we&rdquo;) respects your privacy. This page
            explains what we collect through this website and how we use it.
          </p>
          <h2>Information we collect</h2>
          <p>
            When you submit the contact form we collect the name, email address, phone number,
            company name and message you provide, together with the service area you select. We do
            not use advertising trackers.
          </p>
          <h2>How we use it</h2>
          <ul>
            <li>To respond to your enquiry and arrange an initial discussion.</li>
            <li>To provide the advisory services you request.</li>
            <li>To meet our own legal and regulatory obligations.</li>
          </ul>
          <h2>Sharing</h2>
          <p>
            We do not sell personal data. We share it only with service providers who help us
            operate (for example email and hosting), and where required by law.
          </p>
          <h2>Retention</h2>
          <p>
            Enquiry data is kept for as long as needed to respond and, where an engagement follows,
            for the period required by professional and tax record-keeping rules.
          </p>
          <h2>Your rights</h2>
          <p>
            You may ask us to access, correct or delete the information you have given us. Contact{" "}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
          </p>
          <h2>Contact</h2>
          <p>
            {SITE.name}, {SITE.address.street}, {SITE.address.locality}, United Arab Emirates.
          </p>
        </div>
      </div>
    </section>
  );
}
