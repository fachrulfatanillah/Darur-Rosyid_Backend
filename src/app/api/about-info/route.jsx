import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const about = await prisma.about_info.findUnique({
      where: { id: 1 },
    });

    if (!about) {
      return NextResponse.json({ message: 'Data not found' }, { status: 404 });
    }

    const missions = await prisma.about_mission.findMany({
      orderBy: { id: 'asc' }, // agar urut tampil
    });

    return NextResponse.json(
      {
        about,
        missions,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[GET about]', error);
    return NextResponse.json(
      { message: 'Internal Server Error', error },
      { status: 500 }
    );
  }
}