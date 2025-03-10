import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { characters } from '@/lib/db/schema';

export async function POST(request: NextRequest) {
  try {
    const { name, description, instructions, imageUrl } = await request.json();

    // Validate required fields
    if (!name || !description || !instructions) {
      return NextResponse.json(
        { message: '이름, 설명, 지시사항은 필수 항목입니다.' },
        { status: 400 }
      );
    }

    // For demo purposes, we'll use a fixed userId
    // In a real application, this would come from an authenticated session
    const userId = 'user_' + Math.random().toString(36).substring(2, 9);

    // Insert the character into the database
    const [newCharacter] = await db
      .insert(characters)
      .values({
        name,
        description,
        instructions,
        imageUrl: imageUrl || null,
        userId,
      })
      .returning();

    return NextResponse.json(newCharacter, { status: 201 });
  } catch (error) {
    console.error('Error creating character:', error);
    return NextResponse.json(
      { message: '캐릭터 생성 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const allCharacters = await db.select().from(characters);
    return NextResponse.json(allCharacters);
  } catch (error) {
    console.error('Error fetching characters:', error);
    return NextResponse.json(
      { message: '캐릭터 목록을 가져오는 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
