import { PrismaClient } from '@prisma/client';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { sessionOptions, SessionData } from '@/lib/session';
import Link from 'next/link';
import DeleteButton from '@/components/DeleteButton'; // Import DeleteButton

const prisma = new PrismaClient();

async function getAdminData() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  const username = session.username;

  const reservations = await prisma.reservation.findMany({
    orderBy: { createdAt: 'desc' },
  });
  const reviews = await prisma.review.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return { username, reservations, reviews };
}

const AdminDashboard = async () => {
  const { username, reservations, reviews } = await getAdminData();

  return (
    <div className="bg-gray-50 py-12 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-blue-600">관리자 대시보드</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">환영합니다, <span className="font-semibold">{username}</span>님!</span>
              <Link href="/api/auth/logout" className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">
                로그아웃
              </Link>
            </div>
          </div>

          {/* 예약 목록 */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">예약 목록 ({reservations.length}건)</h2>
            {reservations.length === 0 ? (
              <p className="text-gray-600">접수된 예약이 없습니다.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border-b">이름</th>
                      <th className="py-2 px-4 border-b">연락처</th>
                      <th className="py-2 px-4 border-b">에어컨 종류</th>
                      <th className="py-2 px-4 border-b">희망 날짜</th>
                      <th className="py-2 px-4 border-b">기타</th>
                      <th className="py-2 px-4 border-b">접수일</th>
                      <th className="py-2 px-4 border-b">관리</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservations.map((res) => (
                      <tr key={res.id} className="hover:bg-gray-50">
                        <td className="py-2 px-4 border-b">{res.name}</td>
                        <td className="py-2 px-4 border-b">{res.phone}</td>
                        <td className="py-2 px-4 border-b">{res.acType}</td>
                        <td className="py-2 px-4 border-b">{new Date(res.desiredDate).toLocaleDateString()}</td>
                        <td className="py-2 px-4 border-b truncate max-w-xs">{res.notes || '-'}</td>
                        <td className="py-2 px-4 border-b">{new Date(res.createdAt).toLocaleDateString()}</td>
                        <td className="py-2 px-4 border-b">
                          <DeleteButton id={res.id} type="reservation" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* 후기 목록 */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">후기 목록 ({reviews.length}건)</h2>
            {reviews.length === 0 ? (
              <p className="text-gray-600">작성된 후기가 없습니다.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border-b">작성자</th>
                      <th className="py-2 px-4 border-b">내용</th>
                      <th className="py-2 px-4 border-b">평점</th>
                      <th className="py-2 px-4 border-b">작성일</th>
                      <th className="py-2 px-4 border-b">관리</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reviews.map((rev) => (
                      <tr key={rev.id} className="hover:bg-gray-50">
                        <td className="py-2 px-4 border-b">{rev.author}</td>
                        <td className="py-2 px-4 border-b truncate max-w-xs">{rev.content}</td>
                        <td className="py-2 px-4 border-b">{rev.rating}</td>
                        <td className="py-2 px-4 border-b">{new Date(rev.createdAt).toLocaleDateString()}</td>
                        <td className="py-2 px-4 border-b">
                          <DeleteButton id={rev.id} type="review" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

// Ensure the page is dynamically rendered to check session
export const dynamic = 'force-dynamic';
