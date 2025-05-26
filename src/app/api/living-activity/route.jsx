import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const { title, imageUrl } = body;

    // Validasi input
    if (!title || !imageUrl) {
      return NextResponse.json({ message: "Judul dan gambar wajib diisi" }, { status: 400 });
    }

    const newActivity = await prisma.living_info_activity.create({
      data: {
        title,
        imageUrl,
      },
    });

    return NextResponse.json({ message: "Berhasil menambahkan aktivitas", data: newActivity }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/living-activity]", error);
    return NextResponse.json({ message: "Gagal menambahkan aktivitas", error: error.message }, { status: 500 });
  }
}
