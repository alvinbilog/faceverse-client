import apiClient from '@/app/api/apiClient';
import Link from 'next/link';
import { useQuery } from 'react-query';
import Comments from '../comments/page';
import User from '../author/page';

export interface PostInterface {
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
export interface AuthorInterface {
  _id: number;
  firstName: string;
  lastName: string;
  updatedAt: Date;
}
export interface CommentInterface {
  _id: number;
  author: AuthorInterface[];
  post: (number | string)[];
  content?: string;
  replies?: (number | string)[];
  createdAt: Date;
  updatedAt: Date;
}

export interface UserInterface {
  _id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profilePicture?: string;
  bio?: string;
  friends?: number[];
  posts?: number[];
  notifications?: number[];
  createdAt: Date;
  updatedAt: Date;
  accountType: string;
  forgotPasswordToken: string;
  forgotPasswordTokenExpiry: string;
  verifyToken: string;
  verifyTokenExpiry: Date;
}
export default function PostList() {
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
        //old
        // params: { populate: 'author' },

        //nested populate
        params: { populate: 'author, comments' },
      });
      // console.log('data', data.data);
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
        {posts?.map((post: any) => (
          <div key={post._id} className="border-b pb-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              {post.author?.map((postAuthor: UserInterface) => (
                <User key={postAuthor._id} postAuthor={postAuthor} />
              ))}
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
                {post.comments.map((comment: CommentInterface) => (
                  <Comments comment={comment} key={comment._id} />
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
