'use client';
import Nav from '@/app/components/navigation/page';
import { PostInterface, UserContextProps } from '@/app/types';
import { useContext, useState } from 'react';
import { UserContext } from '@/app/providers';
import PostList from '@/app/components/postList/page';
import { useQueryClient } from 'react-query';
import Post from '@/app/components/post/page';
import Wall from '@/app/components/wall/page';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu } from '@headlessui/react';
import Bio from '@/app/components/bio/page';

function ProfilePage() {
  const { user, setUser } = useContext(UserContext) as UserContextProps;
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Nav />

      <div className="container mx-auto mt-8 flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
        {/* Friends Section */}
        <div className="w-full md:w-1/4 bg-white p-4 rounded shadow-md">
          <h2 className="text-xl font-bold mb-4">Friends</h2>
          {/* List of friends can go here */}
        </div>
        {/* Main Content */}
        <div className="w-full md:w-1/2 container mx-auto mt-8 flex flex-col space-y-8">
          {/* Profile Header */}
          <div className="border-b pb-4 mb-4">
            <img
              src={
                selectedFile
                  ? URL.createObjectURL(selectedFile)
                  : 'https://via.placeholder.com/100'
              }
              alt="Profile"
              className="rounded-full mb-4"
            />
            {/* <input type="file" onChange={handleFileChange} /> */}

            <h1 className="text-2xl font-bold">
              {user?.data.firstName} {user?.data.lastName}
            </h1>
            <div className="flex items-center space-x-4 mt-4">
              <label
                htmlFor="fileInput"
                className="cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded transition hover:bg-indigo-700"
              >
                Upload Profile Picture
              </label>
              <input
                id="fileInput"
                type="file"
                className="hidden" // hide default file
                onChange={handleFileChange}
              />
              <span className="text-gray-600">
                {selectedFile ? selectedFile.name : 'No file chosen'}
              </span>
            </div>

            {/* User Posts */}
            <Wall />
          </div>
        </div>
        <Bio />
      </div>
    </div>
  );
}

export default ProfilePage;
