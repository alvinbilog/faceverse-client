'use client';
import authServices from '@/app/api/auth/auth-api';
import axios from 'axios';
import Link from 'next/link';
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
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/home" className="text-2xl font-bold text-indigo-600">
            Faceverse
          </Link>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <img
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32' fill='none'%3E%3Ccircle cx='16' cy='16' r='16' fill='%23E0E0E0'/%3E%3Cpath d='M16 17C18.7614 17 21 14.7614 21 12C21 9.23858 18.7614 7 16 7C13.2386 7 11 9.23858 11 12C11 14.7614 13.2386 17 16 17ZM16 19C12.1411 19 4 20.6863 4 24V26H28V24C28 20.6863 19.8589 19 16 19Z' fill='%23BDBDBD'/%3E%3C/svg%3E"
                alt="User Profile"
                className="h-8 w-8 rounded-full"
              />
              <span className="text-gray-800">John Doe</span>
            </div>
            <button className="text-gray-600 hover:text-indigo-600">
              <i className="fas fa-bell"></i>
            </button>
            <button className="text-gray-600 hover:text-indigo-600">
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto mt-8 flex space-x-8">
        {/* Friends Section */}
        <div className="w-1/4 bg-white p-4 rounded shadow-md">
          <h2 className="text-xl font-bold mb-4">Friends</h2>
          {/* List of friends can go here */}
        </div>

        {/* Posts Feed */}
        <div className="w-1/2 bg-white p-4 rounded shadow-md">
          {/* Post Input */}
          <div className="mb-6">
            <textarea
              className="w-full p-2 border rounded"
              placeholder="What's on your mind?"
            ></textarea>
            <div className="flex justify-end mt-2">
              <button className="text-white bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-700">
                Post
              </button>
            </div>
          </div>

          {/* Posts can be listed here */}
        </div>

        {/* Add Profile Section */}
        <div className="w-1/4 bg-white p-4 rounded shadow-md">
          <h2 className="text-xl font-bold mb-4">Add Profile</h2>
          <button className="text-white bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-700">
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
