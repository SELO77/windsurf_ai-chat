'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Character } from '@/lib/db/schema';

interface EditCharacterProps {
  params: {
    id: string;
  };
}

export default function EditCharacter({ params }: EditCharacterProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [characterData, setCharacterData] = useState<Partial<Character>>({
    name: '',
    description: '',
    instructions: '',
    imageUrl: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await fetch(`/api/characters/${params.id}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('캐릭터를 찾을 수 없습니다.');
          }
          throw new Error('캐릭터 정보를 가져오는데 실패했습니다.');
        }
        
        const data = await response.json();
        setCharacterData(data);
      } catch (err) {
        console.error('Error fetching character:', err);
        setError(err instanceof Error ? err.message : '캐릭터 정보를 가져오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCharacter();
  }, [params.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCharacterData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError('');

    try {
      const response = await fetch(`/api/characters/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(characterData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '캐릭터 업데이트에 실패했습니다.');
      }

      router.push('/my-characters');
    } catch (err) {
      console.error('Error updating character:', err);
      setError(err instanceof Error ? err.message : '캐릭터 업데이트 중 오류가 발생했습니다.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
        <p>로딩 중...</p>
      </div>
    );
  }

  if (error && !characterData.name) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
        <div className="rounded-md bg-red-900/50 p-6 text-center text-red-200">
          <p className="mb-4">{error}</p>
          <Link href="/my-characters">
            <Button className="bg-gray-700 hover:bg-gray-600">
              내 캐릭터 목록으로 돌아가기
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      {/* Header */}
      <header className="flex items-center justify-between p-4">
        <Link href="/" className="text-2xl font-bold">zeta</Link>
        <h1 className="text-xl font-medium">캐릭터 수정하기</h1>
        <div className="w-8"></div> {/* Spacer for alignment */}
      </header>

      <div className="mx-auto w-full max-w-2xl p-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Character Image */}
          <div className="space-y-2">
            <label htmlFor="imageUrl" className="block text-sm font-medium">
              캐릭터 이미지 URL
            </label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={characterData.imageUrl || ''}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full rounded-md border border-gray-700 bg-gray-900 px-4 py-2 text-white focus:border-purple-500 focus:outline-none"
            />
            {characterData.imageUrl && (
              <div className="mt-2 flex justify-center">
                <div className="relative aspect-square w-32 overflow-hidden rounded-lg">
                  <Image
                    src={characterData.imageUrl}
                    alt="Character preview"
                    width={128}
                    height={128}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/128?text=Error';
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Character Name */}
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium">
              캐릭터 이름
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={characterData.name || ''}
              onChange={handleChange}
              required
              placeholder="캐릭터 이름을 입력하세요"
              className="w-full rounded-md border border-gray-700 bg-gray-900 px-4 py-2 text-white focus:border-purple-500 focus:outline-none"
            />
          </div>

          {/* Character Description */}
          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium">
              캐릭터 설명
            </label>
            <textarea
              id="description"
              name="description"
              value={characterData.description || ''}
              onChange={handleChange}
              required
              placeholder="캐릭터에 대한 간단한 설명을 입력하세요"
              rows={2}
              className="w-full rounded-md border border-gray-700 bg-gray-900 px-4 py-2 text-white focus:border-purple-500 focus:outline-none"
            />
          </div>

          {/* Character Instructions */}
          <div className="space-y-2">
            <label htmlFor="instructions" className="block text-sm font-medium">
              캐릭터 지시사항
            </label>
            <textarea
              id="instructions"
              name="instructions"
              value={characterData.instructions || ''}
              onChange={handleChange}
              required
              placeholder="AI가 이 캐릭터를 어떻게 연기해야 하는지 자세히 설명해주세요"
              rows={6}
              className="w-full rounded-md border border-gray-700 bg-gray-900 px-4 py-2 text-white focus:border-purple-500 focus:outline-none"
            />
          </div>

          {error && (
            <div className="rounded-md bg-red-900/50 p-3 text-sm text-red-200">
              {error}
            </div>
          )}

          <div className="flex justify-end space-x-2">
            <Link href="/my-characters">
              <Button
                type="button"
                variant="outline"
                className="border-gray-700 bg-transparent text-white hover:bg-gray-800"
              >
                취소
              </Button>
            </Link>
            <Button
              type="submit"
              disabled={isSaving}
              className="bg-purple-600 text-white hover:bg-purple-700"
            >
              {isSaving ? '저장 중...' : '캐릭터 저장하기'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
