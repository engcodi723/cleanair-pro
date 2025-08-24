import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { sessionOptions, type SessionData } from '@/lib/session';

export async function POST(request: Request) {
  // iron-session을 사용하여 쿠키에서 세션 정보를 가져옵니다.
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  
  try {
    const { username, password } = await request.json();

    // 1. 데이터베이스에서 사용자 아이디로 관리자를 찾습니다.
    const user = await prisma.adminUser.findUnique({
      where: { username },
    });

    if (!user) {
      return NextResponse.json({ error: '아이디 또는 비밀번호가 일치하지 않습니다.' }, { status: 401 });
    }

    // 2. bcrypt.compare로 비밀번호가 일치하는지 확인합니다.
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ error: '아이디 또는 비밀번호가 일치하지 않습니다.' }, { status: 401 });
    }

    // 3. 인증 성공 시, 세션에 로그인 상태와 사용자 정보를 저장합니다.
    session.isLoggedIn = true;
    session.username = user.username;
    await session.save(); // 변경된 세션 정보를 쿠키에 저장합니다.

    return NextResponse.json({ message: 'Logged in successfully' }, { status: 200 });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
