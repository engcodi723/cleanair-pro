'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Inputs = {
  author: string;
  content: string;
  rating: number;
  imageUrl?: string;
};

export const ReviewForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Inputs>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, rating: Number(data.rating) }),
      });

      if (!response.ok) {
        throw new Error('후기 등록에 실패했습니다.');
      }

      reset();
      // 페이지를 새로고침하여 새 후기를 포함한 목록을 다시 불러옵니다.
      router.refresh();

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg mb-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">후기 작성하기</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-700">작성자</label>
            <input type="text" id="author" {...register("author", { required: "작성자를 입력해주세요." })} className="mt-1 block w-full input" />
            {errors.author && <p className="text-red-500 text-xs mt-1">{errors.author.message}</p>}
          </div>
          <div>
            <label htmlFor="rating" className="block text-sm font-medium text-gray-700">평점</label>
            <select id="rating" {...register("rating", { required: true })} defaultValue={5} className="mt-1 block w-full input">
              <option value={5}>★★★★★ (5점)</option>
              <option value={4}>★★★★☆ (4점)</option>
              <option value={3}>★★★☆☆ (3점)</option>
              <option value={2}>★★☆☆☆ (2점)</option>
              <option value={1}>★☆☆☆☆ (1점)</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">내용</label>
          <textarea id="content" {...register("content", { required: "내용을 입력해주세요." })} rows={4} className="mt-1 block w-full input"></textarea>
          {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content.message}</p>}
        </div>
        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">이미지 URL (선택)</label>
          <input type="text" id="imageUrl" {...register("imageUrl")} className="mt-1 block w-full input" placeholder="https://example.com/image.png" />
          <p className="text-xs text-gray-500 mt-1">참고: 현재는 이미지 파일 업로드가 아닌, 이미지 주소(URL) 입력만 가능합니다.</p>
        </div>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <button type="submit" disabled={isSubmitting} className="w-full btn btn-primary">
          {isSubmitting ? '등록 중...' : '후기 등록'}
        </button>
      </form>
    </div>
  );
};
