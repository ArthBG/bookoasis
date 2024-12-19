'use client';
import { Button, Input, Stack } from '@chakra-ui/react';
import { useState, useEffect, use } from 'react';
import { Field } from '../ui/field';
import { Form, useForm } from 'react-hook-form';
import { registerUser } from '@/src/actions/registerUser.actions';
import styles from './registerUser.module.css';
import { m } from 'framer-motion';

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

  const [errorEmailaa, setErrorEmailaa] = useState({ status: '', message: '' });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setErrorEmailaa({ status: '', message: '' });
    }, 9000);

    return () => clearTimeout(timeout); 
  }
  , [errorEmailaa]);


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
        setErrorEmailaa({ status: 'error', message: response.error.message });
      } else {
        console.log('Usuário cadastrado com sucesso!', response);
        setErrorEmailaa({ status: 'success', message: 'Usuário cadastrado com sucesso!' });
        reset(); 
      }
    } catch (err) {
      console.error('Erro ao registrar usuário:', err);
      setErrorEmailaa({ status: 'error', message: 'Erro ao registrar usuário' });
    }
  
  };

  const errorEmailExhibition = () => {
    if (errorEmailaa.status === 'error') {
      return (
        <div className={styles.errorEmail}>
          {errorEmailaa.message}
        </div>
      );
    } else if (errorEmailaa.status === 'success') {
      return (
        <div className={styles.successEmail}>
          {errorEmailaa.message}
        </div>
      );
    }
  }
  
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

