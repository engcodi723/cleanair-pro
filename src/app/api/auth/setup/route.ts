import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    // 이미 관리자가 있는지 확인하여, 1명만 생성되도록 제한합니다.
    const adminCount = await prisma.adminUser.count();
    if (adminCount > 0) {
      return NextResponse.json({ error: 'Admin user already exists. Setup is complete.' }, { status: 409 });
    }

    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
    }
    if (password.length < 8) {
        return NextResponse.json({ error: 'Password must be at least 8 characters long' }, { status: 400 });
    }

    // bcrypt를 사용하여 비밀번호를 해싱합니다.
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.adminUser.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    // 응답에서 비밀번호 필드는 제외합니다.
    const { password: _, ...safeUser } = newUser;

    return NextResponse.json({ message: 'Admin user created successfully', user: safeUser }, { status: 201 });

  } catch (error) {
    console.error('Admin setup error:', error);
    return NextResponse.json({ error: 'Failed to create admin user' }, { status: 500 });
  }
}
