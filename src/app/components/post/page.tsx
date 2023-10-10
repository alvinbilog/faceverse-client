import Link from 'next/link';

export default function PostList() {
  // Sample posts data
  const posts = [
    {
      id: 1,
      author: 'John Doe',
      content:
        'This is a text-only post. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      timestamp: '2 hours ago',
      image: null,
      replies: [],
    },
    {
      id: 2,
      author: 'Jane Smith',
      content: null,
      timestamp: '5 hours ago',
      image: 'https://via.placeholder.com/500',
      replies: [],
    },
    {
      id: 3,
      author: 'Alice Johnson',
      content:
        'This post has both text and an image. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      timestamp: '1 day ago',
      image: 'https://via.placeholder.com/500',
      replies: [
        {
          id: 1,
          author: 'Bob Williams',
          content: 'Great post, Alice!',
          timestamp: '20 hours ago',
        },
      ],
    },
  ];

  return (
    <div className="bg-white p-4 rounded-md shadow-md space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="border-b pb-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <Link
              href={`/profile/${post.author}`}
              className="text-indigo-600 font-bold"
            >
              {post.author}
            </Link>
            <span className="text-gray-500 text-sm">{post.timestamp}</span>
          </div>
          {post.content && <p className="text-gray-800 mb-2">{post.content}</p>}
          {post.image && (
            <img
              src={post.image}
              alt="Post image"
              className="rounded-md mb-2"
            />
          )}
          {post.replies.length > 0 && (
            <div className="space-y-2 mt-4 pl-4 border-l-2 border-indigo-200">
              {post.replies.map((reply) => (
                <div key={reply.id}>
                  <div className="flex justify-between mb-1">
                    <Link
                      href={`/profile/${reply.author}`}
                      className="text-indigo-600 font-medium"
                    >
                      {reply.author}
                    </Link>
                    <span className="text-gray-500 text-sm">
                      {reply.timestamp}
                    </span>
                  </div>
                  <p className="text-gray-700 pl-4">{reply.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
