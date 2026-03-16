import createMiddleware from 'next-intl/middleware';
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

// Handle i18n routing
const handleI18nRouting = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  // Handle i18n routing for all pages except API
  if (request.nextUrl.pathname.startsWith('/api')) {
    return NextResponse.next();
  }
  
  const response = handleI18nRouting(request);
  return response;
}

// Match all routes except static files and API
export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the start of the URL
    '/',
    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix as their prefix
    '/(ru|en)/:path*',
    // Enable redirects that add missing locales
    '/((?!_next|_vercel|.*\\..*).*)'
  ],
};
