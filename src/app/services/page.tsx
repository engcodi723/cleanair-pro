import Image from 'next/image';

const ServicePage = () => {
  const cleaningSteps = [
    {
      title: '1단계: 사전 점검 및 작동 테스트',
      description: '에어컨의 현재 상태, 냉방 성능, 작동 소음 등을 꼼꼼하게 확인하여 문제점을 진단합니다.',
      icon: '🔍', // Placeholder icon
    },
    {
      title: '2단계: 부품 분해 및 보호 작업',
      description: '오염 방지를 위해 주변을 비닐로 감싸고, 필터, 커버 등 주요 부품을 조심스럽게 분해합니다.',
      icon: '🛡️',
    },
    {
      title: '3단계: 친환경 약품 도포 및 고압 세척',
      description: '인체에 무해한 친환경 세척제를 냉각핀과 부품에 도포한 후, 고압 세척 장비로 내부의 먼지와 곰팡이를 제거합니다.',
      icon: '💧',
    },
    {
      title: '4단계: 스팀 살균 및 탈취',
      description: '고온 스팀을 이용하여 남아있는 세균을 완벽하게 박멸하고, 악취의 원인을 제거하여 공기를 상쾌하게 만듭니다.',
      icon: '💨',
    },
    {
      title: '5단계: 부품 조립 및 최종 점검',
      description: '세척이 완료된 부품을 건조하여 재조립하고, 정상적으로 작동하는지 최종 테스트를 진행합니다.',
      icon: '✅',
    },
  ];

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-600">서비스 소개</h1>
          <p className="text-lg text-gray-600 mt-2">클린에어는 체계적이고 전문적인 청소 서비스를 제공합니다.</p>
        </div>

        {/* Service Types Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">가정용 에어컨 청소</h2>
            <p className="text-gray-600">벽걸이, 스탠드, 2in1 에어컨 등 모든 종류의 가정용 에어컨을 분해하여 보이지 않는 곳의 곰팡이와 세균까지 완벽하게 제거합니다. 가족의 건강을 위해 깨끗한 공기를 유지하세요.</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">업소용/시스템 에어컨 청소</h2>
            <p className="text-gray-600">사무실, 상가, 학교 등에 설치된 시스템 에어컨(천장형)을 정기적으로 관리하여 쾌적한 실내 환경을 조성합니다. 다중이용시설의 공기질을 최상으로 유지해드립니다.</p>
          </div>
        </div>

        {/* Cleaning Process Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">에어컨 청소 과정</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cleaningSteps.map((step) => (
              <div key={step.title} className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-4xl mb-3">{step.icon}</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Before & After Section */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Before & After</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold text-center mb-4">청소 전</h3>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <Image src="https://via.placeholder.com/600x400.png?text=Before" alt="청소 전 에어컨" width={600} height={400} className="w-full" />
                <div className="p-4">
                  <p className="text-gray-600">냉각핀에 먼지와 곰팡이가 가득하여 악취가 나고 냉방 효율이 저하된 상태입니다.</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-center mb-4">청소 후</h3>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <Image src="https://via.placeholder.com/600x400.png?text=After" alt="청소 후 에어컨" width={600} height={400} className="w-full" />
                <div className="p-4">
                  <p className="text-gray-600">고압 세척과 스팀 살균으로 오염 물질을 완벽하게 제거하여 깨끗하고 상쾌한 바람이 나옵니다.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicePage;
