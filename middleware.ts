import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getCurrentUser } from './actions/auth-actions';

export async function middleware(request: NextRequest) {
  const user = await getCurrentUser();
  const isAuthenticated = !!user;

  console.log({ user });

  if (!isAuthenticated) {
    const url = request.nextUrl.clone();
    url.pathname = '/sign-in';
    url.searchParams.set('redirect', request.nextUrl.pathname + request.nextUrl.search);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sign-in).*)'],
};
