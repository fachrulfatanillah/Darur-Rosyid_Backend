import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(request) {
  const { email, password } = await request.json()

  const user = await prisma.users.findUnique({ where: { email } })

  if (!user) {
    return NextResponse.json({ status: 401 })
  }

  if (user.password !== password) {
    return NextResponse.json({ status: 401 })
  }

  if (!user || user.password !== password) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}

  return NextResponse.json(
    {
      data: {
        uuid: user.uuid,
        email: user.email
      },
      status: 200
    }, { status: 200 }
  )
}
