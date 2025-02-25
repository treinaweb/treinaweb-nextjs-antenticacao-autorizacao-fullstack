'use client';

import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import React, { FormEvent } from 'react';

export default function SignInPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    if (email && password) {
      await signIn('credentials', {
        email,
        password,
        callbackUrl: '/',
      });
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Entrar em TreinaBlog</h1>
        {error && <p style={styles.error}>Credenciais inválidas</p>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>
            Email
            <input
              type="email"
              name="email"
              placeholder="Digite seu email"
              required
              style={styles.input}
            />
          </label>
          <label style={styles.label}>
            Senha
            <input
              type="password"
              name="password"
              placeholder="Digite sua senha"
              required
              style={styles.input}
            />
          </label>
          <button type="submit" style={styles.button}>
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#fff',
    color: '#000',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'sans-serif',
  } as React.CSSProperties,
  card: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '2rem',
    maxWidth: '400px',
    width: '100%',
    textAlign: 'center',
  } as React.CSSProperties,
  title: {
    marginBottom: '1rem',
    fontSize: '1.5rem',
  } as React.CSSProperties,
  error: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
    padding: '0.5rem',
    marginBottom: '1rem',
    borderRadius: '4px',
  } as React.CSSProperties,
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  } as React.CSSProperties,
  label: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
    fontWeight: 'bold',
  } as React.CSSProperties,
  input: {
    padding: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    marginTop: '0.25rem',
  } as React.CSSProperties,
  button: {
    padding: '0.5rem',
    backgroundColor: 'rgb(37,99,235)',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontWeight: 'bold',
    cursor: 'pointer',
  } as React.CSSProperties,
};