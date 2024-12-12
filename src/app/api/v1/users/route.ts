import { NextRequest, NextResponse } from 'next/server';
import { format } from 'date-fns';
import prisma from '@/libs/prisma';
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'asc'
      }
    })

    return new NextResponse(JSON.stringify(users), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    console.log('[USERS_GET]', error)

    return new NextResponse('Algo deu errado ao buscar todos os usuários', { status: 500 })
  }
}
//  id String  @id @default(cuid())
// name String 
// birthDate DateTime
// email String @unique
// password String
// age Int?
// createdAt DateTime @default(now())
// updatedAt DateTime @updatedAt

// purchases Purchase[] @relation("UserPurchase")
// books Book[] @relation("UserBook")
// refreshToken RefreshToken[] @relation("UserRefreshToken")
export async function POST(request: NextRequest) {
  const { name, birthDate, email, password } = await request.json()

  // Verify if all required fields are filled
  if (!name || !birthDate || !email || !password) {
    return new NextResponse('Todos os campos são obrigatórios', { status: 400 })
  }



  try {
    const formattedBirthDate = format(new Date(birthDate), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
    const age = new Date().getFullYear() - new Date(birthDate).getFullYear()
    const user = await prisma.user.create({
      data: {
        name,
        birthDate: formattedBirthDate,
        email,
        password,
        age
      }
    })

    return new NextResponse(JSON.stringify(user), {
      status: 201,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    console.log('[USERS_POST]', error)

    return new NextResponse('Algo deu errado ao criar um novo usuário', { status: 500 })
  }
}