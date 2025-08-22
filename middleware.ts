import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getIronSession } from 'iron-session';
import { sessionOptions, type SessionData } from '@/lib/session';

export async function middleware(request: NextRequest) {
  const session = await getIronSession<SessionData>(request.cookies, sessionOptions);
  const { isLoggedIn } = session;
  const { pathname } = request.nextUrl;

  // 로그인한 사용자가 로그인 페이지에 접근 시, 대시보드로 리디렉션
  if (isLoggedIn && pathname.startsWith('/admin/login')) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  // 로그인하지 않은 사용자가 로그인 페이지를 제외한 admin 경로 접근 시, 로그인 페이지로 리디렉션
  if (!isLoggedIn && !pathname.startsWith('/admin/login')) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  return NextResponse.next();
}

// 미들웨어를 적용할 경로 설정
export const config = {
  matcher: ['/admin/:path*'],
};
