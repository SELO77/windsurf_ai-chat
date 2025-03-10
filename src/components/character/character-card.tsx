import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Character } from '@/lib/db/schema';

interface CharacterCardProps {
  character: Character;
}

export function CharacterCard({ character }: CharacterCardProps) {
  return (
    <Link href={`/characters/${character.id}`} className="block">
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow transition-all hover:shadow-md">
        <div className="relative h-48 w-full bg-gray-200">
          {character.imageUrl ? (
            <Image
              src={character.imageUrl}
              alt={character.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-500">
              No Image
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold">{character.name}</h3>
          <p className="mt-2 line-clamp-2 text-sm text-gray-600">
            {character.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
