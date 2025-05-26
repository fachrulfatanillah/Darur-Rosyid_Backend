import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET: Ambil data kontak
export async function GET() {
  try {
    const contactInfo = await prisma.contact_info.findUnique({
      where: { id: 1 },
    });

    if (!contactInfo) {
      return NextResponse.json({ message: 'Data not found' }, { status: 404 });
    }

    return NextResponse.json(contactInfo, { status: 200 });
  } catch (error) {
    console.error('[GET contact_info]', error);
    return NextResponse.json(
      { message: 'Internal Server Error', error },
      { status: 500 }
    );
  }
}

// PATCH: Perbarui data kontak
export async function PATCH(request) {
  try {
    const body = await request.json();

    const updated = await prisma.contact_info.update({
      where: { id: 1 },
      data: {
        phone: body.phone,
        whatsapp: body.whatsapp,
        email: body.email,
        address: body.address,
        bannerUrl: body.bannerUrl,
        bannerText: body.bannerText,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error('[PATCH contact_info]', error);
    return NextResponse.json(
      { message: 'Failed to update contact_info', error },
      { status: 500 }
    );
  }
}
