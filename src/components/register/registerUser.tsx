'use client';

import { Button, Input, Stack } from '@chakra-ui/react';
import { useState } from 'react';
import { Field } from '../ui/field';
import { useForm } from 'react-hook-form';
import { registerUser } from '@/src/actions/registerUser.actions';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from "jwt-decode";
import { useRouter } from 'next/navigation';
import styles from './registerUser.module.css';

interface FormValues {
  name: string;
  birthDate?: string;
  email: string;
  password?: string;
  confirmPassword?: string;
}

export default function RegisterUser() {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
      birthDate: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const router = useRouter();

  const onSubmit = async (data: FormValues) => {

      if (data.password !== data.confirmPassword) {
        setError('confirmPassword', { message: 'As senhas não coincidem' });
        return;
      }
      if (data.password!.length < 8) {
        setError('password', { message: 'A senha deve ter no mínimo 8 caracteres' });
        return;
      }
    

    const user = {
      name: data.name,
      email: data.email,
      birthDate: data.birthDate || null,
      password: data.password || '', 
    };

    try {
      const response = await registerUser(user);
      console.log(response)
      if (response.error) {
        console.error(response.error.message);
      } else {
        console.log('Usuário cadastrado com sucesso!', response);
        reset();
        router.push('/login')
      }
    } catch (err) {
      console.error('Erro ao registrar usuário:', err);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    if (credentialResponse?.credential) {
      const decoded: any = jwtDecode(credentialResponse.credential);
      const { family_name, given_name, email } = decoded;
      const name = `${family_name} ${given_name}`;
      const emailG = email;
      const userWGoogle = {
        name: name || '',
        email: emailG || '',
        birthDate: null,
        password: '', 
      }
      console.log(userWGoogle)
      try {
        const res = await registerUser(userWGoogle)
        console.log(res)
        if (res.error) {
          console.error(res.error.message);
        } else {
        console.log('Usuário cadastrado com sucesso!', res);
        reset();
        router.push('/login')
        }
      } catch (error) {
        console.error('Erro ao registrar usuário:', error)
      }

      console.log('Google User:', { name: `${family_name} ${given_name}`, email });

    } else {
      console.log('Credenciais do Google ausentes.');
    }
  };

  return (
    <div className={styles.container}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <Stack gap={4} marginTop={24}>
              <Field
                label="Nome"
                invalid={!!errors.name}
                errorText={errors.name?.message}
              >
                <Input
                  type="text"
                  {...register('name', { required: 'Campo obrigatório' })}
                />
              </Field>
              <Field
                label="Data de Nascimento"
                invalid={!!errors.birthDate}
                errorText={errors.birthDate?.message}
              >
                <Input
                  type="date"
                  {...register('birthDate', { required: 'Campo obrigatório' })}
                />
              </Field>
              <Field
                label="Email"
                invalid={!!errors.email}
                errorText={errors.email?.message}
              >
                <Input
                  type="email"
                  {...register('email', { required: 'Campo obrigatório' })}
                />
              </Field>
              <Field
                label="Senha"
                invalid={!!errors.password}
                errorText={errors.password?.message}
              >
                <Input
                  type="password"
                  {...register('password', { required: 'Campo obrigatório' })}
                />
              </Field>
              <Field
                label="Confirme a Senha"
                invalid={!!errors.confirmPassword}
                errorText={errors.confirmPassword?.message}
              >
                <Input
                  type="password"
                  {...register('confirmPassword', { required: 'Campo obrigatório' })}
                />
              </Field>
              <Button type="submit" colorScheme="blue">
                Cadastrar
              </Button>
            </Stack>
          </form>
          <GoogleOAuthProvider clientId="736046766596-i7edgg5ui23ojtlqa38bfo8rtqhq75ok.apps.googleusercontent.com">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => console.log('Login Google falhou')}
            />
          </GoogleOAuthProvider>
    </div>
  );
}
