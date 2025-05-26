import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PATCH(req) {
    try {
        const body = await req.json();
        const { vision } = body;

        if (!vision || !vision.trim()) {
            return NextResponse.json({ message: "Visi tidak boleh kosong" }, { status: 400 });
        }

        const updated = await prisma.about_info.update({
            where: { id: 1 },
            data: { vision },
        });

        return NextResponse.json({ message: "Berhasil update visi", data: updated }, { status: 200 });
    } catch (error) {
        console.error("[PATCH /about-info/update-vision]", error);
        return NextResponse.json({ message: "Gagal update visi", error: error.message }, { status: 500 });
    }
}
