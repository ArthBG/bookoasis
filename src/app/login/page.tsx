"use client";
import Link from "next/link";
// import {logout, login} from "../../actions";
import { Stack } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { PasswordInput, PasswordStrengthMeter } from "../../components/ui/password-input";
import styles from "./page.module.css";

export default function Login() {
  return (
    <Stack>
    <div className={styles.container}>
    <main className={styles.main}>
      <h1 className={styles.title}>Login</h1>
      <div className={styles.formContainer}>
        <label htmlFor="email">Email</label>
        <Input size="lg" />
        <label htmlFor="password">Password</label>
        <PasswordInput size="lg" />
        <PasswordStrengthMeter value={0} />
        <button className={styles.button} onClick={() => console.log('Login')}>Login</button>
      </div>
    </main>
  </div>
  </Stack>
  );
}