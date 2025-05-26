import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PATCH(req) {
  try {
    const body = await req.json();
    const { heading, description, leaderName, leaderTitle, image4Url } = body;

    const dataToUpdate = {};
    if (heading !== undefined) dataToUpdate.heading = heading;
    if (description !== undefined) dataToUpdate.description = description;
    if (leaderName !== undefined) dataToUpdate.leaderName = leaderName;
    if (leaderTitle !== undefined) dataToUpdate.leaderTitle = leaderTitle;
    if (image4Url !== undefined) dataToUpdate.image4Url = image4Url;

    const updated = await prisma.about_info.update({
      where: { id: 1 }, // asumsi 1 row
      data: dataToUpdate,
    });

    return NextResponse.json({ message: "Berhasil update data utama", data: updated }, { status: 200 });
  } catch (error) {
    console.error("[PATCH /about-info/update-main]", error);
    return NextResponse.json({ message: "Gagal update data", error: error.message }, { status: 500 });
  }
}