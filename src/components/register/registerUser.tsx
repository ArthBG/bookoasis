'use client';
import React, { useState } from 'react';
import {
  Box,
  Button,
  Input,
  Stack,
  Heading,
} from '@chakra-ui/react';
import styles from './registerUser.module.css';

const RegisterUser: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    // Handle registration logic here
    alert('User registered successfully');
  };

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.50"
      p={4}
    >
      <Box
        maxW="md"
        w="full"
        bg="white"
        boxShadow="md"
        rounded="lg"
        p={6}
      >
        <Heading mb={6} textAlign="center">
          Register
        </Heading>
        <form onSubmit={handleSubmit}>
          <Stack gap={4}>
            <Box>
              <Input
                placeholder="Email address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Box>
            <Box>
              <Input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Box>
            <Box>
              <Input
                placeholder="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Box>
            <Button type="submit" colorScheme="blue" size="lg" fontSize="md">
              Register
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default RegisterUser;