'use client';
import React, { useContext, useRef } from 'react';
import Nav from '../../components/navigation/page';
import Post from '../../components/post/page';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { postServices } from '@/app/api/post/postApi';
import { UserContext } from '@/app/providers';
import { UserContextType } from '@/app/types';
import { useMutation, useQueryClient } from 'react-query';

export default function Home() {
  const postRef = useRef<HTMLTextAreaElement | null>(null);
  const imageRef = useRef<HTMLInputElement | null>(null);
  const { postAuthorId } = useContext(UserContext) as UserContextType;

  const queryClient = useQueryClient();

  const createPostMutation = useMutation(
    (inputPostValue: string) =>
      postServices.createPost(postAuthorId, inputPostValue),
    {
      onSuccess: () => {
        if (postRef.current) {
          postRef.current.value = '';
        }
        queryClient.invalidateQueries('post');
      },
      onError: (error: any) => {
        console.log(error);
      },
    }
  );

  async function handlePost() {
    if (!postRef.current) return;
    const inputPostValue = postRef.current.value;
    const inputImageString = imageRef.current;

    createPostMutation.mutate(inputPostValue);
  }

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
        <div className="w-1/2">
          {/* Post Input */}
          <div className="mb-6 bg-white p-4 rounded shadow-md">
            <textarea
              className="w-full p-2 border rounded"
              placeholder="What's on your mind?"
              ref={postRef}
            ></textarea>
            <div className="flex items-center justify-between mt-2">
              {/* upload image */}
              <label className="flex items-center space-x-2 cursor-pointer">
                <FontAwesomeIcon icon={faImage} className="text-indigo-600" />
                <span className="text-indigo-600 text-xs">Upload Image</span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  ref={imageRef}
                />
              </label>
              <button
                className="text-white bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-700"
                onClick={() => handlePost()}
              >
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
