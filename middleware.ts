import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const url = request.nextUrl;
    const hostname = request.headers.get("host") || "";

    // Skip if path already starts with /daas or /corporate (direct access)
    if (url.pathname.startsWith("/daas") || url.pathname.startsWith("/corporate")) {
        return NextResponse.next();
    }

    // Skip public files and APIs
    if (url.pathname.startsWith("/_next") || url.pathname.startsWith("/static") || url.pathname.includes(".")) {
        return NextResponse.next();
    }

    // Check if it's a DaaS subdomain
    // Supports: daas.ekwip.ma, daas.localhost, daas.localhost:3000
    const isDaasDomain = 
      hostname.startsWith("daas.") || 
      hostname === "daas.localhost:3000" || 
      hostname === "daas.localhost" ||
      hostname === "daas.ekwip.ma";

    if (isDaasDomain) {
        // Rewrite daas.ekwip.ma/* to /daas/*
        const path = url.pathname === "/" ? "" : url.pathname;
        return NextResponse.rewrite(new URL(`/daas${path}`, request.url));
    }

    // Default: Corporate domain (ekwip.ma, www.ekwip.ma, localhost)
    // For root path, show corporate homepage directly (no /corporate prefix)
    if (url.pathname === "/" || url.pathname === "") {
        return NextResponse.rewrite(new URL("/corporate", request.url));
    }
    // For other paths, check if they're corporate routes
    if (url.pathname.startsWith("/connect") || url.pathname.startsWith("/tech") || url.pathname.startsWith("/contact")) {
        return NextResponse.rewrite(new URL(`/corporate${url.pathname}`, request.url));
    }
    // Default: rewrite to corporate path
    const path = url.pathname === "/" ? "" : url.pathname;
    return NextResponse.rewrite(new URL(`/corporate${path}`, request.url));
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};
