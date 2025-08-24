'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type DeleteButtonProps = {
  id: string;
  type: 'reservation' | 'review';
};

const DeleteButton = ({ id, type }: DeleteButtonProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!window.confirm('정말로 이 항목을 삭제하시겠습니까?')) {
      return;
    }

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/${type}s/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('삭제에 실패했습니다.');
      }

      alert('삭제되었습니다.');
      router.refresh(); // Revalidate data on the admin page
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(`삭제 중 오류 발생: ${err.message}`);
      } else {
        alert('알 수 없는 오류가 발생했습니다.');
      } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-red-600 hover:text-red-800 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isDeleting ? '삭제 중...' : '삭제'}
    </button>
  );
};

export default DeleteButton;
