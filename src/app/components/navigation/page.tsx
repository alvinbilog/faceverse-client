'use client';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell,
  faComment,
  faMoon,
  faSun,
} from '@fortawesome/free-solid-svg-icons';
import authServices from '@/app/api/auth/auth-api';
import { useRouter } from 'next/navigation';
import { createContext } from 'vm';
import { UserContextProps, UserData } from '@/app/types';
import { UserContext } from '@/app/providers';
import apiClient from '@/app/api/apiClient';
import { useQuery } from 'react-query';

export default function Nav() {
  const [darkMode, setDarkMode] = useState(false);
  const { user, setUser } = useContext(UserContext) as UserContextProps;
  const router = useRouter();

  const { data, error, isLoading } = useQuery<UserData, Error>(
    'me',
    async () => {
      const response = await apiClient.get('me', {
        withCredentials: true,
      });
      if (response.status !== 200) {
        throw new Error('Network response was not ok');
      }
      return response.data;
    }
  );
  useEffect(() => {
    if (data) setUser(data);
  }, [data, setUser]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  async function handleLogout() {
    try {
      await authServices.signout();
      localStorage.removeItem('faceverse-jwt');
      document.cookie =
        'faceverse-jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

      router.push('/pages/signin');
    } catch (error) {}
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Implement logic to apply dark mode to the entire app
  };

  // check user if undefined

  return (
    <nav className="bg-indigo-600 p-4 shadow-md text-white">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo / Home */}
        <Link
          href={'/pages/home'}
          className="text-2xl font-bold text-white hover:text-indigo-400"
        >
          Faceverse
        </Link>

        <div className="relative">
          <input
            type="text"
            className="border rounded-md p-2 bg-white text-black"
            placeholder="Search"
          />
          <i className="absolute right-2 top-2.5 text-gray-500 fas fa-search"></i>
        </div>

        <div className="flex items-center space-x-4">
          {/* Search Bar */}

          {/* Messages/Chats */}
          <button className="text-white hover:text-indigo-400">
            <FontAwesomeIcon icon={faComment} className="h-6 w-6" />
          </button>

          {/* Notifications */}
          <button className="text-white hover:text-indigo-400">
            <FontAwesomeIcon icon={faBell} className="h-6 w-6" />
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="text-white hover:text-indigo-400"
          >
            {darkMode ? (
              <FontAwesomeIcon icon={faSun} className="h-6 w-6" />
            ) : (
              <FontAwesomeIcon icon={faMoon} className="h-6 w-6" />
            )}
          </button>

          <img
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32' fill='none'%3E%3Ccircle cx='16' cy='16' r='16' fill='%23E0E0E0'/%3E%3Cpath d='M16 17C18.7614 17 21 14.7614 21 12C21 9.23858 18.7614 7 16 7C13.2386 7 11 9.23858 11 12C11 14.7614 13.2386 17 16 17ZM16 19C12.1411 19 4 20.6863 4 24V26H28V24C28 20.6863 19.8589 19 16 19Z' fill='%23BDBDBD'/%3E%3C/svg%3E"
            alt="User Profile"
            className="h-8 w-8 rounded-full border-2 border-white"
          />
          <Link href={'/pages/profile'} className="text-white ml-2">
            {data?.data.firstName} {data?.data.lastName}
          </Link>
          {/* Logout */}
          <button
            className="text-white hover:text-indigo-400 ml-4"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
