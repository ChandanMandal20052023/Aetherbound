import { NextRequest, NextResponse } from 'next/server';
import { verifyTokenString } from '@/lib/auth';

const COOKIE_NAME = 'aetherbound_session';

// Routes that don't require auth
const PUBLIC_PATHS = ['/login', '/register', '/api/auth/login', '/api/auth/register'];

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow landing page ('/'), public paths, and static assets
  if (
    pathname === '/' ||
    PUBLIC_PATHS.some((p) => pathname.startsWith(p)) ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/__nextjs_font') ||
    pathname.startsWith('/avatars') ||
    pathname.includes('.')
  ) {
    // If authenticated user visits login or register, redirect to dashboard
    if (pathname === '/login' || pathname === '/register') {
      const token = req.cookies.get(COOKIE_NAME)?.value;
      const session = token ? await verifyTokenString(token) : null;
      if (session) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
      }
    }
    return NextResponse.next();
  }

  const token = req.cookies.get(COOKIE_NAME)?.value;
  const session = token ? await verifyTokenString(token) : null;

  // Redirect unauthenticated users to login
  if (!session) {
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const loginUrl = new URL('/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect already-authenticated users away from auth pages
  if (pathname === '/login' || pathname === '/register') {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // Inject user id into headers so server components can read it
  const headers = new Headers(req.headers);
  headers.set('x-user-id', session.userId);
  return NextResponse.next({ request: { headers } });
}

export default proxy;

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};

