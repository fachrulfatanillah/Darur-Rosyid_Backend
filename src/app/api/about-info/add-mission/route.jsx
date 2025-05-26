// /app/api/about-mission/route.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const { text } = body;

    if (!text || !text.trim()) {
      return NextResponse.json({ message: "Isi misi tidak boleh kosong" }, { status: 400 });
    }

    const newMission = await prisma.about_mission.create({
      data: { text },
    });

    return NextResponse.json({ message: "Misi berhasil ditambahkan", data: newMission }, { status: 201 });
  } catch (error) {
    console.error("[POST /add-mission]", error);
    return NextResponse.json({ message: "Gagal tambah misi", error: error.message }, { status: 500 });
  }
}
