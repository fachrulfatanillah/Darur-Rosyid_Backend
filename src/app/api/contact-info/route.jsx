import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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