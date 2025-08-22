const PricingPage = () => {
  const priceData = [
    {
      type: '벽걸이 에어컨',
      services: [
        { name: '가정용 (7평 이하)', price: '70,000원' },
        { name: '가정용 (8평 이상)', price: '80,000원' },
        { name: '업소용', price: '별도 문의' },
      ],
    },
    {
      type: '스탠드 에어컨',
      services: [
        { name: '가정용 (일반)', price: '120,000원' },
        { name: '업소용 (중대형)', price: '150,000원부터' },
        { name: '스마트/공기청정 기능 포함', price: '+20,000원' },
      ],
    },
    {
      type: '시스템 에어컨 (천장형)',
      services: [
        { name: '1-Way (가정용/상업용)', price: '90,000원' },
        { name: '4-Way (상업용)', price: '120,000원' },
        { name: '다수 작업 시', price: '할인 적용 (문의)' },
      ],
    },
  ];

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-600">가격 안내</h1>
          <p className="text-lg text-gray-600 mt-2">투명하고 합리적인 가격으로 최상의 서비스를 제공합니다.</p>
        </div>

        {/* Pricing Table */}
        <div className="grid md:grid-cols-3 gap-8">
          {priceData.map((category) => (
            <div key={category.type} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
              <div className="bg-blue-600 text-white text-center py-4">
                <h2 className="text-2xl font-bold">{category.type}</h2>
              </div>
              <ul className="divide-y divide-gray-200 flex-grow">
                {category.services.map((service) => (
                  <li key={service.name} className="flex justify-between items-center p-4">
                    <span className="text-gray-700">{service.name}</span>
                    <span className="font-semibold text-blue-600">{service.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Notes Section */}
        <div className="mt-12 text-center text-gray-600 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4 text-gray-800">참고 사항</h3>
          <ul className="list-disc list-inside inline-block text-left space-y-2">
            <li>모든 가격은 부가세(VAT) 별도입니다.</li>
            <li>에어컨의 상태나 오염도에 따라 추가 비용이 발생할 수 있습니다.</li>
            <li>주차 공간이 필요하며, 주차비 발생 시 고객 부담입니다.</li>
            <li>서울/경기 외 지역은 출장비가 추가될 수 있습니다.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
