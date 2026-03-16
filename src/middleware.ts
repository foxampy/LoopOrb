import createMiddleware from 'next-intl/middleware';
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

// Handle i18n routing
const handleI18nRouting = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  // Handle i18n routing for all pages
  const response = handleI18nRouting(request);
  return response;
}

// Match all routes except static files and API
export const config = {
  matcher: [
    // Match all routes except static files and api
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    // Match API routes too
    '/api/:path*'
  ],
};
