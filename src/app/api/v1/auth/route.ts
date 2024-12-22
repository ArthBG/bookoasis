import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { tokenKey } from '../../../../middleware';

export async function GET() {
  const cookiesInstance = cookies();
  const token = cookiesInstance.get(tokenKey);

  if (token) {
    return NextResponse.json({ isLogged: true });
  }

  return NextResponse.json({ isLogged: false });
}
