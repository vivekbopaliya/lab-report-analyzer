import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers'; 
import * as jose from 'jose';
const protectedRoutes = ['/dashboard', '/upload', '/reports'];
const jwtConfig = {
  secret: new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET),
}

export async function middleware(req: any) {
  const response = NextResponse.next();
  const cookieStore = cookies(); 
  const token = (await cookieStore).get('auth-token');
  const url = new URL(req.url);
  const isProtected = protectedRoutes.some(route => url.pathname.startsWith(route));

  if (isProtected) {
    if (!token) {
      return NextResponse.redirect(new URL('/signin', req.url));
    }
    let decoded;
    try {
      decoded = await jose.jwtVerify(token.value, jwtConfig.secret);
    } catch (e) {
      return NextResponse.redirect(new URL('/signin', req.url));
    }
    if (!decoded) {
      return NextResponse.redirect(new URL('/signin', req.url));
    }
    req.user = decoded.payload;
  }
  return response;
}

export const config = {
  matcher: ['/dashboard/:path*', '/upload/:path*', '/reports/:path*', '/login', '/signin']
};