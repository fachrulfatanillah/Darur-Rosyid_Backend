import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Ambil semua data dari living_info
    const livingInfo = await prisma.living_info.findMany({
      orderBy: { id: 'asc' },
    });

    // Ambil semua data dari living_info_activity
    const activities = await prisma.living_info_activity.findMany({
      orderBy: { id: 'asc' },
    });

    // Gabungkan dan kembalikan sebagai satu response
    return NextResponse.json(
      {
        livingInfo,
        activities,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[GET /api/living-info]', error);
    return NextResponse.json(
      { message: 'Internal Server Error', error },
      { status: 500 }
    );
  }
}