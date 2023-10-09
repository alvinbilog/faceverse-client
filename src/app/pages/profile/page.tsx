import Link from 'next/link';

export default function Profile() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/home" className="text-2xl font-bold text-indigo-600">
            Faceverse
          </Link>
          <button className="text-gray-600 hover:text-indigo-600">
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto mt-8 flex space-x-8">
        {/* Profile Section */}
        <div className="w-1/4 bg-white p-4 rounded shadow-md">
          <div className="text-center">
            <img
              src="/path-to-default-image.jpg"
              alt="User Profile"
              className="h-32 w-32 mx-auto rounded-full mb-4"
            />
            <h2 className="text-xl font-bold">John Doe</h2>
            <p className="text-gray-600">john.doe@example.com</p>
            <button className="mt-4 text-white bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-700">
              Edit Profile
            </button>
          </div>
        </div>

        {/* User Posts/Activities */}
        <div className="w-1/2 bg-white p-4 rounded shadow-md">
          <h2 className="text-xl font-bold mb-4">Your Posts</h2>
          {/* User posts can be listed here */}
        </div>

        {/* Friends Section */}
        <div className="w-1/4 bg-white p-4 rounded shadow-md">
          <h2 className="text-xl font-bold mb-4">Friends</h2>
          {/* List of friends can go here */}
        </div>
      </div>
    </div>
  );
}
