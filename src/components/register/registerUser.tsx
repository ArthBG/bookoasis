'use client';
import { Button, Input, Stack } from '@chakra-ui/react';
import { useState } from 'react';
import { Field } from '../ui/field';
import { Form, useForm } from 'react-hook-form';
import { registerUser } from '@/src/actions/registerUser.actions';
import styles from './registerUser.module.css';

interface FormValues {
  name: string;
  birthDate: string; 
  email: string;
  password: string;
  confirmPassword: string;
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

  const [errorEmailaa, setErrorEmailaa] = useState('');
  console.log('errorEmail:', errorEmailaa);

  const onSubmit = async (data: FormValues) => {
    console.log(data);
    
    if (data.password !== data.confirmPassword) {
      setError('confirmPassword', { message: 'As senhas não coincidem' });
      return;
    }

    if (data.password.length < 8) {
      setError('password', { message: 'A senha deve ter no mínimo 8 caracteres' });
      return;
    }

    if (data.name.length < 3) {
      setError('name', { message: 'O nome deve ter no mínimo 3 caracteres' });
      return;
    }

    if (data.email.length < 5) {
      setError('email', { message: 'O email deve ter no mínimo 5 caracteres' });
      return;
    }

    if (!data.birthDate) {
      setError('birthDate', { message: 'A data de nascimento deve ser preenchida' });
      return;
    }

   
    const user = {
      name: data.name,
      birthDate: data.birthDate,
      email: data.email,
      password: data.password
    };

    try {
      const response = await registerUser(user);
  
      if (response.error) {
        setErrorEmailaa(response.error.message);
      } else {
        console.log('Usuário cadastrado com sucesso!', response);
        reset(); 
      }
    } catch (err) {
      console.error('Erro ao registrar usuário:', err);
      setErrorEmailaa('Erro inesperado. Tente novamente.');
    }
  
  };

  const errorEmailExhibition = () => {
    setTimeout(() => {
      setErrorEmailaa('');
    }, 5000);
    return <p className={styles.errorEmail}>{errorEmailaa}</p>;
  
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
              {...register('password', { required: 'Campo obrigatório' })}
            />
          </Field>
          <Field
            label="Confirme a senha"
            invalid={!!errors.confirmPassword}
            errorText={errors.confirmPassword?.message}
          >
            <Input
              {...register('confirmPassword', { required: 'Campo obrigatório' })}
            />
          </Field>
          {errorEmailExhibition()}
          <Button type="submit" colorScheme="blue">
            Cadastrar
          </Button>
        </Stack>
      </form>
    </div>
  )
}
