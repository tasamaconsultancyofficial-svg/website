import { type NextRequest, NextResponse } from "next/server";

/**
 * Contact form endpoint.
 *
 * Right now it validates the payload and logs it server-side, then returns 200
 * so the form completes. Wire one of these in for real delivery:
 *   - Email: Resend / Postmark / nodemailer to advisory@tasamaconsultancy.com
 *   - CRM:   HubSpot / Pipedrive create-lead API
 *   - CMS:   POST to a Strapi "lead" collection type
 */

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  service?: string;
  message?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let body: ContactPayload;
  try {
    body = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();

  if (!name || !email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "A name and valid email are required." },
      { status: 422 },
    );
  }

  const lead = {
    name,
    email,
    phone: body.phone?.trim() || null,
    company: body.company?.trim() || null,
    service: body.service?.trim() || null,
    message: body.message?.trim() || null,
    receivedAt: new Date().toISOString(),
    source: "tasama-insights/contact",
  };

  // Replace this with a real delivery integration.
  console.info("[contact] new advisory enquiry", lead);

  return NextResponse.json({ ok: true });
}
