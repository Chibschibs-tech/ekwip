import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const url = request.nextUrl;

    if (
        url.pathname.startsWith("/_next") || 
        url.pathname.startsWith("/static") || 
        url.pathname.startsWith("/api") ||
        url.pathname.includes(".")
    ) {
        return NextResponse.next();
    }

    // All routes are served directly — no rewrites needed
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};
