import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getIronSession }n from 'iron-session';
import { cookies } from 'next/headers';
import { sessionOptions, type SessionData } from '@/lib/session';

interface Params {
  params: {
    id: string;
  };
}

export async function DELETE(
  request: NextRequest,
  { params }: Params
) {
  // 세션 정보를 가져와 로그인 상태를 확인합니다。
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  // 로그인되지 않은 경우, 접근을 거부합니다。
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = params; // URL 파라미터에서 후기 ID를 추출합니다。

    // Prisma를 사용하여 해당 ID의 후기를 데이터베이스에서 삭제합니다。
    await prisma.review.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Review deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting review:', error);
    return NextResponse.json({ error: 'Failed to delete review' }, { status: 500 });
  }
}