import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Update image1Url, image2Url, image3Url (header images)
export async function PATCH(req) {
    try {
        const body = await req.json();
        const { image1Url, image2Url, image3Url } = body;

        const dataToUpdate = {};
        if (image1Url !== undefined) dataToUpdate.image1Url = image1Url;
        if (image2Url !== undefined) dataToUpdate.image2Url = image2Url;
        if (image3Url !== undefined) dataToUpdate.image3Url = image3Url;

        if (Object.keys(dataToUpdate).length === 0) {
        return NextResponse.json({ message: "Tidak ada gambar yang dikirim" }, { status: 400 });
        }

        // Misalnya hanya ada 1 row (id = 1), kamu bisa sesuaikan
        const updated = await prisma.about_info.update({
        where: { id: 1 },
        data: dataToUpdate,
        });

        return NextResponse.json({ message: "Gambar berhasil diperbarui", data: updated }, { status: 200 });
    } catch (error) {
        console.error("[PATCH /api/about-info/update-images]", error);
        return NextResponse.json({ message: "Gagal update gambar", error: error.message }, { status: 500 });
    }
}
