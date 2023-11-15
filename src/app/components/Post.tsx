// @ts-nocheck
'use client';

import { useQuery } from 'react-query';
import { PostInterface, UserInterface } from '@/app/types';
import apiClient from '@/app/api/apiClient';
import PostList from './PostList';
import UserPostList from './UserPostList';

export default function Post({ userId }: { userId?: string }) {
  const {
    isLoading,

    error,
    data: data,
  } = useQuery<PostInterface[] | UserInterface, Error>(
    ['post', userId],
    async () => {
      let endpoint = 'post/all';
      let params = { populate: 'author, comments' };

      if (userId) {
        endpoint = `user/posts/${userId}`;
        params = { populate: 'posts, comments' };
      }
      const { data } = await apiClient.get(endpoint, {
        params,
      });

      if (data) {
        return data.data;
      }
      throw new Error('No data received');
    }
  );

  // Sort post by date
  const sortedPosts: PostInterface[] | UserInterface[] | null = Array.isArray(
    data
  )
    ? data.sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      )
    : null;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      {userId ? (
        // type is UserInterface
        <div className="">
          <UserPostList data={data as UserInterface} />
        </div>
      ) : (
        // type is PostInterface
        <div className="">
          {sortedPosts?.map((post: PostInterface) => (
            <PostList post={post} key={post._id} />
          ))}
        </div>
      )}
    </>
  );
}
