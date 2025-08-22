'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { AdminUser } from '@prisma/client';

// AdminUser 타입에서 id와 createdAt을 제외한 타입을 로그인 폼의 타입으로 사용합니다.
type Inputs = Omit<AdminUser, 'id' | 'createdAt'>;

const LoginPage = () => {
  const { register, handleSubmit } = useForm<Inputs>();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || '로그인에 실패했습니다.');
      }

      // 로그인 성공 시, 관리자 대시보드로 페이지를 이동시킵니다.
      router.push('/admin');

    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('알 수 없는 오류가 발생했습니다.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-900">관리자 로그인</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              아이디
            </label>
            <input
              id="username"
              type="text"
              {...register('username', { required: true })}
              className="mt-1 block w-full input"
            />
          </div>
          <div>
            <label htmlFor="password-input" className="block text-sm font-medium text-gray-700">
              비밀번호
            </label>
            <input
              id="password-input"
              type="password"
              {...register('password', { required: true })}
              className="mt-1 block w-full input"
            />
          </div>
          {error && <p className="text-sm text-red-600 text-center">{error}</p>}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn btn-primary"
            >
              {isSubmitting ? '로그인 중...' : '로그인'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
