import { NextResponse, type NextRequest } from "next/server";

/**
 * Subdomain routing.
 *
 * Ledger.ae is a Tasama product, not a separate site. When the request arrives
 * on the `ledger.` subdomain (e.g. ledger.tasamaconsultancy.com), serve the
 * product page at the subdomain root by rewriting "/" -> "/ledger-ae". The page
 * also stays reachable at tasamaconsultancy.com/ledger-ae with no rewrite.
 *
 * DNS: point `ledger` (CNAME) at the same host as the main site, add the
 * hostname in your platform's domain settings, then it just works.
 */
export function middleware(req: NextRequest) {
  const host = req.headers.get("host") ?? "";
  const isLedgerHost = host.split(":")[0].startsWith("ledger.");

  if (isLedgerHost) {
    const { pathname } = req.nextUrl;
    if (pathname === "/" || pathname === "") {
      return NextResponse.rewrite(new URL("/ledger-ae", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  // Skip static assets and API routes.
  matcher: ["/((?!_next/|api/|.*\\.[\\w]+$).*)"],
};
