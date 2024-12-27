'use client';
import { useAuth } from '@/src/context/auth';
import Header from '@/src/components/header/header';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProfilePage() {
  const { isAuthenticated, user } = useAuth();
  console.log('isAuthenticated', isAuthenticated);
  console.log('user', user);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated === 'false') {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!user) {
    return null;
  }
  


  return (
    <>
      <Header backgroundColor="black" />
      <div style={{ paddingTop: '100px' }}>
        <h1>Perfil de {user.name}</h1>
        <p><strong>Nome:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Data de nascimento:</strong> {new Date(user.birthDate).toLocaleDateString()}</p>
      </div>
    </>
  );
}