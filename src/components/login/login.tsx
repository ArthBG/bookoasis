'use client';
import { login, logout } from '@/src/actions/login.actions';
import { Input, Button } from '@chakra-ui/react';
import { useState } from 'react';	
import { PasswordInput, PasswordStrengthMeter } from '../ui/password-input';
import Link from 'next/link';
import styles from './login.module.css';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const router = useRouter();

    const clearFields = () => {
        setEmail('');
        setPassword('');
    };
    const handleLogin = async () => {
        try {
            if (!email || !password) {
                return;
            }
            await login(email, password);
            clearFields();
            // router.push('/');
        } catch (error) {
            console.error('Erro ao realizar login:', error);
        }
    };
    const handleLogout = async () => {
        try {
            await logout();
            clearFields();
        } catch (error) {
            console.error('Erro ao realizar logout:', error);
        }
    }
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
                        <Button
                            colorScheme="blue"
                            size="lg"
                            fontSize="md"
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                        <Link href="/profile">
                            profile
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
