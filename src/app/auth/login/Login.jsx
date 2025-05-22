'use client';
import './Login.css'

import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Proses login...
    };

    return (
        <section className="section-login">
            <div className="login-container">
                <h2 className="login-title">Login</h2>
                <form className="login-form" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Username" className="login-input" />
                    <input type="password" placeholder="Password" className="login-input" />
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