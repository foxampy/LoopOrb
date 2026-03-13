import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Middleware is disabled - all pages are publicly accessible
// Authentication is only required for specific actions (API routes handle this)
export async function middleware(request: NextRequest) {
  return NextResponse.next();
}

// Match all routes except static files and API
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
