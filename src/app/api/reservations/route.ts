import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Prisma Client 인스턴스를 생성합니다.
// 실제 프로덕션 환경에서는 이 파일을 벗어난 곳에서 한 번만 생성하는 것이 좋습니다.
const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, acType, desiredDate, notes, photoUrl } = body;

    // 필수 항목 유효성 검사
    if (!name || !phone || !acType || !desiredDate) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Prisma를 사용하여 데이터베이스에 새로운 예약 정보 생성
    const newReservation = await prisma.reservation.create({
      data: {
        name,
        phone,
        email,
        acType,
        desiredDate: new Date(desiredDate),
        notes,
        photoUrl,
      },
    });

    // 성공적으로 생성된 경우, 생성된 데이터와 함께 201 상태 코드 반환
    return NextResponse.json(newReservation, { status: 201 });
  } catch (error) {
    console.error('Reservation creation error:', error);
    // 서버 에러 발생 시 500 상태 코드와 에러 메시지 반환
    return NextResponse.json({ error: 'Failed to create reservation' }, { status: 500 });
  }
}
