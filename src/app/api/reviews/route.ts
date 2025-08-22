import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET: 모든 후기를 조회하는 API
export async function GET() {
  try {
    const reviews = await prisma.review.findMany({
      orderBy: {
        createdAt: 'desc', // 최신순으로 정렬
      },
    });
    return NextResponse.json(reviews);
  } catch (error) {
    console.error('Failed to fetch reviews:', error);
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}

// POST: 새로운 후기를 생성하는 API
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { author, content, rating, imageUrl } = body;

    // 유효성 검사
    if (!author || !content || !rating) {
      return NextResponse.json({ error: 'Author, content, and rating are required' }, { status: 400 });
    }
    if (typeof rating !== 'number' || rating < 1 || rating > 5) {
        return NextResponse.json({ error: 'Rating must be a number between 1 and 5' }, { status: 400 });
    }

    const newReview = await prisma.review.create({
      data: {
        author,
        content,
        rating,
        imageUrl,
      },
    });

    return NextResponse.json(newReview, { status: 201 });
  } catch (error) {
    console.error('Failed to create review:', error);
    return NextResponse.json({ error: 'Failed to create review' }, { status: 500 });
  }
}
