import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { characters } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

interface Params {
  params: {
    id: string;
  };
}

export async function GET(_request: NextRequest, { params }: Params) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { message: '유효하지 않은 캐릭터 ID입니다.' },
        { status: 400 }
      );
    }

    const [character] = await db
      .select()
      .from(characters)
      .where(eq(characters.id, id));

    if (!character) {
      return NextResponse.json(
        { message: '캐릭터를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    return NextResponse.json(character);
  } catch (error) {
    console.error('Error fetching character:', error);
    return NextResponse.json(
      { message: '캐릭터 정보를 가져오는 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { message: '유효하지 않은 캐릭터 ID입니다.' },
        { status: 400 }
      );
    }

    const { name, description, instructions, imageUrl } = await request.json();

    // Validate required fields
    if (!name || !description || !instructions) {
      return NextResponse.json(
        { message: '이름, 설명, 지시사항은 필수 항목입니다.' },
        { status: 400 }
      );
    }

    const [updatedCharacter] = await db
      .update(characters)
      .set({
        name,
        description,
        instructions,
        imageUrl: imageUrl || null,
        updatedAt: new Date(),
      })
      .where(eq(characters.id, id))
      .returning();

    if (!updatedCharacter) {
      return NextResponse.json(
        { message: '캐릭터를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedCharacter);
  } catch (error) {
    console.error('Error updating character:', error);
    return NextResponse.json(
      { message: '캐릭터 정보를 업데이트하는 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { message: '유효하지 않은 캐릭터 ID입니다.' },
        { status: 400 }
      );
    }

    const [deletedCharacter] = await db
      .delete(characters)
      .where(eq(characters.id, id))
      .returning();

    if (!deletedCharacter) {
      return NextResponse.json(
        { message: '캐릭터를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: '캐릭터가 성공적으로 삭제되었습니다.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting character:', error);
    return NextResponse.json(
      { message: '캐릭터를 삭제하는 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
