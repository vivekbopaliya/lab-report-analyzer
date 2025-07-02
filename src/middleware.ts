import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers'; 
import * as jose from 'jose';

const protectedRoutes = ['/dashboard', '/upload', '/reports'];
const authPages = ['/signin', '/signup'];
const jwtConfig = {
  secret: new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET),
}

export async function middleware(req: any) {
  const response = NextResponse.next();
  const cookieStore = cookies(); 
  const token = (await cookieStore).get('auth-token');
  const url = new URL(req.url);
  const isProtected = protectedRoutes.some(route => url.pathname.startsWith(route));
  const isAuthPage = authPages.some(route => url.pathname.startsWith(route));
  const isRoot = url.pathname === '/';

  let decoded = null;
  if (token) {
    try {
      decoded = await jose.jwtVerify(token.value, jwtConfig.secret);
    } catch (e) {
      decoded = null;
    }
  }

  if (isProtected) {
    if (!decoded) {
      return NextResponse.redirect(new URL('/signin', req.url));
    }
    req.user = decoded.payload;
  }

  if (isAuthPage && decoded) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  if (isRoot) {
    if (decoded) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    } else {
      return NextResponse.redirect(new URL('/signin', req.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    '/',
    '/dashboard/:path*',
    '/upload/:path*',
    '/reports/:path*',
    '/login',
    '/signin',
    '/signup'
  ]
};