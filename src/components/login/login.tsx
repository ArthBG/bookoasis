'use client';
import Link from 'next/link';
import { login } from '@/src/actions/login.actions';
import { Input, Button } from '@chakra-ui/react';
import { useState } from 'react';	
import { PasswordInput, PasswordStrengthMeter } from '../ui/password-input';
import styles from './login.module.css';

export default function LoginPage() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const clearFields = () => {
        setEmail('');
        setPassword('');
    };
    const handleLogin = async () => {
        try {
            await login(email, password); 
            clearFields();
        } catch (error) {
            console.error('Erro ao realizar login:', error);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.formContainer}>	
                    <h1 className={styles.heading}>Login</h1>
                    <div className={styles.form}>
                        <Input 
                            placeholder="Email address" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            type="email" 
                            required 
                        />
                        <PasswordInput 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder="Password" 
                            type="password" 
                            required 
                        />
                        <PasswordStrengthMeter value={password.length} />
                        <Button 
                            onClick={handleLogin} 
                            colorScheme="blue" 
                            size="lg" 
                            fontSize="md"
                        >
                            Sign in
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
