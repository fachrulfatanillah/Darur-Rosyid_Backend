'use client';
import './Login.css'

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        if (!email || !password) {
            return;
        }

        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const result = await res.json();

        if (result.status === 200) {
            router.push('/admin/dashboard');
        } else {
            setErrorMessage('Email atau password salah!');
        }
    };

    return (
        <section className="section-login">
            <div className="login-container">
                <h2 className="login-title">Login</h2>
                <div className="container-error-login">
                    {errorMessage && 
                        <p className="login-error">{errorMessage}</p>
                    }
                </div>
                <form className="login-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Email"
                        className="login-input"
                        value={email || ''}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="login-input"
                        value={password || ''}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="login-buttons">
                        <button
                        type="button"
                        className="login-button back"
                        onClick={() => router.push('/')}
                        >
                        Kembali
                        </button>
                        <button type="submit" className="login-button">
                        Masuk
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}