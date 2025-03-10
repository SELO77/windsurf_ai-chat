'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Character } from '@/lib/db/schema';

export default function MyCharacters() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch('/api/characters');
        if (!response.ok) {
          throw new Error('캐릭터 목록을 가져오는데 실패했습니다.');
        }
        const data = await response.json();
        setCharacters(data);
      } catch (err) {
        console.error('Error fetching characters:', err);
        setError(err instanceof Error ? err.message : '캐릭터 목록을 가져오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('정말로 이 캐릭터를 삭제하시겠습니까?')) return;

    try {
      const response = await fetch(`/api/characters/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('캐릭터 삭제에 실패했습니다.');
      }

      setCharacters(characters.filter(char => char.id !== id));
    } catch (err) {
      console.error('Error deleting character:', err);
      alert(err instanceof Error ? err.message : '캐릭터 삭제에 실패했습니다.');
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      {/* Header */}
      <header className="flex items-center justify-between p-4">
        <Link href="/" className="text-2xl font-bold">zeta</Link>
        <h1 className="text-xl font-medium">내 캐릭터</h1>
        <div className="w-8"></div> {/* Spacer for alignment */}
      </header>

      <div className="mx-auto w-full max-w-4xl p-4">
        <div className="mb-6 flex justify-between">
          <h2 className="text-xl font-semibold">내가 만든 캐릭터</h2>
          <Link href="/create">
            <Button className="bg-purple-600 hover:bg-purple-700">
              새 캐릭터 만들기
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="flex h-40 items-center justify-center">
            <p>로딩 중...</p>
          </div>
        ) : error ? (
          <div className="rounded-md bg-red-900/50 p-4 text-center text-red-200">
            <p>{error}</p>
            <Button 
              onClick={() => window.location.reload()} 
              className="mt-2 bg-red-700 hover:bg-red-800"
            >
              다시 시도
            </Button>
          </div>
        ) : characters.length === 0 ? (
          <div className="rounded-md bg-gray-800 p-8 text-center">
            <p className="mb-4 text-lg">아직 만든 캐릭터가 없습니다.</p>
            <Link href="/create">
              <Button className="bg-purple-600 hover:bg-purple-700">
                첫 캐릭터 만들기
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {characters.map((character) => (
              <div 
                key={character.id} 
                className="overflow-hidden rounded-lg border border-gray-800 bg-gray-900"
              >
                <div className="relative aspect-square w-full overflow-hidden">
                  {character.imageUrl ? (
                    <Image
                      src={character.imageUrl}
                      alt={character.name}
                      width={300}
                      height={300}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gray-800">
                      <p className="text-gray-400">이미지 없음</p>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="mb-1 text-lg font-semibold">{character.name}</h3>
                  <p className="mb-3 text-sm text-gray-400">{character.description}</p>
                  <div className="flex space-x-2">
                    <Link href={`/chat/${character.id}`} className="flex-1">
                      <Button 
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        size="sm"
                      >
                        대화하기
                      </Button>
                    </Link>
                    <Link href={`/edit/${character.id}`} className="flex-1">
                      <Button 
                        className="w-full bg-gray-700 hover:bg-gray-600"
                        size="sm"
                      >
                        수정하기
                      </Button>
                    </Link>
                    <Button 
                      onClick={() => handleDelete(character.id)}
                      className="bg-red-700 hover:bg-red-800"
                      size="sm"
                    >
                      삭제
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom navigation bar */}
      <div className="mt-auto flex border-t border-gray-800 bg-black p-2">
        <Link href="/" className="flex flex-1 flex-col items-center py-1 text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <span className="text-xs">홈</span>
        </Link>
        <Link href="/my-characters" className="flex flex-1 flex-col items-center py-1 text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          <span className="text-xs">내 캐릭터</span>
        </Link>
      </div>
    </div>
  );
}
