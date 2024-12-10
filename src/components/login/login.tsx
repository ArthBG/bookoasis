'use client';
import Link from 'next/link';
import { login } from '@/src/actions/login.actions';
import { Input, Button, Stack, Heading } from '@chakra-ui/react';
import { useState } from 'react';	
import { PasswordInput, PasswordStrengthMeter } from '../ui/password-input';
import styles from './login.module.css';

export default function LoginPage() {
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.formContainer}>	
                    <h1 className={styles.heading}>Login</h1>
                    <form onSubmit={login}>
                        <Stack gap={4}>
                            <Input placeholder="Email address" type="email" required />
                            <PasswordInput paddingRight={'30'} placeholder="Password" type="password" required />
                            <PasswordStrengthMeter value={0} />
                            <Button type="submit" colorScheme="blue" size="lg" fontSize="md">
                                Sign in
                            </Button>
                        </Stack>
                    </form>
                </div>
            </div>
        </div>
    );
}