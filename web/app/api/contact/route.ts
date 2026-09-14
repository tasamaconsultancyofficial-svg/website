import { type NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { SITE } from "@/lib/site";

/**
 * Contact form endpoint. Delivers the enquiry by email (Resend) and/or
 * WhatsApp (CallMeBot) — whichever is configured. Each channel is
 * independent and best-effort: one failing doesn't block the other. If
 * neither is configured, the enquiry is only logged server-side (dev
 * fallback).
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

  const resendKey = process.env.RESEND_API_KEY;
  const callMeBotKey = process.env.CALLMEBOT_APIKEY;
  const channelsConfigured = Boolean(resendKey) || Boolean(callMeBotKey);

  if (!channelsConfigured) {
    console.warn(
      "[contact] No delivery channel configured (RESEND_API_KEY / CALLMEBOT_APIKEY) — enquiry was only logged.",
    );
    console.info("[contact] new advisory enquiry", lead);
    return NextResponse.json({ ok: true });
  }

  const [emailSent, whatsappSent] = await Promise.all([
    resendKey ? sendLeadEmail(resendKey, lead) : Promise.resolve(false),
    callMeBotKey ? sendLeadWhatsApp(callMeBotKey, lead) : Promise.resolve(false),
  ]);

  if (!emailSent && !whatsappSent) {
    console.error("[contact] All configured delivery channels failed", lead);
    return NextResponse.json({ ok: false, error: "Delivery failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

type Lead = {
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  service: string | null;
  message: string | null;
  receivedAt: string;
};

async function sendLeadEmail(apiKey: string, lead: Lead): Promise<boolean> {
  const to = process.env.CONTACT_TO_EMAIL || SITE.email;
  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || "Tasama Website <onboarding@resend.dev>",
      to,
      replyTo: lead.email,
      subject: `New advisory enquiry — ${lead.name}${lead.company ? ` (${lead.company})` : ""}`,
      text: [
        `Name: ${lead.name}`,
        `Email: ${lead.email}`,
        `Phone: ${lead.phone ?? "—"}`,
        `Company: ${lead.company ?? "—"}`,
        `Service: ${lead.service ?? "—"}`,
        `Message: ${lead.message ?? "—"}`,
        `Received: ${lead.receivedAt}`,
      ].join("\n"),
      html: renderLeadHtml(lead),
    });

    if (error) {
      console.error("[contact] Resend failed to send", error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[contact] Resend threw", err);
    return false;
  }
}

/** WhatsApp delivery via CallMeBot (callmebot.com) — free relay, best-effort. */
async function sendLeadWhatsApp(apiKey: string, lead: Lead): Promise<boolean> {
  const phone = process.env.CALLMEBOT_PHONE || "971505698473";
  const text = [
    "*New advisory enquiry*",
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    `Phone: ${lead.phone ?? "—"}`,
    `Company: ${lead.company ?? "—"}`,
    `Service: ${lead.service ?? "—"}`,
    lead.message ? `Message: ${lead.message}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const url = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(phone)}&text=${encodeURIComponent(text)}&apikey=${encodeURIComponent(apiKey)}`;

  try {
    const res = await fetch(url);
    const body = await res.text();
    if (!res.ok || /error/i.test(body)) {
      console.error("[contact] CallMeBot failed to send", res.status, body);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[contact] CallMeBot threw", err);
    return false;
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderLeadHtml(lead: Lead): string {
  const row = (label: string, value: string | null) =>
    `<tr><td style="padding:4px 12px 4px 0;color:#6f7378;font-size:12px;white-space:nowrap;">${label}</td><td style="padding:4px 0;color:#151515;font-size:14px;">${value ? escapeHtml(value) : "—"}</td></tr>`;

  return `<div style="font-family:sans-serif;max-width:480px;">
    <h2 style="font-size:16px;margin:0 0 12px;">New advisory enquiry</h2>
    <table>
      ${row("Name", lead.name)}
      ${row("Email", lead.email)}
      ${row("Phone", lead.phone)}
      ${row("Company", lead.company)}
      ${row("Service", lead.service)}
      ${row("Received", lead.receivedAt)}
    </table>
    <p style="margin-top:16px;font-size:14px;color:#151515;white-space:pre-wrap;">${
      lead.message ? escapeHtml(lead.message) : "No message provided."
    }</p>
  </div>`;
}
