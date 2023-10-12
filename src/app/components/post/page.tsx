import apiClient from '@/app/api/apiClient';
import Link from 'next/link';
import { useQuery } from 'react-query';

interface PostInterface {
  _id: number;
  author: (number | string)[]; // User Reference
  content: String;
  image?: String;
  likes?: (number | string)[];
  comments?: (number | string)[];
  hashtags?: Array<string> | string[];
  createdAt: Date;
  updatedAt: Date;
}
export default function PostList() {
  // Sample posts data
  const postss = [
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
  const {
    isLoading,
    isError,
    error,
    data: posts,
    isFetching,
    isPreviousData,
  } = useQuery<PostInterface[], Error>({
    queryKey: ['post'],
    queryFn: async () => {
      const { data } = await apiClient.get('post/all', {
        params: { populate: 'comments' },
      });
      console.log('data', data.data);
      if (data) {
        return data.data;
      }
      throw new Error('No data received');
    },
  });
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className="bg-white p-4 rounded-md shadow-md space-y-4">
        {posts &&
          Array.isArray(posts) &&
          posts.map((post: any) => (
            <div key={post._id} className="border-b pb-4 mb-4">
              <div className="flex justify-between items-center mb-2">
                <Link
                  href={`/profile/${post.author}`}
                  className="text-indigo-600 font-bold"
                >
                  {post.author}
                </Link>
                {/* <span className="text-gray-500 text-sm">{post.timestamp}</span> */}
              </div>
              {post.content && (
                <p className="text-gray-800 mb-2">{post.content}</p>
              )}
              {post.image && (
                <img
                  src={post.image}
                  alt="Post image"
                  className="rounded-md mb-2"
                />
              )}
              {post.comments?.length > 0 && (
                <div className="space-y-2 mt-4 pl-4 border-l-2 border-indigo-200">
                  {post.comments.map((comment: any) => (
                    <div key={comment._id}>
                      <p>{comment.content}</p>
                      <div className="flex justify-between mb-1">
                        <Link
                          href={`/profile/${comment.author}`}
                          className="text-indigo-600 font-medium"
                        >
                          {comment.author}
                        </Link>
                        <span className="text-gray-500 text-sm">
                          {comment.timestamp}
                        </span>
                      </div>
                      {/* <p className="text-gray-700 pl-4">
                         {comment.content}
                        </p> */}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        {/* {posts &&
          Array.isArray(posts) &&
          posts.map((post: PostInterface) => (
            <div key={post._id}>
              <h2>{post.author}</h2>
              <p>{post.content}</p>
            </div>
          ))} */}
      </div>
    </>
  );
}
