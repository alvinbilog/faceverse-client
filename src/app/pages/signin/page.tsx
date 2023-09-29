'use client';
import authServices from '@/app/api/auth/auth-api';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const router = useRouter();

  async function handleSubmit(e: any) {
    const abortController = new AbortController();
    try {
      e.preventDefault();

      if (!formRef.current) return;
      const formData = new FormData(formRef.current);
      const formValues = Object.fromEntries(formData.entries()) as FormValues;

      const response = await authServices.signin(
        formValues.email,
        formValues.password,
        abortController.signal
      );
      const accessTokenString = response.data.accessToken;

      if (response.success) {
        localStorage.setItem('faceverse-jwt', accessTokenString);

        console.log('success');
        router.push('/components/home');
      }

      return response;
    } catch (error: any) {
      console.log(error);
      abortController.abort();
    }
  }

  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>
        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Login
            </button>
          </div>
        </form>
        <p className="text-gray-600 text-sm">
          Don't have an account?{' '}
          <a href="#" className="text-blue-500">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
