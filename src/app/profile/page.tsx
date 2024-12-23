'use client';

import { useEffect, useState } from "react";
import Header from "@/src/components/header/header";

type User = {
  id: string;
  name: string;
  email: string;
  birthDate: string;
  age: number;
};

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(`${apiUrl}/api/v1/users`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        
        if (response.ok) {
          const data = await response.json();
          
          // Se data for um array, pega o primeiro usuário
          if (Array.isArray(data) && data.length > 0) {
            setUser(data[0]);
          } else {
            console.error("Nenhum usuário encontrado.");
          }
        } else {
          console.error("Erro ao recuperar os dados do usuário.");
        }
      } catch (error) {
        console.error("Erro ao buscar informações do usuário:", error);
      }
    };

    fetchUserData();
  }, []);

  if (!user) {
    return (
      <div>
        <Header backgroundColor="black" />
        <h1>Profile</h1>
        <p>Carregando informações do usuário...</p>
      </div>
    );
  }

  return (
    <>
      <Header backgroundColor="blue" />
      <div style={{ paddingTop: "100px" }}>
        <h1>Perfil de {user.name}</h1>
        <p>
          <strong>Nome:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Data de nascimento:</strong> {new Date(user.birthDate).toLocaleDateString()}
        </p>
        <p>
          <strong>Idade:</strong> {user.age}
        </p>
      </div>
    </>
  );
}
