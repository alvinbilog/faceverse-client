'use client';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import authServices from '@/app/api/auth/auth-api';

const SignupForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const [isSuccessful, setIsSuccessful] = useState(false);
  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      if (!formRef.current) return;
      const formData = new FormData(formRef.current);
      const formValues: Record<string, string> = {};
      formData.forEach((value, key) => {
        if (typeof value === 'string') {
          formValues[key] = value;
        }
      });
      console.log('values', formValues);
      const response = await authServices.signup(
        formValues.firstName,
        formValues.lastName,
        formValues.email,
        formValues.password
      );
      setIsSuccessful(true);
      return response;
      // router.push('/pages/signin');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {isSuccessful ? (
          <div className="text-center">
            <span className="block text-green-600 font-bold">
              Successfully signed up!
            </span>
            <Link
              href="/pages/signin"
              className="text-indigo-600 hover:text-indigo-500"
            >
              Sign in to your account
            </Link>
          </div>
        ) : (
          <>
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Create your Faceverse account
              </h2>
            </div>
            <form
              className="mt-8 space-y-6"
              ref={formRef}
              onSubmit={handleSubmit}
            >
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="first-name" className="sr-only">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    autoComplete="given-name"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="First Name"
                  />
                </div>
                <div>
                  <label htmlFor="last-name" className="sr-only">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    autoComplete="family-name"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Last Name"
                  />
                </div>
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
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
                  Sign Up
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
                  href="/pages/signin"
                  className="block w-full text-center py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Already have an account? Sign In
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SignupForm;
