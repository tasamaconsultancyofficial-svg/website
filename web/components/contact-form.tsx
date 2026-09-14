"use client";

import { useState } from "react";
import { SERVICE_OPTIONS, SITE } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm({ defaultService = "" }: { defaultService?: string }) {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setStatus("submitting");
    try {
      const payload = Object.fromEntries(new FormData(form).entries());
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const label =
    "flex flex-col gap-2 text-[10px] font-bold uppercase tracking-[0.08em] text-ink";
  const field =
    "w-full border border-[#d6dfdc] bg-[#fbfcfb] px-3.5 py-3 text-[13px] font-normal normal-case tracking-normal text-ink outline-none transition-colors focus:border-[#6d9c96] focus:ring-2 focus:ring-[#6d9c96]/15";

  if (status === "success") {
    return (
      <div className="flex items-start gap-4 border border-line bg-white p-8">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#dcefe8] text-[#20765c]">
          &#10003;
        </span>
        <div>
          <strong className="font-display text-[16px] text-ink">
            Thank you — your advisory enquiry is in.
          </strong>
          <p className="mt-1 text-[13px] text-muted">
            We&rsquo;ll be in touch shortly to discuss your business. For anything urgent, call{" "}
            <a href={`tel:${SITE.phone}`} className="font-semibold text-gold-deep">
              {SITE.phoneDisplay}
            </a>
            .
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className={label}>
          Full name
          <input className={field} type="text" name="name" placeholder="Your name" required />
        </label>
        <label className={label}>
          Work email
          <input
            className={field}
            type="email"
            name="email"
            placeholder="you@company.com"
            required
          />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className={label}>
          Phone number
          <input className={field} type="tel" name="phone" placeholder="+971 50 000 0000" />
        </label>
        <label className={label}>
          Company name
          <input className={field} type="text" name="company" placeholder="Your company" />
        </label>
      </div>
      <label className={label}>
        What can we help with?
        <select className={field} name="service" defaultValue={defaultService}>
          <option value="">Select a service</option>
          {SERVICE_OPTIONS.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
      </label>
      <label className={label}>
        Anything we should know?
        <textarea
          className={`${field} min-h-[110px] resize-y`}
          name="message"
          placeholder="A sentence or two on where the business is heading."
        />
      </label>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn btn-gold w-full disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Request advisory discussion →"}
      </button>

      {status === "error" && (
        <p className="text-[12px] text-[#a8560c]">
          Something went wrong sending that. Email{" "}
          <a href="mailto:advisory@tasamaconsultancy.com" className="font-semibold underline">
            advisory@tasamaconsultancy.com
          </a>{" "}
          or call {SITE.phoneDisplay}.
        </p>
      )}
      <p className="text-center text-[9px] text-[#98a3a1]">
        By submitting, you agree to be contacted about your enquiry.
      </p>
    </form>
  );
}
