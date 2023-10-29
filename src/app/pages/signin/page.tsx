'use client';
import authServices from '@/app/api/auth/authApi';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [hasError, setHasError] = useState(false);

  const router = useRouter();

  async function handleSubmit(e: any) {
    const abortController = new AbortController();
    e.preventDefault();
    try {
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
        document.cookie = `faceverse-jwt=${accessTokenString}; path=/;`;
        router.push('/pages/home');
      } else {
        setHasError(true);
      }
      return response;
    } catch (error: any) {
      console.log(error);
      setHasError(true);
      abortController.abort();
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {hasError ? (
          <div className="text-center space-y-4">
            <span className="block text-red-600 font-bold">
              Incorrect email or password.
            </span>
            <button
              onClick={() => setHasError(false)}
              className="text-indigo-600 hover:text-indigo-500"
            >
              Try again
            </button>
          </div>
        ) : (
          <>
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Sign in to Faceverse
              </h2>
            </div>
            <form
              className="mt-8 space-y-6"
              ref={formRef}
              onSubmit={handleSubmit}
            >
              {/* <input type="hidden" name="remember" value="true" /> */}
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign In
                </button>
              </div>
            </form>
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-50 text-gray-500">Or</span>
                </div>
              </div>
              <div className="mt-6">
                <Link
                  href="/pages/signup"
                  className="block w-full text-center py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Create a new account
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
