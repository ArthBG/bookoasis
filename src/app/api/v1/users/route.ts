import { NextRequest, NextResponse } from 'next/server';
import { format } from 'date-fns';
import prisma from '@/libs/prisma';
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        birthDate: true,
        email: true,
        age: true,
        createdAt: true,
        updatedAt: true
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

    return new NextResponse('Algo deu errado ao buscar os usuários', { status: 500 })
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
  console.log('all data', name, birthDate, email, password)

  // Verificar se todos os campos obrigatórios estão preenchidos
  if (!name || !birthDate || !email || !password) {
    return new NextResponse('Todos os campos são obrigatórios', { status: 400 })
  }

  try {
    // Converter a string de birthDate para um objeto Date
    const birthDateNew = new Date(birthDate)
    if (isNaN(birthDateNew.getTime())) {
      return new NextResponse('Data de nascimento inválida', { status: 400 })
    }

    const age = new Date().getFullYear() - birthDateNew.getFullYear()

    const user = await prisma.user.create({
      data: {
        name,
        birthDate: birthDateNew, 
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


// faça um post teste no insomina de useres :
// {
//   "name": "teste",
//   "birthDate": "1990-01-01",
//   "email": "
//   "password": "123456"
// }