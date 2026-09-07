import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Note: Authentication is handled client-side via localStorage
// Middleware only handles basic route protection where needed
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Allow all routes - authentication is handled client-side
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*$).*)',
  ],
};