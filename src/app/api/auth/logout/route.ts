import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { sessionOptions, type SessionData } from '@/lib/session';

export async function GET(request: Request) {
  // 현재 세션을 가져옵니다.
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  
  // 세션을 파기하여 저장된 모든 데이터를 지웁니다.
  session.destroy();

  // 클라이언트에게 성공 메시지를 반환합니다.
  // 이 응답을 받은 클라이언트 측 코드에서 로그인 페이지로 리디렉션 등을 처리합니다.
  return NextResponse.json({ message: 'Logged out successfully' }, { status: 200 });
}
