'use client';

import dynamic from 'next/dynamic';

const Login = dynamic(() => import('@/app/auth/login/Login'), { ssr: false });

export default function LoginPage() {
  return <Login />;
}