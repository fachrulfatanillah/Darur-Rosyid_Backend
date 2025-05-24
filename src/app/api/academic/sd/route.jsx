import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Ambil data utama academic_info_sd (id = 1)
    const academicInfo = await prisma.academic_info_sd.findUnique({
      where: { id: 1 },
    });

    if (!academicInfo) {
      return NextResponse.json({ message: 'Data not found' }, { status: 404 });
    }

    // Ambil semua aktivitas akademik SD
    const activities = await prisma.academic_info_sd_activity.findMany({
      orderBy: { id: 'asc' },
    });

    // Ambil semua misi akademik SD
    const missions = await prisma.academic_info_sd_mission.findMany({
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
    console.error('[GET /api/academic-info-sd]', error);
    return NextResponse.json(
      { message: 'Internal Server Error', error },
      { status: 500 }
    );
  }
}
