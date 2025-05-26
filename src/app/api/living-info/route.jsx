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

// POST: Tambah data baru ke living_info
export async function POST(req) {
  try {
    const body = await req.json();
    const { title, paragraph, imageUrl } = body;

    // Validasi sederhana
    if (!title || !paragraph || !imageUrl) {
      return NextResponse.json({ message: 'Field tidak lengkap' }, { status: 400 });
    }

    const newEntry = await prisma.living_info.create({
      data: { title, paragraph, imageUrl },
    });

    return NextResponse.json({ message: 'Berhasil menambahkan data', data: newEntry }, { status: 201 });
  } catch (error) {
    console.error('[POST /api/living-info]', error);
    return NextResponse.json({ message: 'Gagal menambahkan data', error }, { status: 500 });
  }
}