'use client';
import Link from 'next/link';

export default function Welcome() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 to-blue-500 text-white">
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-extrabold">Welcome to Faceverse!</h1>
        <p className="text-xl">
          Connect with friends and the world around you.
        </p>
        <div className="space-x-4 mt-8">
          <Link
            href="/pages/signup"
            className="bg-white text-indigo-600 hover:bg-gray-100  font-bold py-2 px-4 rounded"
          >
            Sign Up
          </Link>
          <Link
            href="/pages/signin"
            className="bg-transparent border border-white hover:border-gray-300 text-white font-bold py-2 px-4 rounded"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
