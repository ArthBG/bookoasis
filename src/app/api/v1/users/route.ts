import { NextRequest, NextResponse } from 'next/server';
import { hashPassword } from '@/src/utils/passwordUtils';
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
  const { name, birthDate, email, password } = await request.json();
  console.log('all data no route', name, birthDate, email, password);

  if (!name || !email) {
    return new NextResponse('Campos nome e email são obrigatórios', { status: 400 });
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return new NextResponse(JSON.stringify({ error: 'E-mail já cadastrado' }), {
        status: 409,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    
    let birthDateNew:Date;
    if(birthDate == null){
      birthDateNew = new Date('0001-01-01T00:00:00.000Z')
    } else{
      birthDateNew = new Date(birthDate)
    }
    
    let age;
    if(birthDateNew == null){
      age = 0
    } else{
      age = new Date().getFullYear() - birthDateNew.getFullYear() 
    }
    
    const hashedPassword = await hashPassword(password) ;

    if (birthDate && isNaN(birthDateNew!.getTime())) {
      return new NextResponse('Data de nascimento inválida', { status: 400 });
    }
    console.log(birthDateNew)
    // Criar o usuário
    const user = await prisma.user.create({
      data: {
        name,
        birthDate: birthDateNew,
        email,
        password: hashedPassword,
        age,
      },
    });

    return new NextResponse(JSON.stringify(user), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.log('[USERS_POST]', error);

    return new NextResponse('Algo deu errado ao criar um novo usuário', { status: 500 });
  }
}


// faça um post teste no insomina de useres :
// {
//   "name": "teste",
//   "birthDate": "1990-01-01",
//   "email": "
//   "password": "123456"
// }