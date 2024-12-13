'use client';
import { useState } from 'react';
import { registerUser } from '@/src/actions/registerUser.actions';
import { User } from '@/src/types/User';
import { Button, Input, Stack } from '@chakra-ui/react';
import { Field } from '../ui/field';
import styles from './registerUser.module.css';

export default function RegisterUser() {
 const [name, setName] = useState<User['name']>('');
 const [birthDate, setBirthDate] = useState<User['birthDate']>(new Date());
 const [email, setEmail] = useState<User['email']>('');
 const [password, setPassword] = useState<User['password']>('');
 const [confirmPassword, setConfirmPassword] = useState<User['password']>('');
  const [error, setError] = useState<{ name?: { message: string }; birthDate?: { message: string }; email?: { message: string }; password?: { message: string }; confirmPassword?: { message: string } }>({});

 const handleSubmit = async (name: User['name'], birthDate: User['birthDate'], email: User['email'], password: User['password'], confirmPassword: User['password']) => {
    if (password !== confirmPassword) {
      setError({ confirmPassword: { message: 'As senhas não coincidem' } });
      return;
    }
    if (password.length < 8) {
      setError({ password: { message: 'A senha deve ter no mínimo 8 caracteres' } });
      return;
    }
    if (name.length < 3) {
      setError({ name: { message: 'O nome deve ter no mínimo 3 caracteres' } });
      return;
    }
    if (email.length < 5) {
      setError({ email: { message: 'O email deve ter no mínimo 5 caracteres' } });
      return;
    }
    if (!birthDate) {
      setError({ birthDate: { message: 'A data de nascimento deve ser preenchida' } });
      return;
    }
    setError({});
    const user = { name, birthDate, email, password };
    const response = await registerUser(user);
    if (response.error) {
      setError(response.error);
    }  
}

  return(
    <div className={styles.container}>
      <Stack gap={3}>
        <Field
        label="Nome"
        invalid={!!error.name}
        errorText={error.name?.message}
        required
        >
          <Input placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} />
        </Field>
        <Field
        label="Data de Nascimento"
        invalid={!!error.birthDate}
        errorText={error.birthDate?.message}
        >
          <Input type="date" value={birthDate.toISOString().split('T')[0]} onChange={(e) => setBirthDate(new Date(e.target.value))} />
        </Field>
        <Field
        label="Email"
        invalid={!!error.email}
        errorText={error.email?.message}
        >
          <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Field>
        <Field
        label="Senha"
        invalid={!!error.password}
        errorText={error.password?.message}
        >
          <Input placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Field>
        <Field
        label="Confirmar Senha"
        invalid={!!error.confirmPassword}
        errorText={error.confirmPassword?.message}
        >
          <Input placeholder="Confirmar Senha" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </Field>
        <Button onClick={() => handleSubmit(name, birthDate, email, password, confirmPassword)}>Cadastrar</Button>
      </Stack>
    </div>
  )
}
