'use client';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';
const SignupForm = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const router = useRouter();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    const formValues = Object.fromEntries(formData.entries());
    console.log(formValues);
    router.push('/pages/signin');
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="firstName"
          >
            First Name
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            type="text"
            id="firstName"
            name="firstName"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="lastName"
          >
            Last Name
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            type="text"
            id="lastName"
            name="lastName"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            type="email"
            id="email"
            name="email"
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            type="password"
            id="password"
            name="password"
            required
          />
        </div>
        <div className="mb-6">
          <button
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            type="submit"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
