// /app/api/about-info/mission/[id]/route.js

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PATCH(req, { params }) {
  const { id } = params;

  try {
    const body = await req.json();
    const { text } = body;

    if (!text || !text.trim()) {
      return NextResponse.json({ message: "Misi tidak boleh kosong" }, { status: 400 });
    }

    const updated = await prisma.about_mission.update({
      where: { id: parseInt(id) },
      data: { text },
    });

    return NextResponse.json({ message: "Misi berhasil diupdate", data: updated });
  } catch (error) {
    console.error("[PATCH /update-mission]", error);
    return NextResponse.json({ message: "Gagal update misi", error: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    await prisma.about_mission.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: "Misi berhasil dihapus" });
  } catch (error) {
    console.error("[DELETE /update-mission]", error);
    return NextResponse.json({ message: "Gagal hapus misi", error: error.message }, { status: 500 });
  }
}