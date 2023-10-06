'use client';
import authServices from '@/app/api/auth/auth-api';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function Home() {
  const router = useRouter();

  async function handleLogout() {
    try {
      await authServices.signout();
      localStorage.removeItem('faceverse-jwt');
      document.cookie =
        'faceverse-jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

      router.push('/pages/signin');
    } catch (error) {}
  }
  return (
    <div>
      <h1>Home protected</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
      >
        Logout
      </button>
    </div>
  );
}
