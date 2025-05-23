import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const users = await prisma.users.findMany();
    return NextResponse.json(users);
  } catch (error) {
    console.error('PRISMA ERROR:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}