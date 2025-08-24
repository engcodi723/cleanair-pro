import { prisma } from '@/lib/prisma';
import { ReviewForm } from '@/components/ReviewForm';
import Image from 'next/image';

// 후기 목록을 불러오는 함수
async function getReviews() {
  try {
    const reviews = await prisma.review.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return reviews;
  } catch (error) {
    console.error("Failed to fetch reviews:", error);
    return []; // 에러 발생 시 빈 배열 반환
  }
}

const ReviewsPage = async () => {
  const reviews = await getReviews();

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-blue-600">고객 후기</h1>
            <p className="text-lg text-gray-600 mt-2">클린에어 서비스를 이용하신 고객님들의 소중한 후기입니다.</p>
          </div>

          {/* 후기 작성 폼 (클라이언트 컴포넌트) */}
          <ReviewForm />

          {/* 후기 목록 (서버 컴포넌트) */}
          <div className="space-y-8 mt-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">전체 후기 ({reviews.length}개)</h2>
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review.id} className="bg-white p-6 rounded-lg shadow-md animate-fade-in">
                  <div className="flex items-center mb-4">
                    <div className="font-bold text-gray-800 text-lg">{review.author}</div>
                    <div className="ml-auto flex items-center">
                      <span className="text-yellow-500 text-lg">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span>
                      <span className="ml-2 text-sm text-gray-600">({review.rating}.0)</span>
                    </div>
                  </div>
                  <p className="text-gray-700 whitespace-pre-wrap mb-4">{review.content}</p>
                  {review.imageUrl && (
                    <div className="mt-4">
                      <Image src={review.imageUrl} alt={`${review.author}의 후기 사진`} width={200} height={200} className="rounded-lg object-cover shadow-sm" />
                    </div>
                  )}
                  <div className="text-right text-sm text-gray-400 mt-4">
                    {new Date(review.createdAt).toLocaleDateString('ko-KR')}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16 px-6 bg-white rounded-lg shadow-md">
                <p className="text-lg text-gray-500">아직 작성된 후기가 없습니다.</p>
                <p className="mt-2 text-gray-500">첫 번째 후기를 작성해주세요!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsPage;

// 이 페이지는 동적 렌더링을 사용합니다.
// 후기가 작성될 때마다 최신 내용을 보여주기 위함입니다.
export const dynamic = 'force-dynamic';