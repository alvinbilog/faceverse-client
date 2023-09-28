'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  async function handleLogout() {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/v1/auth/signout'
      );
      router.push('/pages/signin');
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <main>
      <h1>HOMEPAGE</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
      >
        Logout
      </button>
    </main>
  );
}
