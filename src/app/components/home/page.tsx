'use client';
import authServices from '@/app/api/auth/auth-api';
import { useRouter } from 'next/navigation';
import React from 'react';
import Nav from '../navigation/page';
import Post from '../post/page';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Nav />

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

          <Post />
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
