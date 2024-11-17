import { NextRequest, NextResponse } from 'next/server'
import { addHours } from 'date-fns'
import { hash } from 'bcryptjs'
import prisma from '@/utils/prisma'

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