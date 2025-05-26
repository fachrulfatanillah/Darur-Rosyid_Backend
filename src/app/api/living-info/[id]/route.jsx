import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PATCH(req, { params }) {
    const { id } = params;
    console.log("PATCH request for ID:", id);

    try {
        const body = await req.json();
        const { title, paragraph, imageUrl } = body;

        const dataToUpdate = {};
        if (title !== undefined) dataToUpdate.title = title;
        if (paragraph !== undefined) dataToUpdate.paragraph = paragraph;
        if (imageUrl !== undefined) dataToUpdate.imageUrl = imageUrl;

        if (Object.keys(dataToUpdate).length === 0) {
        return NextResponse.json({ message: "Tidak ada data untuk diupdate" }, { status: 400 });
        }

        const updated = await prisma.living_info.update({
        where: { id: parseInt(id) },
        data: dataToUpdate,
        });

        return NextResponse.json({ message: "Berhasil update", data: updated }, { status: 200 });
    } catch (error) {
        console.error(`[PATCH /api/living-info/${id}]`, error);
        return NextResponse.json({ message: "Gagal update", error: error.message }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    const { id } = params;

    try {
        const deleted = await prisma.living_info.delete({
        where: { id: parseInt(id) },
        });

        return NextResponse.json({ message: "Berhasil dihapus", data: deleted }, { status: 200 });
    } catch (error) {
        console.error(`[DELETE /api/living-info/${id}]`, error);
        return NextResponse.json({ message: "Gagal menghapus", error: error.message }, { status: 500 });
    }
}