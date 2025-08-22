'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';

type Inputs = {
  name: string;
  phone: string;
  email?: string;
  acType: string;
  photoUrl?: string;
  desiredDate: string;
  notes?: string;
};

const BookingPage = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Inputs>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'success' | 'error' | null>(null);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsSubmitting(true);
    setSubmissionStatus(null);

    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          desiredDate: new Date(data.desiredDate), // Convert string to Date object
        }),
      });

      if (!response.ok) {
        throw new Error('Server error');
      }

      setSubmissionStatus('success');
      reset(); // Reset form on success
    } catch (error) {
      setSubmissionStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-blue-600">온라인 예약</h1>
            <p className="text-lg text-gray-600 mt-2">간편하게 예약하고 전문적인 서비스를 받아보세요.</p>
          </div>

          {submissionStatus === 'success' ? (
            <div className="text-center p-8 bg-green-100 text-green-800 rounded-lg">
              <h2 className="text-2xl font-bold">예약이 성공적으로 접수되었습니다!</h2>
              <p className="mt-2">빠른 시일 내에 확인 후 연락드리겠습니다.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">고객명</label>
                <input type="text" id="name" {...register("name", { required: "이름을 입력해주세요." })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">연락처</label>
                <input type="tel" id="phone" {...register("phone", { required: "연락처를 입력해주세요." })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">이메일 (선택)</label>
                <input type="email" id="email" {...register("email")} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
              </div>

              <div>
                <label htmlFor="acType" className="block text-sm font-medium text-gray-700">에어컨 종류</label>
                <select id="acType" {...register("acType", { required: "에어컨 종류를 선택해주세요." })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                  <option value="">선택하세요</option>
                  <option value="벽걸이">벽걸이</option>
                  <option value="스탠드">스탠드</option>
                  <option value="시스템">시스템 (천장형)</option>
                  <option value="기타">기타</option>
                </select>
                {errors.acType && <p className="text-red-500 text-xs mt-1">{errors.acType.message}</p>}
              </div>

              <div>
                <label htmlFor="desiredDate" className="block text-sm font-medium text-gray-700">서비스 희망 날짜</label>
                <input type="date" id="desiredDate" {...register("desiredDate", { required: "희망 날짜를 선택해주세요." })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                {errors.desiredDate && <p className="text-red-500 text-xs mt-1">{errors.desiredDate.message}</p>}
              </div>

              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700">기타 문의사항 (선택)</label>
                <textarea id="notes" {...register("notes")} rows={4} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"></textarea>
              </div>

              {submissionStatus === 'error' && <p className="text-red-500 text-sm text-center">예약 접수 중 오류가 발생했습니다. 다시 시도해주세요.</p>}

              <button type="submit" disabled={isSubmitting} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400">
                {isSubmitting ? '예약 접수 중...' : '예약하기'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
