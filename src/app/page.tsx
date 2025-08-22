import Link from 'next/link';
import { Phone, Calendar } from 'lucide-react';

// 플로팅 CTA (Call To Action) 컴포넌트
const FloatingCTA = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <a 
        href="tel:010-1234-5678" // 실제 전화번호로 변경해야 합니다.
        className="flex items-center gap-2 bg-blue-600 text-white py-3 px-4 rounded-full shadow-lg hover:bg-blue-700 transition-transform hover:scale-105"
      >
        <Phone size={20} />
        <span className="hidden sm:inline font-semibold">전화 문의</span>
      </a>
      <Link 
        href="/booking" 
        className="flex items-center gap-2 bg-green-500 text-white py-3 px-4 rounded-full shadow-lg hover:bg-green-600 transition-transform hover:scale-105"
      >
        <Calendar size={20} />
        <span className="hidden sm:inline font-semibold">온라인 예약</span>
      </Link>
    </div>
  );
};

export default function Home() {
  return (
    <>
      {/* --- 히어로 섹션 --- */}
      <section 
        className="relative flex items-center justify-center h-[60vh] bg-cover bg-center text-white"
        // 신뢰감을 주는 전문적인 배경 이미지 (출처: Unsplash)
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070&auto=format&fit=crop')" }}
      >
        {/* 배경 이미지 위에 어두운 오버레이 추가하여 텍스트 가독성 확보 */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
        
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
            에어컨 청소의 표준을 제시합니다
          </h1>
          <p className="text-lg md:text-2xl text-gray-200">
            신뢰할 수 있는 전문가의 손길로 깨끗하고 시원한 바람을 되찾으세요.
          </p>
        </div>
      </section>
      
      {/* --- 추가 콘텐츠 섹션 (향후 개발) --- */}
      <div className="container mx-auto p-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">서비스 소개</h2>
        <p className="text-gray-600">가정용, 시스템, 스탠드 에어컨 등 모든 종류의 에어컨을 완벽하게 분해 세척합니다.</p>
        {/* 향후 여기에 서비스 요약 내용이 추가됩니다. */}
      </div>

      {/* --- 플로팅 CTA 컴포넌트 렌더링 --- */}
      <FloatingCTA />
    </>
  );
}
