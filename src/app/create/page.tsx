'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function CreateCharacter() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [characterData, setCharacterData] = useState({
    name: '',
    description: '',
    instructions: '',
    imageUrl: '',
  });
  const [previewImage, setPreviewImage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCharacterData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCharacterData((prev) => ({ ...prev, imageUrl: value }));
    setPreviewImage(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/characters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(characterData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create character');
      }

      const data = await response.json();
      router.push(`/chat/${data.id}`);
    } catch (err) {
      console.error('Error creating character:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      {/* Header */}
      <header className="flex items-center justify-between p-4">
        <Link href="/" className="text-2xl font-bold">zeta</Link>
        <h1 className="text-xl font-medium">캐릭터 만들기</h1>
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
              value={characterData.imageUrl}
              onChange={handleImageChange}
              placeholder="https://example.com/image.jpg"
              className="w-full rounded-md border border-gray-700 bg-gray-900 px-4 py-2 text-white focus:border-purple-500 focus:outline-none"
            />
            {previewImage && (
              <div className="mt-2 flex justify-center">
                <div className="relative aspect-square w-32 overflow-hidden rounded-lg">
                  <Image
                    src={previewImage}
                    alt="Character preview"
                    width={128}
                    height={128}
                    className="h-full w-full object-cover"
                    onError={() => setPreviewImage('')}
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
              value={characterData.name}
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
              value={characterData.description}
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
              value={characterData.instructions}
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
            <Link href="/">
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
              disabled={isLoading}
              className="bg-purple-600 text-white hover:bg-purple-700"
            >
              {isLoading ? '생성 중...' : '캐릭터 생성하기'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
