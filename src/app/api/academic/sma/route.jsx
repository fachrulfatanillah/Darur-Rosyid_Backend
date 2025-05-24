import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Ambil data utama academic_info_sma (id = 1)
    const academicInfo = await prisma.academic_info_sma.findUnique({
      where: { id: 1 },
    });

    if (!academicInfo) {
      return NextResponse.json({ message: 'Data not found' }, { status: 404 });
    }

    // Ambil semua aktivitas akademik Sma
    const activities = await prisma.academic_info_sma_activity.findMany({
      orderBy: { id: 'asc' },
    });

    // Ambil semua misi akademik Sma
    const missions = await prisma.academic_info_sma_mission.findMany({
      orderBy: { id: 'asc' },
    });

    // Gabungkan semua dalam satu respons
    return NextResponse.json(
      {
        academicInfo,
        activities,
        missions,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[GET /api/academic-info-sma]', error);
    return NextResponse.json(
      { message: 'Internal Server Error', error },
      { status: 500 }
    );
  }
}
