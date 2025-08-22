import Image from 'next/image';

const PortfolioPage = () => {
  const galleryImages = [
    { src: 'https://via.placeholder.com/500x400.png?text=벽걸이+에어컨+분해', alt: '벽걸이 에어컨 분해', description: '벽걸이 에어컨 완전 분해' },
    { src: 'https://via.placeholder.com/500x400.png?text=냉각핀+세척', alt: '냉각핀 세척', description: '오염된 냉각핀 고압 세척' },
    { src: 'https://via.placeholder.com/500x400.png?text=스탠드+에어컨+세척', alt: '스탠드 에어컨 세척', description: '스탠드 에어컨 내부 스팀 살균' },
    { src: 'https://via.placeholder.com/500x400.png?text=시스템+에어컨+청소', alt: '시스템 에어컨 청소', description: '천장형 에어컨 필터 청소' },
    { src: 'https://via.placeholder.com/500x400.png?text=세척+후+깨끗한+부품', alt: '세척 후 부품', description: '깨끗하게 세척된 부품들' },
    { src: 'https://via.placeholder.com/500x400.png?text=최종+조립+및+점검', alt: '최종 조립 및 점검', description: '청소 후 조립 및 시운전' },
  ];

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-600">시공 사례</h1>
          <p className="text-lg text-gray-600 mt-2">사진으로 클린에어의 꼼꼼한 작업 현장을 확인하세요.</p>
        </div>

        {/* Image Gallery */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryImages.map((image, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden group">
              <div className="relative h-64 w-full overflow-hidden">
                <Image 
                  src={image.src} 
                  alt={image.alt} 
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4 bg-white">
                <h3 className="text-lg font-semibold text-gray-800">{image.description}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;
